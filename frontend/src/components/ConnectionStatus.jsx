import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";

export default function ConnectionStatus({ backendUrl }) {
  const { isDark } = useTheme();
  const [status, setStatus] = useState("checking"); // "checking", "connected", "disconnected"
  const [lastCheck, setLastCheck] = useState(null);

  const checkConnection = async () => {
    try {
      const res = await axios.get(`${backendUrl}/health`, { 
        timeout: 3000,
        headers: { 'Cache-Control': 'no-cache' }
      });
      
      if (res.data.status === 'healthy') {
        setStatus("connected");
        setLastCheck(new Date());
      } else {
        setStatus("disconnected");
      }
    } catch (err) {
      console.log('Connection check failed:', err.message);
      setStatus("disconnected");
    }
  };

  useEffect(() => {
    checkConnection();
    
    // Check connection every 2 minutes (less frequent)
    const interval = setInterval(checkConnection, 120000);
    
    return () => clearInterval(interval);
  }, [backendUrl]);

  if (status === "checking") {
    return (
      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
        isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"
      }`}>
        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-1 animate-pulse"></div>
        Checking connection...
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
      status === "connected" 
        ? (isDark ? "bg-green-900/50 text-green-300" : "bg-green-100/50 text-green-700")
        : status === "checking"
        ? (isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600")
        : (isDark ? "bg-red-900 text-red-300" : "bg-red-100 text-red-700")
    }`}>
      <div className={`w-2 h-2 rounded-full mr-1 ${
        status === "connected" ? "bg-green-400" : status === "checking" ? "bg-yellow-400" : "bg-red-400"
      }`}></div>
      {status === "connected" ? "Connected" : status === "checking" ? "Checking..." : "Disconnected"}
    </div>
  );
} 