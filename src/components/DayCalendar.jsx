import WeekCalendar from "./WeekCalendar";
import { C, inputStyle } from "../data/theme";

function getDateKey(dateTime) {
  return typeof dateTime === "string" ? dateTime.slice(0, 10) : "";
}

export default function DayCalendar({
  weekDays,
  selectedDate,
  onSelectedDateChange,
  visibleEvents,
  currentUser,
  onUpdateBookingStatus,
  onRemoveAdvertisedSession,
}) {
  const selectedDay =
    weekDays.find((day) => day.date === selectedDate) ?? weekDays[0];

  const selectedDayIndex = weekDays.findIndex(
    (day) => day.date === selectedDay.date
  );

  const dayEvents = visibleEvents.filter(
    (event) => getDateKey(event.startTime) === selectedDay.date
  );

  const goToPreviousDay = () => {
    if (selectedDayIndex > 0) {
      onSelectedDateChange(weekDays[selectedDayIndex - 1].date);
    }
  };

  const goToNextDay = () => {
    if (selectedDayIndex < weekDays.length - 1) {
      onSelectedDateChange(weekDays[selectedDayIndex + 1].date);
    }
  };

  return (
    <div>
      <div
        style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 14,
          padding: 14,
          marginBottom: 14,
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          alignItems: "end",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              color: C.white,
              fontWeight: 900,
              fontSize: 13,
              marginBottom: 6,
            }}
          >
            Day
          </label>

          <select
            value={selectedDay.date}
            onChange={(event) => onSelectedDateChange(event.target.value)}
            style={{
              ...inputStyle,
              padding: "9px 10px",
              cursor: "pointer",
            }}
          >
            {weekDays.map((day) => (
              <option key={day.date} value={day.date}>
                {day.label} · {day.date}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={goToPreviousDay}
          disabled={selectedDayIndex <= 0}
          style={{
            background: C.card,
            color: C.text,
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            padding: "10px 12px",
            fontWeight: 900,
            cursor: selectedDayIndex <= 0 ? "not-allowed" : "pointer",
            opacity: selectedDayIndex <= 0 ? 0.45 : 1,
          }}
        >
          ← Previous
        </button>

        <button
          onClick={goToNextDay}
          disabled={selectedDayIndex >= weekDays.length - 1}
          style={{
            background: C.card,
            color: C.text,
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            padding: "10px 12px",
            fontWeight: 900,
            cursor:
              selectedDayIndex >= weekDays.length - 1 ? "not-allowed" : "pointer",
            opacity: selectedDayIndex >= weekDays.length - 1 ? 0.45 : 1,
          }}
        >
          Next →
        </button>

        <div
          style={{
            color: C.muted,
            fontSize: 13,
            lineHeight: 1.5,
            maxWidth: 360,
          }}
        >
          Showing {selectedDay.label}, {selectedDay.date}. {dayEvents.length} item
          {dayEvents.length === 1 ? "" : "s"} for {currentUser.name}.
        </div>
      </div>

      <WeekCalendar
        weekDays={[selectedDay]}
        visibleEvents={dayEvents}
        currentUser={currentUser}
        onUpdateBookingStatus={onUpdateBookingStatus}
        onRemoveAdvertisedSession={onRemoveAdvertisedSession}
      />
    </div>
  );
}