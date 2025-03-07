import React from "react";
import { DishItem } from "../../types";

interface DishesProps {
    dishes: DishItem[];
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

const Dishes: React.FC<DishesProps> = ({ dishes, onDelete, onEdit }) => {
    return (
        <div className="row">
            {dishes.map((dish) => (
                <div key={dish.id} className="col-md-4 mb-4">
                    <div className="card h-100">
                        <img
                            src={dish.image}
                            alt={dish.name}
                            className="card-img-top img-fluid"
                            style={{ height: "200px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                            <h5 className="card-title">{dish.name}</h5>
                            <p className="card-text">Цена: {dish.price} ₽</p>
                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-danger"
                                    onClick={() => onDelete(dish.id)}
                                >
                                    Удалить
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => onEdit(dish.id)}
                                >
                                    Редактировать
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Dishes;