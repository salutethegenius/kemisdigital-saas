"use client";

import { useState, type ReactNode } from "react";

const theme = {
  bg: "#0a0c0f",
  surface: "#111417",
  border: "#1e2329",
  accent: "#f97316",
  accentBlue: "#3b82f6",
  accentPurple: "#8b5cf6",
  text: "#e8eaed",
  muted: "#6b7280",
  tag: "#1a2035",
} as const;

type TagColor = "orange" | "blue" | "purple";

function Tag({ children, color }: { children: ReactNode; color: TagColor }) {
  return (
    <span
      style={{
        background:
          color === "orange"
            ? "rgba(249,115,22,0.12)"
            : color === "blue"
              ? "rgba(59,130,246,0.12)"
              : "rgba(139,92,246,0.12)",
        color:
          color === "orange"
            ? theme.accent
            : color === "blue"
              ? theme.accentBlue
              : theme.accentPurple,
        border: `1px solid ${
          color === "orange"
            ? "rgba(249,115,22,0.3)"
            : color === "blue"
              ? "rgba(59,130,246,0.3)"
              : "rgba(139,92,246,0.3)"
        }`,
        borderRadius: "4px",
        padding: "2px 8px",
        fontSize: "11px",
        fontFamily: "'Courier New', monospace",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

function Section({
  title,
  label,
  labelColor,
  children,
}: {
  title: string;
  label?: string;
  labelColor?: TagColor;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        background: theme.surface,
        border: `1px solid ${theme.border}`,
        borderRadius: "8px",
        padding: "28px 32px",
        marginBottom: "20px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <h2
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "20px",
            fontWeight: 700,
            color: theme.text,
            margin: 0,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </h2>
        {label && labelColor && <Tag color={labelColor}>{label}</Tag>}
      </div>
      {children}
    </div>
  );
}

function PricingCard({
  name,
  price,
  period,
  desc,
  features,
  highlight,
}: {
  name: string;
  price: string;
  period?: string;
  desc: string;
  features: string[];
  highlight?: boolean;
}) {
  return (
    <div
      style={{
        background: highlight ? "rgba(249,115,22,0.06)" : theme.bg,
        border: `1px solid ${highlight ? "rgba(249,115,22,0.4)" : theme.border}`,
        borderRadius: "8px",
        padding: "24px",
        flex: 1,
        position: "relative",
      }}
    >
      {highlight && (
        <div
          style={{
            position: "absolute",
            top: "-11px",
            left: "20px",
            background: theme.accent,
            color: "#fff",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            padding: "2px 10px",
            borderRadius: "3px",
            textTransform: "uppercase",
          }}
        >
          Recommended
        </div>
      )}
      <div
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "14px",
          fontWeight: 700,
          color: theme.muted,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "8px",
        }}
      >
        {name}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "6px" }}>
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "36px",
            fontWeight: 800,
            color: highlight ? theme.accent : theme.text,
          }}
        >
          {price}
        </span>
        {period && <span style={{ color: theme.muted, fontSize: "13px" }}>{period}</span>}
      </div>
      <div
        style={{
          color: theme.muted,
          fontSize: "13px",
          lineHeight: 1.6,
          marginBottom: "16px",
          borderBottom: `1px solid ${theme.border}`,
          paddingBottom: "16px",
        }}
      >
        {desc}
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {features.map((feature, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "flex-start",
              color: theme.text,
              fontSize: "13px",
              lineHeight: 1.6,
              marginBottom: "6px",
            }}
          >
            <span style={{ color: theme.accent, marginTop: "2px", flexShrink: 0 }}>→</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Row({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "12px 0",
        borderBottom: `1px solid ${theme.border}`,
      }}
    >
      <div>
        <div style={{ color: theme.text, fontSize: "14px", fontWeight: 500 }}>{label}</div>
        {note && <div style={{ color: theme.muted, fontSize: "12px", marginTop: "2px" }}>{note}</div>}
      </div>
      <div
        style={{
          color: theme.accent,
          fontSize: "14px",
          fontWeight: 700,
          fontFamily: "'Barlow Condensed', sans-serif",
          textAlign: "right",
          flexShrink: 0,
          marginLeft: "24px",
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default function PitchSheetPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const tabs = ["overview", "product", "pricing", "delivery", "notes"];

  return (
    <div style={{ background: theme.bg, minHeight: "100vh", color: theme.text, fontFamily: "'Inter', sans-serif", padding: "0" }}>
      <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />

      <div style={{ background: theme.surface, borderBottom: `1px solid ${theme.border}`, padding: "24px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
            <div style={{ width: "8px", height: "8px", background: theme.accent, borderRadius: "50%" }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: theme.muted }}>
              The Kemis Group of Companies — Internal Document
            </span>
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "32px", fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase", margin: 0, color: theme.text }}>
            Verity<span style={{ color: theme.accent }}>OS</span> Managed
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 400, color: theme.muted, marginLeft: "12px", letterSpacing: 0, textTransform: "none" }}>
              AI Infrastructure-as-a-Service
            </span>
          </h1>
        </div>
        <div style={{ textAlign: "right" }}>
          <Tag color="orange">Draft v0.1</Tag>
          <div style={{ color: theme.muted, fontSize: "11px", marginTop: "6px" }}>March 2026 · Internal Review</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "2px", padding: "16px 40px 0", borderBottom: `1px solid ${theme.border}` }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: activeTab === tab ? theme.surface : "transparent",
              border: `1px solid ${activeTab === tab ? theme.border : "transparent"}`,
              borderBottom: activeTab === tab ? `1px solid ${theme.surface}` : "1px solid transparent",
              borderRadius: "6px 6px 0 0",
              color: activeTab === tab ? theme.accent : theme.muted,
              padding: "8px 18px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              textTransform: "capitalize",
              letterSpacing: "0.04em",
              marginBottom: "-1px",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ padding: "32px 40px", maxWidth: "960px" }}>
        {activeTab === "overview" && (
          <>
            <Section title="What Is This?" label="Product Definition" labelColor="blue">
              <p style={{ color: theme.muted, fontSize: "16px", lineHeight: 1.8, margin: "0 0 16px" }}>
                <strong style={{ color: theme.text }}>VerityOS Managed</strong> is a white-labeled, containerized AI knowledge and operations platform deployed directly onto a client&apos;s own infrastructure. It gives organizations a secure, private AI interface to store, organize, query, and retrieve institutional knowledge — without any data leaving their premises.
              </p>
              <p style={{ color: theme.muted, fontSize: "16px", lineHeight: 1.8, margin: 0 }}>
                It is sold and maintained as a <strong style={{ color: theme.text }}>managed service</strong> by The Kemis Group. KGC handles deployment, data organization, model management, and ongoing maintenance under a monthly contract. The client gets outcomes — organized, accessible intelligence — not a software license.
              </p>
            </Section>

            <Section title="The Problem It Solves" label="Market Pain" labelColor="purple">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {[
                  ["Information Silos", "Departments have data in emails, files, drives, spreadsheets — none of it connected or queryable."],
                  ["No Institutional Memory", "When staff leave or rotate, knowledge walks out the door. There's no system to retain it."],
                  ["AI Fear & Confusion", "Leadership knows AI matters but doesn't know where to start. Vendor solutions are expensive and complex."],
                  ["Data Sovereignty Concerns", "Government and regulated industries can't send data to third-party cloud AI providers."],
                ].map(([title, desc]) => (
                  <div key={title} style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: "6px", padding: "16px" }}>
                    <div style={{ color: theme.text, fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>{title}</div>
                    <div style={{ color: theme.muted, fontSize: "13px", lineHeight: 1.6 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="The Solution" label="Value Proposition" labelColor="orange">
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  ["Private AI Chat Interface", "Staff interact with their own data through a clean, familiar chat UI — no training required."],
                  ["Local or API Model Flexibility", "Deploy a local LLM (zero data egress) or connect to a cloud API (OpenAI, Anthropic) — client chooses."],
                  ["Organized Knowledge Base", "KGC structures and uploads documents, SOPs, policies, and records into the system as part of the service."],
                  ["Ongoing Managed Maintenance", "We keep the system updated, data organized, and models tuned. Monthly contract. No IT burden on client."],
                  ["On-Premises / On-Network Deployment", "Runs inside a Docker container on the client's own server or network hardware. Full control."],
                ].map(([title, desc]) => (
                  <div key={title} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ width: "6px", height: "6px", background: theme.accent, borderRadius: "50%", marginTop: "6px", flexShrink: 0 }} />
                    <div>
                      <span style={{ color: theme.text, fontSize: "14px", fontWeight: 600 }}>{title}: </span>
                      <span style={{ color: theme.muted, fontSize: "14px" }}>{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </>
        )}

        {activeTab === "product" && (
          <>
            <Section title="What's Under the Hood" label="Technical Stack" labelColor="blue">
              <p style={{ color: theme.muted, fontSize: "15px", lineHeight: 1.7, marginBottom: "20px" }}>
                Internal reference only. Client-facing materials will use VerityOS Managed branding exclusively.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[
                  ["Container Runtime", "Docker / Docker Compose", "Portable, isolated deployment on any Linux server or NAS"],
                  ["Chat Interface", "Open WebUI (white-labeled)", "Modern, ChatGPT-style UI supporting multi-user, document upload, conversation history"],
                  ["Local Model Runtime", "Ollama", "Run LLaMA 3, Mistral, Phi-3, or similar on local hardware"],
                  ["Cloud API Option", "OpenAI / Anthropic API", "Pass-through configuration — client pays API costs directly or via KGC markup"],
                  ["Document Ingestion", "Open WebUI RAG pipeline", "Upload PDFs, DOCX, text — chunked, embedded, queryable"],
                  ["Authentication", "Open WebUI built-in / LDAP optional", "User accounts, roles, admin panel included"],
                ].map(([label, tech, note]) => (
                  <div key={label} style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: "6px", padding: "14px" }}>
                    <div style={{ color: theme.muted, fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>{label}</div>
                    <div style={{ color: theme.accent, fontSize: "14px", fontWeight: 600, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.03em", marginBottom: "4px" }}>{tech}</div>
                    <div style={{ color: theme.muted, fontSize: "12px", lineHeight: 1.5 }}>{note}</div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Model Options" label="AI Engine" labelColor="orange">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: "6px", padding: "20px" }}>
                  <Tag color="blue">Option A — Local Model</Tag>
                  <div style={{ color: theme.text, fontSize: "15px", fontWeight: 600, margin: "10px 0 6px" }}>Zero Data Egress</div>
                  <div style={{ color: theme.muted, fontSize: "13px", lineHeight: 1.6, marginBottom: "12px" }}>
                    AI model runs entirely on-premises. No internet required for inference. Ideal for government, legal, healthcare, or sensitive data environments.
                  </div>
                  <div style={{ color: theme.muted, fontSize: "12px" }}>Recommended models: LLaMA 3.1 8B, Mistral 7B, Phi-3 Medium</div>
                  <div style={{ marginTop: "10px" }}>
                    <Tag color="orange">Best for gov&apos;t clients</Tag>
                  </div>
                </div>
                <div style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: "6px", padding: "20px" }}>
                  <Tag color="purple">Option B — Cloud API</Tag>
                  <div style={{ color: theme.text, fontSize: "15px", fontWeight: 600, margin: "10px 0 6px" }}>Premium Intelligence</div>
                  <div style={{ color: theme.muted, fontSize: "13px", lineHeight: 1.6, marginBottom: "12px" }}>
                    Connect to OpenAI GPT-4o or Anthropic Claude for top-tier responses. Data sent to cloud provider per query. Client must approve and sign data handling acknowledgment.
                  </div>
                  <div style={{ color: theme.muted, fontSize: "12px" }}>API costs billed separately — at cost + 15% KGC margin</div>
                </div>
              </div>
            </Section>

            <Section title="What KGC Delivers (Scope of Service)" label="Deliverables" labelColor="purple">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  ["Phase 1 — Setup", "Server assessment & Docker environment configuration, Open WebUI deployment & white-label branding (VerityOS Managed), Model installation and configuration, User account setup (admin + staff roles)"],
                  ["Phase 2 — Data Onboarding", "Collection and review of client documents (SOPs, policies, reports, templates), Structuring and uploading into knowledge base, Testing query accuracy and relevance tuning"],
                  ["Phase 3 — Ongoing Managed Service", "Monthly document updates and additions, Model updates as new versions release, System health monitoring, User support (email/WhatsApp), Quarterly knowledge base reviews"],
                ].map(([phase, items]) => (
                  <div key={phase} style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: "6px", padding: "16px" }}>
                    <div style={{ color: theme.text, fontSize: "13px", fontWeight: 700, marginBottom: "8px" }}>{phase}</div>
                    <ul style={{ margin: 0, paddingLeft: "16px" }}>
                      {items.split(", ").map((item, index) => (
                        <li key={index} style={{ color: theme.muted, fontSize: "13px", lineHeight: 1.7 }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>
          </>
        )}

        {activeTab === "pricing" && (
          <>
            <Section title="Setup & Deployment Fee" label="One-Time" labelColor="orange">
              <p style={{ color: theme.muted, fontSize: "15px", marginBottom: "20px" }}>
                Charged upon contract signing, before deployment begins. Covers all Phase 1 and Phase 2 work.
              </p>
              <div style={{ display: "flex", gap: "16px" }}>
                <PricingCard
                  name="Standard"
                  price="$4,500"
                  desc="1 department, up to 500 documents, single server deployment. Local model only."
                  features={[
                    "Server setup & Docker config",
                    "Open WebUI deployment + branding",
                    "Local model install (LLaMA 3 or Mistral)",
                    "Up to 500 documents ingested",
                    "Up to 10 user accounts",
                    "Basic admin training (2hr session)",
                  ]}
                />
                <PricingCard
                  name="Professional"
                  price="$7,500"
                  desc="Up to 5 departments, up to 2,000 documents, multi-user roles, local + cloud API option."
                  highlight
                  features={[
                    "Everything in Standard",
                    "Multi-department knowledge base",
                    "Up to 2,000 documents ingested",
                    "Up to 50 user accounts",
                    "Cloud API configuration (if selected)",
                    "Custom intake workflow for new documents",
                    "Full day staff onboarding session",
                  ]}
                />
                <PricingCard
                  name="Enterprise"
                  price="Custom"
                  desc="Large orgs, multi-location, sensitive data environments, custom integrations."
                  features={[
                    "Everything in Professional",
                    "Multi-server or network deployment",
                    "LDAP/SSO integration",
                    "Custom branding & domain",
                    "Dedicated onboarding manager",
                    "SLA-backed response times",
                    "Scope defined per engagement",
                  ]}
                />
              </div>
            </Section>

            <Section title="Monthly Managed Services" label="Recurring" labelColor="blue">
              <p style={{ color: theme.muted, fontSize: "15px", marginBottom: "20px" }}>
                Annual contract (12 months minimum). Billed quarterly — Q1 payment due at contract signing, Q2–Q4 invoiced 30 days before each quarter. Rationale: 90 days to deploy and stabilize, 90 days to tune — by month 6 the value is proven and renewal is natural.
              </p>
              <div style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: "6px", padding: "0 20px" }}>
                <Row label="Standard Managed Services" value="$350 / mo" note="Up to 50 doc updates/mo, email support, model updates, system monitoring" />
                <Row label="Professional Managed Services" value="$650 / mo" note="Up to 200 doc updates/mo, WhatsApp priority support, quarterly review calls, usage reporting" />
                <Row label="Enterprise Managed Services" value="From $1,200 / mo" note="Unlimited updates, dedicated support, SLA, custom integrations, monthly review" />
                <Row label="API Cost Pass-Through (if cloud model selected)" value="Cost + 15%" note="OpenAI / Anthropic API usage billed at cost + 15% KGC margin. Invoiced monthly on actuals." />
              </div>
            </Section>

            <Section title="Potential Add-Ons" label="Upsell" labelColor="purple">
              <div style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: "6px", padding: "0 20px" }}>
                <Row label="Additional Document Ingestion Block" value="$150" note="Per 500 documents, outside monthly plan allowance" />
                <Row label="Custom Workflow Automation" value="From $800" note="Building automated pipelines to push documents into the system (e.g. from email, forms)" />
                <Row label="Additional User Training Session" value="$250" note="Half-day, on-site or virtual" />
                <Row label="Emergency / Priority Support" value="$200 / incident" note="Outside business hours or contracted SLA" />
                <Row label="Hardware Sourcing & Config" value="Cost + 20%" note="If client needs server/mini-PC procured and configured for deployment" />
              </div>
            </Section>

            <Section title="Illustrative First-Year Contract Value" label="Revenue Model" labelColor="orange">
              <div style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: "6px", padding: "0 20px" }}>
                <Row label="Setup Fee (Professional)" value="$7,500" />
                <Row label="Monthly Managed Services × 12" value="$7,800" note="$650/mo × 12 months" />
                <Row label="API Pass-Through (est.)" value="~$600" note="Estimated $500/mo API cost + 15% = ~$575. Varies." />
                <Row label="Est. Year 1 Total (per client)" value="~$15,900" />
              </div>
              <p style={{ color: theme.muted, fontSize: "14px", marginTop: "12px", fontStyle: "italic" }}>
                At 3 Professional clients: ~$47,700 Year 1 revenue. At 5 clients: ~$79,500. Government contracts may command higher setup fees given procurement complexity.
              </p>
            </Section>
          </>
        )}

        {activeTab === "delivery" && (
          <>
            <Section title="Deployment Timeline" label="Execution" labelColor="blue">
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {[
                  ["Week 1", "Contract signed. Initial payment received. Server/hardware assessment. Access credentials collected."],
                  ["Week 2", "Docker environment deployed. Open WebUI installed and branded. Model configured. Admin accounts live."],
                  ["Weeks 3–4", "Document collection with client. Ingestion, testing, and relevance tuning. Internal QA pass."],
                  ["Week 5", "Staff onboarding session. System handed over to client. Go-live."],
                  ["Month 2+", "Managed services engagement begins. Monthly billing active."],
                ].map(([label, value], index, arr) => (
                  <div key={label} style={{ display: "flex", gap: "16px", padding: "14px 0", borderBottom: index < arr.length - 1 ? `1px solid ${theme.border}` : "none" }}>
                    <div style={{ width: "72px", flexShrink: 0, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "13px", color: theme.accent, paddingTop: "2px" }}>{label}</div>
                    <div style={{ color: theme.muted, fontSize: "13px", lineHeight: 1.6 }}>{value}</div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Hardware Requirements" label="Client Responsibility" labelColor="orange">
              <p style={{ color: theme.muted, fontSize: "15px", lineHeight: 1.7, marginBottom: "16px" }}>
                Client is responsible for providing suitable hardware or server access. KGC can assist with sourcing at cost + 20% margin.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: "6px", padding: "16px" }}>
                  <div style={{ color: theme.text, fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>Minimum (Local Model)</div>
                  <ul style={{ margin: 0, paddingLeft: "16px" }}>
                    {["8-core CPU (AMD Ryzen 7 / Intel i7+)", "32GB RAM", "500GB SSD storage", "Ubuntu 22.04 LTS or Debian 12", "Network access for initial setup"].map((item) => (
                      <li key={item} style={{ color: theme.muted, fontSize: "13px", lineHeight: 1.7 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: "6px", padding: "16px" }}>
                  <div style={{ color: theme.text, fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>Recommended (Local Model)</div>
                  <ul style={{ margin: 0, paddingLeft: "16px" }}>
                    {["NVIDIA GPU (RTX 3060+) for faster inference", "64GB RAM", "1TB NVMe SSD", "Dedicated server or mini-PC (e.g. ASUS PN64)", "UPS battery backup"].map((item) => (
                      <li key={item} style={{ color: theme.muted, fontSize: "13px", lineHeight: 1.7 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>

            <Section title="Target Client Profile" label="Who We Sell To" labelColor="purple">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                {[
                  ["Government Departments", "Disaster management, public health, immigration, customs, police — any dept with large document/SOP libraries"],
                  ["Regulated Industries", "Law firms, accounting firms, insurance companies — high sensitivity, no cloud AI appetite"],
                  ["Mid-Size Enterprises", "Construction firms, hospitality groups, retail chains — team knowledge management at scale"],
                ].map(([title, desc]) => (
                  <div key={title} style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: "6px", padding: "16px" }}>
                    <div style={{ color: theme.text, fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>{title}</div>
                    <div style={{ color: theme.muted, fontSize: "12px", lineHeight: 1.6 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </Section>
          </>
        )}

        {activeTab === "notes" && (
          <>
            <Section title="Decisions Made" label="Locked In ✓" labelColor="blue">
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  {
                    title: "Pricing",
                    status: "✓ Keep current pricing",
                    detail:
                      "Setup fees are appropriate for this market — this work is new and the price point is already less than a website build. No premium uplift for government at this stage. Revisit after first delivery.",
                  },
                  {
                    title: "Contract Structure",
                    status: "✓ 12-month annual contract, quarterly payments",
                    detail:
                      "Rationale: First 90 days to get things right, next 90 days to tune — by then the relationship is proven and renewal is natural. Quarterly billing keeps it digestible for clients while protecting KGC revenue predictability. No 6-month option.",
                  },
                  {
                    title: "Hardware Strategy",
                    status: "✓ Client's bill — KGC provides spec list, can procure on request",
                    detail:
                      "We provide a required hardware specification list as part of onboarding. Hardware is the client's responsibility and cost. However, KGC can procure and configure hardware on their behalf — charged at cost + 20% margin. Not included in setup fee.",
                  },
                  {
                    title: "Branding",
                    status: "✓ KGC brand — no white-labeling",
                    detail:
                      "This is a KGC product all the way. The interface carries KGC / VerityOS Managed branding. No white-labeling offered. The brand builds with every deployment.",
                  },
                  {
                    title: "Government Procurement Path",
                    status: "✓ Informal pitch — direct to #2 in department",
                    detail:
                      "Current contact is second to the department head. No formal RFP process required at this stage. Proceed with an informal pitch conversation, not a procurement document. Keep it light and conversational.",
                  },
                  {
                    title: "Data Handling Agreement",
                    status: "✓ Not required this round",
                    detail:
                      "DPA will be needed eventually — LawBey is the likely vehicle for drafting. Defer for now. Flag for second client engagement or if government contact raises it.",
                  },
                  {
                    title: "Capacity & Growth Strategy",
                    status: "✓ Max 2 clients. Revenue funds VerityOS Lite.",
                    detail:
                      "If NEMA closes, target one more client max. Use the managed services revenue to fast-track VerityOS Lite development and acquire proper hosting hardware. This product is the funding mechanism — not the end game. Stay focused.",
                  },
                  {
                    title: "First Delivery QA — Acceptance Criteria",
                    status: "✓ Defined",
                    detail:
                      "Go-live is confirmed when: the client is actively using the chat interface and uploading their own documents into the RAG pipeline independently. The engine handles ingestion and retrieval. KGC tunes prompts and guardrails at launch, then reviews logs monthly (with permission) under the confidentiality agreement signed at contract execution. 'Done' = client self-sufficient on uploads. 'Tuning' = everything after that.",
                  },
                  {
                    title: "Quarterly Payment Contract Language",
                    status: "✓ Deferred — to be shared",
                    detail:
                      "Contract language for annual agreement with Q1 payment at signing, Q2–Q4 invoiced 30 days before each quarter. Kenneth to share draft for review. No legal blocker at this stage.",
                  },
                  {
                    title: "Hardware Spec Sheet",
                    status: "✓ Covered by Tech Spec section",
                    detail:
                      "The existing Tech Spec section in this document covers minimum and recommended hardware configs. No separate spec sheet needed before client conversations. Revisit after first site visit to confirm environment requirements.",
                  },
                ].map(({ title, status, detail }) => (
                  <div key={title} style={{ background: theme.bg, border: `1px solid ${theme.border}`, borderLeft: `3px solid ${theme.accentBlue}`, borderRadius: "0 6px 6px 0", padding: "14px 16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                      <div style={{ color: theme.text, fontSize: "13px", fontWeight: 700 }}>{title}</div>
                      <Tag color="blue">{status}</Tag>
                    </div>
                    <div style={{ color: theme.muted, fontSize: "13px", lineHeight: 1.6 }}>{detail}</div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Positioning & Messaging Notes" label="Strategic" labelColor="purple">
              <div style={{ color: theme.muted, fontSize: "14px", lineHeight: 1.8 }}>
                <p>
                  <strong style={{ color: theme.text }}>Lead with data sovereignty.</strong> &quot;Your data never leaves your building&quot; is the single most powerful sentence in the government sale. Use it first, always.
                </p>
                <p>
                  <strong style={{ color: theme.text }}>Never mention Open WebUI or Ollama to clients.</strong> This is a KGC-built platform. Clients are buying outcomes and ongoing service, not a software license.
                </p>
                <p>
                  <strong style={{ color: theme.text }}>Frame KGC as the infrastructure layer for Bahamian institutions.</strong> Two years of building, and now the country is ready. This is the moment.
                </p>
                <p>
                  <strong style={{ color: theme.text }}>This is a bridge product with a ceiling.</strong> Max 2 clients by design. Revenue goes directly into VerityOS Lite development and hardware. Managed services clients become the first upgrade accounts when the full platform ships.
                </p>
                <p style={{ margin: 0 }}>
                  <strong style={{ color: theme.text }}>The pitch to NEMA is simple:</strong> &quot;Your information, organized, accessible, private. We set it up, we maintain it, you just use it.&quot;
                </p>
              </div>
            </Section>
          </>
        )}
      </div>
    </div>
  );
}
