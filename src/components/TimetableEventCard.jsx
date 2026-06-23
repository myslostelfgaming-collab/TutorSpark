import { tutors } from "../data/mockTutors";
import { C } from "../data/theme";

function getTutor(tutorId) {
  return tutors.find((tutor) => tutor.id === tutorId) ?? null;
}

function getSessionType(tutor, sessionTypeId) {
  return tutor?.sessionTypes.find((session) => session.id === sessionTypeId) ?? null;
}

function formatTime(dateTime) {
  return new Date(dateTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusColor(status) {
  if (status === "confirmed") return C.green;
  if (status === "pending") return C.spark;
  if (status === "advertised") return C.blue;
  if (status === "available") return C.green;
  if (status === "declined") return "#F87171";
  if (status === "cancelled") return "#F87171";
  if (status === "blocked") return C.muted;
  return C.muted;
}

function getEventTitle(event, sessionType) {
  if (event.kind === "availability") return event.title;
  if (event.kind === "blocked") return event.title;
  if (event.kind === "group") return event.title;
  return sessionType?.title ?? "Session";
}

function getTooltipText(event, title) {
  return `${formatTime(event.startTime)} – ${formatTime(event.endTime)} · ${title} · ${event.status}`;
}

export default function TimetableEventCard({
  event,
  compact = false,
  onSelectEvent,
}) {
  const tutor = getTutor(event.tutorId);
  const sessionType = getSessionType(tutor, event.sessionTypeId);
  const title = getEventTitle(event, sessionType);
  const color = statusColor(event.status);

  return (
    <button
      type="button"
      title={getTooltipText(event, title)}
      onClick={(clickEvent) => {
        if (typeof onSelectEvent === "function") {
          onSelectEvent(event, clickEvent.currentTarget.getBoundingClientRect());
        }
      }}
      style={{
        width: "100%",
        height: "100%",
        background: C.surface,
        color: C.text,
        border: `1px solid ${C.border}`,
        borderLeft: `4px solid ${color}`,
        borderRadius: 10,
        padding: compact ? 6 : 9,
        textAlign: "left",
        cursor: "pointer",
        fontFamily: "inherit",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          color: C.white,
          fontWeight: 950,
          fontSize: compact ? 11 : 12,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {formatTime(event.startTime)} – {formatTime(event.endTime)}
      </div>

      <div
        style={{
          color: C.text,
          fontWeight: 850,
          marginTop: 3,
          fontSize: compact ? 11 : 12,
          lineHeight: 1.25,
          display: "-webkit-box",
          WebkitLineClamp: compact ? 1 : 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: "inline-flex",
          color,
          background: color + "22",
          borderRadius: 999,
          padding: compact ? "2px 6px" : "3px 7px",
          fontSize: compact ? 9 : 10,
          fontWeight: 900,
          marginTop: 5,
          textTransform: "capitalize",
          maxWidth: "100%",
        }}
      >
        {event.status}
      </div>
    </button>
  );
}