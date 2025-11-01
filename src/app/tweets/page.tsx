'use client';

import { useState } from 'react';
import { Twitter, Heart, MessageCircle, Repeat, Share, TrendingUp, Filter, RefreshCw } from 'lucide-react';

export default function TweetsPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedTag, setSelectedTag] = useState('all');

    // Mock data for tweets
    const tweets = [
        {
            id: '1',
            author: '@vitalikbuterin',
            authorName: 'Vitalik Buterin',
            avatar: 'VB',
            content: 'ZK-SNARKs are becoming the foundation of Ethereum scaling. Every developer should understand the basics of zero-knowledge proofs. The future is private and scalable.',
            tags: ['ethereum', 'zk-proofs', 'scaling', 'cryptography'],
            category: 'blockchain',
            likes: 12453,
            retweets: 3421,
            replies: 234,
            timestamp: '2h ago',
            verified: true,
        },
        {
            id: '2',
            author: '@0xlelouch_',
            authorName: 'Lelouch',
            avatar: 'LL',
            content: `Just crossed 2Cr net worth at 28. Here's the breakdown:
      
- Started at 12LPA in 2019
- Job hopped to 45LPA by 2022
- Invested 70% of salary consistently
- Focused on index funds + crypto
- Side projects generating 20L/year

Thread on detailed strategy 👇`,
            tags: ['fire', 'india', 'wealth', 'investing'],
            category: 'finance',
            likes: 8934,
            retweets: 2145,
            replies: 567,
            timestamp: '5h ago',
            verified: false,
        },
        {
            id: '3',
            author: '@mitchellh',
            authorName: 'Mitchell Hashimoto',
            avatar: 'MH',
            content: 'Zig is what C should have been. The compile-time execution model is genius. Perfect for systems programming where you need absolute control.',
            tags: ['zig', 'systems-programming', 'performance'],
            category: 'programming',
            likes: 5678,
            retweets: 1234,
            replies: 89,
            timestamp: '1d ago',
            verified: true,
        },
        {
            id: '4',
            author: '@naval',
            authorName: 'Naval',
            avatar: 'N',
            content: 'Specific knowledge is found by pursuing your genuine curiosity and passion. Its knowledge that you cannot be trained for.If society can train you, it can replace you.',
            tags: ['wealth', 'career', 'knowledge'],
            category: 'philosophy',
            likes: 45678,
            retweets: 12345,
            replies: 678,
            timestamp: '3d ago',
            verified: true,
        },
        {
            id: '5',
            author: '@levelsio',
            authorName: 'Pieter Levels',
            avatar: 'PL',
            content: 'Made $2.8M last year from my SaaS products. All built with vanilla PHP and jQuery. You dont need the latest framework to build profitable products.',
            tags: ['saas', 'indie-hacker', 'entrepreneurship'],
            category: 'business',
            likes: 23456,
            retweets: 5678,
            replies: 345,
            timestamp: '1w ago',
            verified: true,
        },
        {
            id: '6',
            author: '@GergelyOrosz',
            authorName: 'Gergely Orosz',
            avatar: 'GO',
            content: `Staff engineer compensation at top tech companies in 2025:

Google L6: $550-750K
Meta E6: $600-900K  
Netflix Senior: $700-1.2M
OpenAI: $800-1.5M

These are total comp including equity. Location: SF Bay Area.`,
            tags: ['salary', 'tech', 'compensation', 'faang'],
            category: 'career',
            likes: 34567,
            retweets: 8901,
            replies: 456,
            timestamp: '2d ago',
            verified: true,
        },
    ];

    const categories = ['all', 'blockchain', 'finance', 'programming', 'philosophy', 'business', 'career'];

    const allTags = [...new Set(tweets.flatMap(t => t.tags))];

    const filteredTweets = tweets.filter(tweet => {
        if (selectedCategory !== 'all' && tweet.category !== selectedCategory) return false;
        if (selectedTag !== 'all' && !tweet.tags.includes(selectedTag)) return false;
        return true;
    });

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4 glitch" data-text="CURATED TWEETS">
                    &gt; CURATED TWEETS
                </h1>
                <p className="text-green-400 opacity-80">
                    Best insights from tech Twitter, carefully selected for the FIRE community
                </p>
            </div>

            {/* Filters */}
            <div className="terminal-window mb-8 pt-12">
                <div className="terminal-header">
                    <span className="terminal-dot"></span>
                    <span className="terminal-dot"></span>
                    <span className="terminal-dot"></span>
                </div>

                <div className="flex flex-wrap gap-4 items-center mb-4">
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">CATEGORY:</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`tag ${selectedCategory === cat ? 'bg-green-400 text-black' : ''}`}
                            >
                                #{cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">TAG:</span>
                    </div>

                    <select
                        value={selectedTag}
                        onChange={(e) => setSelectedTag(e.target.value)}
                        className="input-terminal"
                    >
                        <option value="all">All Tags</option>
                        {allTags.map(tag => (
                            <option key={tag} value={tag}>#{tag}</option>
                        ))}
                    </select>

                    <button className="btn-terminal flex items-center ml-auto">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        REFRESH
                    </button>
                </div>
            </div>

            {/* Tweets Feed */}
            <div className="space-y-6">
                {filteredTweets.map(tweet => (
                    <div key={tweet.id} className="terminal-window pt-12">
                        <div className="terminal-header">
                            <span className="terminal-dot"></span>
                            <span className="terminal-dot"></span>
                            <span className="terminal-dot"></span>
                        </div>

                        <article className="tweet-card">
                            {/* Tweet Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 border-2 border-green-400 rounded-full flex items-center justify-center text-green-400 font-bold">
                                        {tweet.avatar}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-green-400">{tweet.authorName}</span>
                                            {tweet.verified && (
                                                <span className="text-blue-400">✓</span>
                                            )}
                                        </div>
                                        <span className="text-green-400 opacity-60 text-sm">{tweet.author}</span>
                                    </div>
                                </div>
                                <span className="text-green-400 opacity-60 text-sm">{tweet.timestamp}</span>
                            </div>

                            {/* Tweet Content */}
                            <div className="mb-4">
                                <p className="text-green-400 whitespace-pre-wrap">{tweet.content}</p>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {tweet.tags.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => setSelectedTag(tag)}
                                        className="tag hover:bg-green-400 hover:text-black"
                                    >
                                        #{tag}
                                    </button>
                                ))}
                            </div>

                            {/* Tweet Actions */}
                            <div className="flex items-center justify-between border-t border-green-400 pt-4">
                                <button className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors">
                                    <MessageCircle className="w-4 h-4" />
                                    <span className="text-sm">{tweet.replies}</span>
                                </button>
                                <button className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors">
                                    <Repeat className="w-4 h-4" />
                                    <span className="text-sm">{tweet.retweets.toLocaleString()}</span>
                                </button>
                                <button className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors">
                                    <Heart className="w-4 h-4" />
                                    <span className="text-sm">{tweet.likes.toLocaleString()}</span>
                                </button>
                                <button className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors">
                                    <Share className="w-4 h-4" />
                                </button>
                            </div>

                            {/* View on Twitter */}
                            <div className="mt-4 text-center">
                                <a
                                    href={`https://twitter.com/${tweet.author}/status/${tweet.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-400 hover:text-green-300 text-sm inline-flex items-center"
                                >
                                    View on Twitter
                                    <Twitter className="w-3 h-3 ml-1" />
                                </a>
                            </div>
                        </article>
                    </div>
                ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
                <button className="btn-terminal">
                    LOAD MORE TWEETS
                </button>
            </div>

            {/* Follow CTA */}
            <div className="mt-12 border-2 border-green-400 p-6 text-center">
                <Twitter className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-400 mb-2">Follow us on Twitter</h3>
                <p className="text-green-400 opacity-80 mb-4">
                    Get real-time updates and join the conversation
                </p>
                <a
                    href="https://twitter.com/0xffdevs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-terminal inline-flex items-center"
                >
                    <Twitter className="mr-2 w-4 h-4" />
                    @0xffdevs
                </a>
            </div>
        </div>
    );
}