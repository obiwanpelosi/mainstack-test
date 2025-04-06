import React, { ReactNode } from "react";
import Navbar from "../components/Navbar";
import FloatingSidebar from "@/components/FloatingSidebar";

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <FloatingSidebar />
      <main className="mt-[72px]">{children}</main>
    </div>
  );
};

export default DashboardLayout;
