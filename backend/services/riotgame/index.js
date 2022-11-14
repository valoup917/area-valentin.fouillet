const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');

const champions = {
    "AATROX":266,
    "AHRI":103,
    "AKALI":84,
    "AKSHAN":166,
    "ALISTAR":12,
    "AMUMU":32,
    "ANIVIA":34,
    "ANNIE":1,
    "APHELIOS":523,
    "ASHE":22,
    "AURELION Sol":136,
    "AZIR":268,
    "BARD":432,
    "BEL Veth":200,
    "BLITZCRANK":53,
    "BRAND":63,
    "BRAUM":201,
    "CAITLYN":51,
    "CAMILLE":164,
    "CASSIOPEIA":69,
    "CHO Gath":31,
    "CORKI":42,
    "DARIUS":122,
    "DIANA":131,
    "DRAVEN":119,
    "DR.Mundo":36,
    "EKKO":245,
    "ELISE":60,
    "EVELYNN":28,
    "EZREAL":81,
    "FIDDLESTICKS":9,
    "FIORA":114,
    "FIZZ":105,
    "GALIO":3,
    "GANGPLANK":41,
    "GAREN":86,
    "GNAR":150,
    "GRAGAS":79,
    "GRAVES":104,
    "GWEN":887,
    "HECARIM":120,
    "HEIMERDINGER":74,
    "ILLAOI":420,
    "IRELIA":39,
    "IVERN":427,
    "JANNA":40,
    "JARVAN IV":59,
    "JAX":24,
    "JAYCE":126,
    "JHIN":202,
    "JINX":222,
    "KAI Sa":145,
    "KALISTA":429,
    "KARMA":43,
    "KARTHUS":30,
    "KASSADIN":38,
    "KATARINA":55,
    "KAYLE":10,
    "KAYN":141,
    "KENNEN":85,
    "KHA Zix":121,
    "KINDRED":203,
    "KLED":240,
    "KOG MAW":96,
    "K SANTE":897,
    "LEBLANC":7,
    "LEESIN":64,
    "LEONA":89,
    "LILLIA":876,
    "LISSANDRA":127,
    "LUCIAN":236,
    "LULU":117,
    "LUX":99,
    "MALPHITE":54,
    "MALZAHAR":90,
    "MAOKAI":57,
    "MASTER Yi":11,
    "MISS FORTUNE":21,
    "WUKONG":62,
    "MORDEKAISER":82,
    "MORGANA":25,
    "NAMI":267,
    "NASUS":75,
    "NAUTILUS":111,
    "NEEKO":518,
    "NIDALEE":76,
    "NILAH":895,
    "NOCTURNE":56,
    "NUNU & WILLUMP":20,
    "OLAF":2,
    "ORIANNA":61,
    "ORNN":516,
    "PANTHEON":80,
    "POPPY":78,
    "PYKE":555,
    "QIYANA":246,
    "QUINN":133,
    "RAKAN":497,
    "RAMMUS":33,
    "REK Sai":421,
    "RELL":526,
    "RENATA GLASC":888,
    "RENEKTON":58,
    "RENGAR":107,
    "RIVEN":92,
    "RUMBLE":68,
    "RYZE":13,
    "SAMIRA":360,
    "SEJUANI":113,
    "SENNA":235,
    "SERAPHINE":147,
    "SETT":875,
    "SHACO":35,
    "SHEN":98,
    "SHYVANA":102,
    "SINGED":27,
    "SION":14,
    "SIVIR":15,
    "SKARNER":72,
    "SONA":37,
    "SORAKA":16,
    "SWAIN":50,
    "SYLAS":517,
    "SYNDRA":134,
    "TAHM KENCH":223,
    "TALIYAH":163,
    "TALON":91,
    "TARIC":44,
    "TEEMO":17,
    "THRESH":412,
    "TRISTANA":18,
    "TRUNDLE":48,
    "TRYNDAMERE":23,
    "TWISTED FATE":4,
    "TWITCH":29,
    "UDYR":77,
    "URGOT":6,
    "VARUS":110,
    "VAYNE":67,
    "VEIGAR":45,
    "VEL KOZ":161,
    "VEX":711,
    "VI":254,
    "VIEGO":234,
    "VIKTOR":112,
    "VLADIMIR":8,
    "VOLIBEAR":106,
    "WARWICK":19,
    "XAYAH":498,
    "XERATH":101,
    "XIN Zhao":5,
    "YASUO":157,
    "YONE":777,
    "YORICK":83,
    "YUUMI":350,
    "ZAC":154,
    "ZED":238,
    "ZERI":221,
    "ZIGGS":115,
    "ZILEAN":26,
    "ZOE":142,
    "ZYRA":143
}

const app = express()

dotenv.config()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const api_key=process.env['API_KEY']

app.get('/riotgame/ping', (req, res) => {
    res.statusCode=200
    res.send('Ok')
})

app.get('/riotgame/maintenance', (req, res) => {
    console.log(api_key)
    axios.get('https://europe.api.riotgames.com/lor/status/v1/platform-data',
        {
            headers: {
                "X-Riot-Token" : api_key,
            }
        }
    ).then(function (response) {
        if (Object.keys(response.data.maintenances).length > 0) {
            res.statusCode = 200
            res.send("Update")
        } else {
            res.statusCode = 400
            res.send("No update")
        }
    }).catch(() => res.sendStatus(503).send("Service Unavailable"))
})

app.get('/riotgame/ischampioninrotation', async (req, res) => {
    if (!req.body.champion_name) {
        res.statusCode = 400
        res.send("Bad info given, need champion name")
        return
    }
    const upchampion_name = req.body.champion_name.toUpperCase();
    if(champions.hasOwnProperty(upchampion_name) == false) {
        res.statusCode = 404
        res.send("Champion not found")
        return
    }
    var done = false
    const resp = await axios.get('https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations', {
            headers: {
                "X-Riot-Token" : api_key,
            }
        }
    ).then(function (response) {
        temp = response.data.freeChampionIds
        for(i = 0; i < temp.length; i++) {
            if (temp[i] === champions[upchampion_name]){
                done = true
                res.statusCode = 200
                res.send("Champion in rotation")
            }
        }
    }).catch(function () {
        res.statusCode = 503
        res.send("Service not available")
    })
    if (done == false) {
        res.statusCode = 400
        res.send("Champion not in rotation")
    }
})

app.listen(process.env['PORT'], () => {
    console.log(`Server listen on port ${process.env['PORT']}`)
})