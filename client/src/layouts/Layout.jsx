import Header from "../components/ui/Header";
import { Outlet, useNavigate } from "react-router-dom";
import ToastNotification from "../components/ui/ToastNotification";
import { useStore } from "../context/store";
import { useEffect } from "react";

export default function Layout() {
    const { user } = useStore();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!user) navigate('/login')
    }, [user])
    
    return (
        <>
            <Header />
            <Outlet />
            <ToastNotification />
        </>
    );
}
