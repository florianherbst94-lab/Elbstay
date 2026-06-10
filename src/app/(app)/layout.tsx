import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col pt-[88px]">
        {children}
      </main>
      <Footer />
    </>
  );
}
