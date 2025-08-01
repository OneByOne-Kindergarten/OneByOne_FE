export default function ShortCutAddButton({
  navigateToEdit,
}: {
  navigateToEdit: () => void;
}) {
  return (
    <li className="flex flex-col items-center gap-1.5">
      <button
        onClick={navigateToEdit}
        className="ho flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground duration-100 ease-out active:brightness-105"
      >
        <span className="my-auto text-4xl font-light text-primary-normal02">
          +
        </span>
      </button>
      <p className="text-sm text-primary-dark02">바로가기</p>
    </li>
  );
}
