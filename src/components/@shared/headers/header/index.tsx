interface HeaderProps {
  children: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <header className="sticky top-0 w-full min-w-80 max-w-3xl bg-white flex h-14 items-center px-5 border-b border-opacity-5 font-bold text-lg">
      <h1>{children}</h1>
    </header>
  );
}
