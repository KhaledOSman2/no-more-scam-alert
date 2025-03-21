
import { useState, ChangeEvent, FormEvent } from 'react';
import { validateForm, FieldValidation } from '@/lib/validation';
import { toast } from '@/hooks/use-toast';

interface UseFormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  validations?: FieldValidation;
  /**
   * If true, will validate fields as they're changed
   */
  validateOnChange?: boolean;
  /**
   * If true, will show toast messages for validation errors 
   */
  showValidationToasts?: boolean;
}

export function useForm<T>({
  initialValues,
  onSubmit,
  validations = {},
  validateOnChange = false,
  showValidationToasts = true
}: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    
    // Mark field as touched
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    
    // Clear error for this field when user makes changes
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    // Validate on change if enabled
    if (validateOnChange && validations[name]) {
      validateField(name, value);
    }
  };
  
  const validateField = (fieldName: string, value: any): boolean => {
    if (!validations[fieldName]) return true;
    
    for (const rule of validations[fieldName]) {
      if (!rule.test(value)) {
        setErrors(prev => ({ ...prev, [fieldName]: rule.message }));
        
        if (showValidationToasts) {
          toast({
            title: "خطأ في النموذج",
            description: rule.message,
            variant: "destructive",
          });
        }
        
        return false;
      }
    }
    
    // Clear error if validation passes
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
    
    return true;
  };
  
  const validateAllFields = (): boolean => {
    if (Object.keys(validations).length === 0) return true;
    
    let isValid = true;
    const newErrors: Record<string, string> = {};
    
    // Check each field with validation rules
    for (const [field, rules] of Object.entries(validations)) {
      for (const rule of rules) {
        if (!rule.test(values[field as keyof T])) {
          newErrors[field] = rule.message;
          isValid = false;
          
          if (showValidationToasts) {
            toast({
              title: "خطأ في النموذج",
              description: rule.message,
              variant: "destructive",
            });
          }
          
          break; // Show only first error for each field
        }
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const isValid = validateAllFields();
    if (!isValid) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
      
      toast({
        title: "خطأ في إرسال النموذج",
        description: "حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouchedFields({});
  };
  
  const setValue = (name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };
  
  return {
    values,
    handleChange,
    handleSubmit,
    isSubmitting,
    errors,
    touchedFields,
    reset,
    setValue,
    validateField,
    validateAllFields
  };
}
