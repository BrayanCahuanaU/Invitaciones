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
