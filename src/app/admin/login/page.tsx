import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";
import DrumHead from "@/components/DrumHead";
import { site } from "@/content/site";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await isLoggedIn()) redirect("/admin");
  return (
    <main className="flex min-h-screen items-center justify-center bg-wood px-4 py-12">
      <div className="w-full max-w-sm rounded bg-ash p-6 shadow-xl sm:p-8">
        <div className="flex items-center gap-3">
          <DrumHead className="h-10 w-10" />
          <div className="leading-tight">
            <p className="font-display text-lg text-wood">{site.schoolName}</p>
            <p className="text-sm text-muted">Admin</p>
          </div>
        </div>
        <h1 className="mt-6 text-3xl text-wood">Log in</h1>
        <LoginForm />
      </div>
    </main>
  );
}
