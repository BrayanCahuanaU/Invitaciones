import Image from "next/image";
import { GuestArtist } from "@/content/types";

export function GuestArtists({ artists }: { artists: GuestArtist[] }) {
  return (
    <div className="w-full max-w-md mx-auto px-6 py-14 md:max-w-2xl md:px-10 md:py-16 lg:max-w-4xl lg:px-16 lg:py-20">
      <p className="uppercase tracking-[0.3em] text-xs text-[#A8A8A8] mb-2">
        Invitados Especiales
      </p>
      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-14"
        style={{
          fontFamily: "var(--font-cinematic-display)",
          letterSpacing: "0.05em",
        }}
      >
        Artistas Invitados
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <div
            key={artist.name}
            className="cinematic-card group relative overflow-hidden rounded-2xl border border-[#4A4A4A] bg-[#252525] p-4 transition-all duration-500 hover:border-[#A81835]/50 hover:shadow-[0_0_30px_rgba(168,24,53,0.15)]"
          >
            {artist.photo && (
              <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-xl">
                <Image
                  src={artist.photo}
                  alt={artist.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/80 to-transparent" />
              </div>
            )}
            <h3
              className="text-xl sm:text-2xl font-bold text-[#F2F2F2] mb-1"
              style={{ fontFamily: "var(--font-cinematic-display)" }}
            >
              {artist.name}
            </h3>
            {artist.role && (
              <p className="text-xs uppercase tracking-widest text-[#D8A718]">{artist.role}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
