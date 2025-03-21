
import { toast } from "@/hooks/use-toast";

type ValidationRule = {
  test: (value: any) => boolean;
  message: string;
};

export type FieldValidation = {
  [key: string]: ValidationRule[];
};

export function validateForm(values: Record<string, any>, validations: FieldValidation): boolean {
  let isValid = true;
  
  for (const [field, rules] of Object.entries(validations)) {
    for (const rule of rules) {
      if (!rule.test(values[field])) {
        toast({
          title: "خطأ في النموذج",
          description: rule.message,
          variant: "destructive",
        });
        isValid = false;
        break;
      }
    }
    
    // If already invalid, break the loop to show only the first error
    if (!isValid) break;
  }
  
  return isValid;
}

// Common validation rules
export const commonRules = {
  required: (label: string): ValidationRule => ({
    test: (value) => !!value && value.toString().trim() !== '',
    message: `الرجاء إدخال ${label}`
  }),
  email: (): ValidationRule => ({
    test: (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: "الرجاء إدخال بريد إلكتروني صحيح"
  }),
  phone: (): ValidationRule => ({
    test: (value) => !value || /^[\d\+\-\s\(\)]{8,15}$/.test(value),
    message: "الرجاء إدخال رقم هاتف صحيح"
  }),
  minLength: (length: number, label: string): ValidationRule => ({
    test: (value) => !value || value.toString().trim().length >= length,
    message: `يجب أن يكون ${label} على الأقل ${length} أحرف`
  }),
  oneOf: (fields: string[], values: Record<string, any>, label: string): ValidationRule => ({
    test: () => fields.some(field => values[field] && values[field].toString().trim() !== ''),
    message: `الرجاء إدخال ${label} واحد على الأقل`
  })
};
