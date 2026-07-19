export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-7 w-48 rounded-md" style={{ background: "var(--border)" }} />
        <div className="h-4 w-80 rounded-md" style={{ background: "var(--border)" }} />
      </div>
      <div className="space-y-4 max-w-2xl">
        <div className="h-12 rounded-xl" style={{ background: "var(--border)" }} />
        <div className="h-12 rounded-xl" style={{ background: "var(--border)" }} />
        <div className="h-12 rounded-xl" style={{ background: "var(--border)" }} />
        <div className="h-24 rounded-xl" style={{ background: "var(--border)" }} />
      </div>
    </div>
  );
}
