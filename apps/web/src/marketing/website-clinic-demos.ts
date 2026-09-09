/**
 * Website Clinic redesign concepts shown on /web-clinic.
 *
 * Drop replacement screenshots in place (keep filenames and 16:10 ratio):
 *   apps/web/public/web-clinic/previews/{id}.jpg
 * Recommended crop: navigation + hero + the start of the next section, 1600×1000.
 * Do not stretch or letterbox the captures.
 */

export const WEBSITE_CLINIC_DEMO_IDS = [
  "budget-pest-control",
  "castaways-resort",
  "ocean-reef",
  "betty-k",
] as const;

export type WebsiteClinicDemoId = (typeof WEBSITE_CLINIC_DEMO_IDS)[number];

export type WebsiteClinicDemo = {
  id: WebsiteClinicDemoId;
  businessName: string;
  industryLabel: string;
  description: string;
  demoUrl: string | null;
  previewImage: string;
  previewAlt: string;
  previewPosition: string;
  formIndustryValue: string;
  previewWidth: number;
  previewHeight: number;
};

export const WEBSITE_CLINIC_PREVIEW_SIZE = {
  width: 1600,
  height: 1000,
} as const;

const PREVIEW_DIR = "/web-clinic/previews";

export const WEBSITE_CLINIC_DEMOS: readonly WebsiteClinicDemo[] = [
  {
    id: "budget-pest-control",
    businessName: "Budget Pest Control",
    industryLabel: "Service businesses",
    description: "Help customers explore services and request pest treatment.",
    demoUrl: "https://demo-pest-control-sites.vercel.app/",
    previewImage: `${PREVIEW_DIR}/budget-pest-control.jpg`,
    previewAlt:
      "Budget Pest Control website concept showing service information and enquiry buttons.",
    previewPosition: "top center",
    formIndustryValue: "Service businesses",
    previewWidth: WEBSITE_CLINIC_PREVIEW_SIZE.width,
    previewHeight: WEBSITE_CLINIC_PREVIEW_SIZE.height,
  },
  {
    id: "castaways-resort",
    businessName: "Castaways Resort & Suites",
    industryLabel: "Hotels & resorts",
    description:
      "Bring rooms, amenities and stay enquiries into one clear experience.",
    demoUrl: "https://demo-castaways-website.vercel.app/",
    previewImage: `${PREVIEW_DIR}/castaways-resort.jpg`,
    previewAlt:
      "Castaways Resort & Suites website concept showing rooms, amenities and stay enquiry paths.",
    previewPosition: "top center",
    formIndustryValue: "Hotels & resorts",
    previewWidth: WEBSITE_CLINIC_PREVIEW_SIZE.width,
    previewHeight: WEBSITE_CLINIC_PREVIEW_SIZE.height,
  },
  {
    id: "ocean-reef",
    businessName: "Ocean Reef Resort & Yacht Club",
    industryLabel: "Resorts & marinas",
    description: "Connect accommodation, dockage and dining in one website.",
    demoUrl: "https://demo-ocean-reef.vercel.app/",
    previewImage: `${PREVIEW_DIR}/ocean-reef.jpg`,
    previewAlt:
      "Ocean Reef Resort & Yacht Club website concept showing accommodation, dockage and dining.",
    previewPosition: "top center",
    formIndustryValue: "Resorts & marinas",
    previewWidth: WEBSITE_CLINIC_PREVIEW_SIZE.width,
    previewHeight: WEBSITE_CLINIC_PREVIEW_SIZE.height,
  },
  {
    id: "betty-k",
    businessName: "Betty K",
    industryLabel: "Shipping & logistics",
    description:
      "Make shipping services, schedules and quote enquiries easier to navigate.",
    demoUrl: "https://demo-betty-k.vercel.app/",
    previewImage: `${PREVIEW_DIR}/betty-k.jpg`,
    previewAlt:
      "Betty K website concept showing shipping services, schedules and quote enquiries.",
    previewPosition: "top center",
    formIndustryValue: "Shipping & logistics",
    previewWidth: WEBSITE_CLINIC_PREVIEW_SIZE.width,
    previewHeight: WEBSITE_CLINIC_PREVIEW_SIZE.height,
  },
];

const HERO_FOREGROUND_ID: WebsiteClinicDemoId = "ocean-reef";
const HERO_REAR_LEFT_ID: WebsiteClinicDemoId = "budget-pest-control";
const HERO_REAR_RIGHT_ID: WebsiteClinicDemoId = "betty-k";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function demoById(id: WebsiteClinicDemoId): WebsiteClinicDemo {
  const demo = WEBSITE_CLINIC_DEMOS.find((item) => item.id === id);
  if (!demo) {
    throw new Error(`Unknown Website Clinic demo: ${id}`);
  }
  return demo;
}

