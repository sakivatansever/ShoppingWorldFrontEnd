import React from "react";

interface Props {
  imageUrl: string | null;
  show: boolean;
  onClose: () => void;
}
const ImagePreviewModal: React.FC<Props> = ({ imageUrl, show, onClose }) => {
  if (!show || !imageUrl) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          position: "relative",
          display: "inline-block",
        }}
      >
        <img
          src={imageUrl}
          style={{
            maxWidth: "100%",
            maxHeight: "60vh",
            borderRadius: "8px",
          }}
        />
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "black",
            border: "none",
            color: "white",
            fontSize: "25px",
            cursor: "pointer",
            zIndex: 1010,
            borderRadius: "50%",
            width: "28px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: "0",
            padding: "0",
            boxShadow: "0 0 4px rgba(0,0,0,0.3)",
          }}
        >
          &times;
        </button>

      </div>
    </div>
  );
};

export default ImagePreviewModal;