import Link from 'next/link';
import {
  Terminal,
  Code,
  MessageSquare,
  BookOpen,
  Calculator,
  Twitter,
  Youtube,
  Instagram,
} from 'lucide-react';
import { MobileMenu } from './mobile-menu';
import { SearchBar } from './search-bar';
import type { NavItem, SocialLink, IconName } from '@/types/nav';

// Define nav items with icon names instead of components
const navItems: NavItem[] = [
  { href: '/learn', label: 'LEARN', iconName: 'BookOpen' },
  { href: '/tweets', label: 'TWEETS', iconName: 'Twitter' },
  { href: '/qna', label: 'Q&A', iconName: 'MessageSquare' },
  { href: '/calculators', label: 'CALCULATORS', iconName: 'Calculator' },
  { href: '/pathways', label: 'PATHWAYS', iconName: 'Code' },
  { href: '/blogs', label: 'BLOGS', iconName: 'Terminal' },
];

const socialLinks: SocialLink[] = [
  {
    href: 'https://twitter.com/0xffdevs',
    label: 'Twitter',
    iconName: 'Twitter',
  },
  {
    href: 'https://youtube.com/@0xffdevs',
    label: 'YouTube',
    iconName: 'Youtube',
  },
  {
    href: 'https://instagram.com/0xffdevs',
    label: 'Instagram',
    iconName: 'Instagram',
  },
];

// Icon mapping for server component
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

export default function Navbar() {
  return (
    <nav className="border-b-2 border-green-400 sticky top-0 z-50 backdrop-blur-sm bg-black/95 flex justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center gap-4 lg:gap-6 xl:gap-8 h-16 md:h-20 justify-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group shrink-0">
            <div className="ascii-art text-green-400 group-hover:text-green-300 transition-colors hidden sm:block">
              <pre className="text-xs leading-none" aria-hidden="true">
                {`╔═══╗
║0xFF║
╚═══╝`}
              </pre>
            </div>
            <span
              className="text-xl sm:text-2xl font-bold terminal-text glitch whitespace-nowrap"
              data-text="0xffdevs"
            >
              0xffdevs
            </span>
          </Link>

          {/* Desktop Navigation - Takes remaining space */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 flex-1">
            {navItems.map(item => {
              const Icon = iconMap[item.iconName];
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-1.5 text-green-400 hover:text-green-300 transition-colors group text-xs xl:text-sm font-bold tracking-wider whitespace-nowrap"
                >
                  <Icon
                    className="w-4 h-4 group-hover:animate-pulse"
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side container - pushes to end */}
          <div className="flex items-center gap-3 xl:gap-4 ml-auto">
            {/* Search Bar - Desktop */}
            <div className="hidden md:block">
              <SearchBar />
            </div>

            {/* Social Links - Desktop */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
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

            {/* Mobile Menu Button */}
            <MobileMenu navItems={navItems} socialLinks={socialLinks} />
          </div>
        </div>
      </div>
    </nav>
  );
}
