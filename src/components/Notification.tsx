import React, { JSX, useEffect, useRef } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { BsCheck2Circle, BsXCircle, BsXLg, BsInfoCircle } from "react-icons/bs";
import { NotificationProps } from "./type";
import "Notification.css";

const iconStyles: React.CSSProperties = {
  marginRight: "10px",
  fontSize: "1.2rem",
};

const icons: Record<string, JSX.Element> = {
  success: <BsCheck2Circle style={iconStyles} />,
  info: <BsInfoCircle style={iconStyles} />,
  warning: <IoWarningOutline style={iconStyles} />,
  error: <BsXCircle style={iconStyles} />,
};

const animations: Record<string, string> = {
  fade: "fadeIn",
  pop: "popUp",
  slide: "slideIn",
};

const Notification: React.FC<NotificationProps> = ({
  type = "info",
  message,
  onClose,
  animation = "slide",
}) => {
  // A11y
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (notificationRef.current) {
      notificationRef.current.focus();
    }
  }, []);

  const ariaRole = type === "error" || type == "warning" ? "alert" : "status";
  const ariaLive =
    type === "error" || type === "warning" ? "assertive" : "polite";
  // A11y
  return (
    <div
      className={`notification ${type} ${animations[animation]}`}
      // A11y
      role={ariaRole}
      aria-live={ariaLive}
      tabIndex={-1}
      ref={notificationRef}
      // A11y
    >
      {/* icon for the toast */}
      {icons[type]}
      {/* message for the toast */}
      {message}
      {/* Close Button */}
      <button className="closeBtn" onClick={() => onClose()}>
        <BsXLg color="white" />
      </button>
    </div>
  );
};

Notification.propTypes = {};

export default Notification;
