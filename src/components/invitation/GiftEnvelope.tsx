import Image from "next/image";
import { Section } from "./Section";

export function GiftEnvelope() {
  return (
    <Section backgroundImage="/invitaciones/demo-quince/img/papel-fondo.png" fullWidth>
      {/* Ícono: sobre depositándose en una ánfora */}
      <Image
        src="/invitaciones/ximena-cahuana-xv/img/icono-sobre-anfora.png"
        alt="Sobre depositándose en una ánfora"
        width={1080}
        height={1440}
        className="w-24 md:w-28 h-auto mx-auto mb-5 drop-shadow-lg"
      />

      <p className="font-script font-bold text-black text-4xl md:text-5xl mb-6">
        Un regalo para la quinceañera
      </p>

      <p className="text-black font-semibold text-[1.1875rem] md:text-lg max-w-md mx-auto mb-4">
        En tu silla encontrarás un sobre especial. Si lo deseas, podrás hacerle
        un regalo voluntario a la quinceañera en efectivo o a través de Yape,
        escaneando el QR que encontrarás dentro del sobre.
      </p>
      <p className="text-black font-semibold text-[1.1875rem] md:text-lg max-w-md mx-auto">
        No olvides escribirle tus deseos: al finalizar tu participación,
        deposita el sobre en la ánfora dispuesta especialmente para ella.
      </p>
    </Section>
  );
}
