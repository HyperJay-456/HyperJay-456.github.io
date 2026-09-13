/* ===================================================================
   CYBER CLI TERMINAL EMULATOR
   Interactive developer & recruiter command line interface
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const terminalModal = document.getElementById('terminal-modal');
  const openTerminalBtns = document.querySelectorAll('.open-terminal-btn');
  const closeTerminalBtn = document.getElementById('close-terminal-btn');
  const terminalScreen = document.getElementById('terminal-screen');
  const terminalInput = document.getElementById('terminal-cli-input');

  if (!terminalModal || !terminalInput) return;

  const BANNER = `
   ██╗ █████╗ ██╗   ██╗    ████████╗██╗  ██╗ █████╗ ██╗  ██╗██╗   ██╗██████╗ 
   ██║██╔══██╗╚██╗ ██╔╝    ╚══██╔══╝██║  ██║██╔══██╗██║ ██╔╝██║   ██║██╔══██╗
   ██║███████║ ╚████╔╝        ██║   ███████║███████║█████╔╝ ██║   ██║██████╔╝
██ ██║██╔══██║  ╚██╔╝         ██║   ██╔══██║██╔══██║██╔═██╗ ██║   ██║██╔══██╗
╚████║██║  ██║   ██║          ██║   ██║  ██║██║  ██║██║  ██╗╚██████╔╝██║  ██║
 ╚═══╝╚═╝  ╚═╝   ╚═╝          ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝
  -- CYBER DEFENSE // SOC OPERATIONS TERMINAL v2.8 --
  Type 'help' to inspect available commands.
`;

  // Terminal History
  const history = [];
  let historyIndex = -1;

  function openTerminal() {
    terminalModal.classList.add('active');
    terminalInput.focus();
  }

  function closeTerminal() {
    terminalModal.classList.remove('active');
  }

  openTerminalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openTerminal();
    });
  });

  if (closeTerminalBtn) {
    closeTerminalBtn.addEventListener('click', closeTerminal);
  }

  // Close when clicking outside window
  terminalModal.addEventListener('click', (e) => {
    if (e.target === terminalModal) closeTerminal();
  });

  // Handle keyboard ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && terminalModal.classList.contains('active')) {
      closeTerminal();
    }
  });

  function printOutput(text, isCommand = false) {
    const outputDiv = document.createElement('div');
    outputDiv.className = 'terminal-output';
    if (isCommand) {
      outputDiv.innerHTML = `<span style="color:var(--accent-cyan); font-weight:bold;">guest@jaythakur:~$</span> <span style="color:#ffffff;">${text}</span>`;
    } else {
      outputDiv.innerHTML = text;
    }
    terminalScreen.appendChild(outputDiv);
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
  }

  // Commands database
  const COMMANDS = {
    help: () => `
Available Commands:
  <span style="color:var(--accent-green)">whoami</span>     : Display Jay's professional summary & role
  <span style="color:var(--accent-green)">skills</span>     : Cybersecurity & engineering skills matrix
  <span style="color:var(--accent-green)">tools</span>      : Defensive & offensive security tools arsenal
  <span style="color:var(--accent-green)">certs</span>      : TryHackMe paths, certificates & training
  <span style="color:var(--accent-green)">projects</span>   : Featured security & full-stack development projects
  <span style="color:var(--accent-green)">edu</span>        : B.Tech degree, university, CGPA & coursework
  <span style="color:var(--accent-green)">contact</span>    : Direct email, phone, LinkedIn & GitHub links
  <span style="color:var(--accent-green)">banner</span>     : Render ASCII system banner
  <span style="color:var(--accent-green)">clear</span>      : Wipe terminal screen
  <span style="color:var(--accent-green)">exit</span>       : Close this terminal interface
`,
    whoami: () => `
[IDENTITY RECORD]
Name        : Jay Ram Thakur
Role        : Third-Year Computer Engineering Student | Aspiring Cybersecurity Analyst
Specialty   : Defensive Security, SOC Operations, SIEM/SOAR, VAPT, Threat Hunting
Target Roles: Cybersecurity Intern, SOC Analyst L1, Security Operations, Cybersecurity Engineer
Location    : Panvel, Maharashtra, India
Status      : <span style="color:var(--accent-green)">Available for Internships & Full-time Opportunities</span>
`,
    skills: () => `
[TECHNICAL DOMAINS]
• Cybersecurity : SOC Operations, SIEM, SOAR, Elastic Stack, Splunk, Threat Hunting,
                  Incident Response, Vulnerability Assessment, VAPT, OWASP Top 10,
                  Active Directory, Windows Event Logs, Cryptography, Digital Forensics.
• Networking    : TCP/IP, OSI Model, DNS, DHCP, HTTP/HTTPS, FTP, SSH, Network Security.
• OS Environments: Linux (Ubuntu/Debian/Kali), Windows / Server.
• Development   : C, Python, Bash, HTML, CSS, JavaScript, React.js, Node.js, Express.js, MongoDB, Git.
`,
    tools: () => `
[SECURITY TOOLS ARSENAL]
• Network & Web : Nmap, Wireshark, Burp Suite, Gobuster, SQLMap, Tcpdump
• Exploitation  : Metasploit Framework, Hydra, John the Ripper
• Analysis & DF : CyberChef, Volatility, PEStudio, CFF Explorer, CAPA, Process Monitor, INetSim
• SIEM & Logs   : Splunk (Basic), Elastic Stack, Windows Event Viewer
`,
    certs: () => `
[CERTIFICATIONS & TRAINING - TRYHACKME]
✔ TryHackMe - Pre Security Learning Path (Completed)
✔ TryHackMe - Cyber Security 101 Learning Path (Completed)
✔ TryHackMe - Hacker Holidays Event Certificate
⏳ TryHackMe - SOC L1 Analyst Learning Path (In Progress)
⏳ TryHackMe - Jr Penetration Tester Learning Path (In Progress)
Profile: <a href="https://tryhackme.com/p/jayt0667" target="_blank" style="color:var(--accent-cyan)">tryhackme.com/p/jayt0667</a>
`,
    projects: () => `
[FEATURED PROJECTS]
1. Password Analyzer & Generator
   - Security utility calculating Shannon entropy & OWASP complexity rules.
2. Binary & Beyond — Digital Logic Engine
   - Interactive visual computing platform with step-by-step radix & arithmetic traces.
3. Expense Tracker (MERN Stack)
   - Secure RESTful APIs, CRUD operations, transaction schemas, MongoDB.
`,
    edu: () => `
[ACADEMIC CREDENTIALS]
• Degree       : B.Tech. in Computer Engineering (Expected 2028)
• University   : Dr. Babasaheb Ambedkar Technological University (DBATU)
• CGPA         : First Year: 8.05 | Third Semester: 7.75
• High School  : CKT Junior College (80.50%) | Vispute English School (74.40%)
• Coursework   : Computer Networks, OS, DBMS, DSA, OOP, Computer Organization
`,
    contact: () => `
[DIRECT COMMS]
• Email    : <a href="mailto:jayt0667@gmail.com" style="color:var(--accent-cyan)">jayt0667@gmail.com</a>
• Phone    : +91 8928453810
• LinkedIn : <a href="https://linkedin.com/in/jay-thakur-6589a0333" target="_blank" style="color:var(--accent-cyan)">linkedin.com/in/jay-thakur-6589a0333</a>
• GitHub   : <a href="https://github.com/HyperJay-456" target="_blank" style="color:var(--accent-cyan)">github.com/HyperJay-456</a>
• THM      : <a href="https://tryhackme.com/p/jayt0667" target="_blank" style="color:var(--accent-cyan)">tryhackme.com/p/jayt0667</a>
`,
    banner: () => `<pre style="color:var(--accent-green); font-size:0.75rem;">${BANNER}</pre>`,
    clear: () => {
      terminalScreen.innerHTML = '';
      return '';
    },
    exit: () => {
      closeTerminal();
      return 'Terminal session closed.';
    }
  };

  // Initial welcome message in terminal
  terminalScreen.innerHTML = `<pre style="color:var(--accent-green); font-size:0.75rem;">${BANNER}</pre>`;

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawInput = terminalInput.value.trim();
      terminalInput.value = '';

      if (!rawInput) return;

      history.push(rawInput);
      historyIndex = history.length;

      printOutput(rawInput, true);

      const cmd = rawInput.toLowerCase();
      if (COMMANDS[cmd]) {
        const res = COMMANDS[cmd]();
        if (res) printOutput(res);
      } else {
        printOutput(`<span style="color:#ff3366">zsh: command not found: ${rawInput}. Type 'help' for available commands.</span>`);
      }
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0 && historyIndex > 0) {
        historyIndex--;
        terminalInput.value = history[historyIndex];
      }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        terminalInput.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        terminalInput.value = '';
      }
      e.preventDefault();
    }
  });
});
