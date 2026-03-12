# SYTYCSN Adaptive Learning AI Tutor

**Version:** POC v0.3  
**"Fix the Practice. Unlock the Platform."™**

## About

This is the SYTYCSN Adaptive Learning AI Tutor - an interactive learning platform that teaches ServiceNow architecture through scenario-based practice and AI-powered coaching.

## Deployment to Vercel (Recommended)

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Navigate to the project directory:
   ```bash
   cd sytycsn-tutor-app
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts. When asked about settings, accept the defaults.

5. Once deployed, you'll get a URL like: `https://sytycsn-tutor-xxxxx.vercel.app`

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in (or create account)
2. Click "Add New Project"
3. Import from Git or upload the folder directly
4. Vercel will auto-detect the React app and configure it
5. Click "Deploy"

## Setting Up Custom Domain (tutor.sytycsn.com)

After deployment:

1. In Vercel Dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add: `tutor.sytycsn.com`
4. Vercel will give you DNS records to add

In your DNS provider (wherever sytycsn.com is hosted):

Add a CNAME record:
- **Name:** `tutor`
- **Value:** `cname.vercel-dns.com`

Wait 5-10 minutes for DNS propagation.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- React 18
- Tailwind CSS (via CDN)
- Claude API (Anthropic) for AI tutoring

## Notes

- The app calls the Claude API directly from the browser
- No backend server required
- All conversation happens client-side

## Support

For questions about the SYTYCSN methodology, visit [sytycsn.com](https://sytycsn.com)

---

© 2026 SYTYCSN Inc. All rights reserved.
