import sequelize from "../config/dbConn.js"
import Address from "../models/Address.js"
import Cart from "../models/Cart.js"
import Orders from "../models/Order.js"
import OrderItems from "../models/OrderItem.js"
import Products from "../models/Product.js"

export const checkout = async (req, res, next) => {
    const t = await sequelize.transaction();
    
    try {
        const { addressId, paymentMethod } = req.body
        const cartItems = await Cart.findAll({
            where: { userId: req.user.id },
            include: [{ model: Products }],
            transaction: t,
            lock: t.LOCK.UPDATE
        });

        if (!cartItems.length) {
            await t.rollback();
            return res.status(400).json({ message: "Cart is empty" });
        }

        let totalAmount = 0
        for (const item of cartItems) {
            if (item.quantity > item.product.stock) {
                throw new Error(`Not enough stock for ${item.product.name}`);
            }
            totalAmount += item.quantity * item.product.price;
        }

        const address = await Address.findByPk(addressId);

        if (!address) { 
            await t.rollback() 
            return res.status(404).json({ message: "Address not found" }) 
        }

        if (address.userId !== req.user.id) {
            await t.rollback()
            return res.status(403).json({ message: "Not Authorized" }) 
        }

        const order = await Orders.create({
            userId: req.user.id,
            status: "Placed",
            paymentMethod,
            paymentStatus: "Pending",
            totalAmount,
            fullName: address.fullName,
            phone: address.phone,
            addressLine: address.addressLine,
            city: address.city,
            state: address.state,
            country: address.country,
            pincode: address.pincode,
        },
            { transaction: t }
        )

        for (const item of cartItems) {
            await OrderItems.create(
                {
                    orderId: order.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    priceAtPurchase: item.product.price
                },
                { transaction: t }
            );

            await item.product.decrement("stock", {
                by: item.quantity,
                transaction: t
            });
        }

        await Cart.destroy({ where: { userId: req.user.id }, transaction: t });

        await t.commit();

        res.status(201).json({ message: "Order placed", orderId: order.id });

    } catch (err) {
        await t.rollback();
        next(err);
    }
}

export const myOrders = async (req, res, next) => {
    try {
        const orders = await Orders.findAll({
            where: { userId: req.user.id },
            include: [
                { model: OrderItems, include: [{ model: Products, attributes: ["id", "name"] }] }
            ],
            order: [["createdAt", "DESC"]]
        })

        res.json({ orders })
    } catch (err) {
        next(err)
    }
}

export const getOrderById = async (req, res, next) => {
    try {
        const order = await Orders.findOne({
            where: { id: req.params.id, userId: req.user.id },
            include: [
                {
                    model: OrderItems,
                    include: [{ model: Products, attributes: ["id", "name", "image"] }]
                }
            ]
        })

        if (!order) return res.status(404).json({ message: "Order not found" });

        res.json({ order })

    } catch (err) {
        next(err);
    }
}
