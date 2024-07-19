document.addEventListener('DOMContentLoaded', function() {
    let timer;
    const focusTime = 1500; // 25 minutes in seconds
    const shortBreakTime = 300; // 5 minutes in seconds
    const longBreakTime = 900; // 15 minutes in seconds
    let timeLeft = focusTime;
    let isPaused = true;

    const timerElement = document.getElementById('timer');
    const startPauseButton = document.getElementById('start-pause');
    const resetButton = document.getElementById('reset');
    const startPauseIcon = startPauseButton.querySelector('img');
    const startPauseText = startPauseButton.querySelector('span');
    const focusButton = document.querySelector('button[data-contexto="focus"]');
    const shortBreakButton = document.querySelector('button[data-contexto="short-break"]');
    const longBreakButton = document.querySelector('button[data-contexto="long-break"]');

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                alert('O tempo acabou!');
            }
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(timer);
    }

    function resetTimer() {
        clearInterval(timer);
        timeLeft = focusTime;
        updateTimerDisplay();
        startPauseIcon.src = 'imagens/play_arrow.png';
        startPauseText.textContent = 'Começar';
        isPaused = true;
    }

    function setTimer(newTime) {
        clearInterval(timer);
        timeLeft = newTime;
        updateTimerDisplay();
        startPauseIcon.src = 'imagens/play_arrow.png';
        startPauseText.textContent = 'Começar';
        isPaused = true;
    }

    startPauseButton.addEventListener('click', () => {
        if (isPaused) {
            startTimer();
            startPauseIcon.src = 'imagens/pause.png';
            startPauseText.textContent = 'Pausar';
        } else {
            pauseTimer();
            startPauseIcon.src = 'imagens/play_arrow.png';
            startPauseText.textContent = 'Começar';
        }
        isPaused = !isPaused;
    });

    resetButton.addEventListener('click', resetTimer);
    focusButton.addEventListener('click', () => setTimer(focusTime));
    shortBreakButton.addEventListener('click', () => setTimer(shortBreakTime));
    longBreakButton.addEventListener('click', () => setTimer(longBreakTime));

    updateTimerDisplay();
});
