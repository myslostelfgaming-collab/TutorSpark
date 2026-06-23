import { useState } from "react";
import { C, inputStyle } from "../data/theme";

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function toDateTime(date, time) {
  return `${date}T${time}:00`;
}

function isValidTimeRange(startTime, endTime) {
  return startTime && endTime && startTime < endTime;
}

export default function TutorCalendarEditor({
  currentUser,
  onAddAvailabilityWindow,
  onAddBlockedTime,
}) {
  const [availableTitle, setAvailableTitle] = useState(
    "Available for 1-on-1 lessons"
  );
  const [availableDate, setAvailableDate] = useState("2026-06-26");
  const [availableStart, setAvailableStart] = useState("13:00");
  const [availableEnd, setAvailableEnd] = useState("15:00");

  const [blockedReason, setBlockedReason] = useState("Unavailable");
  const [blockedDate, setBlockedDate] = useState("2026-06-26");
  const [blockedStart, setBlockedStart] = useState("15:00");
  const [blockedEnd, setBlockedEnd] = useState("16:00");

  const canAddAvailability =
    currentUser.role === "tutor" &&
    availableDate &&
    isValidTimeRange(availableStart, availableEnd);

  const canAddBlockedTime =
    currentUser.role === "tutor" &&
    blockedDate &&
    isValidTimeRange(blockedStart, blockedEnd);

  const addAvailability = () => {
    if (!canAddAvailability) return;

    onAddAvailabilityWindow({
      id: makeId("avail"),
      tutorId: currentUser.tutorId,
      title: availableTitle || "Available",
      startTime: toDateTime(availableDate, availableStart),
      endTime: toDateTime(availableDate, availableEnd),
      status: "available",
    });
  };

  const addBlockedTime = () => {
    if (!canAddBlockedTime) return;

    onAddBlockedTime({
      id: makeId("blocked"),
      tutorId: currentUser.tutorId,
      title: "Unavailable",
      reason: blockedReason || "Unavailable",
      startTime: toDateTime(blockedDate, blockedStart),
      endTime: toDateTime(blockedDate, blockedEnd),
      status: "blocked",
    });
  };

  return (
    <div
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 18,
        padding: 18,
        marginBottom: 18,
      }}
    >
      <h2 style={{ color: C.white, marginTop: 0 }}>Tutor Calendar Editor</h2>

      <p style={{ color: C.muted, lineHeight: 1.6 }}>
        This is a mock tutor-side editor. In the live app, this will save to the
        database and support recurring availability.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
          marginTop: 16,
        }}
      >
        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            padding: 16,
          }}
        >
          <h3 style={{ color: C.white, marginTop: 0 }}>
            Add available teaching window
          </h3>

          <div style={{ display: "grid", gap: 10 }}>
            <input
              value={availableTitle}
              onChange={(event) => setAvailableTitle(event.target.value)}
              placeholder="Availability title"
              style={inputStyle}
            />

            <input
              type="date"
              value={availableDate}
              onChange={(event) => setAvailableDate(event.target.value)}
              style={inputStyle}
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <input
                type="time"
                value={availableStart}
                onChange={(event) => setAvailableStart(event.target.value)}
                style={inputStyle}
              />

              <input
                type="time"
                value={availableEnd}
                onChange={(event) => setAvailableEnd(event.target.value)}
                style={inputStyle}
              />
            </div>

            <button
              onClick={addAvailability}
              disabled={!canAddAvailability}
              style={{
                background: C.green,
                color: "#000",
                border: "none",
                borderRadius: 12,
                padding: "12px 14px",
                fontWeight: 900,
                cursor: canAddAvailability ? "pointer" : "not-allowed",
                opacity: canAddAvailability ? 1 : 0.45,
              }}
            >
              Add availability
            </button>
          </div>
        </div>

        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            padding: 16,
          }}
        >
          <h3 style={{ color: C.white, marginTop: 0 }}>
            Add blocked / unavailable time
          </h3>

          <div style={{ display: "grid", gap: 10 }}>
            <input
              value={blockedReason}
              onChange={(event) => setBlockedReason(event.target.value)}
              placeholder="Reason"
              style={inputStyle}
            />

            <input
              type="date"
              value={blockedDate}
              onChange={(event) => setBlockedDate(event.target.value)}
              style={inputStyle}
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <input
                type="time"
                value={blockedStart}
                onChange={(event) => setBlockedStart(event.target.value)}
                style={inputStyle}
              />

              <input
                type="time"
                value={blockedEnd}
                onChange={(event) => setBlockedEnd(event.target.value)}
                style={inputStyle}
              />
            </div>

            <button
              onClick={addBlockedTime}
              disabled={!canAddBlockedTime}
              style={{
                background: "transparent",
                color: "#F87171",
                border: "1px solid #F87171",
                borderRadius: 12,
                padding: "12px 14px",
                fontWeight: 900,
                cursor: canAddBlockedTime ? "pointer" : "not-allowed",
                opacity: canAddBlockedTime ? 1 : 0.45,
              }}
            >
              Add blocked time
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}