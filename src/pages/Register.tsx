import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AtSign, Lock, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GlitchText } from '../components/ui/GlitchText';
import { useToast } from '../context/ToastContext';

export function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ nickName: false, password: false });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors = {
      nickName: !nickName.trim(),
      password: !password.trim(),
    };
    setErrors(newErrors);
    if (newErrors.nickName || newErrors.password) return;

    setSuccess(true);
    toast('Usuario creado. Bienvenide al lado oscuro.', 'success');
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div className="auth-page dot-grid-dark">
      <div className="auth-card glass-card pulse-card animate-fade-up">
        <div className="mb-6 text-center sm:mb-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--green)] font-display text-xl font-black text-[var(--bg-base)] shadow-[var(--glow-green)]">
              A
            </div>
            <GlitchText as="h1" className="font-display text-xl font-bold tracking-wider">
              REGISTRO
            </GlitchText>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Creá tu cuenta. El socializar es opcional.
            </p>
          </div>

          {success ? (
            <div className="rounded-[var(--radius-sm)] border border-[var(--emerald)]/40 bg-[var(--emerald)]/10 px-4 py-6 text-center">
              <p className="font-mono text-sm text-[var(--emerald)]">
                Usuario creado. Bienvenide al lado oscuro.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-1.5 block font-mono text-xs text-[var(--text-muted)]">
                  nickName *
                </label>
                <div className="relative">
                  <AtSign
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
                    placeholder="git_push_carla"
                    className={`input-field pl-10 text-base sm:text-sm ${errors.nickName ? 'input-error' : ''}`}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block font-mono text-xs text-[var(--text-muted)]">
                  email (opcional)
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="input-field pl-10 text-base sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block font-mono text-xs text-[var(--text-muted)]">
                  contraseña *
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
                    placeholder="123456"
                    className={`input-field pl-10 text-base sm:text-sm ${errors.password ? 'input-error' : ''}`}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Crear cuenta
              </Button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
            ¿Ya tenés cuenta?{' '}
            <Link
              to="/login"
              className="font-medium text-[var(--green-light)] transition-colors hover:text-[var(--green)]"
            >
              Ingresá
            </Link>
          </p>
      </div>
    </div>
  );
}
