import { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code, Database, Server, Globe, Menu, X, Star, ArrowRight, User, Briefcase } from 'lucide-react';
import Hero from '../src/assets/image.png'
import resume from '../src/assets/Priyadharshini-developer.pdf'


export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState({});
  const [scrollY, setScrollY] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);


  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const techSkills = [
    { name: 'React.js', icon: '⚛️', color: 'from-blue-500 to-cyan-500' },
    { name: 'Next.js', icon: '▲', color: 'from-gray-500 to-gray-700' },
    { name: 'JavaScript', icon: 'JS', color: 'from-yellow-500 to-orange-500' },
    { name: 'Node.js', icon: '🟢', color: 'from-green-600 to-green-500' },
    { name: 'Express.js', icon: '🚂', color: 'from-gray-600 to-gray-800' },
    { name: 'NestJS', icon: 'N', color: 'from-red-600 to-pink-600' },
    { name: 'MongoDB', icon: '🍃', color: 'from-green-500 to-emerald-500' },
    { name: 'MySQL', icon: '🗄️', color: 'from-blue-600 to-blue-800' },
    { name: 'Prisma', icon: '⚡', color: 'from-indigo-600 to-purple-600' },
    { name: 'Tailwind CSS', icon: '💨', color: 'from-cyan-500 to-blue-500' },
    { name: 'HTML/CSS', icon: '🎨', color: 'from-orange-500 to-red-500' },
    { name: 'Firebase', icon: '🔥', color: 'from-orange-600 to-yellow-600' },
    { name: 'TypeScript', icon: 'TS', color: 'from-blue-500 to-indigo-600' },
    { name: 'Git', icon: '📦', color: 'from-gray-700 to-gray-900' },
    { name: 'Python', icon: '🐍', color: 'from-yellow-400 to-blue-500' }
  ];

  const projects = [

    {
      title: 'Mobile Application',
      description: 'AI-driven mobile app for CA students that delivers accurate, exam-focused answers using RAG-based knowledge retrieval.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop',
      fullDescription: `AI-powered mobile application built exclusively for Chartered Accountancy (CA) students, designed to answer CA-related questions with high accuracy using domain-specific knowledge.
    
    The app provides instant explanations, exam-oriented answers, and concept clarity across CA Foundation, Inter, and Final levels by leveraging Retrieval-Augmented Generation (RAG)..
    User authentication using Google Sign-In (Firebase Auth) for secure login
    
    Key Features:
    Implemented secure authentication using Google Sign-In with Firebase Auth
    Developed a ChatGPT-like conversational interface tailored for CA students
    Integrated Python-based RAG pipeline for accurate domain-specific responses
    Enabled Razorpay-powered subscription payments for premium features
    Designed scalable REST APIs using Express.js
    Managed user data, chat history, and access limits with MongoDB Atlas
    Built a responsive, mobile-first UI using React Native & Tailwind CSS
    
    The app ensures a seamless experience from browsing to checkout and was developed using React.js, Firebase, and TailwindCSS.`,
      tech: ['React Native', 'TailwindCSS', 'Express', 'MongoDB', 'Python'],
    },
    {
      title: 'NXI',
      description: 'Internal project management platform with role-based login, hierarchical data, and tabbed nested structure.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
      fullDescription: `NXI is an internal enterprise-grade project management system designed to manage hierarchical data structures with strict access control.
    
        Key Features:
        - Role-based login: Only admins can add new users/admins through the dashboard
        - No public registration; user credentials are sent via email for secure login
        - Parent-child project relationship with deep nesting support
        - Each project includes three interconnected tabs:
          1. **Nested Table** – stores hierarchical data using a dynamic nested array model
          2. **Association** – manages relations across different nodes or entities
          3. **Detailing** – provides additional contextual metadata and deep linking
        - Reusable structure across multiple projects for consistency
        - Fully responsive, admin-first interface with advanced filtering and real-time updates
    
        Tech stack includes React.js (frontend), Express (backend), MySQL with Prisma ORM (database), and TailwindCSS for UI.`,
      tech: ['React.js', 'Express', 'MySQL', 'Tailwind', 'Prisma ORM'],
    },
    {
      title: 'Supershield',
      description: 'Property listing platform with advanced search, filters, and virtual tour integration.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop',
      fullDescription: `Supershield is a large-scale construction and property listing platform featuring 92 frontend pages built with Next.js and TailwindCSS.

      Key Features:
      - Real estate/property listing system with dynamic filters and search
      - WordPress-powered backend CMS for easy content management
      - Fully responsive, SEO-optimized pages
      - Admin-editable project database through custom WordPress APIs
      - Filtered views for project type, location, budget, and status
      - Smooth performance across all devices and browsers

      This platform is tailored for modern construction businesses to showcase ongoing, upcoming, and completed projects effectively with high visual appeal and usability.`,
      tech: ['Next.js', 'Wordpress', 'Tailwind'],
    },
    {
        title: 'Ai Assistant',
        description: 'AI-powered internal application developed for a CA coaching institute to evaluate students written answers after class completion.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
        fullDescription: `Tutors assign questions to students, who submit their written answers through the application. The system analyzes each response using RAG-based evaluation logic and provides objective scoring and feedback aligned with institute-defined answer standards..

        Key Features:
        - Role-based authentication for Admin, Tutor, and Student users
          Admin-controlled user creation and access management
          Login credentials automatically sent via email to registered users
          Tutor dashboard to assign questions after class completion
          Student portal for answer submission and status tracking
          RAG-based AI answer evaluation using reference solutions
          Automated score generation with qualitative feedback
          Tutor access to review student answers and performance reports
          Secure storage of answers, scores, and evaluation history

        It helps streamline room scheduling, avoids booking conflicts, and ensures efficient utilization of space.`,
          tech: ['Next.js', 'Express.js', 'Mongodb', 'TailwindCSS','Python'],
        },
    {
      title: 'Meeting Room Allocation System',
      description: 'Smart room booking system with role-based access control for efficient meeting room management and allocation.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop',
      fullDescription: `A comprehensive meeting room allocation system designed to streamline room booking and management for organizations. The application provides an intuitive interface for users to book available meeting rooms while ensuring proper access control and conflict prevention.

      Key Features:
      - Firebase Authentication with role-based access control (Admin, Manager, Employee roles)
      - Secure login system with email/password authentication
      - Real-time room availability tracking using Firebase Realtime Database
      - Three meeting rooms with individual booking management
      - Interactive calendar view for viewing and booking rooms
      - Conflict detection to prevent double bookings
      - Admin dashboard for managing rooms, users, and bookings
      - Role-based permissions: Admins can manage all bookings, Managers can view and approve, Employees can book available rooms
      - Booking history and analytics for room utilization
      - Email notifications for booking confirmations and reminders
      - Responsive design built with TailwindCSS for seamless mobile and desktop experience
      - Real-time updates when rooms are booked or released

      The system helps organizations efficiently manage their meeting room resources, avoid booking conflicts, and ensure optimal utilization of available space.`,
      tech: ['React.js', 'TailwindCSS', 'Firebase'],
    }
    
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={() => scrollToSection('home')}
              className="text-left"
            >
              <div className="text-xs uppercase tracking-[0.25em] text-gray-400">
                Full Stack Developer
              </div>
              
            </button>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-8">
              {[
  { id: 'home', label: 'Home', icon: User },
  { id: 'about', label: 'About', icon: User }, // 👈 ADD THIS
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'contact', label: 'Contact', icon: Mail }
]
.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:bg-gray-800/50 ${
                      activeSection === item.id 
                        ? 'text-blue-400 bg-gray-800/30 shadow-lg' 
                        : 'text-gray-300 hover:text-blue-400'
                    }`}
                  >
                    <IconComponent size={16} />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300  ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-gray-800/95 backdrop-blur-lg border-t border-gray-700`}>
          <div className="px-4 py-4 space-y-2">
            {[
              { id: 'home', label: 'Home', icon: User },
              { id: 'skills', label: 'Skills', icon: Code },
              { id: 'projects', label: 'Projects', icon: Briefcase },
              { id: 'contact', label: 'Contact', icon: Mail }
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                >
                  <IconComponent size={18} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-[100svh] lg:min-h-screen overflow-visible flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-3000"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-cyan-900/30 z-0"></div>

        {/* Content container */}
        <div className="max-w-7xl mx-auto w-full relative z-10 py-12 sm:py-20">
          {/* Main Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16 mb-16">
            {/* Text Section */}
            <div className={`transition-all duration-1000 ${isVisible.home ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-4 mt-10">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-sm text-blue-300 font-medium ">Available for Opportunities</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                <span className="text-sm sm:text-base uppercase tracking-[0.4em] text-blue-300/80 block mb-2">
                  Full Stack Developer
                </span>
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent block text-2xl sm:text-3xl md:text-4xl">
                  Hi, I'm Priyadharshini
                </span>
                <span className="text-white text-xl sm:text-2xl md:text-3xl block mt-4">
                  Building Scalable Web Applications
                </span>
              </h1>

              <div className="h-1.5 w-32 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 rounded-full mb-4"></div>

              <p className="text-md sm:text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                Full‑stack developer at <span className="text-blue-400 font-semibold">Senthurontech</span>, 
                transforming business challenges into <span className="text-purple-400 font-semibold">production-ready solutions</span>.
              </p>

              {/* Key Highlights for Recruiters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="group bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-4 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1 group-hover:scale-110 transition-transform">1+</div>
                  <div className="text-sm text-gray-300">Years Experience</div>
                </div>
                <div className="group bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1 group-hover:scale-110 transition-transform">20+</div>
                  <div className="text-sm text-gray-300">Projects Delivered</div>
                </div>
                <div className="group bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                  <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1 group-hover:scale-110 transition-transform">100%</div>
                  <div className="text-sm text-gray-300">Client Satisfaction</div>
                </div>
              </div>

              {/* Tech Stack Badges */}
              <div className="mb-8">
                <p className="text-sm text-gray-400 mb-3 font-medium">Core Technologies:</p>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Next.js', 'Node.js', 'Express', 'MySQL', 'MongoDB', 'Prisma', 'Tailwind CSS'].map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-gray-800/70 border border-gray-700/50 text-gray-200 text-sm hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-4">
        <button
          onClick={() => scrollToSection('projects')}
          className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
        >
          View My Work 
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <a
          href={resume}
          target="_blank"
          rel="noopener noreferrer"
          className="border-2 border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-gray-900 px-6 py-3 rounded-full transition-all duration-300 hover:shadow-xl text-center"
        >
          View Resume
        </a>
        <button
          onClick={() => scrollToSection('contact')}
          className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 px-6 py-3 rounded-full transition-all duration-300 hover:shadow-xl"
        >
          Get In Touch
        </button>
      </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <a 
                  href="https://github.com/Priyariya1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group p-3 bg-gray-800/50 hover:bg-blue-600 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
                >
                  <Github size={22} className="text-gray-300 group-hover:text-white" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/priyadharshini-s-a148aa274/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group p-3 bg-gray-800/50 hover:bg-blue-600 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
                >
                  <Linkedin size={22} className="text-gray-300 group-hover:text-white" />
                </a>
                <a 
                  href="mailto:priyasaravanan282@gmail.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group p-3 bg-gray-800/50 hover:bg-blue-600 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
                >
                  <Mail size={22} className="text-gray-300 group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* Image Section */}
            <div className={`relative flex justify-center transition-all duration-1000 delay-300 ${isVisible.home ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
                {/* Animated Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-spin-slow"></div>
                <div className="absolute inset-4 rounded-full border-2 border-purple-400/30 animate-spin-reverse"></div>
                <div className="absolute inset-8 rounded-full border-2 border-cyan-400/30 animate-pulse"></div>
                <div className="absolute inset-12 rounded-full border-2 border-pink-400/20 animate-pulse delay-1000"></div>

                {/* Profile Image */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 p-1">
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                    <img 
                      src={Hero}
                      alt="Priyadharshini - Full Stack Developer"
                      className="w-full h-full object-cover rounded-full hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Floating Tech Icons */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 shadow-xl animate-bounce hover:scale-110 transition-transform cursor-default">
                  <Code size={24} className="text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-3 shadow-xl animate-bounce delay-1000 hover:scale-110 transition-transform cursor-default">
                  <Database size={24} className="text-white" />
                </div>
                <div className="absolute top-1/2 -right-8 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl p-2.5 shadow-xl animate-bounce delay-500 hover:scale-110 transition-transform cursor-default">
                  <Server size={20} className="text-white" />
                </div>
                <div className="absolute top-1/4 -left-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-2.5 shadow-xl animate-bounce delay-1500 hover:scale-110 transition-transform cursor-default">
                  <Globe size={20} className="text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Recruiter-Focused Stats Bar */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-1000 delay-500 ${isVisible.home ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="text-blue-400" size={24} />
                <h4 className="font-semibold text-white">Experience</h4>
              </div>
              <p className="text-2xl font-bold text-blue-400 mb-1">1+ Year</p>
              <p className="text-sm text-gray-400">Full Stack Development</p>
            </div>

            <div className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-2">
                <Code className="text-purple-400" size={24} />
                <h4 className="font-semibold text-white">Projects</h4>
              </div>
              <p className="text-2xl font-bold text-purple-400 mb-1">20+</p>
              <p className="text-sm text-gray-400">Successfully Delivered</p>
            </div>

            <div className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-2">
                <Star className="text-cyan-400" size={24} />
                <h4 className="font-semibold text-white">Skills</h4>
              </div>
              <p className="text-2xl font-bold text-cyan-400 mb-1">15+</p>
              <p className="text-sm text-gray-400">Technologies Mastered</p>
            </div>

            <div className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-2">
                <Database className="text-green-400" size={24} />
                <h4 className="font-semibold text-white">Availability</h4>
              </div>
              <p className="text-2xl font-bold text-green-400 mb-1">Open</p>
              <p className="text-sm text-gray-400">To New Opportunities</p>
            </div>
          </div>
        </div>

        {/* Scroll Down Button */}
        <button
          onClick={() => scrollToSection('skills')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10 group"
        >
          <div className="p-3 bg-gray-800/50 hover:bg-blue-600 rounded-full transition-all duration-300 hover:scale-110">
            <ChevronDown size={32} className="text-blue-400 group-hover:text-white" />
          </div>
        </button>
      </section>


      {/* About Section - Hidden on Mobile */}
      <section
  id="about"
  className="block py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-900 via-gray-800/50 to-gray-900 relative overflow-hidden scroll-mt-24"
>

        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            className={`transition-all duration-1000 ${
              isVisible?.about
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Title Section */}
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <div className="inline-block mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-blue-400 font-semibold">Get to Know Me</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent px-4">
                About Me
              </h2>
              <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
            </div>

            {/* Hero Card */}
            <div className="mb-8 sm:mb-10 lg:mb-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-gray-800/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 shadow-2xl p-6 sm:p-8 lg:p-10 hover:border-blue-500/50 transition-all duration-500">
              <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                      <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center">
                        <User size={48} className="sm:w-16 sm:h-16 lg:w-16 lg:h-16 text-blue-400" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Full Stack Developer
                  </h3>
                  <p className="text-base sm:text-lg text-gray-300 mb-3 sm:mb-4">
                    <span className="text-blue-400 font-semibold">@ Senthurontech</span> · Building scalable web applications
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed">
                    I'm a full-stack developer who enjoys owning features end-to-end — from clean, accessible UIs to performant, secure APIs and databases. I focus on writing maintainable code and shipping features that make a measurable difference for users and the business.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
              <div className="group relative bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1">
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all"></div>
                <div className="relative">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform">1+</div>
                  <div className="text-gray-300 text-xs sm:text-sm font-medium">Years Experience</div>
                </div>
              </div>
              <div className="group relative bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1">
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all"></div>
                <div className="relative">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform">20+</div>
                  <div className="text-gray-300 text-xs sm:text-sm font-medium">Projects Completed</div>
                </div>
              </div>
              <div className="group relative bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-1">
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all"></div>
                <div className="relative">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform">100%</div>
                  <div className="text-gray-300 text-xs sm:text-sm font-medium">Client Satisfaction</div>
                </div>
              </div>
              <div className="group relative bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20 hover:-translate-y-1">
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 bg-green-500/10 rounded-full blur-xl group-hover:bg-green-500/20 transition-all"></div>
                <div className="relative">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-400 mb-1 sm:mb-2 group-hover:scale-110 transition-transform">24/7</div>
                  <div className="text-gray-300 text-xs sm:text-sm font-medium">Available</div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Work Experience Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 p-6 sm:p-8 hover:border-blue-500/50 transition-all duration-500 shadow-2xl">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <Briefcase className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-white mb-1">Full Stack Developer</h4>
                      <p className="text-xs sm:text-sm text-gray-400">Senthurontech · 2024 – Present</p>
                    </div>
                  </div>
                  
                  <div className="mb-4 sm:mb-6">
                    <span className="inline-flex px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/30">
                      React · Node · MySQL · Prisma
                    </span>
                  </div>

                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      "Built and deployed full-stack web applications using React.js, Node.js, Express.js, and MySQL.",
                      "Designed secure RESTful APIs with authentication and role-based authorization.",
                      "Improved performance and maintainability using clean coding standards.",
                      "Optimized backend APIs, reducing response time by ~30%.",
                      "Collaborated with cross-functional teams to deliver production-ready features.",
                      "Used Git and GitHub for version control and code reviews.",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-3 text-gray-300">
                        <div className="mt-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400 shrink-0"></div>
                        <span className="text-xs sm:text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column - Stack & Focus */}
              <div className="space-y-6 sm:space-y-8">
                {/* Tech Stack Card */}
                <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 p-6 sm:p-8 hover:border-purple-500/50 transition-all duration-500 shadow-2xl">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                      <Code className="text-white" size={20} />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-white">Tech Stack</h4>
                  </div>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4">
                    My current stack includes{" "}
                    <span className="text-blue-400 font-semibold">
                      React, Next.js, Node.js, Express, Prisma, MySQL, MongoDB, Firebase
                    </span>{" "}
                    and{" "}
                    <span className="text-purple-400 font-semibold">Tailwind CSS</span>.
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    I'm actively deepening my knowledge in NestJS and cloud architecture to build more scalable backends.
                  </p>
                </div>

                {/* Current Focus Card */}
                <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 backdrop-blur-xl border border-blue-500/30 p-6 sm:p-8 hover:border-blue-400/50 transition-all duration-500 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                        <Star className="text-white" size={20} />
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-white">Current Focus</h4>
                    </div>
                    <ul className="space-y-2 sm:space-y-3">
                      {[
                        "Learning NestJS Framework",
                        "Advanced Next.js Patterns",
                        "Cloud Architecture",
                        "Learning AWS Cloud Services",
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 sm:gap-3 text-gray-200">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-400 shrink-0 animate-pulse"></div>
                          <span className="text-xs sm:text-sm font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            
            {/* Carousel Container */}
            <div className="relative">
              {/* Gradient Overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>
              
              {/* Carousel Track */}
              <div className="overflow-hidden">
                <div className="flex animate-scroll">
                  {/* First Set */}
                  {techSkills.map((skill, index) => (
                    <div
                      key={`first-${index}`}
                      className="flex-shrink-0 mx-4 group"
                    >
                      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-2 min-w-[180px]">
                        <div className="flex flex-col items-center justify-center">
                          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                            {skill.icon}
                          </div>
                          <h3 className="text-lg font-semibold text-white text-center group-hover:text-blue-400 transition-colors">
                            {skill.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Duplicate Set for Seamless Loop */}
                  {techSkills.map((skill, index) => (
                    <div
                      key={`second-${index}`}
                      className="flex-shrink-0 mx-4 group"
                    >
                      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-2 min-w-[180px]">
                        <div className="flex flex-col items-center justify-center">
                          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                            {skill.icon}
                          </div>
                          <h3 className="text-lg font-semibold text-white text-center group-hover:text-blue-400 transition-colors">
                            {skill.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-gray-800/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent px-4">
              Featured Projects
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-gray-800/90 rounded-xl sm:rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 overflow-hidden backdrop-blur-sm"
                >
                  {/* Project Image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-600/20">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-blue-500/30 to-purple-600/30 flex items-center justify-center"><div class="text-4xl sm:text-6xl">📱</div></div>';
                      }}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Project Content */}
                  <div className="p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                      {project.tech.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-700/50 text-blue-400 rounded-full text-xs font-medium border border-blue-500/20 hover:bg-blue-500/20 transition-colors cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-700/50 text-gray-400 rounded-full text-xs font-medium border border-gray-600/20">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Read More Button */}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/30"
                    >
                      Read More
                      <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
{selectedProject && (
  <div 
    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
    onClick={() => setSelectedProject(null)}
  >
    <div 
      className="bg-gray-900 rounded-xl sm:rounded-2xl max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto relative border border-gray-700/50 shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button
        className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-800/80 hover:bg-red-600 rounded-full text-gray-300 hover:text-white transition-all duration-300 text-xl sm:text-2xl"
        onClick={() => setSelectedProject(null)}
      >
        &times;
      </button>

      {/* Project Image */}
      {selectedProject.image && (
        <div className="relative h-40 sm:h-56 lg:h-64 overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-600/20">
          <img
            src={selectedProject.image}
            alt={selectedProject.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-blue-500/30 to-purple-600/30 flex items-center justify-center"><div class="text-4xl sm:text-6xl lg:text-8xl">📱</div></div>';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
        </div>
      )}

      {/* Project Content */}
      <div className="p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-400 mb-3 sm:mb-4">
          {selectedProject.title}
        </h2>

        <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 sm:mb-6 whitespace-pre-line">
          {selectedProject.fullDescription}
        </p>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {selectedProject.tech.map((tech, index) => (
            <span
              key={index}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800 text-blue-400 rounded-full text-xs sm:text-sm font-medium border border-blue-500/30 hover:bg-blue-500/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
)}


      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-gray-900 via-gray-800/50 to-gray-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Header Section */}
            <div className="text-center mb-20">
              <div className="inline-block mb-4">
                <span className="text-sm uppercase tracking-[0.3em] text-blue-400 font-semibold">Get In Touch</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Let's Work Together
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mb-6"></div>
              <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                Ready to bring your next project to life? Let's discuss how we can work together 
                to create something <span className="text-blue-400 font-semibold">amazing</span>.
              </p>
            </div>

            {/* Main Contact Card */}
            <div className="bg-gradient-to-br from-gray-800/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-8 sm:p-12 mb-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Contact Info */}
                <div>
                  <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Let's Start a Conversation
                  </h3>
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                    Whether you have a project in mind, want to collaborate, or just want to say hello, 
                    I'd love to hear from you. Drop me a message and let's make something great together!
                  </p>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-4 border border-blue-500/20">
                      <div className="text-2xl font-bold text-blue-400 mb-1">24h</div>
                      <div className="text-sm text-gray-400">Response Time</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-4 border border-purple-500/20">
                      <div className="text-2xl font-bold text-purple-400 mb-1">100%</div>
                      <div className="text-sm text-gray-400">Available</div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Contact Methods */}
                <div className="space-y-4">
                  <a
                    href="mailto:priyasaravanan282@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-4 p-6 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-2xl border border-gray-600/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Mail size={24} className="text-white" />
                    </div>
                    <div className="relative flex-1">
                      <h4 className="font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">Email</h4>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors break-all">priyasaravanan282@gmail.com</p>
                    </div>
                    <ArrowRight size={20} className="text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/priyadharshini-s-a148aa274/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-4 p-6 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-2xl border border-gray-600/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Linkedin size={24} className="text-white" />
                    </div>
                    <div className="relative flex-1">
                      <h4 className="font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">LinkedIn</h4>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Connect with me</p>
                    </div>
                    <ArrowRight size={20} className="text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </a>

                  <a
                    href="https://github.com/Priyariya1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-4 p-6 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-2xl border border-gray-600/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Github size={24} className="text-white" />
                    </div>
                    <div className="relative flex-1">
                      <h4 className="font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">GitHub</h4>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">View my code</p>
                    </div>
                    <ArrowRight size={20} className="text-gray-400 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                  </a>
                </div>
              </div>
            </div>

            {/* Additional Contact Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="group relative bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1">
                <div className="absolute top-4 right-4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all"></div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg">
                    <Mail size={24} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Email Me</h4>
                  <p className="text-sm text-gray-400">Quick response guaranteed</p>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1">
                <div className="absolute top-4 right-4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all"></div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg">
                    <Linkedin size={24} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">LinkedIn</h4>
                  <p className="text-sm text-gray-400">Professional networking</p>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-1">
                <div className="absolute top-4 right-4 w-16 h-16 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all"></div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center mb-4 shadow-lg">
                    <Github size={24} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">GitHub</h4>
                  <p className="text-sm text-gray-400">Check out my projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800 bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 Full Stack Developer Portfolio. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-3180px);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
}