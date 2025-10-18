import { Link } from "react-router-dom";
// Kendo varsa aç; yoksa yorum satırında kalsın
// import { Button } from "@progress/kendo-react-buttons";
import "../../style/forbiddenInline.css";

export default function ForbiddenInline() {
  return (
    <div className="forbidden">
      <div className="forbidden__card">
        <div className="forbidden__iconWrap">
          <svg
            className="forbidden__icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M17 8V7a5 5 0 10-10 0v1H5a1 1 0 00-1 1v11a1 1 0 001 1h14a1 1 0 001-1V9a1 1 0 00-1-1h-2zm-8 0V7a3 3 0 116 0v1H9zm3 5a2 2 0 11.001 4.001A2 2 0 0112 13z" />
          </svg>
        </div>

        <h1 className="forbidden__title">403 • Yetkiniz yok</h1>
        <p className="forbidden__text">
          Bu içeriği görüntülemek için gerekli izne sahip değilsiniz.
        </p>

        <div className="forbidden__actions">
          <Link className="btn" to="/">
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    </div>
  );
}
