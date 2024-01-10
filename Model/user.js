const { DataTypes } = require("sequelize");

const defineUserModel = (sequelize) => {
  return sequelize.define("Wmp", {
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        isStrongPassword: function (value) {
          if (!/(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{8,}/.test(value)) {
            throw new Error(
              "Password must contain at least one digit, one alphabet, and one special character, and have a minimum length of 8 characters."
            );
          }
        },
      },
    },
  });
};

module.exports = defineUserModel;
