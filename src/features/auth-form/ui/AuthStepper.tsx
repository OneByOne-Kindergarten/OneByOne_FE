import type { ReactNode } from "react";

interface AuthStepperProps {
  title: ReactNode;
  subtitle?: ReactNode;
  content: ReactNode;
}

export default function AuthStepper({
  title,
  subtitle,
  content,
}: AuthStepperProps) {
  return (
    <>
      <section className="text-center text-lg">
        <h1>{title}</h1>
        {subtitle}
      </section>
      <section className="flex flex-col gap-9 px-5">{content}</section>
    </>
  );
}
