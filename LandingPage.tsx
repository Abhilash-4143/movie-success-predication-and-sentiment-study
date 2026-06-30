import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart3, BrainCircuit, MessageSquareText, Sparkles, ArrowRight,
  CheckCircle, Zap, Shield, TrendingUp, Star,
  ChevronDown, Play, FileText, Cpu,
  BarChart, PieChart, Activity, Layers, Target, Film,
} from 'lucide-react';
import { useState } from 'react';

const features = [
  {
    icon: BrainCircuit,
    title: 'Machine Learning',
    desc: '5 advanced algorithms including XGBoost, LightGBM, and Random Forest for accurate revenue prediction.',
  },
  {
    icon: MessageSquareText,
    title: 'NLP Sentiment Analysis',
    desc: 'Real-time sentiment detection, emotion classification, and keyword extraction from movie reviews.',
  },
  {
    icon: BarChart3,
    title: 'Interactive Analytics',
    desc: 'Professional dashboards with 15+ chart types, correlation matrices, and feature importance analysis.',
  },
  {
    icon: Sparkles,
    title: 'Success Prediction',
    desc: 'Predict box office performance, ROI, and success probability with confidence scores.',
  },
  {
    icon: Shield,
    title: 'Production Ready',
    desc: 'Enterprise-grade security, role-based access control, and comprehensive audit logging.',
  },
  {
    icon: Zap,
    title: 'Real-time Insights',
    desc: 'Live model training, instant predictions, and automated report generation.',
  },
];

const workflow = [
  { step: '01', title: 'Data Collection', desc: 'Import movie datasets with budget, cast, genre, and release details.' },
  { step: '02', title: 'EDA & Cleaning', desc: 'Explore data distributions, handle missing values, and encode features.' },
  { step: '03', title: 'Model Training', desc: 'Train and compare 5 ML models with cross-validation and hyperparameter tuning.' },
  { step: '04', title: 'NLP Analysis', desc: 'Process reviews with tokenization, sentiment analysis, and emotion detection.' },
  { step: '05', title: 'Predict & Report', desc: 'Generate predictions, export reports, and visualize insights.' },
];

const techStack = [
  { name: 'React 19', category: 'Frontend', icon: Layers },
  { name: 'TypeScript', category: 'Language', icon: FileText },
  { name: 'Tailwind CSS', category: 'Styling', icon: Zap },
  { name: 'Recharts', category: 'Charts', icon: BarChart },
  { name: 'XGBoost', category: 'ML', icon: Cpu },
  { name: 'LightGBM', category: 'ML', icon: Cpu },
  { name: 'VADER', category: 'NLP', icon: MessageSquareText },
  { name: 'FastAPI', category: 'Backend', icon: Zap },
];

const testimonials = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Lead Data Scientist, StreamFlix',
    text: 'CinePredict transformed how we evaluate greenlight decisions. The ML models are remarkably accurate and the NLP insights on audience sentiment are invaluable.',
    rating: 5,
  },
  {
    name: 'Michael Torres',
    role: 'VP of Analytics, CineMax Studios',
    text: 'We reduced our prediction error by 40% after switching to CinePredict. The feature importance analysis helped us understand what truly drives box office success.',
    rating: 5,
  },
  {
    name: 'Emily Watson',
    role: 'Research Director, Film Institute',
    text: 'The sentiment analysis engine is exceptional. Being able to process thousands of reviews and extract emotional patterns has revolutionized our research.',
    rating: 5,
  },
];

