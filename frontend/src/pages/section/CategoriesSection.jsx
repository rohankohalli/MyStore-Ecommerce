import { Link } from "react-router-dom"
import { Categories } from "../../constants/categories"
import { useState } from "react"

const CategoriesSection = () => {
    const [showAll, setShowAll] = useState(false)

    const showCtgs = showAll ? Categories : Categories.slice(0, 5)

    return (
        <div>
            <div className="flex justify-between items-center mt-2">
                <h4>Shop By Category</h4>

                <button
                    onClick={() => setShowAll(prev => !prev)}
                    className="text-blue-600 cursor-pointer">
                    {showAll ? 'Show less' : 'View all'}
                </button>
            </div>
            <div className="flex gap-4 border rounded-lg p-2 flex-wrap">
                {showCtgs.map(ctg => (
                    <Link to={`/list?category=${ctg.value}`} key={ctg.value}
                        className="flex flex-col items-center gap-4 border rounded p-4 w-3xs shrink-0 hover:shadow-lg">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm">{ctg.label[0]}</span>
                        </div>
                        <span className="text-sm">{ctg.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default CategoriesSection
