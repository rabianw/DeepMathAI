import { ImageResponse } from "next/og";

export const alt = "DeepMathAI Research Group — Naresuan University";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background:
            "linear-gradient(135deg, #0a1628 0%, #0c1a30 55%, #08221f 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", height: "8px", width: "1040px", background: "linear-gradient(90deg,#3b82f6,#14b8a6)", position: "absolute", top: 0, left: 0, right: 0 }} />
        <div style={{ display: "flex", alignItems: "center", gap: "26px", marginBottom: "30px" }}>
          <div
            style={{
              width: 104,
              height: 104,
              borderRadius: 26,
              display: "flex",
              background: "linear-gradient(135deg,#3b82f6,#14b8a6)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: "#93c5fd", letterSpacing: 2 }}>
              RESEARCH GROUP
            </div>
            <div style={{ fontSize: 24, color: "#5eead4", letterSpacing: 3 }}>
              NARESUAN UNIVERSITY
            </div>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 124, fontWeight: 800, color: "#e2e8f0", lineHeight: 1 }}>
          DeepMathAI
        </div>
        <div style={{ display: "flex", fontSize: 40, color: "#cbd5e1", marginTop: 26 }}>
          Deep Mathematical Modeling for Machine Learning &amp; AI
        </div>
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#5eead4", marginTop: 40 }}>
          deepmathai.ai
        </div>
      </div>
    ),
    { ...size }
  );
}
