import React from "react";
import {
  MultiSelect,
  MultiSelectChangeEvent,
  MultiSelectFilterChangeEvent,
  MultiSelectPageChangeEvent,
  MultiSelectProps,
} from "@progress/kendo-react-dropdowns";
import {
  CompositeFilterDescriptor,
  FilterDescriptor,
  State,
} from "@progress/kendo-data-query";
import { FieldRenderProps, FieldWrapper } from "@progress/kendo-react-form";
import { Label, Error, Hint } from "@progress/kendo-react-labels";
import { InputSuffix } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { searchIcon } from "@progress/kendo-svg-icons";

interface CustomMultiSelectProps extends MultiSelectProps {
  gridState: State;
  setGridState: React.Dispatch<React.SetStateAction<any>>;
  total: number;
  filterValueName?: string;
  setSelectedValue?: () => void;
}

export const PageFilterMultiSelect = (
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
    data = [],
    gridState,
    setGridState,
    onChange,
    total,
    value = [],
    textField = "name",
    dataItemKey = "id",
    filterValueName,
    ...others
  } = fieldRenderProps;

  const editorRef = React.useRef<any>(null);

  const onFilterChange = (event: MultiSelectFilterChangeEvent) => {
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
          ? { logic: "and", filters: cleanedFilters }
          : null;

      return {
        ...prevState,
        filter: filterModel,
      };
    });
  };

  const onPageChange = (event: MultiSelectPageChangeEvent) => {
    setGridState((prevState: any) => ({
      ...prevState,
      skip: event.page.skip,
    }));
  };

  const onHandleChange = (event: MultiSelectChangeEvent) => {
    if (fieldRenderProps.onChange) {
      fieldRenderProps.onChange(event);
    }
  };

  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : "";
  const errorId = showValidationMessage ? `${id}_error` : "";
  const labelId = label ? `${id}_label` : "";

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
      <div className="k-form-field-wrap">
        <MultiSelect
          id={id}
          ref={editorRef}
          ariaLabelledBy={labelId}
          ariaDescribedBy={`${hintId} ${errorId}`}
          valid={valid}
          disabled={disabled}
          data={data}
          value={Array.isArray(value) ? value : []}
          textField={textField}
          dataItemKey={dataItemKey}
          filterable
          onChange={onHandleChange}
          onFilterChange={onFilterChange}
          onPageChange={onPageChange}
          tags={
            value.length > 0
              ? [{ text: `${value.length} items selected`, data: [...value] }]
              : []
          }
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
          virtual={{
            pageSize: gridState.take ?? 25,
            skip: gridState.skip ?? 0,
            total: total,
          }}
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