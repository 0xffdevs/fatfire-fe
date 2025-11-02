'use client';

import { useState, useEffect, PropsWithChildren } from 'react';
import { ArrowRight, TrendingUp, Code, DollarSign, BookOpen, Calculator, MessageSquare, Twitter, Youtube, Play, ChevronRight, Zap, Target, Cpu } from 'lucide-react';

// Minimal mock link: prevents navigation and looks clickable
function MockLink({
  className,
  title = 'Coming soon',
  children,
}: PropsWithChildren<{ className?: string; title?: string }>) {
  return (
    <a
      href="#"
      title={title}
      aria-disabled="true"
      role="link"
      className={className + ' cursor-not-allowed'}
      onClick={(e) => {
        e.preventDefault();
        // eslint-disable-next-line no-console
        console.log('Mock nav blocked');
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          // eslint-disable-next-line no-console
          console.log('Mock nav blocked');
        }
      }}
      tabIndex={0}
    >
      {children}
    </a>
  );
}

export default function HomePage() {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Code Your Way to Financial Independence';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Mock data
  const featuredPosts = [
    {
      id: 1,
      title: 'Building ZK Circuits in Rust',
      excerpt: 'Deep dive into zero-knowledge proofs implementation',
      tags: ['rust', 'zk-proofs', 'cryptography'],
      readTime: '15 min',
      views: 1234,
    },
    {
      id: 2,
      title: 'Options Trading for Developers',
      excerpt: 'Leverage your analytical skills for profitable trading',
      tags: ['trading', 'finance', 'options'],
      readTime: '12 min',
      views: 987,
    },
    {
      id: 3,
      title: 'Golang Performance Optimization',
      excerpt: 'Build ultra-fast systems with Go best practices',
      tags: ['golang', 'performance', 'backend'],
      readTime: '10 min',
      views: 2345,
    },
  ];

  const programmingLanguages = [
    { name: 'Rust', icon: '🦀', posts: 42, level: 'Advanced' },
    { name: 'Golang', icon: '🐹', posts: 38, level: 'Advanced' },
    { name: 'Solidity', icon: '⟠', posts: 31, level: 'Intermediate' },
    { name: 'Python', icon: '🐍', posts: 56, level: 'Expert' },
    { name: 'TypeScript', icon: '📘', posts: 45, level: 'Advanced' },
    { name: 'Zig', icon: '⚡', posts: 12, level: 'Beginner' },
  ];

  const popularQuestions = [
    { id: 1, question: "Best way to invest 20 lakhs in India?", votes: 234 },
    { id: 2, question: "How to achieve FIRE with 1Cr salary?", votes: 189 },
    { id: 3, question: "Rust vs Golang for backend in 2025?", votes: 156 },
  ];

  return (
    <div className="space-y-16 md:space-y-20 lg:space-y-24 xl:space-y-28 w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex flex-col justify-center items-center text-center py-16 md:py-20 lg:py-24 xl:py-28">
        <div className="mb-10 md:mb-12">
          <pre className="ascii-art text-green-400 text-xs md:text-sm">
            {`
 ██████╗ ██╗  ██╗███████╗███████╗██████╗ ███████╗██╗   ██╗███████╗
██╔═████╗╚██╗██╔╝██╔════╝██╔════╝██╔══██╗██╔════╝██║   ██║██╔════╝
██║██╔██║ ╚███╔╝ █████╗  █████╗  ██║  ██║█████╗  ██║   ██║███████╗
████╔╝██║ ██╔██╗ ██╔══╝  ██╔══╝  ██║  ██║██╔══╝  ╚██╗ ██╔╝╚════██║
╚██████╔╝██╔╝ ██╗██║     ██║     ██████╔╝███████╗ ╚████╔╝ ███████║
 ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝     ╚═════╝ ╚══════╝  ╚═══╝  ╚══════╝
`}
          </pre>
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-10 lg:mb-12 terminal-text">
          <span className="cursor">{typedText}</span>
        </h1>

        <p className="text-base md:text-lg lg:text-xl text-green-400 opacity-80 mb-10 md:mb-14 lg:mb-16 max-w-3xl px-4">
          Master high-value tech skills • Smart investing strategies • Achieve FIRE
        </p>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 px-4 items-center justify-center">
          <MockLink className="btn-terminal">
            <Code className="w-5 h-5" />
            START LEARNING
          </MockLink>
          <MockLink className="btn-terminal">
            <Calculator className="w-5 h-5" />
            CALCULATE FIRE
          </MockLink>
        </div>

        <div className="mt-8 text-sm text-green-400 opacity-60">
          [SYSTEM] Active users: 10,234 | Posts: 456 | Questions answered: 1,892
        </div>
      </section>

      {/* Programming Languages Section */}
      <section className="w-full flex flex-col items-center">
        <div className="terminal-window w-full max-w-7xl">
          <div className="terminal-header">
            <span className="terminal-dot"></span>
            <span className="terminal-dot"></span>
            <span className="terminal-dot"></span>
          </div>

          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8 md:mb-10 lg:mb-12 glitch" data-text="PROGRAMMING LANGUAGES">
            &gt; PROGRAMMING LANGUAGES
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {programmingLanguages.map((lang) => (
              <MockLink key={lang.name}>
                <div className="card-terminal text-center hover:scale-105 transition-transform cursor-pointer">
                  <div className="text-4xl mb-2">{lang.icon}</div>
                  <h3 className="font-bold text-green-400">{lang.name}</h3>
                  <p className="text-xs text-green-400 opacity-60">{lang.posts} posts</p>
                  <p className="text-xs text-green-300 mt-1">[{lang.level}]</p>
                </div>
              </MockLink>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="w-full flex flex-col items-center">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-4 mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold glitch" data-text="FEATURED POSTS">
            &gt; FEATURED POSTS
          </h2>
          <MockLink className="text-green-400 hover:text-green-300 flex items-center">
            View all <ChevronRight className="w-4 h-4 ml-1" />
          </MockLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-full max-w-7xl mx-auto">
          {featuredPosts.map((post) => (
            <article key={post.id} className="card-terminal text-center">
              <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {post.tags.map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
              <h3 className="text-xl font-bold mb-4 text-green-400 hover:text-green-300 cursor-pointer">
                {post.title}
              </h3>
              <p className="text-green-400 opacity-80 mb-4 leading-relaxed">{post.excerpt}</p>
              <div className="flex justify-center items-center text-sm text-green-400 opacity-60 pt-2 gap-4">
                <span>{post.readTime} read</span>
                <span>{post.views} views</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Embedded YouTube Video */}
      <section className="w-full flex flex-col items-center">
        <div className="terminal-window w-full max-w-5xl">
          <div className="terminal-header">
            <span className="terminal-dot"></span>
            <span className="terminal-dot"></span>
            <span className="terminal-dot"></span>
          </div>

          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8 md:mb-10 lg:mb-12 glitch" data-text="LATEST VIDEO">
            &gt; LATEST VIDEO
          </h2>

          <div className="aspect-video bg-black border-2 border-green-400 rounded-lg overflow-hidden mb-6 md:mb-8">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-green-400 mb-2">How I Achieved FIRE at 30 as a Developer</h3>
            <p className="text-green-400 opacity-60 text-sm">Published 2 days ago • 45K views</p>
          </div>
          <MockLink className="btn-terminal text-sm whitespace-nowrap">
            <Youtube className="w-4 h-4" />
            SUBSCRIBE
          </MockLink>
          </div>
        </div>
      </section>

      {/* Curated Tweets */}
      <section className="w-full flex flex-col items-center">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-4 mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold glitch" data-text="CURATED TWEETS">
            &gt; CURATED TWEETS
          </h2>
          <MockLink className="text-green-400 hover:text-green-300 flex items-center">
            View all <ChevronRight className="w-4 h-4 ml-1" />
          </MockLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 w-full max-w-5xl mx-auto">
          {/* Mock embedded tweets */}
          <div className="card-terminal text-center">
            <div className="flex flex-col items-center mb-4 gap-2">
              <div className="flex items-center gap-2">
                <Twitter className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="font-bold text-green-400">@vitalikbuterin</span>
              </div>
              <span className="text-xs text-green-400 opacity-60">2h ago</span>
            </div>
            <p className="text-green-400 mb-4 leading-relaxed">
              ZK-SNARKs are becoming the foundation of Ethereum scaling. Every developer should understand the basics.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="tag">#ethereum</span>
              <span className="tag">#zk-proofs</span>
              <span className="tag">#scaling</span>
            </div>
          </div>

          <div className="card-terminal text-center">
            <div className="flex flex-col items-center mb-4 gap-2">
              <div className="flex items-center gap-2">
                <Twitter className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="font-bold text-green-400">@0xlelouch_</span>
              </div>
              <span className="text-xs text-green-400 opacity-60">5h ago</span>
            </div>
            <p className="text-green-400 mb-4 leading-relaxed">
              Just crossed 2Cr net worth at 28. Thread on how I did it with a tech salary in India 👇
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="tag">#fire</span>
              <span className="tag">#india</span>
              <span className="tag">#wealth</span>
            </div>
          </div>
        </div>
      </section>

      {/* Q&A Section */}
      <section className="w-full flex flex-col items-center">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4 mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold glitch" data-text="POPULAR QUESTIONS">
            &gt; POPULAR QUESTIONS
          </h2>
          <MockLink className="text-green-400 hover:text-green-300 flex items-center">
            Ask question <ChevronRight className="w-4 h-4 ml-1" />
          </MockLink>
        </div>

        <div className="space-y-6 md:space-y-8 w-full max-w-4xl mx-auto">
          {popularQuestions.map((q) => (
            <div key={q.id} className="card-terminal flex flex-col items-center gap-4 text-center">
              <MockLink className="text-green-400 hover:text-green-300 font-bold">
                Q: {q.question}
              </MockLink>
              <div className="flex items-center text-green-400 opacity-60 gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm whitespace-nowrap">{q.votes} votes</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Calculator */}
      <section className="w-full flex flex-col items-center">
        <div className="terminal-window w-full max-w-4xl">
          <div className="terminal-header">
            <span className="terminal-dot"></span>
            <span className="terminal-dot"></span>
            <span className="terminal-dot"></span>
          </div>

          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8 md:mb-10 lg:mb-12 glitch" data-text="QUICK FIRE CALCULATOR">
            &gt; QUICK FIRE CALCULATOR
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8 max-w-2xl mx-auto">
          <div>
            <label className="block text-green-400 mb-3">Monthly Investment (₹)</label>
            <input type="number" className="input-terminal w-full" placeholder="50000" />
          </div>
          <div>
            <label className="block text-green-400 mb-3">Expected Return (%)</label>
            <input type="number" className="input-terminal w-full" placeholder="12" />
          </div>
        </div>

        <button className="btn-terminal w-full mb-6 md:mb-8 max-w-2xl mx-auto block">
          CALCULATE NET WORTH →
        </button>

          <p className="text-center text-green-400 opacity-60 text-sm">
            Try our advanced calculators for detailed projections
          </p>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="w-full flex flex-col items-center">
        <div className="border-2 border-green-400 p-8 md:p-12 lg:p-16 text-center rounded-lg w-full max-w-4xl mx-auto">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8 glitch" data-text="STAY UPDATED">
          &gt; STAY UPDATED
        </h2>
        <p className="text-base md:text-lg text-green-400 opacity-80 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
          Weekly insights on high-value tech skills and smart investing
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="your@email.com"
            className="input-terminal flex-1"
          />
          <button type="submit" className="btn-terminal cursor-not-allowed" title="Coming soon">
            SUBSCRIBE
          </button>
        </form>
        </div>
      </section>
    </div>
  );
}
