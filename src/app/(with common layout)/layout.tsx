import Footer from "@/components/home/Footer";
import MegaMenu from "@/components/home/MegaMenue";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MegaMenu />
      <main className="min-h-screen bg-[#FFFFFF]">{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
