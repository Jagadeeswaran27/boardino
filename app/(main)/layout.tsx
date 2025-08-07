import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
