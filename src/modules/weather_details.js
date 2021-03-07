import DOM from './DOM';

const weather = (() => {
  const APIKey = '5066a7cc37dd74cb0e44e0f773a0e26d';
  const locationForm = document.querySelector('#locationForm');
  const locationInput = document.querySelector('#locationForm input');
  const toggleSwitch = document.querySelector('#togBtn');
  let celsiusOn = true;
  let lastWeather;
  let lastCity;

  async function getWeatherDetails(userInput) {
    try {
      if (userInput === '') return;

      const coordinateResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${APIKey}`,
        {
          mode: 'cors',
        }
      );
      const coordinateDetails = await coordinateResponse.json();
      const {
        coord: { lon, lat },
      } = coordinateDetails;
      lastCity = coordinateDetails.name;

      const weatherDetailsResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${APIKey}`,
        {
          mode: 'cors',
        }
      );
      const weatherDetails = await weatherDetailsResponse.json();
      lastWeather = weatherDetails;

      DOM.createCurrentOverview(
        weatherDetails.current,
        coordinateDetails.name,
        weatherDetails.daily['0'],
        celsiusOn
      );
      DOM.createHourlyWeather(weatherDetails.hourly, celsiusOn);
      DOM.createWeekWeather(weatherDetails.daily, celsiusOn);
    } catch (error) {
      console.log(error);
    }
  }

  const toggleSwitchEvent = () => {
    toggleSwitch.addEventListener('click', () => {
      celsiusOn = !celsiusOn;

      DOM.createCurrentOverview(
        lastWeather.current,
        lastCity,
        lastWeather.daily['0'],
        celsiusOn
      );
      DOM.createHourlyWeather(lastWeather.hourly, celsiusOn);
      DOM.createWeekWeather(lastWeather.daily, celsiusOn);
    });
  };

  const formEvent = () => {
    locationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      getWeatherDetails(locationInput.value);
      DOM.clearFormInput();
    });
  };

  return {
    getWeatherDetails,
    toggleSwitchEvent,
    formEvent,
  };
})();

export default weather;
