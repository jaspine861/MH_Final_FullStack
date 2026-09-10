import LabTechHeader from "../labTech/LabTechHeader";
import LabTechSidebar from "../labTech/LabTechSidebar";
import { Outlet } from "react-router-dom";
import "./LabTechLayout.css";

function LabTechLayout() {
    return (
        <div className="lab-tech-layout">

            <LabTechHeader />

            <div className="lab-tech-layout-body">

                <LabTechSidebar />

                <main className="lab-tech-main-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default LabTechLayout;
