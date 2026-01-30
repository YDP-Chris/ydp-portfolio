import React, { useState, useEffect } from 'react';

// Pulse API URL - reuse the Forge webhook URL
const PULSE_API_URL = import.meta.env.VITE_FORGE_WEBHOOK_URL || 'https://web-notification-intimate-carlo.trycloudflare.com';

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

function Dashboard({ activeTab, setActiveTab, data, loading, error, onRefresh }) {
  const tabs = [
    { id: 'devops', label: 'DevOps', icon: '🩺' },
    { id: 'opportunities', label: 'Opportunities', icon: '🎯' },
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
          {activeTab === 'opportunities' && <OpportunitiesTab data={data.opportunities} />}
          {activeTab === 'intel' && <IntelTab data={data.intel} />}
        </>
      )}
    </div>
  );
}

function DevOpsTab({ data }) {
  if (!data) return <div className="text-gray-500">No DevOps data</div>;

  const { projects, healthy_count, total_count, last_check } = data;

  return (
    <div>
      {/* Summary */}
      <div className="flex items-center gap-6 mb-6 p-4 bg-gray-800/50 rounded-xl">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-400">{healthy_count || 0}</div>
          <div className="text-xs text-gray-400">Healthy</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-white">{total_count || 0}</div>
          <div className="text-xs text-gray-400">Total</div>
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

      {/* Projects */}
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

function OpportunitiesTab({ data }) {
  if (!data) return <div className="text-gray-500">No opportunity data</div>;

  const { top, total_count, high_count } = data;

  return (
    <div>
      {/* Summary */}
      <div className="flex items-center gap-6 mb-6 p-4 bg-gray-800/50 rounded-xl">
        <div className="text-center">
          <div className="text-3xl font-bold text-amber-400">{high_count || 0}</div>
          <div className="text-xs text-gray-400">High Priority</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-white">{total_count || 0}</div>
          <div className="text-xs text-gray-400">Total Scored</div>
        </div>
      </div>

      {/* Opportunities */}
      <div className="space-y-3">
        {(top || []).map((opp, idx) => (
          <a
            key={idx}
            href={opp.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-amber-500/50 hover:bg-gray-800 transition cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-sm font-bold px-2 py-0.5 rounded ${
                    opp.score >= 85 ? 'bg-amber-500/20 text-amber-400' :
                    opp.score >= 70 ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-600/20 text-gray-400'
                  }`}>
                    {opp.score}
                  </span>
                  <span className="text-xs text-gray-500">{opp.source}</span>
                </div>
                <h4 className="text-white font-medium mb-2 line-clamp-2">
                  {opp.title}
                </h4>
                {opp.matches && opp.matches.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {opp.matches.slice(0, 3).map((match, i) => (
                      <span key={i} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
                        {match}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-amber-400 hover:text-amber-300 text-lg font-bold">
                Open →
              </span>
            </div>
          </a>
        ))}
      </div>

      {(!top || top.length === 0) && (
        <div className="text-center py-8 text-gray-500">
          No opportunities found yet.
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
