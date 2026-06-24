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
import vatsalPhoto from "./assets/vatsal.jpg";

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
  {
    id: "05",
    name: "AlphaPortfolio",
    tag: "AI / RL",
    result: "Multi-agent RL system with Double DQN + UCB bandit orchestration",
    desc: "Autonomous portfolio management system combining Double DQN reinforcement learning with a UCB bandit orchestrator to dynamically allocate across assets. Agents learn from market signals and adapt strategies without human intervention.",
    stack: ["Python", "PyTorch", "Reinforcement Learning", "Double DQN"],
    link: "https://github.com/naik-vatsal/alphaportfolio-",
    linkLabel: "Repository",
  },
  {
    id: "06",
    name: "DataSherlock",
    tag: "AI Systems",
    result: "4-agent CSV analysis pipeline powered by CrewAI",
    desc: "Multi-agent data analysis pipeline built on CrewAI that ingests raw CSV data and routes through specialized agents for cleaning, analysis, insight generation, and reporting. Fully autonomous from upload to output.",
    stack: ["Python", "CrewAI", "LangChain", "Pandas"],
    link: "https://github.com/naik-vatsal/datasherlock",
    linkLabel: "Repository",
  },
  {
    id: "07",
    name: "Remarq",
    tag: "Product",
    result: "AI-powered Chrome extension deployed to the Web Store",
    desc: "Chrome extension that generates contextual AI comments based on selected text on any webpage. Deployed to the Chrome Web Store with a React frontend and LLM-powered inference backend.",
    stack: ["React", "Chrome Extension", "LangChain", "REST API"],
    link: "https://github.com/naik-vatsal/Remarq",
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

// Used while loading and as a fallback if /api/football fails. Normalized to
// the same shape transformFifa() produces: `live` is an array, plus totalGoals.
const FIFA_FALLBACK = {
  lastUpdated: "JUN 19, 2026 — 3:45 PM EDT",
  totalGoals: 22,
  live: [{ home: "USA", away: "AUS", homeScore: 2, awayScore: 0 }],
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

const teamCode = (t) => t?.tla || t?.shortName || t?.name || "TBD";

function formatKickoff(utcDate) {
  if (!utcDate) return "TBD";
  return (
    new Date(utcDate)
      .toLocaleString("en-US", {
        weekday: "short",
        hour: "numeric",
        minute: "2-digit",
        timeZone: "America/New_York",
      })
      .toUpperCase() + " ET"
  );
}

// Shapes the football-data.org /competitions/WC/matches payload into the
// structure FifaBadge renders, and tallies total goals across the tournament.
function transformFifa(api) {
  const matches = Array.isArray(api?.matches) ? api.matches : [];
  const live = [];
  const finished = [];
  const scheduled = [];
  let totalGoals = 0;

  for (const m of matches) {
    const home = teamCode(m.homeTeam);
    const away = teamCode(m.awayTeam);
    const hs = m.score?.fullTime?.home;
    const as = m.score?.fullTime?.away;
    if (typeof hs === "number") totalGoals += hs;
    if (typeof as === "number") totalGoals += as;

    if (m.status === "IN_PLAY" || m.status === "PAUSED") {
      live.push({ home, away, homeScore: hs ?? 0, awayScore: as ?? 0 });
    } else if (m.status === "FINISHED") {
      finished.push({ home, away, homeScore: hs ?? 0, awayScore: as ?? 0, date: m.utcDate });
    } else {
      scheduled.push({ home, away, time: formatKickoff(m.utcDate), date: m.utcDate });
    }
  }

  finished.sort((a, b) => new Date(b.date) - new Date(a.date));
  scheduled.sort((a, b) => new Date(a.date) - new Date(b.date));

  return {
    lastUpdated:
      new Date()
        .toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          timeZone: "America/New_York",
        })
        .toUpperCase() + " ET",
    totalGoals,
    live,
    recent: finished.slice(0, 4),
    upcoming: scheduled.slice(0, 4),
  };
}

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
   CUSTOM CURSOR
   Small dot follows the mouse 1:1. Larger ring trails with
   easing. Ring scales + turns ferrari red over interactive
   targets. Skipped on touch devices and when the user has
   prefers-reduced-motion set.
