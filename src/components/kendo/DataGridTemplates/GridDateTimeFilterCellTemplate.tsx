import React, { useState } from "react";
import {
  DateInput,
  DateTimePicker,
  DateTimePickerChangeEvent,
  DateInputProps,
} from "@progress/kendo-react-dateinputs";
import { GridFilterCellProps } from "@progress/kendo-react-grid";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { toIstanbulISOString } from "../../../guard/kendo/dateConvert";

const parseKendoDateTime = (value: string): Date => {
  const cleaned = value.replace("datetime'", "").replace("'", "");
  const [datePart, timePart] = cleaned.split("T");
  const normalized = `${datePart}T${timePart.replace(/-/g, ":")}`;
  return new Date(normalized);
};

const operators = [
  { text: "Sonra veya eşittir", operator: "gte" },
  { text: "Sonra", operator: "gt" },
  { text: "Önce", operator: "lt" },
  { text: "Daha önce veya eşittir", operator: "lte" },
];

const GridDateTimeFilterCellTemplate: React.FC<GridFilterCellProps> = (props) => {
  const { value, operator, onChange } = props;

  const [selectedOperator, setSelectedOperator] = useState(
    operators.find((o) => o.operator === operator) || null
  );

  const [dateValue, setDateValue] = useState<Date | null>(() => {
    if (!value) return null;
    if (typeof value === "string") return parseKendoDateTime(value);
    return value;
  });

  const handleDateChange = (event: DateTimePickerChangeEvent) => {
    const newDate = event.value;
    setDateValue(newDate);

    if (newDate) {
      const activeOperator = selectedOperator?.operator || "gte";
      onChange?.({
        value: toIstanbulISOString(newDate),
        operator: activeOperator,
        syntheticEvent: event.syntheticEvent || ({} as any),
      });
    }
  };

  const handleOperatorChange = (event: any) => {
    setSelectedOperator(event.value);
  };

  const handleClear = () => {
    setDateValue(null);
    setSelectedOperator(null);
    onChange?.({
      value: null,
      operator: "",
      syntheticEvent: {} as any,
    });
  };

  const renderCustomDateInput = (inputProps: DateInputProps) => (
  <div className="k-input k-input-md k-rounded-md k-input-solid k-input-bordered" style={{ position: "relative", width: "100%" }}>
      <DateInput
        {...inputProps}
      />
      {dateValue && (
        <button
          onClick={handleClear}
          title="Temizle"
          type="button"
          style={{
            position: "absolute",
            right: "10px", 
            top: "50%",
            transform: "translateY(-50%)",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "20px",
            lineHeight: "1",
            color: "#999",
            padding: 0,
            zIndex: 2,
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          ×
        </button>
      )}
    </div>
  );

return (
  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
    <DropDownList
      data={operators}
      textField="text"
      dataItemKey="operator"
      value={selectedOperator || null}
      onChange={handleOperatorChange}
      defaultItem={{ text: "Filtreleme Tipi Seçiniz...", operator: "" }}
      style={{ width: "160px" }}
    />
    <div style={{ flex: 1 }}>
      <DateTimePicker
        value={dateValue}
        onChange={handleDateChange}
        dateInput={renderCustomDateInput}
        format="dd.MM.yyyy HH:mm"
        disabled={!selectedOperator}
      />
    </div>
  </div>
);
};

export default GridDateTimeFilterCellTemplate;