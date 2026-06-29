# 构建管线

`pnpm run build` 执行 `scripts/build/core.ts`，按顺序经过以下阶段：

1. **Clean** — 删除 `dist/`
2. **Compile** — 编译 Gadget 和全局文件：esbuild（JS/TS IIFE）、sass-embedded（SCSS）+ lightningcss（CSS）
3. **Definition** — 生成 `MediaWiki:Gadgets-definition` 及各语言描述
4. **Widgets** — 编译 Widget
5. **Templates** — React SSR 生成模板 Wikitext

编译产物输出至 `dist/`，均带有 DO-NOT-EDIT 注释头。
