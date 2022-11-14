import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

const app = express();
dotenv.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/salat/ping', (req, res) => {
    res.status(200).send("Ok");
});

app.get('/salat/asr', async (req, res) => {
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes()+5
    const time = hours+':'+minutes+' (CET)'

    axios({
        method: 'GET',
        url: 'http://api.aladhan.com/v1/calendarByCity',
        params: {
            city: "Paris",
            country: "France",
            method: "1",
            month: "11",
            year: "2022"
        },
    }).then(function (response){
        const temp = response.data.data[0].timings
        const pos1 = temp.Asr.indexOf(":") + 1
        const pos2 = temp.Asr.indexOf(" ")
        const tmp = temp.Asr.substring(pos1, pos2)
        if (parseInt(tmp) - 5 > minutes || parseInt(tmp) < minutes) {
            res.statusCode = 200
            res.send("Ok")
        } else {
            res.statusCode = 400
            res.send("Not time")
        }
    })
})

app.get('/salat/dhuhr', async (req, res) => {
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes()+5
    const time = hours+':'+minutes+' (CET)'

    axios({
        method: 'GET',
        url: 'http://api.aladhan.com/v1/calendarByCity',
        params: {
            city: "Paris",
            country: "France",
            method: "1",
            month: "11",
            year: "2022"
        },
    }).then(function (response){
        const temp = response.data.data[0].timings
        const pos1 = temp.Dhuhr.indexOf(":") + 1
        const pos2 = temp.Dhuhr.indexOf(" ")
        const tmp = temp.Dhuhr.substring(pos1, pos2)
        if (parseInt(tmp) - 5 > minutes || parseInt(tmp) < minutes) {
            res.statusCode = 200
            res.send("Ok")
        } else {
            res.statusCode = 400
            res.send("Not time")
        }
    })
})

app.get('/salat/fajr', async (req, res) => {
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes()+5
    const time = hours+':'+minutes+' (CET)'

    axios({
        method: 'GET',
        url: 'http://api.aladhan.com/v1/calendarByCity',
        params: {
            city: "Paris",
            country: "France",
            method: "1",
            month: "11",
            year: "2022"
        },
    }).then(function (response){
        const temp = response.data.data[0].timings
        const pos1 = temp.Fajr.indexOf(":") + 1
        const pos2 = temp.Fajr.indexOf(" ")
        const tmp = temp.Fajr.substring(pos1, pos2)
        if (parseInt(tmp) - 5 > minutes || parseInt(tmp) < minutes) {
            res.statusCode = 200
            res.send("Ok")
        } else {
            res.statusCode = 400
            res.send("Not time")
        }
    })
});

app.get('/salat/firstthird', async (req, res) => {
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes()+5
    const time = hours+':'+minutes+' (CET)'

    axios({
        method: 'GET',
        url: 'http://api.aladhan.com/v1/calendarByCity',
        params: {
            city: "Paris",
            country: "France",
            method: "1",
            month: "11",
            year: "2022"
        },
    }).then(function (response){
        const temp = response.data.data[0].timings
        const pos1 = temp.Firstthird.indexOf(":") + 1
        const pos2 = temp.Firstthird.indexOf(" ")
        const tmp = temp.Firstthird.substring(pos1, pos2)
        if (parseInt(tmp) - 5 > minutes || parseInt(tmp) < minutes) {
            res.statusCode = 200
            res.send("Ok")
        } else {
            res.statusCode = 400
            res.send("Not time")
        }
    })
})

app.get('/salat/imsak', async (req, res) => {
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes()+5
    const time = hours+':'+minutes+' (CET)'

    axios({
        method: 'GET',
        url: 'http://api.aladhan.com/v1/calendarByCity',
        params: {
            city: "Paris",
            country: "France",
            method: "1",
            month: "11",
            year: "2022"
        },
    }).then(function (response){
        const temp = response.data.data[0].timings
        const pos1 = temp.Imsak.indexOf(":") + 1
        const pos2 = temp.Imsak.indexOf(" ")
        const tmp = temp.Imsak.substring(pos1, pos2)
        if (parseInt(tmp) - 5 > minutes || parseInt(tmp) < minutes) {
            res.statusCode = 200
            res.send("Ok")
        } else {
            res.statusCode = 400
            res.send("Not time")
        }
    })
})

