
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { ReportForm } from '@/components/ReportForm';
import { AlertCircle, ShieldCheck } from 'lucide-react';

const Report = () => {
  return (
    <MainLayout>
      <div className="main-container py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-10 animate-slide-down">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              الإبلاغ عن محتال
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              ساعدنا في حماية المجتمع من خلال الإبلاغ عن المحتالين. معلوماتك تساهم في تحذير الآخرين.
            </p>
          </div>
          
          {/* Report Guidelines */}
          <div className="mb-8 bg-secondary/50 border border-border/60 rounded-lg p-6 animate-slide-up">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <AlertCircle className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">إرشادات الإبلاغ</h3>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  <li>تأكد من دقة المعلومات التي تقدمها في البلاغ.</li>
                  <li>يجب توفير طريقة تواصل واحدة على الأقل (رقم هاتف، بريد إلكتروني، حساب تواصل اجتماعي).</li>
                  <li>قدم وصفًا واضحًا لطريقة الاحتيال أو الخداع التي تعرضت لها أو سمعت عنها.</li>
                  <li>يمكنك تقديم البلاغ بشكل مجهول إذا كنت لا ترغب في مشاركة معلوماتك الشخصية.</li>
                  <li>ستتم مراجعة البلاغ من قبل فريقنا قبل نشره للتأكد من دقة المعلومات.</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Privacy Notice */}
          <div className="mb-8 bg-primary/5 border border-primary/10 rounded-lg p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">سياسة الخصوصية</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  نأخذ خصوصية المستخدمين على محمل الجد:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  <li>معلوماتك الشخصية (في حال تقديمها) لن يتم عرضها للعامة.</li>
                  <li>يمكنك تقديم البلاغ بشكل مجهول دون الحاجة لإدخال معلوماتك الشخصية.</li>
                  <li>نستخدم معلومات المُبلغ فقط للتواصل في حال الحاجة لمزيد من التفاصيل.</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Report Form */}
          <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <ReportForm />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Report;
