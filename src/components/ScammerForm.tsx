
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Mail, Phone, Share2, AlertTriangle } from 'lucide-react';
import { useForm } from '@/hooks/use-form';
import { getScammerFormValidation, validateContactMethod } from '@/lib/scammer-validation';
import { ScammerData } from '@/components/ScammerCard';
import { toast } from '@/hooks/use-toast';

type ScammerFormValues = {
  name: string;
  phone: string;
  email: string;
  socialLinks: string;
  details: string;
  category: string;
};

const defaultValues: ScammerFormValues = {
  name: '',
  phone: '',
  email: '',
  socialLinks: '',
  details: '',
  category: 'احتيال إلكتروني',
};

interface ScammerFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingScammer: ScammerData | null;
  onSave: (scammer: Partial<ScammerData>) => void;
}

export const ScammerForm: React.FC<ScammerFormProps> = ({
  isOpen,
  onClose,
  editingScammer,
  onSave,
}) => {
  const isEditing = !!editingScammer;
  
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    isSubmitting,
    reset,
    setValue,
    validateAllFields
  } = useForm({
    initialValues: defaultValues,
    onSubmit: handleFormSubmit,
    validations: getScammerFormValidation(),
    validateOnChange: true,
  });
  
  // Set form values when editing an existing scammer
  useEffect(() => {
    if (editingScammer) {
      setValue('name', editingScammer.name);
      setValue('phone', editingScammer.phone || '');
      setValue('email', editingScammer.email || '');
      setValue('details', editingScammer.details);
      setValue('category', editingScammer.category || 'احتيال إلكتروني');
      
      // Handle social links
      if (editingScammer.socialLinks) {
        const links = [];
        if (editingScammer.socialLinks.facebook) links.push(editingScammer.socialLinks.facebook);
        if (editingScammer.socialLinks.twitter) links.push(editingScammer.socialLinks.twitter);
        if (editingScammer.socialLinks.instagram) links.push(editingScammer.socialLinks.instagram);
        if (editingScammer.socialLinks.other) links.push(editingScammer.socialLinks.other);
        
        setValue('socialLinks', links.join('\n'));
      }
    } else {
      reset();
    }
  }, [editingScammer, setValue, reset]);
  
  function handleFormSubmit(data: ScammerFormValues) {
    // Validate that at least one contact method is provided
    if (!validateContactMethod({
      scammerPhone: data.phone,
      scammerEmail: data.email,
      scammerSocial: data.socialLinks
    })) {
      toast({
        title: "خطأ في النموذج",
        description: "يجب توفير طريقة اتصال واحدة على الأقل (هاتف، بريد إلكتروني، أو حساب تواصل اجتماعي)",
        variant: "destructive",
      });
      return;
    }
    
    // Process social links
    const socialLinksArray = data.socialLinks.split('\n').filter(link => link.trim() !== '');
    const socialLinks: Record<string, string> = {};
    
    socialLinksArray.forEach((link, index) => {
      if (link.includes('facebook')) {
        socialLinks.facebook = link;
      } else if (link.includes('twitter')) {
        socialLinks.twitter = link;
      } else if (link.includes('instagram')) {
        socialLinks.instagram = link;
      } else {
        // For other links or if can't determine the platform
        socialLinks.other = link;
      }
    });
    
    const scammerData = {
      name: data.name,
      phone: data.phone || undefined,
      email: data.email || undefined,
      details: data.details,
      category: data.category,
      socialLinks: Object.keys(socialLinks).length > 0 ? socialLinks : undefined,
      // Add additional fields for new scammers
      ...(isEditing ? {} : {
        id: `new-${Date.now()}`,
        reportCount: 1,
        verified: false,
        createdAt: new Date().toISOString().split('T')[0],
      }),
    };

    onSave(scammerData);
    onClose();
    reset();
    
    toast({
      title: isEditing ? "تم تحديث المحتال" : "تمت إضافة المحتال",
      description: isEditing 
        ? `تم تحديث معلومات المحتال "${data.name}" بنجاح`
        : `تمت إضافة المحتال "${data.name}" بنجاح`,
    });
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl text-right">
            {isEditing ? 'تحرير معلومات المحتال' : 'إضافة محتال جديد'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-right block">اسم المحتال <span className="text-destructive">*</span></Label>
              <Input
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="أدخل اسم المحتال"
                className="text-right"
                dir="rtl"
              />
              {errors.name && (
                <p className="text-destructive text-sm mt-1 text-right">{errors.name}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-right block">
                  رقم الهاتف
                  <span className="text-muted-foreground text-xs mr-2">(إحدى طرق الاتصال مطلوبة)</span>
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <Phone size={16} className="text-muted-foreground" />
                  </div>
                  <Input
                    id="phone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    placeholder="966501234567"
                    className="text-right pr-9"
                    dir="rtl"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-right block">
                  البريد الإلكتروني
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <Mail size={16} className="text-muted-foreground" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className="text-right pr-9"
                    dir="rtl"
                  />
                </div>
                {errors.email && (
                  <p className="text-destructive text-sm mt-1 text-right">{errors.email}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="socialLinks" className="text-right block">
                حسابات التواصل الاجتماعي
                <span className="text-muted-foreground text-xs mr-2">(رابط واحد لكل سطر)</span>
              </Label>
              <div className="relative">
                <div className="absolute top-3 right-3">
                  <Share2 size={16} className="text-muted-foreground" />
                </div>
                <Textarea
                  id="socialLinks"
                  name="socialLinks"
                  value={values.socialLinks}
                  onChange={handleChange}
                  placeholder="https://facebook.com/username
https://twitter.com/username"
                  className="min-h-[80px] text-right pr-9"
                  dir="rtl"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category" className="text-right block">نوع الاحتيال</Label>
              <select
                id="category"
                name="category"
                value={values.category}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-right"
                dir="rtl"
              >
                <option value="احتيال إلكتروني">احتيال إلكتروني</option>
                <option value="احتيال وظيفي">احتيال وظيفي</option>
                <option value="احتيال بنكي">احتيال بنكي</option>
                <option value="منتجات مغشوشة">منتجات مغشوشة</option>
                <option value="استثمارات وهمية">استثمارات وهمية</option>
                <option value="احتيال خدمي">احتيال خدمي</option>
                <option value="أخرى">أخرى</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="details" className="text-right block">تفاصيل الاحتيال <span className="text-destructive">*</span></Label>
              <Textarea
                id="details"
                name="details"
                value={values.details}
                onChange={handleChange}
                placeholder="اكتب تفاصيل الاحتيال هنا..."
                className="min-h-[120px] text-right"
                dir="rtl"
              />
              {errors.details && (
                <p className="text-destructive text-sm mt-1 text-right">{errors.details}</p>
              )}
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex items-start gap-2 text-right">
              <AlertTriangle size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-800">
                <p className="font-medium">معلومات مهمة</p>
                <p>يرجى التأكد من صحة المعلومات قبل إضافتها، والتأكد من وجود دليل على عملية الاحتيال.</p>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              إلغاء
            </Button>
            <Button 
              type="submit" 
              className="w-full sm:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'جاري الحفظ...' : isEditing ? 'حفظ التغييرات' : 'إضافة المحتال'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