const EXTERNAL_ICON = `<svg class="clinic-ext-icon" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false"><path d="M7 3H3.5A1.5 1.5 0 0 0 2 4.5v8A1.5 1.5 0 0 0 3.5 14h8A1.5 1.5 0 0 0 13 12.5V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M9 2h5v5M8 8l6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function previewImg(
  demo: WebsiteClinicDemo,
  options: {
    alt: string;
    loading: "eager" | "lazy";
    fetchPriority?: "high";
    sizes: string;
  },
): string {
  const priority = options.fetchPriority
    ? ` fetchpriority="${options.fetchPriority}"`
    : "";
  return `<img src="${escapeHtml(demo.previewImage)}" alt="${escapeHtml(options.alt)}" width="${demo.previewWidth}" height="${demo.previewHeight}" loading="${options.loading}" decoding="async"${priority} sizes="${escapeHtml(options.sizes)}" style="object-position:${escapeHtml(demo.previewPosition)}">`;
}

function browserFrame(inner: string, extraClass = ""): string {
  const cls = extraClass ? ` ${extraClass}` : "";
  return `<div class="clinic-browser${cls}">
      <div class="clinic-browser-chrome" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="clinic-browser-screen">${inner}</div>
    </div>`;
}

export function renderDemoShowcaseCard(demo: WebsiteClinicDemo): string {
  const name = escapeHtml(demo.businessName);
  const viewDemo = demo.demoUrl
    ? `<a class="btn-primary clinic-demo-view" href="${escapeHtml(demo.demoUrl)}" target="_blank" rel="noopener noreferrer" data-clinic-demo-open="${escapeHtml(demo.id)}" data-clinic-placement="gallery-card">
          View Demo${EXTERNAL_ICON}<span class="sr-only"> for ${name} (opens in a new tab)</span>
        </a>`
    : "";

  return `<article class="clinic-demo-card" data-demo-id="${escapeHtml(demo.id)}">
      <div class="clinic-demo-shot">
        ${browserFrame(
          previewImg(demo, {
            alt: demo.previewAlt,
            loading: "lazy",
            sizes: "(min-width: 768px) 42vw, 100vw",
          }),
        )}
      </div>
      <div class="clinic-demo-body">
        <p class="clinic-demo-industry">${escapeHtml(demo.industryLabel)}</p>
        <h3 class="clinic-demo-name">${name}</h3>
        <p class="clinic-demo-desc">${escapeHtml(demo.description)}</p>
        <div class="clinic-demo-actions">
          ${viewDemo}
          <a class="btn-ghost clinic-demo-build" href="#review" data-clinic-concept="${escapeHtml(demo.id)}" data-clinic-concept-label="${name}" data-clinic-placement="gallery-card">
            Build My Website<span class="sr-only"> like the ${name} concept</span>
          </a>
        </div>
      </div>
    </article>`;
}

export function renderHeroDemoPreview(): string {
  const foreground = demoById(HERO_FOREGROUND_ID);
  const rearLeft = demoById(HERO_REAR_LEFT_ID);
  const rearRight = demoById(HERO_REAR_RIGHT_ID);
  const heroSizes = "(min-width: 900px) 38vw, 100vw";

  return `<a class="clinic-hero-preview" href="#website-demos" aria-label="Explore the website demos">
      <div class="clinic-hero-stage" aria-hidden="true">
        ${browserFrame(
          previewImg(rearLeft, {
            alt: "",
            loading: "lazy",
            sizes: heroSizes,
          }),
          "clinic-browser--rear clinic-browser--left",
        )}
        ${browserFrame(
          previewImg(rearRight, {
            alt: "",
            loading: "lazy",
            sizes: heroSizes,
          }),
          "clinic-browser--rear clinic-browser--right",
        )}
        ${browserFrame(
          previewImg(foreground, {
            alt: "",
            loading: "eager",
            fetchPriority: "high",
            sizes: heroSizes,
          }),
          "clinic-browser--fore",
        )}
      </div>
    </a>`;
}

export function renderWebsiteDemosSection(): string {
  const cards = WEBSITE_CLINIC_DEMOS.map(renderDemoShowcaseCard).join("\n");
  return `<section class="clinic-section clinic-demos reveal" id="website-demos">
  <div class="clinic-section-head">
    <div class="section-label">Working website concepts</div>
    <h2 class="section-title">See what your next website could look like.</h2>
    <p class="clinic-lead">Explore four working redesign concepts built around Bahamian businesses. See how clearer information, better presentation and easier enquiries can work for your industry.</p>
  </div>
  <div class="clinic-demo-grid">
    ${cards}
  </div>
  <div class="clinic-demo-notes">
    <p>Independent redesign concepts prepared by Kemis Digital. These examples do not imply client endorsement.</p>
    <p>Website Clinic builds start at B$500. Advanced features shown in some demonstrations are optional upgrades.</p>
  </div>
  <div class="clinic-demo-close">
    <h3 class="clinic-demo-close-title">Want to see your business here?</h3>
    <a href="#review" class="btn-primary" data-clinic-gallery-cta data-clinic-placement="gallery-close">Request Your Website Clinic Review</a>
  </div>
</section>`;
}

export function clinicDemoLabel(id: string | undefined): string | undefined {
  if (!id) return undefined;
  return WEBSITE_CLINIC_DEMOS.find((demo) => demo.id === id)?.businessName;
}
