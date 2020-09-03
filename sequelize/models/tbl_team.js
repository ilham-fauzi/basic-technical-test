"use strict";

const uuid = require("uuid");

module.exports = (queryInterface, Sequelize) => {
    const team = queryInterface.define("tbl_team", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          name: {
            type: Sequelize.STRING,
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
        tableName: "tbl_teams",
        // tslint:disable-next-line: object-literal-sort-keys
        freezeTableName: true,
        underscored: true,
        timestamps: false,
    });

    return team;
};
