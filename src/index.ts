import { DurableObject } from "cloudflare:workers";
import { Hono } from "hono";

// Helper type definitions
interface PostRow {
  id: number;
  slug: string;
  title: string;
  summary: string;
  content: string;
  cover_image: string;
  category: string;
  tags: string;
  status: string;
  is_pinned: number;
  views: number;
  created_at: number;
  updated_at: number;
}

interface CommentRow {
  id: number;
  post_id: number;
  author_name: string;
  author_email: string;
  author_site: string;
  author_avatar: string;
  content: string;
  parent_id: number;
  is_admin: number;
  created_at: number;
}

const DEFAULT_CONFIG = {
  profile: {
    name: "陈明 (Alex Chen)",
    title: "全栈工程师 & 独立开发者",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    bio: "专注于 Web 全栈开发、Cloudflare 生态、AI 交互与现代 UI/UX。用代码记录生活，用组件构建世界。",
    location: "上海 / 远程",
    email: "alex.chen.dev@example.com",
    badge: "🚀 正在构建 Cloudflare Workers Native Apps",
    customCss: "",
    themeColor: "indigo", // indigo, emerald, rose, violet, sky, amber
    themeStyle: "dark" // dark (暗黑模式), minimal (简约风格), glass (玻璃拟态)
  },
  socials: [
    { name: "GitHub", url: "https://github.com", icon: "github", color: "hover:text-gray-900 dark:hover:text-white" },
    { name: "Twitter / X", url: "https://twitter.com", icon: "twitter", color: "hover:text-sky-500" },
    { name: "掘金", url: "https://juejin.cn", icon: "book-open", color: "hover:text-blue-600" },
    { name: "知乎", url: "https://zhihu.com", icon: "message-square", color: "hover:text-blue-500" },
    { name: "Bilibili", url: "https://bilibili.com", icon: "tv", color: "hover:text-pink-500" },
    { name: "Email", url: "mailto:alex.chen.dev@example.com", icon: "mail", color: "hover:text-emerald-500" }
  ],
  links: [
    {
      id: "l1",
      title: "⚡ 开源项目集锦",
      description: "探索我的 GitHub 开源项目、全栈 Demo 与边缘计算实践",
      url: "https://github.com",
      icon: "code",
      badge: "开源精品",
      badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      highlight: true
    },
    {
      id: "l2",
      title: "📝 个人技术博客",
      description: "阅读有关 React、Node.js、D1 数据库与云原生架构的技术文章",
      url: "#blog",
      icon: "file-text",
      badge: "每周更新",
      badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
      highlight: false
    },
    {
      id: "l3",
      title: "🤖 AI 原生工具箱",
      description: "内置 Gemini & Workers AI 驱动的日常辅助组件",
      url: "https://ai.example.com",
      icon: "sparkles",
      badge: "AI Native",
      badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
      highlight: false
    },
    {
      id: "l4",
      title: "☕ 约咖啡 / 独立顾问",
      description: "提供 Web 前端架构指导、性能优化与远程技术咨询服务",
      url: "#contact",
      icon: "coffee",
      badge: "开放合作",
      badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
      highlight: false
    }
  ]
};

