import type { Metadata } from "next";
import StackLogo from "../_components/StackLogo";

export const metadata: Metadata = {
  title: "VerityOS Managed Client",
  description:
    "Private AI infrastructure deployed on your hardware and managed by KemisDigital.",
  alternates: {
    canonical: "/managed-services/client",
  },
};

const capabilities = [
  {
    title: "Total Data Privacy",
    body: "Your documents, queries, and responses never leave your server. No third-party cloud and no data sharing.",
  },
  {
    title: "Natural Language Access",
    body: "Staff ask questions in plain English and get answers from your own documents with no special training.",
  },
  {
    title: "Instant Institutional Memory",
    body: "Policies, reports, SOPs, and records become searchable and usable in seconds.",
  },
  {
    title: "Fully Managed Service",
    body: "KemisDigital handles setup, maintenance, updates, and optimization so your team can focus on operations.",
  },
];

const steps = [
  {
    title: "Deploy and onboard",
    body: "We install VerityOS Managed on your hardware and ingest your organization's knowledge base.",
  },
  {
    title: "Go live with your team",
    body: "Your staff starts asking questions and getting reliable answers from your own institutional data.",
  },
  {
    title: "Monthly managed optimization",
    body: "We monitor quality, tune responses, update models, and keep your system sharp.",
  },
];

const tiers = [
  {
    name: "Standard",
    setup: "$4,500",
    monthly: "$350/mo",
    detail: "1 department, up to 500 docs",
  },
  {
    name: "Professional",
    setup: "$7,500",
    monthly: "$650/mo",
    detail: "Up to 5 departments, up to 2,000 docs",
  },
  {
    name: "Enterprise",
    setup: "Custom",
    monthly: "From $1,200/mo",
    detail: "Large orgs and custom scope",
  },
];

export default function ManagedServicesClientPage() {
  return (
    <main style={{ background: "#faf8f4", color: "#1c1f26" }}>
      <section
        style={{
          background: "#0f1115",
          color: "#FFFFFF",
          padding: "56px 24px",
          borderBottom: "4px solid #f97316",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 28,
            }}
          >
            <StackLogo inverted width={190} />
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#9CA3AF",
              }}
            >
              The Kemis Group of Companies
            </div>
          </div>
          <div
            style={{
              display: "inline-block",
              background: "rgba(249,115,22,0.12)",
              border: "1px solid rgba(249,115,22,0.35)",
              color: "#f97316",
              padding: "6px 12px",
              borderRadius: 4,
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            KGC Infrastructure Services
          </div>
          <h1
            style={{
              fontSize: "clamp(38px, 8vw, 68px)",
              lineHeight: 1,
              margin: "22px 0 14px",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            VerityOS Managed
          </h1>
          <p
            style={{
              maxWidth: 760,
              color: "#D1D5DB",
              lineHeight: 1.7,
              margin: 0,
              fontSize: 17,
            }}
          >
            Private AI infrastructure for organizations that cannot afford to
            lose institutional knowledge or let it leave the building.
          </p>
        </div>
      </section>

      <section style={{ background: "#f97316", color: "#fff", padding: "16px 24px" }}>
        <p
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Everything runs on your hardware. Your data never leaves your building.
        </p>
      </section>

      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "56px 24px 24px" }}>
        <p style={{ color: "#f97316", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 12 }}>
          The Challenge
        </p>
        <h2 style={{ marginTop: 8, fontSize: "clamp(28px, 5vw, 40px)" }}>
          Your organization knows more than it can access
        </h2>
        <p style={{ color: "#6b7280", lineHeight: 1.8, maxWidth: 820 }}>
          Years of reports, procedures, policies, and institutional knowledge
          are spread across drives, inboxes, and individual staff memory.
          VerityOS Managed centralizes that knowledge into a private AI system
          your team can query instantly.
        </p>
      </section>

      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 24px 48px" }}>
        <p style={{ color: "#f97316", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 12 }}>
          Core Capabilities
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
            marginTop: 16,
          }}
        >
          {capabilities.map((item) => (
            <article
              key={item.title}
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                padding: 20,
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: 10, fontSize: 18 }}>{item.title}</h3>
              <p style={{ margin: 0, color: "#6b7280", lineHeight: 1.65 }}>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "8px 24px 56px" }}>
        <p style={{ color: "#f97316", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 12 }}>
          How It Works
        </p>
        <div style={{ display: "grid", gap: 14, marginTop: 16 }}>
          {steps.map((step, index) => (
            <article
              key={step.title}
              style={{
                display: "grid",
                gridTemplateColumns: "44px 1fr",
                gap: 14,
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                padding: 18,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "#f97316",
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 700,
                }}
              >
                {index + 1}
              </div>
              <div>
                <h3 style={{ margin: "2px 0 6px" }}>{step.title}</h3>
                <p style={{ margin: 0, color: "#6b7280", lineHeight: 1.65 }}>{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={{ background: "#1c1f26", color: "#fff", padding: "56px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <p style={{ color: "#f97316", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 12 }}>
            Investment
          </p>
          <h2 style={{ marginTop: 8, fontSize: "clamp(28px, 5vw, 38px)" }}>
            Straightforward pricing. No surprises.
          </h2>
          <p style={{ color: "#9CA3AF", lineHeight: 1.8, maxWidth: 760 }}>
            One-time setup to deploy and onboard, then monthly managed services.
            Annual contract billed quarterly.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
              marginTop: 20,
            }}
          >
            {tiers.map((tier) => (
              <article
                key={tier.name}
                style={{
                  background: "#111827",
                  border: "1px solid #374151",
                  borderRadius: 8,
                  padding: 20,
                }}
              >
                <h3 style={{ marginTop: 0 }}>{tier.name}</h3>
                <p style={{ margin: "8px 0 4px", fontWeight: 700, fontSize: 24, color: "#f97316" }}>
                  {tier.setup}
                </p>
                <p style={{ margin: "0 0 8px", color: "#D1D5DB" }}>{tier.monthly}</p>
                <p style={{ margin: 0, color: "#9CA3AF", fontSize: 14 }}>{tier.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "56px 24px 70px" }}>
        <p style={{ color: "#f97316", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 12 }}>
          Next Step
        </p>
        <h2 style={{ marginTop: 8, fontSize: "clamp(26px, 4vw, 34px)" }}>
          Lets discuss your organizations needs
        </h2>
        <p style={{ color: "#6b7280", lineHeight: 1.8, maxWidth: 760 }}>
          Every deployment is different. We start with a discovery conversation
          and provide a custom recommendation and proposal.
        </p>
        <div style={{ display: "grid", gap: 8, marginTop: 14 }}>
          <p style={{ margin: 0 }}>
            <strong>Email:</strong> info@kemis.io
          </p>
          <p style={{ margin: 0 }}>
            <strong>Phone / WhatsApp:</strong> +1 (242) 000-0000
          </p>
          <p style={{ margin: 0 }}>
            <strong>Web:</strong> kemisdigital.com
          </p>
        </div>
      </section>
    </main>
  );
}
