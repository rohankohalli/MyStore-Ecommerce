import Address from "../models/Address.js"

export const getAddress = async (req, res, next) => {
    try {
        const address = await Address.findAll({ where: { userId: req.user.id } })

        res.json((address))
    } catch (error) {
        next(error)
    }
}

export const addAddress = async (req, res, next) => {
    try {
        const { fullName, phone, addressLine, city, state, country, pincode } = req.body

        const existingAddress = await Address.count({ where: { userId: req.user.id } })

        const address = await Address.create({
            userId: req.user.id,
            fullName,
            phone,
            addressLine,
            city,
            state,
            country,
            pincode,
            isDefault: existingAddress === 0
        })

        return res.status(201).json({ message: "Address Added Succefully", address })
    } catch (error) {
        next(error)
    }
}

export const deleteAddress = async (req, res, next) => {
    try {
        const address = await Address.findByPk(req.params.id)

        if (!address) return res.status(404).json({ message: "Address Not Found" });

        if (address.userId !== req.user.id) return res.status(403).json({ message: "Not Authorized" })

        await address.destroy()

        res.json({ message: "Address Deleted" })
    } catch (error) {
        next(error)
    }
}

export const updateAddress = async (req, res, next) => {
    try {
        const { fullName, phone, addressLine, city, state, country, pincode } = req.body

        const address = await Address.findByPk(req.params.id)

        if (!address) return res.status(404).json({ message: "Address Not Found" })

        if (address.userId !== req.user.id) return res.status(403).json({ message: "Not Authorized" })

        await address.update({ fullName, phone, addressLine, city, state, country, pincode })

        res.json({ message: "Address Updated Successfully", address })

    } catch (error) {
        next(error)
    }
}

export const setDefaultAddress = async (req, res, next) => {
    try {
        const address = await Address.findByPk(req.params.id)

        if (!address) return res.status(404).json({ message: "Address Not Found" })

        if (address.userId !== req.user.id) return res.status(403).json({ message: "Not Authorized" })

        await Address.update({ isDefault: false }, { where: { userId: req.user.id } })

        await address.update({ isDefault: true })

        res.json({ message: "Default Address Updated", address })

    } catch (error) {
        next(error)
    }
}
