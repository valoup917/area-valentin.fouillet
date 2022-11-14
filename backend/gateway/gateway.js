import express from 'express'
import helmet from 'helmet'
import registry from './routes/registry.json' assert {type: "json"}
import routes from './routes/index.js'
import * as dotenv  from 'dotenv'
import cors from 'cors';
import fs from 'fs';

const app = express()
app.use(cors());
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(helmet())
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
dotenv.config()

app.get('/ui', (req, res) => {
    res.render('index', {services: registry.services })
})

app.get('/about.json', (req, res) => {
    var host_ip_adress = req.ip;
    var timestamp = new Date().getTime();
    var bufferData = fs.readFileSync("about.json")
    var stData = bufferData.toString()
    var data = JSON.parse(stData)
    host_ip_adress = host_ip_adress.toString().replace('::ffff:', '');

    var about = {
        client: {
            host: host_ip_adress
        },
        server: {
            current_time: timestamp,
            services: data
        }
    }

    res.send(about)
})

app.use('/', routes)

app.listen(process.env.PORT, () => {
    console.log("Gateway has started on port " + process.env.PORT);
})