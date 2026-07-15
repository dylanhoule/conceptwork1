import { mkdir, writeFile } from "fs/promises";
import path from "path";

/** Dev-only: receives a canvas dataURL from /dev/model and writes the hero poster. */
export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }
  const { dataUrl } = (await req.json()) as { dataUrl?: string };
  const match = /^data:image\/png;base64,(.+)$/.exec(dataUrl ?? "");
  if (!match) {
    return Response.json({ ok: false, error: "expected a png data URL" }, { status: 400 });
  }
  const dir = path.join(process.cwd(), "public", "posters");
  await mkdir(dir, { recursive: true });
  const file = path.join(dir, "hero-poster.png");
  await writeFile(file, Buffer.from(match[1], "base64"));
  return Response.json({ ok: true, file });
}
