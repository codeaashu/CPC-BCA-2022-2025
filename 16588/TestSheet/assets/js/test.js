document.addEventListener('DOMContentLoaded', function() {
    let timerDuration = 1 * 60; // 5 minutes
    const timerDisplay = document.getElementById('time');

    function updateTimer() {
        const minutes = Math.floor(timerDuration / 60);
        const seconds = timerDuration % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        timerDuration--;

        if (timerDuration < 0) {
            clearInterval(timerInterval);
            alert('Time is up!');
            document.getElementById('quizForm').submit(); // Auto-submit the form when time is up
        }
    }

    const timerInterval = setInterval(updateTimer, 1000);

    // Initialize the timer display
    updateTimer();
});
