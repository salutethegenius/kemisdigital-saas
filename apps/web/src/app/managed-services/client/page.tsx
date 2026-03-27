"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const ORANGE = "#f97316";
const DARK = "#0f1115";
const CHARCOAL = "#1c1f26";
const CREAM = "#faf8f4";
const WARM = "#f0ece4";
const MUTED = "#7a7060";
const TEXT = "#1c1f26";

const useInView = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold },
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible] as const;
};

function Reveal({
  children,
  delay = 0,
  style = {},
}: {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
}) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "0 0 48px" }}>
      <div style={{ width: "32px", height: "2px", background: ORANGE }} />
      <div style={{ flex: 1, height: "1px", background: "#e0d8cc" }} />
    </div>
  );
}

function PillarCard({
  icon,
  title,
  body,
  delay,
}: {
  icon: string;
  title: string;
  body: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div
        style={{
          background: "#fff",
          border: "1px solid #e8e2d8",
          borderTop: `3px solid ${ORANGE}`,
          borderRadius: "4px",
          padding: "28px 24px",
          height: "100%",
        }}
      >
        <div style={{ fontSize: "28px", marginBottom: "12px" }}>{icon}</div>
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "18px",
            letterSpacing: "0.08em",
            color: TEXT,
            marginBottom: "10px",
          }}
        >
          {title}
        </div>
        <div style={{ color: MUTED, fontSize: "14px", lineHeight: 1.75 }}>{body}</div>
      </div>
    </Reveal>
  );
}

