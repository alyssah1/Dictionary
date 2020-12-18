module.exports = function(sequelize, DataTypes) {
const Word = sequelize.define("Word", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1,140]
        }
    }
});

Word.associate = function(models) {

    Word.belongsTo(models.User, {
        foreignKey: {
            allowNull: false
        }
    });
    Word.hasMany(models.Definition, {
        onDelete: "cascade"
    });
    Word.hasMany(models.DefinitionCache, {
        onDelete: "cascade"
    });
};
    return Word;
};