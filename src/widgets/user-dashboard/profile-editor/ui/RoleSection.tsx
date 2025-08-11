import { useForm } from "react-hook-form";

import RoleField from "@/features/form/ui/fields/RoleField";
import Button from "@/shared/ui/buttons/base-button";
import { Form } from "@/shared/ui/form";

interface RoleSectionProps {
  selectedRole: "TEACHER" | "PROSPECTIVE_TEACHER";
  isNewUser: boolean;
  isPending: boolean;
  onChange: (role: "TEACHER" | "PROSPECTIVE_TEACHER") => void;
  onSubmit: () => void;
}

export default function RoleSection({
  selectedRole,
  isNewUser,
  isPending,
  onChange,
  onSubmit,
}: RoleSectionProps) {
  // RoleField 내부의 Form components가 FormContext를 요구하므로 간단한 컨텍스트 제공
  const dummyForm = useForm({
    defaultValues: { role: selectedRole },
    mode: "onChange",
  });
  return (
    <section>
      <h2 className="sr-only">역할 변경</h2>
      <Form {...dummyForm}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="flex flex-col gap-4"
        >
          <RoleField
            selectedRole={selectedRole}
            onRoleChange={onChange}
            label={isNewUser ? "해당되는 역할을 선택해주세요." : "역할"}
          />
          {!isNewUser && (
            <Button
              type="submit"
              disabled={isPending}
              variant="secondary"
              font="md"
            >
              역할 변경하기
            </Button>
          )}
        </form>
      </Form>
    </section>
  );
}
