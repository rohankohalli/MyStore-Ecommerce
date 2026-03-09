import { DataTypes } from "sequelize";
import sequelize from "../config/dbConn.js";

const Products = sequelize.define("products", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0 }
    },
    image: {
        type: DataTypes.STRING,
    },
    category: {
        type:DataTypes.STRING,
        allowNull:false
    },
    sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},{
    timestamps:true,
    indexes:[{ unique: true, fields:["name", "sellerId"]}]
})
export default Products
