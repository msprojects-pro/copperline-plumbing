import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Sun, Moon, Phone, MapPin, Clock, Star, Shield, 
  Droplets, Flame, Wrench, Search, Truck, Users, Award, 
  CheckCircle2, CreditCard, Facebook, Instagram, Twitter, MessageSquare,
  ArrowRight, ChevronRight, Mail, PhoneCall, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Page = 'home' | 'services' | 'about' | 'pricing' | 'contact';

// --- Components ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`glass rounded-2xl p-6 hover:copper-border-glow transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

const BentoItem = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className={`glass rounded-3xl p-8 flex flex-col justify-between hover:bg-white/10 transition-colors cursor-default ${className}`}
  >
    {children}
  </motion.div>
);

const SectionHeader = ({ title, subtitle, centered = false }: { title: string, subtitle: string, centered?: boolean }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    <motion.span 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="text-copper font-semibold tracking-widest uppercase text-sm mb-2 block"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-5xl font-bold"
    >
      {title}
    </motion.h2>
  </div>
);

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [countdown, setCountdown] = useState(90);

  // Countdown Timer Simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => (prev > 15 ? prev - 1 : 90));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const navItems: { id: Page; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className={`${isDarkMode ? 'bg-slate-dark text-white' : 'bg-slate-light text-slate-dark'} min-h-screen selection:bg-copper selection:text-white`}>
      {/* Mesh Background */}
      <div className="fixed inset-0 pointer-events-none mesh-gradient opacity-30 z-0" />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isMenuOpen ? 'h-screen' : 'h-20'} glass border-b border-white/10`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setActivePage('home')}
          >
            <div className="w-10 h-10 bg-copper rounded-lg flex items-center justify-center shadow-lg shadow-copper/20">
              <Droplets className="text-white" size={24} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-bold tracking-tight">COPPERLINE</span>
              <span className="text-[10px] tracking-[0.2em] text-copper font-semibold">PLUMBING & DRAINS</span>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`relative text-sm font-medium transition-colors hover:text-copper ${activePage === item.id ? 'text-copper' : ''}`}
              >
                {item.label}
                {activePage === item.id && (
                  <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 w-full h-0.5 bg-copper" />
                )}
              </button>
            ))}
            <div className="h-6 w-px bg-white/10 mx-2" />
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/5 transition-colors">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a href="tel:5553297400" className="bg-copper hover:bg-copper-glow text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-copper/20">
              <Phone size={16} />
              (555) 329-7400
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/5 transition-colors">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-20 left-0 w-full bg-slate-dark/95 backdrop-blur-xl border-b border-white/10 p-8 flex flex-col gap-6"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActivePage(item.id); setIsMenuOpen(false); }}
                  className={`text-2xl font-bold text-left ${activePage === item.id ? 'text-copper' : 'text-white'}`}
                >
                  {item.label}
                </button>
              ))}
              <a href="tel:5553297401" className="bg-copper text-white p-4 rounded-2xl text-center font-bold flex items-center justify-center gap-3">
                <PhoneCall size={20} />
                24/7 Emergency Dispatch
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10 pt-20">
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <motion.div key="home">
              <Home onNavigate={setActivePage} countdown={countdown} />
            </motion.div>
          )}
          {activePage === 'services' && (
            <motion.div key="services">
              <Services />
            </motion.div>
          )}
          {activePage === 'about' && (
            <motion.div key="about">
              <About />
            </motion.div>
          )}
          {activePage === 'pricing' && (
            <motion.div key="pricing">
              <Pricing />
            </motion.div>
          )}
          {activePage === 'contact' && (
            <motion.div key="contact">
              <Contact />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/40 border-t border-white/5 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-copper rounded flex items-center justify-center">
                <Droplets className="text-white" size={18} />
              </div>
              <span className="text-xl font-bold tracking-tight">COPPERLINE</span>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Phoenix's premier plumbing and drain specialists. Licensed, bonded, and insured for your peace of mind.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, MessageSquare].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-copper hover:copper-border-glow transition-all">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              {navItems.map(item => (
                <li key={item.id}>
                  <button onClick={() => setActivePage(item.id)} className="hover:text-copper transition-colors">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="text-copper shrink-0" size={18} />
                <span>4580 Industrial Blvd, Suite 120<br/>Phoenix, AZ 85040</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-copper shrink-0" size={18} />
                <a href="tel:5553297400" className="hover:text-copper">(555) 329-7400</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-copper shrink-0" size={18} />
                <a href="mailto:dispatch@copperline.com" className="hover:text-copper">dispatch@copperline.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Accreditations</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-3 rounded-xl flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                <span className="text-xs font-bold">A+ BBB</span>
              </div>
              <div className="glass p-3 rounded-xl flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                <span className="text-xs font-bold">EPA WaterSense</span>
              </div>
              <div className="glass p-3 rounded-xl flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                <span className="text-xs font-bold">AZ ROC #312847</span>
              </div>
              <div className="glass p-3 rounded-xl flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                <span className="text-xs font-bold">Google 4.8★</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2024 Copperline Plumbing & Drains. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-copper">Privacy Policy</a>
            <a href="#" className="hover:text-copper">Terms of Service</a>
            <a href="#" className="hover:text-copper">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Page Components ---

function Home({ onNavigate, countdown }: { onNavigate: (p: Page) => void, countdown: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 py-24"
    >
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-copper font-bold text-xs tracking-widest uppercase mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-copper opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-copper"></span>
            </span>
            24/7 Emergency Service Available
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold leading-[0.9] mb-8"
          >
            Your Phoenix <br/>
            <span className="text-copper copper-glow italic">Plumbers.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 max-w-lg mb-10 leading-relaxed"
          >
            Flowing Right. Day or Night. Since 2012, Copperline has been the gold standard for residential and commercial plumbing in the Valley.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <button 
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto bg-copper hover:bg-copper-glow text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-2xl shadow-copper/30 flex items-center justify-center gap-3 group"
            >
              Schedule Online
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="glass px-8 py-4 rounded-2xl">
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block">Avg. Emergency Response</span>
              <span className="text-2xl font-display font-bold text-copper">
                &lt; {countdown} MIN
              </span>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 flex flex-wrap gap-8 items-center"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-dark bg-gray-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-copper">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                </div>
                <span className="text-[10px] font-bold text-gray-500 uppercase">1,400+ Google Reviews</span>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <Shield className="text-copper" size={20} />
              <span className="text-xs font-bold uppercase tracking-tighter">A+ BBB Accredited</span>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-copper/20 blur-3xl rounded-full" />
          <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl aspect-[4/5]">
            <img 
              src="https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=1000" 
              alt="Professional Plumber" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-dark/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 glass p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-copper uppercase tracking-widest mb-1">Licensed in AZ</p>
                  <p className="text-xl font-bold">ROC #312847</p>
                </div>
                <div className="w-12 h-12 bg-copper rounded-xl flex items-center justify-center shadow-lg shadow-copper/20">
                  <Shield className="text-white" size={24} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Summary Services */}
      <section className="mb-32">
        <SectionHeader 
          subtitle="Expert Solutions" 
          title="What We Do Best" 
          centered 
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Flame, title: "Water Heaters", desc: "Tankless and traditional systems installed and repaired." },
            { icon: Droplets, title: "Leak Detection", desc: "Advanced acoustic and thermal leak locating technology." },
            { icon: Search, title: "Drain Cleaning", desc: "Hydro-jetting and camera inspections for clear lines." }
          ].map((s, i) => (
            <div key={i}>
              <GlassCard className="group">
                <div className="w-14 h-14 bg-copper/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-copper transition-colors">
                  <s.icon className="text-copper group-hover:text-white transition-colors" size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-6">{s.desc}</p>
                <button 
                  onClick={() => onNavigate('services')}
                  className="text-copper font-bold text-sm flex items-center gap-2 group/btn"
                >
                  Learn More <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </GlassCard>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

function Services() {
  const categories = [
    {
      title: "Emergency Response",
      items: ["Burst Pipes", "Sewer Backups", "Gas Leaks", "Water Heater Failure"],
      icon: Flame,
      color: "bg-red-500/10 text-red-500"
    },
    {
      title: "General Repairs",
      items: ["Leak Repair", "Clog Removal", "Toilets & Faucets", "Sump Pumps"],
      icon: Wrench,
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      title: "Installations",
      items: ["Tankless Systems", "New Fixtures", "Water Filtration", "Appliances"],
      icon: CheckCircle2,
      color: "bg-green-500/10 text-green-500"
    },
    {
      title: "Drain & Sewer",
      items: ["Hydro Jetting", "Camera Inspection", "Line Repair", "Trenchless Tech"],
      icon: Search,
      color: "bg-copper/10 text-copper"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 py-24"
    >
      <SectionHeader 
        subtitle="Our Expertise" 
        title="Full-Spectrum Plumbing" 
      />

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
        {/* Bento Grid Layout */}
        <BentoItem className="md:col-span-2 lg:col-span-3 h-[400px]">
          <div>
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-6">
              <Flame className="text-red-500" size={24} />
            </div>
            <h3 className="text-3xl font-bold mb-4">24/7 Emergency</h3>
            <p className="text-gray-400 mb-8">When disaster strikes at 3 AM, we're the ones who answer. Our emergency dispatch is always live.</p>
          </div>
          <ul className="grid grid-cols-2 gap-4">
            {["Burst Pipes", "Sewer Floods", "Gas Leaks", "No Hot Water"].map(item => (
              <li key={item} className="flex items-center gap-2 text-sm font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {item}
              </li>
            ))}
          </ul>
        </BentoItem>

        <BentoItem className="md:col-span-2 lg:col-span-3 h-[400px] bg-copper/5">
          <div>
            <div className="w-12 h-12 bg-copper/20 rounded-xl flex items-center justify-center mb-6">
              <Search className="text-copper" size={24} />
            </div>
            <h3 className="text-3xl font-bold mb-4">Drain & Sewer</h3>
            <p className="text-gray-400 mb-8">Using state-of-the-art fiber optic cameras and high-pressure hydro-jetting to clear any obstruction.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {["Trenchless Repair", "Camera Scans", "Root Removal", "Main Lines"].map(tag => (
              <span key={tag} className="px-4 py-2 glass rounded-full text-xs font-bold uppercase tracking-wider">{tag}</span>
            ))}
          </div>
        </BentoItem>

        <BentoItem className="md:col-span-2 lg:col-span-2 h-[350px]">
          <Wrench className="text-copper mb-6" size={32} />
          <h3 className="text-2xl font-bold mb-2">Repairs</h3>
          <p className="text-sm text-gray-400 mb-6">Faucets, toilets, clogs, and leaks. No job is too small for our attention to detail.</p>
          <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
            <span className="text-xs font-bold text-copper">VIEW PRICING</span>
            <ChevronRight size={16} />
          </div>
        </BentoItem>

        <BentoItem className="md:col-span-2 lg:col-span-2 h-[350px]">
          <Droplets className="text-blue-400 mb-6" size={32} />
          <h3 className="text-2xl font-bold mb-2">Installations</h3>
          <p className="text-sm text-gray-400 mb-6">Upgrading your home with modern fixtures and high-efficiency appliances.</p>
          <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
            <span className="text-xs font-bold text-copper">BOOK NOW</span>
            <ChevronRight size={16} />
          </div>
        </BentoItem>

        <BentoItem className="md:col-span-4 lg:col-span-2 h-[350px] bg-white/5">
          <Truck className="text-copper mb-6" size={32} />
          <h3 className="text-2xl font-bold mb-2">Commercial</h3>
          <p className="text-sm text-gray-400 mb-6">Grease traps, backflow testing, and large-scale boiler systems for Phoenix businesses.</p>
          <div className="flex -space-x-2 mt-auto">
            {[1,2,3].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-dark bg-gray-800 flex items-center justify-center overflow-hidden">
                <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="Team" referrerPolicy="no-referrer" />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-slate-dark bg-copper flex items-center justify-center text-[10px] font-bold">
              +8
            </div>
          </div>
        </BentoItem>
      </div>
    </motion.div>
  );
}

function About() {
  const team = [
    { name: "Tom Brennan", role: "Owner / Master Plumber", img: "https://i.pravatar.cc/300?img=11" },
    { name: "Lisa Tran", role: "Operations Director", img: "https://i.pravatar.cc/300?img=32" },
    { name: "Mike Santos", role: "Commercial Lead", img: "https://i.pravatar.cc/300?img=12" },
    { name: "Angela Brooks", role: "Office Manager", img: "https://i.pravatar.cc/300?img=44" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
        <div>
          <SectionHeader 
            subtitle="Our Story" 
            title="Built on Copper-Clad Integrity" 
          />
          <p className="text-lg text-gray-400 leading-relaxed mb-8">
            Founded in 2012 by Tom "Copper" Brennan, Copperline Plumbing & Drains started with a single truck and a simple promise: to treat every home like our own.
          </p>
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div>
              <h4 className="text-4xl font-bold text-copper mb-2">15,000+</h4>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Jobs Completed Annually</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-copper mb-2">12</h4>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Fully-Stocked Trucks</p>
            </div>
          </div>
          <GlassCard className="bg-copper/5 border-copper/20">
            <p className="italic text-gray-300 mb-4">"We don't just fix pipes; we restore peace of mind. That's the Copperline way."</p>
            <p className="font-bold text-copper">— Tom Brennan</p>
          </GlassCard>
        </div>
        <div className="relative">
          <div className="absolute -inset-10 bg-copper/10 blur-3xl rounded-full" />
          <img 
            src="https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=1000" 
            alt="Service Fleet" 
            className="rounded-[3rem] shadow-2xl relative z-10"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <section>
        <SectionHeader 
          subtitle="The Experts" 
          title="Meet the Copperline Team" 
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden mb-6">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="text-xl font-bold">{member.name}</h4>
              <p className="text-sm text-copper font-medium">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

function Pricing() {
  const guarantees = [
    { icon: Shield, title: "2-Year Warranty", desc: "Parts and labor on all repairs." },
    { icon: CreditCard, title: "0% Financing", desc: "12 months via Synchrony." },
    { icon: Award, title: "Price Match", desc: "We'll beat any written estimate by 5%." },
    { icon: Star, title: "100% Satisfaction", desc: "If you're not happy, we're not done." }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 py-24"
    >
      <div className="text-center mb-20">
        <SectionHeader 
          subtitle="Transparent Value" 
          title="Flat-Rate Pricing. No Surprises." 
          centered
        />
        <p className="max-w-2xl mx-auto text-gray-400">
          We believe in honest work for an honest price. You'll always know the total cost before we turn a single wrench.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
        {guarantees.map((g, i) => (
          <div key={i}>
            <GlassCard className="text-center">
              <div className="w-16 h-16 bg-copper/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <g.icon className="text-copper" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">{g.title}</h3>
              <p className="text-sm text-gray-400">{g.desc}</p>
            </GlassCard>
          </div>
        ))}
      </div>

      <div className="glass rounded-[3rem] p-12 md:p-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-copper/10 blur-[100px] -mr-32 -mt-32" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-4xl font-bold mb-6">Need Financing?</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Major plumbing repairs shouldn't break the bank. We offer flexible payment plans to fit any budget, including 0% interest for the first year.
            </p>
            <ul className="space-y-4 mb-10">
              {["Instant Approval", "No Down Payment", "Low Monthly Payments", "No Hidden Fees"].map(item => (
                <li key={item} className="flex items-center gap-3 font-bold text-sm">
                  <CheckCircle2 className="text-copper" size={20} />
                  {item}
                </li>
              ))}
            </ul>
            <button className="bg-white text-slate-dark px-10 py-4 rounded-2xl font-bold hover:bg-copper hover:text-white transition-all">
              Check Eligibility
            </button>
          </div>
          <div className="hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1000" 
              alt="Financing" 
              className="rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Contact() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <SectionHeader 
            subtitle="Get In Touch" 
            title="Ready to Flow Right?" 
          />
          
          <div className="space-y-8 mb-12">
            <div className="flex gap-6">
              <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center shrink-0">
                <MapPin className="text-copper" size={28} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">HQ & Dispatch</h4>
                <p className="text-gray-400">4580 Industrial Boulevard, Suite 120<br/>Phoenix, AZ 85040</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center shrink-0">
                <PhoneCall className="text-copper" size={28} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">24/7 Emergency Line</h4>
                <p className="text-copper font-bold text-xl">(555) 329-7401</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Priority Dispatch</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center shrink-0">
                <Clock className="text-copper" size={28} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Office Hours</h4>
                <p className="text-gray-400">Mon–Fri: 7:00 AM – 6:00 PM</p>
                <p className="text-gray-400">Emergency: 24/7/365</p>
              </div>
            </div>
          </div>

          <div className="glass p-8 rounded-[2rem] border-copper/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-copper rounded-full flex items-center justify-center">
                <Truck className="text-white" size={20} />
              </div>
              <h4 className="font-bold">Service Area</h4>
            </div>
            <p className="text-sm text-gray-400 mb-4">We proudly serve a 50-mile radius around Phoenix, including Scottsdale, Mesa, Chandler, and Gilbert.</p>
            <div className="h-48 bg-gray-800 rounded-2xl overflow-hidden relative grayscale hover:grayscale-0 transition-all cursor-crosshair">
              <img src="https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?auto=format&fit=crop&q=80&w=1000" alt="Phoenix Map" className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-copper/20 rounded-full animate-pulse flex items-center justify-center border border-copper/40">
                  <div className="w-4 h-4 bg-copper rounded-full shadow-lg shadow-copper" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <GlassCard className="p-10 md:p-12">
          <h3 className="text-3xl font-bold mb-8">Schedule Service</h3>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-copper focus:outline-none transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Phone Number</label>
                <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-copper focus:outline-none transition-colors" placeholder="(555) 000-0000" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Service Type</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-copper focus:outline-none transition-colors appearance-none">
                <option className="bg-slate-dark">Emergency Repair</option>
                <option className="bg-slate-dark">Drain Cleaning</option>
                <option className="bg-slate-dark">Installation</option>
                <option className="bg-slate-dark">Commercial Service</option>
                <option className="bg-slate-dark">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Message</label>
              <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-copper focus:outline-none transition-colors" placeholder="How can we help?"></textarea>
            </div>

            <div className="flex items-start gap-3">
              <input type="checkbox" id="confirm" className="mt-1 accent-copper" />
              <label htmlFor="confirm" className="text-xs text-gray-400 leading-relaxed">
                I agree to receive text confirmations and service updates. Message and data rates may apply.
              </label>
            </div>

            <button className="w-full bg-copper hover:bg-copper-glow text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-copper/20 flex items-center justify-center gap-3">
              Send Request
              <ArrowRight size={20} />
            </button>
          </form>
        </GlassCard>
      </div>
    </motion.div>
  );
}
