import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {Dish} from "../../types";
import ToolBarAdmin from "../ToolBar/ToolBarAdmin.tsx";

interface Props {
    onSubmitFormToAddDish: (newDish: Dish) => void;
    editContact?: Dish;
}

const DishForm: React.FC<Props> = ({onSubmitFormToAddDish, editContact}) => {
    const [form, setForm] = useState<Dish>({
        name: '',
        price: 0,
        image:'',
    });

    useEffect(() => {
        if(editContact){
            setForm(editContact)
        }
    },[editContact]);

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target;
        setForm(prevState => ({...prevState, [name]: value}));
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmitFormToAddDish({...form});
    }
    return (
        <>
            <header><ToolBarAdmin/></header>
            <main>
                <div className="container">
                    <form onSubmit={onSubmit} className="w-50 mx-auto">
                        <div className="mb-3">
                            <label htmlFor="image">Photo of Dish</label>
                            <input
                                className="form-control"
                                type="text"
                                value={form.image}
                                name="image"
                                onChange={inputChangeHandler}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price">Price</label>
                            <input
                                required
                                className="form-control"
                                type="text"
                                value={form.price}
                                name="price"
                                onChange={inputChangeHandler}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name">Name</label>
                            <input
                                required
                                className="form-control"
                                type="text"
                                value={form.name}
                                name="name"
                                onChange={inputChangeHandler}
                            />
                        </div>
                        <div className="mb-3">
                            <button
                                className="btn btn-primary me-5"
                                type="submit"
                            >
                                <NavLink to='/' className="navbar-brand">Save</NavLink>
                            </button>
                        </div>
                    </form>

                </div>
            </main>
        </>
    );
};

export default DishForm;
