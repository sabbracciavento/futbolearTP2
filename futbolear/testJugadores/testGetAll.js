const request = require('request-promise-native');

async function testGetAll(serverUrl) {

    const options = {
        uri: `${serverUrl}/jugadores`,
        json: true
    }

    try {
        const jugadores = await request(options)

        let testOK = true
        for (let i = 0; i < jugadores.length && testOK; i++) {
            if (!jugadores[i].hasOwnProperty('id')) {
                console.log("get all: el partido recibido no tiene id")
                testOK = false
            } else if (!jugadores[i].hasOwnProperty('nombre')) {
                console.log("get all: el partido recibido no tiene admin")
                testOK = false
            } else if (!jugadores[i].hasOwnProperty('mail')) {
                console.log("get all: el partido recibido no tiene fecha")
                testOK = false
            } 
        }
        if (testOK) {
            console.log("get all: ok")
            console.log(jugadores)
            console.log("==================================")
        }
    } catch (err) {
        console.log("get all: error en la respuesta del servidor")
    }
}

module.exports = testGetAll