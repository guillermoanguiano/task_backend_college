import Header from "../components/ui/Header";
import { Outlet } from "react-router-dom";
import ToastNotification from "../components/ui/ToastNotification";

export default function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <ToastNotification />
        </>
    );
}
