import Header from "@/components/Header";
import { ClerkLoaded } from "@clerk/nextjs";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkLoaded>
      <div className="flex-1 flex flex-col h-scree n">
        <Header />
        <main className="flex-1 overflow-y-auto hide-scrollbars">
          {children}
        </main>
      </div>
    </ClerkLoaded>
  );
}

export default DashboardLayout;
