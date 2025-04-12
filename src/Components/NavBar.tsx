
import { Settings, User, ShoppingCart } from 'lucide-react';
import { useFilter } from './FilterContext';

export default function NavBar({ toggleSidebar }: { toggleSidebar: () => void }) {
    const { searchQuery, setSearchQuery } = useFilter();
    return (
        <div className="p-2 bg-amber-50 text-amber-950 font-medium">
            <div className="flex justify-between items-center mx-4">
                {/* Logo (clickable on mobile) */}
                <div
                    className="w-[60px] sm:w-[75px] z-50 block cursor-pointer sm:pointer-events-none"
                    onClick={toggleSidebar}
                >
                    <img
                        className="object-cover"
                        src="https://res.cloudinary.com/tushartharwani/image/upload/v1743948277/nsmxozcbpx5bwfoiwnlg.png"
                        alt="logo"
                    />
                </div>

                {/* Search */}
                <div className="bg-white border rounded-md sm:p-2 w-32 p-1 sm:w-72">
                    <input
                        type="text"
                        placeholder="Search Products"
                        className="w-full m-0 outline-none focus:border-none focus:ring-0"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Icons */}
                <div className="flex justify-center items-center gap-2 sm:gap-4 sm:justify-start">
                    <div className="rounded-2xl border cursor-pointer p-1 sm:p-2">
                        <ShoppingCart className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                    <div className="rounded-2xl border cursor-pointer p-1 sm:p-2">
                        <Settings className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                    <div className="rounded-2xl border cursor-pointer p-1 sm:p-2">
                        <User className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                </div>
            </div>
        </div>
    );
}

