import '../../App.css'
import { useParams, useNavigate } from "react-router";
import { useCart } from '../../contexts/CartContext.jsx';
import { useProducts } from '../../contexts/ProductsContext.jsx';
import { Notification } from "../Notification/Notification.jsx";
import {useState} from "react";

export function ProductPage() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { items, categories } = useProducts();
    const product = items.find(item => item.id === parseInt(productId));
    const [showNotification, setShowNotification] = useState(false);

    const handleNotification = () => {
        setShowNotification(true);

        setTimeout(() => {
            setShowNotification(false);
        }, 2000);
    };

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-red-500 mb-4">
                    Товар не знайдено
                </h2>
                <p className="mb-6">Товар із ID {productId} немає</p>
                <button
                    onClick={() => navigate('/products')}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
                >
                    Повернутись до каталогу
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="text-purple-600 hover:text-purple-800 flex items-center gap-2 mb-4 cursor-pointer"
                >
                    ← Назад
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="rounded-xl overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto max-h-[500px] object-contain"
                    />
                </div>

                <div>
                    <div className="mb-4">
                        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                        {categories.find(c => c.id === product.categoryId) && (
                            <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded mb-2">
                                {categories.find(c => c.id === product.categoryId).name}
                            </span>
                        )}
                        <p className="text-gray-600 text-lg mt-2">{product.type}</p>
                    </div>

                    <div className="mb-4">
                        <div className="text-2xl font-bold text-purple-700">
                            {product.price} грн.
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="font-semibold mb-3 text-lg">Опис</h3>
                        <p className="text-gray-700">
                            {product.description}
                        </p>
                    </div>

                    <button onClick={() => {
                        addToCart({
                            id: product.id,
                            name: product.name,
                            type: product.type,
                            price: product.price,
                            image: product.image,
                            quantity: 1,
                            addedAt: new Date().toISOString()
                        });
                        handleNotification()
                    }} className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium cursor-pointer">
                        Додати до кошика
                    </button>
                    {showNotification && <Notification text="Товар додано до кошика!" />}
                </div>
            </div>
        </div>
    )
}