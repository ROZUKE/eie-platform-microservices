const { DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize')

const UserSchema = sequelize.define( 'Usuarios', {
    usuarioId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'usuario_id'
    },
    correo: {
        type: DataTypes.STRING,
        unique: true
    },
    contrasena: {
        type: DataTypes.INTEGER,
    }
}, {
    timestamps: false
});


module.exports = { UserSchema }