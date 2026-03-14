import { useState, useEffect, useCallback } from "react";

// ─── VERIFIED VIDEO IDs ───────────────────────────────────────────────────────
// 7w5I-KbJ1Sg  GreatScott resistor basics       (confirmed via his own description)
// otQGdPLyF3w  GreatScott capacitor basics       (confirmed via his own description)
// J3DYgzRvLT8  GreatScott standalone Arduino     (confirmed: Quizlet + zakruti.com)
// Qlayua3yjuE  GreatScott PWM / LEDs             (confirmed: Quizlet flashcard list)
// vLnPwxZdW4Y  freeCodeCamp C++ full course      (millions of views, widely cited)
// wkfEZmsQqiA  MATLAB Understanding PID Part 1   (confirmed: mathworks.com)

// ─── SVG DIAGRAMS (inline, never breaks) ─────────────────────────────────────
const SVGs = {
  resistorSymbol: (
    <svg viewBox="0 0 200 60" width="100%" style={{maxWidth:340,display:"block",margin:"12px auto"}}>
      <line x1="0" y1="30" x2="40" y2="30" stroke="#F59E0B" strokeWidth="2"/>
      <rect x="40" y="18" width="120" height="24" fill="none" stroke="#F59E0B" strokeWidth="2" rx="3"/>
      <line x1="160" y1="30" x2="200" y2="30" stroke="#F59E0B" strokeWidth="2"/>
      <text x="100" y="55" textAnchor="middle" fill="#8AADCC" fontSize="11" fontFamily="monospace">Resistor symbol (IEC)</text>
    </svg>
  ),
  colorCode: (
    <svg viewBox="0 0 320 110" width="100%" style={{maxWidth:380,display:"block",margin:"12px auto"}}>
      <rect x="0" y="0" width="320" height="110" fill="#0D1625" rx="6"/>
      {[
        ["#1a1a1a","0","Black"],["#8B4513","1","Brown"],["#EF4444","2","Red"],
        ["#F97316","3","Orange"],["#EAB308","4","Yellow"],["#22C55E","5","Green"],
        ["#3B82F6","6","Blue"],["#7C3AED","7","Violet"],["#6B7280","8","Gray"],["#F9FAFB","9","White"]
      ].map(([c,n,l],i) => (
        <g key={i}>
          <rect x={8+(i%5)*62} y={i<5?8:58} width="54" height="24" fill={c} rx="3" stroke="#333" strokeWidth="1"/>
          <text x={35+(i%5)*62} y={i<5?24:74} textAnchor="middle" fill={c==="Black"||c==="#1a1a1a"?"#888":"#111"} fontSize="12" fontWeight="bold" fontFamily="monospace">{n}</text>
          <text x={35+(i%5)*62} y={i<5?42:92} textAnchor="middle" fill="#6B8AAA" fontSize="9" fontFamily="monospace">{l}</text>
        </g>
      ))}
    </svg>
  ),
  ohmsLaw: (
    <svg viewBox="0 0 280 120" width="100%" style={{maxWidth:340,display:"block",margin:"12px auto"}}>
      <rect width="280" height="120" fill="#0D1625" rx="8"/>
      <circle cx="140" cy="60" r="46" fill="none" stroke="#F59E0B" strokeWidth="2"/>
      <line x1="140" y1="60" x2="140" y2="14" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4"/>
      <text x="140" y="42" textAnchor="middle" fill="#FCD34D" fontSize="20" fontWeight="bold" fontFamily="monospace">V</text>
      <line x1="140" y1="60" x2="105" y2="106" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4"/>
      <text x="105" y="108" textAnchor="middle" fill="#60A5FA" fontSize="20" fontWeight="bold" fontFamily="monospace">I</text>
      <line x1="140" y1="60" x2="175" y2="106" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4"/>
      <text x="175" y="108" textAnchor="middle" fill="#34D399" fontSize="20" fontWeight="bold" fontFamily="monospace">R</text>
      <text x="10" y="15" fill="#4A6080" fontSize="10" fontFamily="monospace">V=I×R  I=V/R  R=V/I</text>
    </svg>
  ),
  pwmWaveform: (
    <svg viewBox="0 0 300 130" width="100%" style={{maxWidth:380,display:"block",margin:"12px auto"}}>
      <rect width="300" height="130" fill="#0D1625" rx="8"/>
      <text x="10" y="18" fill="#4A6080" fontSize="9" fontFamily="monospace">25% duty</text>
      <polyline points="10,45 10,25 35,25 35,45 110,45 110,25 135,25 135,45 210,45 210,25 235,25 235,45" fill="none" stroke="#EF4444" strokeWidth="2"/>
      <text x="10" y="70" fill="#4A6080" fontSize="9" fontFamily="monospace">50% duty</text>
      <polyline points="10,90 10,70 60,70 60,90 110,90 110,70 160,70 160,90 210,90 210,70 260,70 260,90" fill="none" stroke="#F59E0B" strokeWidth="2"/>
      <text x="10" y="115" fill="#4A6080" fontSize="9" fontFamily="monospace">75% duty</text>
      <polyline points="10,125 10,105 85,105 85,125 110,125 110,105 185,105 185,125 210,125 210,105 285,105 285,125" fill="none" stroke="#10B981" strokeWidth="2"/>
      <text x="240" y="18" fill="#EF4444" fontSize="9" fontFamily="monospace">LOW speed</text>
      <text x="240" y="70" fill="#F59E0B" fontSize="9" fontFamily="monospace">MID speed</text>
      <text x="240" y="115" fill="#10B981" fontSize="9" fontFamily="monospace">HIGH speed</text>
    </svg>
  ),
  hBridge: (
    <svg viewBox="0 0 260 180" width="100%" style={{maxWidth:320,display:"block",margin:"12px auto"}}>
      <rect width="260" height="180" fill="#0D1625" rx="8"/>
      <text x="130" y="16" textAnchor="middle" fill="#F59E0B" fontSize="11" fontFamily="monospace">H-Bridge</text>
      <line x1="130" y1="22" x2="130" y2="45" stroke="#F59E0B" strokeWidth="2"/>
      <text x="130" y="42" textAnchor="middle" fill="#FCD34D" fontSize="10" fontFamily="monospace">+12V</text>
      <line x1="40" y1="50" x2="220" y2="50" stroke="#374151" strokeWidth="1.5"/>
      <rect x="20" y="60" width="36" height="24" fill="#1A3050" stroke="#3B82F6" strokeWidth="1.5" rx="3"/>
      <text x="38" y="76" textAnchor="middle" fill="#60A5FA" fontSize="10" fontFamily="monospace">S1</text>
      <rect x="204" y="60" width="36" height="24" fill="#1A3050" stroke="#3B82F6" strokeWidth="1.5" rx="3"/>
      <text x="222" y="76" textAnchor="middle" fill="#60A5FA" fontSize="10" fontFamily="monospace">S2</text>
      <line x1="38" y1="84" x2="38" y2="130" stroke="#374151" strokeWidth="1.5"/>
      <line x1="222" y1="84" x2="222" y2="130" stroke="#374151" strokeWidth="1.5"/>
      <line x1="38" y1="107" x2="222" y2="107" stroke="#374151" strokeWidth="1.5"/>
      <rect x="100" y="94" width="60" height="26" fill="#1A2840" stroke="#F59E0B" strokeWidth="1.5" rx="3"/>
      <text x="130" y="111" textAnchor="middle" fill="#FCD34D" fontSize="11" fontFamily="monospace">MOTOR</text>
      <rect x="20" y="130" width="36" height="24" fill="#1A3050" stroke="#3B82F6" strokeWidth="1.5" rx="3"/>
      <text x="38" y="146" textAnchor="middle" fill="#60A5FA" fontSize="10" fontFamily="monospace">S3</text>
      <rect x="204" y="130" width="36" height="24" fill="#1A3050" stroke="#3B82F6" strokeWidth="1.5" rx="3"/>
      <text x="222" y="146" textAnchor="middle" fill="#60A5FA" fontSize="10" fontFamily="monospace">S4</text>
      <line x1="40" y1="154" x2="220" y2="154" stroke="#374151" strokeWidth="1.5"/>
      <text x="130" y="172" textAnchor="middle" fill="#4A6080" fontSize="10" fontFamily="monospace">GND</text>
      <text x="60" y="175" fill="#10B981" fontSize="8" fontFamily="monospace">S1+S4=FWD</text>
      <text x="150" y="175" fill="#EF4444" fontSize="8" fontFamily="monospace">S2+S3=REV</text>
    </svg>
  ),
  pidDiagram: (
    <svg viewBox="0 0 340 120" width="100%" style={{maxWidth:420,display:"block",margin:"12px auto"}}>
      <rect width="340" height="120" fill="#0D1625" rx="8"/>
      <rect x="8" y="45" width="52" height="30" fill="#1A3050" stroke="#F59E0B" strokeWidth="1.5" rx="4"/>
      <text x="34" y="64" textAnchor="middle" fill="#FCD34D" fontSize="10" fontFamily="monospace">Setpoint</text>
      <line x1="60" y1="60" x2="90" y2="60" stroke="#6B7799" strokeWidth="1.5" markerEnd="url(#arrow)"/>
      <circle cx="98" cy="60" r="10" fill="none" stroke="#F59E0B" strokeWidth="1.5"/>
      <text x="98" y="64" textAnchor="middle" fill="#F59E0B" fontSize="12" fontFamily="monospace">Σ</text>
      <line x1="108" y1="60" x2="136" y2="60" stroke="#6B7799" strokeWidth="1.5"/>
      <text x="122" y="55" textAnchor="middle" fill="#EF4444" fontSize="9" fontFamily="monospace">error</text>
      <rect x="136" y="44" width="52" height="30" fill="#1A2840" stroke="#3B82F6" strokeWidth="1.5" rx="4"/>
      <text x="162" y="57" textAnchor="middle" fill="#60A5FA" fontSize="9" fontFamily="monospace">PID</text>
      <text x="162" y="70" textAnchor="middle" fill="#4A6080" fontSize="8" fontFamily="monospace">Kp Ki Kd</text>
      <line x1="188" y1="60" x2="216" y2="60" stroke="#6B7799" strokeWidth="1.5"/>
      <rect x="216" y="44" width="52" height="30" fill="#1A2840" stroke="#10B981" strokeWidth="1.5" rx="4"/>
      <text x="242" y="57" textAnchor="middle" fill="#34D399" fontSize="9" fontFamily="monospace">Motors</text>
      <text x="242" y="70" textAnchor="middle" fill="#4A6080" fontSize="8" fontFamily="monospace">(Plant)</text>
      <line x1="268" y1="60" x2="332" y2="60" stroke="#6B7799" strokeWidth="1.5"/>
      <line x1="310" y1="60" x2="310" y2="100" stroke="#6B7799" strokeWidth="1.5"/>
      <line x1="98" y1="100" x2="310" y2="100" stroke="#6B7799" strokeWidth="1.5"/>
      <line x1="98" y1="70" x2="98" y2="100" stroke="#6B7799" strokeWidth="1.5"/>
      <text x="200" y="115" textAnchor="middle" fill="#4A6080" fontSize="9" fontFamily="monospace">feedback (sensor reading)</text>
      <text x="310" y="57" textAnchor="middle" fill="#E0EAF8" fontSize="9" fontFamily="monospace">out</text>
      <defs><marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#6B7799"/></marker></defs>
    </svg>
  ),
  irSensor: (
    <svg viewBox="0 0 300 130" width="100%" style={{maxWidth:360,display:"block",margin:"12px auto"}}>
      <rect width="300" height="130" fill="#0D1625" rx="8"/>
      <rect x="10" y="15" width="80" height="50" fill="#1A2840" stroke="#F59E0B" strokeWidth="1.5" rx="4"/>
      <text x="50" y="36" textAnchor="middle" fill="#FCD34D" fontSize="9" fontFamily="monospace">IR LED</text>
      <text x="50" y="52" textAnchor="middle" fill="#4A6080" fontSize="9" fontFamily="monospace">emitter</text>
      <line x1="90" y1="40" x2="130" y2="40" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4"/>
      <text x="110" y="35" textAnchor="middle" fill="#78350F" fontSize="8" fontFamily="monospace">IR light</text>
      <rect x="130" y="55" width="140" height="20" fill="#1a1a1a" rx="3"/>
      <text x="200" y="69" textAnchor="middle" fill="#4A6080" fontSize="9" fontFamily="monospace">surface (white reflects, black absorbs)</text>
      <line x1="130" y1="55" x2="100" y2="40" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4"/>
      <rect x="10" y="80" width="80" height="40" fill="#1A2840" stroke="#3B82F6" strokeWidth="1.5" rx="4"/>
      <text x="50" y="98" textAnchor="middle" fill="#60A5FA" fontSize="9" fontFamily="monospace">Photodiode</text>
      <text x="50" y="112" textAnchor="middle" fill="#4A6080" fontSize="9" fontFamily="monospace">detector</text>
      <text x="180" y="105" textAnchor="middle" fill="#10B981" fontSize="10" fontFamily="monospace">White → HIGH (0V)</text>
      <text x="180" y="120" textAnchor="middle" fill="#EF4444" fontSize="10" fontFamily="monospace">Black → LOW (5V)</text>
    </svg>
  ),
  groundPlane: (
    <svg viewBox="0 0 280 130" width="100%" style={{maxWidth:340,display:"block",margin:"12px auto"}}>
      <rect width="280" height="130" fill="#0D1625" rx="8"/>
      <rect x="15" y="15" width="250" height="45" fill="#0A3020" stroke="#10B981" strokeWidth="1.5" rx="4"/>
      <text x="140" y="30" textAnchor="middle" fill="#34D399" fontSize="10" fontFamily="monospace">Top layer — signal traces</text>
      <line x1="40" y1="38" x2="100" y2="38" stroke="#F59E0B" strokeWidth="2"/>
      <line x1="120" y1="38" x2="220" y2="38" stroke="#3B82F6" strokeWidth="2"/>
      <text x="70" y="52" textAnchor="middle" fill="#78350F" fontSize="8" fontFamily="monospace">PWM</text>
      <text x="170" y="52" textAnchor="middle" fill="#1E40AF" fontSize="8" fontFamily="monospace">sensor data</text>
      <rect x="15" y="72" width="250" height="45" fill="#1A0A30" stroke="#8B5CF6" strokeWidth="1.5" rx="4"/>
      <rect x="20" y="77" width="240" height="35" fill="#2D1B60" rx="3" opacity="0.8"/>
      <text x="140" y="94" textAnchor="middle" fill="#A78BFA" fontSize="10" fontFamily="monospace">Bottom layer — GND copper fill</text>
      <text x="140" y="109" textAnchor="middle" fill="#4A3080" fontSize="9" fontFamily="monospace">covers entire board → kills noise</text>
    </svg>
  ),
  pidTerms: (
    <svg viewBox="0 0 320 150" width="100%" style={{maxWidth:400,display:"block",margin:"12px auto"}}>
      <rect width="320" height="150" fill="#0D1625" rx="8"/>
      <rect x="10" y="15" width="88" height="55" fill="#1A2840" stroke="#EF4444" strokeWidth="1.5" rx="5"/>
      <text x="54" y="35" textAnchor="middle" fill="#EF4444" fontSize="14" fontWeight="bold" fontFamily="monospace">P</text>
      <text x="54" y="50" textAnchor="middle" fill="#6B7799" fontSize="8" fontFamily="monospace">Kp × error</text>
      <text x="54" y="63" textAnchor="middle" fill="#4A5568" fontSize="7" fontFamily="monospace">react to NOW</text>
      <rect x="116" y="15" width="88" height="55" fill="#1A2840" stroke="#F59E0B" strokeWidth="1.5" rx="5"/>
      <text x="160" y="35" textAnchor="middle" fill="#F59E0B" fontSize="14" fontWeight="bold" fontFamily="monospace">I</text>
      <text x="160" y="50" textAnchor="middle" fill="#6B7799" fontSize="8" fontFamily="monospace">Ki × Σerror</text>
      <text x="160" y="63" textAnchor="middle" fill="#4A5568" fontSize="7" fontFamily="monospace">react to PAST</text>
      <rect x="222" y="15" width="88" height="55" fill="#1A2840" stroke="#10B981" strokeWidth="1.5" rx="5"/>
      <text x="266" y="35" textAnchor="middle" fill="#10B981" fontSize="14" fontWeight="bold" fontFamily="monospace">D</text>
      <text x="266" y="50" textAnchor="middle" fill="#6B7799" fontSize="8" fontFamily="monospace">Kd × Δerror</text>
      <text x="266" y="63" textAnchor="middle" fill="#4A5568" fontSize="7" fontFamily="monospace">predict FUTURE</text>
      <text x="160" y="90" textAnchor="middle" fill="#4A6080" fontSize="10" fontFamily="monospace">Output = P + I + D</text>
      <text x="160" y="108" textAnchor="middle" fill="#374151" fontSize="9" fontFamily="monospace">For line followers: use P + D only</text>
      <text x="160" y="125" textAnchor="middle" fill="#10B981" fontSize="9" fontFamily="monospace">P steers · D smooths · I rarely needed</text>
      <text x="160" y="142" textAnchor="middle" fill="#374151" fontSize="8" fontFamily="monospace">Tune Kp first, then add Kd</text>
    </svg>
  ),
  capacitorTypes: (
    <svg viewBox="0 0 280 130" width="100%" style={{maxWidth:340,display:"block",margin:"12px auto"}}>
      <rect width="280" height="130" fill="#0D1625" rx="8"/>
      <text x="70" y="18" textAnchor="middle" fill="#4A6080" fontSize="10" fontFamily="monospace">Electrolytic</text>
      <rect x="30" y="25" width="80" height="60" fill="#1A2840" stroke="#F59E0B" strokeWidth="1.5" rx="4"/>
      <rect x="55" y="30" width="30" height="50" rx="15" fill="#2A1A00" stroke="#F59E0B" strokeWidth="1.5"/>
      <line x1="70" y1="25" x2="70" y2="10" stroke="#10B981" strokeWidth="2"/>
      <line x1="58" y1="87" x2="58" y2="100" stroke="#6B7799" strokeWidth="2"/>
      <text x="83" y="97" fill="#EF4444" fontSize="9" fontFamily="monospace">+/- matters!</text>
      <text x="70" y="113" textAnchor="middle" fill="#78350F" fontSize="9" fontFamily="monospace">10µF–10,000µF</text>
      <text x="200" y="18" textAnchor="middle" fill="#4A6080" fontSize="10" fontFamily="monospace">Ceramic</text>
      <rect x="160" y="25" width="80" height="60" fill="#1A2840" stroke="#3B82F6" strokeWidth="1.5" rx="4"/>
      <rect x="185" y="40" width="30" height="20" rx="4" fill="#1E3A5F" stroke="#3B82F6" strokeWidth="1"/>
      <line x1="190" y1="60" x2="190" y2="85" stroke="#6B7799" strokeWidth="2"/>
      <line x1="210" y1="60" x2="210" y2="85" stroke="#6B7799" strokeWidth="2"/>
      <text x="200" y="113" textAnchor="middle" fill="#1E40AF" fontSize="9" fontFamily="monospace">100pF–1µF</text>
      <text x="200" y="96" textAnchor="middle" fill="#34D399" fontSize="8" fontFamily="monospace">no polarity</text>
    </svg>
  ),
};

