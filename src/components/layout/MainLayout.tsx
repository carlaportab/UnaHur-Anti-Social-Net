import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileBottomNav } from './MobileBottomNav';
import { VisualOverlay } from './VisualOverlay';
import { PageTransition } from './PageTransition';
import { TerminalModeBanner } from './TerminalModeBanner';

export function MainLayout() {
  return (
    <div className="relative flex min-h-screen min-h-[100dvh] flex-col">
      <VisualOverlay />
      <Navbar />
      <TerminalModeBanner />
      <main className="mobile-main-pad flex-1 md:pb-0">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer variant="minimal" className="md:hidden" />
      <Footer className="hidden md:block" />
      <MobileBottomNav />
      <div className="pointer-events-none fixed bottom-20 right-3 z-40 hidden font-mono text-[0.55rem] text-[var(--text-muted)]/40 md:bottom-4 md:block">
        // connection: stable
      </div>
    </div>
  );
}
