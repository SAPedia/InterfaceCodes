# WikitextNoLanguageConversion

语言转换块组件。对应 `-{...}-` 语法。用于标记不应被语言变体转换器处理的内容。

## Props

| 属性     | 类型        | 默认值 | 说明                   |
| -------- | ----------- | ------ | ---------------------- |
| children | `ReactNode` | 必填   | 不受语言转换影响的内容 |

## 示例

```tsx
import { WikitextNoLanguageConversion } from '~/components';

// 保护专有名词不被转换
<WikitextNoLanguageConversion>这个名称不应被繁简转换</WikitextNoLanguageConversion>;
```

### dev 模式输出

```html
这个名称不应被繁简转换 <span lang="ja">キリト</span>
```

### build 模式输出

```
-{这个名称不应被繁简转换}-
```
