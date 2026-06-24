export function SkeletonPost() {
  return (
    <div className="post-card post-card--feed">
      <div className="post-card-layout">
        <div className="h-10 w-10 shrink-0 rounded-full bg-[var(--bg-surface-2)]" />
        <div className="min-w-0 flex-1 space-y-2.5">
          <div className="space-y-1">
            <div className="terminal-skeleton h-3 w-32 rounded bg-[var(--bg-surface-2)]" />
            <div className="terminal-skeleton h-2 w-24 rounded bg-[var(--bg-surface-2)]" />
          </div>
          <div className="terminal-skeleton h-3 w-full rounded bg-[var(--bg-surface-2)]" />
          <div className="terminal-skeleton h-3 w-4/5 rounded bg-[var(--bg-surface-2)]" />
          <div className="terminal-skeleton h-[150px] w-full rounded-lg bg-[var(--bg-surface-2)]" />
        </div>
      </div>
      <div className="mx-4 mt-1 border-t border-[var(--border)] pt-2">
        <div className="terminal-skeleton mx-auto h-6 w-2/3 rounded bg-[var(--bg-surface-2)]" />
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return <SkeletonPost />;
}
