import { inputStyle } from "../data/theme";

export default function BookingDetailsForm({
  currentUser,
  isStudent,
  topic,
  notes,
  onTopicChange,
  onNotesChange,
}) {
  return (
    <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
      <input
        value={
          isStudent
            ? currentUser.name
            : "Switch to a student account to book"
        }
        disabled
        placeholder="Learner name"
        style={{
          ...inputStyle,
          opacity: 0.8,
          cursor: "not-allowed",
        }}
      />

      <input
        value={topic}
        onChange={(event) => onTopicChange(event.target.value)}
        placeholder="Preferred subject/topic"
        style={inputStyle}
      />

      <textarea
        value={notes}
        onChange={(event) => onNotesChange(event.target.value)}
        placeholder="Anything the tutor should know?"
        style={{
          ...inputStyle,
          minHeight: 100,
          resize: "vertical",
        }}
      />
    </div>
  );
}