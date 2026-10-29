# Invitaciones

Plataforma de invitaciones digitales (XV años, bodas, cumpleaños) en Next.js.
Un solo proyecto/deploy en Vercel sirve a todos los clientes: cada invitación
es una ruta `/{slug}` generada a partir de datos, no una app aparte.

## Estructura

```
src/content/{slug}/data.ts   → datos de cada invitación (texto, fechas, rutas de media)
src/content/types.ts         → esquema (InvitationData)
src/content/registry.ts      → mapa slug -> data (agregar 1 línea por cliente nuevo)
src/themes/                  → paletas visuales reutilizables entre clientes
src/components/invitation/   → secciones (Hero, Countdown, RSVPForm, SongVoting, etc.)
src/app/[slug]/page.tsx      → arma la invitación según el slug
src/app/api/rsvp/            → confirmaciones (Redis)
src/app/api/songs/           → búsqueda (Deezer) + ranking de canciones (Redis)
public/invitaciones/{slug}/  → fotos/videos propios de cada invitación
```

## Agregar un cliente nuevo

1. `mkdir src/content/nombre-slug` y crea `data.ts` copiando `demo-quince/data.ts`.
2. Sube sus fotos/video a `public/invitaciones/nombre-slug/`.
3. Agrega la línea en `src/content/registry.ts` (import + entrada en el objeto).
4. Si el estilo visual es nuevo, crea un archivo en `src/themes/` y regístralo en `src/themes/registry.ts`.
5. Trabaja en una rama (`feature/nombre-slug`) y haz push: Vercel genera un
   **Preview Deployment** con URL propia para que el cliente revise antes de
   publicar, sin tocar producción.
6. Al aprobar, merge a `main`: Vercel despliega producción y la URL final del
   cliente es `tudominio.com/nombre-slug`. Las invitaciones ya entregadas
   siguen funcionando igual (son datos estáticos, no se "bajan").

## Invitación de boda (layout `elegant`)

La boda de Yeny Taco & Hernan Luque está en `/boda-demo` (slug de trabajo) y
usa el layout claro `elegant` con el tema `botanical-garden` (papel crema,
follaje verde salvia, flores en tono rubor y filetes dorados). Los datos están
en `src/content/boda-demo/data.ts`.

- Todo el contenido editable está en `data.ts`: novios, padres de ambos,
  padrinos (por cargo o en una sola lista), ceremonia civil y/o religiosa,
  recepción, itinerario, regalos, indicaciones y confirmación.
- Los textos de la plantilla (títulos de sección, botones, etiquetas del
  formulario, mensajes) están en `wedding.texts` dentro del mismo `data.ts`.
  Se pueden sobreescribir todos o solo algunos; los que falten usan los
  valores por defecto de `src/content/wedding-texts.ts`. Los componentes de
  `src/components/invitation/elegant/` no contienen copy fijo.
- `wedding.ceremonies` es un arreglo: puedes dejar solo la civil, solo la
  iglesia, o ambas.
- La portada, el sobre y las secciones usan ilustraciones botánicas SVG
  (`Ornaments.tsx`), así que no dependen de imágenes externas.
- `wedding.cardBackground` permite usar una textura de papel propia en las
  tarjetas del layout; por ejemplo
  `"/invitaciones/boda-demo/papel-fondo.png"`.
- `wedding.heroEmblem` reemplaza el monograma de la portada por una imagen
  (por ejemplo, las argollas): `"/invitaciones/boda-demo/argollas.png"`.
- `wedding.footerEmblem` reemplaza el monograma del footer por una imagen
  (por ejemplo, las palomas): `"/invitaciones/boda-demo/palomas.png"`.
- `backgroundVideo` define el video de fondo de la invitación abierta (queda
  fijo al hacer scroll). Se puede usar el mismo archivo en móvil y escritorio
  o variantes distintas:
  ```ts
  backgroundVideo: {
    mobile: "/invitaciones/boda-demo/fondo.mp4",
    desktop: "/invitaciones/boda-demo/fondo.mp4",
  },
  ```
  Con video activo se desactiva la textura de papel de la página y se añade un
  velo crema suave para mantener la legibilidad del texto.
- Para una foto en la portada, sube la imagen a
  `public/invitaciones/boda-demo/` y coloca la ruta en `hero.photo`; aparece
  como medallón sobre los nombres.
- `wedding.envelopeAudio` es el sonido de la primera pantalla (sobre cerrado).
  Se intenta reproducir al cargar y, si el navegador lo bloquea, arranca con el
  primer toque o con el botón de sonido del sobre. Al abrir la invitación se
  desvanece y entra la música de fondo.
- Para música de fondo, sube un mp3 y define `backgroundMusic` en `data.ts`;
  aparece un botón flotante para reproducir/pausar. En esta boda la bendición
  del sobre es `bendicion.mp3` y la música de la invitación abierta es
  `hijo-de-la-luna.mp3`.
- Los adornos florales son SVG y viven en
  `src/components/invitation/elegant/Ornaments.tsx` (`FloralCluster`,
  `RoseBloom`, `Butterfly`, `LeafGarland`, `BabyBreath`, además de las ramas y
  coronas existentes).
- Para revisar el diseño sin abrir el sobre: `/boda-demo?preview=1`.
- Para una boda real, duplica la carpeta con el slug definitivo, cambia
  `slug` en `data.ts` y regístralo en `src/content/registry.ts`.

## Variables de entorno

Ver `.env.example`. Se configuran **una sola vez** en Vercel (Project Settings
→ Environment Variables) y valen para todas las invitaciones, porque el
ranking de canciones y las confirmaciones se separan internamente por slug
(`songs:{slug}`, `rsvp:{slug}`).

## Notas de escala

- **Bandwidth**: si hay video/audio pesado con autoplay y las invitaciones se
  viralizan por WhatsApp, considera mover esos archivos a un CDN externo
  (Cloudinary, Bunny.net) en vez de `public/`, para no agotar el plan de Vercel.
- **Build time**: con muchas decenas de invitaciones el build estático crece.
  Si se vuelve lento, se puede pasar `[slug]` a renderizado dinámico
  (`export const dynamicParams = true` sin `generateStaticParams` completo).
- **Canciones**: la búsqueda usa la API pública de Deezer (sin key). Si se
  necesita catálogo más amplio, se puede migrar a Spotify Web API en
  `src/app/api/songs/search/route.ts` sin tocar el resto.
