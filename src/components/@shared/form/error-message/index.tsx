export default function ErrorMessage({ error }: { error: string }) {
  return (
    <p className="text-primary-normal03 text-center text-sm mt-2 -mb-2">
      {error}
    </p>
  );
}
