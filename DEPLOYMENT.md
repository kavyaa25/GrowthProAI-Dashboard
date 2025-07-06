# 🚀 Vercel Deployment Guide

## Prerequisites

1. **GitHub Account**: Your code should be in a GitHub repository
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Node.js**: Version 16+ installed locally for testing

## Step 1: Prepare Your Repository

### 1.1 Push to GitHub
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit - GrowthProAI Dashboard"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/GrowthProAI.git
git push -u origin main
```

### 1.2 Repository Structure
Ensure your repository has this structure:
```
GrowthProAI/
├── backend/
│   ├── index.js
│   ├── package.json
│   └── vercel.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json
├── package.json
└── README.md
```

## Step 2: Deploy Backend to Vercel

### 2.1 Deploy Backend
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Node.js
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

### 2.2 Backend Environment Variables
Add these environment variables in Vercel:
- `NODE_ENV`: `production`
- `PORT`: `3002` (optional, Vercel will set this)

### 2.3 Deploy
Click **"Deploy"** and wait for the build to complete.

### 2.4 Get Backend URL
After deployment, copy the URL (e.g., `https://your-backend.vercel.app`)

## Step 3: Deploy Frontend to Vercel

### 3.1 Deploy Frontend
1. Go back to Vercel dashboard
2. Click **"New Project"** again
3. Import the same GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3.2 Frontend Environment Variables
Add this environment variable:
- `VITE_BACKEND_URL`: `https://your-backend.vercel.app` (use your backend URL from step 2.4)

### 3.3 Deploy
Click **"Deploy"** and wait for the build to complete.

## Step 4: Configure Custom Domains (Optional)

### 4.1 Add Custom Domain
1. Go to your project settings in Vercel
2. Navigate to **"Domains"**
3. Add your custom domain (e.g., `growthproai.com`)
4. Follow DNS configuration instructions

### 4.2 Update Environment Variables
Update `VITE_BACKEND_URL` to use your custom domain if needed.

## Step 5: Verify Deployment

### 5.1 Test Backend
Visit your backend URL + `/health`:
```
https://your-backend.vercel.app/health
```
Should return: `{"status":"healthy","timestamp":"...","version":"1.0.0"}`

### 5.2 Test Frontend
Visit your frontend URL and test:
- Form submission
- Dashboard generation
- Headline regeneration
- Theme switching
- Share functionality

### 5.3 Test PWA Features
- Open in mobile browser
- Check if "Add to Home Screen" appears
- Test offline functionality

## Step 6: Monitor and Optimize

### 6.1 Vercel Analytics
- Enable Vercel Analytics in project settings
- Monitor performance and user behavior

### 6.2 Environment Variables
Update environment variables as needed:
```bash
# Backend
NODE_ENV=production

# Frontend
VITE_BACKEND_URL=https://your-backend.vercel.app
```

## Troubleshooting

### Common Issues

#### 1. Build Failures
**Problem**: Build fails during deployment
**Solution**: 
- Check `package.json` for correct scripts
- Ensure all dependencies are listed
- Check for syntax errors in code

#### 2. CORS Errors
**Problem**: Frontend can't connect to backend
**Solution**:
- Verify `VITE_BACKEND_URL` is correct
- Check backend CORS configuration
- Ensure backend is deployed and accessible

#### 3. Environment Variables
**Problem**: Environment variables not working
**Solution**:
- Redeploy after adding environment variables
- Check variable names (case-sensitive)
- Verify in Vercel dashboard

#### 4. PWA Not Working
**Problem**: PWA features not available
**Solution**:
- Check `manifest.json` and `sw.js` files
- Verify HTTPS is enabled
- Test on mobile device

### Debug Commands

#### Check Backend Health
```bash
curl https://your-backend.vercel.app/health
```

#### Test API Endpoints
```bash
# Test business data endpoint
curl -X POST https://your-backend.vercel.app/business-data \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Business","location":"Test City"}'
```

## Production Checklist

- ✅ Backend deployed and accessible
- ✅ Frontend deployed and connected to backend
- ✅ Environment variables configured
- ✅ Custom domain set up (optional)
- ✅ PWA features working
- ✅ All functionality tested
- ✅ Performance optimized
- ✅ Error handling working
- ✅ Analytics enabled (optional)

## URLs After Deployment

- **Frontend**: `https://your-frontend.vercel.app`
- **Backend**: `https://your-backend.vercel.app`
- **Health Check**: `https://your-backend.vercel.app/health`

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test endpoints individually
4. Check browser console for errors
5. Review this deployment guide

## Next Steps

After successful deployment:
1. Share your live application URL
2. Monitor performance and usage
3. Set up custom domain if needed
4. Configure analytics and monitoring
5. Plan for scaling and updates

---

**🎉 Congratulations! Your GrowthProAI application is now live on Vercel!** 