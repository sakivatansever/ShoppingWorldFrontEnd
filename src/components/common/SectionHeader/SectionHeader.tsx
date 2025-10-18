import React from "react";

export interface SectionHeaderProps {
  icon?: React.ReactNode;
  title: string;
  open: boolean;
  onToggle: () => void;
  right?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const SectionHeader: React.FC<SectionHeaderProps> = React.memo(
  ({ icon, title, open, onToggle, right, className, style }) => {
    return (
      <div
        className={className}
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          gap: 8,
          ...(style || {}),
        }}
      >
        <span style={{ fontSize: 16, display: "inline-flex", alignItems: "center" }}>
          {icon}
        </span>

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          style={{
            textAlign: "left",
            border: "none",
            background: "transparent",
            padding: "6px 0",
            cursor: "pointer",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          {title}
          <span style={{ marginLeft: 8, opacity: 0.6 }}>
            {open ? "▾" : "▸"}
          </span>
        </button>

        <div>{right}</div>
      </div>
    );
  }
);

SectionHeader.displayName = "SectionHeader";
export default SectionHeader;
