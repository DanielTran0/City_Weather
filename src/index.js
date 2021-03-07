import weather from './modules/weather_details';

window.addEventListener('load', () => weather.getWeatherDetails('maple'));
weather.toggleSwitchEvent();
weather.formEvent();
