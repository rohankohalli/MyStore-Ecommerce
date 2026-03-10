import axiosClient from "./apiService"

const addressApi = {
    getAddress: () => axiosClient.get("/address"),
    addAddress: (payload) => axiosClient.post("/address", payload),
    deleteAddress: (id) => axiosClient.delete(`/address/${id}`),
    updateAddress: (id, payload) => axiosClient.put(`/address/${id}`, payload),
    setDefaultAddress: (id) => axiosClient.put(`/address/${id}/default`),
}

export default addressApi