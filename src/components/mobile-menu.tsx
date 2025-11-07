'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Menu,
  X,
  Search,
  Terminal,
  Code,
  MessageSquare,
  BookOpen,
  Calculator,
  Twitter,
  Youtube,
  Instagram,
} from 'lucide-react';
import type { NavItem, SocialLink, IconName } from '@/types/nav';

interface MobileMenuProps {
  navItems: NavItem[];
  socialLinks: SocialLink[];
}

// Icon mapping for client component
const iconMap: Record<IconName, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Twitter,
  MessageSquare,
  Calculator,
  Code,
  Terminal,
  Youtube,
  Instagram,
};

export function MobileMenu({ navItems, socialLinks }: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery) {
      startTransition(() => {
        router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
        setIsMenuOpen(false);
      });
    }
  };

  // Close menu on Escape key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden text-green-400 hover:text-green-300 transition-colors p-2 -mr-2"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? (
          <X className="w-6 h-6" aria-hidden="true" />
        ) : (
          <Menu className="w-6 h-6" aria-hidden="true" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed top-[64px] md:top-[80px] left-0 right-0 bg-black border-b-2 border-green-400 z-40 max-h-[calc(100vh-64px)] md:max-h-[calc(100vh-80px)] overflow-y-auto"
          onKeyDown={handleKeyDown}
        >
          <div className="container mx-auto px-4 sm:px-6 py-6">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="search tags..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="input-terminal w-full text-sm pr-10"
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

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navItems.map(item => {
                const Icon = iconMap[item.iconName];
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 py-3 px-2 text-green-400 hover:text-green-300 hover:bg-green-400/10 transition-colors text-sm font-bold rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Social Links */}
            <div className="flex items-center gap-6 mt-6 pt-6 border-t border-green-400/30">
              {socialLinks.map(link => {
                const Icon = iconMap[link.iconName];
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 transition-colors"
                    aria-label={link.label}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
