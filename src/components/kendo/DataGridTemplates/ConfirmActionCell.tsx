import * as React from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";

interface ConfirmActionCellProps {
  dataItem: any;
  onConfirm: (item: any) => void;
  confirmTitle?: string;
  confirmMessage?: string;
  confirmText?: string;
  cancelText?: string;
  buttonLabel?: string;
  buttonThemeColor?: "primary" | "secondary" | "tertiary" | "error";
}

export const ConfirmActionCell: React.FC<ConfirmActionCellProps> = ({
  dataItem,
  onConfirm,
  confirmTitle = "Onay",
  confirmMessage = "Bu işlemi gerçekleştirmek istediğinize emin misiniz?",
  confirmText = "Onayla",
  cancelText = "Vazgeç",
  buttonLabel = "İşlem",
  buttonThemeColor = "primary",
}) => {
  const [visible, setVisible] = React.useState(false);

  const handleConfirm = () => {
    onConfirm(dataItem);
    setVisible(false);
  };

  const toggleDialog = () => setVisible(!visible);

  return (
    <td className="k-command-cell">
      <Button themeColor={buttonThemeColor} onClick={toggleDialog}>
        {buttonLabel}
      </Button>

      {visible && (
        <Dialog title={confirmTitle} onClose={toggleDialog} width={400}>
          <div style={{ paddingBottom: "1rem" }}>
            {confirmMessage}
          </div>
          <DialogActionsBar>
            <Button themeColor="primary" onClick={handleConfirm}>
              {confirmText}
            </Button>
            <Button onClick={toggleDialog}>{cancelText}</Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </td>
  );
};
