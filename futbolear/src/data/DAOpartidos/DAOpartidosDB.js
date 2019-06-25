const knex = require('../../db/knex')

async function create() {
    try {
        knex.schema.hasTable('partidos').then(function(exists) {
            if (!exists) {
            return knex.schema.createTable('partidos', function(table) {
                table.increments('id').primary();
                table.string('admin')
                table.string('lugar')
                table.date('fecha')
                table.string('hora')
                table.specificType('jugadores', 'text ARRAY')
            })
            }
         });
    } catch(err) {
        throw { status: 500, descripcion: err.message}
    }
}

async function add(nuevo) {
    try {
        await knex('partidos').insert(nuevo).then(() => console.log("data inserted"))
    .catch((err) => { console.log(err); throw err })
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

async function getAll() {
    try {
        create()
        const result = await knex('partidos')
        return result
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

async function getById(idMatch) {
    try {
        const result = await knex('partidos')
        .where({
            id: idMatch
          }).select('*')
        return result
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

async function getMatchPlayersById(idMatch) {
    try {
        const result = await knex('partidos')
        .where({
            id: idMatch
          }).select('jugadores')
        return result
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

async function deleteById(id) {
    try {
        const result = knex('partidos')
        .where('id', id)
        .del()
        return result
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

async function updateById(id, nuevoPartido) {
    try {
        await knex('partidos')
        .where('id', id)
        .update({
          admin: nuevoPartido.admin,
          lugar: nuevoPartido.lugar,
          fecha: nuevoPartido.fecha,
          hora: nuevoPartido.hora
        })
        return nuevoPartido
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

async function updatePlayersById(id, nuevoJugador) {
    try {
        const jugadoresDB = await getMatchPlayersById(id)
        const jugadores = addJugadores([], jugadoresDB)
        jugadores.push(nuevoJugador.nombre)
        await knex('partidos')
        .where('id', id)
        .update({
          jugadores: jugadores
        })
        return jugadores
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

function addJugadores(arrayJugadores, arrayDB) {
    for (let i = 0; i < arrayJugadores.length; i++) {
        arrayDB[i].push[arrayJugadores[i]]
    }
    return arrayDB
}

module.exports = {
    create,
    add,
    getAll,
    getById,
    // getByAdmin,
    deleteById,
    updateById,
    updatePlayersById
}