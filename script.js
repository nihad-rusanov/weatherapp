const getDate = document.querySelector(".getDate");
const temp = document.querySelector(".temp");
const weatherText = document.querySelector(".weatherText");
const resetBtn = document.querySelector(".resetBtn");
const my_location = document.querySelector('.location')
let endpoint = "https://api.openweathermap.org/data/2.5/weather";
let api_key = "635be1c19b287ef771d24b6eae0a0bb7";
let lat;
let lon;
let weeks = [
  'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'
];
let months = [
  "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];

resetBtn.addEventListener("click", (e) => {
  const successCallback = (position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    fetch(`${endpoint}?lat=${lat}&lon=${lon}&appid=${api_key}`)
      .then((response) => response.json())
      .then((data) => displayInfo(data));
      
  };

  function displayInfo(data) {
    console.log(data)
    let temperature = Math.round(data.main.temp - 275.15, 2);
    console.log(temperature);
    temp.textContent = `${temperature}°C`;
    weatherText.textContent = `${data.weather[0]["main"]}`;
    my_location.textContent = `${data.sys.country},${data.name}`
  }

  navigator.geolocation.getCurrentPosition(successCallback);

  e.preventDefault();
});

setInterval(() => {
  let date = new Date();
  let year = date.getUTCFullYear();
  let month_index = date.getUTCMonth();
  let week_index = date.getDay();
  let day = date.getDate();
  getDate.textContent = `${weeks[week_index]}, ${day} ${months[month_index]}, ${year}`;
}, 100);
