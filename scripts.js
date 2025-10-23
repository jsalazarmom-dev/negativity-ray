<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Negativity Ray Command Console</title>
<style>
  /* Background with brightened futuristic panel */
  body {
    margin: 40px 0;
    font-family: Arial, sans-serif;
    background-image: url('https://static.vecteezy.com/system/resources/previews/017/398/142/non_2x/dark-blue-control-panel-abstract-modern-technology-futuristic-interface-hud-design-hud-futuristic-frame-game-target-borders-sci-fi-empty-banners-for-text-menu-technology-interface-vector.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    color: white;
    -webkit-font-smoothing: antialiased;
    filter: brightness(1.3); /* brighten background */
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
  }

  /* Semi-transparent overlay for readability */
  body::before {
    content: "";
    position: fixed;
    top:0; left:0; right:0; bottom:0;
    background: rgba(0,0,0,0.3);
    z-index: -1;
  }

  /* Tightly wrapped blue control panel */
  .control-panel {
    background-color: rgba(0, 68, 204, 0.8);
    color: white;
    font-weight: bold;
    font-size: 2.5rem;
    padding: 0.5in 1in;
    border-radius: 12px;
    box-shadow: 0 0 15px rgba(0, 68, 204, 0.7);
    text-align: center;
    user-select: none;
    text-shadow: 0 0 10px #0033a0bb;
    white-space: nowrap;
    margin-bottom: 20px;
  }

  /* Red countdown timer */
  #countdown {
    font-family: monospace;
    font-weight: bold;
    font-size: 3rem;
    color: red;
    text-shadow: 0 0 10px #550000cc;
  }

  /* Abort button styles */
  #abortBtn {
    margin-top: 20px;
    background-color: #cc0000;
    border: none;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    padding: 15px 40px;
    border-radius: 8px;
    user-select: none;
    cursor: pointer;
    box-shadow: 0 0 8px #cc0000bb;
    transition: background-color 0.25s ease;
  }
  #abortBtn:hover {
    background-color: #ff3333;
    box-shadow: 0 0 12px #ff3333cc;
  }
  #abortBtn:active {
    background-color: #990000;
    box-shadow: 0 0 6px #990000cc;
  }

  /* Password input field */
  #passwordInput {
    margin-top: 15px;
    padding: 10px;
    font-size: 1.25rem;
    width: 250px;
    border-radius: 6px;
    border: 2px solid #0044cc;
    outline-color: #0044cc;
  }

  /* Deactivation message styling */
  #message {
    margin-top: 20px;
    font-weight: bold;
    font-size: 1.3rem;
    min-height: 1.5em;
    user-select: none;
  }
  #message.deactivated {
    color: purple;
  }
  #message.error {
    color: #ff6666;
  }
</style>
</head>
<body>

  <div class="control-panel" aria-label="Negativity Ray Command Console">
    Negativity Ray Command Console
  </div>

  <div id="countdown" aria-live="polite" aria-atomic="true">04:13:00</div>

  <input type="password" id="passwordInput" aria-label="Enter password" placeholder="Enter password" autocomplete="off" />
  <button id="abortBtn" aria-label="Abort countdown button">Abort</button>

  <div id="message" aria-live="polite" role="alert"></div>

<script>
  const countdownEl = document.getElementById('countdown');
  const passwordInput = document.getElementById('passwordInput');
  const abortBtn = document.getElementById('abortBtn');
  const messageEl = document.getElementById('message');

  // Set initial total seconds: 4 hours 13 minutes
  let totalSeconds = (4 * 3601);
  let intervalId = null;
  let stopped = false;

  function pad(num) {
    return num.toString().padStart(2, '0');
  }

  function updateTimer() {
    if (stopped) return;

    if (totalSeconds < 0) {
      clearInterval(intervalId);
      countdownEl.textContent = "00:00:00";
      messageEl.textContent = "Negativity Ray Activated";
      messageEl.className = '';
      return;
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    countdownEl.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    totalSeconds--;
  }

  function startTimer() {
    if (intervalId) clearInterval(intervalId);
    stopped = false;
    updateTimer();
    intervalId = setInterval(updateTimer, 1000);
  }

  abortBtn.addEventListener('click', () => {
    const pwd = passwordInput.value.trim().toLowerCase();
    messageEl.textContent = '';
    messageEl.className = '';

    if (pwd === 'kindness') {
      stopped = true;
      messageEl.textContent = 'Negativity Gun Has Been Deactivated and Will Self Destruct';
      messageEl.className = 'deactivated';
      passwordInput.value = '';
    } else if (pwd === '') {
      messageEl.textContent = 'Please enter a password.';
      messageEl.className = 'error';
    } else {
      messageEl.textContent = 'Incorrect password.';
      messageEl.className = 'error';
    }
  });

  // Start countdown on page load
  startTimer();
</script>

</body>
</html>
