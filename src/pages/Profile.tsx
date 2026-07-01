import { useAuth } from '../context/AuthContext';
import { UserProfileContent } from '../components/profile/UserProfileContent';

export function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return <UserProfileContent user={user} isOwnProfile />;
}
