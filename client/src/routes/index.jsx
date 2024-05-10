import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import HomePage from "../pages/Home";
import Layout from "../layouts/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
            </Route>
        </>
    )
);

export default router;
