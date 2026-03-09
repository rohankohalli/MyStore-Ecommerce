import { DataTypes } from "sequelize";
import sequelize from "../config/dbConn.js";

const Users = sequelize.define("users", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    mobileNo: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.ENUM("Admin", "User", "Seller"),
        defaultValue: "User",
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM("Active", "Banned"),
        defaultValue: "Active",
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    refreshToken:{
        type:DataTypes.STRING
    },
    resetToken:{
        type:DataTypes.STRING
    },
    resetTokenExpiresAt:{
        type:DataTypes.DATE
    }
})

export default Users
