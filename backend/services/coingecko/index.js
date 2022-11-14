const express = require('express');
const CoinGecko = require('coingecko-api');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
const CoinGeckoClient = new CoinGecko();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
dotenv.config()

async function api_call(action) {
    let result;
    if (action == 'coins') {
        result = await CoinGeckoClient.coins.all();
    }
    return result.data;
}

function check_exist(coin, elements) {
    parse_index = -1;
    coinupper = coin.toUpperCase()

    for (i = 0; i < elements.length; i++) {
        nameupper = elements[i]['name'].toUpperCase();
        if (coinupper === nameupper) {
            parse_index = i;
            break;
        }
    }
    if (parse_index === -1)
        return "Not found";
    else
        return parse_index;
}

function parse_element(coin, to_find, elements) {
    parse_index = check_exist(coin, elements)
    if (parse_index === "Not found")
        return "Not found";
    temp = elements[parse_index];
    if (to_find === "price") {
        data = temp.market_data.current_price.usd;
    }
    if (to_find === "coinprice") {
        data = temp.market_data.current_price.usd;
    }
    if (to_find === "changeonehour") {
        data = temp.market_data.price_change_percentage_1h_in_currency.usd;
    }
    if (to_find === "changeoneday") {
        data = temp.market_data.price_change_percentage_24h;
    }
    if (to_find === "changeoneweek") {
        data = temp.market_data.price_change_percentage_7d;
    }
    return data;
}

app.get('/coingecko/ping', (req, res) => {
    res.statusCode = 200
    res.send("Ok")
})

// ! ACTION

// * given coin name routes

app.get('/coingecko/existingcoin', async(req, res) => {
    if (!req.body["coin"]) {
        res.statusCode = 400
        res.send("Bad info given, need coin")
    } else {
        coin = req.body["coin"];
        let result = await api_call("coins");
        ret = check_exist(coin, result)

        if (ret === "Not found") {
            res.statusCode = 404
            res.send(`This coin does not exist`)
        } else {
            res.statusCode = 200;
            res.send(`This coin does exist`);
        }
    }
})

app.get('/coingecko/checkcoinprice', async(req, res) => { //  1000 > x < 1000
    if (!req.body["coin"]) {
        res.statusCode = 400
        res.send("Bad info given, need coin")
    } else if (!req.body["price"]) {        res.statusCode = 400
        res.statusCode = 400
        res.send("Bad info given, need price")
    } else {
        coin = req.body["coin"];
        price = req.body["price"];
        let result = await api_call("coins")
        data = parse_element(coin, "coinprice", result);

        if (data === "Not found") {
            res.statusCode = 404;
            res.send("Not found");
        }
        if (price >= data - 1000 || price <= data + 1000) {
            res.statusCode = 200;
            res.send(`Price accurate`);
        } else {
            res.statusCode = 400;
            res.send(`Price not accurate`);
        }
    }
})

app.get('/coingecko/checkchangeonehourpercentage', async(req, res) => { //  0.1 >= x <= 0.1
    if (!req.body["coin"]) {
        res.statusCode = 400
        res.send("Bad info given, need coin")
    } else if (!req.body["percentage"]) {
        res.statusCode = 400
        res.send("Bad info given, need percentage")
    } else {
        coin = req.body["coin"];
        percentage = req.body["percentage"];
        let result = await api_call('coins')
        data = parse_element(coin, "changeonehour", result);

        if (data === "Not found") {
            res.statusCode = 404;
            res.send('Not found');
        }
        if (data - 0.1 >= data || data + 0.1 >= data) {
            res.statusCode = 200;
            res.send("Correct, current change is:" + data.toString());
        }
        res.statusCode = 400;
        res.send("Incorrect");
    }
})

app.get('/coingecko/checkchangeonedaypercentage', async(req, res) => { //  0.1 >= x <= 0.1
    if (!req.body["coin"]) {
        res.statusCode = 400
        res.send("Bad info given, need coin")
    } else if (!req.body["percentage"]) {
        res.statusCode = 400
        res.send("Bad info given, need percentage")
    } else {
        coin = req.body["coin"];
        percentage = req.body["percentage"];
        let result = await api_call('coins')
        data = parse_element(coin, "changeoneday", result);

        if (data === "Not found") {
            res.statusCode = 404;
            res.send('Not found');
        }
        if (data - 0.1 >= data || data + 0.1 >= data) {
            res.statusCode = 200;
            res.send("Correct, current change is:" + data.toString());
        }
        res.statusCode = 400;
        res.send("Incorrect");
    }
})

