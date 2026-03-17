import { Link } from "react-router-dom"
import { Categories } from "../../constants/categories"
import { useRef } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

const CategoriesSection = () => {

    const scrollRef = useRef(null)

    const scroll = (direction) => {
        const amount = 250

        if (direction === "left") {
            scrollRef.current.scrollLeft -= amount
        } else {
            scrollRef.current.scrollLeft += amount
        }
    }

    return (
        <div className="mt-2">
            <h4>Shop By Category</h4>
            <div className="relative">

                <button onClick={() => scroll("left")}
                    className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 bg-white border rounded-lg p-1 shadow">
                    <ArrowLeft />
                </button>
                <div
                    ref={scrollRef}
                    className="flex gap-4 border rounded-lg p-2 overflow-x-auto flex-nowrap scroll-smooth no-scrollbar">

                    {Categories.map(ctg => (
                        <Link to={`/list?category=${ctg.value}`} key={ctg.value}
                            className="flex flex-col items-center gap-4 border rounded p-4 w-3xs shrink-0 hover:shadow-lg">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-sm">{ctg.label[0]}</span>
                            </div>
                            <span className="text-sm">{ctg.label}</span>
                        </Link>


                    ))}
                </div>
                <button onClick={() => scroll("right")}
                    className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 bg-white border rounded-lg p-1 shadow">
                    <ArrowRight />
                </button>
            </div>
        </div>
    )
}

export default CategoriesSection
