import { extname } from 'node:path';
import browserslist from 'browserslist';
import { build } from 'esbuild';
import { browserslistToTargets, transform } from 'lightningcss';
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
    const targets = browserslistToTargets(browserslist());
    const minifyCSS = (code: string, filename: string) =>
        transform({ code: Buffer.from(code), filename, minify: true, targets })
            .code.toString()
            .trim();

    if (extname(file) === '.scss') {
        return minifyCSS(compile(file, { style: 'expanded' }).css, file);
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

export { compileJS, compileCSS };
