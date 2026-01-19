import '../../App.css'
import {Link} from "react-router";

export function ProductCard(props) {
    return (
        <Link to={`/products/product/${props.item.id}`} className="productCard flex flex-col gap-3">
            <div className="h-full overflow-hidden">
                <img
                    className="max-w-full max-h-full object-contain"
                    src={props.item.image}
                    alt={props.item.name}
                />
            </div>
            <p className="productName text-[18px] font-bold">{props.item.name}</p>
            <p className="productType text-[12px] opacity-[0.7]">{props.item.type}</p>
            <p className="productPrice text-[14px]">{props.item.price} грн.</p>
        </Link>
    )
}