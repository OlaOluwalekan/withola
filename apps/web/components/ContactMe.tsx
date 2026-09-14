"use client";

import {
  BugIcon,
  CheckCircle,
  Database,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";
import { createMessage } from "../models/message";

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    const response = await createMessage(formData);

    setIsSubmitting(false);

    if (response.success) {
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "", subject: "" });

      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }
    if (response.error) {
      setErrorMessage(response.error);

      setTimeout(() => {
        setIsSuccess(false);
      }, 4000);
    }
  };

  return (
    <div
      className="relative w-full py-16 px-4 flex flex-col items-center justify-center overflow-hidden"
      id="contact-root"
    >
      {/* Decorative Blueprint Graph overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(16,185,129,0.025)_1px,transparent_1px)] bg-size-[16px_16px] pointer-events-none -z-10" />

      <div className="max-w-3xl text-center mb-12">
        <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-widest rounded-sm mb-3">
          <span>Contact Node</span>
        </div>
        <h2
          className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-custom-heading mb-2"
          id="contact-heading"
        >
          Get In Touch
        </h2>
        <p className="text-sm text-custom-secondary font-mono">
          Initiate a communications handshake with me.
        </p>
      </div>

      <div
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
        id="contact-grid"
      >
        {/* Left Card: Direct Contact specs */}
        <div
          className="md:col-span-5 space-y-6 md:sticky md:top-8"
          id="contact-info-panel"
        >
          <div className="rounded-2xl border border-custom-border bg-custom-card p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-custom-border rounded-tr-2xl" />

            <h3 className="text-lg font-sans font-bold text-custom-heading flex items-center gap-2">
              <span>Secure Parameters</span>
            </h3>

            <p className="text-xs text-custom-secondary font-sans leading-relaxed">
              Based in Lagos, Nigeria, I am fully equipped for remote
              engagements and collaborative global time-zone synchronizations.
            </p>

            <hr className="border-custom-border transition-colors duration-300" />

            <div className="space-y-4" id="contact-params-list">
              <div className="flex items-center gap-4 text-sm text-custom-primary">
                <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono text-custom-muted uppercase">
                    Send A Mail
                  </h4>
                  <a
                    href="mailto:olalekanbello534@gmail.com"
                    className="hover:text-emerald-300 transition-colors"
                  >
                    olalekanbello534@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-custom-primary">
                <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono text-custom-muted uppercase">
                    Or Dial Me
                  </h4>
                  <a
                    href="tel:+2348142659447"
                    className="hover:text-blue-300 transition-colors"
                  >
                    +234 814 265 9447
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-custom-primary">
                <div className="p-3 bg-violet-500/10 rounded-xl border border-violet-500/20 text-violet-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono text-custom-muted uppercase">
                    Or a Visit 😁
                  </h4>
                  <a
                    href="https://maps.app.goo.gl/Nbv3tdwB16wJwfAT9"
                    target="_blank"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Lagos, Nigeria
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Interactive Form Sheet */}
        <div className="md:col-span-7 space-y-6" id="contact-forms-panel">
          <div className="rounded-2xl border border-custom-border bg-custom-card p-6 sm:p-8 space-y-6 shadow-xl relative transition-colors duration-300">
            <h3 className="text-lg font-sans font-bold text-custom-heading flex items-center gap-2">
              <span>Transmit Message</span>
            </h3>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              id="handshake-form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="input-name"
                    className="text-[10px] font-mono text-custom-secondary uppercase"
                  >
                    Identify Sender
                  </label>
                  <input
                    type="text"
                    id="input-name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Your Name"
                    className="w-full bg-custom-inner border border-custom-border focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm text-custom-primary outline-none placeholder-custom-secondary/40 transition-all font-sans"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="input-email"
                    className="text-[10px] font-mono text-custom-secondary uppercase"
                  >
                    Return Address
                  </label>
                  <input
                    type="email"
                    id="input-email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="your.email@example.com"
                    className="w-full bg-custom-inner border border-custom-border focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm text-custom-primary outline-none placeholder-custom-secondary/40 transition-all font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="input-subject"
                  className="text-[10px] font-mono text-custom-secondary uppercase"
                >
                  Message label
                </label>
                <input
                  type="text"
                  id="input-subject"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="Your Message Label"
                  className="w-full bg-custom-inner border border-custom-border focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm text-custom-primary outline-none placeholder-custom-secondary/40 transition-all font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="input-message"
                  className="text-[10px] font-mono text-custom-secondary uppercase"
                >
                  Transmission payload
                </label>
                <textarea
                  id="input-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Draft your proposal or inquiry here..."
                  className="w-full bg-custom-inner border border-custom-border focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm text-custom-primary outline-none placeholder-custom-secondary/40 transition-all font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="w-full py-3 px-6 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 text-slate-900 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-850 disabled:text-slate-500 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
                id="btn-form-transmit"
              >
                {isSubmitting ? (
                  <>
                    <Database className="w-4 h-4 animate-spin" />
                    <span>TRANSMITTING MESSAGE...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-950" />
                    <span>MESSAGE SENT SUCCESSFULLY</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>SEND MESSAGE</span>
                  </>
                )}
              </button>

              {errorMessage && (
                <section className="flex justify-center items-center gap-3 bg-red-700/35 text-red-700 uppercase text-sm p-1 rounded-sm">
                  <BugIcon className="w-4 h-4" />
                  {errorMessage}
                </section>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
