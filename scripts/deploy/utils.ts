import { readFile } from 'node:fs/promises';
import sha256 from 'crypto-js/sha256';
import FastGlob from 'fast-glob';
import type { DeployFileEntry, DeployFileMap } from '@/types/deploy';
import { toWikiTitle } from './mapping';

/**
 * 扫描 dist/ 目录，计算每个文件的 SHA-256 哈希。
 *
 * @returns 页面标题 → { content, hash, distPath } 的映射
 */
const contentHash = async (): Promise<DeployFileMap> => {
    const paths = await FastGlob.async('dist/**', { onlyFiles: true });

    const entries = await Promise.all(
        paths.map(async file => {
            const content = (await readFile(file, 'utf-8')).trim();
            const hash = sha256(content).toString();
            const title = toWikiTitle(file);

            return {
                [title]: {
                    content,
                    hash,
                    distPath: file,
                } satisfies DeployFileEntry,
            } as const;
        }),
    );

    return Object.assign({}, ...entries);
};

type DeployDiff = Record<string, { content: string; distPath: string }>;

/**
 * 对比旧部署哈希与本地新哈希，返回需要更新的文件内容及路径。
 *
 * @param oldHash - 站点上 `MediaWiki:Deployment.json` 中的哈希记录
 * @param newHash - 本地 `contentHash()` 生成的哈希
 * @returns 需要部署的文件内容及对应 dist 路径
 */
const needDeploy = (
    oldHash: Record<string, string> | Record<string, never>,
    newHash: DeployFileMap,
): DeployDiff => {
    const oldKeys = Object.keys(oldHash);

    if (oldKeys.length === 0) {
        return Object.fromEntries(
            Object.entries(newHash).map(([key, { content, distPath }]) => [
                key,
                { content, distPath },
            ]),
        );
    }

    return Object.keys(newHash).reduce<DeployDiff>((acc, key) => {
        const entry = newHash[key];
        if (entry && (!(key in oldHash) || oldHash[key] !== entry.hash)) {
            acc[key] = { content: entry.content, distPath: entry.distPath };
        }
        return acc;
    }, {});
};

export { contentHash, needDeploy };
