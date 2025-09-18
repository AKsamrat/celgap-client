import Footer from "@/components/home/Footer";
import MegaMenu from "@/components/home/MegaMenue";
import TopMenuBar from "@/components/home/TopBar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TopMenuBar></TopMenuBar>
      <MegaMenu />
      <main className="min-h-screen bg-[#FFFFFF]">{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
