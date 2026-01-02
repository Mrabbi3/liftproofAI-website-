# LiftProof.Ai Website

A modern, responsive landing page for **LiftProof.Ai** - an AI-powered shoplifting detection system that uses computer vision and behavioral analysis to protect retail stores.

🌐 **Live Website:** [https://liftproof-ai-website-7oediq4sy-md-s-projects-90825e24.vercel.app/](https://liftproof-ai-website-7oediq4sy-md-s-projects-90825e24.vercel.app/)

## 🚀 Features

- **Real-time AI Detection** - Identifies suspicious shoplifting behavior with 95% accuracy
- **Multi-Camera Support** - Works with Hikvision, Dahua, Lorex, UNV, and all major CCTV brands
- **Instant Alerts** - Get real-time notifications when suspicious behavior is detected
- **Evidence Capture** - Automatically saves video clips and screenshots for review
- **Modern UI/UX** - Beautiful, responsive design with smooth animations
- **Demo Booking System** - Integrated contact form for demo requests

## 🛠️ Tech Stack

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://react.dev/)** - UI library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Vercel](https://vercel.com/)** - Deployment platform

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

## 🏃 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Mrabbi3/liftproofAI-website-.git
cd liftproof-website
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build for Production

Create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## 📁 Project Structure

```
liftproof-website/
├── app/
│   ├── globals.css      # Global styles and Tailwind imports
│   ├── layout.js        # Root layout with metadata
│   └── page.js          # Main landing page component
├── components/          # Reusable React components (if any)
├── public/
│   └── image-removebg-preview.png  # Logo image
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Dependencies and scripts
```

## 🎨 Customization

### Update Contact Email

In `app/page.js`, find the `handleSubmit` function and update the email:

```javascript
window.location.href = `mailto:YOUR_EMAIL@example.com?subject=${subject}&body=${body}`;
```

### Update Logo

Replace `public/image-removebg-preview.png` with your logo image. The logo is used in:
- Navigation bar
- Footer

### Update Website Content

Edit `app/page.js` to customize:
- Hero section text
- Features list
- Pricing plans
- FAQ items
- Demo form fields

## 🚢 Deployment

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and deploy

Or use Vercel CLI:

```bash
npm i -g vercel
vercel
```

### Other Deployment Options

This Next.js app can be deployed to any platform that supports Node.js:
- **Netlify** - Connect your GitHub repo
- **AWS Amplify** - Full-stack deployment
- **DigitalOcean App Platform** - Simple deployment
- **Self-hosted** - Use `npm run build` and `npm start`

## 📝 Key Sections

The landing page includes:

1. **Hero Section** - Main headline with animated statistics
2. **Demo Video** - Showcase of the AI detection in action
3. **How It Works** - 3-step process explanation
4. **Features** - Detailed feature cards
5. **Supported Cameras** - Compatible CCTV brands
6. **Pricing** - Three pricing tiers
7. **FAQ** - Frequently asked questions
8. **Demo Booking** - Contact form for demo requests
9. **Footer** - Links and contact information

## 🔗 Links

- **Live Website:** [https://liftproof-ai-website-7oediq4sy-md-s-projects-90825e24.vercel.app/](https://liftproof-ai-website-7oediq4sy-md-s-projects-90825e24.vercel.app/)
- **GitHub Repository:** [https://github.com/Mrabbi3/liftproofAI-website-](https://github.com/Mrabbi3/liftproofAI-website-)
- **Main Project:** [https://github.com/Mrabbi3/LiftProofAI](https://github.com/Mrabbi3/LiftProofAI)

## 📧 Contact

For demo requests or inquiries, use the contact form on the website or email: **mrifat205@gmail.com**

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using Next.js and Tailwind CSS
