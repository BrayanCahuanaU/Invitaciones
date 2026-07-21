"use client";

import { useState } from "react";
import Image from "next/image";
import { Gift, Copy, Check, ChevronDown } from "lucide-react";
import { Section } from "./Section";
import { BankAccount } from "@/content/types";

function CopyableRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="w-full flex justify-between items-center py-1.5 text-sm hover:bg-[var(--inv-accent)]/5 rounded px-2 transition-colors"
    >
      <span className="text-center flex-1">
        <span className="text-[var(--inv-text-muted)] text-xs block">{label}</span>
        {value}
      </span>
      <span className="text-xs text-[var(--inv-accent)] flex items-center gap-1 flex-shrink-0 ml-2">
        {copied ? (
          <><Check className="w-3 h-3" /> Copiado</>
        ) : (
          <><Copy className="w-3 h-3" /> Copiar</>
        )}
      </span>
    </button>
  );
}

function BankCard({ acc }: { acc: BankAccount }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-[var(--inv-accent)]/15 bg-[var(--inv-surface)]/60 backdrop-blur-sm overflow-hidden transition-all hover:border-[var(--inv-accent)]/30">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex flex-col items-center gap-2 p-3 md:p-4 text-center"
      >
        {acc.logo && (
          <div className="relative w-40 h-40 md:w-full md:h-70 rounded-md overflow-hidden bg-white/10">
            <Image src={acc.logo} alt={acc.bank} fill className="object-cover" />
          </div>
        )}
        <ChevronDown
          className={`w-4 h-4 text-[var(--inv-accent-muted)] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-1 border-t border-[var(--inv-accent)]/10 pt-3">
          <CopyableRow label="Titular" value={acc.owner} />
          <CopyableRow label="N° de cuenta" value={acc.accountNumber} />
          {acc.cci && <CopyableRow label="CCI" value={acc.cci} />}
        </div>
      )}
    </div>
  );
}

function SuggestionCard({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-[var(--inv-accent)]/15 bg-[var(--inv-surface)]/60 backdrop-blur-sm overflow-hidden transition-all hover:border-[var(--inv-accent)]/30 md:col-span-2">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-center gap-3 p-3 md:p-4 text-center"
      >
        <Gift className="w-5 h-5 text-[var(--inv-accent)]" />
        <span className="font-display text-lg">Sugerencias de regalo</span>
        <ChevronDown
          className={`w-4 h-4 text-[var(--inv-accent-muted)] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-[var(--inv-accent)]/10 pt-3">
          <div className="flex flex-wrap justify-center gap-2">
            {items.map((s) => (
              <span
                key={s}
                className="rounded-full border border-[var(--inv-text-muted)] px-3 py-1 text-xs"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Gifts({
  message,
  bankAccounts,
  suggestions,
}: {
  message?: string;
  bankAccounts?: BankAccount[];
  suggestions?: string[];
}) {
  if (!message && !bankAccounts?.length && !suggestions?.length) return null;
  return (
    <Section>
      <div className="flex flex-col items-center gap-2 mb-4">
        <Gift className="w-5 h-5 text-[var(--inv-accent)]" />
        <p className="font-display text-3xl md:text-4xl">Regalos</p>
      </div>
      {message && <p className="text-[var(--inv-text-muted)] mb-6">{message}</p>}

      {(bankAccounts?.length || suggestions?.length) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-lg md:max-w-2xl mx-auto text-center">
          {bankAccounts?.map((acc, i) => (
            <BankCard key={i} acc={acc} />
          ))}
          {suggestions && suggestions.length > 0 && (
            <SuggestionCard items={suggestions} />
          )}
        </div>
      )}
    </Section>
  );
}
