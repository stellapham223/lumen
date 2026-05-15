import { BASE_URL, SITE, absoluteUrl } from "@/lib/site";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Use dangerouslySetInnerHTML so JSON-LD lives in static HTML for crawlers + AI search.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}#organization`,
    name: SITE.name,
    url: BASE_URL,
    logo: absoluteUrl("/logo.png"),
    description: SITE.description,
    foundingDate: "2026",
  };
  return <JsonLd data={data} />;
}

export function WebApplicationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${BASE_URL}#webapplication`,
    name: SITE.name,
    url: BASE_URL,
    description: SITE.description,
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript and a modern browser",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@id": `${BASE_URL}#organization`,
    },
    featureList: [
      "Calculate current menstrual cycle phase",
      "Map weekly tasks to four hormonal phases",
      "Identify best time for deep work, meetings, and creative tasks",
      "Visualize hormone fluctuation across the cycle",
      "Privacy-first: all data stays in your browser",
    ],
  };
  return <JsonLd data={data} />;
}

export function FaqJsonLd({
  faqs,
}: {
  faqs: ReadonlyArray<{ question: string; answer: string }>;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  return <JsonLd data={data} />;
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: ReadonlyArray<{ name: string; path: string }>;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
  return <JsonLd data={data} />;
}

export function DefinedTermJsonLd({
  term,
  description,
  path,
  inDefinedTermSet,
}: {
  term: string;
  description: string;
  path: string;
  inDefinedTermSet?: string;
}) {
  const url = absoluteUrl(path);
  const data = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term,
    description,
    url,
    inDefinedTermSet: inDefinedTermSet ?? absoluteUrl("/glossary"),
  };
  return <JsonLd data={data} />;
}

export function DefinedTermSetJsonLd({
  name,
  description,
  path,
  terms,
}: {
  name: string;
  description: string;
  path: string;
  terms: ReadonlyArray<{ term: string; slug: string }>;
}) {
  const url = absoluteUrl(path);
  const data = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name,
    description,
    url,
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      url: absoluteUrl(`/glossary/${t.slug}`),
    })),
  };
  return <JsonLd data={data} />;
}

export function ArticleJsonLd({
  headline,
  description,
  path,
  datePublished,
  dateModified,
}: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
}) {
  const url = absoluteUrl(path);
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { "@id": `${BASE_URL}#organization` },
    publisher: { "@id": `${BASE_URL}#organization` },
    image: absoluteUrl("/logo.png"),
  };
  return <JsonLd data={data} />;
}
