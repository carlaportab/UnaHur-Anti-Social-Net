import { ErrorPage } from '../components/ui/ErrorPage';

export function NotFound() {
  return (
    <ErrorPage
      typingMessage="// Error 404: ruta no encontrada en el filesystem"
      ascii={'> ls /ruta\n> No such file'}
      title="Esta página no existe. Como tus planes sociales del finde."
    />
  );
}
