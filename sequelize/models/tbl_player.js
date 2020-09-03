"use strict";

const uuid = require("uuid");

module.exports = (queryInterface, Sequelize) => {
    const player = queryInterface.define("tbl_player", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.STRING,
            defaultValue: uuid.v4(),
          },
          team_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          back_number: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.DATE,
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.DATE,
          },
    }, {
        tableName: "tbl_players",
        // tslint:disable-next-line: object-literal-sort-keys
        freezeTableName: true,
        underscored: true,
        timestamps: false,
    });

    player.associate = function(models) {
        player.belongsTo(models.tbl_team, {
            foreignKey: "team_id",
        });
    };

    return player;
};
