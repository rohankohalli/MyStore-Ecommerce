import Cart from "../models/Cart.js"
import Products from "../models/Product.js"

export const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body

        const product = await Products.findByPk(productId)
        if (!product) return res.status(404).json({ message: "Product not found" })

        const existing = await Cart.findOne({ where: ({ userId: req.user.id, productId }) })

        const qty = existing ? existing.quantity + quantity : quantity

        if (qty > product.stock) {
            return res.status(400).json({ message: "not enough items" })
        }
        if (existing) {
            await existing.update({ quantity: qty });
        } else {
            await Cart.create({ userId: req.user.id, productId, quantity: qty });
        }
        res.status(201).json({ message: "Item Added to cart" })
    } catch (err) {
        next(err)
    }
}

export const getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findAll({
            attributes:["id", "userId", "quantity", "productId"],
            where: { userId: req.user.id },
            include: [{ model: Products, attributes: ["id", "name", "price", "stock", "image"] }]
        })

        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

        res.json({ cart: cart, totalItems })
    } catch (err) {
        next(err)
    }
}

export const updateCartQuantity = async (req, res, next) => {
    try {
        const { quantity } = req.body

        if(!quantity || quantity <1) return res.status(400).json({message:"Inavlid Quantity!!"})

        const item = await Cart.findOne({
            where: { userId: req.user.id, id: req.params.cartItemId },
        })

        if (!item) return res.status(404).json({ message: "Item not found" });

        item.quantity = quantity
        await item.save();

        res.json({ message: "Quantity updated" });
    } catch (err) {
        next(err);
    }
};

export const removeFromCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ where: { userId: req.user.id, id:req.params.cartItemId } })
        
        if (!cart) return res.status(404).json({ message: "Item not in cart" });

        await cart.destroy();

        res.json({ message: "Item removed from cart" });
    } catch (error) {
        next(error)
        console.error("Del error:", error)
    }
}

export const mergeCart = async (req, res, next) => {
    try {
        const { items } = req.body

        for (const item of items) {
            const existing = await Cart.findOne({
                where: { userId: req.user.id, productId: item.productId },
            })

            if (existing) {
                existing.quantity += item.quantity;
                await existing.save();
            } else {
                await Cart.create({
                    userId: req.user.id,
                    productId: item.productId,
                    quantity: item.quantity,
                });
            }
        }
        res.json({ message: "Carts Merged"})
    } catch (error) {
        next(error)
    }
}
