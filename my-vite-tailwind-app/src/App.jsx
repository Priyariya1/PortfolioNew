import { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code, Database, Server, Globe, Menu, X, Star, ArrowRight, User, Briefcase } from 'lucide-react';
import Hero from '../src/assets/image.png'


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

  const skills = {
    frontend: [
      { name: 'React.js', level: 90, color: 'bg-blue-500' },
      { name: 'Next.js', level: 85, color: 'bg-gray-500' },
      { name: 'Tailwind CSS', level: 95, color: 'bg-cyan-500' },
      { name: 'JavaScript', level: 90, color: 'bg-yellow-500' },
      { name: 'HTML/CSS', level: 95, color: 'bg-orange-500' }
    ],
    backend: [
      { name: 'Node.js', level: 85, color: 'bg-green-600' },
      { name: 'Express.js', level: 85, color: 'bg-gray-600' },
      { name: 'NestJS', level: 70, color: 'bg-red-600' },
      { name: 'Prisma ORM', level: 80, color: 'bg-indigo-600' }
    ],
    database: [
      { name: 'MongoDB', level: 75, color: 'bg-green-500' },
      { name: 'MySQL', level: 85, color: 'bg-blue-600' },
      { name: 'SQLite', level: 85, color: 'bg-gray-500' },
      { name: 'Firebase', level: 80, color: 'bg-orange-600' }
    ]
  };

  const projects = [
    {
        title: 'Meeting Room Booking',
        description: 'The Meeting Room Booking System is a full-stack web application that enables organizations to efficiently manage the scheduling and allocation of meeting spaces.',
        fullDescription: `This is a full-featured booking management platform designed for office environments and co-working spaces.

        Key Features:
        - User authentication with role-based access (Admin/User)
        - Real-time room availability checking and time slot selection
        - Admin dashboard with booking request management (Accept/Reject/History)
        - Tab-based filtering for booking status (Pending, Accepted, Rejected, Expired)
        - Automatic movement of expired bookings to history
        - Responsive UI with pagination, sorting, and search
        - Built with React.js (frontend), Express.js (backend), Firebase Firestore for real-time updates, and TailwindCSS for design

        It helps streamline room scheduling, avoids booking conflicts, and ensures efficient utilization of space.`,
          tech: ['React.js', 'Express.js', 'Firebase', 'TailwindCSS'],
        },

    {
      title: 'Supershield',
      description: 'Property listing platform with advanced search, filters, and virtual tour integration.',
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
  title: 'NXI',
  description: 'Internal project management platform with role-based login, hierarchical data, and tabbed nested structure.',
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
  title: 'Cake-shop',
  description: 'Full-stack e-commerce application with user authentication, payment integration, and admin dashboard.',
  fullDescription: `Cake-shop is a full-stack online cake ordering platform that enables users to browse, customize, and purchase cakes with ease.

Key Features:
- User authentication using Firebase Auth (Login/Register)
- Dynamic product listing with filters and image previews
- Shopping cart with real-time updates
- Order tracking system with unique order IDs
- Image upload functionality for custom cake designs
- Admin dashboard to manage orders, users, and product listings
- Integrated payment gateway for secure transactions
- Responsive design built with TailwindCSS for mobile-first usability

The app ensures a seamless experience from browsing to checkout and was developed using React.js, Firebase, and TailwindCSS.`,
  tech: ['React.js', 'TailwindCSS', 'Firebase'],
},
{
  title: 'Event Management System',
  description: 'Comprehensive platform for planning, scheduling, and managing events with real-time updates.',
  fullDescription: `The Event Management System is a full-stack application designed to streamline the process of organizing and managing events for organizations and institutions.

Key Features:
- Admin panel for creating and managing events, venues, and attendees
- User login with role-based access (Admin, Organizer, Participant)
- Event registration and approval workflows
- Real-time updates for event changes and announcements
- Dynamic calendar view with filters by date, category, and location
- Automated email notifications for registrations, updates, and reminders
- Task assignment and tracking for event staff and volunteers
- Built with React.js on the frontend, Prisma ORM with MySQL for the backend, and styled using TailwindCSS for responsive design

Ideal for universities, corporate teams, and event organizers, the system centralizes event-related communication and task tracking into a single easy-to-use platform.`,
  tech: ['React.js', 'Prisma', 'MySQL', 'TailwindCSS'],
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
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
              &lt;DevPortfolio/&gt;
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-8">
              {[
                { id: 'home', label: 'Home', icon: User },
                { id: 'about', label: 'About', icon: User },
                { id: 'skills', label: 'Skills', icon: Code },
                { id: 'projects', label: 'Projects', icon: Briefcase },
                { id: 'contact', label: 'Contact', icon: Mail }
              ].map((item) => {
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
              { id: 'about', label: 'About', icon: User },
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
     <section id="home" className="min-h-screen flex flex-col justify-center items-center px-6 sm:px-8 lg:px-10 relative text-center lg:text-left">
  {/* Gradient background */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20 z-0"></div>

  {/* Content container */}
  <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 relative z-10 py-20">
    {/* Text Section */}
    <div className={`transition-all duration-1000 ${isVisible.home ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-pulse">
          Full Stack
        </span>
        <br />
        <span className="text-white">Developer</span>
      </h1>
      <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto lg:mx-0 rounded-full animate-pulse mb-6"></div>

      <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
        Currently working at <span className="text-blue-400 font-semibold">Senthurontech</span>, crafting seamless digital experiences with modern technologies.
      </p>

      <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8">
        <button
          onClick={() => scrollToSection('projects')}
          className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
        >
          View My Work 
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => scrollToSection('contact')}
          className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 px-6 py-3 rounded-full transition-all duration-300 hover:shadow-xl"
        >
          Get In Touch
        </button>
      </div>

      {/* Social Links */}
      <div className="flex justify-center lg:justify-start gap-4">
        <a href="https://github.com/Priyariya1" target="_blank" className="p-3 bg-gray-800/50 hover:bg-blue-600 rounded-full transition-all duration-300 hover:scale-110">
          <Github size={20} />
        </a>
        <a href="https://www.linkedin.com/in/priyadharshini-s-a148aa274/" target="_blank" className="p-3 bg-gray-800/50 hover:bg-blue-600 rounded-full transition-all duration-300 hover:scale-110">
          <Linkedin size={20} />
        </a>
        <a href="mailto:priyasaravanan282@gmail.com" target="_blank" className="p-3 bg-gray-800/50 hover:bg-blue-600 rounded-full transition-all duration-300 hover:scale-110">
          <Mail size={20} />
        </a>
      </div>
    </div>

    {/* Image Section */}
    <div className={`relative flex justify-center transition-all duration-1000 delay-300 ${isVisible.home ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
      <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full">
        {/* Animated Rings */}
        <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-spin-slow"></div>
        <div className="absolute inset-4 rounded-full border-2 border-purple-400/30 animate-spin-reverse"></div>
        <div className="absolute inset-8 rounded-full border-2 border-cyan-400/30 animate-pulse"></div>

        {/* Profile Image */}
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-400 to-purple-500 p-1">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
            <img 
              src={Hero}
              alt="Developer Profile"
              className="w-full h-full object-cover rounded-full hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Floating Icons */}
        <div className="absolute -top-3 -right-3 bg-blue-500 rounded-full p-2 animate-bounce">
          <Code size={20} className="text-white" />
        </div>
        <div className="absolute -bottom-3 -left-3 bg-purple-500 rounded-full p-2 animate-bounce delay-1000">
          <Database size={20} className="text-white" />
        </div>
        <div className="absolute top-1/2 -right-6 bg-cyan-500 rounded-full p-1 animate-bounce delay-500">
          <Server size={16} className="text-white" />
        </div>
      </div>
    </div>
  </div>

  {/* Scroll Down Button */}
  <button
    onClick={() => scrollToSection('about')}
    className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-10"
  >
    <ChevronDown size={32} className="text-blue-400" />
  </button>
</section>


      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800/50 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-blue-400">Full Stack Developer at Senthurontech</h3>
                <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                  I'm a passionate full-stack developer currently working at Senthurontech, where I build 
                  scalable applications with modern web technologies. I love creating solutions that solve 
                  real-world problems and provide exceptional user experiences.
                </p>
                <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                  Currently expanding my skills with NestJS while maintaining proficiency in 
                  React.js, Node.js, and various database technologies. I enjoy working on 
                  challenging projects that push the boundaries of what's possible on the web.
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                    <div className="text-3xl font-bold text-blue-400 mb-2">1</div>
                    <div className="text-gray-300">Years Experience</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                    <div className="text-3xl font-bold text-purple-400 mb-2">20+</div>
                    <div className="text-gray-300">Projects Completed</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full max-w-md mx-auto bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl p-8 backdrop-blur-sm border border-gray-700">
                 <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Code size={40} className="text-white" />
                    </div>
                    <h4 className="text-xl font-semibold mb-4">Current Focus</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <Star size={16} className="text-yellow-400" />
                        Learning NestJS Framework
                      </li>
                      <li className="flex items-center gap-2">
                        <Star size={16} className="text-yellow-400" />
                        Advanced Next Patterns
                      </li>
                      <li className="flex items-center gap-2">
                        <Star size={16} className="text-yellow-400" />
                        Cloud Architecture
                      </li>
                      <li className="flex items-center gap-2">
                        <Star size={16} className="text-yellow-400" />
                        Learning AWS Cloud Services
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Frontend */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                <div className="flex items-center mb-6">
                  <Globe className="text-blue-400 mr-3" size={28} />
                  <h3 className="text-xl font-semibold">Frontend</h3>
                </div>
                <div className="space-y-4">
                  {skills.frontend.map((skill, index) => (
                    <div key={index} className="group">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                        <span className="text-sm text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full ${skill.color} transition-all duration-1000 ease-out`}
                          style={{ width: isVisible.skills ? `${skill.level}%` : '0%' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
                <div className="flex items-center mb-6">
                  <Server className="text-green-400 mr-3" size={28} />
                  <h3 className="text-xl font-semibold">Backend</h3>
                </div>
                <div className="space-y-4">
                  {skills.backend.map((skill, index) => (
                    <div key={index} className="group">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                        <span className="text-sm text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full ${skill.color} transition-all duration-1000 ease-out delay-200`}
                          style={{ width: isVisible.skills ? `${skill.level}%` : '0%' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Database */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 md:col-span-2 lg:col-span-1">
                <div className="flex items-center mb-6">
                  <Database className="text-purple-400 mr-3" size={28} />
                  <h3 className="text-xl font-semibold">Database</h3>
                </div>
                <div className="space-y-4">
                  {skills.database.map((skill, index) => (
                    <div key={index} className="group">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                        <span className="text-sm text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full ${skill.color} transition-all duration-1000 ease-out delay-400`}
                          style={{ width: isVisible.skills ? `${skill.level}%` : '0%' }}
                        ></div>
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
      <section id="projects" className="py-20 bg-gray-800/50 relative">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className={`transition-all duration-1000 ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Featured Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-2 p-6"
          >
            <h3 className="text-xl font-semibold mb-3 text-blue-400 group-hover:text-blue-300 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1 bg-gray-700 text-blue-400 rounded-full text-sm hover:bg-blue-400 hover:text-gray-900 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-auto text-right">
              <button  onClick={() => setSelectedProject(project)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                View
              </button>
              </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
{selectedProject && (
  <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-60 flex items-center justify-center z-50">
    <div className="bg-gray-900 p-6 rounded-xl max-w-lg w-full relative border border-gray-700 text-white">
      <button
        className="absolute top-2 right-3 text-gray-400 hover:text-red-400 text-2xl"
        onClick={() => setSelectedProject(null)}
      >
        &times;
      </button>

      <h2 className="text-2xl font-bold text-blue-400 mb-4">
        {selectedProject.title}
      </h2>

      <p className="text-gray-300 leading-relaxed mb-4">
        {selectedProject.fullDescription }
      </p>

      <div className="flex flex-wrap gap-2">
        {selectedProject.tech.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-700 text-blue-400 rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </div>
)}


      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            
            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 backdrop-blur-sm">
              <div className="text-center mb-8">
                <p className="text-gray-300 text-lg mb-6">
                  Ready to bring your next project to life? Let's discuss how we can work together 
                  to create something amazing.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <a
                  href="mailto:priyasaravanan282@gmail.com"
                  className="p-6 bg-gray-700/50 hover:bg-blue-600 rounded-xl transition-all duration-300 group hover:scale-105 hover:shadow-lg"
                >
                  <Mail size={32} className="mx-auto mb-4 text-blue-400 group-hover:text-white transition-colors" />
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-gray-300 break-words group-hover:text-white transition-colors">priyasaravanan282@gmail.com</p>
                </a>
                
                <a
                  href="https://www.linkedin.com/in/priyadharshini-s-a148aa274/"
                  className="p-6 bg-gray-700/50 hover:bg-blue-600 rounded-xl transition-all duration-300 group hover:scale-105 hover:shadow-lg"
                >
                  <Linkedin size={32} className="mx-auto mb-4 text-blue-400 group-hover:text-white transition-colors" />
                  <h3 className="font-semibold mb-2">LinkedIn</h3>
                  <p className="text-gray-300 group-hover:text-white transition-colors">Connect with me</p>
                </a>
                
                <a
                  href="https://github.com/Priyariya1"
                  className="p-6 bg-gray-700/50 hover:bg-blue-600 rounded-xl transition-all duration-300 group hover:scale-105 hover:shadow-lg"
                >
                  <Github size={32} className="mx-auto mb-4 text-blue-400 group-hover:text-white transition-colors" />
                  <h3 className="font-semibold mb-2">GitHub</h3>
                  <p className="text-gray-300 group-hover:text-white transition-colors">View my code</p>
                </a>
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
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
      `}</style>
    </div>
  );
}