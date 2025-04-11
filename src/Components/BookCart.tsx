import { Link } from "react-router-dom";

interface BookCartProps {
    id: string;
    title: string;
    image: string;
    price: number;
}

export default function BookCart({ id, title, image, price }: BookCartProps) {
    return (
        <div className="rounded p-4 shadow-lg m-2">
            <Link to={`/product/${id}`}>
                <img src={image} alt={title}
                    className="w-full object-cover mb-2 mix-blend-multiply" />
                <h2 className="font-bold text-amber-950">{title}</h2>
                <p className="font-semibold">₹ {price}</p>
            </Link>
        </div>
    );
}
