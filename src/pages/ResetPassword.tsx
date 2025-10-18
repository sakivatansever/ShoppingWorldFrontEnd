import { Navigate, useSearchParams } from "react-router-dom";
import useResetPassword from "../hooks/useResetPassword";
import LoginImage from "../assets/eshopping-logo.png";
import {
  Field,
  Form,
  FormElement,
  FormRenderProps,
} from "@progress/kendo-react-form";
import { FormTextBox } from "../components/Form";
import { Button } from "@progress/kendo-react-buttons";
import { passwordValidator, resetPasswordType } from "../validations/auth/resetPassword";
import { InputPrefix, InputSuffix } from "@progress/kendo-react-inputs";
import { SvgIcon } from "@progress/kendo-react-common";
import { lockIcon, eyeIcon, eyeSlashIcon } from "@progress/kendo-svg-icons";
import { useState } from "react";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  // Eğer email veya token yoksa login sayfasına yönlendir
  if (!email || !token) {
    return <Navigate to="/auth/login" replace />;
  }

  const { submitForm } = useResetPassword(email, token);

  const initialValues: resetPasswordType = {
    newPassword: "",
  };

  return (
    <div
      className="k-bg-surface-alt k-d-flex k-flex-col k-gap-6 k-p-10 k-elevation-8 k-box-sizing-border k-w-full"
      style={{ maxWidth: "458px", opacity: "0.95", borderRadius: "5%" }}
    >
      <a className="k-d-flex k-justify-content-center">
        <img src={LoginImage} alt="Logo" width={150} height={150} style={{ margin: "20px 0px 30px" }} />
      </a>
      
      <div className="k-text-center">
        <h2 className="k-text-xl k-font-semibold k-mb-2">Yeni Şifre Belirleyin</h2>
        <p className="k-text-sm k-text-gray-600 k-mb-6">
          Lütfen yeni şifrenizi girin.
        </p>
      </div>

      <div>
        <Form
          initialValues={initialValues}
          onSubmit={(values, event) => {
            event?.preventDefault();
            const formData: resetPasswordType = values as resetPasswordType;
            submitForm(formData);
          }}
          render={(formRenderProps: FormRenderProps) => (
            <FormElement className="k-d-flex k-flex-col k-gap-3.5">
              <Field
                id="newPassword"
                name="newPassword"
                label="Yeni Şifre"
                size="large"
                type={showPassword ? "text" : "password"}
                placeholder="Yeni şifre"
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
                      Şifreyi Sıfırla
                    </Button>
                  </div>
                </div>
              </div>
            </FormElement>
          )}
        />
      </div>
    </div>
  );
};

export default ResetPassword;
