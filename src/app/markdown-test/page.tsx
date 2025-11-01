import MarkdownRenderer from '@/components/MarkdownRenderer';

export default function MarkdownTestPage() {
    const md = `
## 🔗 Link Rendering Test

This is an **internal link** → [Start Learning](/learn)  
This is an **external link** → [IndieHash](https://indiehash.io)

Inline \`code\` and a code block:

\`\`\`ts
export function hello() {
  console.log('neon vibes');
}
\`\`\`

- Neon bullets
- Consistent terminal theme

> Retro neon quote with glow.
`;

    return (
        <div className="p-8 terminal-window">
            <div className="terminal-header">
                <span className="terminal-dot"></span>
                <span className="terminal-dot"></span>
                <span className="terminal-dot"></span>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-green-300">Markdown Preview</h1>
            <MarkdownRenderer content={md} />
        </div>
    );
}
