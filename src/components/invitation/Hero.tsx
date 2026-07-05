import Image from "next/image";
import { Section } from "./Section";

export function Hero({
  photo,
  protagonists,
  motivo,
}: {
  photo: string;
  protagonists: string;
  motivo: string;
}) {
  return (
    <Section className="pt-0">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
        <Image src={photo} alt={protagonists} fill className="object-cover" priority />
      </div>
      <p className="font-display italic mt-8 text-lg text-[var(--inv-text-muted)]">
        {motivo}
      </p>
      <h1 className="font-display text-5xl mt-2">{protagonists}</h1>
    </Section>
  );
}
