export default function ErrorMessage({ error }: { error: string }) {
  return (
    <p className="-mb-2 mt-2 text-left text-sm text-destructive">{error}</p>
  );
}
