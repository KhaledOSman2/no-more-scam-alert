
import React, { useState, useRef } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminScammerList } from '@/components/AdminScammerList';
import { AdminReportList } from '@/components/AdminReportList';
import { mockScammers, mockReports } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Clock, FileBarChart, ListFilter, UserCheck, UserPlus, UserX } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('scammers');
  const addScammerButtonRef = useRef<HTMLButtonElement>(null);
  
  // Stats calculation
  const totalScammers = mockScammers.length;
  const verifiedScammers = mockScammers.filter(s => s.verified).length;
  const pendingReports = mockReports.filter(r => r.status === 'pending').length;
  const totalReports = mockReports.length;

  // Handler for adding a new scammer
  const handleAddScammerClick = () => {
    setActiveTab('scammers');
    // Use a timeout to ensure the tab change has completed before trying to access the button
    setTimeout(() => {
      const addButton = document.querySelector('.AdminScammerList [data-add-button="true"]') as HTMLButtonElement;
      if (addButton) {
        addButton.click();
      }
    }, 100);
  };

  return (
    <MainLayout>
      <div className="main-container py-8 md:py-12">
        <div className="mb-10 animate-slide-down">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            لوحة التحكم
          </h1>
          <p className="text-muted-foreground">
            إدارة المحتالين والبلاغات المقدمة من المستخدمين
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="p-6 border-border/60 shadow-subtle animate-scale-in hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                <UserX size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي المحتالين</p>
                <h3 className="text-2xl font-bold">{totalScammers}</h3>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 border-border/60 shadow-subtle animate-scale-in hover:shadow-md transition-shadow" style={{animationDelay: '100ms'}}>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                <UserCheck size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">المحتالين المتحقق منهم</p>
                <h3 className="text-2xl font-bold">{verifiedScammers}</h3>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 border-border/60 shadow-subtle animate-scale-in hover:shadow-md transition-shadow" style={{animationDelay: '200ms'}}>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">البلاغات قيد المراجعة</p>
                <h3 className="text-2xl font-bold">{pendingReports}</h3>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 border-border/60 shadow-subtle animate-scale-in hover:shadow-md transition-shadow" style={{animationDelay: '300ms'}}>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <FileBarChart size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي البلاغات</p>
                <h3 className="text-2xl font-bold">{totalReports}</h3>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button 
            className="inline-flex items-center bg-primary/10 hover:bg-primary/20 text-primary rounded-md px-4 py-2 text-sm font-medium transition-colors" 
            onClick={handleAddScammerClick}
          >
            <UserPlus size={16} className="ml-1.5" />
            إضافة محتال جديد
          </button>
          
          <button 
            className="inline-flex items-center bg-muted hover:bg-muted/80 text-muted-foreground rounded-md px-4 py-2 text-sm font-medium transition-colors"
            onClick={() => setActiveTab('reports')}
          >
            <ListFilter size={16} className="ml-1.5" />
            تصفية البلاغات
          </button>
        </div>

        {/* Management Tabs */}
        <div className="animate-slide-up">
          <Tabs defaultValue="scammers" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="scammers">إدارة المحتالين</TabsTrigger>
              <TabsTrigger value="reports">إدارة البلاغات</TabsTrigger>
            </TabsList>
            
            <TabsContent value="scammers" className="mt-0">
              <AdminScammerList scammers={mockScammers} />
            </TabsContent>
            
            <TabsContent value="reports" className="mt-0">
              <AdminReportList reports={mockReports} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Admin;
