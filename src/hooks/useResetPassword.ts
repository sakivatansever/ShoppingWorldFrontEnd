import { useAppDispatch } from "../store/hooks";
import { SubmitHandler } from "react-hook-form";
import { showNotification } from "../store/notification/notificationSlice";
import authResetPassword from "../services/auth/authResetPassword";
import { IResetPassword } from "../interface/resetPassword";
import { useNavigate } from "react-router-dom";

const useResetPassword = (email: string, token: string) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitForm: SubmitHandler<any> = async (data) => {
    const payload: IResetPassword = {
      email: email,
      token: token,
      newPassword: data.newPassword,
    };

    const handleSuccess = (message: string) => {
      dispatch(
        showNotification({
          type: "success",
          message: message || "Şifreniz başarıyla sıfırlandı. Ana sayfaya yönlendiriliyorsunuz...",
        })
      );

      // Şifre sıfırlandıktan sonra ana sayfaya yönlendir
      setTimeout(() => {
        navigate("/"); // Ana sayfaya yönlendir
      }, 2000);
    };

    const handleError = (message: string) => {
      dispatch(showNotification({ type: "error", message }));
    };

    dispatch(authResetPassword(payload))
      .unwrap()
      .then((res) => handleSuccess(res.message))
      .catch((err) => {
        const errorMessage =
          err?.title || err?.[0] || "Şifre sıfırlama işlemi sırasında bir hata oluştu.";
        handleError(errorMessage);
      });
  };

  return {
    submitForm,
  };
};

export default useResetPassword;
