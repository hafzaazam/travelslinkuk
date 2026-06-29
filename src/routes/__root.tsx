import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SplashScreen } from "@/components/site/SplashScreen";
import { ApplyDialog } from "@/components/site/ApplyDialog";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Travel Links Solution — UK Visa Consultancy" },
      { name: "description", content: "UK-based visa consultancy helping tourists, families and business travellers obtain visas to 25+ countries with confidence." },
      { property: "og:title", content: "Travel Links Solution — UK Visa Consultancy" },
      { property: "og:description", content: "UK-based visa consultancy helping tourists, families and business travellers obtain visas to 25+ countries with confidence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Travel Links Solution — UK Visa Consultancy" },
      { name: "twitter:description", content: "UK-based visa consultancy helping tourists, families and business travellers obtain visas to 25+ countries with confidence." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/72e57e30-45ad-42d7-bf26-667360ca0ba1/id-preview-1bd45104--1f5f9a7e-f63a-490d-8ae6-c9c048fe3a19.lovable.app-1782683033235.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/72e57e30-45ad-42d7-bf26-667360ca0ba1/id-preview-1bd45104--1f5f9a7e-f63a-490d-8ae6-c9c048fe3a19.lovable.app-1782683033235.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/__l5e/assets-v1/86d58950-39c0-4ea4-b8dd-f0dbead6bc05/travel-links-logo.png" },
      { rel: "apple-touch-icon", href: "/__l5e/assets-v1/86d58950-39c0-4ea4-b8dd-f0dbead6bc05/travel-links-logo.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://travelslinkuk.lovable.app/#organization",
              name: "Travel Links Solution",
              url: "https://travelslinkuk.lovable.app",
              logo: "https://travelslinkuk.lovable.app/__l5e/assets-v1/86d58950-39c0-4ea4-b8dd-f0dbead6bc05/travel-links-logo.png",
              email: "info@travellinks.uk",
              telephone: "+44-787-946-5341",
              address: {
                "@type": "PostalAddress",
                streetAddress: "138 Milton Street",
                addressLocality: "Northampton",
                postalCode: "NN2 7DE",
                addressCountry: "GB",
              },
            },
            {
              "@type": "WebSite",
              "@id": "https://travelslinkuk.lovable.app/#website",
              url: "https://travelslinkuk.lovable.app",
              name: "Travel Links Solution",
              publisher: { "@id": "https://travelslinkuk.lovable.app/#organization" },
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SplashScreen />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <ApplyDialog />
    </QueryClientProvider>
  );
}

