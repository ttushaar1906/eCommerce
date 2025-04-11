import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

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

    useEffect(() => {
        if (id) {
            axios.get(`https://dummyjson.com/products/${id}`)
                .then(response => {
                    setProduct(response.data)
                })
                .catch(error => { console.log("failed to fetch ", error) });
        }
    }, [id])

    if (!product) {
        return <h2>Loading .....</h2>
    }

    return (
        <div>
            <button onClick={() => navigate(-1)} className="bg-amber-950 text-amber-50 p-4 rounded m-4 cursor-pointer">Back</button>

            <div className="border w-1/2 block mx-auto p-4">
                <img src={product.images[0]} alt="productImage" className="w-[50%] block mx-auto object-cover
" />
                <h2 className="font-bold text-2xl text-amber-950 ">{product.title}</h2>
                <p className="text-xl my-2">{product.description}</p>

                <div className="flex justify-between">
                    <p className="my-4 font-semibold text-lg">₹ {product.price} /-</p>
                    <p className="my-4 font-semibold text-lg">⭐ {product.rating}</p>
                </div>
            </div>

        </div>
    )
}
