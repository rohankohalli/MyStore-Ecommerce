import { DataTypes } from "sequelize";
import sequelize from "../config/dbConn.js";

const Orders = sequelize.define("orders", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("Pending", "Paid", "Cancelled", "Placed", "Shipped", "Delivered"),
        allowNull: false
    },
    paymentMethod: {
        type: DataTypes.ENUM("CoD", "UPI", "Card", "Net_Banking"),
        allowNull: false
    },
    paymentStatus: {
        type: DataTypes.ENUM("Pending", "Paid"),
        allowNull: false
    },
    totalAmount:{
        type:DataTypes.DECIMAL(10, 2),
        allowNull:false
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
    addressLine: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pincode: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    createdAt:true
})

export default Orders
