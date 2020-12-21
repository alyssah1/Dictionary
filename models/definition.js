module.exports = function(sequelize, DataTypes) {
    const Definition = sequelize.define("Definition", {
        data: DataTypes.JSON,

        synonyms: {
            type: DataTypes.STRING,
        },
    });
    Definition.associate = function(models) {
        Definition.belongsTo(models.Word, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Definition;
};