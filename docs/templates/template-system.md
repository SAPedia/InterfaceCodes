# 模板系统

使用 React 服务端渲染（SSR）将组件编译为 Wikitext，输出 MediaWiki 模板页面。

## 目录结构

```
src/templates/
  <Name>/
    index.tsx          # 模板入口，export default 函数返回 ReactNode
    components/        # (可选)子组件
```

### 入口规范

每个模板目录下必须有 `index.tsx`，默认导出一个返回 `ReactNode` 的函数：

```tsx
export default function Example() {
    return (
        <div>
            <p>这是一个示例模板组件。</p>
            <p>在此编写需要预览的模板代码。</p>
        </div>
    );
}
```

## 构建流程

1. `scripts/build/templates.ts` 扫描 `src/templates/<Name>/index.tsx`
2. 使用 `react-dom/server` 的 `renderToStaticMarkup` 进行 SSR
3. 输出包裹在 `<noinclude>` 中的 Wikitext：
    - 顶部：`{{Interface template}}` 横幅 + DO-NOT-EDIT 注释
    - 底部：`{{doc}}` 包含
4. 输出至 `dist/templates/<Name>`

## 开发服务器

运行 `pnpm run dev` 启动 Vite 开发服务器，提供 React + Tailwind v4 的实时预览。

- 基于 `scripts/dev/vite.config.ts` 配置
- 开发模式下渲染真实 HTML（非 Wikitext）
- 路径别名 `~/` → `src/`

## 构建映射

| 本地路径                | MediaWiki 页面    |
| ----------------------- | ----------------- |
| `dist/templates/<Name>` | `Template:<Name>` |

## 创建新模板

1. 在 `src/templates/` 下创建 `<Name>/index.tsx`
2. 编写 React 组件并导出为默认函数
3. 运行 `pnpm run build` 测试编译