const SAMPLE_POSTS = [
  {
    slug: "cloudflare-workers-d1-fullstack-blog",
    title: "使用 Cloudflare Workers & D1 构建极速 Serverless 个人主页与博客系统",
    summary: "探讨如何利用 Cloudflare 边缘节点、SQLite (D1/Durable Object) 与现代 React 构建零门槛、高可用且超快速的个人多链接聚合与博客平台。",
    cover_image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
    category: "架构设计",
    tags: JSON.stringify(["Cloudflare", "Workers", "D1", "React", "Serverless"]),
    content: `# 使用 Cloudflare Workers & D1 构建极速博客系统

在现代 Web 开发中，**边缘计算 (Edge Computing)** 正在重新定义服务端响应速度与部署体验。

传统博客系统（如 WordPress、Hexo 等）往往面临着部署繁琐、SSG 构建耗时、动态交互（评论、统计）不易扩展的问题。

---

## 核心架构设计

我们采用了 **边缘 API + SQLite 数据库 + 响应式前端** 的架构：

\`\`\`
[客户端浏览器]
      │
      ▼ (HTTP / WebSocket)
[Cloudflare Workers Edge]
      │
      ▼
[SQLite 存储引擎 (D1 / DO Storage)]
\`\`\`

### 优点一览
1. **零冷启动延迟**：基于 Cloudflare V8 隔离引擎，响应时间进入毫秒级。
2. **SQLite 原生持久化**：使用轻量 SQLite，包含完整的 SQL 查询支持。
3. **数据一体化**：文章、评论、个人信息与访问统计均保存在同一节点。

---

## Markdown 格式支持演示

博客管理后台完整支持标准的 **Markdown** 语法，包括：

### 代码块与高亮
\`\`\`typescript
export class App extends DurableObject {
  async fetch(request: Request) {
    // 处理 API 请求并执行 SQL
    const posts = this.ctx.storage.sql.exec(
      "SELECT * FROM posts WHERE status = 'published' ORDER BY created_at DESC"
    ).toArray();
    return Response.json(posts);
  }
}
\`\`\`

### 引言与提醒
> 💡 **提示**：个人主页信息、多链接聚合列表以及博客文章均可以在【管理后台】实时更新并生效，无需重新部署！

### 任务与特性清单
- [x] 个人主页动态配置
- [x] 多链接 (Linkhub) 聚合展示
- [x] Markdown 博客编辑器 (新建/编辑/删除)
- [x] 交互式评论系统 (支持管理员回复)
- [x] 时间轴 (Timeline) 归档视图
- [x] 全站与单篇访问计数器 (Analytics)

---

## 结语

欢迎在下方发布你的第一条评论，体验极致流畅的交互！`,
    status: "published",
    is_pinned: 1,
    views: 128
  },
  {
    slug: "2026-fullstack-dev-trends",
    title: "2026 年全栈工程师技术选型指南：从 Edge Computing 到 AI Native UI",
    summary: "从底层基础设施的变化看全栈前端的发展趋势，聊聊为什么 Component UI + Edge Database + AI SDK 正在成为新一代标准。",
    cover_image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    category: "技术前沿",
    tags: JSON.stringify(["全栈开发", "AI", "Edge", "前端设计"]),
    content: `# 2026 年全栈工程师技术选型指南

从过去几年的技术演进看，全栈开发体验已经从简单的“前后端分离”演变为 **“Edge-Native & AI-Augmented”**。

## 一、为什么 Edge Computing 正在普及？

传统云主机（如 EC2、Droplets）部署繁琐且需要运维。Serverless 1.0（如 AWS Lambda）解决了运维，但存在冷启动问题。

而 **Edge Compute (Cloudflare Workers, Vercel Edge)** 的优势在于：
1. 全球数百个数据中心最近距离响应用户。
2. V8 Isolate 技术实现微秒级启动。
3. 原生支持标准的 Fetch API 和 Web Standards。

---

## 二、AI Native 的界面设计

未来的 UI 不仅仅是静态的数据展示，更具备以下特征：
- **实时与智能**：交互更自然、具备自动理解与生成能力。
- **极致的动画与微交互**：流畅的响应式反馈。
- **自定义主题**：支持深色/浅色模式与用户偏好定制。

---

感谢阅读，欢迎在下方评论交流！`,
    status: "published",
    is_pinned: 0,
    views: 89
  },
  {
    slug: "link-aggregator-design-philosophy",
    title: "多链接聚合 (Link Aggregator) 的设计思考与个人品牌建设",
    summary: "为什么每位独立开发者与创作者都需要一个高度定制化的多链接聚合主页？聊聊布局、色彩与信息层级。",
    cover_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    category: "经验分享",
    tags: JSON.stringify(["Linkhub", "UI/UX", "个人品牌"]),
    content: `# 多链接聚合 (Link Aggregator) 的设计思考

在社交媒体分散的今天，Linktree 类的“多链接聚合”成为连接各个平台的桥梁。

## 为什么选择自建？

1. **完全掌控数据**：数据保存在自己的数据库中。
2. **SEO 与个人域名**：主页域名即个人品牌。
3. **结合博客与动态**：不只是链接列表，更是一个集主页、文章、评论于一体的数字名片。

欢迎在管理后台的“链接配置”中添加你的社交账号与专属链接！`,
    status: "published",
    is_pinned: 0,
    views: 64
  }
];

export class App extends DurableObject {
  private app: Hono;
  private activeToken: string = "admin_session_token_2026";

  constructor(ctx: DurableObjectState, env: Record<string, unknown>) {
    super(ctx, env);
    this.app = new Hono();
    this.initDatabase();
    this.setupRoutes();
  }

