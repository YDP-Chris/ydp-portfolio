import React, { useState, useEffect } from 'react';

// Pulse API URL - reuse the Forge webhook URL
const PULSE_API_URL = import.meta.env.VITE_FORGE_WEBHOOK_URL || 'https://api.yadkindatapartners.com';

function CommandCenter({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [token, setToken] = useState(null);

  const [activeTab, setActiveTab] = useState('devops');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check for existing token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('pulse_token');
    if (savedToken) {
      verifyToken(savedToken);
    }
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated && token && isOpen) {
      fetchData();
    }
  }, [isAuthenticated, token, isOpen]);

  const verifyToken = async (savedToken) => {
    try {
      const res = await fetch(`${PULSE_API_URL}/pulse/verify`, {
        headers: { 'Authorization': `Bearer ${savedToken}` }
      });
      if (res.ok) {
        setToken(savedToken);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('pulse_token');
      }
    } catch (err) {
      localStorage.removeItem('pulse_token');
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch(`${PULSE_API_URL}/pulse/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();

      if (data.authenticated) {
        setToken(data.token);
        setIsAuthenticated(true);
        localStorage.setItem('pulse_token', data.token);
      } else {
        setAuthError('Invalid password');
      }
    } catch (err) {
      setAuthError('Connection failed');
    }
    setAuthLoading(false);
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${PULSE_API_URL}/pulse`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.status === 401) {
        setIsAuthenticated(false);
        localStorage.removeItem('pulse_token');
        return;
      }

      const result = await res.json();
      setData(result);
    } catch (err) {
      setError('Failed to load data');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setData(null);
    localStorage.removeItem('pulse_token');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700 mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-pulse">💓</span>
            <div>
              <h2 className="text-xl font-bold text-white">YDP Pulse</h2>
              <p className="text-xs text-gray-400">Command Center</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-xs text-gray-400 hover:text-white transition"
              >
                Logout
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition text-2xl leading-none"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {!isAuthenticated ? (
            <AuthForm
              password={password}
              setPassword={setPassword}
              onSubmit={handleAuth}
              error={authError}
              loading={authLoading}
            />
          ) : (
            <Dashboard
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              data={data}
              loading={loading}
              error={error}
              onRefresh={fetchData}
              token={token}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function AuthForm({ password, setPassword, onSubmit, error, loading }) {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="text-6xl mb-6">🔒</div>
      <h3 className="text-xl font-semibold text-white mb-2">Access Required</h3>
      <p className="text-gray-400 text-sm mb-6">Enter admin password to continue</p>

      <form onSubmit={onSubmit} className="w-full max-w-xs">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 mb-4"
          autoFocus
        />
        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Enter Command Center'}
        </button>
      </form>
    </div>
  );
}

function Dashboard({ activeTab, setActiveTab, data, loading, error, onRefresh, token }) {
  const tabs = [
    { id: 'devops', label: 'DevOps', icon: '🩺' },
    { id: 'problems', label: 'Problems', icon: '💡' },
    { id: 'intel', label: 'Intel', icon: '🕵️' }
  ];

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-gray-700 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              activeTab === tab.id
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
        <button
          onClick={onRefresh}
          className="ml-auto text-gray-400 hover:text-white transition p-2"
          title="Refresh"
        >
          🔄
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin text-4xl">⏳</div>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-400">{error}</div>
      ) : !data ? (
        <div className="text-center py-12 text-gray-500">No data available</div>
      ) : (
        <>
          {activeTab === 'devops' && <DevOpsTab data={data.devops} />}
          {activeTab === 'problems' && <ProblemsTab token={token} />}
          {activeTab === 'intel' && <IntelTab data={data.intel} />}
        </>
      )}
    </div>
  );
}

