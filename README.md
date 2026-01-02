# LiftProof.Ai Website

Modern landing page for LiftProof.Ai - AI-powered shoplifting detection system.

## Tech Stack

- **Next.js 14** - React framework
- **Tailwind CSS** - Styling
- **Vercel** - Deployment

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repo to Vercel
3. Deploy automatically

Or use Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Project Structure

```
liftproof-website/
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.js        # Root layout
│   └── page.js          # Main page
├── public/
│   └── logo.png         # Logo image
├── next.config.js       # Next.js config
├── tailwind.config.js   # Tailwind config
├── postcss.config.js    # PostCSS config
└── package.json         # Dependencies
```

## Customization

### Update Contact Email

In `app/page.js`, find the `handleSubmit` function and update the email:

```javascript
window.location.href = `mailto:YOUR_EMAIL@example.com?subject=${subject}&body=${body}`;
```

### Update Logo

Replace `public/logo.png` with your logo image.

## License

MIT
