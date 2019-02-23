function getChance(value) {
    let percentage
    var weather = require('weather-js');
    weather.find({search: value, degreeType: 'C'}, (err, result) => {
        if (err) return console.log(err)
        today = new Date().toLocaleDateString("en", { weekday: 'long' })     

        result[0].forecast.forEach(day => {
            perc = 0
            if (today.toLowerCase() == day.day.toLowerCase()) {
                loc = result[0].location
                cur = result[0].current

                console.log("Predicting for today...")
                perc = 0
                if (day.skytextday.toLowerCase().indexOf("snow") != -1) {
                    perc = perc + 1
                    if (day.precip) {
                        perc = perc + 3
                        perc = perc + Number(day.precip) / 4
                    }
                } else {
                    if (day.precip) {
                        perc = perc + 1
                        perc = perc + Number(day.precip) / 10
                    }
                }
                if (Number(day.low) < 0) {
                    low = Number(day.low).
                    perc = perc + 5
                    perc = perc + Number(day.low) / 5
                }
                if (loc.alert) {
                    perc = perc + 15
                }
            }
            percentage = Math.abs(perc)
        })
    })
    console.log(percentage)
    return percentage
}

module.exports = getChance