import { useState } from "react";

export default function useFormData<T extends Record<string, unknown>>(
  initialData: Partial<T> = {}
) {
  const [formData, setFormData] = useState<Partial<T>>(initialData);

  const updateFormData = (data: Partial<T>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetFormData = () => {
    setFormData(initialData);
  };

  const getFormValue = <K extends keyof T>(key: K): T[K] | undefined => {
    return formData[key];
  };

  const setFormValue = <K extends keyof T>(key: K, value: T[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return {
    formData,
    updateFormData,
    resetFormData,
    getFormValue,
    setFormValue,
  };
}
