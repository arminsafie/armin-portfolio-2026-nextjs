import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getContent } from "@/lib/content";
import LoginForm from "./LoginForm";
import AdminEditor from "./AdminEditor";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const authed = verifySessionToken(token);

  if (!authed) {
    return <LoginForm />;
  }

  const content = await getContent();
  return <AdminEditor initialContent={content} />;
}
