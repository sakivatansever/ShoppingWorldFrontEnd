import React, { useEffect } from "react";
import {
  MultiSelect,
  MultiSelectChangeEvent,
  MultiSelectProps,
} from "@progress/kendo-react-dropdowns";
import { FieldRenderProps, FieldWrapper } from "@progress/kendo-react-form";
import { Label, Error, Hint } from "@progress/kendo-react-labels";
import { InputSuffix } from "@progress/kendo-react-inputs";
import { searchIcon } from "@progress/kendo-svg-icons";
import { Button } from "@progress/kendo-react-buttons";

interface CustomMultiSelectProps extends MultiSelectProps {
  label?: string;
  hint?: string;
  defaultData: any[];
  setFilteredData: React.Dispatch<React.SetStateAction<any[]>>;
}

const AllFilterMultiSelect = (
  fieldRenderProps: FieldRenderProps & CustomMultiSelectProps
) => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    wrapperStyle,
    data,
    defaultData,
    setFilteredData,
    textField = "name",
    dataItemKey = "id",
    onChange,
    value,
    ...others
  } = fieldRenderProps;
  useEffect(() => {
    setFilteredData(defaultData);
  }, [defaultData]);

  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : "";
  const errorId = showValidationMessage ? `${id}_error` : "";
  const labelId = label ? `${id}_label` : "";

  const onHandleChange = (event: MultiSelectChangeEvent) => {
    if (fieldRenderProps.onChange) {
      fieldRenderProps.onChange(event);
    }
  };

  const handleFilterChange = (event: any) => {
    const filterValue = event.filter?.value?.toLowerCase() ?? "";
    if (!filterValue) {
      setFilteredData(defaultData);
      return;
    }

    const filtered = defaultData.filter((item) =>
      item[textField]?.toLowerCase().includes(filterValue)
    );
    setFilteredData(filtered);
  };

  return (
    <FieldWrapper style={wrapperStyle}>
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
      <div className="k-form-field-wrap">
        <MultiSelect
          ariaLabelledBy={labelId}
          ariaDescribedBy={`${hintId} ${errorId}`}
          id={id}
          disabled={disabled}
          valid={valid}
          data={data}
          value={value}
          textField={textField}
          dataItemKey={dataItemKey}
          filterable
          onChange={onHandleChange}
          suffix={() => (
            <InputSuffix orientation="horizontal">
              <Button
                type="button"
                themeColor="primary"
                fillMode={"flat"}
                rounded={null}
                svgIcon={searchIcon}
              />
            </InputSuffix>
          )}
          tags={
            value?.length > 0
              ? [{ text: `${value.length} items selected`, data: [...value] }]
              : []
          }
          onFilterChange={handleFilterChange}
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

export default AllFilterMultiSelect;