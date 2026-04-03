import { useState, useEffect, useRef } from 'react';
import {
  Github, Linkedin, Mail, Code, Database, Server, Globe,
  Menu, X, ArrowRight, Briefcase, ChevronDown, Star, Download, Layers, ExternalLink
} from 'lucide-react';
import Hero from '../src/assets/image.png';
import resume from '../src/assets/Priyadharshini-developer.pdf';

/* ─── PARTICLE CANVAS ──────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.1,
      color: ['#6366f1','#8b5cf6','#06b6d4','#a78bfa'][Math.floor(Math.random()*4)],
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2,'0');
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99,102,241,${0.1*(1-dist/110)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:'fixed',inset:0,pointerEvents:'none',zIndex:0,opacity:.65 }} />;
}

/* ─── TYPEWRITER ────────────────────────────────────── */
function Typewriter({ words, speed = 75, pause = 2000 }) {
  const [display, setDisplay] = useState('');
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[wi];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(word.slice(0, ci + 1));
        if (ci + 1 === word.length) setTimeout(() => setDeleting(true), pause);
        else setCi(c => c + 1);
      } else {
        setDisplay(word.slice(0, ci - 1));
        if (ci - 1 === 0) { setDeleting(false); setWi(w => (w + 1) % words.length); setCi(0); }
        else setCi(c => c - 1);
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [display, wi, ci, deleting, words, speed, pause]);
  return <span>{display}<span style={{color:'#6366f1',animation:'blink 1s step-end infinite',display:'inline-block'}}>|</span></span>;
}

/* ─── COUNTER ───────────────────────────────────────── */
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        obs.disconnect();
        const start = performance.now();
        const dur = 1600;
        const tick = (now) => {
          const t = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - t, 4);
          setCount(Math.floor(ease * target));
          if (t < 1) requestAnimationFrame(tick); else setCount(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── REVEAL ────────────────────────────────────────── */
function Reveal({ children, delay = 0, dir = 'up' }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const from = { up:'translateY(50px)', left:'translateX(-50px)', right:'translateX(50px)', scale:'scale(0.85)' };
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translate(0,0) scale(1)' : from[dir] || 'translateY(50px)',
      transition: `opacity .8s ease ${delay}s, transform .9s cubic-bezier(0.23,1,0.32,1) ${delay}s`,
    }}>{children}</div>
  );
}

/* ─── GLITCH ────────────────────────────────────────── */
function GlitchText({ text, style }) {
  return (
    <span style={{ position:'relative', display:'inline-block', ...style }} data-text={text}
      className="glitch-el">{text}</span>
  );
}

