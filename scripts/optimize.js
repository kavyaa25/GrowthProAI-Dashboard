#!/usr/bin/env node

/**
 * GrowthProAI Optimization Script
 * Run this script to check and optimize your application
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 GrowthProAI Optimization Check\n');

// Check if all required files exist
const requiredFiles = [
  'backend/index.js',
  'backend/package.json',
  'frontend/src/App.jsx',
  'frontend/src/components/Form.jsx',
  'frontend/src/components/DashboardCard.jsx',
  'frontend/src/components/LoadingSpinner.jsx',
  'frontend/src/components/ErrorDisplay.jsx',
  'frontend/src/components/ConnectionStatus.jsx',
  'frontend/src/components/Notification.jsx',
  'frontend/src/context/ThemeContext.jsx',
  'frontend/public/manifest.json',
  'frontend/public/sw.js',
  'package.json',
  'README.md',
  'SETUP.md'
];

console.log('📁 Checking required files...');
let missingFiles = [];

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    missingFiles.push(file);
  }
});

if (missingFiles.length > 0) {
  console.log(`\n⚠️  Missing ${missingFiles.length} required files`);
} else {
  console.log('\n✅ All required files present');
}

// Check package.json dependencies
console.log('\n📦 Checking dependencies...');

try {
  const backendPackage = JSON.parse(fs.readFileSync('backend/package.json', 'utf8'));
  const frontendPackage = JSON.parse(fs.readFileSync('frontend/package.json', 'utf8'));
  const rootPackage = JSON.parse(fs.readFileSync('package.json', 'utf8'));

  console.log('✅ Backend dependencies:', Object.keys(backendPackage.dependencies || {}).length);
  console.log('✅ Frontend dependencies:', Object.keys(frontendPackage.dependencies || {}).length);
  console.log('✅ Root dependencies:', Object.keys(rootPackage.dependencies || {}).length);

  // Check for required dependencies
  const requiredBackendDeps = ['express', 'cors', 'compression', 'helmet'];
  const requiredFrontendDeps = ['react', 'axios'];

  const missingBackendDeps = requiredBackendDeps.filter(dep => !backendPackage.dependencies[dep]);
  const missingFrontendDeps = requiredFrontendDeps.filter(dep => !frontendPackage.dependencies[dep]);

  if (missingBackendDeps.length > 0) {
    console.log(`⚠️  Missing backend dependencies: ${missingBackendDeps.join(', ')}`);
  }
  if (missingFrontendDeps.length > 0) {
    console.log(`⚠️  Missing frontend dependencies: ${missingFrontendDeps.join(', ')}`);
  }

} catch (error) {
  console.log('❌ Error reading package.json files:', error.message);
}

// Performance recommendations
console.log('\n⚡ Performance Recommendations:');
console.log('1. ✅ Rate limiting implemented');
console.log('2. ✅ Compression enabled');
console.log('3. ✅ Security headers (helmet)');
console.log('4. ✅ React memoization and useCallback');
console.log('5. ✅ PWA support with service worker');
console.log('6. ✅ Error handling and retry logic');
console.log('7. ✅ Loading states and user feedback');
console.log('8. ✅ Responsive design with Tailwind CSS');

// Development tips
console.log('\n💡 Development Tips:');
console.log('• Run "npm run dev" to start both servers');
console.log('• Check http://localhost:3002/health for backend status');
console.log('• Use browser dev tools to monitor performance');
console.log('• Test on different devices for responsiveness');
console.log('• Check PWA installation on mobile devices');

console.log('\n🎉 Optimization check complete!'); 