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

refs.input.addEventListener("input", handleInputValue);
refs.input.addEventListener("blur", handleInput);
refs.input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleInput(e);
  }
});

function handleInputValue(e) {
  const inputValue = e.currentTarget.value;

  if (inputValue.length > 2 && inputValue[2] !== ".") {
    e.currentTarget.value =
      inputValue[2] === ","
        ? inputValue.replace(/,/g, ".")
        : inputValue.slice(0, 2) + "." + inputValue.slice(2);
  }

  if (inputValue.length > 5 && inputValue[5] !== ".") {
    e.currentTarget.value =
      inputValue[5] === ","
        ? inputValue.replace(/,/g, ".")
        : inputValue.slice(0, 5) + "." + inputValue.slice(5);
  }
}

function handleInput(e) {
  if (myTimer) myTimer.stop();
  refs.error.textContent = "";

  const inputValue = e.currentTarget.value;

  if (inputValue === "") {
    refs.text.textContent = "";
    refs.days.textContent = "00";
    refs.hours.textContent = "00";
    refs.mins.textContent = "00";
    refs.secs.textContent = "00";
    return;
  }

  let reg = /^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.]\d{4}$/;

  if (!reg.test(inputValue)) {
    refs.error.textContent = "невірний формат";
  } else {
    const inputDate = new Date(convertDate(inputValue));
    const currentDate = new Date();

    refs.text.textContent =
      inputDate > currentDate
        ? `До ${inputValue} залишилось: `
        : `Після ${inputValue} пройшло: `;

    myTimer = new CountdownTimer(inputDate);
    myTimer.start();
  }
}

class CountdownTimer {
  constructor(inputDate) {
    this.inputDate = inputDate;
  }

  intervalId = null;

  start() {
    this.intervalId = setInterval(() => {
      const currentDate = new Date();
      const time = Math.abs(this.inputDate - currentDate);
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

    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.mins.textContent = mins;
    refs.secs.textContent = secs;
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }
}

function convertDate(inputFormat) {
  const dt = new Date(inputFormat.split(".").reverse().join("-"));
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(dt);
  const newFormat = `${month} ${dt.getDate()}, ${dt.getFullYear()}`;

  return newFormat;
}
