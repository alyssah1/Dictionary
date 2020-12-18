module.exports = function(sequelize, DataTypes) {
    const Definition = sequelize.define("Definition", {
        definition: DataTypes.TEXT,
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