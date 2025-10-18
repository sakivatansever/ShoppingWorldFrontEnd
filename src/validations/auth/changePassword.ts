const passwordValidator = (value: string) => {
  if (!value) return "Lütfen şifre giriniz.";
  if (value.length < 8) return "Şifre en az 8 karakter olmalıdır.";
  return "";
};

const requiredFieldValidator = (value: string) => {
  return value ? "" : "Bu alan gereklidir.";
};

export { passwordValidator, requiredFieldValidator };
