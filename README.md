# yumi personal site

`yumi / cl` 的个人品牌网站：AI × automation × desktop tools。

这是一个纯静态 React + Vite 站点，没有数据库、登录、后端 API 或运行时读取 GitHub/X。内容在构建时写入页面，适合 GitHub Pages 和 Cloudflare Pages。

## 本地预览

```bash
npm install
npm run dev
```

生产构建与预览：

```bash
npm run build
npm run preview
```

构建产物在 `dist-static/`。

## GitHub Pages

仓库已包含 `.github/workflows/deploy-pages.yml`。将仓库推送到 GitHub 后，在仓库 Settings → Pages 中把 Source 设为 GitHub Actions，之后每次推送到 `main` 或 `master` 都会自动构建并发布。

工作流会自动使用 `/<仓库名>/` 作为 Vite base path，适配类似 `https://用户名.github.io/Autoxhs/` 的项目站点地址。

## Cloudflare Pages

在 Cloudflare Pages 创建项目并连接仓库，使用以下配置：

- Build command: `npm run build`
- Build output directory: `dist-static`
- Node version: `22`

Cloudflare Pages 使用根路径 `/`，不需要设置 `VITE_BASE_PATH`。

## 内容边界

网站只展示当前源码和公开资料可以核验的项目定位。`灵犀交付助手` 的在线资源仓库、批量装机、自动更新和完整报告等内容仍标为后续方向，不作为已交付能力宣传。
