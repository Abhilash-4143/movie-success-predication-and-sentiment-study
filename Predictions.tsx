import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Film, DollarSign, Calendar,
  AlertCircle, CheckCircle,
  Zap, Users, ChevronRight, ChevronLeft, RotateCcw,
} from 'lucide-react';
import { predictMovieSuccess } from '../lib/ml';
import { GENRES, MONTHS, LANGUAGES, COUNTRIES, formatCurrency } from '../lib/data';
import type { PredictionResult } from '../lib/ml';

const steps = [
  { id: 1, title: 'Basic Info', icon: Film },
  { id: 2, title: 'Financials', icon: DollarSign },
  { id: 3, title: 'Cast & Crew', icon: Users },
  { id: 4, title: 'Release', icon: Calendar },
];

export default function Predictions() {
  const [currentStep, setCurrentStep] = useState(1);
  const [predicting, setPredicting] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const [formData, setFormData] = useState({
    movieName: '',
    genre: 'Action',
    budget: 50000000,
    runtime: 120,
    language: 'English',
    country: 'USA',
    releaseMonth: 'July',
    productionHouse: '',
    directorPopularity: 70,
    actorPopularity: 75,
    marketingBudget: 25000000,
    expectedRating: 7.5,
  });

  const updateField = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePredict = async () => {
    setPredicting(true);
    await new Promise(r => setTimeout(r, 1500));
    const prediction = predictMovieSuccess({
      budget: formData.budget,
      marketingBudget: formData.marketingBudget,
      runtime: formData.runtime,
      rating: formData.expectedRating,
      directorPopularity: formData.directorPopularity,
      actorPopularity: formData.actorPopularity,
      genre: formData.genre,
      releaseMonth: formData.releaseMonth,
    });
    setResult(prediction);
    setPredicting(false);
  };

  const reset = () => {
    setResult(null);
    setCurrentStep(1);
  };

  const getSuccessColor = (cls: string) => {
    if (cls === 'Hit') return 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30';
    if (cls === 'Average') return 'text-amber-400 bg-amber-500/15 border-amber-500/30';
    return 'text-red-400 bg-red-500/15 border-red-500/30';
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white">Movie Success Prediction</h1>
        <p className="text-sm text-[#6b7280] mt-1">Enter movie details to predict box office performance using ML</p>
      </div>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-2xl bg-[#13151f] border border-[#1e2130] overflow-hidden"
          >
            {/* Stepper */}
            <div className="flex items-center px-6 py-5 border-b border-[#1e2130]">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;
                return (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className={`flex items-center gap-2.5 ${idx > 0 ? 'flex-1' : ''}`}>
                      {idx > 0 && (
                        <div className={`h-px flex-1 mx-3 ${isCompleted ? 'bg-indigo-500' : 'bg-[#1e2130]'}`} />
                      )}
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                        isActive ? 'bg-indigo-600/15 text-indigo-400' :
                        isCompleted ? 'text-emerald-400' : 'text-[#6b7280]'
                      }`}>
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-medium hidden sm:inline">{step.title}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Form Content */}
            <div className="p-6">
              {currentStep === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#9ca3af] mb-2">Movie Name</label>
                    <input
                      type="text"
                      value={formData.movieName}
                      onChange={e => updateField('movieName', e.target.value)}
                      placeholder="Enter movie title"
                      className="w-full rounded-xl bg-[#1a1c28] border border-[#2a2d3e] px-4 py-3 text-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#9ca3af] mb-2">Genre</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {GENRES.map(g => (
                        <button
                          key={g}
                          onClick={() => updateField('genre', g)}
                          className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                            formData.genre === g
                              ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                              : 'bg-[#1a1c28] text-[#9ca3af] border border-[#2a2d3e] hover:border-[#3a3d4e]'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#9ca3af] mb-2">Runtime (minutes)</label>
                    <input
                      type="range"
                      min={80}
                      max={210}
                      value={formData.runtime}
                      onChange={e => updateField('runtime', parseInt(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                    <div className="flex justify-between text-xs text-[#6b7280] mt-1">
                      <span>80 min</span>
                      <span className="text-white font-medium">{formData.runtime} min</span>
                      <span>210 min</span>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#9ca3af] mb-2">Production Budget</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b7280]" />
                      <input
                        type="number"
                        value={formData.budget}
                        onChange={e => updateField('budget', parseInt(e.target.value))}
                        className="w-full rounded-xl bg-[#1a1c28] border border-[#2a2d3e] pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                      />
                    </div>
                    <p className="text-xs text-[#6b7280] mt-1">{formatCurrency(formData.budget)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#9ca3af] mb-2">Marketing Budget</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b7280]" />
                      <input
                        type="number"
                        value={formData.marketingBudget}
                        onChange={e => updateField('marketingBudget', parseInt(e.target.value))}
                        className="w-full rounded-xl bg-[#1a1c28] border border-[#2a2d3e] pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                      />
                    </div>
                    <p className="text-xs text-[#6b7280] mt-1">{formatCurrency(formData.marketingBudget)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#9ca3af] mb-2">Production House</label>
                    <input
                      type="text"
                      value={formData.productionHouse}
                      onChange={e => updateField('productionHouse', e.target.value)}
                      placeholder="e.g. Warner Bros, Marvel Studios"
                      className="w-full rounded-xl bg-[#1a1c28] border border-[#2a2d3e] px-4 py-3 text-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#9ca3af] mb-2">Director Popularity (0-100)</label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={formData.directorPopularity}
                      onChange={e => updateField('directorPopularity', parseInt(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                    <div className="flex justify-between text-xs text-[#6b7280] mt-1">
                      <span>Unknown</span>
                      <span className="text-white font-medium">{formData.directorPopularity}/100</span>
                      <span>Legendary</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#9ca3af] mb-2">Lead Actor Popularity (0-100)</label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={formData.actorPopularity}
                      onChange={e => updateField('actorPopularity', parseInt(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                    <div className="flex justify-between text-xs text-[#6b7280] mt-1">
                      <span>Unknown</span>
                      <span className="text-white font-medium">{formData.actorPopularity}/100</span>
                      <span>A-List</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#9ca3af] mb-2">Expected Rating (IMDb)</label>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      step={0.1}
                      value={formData.expectedRating}
                      onChange={e => updateField('expectedRating', parseFloat(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                    <div className="flex justify-between text-xs text-[#6b7280] mt-1">
                      <span>1.0</span>
                      <span className="text-white font-medium">{formData.expectedRating}</span>
                      <span>10.0</span>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#9ca3af] mb-2">Release Month</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {MONTHS.map(m => (
                        <button
                          key={m}
                          onClick={() => updateField('releaseMonth', m)}
                          className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                            formData.releaseMonth === m
                              ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                              : 'bg-[#1a1c28] text-[#9ca3af] border border-[#2a2d3e] hover:border-[#3a3d4e]'
                          }`}
                        >
                          {m.slice(0, 3)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#9ca3af] mb-2">Language</label>
                      <select
                        value={formData.language}
                        onChange={e => updateField('language', e.target.value)}
                        className="w-full rounded-xl bg-[#1a1c28] border border-[#2a2d3e] px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                      >
                        {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#9ca3af] mb-2">Country</label>
                      <select
                        value={formData.country}
                        onChange={e => updateField('country', e.target.value)}
                        className="w-full rounded-xl bg-[#1a1c28] border border-[#2a2d3e] px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                      >
                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-[#1e2130]">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-[#9ca3af] hover:text-white hover:bg-[#1a1c28] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
              {currentStep < 4 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-all"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handlePredict}
                  disabled={predicting}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-500 disabled:opacity-70 transition-all"
                >
                  {predicting ? (
                    <>
                      <Zap className="h-4 w-4 animate-pulse" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Predict Success
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            {/* Result Header */}
            <div className="rounded-2xl bg-[#13151f] border border-[#1e2130] p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-lg font-bold border ${getSuccessColor(result.predictedClass)}`}
              >
                {result.predictedClass === 'Hit' ? <CheckCircle className="h-5 w-5" /> :
                 result.predictedClass === 'Average' ? <AlertCircle className="h-5 w-5" /> :
                 <AlertCircle className="h-5 w-5" />}
                {result.predictedClass}
              </motion.div>

              <h2 className="text-3xl font-bold text-white mt-5">{formData.movieName || 'Untitled Project'}</h2>
              <p className="text-[#6b7280] mt-1">{formData.genre} · {formData.releaseMonth} · {formData.country}</p>

              <div className="grid grid-cols-3 gap-6 mt-8 max-w-lg mx-auto">
                <div className="text-center">
                  <p className="text-xs text-[#6b7280] uppercase tracking-wider">Predicted Revenue</p>
                  <p className="text-xl font-bold text-white mt-1">{formatCurrency(result.predictedRevenue)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-[#6b7280] uppercase tracking-wider">Predicted ROI</p>
                  <p className="text-xl font-bold text-emerald-400 mt-1">{result.predictedROI}x</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-[#6b7280] uppercase tracking-wider">Confidence</p>
                  <p className="text-xl font-bold text-indigo-400 mt-1">{(result.confidence * 100).toFixed(0)}%</p>
                </div>
              </div>

              {/* Success Probability Bar */}
              <div className="mt-8 max-w-md mx-auto">
                <div className="flex justify-between text-xs text-[#6b7280] mb-2">
                  <span>Success Probability</span>
                  <span className="text-white font-medium">{result.successProbability}%</span>
                </div>
                <div className="h-3 rounded-full bg-[#1e2130] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.successProbability}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full rounded-full ${
                      result.successProbability >= 70 ? 'bg-emerald-500' :
                      result.successProbability >= 40 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                  />
                </div>
                <div className="flex justify-between text-xs text-[#6b7280] mt-2">
                  <span>Flop</span>
                  <span>Average</span>
                  <span>Hit</span>
                </div>
              </div>
            </div>

            {/* Factor Breakdown */}
            <div className="rounded-2xl bg-[#13151f] border border-[#1e2130] p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Prediction Factors</h3>
              <div className="space-y-3">
                {result.breakdown.map((factor) => (
                  <div key={factor.factor}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#9ca3af]">{factor.factor}</span>
                      <span className="text-white font-medium">{factor.contribution.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#1e2130] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${factor.contribution}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full bg-indigo-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={reset}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1a1c28] border border-[#2a2d3e] text-white text-sm font-medium hover:bg-[#1e2130] transition-all"
              >
                <RotateCcw className="h-4 w-4" />
                New Prediction
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
