import axiosClient from "./apiService";

const cartApi = {
    addToCart: (payload) => axiosClient.post("/cart/add", payload),
    getCart: () => axiosClient.get("/cart"),
    updateItems: (cartItemId, quantity) => axiosClient.put(`/cart/${cartItemId}`, { quantity }),
    deleteItem: (cartItemId) => axiosClient.delete(`/cart/${cartItemId}`),
    mergeCart: (payload) => axiosClient.post("/cart/merge-cart", payload)
}

export default cartApi