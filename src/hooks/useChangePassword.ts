import { useAppDispatch } from "../store/hooks";
import { SubmitHandler } from "react-hook-form";
import { showNotification } from "../store/notification/notificationSlice";
import changePassword from "../services/auth/authChangePassword"; // Servisi import et
import { IChangePassword } from "../interface/changePassword";
import { useNavigate } from "react-router-dom";
import { authLogout } from "../store/auth/authSlice";

const useChangePassword = (editData?: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const submitForm: SubmitHandler<any> = async (data) => {
    const payload: IChangePassword = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };

    const handleSuccess = (message: string) => {
      dispatch(
        showNotification({
          type: "success",
          message:
            "Şifreniz başarıyla değiştirildi. Giriş sayfasına yönlendiriliyorsunuz.",
        })
      );

      setTimeout(() => {
        navigate("/auth/login");
        dispatch(authLogout());
      }, 2000);
    };

    const handleError = (message: string) => {
      dispatch(showNotification({ type: "error", message }));
    };

    // Şifre değişikliği işlemi
    dispatch(changePassword(payload))
      .unwrap()
      .then((res) => handleSuccess(res.message))
      .catch((err) => {
        const errorMessage =
          err?.title || err?.[0] || "Şifre değiştirirken bir hata oluştu.";
        handleError(errorMessage);
      });
  };

  return {
    submitForm,
  };
};

export default useChangePassword;
