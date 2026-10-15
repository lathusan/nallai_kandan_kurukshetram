import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { canSave, readContent } from "@/lib/store";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isLoggedIn())) redirect("/admin/login");
  const content = await readContent();
  return <AdminDashboard content={content} canSave={await canSave()} />;
}
