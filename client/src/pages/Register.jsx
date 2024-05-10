import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { RegisterSchema } from "../schema";
import { toast } from "react-toastify";
import { register } from "../api/user";

// eslint-disable-next-line no-extra-boolean-cast
const isRequired = (message) => (value) => !!value ? undefined : message;

const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
};

export default function Register() {
    const navigate = useNavigate();
    const handleRegister = async (values) => {
        const data = {
            name: values.name,
            email: values.email,
            password: values.password,
        };
        try {
            const response = await register(data);

            if (response?.error || !response) {
                toast.error("Error al crear el usuario");
                return;
            }

            toast.success("Usuario creado con exito");

            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Crea una cuenta
            </h1>
            <Formik
                initialValues={initialValues}
                validationSchema={RegisterSchema}
                onSubmit={handleRegister}
            >
                <Form className="space-y-4 md:space-y-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Nombre Completo
                        </label>
                        <Field
                            type="text"
                            name="name"
                            id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Nombre y Apellidos"
                            validate={isRequired("El nombre es requerido")}
                        />
                        <ErrorMessage
                            name="name"
                            component="div"
                            className="text-red-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Tu Correo
                        </label>
                        <Field
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="name@correo.com"
                            validate={isRequired("El correo es requerido")}
                        />
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Tu Contraseña
                        </label>
                        <Field
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            validate={isRequired("La contraseña es requerida")}
                        />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Confirma tu Contraseña
                        </label>
                        <Field
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            validate={isRequired(
                                "Confirmar la contraseña es requerido"
                            )}
                        />
                        <ErrorMessage
                            name="confirmPassword"
                            className="text-red-500"
                            component="div"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        Crear Cuenta
                    </button>
                </Form>
            </Formik>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Ya tienes una cuenta?{" "}
                <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                    Inicia sesión
                </Link>
            </p>
        </>
    );
}
