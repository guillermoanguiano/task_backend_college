import Header from "../components/ui/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <Header />

            <Outlet />
        </>
    );
}
