/* eslint-disable no-extra-boolean-cast */
import { ErrorMessage, Field, Form, Formik } from "formik";
import { IoMdClose } from "react-icons/io";
import { SongSchema } from "../schema";
import { createSong } from "../api/task";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const isRequired = (message) => (value) => !!value ? undefined : message;

const initialValues = {
    name: "",
    link: "",
};

// eslint-disable-next-line react/prop-types
export default function Modal({ isOpen, toggleModal, id }) {
    const navigate = useNavigate();
    const handleForm = async (values, { resetForm }) => {
        try {
            const data = {
                title: values.name,
                description: values.link,
            };
            const response = await createSong(data, id);
            
            if(!response.success) {
              throw new Error("Error al agregar la cancion");
            }

            toast.success("Cancion agregada con exito");
            navigate(0);

            resetForm();
            toggleModal();
        } catch (error) {
            toast.error("Error al agregar la cancion");
            console.log(error);
        }
    };
    return (
        <div
            className={`${
                isOpen ? "block" : "hidden"
            } fixed z-10 inset-0 overflow-y-auto left-0 top-0 bottom-0 right-0 flex items-center justify-center p-10 bg-black bg-opacity-50`}
        >
            <div className="bg-gray-700 py-4 px-4 min-w-80 min-h-60 rounded-lg">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h1>Agrega Cancion</h1>

                        <button
                            onClick={toggleModal}
                            className="border border-solid border-gray-500 p-2 rounded-full"
                        >
                            <IoMdClose />
                        </button>
                    </div>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={SongSchema}
                        onSubmit={handleForm}
                    >
                        <Form className="flex flex-col gap-4" action="#">
                            <div className="space-y-2">
                                <label htmlFor="name">Nombre de la Cancion</label>
                                <Field
                                    type="text"
                                    placeholder="Ingresa una Cancion"
                                    className="border border-solid border-gray-500 p-2 rounded-lg w-full"
                                    name="name"
                                    id="name"
                                    validate={isRequired("Tarea es requerida")}
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-red-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="link">Link</label>
                                <Field
                                    name="link"
                                    as="textarea"
                                    id="link"
                                    cols="30"
                                    rows="5"
                                    maxLength={300}
                                    className="border border-solid border-gray-500 p-2 rounded-lg w-full"
                                    placeholder="Ingresa el link de la cancion"
                                    validate={isRequired(
                                        "Link de la cancion es requerida"
                                    )}
                                />
                                <ErrorMessage
                                    name="link"
                                    component="div"
                                    className="text-red-500"
                                />
                            </div>

                            <button
                                type="submit"
                                className="border border-solid border-gray-500 p-2 rounded-full"
                            >
                                Agregar Cancion
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}
