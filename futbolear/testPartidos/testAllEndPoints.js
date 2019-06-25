const testGetAll = require('./testGetAll')
const testPostWithBody = require('./testPostWithBody')
const testGetWithIdentifier = require('./testGetWithIdentifier')
const testDeleteWithIdentifier = require('./testDeleteWithIdentifier')
const testPutWithIdentifier = require('./testPutWithIdentifier')
const testPutWithPlayers = require('./testPutWithPlayers')

const serverUrl = 'http://127.0.0.1:8080/api'

async function main() {
    // await testPostWithBody(serverUrl)
    await testGetAll(serverUrl)
    // await testGetWithIdentifier(serverUrl)
    // await testDeleteWithIdentifier(serverUrl)
    // await testPutWithIdentifier(serverUrl)
    // await testPutWithPlayers(serverUrl)
}

main()