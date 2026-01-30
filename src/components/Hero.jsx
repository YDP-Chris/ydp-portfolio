import React from 'react';
import { ArrowDown } from 'lucide-react';
import { companyInfo } from '../data/projects';

function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-16 pb-20 bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="pt-16 pb-8 text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {companyInfo.tagline}
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            While you sleep, AI agents ship working products. See 4 live applications across wine, nonprofits,
            field service & music education. The future of development is autonomous.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={scrollToProjects}
              className="bg-accent text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-lg"
            >
              Explore Live Products
            </button>
            <button
              onClick={() => document.getElementById('agents')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:border-accent hover:text-accent transition-colors"
            >
              Meet the Agent Fleet
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center">
            <button
              onClick={scrollToProjects}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              aria-label="Scroll to portfolio"
            >
              <ArrowDown className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Stats or Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">45min</div>
            <div className="text-gray-600">Idea → Live Product</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-2">24/7</div>
            <div className="text-gray-600">Autonomous Building</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary mb-2">6</div>
            <div className="text-gray-600">AI Agents Working</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;