app.get('/coingecko/checkchangeweekpercentage', async(req, res) => { //  0.1 >= x <= 0.1
    if (!req.body["coin"]) {
        res.statusCode = 400
        res.send("Bad info given, need coin")
    } else if (!req.body["percentage"]) {
        res.statusCode = 400
        res.send("Bad info given, need percentage")
    } else {
        coin = req.body["coin"];
        percentage = req.body["percentage"];
        let result = await api_call('coins')
        data = parse_element(coin, "changeoneweek", result);

        if (data === "Not found") {
            res.statusCode = 404;
            res.send('Not found');
        }
        if (data - 0.1 >= data || data + 0.1 >= data) {
            res.statusCode = 200;
            res.send("Correct, current change is:" + data.toString());
        }
        res.statusCode = 400;
        res.send("Incorrect");
    }
})

// * BTC routes

app.get('/coingecko/btccheckcoinprice', async (req, res) => {
    if (!req.body["price"]) {
        res.statusCode = 400
        res.send("Bad info given, need price")
    } else {
        price = req.body["price"]
        let result = await api_call("coins")
        data = parse_element("bitcoin", "coinprice", result);
        if (price >= data - 1000 || price <= data + 1000) {
            res.statusCode = 200;
            res.send(`Price accurate`);
        } else {
            res.statusCode = 400;
            res.send(`Price not accurate`);
        }
    }
})

app.get('/coingecko/btccheckonehour', async (req, res) => {
    if (!req.body["percentage"]) {
        res.statusCode = 400
        res.send("Bad info given, need percentage")
    } else {
        percentage = req.body["percentage"]
        let result = await api_call("coins")
        data = parse_element("bitcoin", "changeonehour", result);
        if (percentage >= data - 0.1 || percentage <= data + 0.1) {
            res.statusCode = 200;
            res.send(`Current change accurate`);
        } else {
            res.statusCode = 400;
            res.send(`Current change not accurate`);
        }
    }
})

app.get('/coingecko/btccheckoneday', async (req, res) => {
    if (!req.body["percentage"]) {
        res.statusCode = 400
        res.send("Bad info given, need percentage")
    } else {
        percentage = req.body["percentage"]
        let result = await api_call("coins")
        data = parse_element("bitcoin", "changeoneday", result);
        if (percentage >= data - 0.1 || percentage <= data + 0.1) {
            res.statusCode = 200;
            res.send(`Current change accurate`);
        } else {
            res.statusCode = 400;
            res.send(`Current change not accurate`);
        }
    }
})

app.get('/coingecko/btccheckoneweek', async (req, res) => {
    if (!req.body["percentage"]) {
        res.statusCode = 400
        res.send("Bad info given, need percentage")
    } else {
        percentage = req.body["percentage"]
        let result = await api_call("coins")
        data = parse_element("bitcoin", "changeoneweek", result);
        if (percentage >= data - 0.1 || percentage <= data + 0.1) {
            res.statusCode = 200;
            res.send(`Current change accurate`);
        } else {
            res.statusCode = 400;
            res.send(`Current change not accurate`);
        }
    }
})

// * ETH routes

app.get('/coingecko/ethcheckcoinprice', async (req, res) => {
    if (!req.body["price"]) {
        res.statusCode = 400
        res.send("Bad info given, need price")
    } else {
        price = req.body["price"]
        let result = await api_call("coins")
        data = parse_element("bnb", "coinprice", result);
        if (price >= data - 1000 || price <= data + 1000) {
            res.statusCode = 200;
            res.send(`Price accurate`);
        } else {
            res.statusCode = 400;
            res.send(`Price not accurate`);
        }
    }
})

app.get('/coingecko/ethcheckonehour', async (req, res) => {
    if (!req.body["percentage"]) {
        res.statusCode = 400
        res.send("Bad info given, need percentage")
    } else {
        percentage = req.body["percentage"]
        let result = await api_call("coins")
        data = parse_element("bnb", "changeonehour", result);
        if (percentage >= data - 0.1 || percentage <= data + 0.1) {
            res.statusCode = 200;
            res.send(`Current change accurate`);
        } else {
            res.statusCode = 400;
            res.send(`Current change not accurate`);
        }
    }
})

app.get('/coingecko/ethcheckoneday', async (req, res) => {
    if (!req.body["percentage"]) {
        res.statusCode = 400
        res.send("Bad info given, need percentage")
    } else {
        percentage = req.body["percentage"]
        let result = await api_call("coins")
        data = parse_element("bnb", "changeoneday", result);
        if (percentage >= data - 0.1 || percentage <= data + 0.1) {
            res.statusCode = 200;
            res.send(`Current change accurate`);
        } else {
            res.statusCode = 400;
            res.send(`Current change not accurate`);
        }
    }
})

