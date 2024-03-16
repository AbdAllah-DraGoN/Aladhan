let dateContainer = document.getElementById("date");
let timeContainer = document.getElementById("time");
let cityContainer = document.getElementById("cities");

let citiesCode = [
    "latitude=30&longitude=30",
    "latitude=22&longitude=44",
    "latitude=31&longitude=34",
  ],
  theCode;
theCode = theCode || "latitude=30&longitude=30";

let timeNow = new Date();
timeNow = `${timeNow.getHours()}:${timeNow.getMinutes()}`;
timeContainer.innerHTML = timeNow;

let dateNow = new Date();
dateNow = `${dateNow.getDate()}-${
  dateNow.getMonth() + 1
}-${dateNow.getFullYear()}`;

getDateByAxios();
cityCode();

function getDateByAxios() {
  return new Promise((res, rej) => {
    axios
      .get(`http://api.aladhan.com/v1/timings/${dateNow}?${theCode}&method=5`)
      .then((response) => {
        let date = response.data.data.date.readable;
        dateContainer.innerHTML = date;
        setAdhanTime(response.data.data.timings);
      })
      .catch((error) => {
        rej(error);
      });
    res();
  });
}
function cityCode() {
  for (let i = 0; i < cityContainer.children.length; i++) {
    cityContainer.children[i].addEventListener("click", () => {
      deleteActive();
      cityContainer.children[i].classList.add("active");
      theCode = citiesCode[i];
      getDateByAxios();
    });
  }
}

function setAdhanTime(timings) {
  document.querySelector("#Fajr>h4").innerHTML = timings.Fajr;
  document.querySelector("#Sunrise>h4").innerHTML = timings.Sunrise;
  document.querySelector("#Dhuhr>h4").innerHTML = timings.Dhuhr;
  document.querySelector("#Asr>h4").innerHTML = timings.Asr;
  document.querySelector("#Maghrib>h4").innerHTML = timings.Maghrib;
  document.querySelector("#Isha>h4").innerHTML = timings.Isha;
}
let deleteActive = () => {
  for (let i = 0; i < cityContainer.children.length; i++) {
    cityContainer.children[i].classList.remove("active");
  }
};
