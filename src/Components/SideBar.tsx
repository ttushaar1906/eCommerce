import axios from 'axios'
import { useEffect, useState } from 'react'
import { data } from 'react-router-dom'

export default function SideBar() {
    interface Product {
        category: string
    }

    interface fetchProduct {
        products: Product[]
    }

    const [category, setCategory] = useState<string[]>([])
    const [keywords] = useState<String[]>([
        "Phone",
        "Fashion",
        "Watches",
        "Shoes",
        "Sports"
    ])
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("https://dummyjson.com/products")
                // const data:FetchResponse = await response.json()
                console.log(response);

                const uniqueCategory = Array.from(new Set(response.data.products.map((product => product.category))))
                console.log(uniqueCategory);

                setCategory(uniqueCategory)

            } catch (error) {
                console.log(`Error fetching Categories ${error}`);
            }
        }
        fetchCategories()
    }, [])
    return (
        <div className="w-56 h-screen bg-amber-50">
            <h2 className="font-bold text-2xl">ShopIt</h2>
            {/* Next will be for range */}
        </div>
    )
}
