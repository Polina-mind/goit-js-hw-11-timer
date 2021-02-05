const refs = {
  days: document.querySelector('span[data-value="days"]'),
  hours: document.querySelector('span[data-value="hours"]'),
  mins: document.querySelector('span[data-value="mins"]'),
  secs: document.querySelector('span[data-value="secs"]'),
  header: document.querySelector("h1"),
};

class CountdownTimer {
  constructor({ selector, targetDate }) {
    (this.selector = selector), (this.targetDate = new Date(targetDate));
  }

  intervalId = null;

  start() {
    refs.header.insertAdjacentHTML(
      "beforeend",
      `<p class="text">До ${this.targetDate.toDateString()} осталось:</p>`
    );

    this.intervalId = setInterval(() => {
      const currentDate = Date.now();
      const time = this.targetDate.getTime() - currentDate;

      this.transfer(time);
    }, 1000);
  }

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
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }
}

const myTimer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("May 15, 2021"),
});

myTimer.start();

// НЕ ЧЕРЕЗ КЛАСС
// const countdownTimer = {
//   intervalId: null,
//   targetDate: new Date("Jul 15, 2021"),

//   start() {
//     this.intervalId = setInterval(() => {
//       const currentDate = Date.now();
//       const time = this.targetDate.getTime() - currentDate;

//       this.transfer(time);
//     }, 1000);
//   },

//   transfer(time) {
//     const days = Math.floor(time / (1000 * 60 * 60 * 24));
//     const hours = this.pad(
//       Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
//     );
//     const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
//     const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

//     refs.days.textContent = `${days}:`;
//     refs.hours.textContent = `${hours}:`;
//     refs.mins.textContent = `${mins}:`;
//     refs.secs.textContent = `${secs}`;
//   },

//   pad(value) {
//     return String(value).padStart(2, "0");
//   },
// };

// countdownTimer.start();
