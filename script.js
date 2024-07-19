document.addEventListener('DOMContentLoaded', function() {
    let timer;
    const focusTime = 3000; // 50 minutos em segundos
    const shortBreakTime = 600; // 10 minutos em segundos
    const longBreakTime = 900; // 15 minutos em segundos
    let timeLeft = focusTime;
    let isPaused = true;
    let currentContext = 'focus'; // Contexto padrão

    const timerElement = document.getElementById('timer');
    const startPauseButton = document.getElementById('start-pause');
    const resetButton = document.getElementById('reset');
    const startPauseIcon = startPauseButton.querySelector('img');
    const startPauseText = startPauseButton.querySelector('span');
    const focusButton = document.querySelector('button[data-contexto="focus"]');
    const shortBreakButton = document.querySelector('button[data-contexto="short-break"]');
    const longBreakButton = document.querySelector('button[data-contexto="long-break"]');
    const cardContainer = document.querySelector('.card-container');

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
        switch (currentContext) {
            case 'focus':
                timeLeft = focusTime;
                break;
            case 'short-break':
                timeLeft = shortBreakTime;
                break;
            case 'long-break':
                timeLeft = longBreakTime;
                break;
            default:
                timeLeft = focusTime;
                break;
        }
        updateTimerDisplay();
        startPauseIcon.src = 'imagens/play_arrow.png';
        startPauseText.textContent = 'Começar';
        isPaused = true;
    }

    function setTimer(newTime, contextClass) {
        clearInterval(timer);
        timeLeft = newTime;
        updateTimerDisplay();
        startPauseIcon.src = 'imagens/play_arrow.png';
        startPauseText.textContent = 'Começar';
        isPaused = true;
        currentContext = contextClass; // Atualiza o contexto atual
        cardContainer.className = 'card-container ' + contextClass;
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
    focusButton.addEventListener('click', () => setTimer(focusTime, 'focus'));
    shortBreakButton.addEventListener('click', () => setTimer(shortBreakTime, 'short-break'));
    longBreakButton.addEventListener('click', () => setTimer(longBreakTime, 'long-break'));

    updateTimerDisplay();
});
