module.exports = function(sequelize, DataTypes) {
    const DefinitionCache = sequelize.define("DefinitionCache", {
        definition: DataTypes.TEXT
    });
    DefinitionCache.associate = function(models) {
        DefinitionCache.belongsTo(models.Word, {
            foreignKey: {
                allowNull: false
            }
        });
        DefinitionCache.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    }




    return DefinitionCache;
};