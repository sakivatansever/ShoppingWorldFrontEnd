import Lottie from "lottie-react";
import notFound from "../../../assets/lottieFiles/notFound.json";
import empty from "../../../assets/lottieFiles/empty.json";
import loading from "../../../assets/lottieFiles/loading.json";
import error from "../../../assets/lottieFiles/error.json";
import success from "../../../assets/lottieFiles/success.json";

const lottieFilesMap = {
  notFound,
  empty,
  loading,
  error,
  success,
};

type LottieHandlerProps = {
  type: keyof typeof lottieFilesMap;
  message?: string;
  className?: string;
};
const LottieHandler = ({ type, message, className }: LottieHandlerProps) => {
  const lottie = lottieFilesMap[type];
  const messageStyle =
    type === "error"
      ? { fontSize: "19px", color: "red" }
      : { fontSize: "19px", marginTop: "30px", color: "#555" }; // gri ton

  return (
    <div
      className={`d-flex flex-column align-items-center justify-content-center ${className}`}
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#fff", // arka plan beyaz
      }}
    >
      <Lottie animationData={lottie} style={{ width: "500px", height: "500px" }} />
      {message && <h3 style={messageStyle}>{message}</h3>}
    </div>
  );
};

export default LottieHandler;
