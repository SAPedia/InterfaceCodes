import { execSync } from 'node:child_process';

/**
 * 无需生成内链的用户名列表
 */
const PLAIN_TEXT_AUTHORS = [
    'github-advanced-security[bot]',
    'Claude Opus 4.7',
    'github-actions[bot]',
    'Claude Sonnet 4.6',
];

/**
 * 截断 git commit message 用于编辑摘要，取首行，过长时加省略号。
 *
 * @param message commit message
 */
const truncateMessage = (message: string): string => {
    const firstLine = message.split('\n')[0]!;
    return firstLine.length > 100 ? `${firstLine.slice(0, 100)}…` : firstLine;
};

/**
 * 格式化用户名
 *
 * @param name 用户名
 */
const formatAuthor = (name: string): string =>
    PLAIN_TEXT_AUTHORS.includes(name) ? name : `[[U:${name}]]`;

/**
 * 获取指定文件的最新 git 提交信息
 *
 * @param distPath 目标文件路径
 * @returns [subject, hash, author, coAuthors]
 */
const getGitInfo = (distPath: string): [string, string, string, string[]] => {
    const gitLog = (format: string, pathArg: string) =>
        execSync(`git log -1 --format="${format}" ${pathArg}`, {
            encoding: 'utf-8',
        }).trim();

    const pathArg = `-- "${distPath}"`;
    const subject = gitLog('%s', pathArg);

    if (!subject) {
        const fallback = gitLog('%s|%H|%aN', '');
        if (fallback) {
            const [m, h, a] = fallback.split('|');
            return [m!, h!, a!, []];
        }
        return ['chore(auto): sync changes from InterfaceCodes', 'HEAD', 'Saoutax-ibot', []];
    }

    const hash = gitLog('%H', pathArg);
    const author = gitLog('%aN', pathArg);
    const coAuthorValues = gitLog('%(trailers:key=Co-authored-by,valueonly)', pathArg);
    const coAuthors = coAuthorValues
        .split('\n')
        .map(line => line.replace(/\s*<.+>$/, '').trim())
        .filter(Boolean);

    return [subject, hash, author, coAuthors];
};

/**
 * 生成编辑摘要
 *
 * @param message commit message
 * @param hash    commit hash
 * @param author  作者用户名
 * @param coAuthors 共同作者列表
 * @returns 格式化的编辑摘要文本
 */
const formatSummary = (
    message: string,
    hash: string,
    author: string,
    coAuthors: string[],
): string => {
    const authorPart = `by ${formatAuthor(author)}`;
    const coAuthorPart = coAuthors.length
        ? `, Co-authored-by: ${coAuthors.map(formatAuthor).join(', ')}`
        : '';
    return `Git commit: [[git:commit/${hash}|${truncateMessage(message)}]] ${authorPart}${coAuthorPart}`;
};

export { getGitInfo, formatSummary };
