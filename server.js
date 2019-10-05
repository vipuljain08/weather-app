const express = require('express')
const request = require('request')
const app = express()

// api key
const apiKey = "af10f9048aeaf0ce02095fc05cd591c8"

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')

// define PORT
const PORT = process.env.PORT || 5000

// get route
app.get('/', (req, res) => {
    res.render('index', {weather: null, error: null})
})

// post route
app.post('/', (req, res) => {
    let city = req.body.city
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    request(url, (err, response, body) => {
        if(err){
            res.render('index', {weather: null, error: 'Error, please try again' + err});
        }else {
            let weather = JSON.parse(body)
            if(weather.main == undefined){
              res.render('index', {weather: null, error: 'Error, please try again' + err});
            } else {
              let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
              res.render('index', {weather: weatherText, error: null});
            }
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server is listening on localhost:${PORT}`)
})