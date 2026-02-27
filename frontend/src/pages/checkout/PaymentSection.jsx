const PaymentSection = ({ value, onChange }) => {
    const paymentOptions = [
        { id: "CoD", label: "Cash on Delivery", enabled: true },
        { id: "UPI", label: "UPI Payment", enabled: false },
        { id: "Card", label: "Debit / Credit Card", enabled: false },
        { id: "Net_Banking", label: "Net Banking", enabled: false },
    ];

    return (
        <div className="space-y-3">
            {paymentOptions.map(option => (
                <label
                    key={option.id}
                    className={`block border rounded-lg p-3 cursor-pointer transition
                        ${value === option.id ? "border-green-500 bg-green-50" : "border-gray-300"}
                        ${!option.enabled ? "opacity-50 bg-gray-100 cursor-not-allowed" : "hover:border-gray-400"}
                        `}
                >
                    <input
                        type="radio"
                        name="payment"
                        checked={value === option.id}
                        onChange={() => onChange(option.id)}
                        disabled={!option.enabled}
                        className="hidden"
                    />

                    <div className="font-medium">
                        {option.label}
                        {!option.enabled && (
                            <span className="ml-2 text-xs bg-black text-white px-2 py-1 rounded">
                                Coming Soon
                            </span>
                        )}
                    </div>
                </label>
            ))}

        </div>
    )

}
export default PaymentSection
