"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ChevronDown, Copy, Gift } from "lucide-react";
import { BankAccount } from "@/content/types";
import { BotanicalCorner, BotanicalSprig, GoldDivider, SectionHeading } from "./Ornaments";

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Si el navegador bloquea el portapapeles, el usuario puede copiar manualmente.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="flex w-full items-center justify-between gap-3 rounded-sm px-3 py-2 text-left transition-colors hover:bg-[rgba(139,165,139,0.1)]"
    >
      <span className="min-w-0">
        <span
          className="block text-[0.55rem] uppercase tracking-[0.24em]"
          style={{ color: "var(--inv-text-muted)" }}
        >
          {label}
        </span>
        <span
          className="mt-0.5 block truncate text-sm"
          style={{ color: "var(--inv-text)" }}
        >
          {value}
        </span>
      </span>
      <span
        className="flex flex-shrink-0 items-center gap-1 text-[0.6rem] uppercase tracking-[0.16em]"
        style={{ color: "var(--inv-accent)" }}
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? "Copiado" : "Copiar"}
      </span>
    </button>
  );
}

function BankCard({ account }: { account: BankAccount }) {
  const [open, setOpen] = useState(false);
  const initials = account.bank
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="elegant-card overflow-hidden rounded-sm">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-3 px-4 py-4 text-left"
        aria-expanded={open}
      >
        {account.logo ? (
          <span className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-full bg-white">
            <Image
              src={account.logo}
              alt={account.bank}
              fill
              sizes="44px"
              className="object-contain p-1.5"
            />
          </span>
        ) : (
          <span
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full font-elegant-display text-sm"
            style={{
              border: "1px solid var(--elegant-line-strong)",
              color: "var(--elegant-sage-deep)",
              background: "rgba(139, 165, 139, 0.12)",
            }}
          >
            {initials}
          </span>
        )}

        <span className="min-w-0 flex-1">
          <span
            className="block font-elegant-display text-lg leading-tight"
            style={{ color: "var(--inv-text)" }}
          >
            {account.bank}
          </span>
          <span
            className="block text-[0.58rem] uppercase tracking-[0.22em]"
            style={{ color: "var(--inv-text-muted)" }}
          >
            Ver datos
          </span>
        </span>

        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          style={{ color: "var(--inv-accent)" }}
        />
      </button>

      {open && (
        <div
          className="px-3 pb-3 pt-1"
          style={{ borderTop: "1px solid var(--elegant-line)" }}
        >
          <CopyRow label="Titular" value={account.owner} />
          <CopyRow label="Número de cuenta" value={account.accountNumber} />
          {account.cci && <CopyRow label="CCI" value={account.cci} />}
        </div>
      )}
    </div>
  );
}

export function ElegantGifts({
  message,
  envelopeMessage,
  bankAccounts,
  suggestions,
}: {
  message?: string;
  envelopeMessage?: string;
  bankAccounts?: BankAccount[];
  suggestions?: string[];
}) {
  if (!message && !bankAccounts?.length && !suggestions?.length && !envelopeMessage) {
    return null;
  }

  return (
    <section className="w-full px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Regalos"
          title="Un detalle con nosotros"
          subtitle={message}
        />

        {bankAccounts && bankAccounts.length > 0 && (
          <div className="mt-11 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {bankAccounts.map((account) => (
              <BankCard key={`${account.bank}-${account.accountNumber}`} account={account} />
            ))}
          </div>
        )}

        {suggestions && suggestions.length > 0 && (
          <div className="elegant-card mt-5 rounded-sm px-6 py-7 text-center">
            <BotanicalCorner className="pointer-events-none absolute left-1 top-1 h-10 w-10 opacity-60" />
            <div className="flex items-center justify-center gap-2">
              <Gift className="h-4 w-4" style={{ color: "var(--elegant-sage-deep)" }} />
              <p
                className="elegant-eyebrow text-[0.56rem]"
                style={{ color: "var(--inv-accent)" }}
              >
                Sugerencias de regalo
              </p>
            </div>

            <GoldDivider className="my-5" />

            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map((suggestion) => (
                <span
                  key={suggestion}
                  className="rounded-full px-3.5 py-1.5 text-xs"
                  style={{
                    border: "1px solid var(--elegant-line)",
                    color: "var(--inv-text-muted)",
                    background: "rgba(242, 235, 221, 0.55)",
                  }}
                >
                  {suggestion}
                </span>
              ))}
            </div>
          </div>
        )}

        {envelopeMessage && (
          <div
            className="mx-auto mt-7 max-w-2xl rounded-sm px-6 py-6 text-center"
            style={{
              border: "1px dashed var(--elegant-line-strong)",
              background: "rgba(242, 235, 221, 0.4)",
            }}
          >
            <BotanicalSprig className="mx-auto h-6 w-14" />
            <p
              className="elegant-eyebrow text-[0.55rem]"
              style={{ color: "var(--inv-accent)" }}
            >
              Lluvia de sobres
            </p>
            <p
              className="mt-3 text-sm italic leading-relaxed"
              style={{ color: "var(--inv-text-muted)" }}
            >
              {envelopeMessage}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
