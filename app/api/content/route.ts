import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent, SiteContent } from "@/lib/content";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function GET() {
  try {
    const content = await getContent();
    return NextResponse.json(content);
  } catch {
    return NextResponse.json({ error: "Could not read content" }, { status: 500 });
  }
}

function isValidShape(body: unknown): body is SiteContent {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.hero === "object" &&
    typeof b.contact === "object" &&
    typeof b.experience === "object" &&
    Array.isArray(b.projects) &&
    typeof b.skills === "object" &&
    Array.isArray(b.education) &&
    Array.isArray(b.languages)
  );
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValidShape(body)) {
    return NextResponse.json({ error: "Content is missing required sections" }, { status: 400 });
  }

  try {
    await saveContent(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    // Common on read-only filesystems (e.g. serverless hosts like Vercel).
    return NextResponse.json(
      {
        error:
          "Could not write content.json on this server — the filesystem is likely read-only here (common on serverless hosts). Download the JSON and commit it to your repo instead.",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
