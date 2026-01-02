'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Animated counter component
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`counter-${end}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [end]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return <span id={`counter-${end}`}>{count}{suffix}</span>;
};

// FAQ Accordion Item
const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-800">
    <button
      className="w-full py-6 flex justify-between items-center text-left hover:text-gray-300 transition-colors"
      onClick={onClick}
    >
      <span className="text-lg font-medium pr-8">{question}</span>
      <svg
        className={`w-5 h-5 transform transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
      <p className="text-gray-400">{answer}</p>
    </div>
  </div>
);

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    cameras: '1-5',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Demo Request from ${formData.name} - ${formData.company}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nNumber of Cameras: ${formData.cameras}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:mrifat205@gmail.com?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
  };

  const features = [
    {
      icon: '👁️',
      title: 'Pocket Concealment',
      description: 'Detects hand-to-pocket movements indicating item hiding with 95% accuracy.'
    },
    {
      icon: '👕',
      title: 'Under-Shirt Detection',
      description: 'Identifies items being tucked under clothing using advanced pose estimation.'
    },
    {
      icon: '⚡',
      title: 'Quick Grab Detection',
      description: 'Catches rapid snatching movements in real-time with instant alerts.'
    },
    {
      icon: '🔔',
      title: 'Instant Notifications',
      description: 'Get real-time alerts on your phone when suspicious behavior is detected.'
    },
    {
      icon: '📹',
      title: 'Multi-Camera Support',
      description: 'Works with Hikvision, Dahua, Lorex, UNV, and all major CCTV brands.'
    },
    {
      icon: '🛡️',
      title: 'Evidence Capture',
      description: 'Automatically saves video clips and screenshots for review and legal purposes.'
    }
  ];

  const faqs = [
    {
      question: 'How does LiftProof.Ai detect shoplifting?',
      answer: 'LiftProof.Ai uses advanced YOLOv8-Pose AI to track human body movements in real-time. It analyzes behavioral patterns like hand-to-pocket movements, concealment actions, and nervous behaviors to identify potential theft before items leave the store.'
    },
    {
      question: 'What cameras are supported?',
      answer: 'LiftProof.Ai works with all major CCTV brands including Hikvision, Dahua, Lorex, Uniview (UNV), Reolink, and any camera that supports RTSP streaming. It also works with standard USB webcams for testing.'
    },
    {
      question: 'How accurate is the detection?',
      answer: 'Our AI achieves 90-95% accuracy in detecting concealment behaviors. The system uses progressive alerts (Normal → Suspicious → Alert) to minimize false positives while catching real threats.'
    },
    {
      question: 'Can I use my existing cameras?',
      answer: 'Yes! LiftProof.Ai integrates with your existing CCTV infrastructure. No need to buy new cameras - just connect your current system and start detecting.'
    },
    {
      question: 'How do I get started?',
      answer: "Simply book a demo using the form below. We'll review your requirements, set up a personalized demonstration, and help you configure LiftProof.Ai with your camera system."
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. All video processing happens locally on your premises. We never store or transmit your video footage to external servers. Your security footage stays with you.'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: 'Free',
      period: '14-day trial',
      features: ['1 Camera', 'Basic Detection', 'Email Alerts', 'Community Support'],
      cta: 'Start Free Trial',
      highlighted: false
    },
    {
      name: 'Professional',
      price: '$99',
      period: 'per month',
      features: ['Up to 10 Cameras', 'Advanced Detection', 'Real-time Alerts', 'Mobile App', 'Priority Support', 'Evidence Storage'],
      cta: 'Get Started',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      features: ['Unlimited Cameras', 'Custom AI Training', 'API Access', 'On-premise Deployment', 'Dedicated Support', 'SLA Guarantee'],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src="/image-removebg-preview.png" 
                alt="LiftProof.Ai Logo" 
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-bold">LiftProof.Ai</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
              <a href="#demo" className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors">
                Book a Demo
              </a>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-b border-gray-800">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#how-it-works" className="block text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
              <a href="#pricing" className="block text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
              <a href="#faq" className="block text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
              <a href="#demo" className="block bg-white text-black px-6 py-2 rounded-full font-medium text-center" onClick={() => setMobileMenuOpen(false)}>
                Book a Demo
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-black" />
        <div className="absolute inset-0 grid-bg" />
        
        {/* Glowing orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">AI-Powered Security</span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Stop Shoplifting
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Before It Happens
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10">
            Real-time AI detection that identifies suspicious behavior and alerts your team instantly. 
            Protect your store with computer vision that never blinks.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#demo" className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-all hover:scale-105 w-full sm:w-auto">
              Book a Demo
            </a>
            <a href="#how-it-works" className="border border-white/30 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all w-full sm:w-auto">
              See How It Works
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <AnimatedCounter end={95} suffix="%" />
              </div>
              <div className="text-gray-500">Detection Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <AnimatedCounter end={30} suffix="+" />
              </div>
              <div className="text-gray-500">FPS Real-time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <AnimatedCounter end={50} suffix="+" />
              </div>
              <div className="text-gray-500">Camera Brands</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                &lt;<AnimatedCounter end={1} suffix="s" />
              </div>
              <div className="text-gray-500">Alert Time</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50">
            <div className="aspect-video relative">
              <img
                src="https://cdn.prod.website-files.com/64197ad92074b81bf57afa03/6442695e874427488882f489_demowithbars-480wide.gif"
                alt="LiftProof.Ai Demo"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            
            {/* Live badge */}
            <div className="absolute top-4 left-4 bg-red-500/90 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span>LIVE DETECTION</span>
            </div>
          </div>
          
          <p className="text-center text-gray-400 mt-4">
            Real-time pose estimation and behavioral analysis in action
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get started in minutes with our simple 3-step process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 h-full hover:border-gray-700 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 text-black rounded-xl flex items-center justify-center font-bold text-xl mb-6">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-4">Connect Your Cameras</h3>
                <p className="text-gray-400">
                  Enter your CCTV camera details (IP, username, password) and LiftProof.Ai automatically connects to your existing system.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-gray-700" />
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 h-full hover:border-gray-700 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 text-black rounded-xl flex items-center justify-center font-bold text-xl mb-6">
                  2
                </div>
                <h3 className="text-2xl font-bold mb-4">AI Starts Monitoring</h3>
                <p className="text-gray-400">
                  Our AI analyzes every frame in real-time, tracking body movements and detecting suspicious concealment behaviors.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-gray-700" />
            </div>

            {/* Step 3 */}
            <div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 h-full hover:border-gray-700 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 text-black rounded-xl flex items-center justify-center font-bold text-xl mb-6">
                  3
                </div>
                <h3 className="text-2xl font-bold mb-4">Get Instant Alerts</h3>
                <p className="text-gray-400">
                  Receive immediate notifications on your phone or computer when shoplifting behavior is detected, with video evidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Advanced AI detection capabilities that protect your business 24/7
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-black border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Cameras */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Works With Your Cameras</h2>
            <p className="text-gray-400">Compatible with all major CCTV brands</p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {['HIKVISION', 'DAHUA', 'LOREX', 'UNIVIEW', 'REOLINK'].map((brand, index) => (
              <div
                key={index}
                className="text-2xl font-bold text-gray-600 hover:text-white transition-colors cursor-default"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose the plan that fits your business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 transition-all ${
                  plan.highlighted
                    ? 'bg-white text-black border-2 border-white scale-105 shadow-2xl shadow-white/10'
                    : 'bg-black border border-gray-800 hover:border-gray-700'
                }`}
              >
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={plan.highlighted ? 'text-gray-600' : 'text-gray-500'}>
                    {' '}{plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center space-x-3">
                      <svg className={`w-5 h-5 ${plan.highlighted ? 'text-black' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={plan.highlighted ? 'text-gray-700' : 'text-gray-300'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#demo"
                  className={`block text-center py-3 rounded-full font-semibold transition-all ${
                    plan.highlighted
                      ? 'bg-black text-white hover:bg-gray-800'
                      : 'bg-white text-black hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">FAQ</h2>
            <p className="text-xl text-gray-400">
              Everything you need to know about LiftProof.Ai
            </p>
          </div>

          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Book a Demo Section */}
      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Book a Demo</h2>
            <p className="text-xl text-gray-400">
              See LiftProof.Ai in action with a personalized demonstration
            </p>
          </div>

          {formSubmitted ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
              <p className="text-gray-400">
                Your demo request has been sent. We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-black border border-gray-800 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
                    placeholder="Retail Store Inc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Number of Cameras</label>
                  <select
                    value={formData.cameras}
                    onChange={(e) => setFormData({ ...formData, cameras: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="1-5">1-5 cameras</option>
                    <option value="6-10">6-10 cameras</option>
                    <option value="11-25">11-25 cameras</option>
                    <option value="25+">25+ cameras</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Message (Optional)</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors resize-none"
                  placeholder="Tell us about your store and requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-colors"
              >
                Request Demo
              </button>

              <p className="text-center text-gray-500 text-sm mt-4">
                We'll review your request and contact you within 24 hours
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/image-removebg-preview.png" 
                  alt="LiftProof.Ai Logo" 
                  className="w-10 h-10 object-contain"
                />
                <span className="text-xl font-bold">LiftProof.Ai</span>
              </div>
              <p className="text-gray-400 max-w-md">
                AI-powered shoplifting detection that protects your retail business 24/7. 
                Stop theft before it happens with real-time behavioral analysis.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#demo" className="hover:text-white transition-colors">Book Demo</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>mrifat205@gmail.com</li>
                <li>
                  <a 
                    href="https://github.com/Mrabbi3/LiftProofAI" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2025 LiftProof.Ai. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
