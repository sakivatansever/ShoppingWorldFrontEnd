import React, { useEffect } from "react";
import { FieldRenderProps, FieldWrapper } from "@progress/kendo-react-form";
import { Checkbox } from "@progress/kendo-react-inputs";
import { Label, Error, Hint } from "@progress/kendo-react-labels";
import { IDropDownList } from "../../../interface/dropdownList";

interface Props extends FieldRenderProps {
  data?: IDropDownList[];
}

const FormCheckbox: React.FC<Props> = (fieldRenderProps) => {
  const {
    id,
    label,
    hint,
    data,
    value,
    onChange,
    touched,
    validationMessage,
    valid,
    disabled,
  } = fieldRenderProps;

  const showValidationMessage = touched && validationMessage;
  const hintId = hint && !showValidationMessage ? `${id}_hint` : "";
  const errorId = showValidationMessage ? `${id}_error` : "";
  const labelId = label ? `${id}_label` : "";

  if (!data) {
    return (
      <FieldWrapper>
        <Checkbox
          id={id}
          label={label}
          checked={value ?? false}
          disabled={disabled}
          onChange={(e) => onChange({ value: e.value })}
        />
        {hintId && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </FieldWrapper>
    );
  }

  const currentValue: number[] = Array.isArray(value) ? value : [];

  const handleToggle = (itemId: number) => {
    let newValue: number[];
    if (currentValue.includes(itemId)) {
      newValue = currentValue.filter((id) => id !== itemId);
    } else {
      newValue = [...currentValue, itemId];
    }
    onChange({ value: newValue });
  };

  useEffect(() => {
    if (!Array.isArray(value)) {
      onChange({ value: [] });
    }
  }, []);

  return (
    <FieldWrapper>
      {label && (
        <Label
          id={labelId}
          editorId={id}
          editorValid={valid}
          editorDisabled={disabled}
          className="k-form-label"
        >
          {label}
        </Label>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {data.map((item) => (
          <Checkbox
            key={item.id}
            label={item.name}
            checked={currentValue.includes(item.id)}
            disabled={disabled}
            onChange={() => handleToggle(item.id)}
          />
        ))}
      </div>
      {hintId && <Hint id={hintId}>{hint}</Hint>}
      {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>
  );
};

export default FormCheckbox;