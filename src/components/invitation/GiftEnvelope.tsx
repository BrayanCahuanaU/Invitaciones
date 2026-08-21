import { MailOpen, Amphora } from "lucide-react";
import { Section } from "./Section";

export function GiftEnvelope() {
  return (
    <Section>
      {/* Ícono: sobre depositándose en una ánfora */}
      <div className="relative w-16 h-16 mx-auto mb-5">
        <MailOpen className="absolute left-1/2 top-0 -translate-x-1/2 rotate-[18deg] w-6 h-6 text-[#C0C0C0]/60 z-10" />
        <Amphora className="absolute left-1/2 bottom-0 -translate-x-1/2 w-10 h-10 text-[#C0C0C0]" />
      </div>

      <p className="font-display text-3xl md:text-4xl mb-6">
        Un regalo para la quinceañera
      </p>

      <p className="text-[var(--inv-text-muted)] max-w-md mx-auto mb-4">
        En tu silla encontrarás un sobre especial. Si lo deseas, podrás hacerle
        un regalo voluntario a la quinceañera en efectivo o a través de Yape,
        escaneando el QR que encontrarás dentro del sobre.
      </p>
      <p className="text-[var(--inv-text-muted)] max-w-md mx-auto">
        No olvides escribirle tus deseos: al finalizar tu participación,
        deposita el sobre en la ánfora dispuesta especialmente para ella.
      </p>
    </Section>
  );
}
