
const request = require('request-promise-native');

async function runTest(serverUrl, targetId, nuevoJugador, expectedErrorCode) {

    const options = {
        method: 'PUT',
        uri: `${serverUrl}/jugadores/${targetId}`,
        body: nuevoJugador,
        json: true
    };

    try {
        const jugador = await request(options)
        console.log(jugador)

        if (!jugador) {
            console.log("put: mensaje vacío (sin partido)")
        } else if (!jugador.hasOwnProperty('id')) {
            console.log("put: el partido recibido no tiene id")
        } else if (jugador.id != targetId) {
            console.log("put: el partido recibido no es el reemplazado")
        } else if (!jugador.hasOwnProperty('nombre')) {
            console.log("put: el partido recibido no tiene nombre")
        } else if (!jugador.hasOwnProperty('mail')) {
            console.log("put: el partido recibido no tiene mail")
        } else {
            console.log("put: ok")
        }
    } catch (err) {
        if (err.statusCode == expectedErrorCode){
            console.log("put: ok (con error esperado)")
        } else {
            console.log("put: error inseperado")
            console.log(err)
        }
    }
}

async function testPutWithIdentifier(serverUrl) {

    const nuevoPartido =
        {
            id : 2,
            nombre: "Max2",
            mail : "maxszuchman@gmail.com",
        }
    await runTest(serverUrl, 2, nuevoPartido)
}

module.exports = testPutWithIdentifier