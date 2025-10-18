import React from "react";
import { GridCellProps } from "@progress/kendo-react-grid";

const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};

const GridDateTimeCellTemplate: React.FC<GridCellProps> = (props) => {
  const fieldPath = props.field || "";
  const rawValue = getNestedValue(props.dataItem, fieldPath);

  let formatted = "";

  if (rawValue) {
    const date = rawValue instanceof Date ? rawValue : new Date(rawValue);

    if (!isNaN(date.getTime())) {
      formatted = date.toLocaleString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  }

  return <td className="k-text-center">{formatted}</td>;
};

export default GridDateTimeCellTemplate;