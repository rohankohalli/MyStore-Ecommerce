import TrendingSection from "./section/TrendingSection";
import CategoriesSection from "./section/CategoriesSection";
import NewProductsSection from "./section/NewProductsSection";

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