import React, { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, FileDown, ArrowDown, ExternalLink, Sprout, Radio } from "lucide-react";
import profilePhoto from "./assets/profile.jpg";

// ---------------------------------------------------------------------------
// Design tokens (see design plan)
// bg-void:   #05010F   panel: #120627   panel-2: #10142B
// text-hi:   #F2E9FF   text-mid: #B9A6D9  text-dim: #7C6B9C
// accent (nebula):  #00F0FF     accent-warm (star): #FF2E97
// ---------------------------------------------------------------------------

const PROJECTS = [
  {
    id: "ecofarm",
    icon: Sprout,
    name: "EcoFarm Quest",
    tagline: "Gamified sustainable-farming platform",
    description:
      "A Flask-based web app that turns sustainable farming practices into a scored, quest-driven experience. Built the full auth layer with JWT, modeled crop/quest data in MongoDB, and designed the REST API that drives the frontend.",
    stack: ["Python", "Flask", "MongoDB", "JWT", "REST API"],
    accent: "#00F0FF",
    repo: "https://github.com/Gourav232003/ECOFARM",
    live: "https://golden-seahorse-c542c6.netlify.app",
  },
  {
    id: "resqnet",
    icon: Radio,
    name: "ResQNet",
    tagline: "Disaster-management coordination platform",
    description:
      "A platform for coordinating disaster response, with an AI chatbot layer for triage and information routing. Focused on backend reliability — clean API contracts, structured data flow, and fast responses under load.",
    stack: ["Python", "Flask", "AI Chatbot", "REST API"],
    accent: "#FF2E97",
    repo: "https://github.com/Gourav232003/ResQnet",
    live: "https://stellar-choux-ac0ce6.netlify.app",
  },
];

const SKILLS = [
  {
    group: "Languages",
    items: ["Python", "JavaScript", "C++"],
  },
  {
    group: "Backend",
    items: ["Flask", "Django", "REST API Design", "JWT Auth", "Node.js"],
  },
  {
    group: "Data",
    items: ["MongoDB", "Web Scraping", "API Integration"],
  },
  {
    group: "Foundations",
    items: ["Data Structures", "Algorithms", "Complexity Analysis"],
  },
];


