"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      eventParams: Record<string, string | number | boolean>,
    ) => void;
  }
}

export function AffiliateClickTracker() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.href;
      if (!href.includes("amazon.com")) return;
      if (!href.includes("lumencal0c-20")) return;

      const url = new URL(href);
      const keyword = url.searchParams.get("k") || url.pathname;
      const linkText = (anchor.textContent || "").trim().slice(0, 80);

      if (typeof window.gtag === "function") {
        window.gtag("event", "affiliate_click", {
          network: "amazon",
          link_url: href,
          link_text: linkText,
          source_path: window.location.pathname,
          product_keyword: keyword,
        });
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
