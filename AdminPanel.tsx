import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Database, FileText, Download, Upload,
  Settings, Shield, Activity, Trash2, Edit3, Plus,
  Search, CheckCircle, XCircle,
} from 'lucide-react';
import { movies, predictionLogs, reviews, formatCurrency } from '../lib/data';

const tabs = [
  { id: 'datasets', label: 'Datasets', icon: Database },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'predictions', label: 'Predictions', icon: Activity },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastActive: '2 min ago' },
  { id: 2, name: 'Sarah Chen', email: 'sarah@example.com', role: 'Data Scientist', status: 'active', lastActive: '15 min ago' },
  { id: 3, name: 'Mike Ross', email: 'mike@example.com', role: 'Analyst', status: 'active', lastActive: '1 hr ago' },
  { id: 4, name: 'Emily Watson', email: 'emily@example.com', role: 'Viewer', status: 'inactive', lastActive: '3 days ago' },
  { id: 5, name: 'David Kim', email: 'david@example.com', role: 'Analyst', status: 'active', lastActive: '5 hrs ago' },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('datasets');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
        <p className="text-sm text-[#6b7280] mt-1">Manage datasets, users, and system settings</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-[#13151f] border border-[#1e2130] w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#1a1c28] text-white'
                  : 'text-[#6b7280] hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b7280]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab}...`}
            className="w-full rounded-xl bg-[#13151f] border border-[#1e2130] pl-9 pr-4 py-2.5 text-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-indigo-500/50 transition-all"
          />
        </div>
        {activeTab === 'datasets' && (
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-all">
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Upload</span>
          </button>
        )}
        {activeTab === 'users' && (
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-500 transition-all">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add User</span>
          </button>
        )}
      </div>

      {/* Datasets Tab */}
      {activeTab === 'datasets' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: 'Movies Dataset', records: movies.length, size: '2.4 MB', updated: '2024-12-01' },
              { name: 'Reviews Dataset', records: reviews.length, size: '1.1 MB', updated: '2024-12-05' },
              { name: 'Predictions Log', records: predictionLogs.length, size: '0.8 MB', updated: '2024-12-10' },
            ].map((ds) => (
              <div key={ds.name} className="rounded-2xl bg-[#13151f] border border-[#1e2130] p-5">
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-xl bg-[#1a1c28]">
                    <Database className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded-lg text-[#6b7280] hover:text-white hover:bg-[#1a1c28] transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 rounded-lg text-[#6b7280] hover:text-red-400 hover:bg-[#1a1c28] transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-white mt-3">{ds.name}</h3>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div>
                    <p className="text-xs text-[#6b7280]">Records</p>
                    <p className="text-sm font-medium text-white">{ds.records}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6b7280]">Size</p>
                    <p className="text-sm font-medium text-white">{ds.size}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6b7280]">Updated</p>
                    <p className="text-sm font-medium text-white">{ds.updated}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-[#13151f] border border-[#1e2130] p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Dataset Preview — Movies</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1e2130]">
                    <th className="text-left py-3 px-3 text-xs font-medium text-[#6b7280] uppercase">ID</th>
                    <th className="text-left py-3 px-3 text-xs font-medium text-[#6b7280] uppercase">Title</th>
                    <th className="text-left py-3 px-3 text-xs font-medium text-[#6b7280] uppercase">Genre</th>
                    <th className="text-right py-3 px-3 text-xs font-medium text-[#6b7280] uppercase">Budget</th>
                    <th className="text-right py-3 px-3 text-xs font-medium text-[#6b7280] uppercase">Revenue</th>
                    <th className="text-center py-3 px-3 text-xs font-medium text-[#6b7280] uppercase">Rating</th>
                    <th className="text-center py-3 px-3 text-xs font-medium text-[#6b7280] uppercase">Success</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.slice(0, 8).map((m) => (
                    <tr key={m.id} className="border-b border-[#1e2130]/50 hover:bg-[#1a1c28] transition-colors">
                      <td className="py-3 px-3 text-[#6b7280]">{m.id}</td>
                      <td className="py-3 px-3 text-white font-medium">{m.title}</td>
                      <td className="py-3 px-3 text-[#9ca3af]">{m.genre}</td>
                      <td className="py-3 px-3 text-right text-[#9ca3af]">{formatCurrency(m.budget)}</td>
                      <td className="py-3 px-3 text-right text-white">{formatCurrency(m.revenue)}</td>
                      <td className="py-3 px-3 text-center">
                        <span className={`text-sm font-medium ${m.rating >= 8 ? 'text-emerald-400' : m.rating >= 6 ? 'text-amber-400' : 'text-red-400'}`}>
                          {m.rating}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                          m.success === 'Hit' ? 'bg-emerald-500/15 text-emerald-400' :
                          m.success === 'Average' ? 'bg-amber-500/15 text-amber-400' :
                          'bg-red-500/15 text-red-400'
                        }`}>
                          {m.success}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="rounded-2xl bg-[#13151f] border border-[#1e2130] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1e2130]">
                  <th className="text-left py-3 px-4 text-xs font-medium text-[#6b7280] uppercase">User</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-[#6b7280] uppercase">Role</th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-[#6b7280] uppercase">Status</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-[#6b7280] uppercase">Last Active</th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-[#6b7280] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((user) => (
                  <tr key={user.id} className="border-b border-[#1e2130]/50 hover:bg-[#1a1c28] transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                          <span className="text-xs font-semibold text-white">{user.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{user.name}</p>
                          <p className="text-xs text-[#6b7280]">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1a1c28] text-[#9ca3af]">
                        <Shield className="h-3 w-3" />
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'active' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
                      }`}>
                        {user.status === 'active' ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-[#6b7280]">{user.lastActive}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1.5 rounded-lg text-[#6b7280] hover:text-white hover:bg-[#1e2130] transition-colors">
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg text-[#6b7280] hover:text-red-400 hover:bg-[#1e2130] transition-colors">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Predictions Tab */}
      {activeTab === 'predictions' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="rounded-2xl bg-[#13151f] border border-[#1e2130] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Prediction Logs</h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a1c28] border border-[#2a2d3e] text-xs text-[#9ca3af] hover:text-white transition-colors">
                  <Download className="h-3.5 w-3.5" />
                  Export CSV
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a1c28] border border-[#2a2d3e] text-xs text-[#9ca3af] hover:text-white transition-colors">
                  <FileText className="h-3.5 w-3.5" />
                  Export PDF
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1e2130]">
                    <th className="text-left py-3 px-4 text-xs font-medium text-[#6b7280] uppercase">ID</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-[#6b7280] uppercase">Movie</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-[#6b7280] uppercase">Genre</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-[#6b7280] uppercase">Predicted</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-[#6b7280] uppercase">Actual</th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-[#6b7280] uppercase">Class</th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-[#6b7280] uppercase">Confidence</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-[#6b7280] uppercase">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {predictionLogs.map((log) => (
                    <tr key={log.id} className="border-b border-[#1e2130]/50 hover:bg-[#1a1c28] transition-colors">
                      <td className="py-3 px-4 text-[#6b7280]">#{log.id}</td>
                      <td className="py-3 px-4 text-white font-medium">{log.movieName}</td>
                      <td className="py-3 px-4 text-[#9ca3af]">{log.genre}</td>
                      <td className="py-3 px-4 text-right text-white">{formatCurrency(log.predictedRevenue)}</td>
                      <td className="py-3 px-4 text-right text-[#9ca3af]">
                        {log.actualRevenue ? formatCurrency(log.actualRevenue) : '—'}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                          log.predictedClass === 'Hit' ? 'bg-emerald-500/15 text-emerald-400' :
                          log.predictedClass === 'Average' ? 'bg-amber-500/15 text-amber-400' :
                          'bg-red-500/15 text-red-400'
                        }`}>
                          {log.predictedClass}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center gap-2 justify-center">
                          <div className="w-12 h-1.5 rounded-full bg-[#1e2130] overflow-hidden">
                            <div className="h-full rounded-full bg-indigo-500" style={{ width: `${log.confidence * 100}%` }} />
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
          </div>
        </motion.div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 max-w-2xl">
          {[
            { label: 'Auto-retrain models', desc: 'Automatically retrain models when new data is added', enabled: true },
            { label: 'Email notifications', desc: 'Receive email alerts for prediction completions', enabled: true },
            { label: 'Data anonymization', desc: 'Anonymize user data in exported reports', enabled: false },
            { label: 'Real-time predictions', desc: 'Enable real-time prediction API endpoints', enabled: true },
            { label: 'Advanced analytics', desc: 'Enable experimental analytics features', enabled: false },
          ].map((setting, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-[#13151f] border border-[#1e2130]">
              <div>
                <p className="text-sm font-medium text-white">{setting.label}</p>
                <p className="text-xs text-[#6b7280] mt-0.5">{setting.desc}</p>
              </div>
              <button
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  setting.enabled ? 'bg-indigo-600' : 'bg-[#2a2d3e]'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    setting.enabled ? 'translate-x-5.5' : 'translate-x-0.5'
                  }`}
                  style={{ transform: setting.enabled ? 'translateX(22px)' : 'translateX(2px)' }}
                />
              </button>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
