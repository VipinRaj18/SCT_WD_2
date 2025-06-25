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
