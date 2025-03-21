
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, Check, Eye, Search, Trash } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export interface ReportData {
  id: string;
  scammerName: string;
  scammerPhone?: string;
  scammerEmail?: string;
  scammerDetails?: string;
  reporterName?: string;
  reporterEmail?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface AdminReportListProps {
  reports: ReportData[];
}

export const AdminReportList: React.FC<AdminReportListProps> = ({ reports: initialReports }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [reports, setReports] = useState<ReportData[]>(initialReports);
  const [filteredReports, setFilteredReports] = useState<ReportData[]>(initialReports);
  const [viewingReport, setViewingReport] = useState<ReportData | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredReports(reports);
    } else {
      const filtered = reports.filter(report => 
        report.scammerName.toLowerCase().includes(query) || 
        (report.scammerPhone && report.scammerPhone.includes(query)) ||
        (report.scammerEmail && report.scammerEmail.toLowerCase().includes(query)) ||
        (report.reporterName && report.reporterName.toLowerCase().includes(query))
      );
      setFilteredReports(filtered);
    }
  };

  const handleView = (report: ReportData) => {
    setViewingReport(report);
    setIsViewDialogOpen(true);
  };

  const handleApprove = (id: string) => {
    const updatedReports = reports.map(report => 
      report.id === id 
        ? { ...report, status: 'approved' as const } 
        : report
    );
    
    setReports(updatedReports);
    setFilteredReports(updatedReports);
    
    toast({
      title: "تم الموافقة على البلاغ",
      description: `تمت الموافقة على البلاغ رقم ${id} وإضافته للمحتالين`,
    });
  };

  const handleReject = (id: string) => {
    const updatedReports = reports.map(report => 
      report.id === id 
        ? { ...report, status: 'rejected' as const } 
        : report
    );
    
    setReports(updatedReports);
    setFilteredReports(updatedReports);
    
    toast({
      title: "تم رفض البلاغ",
      description: `تم رفض البلاغ رقم ${id}`,
    });
  };
  
  // Format date for better display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPP', { locale: ar });
    } catch (error) {
      return dateString;
    }
  };

  const getStatusBadge = (status: ReportData['status']) => {
    switch (status) {
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">تمت الموافقة</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">مرفوض</Badge>;
      case 'pending':
      default:
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">قيد المراجعة</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search size={18} className="text-muted-foreground" />
        </div>
        <Input
          placeholder="البحث في البلاغات..."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-10 text-right"
          dir="rtl"
        />
      </div>

      <div className="rounded-lg border shadow-subtle overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right w-[80px]">رقم</TableHead>
              <TableHead className="text-right">اسم المحتال</TableHead>
              <TableHead className="text-right">رقم الهاتف</TableHead>
              <TableHead className="text-right">اسم المبلغ</TableHead>
              <TableHead className="text-right">تاريخ البلاغ</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right w-[160px]">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report, index) => (
                <TableRow key={report.id}>
                  <TableCell className="text-right font-medium">{index + 1}</TableCell>
                  <TableCell className="text-right">{report.scammerName}</TableCell>
                  <TableCell className="text-right">{report.scammerPhone || "-"}</TableCell>
                  <TableCell className="text-right">{report.reporterName || "مجهول"}</TableCell>
                  <TableCell className="text-right">
                    {formatDate(report.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    {getStatusBadge(report.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleView(report)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye size={16} />
                      </Button>
                      
                      {report.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleApprove(report.id)}
                            className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Check size={16} />
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleReject(report.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                          >
                            <AlertTriangle size={16} />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  لا توجد نتائج تطابق بحثك
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Report Details Dialog */}
      {viewingReport && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]" dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-xl text-right">تفاصيل البلاغ</DialogTitle>
            </DialogHeader>
            
            <div className="mt-4 space-y-6">
              <div className="flex justify-between items-center">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">رقم البلاغ</p>
                  <p className="font-medium">{viewingReport.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">تاريخ البلاغ</p>
                  <p className="font-medium">{formatDate(viewingReport.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">الحالة</p>
                  <div className="mt-1">{getStatusBadge(viewingReport.status)}</div>
                </div>
              </div>
              
              <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-semibold text-right">معلومات المحتال</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">الاسم</p>
                    <p className="font-medium">{viewingReport.scammerName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">رقم الهاتف</p>
                    <p className="font-medium">{viewingReport.scammerPhone || "غير متوفر"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">البريد الإلكتروني</p>
                    <p className="font-medium">{viewingReport.scammerEmail || "غير متوفر"}</p>
                  </div>
                </div>
                
                {viewingReport.scammerDetails && (
                  <div className="text-right mt-3">
                    <p className="text-sm text-muted-foreground">تفاصيل الاحتيال</p>
                    <p className="mt-1 bg-muted p-3 rounded-md whitespace-pre-wrap">
                      {viewingReport.scammerDetails}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-semibold text-right">معلومات المُبلغ</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">الاسم</p>
                    <p className="font-medium">{viewingReport.reporterName || "مجهول"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">البريد الإلكتروني</p>
                    <p className="font-medium">{viewingReport.reporterEmail || "غير متوفر"}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="mt-6 flex-row-reverse sm:justify-start gap-2">
              {viewingReport.status === 'pending' && (
                <>
                  <Button 
                    variant="default" 
                    onClick={() => {
                      handleApprove(viewingReport.id);
                      setIsViewDialogOpen(false);
                    }}
                  >
                    <Check size={18} className="ml-1" />
                    الموافقة على البلاغ
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="text-destructive hover:text-destructive/80 hover:bg-destructive/10 border-destructive/30"
                    onClick={() => {
                      handleReject(viewingReport.id);
                      setIsViewDialogOpen(false);
                    }}
                  >
                    <AlertTriangle size={18} className="ml-1" />
                    رفض البلاغ
                  </Button>
                </>
              )}
              
              {viewingReport.status !== 'pending' && (
                <Button 
                  variant="outline" 
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  إغلاق
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