function DevOpsTab({ data }) {
  if (!data) return <div className="text-gray-500">No DevOps data</div>;

  const { projects, healthy_count, total_count, last_check, pi } = data;

  // Color helpers for Pi metrics
  const getTempColor = (temp) => {
    if (!temp) return 'text-gray-400';
    if (temp >= 80) return 'text-red-400';
    if (temp >= 70) return 'text-amber-400';
    return 'text-green-400';
  };

  const getUsageColor = (pct) => {
    if (!pct) return 'text-gray-400';
    if (pct >= 90) return 'text-red-400';
    if (pct >= 80) return 'text-amber-400';
    return 'text-green-400';
  };

  return (
    <div>
      {/* Pi Health Section */}
      {pi && (
        <div className="mb-6 p-4 bg-gradient-to-r from-pink-900/30 to-purple-900/30 rounded-xl border border-pink-500/30">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🍓</span>
            <h3 className="font-bold text-white">Raspberry Pi 4B</h3>
            <span className={`ml-auto text-xs px-2 py-1 rounded ${pi.healthy ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {pi.healthy ? 'Healthy' : 'Issues Detected'}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getTempColor(pi.cpu_temp)}`}>
                {pi.cpu_temp ? `${pi.cpu_temp}°C` : 'N/A'}
              </div>
              <div className="text-xs text-gray-400">CPU Temp</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getUsageColor(pi.cpu_percent)}`}>
                {pi.cpu_percent != null ? `${pi.cpu_percent}%` : 'N/A'}
              </div>
              <div className="text-xs text-gray-400">CPU Usage</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getUsageColor(pi.memory_percent)}`}>
                {pi.memory_percent != null ? `${pi.memory_percent}%` : 'N/A'}
              </div>
              <div className="text-xs text-gray-400">Memory</div>
              {pi.memory_used_gb && (
                <div className="text-xs text-gray-500">{pi.memory_used_gb}/{pi.memory_total_gb} GB</div>
              )}
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getUsageColor(pi.disk_percent)}`}>
                {pi.disk_percent != null ? `${pi.disk_percent}%` : 'N/A'}
              </div>
              <div className="text-xs text-gray-400">Disk</div>
              {pi.disk_used_gb && (
                <div className="text-xs text-gray-500">{pi.disk_used_gb}/{pi.disk_total_gb} GB</div>
              )}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
            <span>Uptime: {pi.uptime_human || 'N/A'}</span>
            <span>Load: {pi.load_avg ? pi.load_avg.map(l => l.toFixed(2)).join(' / ') : 'N/A'}</span>
          </div>
          {pi.warnings && pi.warnings.length > 0 && (
            <div className="mt-3 p-2 bg-amber-500/10 rounded border border-amber-500/30">
              {pi.warnings.map((w, i) => (
                <div key={i} className="text-xs text-amber-400">{w}</div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Vercel Projects Summary */}
      <div className="flex items-center gap-6 mb-6 p-4 bg-gray-800/50 rounded-xl">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-400">{healthy_count || 0}</div>
          <div className="text-xs text-gray-400">Healthy</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-white">{total_count || 0}</div>
          <div className="text-xs text-gray-400">Projects</div>
        </div>
        {last_check && (
          <div className="ml-auto text-right">
            <div className="text-xs text-gray-500">Last Check</div>
            <div className="text-sm text-gray-400">
              {new Date(last_check).toLocaleString()}
            </div>
          </div>
        )}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(projects || []).map((project, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border ${
              project.healthy
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-red-500/10 border-red-500/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{project.healthy ? '💚' : '💔'}</span>
              <div>
                <div className="font-semibold text-white">{project.name}</div>
                <div className={`text-sm ${project.healthy ? 'text-green-400' : 'text-red-400'}`}>
                  {project.status}
                </div>
              </div>
            </div>
            {project.url && (
              <a
                href={`https://${project.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-white mt-2 block truncate"
              >
                {project.url}
              </a>
            )}
          </div>
        ))}
      </div>

      {(!projects || projects.length === 0) && (
        <div className="text-center py-8 text-gray-500">
          No project data yet. DevOps Monitor will populate this.
        </div>
      )}
    </div>
  );
}

