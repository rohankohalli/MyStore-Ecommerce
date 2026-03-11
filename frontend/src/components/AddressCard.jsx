import { EllipsisVertical } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const AddressCard = ({ address, onEdit, onDelete, onMakeDefault }) => {

    const [miniMenu, setMiniMenu] = useState(false)
    const menuRef = useRef(null)

    useEffect(() => {
        if (!miniMenu) return
        const close = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMiniMenu(false);
            }
        }
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, [miniMenu])

    return (
        <div className="border rounded w-full max-w-72 p-2 relative shadow-xl">

            <p className="flex justify-between mb-2">
                <strong>{address.fullName}</strong>

                <button
                    onClick={() => setMiniMenu(!miniMenu)}
                    className="cursor-pointer">
                    <EllipsisVertical />
                </button>
            </p>

            <p>{address.addressLine}</p>
            <p>{address.city}, {address.state}, {address.country}</p>
            <p>{address.pincode}</p>

            {address.isDefault && (
                <span className="text-base bg-green-100 px-2 py-1 rounded mt-2 inline-block">
                    Default
                </span>
            )}

            {miniMenu && (
                <div className="absolute right-2 top-8 bg-white border rounded shadow w-32" ref={menuRef}>
                    <div className="relative">
                        <button
                            onClick={() => {
                                onEdit(address)
                                setMiniMenu(false)
                            }}
                            className="block w-full text-left px-3 py-2 hover:bg-gray-100 cursor-pointer">
                            Edit
                        </button>
                        <hr />
                        <button
                            onClick={() => {
                                onDelete(address)
                                setMiniMenu(false)
                            }}
                            className="block w-full text-left px-3 py-2 hover:bg-gray-100 cursor-pointer">
                            Delete
                        </button>
                        <hr />
                        <button
                            disabled={address.isDefault}
                            onClick={() => {
                                onMakeDefault(address)
                                setMiniMenu(false)
                            }
                            }
                            className="block w-full text-left px-3 py-2 hover:bg-gray-100 cursor-pointer">
                            Make Default
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddressCard