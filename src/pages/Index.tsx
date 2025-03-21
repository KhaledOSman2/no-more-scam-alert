
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { SearchBox } from '@/components/SearchBox';
import { ScammerCard, ScammerData } from '@/components/ScammerCard';
import { mockScammers } from '@/lib/data';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const [scammers, setScammers] = useState<ScammerData[]>([]);
  const [filteredScammers, setFilteredScammers] = useState<ScammerData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data from an API
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setScammers(mockScammers);
      setFilteredScammers(mockScammers);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredScammers(scammers);
      return;
    }

    const filtered = scammers.filter(scammer => {
      const searchFields = [
        scammer.name.toLowerCase(),
        scammer.phone?.toLowerCase() || '',
        scammer.email?.toLowerCase() || '',
        Object.values(scammer.socialLinks || {}).join(' ').toLowerCase(),
      ];

      return searchFields.some(field => field.includes(query.toLowerCase()));
    });

    setFilteredScammers(filtered);
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/30 pt-16 pb-24 border-b border-border/50">
        <div className="main-container text-center">
          <div className="max-w-3xl mx-auto animate-slide-up">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-medium bg-primary/10 text-primary rounded-full">
              تحقق قبل أن تثق
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-6">
              احمِ نفسك من الاحتيال
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10">
              ابحث عن رقم هاتف، اسم، أو رابط للتحقق مما إذا كان مرتبطًا بعمليات احتيال سابقة.
            </p>
            
            <SearchBox onSearch={handleSearch} />
            
            <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button asChild className="min-w-[160px]">
                <Link to="/report">الإبلاغ عن محتال</Link>
              </Button>
              
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-500" />
                <span>ساعدنا في مكافحة الاحتيال من خلال الإبلاغ</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute -top-8 -right-16 w-48 h-48 bg-primary/5 rounded-full blur-3xl opacity-70"></div>
      </section>

      {/* Scammers List Section */}
      <section className="py-16">
        <div className="main-container">
          <div className="mb-12 text-center animate-slide-up">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">
              {searchQuery 
                ? `نتائج البحث عن "${searchQuery}"`
                : "قائمة المحتالين"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {searchQuery 
                ? `${filteredScammers.length} نتيجة تطابق بحثك`
                : "تصفح قائمة المحتالين المبلغ عنهم والمتحقق منهم"}
            </p>
          </div>

          {isLoading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-lg border border-border/60 shadow-subtle overflow-hidden animate-pulse">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 w-full">
                        <div className="h-6 bg-secondary rounded-md w-1/2"></div>
                        <div className="h-4 bg-secondary rounded-md w-1/4"></div>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-secondary"></div>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="h-4 bg-secondary rounded-md w-full"></div>
                      <div className="h-4 bg-secondary rounded-md w-3/4"></div>
                      <div className="h-4 bg-secondary rounded-md w-5/6"></div>
                    </div>
                  </div>
                  <div className="px-6 py-3 bg-secondary/30">
                    <div className="h-4 bg-secondary rounded-md w-1/4 ml-auto"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredScammers.length > 0 ? (
            <div className="card-container">
              {filteredScammers.map((scammer) => (
                <div key={scammer.id} className="animate-scale-in">
                  <ScammerCard data={scammer} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
                <AlertTriangle size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">لا توجد نتائج</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                لم نجد أي محتالين يطابقون بحثك. إذا كنت تعتقد أنه محتال، يمكنك الإبلاغ عنه.
              </p>
              <Button asChild>
                <Link to="/report">الإبلاغ عن محتال</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-secondary/30 border-y border-border/50">
        <div className="main-container">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">كيف يعمل الموقع</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              نساعد في حماية المجتمع من الاحتيال من خلال جمع ومشاركة المعلومات حول المحتالين
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-lg p-6 shadow-subtle border border-border/60 animate-scale-in">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <span className="text-lg font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">البحث</h3>
              <p className="text-muted-foreground">
                ابحث عن رقم هاتف أو اسم أو رابط للتحقق مما إذا كان مرتبطًا بعمليات احتيال سابقة.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-subtle border border-border/60 animate-scale-in" style={{animationDelay: '100ms'}}>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <span className="text-lg font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">الإبلاغ</h3>
              <p className="text-muted-foreground">
                ساعدنا بالإبلاغ عن المحتالين الذين تعرضت لهم أو سمعت عنهم لحماية الآخرين.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-subtle border border-border/60 animate-scale-in" style={{animationDelay: '200ms'}}>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <span className="text-lg font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">المشاركة</h3>
              <p className="text-muted-foreground">
                انشر المعلومات حول المحتالين على وسائل التواصل الاجتماعي لتحذير الآخرين.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20">
        <div className="main-container">
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/10 text-center max-w-4xl mx-auto animate-scale-in">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              ساهم في حماية المجتمع من الاحتيال
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              كل بلاغ يساهم في بناء قاعدة بيانات أكثر شمولاً تساعد في حماية المزيد من الأشخاص.
              انضم إلينا في مكافحة الاحتيال.
            </p>
            <Button asChild size="lg" className="min-w-[200px]">
              <Link to="/report">الإبلاغ عن محتال</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
