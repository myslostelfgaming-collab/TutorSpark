import { C } from "../data/theme";

export default function CalendarViewToggle({ calendarView, onChange }) {
  return (
    <div>
      <div style={{ color: C.white, fontWeight: 900, marginBottom: 8 }}>
        Calendar view
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["month", "week", "day"].map((view) => (
          <button
            key={view}
            onClick={() => onChange(view)}
            style={{
              background: calendarView === view ? C.spark : C.surface,
              color: calendarView === view ? "#000" : C.text,
              border: `1px solid ${
                calendarView === view ? C.spark : C.border
              }`,
              borderRadius: 10,
              padding: "9px 12px",
              fontWeight: 900,
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {view}
          </button>
        ))}
      </div>
    </div>
  );
}