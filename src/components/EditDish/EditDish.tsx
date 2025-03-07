import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosApi from "../../axiosApi.ts";
import { Dish } from "../../types";
import DishForm from "../DishForm/DishForm.tsx";

const EditDish = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { idDish } = useParams();
    const [dish, setDish] = useState<Dish | null>(null);

    useEffect(() => {
        const fetchContact = async () => {
            try {
                setLoading(true);
                const response = await axiosApi.get<Dish>(`/pizza-dishes/${idDish}.json`);
                setDish(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке блюда:", error);
            } finally {
                setLoading(false);
            }
        };

        if (idDish) {
            fetchContact();
        }
    }, [idDish]);

    const updateContact = async (updatedDish: Dish) => {
        try {
            setLoading(true);
            await axiosApi.put(`/pizza-dishes/${idDish}.json`, updatedDish);
            navigate('/admin');
        } catch (error) {
            console.error("Ошибка при обновлении блюда:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (!dish) {
        return <div>Контакт не найден</div>;
    }

    return (
        <>
            <main>
                <div className="row">
                    <div className="col">
                        <DishForm
                            onSubmitFormToAddDish={updateContact}
                            editContact={dish}
                        />
                    </div>
                </div>
            </main>

        </>
    );
};

export default EditDish;