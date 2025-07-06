// backend/server.js
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const app = express();
const PORT = process.env.PORT || 3002;

// Optimized rate limiting with better memory management
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 15; // Increased to 15 requests per minute for better UX

const rateLimitMiddleware = (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  
  if (!requestCounts.has(clientIP)) {
    requestCounts.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  } else {
    const clientData = requestCounts.get(clientIP);
    if (now > clientData.resetTime) {
      clientData.count = 1;
      clientData.resetTime = now + RATE_LIMIT_WINDOW;
    } else {
      clientData.count++;
    }
    
    if (clientData.count > RATE_LIMIT_MAX) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil((clientData.resetTime - now) / 1000)
      });
    }
  }
  
  next();
};

// Optimized cleanup with better performance
setInterval(() => {
  const now = Date.now();
  const expiredIPs = [];
  
  for (const [ip, data] of requestCounts.entries()) {
    if (now > data.resetTime) {
      expiredIPs.push(ip);
    }
  }
  
  expiredIPs.forEach(ip => requestCounts.delete(ip));
}, RATE_LIMIT_WINDOW);

// Security and performance middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for development
  crossOriginEmbedderPolicy: false
}));
app.use(compression());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : true,
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(rateLimitMiddleware);

const HEADLINE_TEMPLATES = [
  // Local Business Focus
  "Why {name} is {location}'s Sweetest Spot in 2025",
  "Discover What Makes {name} Stand Out in {location}",
  "{name}: The Hidden Gem of {location}",
  "Here's Why Locals Love {name} in {location}",
  "Experience {location} Through the Eyes of {name}",
  "{name} Is Redefining Quality in {location}",
  "The Secret Behind {name}'s Success in {location}",
  "Why Everyone in {location} Is Talking About {name}",
  "{name}: Where Tradition Meets Innovation in {location}",
  "Top 5 Reasons {name} Dominates the Market in {location}",
  "{name} Is the Talk of the Town in {location} – Here's Why",
  "How {name} Became a Household Name in {location}",
  "{name} Is Setting New Standards in {location}",
  "{name} Brings the Best of Local Flavor to {location}",
  "A Day in {location} Isn't Complete Without Visiting {name}",
  "Why Locals in {location} Swear by {name}",
  "Explore the Unique Charm of {name} in {location}",
  "Uncover the Magic of {name} in the Heart of {location}",
  "{name} Has What {location} Has Been Waiting For",
  "See Why {name} Is Rated #1 in {location}",
  "What Makes {name} a Must-Visit Spot in {location}",
  "Get to Know the Excellence of {name} in {location}",
  "{name} Delivers a One-of-a-Kind Experience in {location}",
  "{name}: The Pride and Passion of {location}",
  "Why {location} Locals Keep Coming Back to {name}",
  "Step Into the World of {name} — A {location} Favorite",
  
  // SEO Optimized Headlines
  "Best {name} in {location} - 2025 Customer Reviews & Ratings",
  "{location}'s Top-Rated {name} - What Customers Are Saying",
  "Find the Perfect {name} Experience in {location}",
  "Why Choose {name}? {location} Residents Share Their Stories",
  "{name} Reviews: {location}'s Most Trusted Business",
  "Compare {name} with Other {location} Businesses",
  "{location} Business Spotlight: {name} Success Story",
  "Customer Satisfaction at {name} - {location} Feedback",
  "Local Business Excellence: {name} in {location}",
  "What Sets {name} Apart in {location}?",
  
  // Industry-Specific Variations
  "Restaurant Review: {name} Serves {location}'s Best",
  "Service Excellence: {name} Leads {location} Quality",
  "Retail Spotlight: {name} - {location}'s Shopping Destination",
  "Professional Services: {name} Trusted by {location}",
  "Healthcare Focus: {name} Cares for {location}",
  "Education & Training: {name} Empowers {location}",
  "Technology Solutions: {name} Innovates in {location}",
  "Real Estate: {name} Connects {location} Communities",
  "Automotive: {name} Drives {location} Forward",
  "Fitness & Wellness: {name} Energizes {location}",
  
  // Seasonal & Trending
  "2025 Update: {name} Continues to Impress in {location}",
  "New Year, Same Excellence: {name} in {location}",
  "Spring Forward with {name} - {location}'s Choice",
  "Summer Success: {name} Heats Up {location}",
  "Fall Favorites: {name} Autumn Specials in {location}",
  "Winter Warmth: {name} Brings Comfort to {location}",
  
  // Community Focus
  "Supporting Local: {name} Strengthens {location}",
  "Community Cornerstone: {name} in {location}",
  "Neighborhood Favorite: {name} Serves {location}",
  "Local Pride: {name} Represents {location} Excellence",
  "Building {location} Together: {name}'s Commitment",
  "From {location}, For {location}: {name}'s Mission",
  
  // New Enhanced Headlines
  "🚀 {name} - {location}'s Fastest Growing Business in 2025",
  "💎 Premium Quality at {name}: {location}'s Finest Choice",
  "🏆 Award-Winning {name} Leads {location} Excellence",
  "🌟 Customer-First Approach: {name} in {location}",
  "📈 Growth Story: How {name} Transformed {location}",
  "🎯 Precision & Quality: {name} Sets {location} Standards",
  "🔥 Hot Trend: {name} is {location}'s New Favorite",
  "💡 Innovation Hub: {name} Drives {location} Forward",
  "🤝 Trusted Partner: {name} Serves {location} Community",
  "⭐ 5-Star Experience: {name} Exceeds {location} Expectations",
  "🎉 Celebrating Success: {name} in {location}",
  "🔝 Top Choice: {name} Dominates {location} Market",
  "💪 Strength & Reliability: {name} in {location}",
  "🎨 Creative Excellence: {name} Inspires {location}",
  "⚡ Fast & Efficient: {name} Delivers in {location}",
  "🌱 Sustainable Growth: {name} Builds {location} Future",
  "🎪 Entertainment Hub: {name} Brings Joy to {location}",
  "🏛️ Heritage & Modernity: {name} Bridges {location} Past & Future",
  "🎓 Expert Knowledge: {name} Educates {location}",
  "💼 Professional Excellence: {name} Serves {location} Business Community"
];

