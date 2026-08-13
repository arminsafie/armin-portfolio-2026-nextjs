"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, LogOut, Plus, Trash2 } from "lucide-react";
import type { SiteContent } from "@/lib/content";

const inputClass =
  "w-full border border-line-dim bg-ink px-3 py-2.5 text-sm text-paper outline-none transition-colors focus:border-blue";
const labelClass = "mb-1.5 block font-mono text-[11px] uppercase tracking-[0.15em] text-muted-2";
const cardClass = "border border-line-dim bg-panel/30 p-4 sm:p-6";

export default function AdminEditor({ initialContent }: { initialContent: SiteContent }) {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [status, setStatus] = useState<{ type: "idle" | "saving" | "success" | "error"; message?: string }>({
    type: "idle",
  });

  async function handleSave() {
    setStatus({ type: "saving" });
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: "error", message: data.error || "Save failed" });
        return;
      }
      setStatus({ type: "success", message: "Saved. Refresh the site to see it live." });
    } catch {
      setStatus({ type: "error", message: "Could not reach the server." });
    }
  }

  function handleDownload() {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "content.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-ink pb-32">
      <header className="sticky top-0 z-50 border-b border-line-dim bg-ink/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-2">Admin</p>
            <h1 className="font-display text-lg font-medium text-paper">Site Content</h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted transition-colors hover:text-paper"
            >
              View site
            </a>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 border border-line-dim px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted transition-colors hover:border-blue hover:text-paper"
            >
              <LogOut className="h-3.5 w-3.5" />
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:space-y-10 sm:px-6 sm:py-10">
        {/* HERO */}
        <Section title="Hero">
          <Field label="Eyebrow label">
            <input
              className={inputClass}
              value={content.hero.eyebrow}
              onChange={(e) => setContent({ ...content, hero: { ...content.hero, eyebrow: e.target.value } })}
            />
          </Field>
          <Field label="Name">
            <input
              className={inputClass}
              value={content.hero.name}
              onChange={(e) => setContent({ ...content, hero: { ...content.hero, name: e.target.value } })}
            />
          </Field>
          <Field label="Tagline">
            <input
              className={inputClass}
              value={content.hero.tagline}
              onChange={(e) => setContent({ ...content, hero: { ...content.hero, tagline: e.target.value } })}
            />
          </Field>
          <Field label="Bio">
            <textarea
              className={inputClass}
              rows={4}
              value={content.hero.bio}
              onChange={(e) => setContent({ ...content, hero: { ...content.hero, bio: e.target.value } })}
            />
          </Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Base / location">
              <input
                className={inputClass}
                value={content.hero.base}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, base: e.target.value } })}
              />
            </Field>
            <Field label="Since (year)">
              <input
                className={inputClass}
                value={content.hero.since}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, since: e.target.value } })}
              />
            </Field>
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section title="Work">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Role title">
              <input
                className={inputClass}
                value={content.experience.role}
                onChange={(e) =>
                  setContent({ ...content, experience: { ...content.experience, role: e.target.value } })
                }
              />
            </Field>
            <Field label="Type (e.g. Self-employed · Remote)">
              <input
                className={inputClass}
                value={content.experience.type}
                onChange={(e) =>
                  setContent({ ...content, experience: { ...content.experience, type: e.target.value } })
                }
              />
            </Field>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Duration marker (e.g. 2021 → present)">
              <input
                className={inputClass}
                value={content.experience.duration}
                onChange={(e) =>
                  setContent({ ...content, experience: { ...content.experience, duration: e.target.value } })
                }
              />
            </Field>
            <Field label="Duration label (heading note)">
              <input
                className={inputClass}
                value={content.experience.durationLabel}
                onChange={(e) =>
                  setContent({ ...content, experience: { ...content.experience, durationLabel: e.target.value } })
                }
              />
            </Field>
          </div>

          <ListEditor
            label="Highlights"
            items={content.experience.highlights}
            onChange={(highlights) =>
              setContent({ ...content, experience: { ...content.experience, highlights } })
            }
            multiline
          />
        </Section>

        {/* PROJECTS */}
        <Section title="Projects">
          <div className="space-y-6">
            {content.projects.map((project, i) => (
              <div key={i} className="relative border border-line-dim bg-ink/50 p-5">
                <button
                  onClick={() =>
                    setContent({ ...content, projects: content.projects.filter((_, j) => j !== i) })
                  }
                  aria-label="Remove project"
                  className="absolute right-3 top-3 text-muted-2 transition-colors hover:text-amber"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <div className="grid grid-cols-1 gap-4 pr-8 sm:grid-cols-2">
                  <Field label="Name">
                    <input
                      className={inputClass}
                      value={project.name}
                      onChange={(e) => updateProject(i, { name: e.target.value })}
                    />
                  </Field>
                  <Field label="Kind">
                    <input
                      className={inputClass}
                      value={project.kind}
                      onChange={(e) => updateProject(i, { kind: e.target.value })}
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Stack (comma separated)">
                    <input
                      className={inputClass}
                      value={project.stack.join(", ")}
                      onChange={(e) =>
                        updateProject(i, { stack: splitCommaList(e.target.value) })
                      }
                    />
                  </Field>
                  <Field label="URL">
                    <input
                      className={inputClass}
                      value={project.url}
                      onChange={(e) => updateProject(i, { url: e.target.value })}
                    />
                  </Field>
                </div>
                <Field label="Summary">
                  <textarea
                    className={inputClass}
                    rows={3}
                    value={project.summary}
                    onChange={(e) => updateProject(i, { summary: e.target.value })}
                  />
                </Field>
                <Field label="Result / outcome (optional)">
                  <input
                    className={inputClass}
                    value={project.result}
                    onChange={(e) => updateProject(i, { result: e.target.value })}
                  />
                </Field>
              </div>
            ))}
          </div>

          <button
            onClick={() =>
              setContent({
                ...content,
                projects: [
                  ...content.projects,
                  { name: "New Project", kind: "", stack: [], url: "", summary: "", result: "" },
                ],
              })
            }
            className="mt-4 inline-flex items-center gap-1.5 border border-line-dim px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted transition-colors hover:border-blue hover:text-paper"
          >
            <Plus className="h-3.5 w-3.5" />
            Add project
          </button>
        </Section>

        {/* SKILLS */}
        <Section title="Skills">
          <div className="space-y-5">
            {content.skills.groups.map((group, i) => (
              <div key={i} className="relative border border-line-dim bg-ink/50 p-5">
                <button
                  onClick={() =>
                    setContent({
                      ...content,
                      skills: { ...content.skills, groups: content.skills.groups.filter((_, j) => j !== i) },
                    })
                  }
                  aria-label="Remove skill group"
                  className="absolute right-3 top-3 text-muted-2 transition-colors hover:text-amber"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="grid grid-cols-1 gap-4 pr-8 sm:grid-cols-2">
                  <Field label="Group label">
                    <input
                      className={inputClass}
                      value={group.label}
                      onChange={(e) => updateSkillGroup(i, { label: e.target.value })}
                    />
                  </Field>
                  <Field label="Items (comma separated)">
                    <input
                      className={inputClass}
                      value={group.items.join(", ")}
                      onChange={(e) => updateSkillGroup(i, { items: splitCommaList(e.target.value) })}
                    />
                  </Field>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() =>
              setContent({
                ...content,
                skills: { ...content.skills, groups: [...content.skills.groups, { label: "New Group", items: [] }] },
              })
            }
            className="mt-4 inline-flex items-center gap-1.5 border border-line-dim px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted transition-colors hover:border-blue hover:text-paper"
          >
            <Plus className="h-3.5 w-3.5" />
            Add group
          </button>

          <div className="mt-6">
            <Field label="Strengths (comma separated)">
              <input
                className={inputClass}
                value={content.skills.strengths.join(", ")}
                onChange={(e) =>
                  setContent({ ...content, skills: { ...content.skills, strengths: splitCommaList(e.target.value) } })
                }
              />
            </Field>
          </div>
        </Section>

        {/* EDUCATION */}
        <Section title="Education">
          <div className="space-y-4">
            {content.education.map((item, i) => (
              <div key={i} className="relative grid grid-cols-1 gap-4 border border-line-dim bg-ink/50 p-5 pr-10 sm:grid-cols-2">
                <button
                  onClick={() =>
                    setContent({ ...content, education: content.education.filter((_, j) => j !== i) })
                  }
                  aria-label="Remove education item"
                  className="absolute right-3 top-3 text-muted-2 transition-colors hover:text-amber"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <Field label="Program">
                  <input
                    className={inputClass}
                    value={item.program}
                    onChange={(e) => updateEducation(i, { program: e.target.value })}
                  />
                </Field>
                <Field label="Institution">
                  <input
                    className={inputClass}
                    value={item.institution}
                    onChange={(e) => updateEducation(i, { institution: e.target.value })}
                  />
                </Field>
              </div>
            ))}
          </div>
          <button
            onClick={() =>
              setContent({ ...content, education: [...content.education, { program: "", institution: "" }] })
            }
            className="mt-4 inline-flex items-center gap-1.5 border border-line-dim px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted transition-colors hover:border-blue hover:text-paper"
          >
            <Plus className="h-3.5 w-3.5" />
            Add education item
          </button>
        </Section>

        {/* LANGUAGES */}
        <Section title="Languages">
          <div className="space-y-4">
            {content.languages.map((item, i) => (
              <div key={i} className="relative grid grid-cols-1 gap-4 border border-line-dim bg-ink/50 p-5 pr-10 sm:grid-cols-3">
                <button
                  onClick={() =>
                    setContent({ ...content, languages: content.languages.filter((_, j) => j !== i) })
                  }
                  aria-label="Remove language"
                  className="absolute right-3 top-3 text-muted-2 transition-colors hover:text-amber"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <Field label="Language">
                  <input
                    className={inputClass}
                    value={item.name}
                    onChange={(e) => updateLanguage(i, { name: e.target.value })}
                  />
                </Field>
                <Field label="Level label">
                  <input
                    className={inputClass}
                    value={item.level}
                    onChange={(e) => updateLanguage(i, { level: e.target.value })}
                  />
                </Field>
                <Field label="Scale (1–3)">
                  <input
                    type="number"
                    min={1}
                    max={3}
                    className={inputClass}
                    value={item.scale}
                    onChange={(e) => updateLanguage(i, { scale: clampScale(Number(e.target.value)) })}
                  />
                </Field>
              </div>
            ))}
          </div>
          <button
            onClick={() =>
              setContent({
                ...content,
                languages: [...content.languages, { name: "", level: "", scale: 1 }],
              })
            }
            className="mt-4 inline-flex items-center gap-1.5 border border-line-dim px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted transition-colors hover:border-blue hover:text-paper"
          >
            <Plus className="h-3.5 w-3.5" />
            Add language
          </button>
        </Section>

        {/* CONTACT */}
        <Section title="Contact">
          <Field label="Blurb">
            <textarea
              className={inputClass}
              rows={2}
              value={content.contact.blurb}
              onChange={(e) => setContent({ ...content, contact: { ...content.contact, blurb: e.target.value } })}
            />
          </Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Email">
              <input
                className={inputClass}
                value={content.contact.email}
                onChange={(e) => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })}
              />
            </Field>
            <Field label="Phone">
              <input
                className={inputClass}
                value={content.contact.phone}
                onChange={(e) => setContent({ ...content, contact: { ...content.contact, phone: e.target.value } })}
              />
            </Field>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Location">
              <input
                className={inputClass}
                value={content.contact.location}
                onChange={(e) =>
                  setContent({ ...content, contact: { ...content.contact, location: e.target.value } })
                }
              />
            </Field>
            <Field label="GitHub URL">
              <input
                className={inputClass}
                value={content.contact.github}
                onChange={(e) => setContent({ ...content, contact: { ...content.contact, github: e.target.value } })}
              />
            </Field>
          </div>
          <Field label="LinkedIn URL">
            <input
              className={inputClass}
              value={content.contact.linkedin}
              onChange={(e) => setContent({ ...content, contact: { ...content.contact, linkedin: e.target.value } })}
            />
          </Field>
        </Section>
      </div>

      {/* Save bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line-dim bg-ink/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.15em]">
            {status.type === "success" && <span className="text-blue">{status.message}</span>}
            {status.type === "error" && <span className="text-amber">{status.message}</span>}
            {status.type === "idle" && (
              <span className="text-muted-2">Changes save to content.json on the server</span>
            )}
            {status.type === "saving" && <span className="text-muted-2">Saving…</span>}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 border border-line-dim px-4 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:border-blue hover:text-paper"
            >
              <Download className="h-3.5 w-3.5" />
              Download JSON
            </button>
            <button
              onClick={handleSave}
              disabled={status.type === "saving"}
              className="border border-amber bg-amber/10 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-amber transition-colors hover:bg-amber/20 disabled:opacity-50"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </main>
  );

  function updateProject(index: number, patch: Partial<SiteContent["projects"][number]>) {
    setContent((prev) => ({
      ...prev,
      projects: prev.projects.map((p, i) => (i === index ? { ...p, ...patch } : p)),
    }));
  }

  function updateSkillGroup(index: number, patch: Partial<SiteContent["skills"]["groups"][number]>) {
    setContent((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        groups: prev.skills.groups.map((g, i) => (i === index ? { ...g, ...patch } : g)),
      },
    }));
  }

  function updateEducation(index: number, patch: Partial<SiteContent["education"][number]>) {
    setContent((prev) => ({
      ...prev,
      education: prev.education.map((e, i) => (i === index ? { ...e, ...patch } : e)),
    }));
  }

  function updateLanguage(index: number, patch: Partial<SiteContent["languages"][number]>) {
    setContent((prev) => ({
      ...prev,
      languages: prev.languages.map((l, i) => (i === index ? { ...l, ...patch } : l)),
    }));
  }
}

function clampScale(n: number): number {
  if (Number.isNaN(n)) return 1;
  return Math.min(3, Math.max(1, Math.round(n)));
}

function splitCommaList(value: string): string[] {
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={cardClass}>
      <h2 className="mb-6 font-display text-xl font-medium text-paper">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

function ListEditor({
  label,
  items,
  onChange,
  multiline,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  multiline?: boolean;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            {multiline ? (
              <textarea
                className={inputClass}
                rows={2}
                value={item}
                onChange={(e) => onChange(items.map((v, j) => (j === i ? e.target.value : v)))}
              />
            ) : (
              <input
                className={inputClass}
                value={item}
                onChange={(e) => onChange(items.map((v, j) => (j === i ? e.target.value : v)))}
              />
            )}
            <button
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              aria-label="Remove item"
              className="shrink-0 border border-line-dim px-3 text-muted-2 transition-colors hover:border-amber hover:text-amber"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => onChange([...items, ""])}
        className="mt-2 inline-flex items-center gap-1.5 border border-line-dim px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted transition-colors hover:border-blue hover:text-paper"
      >
        <Plus className="h-3.5 w-3.5" />
        Add
      </button>
    </div>
  );
}
