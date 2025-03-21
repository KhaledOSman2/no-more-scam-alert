
import React, { useState } from 'react';
import { AlertTriangle, Check, Copy, ExternalLink, Facebook, Instagram, Mail, Phone, Share, Twitter } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export interface ScammerData {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    other?: string;
  };
  details: string;
  image?: string;
  category?: string;
  verified: boolean;
  reportCount: number;
  createdAt: string;
}

interface ScammerCardProps {
  data: ScammerData;
}

export const ScammerCard: React.FC<ScammerCardProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "تم النسخ",
      description: `تم نسخ ${label} إلى الحافظة.`,
      duration: 3000,
    });
  };

  const shareScammer = () => {
    const shareData = {
      title: `تحذير من محتال: ${data.name}`,
      text: `انتبه من هذا المحتال: ${data.name}${data.phone ? ` - رقم الهاتف: ${data.phone}` : ''}. للمزيد من المعلومات قم بزيارة موقع No More Scam.`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      navigator.share(shareData)
        .catch(err => console.error('Error sharing:', err));
    } else {
      toast({
        title: "غير مدعوم",
        description: "المشاركة غير مدعومة في هذا المتصفح. الرجاء النسخ والمشاركة يدويًا.",
        duration: 3000,
      });
    }
  };

  const truncate = (text: string, length: number) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
  };

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl transition-all-300",
        "bg-white border border-border/60 shadow-card",
        "hover:shadow-elevated hover:border-border hover:-translate-y-1"
      )}
    >
      {/* Verification Badge */}
      <div className={cn(
        "absolute top-4 right-4 z-10 flex items-center gap-1.5 py-1 px-2.5 rounded-full",
        "text-xs font-medium transition-all-200",
        data.verified 
          ? "bg-green-50 text-green-600 border border-green-200"
          : "bg-amber-50 text-amber-600 border border-amber-200"
      )}>
        {data.verified ? (
          <>
            <Check size={14} />
            <span>تم التحقق</span>
          </>
        ) : (
          <>
            <AlertTriangle size={14} />
            <span>لم يتم التحقق</span>
          </>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4 flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-foreground">{data.name}</h3>
            {data.category && (
              <span className="inline-block mt-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full px-2.5 py-1">
                {data.category}
              </span>
            )}
            <p className="mt-2 text-sm text-muted-foreground">
              {new Date(data.createdAt).toLocaleDateString('ar')} • {data.reportCount} بلاغ
            </p>
          </div>
          
          {data.image && (
            <div className="w-14 h-14 rounded-full overflow-hidden border border-border">
              <img 
                src={data.image} 
                alt={data.name} 
                className="w-full h-full object-cover transition-transform-200 group-hover:scale-105" 
              />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-3 text-right">
          {data.phone && (
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => copyToClipboard(data.phone!, 'رقم الهاتف')}
                className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity-200"
                aria-label="نسخ رقم الهاتف"
              >
                <Copy size={16} />
              </button>
              <div className="flex items-center gap-2 text-right">
                <span className="text-sm text-foreground" dir="ltr">{data.phone}</span>
                <Phone size={16} className="text-primary" />
              </div>
            </div>
          )}

          {data.email && (
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => copyToClipboard(data.email!, 'البريد الإلكتروني')}
                className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity-200"
                aria-label="نسخ البريد الإلكتروني"
              >
                <Copy size={16} />
              </button>
              <div className="flex items-center gap-2 text-right">
                <span className="text-sm text-foreground">{data.email}</span>
                <Mail size={16} className="text-primary" />
              </div>
            </div>
          )}

          {/* Social Links */}
          {data.socialLinks && (
            <div className="flex items-center justify-end gap-3 mt-2">
              {data.socialLinks.facebook && (
                <a href={data.socialLinks.facebook} target="_blank" rel="noopener noreferrer" 
                   className="text-muted-foreground hover:text-blue-600 transition-colors">
                  <Facebook size={18} />
                </a>
              )}
              {data.socialLinks.twitter && (
                <a href={data.socialLinks.twitter} target="_blank" rel="noopener noreferrer" 
                   className="text-muted-foreground hover:text-blue-400 transition-colors">
                  <Twitter size={18} />
                </a>
              )}
              {data.socialLinks.instagram && (
                <a href={data.socialLinks.instagram} target="_blank" rel="noopener noreferrer" 
                   className="text-muted-foreground hover:text-pink-600 transition-colors">
                  <Instagram size={18} />
                </a>
              )}
              {data.socialLinks.other && (
                <a href={data.socialLinks.other} target="_blank" rel="noopener noreferrer" 
                   className="text-muted-foreground hover:text-foreground transition-colors">
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          )}

          {/* Details */}
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-foreground text-right">
              {isExpanded ? data.details : truncate(data.details, 150)}
            </p>
            {data.details.length > 150 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              >
                {isExpanded ? 'عرض أقل' : 'عرض المزيد'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-end gap-2 px-6 py-3 bg-secondary/50 border-t border-border">
        <button
          onClick={shareScammer}
          className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
        >
          <Share size={16} />
          <span>مشاركة</span>
        </button>
      </div>
    </div>
  );
};
