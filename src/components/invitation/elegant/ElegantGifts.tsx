"use client";

import { useState } from "react";
import Image from "next/image";
import { BedDouble, Check, ChevronDown, Copy, CreditCard, Gift, Mail, Plug, UtensilsCrossed } from "lucide-react";
import { BankAccount, WeddingTexts, YapeAccount } from "@/content/types";
import {
  BotanicalCorner,
  BotanicalSprig,
  Butterfly,
  FloralCluster,
  GoldDivider,
  RoseBloom,
  SectionHeading,
} from "./Ornaments";

function CopyRow({
  label,
  value,
  copiedLabel,
  copyLabel,
}: {
  label: string;
  value: string;
  copiedLabel: string;
  copyLabel: string;
}) {
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
      className="flex w-full items-center justify-between gap-3 rounded-sm px-3 py-2 text-left transition-colors hover:bg-[rgba(110,31,51,0.08)]"
    >
      <span className="min-w-0">
        <span
          className="block text-[0.65rem] uppercase tracking-[0.18em]"
          style={{ color: "var(--inv-text-muted)" }}
        >
          {label}
        </span>
        <span
          className="mt-0.5 block truncate text-base"
          style={{ color: "var(--inv-text)" }}
        >
          {value}
        </span>
      </span>
      <span
        className="flex flex-shrink-0 items-center gap-1 text-[0.68rem] uppercase tracking-[0.12em]"
        style={{ color: "var(--inv-accent)" }}
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? copiedLabel : copyLabel}
      </span>
    </button>
  );
}

function SuggestionIcon({ label, className }: { label: string; className?: string }) {
  const lower = label.toLowerCase();
  const Icon = lower.includes("sobre")
    ? Mail
    : lower.includes("vajilla")
      ? UtensilsCrossed
      : lower.includes("blanco") || lower.includes("lencer")
        ? BedDouble
        : lower.includes("electro")
          ? Plug
          : lower.includes("tarjeta")
            ? CreditCard
            : Gift;

  return <Icon className={className} style={{ color: "var(--elegant-sage-deep)" }} />;
}

function BankCard({
  account,
  texts,
}: {
  account: BankAccount;
  texts: WeddingTexts;
}) {
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
              background: "rgba(110, 31, 51, 0.1)",
            }}
          >
            {initials}
          </span>
        )}

        <span className="min-w-0 flex-1">
          <span
            className="block font-elegant-display text-xl leading-tight"
            style={{ color: "var(--inv-text)" }}
          >
            {account.bank}
          </span>
          <span
            className="block text-[0.66rem] uppercase tracking-[0.16em]"
            style={{ color: "var(--inv-text-muted)" }}
          >
            {texts.gifts.viewData}
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
          <CopyRow
            label={texts.gifts.holderLabel}
            value={account.owner}
            copiedLabel={texts.gifts.copied}
            copyLabel={texts.gifts.copy}
          />
          <CopyRow
            label={texts.gifts.accountLabel}
            value={account.accountNumber}
            copiedLabel={texts.gifts.copied}
            copyLabel={texts.gifts.copy}
          />
          {account.cci && (
            <CopyRow
              label={texts.gifts.cciLabel}
              value={account.cci}
              copiedLabel={texts.gifts.copied}
              copyLabel={texts.gifts.copy}
            />
          )}
        </div>
      )}
    </div>
  );
}

