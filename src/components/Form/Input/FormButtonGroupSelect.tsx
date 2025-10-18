import React, { useEffect } from "react";
import { FieldRenderProps, FieldWrapper } from "@progress/kendo-react-form";
import { ButtonGroup, Button } from "@progress/kendo-react-buttons";
import { Label, Error, Hint } from "@progress/kendo-react-labels";
import { IDropDownList } from "../../../interface/dropdownList";

interface Props extends FieldRenderProps {
  data: IDropDownList[];
}

const FormButtonGroupSelect: React.FC<Props> = (fieldRenderProps) => {
  const {
    id,
    label,
    hint,
    data,
    value,
    onChange,
    validationMessage,
    touched,
    valid,
    disabled,
    ...others
  } = fieldRenderProps;
  const showValidationMessage = touched && validationMessage;
  const hintId = hint && !showValidationMessage ? `${id}_hint` : "";
  const errorId = showValidationMessage ? `${id}_error` : "";
  const labelId = label ? `${id}_label` : "";

  const handleSelect = (itemId: number | null) => {
    onChange({ value: itemId });
  };
  useEffect(() => {
    onChange({ value });
  }, []);

  return (
    <FieldWrapper>
      <Label
        id={labelId}
        editorId={id}
        editorValid={valid}
        editorDisabled={disabled}
        className="k-form-label"
      >
        {label}
      </Label>

      <div className="k-form-field-wrap">
        <ButtonGroup {...others}>
          {data.map((item) => (
            <Button
              key={item.id}
              type="button"
              togglable={true}
              selected={value === item.id}
              onClick={() => handleSelect(item.id)}
            >
              {item.name}
            </Button>
          ))}
        </ButtonGroup>

        {hintId && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && (
          <Error id={errorId}>{validationMessage}</Error>
        )}
      </div>
    </FieldWrapper>
  );
};

export default FormButtonGroupSelect;