import { useState } from "react";

const sessions = [
  {
    date: "Mar 03", day: "Tue",
    topic: "Basic Electronics & Components",
    video: "Electronic Basics #4: Resistors",
    channel: "GreatScott!",
    duration: "7 min",
    url: "https://www.youtube.com/watch?v=7w5I-KbJ1Sg",
    tag: "THEORY", tagColor: "#3B82F6",
    verified: true,
    note: "GreatScott's 50-video 'Electronic Basics' series. Watch #4 (resistors) then #5 (capacitors) back to back."
  },
  {
    date: "Mar 05", day: "Thu",
    topic: "Circuit Design & Safety Protocols",
    video: "Electronic Basics playlist — schematic & safety",
    channel: "GreatScott!",
    duration: "~10 min",
    url: "https://www.youtube.com/@greatscottlab",
    tag: "THEORY", tagColor: "#3B82F6",
    verified: false,
    note: "Go to GreatScott's channel → 'Electronic Basics' playlist → find the schematic symbols episode."
  },
  {
    date: "Mar 06", day: "Fri",
    topic: "Intro to Microcontrollers (Arduino/ESP)",
    video: "Electronic Basics #6: Standalone Arduino Circuit",
    channel: "GreatScott!",
    duration: "8 min",
    url: "https://www.youtube.com/watch?v=J3DYgzRvLT8",
    tag: "HANDS-ON", tagColor: "#10B981",
    verified: true,
    note: "Zero to first working standalone Arduino circuit in 8 minutes. Confirmed video."
  },
  {
    date: "Mar 08", day: "Sun",
    topic: "Programming Fundamentals (C++) — Part 1",
    video: "C++ Tutorial for Beginners — Full Course",
    channel: "freeCodeCamp",
    duration: "4 hrs",
    url: "https://www.youtube.com/watch?v=vLnPwxZdW4Y",
    tag: "FULL COURSE", tagColor: "#EF4444",
    verified: true,
    note: "Watch only the first 1.5 hours for Part 1. Variables, types, operators, basic I/O."
  },
  {
    date: "Mar 10", day: "Tue",
    topic: "Programming Fundamentals (C++) — Part 2",
    video: "C++ Tutorial for Beginners — Full Course (cont.)",
    channel: "freeCodeCamp",
    duration: "4 hrs",
    url: "https://www.youtube.com/watch?v=vLnPwxZdW4Y",
    tag: "FULL COURSE", tagColor: "#EF4444",
    verified: true,
    note: "Same video — continue from 1:30. Functions, arrays, pointers, OOP basics."
  },
  {
    date: "Mar 12", day: "Thu",
    topic: "Control Structures & Logic",
    video: "C++ series — conditionals & loops episodes",
    channel: "The Cherno",
    duration: "~15 min",
    url: "https://www.youtube.com/@TheCherno",
    tag: "THEORY", tagColor: "#3B82F6",
    verified: false,
    note: "Go to The Cherno → C++ series playlist → episodes on 'conditionals' and 'loops'. Best C++ teacher on YouTube."
  },
  {
    date: "Mar 13", day: "Fri",
    topic: "Introduction to Sensors (IR/Reflectance)",
    video: "Arduino IR Sensor tutorials (embedded video + code)",
    channel: "How To Mechatronics",
    duration: "~10 min",
    url: "https://howtomechatronics.com/tutorials/arduino/",
    tag: "HANDS-ON", tagColor: "#10B981",
    verified: false,
    note: "Tutorial page — search 'IR sensor'. Embedded video + full wiring diagram + Arduino code, all in one page."
  },
  {
    date: "Mar 15", day: "Sun",
    topic: "Motor Control Theory & PWM",
    video: "Electronic Basics #8: LEDs & PWM",
    channel: "GreatScott!",
    duration: "8 min",
    url: "https://www.youtube.com/watch?v=Qlayua3yjuE",
    tag: "THEORY", tagColor: "#3B82F6",
    verified: true,
    note: "PWM explained through LED dimming — same PWM principle used for motor speed control."
  },
  {
    date: "Mar 17", day: "Tue",
    topic: "H-Bridges & Motor Drivers",
    video: "Arduino DC Motor Control — L298N Tutorial",
    channel: "How To Mechatronics",
    duration: "~12 min",
    url: "https://howtomechatronics.com/tutorials/arduino/arduino-dc-motor-control-tutorial-l298n-pwm-h-bridge/",
    tag: "HANDS-ON", tagColor: "#10B981",
    verified: true,
    note: "Direct page link. H-bridge theory → L298N wiring → full tested Arduino code. Exactly what you'll build."
  },
  {
    date: "Mar 19", day: "Thu",
    topic: "Power Management & Batteries (LiPo Safety)",
    video: "LiPo Battery Safety (search on channel)",
    channel: "RCModelReviews",
    duration: "~18 min",
    url: "https://www.youtube.com/@RCModelReviews",
    tag: "⚠️ SAFETY", tagColor: "#F59E0B",
    verified: false,
    note: "MANDATORY for entire team before handling any battery. Search 'LiPo safety' on this channel. Prevents fires."
  },
  {
    date: "Mar 20", day: "Fri",
    topic: "PCB Design Fundamentals",
    video: "KiCad beginner PCB tutorial",
    channel: "Phil's Lab",
    duration: "~30 min",
    url: "https://www.youtube.com/@PhilsLab",
    tag: "HANDS-ON", tagColor: "#10B981",
    verified: false,
    note: "#1 PCB channel on YouTube. Go to channel → search 'KiCad beginner'. Open KiCad and follow along."
  },
  {
    date: "Mar 22", day: "Sun",
    topic: "PCB Design — Practical Workshop",
    video: "PCB layout rules & tips",
    channel: "Phil's Lab",
    duration: "~22 min",
    url: "https://www.youtube.com/@PhilsLab",
    tag: "HANDS-ON", tagColor: "#10B981",
    verified: false,
    note: "Same channel → search 'PCB layout tips'. Watch BEFORE routing your first trace. Saves hours of rework."
  },
  {
    date: "Mar 24", day: "Tue",
    topic: "Mechanical Design Principles & CAD",
    video: "Fusion 360 for Absolute Beginners",
    channel: "Product Design Online",
    duration: "~38 min",
    url: "https://www.youtube.com/@ProductDesignOnline",
    tag: "HANDS-ON", tagColor: "#10B981",
    verified: false,
    note: "#1 Fusion 360 beginner channel. Search 'complete beginner tutorial' on their channel page."
  },
  {
    date: "Mar 26", day: "Thu",
    topic: "Introduction to Control Systems",
    video: "Control System Lectures playlist",
    channel: "Brian Douglas",
    duration: "~13 min",
    url: "https://www.youtube.com/@BrianBDouglas",
    tag: "THEORY", tagColor: "#3B82F6",
    verified: false,
    note: "THE control systems educator on YouTube. Go to his channel → playlist 'Control System Lectures' → start from #1."
  },
  {
    date: "Mar 27", day: "Fri",
    topic: "PID Control Algorithm — Theory",
    video: "Understanding PID Control, Part 1",
    channel: "MATLAB Official",
    duration: "7 min",
    url: "https://www.youtube.com/watch?v=wkfEZmsQqiA",
    tag: "THEORY", tagColor: "#3B82F6",
    verified: true,
    note: "7 minutes, animated. Confirmed from MathWorks official site. Best PID theory video on all of YouTube. Watch it twice."
  },
  {
    date: "Mar 29", day: "Sun",
    topic: "PID Control Algorithm — Implementation",
    video: "Line follower with PID — full Arduino code",
    channel: "Electronoobs",
    duration: "~25 min",
    url: "https://www.youtube.com/@ELECTRONOOBS",
    tag: "HANDS-ON", tagColor: "#10B981",
    verified: false,
    note: "Builds your exact robot live on camera. Go to Electronoobs → search 'line follower PID arduino'."
  },
  {
    date: "Mar 31", day: "Tue",
    topic: "Sensor Arrays & Advanced Signal Processing",
    video: "QTR sensor array calibration & PID",
    channel: "Electronoobs",
    duration: "~20 min",
    url: "https://www.youtube.com/@ELECTRONOOBS",
    tag: "HANDS-ON", tagColor: "#10B981",
    verified: false,
    note: "Same channel → search 'QTR sensor array'. Pololu QTR-8 setup, calibration, weighted position reading."
  },
  {
    date: "Apr 02", day: "Thu",
    topic: "Advanced Line Following Algorithms",
    video: "Fast line follower — optimization & tuning",
    channel: "Electronoobs",
    duration: "~20 min",
    url: "https://www.youtube.com/@ELECTRONOOBS",
    tag: "COMPETITION", tagColor: "#EC4899",
    verified: false,
    note: "Search 'fast line follower' on Electronoobs. Speed tuning, curve strategy, Kp/Kd for competition tracks."
  },
  {
    date: "Apr 03", day: "Fri",
    topic: "Competition Strategy & Phase 1 Review",
    video: "Line follower competition recordings",
    channel: "YouTube Search",
    duration: "varies",
    url: "https://www.youtube.com/results?search_query=line+follower+robot+competition+fastest",
    tag: "COMPETITION", tagColor: "#EC4899",
    verified: true,
    note: "Watch 3–4 real competition videos. Study the fastest robots — chassis design, sensor placement, corner speed."
  }
];

