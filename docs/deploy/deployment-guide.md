# 部署指南

通过 `mwn` 连接至 [SAPedia](https://saoaw.com) API，执行增量部署。

## 原理

1. 对 `dist/` 中每个文件计算 SHA-256 哈希
2. 对比远程 `MediaWiki:Deployment.json` 的旧哈希
3. 仅推送发生变更的文件
4. 更新 `MediaWiki:Deployment.json`

## 命令

```bash
pnpm run deploy          # 正式部署
pnpm run deploy --dry-run  # 预览变更
```

## 文件映射

`scripts/deploy/mapping.ts` 定义映射规则，关键映射：

- `dist/gadgets/...` → `MediaWiki:...`
- `dist/global/<name>.css` → `MediaWiki:<name>.css`
- `dist/templates/<name>` → `Template:<name>`
- `dist/widgets/<name>` → `Widget:<name>`

## CI/CD

`.github/workflows/deploy.yaml`：推送至 `main` 的 push 自动触发，涉及 `src/gadgets/**`、`src/global/**`、`src/widgets/**`、`src/templates/**` 时执行。
