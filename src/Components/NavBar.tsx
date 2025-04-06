
import { Settings, User, ShoppingCart } from 'lucide-react';
export default function NavBar() {
    return (
        <div className="border-2 border-black p-2 bg-amber-50 text-amber-950 font-medium">
            <div className="flex justify-between items-center mx-4 ">
                {/* Logo */}
                <div className="w-20">
                    <img src="" alt="logo" className="w-full object-contain" />
                </div>
                {/* Search */}
                {/* Remove highlight after click*/}
                <div className="bg-white border rounded-md p-2 w-72">
                    <input
                        type="text"
                        placeholder="Search Products"
                        className="w-full m-0 outline-none focus:border-none focus:ring-0"
                    />
                </div>
                {/* Settings, logo */}
                <div className="flex justify-center items-center gap-4">
                    <div className="rounded-2xl border cursor-pointer p-2"><ShoppingCart /></div>
                    <div className="rounded-2xl border cursor-pointer p-2"><Settings /></div>
                    <div className="rounded-2xl border cursor-pointer p-2"><User /></div>
                </div>
            </div>
        </div>
    )
}
