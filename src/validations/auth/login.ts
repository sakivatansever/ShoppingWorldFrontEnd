const passwordValidator = (value: string) =>{
  return value ? "" : "Lütfen şifre giriniz.";
}

type signInType = {
  userNameOrEmail: string;
  password: string;
};
export { passwordValidator, type signInType };
