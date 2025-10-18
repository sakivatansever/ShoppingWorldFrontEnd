export const emailValidator = (value: string) => {
  if (!value) {
    return "E-posta adresi gereklidir.";
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return "Geçerli bir e-posta adresi giriniz.";
  }
  
  return "";
};

export type forgotPasswordType = {
  email: string;
};
