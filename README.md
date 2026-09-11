# chengzhnag个人主页

一个基于 Cloudflare Workers 的个人主页、博客与链接聚合项目，适合用于展示个人简介、技术文章、项目作品和社交入口。

本项目使用 Hono + Durable Object + SQLite 的方式实现后端，前端使用 React 与 Tailwind 构建，支持个人主页展示、博客文章管理、评论系统、主题切换和后台配置。

<p align="center">
  <img src="https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white" alt="Cloudflare Workers" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Hono-API-000000?logo=hono&logoColor=white" alt="Hono" />
</p>

---

## 项目简介

这是一个适合个人品牌展示的网站模板，集成了主页、博客、评论、链接聚合、访问统计与后台配置等能力。站点可直接用作个人主页、技术博客、作品集、创作者名片等场景。

它的核心目标是：

- 用一个网站承载“个人介绍 + 项目入口 + 文章输出 + 互动反馈”
- 让个人网站同时具备展示性与可维护性
- 在 Cloudflare Workers 上实现低成本、高性能、低运维的部署体验

---

## 功能特点

- 个人介绍主页：头像、封面、简介、社交链接、状态标签
- 多链接聚合：展示 GitHub、博客、项目、社交平台等入口
- Markdown 博客：文章列表、详情页、标签筛选、分类筛选
- 评论系统：支持文章评论与管理员删除
- 时间轴归档：按月份展示文章发布历程
- 主题切换：支持深色、极简、玻璃拟态等风格
- 管理后台：支持文章管理、链接配置、主页配置、密码修改
- 数据统计：访问量、文章数、评论数、热门文章排行
- 可部署到 Cloudflare Workers：直接面向边缘网络提供服务

---

## 技术栈

- Cloudflare Workers
- Hono
- Durable Object
- SQLite / Cloudflare Storage SQL
- React + JSX
- Tailwind CSS
- Marked
- Highlight.js
- Lucide React

---

## 项目结构

```text
.
├── public/
│   ├── index.html          # 页面入口
│   └── app.js              # 前端 React 逻辑与 UI 渲染
├── src/
│   └── index.ts            # Worker 后端、API 路由、数据库初始化
├── package.json            # 项目依赖与脚本
├── wrangler.json           # Cloudflare Workers 配置
├── LICENSE                 # 开源协议
├── README.md               # 项目说明文档
└── .gitignore              # Git 忽略规则
```

---

## 本地开发

### 1. 安装依赖

```bash
npm install
```

### 2. 启动本地开发环境

```bash
npx wrangler dev
```

访问地址：

```text
http://localhost:8787
```

---

## 部署说明

### 一键部署

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/chengzhnag/Homepage)

### 部署到 Cloudflare Workers

```bash
npx wrangler login
npx wrangler deploy
```

部署完成后，可在 Cloudflare Dashboard 中查看站点、访问日志和相关配置。

---

## 管理后台

项目内置管理后台，可以直接在前端页面中进行配置：

- 发布、编辑、删除文章
- 管理链接聚合列表
- 修改个人资料和主题配置
- 查看访问统计
- 修改后台密码

默认管理员密码建议在 [wrangler.json](wrangler.json) 中配置：

```json
{
  "vars": {
    "ADMIN_PASSWORD": "your-strong-password"
  }
}
```

如果不配置，项目会回退到默认值：

```text
admin123
```

> 生产环境中务必替换为强密码，并不要把默认值用于正式部署。

---

## API 接口

项目提供了以下核心接口：

- GET /api/config：读取站点配置
- POST /api/config：保存站点配置
- GET /api/posts：获取文章列表
- GET /api/posts/:id：获取单篇文章
- POST /api/posts：新建文章
- PUT /api/posts/:id：更新文章
- DELETE /api/posts/:id：删除文章
- GET /api/timeline：获取时间轴数据
- GET /api/stats：获取统计数据
- POST /api/visit：记录访问
- GET /api/posts/:id/comments：获取评论列表
- POST /api/posts/:id/comments：新增评论
- DELETE /api/comments/:id：删除评论
- POST /api/auth/login：管理员登录
- GET /api/auth/verify：校验登录状态
- POST /api/auth/password：修改密码
- POST /api/seed：重置示例数据

---

## 适用场景

这个项目适合用于：

- 个人主页、作品集
- 技术博客、学习笔记站点
- 独立开发者品牌页
- 多链接导航聚合页
- 轻量创作者个人站

---

## 未来优化建议

如果用于正式发布，建议继续完善：

