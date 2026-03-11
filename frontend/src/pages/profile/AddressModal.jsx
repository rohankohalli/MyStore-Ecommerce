import AddAddress from "../checkout/AddAddress"

const AddressModal = ({ address, onClose, onSaved }) => {

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center" onClick={onClose}>

            <div className="bg-white p-6 rounded w-108" onClick={(e) => e.stopPropagation()}>

                <h3 className="mb-4">
                    {address ? "Edit Address" : "Add Address"}
                </h3>

                <AddAddress
                    editingAddress={address}
                    onCreated={onSaved}
                />

                <button
                    onClick={onClose}
                    className="mt-3 text-gray-500 cursor-pointer"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default AddressModal