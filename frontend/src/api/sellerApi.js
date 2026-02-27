import axiosClient from "./apiService"

const sellerApi = {
    SellersOrders: () => axiosClient.get("seller/orders"),
    OrderDetailsById: (id) => axiosClient.get(`seller/orders/${id}`),
    ShipOrder: (id) => axiosClient.patch(`seller/orders/${id}/ship`, id)
}

export default sellerApi