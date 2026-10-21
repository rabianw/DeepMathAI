import type { Metadata } from "next";

// Canonical URL on www.deepmathai.ai so search engines don't pick a duplicate host.
export const metadata: Metadata = {
  alternates: { canonical: "/research" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
