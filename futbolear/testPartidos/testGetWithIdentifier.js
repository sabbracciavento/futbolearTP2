const request = require('request-promise-native')
const s = require('./separator') 

async function runTest(serverUrl, targetId, expectedErrorCode){

    const options = {
        uri: `${serverUrl}/partidos/${targetId}`,
        json: true
    }

    try {
        const resultArray = await request(options)
        const result = resultArray[0]
        
        if (!result) {
            console.log("get by id: mensaje vacío (sin partido)")
        } else if (!result.hasOwnProperty('id')) {
            console.log("get by id: el partido recibido no tiene id")
        } else if (!result.hasOwnProperty('admin')) {
            console.log("get by id: el partido recibido no tiene admin")
        } else if (!result.hasOwnProperty('fecha')) {
            console.log("get by id: el partido recibido no tiene fecha")
        } else if (!result.hasOwnProperty('hora')) {
            console.log("get by id: el partido recibido no tiene hora")
        } else if (!result.hasOwnProperty('lugar')) {
            console.log("get by id: el partido recibido no tiene lugar")
        } else if (!result.hasOwnProperty('jugadores')) {
            console.log("get by id: el partido recibido no tiene jugadores")
        } else {
            console.log("get by id: ok")
        }
        console.log(result)
        s.separator()
        
    } catch (err) {
        if (err.statusCode == expectedErrorCode) {
            console.log("get by id: ok (con error esperado)")
            s.separator()
        } else {
            console.log("get by id: error inesperado")
            s.separator()
        }
    }
    
}

async function testGetWithIdentifier(serverUrl) {
    runTest(serverUrl, 1)
    runTest(serverUrl, 123, 404)
}

module.exports = testGetWithIdentifier
