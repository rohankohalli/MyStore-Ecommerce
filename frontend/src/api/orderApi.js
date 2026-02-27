import axiosClient from "./apiService";

const orderApi = {
    checkout: (data) => axiosClient.post("/orders/checkout", data),
    getOrderById: (id) => axiosClient.get(`/orders/${id}`),
    getMyOrders: () => axiosClient.get("/orders"),
}

export default orderApi