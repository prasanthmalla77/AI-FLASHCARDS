# Microsoft Fabric Flashcards ⚡

AI-powered React flashcard app for learning Microsoft Fabric using OpenRouter API.

## Features

- **React + Vite** - Modern, fast development
- **AI-Generated Questions** - Uses Claude 3.5 Sonnet via OpenRouter
- **8 Microsoft Fabric Topics** - Lakehouse, Data Factory, Synapse, OneLake, Power BI, and more
- **Interactive UI** - Beautiful flip animations, keyboard shortcuts
- **Client-Side Only** - No backend needed, deploys to GitHub Pages
- **Secure** - API key stored in GitHub Secrets

## Quick Start (Local Development)

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API Key

Create a [.env](.env) file (or rename `.env.example`):

```env
VITE_OPENROUTER_API_KEY=sk-or-v1-your-key-here
```

Get a free key at https://openrouter.ai/keys

### 3. Run the App

```bash
npm run dev
```

Open `http://localhost:5173` in your browser!

## Deploy to GitHub Pages

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/flashcards.git
git push -u origin main
```

### Step 2: Add API Key Secret

1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `VITE_OPENROUTER_API_KEY`
4. Value: Your OpenRouter API key (e.g., `sk-or-v1-...`)
5. Click **Add secret**

### Step 3: Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Under "Source", select **GitHub Actions**
3. Save

### Step 4: Update Base Path (if needed)

If your repo name is NOT "flashcards", update [vite.config.js](vite.config.js#L6):

```js
base: '/YOUR-REPO-NAME/',
```

### Step 5: Deploy

Push to `main` branch and GitHub Actions will automatically build and deploy!

```bash
git push origin main
```

Your app will be live at: `https://YOUR-USERNAME.github.io/flashcards/`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## How to Use

1. Select a Microsoft Fabric topic from the dropdown
2. Choose number of questions (5-20)
3. Click "Generate Flashcards"
4. Click cards to flip between question and answer
5. Use keyboard shortcuts:
   - `←` / `→` - Navigate between cards
   - `Space` / `Enter` - Flip current card

## Project Structure

```
flashcards/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions deployment
├── src/
│   ├── components/
│   │   ├── FlashCard.jsx          # Flashcard with flip animation
│   │   ├── FlashCard.css
│   │   ├── TopicSelector.jsx     # Topic selection form
│   │   └── TopicSelector.css
│   ├── App.jsx                   # Main app (calls OpenRouter API)
│   ├── App.css
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Global styles
├── vite.config.js                # Vite configuration
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── .env                         # Local API key (gitignored)
├── .env.example                 # Example env file
└── README.md                    # This file
```

## Technologies

- **Frontend:** React 18, Vite 5
- **AI:** OpenRouter API (Claude 3.5 Sonnet)
- **Deployment:** GitHub Pages + GitHub Actions
- **Styling:** Pure CSS with 3D transforms

## Topics Available

- Lakehouse
- Data Factory
- Synapse Data Engineering
- Synapse Data Warehouse
- Synapse Real-Time Intelligence
- Power BI Integration
- OneLake
- Data Activator

## Security Notes

**⚠️ Important:** The API key is embedded in the built JavaScript and can be extracted by anyone. For production:

- Use OpenRouter's domain restrictions to limit key usage
- Set spending limits on your OpenRouter account
- Monitor usage regularly
- Consider IP allowlisting if available

For truly secure production apps, use a backend proxy (Vercel, Netlify Functions, etc.).

## Troubleshooting

### API key not working

- Make sure it's set in GitHub Secrets with exact name: `VITE_OPENROUTER_API_KEY`
- Re-run the GitHub Action workflow after adding the secret
- Check the build logs for errors

### 404 on GitHub Pages

- Ensure Pages is enabled in repo settings
- Check that `base` in `vite.config.js` matches your repo name
- Wait a few minutes after deployment

### CORS errors

- OpenRouter should allow browser requests
- Check browser console for specific error messages

## License

MIT

## Credits

Inspired by [fabric-flashcards.com](https://fabric-flashcards.com/)
"# AI-FLASHCARDS" 