- 自定义域名绑定
- 更完整的 SEO 结构化数据
- RSS / Atom 订阅
- Sitemap
- 图片压缩与 CDN 加速
- 日志监控与访问分析可视化
- 更强的安全控制与权限管理

---

## 许可证

本项目采用 MIT License，详情请查看 [LICENSE](LICENSE)。

---

## 结语

这个项目适合用作个人品牌展示站点，也适合作为独立开发者博客与导航入口的基础模板。你可以按自己的需求替换头像、文案、链接、主题和文章内容，快速搭建一个属于自己的主页。

---

# English Version

# chengzhnag Personal Homepage

A personal homepage, blog, and link aggregation project built on Cloudflare Workers, designed for personal branding, technical writing, project showcase, and social navigation.

This project uses Hono, Durable Objects, and SQLite for backend logic, and React plus Tailwind for the frontend. It supports homepage display, blog management, comments, theme switching, and admin configuration.

<p align="center">
  <img src="https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white" alt="Cloudflare Workers" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Hono-API-000000?logo=hono&logoColor=white" alt="Hono" />
</p>

---

## Overview

This is a website template for personal branding. It combines a homepage, blog, comments, link aggregation, analytics, and admin configuration into one product. It can be used as a personal homepage, technical blog, portfolio, or creator landing page.

The main goal is to provide a single website that covers:

- personal introduction
- project and social links
- article publishing
- interaction and feedback
- low-maintenance deployment on Cloudflare Workers

---

## Features

- Personal homepage: avatar, cover, bio, social links, and status badge
- Link aggregation: display GitHub, blog, project, and social media entry points
- Markdown blog: post list, detail page, tag filters, and category filters
- Comment system: support post comments and admin deletion
- Timeline archive: organize posts by month and year
- Theme switching: dark, minimal, and glassmorphism styles
- Admin panel: manage posts, links, homepage settings, and passwords
- Analytics: visit count, post count, comment count, and top posts
- Cloudflare deployment: edge deployment using Workers + Durable Object

---

## Tech Stack

- Cloudflare Workers
- Hono
- Durable Object
- SQLite / Cloudflare Storage SQL
- React + JSX
- Tailwind CSS
- Marked
- Highlight.js
- Lucide React

---

## Project Structure

```text
.
├── public/
│   ├── index.html          # HTML entry
│   └── app.js              # Frontend React logic and UI rendering
├── src/
│   └── index.ts            # Worker backend, API routes, and database setup
├── package.json            # Project dependencies and scripts
├── wrangler.json           # Cloudflare Workers configuration
├── LICENSE                 # Open source license
├── README.md               # Project documentation
└── .gitignore              # Git ignore rules
```

---

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Start the local environment

```bash
npx wrangler dev
```

Local URL:

```text
http://localhost:8787
```

---

## Deployment

### One-click deployment

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/chengzhnag/Homepage)

### Deploy to Cloudflare Workers

```bash
npx wrangler login
npx wrangler deploy
```

After deployment, you can monitor the site, logs, and traffic in the Cloudflare Dashboard.

---

## Admin Panel

The project includes a built-in admin panel that can be used directly from the front-end interface to:

- create, edit, and delete posts
- manage link aggregation items
- update profile and theme settings
- view analytics
- change the admin password

Default admin password is configured in [wrangler.json](wrangler.json):

```json
{
  "vars": {
    "ADMIN_PASSWORD": "your-strong-password"
  }
}
```

If not configured, the app falls back to:

```text
admin123
```

> For production, replace the fallback value with a strong password and do not rely on the default.

---

## API Endpoints

The project exposes the following core APIs:

- GET /api/config
- POST /api/config
- GET /api/posts
- GET /api/posts/:id
- POST /api/posts
- PUT /api/posts/:id
- DELETE /api/posts/:id
- GET /api/timeline
- GET /api/stats
- POST /api/visit
- GET /api/posts/:id/comments
- POST /api/posts/:id/comments
- DELETE /api/comments/:id
- POST /api/auth/login
- GET /api/auth/verify
- POST /api/auth/password
- POST /api/seed

---

## Use Cases

This project is suitable for:

- personal homepage and portfolio
- technical blog and learning notes
- independent developer brand page
- multi-link navigation site
- lightweight personal creator site

---

## Future Improvements

For production use, it is recommended to add:

- custom domain binding
- stronger SEO structured data
- RSS / Atom generation
- Sitemap generation
- image compression and CDN acceleration
- log monitoring and analytics dashboards
- stronger security and permission controls

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Final Note

This project is a strong starting point for a personal brand website and can also serve as a foundation for a developer blog and navigation portal. You can replace the avatar, text, links, theme, and posts with your own content to quickly build a unique homepage.
