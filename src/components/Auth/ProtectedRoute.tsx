import { authLogout } from "../../store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  if (!user?.exp) {
    return <Navigate to="/auth/login" />;
  } else {
    const checkExpiration = () => {
      const currentTime = Math.floor(Date.now() / 1000); // Şu anki zaman (saniye cinsinden)
      if (user.exp < currentTime) {
        dispatch(authLogout());
      }
    };

    // İlk kontrol (sayfa yüklenince çalışır)
    checkExpiration();
  }

  return <>{children}</>;
};

export default ProtectedRoute;