// ---------------------------------------------------------------------------
// Scroll-reveal wrapper
// ---------------------------------------------------------------------------
function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(24px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const sections = ["about", "projects", "skills", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div
      className="scanlines"
      style={{
        background: "#05010F",
        color: "#F2E9FF",
        fontFamily: "'Rajdhani', sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700;800&family=Rajdhani:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Orbitron', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        ::selection { background: #00F0FF; color: #05010F; }
        a:focus-visible, button:focus-visible {
          outline: 2px solid #FF2E97;
          outline-offset: 3px;
        }
        .neon-text {
          text-shadow: 0 0 8px rgba(0,240,255,0.55), 0 0 22px rgba(0,240,255,0.25);
        }
        .neon-btn-cyan {
          box-shadow: 0 0 14px rgba(0,240,255,0.45), 0 0 2px rgba(0,240,255,0.6) inset;
        }
        .scanlines::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 60;
          background: repeating-linear-gradient(
            to bottom,
            rgba(0,240,255,0.025) 0px,
            rgba(0,240,255,0.025) 1px,
            transparent 1px,
            transparent 3px
          );
          mix-blend-mode: overlay;
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backdropFilter: "blur(10px)",
          background: "rgba(5,1,15,0.6)",
          borderBottom: "1px solid rgba(0,240,255,0.12)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "18px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span className="font-display" style={{ fontSize: 18, fontWeight: 700, letterSpacing: 0.5 }}>
            GOURAV<span style={{ color: "#FF2E97" }}>.</span>
          </span>
          <div style={{ display: "flex", gap: 28 }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-mono"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  letterSpacing: 0.5,
                  color: activeSection === item.id ? "#FF2E97" : "#B9A6D9",
                  transition: "color 0.25s ease",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          minHeight: 640,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 900px 600px at 25% 30%, rgba(0,240,255,0.10) 0%, transparent 60%), radial-gradient(ellipse 800px 700px at 80% 70%, rgba(255,46,151,0.08) 0%, transparent 60%), #05010F",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 10, maxWidth: 1100, margin: "0 auto", padding: "0 24px", width: "100%" }}>
          <p className="font-mono" style={{ color: "#00F0FF", fontSize: 13, letterSpacing: 3, marginBottom: 18, textTransform: "uppercase" }}>
            Backend Developer · Python / Flask
          </p>
          <h1 className="font-display neon-text" style={{ fontSize: "clamp(40px, 7vw, 84px)", fontWeight: 700, lineHeight: 1.05, marginBottom: 22, maxWidth: 820, color: "#F2E9FF" }}>
            GOURAV
          </h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#B9A6D9", maxWidth: 560, lineHeight: 1.6, marginBottom: 36 }}>
            I build reliable backend systems — clean APIs, sound data models,
            and the quiet infrastructure that makes an app trustworthy.
            Currently studying CS at DSEU, New Delhi.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button
              onClick={() => scrollTo("projects")}
              className="font-mono neon-btn-cyan"
              style={{
                background: "#00F0FF",
                color: "#05010F",
                border: "none",
                padding: "13px 26px",
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: 0.3,
              }}
            >
              View Projects
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="font-mono"
              style={{
                background: "transparent",
                color: "#F2E9FF",
                border: "1px solid rgba(242,233,255,0.25)",
                padding: "13px 26px",
                borderRadius: 6,
                fontSize: 14,
                cursor: "pointer",
                letterSpacing: 0.3,
              }}
            >
              Get in Touch
            </button>
          </div>
        </div>
        <button
          onClick={() => scrollTo("about")}
          aria-label="Scroll down"
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#7C6B9C",
            zIndex: 10,
            animation: "bounce 2.2s ease-in-out infinite",
          }}
        >
          <ArrowDown size={20} />
        </button>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "120px 24px 100px", position: "relative" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p className="font-mono" style={{ color: "#00F0FF", fontSize: 13, letterSpacing: 3, marginBottom: 14, textTransform: "uppercase" }}>
              01 — About
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.3fr 1fr", gap: 44, alignItems: "start" }}>
              <div
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid rgba(0,240,255,0.25)",
                  boxShadow: "0 0 24px rgba(0,240,255,0.15), 0 0 60px rgba(255,46,151,0.08)",
                  minWidth: 220,
                }}
              >
                <img
                  src={profilePhoto}
                  alt="Gourav"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    filter: "saturate(0.95) contrast(1.03)",
                  }}
                />
              </div>
              <div style={{ minWidth: 280 }}>
                <h2 className="font-display" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 600, marginBottom: 20, lineHeight: 1.25 }}>
                  I like systems that don't fall over.
                </h2>
                <p style={{ color: "#B9A6D9", fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
                  I'm a Computer Science undergrad who spends more time thinking
                  about API contracts and data models than UI polish — though I
                  care about that too. My work so far has been about taking an
                  idea (a farming game, a disaster-response tool) and giving it
                  a backend that's actually dependable: auth done right, data
                  structured sensibly, endpoints that don't surprise you.
                </p>
                <p style={{ color: "#B9A6D9", fontSize: 16, lineHeight: 1.8 }}>
                  Right now I'm deepening my grasp of data structures and
                  algorithms and looking for a Python/backend internship where
                  I can work on real systems at scale.
                </p>
              </div>
              <div
                style={{
                  background: "#120627",
                  border: "1px solid rgba(0,240,255,0.14)",
                  borderRadius: 12,
                  padding: 28,
                }}
              >
                <p className="font-mono" style={{ fontSize: 12, color: "#7C6B9C", letterSpacing: 1.5, marginBottom: 18, textTransform: "uppercase" }}>
                  Education
                </p>
                <p className="font-display" style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>
                  B.Tech, Computer Science
                </p>
                <p style={{ color: "#B9A6D9", fontSize: 14, marginBottom: 14 }}>
                  Delhi Skill and Entrepreneurship University
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#7C6B9C", borderTop: "1px solid rgba(0,240,255,0.12)", paddingTop: 14 }}>
                  <span className="font-mono">CGPA</span>
                  <span className="font-mono" style={{ color: "#FF2E97" }}>8.2 / 10.0</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#7C6B9C", marginTop: 8 }}>
                  <span className="font-mono">Graduating</span>
                  <span className="font-mono" style={{ color: "#F2E9FF" }}>July 2027</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "60px 24px 100px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p className="font-mono" style={{ color: "#00F0FF", fontSize: 13, letterSpacing: 3, marginBottom: 14, textTransform: "uppercase" }}>
              02 — Projects
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 600, marginBottom: 48 }}>
              Things I've built
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
            {PROJECTS.map((p) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.id}>
                  <div
                    style={{
                      background: "#120627",
                      border: "1px solid rgba(0,240,255,0.14)",
                      borderRadius: 14,
                      padding: 32,
                      height: "100%",
                      transition: "border-color 0.3s ease, transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = p.accent;
                      e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0,240,255,0.14)";
                      e.currentTarget.style.transform = "translateY(0px)";
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        background: `${p.accent}1A`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 20,
                      }}
                    >
                      <Icon size={22} color={p.accent} />
                    </div>
                    <h3 className="font-display" style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>
                      {p.name}
                    </h3>
                    <p className="font-mono" style={{ fontSize: 12.5, color: p.accent, marginBottom: 16, letterSpacing: 0.3 }}>
                      {p.tagline}
                    </p>
                    <p style={{ color: "#B9A6D9", fontSize: 14.5, lineHeight: 1.75, marginBottom: 22 }}>
                      {p.description}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="font-mono"
                          style={{
                            fontSize: 11.5,
                            padding: "5px 10px",
                            borderRadius: 5,
                            background: "rgba(242,233,255,0.05)",
                            color: "#B9A6D9",
                            border: "1px solid rgba(242,233,255,0.08)",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 13,
                          color: p.accent,
                          textDecoration: "none",
                          fontWeight: 500,
                        }}
                      >
                        Live demo <ExternalLink size={13} />
                      </a>
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 13,
                          color: "#F2E9FF",
                          textDecoration: "none",
                        }}
                      >
                        View code <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "60px 24px 100px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p className="font-mono" style={{ color: "#00F0FF", fontSize: 13, letterSpacing: 3, marginBottom: 14, textTransform: "uppercase" }}>
              03 — Skills
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 600, marginBottom: 48 }}>
              What I work with
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {SKILLS.map((s) => (
              <Reveal key={s.group}>
                <div
                  style={{
                    borderLeft: "2px solid rgba(0,240,255,0.3)",
                    paddingLeft: 20,
                    height: "100%",
                  }}
                >
                  <p className="font-mono" style={{ fontSize: 12, color: "#7C6B9C", letterSpacing: 1.5, marginBottom: 14, textTransform: "uppercase" }}>
                    {s.group}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {s.items.map((item) => (
                      <li key={item} style={{ color: "#F2E9FF", fontSize: 15, marginBottom: 10, lineHeight: 1.4 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "60px 24px 140px", position: "relative" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <p className="font-mono" style={{ color: "#00F0FF", fontSize: 13, letterSpacing: 3, marginBottom: 14, textTransform: "uppercase" }}>
              04 — Contact
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 600, marginBottom: 18, lineHeight: 1.25 }}>
              Let's talk backend, internships,<br />or interesting problems.
            </h2>
            <p style={{ color: "#B9A6D9", fontSize: 16, marginBottom: 40 }}>
              Open to Python / Backend internship roles.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 36 }}>
              <a
                href="mailto:23gouravpandey@gmail.com"
                className="font-mono neon-btn-cyan"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#00F0FF",
                  color: "#05010F",
                  padding: "13px 24px",
                  borderRadius: 6,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                <Mail size={16} /> Email me
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="font-mono"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  border: "1px solid rgba(242,233,255,0.25)",
                  color: "#F2E9FF",
                  padding: "13px 24px",
                  borderRadius: 6,
                  textDecoration: "none",
                  fontSize: 14,
                }}
                title="Replace with your resume file link"
              >
                <FileDown size={16} /> Resume
              </a>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 22 }}>
              <a href="https://github.com/Gourav232003" target="_blank" rel="noopener noreferrer" style={{ color: "#7C6B9C" }}>
                <Github size={20} />
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} title="Replace with your LinkedIn" style={{ color: "#7C6B9C" }}>
                <Linkedin size={20} />
              </a>
            </div>
          </Reveal>
        </div>
        <p className="font-mono" style={{ textAlign: "center", color: "#4A2E6B", fontSize: 12, marginTop: 100 }}>
          built with react &amp; three.js
        </p>
      </section>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @media (max-width: 720px) {
          #about > div > div > div:first-child + div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
