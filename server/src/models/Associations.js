import Address from "./Address.js";
import Cart from "./Cart.js";
import Orders from "./Order.js";
import OrderItems from "./OrderItem.js";
import Products from "./Product.js";
import Users from "./Users.js";

Users.hasMany(Products, { foreignKey: "sellerId" })
Products.belongsTo(Users, { foreignKey: "sellerId", as: "seller" })

Users.hasMany(Orders, { foreignKey: "userId" })
Orders.belongsTo(Users, { foreignKey: "userId" })

Users.hasMany(Cart, { foreignKey: "userId" })
Cart.belongsTo(Users, { foreignKey: "userId" })

Products.hasMany(Cart, { foreignKey: "productId" })
Cart.belongsTo(Products, { foreignKey: "productId" })

Products.hasMany(OrderItems, { foreignKey: "productId" })
OrderItems.belongsTo(Products, { foreignKey: "productId" })

Orders.hasMany(OrderItems, { foreignKey: "orderId" })
OrderItems.belongsTo(Orders, { foreignKey: "orderId" })

Users.hasMany(Address, { foreignKey: "userId", onDelete: "CASCADE" })
Address.belongsTo(Users, { foreignKey: "userId" })

export { Users, Products, Orders, Cart, OrderItems, Address };
