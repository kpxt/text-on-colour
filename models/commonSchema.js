module.exports = function (DataTypes) {
    var Schema = {
        red: {
            type: DataTypes.INTEGER,
            min: 0,
            max: 255,
            allowNull: false
        },
        green: {
            type: DataTypes.INTEGER,
            min: 0,
            max: 255,
            allowNull: false
        },
        blue: {
            type: DataTypes.INTEGER,
            min: 0,
            max: 255,
            allowNull: false
        },
        grayscale: {
            type: DataTypes.INTEGER,
            min: 0,
            max: 255,
            allowNull: false
        },
        whiteText: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    };
    return Schema;
};