import { DataTypes } from "sequelize";
import sequelize from "../config/dbConn.js";

const Cart = sequelize.define("cart", {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    userId: {
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
    }
},{
    indexes: [{ unique: true, fields: ["userId", "productId"] }],
    freezeTableName: true
})

export default Cart
