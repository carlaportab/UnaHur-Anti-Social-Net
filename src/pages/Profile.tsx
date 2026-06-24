import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { UserProfileContent } from '../components/profile/UserProfileContent';

export function Profile() {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    toast('Sesión cerrada. Volvé cuando quieras ignorar gente.', 'info');
  };

  return <UserProfileContent user={user} isOwnProfile onLogout={handleLogout} />;
}
