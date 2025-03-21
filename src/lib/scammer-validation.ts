import { FieldValidation, commonRules } from './validation';

export const getScammerFormValidation = (): FieldValidation => ({
  scammerName: [
    commonRules.required('اسم المحتال')
  ],
  scammerDetails: [
    commonRules.required('تفاصيل عملية الاحتيال'),
    commonRules.minLength(20, 'تفاصيل عملية الاحتيال')
  ],
  // We need at least one contact method
  scammerPhone: [],
  scammerEmail: [],
  scammerSocial: [],
  // Optional reporter fields - add validation if needed but keep them optional
  reporterName: [],
  reporterEmail: [
    commonRules.email()
  ]
});

// Additional validation function for the contact method requirement
export const validateContactMethod = (values: Record<string, any>): boolean => {
  return !!(
    values.scammerPhone?.trim() || 
    values.scammerEmail?.trim() || 
    values.scammerSocial?.trim()
  );
};
