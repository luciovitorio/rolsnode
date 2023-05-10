"use strict";
const { v4: uuidv4 } = require("uuid");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Branche, { foreignKey: "brancheId" });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      brancheId: DataTypes.UUID,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM,
        values: ["ADMIN", "PASSADEIRA", "ENTREGADOR"],
        defaultValue: "ADMIN",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user, options) => {
    user.id = uuidv4();
    // user.username = user.username.toUpperCase();
  });

  return User;
};
