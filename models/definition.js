module.exports = function(sequelize, DataTypes) {
    const Definition = sequelize.define("Definition", {
        word_id: DataTypes.STRING,
        definition: DataTypes.TEXT,
    });

    return Definition;
};