// import Header from "../receptionist/Header";
import ReceptionistHeader from "../receptionist/ReceptionistHeader";
import ReceptionistSidebar from "../receptionist/ReceptionistSidebar";
import { Outlet } from "react-router-dom";
import "./ReceptionistLayout.css";

function ReceptionistLayout() {
    return (
        <div className="receptionist-layout">

            <div className="receptionist-fixed-header">
                <ReceptionistHeader />
            </div>

            <div className="receptionist-layout-body">

                <div className="receptionist-fixed-sidebar">
                    <ReceptionistSidebar />
                </div>

                <main className="receptionist-main-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default ReceptionistLayout;

// export default ReceptionistLayout;