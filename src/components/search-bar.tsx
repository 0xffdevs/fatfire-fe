'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery) {
      startTransition(() => {
        router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      });
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <div className="relative">
        <input
          type="text"
          placeholder="search tags..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="input-terminal w-40 lg:w-48 xl:w-56 pr-10 text-sm h-9"
          disabled={isPending}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-green-400 hover:text-green-300 transition-colors disabled:opacity-50"
          disabled={isPending || !searchQuery.trim()}
          aria-label="Search"
        >
          <Search className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
