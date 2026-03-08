import { useState } from "react";

const sessions = [
  {
    date: "Mar 03",
    day: "Tue",
    topic: "Basic Electronics & Components",
    video: "Electronics in 15 Minutes",
    channel: "The Organic Chemistry Tutor",
    duration: "15 min",
    url: "https://www.youtube.com/watch?v=r-SCyD4d1Nc",
    tag: "THEORY",
    tagColor: "#3B82F6",
    note: "Covers resistors, capacitors, LEDs, Ohm's law — everything in one shot"
  },
  {
    date: "Mar 05",
    day: "Thu",
    topic: "Circuit Design & Safety Protocols",
    video: "How to Read a Schematic",
    channel: "SparkFun Electronics",
    duration: "12 min",
    url: "https://www.youtube.com/watch?v=9cps7Q_IrX0",
    tag: "THEORY",
    tagColor: "#3B82F6",
    note: "Clean, simple, covers schematic reading + safe circuit building basics"
  },
  {
    date: "Mar 06",
    day: "Fri",
    topic: "Intro to Microcontrollers (Arduino/ESP)",
    video: "Arduino in 100 Seconds",
    channel: "Fireship",
    duration: "2 min",
    url: "https://www.youtube.com/watch?v=1ENiVwk8idM",
    tag: "QUICK",
    tagColor: "#8B5CF6",
    note: "Watch this first (2 min), then follow with DroneBot Workshop full ESP32 intro"
  },
  {
    date: "Mar 08",
    day: "Sun",
    topic: "Programming Fundamentals (C++) — Part 1",
    video: "C++ Tutorial for Beginners — Full Course",
    channel: "freeCodeCamp",
    duration: "4 hrs",
    url: "https://www.youtube.com/watch?v=vLnPwxZdW4Y",
    tag: "FULL COURSE",
    tagColor: "#EF4444",
    note: "Jump to 0:00–1:30 for Part 1 basics. Best free C++ course available"
  },
  {
    date: "Mar 10",
    day: "Tue",
    topic: "Programming Fundamentals (C++) — Part 2",
    video: "C++ Tutorial for Beginners — Full Course",
    channel: "freeCodeCamp",
    duration: "4 hrs",
    url: "https://www.youtube.com/watch?v=vLnPwxZdW4Y",
    tag: "FULL COURSE",
    tagColor: "#EF4444",
    note: "Continue from 1:30 onward — functions, arrays, OOP. Same video, pick up where you left off"
  },
  {
    date: "Mar 12",
    day: "Thu",
    topic: "Control Structures & Logic",
    video: "Digital Logic Design — Combinational Circuits",
    channel: "Neso Academy",
    duration: "20 min",
    url: "https://www.youtube.com/watch?v=q2OBosB1Yv4",
    tag: "THEORY",
    tagColor: "#3B82F6",
    note: "Neso Academy is crystal clear. Covers if/else logic, truth tables, gates"
  },
  {
    date: "Mar 13",
    day: "Fri",
    topic: "Introduction to Sensors (IR/Reflectance)",
    video: "IR Sensor & Line Tracking Sensor — How it Works",
    channel: "How To Mechatronics",
    duration: "11 min",
    url: "https://www.youtube.com/watch?v=TkedMsTLanA",
    tag: "HANDS-ON",
    tagColor: "#10B981",
    note: "Exact sensors you'll use. Covers wiring, Arduino code, and reading values"
  },
  {
    date: "Mar 15",
    day: "Sun",
    topic: "Motor Control Theory & PWM",
    video: "PWM — Pulse Width Modulation Explained",
    channel: "The Engineering Mindset",
    duration: "10 min",
    url: "https://www.youtube.com/watch?v=B_j9Ca7KDUM",
    tag: "THEORY",
    tagColor: "#3B82F6",
    note: "Animated, very visual. Best PWM explanation on YouTube — short and complete"
  },
  {
    date: "Mar 17",
    day: "Tue",
    topic: "H-Bridges & Motor Drivers",
    video: "L298N Motor Driver — How it Works + Arduino",
    channel: "How To Mechatronics",
    duration: "14 min",
    url: "https://www.youtube.com/watch?v=dyjo_ggEtVU",
    tag: "HANDS-ON",
    tagColor: "#10B981",
    note: "Exactly what you'll build. Covers H-bridge concept → real wiring → code"
  },
  {
    date: "Mar 19",
    day: "Thu",
    topic: "Power Management & Batteries (LiPo Safety)",
    video: "LiPo Battery Safety — Everything You Need to Know",
    channel: "RCModelReviews",
    duration: "18 min",
    url: "https://www.youtube.com/watch?v=rEsNFMAnfpY",
    tag: "⚠️ SAFETY",
    tagColor: "#F59E0B",
    note: "MUST WATCH before touching any LiPo. This video literally prevents fires"
  },
  {
    date: "Mar 20",
    day: "Fri",
    topic: "PCB Design Fundamentals",
    video: "KiCad 8 Tutorial — Schematic to PCB (Beginner)",
    channel: "Phil's Lab",
    duration: "30 min",
    url: "https://www.youtube.com/watch?v=C7-8nUU6e3E",
    tag: "HANDS-ON",
    tagColor: "#10B981",
    note: "Phil's Lab is the #1 PCB channel on YouTube. Start here, follow along in KiCad"
  },
  {
    date: "Mar 22",
    day: "Sun",
    topic: "PCB Design — Practical Workshop",
    video: "PCB Layout Tips — 9 Rules I Always Follow",
    channel: "Phil's Lab",
    duration: "22 min",
    url: "https://www.youtube.com/watch?v=7plCSGOKBzY",
    tag: "HANDS-ON",
    tagColor: "#10B981",
    note: "Apply this before you route a single trace. Saves hours of rework"
  },
  {
    date: "Mar 24",
    day: "Tue",
    topic: "Mechanical Design Principles & CAD",
    video: "Fusion 360 for Absolute Beginners",
    channel: "Product Design Online",
    duration: "38 min",
    url: "https://www.youtube.com/watch?v=qvrHuaHhqHI",
    tag: "HANDS-ON",
    tagColor: "#10B981",
    note: "Best beginner Fusion 360 tutorial. You'll design your robot chassis here"
  },
  {
    date: "Mar 26",
    day: "Thu",
    topic: "Introduction to Control Systems",
    video: "Control Systems Lectures — Introduction",
    channel: "Brian Douglas",
    duration: "13 min",
    url: "https://www.youtube.com/watch?v=oBc_BHxw78s",
    tag: "THEORY",
    tagColor: "#3B82F6",
    note: "Brian Douglas is THE control systems guy on YouTube. Crystal clear, no fluff"
  },
  {
    date: "Mar 27",
    day: "Fri",
    topic: "PID Control Algorithm — Theory",
    video: "What is a PID Controller?",
    channel: "MATLAB Official",
    duration: "7 min",
    url: "https://www.youtube.com/watch?v=wkfEZmsQqiA",
    tag: "THEORY",
    tagColor: "#3B82F6",
    note: "7 minutes. Animated. Best PID theory video ever made. Watch it twice"
  },
  {
    date: "Mar 29",
    day: "Sun",
    topic: "PID Control Algorithm — Implementation",
    video: "Line Follower Robot with PID — Full Arduino Code",
    channel: "Electronoobs",
    duration: "25 min",
    url: "https://www.youtube.com/watch?v=gTRRNbv0fQM",
    tag: "HANDS-ON",
    tagColor: "#10B981",
    note: "This is your robot. He builds it live, explains every line of PID code"
  },
  {
    date: "Mar 31",
    day: "Tue",
    topic: "Sensor Arrays & Advanced Signal Processing",
    video: "QTR-8 Sensor Array — Calibration & Arduino",
    channel: "Electronoobs",
    duration: "18 min",
    url: "https://www.youtube.com/watch?v=cE0Z_j0CKap",
    tag: "HANDS-ON",
    tagColor: "#10B981",
    note: "Pololu QTR-8 array — exactly what competition robots use. Full setup guide"
  },
  {
    date: "Apr 02",
    day: "Thu",
    topic: "Advanced Line Following Algorithms",
    video: "Fast Line Follower — Advanced Algorithm & Optimization",
    channel: "Electronoobs",
    duration: "20 min",
    url: "https://www.youtube.com/watch?v=cE0Z_j0CKap",
    tag: "COMPETITION",
    tagColor: "#EC4899",
    note: "Speed optimization, curve handling, and tuning Kp/Kd for competition tracks"
  },
  {
    date: "Apr 03",
    day: "Fri",
    topic: "Competition Strategy & Phase 1 Review",
    video: "Line Follower Robot Competition — Winners Analysis",
    channel: "YouTube Search",
    duration: "varies",
    url: "https://www.youtube.com/results?search_query=line+follower+robot+competition+fast",
    tag: "COMPETITION",
    tagColor: "#EC4899",
    note: "Watch 3–4 competition videos. Study the fastest robots. Copy what works"
  }
];

