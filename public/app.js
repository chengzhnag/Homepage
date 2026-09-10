import React, { useState, useEffect, useMemo, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  User, Link2, BookOpen, Clock, Eye, MessageSquare, Settings,
  Plus, Trash2, Edit, Sparkles, Coffee, Code, FileText, ChevronRight,
  Search, Share2, Tag, Check, LogIn, LogOut, ArrowLeft, ArrowUp, BarChart2,
  ShieldCheck, Lock, ExternalLink, Mail, Github, Twitter, RefreshCw,
  Send, Layers, ThumbsUp, Calendar, MapPin, Globe, Tv, Bookmark, Download,
  Sun, Moon, Palette, Sliders, CheckCircle2
} from "lucide-react";
// Theme Style Presets Definition
export const THEME_PRESETS = {
  dark: {
    id: "dark",
    name: "暗黑极客",
    badge: "🌙 暗黑模式",
    description: "深邃沉浸式色调，超高对比度与科技极客质感",
    pageBg: "bg-slate-950 text-slate-100",
    headerBg: "bg-slate-900/80 backdrop-blur-md border-b border-slate-800 text-slate-100",
    cardBg: "bg-slate-900/70 border border-slate-800 shadow-xl backdrop-blur-sm",
    cardHoverBg: "hover:bg-slate-900 hover:border-slate-700",
    subCardBg: "bg-slate-950/60 border border-slate-800/80 text-slate-200",
    textPrimary: "text-white",
    textSecondary: "text-slate-300",
    textMuted: "text-slate-400",
    textSubtle: "text-slate-500",
    border: "border-slate-800",
    borderSubtle: "border-slate-800/60",
    accentBg: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20",
    accentText: "text-indigo-400",
    accentBorder: "border-indigo-500/30",
    navActive: "bg-indigo-600 text-white shadow-md",
    navInactive: "text-slate-300 hover:text-white hover:bg-slate-800",
    inputBg: "bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:border-indigo-500",
    badgeBg: "bg-slate-800 text-slate-300 border border-slate-700/60",
    highlightCard: "bg-gradient-to-r from-indigo-950/70 to-slate-900/90 border-indigo-500/40 hover:border-indigo-400 hover:shadow-indigo-500/10",
    footerBg: "border-t border-slate-800 bg-slate-900/50 text-slate-500",
    markdownClass: "markdown-dark"
  },
  minimal: {
    id: "minimal",
    name: "简约清爽",
    badge: "☀️ 简约风格",
    description: "素雅白净与清晰字形，极简线条与优雅纸质美感",
    pageBg: "bg-slate-50 text-slate-900",
    headerBg: "bg-white/90 backdrop-blur-md border-b border-slate-200/80 text-slate-900 shadow-sm",
    cardBg: "bg-white border border-slate-200 shadow-sm rounded-2xl",
    cardHoverBg: "hover:bg-slate-100/80 hover:border-slate-300",
    subCardBg: "bg-slate-100/70 border border-slate-200/80 text-slate-800",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-700",
    textMuted: "text-slate-500",
    textSubtle: "text-slate-400",
    border: "border-slate-200",
    borderSubtle: "border-slate-100",
    accentBg: "bg-slate-900 hover:bg-slate-800 text-white shadow-sm",
    accentText: "text-indigo-600",
    accentBorder: "border-indigo-200",
    navActive: "bg-slate-900 text-white shadow-sm",
    navInactive: "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
    inputBg: "bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-600",
    badgeBg: "bg-slate-100 text-slate-700 border border-slate-200",
    highlightCard: "bg-gradient-to-r from-indigo-50/90 to-blue-50/90 border-indigo-300/80 hover:border-indigo-400 hover:shadow-md",
    footerBg: "border-t border-slate-200 bg-white/80 text-slate-500",
    markdownClass: "markdown-minimal"
  },
  glass: {
    id: "glass",
    name: "玻璃拟态",
    badge: "🔮 玻璃拟态",
    description: "晶莹毛玻璃面板与微光炫彩，极具视听灵动微交互",
    pageBg: "bg-slate-950 text-slate-100 relative",
    headerBg: "bg-slate-900/40 backdrop-blur-xl border-b border-white/10 text-white shadow-[0_4px_30px_rgba(0,0,0,0.1)]",
    cardBg: "bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl",
    cardHoverBg: "hover:bg-white/15 hover:border-white/30 hover:shadow-[0_8px_32px_0_rgba(99,102,241,0.25)]",
    subCardBg: "bg-white/5 backdrop-blur-md border border-white/10 text-slate-200",
    textPrimary: "text-white",
    textSecondary: "text-slate-200",
    textMuted: "text-slate-300",
    textSubtle: "text-slate-400",
    border: "border-white/15",
    borderSubtle: "border-white/10",
    accentBg: "bg-indigo-500/80 hover:bg-indigo-500 text-white backdrop-blur-md border border-indigo-400/30 shadow-lg shadow-indigo-500/20",
    accentText: "text-indigo-300",
    accentBorder: "border-indigo-400/30",
    navActive: "bg-white/20 text-white backdrop-blur-md border border-white/30 shadow-lg",
    navInactive: "text-slate-300 hover:text-white hover:bg-white/10",
    inputBg: "bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 focus:border-indigo-400",
    badgeBg: "bg-white/15 text-indigo-200 border border-white/20 backdrop-blur-md",
    highlightCard: "bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-slate-900/50 backdrop-blur-xl border border-indigo-400/40 hover:border-indigo-300 hover:shadow-[0_8px_32px_0_rgba(129,140,248,0.3)]",
    footerBg: "border-t border-white/10 bg-slate-950/60 backdrop-blur-md text-slate-400",
    markdownClass: "markdown-glass"
  }
};

// Helper for dynamic icon rendering
const IconHelper = ({ name, className = "w-5 h-5" }) => {
  const icons = {
    user: User, link: Link2, 'file-text': FileText, clock: Clock, eye: Eye,
    'message-square': MessageSquare, settings: Settings, code: Code,
    sparkles: Sparkles, coffee: Coffee, mail: Mail, github: Github,
    twitter: Twitter, tv: Tv, globe: Globe, bookmark: Bookmark,
    'book-open': BookOpen, calendar: Calendar, 'map-pin': MapPin,
    'external-link': ExternalLink, 'share-2': Share2, download: Download,
    layers: Layers, sun: Sun, moon: Moon, palette: Palette
  };
  const Component = icons[name?.toLowerCase()] || Link2;
  return <Component className={className} />;
};

const LINK_ICON_OPTIONS = [
  { value: "link", label: "通用链接" },
  { value: "github", label: "GitHub" },
  { value: "twitter", label: "Twitter / X" },
  { value: "mail", label: "邮箱" },
  { value: "globe", label: "个人网站" },
  { value: "file-text", label: "文章 / 博客" },
  { value: "book-open", label: "书籍 / 专栏" },
  { value: "code", label: "代码 / 开源项目" },
  { value: "sparkles", label: "AI / 工具" },
  { value: "coffee", label: "咖啡 / 合作" },
  { value: "message-square", label: "评论 / 社区" },
  { value: "tv", label: "视频 / 直播" },
  { value: "bookmark", label: "收藏 / 书签" },
  { value: "user", label: "个人资料" },
  { value: "calendar", label: "日程 / 活动" },
  { value: "map-pin", label: "地点 / 地址" },
  { value: "external-link", label: "外部链接" },
  { value: "share-2", label: "分享" },
  { value: "download", label: "下载" },
  { value: "layers", label: "资源集合" }
];

const SOCIAL_ICON_OPTIONS = [
  { value: "link", label: "通用链接" },
  { value: "github", label: "GitHub" },
  { value: "twitter", label: "Twitter / X" },
  { value: "mail", label: "邮箱" },
  { value: "globe", label: "个人网站" },
  { value: "message-square", label: "社区 / 问答" },
  { value: "tv", label: "视频 / 直播" },
  { value: "book-open", label: "博客 / 专栏" },
  { value: "bookmark", label: "收藏 / 书签" },
  { value: "user", label: "个人资料" }
];

