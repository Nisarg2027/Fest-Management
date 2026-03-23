// FILE: frontend/src/components/layout/Layout.jsx
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Toaster } from '@/components/ui/sonner';

export const Layout = () => {
  return (
    <div className="flex bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <Outlet />
      </main>
      <Toaster richColors position="top-right" />
    </div>
  );
};