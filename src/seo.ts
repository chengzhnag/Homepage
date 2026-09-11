export interface SeoPost {
  id: number;
  slug: string;
  title: string;
  summary: string;
  created_at: number;
  updated_at: number;
}

export function escapeXml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function getSiteOrigin(requestUrl: string, configuredOrigin?: unknown): string {
  if (typeof configuredOrigin === "string" && configuredOrigin.trim()) {
    return configuredOrigin.trim().replace(/\/+$/, "");
  }

  return new URL(requestUrl).origin;
}

export function generateRobotsTxt(origin: string): string {
  return [
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin",
    "",
    `Sitemap: ${origin}/sitemap.xml`,
    ""
  ].join("\n");
}

export function generateSitemapXml(origin: string, posts: SeoPost[]): string {
  const staticUrls = [
    { path: "/", priority: "1.0" },
    { path: "/blog", priority: "0.9" },
    { path: "/timeline", priority: "0.6" }
  ];

  const staticEntries = staticUrls.map(({ path, priority }) => `
    <url>
      <loc>${escapeXml(`${origin}${path}`)}</loc>
      <changefreq>weekly</changefreq>
      <priority>${priority}</priority>
    </url>`).join("");

  const postEntries = posts.map((post) => `
    <url>
      <loc>${escapeXml(`${origin}/post/${post.id}`)}</loc>
      <lastmod>${new Date(post.updated_at || post.created_at).toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticEntries}${postEntries}
</urlset>`;
}

export function generateRssXml(origin: string, siteTitle: string, posts: SeoPost[]): string {
  const items = posts.map((post) => {
    const link = `${origin}/post/${post.id}`;
    return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
      <description>${escapeXml(post.summary || "")}</description>
    </item>`;
  }).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <link>${escapeXml(origin)}</link>
    <description>${escapeXml(`${siteTitle}的博客与技术分享`)}</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;
}