--------------------------------------------------------- */
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // touch device → skip entirely
    const isTouch =
      window.matchMedia("(hover: none)").matches ||
      "ontouchstart" in window;
    if (isTouch) return;
    // reduced motion → skip the trailing animation entirely
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      // hover detection for interactive targets
      const el = e.target;
      const interactive =
        el && el.closest && el.closest('a, button, [role="button"], input, textarea, select, label');
      if (ringRef.current) {
        ringRef.current.dataset.hover = interactive ? "1" : "0";
      }
    };

    let raf;
    const tick = () => {
      // lerp the ring toward the mouse for the trailing feel
      ring.current.x += (target.current.x - ring.current.x) * 0.18;
      ring.current.y += (target.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
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
      <div className="max-w-5xl mx-auto px-5 py-2 flex items-center justify-between text-xs tracking-widest">
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
            background: C.panel,
          }}
          className="p-4 sm:p-5 card-lift"
        >
          <div
            style={{ fontFamily: FONT_MONO, color: i % 2 === 0 ? C.ferrari : C.redbullLight }}
            className="text-xs tracking-widest mb-2"
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
          <div key={h.label} style={{ background: C.panel }} className="p-4 sm:p-5 flex flex-col gap-2 card-lift">
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
      className="text-xs tracking-wide px-2 py-1 inline-block"
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
            <div style={{ fontFamily: FONT_MONO, color: C.muteDim }} className="text-xs tracking-widest mb-2">
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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/football")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        if (active) setData(transformFifa(json));
      })
      .catch(() => {
        if (active) setData(FIFA_FALLBACK);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const fifa = data || FIFA_FALLBACK;

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
        <span className="text-xs tracking-widest">WC26</span>
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
                <div style={{ fontFamily: FONT_MONO, color: C.ferrari }} className="text-xs tracking-widest">
                  FIFA WORLD CUP 2026
                </div>
                <div style={{ fontFamily: FONT_MONO, color: C.muteDim }} className="text-xs mt-0.5">
                  UPDATED {fifa.lastUpdated}
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ color: C.mute }}>
                <X size={18} />
              </button>
            </div>

            {loading ? (
              <div
                className="p-10 flex flex-col items-center justify-center gap-3"
                style={{ color: C.mute, fontFamily: FONT_MONO }}
              >
                <span
                  style={{ width: 8, height: 8, background: C.ferrari, animation: "pulse 1s ease-in-out infinite" }}
                  className="inline-block"
                />
                <span className="text-xs tracking-widest">LOADING LIVE DATA…</span>
              </div>
            ) : (
              <div className="p-5 space-y-6">
                {/* TOURNAMENT STATS */}
                <div
                  style={{ border: `1px solid ${C.line}`, background: C.panel }}
                  className="grid grid-cols-2 divide-x"
                >
                  <div className="p-4" style={{ borderColor: C.line }}>
                    <div style={{ fontFamily: FONT_MONO, color: C.muteDim }} className="text-xs tracking-[0.2em] mb-1">
                      TOTAL GOALS
                    </div>
                    <div style={{ fontFamily: FONT_MONO, color: C.ferrari }} className="text-2xl font-medium tabular-nums">
                      {fifa.totalGoals}
                    </div>
                  </div>
                  <div className="p-4" style={{ borderColor: C.line }}>
                    <div style={{ fontFamily: FONT_MONO, color: C.muteDim }} className="text-xs tracking-[0.2em] mb-1">
                      LIVE MATCHES
                    </div>
                    <div style={{ fontFamily: FONT_MONO, color: C.redbullLight }} className="text-2xl font-medium tabular-nums">
                      {fifa.live.length}
                    </div>
                  </div>
                </div>

                {/* LIVE NOW */}
                <div>
                  <div
                    style={{ fontFamily: FONT_MONO, color: C.muteDim }}
                    className="text-xs tracking-widest mb-2 flex items-center gap-2"
                  >
                    <span
                      style={{ width: 6, height: 6, background: C.ferrari, animation: "pulse 1.6s ease-in-out infinite" }}
                      className="inline-block"
                    />
                    LIVE NOW
                  </div>
                  {fifa.live.length === 0 ? (
                    <div
                      style={{ border: `1px solid ${C.line}`, background: C.panel, color: C.muteDim, fontFamily: FONT_MONO }}
                      className="p-4 text-[11px] tracking-widest text-center"
                    >
                      NO MATCHES LIVE RIGHT NOW
                    </div>
                  ) : (
                    <div className="space-y-px" style={{ background: C.line }}>
                      {fifa.live.map((g, i) => (
                        <div
                          key={i}
                          style={{ background: C.panel }}
                          className="p-4 flex items-center justify-between"
                        >
                          <span style={{ fontFamily: FONT_DISPLAY, color: C.paper }} className="text-lg font-bold">
                            {g.home}
                          </span>
                          <span style={{ fontFamily: FONT_MONO, color: C.paper }} className="text-2xl tabular-nums">
                            {g.homeScore} — {g.awayScore}
                          </span>
                          <span style={{ fontFamily: FONT_DISPLAY, color: C.paper }} className="text-lg font-bold">
                            {g.away}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* RECENT RESULTS */}
                <div>
                  <div style={{ fontFamily: FONT_MONO, color: C.muteDim }} className="text-xs tracking-widest mb-2">
                    RECENT RESULTS
                  </div>
                  {fifa.recent.length === 0 ? (
                    <div
                      style={{ border: `1px solid ${C.line}`, color: C.muteDim, fontFamily: FONT_MONO }}
                      className="p-3 text-[11px] tracking-widest text-center"
                    >
                      NO RESULTS YET
                    </div>
                  ) : (
                    <div style={{ border: `1px solid ${C.line}` }}>
                      {fifa.recent.map((g, i) => (
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
                  )}
                </div>

                {/* UPCOMING */}
                <div>
                  <div style={{ fontFamily: FONT_MONO, color: C.muteDim }} className="text-xs tracking-widest mb-2">
                    UPCOMING
                  </div>
                  {fifa.upcoming.length === 0 ? (
                    <div
                      style={{ border: `1px solid ${C.line}`, color: C.muteDim, fontFamily: FONT_MONO }}
                      className="p-3 text-[11px] tracking-widest text-center"
                    >
                      NO UPCOMING MATCHES
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {fifa.upcoming.map((g, i) => (
                        <div key={i} style={{ border: `1px solid ${C.line}`, background: C.panel }} className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span style={{ fontFamily: FONT_MONO, color: C.paper }} className="text-xs">
                              {g.home} vs {g.away}
                            </span>
                            <span style={{ fontFamily: FONT_MONO, color: C.muteDim }} className="text-xs">
                              {g.time}
                            </span>
                          </div>
                          {g.favHome != null && (
                            <>
                              <div style={{ background: C.lineFaint, height: 4 }} className="w-full overflow-hidden">
                                <div style={{ background: C.ferrari, width: `${g.favHome}%`, height: "100%" }} />
                              </div>
                              <div style={{ fontFamily: FONT_MONO, color: C.muteDim }} className="text-xs mt-1">
                                {g.home} favored {g.favHome}%
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
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

          {/* photo — organic layered treatment */}
          <div
            className="shrink-0 relative"
            style={{ width: 220, height: 250 }}
            aria-hidden={false}
          >
            {/* blob 1 — ferrari red, back layer */}
            <div
              aria-hidden
              className="blob-float-a"
              style={{
                position: "absolute",
                top: 0,
                left: -24,
                width: 180,
                height: 200,
                background: C.ferrari,
                opacity: 0.15,
                borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                filter: "blur(0.5px) drop-shadow(0 12px 24px rgba(179,20,47,0.25))",
              }}
            />
            {/* blob 2 — red bull navy, mid layer */}
            <div
              aria-hidden
              className="blob-float-b"
              style={{
                position: "absolute",
                top: 44,
                left: 44,
                width: 190,
                height: 210,
                background: C.redbullLight,
                opacity: 0.22,
                borderRadius: "71% 29% 45% 55% / 61% 39% 61% 39%",
                filter: "blur(0.5px) drop-shadow(0 10px 20px rgba(44,69,118,0.3))",
              }}
            />
            {/* photo — organic mask, sits on top */}
            <img
              src={vatsalPhoto}
              alt="Vatsal Naik"
              className="blob-float-c"
              style={{
                position: "absolute",
                top: 12,
                left: 20,
                width: 184,
                height: 230,
                objectFit: "cover",
                display: "block",
                borderRadius: "63% 37% 38% 62% / 49% 28% 72% 51%",
                filter: "drop-shadow(0 18px 28px rgba(0,0,0,0.55))",
              }}
            />
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
            <div style={{ fontFamily: FONT_MONO, color: C.redbullLight }} className="text-sm tracking-[0.2em] mb-3">
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
            <div style={{ fontFamily: FONT_MONO, color: C.muteDim }} className="text-sm tracking-[0.2em]">
              FEATURED WORK
            </div>
            <button
              onClick={() => {
                setPage("projects");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{ fontFamily: FONT_MONO, color: C.ferrari }}
              className="text-sm tracking-widest flex items-center gap-1 hover:underline"
            >
              ALL PROJECTS <ArrowUpRight size={12} />
            </button>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-px" style={{ background: C.line }}>
          {PROJECTS.slice(0, 3).map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <div style={{ background: C.panel }} className="p-5 h-full card-lift">
                <div style={{ fontFamily: FONT_MONO, color: C.ferrari }} className="text-sm tracking-widest mb-2">
                  {p.id} / {p.tag.toUpperCase()}
                </div>
                <div style={{ fontFamily: FONT_DISPLAY, color: C.paper }} className="text-3xl font-bold mb-2">
                  {p.name}
                </div>
                <div style={{ color: C.mute, fontFamily: FONT_BODY }} className="text-base leading-relaxed">
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
          <div style={{ fontFamily: FONT_MONO, color: C.muteDim }} className="text-sm tracking-[0.2em] mb-5">
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
        <div style={{ fontFamily: FONT_MONO, color: C.redbullLight }} className="text-xs tracking-widest mb-2">
          SESSION LOG
        </div>
        <h2 style={{ fontFamily: FONT_DISPLAY, color: C.paper }} className="text-[2.625rem] sm:text-[3.5rem] leading-[0.95] font-extrabold mb-10">
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
                className="card-lift"
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
        <div style={{ fontFamily: FONT_MONO, color: C.redbullLight }} className="text-xs tracking-widest mb-2">
          SEASON HISTORY
        </div>
        <h2 style={{ fontFamily: FONT_DISPLAY, color: C.paper }} className="text-[2.625rem] sm:text-[3.5rem] leading-[0.95] font-extrabold mb-10">
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
              <div
                className="relative card-lift p-4 sm:p-5 sm:pl-10"
                style={{ background: C.panel }}
              >
                <span
                  style={{ background: C.ferrari, top: 6 }}
                  className="absolute left-0 hidden sm:block w-[11px] h-[11px]"
                />
                <div style={{ fontFamily: FONT_MONO, color: C.muteDim }} className="text-xs tracking-widest mb-1">
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
          <div style={{ fontFamily: FONT_MONO, color: C.muteDim }} className="text-xs tracking-widest mb-4">
            EDUCATION
          </div>
          <div className="grid sm:grid-cols-2 gap-px" style={{ background: C.line }}>
            {EDUCATION.map((ed) => (
              <div key={ed.school} style={{ background: C.panel }} className="p-4 card-lift">
                <div style={{ fontFamily: FONT_MONO, color: C.redbullLight }} className="text-xs tracking-widest mb-1">
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

        /* hero photo: floating blob layers */
        @keyframes blobFloatA {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-6px) translateX(2px); }
        }
        @keyframes blobFloatB {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(5px) translateX(-3px); }
        }
        @keyframes blobFloatC {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .blob-float-a { animation: blobFloatA 9s ease-in-out infinite; }
        .blob-float-b { animation: blobFloatB 10s ease-in-out infinite; }
        .blob-float-c { animation: blobFloatC 8s ease-in-out infinite; }

        /* card lift on hover — tasteful, uniform across cards */
        .card-lift {
          position: relative;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          will-change: transform;
        }
        .card-lift::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: ${C.ferrari};
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
          pointer-events: none;
          z-index: 1;
        }
        .card-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 28px -16px rgba(0,0,0,0.7), 0 6px 12px -6px rgba(0,0,0,0.45);
        }
        .card-lift:hover::before { transform: scaleX(1); }

        /* custom cursor */
        body.custom-cursor-active,
        body.custom-cursor-active * { cursor: none !important; }
        .cursor-dot, .cursor-ring {
          position: fixed;
          top: 0; left: 0;
          pointer-events: none;
          z-index: 9999;
          border-radius: 9999px;
        }
        .cursor-dot {
          width: 8px; height: 8px;
          background: ${C.paper};
          mix-blend-mode: difference;
        }
        .cursor-ring {
          width: 32px; height: 32px;
          border: 1.5px solid ${C.paper};
          transition: width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        }
        .cursor-ring[data-hover="1"] {
          width: 58px; height: 58px;
          border-color: ${C.ferrari};
          background: rgba(179,20,47,0.15);
        }
        @media (hover: none) {
          .cursor-dot, .cursor-ring { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cursor-dot, .cursor-ring { display: none; }
        }
      `}</style>

      <CustomCursor />
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
