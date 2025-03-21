
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, Edit, Search, Trash, X } from 'lucide-react';
import { ScammerData } from '@/components/ScammerCard';
import { toast } from '@/hooks/use-toast';

interface AdminScammerListProps {
  scammers: ScammerData[];
}

export const AdminScammerList: React.FC<AdminScammerListProps> = ({ scammers }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredScammers, setFilteredScammers] = useState<ScammerData[]>(scammers);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredScammers(scammers);
    } else {
      const filtered = scammers.filter(scammer => 
        scammer.name.toLowerCase().includes(query) || 
        (scammer.phone && scammer.phone.includes(query)) ||
        (scammer.email && scammer.email.toLowerCase().includes(query))
      );
      setFilteredScammers(filtered);
    }
  };

  const handleEdit = (id: string) => {
    toast({
      title: "تحرير المحتال",
      description: `تم فتح نموذج تحرير المحتال برقم ${id}`,
    });
  };

  const handleDelete = (id: string) => {
    toast({
      title: "حذف المحتال",
      description: `تم حذف المحتال برقم ${id}`,
    });
  };

  const handleVerify = (id: string, currentStatus: boolean) => {
    toast({
      title: currentStatus ? "إلغاء التحقق" : "تأكيد التحقق",
      description: `تم ${currentStatus ? 'إلغاء التحقق من' : 'تأكيد'} المحتال برقم ${id}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={18} className="text-muted-foreground" />
          </div>
          <Input
            placeholder="البحث حسب الاسم، رقم الهاتف، أو البريد الإلكتروني..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 text-right"
            dir="rtl"
          />
        </div>
        <Button>
          إضافة محتال
        </Button>
      </div>

      <div className="rounded-lg border shadow-subtle overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right w-[80px]">رقم</TableHead>
              <TableHead className="text-right">الاسم</TableHead>
              <TableHead className="text-right">رقم الهاتف</TableHead>
              <TableHead className="text-right">البريد الإلكتروني</TableHead>
              <TableHead className="text-right">عدد البلاغات</TableHead>
              <TableHead className="text-right">التحقق</TableHead>
              <TableHead className="text-right w-[130px]">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredScammers.length > 0 ? (
              filteredScammers.map((scammer, index) => (
                <TableRow key={scammer.id}>
                  <TableCell className="text-right font-medium">{index + 1}</TableCell>
                  <TableCell className="text-right">{scammer.name}</TableCell>
                  <TableCell className="text-right">{scammer.phone || "-"}</TableCell>
                  <TableCell className="text-right">{scammer.email || "-"}</TableCell>
                  <TableCell className="text-right">{scammer.reportCount}</TableCell>
                  <TableCell className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      scammer.verified 
                        ? 'bg-green-50 text-green-600' 
                        : 'bg-amber-50 text-amber-600'
                    }`}>
                      {scammer.verified ? 'مُتحقق' : 'غير مُتحقق'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleVerify(scammer.id, scammer.verified)}
                        className="h-8 w-8 p-0"
                      >
                        {scammer.verified ? <X size={16} /> : <Check size={16} />}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(scammer.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(scammer.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                      >
                        <Trash size={16} />
                      </Button>
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
