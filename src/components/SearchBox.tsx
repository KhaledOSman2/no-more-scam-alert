
import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ 
  onSearch, 
  placeholder = "ابحث عن رقم هاتف، اسم، أو رابط..." 
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        inputRef.current?.blur();
        setIsFocused(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const clearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div 
      className={`relative transition-all-300 mx-auto max-w-3xl ${
        isFocused ? 'scale-[1.02]' : 'scale-100'
      }`}
    >
      <form onSubmit={handleSearch} className="relative">
        <div 
          className={`relative overflow-hidden rounded-full border transition-all-200 ${
            isFocused 
              ? 'border-primary shadow-[0_0_0_1px_rgba(66,153,225,0.5),0_0_20px_rgba(66,153,225,0.15)]' 
              : 'border-input shadow-subtle hover:border-muted-foreground/50'
          }`}
        >
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search 
              size={20} 
              className={`transition-colors ${isFocused ? 'text-primary' : 'text-muted-foreground'}`} 
            />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="h-14 w-full bg-background py-3 pl-12 pr-12 text-foreground placeholder:text-muted-foreground/80 focus:outline-none"
            placeholder={placeholder}
            dir="rtl"
          />
          
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>
        
        <button
          type="submit"
          className={`absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full px-6 py-2 text-sm font-medium transition-all-200 ${
            query.trim() ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } hover:brightness-105 transform hover:-translate-y-[1px] active:translate-y-0`}
        >
          بحث
        </button>
      </form>
    </div>
  );
};
