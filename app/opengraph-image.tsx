import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          background: "#1c1a17",
          color: "#f5f1ea",
        }}
      >
        <div
          style={{
            fontSize: 20,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#a6813c",
          }}
        >
          Las Vegas · Summerlin · Queensridge
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.15,
            maxWidth: 980,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 30,
            color: "#c9c2b4",
            maxWidth: 900,
          }}
        >
          {SITE_TAGLINE}
        </div>
      </div>
    ),
    { ...size }
  );
}
