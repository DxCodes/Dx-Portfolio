import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 96px",
        background: "#000",
        color: "#fff",
        backgroundImage: "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, color: "#22c55e" }}
      >
        <div style={{ width: 14, height: 14, borderRadius: 999, background: "#22c55e" }} />
        {site.badge}
      </div>
      <div style={{ marginTop: 28, fontSize: 96, fontWeight: 700, letterSpacing: -3 }}>
        {`Hi, I am ${site.name}`}
      </div>
      <div style={{ marginTop: 12, fontSize: 44, color: "#8b8b8b" }}>{site.role}</div>
      <div
        style={{
          marginTop: 56,
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: 28,
          color: "#ececec",
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: 999, background: "#ff5a0a" }} />
        {site.domain}
      </div>
    </div>,
    { ...size },
  );
}
