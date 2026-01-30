import React from 'react';

function TechStack({ categories }) {
  return (
    <section id="tech-stack" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Technical Capabilities</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A comprehensive technology stack designed to deliver robust,
            scalable solutions across the full product lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="text-center">
              {/* Category Icon */}
              <div className="text-4xl mb-4">{category.icon}</div>

              {/* Category Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {category.name}
              </h3>

              {/* Technologies */}
              <div className="space-y-2">
                {category.technologies.map((tech, techIndex) => (
                  <div
                    key={techIndex}
                    className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 code-font hover:bg-gray-100 transition-colors"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Additional Expertise</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Product Strategy',
              'User Experience Design',
              'Data Visualization',
              'API Integration',
              'Performance Optimization',
              'SEO & Analytics',
              'Agile Development',
              'DevOps & Deployment'
            ].map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-accent/10 text-accent border border-accent/20 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TechStack;