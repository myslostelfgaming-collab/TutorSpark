export default function Pill({ children, color = "#7C6FCD" }) {
  return (
    <span
      style={{
        background: color + "22",
        color,
        fontSize: 11,
        fontWeight: 700,
        padding: "4px 9px",
        borderRadius: 999,
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      {children}
    </span>
  );
}