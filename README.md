<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>StopWatch</title>
  <style>
    :root {
      --bg-base: #000000;
      --panel-bg: #111111;
      --accent-color: #4096ff;
      --text-primary: #e1e8f0;
      --text-secondary: #6b8db5;
      --shadow-color: rgba(0, 0, 0, 0.8);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg-base);
      color: var(--text-primary);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }

    .app-header {
      background: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(64, 150, 255, 0.2);
      padding: 20px 0;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      align-items: center;
    }

    .app-logo {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .logo-icon {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, var(--accent-color), #1e90ff);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      box-shadow: 0 4px 15px rgba(64, 150, 255, 0.4);
    }

    .app-title {
      font-size: 24px;
      font-weight: 700;
      color: var(--accent-color);
    }

    .quote {
      font-size: 2rem;
      color: var(--accent-color);
      font-weight: 600;
      margin-bottom: 20px;
      text-transform: uppercase;
      letter-spacing: 2px;
      text-align: center;
    }

    .main-container {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 40px 20px;
      background:
        radial-gradient(circle at 30% 40%, rgba(64, 150, 255, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(30, 144, 255, 0.06) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(70, 130, 180, 0.05) 0%, transparent 50%);
    }

    .stopwatch-app {
      background: var(--panel-bg);
      backdrop-filter: blur(30px);
      border: 1px solid rgba(64, 150, 255, 0.2);
      border-radius: 24px;
      padding: 50px;
      max-width: 500px;
      width: 100%;
      box-shadow: 0 20px 60px var(--shadow-color), 0 0 40px rgba(64, 150, 255, 0.1);
      text-align: center;
    }

    .time-container {
      margin: 40px 0 60px;
      position: relative;
    }

    .main-time {
      font-family: 'SF Mono', monospace;
      font-size: 4.5rem;
      font-weight: 300;
      color: var(--text-primary);
      text-shadow: 0 0 30px rgba(64, 150, 255, 0.4);
      margin-bottom: 15px;
      line-height: 1;
    }

    .milliseconds {
      font-size: 2.5rem;
      color: var(--accent-color);
      opacity: 0.9;
    }

    .time-label {
      font-size: 14px;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-top: 10px;
    }

    .status-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-bottom: 40px;
      padding: 15px;
      background: var(--panel-bg);
      border-radius: 12px;
      border: 1px solid rgba(64, 150, 255, 0.2);
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      transition: all 0.3s ease;
    }

    .status-dot.stopped { background: #ff6b6b; }
    .status-dot.running {
      background: #4ecdc4;
      animation: pulse-blue 1.5s infinite;
      box-shadow: 0 0 15px rgba(78, 205, 196, 0.6);
    }
    .status-dot.paused { background: #ffa726; }

    .status-text {
      font-size: 14px;
      font-weight: 500;
      color: var(--text-secondary);
    }

    @keyframes pulse-blue {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(1.2); }
    }

    .controls {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 40px;
    }

    .control-btn {
      padding: 18px 24px;
      border: none;
      border-radius: 16px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
      text-transform: capitalize;
    }

    .control-btn::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
    }

    .control-btn:active::before {
      width: 300px;
      height: 300px;
    }

    .btn-start {
      background: linear-gradient(135deg, #4ecdc4, #44a08d);
      color: white;
      grid-column: 1 / -1;
    }

    .btn-start:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(78, 205, 196, 0.4);
    }

    .btn-start:disabled {
      background: #1a1a1a;
      color: var(--text-secondary);
      cursor: not-allowed;
    }

    .btn-pause {
      background: linear-gradient(135deg, var(--accent-color), #1e90ff);
      color: white;
    }

    .btn-pause:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(64, 150, 255, 0.4);
    }

    .btn-reset {
      background: linear-gradient(135deg, #ff6b6b, #ee5a52);
      color: white;
    }

    .btn-reset:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
    }

    .btn-lap {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      grid-column: 1 / -1;
    }

    .btn-lap:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }

    .control-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      box-shadow: none;
    }

    .lap-section {
      margin-top: 40px;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
    }

    .lap-section.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .lap-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid rgba(64, 150, 255, 0.2);
    }

    .lap-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--accent-color);
    }

    .lap-count {
      font-size: 14px;
      color: var(--text-secondary);
      background: rgba(64, 150, 255, 0.1);
      padding: 6px 12px;
      border-radius: 8px;
    }

    .lap-list {
      max-height: 300px;
      overflow-y: auto;
      padding-right: 10px;
    }

    .lap-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      margin-bottom: 12px;
      background: rgba(64, 150, 255, 0.05);
      border: 1px solid rgba(64, 150, 255, 0.15);
      border-radius: 12px;
      transition: all 0.3s ease;
      animation: slideIn 0.3s ease;
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }

    .lap-item:hover {
      background: rgba(64, 150, 255, 0.12);
      border-color: rgba(64, 150, 255, 0.3);
      transform: translateX(5px);
    }

    .lap-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .lap-number {
      font-size: 14px;
      font-weight: 600;
      color: var(--accent-color);
      margin-bottom: 4px;
    }

    .lap-split {
      font-size: 12px;
      color: var(--text-secondary);
    }

    .lap-time {
      font-family: 'SF Mono', monospace;
      font-size: 16px;
      font-weight: 500;
      color: var(--text-primary);
    }

    .lap-list::-webkit-scrollbar {
      width: 6px;
    }

    .lap-list::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, var(--accent-color), #1e90ff);
      border-radius: 3px;
    }

    @media (max-width: 768px) {
      .stopwatch-app {
        padding: 30px 25px;
        margin: 20px;
      }
      .main-time { font-size: 3.5rem; }
      .milliseconds { font-size: 2rem; }
      .controls { gap: 12px; }
      .control-btn { padding: 16px 20px; font-size: 15px; }
    }

    @media (max-width: 480px) {
      .main-time { font-size: 2.8rem; }
      .milliseconds { font-size: 1.6rem; }
      .stopwatch-app { padding: 25px 20px; }
    }
  </style>
