import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import Form from "./components/Form";
import DashboardCard from "./components/DashboardCard";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorDisplay from "./components/ErrorDisplay";
import ConnectionStatus from "./components/ConnectionStatus";
import Notification from "./components/Notification";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function AppContent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [businessInfo, setBusinessInfo] = useState({ name: "", location: "" });
  const { isDark, toggleTheme } = useTheme();

  const backendUrl = useMemo(() => {
    // For production (Vercel), use relative API routes
    if (import.meta.env.PROD) {
      return '/api';
    }
    // For development, use the environment variable or default
    return import.meta.env.VITE_BACKEND_URL || 'http://localhost:3002';
  }, []);

  // Handle URL parameters for shareable links
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const businessName = urlParams.get("business");
    const location = urlParams.get("location");
    
    if (businessName && location) {
      setBusinessInfo({ name: businessName, location });
      handleSubmit({ name: businessName, location });
    }
  }, []);

  const handleSubmit = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    setBusinessInfo(formData);
    
    try {
      console.log('Attempting to connect to:', `${backendUrl}/business-data`);
      const res = await axios.post(`${backendUrl}/business-data`, formData, {
        timeout: 10000, // 10 second timeout
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (res.data.success) {
        setData(res.data.data);
        setNotification({
          message: "Dashboard generated successfully!",
          type: "success"
        });
      } else {
        throw new Error(res.data.message || 'Failed to fetch data');
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      
      let errorMessage = "Failed to fetch business data. Please try again.";
      
      if (err.code === 'ECONNREFUSED') {
        errorMessage = `Cannot connect to backend server. Please ensure the backend is running on ${backendUrl}`;
      } else if (err.code === 'ERR_NETWORK') {
        errorMessage = `Network error. Please check your internet connection and ensure the backend is running on ${backendUrl}`;
      } else if (err.code === 'ECONNABORTED') {
        errorMessage = "Request timed out. Please try again.";
      } else if (err.response?.status === 404) {
        errorMessage = "Backend endpoint not found. Please check the server configuration.";
      } else if (err.response?.status === 429) {
        errorMessage = "Too many requests. Please wait a moment and try again.";
      } else if (err.response?.status === 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      
      setError(errorMessage);
    }
    setLoading(false);
  }, [backendUrl]);

  const handleRegenerateHeadline = useCallback(async () => {
    try {
      console.log('Attempting to regenerate headline from:', `${backendUrl}/regenerate-headline`);
      const res = await axios.get(`${backendUrl}/regenerate-headline`, {
        params: businessInfo,
        timeout: 10000
      });
      if (res.data.success) {
        setData((prev) => ({ ...prev, headline: res.data.headline }));
        setNotification({
          message: "Headline regenerated successfully!",
          type: "success"
        });
      } else {
        throw new Error(res.data.message || 'Failed to regenerate headline');
      }
    } catch (err) {
      console.error("Error regenerating headline:", err);
      
      let errorMessage = "Failed to regenerate headline. Please try again.";
      
      if (err.code === 'ECONNREFUSED') {
        errorMessage = `Cannot connect to backend server. Please ensure the backend is running on ${backendUrl}`;
      } else if (err.code === 'ERR_NETWORK') {
        errorMessage = `Network error. Please check your internet connection and ensure the backend is running on ${backendUrl}`;
      } else if (err.code === 'ECONNABORTED') {
        errorMessage = "Request timed out. Please try again.";
      } else if (err.response?.status === 404) {
        errorMessage = "Backend endpoint not found. Please check the server configuration.";
      } else if (err.response?.status === 429) {
        errorMessage = "Too many requests. Please wait a moment and try again.";
      } else if (err.response?.status === 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      
      setError(errorMessage);
    }
  }, [backendUrl, businessInfo]);

  const handleRetry = useCallback(() => {
    if (data) {
      handleRegenerateHeadline();
    } else {
      handleSubmit(businessInfo);
    }
  }, [data, handleRegenerateHeadline, handleSubmit, businessInfo]);

  const handleCloseError = useCallback(() => {
    setError(null);
  }, []);

  const handleCloseNotification = useCallback(() => {
    setNotification(null);
  }, []);

  // Health check function to test backend connectivity
  const checkBackendHealth = useCallback(async () => {
    try {
      const res = await axios.get(`${backendUrl}/health`, { timeout: 5000 });
      console.log('Backend health check successful:', res.data);
      return true;
    } catch (err) {
      console.log('Backend health check failed:', err.message);
      return false;
    }
  }, [backendUrl]);

  // Check backend health on component mount
  useEffect(() => {
    checkBackendHealth();
  }, [checkBackendHealth]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white" 
        : "bg-gradient-to-br from-blue-100 to-purple-100"
    }`}>
      <ErrorDisplay 
        error={error} 
        onRetry={handleRetry} 
        onClose={handleCloseError} 
      />
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className={`text-4xl font-bold ${
              isDark ? "text-white" : "text-gray-800"
            }`}>
              GrowthProAI Dashboard
            </h1>
            <div className="flex items-center space-x-3">
              <ConnectionStatus backendUrl={backendUrl} />
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition ${
                  isDark 
                    ? "bg-gray-700 hover:bg-gray-600 text-yellow-300" 
                    : "bg-white hover:bg-gray-100 text-gray-700"
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? "☀️" : "🌙"}
              </button>
            </div>
          </div>
          <p className={`text-lg ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}>
            Generate AI-powered business insights and SEO headlines
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          <div className={`${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white"
          } w-full p-8 rounded-2xl shadow-xl border`}>
            
            {!data && !loading && (
              <Form onSubmit={handleSubmit} loading={loading} />
            )}

            {loading && (
              <div className="text-center py-12">
                <LoadingSpinner size="lg" text="Generating your business dashboard..." />
              </div>
            )}

            {data && !loading && (
              <>
                <DashboardCard 
                  data={data} 
                  onRegenerateHeadline={handleRegenerateHeadline}
                  businessInfo={businessInfo}
                />
                
                {/* Back to Form Button */}
                <button
                  onClick={() => {
                    setData(null);
                    setBusinessInfo({ name: "", location: "" });
                  }}
                  className={`mt-6 w-full py-3 px-4 rounded-lg font-medium transition ${
                    isDark 
                      ? "bg-gray-700 hover:bg-gray-600 text-white" 
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                >
                  🔄 Generate New Dashboard
                </button>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className={`text-center mt-12 ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}>
          <p>Built with ❤️ for local businesses</p>
          <p className="text-sm mt-2">
            <a 
              href="https://github.com/vivek-inavalli/GrowthProAI" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline"
            >
              View on GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
