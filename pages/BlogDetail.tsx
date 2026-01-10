
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

const BlogDetail: React.FC = () => {
  const { id } = useParams();

  // Demo content
  return (
    <div className="w-full pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        
        <Link to="/blogs" className="inline-flex items-center gap-2 text-sm font-bold text-textMuted hover:text-white mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Insights
        </Link>

        {/* Article Header */}
        <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold uppercase rounded-full text-primary mb-6">
                UI Design
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white font-display uppercase leading-tight mb-6 tracking-tight">
                The Role of Visual Hierarchy in UI Design
            </h1>
            <div className="flex justify-center items-center gap-6 text-sm font-bold text-textMuted">
                <span className="flex items-center gap-2"><Calendar size={16} /> Oct 9, 2024</span>
                <span className="flex items-center gap-2"><Clock size={16} /> 5 Min Read</span>
            </div>
        </div>

        {/* Featured Image */}
        <div className="w-full aspect-video border border-white/10 rounded-2xl overflow-hidden mb-16 shadow-2xl shadow-black/50">
            <img src="https://picsum.photos/1200/800?random=10" alt="Blog Cover" className="w-full h-full object-cover" />
        </div>

        {/* Content Body */}
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:uppercase prose-p:text-textMuted prose-strong:text-white prose-li:text-textMuted mb-16">
            <p>
                Visual hierarchy is one of the most important principles behind effective web design. It's the order in which the human eye perceives what it sees. This order is created by the visual contrast between forms in a field of perception.
            </p>
            <h3>Why is it Important?</h3>
            <p>
                In interface design, visual hierarchy organizes UI elements so that the brain can distinguish objects based on their physical differences, such as size, color, contrast, style, etc. It guides the user's eye and helps them navigate through your content effortlessly.
            </p>
            <p>
                Without a clear hierarchy, a page can look cluttered and confusing. Users won't know where to look first or what actions to take. This leads to a poor user experience and high bounce rates.
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic text-white bg-white/5 p-4 rounded-r-lg">
                "Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs
            </blockquote>
            <h3>Key Elements of Visual Hierarchy</h3>
            <ul>
                <li><strong className="text-primary">Size:</strong> Larger elements are perceived as more important.</li>
                <li><strong className="text-secondary">Color:</strong> Bright colors attract more attention than muted ones.</li>
                <li><strong className="text-accent">Contrast:</strong> Dramatically contrasting colors will catch the eye.</li>
                <li><strong>Whitespace:</strong> Providing breathing room around elements draws attention to them.</li>
            </ul>
            <p>
                By mastering these elements, designers can create interfaces that are not only aesthetically pleasing but also highly functional and intuitive.
            </p>
        </div>

        {/* Author & Share */}
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-white/10 overflow-hidden">
                    <img src="https://picsum.photos/200?random=50" alt="Author" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h4 className="text-white font-bold uppercase text-sm">Praghashwaran</h4>
                    <p className="text-xs font-medium text-textMuted">Product Designer</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <span className="font-bold text-textMuted uppercase text-xs">Share:</span>
                <div className="flex gap-2">
                    <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-white text-textMuted transition-colors"><Twitter size={16} /></button>
                    <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-white text-textMuted transition-colors"><Facebook size={16} /></button>
                    <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-white text-textMuted transition-colors"><Linkedin size={16} /></button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default BlogDetail;
