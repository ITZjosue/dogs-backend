const {Router} = require('express')
const router = Router()
const { Dog, Temperament } = require('../db')
const { dogs } = require('../controllers/api') 

router.post('/', async (req,res) =>{
    // AGARRAMOS TODAS LA INFORMACION TRAIDA DESDE EL FORMULARIO
    const {nombre,alturaMin,alturaMax,pesoMin,pesoMax,vida,temperamento} = req.body
    // COMPROBAMOS QUE TODA LA INFORMACIÓN NECESARIA ESTÉ DISPONIBLE
    if(!nombre || !alturaMin || !alturaMax || !pesoMin || !pesoMax || !vida){
        return res.status(400).json({msg:"Information Needed!"})
    }

    let filtered_temperaments = []

    if(temperamento.length > 0){
        // TRAEMOS TODOS LOS TEMPERAMENTOS DESDE LA BASE DE DATOS 
        const temperaments_list = await Temperament.findAll()
        // FILTRAMOS LOS TEMPERAMENTOS QUE COINCIDAN CON LOS INGRESADOS EN EL FORMULARIO
        filtered_temperaments = temperaments_list.filter(temp=>temperamento.includes(temp.name))
    }
    // TRAEMOS LAS RAZAS CREADAS EN LA BASE DE DATOS
    const db_dogs = await Dog.findAll()

    // COMPROBAMOS SI EXISTEN RAZAS ANTERIORMENTE CREADAS EN LA BASE DE DATOS
    if(!db_dogs.length){
        // TRAEMOS LAS RAZAS DE LA API PARA EXTRAER EL ID MAYOR DE TODOS
        const { data } = await dogs()
        let id = Math.max(...data.map(el=>el.id))
        // CREAMOS UN NUEVO ID PARA LA RAZA A CREAR QUE NO COLISIONE CON LOS ID DE LA API
        // CREAMOS LA PRIMERA RAZA EN LA BASE DE DATOS
        const newDog = await Dog.create({
            id:id+1,
            name:nombre,
            height:`${alturaMin} - ${alturaMax}`,
            weight:`${pesoMin} - ${pesoMax}`,
            life_span:vida,
            database:true
        })
        if(filtered_temperaments){
            // AÑADIMOS LOS TEMPERAMENTOS MEDIANTE LA ASOCIACION DE SEQUELIZE
            await newDog.addTemperaments(filtered_temperaments)
        }
        res.status(201).json(newDog)
    }else{
        // OBTEMOS EL MAYOR ID DE LAS RAZAS EN LA BASE DE DATOS

        let id = Math.max(...db_dogs.map(el=>el.id))
        // CREAMOS UNA NUEVA RAZA PARA LA BASE DE DATOS
        const newDog = await Dog.create({
            id:id+1,
            name:nombre,
            height:`${alturaMin} - ${alturaMax}`,
            weight:`${pesoMin} - ${pesoMax}`,
            life_span:vida,
            database:true
        })
        if(filtered_temperaments){
            await newDog.addTemperaments(filtered_temperaments)
        }
        res.status(201).json(newDog)
    }
})

module.exports = router