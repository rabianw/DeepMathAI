"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, Users, Microscope, BookOpen, Newspaper, Map as MapIcon, Menu, X } from "lucide-react";
import { useState } from "react";
import { getImageUrl } from "../lib/cloudinary";

const navItems = [
  { href: "/", label: "Home", icon: Brain },
  { href: "/team", label: "Team", icon: Users },
  { href: "/research", label: "Research", icon: Microscope },
  { href: "/publications", label: "Publications", icon: BookOpen },
  { href: "/activities", label: "Activities", icon: Newspaper },
  { href: "/roadmap", label: "Roadmap", icon: MapIcon },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0a1628]/95 backdrop-blur-md border-b border-blue-500/20">
      <nav className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src={getImageUrl("/images/deepmathai-brain-light.png")}
              alt="DeepMathAI"
              className="h-9 w-9"
            />
            <div className="hidden sm:block">
              <span className="text-lg font-extrabold tracking-tight text-white">
                Deep<span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">MathAI</span>
              </span>
              <p className="text-[10px] text-gray-500 -mt-1 tracking-wider uppercase">Research Group</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-500/15 text-blue-400"
                      : "text-gray-400 hover:text-blue-300 hover:bg-blue-500/10"
                  }`}
                >
                  <Icon size={15} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 border-t border-blue-500/10 mt-1">
            {navItems.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-500/15 text-blue-400"
                      : "text-gray-400 hover:text-blue-300"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
}
