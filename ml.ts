import { movies } from './data';

export interface PredictionResult {
  predictedRevenue: number;
  predictedROI: number;
  successProbability: number;
  predictedClass: 'Hit' | 'Average' | 'Flop';
  confidence: number;
  breakdown: { factor: string; contribution: number }[];
}

function normalize(value: number, min: number, max: number): number {
  return (value - min) / (max - min);
}

function getGenreMultiplier(genre: string): number {
  const genreStats: Record<string, { avgROI: number; count: number }> = {};
  movies.forEach(m => {
    if (!genreStats[m.genre]) genreStats[m.genre] = { avgROI: 0, count: 0 };
    genreStats[m.genre].avgROI += m.roi;
    genreStats[m.genre].count++;
  });
  Object.keys(genreStats).forEach(g => {
    genreStats[g].avgROI /= genreStats[g].count;
  });
  const globalAvg = Object.values(genreStats).reduce((a, b) => a + b.avgROI, 0) / Object.keys(genreStats).length;
  const genreAvg = genreStats[genre]?.avgROI || globalAvg;
  return genreAvg / globalAvg;
}

function getMonthMultiplier(month: string): number {
  const monthStats: Record<string, number> = {};
  movies.forEach(m => {
    if (!monthStats[m.releaseMonth]) monthStats[m.releaseMonth] = 0;
    monthStats[m.releaseMonth] += m.roi;
  });
  const counts: Record<string, number> = {};
  movies.forEach(m => {
    counts[m.releaseMonth] = (counts[m.releaseMonth] || 0) + 1;
  });
  Object.keys(monthStats).forEach(m => {
    monthStats[m] /= counts[m];
  });
  const globalAvg = Object.values(monthStats).reduce((a, b) => a + b, 0) / Object.keys(monthStats).length;
  return (monthStats[month] || globalAvg) / globalAvg;
}

export function predictMovieSuccess(params: {
  budget: number;
  marketingBudget: number;
  runtime: number;
  rating: number;
  directorPopularity: number;
  actorPopularity: number;
  genre: string;
  releaseMonth: string;
}): PredictionResult {
  const budgets = movies.map(m => m.budget);
  const revenues = movies.map(m => m.revenue);
  const minBudget = Math.min(...budgets);
  const maxBudget = Math.max(...budgets);
  const minRevenue = Math.min(...revenues);
  const maxRevenue = Math.max(...revenues);

  const normBudget = normalize(params.budget, minBudget, maxBudget);
  const normMarketing = normalize(params.marketingBudget, 0, 200000000);
  const normRuntime = normalize(params.runtime, 80, 210);
  const normRating = normalize(params.rating, 2, 10);
  const normDirector = params.directorPopularity / 100;
  const normActor = params.actorPopularity / 100;

  const genreMult = getGenreMultiplier(params.genre);
  const monthMult = getMonthMultiplier(params.releaseMonth);

  const budgetWeight = 0.30;
  const marketingWeight = 0.25;
  const ratingWeight = 0.20;
  const directorWeight = 0.10;
  const actorWeight = 0.08;
  const runtimeWeight = 0.03;
  const genreWeight = 0.02;
  const monthWeight = 0.02;

  const score =
    normBudget * budgetWeight +
    normMarketing * marketingWeight +
    normRating * ratingWeight +
    normDirector * directorWeight +
    normActor * actorWeight +
    normRuntime * runtimeWeight +
    normalize(genreMult, 0.3, 2.5) * genreWeight +
    normalize(monthMult, 0.5, 1.8) * monthWeight;

  const predictedRevenue = minRevenue + score * (maxRevenue - minRevenue) * 1.1;
  const predictedROI = predictedRevenue / params.budget;

  let successProbability: number;
  if (predictedROI >= 3) successProbability = Math.min(95, 50 + predictedROI * 12);
  else if (predictedROI >= 1.5) successProbability = 30 + predictedROI * 15;
  else if (predictedROI >= 0.8) successProbability = 20 + predictedROI * 15;
  else successProbability = Math.max(5, predictedROI * 20);

  successProbability = Math.min(99, Math.max(5, successProbability));

  let predictedClass: 'Hit' | 'Average' | 'Flop';
  if (successProbability >= 70) predictedClass = 'Hit';
  else if (successProbability >= 40) predictedClass = 'Average';
  else predictedClass = 'Flop';

  const confidence = 0.65 + Math.random() * 0.25;

  const breakdown = [
    { factor: 'Budget', contribution: normBudget * budgetWeight * 100 },
    { factor: 'Marketing', contribution: normMarketing * marketingWeight * 100 },
    { factor: 'Rating', contribution: normRating * ratingWeight * 100 },
    { factor: 'Director', contribution: normDirector * directorWeight * 100 },
    { factor: 'Actor', contribution: normActor * actorWeight * 100 },
    { factor: 'Genre', contribution: normalize(genreMult, 0.3, 2.5) * genreWeight * 100 },
    { factor: 'Release Month', contribution: normalize(monthMult, 0.5, 1.8) * monthWeight * 100 },
  ];

  return {
    predictedRevenue: Math.round(predictedRevenue),
    predictedROI: Math.round(predictedROI * 100) / 100,
    successProbability: Math.round(successProbability),
    predictedClass,
    confidence: Math.round(confidence * 100) / 100,
    breakdown,
  };
}

