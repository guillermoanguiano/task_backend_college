import { useState, useEffect } from "react";
import { useStore } from "../context/store";
import { deleteSong, getSong } from "../api/task";
import { formatDate } from "../utils";
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
            const res = await getSong(user.id);
            setData(res);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteSong(id);
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
                        Mis Canciones
                    </h1>

                    <button 
                        className="text-white focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-red-800"
                        onClick={toggleModal}
                    >
                        Agregar Cancion
                    </button>
                </div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Cancion
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Link
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Agregada el
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
                                data.map((song) => (
                                    <tr
                                        key={song._id}
                                        className=" border-b bg-gray-800 border-gray-700"
                                    >
                                        <td className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                                            {song.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            <a className="hover:underline" href={song.description} target="_blank">{song.description}</a>
                                        </td>
                                        <td className="px-6 py-4">
                                            {formatDate(song.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 flex gap-3 justify-center">
                                            <button
                                                type="button"
                                                className="text-white text-sm bg-red-500 px-2 py-1 rounded"
                                                onClick={() =>
                                                    handleDelete(song._id)
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
