import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchProducts, fetchCategories } from '../firebase/db.jsx';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const updateProducts = async () => {
        try {
            setLoading(true);
            const products = await fetchProducts();
            products.sort((a, b) => a.name.localeCompare(b.name));
            const categories = await fetchCategories();
            categories.sort((a, b) => a.name.localeCompare(b.name));
            setItems(products);
            setCategories(categories);
            setError(null);
        } catch (err) {
            console.error("Ошибка загрузки: ", err);
            setError("Не удалось загрузить товары");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        updateProducts();
    }, []);

    const getProductById = (id) => {
        return items.find(item => item.id === parseInt(id));
    };

    const getProductsByCategory = (categoryId) => {
        return items.filter(item => item.categoryId === categoryId);
    };

    const value = {
        items,
        categories,
        loading,
        error,
        updateProducts,
        getProductById,
        getProductsByCategory
    };

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }
    return context;
}