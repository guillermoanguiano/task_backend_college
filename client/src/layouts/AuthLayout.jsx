import { Outlet } from "react-router-dom";
import ToastNotification from "../components/ui/ToastNotification";

export default function AuthLayout() {
    return (
        <>
            <section className="bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-gray-800 rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-0 border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </section>

            <ToastNotification />
        </>
    );
}
