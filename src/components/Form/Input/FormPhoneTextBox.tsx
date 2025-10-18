import { FieldRenderProps } from "@progress/kendo-react-form";
import { TextBox, TextBoxChangeEvent } from "@progress/kendo-react-inputs";
import { Label, Error } from "@progress/kendo-react-labels";

function FormPhoneTextBox(fieldRenderProps: FieldRenderProps) {
  const {
    name,
    label,
    placeholder,
    size,
    validationMessage,
    visited,
    value = "",
    type = "tel", // mobil cihazlarda sayısal klavye açar
    onChange,
    ...others
  } = fieldRenderProps;

  // Düzleştirilmiş değer: yalnızca rakamlar
  const rawValue = String(value || "").replace(/\D/g, "");
  const formattedValue = formatPhone(rawValue);

  const handleChange = (e: TextBoxChangeEvent) => {
    const onlyDigits = String(e.value || "").replace(/\D/g, "");
    onChange?.({
      value: onlyDigits,
      target: { name },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = ["Backspace", "ArrowLeft", "ArrowRight", "Tab"];
    if (!/[0-9]/.test(e.key) && !allowed.includes(e.key)) {
      e.preventDefault(); // sadece rakam ve kontrol tuşları
    }
  };

  return (
    <div className="k-form-field" style={{ width: "100%", margin: 0 }}>
      {label && (
        <Label editorId={name} className="k-form-label">
          {label}
        </Label>
      )}
      <TextBox
        {...others}
        id={name}
        name={name}
        type={type}
        size={size}
        placeholder={placeholder}
        value={formattedValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
}

export default FormPhoneTextBox;

function formatPhone(value: string): string {
  if (value.startsWith("0") && value.length >= 11) {
    // GSM numarası: 05xx xxx xx xx
    return value.replace(/^(\d{4})(\d{3})(\d{2})(\d{2})$/, "($1) $2 $3 $4");
  } else if (value.startsWith("2") && value.length >= 10) {
    // Sabit hat: 0212 xxx xx xx
    return value.replace(/^(\d{4})(\d{3})(\d{2})(\d{2})$/, "($1) $2 $3 $4");
  } else {
    return value; // henüz formatlanamayacaksa olduğu gibi bırak
  }
}