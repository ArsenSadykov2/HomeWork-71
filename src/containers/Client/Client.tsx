import ToolBarClient from "../../components/ToolBar/ToolBarClient.tsx";

const Client = () => {
    return (
        <>
            <header><ToolBarClient/></header>
            <main>
                <div className="container">
                    Здесь будут Блюда из Меню для покупателя
                </div>
            </main>
        </>
    );
};

export default Client;