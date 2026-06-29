# WikitextTransclude

MediaWiki 嵌入控制标签组件。对应 `<noinclude>`、`<includeonly>`、`<onlyinclude>` 三种嵌入控制标签。

## Props

所有三个组件共享相同的 Props：

| 属性     | 类型        | 默认值 | 说明     |
| -------- | ----------- | ------ | -------- |
| children | `ReactNode` | 必填   | 包裹内容 |

## 各组件行为

| 组件                  | dev 模式                  | build 模式                              | 用途                             |
| --------------------- | ------------------------- | --------------------------------------- | -------------------------------- |
| `WikitextNoInclude`   | 返回 `null`（隐藏）       | `<noinclude>{children}</noinclude>`     | 仅页面直接查看时可见，嵌入时隐藏 |
| `WikitextIncludeOnly` | 直接渲染 children         | `<includeonly>{children}</includeonly>` | 仅嵌入时可见，页面直接查看时隐藏 |
| `WikitextOnlyInclude` | 渲染 children（附带警告） | `<onlyinclude>{children}</onlyinclude>` | 嵌入时仅包含此内容               |

## 示例

```tsx
import {
  WikitextNoInclude,
  WikitextIncludeOnly,
  WikitextOnlyInclude,
} from '~/components';

// 仅在当前页面查看
<WikitextNoInclude>
  <p>此模板用于显示引用信息。</p>
</WikitextNoInclude>

// 嵌入时才可见的内容
<WikitextIncludeOnly>
  [[Category:引用模板]]
</WikitextIncludeOnly>

// 仅嵌入此部分
<WikitextOnlyInclude>
  这是被嵌入的内容
</WikitextOnlyInclude>
```

### build 模式输出

```
<noinclude><p>此模板用于显示引用信息。</p></noinclude>
<includeonly>[[Category:引用模板]]</includeonly>
<onlyinclude>这是被嵌入的内容</onlyinclude>
```

## 注意事项

- `<onlyinclude>` 在 dev 模式下的警告仅在 `NODE_ENV !== 'production'` 时触发
