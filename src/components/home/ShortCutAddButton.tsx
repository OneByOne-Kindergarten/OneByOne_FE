export default function ShortCutAddButton({
  navigateToEdit,
}: {
  navigateToEdit: () => void;
}) {
  return (
    <li className="flex flex-col items-center gap-1">
      <button
        onClick={navigateToEdit}
        className="w-14 h-14 rounded-full bg-primary-light02 flex items-center justify-center"
      >
        <span className="text-3xl text-primary-normal03 font-light">+</span>
      </button>
      <p className="text-sm text-primary-dark02">바로가기</p>
    </li>
  );
}
