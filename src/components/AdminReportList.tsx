
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, Check, Eye, Search, Trash } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export interface ReportData {
  id: string;
  scammerName: string;
  scammerPhone?: string;
  scammerEmail?: string;
  reporterName?: string;
  reporterEmail?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface AdminReportListProps {
  reports: ReportData[];
}

export const AdminReportList: React.FC<AdminReportListProps> = ({ reports }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredReports, setFilteredReports] = useState<ReportData[]>(reports);

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

  const handleView = (id: string) => {
    toast({
      title: "عرض البلاغ",
      description: `تم فتح البلاغ رقم ${id} للمراجعة`,
    });
  };

  const handleApprove = (id: string) => {
    toast({
      title: "تم الموافقة على البلاغ",
      description: `تمت الموافقة على البلاغ رقم ${id} وإضافته للمحتالين`,
    });
  };

  const handleReject = (id: string) => {
    toast({
      title: "تم رفض البلاغ",
      description: `تم رفض البلاغ رقم ${id}`,
    });
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
                    {new Date(report.createdAt).toLocaleDateString('ar')}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      report.status === 'approved' 
                        ? 'bg-green-50 text-green-600' 
                        : report.status === 'rejected'
                          ? 'bg-red-50 text-red-600'
                          : 'bg-amber-50 text-amber-600'
                    }`}>
                      {report.status === 'approved' 
                        ? 'تمت الموافقة' 
                        : report.status === 'rejected' 
                          ? 'مرفوض' 
                          : 'قيد المراجعة'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleView(report.id)}
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
    </div>
  );
};
