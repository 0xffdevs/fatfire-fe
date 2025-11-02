'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Clock, Eye, Calendar, User, ChevronRight, Search } from 'lucide-react';

export default function BlogsPage() {
    const [selectedTag, setSelectedTag] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock blog posts
    const blogPosts = [
        {
            id: '1',
            slug: 'building-zk-circuits-rust',
            title: 'Building Zero-Knowledge Circuits in Rust',
            excerpt: 'A comprehensive guide to implementing ZK-SNARKs using the arkworks library in Rust. Learn how to build privacy-preserving applications.',
            tags: ['rust', 'zk-proofs', 'cryptography', 'blockchain', 'advanced'],
            author: '0xffdevs',
            publishDate: '2025-10-25',
            readTime: '15 min',
            views: 1234,
            featured: true,
        },
        {
            id: '2',
            slug: 'options-trading-developers',
            title: 'Options Trading Strategies for Software Engineers',
            excerpt: 'Leverage your analytical skills to master options trading. Learn strategies specifically tailored for tech professionals.',
            tags: ['trading', 'finance', 'options', 'investing', 'strategy'],
            author: '0xlelouch_',
            publishDate: '2025-10-20',
            readTime: '12 min',
            views: 987,
            featured: true,
        },
        {
            id: '3',
            slug: 'golang-high-frequency-trading',
            title: 'Optimizing Golang for High-Frequency Trading Systems',
            excerpt: 'Build ultra-low latency trading systems with Go. Learn performance optimization techniques used by professional trading firms.',
            tags: ['golang', 'trading', 'performance', 'hft', 'backend'],
            author: '0xffdevs',
            publishDate: '2025-10-15',
            readTime: '10 min',
            views: 2345,
            featured: false,
        },
        {
            id: '4',
            slug: 'solidity-defi-patterns',
            title: 'Advanced Solidity Patterns for DeFi Development',
            excerpt: 'Master advanced Solidity patterns used in production DeFi protocols. From flash loans to yield optimization.',
            tags: ['solidity', 'defi', 'blockchain', 'smart-contracts', 'ethereum'],
            author: '0xffdevs',
            publishDate: '2025-10-10',
            readTime: '18 min',
            views: 1567,
            featured: false,
        },
        {
            id: '5',
            slug: 'fire-journey-india',
            title: 'My FIRE Journey: From 10LPA to 2Cr in 5 Years',
            excerpt: 'A detailed breakdown of how I achieved a 2Cr net worth by 28 working in Indian tech companies.',
            tags: ['fire', 'india', 'personal-finance', 'career', 'investing'],
            author: '0xlelouch_',
            publishDate: '2025-10-05',
            readTime: '8 min',
            views: 4567,
            featured: true,
        },
    ];

    // Get all unique tags
    const allTags = ['all', ...new Set(blogPosts.flatMap(post => post.tags))];

    // Filter posts
    const filteredPosts = blogPosts.filter(post => {
        const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
        return matchesTag && matchesSearch;
    });

    const featuredPosts = blogPosts.filter(post => post.featured);

    return (
        <div className="w-full flex flex-col items-center min-h-screen">
            {/* Header */}
            <div className="mb-12 md:mb-16 text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 glitch" data-text="TECHNICAL BLOGS">
                    &gt; TECHNICAL BLOGS
                </h1>
                <p className="text-base md:text-lg text-green-400 opacity-80 max-w-3xl mx-auto leading-relaxed">
                    Deep dives into programming, blockchain, trading, and financial independence
                </p>
            </div>

            {/* Search and Filter */}
            <div className="w-full flex flex-col items-center mb-8 md:mb-12">
                <div className="terminal-window w-full max-w-5xl">
                <div className="terminal-header">
                    <span className="terminal-dot"></span>
                    <span className="terminal-dot"></span>
                    <span className="terminal-dot"></span>
                </div>

                <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6 md:mb-8">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-terminal w-full pr-10"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-400" />
                    </div>

                    <select
                        value={selectedTag}
                        onChange={(e) => setSelectedTag(e.target.value)}
                        className="input-terminal"
                    >
                        {allTags.map(tag => (
                            <option key={tag} value={tag}>
                                {tag === 'all' ? 'All Tags' : `#${tag}`}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Tags Cloud */}
                <div className="flex flex-wrap gap-2 md:gap-3">
                    {allTags.slice(1).map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`tag ${selectedTag === tag ? 'bg-green-400 text-black' : ''}`}
                        >
                            #{tag}
                        </button>
                        ))}
                </div>
                </div>
            </div>

            {/* Featured Posts */}
            {selectedTag === 'all' && (
                <section className="w-full flex flex-col items-center mb-12 md:mb-16">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8 md:mb-10 text-green-400">FEATURED POSTS</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-full max-w-7xl mx-auto">
                        {featuredPosts.map(post => (
                            <article key={post.id} className="card-terminal hover:border-green-300 transition-colors text-center">
                                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                                    {post.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className="tag text-xs">#{tag}</span>
                                    ))}
                                </div>

                                <h3 className="text-lg font-bold text-green-400 mb-3 hover:text-green-300 cursor-pointer">
                                    <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                                </h3>

                                <p className="text-green-400 opacity-80 text-sm mb-4 line-clamp-2 leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <div className="flex justify-center items-center text-xs text-green-400 opacity-60 pt-2 gap-4">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {post.readTime}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Eye className="w-3 h-3" />
                                        {post.views}
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {/* All Posts */}
            <section className="w-full flex flex-col items-center">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8 md:mb-10 lg:mb-12 text-green-400">
                    {selectedTag === 'all' ? 'ALL POSTS' : `POSTS TAGGED: #${selectedTag.toUpperCase()}`}
                </h2>

                <div className="space-y-8 md:space-y-10 w-full max-w-5xl mx-auto">
                    {filteredPosts.map(post => (
                        <div key={post.id} className="terminal-window w-full">
                            <div className="terminal-header">
                                <span className="terminal-dot"></span>
                                <span className="terminal-dot"></span>
                                <span className="terminal-dot"></span>
                            </div>

                            <article>
                                <Link href={`/blogs/${post.slug}`}>
                                    <h3 className="text-xl font-bold text-green-400 mb-2 hover:text-green-300 transition-colors cursor-pointer">
                                        {post.title}
                                    </h3>
                                </Link>

                                <p className="text-green-400 opacity-80 mb-5 leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-green-400 opacity-60 mb-5">
                                    <span className="flex items-center gap-1.5">
                                        <User className="w-3 h-3" />
                                        @{post.author}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-3 h-3" />
                                        {post.publishDate}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="w-3 h-3" />
                                        {post.readTime}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Eye className="w-3 h-3" />
                                        {post.views} views
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-5 justify-center">
                                    {post.tags.map(tag => (
                                        <button
                                            key={tag}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSelectedTag(tag);
                                            }}
                                            className="tag hover:bg-green-400 hover:text-black"
                                        >
                                            #{tag}
                                        </button>
                                    ))}
                                </div>

                                <Link
                                    href={`/blogs/${post.slug}`}
                                    className="text-green-400 hover:text-green-300 flex items-center justify-center inline-flex"
                                >
                                    Read full post <ChevronRight className="w-4 h-4 ml-1" />
                                </Link>
                            </article>
                        </div>
                    ))}
                </div>
            </section>

            {/* Load More */}
            <div className="mt-8 md:mt-12 text-center">
                <button className="btn-terminal">
                    LOAD MORE POSTS
                </button>
            </div>

            {/* Newsletter CTA */}
            <div className="mt-12 md:mt-16 border-2 border-green-400 p-6 md:p-8 lg:p-12 text-center rounded-lg">
                <BookOpen className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-400 mb-2">Never Miss a Post</h3>
                <p className="text-green-400 opacity-80 mb-4">
                    Get weekly updates on new technical content and financial insights
                </p>
                <Link href="/newsletter" className="btn-terminal inline-flex items-center">
                    SUBSCRIBE TO NEWSLETTER
                </Link>
            </div>
        </div>
    );
}