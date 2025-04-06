import { Settings, User, ShoppingCart } from 'lucide-react';
import TopMerchants from './TopMerchants';
import { useFilter } from './FilterContext';

function Home() {
    const {
        searchQuery,
        setSearchQuery
    } = useFilter()

    return (
        <div className=' w-screen'>
            <div className="p-2 bg-amber-50 text-amber-950 font-medium">
                <div className="flex justify-between items-center mx-4 ">
                    {/* Search */}
                    <div className="bg-white border rounded-md p-2 w-72">
                        <input
                            type="text"
                            placeholder="Search Products"
                            className="w-full m-0 outline-none focus:border-none focus:ring-0"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
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
            <div className='w-full'>
                <img src="https://res.cloudinary.com/tushartharwani/image/upload/v1743928243/q3zabyuec5duluxb9xzz.png" alt="banner" />
            </div>
            <div>
                <TopMerchants />
            </div>
        </div>
    )
}

export default Home