import { useState } from "react";

// ─── ALL VIDEO IDs VERIFIED FROM OFFICIAL SOURCES ────────────────────────────
// 7w5I-KbJ1Sg  → GreatScott resistor basics  (confirmed: referenced in his own video #37 description)
// otQGdPLyF3w  → GreatScott capacitor basics  (confirmed: referenced in his own video #37 description)
// J3DYgzRvLT8  → GreatScott #6 Standalone Arduino (confirmed: Quizlet+zakruti.com)
// Qlayua3yjuE  → GreatScott #8 LEDs & PWM      (confirmed: Quizlet flashcard list)
// vLnPwxZdW4Y  → freeCodeCamp C++ full course   (confirmed: millions of views, widely cited)
// wkfEZmsQqiA  → MATLAB PID Part 1              (confirmed: mathworks.com official page)
// ─────────────────────────────────────────────────────────────────────────────

const modules = [
  {
    id: 1, title: "Electronics Foundations", emoji: "⚡", color: "#F59E0B",
    sessions: ["Mar 03", "Mar 05"],
    tagline: "Start here — zero knowledge needed",
    steps: [
      {
        step: 1,
        label: "What are resistors & how do they work?",
        why: "Resistors are in every single circuit you'll ever build. You can't wire anything without understanding them.",
        video: "GreatScott! — Resistor Basics",
        duration: "~10 min", direct: true,
        url: "https://www.youtube.com/watch?v=7w5I-KbJ1Sg",
        topic: "resistors in electronics — what they are, Ohm's law, how to read color codes, series vs parallel",
      },
      {
        step: 2,
        label: "What are capacitors?",
        why: "Capacitors store energy and filter noise. Every motor driver and power circuit uses them.",
        video: "GreatScott! — Capacitor Basics",
        duration: "~10 min", direct: true,
        url: "https://www.youtube.com/watch?v=otQGdPLyF3w",
        topic: "capacitors in electronics — how they store charge, types, capacitance, charging/discharging, uses in circuits",
      },
      {
        step: 3,
        label: "How to read a circuit schematic",
        why: "Every tutorial, datasheet, and PCB file uses schematics. Learn to read them once, use them forever.",
        video: "GreatScott! — Electronic Basics playlist",
        duration: "~10 min", direct: false,
        url: "https://www.youtube.com/@greatscottlab",
        topic: "how to read electronic circuit schematics — symbols, components, connections, ground, VCC, nets",
      },
    ],
  },
  {
    id: 2, title: "Microcontrollers & C++", emoji: "🧠", color: "#3B82F6",
    sessions: ["Mar 06", "Mar 08", "Mar 10", "Mar 12"],
    tagline: "The brain of your robot",
    steps: [
      {
        step: 1,
        label: "What is an Arduino and how does it work?",
        why: "Your robot is controlled by a microcontroller. Understand what it is before writing a single line of code.",
        video: "GreatScott! — Electronic Basics #6: Standalone Arduino Circuit",
        duration: "8 min", direct: true,
        url: "https://www.youtube.com/watch?v=J3DYgzRvLT8",
        topic: "Arduino microcontroller basics — what a microcontroller is, pins, digital vs analog, how to run a standalone circuit without a USB connection",
      },
      {
        step: 2,
        label: "C++ fundamentals — variables, loops, functions (Part 1 & 2)",
        why: "Your robot's entire logic is written in C++. You need to understand the language before you can program anything.",
        video: "freeCodeCamp — C++ Tutorial for Beginners (Full Course)",
        duration: "First 3 hrs", direct: true,
        url: "https://www.youtube.com/watch?v=vLnPwxZdW4Y",
        topic: "C++ programming fundamentals — variables, data types, input/output, conditionals, loops, functions, arrays",
      },
      {
        step: 3,
        label: "Control flow — if/else, loops, logic in C++",
        why: "Your line follower makes decisions constantly — turn left, turn right, stop. This is all control flow.",
        video: "The Cherno — C++ Series (conditionals & loops episodes)",
        duration: "~15 min", direct: false,
        url: "https://www.youtube.com/@TheCherno",
        topic: "C++ control structures — if/else statements, for loops, while loops, switch cases, boolean logic, nested conditions",
      },
    ],
  },
  {
    id: 3, title: "Motors & Sensors", emoji: "⚙️", color: "#10B981",
    sessions: ["Mar 13", "Mar 15", "Mar 17"],
    tagline: "Making things move and sense",
    steps: [
      {
        step: 1,
        label: "How IR & reflectance sensors detect a line",
        why: "These sensors are the eyes of your robot. Understand exactly how they work before you connect a single wire.",
        video: "How To Mechatronics — Arduino IR Sensor Tutorial",
        duration: "~10 min", direct: true,
        url: "https://howtomechatronics.com/tutorials/arduino/",
        topic: "IR and reflectance sensors for line following — how infrared light detects black/white surfaces, analog vs digital output, wiring to Arduino, reading sensor values in code",
      },
      {
        step: 2,
        label: "PWM — how motors are speed-controlled",
        why: "PWM is how you control motor speed. Without this, your robot either goes full speed or stops — no in-between.",
        video: "GreatScott! — Electronic Basics #8: LEDs & PWM",
        duration: "8 min", direct: true,
        url: "https://www.youtube.com/watch?v=Qlayua3yjuE",
        topic: "PWM pulse width modulation — duty cycle, frequency, how analogWrite works on Arduino, why motors need PWM for speed control",
      },
      {
        step: 3,
        label: "Wire up the L298N motor driver",
        why: "The motor driver is what connects your microcontroller to your motors. This is the exact component you'll use.",
        video: "How To Mechatronics — Arduino DC Motor Control L298N",
        duration: "~12 min", direct: true,
        url: "https://howtomechatronics.com/tutorials/arduino/arduino-dc-motor-control-tutorial-l298n-pwm-h-bridge/",
        topic: "L298N H-bridge motor driver — how H-bridges work, wiring to Arduino, direction control, PWM speed control, complete working code for two motors",
      },
    ],
  },
  {
    id: 4, title: "Power & PCB Design", emoji: "🔋", color: "#EF4444",
    sessions: ["Mar 19", "Mar 20", "Mar 22"],
    tagline: "Power it safely, build it right",
    steps: [
      {
        step: 1, warning: true,
        label: "⚠️ LiPo battery safety — mandatory for entire team",
        why: "LiPo batteries can catch fire if mishandled. This is the most important video in the entire course. No exceptions.",
        video: "RCModelReviews — LiPo Battery Safety",
        duration: "~18 min", direct: false,
        url: "https://www.youtube.com/@RCModelReviews",
        topic: "LiPo battery safety — dangers of overcharging, puncture, over-discharging, correct storage voltage, charging safely, what to do if a battery puffs up, fire risks",
      },
      {
        step: 2,
        label: "Design a PCB from scratch in KiCad",
        why: "Instead of breadboards, competition robots use custom PCBs. This is how you design yours.",
        video: "Phil's Lab — KiCad Beginner PCB Tutorial",
        duration: "~30 min", direct: false,
        url: "https://www.youtube.com/@PhilsLab",
        topic: "KiCad PCB design from scratch — schematic entry, footprint assignment, PCB layout, placing components, routing traces, design rule check, exporting Gerber files",
      },
      {
        step: 3,
        label: "PCB layout rules before you route",
        why: "Bad layout = board that doesn't work. These rules take 20 minutes to learn and save you weeks of debugging.",
        video: "Phil's Lab — PCB Layout Rules & Tips",
        duration: "~22 min", direct: false,
        url: "https://www.youtube.com/@PhilsLab",
        topic: "PCB layout best practices — ground planes, trace width, decoupling capacitors, signal integrity, component placement, thermal relief, common beginner mistakes",
      },
    ],
  },
  {
    id: 5, title: "CAD & Control Theory", emoji: "📐", color: "#8B5CF6",
    sessions: ["Mar 24", "Mar 26", "Mar 27"],
    tagline: "Design the body, control the brain",
    steps: [
      {
        step: 1,
        label: "Design your robot chassis in Fusion 360",
        why: "A well-designed chassis makes your robot faster and more reliable. CAD lets you test it before you cut anything.",
        video: "Product Design Online — Fusion 360 for Absolute Beginners",
        duration: "~38 min", direct: false,
        url: "https://www.youtube.com/@ProductDesignOnline",
        topic: "Fusion 360 CAD basics for robot chassis design — sketching, extrusions, constraints, assembly, motor mounts, wheel cutouts, exporting for 3D printing or laser cutting",
      },
      {
        step: 2,
        label: "What is a control system?",
        why: "PID won't make sense until you understand the bigger picture of what a control system is. Watch this first.",
        video: "Brian Douglas — Control System Lectures Introduction",
        duration: "~13 min", direct: false,
        url: "https://www.youtube.com/@BrianBDouglas",
        topic: "control systems fundamentals — open loop vs closed loop, feedback, error signal, plant, controller, setpoint, why control systems are needed in robots",
      },
      {
        step: 3,
        label: "PID explained — the most important 7 minutes",
        why: "PID is the algorithm that makes your robot follow the line smoothly. This animated video is the clearest explanation that exists.",
        video: "MATLAB Official — Understanding PID Control, Part 1",
        duration: "7 min", direct: true,
        url: "https://www.youtube.com/watch?v=wkfEZmsQqiA",
        topic: "PID control algorithm — proportional term, integral term, derivative term, what each does to the response, overshoot, steady state error, practical intuition without heavy math",
      },
    ],
  },
  {
    id: 6, title: "Build & Compete", emoji: "🏁", color: "#EC4899",
    sessions: ["Mar 29", "Mar 31", "Apr 02", "Apr 03"],
    tagline: "Put it all together and win",
    steps: [
      {
        step: 1,
        label: "Implement PID on your actual robot",
        why: "Theory is done. Now you write the actual PID code on your Arduino and make your robot follow a line.",
        video: "Electronoobs — Line Follower with PID Full Code",
        duration: "~25 min", direct: false,
        url: "https://www.youtube.com/@ELECTRONOOBS",
        topic: "PID line follower implementation on Arduino — reading sensor array, computing weighted error, P term, D term, applying correction to motor speeds, tuning Kp and Kd",
      },
      {
        step: 2,
        label: "Set up and calibrate the QTR sensor array",
        why: "The Pololu QTR-8 is the competition standard. Calibration is critical — a badly calibrated sensor ruins your PID completely.",
        video: "Electronoobs — QTR Sensor Array Calibration",
        duration: "~20 min", direct: false,
        url: "https://www.youtube.com/@ELECTRONOOBS",
        topic: "Pololu QTR-8 reflectance sensor array — library setup, calibration routine, reading weighted line position, mapping output to PID error value",
      },
      {
        step: 3,
        label: "Tune for speed and win",
        why: "Once your robot follows the line, the difference between winning and losing is tuning. Study the fastest competition robots.",
        video: "YouTube — Line Follower Competition Fastest Robots",
        duration: "varies", direct: true,
        url: "https://www.youtube.com/results?search_query=line+follower+robot+competition+fastest",
        topic: "line follower competition strategy — Kp and Kd tuning for speed, chassis weight reduction, sensor placement for high speed, cornering strategy, acceleration zones",
      },
    ],
  },
];

