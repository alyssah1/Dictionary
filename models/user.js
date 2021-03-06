const bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
    /**
     * username must be alphanumerical, and must be at least 6 letters long, not empty.
     * password must be at least 8 letters long
     */
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: {args: [6,160], msg:"username length must be between 6 and 160 characters."},
                notEmpty: true,
                isAlphanumeric: {msg:"username must be alphanumerical."}
            }
        },
        // The password cannot be null
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {args: [8,160], msg:"password length must be between 8 and 160 characters."},
            }
        }
    });

    User.associate = function(models) {
        User.belongsToMany(models.Word, {through: 'UserWords'});
    };

    /**
     * check unhashed password against user's hashed password
     */
    User.prototype.validPassword = function(password) {
        // noinspection JSCheckFunctionSignatures
        return bcrypt.compareSync(password, this.password);
    };

    /**
     * hash the passwords before saving it into the database
     */
    User.addHook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    });

    return User;
};
