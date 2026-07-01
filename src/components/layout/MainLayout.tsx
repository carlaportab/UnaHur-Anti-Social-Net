import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { DesktopSidebar } from './DesktopSidebar';
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

      <div className="flex flex-1">
        <DesktopSidebar />

        <main className="mobile-main-pad min-w-0 flex-1 md:ml-[220px] md:pb-0">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>

      {/* Footer full width — fuera del área de contenido, respeta el sidebar en desktop */}
      <div className="md:ml-[220px]">
        <Footer variant="minimal" className="md:hidden" />
        <Footer className="hidden md:block" />
      </div>

      <MobileBottomNav />
      <div className="pointer-events-none fixed bottom-20 right-3 z-40 hidden font-mono text-[0.55rem] text-[var(--text-muted)]/40 md:bottom-4 md:block">
        // connection: stable
      </div>
    </div>
  );
}
