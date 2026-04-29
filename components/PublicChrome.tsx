"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function PublicNavbar() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <Navbar />;
}

export function PublicFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <Footer />;
}
