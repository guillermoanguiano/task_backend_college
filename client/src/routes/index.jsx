import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import HomePage from "../pages/Home";
import Layout from "../layouts/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AuthLayout from "../layouts/AuthLayout";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="" element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
            </Route>
        </>
    )
);

export default router;
