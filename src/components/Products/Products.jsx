import '../../App.css'
import {useState, useEffect} from 'react'
import {ProductCard} from "../ProductCard/ProductCard.jsx";
import { useProducts } from '../../contexts/ProductsContext.jsx';

export function Products() {
    const { items, categories } = useProducts();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filteredItems, setFilteredItems] = useState(items);

    useEffect(() => {
        if (selectedCategories.length === 0) {
            setFilteredItems(items);
        } else {
            const filtered = items.filter(item =>
                selectedCategories.includes(item.categoryId)
            );
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            setFilteredItems(filtered);
        }
    }, [selectedCategories, items]);

    const handleCategoryToggle = (categoryId) => {
        setSelectedCategories(prev => {
            if (prev.includes(categoryId)) {
                return prev.filter(id => id !== categoryId);
            } else {
                return [...prev, categoryId];
            }
        });
    };

    return (
        <div className="flex flex-row justify-between gap-8">
            <div className="w-1/4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-bold mb-4">Категорії</h2>
                    <div className="flex flex-col gap-3">
                        {categories.map(category => (
                            <div
                                key={category.id}
                                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                                onClick={() => handleCategoryToggle(category.id)}
                            >
                                <div className="relative cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category.id)}
                                        readOnly={true}
                                        className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                                    />
                                </div>

                                <label
                                    htmlFor={`cat-${category.id}`}
                                    className="select-none flex-grow cursor-pointer"
                                >
                                    <span className={`${selectedCategories.includes(category.id) ? 'text-purple-700 font-medium' : 'text-gray-700'}`}>
                                        {category.name}
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>

                    {selectedCategories.length > 0 && (
                        <button
                            onClick={() => setSelectedCategories([])}
                            className="w-full mt-4 text-sm text-red-500 hover:text-red-700 py-2 cursor-pointer"
                        >
                            Скинути фільтри
                        </button>
                    )}
                </div>
            </div>

            <div className="w-3/4">
                {selectedCategories.length > 0 && (
                    <div className="mb-6 p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-700">Обрані категорії:</span>
                            {selectedCategories.map(categoryId => {
                                const category = categories.find(c => c.id === categoryId);
                                return (
                                    <div
                                        key={categoryId}
                                        onClick={() => handleCategoryToggle(categoryId)}
                                        className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm cursor-pointer"
                                    >
                                        {category.name}
                                        <button
                                            className="text-purple-500 hover:text-purple-800 cursor-pointer"
                                        >
                                            ×
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="productCardList grid grid-cols-3 gap-12">
                    {filteredItems.map((item, index) => (
                        <ProductCard key={index} item={item} category={categories.find(c => c.id === item.categoryId)} />
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg mb-4">Товари за вибраними категоріями не знайдені</p>
                        <button
                            onClick={() => setSelectedCategories([])}
                            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
                        >
                            Показати всі товари
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}