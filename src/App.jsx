import {BrowserRouter, Routes, Route, Link} from 'react-router';
import {useEffect, useState} from 'react'
import './App.css'
import { CartProvider } from './contexts/CartContext.jsx';
import {Home} from './components/Home/Home.jsx'
import {Products} from './components/Products/Products.jsx'
import {ProductPage} from './components/ProductPage/ProductPage.jsx'
import {Shopbag} from './components/Shopbag/Shopbag.jsx'
import {Cart} from './components/Cart/Cart.jsx'
import telegram from './images/telegram.svg'
import {fetchProducts} from './firebase/db.js'

function App() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const products = await fetchProducts();
                setItems(products);
                setError(null);
            } catch (err) {
                console.error("Ошибка загрузки: ", err);
                setError("Не удалось загрузить товары");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    return <CartProvider>
        <BrowserRouter>
            <nav className="nav">
                <ul className="nav-list text-2xl">
                    <div className="flex items-center gap-4">
                        <li className="nav-item"><Link to="/" className="nav-link">Головна</Link></li>
                        <li className="nav-item"><Link to="/products" className="nav-link">Парфюми</Link></li>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="https://t.me/artemmaltsevwork"><img className="w-12 h-12" src={telegram}/></a>
                    </div>
                    </ul>
            </nav>
            <Shopbag/>
            <main className="content">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/products" element={<Products items={items} />}/>
                    <Route path="/products/product/:productId" element={<ProductPage items={items}/>}/>
                    <Route path="/cart" element={<Cart items={items}/>}/>
                    <Route path="/admin" element={<Home/>}></Route>
                </Routes>
            </main>
        </BrowserRouter>
    </CartProvider>
}

export default App
