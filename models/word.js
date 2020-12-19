module.exports = function (sequelize, DataTypes) {
    const Word = sequelize.define("Word", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }
        }
    });

    Word.associate = function (models) {

        Word.belongsToMany(models.User, {through: 'UserWords'});
        Word.hasMany(models.Definition, {
            onDelete: "cascade"
        });
    };
    return Word;
};