import '../../App.css'
import { Link } from "react-router";

export function ProductCard(props) {
    return (
        <Link to={`/products/product/${props.item.id}`} className="productCard flex flex-col gap-2">
            <div className="h-64 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
                <img
                    className="max-w-full max-h-full object-contain"
                    src={props.item.image}
                    alt={props.item.name}
                />
            </div>

            <p className="productName text-lg font-bold">
                {props.item.name}
            </p>

            <div>
                {props.category && (
                    <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded">
                        {props.category.name}
                    </span>
                )}
            </div>


            {props.item.type && (
                <p className="text-sm text-gray-500">
                    {props.item.type}
                </p>
            )}

            <div className="mt-auto">
                <p className="productPrice text-xl font-bold text-purple-700">
                    {props.item.price} грн.
                </p>
            </div>
        </Link>
    );
}