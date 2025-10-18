import { useAppDispatch } from "../store/hooks";
import { SubmitHandler } from "react-hook-form";
import { showNotification } from "../store/notification/notificationSlice";
import { ICreateUser } from "../interface/createUser";
import actCreateUser from "../services/auth/authRegister";
import { useState } from "react";

const useCreateUser = (editData?: any) => {
  const dispatch = useAppDispatch();
  const [filteredDataLdapUserEmails, setFilteredDataLdapUserEmails] = useState<any[]>([]);
  const [selectedLdapUser, setSelectedLdapUser] = useState<any>(null);

  const submitForm: SubmitHandler<any> = async (data) => {
    const payload: ICreateUser = {
      email: data.email,
      userName: data.userName,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      company: data.company,
      phoneNumber: data.phoneNumber,
    };

    const handleSuccess = (message: string) => {
      dispatch(showNotification({ type: "success", message }));
    };

    const handleError = (message: string) => {
      dispatch(showNotification({ type: "error", message }));
    };

    // Kullanıcı oluşturma işlemi
    dispatch(actCreateUser(payload))
      .unwrap()
      .then((res) => handleSuccess("Kullanıcı başarıyla oluşturuldu.")) 
      .catch((err) => {
        const errorMessage = err?.[0]?.description || "Kullanıcı oluşturulurken bir hata oluştu.";
        handleError(errorMessage); 
      });
  };

  const getLdapUserEmails = async () => {
    // Geçici olarak boş array döndür
    setFilteredDataLdapUserEmails([]);
  };

  const handleChange = (event: any) => {
    const selectedItem = event.value;
    setSelectedLdapUser(selectedItem);
  };

  return {
    submitForm,
    filteredDataLdapUserEmails,
    setFilteredDataLdapUserEmails,
    getLdapUserEmails,
    handleChange,
    selectedLdapUser,
  };
};

export default useCreateUser;
