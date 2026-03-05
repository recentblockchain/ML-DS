import React, { useState, Suspense } from 'react';

// Lazy-load every module so the heavy files are only parsed when selected
const DSMLIntro         = React.lazy(() => import('./1. DS-ML Intro.jsx'));
const DataPreprocessing = React.lazy(() => import('./2. Data Preprocessing Combined.jsx'));
const ML                = React.lazy(() => import('./3. ML Combined.jsx'));
const DeepLearning      = React.lazy(() => import('./4. Deep Learning Combined.jsx'));
const NeuralNet         = React.lazy(() => import('./5. Neural Net Combined.jsx'));
const CNN               = React.lazy(() => import('./6. CNN Combined.jsx'));
const DeepLearning2     = React.lazy(() => import('./7. Deep Learning Combined.jsx'));
const Image             = React.lazy(() => import('./8. Image Combined.jsx'));
const RAG               = React.lazy(() => import('./10. RAG Combined.jsx'));

/**
 * Each module gets a unique accent colour.
 * The accent is applied to:
 *   - the left-border dot in the sidebar
 *   - a 4-px top colour band above the module content
 *   - CSS variable --accent available to module children
 */
const modules = [
  { id: 1,  label: '1. DS & ML Intro',       Component: DSMLIntro,         accent: '#1d4ed8' }, // Royal Blue
  { id: 2,  label: '2. Data Preprocessing',  Component: DataPreprocessing, accent: '#0d9488' }, // Teal
  { id: 3,  label: '3. ML Combined',         Component: ML,                accent: '#7c3aed' }, // Violet
  { id: 4,  label: '4. Deep Learning',       Component: DeepLearning,      accent: '#ea580c' }, // Burnt Orange
  { id: 5,  label: '5. Neural Networks',     Component: NeuralNet,         accent: '#dc2626' }, // Crimson
  { id: 6,  label: '6. CNN',                 Component: CNN,               accent: '#4338ca' }, // Indigo
  { id: 7,  label: '7. Deep Learning (II)',  Component: DeepLearning2,     accent: '#059669' }, // Emerald
  { id: 8,  label: '8. Image Processing',    Component: Image,             accent: '#db2777' }, // Rose
  { id: 10, label: '10. RAG',               Component: RAG,               accent: '#b45309' }, // Amber
];

export default function App() {
  const [activeId, setActiveId] = useState(1);
  const current = modules.find(m => m.id === activeId);

  return (
    <div className="app-shell">

      {/* ── Sidebar ── */}
      <nav className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-course">CMPSC 348</div>
          <div className="sidebar-title">Data Science &amp;<br />Machine Learning</div>
        </div>

        <div className="sidebar-nav">
          {modules.map(m => (
            <button
              key={m.id}
              className={`sidebar-btn${activeId === m.id ? ' active' : ''}`}
              style={{ '--btn-accent': m.accent }}
              onClick={() => setActiveId(m.id)}
            >
              <span className="sidebar-dot" style={{ background: m.accent }} />
              {m.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Main content ── */}
      <main className="main-area">
        {/* Per-module colour band at the very top */}
        {current && <div className="module-accent-bar" style={{ '--accent': current.accent }} />}

        {/* Module component wrapped in a CSS-variable context */}
        <div
          className="module-content"
          style={{ '--accent': current?.accent }}
        >
          <Suspense fallback={
            <div className="loading-state">Loading module…</div>
          }>
            {current && <current.Component />}
          </Suspense>
        </div>
      </main>

    </div>
  );
}
