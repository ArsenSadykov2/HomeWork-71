import { useEffect, useState, useCallback } from "react";
import axiosApi from "../../axiosApi.ts";
import { DishItem } from "../../types";
import { useLocation } from "react-router-dom";
import ToolBarAdmin from "../ToolBar/ToolBarAdmin.tsx";

interface Order {
    id: string;
    items: DishItem[];
    total: number;
}

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosApi.get('/pizza-orders.json');
            const ordersData = response.data;

            if (ordersData) {
                const ordersList: Order[] = Object.keys(ordersData).map((orderId) => {
                    const order = ordersData[orderId];
                    return {
                        id: orderId,
                        ...order,
                    };
                });
                setOrders(ordersList);
            } else {
                setOrders([]);
            }
        } catch (e) {
            console.error("Ошибка при загрузке заказов:", e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (location.pathname === '/admin/orders') {
            void fetchOrders();
        }
    }, [fetchOrders, location.pathname]);

    const handleCompleteOrder = async (orderId: string) => {
        try {
            setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));

            await axiosApi.delete(`/pizza-orders/${orderId}.json`);
        } catch (e) {
            console.error("Ошибка при удалении заказа:", e);
        }
    };

    return (
        <>
            <header><ToolBarAdmin /></header>
            <main className="container mt-4">
                <h2 className="mb-4">Заказы</h2>
                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Загрузка...</span>
                        </div>
                    </div>
                ) : (
                    <div className="row">
                        {orders.map((order) => (
                            <div key={order.id} className="col-md-6 mb-4">
                                <div className="card shadow-sm">
                                    <div className="card-header bg-primary text-white">
                                        <h5 className="card-title mb-0">Заказ #{order.id}</h5>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group list-group-flush">
                                            {order.items.map((item) => (
                                                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h6 className="mb-1">{item.name}</h6>
                                                        <small className="text-muted">{item.price} руб.</small>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-3 d-flex justify-content-between align-items-center">
                                            <h5 className="mb-0">Итого: {order.total} руб.</h5>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleCompleteOrder(order.id)}
                                            >
                                                Complete Order
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </>
    );
};

export default Orders;