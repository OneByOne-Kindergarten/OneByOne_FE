export default function ShortCutAddButton({
  navigateToEdit,
}: {
  navigateToEdit: () => void;
}) {
  return (
    <li className="flex flex-col items-center gap-1.5 duration-100 ease-out hover:opacity-80 active:scale-95">
      <button
        onClick={navigateToEdit}
        className="ho flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground"
      >
        <span className="my-auto text-4xl font-light text-primary-normal02">
          +
        </span>
      </button>
      <p className="text-sm text-primary-dark02">바로가기</p>
    </li>
  );
}
