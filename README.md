# 🛡️ Jay Ram Thakur - Cybersecurity & SOC Analyst Portfolio

<div align="center">

[![Live Portfolio](https://img.shields.io/badge/Live_Site-hyperjay--456.github.io-00ff9d?style=for-the-badge&logo=firefox-browser&logoColor=0b0f19)](https://hyperjay-456.github.io/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Deployed-00e5ff?style=for-the-badge&logo=github&logoColor=white)](https://hyperjay-456.github.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<br/>

**A high-tech, responsive SOC Head-Up Display (HUD) and Defensive Cybersecurity Portfolio.**  
*Engineered with vanilla web technologies, an interactive CLI terminal emulator, live cryptography utilities, and a dynamic cyber mesh canvas.*

[🌐 View Live Site](https://hyperjay-456.github.io/) • [💻 Source Code](https://github.com/HyperJay-456/HyperJay-456.github.io) • [📩 Contact Jay](mailto:jayt0667@gmail.com)

</div>

---

## 🌟 Core Highlights & Architecture

### 1. 🖥️ Interactive Cyber CLI Terminal
Accessible anywhere via the **CLI Terminal** button in the navigation bar. Recruiter and engineer-friendly interactive Unix-like command shell:
- `whoami` : Displays candidate profile, engineering background, and current availability.
- `skills` : Outputs technical competencies across SOC operations, defensive security, networking, and engineering.
- `tools` : Lists defensive and offensive security tool arsenal (Wireshark, Splunk, Elastic, Nmap, Burp Suite, CyberChef).
- `certs` : Details completed TryHackMe paths (*Pre Security*, *Cyber Security 101*, *Hacker Holidays*) and active tracks (*SOC L1*, *Jr Pentester*).
- `projects` : Details featured security applications and full-stack systems.
- `edu` : Academic credentials at DBATU (B.Tech Computer Engineering).
- `contact` : Immediate contact channels (Email, LinkedIn, GitHub, TryHackMe).
- `banner`, `clear`, `exit` : Terminal control commands with command history navigation (`↑` / `↓`).

### 2. 🔐 Live Password Security & Entropy Analyzer
An in-browser cryptographic evaluation tool implementing mathematical standards:
- **Shannon Entropy Calculation**: $E = L \times \log_2(N)$ evaluating password information density in bits.
- **Brute-Force Resistance Computation**: Real-time offline crack-time estimates across character pool sizes.
- **OWASP Criteria Auditing**: Verification of lowercase, uppercase, numbers, symbols, and length parameters.
- **CSPRNG Generator**: Cryptographically secure pseudo-random password generation using the browser's native Web Crypto API (`window.crypto.getRandomValues`).

### 3. 🕸️ Dynamic Cyber Mesh Canvas Background
- Custom HTML5 Canvas particle network system ([`js/particles.js`](js/particles.js)).
- Interactive mouse proximity nodes and reactive velocity physics.
- High-performance, GPU-friendly rendering loop designed for 60 FPS without framework bloat.

### 4. 🎨 Precision Cyber SOC Design System
- Custom CSS tokens, glassmorphic HUD panels, glowing accent borders (`#00ff9d`, `#00e5ff`, `#ff3366`), and responsive flexbox/grid layouts.
- Typography powered by Google Fonts: **Space Grotesk** (display), **JetBrains Mono** (code/telemetry), and **Inter** (body readability).

---

## 📁 Repository Structure

```
.
├── index.html              # Main semantic HTML5 portfolio document & HUD layout
├── css/
│   └── style.css           # Complete vanilla CSS design system & responsive styling
├── js/
│   ├── main.js             # Navigation, scroll triggers, copy telemetry & animations
│   ├── particles.js        # Dynamic cyber mesh interactive canvas engine
│   ├── password-tool.js    # Shannon entropy calculator & CSPRNG generator
│   └── terminal.js         # Interactive CLI terminal emulator and command system
├── .gitignore              # Git ignore rules for clean repository hygiene
└── README.md               # Repository documentation and overview
```

---

## 🚀 Running Locally

Because this project is built using pure vanilla web standards, it requires no package installations or build compilation.

### Option 1: Direct File
Simply double-click [`index.html`](index.html) or open it with any modern web browser.

### Option 2: Local HTTP Server
Using Python (recommended for testing Web Crypto & ES standards):
```bash
# Python 3
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser.

Using Node.js:
```bash
npx serve .
```

---

## 👤 Author & Connect

**Jay Ram Thakur**  
*Third-Year Computer Engineering Undergraduate @ DBATU*  
*Cybersecurity & SOC Operations Enthusiast*

- 🌐 **Portfolio**: [hyperjay-456.github.io](https://hyperjay-456.github.io/)
- 🐙 **GitHub**: [@HyperJay-456](https://github.com/HyperJay-456)
- 💼 **LinkedIn**: [Jay Ram Thakur](https://linkedin.com/in/jay-thakur-6589a0333)
- 🔥 **TryHackMe**: [jayt0667](https://tryhackme.com/p/jayt0667)
- 📧 **Email**: [jayt0667@gmail.com](mailto:jayt0667@gmail.com)

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
