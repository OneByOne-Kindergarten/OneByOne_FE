import { Control, Controller, FieldErrors } from "react-hook-form";
import { Link } from "react-router-dom";

import { Checkbox } from "@/shared/ui/checkbox";
import { FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { UserInfoFormValues } from "@/widgets/auth/ui/SignUpForm";

interface PolicyFieldProps {
  control: Control<UserInfoFormValues>;
  errors?: FieldErrors<UserInfoFormValues>;
}

export default function PolicyField({ control, errors }: PolicyFieldProps) {
  return (
    <section className="space-y-2">
      <Controller
        name="termsOfService"
        control={control}
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="terms-of-service"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <div className="flex w-full items-center justify-between">
                <FormLabel
                  htmlFor="terms-of-service"
                  className="text-sm font-normal leading-5"
                >
                  <span className="mr-2 text-tertiary-3">[필수]</span>
                  서비스 이용약관 동의
                </FormLabel>
                <Link
                  to="https://abounding-leather-799.notion.site/229a1b804ebf800e9315d90ad4b190ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-normal03 underline hover:opacity-70"
                >
                  보기
                </Link>
              </div>
            </div>
            <FormMessage>{errors?.termsOfService?.message}</FormMessage>
          </FormItem>
        )}
      />

      <Controller
        name="privacyPolicy"
        control={control}
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="privacy-policy"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <div className="flex w-full items-center justify-between">
                <FormLabel
                  htmlFor="privacy-policy"
                  className="text-sm font-normal leading-5"
                >
                  <span className="mr-2 text-tertiary-3">[필수]</span>
                  개인정보 수집 및 이용 동의
                </FormLabel>
                <Link
                  to="https://abounding-leather-799.notion.site/229a1b804ebf8008b748e404bffa1aa8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-normal03 underline hover:text-primary"
                >
                  보기
                </Link>
              </div>
            </div>
            <FormMessage>{errors?.privacyPolicy?.message}</FormMessage>
          </FormItem>
        )}
      />
    </section>
  );
}
