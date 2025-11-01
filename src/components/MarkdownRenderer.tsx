'use client';

import React, { PropsWithChildren } from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

// tiny helper to detect internal vs external links
const isInternal = (href?: string) =>
    !!href && (href.startsWith('/') || href.startsWith('#'));

export default function MarkdownRenderer({ content }: { content: string }) {
    return (
        <div className="prose-terminal">
            <ReactMarkdown
                components={{
                    a: ({ href, children, ...props }) =>
                        !href ? (
                            <span>{children}</span>
                        ) : isInternal(href) ? (
                            // INTERNAL → Next.js Link
                            <Link
                                href={href}
                                {...props}
                                className="inline-block underline decoration-green-400/80 underline-offset-4 text-green-400 hover:text-green-300 transition-colors duration-150 hover:[text-shadow:0_0_8px_#00ff00] focus:outline-none focus:ring-2 focus:ring-green-500/60 rounded-sm"
                            >
                                {children}
                            </Link>
                        ) : (
                            // EXTERNAL → <a target=_blank>
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                {...props}
                                className="inline-block underline decoration-green-400/80 underline-offset-4 text-green-400 hover:text-green-300 transition-colors duration-150 hover:[text-shadow:0_0_8px_#00ff00] focus:outline-none focus:ring-2 focus:ring-green-500/60 rounded-sm"
                            >
                                {children}
                            </a>
                        ),
                    p: ({ children }) => (
                        <p className="text-green-400/90 leading-relaxed mb-4">{children}</p>
                    ),
                    h1: ({ children }) => (
                        <h1 className="text-3xl md:text-4xl font-bold text-green-300 mb-4 [text-shadow:0_0_10px_#00ff00]">
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-2xl md:text-3xl font-bold text-green-300 mt-6 mb-3 [text-shadow:0_0_8px_#00ff00]">
                            {children}
                        </h2>
                    ),
                    ul: ({ children }) => (
                        <ul className="list-disc pl-6 space-y-2 text-green-400/90">{children}</ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="list-decimal pl-6 space-y-2 text-green-400/90">{children}</ol>
                    ),
                    li: ({ children }) => <li className="marker:text-green-500">{children}</li>,
                    code: ({ children }) => (
                        <code className="px-2 py-0.5 rounded bg-green-900/30 text-green-300">
                            {children}
                        </code>
                    ),
                    pre: ({ children }) => (
                        <pre className="p-4 rounded border border-green-500/40 bg-black/60 overflow-x-auto mb-4">
                            {children}
                        </pre>
                    ),
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-green-600 pl-4 text-green-300/90 italic">
                            {children}
                        </blockquote>
                    ),
                    hr: () => <hr className="my-6 border-green-800/70" />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
