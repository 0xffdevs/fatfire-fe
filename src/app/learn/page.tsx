'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Clock, TrendingUp, Code, Terminal, ChevronRight, Filter } from 'lucide-react';

export default function LearnPage() {
    const [selectedLanguage, setSelectedLanguage] = useState('all');
    const [selectedLevel, setSelectedLevel] = useState('all');

    // Mock data for programming languages and courses
    const languages = [
        {
            id: 'rust',
            name: 'Rust',
            icon: '🦀',
            description: 'Systems programming with memory safety',
            totalLessons: 45,
            level: 'Advanced',
            popularity: 95,
            topics: ['Memory Management', 'Ownership', 'Concurrency', 'WebAssembly'],
            courses: [
                { id: 1, title: 'Rust Fundamentals', duration: '8 hours', level: 'Beginner', enrolled: 1234 },
                { id: 2, title: 'Building Web APIs with Actix', duration: '12 hours', level: 'Intermediate', enrolled: 567 },
                { id: 3, title: 'Zero-Knowledge Proofs in Rust', duration: '20 hours', level: 'Advanced', enrolled: 234 },
            ]
        },
        {
            id: 'golang',
            name: 'Golang',
            icon: '🐹',
            description: 'Concurrent and efficient backend development',
            totalLessons: 38,
            level: 'Intermediate',
            popularity: 88,
            topics: ['Goroutines', 'Channels', 'Microservices', 'gRPC'],
            courses: [
                { id: 4, title: 'Go Basics', duration: '6 hours', level: 'Beginner', enrolled: 2345 },
                { id: 5, title: 'Concurrent Programming in Go', duration: '10 hours', level: 'Intermediate', enrolled: 890 },
                { id: 6, title: 'Building Trading Systems with Go', duration: '15 hours', level: 'Advanced', enrolled: 456 },
            ]
        },
        {
            id: 'solidity',
            name: 'Solidity',
            icon: '⟠',
            description: 'Smart contract development on Ethereum',
            totalLessons: 31,
            level: 'Intermediate',
            popularity: 92,
            topics: ['Smart Contracts', 'DeFi', 'NFTs', 'Security'],
            courses: [
                { id: 7, title: 'Solidity Fundamentals', duration: '7 hours', level: 'Beginner', enrolled: 3456 },
                { id: 8, title: 'DeFi Protocol Development', duration: '18 hours', level: 'Advanced', enrolled: 678 },
                { id: 9, title: 'Smart Contract Security', duration: '10 hours', level: 'Intermediate', enrolled: 1234 },
            ]
        },
        {
            id: 'python',
            name: 'Python',
            icon: '🐍',
            description: 'Data science, AI, and automation',
            totalLessons: 56,
            level: 'All Levels',
            popularity: 100,
            topics: ['Machine Learning', 'Data Analysis', 'Web Scraping', 'Automation'],
            courses: [
                { id: 10, title: 'Python for Finance', duration: '14 hours', level: 'Intermediate', enrolled: 4567 },
                { id: 11, title: 'Algorithmic Trading with Python', duration: '20 hours', level: 'Advanced', enrolled: 890 },
                { id: 12, title: 'Data Analysis for Investing', duration: '12 hours', level: 'Intermediate', enrolled: 2345 },
            ]
        },
        {
            id: 'typescript',
            name: 'TypeScript',
            icon: '📘',
            description: 'Type-safe frontend and backend development',
            totalLessons: 45,
            level: 'Intermediate',
            popularity: 85,
            topics: ['React', 'Node.js', 'Type System', 'Next.js'],
            courses: [
                { id: 13, title: 'TypeScript Basics', duration: '5 hours', level: 'Beginner', enrolled: 3456 },
                { id: 14, title: 'Building Full-Stack Apps', duration: '16 hours', level: 'Intermediate', enrolled: 1234 },
                { id: 15, title: 'Advanced TypeScript Patterns', duration: '8 hours', level: 'Advanced', enrolled: 567 },
            ]
        },
        {
            id: 'zig',
            name: 'Zig',
            icon: '⚡',
            description: 'Modern systems programming language',
            totalLessons: 12,
            level: 'Advanced',
            popularity: 45,
            topics: ['Comptime', 'C Interop', 'Performance', 'Safety'],
            courses: [
                { id: 16, title: 'Introduction to Zig', duration: '4 hours', level: 'Beginner', enrolled: 234 },
                { id: 17, title: 'Systems Programming with Zig', duration: '10 hours', level: 'Advanced', enrolled: 89 },
            ]
        },
    ];

    const filteredLanguages = languages.filter(lang => {
        if (selectedLanguage !== 'all' && lang.id !== selectedLanguage) return false;
        if (selectedLevel !== 'all' && !lang.level.toLowerCase().includes(selectedLevel)) return false;
        return true;
    });

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4 glitch" data-text="LEARN PROGRAMMING">
                    &gt; LEARN PROGRAMMING
                </h1>
                <p className="text-green-400 opacity-80">
                    Master high-value programming languages and frameworks for the modern tech stack
                </p>
            </div>

            {/* Filters */}
            <div className="terminal-window mb-8 pt-12">
                <div className="terminal-header">
                    <span className="terminal-dot"></span>
                    <span className="terminal-dot"></span>
                    <span className="terminal-dot"></span>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">FILTER:</span>
                    </div>

                    <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="input-terminal"
                    >
                        <option value="all">All Languages</option>
                        {languages.map(lang => (
                            <option key={lang.id} value={lang.id}>{lang.name}</option>
                        ))}
                    </select>

                    <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="input-terminal"
                    >
                        <option value="all">All Levels</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
            </div>

            {/* Languages Grid */}
            <div className="space-y-8">
                {filteredLanguages.map(language => (
                    <div key={language.id} className="terminal-window pt-12">
                        <div className="terminal-header">
                            <span className="terminal-dot"></span>
                            <span className="terminal-dot"></span>
                            <span className="terminal-dot"></span>
                        </div>

                        {/* Language Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                            <div className="flex items-center gap-4">
                                <span className="text-5xl">{language.icon}</span>
                                <div>
                                    <h2 className="text-2xl font-bold text-green-400">{language.name}</h2>
                                    <p className="text-green-400 opacity-60 text-sm">{language.description}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 mt-4 md:mt-0">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-green-400">{language.totalLessons}</p>
                                    <p className="text-xs text-green-400 opacity-60">LESSONS</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-green-400">{language.popularity}%</p>
                                    <p className="text-xs text-green-400 opacity-60">POPULARITY</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-bold text-green-400 border border-green-400 px-2 py-1">
                                        {language.level}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Topics */}
                        <div className="mb-6">
                            <p className="text-green-400 mb-2">KEY TOPICS:</p>
                            <div className="flex flex-wrap gap-2">
                                {language.topics.map(topic => (
                                    <span key={topic} className="tag">#{topic.toLowerCase().replace(/\s+/g, '-')}</span>
                                ))}
                            </div>
                        </div>

                        {/* Courses */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {language.courses.map(course => (
                                <Link key={course.id} href={`/learn/${language.id}/${course.id}`}>
                                    <div className="card-terminal cursor-pointer hover:border-green-300 transition-colors">
                                        <h3 className="font-bold text-green-400 mb-2">{course.title}</h3>

                                        <div className="flex items-center gap-4 text-sm text-green-400 opacity-60 mb-3">
                                            <span className="flex items-center">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {course.duration}
                                            </span>
                                            <span className="flex items-center">
                                                <TrendingUp className="w-3 h-3 mr-1" />
                                                {course.enrolled}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className={`text-xs px-2 py-1 border ${course.level === 'Beginner' ? 'border-green-500 text-green-500' :
                                                    course.level === 'Intermediate' ? 'border-yellow-500 text-yellow-500' :
                                                        'border-red-500 text-red-500'
                                                }`}>
                                                {course.level}
                                            </span>
                                            <ChevronRight className="w-4 h-4 text-green-400" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* View All Link */}
                        <div className="mt-4 text-center">
                            <Link href={`/learn/${language.id}`} className="text-green-400 hover:text-green-300 inline-flex items-center">
                                View all {language.name} content
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Learning Path Suggestion */}
            <div className="mt-12 border-2 border-green-400 p-6 text-center">
                <Terminal className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-400 mb-2">Need a Custom Learning Path?</h3>
                <p className="text-green-400 opacity-80 mb-4">
                    Get personalized recommendations based on your goals
                </p>
                <Link href="/pathways" className="btn-terminal inline-flex items-center">
                    <Code className="mr-2 w-4 h-4" />
                    CREATE MY PATH
                </Link>
            </div>
        </div>
    );
}