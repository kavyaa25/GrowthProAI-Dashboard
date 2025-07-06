# 🚀 Vercel Deployment Checklist

## Pre-Deployment Checklist

### ✅ Repository Setup
- [ ] Code pushed to GitHub repository
- [ ] All files committed and up to date
- [ ] Repository is public or Vercel has access

### ✅ Backend Files
- [ ] `backend/index.js` - Main server file
- [ ] `backend/package.json` - Dependencies and scripts
- [ ] `backend/vercel.json` - Vercel configuration
- [ ] All dependencies listed in package.json

### ✅ Frontend Files
- [ ] `frontend/src/App.jsx` - Main React component
- [ ] `frontend/package.json` - Dependencies and scripts
- [ ] `frontend/vercel.json` - Vercel configuration
- [ ] `frontend/public/manifest.json` - PWA manifest
- [ ] `frontend/public/sw.js` - Service worker

## Backend Deployment

### ✅ Vercel Configuration
- [ ] Framework Preset: **Node.js**
- [ ] Root Directory: **backend**
- [ ] Build Command: **npm install**
- [ ] Output Directory: **Leave empty**
- [ ] Install Command: **npm install**

### ✅ Environment Variables
- [ ] `NODE_ENV`: `production`
- [ ] `PORT`: `3002` (optional)

### ✅ After Backend Deployment
- [ ] Copy backend URL (e.g., `https://your-backend.vercel.app`)
- [ ] Test health endpoint: `https://your-backend.vercel.app/health`
- [ ] Should return: `{"status":"healthy","timestamp":"...","version":"1.0.0"}`

## Frontend Deployment

### ✅ Vercel Configuration
- [ ] Framework Preset: **Vite**
- [ ] Root Directory: **frontend**
- [ ] Build Command: **npm run build**
- [ ] Output Directory: **dist**
- [ ] Install Command: **npm install**

### ✅ Environment Variables
- [ ] `VITE_BACKEND_URL`: `https://your-backend.vercel.app` (use your backend URL)

### ✅ After Frontend Deployment
- [ ] Copy frontend URL (e.g., `https://your-frontend.vercel.app`)
- [ ] Test all functionality:
  - [ ] Form submission
  - [ ] Dashboard generation
  - [ ] Headline regeneration
  - [ ] Theme switching
  - [ ] Share functionality

## Testing Checklist

### ✅ Functionality Tests
- [ ] Business name and location input works
- [ ] Dashboard generates with AI insights
- [ ] Headline regeneration works
- [ ] Dark/light theme toggle works
- [ ] Share link generation works
- [ ] Download report works
- [ ] Error handling works (test with invalid input)
- [ ] Loading states display correctly

### ✅ PWA Tests
- [ ] Open in mobile browser
- [ ] "Add to Home Screen" option appears
- [ ] App installs correctly
- [ ] Offline functionality works (basic)

### ✅ Performance Tests
- [ ] Page loads quickly (< 3 seconds)
- [ ] Animations are smooth
- [ ] No console errors
- [ ] Responsive on mobile devices

## Post-Deployment

### ✅ URLs to Save
- **Frontend**: `https://your-frontend.vercel.app`
- **Backend**: `https://your-backend.vercel.app`
- **Health Check**: `https://your-backend.vercel.app/health`

### ✅ Optional Enhancements
- [ ] Add custom domain
- [ ] Enable Vercel Analytics
- [ ] Set up monitoring
- [ ] Configure error tracking

## Troubleshooting

### ❌ Common Issues
- **Build fails**: Check package.json scripts and dependencies
- **CORS errors**: Verify VITE_BACKEND_URL is correct
- **Environment variables not working**: Redeploy after adding them
- **PWA not working**: Check manifest.json and HTTPS

### 🔧 Debug Commands
```bash
# Test backend health
curl https://your-backend.vercel.app/health

# Test API endpoint
curl -X POST https://your-backend.vercel.app/business-data \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","location":"Test"}'
```

---

**🎉 If all items are checked, your GrowthProAI application is successfully deployed!** 