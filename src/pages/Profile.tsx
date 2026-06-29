import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { UserProfileContent } from '../components/profile/UserProfileContent';

export function Profile() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    toast('Sesión cerrada. Volvé cuando quieras ignorar gente.', 'info');
    navigate('/login', { replace: true });
  };

  return <UserProfileContent user={user} isOwnProfile onLogout={handleLogout} />;
}
