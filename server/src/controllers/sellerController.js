import Orders from "../models/Order.js"
import OrderItems from "../models/OrderItem.js"
import Products from "../models/Product.js"

export const SellersOrders = async (req, res, next) => {
    try {
        const orders = await Orders.findAll({
            attributes:["id", "status", "createdAt"],
            include: [{
                model: OrderItems,
                required:true,
                attributes: ["id", "quantity", "priceAtPurchase"],
                include: [{
                    model: Products,
                    attributes:["id", "name", "image"],
                    where: { sellerId: req.user.id }
                }]
            }]
        })

        res.status(200).json({ count:orders.length ,orders })
    } catch (error) {
        next(error)
    }
}

export const OrderDetails = async (req, res, next) => {
    try {
        const { id } = req.params;

        const orders = await Orders.findOne({
            where: { id },
            include: [{
                model: OrderItems,
                include: [{
                    model: Products,
                    where: { sellerId: req.user.id }
                }]
            }]
        })

        if (!orders) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            })
        }

        return res.status(200).json({
            success: true,
            orders,
        })
    } catch (error) {
        next(error)
    }
}

export const shipOrder = async (req, res, next) => {
    const { id } = req.params
    const sellerId = req.user.id
    try {
        const order = await Orders.findOne({
            where: { id },
            include: [{
                model: OrderItems,
                include: [{
                    model: Products,
                    where: { sellerId }
                }]
            }]
        })
        
        if (!order) return res.status(404).json({ message: "Order Not Found" })

        if (order.status !== "Placed")
            return res.status(400).json({ message: `Cannot ship order in '${order.status}' state` })
        
        order.status = "Shipped"
        await order.save()

        return res.json({ message: "Order Marked as Shipped", order })
    } catch (error) {
        next(error)
    }
}
