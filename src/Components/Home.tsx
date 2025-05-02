import { Tally3 } from "lucide-react";
import { useFilter } from "./FilterContext";
import { useEffect, useState } from "react";
import axios from "axios";
import BookCart from "./BookCart";
import TopSellers from "./TopSellers";
import PopularBlog from "./PopularBlog";
import Model from "../assests/model.jpg"
import Man from "../assests/man.png"

function Home() {
    const { searchQuery, selectedCategory, keywords, minPrice, maxPrice } =
        useFilter();
    const [product, setProduct] = useState<any[]>([]);
    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [dropDown, setDropDown] = useState(false);
    const itemsPerPage = 12;

    useEffect(() => {
        setCurrentPage(1); // Reset to first page on keyword change
    }, [keywords]);

    useEffect(() => {
        let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`;
        if (keywords) {
            url = `https://dummyjson.com/products/search?q=${keywords}`;
        }

        axios.get(url)
            .then((response) => {
                setProduct(response.data.products);
            })
            .catch((error) => {
                console.log(`error ${error}`);
            });
    }, [currentPage, keywords]);

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
    const totalProducts = 100
    const totalPages = Math.ceil(totalProducts / itemsPerPage)

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    const getPaginationButton = () => {
        const buttons: number[] = [];
        const visiblePages = 3; // total number of pagination buttons to show
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        const pagesShown = endPage - startPage + 1;

        if (pagesShown < visiblePages) {
            if (startPage > 1) {
                startPage = Math.max(1, startPage - (visiblePages - pagesShown));
            } else if (endPage < totalPages) {
                endPage = Math.min(totalPages, endPage + (visiblePages - pagesShown));
            }
        }

        for (let page = startPage; page <= endPage; page++) {
            buttons.push(page);
        }

        return buttons;
    };

    return (
        <div className="overflow-y-auto hide-scrollbar h-screen">
            <div className="w-full flex">
                <div className="w-1/2 sm:w-1/3 bgColor flex flex-col items-center justify-center md:gap-2 lg:gap-4 ">
                    <h1 className="font-bold text-[10px] md:text-lg lg:text-xl">SPECIAL OFFER</h1>
                    <h1 className="font-bold text-xs md:text-xl lg:text-4xl pt-1">BLACK FRIDAY</h1>

                    <div className="flex items-center gap-1 sm:gap-4">
                        <img src={Man} alt="" className="w-[25px] sm:w-[50px]" />
                        <h2 className="font-bold text-[10px] sm:text-xs text-slate-950">FREE DELIVERY ON FIRST ORDER</h2>
                    </div>

                    <button
                        className="rounded sm:my-1 block bg-indigo-950 text-white  text-center p-1 sm:p-3 hover:bg-slate-950 hover:text-white cursor-pointer"
                    >
                        Order Now
                    </button>

                </div>
                <div className="w-1/2 sm:w-2/3 ">
                    <img
                        src={Model}
                        alt="banner"
                        className="w-full object-cover mix-blend-multiply"
                    />
                </div>

            </div>

            <section className="m-2">
                <button className="flex items-center" onClick={() => setDropDown(!dropDown)}>
                    <Tally3 />
                    {filter === "all"
                        ? "Filter"
                        : filter.charAt(0).toLowerCase() + filter.slice(1)}
                </button>
            </section>

            {dropDown && (
                <div className=" bgColor border-gray-300 border m-2">
                    <button
                        onClick={() => setFilter("cheap")}
                        className="filterStyle">
                        Cheaper
                    </button>
                    <button
                        onClick={() => setFilter("expensive")}
                        className="filterStyle">
                        Expensive
                    </button>
                    <button
                        onClick={() => setFilter("popular")}
                        className="filterStyle">
                        Popular
                    </button>
                </div>
            )}

            {filteredProducts.length === 0 ? (
                <div className="text-center col-span-full text-slate-950">No products found</div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
            )}

            <div className="flex sm:flex-row gap-4 items-center justify-center p-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-indigo-950 text-white w-24 p-2 font-bold flex items-center justify-center"
                >
                    <span className="block sm:hidden">&lt;</span>
                    <span className="hidden sm:block">Previous</span>
                </button>

                {getPaginationButton().map(page => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`${page === currentPage
                            ? `bg-slate-950 text-white`
                            : `bg-white text-indigo-950 border`} px-3 py-1 rounded-full m-1 font-semibold`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-indigo-950 text-white w-24 p-2 font-bold flex items-center justify-center"
                >
                    <span className="block sm:hidden">&gt;</span>
                    <span className="hidden sm:block">Next</span>
                </button>
            </div>

            <TopSellers />
            <PopularBlog />

        </div>
    );
}

export default Home;
