import { ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
  backgroundImage,
  backgroundImageMobile,
  fullWidth,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  backgroundImage?: string;
  backgroundImageMobile?: string;
  fullWidth?: boolean;
}) {
  if (fullWidth && backgroundImage) {
    return (
      <section
        id={id}
        className={`relative w-full py-50 md:py-36 lg:py-44 text-center overflow-hidden ${className}`}
      >
        {backgroundImageMobile ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center md:hidden"
              style={{
                backgroundImage: `url(${backgroundImageMobile})`,
                zIndex: 0,
              }}
            />
            <div
              className="absolute inset-0 bg-cover bg-center hidden md:block"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                zIndex: 0,
              }}
            />
          </>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              zIndex: 0,
            }}
          />
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 lg:px-16">
          {children}
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      className={`w-full max-w-md mx-auto px-6 py-14 text-center md:max-w-2xl md:px-10 md:py-16 lg:max-w-4xl lg:px-16 lg:py-20 ${className}`}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "1rem",
              overflow: "hidden",
            }
          : undefined
      }
    >
      {children}
    </section>
  );
}
