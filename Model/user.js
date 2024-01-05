const { DataTypes } = require("sequelize");

const defineUserModel = (sequelize) => {
  return sequelize.define("Employee", {
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
    password: {
      type: DataTypes.STRING,
      // allowNull: false,
      validate: {
        len: [8, 20],
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
