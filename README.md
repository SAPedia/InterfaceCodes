# SAPedia InterfaceCodes

[SAPedia](https://saoaw.com) 的界面代码仓库。

## 前置要求

- [Node.js](https://nodejs.org/) 24+
- [pnpm](https://pnpm.io/) 11+

## 快速命令

```bash
pnpm run build       # 编译所有源代码至 dist/
pnpm run dev         # 启动 Vite 开发服务器（模板预览）
pnpm run lint        # 类型检查 + oxlint
pnpm run fmt         # 代码格式化
```

## 文档

- [小工具配置](docs/gadgets/configuration.md) — `definition.yaml` 字段详解
- [小工具注册表](docs/gadgets/registry.md) — `Gadgets-definition-list.yaml` 分组说明
- [全局样式](docs/global/global-styles.md) — 皮肤变量与全局 CSS
- [模板系统](docs/templates/template-system.md) — React SSR 模板开发
- [Widget 指南](docs/widgets/widget-guide.md) — Widget 配置与保护机制
- [构建管线](docs/build/pipeline.md) — 编译流程与技术栈
- [部署指南](docs/deploy/deployment-guide.md) — 增量部署与映射规则
- [组件库](docs/components/README.md) — Wikitext 渲染组件

## 致谢

本仓库参考了以下项目：

- [萌娘百科界面代码库](https://github.com/MoegirlPediaInterfaceAdmins/MoegirlPediaInterfaceCodes)
- [Vocawiki前端代码库](https://github.com/Vocawiki/wiki-frontend)
- [Awesome Gadgets](https://github.com/AnYiEE/AwesomeGadgets)

## 许可证

[MIT](LICENSE)