app.get('/coingecko/ethcheckoneweek', async (req, res) => {
    if (!req.body["percentage"]) {
        res.statusCode = 400
        res.send("Bad info given, need percentage")
    } else {
        percentage = req.body["percentage"]
        let result = await api_call("coins")
        data = parse_element("bnb", "changeoneweek", result);
        if (percentage >= data - 0.1 || percentage <= data + 0.1) {
            res.statusCode = 200;
            res.send(`Current change accurate`);
        } else {
            res.statusCode = 400;
            res.send(`Current change not accurate`);
        }
    }
})

// * BNB routes

app.get('/coingecko/bnbcheckcoinprice', async (req, res) => {
    if (!req.body["price"]) {
        res.statusCode = 400
        res.send("Bad info given, need price")
    } else {
        price = req.body["price"]
        let result = await api_call("coins")
        data = parse_element("bnb", "coinprice", result);
        if (price >= data - 1000 || price <= data + 1000) {
            res.statusCode = 200;
            res.send(`Price accurate`);
        } else {
            res.statusCode = 400;
            res.send(`Price not accurate`);
        }
    }
})

app.get('/coingecko/bnbcheckonehour', async (req, res) => {
    if (!req.body["percentage"]) {
        res.statusCode = 400
        res.send("Bad info given, need percentage")
    } else {
        percentage = req.body["percentage"]
        let result = await api_call("coins")
        data = parse_element("bnb", "changeonehour", result);
        if (percentage >= data - 0.1 || percentage <= data + 0.1) {
            res.statusCode = 200;
            res.send(`Current change accurate`);
        } else {
            res.statusCode = 400;
            res.send(`Current change not accurate`);
        }
    }
})

app.get('/coingecko/bnbcheckoneday', async (req, res) => {
    if (!req.body["percentage"]) {
        res.statusCode = 400
        res.send("Bad info given, need percentage")
    } else {
        percentage = req.body["percentage"]
        let result = await api_call("coins")
        data = parse_element("bnb", "changeoneday", result);
        if (percentage >= data - 0.1 || percentage <= data + 0.1) {
            res.statusCode = 200;
            res.send(`Current change accurate`);
        } else {
            res.statusCode = 400;
            res.send(`Current change not accurate`);
        }
    }
})

app.get('/coingecko/bnbcheckoneweek', async (req, res) => {
    if (!req.body["percentage"]) {
        res.statusCode = 400
        res.send("Bad info given, need percentage")
    } else {
        percentage = req.body["percentage"]
        let result = await api_call("coins")
        data = parse_element("bnb", "changeoneweek", result);
        if (percentage >= data - 0.1 || percentage <= data + 0.1) {
            res.statusCode = 200;
            res.send(`Current change accurate`);
        } else {
            res.statusCode = 400;
            res.send(`Current change not accurate`);
        }
    }
})

// * BINANCE USD routes

app.get('/coingecko/binanceusdcheckcoinprice', async (req, res) => {
    if (!req.body["price"]) {
        res.statusCode = 400
        res.send("Bad info given, need price")
    } else {
        price = req.body["price"]
        let result = await api_call("coins")
        data = parse_element("binance usd", "coinprice", result);
        if (price >= data - 1000 || price <= data + 1000) {
            res.statusCode = 200;
            res.send(`Price accurate`);
        } else {
            res.statusCode = 400;
            res.send(`Price not accurate`);
        }
    }
})

app.get('/coingecko/binanceusdcheckonehour', async (req, res) => {
    if (!req.body["percentage"]) {
        res.statusCode = 400
        res.send("Bad info given, need percentage")
    } else {
        percentage = req.body["percentage"]
        let result = await api_call("coins")
        data = parse_element("binance usd", "changeonehour", result);
        if (percentage >= data - 0.1 || percentage <= data + 0.1) {
            res.statusCode = 200;
            res.send(`Current change accurate`);
        } else {
            res.statusCode = 400;
            res.send(`Current change not accurate`);
        }
    }
})

app.get('/coingecko/binanceusdcheckoneday', async (req, res) => {
    if (!req.body["percentage"]) {
        res.statusCode = 400
        res.send("Bad info given, need percentage")
    } else {
        percentage = req.body["percentage"]
        let result = await api_call("coins")
        data = parse_element("binance usd", "changeoneday", result);
        if (percentage >= data - 0.1 || percentage <= data + 0.1) {
            res.statusCode = 200;
            res.send(`Current change accurate`);
        } else {
            res.statusCode = 400;
            res.send(`Current change not accurate`);
        }
    }
})

