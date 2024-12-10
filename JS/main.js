let timetabel = document.getElementById('timetabel')
let result
const search = document.getElementById('search')

search.addEventListener('input',()=>{
        weather(search.value)
})

async function weather(city = 'london') {
    let respone = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`)
    result = await respone.json()
    let date1 = result.forecast.forecastday[0].date
    let date2 = result.forecast.forecastday[1].date
    let date3 = result.forecast.forecastday[2].date
    display(getDayFromDateString(date1), getDayFromDateString(date2), getDayFromDateString(date3),formatDate(result.forecast.forecastday[0].date))
}

let s = 'hi'

function display(a, b, c ,d) {
    timetabel.innerHTML = `<div class="col-md-4">
    <div class="today rounded">
        <div class="head d-flex justify-content-between">
            <div class="day">${a}</div>
            <div class="date">${d}</div>
        </div>
        <div class="body">
            <div class="location">${result.location.name}</div>
            <div class="degree">
                <div class="number">${result.current.temp_c}<sup>o</sup>c</div>
                <div class="body-icon"><img width="90" src="${result.current.condition.icon}" alt=""></div>
            </div>
            <div class="sky">${result.current.condition.text}</div>
            <span id="rain"><img src="Image/icon-umberella.png" alt="">${result.current.wind_degree}%</span>
            <span id="wind"><img src="Image/icon-wind.png" alt="">${result.current.wind_kph} km/h</span>
            <span id="compass"><img src="Image/icon-compass.png" alt="">${result.current.wind_dir}</span>
        </div>
    </div>
</div>
<div class="col-md-4">
    <div class="today-2 rounded">
        <div class="head-2">
            <div class="day">${b}</div>
        </div>
        <div class="body-2">
            <div class="body-icon"><img width="48" src="${result.forecast.forecastday[1].day.condition.icon}" alt=""></div>
            <div class="degree-2">
                <div class="number">${result.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>c</div>
                <small>${result.forecast.forecastday[1].day.avgtemp_c}<sup>o</sup></small>
            </div>
            <div class="sky">${result.forecast.forecastday[1].day.condition.text}</div>
        </div>
    </div>
</div>
<div class="col-md-4">
    <div class="today-3 rounded">
        <div class="head-3">
            <div class="day">${c}</div>
        </div>
        <div class="body-3">
            <div class="body-icon"><img width="48" src="${result.forecast.forecastday[2].day.condition.icon}" alt=""></div>
            <div class="degree-3">
                <div class="number">${result.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>c</div>
                <small>${result.forecast.forecastday[2].day.avgtemp_c}<sup>o</sup></small>
            </div>
            <div class="sky">${result.forecast.forecastday[2].day.condition.text}</div>
        </div>
    </div>
</div>`
}

weather()

function getDayFromDateString(dateString) {
    const parts = dateString.split('-');
    const date = new Date(parts[2], parts[1] - 1, parts[0]);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthName = monthNames[parseInt(month, 10) - 1];
    return `${day} ${monthName}`;
}