export function ElegantGifts({
  message,
  envelopeMessage,
  bankAccounts,
  yape,
  suggestions,
  suggestionIcons,
  texts,
}: {
  message?: string;
  envelopeMessage?: string;
  bankAccounts?: BankAccount[];
  yape?: YapeAccount;
  suggestions?: string[];
  suggestionIcons?: Record<string, string>;
  texts: WeddingTexts;
}) {
  if (
    !message &&
    !bankAccounts?.length &&
    !yape &&
    !suggestions?.length &&
    !envelopeMessage
  ) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden px-4 py-14 sm:py-20">
      <FloralCluster className="pointer-events-none absolute -left-14 top-10 h-44 w-auto opacity-70" />
      <FloralCluster
        flip
        className="pointer-events-none absolute -right-14 bottom-12 h-44 w-auto opacity-70"
      />

      <div className="relative mx-auto max-w-3xl">
        <SectionHeading
          eyebrow={texts.gifts.eyebrow}
          title={texts.gifts.title}
          subtitle={message}
        />

        {bankAccounts && bankAccounts.length > 0 && (
          <div className="mt-11 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {bankAccounts.map((account) => (
              <BankCard
                key={`${account.bank}-${account.accountNumber}`}
                account={account}
                texts={texts}
              />
            ))}
          </div>
        )}

        {suggestions && suggestions.length > 0 && (
          <div className="elegant-card relative mt-5 overflow-hidden rounded-sm px-6 py-7 text-center">
            <BotanicalCorner className="pointer-events-none absolute left-1 top-1 h-10 w-10 opacity-78" />
            <RoseBloom className="pointer-events-none absolute -bottom-5 -right-4 h-20 w-20 opacity-85" />
            <Butterfly className="pointer-events-none absolute right-6 top-4 h-5 w-6 rotate-12 opacity-78" />
            <div className="flex items-center justify-center gap-2">
              <Gift className="h-4 w-4" style={{ color: "var(--elegant-sage-deep)" }} />
              <p
                className="elegant-eyebrow text-[0.66rem]"
                style={{ color: "var(--inv-accent)" }}
              >
                {texts.gifts.suggestionsTitle}
              </p>
            </div>

            <GoldDivider className="my-5" />

            <div className="mt-6 flex flex-wrap justify-center gap-2.5">
              {suggestions.map((suggestion) => {
                const iconSrc = suggestionIcons?.[suggestion];
                return (
                  <span
                    key={suggestion}
                    className="flex basis-[calc(50%-0.3125rem)] flex-col items-center justify-start gap-2 rounded-sm px-3 py-3.5 sm:basis-[calc(33.333%-0.417rem)]"
                    style={{
                      border: "1px solid var(--elegant-line)",
                      background: "rgba(242, 235, 221, 0.55)",
                    }}
                  >
                    {iconSrc ? (
                      <span className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-white/60">
                        <Image
                          src={iconSrc}
                          alt={suggestion}
                          fill
                          sizes="48px"
                          className="object-contain p-1.5"
                        />
                      </span>
                    ) : (
                      <SuggestionIcon label={suggestion} className="h-5 w-5" />
                    )}
                    <span
                      className="text-[0.82rem] leading-snug"
                      style={{ color: "var(--inv-text-muted)" }}
                    >
                      {suggestion}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {yape && (
          <div className="elegant-card relative mt-5 overflow-hidden rounded-sm px-5 py-6 sm:px-7 sm:py-7">
            <BotanicalCorner className="pointer-events-none absolute left-1 top-1 h-10 w-10 opacity-78" />
            <Butterfly
              flip
              className="pointer-events-none absolute bottom-3 right-4 h-4 w-5 -rotate-12 opacity-78"
            />
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
              <span className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl shadow-[0_10px_24px_-12px_rgba(40,10,20,0.45)] ring-1 ring-black/5 sm:h-28 sm:w-28">
                <Image
                  src={yape.image}
                  alt={texts.gifts.yapeTitle}
                  fill
                  sizes="(max-width: 640px) 96px, 112px"
                  className="object-cover"
                />
              </span>
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <p
                  className="elegant-eyebrow text-[0.66rem]"
                  style={{ color: "var(--inv-accent)" }}
                >
                  {texts.gifts.yapeTitle}
                </p>
                {yape.holder && (
                  <>
                    <p
                      className="mt-2 text-[0.6rem] uppercase tracking-[0.22em]"
                      style={{ color: "var(--inv-text-muted)" }}
                    >
                      {texts.gifts.holderLabel}
                    </p>
                    <p
                      className="font-elegant-display text-xl leading-tight"
                      style={{ color: "var(--inv-text)" }}
                    >
                      {yape.holder}
                    </p>
                  </>
                )}
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "var(--inv-text-muted)" }}
                >
                  {yape.note ?? texts.gifts.yapeNote}
                </p>
              </div>
            </div>

            {yape.phone && (
              <div
                className="mt-3"
                style={{ borderTop: "1px solid var(--elegant-line)" }}
              >
                <CopyRow
                  label={texts.gifts.yapePhoneLabel}
                  value={yape.phone}
                  copiedLabel={texts.gifts.copied}
                  copyLabel={texts.gifts.copy}
                />
              </div>
            )}

            <p
              className="mx-auto mt-3 max-w-md rounded-sm px-4 py-2.5 text-center text-[0.85rem] italic leading-relaxed"
              style={{
                color: "var(--inv-text-muted)",
                background: "rgba(242, 235, 221, 0.6)",
                border: "1px dashed var(--elegant-line)",
              }}
            >
              {yape.message ?? texts.gifts.yapeMessage}
            </p>
          </div>
        )}

        {envelopeMessage && (
          <div
            className="relative mx-auto mt-7 max-w-2xl overflow-hidden rounded-sm px-6 py-6 text-center"
            style={{
              border: "1px dashed var(--elegant-line-strong)",
              background: "rgba(242, 235, 221, 0.4)",
            }}
          >
            <BotanicalSprig className="mx-auto h-6 w-14" />
            <RoseBloom
              tone="cream"
              className="pointer-events-none absolute -bottom-4 -left-3 h-16 w-16 opacity-78"
            />
            <p
              className="elegant-eyebrow text-[0.65rem]"
              style={{ color: "var(--inv-accent)" }}
            >
              {texts.gifts.envelopeTitle}
            </p>
            <p
              className="mt-3 text-base italic leading-relaxed"
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
