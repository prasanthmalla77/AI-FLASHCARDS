# GitHub Pages Deployment Guide

## What Changed

✅ **Removed backend** - App now calls OpenRouter API directly from browser
✅ **Environment variables** - API key read from `VITE_OPENROUTER_API_KEY`
✅ **GitHub Actions** - Auto-deploy on push to `main`
✅ **Simplified** - No server.js, just React + Vite

## Deployment Steps

### 1. Create GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Microsoft Fabric Flashcards"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/flashcards.git
git branch -M main
git push -u origin main
```

### 2. Add API Key to GitHub Secrets

1. Go to your repo on GitHub
2. Click **Settings** tab
3. In left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Enter:
   - **Name:** `VITE_OPENROUTER_API_KEY`
   - **Secret:** Your OpenRouter API key (e.g., `sk-or-v1-ac6d1a979...`)
6. Click **Add secret**

### 3. Enable GitHub Pages

1. Still in **Settings** tab
2. Click **Pages** in left sidebar
3. Under "Build and deployment":
   - **Source:** Select "GitHub Actions"
4. Save (no need to select a branch)

### 4. Update Base Path (Important!)

Edit `vite.config.js` line 6:

```js
base: '/YOUR-REPO-NAME/',  // Change 'flashcards' to your actual repo name
```

If your repo is named `flashcards`, leave it as is. Otherwise, update it.

### 5. Deploy

```bash
git add .
git commit -m "Update base path for GitHub Pages"
git push origin main
```

GitHub Actions will automatically:
- Install dependencies
- Build the app with your API key
- Deploy to GitHub Pages

### 6. Access Your App

After ~2-3 minutes, your app will be live at:

```
https://YOUR-USERNAME.github.io/flashcards/
```

(Replace `YOUR-USERNAME` and `flashcards` with your actual values)

## Verify Deployment

1. Go to **Actions** tab in your repo
2. Check that the workflow completed successfully (green checkmark)
3. Click on the workflow to see deployment logs
4. Visit your live URL

## Update API Key Later

If you need to change your API key:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click on `VITE_OPENROUTER_API_KEY`
3. Click **Update secret**
4. Enter new value
5. Go to **Actions** tab and re-run the latest workflow

## Troubleshooting

### Build fails with "API key not configured"
- Check that secret name is exactly: `VITE_OPENROUTER_API_KEY`
- No typos, no spaces
- Re-run the workflow after adding the secret

### 404 Error when visiting the site
- Ensure `base` in `vite.config.js` matches your repo name
- Wait 2-3 minutes after deployment
- Check GitHub Pages is enabled in Settings

### API calls fail in production
- Open browser DevTools → Console
- Look for CORS or authentication errors
- Verify API key is valid and has credits
- Check OpenRouter dashboard for usage/errors

## Security Notes

⚠️ **The API key will be embedded in the built JavaScript files.** Anyone can:
- View source
- Extract the key
- Use your OpenRouter credits

**Mitigations:**
1. Set spending limits on OpenRouter account
2. Use domain restrictions (if available)
3. Monitor usage regularly
4. Rotate keys periodically

For production apps with sensitive data, use a backend proxy instead.

## Local Development

API key stored in `.env` file (not committed to Git):

```bash
# .env
VITE_OPENROUTER_API_KEY=sk-or-v1-your-key-here
```

Run locally:
```bash
npm install
npm run dev
```

## Questions?

Check the main [README.md](README.md) for more details.
