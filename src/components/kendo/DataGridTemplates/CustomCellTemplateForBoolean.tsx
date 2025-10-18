import { GridCustomCellProps } from "@progress/kendo-react-grid";

interface CustomCellProps extends GridCustomCellProps {
  trueMessage: string;
  falseMessage: string;
}

const CustomCellTemplateForBoolean = (props: CustomCellProps) => {
  const value = props.dataItem[props.field || ""];

  return (
    <td {...props.tdProps}>
      <div >
        {value ? (
          <span>{props.trueMessage}</span>
        ) : (
          <span>{props.falseMessage}</span>
        )}
      </div>
    </td>
  );
};

export default CustomCellTemplateForBoolean;