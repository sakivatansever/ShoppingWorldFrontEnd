import React, { useRef } from "react";
import {
  DropDownList,
  DropDownListProps,
} from "@progress/kendo-react-dropdowns";
import {
  CompositeFilterDescriptor,
  FilterDescriptor,
  State,
} from "@progress/kendo-data-query";
import { Error, Hint } from "@progress/kendo-react-labels";

interface PageFilterDropdownProps extends DropDownListProps {
  label?: string;
  hint?: string;
  error?: string;
  touched?: boolean;
  id?: string;
  wrapperStyle?: React.CSSProperties;
  hintStyle?: React.CSSProperties;

  gridState: State;
  setGridState: React.Dispatch<React.SetStateAction<State>>;
  total: number;
  filterValueName?: string;
  defaultItemName: string;
  searchFilterFields: string[];
  itemTemplate?: (dataItem: any) => React.ReactNode;
}

export const PageFilterDropdown = ({
  label,
  hint,
  error,
  touched,
  id,
  valid,
  disabled,
  wrapperStyle,
  hintStyle,
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
  searchFilterFields,
  defaultItem,
  itemTemplate,
  ...others
}: PageFilterDropdownProps) => {
  const editorRef = React.useRef<any>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  if (!value || value?.id == "") {
    defaultItem = {
      name: defaultItemName,
      id: null,
    };
  } else {
    defaultItem = {
      name: value?.name,
      id: value?.id,
    };
  }
  const filterChange = (event: any) => {
    const newValue = event.filter?.value?.trim?.();
    if (!searchFilterFields || !Array.isArray(searchFilterFields)) return;

    // Mevcut timeout varsa temizle
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Yeni debounce başlat (1 saniye sonra çalışacak)
    debounceTimeout.current = setTimeout(() => {
      setGridState((prevState: any) => {
        const existingFilter = prevState.filter as CompositeFilterDescriptor;

        // searchFilterFields'a ait olan filtreleri temizle
        const cleanedFilters: (FilterDescriptor | CompositeFilterDescriptor)[] =
          existingFilter?.filters?.length
            ? (
                existingFilter.filters as (
                  | FilterDescriptor
                  | CompositeFilterDescriptor
                )[]
              ).filter(
                (f) =>
                  !(
                    typeof f === "object" &&
                    "logic" in f &&
                    (f.filters as FilterDescriptor[]).every(
                      (sub) =>
                        typeof sub.field === "string" &&
                        searchFilterFields.includes(sub.field)
                    )
                  )
              )
            : [];

        // Yeni değer varsa filtre grubuna ekle
        if (newValue) {
          const newFilterGroup: CompositeFilterDescriptor = {
            logic: "or",
            filters: searchFilterFields.map((field) => ({
              field,
              operator: "contains",
              value: newValue,
            })),
          };
          cleanedFilters.push(newFilterGroup);
        }

        const updatedFilter: CompositeFilterDescriptor | null =
          cleanedFilters.length > 0
            ? { logic: "and", filters: cleanedFilters }
            : null;

        return {
          ...prevState,
          skip: 0,
          filter: updatedFilter,
        };
      });
    }, 1000); // 1 saniye debounce
  };
  const handlePageChange = (event: any) => {
    setGridState((prevState: any) => ({
      ...prevState,
      skip: event.page.skip,
    }));
  };

  const showValidationMessage: string | false | null =
    touched && error ? error : null;
  const showHint: boolean = !showValidationMessage && !!hint;

  const hintId: string = showHint ? `${id}_hint` : "";
  const errorId: string = showValidationMessage ? `${id}_error` : "";
  const labelId: string = label ? `${id}_label` : "";
  const matchedValue =
    typeof value === "object"
      ? data?.find((item) => item?.[dataItemKey] === value?.[dataItemKey])
      : data?.find((item) => item?.[dataItemKey] === value);

  return (
    <div style={wrapperStyle}>
      {/* {label && (
        <Label
          id={labelId}j
          editorRef={editorRef}
          editorId={id}
          editorValid={valid}
          editorDisabled={disabled}
        >
          {label}
        </Label>
      )} */}
      <div className="k-form-field-wrap">
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
          onChange={onChange}
          onOpen={onOpen}
          itemRender={
            itemTemplate
              ? (li, itemProps) => {
                  const item = itemProps.dataItem;
                  return React.cloneElement(
                    li,
                    li.props,
                    <div className="k-list-item-content">
                      {itemTemplate(item)}
                    </div>
                  );
                }
              : undefined
          }
          virtual={{
            total: total,
            pageSize: gridState.take ?? 25,
            skip: gridState.skip ?? 0,
          }}
          onPageChange={handlePageChange}
          {...others}
        />
        {showHint && (
          <Hint id={hintId} style={hintStyle}>
            {hint}
          </Hint>
        )}
        {showValidationMessage && <Error id={errorId}>{error}</Error>}
      </div>
    </div>
  );
};
