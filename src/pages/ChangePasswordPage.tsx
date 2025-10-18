import {
  Field,
  Form,
  FormElement,
  FormRenderProps,
} from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import React from "react";
import { GridLayoutItem } from "@progress/kendo-react-layout";
import FormTextBox from "../components/Form/Input/FormTextBox";
import "../style/changePassword.css";
import useChangePassword from "../hooks/useChangePassword";
import {
  passwordValidator,
  requiredFieldValidator,
} from "../validations/auth/createUser";

interface ChangePasswordProps {
  editData?: any;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ editData }) => {
  const { submitForm } = useChangePassword(editData);

return (
  <div className="change-password-container">
    <div className="change-password-content">
      {/* Başlık */}
      <h2 className="change-password-title">Şifre Değiştirme</h2>
      <p className="change-password-subtitle">
        Lütfen mevcut şifrenizi ve yeni şifrenizi giriniz.
      </p>

      <Form
        initialValues={editData}
        onSubmit={(values, event) => {
          event?.preventDefault();
          submitForm(values);
        }}
        render={(formRenderProps: FormRenderProps) => (
          <FormElement className="form-element">
            <GridLayoutItem className="form-item">
              <Field
                id="currentPassword"
                name="currentPassword"
                label="Şifre"
                size="large"
                type="password"
                placeholder="Güncel şifrenizi giriniz..."
                component={FormTextBox}
                validator={requiredFieldValidator}
              />
            </GridLayoutItem>

            <GridLayoutItem className="form-item">
              <Field
                id="newPassword"
                name="newPassword"
                label="Yeni Şifre"
                size="large"
                type="password"
                placeholder="Yeni şifrenizi giriniz..."
                component={FormTextBox}
                validator={passwordValidator}
              />
            </GridLayoutItem>

            <GridLayoutItem className="form-item">
              <Field
                id="confirmNewPassword"
                name="confirmNewPassword"
                label="Yeni Şifre Tekrarı"
                size="large"
                type="password"
                placeholder="Yeni şifrenizi tekrar giriniz..."
                component={FormTextBox}
                validator={(value: string) => {
                  const newPassword = formRenderProps.valueGetter("newPassword");
                  if (value && value !== newPassword) {
                    return "Yeni şifreler uyuşmuyor.";
                  }
                  return "";
                }}
              />
            </GridLayoutItem>

            <div className="form-buttons">
              <Button
                className="submit-button"
                size="large"
                themeColor="primary"
                type="submit"
                disabled={!formRenderProps.allowSubmit}
              >
                Kaydet
              </Button>
            </div>
          </FormElement>
        )}
      />
    </div>
  </div>
);
}
export default ChangePassword;