</head>
<body>
  <header class="app-header">
    <div class="header-content">
      <div class="app-logo">
        <div class="logo-icon">⏱</div>
        <div><h1 class="app-title">STOPWATCH!⏱</h1></div>
      </div>
    </div>
  </header>

  <main class="main-container">
    <div class="stopwatch-app">
      <div class="quote">Timer</div>
      <div class="time-container">
        <div class="main-time" id="timeDisplay">00:00.<span class="milliseconds">000</span></div>
        <div class="time-label">Minutes : Seconds . Milliseconds</div>
      </div>

      <div class="status-bar">
        <div class="status-dot stopped" id="statusDot"></div>
        <div class="status-text" id="statusText">Ready to Start</div>
      </div>

      <div class="controls">
        <button class="control-btn btn-start" id="startBtn">Start</button>
        <button class="control-btn btn-pause" id="pauseBtn" disabled>Pause</button>
        <button class="control-btn btn-reset" id="resetBtn">Reset</button>
        <button class="control-btn btn-lap" id="lapBtn" disabled>Lap</button>
      </div>

      <div class="lap-section" id="lapSection">
        <div class="lap-header">
          <div class="lap-title">Lap Times</div>
          <div class="lap-count" id="lapCount">0 laps</div>
        </div>
        <div class="lap-list" id="lapList"></div>
      </div>
    </div>
  </main>

  <script>
    class ProfessionalStopwatch {
      constructor() {
        this.startTime = 0;
        this.elapsedTime = 0;
        this.timerInterval = null;
        this.lapTimes = [];
        this.lapNumber = 0;

        this.timeDisplay = document.getElementById('timeDisplay');
        this.statusDot = document.getElementById('statusDot');
        this.statusText = document.getElementById('statusText');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.lapBtn = document.getElementById('lapBtn');
        this.lapSection = document.getElementById('lapSection');
        this.lapList = document.getElementById('lapList');
        this.lapCount = document.getElementById('lapCount');

        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.lapBtn.addEventListener('click', () => this.recordLap());

        this.updateDisplay();
        this.updateStatus('stopped', 'Ready to Start');
      }

      start() {
        if (this.timerInterval) return; 

        this.startTime = Date.now() - this.elapsedTime;
        this.timerInterval = setInterval(() => this.updateDisplay(), 10);

        this.startBtn.textContent = 'Running...';
        this.startBtn.disabled = true;
        this.pauseBtn.disabled = false;
        this.lapBtn.disabled = false;

        this.updateStatus('running', 'Timer Running');
      }

      pause() {
        if (!this.timerInterval) return;

        clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.elapsedTime = Date.now() - this.startTime;

        this.startBtn.textContent = 'Resume';
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.lapBtn.disabled = true;

        this.updateStatus('paused', 'Timer Paused');
      }

      reset() {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.elapsedTime = 0;
        this.lapTimes = [];
        this.lapNumber = 0;

        this.startBtn.textContent = 'Start';
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.lapBtn.disabled = true;

        this.updateDisplay();
        this.updateStatus('stopped', 'Ready to Start');
        this.updateLapDisplay();
      }

      recordLap() {
        if (!this.timerInterval) return;

        const now = Date.now() - this.startTime;
        const lastTotal = this.lapTimes.length
          ? this.lapTimes[this.lapTimes.length - 1].totalTime
          : 0;

        this.lapTimes.push({
          number: ++this.lapNumber,
          totalTime: now,
          lapTime: now - lastTotal
        });

        this.updateLapDisplay();
      }

      updateDisplay() {
        const time = this.timerInterval
          ? Date.now() - this.startTime
          : this.elapsedTime;

        const m = String(Math.floor(time / 60000)).padStart(2, '0');
        const s = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
        const ms = String(time % 1000).padStart(3, '0');

        this.timeDisplay.innerHTML = `${m}:${s}.<span class="milliseconds">${ms}</span>`;
      }

      updateStatus(status, text) {
        this.statusDot.className = `status-dot ${status}`;
        this.statusText.textContent = text;
      }

      updateLapDisplay() {
        if (!this.lapTimes.length) {
          this.lapSection.classList.remove('visible');
          return;
        }

        this.lapSection.classList.add('visible');
        this.lapCount.textContent = `${this.lapTimes.length} lap${this.lapTimes.length > 1 ? 's' : ''}`;
        this.lapList.innerHTML = '';

        [...this.lapTimes].reverse().forEach(l => {
          const m = String(Math.floor(l.totalTime / 60000)).padStart(2, '0');
          const s = String(Math.floor((l.totalTime % 60000) / 1000)).padStart(2, '0');
          const ms = String(l.totalTime % 1000).padStart(3, '0');

          const lm = String(Math.floor(l.lapTime / 60000)).padStart(2, '0');
          const ls = String(Math.floor((l.lapTime % 60000) / 1000)).padStart(2, '0');
          const lms = String(l.lapTime % 1000).padStart(3, '0');

          const el = document.createElement('div');
          el.className = 'lap-item';
          el.innerHTML = `
            <div class="lap-info">
              <div class="lap-number">Lap ${l.number}</div>
              <div class="lap-split">Split: ${lm}:${ls}.${lms}</div>
            </div>
            <div class="lap-time">${m}:${s}.${ms}</div>`;
          this.lapList.appendChild(el);
        });
      }
    }

    document.addEventListener('DOMContentLoaded', () => new ProfessionalStopwatch());
  </script>
</body>
</html>
