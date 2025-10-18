import { FieldRenderProps } from "@progress/kendo-react-form";
import { TextArea } from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import { Error } from "@progress/kendo-react-labels";

function FormTextArea(fieldRenderProps: FieldRenderProps) {
  const {
    name,
    label,
    placeholder,
    size,
    validationMessage,
    visited,
    value = "",
    ...others
  } = fieldRenderProps;

  return (
    <div className="k-form-field" style={{ width: "100%", margin: 0 }}>
      <Label editorId={name} className="k-form-label">
        {label}
      </Label>
      <TextArea
        {...others}
        id={name}
        value={value ?? ""}
        placeholder={placeholder}
        name={name}
        size={size}
      />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
}

export default FormTextArea;