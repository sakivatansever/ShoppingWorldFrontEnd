import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerItem,
  DrawerItemProps,
} from "@progress/kendo-react-layout";
import "@progress/kendo-theme-default/dist/all.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { changeSelectedValue } from "../../../store/sidebar/sidebarSlice";
import "../../../style/sidebar.css";
import { selectHasPermission } from "../../../utils/permission";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const expanded = useAppSelector((state) => state.sidebar.expanded);
  const canCreateUser = useSelector(selectHasPermission("Auth", "Register"));

  // Listen for window resize and update isMobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items = [
    ...(canCreateUser
      ? [
          {
            text: "Kullanıcı Ekle",
            icon: "user",
            route: "/createUser",
          },
        ]
      : []),
  ];

  const CustomItem = (props: DrawerItemProps) => {
    return (
      <DrawerItem {...props}>
        {props.icon && (
          <span className={`k-icon k-font-icon k-i-${props.icon}`} />
        )}
        <div className="item-descr-wrap">
          <div>{props.text}</div>
        </div>
      </DrawerItem>
    );
  };

  const selected = useSelector(
    (state: RootState) => state.sidebar.selectedIndex
  );

  if (selected === null) {
    dispatch(
      changeSelectedValue(
        items.findIndex((x) => x.route === window.location.pathname)
      )
    );
  }

   useEffect(() => { 
    dispatch(
      changeSelectedValue(
        items.findIndex((x) => x.route === location.pathname)
      )
    );
  }, [location.pathname, dispatch]);   

  // Menü öğesi seçildiğinde çağrılır
  const onSelect = (e: any) => {
    const newIndex = e.itemIndex;
    const newRoute = items[newIndex].route;

    if (newRoute) {
      navigate(newRoute);
      dispatch(changeSelectedValue(newIndex));
    }
  };

  return (
    <Drawer
      expanded={!isMobile && expanded} // Only expand if not mobile
      position="start"
      mode="push"
      mini={isMobile} // Sidebar stays mini on mobile
      items={items.map((item, index) => ({
        ...item,
        selected: index === selected,
      }))}
      style={{ height: "100%" }}
      item={CustomItem}
      onSelect={onSelect}
    >
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
