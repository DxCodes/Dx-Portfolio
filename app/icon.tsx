import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        color: "#fff",
        borderRadius: 8,
        fontSize: 22,
        fontWeight: 700,
        borderBottom: "4px solid #ff5a0a",
      }}
    >
      {site.name[0]}
    </div>,
    { ...size },
  );
}
