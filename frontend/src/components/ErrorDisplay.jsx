import { useTheme } from "../context/ThemeContext";

export default function ErrorDisplay({ error, onRetry, onClose }) {
  const { isDark } = useTheme();

  if (!error) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4`}>
      <div className={`max-w-md w-full p-6 rounded-xl shadow-2xl ${
        isDark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
      }`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-lg">⚠️</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg font-semibold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
              Connection Error
            </h3>
            <p className={`text-sm mb-4 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}>
              {error}
            </p>
            <div className="flex space-x-3">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition"
                >
                  Try Again
                </button>
              )}
              <button
                onClick={onClose}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition ${
                  isDark 
                    ? "bg-gray-700 hover:bg-gray-600 text-white" 
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 