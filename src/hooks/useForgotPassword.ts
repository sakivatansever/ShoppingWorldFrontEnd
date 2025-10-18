import { useAppDispatch } from "../store/hooks";
import { SubmitHandler } from "react-hook-form";
import { showNotification } from "../store/notification/notificationSlice";
import authForgotPassword from "../services/auth/authForgotPassword";
import { IForgotPassword } from "../interface/forgotPassword";

const useForgotPassword = () => {
  const dispatch = useAppDispatch();

  const submitForm: SubmitHandler<any> = async (data) => {
    const payload: IForgotPassword = {
      email: data.email,
    };

    const handleSuccess = (message: string) => {
      dispatch(
        showNotification({
          type: "success",
          message: message || "Şifre sıfırlama linki e-posta adresinize gönderildi.",
        })
      );
    };

    const handleError = (message: string) => {
      dispatch(showNotification({ type: "error", message }));
    };

    dispatch(authForgotPassword(payload))
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

export default useForgotPassword;
