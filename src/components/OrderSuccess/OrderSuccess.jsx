import '../../App.css'
import { useLocation, useNavigate } from "react-router"
import { useCart } from "../../contexts/CartContext.jsx"

export function OrderSuccess() {
    const { deliveryPrice } = useCart()
    const location = useLocation()
    const navigate = useNavigate()
    const { orderNumber, totalAmount, waitForCall } = location.state || {}

    return (
        <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
            <div className="mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold mb-4 text-green-600">
                    Заказ успешно оформлен!
                </h1>

                <p className="text-lg text-gray-600 mb-2">
                    Спасибо за ваш заказ!
                </p>

                {orderNumber && (
                    <p className="text-gray-700 mb-4">
                        Номер вашего заказа: <span className="font-bold">№{Math.floor(orderNumber / 1000)}</span>
                    </p>
                )}

                {totalAmount && (
                    <p className="text-gray-700 mb-6">
                        Сумма заказа: <span className="font-bold text-purple-700">{totalAmount + deliveryPrice} грн</span>
                    </p>
                )}

                {waitForCall && (
                    <p className="text-gray-600 mb-8">
                    {"Ми зв'яжемося з вами найближчим часом для підтвердження замовлення та уточнення деталей доставки"}
                    </p>
                )}
            </div>

            <div className="space-y-4">
                <button
                    onClick={() => navigate('/')}
                    className="w-full md:w-auto bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium cursor-pointer"
                >
                    Вернуться на главную
                </button>

                <button
                    onClick={() => navigate('/products')}
                    className="w-full md:w-auto bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium ml-4 cursor-pointer"
                >
                    Продолжить покупки
                </button>
            </div>

            <div className="mt-12 pt-8 border-t">
                <p className="text-gray-500 text-sm">
                    Если у вас возникли вопросы, свяжитесь с нами через <a className={"text-gray-500 hover:text-purple-700 transition-colors text-xl"} href="https://t.me/artemmaltsevwork">Telegram</a>
                </p>
            </div>
        </div>
    )
}