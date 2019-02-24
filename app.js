const express = require('express')
const app = express()
const port = 3000
const getChance = require('./chance')
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: false }))
app.get('/:place', (req, res) => {
    var place = req.params.place
    var weather = require('weather-js');
    weather.find({search: place, degreeType: 'C'}, (err, result) => {
        if (err) return console.log(err)
        if (typeof result[0] === "undefined") {
            res.json({error: "not found", date: new Date(), chance: 0})
            return
        }
        today = new Date().setHours(0,0,0,0)
        result[0].forecast.forEach(day => {
            date = new Date(day.date)
            if (new Date(date-today).valueOf() == new Date("1970-01-01T19:00:00.000Z").valueOf()) {
                /*if (day.date.toLowerCase() == "sunday" || day.date.toLowerCase() == "saturday") {
                    res.json({error: "weekend", date: date})
                    return
                }*/
                loc = result[0].location
                cur = result[0].current
                console.log("Predicting for today...")
                perc = 0
                if (day.skytextday.toLowerCase().indexOf("snow") != -1) {
                    perc = perc + 1
                    if (day.precip) {
                        perc = perc + 3
                        perc = perc + Number(day.precip) / 7
                    }
                } else {
                    if (day.precip) {
                        perc = perc + 1
                        perc = perc + Number(day.precip) / 14
                    }
                }
                if (Number(day.low) < 0) {
                    low = Number(day.low).
                    perc = perc + 5
                    perc = perc + Number(day.low) / 7
                }
                if (loc.alert) {
                    perc = perc + 15
                }
                res.json({chance: (Math.abs(perc)).toFixed(2), date: day.date, error: null})
            }
        })
    })
})

app.get('/', (req, res) => {
    res.json({error: "not found", date: new Date(), chance: 0})
})

app.listen(port, "127.0.0.1")