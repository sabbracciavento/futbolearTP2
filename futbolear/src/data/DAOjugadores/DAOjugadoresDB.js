const knex = require('../../db/knex')

async function create() {
    try {
        knex.schema.hasTable('jugadores').then(function(exists) {
            if (!exists) {
            return knex.schema.createTable('jugadores', function(table) {
                table.increments('id').primary();
                table.string('nombre')
                table.string('mail')
            })
            }
         });
    } catch(err) {
        throw { status: 500, descripcion: err.message}
    }
}

async function add(nuevo) {
    try {
        await knex('jugadores')
        .insert(nuevo)
        .then(() => console.log("data inserted"))
        .catch((err) => { console.log(err); throw err })
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

async function getAll() {
    try {
        create()
        const result = await knex('jugadores')
        return result
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

async function getById(idMatch) {
    try {
        const result = await knex('jugadores')
        .where({
            id: idMatch
          }).select('*')
        return result
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

async function getByNombre(nombreMatch) {
    try {
        return await knex('jugadores')
        .where({
            admin: nombreMatch
            }).select('*')
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

async function deleteById(id) {
    try {
        const result = knex('jugadores')
        .where('id', id)
        .del()
        return result
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

async function updateById(id, nuevoJugador) {
    try {
        await knex('jugadores')
        .where('id', id)
        .update({
          nombre: nuevoJugador.nombre,
          mail: nuevoJugador.mail
        })
        return nuevoJugador
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

module.exports = {
    create,
    add,
    getAll,
    getById,
    getByNombre,
    deleteById,
    updateById
}