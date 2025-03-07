import { useCallback, useEffect, useState } from "react";
import { DishAPI, DishItem } from "../../types";
import axiosApi from "../../axiosApi.ts";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader.tsx";
import ToolBarAdmin from "../../components/ToolBar/ToolBarAdmin.tsx";
import Dishes from "../../components/Dishes/Dishes.tsx";

const Admin = () => {
    const [dishes, setDishes] = useState<DishItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDish, setSelectedDish] = useState<DishItem | null>(null);
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
        if (location.pathname === '/admin') {
            void fetchDishes();
        }
    }, [fetchDishes, location.pathname]);

    const handleContactClick = (contact: DishItem) => {
        setSelectedDish(contact);
    };

    const deleteContact = async () => {
        if (selectedDish && selectedDish.id) {
            try {
                await axiosApi.delete(`/pizza-dishes/${selectedDish.id}.json`);
                setDishes(dishes.filter(dish => dish.id !== selectedDish.id));
            } catch (e) {
                console.error("Ошибка при удалении контакта:", e);
            }
        }
    };

    const editContact = () => {
        if (selectedDish) {
            navigate(`/edit-dishes/${selectedDish.id}`);
        }
    };

    return (
        <>
            <header className="container mb-2">
                <ToolBarAdmin />
            </header>
            {loading ? (
                <Loader />
            ) : (
                <main>
                    <div className="container">
                        <Dishes dishes={dishes} onClickItem={handleContactClick} />
                        <div className="d-flex justify-content-end gap-2 mt-3">
                            <button className="btn btn-danger" onClick={deleteContact}>
                                Удалить
                            </button>
                            <button className="btn btn-primary" onClick={editContact}>
                                Редактировать
                            </button>
                        </div>
                    </div>
                </main>
            )}
        </>
    );
};

export default Admin;