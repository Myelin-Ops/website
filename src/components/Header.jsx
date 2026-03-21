"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";

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

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  };

  return (
    <nav className="sticky top-0 py-2 backdrop-blur-md bg-white/30 border-b border-[#F0F4F4] flex items-center justify-between px-4 md:px-12 z-40">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link href="/">
          <Image
            src="/myelin-logo.png"
            alt="Myelin Logo"
            height={60}
            width={140}
          />
        </Link>
      </motion.div>

      {/* Desktop Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="hidden md:flex gap-4"
      >
        {routes.map((route, i) => (
          <motion.div
            key={route.href}
            custom={i}
            variants={navItemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link
              href={route.href}
              className={`text-sm font-medium transition-colors ${
                isActive(route.href)
                  ? "text-black border-b-2 border-black pb-1"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {route.title}
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile Hamburger Menu Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
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
      </motion.button>

      {/* Mobile Navigation Menu */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={
          isMenuOpen ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }
        }
        transition={{ duration: 0.3 }}
        className="fixed top-[70px] left-0 right-0 bg-white border-b border-[#F0F4F4] md:hidden z-50"
      >
        <motion.div
          initial={{ y: -10 }}
          animate={isMenuOpen ? { y: 0 } : { y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col px-4 py-4 gap-4"
        >
          {routes.map((route) => (
            <motion.div
              key={route.href}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
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
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </nav>
  );
}

export default Header;
