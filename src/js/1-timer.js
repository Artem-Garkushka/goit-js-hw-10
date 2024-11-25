document.addEventListener('DOMContentLoaded', () => {
  const datetimePicker = document.querySelector('#datetime-picker');
  const startButton = document.querySelector('[data-start]');
  const daysSpan = document.querySelector('[data-days]');
  const hoursSpan = document.querySelector('[data-hours]');
  const minutesSpan = document.querySelector('[data-minutes]');
  const secondsSpan = document.querySelector('[data-seconds]');

  let userSelectedDate;
  let countdownInterval = null;

  flatpickr(datetimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      if (userSelectedDate < new Date()) {
        iziToast.warning({
          title: 'Warning',
          message: 'Please choose a date in the future',
        });
        startButton.disabled = true;
      } else {
        startButton.disabled = false;
      }
    },
  });

  startButton.addEventListener('click', () => {
    startButton.disabled = true;
    datetimePicker.disabled = true;
    startCountdown(userSelectedDate);
  });

  function startCountdown(endDate) {
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    countdownInterval = setInterval(() => {
      const now = new Date();
      const timeRemaining = endDate - now;

      if (timeRemaining <= 0) {
        clearInterval(countdownInterval);
        updateTimerDisplay(0, 0, 0, 0);
        datetimePicker.disabled = false;
        return;
      }

      const { days, hours, minutes, seconds } = convertMs(timeRemaining);
      updateTimerDisplay(days, hours, minutes, seconds);
    }, 1000);
  }

  function updateTimerDisplay(days, hours, minutes, seconds) {
    daysSpan.textContent = String(days).padStart(2, '0');
    hoursSpan.textContent = String(hours).padStart(2, '0');
    minutesSpan.textContent = String(minutes).padStart(2, '0');
    secondsSpan.textContent = String(seconds).padStart(2, '0');
  }

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
});
