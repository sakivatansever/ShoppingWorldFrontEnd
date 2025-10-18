import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { actAuthLogin } from "../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { signInType } from "../validations/auth/login";
import { showNotification } from "../store/notification/notificationSlice";

const useLogin = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { error, loading, accessToken } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const initialValues: signInType = {
    userNameOrEmail: "",
    password: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
  } = useForm<signInType>({
    mode: "onBlur",
  });

  const submitForm: SubmitHandler<signInType> = async (data) => {
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        dispatch(
          showNotification({
            type: "error",
            message: error,
          })
        );
      });
  };

  return {
    error,
    loading,
    accessToken,
    formErrors,
    showPassword,
    setShowPassword,
    register,
    handleSubmit,
    submitForm,
    initialValues,
    navigate,
  };
};

export default useLogin;
