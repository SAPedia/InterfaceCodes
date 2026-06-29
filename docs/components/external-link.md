# ExternalLink

安全的外部链接组件。强制所有链接在新标签页打开（`target="_blank"`），并添加 `rel="noreferrer noopener"` 安全属性。

## Props

| 属性            | 类型        | 默认值 | 说明                                         |
| --------------- | ----------- | ------ | -------------------------------------------- |
| href            | `string`    | 必填   | 链接 URL                                     |
| children        | `ReactNode` | 必填   | 链接文本或元素                               |
| 其他 `<a>` 属性 | —           | —      | 透传到 `<a>` 标签（`target`/`rel` 不可覆盖） |

## 示例

```tsx
import { ExternalLink } from '~/components';

// 基本用法
<ExternalLink href="https://saoaw.com">
  访问 SAPedia
</ExternalLink>

// 带样式的链接
<ExternalLink href="https://example.com" className="text-blue-500 hover:underline">
  示例链接
</ExternalLink>
```

### dev 模式输出

```html
<a target="_blank" rel="noreferrer noopener" href="https://saoaw.com">访问 SAPedia</a>
```

### build 模式输出

ExternalLink 只在 HTML 预览中使用，无 wikitext 输出模式。
