import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import {
  MessageSquareText, Search, ThumbsUp, ThumbsDown, Minus, Sparkles,
} from 'lucide-react';
import { reviews, wordFrequency, bigrams } from '../lib/data';
import { analyzeSentiment, detectEmotion, extractKeywords } from '../lib/nlp';

const COLORS = ['#22c55e', '#eab308', '#f43f5e', '#6366f1', '#ec4899', '#06b6d4', '#f97316', '#8b5cf6'];
const EMOTION_COLORS: Record<string, string> = {
  Joy: '#22c55e', Fear: '#8b5cf6', Anger: '#f43f5e',
  Sadness: '#06b6d4', Disgust: '#f97316', Surprise: '#eab308',
};

export default function NLPAnalysis() {
  const [selectedMovie, setSelectedMovie] = useState<number | 'all'>('all');
  const [searchText, setSearchText] = useState('');
  const [customReview, setCustomReview] = useState('');
  const [customResult, setCustomResult] = useState<ReturnType<typeof analyzeSentiment> | null>(null);

  const filteredReviews = useMemo(() => {
    let filtered = selectedMovie === 'all' ? reviews : reviews.filter(r => r.movieId === selectedMovie);
    if (searchText) {
      filtered = filtered.filter(r => r.text.toLowerCase().includes(searchText.toLowerCase()));
    }
    return filtered;
  }, [selectedMovie, searchText]);

  const sentimentStats = useMemo(() => {
    const pos = filteredReviews.filter(r => r.sentiment === 'positive').length;
    const neg = filteredReviews.filter(r => r.sentiment === 'negative').length;
    const neu = filteredReviews.filter(r => r.sentiment === 'neutral').length;
    return [
      { name: 'Positive', value: pos, fill: '#22c55e' },
      { name: 'Negative', value: neg, fill: '#f43f5e' },
      { name: 'Neutral', value: neu, fill: '#eab308' },
    ];
  }, [filteredReviews]);

  const emotionStats = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredReviews.forEach(r => {
      counts[r.emotion] = (counts[r.emotion] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [filteredReviews]);

  const avgRating = filteredReviews.length > 0
    ? filteredReviews.reduce((s, r) => s + r.rating, 0) / filteredReviews.length
    : 0;

  const handleCustomAnalyze = () => {
    if (!customReview.trim()) return;
    setCustomResult(analyzeSentiment(customReview));
  };

  const movieOptions = Array.from(new Set(reviews.map(r => r.movieId)))
    .map(id => {
      const movie = reviews.find(r => r.movieId === id);
      return { id, label: movie ? `Movie #${id}` : `Movie ${id}` };
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">NLP Sentiment Analysis</h1>
        <p className="text-sm text-[#6b7280] mt-1">Analyze movie reviews with natural language processing</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Reviews', value: filteredReviews.length.toString(), icon: MessageSquareText, color: 'text-indigo-400' },
          { label: 'Avg Rating', value: avgRating.toFixed(1), icon: Sparkles, color: 'text-amber-400' },
          { label: 'Positive', value: sentimentStats[0]?.value.toString() || '0', icon: ThumbsUp, color: 'text-emerald-400' },
          { label: 'Negative', value: sentimentStats[1]?.value.toString() || '0', icon: ThumbsDown, color: 'text-red-400' },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-[#13151f] border border-[#1e2130] p-4"
          >
            <div className="flex items-center gap-2">
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
              <span className="text-xs text-[#6b7280]">{stat.label}</span>
            </div>
            <p className="text-xl font-bold text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Custom Analysis */}
      <div className="rounded-2xl bg-[#13151f] border border-[#1e2130] p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Live Sentiment Analysis</h3>
        <div className="flex gap-3">
          <textarea
            value={customReview}
            onChange={e => setCustomReview(e.target.value)}
            placeholder="Enter a movie review to analyze..."
            rows={2}
            className="flex-1 rounded-xl bg-[#1a1c28] border border-[#2a2d3e] px-4 py-3 text-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none"
          />
          <button
            onClick={handleCustomAnalyze}
            className="px-5 py-3 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-all self-start"
          >
            Analyze
          </button>
        </div>
        {customResult && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-4 rounded-xl bg-[#1a1c28] border border-[#2a2d3e]"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                customResult.label === 'positive' ? 'bg-emerald-500/15 text-emerald-400' :
                customResult.label === 'negative' ? 'bg-red-500/15 text-red-400' :
                'bg-amber-500/15 text-amber-400'
              }`}>
                {customResult.label === 'positive' ? <ThumbsUp className="h-3.5 w-3.5" /> :
                 customResult.label === 'negative' ? <ThumbsDown className="h-3.5 w-3.5" /> :
                 <Minus className="h-3.5 w-3.5" />}
                {customResult.label.charAt(0).toUpperCase() + customResult.label.slice(1)}
              </span>
              <span className="text-sm text-[#6b7280]">Compound: {customResult.compound}</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-2 rounded-lg bg-[#13151f]">
                <p className="text-xs text-[#6b7280]">Positive</p>
                <p className="text-lg font-bold text-emerald-400">{(customResult.positive * 100).toFixed(0)}%</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-[#13151f]">
                <p className="text-xs text-[#6b7280]">Neutral</p>
                <p className="text-lg font-bold text-amber-400">{(customResult.neutral * 100).toFixed(0)}%</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-[#13151f]">
                <p className="text-xs text-[#6b7280]">Negative</p>
                <p className="text-lg font-bold text-red-400">{(customResult.negative * 100).toFixed(0)}%</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-xs text-[#6b7280] mb-1">Detected Emotions:</p>
              <div className="flex flex-wrap gap-2">
                {detectEmotion(customReview).slice(0, 3).map(e => (
                  <span key={e.emotion} className="px-2 py-0.5 rounded-md bg-[#13151f] text-xs text-[#9ca3af]">
                    {e.emotion} ({e.score})
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <p className="text-xs text-[#6b7280] mb-1">Keywords:</p>
              <div className="flex flex-wrap gap-2">
                {extractKeywords(customReview).map(k => (
                  <span key={k.word} className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-xs text-indigo-400">
                    {k.word}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b7280]" />
          <input
            type="text"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder="Search reviews..."
            className="rounded-xl bg-[#13151f] border border-[#1e2130] pl-9 pr-4 py-2 text-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-indigo-500/50 transition-all w-64"
          />
        </div>
        <select
          value={selectedMovie}
          onChange={e => setSelectedMovie(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
          className="rounded-xl bg-[#13151f] border border-[#1e2130] px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all"
        >
          <option value="all">All Movies</option>
          {movieOptions.map(m => (
            <option key={m.id} value={m.id}>{m.label}</option>
          ))}
        </select>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-[#13151f] border border-[#1e2130] p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Sentiment Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={sentimentStats}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {sentimentStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#13151f', border: '1px solid #1e2130', borderRadius: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-3 mt-2">
            {sentimentStats.map(s => (
              <div key={s.name} className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.fill }} />
                <span className="text-xs text-[#9ca3af]">{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-[#13151f] border border-[#1e2130] p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Emotion Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={emotionStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" vertical={false} />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={11} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#13151f', border: '1px solid #1e2130', borderRadius: '12px' }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {emotionStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={EMOTION_COLORS[entry.name] || COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl bg-[#13151f] border border-[#1e2130] p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Top Words</h3>
          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
            {wordFrequency.map((w, i) => (
              <div key={w.word} className="flex items-center gap-3">
                <span className="text-xs text-[#6b7280] w-5">{i + 1}</span>
                <span className="text-sm text-white flex-1">{w.word}</span>
                <div className="w-20 h-1.5 rounded-full bg-[#1e2130] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-indigo-500"
                    style={{ width: `${(w.count / wordFrequency[0].count) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-[#6b7280] w-6 text-right">{w.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bigrams & Reviews Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-[#13151f] border border-[#1e2130] p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Common Phrases (Bigrams)</h3>
          <div className="space-y-2">
            {bigrams.map((b, i) => (
              <div key={b.phrase} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#1a1c28]">
                <span className="text-xs text-[#6b7280] w-5">{i + 1}</span>
                <span className="text-sm text-white flex-1">"{b.phrase}"</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#13151f] text-[#9ca3af]">{b.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-[#13151f] border border-[#1e2130] p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Recent Reviews</h3>
          <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
            {filteredReviews.slice(0, 10).map((review) => (
              <div key={review.id} className="p-3 rounded-xl bg-[#1a1c28] hover:bg-[#1e2130] transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm text-[#d1d5db] line-clamp-2 flex-1">{review.text}</p>
                  <span className={`flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    review.sentiment === 'positive' ? 'bg-emerald-500/15 text-emerald-400' :
                    review.sentiment === 'negative' ? 'bg-red-500/15 text-red-400' :
                    'bg-amber-500/15 text-amber-400'
                  }`}>
                    {review.sentiment === 'positive' ? <ThumbsUp className="h-3 w-3" /> :
                     review.sentiment === 'negative' ? <ThumbsDown className="h-3 w-3" /> :
                     <Minus className="h-3 w-3" />}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-[#6b7280]">Rating: {review.rating}/10</span>
                  <span className="text-xs text-[#6b7280]">Emotion: {review.emotion}</span>
                  <span className="text-xs text-[#6b7280]">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
