import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { PostDetail } from './pages/PostDetail';
import { Profile } from './pages/Profile';
import { UserProfile } from './pages/UserProfile';
import { NewPost } from './pages/NewPost';
import { Explore } from './pages/Explore';
import { Search } from './pages/Search';
import { Notifications } from './pages/Notifications';
import { ToastProvider } from './context/ToastContext';
import { UiProvider } from './context/UiContext';
import { NotFound } from './pages/NotFound';

function PrivateLayout() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <MainLayout />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas — sin layout, solo login/register */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* Rutas protegidas — requieren login, con layout completo */}
      <Route element={<PrivateLayout />}>
        <Route index element={<Home />} />
        <Route path="explorar" element={<Explore />} />
        <Route path="buscar" element={<Search />} />
        <Route path="post/:id" element={<PostDetail />} />
        <Route path="usuario/:nickName" element={<UserProfile />} />
        <Route path="perfil" element={<Profile />} />
        <Route path="nuevo-post" element={<NewPost />} />
        <Route path="notificaciones" element={<Notifications />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <UiProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </UiProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
