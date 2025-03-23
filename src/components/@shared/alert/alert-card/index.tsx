export default function AlertCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-3 bg-primary-foreground rounded-md flex gap-2 items-start">
      <div className="flex justify-center items-center bg-primary-normal01 rounded-full w-4 h-4">
        <span className="p-2 text-primary-dark01 text-xs font-bold">i</span>
      </div>
      <span className="text-xs text-primary-dark02">{children}</span>
    </div>
  );
}
