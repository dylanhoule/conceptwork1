import { ImageResponse } from "next/og";
import { site } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

/** Social share card, generated in code — no raster asset to maintain. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a0c10",
          backgroundImage:
            "radial-gradient(600px 400px at 15% 20%, rgba(87,184,255,0.22), transparent), radial-gradient(600px 400px at 85% 85%, rgba(255,158,69,0.2), transparent)",
          color: "#eef3f8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 14,
              height: 72,
              borderRadius: 7,
              background: "linear-gradient(180deg, #57b8ff, #ff9e45)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: 2 }}>
              {site.shortName.toUpperCase()}
            </div>
            <div style={{ fontSize: 18, letterSpacing: 6, color: "#98a3b3" }}>
              HEATING &amp; AIR
            </div>
          </div>
        </div>

        <div style={{ fontSize: 88, fontWeight: 800, marginTop: 48, lineHeight: 1.05 }}>
          {site.tagline}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 56 }}>
          <div
            style={{
              display: "flex",
              backgroundColor: "#eef3f8",
              color: "#0a0c10",
              borderRadius: 999,
              padding: "18px 40px",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            {`Call ${site.phoneDisplay}`}
          </div>
          <div style={{ fontSize: 24, color: "#98a3b3" }}>
            {`24/7 emergency · ${site.serviceArea}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
