import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userEmail = "";

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/admin/login");
    }

    userEmail = user.email ?? "";
  } catch (err: unknown) {
    // Re-throw NEXT_REDIRECT — must not be swallowed
    if (
      err !== null &&
      typeof err === "object" &&
      "digest" in err &&
      typeof (err as { digest: string }).digest === "string" &&
      (err as { digest: string }).digest.startsWith("NEXT_REDIRECT")
    ) {
      throw err;
    }
    // Any other error (misconfigured env etc.) → go to login
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar userEmail={userEmail} />
      <main className="flex-1 p-6 md:p-8 lg:p-10 overflow-auto">
        {children}
      </main>
    </div>
  );
}
