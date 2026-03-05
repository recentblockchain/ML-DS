import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import {
  BarChart3, TrendingUp, Activity, Zap, Calculator, Code, Play, RefreshCw,
  PieChart, LineChart as LineChartIcon, GitBranch, Database, BookOpen,
  Info, ChevronRight
} from 'lucide-react';

// ============================================================
// FILE: 1. Data Preprocessing
// ============================================================


const DataPreprocessingLearningTool = () => {
  const [activeTab, setActiveTab] = useState('missing');
  const [missingStrategy, setMissingStrategy] = useState('mean');
  const [scalingMethod, setScalingMethod] = useState('minmax');
  const [outlierMethod, setOutlierMethod] = useState('iqr');

  // Sample data for demonstrations
  const [rawData, setRawData] = useState([
    { id: 1, age: 25, income: 30000, score: 85 },
    { id: 2, age: 30, income: null, score: 90 },
    { id: 3, age: null, income: 45000, score: 78 },
    { id: 4, age: 40, income: 60000, score: 95 },
    { id: 5, age: 45, income: 55000, score: null },
    { id: 6, age: 50, income: 70000, score: 88 },
    { id: 7, age: 35, income: 250000, score: 92 }, // Outlier
    { id: 8, age: 28, income: 48000, score: 86 },
  ]);

  // Handle missing values
  const handleMissingValues = (data, strategy) => {
    const result = JSON.parse(JSON.stringify(data));
    
    ['age', 'income', 'score'].forEach(field => {
      const values = result.filter(d => d[field] !== null).map(d => d[field]);
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      const median = values.sort((a, b) => a - b)[Math.floor(values.length / 2)];
      
      result.forEach(row => {
        if (row[field] === null) {
          if (strategy === 'mean') row[field] = Math.round(mean);
          else if (strategy === 'median') row[field] = Math.round(median);
          else if (strategy === 'drop') row[field] = 'DROPPED';
          else if (strategy === 'zero') row[field] = 0;
        }
      });
    });
    
    return result;
  };

  // Scaling functions
  const scaleData = (data, method) => {
    const result = JSON.parse(JSON.stringify(data));
    const fields = ['age', 'income', 'score'];
    
    fields.forEach(field => {
      const values = result.map(d => d[field]).filter(v => typeof v === 'number');
      const min = Math.min(...values);
      const max = Math.max(...values);
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      const std = Math.sqrt(values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length);
      
      result.forEach(row => {
        if (typeof row[field] === 'number') {
          if (method === 'minmax') {
            row[`${field}_scaled`] = ((row[field] - min) / (max - min)).toFixed(3);
          } else if (method === 'standard') {
            row[`${field}_scaled`] = ((row[field] - mean) / std).toFixed(3);
          } else if (method === 'robust') {
            const median = values.sort((a, b) => a - b)[Math.floor(values.length / 2)];
            const q1 = values[Math.floor(values.length * 0.25)];
            const q3 = values[Math.floor(values.length * 0.75)];
            const iqr = q3 - q1;
            row[`${field}_scaled`] = ((row[field] - median) / iqr).toFixed(3);
          }
        }
      });
    });
    
    return result;
  };

  // Detect outliers
  const detectOutliers = (data, method) => {
    const result = JSON.parse(JSON.stringify(data));
    const field = 'income';
    const values = result.map(d => d[field]).filter(v => typeof v === 'number');
    
    if (method === 'iqr') {
      const sorted = values.sort((a, b) => a - b);
      const q1 = sorted[Math.floor(sorted.length * 0.25)];
      const q3 = sorted[Math.floor(sorted.length * 0.75)];
      const iqr = q3 - q1;
      const lowerBound = q1 - 1.5 * iqr;
      const upperBound = q3 + 1.5 * iqr;
      
      result.forEach(row => {
        if (typeof row[field] === 'number') {
          row.isOutlier = row[field] < lowerBound || row[field] > upperBound;
        }
      });
    } else if (method === 'zscore') {
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      const std = Math.sqrt(values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length);
      
      result.forEach(row => {
        if (typeof row[field] === 'number') {
          const zscore = Math.abs((row[field] - mean) / std);
          row.isOutlier = zscore > 3;
        }
      });
    }
    
    return result;
  };

  // Correlation data
  const correlationData = [
    { feature1: 'Age', feature2: 'Income', correlation: 0.85 },
    { feature1: 'Age', feature2: 'Score', correlation: 0.23 },
    { feature1: 'Income', feature2: 'Score', correlation: 0.45 },
  ];

  // Distribution data
  const distributionData = [
    { bin: '20-25', count: 15 },
    { bin: '25-30', count: 25 },
    { bin: '30-35', count: 40 },
    { bin: '35-40', count: 35 },
    { bin: '40-45', count: 30 },
    { bin: '45-50', count: 20 },
    { bin: '50+', count: 10 },
  ];

  const processedData = handleMissingValues(rawData, missingStrategy);
  const scaledData = scaleData(processedData, scalingMethod);
  const outlierData = detectOutliers(rawData, outlierMethod);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1400px', margin: '0 auto', padding: '20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      <div style={{ background: 'white', borderRadius: '15px', padding: '30px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '42px', color: '#667eea', marginBottom: '10px', fontWeight: 'bold' }}>
            🎢 Data Preprocessing & EDA Interactive Lab
          </h1>
          <p style={{ fontSize: '18px', color: '#666' }}>
            Learn by doing! Explore data preprocessing, cleaning, and analysis with live examples
          </p>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { id: 'missing', label: '🔍 Missing Values', icon: '❓' },
            { id: 'outliers', label: '🎯 Outliers', icon: '📊' },
            { id: 'scaling', label: '📏 Scaling', icon: '⚖️' },
            { id: 'eda', label: '📈 EDA', icon: '🔬' },
            { id: 'features', label: '🎨 Feature Engineering', icon: '✨' },
            { id: 'selection', label: '🎯 Feature Selection', icon: '🎪' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: '10px',
                background: activeTab === tab.id ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#f0f0f0',
                color: activeTab === tab.id ? 'white' : '#333',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'all 0.3s',
                boxShadow: activeTab === tab.id ? '0 4px 15px rgba(102,126,234,0.4)' : 'none'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div style={{ background: '#f8f9fa', padding: '30px', borderRadius: '10px', minHeight: '500px' }}>
          
          {/* MISSING VALUES TAB */}
          {activeTab === 'missing' && (
            <div>
              <h2 style={{ color: '#667eea', marginBottom: '20px' }}>👻 Handling Missing Values</h2>
              
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                <h3 style={{ color: '#764ba2' }}>🎮 Interactive Demo</h3>
                <p style={{ marginBottom: '15px' }}>Select a strategy to handle missing values (null) in our dataset:</p>
                
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  {[
                    { value: 'mean', label: '📊 Mean Imputation', desc: 'Replace with average' },
                    { value: 'median', label: '📈 Median Imputation', desc: 'Replace with middle value' },
                    { value: 'zero', label: '0️⃣ Zero Fill', desc: 'Replace with 0' },
                    { value: 'drop', label: '🗑️ Drop', desc: 'Mark for deletion' }
                  ].map(strategy => (
                    <button
                      key={strategy.value}
                      onClick={() => setMissingStrategy(strategy.value)}
                      style={{
                        padding: '10px 20px',
                        border: missingStrategy === strategy.value ? '3px solid #667eea' : '2px solid #ddd',
                        borderRadius: '8px',
                        background: missingStrategy === strategy.value ? '#e8eaff' : 'white',
                        cursor: 'pointer',
                        flex: '1',
                        minWidth: '150px'
                      }}
                    >
                      <div style={{ fontWeight: 'bold' }}>{strategy.label}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>{strategy.desc}</div>
                    </button>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <h4 style={{ color: '#e74c3c' }}>❌ Before (with nulls)</h4>
                    <div style={{ overflow: 'auto', maxHeight: '300px' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                        <thead style={{ background: '#667eea', color: 'white', position: 'sticky', top: 0 }}>
                          <tr>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Age</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Income</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rawData.map(row => (
                            <tr key={row.id}>
                              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.id}</td>
                              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', background: row.age === null ? '#ffebee' : 'white' }}>
                                {row.age === null ? '❌ null' : row.age}
                              </td>
                              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', background: row.income === null ? '#ffebee' : 'white' }}>
                                {row.income === null ? '❌ null' : row.income}
                              </td>
                              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', background: row.score === null ? '#ffebee' : 'white' }}>
                                {row.score === null ? '❌ null' : row.score}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h4 style={{ color: '#27ae60' }}>✅ After ({missingStrategy})</h4>
                    <div style={{ overflow: 'auto', maxHeight: '300px' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                        <thead style={{ background: '#27ae60', color: 'white', position: 'sticky', top: 0 }}>
                          <tr>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Age</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Income</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {processedData.map(row => (
                            <tr key={row.id}>
                              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.id}</td>
                              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', background: '#e8f5e9' }}>
                                {row.age}
                              </td>
                              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', background: '#e8f5e9' }}>
                                {row.income}
                              </td>
                              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', background: '#e8f5e9' }}>
                                {row.score}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ background: '#fff3cd', padding: '15px', borderRadius: '8px', border: '2px solid #ffc107' }}>
                <h4 style={{ marginTop: 0 }}>💡 Key Insights:</h4>
                <ul style={{ marginBottom: 0 }}>
                  <li><strong>Mean:</strong> Best for normally distributed data, affected by outliers</li>
                  <li><strong>Median:</strong> Robust to outliers, good for skewed data</li>
                  <li><strong>Zero Fill:</strong> Use only when 0 is meaningful (e.g., "no purchases")</li>
                  <li><strong>Drop:</strong> Only when you have plenty of data and few missing values</li>
                </ul>
              </div>
            </div>
          )}

          {/* OUTLIERS TAB */}
          {activeTab === 'outliers' && (
            <div>
              <h2 style={{ color: '#667eea', marginBottom: '20px' }}>🎸 Detecting Outliers</h2>
              
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                <h3 style={{ color: '#764ba2' }}>🔍 Choose Detection Method</h3>
                
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <button
                    onClick={() => setOutlierMethod('iqr')}
                    style={{
                      padding: '15px',
                      border: outlierMethod === 'iqr' ? '3px solid #667eea' : '2px solid #ddd',
                      borderRadius: '8px',
                      background: outlierMethod === 'iqr' ? '#e8eaff' : 'white',
                      cursor: 'pointer',
                      flex: 1
                    }}
                  >
                    <div style={{ fontWeight: 'bold', fontSize: '18px' }}>📊 IQR Method</div>
                    <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                      Uses quartiles to find fences<br/>
                      Lower Fence = Q1 - 1.5 × IQR<br/>
                      Upper Fence = Q3 + 1.5 × IQR
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setOutlierMethod('zscore')}
                    style={{
                      padding: '15px',
                      border: outlierMethod === 'zscore' ? '3px solid #667eea' : '2px solid #ddd',
                      borderRadius: '8px',
                      background: outlierMethod === 'zscore' ? '#e8eaff' : 'white',
                      cursor: 'pointer',
                      flex: 1
                    }}
                  >
                    <div style={{ fontWeight: 'bold', fontSize: '18px' }}>📈 Z-Score Method</div>
                    <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                      Uses standard deviations<br/>
                      Outlier if |Z-score| &gt; 3<br/>
                      (3 std devs from mean)
                    </div>
                  </button>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="id" name="ID" />
                    <YAxis dataKey="income" name="Income" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter 
                      data={outlierData} 
                      fill="#667eea"
                      shape={(props) => {
                        const { cx, cy, payload } = props;
                        const isOutlier = payload.isOutlier;
                        return (
                          <circle 
                            cx={cx} 
                            cy={cy} 
                            r={isOutlier ? 8 : 5} 
                            fill={isOutlier ? '#e74c3c' : '#667eea'}
                            stroke={isOutlier ? '#c0392b' : '#667eea'}
                            strokeWidth={isOutlier ? 3 : 1}
                          />
                        );
                      }}
                    />
                  </ScatterChart>
                </ResponsiveContainer>

                <div style={{ marginTop: '20px' }}>
                  <h4>Detected Outliers (Income):</h4>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {outlierData.filter(d => d.isOutlier).map(d => (
                      <div key={d.id} style={{ 
                        background: '#ffebee', 
                        padding: '10px', 
                        borderRadius: '5px',
                        border: '2px solid #e74c3c'
                      }}>
                        <strong>ID {d.id}:</strong> ${d.income?.toLocaleString()} 🚨
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ background: '#e1f5fe', padding: '15px', borderRadius: '8px', border: '2px solid #03a9f4' }}>
                <h4 style={{ marginTop: 0 }}>🤔 Should You Remove Outliers?</h4>
                <ul style={{ marginBottom: 0 }}>
                  <li>✅ <strong>YES if:</strong> It's a data entry error (age = 200, temperature = 500°C)</li>
                  <li>❌ <strong>NO if:</strong> It's real data (CEO salary, rare disease case)</li>
                  <li>🎨 <strong>TRANSFORM instead:</strong> Use log transformation or robust scaling</li>
                  <li>🔍 <strong>Investigate:</strong> Outliers often reveal interesting patterns!</li>
                </ul>
              </div>
            </div>
          )}

          {/* SCALING TAB */}
          {activeTab === 'scaling' && (
            <div>
              <h2 style={{ color: '#667eea', marginBottom: '20px' }}>📏 Feature Scaling</h2>
              
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                <h3 style={{ color: '#764ba2' }}>⚖️ Compare Scaling Methods</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '20px' }}>
                  {[
                    { 
                      value: 'minmax', 
                      label: 'Min-Max Scaling',
                      formula: '(x - min) / (max - min)',
                      range: 'Output: [0, 1]',
                      use: 'Neural Networks, Images'
                    },
                    { 
                      value: 'standard', 
                      label: 'Standardization',
                      formula: '(x - mean) / std',
                      range: 'Mean=0, Std=1',
                      use: 'Linear Models, SVM'
                    },
                    { 
                      value: 'robust', 
                      label: 'Robust Scaling',
                      formula: '(x - median) / IQR',
                      range: 'Outlier-resistant',
                      use: 'Data with outliers'
                    }
                  ].map(method => (
                    <button
                      key={method.value}
                      onClick={() => setScalingMethod(method.value)}
                      style={{
                        padding: '15px',
                        border: scalingMethod === method.value ? '3px solid #667eea' : '2px solid #ddd',
                        borderRadius: '8px',
                        background: scalingMethod === method.value ? '#e8eaff' : 'white',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '5px' }}>
                        {method.label}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666', fontFamily: 'monospace', marginBottom: '5px' }}>
                        {method.formula}
                      </div>
                      <div style={{ fontSize: '11px', color: '#888' }}>
                        {method.range}
                      </div>
                      <div style={{ fontSize: '11px', color: '#27ae60', marginTop: '5px' }}>
                        ✓ {method.use}
                      </div>
                    </button>
                  ))}
                </div>

                <div style={{ overflow: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <thead style={{ background: '#667eea', color: 'white' }}>
                      <tr>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Age (Original)</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Age (Scaled)</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Income (Original)</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Income (Scaled)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scaledData.slice(0, 8).map(row => (
                        <tr key={row.id}>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.id}</td>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', background: '#f0f0f0' }}>
                            {row.age}
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', background: '#e8f5e9', fontWeight: 'bold' }}>
                            {row.age_scaled}
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', background: '#f0f0f0' }}>
                            ${row.income?.toLocaleString()}
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', background: '#e8f5e9', fontWeight: 'bold' }}>
                            {row.income_scaled}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ background: '#fff3cd', padding: '15px', borderRadius: '8px', border: '2px solid #ffc107' }}>
                <h4 style={{ marginTop: 0 }}>🎯 When to Scale?</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <strong style={{ color: '#27ae60' }}>✅ MUST Scale:</strong>
                    <ul style={{ marginTop: '5px', marginBottom: 0 }}>
                      <li>K-Nearest Neighbors (KNN)</li>
                      <li>Support Vector Machines (SVM)</li>
                      <li>Neural Networks</li>
                      <li>PCA / Dimensionality Reduction</li>
                      <li>Gradient Descent algorithms</li>
                    </ul>
                  </div>
                  <div>
                    <strong style={{ color: '#e74c3c' }}>❌ NO Scaling Needed:</strong>
                    <ul style={{ marginTop: '5px', marginBottom: 0 }}>
                      <li>Decision Trees</li>
                      <li>Random Forests</li>
                      <li>Gradient Boosting (XGBoost, LightGBM)</li>
                      <li>Naive Bayes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* EDA TAB */}
          {activeTab === 'eda' && (
            <div>
              <h2 style={{ color: '#667eea', marginBottom: '20px' }}>📊 Exploratory Data Analysis</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
                
                {/* Distribution Chart */}
                <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                  <h3 style={{ color: '#764ba2', marginTop: 0 }}>📈 Distribution Analysis</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={distributionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="bin" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#667eea" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                    <strong>Insights:</strong>
                    <ul style={{ marginTop: '5px' }}>
                      <li>Shape: Near normal distribution (bell curve)</li>
                      <li>Peak: 30-35 age range (most common)</li>
                      <li>No extreme skewness detected</li>
                    </ul>
                  </div>
                </div>

                {/* Correlation Matrix */}
                <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                  <h3 style={{ color: '#764ba2', marginTop: 0 }}>🔗 Correlation Matrix</h3>
                  <div style={{ display: 'grid', gap: '10px' }}>
                    {correlationData.map((item, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        background: '#f8f9fa',
                        borderRadius: '5px'
                      }}>
                        <div style={{ flex: 1 }}>
                          <strong>{item.feature1}</strong> ↔ <strong>{item.feature2}</strong>
                        </div>
                        <div style={{ width: '150px' }}>
                          <div style={{
                            height: '20px',
                            background: item.correlation > 0 ? 
                              `linear-gradient(90deg, #fff 0%, #27ae60 ${Math.abs(item.correlation * 100)}%)` :
                              `linear-gradient(90deg, #e74c3c ${Math.abs(item.correlation * 100)}%, #fff 100%)`,
                            borderRadius: '10px',
                            border: '1px solid #ddd'
                          }}></div>
                        </div>
                        <div style={{ 
                          marginLeft: '10px', 
                          fontWeight: 'bold',
                          color: item.correlation > 0.7 ? '#27ae60' : item.correlation > 0.4 ? '#f39c12' : '#95a5a6'
                        }}>
                          {item.correlation.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '15px', fontSize: '14px' }}>
                    <strong>Legend:</strong>
                    <div style={{ display: 'flex', gap: '15px', marginTop: '5px' }}>
                      <span>🟢 Strong (&gt;0.7)</span>
                      <span>🟡 Moderate (0.4-0.7)</span>
                      <span>⚪ Weak (&lt;0.4)</span>
                    </div>
                  </div>
                </div>

                {/* Summary Statistics */}
                <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                  <h3 style={{ color: '#764ba2', marginTop: 0 }}>📋 Summary Statistics</h3>
                  <table style={{ width: '100%', fontSize: '14px' }}>
                    <thead>
                      <tr style={{ background: '#f8f9fa' }}>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Metric</th>
                        <th style={{ padding: '8px', textAlign: 'right' }}>Age</th>
                        <th style={{ padding: '8px', textAlign: 'right' }}>Income</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ padding: '8px' }}>Count</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>8</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>8</td>
                      </tr>
                      <tr style={{ background: '#f8f9fa' }}>
                        <td style={{ padding: '8px' }}>Mean</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>36.6</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>$74,750</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '8px' }}>Median</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>33.0</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>$51,500</td>
                      </tr>
                      <tr style={{ background: '#f8f9fa' }}>
                        <td style={{ padding: '8px' }}>Std Dev</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>9.8</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>$68,124</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '8px' }}>Min</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>25</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>$30,000</td>
                      </tr>
                      <tr style={{ background: '#f8f9fa' }}>
                        <td style={{ padding: '8px' }}>Max</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>50</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>$250,000</td>
                      </tr>
                    </tbody>
                  </table>
                  <div style={{ marginTop: '10px', padding: '10px', background: '#e8f5e9', borderRadius: '5px', fontSize: '13px' }}>
                    💡 <strong>Notice:</strong> Mean income ($74,750) is much higher than median ($51,500) → indicates right skew (outliers pulling up the average)
                  </div>
                </div>

                {/* Visualization Principles */}
                <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                  <h3 style={{ color: '#764ba2', marginTop: 0 }}>🎨 Visualization Best Practices</h3>
                  <div style={{ fontSize: '14px' }}>
                    <div style={{ marginBottom: '15px' }}>
                      <strong style={{ color: '#667eea' }}>1. Choose the Right Chart</strong>
                      <ul style={{ marginTop: '5px', marginBottom: 0 }}>
                        <li><strong>Histogram:</strong> Distribution of single variable</li>
                        <li><strong>Scatter:</strong> Relationship between two variables</li>
                        <li><strong>Box Plot:</strong> Compare distributions & outliers</li>
                        <li><strong>Heatmap:</strong> Correlations between many features</li>
                      </ul>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <strong style={{ color: '#667eea' }}>2. Make It Clear</strong>
                      <ul style={{ marginTop: '5px', marginBottom: 0 }}>
                        <li>Label axes clearly</li>
                        <li>Add titles and legends</li>
                        <li>Use colorblind-friendly palettes</li>
                        <li>Avoid chart junk (unnecessary decoration)</li>
                      </ul>
                    </div>
                    <div>
                      <strong style={{ color: '#667eea' }}>3. Tell a Story</strong>
                      <ul style={{ marginTop: '5px', marginBottom: 0 }}>
                        <li>Highlight key insights</li>
                        <li>Add annotations for important points</li>
                        <li>Compare before/after</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FEATURE ENGINEERING TAB */}
          {activeTab === 'features' && (
            <div>
              <h2 style={{ color: '#667eea', marginBottom: '20px' }}>✨ Feature Engineering Magic</h2>
              
              <div style={{ display: 'grid', gap: '20px' }}>
                
                {/* Transformation Examples */}
                <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                  <h3 style={{ color: '#764ba2' }}>🔄 Feature Transformations</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
                    
                    <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                      <h4 style={{ color: '#e74c3c', marginTop: 0 }}>📊 Log Transform</h4>
                      <div style={{ fontSize: '14px' }}>
                        <strong>Use case:</strong> Skewed data (income, house prices)
                        <div style={{ fontFamily: 'monospace', background: '#2c3e50', color: '#ecf0f1', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
                          log_income = log(income + 1)
                        </div>
                        <div style={{ marginTop: '10px' }}>
                          <strong>Before:</strong> [30k, 50k, 5M] - huge range!<br/>
                          <strong>After:</strong> [10.3, 10.8, 15.4] - normalized
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                      <h4 style={{ color: '#27ae60', marginTop: 0 }}>🔢 Polynomial Features</h4>
                      <div style={{ fontSize: '14px' }}>
                        <strong>Use case:</strong> Capture non-linear relationships
                        <div style={{ fontFamily: 'monospace', background: '#2c3e50', color: '#ecf0f1', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
                          age² = age × age<br/>
                          age × income
                        </div>
                        <div style={{ marginTop: '10px' }}>
                          Example: House price = f(sqft²) not just f(sqft)
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                      <h4 style={{ color: '#3498db', marginTop: 0 }}>📦 Binning</h4>
                      <div style={{ fontSize: '14px' }}>
                        <strong>Use case:</strong> Convert continuous → categorical
                        <div style={{ fontFamily: 'monospace', background: '#2c3e50', color: '#ecf0f1', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
                          Age → Age_Group<br/>
                          [0-18] = 'Young'<br/>
                          [19-35] = 'Adult'<br/>
                          [36+] = 'Senior'
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date/Time Features */}
                <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                  <h3 style={{ color: '#764ba2' }}>📅 Date/Time Feature Extraction</h3>
                  <div style={{ fontSize: '14px' }}>
                    <p>From a single date field, extract multiple useful features:</p>
                    <div style={{ background: '#2c3e50', color: '#ecf0f1', padding: '15px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '13px' }}>
                      date = '2024-06-15'<br/>
                      <br/>
                      ✓ year = 2024<br/>
                      ✓ month = 6<br/>
                      ✓ day = 15<br/>
                      ✓ day_of_week = 5 (Saturday)<br/>
                      ✓ is_weekend = 1 (True)<br/>
                      ✓ quarter = 2 (Q2)<br/>
                      ✓ is_holiday_season = 0 (False)<br/>
                      ✓ days_since_start = 166
                    </div>
                    <div style={{ marginTop: '15px', padding: '10px', background: '#e8f5e9', borderRadius: '5px' }}>
                      💡 <strong>Why this matters:</strong> Sales patterns differ on weekends, holidays have unique behavior, seasonal trends emerge!
                    </div>
                  </div>
                </div>

                {/* Text Features */}
                <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                  <h3 style={{ color: '#764ba2' }}>📝 Text Feature Engineering</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '14px' }}>
                    <div>
                      <strong style={{ color: '#667eea' }}>Simple Features:</strong>
                      <ul style={{ marginTop: '5px' }}>
                        <li>Text length (# of characters)</li>
                        <li>Word count</li>
                        <li>Average word length</li>
                        <li># of uppercase words</li>
                        <li># of punctuation marks</li>
                        <li>Presence of specific keywords</li>
                      </ul>
                    </div>
                    <div>
                      <strong style={{ color: '#667eea' }}>Advanced Features:</strong>
                      <ul style={{ marginTop: '5px' }}>
                        <li>Bag of Words (word frequencies)</li>
                        <li>TF-IDF (term importance)</li>
                        <li>Word embeddings (Word2Vec)</li>
                        <li>Sentiment scores</li>
                        <li>Named entity counts</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Interaction Features */}
                <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                  <h3 style={{ color: '#764ba2' }}>🔗 Interaction Features</h3>
                  <p style={{ fontSize: '14px' }}>Combine features to capture relationships:</p>
                  <div style={{ background: '#fff3cd', padding: '15px', borderRadius: '8px', marginTop: '10px' }}>
                    <strong>Example: House Price Prediction</strong>
                    <div style={{ marginTop: '10px', fontFamily: 'monospace', fontSize: '13px' }}>
                      Original features:<br/>
                      • sqft = 2000<br/>
                      • bedrooms = 3<br/>
                      • age = 10<br/>
                      <br/>
                      <strong style={{ color: '#27ae60' }}>Create interactions:</strong><br/>
                      • sqft_per_bedroom = 2000 / 3 = 666.67<br/>
                      • sqft_age_ratio = 2000 / 10 = 200<br/>
                      • price_per_sqft = price / sqft<br/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FEATURE SELECTION TAB */}
          {activeTab === 'selection' && (
            <div>
              <h2 style={{ color: '#667eea', marginBottom: '20px' }}>🎯 Feature Selection Strategies</h2>
              
              <div style={{ display: 'grid', gap: '20px' }}>
                
                {/* Three Methods */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
                  
                  <div style={{ background: 'white', padding: '20px', borderRadius: '10px', border: '3px solid #3498db' }}>
                    <h3 style={{ color: '#3498db', marginTop: 0 }}>1️⃣ Filter Methods</h3>
                    <div style={{ fontSize: '14px' }}>
                      <p><strong>How it works:</strong> Use statistical tests to rank features</p>
                      <div style={{ background: '#ecf0f1', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                        <strong>Tests used:</strong>
                        <ul style={{ marginBottom: 0 }}>
                          <li>Correlation coefficient</li>
                          <li>Chi-square test</li>
                          <li>ANOVA F-test</li>
                          <li>Mutual information</li>
                        </ul>
                      </div>
                      <div style={{ padding: '10px', background: '#d5f4e6', borderRadius: '5px' }}>
                        <strong style={{ color: '#27ae60' }}>✓ Pros:</strong> Fast, simple, works before modeling
                      </div>
                      <div style={{ padding: '10px', background: '#fadbd8', borderRadius: '5px', marginTop: '5px' }}>
                        <strong style={{ color: '#e74c3c' }}>✗ Cons:</strong> Ignores feature interactions
                      </div>
                    </div>
                  </div>

                  <div style={{ background: 'white', padding: '20px', borderRadius: '10px', border: '3px solid #9b59b6' }}>
                    <h3 style={{ color: '#9b59b6', marginTop: 0 }}>2️⃣ Wrapper Methods</h3>
                    <div style={{ fontSize: '14px' }}>
                      <p><strong>How it works:</strong> Try different feature subsets with actual model</p>
                      <div style={{ background: '#ecf0f1', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                        <strong>Techniques:</strong>
                        <ul style={{ marginBottom: 0 }}>
                          <li>Forward selection</li>
                          <li>Backward elimination</li>
                          <li>Recursive feature elimination (RFE)</li>
                        </ul>
                      </div>
                      <div style={{ padding: '10px', background: '#d5f4e6', borderRadius: '5px' }}>
                        <strong style={{ color: '#27ae60' }}>✓ Pros:</strong> Considers feature interactions
                      </div>
                      <div style={{ padding: '10px', background: '#fadbd8', borderRadius: '5px', marginTop: '5px' }}>
                        <strong style={{ color: '#e74c3c' }}>✗ Cons:</strong> Computationally expensive
                      </div>
                    </div>
                  </div>

                  <div style={{ background: 'white', padding: '20px', borderRadius: '10px', border: '3px solid #e67e22' }}>
                    <h3 style={{ color: '#e67e22', marginTop: 0 }}>3️⃣ Embedded Methods</h3>
                    <div style={{ fontSize: '14px' }}>
                      <p><strong>How it works:</strong> Feature selection during model training</p>
                      <div style={{ background: '#ecf0f1', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                        <strong>Techniques:</strong>
                        <ul style={{ marginBottom: 0 }}>
                          <li>Lasso (L1 regularization)</li>
                          <li>Random Forest importance</li>
                          <li>XGBoost feature scores</li>
                        </ul>
                      </div>
                      <div style={{ padding: '10px', background: '#d5f4e6', borderRadius: '5px' }}>
                        <strong style={{ color: '#27ae60' }}>✓ Pros:</strong> Fast, model-aware, automatic
                      </div>
                      <div style={{ padding: '10px', background: '#fadbd8', borderRadius: '5px', marginTop: '5px' }}>
                        <strong style={{ color: '#e74c3c' }}>✗ Cons:</strong> Model-specific results
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature Importance Example */}
                <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                  <h3 style={{ color: '#764ba2' }}>📊 Feature Importance Ranking</h3>
                  <div style={{ fontSize: '14px' }}>
                    <p>Example from Random Forest model:</p>
                    {[
                      { feature: 'income', importance: 0.42, rank: 1 },
                      { feature: 'age', importance: 0.28, rank: 2 },
                      { feature: 'score', importance: 0.18, rank: 3 },
                      { feature: 'gender', importance: 0.08, rank: 4 },
                      { feature: 'city', importance: 0.04, rank: 5 }
                    ].map(item => (
                      <div key={item.feature} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '10px',
                        padding: '10px',
                        background: item.importance > 0.3 ? '#e8f5e9' : item.importance > 0.15 ? '#fff3cd' : '#f8f9fa',
                        borderRadius: '5px'
                      }}>
                        <div style={{ width: '100px', fontWeight: 'bold' }}>
                          #{item.rank} {item.feature}
                        </div>
                        <div style={{ flex: 1, margin: '0 15px' }}>
                          <div style={{
                            height: '25px',
                            width: `${item.importance * 100}%`,
                            background: item.importance > 0.3 ? '#27ae60' : item.importance > 0.15 ? '#f39c12' : '#95a5a6',
                            borderRadius: '12px',
                            transition: 'width 0.3s'
                          }}></div>
                        </div>
                        <div style={{ width: '60px', fontWeight: 'bold', textAlign: 'right' }}>
                          {(item.importance * 100).toFixed(1)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decision Guide */}
                <div style={{ background: '#e8f5e9', padding: '20px', borderRadius: '10px', border: '2px solid #27ae60' }}>
                  <h3 style={{ color: '#27ae60', marginTop: 0 }}>🎓 When to Use Each Method?</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', fontSize: '14px' }}>
                    <div>
                      <strong style={{ color: '#3498db' }}>Use Filter Methods when:</strong>
                      <ul style={{ marginTop: '5px' }}>
                        <li>You have many features (&gt;1000)</li>
                        <li>Need quick initial screening</li>
                        <li>Want model-agnostic results</li>
                      </ul>
                    </div>
                    <div>
                      <strong style={{ color: '#9b59b6' }}>Use Wrapper Methods when:</strong>
                      <ul style={{ marginTop: '5px' }}>
                        <li>Have moderate # of features</li>
                        <li>Can afford computation time</li>
                        <li>Need best possible accuracy</li>
                      </ul>
                    </div>
                    <div>
                      <strong style={{ color: '#e67e22' }}>Use Embedded Methods when:</strong>
                      <ul style={{ marginTop: '5px' }}>
                        <li>Using tree-based models</li>
                        <li>Want automatic selection</li>
                        <li>Need balance of speed & quality</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Dimensionality Reduction */}
                <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                  <h3 style={{ color: '#764ba2' }}>🎨 Dimensionality Reduction: The Big Picture</h3>
                  <div style={{ fontSize: '14px' }}>
                    <p><strong>Goal:</strong> Reduce # of features while keeping important information</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                      <div style={{ padding: '15px', background: '#e3f2fd', borderRadius: '8px' }}>
                        <h4 style={{ marginTop: 0, color: '#1976d2' }}>📊 PCA (Principal Component Analysis)</h4>
                        <ul style={{ marginBottom: 0 }}>
                          <li><strong>What:</strong> Finds new axes that capture most variance</li>
                          <li><strong>Result:</strong> 100 features → 10 components</li>
                          <li><strong>Use:</strong> Visualization, noise reduction</li>
                          <li><strong>Caveat:</strong> New features are combinations (harder to interpret)</li>
                        </ul>
                      </div>
                      
                      <div style={{ padding: '15px', background: '#fce4ec', borderRadius: '8px' }}>
                        <h4 style={{ marginTop: 0, color: '#c2185b' }}>🎯 t-SNE</h4>
                        <ul style={{ marginBottom: 0 }}>
                          <li><strong>What:</strong> Preserves local structure/clusters</li>
                          <li><strong>Result:</strong> Great 2D/3D visualizations</li>
                          <li><strong>Use:</strong> Exploratory visualization only</li>
                          <li><strong>Caveat:</strong> Don't use for modeling!</li>
                        </ul>
                      </div>
                    </div>

                    <div style={{ marginTop: '15px', padding: '15px', background: '#fff3cd', borderRadius: '8px' }}>
                      <strong>⚠️ Curse of Dimensionality:</strong>
                      <p style={{ marginTop: '5px', marginBottom: 0 }}>
                        With 10 features and 1000 samples, you're fine. With 1000 features and 1000 samples, your model will overfit! 
                        Rule of thumb: aim for at least 10 samples per feature.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '10px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ marginTop: 0 }}>🎓 Key Takeaways</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', fontSize: '14px' }}>
            <div>
              <strong>1. Clean First</strong>
              <p style={{ fontSize: '12px', margin: '5px 0 0 0' }}>Handle missing values and outliers before anything else</p>
            </div>
            <div>
              <strong>2. Always Scale</strong>
              <p style={{ fontSize: '12px', margin: '5px 0 0 0' }}>For distance-based algorithms (KNN, SVM, NN)</p>
            </div>
            <div>
              <strong>3. Visualize Everything</strong>
              <p style={{ fontSize: '12px', margin: '5px 0 0 0' }}>EDA reveals patterns you'd never find in tables</p>
            </div>
            <div>
              <strong>4. Engineer Features</strong>
              <p style={{ fontSize: '12px', margin: '5px 0 0 0' }}>Often more important than the algorithm</p>
            </div>
            <div>
              <strong>5. Select Wisely</strong>
              <p style={{ fontSize: '12px', margin: '5px 0 0 0' }}>More features ≠ better model</p>
            </div>
            <div>
              <strong>6. Iterate</strong>
              <p style={{ fontSize: '12px', margin: '5px 0 0 0' }}>Data preprocessing is rarely a one-time task</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// ============================================================
// FILE: 2. Data Preprocessing Rev
// ============================================================


const DataPreprocessingLearningToolRev = () => {
  const [activeTab, setActiveTab] = useState('missing');
  const [missingStrategy, setMissingStrategy] = useState('mean');
  const [scalingMethod, setScalingMethod] = useState('minmax');
  const [outlierMethod, setOutlierMethod] = useState('iqr');

  // Sample data for demonstrations
  const [rawData, setRawData] = useState([
    { id: 1, age: 25, income: 30000, score: 85 },
    { id: 2, age: 30, income: null, score: 90 },
    { id: 3, age: null, income: 45000, score: 78 },
    { id: 4, age: 40, income: 60000, score: 95 },
    { id: 5, age: 45, income: 55000, score: null },
    { id: 6, age: 50, income: 70000, score: 88 },
    { id: 7, age: 35, income: 250000, score: 92 }, // Outlier
    { id: 8, age: 28, income: 48000, score: 86 },
  ]);

  // Handle missing values
  const handleMissingValues = (data, strategy) => {
    const result = JSON.parse(JSON.stringify(data));
    
    ['age', 'income', 'score'].forEach(field => {
      const values = result.filter(d => d[field] !== null).map(d => d[field]);
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      const median = values.sort((a, b) => a - b)[Math.floor(values.length / 2)];
      
      result.forEach(row => {
        if (row[field] === null) {
          if (strategy === 'mean') row[field] = Math.round(mean);
          else if (strategy === 'median') row[field] = Math.round(median);
          else if (strategy === 'drop') row[field] = 'DROPPED';
          else if (strategy === 'zero') row[field] = 0;
        }
      });
    });
    
    return result;
  };

  // Scaling functions
  const scaleData = (data, method) => {
    const result = JSON.parse(JSON.stringify(data));
    const fields = ['age', 'income', 'score'];
    
    fields.forEach(field => {
      const values = result.map(d => d[field]).filter(v => typeof v === 'number');
      const min = Math.min(...values);
      const max = Math.max(...values);
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      const std = Math.sqrt(values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length);
      
      result.forEach(row => {
        if (typeof row[field] === 'number') {
          if (method === 'minmax') {
            row[`${field}_scaled`] = ((row[field] - min) / (max - min)).toFixed(3);
          } else if (method === 'standard') {
            row[`${field}_scaled`] = ((row[field] - mean) / std).toFixed(3);
          } else if (method === 'robust') {
            const median = values.sort((a, b) => a - b)[Math.floor(values.length / 2)];
            const q1 = values[Math.floor(values.length * 0.25)];
            const q3 = values[Math.floor(values.length * 0.75)];
            const iqr = q3 - q1;
            row[`${field}_scaled`] = ((row[field] - median) / iqr).toFixed(3);
          }
        }
      });
    });
    
    return result;
  };

  // Detect outliers
  const detectOutliers = (data, method) => {
    const result = JSON.parse(JSON.stringify(data));
    const field = 'income';
    const values = result.map(d => d[field]).filter(v => typeof v === 'number');
    
    if (method === 'iqr') {
      const sorted = values.sort((a, b) => a - b);
      const q1 = sorted[Math.floor(sorted.length * 0.25)];
      const q3 = sorted[Math.floor(sorted.length * 0.75)];
      const iqr = q3 - q1;
      const lowerBound = q1 - 1.5 * iqr;
      const upperBound = q3 + 1.5 * iqr;
      
      result.forEach(row => {
        if (typeof row[field] === 'number') {
          row.isOutlier = row[field] < lowerBound || row[field] > upperBound;
        }
      });
    } else if (method === 'zscore') {
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      const std = Math.sqrt(values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length);
      
      result.forEach(row => {
        if (typeof row[field] === 'number') {
          const zscore = Math.abs((row[field] - mean) / std);
          row.isOutlier = zscore > 3;
        }
      });
    }
    
    return result;
  };

  // Correlation data
  const correlationData = [
    { feature1: 'Age', feature2: 'Income', correlation: 0.85 },
    { feature1: 'Age', feature2: 'Score', correlation: 0.23 },
    { feature1: 'Income', feature2: 'Score', correlation: 0.45 },
  ];

  // Distribution data
  const distributionData = [
    { bin: '20-25', count: 15 },
    { bin: '25-30', count: 25 },
    { bin: '30-35', count: 40 },
    { bin: '35-40', count: 35 },
    { bin: '40-45', count: 30 },
    { bin: '45-50', count: 20 },
    { bin: '50+', count: 10 },
  ];

  const processedData = handleMissingValues(rawData, missingStrategy);
  const scaledData = scaleData(processedData, scalingMethod);
  const outlierData = detectOutliers(rawData, outlierMethod);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1400px', margin: '0 auto', padding: '20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      <div style={{ background: 'white', borderRadius: '15px', padding: '30px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '42px', color: '#667eea', marginBottom: '10px', fontWeight: 'bold' }}>
            🎢 Data Preprocessing & EDA Interactive Lab
          </h1>
          <p style={{ fontSize: '18px', color: '#666' }}>
            Learn by doing! Explore data preprocessing, cleaning, and analysis with live examples
          </p>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { id: 'missing', label: '🔍 Missing Values', icon: '❓' },
            { id: 'outliers', label: '🎯 Outliers', icon: '📊' },
            { id: 'scaling', label: '📏 Scaling', icon: '⚖️' },
            { id: 'eda', label: '📈 EDA', icon: '🔬' },
            { id: 'features', label: '🎨 Feature Engineering', icon: '✨' },
            { id: 'selection', label: '🎯 Feature Selection', icon: '🎪' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: '10px',
                background: activeTab === tab.id ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#f0f0f0',
                color: activeTab === tab.id ? 'white' : '#333',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'all 0.3s',
                boxShadow: activeTab === tab.id ? '0 4px 15px rgba(102,126,234,0.4)' : 'none'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div style={{ background: '#f8f9fa', padding: '30px', borderRadius: '10px', minHeight: '500px' }}>
          
          {/* MISSING VALUES TAB */}
          {activeTab === 'missing' && (
            <div>
              <h2 style={{ color: '#667eea', marginBottom: '20px' }}>👻 Handling Missing Values</h2>
              
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                <h3 style={{ color: '#764ba2' }}>🎮 Interactive Demo</h3>
                <p style={{ marginBottom: '15px' }}>Select a strategy to handle missing values (null) in our dataset:</p>
                
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  {[
                    { value: 'mean', label: '📊 Mean Imputation', desc: 'Replace with average' },
                    { value: 'median', label: '📈 Median Imputation', desc: 'Replace with middle value' },
                    { value: 'zero', label: '0️⃣ Zero Fill', desc: 'Replace with 0' },
                    { value: 'drop', label: '🗑️ Drop', desc: 'Mark for deletion' }
                  ].map(strategy => (
                    <button
                      key={strategy.value}
                      onClick={() => setMissingStrategy(strategy.value)}
                      style={{
                        padding: '10px 20px',
                        border: missingStrategy === strategy.value ? '3px solid #667eea' : '2px solid #ddd',
                        borderRadius: '8px',
                        background: missingStrategy === strategy.value ? '#e8eaff' : 'white',
                        cursor: 'pointer',
                        flex: '1',
                        minWidth: '150px'
                      }}
                    >
                      <div style={{ fontWeight: 'bold' }}>{strategy.label}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>{strategy.desc}</div>
                    </button>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <h4 style={{ color: '#e74c3c' }}>❌ Before (with nulls)</h4>
                    <div style={{ overflow: 'auto', maxHeight: '300px' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                        <thead style={{ background: '#667eea', color: 'white', position: 'sticky', top: 0 }}>
                          <tr>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Age</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Income</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rawData.map(row => (
                            <tr key={row.id}>
                              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.id}</td>
                              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', background: row.age === null ? '#ffebee' : 'white' }}>
                                {row.age === null ? '❌ null' : row.age}
                              </td>
                              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', background: row.income === null ? '#ffebee' : 'white' }}>
                                {row.income === null ? '❌ null' : row.income}
                              </td>
                              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', background: row.score === null ? '#ffebee' : 'white' }}>
                                {row.score === null ? '❌ null' : row.score}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h4 style={{ color: '#27ae60' }}>✅ After ({missingStrategy})</h4>
                    <div style={{ overflow: 'auto', maxHeight: '300px' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                        <thead style={{ background: '#27ae60', color: 'white', position: 'sticky', top: 0 }}>
                          <tr>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Age</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Income</th>
                            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {processedData.map(row => (
                            <tr key={row.id}>
                              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.id}</td>
                              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', background: '#e8f5e9' }}>
                                {row.age}
                              </td>
                              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', background: '#e8f5e9' }}>
                                {row.income}
                              </td>
                              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', background: '#e8f5e9' }}>
                                {row.score}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ background: '#fff3cd', padding: '15px', borderRadius: '8px', border: '2px solid #ffc107' }}>
                <h4 style={{ marginTop: 0 }}>💡 Key Insights:</h4>
                <ul style={{ marginBottom: 0 }}>
                  <li><strong>Mean:</strong> Best for normally distributed data, affected by outliers</li>
                  <li><strong>Median:</strong> Robust to outliers, good for skewed data</li>
                  <li><strong>Zero Fill:</strong> Use only when 0 is meaningful (e.g., "no purchases")</li>
                  <li><strong>Drop:</strong> Only when you have plenty of data and few missing values</li>
                </ul>
              </div>
            </div>
          )}

          {/* OUTLIERS TAB */}
          {activeTab === 'outliers' && (
            <div>
              <h2 style={{ color: '#667eea', marginBottom: '20px' }}>🎸 Detecting Outliers</h2>
              
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                <h3 style={{ color: '#764ba2' }}>🔍 Choose Detection Method</h3>
                
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <button
                    onClick={() => setOutlierMethod('iqr')}
                    style={{
                      padding: '15px',
                      border: outlierMethod === 'iqr' ? '3px solid #667eea' : '2px solid #ddd',
                      borderRadius: '8px',
                      background: outlierMethod === 'iqr' ? '#e8eaff' : 'white',
                      cursor: 'pointer',
                      flex: 1
                    }}
                  >
                    <div style={{ fontWeight: 'bold', fontSize: '18px' }}>📊 IQR Method</div>
                    <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                      Uses quartiles to find fences<br/>
                      Lower Fence = Q1 - 1.5 × IQR<br/>
                      Upper Fence = Q3 + 1.5 × IQR
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setOutlierMethod('zscore')}
                    style={{
                      padding: '15px',
                      border: outlierMethod === 'zscore' ? '3px solid #667eea' : '2px solid #ddd',
                      borderRadius: '8px',
                      background: outlierMethod === 'zscore' ? '#e8eaff' : 'white',
                      cursor: 'pointer',
                      flex: 1
                    }}
                  >
                    <div style={{ fontWeight: 'bold', fontSize: '18px' }}>📈 Z-Score Method</div>
                    <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                      Uses standard deviations<br/>
                      Outlier if |Z-score| &gt; 3<br/>
                      (3 std devs from mean)
                    </div>
                  </button>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="id" name="ID" />
                    <YAxis dataKey="income" name="Income" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter 
                      data={outlierData} 
                      fill="#667eea"
                      shape={(props) => {
                        const { cx, cy, payload } = props;
                        const isOutlier = payload.isOutlier;
                        return (
                          <circle 
                            cx={cx} 
                            cy={cy} 
                            r={isOutlier ? 8 : 5} 
                            fill={isOutlier ? '#e74c3c' : '#667eea'}
                            stroke={isOutlier ? '#c0392b' : '#667eea'}
                            strokeWidth={isOutlier ? 3 : 1}
                          />
                        );
                      }}
                    />
                  </ScatterChart>
                </ResponsiveContainer>

                <div style={{ marginTop: '20px' }}>
                  <h4>Detected Outliers (Income):</h4>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {outlierData.filter(d => d.isOutlier).map(d => (
                      <div key={d.id} style={{ 
                        background: '#ffebee', 
                        padding: '10px', 
                        borderRadius: '5px',
                        border: '2px solid #e74c3c'
                      }}>
                        <strong>ID {d.id}:</strong> ${d.income?.toLocaleString()} 🚨
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ background: '#e1f5fe', padding: '15px', borderRadius: '8px', border: '2px solid #03a9f4' }}>
                <h4 style={{ marginTop: 0 }}>🤔 Should You Remove Outliers?</h4>
                <ul style={{ marginBottom: 0 }}>
                  <li>✅ <strong>YES if:</strong> It's a data entry error (age = 200, temperature = 500°C)</li>
                  <li>❌ <strong>NO if:</strong> It's real data (CEO salary, rare disease case)</li>
                  <li>🎨 <strong>TRANSFORM instead:</strong> Use log transformation or robust scaling</li>
                  <li>🔍 <strong>Investigate:</strong> Outliers often reveal interesting patterns!</li>
                </ul>
              </div>
            </div>
          )}

          {/* SCALING TAB */}
          {activeTab === 'scaling' && (
            <div>
              <h2 style={{ color: '#667eea', marginBottom: '20px' }}>📏 Feature Scaling</h2>
              
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                <h3 style={{ color: '#764ba2' }}>⚖️ Compare Scaling Methods</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '20px' }}>
                  {[
                    { 
                      value: 'minmax', 
                      label: 'Min-Max Scaling',
                      formula: '(x - min) / (max - min)',
                      range: 'Output: [0, 1]',
                      use: 'Neural Networks, Images'
                    },
                    { 
                      value: 'standard', 
                      label: 'Standardization',
                      formula: '(x - mean) / std',
                      range: 'Mean=0, Std=1',
                      use: 'Linear Models, SVM'
                    },
                    { 
                      value: 'robust', 
                      label: 'Robust Scaling',
                      formula: '(x - median) / IQR',
                      range: 'Outlier-resistant',
                      use: 'Data with outliers'
                    }
                  ].map(method => (
                    <button
                      key={method.value}
                      onClick={() => setScalingMethod(method.value)}
                      style={{
                        padding: '15px',
                        border: scalingMethod === method.value ? '3px solid #667eea' : '2px solid #ddd',
                        borderRadius: '8px',
                        background: scalingMethod === method.value ? '#e8eaff' : 'white',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '5px' }}>
                        {method.label}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666', fontFamily: 'monospace', marginBottom: '5px' }}>
                        {method.formula}
                      </div>
                      <div style={{ fontSize: '11px', color: '#888' }}>
                        {method.range}
                      </div>
                      <div style={{ fontSize: '11px', color: '#27ae60', marginTop: '5px' }}>
                        ✓ {method.use}
                      </div>
                    </button>
                  ))}
                </div>

                <div style={{ overflow: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <thead style={{ background: '#667eea', color: 'white' }}>
                      <tr>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Age (Original)</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Age (Scaled)</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Income (Original)</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Income (Scaled)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scaledData.slice(0, 8).map(row => (
                        <tr key={row.id}>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.id}</td>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', background: '#f0f0f0' }}>
                            {row.age}
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', background: '#e8f5e9', fontWeight: 'bold' }}>
                            {row.age_scaled}
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', background: '#f0f0f0' }}>
                            ${row.income?.toLocaleString()}
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', background: '#e8f5e9', fontWeight: 'bold' }}>
                            {row.income_scaled}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ background: '#fff3cd', padding: '15px', borderRadius: '8px', border: '2px solid #ffc107' }}>
                <h4 style={{ marginTop: 0 }}>🎯 When to Scale?</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <strong style={{ color: '#27ae60' }}>✅ MUST Scale:</strong>
                    <ul style={{ marginTop: '5px', marginBottom: 0 }}>
                      <li>K-Nearest Neighbors (KNN)</li>
                      <li>Support Vector Machines (SVM)</li>
                      <li>Neural Networks</li>
                      <li>PCA / Dimensionality Reduction</li>
                      <li>Gradient Descent algorithms</li>
                    </ul>
                  </div>
                  <div>
                    <strong style={{ color: '#e74c3c' }}>❌ NO Scaling Needed:</strong>
                    <ul style={{ marginTop: '5px', marginBottom: 0 }}>
                      <li>Decision Trees</li>
                      <li>Random Forests</li>
                      <li>Gradient Boosting (XGBoost, LightGBM)</li>
                      <li>Naive Bayes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* EDA TAB */}
          {activeTab === 'eda' && (
            <div>
              <h2 style={{ color: '#667eea', marginBottom: '20px' }}>📊 Exploratory Data Analysis</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
                
                {/* Distribution Chart */}
                <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                  <h3 style={{ color: '#764ba2', marginTop: 0 }}>📈 Distribution Analysis</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={distributionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="bin" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#667eea" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                    <strong>Insights:</strong>
                    <ul style={{ marginTop: '5px' }}>
                      <li>Shape: Near normal distribution (bell curve)</li>
                      <li>Peak: 30-35 age range (most common)</li>
                      <li>No extreme skewness detected</li>
                    </ul>
                  </div>
                </div>

                {/* Correlation Matrix */}
                <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                  <h3 style={{ color: '#764ba2', marginTop: 0 }}>🔗 Correlation Matrix</h3>
                  <div style={{ display: 'grid', gap: '10px' }}>
                    {correlationData.map((item, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        background: '#f8f9fa',
                        borderRadius: '5px'
                      }}>
                        <div style={{ flex: 1 }}>
                          <strong>{item.feature1}</strong> ↔ <strong>{item.feature2}</strong>
                        </div>
                        <div style={{ width: '150px' }}>
                          <div style={{
                            height: '20px',
                            background: item.correlation > 0 ? 
                              `linear-gradient(90deg, #fff 0%, #27ae60 ${Math.abs(item.correlation * 100)}%)` :
                              `linear-gradient(90deg, #e74c3c ${Math.abs(item.correlation * 100)}%, #fff 100%)`,
                            borderRadius: '10px',
                            border: '1px solid #ddd'
                          }}></div>
                        </div>
                        <div style={{ 
                          marginLeft: '10px', 
                          fontWeight: 'bold',
                          color: item.correlation > 0.7 ? '#27ae60' : item.correlation > 0.4 ? '#f39c12' : '#95a5a6'
                        }}>
                          {item.correlation.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '15px', fontSize: '14px' }}>
                    <strong>Legend:</strong>
                    <div style={{ display: 'flex', gap: '15px', marginTop: '5px' }}>
                      <span>🟢 Strong (&gt;0.7)</span>
                      <span>🟡 Moderate (0.4-0.7)</span>
                      <span>⚪ Weak (&lt;0.4)</span>
                    </div>
                  </div>
                </div>

                {/* Summary Statistics */}
                <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                  <h3 style={{ color: '#764ba2', marginTop: 0 }}>📋 Summary Statistics</h3>
                  <table style={{ width: '100%', fontSize: '14px' }}>
                    <thead>
                      <tr style={{ background: '#f8f9fa' }}>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Metric</th>
                        <th style={{ padding: '8px', textAlign: 'right' }}>Age</th>
                        <th style={{ padding: '8px', textAlign: 'right' }}>Income</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ padding: '8px' }}>Count</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>8</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>8</td>
                      </tr>
                      <tr style={{ background: '#f8f9fa' }}>
                        <td style={{ padding: '8px' }}>Mean</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>36.6</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>$74,750</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '8px' }}>Median</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>33.0</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>$51,500</td>
                      </tr>
                      <tr style={{ background: '#f8f9fa' }}>
                        <td style={{ padding: '8px' }}>Std Dev</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>9.8</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>$68,124</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '8px' }}>Min</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>25</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>$30,000</td>
                      </tr>
                      <tr style={{ background: '#f8f9fa' }}>
                        <td style={{ padding: '8px' }}>Max</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>50</td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>$250,000</td>
                      </tr>
                    </tbody>
                  </table>
                  <div style={{ marginTop: '10px', padding: '10px', background: '#e8f5e9', borderRadius: '5px', fontSize: '13px' }}>
                    💡 <strong>Notice:</strong> Mean income ($74,750) is much higher than median ($51,500) → indicates right skew (outliers pulling up the average)
                  </div>
                </div>

                {/* Visualization Principles */}
                <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                  <h3 style={{ color: '#764ba2', marginTop: 0 }}>🎨 Visualization Best Practices</h3>
                  <div style={{ fontSize: '14px' }}>
                    <div style={{ marginBottom: '15px' }}>
                      <strong style={{ color: '#667eea' }}>1. Choose the Right Chart</strong>
                      <ul style={{ marginTop: '5px', marginBottom: 0 }}>
                        <li><strong>Histogram:</strong> Distribution of single variable</li>
                        <li><strong>Scatter:</strong> Relationship between two variables</li>
                        <li><strong>Box Plot:</strong> Compare distributions & outliers</li>
                        <li><strong>Heatmap:</strong> Correlations between many features</li>
                      </ul>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <strong style={{ color: '#667eea' }}>2. Make It Clear</strong>
                      <ul style={{ marginTop: '5px', marginBottom: 0 }}>
                        <li>Label axes clearly</li>
                        <li>Add titles and legends</li>
                        <li>Use colorblind-friendly palettes</li>
                        <li>Avoid chart junk (unnecessary decoration)</li>
                      </ul>
                    </div>
                    <div>
                      <strong style={{ color: '#667eea' }}>3. Tell a Story</strong>
                      <ul style={{ marginTop: '5px', marginBottom: 0 }}>
                        <li>Highlight key insights</li>
                        <li>Add annotations for important points</li>
                        <li>Compare before/after</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FEATURE ENGINEERING TAB */}
          {activeTab === 'features' && (
            <div>
              <h2 style={{ color: '#667eea', marginBottom: '20px' }}>✨ Feature Engineering Magic</h2>
              
              <div style={{ display: 'grid', gap: '20px' }}>
                
                {/* Transformation Examples */}
                <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                  <h3 style={{ color: '#764ba2' }}>🔄 Feature Transformations</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
                    
                    <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                      <h4 style={{ color: '#e74c3c', marginTop: 0 }}>📊 Log Transform</h4>
                      <div style={{ fontSize: '14px' }}>
                        <strong>Use case:</strong> Skewed data (income, house prices)
                        <div style={{ fontFamily: 'monospace', background: '#2c3e50', color: '#ecf0f1', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
                          log_income = log(income + 1)
                        </div>
                        <div style={{ marginTop: '10px' }}>
                          <strong>Before:</strong> [30k, 50k, 5M] - huge range!<br/>
                          <strong>After:</strong> [10.3, 10.8, 15.4] - normalized
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                      <h4 style={{ color: '#27ae60', marginTop: 0 }}>🔢 Polynomial Features</h4>
                      <div style={{ fontSize: '14px' }}>
                        <strong>Use case:</strong> Capture non-linear relationships
                        <div style={{ fontFamily: 'monospace', background: '#2c3e50', color: '#ecf0f1', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
                          age² = age × age<br/>
                          age × income
                        </div>
                        <div style={{ marginTop: '10px' }}>
                          Example: House price = f(sqft²) not just f(sqft)
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                      <h4 style={{ color: '#3498db', marginTop: 0 }}>📦 Binning</h4>
                      <div style={{ fontSize: '14px' }}>
                        <strong>Use case:</strong> Convert continuous → categorical
                        <div style={{ fontFamily: 'monospace', background: '#2c3e50', color: '#ecf0f1', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
                          Age → Age_Group<br/>
                          [0-18] = 'Young'<br/>
                          [19-35] = 'Adult'<br/>
                          [36+] = 'Senior'
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date/Time Features */}
                <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                  <h3 style={{ color: '#764ba2' }}>📅 Date/Time Feature Extraction</h3>
                  <div style={{ fontSize: '14px' }}>
                    <p>From a single date field, extract multiple useful features:</p>
                    <div style={{ background: '#2c3e50', color: '#ecf0f1', padding: '15px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '13px' }}>
                      date = '2024-06-15'<br/>
                      <br/>
                      ✓ year = 2024<br/>
                      ✓ month = 6<br/>
                      ✓ day = 15<br/>
                      ✓ day_of_week = 5 (Saturday)<br/>
                      ✓ is_weekend = 1 (True)<br/>
                      ✓ quarter = 2 (Q2)<br/>
                      ✓ is_holiday_season = 0 (False)<br/>
                      ✓ days_since_start = 166
                    </div>
                    <div style={{ marginTop: '15px', padding: '10px', background: '#e8f5e9', borderRadius: '5px' }}>
                      💡 <strong>Why this matters:</strong> Sales patterns differ on weekends, holidays have unique behavior, seasonal trends emerge!
                    </div>
                  </div>
                </div>

                {/* Text Features */}
                <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                  <h3 style={{ color: '#764ba2' }}>📝 Text Feature Engineering</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '14px' }}>
                    <div>
                      <strong style={{ color: '#667eea' }}>Simple Features:</strong>
                      <ul style={{ marginTop: '5px' }}>
                        <li>Text length (# of characters)</li>
                        <li>Word count</li>
                        <li>Average word length</li>
                        <li># of uppercase words</li>
                        <li># of punctuation marks</li>
                        <li>Presence of specific keywords</li>
                      </ul>
                    </div>
                    <div>
                      <strong style={{ color: '#667eea' }}>Advanced Features:</strong>
                      <ul style={{ marginTop: '5px' }}>
                        <li>Bag of Words (word frequencies)</li>
                        <li>TF-IDF (term importance)</li>
                        <li>Word embeddings (Word2Vec)</li>
                        <li>Sentiment scores</li>
                        <li>Named entity counts</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Interaction Features */}
                <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                  <h3 style={{ color: '#764ba2' }}>🔗 Interaction Features</h3>
                  <p style={{ fontSize: '14px' }}>Combine features to capture relationships:</p>
                  <div style={{ background: '#fff3cd', padding: '15px', borderRadius: '8px', marginTop: '10px' }}>
                    <strong>Example: House Price Prediction</strong>
                    <div style={{ marginTop: '10px', fontFamily: 'monospace', fontSize: '13px' }}>
                      Original features:<br/>
                      • sqft = 2000<br/>
                      • bedrooms = 3<br/>
                      • age = 10<br/>
                      <br/>
                      <strong style={{ color: '#27ae60' }}>Create interactions:</strong><br/>
                      • sqft_per_bedroom = 2000 / 3 = 666.67<br/>
                      • sqft_age_ratio = 2000 / 10 = 200<br/>
                      • price_per_sqft = price / sqft<br/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FEATURE SELECTION TAB */}
          {activeTab === 'selection' && (
            <div>
              <h2 style={{ color: '#667eea', marginBottom: '20px' }}>🎯 Feature Selection Strategies</h2>
              
              <div style={{ display: 'grid', gap: '20px' }}>
                
                {/* Three Methods */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
                  
                  <div style={{ background: 'white', padding: '20px', borderRadius: '10px', border: '3px solid #3498db' }}>
                    <h3 style={{ color: '#3498db', marginTop: 0 }}>1️⃣ Filter Methods</h3>
                    <div style={{ fontSize: '14px' }}>
                      <p><strong>How it works:</strong> Use statistical tests to rank features</p>
                      <div style={{ background: '#ecf0f1', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                        <strong>Tests used:</strong>
                        <ul style={{ marginBottom: 0 }}>
                          <li>Correlation coefficient</li>
                          <li>Chi-square test</li>
                          <li>ANOVA F-test</li>
                          <li>Mutual information</li>
                        </ul>
                      </div>
                      <div style={{ padding: '10px', background: '#d5f4e6', borderRadius: '5px' }}>
                        <strong style={{ color: '#27ae60' }}>✓ Pros:</strong> Fast, simple, works before modeling
                      </div>
                      <div style={{ padding: '10px', background: '#fadbd8', borderRadius: '5px', marginTop: '5px' }}>
                        <strong style={{ color: '#e74c3c' }}>✗ Cons:</strong> Ignores feature interactions
                      </div>
                    </div>
                  </div>

                  <div style={{ background: 'white', padding: '20px', borderRadius: '10px', border: '3px solid #9b59b6' }}>
                    <h3 style={{ color: '#9b59b6', marginTop: 0 }}>2️⃣ Wrapper Methods</h3>
                    <div style={{ fontSize: '14px' }}>
                      <p><strong>How it works:</strong> Try different feature subsets with actual model</p>
                      <div style={{ background: '#ecf0f1', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                        <strong>Techniques:</strong>
                        <ul style={{ marginBottom: 0 }}>
                          <li>Forward selection</li>
                          <li>Backward elimination</li>
                          <li>Recursive feature elimination (RFE)</li>
                        </ul>
                      </div>
                      <div style={{ padding: '10px', background: '#d5f4e6', borderRadius: '5px' }}>
                        <strong style={{ color: '#27ae60' }}>✓ Pros:</strong> Considers feature interactions
                      </div>
                      <div style={{ padding: '10px', background: '#fadbd8', borderRadius: '5px', marginTop: '5px' }}>
                        <strong style={{ color: '#e74c3c' }}>✗ Cons:</strong> Computationally expensive
                      </div>
                    </div>
                  </div>

                  <div style={{ background: 'white', padding: '20px', borderRadius: '10px', border: '3px solid #e67e22' }}>
                    <h3 style={{ color: '#e67e22', marginTop: 0 }}>3️⃣ Embedded Methods</h3>
                    <div style={{ fontSize: '14px' }}>
                      <p><strong>How it works:</strong> Feature selection during model training</p>
                      <div style={{ background: '#ecf0f1', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                        <strong>Techniques:</strong>
                        <ul style={{ marginBottom: 0 }}>
                          <li>Lasso (L1 regularization)</li>
                          <li>Random Forest importance</li>
                          <li>XGBoost feature scores</li>
                        </ul>
                      </div>
                      <div style={{ padding: '10px', background: '#d5f4e6', borderRadius: '5px' }}>
                        <strong style={{ color: '#27ae60' }}>✓ Pros:</strong> Fast, model-aware, automatic
                      </div>
                      <div style={{ padding: '10px', background: '#fadbd8', borderRadius: '5px', marginTop: '5px' }}>
                        <strong style={{ color: '#e74c3c' }}>✗ Cons:</strong> Model-specific results
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature Importance Example */}
                <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                  <h3 style={{ color: '#764ba2' }}>📊 Feature Importance Ranking</h3>
                  <div style={{ fontSize: '14px' }}>
                    <p>Example from Random Forest model:</p>
                    {[
                      { feature: 'income', importance: 0.42, rank: 1 },
                      { feature: 'age', importance: 0.28, rank: 2 },
                      { feature: 'score', importance: 0.18, rank: 3 },
                      { feature: 'gender', importance: 0.08, rank: 4 },
                      { feature: 'city', importance: 0.04, rank: 5 }
                    ].map(item => (
                      <div key={item.feature} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '10px',
                        padding: '10px',
                        background: item.importance > 0.3 ? '#e8f5e9' : item.importance > 0.15 ? '#fff3cd' : '#f8f9fa',
                        borderRadius: '5px'
                      }}>
                        <div style={{ width: '100px', fontWeight: 'bold' }}>
                          #{item.rank} {item.feature}
                        </div>
                        <div style={{ flex: 1, margin: '0 15px' }}>
                          <div style={{
                            height: '25px',
                            width: `${item.importance * 100}%`,
                            background: item.importance > 0.3 ? '#27ae60' : item.importance > 0.15 ? '#f39c12' : '#95a5a6',
                            borderRadius: '12px',
                            transition: 'width 0.3s'
                          }}></div>
                        </div>
                        <div style={{ width: '60px', fontWeight: 'bold', textAlign: 'right' }}>
                          {(item.importance * 100).toFixed(1)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decision Guide */}
                <div style={{ background: '#e8f5e9', padding: '20px', borderRadius: '10px', border: '2px solid #27ae60' }}>
                  <h3 style={{ color: '#27ae60', marginTop: 0 }}>🎓 When to Use Each Method?</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', fontSize: '14px' }}>
                    <div>
                      <strong style={{ color: '#3498db' }}>Use Filter Methods when:</strong>
                      <ul style={{ marginTop: '5px' }}>
                        <li>You have many features (&gt;1000)</li>
                        <li>Need quick initial screening</li>
                        <li>Want model-agnostic results</li>
                      </ul>
                    </div>
                    <div>
                      <strong style={{ color: '#9b59b6' }}>Use Wrapper Methods when:</strong>
                      <ul style={{ marginTop: '5px' }}>
                        <li>Have moderate # of features</li>
                        <li>Can afford computation time</li>
                        <li>Need best possible accuracy</li>
                      </ul>
                    </div>
                    <div>
                      <strong style={{ color: '#e67e22' }}>Use Embedded Methods when:</strong>
                      <ul style={{ marginTop: '5px' }}>
                        <li>Using tree-based models</li>
                        <li>Want automatic selection</li>
                        <li>Need balance of speed & quality</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Dimensionality Reduction */}
                <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                  <h3 style={{ color: '#764ba2' }}>🎨 Dimensionality Reduction: The Big Picture</h3>
                  <div style={{ fontSize: '14px' }}>
                    <p><strong>Goal:</strong> Reduce # of features while keeping important information</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                      <div style={{ padding: '15px', background: '#e3f2fd', borderRadius: '8px' }}>
                        <h4 style={{ marginTop: 0, color: '#1976d2' }}>📊 PCA (Principal Component Analysis)</h4>
                        <ul style={{ marginBottom: 0 }}>
                          <li><strong>What:</strong> Finds new axes that capture most variance</li>
                          <li><strong>Result:</strong> 100 features → 10 components</li>
                          <li><strong>Use:</strong> Visualization, noise reduction</li>
                          <li><strong>Caveat:</strong> New features are combinations (harder to interpret)</li>
                        </ul>
                      </div>
                      
                      <div style={{ padding: '15px', background: '#fce4ec', borderRadius: '8px' }}>
                        <h4 style={{ marginTop: 0, color: '#c2185b' }}>🎯 t-SNE</h4>
                        <ul style={{ marginBottom: 0 }}>
                          <li><strong>What:</strong> Preserves local structure/clusters</li>
                          <li><strong>Result:</strong> Great 2D/3D visualizations</li>
                          <li><strong>Use:</strong> Exploratory visualization only</li>
                          <li><strong>Caveat:</strong> Don't use for modeling!</li>
                        </ul>
                      </div>
                    </div>

                    <div style={{ marginTop: '15px', padding: '15px', background: '#fff3cd', borderRadius: '8px' }}>
                      <strong>⚠️ Curse of Dimensionality:</strong>
                      <p style={{ marginTop: '5px', marginBottom: 0 }}>
                        With 10 features and 1000 samples, you're fine. With 1000 features and 1000 samples, your model will overfit! 
                        Rule of thumb: aim for at least 10 samples per feature.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '10px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ marginTop: 0 }}>🎓 Key Takeaways</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', fontSize: '14px' }}>
            <div>
              <strong>1. Clean First</strong>
              <p style={{ fontSize: '12px', margin: '5px 0 0 0' }}>Handle missing values and outliers before anything else</p>
            </div>
            <div>
              <strong>2. Always Scale</strong>
              <p style={{ fontSize: '12px', margin: '5px 0 0 0' }}>For distance-based algorithms (KNN, SVM, NN)</p>
            </div>
            <div>
              <strong>3. Visualize Everything</strong>
              <p style={{ fontSize: '12px', margin: '5px 0 0 0' }}>EDA reveals patterns you'd never find in tables</p>
            </div>
            <div>
              <strong>4. Engineer Features</strong>
              <p style={{ fontSize: '12px', margin: '5px 0 0 0' }}>Often more important than the algorithm</p>
            </div>
            <div>
              <strong>5. Select Wisely</strong>
              <p style={{ fontSize: '12px', margin: '5px 0 0 0' }}>More features ≠ better model</p>
            </div>
            <div>
              <strong>6. Iterate</strong>
              <p style={{ fontSize: '12px', margin: '5px 0 0 0' }}>Data preprocessing is rarely a one-time task</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// ============================================================
// FILE: 2. Statistical Analysis
// ============================================================


const StatisticalAnalysisLab = () => {
  const [activeTab, setActiveTab] = useState('eda');
  
  // EDA State
  const [edaData, setEdaData] = useState([12, 15, 14, 10, 18, 20, 16, 14, 12, 19, 21, 15]);
  const [edaInput, setEdaInput] = useState('12, 15, 14, 10, 18, 20, 16, 14, 12, 19, 21, 15');
  
  // Chi-Square State
  const [chiObserved, setChiObserved] = useState([[10, 20, 30], [20, 30, 50]]);
  
  // Correlation/Covariance State
  const [xData, setXData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [yData, setYData] = useState([2, 4, 5, 4, 5, 7, 8, 9, 10, 11]);
  const [xInput, setXInput] = useState('1, 2, 3, 4, 5, 6, 7, 8, 9, 10');
  const [yInput, setYInput] = useState('2, 4, 5, 4, 5, 7, 8, 9, 10, 11');
  
  // Regression State
  const [regressionX, setRegressionX] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [regressionY, setRegressionY] = useState([2.1, 3.9, 6.2, 7.8, 10.1, 12.3, 13.9, 16.2, 18.1, 19.8]);
  
  // Fourier Transform State
  const [fourierSignal, setFourierSignal] = useState(
    Array.from({length: 100}, (_, i) => Math.sin(2 * Math.PI * 2 * i / 100) + 0.5 * Math.sin(2 * Math.PI * 5 * i / 100))
  );

  // Calculate EDA statistics
  const calculateEDA = (data) => {
    const sorted = [...data].sort((a, b) => a - b);
    const n = data.length;
    
    // Mean
    const mean = data.reduce((a, b) => a + b, 0) / n;
    
    // Median
    const median = n % 2 === 0
      ? (sorted[n/2 - 1] + sorted[n/2]) / 2
      : sorted[Math.floor(n/2)];
    
    // Mode
    const freq = {};
    data.forEach(val => freq[val] = (freq[val] || 0) + 1);
    const maxFreq = Math.max(...Object.values(freq));
    const modes = Object.keys(freq).filter(key => freq[key] === maxFreq).map(Number);
    const mode = modes.length === n ? 'No mode' : modes.join(', ');
    
    // Variance
    const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
    
    // Standard Deviation
    const stdDev = Math.sqrt(variance);
    
    // Sample variance and std dev
    const sampleVariance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (n - 1);
    const sampleStdDev = Math.sqrt(sampleVariance);
    
    // Range
    const range = sorted[n-1] - sorted[0];
    
    // Quartiles
    const q1 = sorted[Math.floor(n * 0.25)];
    const q3 = sorted[Math.floor(n * 0.75)];
    const iqr = q3 - q1;
    
    return { mean, median, mode, variance, stdDev, sampleVariance, sampleStdDev, range, q1, q3, iqr, min: sorted[0], max: sorted[n-1] };
  };

  // Calculate Chi-Square
  const calculateChiSquare = (observed) => {
    const rows = observed.length;
    const cols = observed[0].length;
    
    // Calculate row and column totals
    const rowTotals = observed.map(row => row.reduce((a, b) => a + b, 0));
    const colTotals = observed[0].map((_, colIdx) => 
      observed.reduce((sum, row) => sum + row[colIdx], 0)
    );
    const grandTotal = rowTotals.reduce((a, b) => a + b, 0);
    
    // Calculate expected frequencies
    const expected = observed.map((row, i) => 
      row.map((_, j) => (rowTotals[i] * colTotals[j]) / grandTotal)
    );
    
    // Calculate chi-square statistic
    let chiSquare = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        chiSquare += Math.pow(observed[i][j] - expected[i][j], 2) / expected[i][j];
      }
    }
    
    // Degrees of freedom
    const df = (rows - 1) * (cols - 1);
    
    return { chiSquare, df, expected, rowTotals, colTotals, grandTotal };
  };

  // Calculate Correlation and Covariance
  const calculateCorrelationCovariance = (x, y) => {
    const n = x.length;
    const meanX = x.reduce((a, b) => a + b, 0) / n;
    const meanY = y.reduce((a, b) => a + b, 0) / n;
    
    // Covariance
    const covariance = x.reduce((sum, xi, i) => 
      sum + (xi - meanX) * (y[i] - meanY), 0) / n;
    
    // Sample covariance
    const sampleCovariance = x.reduce((sum, xi, i) => 
      sum + (xi - meanX) * (y[i] - meanY), 0) / (n - 1);
    
    // Standard deviations
    const stdX = Math.sqrt(x.reduce((sum, xi) => sum + Math.pow(xi - meanX, 2), 0) / n);
    const stdY = Math.sqrt(y.reduce((sum, yi) => sum + Math.pow(yi - meanY, 2), 0) / n);
    
    // Pearson correlation coefficient
    const correlation = covariance / (stdX * stdY);
    
    // Coefficient of determination
    const r2 = Math.pow(correlation, 2);
    
    return { covariance, sampleCovariance, correlation, r2, meanX, meanY, stdX, stdY };
  };

  // Calculate Linear Regression
  const calculateRegression = (x, y) => {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
    const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);
    
    // Calculate slope (b1) and intercept (b0)
    const b1 = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const b0 = (sumY - b1 * sumX) / n;
    
    // Calculate R-squared
    const meanY = sumY / n;
    const ssTotal = y.reduce((sum, yi) => sum + Math.pow(yi - meanY, 2), 0);
    const ssResidual = y.reduce((sum, yi, i) => {
      const predicted = b0 + b1 * x[i];
      return sum + Math.pow(yi - predicted, 2);
    }, 0);
    const r2 = 1 - (ssResidual / ssTotal);
    
    // Predictions
    const predictions = x.map(xi => b0 + b1 * xi);
    const residuals = y.map((yi, i) => yi - predictions[i]);
    
    return { b0, b1, r2, predictions, residuals, meanY, ssTotal, ssResidual };
  };

  // Update data from input
  const updateEdaData = () => {
    try {
      const parsed = edaInput.split(',').map(x => parseFloat(x.trim())).filter(x => !isNaN(x));
      if (parsed.length > 0) setEdaData(parsed);
    } catch (e) {}
  };

  const updateXYData = () => {
    try {
      const parsedX = xInput.split(',').map(x => parseFloat(x.trim())).filter(x => !isNaN(x));
      const parsedY = yInput.split(',').map(x => parseFloat(x.trim())).filter(x => !isNaN(x));
      if (parsedX.length > 0 && parsedY.length > 0 && parsedX.length === parsedY.length) {
        setXData(parsedX);
        setYData(parsedY);
        setRegressionX(parsedX);
        setRegressionY(parsedY);
      }
    } catch (e) {}
  };

  const edaStats = calculateEDA(edaData);
  const chiResults = calculateChiSquare(chiObserved);
  const corrCovResults = calculateCorrelationCovariance(xData, yData);
  const regressionResults = calculateRegression(regressionX, regressionY);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-xl">
              <BarChart3 className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Statistical Analysis Laboratory
              </h1>
              <p className="text-gray-600 mt-2">
                Interactive tools with formulas, examples, and code implementations
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-8">
          <div className="flex gap-2 flex-wrap">
            {[
              { id: 'eda', label: 'EDA Techniques', icon: BarChart3 },
              { id: 'chi-square', label: 'Chi-Square Test', icon: PieChart },
              { id: 'correlation', label: 'Correlation & Covariance', icon: GitBranch },
              { id: 'regression', label: 'Regression Analysis', icon: TrendingUp },
              { id: 'fourier', label: 'Fourier Transform', icon: Activity },
              { id: 'wavelet', label: 'Wavelet Transform', icon: Zap }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden lg:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* EDA Techniques */}
        {activeTab === 'eda' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-blue-600" />
                Exploratory Data Analysis (EDA) Techniques
              </h2>

              {/* Theory Section */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Measures of Central Tendency</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-white rounded p-4">
                      <h4 className="font-bold mb-2">Mean (Average)</h4>
                      <div className="font-mono text-xs bg-gray-50 p-2 rounded mb-2">
                        μ = (∑xᵢ) / n
                      </div>
                      <p className="text-gray-700">Sum of all values divided by count</p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h4 className="font-bold mb-2">Median</h4>
                      <div className="font-mono text-xs bg-gray-50 p-2 rounded mb-2">
                        Middle value when sorted
                      </div>
                      <p className="text-gray-700">50th percentile, robust to outliers</p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h4 className="font-bold mb-2">Mode</h4>
                      <div className="font-mono text-xs bg-gray-50 p-2 rounded mb-2">
                        Most frequent value(s)
                      </div>
                      <p className="text-gray-700">Value(s) appearing most often</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Measures of Dispersion</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-white rounded p-4">
                      <h4 className="font-bold mb-2">Variance</h4>
                      <div className="font-mono text-xs bg-gray-50 p-2 rounded mb-2">
                        σ² = ∑(xᵢ - μ)² / n
                      </div>
                      <p className="text-gray-700">Average squared deviation from mean</p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h4 className="font-bold mb-2">Standard Deviation</h4>
                      <div className="font-mono text-xs bg-gray-50 p-2 rounded mb-2">
                        σ = √(σ²)
                      </div>
                      <p className="text-gray-700">Square root of variance, same units as data</p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h4 className="font-bold mb-2">Range & IQR</h4>
                      <div className="font-mono text-xs bg-gray-50 p-2 rounded mb-2">
                        Range = max - min<br/>
                        IQR = Q3 - Q1
                      </div>
                      <p className="text-gray-700">Spread measures</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Calculator */}
              <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-xl p-6 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive EDA Calculator</h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Enter Data (comma-separated):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={edaInput}
                      onChange={(e) => setEdaInput(e.target.value)}
                      className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                      placeholder="e.g., 12, 15, 14, 10, 18, 20, 16"
                    />
                    <button
                      onClick={updateEdaData}
                      className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2"
                    >
                      <Calculator className="w-5 h-5" />
                      Calculate
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-3">Central Tendency</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mean:</span>
                        <span className="font-bold text-blue-600">{edaStats.mean.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Median:</span>
                        <span className="font-bold text-green-600">{edaStats.median.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mode:</span>
                        <span className="font-bold text-purple-600">{edaStats.mode}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-3">Dispersion</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Variance (σ²):</span>
                        <span className="font-bold text-blue-600">{edaStats.variance.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Std Dev (σ):</span>
                        <span className="font-bold text-green-600">{edaStats.stdDev.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Range:</span>
                        <span className="font-bold text-purple-600">{edaStats.range.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-3">Quartiles</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Min:</span>
                        <span className="font-bold">{edaStats.min.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Q1:</span>
                        <span className="font-bold">{edaStats.q1.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Q3:</span>
                        <span className="font-bold">{edaStats.q3.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Max:</span>
                        <span className="font-bold">{edaStats.max.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">IQR:</span>
                        <span className="font-bold text-blue-600">{edaStats.iqr.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Visualization */}
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-3">Data Values (sorted):</h4>
                  <div className="flex flex-wrap gap-2">
                    {[...edaData].sort((a, b) => a - b).map((val, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {val}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Python Code */}
              <div className="bg-gray-900 rounded-lg p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-green-400" />
                  <h5 className="font-bold">Python Implementation: EDA Statistics</h5>
                </div>
                <pre className="text-sm overflow-x-auto">
                  <code>{`import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats

# Sample data
data = np.array([12, 15, 14, 10, 18, 20, 16, 14, 12, 19, 21, 15])

# ============= Measures of Central Tendency =============
mean = np.mean(data)
median = np.median(data)
mode_result = stats.mode(data, keepdims=True)
mode = mode_result.mode[0]

print("=== Central Tendency ===")
print(f"Mean: {mean:.2f}")
print(f"Median: {median:.2f}")
print(f"Mode: {mode}")

# ============= Measures of Dispersion =============
variance = np.var(data)  # Population variance
std_dev = np.std(data)   # Population std dev

sample_variance = np.var(data, ddof=1)  # Sample variance
sample_std_dev = np.std(data, ddof=1)   # Sample std dev

data_range = np.ptp(data)  # Peak to peak (range)

print("\\n=== Dispersion ===")
print(f"Population Variance: {variance:.2f}")
print(f"Population Std Dev: {std_dev:.2f}")
print(f"Sample Variance: {sample_variance:.2f}")
print(f"Sample Std Dev: {sample_std_dev:.2f}")
print(f"Range: {data_range:.2f}")

# ============= Quartiles and IQR =============
q1 = np.percentile(data, 25)
q2 = np.percentile(data, 50)  # Same as median
q3 = np.percentile(data, 75)
iqr = q3 - q1

print("\\n=== Quartiles ===")
print(f"Q1 (25th percentile): {q1:.2f}")
print(f"Q2 (50th percentile): {q2:.2f}")
print(f"Q3 (75th percentile): {q3:.2f}")
print(f"IQR: {iqr:.2f}")

# ============= Additional Statistics =============
skewness = stats.skew(data)
kurtosis = stats.kurtosis(data)
cv = (std_dev / mean) * 100  # Coefficient of variation

print("\\n=== Shape Statistics ===")
print(f"Skewness: {skewness:.4f}")
print(f"Kurtosis: {kurtosis:.4f}")
print(f"Coefficient of Variation: {cv:.2f}%")

# ============= Using Pandas =============
df = pd.DataFrame({'values': data})

# Comprehensive summary
summary = df.describe()
print("\\n=== Pandas Summary Statistics ===")
print(summary)

# ============= Visualization =============
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# Histogram
axes[0, 0].hist(data, bins=10, edgecolor='black', alpha=0.7)
axes[0, 0].axvline(mean, color='r', linestyle='--', linewidth=2, label=f'Mean: {mean:.2f}')
axes[0, 0].axvline(median, color='g', linestyle='--', linewidth=2, label=f'Median: {median:.2f}')
axes[0, 0].set_xlabel('Value')
axes[0, 0].set_ylabel('Frequency')
axes[0, 0].set_title('Histogram')
axes[0, 0].legend()
axes[0, 0].grid(alpha=0.3)

# Box plot
axes[0, 1].boxplot(data, vert=True)
axes[0, 1].set_ylabel('Value')
axes[0, 1].set_title('Box Plot')
axes[0, 1].grid(alpha=0.3, axis='y')

# Density plot
from scipy.stats import gaussian_kde
density = gaussian_kde(data)
x_range = np.linspace(data.min(), data.max(), 100)
axes[1, 0].plot(x_range, density(x_range), linewidth=2)
axes[1, 0].fill_between(x_range, density(x_range), alpha=0.3)
axes[1, 0].set_xlabel('Value')
axes[1, 0].set_ylabel('Density')
axes[1, 0].set_title('Kernel Density Estimate')
axes[1, 0].grid(alpha=0.3)

# Q-Q plot (check normality)
stats.probplot(data, dist="norm", plot=axes[1, 1])
axes[1, 1].set_title('Q-Q Plot (Normal Distribution)')
axes[1, 1].grid(alpha=0.3)

plt.tight_layout()
plt.show()

# ============= Outlier Detection =============
# Using IQR method
lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr
outliers = data[(data < lower_bound) | (data > upper_bound)]

print(f"\\n=== Outlier Detection (IQR Method) ===")
print(f"Lower Bound: {lower_bound:.2f}")
print(f"Upper Bound: {upper_bound:.2f}")
print(f"Outliers: {outliers}")

# Using Z-score method
z_scores = np.abs(stats.zscore(data))
outliers_zscore = data[z_scores > 3]
print(f"Outliers (Z-score > 3): {outliers_zscore}")`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Chi-Square Test */}
        {activeTab === 'chi-square' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <PieChart className="w-8 h-8 text-blue-600" />
                Chi-Square Test of Independence
              </h2>

              {/* Theory */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Mathematical Formula</h3>
                  <div className="bg-white rounded p-4 mb-4">
                    <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-3">
                      χ² = ∑∑ (Oᵢⱼ - Eᵢⱼ)² / Eᵢⱼ
                    </div>
                    <div className="text-sm space-y-2">
                      <div><strong>Oᵢⱼ:</strong> Observed frequency in cell (i,j)</div>
                      <div><strong>Eᵢⱼ:</strong> Expected frequency in cell (i,j)</div>
                      <div className="font-mono text-xs bg-gray-50 p-2 rounded mt-2">
                        Eᵢⱼ = (Row Total × Column Total) / Grand Total
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded p-4">
                    <h4 className="font-bold mb-2">Degrees of Freedom:</h4>
                    <div className="font-mono text-xs bg-gray-50 p-2 rounded">
                      df = (r - 1) × (c - 1)
                    </div>
                    <p className="text-xs text-gray-700 mt-2">
                      where r = number of rows, c = number of columns
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Purpose & Interpretation</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    Tests whether two categorical variables are independent or associated.
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="bg-white rounded p-3">
                      <strong>Null Hypothesis (H₀):</strong>
                      <p className="text-gray-700 mt-1">Variables are independent</p>
                    </div>
                    <div className="bg-white rounded p-3">
                      <strong>Alternative Hypothesis (H₁):</strong>
                      <p className="text-gray-700 mt-1">Variables are associated</p>
                    </div>
                    <div className="bg-white rounded p-3">
                      <strong>Decision Rule:</strong>
                      <p className="text-gray-700 mt-1">
                        If χ² &gt; critical value or p-value &lt; α, reject H₀
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Calculator */}
              <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-xl p-6 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Chi-Square Calculator</h3>
                <p className="text-gray-700 mb-6 text-sm">
                  Example: Survey of smoking habits vs. exercise frequency
                </p>

                {/* Observed Frequencies Table */}
                <div className="bg-white rounded-lg p-6 mb-6">
                  <h4 className="font-bold text-gray-900 mb-3">Observed Frequencies:</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border-collapse">
                      <thead>
                        <tr>
                          <th className="p-3 border-2 border-gray-300 bg-gray-100"></th>
                          <th className="p-3 border-2 border-gray-300 bg-blue-100">Low Exercise</th>
                          <th className="p-3 border-2 border-gray-300 bg-blue-100">Medium Exercise</th>
                          <th className="p-3 border-2 border-gray-300 bg-blue-100">High Exercise</th>
                          <th className="p-3 border-2 border-gray-300 bg-gray-200 font-bold">Row Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-3 border-2 border-gray-300 bg-green-100 font-bold">Smoker</td>
                          <td className="p-3 border-2 border-gray-300 text-center">{chiObserved[0][0]}</td>
                          <td className="p-3 border-2 border-gray-300 text-center">{chiObserved[0][1]}</td>
                          <td className="p-3 border-2 border-gray-300 text-center">{chiObserved[0][2]}</td>
                          <td className="p-3 border-2 border-gray-300 bg-gray-200 text-center font-bold">{chiResults.rowTotals[0]}</td>
                        </tr>
                        <tr>
                          <td className="p-3 border-2 border-gray-300 bg-green-100 font-bold">Non-Smoker</td>
                          <td className="p-3 border-2 border-gray-300 text-center">{chiObserved[1][0]}</td>
                          <td className="p-3 border-2 border-gray-300 text-center">{chiObserved[1][1]}</td>
                          <td className="p-3 border-2 border-gray-300 text-center">{chiObserved[1][2]}</td>
                          <td className="p-3 border-2 border-gray-300 bg-gray-200 text-center font-bold">{chiResults.rowTotals[1]}</td>
                        </tr>
                        <tr>
                          <td className="p-3 border-2 border-gray-300 bg-gray-200 font-bold">Column Total</td>
                          <td className="p-3 border-2 border-gray-300 bg-gray-200 text-center font-bold">{chiResults.colTotals[0]}</td>
                          <td className="p-3 border-2 border-gray-300 bg-gray-200 text-center font-bold">{chiResults.colTotals[1]}</td>
                          <td className="p-3 border-2 border-gray-300 bg-gray-200 text-center font-bold">{chiResults.colTotals[2]}</td>
                          <td className="p-3 border-2 border-gray-300 bg-gray-300 text-center font-bold">{chiResults.grandTotal}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Expected Frequencies */}
                <div className="bg-white rounded-lg p-6 mb-6">
                  <h4 className="font-bold text-gray-900 mb-3">Expected Frequencies:</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border-collapse">
                      <thead>
                        <tr>
                          <th className="p-3 border-2 border-gray-300 bg-gray-100"></th>
                          <th className="p-3 border-2 border-gray-300 bg-blue-100">Low Exercise</th>
                          <th className="p-3 border-2 border-gray-300 bg-blue-100">Medium Exercise</th>
                          <th className="p-3 border-2 border-gray-300 bg-blue-100">High Exercise</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-3 border-2 border-gray-300 bg-green-100 font-bold">Smoker</td>
                          <td className="p-3 border-2 border-gray-300 text-center">{chiResults.expected[0][0].toFixed(2)}</td>
                          <td className="p-3 border-2 border-gray-300 text-center">{chiResults.expected[0][1].toFixed(2)}</td>
                          <td className="p-3 border-2 border-gray-300 text-center">{chiResults.expected[0][2].toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td className="p-3 border-2 border-gray-300 bg-green-100 font-bold">Non-Smoker</td>
                          <td className="p-3 border-2 border-gray-300 text-center">{chiResults.expected[1][0].toFixed(2)}</td>
                          <td className="p-3 border-2 border-gray-300 text-center">{chiResults.expected[1][1].toFixed(2)}</td>
                          <td className="p-3 border-2 border-gray-300 text-center">{chiResults.expected[1][2].toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Results */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-bold text-gray-900 mb-2">Chi-Square Statistic</h5>
                    <div className="text-3xl font-bold text-blue-600">{chiResults.chiSquare.toFixed(4)}</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-bold text-gray-900 mb-2">Degrees of Freedom</h5>
                    <div className="text-3xl font-bold text-green-600">{chiResults.df}</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h5 className="font-bold text-gray-900 mb-2">Critical Value (α=0.05)</h5>
                    <div className="text-3xl font-bold text-purple-600">5.991</div>
                    <p className="text-xs text-gray-600 mt-2">
                      {chiResults.chiSquare > 5.991 ? '✓ Reject H₀' : '✗ Fail to reject H₀'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Python Code */}
              <div className="bg-gray-900 rounded-lg p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-green-400" />
                  <h5 className="font-bold">Python Implementation: Chi-Square Test</h5>
                </div>
                <pre className="text-sm overflow-x-auto">
                  <code>{`import numpy as np
import pandas as pd
from scipy.stats import chi2_contingency, chi2
import matplotlib.pyplot as plt

# Observed frequencies (contingency table)
# Example: Smoking vs Exercise
observed = np.array([
    [10, 20, 30],  # Smokers: Low, Medium, High exercise
    [20, 30, 50]   # Non-smokers: Low, Medium, High exercise
])

print("=== Observed Frequencies ===")
print(observed)

# Perform chi-square test
chi2_stat, p_value, dof, expected = chi2_contingency(observed)

print("\\n=== Chi-Square Test Results ===")
print(f"Chi-Square Statistic: {chi2_stat:.4f}")
print(f"P-value: {p_value:.4f}")
print(f"Degrees of Freedom: {dof}")

print("\\n=== Expected Frequencies ===")
print(expected)

# Critical value at alpha = 0.05
alpha = 0.05
critical_value = chi2.ppf(1 - alpha, dof)

print(f"\\nCritical Value (α={alpha}): {critical_value:.4f}")

# Decision
if chi2_stat > critical_value:
    print(f"\\n✓ Reject H₀: Chi-square ({chi2_stat:.4f}) > Critical value ({critical_value:.4f})")
    print("  Variables are associated (dependent)")
else:
    print(f"\\n✗ Fail to reject H₀: Chi-square ({chi2_stat:.4f}) <= Critical value ({critical_value:.4f})")
    print("  Variables are independent")

if p_value < alpha:
    print(f"✓ Reject H₀: p-value ({p_value:.4f}) < α ({alpha})")
else:
    print(f"✗ Fail to reject H₀: p-value ({p_value:.4f}) >= α ({alpha})")

# ============= Manual Calculation =============
def chi_square_manual(observed):
    """
    Manually calculate chi-square statistic
    """
    # Calculate totals
    row_totals = observed.sum(axis=1)
    col_totals = observed.sum(axis=0)
    grand_total = observed.sum()
    
    # Calculate expected frequencies
    expected = np.outer(row_totals, col_totals) / grand_total
    
    # Calculate chi-square statistic
    chi_square = np.sum((observed - expected)**2 / expected)
    
    # Degrees of freedom
    dof = (observed.shape[0] - 1) * (observed.shape[1] - 1)
    
    return chi_square, dof, expected

chi2_manual, dof_manual, expected_manual = chi_square_manual(observed)

print("\\n=== Manual Calculation Verification ===")
print(f"Chi-Square (manual): {chi2_manual:.4f}")
print(f"Chi-Square (scipy): {chi2_stat:.4f}")
print(f"Match: {np.isclose(chi2_manual, chi2_stat)}")

# ============= Visualization =============
fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# Observed frequencies heatmap
im1 = axes[0].imshow(observed, cmap='Blues', aspect='auto')
axes[0].set_title('Observed Frequencies')
axes[0].set_xlabel('Exercise Level')
axes[0].set_ylabel('Smoking Status')
axes[0].set_xticks([0, 1, 2])
axes[0].set_xticklabels(['Low', 'Medium', 'High'])
axes[0].set_yticks([0, 1])
axes[0].set_yticklabels(['Smoker', 'Non-Smoker'])

# Add values to heatmap
for i in range(observed.shape[0]):
    for j in range(observed.shape[1]):
        axes[0].text(j, i, observed[i, j], ha='center', va='center', color='white', fontweight='bold')

plt.colorbar(im1, ax=axes[0])

# Expected frequencies heatmap
im2 = axes[1].imshow(expected, cmap='Greens', aspect='auto')
axes[1].set_title('Expected Frequencies')
axes[1].set_xlabel('Exercise Level')
axes[1].set_ylabel('Smoking Status')
axes[1].set_xticks([0, 1, 2])
axes[1].set_xticklabels(['Low', 'Medium', 'High'])
axes[1].set_yticks([0, 1])
axes[1].set_yticklabels(['Smoker', 'Non-Smoker'])

for i in range(expected.shape[0]):
    for j in range(expected.shape[1]):
        axes[1].text(j, i, f'{expected[i, j]:.1f}', ha='center', va='center', color='white', fontweight='bold')

plt.colorbar(im2, ax=axes[1])

# Chi-square distribution
x = np.linspace(0, 20, 1000)
y = chi2.pdf(x, dof)

axes[2].plot(x, y, linewidth=2, label=f'χ² distribution (df={dof})')
axes[2].axvline(chi2_stat, color='r', linestyle='--', linewidth=2, label=f'Test Statistic: {chi2_stat:.2f}')
axes[2].axvline(critical_value, color='g', linestyle='--', linewidth=2, label=f'Critical Value: {critical_value:.2f}')
axes[2].fill_between(x[x >= critical_value], 0, chi2.pdf(x[x >= critical_value], dof), alpha=0.3, color='red')
axes[2].set_xlabel('χ² Value')
axes[2].set_ylabel('Density')
axes[2].set_title('Chi-Square Distribution')
axes[2].legend()
axes[2].grid(alpha=0.3)

plt.tight_layout()
plt.show()

# ============= Effect Size (Cramér's V) =============
n = observed.sum()
min_dim = min(observed.shape[0], observed.shape[1]) - 1
cramers_v = np.sqrt(chi2_stat / (n * min_dim))

print(f"\\n=== Effect Size ===")
print(f"Cramér's V: {cramers_v:.4f}")
print("Interpretation:")
if cramers_v < 0.1:
    print("  Negligible association")
elif cramers_v < 0.3:
    print("  Weak association")
elif cramers_v < 0.5:
    print("  Moderate association")
else:
    print("  Strong association")`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Correlation & Covariance */}
        {activeTab === 'correlation' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <GitBranch className="w-8 h-8 text-blue-600" />
                Correlation & Covariance Analysis
              </h2>

              {/* Theory */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Covariance</h3>
                  <div className="bg-white rounded p-4 mb-4">
                    <h4 className="font-bold mb-2">Population Covariance:</h4>
                    <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-2">
                      Cov(X,Y) = ∑(xᵢ - μₓ)(yᵢ - μᵧ) / n
                    </div>
                    <h4 className="font-bold mb-2 mt-4">Sample Covariance:</h4>
                    <div className="font-mono text-sm bg-gray-50 p-3 rounded">
                      Cov(X,Y) = ∑(xᵢ - x̄)(yᵢ - ȳ) / (n-1)
                    </div>
                  </div>
                  <div className="bg-white rounded p-4 text-sm">
                    <strong>Interpretation:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>• Positive: Variables increase together</li>
                      <li>• Negative: One increases, other decreases</li>
                      <li>• Zero: No linear relationship</li>
                      <li>• Units: (unit of X) × (unit of Y)</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Pearson Correlation</h3>
                  <div className="bg-white rounded p-4 mb-4">
                    <h4 className="font-bold mb-2">Formula:</h4>
                    <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-2">
                      r = Cov(X,Y) / (σₓ × σᵧ)
                    </div>
                    <div className="font-mono text-sm bg-gray-50 p-3 rounded">
                      r = ∑(xᵢ-x̄)(yᵢ-ȳ) / √[∑(xᵢ-x̄)²∑(yᵢ-ȳ)²]
                    </div>
                  </div>
                  <div className="bg-white rounded p-4 text-sm">
                    <strong>Properties:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>• Range: -1 ≤ r ≤ 1</li>
                      <li>• r = 1: Perfect positive correlation</li>
                      <li>• r = -1: Perfect negative correlation</li>
                      <li>• r = 0: No linear correlation</li>
                      <li>• Dimensionless (unitless)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Interactive Calculator */}
              <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-xl p-6 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Calculator</h3>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      X Values (comma-separated):
                    </label>
                    <input
                      type="text"
                      value={xInput}
                      onChange={(e) => setXInput(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Y Values (comma-separated):
                    </label>
                    <input
                      type="text"
                      value={yInput}
                      onChange={(e) => setYInput(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={updateXYData}
                  className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2 mb-6"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate Correlation & Covariance
                </button>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Covariance Results</h4>
                    <div className="space-y-3">
                      <div className="bg-blue-50 p-4 rounded">
                        <div className="text-sm text-gray-600">Population Covariance</div>
                        <div className="text-2xl font-bold text-blue-600">{corrCovResults.covariance.toFixed(4)}</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded">
                        <div className="text-sm text-gray-600">Sample Covariance</div>
                        <div className="text-2xl font-bold text-green-600">{corrCovResults.sampleCovariance.toFixed(4)}</div>
                      </div>
                      <div className="text-sm text-gray-700">
                        <strong>Interpretation:</strong> {corrCovResults.covariance > 0 ? 'Positive' : corrCovResults.covariance < 0 ? 'Negative' : 'Zero'} relationship
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Correlation Results</h4>
                    <div className="space-y-3">
                      <div className="bg-purple-50 p-4 rounded">
                        <div className="text-sm text-gray-600">Pearson Correlation (r)</div>
                        <div className="text-2xl font-bold text-purple-600">{corrCovResults.correlation.toFixed(4)}</div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded">
                        <div className="text-sm text-gray-600">R² (Coefficient of Determination)</div>
                        <div className="text-2xl font-bold text-orange-600">{corrCovResults.r2.toFixed(4)}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          {(corrCovResults.r2 * 100).toFixed(1)}% of variance explained
                        </div>
                      </div>
                      <div className="text-sm text-gray-700">
                        <strong>Strength:</strong> {
                          Math.abs(corrCovResults.correlation) > 0.9 ? 'Very Strong' :
                          Math.abs(corrCovResults.correlation) > 0.7 ? 'Strong' :
                          Math.abs(corrCovResults.correlation) > 0.5 ? 'Moderate' :
                          Math.abs(corrCovResults.correlation) > 0.3 ? 'Weak' : 'Very Weak'
                        }
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statistics Summary */}
                <div className="mt-6 bg-white rounded-lg p-6">
                  <h4 className="font-bold text-gray-900 mb-3">Summary Statistics:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Mean X:</div>
                      <div className="font-bold">{corrCovResults.meanX.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Mean Y:</div>
                      <div className="font-bold">{corrCovResults.meanY.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Std Dev X:</div>
                      <div className="font-bold">{corrCovResults.stdX.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Std Dev Y:</div>
                      <div className="font-bold">{corrCovResults.stdY.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Python Code */}
              <div className="bg-gray-900 rounded-lg p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-green-400" />
                  <h5 className="font-bold">Python Implementation: Correlation & Covariance</h5>
                </div>
                <pre className="text-sm overflow-x-auto">
                  <code>{`import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy import stats
import seaborn as sns

# Sample data
x = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
y = np.array([2, 4, 5, 4, 5, 7, 8, 9, 10, 11])

print("=== Data ===")
print(f"X: {x}")
print(f"Y: {y}")

# ============= Covariance =============
# Population covariance (ddof=0)
cov_pop = np.cov(x, y, ddof=0)[0, 1]

# Sample covariance (ddof=1)
cov_sample = np.cov(x, y, ddof=1)[0, 1]

print("\\n=== Covariance ===")
print(f"Population Covariance: {cov_pop:.4f}")
print(f"Sample Covariance: {cov_sample:.4f}")

# Manual calculation
mean_x = np.mean(x)
mean_y = np.mean(y)
cov_manual = np.sum((x - mean_x) * (y - mean_y)) / len(x)
print(f"Manual Calculation: {cov_manual:.4f}")

# ============= Correlation =============
# Pearson correlation coefficient
correlation, p_value = stats.pearsonr(x, y)

print("\\n=== Pearson Correlation ===")
print(f"Correlation Coefficient (r): {correlation:.4f}")
print(f"P-value: {p_value:.6f}")
print(f"R² (Coefficient of Determination): {correlation**2:.4f}")

# Alternative calculation using numpy
corr_matrix = np.corrcoef(x, y)
print(f"\\nCorrelation Matrix:")
print(corr_matrix)

# Manual calculation
std_x = np.std(x, ddof=0)
std_y = np.std(y, ddof=0)
corr_manual = cov_pop / (std_x * std_y)
print(f"Manual Correlation: {corr_manual:.4f}")

# ============= Using Pandas =============
df = pd.DataFrame({'X': x, 'Y': y})

print("\\n=== Pandas Covariance Matrix ===")
print(df.cov())

print("\\n=== Pandas Correlation Matrix ===")
print(df.corr())

# ============= Spearman Rank Correlation =============
# Non-parametric measure (based on ranks)
spearman_corr, spearman_p = stats.spearmanr(x, y)

print("\\n=== Spearman Correlation ===")
print(f"Spearman's ρ: {spearman_corr:.4f}")
print(f"P-value: {spearman_p:.6f}")

# ============= Kendall Tau Correlation =============
kendall_tau, kendall_p = stats.kendalltau(x, y)

print("\\n=== Kendall's Tau ===")
print(f"Kendall's τ: {kendall_tau:.4f}")
print(f"P-value: {kendall_p:.6f}")

# ============= Visualization =============
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# Scatter plot with regression line
axes[0, 0].scatter(x, y, alpha=0.7, s=100, edgecolor='black')
z = np.polyfit(x, y, 1)
p = np.poly1d(z)
axes[0, 0].plot(x, p(x), "r--", linewidth=2, label=f'y = {z[0]:.2f}x + {z[1]:.2f}')
axes[0, 0].set_xlabel('X', fontsize=12)
axes[0, 0].set_ylabel('Y', fontsize=12)
axes[0, 0].set_title(f'Scatter Plot (r = {correlation:.4f})', fontsize=14)
axes[0, 0].legend()
axes[0, 0].grid(alpha=0.3)

# Residual plot
residuals = y - p(x)
axes[0, 1].scatter(x, residuals, alpha=0.7, s=100, edgecolor='black')
axes[0, 1].axhline(y=0, color='r', linestyle='--', linewidth=2)
axes[0, 1].set_xlabel('X', fontsize=12)
axes[0, 1].set_ylabel('Residuals', fontsize=12)
axes[0, 1].set_title('Residual Plot', fontsize=14)
axes[0, 1].grid(alpha=0.3)

# Joint plot with marginal distributions
from scipy.stats import gaussian_kde

# Create grid for density
xx, yy = np.meshgrid(
    np.linspace(x.min()-1, x.max()+1, 100),
    np.linspace(y.min()-1, y.max()+1, 100)
)

# 2D kernel density
positions = np.vstack([xx.ravel(), yy.ravel()])
values = np.vstack([x, y])
kernel = gaussian_kde(values)
density = np.reshape(kernel(positions).T, xx.shape)

axes[1, 0].contourf(xx, yy, density, levels=10, cmap='viridis', alpha=0.6)
axes[1, 0].scatter(x, y, c='red', s=100, edgecolor='black', alpha=0.8)
axes[1, 0].set_xlabel('X', fontsize=12)
axes[1, 0].set_ylabel('Y', fontsize=12)
axes[1, 0].set_title('Joint Distribution', fontsize=14)

# Correlation matrix heatmap (for demonstration with multiple variables)
# Create correlated data
np.random.seed(42)
data_matrix = np.random.multivariate_normal(
    [0, 0, 0],
    [[1, 0.8, 0.3], [0.8, 1, 0.5], [0.3, 0.5, 1]],
    100
)
df_multi = pd.DataFrame(data_matrix, columns=['Var1', 'Var2', 'Var3'])
corr_matrix_multi = df_multi.corr()

im = axes[1, 1].imshow(corr_matrix_multi, cmap='coolwarm', vmin=-1, vmax=1, aspect='auto')
axes[1, 1].set_xticks([0, 1, 2])
axes[1, 1].set_yticks([0, 1, 2])
axes[1, 1].set_xticklabels(['Var1', 'Var2', 'Var3'])
axes[1, 1].set_yticklabels(['Var1', 'Var2', 'Var3'])
axes[1, 1].set_title('Correlation Matrix Heatmap', fontsize=14)

# Add correlation values to heatmap
for i in range(3):
    for j in range(3):
        text = axes[1, 1].text(j, i, f'{corr_matrix_multi.iloc[i, j]:.2f}',
                              ha="center", va="center", color="black", fontweight='bold')

plt.colorbar(im, ax=axes[1, 1])
plt.tight_layout()
plt.show()

# ============= Interpretation Guidelines =============
print("\\n=== Correlation Interpretation ===")
abs_corr = abs(correlation)
if abs_corr >= 0.9:
    strength = "Very Strong"
elif abs_corr >= 0.7:
    strength = "Strong"
elif abs_corr >= 0.5:
    strength = "Moderate"
elif abs_corr >= 0.3:
    strength = "Weak"
else:
    strength = "Very Weak"

direction = "Positive" if correlation > 0 else "Negative" if correlation < 0 else "No"
print(f"Strength: {strength}")
print(f"Direction: {direction}")
print(f"\\nVariance Explained: {correlation**2 * 100:.1f}%")`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Regression Analysis */}
        {activeTab === 'regression' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                Linear Regression Analysis
              </h2>

              {/* Theory */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Regression Equation</h3>
                  <div className="bg-white rounded p-4 mb-4">
                    <div className="font-mono text-lg bg-gray-50 p-3 rounded mb-3 text-center">
                      ŷ = β₀ + β₁x
                    </div>
                    <div className="space-y-2 text-sm">
                      <div><strong>ŷ:</strong> Predicted value of Y</div>
                      <div><strong>β₀:</strong> Intercept (value when x = 0)</div>
                      <div><strong>β₁:</strong> Slope (change in Y per unit change in X)</div>
                    </div>
                  </div>
                  <div className="bg-white rounded p-4 text-sm">
                    <h4 className="font-bold mb-2">Formulas:</h4>
                    <div className="space-y-2">
                      <div className="font-mono text-xs bg-gray-50 p-2 rounded">
                        β₁ = (n∑xy - ∑x∑y) / (n∑x² - (∑x)²)
                      </div>
                      <div className="font-mono text-xs bg-gray-50 p-2 rounded">
                        β₀ = ȳ - β₁x̄
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Model Evaluation</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-white rounded p-4">
                      <h4 className="font-bold mb-2">R² (Coefficient of Determination):</h4>
                      <div className="font-mono text-xs bg-gray-50 p-2 rounded mb-2">
                        R² = 1 - (SS_res / SS_tot)
                      </div>
                      <p className="text-gray-700">Proportion of variance explained (0 to 1)</p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h4 className="font-bold mb-2">Sum of Squares:</h4>
                      <div className="font-mono text-xs bg-gray-50 p-2 rounded mb-1">
                        SS_tot = ∑(yᵢ - ȳ)²
                      </div>
                      <div className="font-mono text-xs bg-gray-50 p-2 rounded">
                        SS_res = ∑(yᵢ - ŷᵢ)²
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Calculator */}
              <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-xl p-6 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Regression Results</h3>
                <p className="text-gray-700 mb-6 text-sm">
                  Using your correlation data for regression analysis
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Regression Equation</h4>
                    <div className="bg-blue-50 p-4 rounded mb-4">
                      <div className="text-center font-mono text-xl font-bold text-blue-600">
                        ŷ = {regressionResults.b0.toFixed(4)} + {regressionResults.b1.toFixed(4)}x
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Intercept (β₀):</span>
                        <span className="font-bold">{regressionResults.b0.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Slope (β₁):</span>
                        <span className="font-bold">{regressionResults.b1.toFixed(4)}</span>
                      </div>
                      <div className="mt-4 p-3 bg-yellow-50 rounded">
                        <strong>Interpretation:</strong> For each unit increase in X, Y increases by {regressionResults.b1.toFixed(4)} units on average.
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Model Quality</h4>
                    <div className="space-y-3">
                      <div className="bg-purple-50 p-4 rounded">
                        <div className="text-sm text-gray-600">R² (R-Squared)</div>
                        <div className="text-3xl font-bold text-purple-600">{regressionResults.r2.toFixed(4)}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          Model explains {(regressionResults.r2 * 100).toFixed(1)}% of variance
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-blue-50 p-3 rounded">
                          <div className="text-gray-600">SS Total</div>
                          <div className="font-bold">{regressionResults.ssTotal.toFixed(2)}</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded">
                          <div className="text-gray-600">SS Residual</div>
                          <div className="font-bold">{regressionResults.ssResidual.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Predictions Table */}
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-bold text-gray-900 mb-3">Predictions & Residuals:</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-2 border">X</th>
                          <th className="p-2 border">Y (Actual)</th>
                          <th className="p-2 border">ŷ (Predicted)</th>
                          <th className="p-2 border">Residual (y - ŷ)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {regressionX.slice(0, 10).map((xi, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="p-2 border text-center">{xi.toFixed(2)}</td>
                            <td className="p-2 border text-center">{regressionY[idx].toFixed(2)}</td>
                            <td className="p-2 border text-center">{regressionResults.predictions[idx].toFixed(2)}</td>
                            <td className="p-2 border text-center">{regressionResults.residuals[idx].toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Python Code */}
              <div className="bg-gray-900 rounded-lg p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-green-400" />
                  <h5 className="font-bold">Python Implementation: Linear Regression</h5>
                </div>
                <pre className="text-sm overflow-x-auto">
                  <code>{`import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy import stats
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error

# Sample data
X = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
y = np.array([2.1, 3.9, 6.2, 7.8, 10.1, 12.3, 13.9, 16.2, 18.1, 19.8])

print("=== Data ===")
print(f"X: {X}")
print(f"y: {y}")

# ============= Manual Calculation =============
n = len(X)
sum_x = np.sum(X)
sum_y = np.sum(y)
sum_xy = np.sum(X * y)
sum_x2 = np.sum(X ** 2)

# Calculate slope (b1) and intercept (b0)
b1 = (n * sum_xy - sum_x * sum_y) / (n * sum_x2 - sum_x ** 2)
b0 = (sum_y - b1 * sum_x) / n

print("\\n=== Manual Regression Coefficients ===")
print(f"Slope (β₁): {b1:.4f}")
print(f"Intercept (β₀): {b0:.4f}")
print(f"Equation: ŷ = {b0:.4f} + {b1:.4f}x")

# Predictions
y_pred_manual = b0 + b1 * X

# ============= Using NumPy =============
coefficients = np.polyfit(X, y, 1)
b1_np, b0_np = coefficients

print("\\n=== NumPy polyfit ===")
print(f"Coefficients: {coefficients}")
print(f"Equation: ŷ = {b0_np:.4f} + {b1_np:.4f}x")

# ============= Using SciPy =============
slope, intercept, r_value, p_value, std_err = stats.linregress(X, y)

print("\\n=== SciPy linregress ===")
print(f"Slope: {slope:.4f}")
print(f"Intercept: {intercept:.4f}")
print(f"R-value: {r_value:.4f}")
print(f"R²: {r_value**2:.4f}")
print(f"P-value: {p_value:.6f}")
print(f"Standard Error: {std_err:.4f}")

# ============= Using Scikit-learn =============
# Reshape X for sklearn (needs 2D array)
X_reshaped = X.reshape(-1, 1)

# Create and fit model
model = LinearRegression()
model.fit(X_reshaped, y)

# Get coefficients
b1_sk = model.coef_[0]
b0_sk = model.intercept_

print("\\n=== Scikit-learn LinearRegression ===")
print(f"Slope: {b1_sk:.4f}")
print(f"Intercept: {b0_sk:.4f}")

# Predictions
y_pred = model.predict(X_reshaped)

# ============= Model Evaluation =============
# R-squared
r2 = r2_score(y, y_pred)

# Mean Squared Error
mse = mean_squared_error(y, y_pred)
rmse = np.sqrt(mse)

# Mean Absolute Error
mae = mean_absolute_error(y, y_pred)

# Residuals
residuals = y - y_pred

print("\\n=== Model Evaluation Metrics ===")
print(f"R² Score: {r2:.4f}")
print(f"Mean Squared Error (MSE): {mse:.4f}")
print(f"Root Mean Squared Error (RMSE): {rmse:.4f}")
print(f"Mean Absolute Error (MAE): {mae:.4f}")

# Sum of squares
y_mean = np.mean(y)
ss_total = np.sum((y - y_mean) ** 2)
ss_residual = np.sum((y - y_pred) ** 2)
ss_regression = ss_total - ss_residual

print("\\n=== Sum of Squares ===")
print(f"Total (SS_tot): {ss_total:.4f}")
print(f"Residual (SS_res): {ss_residual:.4f}")
print(f"Regression (SS_reg): {ss_regression:.4f}")
print(f"Verify R² = 1 - (SS_res/SS_tot) = {1 - ss_residual/ss_total:.4f}")

# ============= Visualization =============
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# Scatter plot with regression line
axes[0, 0].scatter(X, y, s=100, alpha=0.7, edgecolor='black', label='Actual Data')
axes[0, 0].plot(X, y_pred, 'r-', linewidth=2, label=f'ŷ = {b0_sk:.2f} + {b1_sk:.2f}x')
axes[0, 0].set_xlabel('X', fontsize=12)
axes[0, 0].set_ylabel('y', fontsize=12)
axes[0, 0].set_title(f'Linear Regression (R² = {r2:.4f})', fontsize=14)
axes[0, 0].legend()
axes[0, 0].grid(alpha=0.3)

# Residual plot
axes[0, 1].scatter(y_pred, residuals, s=100, alpha=0.7, edgecolor='black')
axes[0, 1].axhline(y=0, color='r', linestyle='--', linewidth=2)
axes[0, 1].set_xlabel('Predicted Values', fontsize=12)
axes[0, 1].set_ylabel('Residuals', fontsize=12)
axes[0, 1].set_title('Residual Plot', fontsize=14)
axes[0, 1].grid(alpha=0.3)

# Q-Q plot of residuals (check normality)
stats.probplot(residuals, dist="norm", plot=axes[1, 0])
axes[1, 0].set_title('Q-Q Plot of Residuals', fontsize=14)
axes[1, 0].grid(alpha=0.3)

# Actual vs Predicted
axes[1, 1].scatter(y, y_pred, s=100, alpha=0.7, edgecolor='black')
axes[1, 1].plot([y.min(), y.max()], [y.min(), y.max()], 'r--', linewidth=2, label='Perfect Prediction')
axes[1, 1].set_xlabel('Actual Values', fontsize=12)
axes[1, 1].set_ylabel('Predicted Values', fontsize=12)
axes[1, 1].set_title('Actual vs Predicted', fontsize=14)
axes[1, 1].legend()
axes[1, 1].grid(alpha=0.3)

plt.tight_layout()
plt.show()

# ============= Prediction for New Values =============
X_new = np.array([11, 12, 13]).reshape(-1, 1)
y_new_pred = model.predict(X_new)

print("\\n=== Predictions for New X Values ===")
for x_val, y_val in zip(X_new.flatten(), y_new_pred):
    print(f"When X = {x_val}, predicted Y = {y_val:.4f}")

# ============= Confidence and Prediction Intervals =============
from scipy.stats import t

# Significance level
alpha = 0.05
dof = n - 2  # degrees of freedom

# t critical value
t_crit = t.ppf(1 - alpha/2, dof)

# Standard error of regression
s_e = np.sqrt(ss_residual / dof)

# Standard error of prediction
x_mean = np.mean(X)
se_pred = s_e * np.sqrt(1 + 1/n + (X - x_mean)**2 / np.sum((X - x_mean)**2))

# Prediction intervals
margin = t_crit * se_pred
lower_bound = y_pred - margin
upper_bound = y_pred + margin

print("\\n=== 95% Prediction Intervals ===")
for i in range(min(5, n)):
    print(f"X={X[i]}: [{lower_bound[i]:.2f}, {upper_bound[i]:.2f}]")`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Fourier Transform */}
        {activeTab === 'fourier' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Activity className="w-8 h-8 text-blue-600" />
                Fourier Transform
              </h2>

              {/* Theory */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Continuous Fourier Transform</h3>
                  <div className="bg-white rounded p-4 mb-4">
                    <h4 className="font-bold mb-2">Forward Transform:</h4>
                    <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-3">
                      F(ω) = ∫ f(t)e^(-iωt) dt
                    </div>
                    <h4 className="font-bold mb-2">Inverse Transform:</h4>
                    <div className="font-mono text-sm bg-gray-50 p-3 rounded">
                      f(t) = (1/2π) ∫ F(ω)e^(iωt) dω
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Decomposes a time-domain signal into its frequency components.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Discrete Fourier Transform (DFT)</h3>
                  <div className="bg-white rounded p-4 mb-4">
                    <h4 className="font-bold mb-2">DFT Formula:</h4>
                    <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-3">
                      X[k] = ∑(n=0 to N-1) x[n]e^(-i2πkn/N)
                    </div>
                    <h4 className="font-bold mb-2">Fast Fourier Transform (FFT):</h4>
                    <p className="text-xs text-gray-700">
                      Efficient algorithm to compute DFT, O(N log N) instead of O(N²)
                    </p>
                  </div>
                  <p className="text-sm text-gray-700">
                    Used for digital signals sampled at discrete time points.
                  </p>
                </div>
              </div>

              {/* Applications */}
              <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-xl p-6 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Applications & Properties</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Key Applications:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Signal processing and filtering</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Audio and image compression (MP3, JPEG)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Spectral analysis and frequency identification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Communication systems (modulation/demodulation)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        <span>Solving differential equations</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Important Properties:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="bg-gray-50 rounded p-2">
                        <strong>Linearity:</strong> F(ax + by) = aF(x) + bF(y)
                      </div>
                      <div className="bg-gray-50 rounded p-2">
                        <strong>Time Shift:</strong> f(t-t₀) ↔ F(ω)e^(-iωt₀)
                      </div>
                      <div className="bg-gray-50 rounded p-2">
                        <strong>Frequency Shift:</strong> f(t)e^(iω₀t) ↔ F(ω-ω₀)
                      </div>
                      <div className="bg-gray-50 rounded p-2">
                        <strong>Convolution:</strong> f*g ↔ F(ω)·G(ω)
                      </div>
                      <div className="bg-gray-50 rounded p-2">
                        <strong>Parseval's:</strong> ∫|f(t)|²dt = (1/2π)∫|F(ω)|²dω
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Python Code */}
              <div className="bg-gray-900 rounded-lg p-6 text-white mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-green-400" />
                  <h5 className="font-bold">Python Implementation: Fourier Transform</h5>
                </div>
                <pre className="text-sm overflow-x-auto">
                  <code>{`import numpy as np
import matplotlib.pyplot as plt
from scipy import fft, signal

# ============= Create Test Signal =============
# Sampling parameters
fs = 1000  # Sampling frequency (Hz)
T = 1/fs   # Sampling period
t = np.linspace(0, 1, fs, endpoint=False)  # Time vector (1 second)

# Create composite signal: 50 Hz + 120 Hz + noise
freq1, freq2 = 50, 120
signal_clean = (np.sin(2 * np.pi * freq1 * t) + 
                0.5 * np.sin(2 * np.pi * freq2 * t))
noise = 0.2 * np.random.randn(len(t))
signal_noisy = signal_clean + noise

print("=== Signal Parameters ===")
print(f"Sampling Frequency: {fs} Hz")
print(f"Signal Length: {len(t)} samples")
print(f"Duration: {t[-1]:.2f} seconds")
print(f"Frequency Components: {freq1} Hz, {freq2} Hz")

# ============= Compute FFT =============
# Fast Fourier Transform
yf = fft.fft(signal_noisy)

# Frequency axis
xf = fft.fftfreq(len(t), T)

# Take only positive frequencies
xf_pos = xf[:len(xf)//2]
yf_pos = 2.0/len(t) * np.abs(yf[:len(yf)//2])

print("\\n=== FFT Results ===")
# Find dominant frequencies
peaks, _ = signal.find_peaks(yf_pos, height=0.1)
print(f"Detected Frequencies: {xf_pos[peaks]} Hz")
print(f"Peak Magnitudes: {yf_pos[peaks]}")

# ============= Inverse FFT =============
signal_reconstructed = fft.ifft(yf)

print("\\n=== Reconstruction Error ===")
reconstruction_error = np.mean(np.abs(signal_noisy - signal_reconstructed.real))
print(f"Mean Absolute Error: {reconstruction_error:.10f}")

# ============= Filtering Example =============
# Low-pass filter: Remove frequencies above 100 Hz
yf_filtered = yf.copy()
cutoff_idx = int(100 * len(t) / fs)
yf_filtered[cutoff_idx:-cutoff_idx] = 0

# Inverse FFT to get filtered signal
signal_filtered = fft.ifft(yf_filtered).real

print("\\n=== Filtering ===")
print(f"Applied low-pass filter with cutoff: 100 Hz")
print(f"Frequencies removed: Above 100 Hz")

# ============= Spectrogram (Time-Frequency Analysis) =============
f_spec, t_spec, Sxx = signal.spectrogram(signal_noisy, fs, nperseg=256)

# ============= Visualization =============
fig = plt.figure(figsize=(16, 12))
gs = fig.add_gridspec(3, 2, hspace=0.3, wspace=0.3)

# Time domain - Original signal
ax1 = fig.add_subplot(gs[0, 0])
ax1.plot(t[:200], signal_clean[:200], label='Clean Signal', alpha=0.7)
ax1.plot(t[:200], signal_noisy[:200], label='Noisy Signal', alpha=0.7)
ax1.set_xlabel('Time (s)')
ax1.set_ylabel('Amplitude')
ax1.set_title('Time Domain Signal (first 200 samples)')
ax1.legend()
ax1.grid(alpha=0.3)

# Frequency domain - FFT
ax2 = fig.add_subplot(gs[0, 1])
ax2.plot(xf_pos, yf_pos)
ax2.set_xlabel('Frequency (Hz)')
ax2.set_ylabel('Magnitude')
ax2.set_title('Frequency Spectrum (FFT)')
ax2.set_xlim([0, 200])
ax2.grid(alpha=0.3)

# Mark detected peaks
ax2.plot(xf_pos[peaks], yf_pos[peaks], 'ro', markersize=10, label='Detected Frequencies')
ax2.legend()

# Filtered signal - Time domain
ax3 = fig.add_subplot(gs[1, 0])
ax3.plot(t[:200], signal_noisy[:200], label='Original', alpha=0.5)
ax3.plot(t[:200], signal_filtered[:200], label='Filtered (< 100 Hz)', linewidth=2)
ax3.set_xlabel('Time (s)')
ax3.set_ylabel('Amplitude')
ax3.set_title('Low-Pass Filtered Signal')
ax3.legend()
ax3.grid(alpha=0.3)

# Filtered signal - Frequency domain
ax4 = fig.add_subplot(gs[1, 1])
yf_filtered_mag = 2.0/len(t) * np.abs(yf_filtered[:len(yf)//2])
ax4.plot(xf_pos, yf_pos, label='Original', alpha=0.5)
ax4.plot(xf_pos, yf_filtered_mag, label='Filtered', linewidth=2)
ax4.set_xlabel('Frequency (Hz)')
ax4.set_ylabel('Magnitude')
ax4.set_title('Frequency Spectrum After Filtering')
ax4.set_xlim([0, 200])
ax4.axvline(100, color='r', linestyle='--', label='Cutoff Frequency')
ax4.legend()
ax4.grid(alpha=0.3)

# Spectrogram
ax5 = fig.add_subplot(gs[2, :])
pcm = ax5.pcolormesh(t_spec, f_spec, 10 * np.log10(Sxx), shading='gouraud', cmap='viridis')
ax5.set_ylabel('Frequency (Hz)')
ax5.set_xlabel('Time (s)')
ax5.set_title('Spectrogram (Time-Frequency Representation)')
ax5.set_ylim([0, 200])
plt.colorbar(pcm, ax=ax5, label='Power (dB)')

plt.show()

# ============= 2D FFT Example (Images) =============
print("\\n=== 2D FFT Example ===")

# Create a simple 2D pattern
x = np.linspace(0, 10, 100)
y = np.linspace(0, 10, 100)
X, Y = np.meshgrid(x, y)
image = np.sin(2*np.pi*X) + np.sin(2*np.pi*Y)

# 2D FFT
fft_2d = fft.fft2(image)
fft_2d_shifted = fft.fftshift(fft_2d)
magnitude_spectrum = np.log(1 + np.abs(fft_2d_shifted))

print("Image shape:", image.shape)
print("2D FFT shape:", fft_2d.shape)

# Plot
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

axes[0].imshow(image, cmap='gray')
axes[0].set_title('Original Image')
axes[0].axis('off')

axes[1].imshow(magnitude_spectrum, cmap='hot')
axes[1].set_title('2D FFT Magnitude Spectrum')
axes[1].axis('off')

plt.tight_layout()
plt.show()

# ============= Window Functions =============
print("\\n=== Window Functions ===")
window_functions = {
    'Rectangular': np.ones(len(t)),
    'Hanning': signal.hann(len(t)),
    'Hamming': signal.hamming(len(t)),
    'Blackman': signal.blackman(len(t))
}

fig, axes = plt.subplots(2, 2, figsize=(12, 8))
axes = axes.flatten()

for idx, (name, window) in enumerate(window_functions.items()):
    # Apply window
    windowed_signal = signal_noisy * window
    yf_window = fft.fft(windowed_signal)
    yf_window_mag = 2.0/len(t) * np.abs(yf_window[:len(yf)//2])
    
    axes[idx].plot(xf_pos, yf_window_mag)
    axes[idx].set_title(f'{name} Window')
    axes[idx].set_xlabel('Frequency (Hz)')
    axes[idx].set_ylabel('Magnitude')
    axes[idx].set_xlim([0, 200])
    axes[idx].grid(alpha=0.3)

plt.tight_layout()
plt.show()

print("\\nWindow functions reduce spectral leakage in FFT analysis")`}</code>
                </pre>
              </div>

              {/* Real-World Example */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Real-World Example: Audio Signal Analysis</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white rounded p-4">
                    <h4 className="font-bold mb-2">Problem:</h4>
                    <p className="text-gray-700">Identify musical notes in an audio recording</p>
                  </div>
                  <div className="bg-white rounded p-4">
                    <h4 className="font-bold mb-2">Solution:</h4>
                    <p className="text-gray-700">FFT reveals dominant frequencies corresponding to notes</p>
                  </div>
                  <div className="bg-white rounded p-4">
                    <h4 className="font-bold mb-2">Example:</h4>
                    <p className="text-gray-700">A4 note = 440 Hz appears as peak in spectrum</p>
                  </div>
                  <div className="bg-white rounded p-4">
                    <h4 className="font-bold mb-2">Application:</h4>
                    <p className="text-gray-700">Music transcription, pitch detection, auto-tuning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wavelet Transform */}
        {activeTab === 'wavelet' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Zap className="w-8 h-8 text-blue-600" />
                Wavelet Transform
              </h2>

              {/* Theory */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Continuous Wavelet Transform (CWT)</h3>
                  <div className="bg-white rounded p-4 mb-4">
                    <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-3">
                      W(a,b) = ∫ f(t)ψ*((t-b)/a) dt / √a
                    </div>
                    <div className="text-sm space-y-2">
                      <div><strong>ψ(t):</strong> Mother wavelet function</div>
                      <div><strong>a:</strong> Scale parameter (frequency)</div>
                      <div><strong>b:</strong> Translation parameter (time)</div>
                      <div><strong>*:</strong> Complex conjugate</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Provides time-frequency localization, better for non-stationary signals.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Discrete Wavelet Transform (DWT)</h3>
                  <div className="bg-white rounded p-4 mb-4">
                    <h4 className="font-bold mb-2">Multi-Resolution Analysis:</h4>
                    <p className="text-xs text-gray-700 mb-2">
                      Decomposes signal into approximation and detail coefficients
                    </p>
                    <div className="space-y-1 text-xs">
                      <div>• Approximation: Low-frequency components</div>
                      <div>• Details: High-frequency components</div>
                      <div>• Hierarchical decomposition at multiple levels</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Efficient for compression, denoising, and feature extraction.
                  </p>
                </div>
              </div>

              {/* Comparison */}
              <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-xl p-6 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Wavelet vs Fourier Transform</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-3 border text-left">Aspect</th>
                        <th className="p-3 border text-left">Fourier Transform</th>
                        <th className="p-3 border text-left">Wavelet Transform</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border font-bold">Basis Function</td>
                        <td className="p-3 border">Sine/Cosine waves (infinite)</td>
                        <td className="p-3 border">Wavelets (localized, finite)</td>
                      </tr>
                      <tr>
                        <td className="p-3 border font-bold">Time Information</td>
                        <td className="p-3 border">Lost (only frequency)</td>
                        <td className="p-3 border">Preserved (time-frequency)</td>
                      </tr>
                      <tr>
                        <td className="p-3 border font-bold">Best For</td>
                        <td className="p-3 border">Stationary signals</td>
                        <td className="p-3 border">Non-stationary signals</td>
                      </tr>
                      <tr>
                        <td className="p-3 border font-bold">Resolution</td>
                        <td className="p-3 border">Fixed time-frequency</td>
                        <td className="p-3 border">Adaptive (multiresolution)</td>
                      </tr>
                      <tr>
                        <td className="p-3 border font-bold">Applications</td>
                        <td className="p-3 border">Audio, communications</td>
                        <td className="p-3 border">Images, seismology, biomedicine</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Common Wavelets */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                  <h4 className="font-bold text-gray-900 mb-3">Haar Wavelet</h4>
                  <div className="bg-white rounded p-4 text-sm">
                    <div className="mb-2">Simplest wavelet</div>
                    <div className="mb-2">Good for: Edge detection</div>
                    <div className="text-xs text-gray-600">Discontinuous, fast computation</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-6">
                  <h4 className="font-bold text-gray-900 mb-3">Daubechies Wavelets</h4>
                  <div className="bg-white rounded p-4 text-sm">
                    <div className="mb-2">Most widely used (db4, db8)</div>
                    <div className="mb-2">Good for: General purpose</div>
                    <div className="text-xs text-gray-600">Smooth, compact support</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                  <h4 className="font-bold text-gray-900 mb-3">Morlet Wavelet</h4>
                  <div className="bg-white rounded p-4 text-sm">
                    <div className="mb-2">Complex-valued</div>
                    <div className="mb-2">Good for: Time-frequency analysis</div>
                    <div className="text-xs text-gray-600">Excellent localization</div>
                  </div>
                </div>
              </div>

              {/* Python Code */}
              <div className="bg-gray-900 rounded-lg p-6 text-white mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-green-400" />
                  <h5 className="font-bold">Python Implementation: Wavelet Transform</h5>
                </div>
                <pre className="text-sm overflow-x-auto">
                  <code>{`import numpy as np
import matplotlib.pyplot as plt
import pywt
from scipy import signal

# ============= Create Test Signal =============
# Chirp signal (frequency changes with time)
t = np.linspace(0, 1, 1000)
f0, f1 = 10, 100
signal_test = signal.chirp(t, f0, 1, f1, method='linear')

# Add discontinuity
signal_test[500:] += 2

print("=== Signal Parameters ===")
print(f"Signal length: {len(signal_test)} samples")
print(f"Frequency range: {f0}-{f1} Hz")

# ============= Continuous Wavelet Transform (CWT) =============
# Scales for CWT (related to frequencies)
scales = np.arange(1, 128)
wavelet_name = 'morl'  # Morlet wavelet

# Compute CWT
coefficients, frequencies = pywt.cwt(signal_test, scales, wavelet_name, 1/1000)

print("\\n=== CWT Results ===")
print(f"Wavelet: {wavelet_name}")
print(f"Coefficient matrix shape: {coefficients.shape}")
print(f"Frequency range: {frequencies.min():.2f} - {frequencies.max():.2f} Hz")

# ============= Discrete Wavelet Transform (DWT) =============
wavelet_dwt = 'db4'  # Daubechies 4 wavelet
level = 4  # Decomposition level

# Perform DWT
coeffs = pywt.wavedec(signal_test, wavelet_dwt, level=level)

print("\\n=== DWT Results ===")
print(f"Wavelet: {wavelet_dwt}")
print(f"Decomposition level: {level}")
print(f"Number of coefficient arrays: {len(coeffs)}")
for i, c in enumerate(coeffs):
    if i == 0:
        print(f"  Approximation coefficients: {len(c)} values")
    else:
        print(f"  Detail coefficients (level {i}): {len(c)} values")

# ============= Reconstruction from DWT =============
reconstructed = pywt.waverec(coeffs, wavelet_dwt)

# Trim to original length (DWT may pad)
reconstructed = reconstructed[:len(signal_test)]

print("\\n=== Reconstruction ===")
reconstruction_error = np.max(np.abs(signal_test - reconstructed))
print(f"Max reconstruction error: {reconstruction_error:.10f}")

# ============= Denoising Example =============
# Add noise to signal
noisy_signal = signal_test + 0.5 * np.random.randn(len(signal_test))

# Decompose noisy signal
coeffs_noisy = pywt.wavedec(noisy_signal, 'db4', level=4)

# Threshold detail coefficients (soft thresholding)
sigma = np.median(np.abs(coeffs_noisy[-1])) / 0.6745
threshold = sigma * np.sqrt(2 * np.log(len(noisy_signal)))

coeffs_thresholded = list(coeffs_noisy)
for i in range(1, len(coeffs_thresholded)):
    coeffs_thresholded[i] = pywt.threshold(coeffs_thresholded[i], threshold, mode='soft')

# Reconstruct denoised signal
denoised_signal = pywt.waverec(coeffs_thresholded, 'db4')[:len(signal_test)]

print("\\n=== Denoising ===")
print(f"Threshold: {threshold:.4f}")
snr_before = 10 * np.log10(np.var(signal_test) / np.var(noisy_signal - signal_test))
snr_after = 10 * np.log10(np.var(signal_test) / np.var(denoised_signal - signal_test))
print(f"SNR before denoising: {snr_before:.2f} dB")
print(f"SNR after denoising: {snr_after:.2f} dB")

# ============= Available Wavelets =============
print("\\n=== Available Wavelet Families ===")
families = pywt.families()
print(f"Wavelet families: {families}")

# List wavelets in some families
for family in ['haar', 'db', 'sym', 'coif']:
    wavelets = pywt.wavelist(family)
    print(f"{family}: {wavelets}")

# ============= Visualization =============
fig = plt.figure(figsize=(16, 14))
gs = fig.add_gridspec(4, 2, hspace=0.4, wspace=0.3)

# Original signal
ax1 = fig.add_subplot(gs[0, :])
ax1.plot(t, signal_test, linewidth=2)
ax1.set_xlabel('Time (s)')
ax1.set_ylabel('Amplitude')
ax1.set_title('Original Signal (Chirp with Discontinuity)')
ax1.grid(alpha=0.3)

# CWT Scalogram
ax2 = fig.add_subplot(gs[1, :])
pcm = ax2.pcolormesh(t, frequencies, np.abs(coefficients), shading='gouraud', cmap='viridis')
ax2.set_ylabel('Frequency (Hz)')
ax2.set_xlabel('Time (s)')
ax2.set_title('Continuous Wavelet Transform (CWT) - Scalogram')
ax2.set_ylim([0, 150])
plt.colorbar(pcm, ax=ax2, label='Magnitude')

# DWT Decomposition
ax3 = fig.add_subplot(gs[2, 0])
ax3.plot(coeffs[0], linewidth=1)
ax3.set_title(f'DWT Approximation (Level {level})')
ax3.set_xlabel('Sample')
ax3.set_ylabel('Coefficient')
ax3.grid(alpha=0.3)

ax4 = fig.add_subplot(gs[2, 1])
for i in range(1, min(4, len(coeffs))):
    ax4.plot(coeffs[i], alpha=0.7, label=f'Detail {i}')
ax4.set_title('DWT Detail Coefficients')
ax4.set_xlabel('Sample')
ax4.set_ylabel('Coefficient')
ax4.legend()
ax4.grid(alpha=0.3)

# Denoising comparison
ax5 = fig.add_subplot(gs[3, 0])
ax5.plot(t, signal_test, 'g-', linewidth=2, alpha=0.7, label='Original')
ax5.plot(t, noisy_signal, 'r-', linewidth=1, alpha=0.5, label='Noisy')
ax5.set_xlabel('Time (s)')
ax5.set_ylabel('Amplitude')
ax5.set_title('Signal with Noise')
ax5.legend()
ax5.grid(alpha=0.3)

ax6 = fig.add_subplot(gs[3, 1])
ax6.plot(t, signal_test, 'g-', linewidth=2, alpha=0.7, label='Original')
ax6.plot(t, denoised_signal, 'b-', linewidth=1, label='Denoised')
ax6.set_xlabel('Time (s)')
ax6.set_ylabel('Amplitude')
ax6.set_title(f'Wavelet Denoising (SNR: {snr_before:.1f}dB → {snr_after:.1f}dB)')
ax6.legend()
ax6.grid(alpha=0.3)

plt.show()

# ============= 2D Wavelet Transform (Image Processing) =============
print("\\n=== 2D Wavelet Transform Example ===")

# Create a simple test image
x = np.linspace(0, 10, 256)
y = np.linspace(0, 10, 256)
X, Y = np.meshgrid(x, y)
image = np.sin(2*np.pi*X) * np.cos(2*np.pi*Y)

# 2D DWT
coeffs_2d = pywt.dwt2(image, 'db1')
cA, (cH, cV, cD) = coeffs_2d

print(f"Original image shape: {image.shape}")
print(f"Approximation shape: {cA.shape}")
print(f"Horizontal detail shape: {cH.shape}")
print(f"Vertical detail shape: {cV.shape}")
print(f"Diagonal detail shape: {cD.shape}")

# Reconstruct
image_reconstructed = pywt.idwt2(coeffs_2d, 'db1')
print(f"Reconstruction error: {np.max(np.abs(image - image_reconstructed)):.10f}")

# Visualize 2D DWT
fig, axes = plt.subplots(2, 3, figsize=(12, 8))

axes[0, 0].imshow(image, cmap='gray')
axes[0, 0].set_title('Original Image')
axes[0, 0].axis('off')

axes[0, 1].imshow(cA, cmap='gray')
axes[0, 1].set_title('Approximation (Low-Low)')
axes[0, 1].axis('off')

axes[0, 2].imshow(cH, cmap='gray')
axes[0, 2].set_title('Horizontal Detail (Low-High)')
axes[0, 2].axis('off')

axes[1, 0].imshow(cV, cmap='gray')
axes[1, 0].set_title('Vertical Detail (High-Low)')
axes[1, 0].axis('off')

axes[1, 1].imshow(cD, cmap='gray')
axes[1, 1].set_title('Diagonal Detail (High-High)')
axes[1, 1].axis('off')

axes[1, 2].imshow(image_reconstructed, cmap='gray')
axes[1, 2].set_title('Reconstructed Image')
axes[1, 2].axis('off')

plt.tight_layout()
plt.show()`}</code>
                </pre>
              </div>

              {/* Applications */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Real-World Applications</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="bg-white rounded p-4">
                      <h4 className="font-bold mb-2">Image Compression (JPEG 2000)</h4>
                      <p className="text-sm text-gray-700">Uses DWT for better compression than DCT-based JPEG</p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h4 className="font-bold mb-2">Medical Imaging</h4>
                      <p className="text-sm text-gray-700">ECG/EEG analysis, tumor detection in MRI scans</p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h4 className="font-bold mb-2">Seismology</h4>
                      <p className="text-sm text-gray-700">Earthquake signal analysis and prediction</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white rounded p-4">
                      <h4 className="font-bold mb-2">Finance</h4>
                      <p className="text-sm text-gray-700">Stock market trend analysis and forecasting</p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h4 className="font-bold mb-2">Audio Processing</h4>
                      <p className="text-sm text-gray-700">Music transcription, speech recognition, denoising</p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h4 className="font-bold mb-2">Computer Vision</h4>
                      <p className="text-sm text-gray-700">Feature extraction, edge detection, pattern recognition</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Master Statistical Analysis</h3>
          <p className="mb-6 opacity-90">
            These tools are essential for data analysis, signal processing, and machine learning. 
            Practice with real datasets and explore advanced techniques!
          </p>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-bold mb-2">EDA</h4>
              <p className="text-sm opacity-90">Foundation for all data analysis</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-bold mb-2">Statistical Tests</h4>
              <p className="text-sm opacity-90">Chi-square, correlation, regression</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-bold mb-2">Signal Processing</h4>
              <p className="text-sm opacity-90">Fourier and wavelet transforms</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-bold mb-2">Applications</h4>
              <p className="text-sm opacity-90">From finance to biomedical engineering</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// ============================================================
// FILE: 3. Feature Engineering
// ============================================================


const FeatureEngineeringLearningTool = () => {
  const [activeTab, setActiveTab] = useState('extraction');
  const [selectedTransform, setSelectedTransform] = useState('log');
  const [pcaComponents, setPcaComponents] = useState(2);
  const [selectedFeatures, setSelectedFeatures] = useState([true, true, true, true, true]);

  // Sample datasets for demonstrations
  const textData = [
    { id: 1, text: "I love this product! Amazing quality!", sentiment: 'positive', length: 41 },
    { id: 2, text: "Terrible experience. Very disappointed.", sentiment: 'negative', length: 39 },
    { id: 3, text: "It's okay, nothing special.", sentiment: 'neutral', length: 27 },
    { id: 4, text: "Best purchase ever!!! Highly recommend!", sentiment: 'positive', length: 40 },
    { id: 5, text: "Not worth the money. Poor quality.", sentiment: 'negative', length: 34 }
  ];

  const dateData = [
    { date: '2024-01-15', sales: 1200, dayOfWeek: 'Monday', isWeekend: false },
    { date: '2024-01-20', sales: 2500, dayOfWeek: 'Saturday', isWeekend: true },
    { date: '2024-02-14', sales: 4500, dayOfWeek: 'Wednesday', isWeekend: false },
    { date: '2024-03-17', sales: 1800, dayOfWeek: 'Sunday', isWeekend: true },
    { date: '2024-12-25', sales: 5200, dayOfWeek: 'Wednesday', isWeekend: false }
  ];

  // Generate skewed data for transformation demo
  const generateSkewedData = () => {
    const data = [];
    for (let i = 0; i < 100; i++) {
      const value = Math.exp(Math.random() * 3); // Exponential distribution
      data.push({ id: i, original: value, log: Math.log(value + 1), sqrt: Math.sqrt(value) });
    }
    return data;
  };

  const skewedData = generateSkewedData();

  // Feature importance data
  const featureImportance = [
    { feature: 'Income', importance: 0.42, selected: selectedFeatures[0] },
    { feature: 'Age', importance: 0.28, selected: selectedFeatures[1] },
    { feature: 'Education', importance: 0.18, selected: selectedFeatures[2] },
    { feature: 'Location', importance: 0.08, selected: selectedFeatures[3] },
    { feature: 'Gender', importance: 0.04, selected: selectedFeatures[4] }
  ];

  // PCA visualization data
  const pcaData = [
    { id: 1, pc1: 2.5, pc2: 1.2, pc3: 0.5, label: 'A', variance: 0.72 },
    { id: 2, pc1: -1.8, pc2: 2.3, pc3: -0.3, label: 'B', variance: 0.18 },
    { id: 3, pc1: 3.2, pc2: -0.8, pc3: 1.1, label: 'C', variance: 0.10 },
    { id: 4, pc1: -2.1, pc2: -1.5, pc3: -0.8, label: 'A', variance: 0.72 },
    { id: 5, pc1: 1.5, pc2: 3.1, pc3: 0.2, label: 'B', variance: 0.18 },
  ];

  const varianceExplained = [
    { component: 'PC1', variance: 72 },
    { component: 'PC2', variance: 18 },
    { component: 'PC3', variance: 10 }
  ];

  // Polynomial features demo
  const polynomialData = [
    { x: 1, y: 2, x2: 1, xy: 2, y2: 4 },
    { x: 2, y: 4, x2: 4, xy: 8, y2: 16 },
    { x: 3, y: 9, x2: 9, xy: 27, y2: 81 },
    { x: 4, y: 16, x2: 16, xy: 64, y2: 256 },
    { x: 5, y: 25, x2: 25, xy: 125, y2: 625 }
  ];

  // Interaction features
  const interactionData = [
    { sqft: 1000, bedrooms: 2, sqftPerBedroom: 500, price: 200000 },
    { sqft: 1500, bedrooms: 3, sqftPerBedroom: 500, price: 300000 },
    { sqft: 2000, bedrooms: 4, sqftPerBedroom: 500, price: 400000 },
    { sqft: 2500, bedrooms: 3, sqftPerBedroom: 833, price: 500000 },
    { sqft: 3000, bedrooms: 5, sqftPerBedroom: 600, price: 600000 }
  ];

  const toggleFeature = (index) => {
    const newSelected = [...selectedFeatures];
    newSelected[index] = !newSelected[index];
    setSelectedFeatures(newSelected);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1400px', margin: '0 auto', padding: '20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      <div style={{ background: 'white', borderRadius: '15px', padding: '30px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '42px', color: '#667eea', marginBottom: '10px', fontWeight: 'bold' }}>
            ✨ Feature Engineering & Selection Lab
          </h1>
          <p style={{ fontSize: '18px', color: '#666' }}>
            Master the art of creating and selecting powerful features for machine learning
          </p>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { id: 'extraction', label: '🔍 Feature Extraction', icon: '📝' },
            { id: 'transformation', label: '🔄 Transformation', icon: '📊' },
            { id: 'creation', label: '✨ Feature Creation', icon: '🎨' },
            { id: 'selection', label: '🎯 Feature Selection', icon: '🔬' },
            { id: 'dimensionality', label: '📉 Dimensionality', icon: '🎪' },
            { id: 'scaling', label: '⚖️ Scaling Impact', icon: '📏' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: '10px',
                background: activeTab === tab.id ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#f0f0f0',
                color: activeTab === tab.id ? 'white' : '#333',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'all 0.3s',
                boxShadow: activeTab === tab.id ? '0 4px 15px rgba(102,126,234,0.4)' : 'none'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div style={{ background: '#f8f9fa', padding: '30px', borderRadius: '10px', minHeight: '500px' }}>
          
          {/* EXTRACTION TAB */}
          {activeTab === 'extraction' && (
            <div>
              <h2 style={{ color: '#667eea', marginBottom: '20px' }}>🔍 Feature Extraction from Raw Data</h2>
              
              {/* Text Features */}
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                <h3 style={{ color: '#764ba2' }}>📝 Text Feature Extraction</h3>
                <p style={{ marginBottom: '15px' }}>Extract meaningful features from text data:</p>
                
                <div style={{ overflow: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <thead style={{ background: '#667eea', color: 'white' }}>
                      <tr>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Original Text</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Length</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Word Count</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Has '!'</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Sentiment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {textData.map(row => (
                        <tr key={row.id}>
                          <td style={{ padding: '8px', border: '1px solid #ddd' }}>{row.text}</td>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold' }}>
                            {row.length}
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold' }}>
                            {row.text.split(' ').length}
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                            {row.text.includes('!') ? '✅' : '❌'}
                          </td>
                          <td style={{ 
                            padding: '8px', 
                            border: '1px solid #ddd', 
                            textAlign: 'center',
                            background: row.sentiment === 'positive' ? '#e8f5e9' : row.sentiment === 'negative' ? '#ffebee' : '#fff9c4',
                            fontWeight: 'bold'
                          }}>
                            {row.sentiment}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ marginTop: '15px', padding: '15px', background: '#e3f2fd', borderRadius: '8px' }}>
                  <strong>💡 Extracted Features:</strong>
                  <ul style={{ marginTop: '5px', marginBottom: 0 }}>
                    <li><strong>Text Length:</strong> Number of characters</li>
                    <li><strong>Word Count:</strong> Number of words</li>
                    <li><strong>Has Exclamation:</strong> Indicator of excitement</li>
                    <li><strong>Sentiment:</strong> Positive/Negative/Neutral classification</li>
                  </ul>
                </div>
              </div>

              {/* Date Features */}
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                <h3 style={{ color: '#764ba2' }}>📅 Date/Time Feature Extraction</h3>
                <p style={{ marginBottom: '15px' }}>A single date can yield many powerful features:</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <div style={{ background: '#2c3e50', color: '#ecf0f1', padding: '15px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '13px' }}>
                      <strong>Original Date:</strong> 2024-12-25<br/><br/>
                      <strong style={{ color: '#3498db' }}>Extracted Features:</strong><br/>
                      ✓ year = 2024<br/>
                      ✓ month = 12<br/>
                      ✓ day = 25<br/>
                      ✓ day_of_week = 3 (Wednesday)<br/>
                      ✓ quarter = 4 (Q4)<br/>
                      ✓ is_weekend = False<br/>
                      ✓ is_holiday_season = True<br/>
                      ✓ is_month_end = False<br/>
                      ✓ week_of_year = 52
                    </div>
                  </div>
                  
                  <div>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={dateData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="dayOfWeek" angle={-45} textAnchor="end" height={80} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="sales" fill="#667eea" />
                      </BarChart>
                    </ResponsiveContainer>
                    <p style={{ fontSize: '13px', color: '#666', textAlign: 'center', marginTop: '10px' }}>
                      Sales by Day of Week - Weekend pattern visible!
                    </p>
                  </div>
                </div>
              </div>

              {/* Numerical Features */}
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                <h3 style={{ color: '#764ba2' }}>🔢 Numerical Feature Extraction Strategies</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                  {[
                    { title: 'Statistical', features: ['Mean', 'Median', 'Std Dev', 'Min/Max', 'Quartiles', 'Skewness'] },
                    { title: 'Binning', features: ['Equal Width', 'Equal Frequency', 'Custom Bins', 'Quantile-based'] },
                    { title: 'Aggregations', features: ['Sum', 'Count', 'Rolling Average', 'Cumulative Sum', 'Difference'] }
                  ].map((group, idx) => (
                    <div key={idx} style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', border: '2px solid #667eea' }}>
                      <h4 style={{ color: '#667eea', marginTop: 0 }}>{group.title}</h4>
                      <ul style={{ marginBottom: 0, fontSize: '14px' }}>
                        {group.features.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TRANSFORMATION TAB */}
          {activeTab === 'transformation' && (
            <div>
              <h2 style={{ color: '#667eea', marginBottom: '20px' }}>🔄 Feature Transformations</h2>
              
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                <h3 style={{ color: '#764ba2' }}>📊 Compare Transformation Methods</h3>
                <p style={{ marginBottom: '15px' }}>Select a transformation to see its effect on skewed data:</p>
                
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  {[
                    { value: 'log', label: '📈 Log Transform', desc: 'Best for right-skewed data' },
                    { value: 'sqrt', label: '√ Square Root', desc: 'Milder than log' },
                    { value: 'original', label: '📊 Original', desc: 'No transformation' }
                  ].map(transform => (
                    <button
                      key={transform.value}
                      onClick={() => setSelectedTransform(transform.value)}
                      style={{
                        padding: '12px 20px',
                        border: selectedTransform === transform.value ? '3px solid #667eea' : '2px solid #ddd',
                        borderRadius: '8px',
                        background: selectedTransform === transform.value ? '#e8eaff' : 'white',
                        cursor: 'pointer',
                        flex: '1',
                        minWidth: '200px'
                      }}
                    >
                      <div style={{ fontWeight: 'bold' }}>{transform.label}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>{transform.desc}</div>
                    </button>
                  ))}
                </div>

                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={skewedData.slice(0, 30)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="id" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey={selectedTransform} 
                      fill={selectedTransform === 'original' ? '#e74c3c' : selectedTransform === 'log' ? '#27ae60' : '#3498db'} 
                    />
                  </BarChart>
                </ResponsiveContainer>

                <div style={{ marginTop: '20px', padding: '15px', background: '#fff3cd', borderRadius: '8px' }}>
                  <strong>🎯 When to Use:</strong>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '10px' }}>
                    <div>
                      <strong style={{ color: '#27ae60' }}>Log Transform:</strong>
                      <ul style={{ fontSize: '14px', marginTop: '5px' }}>
                        <li>Income, prices, population</li>
                        <li>Skewness &gt; 1</li>
                        <li>Spans multiple orders of magnitude</li>
                      </ul>
                    </div>
                    <div>
                      <strong style={{ color: '#3498db' }}>Square Root:</strong>
                      <ul style={{ fontSize: '14px', marginTop: '5px' }}>
                        <li>Count data</li>
                        <li>Moderate skewness</li>
                        <li>Preserve zero values</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Polynomial Features */}
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                <h3 style={{ color: '#764ba2' }}>🎨 Polynomial Features - Capture Non-Linear Patterns</h3>
                <p style={{ marginBottom: '15px' }}>Transform [x, y] → [x, y, x², xy, y²] to capture curves and interactions</p>
                
                <div style={{ overflow: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <thead style={{ background: '#667eea', color: 'white' }}>
                      <tr>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>x</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>y</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd', background: '#3498db' }}>x²</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd', background: '#e67e22' }}>xy</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd', background: '#9b59b6' }}>y²</th>
                      </tr>
                    </thead>
                    <tbody>
                      {polynomialData.map((row, idx) => (
                        <tr key={idx}>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.x}</td>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.y}</td>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', background: '#e3f2fd', fontWeight: 'bold' }}>
                            {row.x2}
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', background: '#fff3e0', fontWeight: 'bold' }}>
                            {row.xy}
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center', background: '#f3e5f5', fontWeight: 'bold' }}>
                            {row.y2}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ marginTop: '15px', padding: '15px', background: '#e8f5e9', borderRadius: '8px' }}>
                  <strong>💡 Example Use Case:</strong> House price prediction
                  <p style={{ fontSize: '14px', marginTop: '5px', marginBottom: 0 }}>
                    Linear model with just 'sqft' can't capture that price per sqft changes with size. 
                    Adding 'sqft²' allows the model to learn: small houses ($100/sqft) → medium houses ($150/sqft) → mansions ($200/sqft)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CREATION TAB */}
          {activeTab === 'creation' && (
            <div>
              <h2 style={{ color: '#667eea', marginBottom: '20px' }}>✨ Creating New Features from Existing Ones</h2>
              
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                <h3 style={{ color: '#764ba2' }}>🔗 Interaction Features - The Power of Combinations</h3>
                <p style={{ marginBottom: '15px' }}>Sometimes the combination of features is more informative than individuals:</p>
                
                <div style={{ overflow: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <thead style={{ background: '#667eea', color: 'white' }}>
                      <tr>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Sqft</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Bedrooms</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd', background: '#27ae60' }}>Sqft/Bedroom</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {interactionData.map((row, idx) => (
                        <tr key={idx}>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.sqft}</td>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{row.bedrooms}</td>
                          <td style={{ 
                            padding: '8px', 
                            border: '1px solid #ddd', 
                            textAlign: 'center', 
                            background: '#e8f5e9',
                            fontWeight: 'bold'
                          }}>
                            {row.sqftPerBedroom}
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                            ${row.price.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ marginTop: '20px', padding: '15px', background: '#e3f2fd', borderRadius: '8px' }}>
                  <strong>🎯 Why This Works:</strong>
                  <p style={{ fontSize: '14px', marginTop: '5px', marginBottom: 0 }}>
                    "Sqft per bedroom" reveals spaciousness! A 3000 sqft house with 5 bedrooms (600 sqft/bedroom) 
                    feels cramped compared to 2500 sqft with 3 bedrooms (833 sqft/bedroom). This single derived 
                    feature captures what two separate features couldn't!
                  </p>
                </div>
              </div>

              <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                <h3 style={{ color: '#764ba2' }}>🎨 Creative Feature Engineering Ideas</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
                  {[
                    {
                      category: 'Mathematical Operations',
                      examples: [
                        'Sum: total_rooms = bedrooms + bathrooms',
                        'Ratio: price_per_sqft = price / sqft',
                        'Difference: age_gap = age1 - age2',
                        'Product: total_area = length × width'
                      ]
                    },
                    {
                      category: 'Domain Knowledge',
                      examples: [
                        'BMI = weight / (height²)',
                        'Debt-to-income ratio = debt / income',
                        'Customer lifetime value = avg_purchase × frequency',
                        'Click-through rate = clicks / impressions'
                      ]
                    },
                    {
                      category: 'Aggregations',
                      examples: [
                        'Average purchase per customer',
                        'Total spending last 30 days',
                        'Number of visits this month',
                        'Days since last purchase'
                      ]
                    }
                  ].map((group, idx) => (
                    <div key={idx} style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', border: '2px solid #667eea' }}>
                      <h4 style={{ color: '#667eea', marginTop: 0 }}>{group.category}</h4>
                      <ul style={{ fontSize: '14px', marginBottom: 0 }}>
                        {group.examples.map((ex, i) => <li key={i}>{ex}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '20px', padding: '15px', background: '#fff3cd', borderRadius: '8px', border: '2px solid #ffc107' }}>
                  <h4 style={{ marginTop: 0 }}>💡 Pro Tips for Feature Creation:</h4>
                  <ol style={{ marginBottom: 0, fontSize: '14px' }}>
                    <li><strong>Talk to domain experts</strong> - They know which combinations matter</li>
                    <li><strong>Look at correlations</strong> - Highly correlated features might create good ratios</li>
                    <li><strong>Think about business logic</strong> - What metrics do analysts already use?</li>
                    <li><strong>Experiment freely</strong> - Try crazy ideas, remove what doesn't work</li>
                    <li><strong>Validate with the model</strong> - Does it actually improve performance?</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* SELECTION TAB */}
          {activeTab === 'selection' && (
            <div>
              <h2 style={{ color: '#667eea', marginBottom: '20px' }}>🎯 Feature Selection - Choose Your Champions!</h2>
              
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                <h3 style={{ color: '#764ba2' }}>📊 Feature Importance Ranking</h3>
                <p style={{ marginBottom: '15px' }}>Click features to toggle selection. Watch how model complexity changes:</p>
                
                <div style={{ marginBottom: '20px' }}>
                  {featureImportance.map((item, idx) => (
                    <div 
                      key={idx}
                      onClick={() => toggleFeature(idx)}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        marginBottom: '12px',
                        padding: '12px',
                        background: item.selected ? '#e8f5e9' : '#ffebee',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        border: item.selected ? '2px solid #27ae60' : '2px solid #e74c3c',
                        transition: 'all 0.3s'
                      }}
                    >
                      <div style={{ width: '30px', fontSize: '20px' }}>
                        {item.selected ? '✅' : '❌'}
                      </div>
                      <div style={{ width: '120px', fontWeight: 'bold' }}>
                        {item.feature}
                      </div>
                      <div style={{ flex: 1, margin: '0 15px' }}>
                        <div style={{
                          height: '25px',
                          width: `${item.importance * 100}%`,
                          background: item.selected ? '#27ae60' : '#e74c3c',
                          borderRadius: '12px',
                          transition: 'all 0.3s'
                        }}></div>
                      </div>
                      <div style={{ width: '80px', fontWeight: 'bold', textAlign: 'right', fontSize: '18px' }}>
                        {(item.importance * 100).toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div style={{ padding: '15px', background: '#e3f2fd', borderRadius: '8px' }}>
                    <strong>Selected Features:</strong>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976d2', marginTop: '5px' }}>
                      {selectedFeatures.filter(f => f).length} / {selectedFeatures.length}
                    </div>
                  </div>
                  <div style={{ padding: '15px', background: '#f3e5f5', borderRadius: '8px' }}>
                    <strong>Cumulative Importance:</strong>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#7b1fa2', marginTop: '5px' }}>
                      {(featureImportance.reduce((sum, item, idx) => 
                        sum + (selectedFeatures[idx] ? item.importance : 0), 0) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                <h3 style={{ color: '#764ba2' }}>🔬 Three Methods of Feature Selection</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
                  {[
                    {
                      method: '1️⃣ Filter Methods',
                      color: '#3498db',
                      description: 'Statistical tests before modeling',
                      techniques: ['Correlation', 'Chi-square', 'ANOVA', 'Mutual Information'],
                      pros: 'Fast, model-agnostic',
                      cons: 'Ignores feature interactions',
                      when: 'Many features (>1000), quick screening'
                    },
                    {
                      method: '2️⃣ Wrapper Methods',
                      color: '#9b59b6',
                      description: 'Try different subsets with model',
                      techniques: ['Forward Selection', 'Backward Elimination', 'RFE'],
                      pros: 'Considers interactions',
                      cons: 'Computationally expensive',
                      when: 'Moderate features, need best accuracy'
                    },
                    {
                      method: '3️⃣ Embedded Methods',
                      color: '#e67e22',
                      description: 'Selection during training',
                      techniques: ['Lasso (L1)', 'Random Forest', 'XGBoost'],
                      pros: 'Fast, automatic',
                      cons: 'Model-specific',
                      when: 'Using tree models, want automation'
                    }
                  ].map((item, idx) => (
                    <div key={idx} style={{ 
                      padding: '15px', 
                      background: '#f8f9fa', 
                      borderRadius: '8px',
                      border: `3px solid ${item.color}`
                    }}>
                      <h4 style={{ color: item.color, marginTop: 0 }}>{item.method}</h4>
                      <p style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>
                        {item.description}
                      </p>
                      <div style={{ marginBottom: '10px' }}>
                        <strong style={{ fontSize: '13px' }}>Techniques:</strong>
                        <ul style={{ fontSize: '12px', marginTop: '5px', marginBottom: '5px' }}>
                          {item.techniques.map((t, i) => <li key={i}>{t}</li>)}
                        </ul>
                      </div>
                      <div style={{ fontSize: '12px' }}>
                        <div style={{ color: '#27ae60', marginBottom: '3px' }}>✓ {item.pros}</div>
                        <div style={{ color: '#e74c3c', marginBottom: '3px' }}>✗ {item.cons}</div>
                        <div style={{ color: '#666' }}><strong>Use when:</strong> {item.when}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DIMENSIONALITY TAB */}
          {activeTab === 'dimensionality' && (
            <div>
              <h2 style={{ color: '#667eea', marginBottom: '20px' }}>📉 Dimensionality Reduction - The Big Picture</h2>
              
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                <h3 style={{ color: '#764ba2' }}>🎯 PCA: Principal Component Analysis</h3>
                <p style={{ marginBottom: '15px' }}>Reduce dimensions while keeping maximum information:</p>
                
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  {[2, 3].map(n => (
                    <button
                      key={n}
                      onClick={() => setPcaComponents(n)}
                      style={{
                        padding: '12px 24px',
                        border: pcaComponents === n ? '3px solid #667eea' : '2px solid #ddd',
                        borderRadius: '8px',
                        background: pcaComponents === n ? '#e8eaff' : 'white',
                        cursor: 'pointer',
                        flex: 1
                      }}
                    >
                      <div style={{ fontWeight: 'bold' }}>{n} Components</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {n === 2 ? '90% variance' : '100% variance'}
                      </div>
                    </button>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <h4>Variance Explained</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={varianceExplained.slice(0, pcaComponents)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="component" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="variance" fill="#667eea" />
                      </BarChart>
                    </ResponsiveContainer>
                    <p style={{ fontSize: '13px', color: '#666', textAlign: 'center' }}>
                      PC1 captures {varianceExplained[0].variance}% of variation!
                    </p>
                  </div>

                  <div>
                    <h4>2D Projection</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="pc1" name="PC1" />
                        <YAxis dataKey="pc2" name="PC2" />
                        <Tooltip />
                        <Scatter 
                          data={pcaData} 
                          fill="#667eea"
                          shape={(props) => {
                            const { cx, cy, payload } = props;
                            const colors = { 'A': '#e74c3c', 'B': '#27ae60', 'C': '#3498db' };
                            return (
                              <circle 
                                cx={cx} 
                                cy={cy} 
                                r={6} 
                                fill={colors[payload.label]}
                                stroke="white"
                                strokeWidth={2}
                              />
                            );
                          }}
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                    <p style={{ fontSize: '13px', color: '#666', textAlign: 'center' }}>
                      Clusters emerge in 2D!
                    </p>
                  </div>
                </div>

                <div style={{ marginTop: '20px', padding: '15px', background: '#e8f5e9', borderRadius: '8px' }}>
                  <strong>💡 How PCA Works:</strong>
                  <ol style={{ fontSize: '14px', marginTop: '5px', marginBottom: 0 }}>
                    <li><strong>Find direction of max variance</strong> → This becomes PC1</li>
                    <li><strong>Find next perpendicular direction</strong> → This becomes PC2</li>
                    <li><strong>Continue...</strong> → PC3, PC4, etc.</li>
                    <li><strong>Keep top k components</strong> → Throw away the rest</li>
                  </ol>
                </div>
              </div>

              <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                <h3 style={{ color: '#764ba2' }}>⚠️ Curse of Dimensionality</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ padding: '15px', background: '#ffebee', borderRadius: '8px', border: '2px solid #e74c3c' }}>
                    <h4 style={{ color: '#e74c3c', marginTop: 0 }}>The Problem</h4>
                    <p style={{ fontSize: '14px', marginBottom: '10px' }}>
                      As dimensions increase:
                    </p>
                    <ul style={{ fontSize: '14px', marginBottom: 0 }}>
                      <li>Data becomes sparse</li>
                      <li>Distances become meaningless</li>
                      <li>Need exponentially more data</li>
                      <li>Models overfit easily</li>
                      <li>Computation slows down</li>
                    </ul>
                    <div style={{ marginTop: '10px', padding: '10px', background: 'white', borderRadius: '5px', fontFamily: 'monospace', fontSize: '13px' }}>
                      <strong>Example:</strong><br/>
                      1000 samples, 100 features<br/>
                      Ratio: 10 samples/feature ❌<br/>
                      <br/>
                      1000 samples, 10 features<br/>
                      Ratio: 100 samples/feature ✅
                    </div>
                  </div>

                  <div style={{ padding: '15px', background: '#e8f5e9', borderRadius: '8px', border: '2px solid #27ae60' }}>
                    <h4 style={{ color: '#27ae60', marginTop: 0 }}>Solutions</h4>
                    <p style={{ fontSize: '14px', marginBottom: '10px' }}>
                      Reduce dimensions via:
                    </p>
                    <div style={{ marginBottom: '10px' }}>
                      <strong style={{ color: '#3498db' }}>Feature Selection:</strong>
                      <ul style={{ fontSize: '13px', marginTop: '5px' }}>
                        <li>Keep original features</li>
                        <li>Interpretable</li>
                        <li>May miss interactions</li>
                      </ul>
                    </div>
                    <div>
                      <strong style={{ color: '#9b59b6' }}>Feature Extraction (PCA):</strong>
                      <ul style={{ fontSize: '13px', marginTop: '5px' }}>
                        <li>Create new features</li>
                        <li>Captures all variance</li>
                        <li>Loses interpretability</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '20px', padding: '15px', background: '#fff3cd', borderRadius: '8px', border: '2px solid #ffc107' }}>
                  <strong>🎯 Rule of Thumb:</strong>
                  <p style={{ fontSize: '14px', marginTop: '5px', marginBottom: 0 }}>
                    Aim for at least <strong>10 samples per feature</strong>. With 1000 samples, limit yourself to ~100 features. 
                    More features ≠ better model! Often, 10-20 well-engineered features beat 1000 raw features.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SCALING TAB */}
          {activeTab === 'scaling' && (
            <div>
              <h2 style={{ color: '#667eea', marginBottom: '20px' }}>⚖️ Impact of Feature Scaling</h2>
              
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                <h3 style={{ color: '#764ba2' }}>🎯 Real-World Impact on Models</h3>
                <p style={{ marginBottom: '15px' }}>See how scaling affects different algorithms:</p>
                
                <div style={{ overflow: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <thead style={{ background: '#667eea', color: 'white' }}>
                      <tr>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>Algorithm</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>No Scaling</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>With Scaling</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>Improvement</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd' }}>Needs Scaling?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { algo: 'K-Nearest Neighbors', without: '62%', with: '89%', improve: '+27%', needs: true },
                        { algo: 'Support Vector Machine', without: '58%', with: '87%', improve: '+29%', needs: true },
                        { algo: 'Neural Network', without: '65%', with: '91%', improve: '+26%', needs: true },
                        { algo: 'Logistic Regression', without: '78%', with: '85%', improve: '+7%', needs: true },
                        { algo: 'Decision Tree', without: '83%', with: '83%', improve: '0%', needs: false },
                        { algo: 'Random Forest', without: '88%', with: '88%', improve: '0%', needs: false }
                      ].map((row, idx) => (
                        <tr key={idx} style={{ background: idx % 2 === 0 ? 'white' : '#f8f9fa' }}>
                          <td style={{ padding: '10px', border: '1px solid #ddd', fontWeight: 'bold' }}>
                            {row.algo}
                          </td>
                          <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center', background: '#ffebee' }}>
                            {row.without}
                          </td>
                          <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center', background: '#e8f5e9' }}>
                            {row.with}
                          </td>
                          <td style={{ 
                            padding: '10px', 
                            border: '1px solid #ddd', 
                            textAlign: 'center', 
                            fontWeight: 'bold',
                            color: row.needs ? '#27ae60' : '#666'
                          }}>
                            {row.improve}
                          </td>
                          <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center', fontSize: '20px' }}>
                            {row.needs ? '✅' : '❌'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                <h3 style={{ color: '#764ba2' }}>🔍 Why Scaling Matters - Visual Proof</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ padding: '15px', background: '#ffebee', borderRadius: '8px' }}>
                    <h4 style={{ color: '#e74c3c', marginTop: 0 }}>❌ Without Scaling</h4>
                    <div style={{ fontFamily: 'monospace', fontSize: '13px', marginBottom: '10px' }}>
                      Age: [25, 30, 35] (range: 10)<br/>
                      Income: [30k, 50k, 80k] (range: 50,000)
                    </div>
                    <p style={{ fontSize: '14px', marginBottom: '10px' }}>
                      <strong>Distance calculation:</strong>
                    </p>
                    <div style={{ background: 'white', padding: '10px', borderRadius: '5px', fontFamily: 'monospace', fontSize: '12px' }}>
                      Point A: [30, 50000]<br/>
                      Point B: [35, 50000]<br/>
                      <br/>
                      Distance = √((35-30)² + (50000-50000)²)<br/>
                      = √(25 + 0)<br/>
                      = 5<br/>
                      <br/>
                      <strong style={{ color: '#e74c3c' }}>Income dominates! Age ignored!</strong>
                    </div>
                  </div>

                  <div style={{ padding: '15px', background: '#e8f5e9', borderRadius: '8px' }}>
                    <h4 style={{ color: '#27ae60', marginTop: 0 }}>✅ With Scaling</h4>
                    <div style={{ fontFamily: 'monospace', fontSize: '13px', marginBottom: '10px' }}>
                      Age: [0.0, 0.5, 1.0]<br/>
                      Income: [0.0, 0.4, 1.0]
                    </div>
                    <p style={{ fontSize: '14px', marginBottom: '10px' }}>
                      <strong>Distance calculation:</strong>
                    </p>
                    <div style={{ background: 'white', padding: '10px', borderRadius: '5px', fontFamily: 'monospace', fontSize: '12px' }}>
                      Point A: [0.5, 0.4]<br/>
                      Point B: [1.0, 0.4]<br/>
                      <br/>
                      Distance = √((1.0-0.5)² + (0.4-0.4)²)<br/>
                      = √(0.25 + 0)<br/>
                      = 0.5<br/>
                      <br/>
                      <strong style={{ color: '#27ae60' }}>Both features contribute equally!</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ background: 'white', padding: '20px', borderRadius: '10px' }}>
                <h3 style={{ color: '#764ba2' }}>📋 Quick Decision Guide</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ padding: '15px', background: '#e8f5e9', borderRadius: '8px', border: '2px solid #27ae60' }}>
                    <h4 style={{ color: '#27ae60', marginTop: 0 }}>✅ MUST Scale For:</h4>
                    <ul style={{ fontSize: '14px', marginBottom: 0 }}>
                      <li><strong>K-Nearest Neighbors (KNN)</strong> - Uses distance directly</li>
                      <li><strong>Support Vector Machines (SVM)</strong> - Margin-based</li>
                      <li><strong>Neural Networks</strong> - Gradient descent optimization</li>
                      <li><strong>Linear/Logistic Regression</strong> - When using regularization</li>
                      <li><strong>PCA</strong> - Variance-based</li>
                      <li><strong>K-Means Clustering</strong> - Distance-based</li>
                    </ul>
                  </div>

                  <div style={{ padding: '15px', background: '#e3f2fd', borderRadius: '8px', border: '2px solid #2196f3' }}>
                    <h4 style={{ color: '#2196f3', marginTop: 0 }}>❌ No Need to Scale:</h4>
                    <ul style={{ fontSize: '14px', marginBottom: 0 }}>
                      <li><strong>Decision Trees</strong> - Uses splits, not distances</li>
                      <li><strong>Random Forests</strong> - Ensemble of trees</li>
                      <li><strong>Gradient Boosting</strong> - XGBoost, LightGBM, CatBoost</li>
                      <li><strong>Naive Bayes</strong> - Probability-based</li>
                      <li><strong>Rule-based models</strong> - Uses thresholds</li>
                    </ul>
                  </div>
                </div>

                <div style={{ marginTop: '20px', padding: '15px', background: '#fff3cd', borderRadius: '8px', border: '2px solid #ffc107' }}>
                  <h4 style={{ marginTop: 0 }}>⚠️ CRITICAL: Prevent Data Leakage!</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '14px' }}>
                    <div>
                      <strong style={{ color: '#e74c3c' }}>❌ WRONG:</strong>
                      <div style={{ background: 'white', padding: '10px', borderRadius: '5px', marginTop: '5px', fontFamily: 'monospace', fontSize: '12px' }}>
                        scaler.fit(entire_dataset)<br/>
                        X_train = scaler.transform(train)<br/>
                        X_test = scaler.transform(test)<br/>
                        <br/>
                        # Test data influenced training!
                      </div>
                    </div>
                    <div>
                      <strong style={{ color: '#27ae60' }}>✅ CORRECT:</strong>
                      <div style={{ background: 'white', padding: '10px', borderRadius: '5px', marginTop: '5px', fontFamily: 'monospace', fontSize: '12px' }}>
                        scaler.fit(X_train)<br/>
                        X_train = scaler.transform(X_train)<br/>
                        X_test = scaler.transform(X_test)<br/>
                        <br/>
                        # Only learn from training!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '10px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h3 style={{ marginTop: 0 }}>🎯 Feature Engineering Mastery Checklist</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', fontSize: '14px', textAlign: 'left' }}>
            <div>
              <strong>✨ Extraction:</strong>
              <p style={{ fontSize: '12px', margin: '5px 0 0 0' }}>Pull features from text, dates, images, and numbers</p>
            </div>
            <div>
              <strong>🔄 Transformation:</strong>
              <p style={{ fontSize: '12px', margin: '5px 0 0 0' }}>Log, sqrt, polynomial to capture patterns</p>
            </div>
            <div>
              <strong>🎨 Creation:</strong>
              <p style={{ fontSize: '12px', margin: '5px 0 0 0' }}>Combine features for powerful interactions</p>
            </div>
            <div>
              <strong>🎯 Selection:</strong>
              <p style={{ fontSize: '12px', margin: '5px 0 0 0' }}>Keep only features that add value</p>
            </div>
            <div>
              <strong>📉 Reduction:</strong>
              <p style={{ fontSize: '12px', margin: '5px 0 0 0' }}>PCA when you have too many dimensions</p>
            </div>
            <div>
              <strong>⚖️ Scaling:</strong>
              <p style={{ fontSize: '12px', margin: '5px 0 0 0' }}>Always scale for distance-based models</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// ============================================================
// FILE: 3. Probability
// ============================================================


const ProbabilityInteractive = () => {
  const [activeTab, setActiveTab] = useState('random-variables');
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [selectedDistribution, setSelectedDistribution] = useState('normal');
  const [markovSteps, setMarkovSteps] = useState(0);
  const [bayesParams, setBayesParams] = useState({ pA: 0.01, pBA: 0.95, pBnotA: 0.05 });
  const [cltSamples, setCltSamples] = useState(30);
  const [entropyText, setEntropyText] = useState('hello world');

  // Simulation states
  const [normalSamples, setNormalSamples] = useState([]);
  const [markovState, setMarkovState] = useState('sunny');
  const [markovHistory, setMarkovHistory] = useState(['sunny']);

  // Distribution parameters
  const [distParams, setDistParams] = useState({
    normal: { mu: 0, sigma: 1 },
    binomial: { n: 10, p: 0.5 },
    poisson: { lambda: 3 },
    exponential: { lambda: 1 },
    uniform: { a: 0, b: 1 }
  });

  // Common distributions data
  const distributions = [
    {
      name: 'Normal (Gaussian)',
      key: 'normal',
      description: 'The most important continuous distribution in statistics, characterized by its bell-shaped curve.',
      pdf: 'f(x) = (1 / (σ√(2π))) * exp(-(x-μ)²/(2σ²))',
      parameters: 'μ (mean), σ (standard deviation)',
      mean: 'μ',
      variance: 'σ²',
      applications: ['Height/weight measurements', 'IQ scores', 'Measurement errors', 'Central Limit Theorem'],
      pythonCode: `import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

# Parameters
mu, sigma = 0, 1

# Generate samples
samples = np.random.normal(mu, sigma, 1000)

# Calculate PDF
x = np.linspace(-4, 4, 100)
pdf = stats.norm.pdf(x, mu, sigma)

# Plot
plt.hist(samples, bins=30, density=True, alpha=0.7, label='Samples')
plt.plot(x, pdf, 'r-', linewidth=2, label='PDF')
plt.xlabel('x')
plt.ylabel('Density')
plt.title(f'Normal Distribution (μ={mu}, σ={sigma})')
plt.legend()
plt.show()

# Calculate probabilities
print(f"P(X < 0) = {stats.norm.cdf(0, mu, sigma):.4f}")
print(f"P(-1 < X < 1) = {stats.norm.cdf(1, mu, sigma) - stats.norm.cdf(-1, mu, sigma):.4f}")`
    },
    {
      name: 'Binomial',
      key: 'binomial',
      description: 'Discrete distribution modeling the number of successes in n independent trials.',
      pdf: 'P(X=k) = C(n,k) * p^k * (1-p)^(n-k)',
      parameters: 'n (trials), p (success probability)',
      mean: 'np',
      variance: 'np(1-p)',
      applications: ['Coin flips', 'Quality control', 'A/B testing', 'Clinical trials'],
      pythonCode: `import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

# Parameters
n, p = 10, 0.5

# Generate samples
samples = np.random.binomial(n, p, 1000)

# Calculate PMF
k = np.arange(0, n+1)
pmf = stats.binom.pmf(k, n, p)

# Plot
plt.figure(figsize=(10, 6))
plt.hist(samples, bins=np.arange(0, n+2)-0.5, density=True, alpha=0.7, label='Samples')
plt.plot(k, pmf, 'ro-', linewidth=2, markersize=8, label='PMF')
plt.xlabel('Number of Successes')
plt.ylabel('Probability')
plt.title(f'Binomial Distribution (n={n}, p={p})')
plt.legend()
plt.grid(alpha=0.3)
plt.show()

# Expected value and variance
print(f"E[X] = {n*p}")
print(f"Var[X] = {n*p*(1-p)}")`
    },
    {
      name: 'Poisson',
      key: 'poisson',
      description: 'Models the number of events occurring in a fixed interval of time or space.',
      pdf: 'P(X=k) = (λ^k * e^(-λ)) / k!',
      parameters: 'λ (rate parameter)',
      mean: 'λ',
      variance: 'λ',
      applications: ['Number of calls to call center', 'Website visits', 'Radioactive decay', 'Rare events'],
      pythonCode: `import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

# Parameters
lambda_param = 3

# Generate samples
samples = np.random.poisson(lambda_param, 1000)

# Calculate PMF
k = np.arange(0, 15)
pmf = stats.poisson.pmf(k, lambda_param)

# Plot
plt.figure(figsize=(10, 6))
plt.hist(samples, bins=np.arange(0, 16)-0.5, density=True, alpha=0.7, label='Samples')
plt.plot(k, pmf, 'go-', linewidth=2, markersize=8, label='PMF')
plt.xlabel('Number of Events')
plt.ylabel('Probability')
plt.title(f'Poisson Distribution (λ={lambda_param})')
plt.legend()
plt.grid(alpha=0.3)
plt.show()

# Properties
print(f"E[X] = {lambda_param}")
print(f"Var[X] = {lambda_param}")
print(f"P(X=0) = {stats.poisson.pmf(0, lambda_param):.4f}")`
    },
    {
      name: 'Exponential',
      key: 'exponential',
      description: 'Continuous distribution modeling time between events in a Poisson process.',
      pdf: 'f(x) = λ * e^(-λx) for x ≥ 0',
      parameters: 'λ (rate parameter)',
      mean: '1/λ',
      variance: '1/λ²',
      applications: ['Time between arrivals', 'Service times', 'Lifetime of components', 'Waiting times'],
      pythonCode: `import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

# Parameters
lambda_param = 1

# Generate samples
samples = np.random.exponential(1/lambda_param, 1000)

# Calculate PDF
x = np.linspace(0, 5, 100)
pdf = stats.expon.pdf(x, scale=1/lambda_param)

# Plot
plt.figure(figsize=(10, 6))
plt.hist(samples, bins=30, density=True, alpha=0.7, label='Samples')
plt.plot(x, pdf, 'r-', linewidth=2, label='PDF')
plt.xlabel('x')
plt.ylabel('Density')
plt.title(f'Exponential Distribution (λ={lambda_param})')
plt.legend()
plt.grid(alpha=0.3)
plt.show()

# Properties
print(f"E[X] = {1/lambda_param}")
print(f"Var[X] = {1/lambda_param**2}")
print(f"P(X > 2) = {1 - stats.expon.cdf(2, scale=1/lambda_param):.4f}")`
    },
    {
      name: 'Uniform',
      key: 'uniform',
      description: 'All values in an interval are equally likely.',
      pdf: 'f(x) = 1/(b-a) for a ≤ x ≤ b',
      parameters: 'a (min), b (max)',
      mean: '(a+b)/2',
      variance: '(b-a)²/12',
      applications: ['Random number generation', 'Initial assumptions', 'Monte Carlo simulation'],
      pythonCode: `import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

# Parameters
a, b = 0, 1

# Generate samples
samples = np.random.uniform(a, b, 1000)

# Calculate PDF
x = np.linspace(a-0.5, b+0.5, 100)
pdf = stats.uniform.pdf(x, loc=a, scale=b-a)

# Plot
plt.figure(figsize=(10, 6))
plt.hist(samples, bins=30, density=True, alpha=0.7, label='Samples')
plt.plot(x, pdf, 'r-', linewidth=2, label='PDF')
plt.xlabel('x')
plt.ylabel('Density')
plt.title(f'Uniform Distribution [a={a}, b={b}]')
plt.legend()
plt.grid(alpha=0.3)
plt.show()

# Properties
print(f"E[X] = {(a+b)/2}")
print(f"Var[X] = {(b-a)**2/12}")`
    }
  ];

  // Bayes' Rule calculation
  const calculateBayes = () => {
    const { pA, pBA, pBnotA } = bayesParams;
    const pNotA = 1 - pA;
    const pB = pBA * pA + pBnotA * pNotA;
    const pAB = (pBA * pA) / pB;
    return { pB, pAB, pNotA };
  };

  // Markov chain simulation
  const markovTransition = {
    sunny: { sunny: 0.8, cloudy: 0.15, rainy: 0.05 },
    cloudy: { sunny: 0.3, cloudy: 0.4, rainy: 0.3 },
    rainy: { sunny: 0.2, cloudy: 0.3, rainy: 0.5 }
  };

  const simulateMarkovStep = () => {
    const transitions = markovTransition[markovState];
    const rand = Math.random();
    let cumProb = 0;
    let newState = markovState;
    
    for (const [state, prob] of Object.entries(transitions)) {
      cumProb += prob;
      if (rand < cumProb) {
        newState = state;
        break;
      }
    }
    
    setMarkovState(newState);
    setMarkovHistory([...markovHistory, newState]);
    setMarkovSteps(markovSteps + 1);
  };

  const resetMarkov = () => {
    setMarkovState('sunny');
    setMarkovHistory(['sunny']);
    setMarkovSteps(0);
  };

  // Calculate entropy
  const calculateEntropy = (text) => {
    const freq = {};
    for (const char of text.toLowerCase()) {
      if (char !== ' ') {
        freq[char] = (freq[char] || 0) + 1;
      }
    }
    
    const total = Object.values(freq).reduce((a, b) => a + b, 0);
    let entropy = 0;
    
    for (const count of Object.values(freq)) {
      const p = count / total;
      entropy -= p * Math.log2(p);
    }
    
    return { entropy, freq, total };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-4 rounded-xl">
              <TrendingUp className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Probability Theory & Stochastic Processes
              </h1>
              <p className="text-gray-600 mt-2">
                Interactive exploration with mathematical foundations and programming examples
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-8">
          <div className="flex gap-2 flex-wrap">
            {[
              { id: 'random-variables', label: 'Random Variables & Distributions', icon: BarChart3 },
              { id: 'conditional', label: 'Conditional Probability & Bayes', icon: GitBranch },
              { id: 'moments', label: 'Expectation & Variance', icon: Calculator },
              { id: 'theorems', label: 'LLN & CLT', icon: TrendingUp },
              { id: 'markov', label: 'Markov Chains', icon: Activity },
              { id: 'information', label: 'Information Theory', icon: Database }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden lg:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Random Variables & Distributions */}
        {activeTab === 'random-variables' && (
          <div className="space-y-6">
            {/* Introduction */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-purple-600" />
                Random Variables & Probability Distributions
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Random Variable</h3>
                  <p className="text-gray-700 mb-4">
                    A function that maps outcomes from a sample space to real numbers: X: Ω → ℝ
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="bg-white rounded p-3">
                      <strong>Discrete:</strong> Takes countable values (e.g., dice roll, coin flips)
                    </div>
                    <div className="bg-white rounded p-3">
                      <strong>Continuous:</strong> Takes values in an interval (e.g., height, temperature)
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Probability Distribution</h3>
                  <p className="text-gray-700 mb-4">
                    Describes how probabilities are distributed over values
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="bg-white rounded p-3">
                      <strong>PMF (Discrete):</strong> P(X = x) for each value x
                    </div>
                    <div className="bg-white rounded p-3">
                      <strong>PDF (Continuous):</strong> f(x) where P(a ≤ X ≤ b) = ∫[a,b] f(x)dx
                    </div>
                    <div className="bg-white rounded p-3">
                      <strong>CDF:</strong> F(x) = P(X ≤ x)
                    </div>
                  </div>
                </div>
              </div>

              {/* Mathematical Foundations */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Mathematical Foundations</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white rounded p-4">
                    <h4 className="font-bold mb-2">For Discrete RV:</h4>
                    <div className="space-y-2 font-mono text-xs">
                      <div>PMF: P(X = xᵢ) = pᵢ</div>
                      <div>∑ pᵢ = 1</div>
                      <div>CDF: F(x) = ∑[xᵢ≤x] P(X = xᵢ)</div>
                    </div>
                  </div>
                  <div className="bg-white rounded p-4">
                    <h4 className="font-bold mb-2">For Continuous RV:</h4>
                    <div className="space-y-2 font-mono text-xs">
                      <div>PDF: f(x) ≥ 0</div>
                      <div>∫[-∞,∞] f(x)dx = 1</div>
                      <div>CDF: F(x) = ∫[-∞,x] f(t)dt</div>
                      <div>f(x) = dF(x)/dx</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Common Distributions */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Common Probability Distributions</h3>
              
              {/* Distribution Selector */}
              <div className="flex gap-2 mb-6 flex-wrap">
                {distributions.map(dist => (
                  <button
                    key={dist.key}
                    onClick={() => setSelectedDistribution(dist.key)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedDistribution === dist.key
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {dist.name}
                  </button>
                ))}
              </div>

              {/* Distribution Details */}
              {distributions.filter(d => d.key === selectedDistribution).map(dist => (
                <div key={dist.key} className="space-y-6">
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6">
                    <h4 className="text-2xl font-bold text-gray-900 mb-3">{dist.name}</h4>
                    <p className="text-gray-700 mb-4">{dist.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-bold text-gray-900 mb-2">Mathematical Definition</h5>
                        <div className="font-mono text-sm bg-gray-50 p-3 rounded">
                          {dist.pdf}
                        </div>
                        <div className="mt-3 space-y-1 text-sm">
                          <div><strong>Parameters:</strong> {dist.parameters}</div>
                          <div><strong>Mean (E[X]):</strong> {dist.mean}</div>
                          <div><strong>Variance (Var[X]):</strong> {dist.variance}</div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-bold text-gray-900 mb-2">Real-world Applications</h5>
                        <ul className="space-y-2">
                          {dist.applications.map((app, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <ChevronRight className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{app}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Python Code Example */}
                  <div className="bg-gray-900 rounded-lg p-6 text-white">
                    <div className="flex items-center gap-2 mb-4">
                      <Code className="w-5 h-5 text-green-400" />
                      <h5 className="font-bold">Python Implementation</h5>
                    </div>
                    <pre className="text-sm overflow-x-auto">
                      <code>{dist.pythonCode}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conditional Probability & Bayes' Rule */}
        {activeTab === 'conditional' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <GitBranch className="w-8 h-8 text-purple-600" />
                Conditional Probability & Bayes' Rule
              </h2>

              {/* Mathematical Theory */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Conditional Probability</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded p-4">
                      <div className="font-bold mb-2">Definition:</div>
                      <div className="font-mono text-sm bg-gray-50 p-3 rounded">
                        P(A|B) = P(A ∩ B) / P(B)
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Probability of A given that B has occurred
                      </p>
                    </div>

                    <div className="bg-white rounded p-4">
                      <div className="font-bold mb-2">Multiplication Rule:</div>
                      <div className="font-mono text-sm bg-gray-50 p-3 rounded">
                        P(A ∩ B) = P(A|B) · P(B)
                      </div>
                    </div>

                    <div className="bg-white rounded p-4">
                      <div className="font-bold mb-2">Independence:</div>
                      <div className="font-mono text-sm bg-gray-50 p-3 rounded">
                        P(A|B) = P(A) ⟺ A ⊥ B
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Bayes' Theorem</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded p-4">
                      <div className="font-bold mb-2">Bayes' Rule:</div>
                      <div className="font-mono text-sm bg-gray-50 p-3 rounded">
                        P(A|B) = [P(B|A) · P(A)] / P(B)
                      </div>
                    </div>

                    <div className="bg-white rounded p-4">
                      <div className="font-bold mb-2">Law of Total Probability:</div>
                      <div className="font-mono text-sm bg-gray-50 p-3 rounded">
                        P(B) = ∑ᵢ P(B|Aᵢ) · P(Aᵢ)
                      </div>
                    </div>

                    <div className="bg-white rounded p-4 text-sm">
                      <div className="font-bold mb-2">Components:</div>
                      <div className="space-y-1 text-gray-700">
                        <div><strong>P(A)</strong>: Prior probability</div>
                        <div><strong>P(B|A)</strong>: Likelihood</div>
                        <div><strong>P(A|B)</strong>: Posterior probability</div>
                        <div><strong>P(B)</strong>: Evidence/marginal</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Bayes Calculator */}
              <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-xl p-6 mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Bayes' Rule Calculator</h3>
                <p className="text-gray-700 mb-6">
                  Medical Test Example: Calculate the probability of having a disease given a positive test result.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        P(Disease) - Prior probability: {(bayesParams.pA * 100).toFixed(1)}%
                      </label>
                      <input
                        type="range"
                        min="0.001"
                        max="0.2"
                        step="0.001"
                        value={bayesParams.pA}
                        onChange={(e) => setBayesParams({...bayesParams, pA: parseFloat(e.target.value)})}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        P(Positive|Disease) - Sensitivity: {(bayesParams.pBA * 100).toFixed(1)}%
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="0.999"
                        step="0.001"
                        value={bayesParams.pBA}
                        onChange={(e) => setBayesParams({...bayesParams, pBA: parseFloat(e.target.value)})}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        P(Positive|No Disease) - False Positive: {(bayesParams.pBnotA * 100).toFixed(1)}%
                      </label>
                      <input
                        type="range"
                        min="0.001"
                        max="0.5"
                        step="0.001"
                        value={bayesParams.pBnotA}
                        onChange={(e) => setBayesParams({...bayesParams, pBnotA: parseFloat(e.target.value)})}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Results:</h4>
                    {(() => {
                      const { pB, pAB, pNotA } = calculateBayes();
                      return (
                        <div className="space-y-3">
                          <div className="bg-blue-50 p-4 rounded">
                            <div className="text-sm text-gray-600">P(Positive Test)</div>
                            <div className="text-2xl font-bold text-blue-600">{(pB * 100).toFixed(2)}%</div>
                          </div>
                          <div className="bg-green-50 p-4 rounded">
                            <div className="text-sm text-gray-600">P(Disease|Positive) - Posterior</div>
                            <div className="text-2xl font-bold text-green-600">{(pAB * 100).toFixed(2)}%</div>
                          </div>
                          <div className="text-sm text-gray-600 mt-4">
                            <strong>Interpretation:</strong> Even with a positive test result, 
                            the actual probability of having the disease is {(pAB * 100).toFixed(2)}%, 
                            because the disease is rare (only {(bayesParams.pA * 100).toFixed(1)}% prevalence).
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* Python Implementation */}
              <div className="bg-gray-900 rounded-lg p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-green-400" />
                  <h5 className="font-bold">Python Implementation: Bayes' Rule</h5>
                </div>
                <pre className="text-sm overflow-x-auto">
                  <code>{`import numpy as np
import matplotlib.pyplot as plt

def bayes_rule(prior, likelihood, false_positive):
    """
    Calculate posterior probability using Bayes' rule
    
    Args:
        prior: P(A) - prior probability of event
        likelihood: P(B|A) - probability of evidence given event
        false_positive: P(B|not A) - probability of evidence without event
    
    Returns:
        posterior: P(A|B) - probability of event given evidence
    """
    # P(not A)
    not_prior = 1 - prior
    
    # P(B) using law of total probability
    evidence = likelihood * prior + false_positive * not_prior
    
    # Bayes' rule: P(A|B) = P(B|A) * P(A) / P(B)
    posterior = (likelihood * prior) / evidence
    
    return posterior, evidence

# Medical test example
prior = 0.01  # 1% disease prevalence
sensitivity = 0.95  # 95% true positive rate
false_pos_rate = 0.05  # 5% false positive rate

posterior, evidence_prob = bayes_rule(prior, sensitivity, false_pos_rate)

print(f"Prior P(Disease) = {prior:.2%}")
print(f"Sensitivity P(+|Disease) = {sensitivity:.2%}")
print(f"False Positive Rate P(+|Healthy) = {false_pos_rate:.2%}")
print(f"\\nP(Positive Test) = {evidence_prob:.2%}")
print(f"Posterior P(Disease|+) = {posterior:.2%}")

# Visualize how prior affects posterior
priors = np.linspace(0.001, 0.2, 100)
posteriors = [bayes_rule(p, sensitivity, false_pos_rate)[0] for p in priors]

plt.figure(figsize=(10, 6))
plt.plot(priors * 100, np.array(posteriors) * 100, linewidth=2)
plt.xlabel('Prior Probability (%)')
plt.ylabel('Posterior Probability (%)')
plt.title('Effect of Prior on Posterior (Sensitivity=95%, FPR=5%)')
plt.grid(alpha=0.3)
plt.show()`}</code>
                </pre>
              </div>

              {/* Joint Probability */}
              <div className="mt-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Joint Probability</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white rounded p-4">
                    <h4 className="font-bold mb-2">For Discrete Variables:</h4>
                    <div className="font-mono text-xs bg-gray-50 p-3 rounded mb-3">
                      P(X=x, Y=y) = pₓᵧ
                    </div>
                    <div className="font-mono text-xs bg-gray-50 p-3 rounded">
                      ∑ₓ ∑ᵧ P(X=x, Y=y) = 1
                    </div>
                  </div>
                  <div className="bg-white rounded p-4">
                    <h4 className="font-bold mb-2">For Continuous Variables:</h4>
                    <div className="font-mono text-xs bg-gray-50 p-3 rounded mb-3">
                      f(x,y) - joint PDF
                    </div>
                    <div className="font-mono text-xs bg-gray-50 p-3 rounded">
                      ∫∫ f(x,y) dx dy = 1
                    </div>
                  </div>
                  <div className="bg-white rounded p-4">
                    <h4 className="font-bold mb-2">Marginal Distribution:</h4>
                    <div className="font-mono text-xs bg-gray-50 p-3 rounded">
                      P(X=x) = ∑ᵧ P(X=x, Y=y)
                    </div>
                  </div>
                  <div className="bg-white rounded p-4">
                    <h4 className="font-bold mb-2">Independence:</h4>
                    <div className="font-mono text-xs bg-gray-50 p-3 rounded">
                      P(X,Y) = P(X)·P(Y)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Expectation, Variance, Covariance */}
        {activeTab === 'moments' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-purple-600" />
                Expectation, Variance, Covariance & Correlation
              </h2>

              {/* Expectation */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Expected Value (Mean)</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Definition & Properties</h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-white rounded p-3">
                        <strong>Discrete:</strong>
                        <div className="font-mono text-xs mt-1 bg-gray-50 p-2 rounded">
                          E[X] = ∑ xᵢ · P(X = xᵢ)
                        </div>
                      </div>
                      <div className="bg-white rounded p-3">
                        <strong>Continuous:</strong>
                        <div className="font-mono text-xs mt-1 bg-gray-50 p-2 rounded">
                          E[X] = ∫ x · f(x) dx
                        </div>
                      </div>
                      <div className="bg-white rounded p-3">
                        <strong>Linearity:</strong>
                        <div className="font-mono text-xs mt-1 bg-gray-50 p-2 rounded">
                          E[aX + bY] = aE[X] + bE[Y]
                        </div>
                      </div>
                      <div className="bg-white rounded p-3">
                        <strong>Law of Unconscious Statistician:</strong>
                        <div className="font-mono text-xs mt-1 bg-gray-50 p-2 rounded">
                          E[g(X)] = ∑ g(xᵢ) · P(X = xᵢ)
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Interpretation</h4>
                    <p className="text-gray-700 text-sm mb-4">
                      The expected value represents the long-run average value if we repeat an experiment infinitely many times. 
                      It's the center of mass of the probability distribution.
                    </p>
                    <div className="bg-white rounded p-4 text-sm">
                      <strong>Example:</strong>
                      <p className="mt-2 text-gray-700">
                        Rolling a fair six-sided die:
                      </p>
                      <div className="font-mono text-xs mt-2 bg-gray-50 p-2 rounded">
                        E[X] = 1·(1/6) + 2·(1/6) + ... + 6·(1/6) = 3.5
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Variance */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Variance & Standard Deviation</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Mathematical Definitions</h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-white rounded p-3">
                        <strong>Variance:</strong>
                        <div className="font-mono text-xs mt-1 bg-gray-50 p-2 rounded">
                          Var(X) = E[(X - μ)²] = E[X²] - (E[X])²
                        </div>
                      </div>
                      <div className="bg-white rounded p-3">
                        <strong>Standard Deviation:</strong>
                        <div className="font-mono text-xs mt-1 bg-gray-50 p-2 rounded">
                          σ = √Var(X)
                        </div>
                      </div>
                      <div className="bg-white rounded p-3">
                        <strong>Properties:</strong>
                        <div className="space-y-1 mt-1 text-xs">
                          <div className="font-mono bg-gray-50 p-2 rounded">Var(aX + b) = a²Var(X)</div>
                          <div className="font-mono bg-gray-50 p-2 rounded">Var(X + Y) = Var(X) + Var(Y) + 2Cov(X,Y)</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Interpretation</h4>
                    <p className="text-gray-700 text-sm mb-4">
                      Variance measures the spread or dispersion of a distribution around its mean. 
                      Higher variance means more variability in the data.
                    </p>
                    <div className="bg-white rounded p-4">
                      <strong className="text-sm">Computational Formula:</strong>
                      <div className="font-mono text-xs mt-2 bg-gray-50 p-3 rounded">
                        σ² = [∑(xᵢ - μ)²·P(X=xᵢ)]
                        <br/>or
                        <br/>σ² = E[X²] - μ²
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        The second formula is often easier for computation
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Covariance and Correlation */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Covariance & Correlation</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Covariance</h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-white rounded p-3">
                        <strong>Definition:</strong>
                        <div className="font-mono text-xs mt-1 bg-gray-50 p-2 rounded">
                          Cov(X,Y) = E[(X-μₓ)(Y-μᵧ)]
                          <br/>= E[XY] - E[X]E[Y]
                        </div>
                      </div>
                      <div className="bg-white rounded p-3">
                        <strong>Properties:</strong>
                        <div className="space-y-1 mt-1 text-xs">
                          <div>• Cov(X,X) = Var(X)</div>
                          <div>• Cov(X,Y) = Cov(Y,X)</div>
                          <div>• Cov(aX,bY) = ab·Cov(X,Y)</div>
                          <div>• If X ⊥ Y, then Cov(X,Y) = 0</div>
                        </div>
                      </div>
                      <div className="bg-white rounded p-3">
                        <strong>Interpretation:</strong>
                        <div className="text-xs mt-1 text-gray-700">
                          <div>• Positive: Variables tend to increase together</div>
                          <div>• Negative: One increases, other decreases</div>
                          <div>• Zero: No linear relationship</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Correlation Coefficient</h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-white rounded p-3">
                        <strong>Pearson Correlation:</strong>
                        <div className="font-mono text-xs mt-1 bg-gray-50 p-2 rounded">
                          ρ(X,Y) = Cov(X,Y) / (σₓ · σᵧ)
                        </div>
                      </div>
                      <div className="bg-white rounded p-3">
                        <strong>Properties:</strong>
                        <div className="space-y-1 mt-1 text-xs">
                          <div>• -1 ≤ ρ ≤ 1</div>
                          <div>• ρ = 1: Perfect positive correlation</div>
                          <div>• ρ = -1: Perfect negative correlation</div>
                          <div>• ρ = 0: No linear correlation</div>
                        </div>
                      </div>
                      <div className="bg-white rounded p-3">
                        <strong>Advantage over Covariance:</strong>
                        <div className="text-xs mt-1 text-gray-700">
                          Correlation is dimensionless and bounded, making it easier to interpret 
                          the strength of relationship
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Python Implementation */}
              <div className="bg-gray-900 rounded-lg p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-green-400" />
                  <h5 className="font-bold">Python Implementation: Statistical Moments</h5>
                </div>
                <pre className="text-sm overflow-x-auto">
                  <code>{`import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

# Generate correlated data
np.random.seed(42)
n = 1000

# Create correlation matrix
rho = 0.7  # correlation coefficient
mean = [0, 0]
cov_matrix = [[1, rho], [rho, 1]]

# Generate bivariate normal data
X, Y = np.random.multivariate_normal(mean, cov_matrix, n).T

# Calculate moments
print("=== Statistical Moments ===")
print(f"E[X] = {np.mean(X):.4f}")
print(f"E[Y] = {np.mean(Y):.4f}")
print(f"Var(X) = {np.var(X, ddof=1):.4f}")
print(f"Var(Y) = {np.var(Y, ddof=1):.4f}")
print(f"Std(X) = {np.std(X, ddof=1):.4f}")
print(f"Std(Y) = {np.std(Y, ddof=1):.4f}")

# Calculate covariance and correlation
cov_xy = np.cov(X, Y)[0, 1]
corr_xy = np.corrcoef(X, Y)[0, 1]

print(f"\\nCov(X,Y) = {cov_xy:.4f}")
print(f"Corr(X,Y) = {corr_xy:.4f}")

# Verify formulas
manual_cov = np.mean((X - np.mean(X)) * (Y - np.mean(Y)))
manual_corr = manual_cov / (np.std(X, ddof=1) * np.std(Y, ddof=1))

print(f"\\nManual Cov(X,Y) = {manual_cov:.4f}")
print(f"Manual Corr(X,Y) = {manual_corr:.4f}")

# Visualize
fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# Scatter plot
axes[0].scatter(X, Y, alpha=0.5, s=20)
axes[0].set_xlabel('X')
axes[0].set_ylabel('Y')
axes[0].set_title(f'Scatter Plot (ρ = {corr_xy:.2f})')
axes[0].grid(alpha=0.3)

# Marginal distributions
axes[1].hist(X, bins=30, alpha=0.7, density=True, label='X')
axes[1].hist(Y, bins=30, alpha=0.7, density=True, label='Y')
axes[1].set_xlabel('Value')
axes[1].set_ylabel('Density')
axes[1].set_title('Marginal Distributions')
axes[1].legend()
axes[1].grid(alpha=0.3)

# Correlation for different rho values
rho_values = np.linspace(-0.95, 0.95, 10)
for i, rho_val in enumerate(rho_values):
    cov_mat = [[1, rho_val], [rho_val, 1]]
    X_temp, Y_temp = np.random.multivariate_normal([0, 0], cov_mat, 100).T
    axes[2].scatter(X_temp, Y_temp, alpha=0.3, s=10, label=f'ρ={rho_val:.1f}' if i % 2 == 0 else '')

axes[2].set_xlabel('X')
axes[2].set_ylabel('Y')
axes[2].set_title('Effect of Correlation')
axes[2].legend()
axes[2].grid(alpha=0.3)

plt.tight_layout()
plt.show()

# Example: Portfolio variance
print("\\n=== Portfolio Example ===")
# Two assets with returns
r1, r2 = 0.08, 0.12  # expected returns
sigma1, sigma2 = 0.15, 0.20  # volatilities
rho_12 = 0.3  # correlation

# Portfolio with weights w1, w2 = 1-w1
w1 = 0.6
w2 = 1 - w1

# Portfolio return
portfolio_return = w1 * r1 + w2 * r2

# Portfolio variance
portfolio_var = (w1**2 * sigma1**2 + 
                 w2**2 * sigma2**2 + 
                 2 * w1 * w2 * rho_12 * sigma1 * sigma2)
portfolio_std = np.sqrt(portfolio_var)

print(f"Portfolio Return: {portfolio_return:.2%}")
print(f"Portfolio Risk (Std): {portfolio_std:.2%}")
print(f"Diversification benefit from correlation: {rho_12}")`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Law of Large Numbers & Central Limit Theorem */}
        {activeTab === 'theorems' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-purple-600" />
                Law of Large Numbers & Central Limit Theorem
              </h2>

              {/* Law of Large Numbers */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Law of Large Numbers (LLN)</h3>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Weak Law of Large Numbers</h4>
                    <div className="bg-white rounded p-4 mb-4">
                      <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-2">
                        lim(n→∞) P(|X̄ₙ - μ| &gt; ε) = 0
                      </div>
                      <p className="text-sm text-gray-700">
                        For any ε &gt; 0, where X̄ₙ = (X₁ + ... + Xₙ)/n
                      </p>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      The sample mean converges in probability to the population mean as sample size increases.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded p-3 text-sm">
                      <strong>Intuition:</strong> As you collect more data, your sample average gets closer 
                      to the true population average.
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Strong Law of Large Numbers</h4>
                    <div className="bg-white rounded p-4 mb-4">
                      <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-2">
                        P(lim(n→∞) X̄ₙ = μ) = 1
                      </div>
                      <p className="text-sm text-gray-700">
                        Almost sure convergence
                      </p>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      The sample mean converges almost surely to the population mean. This is a stronger 
                      condition than the weak law.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm">
                      <strong>Key Difference:</strong> SLLN guarantees convergence for almost all sequences, 
                      while WLLN only requires convergence in probability.
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-lg p-6">
                  <h4 className="font-bold text-gray-900 mb-3">Applications of LLN</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-white rounded p-4">
                      <strong className="text-green-700">Monte Carlo Simulation:</strong>
                      <p className="text-gray-700 mt-2">
                        Use random sampling to estimate integrals, probabilities, and expectations
                      </p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <strong className="text-green-700">Polling & Surveys:</strong>
                      <p className="text-gray-700 mt-2">
                        Larger samples give more accurate estimates of population parameters
                      </p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <strong className="text-green-700">Quality Control:</strong>
                      <p className="text-gray-700 mt-2">
                        Long-run average of defect rates converges to true defect probability
                      </p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <strong className="text-green-700">Insurance:</strong>
                      <p className="text-gray-700 mt-2">
                        Average claim amount approaches expected value with many policyholders
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Central Limit Theorem */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Central Limit Theorem (CLT)</h3>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 mb-6">
                  <h4 className="font-bold text-gray-900 mb-4">Theorem Statement</h4>
                  <div className="bg-white rounded p-6">
                    <p className="text-gray-700 mb-4">
                      Let X₁, X₂, ..., Xₙ be i.i.d. random variables with mean μ and variance σ². 
                      Define the sample mean X̄ₙ = (X₁ + ... + Xₙ)/n. Then:
                    </p>
                    <div className="font-mono text-sm bg-gray-50 p-4 rounded mb-4">
                      √n(X̄ₙ - μ) / σ → N(0, 1)
                      <br/><br/>
                      Or equivalently:
                      <br/>
                      X̄ₙ ~ N(μ, σ²/n) approximately for large n
                    </div>
                    <p className="text-gray-700">
                      The distribution of the sample mean approaches a normal distribution, 
                      <strong> regardless of the original distribution</strong>, as n increases.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Key Properties</h4>
                    <div className="space-y-2 text-sm">
                      <div className="bg-white rounded p-3">
                        <strong>Distribution-Free:</strong> Works for any distribution with finite variance
                      </div>
                      <div className="bg-white rounded p-3">
                        <strong>Sample Size:</strong> Usually n ≥ 30 is sufficient, but depends on original distribution
                      </div>
                      <div className="bg-white rounded p-3">
                        <strong>Convergence Rate:</strong> Error decreases at rate 1/√n
                      </div>
                      <div className="bg-white rounded p-3">
                        <strong>Standard Error:</strong> SE(X̄ₙ) = σ/√n
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Applications</h4>
                    <div className="space-y-2 text-sm">
                      <div className="bg-white rounded p-3">
                        <strong>Confidence Intervals:</strong> Construct intervals for unknown parameters
                      </div>
                      <div className="bg-white rounded p-3">
                        <strong>Hypothesis Testing:</strong> Test statistical hypotheses about means
                      </div>
                      <div className="bg-white rounded p-3">
                        <strong>Sample Size Calculation:</strong> Determine required sample size for desired precision
                      </div>
                      <div className="bg-white rounded p-3">
                        <strong>A/B Testing:</strong> Compare treatment effects using normal approximation
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive CLT Demonstration */}
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-lg p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Interactive CLT Demonstration</h4>
                  <p className="text-gray-700 mb-4 text-sm">
                    Adjust the sample size to see how the distribution of sample means approaches normality, 
                    even when sampling from non-normal distributions.
                  </p>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Sample Size per Mean (n): {cltSamples}
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="200"
                      value={cltSamples}
                      onChange={(e) => setCltSamples(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div className="bg-white rounded p-4">
                    <div className="text-sm text-gray-700">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <strong>Original Distribution:</strong> Uniform(0,1)
                          <div className="mt-1">Mean μ = 0.5, Variance σ² = 1/12</div>
                        </div>
                        <div>
                          <strong>Sample Mean Distribution:</strong>
                          <div className="mt-1">E[X̄] = 0.5, Var(X̄) = 1/(12n) = {(1/(12*cltSamples)).toFixed(5)}</div>
                          <div>SE(X̄) = {(1/Math.sqrt(12*cltSamples)).toFixed(4)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Python Implementation */}
              <div className="bg-gray-900 rounded-lg p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-green-400" />
                  <h5 className="font-bold">Python Implementation: LLN & CLT</h5>
                </div>
                <pre className="text-sm overflow-x-auto">
                  <code>{`import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

# ============= Law of Large Numbers =============
np.random.seed(42)

# True population parameters (uniform distribution)
true_mean = 0.5
n_experiments = 1000

# Running average
sample_sizes = np.arange(1, n_experiments + 1)
samples = np.random.uniform(0, 1, n_experiments)
running_means = np.cumsum(samples) / sample_sizes

# Plot LLN
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(sample_sizes, running_means, linewidth=2)
plt.axhline(y=true_mean, color='r', linestyle='--', linewidth=2, label=f'True Mean = {true_mean}')
plt.xlabel('Number of Samples')
plt.ylabel('Sample Mean')
plt.title('Law of Large Numbers: Convergence to True Mean')
plt.legend()
plt.grid(alpha=0.3)

# ============= Central Limit Theorem =============
# Sample from non-normal distribution (exponential)
lambda_param = 2
population_mean = 1 / lambda_param
population_std = 1 / lambda_param

# Different sample sizes
sample_sizes_clt = [5, 10, 30, 100]
n_simulations = 10000

plt.subplot(1, 2, 2)
for n in sample_sizes_clt:
    sample_means = []
    for _ in range(n_simulations):
        sample = np.random.exponential(1/lambda_param, n)
        sample_means.append(np.mean(sample))
    
    # Plot histogram
    plt.hist(sample_means, bins=50, alpha=0.5, density=True, label=f'n={n}')

# Overlay theoretical normal distribution
x = np.linspace(0.2, 0.8, 100)
plt.plot(x, stats.norm.pdf(x, population_mean, population_std/np.sqrt(100)), 
         'r-', linewidth=2, label='N(μ, σ²/n) for n=100')

plt.xlabel('Sample Mean')
plt.ylabel('Density')
plt.title('Central Limit Theorem: Sampling from Exponential')
plt.legend()
plt.grid(alpha=0.3)

plt.tight_layout()
plt.show()

# ============= CLT for Confidence Intervals =============
def confidence_interval(data, confidence=0.95):
    """
    Calculate confidence interval using CLT
    """
    n = len(data)
    mean = np.mean(data)
    se = stats.sem(data)  # Standard error
    
    # Critical value from standard normal
    alpha = 1 - confidence
    z_critical = stats.norm.ppf(1 - alpha/2)
    
    margin_of_error = z_critical * se
    ci_lower = mean - margin_of_error
    ci_upper = mean + margin_of_error
    
    return mean, ci_lower, ci_upper

# Example: estimate mean of population
np.random.seed(123)
sample_data = np.random.exponential(1/lambda_param, 100)
mean_est, ci_lower, ci_upper = confidence_interval(sample_data, 0.95)

print(f"\\n=== 95% Confidence Interval ===")
print(f"Sample Mean: {mean_est:.4f}")
print(f"95% CI: [{ci_lower:.4f}, {ci_upper:.4f}]")
print(f"True Mean: {population_mean:.4f}")
print(f"CI Contains True Mean: {ci_lower <= population_mean <= ci_upper}")

# Verify coverage probability
coverage_count = 0
n_trials = 1000

for _ in range(n_trials):
    sample = np.random.exponential(1/lambda_param, 100)
    _, ci_l, ci_u = confidence_interval(sample, 0.95)
    if ci_l <= population_mean <= ci_u:
        coverage_count += 1

print(f"\\nEmpirical Coverage: {coverage_count/n_trials:.2%} (should be ~95%)")

# ============= CLT for Hypothesis Testing =============
# Two-sample t-test example
group1 = np.random.normal(10, 2, 50)
group2 = np.random.normal(11, 2, 50)

t_stat, p_value = stats.ttest_ind(group1, group2)

print(f"\\n=== Two-Sample t-test (using CLT) ===")
print(f"Group 1 Mean: {np.mean(group1):.4f}")
print(f"Group 2 Mean: {np.mean(group2):.4f}")
print(f"t-statistic: {t_stat:.4f}")
print(f"p-value: {p_value:.4f}")
print(f"Reject H0 at α=0.05: {p_value < 0.05}")`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Markov Chains */}
        {activeTab === 'markov' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Activity className="w-8 h-8 text-purple-600" />
                Markov Chains & Stochastic Processes
              </h2>

              {/* Theory */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Markov Property</h3>
                  <div className="bg-white rounded p-4 mb-4">
                    <div className="font-mono text-sm bg-gray-50 p-3 rounded">
                      P(Xₙ₊₁|X₀,X₁,...,Xₙ) = P(Xₙ₊₁|Xₙ)
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    The future state depends only on the current state, not on the sequence of 
                    states that preceded it. This is the "memoryless" property.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm">
                    <strong>Key Insight:</strong> Past and future are independent given the present.
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Transition Matrix</h3>
                  <div className="bg-white rounded p-4 mb-4">
                    <div className="font-mono text-sm bg-gray-50 p-3 rounded">
                      P = [pᵢⱼ] where pᵢⱼ = P(Xₙ₊₁=j|Xₙ=i)
                      <br/><br/>
                      ∑ⱼ pᵢⱼ = 1 for all i
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    The transition matrix contains all one-step transition probabilities. 
                    Each row sums to 1.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded p-3 text-sm">
                    <strong>n-step transitions:</strong> Pⁿ gives probabilities for n steps ahead
                  </div>
                </div>
              </div>

              {/* Interactive Weather Model */}
              <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-lg p-6 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Weather Markov Chain</h3>
                <p className="text-gray-700 mb-6 text-sm">
                  A simple 3-state weather model. Click "Step" to transition to the next state based on 
                  the transition probabilities.
                </p>

                {/* Transition Matrix Display */}
                <div className="bg-white rounded-lg p-6 mb-6">
                  <h4 className="font-bold text-gray-900 mb-3">Transition Matrix P:</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr>
                          <th className="p-2 border"></th>
                          <th className="p-2 border bg-yellow-100">Sunny</th>
                          <th className="p-2 border bg-gray-100">Cloudy</th>
                          <th className="p-2 border bg-blue-100">Rainy</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 border bg-yellow-100 font-bold">Sunny</td>
                          <td className="p-2 border text-center">0.80</td>
                          <td className="p-2 border text-center">0.15</td>
                          <td className="p-2 border text-center">0.05</td>
                        </tr>
                        <tr>
                          <td className="p-2 border bg-gray-100 font-bold">Cloudy</td>
                          <td className="p-2 border text-center">0.30</td>
                          <td className="p-2 border text-center">0.40</td>
                          <td className="p-2 border text-center">0.30</td>
                        </tr>
                        <tr>
                          <td className="p-2 border bg-blue-100 font-bold">Rainy</td>
                          <td className="p-2 border text-center">0.20</td>
                          <td className="p-2 border text-center">0.30</td>
                          <td className="p-2 border text-center">0.50</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Simulation */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Current State</h4>
                    <div className={`text-6xl text-center mb-4`}>
                      {markovState === 'sunny' && '☀️'}
                      {markovState === 'cloudy' && '☁️'}
                      {markovState === 'rainy' && '🌧️'}
                    </div>
                    <div className="text-2xl font-bold text-center mb-4 capitalize">
                      {markovState}
                    </div>
                    <div className="text-center text-gray-600 mb-4">
                      Step: {markovSteps}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={simulateMarkovStep}
                        className="flex-1 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        Step
                      </button>
                      <button
                        onClick={resetMarkov}
                        className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Reset
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-4">State History</h4>
                    <div className="h-40 overflow-y-auto bg-gray-50 rounded p-3">
                      {markovHistory.map((state, idx) => (
                        <div key={idx} className="flex items-center gap-2 mb-2">
                          <span className="text-gray-600 text-sm">Step {idx}:</span>
                          <span className="font-semibold capitalize">{state}</span>
                          <span>
                            {state === 'sunny' && '☀️'}
                            {state === 'cloudy' && '☁️'}
                            {state === 'rainy' && '🌧️'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Concepts */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Stationary Distribution</h3>
                  <div className="bg-white rounded p-4 mb-4">
                    <div className="font-mono text-sm bg-gray-50 p-3 rounded">
                      π = πP, where ∑ᵢ πᵢ = 1
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    A probability distribution that remains unchanged by the transition matrix. 
                    The long-run proportion of time spent in each state.
                  </p>
                  <div className="bg-white rounded p-3 text-xs">
                    <strong>Properties:</strong>
                    <div className="mt-2 space-y-1">
                      <div>• Unique for irreducible, aperiodic chains</div>
                      <div>• lim(n→∞) Pⁿ converges to π</div>
                      <div>• Eigenvector of P with eigenvalue 1</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Key Properties</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-white rounded p-3">
                      <strong>Irreducible:</strong> All states communicate (can reach any state from any other)
                    </div>
                    <div className="bg-white rounded p-3">
                      <strong>Aperiodic:</strong> Can return to a state at irregular times (no cycles)
                    </div>
                    <div className="bg-white rounded p-3">
                      <strong>Ergodic:</strong> Irreducible + aperiodic (has unique stationary distribution)
                    </div>
                    <div className="bg-white rounded p-3">
                      <strong>Absorbing:</strong> State that cannot be left once entered (pᵢᵢ = 1)
                    </div>
                  </div>
                </div>
              </div>

              {/* Python Implementation */}
              <div className="bg-gray-900 rounded-lg p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-green-400" />
                  <h5 className="font-bold">Python Implementation: Markov Chains</h5>
                </div>
                <pre className="text-sm overflow-x-auto">
                  <code>{`import numpy as np
import matplotlib.pyplot as plt
from scipy.linalg import eig

# Define transition matrix (weather example)
P = np.array([
    [0.8, 0.15, 0.05],   # Sunny -> [Sunny, Cloudy, Rainy]
    [0.3, 0.4, 0.3],      # Cloudy -> [Sunny, Cloudy, Rainy]
    [0.2, 0.3, 0.5]       # Rainy -> [Sunny, Cloudy, Rainy]
])

states = ['Sunny', 'Cloudy', 'Rainy']

# Verify it's a valid transition matrix
print("=== Transition Matrix ===")
print(P)
print(f"\\nRow sums (should be 1): {P.sum(axis=1)}")

# ============= Simulate Markov Chain =============
def simulate_markov_chain(P, initial_state, n_steps):
    """
    Simulate a Markov chain
    
    Args:
        P: transition matrix
        initial_state: starting state index
        n_steps: number of steps to simulate
        
    Returns:
        List of states visited
    """
    n_states = P.shape[0]
    states = [initial_state]
    current_state = initial_state
    
    for _ in range(n_steps):
        # Transition probabilities from current state
        probs = P[current_state, :]
        # Sample next state
        next_state = np.random.choice(n_states, p=probs)
        states.append(next_state)
        current_state = next_state
    
    return states

# Simulate
np.random.seed(42)
n_steps = 100
initial_state = 0  # Start with Sunny

trajectory = simulate_markov_chain(P, initial_state, n_steps)

print(f"\\n=== Simulation (first 20 steps) ===")
for i, state_idx in enumerate(trajectory[:20]):
    print(f"Step {i}: {states[state_idx]}")

# ============= Find Stationary Distribution =============
def find_stationary_distribution(P):
    """
    Find stationary distribution by solving πP = π
    """
    # Find eigenvector with eigenvalue 1
    eigenvalues, eigenvectors = eig(P.T)
    
    # Find index of eigenvalue closest to 1
    idx = np.argmin(np.abs(eigenvalues - 1))
    stationary = np.real(eigenvectors[:, idx])
    
    # Normalize to sum to 1
    stationary = stationary / stationary.sum()
    
    return stationary

stationary_dist = find_stationary_distribution(P)

print(f"\\n=== Stationary Distribution ===")
for state, prob in zip(states, stationary_dist):
    print(f"{state}: {prob:.4f}")

# Verify: π should equal πP
verify = stationary_dist @ P
print(f"\\nVerification (πP should equal π):")
print(f"π = {stationary_dist}")
print(f"πP = {verify}")

# ============= Long-run Behavior =============
# Compute P^n for large n
n_powers = [1, 5, 10, 20, 50, 100]
print(f"\\n=== P^n (convergence to stationary distribution) ===")

for n in n_powers:
    P_n = np.linalg.matrix_power(P, n)
    print(f"\\nP^{n}:")
    print(P_n)

# Each row should converge to the stationary distribution

# ============= Empirical Distribution =============
# Count state visits in simulation
state_counts = np.bincount(trajectory, minlength=len(states))
empirical_dist = state_counts / len(trajectory)

print(f"\\n=== Empirical vs Theoretical ===")
print(f"{'State':<10} {'Empirical':<12} {'Theoretical':<12}")
for i, state in enumerate(states):
    print(f"{state:<10} {empirical_dist[i]:<12.4f} {stationary_dist[i]:<12.4f}")

# ============= Visualization =============
fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# Trajectory
axes[0].plot(trajectory[:100])
axes[0].set_yticks([0, 1, 2])
axes[0].set_yticklabels(states)
axes[0].set_xlabel('Time Step')
axes[0].set_ylabel('State')
axes[0].set_title('Markov Chain Trajectory')
axes[0].grid(alpha=0.3)

# State distribution over time
window_size = 50
running_dist = np.zeros((len(trajectory) - window_size, len(states)))
for i in range(len(trajectory) - window_size):
    window = trajectory[i:i+window_size]
    for j in range(len(states)):
        running_dist[i, j] = (np.array(window) == j).sum() / window_size

for i, state in enumerate(states):
    axes[1].plot(running_dist[:, i], label=state)
    axes[1].axhline(y=stationary_dist[i], color=f'C{i}', linestyle='--', alpha=0.5)

axes[1].set_xlabel('Time')
axes[1].set_ylabel('Proportion')
axes[1].set_title('State Distribution Over Time')
axes[1].legend()
axes[1].grid(alpha=0.3)

# Comparison bar plot
x = np.arange(len(states))
width = 0.35
axes[2].bar(x - width/2, empirical_dist, width, label='Empirical', alpha=0.8)
axes[2].bar(x + width/2, stationary_dist, width, label='Theoretical', alpha=0.8)
axes[2].set_xticks(x)
axes[2].set_xticklabels(states)
axes[2].set_ylabel('Probability')
axes[2].set_title('Stationary Distribution Comparison')
axes[2].legend()
axes[2].grid(alpha=0.3, axis='y')

plt.tight_layout()
plt.show()

# ============= Applications =============
print(f"\\n=== Real-world Applications ===")
print("1. PageRank: Web pages as states, links as transitions")
print("2. Speech Recognition: Hidden Markov Models (HMM)")
print("3. Queueing Theory: Customer states in service systems")
print("4. Finance: Credit rating transitions")
print("5. Biology: DNA sequence modeling")`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Information Theory */}
        {activeTab === 'information' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Database className="w-8 h-8 text-purple-600" />
                Information Theory Basics
              </h2>

              {/* Entropy */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Shannon Entropy</h3>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Mathematical Definition</h4>
                    <div className="bg-white rounded p-4 mb-4">
                      <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-2">
                        H(X) = -∑ᵢ p(xᵢ) log₂ p(xᵢ)
                      </div>
                      <p className="text-sm text-gray-700">
                        Or equivalently:
                      </p>
                      <div className="font-mono text-sm bg-gray-50 p-3 rounded mt-2">
                        H(X) = E[-log₂ P(X)]
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="bg-white rounded p-3">
                        <strong>Units:</strong> Bits (when using log₂), nats (when using ln)
                      </div>
                      <div className="bg-white rounded p-3">
                        <strong>Range:</strong> 0 ≤ H(X) ≤ log₂(n), where n is number of outcomes
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Interpretation</h4>
                    <p className="text-gray-700 text-sm mb-4">
                      Entropy measures the average amount of information (or uncertainty) in a random variable. 
                      Higher entropy means more uncertainty.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="bg-white rounded p-3">
                        <strong>Minimum (H=0):</strong> Deterministic (one outcome has p=1)
                      </div>
                      <div className="bg-white rounded p-3">
                        <strong>Maximum:</strong> Uniform distribution (all outcomes equally likely)
                      </div>
                      <div className="bg-white rounded p-3">
                        <strong>Interpretation:</strong> Minimum bits needed to encode a message on average
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Entropy Calculator */}
                <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-lg p-6 mb-6">
                  <h4 className="font-bold text-gray-900 mb-4">Interactive Entropy Calculator</h4>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Enter text to calculate entropy:
                    </label>
                    <input
                      type="text"
                      value={entropyText}
                      onChange={(e) => setEntropyText(e.target.value)}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 outline-none"
                      placeholder="Type something..."
                    />
                  </div>

                  {(() => {
                    const { entropy, freq, total } = calculateEntropy(entropyText);
                    return (
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg p-6">
                          <h5 className="font-bold text-gray-900 mb-3">Results:</h5>
                          <div className="space-y-3">
                            <div className="bg-blue-50 p-4 rounded">
                              <div className="text-sm text-gray-600">Entropy</div>
                              <div className="text-2xl font-bold text-blue-600">{entropy.toFixed(4)} bits</div>
                            </div>
                            <div className="bg-green-50 p-4 rounded">
                              <div className="text-sm text-gray-600">Unique Characters</div>
                              <div className="text-2xl font-bold text-green-600">{Object.keys(freq).length}</div>
                            </div>
                            <div className="bg-purple-50 p-4 rounded">
                              <div className="text-sm text-gray-600">Total Characters</div>
                              <div className="text-2xl font-bold text-purple-600">{total}</div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-6">
                          <h5 className="font-bold text-gray-900 mb-3">Character Frequencies:</h5>
                          <div className="max-h-40 overflow-y-auto">
                            {Object.entries(freq)
                              .sort((a, b) => b[1] - a[1])
                              .map(([char, count]) => (
                                <div key={char} className="flex justify-between items-center mb-2 text-sm">
                                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">{char}</span>
                                  <span className="text-gray-600">{count} ({((count/total)*100).toFixed(1)}%)</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* KL Divergence */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Kullback-Leibler (KL) Divergence</h3>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Definition</h4>
                    <div className="bg-white rounded p-4 mb-4">
                      <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-2">
                        D_KL(P||Q) = ∑ᵢ P(xᵢ) log₂[P(xᵢ)/Q(xᵢ)]
                      </div>
                      <p className="text-sm text-gray-700 mt-2">
                        Or equivalently:
                      </p>
                      <div className="font-mono text-sm bg-gray-50 p-3 rounded mt-2">
                        D_KL(P||Q) = E_P[log P(X) - log Q(X)]
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="bg-white rounded p-3">
                        <strong>Properties:</strong>
                        <div className="mt-1 space-y-1 text-xs">
                          <div>• D_KL(P||Q) ≥ 0 (non-negative)</div>
                          <div>• D_KL(P||Q) = 0 iff P = Q</div>
                          <div>• NOT symmetric: D_KL(P||Q) ≠ D_KL(Q||P)</div>
                          <div>• NOT a distance metric</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Interpretation</h4>
                    <p className="text-gray-700 text-sm mb-4">
                      KL divergence measures how much one probability distribution P differs from 
                      a reference distribution Q. It quantifies the "information loss" when using 
                      Q to approximate P.
                    </p>
                    <div className="bg-white rounded p-4">
                      <strong className="text-sm">Applications:</strong>
                      <ul className="mt-2 space-y-1 text-xs">
                        <li>• Variational inference (ELBO)</li>
                        <li>• Model comparison and selection</li>
                        <li>• Maximum likelihood estimation</li>
                        <li>• Information bottleneck method</li>
                        <li>• Neural network training (cross-entropy loss)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mutual Information */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Mutual Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Mathematical Definitions</h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-white rounded p-4">
                        <strong>Mutual Information:</strong>
                        <div className="font-mono text-xs mt-1 bg-gray-50 p-2 rounded">
                          I(X;Y) = ∑ᵢ∑ⱼ P(xᵢ,yⱼ) log₂[P(xᵢ,yⱼ)/(P(xᵢ)P(yⱼ))]
                        </div>
                      </div>
                      <div className="bg-white rounded p-4">
                        <strong>Alternative Form:</strong>
                        <div className="font-mono text-xs mt-1 bg-gray-50 p-2 rounded">
                          I(X;Y) = H(X) + H(Y) - H(X,Y)
                        </div>
                      </div>
                      <div className="bg-white rounded p-4">
                        <strong>As KL Divergence:</strong>
                        <div className="font-mono text-xs mt-1 bg-gray-50 p-2 rounded">
                          I(X;Y) = D_KL(P(X,Y) || P(X)P(Y))
                        </div>
                      </div>
                      <div className="bg-white rounded p-4">
                        <strong>Properties:</strong>
                        <div className="mt-1 space-y-1 text-xs">
                          <div>• I(X;Y) ≥ 0</div>
                          <div>• I(X;Y) = 0 iff X ⊥ Y</div>
                          <div>• I(X;Y) = I(Y;X) (symmetric)</div>
                          <div>• I(X;X) = H(X)</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Interpretation & Applications</h4>
                    <p className="text-gray-700 text-sm mb-4">
                      Mutual information quantifies the amount of information one random variable 
                      contains about another. It measures the reduction in uncertainty about X 
                      given knowledge of Y.
                    </p>
                    <div className="space-y-3">
                      <div className="bg-white rounded p-3 text-sm">
                        <strong>Feature Selection:</strong>
                        <p className="text-xs mt-1 text-gray-600">
                          Select features with high MI with target variable
                        </p>
                      </div>
                      <div className="bg-white rounded p-3 text-sm">
                        <strong>Image Registration:</strong>
                        <p className="text-xs mt-1 text-gray-600">
                          Align images by maximizing MI between them
                        </p>
                      </div>
                      <div className="bg-white rounded p-3 text-sm">
                        <strong>Clustering:</strong>
                        <p className="text-xs mt-1 text-gray-600">
                          Evaluate cluster quality using normalized MI
                        </p>
                      </div>
                      <div className="bg-white rounded p-3 text-sm">
                        <strong>Neural Networks:</strong>
                        <p className="text-xs mt-1 text-gray-600">
                          Information bottleneck theory, representation learning
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cross-Entropy */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cross-Entropy</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded p-4">
                    <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-3">
                      H(P,Q) = -∑ᵢ P(xᵢ) log₂ Q(xᵢ)
                    </div>
                    <div className="font-mono text-sm bg-gray-50 p-3 rounded mb-3">
                      H(P,Q) = H(P) + D_KL(P||Q)
                    </div>
                    <p className="text-sm text-gray-700">
                      Cross-entropy between distributions P and Q equals the entropy of P plus 
                      the KL divergence from P to Q.
                    </p>
                  </div>
                  <div className="bg-white rounded p-4">
                    <strong className="text-sm">ML Applications:</strong>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• Classification loss function</li>
                      <li>• Language model training</li>
                      <li>• Measures prediction quality</li>
                      <li>• Minimizing cross-entropy = maximizing likelihood</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Python Implementation */}
              <div className="bg-gray-900 rounded-lg p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-green-400" />
                  <h5 className="font-bold">Python Implementation: Information Theory</h5>
                </div>
                <pre className="text-sm overflow-x-auto">
                  <code>{`import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import entropy as scipy_entropy
from sklearn.metrics import mutual_info_score

# ============= Entropy =============
def entropy(p):
    """
    Calculate Shannon entropy
    
    Args:
        p: probability distribution (sums to 1)
        
    Returns:
        Entropy in bits
    """
    # Remove zero probabilities
    p = p[p > 0]
    return -np.sum(p * np.log2(p))

# Example: Fair coin
p_fair = np.array([0.5, 0.5])
H_fair = entropy(p_fair)
print(f"Entropy of fair coin: {H_fair:.4f} bits")

# Example: Biased coin
p_biased = np.array([0.9, 0.1])
H_biased = entropy(p_biased)
print(f"Entropy of biased coin: {H_biased:.4f} bits")

# Maximum entropy (uniform distribution)
n = 6  # Six-sided die
p_uniform = np.ones(n) / n
H_max = entropy(p_uniform)
print(f"Maximum entropy (uniform over {n} outcomes): {H_max:.4f} bits")
print(f"Theoretical maximum: {np.log2(n):.4f} bits")

# Visualize entropy as function of probability
probs = np.linspace(0.01, 0.99, 100)
entropies = [entropy(np.array([p, 1-p])) for p in probs]

plt.figure(figsize=(10, 6))
plt.plot(probs, entropies, linewidth=2)
plt.xlabel('P(X=1)')
plt.ylabel('Entropy (bits)')
plt.title('Binary Entropy Function')
plt.grid(alpha=0.3)
plt.axhline(y=1, color='r', linestyle='--', label='Maximum (1 bit)')
plt.legend()
plt.show()

# ============= KL Divergence =============
def kl_divergence(p, q):
    """
    Calculate KL divergence D_KL(P||Q)
    
    Args:
        p: true distribution
        q: approximate distribution
        
    Returns:
        KL divergence in bits
    """
    # Remove zero probabilities from p
    mask = p > 0
    p_nz = p[mask]
    q_nz = q[mask]
    
    # Avoid log(0)
    q_nz = np.maximum(q_nz, 1e-10)
    
    return np.sum(p_nz * np.log2(p_nz / q_nz))

# Example: Compare distributions
p_true = np.array([0.4, 0.3, 0.2, 0.1])
q_approx = np.array([0.25, 0.25, 0.25, 0.25])

kl_pq = kl_divergence(p_true, q_approx)
kl_qp = kl_divergence(q_approx, p_true)

print(f"\\n=== KL Divergence ===")
print(f"D_KL(P||Q) = {kl_pq:.4f} bits")
print(f"D_KL(Q||P) = {kl_qp:.4f} bits")
print(f"Not symmetric: D_KL(P||Q) != D_KL(Q||P)")

# Visualize KL divergence
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

x = np.arange(len(p_true))
axes[0].bar(x - 0.2, p_true, 0.4, label='P (true)', alpha=0.8)
axes[0].bar(x + 0.2, q_approx, 0.4, label='Q (approx)', alpha=0.8)
axes[0].set_xlabel('Outcome')
axes[0].set_ylabel('Probability')
axes[0].set_title('Distribution Comparison')
axes[0].legend()
axes[0].grid(alpha=0.3, axis='y')

# KL divergence vs. distribution parameter
alphas = np.linspace(0.1, 0.9, 50)
kl_values = []
for alpha in alphas:
    q_param = np.array([alpha, 1-alpha, 0, 0])
    # Normalize to match size
    q_param = np.concatenate([q_param[:2], [0, 0]])
    q_param = q_param / q_param.sum() if q_param.sum() > 0 else q_approx
    kl_values.append(kl_divergence(p_true, q_param))

axes[1].plot(alphas, kl_values, linewidth=2)
axes[1].set_xlabel('Parameter α')
axes[1].set_ylabel('D_KL(P||Q_α)')
axes[1].set_title('KL Divergence vs. Distribution Parameter')
axes[1].grid(alpha=0.3)

plt.tight_layout()
plt.show()

# ============= Cross-Entropy =============
def cross_entropy(p, q):
    """
    Calculate cross-entropy H(P,Q)
    
    Args:
        p: true distribution
        q: predicted distribution
        
    Returns:
        Cross-entropy in bits
    """
    mask = p > 0
    p_nz = p[mask]
    q_nz = q[mask]
    q_nz = np.maximum(q_nz, 1e-10)
    
    return -np.sum(p_nz * np.log2(q_nz))

H_p = entropy(p_true)
H_pq = cross_entropy(p_true, q_approx)
kl = kl_divergence(p_true, q_approx)

print(f"\\n=== Cross-Entropy ===")
print(f"H(P) = {H_p:.4f} bits")
print(f"H(P,Q) = {H_pq:.4f} bits")
print(f"D_KL(P||Q) = {kl:.4f} bits")
print(f"Verify: H(P,Q) = H(P) + D_KL(P||Q)")
print(f"{H_pq:.4f} = {H_p:.4f} + {kl:.4f} = {H_p + kl:.4f}")

# ============= Mutual Information =============
def mutual_information(joint_prob):
    """
    Calculate mutual information from joint probability
    
    Args:
        joint_prob: 2D array of joint probabilities P(X,Y)
        
    Returns:
        Mutual information in bits
    """
    # Marginal distributions
    p_x = joint_prob.sum(axis=1)
    p_y = joint_prob.sum(axis=0)
    
    mi = 0
    for i in range(joint_prob.shape[0]):
        for j in range(joint_prob.shape[1]):
            if joint_prob[i, j] > 0:
                mi += joint_prob[i, j] * np.log2(
                    joint_prob[i, j] / (p_x[i] * p_y[j])
                )
    
    return mi

# Example: Two dice
# Joint distribution for X and Y where Y = X (perfect correlation)
n_outcomes = 6
joint_perfect = np.eye(n_outcomes) / n_outcomes

# Independent dice
joint_indep = np.ones((n_outcomes, n_outcomes)) / (n_outcomes ** 2)

mi_perfect = mutual_information(joint_perfect)
mi_indep = mutual_information(joint_indep)

print(f"\\n=== Mutual Information ===")
print(f"I(X;Y) for perfect correlation: {mi_perfect:.4f} bits")
print(f"I(X;Y) for independence: {mi_indep:.4f} bits")
print(f"H(X) for uniform die: {np.log2(n_outcomes):.4f} bits")

# Relationship: I(X;Y) = H(X) + H(Y) - H(X,Y)
joint_prob = joint_perfect
p_x = joint_prob.sum(axis=1)
p_y = joint_prob.sum(axis=0)

H_X = entropy(p_x)
H_Y = entropy(p_y)
H_XY = entropy(joint_prob.flatten())

mi_calc = H_X + H_Y - H_XY

print(f"\\nVerify: I(X;Y) = H(X) + H(Y) - H(X,Y)")
print(f"I(X;Y) = {mi_perfect:.4f}")
print(f"H(X) + H(Y) - H(X,Y) = {H_X:.4f} + {H_Y:.4f} - {H_XY:.4f} = {mi_calc:.4f}")

# ============= Information Theory in ML ===
print(f"\\n=== Information Theory in Machine Learning ===")
print("1. Cross-Entropy Loss: Standard loss for classification")
print("2. Mutual Information: Feature selection, clustering evaluation")
print("3. KL Divergence: Variational inference (ELBO), model comparison")
print("4. Entropy Regularization: Encourage exploration in RL")
print("5. Information Bottleneck: Representation learning theory")
print("6. Minimum Description Length: Model selection principle")`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Master Probability & Information Theory</h3>
          <p className="mb-6 opacity-90">
            These mathematical foundations are essential for understanding machine learning, statistics, 
            and data science. Practice implementing these concepts and explore their applications!
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-bold mb-2">Further Study</h4>
              <p className="text-sm opacity-90">Measure theory, stochastic calculus, advanced probability</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-bold mb-2">Applications</h4>
              <p className="text-sm opacity-90">Bayesian inference, reinforcement learning, information geometry</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-bold mb-2">Practice</h4>
              <p className="text-sm opacity-90">Implement algorithms, solve problems, work with real data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



// ============================================================
// COMBINED NAVIGATION WRAPPER
// ============================================================
export default function DataPreprocessingCombined() {
  const [activeModule, setActiveModule] = React.useState(0);

  const modules = [
    { id: 0, label: '1. Data Preprocessing' },
    { id: 1, label: '2. Data Preprocessing Rev' },
    { id: 2, label: '2. Statistical Analysis' },
    { id: 3, label: '3. Feature Engineering' },
    { id: 4, label: '3. Probability' },
  ];

  const navBg = '#0a0e1a';
  const navBorder = '#1e3a5f';
  const activeColor = '#00d4ff';
  const inactiveColor = '#475569';

  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{
        display: 'flex',
        gap: '6px',
        padding: '10px 16px',
        background: navBg,
        borderBottom: `2px solid ${navBorder}`,
        flexWrap: 'wrap',
        position: 'sticky',
        top: 0,
        zIndex: 9999,
      }}>
        <span style={{
          color: activeColor,
          fontFamily: "'Courier New', monospace",
          fontSize: 11,
          display: 'flex',
          alignItems: 'center',
          marginRight: 8,
          fontWeight: 700,
          letterSpacing: 1,
        }}>
          Data Suite:
        </span>
        {modules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => setActiveModule(mod.id)}
            style={{
              padding: '5px 14px',
              borderRadius: 5,
              border: `1px solid ${activeModule === mod.id ? activeColor : navBorder}`,
              background: activeModule === mod.id ? `${activeColor}18` : 'transparent',
              color: activeModule === mod.id ? activeColor : inactiveColor,
              fontFamily: "'Courier New', monospace",
              fontSize: 10,
              cursor: 'pointer',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            {mod.label}
          </button>
        ))}
      </div>
      <div>
        {activeModule === 0 && <DataPreprocessingLearningTool />}
        {activeModule === 1 && <DataPreprocessingLearningToolRev />}
        {activeModule === 2 && <StatisticalAnalysisLab />}
        {activeModule === 3 && <FeatureEngineeringLearningTool />}
        {activeModule === 4 && <ProbabilityInteractive />}
      </div>
    </div>
  );
}
