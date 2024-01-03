const { DataTypes, Sequelize } = require("sequelize");

exports.userModel = (sequelize) => {
  // Use DataTypes directly from Sequelize
  return sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    mobile_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  });
};
