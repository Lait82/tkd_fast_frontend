import { useState, useCallback } from "react";
import { ZodObject, ZodRawShape, infer as zInfer } from "zod";

type FormErrors<T> = Partial<Record<keyof T, string>>;

export function useFormValidation<
  Shape extends ZodRawShape
>(schema: ZodObject<Shape>) {
  type T = zInfer<typeof schema>;

  const [errors, setErrors] = useState<FormErrors<T>>({});

  const validate = useCallback((data: T) => {
    const result = schema.safeParse(data);

    if (result.success) {
      setErrors({});
      return true;
    }

    const next: FormErrors<T> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof T;
      if (!next[key]) next[key] = issue.message;
    }

    setErrors(next);
    return false;
  }, [schema]);

  const validateField = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      const fieldSchema = schema.shape[field as string];

      const result = fieldSchema.safeParse(value);

      if (result.success) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
        return true;
      }

      setErrors((prev) => ({
        ...prev,
        [field]: result.error.issues[0]?.message,
      }));

      return false;
    },
    [schema]
  );

  const clearField = useCallback(
    <K extends keyof T>(field: K) => {
      setErrors((prev) => {
        if (!prev[field]) return prev; // evita rerender innecesario
        return { ...prev, [field]: undefined };
      });
    },
    []
  );

  const clearErrors = useCallback(() => setErrors({}), []);

  return {
    errors,
    validate,
    validateField,
    clearField,
    clearErrors,
  };
}