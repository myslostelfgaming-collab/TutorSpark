import { useState } from "react";
import { C, inputStyle } from "../data/theme";

export default function TutorPicker({ tutors, selectedTutorId, onSelectTutor }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const selectedTutor =
    tutors.find((tutor) => tutor.id === selectedTutorId) ?? null;

  const normalizedQuery = query.trim().toLowerCase();

  const filteredTutors = tutors
    .filter((tutor) => {
      if (!normalizedQuery) return true;

      const searchText = [
        tutor.name,
        tutor.grades,
        tutor.location,
        ...tutor.subjects,
      ]
        .join(" ")
        .toLowerCase();

      return searchText.includes(normalizedQuery);
    })
    .slice(0, 8);

  const chooseTutor = (tutorId) => {
    onSelectTutor(tutorId);
    setQuery("");
    setIsOpen(false);
  };

  const clearTutor = () => {
    onSelectTutor(null);
    setQuery("");
    setIsOpen(true);
  };

  return (
    <div>
      <label
        style={{
          display: "block",
          color: C.white,
          fontWeight: 900,
          marginBottom: 8,
        }}
      >
        Choose a tutor
      </label>

      {selectedTutor && (
        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            padding: 12,
            marginBottom: 10,
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ color: C.white, fontWeight: 900 }}>
              {selectedTutor.name}
            </div>
            <div style={{ color: C.muted, fontSize: 13 }}>
              {selectedTutor.subjects.join(", ")} · {selectedTutor.grades}
            </div>
          </div>

          <button
            onClick={clearTutor}
            style={{
              background: "transparent",
              border: `1px solid ${C.border}`,
              color: C.muted,
              borderRadius: 10,
              padding: "8px 10px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Change
          </button>
        </div>
      )}

      <input
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={
          selectedTutor
            ? "Search for a different tutor..."
            : "Type a tutor name, subject, grade, or location..."
        }
        style={{
          ...inputStyle,
          width: "100%",
        }}
      />

      {isOpen && (
        <div
          style={{
            marginTop: 10,
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          {filteredTutors.length > 0 ? (
            filteredTutors.map((tutor) => (
              <button
                key={tutor.id}
                onClick={() => chooseTutor(tutor.id)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background:
                    tutor.id === selectedTutorId ? C.card : "transparent",
                  color: C.text,
                  border: "none",
                  borderBottom: `1px solid ${C.border}`,
                  padding: "12px 14px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <div style={{ fontWeight: 900, color: C.white }}>
                  {tutor.name}
                </div>
                <div style={{ color: C.muted, fontSize: 13 }}>
                  {tutor.subjects.join(", ")} · {tutor.grades} · {tutor.location}
                </div>
              </button>
            ))
          ) : (
            <div style={{ padding: 14, color: C.muted }}>
              No tutors found. Try another name, subject, grade, or location.
            </div>
          )}
        </div>
      )}
    </div>
  );
}