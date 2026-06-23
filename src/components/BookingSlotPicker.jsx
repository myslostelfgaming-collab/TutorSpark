import {
  formatSlotDate,
  formatSlotTimeRange,
} from "../data/calendarUtils";
import { C } from "../data/theme";

export default function BookingSlotPicker({
  selectedSession,
  availableSlots,
  selectedSlotId,
  selectedSlot,
  onSelectSlot,
}) {
  return (
    <div style={{ marginTop: 22 }}>
      <label
        style={{
          display: "block",
          color: C.white,
          fontWeight: 900,
          marginBottom: 8,
        }}
      >
        Choose an available slot
      </label>

      {!selectedSession && (
        <div
          style={{
            background: C.surface,
            border: `1px dashed ${C.border}`,
            borderRadius: 14,
            padding: 16,
            color: C.muted,
            lineHeight: 1.6,
          }}
        >
          Choose a session type first, then available calendar slots will appear
          here.
        </div>
      )}

      {selectedSession && availableSlots.length === 0 && (
        <div
          style={{
            background: C.surface,
            border: `1px dashed ${C.border}`,
            borderRadius: 14,
            padding: 16,
            color: C.muted,
            lineHeight: 1.6,
          }}
        >
          No available slots for this tutor and session type in the current demo
          week.
        </div>
      )}

      {selectedSession && availableSlots.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 10,
          }}
        >
          {availableSlots.map((slot) => {
            const isSelected = slot.id === selectedSlotId;

            return (
              <button
                key={slot.id}
                onClick={() => onSelectSlot(slot.id)}
                style={{
                  background: isSelected ? C.spark : C.surface,
                  color: isSelected ? "#000" : C.text,
                  border: `1px solid ${isSelected ? C.spark : C.border}`,
                  borderRadius: 12,
                  padding: 12,
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <div style={{ fontWeight: 950 }}>
                  {formatSlotDate(slot.startTime)}
                </div>
                <div
                  style={{
                    color: isSelected ? "#000" : C.muted,
                    fontSize: 13,
                    marginTop: 4,
                  }}
                >
                  {formatSlotTimeRange(slot)}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {selectedSlot && (
        <div
          style={{
            marginTop: 16,
            background: C.spark + "18",
            border: `1px solid ${C.spark}`,
            borderRadius: 14,
            padding: 14,
            color: C.text,
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: C.white }}>Selected slot:</strong>{" "}
          {formatSlotDate(selectedSlot.startTime)},{" "}
          {formatSlotTimeRange(selectedSlot)}
        </div>
      )}
    </div>
  );
}