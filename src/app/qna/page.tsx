'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, ThumbsUp, ThumbsDown, Search, TrendingUp, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function QnAPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

    // Mock Q&A data with markdown answers
    const questions = [
        {
            id: '1',
            question: 'What is the best way to invest 20 lakhs in India?',
            answer: `For a **20 lakh investment** in India, here's a balanced approach:

## Asset Allocation (Recommended)
- **40% Equity** (8 lakhs): Index funds like Nifty 50, Sensex
- **20% International Equity** (4 lakhs): US market exposure via Nasdaq 100
- **20% Debt** (4 lakhs): PPF, debt mutual funds
- **10% Gold** (2 lakhs): SGBs or Gold ETFs
- **10% Emergency Fund** (2 lakhs): Liquid funds

## Tax-Saving Options
1. **ELSS Funds**: Up to 1.5 lakh for 80C deduction
2. **PPF**: Safe, tax-free returns (~7.1%)
3. **NPS**: Additional 50K deduction under 80CCD

## Strategy Tips
- Start SIPs to average out market volatility
- Review portfolio quarterly
- Rebalance annually
- Consider your risk tolerance and age`,
            category: 'investing',
            votes: 234,
            views: 5678,
            timestamp: '2 days ago',
            tags: ['india', 'investing', 'portfolio'],
        },
        {
            id: '2',
            question: 'How to achieve FIRE with 1Cr salary in India?',
            answer: `## FIRE Strategy for 1Cr Salary

### The Math
- **Post-tax income**: ~65 lakhs
- **Target savings rate**: 70-80%
- **Annual savings**: 45-50 lakhs
- **FIRE number**: 25x annual expenses

### Execution Plan

#### Year 1-3: Foundation
\`\`\`
- Max out 80C (1.5L)
- Max out NPS (50K)
- Build 1 year emergency fund
- Start investing in index funds
\`\`\`

#### Year 3-7: Acceleration
- Increase equity allocation to 80%
- Explore international markets
- Consider real estate (1 property)
- Build passive income streams

#### Year 7-10: Coast FIRE
- Portfolio should be 3-5Cr
- Passive income covering 50% expenses
- Option to switch to relaxed job

### Key Milestones
| Year | Net Worth | Status |
|------|-----------|--------|
| 3 | 1.5 Cr | Emergency fund complete |
| 5 | 3 Cr | Lean FIRE possible |
| 7 | 5 Cr | Regular FIRE |
| 10 | 8 Cr | Fat FIRE |`,
            category: 'fire',
            votes: 189,
            views: 3456,
            timestamp: '5 days ago',
            tags: ['fire', 'india', 'high-income'],
        },
        {
            id: '3',
            question: 'Rust vs Golang for backend development in 2025?',
            answer: `## Rust vs Golang: Backend Development Comparison

### Performance
**Rust** 🦀
- Zero-cost abstractions
- No garbage collector
- Better for CPU-intensive tasks
- Memory usage: Excellent

**Golang** 🐹
- Good performance with GC
- Better for I/O bound tasks
- Fast compilation
- Memory usage: Good

### Use Cases

#### Choose Rust When:
- Building system-level software
- Need maximum performance
- Working with embedded systems
- Building blockchain/crypto projects

#### Choose Golang When:
- Building microservices
- Need quick development
- Building network applications
- Working with DevOps tools

### Job Market (India 2025)
\`\`\`
Rust:
- Average salary: 25-45 LPA
- Jobs: Growing but limited
- Remote opportunities: High

Golang:
- Average salary: 20-35 LPA  
- Jobs: Abundant
- Startups love it
\`\`\`

### Verdict
- **For most backends**: Go is practical
- **For performance-critical**: Rust wins
- **For career**: Learn both!`,
            category: 'programming',
            votes: 156,
            views: 2890,
            timestamp: '1 week ago',
            tags: ['rust', 'golang', 'backend', 'career'],
        },
        {
            id: '4',
            question: 'How to optimize taxes as a software engineer in India?',
            answer: `## Tax Optimization for Software Engineers

### Deductions Under Section 80C (1.5L limit)
- **EPF**: Automatic deduction
- **ELSS**: Better returns than PPF
- **Life Insurance**: Term insurance premiums
- **Home Loan Principal**: If applicable

### Additional Deductions
- **80CCD(1B)**: Extra 50K via NPS
- **80D**: Health insurance (25K-50K)
- **80E**: Education loan interest
- **80GG**: Rent paid (if no HRA)

### HRA Optimization
\`\`\`javascript
// HRA Exemption = Minimum of:
1. Actual HRA received
2. 50% of basic (metro) / 40% (non-metro)
3. Rent paid - 10% of basic
\`\`\`

### Salary Structure Tips
- Maximize tax-free allowances
- Food coupons: 2,200/month tax-free
- LTA: Twice in 4 years
- Professional development: Books, courses

### Investment Strategy
| Investment | Tax Benefit | Returns |
|------------|------------|---------|
| ELSS | 80C + No LTCG till 1L | 12-15% |
| PPF | 80C + Tax-free | 7.1% |
| NPS | 80CCD | Market-linked |`,
            category: 'finance',
            votes: 298,
            views: 6789,
            timestamp: '3 days ago',
            tags: ['tax', 'india', 'salary', 'optimization'],
        },
        {
            id: '5',
            question: 'Best resources to learn Zero-Knowledge Proofs?',
            answer: `## Zero-Knowledge Proofs Learning Path

### Prerequisites
- **Math**: Linear algebra, number theory
- **Programming**: Rust or TypeScript
- **Cryptography**: Basic understanding

### Learning Resources

#### Books & Papers
1. **"Proofs, Arguments, and Zero-Knowledge"** - Justin Thaler
2. **Vitalik's Blog Series** on ZK-SNARKs
3. **ZKProof Standards** documentation

#### Online Courses
- **ZK Whiteboard Sessions** by ZCash
- **MIT 6.875**: Cryptography course
- **ZK MOOC** by Berkeley

#### Hands-on Practice
\`\`\`bash
# Start with Circom
npm install -g circom snarkjs

# Try these projects:
- Build a ZK sudoku verifier
- Private voting system
- Anonymous credentials
\`\`\`

### Project Ideas
1. **Beginner**: Merkle tree membership proof
2. **Intermediate**: Private AMM
3. **Advanced**: ZK-EVM implementation

### Job Opportunities
- **Protocol Labs**: 80-150K USD
- **Aztec**: 100-200K USD  
- **StarkWare**: 90-180K USD`,
            category: 'blockchain',
            votes: 123,
            views: 3456,
            timestamp: '6 days ago',
            tags: ['zk-proofs', 'cryptography', 'blockchain', 'learning'],
        },
    ];

    const filteredQuestions = questions.filter(q =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.tags.some(tag => tag.includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4 glitch" data-text="Q&A SECTION">
                    &gt; Q&A SECTION
                </h1>
                <p className="text-green-400 opacity-80">
                    Community-driven answers to your technical and financial questions
                </p>
            </div>

            {/* Search and Ask */}
            <div className="terminal-window mb-8 pt-12">
                <div className="terminal-header">
                    <span className="terminal-dot"></span>
                    <span className="terminal-dot"></span>
                    <span className="terminal-dot"></span>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Search questions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-terminal w-full pr-10"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-400" />
                    </div>
                    <button className="btn-terminal">
                        ASK QUESTION
                    </button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-green-400">{questions.length}</p>
                        <p className="text-xs text-green-400 opacity-60">QUESTIONS</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-green-400">1,892</p>
                        <p className="text-xs text-green-400 opacity-60">ANSWERS</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-green-400">23K</p>
                        <p className="text-xs text-green-400 opacity-60">TOTAL VIEWS</p>
                    </div>
                </div>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
                {filteredQuestions.map(q => (
                    <div key={q.id} className="terminal-window pt-12">
                        <div className="terminal-header">
                            <span className="terminal-dot"></span>
                            <span className="terminal-dot"></span>
                            <span className="terminal-dot"></span>
                        </div>

                        <div className="space-y-4">
                            {/* Question Header */}
                            <div
                                className="cursor-pointer"
                                onClick={() => setExpandedQuestion(expandedQuestion === q.id ? null : q.id)}
                            >
                                <div className="flex items-start justify-between">
                                    <h3 className="text-xl font-bold text-green-400 hover:text-green-300 transition-colors">
                                        Q: {q.question}
                                    </h3>
                                    <button className="text-green-400">
                                        {expandedQuestion === q.id ? (
                                            <ChevronUp className="w-5 h-5" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>

                                {/* Metadata */}
                                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-green-400 opacity-60">
                                    <span className="flex items-center">
                                        <TrendingUp className="w-3 h-3 mr-1" />
                                        {q.votes} votes
                                    </span>
                                    <span className="flex items-center">
                                        <MessageSquare className="w-3 h-3 mr-1" />
                                        {q.views} views
                                    </span>
                                    <span className="flex items-center">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {q.timestamp}
                                    </span>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {q.tags.map(tag => (
                                        <span key={tag} className="tag">#{tag}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Answer (Expandable) */}
                            {expandedQuestion === q.id && (
                                <div className="border-t border-green-400 pt-4">
                                    <div className="prose prose-green max-w-none text-green-400">
                                        <ReactMarkdown
                                            components={{
                                                h2: ({ children }) => (
                                                    <h2 className="text-xl font-bold text-green-400 mt-4 mb-2">{children}</h2>
                                                ),
                                                h3: ({ children }) => (
                                                    <h3 className="text-lg font-bold text-green-400 mt-3 mb-2">{children}</h3>
                                                ),
                                                h4: ({ children }) => (
                                                    <h4 className="text-md font-bold text-green-400 mt-2 mb-1">{children}</h4>
                                                ),
                                                p: ({ children }) => (
                                                    <p className="text-green-400 mb-3">{children}</p>
                                                ),
                                                ul: ({ children }) => (
                                                    <ul className="list-disc list-inside text-green-400 mb-3">{children}</ul>
                                                ),
                                                ol: ({ children }) => (
                                                    <ol className="list-decimal list-inside text-green-400 mb-3">{children}</ol>
                                                ),
                                                li: ({ children }) => (
                                                    <li className="text-green-400 mb-1">{children}</li>
                                                ),
                                                code: (props: any) => {
                                                    const { inline, children } = props;
                                                    return inline ? (
                                                        <code className="bg-green-900 bg-opacity-30 px-1 py-0.5 rounded text-green-300">
                                                            {children}
                                                        </code>
                                                    ) : (
                                                        <code className="block bg-black border border-green-400 p-3 rounded my-3 text-green-300 overflow-x-auto">
                                                            {children}
                                                        </code>
                                                    );
                                                },
                                                pre: ({ children }) => (
                                                    <pre className="code-block">{children}</pre>
                                                ),
                                                blockquote: ({ children }) => (
                                                    <blockquote className="border-l-4 border-green-400 pl-4 my-3 text-green-400 opacity-80">
                                                        {children}
                                                    </blockquote>
                                                ),
                                                strong: ({ children }) => (
                                                    <strong className="font-bold text-green-300">{children}</strong>
                                                ),
                                                table: ({ children }) => (
                                                    <table className="border border-green-400 w-full my-4">{children}</table>
                                                ),
                                                thead: ({ children }) => (
                                                    <thead className="bg-green-900 bg-opacity-20">{children}</thead>
                                                ),
                                                th: ({ children }) => (
                                                    <th className="border border-green-400 px-3 py-2 text-green-400">{children}</th>
                                                ),
                                                td: ({ children }) => (
                                                    <td className="border border-green-400 px-3 py-2 text-green-400">{children}</td>
                                                ),
                                            }}
                                        >
                                            {q.answer}
                                        </ReactMarkdown>
                                    </div>

                                    {/* Vote Actions */}
                                    <div className="flex items-center gap-4 mt-6 pt-4 border-t border-green-400">
                                        <button className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors">
                                            <ThumbsUp className="w-4 h-4" />
                                            <span className="text-sm">Helpful</span>
                                        </button>
                                        <button className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors">
                                            <ThumbsDown className="w-4 h-4" />
                                            <span className="text-sm">Not helpful</span>
                                        </button>
                                        <Link href={`/qna/${q.id}`} className="ml-auto text-green-400 hover:text-green-300 text-sm">
                                            Permalink →
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
                <button className="btn-terminal">
                    LOAD MORE QUESTIONS
                </button>
            </div>
        </div>
    );
}