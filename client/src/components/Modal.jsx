/* eslint-disable no-extra-boolean-cast */
import { ErrorMessage, Field, Form, Formik } from "formik";
import { IoMdClose } from "react-icons/io";
import { TaskSchema } from "../schema";
import { createTask } from "../api/task";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const isRequired = (message) => (value) => !!value ? undefined : message;

const initialValues = {
    name: "",
    description: "",
};

// eslint-disable-next-line react/prop-types
export default function Modal({ isOpen, toggleModal, id }) {
    const navigate = useNavigate();
    const handleForm = async (values, { resetForm }) => {
        try {
            const data = {
                title: values.name,
                description: values.description,
            };
            const response = await createTask(data, id);
            
            if(!response.success) {
              throw new Error("Error al crear la tarea");
            }

            toast.success("Tarea creada con exito");
            navigate(0);

            resetForm();
            toggleModal();
        } catch (error) {
            toast.error("Error al crear la tarea");
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
                        <h1>Agrega Tareas</h1>

                        <button
                            onClick={toggleModal}
                            className="border border-solid border-gray-500 p-2 rounded-full"
                        >
                            <IoMdClose />
                        </button>
                    </div>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={TaskSchema}
                        onSubmit={handleForm}
                    >
                        <Form className="flex flex-col gap-4" action="#">
                            <div className="space-y-2">
                                <label htmlFor="name">Tarea</label>
                                <Field
                                    type="text"
                                    placeholder="Ingresa una nueva tarea"
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
                                <label htmlFor="description">Descripción</label>
                                <Field
                                    name="description"
                                    as="textarea"
                                    id="description"
                                    cols="30"
                                    rows="5"
                                    maxLength={300}
                                    className="border border-solid border-gray-500 p-2 rounded-lg w-full"
                                    placeholder="Ingresa una descripción"
                                    validate={isRequired(
                                        "Descripción es requerida"
                                    )}
                                />
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="text-red-500"
                                />
                            </div>

                            <button
                                type="submit"
                                className="border border-solid border-gray-500 p-2 rounded-full"
                            >
                                Crear Tarea
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}
