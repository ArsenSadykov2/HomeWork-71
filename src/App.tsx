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
                path="/"
                element={(
                    <Admin/>)}
            />
            <Route
                path="/new-dish"
                element={(<NewDish/>)}
            />
            <Route
                path="/orders"
                element={(<Admin/>)}
            />
            <Route
                path="/client"
                element={(<Client/>)}
            />
            <Route path='/edit-dishes/:idDish' element={<EditDish/>}></Route>
            <Route path="*" element={(<h1>Not page found</h1>)}/>
        </Routes>
    </>
);

export default App
