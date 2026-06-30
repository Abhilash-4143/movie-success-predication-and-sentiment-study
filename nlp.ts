export interface SentimentResult {
  compound: number;
  positive: number;
  negative: number;
  neutral: number;
  label: 'positive' | 'negative' | 'neutral';
}

export interface EmotionResult {
  emotion: string;
  score: number;
}

const POSITIVE_WORDS = new Set([
  'good', 'great', 'excellent', 'amazing', 'awesome', 'fantastic', 'wonderful',
  'incredible', 'outstanding', 'superb', 'brilliant', 'magnificent', 'perfect',
  'beautiful', 'stunning', 'gorgeous', 'lovely', 'fabulous', 'terrific',
  'marvelous', 'exceptional', 'remarkable', 'extraordinary', 'phenomenal',
  'spectacular', 'impressive', 'masterpiece', 'classic', 'iconic', 'genius',
  'best', 'love', 'loved', 'enjoy', 'enjoyed', 'recommend', 'recommended',
  'must watch', 'highly', 'praise', 'praised', 'acclaim', 'acclaimed',
  'breathtaking', 'captivating', 'engaging', 'gripping', 'compelling',
  'powerful', 'moving', 'touching', 'emotional', 'heartwarming', 'inspiring',
  'thought-provoking', 'intelligent', 'clever', 'witty', 'funny', 'hilarious',
  'charming', 'delightful', 'pleasant', 'satisfying', 'rewarding', 'worth',
  'memorable', 'unforgettable', 'timeless', 'revolutionary', 'groundbreaking',
  'innovative', 'creative', 'original', 'unique', 'refreshing', 'authentic',
  'realistic', 'believable', 'convincing', 'compelling', 'immersive',
]);

const NEGATIVE_WORDS = new Set([
  'bad', 'terrible', 'awful', 'horrible', 'dreadful', 'atrocious', 'appalling',
  'disgusting', 'revolting', 'repulsive', 'abysmal', 'pathetic', 'pitiful',
  'woeful', 'lamentable', 'deplorable', 'dismal', 'grim', 'bleak', 'dark',
  'boring', 'dull', 'tedious', 'monotonous', 'repetitive', 'predictable',
  'cliche', 'formulaic', 'derivative', 'unoriginal', 'generic', 'mediocre',
  'average', 'ordinary', 'unremarkable', 'forgettable', 'waste', 'wasted',
  'disappointing', 'disappointed', 'letdown', 'underwhelming', 'overrated',
  'overhyped', 'pretentious', 'pretentious', 'pompous', 'arrogant',
  'confusing', 'confused', 'nonsense', 'incoherent', 'mess', 'messy',
  'sloppy', 'lazy', 'careless', 'half-baked', 'rushed', 'unfinished',
  'poor', 'weak', 'flimsy', 'shallow', 'hollow', 'empty', 'meaningless',
  'pointless', 'useless', 'worthless', 'trash', 'garbage', 'rubbish',
  'disaster', 'catastrophe', 'failure', 'fail', 'flop', 'bomb',
  'hate', 'hated', 'despise', 'loathe', 'detest', 'abhor',
  'annoying', 'irritating', 'frustrating', 'aggravating', 'infuriating',
  'cringe', 'cringeworthy', 'embarrassing', 'shameful', 'disgraceful',
]);

const EMOTION_PATTERNS: { emotion: string; words: string[]; weight: number }[] = [
  { emotion: 'Joy', words: ['love', 'amazing', 'wonderful', 'beautiful', 'perfect', 'masterpiece', 'incredible', 'joy', 'happy', 'delight', 'laugh', 'fun', 'enjoy'], weight: 1.0 },
  { emotion: 'Fear', words: ['scary', 'terrifying', 'horror', 'frightening', 'creepy', 'chilling', 'spooky', 'nightmare', 'dread', 'anxiety', 'tense', 'suspense'], weight: 1.0 },
  { emotion: 'Anger', words: ['hate', 'angry', 'furious', 'rage', 'annoying', 'frustrating', 'terrible', 'awful', 'worst', 'disgusting', 'outrage'], weight: 1.0 },
  { emotion: 'Sadness', words: ['sad', 'crying', 'tears', 'heartbreaking', 'tragic', 'depressing', 'melancholy', 'grief', 'sorrow', 'loss', 'lonely'], weight: 1.0 },
  { emotion: 'Disgust', words: ['gross', 'disgusting', 'revolting', 'nasty', 'sick', 'vile', 'repulsive', 'disturbing', 'unpleasant', 'yuck'], weight: 1.0 },
  { emotion: 'Surprise', words: ['shocking', 'unexpected', 'twist', 'surprise', 'amazed', 'stunned', 'wow', 'unbelievable', 'incredible', 'mind-blowing'], weight: 1.0 },
];

export function analyzeSentiment(text: string): SentimentResult {
  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 0);

  let posCount = 0;
  let negCount = 0;
  let totalWords = words.length;

  words.forEach(word => {
    if (POSITIVE_WORDS.has(word)) posCount++;
    if (NEGATIVE_WORDS.has(word)) negCount++;
  });

  const posScore = posCount / Math.max(totalWords, 1);
  const negScore = negCount / Math.max(totalWords, 1);
  const neuScore = Math.max(0, 1 - posScore - negScore);

  const compound = posScore - negScore;

  let label: 'positive' | 'negative' | 'neutral';
  if (compound > 0.05) label = 'positive';
  else if (compound < -0.05) label = 'negative';
  else label = 'neutral';

  return {
    compound: Math.round(compound * 100) / 100,
    positive: Math.round(posScore * 100) / 100,
    negative: Math.round(negScore * 100) / 100,
    neutral: Math.round(neuScore * 100) / 100,
    label,
  };
}

