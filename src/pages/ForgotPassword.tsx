import { Navigate } from "react-router-dom";
import useForgotPassword from "../hooks/useForgotPassword";
import LoginImage from "../assets/eshopping-logo.png";
import {
  Field,
  Form,
  FormElement,
  FormRenderProps,
} from "@progress/kendo-react-form";
import { FormTextBox } from "../components/Form";
import { Button } from "@progress/kendo-react-buttons";
import { emailValidator, forgotPasswordType } from "../validations/auth/forgotPassword";
import { InputPrefix } from "@progress/kendo-react-inputs";
import { SvgIcon } from "@progress/kendo-react-common";
import { userIcon } from "@progress/kendo-svg-icons";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const { submitForm } = useForgotPassword();

  const initialValues: forgotPasswordType = {
    email: "",
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
        <h2 className="k-text-xl k-font-semibold k-mb-2">Şifrenizi mi unuttunuz?</h2>
        <p className="k-text-sm k-text-gray-600 k-mb-6">
          E-posta adresinizi girin, size şifre sıfırlama linki gönderelim.
        </p>
      </div>

      <div>
        <Form
          initialValues={initialValues}
          onSubmit={(values, event) => {
            event?.preventDefault();
            const formData: forgotPasswordType = values as forgotPasswordType;
            submitForm(formData);
          }}
          render={(formRenderProps: FormRenderProps) => (
            <FormElement className="k-d-flex k-flex-col k-gap-3.5">
              <Field
                id="email"
                name="email"
                label="E-posta Adresi"
                size="large"
                type="email"
                placeholder="ornek@email.com"
                component={FormTextBox}
                validator={emailValidator}
                prefix={() => (
                  <InputPrefix>
                    <SvgIcon icon={userIcon} />
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
                      Şifre Sıfırlama Linki Gönder
                    </Button>
                  </div>
                </div>
              </div>

              <div className="k-text-center k-mt-4">
                <Link 
                  to="/auth/login" 
                  className="k-text-primary k-text-sm k-no-underline hover:k-underline"
                >
                  ← Giriş sayfasına dön
                </Link>
              </div>
            </FormElement>
          )}
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
