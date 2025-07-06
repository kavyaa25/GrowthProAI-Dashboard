# GrowthProAI Dashboard

🚀 **AI-powered business insights and SEO headline generator for local businesses**

A modern, responsive web application that generates personalized business dashboards with AI-driven insights, SEO headlines, and analytics previews.

## ✨ Features

### 🎯 Core Functionality
- **Business Dashboard Generation**: Create personalized dashboards for any business
- **SEO Headline Generation**: Generate 50+ unique, SEO-optimized headlines
- **Real-time Analytics**: View business metrics and growth trends
- **AI-Powered Insights**: Get personalized recommendations based on business data

### 🎨 User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Loading Animations**: Beautiful loading spinners and transitions
- **Form Validation**: Real-time validation with helpful error messages
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation

### 📊 Analytics & Insights
- **Key Metrics**: Rating, reviews, response rate, response time
- **Growth Trends**: Weekly and monthly growth indicators
- **Competitor Comparison**: See how you stack up against competitors
- **Business Insights**: AI-generated insights based on performance
- **AI Growth Tips**: Personalized recommendations for improvement

### 🔗 Advanced Features
- **Shareable Links**: Generate and share dashboard URLs
- **Connection Status**: Real-time backend connectivity indicator
- **Error Handling**: Comprehensive error messages and retry functionality
- **Progressive Web App**: Installable on mobile devices
- **Offline Support**: Works offline with cached content

### 🛠️ Technical Features
- **Modern Stack**: React 18, Vite, Tailwind CSS
- **State Management**: React Context for theme management
- **HTTP Client**: Axios with timeout and error handling
- **Backend API**: Express.js with CORS and validation
- **PWA Ready**: Service worker and manifest for mobile experience

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm 8+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GrowthProAI
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3002

### Manual Setup

#### Backend Setup
```bash
cd backend
npm install
npm run dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```
GrowthProAI/
├── backend/
│   ├── index.js          # Express server with API endpoints
│   ├── package.json      # Backend dependencies
│   └── vercel.json       # Deployment configuration
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── context/      # React context providers
│   │   ├── App.jsx       # Main application component
│   │   └── main.jsx      # Application entry point
│   ├── public/           # Static assets and PWA files
│   ├── package.json      # Frontend dependencies
│   └── vite.config.js    # Vite configuration
├── package.json          # Root package.json with scripts
├── README.md            # This file
└── SETUP.md             # Detailed setup guide
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `frontend` directory:
```env
VITE_BACKEND_URL=http://localhost:3002
```

### Backend Configuration

The backend runs on port 3002 by default. You can change this by setting the `PORT` environment variable.

## 📡 API Endpoints

### Health Check
- **GET** `/health` - Check backend status

### Business Data
- **POST** `/business-data` - Generate business dashboard data
  - Body: `{ "name": "Business Name", "location": "City, State" }`
  - Returns: Business metrics, insights, and SEO headline

### Headline Generation
- **GET** `/regenerate-headline` - Generate new SEO headline
  - Query: `?name=Business Name&location=City, State`
  - Returns: New SEO headline

## 🎨 Components

### Form Component
- Real-time validation
- Accessibility features
- Loading states
- Error handling

### DashboardCard Component
- Business metrics display
- Analytics overview
- AI insights section
- Action buttons (download, share)

### LoadingSpinner Component
- Multiple sizes (sm, md, lg, xl)
- Animated dots
- Customizable text
- Theme-aware styling

### ErrorDisplay Component
- Modal error display
- Retry functionality
- Detailed error messages
- Theme-aware styling

### ConnectionStatus Component
- Real-time backend status
- Auto-refresh every 30 seconds
- Visual indicators
- Timestamp display

## 🌟 Unique Features

### AI-Powered Insights
- Personalized recommendations based on business performance
- Dynamic tips based on rating and review count
- Industry-specific suggestions

### Analytics Preview
- Weekly and monthly growth indicators
- Competitor comparison
- Trend analysis
- Response rate and time metrics

### Shareable Links
- Generate shareable URLs for dashboards
- URL parameters for business name and location
- One-click copy to clipboard

### Progressive Web App
- Installable on mobile devices
- Offline functionality
- App-like experience
- Service worker caching

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variable: `VITE_BACKEND_URL=https://your-backend-url.com`
3. Deploy automatically on push

### Backend (Vercel)
1. Deploy the backend directory to Vercel
2. Set environment variables if needed
3. Update frontend backend URL

### Alternative Deployment
- **Frontend**: Netlify, GitHub Pages, or any static hosting
- **Backend**: Railway, Render, or any Node.js hosting

## 🧪 Testing

### Manual Testing
1. Test form validation with various inputs
2. Verify error handling with backend offline
3. Test responsive design on different screen sizes
4. Check PWA installation on mobile devices

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Built with React, Vite, and Tailwind CSS
- Icons from emoji and Unicode characters
- PWA features for mobile experience
- Modern web development best practices

## 📞 Support

For issues and questions:
1. Check the troubleshooting section in SETUP.md
2. Review the console for error messages
3. Ensure both frontend and backend are running
4. Verify environment variables are set correctly

---

**Made with ❤️ for local businesses**