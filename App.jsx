import React, { useState, Suspense } from 'react';

// Lazy-load every module so the heavy files are only parsed when selected
const DSMLIntro           = React.lazy(() => import('./1. DS-ML Intro.jsx'));
const DataPreprocessing   = React.lazy(() => import('./2. Data Preprocessing Combined.jsx'));
const ML                  = React.lazy(() => import('./3. ML Combined.jsx'));
const DeepLearning        = React.lazy(() => import('./4. Deep Learning Combined.jsx'));
const NeuralNet           = React.lazy(() => import('./5. Neural Net Combined.jsx'));
const CNN                 = React.lazy(() => import('./6. CNN Combined.jsx'));
const DeepLearning2       = React.lazy(() => import('./7. Deep Learning Combined.jsx'));
const Image               = React.lazy(() => import('./8. Image Combined.jsx'));
const RAG                 = React.lazy(() => import('./10. RAG Combined.jsx'));

const modules = [
  { id: 1,  label: '1. DS & ML Intro',          Component: DSMLIntro },
  { id: 2,  label: '2. Data Preprocessing',      Component: DataPreprocessing },
  { id: 3,  label: '3. ML Combined',             Component: ML },
  { id: 4,  label: '4. Deep Learning',           Component: DeepLearning },
  { id: 5,  label: '5. Neural Networks',         Component: NeuralNet },
  { id: 6,  label: '6. CNN',                     Component: CNN },
  { id: 7,  label: '7. Deep Learning (II)',      Component: DeepLearning2 },
  { id: 8,  label: '8. Image Processing',        Component: Image },
  { id: 10, label: '10. RAG',                    Component: RAG },
];

export default function App() {
  const [activeId, setActiveId] = useState(1);
  const current = modules.find(m => m.id === activeId);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      {/* Sidebar */}
      <nav style={{
        width: 220, flexShrink: 0, background: '#1e293b', color: '#e2e8f0',
        display: 'flex', flexDirection: 'column', padding: '1rem 0',
        boxShadow: '2px 0 8px rgba(0,0,0,0.3)',
      }}>
        <div style={{ padding: '0.5rem 1rem 1.5rem', borderBottom: '1px solid #334155' }}>
          <div style={{ fontSize: 11, letterSpacing: 1, color: '#94a3b8', textTransform: 'uppercase' }}>CMPSC 348</div>
          <div style={{ fontWeight: 700, fontSize: 15, marginTop: 4 }}>DS &amp; ML Courseware</div>
        </div>
        {modules.map(m => (
          <button
            key={m.id}
            onClick={() => setActiveId(m.id)}
            style={{
              textAlign: 'left', background: activeId === m.id ? '#3b82f6' : 'transparent',
              color: activeId === m.id ? '#fff' : '#cbd5e1',
              border: 'none', cursor: 'pointer', padding: '0.6rem 1rem',
              fontSize: 13, transition: 'background 0.15s',
            }}
          >
            {m.label}
          </button>
        ))}
      </nav>

      {/* Main content */}
      <main style={{ flex: 1, overflow: 'auto', background: '#f8fafc' }}>
        <Suspense fallback={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: 18, color: '#64748b' }}>
            Loading module…
          </div>
        }>
          {current && <current.Component />}
        </Suspense>
      </main>
    </div>
  );
}
