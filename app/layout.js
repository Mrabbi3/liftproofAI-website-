import './globals.css'

export const metadata = {
  title: 'LiftProof.Ai - Real-Time Shoplifting Detection',
  description: 'AI-powered shoplifting detection using computer vision and behavioral analysis. Stop theft before it happens with real-time alerts.',
  keywords: 'shoplifting detection, retail security, AI security, CCTV analytics, loss prevention',
  openGraph: {
    title: 'LiftProof.Ai - Real-Time Shoplifting Detection',
    description: 'AI-powered shoplifting detection using computer vision and behavioral analysis.',
    url: 'https://liftproof.ai',
    siteName: 'LiftProof.Ai',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
