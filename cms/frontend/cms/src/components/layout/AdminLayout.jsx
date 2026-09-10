
import AdminHeader from "../admin/AdminHeader";
import AdminSidebar from "../admin/AdminSidebar";
import { Outlet } from "react-router-dom";
import "./AdminLayout.css";

function AdminLayout() {
    return (
        <div className="admin-layout">

            <AdminHeader />

            <div className="admin-layout-body">

                <AdminSidebar />

                <main className="admin-main-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default AdminLayout;

