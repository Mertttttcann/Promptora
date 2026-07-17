import Sidebar from "@/components/Sidebar";
import { createClient } from "@/lib/supabase/server";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Sidebar email={user?.email} />
      <main className="ml-[228px] min-h-screen px-7 py-6">{children}</main>
    </>
  );
}
