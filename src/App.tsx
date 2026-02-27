import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Menu, X, ArrowRight, ChevronRight, Instagram, Twitter, Facebook } from 'lucide-react';
import Lenis from 'lenis';
import emailjs from '@emailjs/browser';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/50 backdrop-blur-xl border-b border-white/20 py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-serif font-bold tracking-tighter">FurniLabs.</a>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="#about">About</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </div>

        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden py-8 px-6 flex flex-col space-y-4"
        >
          <MobileNavLink href="#about" onClick={() => setIsOpen(false)}>About</MobileNavLink>
          <MobileNavLink href="#contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
        </motion.div>
      )}
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a href={href} className="relative text-sm font-medium tracking-wide hover:text-stone-600 transition-colors uppercase group">
    {children}
    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-stone-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
  </a>
);

const MobileNavLink = ({ href, onClick, children }: { href: string, onClick: () => void, children: React.ReactNode }) => (
  <motion.a 
    href={href} 
    onClick={onClick} 
    whileHover={{ x: 10 }}
    className="text-lg font-serif font-medium block py-2 border-b border-stone-100"
  >
    {children}
  </motion.a>
);

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2500&auto=format&fit=crop" 
          alt="Modern Interior" 
          className="w-full h-full object-cover brightness-[0.85]"
        />
      </motion.div>
      
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto mt-20">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="block text-sm md:text-base tracking-[0.2em] uppercase mb-4 opacity-90"
        >
          Est. 2026
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-tight mb-8"
        >
          Elevate Your <br/> Living Space
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        >
          <a href="#about" className="inline-flex items-center space-x-2 border border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 group">
            <span className="tracking-wide text-sm font-medium uppercase">Read Our Story</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full md:w-1/2"
          >
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden">
              <motion.img 
                style={{ y }}
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop" 
                alt="AI Room Transformation" 
                className="w-full h-[120%] object-cover -mt-[10%]"
              />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-stone-100 -z-10 hidden md:block" />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="w-full md:w-1/2"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4 }}
              className="text-stone-500 text-sm tracking-widest uppercase block mb-4"
            >
              AI-Powered Design
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-5xl font-serif mb-6 leading-tight"
            >
              Visualize your dream space instantly.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.6 }}
              className="text-stone-600 text-lg mb-8 leading-relaxed"
            >
              FurniLabs transforms your room photos into fully furnished masterpieces. Simply upload an image of your space, and our advanced AI will reimagine it with the furniture you've always wanted. No more guessing—see exactly how it looks before you buy.
            </motion.p>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.7 }}
              >
                <h4 className="font-serif text-2xl mb-2">100%</h4>
                <p className="text-sm text-stone-500">Realistic Rendering</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.8 }}
              >
                <h4 className="font-serif text-2xl mb-2">Instant</h4>
                <p className="text-sm text-stone-500">AI Transformation</p>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("Sending your message...");
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage("Message sent successfully! We'll be in touch soon.");
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatusMessage(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatusMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
      // Clear status message after 5 seconds
      setTimeout(() => setStatusMessage(''), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-stone-50">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <span className="text-stone-500 text-sm tracking-widest uppercase block mb-4">
            Connect With Us
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
            Ready to transform your space?
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed">
            We're here to help you create the home of your dreams. Reach out to us for inquiries, collaborations, or just to say hello.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2 uppercase tracking-wide">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-stone-200 px-4 py-3 focus:outline-none focus:border-stone-500 transition-colors"
                  placeholder="Your Name"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2 uppercase tracking-wide">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-stone-200 px-4 py-3 focus:outline-none focus:border-stone-500 transition-colors"
                  placeholder="your@email.com"
                />
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.35 }}
            >
              <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2 uppercase tracking-wide">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-white border border-stone-200 px-4 py-3 focus:outline-none focus:border-stone-500 transition-colors"
                placeholder="+1 (555) 000-0000"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2 uppercase tracking-wide">Message</label>
              <textarea 
                id="message" 
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-white border border-stone-200 px-4 py-3 focus:outline-none focus:border-stone-500 transition-colors resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-stone-900 text-white px-10 py-4 rounded-full text-sm font-medium uppercase tracking-wide hover:bg-stone-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {statusMessage && (
                <p className="mt-4 text-sm text-stone-600 animate-pulse">
                  {statusMessage}
                </p>
              )}
            </motion.div>
          </form>
        </div>
      </div>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className="bg-black text-white py-4 overflow-hidden whitespace-nowrap">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="inline-block"
      >
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-8 text-sm font-medium tracking-widest uppercase">
            AI-Powered Interior Design • Visualize Your Dream Space • Instant Transformations • 
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-400 py-8">
      <motion.div 
        className="container mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; 2026 FurniLabs. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default function App() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-stone-900 selection:text-white">
      <Navbar />
      <Hero />
      <Marquee />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
