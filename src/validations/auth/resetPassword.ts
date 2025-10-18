export const passwordValidator = (value: string) => {
  if (!value) {
    return "Yeni şifre gereklidir.";
  }
  
  if (value.length < 8) {
    return "Şifre en az 8 karakter olmalıdır.";
  }
  
  return "";
};

export type resetPasswordType = {
  newPassword: string;
};
