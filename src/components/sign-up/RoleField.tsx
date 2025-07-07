import { FormItem, FormLabel, FormMessage } from "@/components/@shared/form";
import RoleButton from "@/components/sign-up/RoleButton";
import { SVG_PATHS } from "@/constants/assets-path";
import { CommunityCategoryType } from "@/constants/community";

interface RoleFieldProps {
  selectedRole: CommunityCategoryType;
  onRoleChange: (role: CommunityCategoryType) => void;
  label?: string;
  error?: string;
}

export default function RoleField({
  selectedRole,
  onRoleChange,
  label = "해당되는 역할을 선택해주세요.",
  error,
}: RoleFieldProps) {
  return (
    <FormItem>
      <FormLabel className="font-semibold text-primary-dark01">
        {label}
      </FormLabel>
      <div className="flex w-full gap-3">
        <RoleButton
          role="TEACHER"
          isSelected={selectedRole === "TEACHER"}
          onClick={() => onRoleChange("TEACHER")}
          character={SVG_PATHS.CHARACTER.chicken}
          title="교사예요."
          description="교사 경력을 인증할 수 있어요!"
        />
        <RoleButton
          role="PROSPECTIVE_TEACHER"
          isSelected={selectedRole === "PROSPECTIVE_TEACHER"}
          onClick={() => onRoleChange("PROSPECTIVE_TEACHER")}
          character={SVG_PATHS.CHARACTER.chick}
          title="예비교사예요."
          description="교사를 꿈꾸는, 아직 경력이 없는 사람이에요!"
        />
      </div>
      {error && <FormMessage>{error}</FormMessage>}
    </FormItem>
  );
}
