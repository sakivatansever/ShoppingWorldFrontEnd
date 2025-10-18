import { Outlet } from "react-router-dom";
import Logo from "../../assets/bg1.jpg";
import LoginComponent from "../../components/Auth/AuthComponent";
import { CustomNotification, LottieHandler } from "../../components/Feedback";
import { useAppSelector } from "../../store/hooks";

const AuthLayout = () => {
  const { loading } = useAppSelector((state) => state.auth);
  return (
    <>
      <CustomNotification />
      <section
        className="k-d-flex k-align-items-center k-justify-content-center k-h-full"
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${Logo})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50%",
        }}
      >
        {loading === "pending" ? (
          <LottieHandler
            type="loading"
            message="Yükleniyor Lütfen Bekleyiniz..."
          />
        ) : (
          <LoginComponent>
            <Outlet />
          </LoginComponent>
        )}
      </section>
    </>
  );
};

export default AuthLayout;
