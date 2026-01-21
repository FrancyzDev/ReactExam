import {BrowserRouter, Routes, Route, Link} from 'react-router';
import './App.css'
import { CartProvider } from './contexts/CartContext.jsx';
import { ProductsProvider } from './contexts/ProductsContext.jsx'; // новый провайдер
import {Home} from './components/Home/Home.jsx'
import {Products} from './components/Products/Products.jsx'
import {ProductPage} from './components/ProductPage/ProductPage.jsx'
import {Shopbag} from './components/Shopbag/Shopbag.jsx'
import {Cart} from './components/Cart/Cart.jsx'
import telegram from './images/telegram.svg'
import {Checkout} from "./components/Checkout/Checkout.jsx";
import {OrderSuccess} from "./components/OrderSuccess/OrderSuccess.jsx";


function App() {
    return <ProductsProvider>
        <CartProvider>
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
                        <Route path="/products" element={<Products/>}/>
                        <Route path="/products/product/:productId" element={<ProductPage/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/checkout" element={<Checkout/>}/>
                        <Route path="/order-success" element={<OrderSuccess/>}/>
                    </Routes>
                </main>
            </BrowserRouter>
        </CartProvider>
    </ProductsProvider>
}

export default App
