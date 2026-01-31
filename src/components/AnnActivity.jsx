import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_FORGE_WEBHOOK_URL || 'https://api.yadkindatapartners.com';

function AnnActivity() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    const fetchAnn = async () => {
      try {
        const res = await fetch(`${API_URL}/pulse/ann?posts=5&comments=5`);
        const json = await res.json();
        if (json.available) {
          setData(json);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      }
    };

    fetchAnn();
    // Refresh every 5 minutes
    const interval = setInterval(fetchAnn, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  const typeIcon = (type) => {
    const icons = {
      build: '🚀',
      reflection: '💭',
      philosophy: '📖',
      encouragement: '💪',
      status: '📊',
      weekly_reflection: '🌅',
    };
    return icons[type] || '📝';
  };

  if (error) {
    return (
      <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🎵</span>
          <div>
            <h3 className="font-bold text-white">YDP-Ann</h3>
            <p className="text-sm text-gray-400">Offline</p>
          </div>
        </div>
        <p className="text-gray-500 text-sm">Ann is currently unavailable. Check back soon.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700 animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🎵</span>
          <div>
            <h3 className="font-bold text-white">YDP-Ann</h3>
            <p className="text-sm text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Safely extract data with defaults
  const posts = data.recent_posts || [];
  const comments = data.recent_comments || [];
  const stats = data.stats || {};
  const buildsAnnounced = data.builds_announced || 0;

  return (
    <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 backdrop-blur rounded-xl border border-purple-500/30 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-purple-500/20">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🎵</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-lg">YDP-Ann</h3>
                {data.verified && (
                  <span className="bg-green-500 text-black text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">✓</span>
                )}
                <a
                  href={data.profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 text-xs"
                >
                  @Moltbook
                </a>
              </div>
              <p className="text-sm text-purple-300/70">{data.personality}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-xs text-green-400">Live</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mt-4">
          <div className="text-center">
            <div className="text-xl font-bold text-purple-300">{buildsAnnounced}</div>
            <div className="text-[10px] text-gray-400 uppercase">Builds</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-300">{stats.total_posts || 0}</div>
            <div className="text-[10px] text-gray-400 uppercase">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-300">{stats.total_comments || 0}</div>
            <div className="text-[10px] text-gray-400 uppercase">Comments</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-300">{stats.upvotes_given || 0}</div>
            <div className="text-[10px] text-gray-400 uppercase">Upvotes</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-purple-500/20">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            activeTab === 'posts'
              ? 'text-purple-300 bg-purple-500/10 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Posts ({posts.length})
        </button>
        <button
          onClick={() => setActiveTab('comments')}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            activeTab === 'comments'
              ? 'text-purple-300 bg-purple-500/10 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Comments ({comments.length})
        </button>
      </div>

      {/* Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {activeTab === 'posts' && (
          <div className="space-y-3">
            {posts.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No posts yet...</p>
            ) : (
              posts.map((post, i) => (
                <div key={i} className="bg-gray-800/50 rounded-lg p-3 border-l-2 border-purple-500/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span>{typeIcon(post.type)}</span>
                      <span className="font-medium text-white text-sm truncate max-w-[200px]">
                        {post.title}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{timeAgo(post.posted_at)}</span>
                  </div>
                  <p className="text-gray-300 text-xs line-clamp-3 whitespace-pre-wrap">
                    {post.content}
                  </p>
                  {post.url && (
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 text-xs mt-2 inline-block"
                    >
                      View on Moltbook →
                    </a>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="space-y-3">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No comments yet...</p>
            ) : (
              comments.map((comment, i) => (
                <div key={i} className="bg-gray-800/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400 italic truncate max-w-[250px]">
                      Re: "{comment.post_title}" by {comment.post_author}
                    </span>
                    <span className="text-xs text-gray-500">{timeAgo(comment.posted_at)}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{comment.content}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-purple-500/20 flex items-center justify-between text-xs text-gray-500">
        <span>Last active: {data.last_post ? timeAgo(data.last_post) : 'Unknown'}</span>
        <a
          href={data.profile_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300"
        >
          Follow on Moltbook →
        </a>
      </div>
    </div>
  );
}

export default AnnActivity;
