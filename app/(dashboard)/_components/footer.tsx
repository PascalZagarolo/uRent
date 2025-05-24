'use client'

import { Instagram, MailIcon, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-700/30 bg-[#191B27]/80 dark:bg-[#0F0F0F]/80 backdrop-blur-md py-6 px-2">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Logo and Socials */}
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 w-full md:w-auto">
          <span className="text-lg font-semibold text-white/90 tracking-tight">uRent</span>
          <div className="flex gap-3 mt-1 md:mt-0">
            <a href="https://www.instagram.com/urent.de/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white transition" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white transition" />
            </a>
            <a href="mailto:support@urent-rental.de" aria-label="E-Mail">
              <MailIcon className="w-5 h-5 text-gray-400 hover:text-white transition" />
            </a>
          </div>
        </div>
        {/* Center: Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 text-gray-400 text-xs font-normal w-full md:w-auto">
          <a className="hover:underline" href="/about-us">Über uns</a>
          <a className="hover:underline" href="/contact">Kontakt</a>
          <a className="hover:underline" href="/career">Karriere</a>
          <a className="hover:underline" href="/imprint">Impressum</a>
          <a className="hover:underline" href="/data-privacy">Datenschutz</a>
          <a className="hover:underline" href="/agbs">AGBs</a>
          <a className="hover:underline" href="/faqs">FAQs & Hilfe</a>
          <a className="hover:underline" href="/blog">Blogs & News</a>
        </div>
        {/* Right: Jetzt mieten & Jetzt vermieten Buttons */}
        <div className="w-full md:w-auto flex justify-center md:justify-end gap-3">
          <Button
            asChild
            className="bg-indigo-600 text-white px-6 py-2 text-sm font-medium rounded-full shadow hover:bg-indigo-700 transition"
          >
            <a href="/mieten">Jetzt mieten</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-2 border-indigo-400 text-indigo-400 bg-transparent px-6 py-2 text-sm font-medium rounded-full shadow-none hover:bg-indigo-50/10 hover:text-indigo-500 hover:border-indigo-500 transition"
          >
            <a href="/vermieten">Jetzt vermieten</a>
          </Button>
        </div>
      </div>
      <div className="border-t border-gray-700/30 mt-6 pt-3 text-center text-xs text-gray-500/80">
        &copy; {new Date().getFullYear()} uRent. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}

export default Footer;
