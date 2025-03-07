import './App.css'
import Admin from "./containers/Admin/Admin.tsx";
import Client from "./containers/Client/Client.tsx";
import {Route, Routes} from "react-router-dom";
import NewDish from "./containers/NewDish/NewDish.tsx";
import EditDish from "./components/EditDish/EditDish.tsx";

const App = () => (
    <>
        <Routes>
            <Route
                path="/admin"
                element={(
                    <Admin/>)}
            />
            <Route
                path="/admin/new-dish"
                element={(<NewDish/>)}
            />
            <Route
                path="/admin/orders"
                element={(<Admin/>)}
            />
            <Route
                path="/"
                element={(<Client/>)}
            />
            <Route path='/admin/edit-dishes/:idDish' element={<EditDish/>}></Route>
            <Route path="*" element={(<h1>Not page found</h1>)}/>
        </Routes>
    </>
);

export default App
