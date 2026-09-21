import Image from "next/image";
import { Section } from "./Section";

const DEFAULT_ICON = "/invitaciones/ximena-cahuana-xv/img/icono-sobre-anfora.png";

const DEFAULT_MESSAGE_1 =
  "En tu silla encontrarás un sobre especial. Si lo deseas, podrás hacerle un regalo voluntario a la quinceañera en efectivo o a través de Yape, escaneando el QR que encontrarás dentro del sobre.";

const DEFAULT_MESSAGE_2 =
  "No olvides escribirle tus deseos: al finalizar tu participación, deposita el sobre en la ánfora dispuesta especialmente para ella.";

export function GiftEnvelope({
  icon = DEFAULT_ICON,
  message,
  backgroundImage = "/invitaciones/demo-quince/img/papel-fondo.png",
}: {
  icon?: string;
  message?: string;
  backgroundImage?: string;
}) {
  return (
    <Section backgroundImage={backgroundImage} fullWidth>
      {/* Ícono: sobre depositándose en una ánfora */}
      <Image
        src={icon}
        alt="Sobre depositándose en una ánfora"
        width={980}
        height={1240}
        className="w-15 md:w-28 h-auto mx-auto mb-5 drop-shadow-lg"
      />

      <p className="uppercase tracking-[0.3em] text-sm md:text-base font-bold text-white/75 mb-4 text-xl"
            style={{ fontFamily: "var(--font-cinematic-display)" }}
            >
        Un regalo para la quinceañera
      </p>

      {message ? (
        <p className="text-xl sm:text-3xl md:text-4xl text-gold/100"
                style={{
                  fontFamily: "var(--font-cinematic-display)",
                  letterSpacing: "0.05em",
                }}>
          {message}
        </p>
      ) : (
        <>
          <p className="text-black font-semibold text-[1.5rem] md:text-lg max-w-md mx-auto mb-4">
            {DEFAULT_MESSAGE_1}
          </p>
          <p className="text-black font-semibold text-[1.5rem] md:text-lg max-w-md mx-auto">
            {DEFAULT_MESSAGE_2}
          </p>
        </>
      )}
    </Section>
  );
}
