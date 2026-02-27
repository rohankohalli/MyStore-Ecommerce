import axiosClient from "./apiService"

const addressApi = {
    getAddress: () => axiosClient.get("/address"),
    addAddress: (payload) => axiosClient.post("/address", payload),
    deleteAddress: (id) => axiosClient.delete(`/address/${id}`)
}

export default addressApi