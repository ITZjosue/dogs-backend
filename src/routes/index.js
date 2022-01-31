const { Router } = require('express');
const router = Router()
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const createDog = require('./dog')
const dogsRouter = require('./dogs')
const temperament = require('./temperaments')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dog',createDog)
router.use('/dogs',dogsRouter)
router.use('/temperament',temperament)


module.exports = router;
