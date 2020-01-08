'use strict';
module.exports = (sequelize, DataTypes) => {
    const posts = sequelize.define('posts', {
        title: DataTypes.STRING,
        body: DataTypes.TEXT
    }, {});
    posts.associate = function (models) {
        // associations can be defined here
        posts.belongsTo(models.users, {
            as: 'users',
            foreignKey: 'id'
        })
    };
    return posts;
};