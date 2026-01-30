import React from 'react';

function AgentFleetPage({ isOpen, onClose }) {
  if (!isOpen) return null;

  const agents = [
    {
      name: 'Problem Scout',
      icon: '🔍',
      schedule: 'Every 4 hours',
      color: 'amber',
      description: 'Scans HN and Reddit for problems worth solving. Detects pain points, frustrations, and feature gaps.',
      sources: ['HN Ask', 'HN Comments', 'r/ProductManagement', 'r/analytics', 'r/guitar', 'r/selfhosted', 'r/webscraping'],
      outputs: ['Scored problems', 'Backlog candidates']
    },
    {
      name: 'Foundry',
      icon: '🏭',
      schedule: 'Nightly at 2 AM',
      color: 'purple',
      description: 'Autonomous product builder. Takes ideas from the backlog and builds complete, functional products overnight.',
      capabilities: ['Ideation', 'Validation', 'Design', 'Build', 'Test', 'Deploy'],
      outputs: ['Working products', 'GitHub repos', 'Vercel deployments']
    },
    {
      name: 'Forge',
      icon: '🔥',
      schedule: 'On-demand',
      color: 'orange',
      description: 'Productizes Foundry builds into launch-ready products with branding, marketing, and GTM strategy.',
      capabilities: ['Brand identity', 'Landing pages', 'Launch kit', 'PH prep'],
      outputs: ['Launch-ready products', 'Marketing assets']
    },
    {
      name: 'Competitive Intel',
      icon: '🕵️',
      schedule: 'Every 4 hours + Daily digest',
      color: 'blue',
      description: 'Monitors competitor news and generates daily intelligence summaries using Claude analysis.',
      targets: ['Vuori', 'Lululemon', 'Alo Yoga', 'Gymshark', 'Fabletics', 'Rhone'],
      outputs: ['News tracking', 'AI-powered digests', 'Threat alerts']
    },
    {
      name: 'DevOps Monitor',
      icon: '🩺',
      schedule: 'Every 5 minutes',
      color: 'green',
      description: 'Monitors all Vercel projects and Raspberry Pi health. Sends alerts when issues detected.',
      monitors: ['9 Vercel projects', 'Pi CPU/Memory/Temp', 'Disk usage', 'Uptime'],
      outputs: ['Health status', 'Instant alerts', 'Daily digest']
    },
    {
      name: 'YDP Pulse',
      icon: '💓',
      schedule: 'Always on',
      color: 'pink',
      description: 'Central command center. View all agent data, approve problems for backlog, monitor system health.',
      features: ['Unified dashboard', 'Problem approval', 'Intel briefings', 'System health'],
      outputs: ['Command & control interface']
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/90" onClick={onClose} />

      {/* Content */}
      <div className="relative min-h-screen py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="fixed top-4 right-4 text-gray-400 hover:text-white text-3xl z-50"
          >
            &times;
          </button>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 px-4 py-2 rounded-full text-purple-300 text-sm mb-4">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
              Autonomous AI System
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">The Agent Fleet</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A network of AI agents running 24/7 on a Raspberry Pi, autonomously finding problems,
              building solutions, and monitoring everything.
            </p>
          </div>

          {/* Architecture Diagram */}
          <div className="bg-gray-900/80 rounded-2xl border border-gray-700 p-8 mb-12">
            <h2 className="text-xl font-bold text-white mb-6 text-center">How It Works</h2>

            {/* Pipeline visualization */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
              <div className="flex flex-col items-center p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                <span className="text-3xl mb-2">🔍</span>
                <span className="text-amber-400 font-medium">Problem Scout</span>
                <span className="text-xs text-gray-500">finds problems</span>
              </div>

              <div className="text-gray-600 text-2xl">→</div>

              <div className="flex flex-col items-center p-4 bg-pink-500/10 border border-pink-500/30 rounded-xl">
                <span className="text-3xl mb-2">💓</span>
                <span className="text-pink-400 font-medium">YDP Pulse</span>
                <span className="text-xs text-gray-500">you approve</span>
              </div>

              <div className="text-gray-600 text-2xl">→</div>

              <div className="flex flex-col items-center p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                <span className="text-3xl mb-2">🏭</span>
                <span className="text-purple-400 font-medium">Foundry</span>
                <span className="text-xs text-gray-500">builds overnight</span>
              </div>

              <div className="text-gray-600 text-2xl">→</div>

              <div className="flex flex-col items-center p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                <span className="text-3xl mb-2">🔥</span>
                <span className="text-orange-400 font-medium">Forge</span>
                <span className="text-xs text-gray-500">productizes</span>
              </div>
            </div>

            {/* Supporting agents */}
            <div className="flex justify-center gap-8 pt-4 border-t border-gray-800">
              <div className="text-center">
                <span className="text-2xl">🕵️</span>
                <div className="text-xs text-gray-500 mt-1">Intel Agent</div>
              </div>
              <div className="text-center">
                <span className="text-2xl">🩺</span>
                <div className="text-xs text-gray-500 mt-1">DevOps Monitor</div>
              </div>
              <div className="text-center">
                <span className="text-2xl">🍓</span>
                <div className="text-xs text-gray-500 mt-1">Raspberry Pi 4B</div>
              </div>
            </div>
          </div>

          {/* Agent Cards */}
          <h2 className="text-2xl font-bold text-white mb-6">The Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {agents.map((agent) => (
              <div
                key={agent.name}
                className={`bg-gray-900/80 rounded-xl border border-gray-700 p-6 hover:border-${agent.color}-500/50 transition`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{agent.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-white">{agent.name}</h3>
                      <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                        {agent.schedule}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">{agent.description}</p>

                    {agent.sources && (
                      <div className="mb-3">
                        <div className="text-xs text-gray-500 mb-1">Sources:</div>
                        <div className="flex flex-wrap gap-1">
                          {agent.sources.map((s, i) => (
                            <span key={i} className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {agent.capabilities && (
                      <div className="mb-3">
                        <div className="text-xs text-gray-500 mb-1">Capabilities:</div>
                        <div className="flex flex-wrap gap-1">
                          {agent.capabilities.map((c, i) => (
                            <span key={i} className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {agent.targets && (
                      <div className="mb-3">
                        <div className="text-xs text-gray-500 mb-1">Monitors:</div>
                        <div className="flex flex-wrap gap-1">
                          {agent.targets.map((t, i) => (
                            <span key={i} className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {agent.monitors && (
                      <div className="mb-3">
                        <div className="text-xs text-gray-500 mb-1">Monitors:</div>
                        <div className="flex flex-wrap gap-1">
                          {agent.monitors.map((m, i) => (
                            <span key={i} className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded">
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {agent.features && (
                      <div className="mb-3">
                        <div className="text-xs text-gray-500 mb-1">Features:</div>
                        <div className="flex flex-wrap gap-1">
                          {agent.features.map((f, i) => (
                            <span key={i} className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="text-xs text-gray-500">
                      Outputs: {agent.outputs.join(' • ')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Infrastructure */}
          <div className="bg-gray-900/80 rounded-2xl border border-gray-700 p-8 mb-12">
            <h2 className="text-xl font-bold text-white mb-6">Infrastructure</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🍓</div>
                <div className="font-medium text-white">Raspberry Pi 4B</div>
                <div className="text-xs text-gray-500">8GB RAM • Always on</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">☁️</div>
                <div className="font-medium text-white">Cloudflare Tunnel</div>
                <div className="text-xs text-gray-500">Secure remote access</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">▲</div>
                <div className="font-medium text-white">Vercel</div>
                <div className="text-xs text-gray-500">Hosting & deploys</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🤖</div>
                <div className="font-medium text-white">Claude</div>
                <div className="text-xs text-gray-500">AI analysis & builds</div>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="bg-gray-900/80 rounded-2xl border border-gray-700 p-8 mb-12">
            <h2 className="text-xl font-bold text-white mb-6">Built With</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {['Python', 'Flask', 'React', 'Tailwind CSS', 'Claude API', 'Claude Code SDK', 'systemd', 'cron', 'GitHub Actions', 'Vercel API', 'ntfy.sh'].map((tech) => (
                <span key={tech} className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Philosophy */}
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl border border-purple-500/30 p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-4">The Philosophy</h2>
            <blockquote className="text-lg text-gray-300 italic mb-4">
              "Build systems that build systems. Let AI handle the repetitive work while you focus on
              what matters—making decisions, providing direction, and shipping products."
            </blockquote>
            <p className="text-gray-500 text-sm">
              This agent fleet runs autonomously 24/7, finding opportunities, building products,
              and monitoring everything. Human involvement is only needed for high-level decisions.
            </p>
          </div>

          {/* Back button */}
          <div className="text-center mt-12">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
            >
              ← Back to Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentFleetPage;
