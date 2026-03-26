import React, { useState } from 'react';

const layerConfig = {
  data: { label: 'Data Collection', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', dot: 'bg-emerald-500' },
  intelligence: { label: 'Intelligence', bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', dot: 'bg-blue-500' },
  action: { label: 'Action', bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', dot: 'bg-purple-500' },
  meta: { label: 'Meta', bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', dot: 'bg-amber-500' },
};

function AgentNode({ agent, isSelected, onClick, flows }) {
  const layer = layerConfig[agent.layer];
  const connectionCount = flows.filter(f => f.from === agent.id || f.to === agent.id).length;

  return (
    <button
      onClick={() => onClick(agent.id)}
      className={`text-left w-full rounded-xl p-4 border-2 transition-all duration-200 ${
        isSelected
          ? `${layer.bg} ${layer.border} ring-2 ring-offset-2 ring-offset-gray-900 ring-${agent.color}-500/50 scale-[1.02]`
          : `bg-gray-800/60 border-gray-700 hover:${layer.border} hover:${layer.bg}`
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{agent.icon}</span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-white text-sm">{agent.name}</h4>
            <span className={`w-1.5 h-1.5 rounded-full ${layer.dot}`}></span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{agent.schedule}</p>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{agent.description}</p>
        </div>
      </div>
      {isSelected && (
        <div className="mt-3 pt-3 border-t border-gray-700 space-y-2">
          {agent.reads.length > 0 && (
            <div className="flex items-start gap-2">
              <span className="text-[10px] text-gray-500 uppercase tracking-wider w-12 flex-shrink-0 pt-0.5">Reads</span>
              <div className="flex flex-wrap gap-1">
                {agent.reads.map((t, i) => (
                  <span key={i} className="text-[10px] bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded">{t}</span>
                ))}
              </div>
            </div>
          )}
          {agent.writes.length > 0 && (
            <div className="flex items-start gap-2">
              <span className="text-[10px] text-gray-500 uppercase tracking-wider w-12 flex-shrink-0 pt-0.5">Writes</span>
              <div className="flex flex-wrap gap-1">
                {agent.writes.map((t, i) => (
                  <span key={i} className={`text-[10px] ${layer.bg} ${layer.text} px-1.5 py-0.5 rounded`}>{t}</span>
                ))}
              </div>
            </div>
          )}
          <div className="text-[10px] text-gray-500 mt-1">{agent.metrics}</div>
        </div>
      )}
    </button>
  );
}

function FlowLine({ flow, agents, selectedAgent }) {
  const isHighlighted = selectedAgent === flow.from || selectedAgent === flow.to;
  const typeColors = {
    data: 'text-emerald-500',
    intelligence: 'text-blue-500',
    feedback: 'text-amber-500',
    meta: 'text-gray-500',
  };

  if (!isHighlighted && selectedAgent) return null;

  const fromAgent = agents.find(a => a.id === flow.from);
  const toAgent = flow.to === 'all' ? { name: 'All Agents' } : agents.find(a => a.id === flow.to);

  return (
    <div className={`flex items-center gap-2 text-xs transition-opacity duration-200 ${
      isHighlighted ? 'opacity-100' : selectedAgent ? 'opacity-20' : 'opacity-60'
    }`}>
      <span className="text-gray-400 font-medium w-28 text-right truncate">{fromAgent?.name}</span>
      <div className={`flex items-center gap-1 ${typeColors[flow.type]}`}>
        <div className="w-8 h-px bg-current"></div>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 border border-gray-700 whitespace-nowrap">{flow.label}</span>
        <div className="w-4 h-px bg-current"></div>
        <span>→</span>
      </div>
      <span className="text-gray-400 font-medium w-28 truncate">{toAgent?.name}</span>
    </div>
  );
}

export default function EcosystemMap({ agents, flows }) {
  const [selectedAgent, setSelectedAgent] = useState(null);

  const handleClick = (id) => {
    setSelectedAgent(selectedAgent === id ? null : id);
  };

  const dataAgents = agents.filter(a => a.layer === 'data');
  const intelAgents = agents.filter(a => a.layer === 'intelligence');
  const actionAgents = agents.filter(a => a.layer === 'action');
  const metaAgents = agents.filter(a => a.layer === 'meta');

  const visibleFlows = selectedAgent
    ? flows.filter(f => f.from === selectedAgent || f.to === selectedAgent || f.to === 'all')
    : flows;

  return (
    <div className="space-y-8">
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 text-xs">
        {Object.entries(layerConfig).map(([key, config]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${config.dot}`}></span>
            <span className="text-gray-400">{config.label}</span>
          </div>
        ))}
        <span className="text-gray-600">|</span>
        <span className="text-gray-500">Click any agent to explore connections</span>
      </div>

      {/* Agent Layers */}
      <div className="space-y-4">
        {/* Data Layer */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-2">
            <span className={`w-2 h-2 rounded-full ${layerConfig.data.dot}`}></span>
            <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Data Collection</span>
            <div className="flex-1 h-px bg-emerald-500/20"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {dataAgents.map(agent => (
              <AgentNode
                key={agent.id}
                agent={agent}
                isSelected={selectedAgent === agent.id}
                onClick={handleClick}
                flows={flows}
              />
            ))}
          </div>
        </div>

        {/* Flow arrows between layers */}
        <div className="flex justify-center py-2">
          <div className="flex flex-col items-center gap-0.5 text-gray-600">
            <div className="w-px h-4 bg-gray-700"></div>
            <span className="text-xs">feeds into</span>
            <div className="text-lg">↓</div>
          </div>
        </div>

        {/* Intelligence Layer */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-2">
            <span className={`w-2 h-2 rounded-full ${layerConfig.intelligence.dot}`}></span>
            <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">Intelligence</span>
            <div className="flex-1 h-px bg-blue-500/20"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {intelAgents.map(agent => (
              <AgentNode
                key={agent.id}
                agent={agent}
                isSelected={selectedAgent === agent.id}
                onClick={handleClick}
                flows={flows}
              />
            ))}
          </div>
        </div>

        {/* Flow arrows */}
        <div className="flex justify-center py-2">
          <div className="flex flex-col items-center gap-0.5 text-gray-600">
            <div className="w-px h-4 bg-gray-700"></div>
            <span className="text-xs">drives</span>
            <div className="text-lg">↓</div>
          </div>
        </div>

        {/* Action Layer */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-2">
            <span className={`w-2 h-2 rounded-full ${layerConfig.action.dot}`}></span>
            <span className="text-xs font-medium text-purple-400 uppercase tracking-wider">Action</span>
            <div className="flex-1 h-px bg-purple-500/20"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {actionAgents.map(agent => (
              <AgentNode
                key={agent.id}
                agent={agent}
                isSelected={selectedAgent === agent.id}
                onClick={handleClick}
                flows={flows}
              />
            ))}
          </div>
        </div>

        {/* Feedback loop arrow */}
        <div className="flex justify-center py-2">
          <div className="flex flex-col items-center gap-0.5 text-amber-500/60">
            <div className="w-px h-4 bg-amber-500/30"></div>
            <span className="text-xs text-amber-500/80">feedback loop</span>
            <div className="text-lg">↻</div>
          </div>
        </div>

        {/* Meta Layer */}
        {metaAgents.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-2">
              <span className={`w-2 h-2 rounded-full ${layerConfig.meta.dot}`}></span>
              <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">Continuous Improvement</span>
              <div className="flex-1 h-px bg-amber-500/20"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {metaAgents.map(agent => (
                <AgentNode
                  key={agent.id}
                  agent={agent}
                  isSelected={selectedAgent === agent.id}
                  onClick={handleClick}
                  flows={flows}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Data Flow Detail */}
      {selectedAgent && (
        <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-4">
          <h4 className="text-sm font-medium text-gray-300 mb-3">
            Data Flows for {agents.find(a => a.id === selectedAgent)?.name}
          </h4>
          <div className="space-y-2">
            {visibleFlows.map((flow, i) => (
              <FlowLine key={i} flow={flow} agents={agents} selectedAgent={selectedAgent} />
            ))}
            {visibleFlows.length === 0 && (
              <p className="text-xs text-gray-500">No direct data flows mapped for this agent.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
