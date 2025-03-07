import './App.css'
import Admin from "./containers/Admin/Admin.tsx";
import Client from "./containers/Client/Client.tsx";
import {Route, Routes} from "react-router-dom";

const App = () => (
    <>
        <Routes>
            <Route
                path="/admin"
                element={(
                    <Admin/>)}
            />
            <Route
                path="/"
                element={(<Client/>)}
            />
        </Routes>
    </>
);

export default App
