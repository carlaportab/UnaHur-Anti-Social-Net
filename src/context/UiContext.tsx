import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface UiContextType {
  terminalMode: boolean;
  toggleTerminalMode: () => void;
}

const UiContext = createContext<UiContextType | null>(null);

const TERMINAL_STORAGE_KEY = 'antisocial-terminal-mode';

export function UiProvider({ children }: { children: ReactNode }) {
  const [terminalMode, setTerminalMode] = useState(
    () => sessionStorage.getItem(TERMINAL_STORAGE_KEY) === 'true',
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.removeItem('antisocial-color-theme');
  }, []);

  useEffect(() => {
    sessionStorage.setItem(TERMINAL_STORAGE_KEY, String(terminalMode));
    document.documentElement.classList.toggle('terminal-mode', terminalMode);
  }, [terminalMode]);

  return (
    <UiContext.Provider
      value={{
        terminalMode,
        toggleTerminalMode: () => setTerminalMode((v) => !v),
      }}
    >
      {children}
    </UiContext.Provider>
  );
}

export function useUi() {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error('useUi debe usarse dentro de UiProvider');
  return ctx;
}
