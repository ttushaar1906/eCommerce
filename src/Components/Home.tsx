import { Settings, User, ShoppingCart, Tally3 } from "lucide-react";
// import TopMerchants from "./TopMerchants";
import { useFilter } from "./FilterContext";
import { useEffect, useState } from "react";
import axios from "axios";
import BookCart from "./BookCart";

function Home() {
    const { searchQuery, selectedCategory, keyword, minPrice, maxPrice, setSearchQuery } =
        useFilter();
    const [product, setProduct] = useState<any[]>([]);
    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [dropDown, setDropDown] = useState(false);
    const itemsPerPage = 12;

    useEffect(() => {
        let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`

        if (keyword) {
            url = `https://dummyjson.com/products?q=${keyword}`
        }

        axios.get(url).then(response => {
            setProduct(response.data.products)

        }).catch(error => {
            console.log(`error ${error}`);

        })
    }, [currentPage, keyword])

    const getFilteredProducts = () => {
        let filteredProducts = product

        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(
                (product) => product.category === selectedCategory
            )
        }
        if (minPrice !== undefined) {
            filteredProducts = filteredProducts.filter((product => product.price >= minPrice))
        }

        if (maxPrice !== undefined) {
            filteredProducts = filteredProducts.filter((product => product.price <= maxPrice))
        }

        if (searchQuery) {
            filteredProducts = filteredProducts.filter((product => product.title.toLowerCase().includes(searchQuery.toLowerCase())))
        }
        console.log(filteredProducts);

        switch (filter) {
            case "expensive":
                return filteredProducts.sort((a, b) => b.price - a.price)

            case "cheap":
                return filteredProducts.sort((a, b) => a.price - b.price)

            case "popular":
                return filteredProducts.sort((a, b) => b.rating - a.rating)

            default:
                return filteredProducts
        }

    }

    const filteredProducts = getFilteredProducts()

    return (
        <div className=" w-screen">
            <div className="p-2 bg-amber-50 text-amber-950 font-medium">
                <div className="flex justify-between items-center mx-4 ">
                    {/* Search */}
                    <div className="bg-white border rounded-md p-2 w-72">
                        <input
                            type="text"
                            placeholder="Search Products"
                            className="w-full m-0 outline-none focus:border-none focus:ring-0"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {/* Settings, logo */}
                    <div className="flex justify-center items-center gap-4">
                        <div className="rounded-2xl border cursor-pointer p-2">
                            <ShoppingCart />
                        </div>
                        <div className="rounded-2xl border cursor-pointer p-2">
                            <Settings />
                        </div>
                        <div className="rounded-2xl border cursor-pointer p-2">
                            <User />
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="w-full">
                <img
                    src="https://res.cloudinary.com/tushartharwani/image/upload/v1743946275/SAVE_50_1_rfg8mr.png"
                    alt="banner"
                />
            </div> */}

            <section className=" relative">
                <button className="border flex items-center">
                    <Tally3 />
                    {filter === "all"
                        ? "Filter"
                        : filter.charAt(0).toLowerCase() + filter.slice(1)}
                </button>
            </section>

            {dropDown && (
                <div className="absolute bg-red-300 border-gray-300 border">
                    <button
                        onClick={() => setFilter("cheap")}
                        className="block text-left hover:bg-red-200">
                        Cheaper
                    </button>
                    <button
                        onClick={() => setFilter("expensive")}
                        className="block text-left hover:bg-red-200">
                        Expensive
                    </button>
                    <button
                        onClick={() => setFilter("popular")}
                        className="block text-left hover:bg-red-200">
                        Popular
                    </button>
                </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                    <BookCart
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        image={product.thumbnail}
                        price={product.price}
                    />
                ))}
            </div>


            {/* <div>
                <TopMerchants />
            </div> */}
        </div>
    );
}

export default Home;
