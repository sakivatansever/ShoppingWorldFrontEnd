import { Navigate, Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import LoginImage from "../assets/eshopping-logo.png";
import {
  Field,
  Form,
  FormElement,
  FormRenderProps,
} from "@progress/kendo-react-form";
import { FormTextBox } from "../components/Form";
import { Button } from "@progress/kendo-react-buttons";
import { passwordValidator, signInType } from "../validations/auth/login";
import { InputPrefix, InputSuffix } from "@progress/kendo-react-inputs";
import { SvgIcon } from "@progress/kendo-react-common";
import {
  eyeIcon,
  eyeSlashIcon,
  lockIcon,
  userIcon,
} from "@progress/kendo-svg-icons";

const Login = () => {
  const {
    accessToken,
    showPassword,
    setShowPassword,
    submitForm,
    initialValues,
  } = useLogin();

  // Eğer kullanıcı zaten giriş yapmışsa, anasayfaya yönlendir.
  if (accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <div
      className="k-bg-surface-alt k-d-flex k-flex-col k-gap-6 k-p-10 k-elevation-8 k-box-sizing-border k-w-full"
      style={{ maxWidth: "458px", opacity: "0.95", borderRadius: "5%" }}
    >
      <a className="k-d-flex k-justify-content-center">
        <img src={LoginImage} alt="Logo" width={150} height={150} style={{ margin: "20px 0px 30px" }} />
      </a>
      <div>
        <Form
          initialValues={initialValues}
          onSubmit={(values, event) => {
            event?.preventDefault();
            const formData: signInType = values as signInType;
            submitForm(formData);
          }}
          render={(formRenderProps: FormRenderProps) => (
            <FormElement className="k-d-flex k-flex-col k-gap-3.5">
              <Field
                id="userNameOrEmail"
                name="userNameOrEmail"
                label="Email/Username"
                size="large"
                type="text"
                placeholder="Email/Username"
                component={FormTextBox}
                prefix={() => (
                  <InputPrefix>
                    <SvgIcon icon={userIcon} />
                  </InputPrefix>
                )}
              />

              <Field
                id="password"
                name="password"
                label="Şifre"
                size="large"
                type={showPassword ? "text" : "password"}
                placeholder="Şifre"
                component={FormTextBox}
                validator={passwordValidator}
                suffix={() => (
                  <InputSuffix
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  >
                    <SvgIcon
                      icon={showPassword ? eyeSlashIcon : eyeIcon}
                      size="medium"
                    />
                  </InputSuffix>
                )}
                prefix={() => (
                  <InputPrefix>
                    <SvgIcon icon={lockIcon} />
                  </InputPrefix>
                )}
              />
              <div className="k-form-buttons k-form-field w-50">
                <div className="k-d-flex k-flex-col k-flex-grow k-gap-4">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      style={{ width: "50%" }}
                      size="large"
                      themeColor="primary"
                      type="submit"
                      disabled={!formRenderProps.allowSubmit}
                    >
                      Giriş
                    </Button>
                  </div>
                </div>
              </div>

              <div className="k-text-center k-mt-4">
                <Link 
                  to="/auth/forgot-password" 
                  className="k-text-primary k-text-sm k-no-underline hover:k-underline"
                >
                  Şifrenizi mi unuttunuz?
                </Link>
              </div>
            </FormElement>
          )}
        ></Form>
      </div>
    </div>
  );
};

export default Login;
