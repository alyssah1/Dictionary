module.exports = function(sequelize, DataTypes) {
const Word = sequelize.define("Word", {
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8,160],
            notEmpty: true,
            isAlphanumeric: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1,140]
        }
    }
});













return Word;
};