import React from "react";
import { GridCellProps } from "@progress/kendo-react-grid";
import { EnumOption } from "./GridEnumFilterCellTemplate";

interface GenericEnumCellTemplateProps extends GridCellProps {
  options: EnumOption[];
}
const GridEnumCellTemplate: React.FC<GenericEnumCellTemplateProps> = ({
  dataItem,
  field,
  options
}) => {
  const key = dataItem[field || ""] as number;
  const item = options.find((x) => x.value === key);
  return <td>{item?.text ?? ""}</td>;
};

export default GridEnumCellTemplate;