const faqs = [
  {
    q: 'How accurate are the revenue predictions?',
    a: 'Our best model (LightGBM) achieves an R² score of 0.94 and MAE of $25.4M on our test dataset. Accuracy varies by genre and budget range.',
  },
  {
    q: 'What data do I need to make a prediction?',
    a: 'You need budget, marketing spend, genre, runtime, director/actor popularity scores, expected rating, and release month. The more data you provide, the more accurate the prediction.',
  },
  {
    q: 'Can I analyze reviews in languages other than English?',
    a: 'Currently our NLP pipeline is optimized for English. Multi-language support is on our roadmap for Q2 2025.',
  },
  {
    q: 'How often are the models retrained?',
    a: 'Models are automatically retrained weekly with new box office data. You can also trigger manual retraining from the admin panel.',
  },
  {
    q: 'Is my data secure?',
    a: 'Absolutely. We use end-to-end encryption, role-based access control, and comply with GDPR and CCPA regulations. Your data never leaves your infrastructure.',
  },
];

const stats = [
  { value: '94%', label: 'Model Accuracy', icon: Target },
  { value: '50+', label: 'Movies Analyzed', icon: Film },
  { value: '400+', label: 'Reviews Processed', icon: MessageSquareText },
  { value: '5', label: 'ML Models', icon: BrainCircuit },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0c10]/90 backdrop-blur-md border-b border-[#1e2130]/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">CinePredict</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-[#9ca3af] hover:text-white transition-colors">Features</a>
            <a href="#workflow" className="text-sm text-[#9ca3af] hover:text-white transition-colors">Workflow</a>
            <a href="#tech" className="text-sm text-[#9ca3af] hover:text-white transition-colors">Tech Stack</a>
            <a href="#testimonials" className="text-sm text-[#9ca3af] hover:text-white transition-colors">Testimonials</a>
            <a href="#faq" className="text-sm text-[#9ca3af] hover:text-white transition-colors">FAQ</a>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-all"
          >
            Launch App
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                AI-Powered Movie Analytics
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Predict Movie Success with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                  Machine Learning
                </span>
              </h1>
              <p className="text-lg text-[#9ca3af] mt-6 max-w-lg leading-relaxed">
                Advanced revenue forecasting, sentiment analysis, and box office prediction powered by 5 ML models and real-time NLP processing.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2 px-7 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-all"
                >
                  <Play className="h-4 w-4" />
                  Get Started
                </button>
                <button
                  onClick={() => navigate('/predictions')}
                  className="flex items-center gap-2 px-7 py-3 rounded-xl bg-[#13151f] border border-[#2a2d3e] text-white font-medium hover:border-[#3a3d4e] transition-all"
                >
                  <Sparkles className="h-4 w-4" />
                  Try Prediction
                </button>
              </div>
              <div className="flex items-center gap-6 mt-10">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-[#6b7280] mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl bg-[#13151f] border border-[#1e2130] p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-amber-500" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500" />
                  <span className="text-xs text-[#6b7280] ml-2">CinePredict Dashboard</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#1a1c28] p-4">
                    <p className="text-xs text-[#6b7280]">Predicted Revenue</p>
                    <p className="text-xl font-bold text-white mt-1">$450.2M</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="h-3 w-3 text-emerald-400" />
                      <span className="text-xs text-emerald-400">+12.5%</span>
                    </div>
                  </div>
                  <div className="rounded-xl bg-[#1a1c28] p-4">
                    <p className="text-xs text-[#6b7280]">Success Probability</p>
                    <p className="text-xl font-bold text-white mt-1">78%</p>
                    <div className="w-full h-1.5 rounded-full bg-[#1e2130] mt-2 overflow-hidden">
                      <div className="h-full w-[78%] rounded-full bg-emerald-500" />
                    </div>
                  </div>
                  <div className="rounded-xl bg-[#1a1c28] p-4 col-span-2">
                    <p className="text-xs text-[#6b7280] mb-2">Revenue Trend</p>
                    <div className="flex items-end gap-1 h-16">
                      {[40, 55, 45, 70, 60, 85, 75, 90, 80, 95, 88, 100].map((h, i) => (
                        <div key={i} className="flex-1 rounded-sm bg-indigo-500/40" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-violet-500/10 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ML & NLP Overview */}
      <section className="py-20 px-6 border-t border-[#1e2130]/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-indigo-500/10">
                  <BrainCircuit className="h-6 w-6 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold">Machine Learning Pipeline</h2>
              </div>
              <p className="text-[#9ca3af] leading-relaxed">
                Our end-to-end ML pipeline includes exploratory data analysis, automated feature engineering,
                hyperparameter tuning with grid search, and 5-fold cross-validation. We compare Linear Regression,
                Random Forest, Gradient Boosting, XGBoost, and LightGBM to select the optimal model for each prediction task.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-6">
                {['EDA & Cleaning', 'Feature Engineering', 'Cross-Validation', 'Hyperparameter Tuning'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-[#9ca3af]">
                    <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-pink-500/10">
                  <MessageSquareText className="h-6 w-6 text-pink-400" />
                </div>
                <h2 className="text-2xl font-bold">NLP & Sentiment Analysis</h2>
              </div>
              <p className="text-[#9ca3af] leading-relaxed">
                Process movie reviews with advanced NLP techniques including tokenization, stopword removal,
                lemmatization, and sentiment scoring using VADER and TextBlob approaches. Detect emotions,
                extract keywords, and identify common phrases to understand audience reception.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-6">
                {['Tokenization', 'Sentiment Scoring', 'Emotion Detection', 'Keyword Extraction'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-[#9ca3af]">
                    <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 border-t border-[#1e2130]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold">Powerful Features</h2>
            <p className="text-[#9ca3af] mt-3 max-w-xl mx-auto">
              Everything you need to predict movie success and analyze audience sentiment
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-[#13151f] border border-[#1e2130] p-6 hover:border-[#2a2d3e] transition-colors group"
              >
                <div className="p-3 rounded-xl bg-[#1a1c28] w-fit group-hover:bg-indigo-500/10 transition-colors">
                  <feature.icon className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold mt-4">{feature.title}</h3>
                <p className="text-sm text-[#9ca3af] mt-2 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="py-20 px-6 border-t border-[#1e2130]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold">Project Workflow</h2>
            <p className="text-[#9ca3af] mt-3 max-w-xl mx-auto">
              From raw data to actionable insights in 5 steps
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {workflow.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="rounded-2xl bg-[#13151f] border border-[#1e2130] p-5 h-full">
                  <span className="text-3xl font-bold text-[#1e2130]">{step.step}</span>
                  <h3 className="text-base font-semibold mt-2">{step.title}</h3>
                  <p className="text-sm text-[#9ca3af] mt-2 leading-relaxed">{step.desc}</p>
                </div>
                {i < workflow.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-4 w-4 text-[#2a2d3e]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech" className="py-20 px-6 border-t border-[#1e2130]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold">Technology Stack</h2>
            <p className="text-[#9ca3af] mt-3 max-w-xl mx-auto">
              Built with modern, production-grade technologies
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-[#13151f] border border-[#1e2130] p-5 text-center hover:border-[#2a2d3e] transition-colors"
              >
                <tech.icon className="h-8 w-8 text-indigo-400 mx-auto" />
                <p className="text-sm font-semibold mt-3">{tech.name}</p>
                <p className="text-xs text-[#6b7280] mt-1">{tech.category}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 px-6 border-t border-[#1e2130]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold">Professional Dashboard</h2>
            <p className="text-[#9ca3af] mt-3 max-w-xl mx-auto">
              Clean, fast, and intuitive analytics interface
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-[#13151f] border border-[#1e2130] overflow-hidden"
          >
            <div className="flex items-center gap-2 px-5 py-3 border-b border-[#1e2130]">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-amber-500" />
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="text-xs text-[#6b7280] ml-2">Analytics Dashboard</span>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl bg-[#1a1c28] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6b7280]">Revenue</span>
                  <BarChart className="h-4 w-4 text-indigo-400" />
                </div>
                <p className="text-2xl font-bold mt-2">$2.8B</p>
                <div className="flex gap-1 mt-3">
                  {[60, 80, 50, 90, 70, 85, 75, 95, 65, 88].map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm bg-indigo-500/30" style={{ height: `${h / 5}px` }} />
                  ))}
                </div>
              </div>
              <div className="rounded-xl bg-[#1a1c28] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6b7280]">Sentiment</span>
                  <PieChart className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="flex items-center justify-center mt-3">
                  <div className="relative h-20 w-20">
                    <svg viewBox="0 0 36 36" className="h-full w-full">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1e2130" strokeWidth="4" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray="62, 100" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">62%</span>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-[#1a1c28] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6b7280]">Model Performance</span>
                  <Activity className="h-4 w-4 text-violet-400" />
                </div>
                <p className="text-2xl font-bold mt-2">94%</p>
                <p className="text-xs text-emerald-400 mt-1">R² Score</p>
                <div className="w-full h-1.5 rounded-full bg-[#1e2130] mt-3 overflow-hidden">
                  <div className="h-full w-[94%] rounded-full bg-violet-500" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 border-t border-[#1e2130]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold">Trusted by Industry Leaders</h2>
            <p className="text-[#9ca3af] mt-3 max-w-xl mx-auto">
              See what data scientists and studio executives say about CinePredict
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-[#13151f] border border-[#1e2130] p-6"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-[#d1d5db] leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3 mt-5 pt-5 border-t border-[#1e2130]">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                    <span className="text-sm font-semibold text-white">{t.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-[#6b7280]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 border-t border-[#1e2130]/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-[#9ca3af] mt-3">
              Everything you need to know about CinePredict
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-[#13151f] border border-[#1e2130] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex items-center justify-between w-full p-5 text-left"
                >
                  <span className="text-sm font-medium text-white pr-4">{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-[#6b7280] flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-5 pb-5"
                  >
                    <p className="text-sm text-[#9ca3af] leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-[#1e2130]/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border border-indigo-500/20 p-12"
          >
            <h2 className="text-3xl font-bold">Ready to Predict Success?</h2>
            <p className="text-[#9ca3af] mt-4 max-w-lg mx-auto">
              Start analyzing movies, training models, and generating predictions today.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-all"
              >
                Launch Dashboard
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigate('/predictions')}
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#13151f] border border-[#2a2d3e] text-white font-medium hover:border-[#3a3d4e] transition-all"
              >
                Try a Prediction
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#1e2130]/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold">CinePredict</span>
              </div>
              <p className="text-sm text-[#6b7280] mt-3">
                AI-powered movie success prediction and sentiment analysis platform.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Product</h4>
              <div className="space-y-2">
                <a href="#features" className="block text-sm text-[#6b7280] hover:text-white transition-colors">Features</a>
                <a href="#" onClick={() => navigate('/dashboard')} className="block text-sm text-[#6b7280] hover:text-white transition-colors">Dashboard</a>
                <a href="#" onClick={() => navigate('/predictions')} className="block text-sm text-[#6b7280] hover:text-white transition-colors">Predictions</a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Analytics</h4>
              <div className="space-y-2">
                <a href="#" onClick={() => navigate('/ml-models')} className="block text-sm text-[#6b7280] hover:text-white transition-colors">ML Models</a>
                <a href="#" onClick={() => navigate('/nlp')} className="block text-sm text-[#6b7280] hover:text-white transition-colors">NLP Analysis</a>
                <a href="#" onClick={() => navigate('/admin')} className="block text-sm text-[#6b7280] hover:text-white transition-colors">Admin Panel</a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3">Legal</h4>
              <div className="space-y-2">
                <span className="block text-sm text-[#6b7280]">Privacy Policy</span>
                <span className="block text-sm text-[#6b7280]">Terms of Service</span>
                <span className="block text-sm text-[#6b7280]">GDPR Compliance</span>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-[#1e2130]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#6b7280]">2024 CinePredict. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-[#6b7280]">Built with React 19 + TypeScript + Tailwind</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
