"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Instagram, Facebook, Linkedin, Twitter } from "lucide-react";

function Footer() {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/myelinops/", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61556761803602", label: "Facebook" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/myelin-ops/posts/?feedView=all", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/MyelinOPS", label: "Twitter" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <footer className="w-full bg-white border-t border-gray-200">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand Section */}
          <motion.div variants={itemVariants}>
            <Link href="/">
              <Image
                src="/myelin-logo.png"
                alt="Myelin Logo"
                height={50}
                width={150}
                className="h-auto w-auto mb-4"
              />
            </Link>
            <p className="text-sm text-gray-600">
              {t('footer.brand.description')}
            </p>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-black mb-4">{t('footer.contact.title')}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="mailto:info@myelinops.com" className="hover:text-black transition-colors">
                  info@myelinops.com
                </a>
              </li>
              <li>
                <a href="tel:+383-49-287-070" className="hover:text-black transition-colors">
                  +383 49 287 070
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Legal Section */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-black mb-4">{t('footer.legal.title')}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/privacy" className="hover:text-black transition-colors">
                  {t('footer.legal.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-black transition-colors">
                  {t('footer.legal.terms')}
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Social Section */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-black mb-4">{t('footer.social.title')}</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          {/* Copyright */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center text-xs text-gray-500"
          >
            <p>{t('footer.copyright', { year: currentYear })}</p>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}

export default Footer;
