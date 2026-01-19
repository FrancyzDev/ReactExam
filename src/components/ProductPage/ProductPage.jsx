import '../../App.css'
import { Link, useParams, useNavigate } from "react-router";
import { useCart } from '../../contexts/CartContext.jsx';

export function ProductPage({ items }) {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const product = items.find(item => item.id === parseInt(productId));

    console.log("Product ID:", productId);
    console.log("Found product:", product);

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
                    className="text-purple-600 hover:text-purple-800 flex items-center gap-2 mb-4"
                >
                    ← Ще
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Изображение товара */}
                <div className="rounded-xl overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto max-h-[500px] object-contain"
                    />
                </div>

                {/* Информация о товаре */}
                <div>
                    <div className="mb-4">
                        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                        <p className="text-gray-600 text-lg">{product.type}</p>
                    </div>

                    <div className="mb-6">
                        <div className="text-2xl font-bold text-purple-700">
                            {product.price} грн.
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="font-semibold mb-3 text-lg">Описание</h3>
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
                    }} className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                        Добавить в корзину
                    </button>
                </div>
            </div>
        </div>
    )
}