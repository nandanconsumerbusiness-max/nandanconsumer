import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, ChevronRight, Facebook, Linkedin, Twitter, ShieldCheck, Zap, Home as HomeIcon, Eye, EyeOff, Info, UserCircle, Download, Cable, Shield, Lightbulb, Plug, Cpu, Sun, Boxes, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logo from './assets/logo.jpeg';
import gallery1 from './assets/Photos-3-001/IMG_20240316_162436.jpg';
import gallery2 from './assets/Photos-3-001/IMG20170923104719.jpg';
import gallery3 from './assets/Photos-3-001/IMG20180113131012.jpg';
import gallery4 from './assets/Photos-3-001/Photo0018.jpg';
import gallery5 from './assets/Photos-3-001/IMG-20170615-WA0076.jpg';
import gallery6 from './assets/Photos-3-001/IMG20170429090941.jpg';
import gallery7 from './assets/Photos-3-001/IMG-20170615-WA0047.jpg';
import gallery8 from './assets/Photos-3-001/IMG-20170709-WA0044.jpg';
import gallery9 from './assets/Photos-3-001/IMG20161002174626.jpg';
import gallery10 from './assets/Photos-3-001/IMG20170426182440.jpg';
import gallery11 from './assets/Photos-3-001/IMG20170911115032.jpg';
import gallery12 from './assets/Photos-3-001/Photo0015.jpg';

// --- Types ---
export type Page = 'home' | 'about' | 'services' | 'products' | 'gallery' | 'certificates' | 'signup' | 'contact' | 'privacy' | 'terms' | 'dashboard';

const pageToPath: Record<Page, string> = {
  home: '/',
  about: '/about',
  services: '/services',
  products: '/products',
  gallery: '/gallery',
  certificates: '/certificates',
  signup: '/signup',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
  dashboard: '/dashboard',
};

const pathToPage = (path: string): Page => {
  const normalized = path.split('?')[0];
  const entry = (Object.entries(pageToPath) as [Page, string][])
    .find(([, p]) => p === normalized);
  return entry ? entry[0] : 'home';
};

// --- Components ---

