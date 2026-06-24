import type { ReactNode } from 'react';
import { ActivitySidebar } from './ActivitySidebar';

interface FeedLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export function FeedLayout({ children, showSidebar = true }: FeedLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="flex gap-8">
        <div className="min-w-0 flex-1 lg:max-w-[680px] lg:mx-auto xl:mx-0">
          {children}
        </div>
        {showSidebar && (
          <ActivitySidebar className="hidden w-72 shrink-0 xl:block sticky top-[4.5rem] self-start" />
        )}
      </div>
    </div>
  );
}
