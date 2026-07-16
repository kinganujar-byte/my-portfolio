const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherContent = document.getElementById('weatherContent');
const errorMessage = document.getElementById('errorMessage');
const recentList = document.getElementById('recentList');

const API_KEY = '0a37eea1ed48c4f34ac65c3d3a0c1fb0'; // Free OpenWeatherMap API Key
let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

// Event listeners
searchBtn.addEventListener('click', searchWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchWeather();
});

function searchWeather() {
    const city = cityInput.value.trim();
    if (city === '') return;

    weatherContent.innerHTML = '<div class="loading">Loading...</div>';
    errorMessage.classList.remove('show');

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            addRecentSearch(city);
            cityInput.value = '';
        })
        .catch(error => {
            showError('City not found. Please try another city.');
            weatherContent.innerHTML = '<div class="welcome-message"><p>🌍 Enter a city name to check the weather</p></div>';
        });
}

function displayWeather(data) {
    const { name, country } = data;
    const { temp, feels_like, humidity, pressure } = data.main;
    const { speed } = data.wind;
    const { main, description, icon } = data.weather[0];

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

    const html = `
        <div class="weather-display">
            <div class="city-name">${name}, ${country}</div>
            <div class="weather-icon"><img src="${iconUrl}" alt="${description}" style="width: 100px; height: 100px;"></div>
            <div class="temperature">${Math.round(temp)}°C</div>
            <div class="description">${description}</div>
            <div class="weather-details">
                <div class="detail-card">
                    <div class="detail-label">Feels Like</div>
                    <div class="detail-value">${Math.round(feels_like)}°C</div>
                </div>
                <div class="detail-card">
                    <div class="detail-label">Humidity</div>
                    <div class="detail-value">${humidity}%</div>
                </div>
                <div class="detail-card">
                    <div class="detail-label">Wind Speed</div>
                    <div class="detail-value">${speed} m/s</div>
                </div>
                <div class="detail-card">
                    <div class="detail-label">Pressure</div>
                    <div class="detail-value">${pressure} hPa</div>
                </div>
            </div>
        </div>
    `;

    weatherContent.innerHTML = html;
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

function addRecentSearch(city) {
    // Remove if already exists
    recentSearches = recentSearches.filter(c => c.toLowerCase() !== city.toLowerCase());
    // Add to beginning
    recentSearches.unshift(city);
    // Keep only last 5
    recentSearches = recentSearches.slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    displayRecentSearches();
}

function displayRecentSearches() {
    recentList.innerHTML = '';
    if (recentSearches.length === 0) {
        recentList.innerHTML = '<span class="empty-recent">No recent searches</span>';
        return;
    }

    recentSearches.forEach(city => {
        const btn = document.createElement('button');
        btn.className = 'recent-city';
        btn.textContent = city;
        btn.onclick = () => {
            cityInput.value = city;
            searchWeather();
        };
        recentList.appendChild(btn);
    });
}

// Display recent searches on load
displayRecentSearches();