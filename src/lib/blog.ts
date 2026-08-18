import type { CollectionEntry } from "astro:content";

type SectionKey =
  | "field-notes"
  | "company-dossiers"
  | "people"
  | "sector-briefs";

export const sectionOrder: SectionKey[] = [
  "field-notes",
  "company-dossiers",
  "people",
  "sector-briefs",
];

export const sectionMeta: Record<
  SectionKey,
  {
    label: string;
    english: string;
    subtitle: string;
    summary: string;
    path: string;
    accent: string;
  }
> = {
  "field-notes": {
    label: "行业观察",
    english: "Field Notes",
    subtitle: "正在发生的变化",
    summary: "快速捕捉正在发生的变化，给出初步判断。",
    path: "/field-notes/",
    accent: "#1d4ed8",
  },
  "company-dossiers": {
    label: "公司研究",
    english: "Company Research",
    subtitle: "公司结构与商业判断",
    summary: "沿公开材料拆解公司结构、节奏与风险。",
    path: "/company-dossiers/",
    accent: "#0f766e",
  },
  people: {
    label: "人物研究",
    english: "People",
    subtitle: "人物、组织与行业位置",
    summary: "把个人放回组织、行业与时代背景里阅读。",
    path: "/people/",
    accent: "#b45309",
  },
  "sector-briefs": {
    label: "行业专题",
    english: "Sector Briefs",
    subtitle: "系统性专题梳理",
    summary: "把分散观察收束成一条清晰的研究主线。",
    path: "/sector-briefs/",
    accent: "#166534",
  },
};

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(date)
    .replaceAll("/", ".");
}

export function estimateReadingTime(body: string) {
  const characters = body.replace(/\s+/g, "").length;
  return Math.max(1, Math.round(characters / 650));
}

export function sortPosts(posts: CollectionEntry<"blog">[]) {
  return [...posts].sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );
}

export function groupPostsBySection(posts: CollectionEntry<"blog">[]) {
  return sectionOrder.map((section) => ({
    section,
    items: posts.filter((post) => post.data.section === section),
  }));
}