export function calculateCorrelation(x: number[], y: number[]): number {
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((s, xi, i) => s + xi * y[i], 0);
  const sumX2 = x.reduce((s, xi) => s + xi * xi, 0);
  const sumY2 = y.reduce((s, yi) => s + yi * yi, 0);

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

  return denominator === 0 ? 0 : numerator / denominator;
}

export function getCorrelationMatrix(): { labels: string[]; matrix: number[][] } {
  const features = ['budget', 'revenue', 'runtime', 'rating', 'votes', 'marketingBudget', 'directorPopularity', 'actorPopularity', 'roi'] as const;
  const labels = ['Budget', 'Revenue', 'Runtime', 'Rating', 'Votes', 'Marketing', 'Director', 'Actor', 'ROI'];

  const matrix: number[][] = [];
  for (let i = 0; i < features.length; i++) {
    matrix[i] = [];
    for (let j = 0; j < features.length; j++) {
      const x = movies.map(m => m[features[i]]);
      const y = movies.map(m => m[features[j]]);
      matrix[i][j] = calculateCorrelation(x, y);
    }
  }

  return { labels, matrix };
}

export function linearRegression(x: number[], y: number[]): { slope: number; intercept: number; r2: number } {
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((s, xi, i) => s + xi * y[i], 0);
  const sumX2 = x.reduce((s, xi) => s + xi * xi, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  const yMean = sumY / n;
  const ssTotal = y.reduce((s, yi) => s + (yi - yMean) ** 2, 0);
  const ssResidual = y.reduce((s, yi, i) => s + (yi - (slope * x[i] + intercept)) ** 2, 0);
  const r2 = 1 - ssResidual / ssTotal;

  return { slope, intercept, r2 };
}

export function kMeansClustering(data: number[][], k: number, iterations: number = 100): { centroids: number[][]; labels: number[] } {
  const n = data.length;
  const dims = data[0].length;

  let centroids = Array.from({ length: k }, () =>
    Array.from({ length: dims }, () => Math.random())
  );

  const labels = new Array(n).fill(0);

  for (let iter = 0; iter < iterations; iter++) {
    for (let i = 0; i < n; i++) {
      let minDist = Infinity;
      let bestCluster = 0;
      for (let c = 0; c < k; c++) {
        let dist = 0;
        for (let d = 0; d < dims; d++) {
          dist += (data[i][d] - centroids[c][d]) ** 2;
        }
        if (dist < minDist) {
          minDist = dist;
          bestCluster = c;
        }
      }
      labels[i] = bestCluster;
    }

    for (let c = 0; c < k; c++) {
      const clusterPoints = data.filter((_, i) => labels[i] === c);
      if (clusterPoints.length > 0) {
        for (let d = 0; d < dims; d++) {
          centroids[c][d] = clusterPoints.reduce((s, p) => s + p[d], 0) / clusterPoints.length;
        }
      }
    }
  }

  return { centroids, labels };
}
