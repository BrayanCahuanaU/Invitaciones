"use client";

import { useEffect, useRef } from "react";

/**
 * Fondo de video de la invitación.
 *
 * El encuadre completo se muestra con `object-contain` (nunca se recorta) y
 * detrás se coloca una copia desenfocada con `object-cover` para rellenar los
 * laterales. Así el video se ve entero tanto en móvil como en escritorio.
 *
 * Los navegadores (y sobre todo iOS en modo de bajo consumo) pueden bloquear
 * el autoplay aunque el video esté silenciado. Por eso reintentamos `play()`
 * al abrir la invitación, al volver a la pestaña y con el primer gesto.
 */
export function ElegantBackgroundVideo({
  mobile,
  desktop,
}: {
  mobile?: string;
  desktop?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const videos = Array.from(
      container.querySelectorAll<HTMLVideoElement>("video")
    );
    if (videos.length === 0) return;

    const playAll = () => {
      videos.forEach((video) => {
        video.muted = true;
        const attempt = video.play();
        if (attempt) attempt.catch(() => {});
      });
    };

    playAll();

    const onVisibility = () => {
      if (!document.hidden) playAll();
    };

    const cleanupGesture = () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("keydown", onGesture);
    };

    const onGesture = () => {
      playAll();
      cleanupGesture();
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("invitation:opened", playAll);
    window.addEventListener("pointerdown", onGesture);
    window.addEventListener("touchstart", onGesture);
    window.addEventListener("keydown", onGesture);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("invitation:opened", playAll);
      cleanupGesture();
    };
  }, [mobile, desktop]);

  if (!mobile && !desktop) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-[100dvh] w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #5A1A2B 0%, #4A1424 55%, #3A0E1B 100%)",
      }}
    >
      {/* Relleno desenfocado: cubre los laterales sin recortar el encuadre principal. */}
      {mobile && (
        <video
          src={mobile}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          disablePictureInPicture
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl md:hidden"
        />
      )}
      {desktop && (
        <video
          src={desktop}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          disablePictureInPicture
          className="absolute inset-0 hidden h-full w-full scale-110 object-cover blur-2xl md:block"
        />
      )}

      {/* Video completo, sin recortes. */}
      {mobile && (
        <video
          src={mobile}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          disablePictureInPicture
          className="absolute inset-0 h-full w-full object-cover md:hidden"
        />
      )}
      {desktop && (
        <video
          src={desktop}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          disablePictureInPicture
          className="absolute inset-0 hidden h-full w-full object-cover md:block"
        />
      )}

      {/* Velo guinda suave para que los textos marfil sigan siendo legibles. */}
      <div className="absolute inset-0 bg-[#3A0E1B]/30" />
    </div>
  );
}
