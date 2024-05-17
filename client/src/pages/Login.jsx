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
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
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
                            className="block mb-2 text-sm font-medium text-white"
                        >
                            Tu Correo
                        </label>
                        <Field
                            type="email"
                            name="email"
                            id="email"
                            className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
                            className="block mb-2 text-sm font-medium text-white"
                        >
                            Contraseña
                        </label>
                        <Field
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
                        className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                    >
                        Iniciar Sesion
                    </button>
                </Form>
            </Formik>
            <p className="text-sm font-light text-gray-400">
                No tienes una cuenta? - {""}
                <Link
                    to="/register"
                    className="font-medium  hover:underline text-primary-500"
                >
                    Registrate
                </Link>
            </p>
        </>
    );
}
