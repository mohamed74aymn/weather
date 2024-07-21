document.addEventListener("DOMContentLoaded", () => {
	const API_KEY = "eb316044db8b4031855123636230408";
	const searchButton = document.getElementById("searchButton");
	const searchInput = document.getElementById("searchInput");
	const weatherCards = document.querySelector(".Weathers.row");

	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const months = [
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

	async function fetchWeatherData(location = "Fayoum") {
		try {
			const response = await fetch(
				`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3&aqi=yes&alerts=no`
			);
			const weatherData = await response.json();
			displayWeatherData(weatherData);
		} catch (error) {
			console.error("Error fetching weather data:", error);
		}
	}

	function displayWeatherData(weatherData) {
		weatherCards.innerHTML = "";

		const today = new Date(weatherData.forecast.forecastday[0].date);
		weatherCards.innerHTML += `
            <div class="col-md-4"   id="Box1" >
                <div id="todayBox" class="py-1 rounded-2">
                    <div class="weatherDate align-items-center d-flex px-5 py-3 justify-content-between rounded-2">
                        <p class="day w-50 mb-0">${days[today.getDay()]}</p>
                        <p class="date w-50 text-end mb-0">${today.getDate()} ${
			months[today.getMonth()]
		}</p>
                    </div>
                    <div class="weatherInfo px-4 py-3">
                        <p class="weatherLocation fw-medium fs-5">${
													weatherData.location.name
												}, ${weatherData.location.region}, ${
			weatherData.location.country
		}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="weatherDeg text-light fw-bolder mb-0 w-75">${
															weatherData.current.temp_c
														}&deg;C</p>
                            <div class="icon w-25">
                                <img src="${
																	weatherData.current.condition.icon
																}" alt="weather condition icon" class="w-100" />
                            </div>
                        </div>
                        <p id="weatherDesc" class="fs-5">${
													weatherData.current.condition.text
												}</p>
                        <div class="weatherIndicator my-4 d-flex flex-wrap gap-3">
                            <div class="indicator me-3">
                                <img src="/imgs/icon-umberella.png" alt="umbrella" class="me-2" />
                                <span>Humidity: ${
																	weatherData.current.humidity
																}%</span>
                            </div>
                            <div class="indicator me-3">
                                <img src="/imgs/icon-wind.png" alt="wind" class="me-2" />
                                <span>Wind: ${
																	weatherData.current.wind_kph
																} km/h</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

		for (let i = 1; i < weatherData.forecast.forecastday.length; i++) {
			const forecastDay = new Date(weatherData.forecast.forecastday[i].date);
			weatherCards.innerHTML += `
                <div class="col-md-4">
                    <div id="futureForecast" class="child-${i} py-5 rounded-2">
                        <div class="weatherDate align-items-center d-flex px-5 py-3 justify-content-between rounded-2">
                            <p class="day w-50 mb-0">${
															days[forecastDay.getDay()]
														}</p>
                            <p class="date w-50 text-end mb-0">${forecastDay.getDate()} ${
				months[forecastDay.getMonth()]
			}</p>
                        </div>
                        <div class="weatherInfo px-4 py-3">
                            <p class="weatherLocation fw-medium fs-5">${
															weatherData.location.name
														}, ${weatherData.location.region}, ${
				weatherData.location.country
			}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="weatherDeg text-light fw-bolder mb-0 w-75">${
																	weatherData.forecast.forecastday[i].day
																		.avgtemp_c
																}&deg;C</p>
                                <div class="icon w-25">
                                    <img src="${
																			weatherData.forecast.forecastday[i].day
																				.condition.icon
																		}" alt="weather condition icon" class="w-100" />
                                </div>
                            </div>
                            <p id="weatherDesc" class="fs-5">${
															weatherData.forecast.forecastday[i].day.condition
																.text
														}</p>
                        </div>
                    </div>
                </div>
            `;
		}
	}

	searchButton.addEventListener("click", () => {
		const location = searchInput.value.trim();
		if (location) {
			fetchWeatherData(location);
		}
	});

	fetchWeatherData();
});
