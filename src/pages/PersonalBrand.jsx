import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_FORGE_WEBHOOK_URL || 'https://api.yadkindatapartners.com';

function PersonalBrand() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [token, setToken] = useState(null);

  const [items, setItems] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('pending_review');
  const [actionLoading, setActionLoading] = useState({});
  const [expandedId, setExpandedId] = useState(null);

  // Check saved token on mount
  useEffect(() => {
    const saved = localStorage.getItem('pulse_token');
    if (saved) verifyToken(saved);
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchQueue();
      fetchStats();
    }
  }, [isAuthenticated, token, filter]);

  const verifyToken = async (saved) => {
    try {
      const res = await fetch(`${API_URL}/pulse/verify`, {
        headers: { 'Authorization': `Bearer ${saved}` }
      });
      if (res.ok) {
        setToken(saved);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('pulse_token');
      }
    } catch {
      localStorage.removeItem('pulse_token');
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      const res = await fetch(`${API_URL}/pulse/auth`, {
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
    } catch {
      setAuthError('Connection failed');
    }
    setAuthLoading(false);
  };

  const fetchQueue = async () => {
    setLoading(true);
    try {
      const url = filter
        ? `${API_URL}/personal-brand/queue?status=${filter}`
        : `${API_URL}/personal-brand/queue`;
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.status === 401) {
        setIsAuthenticated(false);
        localStorage.removeItem('pulse_token');
        return;
      }
      const data = await res.json();
      setItems(data.items || []);
    } catch {
      setItems([]);
    }
    setLoading(false);
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/personal-brand/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
      }
    } catch {}
  };

  const handleApprove = async (id) => {
    setActionLoading(prev => ({ ...prev, [id]: 'approve' }));
    try {
      const res = await fetch(`${API_URL}/personal-brand/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        fetchQueue();
        fetchStats();
      }
    } catch {}
    setActionLoading(prev => ({ ...prev, [id]: null }));
  };

  const handleReject = async (id) => {
    setActionLoading(prev => ({ ...prev, [id]: 'reject' }));
    try {
      const res = await fetch(`${API_URL}/personal-brand/reject`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        fetchQueue();
        fetchStats();
      }
    } catch {}
    setActionLoading(prev => ({ ...prev, [id]: null }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-full max-w-sm mx-4">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">CB</div>
            <h1 className="text-2xl font-bold text-white mb-1">Content Review</h1>
            <p className="text-gray-500 text-sm">Personal Brand Agent</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              autoFocus
            />
            {authError && (
              <p className="text-red-400 text-sm text-center">{authError}</p>
            )}
            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {authLoading ? 'Verifying...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Content Review</h1>
            <p className="text-sm text-gray-500">Personal Brand Agent</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => { fetchQueue(); fetchStats(); }}
              className="text-sm text-gray-400 hover:text-white transition"
            >
              Refresh
            </button>
            <a href="/" className="text-sm text-gray-400 hover:text-white transition">
              Home
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Stats bar */}
        {stats && (
          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatCard label="Pending" value={stats.pending_review} color="yellow" />
            <StatCard label="Approved" value={stats.approved} color="blue" />
            <StatCard label="Published" value={stats.published} color="green" />
            <StatCard label="Rejected" value={stats.rejected} color="red" />
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {['pending_review', 'approved', 'rejected', ''].map(f => (
            <button
              key={f || 'all'}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {f === '' ? 'All' : f === 'pending_review' ? 'Pending' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Content items */}
        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-center text-gray-600 py-12">
            <p className="text-lg mb-2">No items</p>
            <p className="text-sm">Content will appear here after the agent generates drafts.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map(item => (
              <ContentCard
                key={item.id}
                item={item}
                expanded={expandedId === item.id}
                onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
                onApprove={() => handleApprove(item.id)}
                onReject={() => handleReject(item.id)}
                actionLoading={actionLoading[item.id]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


function StatCard({ label, value, color }) {
  const colors = {
    yellow: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    green: 'text-green-400 bg-green-500/10 border-green-500/30',
    red: 'text-red-400 bg-red-500/10 border-red-500/30',
  };

  return (
    <div className={`rounded-xl border p-4 ${colors[color]}`}>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs opacity-70">{label}</div>
    </div>
  );
}


function ContentCard({ item, expanded, onToggle, onApprove, onReject, actionLoading }) {
  const isPending = item.status === 'pending_review';
  const isApproved = item.status === 'approved';
  const isRejected = item.status === 'rejected';

  const statusColors = {
    pending_review: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    approved: 'bg-green-500/20 text-green-400 border-green-500/30',
    rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
    published: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  const scoreColor = item.critic_score >= 8
    ? 'text-green-400'
    : item.critic_score >= 6
    ? 'text-yellow-400'
    : 'text-red-400';

  const createdAt = item.created_at
    ? new Date(item.created_at).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
      })
    : '';

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      {/* Card header */}
      <div
        className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-800/50 transition"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className={`text-sm font-mono font-bold ${scoreColor}`}>
            {item.critic_score}/10
          </span>
          <span className={`text-xs px-2 py-0.5 rounded border ${statusColors[item.status] || ''}`}>
            {item.status === 'pending_review' ? 'Pending' : item.status}
          </span>
          <span className="text-xs text-gray-500 uppercase">{item.platform}</span>
          <span className="text-sm text-gray-300 truncate">{item.topic || item.pillar}</span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs text-gray-600">{createdAt}</span>
          <span className="text-gray-600 text-sm">{expanded ? '\u25B2' : '\u25BC'}</span>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-gray-800">
          {/* Content preview */}
          <div className="px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium text-gray-500 uppercase">
                {item.platform} - {item.content_type || 'post'}
              </span>
              <span className="text-xs text-gray-600">|</span>
              <span className="text-xs text-gray-500">{item.pillar}</span>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <pre className="text-sm text-gray-200 whitespace-pre-wrap font-sans leading-relaxed">
                {item.content}
              </pre>
              {item.hashtags && item.hashtags.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <span className="text-xs text-blue-400">
                    {item.hashtags.join(' ')}
                  </span>
                </div>
              )}
            </div>

            {/* Critic review */}
            <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-gray-400 uppercase">Critic Review</span>
                <span className={`text-sm font-bold ${scoreColor}`}>{item.critic_score}/10</span>
              </div>
              {item.critic_critique && (
                <p className="text-sm text-gray-400 mb-3">{item.critic_critique}</p>
              )}
              {item.critic_issues && item.critic_issues.length > 0 && (
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">Issues:</span>
                  <ul className="mt-1 space-y-1">
                    {item.critic_issues.map((issue, i) => (
                      <li key={i} className="text-xs text-red-400/80 flex items-start gap-2">
                        <span className="mt-0.5 flex-shrink-0">-</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Image request */}
            {item.needs_image && item.image_description && (
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 mb-4">
                <span className="text-xs font-medium text-purple-400 uppercase">Image Suggested</span>
                <p className="text-sm text-purple-300 mt-1">{item.image_description}</p>
              </div>
            )}

            {/* Post URL if published */}
            {item.post_url && (
              <div className="mb-4">
                <a
                  href={item.post_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:underline"
                >
                  View published post
                </a>
              </div>
            )}
          </div>

          {/* Action buttons */}
          {isPending && (
            <div className="px-5 py-3 border-t border-gray-800 flex gap-3 bg-gray-900/50">
              <button
                onClick={onApprove}
                disabled={!!actionLoading}
                className="flex-1 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50 text-sm"
              >
                {actionLoading === 'approve' ? 'Approving...' : 'Approve'}
              </button>
              <button
                onClick={onReject}
                disabled={!!actionLoading}
                className="flex-1 py-2.5 bg-red-600/20 text-red-400 font-semibold rounded-lg hover:bg-red-600/30 border border-red-600/30 transition disabled:opacity-50 text-sm"
              >
                {actionLoading === 'reject' ? 'Rejecting...' : 'Reject'}
              </button>
            </div>
          )}

          {isApproved && (
            <div className="px-5 py-3 border-t border-gray-800 bg-gray-900/50">
              <span className="text-sm text-green-400">
                Approved {item.approved_at ? `on ${new Date(item.approved_at).toLocaleDateString()}` : ''}
                - will be published by the next publisher run
              </span>
            </div>
          )}

          {isRejected && (
            <div className="px-5 py-3 border-t border-gray-800 bg-gray-900/50">
              <span className="text-sm text-red-400">
                Rejected{item.rejection_reason ? `: ${item.rejection_reason}` : ''}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PersonalBrand;
