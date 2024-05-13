import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/store";

export default function Header() {
    const { user, logout } = useStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="py-4">
            <nav className="px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <p className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        UaDeo
                    </p>
                    <div className="flex items-center lg:order-2 gap-5">
                        <p className="text-white font-medium text-sm">
                            Bienvenido, {user?.name}!
                        </p>
                        <button
                            className="text-white  focus:ring-4 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 hover:bg-gray-700 focus:outline-none focus:ring-gray-800"
                            onClick={handleLogout}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
