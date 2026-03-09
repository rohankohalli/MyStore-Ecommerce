import { DataTypes } from "sequelize";
import sequelize from "../config/dbConn.js";

const Address = sequelize.define("address", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^(\+91)?[6-9]\d{9}$/
        }
    },
    addressLine:{
        type:DataTypes.STRING,
        allowNull:false
    },
    city:{
        type:DataTypes.STRING,
        allowNull:false
    },
    state:{
        type:DataTypes.STRING,
        allowNull:false
    },
    country:{
        type:DataTypes.STRING,
        allowNull:false
    },
    pincode:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isDefault:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
},{
    freezeTableName:true
})

export default Address