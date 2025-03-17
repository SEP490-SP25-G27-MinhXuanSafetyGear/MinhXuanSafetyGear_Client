import ReactMarkdown from "react-markdown"

export const Markdown = ({ content }) => {
    return (
        <div className="markdown-content prose prose-sm max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    )
}

// Add this to your global CSS or component-specific CSS
export const markdownStyles = `
.markdown-content h1 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.markdown-content h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 1.4rem;
  margin-bottom: 0.8rem;
}

.markdown-content h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-top: 1.2rem;
  margin-bottom: 0.6rem;
}

.markdown-content p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.markdown-content ul, .markdown-content ol {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.markdown-content ul {
  list-style-type: disc;
}

.markdown-content ol {
  list-style-type: decimal;
}

.markdown-content li {
  margin-bottom: 0.5rem;
}

.markdown-content a {
  color: #2563eb;
  text-decoration: underline;
}

.markdown-content a:hover {
  color: #1d4ed8;
}

.markdown-content blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  font-style: italic;
  margin: 1rem 0;
}

.markdown-content code {
  background-color: #f3f4f6;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-family: monospace;
  font-size: 0.9em;
}

.markdown-content pre {
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.markdown-content pre code {
  background-color: transparent;
  padding: 0;
}

.markdown-content img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1rem 0;
}

.markdown-content hr {
  border: 0;
  border-top: 1px solid #e5e7eb;
  margin: 1.5rem 0;
}

.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.markdown-content th, .markdown-content td {
  border: 1px solid #e5e7eb;
  padding: 0.5rem;
}

.markdown-content th {
  background-color: #f9fafb;
  font-weight: 600;
}

.markdown-preview {
  line-height: 1.6;
}
`

