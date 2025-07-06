import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Notification({ message, type = "success", duration = 3000, onClose }) {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: isDark ? "bg-green-900" : "bg-green-100",
          text: isDark ? "text-green-300" : "text-green-800",
          border: isDark ? "border-green-700" : "border-green-200",
          icon: "✅"
        };
      case "error":
        return {
          bg: isDark ? "bg-red-900" : "bg-red-100",
          text: isDark ? "text-red-300" : "text-red-800",
          border: isDark ? "border-red-700" : "border-red-200",
          icon: "❌"
        };
      case "warning":
        return {
          bg: isDark ? "bg-yellow-900" : "bg-yellow-100",
          text: isDark ? "text-yellow-300" : "text-yellow-800",
          border: isDark ? "border-yellow-700" : "border-yellow-200",
          icon: "⚠️"
        };
      case "info":
        return {
          bg: isDark ? "bg-blue-900" : "bg-blue-100",
          text: isDark ? "text-blue-300" : "text-blue-800",
          border: isDark ? "border-blue-700" : "border-blue-200",
          icon: "ℹ️"
        };
      default:
        return {
          bg: isDark ? "bg-gray-900" : "bg-gray-100",
          text: isDark ? "text-gray-300" : "text-gray-800",
          border: isDark ? "border-gray-700" : "border-gray-200",
          icon: "💬"
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
      isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
    }`}>
      <div className={`max-w-sm p-4 rounded-lg border shadow-lg ${styles.bg} ${styles.border}`}>
        <div className="flex items-start space-x-3">
          <span className="text-lg">{styles.icon}</span>
          <div className="flex-1">
            <p className={`text-sm font-medium ${styles.text}`}>
              {message}
            </p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className={`text-lg hover:opacity-70 transition ${styles.text}`}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
} 