function IconSelect({ value = "link", options = LINK_ICON_OPTIONS, onChange, theme }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const selected = options.find((option) => option.value === value) || options[0];

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={`flex w-full items-center justify-between rounded px-3 py-1.5 text-xs ${theme.inputBg}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex min-w-0 items-center gap-2">
          <IconHelper name={selected.value} className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{selected.label}</span>
        </span>
        <ChevronRight className={`h-3.5 w-3.5 shrink-0 transition-transform ${isOpen ? "rotate-90" : ""}`} />
      </button>

      {isOpen && (
        <div className={`absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto rounded-lg border p-1 shadow-2xl ${theme.cardBg}`} role="listbox">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`flex w-full items-center gap-2 rounded px-2.5 py-2 text-left text-xs ${
                selected.value === option.value ? theme.accentBg : theme.navInactive
              }`}
              role="option"
              aria-selected={selected.value === option.value}
            >
              <IconHelper name={option.value} className="h-3.5 w-3.5 shrink-0" />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Reading time calculator
function getReadingTime(text = "") {
  const words = text.trim().length;
  const minutes = Math.ceil(words / 400);
  return minutes < 1 ? 1 : minutes;
}

// Date formatter
function formatDate(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function formatRelativeTime(ts) {
  if (!ts) return "";
  const diff = (Date.now() - ts) / 1000;
  if (diff < 60) return "刚刚";
  if (diff < 3600) return `${Math.floor(diff / 60)} 分钟前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} 小时前`;
  if (diff < 86400 * 30) return `${Math.floor(diff / 86400)} 天前`;
  return formatDate(ts);
}

function renderMarkdown(content = "") {
  if (!window.marked) return content;
  return window.marked.parse(content, { gfm: true, breaks: false });
}

const DEFAULT_COVER_IMAGES = [
  "https://img.alicdn.com/imgextra/i1/O1CN01E2kAgAD3KnH3thCa_!!6000000005269-0-tps-1920-1200.jpg",
  "https://img.alicdn.com/imgextra/i1/O1CN01dni3PPnFo9E3thAe_!!6000000007991-0-tps-1920-1080.jpg",
  "https://img.alicdn.com/imgextra/i4/O1CN01vCOgwiec7jD24u8m_!!6000000003999-0-tps-1024-768.jpg"
];

function getRandomCoverImage() {
  return DEFAULT_COVER_IMAGES[Math.floor(Math.random() * DEFAULT_COVER_IMAGES.length)];
}

function getRouteState(pathname = window.location.pathname) {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const postMatch = normalizedPath.match(/^\/post\/(\d+)$/);

  if (postMatch) {
    return { activeTab: "blog", selectedPostId: Number(postMatch[1]) };
  }

  if (normalizedPath === "/blog") return { activeTab: "blog", selectedPostId: null };
  if (normalizedPath === "/timeline") return { activeTab: "timeline", selectedPostId: null };
  if (normalizedPath === "/admin") return { activeTab: "admin", selectedPostId: null };
  return { activeTab: "home", selectedPostId: null };
}

function ConfirmDialog({ message, onConfirm, onCancel, theme }) {
  if (!message) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
      <div className={`w-full max-w-sm rounded-2xl border p-6 shadow-2xl ${theme.cardBg}`}>
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-red-500/15 p-2 text-red-400">
            <Trash2 className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h2 className={`text-base font-bold ${theme.textPrimary}`}>确认操作</h2>
            <p className={`mt-2 text-sm leading-relaxed ${theme.textSecondary}`}>{message}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className={`rounded-lg px-4 py-2 text-xs font-semibold ${theme.subCardBg}`}
          >
            取消
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-500"
          >
            确认删除
          </button>
        </div>
      </div>
    </div>
  );
}

export function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState(() => getRouteState().activeTab); // home, blog, timeline, admin
  const [selectedPostId, setSelectedPostId] = useState(() => getRouteState().selectedPostId); // When viewing single post

  // Theme State
  const [themeStyle, setThemeStyle] = useState(() => localStorage.getItem("site_theme") || "dark");

  // Data States
  const [config, setConfig] = useState(null);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  // Admin & Auth State
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("admin_token") || "");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [adminTab, setAdminTab] = useState("posts"); // posts, links, profile, stats, password

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState("");

  // Toast notification
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const requestConfirm = (message, onConfirm) => {
    setConfirmDialog({ message, onConfirm });
  };

  const closeConfirm = () => {
    setConfirmDialog(null);
  };

  const confirmAction = async () => {
    const action = confirmDialog?.onConfirm;
    closeConfirm();
    if (action) await action();
  };

  const navigate = (path, replace = false) => {
    const route = getRouteState(path);
    const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
    const nextPath = path.replace(/\/+$/, "") || "/";

    if (currentPath !== nextPath) {
      const method = replace ? "replaceState" : "pushState";
      window.history[method]({ appRoute: true }, "", path);
    }

    setActiveTab(route.activeTab);
    setSelectedPostId(route.selectedPostId);
  };

  useEffect(() => {
    const handlePopState = () => {
      const route = getRouteState();
      setActiveTab(route.activeTab);
      setSelectedPostId(route.selectedPostId);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Initial Load
  useEffect(() => {
    fetchInitialData();
    logSiteVisit();
  }, []);

  // Sync theme and SEO metadata when config loads
  useEffect(() => {
    if (config?.profile?.themeStyle) {
      setThemeStyle(config.profile.themeStyle);
    }

    const profileName = config?.profile?.name || "chengzhnag个人主页";
    const profileTitle = config?.profile?.title ? `${profileName} | ${config.profile.title}` : profileName;
    document.title = profileTitle;

    const descriptionMeta = document.querySelector('meta[name="description"]');
    const bioText = config?.profile?.bio || "chengzhnag的个人主页，聚合链接、技术博客、作品展示与生活记录。";
    if (descriptionMeta) {
      descriptionMeta.setAttribute("content", bioText);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.setAttribute("content", profileName);
    if (ogDescription) ogDescription.setAttribute("content", bioText);
  }, [config]);

  // Verify Auth Token on load
  useEffect(() => {
    if (authToken) {
      fetch("./api/auth/verify", {
        headers: { Authorization: `Bearer ${authToken}` }
      })
        .then((r) => r.json())
        .then((res) => {
          setIsAdmin(!!res.ok);
          if (!res.ok) {
            localStorage.removeItem("admin_token");
            setAuthToken("");
          }
        })
        .catch(() => setIsAdmin(false));
    }
  }, [authToken]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [configRes, postsRes, statsRes] = await Promise.all([
        fetch("./api/config").then((r) => r.json()),
        fetch("./api/posts?status=published").then((r) => r.json()),
        fetch("./api/stats").then((r) => r.json())
      ]);

      if (configRes.ok) setConfig(configRes.data);
      if (postsRes.ok) {
        setPosts(postsRes.posts || []);
        setCategories(postsRes.categories || []);
      }
      if (statsRes.ok) setStats(statsRes.stats);
    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const [postsRes, statsRes] = await Promise.all([
        fetch("./api/posts?status=published").then((r) => r.json()),
        fetch("./api/stats").then((r) => r.json())
      ]);
      if (postsRes.ok) {
        setPosts(postsRes.posts || []);
        setCategories(postsRes.categories || []);
      }
      if (statsRes.ok) setStats(statsRes.stats);
    } catch (e) {
      console.error("Error refreshing posts:", e);
    }
  };

  const handlePostUpdated = (updatedPost) => {
    if (!updatedPost) return;
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === updatedPost.id || p.slug === updatedPost.slug
          ? { ...p, views: updatedPost.views }
          : p
      )
    );
    setTimeline((prevTimeline) =>
      prevTimeline.map((group) => ({
        ...group,
        posts: group.posts.map((p) =>
          p.id === updatedPost.id || p.slug === updatedPost.slug
            ? { ...p, views: updatedPost.views }
            : p
        )
      }))
    );
  };

  const fetchTimeline = async () => {
    try {
      const res = await fetch("./api/timeline").then((r) => r.json());
      if (res.ok) setTimeline(res.timeline || []);
    } catch (e) {
      console.error("Error fetching timeline", e);
    }
  };

  useEffect(() => {
    if (activeTab === "timeline") {
      fetchTimeline();
    }
    if (activeTab === "admin" && isAdmin) {
      fetchStats();
    }
  }, [activeTab, isAdmin]);

  const fetchStats = async () => {
    try {
      const res = await fetch("./api/stats").then((r) => r.json());
      if (res.ok) setStats(res.stats);
    } catch (e) { }
  };

  const logSiteVisit = async () => {
    try {
      await fetch("./api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: window.location.pathname, referer: document.referrer })
      });
    } catch (e) { }
  };

  // Switch Theme Action
  const handleSwitchTheme = (newTheme) => {
    setThemeStyle(newTheme);
    localStorage.setItem("site_theme", newTheme);
    showToast(`当前切换为【${THEME_PRESETS[newTheme]?.name || newTheme}】风格`);
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch("./api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: loginPassword })
      }).then((r) => r.json());

      if (res.ok) {
        setAuthToken(res.token);
        localStorage.setItem("admin_token", res.token);
        setIsAdmin(true);
        setLoginPassword("");
        showToast("后台已成功登录");
      } else {
        setAuthError(res.error || "密码错误");
      }
    } catch (err) {
      setAuthError("登录服务异常");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setAuthToken("");
    setIsAdmin(false);
    showToast("已退出管理模式", "info");
  };

  // Filtered posts for blog list
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
      const matchesTag = !selectedTag || (p.tags && p.tags.includes(selectedTag));
      const matchesSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [posts, selectedCategory, selectedTag, searchQuery]);

  const activeTheme = THEME_PRESETS[themeStyle] || THEME_PRESETS.dark;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-slate-300">
        <div className="flex flex-col items-center gap-3 animate-pulse">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium">正在加载个人空间与博客数据...</p>
        </div>
      </div>
    );
  }

  const profile = config?.profile || {};
  const links = config?.links || [];
  const socials = config?.socials || [];

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${activeTheme.pageBg}`}>
      {/* Background Orbs for Glassmorphism */}
      {themeStyle === "glass" && (
        <>
          <div className="glass-orb-1"></div>
          <div className="glass-orb-2"></div>
        </>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-sm font-medium border backdrop-blur-md transition-all animate-bounce ${toast.type === 'error' ? 'bg-red-900/90 text-red-200 border-red-700' : 'bg-emerald-900/90 text-emerald-100 border-emerald-700'
          }`}>
          <span>{toast.message}</span>
        </div>
      )}

      <ConfirmDialog
        message={confirmDialog?.message}
        onConfirm={confirmAction}
        onCancel={closeConfirm}
        theme={activeTheme}
      />

      {/* Top Header Navigation */}
      <header className={`sticky top-0 z-40 transition-colors duration-300 ${activeTheme.headerBg}`}>
        <div className="max-w-5xl mx-auto flex h-14 items-center gap-2 px-3 sm:h-16 sm:px-6">
          <div className="flex shrink-0 cursor-pointer items-center gap-3" onClick={() => { navigate("/"); fetchPosts(); fetchTimeline(); }}>
            <img src={profile.avatar} alt={profile.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/50" />
            <div className="hidden sm:block">
              <h1 className={`font-bold text-sm leading-tight ${activeTheme.textPrimary}`}>{profile.name}</h1>
              <p className={`text-xs ${activeTheme.textMuted}`}>{profile.title}</p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="flex min-w-0 flex-1 items-center justify-center gap-0.5 text-sm sm:gap-2">
            <button
              onClick={() => { navigate("/"); fetchPosts(); fetchTimeline(); }}
              title="主页"
              aria-label="主页"
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1.5 font-medium transition-all sm:px-3 ${activeTab === "home" && !selectedPostId ? activeTheme.navActive : activeTheme.navInactive
                }`}
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">主页</span>
            </button>

            <button
              onClick={() => { navigate("/blog"); fetchPosts(); fetchTimeline(); }}
              title="博客"
              aria-label="博客"
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1.5 font-medium transition-all sm:px-3 ${activeTab === "blog" || selectedPostId ? activeTheme.navActive : activeTheme.navInactive
                }`}
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">博客</span>
              {posts.length > 0 && (
                <span className={`hidden text-[10px] px-1.5 py-0.2 rounded-full font-mono sm:inline ${activeTab === "blog" || selectedPostId ? "bg-white/20 text-white" : "bg-slate-200/50 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  }`}>
                  {posts.length}
                </span>
              )}
            </button>

            <button
              onClick={() => { navigate("/timeline"); fetchPosts(); fetchTimeline(); }}
              title="时间轴"
              aria-label="时间轴"
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1.5 font-medium transition-all sm:px-3 ${activeTab === "timeline" ? activeTheme.navActive : activeTheme.navInactive
                }`}
            >
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">时间轴</span>
            </button>

            <button
              onClick={() => navigate("/admin")}
              title="管理后台"
              aria-label="管理后台"
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1.5 font-medium transition-all sm:px-3 ${activeTab === "admin" ? activeTheme.navActive : activeTheme.navInactive
                }`}
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">管理后台</span>
              {isAdmin && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>}
            </button>
          </nav>

          {/* Theme Switcher Quick Toggle */}
          <div className="relative group shrink-0">
            <button
              className={`flex items-center gap-1.5 rounded-lg border p-2 text-xs font-semibold transition-all sm:px-2.5 sm:py-1.5 ${themeStyle === "glass"
                  ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                  : themeStyle === "minimal"
                    ? "bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200"
                    : "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                }`}
              title="快速切换视觉样式风格"
            >
              <Palette className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">{activeTheme.name}</span>
            </button>

            <div className={`absolute right-0 mt-1 w-48 rounded-xl border p-1.5 shadow-2xl z-50 backdrop-blur-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all ${themeStyle === "minimal" ? "bg-white border-slate-200 text-slate-800" : "bg-slate-900/95 border-slate-800 text-slate-100"
              }`}>
              <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-700/50 mb-1">
                风格主题模式
              </div>
              {Object.values(THEME_PRESETS).map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleSwitchTheme(t.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${themeStyle === t.id
                      ? "bg-indigo-600 text-white font-bold"
                      : themeStyle === "minimal"
                        ? "hover:bg-slate-100 text-slate-700"
                        : "hover:bg-slate-800 text-slate-300"
                    }`}
                >
                  <span>{t.badge}</span>
                  {themeStyle === t.id && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 relative">
        {selectedPostId ? (
          <PostDetailView
            postId={selectedPostId}
            onBack={() => {
              if (window.history.state?.appRoute) {
                window.history.back();
              } else {
                navigate("/", true);
              }
              fetchPosts();
              fetchTimeline();
            }}
            onPostUpdated={handlePostUpdated}
            isAdmin={isAdmin}
            showToast={showToast}
            requestConfirm={requestConfirm}
            theme={activeTheme}
          />
        ) : activeTab === "home" ? (
          <HomeView
            profile={profile}
            links={links}
            socials={socials}
            posts={posts}
            onSelectPost={(id) => navigate(`/post/${id}`)}
            onGoBlog={() => navigate("/blog")}
            theme={activeTheme}
          />
        ) : activeTab === "blog" ? (
          <BlogListView
            posts={filteredPosts}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectPost={(id) => navigate(`/post/${id}`)}
            theme={activeTheme}
          />
        ) : activeTab === "timeline" ? (
          <TimelineView timeline={timeline} onSelectPost={(id) => navigate(`/post/${id}`)} theme={activeTheme} />
        ) : activeTab === "admin" ? (
          <AdminView
            isAdmin={isAdmin}
            authToken={authToken}
            loginPassword={loginPassword}
            setLoginPassword={setLoginPassword}
            authError={authError}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            adminTab={adminTab}
            setAdminTab={setAdminTab}
            config={config}
            setConfig={setConfig}
            posts={posts}
            fetchPosts={fetchInitialData}
            stats={stats}
            showToast={showToast}
            requestConfirm={requestConfirm}
            theme={activeTheme}
            themeStyle={themeStyle}
            onSwitchTheme={handleSwitchTheme}
          />
        ) : null}
      </main>

      {/* Footer */}
      <footer className={`py-8 text-center text-xs transition-colors duration-300 relative z-10 ${activeTheme.footerBg}`}>
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {profile.name}. Powered by Cloudflare Workers.</p>
          <div className="flex items-center gap-4">
            {/* <span>当前风格: <strong className="font-semibold">{activeTheme.badge}</strong></span>
            <span>·</span> */}
            <span>全站文章: <strong className="font-mono">{posts.length}</strong></span>
            <span>·</span>
            <span>全站访问: <strong className="font-mono">{stats?.totalVisits || 0}</strong></span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// -------------------------------------------------------------
// 1. HOME VIEW (Personal Bio + Aggregated Linkhub)
// -------------------------------------------------------------
function HomeView({ profile, links, socials, posts, onSelectPost, onGoBlog, theme }) {
  const pinnedPosts = posts.filter((p) => p.is_pinned).slice(0, 3);
  const recentPosts = posts.slice(0, 4);

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Bio Banner & Card */}
      <div className={`overflow-hidden rounded-2xl relative ${theme.cardBg}`}>
        {/* Cover image */}
        <div className="h-44 sm:h-56 w-full relative overflow-hidden bg-slate-800">
          <img
            src={profile.cover || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200"}
            alt="Cover"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
        </div>

        {/* Profile Info Overlay */}
        <div className="px-6 pb-6 pt-0 relative -mt-16 sm:-mt-20 flex flex-col sm:flex-row gap-6 items-start sm:items-end justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover ring-4 ring-slate-900 shadow-2xl bg-slate-800"
            />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className={`text-2xl sm:text-3xl font-extrabold ${theme.textPrimary}`}>{profile.name}</h2>
                {profile.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {profile.badge}
                  </span>
                )}
              </div>
              <p className={`font-medium text-sm sm:text-base ${theme.textSecondary}`}>{profile.title}</p>
              <div className={`flex items-center gap-4 text-xs pt-1 ${theme.textMuted}`}>
                {profile.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 opacity-70" />
                    {profile.location}
                  </span>
                )}
                {profile.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 opacity-70" />
                    {profile.email}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bio Text */}
        {profile.bio && (
          <div className={`px-6 pb-6 pt-2 border-t text-sm sm:text-base leading-relaxed ${theme.border} ${theme.textSecondary}`}>
            <p>{profile.bio}</p>
          </div>
        )}

        {/* Social Accounts Bar */}
        {socials && socials.length > 0 && (
          <div className={`px-6 py-4 border-t flex items-center gap-3 flex-wrap ${theme.border} ${theme.subCardBg}`}>
            <span className={`text-xs font-semibold uppercase tracking-wider mr-2 ${theme.textMuted}`}>社交平台:</span>
            {socials.map((s, idx) => (
              <a
                key={idx}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${theme.borderSubtle} ${theme.cardHoverBg} ${theme.textSecondary} ${s.color || ''}`}
              >
                <IconHelper name={s.icon} className="w-3.5 h-3.5" />
                <span>{s.name}</span>
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Multi-Link Aggregation (多链接聚合 Linkhub) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
            <h3 className={`text-xl font-bold ${theme.textPrimary}`}>聚合链接</h3>
          </div>
          {/* <span className={`text-xs ${theme.textMuted}`}>点击直达第三方平台与专栏服务</span> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target={link.url.startsWith('#') ? '_self' : '_blank'}
              rel="noreferrer"
              className={`group p-4 rounded-xl border transition-all flex items-start gap-4 shadow-md ${link.highlight
                  ? theme.highlightCard
                  : `${theme.cardBg} ${theme.cardHoverBg}`
                }`}
            >
              <div className={`p-3 rounded-xl border ${link.highlight ? 'bg-indigo-600/20 border-indigo-500/30 text-indigo-400' : `${theme.subCardBg} ${theme.textSecondary}`
                }`}>
                <IconHelper name={link.icon} className="w-6 h-6" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className={`font-bold transition-colors truncate ${theme.textPrimary} group-hover:text-indigo-500`}>
                    {link.title}
                  </h4>
                  {link.badge && (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${link.badgeColor || theme.badgeBg
                      }`}>
                      {link.badge}
                    </span>
                  )}
                </div>
                <p className={`text-xs mt-1 line-clamp-2 ${theme.textMuted}`}>{link.description}</p>
              </div>

              <ChevronRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all self-center" />
            </a>
          ))}
        </div>
      </div>

      {/* Pinned & Recent Posts Preview */}
      <div className={`space-y-4 pt-4 border-t ${theme.border}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-500" />
            <h3 className={`text-xl font-bold ${theme.textPrimary}`}>最新博客 & 思考记录</h3>
          </div>
          <button
            onClick={onGoBlog}
            className="text-xs font-semibold text-indigo-500 hover:underline flex items-center gap-1"
          >
            <span>查看全部文章 ({posts.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(pinnedPosts.length > 0 ? pinnedPosts : recentPosts).map((post) => (
            <div
              key={post.id}
              onClick={() => onSelectPost(post.id)}
              className={`${theme.cardBg} ${theme.cardHoverBg} rounded-xl p-5 cursor-pointer transition-all flex flex-col justify-between space-y-3 group`}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {post.is_pinned === 1 && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-500 font-semibold border border-amber-500/30">
                      置顶
                    </span>
                  )}
                  <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${theme.badgeBg}`}>
                    {post.category || '未分类'}
                  </span>
                  <span className={`text-xs ml-auto ${theme.textSubtle}`}>{formatDate(post.created_at)}</span>
                </div>

                <h4 className={`font-bold transition-colors line-clamp-2 ${theme.textPrimary} group-hover:text-indigo-500`}>
                  {post.title}
                </h4>
                <p className={`text-xs line-clamp-2 leading-relaxed ${theme.textMuted}`}>{post.summary}</p>
              </div>

              <div className={`flex items-center justify-between text-xs pt-2 border-t ${theme.borderSubtle} ${theme.textMuted}`}>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 opacity-70" />
                  {post.views} 次阅读
                </span>
                <span className="text-indigo-500 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                  阅读全文 <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 2. BLOG LIST VIEW
// -------------------------------------------------------------
function BlogListView({
  posts,
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedTag,
  setSelectedTag,
  searchQuery,
  setSearchQuery,
  onSelectPost,
  theme
}) {
  return (
    <div className="space-y-6">
      {/* Top Search & Filter Bar */}
      <div className={`flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between p-4 rounded-xl ${theme.cardBg}`}>
        <div className="relative flex-1">
          <Search className={`w-4 h-4 absolute left-3.5 top-3 ${theme.textMuted}`} />
          <input
            type="text"
            placeholder="搜索文章标题、简介或关键词..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none ${theme.inputBg}`}
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${selectedCategory === "all" ? theme.accentBg : theme.badgeBg
              }`}
          >
            全部
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${selectedCategory === cat ? theme.accentBg : theme.badgeBg
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Active Tag Filter Indicator */}
      {selectedTag && (
        <div className="flex items-center gap-2 text-xs">
          <span className={theme.textMuted}>已选标签:</span>
          <span className="px-2.5 py-1 rounded-full bg-indigo-600 text-white font-medium flex items-center gap-1">
            #{selectedTag}
            <button onClick={() => setSelectedTag("")} className="hover:text-slate-200">×</button>
          </span>
        </div>
      )}

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className={`py-16 text-center text-xs space-y-2 rounded-2xl ${theme.cardBg} ${theme.textMuted}`}>
          <BookOpen className="w-8 h-8 mx-auto opacity-40" />
          <p>未找到符合要求的博客文章</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectPost(post.id)}
              className={`${theme.cardBg} ${theme.cardHoverBg} rounded-2xl p-6 cursor-pointer transition-all flex flex-col justify-between space-y-4 group`}
            >
              <div className="space-y-3">
                {post.cover_image && (
                  <div className="w-full h-40 rounded-xl overflow-hidden bg-slate-800">
                    <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}

                <div className="flex items-center gap-2 flex-wrap">
                  {post.is_pinned === 1 && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-500 font-semibold border border-amber-500/30">
                      置顶
                    </span>
                  )}
                  <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${theme.badgeBg}`}>
                    {post.category || '未分类'}
                  </span>
                  <span className={`text-xs ml-auto ${theme.textSubtle}`}>{formatDate(post.created_at)}</span>
                </div>

                <h3 className={`text-lg font-bold transition-colors line-clamp-2 ${theme.textPrimary} group-hover:text-indigo-500`}>
                  {post.title}
                </h3>

                <p className={`text-xs line-clamp-3 leading-relaxed ${theme.textMuted}`}>
                  {post.summary}
                </p>
              </div>

              {/* Tags & Footer */}
              <div className="space-y-3 pt-2">
                {post.tags && post.tags.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
                    {post.tags.map((t) => (
                      <span
                        key={t}
                        onClick={(e) => { e.stopPropagation(); setSelectedTag(t); }}
                        className={`px-2 py-0.5 rounded transition-colors ${theme.badgeBg} hover:border-indigo-400`}
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                <div className={`flex items-center justify-between text-xs pt-3 border-t ${theme.borderSubtle} ${theme.textMuted}`}>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 opacity-70" />
                    {post.views} 次阅读
                  </span>
                  <span className="text-indigo-500 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    查看详情 <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 3. POST DETAIL VIEW (Markdown Article + Comments)
// -------------------------------------------------------------
function PostDetailView({ postId, onBack, onPostUpdated, isAdmin, showToast, requestConfirm, theme }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Comment Form State
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [authorSite, setAuthorSite] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    fetchPostAndComments();

    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [postId]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchPostAndComments = async () => {
    setLoading(true);
    try {
      const [postRes, commentRes] = await Promise.all([
        fetch(`./api/posts/${postId}?inc_view=1`).then((r) => r.json()),
        fetch(`./api/posts/${postId}/comments`).then((r) => r.json())
      ]);

      if (postRes.ok) {
        setPost(postRes.post);
        if (onPostUpdated) {
          onPostUpdated(postRes.post);
        }
      }
      if (commentRes.ok) setComments(commentRes.comments || []);
    } catch (e) {
      console.error("Error fetching post detail", e);
    } finally {
      setLoading(false);
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!authorName.trim() || !commentContent.trim()) {
      showToast("请填写昵称与评论内容", "error");
      return;
    }

    setSubmittingComment(true);
    try {
      const adminToken = localStorage.getItem("admin_token") || "";
      const res = await fetch(`./api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({
          author_name: authorName,
          author_email: authorEmail,
          author_site: authorSite,
          content: commentContent
        })
      }).then((r) => r.json());

      if (res.ok) {
        showToast("评论已成功发布");
        setCommentContent("");
        // Reload comments
        const cRes = await fetch(`./api/posts/${postId}/comments`).then((r) => r.json());
        if (cRes.ok) setComments(cRes.comments || []);
      } else {
        showToast(res.error || "发布失败", "error");
      }
    } catch (e) {
      showToast("网络请求超时", "error");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    requestConfirm("确定删除这条评论吗？删除后将无法恢复。", async () => {
      const adminToken = localStorage.getItem("admin_token") || "";
      try {
        const res = await fetch(`./api/comments/${commentId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${adminToken}` }
        }).then((r) => r.json());

        if (res.ok) {
          showToast("评论已删除");
          setComments((currentComments) => currentComments.filter((c) => c.id !== commentId));
        }
      } catch (e) { }
    });
  };

  if (loading || !post) {
    return (
      <div className={`py-20 text-center flex flex-col items-center gap-3 ${theme.textMuted}`}>
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <span>正在载入文章内容与评论...</span>
      </div>
    );
  }

  // Marked parser HTML
  const renderedContent = renderMarkdown(post.content || "");

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Top Action / Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${theme.subCardBg} ${theme.textSecondary}`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回</span>
        </button>

        <div className={`flex items-center gap-3 text-xs ${theme.textMuted}`}>
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4 text-indigo-500" />
            <span>阅读量: <strong className="font-mono">{post.views}</strong></span>
          </span>
        </div>
      </div>

      {/* Post Header Article Card */}
      <article className={`rounded-2xl p-6 sm:p-8 space-y-6 ${theme.cardBg}`}>
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className={`px-2.5 py-1 rounded font-medium ${theme.badgeBg}`}>
              {post.category || '未分类'}
            </span>
            <span className={theme.textMuted}>{formatDate(post.created_at)}</span>
            <span className={theme.textMuted}>· 预计阅读 {getReadingTime(post.content)} 分钟</span>
          </div>

          <h1 className={`text-2xl sm:text-4xl font-extrabold leading-tight ${theme.textPrimary}`}>
            {post.title}
          </h1>

          {post.summary && (
            <p className={`text-sm sm:text-base p-4 rounded-xl border-l-4 border-indigo-500 italic leading-relaxed ${theme.subCardBg}`}>
              {post.summary}
            </p>
          )}
        </div>

        {post.cover_image && (
          <div className="w-full max-h-96 rounded-xl overflow-hidden bg-slate-800 border border-slate-700/50">
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Rendered Markdown Content */}
        <div
          className={`markdown-body border-t pt-6 ${theme.border} ${theme.markdownClass}`}
          dangerouslySetInnerHTML={{ __html: renderedContent }}
        ></div>

        {/* Tags footer */}
        {post.tags && post.tags.length > 0 && (
          <div className={`pt-4 border-t flex items-center gap-2 flex-wrap text-xs ${theme.border}`}>
            <Tag className="w-4 h-4 opacity-50" />
            <span className={`font-medium ${theme.textMuted}`}>标签:</span>
            {post.tags.map((t) => (
              <span key={t} className={`px-2.5 py-1 rounded-full ${theme.badgeBg}`}>
                #{t}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* Comments Section */}
      <div className={`rounded-2xl p-6 sm:p-8 space-y-6 ${theme.cardBg}`}>
        <div className={`flex items-center justify-between border-b pb-4 ${theme.border}`}>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-500" />
            <h3 className={`text-xl font-bold ${theme.textPrimary}`}>读者评论 ({comments.length})</h3>
          </div>
        </div>

        {/* Comment Form */}
        <form onSubmit={handlePostComment} className={`space-y-4 p-4 sm:p-5 rounded-xl border ${theme.subCardBg} ${theme.border}`}>
          <h4 className={`text-sm font-bold ${theme.textPrimary}`}>发表评论</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="你的昵称 *"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
              className={`rounded-lg px-3 py-2 text-xs focus:outline-none ${theme.inputBg}`}
            />
            <input
              type="email"
              placeholder="邮箱 (选填，仅保密)"
              value={authorEmail}
              onChange={(e) => setAuthorEmail(e.target.value)}
              className={`rounded-lg px-3 py-2 text-xs focus:outline-none ${theme.inputBg}`}
            />
            <input
              type="url"
              placeholder="个人主页/网址 (选填)"
              value={authorSite}
              onChange={(e) => setAuthorSite(e.target.value)}
              className={`rounded-lg px-3 py-2 text-xs focus:outline-none ${theme.inputBg}`}
            />
          </div>

          <textarea
            rows="3"
            placeholder="撰写你的想法或观点..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            required
            className={`w-full rounded-lg p-3 text-xs focus:outline-none ${theme.inputBg}`}
          ></textarea>

          <div className="flex items-center justify-between pt-1">
            <span className={`text-[10px] ${theme.textSubtle}`}>提示：文明发言，支持基本文本格式</span>
            <button
              type="submit"
              disabled={submittingComment}
              className={`px-4 py-2 rounded-lg font-medium text-xs flex items-center gap-1.5 transition-colors ${theme.accentBg}`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submittingComment ? "发布中..." : "提交评论"}</span>
            </button>
          </div>
        </form>

        {/* Comment List */}
        {comments.length === 0 ? (
          <p className={`text-center py-8 text-xs ${theme.textMuted}`}>暂无评论，快来抢沙发吧！</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comm) => (
              <div key={comm.id} className={`p-4 rounded-xl border flex items-start gap-3 ${theme.subCardBg} ${theme.borderSubtle}`}>
                <img
                  src={comm.author_avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${comm.author_name}`}
                  alt={comm.author_name}
                  className="w-9 h-9 rounded-full object-cover bg-slate-800 shrink-0 mt-0.5"
                />
                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-xs ${theme.textPrimary}`}>{comm.author_name}</span>
                      {comm.is_admin === 1 && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-400 font-semibold border border-indigo-500/30">
                          作者/管理员
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] ${theme.textSubtle}`}>{formatRelativeTime(comm.created_at)}</span>
                  </div>

                  <p className={`text-xs leading-relaxed whitespace-pre-wrap ${theme.textSecondary}`}>{comm.content}</p>
                </div>

                {isAdmin && (
                  <button
                    onClick={() => handleDeleteComment(comm.id)}
                    className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                    title="删除评论"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Back To Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-50 p-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center border group ${theme.accentBg}`}
          title="回到顶部"
          aria-label="回到顶部"
        >
          <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
        </button>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 4. TIMELINE VIEW
// -------------------------------------------------------------
function TimelineView({ timeline, onSelectPost, theme }) {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className={`text-2xl font-bold flex items-center justify-center gap-2 ${theme.textPrimary}`}>
          <Clock className="w-6 h-6 text-indigo-500" />
          <span>时间轴 Timeline</span>
        </h2>
        <p className={`text-xs ${theme.textMuted}`}>按年月记录的创作历程与技术思考</p>
      </div>

      {timeline.length === 0 ? (
        <div className={`text-center py-12 text-xs ${theme.textMuted}`}>暂无公开文章</div>
      ) : (
        <div className={`relative border-l-2 border-indigo-500/30 ml-4 sm:ml-8 pl-6 space-y-10`}>
          {timeline.map((group) => (
            <div key={group.period} className="space-y-4 relative">
              {/* Dot marker */}
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-slate-900 border-2 border-indigo-400"></div>

              <h3 className="text-lg font-bold text-indigo-500 font-mono">{group.period}</h3>

              <div className="space-y-3">
                {group.posts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => onSelectPost(post.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-4 group ${theme.cardBg} ${theme.cardHoverBg}`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className={`px-2 py-0.5 rounded ${theme.badgeBg}`}>
                          {post.category}
                        </span>
                        <span className={theme.textSubtle}>{formatDate(post.created_at)}</span>
                      </div>
                      <h4 className={`font-bold text-sm transition-colors truncate ${theme.textPrimary} group-hover:text-indigo-500`}>
                        {post.title}
                      </h4>
                    </div>

                    <div className={`flex items-center gap-1 text-xs shrink-0 ${theme.textMuted}`}>
                      <Eye className="w-3.5 h-3.5" />
                      <span className="font-mono">{post.views}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 5. ADMIN VIEW (Management Backend)
// -------------------------------------------------------------
function AdminView({
  isAdmin,
  authToken,
  loginPassword,
  setLoginPassword,
  authError,
  handleLogin,
  handleLogout,
  adminTab,
  setAdminTab,
  config,
  setConfig,
  posts,
  fetchPosts,
  stats,
  showToast,
  requestConfirm,
  theme,
  themeStyle,
  onSwitchTheme
}) {
  const [editingPost, setEditingPost] = useState(null); // Null or Post object to edit/create
  const [deletingPostId, setDeletingPostId] = useState(null);

  // Profile config form
  const [profileForm, setProfileForm] = useState(config?.profile || {});
  const [linksForm, setLinksForm] = useState(config?.links || []);
  const [socialsForm, setSocialsForm] = useState(config?.socials || []);

  // Password change form
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");

  useEffect(() => {
    if (config) {
      setProfileForm(config.profile || {});
      setLinksForm(config.links || []);
      setSocialsForm(config.socials || []);
    }
  }, [config]);

  // If not authenticated, show Login form
  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto py-12">
        <div className={`rounded-2xl p-8 space-y-6 shadow-2xl ${theme.cardBg}`}>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-indigo-600/20 text-indigo-500 rounded-2xl flex items-center justify-center mx-auto border border-indigo-500/30">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className={`text-2xl font-bold ${theme.textPrimary}`}>管理后台登录</h2>
            <p className={`text-xs ${theme.textMuted}`}>默认密码：<code className="text-indigo-400 bg-black/20 px-1.5 py-0.5 rounded font-mono">admin123</code></p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className={`text-xs font-semibold ${theme.textSecondary}`}>管理员密码</label>
              <input
                type="password"
                placeholder="请输入管理密码..."
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className={`w-full rounded-lg px-4 py-2.5 text-sm focus:outline-none ${theme.inputBg}`}
              />
            </div>

            {authError && <p className="text-xs text-red-400 bg-red-950/50 p-2 rounded border border-red-800">{authError}</p>}

            <button
              type="submit"
              className={`w-full py-2.5 rounded-lg font-bold text-sm shadow-lg transition-colors ${theme.accentBg}`}
            >
              进入管理控制台
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Save profile & links config
  const handleSaveConfig = async (e) => {
    e.preventDefault();
    try {
      const newConfig = {
        profile: profileForm,
        links: linksForm,
        socials: socialsForm
      };

      const res = await fetch("./api/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(newConfig)
      }).then((r) => r.json());

      if (res.ok) {
        setConfig(newConfig);
        showToast("主页与外观主题配置已更新并保存至数据库");
      } else {
        showToast(res.error || "保存失败", "error");
      }
    } catch (err) {
      showToast("保存配置异常", "error");
    }
  };

  // Handle Save Post (Create/Update)
  const handleSavePost = async (postData) => {
    try {
      const isEdit = !!postData.id;
      const url = isEdit ? `./api/posts/${postData.id}` : "./api/posts";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(postData)
      }).then((r) => r.json());

      if (res.ok) {
        showToast(isEdit ? "文章已更新" : "新文章已发布");
        setEditingPost(null);
        fetchPosts();
      } else {
        showToast(res.error || "保存文章失败", "error");
      }
    } catch (e) {
      showToast("网络请求错误", "error");
    }
  };

  const handleEditPost = async (post) => {
    try {
      const res = await fetch(`./api/posts/${post.id}`).then((r) => r.json());
      if (res.ok && res.post) {
        setEditingPost(res.post);
      } else {
        showToast(res.error || "读取文章内容失败", "error");
      }
    } catch (e) {
      showToast("读取文章内容失败", "error");
    }
  };

  // Handle Delete Post
  const handleDeletePost = async (id) => {
    requestConfirm("确定彻底删除该文章及其相关评论吗？删除后将无法恢复。", async () => {
      setDeletingPostId(id);
      try {
        const res = await fetch(`./api/posts/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${authToken}` }
        }).then((r) => r.json());

        if (res.ok) {
          showToast("文章已删除");
          fetchPosts();
        }
      } catch (e) {
        showToast("删除文章失败", "error");
      } finally {
        setDeletingPostId(null);
      }
    });
  };

  // Handle Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("./api/auth/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ oldPassword: oldPwd, newPassword: newPwd })
      }).then((r) => r.json());

      if (res.ok) {
        showToast("密码修改成功，请谨记新密码");
        setOldPwd("");
        setNewPwd("");
      } else {
        showToast(res.error || "密码修改失败", "error");
      }
    } catch (e) { }
  };

  // Handle Reset Seed
  const handleResetSeed = async () => {
    if (!confirm("确定要重置数据库示例数据吗？（当前自定义数据将被还原为演示默认值）")) return;
    try {
      const res = await fetch("./api/seed", {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` }
      }).then((r) => r.json());

      if (res.ok) {
        showToast("示例数据已重置");
        window.location.reload();
      }
    } catch (e) { }
  };

  return (
    <div className="space-y-6">
      {/* Admin Top Header */}
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 rounded-2xl ${theme.cardBg}`}>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className={`text-xl font-bold flex items-center gap-2 ${theme.textPrimary}`}>
              控制台管理后台
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-normal border border-emerald-800">
                已验证
              </span>
            </h2>
            <p className={`text-xs ${theme.textMuted}`}>管理个人主页配置、全站视觉主题、聚合链接与 Markdown 博客</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${theme.subCardBg}`}
        >
          <LogOut className="w-4 h-4" />
          <span>退出登录</span>
        </button>
      </div>

      {/* Admin Tabs */}
      <div className={`flex items-center gap-2 border-b overflow-x-auto pb-2 text-sm font-medium ${theme.border}`}>
        {[
          { id: "posts", name: "文章管理", icon: FileText },
          { id: "links", name: "多链接聚合", icon: Link2 },
          { id: "profile", name: "主题与主页配置", icon: Palette },
          { id: "stats", name: "访问分析 & 数据", icon: BarChart2 },
          { id: "password", name: "修改密码", icon: Lock }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => { setAdminTab(tab.id); setEditingPost(null); }}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap transition-colors ${adminTab === tab.id ? theme.accentBg : theme.navInactive
                }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: 1. POSTS MANAGEMENT */}
      {adminTab === "posts" && (
        <div className="space-y-6">
          {editingPost ? (
            <PostEditor
              editingPost={editingPost}
              onCancel={() => setEditingPost(null)}
              onSave={handleSavePost}
              theme={theme}
            />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-bold ${theme.textPrimary}`}>所有文章列表 ({posts.length})</h3>
                <button
                  onClick={() => setEditingPost({
                    title: "",
                    content: "",
                    category: "技术学习",
                    tags: [],
                    status: "published",
                    cover_image: getRandomCoverImage()
                  })}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs transition-colors ${theme.accentBg}`}
                >
                  <Plus className="w-4 h-4" />
                  <span>新建文章</span>
                </button>
              </div>

              <div className={`rounded-xl overflow-hidden border ${theme.cardBg} ${theme.border}`}>
                <div className="overflow-x-auto">
                  <table className="min-w-[760px] w-full text-left text-xs">
                    <thead className={`border-b uppercase font-semibold ${theme.border} ${theme.subCardBg} ${theme.textMuted}`}>
                      <tr>
                        <th className="w-[280px] px-4 py-3">标题</th>
                        <th className="w-[120px] px-4 py-3">分类</th>
                        <th className="w-[100px] px-4 py-3">状态</th>
                        <th className="w-[90px] px-4 py-3">阅读数</th>
                        <th className="w-[130px] px-4 py-3">发布时间</th>
                        <th className="w-[160px] px-4 py-3">操作</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${theme.borderSubtle}`}>
                      {posts.map((p) => (
                        <tr key={p.id} className={`${theme.cardHoverBg} transition-colors`}>
                          <td className={`w-[280px] max-w-[280px] truncate px-4 py-3 font-medium ${theme.textPrimary}`}>
                            {p.is_pinned === 1 && <span className="text-[10px] text-amber-500 mr-1.5">[置顶]</span>}
                            {p.title}
                          </td>
                          <td className={`w-[120px] whitespace-nowrap px-4 py-3 ${theme.textSecondary}`}>{p.category}</td>
                          <td className="w-[100px] whitespace-nowrap px-4 py-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] ${p.status === 'published' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                              }`}>
                              {p.status === 'published' ? '已发布' : '草稿'}
                            </span>
                          </td>
                          <td className={`w-[90px] whitespace-nowrap px-4 py-3 font-mono ${theme.textSecondary}`}>{p.views}</td>
                          <td className={`w-[130px] whitespace-nowrap px-4 py-3 ${theme.textMuted}`}>{formatDate(p.created_at)}</td>
                          <td className="w-[160px] whitespace-nowrap px-4 py-3">
                            <button
                              onClick={() => handleEditPost(p)}
                              className={`px-2.5 py-1 mr-1 rounded ${theme.subCardBg}`}
                            >
                              编辑
                            </button>
                            <button
                              onClick={() => handleDeletePost(p.id)}
                              disabled={deletingPostId === p.id}
                              className="px-2.5 py-1 rounded bg-red-950/60 hover:bg-red-900 text-red-300 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {deletingPostId === p.id ? (
                                <span className="inline-flex items-center gap-1">
                                  <RefreshCw className="w-3 h-3 animate-spin" />
                                  删除中
                                </span>
                              ) : "删除"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: 2. LINKS MANAGEMENT (Linkhub) */}
      {adminTab === "links" && (
        <form onSubmit={handleSaveConfig} className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-lg font-bold ${theme.textPrimary}`}>多链接聚合管理 (Linkhub)</h3>
              <p className={`text-xs ${theme.textMuted}`}>自由新建、编辑主页展示的第三方跳转与精选聚合项目</p>
            </div>
            <button
              type="button"
              onClick={() => setLinksForm([...linksForm, { id: `l_${Date.now()}`, title: "新聚合链接", description: "输入链接描述...", url: "https://", icon: "link", badge: "推荐", highlight: false }])}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 ${theme.accentBg}`}
            >
              <Plus className="w-4 h-4" />
              <span>添加链接项</span>
            </button>
          </div>

          <div className="space-y-4">
            {linksForm.map((item, idx) => (
              <div key={item.id || idx} className={`p-4 rounded-xl border space-y-3 ${theme.cardBg}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-500">链接项目 #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => setLinksForm(linksForm.filter((_, i) => i !== idx))}
                    className="text-xs text-red-400 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>删除</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={`text-[10px] ${theme.textMuted}`}>标题</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...linksForm];
                        updated[idx].title = e.target.value;
                        setLinksForm(updated);
                      }}
                      className={`w-full rounded px-3 py-1.5 text-xs ${theme.inputBg}`}
                    />
                  </div>

                  <div>
                    <label className={`text-[10px] ${theme.textMuted}`}>跳转 URL</label>
                    <input
                      type="text"
                      value={item.url}
                      onChange={(e) => {
                        const updated = [...linksForm];
                        updated[idx].url = e.target.value;
                        setLinksForm(updated);
                      }}
                      className={`w-full rounded px-3 py-1.5 text-xs ${theme.inputBg}`}
                    />
                  </div>

                  <div>
                    <label className={`text-[10px] ${theme.textMuted}`}>描述信息</label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => {
                        const updated = [...linksForm];
                        updated[idx].description = e.target.value;
                        setLinksForm(updated);
                      }}
                      className={`w-full rounded px-3 py-1.5 text-xs ${theme.inputBg}`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className={`text-[10px] ${theme.textMuted}`}>图标标识</label>
                      <IconSelect
                        value={item.icon || "link"}
                        onChange={(icon) => {
                          const updated = [...linksForm];
                          updated[idx].icon = icon;
                          setLinksForm(updated);
                        }}
                        theme={theme}
                      />
                    </div>
                    <div>
                      <label className={`text-[10px] ${theme.textMuted}`}>Badge 标签文本</label>
                      <input
                        type="text"
                        value={item.badge || ''}
                        onChange={(e) => {
                          const updated = [...linksForm];
                          updated[idx].badge = e.target.value;
                          setLinksForm(updated);
                        }}
                        className={`w-full rounded px-3 py-1.5 text-xs ${theme.inputBg}`}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id={`hl_${idx}`}
                    checked={!!item.highlight}
                    onChange={(e) => {
                      const updated = [...linksForm];
                      updated[idx].highlight = e.target.checked;
                      setLinksForm(updated);
                    }}
                    className="rounded"
                  />
                  <label htmlFor={`hl_${idx}`} className={`text-xs cursor-pointer ${theme.textSecondary}`}>
                    高亮发光显示 (Highlight Card)
                  </label>
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className={`px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-colors ${theme.accentBg}`}
          >
            保存聚合链接更改
          </button>
        </form>
      )}

      {/* TAB CONTENT: 3. PROFILE CONFIG & THEME PRESETS */}
      {adminTab === "profile" && (
        <form onSubmit={handleSaveConfig} className="space-y-6">
          <h3 className={`text-lg font-bold ${theme.textPrimary}`}>外观主题与主页基本配置</h3>

          {/* Theme Selection Cards Block */}
          <div className={`p-6 rounded-2xl border space-y-4 ${theme.cardBg}`}>
            <div className="flex items-center justify-between">
              <label className={`text-xs font-bold flex items-center gap-1.5 ${theme.textPrimary}`}>
                <Palette className="w-4 h-4 text-indigo-500" />
                <span>选择网站全局默认外观风格</span>
              </label>
              <span className={`text-[10px] ${theme.textMuted}`}>保存配置后，全站所有访问者默认展示该主题风格</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.values(THEME_PRESETS).map((t) => {
                const isSelected = (profileForm.themeStyle || "dark") === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => {
                      setProfileForm({ ...profileForm, themeStyle: t.id });
                      onSwitchTheme(t.id);
                    }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all space-y-2.5 relative ${isSelected
                        ? "border-indigo-500 bg-indigo-950/30 ring-2 ring-indigo-500/30 shadow-lg"
                        : `${theme.subCardBg} hover:border-slate-400`
                      }`}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3 text-indigo-400">
                        <Check className="w-5 h-5" />
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${theme.textPrimary}`}>{t.badge}</span>
                    </div>
                    <p className={`text-xs leading-relaxed ${theme.textMuted}`}>{t.description}</p>
                    <div className="pt-2 flex items-center gap-1.5 text-[10px] font-mono">
                      <span className={`px-2 py-0.5 rounded ${theme.badgeBg}`}>
                        {t.name}
                      </span>
                      {isSelected && <span className="text-indigo-400 font-bold">✓ 当前应用</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`p-6 rounded-2xl border space-y-4 ${theme.cardBg}`}>
            <h4 className={`text-sm font-bold ${theme.textPrimary}`}>个人基本信息配置</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`text-xs ${theme.textMuted}`}>姓名 / 昵称</label>
                <input
                  type="text"
                  value={profileForm.name || ""}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className={`w-full rounded-lg p-2.5 text-xs mt-1 ${theme.inputBg}`}
                />
              </div>

              <div>
                <label className={`text-xs ${theme.textMuted}`}>一句话头衔 / 定位</label>
                <input
                  type="text"
                  value={profileForm.title || ""}
                  onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                  className={`w-full rounded-lg p-2.5 text-xs mt-1 ${theme.inputBg}`}
                />
              </div>

              <div>
                <label className={`text-xs ${theme.textMuted}`}>头像图片 URL</label>
                <input
                  type="text"
                  value={profileForm.avatar || ""}
                  onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                  className={`w-full rounded-lg p-2.5 text-xs mt-1 ${theme.inputBg}`}
                />
              </div>

              <div>
                <label className={`text-xs ${theme.textMuted}`}>横幅背景图 URL</label>
                <input
                  type="text"
                  value={profileForm.cover || ""}
                  onChange={(e) => setProfileForm({ ...profileForm, cover: e.target.value })}
                  className={`w-full rounded-lg p-2.5 text-xs mt-1 ${theme.inputBg}`}
                />
              </div>

              <div>
                <label className={`text-xs ${theme.textMuted}`}>状态 Badge (如: 🚀 正在创业中)</label>
                <input
                  type="text"
                  value={profileForm.badge || ""}
                  onChange={(e) => setProfileForm({ ...profileForm, badge: e.target.value })}
                  className={`w-full rounded-lg p-2.5 text-xs mt-1 ${theme.inputBg}`}
                />
              </div>

              <div>
                <label className={`text-xs ${theme.textMuted}`}>所在地</label>
                <input
                  type="text"
                  value={profileForm.location || ""}
                  onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                  className={`w-full rounded-lg p-2.5 text-xs mt-1 ${theme.inputBg}`}
                />
              </div>

              <div>
                <label className={`text-xs ${theme.textMuted}`}>联系邮箱</label>
                <input
                  type="email"
                  value={profileForm.email || ""}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  placeholder="name@example.com"
                  className={`w-full rounded-lg p-2.5 text-xs mt-1 ${theme.inputBg}`}
                />
              </div>
            </div>

            <div>
              <label className={`text-xs ${theme.textMuted}`}>个人简介 (Bio Markdown)</label>
              <textarea
                rows="3"
                value={profileForm.bio || ""}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                className={`w-full rounded-lg p-3 text-xs mt-1 ${theme.inputBg}`}
              ></textarea>
            </div>
          </div>

          <div className={`p-6 rounded-2xl border space-y-4 ${theme.cardBg}`}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h4 className={`text-sm font-bold ${theme.textPrimary}`}>社交平台配置</h4>
                <p className={`text-xs mt-1 ${theme.textMuted}`}>配置主页中展示的社交账号和联系方式</p>
              </div>
              <button
                type="button"
                onClick={() => setSocialsForm([
                  ...socialsForm,
                  { name: "新平台", url: "https://", icon: "link", color: "" }
                ])}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 ${theme.accentBg}`}
              >
                <Plus className="w-3.5 h-3.5" />
                添加平台
              </button>
            </div>

            <div className="space-y-3">
              {socialsForm.map((social, idx) => (
                <div key={`${social.name}-${idx}`} className={`p-4 rounded-xl border space-y-3 ${theme.subCardBg}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${theme.textSecondary}`}>平台 #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setSocialsForm(socialsForm.filter((_, i) => i !== idx))}
                      className="text-xs text-red-400 hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      删除
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className={`text-[10px] ${theme.textMuted}`}>平台名称</label>
                      <input
                        type="text"
                        value={social.name || ""}
                        onChange={(e) => {
                          const updated = [...socialsForm];
                          updated[idx] = { ...updated[idx], name: e.target.value };
                          setSocialsForm(updated);
                        }}
                        className={`w-full rounded-lg px-3 py-2 text-xs mt-1 ${theme.inputBg}`}
                      />
                    </div>

                    <div>
                      <label className={`text-[10px] ${theme.textMuted}`}>跳转 URL</label>
                      <input
                        type="text"
                        value={social.url || ""}
                        onChange={(e) => {
                          const updated = [...socialsForm];
                          updated[idx] = { ...updated[idx], url: e.target.value };
                          setSocialsForm(updated);
                        }}
                        className={`w-full rounded-lg px-3 py-2 text-xs mt-1 ${theme.inputBg}`}
                      />
                    </div>

                    <div>
                      <label className={`text-[10px] ${theme.textMuted}`}>图标标识</label>
                      <IconSelect
                        value={social.icon || "link"}
                        options={SOCIAL_ICON_OPTIONS}
                        onChange={(icon) => {
                          const updated = [...socialsForm];
                          updated[idx] = { ...updated[idx], icon };
                          setSocialsForm(updated);
                        }}
                        theme={theme}
                      />
                    </div>

                    <div>
                      <label className={`text-[10px] ${theme.textMuted}`}>悬停颜色 class（可选）</label>
                      <input
                        type="text"
                        value={social.color || ""}
                        placeholder="hover:text-sky-500"
                        onChange={(e) => {
                          const updated = [...socialsForm];
                          updated[idx] = { ...updated[idx], color: e.target.value };
                          setSocialsForm(updated);
                        }}
                        className={`w-full rounded-lg px-3 py-2 text-xs mt-1 ${theme.inputBg}`}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {socialsForm.length === 0 && (
                <p className={`py-4 text-center text-xs ${theme.textMuted}`}>暂未配置社交平台，请点击“添加平台”。</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-colors ${theme.accentBg}`}
          >
            保存主题与主页配置
          </button>
        </form>
      )}

      {/* TAB CONTENT: 4. STATS & ANALYTICS */}
      {adminTab === "stats" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={`p-5 rounded-2xl border space-y-1 ${theme.cardBg}`}>
              <span className={`text-xs ${theme.textMuted}`}>全站累计访问量</span>
              <p className="text-3xl font-extrabold text-indigo-500 font-mono">{stats?.totalVisits || 0}</p>
            </div>

            <div className={`p-5 rounded-2xl border space-y-1 ${theme.cardBg}`}>
              <span className={`text-xs ${theme.textMuted}`}>公开博客文章数</span>
              <p className="text-3xl font-extrabold text-emerald-500 font-mono">{stats?.totalPosts || 0}</p>
            </div>

            <div className={`p-5 rounded-2xl border space-y-1 ${theme.cardBg}`}>
              <span className={`text-xs ${theme.textMuted}`}>读者互动评论数</span>
              <p className="text-3xl font-extrabold text-sky-500 font-mono">{stats?.totalComments || 0}</p>
            </div>
          </div>

          {/* Top Posts */}
          <div className={`rounded-2xl p-6 border space-y-4 ${theme.cardBg}`}>
            <h4 className={`font-bold text-sm ${theme.textPrimary}`}>热门阅读排行榜 Top 5</h4>
            <div className="space-y-2">
              {stats?.topPosts?.map((post, idx) => (
                <div key={post.id} className={`flex items-center justify-between p-3 rounded-xl text-xs ${theme.subCardBg}`}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-indigo-500">#{idx + 1}</span>
                    <span className={`font-medium ${theme.textPrimary}`}>{post.title}</span>
                  </div>
                  <span className={`font-mono ${theme.textMuted}`}>{post.views} 次阅读</span>
                </div>
              ))}
            </div>
          </div>

          {/* <div className={`pt-4 border-t flex justify-end ${theme.border}`}>
            <button
              type="button"
              onClick={handleResetSeed}
              className="px-4 py-2 rounded-lg bg-red-950/50 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-semibold"
            >
              一键重置示例演示数据
            </button>
          </div> */}
        </div>
      )}

      {/* TAB CONTENT: 5. PASSWORD */}
      {adminTab === "password" && (
        <form onSubmit={handleChangePassword} className={`max-w-md space-y-4 p-6 rounded-2xl border ${theme.cardBg}`}>
          <h3 className={`text-lg font-bold ${theme.textPrimary}`}>修改后台管理密码</h3>

          <div className="space-y-1.5">
            <label className={`text-xs ${theme.textMuted}`}>原密码</label>
            <input
              type="password"
              value={oldPwd}
              onChange={(e) => setOldPwd(e.target.value)}
              required
              className={`w-full rounded-lg p-2.5 text-xs ${theme.inputBg}`}
            />
          </div>

          <div className="space-y-1.5">
            <label className={`text-xs ${theme.textMuted}`}>新密码 (至少4位)</label>
            <input
              type="password"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              required
              className={`w-full rounded-lg p-2.5 text-xs ${theme.inputBg}`}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2.5 rounded-xl font-bold text-xs ${theme.accentBg}`}
          >
            确认更新密码
          </button>
        </form>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 6. MARKDOWN POST EDITOR (Side-by-side or Tabbed Preview)
// -------------------------------------------------------------
function PostEditor({ editingPost, onCancel, onSave, theme }) {
  const [title, setTitle] = useState(editingPost.title || "");
  const [summary, setSummary] = useState(editingPost.summary || "");
  const [category, setCategory] = useState(editingPost.category || "架构设计");
  const [coverImage, setCoverImage] = useState(editingPost.cover_image || "");
  const [tagsStr, setTagsStr] = useState((editingPost.tags || []).join(", "));
  const [status, setStatus] = useState(editingPost.status || "published");
  const [isPinned, setIsPinned] = useState(editingPost.is_pinned === 1);
  const [content, setContent] = useState(editingPost.content || "");
  const [previewMode, setPreviewMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;
    const tagsArray = tagsStr
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter(Boolean);

    setSaving(true);
    try {
      await onSave({
        id: editingPost.id,
        title,
        summary,
        category,
        cover_image: coverImage,
        tags: tagsArray,
        status,
        is_pinned: isPinned ? 1 : 0,
        content
      });
    } finally {
      setSaving(false);
    }
  };

  const renderedPreview = renderMarkdown(content || "");

  return (
    <form onSubmit={handleFormSubmit} className={`space-y-6 p-6 rounded-2xl border shadow-2xl ${theme.cardBg}`}>
      <div className={`flex items-center justify-between border-b pb-4 ${theme.border}`}>
        <h3 className={`text-lg font-bold ${theme.textPrimary}`}>
          {editingPost.id ? "编辑文章" : "发布新文章"}
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium ${theme.subCardBg}`}
          >
            取消
          </button>
          <button
            type="submit"
            disabled={saving}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold shadow-lg disabled:cursor-not-allowed disabled:opacity-70 ${theme.accentBg}`}
          >
            <span className="inline-flex items-center gap-1.5">
              {saving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
              {saving ? "保存中..." : editingPost.id ? "更新文章" : "立即发布"}
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2 space-y-1">
          <label className={`text-xs font-medium ${theme.textMuted}`}>文章标题 *</label>
          <input
            type="text"
            required
            placeholder="请输入标题..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full rounded-lg p-2.5 text-sm font-bold ${theme.inputBg}`}
          />
        </div>

        <div className="space-y-1">
          <label className={`text-xs font-medium ${theme.textMuted}`}>文章分类</label>
          <input
            type="text"
            placeholder="如: 架构设计 / 技术前沿"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full rounded-lg p-2 text-xs ${theme.inputBg}`}
          />
        </div>

        <div className="space-y-1">
          <label className={`text-xs font-medium ${theme.textMuted}`}>标签 (用逗号分隔)</label>
          <input
            type="text"
            placeholder="如: Cloudflare, Workers, D1"
            value={tagsStr}
            onChange={(e) => setTagsStr(e.target.value)}
            className={`w-full rounded-lg p-2 text-xs ${theme.inputBg}`}
          />
        </div>

        <div className="sm:col-span-2 space-y-1">
          <label className={`text-xs font-medium ${theme.textMuted}`}>封面图链接 URL (选填)</label>
          <input
            type="text"
            placeholder="https://..."
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className={`w-full rounded-lg p-2 text-xs ${theme.inputBg}`}
          />
        </div>

        <div className="sm:col-span-2 space-y-1">
          <label className={`text-xs font-medium ${theme.textMuted}`}>摘要简述 (选填)</label>
          <textarea
            rows="2"
            placeholder="留空则自动截取正文前150字..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className={`w-full rounded-lg p-2 text-xs ${theme.inputBg}`}
          ></textarea>
        </div>

        <div className="flex items-center gap-6 pt-2">
          <div className="flex items-center gap-2">
            <label className={`text-xs ${theme.textMuted}`}>状态:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`text-xs rounded px-2 py-1 ${theme.inputBg}`}
            >
              <option value="published">正式发布</option>
              <option value="draft">保存为草稿</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="pin_check"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="pin_check" className={`text-xs cursor-pointer ${theme.textSecondary}`}>
              首页置顶
            </label>
          </div>
        </div>
      </div>

      {/* Editor & Live Preview Mode Switch */}
      <div className="space-y-2 pt-2">
        <div className={`flex items-center justify-between border-b pb-2 ${theme.border}`}>
          <label className={`text-xs font-bold ${theme.textSecondary}`}>Markdown 正文内容</label>
          <div className={`flex items-center gap-1 p-1 rounded-lg border ${theme.subCardBg}`}>
            <button
              type="button"
              onClick={() => setPreviewMode(false)}
              className={`px-3 py-1 rounded text-xs font-medium ${!previewMode ? theme.accentBg : theme.textMuted}`}
            >
              编辑模式
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode(true)}
              className={`px-3 py-1 rounded text-xs font-medium ${previewMode ? theme.accentBg : theme.textMuted}`}
            >
              实时预览
            </button>
          </div>
        </div>

        {!previewMode ? (
          <textarea
            rows="16"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="在此输入 Markdown 格式的文章内容..."
            className={`w-full rounded-xl p-4 font-mono text-xs focus:outline-none leading-relaxed ${theme.inputBg}`}
          ></textarea>
        ) : (
          <div
            className={`markdown-body rounded-xl p-6 min-h-[350px] ${theme.subCardBg} ${theme.markdownClass}`}
            dangerouslySetInnerHTML={{ __html: renderedPreview }}
          ></div>
        )}
      </div>
    </form>
  );
}

// Render React Root
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
