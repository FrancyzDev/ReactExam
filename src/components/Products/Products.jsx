import '../../App.css'
import {ProductCard} from "../ProductCard/ProductCard.jsx";

export function Products(props) {
    return (
        <div className="productCardList grid grid-cols-3 gap-20">
            {props.items.map((item, index) => (
                <ProductCard key={index} item={item}/>
            ))}
        </div>
    )
}