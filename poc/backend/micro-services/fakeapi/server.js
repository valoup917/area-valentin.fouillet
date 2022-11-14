import express from 'express'
import axios from 'axios'
const HOST = "localhost"
const PORT = 3003

const app = express()
app.use(express.json())
app.get('/fakeapi', (req, res, next) => {
    res.send("Hello from fake api server")
})

app.get('/bogusapi', (req, res, next) => {
    res.send("Bogus api says hello")
})

app.listen(PORT, () => {
    const authString = 'valoup:password'
    const encodedAuthString = Buffer.from(authString, 'utf-8').toString('base64')
    console.log(encodedAuthString)
    axios({
        method: 'POST',
        url: 'http://localhost:3000/register',
        headers: {
            'authorization': encodedAuthString,
            'Content-Type': 'application/json'
        },
        data: {
            apiName: "registrytest",
            protocol: "http",
            host: HOST,
            port: PORT,
        },
    }).then((response) => {
        console.log(response.data)
    })
    console.log("Fake server started on port " + PORT)
})