import { useParams } from 'react-router-dom';
import { getUserByNickName } from '../data/mockData';
import { UserProfileContent } from '../components/profile/UserProfileContent';
import { ErrorPage } from '../components/ui/ErrorPage';

export function UserProfile() {
  const { nickName } = useParams<{ nickName: string }>();
  const profileUser = nickName ? getUserByNickName(nickName) : undefined;

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
