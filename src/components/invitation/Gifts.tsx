"use client";

import { useState } from "react";
import { Section } from "./Section";
import { BankAccount } from "@/content/types";

function CopyableField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="w-full text-left border-b border-[var(--inv-text-muted)]/40 py-2 flex justify-between items-center"
    >
      <span>
        <span className="text-[var(--inv-text-muted)] text-xs block">{label}</span>
        {value}
      </span>
      <span className="text-xs text-[var(--inv-accent)]">
        {copied ? "Copiado" : "Copiar"}
      </span>
    </button>
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
      <p className="font-display text-3xl mb-4">Regalos</p>
      {message && <p className="text-[var(--inv-text-muted)] mb-6">{message}</p>}

      {bankAccounts?.map((acc, i) => (
        <div key={i} className="mb-6 text-left">
          <p className="font-display text-xl mb-2">{acc.bank}</p>
          <CopyableField label="Titular" value={acc.owner} />
          <CopyableField label="N° de cuenta" value={acc.accountNumber} />
          {acc.cci && <CopyableField label="CCI" value={acc.cci} />}
        </div>
      ))}

      {suggestions && suggestions.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {suggestions.map((s) => (
            <span
              key={s}
              className="rounded-full border border-[var(--inv-text-muted)] px-3 py-1 text-xs"
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </Section>
  );
}
