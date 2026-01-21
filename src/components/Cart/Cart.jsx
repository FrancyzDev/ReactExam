import { Link, useNavigate } from 'react-router';
import '../../App.css';
import { useCart } from '../../contexts/CartContext.jsx';

export function Cart() {
    const { cart, removeFromCart, updateQuantity, clearCart, deliveryPrice } = useCart();
    const navigate = useNavigate();

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + deliveryPrice;

    const handleIncreaseQuantity = (id) => {
        const item = cart.find(item => item.id === id);
        if (item) {
            updateQuantity(id, item.quantity + 1);
        }
    };

    const handleDecreaseQuantity = (id) => {
        const item = cart.find(item => item.id === id);
        if (item && item.quantity > 1) {
            updateQuantity(id, item.quantity - 1);
        } else {
            removeFromCart(id);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            {cart.length === 0 ? (
                <div className="text-center py-12">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Ваш кошик порожній</h2>
                        <p className="text-gray-500 mb-6">Додайте товари, щоб зробити замовлення</p>
                    </div>
                    <Link
                        to="/products"
                        className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
                    >
                        Перейти до каталогу
                    </Link>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold">
                                        Товари в кошику ({cart.length})
                                    </h2>
                                    <button
                                        onClick={clearCart}
                                        className="text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer"
                                    >
                                        Очистити кошик
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0">
                                            <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="flex-grow">
                                                <div className="flex justify-between">
                                                    <div>
                                                        <h3 className="font-medium text-lg mb-1">
                                                            <Link
                                                                to={`/products/product/${item.id}`}
                                                                className="hover:text-purple-600"
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        </h3>
                                                        <p className="text-gray-500 text-sm mb-1">{item.type}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-gray-400 hover:text-red-500 text-lg cursor-pointer"
                                                    >
                                                        ×
                                                    </button>
                                                </div>

                                                <div className="flex justify-between items-center mt-4">
                                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                                        <button
                                                            onClick={() => handleDecreaseQuantity(item.id)}
                                                            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer"
                                                        >
                                                            −
                                                        </button>
                                                        <span className="w-12 text-center font-medium">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => handleIncreaseQuantity(item.id)}
                                                            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer"
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <div className="text-right">
                                                        <div className="text-lg font-bold">
                                                            {item.price * item.quantity} грн.
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {item.price} грн./шт
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                to="/products"
                                className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
                            >
                                ← Продовжити покупки
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
                            <h2 className="text-xl font-semibold mb-6">Сума замовлення</h2>

                            <div className="space-y-4 mb-6">
                                <div className="space-y-2">
                                    {cart.map(item => (
                                        <div key={item.id} className="flex justify-between">
                                            <span className="text-gray-600">{item.name} × {item.quantity}</span>
                                            <span className="font-medium">{item.price * item.quantity} грн.</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600">Доставка</span>
                                    <span className="font-medium">{deliveryPrice} грн.</span>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Разом</span>
                                        <span>{total} грн.</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 mb-4 cursor-pointer"
                            >
                                Оформити замовлення
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}