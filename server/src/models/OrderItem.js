import { DataTypes } from "sequelize";
import sequelize from "../config/dbConn.js";

const OrderItems = sequelize.define("orderitems", {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    priceAtPurchase:{
        type:DataTypes.FLOAT,
        allowNull:false
    }
})

export default OrderItems