export default function App() {
  const [filter, setFilter] = useState("ALL");
  const [hovered, setHovered] = useState(null);

  const tags = ["ALL", "THEORY", "HANDS-ON", "FULL COURSE", "⚠️ SAFETY", "COMPETITION"];
  const filtered = filter === "ALL" ? sessions : sessions.filter(s => s.tag === filter);

  return (
    <div style={{ minHeight: "100vh", background: "#0B0F1A", fontFamily: "'Courier New', monospace" }}>
      {/* Header */}
      <div style={{
        background: "#0D1321", borderBottom: "2px solid #F5A623",
        padding: "32px 28px 22px", position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 6 }}>
            <span style={{ background: "#F5A623", color: "#0B0F1A", fontWeight: 900, fontSize: 10, letterSpacing: 3, padding: "3px 9px", borderRadius: 2 }}>NLFRC 2026</span>
            <span style={{ color: "#2A3A58", fontSize: 10, letterSpacing: 2 }}>MAR 03 → APR 03 · 19 SESSIONS</span>
          </div>
          <h1 style={{ color: "#FFF", fontSize: "clamp(18px, 3.5vw, 30px)", fontWeight: 900, margin: "0 0 3px", letterSpacing: -0.5 }}>ONE VIDEO PER SESSION</h1>
          <p style={{ color: "#2A3A58", fontSize: 11, margin: "0 0 16px" }}>Click any row → opens on YouTube</p>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {tags.map(t => (
              <button key={t} onClick={() => setFilter(t)} style={{
                padding: "5px 12px", border: filter === t ? "1.5px solid #F5A623" : "1.5px solid #1A2538",
                background: filter === t ? "#F5A623" : "transparent",
                color: filter === t ? "#0B0F1A" : "#3A5070",
                borderRadius: 3, fontSize: 9, fontWeight: 700, letterSpacing: 1.5,
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.12s",
              }}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "18px 18px 60px" }}>
        {filtered.map(s => {
          const idx = sessions.indexOf(s);
          const isOn = hovered === idx;
          return (
            <a key={idx} href={s.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}
              onMouseEnter={() => setHovered(idx)} onMouseLeave={() => setHovered(null)}>
              <div style={{
                display: "grid", gridTemplateColumns: "76px 1fr 58px",
                gap: "0 16px", padding: "16px 18px", marginBottom: 5,
                background: isOn ? "#111827" : "#0C1120",
                border: isOn ? "1.5px solid #F5A623" : "1.5px solid #141E30",
                borderRadius: 5, cursor: "pointer", transition: "all 0.12s",
                transform: isOn ? "translateX(3px)" : "none",
              }}>
                {/* Date */}
                <div>
                  <div style={{ color: "#F5A623", fontSize: 13, fontWeight: 900 }}>{s.date}</div>
                  <div style={{ color: "#1E2C44", fontSize: 9, letterSpacing: 1 }}>{s.day}</div>
                  <div style={{ marginTop: 8, display: "inline-block", padding: "2px 5px", background: s.tagColor + "15", border: `1px solid ${s.tagColor}35`, borderRadius: 2, color: s.tagColor, fontSize: 7, fontWeight: 700, letterSpacing: 1 }}>{s.tag}</div>
                </div>
                {/* Content */}
                <div>
                  <div style={{ color: "#253550", fontSize: 9, letterSpacing: 1.5, marginBottom: 3 }}>{s.topic.toUpperCase()}</div>
                  <div style={{ color: isOn ? "#F5A623" : "#BDC8E0", fontSize: 14, fontWeight: 700, marginBottom: 4, lineHeight: 1.3, transition: "color 0.12s" }}>
                    ▶  {s.video}
                    {s.verified && <span style={{ marginLeft: 8, fontSize: 9, color: "#10B981", fontWeight: 700 }}>✓ DIRECT LINK</span>}
                  </div>
                  <div style={{ color: "#253550", fontSize: 10, marginBottom: 6 }}>{s.channel}</div>
                  <div style={{ color: "#2A4060", fontSize: 11, lineHeight: 1.6, borderLeft: "2px solid #141E30", paddingLeft: 8 }}>{s.note}</div>
                </div>
                {/* Duration */}
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: isOn ? "#F5A623" : "#1E2C44", fontSize: 11, fontWeight: 700, transition: "color 0.12s" }}>{s.duration}</div>
                  <div style={{ color: "#141E30", marginTop: 4, fontSize: 14 }}>→</div>
                </div>
              </div>
            </a>
          );
        })}

        {/* Footer */}
        <div style={{ marginTop: 32, padding: "16px 18px", border: "1px solid #141E30", borderRadius: 5, background: "#0C1120" }}>
          <div style={{ color: "#F5A623", fontSize: 9, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>LINK TYPES</div>
          <div style={{ color: "#2A4060", fontSize: 11, lineHeight: 2 }}>
            <span style={{ color: "#10B981" }}>✓ DIRECT LINK</span> → opens the exact video immediately.<br/>
            <span style={{ color: "#6B7FA8" }}>Channel links</span> → go to the channel, use the search bar to find the right video using the note text.<br/>
            <span style={{ color: "#6B7FA8" }}>Tutorial page links</span> → page has embedded video + wiring + code together.<br/>
            <span style={{ color: "#F59E0B" }}>⚠️ SAFETY</span> → mandatory for every team member before March 19.
          </div>
        </div>
      </div>
    </div>
  );
}
