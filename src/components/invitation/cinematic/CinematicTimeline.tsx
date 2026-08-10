import { Clock } from "lucide-react";
import { TimelineItem } from "@/content/types";

export function CinematicTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="w-full max-w-md mx-auto px-6 py-14 md:max-w-2xl md:px-10 md:py-16 lg:max-w-4xl lg:px-16 lg:py-20">
      <div className="flex items-center justify-center mb-2">
        <Clock className="w-5 h-5 text-[#C0C0C0]" />
      </div>
      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-14 text-center"
        style={{
          fontFamily: "var(--font-cinematic-display)",
          letterSpacing: "0.05em",
        }}
      >
        Programa del Evento
      </h2>

      <div className="relative">
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#E8E8E8] via-[#C0C0C0] to-[#808080]" />

        {items.map((item, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div
              key={i}
              className={`relative flex items-start mb-8 sm:mb-10 ${
                isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
              }`}
            >
              <div className="hidden sm:block sm:w-1/2" />

              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#C0C0C0] border-2 border-[#090909] shadow-[0_0_10px_rgba(192,192,192,0.5)] z-10" />

              <div className={`ml-10 sm:ml-0 sm:w-1/2 ${isLeft ? "sm:pl-8" : "sm:pr-8"}`}>
                <div className="cinematic-card rounded-xl p-4 sm:p-5 transition-all duration-300 hover:border-[#C0C0C0]/30">
                  <span
                    className="text-lg sm:text-xl font-bold text-[#C0C0C0]"
                    style={{ fontFamily: "var(--font-cinematic-display)" }}
                  >
                    {item.time}
                  </span>
                  <h3
                    className="text-lg sm:text-xl font-bold text-[#F2F2F2] mt-1"
                    style={{ fontFamily: "var(--font-cinematic-display)" }}
                  >
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-[#A8A8A8] mt-1">{item.description}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
