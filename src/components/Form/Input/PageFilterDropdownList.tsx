import React from "react";
import {
  DropDownList,
  DropDownListChangeEvent,
  DropDownListProps,
} from "@progress/kendo-react-dropdowns";
import {
  CompositeFilterDescriptor,
  FilterDescriptor,
  State,
} from "@progress/kendo-data-query";
import { IDropDownList } from "../../../interface/dropdownList";
import { FieldRenderProps, FieldWrapper } from "@progress/kendo-react-form";
import { Label, Error, Hint } from "@progress/kendo-react-labels";

interface CustomDropDownListProps extends DropDownListProps {
  gridState: State;
  setGridState: React.Dispatch<React.SetStateAction<any>>;
  total: number;
  filterValueName?: string;
  defaultItemName: string;
  setSelectedValue?: () => void;
}

export const PageFilterDropdownList = (
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
    gridState,
    setGridState,
    dataItemKey = "id",
    textField = "name",
    total,
    value,
    onOpen,
    onChange,
    defaultItemName,
    filterValueName,
    ...others
  } = fieldRenderProps;

  const editorRef = React.useRef<any>(null);

  const defaultItem: IDropDownList = {
    name: defaultItemName,
    id: null,
  };
  const filterChange = (event: any) => {
    const newFilter: FilterDescriptor = event.filter;

    if (filterValueName) {
      newFilter.field = filterValueName;
    }

    setGridState((prevState: any) => {
      const existingFilter = prevState.filter as CompositeFilterDescriptor;

      const cleanedFilters: FilterDescriptor[] = existingFilter?.filters?.length
        ? (existingFilter.filters as FilterDescriptor[]).filter(
            (f) => f.field !== newFilter.field
          )
        : [];

      cleanedFilters.push(newFilter);

      const filterModel: CompositeFilterDescriptor | null =
        cleanedFilters.length
          ? {
              logic: "and",
              filters: cleanedFilters,
            }
          : null;

      return {
        ...prevState,
        filter: filterModel,
      };
    });
  };

  const handlePageChange = (event: any) => {
    setGridState((prevState: any) => ({
      ...prevState,
      skip: event.page.skip,
    }));
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
        editorRef={editorRef}
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
          ref={editorRef}
          valid={valid}
          id={id}
          disabled={disabled}
          value={matchedValue ?? null}
          data={data}
          dataItemKey={dataItemKey}
          textField={textField}
          filterable={true}
          defaultItem={defaultItem}
          onFilterChange={filterChange}
          onChange={onHandleChange}
          onOpen={onOpen}
          virtual={{
            total: total,
            pageSize: gridState.take ?? 25,
            skip: gridState.skip ?? 0,
          }}
          onPageChange={handlePageChange}
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