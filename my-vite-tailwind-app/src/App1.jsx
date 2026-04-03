import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code, Database, Server, Globe, Menu, X, ArrowRight, User, Briefcase, ChevronDown, Star, Download, Layers } from 'lucide-react';
import Hero from '../src/assets/image.png';
import resume from '../src/assets/Priyadharshini-developer.pdf';

// ─── Cursor Glow ─────────────────────────────────────────────────────────────
function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (ref.current) {
        ref.current.style.left = e.clientX + 'px';
        ref.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
        transition: 'left 0.15s ease, top 0.15s ease',
      }}
    />
  );
}

// ─── Noise Overlay ────────────────────────────────────────────────────────────
const NoiseOverlay = () => (
  <div
    className="pointer-events-none fixed inset-0 z-[100] opacity-[0.025]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
    }}
  />
);

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState({});
  const [scrollY, setScrollY] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 }
    );
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const techSkills = [
    { name: 'React.js', icon: '⚛️', category: 'Frontend' },
    { name: 'Next.js', icon: '▲', category: 'Frontend' },
    { name: 'JavaScript', icon: 'JS', category: 'Language' },
    { name: 'TypeScript', icon: 'TS', category: 'Language' },
    { name: 'Node.js', icon: '🟢', category: 'Backend' },
    { name: 'Express.js', icon: '🚂', category: 'Backend' },
    { name: 'NestJS', icon: 'N', category: 'Backend' },
    { name: 'MongoDB', icon: '🍃', category: 'Database' },
    { name: 'MySQL', icon: '🗄️', category: 'Database' },
    { name: 'Prisma', icon: '⚡', category: 'ORM' },
    { name: 'Tailwind CSS', icon: '💨', category: 'Styling' },
    { name: 'Firebase', icon: '🔥', category: 'Cloud' },
    { name: 'Python', icon: '🐍', category: 'Language' },
    { name: 'Git', icon: '📦', category: 'Tools' },
    { name: 'HTML/CSS', icon: '🎨', category: 'Frontend' },
  ];

  const projects = [
    {
      title: 'CA Student AI App',
      tag: 'Mobile · AI',
      description: 'AI-driven mobile app for CA students with RAG-based knowledge retrieval, exam-focused answers, and subscription payments.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop',
      fullDescription: `AI-powered mobile application built exclusively for Chartered Accountancy (CA) students, providing accurate, exam-focused answers using domain-specific knowledge.

Key Features:
• Secure Google Sign-In authentication via Firebase Auth
• ChatGPT-like conversational interface tailored for CA students
• Python-based RAG pipeline for accurate domain-specific responses
• Razorpay-powered subscription payments for premium features
• Scalable REST APIs built with Express.js
• User data, chat history, and access management via MongoDB Atlas
• Responsive mobile-first UI using React Native & Tailwind CSS`,
      tech: ['React Native', 'TailwindCSS', 'Express', 'MongoDB', 'Python', 'Firebase'],
    },
    {
      title: 'NXI — Project Platform',
      tag: 'Enterprise · Web',
      description: 'Internal project management platform with role-based login, hierarchical data structures, and tabbed nested organization.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
      fullDescription: `NXI is an enterprise-grade project management system designed to manage hierarchical data structures with strict access control.

Key Features:
• Role-based login — only admins can add users; no public registration
• Credentials sent via email for secure onboarding
• Parent-child project relationships with deep nesting support
• Three interconnected tabs per project: Nested Table, Association, Detailing
• Reusable structure across multiple projects
• Fully responsive admin-first interface with advanced filtering and real-time updates

Tech: React.js, Express, MySQL with Prisma ORM, TailwindCSS`,
      tech: ['React.js', 'Express', 'MySQL', 'Tailwind', 'Prisma ORM'],
    },
    {
      title: 'Supershield — Property Platform',
      tag: 'Real Estate · Web',
      description: 'Large-scale property listing platform with 92 frontend pages, advanced search, virtual tours, and WordPress CMS.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop',
      fullDescription: `Supershield is a large-scale construction and property listing platform featuring 92 frontend pages.

Key Features:
• Real estate listing system with dynamic filters and search
• WordPress-powered backend CMS for easy content management
• Fully responsive, SEO-optimized pages
• Admin-editable project database via custom WordPress APIs
• Filtered views for project type, location, budget, and status
• Smooth performance across all devices and browsers

Tailored for construction businesses to showcase ongoing, upcoming, and completed projects with high visual appeal.`,
      tech: ['Next.js', 'WordPress', 'Tailwind'],
    },
    {
      title: 'AI Answer Evaluator',
      tag: 'EdTech · AI',
      description: 'AI-powered internal tool for CA coaching institutes to evaluate student written answers using RAG-based scoring.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
      fullDescription: `An AI-powered internal application for CA coaching institutes to evaluate student written answers post-class.

Key Features:
• Role-based authentication for Admin, Tutor, and Student roles
• Admin-controlled user creation; login credentials sent via email
• Tutor dashboard to assign questions after class
• Student portal for answer submission and status tracking
• RAG-based AI evaluation against reference solutions
• Automated score generation with qualitative feedback
• Tutor access to review student performance reports
• Secure storage of answers, scores, and evaluation history`,
      tech: ['Next.js', 'Express.js', 'MongoDB', 'TailwindCSS', 'Python'],
    },
    {
      title: 'Meeting Room Allocator',
      tag: 'Internal Tool · Web',
      description: 'Smart room booking system with role-based access control, real-time availability, and conflict prevention.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop',
      fullDescription: `A comprehensive meeting room allocation system for streamlined organizational booking.

Key Features:
• Firebase Authentication with role-based access (Admin, Manager, Employee)
• Real-time room availability tracking via Firebase Realtime Database
• Three meeting rooms with individual booking management
• Interactive calendar view for browsing and booking
• Conflict detection to prevent double bookings
• Admin dashboard for managing rooms, users, and bookings
• Email notifications for booking confirmations and reminders
• Responsive design built with TailwindCSS`,
      tech: ['React.js', 'TailwindCSS', 'Firebase'],
    },
  ];

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: '#080810', fontFamily: "'Outfit', sans-serif" }}>
      <NoiseOverlay />
      <CursorGlow />

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Syne:wght@400;500;600;700;800&display=swap');

        :root {
          --indigo: #6366f1;
          --violet: #8b5cf6;
          --cyan: #06b6d4;
          --emerald: #10b981;
          --rose: #f43f5e;
          --amber: #f59e0b;
        }

        * { box-sizing: border-box; }

        html { scroll-behavior: smooth; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080810; }
        ::-webkit-scrollbar-thumb { background: var(--indigo); border-radius: 2px; }

        .font-display { font-family: 'Syne', sans-serif; }

        .gradient-text {
          background: linear-gradient(135deg, #a5b4fc, #818cf8, #c084fc, #67e8f9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gradient-text-gold {
          background: linear-gradient(135deg, #fbbf24, #f59e0b, #d97706);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .card-glass {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.07);
        }

        .card-glass:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(99,102,241,0.3);
        }

        .btn-primary {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #818cf8, #a78bfa);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .btn-primary:hover::before { opacity: 1; }

        .btn-outline {
          border: 1px solid rgba(99,102,241,0.4);
          color: #a5b4fc;
          transition: all 0.3s;
          background: transparent;
        }

        .btn-outline:hover {
          background: rgba(99,102,241,0.1);
          border-color: rgba(99,102,241,0.7);
          color: #c7d2fe;
        }

        .skill-pill {
          transition: all 0.2s ease;
          cursor: default;
        }
        .skill-pill:hover {
          transform: translateY(-3px);
          border-color: rgba(99,102,241,0.6) !important;
          background: rgba(99,102,241,0.1) !important;
        }

        .project-card {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .project-card:hover {
          transform: translateY(-8px);
        }

        .nav-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(99,102,241,0.4);
          transition: all 0.3s;
        }
        .nav-dot.active {
          background: #6366f1;
          box-shadow: 0 0 8px #6366f1;
          transform: scale(1.4);
        }

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.4} 100%{transform:scale(1.5);opacity:0} }
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spin-rev { from{transform:rotate(360deg)} to{transform:rotate(0deg)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-scroll-left { animation: scroll-left 35s linear infinite; }
        .animate-fadeUp { animation: fadeUp 0.7s ease forwards; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-spin-rev { animation: spin-rev 15s linear infinite; }
        .animate-blink { animation: blink 1s step-end infinite; }

        .section-enter { opacity: 0; transform: translateY(40px); transition: all 0.9s cubic-bezier(0.23,1,0.32,1); }
        .section-enter.visible { opacity: 1; transform: translateY(0); }

        .hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        .tag-badge {
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 2px 10px;
          border-radius: 100px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.25);
          color: #a5b4fc;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .availability-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #10b981;
          position: relative;
        }
        .availability-dot::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 2px solid #10b981;
          animation: pulse-ring 1.5s ease-out infinite;
        }
      `}</style>

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 w-full z-50 transition-all duration-500"
        style={{
          background: scrollY > 60
            ? 'rgba(8,8,16,0.92)'
            : 'transparent',
          backdropFilter: scrollY > 60 ? 'blur(24px)' : 'none',
          borderBottom: scrollY > 60 ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-5">
            {/* Logo */}
            <button onClick={() => scrollToSection('home')} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold font-display"
                style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>
                P
              </div>
              <span className="font-display font-semibold text-white/80 text-sm hidden sm:block tracking-wide">Priyadharshini</span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative px-5 py-2 text-sm transition-all duration-200 rounded-full"
                  style={{
                    color: activeSection === item.id ? '#a5b4fc' : 'rgba(255,255,255,0.5)',
                    background: activeSection === item.id ? 'rgba(99,102,241,0.1)' : 'transparent',
                  }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: '#6366f1' }} />
                  )}
                </button>
              ))}
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium btn-primary text-white relative z-10"
              >
                <Download size={14} />
                Resume
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 rounded-xl transition-all"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className="lg:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: isMenuOpen ? '400px' : '0',
            background: 'rgba(8,8,16,0.98)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="px-6 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-3 rounded-xl text-sm transition-all"
                style={{ color: activeSection === item.id ? '#a5b4fc' : 'rgba(255,255,255,0.6)' }}
              >
                {item.label}
              </button>
            ))}
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mt-2 px-4 py-3 rounded-xl text-sm font-medium btn-primary text-white relative z-10 w-full justify-center"
            >
              <Download size={14} /> Resume
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        {/* BG Glows */}
        <div className="hero-glow w-[600px] h-[600px] top-[-100px] left-[-100px]"
          style={{ background: 'rgba(99,102,241,0.12)' }} />
        <div className="hero-glow w-[500px] h-[500px] bottom-[-50px] right-[-80px]"
          style={{ background: 'rgba(139,92,246,0.1)' }} />
        <div className="hero-glow w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ background: 'rgba(6,182,212,0.06)' }} />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div className={`section-enter ${isVisible.home ? 'visible' : ''}`}>
              {/* Status Badge */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-8 text-sm"
                style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <div className="availability-dot" />
                <span style={{ color: '#6ee7b7' }}>Available for new opportunities</span>
              </div>

              {/* Heading */}
              <div className="mb-6">
                <p className="text-sm font-medium tracking-[0.35em] uppercase mb-3"
                  style={{ color: '#6366f1', fontFamily: 'Syne, sans-serif' }}>
                  Full Stack Developer
                </p>
                <h1 className="font-display text-5xl sm:text-6xl xl:text-7xl font-bold leading-[1.05] mb-4">
                  <span className="gradient-text">Hi, I'm</span>
                  <br />
                  <span className="text-white">Priyadharshini</span>
                </h1>
                <div className="h-px w-24 mt-4 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #6366f1, transparent)' }} />
              </div>

              <p className="text-base leading-relaxed mb-10 max-w-lg" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Full-stack developer at{' '}
                <span className="font-semibold" style={{ color: '#a5b4fc' }}>Senthurontech</span>
                , transforming complex business challenges into{' '}
                <span style={{ color: '#c084fc' }}>production-ready solutions</span>{' '}
                using modern web technologies.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                  { num: '1+', label: 'Years Exp.', color: '#6366f1' },
                  { num: '20+', label: 'Projects', color: '#8b5cf6' },
                  { num: '15+', label: 'Technologies', color: '#06b6d4' },
                ].map((stat, i) => (
                  <div key={i} className="card-glass rounded-2xl p-4 text-center transition-all duration-300 hover:-translate-y-1">
                    <div className="font-display text-2xl font-bold mb-1" style={{ color: stat.color }}>{stat.num}</div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="btn-primary flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white relative z-10"
                >
                  View My Work
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="btn-outline flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold"
                >
                  Get In Touch
                </button>
              </div>

              {/* Socials */}
              <div className="flex gap-3">
                {[
                  { href: 'https://github.com/Priyariya1', icon: <Github size={18} />, label: 'GitHub' },
                  { href: 'https://www.linkedin.com/in/priyadharshini-s-a148aa274/', icon: <Linkedin size={18} />, label: 'LinkedIn' },
                  { href: 'mailto:priyasaravanan282@gmail.com', icon: <Mail size={18} />, label: 'Email' },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    className="p-3 rounded-xl transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.5)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'; e.currentTarget.style.color = '#a5b4fc'; e.currentTarget.style.background = 'rgba(99,102,241,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Right – Avatar */}
            <div className={`section-enter ${isVisible.home ? 'visible' : ''} flex justify-center items-center`}
              style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                {/* Outer decorative rings */}
                <div className="absolute inset-[-32px] rounded-full animate-spin-slow opacity-30"
                  style={{ border: '1px dashed rgba(99,102,241,0.4)' }} />
                <div className="absolute inset-[-16px] rounded-full animate-spin-rev opacity-20"
                  style={{ border: '1px solid rgba(139,92,246,0.3)' }} />

                {/* Glow behind image */}
                <div className="absolute inset-0 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)', filter: 'blur(30px)' }} />

                {/* Avatar frame */}
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full p-[3px]"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)' }}>
                  <div className="w-full h-full rounded-full overflow-hidden" style={{ background: '#0d0d1a' }}>
                    <img
                      src={Hero}
                      alt="Priyadharshini"
                      className="w-full h-full object-cover"
                      style={{ filter: 'brightness(1.05) contrast(1.02)' }}
                    />
                  </div>
                </div>

                {/* Floating chips */}
                {[
                  { icon: <Code size={16} />, label: 'React · Next.js', pos: 'top-4 -left-16', color: '#6366f1' },
                  { icon: <Database size={16} />, label: 'MySQL · Mongo', pos: 'bottom-4 -right-16', color: '#8b5cf6' },
                  { icon: <Server size={16} />, label: 'Node · Express', pos: '-bottom-6 left-4', color: '#06b6d4' },
                ].map((chip, i) => (
                  <div
                    key={i}
                    className={`absolute ${chip.pos} flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium animate-float`}
                    style={{
                      background: 'rgba(8,8,16,0.9)',
                      border: `1px solid ${chip.color}40`,
                      color: '#fff',
                      backdropFilter: 'blur(12px)',
                      animationDelay: `${i * 0.5}s`,
                      boxShadow: `0 4px 20px ${chip.color}30`,
                    }}
                  >
                    <span style={{ color: chip.color }}>{chip.icon}</span>
                    {chip.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-300 hover:opacity-70"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          <span className="text-xs tracking-widest uppercase" style={{ fontSize: '10px', letterSpacing: '0.2em' }}>Scroll</span>
          <ChevronDown size={18} className="animate-bounce" />
        </button>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 relative overflow-hidden">
        <div className="hero-glow w-[400px] h-[400px] top-0 right-0"
          style={{ background: 'rgba(139,92,246,0.08)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className={`section-enter ${isVisible.about ? 'visible' : ''}`}>

            {/* Section Header */}
            <div className="mb-20">
              <p className="text-sm font-medium tracking-[0.3em] uppercase mb-3" style={{ color: '#6366f1', fontFamily: 'Syne, sans-serif' }}>
                01 — About
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
                Who I <span className="gradient-text">Am</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-5 gap-12">
              {/* Bio */}
              <div className="lg:col-span-3 space-y-6">
                <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  I'm a full-stack developer at{' '}
                  <span className="text-white font-semibold">Senthurontech</span>{' '}
                  who loves owning features end-to-end — from clean, accessible UIs to performant, secure APIs and well-structured databases.
                </p>
                <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  I focus on writing maintainable code and shipping features that make a measurable difference.
                  Whether it's integrating AI pipelines, building multi-role auth systems, or crafting pixel-perfect interfaces,
                  I bring curiosity and craftsmanship to every project.
                </p>

                {/* Work Experience Card */}
                <div className="card-glass rounded-2xl p-6 mt-6 transition-all duration-300 hover:border-indigo-500/30">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                      <Briefcase size={18} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                        <h4 className="font-display font-semibold text-white">Full Stack Developer</h4>
                        <span className="tag-badge">2024 – Present</span>
                      </div>
                      <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>Senthurontech</p>
                      <ul className="space-y-2">
                        {[
                          'Built and deployed full-stack apps using React.js, Node.js, Express.js, and MySQL',
                          'Designed secure RESTful APIs with authentication and role-based authorization',
                          'Optimized backend APIs, reducing response time by ~30%',
                          'Integrated AI/ML pipelines (RAG) for intelligent evaluation systems',
                          'Collaborated with cross-functional teams using Git for version control',
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#6366f1' }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats & Focus */}
              <div className="lg:col-span-2 space-y-5">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { num: '1+', label: 'Years Experience', color: '#6366f1' },
                    { num: '20+', label: 'Projects Shipped', color: '#8b5cf6' },
                    { num: '100%', label: 'Satisfaction Rate', color: '#06b6d4' },
                    { num: 'Open', label: 'To Opportunities', color: '#10b981' },
                  ].map((s, i) => (
                    <div key={i} className="card-glass rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1">
                      <div className="font-display text-2xl font-bold mb-1" style={{ color: s.color }}>{s.num}</div>
                      <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Currently Learning */}
                <div className="card-glass rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)' }}>
                      <Star size={16} className="text-white" />
                    </div>
                    <h4 className="font-display font-semibold text-white text-sm">Currently Exploring</h4>
                  </div>
                  <div className="space-y-2.5">
                    {['NestJS Framework', 'Advanced Next.js', 'AWS Cloud Services', 'Cloud Architecture'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#f59e0b' }} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack summary */}
                <div className="card-glass rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg,#06b6d4,#0284c7)' }}>
                      <Layers size={16} className="text-white" />
                    </div>
                    <h4 className="font-display font-semibold text-white text-sm">Core Stack</h4>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    React · Next.js · Node.js · Express · Prisma · MySQL · MongoDB · Firebase · Tailwind CSS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-28 relative overflow-hidden">
        <div className="hero-glow w-[500px] h-[500px] bottom-0 left-[-100px]"
          style={{ background: 'rgba(99,102,241,0.07)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className={`section-enter ${isVisible.skills ? 'visible' : ''}`}>

            <div className="mb-20">
              <p className="text-sm font-medium tracking-[0.3em] uppercase mb-3" style={{ color: '#6366f1', fontFamily: 'Syne, sans-serif' }}>
                02 — Skills
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
                My <span className="gradient-text">Tech Stack</span>
              </h2>
            </div>

            {/* Infinite scroll carousel */}
            <div className="relative mb-16 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, #080810, transparent)' }} />
              <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to left, #080810, transparent)' }} />

              <div className="flex animate-scroll-left" style={{ width: 'max-content' }}>
                {[...techSkills, ...techSkills].map((skill, i) => (
                  <div
                    key={i}
                    className="skill-pill flex-shrink-0 mx-3 flex items-center gap-3 px-5 py-3.5 rounded-2xl"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      minWidth: '170px',
                    }}
                  >
                    <span className="text-xl">{skill.icon}</span>
                    <div>
                      <div className="text-sm font-medium text-white">{skill.name}</div>
                      <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{skill.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills grid by category */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { label: 'Frontend', icon: <Globe size={16} />, color: '#6366f1', skills: ['React.js', 'Next.js', 'HTML/CSS', 'Tailwind CSS'] },
                { label: 'Backend', icon: <Server size={16} />, color: '#8b5cf6', skills: ['Node.js', 'Express.js', 'NestJS', 'Python'] },
                { label: 'Database', icon: <Database size={16} />, color: '#06b6d4', skills: ['MySQL', 'MongoDB', 'Prisma ORM', 'Firebase'] },
                { label: 'Languages & Tools', icon: <Code size={16} />, color: '#10b981', skills: ['JavaScript', 'TypeScript', 'Git', 'REST APIs'] },
              ].map((cat, i) => (
                <div key={i} className="card-glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${cat.color}1a`, border: `1px solid ${cat.color}30`, color: cat.color }}>
                      {cat.icon}
                    </div>
                    <h4 className="font-display font-semibold text-sm text-white">{cat.label}</h4>
                  </div>
                  <div className="space-y-2.5">
                    {cat.skills.map((s, j) => (
                      <div key={j} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-28 relative overflow-hidden">
        <div className="hero-glow w-[500px] h-[500px] top-1/2 right-[-100px]"
          style={{ background: 'rgba(139,92,246,0.08)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className={`section-enter ${isVisible.projects ? 'visible' : ''}`}>

            <div className="mb-20">
              <p className="text-sm font-medium tracking-[0.3em] uppercase mb-3" style={{ color: '#6366f1', fontFamily: 'Syne, sans-serif' }}>
                03 — Projects
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
                Featured <span className="gradient-text">Work</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="project-card card-glass rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      style={{ filter: 'brightness(0.8)' }}
                    />
                    <div className="absolute inset-0 transition-opacity duration-300"
                      style={{ background: 'linear-gradient(to top, rgba(8,8,16,0.9) 0%, rgba(8,8,16,0.3) 50%, transparent 100%)' }} />

                    {/* Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="tag-badge">{project.tag}</span>
                    </div>

                    {/* View more overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                        style={{ background: 'rgba(99,102,241,0.9)', backdropFilter: 'blur(8px)' }}>
                        <ExternalLink size={14} />
                        View Details
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-indigo-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-5 line-clamp-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {project.description}
                    </p>

                    {/* Tech */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 4).map((tech, ti) => (
                        <span key={ti} className="text-xs px-3 py-1 rounded-full"
                          style={{
                            background: 'rgba(99,102,241,0.1)',
                            border: '1px solid rgba(99,102,241,0.2)',
                            color: '#a5b4fc',
                          }}>
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="text-xs px-3 py-1 rounded-full"
                          style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)' }}>
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECT MODAL ── */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)' }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{ background: '#0d0d1a', border: '1px solid rgba(99,102,241,0.2)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
              onClick={() => setSelectedProject(null)}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(244,63,94,0.2)'; e.currentTarget.style.color = '#f87171'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
            >
              <X size={16} />
            </button>

            {/* Image */}
            <div className="relative h-52 overflow-hidden rounded-t-2xl">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" style={{ filter: 'brightness(0.7)' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0d0d1a 0%, transparent 60%)' }} />
              <div className="absolute bottom-5 left-6">
                <span className="tag-badge mb-2 inline-block">{selectedProject.tag}</span>
                <h2 className="font-display text-2xl font-bold text-white">{selectedProject.title}</h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans mb-7" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {selectedProject.fullDescription}
              </pre>

              {/* Tech */}
              <div>
                <p className="text-xs tracking-widest uppercase mb-3 font-medium" style={{ color: 'rgba(255,255,255,0.3)' }}>Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech, i) => (
                    <span key={i} className="px-4 py-1.5 rounded-full text-xs font-medium"
                      style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', color: '#a5b4fc' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CONTACT ── */}
      <section id="contact" className="py-28 relative overflow-hidden">
        <div className="hero-glow w-[600px] h-[600px] bottom-[-100px] left-1/2 -translate-x-1/2"
          style={{ background: 'rgba(99,102,241,0.1)' }} />

        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <div className={`section-enter ${isVisible.contact ? 'visible' : ''}`}>

            <div className="text-center mb-16">
              <p className="text-sm font-medium tracking-[0.3em] uppercase mb-3" style={{ color: '#6366f1', fontFamily: 'Syne, sans-serif' }}>
                04 — Contact
              </p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Let's Build Something <span className="gradient-text">Together</span>
              </h2>
              <p className="max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
                I'm always open to discussing new projects, opportunities, or just connecting with fellow developers.
              </p>
            </div>

            {/* Contact Card */}
            <div className="card-glass rounded-3xl p-10 mb-8"
              style={{ background: 'rgba(99,102,241,0.04)', borderColor: 'rgba(99,102,241,0.15)' }}>
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white mb-4">Ready to collaborate?</h3>
                  <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Whether you have a specific project in mind or just want to explore possibilities, I'd love to hear from you.
                    I typically respond within 24 hours.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl p-4" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}>
                      <div className="font-display text-xl font-bold mb-1" style={{ color: '#6366f1' }}>24h</div>
                      <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Response Time</div>
                    </div>
                    <div className="rounded-2xl p-4" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)' }}>
                      <div className="font-display text-xl font-bold mb-1" style={{ color: '#10b981' }}>Open</div>
                      <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>To Opportunities</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      href: 'mailto:priyasaravanan282@gmail.com',
                      icon: <Mail size={20} />,
                      label: 'Email',
                      value: 'priyasaravanan282@gmail.com',
                      color: '#6366f1',
                    },
                    {
                      href: 'https://www.linkedin.com/in/priyadharshini-s-a148aa274/',
                      icon: <Linkedin size={20} />,
                      label: 'LinkedIn',
                      value: 'Connect professionally',
                      color: '#0a66c2',
                    },
                    {
                      href: 'https://github.com/Priyariya1',
                      icon: <Github size={20} />,
                      label: 'GitHub',
                      value: 'View my repositories',
                      color: '#8b5cf6',
                    },
                  ].map((contact, i) => (
                    <a
                      key={i}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = `${contact.color}50`; e.currentTarget.style.background = `${contact.color}0a`; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                    >
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{ background: `${contact.color}20`, color: contact.color }}>
                        {contact.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white">{contact.label}</div>
                        <div className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>{contact.value}</div>
                      </div>
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1"
                        style={{ color: 'rgba(255,255,255,0.3)' }} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:priyasaravanan282@gmail.com"
                className="btn-primary flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white relative z-10"
              >
                <Mail size={18} />
                Send Me an Email
              </a>
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold"
              >
                <Download size={18} />
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 relative z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-display"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>P</div>
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>Priyadharshini · Full Stack Developer</span>
          </div>
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            © 2025 · Built with React & Tailwind CSS
          </span>
        </div>
      </footer>
    </div>
  );
}
