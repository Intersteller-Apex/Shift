# Shift Engine - Vercel Deployment Guide

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/shiftengine/shift-engine)

## Manual Deployment

### Prerequisites
- Vercel account
- Node.js 18+ installed
- Git repository with your Shift Engine code

### Steps

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

4. **Follow the prompts:**
   - Set up and deploy: `Y`
   - Which scope: Select your account
   - Link to existing project: `N`
   - Project name: `shift-engine` (or your preferred name)
   - Directory: `./` (current directory)
   - Override settings: `N`

### Configuration

The project includes:
- `vercel.json` - Vercel configuration
- `api/index.js` - Serverless function entry point
- `package-vercel.json` - Dependencies for Vercel

### Features

- ✅ Static file serving
- ✅ Multi-engine proxy support
- ✅ SEO-optimized routing
- ✅ Security headers
- ✅ Serverless architecture

### Custom Domain

After deployment, you can add a custom domain in your Vercel dashboard:
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

### Environment Variables

No environment variables are required for basic functionality.

### Limitations

- Vercel has a 30-second timeout for serverless functions
- Some advanced proxy features may be limited in serverless environment
- File uploads are limited to 4.5MB

### Support

For issues or questions, please check the main repository or create an issue. 