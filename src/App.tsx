/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Star,
  Sofa,
  Layers,
  Truck,
  Shield,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  CheckCircle,
  Send,
} from 'lucide-react';

// ─── Lenis Smooth Scroll ────────────────────────────────────────────────────
import Lenis from 'lenis';

// ─── Types ──────────────────────────────────────────────────────────────────
interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// ─── Data ───────────────────────────────────────────────────────────────────
const NAV_LINKS = ['Home', 'About', 'Collections', 'Process', 'Contact'];

const PRODUCTS = [
  {
    id: 1,
    name: 'Aria Sectional',
    category: 'Living Room',
    price: '₹1,20,000',
    gradient: 'from-stone-200 to-stone-400',
    badge: 'Bestseller',
  },
  {
    id: 2,
    name: 'Nordic Dining Set',
    category: 'Dining',
    price: '₹85,000',
    gradient: 'from-amber-100 to-amber-300',
    badge: 'New',
  },
  {
    id: 3,
    name: 'Luxe King Bed',
    category: 'Bedroom',
    price: '₹1,45,000',
    gradient: 'from-neutral-300 to-neutral-500',
    badge: 'Premium',
  },
  {
    id: 4,
    name: 'Cleo Work Desk',
    category: 'Office',
    price: '₹42,000',
    gradient: 'from-slate-200 to-slate-400',
    badge: 'Popular',
  },
  {
    id: 5,
    name: 'Terra Bookshelf',
    category: 'Storage',
    price: '₹28,000',
    gradient: 'from-orange-100 to-orange-300',
    badge: null,
  },
  {
    id: 6,
    name: 'Velvet Lounge Chair',
    category: 'Living Room',
    price: '₹38,000',
    gradient: 'from-rose-100 to-rose-300',
    badge: 'New',
  },
];

const FEATURES = [
  {
    icon: Layers,
    title: 'Crafted for Life',
    desc: 'Every piece is built with solid hardwood and premium materials that age beautifully.',
  },
  {
    icon: Truck,
    title: 'White Glove Delivery',
    desc: 'We handle delivery, assembly and placement—no stress, no damage.',
  },
  {
    icon: Shield,
    title: '5-Year Warranty',
    desc: 'Every product is backed by our comprehensive 5-year structural warranty.',
  },
  {
    icon: Star,
    title: 'Custom Finishes',
    desc: 'Choose from 40+ fabric and wood finishes to match your exact vision.',
  },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Consult', desc: 'Free in-home or virtual consultation to understand your space and style.' },
  { step: '02', title: 'Design', desc: 'Our designers craft 3D renders so you see it before it is made.' },
  { step: '03', title: 'Craft', desc: 'Skilled artisans hand-build each piece in our workshop.' },
  { step: '04', title: 'Deliver', desc: 'White-glove delivery and professional assembly at your home.' },
];

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    city: 'Mumbai',
    text: 'Furnilabs transformed our living room completely. The quality is exceptional—friends think we hired an interior designer!',
    rating: 5,
  },
  {
    name: 'Arjun Mehta',
    city: 'Delhi',
    text: 'From consultation to delivery, the team was professional and the sectional sofa fits perfectly. Worth every rupee.',
    rating: 5,
  },
  {
    name: 'Kavya Reddy',
    city: 'Bangalore',
    text: 'The custom dining table we ordered exceeded our expectations. Beautiful craftsmanship and on-time delivery.',
    rating: 5,
  },
];

// ─── Animation Variants ──────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return scrolled;
}

// ─── Components ──────────────────────────────────────────────────────────────

