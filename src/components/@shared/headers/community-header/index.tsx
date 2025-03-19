import React from "react";

interface HeaderProps {
  children: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="w-full bg-white flex items-center justify-between py-4 px-5 my-auto border-b border-opacity-5 font-bold text-lg ">
      {children}
      <button>
        <div className="w-4 h-4 bg-red-400" />
      </button>
    </header>
  );
}
