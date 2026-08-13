import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import CornerBrackets from "./CornerBrackets";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import type { SiteContent } from "@/lib/content";

function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\//, "");
}

export default function Contact({ contact }: { contact: SiteContent["contact"] }) {
  const telHref = `tel:${contact.phone.replace(/[^\d+]/g, "")}`;

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20 md:px-10 md:py-24">
      <SectionHeading sheet="A-06" index="06" title="Contact" note="Status: open to inquiries" />

      <Reveal>
        <p className="mb-8 max-w-md text-sm leading-relaxed text-muted">{contact.blurb}</p>

        {/* Primary contact — full-width feature tile */}
        <a
          href={`mailto:${contact.email}`}
          className="group relative mb-5 block border border-line-dim bg-panel/30 p-5 transition-colors hover:border-line sm:p-6 md:p-8"
        >
          <CornerBrackets />
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-line-dim text-amber transition-colors group-hover:border-amber">
              <Mail className="h-4 w-4" />
            </span>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2">
              Primary contact
            </p>
          </div>
          <p className="mt-4 break-all font-display text-2xl font-medium text-paper transition-colors group-hover:text-blue sm:text-3xl md:text-4xl">
            {contact.email}
          </p>
        </a>

        {/* Secondary contact methods */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ContactTile icon={Phone} label="Phone" value={contact.phone} href={telHref} />
          <ContactTile icon={MapPin} label="Location" value={contact.location} />
          <ContactTile
            icon={Github}
            label="GitHub"
            value={stripProtocol(contact.github)}
            href={contact.github}
          />
          <ContactTile
            icon={Linkedin}
            label="LinkedIn"
            value={stripProtocol(contact.linkedin)}
            href={contact.linkedin}
          />
        </div>
      </Reveal>
    </section>
  );
}

function ContactTile({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <CornerBrackets />
      <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-line-dim text-blue transition-colors group-hover:border-blue">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-2">{label}</p>
        <p className="mt-1 truncate text-sm text-paper/90">{value}</p>
      </div>
    </>
  );

  const className =
    "group relative flex items-center gap-3 border border-line-dim bg-panel/30 p-4 transition-colors hover:border-line";

  if (!href) {
    return <div className={className}>{inner}</div>;
  }

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className={className}
    >
      {inner}
    </a>
  );
}
