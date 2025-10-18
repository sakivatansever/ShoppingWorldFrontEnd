const passwordValidator = (value: string) => {
  if (!value) return "Lütfen şifre giriniz.";
  if (value.length < 8) return "Şifre en az 8 karakter olmalıdır.";
  return ""; 
};

const requiredFieldValidator = (value: string) => {
  return value ? "" : "Bu alan gereklidir.";
};

const userNameValidator = (value: string) => {
  if (!value) return "Kullanıcı adı gereklidir."; // value boş ise hata mesajı
  return value.length >= 3 ? "" : "Kullanıcı adı en az 3 karakter olmalıdır.";
};
export { passwordValidator, requiredFieldValidator, userNameValidator };