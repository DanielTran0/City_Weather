const DOM = (() => {
  const locationForm = document.querySelector('#locationForm input');
  const cityTitle = document.querySelector('#city');
  const currentCondition = document.querySelector('#currentCondition');
  const currentTemp = document.querySelector('#currentTemp');
  const currentHigh = document.querySelector('#currentHigh');
  const currentLow = document.querySelector('#currentLow');
  const overviewImg = document.querySelector('.overviewImg');
  const feelsLike = document.querySelector('#feelsLike');
  const humidity = document.querySelector('#humidity');
  const cloudiness = document.querySelector('#cloudiness');
  const wind = document.querySelector('#wind');
  const sunRise = document.querySelector('#sunRise');
  const sunSet = document.querySelector('#sunSet');
  const rainChance = document.querySelector('#rain');
  const snowChance = document.querySelector('#snow');
  const hourlyDiv = document.querySelector('.hourly');
  const weekDiv = document.querySelector('.week');

  const clearFormInput = () => {
    locationForm.value = '';
  };

  const clearSection = (section) => {
    if (section === 'hourly') hourlyDiv.textContent = '';
    weekDiv.textContent = '';
  };

  const convertUnix = (UnixTime, time) => {
    const milliseconds = UnixTime * 1000;
    const dateObj = new Date(milliseconds);
    let hours = dateObj.getHours();
    let minutes = dateObj.getHours();
    const day = dateObj.getDay();

    if (minutes < 10) minutes = `0${minutes}`;

    if (time === 'current') {
      if (hours > 12) return `${hours % 12}:${minutes} PM`;
      if (hours === 12) return `${hours}:${minutes} PM`;
      if (hours === 0) hours = 12;
      return `${hours}:${minutes} AM`;
    }

    if (time === 'hour') {
      if (hours > 12) return `${hours % 12} PM`;
      if (hours === 12) return `${hours} PM`;
      if (hours === 0) hours = 12;
      return `${hours} AM`;
    }

    switch (day) {
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
      default:
        return 'Sunday';
    }
  };

  const setImage = (weather) => {
    const iconID = weather.id;
    const dayNightID = weather.icon.slice(2, 3);

    switch (true) {
      // Thunderstorm
      case iconID >= 200 && iconID < 300:
        if (dayNightID === 'd') return 'icons/Overview/thunder/046-storm.png/';
        return 'icons/Overview/thunder/010-storm.png';

      // Freezing Rain
      case iconID === 511:
        return 'icons/Overview/rain/026-snowflake.png';

      // Drizzle and Rain
      case iconID >= 300 && iconID < 600:
        if (dayNightID === 'd') return 'icons/Overview/rain/011-rainy.png';
        return 'icons/Overview/rain/008-rainy night.png';

      // Snow
      case iconID >= 600 && iconID < 700:
        if (dayNightID === 'd') return 'icons/Overview/snow/033-snowy.png';
        return 'icons/Overview/snow/009-snowy.png';

      // Mist
      case iconID >= 700 && iconID < 800:
        if (dayNightID === 'd') return 'icons/Overview/mist/002-haze.png';
        return 'icons/Overview/mist/015-haze.png';

      // Clear
      case iconID === 800:
        if (dayNightID === 'd') return 'icons/Overview/clear/044-sunny.png';
        return 'icons/Overview/clear/002-full moon.png';

      // Clouds
      case iconID > 800:
        if (dayNightID === 'd') return 'icons/Overview/clouds/048-cloudy.png';
        return 'icons/Overview/clouds/013-cloudy.png';

      default:
        return '';
    }
  };

  const createCurrentOverview = (
    currentWeather,
    city,
    dayWeather,
    celsiusOn
  ) => {
    let temp = Math.round(currentWeather.temp);
    if (!celsiusOn) temp = Math.round((currentWeather.temp * 9) / 5 + 32);

    cityTitle.textContent = `${city}`;
    currentCondition.textContent = `${currentWeather.weather['0'].description}`;
    currentTemp.textContent = `${temp}°`;
    currentHigh.textContent = `High: ${Math.round(dayWeather.temp.max)}°`;
    currentLow.textContent = ` Low: ${Math.round(dayWeather.temp.min)}°`;
    overviewImg.src = setImage(currentWeather.weather['0']);
    feelsLike.textContent = `${Math.round(currentWeather.feels_like)}°`;
    humidity.textContent = `${currentWeather.humidity}%`;
    cloudiness.textContent = `${currentWeather.clouds}%`;
    wind.textContent = `${Math.round(currentWeather.wind_speed * 10) / 10} m/s`;
    sunRise.textContent = `${convertUnix(currentWeather.sunrise, 'current')}`;
    sunSet.textContent = `${convertUnix(currentWeather.sunset, 'current')}`;

    if (dayWeather.rain === undefined) rainChance.textContent = '0 mm';
    else rainChance.textContent = `${Math.round(dayWeather.rain * 10) / 10} mm`;

    if (dayWeather.snow === undefined) snowChance.textContent = '0 mm';
    else snowChance.textContent = `${Math.round(dayWeather.snow * 10) / 10} mm`;
  };

  const createHourlyBlock = (hourlyWeather, celsiusOn) => {
    let tempHour = Math.round(hourlyWeather.temp);
    if (!celsiusOn) tempHour = Math.round((hourlyWeather.temp * 9) / 5 + 32);

    const hourlyItem = document.createElement('div');
    const hourlyTime = document.createElement('div');
    const hourlyImg = document.createElement('img');
    const hourlyDescription = document.createElement('div');
    const hourlyText = document.createElement('div');

    hourlyItem.classList = 'hourlyItem';
    hourlyTime.classList = 'hourlyText';
    hourlyImg.classList = 'hourlyImg';
    hourlyDescription.classList = 'hourlyText';
    hourlyText.classList = 'hourlyText';
    hourlyTime.textContent = convertUnix(hourlyWeather.dt, 'hour');
    hourlyImg.src = setImage(hourlyWeather.weather['0']);
    hourlyDescription.textContent = `${hourlyWeather.weather['0'].main}`;
    hourlyText.textContent = `${tempHour}°`;

    hourlyItem.appendChild(hourlyTime);
    hourlyItem.appendChild(hourlyImg);
    hourlyItem.appendChild(hourlyDescription);
    hourlyItem.appendChild(hourlyText);
    hourlyDiv.appendChild(hourlyItem);
  };

  const createHourlyWeather = (hourWeather, celsiusOn) => {
    clearSection('hourly');
    for (let i = 1; i <= 24; i += 1) {
      createHourlyBlock(hourWeather[`${i}`], celsiusOn);
    }
  };

  const createWeekBlock = (weather, celsiusOn) => {
    let tempHigh = Math.round(weather.temp.max);
    let tempLow = Math.round(weather.temp.min);

    if (!celsiusOn) {
      tempHigh = Math.round((weather.temp.max * 9) / 5 + 32);
      tempLow = Math.round((weather.temp.min * 9) / 5 + 32);
    }

    const weekItem = document.createElement('div');
    const weekItemContainer = document.createElement('div');
    const weekImg = document.createElement('img');
    const weekDescription = document.createElement('div');
    const weekHighLow = document.createElement('div');
    const weekItemContainer2 = document.createElement('div');
    const dayText = document.createElement('div');
    const weekTextWind = document.createElement('div');
    const weekValueWind = document.createElement('span');
    const weekTextHumidity = document.createElement('div');
    const weekValueHumidity = document.createElement('span');
    const weekTextCloud = document.createElement('div');
    const weekValueCloud = document.createElement('span');
    const weekTextRain = document.createElement('div');
    const weekValueRain = document.createElement('span');
    const weekTextSnow = document.createElement('div');
    const weekValueSnow = document.createElement('span');

    weekItem.classList = 'weekItem';
    weekItemContainer.classList = 'weekItemContainer';
    weekImg.src = setImage(weather.weather['0']);
    weekDescription.classList = 'weekDescription';
    weekDescription.textContent = weather.weather['0'].description;
    weekHighLow.id = 'weekHighLow';
    weekHighLow.textContent = `H: ${tempHigh}° | L: ${tempLow}°`;

    weekItemContainer2.classList = 'weekItemContainer';
    dayText.classList = 'dayText';
    dayText.textContent = convertUnix(weather.dt);
    weekTextWind.classList = 'weekText';
    weekTextWind.textContent = 'Wind:';
    weekValueWind.classList = 'weekValue';
    weekValueWind.textContent = `${
      Math.round(weather.wind_speed * 10) / 10
    } m/s`;
    weekTextHumidity.classList = 'weekText';
    weekTextHumidity.textContent = 'Humidity:';
    weekValueHumidity.classList = 'weekValue';
    weekValueHumidity.textContent = `${weather.humidity}%`;
    weekTextCloud.classList = 'weekText';
    weekTextCloud.textContent = 'Clouds:';
    weekValueCloud.classList = 'weekValue';
    weekValueCloud.textContent = `${weather.clouds}%`;
    weekTextRain.classList = 'weekText';
    weekTextRain.textContent = 'Rain:';
    weekValueRain.classList = 'weekValue';
    weekValueRain.textContent = `${Math.round(weather.rain * 10) / 10} mm`;
    weekTextSnow.classList = 'weekText';
    weekTextSnow.textContent = 'Snow:';
    weekValueSnow.classList = 'weekValue';
    weekValueSnow.textContent = `${Math.round(weather.snow * 10) / 10} mm`;

    if (weather.rain === undefined) weekValueRain.textContent = '0 mm';
    if (weather.snow === undefined) weekValueSnow.textContent = '0 mm';

    weekDiv.appendChild(weekItem);
    weekItem.appendChild(weekItemContainer);
    weekItemContainer.appendChild(weekImg);
    weekItemContainer.appendChild(weekDescription);
    weekItemContainer.appendChild(weekHighLow);

    weekItem.appendChild(weekItemContainer2);
    weekItemContainer2.appendChild(dayText);
    weekItemContainer2.appendChild(weekTextWind);
    weekTextWind.appendChild(weekValueWind);
    weekItemContainer2.appendChild(weekTextHumidity);
    weekTextHumidity.appendChild(weekValueHumidity);
    weekItemContainer2.appendChild(weekTextCloud);
    weekTextCloud.appendChild(weekValueCloud);
    weekItemContainer2.appendChild(weekTextRain);
    weekTextRain.appendChild(weekValueRain);
    weekItemContainer2.appendChild(weekTextSnow);
    weekTextSnow.appendChild(weekValueSnow);
  };

  const createWeekWeather = (weather, celsiusOn) => {
    // clearSection('week');
    for (let i = 1; i <= 7; i += 1) {
      createWeekBlock(weather[i], celsiusOn);
    }
  };

  return {
    clearFormInput,
    createCurrentOverview,
    createHourlyWeather,
    createWeekWeather,
  };
})();

export default DOM;
