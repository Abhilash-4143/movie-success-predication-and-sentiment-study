import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter,
} from 'recharts';
import {
  Play, CheckCircle, Clock,
  Activity, Zap, Award,
} from 'lucide-react';
import { modelMetrics, formatCurrency, movies } from '../lib/data';
import { getCorrelationMatrix, linearRegression } from '../lib/ml';

function ModelCard({ metric, isBest, onTrain, training }: {
  metric: typeof modelMetrics[0]; isBest: boolean; onTrain: () => void; training: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl bg-[#13151f] border p-5 transition-all ${
        isBest ? 'border-emerald-500/30' : 'border-[#1e2130]'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-white">{metric.name}</h3>
            {isBest && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-medium">
                <Award className="h-3 w-3" />
                Best
              </span>
            )}
          </div>
          <p className="text-xs text-[#6b7280] mt-0.5">{metric.accuracy >= 0.9 ? 'High Performance' : metric.accuracy >= 0.8 ? 'Good Performance' : 'Moderate Performance'}</p>
        </div>
        <button
          onClick={onTrain}
          disabled={training}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1c28] border border-[#2a2d3e] text-xs font-medium text-[#9ca3af] hover:text-white hover:border-[#3a3d4e] disabled:opacity-50 transition-all"
        >
          {training ? <Activity className="h-3 w-3 animate-spin" /> : <Play className="h-3 w-3" />}
          {training ? 'Training' : 'Train'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="rounded-xl bg-[#1a1c28] p-3">
          <p className="text-xs text-[#6b7280]">MAE</p>
          <p className="text-sm font-semibold text-white mt-0.5">{formatCurrency(metric.mae)}</p>
        </div>
        <div className="rounded-xl bg-[#1a1c28] p-3">
          <p className="text-xs text-[#6b7280]">RMSE</p>
          <p className="text-sm font-semibold text-white mt-0.5">{formatCurrency(metric.rmse)}</p>
        </div>
        <div className="rounded-xl bg-[#1a1c28] p-3">
          <p className="text-xs text-[#6b7280]">R² Score</p>
          <p className="text-sm font-semibold text-white mt-0.5">{metric.r2.toFixed(2)}</p>
        </div>
        <div className="rounded-xl bg-[#1a1c28] p-3">
          <p className="text-xs text-[#6b7280]">Accuracy</p>
          <p className="text-sm font-semibold text-white mt-0.5">{(metric.accuracy * 100).toFixed(0)}%</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[#1e2130]">
        <div className="flex items-center justify-between text-xs text-[#6b7280]">
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Train: {metric.trainTime}s</span>
          <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> Predict: {metric.predictTime}s</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function MLModels() {
  const [trainingModel, setTrainingModel] = useState<string | null>(null);
  const [trainedModels, setTrainedModels] = useState<Set<string>>(new Set());

  const bestModel = modelMetrics.reduce((best, m) => m.r2 > best.r2 ? m : best, modelMetrics[0]);

  const handleTrain = (name: string) => {
    setTrainingModel(name);
    setTimeout(() => {
      setTrainingModel(null);
      setTrainedModels(prev => new Set(prev).add(name));
    }, 2000);
  };

  const comparisonData = modelMetrics.map(m => ({
    name: m.name.replace(' ', '\n'),
    mae: m.mae / 1e6,
    rmse: m.rmse / 1e6,
    r2: m.r2 * 100,
    accuracy: m.accuracy * 100,
  }));

  const { labels, matrix } = getCorrelationMatrix();

  const featureImportance = bestModel.features.map(f => ({
    name: f.name,
    importance: f.importance * 100,
  }));

  const budgetRevenue = linearRegression(
    movies.map(m => m.budget),
    movies.map(m => m.revenue)
  );

  const ratingRevenue = linearRegression(
    movies.map(m => m.rating),
    movies.map(m => m.revenue)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Machine Learning Models</h1>
          <p className="text-sm text-[#6b7280] mt-1">Train, compare, and evaluate prediction models</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <CheckCircle className="h-4 w-4 text-emerald-400" />
          <span className="text-sm text-emerald-400 font-medium">{trainedModels.size} models trained</span>
        </div>
      </div>

      {/* Model Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {modelMetrics.map((metric) => (
          <ModelCard
            key={metric.name}
            metric={metric}
            isBest={metric.name === bestModel.name}
            onTrain={() => handleTrain(metric.name)}
            training={trainingModel === metric.name}
          />
        ))}
      </div>

      {/* Model Comparison */}
      <div className="rounded-2xl bg-[#13151f] border border-[#1e2130] p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Model Comparison</h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={comparisonData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" vertical={false} />
            <XAxis dataKey="name" stroke="#6b7280" fontSize={11} interval={0} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip
              contentStyle={{ backgroundColor: '#13151f', border: '1px solid #1e2130', borderRadius: '12px' }}
            />
            <Bar dataKey="r2" name="R² Score (×100)" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="accuracy" name="Accuracy (%)" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Feature Importance */}
        <div className="rounded-2xl bg-[#13151f] border border-[#1e2130] p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Feature Importance ({bestModel.name})</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={featureImportance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" horizontal={false} />
              <XAxis type="number" stroke="#6b7280" fontSize={12} />
              <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={12} width={100} />
              <Tooltip
                contentStyle={{ backgroundColor: '#13151f', border: '1px solid #1e2130', borderRadius: '12px' }}
                formatter={(value) => [`${(value as number).toFixed(1)}%`, 'Importance']}
              />
              <Bar dataKey="importance" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Correlation Matrix */}
        <div className="rounded-2xl bg-[#13151f] border border-[#1e2130] p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Correlation Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="p-2"></th>
                  {labels.map(l => (
                    <th key={l} className="p-2 text-[#6b7280] font-medium text-center">{l}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {labels.map((rowLabel, i) => (
                  <tr key={rowLabel}>
                    <td className="p-2 text-[#9ca3af] font-medium">{rowLabel}</td>
                    {matrix[i].map((val, j) => {
                      const intensity = Math.abs(val);
                      const color = val > 0
                        ? `rgba(99, 102, 241, ${intensity * 0.5 + 0.1})`
                        : `rgba(244, 63, 94, ${intensity * 0.5 + 0.1})`;
                      return (
                        <td key={j} className="p-2 text-center">
                          <div
                            className="rounded-md py-1.5 text-white font-medium"
                            style={{ backgroundColor: color }}
                          >
                            {val.toFixed(2)}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Regression Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-[#13151f] border border-[#1e2130] p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Budget vs Revenue Regression</h3>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-[#9ca3af]">R² Score</span>
              <span className="text-white font-medium">{budgetRevenue.r2.toFixed(3)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#9ca3af]">Slope</span>
              <span className="text-white font-medium">{budgetRevenue.slope.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#9ca3af]">Intercept</span>
              <span className="text-white font-medium">{formatCurrency(budgetRevenue.intercept)}</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" />
              <XAxis type="number" dataKey="x" name="Budget" stroke="#6b7280" fontSize={11} tickFormatter={(v) => formatCurrency(v as number)} />
              <YAxis type="number" dataKey="y" name="Revenue" stroke="#6b7280" fontSize={11} tickFormatter={(v) => formatCurrency(v as number)} />
              <Tooltip
                contentStyle={{ backgroundColor: '#13151f', border: '1px solid #1e2130', borderRadius: '12px' }}
                formatter={(value) => formatCurrency(value as number)}
              />
              <Scatter
                data={movies.map(m => ({ x: m.budget, y: m.revenue }))}
                fill="#6366f1"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl bg-[#13151f] border border-[#1e2130] p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Rating vs Revenue Regression</h3>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-[#9ca3af]">R² Score</span>
              <span className="text-white font-medium">{ratingRevenue.r2.toFixed(3)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#9ca3af]">Slope</span>
              <span className="text-white font-medium">{ratingRevenue.slope.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#9ca3af]">Intercept</span>
              <span className="text-white font-medium">{formatCurrency(ratingRevenue.intercept)}</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" />
              <XAxis type="number" dataKey="x" name="Rating" stroke="#6b7280" fontSize={11} domain={[2, 10]} />
              <YAxis type="number" dataKey="y" name="Revenue" stroke="#6b7280" fontSize={11} tickFormatter={(v) => formatCurrency(v as number)} />
              <Tooltip
                contentStyle={{ backgroundColor: '#13151f', border: '1px solid #1e2130', borderRadius: '12px' }}
                formatter={(value, name) => [name === 'Revenue' ? formatCurrency(value as number) : value, name as string]}
              />
              <Scatter
                data={movies.map(m => ({ x: m.rating, y: m.revenue }))}
                fill="#ec4899"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
