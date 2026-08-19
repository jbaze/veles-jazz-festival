import { getEvent, getEvents } from "@/lib/content";
import { eventToIcs } from "@/lib/ics";

/** Statically generated add-to-calendar files, one per dated event. */

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getEvents()
    .filter((e) => e.date)
    .map((e) => ({ slug: e.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event?.date) return new Response("Not found", { status: 404 });
  return new Response(eventToIcs(event), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${slug}.ics"`,
    },
  });
}
