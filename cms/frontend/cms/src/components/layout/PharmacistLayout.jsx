import PharmacistHeader from "../pharmacist/PharmacistHeader";
import PharmacistSidebar from "../pharmacist/PharmacistSidebar";
import { Outlet } from "react-router-dom";
import "./PharmacistLayout.css";

function PharmacistLayout() {
    return (
        <div className="pharmacist-layout">

            <PharmacistHeader />

            <div className="pharmacist-layout-body">

                <PharmacistSidebar />

                <main className="pharmacist-main-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default PharmacistLayout;