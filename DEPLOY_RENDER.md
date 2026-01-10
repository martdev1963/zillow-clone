# Deploying to Render.com - Step-by-Step Guide

## Prerequisites

1. **GitHub Account** - Your code needs to be in a GitHub repository
2. **Render.com Account** - Sign up at [render.com](https://render.com) (free tier available)
3. **Hygraph Credentials** - Your `HYGRAPH_ENDPOINT` and `HYGRAPH_API_TOKEN`

## Step 1: Push Your Code to GitHub

If you haven't already, push your code to GitHub:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Zillow clone app"

# Add your GitHub repository as remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/zillow-clone.git

# Push to GitHub
git push -u origin main
```

**Important**: Make sure `.env.local` is in `.gitignore` (it should be already) - never commit your API keys!

## Step 2: Create a New Web Service on Render

1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** button in the top right
3. Select **"Web Service"**
4. Connect your GitHub account if you haven't already
5. Select your `zillow-clone` repository
6. Click **"Connect"**

## Step 3: Configure Build Settings

Render will auto-detect Next.js, but verify these settings:

### Basic Settings:
- **Name**: `zillow-clone` (or any name you prefer)
- **Region**: Choose closest to your users (e.g., `Oregon (US West)`)
- **Branch**: `main` (or `master` if that's your default branch)
- **Root Directory**: Leave empty (or `zillow-clone` if your repo is in a subfolder)

### Build & Deploy Settings:
- **Runtime**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### Advanced Settings (if needed):
- **Node Version**: `18.x` or `20.x` (Render will auto-detect)

## Step 4: Add Environment Variables

This is **critical** - you need to add your Hygraph credentials:

1. In the Render dashboard, scroll down to **"Environment Variables"** section
2. Click **"Add Environment Variable"**
3. Add these two variables:

   **Variable 1:**
   - **Key**: `HYGRAPH_ENDPOINT`
   - **Value**: Your Hygraph endpoint URL (from `.env.local`)
   - Click **"Save"**

   **Variable 2:**
   - **Key**: `HYGRAPH_API_TOKEN`
   - **Value**: Your Hygraph API token (from `.env.local`)
   - Click **"Save"**

⚠️ **Security Note**: Never commit these values to GitHub. Only add them in Render's environment variables section.

## Step 5: Deploy

1. Click **"Create Web Service"** at the bottom
2. Render will start building your app
3. You can watch the build logs in real-time
4. The build process will:
   - Install dependencies (`npm install`)
   - Build the Next.js app (`npm run build`)
   - Start the server (`npm start`)

## Step 6: Wait for Deployment

- First deployment usually takes 5-10 minutes
- You'll see build logs showing progress
- When complete, you'll see: **"Your service is live"**
- Your app URL will be: `https://zillow-clone.onrender.com` (or similar)

## Step 7: Verify Deployment

1. Click on your service URL
2. Check that:
   - The homepage loads
   - Properties are displayed
   - Map is working
   - Images are loading

## Common Issues & Solutions

### Issue 1: Build Fails - "Module not found"
**Solution**: Make sure all dependencies are in `package.json`. Run `npm install` locally to verify.

### Issue 2: Build Fails - "Environment variable not set"
**Solution**: Double-check that `HYGRAPH_ENDPOINT` and `HYGRAPH_API_TOKEN` are set in Render's environment variables.

### Issue 3: App Crashes - "Cannot connect to database"
**Solution**: Verify your Hygraph endpoint and token are correct. Test them in Hygraph's API Playground first.

### Issue 4: Images Not Loading
**Solution**: 
- Check that `next.config.js` has the correct `remotePatterns` for Hygraph image domains
- Verify images are published (not drafts) in Hygraph
- Check browser console for CORS or domain errors

### Issue 5: Map Not Loading
**Solution**: 
 Leaflet should work fine on Render. If issues occur, check browser console for errors.

## Render.com Free Tier Limitations

- **Spins down after 15 minutes of inactivity** - First request after spin-down takes ~30 seconds
- **750 hours/month free** - Enough for most personal projects
- **512 MB RAM** - Should be fine for Next.js apps
- **Auto-deploys on git push** - Free tier includes this!

## Updating Your App

After deployment, any time you push to GitHub:

1. Render automatically detects the push
2. Starts a new build
3. Deploys the updated version
4. Your app URL stays the same

You can also manually trigger deployments from the Render dashboard.

## Custom Domain (Optional)

If you want a custom domain:

1. Go to your service settings
2. Click **"Custom Domains"**
3. Add your domain
4. Follow Render's DNS instructions

## Monitoring & Logs

- **Logs**: View real-time logs in the Render dashboard
- **Metrics**: See CPU, memory usage, and request counts
- **Alerts**: Set up email alerts for deployment failures

## Cost

- **Free tier**: Perfect for development and small projects
- **Starter plan** ($7/month): No spin-down, better performance
- **Professional plans**: For production apps with high traffic

## Quick Checklist

Before deploying, make sure:

- [ ] Code is pushed to GitHub
- [ ] `.env.local` is in `.gitignore`
- [ ] `package.json` has all dependencies
- [ ] `next.config.js` is configured correctly
- [ ] You have your Hygraph credentials ready
- [ ] All properties are published in Hygraph (not drafts)

## Next Steps After Deployment

1. **Test thoroughly** - Click through all pages
2. **Check console** - Look for any errors in browser console
3. **Monitor logs** - Watch Render logs for any issues
4. **Share your URL** - Your app is now live! 🎉

## Need Help?

- **Render Docs**: [render.com/docs](https://render.com/docs)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Render Support**: Available in dashboard

---

**Your app will be live at**: `https://your-app-name.onrender.com`

Good luck with your deployment! 🚀

