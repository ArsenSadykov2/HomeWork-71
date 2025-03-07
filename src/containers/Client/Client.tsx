import ToolBarClient from "../../components/ToolBar/ToolBarClient.tsx";
import { useCallback, useEffect, useState } from "react";
import { DishAPI, DishItem } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";
import axiosApi from "../../axiosApi.ts";
import Dishes from "../../components/Dishes/Dishes.tsx";
import Modal from "../../components/UI/Modal/Modal.tsx";
import Loader from "../../components/UI/Loader/Loader.tsx";
import Cart from "../../components/Cart/Cart.tsx";

const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4OMj5wUP1aEMBRTXKgBuBvaK-InimrUo0OPDSGLx_tbAAJlbMYedvO1A&s';

const Client = () => {
    const [dishes, setDishes] = useState<DishItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDish, setSelectedDish] = useState<DishItem | null>(null);
    const [cart, setCart] = useState<DishItem[]>([]);
    const [showCartModal, setShowCartModal] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    const fetchDishes = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosApi<DishAPI | null>('/pizza-dishes.json');
            const dishesListObject = response.data;

            if (!dishesListObject) {
                setDishes([]);
            } else {
                const dishesListArray: DishItem[] = Object.keys(dishesListObject).map((dishId) => {
                    const dish = dishesListObject[dishId];
                    return {
                        ...dish,
                        id: dishId,
                    };
                });
                setDishes(dishesListArray);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (location.pathname === '/') {
            void fetchDishes();
        }
    }, [fetchDishes, location.pathname]);

    const deleteDish = async (id: string) => {
        try {
            await axiosApi.delete(`/pizza-orders/${id}.json`);
            setDishes(dishes.filter(dish => dish.id !== id));
        } catch (e) {
            console.error("Ошибка при удалении блюда:", e);
        }
    };

    const editDish = (id: string) => {
        navigate(`/edit-dishes/${id}`);
    };

    const addToCart = (dish: DishItem) => {
        setCart([...cart, dish]);
    };

    const handleCheckout = () => {
        setShowCartModal(true);
    };

    const closeCartModal = () => {
        setShowCartModal(false);
    };

    const calculateTotal = () => {
        return cart.reduce((total, dish) => total + Number(dish.price), 150);
    };

    const removeFromCart = (id: string) => {
        setCart((prevCart) => prevCart.filter((dish) => dish.id !== id));
    };

    const handleCancel = () => {
        setShowCartModal(false);
    };

    const handleOrder = async () => {
        try {
            await axiosApi.post('/pizza-orders.json', { items: cart, total: calculateTotal() });
            setCart([]);
            setShowCartModal(false);
        } catch (e) {
            console.error("Ошибка при отправке заказа:", e);
        }
    };

    return (
        <>
            <header><ToolBarClient /></header>
            <main className="container">
                {loading ? <Loader /> : (
                    <main>
                        <div className="container">
                            <Dishes
                                dishes={dishes}
                                onDelete={deleteDish}
                                onEdit={editDish}
                                onAddToCart={addToCart}
                            />
                        </div>
                        <button className="btn btn-success mt-3" onClick={handleCheckout}>
                            Checkout ({cart.length})
                        </button>

                        <Modal show={showCartModal} title="Корзина" onClose={closeCartModal}>
                            <div style={{ padding: "10px" }}>
                                <Cart cart={cart} onRemove={removeFromCart} />
                                <div style={{marginTop: "10px", textAlign: "right"}}>
                                    {selectedDish && (
                                        <>
                                            <img src={selectedDish.image ? selectedDish.image : imageUrl}
                                                 alt={selectedDish.name} className="img-fluid mb-3" />
                                            <hr />
                                            <h4>Name: {selectedDish.name}</h4>
                                            <p><strong>Название:</strong> {selectedDish.name}</p>
                                            <p><strong>Цена:</strong> {selectedDish.price}</p>
                                        </>
                                    )}
                                    <h4>Общая сумма: {calculateTotal()} руб.</h4>
                                    <button
                                        className="btn btn-danger"
                                        onClick={handleCancel}
                                        style={{marginRight: "10px"}}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-success"
                                        onClick={handleOrder}
                                    >
                                        Order
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    </main>
                )}
            </main>
        </>
    );
};

export default Client;