const express = require ('express')
const dotenv = require ('dotenv')
const bodyParser = require ('body-parser')

const app = express()

dotenv.config()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var storage = ''

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.post('/storage/store', (req, res) => {
    const mail = req.body.mail
    storage = mail
    res.status(200).send("Ok")
})

app.get('/storage/getmail', (req, res) => {
    if (storage == "")
        res.status(400).send("empty storage")
    else
        res.status(200).send(storage)
})

app.listen(process.env.PORT, () =>
    console.log("Listening on port " + process.env.PORT)
)