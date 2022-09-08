let now = new Date();

let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
let hours = (now.getHours() < 10 ? "0" : "") + now.getHours();
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];

let h4 = document.querySelector("h4");

h4.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}`;

function showLocationTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let showTemp = document.querySelector("h1");
  showTemp.innerHTML = `${temp}°C`;

  let showLocation = document.querySelector("h3");
  showLocation.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
}

function inputLocation(event) {
  event.preventDefault();
  let location = document.querySelector("#city-input").value;
  let apiKey = "54fc721c0d464763c5cc4ecaf73813f7";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}q=${location}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showLocationTemperature);
}

let searchEngine = document.querySelector("#search");
searchEngine.addEventListener("submit", inputLocation);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", navGeoLoc);

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(position);

  let apiKey = "54fc721c0d464763c5cc4ecaf73813f7";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showLocationTemperature);
}

function navGeoLoc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}
