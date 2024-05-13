import { useState, useEffect } from "react";
import { useStore } from "../context/store";
import { completeTask, deleteTask, getTasks } from "../api/task";
import { compareAndUpdateDate, formatDate } from "../utils";
import Modal from "../components/Modal";

function HomePage() {
    const {
        user,
    } = useStore() || {};
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (user) {
            getData();
        }
    }, []);

    const getData = async () => {
        try {
            const res = await getTasks(user.id);
            setData(res);
        } catch (error) {
            console.log(error);
        }
    };

    const handleComplete = async (id) => {
        try {
            await completeTask(id);
            getData();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            getData();
        } catch (error) {
            console.log(error);
        }
    };

    const toggleModal = () => setOpenModal(!openModal);

    return (
        <>
            <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                        Tareas
                    </h1>

                    <button 
                        className="text-white focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-green-800"
                        onClick={toggleModal}
                    >
                        Agregar
                    </button>
                </div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Tarea
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Descripción
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Estatus
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tarea creada
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tarea completada
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center"
                                >
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data ? (
                                data.map((task) => (
                                    <tr
                                        key={task._id}
                                        className=" border-b bg-gray-800 border-gray-700"
                                    >
                                        <td className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                                            {task.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            {task.description}
                                        </td>
                                        <td className="px-6 py-4">
                                            {task.completed
                                                ? "Completada"
                                                : "Pendiente"}
                                        </td>
                                        <td className="px-6 py-4">
                                            {formatDate(task.createdAt)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {compareAndUpdateDate(
                                                task.createdAt,
                                                task.updatedAt
                                            )}
                                        </td>
                                        <td className="px-6 py-4 flex gap-3 justify-center">
                                            <button
                                                type="button"
                                                className="font-medium text-white bg-blue-500 px-2 py-1 rounded"
                                                onClick={() =>
                                                    handleComplete(task._id)
                                                }
                                            >
                                                Completar
                                            </button>
                                            <button
                                                type="button"
                                                className="text-white text-sm bg-red-500 px-2 py-1 rounded"
                                                onClick={() =>
                                                    handleDelete(task._id)
                                                }
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <p>Cargando...</p>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={openModal} toggleModal={toggleModal} id={user ? user.id : ""} />
        </>
    );
}

export default HomePage;
