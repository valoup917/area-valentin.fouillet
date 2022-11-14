import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

const app = express();
dotenv.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/ipfs/ping', (req, res) => {
    res.status(200).send("pong");
});

app.get('/ipfs/bootstraprmall', (req, res) => {
    axios.post(
        'http://ipfs-image:5001/api/v0/bootstrap/rm/all', {
        })
        .then(response => {
            res.status(200).send(response)
        })
        .catch(error => {
            res.status(400).send(error)
        })
})

app.post('/ipfs/filesmkdir', (req, res) => {
    if (!req.body.data) {
        res.statusCode = 400
        res.send("Bad info given, need arg")
        return
    }
    axios({
        method: 'POST',
        url: 'http://ipfs-image:5001/api/v0/files/mkdir',
        params: {
            arg: req.body.data,
        }
    })
    .then(response => {
        //console.log(response.data);
        res.status(200).send(response.data)
    })
    .catch(error => {
        res.status(400).send(error)
    })
})

app.post('/ipfs/pinadd', (req, res) => {
    if (!req.body.data) {
        res.statusCode = 400
        res.send("Bad info given, need arg")
        return
    }
    axios({
        method: 'POST',
        url: 'http://ipfs-image:5001/api/v0/pin/add',
        params: {
            arg : req.body.data,
        }
    })
    .then(response => {
        res.status(200).send("ok")
    })
    .catch(error => {
        //console.log(error)
        res.status(400).send("wrong")
    })
})

app.get('/ipfs/bootstraplist', (req, res) => {
    axios({
        method: 'POST',
        url: 'http://ipfs-image:5001/api/v0/bootstrap/list'
    })
    .then(response => {
        var data = response.data["Peers"]
        if (data.length > 6) {
            res.status(200).send("ok")
        } else {
            res.sendStatus(400)
            console.log(data.length)
        }
    })
    .catch(error => {
        res.send(error)
    })
})

app.post('/ipfs/bootstrapadd', (req, res) => {
    if (!req.body.data) {
        res.statusCode = 400
        res.send("Bad info given, need arg")
        return
    }
    axios({
        method: 'POST',
        url: 'http://ipfs-image:5001/api/v0/bootstrap/add',
        params: {
            arg: req.body.data,
        }
    })
    .then(response => {
        res.status(200).send(response.data)
    })
    .catch(error => {
        res.status(404).send(error)
    })
})

app.get('/ipfs/bootstrapadddefault', (req, res) => {
    axios({
        method: 'POST',
        url: 'http://ipfs-image:5001/api/v0/bootstrap/add/default',
    })
    .then(response => {
        res.status(200).send(response.data)
    })
    .catch(error => {
        res.status(400).send(error)
    })
})

app.post('/ipfs/pinrm', (req, res) => {
    if (!req.body.data) {
        res.statusCode = 400
        res.send("Bad info given, need arg")
        return
    }
    axios({
        method: 'POST',
        url: 'http://ipfs-image:5001/api/v0/pin/rm',
        params: {
            arg: req.body.data,
        }
    })
    .then(response => {
        res.status(200).send(response.data)
    })
    .catch(error => {
        res.status(400).send(error)
    })
})

app.post('/ipfs/get', (req, res) => {
    if (!req.body.data) {
        res.statusCode = 400
        res.send("Bad info given, need arg")
        return
    }
    axios({
        method: 'POST',
        url: 'http://ipfs-image:5001/api/v0/get',
        params: {
            arg: req.body.data,
        },
        timeout: 30000,
    })
    .then(response => {
        res.status(200).send(response)
    })
    .catch(error => {
        res.status(400).send(error)
    })
})

app.post('/ipfs/swarmconnect', (req, res) => {
    if (!req.body.data) {
        res.statusCode = 400
        res.send("Bad info given, need arg")
        return
    }
    axios({
        method: 'POST',
        url: "http://ipfs-image:5001/api/v0/swarm/connect",
        params: {
            arg: req.body.data,
        }
    })
    .then(response => {
        res.status(200).send(response.data)
    })
    .catch(error => {
        res.status(400).send(error)
    })
})

app.post('/ipfs/swarmdisconnect', (req, res) => {
    if (!req.body.data) {
        res.statusCode = 400
        res.send("Bad info given, need arg")
        return
    }
    axios({
        method: 'POST',
        url: "http://ipfs-image:5001/api/v0/swarm/disconnect",
        params: {
            arg: req.body.data,
        }
    })
    .then(response => {
        res.status(200).send(response.data)
    })
    .catch(error => {
        res.status(400).send(error)
    })
})

app.get('/ipfs/shutdown', (req, res) => {
    axios({
        method: 'POST',
        url: "http://ipfs-image:5001/api/v0/shutdown",
    })
    .then(response => {
        res.status(200).send(response.data)
    })
    .catch(error => {
        res.status(400).send(error)
    })
})

app.listen(process.env.PORT, () =>
    console.log('listening on port ' + process.env.PORT)
)
