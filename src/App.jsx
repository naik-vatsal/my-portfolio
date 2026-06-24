import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  ArrowUpRight,
  MapPin,
  Mountain,
  Car,
  Trophy,
  Target,
  Gamepad2,
  Radio,
  X,
} from "lucide-react";

/* ---------------------------------------------------------
   BRAND ICONS
   lucide-react v1 removed Github/Linkedin brand marks, so we
   provide small inline SVGs with a lucide-compatible API
   (size prop + currentColor fill).
--------------------------------------------------------- */
function Github({ size = 16, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.2 11.19.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.36-1.33-1.73-1.33-1.73-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.8 2.81 1.28 3.49.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.81 0-1.28.47-2.33 1.23-3.15-.12-.3-.53-1.51.12-3.15 0 0 1.01-.32 3.3 1.2.96-.26 1.98-.39 3-.4 1.02 0 2.04.14 3 .4 2.28-1.52 3.29-1.2 3.29-1.2.65 1.64.24 2.85.12 3.15.77.82 1.23 1.87 1.23 3.15 0 4.51-2.81 5.5-5.49 5.79.43.36.81 1.09.81 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.83.56C20.57 21.91 24 17.49 24 12.29 24 5.78 18.63.5 12 .5z" />
    </svg>
  );
}

