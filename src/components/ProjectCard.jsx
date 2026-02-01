import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';

function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden">
      {/* Project Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {project.image?.startsWith('/') || project.image?.startsWith('http') ? (
              <img src={project.image} alt={project.title} className="w-10 h-10 object-contain rounded" />
            ) : (
              <div className="text-3xl">{project.image}</div>
            )}
            <div>
              <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
              <p className="text-sm text-gray-500">{project.category}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              project.status === 'Live'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {project.status}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full code-font"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer with CTA */}
      <div className="px-6 pb-6">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full bg-primary text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors group"
        >
          Visit {project.title}
          <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}

export default ProjectCard;