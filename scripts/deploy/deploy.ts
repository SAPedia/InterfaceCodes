import { execSync } from 'node:child_process';
import { Mwn } from 'mwn';
import 'dotenv/config';
import { contentHash, needDeploy } from './utils';

const deploy = async () => {
    const newHash = await contentHash();

    if (process.argv.includes('--dry-run')) {
        console.log(`[DRY RUN] Would deploy ${Object.keys(newHash).length} file(s):\n`);

        for (const [title, { distPath }] of Object.entries(newHash)) {
            const gitInfo = execSync(`git log -1 --format="%s|%H|%aN" -- "${distPath}"`, {
                encoding: 'utf-8',
            }).trim();

            const [message, id, author] = gitInfo
                ? gitInfo.split('|')
                : ['chore(auto): sync changes from InterfaceCodes', 'HEAD', 'Saoutax-ibot'];

            console.log(`  ${title}`);
            console.log(`    source : ${distPath}`);
            console.log(`    commit : ${id?.slice(0, 8)} by ${author}`);
            console.log(`    message: ${message}\n`);
        }

        console.log(`[DRY RUN] ${Object.keys(newHash).length} file(s) would be deployed.`);
        return;
    }

    const bot = await Mwn.init({
        apiUrl: 'https://saoaw.com/api.php',
        userAgent: process.env['USERAGENT']!,
        username: 'Saoutax-ibot@Saoutax-ibot',
        password: process.env['PASSWORD']!,
        maxRetries: 20,
    });

    const readDeploymentJson = async (): Promise<Record<string, string>> => {
        const data = await bot.read('MediaWiki:Deployment.json', {
            rvprop: ['content'],
        });

        if ('missing' in data) {
            return {};
        }

        const content = data.revisions?.[0]?.content ?? '';
        return content ? JSON.parse(content) : {};
    };

    const oldHash = await readDeploymentJson();
    const deployment = needDeploy(oldHash, newHash);

    await bot.batchOperation(Object.entries(deployment), async ([title, { content, distPath }]) => {
        const gitInfo = execSync(`git log -1 --format="%s|%H|%aN" -- "${distPath}"`, {
            encoding: 'utf-8',
        }).trim();

        const [message, id, author] = gitInfo
            ? gitInfo.split('|')
            : ['chore(auto): sync changes from InterfaceCodes', 'HEAD', 'Saoutax-ibot'];

        const summary = `Git commit: [[git:commit/${id}|${message}]] by [[U:${author}]]`;
        await bot.save(title, content, summary, { bot: true, tags: 'Bot' });
    });

    await bot.save(
        'MediaWiki:Deployment.json',
        JSON.stringify(
            Object.fromEntries(Object.entries(newHash).map(([key, { hash }]) => [key, hash])),
        ),
        `chore(auto): update deployment hash (${Object.keys(deployment).length} file(s) changed)`,
        { bot: true, tags: 'Bot' },
    );

    console.log(`Deployed ${Object.keys(deployment).length} file(s) successfully.`);
};

try {
    await deploy();
} catch (error) {
    console.error(`Deploy failed: ${(error as Error).message}`);
    process.exit(1);
}
