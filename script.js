document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "dc881dca2a86adba236b2855eacc3927";
  const locationInput = document.getElementById("locationInput");
  const searchButton = document.getElementById("searchButton");
  const locationName = document.getElementById("locationName");
  const temperature = document.getElementById("temperature");
  const condition = document.getElementById("condition");

  // Function to fetch weather data from the API
  function fetchWeather(location) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          updateUI(data);
          localStorage.setItem("lastLocation", location);
        } else {
          alert("Location not found");
        }
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  }

  // Function to update the UI with fetched weather data
  function updateUI(data) {
    locationName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    condition.textContent = `Condition: ${data.weather[0].description}`;
    // updateBackground(data.weather[0].main); // Uncomment if background update is needed
  }

  // Function to update the background based on weather condition
  function updateBackground(weatherCondition) {
    let backgroundUrl;
    switch (weatherCondition.toLowerCase()) {
      case "clear":
        backgroundUrl = "url(./assets/clear.jpg)";
        break;
      case "clouds":
        backgroundUrl = "url(https://tenor.com/bzrFw.gif)";
        break;
      case "rain":
        backgroundUrl = "url(https://tenor.com/bbAqY.gif)";
        break;
      case "snow":
        backgroundUrl = "url(https://pin.it/7FsSh58aO)";
        break;
      default:
        backgroundUrl = "url(https://tenor.com/bzrFw.gif)";
    }
    document.body.style.backgroundImage = backgroundUrl;
  }

  // Event listener for search button click
  searchButton.addEventListener("click", () => {
    const location = locationInput.value;
    if (location) {
      fetchWeather(location);
    }
  });

  // Event listener for Enter key press in the input field
  locationInput.addEventListener("keypress", (e) => {
    const location = locationInput.value;
    if (e.key === "Enter") {
      fetchWeather(location);
    }
  });

  // Fetch weather for the last searched location or a default location
  const lastLocation = localStorage.getItem("lastLocation");
  if (lastLocation) {
    fetchWeather(lastLocation);
  } else {
    fetchWeather("defaultLocation"); // Replace "defaultLocation" with an actual default location
  }
});
