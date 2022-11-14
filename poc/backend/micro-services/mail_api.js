const axios = require('axios')

const API_KEY = '593b44fefc86256a6cda571d4c5e93fe354f2989ca5532a4e65873a2715fa61f'


function mail() {
    axios.post(`https://api.mailslurp.com/createInbox?apiKey=${API_KEY}`, {
            senderId: "9435736e-f176-4305-8979-795f4e8d2268 ",
            to: "9435736e-f176-4305-8979-795f4e8d2268@mailslurp.com",
            body: "Test from inbox 1",
        })
        .then(responce => {
            console.log(responce)
        })
        .catch(error => console.log("Error", error));
}

module.exports = mail;