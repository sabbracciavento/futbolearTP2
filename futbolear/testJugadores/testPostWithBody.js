const request = require('request-promise-native');

async function testPostWithBody(serverUrl) {

    const testJugadores = [
        {
            id : 1,
            nombre: "Santiago",
            mail : "s.abbracciavento@gmail.com",
        },
        {
            id : 2,
            nombre: "Max",
            mail : "maxszuchman@gmail.com",
        }
    ]

    let testResult = true

    for (const jugador of testJugadores) {
        
        const options = {
            method: 'POST',
            uri: `${serverUrl}/jugadores`,
            body: jugador,
            json: true
        }

        try {
            console.log(options.body.jugador)
            const result = await request(options)

            if (!result) {
                console.log("post: mensaje vacío (sin jugador)")
            } else if (!result.hasOwnProperty('id')) {
                console.log("post: el partido recibido no tiene id")
            } else if (!result.hasOwnProperty('nombre')) {
                console.log("post: el partido recibido no tiene nombre")
            } else if (!result.hasOwnProperty('mail')) {
                console.log("post: el partido recibido no tiene mail")
            }
        } catch (err) {
            console.log(err.error)
            // if (err.statusCode == 400) {
            //     console.log("post: error - peticion mal formada")
            // } else if (err.statusCode == 500) {
            //     console.log("post: error - el servidor no pudo realizar lo pedido")
            // } else {
            //     console.log("post: error inesperado")
            // }
            testResult = false
        }
    }
    if (testResult) {
        console.log("post: ok")
    }
}

module.exports = testPostWithBody
