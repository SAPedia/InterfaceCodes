import { readFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import tailwindcss from '@tailwindcss/postcss';
import browserslist from 'browserslist';
import { build } from 'esbuild';
import { browserslistToTargets, transform } from 'lightningcss';
import postcss from 'postcss';
import { compile } from 'sass-embedded';

/**
 * 将 JavaScript/TypeScript 文件编译为 IIFE 格式的压缩代码。
 *
 * @param file - 入口文件路径
 * @returns 编译后的 JS 代码，已去除首尾空白
 */
const compileJS = async (file: string) => {
    const result = await build({
        entryPoints: [file],
        format: 'iife',
        minify: true,
        sourcemap: false,
        target: 'es2017',
        charset: 'utf8',
        write: false,
    });
    return result.outputFiles[0]!.text.trim();
};

const targets = browserslistToTargets(browserslist());

/**
 * 编译 CSS/SCSS 文件，并根据 `.browserslistrc` 对输出进行目标浏览器转译和压缩。
 *
 * - SCSS 文件：由 sass-embedded 编译后，经 lightningcss 做 target 转译 + 压缩
 * - CSS 文件：由 esbuild 打包后，经 lightningcss 做 target 转译 + 压缩
 *
 * @param file - 入口文件路径（`.scss` 或 `.css`）
 * @returns 编译后的 CSS 代码，已去除首尾空白
 */
const compileCSS = async (file: string) => {
    const minifyCSS = (code: string, filename: string) =>
        transform({ code: Buffer.from(code), filename, minify: true, targets })
            .code.toString()
            .trim();

    if (extname(file) === '.scss') {
        return minifyCSS(
            compile(file, { style: 'expanded', loadPaths: [resolve('src')] }).css,
            file,
        );
    }

    const bundled = await build({
        entryPoints: [file],
        bundle: true,
        minify: false,
        sourcemap: false,
        write: false,
    });
    return minifyCSS(bundled.outputFiles[0]!.text, file);
};

/**
 * 编译 Tailwind CSS 文件
 *
 * 通过 PostCSS + \@tailwindcss/postcss 处理 `@import 'tailwindcss'` 及 `@source` 指令，
 * 生成仅包含实际使用类名的 CSS，再经 lightningcss 压缩。
 *
 * @param file - Tailwind CSS 入口文件路径
 * @returns 编译后的 CSS 代码，已去除首尾空白
 */
const compileTailwindCSS = async (file: string) => {
    const source = await readFile(file, 'utf-8');
    const result = await postcss([tailwindcss()]).process(source, { from: file });

    return transform({
        code: Buffer.from(result.css),
        filename: file,
        minify: true,
        targets,
    })
        .code.toString()
        .trim();
};

export { compileJS, compileCSS, compileTailwindCSS };
