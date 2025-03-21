
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { ImagePlus, Loader2, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useForm } from '@/hooks/use-form';
import { getScammerFormValidation, validateContactMethod } from '@/lib/scammer-validation';

interface FormValues {
  scammerName: string;
  scammerPhone: string;
  scammerEmail: string;
  scammerSocial: string;
  scammerDetails: string;
  reporterName: string;
  reporterEmail: string;
}

export const ReportForm: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [scammerImage, setScammerImage] = useState<File | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  
  const formValidation = getScammerFormValidation();
  
  const { 
    values, 
    handleChange, 
    handleSubmit, 
    isSubmitting, 
    reset 
  } = useForm<FormValues>({
    initialValues: {
      scammerName: '',
      scammerPhone: '',
      scammerEmail: '',
      scammerSocial: '',
      scammerDetails: '',
      reporterName: '',
      reporterEmail: '',
    },
    onSubmit: async (values) => {
      // In real applications, you would submit to your API here
      console.log('Submitting form with values:', values, 'and image:', scammerImage);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "تم إرسال البلاغ بنجاح",
        description: "شكرًا لمساهمتك في مكافحة الإحتيال. سنقوم بمراجعة البلاغ في أقرب وقت.",
      });
      
      // Reset form and state
      reset();
      setImagePreview(null);
      setScammerImage(null);
      setCurrentStep(1);
    },
    validations: formValidation
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      setScammerImage(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setScammerImage(null);
      setImagePreview(null);
    }
  };

  const clearImagePreview = () => {
    setScammerImage(null);
    setImagePreview(null);
  };

  const handleStepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      // Validate required fields for step 1
      if (!values.scammerName.trim()) {
        toast({
          title: "خطأ في النموذج",
          description: "الرجاء إدخال اسم المحتال",
          variant: "destructive"
        });
        return;
      }
      
      if (!values.scammerDetails.trim()) {
        toast({
          title: "خطأ في النموذج",
          description: "الرجاء إدخال تفاصيل عن عملية الإحتيال",
          variant: "destructive"
        });
        return;
      }
      
      // Validate at least one contact method
      if (!validateContactMethod(values)) {
        toast({
          title: "خطأ في النموذج",
          description: "الرجاء إدخال طريقة تواصل واحدة على الأقل (هاتف، بريد إلكتروني، أو حساب تواصل اجتماعي)",
          variant: "destructive"
        });
        return;
      }
      
      // Move to step 2
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Handle the actual form submission
    handleSubmit(e);
  };

  return (
    <Card className="shadow-card border-border/60 overflow-hidden animate-fade-in">
      <div className="h-2 bg-primary" />
      <CardContent className="p-6 md:p-8">
        <form onSubmit={handleStepSubmit} className="space-y-6">
          <div className="text-right">
            <h2 className="text-2xl font-heading font-bold text-foreground">
              {currentStep === 1 ? 'الإبلاغ عن محتال' : 'معلومات المبلغ (اختياري)'}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {currentStep === 1 
                ? 'ساعدنا في مكافحة الإحتيال بتقديم معلومات عن المحتالين' 
                : 'يمكنك تقديم البلاغ بشكل مجهول'}
            </p>
          </div>

          {/* Step 1: Scammer Information */}
          <div className={cn("space-y-6 transition-all-300", 
            currentStep === 1 ? "block animate-fade-in" : "hidden")}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="scammerName" className="text-right block">اسم المحتال *</Label>
                <Input
                  id="scammerName"
                  name="scammerName"
                  value={values.scammerName}
                  onChange={handleChange}
                  placeholder="الاسم الكامل للمحتال"
                  className="mt-1 text-right"
                  dir="rtl"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="scammerPhone" className="text-right block">رقم الهاتف</Label>
                <Input
                  id="scammerPhone"
                  name="scammerPhone"
                  value={values.scammerPhone}
                  onChange={handleChange}
                  placeholder="رقم هاتف المحتال"
                  className="mt-1 text-right"
                  dir="rtl"
                />
              </div>
              
              <div>
                <Label htmlFor="scammerEmail" className="text-right block">البريد الإلكتروني</Label>
                <Input
                  id="scammerEmail"
                  name="scammerEmail"
                  type="email"
                  value={values.scammerEmail}
                  onChange={handleChange}
                  placeholder="البريد الإلكتروني للمحتال"
                  className="mt-1 text-right"
                  dir="rtl"
                />
              </div>
              
              <div>
                <Label htmlFor="scammerSocial" className="text-right block">حسابات التواصل الاجتماعي</Label>
                <Input
                  id="scammerSocial"
                  name="scammerSocial"
                  value={values.scammerSocial}
                  onChange={handleChange}
                  placeholder="رابط حساب فيسبوك، تويتر، انستغرام، الخ..."
                  className="mt-1 text-right"
                  dir="rtl"
                />
              </div>
              
              <div>
                <Label htmlFor="scammerDetails" className="text-right block">تفاصيل إضافية *</Label>
                <Textarea
                  id="scammerDetails"
                  name="scammerDetails"
                  value={values.scammerDetails}
                  onChange={handleChange}
                  rows={5}
                  placeholder="اشرح طريقة الاحتيال وتفاصيل أخرى مهمة..."
                  className="mt-1 text-right"
                  dir="rtl"
                  required
                />
              </div>
              
              <div>
                <Label className="text-right block mb-2">صورة المحتال (اختياري)</Label>
                <div className="mt-1 border border-dashed border-border rounded-lg p-4">
                  {!imagePreview ? (
                    <div className="text-center">
                      <Label 
                        htmlFor="scammerImage" 
                        className="cursor-pointer flex flex-col items-center justify-center py-6"
                      >
                        <ImagePlus className="h-12 w-12 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">اضغط هنا لرفع صورة</span>
                        <span className="text-xs text-muted-foreground/70 mt-1">
                          JPG, PNG, GIF حتى 5MB
                        </span>
                      </Label>
                      <Input
                        id="scammerImage"
                        name="scammerImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-auto max-h-64 object-contain rounded-md"
                      />
                      <button
                        type="button"
                        onClick={clearImagePreview}
                        className="absolute top-2 right-2 p-1 bg-white/90 rounded-full text-foreground shadow-subtle hover:bg-white transition-colors"
                        aria-label="Remove image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center pt-4">
              <Button 
                type="submit"
                className="w-full sm:w-auto min-w-[200px] gap-2 transition-all-200"
              >
                <span>المتابعة</span>
              </Button>
            </div>
          </div>

          {/* Step 2: Reporter Information (Optional) */}
          <div className={cn("space-y-6 transition-all-300", 
            currentStep === 2 ? "block animate-fade-in" : "hidden")}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="reporterName" className="text-right block">اسمك (اختياري)</Label>
                <Input
                  id="reporterName"
                  name="reporterName"
                  value={values.reporterName}
                  onChange={handleChange}
                  placeholder="اسمك"
                  className="mt-1 text-right"
                  dir="rtl"
                />
              </div>
              
              <div>
                <Label htmlFor="reporterEmail" className="text-right block">بريدك الإلكتروني (اختياري)</Label>
                <Input
                  id="reporterEmail"
                  name="reporterEmail"
                  type="email"
                  value={values.reporterEmail}
                  onChange={handleChange}
                  placeholder="بريدك الإلكتروني للتواصل عند الحاجة"
                  className="mt-1 text-right"
                  dir="rtl"
                />
                <p className="mt-1 text-xs text-muted-foreground text-right">
                  لن يتم مشاركة معلوماتك الشخصية مع أي طرف ثالث.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-col-reverse sm:flex-row gap-3 justify-between">
              <Button 
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="gap-2"
                disabled={isSubmitting}
              >
                <span>العودة</span>
              </Button>
              
              <Button 
                type="submit"
                className="w-full sm:w-auto min-w-[200px] gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>جارِ الإرسال...</span>
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    <span>إرسال البلاغ</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
