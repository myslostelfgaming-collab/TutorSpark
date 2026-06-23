export default function NavButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? "#F5A623" : "#14142A",
        color: active ? "#000" : "#E8E6F4",
        border: `1px solid ${active ? "#F5A623" : "#1E1E3A"}`,
        borderRadius: 12,
        padding: "10px 14px",
        fontWeight: 800,
        cursor: "pointer",
        fontFamily: "inherit",
      }}
    >
      {label}
    </button>
  );
}