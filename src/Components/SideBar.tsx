import axios from 'axios'
import { useEffect, useState } from 'react'
import { useFilter } from './FilterContext'

export default function SideBar() {
    interface Product {
        category: string
    }

    interface fetchProduct {
        products: Product[]
    }

    const {
        keywords,
        setKeywords,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
    } = useFilter()


    const [category, setCategory] = useState<string[]>([])
    const [keyword] = useState<string[]>([
        "Apple",
        "Watch",
        "Fashion",
        "Trend",
        "Shoes",
        "Shirt"
    ]);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("https://dummyjson.com/products")
                const uniqueCategory = Array.from(new Set(response.data.products.map((product => product.category))))
                setCategory(uniqueCategory)

            } catch (error) {
                console.log(`Error fetching Categories ${error}`);
            }
        }
        fetchCategories()
    }, [])


    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setMinPrice(value ? parseFloat(value) : undefined)
    }

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setMaxPrice(value ? parseFloat(value) : undefined)
    }

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
    }

    const handleKeywordChage = (keywords: string) => {
        setKeywords(keywords)
    }

    const handleResetFilter = () => {
        setMaxPrice(undefined)
        setMinPrice(undefined)
        setSelectedCategory("")
        setKeywords("")

    }

    return (
        <div className="w-56 h-screen bg-amber-50 overflow-y-auto">
            <div className='w-[75px] block '>
                <img
                    className='mx-4'
                    src="https://res.cloudinary.com/tushartharwani/image/upload/v1743948277/nsmxozcbpx5bwfoiwnlg.png" alt="" />
            </div>


            <section>
                <section className='m-2'>
                    <div className='mb-2'>
                        <h2 className="font-bold text-xl  text-amber-950">
                            Categories
                        </h2>
                    </div>

                    {category.map((category, index) => (
                        <div key={index} className="flex items-center p-1 gap-2">
                            <label>
                                <input
                                    type="radio"
                                    value={category}
                                    name="category"
                                    onChange={() => handleCategoryChange(category)}
                                    checked={selectedCategory === category}
                                />
                                {category.toUpperCase()}
                            </label>
                        </div>
                    ))}


                </section>

                <section className='m-2'>
                    <div className='mb-2'>
                        <h2 className="font-bold text-xl  text-amber-950">
                            Keywords
                        </h2>
                    </div>

                    {keyword.map((kw, index) => (
                        <button
                            key={index}
                            className='rounded mb-1 shadow-2xl block w-full text-left p-1 hover:bg-amber-950 hover:text-white cursor-pointer'
                            onClick={() => handleKeywordChage(kw)} 
                        >
                            {kw.toUpperCase()}
                        </button>
                    ))}


                </section>

                <section className='m-2'>
                    <div className='mb-2'>
                        <h2 className="font-bold text-xl  text-amber-950">
                            Set Price
                        </h2>
                    </div>
                    <div className="flex justify-between gap-2">
                        <input type="number"
                            className='border p-1 w-20 text-sm no-spinner' placeholder='Min Value'
                            value={minPrice ?? ""}
                            onChange={handleMinPriceChange} />
                        <input type="number"
                            className='border p-1 w-20 text-sm no-spinner' placeholder='Max Value'
                            value={maxPrice ?? ""}
                            onChange={handleMaxPriceChange} />
                    </div>
                </section>

                <div className='m-2'>
                    <button
                        className='bg-amber-950 text-white block w-full p-2 text-center cursor-pointer'
                        onClick={handleResetFilter}>
                        Reset Filter
                    </button>
                </div>
            </section>
        </div>
    )
}