// ─── PHOTOS (stable Wikimedia Commons URLs) ───────────────────────────────────
// QTR-8RC confirmed: commons.wikimedia.org/wiki/File:QTR-8RC_Reflectance_Sensor_Array.JPG
const PHOTOS = {
  qtr8: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/QTR-8RC_Reflectance_Sensor_Array.JPG/320px-QTR-8RC_Reflectance_Sensor_Array.JPG",
};

// ─── MODULES ──────────────────────────────────────────────────────────────────
const modules = [
  {
    id:1, title:"Electronics Foundations", emoji:"⚡", color:"#F59E0B",
    sessions:["Mar 03","Mar 05"], tagline:"Start here — zero knowledge needed",
    steps:[
      { step:1, label:"What are resistors & how do they work?", why:"Resistors are in every single circuit you'll build. You can't wire anything without understanding them.", video:"GreatScott! — Resistor Basics", duration:"~10 min", direct:true, url:"https://www.youtube.com/watch?v=7w5I-KbJ1Sg", topic:"resistors" },
      { step:2, label:"What are capacitors?", why:"Capacitors store energy and filter noise. Every motor driver and power circuit uses them.", video:"GreatScott! — Capacitor Basics", duration:"~10 min", direct:true, url:"https://www.youtube.com/watch?v=otQGdPLyF3w", topic:"capacitors" },
      { step:3, label:"How to read a circuit schematic", why:"Every tutorial, datasheet, and PCB file uses schematics. Learn once, use forever.", video:"GreatScott! — Electronic Basics playlist", duration:"~10 min", direct:false, url:"https://www.youtube.com/@greatscottlab", topic:"schematics" },
    ],
  },
  {
    id:2, title:"Microcontrollers & C++", emoji:"🧠", color:"#3B82F6",
    sessions:["Mar 06","Mar 08","Mar 10","Mar 12"], tagline:"The brain of your robot",
    steps:[
      { step:1, label:"What is an Arduino and how does it work?", why:"Your robot is controlled by a microcontroller. Understand what it is before writing a single line of code.", video:"GreatScott! — Standalone Arduino Circuit", duration:"8 min", direct:true, url:"https://www.youtube.com/watch?v=J3DYgzRvLT8", topic:"arduino" },
      { step:2, label:"C++ fundamentals — variables, loops, functions", why:"Your robot's entire logic is written in C++. You need the language before you can program anything.", video:"freeCodeCamp — C++ Full Course (first 3 hrs)", duration:"3 hrs", direct:true, url:"https://www.youtube.com/watch?v=vLnPwxZdW4Y", topic:"cpp" },
      { step:3, label:"Control flow — if/else, loops, logic in C++", why:"Your line follower makes decisions constantly — turn left, turn right, stop. This is all control flow.", video:"The Cherno — C++ Series (conditionals & loops)", duration:"~15 min", direct:false, url:"https://www.youtube.com/@TheCherno", topic:"controlflow" },
    ],
  },
  {
    id:3, title:"Motors & Sensors", emoji:"⚙️", color:"#10B981",
    sessions:["Mar 13","Mar 15","Mar 17"], tagline:"Making things move and sense",
    steps:[
      { step:1, label:"How IR & reflectance sensors detect a line", why:"These are the eyes of your robot. Understand exactly how they work before wiring a single wire.", video:"How To Mechatronics — Arduino IR Sensor Tutorial", duration:"~10 min", direct:true, url:"https://howtomechatronics.com/tutorials/arduino/", topic:"irsensor" },
      { step:2, label:"PWM — how motors are speed-controlled", why:"PWM is how you control motor speed. Without this, your robot goes full speed or stops — nothing in between.", video:"GreatScott! — Electronic Basics #8: PWM", duration:"8 min", direct:true, url:"https://www.youtube.com/watch?v=Qlayua3yjuE", topic:"pwm" },
      { step:3, label:"Wire up the L298N motor driver", why:"The motor driver connects your microcontroller to your motors. This is the exact component you'll use.", video:"How To Mechatronics — L298N DC Motor Control", duration:"~12 min", direct:true, url:"https://howtomechatronics.com/tutorials/arduino/arduino-dc-motor-control-tutorial-l298n-pwm-h-bridge/", topic:"l298n" },
    ],
  },
  {
    id:4, title:"Power & PCB Design", emoji:"🔋", color:"#EF4444",
    sessions:["Mar 19","Mar 20","Mar 22"], tagline:"Power it safely, build it right",
    steps:[
      { step:1, warning:true, label:"⚠️ LiPo battery safety — mandatory for entire team", why:"LiPo batteries can catch fire if mishandled. Most important video in the course. No exceptions.", video:"RCModelReviews — LiPo Battery Safety", duration:"~18 min", direct:false, url:"https://www.youtube.com/@RCModelReviews", topic:"lipo" },
      { step:2, label:"Design a PCB from scratch in KiCad", why:"Competition robots use custom PCBs instead of breadboards — more compact, reliable, and vibration-proof.", video:"Phil's Lab — KiCad Beginner PCB Tutorial", duration:"~30 min", direct:false, url:"https://www.youtube.com/@PhilsLab", topic:"kicad" },
      { step:3, label:"PCB layout rules before you route", why:"Bad layout = board that doesn't work. These rules take 20 min to learn and save weeks of debugging.", video:"Phil's Lab — PCB Layout Rules & Tips", duration:"~22 min", direct:false, url:"https://www.youtube.com/@PhilsLab", topic:"pcblayout" },
    ],
  },
  {
    id:5, title:"CAD & Control Theory", emoji:"📐", color:"#8B5CF6",
    sessions:["Mar 24","Mar 26","Mar 27"], tagline:"Design the body, control the brain",
    steps:[
      { step:1, label:"Design your robot chassis in Fusion 360", why:"A good chassis makes your robot faster and more reliable. CAD lets you test before cutting anything.", video:"Product Design Online — Fusion 360 Beginners", duration:"~38 min", direct:false, url:"https://www.youtube.com/@ProductDesignOnline", topic:"cad" },
      { step:2, label:"What is a control system?", why:"PID won't make sense until you understand the bigger picture. Watch this first.", video:"Brian Douglas — Control System Lectures", duration:"~13 min", direct:false, url:"https://www.youtube.com/@BrianBDouglas", topic:"controlsystems" },
      { step:3, label:"PID explained — the most important 7 minutes", why:"PID makes your robot follow the line smoothly. This animated video is the clearest explanation that exists.", video:"MATLAB Official — Understanding PID Control Part 1", duration:"7 min", direct:true, url:"https://www.youtube.com/watch?v=wkfEZmsQqiA", topic:"pid" },
    ],
  },
  {
    id:6, title:"Build & Compete", emoji:"🏁", color:"#EC4899",
    sessions:["Mar 29","Mar 31","Apr 02","Apr 03"], tagline:"Put it all together and win",
    steps:[
      { step:1, label:"Implement PID on your actual robot", why:"Theory is done. Now you write the actual PID code on Arduino and make the robot follow a line.", video:"Electronoobs — Line Follower PID Full Code", duration:"~25 min", direct:false, url:"https://www.youtube.com/@ELECTRONOOBS", topic:"pidimpl" },
      { step:2, label:"Set up and calibrate the QTR sensor array", why:"Pololu QTR-8 is the competition standard. Calibration is critical — badly calibrated = broken PID.", video:"Electronoobs — QTR Sensor Array Setup", duration:"~20 min", direct:false, url:"https://www.youtube.com/@ELECTRONOOBS", topic:"qtr" },
      { step:3, label:"Tune for speed and win", why:"The difference between winning and losing is tuning. Study the fastest competition robots.", video:"YouTube — Line Follower Competition Fastest Robots", duration:"varies", direct:true, url:"https://www.youtube.com/results?search_query=line+follower+robot+competition+fastest", topic:"compete" },
    ],
  },
];

