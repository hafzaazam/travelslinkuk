import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/site/LegalPage";

const UPDATED = "29 June 2026";

const SECTIONS: LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement to terms",
    body: (
      <p>
        These Terms & Conditions govern your use of the travellinks.uk website
        and the visa consultancy services provided by Travel Links Solution
        ("we", "us", "our"). By using our website or engaging our services you
        agree to these terms.
      </p>
    ),
  },
  {
    id: "services",
    title: "Our services",
    body: (
      <>
        <p>
          We provide visa consultancy and application-support services,
          including documentation review, form preparation, appointment
          booking guidance and submission support for tourist, business,
          family, study and work visas.
        </p>
        <p>
          <strong>We are a private consultancy and are not affiliated with any
          embassy, consulate or government department.</strong> We do not issue
          visas — the decision to grant or refuse a visa is made solely by the
          relevant authority.
        </p>
      </>
    ),
  },
  {
    id: "client-responsibilities",
    title: "Your responsibilities",
    body: (
      <>
        <p>You agree to:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Provide accurate, complete and truthful information and documents.</li>
          <li>Pay our consultancy fees and any third-party charges (embassy fees, biometric fees, courier fees) on time.</li>
          <li>Notify us promptly of changes to your travel plans, contact details or circumstances.</li>
          <li>Comply with the laws of the country you intend to visit.</li>
        </ul>
        <p>
          Providing false or misleading information may result in visa refusal
          or a ban, and we cannot accept liability for outcomes caused by such
          inaccuracies.
        </p>
      </>
    ),
  },
  {
    id: "fees",
    title: "Fees & payment",
    body: (
      <p>
        Our consultancy fees are quoted before engagement and are separate
        from embassy, biometric, courier and translation charges. Fees are
        payable in advance unless otherwise agreed in writing. Third-party
        charges are non-refundable once paid to the relevant authority.
      </p>
    ),
  },
  {
    id: "refunds",
    title: "Refunds",
    body: (
      <>
        <p>
          Because most of our work is performed up front, our consultancy fees
          are generally non-refundable once application work has begun. We
          will, however, refund fees for services we have not yet started.
        </p>
        <p>
          <strong>A visa refusal does not entitle you to a refund of our
          consultancy fee</strong>, as our fee covers preparation and submission
          support, not the visa outcome. Refund requests should be sent to
          {" "}<a className="text-primary hover:underline" href="mailto:contact@travellinks.uk">contact@travellinks.uk</a>.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <>
        <p>
          To the fullest extent permitted by law, our total liability to you
          for any claim arising out of or in connection with our services is
          limited to the consultancy fees you have paid us for the service in
          question.
        </p>
        <p>
          We are not liable for: visa refusals, processing delays by embassies
          or third parties, missed travel, denied boarding, currency
          fluctuations, or any indirect or consequential loss.
        </p>
        <p>Nothing in these terms excludes liability that cannot be excluded under UK law.</p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: (
      <p>
        All content on travellinks.uk — including text, graphics, logos and
        images — is owned by Travel Links Solution or our licensors and is
        protected by copyright. You may not copy, redistribute or use our
        content for commercial purposes without our written permission.
      </p>
    ),
  },
  {
    id: "third-party",
    title: "Third-party links",
    body: (
      <p>
        Our website may link to external websites operated by embassies,
        airlines or partners. We are not responsible for the content,
        accuracy or privacy practices of those sites.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Termination",
    body: (
      <p>
        We may suspend or terminate our services if you breach these terms,
        fail to provide required information, or make payment that cannot be
        completed. You may end our engagement in writing at any time, subject
        to the refund terms above.
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing law",
    body: (
      <p>
        These Terms are governed by the laws of England and Wales. Any dispute
        arising out of or in connection with these Terms will be subject to
        the exclusive jurisdiction of the courts of England and Wales.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Travel Links Solution · 138 Milton Street, Northampton, NN2 7DE, United
        Kingdom · <a className="text-primary hover:underline" href="mailto:contact@travellinks.uk">contact@travellinks.uk</a> · +44 787 946 5341.
      </p>
    ),
  },
];

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Travel Links Solution" },
      { name: "description", content: "The terms that apply when you use the Travel Links Solution website or engage our UK visa consultancy services." },
      { property: "og:title", content: "Terms & Conditions — Travel Links Solution" },
      { property: "og:description", content: "Read the terms that govern our visa consultancy services and the use of travellinks.uk." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://travellinks.uk/terms" },
      { property: "og:image", content: "https://travellinks.uk/__l5e/assets-v1/86d58950-39c0-4ea4-b8dd-f0dbead6bc05/travel-links-logo.png" },
      { property: "og:image:alt", content: "Travel Links Solution" },
      { name: "twitter:image", content: "https://travellinks.uk/__l5e/assets-v1/86d58950-39c0-4ea4-b8dd-f0dbead6bc05/travel-links-logo.png" },
      { property: "og:site_name", content: "Travel Links Solution" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Terms & Conditions — Travel Links Solution" },
      { name: "twitter:description", content: "Read the terms that govern our visa consultancy services and the use of travellinks.uk." },
    ],
    links: [{ rel: "canonical", href: "https://travellinks.uk/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      intro="Please read these terms carefully — they set out the basis on which we provide our visa consultancy services."
      updated={UPDATED}
      sections={SECTIONS}
    />
  );
}
