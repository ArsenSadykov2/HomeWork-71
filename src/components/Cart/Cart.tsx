import React from 'react';
import { DishItem } from '../../types';

interface CartProps {
    cart: DishItem[];
    onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ cart, onRemove }) => {
    return (
        <div>
            <h3>Корзина</h3>
            {cart.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                <ul>
                    {cart.map((dish) => (
                        <li key={dish.id}>
                            <span>{dish.name} - {dish.price} руб.</span>
                            <button
                                onClick={() => onRemove(dish.id)}
                                style={{ marginLeft: '10px' }}
                            >
                                Удалить
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;