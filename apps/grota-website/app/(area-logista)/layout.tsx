import { SidebarDesktop } from "@/src/presentation/layout/components/ux/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      {/* Sidebar fixa à esquerda */}
      <aside className="shrink-0">
        <SidebarDesktop/>
      </aside>

      {/* Conteúdo principal ao lado da sidebar */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
