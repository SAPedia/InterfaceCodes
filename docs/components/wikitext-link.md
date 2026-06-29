# WikitextLink

wiki 链接组件。支持内部链接（`[[Page]]` / `[[Page|text]]`）和外部链接（`[https://example.com text]`）。

## Props

### 内部链接 — 未设置显示名（`[[Page]]`）

| 属性     | 类型        | 默认值 | 说明                             |
| -------- | ----------- | ------ | -------------------------------- |
| children | `string`    | 必填   | 链接目标页面名，同时也是显示文本 |
| page     | `undefined` | —      | 不传，表示简单模式               |

### 内部链接 — 设置显示名（`[[Page|text]]`）

| 属性     | 类型        | 默认值 | 说明           |
| -------- | ----------- | ------ | -------------- |
| page     | `string`    | 必填   | 链接目标页面名 |
| children | `ReactNode` | 必填   | 显示文本       |

### 外部链接（`[url text]`）

| 属性     | 类型        | 默认值 | 说明                                            |
| -------- | ----------- | ------ | ----------------------------------------------- |
| href     | `string`    | 必填   | 链接 URL（必须以 `http://` 或 `https://` 开头） |
| children | `ReactNode` | 必填   | 显示文本                                        |

## 示例

```tsx
import { WikitextLink } from '~/components';

// 未设置显示名
<WikitextLink>首页</WikitextLink>

// 设置显示名
<WikitextLink page="刀剑神域">SAO</WikitextLink>

// 外部链接
<WikitextLink href="https://saoaw.com">SAPedia</WikitextLink>
```

### dev 模式输出

```html
<a href="/首页" title="首页">首页</a>
<a href="/刀剑神域" title="刀剑神域">SAO</a>
<a href="https://saoaw.com" target="_blank" rel="noreferrer noopener" class="external text"
    >SAPedia</a
>
```

### build 模式输出

```
[[首页]]
[[刀剑神域|SAO]]
[https://saoaw.com SAPedia]
```

## 注意事项

- 内部链接的命名空间校验：如果链接目标是 `Category:`、`File:`、`Image:`、`Media:` 等命名空间（含中英文别名），会在控制台发出警告，提示可能遗漏了冒号前缀（`:Category:xxx`）
