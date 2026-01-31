import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import TechStack from './components/TechStack';
import ContactForm from './components/ContactForm';
import CommandCenter from './components/CommandCenter';
import PiStatusBar from './components/PiStatusBar';
import AnnActivity from './components/AnnActivity';
import { projects, techCategories, companyInfo, agentBuilds, agents } from './data/projects';

// Forge webhook URL - Cloudflare tunnel for public access
const FORGE_WEBHOOK_URL = import.meta.env.VITE_FORGE_WEBHOOK_URL || 'https://api.yadkindatapartners.com';

function App() {
  const [pendingForge, setPendingForge] = useState(null);
  const [forgeLoading, setForgeLoading] = useState(false);
  const [forgeMessage, setForgeMessage] = useState('');
  const [showCommandCenter, setShowCommandCenter] = useState(false);

  // Check for pending Forge jobs
  useEffect(() => {
    const checkPending = async () => {
      try {
        const res = await fetch(`${FORGE_WEBHOOK_URL}/forge/status`);
        const data = await res.json();
        if (data.pending) {
          setPendingForge(data);
        }
      } catch (err) {
        // Webhook not available - that's OK
        console.log('Forge webhook not available');
      }
    };
    checkPending();
    // Check every 30 seconds
    const interval = setInterval(checkPending, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleForgeAction = async (action) => {
    setForgeLoading(true);
    setForgeMessage('');
    try {
      const res = await fetch(`${FORGE_WEBHOOK_URL}/forge/${action}`, { method: 'POST' });
      const data = await res.json();
      setForgeMessage(data.message);
      if (data.success) {
        setPendingForge(null);
      }
    } catch (err) {
      setForgeMessage('Error connecting to Forge server');
    }
    setForgeLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Portfolio</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A selection of products and platforms built to solve real-world problems
              across diverse industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Agent Created Builds Section */}
      {agentBuilds.length > 0 && (
        <section id="agent-builds" className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                Autonomous Development
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Agent Created Builds</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Products built autonomously by our Foundry and Forge AI agents during nightly build cycles.
              </p>
            </div>

            {/* Pending Forge Approval Banner */}
            {pendingForge && (
              <div className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🔥</span>
                    <div>
                      <h3 className="font-bold text-gray-900">New Build Ready for Forge</h3>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">{pendingForge.product_name}</span> is waiting for productization
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {forgeMessage && (
                      <span className="text-sm text-gray-600">{forgeMessage}</span>
                    )}
                    <button
                      onClick={() => handleForgeAction('approve')}
                      disabled={forgeLoading}
                      className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 transition-all disabled:opacity-50 shadow-md"
                    >
                      {forgeLoading ? 'Processing...' : '✓ Send to Forge'}
                    </button>
                    <button
                      onClick={() => handleForgeAction('skip')}
                      disabled={forgeLoading}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-all disabled:opacity-50"
                    >
                      Skip
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {agentBuilds.map((build) => (
                <div key={build.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{build.image}</span>
                      <div>
                        <h3 className="font-bold text-gray-900">{build.title}</h3>
                        <p className="text-sm text-gray-500">{build.category}</p>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                      {build.status}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{build.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {build.techStack.map((tech, idx) => (
                      <span key={idx} className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium text-purple-600">{build.builtBy}</span>
                      <span className="mx-2">·</span>
                      <span>{build.builtOn}</span>
                    </div>
                    {build.url && (
                      <a
                        href={build.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm font-medium"
                      >
                        View Live →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Agents Section */}
      <section id="agents" className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-green-500/30">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Autonomous Systems
            </div>
            <h2 className="text-3xl font-bold mb-4">Agent Fleet</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              A network of AI agents running 24/7 on a Raspberry Pi, autonomously finding problems,
              building solutions, and monitoring everything.
            </p>
          </div>

          {/* How It Works - Pipeline */}
          <div className="bg-gray-800/50 rounded-2xl border border-gray-700 p-6 mb-12">
            <h3 className="text-lg font-bold text-center mb-6 text-gray-300">How It Works</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4">
              <div className="flex flex-col items-center p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl min-w-[100px]">
                <span className="text-2xl mb-1">🔍</span>
                <span className="text-amber-400 font-medium text-sm">Problem Scout</span>
                <span className="text-[10px] text-gray-500">finds problems</span>
              </div>
              <div className="text-gray-600 text-xl md:rotate-0 rotate-90">→</div>
              <div className="flex flex-col items-center p-3 bg-pink-500/10 border border-pink-500/30 rounded-xl min-w-[100px]">
                <span className="text-2xl mb-1">💓</span>
                <span className="text-pink-400 font-medium text-sm">YDP Pulse</span>
                <span className="text-[10px] text-gray-500">you approve</span>
              </div>
              <div className="text-gray-600 text-xl md:rotate-0 rotate-90">→</div>
              <div className="flex flex-col items-center p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl min-w-[100px]">
                <span className="text-2xl mb-1">🏭</span>
                <span className="text-purple-400 font-medium text-sm">Foundry</span>
                <span className="text-[10px] text-gray-500">builds overnight</span>
              </div>
              <div className="text-gray-600 text-xl md:rotate-0 rotate-90">→</div>
              <div className="flex flex-col items-center p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl min-w-[100px]">
                <span className="text-2xl mb-1">🔥</span>
                <span className="text-orange-400 font-medium text-sm">Forge</span>
                <span className="text-[10px] text-gray-500">productizes</span>
              </div>
            </div>
            <p className="text-center text-gray-500 text-sm mt-6">
              Supporting agents monitor competitors, track system health, and surface intelligence.
            </p>
          </div>

          {/* Ann Activity Feed */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🎵</span>
              <h3 className="text-lg font-bold text-gray-300">Live from Moltbook</h3>
              <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-0.5 rounded-full">Social Agent</span>
            </div>
            <AnnActivity />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => {
              const isPulse = agent.id === 'ydp-pulse';
              return (
                <div
                  key={agent.id}
                  onClick={isPulse ? () => setShowCommandCenter(true) : undefined}
                  className={`bg-gray-800/50 backdrop-blur rounded-xl p-6 border transition-all hover:transform hover:scale-[1.02] ${
                    isPulse
                      ? 'border-pink-500/50 hover:border-pink-400 cursor-pointer ring-2 ring-pink-500/20 hover:ring-pink-500/40'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`text-3xl ${isPulse ? 'animate-pulse' : ''}`}>{agent.icon}</span>
                      <div>
                        <h3 className="font-bold text-white">{agent.name}</h3>
                        <p className="text-sm text-gray-400">{agent.tagline}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isPulse && (
                        <span className="text-xs font-medium px-2 py-1 rounded bg-pink-500/20 text-pink-400 border border-pink-500/30">
                          Click to Open
                        </span>
                      )}
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        agent.status === 'active'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-gray-600/20 text-gray-400'
                      }`}>
                        {agent.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{agent.description}</p>

                  <div className="mb-4">
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Capabilities</div>
                    <div className="flex flex-wrap gap-1">
                      {agent.capabilities.slice(0, 3).map((cap, idx) => (
                        <span key={idx} className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded">
                          {cap}
                        </span>
                      ))}
                      {agent.capabilities.length > 3 && (
                        <span className="text-xs bg-gray-700/50 text-gray-400 px-2 py-1 rounded">
                          +{agent.capabilities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-700 flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      <span className="text-gray-400">{agent.schedule}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {agent.poweredBy}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-4 bg-gray-800/50 rounded-xl px-6 py-4 border border-gray-700">
              <div className="text-left">
                <div className="text-2xl font-bold text-white">{agents.length}</div>
                <div className="text-xs text-gray-400">Active Agents</div>
              </div>
              <div className="w-px h-10 bg-gray-700"></div>
              <div className="text-left">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-xs text-gray-400">Monitoring</div>
              </div>
              <div className="w-px h-10 bg-gray-700"></div>
              <div className="text-left">
                <div className="text-2xl font-bold text-white">1/night</div>
                <div className="text-xs text-gray-400">Products Built</div>
              </div>
            </div>
          </div>

          {/* Infrastructure */}
          <div className="mt-12 pt-12 border-t border-gray-700">
            <h3 className="text-lg font-bold text-center mb-8 text-gray-300">Infrastructure</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl mb-2">🍓</div>
                <div className="font-medium text-white text-sm">Raspberry Pi 4B</div>
                <div className="text-xs text-gray-500">8GB • Always on</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">☁️</div>
                <div className="font-medium text-white text-sm">Cloudflare</div>
                <div className="text-xs text-gray-500">Tunnels & DNS</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">▲</div>
                <div className="font-medium text-white text-sm">Vercel</div>
                <div className="text-xs text-gray-500">Hosting & CI/CD</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <div className="font-medium text-white text-sm">Supabase</div>
                <div className="text-xs text-gray-500">Database & Auth</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🤖</div>
                <div className="font-medium text-white text-sm">Claude</div>
                <div className="text-xs text-gray-500">AI analysis & builds</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <TechStack categories={techCategories} />

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About YDP</h2>
            <p className="text-lg text-gray-600 mb-8">
              {companyInfo.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Core Capabilities</h3>
              <ul className="space-y-3">
                {companyInfo.capabilities.map((capability, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{capability}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Leadership</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{companyInfo.founder.name}</h4>
                    <p className="text-gray-600">{companyInfo.founder.title}</p>
                    <p className="text-sm text-gray-500">{companyInfo.founder.location}</p>
                  </div>
                  {companyInfo.founder.experience && (
                    <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                      {companyInfo.founder.experience}
                    </span>
                  )}
                </div>
                {companyInfo.founder.background && (
                  <p className="text-sm text-gray-600 mb-3">{companyInfo.founder.background}</p>
                )}
                {companyInfo.founder.skills && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {companyInfo.founder.skills.map((skill, idx) => (
                      <span key={idx} className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                {companyInfo.founder.linkedin && (
                  <a
                    href={companyInfo.founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactForm />

      {/* Footer - extra pb for Pi status bar */}
      <footer className="bg-gray-900 text-white py-8 pb-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 {companyInfo.name}. Built with precision and purpose.
          </p>
        </div>
      </footer>

      {/* Command Center Modal */}
      <CommandCenter
        isOpen={showCommandCenter}
        onClose={() => setShowCommandCenter(false)}
      />

      {/* Public Pi Status Bar */}
      <PiStatusBar />
    </div>
  );
}

export default App;