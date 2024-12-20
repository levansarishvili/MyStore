import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="main flex flex-col justify-center items-center gap-40 w-full max-w-[144rem] my-0 mx-auto px-16 py-0">
      {children}
    </main>
  );
}
