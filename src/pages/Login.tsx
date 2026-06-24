import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { GlitchText } from '../components/ui/GlitchText';
import { useToast } from '../context/ToastContext';

export function Login() {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ nickName: false, password: false });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors = {
      nickName: !nickName.trim(),
      password: !password.trim(),
    };
    setErrors(newErrors);
    if (newErrors.nickName || newErrors.password) return;

    if (password !== '123456') {
      toast('Contraseña incorrecta. Hint: es la del TP.', 'error');
      return;
    }

    const ok = login(nickName.trim());
    if (!ok) {
      toast('Usuario no encontrado. ¿Te registraste?', 'error');
      return;
    }

    toast(`Bienvenide, @${nickName.trim()}. El socializar es opcional.`, 'success');
    navigate('/perfil');
  };

  return (
    <div className="auth-page dot-grid-dark">
      <div className="auth-card glass-card pulse-card animate-fade-up">
        <div className="mb-6 text-center sm:mb-8">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--green)] font-display text-xl font-black text-[var(--bg-base)] shadow-[var(--glow-green)]">
            A
          </div>
          <GlitchText as="h1" className="font-display text-xl font-bold tracking-wider">
            INGRESAR
          </GlitchText>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Accedé con tu nickName. No hace falta que seas amable.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block font-mono text-xs text-[var(--text-muted)]">
              nickName
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />
              <input
                type="text"
                value={nickName}
                onChange={(e) => {
                  setNickName(e.target.value);
                  setErrors((prev) => ({ ...prev, nickName: false }));
                }}
                placeholder="xX_root_Xx"
                className={`input-field pl-10 text-base sm:text-sm ${errors.nickName ? 'input-error' : ''}`}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block font-mono text-xs text-[var(--text-muted)]">
              contraseña
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: false }));
                }}
                placeholder="••••••"
                className={`input-field pl-10 text-base sm:text-sm ${errors.password ? 'input-error' : ''}`}
              />
            </div>
          </div>

          <div className="rounded-[var(--radius-sm)] border border-[var(--border-green)] bg-[var(--green-dim)]/20 px-4 py-3 font-mono text-xs text-[var(--green-light)]">
            Contraseña de acceso: <strong>123456</strong>
          </div>

          <Button type="submit" className="w-full">
            Iniciar sesión
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
          ¿No tenés cuenta?{' '}
          <Link
            to="/register"
            className="font-medium text-[var(--green-light)] transition-colors hover:text-[var(--green)]"
          >
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
}
