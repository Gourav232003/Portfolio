import React, { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, FileDown, ArrowDown, ExternalLink, Sprout, Radio, Award, Sun, Moon } from "lucide-react";
import profilePhoto from "./assets/profile.jpg";

// ---------------------------------------------------------------------------
// Design tokens — light/dark theme via CSS custom properties (see <style> block)
// ---------------------------------------------------------------------------

const EXPERIENCE = [
  {
    id: "inamigos",
    role: "AI Data Analytics Intern",
    org: "InAmigos Foundation",
    status: "Certified",
    date: "Jul 10–23, 2026",
    description:
      "Researched and compiled a structured database of Indian NGOs — collecting, cleaning, and categorizing organizational data using Excel, Google Sheets, and Python/Pandas. Published a LinkedIn post summarizing the findings and methodology.",
    certUrl: "/certificates/inamigos-certificate.pdf",
  },
  {
    id: "unessa",
    role: "Python Development Intern",
    org: "Unessa Foundation · via Internshala",
    status: "Certified",
    date: "Jan 28, 2026",
    description:
      "Selected for a Python Development internship, working on backend tasks and real-world Python problem solving.",
    certUrl: "/certificates/unessa-certificate.pdf",
  },
];

const PROJECTS = [
  {
    id: "ecofarm",
    icon: Sprout,
    name: "EcoFarm Quest",
    tagline: "Gamified sustainable-farming platform",
    description:
      "A Flask-based web app that turns sustainable farming practices into a scored, quest-driven experience. Built the full auth layer with JWT, modeled crop/quest data in MongoDB, and designed the REST API that drives the frontend.",
    stack: ["Python", "Flask", "MongoDB", "JWT", "REST API"],
    accent: "#16A34A",
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
    accent: "var(--accent)",
    repo: "https://github.com/Gourav232003/ResQnet",
    live: "https://stellar-choux-ac0ce6.netlify.app",
  },
];

const SKILLS = [
  {
    group: "Core",
    items: ["Python", "Flask", "REST API Design", "MongoDB", "JWT", "PyMongo"],
  },
  {
    group: "Data & Tooling",
    items: ["Pandas", "NumPy", "Git", "GitHub", "Postman", "Jupyter Notebook"],
  },
  {
    group: "NLP",
    items: ["NLTK", "spaCy", "Embeddings", "Hugging Face Transformers", "TF-IDF"],
  },
  {
    group: "ML Foundations",
    items: ["Logistic Regression", "Naive Bayes", "SVMs", "GDA", "GLMs"],
  },
  {
    group: "Also Familiar With",
    items: ["JavaScript", "HTML/CSS", "C++", "Scikit-learn", "SQL"],
  },
];

