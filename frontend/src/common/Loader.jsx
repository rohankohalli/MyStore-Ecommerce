import { SpinnerCircularFixed } from "spinners-react";

const Loader = ({ text }) => {
    return (
        <div className="flex justify-center items-center flex-col">
            <SpinnerCircularFixed
                size={90} thickness={160} speed={100} color="rgba(78, 228, 78, 1)" secondaryColor="rgba(0, 0, 0, 0.16)" />

            <p className="mt-3 font-bold text-xl">
                {text || "Loading..."}
            </p>
        </div>
    )
}

export default Loader