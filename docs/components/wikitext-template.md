# WikitextTemplate

模板调用显示组件。对应 `{{template}}` 语法。支持位置参数和命名参数。

## Props

| 属性  | 类型                                       | 默认值 | 说明                              |
| ----- | ------------------------------------------ | ------ | --------------------------------- |
| title | `string`                                   | 必填   | 模板名称（不含 `Template:` 前缀） |
| args  | `Record<string, ReactNode> \| ReactNode[]` | —      | 模板参数                          |

## 示例

```tsx
import { WikitextTemplate } from '~/components';

// 无参数
<WikitextTemplate title="Stub" />

// 位置参数
<WikitextTemplate
  title="Info"
  args={['刀剑神域', '川原砾']}
/>

// 命名参数
<WikitextTemplate
  title="Quote"
  args={{ text: '这虽然是游戏，但可不是闹着玩的。', author: '茅场晶彦' }}
/>
```

### dev 模式输出

```html
<code>{{Stub}}</code>
<code>{{Info|刀剑神域|川原砾}}</code>
<code>{{Quote|text=这虽然是游戏，但可不是闹着玩的。|author=茅场晶彦}}</code>
```

### build 模式输出

```
{{Stub}}
{{Info|刀剑神域|川原砾}}
{{Quote|text=这虽然是游戏，但可不是闹着玩的。|author=茅场晶彦}}
```

## 注意事项

- dev 模式下用 `<code>` 包裹表示这是模板语法（非展开结果），build 模式直接输出纯 wikitext
