# NLFRC 2026 — One Video Per Session Guide

A clean, interactive study guide for the NLFRC robotics course (Mar 03 – Apr 03, 2026).  
One hand-picked video per session. Built for teams who want to self-study without wasting time.

---

## What's Inside

- **19 sessions** covered, one video each
- Every session from the official NLFRC schedule is matched
- Filter by category: Theory / Hands-On / Full Course / Safety / Competition
- Click any row → opens directly on YouTube or the resource page
- `✓ DIRECT LINK` badge = confirmed video ID, goes straight to the video
- Channel links include a search tip so you find the right video instantly

---

## Live Site

🔗 **https://Abulmeg.github.io/nlfrc-video-guide/**

## How to Run Locally

```bash
git clone https://github.com/Abulmeg/nlfrc-video-guide.git
cd nlfrc-video-guide
npm install
npm run dev
```

To deploy changes to GitHub Pages:

```bash
npm run deploy
```

Built with Vite + React. Uses only `useState` and inline styles — no external UI dependencies.

---

## Sessions Covered

| Date | Topic | Tag |
|------|-------|-----|
| Mar 03 | Basic Electronics & Components | THEORY |
| Mar 05 | Circuit Design & Safety Protocols | THEORY |
| Mar 06 | Intro to Microcontrollers (Arduino/ESP) | HANDS-ON |
| Mar 08 | Programming Fundamentals (C++) — Part 1 | FULL COURSE |
| Mar 10 | Programming Fundamentals (C++) — Part 2 | FULL COURSE |
| Mar 12 | Control Structures & Logic | THEORY |
| Mar 13 | Introduction to Sensors (IR/Reflectance) | HANDS-ON |
| Mar 15 | Motor Control Theory & PWM | THEORY |
| Mar 17 | H-Bridges & Motor Drivers | HANDS-ON |
| Mar 19 | Power Management & Batteries (LiPo Safety) | ⚠️ SAFETY |
| Mar 20 | PCB Design Fundamentals | HANDS-ON |
| Mar 22 | PCB Design — Practical Workshop | HANDS-ON |
| Mar 24 | Mechanical Design Principles & CAD | HANDS-ON |
| Mar 26 | Introduction to Control Systems | THEORY |
| Mar 27 | PID Control Algorithm — Theory | THEORY |
| Mar 29 | PID Control Algorithm — Implementation | HANDS-ON |
| Mar 31 | Sensor Arrays & Advanced Signal Processing | HANDS-ON |
| Apr 02 | Advanced Line Following Algorithms | COMPETITION |
| Apr 03 | Competition Strategy & Phase 1 Review | COMPETITION |

---

## Key Channels

| Channel | Best For |
|---------|----------|
| GreatScott! | Electronics basics, PWM, Arduino circuits |
| freeCodeCamp | C++ full course |
| The Cherno | C++ control flow & OOP |
| How To Mechatronics | Sensors, motors, L298N wiring |
| MATLAB Official | PID theory (7-min animated video) |
| Electronoobs | Line follower PID, QTR sensors, competition tuning |
| Phil's Lab | PCB design & KiCad |
| Brian Douglas | Control systems theory |
| Product Design Online | Fusion 360 / CAD |
| RCModelReviews | LiPo battery safety |

---

## Link Types

- **✓ DIRECT LINK** → opens the exact video immediately
- **Channel links** → go to the channel, use the search bar to find the right video using the note text
- **Tutorial page links** → page has embedded video + wiring + code together
- **⚠️ SAFETY** → mandatory for every team member before March 19

## Notes for Your Team

- Watch the video **before** the session, not after
- The **⚠️ SAFETY** video (Mar 19) is mandatory for everyone before touching a LiPo battery
- For `FULL COURSE` sessions, you don't watch the whole thing — read the note in the app for the exact chapters
- Sessions Mar 29, Mar 31, Apr 02 all use **Electronoobs** — subscribe once, covers three sessions

---

## Files

```
index.html              — entry HTML page
vite.config.js          — Vite config (base path for GitHub Pages)
package.json            — scripts: dev, build, deploy
src/
  main.jsx              — React entry point
  App.jsx               — the full interactive guide (all session data + UI)
  index.css             — global reset styles
public/
  vite.svg              — favicon
README.md               — this file
```