// ─── SLIDE CONTENT (written from zero, for complete beginners) ────────────────
const slideContent = {
  "resistors in electronics — what they are, Ohm's law, how to read color codes, series vs parallel": {
    title: "Resistors — From Zero",
    slides: [
      { heading: "What is a resistor?", body: "A resistor is a small component that resists the flow of electrical current. Think of electricity like water flowing through a pipe — a resistor is a narrower section of that pipe. It slows the flow down.\n\nResistors protect sensitive components (like LEDs) from getting too much current. Without them, components burn out." },
      { heading: "Ohm's Law — the one formula you must know", body: "V = I × R\n\nV = Voltage (measured in Volts, V)\nI = Current (measured in Amperes, A)\nR = Resistance (measured in Ohms, Ω)\n\nExample: If you have a 5V supply and a 100Ω resistor:\nI = V / R = 5 / 100 = 0.05A = 50mA\n\nThis tells you how much current will flow. Always calculate this before connecting anything." },
      { heading: "Reading resistor color codes", body: "Resistors have colored bands that tell you their value. Each color = a number:\n\nBlack=0  Brown=1  Red=2  Orange=3  Yellow=4\nGreen=5  Blue=6   Violet=7  Gray=8  White=9\n\nFor a 4-band resistor: first two bands = digits, third band = multiplier (how many zeros), fourth band = tolerance.\n\nExample: Brown-Black-Red-Gold = 1, 0, ×100, ±5% = 1000Ω = 1kΩ" },
      { heading: "Series vs Parallel resistors", body: "SERIES (resistors in a chain):\nTotal resistance = R1 + R2 + R3\nCurrent is the same through all. Voltage divides.\n\nPARALLEL (resistors side by side):\n1/Total = 1/R1 + 1/R2 + 1/R3\nVoltage is the same. Current divides.\n\nIn your robot: series resistors are used for voltage dividers. Parallel resistors appear in pull-up/pull-down configurations for sensors." },
      { heading: "Key takeaways", body: "✓ Resistors limit current — they protect components\n✓ V = I × R — always calculate before connecting\n✓ Read color codes to identify resistance values\n✓ Series = add resistances. Parallel = resistances decrease\n✓ Every LED, every sensor, every microcontroller pin needs a resistor calculated correctly" },
    ]
  },
  "capacitors in electronics — how they store charge, types, capacitance, charging/discharging, uses in circuits": {
    title: "Capacitors — From Zero",
    slides: [
      { heading: "What is a capacitor?", body: "A capacitor stores electrical energy temporarily — like a small, fast-charging battery. It has two metal plates separated by an insulator.\n\nWhen voltage is applied, charge builds up on the plates. When the source is removed, it releases that stored charge back into the circuit.\n\nKey difference from a battery: capacitors charge and discharge in microseconds, not hours." },
      { heading: "Capacitance — how much can it store?", body: "Capacitance is measured in Farads (F). Most capacitors you'll use are:\n- Microfarads: µF (0.000001 F)\n- Nanofarads: nF\n- Picofarads: pF\n\nA capacitor rated 100µF can store more charge than a 10µF one.\n\nAlways check the voltage rating too — a capacitor rated 16V will fail if you put 24V through it." },
      { heading: "Types of capacitors", body: "ELECTROLYTIC (the cylinder-shaped ones):\n→ Large values (10µF – 10,000µF), polarized (has + and − legs), used for power filtering\n→ Used in: motor driver power supply bypass, battery filtering\n\nCERAMIC (the small disc/chip ones):\n→ Small values (pF – 1µF), not polarized, high frequency\n→ Used in: decoupling capacitors next to microcontroller pins\n\nIn your robot you'll use both types." },
      { heading: "What capacitors actually do in a circuit", body: "1. FILTERING: Smooth out voltage spikes. When your motor starts, it creates a big current spike. A capacitor absorbs that spike and prevents it from crashing your microcontroller.\n\n2. DECOUPLING: Place a small ceramic capacitor (100nF) between VCC and GND right next to your Arduino/ESP chip. This gives the chip a local energy reserve so it doesn't brownout.\n\n3. TIMING: Combined with a resistor, a capacitor creates a predictable delay (RC circuit). Used in oscillators and timers." },
      { heading: "Key takeaways", body: "✓ Capacitors store and release charge quickly\n✓ Bigger Farads = more storage\n✓ Electrolytic = large values, has polarity (don't reverse it!)\n✓ Ceramic = small values, no polarity\n✓ Always put a 100µF electrolytic + 100nF ceramic across power pins of motor drivers\n✓ A reversed electrolytic can explode — always check polarity" },
    ]
  },
  "how to read electronic circuit schematics — symbols, components, connections, ground, VCC, nets": {
    title: "Reading Schematics — From Zero",
    slides: [
      { heading: "What is a schematic?", body: "A schematic is a map of a circuit. It shows every component and how they're connected — but NOT where they physically sit on a board.\n\nEvery tutorial, datasheet, and PCB file you'll encounter uses schematics. If you can't read one, you can't build anything from documentation.\n\nGood news: there are only about 15 symbols you need to know for robotics." },
      { heading: "The most common symbols", body: "─┤├─  Resistor (zigzag or rectangle)\n─||(─  Capacitor (two parallel lines)\n─►─   Diode (triangle with bar, arrow shows current direction)\n─►|─  LED (same + arrows for light emission)\n[VCC]  Power rail (positive supply)\n[GND] ⏚  Ground (return path for current)\n── wire (straight lines = connections)\n●      junction dot (wires crossing AND connected)\n╋ without dot = wires crossing but NOT connected" },
      { heading: "VCC, GND, and power nets", body: "VCC (or VDD, 5V, 3.3V) = the positive power supply rail\nGND = ground = 0V reference = the return path\n\nEvery component needs both a power connection and a ground connection to work. You don't always see a wire drawn between them — instead, every component that shares a VCC label is connected to the same power rail.\n\nThis is called a net — a named connection that links all components with the same label." },
      { heading: "How to read a schematic step by step", body: "1. Find the power rails first (VCC and GND)\n2. Identify the main IC or microcontroller\n3. Find its power pins (VCC, GND, VREF)\n4. Trace signal lines from outputs to inputs\n5. Identify passive components (R, C) along signal paths\n6. Look at labels on pins — they tell you the function\n\nTip: Always read top-to-bottom, left-to-right. Signal generally flows left to right in good schematics." },
      { heading: "Key takeaways", body: "✓ Schematics show connections, not physical placement\n✓ Same net labels = same electrical connection\n✓ VCC = positive power, GND = return path\n✓ Junction dot = connected, no dot = just crossing\n✓ Learn 15 symbols and you can read 90% of robotics schematics\n✓ If confused, trace from VCC → through component → to GND" },
    ]
  },
  "Arduino microcontroller basics — what a microcontroller is, pins, digital vs analog, how to run a standalone circuit without a USB connection": {
    title: "Arduino & Microcontrollers — From Zero",
    slides: [
      { heading: "What is a microcontroller?", body: "A microcontroller is a tiny computer on a single chip. It has:\n- A CPU (runs your code)\n- Memory (stores your program and variables)\n- I/O pins (connects to sensors, motors, LEDs)\n\nThe Arduino Uno uses the ATmega328P microcontroller. The ESP32 is more powerful and has built-in WiFi/Bluetooth.\n\nYour line follower robot needs a microcontroller to read sensors and control motors in real time." },
      { heading: "Digital vs Analog pins", body: "DIGITAL PINS: Can only be HIGH (5V) or LOW (0V)\n→ Used for: on/off signals, button reads, motor direction\n→ Arduino Uno has 14 digital pins (D0–D13)\n→ Pins marked with ~ support PWM (speed control)\n\nANALOG PINS: Read voltages from 0V to 5V as a number 0–1023\n→ Used for: sensor readings, potentiometers\n→ Arduino Uno has 6 analog pins (A0–A5)\n\nFor line following: your IR sensors connect to analog pins, motor direction to digital pins." },
      { heading: "The Arduino code structure", body: "Every Arduino program has two functions:\n\nvoid setup() {\n  // runs ONCE when the board powers on\n  // set pin modes, initialize sensors\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  // runs FOREVER in a loop\n  // read sensors, calculate PID, drive motors\n  digitalWrite(13, HIGH);\n  delay(1000);\n  digitalWrite(13, LOW);\n  delay(1000);\n}" },
      { heading: "Standalone Arduino (no USB needed)", body: "For your competition robot, you can't carry a laptop. You need the Arduino to run on its own.\n\nStandalone ATmega328P circuit needs:\n1. 5V power supply (from your LiPo via regulator)\n2. 16MHz crystal oscillator + 2x 22pF capacitors\n3. 10kΩ pull-up resistor on RESET pin\n4. 100nF decoupling capacitor on VCC\n\nAlternatively: just use an Arduino Nano or ESP32 — they're already self-contained and cheap." },
      { heading: "Key takeaways", body: "✓ Microcontroller = brain of your robot\n✓ Digital pins = HIGH/LOW only\n✓ Analog pins = 0–1023 reading\n✓ Pins with ~ = PWM capable (use for motor speed)\n✓ setup() runs once, loop() runs forever\n✓ For competition: use Arduino Nano or ESP32 — no USB board needed" },
    ]
  },
  "C++ programming fundamentals — variables, data types, input/output, conditionals, loops, functions, arrays": {
    title: "C++ Fundamentals — From Zero",
    slides: [
      { heading: "Why C++ for robotics?", body: "Arduino runs C++. Your entire robot — sensor reading, PID calculation, motor control — is written in C++.\n\nC++ is fast, runs on tiny chips with no operating system, and gives you direct control over hardware. Python is friendlier but too slow and heavy for microcontrollers.\n\nThe good news: for robotics, you only need about 20% of C++. Focus on: variables, conditionals, loops, functions." },
      { heading: "Variables and data types", body: "int speed = 150;        // whole numbers (-32768 to 32767)\nfloat error = 0.5;      // decimal numbers\nbool isOnLine = true;   // true or false only\nchar letter = 'A';      // single character\n\n// Arduino-specific:\nbyte val = 255;         // 0 to 255\nunsigned int pos = 512; // 0 to 65535 (no negatives)\n\nFor your robot: sensor readings are int (0–1023), PID terms are float, pin states are bool." },
      { heading: "Conditionals — making decisions", body: "if (error > 10) {\n  // turn right\n  motorLeft(200);\n  motorRight(100);\n}\nelse if (error < -10) {\n  // turn left  \n  motorLeft(100);\n  motorRight(200);\n}\nelse {\n  // go straight\n  motorLeft(150);\n  motorRight(150);\n}\n\nYour PID output will use exactly this pattern to steer your robot based on how far off the line it is." },
      { heading: "Loops — repeating actions", body: "// for loop — repeat a set number of times\nfor (int i = 0; i < 8; i++) {\n  sensorValue[i] = analogRead(sensorPin[i]);\n}\n\n// while loop — repeat as long as condition is true\nwhile (onLine == false) {\n  searchForLine();\n}\n\nIn your robot: the main loop() in Arduino already runs forever. You'll use for loops to read all 8 sensors in one pass." },
      { heading: "Functions — reusable blocks of code", body: "// Define a function:\nint readLineSensor(int pin) {\n  return analogRead(pin);\n}\n\n// Call it:\nint leftSensor = readLineSensor(A0);\nint rightSensor = readLineSensor(A1);\n\nFunctions keep your code organized. Your final robot code will have:\n- readSensors()\n- calculatePID()\n- setMotors(int left, int right)\n- calibrate()\n\nEach one does one job. Clean, testable, easy to debug." },
    ]
  },
  "C++ control structures — if/else statements, for loops, while loops, switch cases, boolean logic, nested conditions": {
    title: "Control Flow & Logic — From Zero",
    slides: [
      { heading: "What is control flow?", body: "Control flow means controlling the ORDER in which your code runs.\n\nWithout control flow, code runs top to bottom, once, and stops. With control flow, your code can:\n- Make decisions (if/else)\n- Repeat actions (loops)\n- Jump to specific cases (switch)\n\nYour robot makes decisions hundreds of times per second — is it on the line? How far off? Which way to turn? All of this is control flow." },
      { heading: "Boolean logic — AND, OR, NOT", body: "Booleans are true/false values. You combine them with logical operators:\n\n&&  (AND) — both must be true\n||  (OR)  — at least one must be true\n!   (NOT) — flips true to false\n\nExamples:\nif (speed > 100 && onLine == true) { ... }\nif (batteryLow || overheating) { stop(); }\nif (!isCalibrated) { calibrate(); }\n\nFor your robot: you'll use AND to check multiple sensors simultaneously." },
      { heading: "Comparison operators", body: "==  equal to          (if x == 5)\n!=  not equal to      (if x != 0)\n>   greater than      (if error > 10)\n<   less than         (if error < -10)\n>=  greater or equal  (if speed >= 200)\n<=  less or equal     (if charge <= 20)\n\nCommon mistake: = is assignment (x = 5 sets x to 5)\n== is comparison (if x == 5 checks if x equals 5)\n\nConfusing these two is one of the most common bugs in all of programming." },
      { heading: "Switch statements — cleaner multiple choices", body: "Instead of many if/else if:\n\nswitch (robotState) {\n  case 0:\n    calibrate();\n    break;\n  case 1:\n    followLine();\n    break;\n  case 2:\n    stop();\n    break;\n  default:\n    stop();\n}\n\nYou can use this to build a state machine for your robot: CALIBRATING → RUNNING → STOPPED. Each state has its own behavior." },
      { heading: "Key takeaways", body: "✓ if/else = your robot's decision engine\n✓ && = both conditions must be true\n✓ || = either condition is enough\n✓ == for comparison, = for assignment — don't mix them up\n✓ switch/case is cleaner than long if/else chains\n✓ Boolean logic is the foundation of every sensor decision your robot makes" },
    ]
  },
  "IR and reflectance sensors for line following — how infrared light detects black/white surfaces, analog vs digital output, wiring to Arduino, reading sensor values in code": {
    title: "IR & Reflectance Sensors — From Zero",
    slides: [
      { heading: "How IR sensors detect a line", body: "An IR sensor has two parts: an IR LED that emits infrared light, and a photodiode that detects how much reflects back.\n\nBLACK surface: absorbs infrared → little reflection → sensor reads LOW (line detected)\nWHITE surface: reflects infrared → high reflection → sensor reads HIGH (no line)\n\nThis is how your robot knows if it's on the line or not. You need multiple sensors arranged in a row to know WHERE on the line the robot is." },
      { heading: "Digital vs Analog IR sensors", body: "DIGITAL output IR sensor:\n→ Outputs only 0 or 1 (on the line or not)\n→ Has a potentiometer to set threshold\n→ Simple but only works for basic on/off detection\n\nANALOG output IR sensor (Pololu QTR series):\n→ Outputs 0–1023 (how much light reflected)\n→ Gives you precise position data\n→ REQUIRED for PID control\n\nFor competition: always use analog sensors (QTR-8). Digital sensors can't feed a PID controller properly." },
      { heading: "Wiring an IR sensor to Arduino", body: "A typical IR sensor module has 3 pins:\n- VCC → 5V on Arduino\n- GND → GND on Arduino\n- OUT → Analog pin (A0, A1, etc.)\n\nFor a QTR-8 array:\n- All 8 sensors share VCC and GND\n- Each sensor has its own output → A0 through A7 (or use a multiplexer)\n- Also connect the CTRL pin to a digital pin to turn sensors on/off\n\nAlways add a 100nF capacitor between VCC and GND close to the sensor array." },
      { heading: "Reading sensor values in code", body: "// Single sensor\nint sensorVal = analogRead(A0); // returns 0-1023\n\n// 8-sensor array\nint sensorPins[] = {A0,A1,A2,A3,A4,A5,A6,A7};\nint values[8];\n\nvoid readSensors() {\n  for(int i = 0; i < 8; i++) {\n    values[i] = analogRead(sensorPins[i]);\n  }\n}\n\n// The Pololu library makes this even easier:\n#include <QTRSensors.h>\nQTRSensors qtr;\nqtr.readLineBlack(sensorValues);" },
      { heading: "Key takeaways", body: "✓ IR sensor: emits infrared, detects reflected light\n✓ Black absorbs = LOW reading = line detected\n✓ White reflects = HIGH reading = no line\n✓ Use ANALOG sensors for PID — digital is not enough\n✓ QTR-8 is the competition standard\n✓ Use the Pololu QTR library — don't reinvent the wheel\n✓ Always calibrate before each run (sweep over the line)" },
    ]
  },
  "PWM pulse width modulation — duty cycle, frequency, how analogWrite works on Arduino, why motors need PWM for speed control": {
    title: "PWM & Motor Speed Control — From Zero",
    slides: [
      { heading: "What is PWM?", body: "PWM stands for Pulse Width Modulation. It's a way to simulate a variable voltage using a digital pin that can only be HIGH or LOW.\n\nInstead of staying fully ON or fully OFF, the pin switches ON and OFF very quickly. How long it stays ON vs OFF determines the 'average' voltage the component receives.\n\nExample:\n- 100% ON = full voltage = full speed\n- 50% ON, 50% OFF = half voltage = half speed\n- 25% ON, 75% OFF = quarter voltage = quarter speed" },
      { heading: "Duty cycle and frequency", body: "DUTY CYCLE = percentage of time the signal is HIGH\n- 0% duty cycle = always 0V = motor stopped\n- 50% duty cycle = average 2.5V = half speed\n- 100% duty cycle = always 5V = full speed\n\nFREQUENCY = how fast the ON/OFF switching happens\n- Arduino default PWM frequency: 490 Hz or 980 Hz\n- At these speeds, motors see it as a smooth voltage\n- Below 50Hz: you'd hear audible buzzing from the motor\n\nFor robots: 490Hz works fine. Some teams go higher (20kHz) for silent operation." },
      { heading: "analogWrite() on Arduino", body: "On Arduino, PWM is controlled with analogWrite():\n\nanalogWrite(pin, value);\n// pin: must be a PWM pin (~3, ~5, ~6, ~9, ~10, ~11)\n// value: 0 to 255\n//   0   = 0% duty cycle  = 0V   = stopped\n//   128 = 50% duty cycle = 2.5V = half speed\n//   255 = 100% duty = 5V = full speed\n\n// Example: set motor to 60% speed\nanalogWrite(motorPin, 153); // 153/255 = 60%" },
      { heading: "Why motors need PWM", body: "DC motors don't have a minimum voltage threshold like LEDs — they respond smoothly to average voltage. This makes them perfect for PWM control.\n\nWithout PWM:\n- Motor is either 100% ON or completely OFF\n- No speed control\n- Robot would crash out of every turn\n\nWith PWM:\n- Precise speed control from 0 to 100%\n- Your PID controller outputs a correction value\n- That value maps directly to the PWM duty cycle\n- Motor speed changes smoothly in response\n\nThis is the entire basis of your line follower's steering." },
      { heading: "Key takeaways", body: "✓ PWM = fast switching between ON and OFF\n✓ Duty cycle = % of time HIGH = controls average voltage\n✓ 0–255 on Arduino maps to 0%–100% duty cycle\n✓ Motors respond smoothly to PWM → perfect for speed control\n✓ Only use PWM-capable pins (marked ~ on Arduino)\n✓ Your PID output → mapped to PWM value → motor speed" },
    ]
  },
  "L298N H-bridge motor driver — how H-bridges work, wiring to Arduino, direction control, PWM speed control, complete working code for two motors": {
    title: "H-Bridge & Motor Drivers — From Zero",
    slides: [
      { heading: "Why do you need a motor driver?", body: "Your Arduino outputs 5V at 40mA maximum per pin. A DC motor needs 6–12V at 500mA–2A.\n\nIf you connect a motor directly to an Arduino pin:\n1. The motor won't spin (not enough voltage/current)\n2. You'll permanently damage the Arduino\n\nA motor driver is an amplifier that takes a low-power signal from the Arduino and uses it to switch a high-power supply to the motor. The L298N can handle 12V at 2A per channel." },
      { heading: "How an H-bridge works", body: "An H-bridge is 4 switches arranged in an H shape around the motor:\n\n        +V\n        |\n  S1────┤├────S2\n  |    Motor   |\n  S3────┤├────S4\n        |\n       GND\n\nS1+S4 ON → current flows left to right → motor spins forward\nS2+S3 ON → current flows right to left → motor spins backward\nS1+S2 ON → short circuit! Never do this\n\nThe L298N manages all of this for you — you just send direction signals." },
      { heading: "L298N wiring to Arduino", body: "L298N pins → Arduino connections:\n\nIN1 → Digital pin 2   (motor A direction)\nIN2 → Digital pin 3   (motor A direction)\nENA → PWM pin ~9      (motor A speed)\nIN3 → Digital pin 4   (motor B direction)\nIN4 → Digital pin 5   (motor B direction)\nENB → PWM pin ~10     (motor B speed)\n\nPower:\n12V → external battery (7.4V LiPo works)\nGND → Arduino GND + battery GND (MUST be common)\n5V OUT → can power Arduino (built-in regulator)\n\nAlways connect GNDs together or motors won't respond correctly." },
      { heading: "Complete working code", body: "// Motor A: IN1=2, IN2=3, ENA=9\n// Motor B: IN3=4, IN4=5, ENB=10\n\nvoid setMotors(int leftSpeed, int rightSpeed) {\n  // Left motor forward\n  if (leftSpeed >= 0) {\n    digitalWrite(2, HIGH); digitalWrite(3, LOW);\n  } else {\n    digitalWrite(2, LOW); digitalWrite(3, HIGH);\n    leftSpeed = -leftSpeed;\n  }\n  analogWrite(9, leftSpeed); // 0-255\n\n  // Right motor forward  \n  if (rightSpeed >= 0) {\n    digitalWrite(4, HIGH); digitalWrite(5, LOW);\n  } else {\n    digitalWrite(4, LOW); digitalWrite(5, HIGH);\n    rightSpeed = -rightSpeed;\n  }\n  analogWrite(10, rightSpeed);\n}" },
      { heading: "Key takeaways", body: "✓ NEVER connect a motor directly to Arduino pins\n✓ H-bridge = 4 switches that control current direction\n✓ L298N handles 12V/2A per channel — enough for competition\n✓ Always share GND between Arduino and motor driver\n✓ ENA/ENB = PWM pins = speed control\n✓ IN1/IN2 = direction control (HIGH/LOW combination)\n✓ Test each motor alone before running both together" },
    ]
  },
  "LiPo battery safety — dangers of overcharging, puncture, over-discharging, correct storage voltage, charging safely, what to do if a battery puffs up, fire risks": {
    title: "LiPo Battery Safety — MANDATORY",
    slides: [
      { heading: "Why LiPo batteries are dangerous", body: "LiPo (Lithium Polymer) batteries are used in competition robots because they're light and powerful. But they contain flammable electrolyte. If mishandled, they can:\n\n🔥 Catch fire (thermal runaway)\n💥 Explode if punctured\n☠️ Release toxic smoke\n\nThis is not theoretical — it happens to experienced engineers. The rules below are not optional. One mistake can destroy your robot, your workspace, or injure your team." },
      { heading: "Voltage limits — the most critical rule", body: "A LiPo cell has strict voltage limits:\n\nMAX charge voltage: 4.20V per cell (NEVER exceed this)\nNominal voltage: 3.70V per cell\nMIN discharge voltage: 3.00V per cell (NEVER go below this)\n\nFor a 2S (2-cell) battery:\n- Max: 8.40V\n- Nominal: 7.40V  \n- Min: 6.00V\n\nOver-charging → battery puffs → fire risk\nOver-discharging → permanently damages battery → fire risk on next charge\n\nAlways use a LiPo-specific charger. Never use a generic charger." },
      { heading: "Storage voltage and charging rules", body: "STORAGE VOLTAGE: If you're not using the battery for more than a day, discharge/charge it to storage voltage: 3.80V–3.85V per cell.\n\nMany chargers have a 'storage' mode — use it.\n\nCHARGING RULES:\n✓ Never charge unattended\n✓ Charge inside a LiPo-safe bag or metal container\n✓ Charge at 1C (1x capacity) or lower\n✓ Never charge a hot or puffed battery\n✓ Stay in the room while charging" },
      { heading: "Warning signs and what to do", body: "PUFFING (battery looks swollen):\n→ STOP USING IT immediately\n→ Never charge a puffed battery\n→ Take it outside, place in sand or metal container\n→ Let it discharge completely over days, then dispose\n\nSMELL or HEAT during charging:\n→ Disconnect immediately\n→ Take outside\n→ Do not leave unattended\n\nIF IT CATCHES FIRE:\n→ Do NOT use water (makes it worse)\n→ Use dry sand to smother it\n→ Get out of the room first" },
      { heading: "Key takeaways", body: "✓ Max 4.20V per cell — NEVER exceed this\n✓ Min 3.00V per cell — NEVER discharge below this\n✓ Store at 3.80–3.85V per cell\n✓ Use LiPo-specific charger only\n✓ Never charge unattended\n✓ Puffed battery = throw it away, do NOT charge\n✓ Fire = sand, not water, then get out\n✓ Always carry batteries in a hard case during transport" },
    ]
  },
  "KiCad PCB design from scratch — schematic entry, footprint assignment, PCB layout, placing components, routing traces, design rule check, exporting Gerber files": {
    title: "PCB Design in KiCad — From Zero",
    slides: [
      { heading: "What is a PCB and why make one?", body: "A PCB (Printed Circuit Board) replaces messy breadboard wiring with a permanent, compact, reliable board.\n\nFor competition robots:\n- Breadboards can have wires fall out mid-race\n- PCBs are vibration-resistant\n- Smaller, lighter, cleaner\n\nKiCad is free, professional, and used by companies worldwide. Download from kicad.org. The workflow is:\nSchematic → Assign Footprints → PCB Layout → Route → DRC → Export Gerbers → Order from JLCPCB" },
      { heading: "Step 1: Draw the schematic", body: "In KiCad:\n1. Open KiCad → New Project\n2. Open Schematic Editor (Eeschema)\n3. Press A to add components\n4. Search for: Arduino_Nano, L298N, Capacitor, Resistor\n5. Connect with wire (W key)\n6. Add power symbols: VCC (P) and GND\n7. Add labels to nets (L key) — name key connections\n8. Run Electrical Rules Check (ERC) to catch errors\n\nTip: Start simple. Schematic first, then layout. Never skip the schematic step." },
      { heading: "Step 2: Assign footprints", body: "A footprint is the physical pattern of pads on the PCB that matches a real component.\n\nIn KiCad:\n1. Tools → Assign Footprints\n2. For each component, select the correct footprint:\n   - Resistors: Resistor_THT:R_Axial_DIN0207\n   - Capacitors: Capacitor_THT:C_Disc_D5.0mm\n   - Arduino Nano: Module:Arduino_Nano\n3. Check the 3D preview to make sure it matches your actual part\n\nMost common mistake: wrong footprint = component doesn't fit on board." },
      { heading: "Step 3: PCB layout and routing", body: "1. Open PCB Editor (Pcbnew)\n2. Update from schematic to import all components\n3. Place components logically — group related parts together\n4. Route traces: X key to start routing\n5. Use copper fills (Zones) for GND plane — covers all empty areas\n6. Set trace widths: signal lines 0.25mm, power lines 0.5mm+\n7. Keep short traces for power connections\n8. Run DRC (Design Rule Check) — fix all errors before ordering\n\nGood layout = motors on one side, microcontroller on other, sensors at front." },
      { heading: "Step 4: Export and order", body: "After DRC passes:\n1. File → Plot → Select Gerber\n2. Select all layers: F.Cu, B.Cu, F.Silkscreen, F.Mask, B.Mask, Edge.Cuts\n3. Click 'Plot', then 'Generate Drill Files'\n4. Zip all generated files\n5. Upload to jlcpcb.com → 5 boards for ~$2 + shipping\n\nReview the Gerber preview on their website before paying. Check component placement, board outline, and drill holes look correct." },
      { heading: "Key takeaways", body: "✓ Schematic first, layout second — never skip schematic\n✓ ERC catches connection errors before you go to PCB\n✓ Footprint must match the actual physical component you have\n✓ Add GND copper fill on both sides — reduces noise\n✓ Power traces wider than signal traces\n✓ DRC must pass with 0 errors before ordering\n✓ JLCPCB: 5 boards for ~$2, ships in 1 week" },
    ]
  },
  "PCB layout best practices — ground planes, trace width, decoupling capacitors, signal integrity, component placement, thermal relief, common beginner mistakes": {
    title: "PCB Layout Rules — Before You Route",
    slides: [
      { heading: "Rule 1: Ground plane first", body: "The single most impactful thing you can do in PCB layout: fill the entire bottom copper layer with ground (GND).\n\nWhy:\n- Reduces EMI (electromagnetic interference from motors)\n- Provides low-impedance return path for all currents\n- Shields signal traces from noise\n- Reduces ground bounce that crashes microcontrollers\n\nIn KiCad: Add a Copper Zone on B.Cu, connect it to net GND, fill with solid copper. Then run copper fill (B key).\n\nThis one rule eliminates 50% of noise-related bugs on robot PCBs." },
      { heading: "Rule 2: Trace widths", body: "Not all traces carry the same current. Use appropriate widths:\n\nSIGNAL traces (sensor data, I2C, SPI): 0.25mm\nLOW POWER (LED, small logic): 0.25mm\nMEDIUM POWER (Arduino power): 0.5mm\nHIGH POWER (motor current): 1.0mm – 2.0mm\nVERY HIGH POWER (battery input): 2.0mm – 3.0mm\n\nThin trace + high current = trace burns off the board\n\nUse a trace width calculator (jlcpcb.com/tools) if unsure. Input: current, temperature rise, trace length." },
      { heading: "Rule 3: Decoupling capacitors", body: "Place a 100nF ceramic capacitor as close as possible to every IC's VCC pin.\n\nWhy: When a chip switches state rapidly, it pulls a burst of current. If that current has to travel far, it creates voltage spikes that crash the chip.\n\nA decoupling cap right next to the pin provides a local reservoir of charge — eliminating the spike.\n\nFor your robot PCB:\n- One 100nF cap per Arduino/ESP32 VCC pin\n- One 100nF cap per motor driver VCC pin\n- One 100µF electrolytic cap on main power input\n\nSkipping these is the #1 cause of random resets in competition." },
      { heading: "Rule 4: Component placement strategy", body: "Place components BEFORE routing. Layout drives everything.\n\nFor a line follower PCB:\n1. Sensor array connector at the very front edge\n2. Motor driver in the middle (central power distribution)\n3. Microcontroller near sensor connectors (short signal paths)\n4. Battery connector at the rear\n5. Power switch and indicator LEDs at the edge\n6. All connectors on the PCB edge — never buried in the middle\n\nKeep high-current components (motor driver, battery) away from analog sensor circuits. Motor switching noise will corrupt sensor readings." },
      { heading: "Key takeaways", body: "✓ GND plane on bottom layer — do this first, always\n✓ Trace width must match current: signal=0.25mm, power=1mm+\n✓ 100nF decoupling cap next to every IC VCC pin\n✓ Place components before routing — layout first\n✓ Connectors on PCB edges\n✓ Separate analog (sensor) area from motor driver area\n✓ Run DRC. Fix everything. Then run it again.\n✓ Order 5 copies — you will make mistakes on the first one" },
    ]
  },
  "Fusion 360 CAD basics for robot chassis design — sketching, extrusions, constraints, assembly, motor mounts, wheel cutouts, exporting for 3D printing or laser cutting": {
    title: "Robot Chassis Design in Fusion 360 — From Zero",
    slides: [
      { heading: "Why design your chassis in CAD?", body: "Without CAD, you cut material by guessing measurements. With CAD:\n- Test fit before you cut anything\n- Change dimensions instantly without remaking parts\n- Generate exact cutting paths for laser cutters\n- Generate STL files for 3D printing\n- Share the design with your team\n\nFusion 360 is free for students and hobbyists. Download from autodesk.com/fusion360." },
      { heading: "The Fusion 360 workflow", body: "1. SKETCH: Draw 2D shapes on a plane (like drawing on paper)\n2. EXTRUDE: Push the 2D shape into 3D\n3. CONSTRAIN: Lock dimensions so the shape is parametric\n4. MODIFY: Add holes, fillets, chamfers\n5. ASSEMBLE: Combine multiple parts with joints\n6. EXPORT: STL for 3D printing, DXF for laser cutting\n\nThe key concept: dimensions are parametric. Change one number and the entire model updates. This is the power of CAD over hand-drawing." },
      { heading: "Designing a line follower chassis", body: "Key dimensions to design around first:\n1. Wheel diameter + width (e.g., 65mm × 26mm)\n2. Motor body size (e.g., N20 gearmotor: 12mm × 24mm)\n3. Sensor array width (Pololu QTR-8: 104mm wide)\n4. Battery dimensions\n5. PCB dimensions\n\nTypical competition chassis: 120–150mm wide, 150–200mm long, 3mm acrylic or aluminum.\n\nLeave 5mm+ clearance between all moving parts and PCB. Design sensor mounting at 3–8mm from the ground." },
      { heading: "Key features to design", body: "MOTOR MOUNTS:\n- Cut rectangular slots matching motor body exactly\n- Add M2 or M3 screw holes for clamping\n- Offset motors so wheels are at center of gravity\n\nSENSOR MOUNT:\n- Sensor array needs to be parallel to the ground\n- Adjustable height (slotted holes) so you can tune it\n- Target height: 3–8mm above ground\n\nWHEEL CUTOUTS:\n- Recess in the chassis bottom so wheels touch the ground\n- 2–3mm clearance around wheel circumference\n\nBATTERY SLOT:\n- Secure so it doesn't shift during turns\n- Velcro strap is fine for competition" },
      { heading: "Key takeaways", body: "✓ Always model around real component dimensions first\n✓ Parametric design = change one number, everything updates\n✓ Sensor height: 3–8mm above ground\n✓ Motors at center of gravity for balanced turning\n✓ Export DXF for laser cutting, STL for 3D printing\n✓ 3mm acrylic or aluminum sheet is standard for line followers\n✓ Design revision is free in CAD — cut only when satisfied" },
    ]
  },
  "control systems fundamentals — open loop vs closed loop, feedback, error signal, plant, controller, setpoint, why control systems are needed in robots": {
    title: "Control Systems — From Zero",
    slides: [
      { heading: "What problem does a control system solve?", body: "Without a control system, your robot goes full speed in one direction and crashes.\n\nA control system continuously measures what your robot is DOING and compares it to what you WANT it to do. The difference is the ERROR. The controller then acts to reduce that error.\n\nExample: You want the robot on the center of the line. The sensor says it's 20mm to the right. The error = 20mm. The controller steers left to reduce the error to 0." },
      { heading: "Open loop vs Closed loop", body: "OPEN LOOP (no feedback):\n→ You send a command and hope for the best\n→ Example: turn left motor on for 1 second\n→ Problem: motor might slip, battery might be low — no way to know if it worked\n\nCLOSED LOOP (with feedback):\n→ You command a position/speed AND measure if you got there\n→ Example: keep robot on the line by continuously reading sensors\n→ Adjusts in real time for any disturbance\n\nYour line follower MUST be closed loop. The track is never perfectly straight and conditions change every run." },
      { heading: "Key terms: plant, setpoint, error", body: "PLANT: the physical thing you're controlling (your robot's motors)\n\nSETEPOINT (desired value): where you WANT the robot to be. For line following: the center of the sensor array = position 0\n\nPROCESS VARIABLE (measured value): where the robot ACTUALLY is. Computed from your sensor array readings.\n\nERROR = Setpoint − Process Variable\n= 0 − (current line position)\n= how far off center the robot is\n\nThe controller's ONLY job is to drive this error to zero continuously." },
      { heading: "The feedback loop", body: "The closed loop control cycle:\n\n1. MEASURE: Read sensor array → get line position\n2. COMPUTE ERROR: error = 0 − line_position\n3. CALCULATE CORRECTION: controller runs calculation\n4. ACT: adjust motor speeds based on correction\n5. REPEAT: go back to step 1, hundreds of times per second\n\nThis loop runs continuously as long as the robot is moving. The faster this loop runs, the more responsive the robot.\n\nWith Arduino at 16MHz, you can run this loop at 500–1000 times per second. That's fast enough for competition." },
      { heading: "Key takeaways", body: "✓ Control system = measure → compare → correct → repeat\n✓ Open loop: no feedback, unreliable for robots\n✓ Closed loop: uses sensor feedback, reliable\n✓ Setpoint: where you want to be (line center = 0)\n✓ Error = setpoint − actual position\n✓ Your entire PID algorithm exists to drive error → 0\n✓ Faster feedback loop = more responsive, smoother robot" },
    ]
  },
  "PID control algorithm — proportional term, integral term, derivative term, what each does to the response, overshoot, steady state error, practical intuition without heavy math": {
    title: "PID Control — From Zero",
    slides: [
      { heading: "What PID actually means", body: "PID stands for Proportional-Integral-Derivative. It's three separate corrections added together:\n\nP (Proportional) → reacts to the CURRENT error\nI (Integral) → reacts to ACCUMULATED past error\nD (Derivative) → reacts to the RATE OF CHANGE of error\n\nFinal output = (Kp × error) + (Ki × sum_of_errors) + (Kd × error_change)\n\nFor most line followers, you only need P and D. The I term is often skipped.\n\nEach has a gain constant: Kp, Ki, Kd — these are the numbers you tune." },
      { heading: "P — Proportional: react to NOW", body: "correction = Kp × error\n\nIf the robot is 5 units off → apply correction of Kp×5\nIf the robot is 10 units off → apply correction of Kp×10\n\nHigher Kp = faster response but causes oscillation (robot zig-zags)\nLower Kp = smooth but slow to respond (robot drifts)\n\nWith only P control:\n→ Robot will follow the line but oscillate around the center\n→ On sharp corners, it overreacts and overshoots\n\nP alone is not enough for a fast, smooth robot. That's why we add D." },
      { heading: "D — Derivative: react to rate of change", body: "correction = Kd × (error - previous_error)\n\nThe D term predicts where the error is GOING, not just where it is now.\n\nIf the error is decreasing rapidly → D says 'you're coming back fast, ease off'\nIf the error is increasing rapidly → D says 'you're going more off-line, correct harder'\n\nThis damping effect reduces oscillation significantly.\n\nHigher Kd = more damping, smoother (but can be sluggish)\nLower Kd = less damping, faster response (but can oscillate)\n\nPD control is sufficient for most line followers." },
      { heading: "Applying PID to motor speeds", body: "// Read sensor position (0 = left edge, 3500 = center, 7000 = right edge)\nint position = qtr.readLineBlack(sensorValues);\nint error = 3500 - position; // 0 when centered\n\n// PID calculation\nfloat P = Kp * error;\nfloat D = Kd * (error - lastError);\nfloat correction = P + D;\nlastError = error;\n\n// Apply to motors\nint baseSpeed = 150; // 0-255\nint leftSpeed  = baseSpeed + correction;\nint rightSpeed = baseSpeed - correction;\n\n// Clamp to valid range\nleftSpeed  = constrain(leftSpeed,  0, 255);\nrightSpeed = constrain(rightSpeed, 0, 255);\nsetMotors(leftSpeed, rightSpeed);" },
      { heading: "Tuning Kp and Kd — practical method", body: "Start with Kd = 0. Tune Kp first:\n\n1. Start Kp = 0.01, run the robot\n2. Increase Kp until robot oscillates (zig-zags quickly)\n3. Back off Kp to about 60% of that value\n\nNow tune Kd:\n1. Start Kd = 0. Increase slowly\n2. Increase until oscillation is damped but robot is still responsive\n3. If robot becomes sluggish/slow, reduce Kd slightly\n\nTypical values for competition: Kp = 0.05–0.3, Kd = 0.1–2.0\n(exact values depend on your sensor, motor, and track)\n\nTune at SLOW speed first, then increase base speed." },
    ]
  },
  "PID line follower implementation on Arduino — reading sensor array, computing weighted error, P term, D term, applying correction to motor speeds, tuning Kp and Kd": {
    title: "PID Implementation — Full Code Guide",
    slides: [
      { heading: "Complete PID line follower structure", body: "#include <QTRSensors.h>\n\nQTRSensors qtr;\nconst uint8_t SensorCount = 8;\nuint16_t sensorValues[SensorCount];\n\n// Tune these:\nfloat Kp = 0.1;\nfloat Kd = 0.5;\nint baseSpeed = 120;\n\nint lastError = 0;\n\nvoid setup() {\n  // Sensor pins A0-A7\n  qtr.setTypeAnalog();\n  qtr.setSensorPins((const uint8_t[]){A0,A1,A2,A3,A4,A5,A6,A7}, SensorCount);\n  calibrate(); // sweep over the line\n  delay(500);\n}\n\nvoid loop() {\n  followLine();\n}" },
      { heading: "Calibration routine", body: "void calibrate() {\n  // Sweep robot over the line 200 times\n  // This sets the min/max for each sensor\n  for (int i = 0; i < 200; i++) {\n    qtr.calibrate();\n    // Optionally sweep motors:\n    if (i < 100) { setMotors(80, -80); } // turn right\n    else { setMotors(-80, 80); }         // turn left\n  }\n  setMotors(0, 0); // stop\n}\n\n// IMPORTANT: Calibration maps each sensor's raw range\n// (e.g., 200–900) to 0–1000.\n// Without calibration, sensors on the same array\n// give wildly different values for the same surface." },
      { heading: "The PID follow loop", body: "void followLine() {\n  // Returns 0–7000 (center = 3500)\n  int position = qtr.readLineBlack(sensorValues);\n  int error = 3500 - position;\n\n  float P = Kp * error;\n  float D = Kd * (error - lastError);\n  int correction = (int)(P + D);\n  lastError = error;\n\n  int leftSpeed  = baseSpeed + correction;\n  int rightSpeed = baseSpeed - correction;\n\n  leftSpeed  = constrain(leftSpeed,  -255, 255);\n  rightSpeed = constrain(rightSpeed, -255, 255);\n\n  setMotors(leftSpeed, rightSpeed);\n}" },
      { heading: "setMotors() function", body: "// IN1=2, IN2=3, ENA=9 (left)\n// IN3=4, IN4=5, ENB=10 (right)\n\nvoid setMotors(int left, int right) {\n  // Left motor\n  if (left >= 0) {\n    digitalWrite(2, HIGH);\n    digitalWrite(3, LOW);\n  } else {\n    digitalWrite(2, LOW);\n    digitalWrite(3, HIGH);\n    left = -left;\n  }\n  analogWrite(9, left);\n\n  // Right motor\n  if (right >= 0) {\n    digitalWrite(4, HIGH);\n    digitalWrite(5, LOW);\n  } else {\n    digitalWrite(4, LOW);\n    digitalWrite(5, HIGH);\n    right = -right;\n  }\n  analogWrite(10, right);\n}" },
      { heading: "Tuning sequence for competition", body: "1. Start: Kp=0.05, Kd=0, baseSpeed=100\n2. Run robot on a straight line — it should follow but maybe oscillate\n3. Increase Kp until oscillation starts, then back off 30%\n4. Add Kd=0.2, increase until oscillation is gone\n5. Increase baseSpeed by 10 — retune Kp/Kd if needed\n6. Repeat until robot is at max stable speed\n\nFor sharp 90° corners:\n→ Reduce baseSpeed or add speed zones\n→ Increase Kd so robot reacts faster to sharp error changes\n\nDocument every working Kp/Kd/speed combination — you'll need them on competition day." },
    ]
  },
  "Pololu QTR-8 reflectance sensor array — library setup, calibration routine, reading weighted line position, mapping output to PID error value": {
    title: "QTR-8 Sensor Array — Full Setup Guide",
    slides: [
      { heading: "What is the QTR-8?", body: "The Pololu QTR-8A (analog) is the most common sensor array for line following competitions. It has 8 IR sensors in a row, spaced 9.525mm apart, covering a total width of about 67mm.\n\nEach sensor outputs an analog voltage:\n- Low voltage (~0.5V) = black line detected\n- High voltage (~3.5V) = white surface\n\nThe array gives you 8 data points about where the line is relative to the center — perfect for a weighted position calculation that feeds directly into PID." },
      { heading: "Hardware setup", body: "QTR-8A has these connections:\n- VCC → 5V\n- GND → GND  \n- OUT1–OUT8 → A0–A7 (analog pins)\n- CTRL → digital pin (turn sensors on/off to save power)\n\nPhysical mounting:\n- Mount 3–8mm above the ground\n- Centered under the robot\n- Parallel to the ground (level, not angled)\n- Perpendicular to direction of travel\n\nLower = better contrast but risk of hitting bumps\nHigher = less contrast but more forgiving" },
      { heading: "Installing and using the library", body: "Install via Arduino Library Manager:\nSearch: 'QTRSensors' by Pololu → Install\n\nSetup code:\n#include <QTRSensors.h>\nQTRSensors qtr;\nconst uint8_t SensorCount = 8;\nuint16_t sensorValues[SensorCount];\n\nvoid setup() {\n  qtr.setTypeAnalog();\n  qtr.setSensorPins(\n    (const uint8_t[]){A0,A1,A2,A3,A4,A5,A6,A7},\n    SensorCount\n  );\n  qtr.setEmitterPin(2); // CTRL pin\n}" },
      { heading: "Calibration — critical step", body: "Calibration must be done at the START of every run, on the actual track surface.\n\nvoid calibrate() {\n  for (uint16_t i = 0; i < 400; i++) {\n    qtr.calibrate();\n  }\n}\n\nDuring calibration: physically sweep the robot left and right so every sensor sees both black and white.\n\nAfter calibration, the library maps each sensor's actual min/max to 0–1000. Without calibration, ambient lighting differences between sensors cause incorrect position readings and your PID will never tune properly." },
      { heading: "Reading line position for PID", body: "// After calibration, read the line position:\nuint16_t position = qtr.readLineBlack(sensorValues);\n// Returns 0 to (SensorCount-1)×1000\n// 0 = leftmost sensor sees line\n// 7000 = rightmost sensor sees line\n// 3500 = center (this is your setpoint)\n\nint error = 3500 - position;\n// error = 0 → perfectly centered\n// error > 0 → robot is right of line → steer left\n// error < 0 → robot is left of line → steer right\n\n// Feed this error directly into your PID calculation" },
    ]
  },
  "line follower competition strategy — Kp and Kd tuning for speed, chassis weight reduction, sensor placement for high speed, cornering strategy, acceleration zones": {
    title: "Competition Strategy — Win the Race",
    slides: [
      { heading: "What separates fast robots from slow ones", body: "Every team at a line follower competition has a robot that follows the line. What separates 1st place from 5th place:\n\n1. Speed — can you go faster without losing the line?\n2. Cornering — can you hold the line at speed through turns?\n3. Reliability — does it complete the course 100% of the time?\n4. Tuning — are your Kp/Kd optimized for your track?\n\nPriority: Reliability > Cornering > Speed. A fast robot that leaves the line loses. A slow, reliable robot finishes." },
      { heading: "High-speed PID tuning", body: "At higher speeds, the robot travels further per loop iteration — errors grow faster and need faster correction.\n\nWhen you increase baseSpeed:\n→ Increase Kp proportionally (robot needs to respond harder)\n→ Increase Kd (need more damping for faster oscillations)\n→ The ratio Kd/Kp usually stays similar as you scale up\n\nTuning sequence for speed:\n1. Tune at baseSpeed=120, get stable\n2. Increase to 160, retune Kp/Kd\n3. Increase to 200, retune\n4. Find the maximum stable speed for each section\n5. Never try to tune at max speed first" },
      { heading: "Cornering strategy", body: "Sharp 90° corners are where robots leave the line. Strategies:\n\nSIMPLE: Reduce baseSpeed globally to handle the worst corner\n→ Easy to implement, safe, but sacrifices straight-line speed\n\nZONE SPEED CONTROL: Detect when you're in a curve and slow down\n→ if (abs(error) > threshold) { reduceSpeed(); }\n→ High error = sharp turn = slow down automatically\n→ Low error = straight section = full speed\n\nFor competition: start with simple speed reduction. Add zone control once you're confident your PID is stable." },
      { heading: "Chassis optimization for speed", body: "Every gram you remove = faster acceleration and cornering.\n\nWeight reduction:\n- Use 3mm aluminum or 2mm carbon fiber instead of acrylic\n- Remove unnecessary standoffs and extra PCBs\n- Use a smaller battery (smaller mAh = lighter)\n\nCenter of gravity:\n- Keep battery low and centered\n- Heavy components between the wheels\n- Minimize overhang past the wheels\n\nSensor height:\n- Lower = faster response (less distance for light to travel)\n- Optimal: 3–5mm above ground at competition speed\n- Test at speed — vibration can affect readings" },
      { heading: "Competition day checklist", body: "BEFORE every run:\n✓ Charge battery to 100% (4.20V per cell)\n✓ Calibrate sensors on the actual competition track surface\n✓ Test one slow lap first\n✓ Check all connections — vibration loosens things\n✓ Note the Kp/Kd/speed that works for THIS track\n\nBRING WITH YOU:\n- Spare battery (fully charged)\n- Spare motor driver (they fail)\n- Laptop with code ready to upload\n- USB cable\n- Small screwdriver set\n- Extra motor if possible\n\nHave multiple saved configurations: safe/slow, normal, fast" },
    ]
  },
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function SlidePanel({ topic, onClose }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const content = slideContent[topic];
  if (!content) return null;
  const slide = content.slides[slideIndex];
  const total = content.slides.length;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(0,0,0,0.85)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "16px",
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#0D1625",
        border: "1px solid #1E3050",
        borderRadius: 12,
        width: "100%", maxWidth: 600,
        maxHeight: "90vh",
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        boxShadow: "0 24px 80px rgba(0,0,0,0.8)",
      }}>
        {/* Header */}
        <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid #1A2840", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <div>
            <div style={{ color: "#4A7AAA", fontSize: 10, letterSpacing: 2, fontFamily: "inherit" }}>STUDY GUIDE</div>
            <div style={{ color: "#E0EAF8", fontSize: 15, fontWeight: 700, marginTop: 2 }}>{content.title}</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "1px solid #1A2840", color: "#4A6080", borderRadius: 4, padding: "4px 10px", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>✕ close</button>
        </div>

        {/* Progress bar */}
        <div style={{ height: 2, background: "#1A2840", flexShrink: 0 }}>
          <div style={{ height: "100%", background: "#3B82F6", width: `${((slideIndex + 1) / total) * 100}%`, transition: "width 0.3s ease" }} />
        </div>

        {/* Slide content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          <div style={{ color: "#4A7AAA", fontSize: 10, letterSpacing: 2, marginBottom: 8 }}>SLIDE {slideIndex + 1} OF {total}</div>
          <h3 style={{ color: "#F0F6FF", fontSize: 17, fontWeight: 700, margin: "0 0 14px", lineHeight: 1.3 }}>{slide.heading}</h3>
          <pre style={{
            color: "#8AADCC",
            fontSize: 12.5,
            lineHeight: 1.85,
            margin: 0,
            fontFamily: "'DM Mono', 'Fira Mono', monospace",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}>{slide.body}</pre>
        </div>

        {/* Navigation */}
        <div style={{ padding: "14px 20px", borderTop: "1px solid #1A2840", display: "flex", gap: 10, flexShrink: 0 }}>
          <button onClick={() => setSlideIndex(i => Math.max(0, i - 1))} disabled={slideIndex === 0} style={{
            flex: 1, padding: "10px", border: "1px solid #1A2840",
            background: slideIndex === 0 ? "#090E18" : "#0D1625",
            color: slideIndex === 0 ? "#1E2C44" : "#4A7AAA",
            borderRadius: 5, cursor: slideIndex === 0 ? "not-allowed" : "pointer",
            fontSize: 12, fontFamily: "inherit", fontWeight: 600,
          }}>← PREV</button>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {content.slides.map((_, i) => (
              <button key={i} onClick={() => setSlideIndex(i)} style={{
                width: 8, height: 8, borderRadius: "50%",
                background: i === slideIndex ? "#3B82F6" : "#1A2840",
                border: "none", cursor: "pointer", padding: 0,
              }} />
            ))}
          </div>
          <button onClick={() => setSlideIndex(i => Math.min(total - 1, i + 1))} disabled={slideIndex === total - 1} style={{
            flex: 1, padding: "10px", border: "1px solid #1A2840",
            background: slideIndex === total - 1 ? "#090E18" : "#0D1625",
            color: slideIndex === total - 1 ? "#1E2C44" : "#3B82F6",
            borderRadius: 5, cursor: slideIndex === total - 1 ? "not-allowed" : "pointer",
            fontSize: 12, fontFamily: "inherit", fontWeight: 700,
          }}>NEXT →</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeModule, setActiveModule] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const [hovered, setHovered] = useState(null);

  const active = activeModule !== null ? modules[activeModule] : null;

  return (
    <div style={{ minHeight: "100vh", background: "#080C14", fontFamily: "'DM Mono','Fira Mono',monospace", color: "#C8D4E8" }}>

      {activeTopic && <SlidePanel topic={activeTopic} onClose={() => setActiveTopic(null)} />}

      {/* Top bar */}
      <div style={{ borderBottom: "1px solid #0F1A2E", padding: "18px 24px 14px", background: "#080C14", position: "sticky", top: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {active && (
            <button onClick={() => setActiveModule(null)} style={{ background: "none", border: "1px solid #1A2840", color: "#4A6080", borderRadius: 4, padding: "4px 10px", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>← BACK</button>
          )}
          <span style={{ color: "#F59E0B", fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>NLFRC 2026</span>
          {active && <span style={{ color: "#1A2840" }}>/ {active.title}</span>}
        </div>
        <span style={{ color: "#1A2840", fontSize: 10, letterSpacing: 1 }}>6 MODULES · 19 SESSIONS</span>
      </div>

      {/* Module grid */}
      {!active && (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 20px" }}>
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: "clamp(20px, 4vw, 34px)", fontWeight: 700, color: "#E8F0FF", margin: "0 0 8px", letterSpacing: -1 }}>
              Start from zero.<br />Build a competition robot.
            </h1>
            <p style={{ color: "#2A3A58", fontSize: 12, margin: 0 }}>Each module = videos + step-by-step slides. Zero knowledge needed.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
            {modules.map((mod, i) => (
              <button key={mod.id} onClick={() => setActiveModule(i)}
                onMouseEnter={e => { e.currentTarget.style.border = `1px solid ${mod.color}44`; e.currentTarget.style.background = "#0F1628"; }}
                onMouseLeave={e => { e.currentTarget.style.border = "1px solid #111D30"; e.currentTarget.style.background = "#0C1220"; }}
                style={{ background: "#0C1220", border: "1px solid #111D30", borderRadius: 8, padding: "20px 18px", cursor: "pointer", textAlign: "left", fontFamily: "inherit", position: "relative", overflow: "hidden", transition: "all 0.15s" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: mod.color, opacity: 0.8 }} />
                <div style={{ fontSize: 26, marginBottom: 10 }}>{mod.emoji}</div>
                <div style={{ color: "#1E2C44", fontSize: 9, letterSpacing: 2, marginBottom: 4 }}>MODULE {mod.id}</div>
                <div style={{ color: "#C8D8F0", fontSize: 14, fontWeight: 700, marginBottom: 5, lineHeight: 1.3 }}>{mod.title}</div>
                <div style={{ color: "#253550", fontSize: 11, marginBottom: 12, lineHeight: 1.5 }}>{mod.tagline}</div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
                  {mod.sessions.map(s => (
                    <span key={s} style={{ background: "#0A1020", border: "1px solid #1A2840", borderRadius: 3, padding: "2px 6px", fontSize: 9, color: "#1E3050" }}>{s}</span>
                  ))}
                </div>
                <div style={{ color: mod.color, fontSize: 11, fontWeight: 600 }}>{mod.steps.length} videos · {mod.steps.length} guides →</div>
              </button>
            ))}
          </div>

          <div style={{ marginTop: 24, padding: "12px 16px", border: "1px solid #0F1A2E", borderRadius: 6, background: "#0A1018" }}>
            <span style={{ color: "#2A4060", fontSize: 11 }}>
              💡 Complete modules in order. Each one builds on the last. Click the <span style={{ color: "#3B82F6" }}>📖 Study Guide</span> button inside each step to read the explanation before watching the video.
            </span>
          </div>
        </div>
      )}

      {/* Module detail */}
      {active && (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "28px 20px 60px" }}>
          <div style={{ marginBottom: 26, paddingBottom: 18, borderBottom: `1px solid ${active.color}20` }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{active.emoji}</div>
            <div style={{ color: "#1A2840", fontSize: 9, letterSpacing: 2, marginBottom: 3 }}>MODULE {active.id} OF 6</div>
            <h2 style={{ color: "#E0EAF8", fontSize: 24, fontWeight: 700, margin: "0 0 5px", letterSpacing: -0.5 }}>{active.title}</h2>
            <p style={{ color: "#253550", fontSize: 12, margin: "0 0 10px" }}>{active.tagline}</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {active.sessions.map(s => (
                <span key={s} style={{ background: active.color + "12", border: `1px solid ${active.color}28`, borderRadius: 3, padding: "2px 8px", fontSize: 9, color: active.color }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Vertical line + steps */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 17, top: 36, bottom: 36, width: 1, background: "#0F1A2E" }} />

            {active.steps.map((step, i) => {
              const isOn = hovered === i;
              return (
                <div key={i} style={{ display: "flex", gap: 18, marginBottom: 14 }}>
                  {/* Bubble */}
                  <div style={{ flexShrink: 0, width: 34, height: 34, borderRadius: "50%", background: step.warning ? "#2A1500" : "#0C1220", border: `2px solid ${step.warning ? "#F59E0B" : active.color}`, display: "flex", alignItems: "center", justifyContent: "center", color: step.warning ? "#F59E0B" : active.color, fontSize: 12, fontWeight: 700, zIndex: 1, position: "relative" }}>
                    {step.step}
                  </div>

                  {/* Card */}
                  <div style={{ flex: 1 }}
                    onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                    <div style={{ background: step.warning ? "#120D00" : "#0C1220", border: `1px solid ${step.warning ? "#F59E0B33" : isOn ? active.color + "55" : "#111D30"}`, borderRadius: 7, overflow: "hidden", transition: "border 0.12s" }}>

                      {/* Card body */}
                      <div style={{ padding: "14px 16px" }}>
                        <div style={{ color: step.warning ? "#F59E0B" : "#253550", fontSize: 9, letterSpacing: 1.5, marginBottom: 4, fontWeight: 700 }}>
                          STEP {step.step}{step.warning ? " — MANDATORY" : ""}
                        </div>
                        <div style={{ color: step.warning ? "#FCD34D" : "#C8D8F0", fontSize: 14, fontWeight: 700, marginBottom: 5, lineHeight: 1.3 }}>{step.label}</div>
                        <div style={{ color: "#2A4060", fontSize: 11, lineHeight: 1.7, marginBottom: 12 }}>{step.why}</div>

                        {/* Two buttons */}
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {/* Watch button */}
                          <a href={step.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#090E18", border: `1px solid ${step.warning ? "#F59E0B33" : active.color + "33"}`, borderRadius: 5, padding: "8px 14px", cursor: "pointer" }}>
                              <span style={{ color: step.warning ? "#F59E0B" : active.color, fontSize: 12, fontWeight: 700 }}>▶ Watch</span>
                              <span style={{ color: "#1E3050", fontSize: 10 }}>·</span>
                              <span style={{ color: "#1E3050", fontSize: 11 }}>{step.channel}</span>
                              <span style={{ color: "#1E3050", fontSize: 10 }}>·</span>
                              <span style={{ color: "#253550", fontSize: 11 }}>{step.duration}</span>
                              {step.direct && <span style={{ background: "#0A150A", border: "1px solid #10B98133", borderRadius: 2, padding: "1px 5px", fontSize: 8, color: "#10B981", letterSpacing: 1 }}>✓ DIRECT</span>}
                            </div>
                          </a>

                          {/* Study guide button */}
                          {slideContent[step.topic] && (
                            <button onClick={() => setActiveTopic(step.topic)} style={{
                              display: "flex", alignItems: "center", gap: 6,
                              background: "#090E18", border: "1px solid #1A3060",
                              borderRadius: 5, padding: "8px 14px", cursor: "pointer",
                              fontFamily: "inherit",
                            }}>
                              <span style={{ color: "#3B82F6", fontSize: 12 }}>📖</span>
                              <span style={{ color: "#3B82F6", fontSize: 11, fontWeight: 700 }}>Study Guide</span>
                              <span style={{ color: "#1E3050", fontSize: 10 }}>5 slides</span>
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

          {/* Next module */}
          {activeModule < modules.length - 1 && (
            <button onClick={() => { setActiveModule(activeModule + 1); window.scrollTo(0, 0); }}
              onMouseEnter={e => e.currentTarget.style.background = "#0F1628"}
              onMouseLeave={e => e.currentTarget.style.background = "#0C1220"}
              style={{ marginTop: 24, width: "100%", background: "#0C1220", border: `1px solid ${modules[activeModule + 1].color}28`, borderRadius: 7, padding: "14px 18px", cursor: "pointer", textAlign: "left", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "background 0.12s" }}>
              <div>
                <div style={{ color: "#1A2840", fontSize: 9, letterSpacing: 1.5, marginBottom: 3 }}>UP NEXT</div>
                <div style={{ color: modules[activeModule + 1].color, fontSize: 14, fontWeight: 700 }}>
                  {modules[activeModule + 1].emoji} {modules[activeModule + 1].title}
                </div>
              </div>
              <span style={{ color: "#1A2840", fontSize: 18 }}>→</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
