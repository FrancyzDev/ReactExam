import React, { Component } from 'react';
import { Link } from "react-router";
import '../../App.css';

export class ProductCard extends Component {
    render() {
        const { item, category } = this.props;

        return (
            <Link to={`/products/product/${item.id}`} className="productCard flex flex-col gap-2">
                <div className="h-64 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
                    <img
                        className="max-w-full max-h-full object-contain"
                        src={item.image}
                        alt={item.name}
                    />
                </div>

                <p className="productName text-lg font-bold">
                    {item.name}
                </p>

                <div>
                    {category && (
                        <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded">
                            {category.name}
                        </span>
                    )}
                </div>

                {item.type && (
                    <p className="text-sm text-gray-500">
                        {item.type}
                    </p>
                )}

                <div className="mt-auto">
                    <p className="productPrice text-xl font-bold text-purple-700">
                        {item.price} грн.
                    </p>
                </div>
            </Link>
        );
    }
}