function Navbar() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo('home')} className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-neutral-900 rounded-sm flex items-center justify-center">
            <Sofa size={16} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-neutral-900">
            Furni<span className="text-amber-600">labs</span>
          </span>
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <button
                onClick={() => scrollTo(link)}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors relative group"
              >
                {link}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300" />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => scrollTo('contact')}
            className="px-5 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-amber-600 transition-colors duration-300"
          >
            Get a Quote
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-neutral-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-neutral-100 px-6 py-4 flex flex-col gap-4"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-left text-base font-medium text-neutral-700 py-1"
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="mt-2 w-full py-3 bg-neutral-900 text-white font-medium rounded-full"
            >
              Get a Quote
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#f5f0eb]"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-50/60 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-amber-100/40 blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Text */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-700 bg-amber-50 border border-amber-200 px-4 py-1.5 rounded-full w-fit"
          >
            <Star size={12} fill="currentColor" /> Premium Furniture Studio
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-neutral-900"
          >
            Where Craft
            <br />
            Meets{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Living.</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-amber-300/50 -z-0 rounded" />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg text-neutral-500 max-w-md leading-relaxed"
          >
            Furnilabs designs and crafts bespoke furniture that transforms every room into a
            sanctuary of beauty and function.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-2 px-7 py-3.5 bg-neutral-900 text-white font-semibold rounded-full hover:bg-amber-600 transition-all duration-300"
            >
              Explore Collection
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-7 py-3.5 border-2 border-neutral-900 text-neutral-900 font-semibold rounded-full hover:bg-neutral-900 hover:text-white transition-all duration-300"
            >
              Book Consultation
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} className="flex gap-10 pt-4 border-t border-neutral-200 mt-2">
            {[
              { val: '500+', label: 'Projects Delivered' },
              { val: '10+', label: 'Years Experience' },
              { val: '4.9★', label: 'Customer Rating' },
            ].map(({ val, label }) => (
              <div key={label}>
                <div className="text-2xl font-bold text-neutral-900">{val}</div>
                <div className="text-xs text-neutral-500 mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="relative hidden lg:block"
        >
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            {/* Main card */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-stone-200 via-amber-100 to-stone-300 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Sofa size={180} className="text-stone-400/60" strokeWidth={0.7} />
              </div>
              <div className="absolute bottom-8 left-8 right-8 bg-white/80 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-sm font-semibold text-neutral-800">Aria Sectional Sofa</div>
                <div className="text-xs text-neutral-500 mt-0.5">Custom made • 6-week delivery</div>
                <div className="text-base font-bold text-amber-700 mt-1">₹1,20,000</div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-amber-600 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-lg rotate-6">
              Bestseller
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-neutral-400"
      >
        <span className="text-xs">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
}

function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Visual grid */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
            {[
              { h: 'from-stone-200 to-stone-400', tall: true },
              { h: 'from-amber-100 to-amber-300', tall: false },
              { h: 'from-neutral-200 to-neutral-400', tall: false },
              { h: 'from-orange-100 to-orange-300', tall: true },
            ].map(({ h, tall }, i) => (
              <div
                key={i}
                className={`rounded-2xl bg-gradient-to-br ${h} flex items-center justify-center ${
                  tall ? 'row-span-2' : ''
                } ${tall ? 'min-h-64' : 'min-h-28'}`}
              >
                <Sofa
                  size={tall ? 64 : 36}
                  className="text-white/50"
                  strokeWidth={0.8}
                />
              </div>
            ))}
          </motion.div>

          {/* Text */}
          <div className="flex flex-col gap-6">
            <motion.span
              variants={fadeUp}
              className="text-xs font-semibold tracking-widest uppercase text-amber-600"
            >
              About Furnilabs
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold leading-tight text-neutral-900"
            >
              Furniture Built to
              <br />
              Last Generations
            </motion.h2>
            <motion.p variants={fadeUp} className="text-neutral-500 leading-relaxed">
              Founded with a passion for exceptional craftsmanship, Furnilabs blends traditional
              joinery techniques with modern design sensibilities. Every piece that leaves our
              workshop is a testament to the skilled hands that built it.
            </motion.p>
            <motion.p variants={fadeUp} className="text-neutral-500 leading-relaxed">
              We source sustainably harvested hardwoods and premium upholstery fabrics to create
              furniture that is not only beautiful but responsibly made.
            </motion.p>

            <motion.div
              variants={stagger}
              className="grid grid-cols-2 gap-4 pt-4"
            >
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  className="flex flex-col gap-2 p-4 rounded-2xl bg-neutral-50 hover:bg-amber-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
                    <Icon size={18} className="text-amber-700" />
                  </div>
                  <div className="font-semibold text-neutral-800 text-sm">{title}</div>
                  <div className="text-xs text-neutral-500 leading-relaxed">{desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Collections() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="collections" ref={ref} className="py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
          <motion.span
            variants={fadeUp}
            className="text-xs font-semibold tracking-widest uppercase text-amber-500"
          >
            Our Collections
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-white mt-3"
          >
            Designed for Every Space
          </motion.h2>
          <motion.p variants={fadeUp} className="text-neutral-400 mt-4 max-w-xl mx-auto">
            From cozy living rooms to productive home offices — our collections cover every corner
            of your home with timeless style.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PRODUCTS.map((product) => (
            <motion.div
              key={product.id}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="group rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-amber-600/50 transition-all duration-300 cursor-pointer"
            >
              <div
                className={`relative h-52 bg-gradient-to-br ${product.gradient} flex items-center justify-center`}
              >
                <Sofa size={80} className="text-white/40" strokeWidth={0.7} />
                {product.badge && (
                  <span className="absolute top-4 right-4 text-xs font-bold bg-amber-600 text-white px-2.5 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="text-xs text-amber-500 font-semibold uppercase tracking-wider">
                  {product.category}
                </div>
                <div className="text-white font-bold text-lg mt-1">{product.name}</div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-amber-400 font-semibold">{product.price}</span>
                  <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-1 text-xs text-neutral-400 group-hover:text-amber-400 transition-colors font-medium"
                  >
                    Enquire <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mt-12"
        >
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3.5 border border-amber-600 text-amber-500 font-semibold rounded-full hover:bg-amber-600 hover:text-white transition-all duration-300"
          >
            Request Custom Design
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="process" ref={ref} className="py-24 bg-[#f5f0eb]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="text-xs font-semibold tracking-widest uppercase text-amber-600"
          >
            How It Works
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-neutral-900 mt-3"
          >
            Simple. Seamless. Stunning.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {PROCESS_STEPS.map(({ step, title, desc }, i) => (
            <motion.div
              key={step}
              variants={fadeUp}
              className="relative p-7 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              {i < PROCESS_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-3 w-6 h-0.5 bg-amber-300 z-10" />
              )}
              <div className="text-5xl font-black text-amber-200 leading-none mb-4">{step}</div>
              <div className="font-bold text-xl text-neutral-900 mb-2">{title}</div>
              <div className="text-neutral-500 text-sm leading-relaxed">{desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
          <motion.span
            variants={fadeUp}
            className="text-xs font-semibold tracking-widest uppercase text-amber-600"
          >
            Testimonials
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-neutral-900 mt-3"
          >
            Loved by Homeowners
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map(({ name, city, text, rating }) => (
            <motion.div
              key={name}
              variants={fadeUp}
              className="p-7 rounded-2xl bg-neutral-50 flex flex-col gap-4"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-amber-500 fill-amber-500" />
                ))}
              </div>
              <p className="text-neutral-600 leading-relaxed italic">"{text}"</p>
              <div>
                <div className="font-bold text-neutral-900">{name}</div>
                <div className="text-xs text-neutral-400">{city}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState<ContactForm>({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send');
      }
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" ref={ref} className="py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-16 items-start"
        >
          {/* Info */}
          <div className="flex flex-col gap-8">
            <div>
              <motion.span
                variants={fadeUp}
                className="text-xs font-semibold tracking-widest uppercase text-amber-500"
              >
                Get In Touch
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="text-4xl md:text-5xl font-bold text-white mt-3 leading-tight"
              >
                Let's Build Your
                <br />
                Dream Space
              </motion.h2>
              <motion.p variants={fadeUp} className="text-neutral-400 mt-4 leading-relaxed">
                Whether you have a specific piece in mind or need help designing an entire room,
                our team is ready to bring your vision to life.
              </motion.p>
            </div>

            <motion.div variants={stagger} className="flex flex-col gap-4">
              {[
                { icon: Phone, text: '+91 98765 43210' },
                { icon: Mail, text: 'furnilabs13@gmail.com' },
                { icon: MapPin, text: 'Delhi NCR & Mumbai, India' },
              ].map(({ icon: Icon, text }) => (
                <motion.div
                  key={text}
                  variants={fadeUp}
                  className="flex items-center gap-4 text-neutral-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-600/20 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-amber-500" />
                  </div>
                  <span>{text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:border-amber-600 hover:text-amber-500 cursor-pointer transition-colors"
                >
                  <Icon size={16} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            variants={fadeUp}
            className="bg-neutral-900 rounded-2xl p-8 border border-neutral-800"
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <CheckCircle size={48} className="text-green-500" />
                <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                <p className="text-neutral-400">
                  Thanks for reaching out. Our team will contact you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2.5 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-500 transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Rahul Sharma"
                      className="bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="rahul@example.com"
                    className="bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or the furniture you need..."
                    className="bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-sm bg-red-500/10 rounded-lg px-4 py-2">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-amber-600 hover:bg-amber-500 disabled:bg-amber-600/50 text-white font-semibold rounded-xl transition-colors duration-300"
                >
                  {status === 'loading' ? (
                    <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                  ) : (
                    <>
                      <Send size={16} />
                      Send Enquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-600 rounded-sm flex items-center justify-center">
                <Sofa size={16} className="text-white" />
              </div>
              <span className="font-bold text-xl text-white">
                Furni<span className="text-amber-500">labs</span>
              </span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Premium furniture studio crafting bespoke pieces for discerning homes across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-white font-semibold mb-4">Quick Links</div>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <button
                    onClick={() =>
                      document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="text-sm text-neutral-400 hover:text-amber-400 transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <div className="text-white font-semibold mb-4">Collections</div>
            <ul className="flex flex-col gap-2">
              {['Living Room', 'Bedroom', 'Dining', 'Office', 'Storage', 'Outdoor'].map((c) => (
                <li key={c}>
                  <span className="text-sm text-neutral-400">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-white font-semibold mb-4">Contact</div>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2 text-sm text-neutral-400">
                <Mail size={14} className="text-amber-500" /> furnilabs13@gmail.com
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-400">
                <Phone size={14} className="text-amber-500" /> +91 98765 43210
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-400">
                <MapPin size={14} className="text-amber-500" /> Delhi NCR & Mumbai
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row justify-between gap-4 items-center">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Furnilabs. All rights reserved.
          </p>
          <div className="flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-500 hover:border-amber-600 hover:text-amber-500 cursor-pointer transition-colors"
              >
                <Icon size={14} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="font-sans antialiased">
      <Navbar />
      <Hero />
      <About />
      <Collections />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
