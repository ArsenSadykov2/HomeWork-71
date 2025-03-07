import {useState} from "react";
import {Dish} from "../../types";
import {useNavigate} from "react-router-dom";
import axiosApi from "../../axiosApi.ts";
import Loader from "../../components/UI/Loader/Loader.tsx";
import DishForm from "../../components/DishForm/DishForm.tsx";

const NewDish = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const createContact = async (newDish: Dish) => {
        try{
            setLoading(true);
            await axiosApi.post('/pizza-dishes.json', newDish);
            navigate('/');
        } catch (error) {
            console.log(error);
        }finally {
            setLoading(false);
        }
    };
    return (
        <div className="container">
            {loading ? <Loader /> : <DishForm onSubmitFormToAddDish={createContact}/>}
        </div>
    );
};

export default NewDish;