function generateHeadline(name, location) {
  const template = HEADLINE_TEMPLATES[Math.floor(Math.random() * HEADLINE_TEMPLATES.length)];
  return template.replace(/{name}/g, name).replace(/{location}/g, location);
}

function generateBusinessData(name, location) {
  // Optimized data generation with better randomization
  const baseRating = Math.random() * 1.5 + 3.5;
  const baseReviews = Math.floor(Math.random() * 500 + 25);
  const responseRate = Math.floor(Math.random() * 30 + 70); // 70-100%
  const avgResponseTime = Math.floor(Math.random() * 12 + 2); // 2-14 hours
  
  // Pre-defined insights for better performance
  const insightsMap = {
    high: ["Excellent customer satisfaction", "High engagement with reviews", "Strong brand reputation"],
    medium: ["Good customer satisfaction", "Active review management", "Consistent service quality"],
    low: ["Room for improvement in customer service", "Consider implementing feedback systems", "Focus on customer experience"]
  };
  
  let insightCategory;
  if (baseRating >= 4.5) insightCategory = 'high';
  else if (baseRating >= 4.0) insightCategory = 'medium';
  else insightCategory = 'low';
  
  // Select 2 random insights from the appropriate category
  const availableInsights = insightsMap[insightCategory];
  const insights = [];
  const shuffled = [...availableInsights].sort(() => 0.5 - Math.random());
  insights.push(...shuffled.slice(0, 2));
  
  return {
    rating: baseRating.toFixed(1),
    reviews: baseReviews,
    responseRate: responseRate,
    avgResponseTime: avgResponseTime,
    headline: generateHeadline(name, location),
    lastUpdated: new Date().toISOString(),
    businessName: name,
    location: location,
    insights: insights,
    // Generate trend data with better logic
    weeklyGrowth: Math.floor(Math.random() * 25 + 5),
    monthlyGrowth: Math.floor(Math.random() * 60 + 15),
    competitorComparison: baseRating > 4.0 ? "Above Average" : "Average",
    trend: baseRating > 4.2 ? "↗️ Growing" : "→ Stable"
  };
}

