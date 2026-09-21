"use client";
import {
  FaFacebookF, FaXTwitter, FaInstagram, FaTiktok, FaWhatsapp,
  FaYoutube, FaDiscord, FaTelegram, FaPinterest, FaLinkedinIn,
  FaTwitch, FaVk, FaRss, FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover,
} from "react-icons/fa6";
import { ChevronUp } from "lucide-react";
import { CATEGORIES } from "../data/products";

const SOCIALS = [
  FaFacebookF, FaXTwitter, FaInstagram, FaTiktok, FaWhatsapp,
  FaYoutube, FaDiscord, FaTelegram, FaPinterest, FaLinkedinIn,
  FaTwitch, FaVk, FaRss,
];

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 mt-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        {/* Kolom 1: Logo + deskripsi + sosial media (lebar 2 kolom) */}
        <div className="col-span-2">
          <div className="text-5xl font-extrabold mb-3">
            M<span className="text-[#14B8A6]">o</span>desy
          </div>
          <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
            Modesy is a modern e-commerce marketplace where buyers and sellers connect
            with ease. Whether you are looking to shop for unique items or grow your
            business by selling online, Modesy is here to help you every step of the way.
          </p>
          <div className="flex flex-wrap gap-2.5 mt-4 max-w-xs">
            {SOCIALS.map((Icon, i) => (
              <span key={i} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-[#14B8A6] hover:text-[#14B8A6] cursor-pointer transition-colors">
                <Icon size={13} />
              </span>
            ))}
          </div>
        </div>

        {/* Kolom 2: Categories */}
        <div>
          <p className="font-bold mb-3 text-xs uppercase tracking-wide">Categories</p>
          {CATEGORIES.map((c) => (
            <p key={c} className="text-xs text-gray-500 py-1.5">{c}</p>
          ))}
        </div>

        {/* Kolom 3: Quick Links + Information */}
        <div>
          <p className="font-bold mb-3 text-xs uppercase tracking-wide">Quick Links</p>
          {["Home", "Blog", "Shops", "Help Center"].map((c) => (
            <p key={c} className="text-xs text-gray-500 py-1.5">{c}</p>
          ))}
          <p className="font-bold mb-3 mt-5 text-xs uppercase tracking-wide">Information</p>
          {["Terms & Conditions", "About Us"].map((c) => (
            <p key={c} className="text-xs text-gray-500 py-1.5">{c}</p>
          ))}
        </div>

        {/* Kolom 4: Newsletter */}
        <div className="col-span-2 md:col-span-1">
          <p className="font-bold mb-3 text-xs uppercase tracking-wide">Newsletter</p>
          <p className="text-xs text-gray-500 mb-3">
            Join our subscribers list to get the latest news, updates and special offers
            directly in your inbox
          </p>
          <input
            placeholder="Enter your email"
            className="w-full bg-white border border-gray-300 text-xs px-3 py-2.5 rounded-lg outline-none placeholder:text-gray-400 mb-2.5"
          />
          <button className="w-full bg-[#14B8A6] hover:bg-[#119083] text-white text-xs font-semibold py-2.5 rounded-lg transition-colors">
            Subscribe
          </button>
          <div className="flex gap-2 mt-4 text-2xl text-gray-400">
            <FaCcVisa /><FaCcMastercard /><FaCcAmex /><FaCcDiscover />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 px-4 md:px-6 py-4 text-[11px] text-gray-500 flex flex-col sm:flex-row justify-between gap-2 max-w-7xl mx-auto">
        <span>Copyright 2025 Modesy - All Rights Reserved.</span>
        <span>Privacy Policy | Cookie Policy</span>
      </div>

<button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-[#171717] hover:bg-black text-white flex items-center justify-center shadow-lg z-40 transition-transform hover:-translate-y-0.5"
>
  <ChevronUp size={18} />
</button>
    </footer>
  );
}