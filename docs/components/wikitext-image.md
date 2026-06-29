# WikitextImage

wikitext 文件图片组件。对应 `[[File:...]]` 语法。支持图片大小、链接目标、替代文本等参数。

## Props

| 属性      | 类型              | 默认值 | 说明                                                                          |
| --------- | ----------------- | ------ | ----------------------------------------------------------------------------- |
| file      | `string`          | 必填   | 文件名                                                                        |
| width     | `number`          | —      | 图片宽度（px）                                                                |
| height    | `number`          | —      | 图片高度（px）                                                                |
| link      | `string \| false` | —      | 链接目标。`undefined` → 链接到文件页；`false` → 无链接；`string` → 自定义链接 |
| alt       | `string`          | —      | 替代文本                                                                      |
| className | `string`          | —      | 额外 CSS 类                                                                   |

## 示例

```tsx
import { WikitextImage } from '~/components';

// 最简单的文件引用
<WikitextImage file="SAO_logo.png" />

// 指定大小和链接
<WikitextImage
  file="Kirito_SAO.png"
  width={300}
  alt="桐人"
  link="刀剑神域"
/>

// 无链接
<WikitextImage file="Decorative.png" link={false} />
```

### dev 模式输出

```html
<span typeof="mw:File" class="mw-default-size">
    <a href="/File:SAO_logo.png" class="mw-file-description">
        <img
            loading="lazy"
            decoding="async"
            src="https://saoaw.com/images/a/ab/SAO_logo.png"
            alt="SAO logo"
            class="mw-file-element"
        />
    </a>
</span>
```

### build 模式输出

```
[[File:SAO_logo.png]]
[[File:Kirito_SAO.png|300px|link=刀剑神域|alt=桐人]]
[[File:Decorative.png|link=|alt=装饰图]]
```

## 注意事项

- 使用 `WikiImage` 组件在 dev 模式渲染实际图片，构建模式输出 wikitext 字符串
- `link` 参数以 `//` 开头时会被忽略并发出警告（防止协议相对 URL 注入）
- 未指定宽高时自动添加 `mw-default-size` CSS 类