const Navbar = ({
  currentPage,
  setCurrentPage,
  isLoggedIn,
}: {
  currentPage: Page;
  setCurrentPage: (p: Page) => void;
  isLoggedIn: boolean;
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string, value: Page }[] = [
    { label: 'Home', value: 'home' },
    { label: 'About Us', value: 'about' },
    { label: 'Gallery', value: 'gallery' },
    { label: 'Certificates', value: 'certificates' },
    { label: 'Contact', value: 'contact' },
  ];

  const handleProductAnchor = (anchor: string, closeMenu?: () => void) => {
    setCurrentPage('products');
    navigate(`/products#${anchor}`);
    if (closeMenu) closeMenu();
    setTimeout(() => {
      const target = document.getElementById(anchor);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white border-b border-slate-200 py-3' : 'bg-white border-b border-slate-100 py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mr-4 border border-slate-200 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <img src={logo} alt="Nandan Consumer Equipments logo" className="w-14 h-14 object-contain" />
            </div>
            <div className="hidden sm:block">
              <span className="text-brand-900 font-bold text-lg leading-tight block uppercase tracking-wider">Nandan Consumer</span>
              <span className="text-slate-500 text-[10px] block uppercase tracking-[0.2em]">Equipments Pvt Ltd</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.value}
                to={pageToPath[link.value]}
                className={`group relative text-sm font-semibold transition-colors duration-300 hover:text-brand-700 ${currentPage === link.value ? 'text-brand-700' : 'text-slate-600'}`}
              >
                {link.label}
                <span
                  className={`pointer-events-none absolute -bottom-2 left-0 h-0.5 w-full origin-left rounded-full bg-brand-600 transition-transform duration-300 ${currentPage === link.value ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100`}
                />
              </Link>
            ))}
            <div className="relative group">
              <Link
                to="/products"
                className={`group relative text-sm font-semibold transition-colors duration-300 hover:text-brand-700 ${currentPage === 'products' ? 'text-brand-700' : 'text-slate-600'}`}
              >
                Products
                <span
                  className={`pointer-events-none absolute -bottom-2 left-0 h-0.5 w-full origin-left rounded-full bg-brand-600 transition-transform duration-300 ${currentPage === 'products' ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100`}
                />
              </Link>
              <div className="absolute left-0 top-full pt-3 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                <div className="w-56 rounded-xl border border-slate-200 bg-white shadow-xl p-3">
                  {[
                    { label: 'Electronics', anchor: 'electronics' },
                    { label: 'Insurance Services', anchor: 'insurance' },
                    { label: 'Real Estate Services', anchor: 'realestate' },
                    { label: 'Finance Services', anchor: 'finance' },
                  ].map((item) => (
                    <button
                      key={item.anchor}
                      onClick={() => handleProductAnchor(item.anchor)}
                      className="block w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className="bg-gradient-to-r from-[#007bff] to-[#00c6ff] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:shadow-[0_10px_25px_rgba(0,123,255,0.25)] transition-all duration-300 shadow-sm"
                >
                  Profile
                </button>
              ) : (
                <button
                  onClick={() => setCurrentPage('signup')}
                  className="bg-gradient-to-r from-[#007bff] to-[#00c6ff] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:shadow-[0_10px_25px_rgba(0,123,255,0.25)] transition-all duration-300 shadow-sm"
                >
                  Sign Up
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.value}
                  to={pageToPath[link.value]}
                  onClick={() => setIsOpen(false)}
                  className={`block w-full text-left px-3 py-4 text-base font-semibold border-b border-slate-50 transition-colors ${currentPage === link.value ? 'text-brand-700 bg-brand-50/70' : 'text-slate-600 hover:text-brand-700'}`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-b border-slate-50">
                <Link
                  to="/products"
                  onClick={() => setIsOpen(false)}
                  className={`block w-full text-left px-3 py-4 text-base font-semibold transition-colors ${currentPage === 'products' ? 'text-brand-700 bg-brand-50/70' : 'text-slate-600 hover:text-brand-700'}`}
                >
                  Products
                </Link>
                <div className="pb-3">
                  {[
                    { label: 'Electronics', anchor: 'electronics' },
                    { label: 'Insurance Services', anchor: 'insurance' },
                    { label: 'Real Estate Services', anchor: 'realestate' },
                    { label: 'Finance Services', anchor: 'finance' },
                  ].map((item) => (
                    <button
                      key={item.anchor}
                      onClick={() => handleProductAnchor(item.anchor, () => setIsOpen(false))}
                      className="block w-full text-left px-6 py-2 text-sm font-medium text-slate-600 hover:text-brand-700"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pt-4">
                <button 
                  onClick={() => {
                    setCurrentPage('contact');
                    setIsOpen(false);
                  }}
                  className="w-full bg-brand-600 text-white px-5 py-3 rounded-lg text-center font-semibold"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => {
  return (
    <footer className="bg-white text-slate-700 pt-16 pb-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-3 border border-slate-200 shadow-sm">
                <img src={logo} alt="Nandan Consumer Equipments logo" className="w-10 h-10 object-contain" />
              </div>
              <span className="text-slate-900 font-bold text-lg uppercase tracking-wider">Nandan Consumer</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              A registered Indian company dedicated to providing high-quality professional services across real estate, finance, and insurance sectors.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold mb-6 uppercase text-xs tracking-widest">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => setCurrentPage('home')} className="hover:text-slate-900 transition-colors">Home</button></li>
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-slate-900 transition-colors">About Us</button></li>
              <li><Link to="/products#electronics" className="hover:text-slate-900 transition-colors">Electronics</Link></li>
              <li><button onClick={() => setCurrentPage('products')} className="hover:text-slate-900 transition-colors">Products</button></li>
              <li><button onClick={() => setCurrentPage('certificates')} className="hover:text-slate-900 transition-colors">Certificates</button></li>
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-slate-900 transition-colors">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold mb-6 uppercase text-xs tracking-widest">Business Areas</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li>Finance Services</li>
              <li>Insurance Services</li>
              <li>Real Estate Services</li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold mb-6 uppercase text-xs tracking-widest">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin size={18} className="text-slate-600 mr-3 shrink-0 mt-0.5" />
                <span>Vinayaka Nagar, Road No-1, Near Water Tank, Pedda Amberpet, Hyderabad, Telangana – 501505, India</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-slate-600 mr-3 shrink-0" />
                <span>+91 63017 21221</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-slate-600 mr-3 shrink-0" />
                <span>info@nandanconsumer.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© 2026 NANDAN CONSUMER EQUIPMENTS PRIVATE LIMITED. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button onClick={() => setCurrentPage('privacy')} className="hover:text-slate-900 transition-colors">Privacy Policy</button>
            <button onClick={() => setCurrentPage('terms')} className="hover:text-slate-900 transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Page Content ---

const HomePage = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => {
  const services = [
    { title: 'Real Estate Services', icon: <HomeIcon size={24} />, desc: 'Property advisory and support for residential and commercial needs.' },
    { title: 'Finance Services', icon: <ShieldCheck size={24} />, desc: 'Structured financial guidance with end-to-end coordination.' },
    { title: 'Insurance Services', icon: <ShieldCheck size={24} />, desc: 'Coverage advisory and policy support tailored to client needs.' },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-white py-20 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="lg:w-2/3">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-widest rounded-full mb-6"
            >
              Excellence in Consumer Equipments
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
            >
              Empowering Progress Through <span className="text-brand-600">Innovation</span> and Quality
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 mb-10 max-w-2xl leading-relaxed"
            >
              Nandan Consumer Equipments Private Limited provides professional services across Real Estate, Finance, and Insurance sectors with a focus on reliability and transparency.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <button 
                onClick={() => setCurrentPage('contact')}
                className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-sm flex items-center justify-center"
              >
                Contact Us <ChevronRight size={18} className="ml-2" />
              </button>
              <button 
                onClick={() => setCurrentPage('about')}
                className="bg-white text-slate-900 border border-slate-300 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all flex items-center justify-center"
              >
                Learn More
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/corporate/800/600" 
                alt="Corporate Office" 
                className="rounded-2xl shadow-2xl relative z-10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-brand-600 rounded-2xl -z-0 hidden md:block"></div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">A Legacy of Trust and Professionalism</h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Nandan Consumer Equipments Private Limited is a registered Indian company based in Hyderabad. We focus on delivering trusted real estate, finance, and insurance services with a professional, client-first approach.
                </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Our commitment to quality and customer satisfaction has made us a preferred partner for real estate, finance, and insurance services across the region.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="font-semibold text-slate-800">GST Registered</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="font-semibold text-slate-800">MSME Registered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Areas */}
      <section className="py-24 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Business Areas</h2>
              <p className="text-white/90 max-w-2xl mx-auto">We focus on core service areas tailored to meet the evolving needs of our clients.</p>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentPage('products')}
                className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="w-14 h-14 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{service.desc}</p>
                <button 
                  onClick={() => setCurrentPage('products')}
                  className="text-brand-600 font-semibold text-sm flex items-center hover:underline"
                >
                  Learn More <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Project Gallery</h2>
            <p className="text-white/90 max-w-2xl mx-auto">A glimpse of our on-ground work and completed projects.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[gallery1, gallery2, gallery3, gallery4, gallery5, gallery6].map((img, idx) => (
              <div key={idx} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                <img
                  src={img}
                  alt={`Project gallery ${idx + 1}`}
                  className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-12 lg:p-16 border border-slate-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-8">Why Choose Nandan Consumer Equipments?</h2>
                  <div className="space-y-8">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-4 shrink-0">
                        <ShieldCheck size={20} className="text-slate-700" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Reliable & Trustworthy</h4>
                        <p className="text-slate-600 text-sm">As a registered corporate entity, we adhere to the highest standards of business ethics and transparency.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-4 shrink-0">
                        <ShieldCheck size={20} className="text-slate-700" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Professional Services</h4>
                        <p className="text-slate-600 text-sm">Our team consists of experienced professionals dedicated to delivering excellence in every project.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-4 shrink-0">
                        <ShieldCheck size={20} className="text-slate-700" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">Quality Workmanship</h4>
                        <p className="text-slate-600 text-sm">We use premium materials and advanced techniques to ensure the longevity and performance of our solutions.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl text-center">
                    <div className="text-4xl font-bold mb-2">100%</div>
                    <div className="text-xs uppercase tracking-widest text-slate-500">Compliance</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl text-center">
                    <div className="text-4xl font-bold mb-2">24/7</div>
                    <div className="text-xs uppercase tracking-widest text-slate-500">Support</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl text-center">
                    <div className="text-4xl font-bold mb-2">5+</div>
                    <div className="text-xs uppercase tracking-widest text-slate-500">Sectors</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl text-center">
                    <div className="text-4xl font-bold mb-2">India</div>
                    <div className="text-xs uppercase tracking-widest text-slate-500">Wide Reach</div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-slate-50/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="flex items-center space-x-2">
               <ShieldCheck size={24} className="text-brand-600" />
               <span className="font-bold text-slate-800 tracking-tight">INCORPORATED COMPANY</span>
             </div>
             <div className="flex items-center space-x-2">
               <ShieldCheck size={24} className="text-brand-600" />
               <span className="font-bold text-slate-800 tracking-tight">GST REGISTERED</span>
             </div>
             <div className="flex items-center space-x-2">
               <ShieldCheck size={24} className="text-brand-600" />
               <span className="font-bold text-slate-800 tracking-tight">MSME REGISTERED</span>
             </div>
             <div className="flex items-center space-x-2">
               <ShieldCheck size={24} className="text-brand-600" />
               <span className="font-bold text-slate-800 tracking-tight">GOVT REGISTERED</span>
             </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to Start Your Project?</h2>
          <p className="text-slate-600 mb-10 text-lg">Contact our professional team today for a consultation and discover how we can help your business grow.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={() => setCurrentPage('contact')}
              className="w-full sm:w-auto bg-brand-600 text-white px-10 py-4 rounded-full font-bold hover:bg-brand-700 transition-all"
            >
              Contact Us Now
            </button>
            <div className="flex items-center text-slate-700 font-semibold">
              <Phone size={20} className="mr-2 text-brand-600" />
              <span>+91 63017 21221</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const GalleryPage = () => {
  const images = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
    gallery7,
    gallery8,
    gallery9,
    gallery10,
    gallery11,
    gallery12,
  ];
  const [preview, setPreview] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const zoomIn = () => setZoom((z) => Math.min(3, Number((z + 0.25).toFixed(2))));
  const zoomOut = () => setZoom((z) => Math.max(0.5, Number((z - 0.25).toFixed(2))));
  const resetZoom = () => setZoom(1);
  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-[#0ea5e9] via-[#2563eb] to-[#7c3aed] py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Gallery</h1>
          <p className="text-white/90 max-w-3xl">Explore our recent projects and on-ground work.</p>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPreview(img);
                  resetZoom();
                }}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 text-left"
              >
                <img
                  src={img}
                  alt={`Gallery image ${idx + 1}`}
                  className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </button>
            ))}
          </div>
          {preview && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
              <div className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden">
                <div className="absolute right-4 top-4 flex items-center gap-2 z-10">
                  <button onClick={zoomOut} className="rounded-full bg-white border border-slate-200 px-3 py-1 text-sm font-semibold">-</button>
                  <button onClick={resetZoom} className="rounded-full bg-white border border-slate-200 px-3 py-1 text-sm font-semibold">Reset</button>
                  <button onClick={zoomIn} className="rounded-full bg-white border border-slate-200 px-3 py-1 text-sm font-semibold">+</button>
                  <button onClick={() => setPreview(null)} className="rounded-full bg-white border border-slate-200 px-3 py-1 text-sm font-semibold">Close</button>
                </div>
                <div className="max-h-[85vh] overflow-auto bg-white flex items-center justify-center">
                  <img
                    src={preview}
                    alt="Gallery preview"
                    className="object-contain"
                    style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-[#0ea5e9] via-[#2563eb] to-[#7c3aed] py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-white/90 max-w-2xl">Learn more about our journey, our values, and our commitment to excellence.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Company Introduction</h2>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  NANDAN CONSUMER EQUIPMENTS PRIVATE LIMITED is a registered corporate entity based in Hyderabad, India. Founded with a vision to provide integrated solutions across multiple industrial and consumer sectors, we have grown into a trusted name for quality and reliability.
                </p>
                <p>
                  Our expertise spans Real Estate Services, Finance Services, and Insurance Services. This focused portfolio allows us to offer comprehensive solutions with a single point of contact and clear accountability.
                </p>
                <p>
                  We operate with a professional approach, leveraging best practices to deliver services on time with transparent communication.
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-white/90 p-8 rounded-2xl border border-slate-100">
                <h3 className="text-xl font-bold text-brand-700 mb-4">Our Vision</h3>
                <p className="text-slate-600">To be a leading professional services company in India, recognized for trust, transparency, and excellence in real estate, finance, and insurance services.</p>
              </div>
              <div className="bg-white/90 p-8 rounded-2xl border border-slate-100">
                <h3 className="text-xl font-bold text-brand-700 mb-4">Our Mission</h3>
                <p className="text-slate-600">To empower our clients through reliable real estate, finance, and insurance services while maintaining the highest standards of professionalism and transparency.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Professional Approach</h2>
            <p className="text-white/90 max-w-2xl mx-auto">We follow a structured methodology to ensure every project meets our rigorous quality standards.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-brand-600 font-bold text-4xl mb-4">01</div>
              <h4 className="text-lg font-bold mb-2">Planning & Strategy</h4>
              <p className="text-slate-600 text-sm">Every project begins with thorough planning and a clear strategy to ensure all objectives are met efficiently.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-brand-600 font-bold text-4xl mb-4">02</div>
              <h4 className="text-lg font-bold mb-2">Execution & Quality</h4>
              <p className="text-slate-600 text-sm">Our experienced team executes the plan with precision, maintaining strict quality control at every stage.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-brand-600 font-bold text-4xl mb-4">03</div>
              <h4 className="text-lg font-bold mb-2">Delivery & Support</h4>
              <p className="text-slate-600 text-sm">We ensure timely delivery and provide ongoing support to ensure long-term success for our clients.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ServicesPage = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => {
  const serviceList = [
    {
      title: 'Real Estate Services',
      icon: <HomeIcon size={24} />,
      desc: 'End-to-end real estate support for residential, commercial, and industrial needs with a focus on transparent processes.',
      points: ['Property advisory and sourcing', 'Documentation support', 'Site visits and valuation guidance'],
    },
    {
      title: 'Finance Services',
      icon: <ShieldCheck size={24} />,
      desc: 'Project and asset-focused financial guidance to help clients structure funding with clarity and confidence.',
      points: ['Requirement assessment', 'Documentation assistance', 'End-to-end coordination'],
    },
    {
      title: 'Insurance Services',
      icon: <ShieldCheck size={24} />,
      desc: 'Insurance consulting and policy support tailored to client needs across assets and operations.',
      points: ['Coverage advisory', 'Claim support guidance', 'Policy renewal support'],
    },
  ];

  return (
    <div className="pt-16">
        <section className="bg-gradient-to-br from-[#0ea5e9] via-[#2563eb] to-[#7c3aed] py-20 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">Services</h1>
            <p className="text-white/90 max-w-3xl">
              We provide professional services across real estate, finance, and insurance domains. Our team focuses on clarity, compliance, and reliable delivery for every engagement.
            </p>
          </div>
        </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What We Offer</h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              Structured service delivery backed by experienced professionals and a commitment to quality.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceList.map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-14 h-14 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{service.desc}</p>
                <ul className="text-sm text-slate-600 space-y-2">
                  {service.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start">
                      <span className="mt-1.5 mr-2 h-1.5 w-1.5 rounded-full bg-brand-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">How We Work</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Our process is designed to be transparent and client-first. We begin with requirement mapping, move to structured planning, and execute with consistent updates at every milestone.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center mr-4">1</div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Requirement Mapping</h4>
                    <p className="text-sm text-slate-600">We capture scope, timelines, and compliance needs early to avoid surprises later.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center mr-4">2</div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Planning & Coordination</h4>
                    <p className="text-sm text-slate-600">Dedicated coordination for documentation, approvals, and service scheduling.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center mr-4">3</div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Execution & Support</h4>
                    <p className="text-sm text-slate-600">Consistent progress updates with post-service guidance and assistance.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Service Highlights</h3>
              <div className="space-y-5 text-sm text-slate-600">
                <div className="flex items-start">
                  <ShieldCheck size={18} className="text-brand-600 mr-3 mt-1" />
                  <span>Professional handling with attention to compliance and documentation quality.</span>
                </div>
                <div className="flex items-start">
                  <ShieldCheck size={18} className="text-brand-600 mr-3 mt-1" />
                  <span>Clear communication across project stages with predictable timelines.</span>
                </div>
                <div className="flex items-start">
                  <ShieldCheck size={18} className="text-brand-600 mr-3 mt-1" />
                  <span>Single-window coordination for multi-service requirements.</span>
                </div>
                <div className="flex items-start">
                  <ShieldCheck size={18} className="text-brand-600 mr-3 mt-1" />
                  <span>Trusted delivery backed by experienced teams and partners.</span>
                </div>
              </div>
              <div className="mt-10">
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="w-full bg-brand-600 text-white py-4 rounded-lg font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-100"
                >
                  Request a Consultation
                </button>
                <div className="mt-4 flex items-center justify-center text-slate-600 font-semibold">
                  <Phone size={18} className="mr-2 text-brand-600" />
                  <span>+91 63017 21221</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProductsPage = () => {
  const navigate = useNavigate();
  const products = [
    {
      title: 'Electrical Cables & Wires',
      desc: 'High-quality house wiring, industrial cables, and flexible cords designed for durability, safety, and long-term performance.',
      icon: <Cable size={24} />,
    },
    {
      title: 'Switchgear & Protection',
      desc: 'Advanced protection devices including MCB, MCCB, RCCB, isolators, and surge protectors ensuring complete electrical safety.',
      icon: <Shield size={24} />,
    },
    {
      title: 'Panels & Control Systems',
      desc: 'Custom-built LT panels, control panels, starters, and automation-ready solutions for industrial efficiency.',
      icon: <Zap size={24} />,
    },
    {
      title: 'Lighting Solutions',
      desc: 'Energy-efficient LED lighting solutions for indoor, outdoor, commercial, and industrial environments.',
      icon: <Lightbulb size={24} />,
    },
    {
      title: 'Earthing & Lightning',
      desc: 'Reliable earthing systems and lightning protection solutions for enhanced safety and compliance.',
      icon: <ShieldCheck size={24} />,
    },
    {
      title: 'Electrical Accessories',
      desc: 'Complete range of switches, sockets, conduits, and wiring accessories for all installation needs.',
      icon: <Plug size={24} />,
    },
    {
      title: 'Electronics & Components',
      desc: 'Essential components including power supplies, connectors, sensors, and adapters for modern applications.',
      icon: <Cpu size={24} />,
    },
    {
      title: 'Consumer Electronics',
      desc: 'Home and office electronics including power backup systems and essential appliances.',
      icon: <HomeIcon size={24} />,
    },
    {
      title: 'Solar Electricals',
      desc: 'Sustainable solar solutions including inverters, controllers, and solar distribution systems.',
      icon: <Sun size={24} />,
    },
  ];
  const serviceList = [
    {
      id: 'realestate',
      title: 'Real Estate Services',
      icon: <HomeIcon size={24} />,
      desc: 'End-to-end real estate support for residential, commercial, and industrial needs with a focus on transparent processes.',
      points: ['Property advisory and sourcing', 'Documentation support', 'Site visits and valuation guidance'],
    },
    {
      id: 'finance',
      title: 'Finance Services',
      icon: <ShieldCheck size={24} />,
      desc: 'Project and asset-focused financial guidance to help clients structure funding with clarity and confidence.',
      points: ['Requirement assessment', 'Documentation assistance', 'End-to-end coordination'],
    },
    {
      id: 'insurance',
      title: 'Insurance Services',
      icon: <Shield size={24} />,
      desc: 'Insurance consulting and policy support tailored to client needs across assets and operations.',
      points: ['Coverage advisory', 'Claim support guidance', 'Policy renewal support'],
    },
  ];

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-[#0ea5e9] via-[#2563eb] to-[#7c3aed] py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Comprehensive Electrical &amp; Electronics Solutions</h1>
          <p className="text-white/90 max-w-3xl text-lg">
            We provide end-to-end electrical and electronic products for residential, commercial, and industrial applications.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              'Industrial Grade Products',
              'Certified & Reliable',
              'Bulk Supply Available',
              'Trusted by Contractors & Businesses',
            ].map((badge) => (
              <span key={badge} className="bg-white/15 text-white text-sm px-4 py-2 rounded-full">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="electronics" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Electrical & Electronics Product Range</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We supply a wide range of electrical and electronics products for residential, commercial, and industrial needs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-[#f8fbff] to-[#eef7ff] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.05] hover:shadow-xl hover:border-[#60a5fa]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#eef7ff] text-[#0b6fe0] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>



          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Service Solutions</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Professional real estate, finance, and insurance services delivered with clarity, compliance, and reliable execution.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceList.map((service) => (
                <div
                  key={service.id}
                  id={service.id}
                  className="group bg-gradient-to-br from-white via-[#f8fbff] to-[#eef7ff] p-8 rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-xl hover:border-[#60a5fa]"
                >
                  <div className="w-14 h-14 bg-[#eef7ff] rounded-xl flex items-center justify-center text-brand-600 mb-6 transition-transform duration-300 group-hover:scale-110">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{service.desc}</p>
                  <ul className="text-sm text-slate-600 space-y-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start">
                        <span className="mt-1.5 mr-2 h-1.5 w-1.5 rounded-full bg-brand-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Why Choose Us</h3>
              <ul className="text-slate-600 space-y-3">
                {[
                  'Wide Product Range',
                  'Competitive Pricing',
                  'Quality Assured Products',
                  'Timely Delivery',
                  'Expert Support',
                ].map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-brand-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 p-8 bg-gradient-to-br from-[#0ea5e9] to-[#7c3aed] text-white shadow-sm">
              <h3 className="text-2xl font-bold mb-3">Looking for Reliable Electrical Products?</h3>
              <p className="text-white/90 mb-6">We support bulk orders and custom requirements for contractors and businesses.</p>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 rounded-full bg-white text-[#0b6fe0] px-6 py-3 text-sm font-semibold shadow-sm hover:shadow-[0_10px_25px_rgba(255,255,255,0.25)] transition"
              >
                <Boxes size={18} />
                Contact Us for Bulk Orders
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ComingSoonPage = ({ title }: { title: string }) => {
  return (
    <div className="pt-16 min-h-[70vh] flex items-center justify-center bg-slate-50/70">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 mx-auto mb-8">
          <Zap size={40} />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{title}</h1>
        <div className="w-24 h-1 bg-brand-600 mx-auto mb-8"></div>
        <p className="text-xl text-slate-600 mb-8 font-medium">Under Development / Coming Soon</p>
        <p className="text-slate-500 leading-relaxed">
          We are currently working on a detailed catalog of our {title.toLowerCase()}. Our team is curating the best solutions to showcase our expertise and offerings. Please check back soon or contact us directly for immediate inquiries.
        </p>
        <div className="mt-12 p-6 bg-white rounded-xl border border-slate-200 shadow-sm inline-block">
          <p className="text-sm font-semibold text-slate-700">For immediate assistance, call us at:</p>
          <p className="text-brand-600 font-bold text-lg">+91 63017 21221</p>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-[#0ea5e9] via-[#2563eb] to-[#7c3aed] py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-white/90 max-w-2xl">Have a question or a project in mind? Reach out to us and we'll get back to you as soon as possible.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1 space-y-12">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 mr-4 shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">Office Address</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Vinayaka Nagar, Road No-1<br />
                        Near Water Tank, Pedda Amberpet<br />
                        Hyderabad, Telangana – 501505, India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 mr-4 shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">Phone Number</h4>
                      <p className="text-slate-600 text-sm">+91 63017 21221</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 mr-4 shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">Email Address</h4>
                      <p className="text-slate-600 text-sm">info@nandanconsumer.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 p-8 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-4">Business Hours</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex justify-between"><span>Monday - Friday</span> <span>9:00 AM - 6:00 PM</span></li>
                  <li className="flex justify-between"><span>Saturday</span> <span>10:00 AM - 4:00 PM</span></li>
                  <li className="flex justify-between"><span>Sunday</span> <span>Closed</span></li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white p-8 lg:p-12 rounded-2xl border border-slate-100 shadow-xl shadow-slate-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                      placeholder="+91 63017 21221"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Message</label>
                    <textarea 
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-brand-600 text-white py-4 rounded-lg font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-100"
                  >
                    Send Message
                  </button>
                </form>

                <AnimatePresence>
                  {submitted && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-6 p-4 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100 text-center font-medium"
                    >
                      Thank you! Your message has been sent successfully.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const SignUpPage = ({
  setCurrentPage,
  setIsLoggedIn,
}: {
  setCurrentPage: (p: Page) => void;
  setIsLoggedIn: (v: boolean) => void;
}) => {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });
  const [registerType, setRegisterType] = useState<'preferred' | 'business' | null>(null);
  const [registerData, setRegisterData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    aboKnown: 'yes' as 'yes' | 'no',
    pincode: '',
    aboId: '',
  });
  const [pinVerified, setPinVerified] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState<string | null>(null);
  const [showReset, setShowReset] = useState(false);
  const [resetData, setResetData] = useState({ mobile: '', otp: '', newPassword: '' });
  const [otpInfo, setOtpInfo] = useState<string | null>(null);

  const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoginSuccess(null);
    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: formData.phone, password: formData.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Login failed.');
      }
      const userPayload = data?.user || { mobile: formData.phone };
      localStorage.setItem('nandan_auth', JSON.stringify(userPayload));
      setIsLoggedIn(true);
      setLoginSuccess('Login successful.');
      setCurrentPage('dashboard');
      setFormData({ phone: '', password: '' });
    } catch (err: any) {
      setError(err?.message || 'Login failed.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoginSuccess(null);
    if (!registerData.firstName || !registerData.email || !registerData.mobile || !registerData.password) {
      setError('Please fill all required fields.');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: registerData.firstName,
          middleName: registerData.middleName,
          lastName: registerData.lastName,
          email: registerData.email,
          mobile: registerData.mobile,
          password: registerData.password,
          businessOwnerKnown: registerData.aboKnown,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Registration failed.');
      }
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setRegisterData({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        mobile: '',
        password: '',
        aboKnown: 'yes',
        pincode: '',
        aboId: '',
      });
      setPinVerified(false);
    } catch (err: any) {
      setError(err?.message || 'Registration failed.');
    }
  };

  const handleRequestOtp = async () => {
    setError('');
    setOtpInfo(null);
    try {
      const res = await fetch(`${API_BASE}/api/otp/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: resetData.mobile }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'OTP request failed.');
      }
      setOtpInfo(`OTP sent. (Demo OTP: ${data.otp})`);
    } catch (err: any) {
      setError(err?.message || 'OTP request failed.');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/otp/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobile: resetData.mobile,
          otp: resetData.otp,
          newPassword: resetData.newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Reset failed.');
      }
      setOtpInfo('Password reset successful. You can now sign in.');
      setShowReset(false);
      setResetData({ mobile: '', otp: '', newPassword: '' });
    } catch (err: any) {
      setError(err?.message || 'Reset failed.');
    }
  };

  return (
    <div className="pt-16 bg-white">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.4)]">
            {registerType ? (
              <div>
                <button
                  type="button"
                  onClick={() => setRegisterType(null)}
                  className="mb-6 text-sm font-semibold text-slate-700 hover:text-slate-900"
                >
                  ← Back
                </button>
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-slate-900 mb-4">Welcome!</h1>
                  <p className="text-slate-600 mb-4">
                    To create a Business Account you are required to know a Business Owner.
                  </p>
                  <p className="text-slate-600 mb-6">
                    You must be at least 18 years old and an Indian citizen to register with Nandan Consumer Equipments.
                  </p>
                </div>
                <form onSubmit={handleRegisterSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">First and Middle Name</label>
                    <input
                      type="text"
                      required
                      value={registerData.firstName}
                      onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm"
                      placeholder="Please enter the name as mentioned in your ID proof."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Last Name (Optional)</label>
                    <input
                      type="text"
                      value={registerData.lastName}
                      onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      required
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm"
                      placeholder="example@mail.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Mobile Number</label>
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-300 px-4 py-3">
                      <span className="text-slate-500 font-semibold">+91</span>
                      <input
                        type="tel"
                        required
                        value={registerData.mobile}
                        onChange={(e) => setRegisterData({ ...registerData, mobile: e.target.value })}
                        className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none"
                        placeholder="Mobile Number will be used as your login ID"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Create Password</label>
                    <input
                      type="password"
                      required
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm"
                      placeholder="Example - My@password1"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-semibold text-slate-700">Owner (ABO)?</label>
                      <span className="text-xs font-semibold text-slate-500 border border-slate-300 rounded-full px-2 py-0.5">i</span>
                    </div>
                    <div className="flex items-center gap-8 text-sm text-slate-700">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="referral"
                          checked={registerData.aboKnown === 'yes'}
                          onChange={() => setRegisterData({ ...registerData, aboKnown: 'yes' })}
                        />
                        Yes
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="referral"
                          checked={registerData.aboKnown === 'no'}
                          onChange={() => setRegisterData({ ...registerData, aboKnown: 'no' })}
                        />
                        No
                      </label>
                    </div>
                    {registerData.aboKnown === 'yes' ? (
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Enter Business Owner Number</label>
                        <input
                          type="text"
                          value={registerData.aboId}
                          onChange={(e) => setRegisterData({ ...registerData, aboId: e.target.value })}
                          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm"
                          placeholder="Business Owner Number"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700">Please enter Pincode</label>
                          <input
                            type="text"
                            value={registerData.pincode}
                            onChange={(e) => {
                              setRegisterData({ ...registerData, pincode: e.target.value });
                              setPinVerified(false);
                            }}
                            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm"
                            placeholder="Pincode"
                          />
                          <button
                            type="button"
                            onClick={() => setPinVerified(!!registerData.pincode)}
                            className="w-full rounded-full border border-slate-300 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                          >
                            Verify
                          </button>
                          <p className="text-xs text-slate-500 flex items-center gap-2">
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-slate-500">!</span>
                            Please select one from the suggested owners to proceed with the registration.
                          </p>
                        </div>
                        {pinVerified ? (
                          (() => {
                            const abos = [
                              { id: '14578', name: "M/S KAPOOR'S NETWORK MARKETING", place: 'Bangalore rural', initials: 'MK', pin: '560001' },
                              { id: '26576', name: 'SAMUEL, SARAH & REBA HANNAH', place: 'BANGALORE', initials: 'SS', pin: '560002' },
                              { id: '11223', name: 'SUJEER, RAVI & JANAKI', place: 'BANGALORE', initials: 'SJ', pin: '560003' },
                            ];
                            const matches = abos.filter((abo) => !registerData.pincode || abo.pin.startsWith(registerData.pincode));
                            if (matches.length === 0) {
                              return <p className="text-xs text-slate-500">No owners found for this pincode. Please check and try again.</p>;
                            }
                            return (
                              <div className="space-y-3 pt-2">
                                {matches.map((abo) => (
                                  <label key={abo.id} className="flex items-center gap-4 rounded-2xl border border-slate-200 p-3 cursor-pointer hover:bg-slate-50">
                                    <input
                                      type="radio"
                                      name="aboId"
                                      checked={registerData.aboId === abo.id}
                                      onChange={() => setRegisterData({ ...registerData, aboId: abo.id })}
                                    />
                                    <div className="h-12 w-12 rounded-full border border-slate-300 flex items-center justify-center text-sm font-semibold text-slate-700">
                                      {abo.initials}
                                    </div>
                                    <div className="text-sm">
                                      <div className="font-semibold text-slate-900">{abo.name}</div>
                                      <div className="text-slate-600">Owner ID: {abo.id}</div>
                                      <div className="text-slate-500">{abo.place}</div>
                                    </div>
                                  </label>
                                ))}
                              </div>
                            );
                          })()
                        ) : (
                          <p className="text-xs text-slate-500">Verify your pincode to see available owners.</p>
                        )}
                      </>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full border-2 border-slate-900 py-3 text-sm font-bold uppercase tracking-widest text-slate-900"
                  >
                    Submit
                  </button>
                  {error && <div className="text-sm text-rose-600 font-semibold">{error}</div>}
                </form>
                <div className="mt-6 flex items-center justify-center gap-8 text-xs font-semibold text-slate-600">
                  <button onClick={() => setCurrentPage('terms')} className="hover:text-slate-800">Terms &amp; Conditions</button>
                  <button onClick={() => setCurrentPage('privacy')} className="hover:text-slate-800">Privacy</button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-slate-900">Sign in</h1>
                </div>

              <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Mobile Number</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-300 px-4 py-3">
                  <span className="text-slate-500 font-semibold">+91</span>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    placeholder="Mobile number"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-300 px-4 py-3">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-slate-500 hover:text-slate-700"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setShowReset(true)}
                    className="text-sm font-semibold text-slate-700 hover:text-slate-900 underline underline-offset-4"
                  >
                    Forgot Password
                  </button>
                </div>
              {error && <div className="text-sm text-rose-600 font-semibold">{error}</div>}
              {loginSuccess && <div className="text-sm text-emerald-600 font-semibold">{loginSuccess}</div>}
              <button
                type="submit"
                className="w-full rounded-full bg-slate-400 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-slate-500"
              >
                Sign In
              </button>
            </form>

            {showReset && (
              <form onSubmit={handleResetPassword} className="mt-8 space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Reset Password</h3>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-300 px-4 py-3">
                  <span className="text-slate-500 font-semibold">+91</span>
                  <input
                    type="tel"
                    required
                    value={resetData.mobile}
                    onChange={(e) => setResetData({ ...resetData, mobile: e.target.value })}
                    className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    placeholder="Mobile number"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleRequestOtp}
                  className="w-full rounded-full border border-slate-300 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                >
                  Send OTP
                </button>
                <input
                  type="text"
                  required
                  value={resetData.otp}
                  onChange={(e) => setResetData({ ...resetData, otp: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm"
                  placeholder="Enter OTP"
                />
                <input
                  type="password"
                  required
                  value={resetData.newPassword}
                  onChange={(e) => setResetData({ ...resetData, newPassword: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm"
                  placeholder="New Password"
                />
                <button
                  type="submit"
                  className="w-full rounded-full bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Reset Password
                </button>
                {otpInfo && <div className="text-xs text-slate-600">{otpInfo}</div>}
              </form>
            )}

            <div className="mt-8 text-center text-sm font-semibold text-slate-700">Sign in with</div>
            <div className="mt-4 flex items-center justify-center gap-4">
              <button className="h-12 w-12 rounded-full border border-slate-200 bg-white text-lg font-bold shadow-sm">G</button>
              <button className="h-12 w-12 rounded-full border border-slate-200 bg-white text-lg font-bold shadow-sm">f</button>
            </div>

              <div className="mt-10 border-t border-slate-200 pt-6">
                <div className="mb-4 flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-900">Register</h2>
                  <Info size={16} className="text-slate-500" />
                </div>
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setRegisterType('preferred')}
                    className="w-full rounded-full border-2 border-slate-800 py-3 text-sm font-bold uppercase tracking-widest text-slate-800"
                  >
                    Preferred Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegisterType('business')}
                    className="w-full rounded-full border-2 border-slate-800 py-3 text-sm font-bold uppercase tracking-widest text-slate-800"
                  >
                    Business Owner
                  </button>
                </div>
                <div className="mt-6 flex items-center justify-center gap-8 text-xs font-semibold text-slate-600">
                  <button onClick={() => setCurrentPage('terms')} className="hover:text-slate-800">Terms &amp; Conditions</button>
                  <button onClick={() => setCurrentPage('privacy')} className="hover:text-slate-800">Privacy</button>
                </div>
              </div>
              </>
            )}

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 p-4 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100 text-center font-medium"
                >
                  Request submitted.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

const PrivacyPolicyPage = () => {
  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-[#0ea5e9] via-[#2563eb] to-[#7c3aed] py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-white/90">Last Updated: March 16, 2026</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">1. Introduction</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              NANDAN CONSUMER EQUIPMENTS PRIVATE LIMITED ("we", "us", or "our") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-6">2. The Data We Collect</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 text-slate-600 mb-8 space-y-2">
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
              <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
              <li><strong>Usage Data</strong> includes information about how you use our website and services.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-6">3. How We Use Your Data</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to contact you regarding your inquiries, to provide our services, and to improve our website experience.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-6">4. Data Security</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-6">5. Contact Us</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              If you have any questions about this privacy policy or our privacy practices, please contact us at info@nandanconsumer.com.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const CertificatesPage = () => {
  const certificates = [
    {
      name: 'GST Registration Certificate',
      src: '/images/GST_Registration_Certificate.png',
      fit: 'cover',
    },
    {
      name: 'Certificate of Incorporation',
      src: '/images/Certificate_of_Incorporation.png',
      fit: 'cover',
    },
    {
      name: 'Udyam Registration Certificate',
      src: '/images/Udyam_Registration_Certificate.png',
      fit: 'cover',
    },
    {
      name: 'PAN Card',
      src: '/images/PAN_Card.png',
      fit: 'contain',
      aspect: 'aspect-[4/3]',
    },
    {
      name: 'Shops & Establishment Certificate',
      src: '/images/Shops_Establishment_Certificate.png',
      fit: 'cover',
    },
  ];
  const [preview, setPreview] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const zoomIn = () => setZoom((z) => Math.min(3, Number((z + 0.25).toFixed(2))));
  const zoomOut = () => setZoom((z) => Math.max(0.5, Number((z - 0.25).toFixed(2))));
  const resetZoom = () => setZoom(1);

  return (
    <div className="pt-16 bg-white cert-page">
      <section className="bg-gradient-to-br from-[#0ea5e9] via-[#2563eb] to-[#7c3aed] py-20 text-white">
        <div className="max-w-6xl mx-auto px-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Certifications</h1>
          <p className="text-white/90 text-lg">Official documents and registrations of our company</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 fade-in">
            {certificates.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <button
                  type="button"
                  onClick={() => {
                    setPreview(item.src);
                    resetZoom();
                  }}
                  className="w-full text-left"
                >
                  <div className="bg-[#f9fafb] p-3 h-[360px] flex items-center justify-center overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.name}
                      loading="lazy"
                      className={`h-full w-auto object-contain transition-transform duration-300 hover:scale-105 ${item.rotate ? (item.rotateClass || 'rotate-90') : ''}`}
                    />
                  </div>
                </button>
                <div className="p-5 flex items-center justify-between gap-4">
                  <span className="font-medium text-slate-900">{item.name}</span>
                  <a
                    href={item.src}
                    download
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm bg-gradient-to-r from-[#007bff] to-[#00c6ff] hover:shadow-[0_10px_25px_rgba(0,123,255,0.25)] transition"
                  >
                    <Download size={16} />
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>

          {preview && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
              <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden">
                <div className="absolute right-4 top-4 flex items-center gap-2 z-10">
                  <button onClick={zoomOut} className="rounded-full bg-white border border-slate-200 px-3 py-1 text-sm font-semibold">-</button>
                  <button onClick={resetZoom} className="rounded-full bg-white border border-slate-200 px-3 py-1 text-sm font-semibold">Reset</button>
                  <button onClick={zoomIn} className="rounded-full bg-white border border-slate-200 px-3 py-1 text-sm font-semibold">+</button>
                  <button
                    onClick={() => setPreview(null)}
                    className="rounded-full bg-white border border-slate-200 px-3 py-1 text-sm font-semibold"
                  >
                    Close
                  </button>
                </div>
                <div className="max-h-[85vh] overflow-auto bg-white flex items-center justify-center">
                  <img
                    src={preview}
                    alt="Certificate preview"
                    className="object-contain"
                    style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const TermsPage = () => {
  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-[#0ea5e9] via-[#2563eb] to-[#7c3aed] py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Terms &amp; Conditions</h1>
          <p className="text-white/90">Last Updated: March 23, 2026</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">1. Acceptance</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              By using our website or services, you agree to these terms. If you do not agree, please do not use our services.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-6">2. Services</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              We provide professional services across real estate, finance, and insurance. Availability may vary by location and eligibility.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-6">3. User Responsibilities</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              You agree to provide accurate information and comply with applicable laws and regulations.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-6">4. Contact</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              For questions regarding these terms, please contact us at info@nandanconsumer.com.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const DashboardPage = ({
  setCurrentPage,
  setIsLoggedIn,
}: {
  setCurrentPage: (p: Page) => void;
  setIsLoggedIn: (v: boolean) => void;
}) => {
  const [user, setUser] = useState<{ firstName?: string; mobile?: string } | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('nandan_auth');
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('nandan_auth');
    setIsLoggedIn(false);
    setCurrentPage('signup');
  };

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-[#0ea5e9] via-[#2563eb] to-[#7c3aed] py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-white/90">Welcome{user?.firstName ? `, ${user.firstName}` : ''}!
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <UserCircle size={36} className="text-slate-600" />
              <div>
                <h3 className="text-lg font-bold text-slate-900">Profile</h3>
                <p className="text-sm text-slate-600">Your account information</p>
              </div>
            </div>
            <div className="text-sm text-slate-600 space-y-2">
              <div><span className="font-semibold text-slate-700">Name:</span> {user?.firstName || 'User'}</div>
              <div><span className="font-semibold text-slate-700">Mobile:</span> {user?.mobile || '-'}</div>
            </div>
            <button
              onClick={() => setCurrentPage('contact')}
              className="mt-6 w-full rounded-full border border-slate-300 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Update Profile
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <button onClick={() => setCurrentPage('home')} className="rounded-full border border-slate-300 py-2 hover:bg-slate-50">Home</button>
              <button onClick={() => setCurrentPage('about')} className="rounded-full border border-slate-300 py-2 hover:bg-slate-50">About</button>
              <button onClick={() => setCurrentPage('products')} className="rounded-full border border-slate-300 py-2 hover:bg-slate-50">Electronics</button>
              <button onClick={() => setCurrentPage('products')} className="rounded-full border border-slate-300 py-2 hover:bg-slate-50">Products</button>
              <button onClick={() => setCurrentPage('certificates')} className="rounded-full border border-slate-300 py-2 hover:bg-slate-50">Certificates</button>
              <button onClick={() => setCurrentPage('contact')} className="rounded-full border border-slate-300 py-2 hover:bg-slate-50">Contact</button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Account</h3>
            <p className="text-sm text-slate-600 mb-6">Manage your access and session.</p>
            <button
              onClick={handleLogout}
              className="w-full rounded-full bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Main App ---

function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const currentPage = pathToPage(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const raw = localStorage.getItem('nandan_auth');
    const loggedIn = !!raw;
    setIsLoggedIn(loggedIn);

    if (loggedIn && location.pathname === pageToPath.signup) {
      navigate(pageToPath.dashboard, { replace: true });
    }
    if (!loggedIn && location.pathname === pageToPath.dashboard) {
      navigate(pageToPath.signup, { replace: true });
    }
  }, [location.pathname, navigate]);

  const go = (p: Page) => navigate(pageToPath[p]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar currentPage={currentPage} setCurrentPage={go} isLoggedIn={isLoggedIn} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/" element={<HomePage setCurrentPage={go} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<Navigate to="/products" replace />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/certificates" element={<CertificatesPage />} />
              <Route path="/signup" element={<SignUpPage setCurrentPage={go} setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/dashboard" element={<DashboardPage setCurrentPage={go} setIsLoggedIn={setIsLoggedIn} />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer setCurrentPage={go} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}


