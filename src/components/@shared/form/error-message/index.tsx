export default function ErrorMessage({ error }: { error: string }) {
  return (
    <p className="text-destructive text-center text-sm mt-2 -mb-2">{error}</p>
  );
}
