'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('posts', 'user_id', {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn("posts", "user_id")
    }
};
