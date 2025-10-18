import { FieldRenderProps, FieldWrapper } from "@progress/kendo-react-form";
import { TextBox } from "@progress/kendo-react-inputs";
import { Label, Error } from "@progress/kendo-react-labels";

function FormTextBox(fieldRenderProps: FieldRenderProps) {
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
    <FieldWrapper>
      <Label editorId={name} className="k-form-label">
        {label}
      </Label>
      <div className="k-form-field-wrap">
        <TextBox
          {...others}
          id={name}
          value={value ?? ""}
          placeholder={placeholder}
          name={name}
          size={size}
        />
      </div>
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </FieldWrapper>
  );
}

export default FormTextBox;
