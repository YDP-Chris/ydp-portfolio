import React, { useState } from 'react';
import { Send, Mail, MessageCircle, User } from 'lucide-react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    projectType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '', projectType: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to send message. Please try emailing chris@yadkindatapartners.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h3>
            <p className="text-gray-600 mb-6">
              Thanks for reaching out. Your message has been sent successfully.
              We'll get back to you within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-primary hover:text-blue-800 font-medium"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Start a Conversation</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your project and explore
            how we can create something exceptional together.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="bg-primary p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Let's Build Something Amazing</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-blue-200" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-blue-200">chris@yadkindatapartners.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MessageCircle className="w-6 h-6 text-blue-200" />
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-blue-200">Within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <User className="w-6 h-6 text-blue-200" />
                  <div>
                    <p className="font-medium">Based in</p>
                    <p className="text-blue-200">Elkin, North Carolina</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold mb-4">What We Can Help With:</h4>
                <ul className="space-y-2 text-blue-200">
                  <li>• Custom web application development</li>
                  <li>• Data analytics and visualization</li>
                  <li>• AI integration and automation</li>
                  <li>• Product strategy and design</li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select a project type</option>
                    <option value="web-application">Web Application</option>
                    <option value="data-analytics">Data Analytics</option>
                    <option value="ai-integration">AI Integration</option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;