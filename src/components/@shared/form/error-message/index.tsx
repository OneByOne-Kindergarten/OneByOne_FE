export default function ErrorMessage({ error }: { error: string }) {
  return (
    <p className="-mb-2 mt-2 text-center text-sm text-destructive">{error}</p>
  );
}
