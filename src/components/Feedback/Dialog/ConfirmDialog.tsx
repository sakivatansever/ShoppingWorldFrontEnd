import React from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";

interface ConfirmDialogProps {
  show: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  show,
  title = "Onay",
  message = "Bu işlemi gerçekleştirmek istediğinize emin misiniz?",
  confirmText = "Evet",
  cancelText = "İptal",
  onConfirm,
  onCancel,
}) => {
  if (!show) return null;

  const CustomTitleBar = () => {
    return (
      <div
        className="custom-title"
        style={{ fontSize: "22px", lineHeight: "1.3em",fontWeight:"bold" }}
      >
        {title}
      </div>
    );
  };

  return (
    <Dialog title={<CustomTitleBar />} onClose={onCancel} closeIcon={false}>
      <h2 style={{ margin: "10px 0",fontWeight:"normal" }}>{message}</h2>
      <DialogActionsBar>
        <Button themeColor="primary" onClick={onConfirm}>
          {confirmText}
        </Button>
        <Button fillMode="outline" onClick={onCancel}>
          {cancelText}
        </Button>
      </DialogActionsBar>
    </Dialog>
  );
};

export default ConfirmDialog;
