import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useTheme } from "../context/ThemeContext";

export default function DashboardCard({ data, onRegenerateHeadline, businessInfo }) {
  const { isDark } = useTheme();
  const [headlineLoading, setHeadlineLoading] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const handleRegenerateHeadline = async () => {
    setHeadlineLoading(true);
    await onRegenerateHeadline();
    setHeadlineLoading(false);
  };

  const generateAITips = (rating, reviews) => {
    const tips = [];
    
    if (rating < 4.0) {
      tips.push("Consider implementing customer feedback surveys to identify improvement areas");
    }
    
    if (reviews < 100) {
      tips.push("Encourage satisfied customers to leave reviews to build social proof");
    }
    
    if (rating >= 4.5) {
      tips.push("Leverage your high rating in marketing materials and social media");
    }
    
    tips.push("Consider running local Google Ads to increase visibility");
    tips.push("Optimize your Google My Business profile for better local SEO");
    
    return tips.slice(0, 3); // Return top 3 tips
  };

  const analytics = {
    weeklyGrowth: data.weeklyGrowth || Math.floor(Math.random() * 20 + 5),
    monthlyGrowth: data.monthlyGrowth || Math.floor(Math.random() * 50 + 15),
    competitorComparison: data.competitorComparison || (parseFloat(data.rating) > 4.0 ? "Above Average" : "Average"),
    trend: data.trend || (parseFloat(data.rating) > 4.2 ? "↗️ Growing" : "→ Stable")
  };
  const aiTips = generateAITips(data.rating, data.reviews);

  return (
    <div className="mt-8 space-y-6">
      {/* Main Dashboard Card */}
      <div className={`p-6 rounded-2xl shadow-lg border ${
        isDark 
          ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700" 
          : "bg-gradient-to-br from-white to-gray-50 border-gray-100"
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-2xl font-bold ${
            isDark ? "text-white" : "text-gray-800"
          }`}>Business Dashboard</h2>
          <div className={`text-sm ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}>
            {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">⭐ {data.rating}</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="bg-green-50 p-4 rounded-xl">
            <div className="text-2xl font-bold text-green-600">📣 {data.reviews}</div>
            <div className="text-sm text-gray-600">Total Reviews</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl">
            <div className="text-2xl font-bold text-purple-600">💬 {data.responseRate}%</div>
            <div className="text-sm text-gray-600">Response Rate</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-xl">
            <div className="text-2xl font-bold text-orange-600">⏱️ {data.avgResponseTime}h</div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
          </div>
        </div>

        {/* SEO Headline */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">SEO Headline</h3>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            {headlineLoading ? (
              <LoadingSpinner text="Generating headline..." />
            ) : (
              <p className="italic text-gray-700 text-lg leading-relaxed">
                {data.headline}
              </p>
            )}
          </div>
          <button
            onClick={handleRegenerateHeadline}
            disabled={headlineLoading}
            className={`mt-3 w-full py-2 px-4 rounded-lg font-medium text-white transition ${
              headlineLoading
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {headlineLoading ? "Regenerating..." : "🔄 Regenerate Headline"}
          </button>
        </div>

        {/* Analytics Preview */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Analytics Overview</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="text-sm text-purple-600 font-medium">Weekly Growth</div>
              <div className="text-lg font-bold text-purple-700">+{analytics.weeklyGrowth}%</div>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="text-sm text-orange-600 font-medium">Monthly Growth</div>
              <div className="text-lg font-bold text-orange-700">+{analytics.monthlyGrowth}%</div>
            </div>
            <div className="bg-indigo-50 p-3 rounded-lg">
              <div className="text-sm text-indigo-600 font-medium">vs Competitors</div>
              <div className="text-lg font-bold text-indigo-700">{analytics.competitorComparison}</div>
            </div>
            <div className="bg-teal-50 p-3 rounded-lg">
              <div className="text-sm text-teal-600 font-medium">Trend</div>
              <div className="text-lg font-bold text-teal-700">{analytics.trend}</div>
            </div>
          </div>
        </div>

        {/* Business Insights Section */}
        {data.insights && data.insights.length > 0 && (
          <div className="border-t border-gray-200 pt-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">📊 Business Insights</h3>
            <div className="space-y-2">
              {data.insights.map((insight, index) => (
                <div key={index} className="bg-indigo-50 p-3 rounded-lg">
                  <p className="text-sm text-indigo-800">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Tips Section */}
        <div className="border-t border-gray-200 pt-4">
          <button
            onClick={() => setShowTips(!showTips)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <span>🤖 AI Growth Tips</span>
            <span className="text-lg">{showTips ? "▼" : "▶"}</span>
          </button>
          
          {showTips && (
            <div className="mt-3 space-y-2">
              {aiTips.map((tip, index) => (
                <div key={index} className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">{tip}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={() => window.print()}
          className="flex-1 py-3 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition"
        >
          📄 Download Report
        </button>
        <button
          onClick={() => {
            const shareUrl = `${window.location.origin}?business=${encodeURIComponent(businessInfo.name)}&location=${encodeURIComponent(businessInfo.location)}`;
            navigator.clipboard.writeText(shareUrl);
            alert("Shareable link copied to clipboard!");
          }}
          className="flex-1 py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition"
        >
          🔗 Share Dashboard
        </button>
      </div>
    </div>
  );
} 