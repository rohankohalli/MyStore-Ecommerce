import { Search } from "lucide-react"
import { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
   const [products, setProducts] = useState([])
   const [query, setQuery] = useState("")
   const navigate = useNavigate()

   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const res = await productApi.allProducts()
            setProducts(res.data.items)
         } catch (error) {
            console.error(error)
         }
      }
      fetchProducts()
   }, [])

   const searchRes = query ? products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())) : []
   return (
      <div className="relative">
         <Search className="absolute left-3 top-1/2 -translate-y-1/2" />
         <input
            type="search"
            name="search"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-gray-50 border rounded-full py-1.5 pl-9 pr-3 text-base focus:outline-none"
         />

         {query && (
            <div className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow">
               {searchRes.length === 0 ? (
                  <div className="p-3 text-sm text-gray-500">
                     No results found
                  </div>
               ) : (
                  searchRes.slice(0, 6).map((p) => (
                     <div key={p.id}
                        onClick={() => {
                           navigate(`/products/${p.id}`);
                           setQuery("");
                        }}
                        className="p-3 hover:bg-gray-100 cursor-pointer text-sm">
                        {p.name}
                     </div>
                  ))
               )}
            </div>
         )}

      </div>
   )
}

export default SearchBox