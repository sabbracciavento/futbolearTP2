const request = require('request-promise-native');

async function runTest(serverUrl, targetDni, expectedErrorCode) {

    const options = {
        method: 'DELETE',
        uri: `${serverUrl}/jugadores/${targetDni}`,
        json: true,
    }

    try {
        await request(options)
        console.log('delete: ok')
    } catch (err) {
        if (err.statusCode == expectedErrorCode) {
            console.log("delete: ok (con error esperado)")
        } else {
            console.log("delete: error inesperado")
        }
    }
}

async function testDeleteWithIdentifier(serverUrl) {
    runTest(serverUrl, 1)
    runTest(serverUrl, 123, 404)
}

module.exports = testDeleteWithIdentifier