# WikiImage

wiki 文件图片渲染组件。将 wiki 文件名（如 `"Example.jpg"`）通过 MD5 哈希算法转换为 MediaWiki 标准图片路径，渲染为 `<img>` 标签。

## 原理

MediaWiki 使用两级目录哈希存储图片文件，路径格式为 `/images/a/ab/Example.jpg`，其中 `a` 是 MD5 哈希的第一位，`ab` 是前两位。

## Props

| 属性              | 类型     | 默认值                  | 说明                                            |
| ----------------- | -------- | ----------------------- | ----------------------------------------------- |
| file              | `string` | 必填                    | wiki 文件名（如 `"Sword_Art_Online_logo.png"`） |
| alt               | `string` | file 名（下划线转空格） | 图片替代文本                                    |
| 其他 `<img>` 属性 | —        | —                       | 透传到 `<img>` 标签（`src` 被组件接管）         |

## 示例

```tsx
import { WikiImage } from '~/components';

// 基本用法
<WikiImage file="Sword_Art_Online_logo.png" />

// 指定大小和样式
<WikiImage
  file="Kirito_SAO.png"
  alt="桐人"
  width={300}
  height={200}
  className="rounded-lg shadow-md"
/>
```

### dev 模式输出（使用真实图片 URL）

```html
<img
    loading="lazy"
    decoding="async"
    src="https://saoaw.com/images/a/ab/Sword_Art_Online_logo.png"
    alt="Sword Art Online logo"
/>
```

### build 模式输出

此组件仅在 dev 模式使用（`WikiImage` 不参与 wikitext 输出）。如果要输出 `[[File:...]]` 语法，使用 `WikitextImage` 组件。

## 注意事项

- 自动添加 `loading="lazy"` 和 `decoding="async"` 以优化性能
- 站点地址通过 `process.env.WIKI_SITE_BASE` 配置，dev server 中默认 `https://saoaw.com`
