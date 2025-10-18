import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/eshopping-logo.png";
import UserMenu from "./UserMenu/UserMenu";
import { toggleSidebar } from "../../../store/sidebar/sidebarSlice";
import { useDispatch } from "react-redux";
import { menuIcon } from "@progress/kendo-svg-icons";
import { useState, useEffect } from "react";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const go = (path?: string) => {
    if (!path) return;
    const abs = path.startsWith("/") ? path : `/${path}`;
    navigate(abs);
  };

  return (
    <AppBar
      style={{ zIndex: 10000, height: 60 }}
      positionMode="sticky"
      themeColor="dark"
    >
      <AppBarSection>
        {!isMobile && (
          <Button
            title="Menu"
            fillMode="flat"
            onClick={() => dispatch(toggleSidebar())}
            svgIcon={menuIcon}
          ></Button>
        )}
        <img
          src={logo}
          alt="Logo"
          style={{ height: 30, width: "auto", cursor: "pointer" }}
          onClick={() => go("/")}
        />
      </AppBarSection>

      {/* Spacer sadece desktop'ta görünsün */}
      {!isMobile && <AppBarSpacer />}

      {/* UserMenu her zaman en sağa yaslı */}
      <AppBarSection className="navbar-user">
        <UserMenu />
      </AppBarSection>
    </AppBar>
  );
}

export default Navbar;
