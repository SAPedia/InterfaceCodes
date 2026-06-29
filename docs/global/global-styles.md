# 全局样式

`src/global/` 目录存放非 Gadget 的全局 CSS/JS 文件，用于覆写皮肤样式或注入全局变量。

## 添加全局文件

1. 在 `src/global/` 下创建文件（支持 `.ts` / `.js` / `.scss` / `.css`）
2. 运行 `pnpm run build`，文件将编译输出至 `dist/global/`
3. 部署后映射至 `MediaWiki:<文件名>` 页面

## 构建映射

| 本地路径                 | MediaWiki 页面         |
| ------------------------ | ---------------------- |
| `dist/global/<name>.css` | `MediaWiki:<name>.css` |
| `dist/global/<name>.js`  | `MediaWiki:<name>.js`  |
