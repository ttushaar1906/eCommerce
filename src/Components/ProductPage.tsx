import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Skeleton, Spin } from "antd"

export default function ProductPage() {
    interface Product {
        id: number
        title: string
        description: string
        price: number
        rating: number
        images: string[]
    }

    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [product, setProduct] = useState<Product | null>(null)
    const [imageLoading, setImageLoading] = useState(true)
    const [recentProducts, setRecentProducts] = useState<Product[]>([])

    // Load recent products from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("recentProducts")
        if (stored) {
            setRecentProducts(JSON.parse(stored))
        }
    }, [])

    useEffect(() => {
        if (id) {
            axios.get(`https://dummyjson.com/products/${id}`)
                .then(response => {
                    const fetchedProduct = response.data
                    setProduct(fetchedProduct)
                    setImageLoading(true)
                    setRecentProducts(prev => {
                        const existing = prev.filter(p => p.id !== fetchedProduct.id)
                        const updated = [fetchedProduct, ...existing].slice(0, 5)
                        localStorage.setItem("recentProducts", JSON.stringify(updated))
                        return updated
                    })
                })
                .catch(error => {
                    console.log("failed to fetch ", error)
                });
        }
    }, [id])

    if (!product) return <Skeleton />

    return (
        <div>
            <button onClick={() => navigate(-1)} className="bg-indigo-950 text-amber-50 p-4 rounded m-4 cursor-pointer">Back</button>
            <div className="flex flex-col sm:flex-row">

                <div className=" sm:w-2/3 p-4 shadow-xl rounded-lg">
                    <div className="relative w-full flex justify-center">
                        {imageLoading && (
                            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                                <Spin size="large" />
                            </div>
                        )}
                        <img
                            src={product.images?.[0]}
                            alt="productImage"
                            className={`w-[50%] block mx-auto object-cover ${imageLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
                            onLoad={() => setImageLoading(false)}
                        />
                    </div>

                    <h2 className="font-bold text-lg sm:text-xl text-indigo-950 mb-2">{product.title}</h2>
                    <p className="sm:text-xl my-2">{product.description}</p>

                    <div className="flex justify-between">
                        <p className="my-4 font-semibold text-lg">₹ {product.price} /-</p>
                        <p className="my-4 font-semibold text-lg">⭐ {product.rating}</p>
                    </div>
                </div>

                <div className="sm:w-1/3 p-4 ">
                    <h2 className="font-bold text-lg sm:text-xl text-indigo-950 mb-4 text-center">Recently Viewed</h2>
                    {recentProducts.map((item) => (
                        <div key={item.id} className="mb-2 border-b flex items-center ">
                            <img src={item.images[0]} alt={item.title} className="w-20 h-20 object-cover mr-2" />
                            <p className="font-semibold">{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
