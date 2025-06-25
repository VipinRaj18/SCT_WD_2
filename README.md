<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>StopWatch</title>
  <link rel="stylesheet" href="stopwatch.css"/>
</head>
<body>
  <header class="app-header">
    <div class="header-content">
      <div class="app-logo">
        <div class="logo-icon">⏱</div>
        <div><h1 class="app-title">STOPWATCH!⏱️</h1></div>
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

  <script src="stopwatch.js"></script>
</body>
</html>
