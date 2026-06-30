import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import {
  Film, DollarSign, Star,
  ArrowUpRight, ArrowDownRight, Target,
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  movies, predictionLogs, monthlyRevenue, genreDistribution,
  sentimentDistribution, correlationData, recentActivity, formatCurrency,
} from '../lib/data';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#a855f7'];

function StatCard({ title, value, change, changeType, icon: Icon, subtitle }: {
  title: string; value: string; change: string; changeType: 'up' | 'down';
  icon: React.ElementType; subtitle: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-[#13151f] border border-[#1e2130] p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#6b7280]">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          <div className="flex items-center gap-1.5 mt-2">
            {changeType === 'up' ? (
              <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5 text-red-400" />
            )}
            <span className={`text-xs font-medium ${changeType === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
              {change}
            </span>
            <span className="text-xs text-[#6b7280]">{subtitle}</span>
          </div>
        </div>
        <div className="p-2.5 rounded-xl bg-[#1e2130]">
          <Icon className="h-5 w-5 text-indigo-400" />
        </div>
      </div>
    </motion.div>
  );
}

function ChartCard({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl bg-[#13151f] border border-[#1e2130] p-5 ${className}`}
    >
      <h3 className="text-sm font-semibold text-white mb-4">{title}</h3>
      {children}
    </motion.div>
  );
}

export default function Dashboard() {
  const totalRevenue = movies.reduce((s, m) => s + m.revenue, 0);
  const avgRating = movies.reduce((s, m) => s + m.rating, 0) / movies.length;
  const hitCount = movies.filter(m => m.success === 'Hit').length;
  const hitRate = (hitCount / movies.length) * 100;

  const successData = [
    { name: 'Hit', value: movies.filter(m => m.success === 'Hit').length, fill: '#22c55e' },
    { name: 'Average', value: movies.filter(m => m.success === 'Average').length, fill: '#eab308' },
    { name: 'Flop', value: movies.filter(m => m.success === 'Flop').length, fill: '#f43f5e' },
  ];

  const ratingDist = [
    { range: '9.0+', count: movies.filter(m => m.rating >= 9).length },
    { range: '8.0-8.9', count: movies.filter(m => m.rating >= 8 && m.rating < 9).length },
    { range: '7.0-7.9', count: movies.filter(m => m.rating >= 7 && m.rating < 8).length },
    { range: '6.0-6.9', count: movies.filter(m => m.rating >= 6 && m.rating < 7).length },
    { range: '<6.0', count: movies.filter(m => m.rating < 6).length },
  ];

  const radarData = genreDistribution.slice(0, 6).map(g => ({
    genre: g.name,
    movies: g.value,
    revenue: Math.round(g.revenue / 100000000),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-[#6b7280] mt-1">Real-time analytics and insights for movie success prediction</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          change="+12.5%"
          changeType="up"
          icon={DollarSign}
          subtitle="vs last quarter"
        />
        <StatCard
          title="Average Rating"
          value={avgRating.toFixed(1)}
          change="+0.3"
          changeType="up"
          icon={Star}
          subtitle="vs last quarter"
        />
        <StatCard
          title="Total Movies"
          value={movies.length.toString()}
          change="+8"
          changeType="up"
          icon={Film}
          subtitle="new this month"
        />
        <StatCard
          title="Hit Rate"
          value={`${hitRate.toFixed(0)}%`}
          change="-2.1%"
          changeType="down"
          icon={Target}
          subtitle="vs last quarter"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard title="Revenue Trends" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => formatCurrency(v as number)} />
              <Tooltip
                contentStyle={{ backgroundColor: '#13151f', border: '1px solid #1e2130', borderRadius: '12px' }}
                formatter={(value) => formatCurrency(value as number)}
              />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#colorRevenue)" name="Actual" />
              <Area type="monotone" dataKey="predicted" stroke="#22c55e" strokeWidth={2} fill="url(#colorPredicted)" name="Predicted" strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Success Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={successData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {successData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#13151f', border: '1px solid #1e2130', borderRadius: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {successData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.fill }} />
                <span className="text-xs text-[#9ca3af]">{d.name} ({d.value})</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard title="Genre Distribution">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={genreDistribution} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" horizontal={false} />
              <XAxis type="number" stroke="#6b7280" fontSize={12} />
              <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={11} width={80} />
              <Tooltip contentStyle={{ backgroundColor: '#13151f', border: '1px solid #1e2130', borderRadius: '12px' }} />
              <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Budget vs Revenue">
          <ResponsiveContainer width="100%" height={260}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" />
              <XAxis type="number" dataKey="x" name="Budget" stroke="#6b7280" fontSize={12} tickFormatter={(v) => formatCurrency(v)} />
              <YAxis type="number" dataKey="y" name="Revenue" stroke="#6b7280" fontSize={12} tickFormatter={(v) => formatCurrency(v as number)} />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ backgroundColor: '#13151f', border: '1px solid #1e2130', borderRadius: '12px' }}
                formatter={(value) => formatCurrency(value as number)}
              />
              <Scatter data={correlationData} fill="#8b5cf6" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Sentiment Overview">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={sentimentDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {sentimentDistribution.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#13151f', border: '1px solid #1e2130', borderRadius: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-3 mt-2">
            {sentimentDistribution.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-xs text-[#9ca3af]">{d.name}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard title="Rating Distribution">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={ratingDist}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" vertical={false} />
              <XAxis dataKey="range" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#13151f', border: '1px solid #1e2130', borderRadius: '12px' }} />
              <Bar dataKey="count" fill="#ec4899" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Genre Performance Radar">
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#1e2130" />
              <PolarAngleAxis dataKey="genre" stroke="#9ca3af" fontSize={11} />
              <PolarRadiusAxis stroke="#6b7280" fontSize={10} />
              <Radar name="Movies" dataKey="movies" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
              <Radar name="Revenue (100M)" dataKey="revenue" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} />
              <Tooltip contentStyle={{ backgroundColor: '#13151f', border: '1px solid #1e2130', borderRadius: '12px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Recent Activity">
          <div className="space-y-3 max-h-[240px] overflow-y-auto pr-1">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl bg-[#1a1c28] hover:bg-[#1e2130] transition-colors">
                <div className={`h-2 w-2 rounded-full mt-1.5 flex-shrink-0 ${
                  activity.type === 'model' ? 'bg-indigo-400' :
                  activity.type === 'prediction' ? 'bg-emerald-400' :
                  activity.type === 'data' ? 'bg-amber-400' :
                  activity.type === 'nlp' ? 'bg-pink-400' :
                  activity.type === 'report' ? 'bg-cyan-400' : 'bg-violet-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{activity.action}</p>
                  <p className="text-xs text-[#6b7280] mt-0.5 truncate">{activity.detail}</p>
                </div>
                <span className="text-xs text-[#6b7280] flex-shrink-0">{activity.time}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Prediction History" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e2130]">
                <th className="text-left py-3 px-4 text-xs font-medium text-[#6b7280] uppercase tracking-wider">Movie</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#6b7280] uppercase tracking-wider">Genre</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-[#6b7280] uppercase tracking-wider">Predicted Revenue</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-[#6b7280] uppercase tracking-wider">ROI</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-[#6b7280] uppercase tracking-wider">Success</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-[#6b7280] uppercase tracking-wider">Confidence</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-[#6b7280] uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {predictionLogs.map((log) => (
                <tr key={log.id} className="border-b border-[#1e2130]/50 hover:bg-[#1a1c28] transition-colors">
                  <td className="py-3 px-4 text-white font-medium">{log.movieName}</td>
                  <td className="py-3 px-4 text-[#9ca3af]">{log.genre}</td>
                  <td className="py-3 px-4 text-right text-white">{formatCurrency(log.predictedRevenue)}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={log.predictedROI >= 2 ? 'text-emerald-400' : log.predictedROI >= 1 ? 'text-amber-400' : 'text-red-400'}>
                      {log.predictedROI}x
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      log.predictedClass === 'Hit' ? 'bg-emerald-500/15 text-emerald-400' :
                      log.predictedClass === 'Average' ? 'bg-amber-500/15 text-amber-400' :
                      'bg-red-500/15 text-red-400'
                    }`}>
                      {log.predictedClass}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="w-16 h-1.5 rounded-full bg-[#1e2130] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-indigo-500"
                          style={{ width: `${log.confidence * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-[#9ca3af]">{(log.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-[#6b7280]">{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
