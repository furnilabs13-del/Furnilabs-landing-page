import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Menu, X, ArrowRight, ChevronRight, Instagram, Twitter, Facebook, Upload, Palette, Sparkles, Building2, Sofa, Home } from 'lucide-react';
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
          <NavLink href="#how-it-works">How it Works</NavLink>
          <NavLink href="#use-cases">Use Cases</NavLink>
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
          <MobileNavLink href="#how-it-works" onClick={() => setIsOpen(false)}>How it Works</MobileNavLink>
          <MobileNavLink href="#use-cases" onClick={() => setIsOpen(false)}>Use Cases</MobileNavLink>
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
          Virtual Design Platform
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight mb-8"
        >
          Generate furniture-staged room images instantly with our Virtual Designer.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="https://app.furnilabs.net" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 bg-white text-black px-8 py-4 rounded-full hover:bg-stone-100 transition-all duration-300 group font-medium uppercase tracking-wide text-sm">
            <span>Try it now</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#how-it-works" className="inline-flex items-center space-x-2 border border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 group">
            <span className="tracking-wide text-sm font-medium uppercase">Learn More</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      number: "1",
      title: "Upload a room photo",
      description: "Take a picture of any space."
    },
    {
      icon: Palette,
      number: "2",
      title: "Choose furniture",
      description: "Select furniture and style."
    },
    {
      icon: Sparkles,
      number: "3",
      title: "Generate virtual staging",
      description: "Get photorealistic furnished rooms instantly."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-stone-500 text-sm tracking-widest uppercase block mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
            How it works
          </h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Transform any room in just three simple steps using our Virtual Staging Platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-stone-100 rounded-full" />
                      <div className="relative bg-white w-24 h-24 rounded-full flex items-center justify-center border-2 border-stone-200">
                        <Icon size={40} className="text-stone-900" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-8 right-0 text-6xl font-serif text-stone-100 -z-10 md:block hidden">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-serif font-medium mb-2">
                    {step.title}
                  </h3>
                  <p className="text-stone-600">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-stone-300 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>
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
                alt="Virtual Staging Platform - Room Transformation"
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
              For Store Owners
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-5xl font-serif mb-6 leading-tight"
            >
              Turn browsers into buyers.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.6 }}
              className="text-stone-600 text-lg mb-8 leading-relaxed"
            >
              FurniLabs transforms your sales process. Instead of customers imagining how your furniture looks in their homes, show them instantly. Your salespeople can generate photorealistic visualizations in seconds—no expensive 3D renders, no long wait times. Just real results that close sales.
            </motion.p>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.7 }}
              >
                <h4 className="font-serif text-2xl mb-2">Seconds</h4>
                <p className="text-sm text-stone-500">Not Hours or Days</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.8 }}
              >
                <h4 className="font-serif text-2xl mb-2">Your Brand</h4>
                <p className="text-sm text-stone-500">Fully Integrated</p>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

