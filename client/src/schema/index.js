import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Muy corta!")
        .max(50, "Muy Larga!")
        .required("Nombre Requerido"),
    email: Yup.string().email("Email Invalido").required("El email es requerido"),
    password: Yup.string().required("La contrasena es requerida"),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords deben coincidir"
    ),
});

export const LoginSchema = Yup.object().shape({
    email: Yup.string().email("email invalido").required("El email es requerido"),
    password: Yup.string().required("La contrasena es requerida"),
})

export const SongSchema = Yup.object().shape({
    name: Yup.string().required("Cancion es Requerida"),
    link: Yup.string().required("Link es Requerido"),
})