const ACHIEVEMENTS = [
  {
    title: "AI Data Analytics Internship",
    org: "InAmigos Foundation",
    date: "Jul 2026",
    certUrl: "/certificates/inamigos-certificate.pdf",
  },
  {
    title: "Python Development Internship",
    org: "Unessa Foundation · via Internshala",
    date: "Jan 2026",
    certUrl: "/certificates/unessa-certificate.pdf",
  },
  {
    title: "Cloud Security",
    org: "Forage Virtual Experience",
    date: "2025",
    certUrl: "https://drive.google.com/file/d/1kobkI8shA9xeqgWnzuAtHKw34LM0S2fb/view?usp=drive_link",
  },
  {
    title: "Software Engineering",
    org: "Forage Virtual Experience",
    date: "2025",
    certUrl: "https://drive.google.com/file/d/1GZ6LqhbyGFwF7HHFUruySbqRj4WD0UOQ/view?usp=drive_link",
  },
  {
    title: "Data Labelling & AI Quality",
    org: "Forage Virtual Experience",
    date: "2025",
    certUrl: "https://drive.google.com/file/d/1RZ7qq6Te-KWTPrCi3Jq4ZWDk7fYfGkAX/view?usp=drive_link",
  },
  {
    title: "GenAI Powered Data Analytics",
    org: "Forage Virtual Experience",
    date: "2025",
    certUrl: "https://drive.google.com/file/d/1z2PuB0m6cbIjBmSF9fKuAE979zTGSXKe/view?usp=drive_link",
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
        transform: visible ? "translateY(0px)" : "translateY(16px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const sections = ["about", "experience", "projects", "skills", "achievements", "contact"];
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

  const openCertificate = (url) => {
    if (url.startsWith("data:")) {
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          const blobUrl = URL.createObjectURL(blob);
          window.open(blobUrl, "_blank", "noopener,noreferrer");
        });
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "achievements", label: "Achievements" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div
      className={`theme-${theme}`}
      style={{
        background: "var(--bg)",
        color: "var(--text-hi)",
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        .theme-light {
          --bg: #FFFFFF;
          --bg-alt: #F8F9FB;
          --border: #E5E7EB;
          --text-hi: #111827;
          --text-mid: #4B5563;
          --text-dim: #9CA3AF;
          --accent: #2563EB;
          --accent-soft: #EFF6FF;
          --success: #059669;
          --success-soft: #ECFDF5;
          --tag-bg: #F3F4F6;
          --nav-text: #6B7280;
          --btn-border: #D1D5DB;
          --link-secondary: #374151;
          --selection-bg: #DBEAFE;
          --card-bg: #FFFFFF;
          --nav-bg: rgba(255,255,255,0.85);
        }
        .theme-dark {
          --bg: #0B0F19;
          --bg-alt: #10151F;
          --border: #262E3D;
          --text-hi: #F3F4F6;
          --text-mid: #B4BCCC;
          --text-dim: #7C8698;
          --accent: #5B9BF7;
          --accent-soft: rgba(91,155,247,0.14);
          --success: #34D399;
          --success-soft: rgba(52,211,153,0.14);
          --tag-bg: #1A2130;
          --nav-text: #9AA4B8;
          --btn-border: #333E52;
          --link-secondary: #C3CAD9;
          --selection-bg: rgba(91,155,247,0.3);
          --card-bg: #131A28;
          --nav-bg: rgba(11,15,25,0.85);
        }
        body, .theme-light, .theme-dark {
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .font-display { font-family: 'Poppins', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        ::selection { background: var(--selection-bg); color: var(--text-hi); }
        a:focus-visible, button:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }
        .card {
          transition: box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease, background-color 0.3s ease;
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
          background: "var(--nav-bg)",
          borderBottom: "1px solid var(--border)",
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
          <span className="font-display" style={{ fontSize: 18, fontWeight: 700, letterSpacing: 0.2, color: "var(--text-hi)" }}>
            Gourav<span style={{ color: "var(--accent)" }}>.</span>
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
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
                  letterSpacing: 0.3,
                  color: activeSection === item.id ? "var(--accent)" : "var(--nav-text)",
                  fontWeight: activeSection === item.id ? 600 : 400,
                  transition: "color 0.25s ease",
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label="Toggle dark mode"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: "1px solid var(--border)",
                background: "var(--bg-alt)",
                color: "var(--text-hi)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: "linear-gradient(180deg, var(--bg-alt) 0%, var(--bg) 55%)",
        }}
      >
        <div style={{ position: "relative", zIndex: 10, maxWidth: 1100, margin: "0 auto", padding: "120px 24px 80px", width: "100%" }}>
          <div
            className="hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.3fr 0.85fr",
              gap: 56,
              alignItems: "center",
            }}
          >
            <div>
              <p className="font-mono" style={{ color: "var(--accent)", fontSize: 13, letterSpacing: 2, marginBottom: 18, textTransform: "uppercase", fontWeight: 500 }}>
                Backend Developer · Python / Flask
              </p>
              <h1 className="font-display" style={{ fontSize: "clamp(38px, 6vw, 68px)", fontWeight: 700, lineHeight: 1.12, marginBottom: 22, maxWidth: 820, color: "var(--text-hi)" }}>
                Gourav Pandey
              </h1>
              <p style={{ fontSize: "clamp(16px, 2vw, 19px)", color: "var(--text-mid)", maxWidth: 560, lineHeight: 1.7, marginBottom: 36 }}>
                I build reliable backend systems — clean APIs, sound data models,
                and the quiet infrastructure that makes an app trustworthy.
                Currently studying CS at DSEU, New Delhi.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <button
                  onClick={() => scrollTo("projects")}
                  className="font-mono"
                  style={{
                    background: "var(--accent)",
                    color: "#FFFFFF",
                    border: "none",
                    padding: "13px 26px",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    letterSpacing: 0.2,
                    boxShadow: "0 1px 2px rgba(37,99,235,0.25)",
                  }}
                >
                  View Projects
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="font-mono"
                  style={{
                    background: "var(--card-bg)",
                    color: "var(--text-hi)",
                    border: "1px solid var(--btn-border)",
                    padding: "13px 26px",
                    borderRadius: 8,
                    fontSize: 14,
                    cursor: "pointer",
                    letterSpacing: 0.2,
                  }}
                >
                  Get in Touch
                </button>
              </div>
            </div>
            <div
              className="hero-photo"
              style={{
                borderRadius: 20,
                overflow: "hidden",
                border: "1px solid var(--border)",
                boxShadow: "0 8px 24px rgba(17,24,39,0.08)",
                aspectRatio: "1 / 1.05",
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
                }}
              />
            </div>
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
            color: "var(--text-dim)",
            zIndex: 10,
            animation: "bounce 2.2s ease-in-out infinite",
          }}
        >
          <ArrowDown size={20} />
        </button>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 24px 90px", position: "relative" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p className="font-mono" style={{ color: "var(--accent)", fontSize: 13, letterSpacing: 2, marginBottom: 14, textTransform: "uppercase", fontWeight: 500 }}>
              01 — About
            </p>
            <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 44, alignItems: "start" }}>
              <div style={{ minWidth: 280 }}>
                <h2 className="font-display" style={{ fontSize: "clamp(26px, 3.2vw, 36px)", fontWeight: 600, marginBottom: 20, lineHeight: 1.3, color: "var(--text-hi)" }}>
                  I like systems that don't fall over.
                </h2>
                <p style={{ color: "var(--text-mid)", fontSize: 16, lineHeight: 1.85, marginBottom: 16 }}>
                  I'm a Computer Science undergrad who spends more time thinking
                  about API contracts and data models than UI polish — though I
                  care about that too. My work so far has been about taking an
                  idea (a farming game, a disaster-response tool) and giving it
                  a backend that's actually dependable: auth done right, data
                  structured sensibly, endpoints that don't surprise you.
                </p>
                <p style={{ color: "var(--text-mid)", fontSize: 16, lineHeight: 1.85 }}>
                  Right now I'm deepening my grasp of data structures and
                  algorithms and looking for a Python/backend internship where
                  I can work on real systems at scale.
                </p>
              </div>
              <div
                className="card"
                style={{
                  background: "var(--bg-alt)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: 28,
                }}
              >
                <p className="font-mono" style={{ fontSize: 12, color: "var(--text-dim)", letterSpacing: 1.2, marginBottom: 18, textTransform: "uppercase" }}>
                  Education
                </p>
                <p className="font-display" style={{ fontSize: 17, fontWeight: 600, marginBottom: 6, color: "var(--text-hi)" }}>
                  B.Tech, Computer Science
                </p>
                <p style={{ color: "var(--text-mid)", fontSize: 14, marginBottom: 14 }}>
                  Delhi Skill and Entrepreneurship University
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-dim)", borderTop: "1px solid var(--border)", paddingTop: 14 }}>
                  <span className="font-mono">CGPA</span>
                  <span className="font-mono" style={{ color: "var(--accent)", fontWeight: 600 }}>8.2 / 10.0</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-dim)", marginTop: 8 }}>
                  <span className="font-mono">Graduating</span>
                  <span className="font-mono" style={{ color: "var(--text-hi)" }}>July 2027</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "50px 24px 90px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p className="font-mono" style={{ color: "var(--accent)", fontSize: 13, letterSpacing: 2, marginBottom: 14, textTransform: "uppercase", fontWeight: 500 }}>
              02 — Experience
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(26px, 3.2vw, 36px)", fontWeight: 600, marginBottom: 40, color: "var(--text-hi)" }}>
              Where I've worked
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {EXPERIENCE.map((exp) => (
                <div
                  key={exp.id}
                  className="card"
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--border)",
                    borderRadius: 14,
                    padding: 32,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: 20,
                    boxShadow: "0 1px 2px rgba(17,24,39,0.03)",
                  }}
                >
                  <div style={{ minWidth: 260 }}>
                    <h3 className="font-display" style={{ fontSize: 19, fontWeight: 600, marginBottom: 6, color: "var(--text-hi)" }}>
                      {exp.role}
                    </h3>
                    <p style={{ color: "var(--accent)", fontSize: 14.5, marginBottom: 14, fontWeight: 500 }}>
                      {exp.org}
                    </p>
                    <p style={{ color: "var(--text-mid)", fontSize: 14.5, lineHeight: 1.8, maxWidth: 560, marginBottom: exp.certUrl ? 14 : 0 }}>
                      {exp.description}
                    </p>
                    {exp.certUrl && (
                      <a
                        href={exp.certUrl}
                        onClick={(e) => {
                          e.preventDefault();
                          openCertificate(exp.certUrl);
                        }}
                        className="font-mono"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 12.5,
                          color: "var(--accent)",
                          textDecoration: "none",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        View Certificate <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                  <div style={{ textAlign: "right", minWidth: 140 }}>
                    <p
                      className="font-mono"
                      style={{
                        fontSize: 12,
                        color: exp.status === "Current" ? "var(--success)" : "var(--text-dim)",
                        background: exp.status === "Current" ? "var(--success-soft)" : "transparent",
                        letterSpacing: 0.5,
                        textTransform: "uppercase",
                        marginBottom: 8,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        justifyContent: "flex-end",
                        padding: exp.status === "Current" ? "4px 10px" : "0",
                        borderRadius: 20,
                        fontWeight: 600,
                      }}
                    >
                      {exp.status === "Current" && (
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "var(--success)",
                            display: "inline-block",
                          }}
                        />
                      )}
                      {exp.status}
                    </p>
                    <p className="font-mono" style={{ fontSize: 14, color: "var(--text-hi)", marginTop: 6 }}>
                      {exp.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "50px 24px 90px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p className="font-mono" style={{ color: "var(--accent)", fontSize: 13, letterSpacing: 2, marginBottom: 14, textTransform: "uppercase", fontWeight: 500 }}>
              03 — Projects
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(26px, 3.2vw, 36px)", fontWeight: 600, marginBottom: 44, color: "var(--text-hi)" }}>
              Things I've built
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
            {PROJECTS.map((p) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.id}>
                  <div
                    className="card"
                    style={{
                      background: "var(--card-bg)",
                      border: "1px solid var(--border)",
                      borderRadius: 14,
                      padding: 32,
                      height: "100%",
                      boxShadow: "0 1px 2px rgba(17,24,39,0.03)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = p.accent;
                      e.currentTarget.style.boxShadow = "0 8px 20px rgba(17,24,39,0.08)";
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.boxShadow = "0 1px 2px rgba(17,24,39,0.03)";
                      e.currentTarget.style.transform = "translateY(0px)";
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        background: `${p.accent}14`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 20,
                      }}
                    >
                      <Icon size={22} color={p.accent} />
                    </div>
                    <h3 className="font-display" style={{ fontSize: 21, fontWeight: 600, marginBottom: 6, color: "var(--text-hi)" }}>
                      {p.name}
                    </h3>
                    <p className="font-mono" style={{ fontSize: 12.5, color: p.accent, marginBottom: 16, letterSpacing: 0.2, fontWeight: 500 }}>
                      {p.tagline}
                    </p>
                    <p style={{ color: "var(--text-mid)", fontSize: 14.5, lineHeight: 1.8, marginBottom: 22 }}>
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
                            borderRadius: 6,
                            background: "var(--tag-bg)",
                            color: "var(--text-mid)",
                            border: "1px solid var(--border)",
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
                          fontWeight: 600,
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
                          color: "var(--link-secondary)",
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
      <section id="skills" style={{ padding: "50px 24px 90px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p className="font-mono" style={{ color: "var(--accent)", fontSize: 13, letterSpacing: 2, marginBottom: 14, textTransform: "uppercase", fontWeight: 500 }}>
              04 — Skills
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(26px, 3.2vw, 36px)", fontWeight: 600, marginBottom: 44, color: "var(--text-hi)" }}>
              What I work with
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {SKILLS.map((s) => (
              <Reveal key={s.group}>
                <div
                  style={{
                    borderLeft: "2px solid var(--accent)",
                    paddingLeft: 20,
                    height: "100%",
                  }}
                >
                  <p className="font-mono" style={{ fontSize: 12, color: "var(--text-dim)", letterSpacing: 1.2, marginBottom: 14, textTransform: "uppercase" }}>
                    {s.group}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {s.items.map((item) => (
                      <li key={item} style={{ color: "var(--link-secondary)", fontSize: 15, marginBottom: 10, lineHeight: 1.4 }}>
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

      {/* ACHIEVEMENTS */}
      <section id="achievements" style={{ padding: "50px 24px 90px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p className="font-mono" style={{ color: "var(--accent)", fontSize: 13, letterSpacing: 2, marginBottom: 14, textTransform: "uppercase", fontWeight: 500 }}>
              05 — Achievements
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(26px, 3.2vw, 36px)", fontWeight: 600, marginBottom: 44, color: "var(--text-hi)" }}>
              Certifications & programs
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {ACHIEVEMENTS.map((a) => (
              <Reveal key={a.title}>
                <div
                  className="card"
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--border)",
                    borderRadius: 14,
                    padding: 26,
                    height: "100%",
                    boxShadow: "0 1px 2px rgba(17,24,39,0.03)",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "var(--accent-soft)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 18,
                    }}
                  >
                    <Award size={20} color="var(--accent)" />
                  </div>
                  <p className="font-display" style={{ fontSize: 16, fontWeight: 600, marginBottom: 6, color: "var(--text-hi)", lineHeight: 1.4 }}>
                    {a.title}
                  </p>
                  <p style={{ color: "var(--text-mid)", fontSize: 13.5, marginBottom: 12 }}>
                    {a.org}
                  </p>
                  <p className="font-mono" style={{ color: "var(--text-dim)", fontSize: 12, marginBottom: a.certUrl ? 14 : 0 }}>
                    {a.date}
                  </p>
                  {a.certUrl && (
                    <a
                      href={a.certUrl}
                      onClick={(e) => {
                        e.preventDefault();
                        openCertificate(a.certUrl);
                      }}
                      className="font-mono"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12.5,
                        color: "var(--accent)",
                        textDecoration: "none",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      View Certificate <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "50px 24px 120px", position: "relative" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <p className="font-mono" style={{ color: "var(--accent)", fontSize: 13, letterSpacing: 2, marginBottom: 14, textTransform: "uppercase", fontWeight: 500 }}>
              06 — Contact
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(26px, 3.6vw, 38px)", fontWeight: 600, marginBottom: 18, lineHeight: 1.3, color: "var(--text-hi)" }}>
              Let's talk backend, internships,<br />or interesting problems.
            </h2>
            <p style={{ color: "var(--text-mid)", fontSize: 16, marginBottom: 40 }}>
              Open to Python / Backend internship roles.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 36 }}>
              <a
                href="mailto:23gouravpandey@gmail.com"
                className="font-mono"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--accent)",
                  color: "#FFFFFF",
                  padding: "13px 24px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  boxShadow: "0 1px 2px rgba(37,99,235,0.25)",
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
                  border: "1px solid var(--btn-border)",
                  color: "var(--text-hi)",
                  padding: "13px 24px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontSize: 14,
                }}
                title="Replace with your resume file link"
              >
                <FileDown size={16} /> Resume
              </a>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 22 }}>
              <a href="https://github.com/Gourav232003" target="_blank" rel="noopener noreferrer" style={{ color: "var(--nav-text)" }}>
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/gourav-pandey-a65ba1290" target="_blank" rel="noopener noreferrer" style={{ color: "var(--nav-text)" }}>
                <Linkedin size={20} />
              </a>
            </div>
          </Reveal>
        </div>
        <p className="font-mono" style={{ textAlign: "center", color: "var(--btn-border)", fontSize: 12, marginTop: 80 }}>
          built with react &amp; vite
        </p>
      </section>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @media (max-width: 720px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-photo {
            max-width: 260px;
            margin: 0 auto;
            order: -1;
          }
        }
      `}</style>
    </div>
  );
}