const UseCases = () => {
  const cases = [
    {
      icon: Sofa,
      title: "Catalog Creation",
      description: "Create stunning product catalogs instantly. Show your furniture in real room settings without expensive photoshoots."
    },
    {
      icon: Building2,
      title: "In-Store Experience",
      description: "Salespeople can instantly show customers how furniture fits in their homes. Reduce purchase hesitation with photorealistic visualizations."
    },
    {
      icon: Home,
      title: "Your Brand, Your Tool",
      description: "White-label integration means your customers see your store's branding throughout. They'll think it's your tool—because it is."
    }
  ];

  return (
    <section id="use-cases" className="py-24 bg-stone-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-stone-500 text-sm tracking-widest uppercase block mb-4">
            Built for Furniture Stores
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
            How Furniture Stores Win
          </h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Stop competing on price. Compete on experience. FurniLabs gives you the tools to visualize, convince, and sell.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-stone-100 rounded-lg flex items-center justify-center mb-6">
                  <Icon size={32} className="text-stone-900" />
                </div>
                <h3 className="text-2xl font-serif font-medium mb-3">
                  {useCase.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  {useCase.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ResultsCarousel = ({ example, exIndex }: { example: any, exIndex: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % example.images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + example.images.length) % example.images.length);
  };

  return (
    <motion.div
      key={exIndex}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.6, delay: exIndex * 0.15 }}
      className="space-y-6 md:space-y-8"
    >
      {/* Example Title - Smaller, Less Bold */}
      <div className="text-center space-y-1">
        <h3 className="text-lg md:text-xl font-serif font-normal text-stone-900">
          {example.title}
        </h3>
        <p className="text-stone-500 text-xs md:text-sm">
          {example.subtitle}
        </p>
      </div>

      {/* Desktop Layout - All Images */}
      <div className="hidden sm:flex flex-row items-center justify-center gap-4 md:gap-6 lg:gap-8">
        {example.images.map((image: any, imgIndex: number) => (
          <div key={imgIndex} className="flex items-center gap-4 md:gap-6">
            {/* Image Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: exIndex * 0.15 + imgIndex * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative w-48 h-64 md:w-56 md:h-72 lg:w-64 lg:h-80">
                <img
                  src={image.src}
                  alt={image.label}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Minimal Label */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/98 p-2 md:p-3">
                <span className="text-xs md:text-sm text-stone-700 font-medium">
                  {image.label}
                </span>
              </div>
            </motion.div>

            {/* Arrow Separator */}
            {imgIndex < example.images.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: exIndex * 0.15 + imgIndex * 0.1 + 0.08, duration: 0.5 }}
                className="flex-shrink-0"
              >
                <div className="bg-stone-200 hover:bg-stone-300 transition-colors duration-300 rounded-full p-2.5 md:p-3">
                  <ArrowRight size={18} className="text-stone-700" strokeWidth={2.5} />
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Carousel - Single Image with Navigation */}
      <div className="sm:hidden flex flex-col items-center gap-4">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden rounded-lg shadow-sm w-full"
        >
          <div className="relative w-full pt-[100%]">
            <img
              src={example.images[currentIndex].src}
              alt={example.images[currentIndex].label}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Minimal Label */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/98 p-3">
            <span className="text-xs text-stone-700 font-medium">
              {example.images[currentIndex].label}
            </span>
          </div>
        </motion.div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prevImage}
            className="bg-stone-200 hover:bg-stone-300 transition-colors rounded-full p-2"
          >
            <ArrowRight size={16} className="text-stone-700 rotate-180" />
          </button>

          <div className="flex gap-1.5">
            {example.images.map((_: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentIndex ? 'bg-stone-900' : 'bg-stone-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextImage}
            className="bg-stone-200 hover:bg-stone-300 transition-colors rounded-full p-2"
          >
            <ArrowRight size={16} className="text-stone-700" />
          </button>
        </div>

        {/* Image Counter */}
        <p className="text-xs text-stone-500">
          {currentIndex + 1} / {example.images.length}
        </p>
      </div>
    </motion.div>
  );
};

const Results = () => {
  const storageUrl = "https://cswxefuxrxyhuksjvahe.supabase.co/storage/v1/object/public/site-images";

  const examples = [
    {
      title: "Example 1",
      subtitle: "Modern Living Room Transformation",
      images: [
        { type: "input", src: `${storageUrl}/eg1_input.jpg`, label: "Original Room" },
        { type: "furniture", src: `${storageUrl}/eg1_Furniture.jpg`, label: "Furniture Style" },
        { type: "result", src: `${storageUrl}/eg1_output.png`, label: "Result" }
      ]
    },
    {
      title: "Example 2",
      subtitle: "Contemporary Interior Design",
      images: [
        { type: "input", src: `${storageUrl}/eg2_input.jpg`, label: "Original Room" },
        { type: "furniture", src: `${storageUrl}/eg2_furniture.jpg`, label: "Furniture Style" },
        { type: "result", src: `${storageUrl}/eg2_output.png`, label: "Result" }
      ]
    },
    {
      title: "Example 3",
      subtitle: "Elegant Space Styling",
      images: [
        { type: "input", src: `${storageUrl}/eg3_input.jpg`, label: "Original Room" },
        { type: "furniture", src: `${storageUrl}/eg3_furniture.jpg`, label: "Furniture Style" },
        { type: "result", src: `${storageUrl}/eg3_output.png`, label: "Result" }
      ]
    }
  ];

  return (
    <section id="results" className="py-20 md:py-32 bg-gradient-to-b from-white to-stone-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-stone-500 text-xs md:text-sm tracking-widest uppercase block mb-3 md:mb-4">
            Real Examples
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-medium mb-4 md:mb-6 leading-tight">
            Transform Spaces in Seconds
          </h2>
          <p className="text-stone-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            See how our Virtual Designer brings empty rooms to life with stunning furniture visualizations.
          </p>
        </motion.div>

        {/* Examples Grid */}
        <div className="space-y-16 md:space-y-24">
          {examples.map((example, exIndex) => (
            <ResultsCarousel key={exIndex} example={example} exIndex={exIndex} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 md:mt-24 text-center"
        >
          <a href="https://app.furnilabs.net" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 bg-stone-900 hover:bg-stone-800 text-white px-6 md:px-8 py-3 md:py-4 rounded-full transition-colors duration-300 group text-sm md:text-base font-medium">
            <span>Try it now</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const benefits = [
    {
      title: "Visualize with Confidence",
      description: "Help customers see exactly how your furniture fits in their homes. Clear visualization leads to higher confidence in purchasing decisions."
    },
    {
      title: "Instant Results",
      description: "No waiting around for 3D renders or lengthy design consultations. Get photorealistic images in seconds."
    },
    {
      title: "Complete Customization",
      description: "Full control over furniture styles, colors, and layouts. Tailor every visualization to your brand and customer needs."
    },
    {
      title: "White Label Solution",
      description: "Users think it's created by your store itself. Perfect for furniture brands and retailers who want to offer this as their own service."
    }
  ];

  return (
    <section id="why-choose" className="py-24 bg-stone-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-stone-500 text-sm tracking-widest uppercase block mb-4">
            Benefits
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
            Why FurniLabs?
          </h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Designed specifically for furniture brands and interior professionals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.15 }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-stone-900 text-white">
                  <ChevronRight size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-serif font-medium mb-2">
                  {benefit.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a href="https://app.furnilabs.net" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 bg-stone-900 text-white px-10 py-4 rounded-full hover:bg-stone-700 transition-colors duration-300 group font-medium uppercase tracking-wide text-sm">
            <span>Get started now</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section id="try-now" className="py-32 bg-stone-900 text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-serif font-medium mb-8 leading-tight">
            Ready to transform your furniture business?
          </h2>
          <p className="text-xl text-stone-300 mb-12 leading-relaxed">
            Start generating stunning room visualizations today. No credit card required.
          </p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            href="https://app.furnilabs.net"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-white text-black px-12 py-5 rounded-full hover:bg-stone-100 transition-all duration-300 group font-medium uppercase tracking-wide text-lg"
          >
            <span>Try it now</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
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
            Virtual Designer • Visualize Your Dream Space • Instant Transformations •
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
      <HowItWorks />
      <UseCases />
      <Results />
      <WhyChooseUs />
      <CTASection />
      <Marquee />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
