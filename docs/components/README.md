# Wiki 组件库

为 SAPedia InterfaceCodes 项目提供的一套 React wiki 组件。采用**双模式**架构：

- **dev 模式** (`CONVERT_TO_HTML = true`)：渲染真实 HTML 标签，在 Vite 开发服务器中预览效果
- **build 模式**（标志未设置）：输出 wikitext 字符串，通过 `renderToStaticMarkup` 序列化后部署到 MediaWiki

## 架构

```
src/
  lib/
    config.ts       — 双模式控制标志 CONVERT_TO_HTML
    utils.ts        — TokenList CSS 类管理工具
    wiki.ts         — 标题规范化、图片 URL、页面 URL 工具
  components/
    external-link.tsx           — 安全的外部链接
    wiki-image.tsx              — wiki 图片渲染（MD5 哈希路径）
    wiki-templates/
      lang.tsx                  — 语言标签
    wikitext/
      link.tsx                  — 内部/外部 wikitext 链接
      image.tsx                 — [[File:...]] 图片
      template.tsx              — {{template}} 模板调用
      transclude.tsx            — noinclude/includeonly/onlyinclude
      language-convert.tsx      — -{...}- 语言转换
```

## 使用

组件通过 `~` 别名导入：

```tsx
import { ExternalLink, WikiImage } from '~/components';
import { WikitextLink, WikitextTemplate } from '~/components/wikitext';
import { LangSpan } from '~/components/wiki-templates';
```

## 构建

```bash
pnpm run build    # 编译所有模板到 dist/templates/（wikitext 模式）
pnpm run dev          # 启动开发服务器（HTML 预览模式）
```
