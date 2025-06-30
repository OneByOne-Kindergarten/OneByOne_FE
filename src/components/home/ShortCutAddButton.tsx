export default function ShortCutAddButton({
  navigateToEdit,
}: {
  navigateToEdit: () => void;
}) {
  return (
    <li className="flex flex-col items-center gap-1">
      <button
        onClick={navigateToEdit}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light02"
      >
        <span className="text-3xl font-light text-primary-normal03">+</span>
      </button>
      <p className="text-sm text-primary-dark02">바로가기</p>
    </li>
  );
}