// Validation middleware
const validateBusinessData = (req, res, next) => {
  const { name, location } = req.body;
  
  if (!name || !name.trim()) {
    return res.status(400).json({
      error: 'Validation error',
      message: 'Business name is required',
      field: 'name'
    });
  }
  
  if (!location || !location.trim()) {
    return res.status(400).json({
      error: 'Validation error', 
      message: 'Location is required',
      field: 'location'
    });
  }
  
  if (name.trim().length < 2) {
    return res.status(400).json({
      error: 'Validation error',
      message: 'Business name must be at least 2 characters long',
      field: 'name'
    });
  }
  
  if (name.trim().length > 100) {
    return res.status(400).json({
      error: 'Validation error',
      message: 'Business name must be less than 100 characters long',
      field: 'name'
    });
  }
  
  if (location.trim().length < 2) {
    return res.status(400).json({
      error: 'Validation error',
      message: 'Location must be at least 2 characters long', 
      field: 'location'
    });
  }
  
  if (location.trim().length > 100) {
    return res.status(400).json({
      error: 'Validation error',
      message: 'Location must be less than 100 characters long',
      field: 'location'
    });
  }
  
  // Check for potentially harmful content
  const harmfulPatterns = /[<>{}]/;
  if (harmfulPatterns.test(name) || harmfulPatterns.test(location)) {
    return res.status(400).json({
      error: 'Validation error',
      message: 'Input contains invalid characters',
      field: 'input'
    });
  }
  
  next();
};

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'GrowthProAI Backend API',
    version: '1.0.0',
    endpoints: {
      'POST /business-data': 'Generate business dashboard data',
      'GET /regenerate-headline': 'Regenerate SEO headline',
      'GET /health': 'Health check'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.post('/business-data', validateBusinessData, (req, res) => {
  try {
    const { name, location } = req.body;
    const response = generateBusinessData(name, location);
    
    res.json({
      success: true,
      data: response,
      message: 'Business data generated successfully'
    });
  } catch (error) {
    console.error('Error generating business data:', error);
    res.status(500).json({
      error: 'Data generation error',
      message: 'Failed to generate business data. Please try again.'
    });
  }
});

app.get('/regenerate-headline', (req, res) => {
  try {
    const { name, location } = req.query;
    
    if (!name || !location) {
      return res.status(400).json({
        error: 'Missing parameters',
        message: 'Both name and location parameters are required'
      });
    }
    
    const headline = generateHeadline(name, location);
    
    res.json({
      success: true,
      headline,
      message: 'Headline regenerated successfully'
    });
  } catch (error) {
    console.error('Error regenerating headline:', error);
    res.status(500).json({
      error: 'Headline generation error',
      message: 'Failed to regenerate headline. Please try again.'
    });
  }
});

// 404 handler - catch all unmatched routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: 'The requested endpoint does not exist',
    availableEndpoints: ['POST /business-data', 'GET /regenerate-headline', 'GET /health']
  });
});

// Error handling middleware - MUST be last
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong on our end. Please try again.',
    timestamp: new Date().toISOString()
  });
});

// Start server with proper error handling
function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`🚀 GrowthProAI Backend running at http://localhost:${port}`);
    console.log(`📊 Health check: http://localhost:${port}/health`);
    console.log(`⏰ Started at: ${new Date().toISOString()}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️  Port ${port} is busy, trying port ${port + 1}`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(PORT);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
