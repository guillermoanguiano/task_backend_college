import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoginSchema } from "../schema";
import { toast } from "react-toastify";
import { useStore } from "../context/store";

// eslint-disable-next-line no-extra-boolean-cast
const isRequired = (message) => (value) => !!value ? undefined : message;

const initialValues = {
    email: "",
    password: "",
};

export default function Login() {
    const { login } = useStore();
    const navigate = useNavigate();

    const handleLogin = async (values) => {
        try {
            const response = await login(values);
            if (response?.error || !response) {
                toast.error("La contraseña o el correo son incorrectos");
                return;
            }
            toast.success("Sesion iniciada con exito");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Inicia sesión con tu cuenta
            </h1>
            <Formik
                initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
            >
                <Form className="space-y-4 md:space-y-6" action="#">
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
                            Contraseña
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
                    <button
                        type="submit"
                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        Iniciar Sesion
                    </button>
                </Form>
            </Formik>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                No tienes una cuenta? - {""}
                <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                    Registrate
                </Link>
            </p>
        </>
    );
}
