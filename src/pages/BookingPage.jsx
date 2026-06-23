import { useEffect, useMemo, useState } from "react";
import BookingDetailsForm from "../components/BookingDetailsForm";
import BookingSessionSelector from "../components/BookingSessionSelector";
import BookingSlotPicker from "../components/BookingSlotPicker";
import BookingTutorSummary from "../components/BookingTutorSummary";
import TutorPicker from "../components/TutorPicker";
import { getAvailableSlotsForTutor } from "../data/calendarUtils";
import { tutors } from "../data/mockTutors";
import { C } from "../data/theme";

export default function BookingPage({
  currentUser,
  tutorId,
  onSelectTutor,
  setPage,
  extraBookings = [],
  extraAvailabilityWindows = [],
  extraBlockedTimes = [],
  bookingStatusOverrides = {},
  onRequestBooking,
}) {
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");

  const isStudent = currentUser.role === "student";

  const tutor = tutors.find((item) => item.id === tutorId) ?? null;

  const selectedSession =
    tutor?.sessionTypes.find((session) => session.id === selectedSessionId) ??
    null;

  const availableSlots = useMemo(() => {
    if (!tutor || !selectedSession) {
      return [];
    }

    return getAvailableSlotsForTutor({
      tutorId: tutor.id,
      durationMinutes: selectedSession.durationMinutes,
      extraBookings,
      extraAvailabilityWindows,
      extraBlockedTimes,
      bookingStatusOverrides,
    });
  }, [
    tutor,
    selectedSession,
    extraBookings,
    extraAvailabilityWindows,
    extraBlockedTimes,
    bookingStatusOverrides,
  ]);

  const selectedSlot =
    availableSlots.find((slot) => slot.id === selectedSlotId) ?? null;

  const canRequestBooking = isStudent && tutor && selectedSession && selectedSlot;

  const handleRequestBooking = () => {
    if (!canRequestBooking) return;

    onRequestBooking({
      tutorId: tutor.id,
      sessionTypeId: selectedSession.id,
      slot: selectedSlot,
      topic,
      notes,
    });

    setSelectedSessionId("");
    setSelectedSlotId("");
    setTopic("");
    setNotes("");
  };

  useEffect(() => {
    setSelectedSessionId("");
    setSelectedSlotId("");
  }, [tutorId]);

  useEffect(() => {
    setSelectedSlotId("");
  }, [selectedSessionId]);

  return (
    <section>
      <button
        onClick={() => (tutor ? setPage("profile") : setPage("home"))}
        style={{
          background: "transparent",
          border: `1px solid ${C.border}`,
          color: C.muted,
          borderRadius: 10,
          padding: "8px 12px",
          fontWeight: 700,
          cursor: "pointer",
          marginBottom: 16,
        }}
      >
        {tutor ? "← Back to tutor profile" : "← Back to home"}
      </button>

      <h1 style={{ color: C.white, marginTop: 0 }}>Book a Session</h1>

      {!isStudent && (
        <div
          style={{
            background: C.spark + "18",
            border: `1px solid ${C.spark}`,
            borderRadius: 14,
            padding: 14,
            color: C.text,
            lineHeight: 1.6,
            marginBottom: 16,
            maxWidth: 760,
          }}
        >
          You are currently signed in as a tutor. In this prototype, booking
          requests can only be made by student accounts. Switch to a student user
          in the header to test the student booking flow.
        </div>
      )}

      <div
        style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 18,
          padding: 22,
          maxWidth: 760,
        }}
      >
        <div style={{ marginBottom: 18 }}>
          <TutorPicker
            tutors={tutors}
            selectedTutorId={tutorId}
            onSelectTutor={onSelectTutor}
          />
        </div>

        {tutor ? (
          <>
            <BookingTutorSummary tutor={tutor} />

            <BookingSessionSelector
              tutor={tutor}
              selectedSessionId={selectedSessionId}
              selectedSession={selectedSession}
              onSelectSession={setSelectedSessionId}
            />

            <BookingSlotPicker
              selectedSession={selectedSession}
              availableSlots={availableSlots}
              selectedSlotId={selectedSlotId}
              selectedSlot={selectedSlot}
              onSelectSlot={setSelectedSlotId}
            />
          </>
        ) : (
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
            No tutor selected yet. Search above or browse tutor profiles first if
            you want more detail before booking.
          </div>
        )}

        <BookingDetailsForm
          currentUser={currentUser}
          isStudent={isStudent}
          topic={topic}
          notes={notes}
          onTopicChange={setTopic}
          onNotesChange={setNotes}
        />

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
          <button
            onClick={handleRequestBooking}
            disabled={!canRequestBooking}
            style={{
              background: C.spark,
              color: "#000",
              border: "none",
              borderRadius: 12,
              padding: "12px 18px",
              fontWeight: 900,
              cursor: canRequestBooking ? "pointer" : "not-allowed",
              opacity: canRequestBooking ? 1 : 0.45,
            }}
          >
            Request booking
          </button>

          <button
            onClick={() => setPage("discover")}
            style={{
              background: C.card,
              color: C.text,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: "12px 18px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Browse tutors
          </button>
        </div>
      </div>
    </section>
  );
}