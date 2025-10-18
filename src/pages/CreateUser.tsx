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
import "../style/createUser.css";
import useCreateUser from "../hooks/useCreateUser";
import { passwordValidator, requiredFieldValidator, userNameValidator  } from "../validations/auth/createUser";
import FormPhoneTextBox from "../components/Form/Input/FormPhoneTextBox";

interface CreateUserProps {
  editData?: any;
}

const CreateUser: React.FC<CreateUserProps> = ({ editData }) => {
  const { submitForm } = useCreateUser(editData);

  return (
    <div className="create-user-container">
      <h2 className="create-user-title">Kullanıcı Oluştur</h2>
      <Form
        initialValues={editData}
        onSubmit={(values, event) => {
          event?.preventDefault();
          submitForm(values); // Formu gönder
        }}
        render={(formRenderProps: FormRenderProps) => {
          return (
            <FormElement className="form-element">
              {/* E-posta alanı tek başına büyük şekilde */}
                <GridLayoutItem className="form-item email">
                  <Field
                    id="email"
                    name="email"
                    label="Email"
                    size="large"
                    type="email"
                    placeholder="Mail adresinizi giriniz..."
                    component={FormTextBox}
                    validator={requiredFieldValidator}
                  />
                </GridLayoutItem>

              {/* Diğer alanlar yan yana */}
              <div className="form-row">
                <GridLayoutItem className="form-item">
                  <Field
                    id="userName"
                    name="userName"
                    label="Kullanıcı Adı"
                    size="large"
                    type="text"
                    placeholder="Kullanıcı adınızı giriniz..."
                    component={FormTextBox}
                    validator={userNameValidator}
                  />
                </GridLayoutItem>
                <GridLayoutItem className="form-item">
                  <Field
                    id="firstName"
                    name="firstName"
                    label="Ad"
                    size="large"
                    type="text"
                    placeholder="Adınızı giriniz..."
                    component={FormTextBox}
                    validator={requiredFieldValidator}
                  />
                </GridLayoutItem>
              </div>

              <div className="form-row">
                <GridLayoutItem className="form-item">
                  <Field
                    id="password"
                    name="password"
                    label="Şifre"
                    size="large"
                    type="password"
                    placeholder="Şifrenizi giriniz..."
                    component={FormTextBox}
                    validator={passwordValidator}
                  />
                </GridLayoutItem>
                <GridLayoutItem className="form-item">
                  <Field
                    id="lastName"
                    name="lastName"
                    label="Soyad"
                    size="large"
                    type="text"
                    placeholder="Soyadınızı giriniz..."
                    component={FormTextBox}
                    validator={requiredFieldValidator}
                  />
                </GridLayoutItem>
              </div>

              <div className="form-row">
                <GridLayoutItem className="form-item">
                  <Field
                    id="company"
                    name="company"
                    label="Şirket"
                    size="large"
                    type="text"
                    placeholder="Şirket adınızı giriniz..."
                    component={FormTextBox}
                    validator={requiredFieldValidator}
                  />
                </GridLayoutItem>
                <GridLayoutItem className="form-item"  style={{ marginTop: "23px" }}>
                  <Field
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Telefon Numarası"
                    size="large"
                    type="text"
                    placeholder="Telefon numaranızı giriniz..."
                    component={FormPhoneTextBox}
                    validator={requiredFieldValidator}
                  />
                </GridLayoutItem>
              </div>

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
          );
        }}
      />
    </div>
  );
};

export default CreateUser;
