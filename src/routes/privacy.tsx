import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/site/LegalPage";

const UPDATED = "29 June 2026";

const SECTIONS: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          Travel Links Solution ("we", "us", "our") is a UK-based visa
          consultancy registered at 138 Milton Street, Northampton, NN2 7DE,
          United Kingdom. This Privacy Policy explains how we collect, use,
          store and share your personal information when you visit
          travellinks.uk or use our visa consultancy services.
        </p>
        <p>
          We are the "data controller" of the personal information you provide
          to us. If you have any questions about this policy, please contact us
          at <a className="text-primary hover:underline" href="mailto:contact@travellinks.uk">contact@travellinks.uk</a>.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: (
      <>
        <p>We collect the following categories of personal information:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li><strong>Contact details</strong> — your name, email, phone number and country of residence when you enquire, apply or subscribe to our newsletter.</li>
          <li><strong>Application details</strong> — passport information, travel history, employment details, financial documents and supporting paperwork required for your visa application.</li>
          <li><strong>Communications</strong> — messages you send via our contact form, WhatsApp, chat widget, email or phone, including support requests and feedback.</li>
          <li><strong>Technical data</strong> — IP address, browser type, device information, pages visited and referral source collected automatically through cookies and analytics tools.</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    body: (
      <>
        <p>We use your personal information to:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Provide visa consultancy services, prepare your application and liaise with embassies on your behalf.</li>
          <li>Respond to enquiries, send quotes and keep you updated on your application status.</li>
          <li>Send newsletters, destination updates and service announcements where you have opted in.</li>
          <li>Improve our website, services and customer experience.</li>
          <li>Comply with legal, regulatory and accounting obligations.</li>
        </ul>
      </>
    ),
  },
  {
    id: "legal-basis",
    title: "Legal basis for processing",
    body: (
      <p>
        We rely on the following legal bases under the UK GDPR: <strong>contract</strong> (to deliver
        visa services you've requested), <strong>consent</strong> (for marketing emails and
        non-essential cookies), <strong>legal obligation</strong> (for tax, accounting and anti-fraud
        records) and <strong>legitimate interests</strong> (to operate, secure and improve our
        business in a way you would reasonably expect).
      </p>
    ),
  },
  {
    id: "sharing",
    title: "Sharing your information",
    body: (
      <>
        <p>We only share your data where necessary:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li><strong>Embassies, consulates and VFS / TLS-style application centres</strong> to submit and progress your visa application.</li>
          <li><strong>Trusted service providers</strong> who help us operate our business — hosting, email, analytics, customer support and payment processing — under written data-processing terms.</li>
          <li><strong>Authorities</strong> where we are legally required to do so.</li>
        </ul>
        <p>We do not sell or rent your personal information to third parties.</p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep your data",
    body: (
      <p>
        We retain application files for as long as is necessary to deliver our
        services and to meet legal, accounting and regulatory requirements —
        typically up to 7 years after the end of our engagement. Marketing
        subscribers can unsubscribe at any time, after which we keep only a
        suppression record so you don't receive further emails.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>Under the UK GDPR you have the right to:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Access a copy of the personal data we hold about you.</li>
          <li>Ask us to correct inaccurate or incomplete data.</li>
          <li>Ask us to delete your data, subject to our legal obligations.</li>
          <li>Object to or restrict certain processing, including direct marketing.</li>
          <li>Withdraw consent at any time where we rely on consent.</li>
          <li>Lodge a complaint with the UK Information Commissioner's Office (ICO) at <a className="text-primary hover:underline" href="https://ico.org.uk" target="_blank" rel="noreferrer">ico.org.uk</a>.</li>
        </ul>
        <p>To exercise any of these rights, email us at <a className="text-primary hover:underline" href="mailto:contact@travellinks.uk">contact@travellinks.uk</a>.</p>
      </>
    ),
  },
  {
    id: "security",
    title: "How we protect your data",
    body: (
      <p>
        We use encrypted transport (HTTPS), access controls and reputable
        cloud providers to safeguard your information. While we take security
        seriously, no online transmission is 100% secure — please send
        sensitive documents only through the channels we direct you to.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. When we do, we
        will update the "Last updated" date above. Material changes will be
        highlighted on our website.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Travel Links Solution · 138 Milton Street, Northampton, NN2 7DE, United
        Kingdom · <a className="text-primary hover:underline" href="mailto:contact@travellinks.uk">contact@travellinks.uk</a> · +44 787 946 5341.
      </p>
    ),
  },
];

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Travel Links Solution" },
      { name: "description", content: "How Travel Links Solution collects, uses and protects your personal information under the UK GDPR." },
      { property: "og:title", content: "Privacy Policy — Travel Links Solution" },
      { property: "og:description", content: "Our UK GDPR-aligned privacy notice for visa consultancy clients and website visitors." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://travellinks.uk/privacy" },
      { property: "og:image", content: "https://travellinks.uk/__l5e/assets-v1/86d58950-39c0-4ea4-b8dd-f0dbead6bc05/travel-links-logo.png" },
      { property: "og:image:alt", content: "Travel Links Solution" },
      { name: "twitter:image", content: "https://travellinks.uk/__l5e/assets-v1/86d58950-39c0-4ea4-b8dd-f0dbead6bc05/travel-links-logo.png" },
      { property: "og:site_name", content: "Travel Links Solution" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Privacy Policy — Travel Links Solution" },
      { name: "twitter:description", content: "Our UK GDPR-aligned privacy notice for visa consultancy clients and website visitors." },
    ],
    links: [{ rel: "canonical", href: "https://travellinks.uk/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="This page explains what personal information we collect, why we collect it, and the rights you have over your data."
      updated={UPDATED}
      sections={SECTIONS}
    />
  );
}
