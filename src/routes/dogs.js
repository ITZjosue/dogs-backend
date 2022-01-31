const {Router} = require('express')
const router = Router()
const { dogs } = require('../controllers/api')
const { Dog,Temperament } = require('../db')

// IMAGEN POR DEFECTO PARA LAS NUEVAS RAZAS A CREAR
let imagen = 'https://images.pexels.com/photos/1390361/pexels-photo-1390361.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'

router.get('/', async (req,res)=>{
    const { data } = await dogs()
    const { name } = req.query
    // TRAEMOS A LOS PERROS DE LA BASE DE DATOS
    const database_dogs = await Dog.findAll({include:Temperament})
    // ORDENAMOS LA INFORMACION COMO QUEREMOS
    let database_dogs_map = database_dogs.map(el=>{
        let tempF =  el.temperaments.map(temp=>{
            return temp.name
        })

        return{
             id:el.id,
             name:el.name,
             img:imagen,
             temperament:tempF.join(', '),
             weight:el.weight,
             database:el.database
        }
    })
    // SI HAY UN QUERY PARAMETER
    //FILTRO POR NOMBRE DE RAZA
    if(name){
        // FILTRAMOS LOS PERROS QUE COINCIDAN CON EL PARAMETRO ENVIADO
        const filtered_db_dogs = database_dogs_map.filter(el=>el.name.toLowerCase().includes(name.toLowerCase()))
        const filtered_api_dogs = data.filter(el=>el.name.toLowerCase().includes(name.toLowerCase()))
        
        if(filtered_api_dogs.length || filtered_db_dogs.length ){
            // SI HAY COINCIDENCIAS SE MANDAN LOS RESULTADOS AL FRONT
            let dogs_info = filtered_api_dogs.map(el=>({
                id:el.id,
                img:el.image.url,
                name:el.name,
                temperament:el.temperament,
                weight:el.weight.metric
            }))
            dogs_info.unshift(...filtered_db_dogs)
            return res.json(dogs_info)
        }else{
            // SI NO HAY COINCIDENCIAS DE MANDA UN MENSAJE DE ERROR
            return res.status(404).json({msg:"No data found"})
        }
    }
    // SE ORDENA LA INFORMACION DE LA API
    let dogs_info = data.map(el=>({
        id:el.id,
        img:el.image.url,
        name:el.name,
        temperament:el.temperament,
        weight:el.weight.metric
    }))
    // SE AÑADEN LAS RAZAS DE LA BASE DE DATOS 
    dogs_info.unshift(...database_dogs_map)
    // SE ENVÍA LA INFORMACION AL FRONT
    res.status(200).json(dogs_info)
})

router.get('/:idRaza', async (req,res)=>{

    const { idRaza } = req.params
    // TRAEMOS LAS RAZAS DE LA API
    const api_dogs = await dogs()
    // TRAEMOS LAS RAZAS DE LA BASE DE DATOS
    const database_dogs = await Dog.findAll({include:Temperament})
    // ORDENAMOS LA INFORMACION DE LAS RAZAS TRAIDAS DE LA BASE DE DATOS
    const db_dogs_map = database_dogs.map(el=>{
        let tempF =  el.temperaments.map(temp=>{
            return temp.name
        })
        return{
             id:el.id,
             img:imagen,
             name:el.name,
             temperament:tempF.join(', '),
             weight:el.weight,
             height: el.height,
             life_span:el.life_span
        }
    })
    // UNIMOS EN UN ARRAY LOS PERROS DE LA API CON LOS DE LA BASE DE DATOS
    const total_dogs = [...api_dogs.data,...db_dogs_map]
    // FILTRAMOS
    const result = await total_dogs.find(el=>el.id == idRaza)

    if(result){
        // ENVIAMOS LA INFORMACION NECESARIA
        const dog_info = {
            id:result.id,
            img:result.image?.url || imagen,
            name:result.name,
            temperament:result.temperament,
            weight:result.weight.metric || result.weight,
            height:result.height.metric || result.height,
            life_span:result.life_span
        }
    
        return res.status(200).json(dog_info)
    }else{
        return res.status(404).json({msg:'No data found'})
    }

})

module.exports = router