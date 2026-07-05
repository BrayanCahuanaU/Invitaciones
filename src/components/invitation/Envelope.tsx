"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type Stage = "closed" | "opening" | "open";

export function Envelope({
  closedImage,
  openVideo,
  protagonists,
  children,
}: {
  closedImage: string;
  openVideo: string;
  protagonists: string;
  children: React.ReactNode;
}) {
  const [stage, setStage] = useState<Stage>("closed");
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleOpen() {
    setStage("opening");
    videoRef.current?.play();
  }

  if (stage === "open") {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-50 bg-[var(--inv-bg)] text-[var(--inv-text)]">
      {stage === "closed" && (
        <button
          onClick={handleOpen}
          aria-label={`Abrir invitación de ${protagonists}`}
          className="relative h-full w-full block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--inv-accent)]"
        >
          <Image
            src={closedImage}
            alt=""
            fill
            priority
            className="object-cover"
          />
          <span className="absolute inset-x-0 bottom-16 text-center">
            <span className="inline-block rounded-full border border-[var(--inv-accent)] px-6 py-2 text-sm tracking-widest uppercase bg-black/30 backdrop-blur-sm">
              Toca para abrir
            </span>
          </span>
        </button>
      )}

      <video
        ref={videoRef}
        src={openVideo}
        muted
        playsInline
        className={`absolute inset-0 h-full w-full object-cover ${
          stage === "opening" ? "block" : "hidden"
        }`}
        onEnded={() => setStage("open")}
      />
    </div>
  );
}
