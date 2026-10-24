import { NextRequest, NextResponse } from "next/server";
import { getInvitationExportData } from "@/lib/invitation-export-data";
import {
  buildExportFilename,
  buildInvitationWorkbook,
} from "@/lib/invitation-export-workbook";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/export?slug=luciana-xv
 *
 * En una sola petición devuelve el Excel con la lista de invitados
 * (sin nombres duplicados) y, en otra hoja, el ranking de canciones.
 */
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug")?.trim();
  if (!slug) {
    return NextResponse.json({ error: "Falta el parámetro slug." }, { status: 400 });
  }

  try {
    const data = await getInvitationExportData(slug);
    if (!data) {
      return NextResponse.json(
        { error: "La invitación indicada no existe." },
        { status: 404 }
      );
    }

    const workbook = await buildInvitationWorkbook(data);
    const filename = buildExportFilename(data);

    return new Response(new Uint8Array(workbook), {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="invitados-${slug}.xlsx"; filename*=UTF-8''${encodeURIComponent(
          filename
        )}`,
        "Content-Length": String(workbook.byteLength),
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("[export GET]", error);
    return NextResponse.json(
      { error: "No se pudo generar el archivo. Intenta nuevamente." },
      { status: 500 }
    );
  }
}
