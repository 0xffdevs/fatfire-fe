'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, X, Terminal, Code, TrendingUp, MessageSquare, BookOpen, Calculator, Twitter, Youtube, Instagram } from 'lucide-react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const navItems = [
        { href: '/learn', label: 'LEARN', icon: <BookOpen className="w-4 h-4" /> },
        { href: '/tweets', label: 'TWEETS', icon: <Twitter className="w-4 h-4" /> },
        { href: '/qna', label: 'Q&A', icon: <MessageSquare className="w-4 h-4" /> },
        { href: '/calculators', label: 'CALCULATORS', icon: <Calculator className="w-4 h-4" /> },
        { href: '/pathways', label: 'PATHWAYS', icon: <Code className="w-4 h-4" /> },
        { href: '/blogs', label: 'BLOGS', icon: <Terminal className="w-4 h-4" /> },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <nav className="border-b-2 border-green-400 bg-black sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="ascii-art text-green-400 group-hover:text-green-300 transition-colors">
                            <pre className="text-xs leading-none">
                                {`╔═══╗
║0xFF║
╚═══╝`}
                            </pre>
                        </div>
                        <span className="text-2xl font-bold terminal-text glitch" data-text="0xffdevs">
                            0xffdevs
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center space-x-1 text-green-400 hover:text-green-300 transition-colors group"
                            >
                                <span className="group-hover:animate-pulse">{item.icon}</span>
                                <span className="text-sm font-bold tracking-wider">{item.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="hidden md:flex items-center">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="search tags..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input-terminal w-48 lg:w-64 pr-10 text-sm"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-300"
                            >
                                <Search className="w-4 h-4" />
                            </button>
                        </div>
                    </form>

                    {/* Social Links */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <a
                            href="https://twitter.com/0xffdevs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-400 hover:text-green-300 transition-colors"
                        >
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a
                            href="https://youtube.com/@0xffdevs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-400 hover:text-green-300 transition-colors"
                        >
                            <Youtube className="w-5 h-5" />
                        </a>
                        <a
                            href="https://instagram.com/0xffdevs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-400 hover:text-green-300 transition-colors"
                        >
                            <Instagram className="w-5 h-5" />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden text-green-400 hover:text-green-300"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden border-t-2 border-green-400 py-4">
                        <form onSubmit={handleSearch} className="mb-4">
                            <input
                                type="text"
                                placeholder="search tags..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input-terminal w-full text-sm"
                            />
                        </form>

                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center space-x-2 py-2 text-green-400 hover:text-green-300 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.icon}
                                <span className="text-sm font-bold">{item.label}</span>
                            </Link>
                        ))}

                        <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-green-400">
                            <a
                                href="https://twitter.com/0xffdevs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-400 hover:text-green-300"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="https://youtube.com/@0xffdevs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-400 hover:text-green-300"
                            >
                                <Youtube className="w-5 h-5" />
                            </a>
                            <a
                                href="https://instagram.com/0xffdevs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-400 hover:text-green-300"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}