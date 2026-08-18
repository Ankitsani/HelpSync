import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Ticket, ArrowRight, Shield, Clock, Zap, CheckCircle2, User, ChevronRight, X, Play, Code } from "lucide-react";
import useThemeStore from "../store/themeStore";

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useThemeStore((state) => state.theme);
  
  // Interactive Ticket Mock States
  const [tickets, setTickets] = useState([
    {
      id: "ticket-1",
      title: "Cannot reset user password via API",
      description: "Getting a 400 Bad Request error when trying to request a password reset link for custom client domains.",
      status: "Open",
      priority: "High",
      createdAt: "10m ago",
      assignee: "Aman S.",
    },
    {
      id: "ticket-2",
      title: "Vercel preview build failing after update",
      description: "Webpack / Vite compile error on production build task. Root folder path configurations appear misaligned.",
      status: "In Progress",
      priority: "Critical",
      createdAt: "1h ago",
      assignee: "Priya K.",
    },
    {
      id: "ticket-3",
      title: "Dark mode toggling flickers on reload",
      description: "Local storage theme initial state sync causes flash of unstyled content during DOM load.",
      status: "Resolved",
      priority: "Low",
      createdAt: "1d ago",
      assignee: "Rahul M.",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTicketTitle, setNewTicketTitle] = useState("");
  const [newTicketDesc, setNewTicketDesc] = useState("");
  const [newTicketPriority, setNewTicketPriority] = useState("High");
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [demoStep, setDemoStep] = useState("");

  // Konami Code / Easter Egg States
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [particles, setParticles] = useState([]);
  const requestRef = useRef();

  const konamiCode = [
    "ArrowUp", "ArrowUp",
    "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight",
    "ArrowLeft", "ArrowRight",
    "b", "a"
  ];

  // Konami code event listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      const expectedKey = konamiCode[konamiProgress];

      if (key.toLowerCase() === expectedKey.toLowerCase()) {
        const nextProgress = konamiProgress + 1;
        setKonamiProgress(nextProgress);

        if (nextProgress === konamiCode.length) {
          triggerEasterEgg();
          setKonamiProgress(0);
        }
      } else {
        setKonamiProgress(key.toLowerCase() === konamiCode[0].toLowerCase() ? 1 : 0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiProgress]);

  // Particle simulation loop for easter egg
  useEffect(() => {
    if (particles.length === 0) return;

    const updateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles
          .map((p) => {
            const nextY = p.y + p.vy;
            const nextX = p.x + p.vx;
            const nextVy = p.vy + 0.15; // Gravity
            return {
              ...p,
              x: nextX,
              y: nextY,
              vy: nextVy,
              life: p.life - 1,
            };
          })
          .filter((p) => p.life > 0)
      );
      requestRef.current = requestAnimationFrame(updateParticles);
    };

    requestRef.current = requestAnimationFrame(updateParticles);
    return () => cancelAnimationFrame(requestRef.current);
  }, [particles]);

  const triggerEasterEgg = () => {
    setEasterEggActive(true);
    const emojis = ["🎉", "🎟️", "⚡", "🚀", "🔥", "🤝", "✅", "💻"];
    const newParticles = [];
    
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 8;
      newParticles.push({
        id: `p-${Date.now()}-${i}-${Math.random()}`,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 - 100,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 5,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        size: 16 + Math.random() * 24,
        life: 100 + Math.random() * 50,
      });
    }
    setParticles(newParticles);
    
    setTimeout(() => {
      setEasterEggActive(false);
    }, 6000);
  };

  // Add Ticket Handler (Interactive Demo)
  const handleAddTicketSubmit = (e) => {
    e.preventDefault();
    if (!newTicketTitle.trim()) return;

    const createdTicket = {
      id: `ticket-${Date.now()}`,
      title: newTicketTitle,
      description: newTicketDesc || "No description provided.",
      status: "Open",
      priority: newTicketPriority,
      createdAt: "Just now",
      assignee: "Unassigned",
    };

    setTickets((prev) => [createdTicket, ...prev]);
    setNewTicketTitle("");
    setNewTicketDesc("");
    setIsModalOpen(false);

    runInteractiveDemoSimulation(createdTicket.id);
  };

  const runInteractiveDemoSimulation = (ticketId) => {
    setIsDemoRunning(true);
    setDemoStep("assigning");

    setTimeout(() => {
      setTickets((prev) =>
        prev.map((t) =>
          t.id === ticketId
            ? { ...t, status: "In Progress", assignee: "Antigravity AI" }
            : t
        )
      );
      setDemoStep("resolving");
    }, 2500);

    setTimeout(() => {
      setTickets((prev) =>
        prev.map((t) =>
          t.id === ticketId ? { ...t, status: "Resolved" } : t
        )
      );
      setIsDemoRunning(false);
      setDemoStep("");
    }, 5500);
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "Critical":
        return "bg-red-500/10 text-red-500 border border-red-500/20";
      case "High":
        return "bg-orange-500/10 text-orange-500 border border-orange-500/20";
      default:
        return "bg-green-500/10 text-green-500 border border-green-500/20";
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Open":
        return "bg-sky-500 text-white shadow-sm ring-1 ring-sky-500/30";
      case "In Progress":
        return "bg-amber-500 text-white shadow-sm ring-1 ring-amber-500/30";
      case "Resolved":
        return "bg-emerald-500 text-white shadow-sm ring-1 ring-emerald-500/30";
      default:
        return "bg-gray-500 text-white shadow-sm";
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden font-poppins transition-colors duration-500 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      
      {/* Konami Confetti Overlay */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed pointer-events-none z-50 transition-transform select-none"
          style={{
            transform: `translate3d(${p.x}px, ${p.y}px, 0)`,
            fontSize: `${p.size}px`,
          }}
        >
          {p.emoji}
        </div>
      ))}

      {/* Easter Egg Activation Banner */}
      {easterEggActive && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-[1px] rounded-2xl shadow-[0_0_30px_rgba(245,124,0,0.3)] animate-bounce">
          <div className="bg-slate-900 rounded-[15px] p-4 text-center">
            <div className="text-2xl mb-1">🎮 ⚡ 🚀</div>
            <h4 className="text-lg font-bold text-white mb-1">Konami Mode Active!</h4>
            <p className="text-xs text-orange-200">
              Antigravity boost engaged. Tickets resolved at hyper-speed!
            </p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 sm:px-8 lg:px-12 flex flex-col items-center justify-center text-center">
        
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-radial-gradient from-orange-500/20 dark:from-orange-500/10 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-1/3 w-60 h-60 rounded-full bg-radial-gradient from-yellow-500/15 dark:from-yellow-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

        {/* Content */}
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          
          {/* Subtle Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-orange-500/10 text-orange-600 dark:text-orange-300 border border-orange-500/20 shadow-sm animate-pulse">
            <Ticket className="w-3.5 h-3.5" />
            <span>Honest, Fast Support Desk</span>
          </div>

          {/* Value Prop Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-slate-100">
            Real-time support ticket
            <br />
            management,{" "}
            <span className="text-transparent bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500 bg-clip-text font-black drop-shadow-sm">
              simplified
            </span>
          </h1>

          {/* Subheadline (1 sentence explaining benefit/audience) */}
          <p className="text-base sm:text-lg md:text-xl font-normal text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The faster way for growing teams to organize customer requests, track live statuses, and resolve issues without the bloat of traditional help desks.
          </p>

          {/* Single Primary CTA */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate("/auth")}
              className="group relative w-full sm:w-auto bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(245,124,0,0.25)] hover:shadow-[0_8px_30px_rgba(245,124,0,0.4)] hover:scale-[1.03] cursor-pointer flex items-center justify-center space-x-2 text-base md:text-lg"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Product-in-Action Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            See HelpSync in Action
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
            Try creating a support ticket in this live interactive mockup below.
          </p>
        </div>

        {/* Mock Browser Frame */}
        <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800/80 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] hover:scale-[1.005] group">
          
          {/* Browser Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/80">
            {/* Window controls */}
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
            </div>
            
            {/* Fake Address Bar */}
            <div className="w-[60%] max-w-sm px-3 py-1 text-xs text-center rounded bg-slate-200/80 dark:bg-slate-900/80 text-slate-550 dark:text-slate-400 truncate">
              https://app.helpsync.io/dashboard
            </div>
            
            {/* Live Indicator */}
            <div className="flex items-center space-x-1.5 bg-orange-500/15 border border-orange-500/20 text-orange-500 dark:text-orange-400 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>Interactive Demo</span>
            </div>
          </div>

          {/* Browser Dashboard Content Area */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Support Queue</h3>
                <p className="text-xs text-slate-500">Real-time resolution dashboard</p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                disabled={isDemoRunning}
                className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold text-sm px-4 py-2.5 rounded-lg transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center space-x-1"
              >
                <span>+ Create New Ticket</span>
              </button>
            </div>

            {/* Simulation Status Overlay Banner */}
            {isDemoRunning && (
              <div className="mb-4 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center space-x-3 text-xs text-orange-500 dark:text-orange-400 animate-pulse">
                <Clock className="w-4 h-4 animate-spin text-orange-500" />
                <span>
                  {demoStep === "assigning" 
                    ? "🤖 Incoming ticket detected! Routing to agent..." 
                    : "⚡ Agent working. Resolving ticket live..."}
                </span>
              </div>
            )}

            {/* Ticket Cards List */}
            <div className="space-y-3">
              {tickets.map((t) => (
                <div
                  key={t.id}
                  className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 transition-all duration-300 hover:translate-x-1 hover:border-orange-500/40 hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${getPriorityStyles(t.priority)}`}>
                        {t.priority}
                      </span>
                      <span className="text-xs text-slate-500">• Ticket ID: {t.id.slice(0, 8)}</span>
                      <span className="text-xs text-slate-500">• {t.createdAt}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">{t.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-400 line-clamp-2 leading-relaxed">{t.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between md:justify-end gap-4 border-t border-slate-200 dark:border-slate-850 md:border-t-0 pt-3 md:pt-0">
                    <div className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-400">
                      <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-750 dark:text-slate-200 shadow-sm ring-1 ring-white/10">
                        {t.assignee.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span>{t.assignee}</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-500 ${getStatusStyles(t.status)}`}>
                      {t.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value Pillars Section */}
      <section className="py-12 md:py-20 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-md">
            <div className="w-12 h-12 bg-orange-500/10 text-orange-500 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Real-Time Sync</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Never refresh to check status. Ticket transitions, team replies, and resolution changes propagate instantly using WebSockets.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-md">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Zero Bloat Dashboard</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              We ditched complex setup scripts. Just register, log in, create a workspace, and start receiving support issues in 60 seconds.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-md">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Honest Team Workspaces</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Designed specifically for small teams who are tired of managing user support in messy email chains or slack channels.
            </p>
          </div>
        </div>
      </section>

      {/* Mini Create Ticket Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md p-6 shadow-2xl transform scale-100 transition-all">
            <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                <Ticket className="w-4 h-4 text-orange-500" />
                <span>Simulate New Ticket</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTicketSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Ticket Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Broken checkout button on mobile"
                  value={newTicketTitle}
                  onChange={(e) => setNewTicketTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 text-slate-900 dark:text-slate-100 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all placeholder-slate-400 dark:placeholder-slate-550"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  rows="3"
                  placeholder="Describe the issue in detail..."
                  value={newTicketDesc}
                  onChange={(e) => setNewTicketDesc(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 text-slate-900 dark:text-slate-100 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all placeholder-slate-400 dark:placeholder-slate-550 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  Severity Priority
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Low", "High", "Critical"].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setNewTicketPriority(p)}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        newTicketPriority === p
                          ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/20"
                          : "bg-slate-100 dark:bg-slate-850 border-slate-200 dark:border-slate-750 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-all shadow-md cursor-pointer hover:shadow-orange-500/20 hover:scale-[1.01]"
                >
                  Create & Launch Simulation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
