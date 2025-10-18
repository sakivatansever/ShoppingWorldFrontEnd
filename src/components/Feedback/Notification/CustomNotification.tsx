import React, { useEffect } from "react";
import {
  Notification,
  NotificationGroup,
} from "@progress/kendo-react-notification";
import { Fade } from "@progress/kendo-react-animation";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { hideNotification } from "../../../store/notification/notificationSlice";

const CustomNotification = () => {
  const {
    show,
    type,
    message,
    position,
    showIcon,
    animation,
    autoHideAfter,
    closable,
  } = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (show && autoHideAfter) {
      const timer = setTimeout(
        () => dispatch(hideNotification()),
        autoHideAfter
      );
      return () => clearTimeout(timer);
    }
  }, [show, autoHideAfter, dispatch]);
  const getPositionStyle = () => {
    const style: React.CSSProperties = {
      position: "fixed",
      zIndex: 10013,
      maxWidth: "90vw",
    };
    if (position.horizontal === "left") style.left = "20px";
    if (position.horizontal === "right") style.right = "20px";
    if (position.horizontal === "center") {
      style.left = "50%";
      style.transform = "translateX(-50%)";
    }
    if (position.vertical === "bottom") style.bottom = "20px";
    // if (position.vertical === "top") style.top = "20px";
    return style;
  };

  const AnimationWrapper = animation === "fade" ? Fade : React.Fragment;

  return (
    show && (
      <NotificationGroup style={getPositionStyle()}>
        <AnimationWrapper>
          <div
            style={{
              maxWidth: "15vw",
              overflowWrap: "break-word",
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            <Notification
              type={{
                style: type,
                icon: showIcon,
              }}
              closable={closable}
              onClose={() => dispatch(hideNotification())}
              style={{
                padding: "10px",
                fontSize: "1rem",
                borderRadius: "10px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                backgroundColor: undefined,
              }}
            >
              {message}
            </Notification>
          </div>
        </AnimationWrapper>
      </NotificationGroup>
    )
  );
};
export default CustomNotification;
