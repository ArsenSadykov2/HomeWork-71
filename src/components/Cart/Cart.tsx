import React from "react";
import { DishItem } from "../../types";

interface CartProps {
    cart: DishItem[];
}

const Cart: React.FC<CartProps> = ({ cart }) => {
    return (
        <div>
            <h3>Ваша корзина</h3>
            {cart.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>
                            <h4>{item.name}</h4>
                            <p>Цена: {item.price} ₽</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;