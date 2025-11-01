'use client';

import Link from 'next/link';
import { Twitter, Youtube, Instagram, Github, Mail, Rss } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t-2 border-green-400 mt-20 bg-black">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-green-400 font-bold mb-4 glitch" data-text="ABOUT">ABOUT</h3>
                        <p className="text-green-400 text-sm opacity-80">
                            Code your way to financial independence. Master high-value tech skills and smart investing.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-green-400 font-bold mb-4 glitch" data-text="LINKS">LINKS</h3>
                        <ul className="space-y-2">
                            <li><Link href="/learn" className="text-green-400 text-sm hover:text-green-300 transition-colors">&gt; Learn Programming</Link></li>
                            <li><Link href="/tweets" className="text-green-400 text-sm hover:text-green-300 transition-colors">&gt; Curated Tweets</Link></li>
                            <li><Link href="/qna" className="text-green-400 text-sm hover:text-green-300 transition-colors">&gt; Q&A Section</Link></li>
                            <li><Link href="/calculators" className="text-green-400 text-sm hover:text-green-300 transition-colors">&gt; Calculators</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-green-400 font-bold mb-4 glitch" data-text="TOPICS">TOPICS</h3>
                        <ul className="space-y-2">
                            <li><Link href="/tags/rust" className="text-green-400 text-sm hover:text-green-300 transition-colors">&gt; Rust</Link></li>
                            <li><Link href="/tags/golang" className="text-green-400 text-sm hover:text-green-300 transition-colors">&gt; Golang</Link></li>
                            <li><Link href="/tags/solidity" className="text-green-400 text-sm hover:text-green-300 transition-colors">&gt; Solidity</Link></li>
                            <li><Link href="/tags/trading" className="text-green-400 text-sm hover:text-green-300 transition-colors">&gt; Trading</Link></li>
                        </ul>
                    </div>

                    {/* Social & Contact */}
                    <div>
                        <h3 className="text-green-400 font-bold mb-4 glitch" data-text="CONNECT">CONNECT</h3>
                        <div className="flex space-x-4 mb-4">
                            <a href="https://twitter.com/0xffdevs" target="_blank" rel="noopener noreferrer"
                                className="text-green-400 hover:text-green-300 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://youtube.com/@0xffdevs" target="_blank" rel="noopener noreferrer"
                                className="text-green-400 hover:text-green-300 transition-colors">
                                <Youtube className="w-5 h-5" />
                            </a>
                            <a href="https://instagram.com/0xffdevs" target="_blank" rel="noopener noreferrer"
                                className="text-green-400 hover:text-green-300 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://github.com/0xffdevs" target="_blank" rel="noopener noreferrer"
                                className="text-green-400 hover:text-green-300 transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                        <Link href="/newsletter" className="text-green-400 text-sm hover:text-green-300 transition-colors flex items-center">
                            <Mail className="w-4 h-4 mr-2" />
                            Subscribe to Newsletter
                        </Link>
                    </div>
                </div>

                <div className="border-t border-green-400 mt-8 pt-8 text-center">
                    <div className="ascii-art text-green-400 mb-4">
                        <pre className="text-xs inline-block">
                            {`
 _____ _     _____ _____ _____  _____ 
|  _  |_|___|   __|   __|     ||   __|
|     |_   _|   __|   __| | | ||__   |
|__|__|_|_| |__|  |__|  |____/ |_____|
`}
                        </pre>
                    </div>
                    <p className="text-green-400 text-sm opacity-80">
                        © 2025 0xffdevs | Built with {'<'}3 for the FIRE community
                    </p>
                    <p className="text-green-400 text-xs mt-2 opacity-60">
                        [SYSTEM] Status: Online | Uptime: 99.9% | Version: 1.0.0
                    </p>
                </div>
            </div>
        </footer>
    );
}