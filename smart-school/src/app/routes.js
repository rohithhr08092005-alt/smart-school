import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import NotFound from '../pages/NotFound/NotFound';
import { AppDataProvider } from '../context/AppDataContext';

function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-container">{children}</main>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  return (
    <AppDataProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </AppDataProvider>
  );
}

export default AppRoutes;
