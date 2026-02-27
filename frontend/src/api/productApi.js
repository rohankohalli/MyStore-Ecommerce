import axiosClient from "./apiService"

const productApi = {
    createProduct: (payload) => axiosClient.post("/products/create", payload),
    myProducts: () => axiosClient.get("/products/my-products"),
    allProducts: () => axiosClient.get("/products"),
    getProductsById: (id) => axiosClient.get(`/products/${id}`),
    updateProduct: (id, payload) => axiosClient.put(`/products/${id}`, payload),
    deleteProduct: (id, payload) => axiosClient.delete(`/products/${id}`, payload),
}

export default productApi