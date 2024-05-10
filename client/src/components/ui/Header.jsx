import { Link } from "react-router-dom";

export default function Header() {
    let user;

    return (
        <header className="flex items-center justify-between p-6">
            <p className="text-lg font-bold">Projecto de Tareas</p>

            {user ? (
                <p className="text-sm font-bold">Hola {user}</p>
            ) : (
                <div>
                    <Link to="/login" className="text-sm font-bold p-2">
                        Iniciar Sesión
                    </Link>
                </div>
            )}
        </header>
    );
}
