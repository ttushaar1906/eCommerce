import { Link } from "react-router-dom";
import {  Spin } from "antd";
import { useState } from "react";

interface BookCartProps {
    id: string;
    title: string;
    image: string;
    price: number;
}

export default function BookCart({ id, title, image, price }: BookCartProps) {
    const [imageLoading, setImageLoading] = useState(true);

    return (
        <div className="rounded p-4 shadow-lg bgColor m-2 relative">
            <Link to={`/product/${id}`}>
                <div className="relative w-full h-48 flex items-center justify-center">
                    {imageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 mb-20">
                            <Spin size="large" />
                        </div>
                    )}
                    <img
                        src={image}
                        alt={title}
                        onLoad={() => setImageLoading(false)}
                        className={`w-full h-full object-cover mb-2 mix-blend-multiply transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                    />
                </div>
                <h2 className="font-bold text-indigo-950 mt-2">{title}</h2>
                <p className="font-semibold">₹ {price}</p>
            </Link>
        </div>
    );
}
