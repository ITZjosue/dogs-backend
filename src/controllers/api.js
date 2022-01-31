const {default:axios} = require('axios')

module.exports = {
    dogs: async ()=>{
        const data = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${process.env.API_KEY}`)
        return data
    },
    raza: async (raza_perro) =>{
        const data = await axios.get(`https://api.thedogapi.com/v1/breeds/search?api_key=${process.env.API_KEY}&q=${raza_perro}`)
        return data
    }
}