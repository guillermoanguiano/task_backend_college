import Header from "../components/ui/Header";
import { Outlet, useNavigate } from "react-router-dom";
import ToastNotification from "../components/ui/ToastNotification";
import { useStore } from "../context/store";
import { useEffect } from "react";

export default function Layout() {
    const { user } = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
    }, []);

    return (
        <>
            <Header />
            <div className="px-4 md:px-10 lg:px-24 xl:px-32 py-8 mx-auto md:h-screen">
                <Outlet />
            </div>

            <ToastNotification />
        </>
    );
}