export function detectEmotion(text: string): EmotionResult[] {
  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 0);
  const results: EmotionResult[] = [];

  EMOTION_PATTERNS.forEach(pattern => {
    let score = 0;
    words.forEach(word => {
      pattern.words.forEach(pw => {
        if (word.includes(pw) || pw.includes(word)) {
          score += pattern.weight;
        }
      });
    });
    if (score > 0) {
      results.push({ emotion: pattern.emotion, score });
    }
  });

  results.sort((a, b) => b.score - a.score);
  return results.length > 0 ? results : [{ emotion: 'Neutral', score: 1 }];
}

export function extractKeywords(text: string, topN: number = 5): { word: string; score: number }[] {
  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/)
    .filter(w => w.length > 3)
    .filter(w => !['this', 'that', 'with', 'from', 'they', 'have', 'been', 'were', 'what', 'when', 'where', 'which', 'while', 'about', 'would', 'could', 'should', 'there', 'their', 'them', 'than', 'then', 'also', 'only', 'just', 'like', 'make', 'made', 'time', 'very', 'more', 'most', 'some', 'many', 'much', 'such', 'well', 'even', 'will', 'said', 'each', 'other', 'after', 'before', 'being', 'over', 'into', 'through', 'during', 'here', 'back', 'down', 'come', 'came', 'know', 'take', 'took', 'give', 'gave', 'want', 'went', 'think', 'thought', 'look', 'looked', 'find', 'found', 'tell', 'told', 'work', 'worked', 'call', 'called', 'try', 'tried', 'need', 'needed', 'feel', 'felt', 'become', 'became', 'leave', 'left', 'put', 'mean', 'meant', 'keep', 'kept', 'let', 'begin', 'began', 'seem', 'seemed', 'help', 'helped', 'show', 'showed', 'hear', 'heard', 'play', 'played', 'run', 'ran', 'move', 'moved', 'live', 'lived', 'believe', 'believed', 'bring', 'brought', 'happen', 'happened', 'stand', 'stood', 'lose', 'lost', 'pay', 'paid', 'meet', 'met', 'include', 'included', 'continue', 'continued', 'set', 'learn', 'learned', 'change', 'changed', 'lead', 'led', 'understand', 'understood', 'watch', 'watched', 'follow', 'followed', 'stop', 'stopped', 'create', 'created', 'speak', 'spoke', 'read', 'allow', 'allowed', 'add', 'added', 'spend', 'spent', 'grow', 'grew', 'open', 'opened', 'walk', 'walked', 'offer', 'offered', 'remember', 'remembered', 'love', 'loved', 'consider', 'considered', 'appear', 'appeared', 'buy', 'bought', 'wait', 'waited', 'serve', 'served', 'die', 'died', 'send', 'sent', 'expect', 'expected', 'build', 'built', 'stay', 'stayed', 'fall', 'fell', 'cut', 'reach', 'reached', 'kill', 'killed', 'remain', 'remained', 'suggest', 'suggested', 'raise', 'raised', 'pass', 'passed', 'sell', 'sold', 'require', 'required', 'report', 'reported', 'decide', 'decided', 'pull', 'pulled'].includes(w));

  const freq: Record<string, number> = {};
  words.forEach(w => {
    freq[w] = (freq[w] || 0) + 1;
  });

  return Object.entries(freq)
    .map(([word, count]) => ({ word, score: count * (word.length > 5 ? 1.2 : 1) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}

export function extractBigrams(texts: string[]): { phrase: string; count: number }[] {
  const bigramCounts: Record<string, number> = {};

  texts.forEach(text => {
    const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2);
    for (let i = 0; i < words.length - 1; i++) {
      const bigram = `${words[i]} ${words[i + 1]}`;
      bigramCounts[bigram] = (bigramCounts[bigram] || 0) + 1;
    }
  });

  return Object.entries(bigramCounts)
    .map(([phrase, count]) => ({ phrase, count }))
    .filter(b => b.count > 1)
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);
}

export function cleanText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function tokenize(text: string): string[] {
  return cleanText(text).split(/\s+/).filter(w => w.length > 0);
}

export function removeStopwords(tokens: string[]): string[] {
  const stopwords = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'from', 'as', 'is', 'was', 'are', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do',
    'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'shall', 'can',
    'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him',
    'her', 'us', 'them', 'my', 'your', 'his', 'her', 'its', 'our', 'their', 'what', 'which',
    'who', 'whom', 'whose', 'where', 'when', 'why', 'how', 'all', 'each', 'every', 'both',
    'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same',
    'so', 'than', 'too', 'very', 'just', 'now', 'then', 'here', 'there', 'up', 'down', 'out',
    'off', 'over', 'under', 'again', 'further', 'once', 'also', 'any', 'both', 'each', 'few',
    'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so',
  ]);
  return tokens.filter(t => !stopwords.has(t));
}

export function lemmatize(word: string): string {
  const rules: [RegExp, string][] = [
    [/ies$/, 'y'],
    [/ied$/, 'y'],
    [/ying$/, 'ie'],
    [/ying$/, 'y'],
    [/ied$/, 'y'],
    [/ies$/, 'y'],
    [/s$/, ''],
    [/es$/, ''],
    [/ed$/, ''],
    [/ing$/, ''],
    [/ied$/, 'y'],
    [/ies$/, 'y'],
    [/ied$/, 'y'],
    [/ying$/, 'ie'],
    [/ying$/, 'y'],
  ];

  for (const [pattern, replacement] of rules) {
    if (pattern.test(word)) {
      const lemmatized = word.replace(pattern, replacement);
      if (lemmatized.length >= 2) return lemmatized;
    }
  }
  return word;
}
