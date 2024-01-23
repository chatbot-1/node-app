// const { models } = require("mongoose")

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        userName: {
            type: DataTypes.STRING,
            allowedNull: false
        },
        password : {
            type: DataTypes.STRING,
            allowedNull: false
        }
    })

    User.associate = (models) => {
        User.hasMany(models.Likes, {
            onDelete: "cascade"
        })

        // User.hasMany(models.Posts, {
        //     onDelete: "cascade"
        // })

    }
    return User
}