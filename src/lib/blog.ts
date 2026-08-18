import type { CollectionEntry } from "astro:content";

type SectionKey =
  | "field-notes"
  | "company-dossiers"
  | "people"
  | "sector-briefs"
  | "sources";

export const sectionOrder: SectionKey[] = [
  "field-notes",
  "company-dossiers",
  "people",
  "sector-briefs",
  "sources",
];

export const sectionMeta: Record<
  SectionKey,
  {
    label: string;
    subtitle: string;
    summary: string;
    accent: string;
  }
> = {
  "field-notes": {
    label: "Field Notes",
    subtitle: "行业观察",
    summary: "快速捕捉正在发生的变化，给出初步判断。",
    accent: "#1d4ed8",
  },
  "company-dossiers": {
    label: "Company Dossiers",
    subtitle: "企业档案",
    summary: "沿公开材料拆解公司结构、节奏与风险。",
    accent: "#0f766e",
  },
  people: {
    label: "People",
    subtitle: "人物档案",
    summary: "把个人放回组织、行业与时代背景里阅读。",
    accent: "#b45309",
  },
  "sector-briefs": {
    label: "Sector Briefs",
    subtitle: "行业专题",
    summary: "把分散观察收束成一条清晰的研究主线。",
    accent: "#166534",
  },
  sources: {
    label: "Sources",
    subtitle: "引用来源",
    summary: "公开资料、公告链接和原始出处的索引。",
    accent: "#475569",
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
