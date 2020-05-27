let defaultUnits = "metric";
async function getData(apiKey, place, units) {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}&units=${units}`
  );
  const weatherData = await response.json();
  return weatherData;
}

function processData(obj) {
  //tries to access the object, if successful returns an object with relevant info
    let data = {
      city: obj.name,
      perceived: obj.main.feels_like,
      temp: obj.main.temp,
      humidity: obj.main.humidity,
      weather: obj.weather[0].description,
    };
    return data;
}

function showData(apiKey, name, units) {
  const container = document.getElementById("container");
  container.innerHTML = "";
  try {
    getData(apiKey, name, units)
      .then((data) => processData(data))
      .then((obj) => {
        for (let prop in obj) {
          let listItem = document.createElement("li");
          if (prop === "humidity") {
            listItem.textContent = `${prop}: ${obj[prop]}%`;
          } else {
            listItem.textContent = `${prop}: ${obj[prop]}`;
          }
          container.appendChild(listItem);
        }
      });
  } catch (err) {
    console.error(err);
  }
}

function errorHandling(err) {
  const container = document.getElementById("container");
  let errorText = document.createElement("li");
  errorText.textContent = err.message;
  container.appendChild(errorText);
}


const choice = document.getElementById("city");
const submit = document.getElementById("submit");
submit.addEventListener("click", function (e) {
  e.preventDefault();
  showData(myKey, choice.value, defaultUnits);
});
showData(myKey, "London", defaultUnits);
