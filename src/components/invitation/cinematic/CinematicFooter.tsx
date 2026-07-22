import { SocialLink } from "@/content/types";
import { Heart } from "lucide-react";

function getSocialIcon(platform: string) {
  const icons: Record<string, string> = {
    instagram: "IG",
    tiktok: "TK",
    facebook: "FB",
    youtube: "YT",
    twitter: "X",
  };
  return icons[platform.toLowerCase()] ?? platform.slice(0, 2).toUpperCase();
}

export function CinematicFooter({
  hostName,
  hostRelation,
  socialLinks,
}: {
  hostName: string;
  hostRelation?: string;
  socialLinks?: SocialLink[];
}) {
  return (
    <footer className="relative w-full border-t border-[#4A4A4A] bg-[#090909]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#4E0B18]/10 pointer-events-none" />

      <div className="relative max-w-md mx-auto px-6 py-12 md:max-w-2xl md:px-10 lg:max-w-4xl lg:px-16">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-4 h-4 text-[#A81835]" />
          <p
            className="text-lg sm:text-xl font-bold text-[#F2F2F2]"
            style={{ fontFamily: "var(--font-cinematic-display)" }}
          >
            {hostName}
          </p>
        </div>

        {hostRelation && (
          <p className="text-center text-xs uppercase tracking-widest text-[#A8A8A8] mb-6">
            {hostRelation}
          </p>
        )}

        {socialLinks && socialLinks.length > 0 && (
          <div className="flex items-center justify-center gap-4 mb-8">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#4A4A4A] bg-[#171717] flex items-center justify-center text-xs font-bold text-[#D8A718] hover:border-[#D8A718] hover:bg-[#D8A718]/10 transition-all duration-300"
              >
                {getSocialIcon(link.platform)}
              </a>
            ))}
          </div>
        )}

        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-[#4A4A4A]">
            Hecho con{" "}
            <span className="text-[#A81835]">&#9829;</span>{" "}
            para celebrar a Ximena
          </p>
        </div>
      </div>
    </footer>
  );
}
