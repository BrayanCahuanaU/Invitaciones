import { ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`w-full max-w-md mx-auto px-6 py-14 text-center md:max-w-2xl md:px-10 md:py-16 lg:max-w-4xl lg:px-16 lg:py-20 ${className}`}
    >
      {children}
    </section>
  );
}
