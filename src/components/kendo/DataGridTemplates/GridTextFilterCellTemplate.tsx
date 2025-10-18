import React, { useEffect, useRef, useState } from "react";
import { Input, InputChangeEvent } from "@progress/kendo-react-inputs";
import { GridFilterCellProps } from "@progress/kendo-react-grid";

const GridTextFilterCellTemplate: React.FC<GridFilterCellProps> = (props) => {
  const { value, operator = "contains", onChange } = props;
  const [inputValue, setInputValue] = useState(value ?? "");
  const debounceRef = useRef<any>(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const trimmed = inputValue?.trim?.();

      if (trimmed !== value) {
        switch (props.filterType) {
          case "boolean":
            return onChange({
              value: Boolean(trimmed),
              operator: "eq",
              syntheticEvent: {} as React.SyntheticEvent,
            });
          case "numeric":
            if (trimmed != null && trimmed !== "") {
              return onChange?.({
                value: Number(trimmed),
                operator: "eq",
                syntheticEvent: {} as React.SyntheticEvent,
              });
            } else {
              break;
            }
          default:
            return onChange({
              value: trimmed,
              operator,
              syntheticEvent: {} as React.SyntheticEvent,
            });
        }
      }
    }, 1000);

    return () => {
      clearTimeout(debounceRef.current);
    };
  }, [inputValue]);

  const handleInputChange = (event: InputChangeEvent) => {
    setInputValue(event.value ?? "");
  };

  return (
    <Input
      type={props.filterType == "numeric" ? "number" : "text"}
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Filtrele..."
    />
  );
};

export default GridTextFilterCellTemplate;