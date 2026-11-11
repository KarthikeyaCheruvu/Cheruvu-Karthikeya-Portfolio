import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactFormData, ContactSubmission } from '../types/portfolio';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
    subId?: number;
    timestamp?: string;
  } | null>(null);

  const [showDbModal, setShowDbModal] = useState(false);
  const [dbSubmissions, setDbSubmissions] = useState<ContactSubmission[]>([]);
  const [dbLoading, setDbLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'All fields are required. Please fill in your name, email, subject, and message.',
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.detail || 'Failed to submit form.');
      }

      setStatusMessage({
        type: 'success',
        text: data.message || 'Message stored in SQLite database via Python backend.',
        subId: data.submission_id,
        timestamp: data.timestamp,
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        honeypot: '',
      });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to submit. Please check your connection or Python backend status.',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchDatabaseRecords = async () => {
    setDbLoading(true);
    setShowDbModal(true);
    try {
      const res = await fetch('/api/contact/submissions');
      const data = await res.json();
      setDbSubmissions(data.submissions || []);
    } catch (err) {
      console.error('Failed to fetch submissions', err);
    } finally {
      setDbLoading(false);
    }
  };

  return (
    <section id="contact" className="relative w-full py-28 px-6 sm:px-12 bg-[#0B0B0B] border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6">
          <span>05</span>
          <span className="w-8 h-[1px] bg-neutral-700" />
          <span className="text-blue-400">Direct Inquiries & Python Backend</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-10">
            <div>
              <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-white leading-tight font-serif mb-6">
                Let's discuss systems, data pipelines, or engineering roles.
              </h2>
              <p className="text-sm text-neutral-400 font-sans font-light leading-relaxed mb-8">
                Available for software engineering internships, technical collaborations, and research inquiries.
                All messages are routed directly through a functional Python backend and persisted to a localized SQLite database.
              </p>

              <div className="space-y-4 pt-6 border-t border-neutral-800">
                <div className="flex flex-col">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Email</span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-base font-mono text-white hover:text-blue-400 transition-colors mt-0.5"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Direct Line</span>
                  <a
                    href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                    className="text-base font-mono text-white hover:text-blue-400 transition-colors mt-0.5"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Location</span>
                  <span className="text-base font-mono text-neutral-300 mt-0.5">
                    {PERSONAL_INFO.location}
                  </span>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-blue-400 hover:text-white transition-colors"
                  >
                    LinkedIn ↗
                  </a>
                  <span className="text-neutral-700">·</span>
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-blue-400 hover:text-white transition-colors"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-neutral-800 bg-[#121212] flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-blue-400 font-semibold">
                  PYTHON FASTAPI + SQLITE
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  Inspect persistent database records live
                </div>
              </div>
              <button
                onClick={fetchDatabaseRecords}
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-white transition-colors shrink-0"
              >
                View SQLite Rows
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl border border-neutral-800 bg-[#121212] shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Your Name <span className="text-blue-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Elena Rostova"
                      className="w-full px-4 py-3 rounded-xl bg-black border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500 text-sm font-sans transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Email Address <span className="text-blue-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. elena@domain.com"
                      className="w-full px-4 py-3 rounded-xl bg-black border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500 text-sm font-sans transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Subject Line <span className="text-blue-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Internship Inquiry / Engineering Collaboration"
                    className="w-full px-4 py-3 rounded-xl bg-black border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500 text-sm font-sans transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Message <span className="text-blue-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here (min. 10 characters)..."
                    className="w-full px-4 py-3 rounded-xl bg-black border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500 text-sm font-sans transition-colors resize-y"
                  />
                </div>

                {statusMessage && (
                  <div
                    className={`p-4 rounded-xl text-xs font-mono leading-relaxed ${
                      statusMessage.type === 'success'
                        ? 'bg-blue-950/40 border border-blue-500/40 text-blue-200'
                        : 'bg-red-950/40 border border-red-500/40 text-red-200'
                    }`}
                  >
                    <div className="font-semibold">{statusMessage.text}</div>
                    {statusMessage.subId && (
                      <div className="mt-1 text-neutral-400">
                        SQLite Record ID: #{statusMessage.subId} · Recorded at {statusMessage.timestamp}
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-sm transition-all shadow-lg shadow-blue-600/25 active:scale-[0.98]"
                  >
                    {loading ? 'Executing Python Validation & Storage...' : 'Transmit Message →'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showDbModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-4xl max-h-[85vh] rounded-3xl border border-neutral-700 bg-[#121212] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div>
                <h3 className="text-xl font-bold text-white font-display">
                  SQLite Database Records
                </h3>
                <p className="text-xs font-mono text-neutral-400 mt-0.5">
                  Table: contact_submissions · Location: backend/contacts.db
                </p>
              </div>
              <button
                onClick={() => setShowDbModal(false)}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto my-4 space-y-3 pr-1">
              {dbLoading ? (
                <div className="py-12 text-center text-xs font-mono text-neutral-400">
                  Querying SQLite database via Python backend...
                </div>
              ) : dbSubmissions.length === 0 ? (
                <div className="py-12 text-center text-xs font-mono text-neutral-400">
                  No submissions recorded yet. Submit the contact form above to test genuine SQLite storage!
                </div>
              ) : (
                dbSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-4 rounded-xl border border-neutral-800 bg-black/60 font-mono text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between text-neutral-400">
                      <span className="text-blue-400 font-bold">Record #{sub.id}</span>
                      <span>{sub.created_at}</span>
                    </div>
                    <div className="text-white">
                      <span className="text-neutral-500">From:</span> {sub.name} &lt;{sub.email}&gt;
                    </div>
                    <div className="text-neutral-300">
                      <span className="text-neutral-500">Subject:</span> {sub.subject}
                    </div>
                    <div className="text-neutral-300 p-2.5 rounded bg-neutral-900 border border-neutral-800 text-[11px] whitespace-pre-wrap">
                      {sub.message}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">
                {dbSubmissions.length} row(s) returned
              </span>
              <button
                onClick={() => setShowDbModal(false)}
                className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-white transition-colors"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
