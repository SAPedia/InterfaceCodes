# Gadget 注册表

`src/gadgets/Gadgets-definition-list.yaml` 是 Gadget 的中央注册表，定义了各 Gadget 的分组和排序。构建脚本 `scripts/build/definition.ts` 读取此文件，结合各 Gadget 的 `definition.yaml` 生成 `MediaWiki:Gadgets-definition` 页面。

## 分组结构

Gadget 可按多个 Section 组织，在 `Gadgets-definition-list.yaml` 中定义。每个 Section 包含一组 Gadget，对应 MediaWiki 的 Special:Gadgets 页面中的显示分组。

## 操作指南

### 添加新 Gadget

1. 在 `src/gadgets/` 下创建 `<Name>/` 目录
2. 创建 `definition.yaml` 和源文件
3. 在 `Gadgets-definition-list.yaml` 的对应 section 中添加 `<Name>`
4. 运行 `pnpm run build` 验证生成

### 禁用 Gadget

- 方案一（保留文件，推荐）：将 `definition.yaml` 中的 `enable` 设为 `false`
- 方案二（彻底移除）：从 `Gadgets-definition-list.yaml` 中删除条目并移除目录

### 调整顺序

直接编辑 YAML 文件中各 section 的 Gadget 列表顺序，构建时会按此顺序生成。
