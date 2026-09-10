import Header from "../doctor/Header";
import DoctorSidebar from "../doctor/DoctorSidebar";
import { Outlet } from "react-router-dom";
import "./DoctorLayout.css";

function DoctorLayout() {
    return (
        <div className="doctor-layout">

            <Header />

            <div className="doctor-layout-body">

                <DoctorSidebar />

                <main className="doctor-main-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default DoctorLayout;