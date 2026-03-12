# SYTYCSN Adaptive Learning AI Tutor

**Version:** POC v0.4  
**"Fix the Practice. Unlock the Platform."™**

## About

This is the SYTYCSN Adaptive Learning AI Tutor - an interactive learning platform that teaches ServiceNow architecture through scenario-based practice and AI-powered coaching.

## What's New in v0.4

- **Proper backend API** — Claude API calls now happen server-side (secure)
- **Next.js architecture** — Production-ready framework
- **Environment-based configuration** — API key stored securely in Vercel

---

## Deployment to Vercel

### Step 1: Push to GitHub (Recommended)

1. Create a new GitHub repository
2. Push this code to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/sytycsn-tutor.git
   git push -u origin main
   ```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js

### Step 3: Add Your API Key (CRITICAL)

Before the app will work, you need to add your Anthropic API key:

1. In Vercel Dashboard, go to your project
2. Click **Settings** → **Environment Variables**
3. Add a new variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** Your Anthropic API key (starts with `sk-ant-`)
   - **Environment:** Production (and Preview if you want)
4. Click **Save**
5. **Redeploy** your project (Settings → Deployments → Redeploy)

### Step 4: Add Custom Domain

1. In Vercel Dashboard → **Settings** → **Domains**
2. Add: `tutor.sytycsn.com`
3. Add CNAME record in your DNS:
   - **Name:** `tutor`
   - **Value:** `cname.vercel-dns.com`

---

## Getting Your Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign in or create an account
3. Go to **API Keys**
4. Create a new key
5. Copy it and add to Vercel environment variables

---

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env.local` file:
   ```
   ANTHROPIC_API_KEY=your-api-key-here
   ```
4. Run development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
sytycsn-tutor-v2/
├── pages/
│   ├── api/
│   │   └── chat.js      # Backend API route (calls Claude)
│   ├── _app.js          # App wrapper
│   ├── globals.css      # Global styles
│   └── index.js         # Main tutor application
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── .env.example
```

---

## How It Works

1. **Frontend** (`pages/index.js`) displays the tutor interface
2. When user sends a message, it calls `/api/chat`
3. **Backend** (`pages/api/chat.js`) receives the request
4. Backend calls Claude API with the system prompt and conversation
5. Response is returned to the frontend
6. User sees the tutor's reply

The API key never leaves the server — it's secure.

---

## Troubleshooting

### "Technical hiccup" error
- Check that `ANTHROPIC_API_KEY` is set in Vercel environment variables
- Make sure you redeployed after adding the environment variable
- Check Vercel function logs for detailed error messages

### Deployment fails
- Make sure all files are committed
- Check Vercel build logs for specific errors

### API key not working
- Verify the key is valid at console.anthropic.com
- Make sure there are no extra spaces or quotes around the key
- Check that your Anthropic account has API credits

---

## Support

For questions about the SYTYCSN methodology, visit [sytycsn.com](https://sytycsn.com)

---

© 2026 SYTYCSN Inc. All rights reserved.
