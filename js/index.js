const refs = {
  text: document.querySelector(".text"),
  input: document.querySelector("input"),
  error: document.querySelector(".error"),
  message: document.querySelector(".message"),
  days: document.querySelector('span[data-value="days"]'),
  hours: document.querySelector('span[data-value="hours"]'),
  mins: document.querySelector('span[data-value="mins"]'),
  secs: document.querySelector('span[data-value="secs"]'),
};

let userData;
let myTimer;

refs.input.addEventListener("input", function (e) {
  this.value = this.value.replace(/,/g, ".");
});
refs.input.addEventListener("blur", handleInput);
refs.input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleInput(e);
  }
});

function handleInput(e) {
  if (myTimer) myTimer.stop();
  refs.error.textContent = "";

  const inputData = e.currentTarget.value;
  if (inputData === "") {
    refs.days.textContent = "00";
    refs.hours.textContent = "00";
    refs.mins.textContent = "00";
    refs.secs.textContent = "00";
    return;
  }

  let reg = /^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.]\d{4}$/;

  if (!reg.test(inputData)) {
    refs.error.textContent = "невірний формат";
  } else {
    userData = convertDate(inputData);

    const userDate = new Date(userData);
    const currentDate = new Date();

    const message =
      userDate > currentDate
        ? `До ${inputData} залишилось: `
        : `Після ${inputData} пройшло: `;
    refs.text.textContent = message;

    myTimer = new CountdownTimer(new Date(userData));
    myTimer.start();
  }
}

class CountdownTimer {
  constructor(targetDate) {
    this.targetDate = new Date(targetDate);
  }

  intervalId = null;

  start() {
    this.intervalId = setInterval(() => {
      const currentDate = Date.now();
      const time = this.targetDate.getTime() - currentDate;

      this.transfer(time);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  transfer(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    refs.days.textContent = `${Math.abs(days)}`;
    refs.hours.textContent = `${Math.abs(hours)}`;
    refs.mins.textContent = `${Math.abs(mins)}`;
    refs.secs.textContent = `${Math.abs(secs)}`;
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }
}

function convertDate(inputFormat) {
  var dt = new Date(inputFormat.split(".").reverse().join("-"));
  var month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(dt);
  var newFormat = `${month} ${dt.getDate()}, ${dt.getFullYear()}`;

  return newFormat;
}

// НЕ ЧЕРЕЗ КЛАС
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
