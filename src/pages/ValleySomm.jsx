import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import EcosystemMap from '../components/EcosystemMap';
import {
  valleysommProduct,
  valleysommAgents,
  valleysommFlows,
  valleysommTables,
} from '../data/projects';

export default function ValleySomm() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const product = valleysommProduct;

  return (
    <div>
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-8 transition-colors">
            ← Back to YDP
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-xs font-medium mb-4 border border-purple-500/20">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></span>
                Live Product
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                <span className="text-3xl md:text-4xl mr-3">🍷</span>
                {product.name}
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl">{product.tagline}</p>
            </div>
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-medium transition-colors flex-shrink-0"
            >
              Visit valleysomm.com
              <span className="text-sm">→</span>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {product.stats.map((stat, i) => (
              <div key={i} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm font-medium text-gray-300">{stat.label}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Is ValleySomm */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What is ValleySomm?</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {product.description}
          </p>
        </div>
      </section>

      {/* How It Works — Customer Journey */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">From quiz to winery visit — and back again</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.customerJourney.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-white rounded-xl p-6 border border-gray-200 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{step.icon}</span>
                    <div>
                      <span className="text-xs font-medium text-purple-600 uppercase">Step {step.step}</span>
                      <h3 className="font-bold text-gray-900">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
                {i < product.customerJourney.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 text-gray-300 text-xl">→</div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-full border border-amber-200">
              <span>🔄</span>
              Steps 5-6 create a feedback loop that makes every itinerary smarter than the last
            </div>
          </div>
        </div>
      </section>

      {/* The Engine — Ecosystem Map */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-green-500/20">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Running 24/7 on Raspberry Pi
            </div>
            <h2 className="text-3xl font-bold mb-4">The Engine</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              9 autonomous agents work together to keep ValleySomm's data fresh, content flowing,
              customers engaged, and the product improving — all without human intervention.
            </p>
          </div>

          <EcosystemMap agents={valleysommAgents} flows={valleysommFlows} />

          {/* Supabase — The Shared Brain */}
          <div className="mt-12 bg-gray-800/50 rounded-2xl border border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">⚡</span>
              <div>
                <h3 className="text-lg font-bold text-white">Supabase — The Shared Brain</h3>
                <p className="text-sm text-gray-400">Every agent reads and writes to shared Postgres tables. No message queues, no orchestrator — just a database.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {valleysommTables.map((table, i) => (
                <div key={i} className="flex items-start gap-3 bg-gray-900/50 rounded-lg p-3 border border-gray-700/50">
                  <code className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded flex-shrink-0">{table.name}</code>
                  <div>
                    <span className="text-xs text-gray-300">{table.description}</span>
                    <span className="text-xs text-gray-600 ml-2">({table.rows} rows)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Built With</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '▲', name: 'Next.js 14', detail: 'App router, server actions' },
              { icon: '⚡', name: 'Supabase', detail: 'Postgres + Auth + Storage' },
              { icon: '🤖', name: 'Claude Sonnet', detail: 'Itinerary AI + agents' },
              { icon: '🗺️', name: 'Google Routes', detail: 'Drive time optimization' },
              { icon: '💳', name: 'Stripe', detail: 'Payments + webhooks' },
              { icon: '📧', name: 'Resend', detail: 'Transactional + lifecycle' },
              { icon: '🍓', name: 'Raspberry Pi', detail: '8GB, runs all agents' },
              { icon: '📱', name: 'ntfy.sh', detail: 'Push notifications to phone' },
            ].map((tech, i) => (
              <div key={i} className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-2xl mb-2">{tech.icon}</div>
                <div className="font-medium text-gray-900 text-sm">{tech.name}</div>
                <div className="text-xs text-gray-500">{tech.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Plan Your Yadkin Valley Wine Trip</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Take a 2-minute quiz and get a personalized itinerary crafted by AI and kept fresh by 9 autonomous agents.
          </p>
          <a
            href="https://valleysomm.com/plan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-purple-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Start Planning →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 pb-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 Yadkin Data Partners. Built with precision and purpose.
          </p>
        </div>
      </footer>
    </div>
  );
}
