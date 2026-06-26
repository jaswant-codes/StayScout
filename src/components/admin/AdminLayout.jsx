import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopBar from './AdminTopBar';

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-dark-900">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminTopBar />
        <main className="flex-1 overflow-auto bg-dark-900 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
