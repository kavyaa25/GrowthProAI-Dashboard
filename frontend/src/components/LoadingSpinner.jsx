import { useTheme } from "../context/ThemeContext";

export default function LoadingSpinner({ size = "md", text = "Loading..." }) {
  const { isDark } = useTheme();
  
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div 
          className={`${sizeClasses[size]} border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin`}
          role="status"
          aria-label="Loading"
        />
        <div 
          className={`${sizeClasses[size]} border-2 border-transparent border-t-blue-300 rounded-full animate-spin absolute inset-0`}
          style={{ animationDelay: '-0.5s' }}
        />
      </div>
      {text && (
        <div className="text-center">
          <span className={`text-sm font-medium ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}>
            {text}
          </span>
          <div className="flex space-x-1 mt-2 justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}
    </div>
  );
} 