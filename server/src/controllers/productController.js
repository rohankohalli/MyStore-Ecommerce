import Products from "../models/Product.js"
import Users from "../models/Users.js";

export const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, stock, category } = req.body

        const imagePath = req.file ? `/uploads/product/${req.file.filename}` : null;

        const product = await Products.create({ name, description, price, stock, category, image:imagePath, sellerId: req.user.id })

        res.status(201).json({ message: "Product Added", product })
    } catch (error) {
        next(error)
    }
}

export const getAllProducts = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 15

        const { rows, count } = await Products.findAndCountAll({
            limit,
            offset: (page - 1) * limit,
            order: [["createdAt", "DESC"]]
        })

        res.json({
            items: rows,
            data: { page, limit, total: count }
        })
    } catch (err) {
        next(err)
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const product = await Products.findByPk(req.params.id, {
            include: [
                { model: Users, as: "seller", attributes: ["id", "name"], },
            ]
        });

        if (!product) return res.status(404).json({ message: "Product not found" });

        res.json({
            product: {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                image: product.image,
                seller: product.seller,
            }
        })
    } catch (err) {
        next(err)
    }
}

export const getMyProducts = async (req, res, next) => {
    try {
        const products = await Products.findAll({ where: { sellerId: req.user.id } })

        res.json({ products });
    } catch (error) {
        next(error);
    }
}

export const updateProduct = async (req, res, next) => {
    console.log("Content Type:", req.headers["content-type"]);

    try {
        const product = await Products.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: "Product Not Found" });

        const { name, description, price, stock } = req.body

        // console.log("Name:", req.body);
        
        let imagePath = product.image;

        if (req.file) {
            if (product.image) {
                const oldPath = path.join(process.cwd(), product.image.replace(/^\/+/, ""));
                fs.unlink(oldPath, () => { });
            }

            imagePath = `/uploads/product/${req.file.filename}`;
        }

        // console.log("Body:", req.body);
        // console.log("File:", req.file);

        await product.update({ name, description, price, stock, image: imagePath });
        res.json({ message: "Product Updated", product });
    } catch (err) {
        next(err)
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Products.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: "Product Not Found" });
        if (product.seller.id !== req.user.id) return res.status(403).json({ message: "Not Authorized" });

        await product.destroy();
        res.json({ message: "Product Deleted" });
    } catch (err) {
        next(err)
    }
}
