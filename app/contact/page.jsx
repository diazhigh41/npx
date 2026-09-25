"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import {
  FaFacebookF, FaXTwitter, FaInstagram, FaTiktok, FaWhatsapp,
  FaYoutube, FaDiscord, FaTelegram, FaPinterest, FaLinkedinIn, FaTwitch,
} from "react-icons/fa6";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCurrency } from "../context/CurrencyContext";

const SOCIALS = [
  FaFacebookF, FaXTwitter, FaInstagram, FaTiktok, FaWhatsapp,
  FaYoutube, FaDiscord, FaTelegram, FaPinterest, FaLinkedinIn, FaTwitch,
];

export default function ContactPage() {
  const [agree, setAgree] = useState(false);
  const { formatPrice } = useCurrency();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header scrolled={false} onOpenMenu={() => {}} />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex-1 w-full">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
          <Link href="/" className="hover:text-[#14B8A6]">Home</Link>
          <ChevronRight size={12} />
          <span className="text-gray-800">Contact</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-5">Contact</h1>

        <p className="text-sm text-gray-500 leading-relaxed max-w-3xl mb-4">
          We are here to help you with any questions, concerns, or feedback you may have
          about our platform. Whether you are a buyer or a seller, our team is dedicated to
          providing you with the best possible support. If you need assistance with an
          order, have questions about our platform, or simply want to provide feedback,
          please don't hesitate to contact us. You can reach us through our contact form,
          located on this page. Simply fill out the form with your details and a brief
          message, and we will get back to you as soon as possible.
        </p>
        <p className="text-sm text-gray-500 leading-relaxed max-w-3xl mb-10">
          Alternatively, you can also reach us through our social media channels or email.
          Our team is available to assist you with any questions or concerns you may have.
        </p>

        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Form */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-bold mb-5">Leave Message</h2>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                placeholder="Name"
                className="w-full border border-gray-200 rounded-lg text-sm px-4 py-2.5 outline-none"
              />
              <input
                placeholder="Email Address"
                type="email"
                className="w-full border border-gray-200 rounded-lg text-sm px-4 py-2.5 outline-none"
              />
              <textarea
                placeholder="Message"
                rows={6}
                className="w-full border border-gray-200 rounded-lg text-sm px-4 py-2.5 outline-none resize-none"
              />

              <label className="flex items-center gap-2 text-xs text-gray-600">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="accent-[#14B8A6] w-3.5 h-3.5"
                />
                I have read and agree to the{" "}
                <Link href="/terms-conditions" className="text-[#14B8A6] font-medium underline">
                  Terms & Conditions
                </Link>
              </label>

              {/* Visual mock Cloudflare Turnstile - belum terhubung ke verifikasi beneran */}
              <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-3 w-fit bg-gray-50">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={13} className="text-white" />
                </div>
                <div className="text-xs">
                  <p className="text-gray-700 font-medium">Success!</p>
                  <p className="text-gray-400 text-[10px]">CLOUDFLARE &nbsp; Privacy · Help</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={!agree}
                className="bg-[#14B8A6] hover:bg-[#119083] disabled:bg-gray-200 disabled:cursor-not-allowed text-white text-sm font-semibold px-8 py-2.5 rounded-lg transition-colors"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone size={16} className="text-[#14B8A6] flex-shrink-0" />
                (541) 754-30103
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail size={16} className="text-[#14B8A6] flex-shrink-0" />
                edward_test@domain.com
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin size={16} className="text-[#14B8A6] flex-shrink-0 mt-0.5" />
                3111 Camino Del Rio N Suite 400 San Diego
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {SOCIALS.map((Icon, i) => (
                <span
                  key={i}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-[#14B8A6] hover:text-[#14B8A6] cursor-pointer transition-colors"
                >
                  <Icon size={13} />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Map full width */}
        <div className="rounded-xl overflow-hidden border border-gray-100">
          <iframe
            title="Location Map"
            src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=3111+Camino+Del+Rio+N+Suite+400+San+Diego&ie=UTF8&t=&z=14&iwloc=B&output=embed"
            width="100%"
            height="420"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}