const express = require('express')
const _ = require('lodash')
const daoFactory = require('../data/DAOpartidos/daoFactory')
const nodemailer = require('../data/nodemailer')
const whatsapp = require('../data/whatsapp')

const router = express.Router()

const baseURI = '/api/partidos'

router.get('/', async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)

    if (_.isEmpty(req.query)) {
        _handleGetAll(req, res)
    } else {
        _handleGetWithQS(req, res)
    }
})

async function _handleGetAll(req, res) {
    try {
        const partidosDAO = daoFactory.getPartidosDAO()
        const result = await partidosDAO.getAll()
        res.json(result)
    } catch (err) {
        res.status(err.status).json(err)
    }
}

async function _handleGetWithQS(req, res) {
    try {
        if (isNaN(req.query.id))
            throw { status: 400, descripcion: 'el id provisto no es numérico' }

        if (req.query.id < 0)
            throw { status: 400, descripcion: 'el id no puede ser negativo' }

        const partidosDAO = daoFactory.getPartidosDAO()
        const result = await partidosDAO.getById(req.query.id)
        res.json(result)
    } catch (err) {
        res.status(err.status).json(err)
    }
}

router.get('/:id', async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)

    try {
        if (isNaN(req.params.id))
            throw { status: 400, descripcion: 'el id provisto no es un número o es inválido' }

        const partidosDAO = daoFactory.getPartidosDAO()
        const resultado = await partidosDAO.getById(req.params.id)

        if (!resultado)
            throw { status: 404, descripcion: 'partido no encontrado' }

        res.json(resultado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

router.post('/', async (req, res) => {
    console.log(`POSTING: ${baseURI}${req.url}`)

    try {
        const nuevo = req.body.partido
        const partidosDAO = daoFactory.getPartidosDAO()
        const pCreado = await partidosDAO.add(nuevo)
        res.status(201).json(pCreado)
        nodemailer.enviarMail(req.body.jugador)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

router.delete('/:id', async (req, res) => {
    console.log(`DELETING: ${baseURI}${req.url}`)

    try {
        if (isNaN(req.params.id))
            throw { status: 400, descripcion: 'el id provisto no es un número o es inválido' }

        const partidosDAO = daoFactory.getPartidosDAO()
        await partidosDAO.deleteById(req.params.id)
        res.status(204).send()
    } catch (err) {
        res.status(err.status).json(err)
    }
})

router.put('/:id', async (req, res) => {
    console.log(`REPLACING: ${baseURI}${req.url}`)

    try {
        if (isNaN(req.params.id))
            throw { status: 400, descripcion: 'el id provisto no es un número o es inválido' }

        if(!req.body.agregarJugadores) {
            const nuevo = req.body.nuevo
        
            if (req.params.id != nuevo.id)
                throw { status: 400, descripcion: 'el id provisto no coincide entre el recurso buscado y el nuevo' }
            
            const partidosDAO = daoFactory.getPartidosDAO()
            const pActualizado = await partidosDAO.updateById(req.params.id, nuevo)
            res.json(pActualizado)
        } else {
            const nuevo = req.body.nuevo
            
            const partidosDAO = daoFactory.getPartidosDAO()
            const pActualizado = await partidosDAO.updatePlayersById(req.params.id, nuevo)
            whatsapp.mandarWhatsapp(req.body.nuevo.nombre)
            res.json(pActualizado)
        }
    } catch (err) {
        res.status(err.status).json(err)
    }
})

module.exports = router
