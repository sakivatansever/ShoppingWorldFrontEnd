import { Button } from "@progress/kendo-react-buttons";
import { authLogout } from "../../../../store/auth/authSlice";
import { AppBarSection } from "@progress/kendo-react-layout";
import { Popup } from "@progress/kendo-react-popup";
import "./UserMenu.css";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { useNavigate } from "react-router-dom";

function UserMenu() {
  const dispatch = useAppDispatch();
  const [show, setShow] = React.useState(false);
  const anchor = React.useRef<HTMLDivElement>(null);
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  // Çıkış işlemi
  const handleLogout = () => {
    dispatch(authLogout());  // Redux'tan çıkış işlemi
    navigate("/auth/login");  // Çıkış yaptıktan sonra login sayfasına yönlendir
  };
  return (
    <AppBarSection>
      <div ref={anchor}>
        {show && (
          <Popup
            anchor={anchor.current}
            show={show}
            style={{ marginLeft: 9, marginTop: 5, width: "calc(20vh)" }}
          >
            <div className="content">
              <ul className="userMenuUl">
                <li
                  onClick={() => {
                    navigate("/ChangePassword");
                    setShow(false);
                  }}
                >
                  <span>Şifre Değiştir</span>
                </li>
                <li
                  onClick={handleLogout}  // Çıkış yapma işlemi
                >
                  <span>Çıkış</span>
                </li>
              </ul>
            </div>
          </Popup>
        )}
        <Button
          fillMode="flat"
          onClick={() => {
            setShow(!show);
          }}
          type="button"
        >
          <div className="user-menu-content">
            {/* Fotoğraf kaldırıldı */}
            <span className="user-name">
              {user?.firstName} {user?.lastName}
            </span>
          </div>
        </Button>
      </div>
    </AppBarSection>
  );
}

export default UserMenu;
