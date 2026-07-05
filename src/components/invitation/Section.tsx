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
      className={`w-full max-w-md mx-auto px-6 py-14 text-center ${className}`}
    >
      {children}
    </section>
  );
}
