// src/layouts/MainLayout/MainLayout.tsx
import { Outlet } from "react-router-dom";
import { CustomNotification } from "../../components/Feedback";
import { Navbar, Sidebar } from "../../components/common";
import "../../style/index.css";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar>
        <div className="k-p-4">
          <CustomNotification />
          <Outlet />
        </div>
      </Sidebar>
    </>
  );
};

export default MainLayout;