app.get('/salat/isha', async (req, res) => {
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes()+5
    const time = hours+':'+minutes+' (CET)'

    axios({
        method: 'GET',
        url: 'http://api.aladhan.com/v1/calendarByCity',
        params: {
            city: "Paris",
            country: "France",
            method: "1",
            month: "11",
            year: "2022"
        },
    }).then(function (response){
        const temp = response.data.data[0].timings
        const pos1 = temp.Isha.indexOf(":") + 1
        const pos2 = temp.Isha.indexOf(" ")
        const tmp = temp.Isha.substring(pos1, pos2)
        if (parseInt(tmp) - 5 > minutes || parseInt(tmp) < minutes) {
            res.statusCode = 200
            res.send("Ok")
        } else {
            res.statusCode = 400
            res.send("Not time")
        }
    })
})

app.get('/salat/lastthird', async (req, res) => {
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes()+5
    const time = hours+':'+minutes+' (CET)'

    axios({
        method: 'GET',
        url: 'http://api.aladhan.com/v1/calendarByCity',
        params: {
            city: "Paris",
            country: "France",
            method: "1",
            month: "11",
            year: "2022"
        },
    }).then(function (response){
        const temp = response.data.data[0].timings
        const pos1 = temp.Lastthird.indexOf(":") + 1
        const pos2 = temp.Lastthird.indexOf(" ")
        const tmp = temp.Lastthird.substring(pos1, pos2)
        if (parseInt(tmp) - 5 > minutes || parseInt(tmp) < minutes) {
            res.statusCode = 200
            res.send("Ok")
        } else {
            res.statusCode = 400
            res.send("Not time")
        }
    })
})

app.get('/salat/maghrib', async (req, res) => {
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes()+5
    const time = hours+':'+minutes+' (CET)'

    axios({
        method: 'GET',
        url: 'http://api.aladhan.com/v1/calendarByCity',
        params: {
            city: "Paris",
            country: "France",
            method: "1",
            month: "11",
            year: "2022"
        },
    }).then(function (response){
        const temp = response.data.data[0].timings
        const pos1 = temp.Maghrib.indexOf(":") + 1
        const pos2 = temp.Maghrib.indexOf(" ")
        const tmp = temp.Maghrib.substring(pos1, pos2)
        if (parseInt(tmp) - 5 > minutes || parseInt(tmp) < minutes) {
            res.statusCode = 200
            res.send("Ok")
        } else {
            res.statusCode = 400
            res.send("Not time")
        }
    })
})

app.get('/salat/midnight', async (req, res) => {
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes()+5
    const time = hours+':'+minutes+' (CET)'

    axios({
        method: 'GET',
        url: 'http://api.aladhan.com/v1/calendarByCity',
        params: {
            city: "Paris",
            country: "France",
            method: "1",
            month: "11",
            year: "2022"
        },
    }).then(function (response){
        const temp = response.data.data[0].timings
        const pos1 = temp.Midnight.indexOf(":") + 1
        const pos2 = temp.Midnight.indexOf(" ")
        const tmp = temp.Midnight.substring(pos1, pos2)
        if (parseInt(tmp) - 5 > minutes || parseInt(tmp) < minutes) {
            res.statusCode = 200
            res.send("Ok")
        } else {
            res.statusCode = 400
            res.send("Not time")
        }
    })
})

app.get('/salat/sunrise', async (req, res) => {
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes()+5
    const time = hours+':'+minutes+' (CET)'

    axios({
        method: 'GET',
        url: 'http://api.aladhan.com/v1/calendarByCity',
        params: {
            city: "Paris",
            country: "France",
            method: "1",
            month: "11",
            year: "2022"
        },
    }).then(function (response){
        const temp = response.data.data[0].timings
        const pos1 = temp.Sunrise.indexOf(":") + 1
        const pos2 = temp.Sunrise.indexOf(" ")
        const tmp = temp.Sunrise.substring(pos1, pos2)
        if (parseInt(tmp) - 5 > minutes || parseInt(tmp) < minutes) {
            res.statusCode = 200
            res.send("Ok")
        } else {
            res.statusCode = 400
            res.send("Not time")
        }
    })
})

app.get('/salat/sunset', async (req, res) => {
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes()+5
    const time = hours+':'+minutes+' (CET)'

    axios({
        method: 'GET',
        url: 'http://api.aladhan.com/v1/calendarByCity',
        params: {
            city: "Paris",
            country: "France",
            method: "1",
            month: "11",
            year: "2022"
        },
    }).then(function (response){
        const temp = response.data.data[0].timings
        const pos1 = temp.Sunset.indexOf(":") + 1
        const pos2 = temp.Sunset.indexOf(" ")
        const tmp = temp.Sunset.substring(pos1, pos2)
        if (parseInt(tmp) - 5 > minutes || parseInt(tmp) < minutes) {
            res.statusCode = 200
            res.send("Ok")
        } else {
            res.statusCode = 400
            res.send("Not time")
        }
    })
})

app.listen(process.env.PORT, () =>
    console.log('listening on port ' + process.env.PORT)
)
