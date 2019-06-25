const request = require('request-promise-native');
const s = require('./separator') 

async function runTest(serverUrl, targetId, expectedErrorCode) {

    const options = {
        method: 'DELETE',
        uri: `${serverUrl}/partidos/${targetId}`,
        json: true,
    }

    try {
        await request(options)
        console.log('delete: ok')
        s.separator()
    } catch (err) {
        if (err.statusCode == expectedErrorCode) {
            console.log("delete: ok (con error esperado)")
            s.separator()
        } else {
            console.log("delete: error inesperado")
            s.separator()
        }
    }
}

async function testDeleteWithIdentifier(serverUrl) {
    runTest(serverUrl, 1)
    runTest(serverUrl, 123, 404)
}

module.exports = testDeleteWithIdentifier