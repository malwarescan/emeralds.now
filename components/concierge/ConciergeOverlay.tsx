"use client";

import { useState, useCallback } from "react";
import { GoldHairline } from "@/components/ui/GoldHairline";
import { captureConciergeLead } from "@/lib/concierge/capture";

type Step = "welcome" | "interest" | "budget" | "timeline" | "details" | "appointment" | "contact" | "done";

const INTEREST_OPTIONS = ["Ring", "Earrings", "Bracelet", "Custom piece"] as const;
const BUDGET_BANDS = ["Under 5k", "5k – 15k", "15k – 50k", "50k+"] as const;

type ConciergeOverlayProps = {
  onClose: () => void;
};

export function ConciergeOverlay({ onClose }: ConciergeOverlayProps) {
  const [step, setStep] = useState<Step>("welcome");
  const [data, setData] = useState<{
    interest?: string;
    budget?: string;
    timeline?: string;
    ringSize?: string;
    preferences?: string;
    appointmentType?: "virtual" | "in-person";
    contactPreference?: "whatsapp" | "email";
  }>({});

  const update = useCallback(<K extends keyof typeof data>(key: K, value: typeof data[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = useCallback(async () => {
    await captureConciergeLead({
      interest: data.interest,
      budget: data.budget,
      timeline: data.timeline,
      ring_size: data.ringSize,
      preferences: data.preferences,
      appointment_type: data.appointmentType,
      contact_preference: data.contactPreference,
    });
    setStep("done");
  }, [data]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "var(--veil)", backdropFilter: "blur(var(--blur-md))" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="concierge-title"
    >
      <div
        className="relative w-full max-w-lg p-8"
        style={{
          background: "var(--abyss)",
          border: "1px solid var(--color-gold-subtle)",
          borderRadius: 0,
          boxShadow: "var(--shadow-soft-lg)",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 text-paper opacity-78 hover:opacity-100 transition-opacity"
          aria-label="Close concierge"
        >
          ✕
        </button>

        <h2 id="concierge-title" className="text-display-2 mb-6">
          Speak to an artisan
        </h2>
        <GoldHairline className="mb-6" />

        {step === "welcome" && (
          <>
            <p className="text-body opacity-90 mb-6">
              Share a few details so we can prepare a tailored experience — virtual or in person.
            </p>
            <button type="button" className="cta-primary" onClick={() => setStep("interest")}>
              Begin
            </button>
          </>
        )}

        {step === "interest" && (
          <>
            <p className="text-technical text-caption mb-4">What are you looking for?</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {INTEREST_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className="px-4 py-2 rounded-lg text-small border transition-colors"
                  style={{
                    borderColor: data.interest === opt ? "var(--color-gold)" : "var(--color-gold-subtle)",
                    background: data.interest === opt ? "var(--veil)" : "transparent",
                    color: "var(--paper)",
                    borderRadius: 0,
                  }}
                  onClick={() => { update("interest", opt); setStep("budget"); }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        )}

        {step === "budget" && (
          <>
            <p className="text-technical text-caption mb-4">Budget range (USD)</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {BUDGET_BANDS.map((band) => (
                <button
                  key={band}
                  type="button"
                  className="px-4 py-2 rounded-lg text-small border transition-colors"
                  style={{
                    borderColor: data.budget === band ? "var(--color-gold)" : "var(--color-gold-subtle)",
                    background: data.budget === band ? "var(--veil)" : "transparent",
                    color: "var(--paper)",
                    borderRadius: 0,
                  }}
                  onClick={() => { update("budget", band); setStep("timeline"); }}
                >
                  {band}
                </button>
              ))}
            </div>
          </>
        )}

        {step === "timeline" && (
          <>
            <label className="block text-technical text-caption mb-2">Timeline (e.g. gift date, travel)</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-transparent border mb-6"
              style={{ border: "var(--hairline-gold)", color: "var(--color-paper)" }}
              placeholder="Optional"
              value={data.timeline ?? ""}
              onChange={(e) => update("timeline", e.target.value)}
            />
            <button type="button" className="cta-primary" onClick={() => setStep("details")}>
              Next
            </button>
          </>
        )}

        {step === "details" && (
          <>
            <label className="block text-technical text-caption mb-2">Ring size or preferences</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-transparent border mb-4"
              style={{ border: "var(--hairline-gold)", color: "var(--color-paper)" }}
              placeholder="e.g. 6, or custom design notes"
              value={data.ringSize ?? ""}
              onChange={(e) => update("ringSize", e.target.value)}
            />
            <label className="block text-technical text-caption mb-2">Any other details</label>
            <textarea
              className="w-full px-4 py-3 rounded-lg bg-transparent border mb-6 resize-none"
              style={{ border: "var(--hairline-gold)", color: "var(--color-paper)", minHeight: 80 }}
              placeholder="Optional"
              value={data.preferences ?? ""}
              onChange={(e) => update("preferences", e.target.value)}
            />
            <button type="button" className="cta-primary" onClick={() => setStep("appointment")}>
              Next
            </button>
          </>
        )}

        {step === "appointment" && (
          <>
            <p className="text-technical text-caption mb-4">Preferred appointment</p>
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                className="flex-1 py-3 border text-small transition-colors"
                style={{
                  borderColor: data.appointmentType === "virtual" ? "var(--color-gold)" : "var(--color-gold-subtle)",
                  background: data.appointmentType === "virtual" ? "var(--veil)" : "transparent",
                  color: "var(--paper)",
                  borderRadius: 0,
                }}
                onClick={() => update("appointmentType", "virtual")}
              >
                Virtual
              </button>
              <button
                type="button"
                className="flex-1 py-3 border text-small transition-colors"
                style={{
                  borderColor: data.appointmentType === "in-person" ? "var(--color-gold)" : "var(--color-gold-subtle)",
                  background: data.appointmentType === "in-person" ? "var(--veil)" : "transparent",
                  color: "var(--paper)",
                  borderRadius: 0,
                }}
                onClick={() => update("appointmentType", "in-person")}
              >
                In person
              </button>
            </div>
            <button type="button" className="cta-primary" onClick={() => setStep("contact")}>
              Next
            </button>
          </>
        )}

        {step === "contact" && (
          <>
            <p className="text-technical text-caption mb-4">Preferred contact</p>
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                className="flex-1 py-3 border text-small transition-colors"
                style={{
                  borderColor: data.contactPreference === "whatsapp" ? "var(--color-gold)" : "var(--color-gold-subtle)",
                  background: data.contactPreference === "whatsapp" ? "var(--veil)" : "transparent",
                  color: "var(--paper)",
                  borderRadius: 0,
                }}
                onClick={() => update("contactPreference", "whatsapp")}
              >
                WhatsApp
              </button>
              <button
                type="button"
                className="flex-1 py-3 border text-small transition-colors"
                style={{
                  borderColor: data.contactPreference === "email" ? "var(--color-gold)" : "var(--color-gold-subtle)",
                  background: data.contactPreference === "email" ? "var(--veil)" : "transparent",
                  color: "var(--paper)",
                  borderRadius: 0,
                }}
                onClick={() => update("contactPreference", "email")}
              >
                Email
              </button>
            </div>
            <button type="button" className="cta-primary w-full" onClick={handleSubmit}>
              Request conversation
            </button>
          </>
        )}

        {step === "done" && (
          <>
            <p className="text-body opacity-90 mb-6">
              Thank you. An artisan will reach out shortly to arrange your conversation.
            </p>
            <button type="button" className="cta-primary" onClick={onClose}>
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