  private initDatabase() {
    this.ctx.storage.sql.exec(`
      CREATE TABLE IF NOT EXISTS config (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT UNIQUE,
        title TEXT NOT NULL,
        summary TEXT,
        content TEXT NOT NULL,
        cover_image TEXT,
        category TEXT DEFAULT '未分类',
        tags TEXT DEFAULT '[]',
        status TEXT DEFAULT 'published',
        is_pinned INTEGER DEFAULT 0,
        views INTEGER DEFAULT 0,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        post_id INTEGER NOT NULL,
        author_name TEXT NOT NULL,
        author_email TEXT,
        author_site TEXT,
        author_avatar TEXT,
        content TEXT NOT NULL,
        parent_id INTEGER DEFAULT 0,
        is_admin INTEGER DEFAULT 0,
        created_at INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS visits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        path TEXT NOT NULL,
        referer TEXT,
        user_agent TEXT,
        ip_hash TEXT,
        ts INTEGER NOT NULL
      );
    `);

    // Check if initial seed is required
    const configCheck = this.ctx.storage.sql.exec("SELECT key FROM config WHERE key = 'site_config'").toArray();
    if (configCheck.length === 0) {
      this.seedInitialData();
    }
  }

  private seedInitialData() {
    // Seed config
    this.ctx.storage.sql.exec(
      "INSERT OR REPLACE INTO config (key, value) VALUES ('site_config', ?)",
      JSON.stringify(DEFAULT_CONFIG)
    );
    this.ctx.storage.sql.exec(
      "INSERT OR REPLACE INTO config (key, value) VALUES ('admin_password', ?)",
      "admin123"
    );

    // Seed posts if empty
    const postsCount = this.ctx.storage.sql.exec("SELECT COUNT(*) as cnt FROM posts").one().cnt as number;
    if (postsCount === 0) {
      const now = Date.now();
      SAMPLE_POSTS.forEach((post, index) => {
        const postTime = now - index * 86400000 * 2;
        this.ctx.storage.sql.exec(
          `INSERT INTO posts (slug, title, summary, content, cover_image, category, tags, status, is_pinned, views, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          post.slug,
          post.title,
          post.summary,
          post.content,
          post.cover_image,
          post.category,
          post.tags,
          post.status,
          post.is_pinned,
          post.views,
          postTime,
          postTime
        );
      });

      // Get first post id for sample comments
      const firstPost = this.ctx.storage.sql.exec("SELECT id FROM posts ORDER BY id ASC LIMIT 1").toArray()[0] as { id: number } | undefined;
      if (firstPost) {
        this.ctx.storage.sql.exec(
          `INSERT INTO comments (post_id, author_name, author_email, author_site, author_avatar, content, parent_id, is_admin, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          firstPost.id,
          "小明",
          "xiaoming@example.com",
          "https://github.com",
          "https://api.dicebear.com/7.x/avataaars/svg?seed=Xiaoming",
          "架构写得非常清晰！用 Workers + D1 确实大大降低了服务端运维成本👍",
          0,
          0,
          now - 3600000 * 5
        );

        this.ctx.storage.sql.exec(
          `INSERT INTO comments (post_id, author_name, author_email, author_site, author_avatar, content, parent_id, is_admin, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          firstPost.id,
          "陈明 (作者)",
          "alex@example.com",
          "",
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
          "谢谢支持！D1 在微秒级响应上的表现真的很令人惊喜。",
          1,
          1,
          now - 3600000 * 2
        );
      }
    }
  }

  private isAdminAuthorized(c: any): boolean {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) return false;
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    return token === this.activeToken || token === "admin123";
  }

  private setupRoutes() {
    // 1. CONFIG & AUTH
    this.app.get("/api/config", (c) => {
      const row = this.ctx.storage.sql.exec("SELECT value FROM config WHERE key = 'site_config'").toArray()[0] as { value: string } | undefined;
      let data = DEFAULT_CONFIG;
      if (row && row.value) {
        try {
          data = JSON.parse(row.value);
        } catch (e) {
          data = DEFAULT_CONFIG;
        }
      }
      return c.json({ ok: true, data });
    });

    this.app.post("/api/config", async (c) => {
      if (!this.isAdminAuthorized(c)) {
        return c.json({ ok: false, error: "未授权或登录已过期" }, 401);
      }
      const body = await c.req.json();
      this.ctx.storage.sql.exec(
        "INSERT OR REPLACE INTO config (key, value) VALUES ('site_config', ?)",
        JSON.stringify(body)
      );
      return c.json({ ok: true, message: "配置保存成功" });
    });

    this.app.post("/api/auth/login", async (c) => {
      const { password } = await c.req.json<{ password?: string }>();
      const row = this.ctx.storage.sql.exec("SELECT value FROM config WHERE key = 'admin_password'").toArray()[0] as { value: string } | undefined;
      const adminPwd = row?.value || "admin123";

      if (password === adminPwd) {
        return c.json({ ok: true, token: this.activeToken, message: "登录成功" });
      } else {
        return c.json({ ok: false, error: "密码错误" }, 400);
      }
    });

    this.app.get("/api/auth/verify", (c) => {
      const authorized = this.isAdminAuthorized(c);
      return c.json({ ok: authorized });
    });

    this.app.post("/api/auth/password", async (c) => {
      if (!this.isAdminAuthorized(c)) {
        return c.json({ ok: false, error: "未授权" }, 401);
      }
      const { oldPassword, newPassword } = await c.req.json<{ oldPassword?: string; newPassword?: string }>();
      const row = this.ctx.storage.sql.exec("SELECT value FROM config WHERE key = 'admin_password'").toArray()[0] as { value: string } | undefined;
      const currentPwd = row?.value || "admin123";

      if (oldPassword !== currentPwd) {
        return c.json({ ok: false, error: "原密码不正确" }, 400);
      }
      if (!newPassword || newPassword.length < 4) {
        return c.json({ ok: false, error: "新密码长度至少4位" }, 400);
      }

      this.ctx.storage.sql.exec("INSERT OR REPLACE INTO config (key, value) VALUES ('admin_password', ?)", newPassword);
      return c.json({ ok: true, message: "密码修改成功" });
    });

    // 2. BLOG POSTS
    this.app.get("/api/posts", (c) => {
      const statusFilter = c.req.query("status") || "published";
      const category = c.req.query("category");
      const tag = c.req.query("tag");
      const search = c.req.query("search");

      let sql = "SELECT id, slug, title, summary, cover_image, category, tags, status, is_pinned, views, created_at, updated_at FROM posts WHERE 1=1";
      const params: any[] = [];

      if (statusFilter !== "all") {
        sql += " AND status = ?";
        params.push(statusFilter);
      }

      if (category) {
        sql += " AND category = ?";
        params.push(category);
      }

      if (tag) {
        sql += " AND tags LIKE ?";
        params.push(`%"${tag}"%`);
      }

      if (search) {
        sql += " AND (title LIKE ? OR summary LIKE ? OR content LIKE ?)";
        const term = `%${search}%`;
        params.push(term, term, term);
      }

      sql += " ORDER BY is_pinned DESC, created_at DESC";

      const posts = this.ctx.storage.sql.exec(sql, ...params).toArray();

      // Parse tags JSON safely
      const parsedPosts = posts.map((p: any) => {
        let tagList: string[] = [];
        try {
          tagList = typeof p.tags === "string" ? JSON.parse(p.tags) : p.tags || [];
        } catch {
          tagList = [];
        }
        return { ...p, tags: tagList };
      });

      // Categories list for filter menu
      const categoriesRows = this.ctx.storage.sql.exec("SELECT DISTINCT category FROM posts WHERE status = 'published' AND category IS NOT NULL AND category != ''").toArray();
      const categories = categoriesRows.map((r: any) => r.category);

      return c.json({ ok: true, posts: parsedPosts, categories });
    });

    this.app.get("/api/posts/:id", (c) => {
      const idOrSlug = c.req.param("id");
      const incView = c.req.query("inc_view") === "1";

      let post: any;
      if (/^\d+$/.test(idOrSlug)) {
        post = this.ctx.storage.sql.exec("SELECT * FROM posts WHERE id = ?", Number(idOrSlug)).toArray()[0];
      } else {
        post = this.ctx.storage.sql.exec("SELECT * FROM posts WHERE slug = ?", idOrSlug).toArray()[0];
      }

      if (!post) {
        return c.json({ ok: false, error: "文章不存在" }, 404);
      }

      if (incView) {
        this.ctx.storage.sql.exec("UPDATE posts SET views = views + 1 WHERE id = ?", post.id);
        post.views += 1;
      }

      let tags: string[] = [];
      try {
        tags = typeof post.tags === "string" ? JSON.parse(post.tags) : post.tags || [];
      } catch {
        tags = [];
      }

      // Comment count
      const commentCount = this.ctx.storage.sql.exec("SELECT COUNT(*) as cnt FROM comments WHERE post_id = ?", post.id).one().cnt as number;

      return c.json({ ok: true, post: { ...post, tags }, commentCount });
    });

    this.app.post("/api/posts", async (c) => {
      if (!this.isAdminAuthorized(c)) {
        return c.json({ ok: false, error: "未授权" }, 401);
      }

      const body = await c.req.json<{
        title: string;
        summary?: string;
        content: string;
        cover_image?: string;
        category?: string;
        tags?: string[];
        status?: string;
        is_pinned?: number;
      }>();

      if (!body.title || !body.content) {
        return c.json({ ok: false, error: "文章标题与内容不能为空" }, 400);
      }

      const now = Date.now();
      const slug = `post-${now}-${Math.random().toString(36).slice(2, 6)}`;
      const tagsJson = JSON.stringify(body.tags || []);

      this.ctx.storage.sql.exec(
        `INSERT INTO posts (slug, title, summary, content, cover_image, category, tags, status, is_pinned, views, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)`,
        slug,
        body.title,
        body.summary || body.content.slice(0, 150).replace(/[#*`]/g, ""),
        body.content,
        body.cover_image || "",
        body.category || "未分类",
        tagsJson,
        body.status || "published",
        body.is_pinned ? 1 : 0,
        now,
        now
      );

      const newPost = this.ctx.storage.sql.exec("SELECT * FROM posts WHERE slug = ?", slug).toArray()[0];
      return c.json({ ok: true, message: "发布成功", post: newPost });
    });

    this.app.put("/api/posts/:id", async (c) => {
      if (!this.isAdminAuthorized(c)) {
        return c.json({ ok: false, error: "未授权" }, 401);
      }

      const id = Number(c.req.param("id"));
      const body = await c.req.json<{
        title: string;
        summary?: string;
        content: string;
        cover_image?: string;
        category?: string;
        tags?: string[];
        status?: string;
        is_pinned?: number;
      }>();

      const existing = this.ctx.storage.sql.exec("SELECT id FROM posts WHERE id = ?", id).toArray()[0];
      if (!existing) {
        return c.json({ ok: false, error: "文章不存在" }, 404);
      }

      const now = Date.now();
      const tagsJson = JSON.stringify(body.tags || []);

      this.ctx.storage.sql.exec(
        `UPDATE posts SET title = ?, summary = ?, content = ?, cover_image = ?, category = ?, tags = ?, status = ?, is_pinned = ?, updated_at = ? WHERE id = ?`,
        body.title,
        body.summary || body.content.slice(0, 150).replace(/[#*`]/g, ""),
        body.content,
        body.cover_image || "",
        body.category || "未分类",
        tagsJson,
        body.status || "published",
        body.is_pinned ? 1 : 0,
        now,
        id
      );

      return c.json({ ok: true, message: "修改已更新" });
    });

    this.app.delete("/api/posts/:id", (c) => {
      if (!this.isAdminAuthorized(c)) {
        return c.json({ ok: false, error: "未授权" }, 401);
      }

      const id = Number(c.req.param("id"));
      this.ctx.storage.sql.exec("DELETE FROM posts WHERE id = ?", id);
      this.ctx.storage.sql.exec("DELETE FROM comments WHERE post_id = ?", id);
      return c.json({ ok: true, message: "文章已删除" });
    });

    // 3. TIMELINE
    this.app.get("/api/timeline", (c) => {
      const rows = this.ctx.storage.sql.exec(
        "SELECT id, slug, title, summary, category, created_at, views FROM posts WHERE status = 'published' ORDER BY created_at DESC"
      ).toArray();

      // Group by year and month
      const grouped: Record<string, any[]> = {};
      rows.forEach((post: any) => {
        const date = new Date(post.created_at);
        const yearMonth = `${date.getFullYear()}年${String(date.getMonth() + 1).padStart(2, "0")}月`;
        if (!grouped[yearMonth]) grouped[yearMonth] = [];
        grouped[yearMonth].push(post);
      });

      const timeline = Object.keys(grouped).map((period) => ({
        period,
        posts: grouped[period]
      }));

      return c.json({ ok: true, timeline, totalPosts: rows.length });
    });

    // 4. COMMENTS
    this.app.get("/api/posts/:id/comments", (c) => {
      const postId = Number(c.req.param("id"));
      const comments = this.ctx.storage.sql.exec(
        "SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC",
        postId
      ).toArray();

      return c.json({ ok: true, comments });
    });

    this.app.post("/api/posts/:id/comments", async (c) => {
      const postId = Number(c.req.param("id"));
      const body = await c.req.json<{
        author_name: string;
        author_email?: string;
        author_site?: string;
        content: string;
        parent_id?: number;
      }>();

      if (!body.author_name || !body.content) {
        return c.json({ ok: false, error: "请填写称呼与评论内容" }, 400);
      }

      const isAdmin = this.isAdminAuthorized(c);
      const nameClean = body.author_name.trim();
      const avatarSeed = encodeURIComponent(nameClean);
      const avatarUrl = isAdmin
        ? (JSON.parse((this.ctx.storage.sql.exec("SELECT value FROM config WHERE key = 'site_config'").toArray()[0] as any)?.value || "{}").profile?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400")
        : `https://api.dicebear.com/7.x/bottts/svg?seed=${avatarSeed}`;

      const now = Date.now();
      this.ctx.storage.sql.exec(
        `INSERT INTO comments (post_id, author_name, author_email, author_site, author_avatar, content, parent_id, is_admin, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        postId,
        nameClean,
        body.author_email || "",
        body.author_site || "",
        avatarUrl,
        body.content,
        body.parent_id || 0,
        isAdmin ? 1 : 0,
        now
      );

      return c.json({ ok: true, message: "评论发布成功" });
    });

    this.app.delete("/api/comments/:id", (c) => {
      if (!this.isAdminAuthorized(c)) {
        return c.json({ ok: false, error: "未授权" }, 401);
      }

      const id = Number(c.req.param("id"));
      this.ctx.storage.sql.exec("DELETE FROM comments WHERE id = ?", id);
      return c.json({ ok: true, message: "评论已删除" });
    });

    // 5. VISITS & ANALYTICS
    this.app.post("/api/visit", async (c) => {
      try {
        const { path, referer } = await c.req.json<{ path?: string; referer?: string }>();
        const userAgent = c.req.header("User-Agent") || "";
        const now = Date.now();

        this.ctx.storage.sql.exec(
          "INSERT INTO visits (path, referer, user_agent, ip_hash, ts) VALUES (?, ?, ?, ?, ?)",
          path || "/",
          referer || "",
          userAgent.slice(0, 150),
          "anon",
          now
        );
      } catch (e) {
        // non-blocking
      }
      return c.json({ ok: true });
    });

    this.app.get("/api/stats", (c) => {
      const totalVisits = this.ctx.storage.sql.exec("SELECT COUNT(*) as cnt FROM visits").one().cnt as number;
      const totalPosts = this.ctx.storage.sql.exec("SELECT COUNT(*) as cnt FROM posts WHERE status = 'published'").one().cnt as number;
      const totalComments = this.ctx.storage.sql.exec("SELECT COUNT(*) as cnt FROM comments").one().cnt as number;

      // Top viewed posts
      const topPosts = this.ctx.storage.sql.exec(
        "SELECT id, slug, title, views, category FROM posts ORDER BY views DESC LIMIT 5"
      ).toArray();

      // Recent 7 days visit count
      const now = Date.now();
      const sevenDaysAgo = now - 7 * 86400 * 1000;
      const recentVisitsCount = this.ctx.storage.sql.exec(
        "SELECT COUNT(*) as cnt FROM visits WHERE ts >= ?",
        sevenDaysAgo
      ).one().cnt as number;

      // Recent comments
      const recentComments = this.ctx.storage.sql.exec(
        `SELECT c.id, c.author_name, c.content, c.created_at, p.title as post_title, p.id as post_id
         FROM comments c JOIN posts p ON c.post_id = p.id
         ORDER BY c.created_at DESC LIMIT 5`
      ).toArray();

      return c.json({
        ok: true,
        stats: {
          totalVisits,
          recentVisitsCount,
          totalPosts,
          totalComments,
          topPosts,
          recentComments
        }
      });
    });

    // 6. SEED RESET
    this.app.post("/api/seed", (c) => {
      if (!this.isAdminAuthorized(c)) {
        return c.json({ ok: false, error: "未授权" }, 401);
      }
      this.seedInitialData();
      return c.json({ ok: true, message: "重置数据完成" });
    });
  }

  async fetch(request: Request) {
    return this.app.fetch(request);
  }
}

export default {
  async fetch(request: Request, env: any) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      const namespace = env.APP;
      if (namespace && typeof namespace.get === "function") {
        const id = namespace.idFromName("default");
        const stub = namespace.get(id);
        return stub.fetch(request);
      }

      return new Response(JSON.stringify({ ok: false, error: "Durable Object binding missing" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (env.ASSETS && typeof env.ASSETS.fetch === "function") {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not Found", { status: 404 });
  }
};
