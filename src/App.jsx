import { useState } from "react";
import Avatar from "./components/Avatar";
import Pill from "./components/Pill";
import NavButton from "./components/NavButton";
import { tutors } from "./data/mockTutors";

const C = {
  bg: "#080810",
  surface: "#0F0F1E",
  card: "#14142A",
  border: "#1E1E3A",
  spark: "#F5A623",
  violet: "#7C6FCD",
  green: "#4ADE80",
  blue: "#60A5FA",
  text: "#E8E6F4",
  muted: "#6B6A8A",
  white: "#FFFFFF",
};

const inputStyle = {
  background: C.surface,
  color: C.text,
  border: `1px solid ${C.border}`,
  borderRadius: 10,
  padding: "12px 14px",
  fontSize: 14,
  fontFamily: "inherit",
};

function HomePage({ setPage }) {
  return (
    <section>
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontSize: 56,
            fontWeight: 950,
            letterSpacing: 2,
            color: C.white,
          }}
        >
          BUZA
        </div>
        <div
          style={{
            color: C.spark,
            fontSize: 24,
            fontWeight: 900,
            marginTop: 4,
          }}
        >
          Uzothola.
        </div>
        <div style={{ color: C.muted, fontSize: 18, marginTop: 8 }}>
          Helping you find your way.
        </div>
      </div>

      <div
        style={{
          background: `linear-gradient(160deg, ${C.card}, ${C.surface})`,
          border: `1px solid ${C.border}`,
          borderRadius: 20,
          padding: 24,
          maxWidth: 720,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 28, color: C.white }}>
          South African tutoring, matched.
        </h1>
        <p style={{ color: C.muted, lineHeight: 1.7, marginTop: 12 }}>
          BUZA helps learners and parents find trusted tutors for school
          subjects, exam preparation, and focused one-on-one support.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 22 }}>
          <button
            onClick={() => setPage("discover")}
            style={{
              background: C.spark,
              color: "#000",
              border: "none",
              borderRadius: 12,
              padding: "12px 18px",
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            Find a tutor
          </button>

          <button
            onClick={() => setPage("booking")}
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
            Book a session
          </button>
        </div>
      </div>
    </section>
  );
}

function DiscoverPage({ setPage }) {
  return (
    <section>
      <h1 style={{ color: C.white, marginTop: 0 }}>Discover Tutors</h1>
      <p style={{ color: C.muted }}>
        Start with a small trusted tutor list. Later this will connect to Supabase.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
          marginTop: 22,
        }}
      >
        {tutors.map((tutor) => (
          <div
            key={tutor.id}
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              padding: 18,
            }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Avatar initials={tutor.initials} color={tutor.color} />
              <div>
                <div style={{ fontWeight: 900, color: C.white }}>
                  {tutor.name}
                </div>
                <div style={{ color: C.muted, fontSize: 13 }}>
                  {tutor.grades} · {tutor.location}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 14 }}>
              {tutor.subjects.map((subject) => (
                <Pill key={subject}>{subject}</Pill>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 16,
                color: C.text,
              }}
            >
              <span>★ {tutor.rating}</span>
              <strong style={{ color: C.spark }}>R{tutor.price}/hr</strong>
            </div>

            <button
              onClick={() => setPage("profile")}
              style={{
                width: "100%",
                marginTop: 14,
                background: C.spark,
                color: "#000",
                border: "none",
                borderRadius: 10,
                padding: "10px 12px",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              View profile
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function TutorProfilePage({ setPage }) {
  const tutor = tutors[0];

  return (
    <section>
      <h1 style={{ color: C.white, marginTop: 0 }}>Tutor Profile</h1>

      <div
        style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 18,
          padding: 22,
          maxWidth: 720,
        }}
      >
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <Avatar initials={tutor.initials} color={tutor.color} />
          <div>
            <h2 style={{ margin: 0, color: C.white }}>{tutor.name}</h2>
            <div style={{ color: C.muted }}>
              {tutor.grades} · {tutor.location}
            </div>
          </div>
        </div>

        <p style={{ color: C.text, lineHeight: 1.7, marginTop: 18 }}>
          Experienced tutor focused on clear explanations, exam preparation,
          and helping learners build confidence step by step.
        </p>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {tutor.subjects.map((subject) => (
            <Pill key={subject}>{subject}</Pill>
          ))}
          <Pill color={C.green}>Verified</Pill>
          <Pill color={C.blue}>Online</Pill>
        </div>

        <button
          onClick={() => setPage("booking")}
          style={{
            marginTop: 22,
            background: C.spark,
            color: "#000",
            border: "none",
            borderRadius: 12,
            padding: "12px 18px",
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          Book this tutor
        </button>
      </div>
    </section>
  );
}

function BookingPage() {
  return (
    <section>
      <h1 style={{ color: C.white, marginTop: 0 }}>Book a Session</h1>
      <div
        style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 18,
          padding: 22,
          maxWidth: 620,
        }}
      >
        <p style={{ color: C.muted, lineHeight: 1.7 }}>
          This will become the booking flow. For now, it proves the screen exists.
        </p>

        <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
          <input placeholder="Learner name" style={inputStyle} />
          <input placeholder="Subject" style={inputStyle} />
          <input placeholder="Preferred day/time" style={inputStyle} />
          <textarea placeholder="What do you need help with?" style={inputStyle} />
        </div>

        <button
          style={{
            marginTop: 16,
            background: C.spark,
            color: "#000",
            border: "none",
            borderRadius: 12,
            padding: "12px 18px",
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          Request booking
        </button>
      </div>
    </section>
  );
}

function SessionsPage() {
  return (
    <section>
      <h1 style={{ color: C.white, marginTop: 0 }}>Sessions</h1>
      <div
        style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 18,
          padding: 22,
          maxWidth: 620,
        }}
      >
        <p style={{ color: C.muted }}>
          Upcoming and completed sessions will appear here.
        </p>

        <div
          style={{
            marginTop: 16,
            padding: 14,
            borderRadius: 12,
            background: C.surface,
            border: `1px solid ${C.border}`,
          }}
        >
          <strong style={{ color: C.white }}>Mathematics revision</strong>
          <div style={{ color: C.muted, fontSize: 13 }}>
            Dr. Amara Osei · Wednesday · 17:00
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [page, setPage] = useState("home");

  const pages = {
    home: <HomePage setPage={setPage} />,
    discover: <DiscoverPage setPage={setPage} />,
    profile: <TutorProfilePage setPage={setPage} />,
    booking: <BookingPage />,
    sessions: <SessionsPage />,
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: C.bg,
        color: C.text,
        fontFamily: "Inter, Segoe UI, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "24px 18px 90px",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            alignItems: "center",
            marginBottom: 26,
          }}
        >
          <div>
            <div style={{ fontSize: 28, fontWeight: 950, color: C.white }}>
              BUZA
            </div>
            <div style={{ color: C.spark, fontWeight: 800 }}>Uzothola.</div>
            <div style={{ color: C.muted, fontSize: 13 }}>
              Helping you find your way.
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <NavButton
              label="Home"
              active={page === "home"}
              onClick={() => setPage("home")}
            />
            <NavButton
              label="Discover"
              active={page === "discover"}
              onClick={() => setPage("discover")}
            />
            <NavButton
              label="Sessions"
              active={page === "sessions"}
              onClick={() => setPage("sessions")}
            />
            <NavButton
              label="Book"
              active={page === "booking"}
              onClick={() => setPage("booking")}
            />
          </div>
        </header>

        {pages[page]}
      </div>
    </main>
  );
}

export default App;