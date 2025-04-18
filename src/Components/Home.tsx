import { Tally3 } from "lucide-react";
import { useFilter } from "./FilterContext";
import { useEffect, useState } from "react";
import axios from "axios";
import BookCart from "./BookCart";
import TopSellers from "./TopSellers";
import PopularBlog from "./PopularBlog";

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
            <div className="w-full">
                <img
                    src="https://res.cloudinary.com/tushartharwani/image/upload/v1744310216/xj5dct0pozenfjyf7nxm.png"
                    alt="banner"
                />
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
                <div className=" bg-amber-50 border-gray-300 border m-2">
                    <button
                        onClick={() => setFilter("cheap")}
                        className="block text-left hover:bg-amber-950 w-full hover:text-amber-50 m-1 cursor-pointer">
                        Cheaper
                    </button>
                    <button
                        onClick={() => setFilter("expensive")}
                        className="block text-left hover:bg-amber-950 w-full hover:text-amber-50 m-1 cursor-pointer">
                        Expensive
                    </button>
                    <button
                        onClick={() => setFilter("popular")}
                        className="block text-left hover:bg-amber-950 w-full hover:text-amber-50 m-1 cursor-pointer">
                        Popular
                    </button>
                </div>
            )}

            {filteredProducts.length === 0 ? (
                <div className="text-center col-span-full text-gray-500">No products found</div>
            ) : (
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
            )}

            <div className="flex sm:flex-row gap-4 items-center justify-center p-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-amber-950 text-amber-50 w-24 p-2 font-bold flex items-center justify-center"
                >
                    <span className="block sm:hidden">&lt;</span>
                    <span className="hidden sm:block">Previous</span>
                </button>

                {getPaginationButton().map(page => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`${page === currentPage
                            ? `bg-amber-950 text-amber-50`
                            : `bg-amber-50 text-amber-950`} px-3 py-1 rounded-full m-1 font-semibold`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-amber-950 text-amber-50 w-24 p-2 font-bold flex items-center justify-center"
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
