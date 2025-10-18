import { DatePicker } from "@progress/kendo-react-dateinputs";
import { FieldRenderProps, FieldWrapper } from "@progress/kendo-react-form";
import { Label, Error } from "@progress/kendo-react-labels";

function FormDatePicker(fieldRenderProps: FieldRenderProps) {
  const {
    name,
    label,
    placeholder,
    size,
    validationMessage,
    visited,
    value = "",
    valid,
    disabled,
    hint,
    ...others
  } = fieldRenderProps;

  return (
    <FieldWrapper>
      <Label editorId={name} className="k-form-label">
        {label}
      </Label>
      <DatePicker
        {...others}
        size={size}
        id={name}
        value={value}
        placeholder={placeholder}
        name={name}
        format="dd.MM.yyyy"
        valid={valid}
        disabled={disabled}
        ariaDescribedBy={validationMessage ? `${name}_error` : undefined}
      />
      {visited && validationMessage && <Error id={`${name}_error`}>{validationMessage}</Error>}
    </FieldWrapper>
  );
}

export default FormDatePicker;
