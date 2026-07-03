import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/site/LegalPage";

const UPDATED = "29 June 2026";

const SECTIONS: LegalSection[] = [
  {
    id: "what-are-cookies",
    title: "What are cookies?",
    body: (
      <p>
        Cookies are small text files placed on your device when you visit a
        website. They help the site work properly, remember your preferences
        and provide information about how the site is used.
      </p>
    ),
  },
  {
    id: "types",
    title: "Cookies we use",
    body: (
      <>
        <ul className="list-disc space-y-1.5 pl-5">
          <li><strong>Strictly necessary</strong> — required for the site to function, such as routing, security and remembering your cookie choices. These cannot be switched off.</li>
          <li><strong>Analytics</strong> — Google Analytics (GA4) helps us understand how visitors find and use our site so we can improve it. Data is aggregated and does not directly identify you.</li>
          <li><strong>Functional</strong> — used by features such as our chat widget and form fields to remember inputs during your visit.</li>
        </ul>
        <p>We do not use advertising or cross-site tracking cookies.</p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third-party services",
    body: (
      <p>
        Some cookies are set by third parties we use to operate the site,
        including Google (Analytics & Fonts) and our hosting provider. These
        providers have their own privacy and cookie policies, which we
        encourage you to review.
      </p>
    ),
  },
  {
    id: "manage",
    title: "Managing cookies",
    body: (
      <>
        <p>
          You can control or delete cookies through your browser settings at
          any time. Most browsers let you block cookies, delete existing
          cookies, or be warned before a cookie is stored.
        </p>
        <p>
          Useful guides: <a className="text-primary hover:underline" href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer">Chrome</a>,{" "}
          <a className="text-primary hover:underline" href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer">Safari</a>,{" "}
          <a className="text-primary hover:underline" href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noreferrer">Firefox</a>,{" "}
          <a className="text-primary hover:underline" href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noreferrer">Edge</a>.
        </p>
        <p>Blocking strictly necessary cookies may affect site functionality.</p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this Cookie Policy from time to time. The "Last updated"
        date at the top of the page reflects the most recent change.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about how we use cookies? Email us at{" "}
        <a className="text-primary hover:underline" href="mailto:contact@travellinks.uk">contact@travellinks.uk</a>.
      </p>
    ),
  },
];

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Travel Links Solution" },
      { name: "description", content: "How travellinks.uk uses cookies, what they do, and how you can manage your preferences." },
      { property: "og:title", content: "Cookie Policy — Travel Links Solution" },
      { property: "og:description", content: "Details of the cookies set by travellinks.uk and how to control them." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://travellinks.uk/cookies" },
      { property: "og:image", content: "https://travellinks.uk/__l5e/assets-v1/86d58950-39c0-4ea4-b8dd-f0dbead6bc05/travel-links-logo.png" },
      { property: "og:image:alt", content: "Travel Links Solution" },
      { name: "twitter:image", content: "https://travellinks.uk/__l5e/assets-v1/86d58950-39c0-4ea4-b8dd-f0dbead6bc05/travel-links-logo.png" },
      { property: "og:site_name", content: "Travel Links Solution" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Cookie Policy — Travel Links Solution" },
      { name: "twitter:description", content: "Details of the cookies set by travellinks.uk and how to control them." },
    ],
    links: [{ rel: "canonical", href: "https://travellinks.uk/cookies" }],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookie Policy"
      intro="A quick overview of the cookies our website uses and the choices available to you."
      updated={UPDATED}
      sections={SECTIONS}
    />
  );
}
