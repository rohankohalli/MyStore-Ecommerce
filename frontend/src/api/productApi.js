import axiosClient from "./apiService"

const productApi = {
    createProduct: (payload) => axiosClient.post("/products/create", payload),
    myProducts: () => axiosClient.get("/products/my-products"),
    allProducts: (params = {}) => axiosClient.get("/products", { params }),
    getProductsById: (id) => axiosClient.get(`/products/${id}`),
    updateProduct: (id, payload) => axiosClient.put(`/products/${id}`, payload),
    trendingProducts: () => axiosClient.get("/products/trending"),
    deleteProduct: (id, payload) => axiosClient.delete(`/products/${id}`, payload),
}

export default productApi