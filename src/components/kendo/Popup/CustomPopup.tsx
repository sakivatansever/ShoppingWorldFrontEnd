import { Popup, PopupProps } from "@progress/kendo-react-popup";
import { Button } from "@progress/kendo-react-buttons";
import "./CustomPopup.css";
import { SvgIcon } from "@progress/kendo-react-common";
import { xCircleIcon } from "@progress/kendo-svg-icons"; // Kendo'nun "X" ikonunu import ettik

function CustomPopup(
  fieldRenderProps: PopupProps & {
    title: String;
    isHidden?: boolean;
    width?: string;
    onClose?: () => void;
    onSave?: () => void;
  }
) {
  const {
    title,
    isHidden = false,
    onClose,
    onSave,
    width = "80vw",
    ...others
  } = fieldRenderProps;

  return (
    <>
      {/* Arka Plan Overlay */}
      {fieldRenderProps.show && <div className="popup-overlay"></div>}

      <Popup
        {...others}
        animate={true}
        popupClass={"custom-popup"}
        style={{ width: width }}
      >
        <div className="popup-container">
          {/* Header */}
          <div className="popup-header">
            <h3 style={{ margin: 0 }}>{title}</h3>
            <button className="popup-close-btn" onClick={onClose}>
              <SvgIcon icon={xCircleIcon} size="medium" />
            </button>
          </div>

          {/* Body */}
          <div className="popup-body">{fieldRenderProps.children}</div>

          {/* Footer */}
          <div className="popup-footer" hidden={isHidden ?? false}>
            <Button onClick={onSave} themeColor={"primary"}>
              Kaydet
            </Button>
            <Button onClick={onClose} themeColor={"dark"}>
              Çıkış
            </Button>
          </div>
        </div>
      </Popup>
    </>
  );
}

export default CustomPopup;