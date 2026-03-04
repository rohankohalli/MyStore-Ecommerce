import TrendingSection from "../components/TrendingSection";
import CategoriesSection from "../components/CategoriesSection";
import NewProductsSection from "../components/NewProductsSection";

const HomePage = () => {

    return (
        <div className="mx-5 space-y-8">
            {/* Categorisied Shopping */}

            <CategoriesSection />

            {/* The section of trending products/most purchased on the day*/}

            <TrendingSection />

            {/* Newly Added Products */}

            <NewProductsSection />
        </div>
    )
}

export default HomePage