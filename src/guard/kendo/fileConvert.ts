export const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const base64 = dataUrl.split(",")[1]; // Sadece base64 kısmını al
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });