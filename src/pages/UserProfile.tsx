import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUsers } from '../services/userService';
import type { User } from '../types';
import { UserProfileContent } from '../components/profile/UserProfileContent';
import { ErrorPage } from '../components/ui/ErrorPage';

export function UserProfile() {
  const { nickName } = useParams<{ nickName: string }>();

  const [profileUser, setProfileUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!nickName) return;

    getUsers()
      .then((users) => {
        const user = users.find((u) => u.nickName === nickName);
        setProfileUser(user ?? undefined);
      })
      .catch(() => setProfileUser(undefined))
      .finally(() => setLoading(false));
  }, [nickName]);

  if (loading) {
    return <p>Cargando perfil...</p>;
  }

  if (!profileUser) {
    return (
      <ErrorPage
        typingMessage="// Error 404: usuario no encontrado en /etc/passwd"
        ascii={'> whoami\n> user: not found'}
        title="Este usuario no existe. O borró su cuenta. O nunca existió socialmente."
        backLabel="Volver al feed"
      />
    );
  }

  return <UserProfileContent user={profileUser} />;
}