// ─── SLIDE DATA ───────────────────────────────────────────────────────────────
const SLIDES = {
  resistors: [
    { heading:"What is a resistor?", body:"A resistor limits the flow of electrical current. Think of electricity like water in a pipe — a resistor is a narrower section that slows the flow.\n\nResistors protect components (like LEDs or microcontroller pins) from getting too much current. Without them, components burn out instantly.", visual: SVGs.resistorSymbol },
    { heading:"Ohm's Law — V = I × R", body:"V = Voltage (Volts)\nI = Current (Amperes)\nR = Resistance (Ohms, Ω)\n\nIf you have 5V and a 100Ω resistor:\nI = V ÷ R = 5 ÷ 100 = 0.05A = 50mA\n\nAlways calculate current before connecting anything to a pin.", visual: SVGs.ohmsLaw },
    { heading:"Reading the color code", body:"Each color band = a number. For 4-band resistors:\nBand 1 + Band 2 = first two digits\nBand 3 = multiplier (number of zeros)\nBand 4 = tolerance (gold = ±5%)\n\nExample: Brown-Black-Red-Gold\n= 1, 0, ×100, ±5% = 1000Ω = 1kΩ", visual: SVGs.colorCode },
    { heading:"Series vs Parallel", body:"SERIES (chain): Total R = R1 + R2 + R3\nSame current flows through all. Voltage divides.\n\nPARALLEL (side by side): 1/Total = 1/R1 + 1/R2\nSame voltage across all. Current divides.\n\nIn your robot: use series for current limiting (LED), parallel appears in sensor pull-up configurations." },
    { heading:"Key takeaways", body:"✓ Resistors limit current — they protect components\n✓ V = I × R — calculate before connecting\n✓ Color bands tell you the resistance value\n✓ Series = resistances add up\n✓ Parallel = total resistance goes DOWN\n✓ Every LED pin needs a calculated resistor" },
  ],
  capacitors: [
    { heading:"What is a capacitor?", body:"A capacitor stores electrical energy temporarily — like a tiny fast-charging battery. Two metal plates separated by an insulator hold electric charge.\n\nKey difference from a battery: capacitors charge and discharge in microseconds, not hours. They react instantly to voltage changes.", visual: SVGs.capacitorTypes },
    { heading:"Capacitance — how much it stores", body:"Unit: Farads (F). You'll use:\n• Microfarads µF = 0.000001 F (power filtering)\n• Nanofarads nF (signal filtering)\n• Picofarads pF (RF, high frequency)\n\nALWAYS check the voltage rating. A 16V capacitor will fail if you run 24V through it. Always use a cap rated higher than your supply voltage." },
    { heading:"Electrolytic vs Ceramic", body:"ELECTROLYTIC (cylinder shape):\n→ Large values 10µF – 10,000µF\n→ Has polarity (+/−) — reversed = explodes\n→ Use for: power supply filtering, motor driver bypass\n\nCERAMIC (small disc/chip):\n→ Small values 100pF – 1µF\n→ No polarity, high frequency stable\n→ Use for: decoupling next to microcontroller pins" },
    { heading:"What caps actually do in your robot", body:"1. POWER FILTERING: Motor startup creates huge current spikes. A 100µF cap absorbs the spike and prevents your Arduino from rebooting.\n\n2. DECOUPLING: Place a 100nF ceramic cap between VCC and GND right next to your Arduino/ESP chip. Gives the chip a local energy reserve.\n\n3. RULE: Always put 100µF electrolytic + 100nF ceramic on every motor driver power input." },
    { heading:"Key takeaways", body:"✓ Capacitors store and release charge instantly\n✓ Bigger Farads = more storage\n✓ Electrolytic = large values, HAS polarity\n✓ Ceramic = small values, no polarity\n✓ 100µF + 100nF on every motor driver power pin\n✓ Reversed electrolytic CAN explode — always check polarity\n✓ Voltage rating must exceed your supply voltage" },
  ],
  schematics: [
    { heading:"What is a schematic?", body:"A schematic is a map of a circuit showing every component and how they're electrically connected — but NOT where they physically sit on a board.\n\nYou'll see schematics in every tutorial, datasheet, and KiCad file. If you can't read one, you can't build from documentation. The good news: ~15 symbols cover 90% of robotics schematics." },
    { heading:"The most common symbols", body:"─┤├─  or  ─/\\/\\/─  Resistor\n─||(─               Capacitor (two parallel lines)\n─►─                Diode (triangle + bar)\n─►|─               LED (same + two arrows for light)\n[VCC] or [5V]      Positive power rail\n⏚ [GND]            Ground — 0V reference\n────               Wire connection\n●  junction dot    Wires ARE connected here\n╋  no dot          Wires CROSSING but NOT connected" },
    { heading:"VCC, GND, and net labels", body:"VCC (or 5V, 3.3V, VDD) = positive supply rail\nGND = ground = 0V = return path for all current\n\nEvery component needs both VCC and GND. Instead of drawing wires everywhere, the same NET LABEL on two pins means they're connected.\n\nExample: Every component labeled VCC is connected to the same 5V supply — no wire drawn between them." },
    { heading:"How to trace a schematic", body:"1. Find VCC and GND rails first\n2. Identify the main chip (Arduino, ESP32)\n3. Find its VCC and GND pins\n4. Trace signals from left to right\n5. Look at pin labels — they tell the function\n6. Passive components (R, C) sit along signal paths\n\nTip: Signal generally flows left → right in well-drawn schematics. If confused, trace from VCC → through components → to GND." },
    { heading:"Key takeaways", body:"✓ Schematics show connections, NOT physical placement\n✓ Same net label = same electrical connection\n✓ VCC = power, GND = return path\n✓ Junction dot = connected. No dot = just crossing.\n✓ Learn 15 symbols → read 90% of robotics schematics\n✓ Always trace from VCC through component to GND" },
  ],
  arduino: [
    { heading:"What is a microcontroller?", body:"A microcontroller is a tiny computer on a single chip:\n• CPU — runs your code\n• Flash memory — stores your program\n• RAM — holds variables while running\n• I/O pins — connects to sensors and motors\n\nArduino Nano uses ATmega328P. ESP32 is more powerful with WiFi/Bluetooth built in. For line following, either works well." },
    { heading:"Digital vs Analog pins", body:"DIGITAL PINS: only HIGH (5V) or LOW (0V)\n→ Motor direction, LED on/off, button press\n→ Arduino Nano: D2–D13 (pins ~3,~5,~6,~9,~10,~11 support PWM)\n\nANALOG PINS: reads 0V–5V as 0–1023\n→ Sensor readings, potentiometers\n→ Arduino Nano: A0–A7\n\nFor line following:\n→ IR sensors → analog pins (A0–A7)\n→ Motor direction → digital pins\n→ Motor speed → PWM pins (marked ~)" },
    { heading:"The Arduino code structure", body:"void setup() {\n  // Runs ONCE when power is applied\n  // Set pin modes, initialize sensors here\n  pinMode(9, OUTPUT);  // motor PWM pin\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // Runs FOREVER in a continuous loop\n  // Read sensors → calculate PID → drive motors\n  int sensorVal = analogRead(A0);\n  // ... your robot logic here\n}" },
    { heading:"Key Arduino functions you'll use", body:"pinMode(pin, INPUT/OUTPUT)  — set pin direction\ndigitalWrite(pin, HIGH/LOW) — set digital output\ndigitalRead(pin)             — read digital input\nanalogRead(pin)              — read 0–1023\nanalogWrite(pin, 0–255)     — set PWM duty cycle\ndelay(ms)                   — pause in milliseconds\n\nFor calibrated timing (non-blocking):\nmillis()  — ms since boot (use instead of delay)" },
    { heading:"Key takeaways", body:"✓ Microcontroller = brain of your robot\n✓ Digital = HIGH or LOW only\n✓ Analog = 0–1023 (sensor readings)\n✓ PWM pins (~) = speed control via analogWrite()\n✓ setup() runs once, loop() runs forever\n✓ Arduino Nano or ESP32 = self-contained, no USB needed\n✓ Always calculate current draw before connecting motors" },
  ],
  cpp: [
    { heading:"Why C++ for robotics?", body:"Arduino runs C++. Your entire robot — sensor reading, PID calculation, motor control — is C++ code.\n\nC++ is fast, runs on bare metal without an OS, and gives direct hardware control. Python is too slow and too heavy for an 8-bit microcontroller with 2KB of RAM.\n\nYou only need about 20% of C++ for robotics. Focus on: variables, conditionals, loops, functions." },
    { heading:"Variables and data types", body:"int speed = 150;       // whole numbers −32768 to 32767\nfloat error = 0.5;     // decimal numbers\nbool onLine = true;    // true or false only\nbyte val = 255;        // 0 to 255 (Arduino-specific)\n\n// For your robot:\n// Sensor readings → int (0–1023)\n// PID calculations → float\n// Pin states → bool or byte\n// Motor speed → int (0–255)" },
    { heading:"Conditionals and loops", body:"if (error > 50) {\n  setMotors(200, 100);  // turn right\n} else if (error < -50) {\n  setMotors(100, 200);  // turn left\n} else {\n  setMotors(150, 150);  // straight\n}\n\n// Read all 8 sensors in one go:\nfor (int i = 0; i < 8; i++) {\n  values[i] = analogRead(sensorPins[i]);\n}" },
    { heading:"Functions", body:"// Define once, call anywhere:\nvoid setMotors(int leftSpeed, int rightSpeed) {\n  analogWrite(9,  leftSpeed);\n  analogWrite(10, rightSpeed);\n}\n\nfloat calculatePID(int error) {\n  float P = Kp * error;\n  float D = Kd * (error - lastError);\n  lastError = error;\n  return P + D;\n}\n\n// Your final robot loop becomes just 3 lines:\n// readSensors() → calculatePID() → setMotors()" },
    { heading:"Key takeaways", body:"✓ C++ = the language your Arduino speaks\n✓ int for whole numbers, float for decimals\n✓ if/else = robot decisions\n✓ for loop = read all sensors in one line\n✓ Functions = reusable blocks, keep code clean\n✓ = is assignment, == is comparison — don't mix them\n✓ constrain(val, min, max) → use to clamp motor speeds" },
  ],
  controlflow: [
    { heading:"What is control flow?", body:"Control flow is the ORDER in which code executes.\n\nWithout it: code runs top-to-bottom once and stops.\nWith it: code makes decisions, repeats, branches.\n\nYour robot makes decisions hundreds of times per second:\n→ Is it on the line?\n→ How far off center?\n→ Which direction to correct?\n\nAll of this is control flow logic." },
    { heading:"Boolean logic", body:"Boolean = true/false only.\n\n&&  AND — both must be true\n||  OR  — at least one must be true\n!   NOT — flips true↔false\n\nExamples in robot code:\nif (leftSensor > 500 && rightSensor < 200) { turnRight(); }\nif (batteryLow || motorStalled) { emergencyStop(); }\nif (!calibrated) { runCalibration(); }" },
    { heading:"Comparison operators", body:"==  equal to          (error == 0)\n!=  not equal to      (state != STOPPED)\n>   greater than      (error > 100)\n<   less than         (error < -100)\n>=  greater or equal  (speed >= 200)\n<=  less or equal     (voltage <= 3.0)\n\n⚠️ MOST COMMON BUG:\nif (x = 5)   → WRONG: assigns 5 to x, always true\nif (x == 5)  → CORRECT: compares x to 5" },
    { heading:"Switch/case — state machine", body:"// Robot states:\n#define CALIBRATING 0\n#define RUNNING     1\n#define STOPPED     2\n\nint state = CALIBRATING;\n\nswitch (state) {\n  case CALIBRATING: calibrate(); break;\n  case RUNNING:     followLine(); break;\n  case STOPPED:     setMotors(0,0); break;\n  default:          setMotors(0,0);\n}\n\nThis pattern = a state machine. Clean, debuggable, expandable." },
    { heading:"Key takeaways", body:"✓ Control flow = make decisions, repeat actions\n✓ && = both conditions true, || = either true\n✓ = is assignment, == is comparison — most common bug\n✓ switch/case for robot state machines\n✓ Boolean logic is every sensor decision your robot makes\n✓ Combine conditions: speed > 100 && !obstacleDetected" },
  ],
  irsensor: [
    { heading:"How IR detection works", body:"An IR sensor has two parts:\n1. IR LED — emits infrared light downward\n2. Photodiode — detects how much bounces back\n\nBLACK surface: absorbs infrared → little reflection → sensor reads HIGH voltage\nWHITE surface: reflects infrared → lots of reflection → sensor reads LOW voltage\n\nThis is how your robot detects the line. Multiple sensors in a row let you calculate POSITION.", visual: SVGs.irSensor },
    { heading:"Digital vs Analog sensors", body:"DIGITAL IR sensors:\n→ Output only 0 or 1 (line or no line)\n→ Has a trim pot to adjust threshold\n→ Cheap, simple, but can't feed PID\n\nANALOG sensors (Pololu QTR-8A):\n→ Output 0–1023 (how much light reflected)\n→ Gives precise position data\n→ REQUIRED for PID control\n\n⚠️ For competition: ALWAYS use analog sensors.\nDigital sensors cannot give the fine-grained data that PID needs to work properly." },
    { heading:"The QTR-8A sensor array", body:"8 IR sensors spaced 9.525mm apart\nTotal width: ~67mm\nOutput: 8 separate analog voltages\n\nWiring:\nVCC → 5V\nGND → GND\nOUT1–OUT8 → A0–A7\nCTRL → digital pin (turn on/off)\n\nMount at 3–8mm above ground, perpendicular to direction of travel, centered under the robot.", visual: <img src={PHOTOS.qtr8} alt="Pololu QTR-8 sensor array" style={{width:"100%",maxWidth:280,display:"block",margin:"10px auto",borderRadius:6,border:"1px solid #1E3050"}}/> },
    { heading:"Reading sensors in code", body:"// Using the Pololu QTR library:\n#include <QTRSensors.h>\nQTRSensors qtr;\nuint16_t sensorValues[8];\n\nqtr.setTypeAnalog();\nqtr.setSensorPins(\n  (const uint8_t[]){A0,A1,A2,A3,A4,A5,A6,A7}, 8);\n\n// After calibration:\nuint16_t position = qtr.readLineBlack(sensorValues);\n// Returns 0–7000\n// 3500 = perfectly centered = your setpoint" },
    { heading:"Key takeaways", body:"✓ IR sensor emits light, photodiode detects reflection\n✓ Black absorbs → higher voltage reading\n✓ White reflects → lower voltage reading\n✓ Use ANALOG sensors for PID (digital won't work)\n✓ QTR-8A = competition standard\n✓ Use Pololu QTR library — don't reinvent the wheel\n✓ Mount at 3–8mm above ground\n✓ Calibrate before EVERY run on the actual track surface" },
  ],
  pwm: [
    { heading:"What is PWM?", body:"PWM = Pulse Width Modulation.\n\nA digital pin can only be HIGH (5V) or LOW (0V). PWM makes it switch ON and OFF extremely fast. How long it stays ON vs OFF controls the AVERAGE voltage the motor receives.\n\n100% ON  → full voltage → full speed\n50/50    → half voltage → half speed\n25% ON   → quarter voltage → slow speed", visual: SVGs.pwmWaveform },
    { heading:"Duty cycle and frequency", body:"DUTY CYCLE = % of time the signal is HIGH\n0%   = 0V    = motor stopped\n50%  = 2.5V  = half speed\n100% = 5V    = full speed\n\nFREQUENCY = how fast the switching happens\nArduino default: 490 Hz (pin 5,6) or 980 Hz (pin 3,9,10,11)\nAt these speeds motors see it as smooth voltage\n\nAt too low frequency (<50Hz) you'd hear audible buzzing from the motor coils." },
    { heading:"analogWrite() on Arduino", body:"analogWrite(pin, value);\n// pin  → must be PWM capable (~3,~5,~6,~9,~10,~11)\n// value → 0 to 255\n//   0   = 0%  duty = stopped\n//   128 = 50% duty = half speed\n//   255 = 100%duty = full speed\n\n// 60% speed:\nanalogWrite(9, 153); // 153/255 = 60%\n\n// Map PID correction to PWM:\nint motorSpeed = map(correction, -500, 500, 0, 255);\nanalogWrite(9, constrain(motorSpeed, 0, 255));" },
    { heading:"Why this matters for line following", body:"Without PWM: motor is 100% ON or OFF. Robot crashes every turn.\n\nWith PWM:\n→ Your PID controller outputs a correction value (e.g., +80)\n→ Left motor gets baseSpeed + correction\n→ Right motor gets baseSpeed − correction\n→ Robot steers smoothly\n\nThe entire line-following algorithm depends on being able to smoothly vary motor speed. PWM is what makes that possible." },
    { heading:"Key takeaways", body:"✓ PWM = fast ON/OFF switching to simulate variable voltage\n✓ Duty cycle % = controls average voltage = controls speed\n✓ analogWrite(pin, 0–255) on Arduino\n✓ Only use PWM-capable pins (marked ~ on Arduino)\n✓ 0 = stopped, 128 = half speed, 255 = full speed\n✓ PID correction → mapped to PWM value → motor speed" },
  ],
  l298n: [
    { heading:"Why you need a motor driver", body:"Arduino pins output 5V at 40mA max.\nA DC motor needs 6–12V at 500mA–2A.\n\nConnect motor directly to Arduino:\n→ Motor won't spin (not enough power)\n→ You'll permanently damage the Arduino\n\nThe L298N motor driver amplifies the Arduino's tiny signal into the high current your motors need. It handles 12V at 2A per channel — more than enough for competition.", visual: SVGs.hBridge },
    { heading:"How an H-bridge works", body:"Four switches arranged in an H shape around the motor:\n\nS1 + S4 ON → current flows left→right → motor spins FORWARD\nS2 + S3 ON → current flows right→left → motor spins BACKWARD\nS1 + S2 ON → SHORT CIRCUIT → never do this\n\nThe L298N manages all of this internally. You just send logic signals to IN1/IN2 and it switches the internal transistors correctly.\n\nENA/ENB pins accept PWM for speed control." },
    { heading:"Wiring L298N to Arduino", body:"L298N pin → Arduino connection:\nIN1 → D2    (Motor A direction)\nIN2 → D3    (Motor A direction)\nENA → ~D9   (Motor A PWM speed)\nIN3 → D4    (Motor B direction)\nIN4 → D5    (Motor B direction)\nENB → ~D10  (Motor B PWM speed)\n\nPower:\n12V terminal → battery positive\nGND terminal → battery GND + Arduino GND\n5V out → Arduino 5V input (saves a regulator)\n\n⚠️ MUST connect Arduino GND to L298N GND." },
    { heading:"Direction control truth table", body:"IN1  IN2  → Motor A direction\nHIGH LOW  → Forward\nLOW  HIGH → Backward\nHIGH HIGH → Brake (stop)\nLOW  LOW  → Coast (free spin)\n\nCode:\n// Forward:\ndigitalWrite(2, HIGH); digitalWrite(3, LOW);\n// Backward:\ndigitalWrite(2, LOW);  digitalWrite(3, HIGH);\n// Speed:\nanalogWrite(9, 180); // 0-255" },
    { heading:"Key takeaways", body:"✓ NEVER connect motor directly to Arduino pin\n✓ H-bridge = 4 switches controlling current direction\n✓ L298N handles 12V/2A per channel\n✓ Always share GND: Arduino + L298N + battery\n✓ IN1/IN2 = direction, ENA = PWM speed\n✓ 5V out from L298N can power Arduino (use 12V supply)\n✓ Test one motor at a time before connecting both" },
  ],
  lipo: [
    { heading:"Why LiPo batteries are dangerous", body:"LiPo (Lithium Polymer) batteries are used because they're light and powerful. But they contain flammable electrolyte.\n\nIf mishandled they can:\n🔥 Catch fire (thermal runaway)\n💥 Swell and rupture\n☠️ Release toxic smoke\n\nThis happens to experienced engineers. Every rule below is mandatory. One mistake can end your competition, destroy equipment, or injure your team." },
    { heading:"Voltage limits — the critical rule", body:"Per cell limits (NEVER violate these):\nMAX charge:  4.20V  ← absolute ceiling\nNominal:     3.70V  ← normal resting voltage\nMIN storage: 3.80V  ← store at this voltage\nMIN discharge: 3.00V ← never go below this\n\n2S battery (2 cells in series):\nMax = 8.40V, Nominal = 7.40V, Min = 6.00V\n\nOver-charging → puffing → fire\nOver-discharging → permanent damage → fire risk on next charge" },
    { heading:"Charging rules", body:"✓ Use a LiPo-specific charger ONLY\n✓ Charge at 1C rate (= capacity in mAh)\n   Example: 1000mAh battery → charge at 1A\n✓ NEVER charge unattended\n✓ Charge inside a LiPo-safe bag or metal box\n✓ Never charge a hot or puffed battery\n✓ Store at 3.80–3.85V per cell if unused >24hrs\n   Most chargers have a 'storage' mode — use it\n\n⚠️ Never use a generic phone charger or power bank charger for LiPo batteries." },
    { heading:"Warning signs and emergency response", body:"PUFFING (battery looks swollen/bulgy):\n→ STOP using immediately\n→ Do NOT charge it\n→ Take outside, place on concrete in sand or metal container\n→ Discharge fully over days, then recycle\n\nSMELL or HEAT during charging:\n→ Disconnect immediately\n→ Take outside\n→ Watch for 30 minutes\n\nIF IT CATCHES FIRE:\n→ Do NOT use water (explosive reaction)\n→ Smother with DRY SAND\n→ Leave the room first, let it burn out safely" },
    { heading:"Key takeaways", body:"✓ Max 4.20V per cell — NEVER exceed\n✓ Min 3.00V per cell — NEVER discharge below\n✓ Store at 3.80–3.85V if not using for >24hrs\n✓ LiPo-specific charger ONLY\n✓ Never charge unattended\n✓ Puffed battery = throw it away, do NOT charge\n✓ Fire = sand, not water, then evacuate\n✓ Hard case during transport — no loose batteries in bags" },
  ],
  kicad: [
    { heading:"What is a PCB and why make one?", body:"A PCB (Printed Circuit Board) replaces breadboard wiring with a permanent, compact, reliable board.\n\nFor competition robots:\n→ Breadboards: wires fall out under vibration\n→ PCBs: soldered, vibration-proof, lighter\n→ KiCad is free and used by professional engineers\n\nWorkflow:\nSchematic → Footprints → PCB layout → Route traces → DRC → Export Gerbers → Order (JLCPCB: 5 boards ~$2)" },
    { heading:"Step 1 — Draw the schematic", body:"1. Open KiCad → New Project\n2. Open Schematic Editor\n3. Press A to add components\n4. Search: Arduino_Nano, L298N, C (capacitor), R (resistor)\n5. Connect pins with wire (W key)\n6. Add VCC and GND power symbols (P key)\n7. Label nets (L key) for key connections\n8. Run ERC (Electrical Rules Check) — fix all errors\n\nRule: Never skip the schematic. Layout without schematic = guaranteed mistakes." },
    { heading:"Step 2 — Footprints and PCB layout", body:"Footprint = the physical pad pattern on the PCB that a real component solders onto.\n\nAssign footprints: Tools → Assign Footprints\n→ Resistors: Resistor_THT:R_Axial_DIN0207\n→ Caps: Capacitor_THT:C_Disc_D5.0mm\n→ Arduino Nano: Module:Arduino_Nano\n\nIn PCB Editor:\n→ Update from schematic to import components\n→ Place components logically (sensors front, MCU middle, motors rear)\n→ Route traces (X key)\n→ Add GND copper fill (Zone tool)" },
    { heading:"Step 3 — DRC and export", body:"After routing:\n1. Run DRC (Design Rule Check)\n2. Fix EVERY error — no exceptions\n3. File → Plot → Gerber format\n4. Select layers: F.Cu, B.Cu, F.Silkscreen, F.Mask, B.Mask, Edge.Cuts\n5. Click 'Plot' then 'Generate Drill Files'\n6. Zip all files\n7. Upload to jlcpcb.com\n8. Review the Gerber preview on their site\n9. Order 5 copies — you WILL need spares" },
    { heading:"Key takeaways", body:"✓ Free tool, professional quality\n✓ Schematic FIRST — never skip this step\n✓ ERC catches errors before layout\n✓ Footprint must match the physical part you have\n✓ DRC must pass with 0 errors before ordering\n✓ JLCPCB: 5 boards for ~$2, ships in ~1 week\n✓ Order 5 copies — first board always has something to fix" },
  ],
  pcblayout: [
    { heading:"Rule 1 — GND copper fill first", body:"The single most impactful thing in PCB layout:\nFill the entire bottom copper layer with GND copper.\n\nWhy:\n→ Eliminates EMI from motors\n→ Low-impedance return path for all currents\n→ Shields signal traces from motor switching noise\n→ Reduces ground bounce that crashes microcontrollers\n\nIn KiCad: Add Zone on B.Cu → assign to GND net → fill (B key).\nThis one rule eliminates 50% of noise-related bugs.", visual: SVGs.groundPlane },
    { heading:"Rule 2 — Trace widths by current", body:"Signal traces (sensors, SPI, I2C):   0.25mm\nLow power (LEDs, logic):              0.25mm\nMedium power (Arduino power rail):    0.5mm\nMotor current (L298N output):         1.0–2.0mm\nBattery input:                        2.0–3.0mm\n\n⚠️ Thin trace + high current = trace burns off the board.\n\nUse JLCPCB's trace width calculator if unsure. Input: current, temperature rise, copper weight." },
    { heading:"Rule 3 — Decoupling capacitors", body:"Place a 100nF ceramic capacitor between VCC and GND as close as possible to every IC's power pin.\n\nWhy: When a chip switches state, it pulls a burst of current. If that current travels far, it creates voltage spikes that crash the chip.\n\nA decoupling cap right at the pin gives a local charge reservoir.\n\nFor your robot PCB:\n→ 100nF per Arduino VCC pin\n→ 100nF per L298N VCC pin\n→ 100µF electrolytic at main power input\n\nSkipping these = #1 cause of random resets in competition." },
    { heading:"Rule 4 — Component placement strategy", body:"For a line follower PCB:\n1. Sensor connector → front edge of PCB\n2. Motor driver → center (central power distribution)\n3. Microcontroller → near sensors (short signal paths)\n4. Battery connector → rear edge\n5. Power switch + indicator LED → accessible edge\n6. All connectors on PCB edges — never buried inside\n\n⚠️ Keep motor driver AWAY from sensor circuits.\nMotor switching noise corrupts analog sensor readings. Physical separation is the fix." },
    { heading:"Key takeaways", body:"✓ GND copper fill on bottom layer — always, first\n✓ Trace width must match current: signal=0.25mm, power=1mm+\n✓ 100nF decoupling cap next to EVERY IC VCC pin\n✓ Place all components before routing a single trace\n✓ Connectors go on PCB edges\n✓ Separate analog (sensor) area from motor driver area\n✓ DRC must show 0 errors\n✓ Order 5 boards — never just 1" },
  ],
  cad: [
    { heading:"Why design in CAD first?", body:"Without CAD:\n→ Cut material by guessing → pieces don't fit\n→ Discover problems after cutting → waste materials\n→ Hard to share design with team\n\nWith Fusion 360:\n→ Test fit before cutting anything\n→ Change one dimension → entire model updates\n→ Generate DXF for laser cutting, STL for 3D printing\n→ Free for students (autodesk.com/fusion360)\n\nDesign → simulate → cut. Never the other way." },
    { heading:"Fusion 360 core workflow", body:"SKETCH: Draw 2D shapes on a plane\n→ Lines, circles, rectangles\n→ Add dimensions to constrain them\n\nEXTRUDE: Push 2D shape into 3D\n→ Set thickness (e.g., 3mm for acrylic)\n\nMODIFY: Add holes, fillets, chamfers\n→ Circular holes for screws, slots for adjustment\n\nASSEMBLY: Combine parts with joints\n→ Test that motors fit, wheels clear the frame\n\nEXPORT:\n→ DXF → laser cutter\n→ STL → 3D printer" },
    { heading:"Key dimensions to design around", body:"Model these FIRST before drawing anything:\n\n1. Wheel diameter + width (e.g., 65mm × 26mm)\n2. Motor body size (N20: 12mm × 24mm body)\n3. QTR-8 sensor array: 75mm × 13mm\n4. Battery: measure your actual battery\n5. PCB: design PCB first, then chassis around it\n\nTypical competition chassis:\n→ Width: 120–150mm\n→ Length: 150–200mm\n→ Material: 3mm acrylic (cheap) or 2mm aluminum (lighter, stronger)" },
    { heading:"Critical design features", body:"MOTOR MOUNTS:\n→ Rectangular cutouts matching motor body exactly\n→ Add M2 screw holes for clamping\n→ Position motors so wheels are at CG\n\nSENSOR MOUNT:\n→ Target 3–8mm above ground\n→ Use slotted holes for height adjustment\n→ Must be rigid — wobbling sensor = noisy PID\n\nWHEEL CLEARANCE:\n→ 2–3mm clearance around wheel circumference\n→ Recess into chassis so wheels contact ground\n\nBATTERY MOUNT:\n→ Centered for balance\n→ Velcro + hard stops (not just velcro alone)" },
    { heading:"Key takeaways", body:"✓ Measure all components BEFORE drawing anything\n✓ Parametric: change one number → everything updates\n✓ Sensor height 3–8mm above ground\n✓ Motor position at center of gravity\n✓ DXF for laser cutting, STL for 3D printing\n✓ 3mm acrylic or 2mm aluminum for competition\n✓ Design iteration is FREE — cut only when confident" },
  ],
  controlsystems: [
    { heading:"The problem a control system solves", body:"Without a control system:\n→ Robot goes full speed in one direction, crashes\n→ No way to correct for slipping, battery sag, or uneven track\n\nWith a control system:\n→ Continuously measures what robot IS doing\n→ Compares to what you WANT it to do\n→ The difference = ERROR\n→ Adjusts to reduce error toward zero\n\nExample: Want robot at line center. Sensor says it's 20mm right. Error = 20mm. Controller steers left." },
    { heading:"Open loop vs Closed loop", body:"OPEN LOOP (no feedback):\n→ Send a command and hope for the best\n→ 'Turn left motor on for 1 second'\n→ If motor slips or battery is low → no correction\n→ Unreliable for any real robot\n\nCLOSED LOOP (with feedback):\n→ Command a target AND measure if you got there\n→ Read sensors → calculate error → correct\n→ Adjusts in real time for any disturbance\n\nYour line follower MUST be closed loop. The track is never perfectly straight and conditions change every run." },
    { heading:"Key terms explained", body:"PLANT = the thing you're controlling (motors + robot chassis)\n\nSETPOINT = where you WANT to be\n→ For line following: center of sensor array = 3500\n\nPROCESS VARIABLE = where you ACTUALLY are\n→ Computed from sensor array weighted position reading\n\nERROR = Setpoint − Process Variable\n= 3500 − sensor_position\n= 0 when centered, positive when right, negative when left\n\nCONTROLLER = your PID code\n→ Takes error as input, outputs motor correction", visual: SVGs.pidDiagram },
    { heading:"The feedback loop in your robot", body:"1. READ: QTR-8 sensors → get line position (0–7000)\n2. ERROR: error = 3500 − position\n3. CALCULATE: PID controller runs with error\n4. ACT: correction applied to left/right motor speeds\n5. REPEAT: back to step 1, 500+ times per second\n\nThe faster this loop runs = more responsive robot.\n\nArduino at 16MHz can run this loop 500–1000 times/second. More than fast enough for competition." },
    { heading:"Key takeaways", body:"✓ Control system = measure → compare → correct → repeat\n✓ Open loop = no feedback, unreliable for robots\n✓ Closed loop = sensor feedback, adjusts in real time\n✓ Setpoint = where you want to be (line center = 3500)\n✓ Error = setpoint − actual position\n✓ Your PID exists entirely to drive error → 0\n✓ Faster loop = more responsive, smoother robot" },
  ],
  pid: [
    { heading:"What PID means", body:"PID = Proportional + Integral + Derivative\nThree separate corrections added together:\n\nP → reacts to the CURRENT error\nI → reacts to ACCUMULATED past error\nD → reacts to the RATE OF CHANGE of error\n\nFinal output = (Kp × error) + (Ki × Σerror) + (Kd × Δerror)\n\nFor line followers: P + D is almost always enough.\nThe I term is usually skipped — it causes windup problems.\n\nKp, Kd = gain constants you tune by testing.", visual: SVGs.pidTerms },
    { heading:"P — Proportional (react to NOW)", body:"correction = Kp × error\n\nerror = 5 units off → correction = Kp × 5\nerror = 50 units off → correction = Kp × 50\n\nHigher Kp → faster response but robot zig-zags (oscillates)\nLower Kp  → smooth but slow, robot drifts\n\nWith P only:\n→ Robot follows the line but oscillates around center\n→ On sharp corners it overreacts and overshoots\n→ You need D to fix this" },
    { heading:"D — Derivative (predict FUTURE)", body:"correction = Kd × (error − last_error)\n\nThe D term predicts where error is GOING, not just where it is.\n\nError decreasing fast → 'you're coming back, ease off'\nError increasing fast → 'going further off-line, push harder'\n\nThis damping effect eliminates most oscillation.\n\nHigher Kd → more damping, smoother (but sluggish)\nLower Kd → less damping, responsive (but oscillates)\n\nPD control is the standard for line followers." },
    { heading:"Applying PID to motors", body:"int position = qtr.readLineBlack(sensorValues);\nint error = 3500 - position;\n\nfloat P = Kp * error;\nfloat D = Kd * (error - lastError);\nint correction = (int)(P + D);\nlastError = error;\n\nint leftSpeed  = baseSpeed + correction;\nint rightSpeed = baseSpeed - correction;\n\nleftSpeed  = constrain(leftSpeed,  0, 255);\nrightSpeed = constrain(rightSpeed, 0, 255);\nsetMotors(leftSpeed, rightSpeed);" },
    { heading:"Tuning Kp and Kd", body:"Step 1 — Tune P first (Kd = 0):\n→ Start Kp = 0.05\n→ Increase until robot starts oscillating (zig-zagging)\n→ Back off to ~60% of that value\n\nStep 2 — Add D:\n→ Start Kd = 0.2\n→ Increase until oscillation disappears\n→ If robot gets sluggish, reduce Kd slightly\n\nTypical competition values:\nKp = 0.05–0.3\nKd = 0.1–2.0\n\nAlways tune at SLOW speed first, then increase baseSpeed." },
  ],
  pidimpl: [
    { heading:"Complete robot program structure", body:"Your final competition code has 4 parts:\n\n1. SETUP: pin modes, sensor init, calibration\n2. CALIBRATE: sweep over line to map sensor range\n3. LOOP: read → error → PID → motors → repeat\n4. HELPER FUNCTIONS: setMotors(), readSensors()\n\nKeep each function doing ONE thing.\nNever put everything in loop() — it becomes unreadable and impossible to debug.\n\nTotal code for a working PID line follower: ~80–120 lines." },
    { heading:"Calibration routine", body:"void calibrate() {\n  for (uint16_t i = 0; i < 400; i++) {\n    qtr.calibrate();\n    // Sweep robot physically over line:\n    if (i < 200) setMotors(80, -80);  // right\n    else         setMotors(-80, 80);  // left\n  }\n  setMotors(0, 0);\n}\n\nCALIBRATION must happen on the ACTUAL track surface.\nIt maps each sensor's raw min/max to 0–1000.\nWithout it: sensors give wrong values → PID never tunes." },
    { heading:"The PID follow function", body:"void followLine() {\n  uint16_t pos = qtr.readLineBlack(sensorValues);\n  int error = 3500 - pos;\n\n  float P = Kp * error;\n  float D = Kd * (error - lastError);\n  int correction = (int)(P + D);\n  lastError = error;\n\n  int L = constrain(baseSpeed + correction, 0, 255);\n  int R = constrain(baseSpeed - correction, 0, 255);\n  setMotors(L, R);\n}" },
    { heading:"setMotors() function", body:"// Pins: IN1=2,IN2=3,ENA=~9  (left motor)\n//       IN3=4,IN4=5,ENB=~10 (right motor)\nvoid setMotors(int L, int R) {\n  if (L >= 0) { digitalWrite(2,HIGH); digitalWrite(3,LOW); }\n  else { digitalWrite(2,LOW); digitalWrite(3,HIGH); L=-L; }\n  analogWrite(9, L);\n\n  if (R >= 0) { digitalWrite(4,HIGH); digitalWrite(5,LOW); }\n  else { digitalWrite(4,LOW); digitalWrite(5,HIGH); R=-R; }\n  analogWrite(10, R);\n}" },
    { heading:"Tuning for competition", body:"1. Kp=0.05, Kd=0, baseSpeed=100 → verify it follows the line\n2. Increase Kp until it oscillates → back off 30%\n3. Add Kd=0.2 → increase until oscillation stops\n4. Raise baseSpeed by 20 → retune Kp/Kd if needed\n5. Repeat until maximum stable speed found\n\nFor sharp corners:\n→ Detect high error → automatically reduce speed\n→ if(abs(error) > 2000) baseSpeed = 80; else baseSpeed = 160;\n\nDocument every working combination." },
  ],
  qtr: [
    { heading:"The Pololu QTR-8A", body:"The industry standard sensor array for line following competitions:\n→ 8 IR sensors, 9.525mm pitch\n→ Total sensing width: ~67mm\n→ Each sensor outputs analog voltage 0–5V\n→ Low voltage = line detected, High = no line\n→ Built-in CTRL pin to power sensors on/off\n\nLibrary install: Arduino IDE → Library Manager → search 'QTRSensors' by Pololu → Install", visual: <img src={PHOTOS.qtr8} alt="Pololu QTR-8 sensor array" style={{width:"100%",maxWidth:280,display:"block",margin:"10px auto",borderRadius:6,border:"1px solid #1E3050"}}/> },
    { heading:"Hardware setup", body:"Pin connections:\nVCC  → 5V\nGND  → GND\nOUT1–OUT8 → A0–A7\nCTRL → any digital pin (e.g., D2)\n\nPhysical mounting:\n→ 3–8mm above ground\n→ Centered under robot\n→ Level and parallel to ground (use a small level)\n→ Perpendicular to direction of travel\n\nLower height = better black/white contrast, but risks hitting bumps\nHigher height = less contrast, but more forgiving over rough surfaces" },
    { heading:"Code setup", body:"#include <QTRSensors.h>\nQTRSensors qtr;\nconst uint8_t N = 8;\nuint16_t sensorValues[N];\n\nvoid setup() {\n  qtr.setTypeAnalog();\n  qtr.setSensorPins(\n    (const uint8_t[]){A0,A1,A2,A3,A4,A5,A6,A7}, N);\n  qtr.setEmitterPin(2);  // CTRL pin\n  calibrate();\n}" },
    { heading:"Calibration and reading position", body:"// Calibrate (sweep over line 400 times):\nvoid calibrate() {\n  for (uint16_t i = 0; i < 400; i++) {\n    qtr.calibrate();\n  }\n}\n\n// Read weighted line position:\nuint16_t pos = qtr.readLineBlack(sensorValues);\n// Returns 0–7000\n// 0    = leftmost sensor sees line\n// 7000 = rightmost sensor sees line\n// 3500 = center = your PID setpoint\n\nint error = 3500 - pos;  // feed this to PID" },
    { heading:"Key takeaways", body:"✓ QTR-8A = 8 sensors, analog output, competition standard\n✓ Wire OUT1–OUT8 to A0–A7 on Arduino\n✓ Mount 3–8mm above ground, perpendicular to travel\n✓ Use Pololu QTR library — don't write your own\n✓ CALIBRATE before EVERY run on the actual surface\n✓ readLineBlack() returns 0–7000 (3500 = center)\n✓ error = 3500 − position → feed directly to PID" },
  ],
  compete: [
    { heading:"What separates fast from slow", body:"Every team has a robot that follows the line.\nWhat separates 1st from 5th place:\n\n1. RELIABILITY — finishes every run (most important)\n2. CORNERING — holds line at speed through turns\n3. STRAIGHT-LINE SPEED — maximum speed on straights\n4. TUNING — Kp/Kd optimized for this specific track\n\nPriority order: Reliability > Cornering > Speed.\n\nA fast robot that leaves the line = disqualified.\nA slow reliable robot = guaranteed to finish." },
    { heading:"High-speed tuning", body:"At higher speeds, robot travels further per loop iteration. Errors grow faster and need faster correction.\n\nWhen you increase baseSpeed:\n→ Increase Kp proportionally\n→ Increase Kd (need more damping)\n→ Kd/Kp ratio usually stays similar\n\nZone speed control (advanced):\nif (abs(error) > 1500) {\n  speedLimit = 130;  // corner detected\n} else {\n  speedLimit = 220;  // straight section\n}\nbaseSpeed = speedLimit;" },
    { heading:"Chassis and hardware optimization", body:"Every gram removed = faster acceleration and cornering.\n\nWeight reduction:\n→ Aluminum or carbon fiber > acrylic\n→ Remove unnecessary standoffs\n→ Smaller capacity battery = lighter\n→ Minimize overhanging parts\n\nCenter of gravity:\n→ Battery low and centered between wheels\n→ Heavy components between wheel axles\n→ Minimize overhang past wheels\n\nSensor height tuning:\n→ At competition speed, vibration raises effective height\n→ Test sensor readings at full speed, not just stationary" },
    { heading:"Competition day preparation", body:"BEFORE every run:\n✓ Charge battery to 100% (4.20V per cell)\n✓ Calibrate sensors ON the competition track surface\n✓ Run one slow test lap first\n✓ Check all connections — vibration loosens everything\n✓ Confirm the Kp/Kd/speed combo for THIS track\n\nBRING with you:\n→ Spare charged battery\n→ Spare L298N (they fail)\n→ Laptop with code ready\n→ USB cable\n→ Small screwdriver set\n→ Spare motor if possible" },
    { heading:"Key takeaways", body:"✓ Reliability first — a robot that finishes beats one that doesn't\n✓ Tune at slow speed first, increase gradually\n✓ Zone control: slow on corners, fast on straights\n✓ Every gram saved = better acceleration\n✓ Calibrate on the actual track surface before every run\n✓ Bring spare battery and spare motor driver\n✓ Document every working Kp/Kd/speed combination" },
  ],
};

