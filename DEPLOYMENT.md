# Deployment Guide

This guide covers how to deploy the Task Management Application to various platforms.

---

## 📋 Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Build Process](#build-process)
3. [Platform Deployment](#platform-deployment)
   - [Netlify](#netlify)
   - [Vercel](#vercel)
   - [AWS Amplify](#aws-amplify)
   - [Heroku](#heroku)
   - [DigitalOcean](#digitalocean)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment](#post-deployment)
6. [Troubleshooting](#troubleshooting)

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All tests pass locally
  ```bash
  pnpm test
  ```

- [ ] Build succeeds without errors
  ```bash
  pnpm build
  ```

- [ ] No TypeScript errors
  ```bash
  pnpm typecheck
  ```

- [ ] Code is formatted
  ```bash
  pnpm format.fix
  ```

- [ ] All changes are committed
  ```bash
  git status  # Should be clean
  ```

- [ ] Branch is up to date
  ```bash
  git pull origin main
  ```

- [ ] Environment variables are configured
  - Check `.env.example` for required variables
  - Create `.env.production` with production values

- [ ] Version is bumped (if applicable)
  ```json
  // package.json
  "version": "1.0.0"
  ```

---

## 🔨 Build Process

### Local Build

```bash
# Install dependencies
pnpm install

# Run build
pnpm build

# Verify build output
ls -la dist/spa/
ls -la dist/server/
```

### Build Output Structure

```
dist/
├── spa/                    # Client bundle (static files)
│   ├── index.html         # Main HTML file
│   ├── assets/
│   │   ├── index-*.css    # Minified CSS
│   │   ├── index-*.js     # Minified JavaScript
│   │   └── *.svg          # Icons/assets
│   └── favicon.ico        # Favicon
└── server/                 # Server bundle (optional for SSR)
    └── node-build.mjs     # Node.js entry point
```

### Build Optimization

The build includes:
- ✅ TypeScript compilation and type checking
- ✅ CSS minification and purging
- ✅ JavaScript minification and tree-shaking
- ✅ Source maps (optional, can be disabled)
- ✅ Asset optimization
- ✅ Code splitting for routes

---

## 🚀 Platform Deployment

### Netlify

#### Using Netlify CLI

**1. Install Netlify CLI**
```bash
pnpm install -g netlify-cli
```

**2. Authenticate**
```bash
netlify login
```

**3. Deploy**
```bash
# First deployment (creates site)
netlify deploy --prod

# OR for staging
netlify deploy
```

#### Using Netlify Configuration File

The repository includes `netlify.toml`:

```toml
[build]
  command = "pnpm run build"
  publish = "dist/spa"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Connected Git Deployment

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect on Netlify Dashboard**
   - Visit netlify.com
   - Click "New site from Git"
   - Select GitHub
   - Choose your repository
   - Configure build settings:
     - Build command: `pnpm run build`
     - Publish directory: `dist/spa`

3. **Automatic Deployments**
   - Pushes to `main` auto-deploy to production
   - PRs get preview URLs
   - Rollbacks available in deployment history

#### Environment Variables (Netlify)

1. Go to Site Settings → Build & Deploy → Environment
2. Add variables:
   ```
   VITE_API_URL=https://api.example.com
   NODE_VERSION=18
   PNPM_VERSION=10
   ```

#### Performance Optimization

```toml
# In netlify.toml
[context.production.environment]
  NODE_ENV = "production"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

---

### Vercel

#### Using Vercel CLI

**1. Install Vercel CLI**
```bash
pnpm install -g vercel
```

**2. Deploy**
```bash
# Interactive deployment
vercel

# Deploy to production
vercel --prod
```

#### Connected Git Deployment

1. **Visit vercel.com** and sign in
2. **Import Project**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose your GitHub repository
3. **Configure**
   - Framework: "Other"
   - Build Command: `pnpm run build`
   - Output Directory: `dist/spa`
4. **Deploy**
   - Click "Deploy"
   - Automatic deployments on push to main

#### Vercel Configuration

Create `vercel.json`:
```json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist/spa",
  "env": {
    "NODE_VERSION": "18"
  },
  "regions": ["sfo1"],
  "functions": {
    "api/**/*.ts": {
      "maxDuration": 60,
      "memory": 3008
    }
  }
}
```

#### Environment Variables (Vercel)

1. Go to Settings → Environment Variables
2. Add variables for each environment:
   - Production: `VITE_API_URL=https://api.example.com`
   - Preview: `VITE_API_URL=https://staging-api.example.com`
   - Development: `VITE_API_URL=http://localhost:3000`

---

### AWS Amplify

**1. Connect GitHub Repository**
- Visit aws.amazon.com/amplify
- Click "Create app"
- Choose "Host web app"
- Select GitHub and authorize
- Choose your repository and branch

**2. Build Settings**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install -g pnpm
        - pnpm install
    build:
      commands:
        - pnpm run build
  artifacts:
    baseDirectory: dist/spa
    files:
      - '**/*'
  cache:
    paths:
      - 'node_modules/**/*'
```

**3. Environment Variables**
- Go to App settings → Environment variables
- Add `VITE_API_URL` for your API endpoint

**4. Custom Domain**
- Domain Management → Add domain
- Update DNS records (detailed instructions provided)

---

### Heroku

**Note**: Heroku's free tier has been discontinued. Use Heroku paid plans or alternative platforms.

**1. Create Heroku App**
```bash
heroku login
heroku create your-app-name
```

**2. Add buildpack**
```bash
heroku buildpacks:add heroku/nodejs
```

**3. Set environment variables**
```bash
heroku config:set NODE_ENV=production
heroku config:set VITE_API_URL=https://your-api.com
```

**4. Deploy**
```bash
git push heroku main
```

**5. View logs**
```bash
heroku logs --tail
```

---

### DigitalOcean

**1. Create App via DigitalOcean App Platform**
- Visit cloud.digitalocean.com/apps
- Click "Create App"
- Choose "GitHub" as source
- Select your repository

**2. Configure Build**
- Name: `task-manager`
- Build command: `pnpm run build`
- Output directory: `dist/spa`
- HTTP port: `8080`

**3. Environment Variables**
```
VITE_API_URL=https://api.your-domain.com
NODE_VERSION=18
```

**4. Deploy**
- Click "Deploy"
- Automatic deployments on push to main

---

## 🔐 Environment Variables

### Production Environment Variables

Create `.env.production`:

```bash
# API Configuration
VITE_API_URL=https://api.yourdomain.com

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_LOGGING=true

# Sentry (Error Tracking)
VITE_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id

# Analytics
VITE_GA_ID=G-XXXXXXXXXX
```

### Environment Variable Types

**Vite Variables** (exposed to frontend):
- Must start with `VITE_`
- Available in browser code
- Example: `VITE_API_URL`

**Backend Variables** (Node.js only):
- No prefix restriction
- Hidden from browser
- Example: `DATABASE_URL`, `SECRET_KEY`

### Security Best Practices

- ✅ Never commit `.env` files
- ✅ Use platform-specific secret management
- ✅ Rotate secrets regularly
- ✅ Don't expose sensitive data
- ✅ Use different secrets for each environment

---

## 📊 Post-Deployment

### Verification Steps

1. **Test Live Site**
   ```bash
   # Visit your deployed URL
   https://your-app.com
   
   # Test functionality
   - Create a task
   - Update status
   - Delete task
   - Filter tasks
   ```

2. **Check Performance**
   - Use Google PageSpeed Insights
   - Test on mobile devices
   - Check Core Web Vitals
   - Monitor load times

3. **Monitor Logs**
   ```bash
   # Netlify
   netlify logs --tail
   
   # Vercel
   vercel logs
   
   # Heroku
   heroku logs --tail
   ```

4. **Set Up Monitoring**
   - Configure Sentry for error tracking
   - Set up Google Analytics
   - Monitor uptime

### Monitoring Setup

**Sentry (Error Tracking)**
```typescript
// In your entry point
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  tracesSampleRate: 0.1
})
```

**Google Analytics**
```typescript
// Track pageviews
import { useEffect } from "react"

export function useAnalytics() {
  useEffect(() => {
    if (window.gtag) {
      window.gtag("pageview")
    }
  }, [])
}
```

---

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      
      - name: Install
        run: pnpm install
      
      - name: Test
        run: pnpm test
      
      - name: Build
        run: pnpm build
      
      - name: Deploy
        run: netlify deploy --prod
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## 🔧 Troubleshooting

### Common Issues

#### Build Fails with "Cannot find module"

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules
pnpm install
pnpm build
```

#### 404 Errors on Page Refresh

**Solution**: Configure SPA routing redirect
- Netlify: Already configured in `netlify.toml`
- Vercel: Add `vercel.json` redirect
- Other: Configure web server to serve `index.html`

#### Environment Variables Not Found

**Solution**:
```bash
# Verify variable naming
# Must start with VITE_ for browser access

# Check in code
console.log(import.meta.env.VITE_API_URL)

# Rebuild after adding variables
pnpm build
```

#### Slow Performance

**Solution**:
- Check bundle size: `npm run build`
- Enable gzip compression
- Use CDN for static assets
- Optimize images
- Enable code splitting

#### CORS Errors

**Solution**:
- Configure backend CORS headers
- Use proxy in development
- Check API URL configuration

```typescript
// Verify API URL
console.log(import.meta.env.VITE_API_URL)
```

#### Out of Memory During Build

**Solution**:
```bash
# Increase Node memory
export NODE_OPTIONS=--max_old_space_size=4096
pnpm build
```

---

## 📈 Performance Monitoring

### Key Metrics to Monitor

1. **Page Load Time**
   - Target: < 3 seconds
   - Tools: Google PageSpeed, WebPageTest

2. **Time to Interactive**
   - Target: < 5 seconds
   - Measured: JavaScript execution time

3. **Core Web Vitals**
   - Largest Contentful Paint (LCP): < 2.5s
   - First Input Delay (FID): < 100ms
   - Cumulative Layout Shift (CLS): < 0.1

### Optimization Tips

```bash
# Analyze bundle
npm install -g webpack-bundle-analyzer
pnpm build --analyze

# Check for unused dependencies
npm ls --depth=0

# Monitor performance
pnpm build
# Check dist/ size
```

---

## 🔐 Security Checklist

Before production deployment:

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Environment variables secured
- [ ] Dependencies up to date
- [ ] No console secrets logged
- [ ] Rate limiting enabled
- [ ] Input validation in place
- [ ] Error handling doesn't expose internals
- [ ] Security scanning passed

---

## 📞 Deployment Support

### Getting Help

1. **Platform Documentation**
   - Netlify: https://docs.netlify.com
   - Vercel: https://vercel.com/docs
   - AWS: https://aws.amazon.com/amplify/

2. **Community Resources**
   - Stack Overflow
   - GitHub Discussions
   - Platform support forums

3. **Contact**
   - GitHub Issues
   - Email support (platform-specific)

---

## 📋 Deployment Checklist

```
Pre-Deployment
- [ ] Tests passing
- [ ] Build succeeds
- [ ] Code formatted
- [ ] No TypeScript errors
- [ ] Commit all changes
- [ ] Branch up to date

Platform Setup
- [ ] Platform account created
- [ ] Repository connected
- [ ] Environment variables set
- [ ] Build settings configured
- [ ] Domain configured (if custom)

Post-Deployment
- [ ] Site loads without errors
- [ ] Functionality tested
- [ ] Performance verified
- [ ] Monitoring configured
- [ ] Backup/rollback plan ready

Maintenance
- [ ] Monitor logs regularly
- [ ] Track performance metrics
- [ ] Update dependencies
- [ ] Security updates applied
- [ ] User feedback collected
```

---

**Last Updated**: January 2026  
**Deployment Version**: 1.0  
**Status**: Production Ready ✅
