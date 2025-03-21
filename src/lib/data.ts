
import { ScammerData } from '@/components/ScammerCard';
import { ReportData } from '@/components/AdminReportList';

export const mockScammers: ScammerData[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    phone: '966501234567',
    email: 'scammer1@fakeemail.com',
    socialLinks: {
      facebook: 'https://facebook.com/scammer1',
      twitter: 'https://twitter.com/scammer1',
    },
    details: 'يقوم بالاحتيال عن طريق بيع منتجات وهمية عبر الإنترنت ويطلب تحويل المبلغ مقدمًا. يدعي أنه يبيع أجهزة إلكترونية بأسعار منخفضة جدًا وبعد استلام المبلغ يختفي ولا يرد على الرسائل أو المكالمات.',
    category: 'احتيال إلكتروني',
    verified: true,
    reportCount: 15,
    createdAt: '2023-08-15',
  },
  {
    id: '2',
    name: 'سارة علي',
    phone: '966512345678',
    email: 'scammer2@fakeemail.com',
    socialLinks: {
      instagram: 'https://instagram.com/scammer2',
    },
    details: 'تقوم بالاحتيال عن طريق ادعاء توظيف الشباب برواتب عالية. تطلب مبلغ تأمين وتختفي بعد استلامه. تستهدف الباحثين عن عمل وتستغل حاجتهم للوظائف.',
    category: 'احتيال وظيفي',
    verified: false,
    reportCount: 8,
    createdAt: '2023-09-20',
  },
  {
    id: '3',
    name: 'محمد عبدالله',
    phone: '966523456789',
    socialLinks: {
      facebook: 'https://facebook.com/scammer3',
      other: 'https://scammer-website.com',
    },
    details: 'يقوم بالتواصل هاتفيًا مدعيًا أنه من البنك ويطلب معلومات بطاقات الائتمان وكلمات المرور. يستخدم تقنيات الهندسة الاجتماعية لإقناع الضحايا بإعطائه المعلومات السرية.',
    category: 'احتيال بنكي',
    verified: true,
    reportCount: 25,
    createdAt: '2023-07-10',
  },
  {
    id: '4',
    name: 'فاطمة أحمد',
    email: 'scammer4@fakeemail.com',
    socialLinks: {
      instagram: 'https://instagram.com/scammer4',
      twitter: 'https://twitter.com/scammer4',
    },
    details: 'تقوم ببيع منتجات تجميل مقلدة وتدعي أنها أصلية. المنتجات تسبب مشاكل صحية للبشرة. تستهدف النساء عبر مواقع التواصل الاجتماعي وتقدم عروض وهمية.',
    category: 'منتجات مغشوشة',
    verified: true,
    reportCount: 12,
    createdAt: '2023-10-05',
  },
  {
    id: '5',
    name: 'عمر خالد',
    phone: '966534567890',
    socialLinks: {
      other: 'https://fake-investment.com',
    },
    details: 'يقوم بالترويج لفرص استثمار وهمية بعوائد مرتفعة. يجمع أموال المستثمرين ثم يختفي. يستخدم موقع إلكتروني احترافي المظهر لإيهام الضحايا بمصداقية المشروع الاستثماري.',
    category: 'استثمارات وهمية',
    verified: false,
    reportCount: 18,
    createdAt: '2023-11-12',
  },
  {
    id: '6',
    name: 'خالد محمود',
    phone: '966545678901',
    email: 'scammer6@fakeemail.com',
    details: 'يدعي أنه يقدم خدمات صيانة منزلية، يطلب دفعة مقدمة ثم لا يكمل العمل أو يقوم بتنفيذه بشكل سيء جدًا. يستهدف كبار السن بشكل خاص الذين لا يستطيعون متابعة الأعمال بدقة.',
    category: 'احتيال خدمي',
    verified: true,
    reportCount: 7,
    createdAt: '2023-12-03',
  },
];

export const mockReports: ReportData[] = [
  {
    id: '1',
    scammerName: 'خالد سعيد',
    scammerPhone: '966556789012',
    scammerEmail: 'newscammer1@fakeemail.com',
    reporterName: 'علي محمد',
    reporterEmail: 'reporter1@email.com',
    status: 'pending',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    scammerName: 'نورة أحمد',
    scammerPhone: '966567890123',
    reporterName: 'سعاد خالد',
    status: 'approved',
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    scammerName: 'فهد العلي',
    scammerEmail: 'newscammer3@fakeemail.com',
    status: 'rejected',
    createdAt: '2024-01-05',
  },
  {
    id: '4',
    scammerName: 'عبدالله محمد',
    scammerPhone: '966578901234',
    reporterName: 'محمد أحمد',
    reporterEmail: 'reporter4@email.com',
    status: 'pending',
    createdAt: '2024-01-20',
  },
  {
    id: '5',
    scammerName: 'ليلى خالد',
    scammerEmail: 'newscammer5@fakeemail.com',
    reporterName: 'نوف سعد',
    status: 'approved',
    createdAt: '2024-01-18',
  },
];
