# Widget 指南

Widget 系统将编译后的 JS/CSS 嵌入 MediaWiki `Widget:` 命名空间的页面中，通过 `$wg` 全局变量确保单次实例化。

## 目录约定

```
src/widgets/
  <Name>/
    <Name>.{ts,js}          # JS/TS 源文件
    <Name>.{scss,css}       # 样式文件
    description.wiki        # 描述文本
```

### 示例结构

```
src/widgets/Search/
  Search.ts
  Search.scss
  description.wiki
```

## 构建流程

构建阶段（`scripts/build/core.ts` 第 4 阶段）：

1. 扫描 `src/widgets/*` 下所有子目录
2. 读取 `description.wiki` 作为描述文本
3. 编译 JS 和 CSS
4. 组装输出：

```wikitext
<noinclude>描述文本</noinclude>
<includeonly>
<!--{if !isset($wg<Name>) || !$wg<Name>}-->
<!--{assign var="wg<Name>" value=true scope="global"}-->
<style>
/* CSS 内容 */
</style>
<script>
/* JS 内容 */
</script>
<!--{/if}-->
</includeonly>
```

## 构建映射

| 本地路径              | MediaWiki 页面  |
| --------------------- | --------------- |
| `dist/widgets/<Name>` | `Widget:<Name>` |
