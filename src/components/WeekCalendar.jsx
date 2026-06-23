import TimetableEventCard from "./TimetableEventCard";
import { C } from "../data/theme";

const DEFAULT_START_HOUR = 8;
const DEFAULT_END_HOUR = 20;

function pad(value) {
  return String(value).padStart(2, "0");
}

function getDateKey(dateTime) {
  return typeof dateTime === "string" ? dateTime.slice(0, 10) : "";
}

function getHourFromDateTime(dateTime) {
  const date = new Date(dateTime);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.getHours();
}

function getHourKey(dateTime) {
  const hour = getHourFromDateTime(dateTime);

  if (hour === null) {
    return "";
  }

  return `${pad(hour)}:00`;
}

function getTimeSlots(events) {
  const hours = new Set();

  for (let hour = DEFAULT_START_HOUR; hour <= DEFAULT_END_HOUR; hour += 1) {
    hours.add(hour);
  }

  events.forEach((event) => {
    const hour = getHourFromDateTime(event.startTime);

    if (hour !== null) {
      hours.add(hour);
    }
  });

  return [...hours]
    .sort((a, b) => a - b)
    .map((hour) => `${pad(hour)}:00`);
}

function sortByStartTime(events) {
  return [...events].sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export default function WeekCalendar({
  weekDays,
  visibleEvents,
  currentUser,
  onUpdateBookingStatus,
  onRemoveAdvertisedSession,
}) {
  const timeSlots = getTimeSlots(visibleEvents);

  return (
    <div
      style={{
        overflowX: "auto",
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        background: C.bg,
      }}
    >
      <div
        style={{
          minWidth: 980,
          display: "grid",
          gridTemplateColumns: `84px repeat(${weekDays.length}, minmax(120px, 1fr))`,
        }}
      >
        <div
          style={{
            position: "sticky",
            left: 0,
            zIndex: 3,
            background: C.bg,
            borderRight: `1px solid ${C.border}`,
            borderBottom: `1px solid ${C.border}`,
            padding: 12,
            color: C.muted,
            fontSize: 12,
            fontWeight: 900,
          }}
        >
          Time
        </div>

        {weekDays.map((day) => (
          <div
            key={day.date}
            style={{
              background: C.surface,
              borderBottom: `1px solid ${C.border}`,
              borderRight: `1px solid ${C.border}`,
              padding: 12,
              minHeight: 58,
            }}
          >
            <div style={{ color: C.white, fontWeight: 950 }}>{day.label}</div>
            <div style={{ color: C.muted, fontSize: 12 }}>{day.date}</div>
          </div>
        ))}

        {timeSlots.map((timeSlot) => (
          <>
            <div
              key={`${timeSlot}-label`}
              style={{
                position: "sticky",
                left: 0,
                zIndex: 2,
                background: C.bg,
                borderRight: `1px solid ${C.border}`,
                borderBottom: `1px solid ${C.border}`,
                padding: "12px 10px",
                color: C.muted,
                fontSize: 12,
                fontWeight: 900,
                minHeight: 96,
              }}
            >
              {timeSlot}
            </div>

            {weekDays.map((day) => {
              const cellEvents = sortByStartTime(
                visibleEvents.filter(
                  (event) =>
                    getDateKey(event.startTime) === day.date &&
                    getHourKey(event.startTime) === timeSlot
                )
              );

              return (
                <div
                  key={`${day.date}-${timeSlot}`}
                  style={{
                    borderRight: `1px solid ${C.border}`,
                    borderBottom: `1px solid ${C.border}`,
                    padding: 8,
                    minHeight: 96,
                    background:
                      cellEvents.length > 0 ? C.card : "rgba(255,255,255,0.01)",
                  }}
                >
                  {cellEvents.length > 0 ? (
                    cellEvents.map((event) => (
                      <TimetableEventCard
                        key={event.id}
                        event={event}
                        currentUser={currentUser}
                        onUpdateBookingStatus={onUpdateBookingStatus}
                        onRemoveAdvertisedSession={onRemoveAdvertisedSession}
                      />
                    ))
                  ) : (
                    <div
                      style={{
                        height: "100%",
                        minHeight: 72,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
}