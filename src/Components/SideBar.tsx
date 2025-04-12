import axios from 'axios'
import { useEffect, useState } from 'react'
import { useFilter } from './FilterContext'

export default function SideBar() {
    const {
        // keywords,
        setKeywords,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
    } = useFilter()

    const [categories, setCategories] = useState<string[]>([])

    const keywordList = [
        "Apple",
        "Watch",
        "Fashion",
        "Trend",
        "Shoes",
        "Shirt"
    ]

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("https://dummyjson.com/products")
                const uniqueCategory = Array.from(
                    new Set(response.data.products.map((product: { category: string }) => product.category))
                ) as string[]
                setCategories(uniqueCategory)
            } catch (error) {
                console.error(`Error fetching categories: ${error}`)
            }
        }

        fetchCategories()
    }, [])

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinPrice(e.target.value ? parseFloat(e.target.value) : undefined)
    }

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxPrice(e.target.value ? parseFloat(e.target.value) : undefined)
    }

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
    }

    const handleResetFilter = () => {
        setKeywords("")
        setSelectedCategory("")
        setMinPrice(undefined)
        setMaxPrice(undefined)
    }

    return (
        <div className="h-screen mt-15 sm:mt-20 bg-amber-50 overflow-y-auto hide-scrollbar">

            <section>
                {/* Categories */}
                <div className="m-2">
                    <h2 className="font-bold sm:text-xl text-amber-950 mb-2">Categories</h2>
                    {categories.map((cat, index) => (
                        <div key={index} className="flex items-center p-1 text-sm sm:text-lg gap-2">
                            <label>
                                <input
                                    type="radio"
                                    value={cat}
                                    name="category"
                                    onChange={() => handleCategoryChange(cat)}
                                    checked={selectedCategory === cat}
                                />
                                {cat.toUpperCase()}
                            </label>
                        </div>
                    ))}
                </div>

                {/* Keywords */}
                <div className="m-2">
                    <h2 className="font-bold sm:text-xl text-amber-950 mb-2">Keywords</h2>
                    {keywordList.map((keywords, index) => (
                        <button
                            key={index}
                            className="rounded mb-1 block w-full text-left p-1 hover:bg-amber-950 hover:text-white cursor-pointer"
                            onClick={() => setKeywords(keywords)}
                        >
                            {keywords.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* Price Range */}
                <div className="m-2">
                    <h2 className="font-bold sm:text-xl text-amber-950 mb-2">Set Price</h2>
                    <div className="flex justify-between gap-2 flex-wrap items-center">
                        <input
                            type="number"
                            className="border p-1 w-20 text-sm"
                            placeholder="Min"
                            value={minPrice ?? ""}
                            onChange={handleMinPriceChange}
                        />
                        <input
                            type="number"
                            className="border p-1 w-20 text-sm"
                            placeholder="Max"
                            value={maxPrice ?? ""}
                            onChange={handleMaxPriceChange}
                        />
                    </div>
                </div>

                {/* Reset Filter Button */}
                <div className="m-2">
                    <button
                        className="bg-amber-950 text-white block w-full p-2 text-center cursor-pointer"
                        onClick={handleResetFilter}
                    >
                        Reset Filter
                    </button>
                </div>
            </section>
        </div>
    )
}
