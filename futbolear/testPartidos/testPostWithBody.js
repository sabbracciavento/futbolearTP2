const request = require('request-promise-native')
const s = require('./separator') 

async function testPostWithBody(serverUrl) {

    const jugador = { nombre: "Santiago", mail: "s.abbracciavento@gmail.com" }

    const testPartidos = [
        {
            id : 1,
            admin: "Santiago",
            fecha : "19/06/2019",
            hora: "20:20",
            lugar : "Sarmiento",
            jugadores: ["Santiago"]
        },
    ]

    let testResult = true

    for (const partido of testPartidos) {

        const options = {
            method: 'POST',
            uri: `${serverUrl}/partidos`,
            body: { partido , jugador },
            json: true
        }

        try {
            const result = await request(options)

            if (!result) {
                console.log("post: mensaje vacío (sin partido)")
                s.separator()
            } else if (!result.hasOwnProperty('id')) {
                console.log("post: el partido recibido no tiene id")
            } else if (!result.hasOwnProperty('admin')) {
                console.log("post: el partido recibido no tiene admin")
            } else if (!result.hasOwnProperty('fecha')) {
                console.log("post: el partido recibido no tiene fecha")
            } else if (!result.hasOwnProperty('hora')) {
                console.log("post: el partido recibido no tiene hora")
            } else if (!result.hasOwnProperty('lugar')) {
                console.log("post: el partido recibido no tiene lugar")
            }
        } catch (err) {   
            if (err.statusCode == 400) {
                console.log("post: error - peticion mal formada")
                s.separator()
            } else if (err.statusCode == 500) {
                console.log("post: error - el servidor no pudo realizar lo pedido")
                s.separator()
            } else {
                console.log("post: error inesperado")
                console.log(err.error)
            }
            testResult = false
        }
    }
    if (testResult) {
        console.log("post: ok")
        s.separator()
    }
}

module.exports = testPostWithBody
