export default function AlertCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-lg bg-primary-foreground p-3">
      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary-normal01">
        <span className="p-2 text-xs font-bold text-primary-dark01">i</span>
      </div>
      <span className="text-xs text-primary-dark02">{children}</span>
    </div>
  );
}
