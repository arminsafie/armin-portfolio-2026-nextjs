import { promises as fs } from "fs";
import path from "path";

export type Project = {
  name: string;
  kind: string;
  stack: string[];
  url: string;
  summary: string;
  result: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type EducationItem = {
  program: string;
  institution: string;
};

export type LanguageItem = {
  name: string;
  level: string;
  scale: number;
};

export type SiteContent = {
  hero: {
    eyebrow: string;
    name: string;
    tagline: string;
    bio: string;
    base: string;
    since: string;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
    blurb: string;
  };
  experience: {
    role: string;
    type: string;
    duration: string;
    durationLabel: string;
    highlights: string[];
  };
  projects: Project[];
  skills: {
    groups: SkillGroup[];
    strengths: string[];
  };
  education: EducationItem[];
  languages: LanguageItem[];
};

const contentPath = path.join(process.cwd(), "content.json");

export async function getContent(): Promise<SiteContent> {
  const raw = await fs.readFile(contentPath, "utf-8");
  return JSON.parse(raw) as SiteContent;
}

export async function saveContent(content: SiteContent): Promise<void> {
  await fs.writeFile(contentPath, JSON.stringify(content, null, 2), "utf-8");
}