function PricingTier({
  name,
  setup,
  monthly,
  tag,
  features,
  highlighted,
}: {
  name: string;
  setup: string;
  monthly: string;
  tag?: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <div
      style={{
        background: highlighted ? DARK : "#fff",
        border: `1px solid ${highlighted ? ORANGE : "#e8e2d8"}`,
        borderRadius: "4px",
        padding: "32px 28px",
        flex: 1,
        position: "relative",
      }}
    >
      {highlighted && (
        <div
          style={{
            position: "absolute",
            top: "-13px",
            left: "50%",
            transform: "translateX(-50%)",
            background: ORANGE,
            color: "#fff",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            padding: "3px 14px",
            borderRadius: "2px",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          Most Popular
        </div>
      )}
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "13px",
          letterSpacing: "0.2em",
          color: highlighted ? "#aaa" : MUTED,
          marginBottom: "8px",
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "42px",
          letterSpacing: "0.02em",
          color: highlighted ? ORANGE : TEXT,
          lineHeight: 1,
        }}
      >
        {setup}
      </div>
      <div style={{ color: highlighted ? "#888" : MUTED, fontSize: "12px", marginBottom: "4px" }}>
        one-time setup
      </div>
      <div style={{ color: highlighted ? "#ccc" : TEXT, fontSize: "14px", fontWeight: 600, margin: "16px 0 4px" }}>
        {monthly}{" "}
        <span style={{ fontWeight: 400, color: highlighted ? "#888" : MUTED, fontSize: "13px" }}>
          / mo managed services
        </span>
      </div>
      {tag && (
        <div style={{ color: highlighted ? "#888" : MUTED, fontSize: "12px", marginBottom: "20px", fontStyle: "italic" }}>
          {tag}
        </div>
      )}
      <div style={{ height: "1px", background: highlighted ? "#2a2d35" : "#e8e2d8", margin: "20px 0" }} />
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {features.map((feature, index) => (
          <li key={index} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "10px" }}>
            <span style={{ color: ORANGE, fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>→</span>
            <span style={{ color: highlighted ? "#ccc" : MUTED, fontSize: "13px", lineHeight: 1.6 }}>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepItem({
  number,
  title,
  body,
  delay,
}: {
  number: string;
  title: string;
  body: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
        <div
          style={{
            width: "48px",
            height: "48px",
            background: ORANGE,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "22px",
            color: "#fff",
            letterSpacing: "0.05em",
          }}
        >
          {number}
        </div>
        <div>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "18px",
              letterSpacing: "0.06em",
              color: TEXT,
              marginBottom: "6px",
            }}
          >
            {title}
          </div>
          <div style={{ color: MUTED, fontSize: "14px", lineHeight: 1.75 }}>{body}</div>
        </div>
      </div>
    </Reveal>
  );
}

export default function ClientDocPage() {
  return (
    <div style={{ background: CREAM, minHeight: "100vh", color: TEXT, fontFamily: "'Lora', Georgia, serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />

      <div style={{ background: DARK, position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)",
          }}
        />

        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 48px 56px", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "56px" }}>
            <div style={{ width: "10px", height: "10px", background: ORANGE, borderRadius: "50%" }} />
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "16px", letterSpacing: "0.2em", color: "#888" }}>
              THE KEMIS GROUP OF COMPANIES
            </span>
          </div>

          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "20px", flexWrap: "wrap" }}>
            <div
              style={{
                background: "rgba(249,115,22,0.15)",
                border: "1px solid rgba(249,115,22,0.3)",
                borderRadius: "2px",
                padding: "3px 10px",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.2em",
                color: ORANGE,
              }}
            >
              KGC INFRASTRUCTURE SERVICES
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "2px",
                padding: "3px 10px",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.15em",
                color: "#888",
              }}
            >
              CURRENTLY BEING DEPLOYED WITH SELECT ORGANIZATIONS ACROSS THE BAHAMAS
            </div>
          </div>

          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(52px, 8vw, 88px)",
              letterSpacing: "0.04em",
              lineHeight: 0.95,
              margin: "0 0 24px",
              color: "#fff",
            }}
          >
            VERITY<span style={{ color: ORANGE }}>OS</span>
            <br />
            <span style={{ color: "#555", fontSize: "0.62em" }}>MANAGED</span>
          </h1>

          <p style={{ color: "#aaa", fontSize: "17px", lineHeight: 1.75, maxWidth: "560px", fontStyle: "italic", margin: "0 0 40px" }}>
            Private AI infrastructure for organizations that can&apos;t afford to lose their knowledge - or let it leave the building.
          </p>

          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            {[
              ["On-Premises", "Your data. Your server. Always."],
              ["Fully Managed", "We run it. You use it."],
              ["AI-Powered", "Ask. Get answers. Instantly."],
            ].map(([title, desc]) => (
              <div key={title}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "13px", letterSpacing: "0.15em", color: ORANGE }}>{title}</div>
                <div style={{ color: "#666", fontSize: "12px" }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: ORANGE }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px 48px", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "6px", height: "6px", background: "#fff", borderRadius: "50%", flexShrink: 0 }} />
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "17px", letterSpacing: "0.08em", color: "#fff", margin: 0 }}>
            EVERYTHING RUNS ON YOUR HARDWARE. YOUR DATA NEVER LEAVES YOUR BUILDING. NOT TODAY, NOT EVER.
          </p>
        </div>
      </div>

      <div style={{ background: WARM, borderBottom: "1px solid #e0d8cc" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "64px 48px" }}>
          <Reveal>
            <div style={{ maxWidth: "680px" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "11px", letterSpacing: "0.25em", color: ORANGE, marginBottom: "16px" }}>THE CHALLENGE</div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", letterSpacing: "0.04em", color: TEXT, lineHeight: 1.1, margin: "0 0 20px" }}>
                YOUR ORGANIZATION KNOWS MORE THAN IT CAN ACCESS
              </h2>
              <p style={{ color: MUTED, fontSize: "16px", lineHeight: 1.85, margin: 0 }}>
                Years of reports, procedures, policies, and institutional knowledge - scattered across drives, inboxes, and the memories of staff who may not always be there. When you need an answer fast, you spend hours searching. When people leave, knowledge leaves with them. And when someone suggests using AI to fix it, the first question is always: <em>where does our data go?</em>
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "72px 48px 0" }}>
        <Reveal>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "11px", letterSpacing: "0.25em", color: ORANGE, marginBottom: "12px" }}>WHAT IT IS</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", letterSpacing: "0.04em", color: TEXT, margin: "0 0 20px" }}>
            AN AI BRAIN. BUILT FOR YOUR ORGANIZATION. HOUSED ON YOUR PREMISES.
          </h2>
          <p style={{ color: MUTED, fontSize: "16px", lineHeight: 1.85, maxWidth: "680px", margin: "0 0 48px" }}>
            VerityOS Managed is a fully private, AI-powered knowledge platform deployed directly on your organization&apos;s own hardware. Staff can ask questions in plain language and receive accurate answers drawn from your own documents, procedures, and records - instantly, securely, and without any data leaving your network.
          </p>
        </Reveal>
        <Divider />

        <Reveal>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "11px", letterSpacing: "0.25em", color: ORANGE, marginBottom: "32px" }}>CORE CAPABILITIES</div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "72px" }}>
          <PillarCard delay={0} icon="🔒" title="Total Data Privacy" body="Your documents, queries, and responses never leave your server. No third-party cloud. No data sharing. Full sovereignty over your institutional knowledge." />
          <PillarCard delay={0.1} icon="💬" title="Natural Language Access" body="Staff ask questions in plain English and receive accurate, sourced answers from your own documents. No training required - if they can use a chat app, they can use this." />
          <PillarCard delay={0.2} icon="📂" title="Your Documents, Always Ready" body="Upload new documents anytime and ask questions immediately. SOPs, reports, policies, meeting notes - everything your organization has ever written down, instantly findable by anyone on your team." />
          <PillarCard delay={0.3} icon="🛠️" title="Fully Managed by KGC" body="We handle setup, maintenance, updates, and monthly tuning. Your IT team doesn't need to touch it. You pay for outcomes, not overhead." />
        </div>

        <Reveal>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "11px", letterSpacing: "0.25em", color: ORANGE, marginBottom: "12px" }}>HOW IT WORKS</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", letterSpacing: "0.04em", color: TEXT, margin: "0 0 40px" }}>
            THREE STEPS TO A FULLY OPERATIONAL SYSTEM
          </h2>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginBottom: "72px" }}>
          <StepItem delay={0} number="1" title="We Deploy & Load Your Knowledge" body="We install the platform on your hardware, configure it for your team, and load your existing documents - reports, policies, SOPs, records - into the system. Nothing leaves your building." />
          <StepItem delay={0.1} number="2" title="Your Team Goes Live" body="Staff are trained and the system is live. They ask questions in plain language and get accurate answers from your own documents. If they can use WhatsApp, they can use this." />
          <StepItem delay={0.2} number="3" title="We Manage It Every Month" body="KGC reviews performance, tunes the AI responses, adds new documents, and keeps everything current. You focus on your work. We keep the system sharp." />
        </div>
      </div>

      <div style={{ background: CHARCOAL }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "72px 48px" }}>
          <Reveal>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "11px", letterSpacing: "0.25em", color: ORANGE, marginBottom: "12px" }}>INVESTMENT</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", letterSpacing: "0.04em", color: "#fff", margin: "0 0 12px" }}>
              STRAIGHTFORWARD PRICING. NO SURPRISES.
            </h2>
            <p style={{ color: "#888", fontSize: "15px", lineHeight: 1.75, maxWidth: "580px", marginBottom: "24px" }}>
              A one-time setup fee to deploy and onboard your organization, then a monthly managed services fee. Annual contract billed quarterly - aligned to how long it takes to truly optimize the system.
            </p>
            <div style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.25)", borderRadius: "4px", padding: "16px 20px", display: "inline-block", marginBottom: "36px" }}>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontStyle: "italic", color: "#ccc", fontSize: "15px", lineHeight: 1.7, margin: 0 }}>
                &quot;Less than the cost of hiring one junior staff member - with AI capability for your entire organization.&quot;
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
              <PricingTier
                name="Standard"
                setup="$4,500"
                monthly="$350"
                tag="1 department · up to 500 documents"
                features={[
                  "Single department deployment",
                  "Up to 500 documents ingested",
                  "Up to 10 staff user accounts",
                  "Local AI model - zero data egress",
                  "Admin training session included",
                  "Monthly managed maintenance",
                ]}
              />
              <PricingTier
                name="Professional"
                setup="$7,500"
                monthly="$650"
                tag="Up to 5 departments · up to 2,000 docs"
                highlighted
                features={[
                  "Multi-department deployment",
                  "Up to 2,000 documents ingested",
                  "Up to 50 staff user accounts",
                  "Local AI model or cloud API - your choice",
                  "Custom document intake workflow",
                  "Full-day staff onboarding session",
                  "Monthly log review & AI tuning",
                  "Priority WhatsApp support",
                ]}
              />
              <PricingTier
                name="Enterprise"
                setup="Custom"
                monthly="From $1,200"
                tag="Large organizations · custom scope"
                features={[
                  "Multi-location or multi-server",
                  "Unlimited documents & users",
                  "SSO / directory integration",
                  "Custom branding & domain",
                  "Dedicated onboarding manager",
                  "SLA-backed response times",
                  "Quarterly executive review",
                ]}
              />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: "4px", padding: "20px 24px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <span style={{ color: ORANGE, fontSize: "20px", flexShrink: 0 }}>◆</span>
              <div>
                <div style={{ color: "#fff", fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>Annual contract · quarterly billing</div>
                <div style={{ color: "#888", fontSize: "13px", lineHeight: 1.7 }}>
                  All managed services plans run on a 12-month annual agreement, billed quarterly. The first quarter is due at contract signing. This structure gives your organization time to fully onboard, tune, and realize the value of the system - with predictable costs throughout.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "72px 48px" }}>
        <Reveal>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "11px", letterSpacing: "0.25em", color: ORANGE, marginBottom: "12px" }}>WHY THE KEMIS GROUP</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", letterSpacing: "0.04em", color: TEXT, margin: "0 0 20px" }}>
            BUILT FOR THE BAHAMAS. BACKED BY OVER TWO DECADES.
          </h2>
          <p style={{ color: MUTED, fontSize: "16px", lineHeight: 1.85, maxWidth: "680px", margin: "0 0 40px" }}>
            The Kemis Group of Companies has spent over twenty years building digital infrastructure for Bahamian organizations. We understand the local environment, the procurement landscape, and what it actually takes to get technology working inside institutions here. VerityOS Managed is not an imported product - it is built, deployed, and maintained by a Bahamian team, for Bahamian institutions.
          </p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "#e0d8cc", border: "1px solid #e0d8cc", borderRadius: "4px", overflow: "hidden", marginBottom: "72px" }}>
          {[
            ["Local Presence", "Nassau-based team. On-site when needed. No remote-only vendor relationship."],
            ["Data Stays Here", "Your data lives on your hardware, in your building, in The Bahamas."],
            ["Long-Term Partner", "We don't close tickets. We maintain systems. The relationship grows with your needs."],
          ].map(([title, desc]) => (
            <Reveal key={title}>
              <div style={{ background: "#fff", padding: "28px 24px" }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "15px", letterSpacing: "0.08em", color: TEXT, marginBottom: "8px" }}>{title}</div>
                <div style={{ color: MUTED, fontSize: "13px", lineHeight: 1.7 }}>{desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Divider />

        <Reveal>
          <div style={{ display: "flex", gap: "48px", alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "280px" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "11px", letterSpacing: "0.25em", color: ORANGE, marginBottom: "12px" }}>NEXT STEP</div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "32px", letterSpacing: "0.04em", color: TEXT, margin: "0 0 16px", lineHeight: 1.1 }}>
                LET&apos;S TALK ABOUT YOUR ORGANIZATION&apos;S NEEDS
              </h2>
              <p style={{ color: MUTED, fontSize: "15px", lineHeight: 1.8, margin: "0 0 24px" }}>
                Every deployment is different. We start with a conversation - understanding your data, your team, and your goals - before recommending a plan. No pressure. No proposal fee.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  ["Email", "info@kemis.io"],
                  ["Phone / WhatsApp", "+1 (242) 000-0000"],
                  ["Web", "kemisdigital.com"],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "11px", letterSpacing: "0.15em", color: ORANGE, width: "100px" }}>{label}</div>
                    <div style={{ color: TEXT, fontSize: "14px" }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: WARM, border: "1px solid #e0d8cc", borderRadius: "4px", padding: "32px", flex: "0 0 280px" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "13px", letterSpacing: "0.12em", color: MUTED, marginBottom: "16px" }}>
                WHAT TO EXPECT
              </div>
              {[
                "30-minute discovery call",
                "Custom deployment recommendation",
                "Proposal within 5 business days",
                "No obligation. No cost.",
              ].map((step, index) => (
                <div key={index} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "10px" }}>
                  <div style={{ color: ORANGE, fontWeight: 700, flexShrink: 0 }}>→</div>
                  <div style={{ color: MUTED, fontSize: "13px", lineHeight: 1.6 }}>{step}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <div style={{ background: DARK, borderTop: "1px solid #1e2329", padding: "28px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "8px", height: "8px", background: ORANGE, borderRadius: "50%" }} />
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "14px", letterSpacing: "0.15em", color: "#555" }}>
            THE KEMIS GROUP OF COMPANIES
          </span>
        </div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "12px", letterSpacing: "0.1em", color: "#444" }}>
          NASSAU · THE BAHAMAS · KEMISDIGITAL.COM
        </div>
      </div>
    </div>
  );
}
