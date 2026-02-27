import { useState } from "react";
import productApi from "../../api/productApi";
import toast from "react-hot-toast";

const EditProductModal = ({ product, onClose, onSave }) => {
    const [form, setForm] = useState({ ...product });
    const [imagePreview, setImagePreview] = useState(`${import.meta.env.VITE_API_URL}${product.image}` || null);
    const [imageFile, setImageFile] = useState(null);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()

            formData.append("name", form.name)
            formData.append("description", form.description)
            formData.append("price", form.price)
            formData.append("stock", form.stock)
            if (imageFile) {
                formData.append("image", imageFile)
            }

            await productApi.updateProduct(product.id, formData)
            onSave(form)
            toast.success("Product Updated!!")
        } catch (error) {
            console.error(error)
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-150 h-120">
                <h3 className="text-lg font-bold mb-4 text-center">Edit Product</h3>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6">

                        <div className="flex flex-col items-center">
                            <div className="w-full h-56 border rounded-lg flex items-center justify-center mb-3">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="h-full object-contain"
                                    />
                                ) : (
                                    <span className="text-gray-400">No image</span>
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="name">Product Name</label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="border rounded-lg w-full p-2 mb-2"
                            />

                            <label htmlFor="description">Product Description</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                required
                                className="border rounded-lg w-full p-3 h-20 resize-none" />

                            <label htmlFor="price">Price</label>
                            <input
                                name="price"
                                type="number"
                                value={form.price}
                                onChange={handleChange}
                                required
                                className="border rounded-lg w-full p-2 mb-2"
                            />

                            <label htmlFor="stock">Available Stock</label>
                            <input
                                name="stock"
                                type="number"
                                value={form.stock}
                                onChange={handleChange}
                                required
                                className="border rounded-lg w-full p-2 mb-4"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center gap-2">
                        <button onClick={onClose} className="border  px-3 py-1.5 rounded cursor-pointer">
                            Cancel
                        </button>
                        <button className="bg-blue-500 text-white px-3 py-1.5 rounded cursor-pointer">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default EditProductModal