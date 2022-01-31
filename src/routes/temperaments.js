const {Router} = require('express')
const router = Router()
const {dogs} = require('../controllers/api')
const {Temperament} = require('../db')

router.get('/', async (req,res)=>{
    
    const {data} = await dogs()

    let temperaments = await data.map(el=>el.temperament)

    let ordered_temperaments = []

    await temperaments.forEach(el=>{
        if(el){
          let a = el.split(', ')
          
          for(let i in a){
              if(!ordered_temperaments.includes(a[i])){
                ordered_temperaments.push(a[i])
              }
          }
        }
    })

    ordered_temperaments.forEach(el=>{
        Temperament.findOrCreate({
            where:{name:el}
        })
    })

    let result = await Temperament.findAll()
    if(result){
        res.status(200).json(result)
    }else{
        res.status(404).json({msg:'No data found'})
    }
})

module.exports = router