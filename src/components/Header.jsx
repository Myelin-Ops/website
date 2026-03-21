"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const routes = [
  {
    href: "/",
    title: "HOME",
  },
  {
    href: "/about-us",
    title: "ABOUT US",
  },
  {
    href: "/services",
    title: "SERVICES",
  },
  {
    href: "/team",
    title: "TEAM",
  },
  {
    href: "/contact",
    title: "CONTACT",
  },
];

function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/" || pathname === "/home";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="py-2 border-b border-[#F0F4F4] flex items-center justify-between px-4 md:px-12">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/myelin-logo.png"
          alt="Myelin Logo"
          height={50}
          width={150}
          className="h-auto w-auto"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-8">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`text-sm font-medium transition-colors ${
              isActive(route.href)
                ? "text-black border-b-2 border-black pb-1"
                : "text-gray-600 hover:text-black"
            }`}
          >
            {route.title}
          </Link>
        ))}
      </div>

      {/* Mobile Hamburger Menu Button */}
      <button
        className="md:hidden flex flex-col gap-1 cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`w-6 h-0.5 bg-black transition-all ${
            isMenuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`w-6 h-0.5 bg-black transition-all ${
            isMenuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`w-6 h-0.5 bg-black transition-all ${
            isMenuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed top-[70px] left-0 right-0 bg-white border-b border-[#F0F4F4] md:hidden z-50 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col px-4 py-4 gap-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium transition-colors ${
                isActive(route.href)
                  ? "text-black border-l-2 border-black pl-2"
                  : "text-gray-600 hover:text-black"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {route.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Header;
