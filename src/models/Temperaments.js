const { DataTypes } = require('sequelize')

module.exports = (sequelize) =>{
    sequelize.define('temperament',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            unique:true,
            allowNull:false,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        }
    },{timestamps:false})
}