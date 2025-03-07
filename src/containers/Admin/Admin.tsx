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
            await axiosApi.delete(`/pizza-dishes/${id}.json`);
            setDishes(dishes.filter(dish => dish.id !== id));
        } catch (e) {
            console.error("Ошибка при удалении блюда:", e);
        }
    };

    const editDish = (id: string) => {
        navigate(`/edit-dishes/${id}`);
    };

    return (
        <>
            <header className="mb-2">
                <ToolBarAdmin />
            </header>
            {loading ? (
                <Loader />
            ) : (
                <main className="container">
                    <div className="container">
                        <Dishes
                            dishes={dishes}
                            onDelete={deleteDish}
                            onEdit={editDish}
                        />
                    </div>
                </main>
            )}
        </>
    );
};

export default Admin;