import '../../App.css'
import shopbag from '../../images/shop-bag.svg'
import {Link} from "react-router";
import { useCart } from '../../contexts/CartContext.jsx';

export function Shopbag() {
    const { getTotalItems } = useCart();
    const totalItems = getTotalItems();

    return (
        <Link to="/cart" className="nav-link">
            <div className="relative">
                <div className="fixed top-30 right-6 z-50">
                    <div className="rounded-full p-3 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105">
                        <img className="w-12 h-12" src={shopbag} alt="Корзина" />
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">
                            {totalItems}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}