function Linkedin({ size = 16, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

/* ---------------------------------------------------------
   TOKENS
--------------------------------------------------------- */
const C = {
  bg: "#0A0C10",
  panel: "#14171D",
  panel2: "#181C23",
  line: "#262B33",
  lineFaint: "#1B1F26",
  ferrari: "#B3142F",
  ferrariDim: "#6E0E1F",
  redbull: "#1A2C52",
  redbullLight: "#2C4576",
  paper: "#EDEAE3",
  mute: "#868C96",
  muteDim: "#565C66",
};

const FONT_DISPLAY = "'Big Shoulders Display', sans-serif";
const FONT_BODY = "'Inter', sans-serif";
const FONT_MONO = "'IBM Plex Mono', monospace";

/* ---------------------------------------------------------
   DATA
--------------------------------------------------------- */
const STATS = [
  { sector: "SECTOR 1", label: "SCALE", value: 1.0, decimals: 1, suffix: "M+", note: "messages processed / day" },
  { sector: "SECTOR 2", label: "LATENCY", value: 30, decimals: 0, prefix: "-", suffix: "%", note: "API latency, Redis redesign" },
  { sector: "SECTOR 3", label: "OWNERSHIP", value: 25, decimals: 0, suffix: "+", note: "enterprise clients, solo" },
  { sector: "SECTOR 4", label: "THROUGHPUT", value: 6433, decimals: 0, suffix: "", note: "req/sec sustained" },
];

const PROJECTS = [
  {
    id: "01",
    name: "Arbiter",
    tag: "Infrastructure",
    result: "6,433 req/sec sustained, zero single point of failure",
    desc: "Fault-tolerant L7 load balancer built in Go. Three-state circuit breaker, token bucket rate limiting, health-check auto-failover.",
    stack: ["Go", "Prometheus", "Grafana"],
    link: "https://github.com/naik-vatsal/go-load-balancer",
    linkLabel: "Repository",
  },
  {
    id: "02",
    name: "Cost Sherlock",
    tag: "AI Systems",
    result: "4-agent pipeline cut investigation time",
    desc: "Multi-agent AI pipeline for AWS cost anomaly detection. Custom RAGAS evaluation layer monitors and optimizes agent output quality.",
    stack: ["Python", "LangChain", "RAG", "Claude API"],
    link: "https://costsherlock.streamlit.app/",
    linkLabel: "Live demo",
  },
  {
    id: "03",
    name: "JobLens",
    tag: "Full-Stack",
    result: "Shipped end to end, deployed on AWS",
    desc: "AI job intelligence platform. Async Celery workers, Redis batch scoring, full observability across the inference pipeline.",
    stack: ["FastAPI", "PostgreSQL", "Redis", "React", "AWS"],
    link: "https://job-lens-rho.vercel.app",
    linkLabel: "Live demo",
  },
  {
    id: "04",
    name: "SimpliCloud",
    tag: "Infrastructure",
    result: "Production-grade multi-AZ platform, sole engineer",
    desc: "Cloud-native e-commerce backend provisioned entirely through Terraform IaC, multi-AZ VPC through CloudWatch observability.",
    stack: ["AWS", "Terraform", "Kubernetes", "Redis"],
    link: "https://github.com/naik-vatsal/simplicloud",
    linkLabel: "Repository",
  },
];

const EXPERIENCE = [
  {
    period: "JAN 2026 — APR 2026",
    company: "Northeastern University",
    role: "Graduate Teaching Assistant",
    sub: "Software Quality Control & Management",
    notes: "Shipped Hex, an LLM-powered assistant on the Anthropic API automating Q&A, FAQs, and assignment clarification for 50+ engineers in live production.",
    stack: ["Anthropic API", "FastAPI", "Python"],
  },
  {
    period: "JAN 2025 — DEC 2025",
    company: "Dash Labs",
    role: "Machine Learning Engineer",
    sub: "Northeastern AI Research Lab",
    notes: "Built a 4-agent RAG grading system cutting evaluation time across 200+ submissions per cycle. Ran A/B tests across 4 fine-tuning configurations to select the production model.",
    stack: ["LangChain", "FAISS", "Hugging Face", "LoRA/QLoRA"],
  },
  {
    period: "DEC 2021 — JUL 2024",
    company: "Gupshup.ai",
    role: "Software Engineer",
    sub: "Enterprise Platform",
    notes: "Sole engineer on a templated bot framework deployed across 25+ BFSI and fintech clients. Node.js microservices on AWS EKS processing 1M+ messages/day. Kafka pipelines, Redis caching, payment and CRM integrations.",
    stack: ["Node.js", "AWS EKS", "Kafka", "Redis", "MongoDB"],
  },
  {
    period: "APR 2021 — NOV 2021",
    company: "Gupshup.ai",
    role: "Solutions Engineer Intern",
    sub: "",
    notes: "Integrated messaging APIs with Salesforce and Zoho CRMs for 10+ enterprise clients. Resolved live OAuth and webhook failures, shipped automated health checks.",
    stack: ["Python", "SQL", "REST APIs"],
  },
];

const EDUCATION = [
  { school: "Northeastern University", degree: "M.S. Information Systems", period: "MAY 2026" },
  { school: "University of Mumbai", degree: "B.S. Information Technology", period: "MAY 2021" },
];

const HOBBIES = [
  { icon: Mountain, label: "EXTREME SPORTS", note: "chasing the edge" },
  { icon: Car, label: "CARS", note: "anything with a redline" },
  { icon: Trophy, label: "FOOTBALL", note: "plays casually, watches religiously" },
  { icon: Target, label: "BADMINTON", note: "weekend rallies" },
  { icon: Gamepad2, label: "GAMING", note: "Valorant, competitive lobbies" },
];

const FIFA_DATA = {
  lastUpdated: "JUN 19, 2026 — 3:45 PM EDT",
  live: { home: "USA", away: "AUS", homeScore: 2, awayScore: 0 },
  recent: [
    { home: "CAN", away: "QAT", homeScore: 6, awayScore: 0 },
    { home: "ENG", away: "CRO", homeScore: 4, awayScore: 2 },
    { home: "SUI", away: "BIH", homeScore: 4, awayScore: 1 },
    { home: "ARG", away: "DZA", homeScore: 3, awayScore: 0 },
  ],
  upcoming: [
    { home: "BRA", away: "HTI", time: "TODAY 8:30 PM ET", favHome: 88.6 },
    { home: "SCO", away: "MAR", time: "TODAY 6:00 PM ET", favHome: 16.2 },
    { home: "NED", away: "SWE", time: "SAT 1:00 PM ET", favHome: 55 },
    { home: "GER", away: "CIV", time: "SAT 4:00 PM ET", favHome: 62.8 },
  ],
};

/* ---------------------------------------------------------
   HOOKS / PRIMITIVES
--------------------------------------------------------- */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function AnimatedNumber({ value, decimals = 0, prefix = "", suffix = "" }) {
  const [display, setDisplay] = useState(0);
  const [ref, visible] = useReveal();
  useEffect(() => {
    if (!visible) return;
    let frame;
    const duration = 1100;
    const start = performance.now();
    const animate = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [visible, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* ---------------------------------------------------------
   LAYOUT PIECES
--------------------------------------------------------- */
function StatusBar() {
  return (
    <div
      style={{
        borderBottom: `1px solid ${C.lineFaint}`,
        background: C.bg,
        fontFamily: FONT_MONO,
      }}
      className="w-full"
    >
      <div className="max-w-5xl mx-auto px-5 py-2 flex items-center justify-between text-[10px] sm:text-xs tracking-widest">
        <div className="flex items-center gap-2" style={{ color: C.mute }}>
          <span
            style={{
              width: 6,
              height: 6,
              background: C.ferrari,
              display: "inline-block",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          AVAILABLE FOR HIRE
        </div>
        <div className="hidden sm:flex items-center gap-1.5" style={{ color: C.muteDim }}>
          <MapPin size={11} />
          BOSTON, MA
        </div>
      </div>
    </div>
  );
}

function NavBar({ page, setPage }) {
  const items = [
    { id: "home", label: "HOME" },
    { id: "projects", label: "PROJECTS" },
    { id: "experience", label: "EXPERIENCE" },
  ];
  const go = (id) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div style={{ borderBottom: `1px solid ${C.line}`, background: C.bg }} className="sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-5 flex items-center justify-between h-14">
        <button
          onClick={() => go("home")}
          style={{ fontFamily: FONT_DISPLAY, color: C.paper, letterSpacing: "0.02em" }}
          className="text-lg font-bold tracking-tight"
        >
          V.NAIK<span style={{ color: C.ferrari }}>/</span>
        </button>
        <div className="flex items-center gap-1" style={{ fontFamily: FONT_MONO }}>
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className="relative px-3 py-2 text-[11px] tracking-widest transition-colors"
              style={{ color: page === item.id ? C.paper : C.mute }}
            >
              {item.label}
              {page === item.id && (
                <span
                  style={{
                    position: "absolute",
                    left: 12,
                    right: 12,
                    bottom: 4,
                    height: 2,
                    background: C.ferrari,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TelemetryStrip() {
  return (
    <div
      style={{ border: `1px solid ${C.line}`, background: C.panel }}
      className="grid grid-cols-2 sm:grid-cols-4 divide-x"
    >
      {STATS.map((s, i) => (
        <div
          key={s.label}
          style={{
            borderColor: C.line,
            borderTopWidth: i >= 2 ? 1 : 0,
            borderTopStyle: "solid",
          }}
          className="p-4 sm:p-5"
        >
          <div
            style={{ fontFamily: FONT_MONO, color: i % 2 === 0 ? C.ferrari : C.redbullLight }}
            className="text-[9px] tracking-[0.2em] mb-2"
          >
            {s.sector} — {s.label}
          </div>
          <div
            style={{ fontFamily: FONT_MONO, color: C.paper }}
            className="text-2xl sm:text-3xl font-medium tabular-nums"
          >
            <AnimatedNumber value={s.value} decimals={s.decimals} prefix={s.prefix || ""} suffix={s.suffix} />
          </div>
          <div style={{ color: C.mute }} className="text-[11px] mt-1">
            {s.note}
          </div>
        </div>
      ))}
    </div>
  );
}

function HobbiesStrip() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-px" style={{ background: C.line }}>
      {HOBBIES.map((h, i) => {
        const Icon = h.icon;
        return (
          <div key={h.label} style={{ background: C.panel }} className="p-4 sm:p-5 flex flex-col gap-2">
            <Icon size={18} style={{ color: i % 2 === 0 ? C.ferrari : C.redbullLight }} />
            <div style={{ fontFamily: FONT_MONO, color: C.paper }} className="text-xs tracking-widest">
              {h.label}
            </div>
            <div style={{ color: C.mute, fontFamily: FONT_BODY }} className="text-[11px] leading-snug">
              {h.note}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Chip({ children, tone = "mute" }) {
  const colorMap = { mute: C.mute, ferrari: C.ferrari, redbull: C.redbullLight };
  return (
    <span
      style={{
        fontFamily: FONT_MONO,
        color: colorMap[tone],
        border: `1px solid ${C.line}`,
        background: C.panel2,
      }}
      className="text-[10px] tracking-wide px-2 py-1 inline-block"
    >
      {children}
    </span>
  );
}

function Footer() {
  return (
    <div style={{ borderTop: `1px solid ${C.line}` }} className="mt-20">
      <div className="max-w-5xl mx-auto px-5 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <div>
            <div style={{ fontFamily: FONT_MONO, color: C.muteDim }} className="text-[10px] tracking-widest mb-2">
              CURRENTLY
            </div>
            <div style={{ fontFamily: FONT_DISPLAY, color: C.paper }} className="text-2xl sm:text-3xl font-semibold">
              Looking for backend &amp; AI engineering roles.
            </div>
          </div>
          <a
            href="mailto:naikvatsal7@gmail.com"
            style={{
              fontFamily: FONT_MONO,
              background: C.ferrari,
              color: C.paper,
            }}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 text-xs tracking-widest hover:brightness-110 transition"
          >
            GET IN TOUCH
            <ArrowUpRight size={14} />
          </a>
        </div>

        <div
          style={{ borderTop: `1px solid ${C.lineFaint}`, color: C.muteDim, fontFamily: FONT_MONO }}
          className="mt-10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[11px]"
        >
          <span>© {new Date().getFullYear()} VATSAL SANDEEP NAIK</span>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/naik-vatsal"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              style={{ color: C.mute }}
            >
              <Github size={14} /> GITHUB
            </a>
            <a
              href="https://linkedin.com/in/vatsalsnaik"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              style={{ color: C.mute }}
            >
              <Linkedin size={14} /> LINKEDIN
            </a>
            <a
              href="mailto:naikvatsal7@gmail.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              style={{ color: C.mute }}
            >
              <Mail size={14} /> EMAIL
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function FifaBadge() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          right: 16,
          bottom: 16,
          zIndex: 30,
          background: C.panel,
          border: `1px solid ${C.line}`,
          fontFamily: FONT_MONO,
          color: C.paper,
        }}
        className="flex items-center gap-2 pl-3 pr-4 py-2.5 shadow-lg hover:border-white/30 transition-colors"
      >
        <Radio size={14} style={{ color: C.ferrari }} />
        <span className="text-[10px] tracking-widest">WC26</span>
        <span
          style={{
            width: 6,
            height: 6,
            background: C.ferrari,
            display: "inline-block",
            animation: "pulse 1.6s ease-in-out infinite",
          }}
        />
      </button>

      {open && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(10,12,16,0.7)" }}
          onClick={() => setOpen(false)}
          className="flex items-end sm:items-center justify-center p-0 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: C.bg,
              border: `1px solid ${C.line}`,
              maxHeight: "85vh",
              width: "100%",
              maxWidth: 480,
              animation: "fadeInUp 0.3s ease",
            }}
            className="overflow-y-auto"
          >
            <div
              style={{ borderBottom: `1px solid ${C.line}`, background: C.panel }}
              className="sticky top-0 flex items-center justify-between px-5 py-4"
            >
              <div>
                <div style={{ fontFamily: FONT_MONO, color: C.ferrari }} className="text-[10px] tracking-widest">
                  FIFA WORLD CUP 2026
                </div>
                <div style={{ fontFamily: FONT_MONO, color: C.muteDim }} className="text-[9px] mt-0.5">
                  UPDATED {FIFA_DATA.lastUpdated}
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ color: C.mute }}>
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-6">
              <div>
                <div
                  style={{ fontFamily: FONT_MONO, color: C.muteDim }}
                  className="text-[10px] tracking-widest mb-2 flex items-center gap-2"
                >
                  <span
                    style={{ width: 6, height: 6, background: C.ferrari, animation: "pulse 1.6s ease-in-out infinite" }}
                    className="inline-block"
                  />
                  LIVE NOW
                </div>
                <div style={{ border: `1px solid ${C.line}`, background: C.panel }} className="p-4 flex items-center justify-between">
                  <span style={{ fontFamily: FONT_DISPLAY, color: C.paper }} className="text-lg font-bold">
                    {FIFA_DATA.live.home}
                  </span>
                  <span style={{ fontFamily: FONT_MONO, color: C.paper }} className="text-2xl tabular-nums">
                    {FIFA_DATA.live.homeScore} — {FIFA_DATA.live.awayScore}
                  </span>
                  <span style={{ fontFamily: FONT_DISPLAY, color: C.paper }} className="text-lg font-bold">
                    {FIFA_DATA.live.away}
                  </span>
                </div>
              </div>

              <div>
                <div style={{ fontFamily: FONT_MONO, color: C.muteDim }} className="text-[10px] tracking-widest mb-2">
                  RECENT RESULTS
                </div>
                <div style={{ border: `1px solid ${C.line}` }}>
                  {FIFA_DATA.recent.map((g, i) => (
                    <div
                      key={i}
                      style={{ borderTop: i === 0 ? "none" : `1px solid ${C.line}` }}
                      className="flex items-center justify-between px-3 py-2.5"
                    >
                      <span style={{ fontFamily: FONT_MONO, color: C.mute }} className="text-xs">
                        {g.home}
                      </span>
                      <span style={{ fontFamily: FONT_MONO, color: C.paper }} className="text-xs tabular-nums">
                        {g.homeScore} — {g.awayScore}
                      </span>
                      <span style={{ fontFamily: FONT_MONO, color: C.mute }} className="text-xs">
                        {g.away}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontFamily: FONT_MONO, color: C.muteDim }} className="text-[10px] tracking-widest mb-2">
                  UPCOMING
                </div>
                <div className="space-y-3">
                  {FIFA_DATA.upcoming.map((g, i) => (
                    <div key={i} style={{ border: `1px solid ${C.line}`, background: C.panel }} className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span style={{ fontFamily: FONT_MONO, color: C.paper }} className="text-xs">
                          {g.home} vs {g.away}
                        </span>
                        <span style={{ fontFamily: FONT_MONO, color: C.muteDim }} className="text-[10px]">
                          {g.time}
                        </span>
                      </div>
                      <div style={{ background: C.lineFaint, height: 4 }} className="w-full overflow-hidden">
                        <div style={{ background: C.ferrari, width: `${g.favHome}%`, height: "100%" }} />
                      </div>
                      <div style={{ fontFamily: FONT_MONO, color: C.muteDim }} className="text-[9px] mt-1">
                        {g.home} favored {g.favHome}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------------------------------------------------------
   PAGES
--------------------------------------------------------- */
function HomePage({ setPage }) {
  return (
    <div>
      {/* HERO */}
      <div className="max-w-5xl mx-auto px-5 pt-12 sm:pt-20 pb-12 relative">
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(${C.lineFaint} 1px, transparent 1px), linear-gradient(90deg, ${C.lineFaint} 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
            opacity: 0.4,
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-12">
          <div className="flex-1">
            <div style={{ fontFamily: FONT_MONO, color: C.ferrari }} className="text-xs tracking-[0.25em] mb-4">
              BACKEND ENGINEER — SYSTEMS CONTROL
            </div>
            <h1
              style={{ fontFamily: FONT_DISPLAY, color: C.paper, lineHeight: 0.95 }}
              className="text-6xl sm:text-7xl font-extrabold tracking-tight"
            >
              VATSAL
              <br />
              NAIK
            </h1>
            <p style={{ color: C.mute, fontFamily: FONT_BODY }} className="mt-5 text-base sm:text-lg max-w-md leading-relaxed">
              I build distributed systems that don't go down. Four years shipping
              production infrastructure solo, end to end.
            </p>
          </div>

          {/* photo / ID badge frame */}
          <div className="shrink-0">
            <div
              style={{ border: `1px solid ${C.line}`, background: C.panel, width: 152, height: 190 }}
              className="relative flex items-center justify-center overflow-hidden"
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `repeating-linear-gradient(135deg, ${C.lineFaint} 0px, ${C.lineFaint} 1px, transparent 1px, transparent 10px)`,
                }}
              />
              <span style={{ fontFamily: FONT_MONO, color: C.muteDim }} className="relative text-[9px] tracking-widest text-center px-3">
                PHOTO
                <br />
                PENDING
              </span>
              <div
                style={{ borderTop: `1px solid ${C.line}`, fontFamily: FONT_MONO, color: C.redbullLight }}
                className="absolute bottom-0 left-0 right-0 text-[9px] tracking-widest text-center py-1.5"
              >
                ID — V.S.N
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TELEMETRY */}
      <div className="max-w-5xl mx-auto px-5">
        <Reveal>
          <TelemetryStrip />
        </Reveal>
      </div>

      {/* MISSION */}
      <div className="max-w-5xl mx-auto px-5 py-14 sm:py-20">
        <Reveal>
          <div className="max-w-2xl">
            <div style={{ fontFamily: FONT_MONO, color: C.redbullLight }} className="text-[10px] tracking-widest mb-3">
              BRIEFING
            </div>
            <p style={{ color: C.paper, fontFamily: FONT_BODY }} className="text-lg sm:text-xl leading-relaxed">
              Most of my work lives where things actually run: message routing
              at scale, async pipelines that don't drop data, infrastructure
              that survives traffic spikes without anyone noticing. I've been
              the only engineer on systems serving dozens of enterprise
              clients, which means I design, build, deploy, and own the
              outcome.
            </p>
          </div>
        </Reveal>
      </div>

      {/* FEATURED PROJECTS */}
      <div className="max-w-5xl mx-auto px-5 pb-20">
        <Reveal>
          <div className="flex items-center justify-between mb-5">
            <div style={{ fontFamily: FONT_MONO, color: C.muteDim }} className="text-[10px] tracking-widest">
              FEATURED WORK
            </div>
            <button
              onClick={() => {
                setPage("projects");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{ fontFamily: FONT_MONO, color: C.ferrari }}
              className="text-[11px] tracking-widest flex items-center gap-1 hover:underline"
            >
              ALL PROJECTS <ArrowUpRight size={12} />
            </button>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-px" style={{ background: C.line }}>
          {PROJECTS.slice(0, 3).map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <div style={{ background: C.panel }} className="p-5 h-full">
                <div style={{ fontFamily: FONT_MONO, color: C.ferrari }} className="text-[10px] tracking-widest mb-2">
                  {p.id} / {p.tag.toUpperCase()}
                </div>
                <div style={{ fontFamily: FONT_DISPLAY, color: C.paper }} className="text-2xl font-bold mb-2">
                  {p.name}
                </div>
                <div style={{ color: C.mute, fontFamily: FONT_BODY }} className="text-sm leading-relaxed">
                  {p.result}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* OFF DUTY */}
      <div className="max-w-5xl mx-auto px-5 pb-20">
        <Reveal>
          <div style={{ fontFamily: FONT_MONO, color: C.muteDim }} className="text-[10px] tracking-widest mb-5">
            OFF DUTY
          </div>
          <HobbiesStrip />
        </Reveal>
      </div>
    </div>
  );
}

function ProjectsPage() {
  const [open, setOpen] = useState(null);
  return (
    <div className="max-w-5xl mx-auto px-5 py-12 sm:py-16">
      <Reveal>
        <div style={{ fontFamily: FONT_MONO, color: C.redbullLight }} className="text-[10px] tracking-widest mb-2">
          SESSION LOG
        </div>
        <h2 style={{ fontFamily: FONT_DISPLAY, color: C.paper }} className="text-4xl sm:text-5xl font-extrabold mb-10">
          PROJECT RESULTS
        </h2>
      </Reveal>

      <div style={{ border: `1px solid ${C.line}` }}>
        {PROJECTS.map((p, i) => {
          const isOpen = open === p.id;
          return (
            <Reveal key={p.id} delay={i * 0.06}>
              <div
                style={{
                  borderTop: i === 0 ? "none" : `1px solid ${C.line}`,
                  background: isOpen ? C.panel : "transparent",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : p.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-center gap-4 sm:gap-6 group"
                >
                  <span style={{ fontFamily: FONT_MONO, color: C.muteDim }} className="text-sm shrink-0 w-6">
                    {p.id}
                  </span>
                  <span
                    style={{ fontFamily: FONT_DISPLAY, color: C.paper }}
                    className="text-xl sm:text-2xl font-bold shrink-0 w-full sm:w-44"
                  >
                    {p.name}
                  </span>
                  <span style={{ color: C.mute, fontFamily: FONT_BODY }} className="hidden sm:block text-sm flex-1">
                    {p.result}
                  </span>
                  <ArrowUpRight
                    size={16}
                    style={{
                      color: C.ferrari,
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                    }}
                    className="shrink-0"
                  />
                </button>

                <div
                  style={{
                    maxHeight: isOpen ? 240 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.35s ease",
                  }}
                >
                  <div className="px-4 sm:px-5 pb-5 sm:pl-[5.5rem]">
                    <p style={{ color: C.mute, fontFamily: FONT_BODY }} className="text-sm leading-relaxed mb-4 max-w-xl">
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {p.stack.map((s) => (
                        <Chip key={s}>{s}</Chip>
                      ))}
                    </div>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontFamily: FONT_MONO, color: C.ferrari }}
                      className="inline-flex items-center gap-1 text-xs tracking-widest hover:underline"
                    >
                      {p.linkLabel.toUpperCase()} <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

function ExperiencePage() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-12 sm:py-16">
      <Reveal>
        <div style={{ fontFamily: FONT_MONO, color: C.redbullLight }} className="text-[10px] tracking-widest mb-2">
          SEASON HISTORY
        </div>
        <h2 style={{ fontFamily: FONT_DISPLAY, color: C.paper }} className="text-4xl sm:text-5xl font-extrabold mb-10">
          CAREER TIMELINE
        </h2>
      </Reveal>

      <div className="relative">
        <div
          style={{ background: C.line, left: 5 }}
          className="absolute top-2 bottom-2 w-px hidden sm:block"
        />
        <div className="space-y-10">
          {EXPERIENCE.map((e, i) => (
            <Reveal key={e.company + e.role} delay={i * 0.07}>
              <div className="relative sm:pl-10">
                <span
                  style={{ background: C.ferrari, top: 6 }}
                  className="absolute left-0 hidden sm:block w-[11px] h-[11px]"
                />
                <div style={{ fontFamily: FONT_MONO, color: C.muteDim }} className="text-[10px] tracking-widest mb-1">
                  {e.period}
                </div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <span style={{ fontFamily: FONT_DISPLAY, color: C.paper }} className="text-xl sm:text-2xl font-bold">
                    {e.role}
                  </span>
                  <span style={{ fontFamily: FONT_BODY, color: C.redbullLight }} className="text-sm">
                    {e.company}
                  </span>
                </div>
                {e.sub && (
                  <div style={{ color: C.muteDim, fontFamily: FONT_BODY }} className="text-xs mb-3">
                    {e.sub}
                  </div>
                )}
                <p style={{ color: C.mute, fontFamily: FONT_BODY }} className="text-sm leading-relaxed max-w-xl mb-3">
                  {e.notes}
                </p>
                <div className="flex flex-wrap gap-2">
                  {e.stack.map((s) => (
                    <Chip key={s} tone="redbull">
                      {s}
                    </Chip>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* EDUCATION */}
      <Reveal delay={0.1}>
        <div style={{ borderTop: `1px solid ${C.line}` }} className="mt-14 pt-8">
          <div style={{ fontFamily: FONT_MONO, color: C.muteDim }} className="text-[10px] tracking-widest mb-4">
            EDUCATION
          </div>
          <div className="grid sm:grid-cols-2 gap-px" style={{ background: C.line }}>
            {EDUCATION.map((ed) => (
              <div key={ed.school} style={{ background: C.panel }} className="p-4">
                <div style={{ fontFamily: FONT_MONO, color: C.redbullLight }} className="text-[10px] tracking-widest mb-1">
                  {ed.period}
                </div>
                <div style={{ fontFamily: FONT_DISPLAY, color: C.paper }} className="text-lg font-bold">
                  {ed.school}
                </div>
                <div style={{ color: C.mute, fontFamily: FONT_BODY }} className="text-sm">
                  {ed.degree}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/* ---------------------------------------------------------
   APP
--------------------------------------------------------- */
export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }} className="w-full">
      <style>{`
        /* Google Fonts (Big Shoulders Display, Inter, IBM Plex Mono) load via index.html */
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        ::selection { background: ${C.ferrari}; color: ${C.paper}; }
        a, button { -webkit-tap-highlight-color: transparent; }
        button:focus-visible, a:focus-visible {
          outline: 2px solid ${C.ferrari};
          outline-offset: 2px;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .page-enter { animation: fadeInUp 0.45s ease; }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.line}; }
      `}</style>

      <StatusBar />
      <NavBar page={page} setPage={setPage} />

      <div key={page} className="page-enter">
        {page === "home" && <HomePage setPage={setPage} />}
        {page === "projects" && <ProjectsPage />}
        {page === "experience" && <ExperiencePage />}
      </div>

      {page === "home" && <FifaBadge />}

      <Footer />
    </div>
  );
}
