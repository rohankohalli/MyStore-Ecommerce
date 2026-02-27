import productApi from "../../api/productApi"
import { useForm } from 'react-hook-form';
import { toast } from "react-hot-toast";
import { Categories } from "../../constants/categories";

const CreateProduct = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        try {
            const formData = new FormData()

            formData.append("name", data.name)
            formData.append("description", data.description)
            formData.append("price", data.price)
            formData.append("stock", data.stock)
            formData.append("category", data.category)
            formData.append("image", data.image[0])

            await productApi.createProduct(formData)

            toast.success("Product created successfully")

            reset()
        } catch (e) {
            console.error(e);
            toast.error("Something Went Wrong")
        }
    }

    return (
        <div className="h-full flex items-center justify-center bg-gray-50">
            <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center mb-6">Add Product</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <input type="text" placeholder="Product Name" {...register("name", { required: true })}
                        className="border rounded-md px-3 py-2" />

                    <textarea placeholder="Enter Description" className="border rounded-md px-3 py-2"
                        {...register("description", { required: true })} />

                    <input type="number" className="border rounded-md px-3 py-2"
                        placeholder="Price" {...register("price", { required: true })} />

                    <input type="number" className="border rounded-md px-3 py-2"
                        placeholder="Stock" {...register("stock", { required: true })} />

                    <select {...register("category", { required: "Category required" })}
                        className="border rounded-md px-3 py-2">

                        <option value="">Select Category</option>
                        {Categories.map(ctg => (
                            <option key={ctg.value} value={ctg.value}>
                                {ctg.label}
                            </option>
                        ))}

                    </select>

                    <label>Upload Product Image</label>
                    <input type="file" className="border rounded-md px-3 py-2 cursor-pointer" {...register("image", {
                        validate: file => file[0]?.size <= 2 * 1024 * 1024 || "Max size is 2MB"
                    })}
                        accept="image/jpg, image/jpeg, image/png" />

                    <button type="submit" className="cursor-pointer bg-green-500 text-white p-2">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateProduct
