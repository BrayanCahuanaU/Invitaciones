import Image from "next/image";
import { SocialLink } from "@/content/types";
import { Heart } from "lucide-react";

export function CinematicFooter({
  hostName,
  hostRelation,
  socialLinks,
  background,
  backgroundMobile,
}: {
  hostName: string;
  hostRelation?: string;
  socialLinks?: SocialLink[];
  background?: string;
  backgroundMobile?: string;
}) {
  return (
    <footer className="relative w-full border-t border-[#4A4A4A] bg-[#090909] overflow-hidden">

      {backgroundMobile && (
        <div className="absolute inset-0 w-full h-full md:hidden">
          <Image
            src={backgroundMobile}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}
      {background && (
        <div className="absolute inset-0 w-full h-full hidden md:block">
          <Image
            src={background}
            alt=""
            fill
            className="object-contain object-bottom"
            sizes="100vw"
          />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090909]/60 via-transparent to-[#090909]/80 pointer-events-none" />

      <div className="relative max-w-md mx-auto px-6 py-12 md:max-w-2xl md:px-10 lg:max-w-4xl lg:px-16">
        <div className="flex flex-col items-center justify-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-[#C0C0C0]" />
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
                className="w-10 h-10 rounded-full border border-[#4A4A4A] bg-[#171717] flex items-center justify-center hover:border-[#C0C0C0] hover:bg-[#C0C0C0]/10 transition-all duration-300"
              >
                {link.logo ? (
                  <Image src={link.logo} alt={link.platform} width={20} height={20} className="object-contain" />
                ) : (
                  <span className="text-xs font-bold text-[#C0C0C0]">{link.platform.slice(0, 2).toUpperCase()}</span>
                )}
              </a>
            ))}
          </div>
        )}

      </div>
    </footer>
  );
}