/* ─── TILT CARD ─────────────────────────────────────── */
function TiltCard({ children, style, onClick, className }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(700px) rotateY(${x*12}deg) rotateX(${-y*12}deg) translateZ(12px)`;
    const shine = ref.current.querySelector('.shine');
    if (shine) shine.style.background = `radial-gradient(circle at ${(x+.5)*100}% ${(y+.5)*100}%, rgba(255,255,255,.1) 0%, transparent 60%)`;
  };
  const onLeave = () => {
    ref.current.style.transform = 'perspective(700px) rotateY(0) rotateX(0) translateZ(0)';
    const shine = ref.current.querySelector('.shine');
    if (shine) shine.style.background = 'transparent';
  };
  return (
    <div ref={ref} style={{ ...style, transition:'transform .4s cubic-bezier(0.23,1,0.32,1)', transformStyle:'preserve-3d', position:'relative', cursor: onClick ? 'pointer':'default' }}
      onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick} className={className}>
      <div className="shine" style={{ position:'absolute',inset:0,borderRadius:'inherit',pointerEvents:'none',zIndex:10,transition:'background .3s' }}/>
      {children}
    </div>
  );
}

/* ─── MAGNETIC BTN ──────────────────────────────────── */
function Magnetic({ children, style, onClick, href, target, rel, className }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width/2) * 0.3;
    const y = (e.clientY - r.top - r.height/2) * 0.3;
    ref.current.style.transform = `translate(${x}px,${y}px)`;
  };
  const onLeave = () => { ref.current.style.transform = 'translate(0,0)'; };
  const Tag = href ? 'a' : 'button';
  return (
    <Tag ref={ref} style={{ ...style, transition:'transform .35s cubic-bezier(0.23,1,0.32,1)' }}
      onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick}
      href={href} target={target} rel={rel} className={className}>{children}</Tag>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mouse, setMouse] = useState({ x: -100, y: -100 });
  const [cursorBig, setCursorBig] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    const onMouse = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('scroll', onScroll);
    window.addEventListener('mousemove', onMouse);
    const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }), { threshold: 0.3 });
    document.querySelectorAll('section[id]').forEach(s => obs.observe(s));
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('mousemove', onMouse); obs.disconnect(); };
  }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:'smooth' }); setMenuOpen(false); };

  const navItems = ['home','about','skills','projects','contact'];

  const techSkills = [
    { name:'React.js', icon:'⚛️', category:'Frontend' },
    { name:'Next.js', icon:'▲', category:'Frontend' },
    { name:'JavaScript', icon:'JS', category:'Language' },
    { name:'TypeScript', icon:'TS', category:'Language' },
    { name:'Node.js', icon:'🟢', category:'Backend' },
    { name:'Express.js', icon:'🚂', category:'Backend' },
    { name:'NestJS', icon:'N', category:'Backend' },
    { name:'MongoDB', icon:'🍃', category:'Database' },
    { name:'MySQL', icon:'🗄️', category:'Database' },
    { name:'Prisma', icon:'⚡', category:'ORM' },
    { name:'Tailwind CSS', icon:'💨', category:'Styling' },
    { name:'Firebase', icon:'🔥', category:'Cloud' },
    { name:'Python', icon:'🐍', category:'Language' },
    { name:'Git', icon:'📦', category:'Tools' },
    { name:'HTML/CSS', icon:'🎨', category:'Frontend' },
  ];

  const projects = [
    { title:'CA Student AI App', tag:'Mobile · AI', description:'AI-driven mobile app for CA students with RAG-based knowledge retrieval, exam-focused answers, and Razorpay subscription payments.', image:'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop', color:'#6366f1', fullDescription:`AI-powered mobile application for Chartered Accountancy (CA) students.\n\nKey Features:\n• Secure Google Sign-In via Firebase Auth\n• ChatGPT-like conversational interface\n• Python-based RAG pipeline for domain-specific answers\n• Razorpay subscription payments\n• Scalable REST APIs with Express.js\n• MongoDB Atlas for user data & chat history\n• Mobile-first UI with React Native & Tailwind CSS`, tech:['React Native','TailwindCSS','Express','MongoDB','Python','Firebase'] },
    { title:'NXI Enterprise Platform', tag:'Enterprise · Web', description:'Internal project management with role-based login, hierarchical data structures, and deeply nested tabbed organization.', image:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop', color:'#8b5cf6', fullDescription:`Enterprise-grade project management for hierarchical data.\n\nKey Features:\n• Role-based login — no public registration\n• Email credential delivery for onboarding\n• Deep parent-child project nesting\n• Three interconnected tabs: Nested Table, Association, Detailing\n• Real-time updates with advanced filtering\n\nTech: React.js, Express, MySQL, Prisma ORM, TailwindCSS`, tech:['React.js','Express','MySQL','Tailwind','Prisma ORM'] },
    { title:'Supershield Property', tag:'Real Estate · Web', description:'Large-scale property listing platform with 92 frontend pages, advanced search filters, and WordPress CMS backend.', image:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop', color:'#06b6d4', fullDescription:`Construction and property listing platform with 92 frontend pages.\n\nKey Features:\n• Real estate listing with dynamic filters and search\n• WordPress-powered backend CMS\n• Fully responsive, SEO-optimized across all 92 routes\n• Admin-editable project database via custom APIs\n• Smooth performance across all devices`, tech:['Next.js','WordPress','Tailwind'] },
    { title:'AI Answer Evaluator', tag:'EdTech · AI', description:'AI-powered tool for CA coaching institutes to evaluate student written answers using RAG-based automated scoring.', image:'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop', color:'#f59e0b', fullDescription:`AI-powered internal application for answer evaluation.\n\nKey Features:\n• Role-based auth: Admin, Tutor, Student\n• Admin-controlled user creation\n• Tutor dashboard for post-class question assignment\n• Student submission portal and status tracking\n• RAG-based AI evaluation vs reference solutions\n• Automated score + qualitative feedback\n• Secure evaluation history`, tech:['Next.js','Express.js','MongoDB','TailwindCSS','Python'] },
    { title:'Meeting Room Allocator', tag:'Internal Tool · Web', description:'Smart room booking with role-based access, real-time Firebase availability tracking, and conflict prevention.', image:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop', color:'#10b981', fullDescription:`Comprehensive meeting room allocation system.\n\nKey Features:\n• Firebase Auth — Admin, Manager, Employee roles\n• Real-time room availability (Firebase Realtime DB)\n• Three meeting rooms with booking management\n• Interactive calendar with conflict detection\n• Admin dashboard for rooms, users, bookings\n• Email notifications for confirmations`, tech:['React.js','TailwindCSS','Firebase'] },
  ];

  return (
    <div style={{ background:'#05050f', fontFamily:"'Outfit',sans-serif", minHeight:'100vh', overflowX:'hidden', color:'#fff' }}>
      <ParticleCanvas />

      {/* Custom cursor */}
      <div style={{ position:'fixed', left:mouse.x-6, top:mouse.y-6, width:12, height:12, borderRadius:'50%', background:'#fff', pointerEvents:'none', zIndex:9999, mixBlendMode:'difference', transition:'left .05s,top .05s' }}/>
      <div style={{ position:'fixed', left:mouse.x-22, top:mouse.y-22, width:44, height:44, borderRadius:'50%', border:'1.5px solid rgba(99,102,241,.7)', pointerEvents:'none', zIndex:9998, transition:'left .15s ease,top .15s ease', transform: cursorBig ? 'scale(2)':'scale(1)' }}/>

      {/* ══ GLOBAL STYLES ══ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800&display=swap');
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#05050f}::-webkit-scrollbar-thumb{background:linear-gradient(#6366f1,#8b5cf6);border-radius:2px}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes float{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-14px) rotate(3deg)}}
        @keyframes floatB{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes orb1{0%,100%{transform:translate(0,0)}25%{transform:translate(50px,-40px)}50%{transform:translate(20px,60px)}75%{transform:translate(-40px,10px)}}
        @keyframes orb2{0%,100%{transform:translate(0,0)}33%{transform:translate(-60px,40px)}66%{transform:translate(40px,-50px)}}
        @keyframes spin-s{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes spin-r{from{transform:rotate(360deg)}to{transform:rotate(0deg)}}
        @keyframes scrollL{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes pulseRing{0%{transform:scale(1);opacity:.6}100%{transform:scale(1.9);opacity:0}}
        @keyframes shimmer{0%{background-position:-300% center}100%{background-position:300% center}}
        @keyframes heroIn{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @keyframes dotPulse{0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,.7)}60%{box-shadow:0 0 0 6px rgba(99,102,241,0)}}
        @keyframes modalIn{from{opacity:0;transform:scale(.88) translateY(30px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes gradShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        @keyframes textGlow{0%,100%{text-shadow:0 0 20px rgba(99,102,241,.5)}50%{text-shadow:0 0 40px rgba(139,92,246,.8),0 0 80px rgba(99,102,241,.4)}}
        @keyframes borderFlow{0%{border-color:rgba(99,102,241,.3)}50%{border-color:rgba(139,92,246,.6)}100%{border-color:rgba(6,182,212,.3)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
        @keyframes scaleIn{from{opacity:0;transform:scale(.5)}to{opacity:1;transform:scale(1)}}

        .glitch-el::before,.glitch-el::after{content:attr(data-text);position:absolute;top:0;left:0;width:100%}
        .glitch-el::before{color:#06b6d4;animation:glitch1 4s infinite;clip-path:polygon(0 0,100% 0,100% 35%,0 35%)}
        .glitch-el::after{color:#f43f5e;animation:glitch2 4s infinite;clip-path:polygon(0 65%,100% 65%,100% 100%,0 100%)}
        @keyframes glitch1{0%,90%,100%{transform:translate(0)}92%{transform:translate(-4px,-2px)}96%{transform:translate(4px,2px)}}
        @keyframes glitch2{0%,90%,100%{transform:translate(0)}93%{transform:translate(4px,2px)}97%{transform:translate(-4px,-2px)}}

        .grad{background:linear-gradient(135deg,#a5b4fc,#818cf8,#c084fc,#67e8f9);background-size:200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gradShift 4s ease infinite}
        .shimmer-btn{background:linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4,#8b5cf6,#6366f1);background-size:300%;animation:shimmer 3s linear infinite}
        .glass{background:rgba(255,255,255,.025);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.07)}
        .avail-ring{position:relative;display:inline-block;width:9px;height:9px;border-radius:50%;background:#10b981}
        .avail-ring::after{content:'';position:absolute;inset:-4px;border-radius:50%;border:2px solid #10b981;animation:pulseRing 2s ease-out infinite}
        .scrollL{animation:scrollL 32s linear infinite}
        .scrollL:hover{animation-play-state:paused}

        .hero-w1{opacity:0;animation:heroIn .7s ease .1s forwards}
        .hero-w2{opacity:0;animation:heroIn .7s ease .25s forwards}
        .hero-w3{opacity:0;animation:heroIn .7s ease .4s forwards}
        .hero-w4{opacity:0;animation:heroIn .7s ease .55s forwards}
        .hero-w5{opacity:0;animation:heroIn .7s ease .7s forwards}
        .hero-w6{opacity:0;animation:heroIn .7s ease .85s forwards}

        .proj-bar{width:0;height:2px;background:linear-gradient(90deg,#6366f1,#8b5cf6);transition:width .4s ease;border-radius:2px}
        .proj-card:hover .proj-bar{width:100%}

        .tag-badge{font-size:10px;letter-spacing:.1em;text-transform:uppercase;padding:3px 11px;border-radius:100px;background:rgba(99,102,241,.12);border:1px solid rgba(99,102,241,.25);color:#a5b4fc}

        @media(max-width:900px){.desktop-nav{display:none!important}.mobile-btn{display:flex!important}}
        @media(max-width:768px){.two-col{grid-template-columns:1fr!important}.four-col{grid-template-columns:repeat(2,1fr)!important}.three-col{grid-template-columns:1fr!important}}
      `}</style>

      {/* ══ NAV ══ */}
      <nav style={{ position:'fixed',top:0,width:'100%',zIndex:50,transition:'all .4s',background:scrollY>60?'rgba(5,5,15,.92)':'transparent',backdropFilter:scrollY>60?'blur(24px)':'none',borderBottom:scrollY>60?'1px solid rgba(255,255,255,.05)':'none' }}>
        <div style={{ maxWidth:1280,margin:'0 auto',padding:'0 32px',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
          <button onClick={() => go('home')} style={{ background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:12,padding:'18px 0' }}>
            <div style={{ width:38,height:38,borderRadius:10,background:'linear-gradient(135deg,#6366f1,#8b5cf6)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:15,color:'#fff',boxShadow:'0 0 20px rgba(99,102,241,.5)',animation:'spin-s 8s linear infinite' }}>P</div>
            <span style={{ fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:13,color:'rgba(255,255,255,.65)',letterSpacing:'.12em' }}>PRIYADHARSHINI</span>
          </button>

          <div className="desktop-nav" style={{ display:'flex',alignItems:'center',gap:2 }}>
            {navItems.map(id => (
              <button key={id} onClick={() => go(id)} style={{ background:activeSection===id?'rgba(99,102,241,.12)':'transparent',border:'none',color:activeSection===id?'#a5b4fc':'rgba(255,255,255,.4)',padding:'8px 18px',borderRadius:100,fontSize:13,cursor:'pointer',fontWeight:500,letterSpacing:'.03em',transition:'all .25s',position:'relative' }}>
                {id.charAt(0).toUpperCase()+id.slice(1)}
                {activeSection===id&&<span style={{ position:'absolute',bottom:4,left:'50%',transform:'translateX(-50%)',width:4,height:4,borderRadius:'50%',background:'#6366f1',animation:'dotPulse 2s ease infinite',display:'block' }}/>}
              </button>
            ))}
            <Magnetic href={resume} target="_blank" rel="noopener noreferrer"
              style={{ marginLeft:14,padding:'10px 22px',borderRadius:100,fontSize:13,fontWeight:600,color:'#fff',display:'flex',alignItems:'center',gap:8,textDecoration:'none',border:'none',cursor:'pointer' }}
              className="shimmer-btn">
              <Download size={13}/> Resume
            </Magnetic>
          </div>

          <button className="mobile-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ display:'none',background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.08)',color:'#fff',borderRadius:10,padding:'8px 10px',cursor:'pointer',alignItems:'center',justifyContent:'center' }}>
            {menuOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
        <div style={{ overflow:'hidden',maxHeight:menuOpen?'280px':'0',transition:'max-height .3s ease',background:'rgba(5,5,15,.98)',borderBottom:menuOpen?'1px solid rgba(255,255,255,.06)':'none' }}>
          <div style={{ padding:'12px 24px 16px' }}>
            {navItems.map(id => (
              <button key={id} onClick={() => go(id)} style={{ display:'block',width:'100%',textAlign:'left',background:'none',border:'none',color:activeSection===id?'#a5b4fc':'rgba(255,255,255,.5)',padding:'10px 12px',borderRadius:10,fontSize:14,cursor:'pointer' }}>
                {id.charAt(0).toUpperCase()+id.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section id="home" style={{ minHeight:'100vh',display:'flex',alignItems:'center',position:'relative',overflow:'hidden' }}>
        {/* Animated background orbs */}
        <div style={{ position:'absolute',top:'-15%',left:'-8%',width:650,height:650,borderRadius:'50%',background:'radial-gradient(circle,rgba(99,102,241,.18) 0%,transparent 70%)',filter:'blur(50px)',animation:'orb1 14s ease-in-out infinite',pointerEvents:'none' }}/>
        <div style={{ position:'absolute',bottom:'-10%',right:'-5%',width:550,height:550,borderRadius:'50%',background:'radial-gradient(circle,rgba(139,92,246,.14) 0%,transparent 70%)',filter:'blur(50px)',animation:'orb2 18s ease-in-out infinite',pointerEvents:'none' }}/>
        <div style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:350,height:350,borderRadius:'50%',background:'radial-gradient(circle,rgba(6,182,212,.07) 0%,transparent 70%)',filter:'blur(30px)',animation:'floatB 8s ease-in-out infinite',pointerEvents:'none' }}/>

        {/* Grid */}
        <div style={{ position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(99,102,241,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,.04) 1px,transparent 1px)',backgroundSize:'60px 60px',pointerEvents:'none' }}/>

        <div style={{ maxWidth:1280,margin:'0 auto',padding:'100px 32px 60px',width:'100%',position:'relative',zIndex:1 }}>
          <div className="two-col" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'center' }}>

            {/* LEFT */}
            <div>
              <div className="hero-w1" style={{ display:'inline-flex',alignItems:'center',gap:10,padding:'8px 18px',borderRadius:100,background:'rgba(16,185,129,.08)',border:'1px solid rgba(16,185,129,.22)',marginBottom:28 }}>
                <span className="avail-ring"/>
                <span style={{ color:'#6ee7b7',fontSize:13,fontWeight:500 }}>Available for opportunities</span>
              </div>

              <div className="hero-w2" style={{ marginBottom:10 }}>
                <p style={{ color:'#6366f1',fontSize:9,fontWeight:600,letterSpacing:'.4em',textTransform:'uppercase',fontFamily:'Syne,sans-serif',marginBottom:14 }}>Full Stack Developer</p>
                <h1 style={{ fontFamily:'Syne,sans-serif',fontSize:'clamp(2.6rem,5.5vw,5rem)',fontWeight:800,lineHeight:1.04,margin:0,animation:'textGlow 4s ease-in-out infinite' }}>
                  <span className="grad">Hi, I'm</span><br/>
                  <span className="grad" text="Priyadharshini" style={{ fontFamily:'Syne,sans-serif',fontSize:'clamp(2.6rem,5.5vw,5rem)',fontWeight:600 }}>Priyadharshini</span>
                </h1>
              </div>

              <div className="hero-w3" style={{ margin:'22px 0 30px',fontSize:'clamp(1rem,1.8vw,1.2rem)',color:'rgba(255,255,255,.45)',minHeight:34 }}>
                I build{' '}
                <span style={{ color:'#a5b4fc',fontWeight:700 }}>
                  <Typewriter words={['scalable web apps','full-stack solutions','AI-powered products','pixel-perfect UIs','fast REST APIs','enterprise platforms']}/>
                </span>
              </div>

              <p className="hero-w4" style={{ color:'rgba(255,255,255,.42)',fontSize:15,lineHeight:1.85,maxWidth:490,marginBottom:38 }}>
                Full-stack developer at <span style={{ color:'#a5b4fc',fontWeight:600 }}>Senthurontech</span>, turning complex challenges into{' '}
                <span style={{ color:'#c084fc' }}>production-ready solutions</span> with modern tech.
              </p>

              {/* Stats */}
              <div className="hero-w5" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:38 }}>
                {[{num:1.5,suf:'+',label:'Years Exp.',color:'#6366f1'},{num:20,suf:'+',label:'Projects',color:'#8b5cf6'},{num:15,suf:'+',label:'Technologies',color:'#06b6d4'}].map((s,i) => (
                  <TiltCard key={i} className="glass" style={{ borderRadius:16,padding:'16px 14px',textAlign:'center' }}>
                    <div style={{ fontFamily:'Syne,sans-serif',fontSize:30,fontWeight:800,color:s.color }}><Counter target={s.num} suffix={s.suf}/></div>
                    <div style={{ fontSize:11,color:'rgba(255,255,255,.32)',marginTop:3 }}>{s.label}</div>
                  </TiltCard>
                ))}
              </div>

              {/* CTAs */}
              <div className="hero-w6" style={{ display:'flex',gap:14,flexWrap:'wrap',marginBottom:30 }}>
                <Magnetic onClick={() => go('projects')} style={{ padding:'14px 34px',borderRadius:100,fontSize:14,fontWeight:700,color:'#fff',cursor:'pointer',display:'flex',alignItems:'center',gap:9,border:'none' }} className="shimmer-btn">
                  View My Work <ArrowRight size={15}/>
                </Magnetic>
                <Magnetic onClick={() => go('contact')} style={{ padding:'14px 34px',borderRadius:100,fontSize:14,fontWeight:600,color:'#a5b4fc',cursor:'pointer',display:'flex',alignItems:'center',gap:9,background:'transparent',border:'1px solid rgba(99,102,241,.4)',transition:'all .3s' }}
                  onMouseEnter={e=>{e.currentTarget.style.background='rgba(99,102,241,.1)'}}
                  onMouseLeave={e=>{e.currentTarget.style.background='transparent'}}>
                  Get In Touch
                </Magnetic>
              </div>

              {/* Socials */}
              <div className="hero-w6" style={{ display:'flex',gap:10 }}>
                {[{href:'https://github.com/Priyariya1',icon:<Github size={18}/>},{href:'https://www.linkedin.com/in/priyadharshini-s-a148aa274/',icon:<Linkedin size={18}/>},{href:'mailto:priyasaravanan282@gmail.com',icon:<Mail size={18}/>}].map((s,i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{ width:44,height:44,borderRadius:13,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',color:'rgba(255,255,255,.4)',transition:'all .3s',textDecoration:'none' }}
                    onMouseEnter={e=>{e.currentTarget.style.background='rgba(99,102,241,.15)';e.currentTarget.style.borderColor='rgba(99,102,241,.5)';e.currentTarget.style.color='#a5b4fc';e.currentTarget.style.transform='translateY(-5px) rotate(6deg)'}}
                    onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,.04)';e.currentTarget.style.borderColor='rgba(255,255,255,.08)';e.currentTarget.style.color='rgba(255,255,255,.4)';e.currentTarget.style.transform=''}}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT – Avatar with spinning rings */}
            <div style={{ display:'flex',justifyContent:'center',alignItems:'center',position:'relative' }}>
              <div style={{ position:'absolute',width:390,height:390,borderRadius:'50%',border:'1px dashed rgba(99,102,241,.22)',animation:'spin-s 25s linear infinite' }}/>
              <div style={{ position:'absolute',width:330,height:330,borderRadius:'50%',border:'1px solid rgba(139,92,246,.18)',animation:'spin-r 18s linear infinite' }}/>
              <div style={{ position:'absolute',width:275,height:275,borderRadius:'50%',border:'1px dashed rgba(6,182,212,.12)',animation:'spin-s 35s linear infinite' }}/>
              <div style={{ position:'absolute',width:260,height:260,borderRadius:'50%',background:'radial-gradient(circle,rgba(99,102,241,.28) 0%,transparent 70%)',filter:'blur(28px)' }}/>

              <div style={{ width:240,height:240,borderRadius:'50%',padding:3,background:'linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4)',position:'relative',zIndex:1,animation:'floatB 5s ease-in-out infinite' }}>
                <div style={{ width:'100%',height:'100%',borderRadius:'50%',overflow:'hidden',background:'#0a0a18' }}>
                  <img src={Hero} alt="Priyadharshini" style={{ width:'100%',height:'100%',objectFit:'cover',filter:'brightness(1.05)',transition:'transform .5s ease' }}
                    onMouseEnter={e=>e.currentTarget.style.transform='scale(1.1)'}
                    onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}/>
                </div>
              </div>

              {/* Floating chips */}
              {[
                { icon:<Code size={13}/>, label:'React · Next.js', style:{top:10,left:-30}, color:'#6366f1', cls:'float' },
                { icon:<Database size={13}/>, label:'MySQL · Mongo', style:{bottom:10,right:-30}, color:'#8b5cf6', cls:'floatB' },
                { icon:<Server size={13}/>, label:'Node · Express', style:{bottom:-15,left:10}, color:'#06b6d4', cls:'float' },
                { icon:<Globe size={13}/>, label:'Tailwind · CSS', style:{top:-15,right:10}, color:'#10b981', cls:'floatB' },
              ].map((c,i) => (
                <div key={i} style={{ position:'absolute',...c.style,display:'flex',alignItems:'center',gap:7,padding:'7px 13px',borderRadius:11,fontSize:11,fontWeight:500,background:'rgba(5,5,15,.92)',border:`1px solid ${c.color}45`,color:'#fff',backdropFilter:'blur(14px)',boxShadow:`0 4px 20px ${c.color}25`,whiteSpace:'nowrap',zIndex:2,animation:`${c.cls === 'float' ? 'float' : 'floatB'} ${4+i*.5}s ease-in-out infinite`,animationDelay:`${i*.4}s` }}>
                  <span style={{color:c.color}}>{c.icon}</span>{c.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button onClick={() => go('about')} style={{ position:'absolute',bottom:32,left:'50%',transform:'translateX(-50%)',background:'none',border:'none',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:6,color:'rgba(255,255,255,.2)' }}>
          <span style={{ fontSize:10,letterSpacing:'.25em',textTransform:'uppercase' }}>Scroll</span>
          <ChevronDown size={18} style={{ animation:'floatB 2s ease-in-out infinite' }}/>
        </button>
      </section>

      {/* ══ ABOUT ══ */}
      <section id="about" style={{ padding:'120px 0',position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',top:0,right:0,width:450,height:450,borderRadius:'50%',background:'radial-gradient(circle,rgba(139,92,246,.1) 0%,transparent 70%)',filter:'blur(50px)',pointerEvents:'none' }}/>

        <div style={{ maxWidth:1280,margin:'0 auto',padding:'0 32px' }}>
          <Reveal>
            <p style={{ color:'#6366f1',fontSize:11,fontWeight:700,letterSpacing:'.4em',textTransform:'uppercase',fontFamily:'Syne,sans-serif',marginBottom:12 }}>01 — About</p>
            <h2 style={{ fontFamily:'Syne,sans-serif',fontSize:'clamp(2rem,4vw,3.5rem)',fontWeight:800,color:'#fff',marginBottom:60 }}>Who I <span className="grad">Am</span></h2>
          </Reveal>

          <div className="two-col" style={{ display:'grid',gridTemplateColumns:'3fr 2fr',gap:48,alignItems:'start' }}>
            <div>
              <Reveal delay={.1}>
                <p style={{ fontSize:17,lineHeight:1.9,color:'rgba(255,255,255,.6)',marginBottom:20 }}>
                  I'm a full-stack developer at <span style={{ color:'#fff',fontWeight:600 }}>Senthurontech</span> who loves owning features end-to-end — from clean, accessible UIs to performant APIs and databases.
                </p>
                <p style={{ fontSize:15,lineHeight:1.8,color:'rgba(255,255,255,.38)',marginBottom:36 }}>
                  Whether integrating AI pipelines, building multi-role auth systems, or crafting pixel-perfect interfaces, I bring curiosity and craftsmanship to every project.
                </p>
              </Reveal>

              <Reveal delay={.2}>
                <TiltCard className="glass" style={{ borderRadius:20,padding:28,marginBottom:16,borderColor:'rgba(99,102,241,.15)',animation:'borderFlow 4s ease infinite' }}>
                  <div style={{ display:'flex',gap:16,alignItems:'flex-start' }}>
                    <div style={{ width:48,height:48,borderRadius:14,background:'linear-gradient(135deg,#6366f1,#8b5cf6)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}><Briefcase size={20} color="#fff"/></div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8,marginBottom:4 }}>
                        <h4 style={{ color:'#fff',fontWeight:700,fontSize:16,margin:0,fontFamily:'Syne,sans-serif' }}>Full Stack Developer</h4>
                        <span className="tag-badge">Dec 2024 – Present</span>
                      </div>
                      <p style={{ color:'rgba(255,255,255,.4)',fontSize:13,marginBottom:16 }}>Senthurontech</p>
                      {['Built full-stack apps with React.js, Node.js, Express, MySQL','Designed secure REST APIs with auth & role-based access','Integrated AI/RAG pipelines for intelligent evaluation systems','Optimized backend APIs — response time reduced ~30%','Collaborated using Git for version control & code reviews'].map((item,i) => (
                        <div key={i} style={{ display:'flex',gap:10,alignItems:'flex-start',marginBottom:9,animation:`slideIn .5s ease ${i*.1+.3}s both` }}>
                          <span style={{ width:6,height:6,borderRadius:'50%',background:'#6366f1',marginTop:6,flexShrink:0 }}/>
                          <span style={{ fontSize:13,color:'rgba(255,255,255,.55)',lineHeight:1.6 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>

              <Reveal delay={.3}>
                <TiltCard className="glass" style={{ borderRadius:20,padding:24 }}>
                  <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:16 }}>
                    <div style={{ width:42,height:42,borderRadius:12,background:'linear-gradient(135deg,#f59e0b,#d97706)',display:'flex',alignItems:'center',justifyContent:'center' }}><Star size={18} color="#fff"/></div>
                    <h4 style={{ color:'#fff',fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:15,margin:0 }}>Currently Exploring</h4>
                  </div>
                  <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:10 }}>
                    {['NestJS Framework','Advanced Next.js','AWS Cloud Services','Cloud Architecture'].map((item,i) => (
                      <div key={i} style={{ display:'flex',alignItems:'center',gap:8,fontSize:13,color:'rgba(255,255,255,.6)',animation:`scaleIn .4s ease ${i*.1+.2}s both` }}>
                        <span style={{ width:6,height:6,borderRadius:'50%',background:'#f59e0b',animation:'pulseRing 2s ease-out infinite',animationDelay:`${i*.3}s` }}/>
                        {item}
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </Reveal>
            </div>

            {/* Stats column */}
            <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
              {[{num:1.5,suf:'+',label:'Years Experience',sub:'Full Stack Dev',color:'#6366f1'},{num:20,suf:'+',label:'Projects Shipped',sub:'End-to-end delivery',color:'#8b5cf6'},{num:100,suf:'%',label:'Satisfaction Rate',sub:'Client happiness',color:'#06b6d4'}].map((s,i) => (
                <Reveal key={i} delay={i*.15} dir="right">
                  <TiltCard className="glass" style={{ borderRadius:16,padding:'22px 24px' }}>
                    <div style={{ fontFamily:'Syne,sans-serif',fontSize:40,fontWeight:800,color:s.color,lineHeight:1 }}><Counter target={s.num} suffix={s.suf}/></div>
                    <div style={{ color:'#fff',fontWeight:600,fontSize:14,marginTop:6 }}>{s.label}</div>
                    <div style={{ color:'rgba(255,255,255,.32)',fontSize:12,marginTop:2 }}>{s.sub}</div>
                  </TiltCard>
                </Reveal>
              ))}
              <Reveal delay={.5} dir="right">
                <TiltCard className="glass" style={{ borderRadius:16,padding:'22px 24px' }}>
                  <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:12 }}>
                    <span className="avail-ring"/>
                    <span style={{ color:'#6ee7b7',fontWeight:600,fontSize:14 }}>Open to Work</span>
                  </div>
                  <p style={{ color:'rgba(255,255,255,.38)',fontSize:12,lineHeight:1.7,margin:0 }}>Available for full-time roles, freelance, or interesting collaborations.</p>
                </TiltCard>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section id="skills" style={{ padding:'120px 0',position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',bottom:0,left:0,width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(99,102,241,.08) 0%,transparent 70%)',filter:'blur(50px)',pointerEvents:'none' }}/>

        <div style={{ maxWidth:1280,margin:'0 auto',padding:'0 32px' }}>
          <Reveal>
            <p style={{ color:'#6366f1',fontSize:11,fontWeight:700,letterSpacing:'.4em',textTransform:'uppercase',fontFamily:'Syne,sans-serif',marginBottom:12 }}>02 — Skills</p>
            <h2 style={{ fontFamily:'Syne,sans-serif',fontSize:'clamp(2rem,4vw,3.5rem)',fontWeight:800,color:'#fff',marginBottom:16 }}>My <span className="grad">Tech Stack</span></h2>
            <p style={{ color:'rgba(255,255,255,.38)',fontSize:15,marginBottom:60 }}>Technologies I use to craft exceptional digital experiences</p>
          </Reveal>

          {/* Infinite scroll carousel */}
          <div style={{ position:'relative',overflow:'hidden',marginBottom:60 }}>
            <div style={{ position:'absolute',left:0,top:0,bottom:0,width:120,background:'linear-gradient(to right,#05050f,transparent)',zIndex:10,pointerEvents:'none' }}/>
            <div style={{ position:'absolute',right:0,top:0,bottom:0,width:120,background:'linear-gradient(to left,#05050f,transparent)',zIndex:10,pointerEvents:'none' }}/>
            <div className="scrollL" style={{ display:'flex',gap:14,width:'max-content' }}>
              {[...techSkills,...techSkills].map((skill,i) => (
                <div key={i} className="glass" style={{ flexShrink:0,minWidth:165,borderRadius:16,padding:'18px 20px',display:'flex',alignItems:'center',gap:12,transition:'all .3s ease',cursor:'default' }}
                  onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-8px) scale(1.05)';e.currentTarget.style.borderColor='rgba(99,102,241,.45)';e.currentTarget.style.boxShadow='0 14px 35px rgba(99,102,241,.2)'}}
                  onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.borderColor='';e.currentTarget.style.boxShadow=''}}>
                  <span style={{ fontSize:22 }}>{skill.icon}</span>
                  <div>
                    <div style={{ fontSize:13,fontWeight:600,color:'#fff' }}>{skill.name}</div>
                    <div style={{ fontSize:11,color:'rgba(255,255,255,.28)' }}>{skill.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category grid */}
          <div className="four-col" style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:18 }}>
            {[
              { label:'Frontend', icon:<Globe size={16}/>, color:'#6366f1', skills:['React.js','Next.js','HTML/CSS','Tailwind CSS'] },
              { label:'Backend', icon:<Server size={16}/>, color:'#8b5cf6', skills:['Node.js','Express.js','NestJS','Python'] },
              { label:'Database', icon:<Database size={16}/>, color:'#06b6d4', skills:['MySQL','MongoDB','Prisma ORM','Firebase'] },
              { label:'Tools & Lang', icon:<Code size={16}/>, color:'#10b981', skills:['JavaScript','TypeScript','Git','REST APIs'] },
            ].map((cat,i) => (
              <Reveal key={i} delay={i*.1}>
                <TiltCard className="glass" style={{ borderRadius:20,padding:'24px',height:'100%' }}>
                  <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:20 }}>
                    <div style={{ width:38,height:38,borderRadius:12,background:`${cat.color}1a`,border:`1px solid ${cat.color}30`,display:'flex',alignItems:'center',justifyContent:'center',color:cat.color }}>{cat.icon}</div>
                    <h4 style={{ color:'#fff',fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:14,margin:0 }}>{cat.label}</h4>
                  </div>
                  {cat.skills.map((s,j) => (
                    <div key={j} style={{ display:'flex',alignItems:'center',gap:10,marginBottom:12,animation:`slideIn .4s ease ${j*.07+.1}s both` }}>
                      <span style={{ width:6,height:6,borderRadius:'50%',background:cat.color,flexShrink:0 }}/>
                      <span style={{ fontSize:13,color:'rgba(255,255,255,.58)' }}>{s}</span>
                    </div>
                  ))}
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section id="projects" style={{ padding:'120px 0',position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',top:'40%',right:'-5%',width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(139,92,246,.09) 0%,transparent 70%)',filter:'blur(50px)',pointerEvents:'none' }}/>

        <div style={{ maxWidth:1280,margin:'0 auto',padding:'0 32px' }}>
          <Reveal>
            <p style={{ color:'#6366f1',fontSize:11,fontWeight:700,letterSpacing:'.4em',textTransform:'uppercase',fontFamily:'Syne,sans-serif',marginBottom:12 }}>03 — Projects</p>
            <h2 style={{ fontFamily:'Syne,sans-serif',fontSize:'clamp(2rem,4vw,3.5rem)',fontWeight:800,color:'#fff',marginBottom:60 }}>Featured <span className="grad">Work</span></h2>
          </Reveal>

          <div className="three-col" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:22 }}>
            {projects.map((p,i) => (
              <Reveal key={i} delay={i*.08}>
                <TiltCard className="glass proj-card" style={{ borderRadius:20,overflow:'hidden',cursor:'pointer' }} onClick={() => setSelectedProject(p)}>
                  <div style={{ position:'relative',height:200,overflow:'hidden' }}>
                    <img src={p.image} alt={p.title} style={{ width:'100%',height:'100%',objectFit:'cover',transition:'transform .8s ease' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='scale(1.14)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}/>
                    <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(5,5,15,.95) 0%,rgba(5,5,15,.25) 60%,transparent 100%)' }}/>
                    <div style={{ position:'absolute',top:14,left:14 }}><span className="tag-badge">{p.tag}</span></div>
                    <div style={{ position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',opacity:0,transition:'opacity .3s' }}
                      onMouseEnter={e=>e.currentTarget.style.opacity=1}
                      onMouseLeave={e=>e.currentTarget.style.opacity=0}>
                      <div style={{ display:'flex',alignItems:'center',gap:8,padding:'10px 20px',borderRadius:100,fontSize:13,fontWeight:600,color:'#fff',background:'rgba(99,102,241,.88)',backdropFilter:'blur(8px)' }}>
                        <ExternalLink size={14}/> View Details
                      </div>
                    </div>
                  </div>
                  <div style={{ padding:'22px' }}>
                    <div className="proj-bar" style={{ marginBottom:14 }}/>
                    <h3 style={{ fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:18,color:'#fff',margin:'0 0 10px' }}>{p.title}</h3>
                    <p style={{ fontSize:13,color:'rgba(255,255,255,.42)',lineHeight:1.75,marginBottom:16,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden' }}>{p.description}</p>
                    <div style={{ display:'flex',flexWrap:'wrap',gap:6 }}>
                      {p.tech.slice(0,4).map((t,j) => (
                        <span key={j} style={{ fontSize:11,padding:'4px 10px',borderRadius:100,background:'rgba(99,102,241,.1)',border:'1px solid rgba(99,102,241,.2)',color:'#a5b4fc' }}>{t}</span>
                      ))}
                      {p.tech.length > 4 && <span style={{ fontSize:11,padding:'4px 10px',borderRadius:100,background:'rgba(255,255,255,.05)',color:'rgba(255,255,255,.28)' }}>+{p.tech.length-4}</span>}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROJECT MODAL ══ */}
      {selectedProject && (
        <div style={{ position:'fixed',inset:0,zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:24,background:'rgba(0,0,0,.88)',backdropFilter:'blur(22px)' }}
          onClick={() => setSelectedProject(null)}>
          <div style={{ position:'relative',maxWidth:640,width:'100%',maxHeight:'90vh',overflowY:'auto',borderRadius:24,background:'rgba(10,10,24,.98)',border:'1px solid rgba(99,102,241,.22)',animation:'modalIn .35s cubic-bezier(0.23,1,0.32,1) forwards' }}
            onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedProject(null)}
              style={{ position:'absolute',top:14,right:14,zIndex:10,width:36,height:36,borderRadius:10,background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.08)',color:'rgba(255,255,255,.5)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .2s' }}
              onMouseEnter={e=>{e.currentTarget.style.background='rgba(244,63,94,.2)';e.currentTarget.style.color='#f87171'}}
              onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,.06)';e.currentTarget.style.color='rgba(255,255,255,.5)'}}>
              <X size={16}/>
            </button>
            <div style={{ position:'relative',height:220,overflow:'hidden',borderRadius:'24px 24px 0 0' }}>
              <img src={selectedProject.image} alt={selectedProject.title} style={{ width:'100%',height:'100%',objectFit:'cover',filter:'brightness(.65)' }}/>
              <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(10,10,24,1) 0%,transparent 60%)' }}/>
              <div style={{ position:'absolute',bottom:20,left:24 }}>
                <span className="tag-badge" style={{ display:'inline-block',marginBottom:8 }}>{selectedProject.tag}</span>
                <h2 style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:24,color:'#fff',margin:0 }}>{selectedProject.title}</h2>
              </div>
            </div>
            <div style={{ padding:28 }}>
              <pre style={{ fontSize:13,lineHeight:1.95,color:'rgba(255,255,255,.58)',whiteSpace:'pre-wrap',fontFamily:'Outfit,sans-serif',margin:'0 0 24px' }}>{selectedProject.fullDescription}</pre>
              <p style={{ fontSize:11,color:'rgba(255,255,255,.28)',letterSpacing:'.2em',textTransform:'uppercase',marginBottom:12 }}>Tech Stack</p>
              <div style={{ display:'flex',flexWrap:'wrap',gap:8 }}>
                {selectedProject.tech.map((t,i) => (
                  <span key={i} style={{ padding:'6px 16px',borderRadius:100,fontSize:12,fontWeight:500,background:'rgba(99,102,241,.1)',border:'1px solid rgba(99,102,241,.25)',color:'#a5b4fc',animation:`scaleIn .3s ease ${i*.06}s both` }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ CONTACT ══ */}
      <section id="contact" style={{ padding:'120px 0',position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',bottom:'-15%',left:'50%',transform:'translateX(-50%)',width:800,height:450,borderRadius:'50%',background:'radial-gradient(circle,rgba(99,102,241,.13) 0%,transparent 70%)',filter:'blur(60px)',pointerEvents:'none' }}/>

        <div style={{ maxWidth:900,margin:'0 auto',padding:'0 32px',position:'relative',zIndex:1 }}>
          <Reveal>
            <div style={{ textAlign:'center',marginBottom:60 }}>
              <p style={{ color:'#6366f1',fontSize:11,fontWeight:700,letterSpacing:'.4em',textTransform:'uppercase',fontFamily:'Syne,sans-serif',marginBottom:12 }}>04 — Contact</p>
              <h2 style={{ fontFamily:'Syne,sans-serif',fontSize:'clamp(2rem,5vw,4rem)',fontWeight:800,color:'#fff',marginBottom:16 }}>
                Let's Build Something <span className="grad">Together</span>
              </h2>
              <p style={{ color:'rgba(255,255,255,.4)',fontSize:16,maxWidth:480,margin:'0 auto' }}>Open to full-time roles, freelance, and collaborations. I'd love to hear from you!</p>
            </div>
          </Reveal>

          <Reveal delay={.1}>
            <TiltCard className="glass" style={{ borderRadius:24,padding:'48px',marginBottom:22,background:'rgba(99,102,241,.03)',borderColor:'rgba(99,102,241,.14)' }}>
              <div className="two-col" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:48,alignItems:'center' }}>
                <div>
                  <h3 style={{ fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:24,color:'#fff',marginBottom:12 }}>Ready to collaborate?</h3>
                  <p style={{ color:'rgba(255,255,255,.42)',fontSize:14,lineHeight:1.85,marginBottom:28 }}>Drop me a line and let's make something great together. I typically respond within 24 hours.</p>
                  <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:12 }}>
                    {[{n:'24h',l:'Response Time',c:'#6366f1'},{n:'Open',l:'To Opportunities',c:'#10b981'}].map((s,i) => (
                      <div key={i} style={{ borderRadius:14,padding:'16px',background:`${s.c}09`,border:`1px solid ${s.c}20` }}>
                        <div style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:22,color:s.c }}>{s.n}</div>
                        <div style={{ fontSize:12,color:'rgba(255,255,255,.36)' }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
                  {[{href:'mailto:priyasaravanan282@gmail.com',icon:<Mail size={20}/>,label:'Email',value:'priyasaravanan282@gmail.com',color:'#6366f1'},{href:'https://www.linkedin.com/in/priyadharshini-s-a148aa274/',icon:<Linkedin size={20}/>,label:'LinkedIn',value:'Connect professionally',color:'#0a66c2'},{href:'https://github.com/Priyariya1',icon:<Github size={20}/>,label:'GitHub',value:'View repositories',color:'#8b5cf6'}].map((c,i) => (
                    <a key={i} href={c.href} target="_blank" rel="noopener noreferrer"
                      style={{ display:'flex',alignItems:'center',gap:14,padding:'16px',borderRadius:16,textDecoration:'none',background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.07)',transition:'all .3s ease',animation:`slideIn .5s ease ${i*.12+.2}s both` }}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor=`${c.color}55`;e.currentTarget.style.background=`${c.color}0b`;e.currentTarget.style.transform='translateX(6px)'}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.07)';e.currentTarget.style.background='rgba(255,255,255,.03)';e.currentTarget.style.transform=''}}>
                      <div style={{ width:44,height:44,borderRadius:13,background:`${c.color}20`,display:'flex',alignItems:'center',justifyContent:'center',color:c.color,flexShrink:0 }}>{c.icon}</div>
                      <div style={{ flex:1,minWidth:0 }}>
                        <div style={{ color:'#fff',fontWeight:600,fontSize:14 }}>{c.label}</div>
                        <div style={{ color:'rgba(255,255,255,.32)',fontSize:12,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{c.value}</div>
                      </div>
                      <ArrowRight size={15} style={{ color:'rgba(255,255,255,.18)',flexShrink:0 }}/>
                    </a>
                  ))}
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delay={.2}>
            <div style={{ display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap' }}>
              <Magnetic href="mailto:priyasaravanan282@gmail.com" target="_blank" rel="noopener noreferrer"
                style={{ padding:'16px 36px',borderRadius:100,fontSize:15,fontWeight:700,color:'#fff',display:'flex',alignItems:'center',gap:10,textDecoration:'none',border:'none',cursor:'pointer' }}
                className="shimmer-btn">
                <Mail size={18}/> Send Email
              </Magnetic>
              <Magnetic href={resume} target="_blank" rel="noopener noreferrer"
                style={{ padding:'16px 36px',borderRadius:100,fontSize:15,fontWeight:600,color:'#a5b4fc',display:'flex',alignItems:'center',gap:10,background:'transparent',border:'1px solid rgba(99,102,241,.4)',textDecoration:'none',cursor:'pointer',transition:'all .3s' }}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(99,102,241,.1)'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <Download size={18}/> Download Resume
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ padding:'28px 32px',borderTop:'1px solid rgba(255,255,255,.05)',display:'flex',alignItems:'center',justifyContent:'space-between',maxWidth:1280,margin:'0 auto',flexWrap:'wrap',gap:12 }}>
        <div style={{ display:'flex',alignItems:'center',gap:12 }}>
          <div style={{ width:32,height:32,borderRadius:8,background:'linear-gradient(135deg,#6366f1,#8b5cf6)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:13,color:'#fff' }}>P</div>
          <span style={{ fontSize:13,color:'rgba(255,255,255,.28)' }}>Priyadharshini · Full Stack Developer</span>
        </div>
        <span style={{ fontSize:12,color:'rgba(255,255,255,.18)' }}>© 2025 · React & Tailwind CSS</span>
      </footer>
    </div>
  );
}