function ProblemsTab({ token }) {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProblems();
  }, [token]);

  const fetchProblems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${PULSE_API_URL}/pulse/problems`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      // Only show new problems (not approved/rejected)
      setProblems((data.problems || []).filter(p => p.status === 'new'));
    } catch (err) {
      console.error('Error fetching problems:', err);
    }
    setLoading(false);
  };

  const handleAction = async (problem, action) => {
    setActionLoading(problem.id);
    setMessage('');

    try {
      const res = await fetch(`${PULSE_API_URL}/pulse/problems/${action}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: problem.id })
      });
      const data = await res.json();

      if (data.success) {
        setMessage(action === 'approve' ? '✓ Added to Foundry backlog!' : 'Rejected');
        // Remove from list
        setProblems(prev => prev.filter(p => p.id !== problem.id));
      } else {
        setMessage(data.error || 'Action failed');
      }
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
    setActionLoading(null);
  };

  const getSourceLabel = (source) => {
    if (source.startsWith('reddit_')) return 'r/' + source.replace('reddit_', '');
    if (source === 'hn_ask') return 'Ask HN';
    if (source === 'hn_comment') return 'HN Comment';
    return source;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-xl border border-amber-500/30">
        <div>
          <h3 className="font-bold text-white flex items-center gap-2">
            <span>💡</span> Problems to Solve
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Approve to add to Foundry backlog for next nightly build
          </p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-amber-400">{problems.length}</div>
          <div className="text-xs text-gray-400">Pending</div>
        </div>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm">
          {message}
        </div>
      )}

      {/* Problems List */}
      <div className="space-y-3">
        {problems.map((problem) => (
          <div
            key={problem.id}
            className="p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-amber-500/30 transition"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                {/* Score and Source */}
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-sm font-bold px-2 py-0.5 rounded ${
                    problem.score >= 70 ? 'bg-amber-500/20 text-amber-400' :
                    problem.score >= 50 ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-600/20 text-gray-400'
                  }`}>
                    {problem.score}
                  </span>
                  <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded">
                    {getSourceLabel(problem.source)}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-white font-medium mb-2">
                  {problem.title}
                </h4>

                {/* Body preview */}
                {problem.body && (
                  <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                    {problem.body}
                  </p>
                )}

                {/* Signals */}
                {problem.signals && problem.signals.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {problem.signals.slice(0, 4).map((signal, i) => (
                      <span key={i} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
                        {signal}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAction(problem, 'approve')}
                    disabled={actionLoading === problem.id}
                    className="flex items-center gap-1 px-3 py-1.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg text-sm font-medium hover:bg-green-500/30 transition disabled:opacity-50"
                  >
                    {actionLoading === problem.id ? '...' : '✓ Add to Backlog'}
                  </button>
                  <button
                    onClick={() => handleAction(problem, 'reject')}
                    disabled={actionLoading === problem.id}
                    className="px-3 py-1.5 text-gray-400 hover:text-gray-300 text-sm transition"
                  >
                    Skip
                  </button>
                  <a
                    href={problem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-xs text-gray-500 hover:text-white transition"
                  >
                    View Source →
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {problems.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">🔍</div>
          <p>No new problems found.</p>
          <p className="text-sm mt-2">Problem Scout runs every 4 hours.</p>
        </div>
      )}
    </div>
  );
}

function IntelTab({ data }) {
  if (!data) return <div className="text-gray-500">No intel data</div>;

  const { by_company, total_count, summaries } = data;
  const [showRaw, setShowRaw] = useState(false);

  const companies = Object.keys(by_company || {}).sort((a, b) => {
    // Vuori first, then by count
    if (a === 'Vuori') return -1;
    if (b === 'Vuori') return 1;
    return (by_company[b]?.length || 0) - (by_company[a]?.length || 0);
  });

  const latestSummary = summaries && summaries.length > 0 ? summaries[0] : null;

  return (
    <div>
      {/* Summary Stats */}
      <div className="flex items-center gap-6 mb-6 p-4 bg-gray-800/50 rounded-xl">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-400">{companies.length}</div>
          <div className="text-xs text-gray-400">Companies</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-white">{total_count || 0}</div>
          <div className="text-xs text-gray-400">Articles</div>
        </div>
        {summaries && summaries.length > 0 && (
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">{summaries.length}</div>
            <div className="text-xs text-gray-400">Digests</div>
          </div>
        )}
      </div>

      {/* Latest Summary */}
      {latestSummary && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-500/30">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>📊</span> Latest Intel Digest
            </h3>
            <span className="text-xs text-gray-400">{latestSummary.date}</span>
          </div>
          <div className="text-sm text-gray-300 whitespace-pre-wrap max-h-64 overflow-y-auto">
            {latestSummary.analysis}
          </div>
          <div className="mt-3 text-xs text-gray-500">
            Analyzed {latestSummary.article_count} articles from {latestSummary.companies?.length || 0} companies
          </div>
        </div>
      )}

      {/* Toggle for raw articles */}
      <button
        onClick={() => setShowRaw(!showRaw)}
        className="mb-4 text-sm text-gray-400 hover:text-white flex items-center gap-2"
      >
        {showRaw ? '▼' : '▶'} {showRaw ? 'Hide' : 'Show'} Raw Articles ({total_count})
      </button>

      {/* Companies (Raw Articles) */}
      {showRaw && (
        <div className="space-y-4">
          {companies.map((company) => (
            <CompanyIntel
              key={company}
              company={company}
              articles={by_company[company] || []}
              isVuori={company === 'Vuori'}
            />
          ))}
        </div>
      )}

      {!latestSummary && companies.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No competitor intel yet. Run the summarizer to generate digests.
        </div>
      )}
    </div>
  );
}

function CompanyIntel({ company, articles, isVuori }) {
  const [expanded, setExpanded] = useState(isVuori);

  return (
    <div className={`rounded-xl border ${isVuori ? 'border-blue-500/50 bg-blue-500/10' : 'border-gray-700 bg-gray-800/50'}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4"
      >
        <div className="flex items-center gap-3">
          <span className="font-semibold text-white">{company}</span>
          {isVuori && <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">Your Employer</span>}
          <span className="text-sm text-gray-500">{articles.length} articles</span>
        </div>
        <span className="text-gray-400">{expanded ? '▼' : '▶'}</span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-2">
          {articles.slice(-5).reverse().map((article, idx) => (
            <a
              key={idx}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900 transition"
            >
              <div className="text-sm text-white line-clamp-2 mb-1">
                {article.title}
              </div>
              <div className="text-xs text-gray-500">
                {article.date ? new Date(article.date).toLocaleDateString() : 'Recent'}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommandCenter;
