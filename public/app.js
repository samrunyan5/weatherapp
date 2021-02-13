async function fetchWeather() {
    if (!navigator || !navigator.geolocation) {
        $('#weather').empty().append($('<h3>Weather not available on this browser</h3>'))
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
        const {coords: {latitude, longitude}} = position
        const response = await fetch(`/weather?lat=${latitude}&lon=${longitude}`)
        const {results} = await response.json()

        if (results.alerts[0]) {
            const {event, description} = results.alerts[0]
            $('#alert').empty().append($(`<div>
                <h2>${event.toUpperCase()}</h2>
                <div>${description}</div>
            </div>`))
        }

        if (results.daily) {
            console.log('daily: ', results.daily)
        }
    })
}

fetchWeather()

async function fetchQuote() {
    const response = await fetch('/cowspiration');
    const {cow} = await response.json();
    $('#cow').empty().append($(`<pre>${cow}</pre>`))
}

fetchQuote();