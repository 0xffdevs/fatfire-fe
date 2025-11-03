'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Code, Target, Zap, TrendingUp, ArrowRight, BookOpen, Terminal } from 'lucide-react';

export default function PathwaysPage() {
    const [selectedGoal, setSelectedGoal] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedTimeframe, setSelectedTimeframe] = useState('');

    const learningGoals = [
        { id: 'backend', label: 'Backend Development', icon: <Terminal className="w-5 h-5" /> },
        { id: 'blockchain', label: 'Blockchain & Web3', icon: <Code className="w-5 h-5" /> },
        { id: 'trading', label: 'Algorithmic Trading', icon: <TrendingUp className="w-5 h-5" /> },
        { id: 'fire', label: 'Financial Independence', icon: <Target className="w-5 h-5" /> },
    ];

    const skillLevels = [
        { id: 'beginner', label: 'Beginner' },
        { id: 'intermediate', label: 'Intermediate' },
        { id: 'advanced', label: 'Advanced' },
    ];

    const timeframes = [
        { id: '3months', label: '3 Months' },
        { id: '6months', label: '6 Months' },
        { id: '12months', label: '12 Months' },
        { id: 'flexible', label: 'Flexible' },
    ];

    return (
        <div className="w-full flex flex-col items-center min-h-screen">
            {/* Page Header */}
            <div className="w-full flex flex-col items-center text-center mb-12 md:mb-16 lg:mb-20">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 glitch" data-text="LEARNING PATHWAYS">
                    &gt; LEARNING PATHWAYS
                </h1>
                <p className="text-base md:text-lg text-green-400 opacity-80 max-w-3xl mx-auto px-4 leading-relaxed">
                    Create a personalized learning path tailored to your goals, skill level, and timeline
                </p>
            </div>

            {/* Learning Goal Selection */}
            <section className="w-full flex flex-col items-center mb-12 md:mb-16">
                <div className="terminal-window w-full max-w-6xl">
                    <div className="terminal-header">
                        <span className="terminal-dot"></span>
                        <span className="terminal-dot"></span>
                        <span className="terminal-dot"></span>
                    </div>

                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8 md:mb-10 lg:mb-12 glitch" data-text="SELECT YOUR GOAL">
                        &gt; SELECT YOUR GOAL
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {learningGoals.map((goal) => (
                            <button
                                key={goal.id}
                                onClick={() => setSelectedGoal(selectedGoal === goal.id ? '' : goal.id)}
                                className={`card-terminal text-center p-6 md:p-8 transition-all ${
                                    selectedGoal === goal.id
                                        ? 'border-green-400 border-2 scale-105'
                                        : 'hover:scale-105'
                                }`}
                            >
                                <div className="flex justify-center mb-4 text-green-400">
                                    {goal.icon}
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-green-400 mb-2">
                                    {goal.label}
                                </h3>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skill Level Selection */}
            {selectedGoal && (
                <section className="w-full flex flex-col items-center mb-12 md:mb-16">
                    <div className="terminal-window w-full max-w-6xl">
                        <div className="terminal-header">
                            <span className="terminal-dot"></span>
                            <span className="terminal-dot"></span>
                            <span className="terminal-dot"></span>
                        </div>

                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8 md:mb-10 lg:mb-12 glitch" data-text="YOUR SKILL LEVEL">
                            &gt; YOUR SKILL LEVEL
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                            {skillLevels.map((level) => (
                                <button
                                    key={level.id}
                                    onClick={() => setSelectedLevel(selectedLevel === level.id ? '' : level.id)}
                                    className={`card-terminal text-center p-6 md:p-8 transition-all ${
                                        selectedLevel === level.id
                                            ? 'border-green-400 border-2 scale-105'
                                            : 'hover:scale-105'
                                    }`}
                                >
                                    <h3 className="text-lg md:text-xl font-bold text-green-400">
                                        {level.label}
                                    </h3>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Timeframe Selection */}
            {selectedLevel && (
                <section className="w-full flex flex-col items-center mb-12 md:mb-16">
                    <div className="terminal-window w-full max-w-6xl">
                        <div className="terminal-header">
                            <span className="terminal-dot"></span>
                            <span className="terminal-dot"></span>
                            <span className="terminal-dot"></span>
                        </div>

                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8 md:mb-10 lg:mb-12 glitch" data-text="TIMEFRAME">
                            &gt; TIMEFRAME
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                            {timeframes.map((timeframe) => (
                                <button
                                    key={timeframe.id}
                                    onClick={() => setSelectedTimeframe(selectedTimeframe === timeframe.id ? '' : timeframe.id)}
                                    className={`card-terminal text-center p-6 md:p-8 transition-all ${
                                        selectedTimeframe === timeframe.id
                                            ? 'border-green-400 border-2 scale-105'
                                            : 'hover:scale-105'
                                    }`}
                                >
                                    <h3 className="text-lg md:text-xl font-bold text-green-400">
                                        {timeframe.label}
                                    </h3>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Generate Path Button */}
            {selectedGoal && selectedLevel && selectedTimeframe && (
                <section className="w-full flex flex-col items-center mb-12 md:mb-16">
                    <div className="w-full max-w-4xl mx-auto text-center">
                        <button className="btn-terminal text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 mb-6 md:mb-8">
                            <Zap className="w-5 h-5 md:w-6 md:h-6 inline mr-2" />
                            GENERATE MY LEARNING PATH
                        </button>
                        <p className="text-green-400 opacity-60 text-sm md:text-base">
                            Your personalized learning path will be generated based on your selections
                        </p>
                    </div>
                </section>
            )}

            {/* Browse Existing Paths */}
            <section className="w-full flex flex-col items-center mb-12 md:mb-16">
                <div className="terminal-window w-full max-w-6xl">
                    <div className="terminal-header">
                        <span className="terminal-dot"></span>
                        <span className="terminal-dot"></span>
                        <span className="terminal-dot"></span>
                    </div>

                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8 md:mb-10 lg:mb-12 glitch" data-text="POPULAR PATHWAYS">
                        &gt; POPULAR PATHWAYS
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="card-terminal p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Code className="w-6 h-6 text-green-400" />
                                <h3 className="text-xl font-bold text-green-400">Rust for Blockchain</h3>
                            </div>
                            <p className="text-green-400 opacity-80 mb-4 leading-relaxed">
                                Master Rust programming and blockchain development from scratch to advanced
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center mb-4">
                                <span className="tag">#rust</span>
                                <span className="tag">#blockchain</span>
                                <span className="tag">#advanced</span>
                            </div>
                            <Link href="/learn?language=rust" className="text-green-400 hover:text-green-300 flex items-center justify-center gap-2 text-sm font-bold">
                                Start Path <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="card-terminal p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Target className="w-6 h-6 text-green-400" />
                                <h3 className="text-xl font-bold text-green-400">FIRE Journey</h3>
                            </div>
                            <p className="text-green-400 opacity-80 mb-4 leading-relaxed">
                                Learn high-value skills and investment strategies to achieve financial independence
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center mb-4">
                                <span className="tag">#finance</span>
                                <span className="tag">#investing</span>
                                <span className="tag">#fire</span>
                            </div>
                            <Link href="/learn" className="text-green-400 hover:text-green-300 flex items-center justify-center gap-2 text-sm font-bold">
                                Start Path <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Links */}
            <section className="w-full flex flex-col items-center">
                <div className="w-full max-w-4xl mx-auto text-center">
                    <p className="text-green-400 opacity-80 mb-6 md:mb-8">
                        Explore more learning resources
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/learn" className="btn-terminal text-sm">
                            <BookOpen className="w-4 h-4 inline mr-2" />
                            Browse All Courses
                        </Link>
                        <Link href="/blogs" className="btn-terminal text-sm">
                            <Terminal className="w-4 h-4 inline mr-2" />
                            Read Blog Posts
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

