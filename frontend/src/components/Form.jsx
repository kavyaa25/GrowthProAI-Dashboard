import { useState, useCallback, memo } from "react";
import { useTheme } from "../context/ThemeContext";

const Form = memo(function Form({ onSubmit, loading }) {
  const { isDark } = useTheme();
  const [form, setForm] = useState({ name: "", location: "" });
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, [errors]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = "Business name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Business name must be at least 2 characters long";
    } else if (form.name.trim().length > 100) {
      newErrors.name = "Business name must be less than 100 characters";
    }
    
    if (!form.location.trim()) {
      newErrors.location = "Location is required";
    } else if (form.location.trim().length < 2) {
      newErrors.location = "Location must be at least 2 characters long";
    } else if (form.location.trim().length > 100) {
      newErrors.location = "Location must be less than 100 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(form);
    }
  }, [validateForm, onSubmit, form]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="business-name" className={`block text-sm font-medium mb-1 ${
          isDark ? "text-gray-200" : "text-gray-700"
        }`}>
          Business Name *
        </label>
        <input
          id="business-name"
          type="text"
          name="name"
          placeholder="Enter your business name"
          className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
            errors.name ? "border-red-500" : isDark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300"
          }`}
          onChange={handleChange}
          value={form.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">
            {errors.name}
          </p>
        )}
      </div>
      
      <div>
        <label htmlFor="business-location" className={`block text-sm font-medium mb-1 ${
          isDark ? "text-gray-200" : "text-gray-700"
        }`}>
          Location *
        </label>
        <input
          id="business-location"
          type="text"
          name="location"
          placeholder="Enter your business location"
          className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
            errors.location ? "border-red-500" : isDark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300"
          }`}
          onChange={handleChange}
          value={form.location}
          aria-describedby={errors.location ? "location-error" : undefined}
          aria-invalid={!!errors.location}
        />
        {errors.location && (
          <p id="location-error" className="mt-1 text-sm text-red-400" role="alert">
            {errors.location}
          </p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-xl font-semibold text-white transition ${
          loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
        aria-describedby={loading ? "loading-status" : undefined}
      >
        {loading ? "Loading..." : "Generate Dashboard"}
      </button>
      
      {loading && (
        <div id="loading-status" className="sr-only" role="status">
          Loading dashboard data
        </div>
      )}
    </form>
  );
});

export default Form; 