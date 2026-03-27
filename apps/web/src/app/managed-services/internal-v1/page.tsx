"use client";

import { useMemo, useState } from "react";
import StackLogo from "../_components/StackLogo";

const theme = {
  bg: "#0a0c0f",
  surface: "#111417",
  border: "#1e2329",
  accent: "#f97316",
  text: "#e8eaed",
  muted: "#9CA3AF",
};

const tabs = ["overview", "product", "pricing", "delivery", "notes"] as const;
type TabKey = (typeof tabs)[number];

function panelStyle(active: boolean) {
  return {
    background: active ? theme.surface : "transparent",
    color: active ? theme.accent : theme.muted,
    border: `1px solid ${active ? theme.border : "transparent"}`,
    borderBottom: active ? `1px solid ${theme.surface}` : "1px solid transparent",
    borderRadius: "8px 8px 0 0",
    padding: "8px 14px",
    textTransform: "capitalize" as const,
    cursor: "pointer",
  };
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        border: `1px solid ${theme.border}`,
        background: theme.surface,
        borderRadius: 10,
        padding: 20,
        marginBottom: 16,
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: 10, fontSize: 20 }}>{title}</h2>
      {children}
    </section>
  );
}

export default function ManagedServicesInternalV1Page() {
  const [active, setActive] = useState<TabKey>("overview");

  const content = useMemo(() => {
    if (active === "overview") {
      return (
        <>
          <Section title="What is VerityOS Managed?">
            <p style={{ lineHeight: 1.8, color: theme.muted, margin: 0 }}>
              VerityOS Managed is a private AI knowledge and operations platform
              deployed directly on a clients infrastructure. KGC handles
              deployment, document organization, model operations, and monthly
              maintenance under a managed service contract.
            </p>
          </Section>
          <Section title="Problem It Solves">
            <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8, color: theme.muted }}>
              <li>Information silos across departments and file stores.</li>
              <li>Loss of institutional memory when staff changes.</li>
              <li>Need for AI without sending sensitive data to public cloud.</li>
              <li>Need for a managed service, not another software burden.</li>
            </ul>
          </Section>
        </>
      );
    }

    if (active === "product") {
      return (
        <>
          <Section title="Technical Core">
            <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8, color: theme.muted }}>
              <li>Containerized runtime with Docker on client infrastructure.</li>
              <li>Private chat interface with knowledge base retrieval.</li>
              <li>Local LLM option for zero data egress.</li>
              <li>Optional cloud API mode when approved by client.</li>
            </ul>
          </Section>
          <Section title="Service Scope">
            <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8, color: theme.muted }}>
              <li>Setup and deployment.</li>
              <li>Data ingestion and tuning.</li>
              <li>Monthly model and content maintenance.</li>
              <li>Team support and periodic optimization reviews.</li>
            </ul>
          </Section>
        </>
      );
    }

    if (active === "pricing") {
      return (
        <>
          <Section title="Commercial Structure">
            <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8, color: theme.muted }}>
              <li>Standard: $4,500 setup + $350/mo managed service.</li>
              <li>Professional: $7,500 setup + $650/mo managed service.</li>
              <li>Enterprise: custom setup + from $1,200/mo.</li>
              <li>Annual term with quarterly billing cadence.</li>
            </ul>
          </Section>
          <Section title="Add-Ons">
            <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8, color: theme.muted }}>
              <li>Additional ingestion blocks.</li>
              <li>Workflow automation and custom integration.</li>
              <li>Priority support and extra training sessions.</li>
            </ul>
          </Section>
        </>
      );
    }

    if (active === "delivery") {
      return (
        <>
          <Section title="Delivery Timeline">
            <ol style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8, color: theme.muted }}>
              <li>Week 1: Contract, environment review, access setup.</li>
              <li>Week 2: Platform deployment and model configuration.</li>
              <li>Weeks 3-4: Data onboarding, testing, and refinement.</li>
              <li>Week 5: Team onboarding and go-live.</li>
              <li>Month 2+: Managed services operations.</li>
            </ol>
          </Section>
          <Section title="Hardware Baseline">
            <p style={{ lineHeight: 1.8, color: theme.muted, margin: 0 }}>
              Minimum recommendation includes 8-core CPU, 32GB RAM, and SSD
              storage. GPU-backed options are recommended for faster local
              inference and larger workloads.
            </p>
          </Section>
        </>
      );
    }

    return (
      <>
        <Section title="Internal Decisions">
          <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8, color: theme.muted }}>
            <li>Keep current pricing structure for first deployments.</li>
            <li>Use annual contract with quarterly payments.</li>
            <li>Client owns hardware costs; KGC can source as an add-on.</li>
            <li>No white-labeling; keep KGC and VerityOS branding.</li>
          </ul>
        </Section>
        <Section title="Positioning Notes">
          <p style={{ lineHeight: 1.8, color: theme.muted, margin: 0 }}>
            Lead with data sovereignty: your data never leaves your building.
            Position KGC as the local infrastructure partner for Bahamian
            institutions and regulated organizations.
          </p>
        </Section>
      </>
    );
  }, [active]);

  return (
    <main style={{ background: theme.bg, color: theme.text, minHeight: "100vh" }}>
      <header
        style={{
          background: theme.surface,
          borderBottom: `1px solid ${theme.border}`,
          padding: "24px",
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <StackLogo inverted width={185} />
            <h1 style={{ margin: "12px 0 0", fontSize: "clamp(24px,4vw,34px)" }}>
              VerityOS Managed - Internal Pitch v1
            </h1>
          </div>
          <div style={{ color: theme.muted, fontSize: 12 }}>
            Internal document - March 2026
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "24px" }}>
        <nav
          style={{
            display: "flex",
            gap: 4,
            borderBottom: `1px solid ${theme.border}`,
            marginBottom: 18,
          }}
        >
          {tabs.map((tab) => (
            <button key={tab} style={panelStyle(active === tab)} onClick={() => setActive(tab)}>
              {tab}
            </button>
          ))}
        </nav>
        {content}
      </div>
    </main>
  );
}