app.get('/coingecko/binanceusdcheckoneweek', async (req, res) => {
    if (!req.body["percentage"]) {
        res.statusCode = 400
        res.send("Bad info given, need percentage")
    } else {
        percentage = req.body["percentage"]
        let result = await api_call("coins")
        data = parse_element("binance usd", "changeoneweek", result);
        if (percentage >= data - 0.1 || percentage <= data + 0.1) {
            res.statusCode = 200;
            res.send(`Current change accurate`);
        } else {
            res.statusCode = 400;
            res.send(`Current change not accurate`);
        }
    }
})

// * SOLANA routes

app.get('/coingecko/solanacheckcoinprice', async (req, res) => {
    if (!req.body["price"]) {
        res.statusCode = 400
        res.send("Bad info given, need price")
    } else {
        price = req.body["price"]
        let result = await api_call("coins")
        data = parse_element("solana", "coinprice", result);
        if (price >= data - 1000 || price <= data + 1000) {
            res.statusCode = 200;
            res.send(`Price accurate`);
        } else {
            res.statusCode = 400;
            res.send(`Price not accurate`);
        }
    }
})

app.get('/coingecko/solanacheckonehour', async (req, res) => {
    if (!req.body["percentage"]) {
        res.statusCode = 400
        res.send("Bad info given, need percentage")
    } else {
        percentage = req.body["percentage"]
        let result = await api_call("coins")
        data = parse_element("solana", "changeonehour", result);
        if (percentage >= data - 0.1 || percentage <= data + 0.1) {
            res.statusCode = 200;
            res.send(`Current change accurate`);
        } else {
            res.statusCode = 400;
            res.send(`Current change not accurate`);
        }
    }
})

app.get('/coingecko/solanacheckoneday', async (req, res) => {
    if (!req.body["percentage"]) {
        res.statusCode = 400
        res.send("Bad info given, need percentage")
    } else {
        percentage = req.body["percentage"]
        let result = await api_call("coins")
        data = parse_element("solana", "changeoneday", result);
        if (percentage >= data - 0.1 || percentage <= data + 0.1) {
            res.statusCode = 200;
            res.send(`Current change accurate`);
        } else {
            res.statusCode = 400;
            res.send(`Current change not accurate`);
        }
    }
})

app.get('/coingecko/solanacheckoneweek', async (req, res) => {
    if (!req.body["percentage"]) {
        res.statusCode = 400
        res.send("Bad info given, need percentage")
    } else {
        percentage = req.body["percentage"]
        let result = await api_call("coins")
        data = parse_element("solana", "changeoneweek", result);
        if (percentage >= data - 0.1 || percentage <= data + 0.1) {
            res.statusCode = 200;
            res.send(`Current change accurate`);
        } else {
            res.statusCode = 400;
            res.send(`Current change not accurate`);
        }
    }
})

// ! REACTION (NOT AVAILABLE)

app.get('/coingecko/coinprice', async(req, res) => {
    coin = req.body["coin"];
    let result = await api_call("coins");
    data = parse_element(coin, "price", result)

    if (data === "Not found") {
        res.statusCode = 404;
        res.send("Not found");
    }
    res.statusCode = 200;
    res.send(data.toString());
})

app.get('/coingecko/changeonehour', async(req, res) => {
    coin = req.body["coin"];
    let result = await api_call('coins')
    data = parse_element(coin, "changeonehour", result);

    if (data === "Not found") {
        res.statusCode = 404;
        res.send('Not found');
    }
    res.statusCode = 200;
    res.send(`Your coin change is: ${data}`);
})

app.get('/coingecko/changeoneday', async(req, res) => {
    coin = req.body["coin"];
    let result = await api_call('coins')
    data = parse_element(coin, "changeoneday", result);

    if (data === "Not found") {
        res.statusCode = 404;
        res.send('Not found');
    }
    res.statusCode = 200;
    res.send(`Your coin change is: ${data}`);
})

app.get('/coingecko/changeoneweek', async(req, res) => {
    coin = req.body["coin"];
    let result = await api_call('coins')
    data = parse_element(coin, "changeoneweek", result);

    if (data === "Not found") {
        res.statusCode = 404;
        res.send('Not found');
    }
    res.statusCode = 200;
    res.send(`Your coin change is: ${data}`);
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT: ${process.env.PORT}`);
});