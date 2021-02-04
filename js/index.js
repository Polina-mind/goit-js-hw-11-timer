const refs = {
  days: document.querySelector('span[data-value="days"]'),
  hours: document.querySelector('span[data-value="hours"]'),
  mins: document.querySelector('span[data-value="mins"]'),
  secs: document.querySelector('span[data-value="secs"]'),
};

const countdownTimer = {
  intervalId: null,
  targetDate: new Date("Jul 17, 2021"),

  start() {
    this.intervalId = setInterval(() => {
      const currentDate = Date.now();
      const time = this.targetDate.getTime() - currentDate;

      this.transfer(time);
    }, 1000);
  },

  transfer(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    refs.days.textContent = `${days}:`;
    refs.hours.textContent = `${hours}:`;
    refs.mins.textContent = `${mins}:`;
    refs.secs.textContent = `${secs}`;
  },

  pad(value) {
    return String(value).padStart(2, "0");
  },
};

countdownTimer.start();

// new CountdownTimer({
//   selector: "#timer-1",
//   targetDate: new Date("Jul 17, 2019"),
// });

// let timerId = setInterval(onCountdown, 1000);

// function onCountdown() {
//   setInterval(onCountdown, 1000);
//   const currentDate = Date.now();
//   // console.log(currentDate);

//   const targetDate = new Date("Jul 17, 2021");
//   // console.log(targetDate.getTime());

//   let time = targetDate.getTime() - currentDate;

//   const days = Math.floor(time / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
//   const secs = Math.floor((time % (1000 * 60)) / 1000);

//   refs.days.textContent = days;
//   refs.hours.textContent = hours;
//   refs.mins.textContent = mins;
//   refs.secs.textContent = secs;
// }

//
