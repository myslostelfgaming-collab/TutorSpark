export default function Avatar({ initials, color }) {
  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: color + "25",
        border: `2px solid ${color}`,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 900,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}