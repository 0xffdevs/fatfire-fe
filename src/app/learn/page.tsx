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
        <div className="w-full flex flex-col items-center min-h-screen">
            {/* Header */}
            <div className="mb-12 md:mb-16 text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 glitch" data-text="LEARN PROGRAMMING">
                    &gt; LEARN PROGRAMMING
                </h1>
                <p className="text-base md:text-lg text-green-400 opacity-80 max-w-3xl mx-auto leading-relaxed">
                    Master high-value programming languages and frameworks for the modern tech stack
                </p>
            </div>

            {/* Filters */}
            <div className="w-full flex flex-col items-center mb-8 md:mb-12">
                <div className="terminal-window w-full max-w-5xl">
                <div className="terminal-header">
                    <span className="terminal-dot"></span>
                    <span className="terminal-dot"></span>
                    <span className="terminal-dot"></span>
                </div>

                <div className="flex flex-wrap gap-4 md:gap-6 items-center">
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                        <span className="text-green-400 font-bold">FILTER:</span>
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
            </div>

            {/* Languages Grid */}
            <div className="w-full flex flex-col items-center space-y-8 md:space-y-12">
                {filteredLanguages.map(language => (
                    <div key={language.id} className="terminal-window w-full max-w-6xl">
                        <div className="terminal-header">
                            <span className="terminal-dot"></span>
                            <span className="terminal-dot"></span>
                            <span className="terminal-dot"></span>
                        </div>

                        {/* Language Header */}
                        <div className="flex flex-col items-center mb-6 md:mb-8 gap-6 text-center">
                            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                                <span className="text-4xl md:text-5xl lg:text-6xl">{language.icon}</span>
                                <div>
                                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-green-400 mb-2">{language.name}</h2>
                                    <p className="text-green-400 opacity-60 text-sm md:text-base">{language.description}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 md:gap-8">
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
                        <div className="mb-6 md:mb-8 text-center">
                            <p className="text-green-400 mb-3 md:mb-4 font-bold">KEY TOPICS:</p>
                            <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                                {language.topics.map(topic => (
                                    <span key={topic} className="tag">#{topic.toLowerCase().replace(/\s+/g, '-')}</span>
                                ))}
                            </div>
                        </div>

                        {/* Courses */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
                            {language.courses.map(course => (
                                <Link key={course.id} href={`/learn/${language.id}/${course.id}`}>
                                    <div className="card-terminal cursor-pointer hover:border-green-300 transition-colors text-center">
                                        <h3 className="font-bold text-green-400 mb-2">{course.title}</h3>

                                        <div className="flex items-center justify-center gap-4 text-sm text-green-400 opacity-60 mb-3">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {course.duration}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <TrendingUp className="w-3 h-3" />
                                                {course.enrolled}
                                            </span>
                                        </div>

                                        <div className="flex justify-center items-center gap-3">
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
                        <div className="mt-6 text-center">
                            <Link href={`/learn/${language.id}`} className="text-green-400 hover:text-green-300 inline-flex items-center">
                                View all {language.name} content
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Learning Path Suggestion */}
            <div className="w-full flex flex-col items-center mt-12 md:mt-16">
                <div className="border-2 border-green-400 p-6 md:p-8 lg:p-12 text-center rounded-lg w-full max-w-4xl mx-auto">
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
        </div>
    );
}