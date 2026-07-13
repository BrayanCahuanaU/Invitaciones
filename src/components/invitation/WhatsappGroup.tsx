"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MessageCircle, Users } from "lucide-react";
import { Section } from "./Section";

interface Meta {
  title: string;
  description: string;
  image: string;
}

export function WhatsappGroup({
  url,
  fallbackName,
  fallbackPhoto,
  fallbackDescription,
}: {
  url?: string;
  fallbackName?: string;
  fallbackPhoto?: string;
  fallbackDescription?: string;
}) {
  const [meta, setMeta] = useState<Meta | null>(null);

  useEffect(() => {
    if (!url) return;
    fetch(`/api/whatsapp-meta?url=${encodeURIComponent(url)}`)
      .then((r) => r.json())
      .then((data: Meta) => setMeta(data))
      .catch(() => {});
  }, [url]);

  if (!url) return null;

  const name = meta?.title || fallbackName || "Grupo del evento";
  const description = meta?.description || fallbackDescription || "";
  const image = meta?.image || fallbackPhoto || "";
  const hasImage = image && image.length > 0;

  return (
    <Section>
      <p className="font-display text-2xl md:text-3xl mb-4">
        Únete al grupo del evento
      </p>

      <div className="rounded-xl border border-[var(--inv-accent)]/15 bg-[var(--inv-surface)]/60 backdrop-blur-sm overflow-hidden max-w-sm mx-auto text-left">
        <div className="relative w-full h-36 overflow-hidden bg-[#25D366]/10 flex items-center justify-center">
          {hasImage ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <MessageCircle className="w-16 h-16 text-[#25D366]/30" />
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#25D366]/15 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
            </div>
            <div className="min-w-0">
              <p className="font-display text-lg truncate">{name}</p>
              {description && description !== "WhatsApp Group Invite" && (
                <p className="text-[var(--inv-text-muted)] text-xs truncate">
                  {description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[var(--inv-text-muted)] text-xs mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Grupo de WhatsApp</span>
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-full bg-[#25D366] text-white px-6 py-2.5 font-medium hover:brightness-110 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            Unirse al grupo
          </a>
        </div>
      </div>
    </Section>
  );
}
