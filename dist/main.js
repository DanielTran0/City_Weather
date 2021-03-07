/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/DOM.js":
/*!****************************!*\
  !*** ./src/modules/DOM.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOM);


/***/ }),

/***/ "./src/modules/weather_details.js":
/*!****************************************!*\
  !*** ./src/modules/weather_details.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM */ "./src/modules/DOM.js");


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

      _DOM__WEBPACK_IMPORTED_MODULE_0__.default.createCurrentOverview(
        weatherDetails.current,
        coordinateDetails.name,
        weatherDetails.daily['0'],
        celsiusOn
      );
      _DOM__WEBPACK_IMPORTED_MODULE_0__.default.createHourlyWeather(weatherDetails.hourly, celsiusOn);
      _DOM__WEBPACK_IMPORTED_MODULE_0__.default.createWeekWeather(weatherDetails.daily, celsiusOn);
    } catch (error) {
      console.log(error);
    }
  }

  const toggleSwitchEvent = () => {
    toggleSwitch.addEventListener('click', () => {
      celsiusOn = !celsiusOn;

      _DOM__WEBPACK_IMPORTED_MODULE_0__.default.createCurrentOverview(
        lastWeather.current,
        lastCity,
        lastWeather.daily['0'],
        celsiusOn
      );
      _DOM__WEBPACK_IMPORTED_MODULE_0__.default.createHourlyWeather(lastWeather.hourly, celsiusOn);
      _DOM__WEBPACK_IMPORTED_MODULE_0__.default.createWeekWeather(lastWeather.daily, celsiusOn);
    });
  };

  const formEvent = () => {
    locationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      getWeatherDetails(locationInput.value);
      _DOM__WEBPACK_IMPORTED_MODULE_0__.default.clearFormInput();
    });
  };

  return {
    getWeatherDetails,
    toggleSwitchEvent,
    formEvent,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (weather);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_weather_details__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/weather_details */ "./src/modules/weather_details.js");