// ─── SLIDE PANEL ─────────────────────────────────────────────────────────────
function SlidePanel({ topic, color, onClose }) {
  const [idx, setIdx] = useState(0);
  const [slideAnim, setSlideAnim] = useState("in");
  const slides = SLIDES[topic];

  const goTo = useCallback((newIdx) => {
    setSlideAnim("out");
    setTimeout(() => { setIdx(newIdx); setSlideAnim("in"); }, 150);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && idx < slides.length - 1) goTo(idx + 1);
      if (e.key === "ArrowLeft" && idx > 0) goTo(idx - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [idx, slides, onClose, goTo]);

  if (!slides) return null;
  const slide = slides[idx];
  const total = slides.length;
  const words = slide.body.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(words / 200));

  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.88)", display:"flex", alignItems:"center", justifyContent:"center", padding:16, animation:"fadeIn 0.2s ease" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background:"#0D1625", border:`1px solid ${color}33`, borderRadius:14, width:"100%", maxWidth:600, maxHeight:"92vh", overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:`0 32px 80px rgba(0,0,0,0.9), 0 0 60px ${color}08`, animation:"scaleIn 0.25s cubic-bezier(0.4,0,0.2,1)" }}>

        {/* Header */}
        <div style={{ padding:"16px 20px 12px", borderBottom:"1px solid #1A2840", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
          <div>
            <div style={{ color:"#3A5070", fontSize:10, letterSpacing:2, fontFamily:"inherit" }}>STUDY GUIDE · SLIDE {idx+1}/{total} · {readTime} min read</div>
            <div style={{ color:"#E0EAF8", fontSize:16, fontWeight:700, marginTop:4, fontFamily:"inherit" }}>{slide.heading}</div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"1px solid #1A2840", color:"#3A5070", borderRadius:6, padding:"5px 11px", cursor:"pointer", fontSize:12, fontFamily:"inherit", transition:"all 0.15s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=color+"55";e.currentTarget.style.color=color;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="#1A2840";e.currentTarget.style.color="#3A5070";}}
          >✕</button>
        </div>

        {/* Progress */}
        <div style={{ height:3, background:"#0F1A2E", flexShrink:0 }}>
          <div style={{ height:"100%", background:`linear-gradient(90deg, ${color}, ${color}CC)`, width:`${((idx+1)/total)*100}%`, transition:"width 0.4s cubic-bezier(0.4,0,0.2,1)", borderRadius:"0 2px 2px 0", boxShadow:`0 0 8px ${color}40` }}/>
        </div>

        {/* Content */}
        <div style={{ flex:1, overflowY:"auto", padding:"20px 24px", opacity: slideAnim==="in"?1:0, transform: slideAnim==="in"?"translateX(0)":"translateX(12px)", transition:"opacity 0.15s, transform 0.15s" }}>
          {slide.visual && <div style={{ marginBottom:16 }}>{slide.visual}</div>}
          <pre style={{ color:"#8AADCC", fontSize:13, lineHeight:2, margin:0, fontFamily:"inherit", whiteSpace:"pre-wrap", wordBreak:"break-word" }}>
            {slide.body}
          </pre>
        </div>

        {/* Navigation */}
        <div style={{ padding:"12px 20px 14px", borderTop:"1px solid #1A2840", display:"flex", gap:10, alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <button onClick={() => goTo(Math.max(0,idx-1))} disabled={idx===0} style={{ background:"none", border:`1px solid ${idx===0?"#0F1A2E":color+"44"}`, color:idx===0?"#1E2C44":color, borderRadius:6, padding:"8px 18px", cursor:idx===0?"not-allowed":"pointer", fontSize:12, fontFamily:"inherit", fontWeight:600, transition:"all 0.15s" }}>← Prev</button>
          <div style={{ display:"flex", gap:6, alignItems:"center" }}>
            {slides.map((_,i) => (
              <button key={i} onClick={() => goTo(i)} style={{ width:i===idx?20:8, height:8, borderRadius:99, background:i===idx?color:"#1A2840", border:"none", cursor:"pointer", padding:0, transition:"all 0.3s cubic-bezier(0.4,0,0.2,1)" }}/>
            ))}
          </div>
          <button onClick={() => goTo(Math.min(total-1,idx+1))} disabled={idx===total-1} style={{ background:idx===total-1?"none":color, border:`1px solid ${idx===total-1?"#0F1A2E":color}`, color:idx===total-1?"#1E2C44":"#0B0F1A", borderRadius:6, padding:"8px 18px", cursor:idx===total-1?"not-allowed":"pointer", fontSize:12, fontFamily:"inherit", fontWeight:600, transition:"all 0.15s" }}>Next →</button>
        </div>

        {/* Keyboard hint */}
        <div style={{ padding:"0 20px 10px", textAlign:"center", flexShrink:0 }}>
          <span style={{ color:"#1A2840", fontSize:9, fontFamily:"inherit", letterSpacing:1 }}>← → navigate · ESC close</span>
        </div>
      </div>
    </div>
  );
}

// ─── PROGRESS HELPERS ─────────────────────────────────────────────────────────
const STORAGE_KEY = "nlfrc-progress";
function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
}
function saveProgress(p) { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }
function getStepKey(modId, stepNum) { return `${modId}-${stepNum}`; }

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeModule, setActiveModule] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const [activeColor, setActiveColor] = useState("#3B82F6");
  const [hovered, setHovered] = useState(null);
  const [progress, setProgress] = useState(loadProgress);
  const active = activeModule !== null ? modules[activeModule] : null;

  function openGuide(topic, color) { setActiveTopic(topic); setActiveColor(color); }

  function toggleStep(modId, stepNum) {
    const key = getStepKey(modId, stepNum);
    const next = { ...progress, [key]: !progress[key] };
    setProgress(next);
    saveProgress(next);
  }

  const totalSteps = modules.reduce((s, m) => s + m.steps.length, 0);
  const doneSteps = modules.reduce((s, m) => s + m.steps.filter(st => progress[getStepKey(m.id, st.step)]).length, 0);
  const overallPct = totalSteps > 0 ? Math.round((doneSteps / totalSteps) * 100) : 0;

  function getModuleDone(mod) {
    return mod.steps.filter(st => progress[getStepKey(mod.id, st.step)]).length;
  }

  return (
    <div style={{ minHeight:"100vh", background:"#080C14", fontFamily:"inherit", color:"#C8D4E8" }}>

      {activeTopic && <SlidePanel topic={activeTopic} color={activeColor} onClose={() => setActiveTopic(null)}/>}

      {/* Topbar */}
      <div style={{ borderBottom:"1px solid #0D1828", padding:"16px 22px 12px", background:"#080C14", position:"sticky", top:0, zIndex:10, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          {active && <button onClick={() => setActiveModule(null)} style={{ background:"none", border:"1px solid #1A2840", color:"#3A5070", borderRadius:6, padding:"4px 12px", fontSize:11, cursor:"pointer", fontFamily:"inherit", fontWeight:500, transition:"all 0.15s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="#3B82F644";e.currentTarget.style.color="#60A5FA";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="#1A2840";e.currentTarget.style.color="#3A5070";}}
          >← Back</button>}
          <span style={{ color:"#F59E0B", fontWeight:800, fontSize:13, letterSpacing:2, fontFamily:"inherit" }}>NLFRC 2026</span>
          {active && <span style={{ color:"#1A2840", fontSize:12, fontFamily:"inherit" }}>/ {active.title}</span>}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          {overallPct > 0 && <span style={{ color:"#3A5070", fontSize:10, fontFamily:"inherit", letterSpacing:1 }}>{doneSteps}/{totalSteps}</span>}
          <span style={{ color:"#1A2840", fontSize:10, letterSpacing:1, fontFamily:"inherit" }}>6 MODULES · 19 SESSIONS</span>
        </div>
      </div>
      {/* Overall progress bar */}
      <div style={{ height:2, background:"#0F1A2E" }}>
        <div style={{ height:"100%", background:"linear-gradient(90deg, #F59E0B, #3B82F6, #10B981)", width:`${overallPct}%`, transition:"width 0.5s cubic-bezier(0.4,0,0.2,1)", borderRadius:"0 1px 1px 0" }}/>
      </div>

      {/* Module grid */}
      {!active && (
        <div style={{ maxWidth:880, margin:"0 auto", padding:"36px 20px 60px" }}>
          {/* Hero + Stats side by side */}
          <div style={{ display:"flex", gap:24, marginBottom:28, flexWrap:"wrap", alignItems:"flex-start" }}>
            {/* Left: hero text */}
            <div style={{ flex:"1 1 400px", minWidth:280 }}>
              <h1 style={{ fontSize:"clamp(20px,4vw,30px)", fontWeight:700, color:"#E8F0FF", margin:"0 0 8px", letterSpacing:-1 }}>{'>'} Start from zero.<br/>{'>'} Build a competition robot.</h1>
              <p style={{ color:"#2A3F5A", fontSize:12, margin:0, lineHeight:1.7 }}>Each module = videos + illustrated step-by-step guides.<br/>Zero prior knowledge needed.</p>
            </div>
            {/* Right: stats panel */}
            <div style={{ flex:"0 0 auto", border:"1px dashed #1A2840", borderRadius:6, padding:"12px 16px", background:"#080C14", minWidth:180 }}>
              <div style={{ color:"#1E3050", fontSize:9, letterSpacing:2, marginBottom:8, borderBottom:"1px solid #111D30", paddingBottom:6 }}>SYSTEM STATUS</div>
              {[{n:"6", l:"modules", c:"#F59E0B"},{n:"19", l:"sessions", c:"#3B82F6"},{n:"18", l:"guides", c:"#10B981"},{n:`${overallPct}%`, l:"complete", c:"#8B5CF6"}].map(s=>(
                <div key={s.l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"3px 0" }}>
                  <span style={{ color:"#1E3050", fontSize:10 }}>{s.l}</span>
                  <span style={{ color:s.c, fontSize:13, fontWeight:700 }}>{s.n}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:12 }}>
            {modules.map((mod,i) => {
              const done = getModuleDone(mod);
              const pct = Math.round((done / mod.steps.length) * 100);
              const isComplete = pct === 100;
              return (
              <button key={mod.id} onClick={() => setActiveModule(i)}
                onMouseEnter={e=>{e.currentTarget.style.border=`1px solid ${isComplete?"#10B981":mod.color}55`;e.currentTarget.style.transform="translateY(-2px)";}}
                onMouseLeave={e=>{e.currentTarget.style.border=isComplete?"1px solid #10B98130":"1px solid #111D30";e.currentTarget.style.transform="translateY(0)";}}
                style={{ background:isComplete?"#06120E":"#0C1220", border:isComplete?"1px solid #10B98130":"1px solid #111D30", borderRadius:6, padding:"16px 14px", cursor:"pointer", textAlign:"left", fontFamily:"inherit", position:"relative", overflow:"hidden", transition:"all 0.15s", animation:isComplete?"completedPulse 2s ease-in-out infinite":"none" }}>
                {/* Top accent */}
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:isComplete?"#10B981":mod.color, opacity:isComplete?1:0.7 }}/>
                {/* Complete overlay scanline */}
                {isComplete && <div style={{ position:"absolute", inset:0, background:"repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(16,185,129,0.02) 3px, rgba(16,185,129,0.02) 4px)", pointerEvents:"none" }}/>}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                  <div style={{ fontSize:24 }}>{mod.emoji}</div>
                  {isComplete ? (
                    <span style={{ background:"#10B98120", border:"1px solid #10B98150", borderRadius:4, padding:"2px 8px", fontSize:9, color:"#10B981", fontWeight:700, letterSpacing:1 }}>✓ COMPLETE</span>
                  ) : done > 0 ? (
                    <span style={{ background:mod.color+"10", border:`1px solid ${mod.color}25`, borderRadius:4, padding:"2px 8px", fontSize:9, color:"#3A5070", fontWeight:600 }}>{done}/{mod.steps.length}</span>
                  ) : null}
                </div>
                <div style={{ color:isComplete?"#10B981":"#3A5070", fontSize:9, letterSpacing:2, marginBottom:3 }}>MODULE {mod.id}</div>
                <div style={{ color:isComplete?"#A7F3D0":"#C8D8F0", fontSize:14, fontWeight:700, marginBottom:4, lineHeight:1.3 }}>{mod.title}</div>
                <div style={{ color:isComplete?"#065F46":"#1E3050", fontSize:11, marginBottom:10, lineHeight:1.5 }}>{mod.tagline}</div>
                <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginBottom:8 }}>
                  {mod.sessions.map(s=><span key={s} style={{ background:isComplete?"#06120E":"#0A1020", border:`1px solid ${isComplete?"#10B98120":"#1A2840"}`, borderRadius:3, padding:"2px 6px", fontSize:8, color:isComplete?"#10B98180":"#1E3050" }}>{s}</span>)}
                </div>
                {/* Mini progress bar */}
                {done > 0 && !isComplete && <div style={{ height:2, background:"#111D30", borderRadius:99, marginBottom:8, overflow:"hidden" }}><div style={{ height:"100%", background:mod.color, width:`${pct}%`, borderRadius:99, transition:"width 0.4s" }}/></div>}
                <div style={{ color:isComplete?"#10B981":mod.color, fontSize:10, fontWeight:600 }}>{isComplete ? "→ review all steps" : `${mod.steps.length} videos · ${mod.steps.length} guides →`}</div>
              </button>
              );
            })}
          </div>

          {/* Tip */}
          <div style={{ marginTop:18, padding:"10px 14px", border:"1px dashed #111D30", borderRadius:4, background:"#080C14" }}>
            <span style={{ color:"#1E3050", fontSize:11, lineHeight:1.7 }}>{'>'} Do modules in order. Each one builds on the last.<br/>{'>'} Click <span style={{ color:"#3B82F6" }}>📖 Study Guide</span> inside each step to read the explanation before watching the video.</span>
          </div>
        </div>
      )}

      {/* Module detail */}
      {active && (
        <div style={{ maxWidth:720, margin:"0 auto", padding:"28px 20px 80px", animation:"fadeIn 0.3s ease" }}>
          <div style={{ marginBottom:24, paddingBottom:18, borderBottom:`1px solid ${active.color}18` }}>
            <div style={{ fontSize:30, marginBottom:7 }}>{active.emoji}</div>
            <div style={{ color:"#3A5070", fontSize:10, letterSpacing:2, marginBottom:4, fontFamily:"inherit" }}>MODULE {active.id} OF 6 · {getModuleDone(active)}/{active.steps.length} COMPLETE</div>
            <h2 style={{ color:"#E0EAF8", fontSize:26, fontWeight:800, margin:"0 0 6px", letterSpacing:-0.5, fontFamily:"inherit" }}>{active.title}</h2>
            <p style={{ color:"#2A3F5A", fontSize:13, margin:"0 0 12px", fontFamily:"inherit" }}>{active.tagline}</p>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {active.sessions.map(s=><span key={s} style={{ background:active.color+"10", border:`1px solid ${active.color}25`, borderRadius:4, padding:"3px 8px", fontSize:10, color:active.color, fontFamily:"inherit" }}>{s}</span>)}
            </div>
          </div>

          <div style={{ position:"relative" }}>
            <div style={{ position:"absolute", left:16, top:32, bottom:32, width:1, background:`linear-gradient(180deg, ${active.color}30, #0D1828, ${active.color}10)` }}/>

            {active.steps.map((step,i) => {
              const isOn = hovered === i;
              const isDone = progress[getStepKey(active.id, step.step)];
              return (
                <div key={i} style={{ display:"flex", gap:16, marginBottom:12 }}>
                  <div style={{ flexShrink:0, width:34, height:34, borderRadius:"50%", background:isDone?(step.warning?"#2A1A00":"#0A1A30"):step.warning?"#1A0E00":"#0C1220", border:`2px solid ${isDone?"#10B981":step.warning?"#F59E0B":active.color}`, display:"flex", alignItems:"center", justifyContent:"center", color:isDone?"#10B981":step.warning?"#F59E0B":active.color, fontSize:isDone?14:12, fontWeight:700, zIndex:1, position:"relative", transition:"all 0.3s", fontFamily:"inherit" }}>{isDone?"✓":step.step}</div>
                  <div style={{ flex:1 }} onMouseEnter={()=>setHovered(i)} onMouseLeave={()=>setHovered(null)}>
                    <div style={{ background:step.warning?"#100B00":"#0C1220", border:`1px solid ${step.warning?"#F59E0B33":isOn?active.color+"44":"#111D30"}`, borderRadius:10, overflow:"hidden", transition:"all 0.2s" }}>
                      <div style={{ padding:"14px 16px" }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                          <div style={{ color:step.warning?"#F59E0B":"#3A5070", fontSize:10, letterSpacing:1.5, fontWeight:700, fontFamily:"inherit" }}>STEP {step.step}{step.warning?" — MANDATORY":""}</div>
                          <button onClick={(e) => { e.stopPropagation(); toggleStep(active.id, step.step); }}
                            style={{ background:isDone?"#10B98120":"transparent", border:`1px solid ${isDone?"#10B98150":"#1A2840"}`, borderRadius:6, padding:"3px 10px", cursor:"pointer", fontSize:10, color:isDone?"#10B981":"#1E3050", fontFamily:"inherit", fontWeight:600, transition:"all 0.2s", letterSpacing:0.5 }}
                            onMouseEnter={e=>{if(!isDone){e.currentTarget.style.borderColor="#10B98140";e.currentTarget.style.color="#10B981";}}}
                            onMouseLeave={e=>{if(!isDone){e.currentTarget.style.borderColor="#1A2840";e.currentTarget.style.color="#1E3050";}}}
                          >{isDone?"✓ Done":"Mark done"}</button>
                        </div>
                        <div style={{ color:step.warning?"#FCD34D":"#E0EAF8", fontSize:15, fontWeight:700, marginBottom:5, lineHeight:1.35, fontFamily:"inherit", textDecoration:isDone?"line-through":"none", opacity:isDone?0.6:1 }}>{step.label}</div>
                        <div style={{ color:step.warning?"#8B6E20":"#2A3F5A", fontSize:12, lineHeight:1.7, marginBottom:10, fontFamily:"inherit" }}>{step.why}</div>
                        {/* Video source */}
                        <div style={{ color:"#1E3050", fontSize:10, marginBottom:8, fontFamily:"inherit", letterSpacing:0.5 }}>📹 {step.video}</div>
                        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                          <a href={step.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
                            <div style={{ display:"flex", alignItems:"center", gap:8, background:"#080C14", border:`1px solid ${step.warning?"#F59E0B33":active.color+"33"}`, borderRadius:6, padding:"8px 14px", transition:"all 0.15s" }}
                              onMouseEnter={e=>e.currentTarget.style.borderColor=step.warning?"#F59E0B66":active.color+"66"}
                              onMouseLeave={e=>e.currentTarget.style.borderColor=step.warning?"#F59E0B33":active.color+"33"}
                            >
                              <span style={{ color:step.warning?"#F59E0B":active.color, fontSize:12, fontWeight:700, fontFamily:"inherit" }}>▶ Watch</span>
                              <span style={{ color:"#1A2840", fontSize:10 }}>·</span>
                              <span style={{ color:"#2A3F5A", fontSize:11, fontFamily:"inherit" }}>{step.duration}</span>
                              {step.direct && <span style={{ background:"#0A150A", border:"1px solid #10B98130", borderRadius:3, padding:"2px 6px", fontSize:9, color:"#10B981", letterSpacing:1, fontFamily:"inherit" }}>✓ direct</span>}
                            </div>
                          </a>
                          {SLIDES[step.topic] && (
                            <button onClick={() => openGuide(step.topic, active.color)} style={{ display:"flex", alignItems:"center", gap:7, background:"#080C14", border:"1px solid #1A3060", borderRadius:6, padding:"8px 14px", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}
                              onMouseEnter={e=>e.currentTarget.style.borderColor="#3B82F655"}
                              onMouseLeave={e=>e.currentTarget.style.borderColor="#1A3060"}
                            >
                              <span style={{ fontSize:13 }}>📖</span>
                              <span style={{ color:"#3B82F6", fontSize:12, fontWeight:700 }}>Study Guide</span>
                              <span style={{ color:"#2A3F5A", fontSize:10, fontFamily:"inherit" }}>{SLIDES[step.topic].length} slides</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {activeModule < modules.length-1 && (
            <button onClick={() => { setActiveModule(activeModule+1); window.scrollTo(0,0); }}
              onMouseEnter={e=>{e.currentTarget.style.background="#0F1628";e.currentTarget.style.transform="translateY(-1px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="#0C1220";e.currentTarget.style.transform="translateY(0)";}}
              style={{ marginTop:24, width:"100%", background:"#0C1220", border:`1px solid ${modules[activeModule+1].color}25`, borderRadius:10, padding:"16px 18px", cursor:"pointer", textAlign:"left", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"space-between", transition:"all 0.2s cubic-bezier(0.4,0,0.2,1)" }}>
              <div>
                <div style={{ color:"#3A5070", fontSize:10, letterSpacing:2, marginBottom:3, fontFamily:"inherit" }}>UP NEXT</div>
                <div style={{ color:modules[activeModule+1].color, fontSize:15, fontWeight:700 }}>{modules[activeModule+1].emoji} {modules[activeModule+1].title}</div>
              </div>
              <span style={{ color:"#2A3F5A", fontSize:20, transition:"transform 0.2s" }}>→</span>
            </button>
          )}
        </div>
      )}

      {/* Footer */}
      <div style={{ borderTop:"1px solid #0D1828", padding:"24px 20px", textAlign:"center" }}>
        <div style={{ color:"#1A2840", fontSize:10, fontFamily:"inherit", letterSpacing:2 }}>NLFRC 2026 · BUILT FOR COMPETITION</div>
      </div>
    </div>
  );
}
