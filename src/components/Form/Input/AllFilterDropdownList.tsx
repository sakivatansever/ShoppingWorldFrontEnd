import React, { useEffect } from "react";
import {
  DropDownList,
  DropDownListChangeEvent,
  DropDownListProps,
} from "@progress/kendo-react-dropdowns";
import { IDropDownList } from "../../../interface/dropdownList";
import { FieldRenderProps, FieldWrapper } from "@progress/kendo-react-form";
import { Label, Error, Hint } from "@progress/kendo-react-labels";

interface CustomDropDownListProps extends DropDownListProps {
  defaultItemName: string;
  setFilteredData: React.Dispatch<React.SetStateAction<any>>;
  defaultData: IDropDownList[];
}

export const AllFilterDropdownList = (
  fieldRenderProps: FieldRenderProps & CustomDropDownListProps
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
    filter,
    setFilteredData,
    dataItemKey = "id",
    textField = "name",
    defaultItemName,
    onChange,
    value,
    ...others
  } = fieldRenderProps;
  useEffect(() => {
    setFilteredData(defaultData);
  }, [defaultData]);

  const defaultItem: IDropDownList = {
    name: defaultItemName,
    id: null,
  };

  const handleFilterChange = (event: any) => {
    const filterValue = event.filter.value;
    if (!filterValue) {
      setFilteredData(defaultData);
      return;
    }

    const filteredItems = (defaultData || []).filter((item) =>
      item.name.toLowerCase().includes(filterValue.toLowerCase())
    );

    setFilteredData(filteredItems);
  };

  const onHandleChange = (event: DropDownListChangeEvent) => {
    if (fieldRenderProps.onChange) {
      fieldRenderProps.onChange(event);
    }
  };

  const showValidationMessage: string | false | null =
    touched && validationMessage;
  const showHint: boolean = !showValidationMessage && hint;
  const hintId: string = showHint ? `${id}_hint` : "";
  const errorId: string = showValidationMessage ? `${id}_error` : "";
  const labelId: string = label ? `${id}_label` : "";
  const matchedValue =
    typeof value === "object"
      ? data?.find((item) => item?.[dataItemKey] === value?.[dataItemKey])
      : data?.find((item) => item?.[dataItemKey] === value);

  return (
    <FieldWrapper style={wrapperStyle}>
      <Label
        id={labelId}
        editorId={id}
        editorValid={valid}
        editorDisabled={disabled}
        className="k-form-label"
      >
        {label}
      </Label>
      <div className={"k-form-field-wrap"}>
        <DropDownList
          ariaLabelledBy={labelId}
          ariaDescribedBy={`${hintId} ${errorId}`}
          valid={valid}
          id={id}
          disabled={disabled}
          data={data}
          dataItemKey={dataItemKey}
          textField={textField}
          value={matchedValue ?? null}
          filterable={true}
          defaultItem={defaultItem}
          onFilterChange={handleFilterChange}
          onChange={onHandleChange}
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