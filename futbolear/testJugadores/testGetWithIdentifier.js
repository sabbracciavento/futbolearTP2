const request = require('request-promise-native')

async function runTest(serverUrl, targetId, expectedErrorCode){

    const options = {
        uri: `${serverUrl}/jugadores/${targetId}`,
        json: true
    }

    try {
        const resultArray = await request(options)
        const result = resultArray[0]
        
        if (!result) {
            console.log("get by id: mensaje vacío (sin jugador)")
        } else if (!result.hasOwnProperty('id')) {
            console.log("get by id: el partido recibido no tiene id")
        } else if (!result.hasOwnProperty('nombre')) {
            console.log("get by id: el partido recibido no tiene nombre")
        } else if (!result.hasOwnProperty('mail')) {
            console.log("get by id: el partido recibido no tiene mail")
        }
        console.log(result)
        
    } catch (err) {
        if (err.statusCode == expectedErrorCode) {
            console.log("get by id: ok (con error esperado)")
        } else {
            console.log("get by id: error inesperado")
        }
    }
    
}

async function testGetWithIdentifier(serverUrl) {
    runTest(serverUrl, 1)
    runTest(serverUrl, 123, 404)
}

module.exports = testGetWithIdentifier
