export default function Logo({ size = 44 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 14,
        display: "grid",
        placeItems: "center",
        border: "1px solid rgba(255,255,255,0.16)",
        background: "rgba(255,255,255,0.06)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        fontWeight: 900,
        letterSpacing: "-0.02em",
      }}
      aria-label="Logo"
      title="CANCIONES"
    >
      <span style={{ fontSize: 16 }}>C★</span>
    </div>
  );
}