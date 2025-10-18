import { useState } from "react";
import { GridFilterCellProps } from "@progress/kendo-react-grid";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";

export interface EnumOption {
  value: number | string | boolean | null;
  text: string;
}

interface GenericEnumFilterCellProps extends GridFilterCellProps {
  options: EnumOption[];
  placeholder?: string;
  hasInteracted?: boolean; // dışarıdan alınan prop
  onInteract?: () => void; // etkileşim başladığında tetiklenmesi için
}

const filterOperators = [
  { text: "Eşittir", operator: "eq" },
  { text: "Eşit Değil", operator: "neq" },
];

const GridEnumFilterCellTemplate: React.FC<GenericEnumFilterCellProps> = (
  props
) => {
  const {
    options,
    value,
    onChange,
    operator = "eq",
    placeholder = "Seçiniz...",
    hasInteracted = false,
    onInteract,
  } = props;

  const [selectedOperator, setSelectedOperator] = useState(() => {
    return hasInteracted
      ? filterOperators.find((o) => o.operator === operator) ||
          filterOperators[0]
      : filterOperators[0];
  });

  const displayValue = hasInteracted ? value : null;

  const selectedItem = options.find((x) => x.value === displayValue) || {
    text: placeholder,
    value: null,
  };

  const handleValueChange = (event: any) => {
    if (onInteract) onInteract();

    const selectedValue = event.value?.value ?? null;
    const isClearing = selectedValue === null;

    onChange({
      value: selectedValue,
      operator: isClearing ? "" : selectedOperator.operator,
      syntheticEvent: event.syntheticEvent,
    });
  };

  const handleOperatorChange = (event: any) => {
    const newOperator = event.value;
    setSelectedOperator(newOperator);
  };

  const handleClear = () => {
    if (onInteract) onInteract();

    onChange({
      value: null,
      operator: "",
      syntheticEvent: {} as React.SyntheticEvent<any>,
    });
  };
  return (
    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
      <DropDownList
        style={{ width: "110px" }}
        data={filterOperators}
        textField="text"
        dataItemKey="operator"
        value={selectedOperator}
        onChange={handleOperatorChange}
      />

      {/* DropDown + Clear Button container */}
      <div style={{ position: "relative", flex: 1 }}>
        <DropDownList
          style={{ width: "100%" }}
          data={options}
          textField="text"
          dataItemKey="value"
          value={selectedItem}
          onChange={handleValueChange}
          defaultItem={{ text: placeholder, value: null }}
        />

        {selectedItem.value !== null && (
          <Button
            fillMode="flat"
            size="small"
            icon="x"
            title="Filtreyi temizle"
            onClick={handleClear}
            style={{
              position: "absolute",
              right: "25px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              padding: "0",
              height: "24px",
              width: "24px",
              minWidth: "unset",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default GridEnumFilterCellTemplate;