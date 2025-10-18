import { FieldRenderProps, FieldWrapper } from "@progress/kendo-react-form";
import { Label, Error, Hint } from "@progress/kendo-react-labels";
import { ChipList, ChipListChangeEvent } from "@progress/kendo-react-buttons";
import React from "react";

export const FormChipList = (fieldRenderProps: FieldRenderProps) => {
  const {
    validationMessage,
    touched,
    id,
    label,
    valid,
    disabled,
    hint,
    visited,
    modified,
    value,
    onChange,
    ...others
  } = fieldRenderProps;
  const editorRef = React.useRef<any>(null);

  const showValidationMessage: string | false | null =
    touched && validationMessage;
  const showHint: boolean = !showValidationMessage && hint;
  const hintId: string = showHint ? `${id}_hint` : "";
  const errorId: string = showValidationMessage ? `${id}_error` : "";
  const labelId: string = label ? `${id}_label` : "";
  const onHandleChange = (event: ChipListChangeEvent) => {
    if (fieldRenderProps.onChange) {
      fieldRenderProps.onChange(event);
    }
  };
  return (
    <FieldWrapper>
      <Label
        id={labelId}
        editorRef={editorRef}
        editorId={id}
        editorValid={valid}
        editorDisabled={disabled}
        className="k-form-label"
      >
        {label}
      </Label>
      <div className="k-form-field-wrap">
        <ChipList
          id={id}
          ariaDescribedBy={`${hintId} ${errorId}`}
          ariaLabelledBy={labelId}
          onChange={onHandleChange}
          valid={valid}
          disabled={disabled}
          ref={editorRef}
          value={value} // 🚀 Form state ile senkronize
          {...others}
        />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && (
          <Error id={errorId}>{validationMessage}</Error>
        )}
      </div>
    </FieldWrapper>
  );
};