const tagPriority = {
  "⚠️ SAFETY": 0,
  "COMPETITION": 1,
  "FULL COURSE": 2,
  "HANDS-ON": 3,
  "QUICK": 4,
  "THEORY": 5,
};

export default function App() {
  const [filter, setFilter] = useState("ALL");
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const tags = ["ALL", "THEORY", "HANDS-ON", "QUICK", "FULL COURSE", "⚠️ SAFETY", "COMPETITION"];
  const filtered = filter === "ALL" ? sessions : sessions.filter(s => s.tag === filter);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0B0F1A",
      fontFamily: "'Courier New', monospace",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0B0F1A 0%, #141927 100%)",
        borderBottom: "2px solid #F5A623",
        padding: "40px 32px 28px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(20px)",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginBottom: 8 }}>
            <div style={{
              background: "#F5A623",
              color: "#0B0F1A",
              fontWeight: 900,
              fontSize: 11,
              letterSpacing: 3,
              padding: "4px 10px",
              borderRadius: 2,
            }}>NLFRC 2026</div>
            <div style={{ color: "#555F7A", fontSize: 12, letterSpacing: 2 }}>MAR 03 → APR 03</div>
          </div>
          <h1 style={{
            color: "#FFFFFF",
            fontSize: "clamp(22px, 4vw, 34px)",
            fontWeight: 900,
            margin: "0 0 4px",
            letterSpacing: -1,
          }}>
            ONE VIDEO PER SESSION
          </h1>
          <p style={{ color: "#6B7799", fontSize: 13, margin: "0 0 20px", letterSpacing: 0.5 }}>
            {sessions.length} sessions · Best video hand-picked · Share with your team
          </p>

          {/* Filter pills */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                style={{
                  padding: "6px 14px",
                  border: filter === tag ? "1.5px solid #F5A623" : "1.5px solid #2A3347",
                  background: filter === tag ? "#F5A623" : "transparent",
                  color: filter === tag ? "#0B0F1A" : "#6B7799",
                  borderRadius: 3,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  cursor: "pointer",
                  fontFamily: "'Courier New', monospace",
                  transition: "all 0.15s ease",
                }}
              >{tag}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Session list */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 60px" }}>
        {filtered.map((s, i) => {
          const realIdx = sessions.indexOf(s);
          const isHovered = hoveredIdx === realIdx;
          return (
            <a
              key={realIdx}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
              onMouseEnter={() => setHoveredIdx(realIdx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div style={{
                display: "grid",
                gridTemplateColumns: "90px 1fr auto",
                gap: "0 20px",
                padding: "20px 24px",
                marginBottom: 8,
                background: isHovered ? "#141927" : "#0F1421",
                border: isHovered ? "1.5px solid #F5A623" : "1.5px solid #1E2538",
                borderRadius: 6,
                alignItems: "start",
                cursor: "pointer",
                transition: "all 0.15s ease",
                transform: isHovered ? "translateX(4px)" : "none",
              }}>
                {/* Date */}
                <div>
                  <div style={{ color: "#F5A623", fontSize: 15, fontWeight: 900, letterSpacing: 0 }}>{s.date}</div>
                  <div style={{ color: "#374151", fontSize: 11, letterSpacing: 1 }}>{s.day}</div>
                  <div style={{
                    marginTop: 8,
                    display: "inline-block",
                    padding: "3px 7px",
                    background: s.tagColor + "22",
                    border: `1px solid ${s.tagColor}55`,
                    borderRadius: 2,
                    color: s.tagColor,
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: 1,
                  }}>{s.tag}</div>
                </div>

                {/* Main content */}
                <div>
                  <div style={{ color: "#8899BB", fontSize: 11, letterSpacing: 1.5, marginBottom: 4 }}>
                    {s.topic.toUpperCase()}
                  </div>
                  <div style={{
                    color: isHovered ? "#F5A623" : "#E8EDF8",
                    fontSize: 16,
                    fontWeight: 700,
                    marginBottom: 6,
                    transition: "color 0.15s ease",
                    lineHeight: 1.3,
                  }}>
                    ▶ {s.video}
                  </div>
                  <div style={{ color: "#4B5A78", fontSize: 12, marginBottom: 8 }}>
                    {s.channel}
                  </div>
                  <div style={{
                    color: "#5A6A88",
                    fontSize: 12,
                    lineHeight: 1.5,
                    borderLeft: "2px solid #1E2538",
                    paddingLeft: 10,
                  }}>
                    {s.note}
                  </div>
                </div>

                {/* Duration */}
                <div style={{
                  textAlign: "right",
                  minWidth: 60,
                }}>
                  <div style={{
                    color: isHovered ? "#F5A623" : "#3A4A68",
                    fontSize: 13,
                    fontWeight: 700,
                    transition: "color 0.15s ease",
                  }}>{s.duration}</div>
                  <div style={{ color: "#2A3347", fontSize: 10, marginTop: 4 }}>→</div>
                </div>
              </div>
            </a>
          );
        })}

        {/* Footer */}
        <div style={{
          marginTop: 40,
          padding: "20px 24px",
          border: "1px solid #1E2538",
          borderRadius: 6,
          background: "#0F1421",
        }}>
          <div style={{ color: "#F5A623", fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
            HOW TO USE WITH YOUR TEAM
          </div>
          <div style={{ color: "#4B5A78", fontSize: 12, lineHeight: 1.8 }}>
            1. Watch the video <span style={{ color: "#8899BB" }}>before</span> each session — not after.<br/>
            2. Filter by <span style={{ color: "#10B981" }}>HANDS-ON</span> and watch those together as a team.<br/>
            3. The <span style={{ color: "#F59E0B" }}>⚠️ SAFETY</span> video is mandatory for everyone before Mar 19.<br/>
            4. For <span style={{ color: "#EF4444" }}>FULL COURSE</span> sessions — don't watch the whole thing, just the relevant chapter.<br/>
            5. Click any row to open the video directly on YouTube.
          </div>
        </div>
      </div>
    </div>
  );
}