window.addEventListener('load', () => _modules_weather_details__WEBPACK_IMPORTED_MODULE_0__.default.getWeatherDetails('maple'));
_modules_weather_details__WEBPACK_IMPORTED_MODULE_0__.default.toggleSwitchEvent();
_modules_weather_details__WEBPACK_IMPORTED_MODULE_0__.default.formEvent();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyX2FwcC8uL3NyYy9tb2R1bGVzL0RPTS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcC8uL3NyYy9tb2R1bGVzL3dlYXRoZXJfZGV0YWlscy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXJfYXBwLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0NBQW9DLFFBQVE7O0FBRTVDO0FBQ0EsZ0NBQWdDLFdBQVcsR0FBRyxRQUFRO0FBQ3RELGtDQUFrQyxNQUFNLEdBQUcsUUFBUTtBQUNuRDtBQUNBLGdCQUFnQixNQUFNLEdBQUcsUUFBUTtBQUNqQzs7QUFFQTtBQUNBLGdDQUFnQyxXQUFXO0FBQzNDLGtDQUFrQyxNQUFNO0FBQ3hDO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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O0FBQ0E7QUFDQSxDQUFDOztBQUVELGlFQUFlLE9BQU8sRUFBQzs7Ozs7OztVQy9FdkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7O0FDTmdEOztBQUVoRCxzQ0FBc0MsK0VBQXlCO0FBQy9ELCtFQUF5QjtBQUN6Qix1RUFBaUIiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERPTSA9ICgoKSA9PiB7XG4gIGNvbnN0IGxvY2F0aW9uRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2NhdGlvbkZvcm0gaW5wdXQnKTtcbiAgY29uc3QgY2l0eVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NpdHknKTtcbiAgY29uc3QgY3VycmVudENvbmRpdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjdXJyZW50Q29uZGl0aW9uJyk7XG4gIGNvbnN0IGN1cnJlbnRUZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2N1cnJlbnRUZW1wJyk7XG4gIGNvbnN0IGN1cnJlbnRIaWdoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2N1cnJlbnRIaWdoJyk7XG4gIGNvbnN0IGN1cnJlbnRMb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3VycmVudExvdycpO1xuICBjb25zdCBvdmVydmlld0ltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVydmlld0ltZycpO1xuICBjb25zdCBmZWVsc0xpa2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmVlbHNMaWtlJyk7XG4gIGNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2h1bWlkaXR5Jyk7XG4gIGNvbnN0IGNsb3VkaW5lc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvdWRpbmVzcycpO1xuICBjb25zdCB3aW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dpbmQnKTtcbiAgY29uc3Qgc3VuUmlzZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdW5SaXNlJyk7XG4gIGNvbnN0IHN1blNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdW5TZXQnKTtcbiAgY29uc3QgcmFpbkNoYW5jZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyYWluJyk7XG4gIGNvbnN0IHNub3dDaGFuY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc25vdycpO1xuICBjb25zdCBob3VybHlEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG91cmx5Jyk7XG4gIGNvbnN0IHdlZWtEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VlaycpO1xuXG4gIGNvbnN0IGNsZWFyRm9ybUlucHV0ID0gKCkgPT4ge1xuICAgIGxvY2F0aW9uRm9ybS52YWx1ZSA9ICcnO1xuICB9O1xuXG4gIGNvbnN0IGNsZWFyU2VjdGlvbiA9IChzZWN0aW9uKSA9PiB7XG4gICAgaWYgKHNlY3Rpb24gPT09ICdob3VybHknKSBob3VybHlEaXYudGV4dENvbnRlbnQgPSAnJztcbiAgICB3ZWVrRGl2LnRleHRDb250ZW50ID0gJyc7XG4gIH07XG5cbiAgY29uc3QgY29udmVydFVuaXggPSAoVW5peFRpbWUsIHRpbWUpID0+IHtcbiAgICBjb25zdCBtaWxsaXNlY29uZHMgPSBVbml4VGltZSAqIDEwMDA7XG4gICAgY29uc3QgZGF0ZU9iaiA9IG5ldyBEYXRlKG1pbGxpc2Vjb25kcyk7XG4gICAgbGV0IGhvdXJzID0gZGF0ZU9iai5nZXRIb3VycygpO1xuICAgIGxldCBtaW51dGVzID0gZGF0ZU9iai5nZXRIb3VycygpO1xuICAgIGNvbnN0IGRheSA9IGRhdGVPYmouZ2V0RGF5KCk7XG5cbiAgICBpZiAobWludXRlcyA8IDEwKSBtaW51dGVzID0gYDAke21pbnV0ZXN9YDtcblxuICAgIGlmICh0aW1lID09PSAnY3VycmVudCcpIHtcbiAgICAgIGlmIChob3VycyA+IDEyKSByZXR1cm4gYCR7aG91cnMgJSAxMn06JHttaW51dGVzfSBQTWA7XG4gICAgICBpZiAoaG91cnMgPT09IDEyKSByZXR1cm4gYCR7aG91cnN9OiR7bWludXRlc30gUE1gO1xuICAgICAgaWYgKGhvdXJzID09PSAwKSBob3VycyA9IDEyO1xuICAgICAgcmV0dXJuIGAke2hvdXJzfToke21pbnV0ZXN9IEFNYDtcbiAgICB9XG5cbiAgICBpZiAodGltZSA9PT0gJ2hvdXInKSB7XG4gICAgICBpZiAoaG91cnMgPiAxMikgcmV0dXJuIGAke2hvdXJzICUgMTJ9IFBNYDtcbiAgICAgIGlmIChob3VycyA9PT0gMTIpIHJldHVybiBgJHtob3Vyc30gUE1gO1xuICAgICAgaWYgKGhvdXJzID09PSAwKSBob3VycyA9IDEyO1xuICAgICAgcmV0dXJuIGAke2hvdXJzfSBBTWA7XG4gICAgfVxuXG4gICAgc3dpdGNoIChkYXkpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuICdNb25kYXknO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gJ1R1ZXNkYXknO1xuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gJ1dlZG5lc2RheSc7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHJldHVybiAnVGh1cnNkYXknO1xuICAgICAgY2FzZSA1OlxuICAgICAgICByZXR1cm4gJ0ZyaWRheSc7XG4gICAgICBjYXNlIDY6XG4gICAgICAgIHJldHVybiAnU2F0dXJkYXknO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdTdW5kYXknO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzZXRJbWFnZSA9ICh3ZWF0aGVyKSA9PiB7XG4gICAgY29uc3QgaWNvbklEID0gd2VhdGhlci5pZDtcbiAgICBjb25zdCBkYXlOaWdodElEID0gd2VhdGhlci5pY29uLnNsaWNlKDIsIDMpO1xuXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAvLyBUaHVuZGVyc3Rvcm1cbiAgICAgIGNhc2UgaWNvbklEID49IDIwMCAmJiBpY29uSUQgPCAzMDA6XG4gICAgICAgIGlmIChkYXlOaWdodElEID09PSAnZCcpIHJldHVybiAnaWNvbnMvT3ZlcnZpZXcvdGh1bmRlci8wNDYtc3Rvcm0ucG5nLyc7XG4gICAgICAgIHJldHVybiAnaWNvbnMvT3ZlcnZpZXcvdGh1bmRlci8wMTAtc3Rvcm0ucG5nJztcblxuICAgICAgLy8gRnJlZXppbmcgUmFpblxuICAgICAgY2FzZSBpY29uSUQgPT09IDUxMTpcbiAgICAgICAgcmV0dXJuICdpY29ucy9PdmVydmlldy9yYWluLzAyNi1zbm93Zmxha2UucG5nJztcblxuICAgICAgLy8gRHJpenpsZSBhbmQgUmFpblxuICAgICAgY2FzZSBpY29uSUQgPj0gMzAwICYmIGljb25JRCA8IDYwMDpcbiAgICAgICAgaWYgKGRheU5pZ2h0SUQgPT09ICdkJykgcmV0dXJuICdpY29ucy9PdmVydmlldy9yYWluLzAxMS1yYWlueS5wbmcnO1xuICAgICAgICByZXR1cm4gJ2ljb25zL092ZXJ2aWV3L3JhaW4vMDA4LXJhaW55IG5pZ2h0LnBuZyc7XG5cbiAgICAgIC8vIFNub3dcbiAgICAgIGNhc2UgaWNvbklEID49IDYwMCAmJiBpY29uSUQgPCA3MDA6XG4gICAgICAgIGlmIChkYXlOaWdodElEID09PSAnZCcpIHJldHVybiAnaWNvbnMvT3ZlcnZpZXcvc25vdy8wMzMtc25vd3kucG5nJztcbiAgICAgICAgcmV0dXJuICdpY29ucy9PdmVydmlldy9zbm93LzAwOS1zbm93eS5wbmcnO1xuXG4gICAgICAvLyBNaXN0XG4gICAgICBjYXNlIGljb25JRCA+PSA3MDAgJiYgaWNvbklEIDwgODAwOlxuICAgICAgICBpZiAoZGF5TmlnaHRJRCA9PT0gJ2QnKSByZXR1cm4gJ2ljb25zL092ZXJ2aWV3L21pc3QvMDAyLWhhemUucG5nJztcbiAgICAgICAgcmV0dXJuICdpY29ucy9PdmVydmlldy9taXN0LzAxNS1oYXplLnBuZyc7XG5cbiAgICAgIC8vIENsZWFyXG4gICAgICBjYXNlIGljb25JRCA9PT0gODAwOlxuICAgICAgICBpZiAoZGF5TmlnaHRJRCA9PT0gJ2QnKSByZXR1cm4gJ2ljb25zL092ZXJ2aWV3L2NsZWFyLzA0NC1zdW5ueS5wbmcnO1xuICAgICAgICByZXR1cm4gJ2ljb25zL092ZXJ2aWV3L2NsZWFyLzAwMi1mdWxsIG1vb24ucG5nJztcblxuICAgICAgLy8gQ2xvdWRzXG4gICAgICBjYXNlIGljb25JRCA+IDgwMDpcbiAgICAgICAgaWYgKGRheU5pZ2h0SUQgPT09ICdkJykgcmV0dXJuICdpY29ucy9PdmVydmlldy9jbG91ZHMvMDQ4LWNsb3VkeS5wbmcnO1xuICAgICAgICByZXR1cm4gJ2ljb25zL092ZXJ2aWV3L2Nsb3Vkcy8wMTMtY2xvdWR5LnBuZyc7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlQ3VycmVudE92ZXJ2aWV3ID0gKFxuICAgIGN1cnJlbnRXZWF0aGVyLFxuICAgIGNpdHksXG4gICAgZGF5V2VhdGhlcixcbiAgICBjZWxzaXVzT25cbiAgKSA9PiB7XG4gICAgbGV0IHRlbXAgPSBNYXRoLnJvdW5kKGN1cnJlbnRXZWF0aGVyLnRlbXApO1xuICAgIGlmICghY2Vsc2l1c09uKSB0ZW1wID0gTWF0aC5yb3VuZCgoY3VycmVudFdlYXRoZXIudGVtcCAqIDkpIC8gNSArIDMyKTtcblxuICAgIGNpdHlUaXRsZS50ZXh0Q29udGVudCA9IGAke2NpdHl9YDtcbiAgICBjdXJyZW50Q29uZGl0aW9uLnRleHRDb250ZW50ID0gYCR7Y3VycmVudFdlYXRoZXIud2VhdGhlclsnMCddLmRlc2NyaXB0aW9ufWA7XG4gICAgY3VycmVudFRlbXAudGV4dENvbnRlbnQgPSBgJHt0ZW1wfcKwYDtcbiAgICBjdXJyZW50SGlnaC50ZXh0Q29udGVudCA9IGBIaWdoOiAke01hdGgucm91bmQoZGF5V2VhdGhlci50ZW1wLm1heCl9wrBgO1xuICAgIGN1cnJlbnRMb3cudGV4dENvbnRlbnQgPSBgIExvdzogJHtNYXRoLnJvdW5kKGRheVdlYXRoZXIudGVtcC5taW4pfcKwYDtcbiAgICBvdmVydmlld0ltZy5zcmMgPSBzZXRJbWFnZShjdXJyZW50V2VhdGhlci53ZWF0aGVyWycwJ10pO1xuICAgIGZlZWxzTGlrZS50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQoY3VycmVudFdlYXRoZXIuZmVlbHNfbGlrZSl9wrBgO1xuICAgIGh1bWlkaXR5LnRleHRDb250ZW50ID0gYCR7Y3VycmVudFdlYXRoZXIuaHVtaWRpdHl9JWA7XG4gICAgY2xvdWRpbmVzcy50ZXh0Q29udGVudCA9IGAke2N1cnJlbnRXZWF0aGVyLmNsb3Vkc30lYDtcbiAgICB3aW5kLnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZChjdXJyZW50V2VhdGhlci53aW5kX3NwZWVkICogMTApIC8gMTB9IG0vc2A7XG4gICAgc3VuUmlzZS50ZXh0Q29udGVudCA9IGAke2NvbnZlcnRVbml4KGN1cnJlbnRXZWF0aGVyLnN1bnJpc2UsICdjdXJyZW50Jyl9YDtcbiAgICBzdW5TZXQudGV4dENvbnRlbnQgPSBgJHtjb252ZXJ0VW5peChjdXJyZW50V2VhdGhlci5zdW5zZXQsICdjdXJyZW50Jyl9YDtcblxuICAgIGlmIChkYXlXZWF0aGVyLnJhaW4gPT09IHVuZGVmaW5lZCkgcmFpbkNoYW5jZS50ZXh0Q29udGVudCA9ICcwIG1tJztcbiAgICBlbHNlIHJhaW5DaGFuY2UudGV4dENvbnRlbnQgPSBgJHtNYXRoLnJvdW5kKGRheVdlYXRoZXIucmFpbiAqIDEwKSAvIDEwfSBtbWA7XG5cbiAgICBpZiAoZGF5V2VhdGhlci5zbm93ID09PSB1bmRlZmluZWQpIHNub3dDaGFuY2UudGV4dENvbnRlbnQgPSAnMCBtbSc7XG4gICAgZWxzZSBzbm93Q2hhbmNlLnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZChkYXlXZWF0aGVyLnNub3cgKiAxMCkgLyAxMH0gbW1gO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZUhvdXJseUJsb2NrID0gKGhvdXJseVdlYXRoZXIsIGNlbHNpdXNPbikgPT4ge1xuICAgIGxldCB0ZW1wSG91ciA9IE1hdGgucm91bmQoaG91cmx5V2VhdGhlci50ZW1wKTtcbiAgICBpZiAoIWNlbHNpdXNPbikgdGVtcEhvdXIgPSBNYXRoLnJvdW5kKChob3VybHlXZWF0aGVyLnRlbXAgKiA5KSAvIDUgKyAzMik7XG5cbiAgICBjb25zdCBob3VybHlJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgaG91cmx5VGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGhvdXJseUltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGNvbnN0IGhvdXJseURlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgaG91cmx5VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgaG91cmx5SXRlbS5jbGFzc0xpc3QgPSAnaG91cmx5SXRlbSc7XG4gICAgaG91cmx5VGltZS5jbGFzc0xpc3QgPSAnaG91cmx5VGV4dCc7XG4gICAgaG91cmx5SW1nLmNsYXNzTGlzdCA9ICdob3VybHlJbWcnO1xuICAgIGhvdXJseURlc2NyaXB0aW9uLmNsYXNzTGlzdCA9ICdob3VybHlUZXh0JztcbiAgICBob3VybHlUZXh0LmNsYXNzTGlzdCA9ICdob3VybHlUZXh0JztcbiAgICBob3VybHlUaW1lLnRleHRDb250ZW50ID0gY29udmVydFVuaXgoaG91cmx5V2VhdGhlci5kdCwgJ2hvdXInKTtcbiAgICBob3VybHlJbWcuc3JjID0gc2V0SW1hZ2UoaG91cmx5V2VhdGhlci53ZWF0aGVyWycwJ10pO1xuICAgIGhvdXJseURlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYCR7aG91cmx5V2VhdGhlci53ZWF0aGVyWycwJ10ubWFpbn1gO1xuICAgIGhvdXJseVRleHQudGV4dENvbnRlbnQgPSBgJHt0ZW1wSG91cn3CsGA7XG5cbiAgICBob3VybHlJdGVtLmFwcGVuZENoaWxkKGhvdXJseVRpbWUpO1xuICAgIGhvdXJseUl0ZW0uYXBwZW5kQ2hpbGQoaG91cmx5SW1nKTtcbiAgICBob3VybHlJdGVtLmFwcGVuZENoaWxkKGhvdXJseURlc2NyaXB0aW9uKTtcbiAgICBob3VybHlJdGVtLmFwcGVuZENoaWxkKGhvdXJseVRleHQpO1xuICAgIGhvdXJseURpdi5hcHBlbmRDaGlsZChob3VybHlJdGVtKTtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVIb3VybHlXZWF0aGVyID0gKGhvdXJXZWF0aGVyLCBjZWxzaXVzT24pID0+IHtcbiAgICBjbGVhclNlY3Rpb24oJ2hvdXJseScpO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDI0OyBpICs9IDEpIHtcbiAgICAgIGNyZWF0ZUhvdXJseUJsb2NrKGhvdXJXZWF0aGVyW2Ake2l9YF0sIGNlbHNpdXNPbik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZVdlZWtCbG9jayA9ICh3ZWF0aGVyLCBjZWxzaXVzT24pID0+IHtcbiAgICBsZXQgdGVtcEhpZ2ggPSBNYXRoLnJvdW5kKHdlYXRoZXIudGVtcC5tYXgpO1xuICAgIGxldCB0ZW1wTG93ID0gTWF0aC5yb3VuZCh3ZWF0aGVyLnRlbXAubWluKTtcblxuICAgIGlmICghY2Vsc2l1c09uKSB7XG4gICAgICB0ZW1wSGlnaCA9IE1hdGgucm91bmQoKHdlYXRoZXIudGVtcC5tYXggKiA5KSAvIDUgKyAzMik7XG4gICAgICB0ZW1wTG93ID0gTWF0aC5yb3VuZCgod2VhdGhlci50ZW1wLm1pbiAqIDkpIC8gNSArIDMyKTtcbiAgICB9XG5cbiAgICBjb25zdCB3ZWVrSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHdlZWtJdGVtQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3Qgd2Vla0ltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGNvbnN0IHdlZWtEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHdlZWtIaWdoTG93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3Qgd2Vla0l0ZW1Db250YWluZXIyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgZGF5VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHdlZWtUZXh0V2luZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHdlZWtWYWx1ZVdpbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3Qgd2Vla1RleHRIdW1pZGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHdlZWtWYWx1ZUh1bWlkaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHdlZWtUZXh0Q2xvdWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB3ZWVrVmFsdWVDbG91ZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBjb25zdCB3ZWVrVGV4dFJhaW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB3ZWVrVmFsdWVSYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGNvbnN0IHdlZWtUZXh0U25vdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHdlZWtWYWx1ZVNub3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICB3ZWVrSXRlbS5jbGFzc0xpc3QgPSAnd2Vla0l0ZW0nO1xuICAgIHdlZWtJdGVtQ29udGFpbmVyLmNsYXNzTGlzdCA9ICd3ZWVrSXRlbUNvbnRhaW5lcic7XG4gICAgd2Vla0ltZy5zcmMgPSBzZXRJbWFnZSh3ZWF0aGVyLndlYXRoZXJbJzAnXSk7XG4gICAgd2Vla0Rlc2NyaXB0aW9uLmNsYXNzTGlzdCA9ICd3ZWVrRGVzY3JpcHRpb24nO1xuICAgIHdlZWtEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHdlYXRoZXIud2VhdGhlclsnMCddLmRlc2NyaXB0aW9uO1xuICAgIHdlZWtIaWdoTG93LmlkID0gJ3dlZWtIaWdoTG93JztcbiAgICB3ZWVrSGlnaExvdy50ZXh0Q29udGVudCA9IGBIOiAke3RlbXBIaWdofcKwIHwgTDogJHt0ZW1wTG93fcKwYDtcblxuICAgIHdlZWtJdGVtQ29udGFpbmVyMi5jbGFzc0xpc3QgPSAnd2Vla0l0ZW1Db250YWluZXInO1xuICAgIGRheVRleHQuY2xhc3NMaXN0ID0gJ2RheVRleHQnO1xuICAgIGRheVRleHQudGV4dENvbnRlbnQgPSBjb252ZXJ0VW5peCh3ZWF0aGVyLmR0KTtcbiAgICB3ZWVrVGV4dFdpbmQuY2xhc3NMaXN0ID0gJ3dlZWtUZXh0JztcbiAgICB3ZWVrVGV4dFdpbmQudGV4dENvbnRlbnQgPSAnV2luZDonO1xuICAgIHdlZWtWYWx1ZVdpbmQuY2xhc3NMaXN0ID0gJ3dlZWtWYWx1ZSc7XG4gICAgd2Vla1ZhbHVlV2luZC50ZXh0Q29udGVudCA9IGAke1xuICAgICAgTWF0aC5yb3VuZCh3ZWF0aGVyLndpbmRfc3BlZWQgKiAxMCkgLyAxMFxuICAgIH0gbS9zYDtcbiAgICB3ZWVrVGV4dEh1bWlkaXR5LmNsYXNzTGlzdCA9ICd3ZWVrVGV4dCc7XG4gICAgd2Vla1RleHRIdW1pZGl0eS50ZXh0Q29udGVudCA9ICdIdW1pZGl0eTonO1xuICAgIHdlZWtWYWx1ZUh1bWlkaXR5LmNsYXNzTGlzdCA9ICd3ZWVrVmFsdWUnO1xuICAgIHdlZWtWYWx1ZUh1bWlkaXR5LnRleHRDb250ZW50ID0gYCR7d2VhdGhlci5odW1pZGl0eX0lYDtcbiAgICB3ZWVrVGV4dENsb3VkLmNsYXNzTGlzdCA9ICd3ZWVrVGV4dCc7XG4gICAgd2Vla1RleHRDbG91ZC50ZXh0Q29udGVudCA9ICdDbG91ZHM6JztcbiAgICB3ZWVrVmFsdWVDbG91ZC5jbGFzc0xpc3QgPSAnd2Vla1ZhbHVlJztcbiAgICB3ZWVrVmFsdWVDbG91ZC50ZXh0Q29udGVudCA9IGAke3dlYXRoZXIuY2xvdWRzfSVgO1xuICAgIHdlZWtUZXh0UmFpbi5jbGFzc0xpc3QgPSAnd2Vla1RleHQnO1xuICAgIHdlZWtUZXh0UmFpbi50ZXh0Q29udGVudCA9ICdSYWluOic7XG4gICAgd2Vla1ZhbHVlUmFpbi5jbGFzc0xpc3QgPSAnd2Vla1ZhbHVlJztcbiAgICB3ZWVrVmFsdWVSYWluLnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZCh3ZWF0aGVyLnJhaW4gKiAxMCkgLyAxMH0gbW1gO1xuICAgIHdlZWtUZXh0U25vdy5jbGFzc0xpc3QgPSAnd2Vla1RleHQnO1xuICAgIHdlZWtUZXh0U25vdy50ZXh0Q29udGVudCA9ICdTbm93Oic7XG4gICAgd2Vla1ZhbHVlU25vdy5jbGFzc0xpc3QgPSAnd2Vla1ZhbHVlJztcbiAgICB3ZWVrVmFsdWVTbm93LnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZCh3ZWF0aGVyLnNub3cgKiAxMCkgLyAxMH0gbW1gO1xuXG4gICAgaWYgKHdlYXRoZXIucmFpbiA9PT0gdW5kZWZpbmVkKSB3ZWVrVmFsdWVSYWluLnRleHRDb250ZW50ID0gJzAgbW0nO1xuICAgIGlmICh3ZWF0aGVyLnNub3cgPT09IHVuZGVmaW5lZCkgd2Vla1ZhbHVlU25vdy50ZXh0Q29udGVudCA9ICcwIG1tJztcblxuICAgIHdlZWtEaXYuYXBwZW5kQ2hpbGQod2Vla0l0ZW0pO1xuICAgIHdlZWtJdGVtLmFwcGVuZENoaWxkKHdlZWtJdGVtQ29udGFpbmVyKTtcbiAgICB3ZWVrSXRlbUNvbnRhaW5lci5hcHBlbmRDaGlsZCh3ZWVrSW1nKTtcbiAgICB3ZWVrSXRlbUNvbnRhaW5lci5hcHBlbmRDaGlsZCh3ZWVrRGVzY3JpcHRpb24pO1xuICAgIHdlZWtJdGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKHdlZWtIaWdoTG93KTtcblxuICAgIHdlZWtJdGVtLmFwcGVuZENoaWxkKHdlZWtJdGVtQ29udGFpbmVyMik7XG4gICAgd2Vla0l0ZW1Db250YWluZXIyLmFwcGVuZENoaWxkKGRheVRleHQpO1xuICAgIHdlZWtJdGVtQ29udGFpbmVyMi5hcHBlbmRDaGlsZCh3ZWVrVGV4dFdpbmQpO1xuICAgIHdlZWtUZXh0V2luZC5hcHBlbmRDaGlsZCh3ZWVrVmFsdWVXaW5kKTtcbiAgICB3ZWVrSXRlbUNvbnRhaW5lcjIuYXBwZW5kQ2hpbGQod2Vla1RleHRIdW1pZGl0eSk7XG4gICAgd2Vla1RleHRIdW1pZGl0eS5hcHBlbmRDaGlsZCh3ZWVrVmFsdWVIdW1pZGl0eSk7XG4gICAgd2Vla0l0ZW1Db250YWluZXIyLmFwcGVuZENoaWxkKHdlZWtUZXh0Q2xvdWQpO1xuICAgIHdlZWtUZXh0Q2xvdWQuYXBwZW5kQ2hpbGQod2Vla1ZhbHVlQ2xvdWQpO1xuICAgIHdlZWtJdGVtQ29udGFpbmVyMi5hcHBlbmRDaGlsZCh3ZWVrVGV4dFJhaW4pO1xuICAgIHdlZWtUZXh0UmFpbi5hcHBlbmRDaGlsZCh3ZWVrVmFsdWVSYWluKTtcbiAgICB3ZWVrSXRlbUNvbnRhaW5lcjIuYXBwZW5kQ2hpbGQod2Vla1RleHRTbm93KTtcbiAgICB3ZWVrVGV4dFNub3cuYXBwZW5kQ2hpbGQod2Vla1ZhbHVlU25vdyk7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlV2Vla1dlYXRoZXIgPSAod2VhdGhlciwgY2Vsc2l1c09uKSA9PiB7XG4gICAgLy8gY2xlYXJTZWN0aW9uKCd3ZWVrJyk7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNzsgaSArPSAxKSB7XG4gICAgICBjcmVhdGVXZWVrQmxvY2sod2VhdGhlcltpXSwgY2Vsc2l1c09uKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBjbGVhckZvcm1JbnB1dCxcbiAgICBjcmVhdGVDdXJyZW50T3ZlcnZpZXcsXG4gICAgY3JlYXRlSG91cmx5V2VhdGhlcixcbiAgICBjcmVhdGVXZWVrV2VhdGhlcixcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IERPTTtcbiIsImltcG9ydCBET00gZnJvbSAnLi9ET00nO1xuXG5jb25zdCB3ZWF0aGVyID0gKCgpID0+IHtcbiAgY29uc3QgQVBJS2V5ID0gJzUwNjZhN2NjMzdkZDc0Y2IwZTQ0ZTBmNzczYTBlMjZkJztcbiAgY29uc3QgbG9jYXRpb25Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvY2F0aW9uRm9ybScpO1xuICBjb25zdCBsb2NhdGlvbklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvY2F0aW9uRm9ybSBpbnB1dCcpO1xuICBjb25zdCB0b2dnbGVTd2l0Y2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9nQnRuJyk7XG4gIGxldCBjZWxzaXVzT24gPSB0cnVlO1xuICBsZXQgbGFzdFdlYXRoZXI7XG4gIGxldCBsYXN0Q2l0eTtcblxuICBhc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyRGV0YWlscyh1c2VySW5wdXQpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKHVzZXJJbnB1dCA9PT0gJycpIHJldHVybjtcblxuICAgICAgY29uc3QgY29vcmRpbmF0ZVJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7dXNlcklucHV0fSZhcHBpZD0ke0FQSUtleX1gLFxuICAgICAgICB7XG4gICAgICAgICAgbW9kZTogJ2NvcnMnLFxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgY29uc3QgY29vcmRpbmF0ZURldGFpbHMgPSBhd2FpdCBjb29yZGluYXRlUmVzcG9uc2UuanNvbigpO1xuICAgICAgY29uc3Qge1xuICAgICAgICBjb29yZDogeyBsb24sIGxhdCB9LFxuICAgICAgfSA9IGNvb3JkaW5hdGVEZXRhaWxzO1xuICAgICAgbGFzdENpdHkgPSBjb29yZGluYXRlRGV0YWlscy5uYW1lO1xuXG4gICAgICBjb25zdCB3ZWF0aGVyRGV0YWlsc1Jlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvb25lY2FsbD9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mdW5pdHM9bWV0cmljJmV4Y2x1ZGU9bWludXRlbHksYWxlcnRzJmFwcGlkPSR7QVBJS2V5fWAsXG4gICAgICAgIHtcbiAgICAgICAgICBtb2RlOiAnY29ycycsXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICBjb25zdCB3ZWF0aGVyRGV0YWlscyA9IGF3YWl0IHdlYXRoZXJEZXRhaWxzUmVzcG9uc2UuanNvbigpO1xuICAgICAgbGFzdFdlYXRoZXIgPSB3ZWF0aGVyRGV0YWlscztcblxuICAgICAgRE9NLmNyZWF0ZUN1cnJlbnRPdmVydmlldyhcbiAgICAgICAgd2VhdGhlckRldGFpbHMuY3VycmVudCxcbiAgICAgICAgY29vcmRpbmF0ZURldGFpbHMubmFtZSxcbiAgICAgICAgd2VhdGhlckRldGFpbHMuZGFpbHlbJzAnXSxcbiAgICAgICAgY2Vsc2l1c09uXG4gICAgICApO1xuICAgICAgRE9NLmNyZWF0ZUhvdXJseVdlYXRoZXIod2VhdGhlckRldGFpbHMuaG91cmx5LCBjZWxzaXVzT24pO1xuICAgICAgRE9NLmNyZWF0ZVdlZWtXZWF0aGVyKHdlYXRoZXJEZXRhaWxzLmRhaWx5LCBjZWxzaXVzT24pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgdG9nZ2xlU3dpdGNoRXZlbnQgPSAoKSA9PiB7XG4gICAgdG9nZ2xlU3dpdGNoLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY2Vsc2l1c09uID0gIWNlbHNpdXNPbjtcblxuICAgICAgRE9NLmNyZWF0ZUN1cnJlbnRPdmVydmlldyhcbiAgICAgICAgbGFzdFdlYXRoZXIuY3VycmVudCxcbiAgICAgICAgbGFzdENpdHksXG4gICAgICAgIGxhc3RXZWF0aGVyLmRhaWx5WycwJ10sXG4gICAgICAgIGNlbHNpdXNPblxuICAgICAgKTtcbiAgICAgIERPTS5jcmVhdGVIb3VybHlXZWF0aGVyKGxhc3RXZWF0aGVyLmhvdXJseSwgY2Vsc2l1c09uKTtcbiAgICAgIERPTS5jcmVhdGVXZWVrV2VhdGhlcihsYXN0V2VhdGhlci5kYWlseSwgY2Vsc2l1c09uKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBmb3JtRXZlbnQgPSAoKSA9PiB7XG4gICAgbG9jYXRpb25Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBnZXRXZWF0aGVyRGV0YWlscyhsb2NhdGlvbklucHV0LnZhbHVlKTtcbiAgICAgIERPTS5jbGVhckZvcm1JbnB1dCgpO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZ2V0V2VhdGhlckRldGFpbHMsXG4gICAgdG9nZ2xlU3dpdGNoRXZlbnQsXG4gICAgZm9ybUV2ZW50LFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgd2VhdGhlcjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB3ZWF0aGVyIGZyb20gJy4vbW9kdWxlcy93ZWF0aGVyX2RldGFpbHMnO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHdlYXRoZXIuZ2V0V2VhdGhlckRldGFpbHMoJ21hcGxlJykpO1xud2VhdGhlci50b2dnbGVTd2l0Y2hFdmVudCgpO1xud2VhdGhlci5mb3JtRXZlbnQoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=