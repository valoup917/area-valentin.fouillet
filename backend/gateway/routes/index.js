import express, { query } from 'express'
import axios from 'axios'
import registry from './registry.json' assert {type: "json"}
import fs from 'fs'
import loadbalancer from '../util/loadbalancer.js'

const router = express.Router()

router.get("/ping", (req, res) => {
    res.send("Ok")
})

router.post('/enable/:apiName', (req, res) => {
    const apiName = req.params.apiName
    const requestBody = req.body
    const instances = registry.services[apiName].instances
    const index = instances.findIndex((srv) => {
        return srv.url === requestBody.url
    })

    if (index == -1) {
        res.send({
            status: 'error',
            message: "Could not find '" + requestBody.url + "' for service '" + apiName + "'"
        })
    } else {
        instances[index].enabled = requestBody.enabled
        fs.writeFile("./routes/registry.json", JSON.stringify(registry), (error) => {
            if (error) {
                res.send("Could not enable/disable '" + requestBody.url + "' for service '" + apiName + ":'\n" + error)
            } else {
                res.send("Successfully enabled/disabled '" + requestBody.url + "' for service '" + apiName + ":'\n")
            }
        })
    }
})

router.all('/:apiName/*', (req, res) => {
    const path = req.params[0]
    const service = registry.services[req.params.apiName]
    if (service) {
        if (!service.loadBalancerStrategy) {
            service.loadBalancerStrategy = 'ROUND_ROBIN'
            fs.writeFile("./routes/registry.json", JSON.stringify(registry), (error) => {
                if (error) {
                    res.send("Couldn't write load balance stategy")
                }
            })
        }
        const newIndex = loadbalancer[service.loadBalancerStrategy] (service)
        console.log("newIndew = " + newIndex)
        const url = service.instances[newIndex].url
        console.log("url = " + url)
        console.log(req.query)
        axios({
            method: req.method,
            url: service.instances[newIndex].url + req.params.apiName + '/' + path,
            headers: req.headers,
            data: req.body,
            params: req.query
        }).then((response) => {
            console.log("ping to " + service.instances[newIndex].url + req.params.apiName + '/' + path)
            res.status(response.status).send(response.data)
        }).catch(error => {
            console.log("try to reach: " + service.instances[newIndex].url + req.params.apiName + '/' + path)
            console.log("ERROR :")
            if (error.response && error.response.data) {
                console.log("error.response.status = " + error.response.status)
                console.log("error.response.data = " + error.response.data)
                console.log(error.response.data)
                res.status(error.response.status).send(error.response.data)
            } else if (error.response) {
                var status_code = error.response.status
                try {
                    res.status(status_code).send(error)
                } catch (error) {
                    res.status(status_code).send(error)
                    console.log(error)
                }
            } else {
                try {
                    var status_code = error.response.status
                } catch (error) {
                    var status_code = 400
                }
                console.log(error)
                res.status(status_code).send(error)
            }
        })
    } else {
        res.send("API Name doesn't exist")
    }
})


router.post("/register", (req, res) => {
    const registrationInfo = req.body
    registrationInfo.url = registrationInfo.protocol + "://" + registrationInfo.host + ":" +registrationInfo.port + "/"

    if (apiAlreadyExists(registrationInfo)) {
        res.send("Configuration already exists for '" + registrationInfo.apiName +
        "' at '" + registrationInfo.url + "'")
    } else {
        registry.services[registrationInfo.apiName].instances.push({ ...registrationInfo })
        fs.writeFile("./routes/registry.json", JSON.stringify(registry), (error) => {
            if (error) {
                res.send("Could not register " + registrationInfo.apiName + "\n" + error)
            } else {
                res.send("Successfully registered '" +  registrationInfo.apiName + "'")
            }
        })
    }
})

router.post("/unregister", (req, res) => {
    const registrationInfo = req.body

    if (apiAlreadyExists(registrationInfo)) {
        const index = registry.services[registrationInfo.apiName].instances.findIndex((instance) => {
            return registrationInfo.url === instance.url
        })
        registry.services[registrationInfo.apiName].instances.splice(index, 1)
        fs.writeFile("./routes/registry.json", JSON.stringify(registry), (error) => {
            if (error) {
                res.send("Could not unregister " + registrationInfo.apiName + "\n" + error)
            } else {
                res.send("Successfully unregistered '" +  registrationInfo.apiName + "'")
            }
        })
    } else {
        res.send("Configuration does not exists for '" + registrationInfo.apiName +
        "' at '" + registrationInfo.url + "'")
    }
})

const apiAlreadyExists = (registrationInfo) => {
    let exist = false
    registry.services[registrationInfo.apiName].instances.forEach(instance => {
        if (instance.url == registrationInfo.url) {
            exist = true
            return
        }
    });
    return exist
}

export default router