import '../../App.css'
import { useState } from 'react'
import {Link, useNavigate} from "react-router"
import { useCart } from '../../contexts/CartContext.jsx'
const token = "8404763057:AAG4aOnK5IVRsW8xSGCYQNW8YdG7QiGbxog";
const telegramUrl = "https://api.telegram.org/bot" + token;

async function sendOrderData(orderData) {
    try {
        const message = `
📋 НОВЕ ЗАМОВЛЕННЯ

👤 КЛІЄНТ:
• Ім'я: ${orderData.customer.fullName}
• Телефон: ${orderData.customer.phone}
• Email: ${orderData.customer.email}
• Чекає дзвінка: ${orderData.customer.waitForCall ? 'Так' : 'Ні'}

🛒 ЗАМОВЛЕННЯ:
• Номер замовлення: №${Math.floor(orderData.order.orderDate / 1000)}
• Дата: ${new Date(orderData.order.orderDateHumanType).toLocaleString('uk-UA')}
• Кількість товарів: ${orderData.order.itemsCount}
• Сума: ${orderData.order.totalAmount} ₴

📦 ТОВАРИ:
${orderData.order.items.map((item, index) =>
`${index + 1}. ${item.name}
     Кількість: ${item.quantity}
     Ціна: ${item.price} ₴
     Сума: ${item.total} ₴\n`
).join('\n')}

📊 ЗАГАЛЬНА СУМА: ${orderData.order.totalAmount} ₴
`;
        const url = telegramUrl + `/sendMessage?chat_id=954555739&text=${encodeURIComponent(message)}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }
        })

        if (!response.ok) {
            const errorMessage = `HTTP ${response.status}: ${await response.text()}`;
            console.log(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export function Checkout() {
    const navigate = useNavigate()
    const { cart, clearCart, deliveryPrice } = useCart()

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        waitForCall: false
    })

    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.fullName.trim()) newErrors.fullName = 'Введіть ПIБ'
        if (!formData.phone.trim()) {
            newErrors.phone = 'Введіть номер телефону'
        } else if (!/^\+380[\s-]?\d{2}[\s-]?\d{3}[\s-]?\d{4}$/.test(formData.phone.trim())) {
            newErrors.phone = 'Введіть правильний номер телефону у форматі: +380 ** *** ***'
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Введіть email'
        } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}(?:\.[A-Za-z]{2,})?$/.test(formData.email.trim())) {
            newErrors.email = 'Введіть правильну адресу електронної пошти'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        if (cart.length === 0) {
            alert('Корзина пуста')
            return
        }

        setIsSubmitting(true)
        const orderDate = Date.now()
        const orderDateHumanType = new Date(orderDate).toISOString()
        try {
            const orderData = {
                customer: {
                    fullName: formData.fullName,
                    phone: formData.phone,
                    email: formData.email,
                    waitForCall: formData.waitForCall
                },
                order: {
                    items: cart.map(item => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        total: item.price * item.quantity
                    })),
                    totalAmount: total,
                    itemsCount,
                    orderDate: orderDate,
                    orderDateHumanType: orderDateHumanType
                },
            }
            await sendOrderData(orderData)
            clearCart()
            navigate('/order-success', {
                state: {
                    orderNumber: orderDate,
                    totalAmount: total,
                    waitForCall: formData.waitForCall
                }
            })
        } catch (error) {
            console.error('Ошибка при оформлении заказа:', error)
            alert('Произошла ошибка при оформлении заказа. Попробуйте еще раз.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-purple-600 mb-4">
                    Ваш кошик порожній
                </h2>
                <p className="mb-6">Додайте товари в кошик для оформлення замовлення</p>
                <button
                    onClick={() => navigate('/products')}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                    Перейти до товарів
                </button>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="text-purple-600 hover:text-purple-800 flex items-center gap-2 mb-4 cursor-pointer"
                >
                    ← Назад
                </button>
            </div>

            <h1 className="text-3xl font-bold mb-8 text-center">Оформлення замовлення</h1>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-6 text-purple-700">
                        Ваші дані
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    ПIБ *
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Iванов Iван Iванович"
                                />
                                {errors.fullName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                                )}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Номер телефону *
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                    errors.phone ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="+380 XX XXX XX XX"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Електронна пошта *
                            </label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="example@email.com"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div className="mb-8">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="waitForCall"
                                    checked={formData.waitForCall}
                                    onChange={handleInputChange}
                                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                                />
                                <span className="ml-3 text-gray-700">
                                    Я чекаю дзвінка від менеджера для підтвердження замовлення
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Оформлення...' : `Оформити замовлення за ${total + deliveryPrice} грн`}
                        </button>
                    </form>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-6 text-purple-700">
                        Ваше замовлення ({itemsCount} товар{itemsCount > 1 ? "а" : ""})
                    </h2>

                    <div className="space-y-4 mb-6">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-contain rounded"
                                />
                                <div className="flex-1">
                                    <Link
                                        to={`/products/product/${item.id}`}
                                        className="hover:text-purple-600"
                                    >
                                        <h3 className="font-semibold">{item.name}</h3>
                                    </Link>
                                    <p className="text-sm text-gray-600">{item.type}</p>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-lg font-bold text-purple-700">
                                            {item.price} грн × {item.quantity}
                                        </span>
                                        <span className="text-lg font-bold">
                                            {item.price * item.quantity} грн
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg text-gray-700">Товари ({itemsCount} шт.)</span>
                            <span className="text-lg">{total} грн</span>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg text-gray-700">Доставка</span>
                            <span className="text-lg text-gray-700">{deliveryPrice} грн</span>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t mt-4">
                            <span className="text-2xl font-bold">Разом</span>
                            <span className="text-2xl font-bold text-purple-700">
                                {total + deliveryPrice} грн
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 text-sm text-gray-500">
                        <p className="mb-2">* - обов'язкові поля для заповнення</p>
                        <p>Після оформлення замовлення з вами зв'яжеться менеджер для уточнення деталей доставки, якщо ви обрали цей варіант</p>
                    </div>
                </div>
            </div>
        </div>
    )
}