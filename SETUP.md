# GrowthProAI Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm run install-all
   ```

2. **Start Development Servers**
   ```bash
   npm run dev
   ```

This will start both the backend (port 3002) and frontend (port 5173) servers.

## Manual Setup

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

The backend will run on `http://localhost:3002`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## Environment Variables

Create a `.env` file in the `frontend` directory:
```env
VITE_BACKEND_URL=http://localhost:3002
```

## Troubleshooting

### "Failed to fetch business data" Error

1. **Check if backend is running**
   - Open `http://localhost:3002/health` in your browser
   - Should return: `{"status":"healthy","timestamp":"...","version":"1.0.0"}`

2. **Check backend logs**
   - Look for any error messages in the terminal where backend is running

3. **Verify ports**
   - Backend should be on port 3002
   - Frontend should be on port 5173

4. **Check CORS**
   - Backend has CORS enabled for all origins
   - If issues persist, check browser console for CORS errors

### Common Issues

- **Port already in use**: Kill the process using the port or change the port in `backend/index.js`
- **Node version**: Ensure you're using Node.js 16 or higher
- **Network issues**: Check firewall settings and ensure localhost is accessible

## API Endpoints

- `GET /health` - Health check
- `POST /business-data` - Generate business dashboard data
- `GET /regenerate-headline` - Regenerate SEO headline

## Development

- Backend: Express.js with CORS enabled
- Frontend: React with Vite, Tailwind CSS
- State Management: React Context for theme
- HTTP Client: Axios with timeout and error handling 