const request = require('request-promise-native')
const s = require('./separator') 

async function runTest(serverUrl, targetId, nuevo, expectedErrorCode) {

    const agregarJugadores = false

    const options = {
        method: 'PUT',
        uri: `${serverUrl}/partidos/${targetId}`,
        body: { nuevo, agregarJugadores },
        json: true
    };

    try {
        const partido = await request(options)
        console.log('$(partido)asd')

        if (!partido) {
            console.log("put: mensaje vacío (sin partido)")
            s.separator()
        // } else if (!partido.hasOwnProperty('id')) {
        //     console.log("put: el partido recibido no tiene id")
        // } else if (partido.id != targetId) {
        //     console.log("put: el partido recibido no es el reemplazado")
        // } else if (!partido.hasOwnProperty('admin')) {
        //     console.log("put: el partido recibido no tiene admin")
        // } else if (!partido.hasOwnProperty('fecha')) {
        //     console.log("put: el partido recibido no tiene apellido")
        // } else if (!partido.hasOwnProperty('hora')) {
        //     console.log("put: el partido recibido no tiene edad")
        // } else if (!partido.hasOwnProperty('lugar')) {
        //     console.log("put: el partido recibido no tiene edad")
        } else {
            console.log("put: ok")
            s.separator()
        }
    } catch (err) {
        if (err.statusCode == expectedErrorCode){
            console.log("put: ok (con error esperado)")
            s.separator()
        } else {
            console.log("put: error inseperado")
            console.log(err)
            s.separator()
        }
    }
}

async function testPutWithIdentifier(serverUrl) {

    const nuevoPartido = {
        id: 2,
        lugar : "Estocolmo"
    }
    await runTest(serverUrl, 2, nuevoPartido)
}

module.exports = testPutWithIdentifier