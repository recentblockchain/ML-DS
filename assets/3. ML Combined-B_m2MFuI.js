import{R as fe,j as e,r as x}from"./index-CIDXSLTw.js";import{C as L}from"./code-CX5Ttzw_.js";import{C as U,a as G,G as ge}from"./grid-3x3-Bei41wa7.js";import{C as Ne,T as ae,Z as re,G as Re}from"./zap-CQYuF6xP.js";import{D as Ae}from"./database-DQ_oUE8V.js";import{L as xe}from"./layers-07m-m2z4.js";import{T as oe}from"./target-D64OKw6R.js";import{c as de}from"./createLucideIcon-CZfQCXqL.js";import{C as $e}from"./calculator-BPVbH55X.js";import{B as We}from"./book-open-C9ZgZFYh.js";import{F as Pe}from"./filter-IMXyem7e.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ce=de("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oe=de("Shuffle",[["path",{d:"m18 14 4 4-4 4",key:"10pe0f"}],["path",{d:"m18 2 4 4-4 4",key:"pucp1d"}],["path",{d:"M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22",key:"1ailkh"}],["path",{d:"M2 6h1.972a4 4 0 0 1 3.6 2.2",key:"km57vx"}],["path",{d:"M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45",key:"os18l9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xe=de("TreePine",[["path",{d:"m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z",key:"cpyugq"}],["path",{d:"M12 22v-3",key:"kmzjlo"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ue=de("Trees",[["path",{d:"M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z",key:"1l6gj6"}],["path",{d:"M7 16v6",key:"1a82de"}],["path",{d:"M13 19v3",key:"13sx9i"}],["path",{d:"M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5",key:"1sj9kv"}]]);var Ge=`# Real-Time Machine Learning Applications
# Complete Python Implementation Guide for 12 Production Systems

"""
This comprehensive guide covers 12 real-time ML applications with:
- Complete Python code
- Architecture diagrams
- Performance metrics
- Latency optimization strategies
- Production best practices
"""

# ============================================================================
# 1. CONVERSATIONAL AI (Chat + Voice)
# ============================================================================

import asyncio
import time
from typing import AsyncGenerator

class ConversationalAI:
    """
    Real-time chatbot with streaming responses
    Latency Target: 200ms-2s per turn
    """
    
    def __init__(self):
        from transformers import AutoTokenizer, AutoModelForCausalLM
        self.tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
        self.model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")
        self.chat_history = None
        
    async def stream_response(self, user_input: str) -> AsyncGenerator[str, None]:
        """Stream tokens as they're generated"""
        import torch
        
        start_time = time.time()
        
        # Encode input
        new_input = self.tokenizer.encode(user_input + self.tokenizer.eos_token, 
                                          return_tensors='pt')
        
        # Update context
        if self.chat_history is not None:
            bot_input = torch.cat([self.chat_history, new_input], dim=-1)
        else:
            bot_input = new_input
        
        # Generate tokens one by one
        for i in range(100):
            outputs = self.model(bot_input)
            next_token_logits = outputs.logits[:, -1, :]
            next_token = torch.argmax(next_token_logits, dim=-1).unsqueeze(-1)
            
            if next_token.item() == self.tokenizer.eos_token_id:
                break
            
            # Yield token
            token_str = self.tokenizer.decode(next_token[0], skip_special_tokens=True)
            yield token_str
            
            bot_input = torch.cat([bot_input, next_token], dim=-1)
            await asyncio.sleep(0.01)  # Simulate streaming
        
        self.chat_history = bot_input
        latency = (time.time() - start_time) * 1000
        yield f"\\n[Latency: {latency:.0f}ms]"


# ============================================================================
# 4. CYBERSECURITY & FRAUD DETECTION
# ============================================================================

class FraudDetectionSystem:
    """
    Real-time fraud detection for transactions
    Latency Target: 10-300ms per decision
    """
    
    def __init__(self):
        from sklearn.ensemble import IsolationForest
        import numpy as np
        
        # Pre-trained anomaly detector
        self.model = IsolationForest(contamination=0.1, random_state=42)
        
        # Feature engineering pipeline
        self.feature_stats = {
            'amount_mean': 150.0,
            'amount_std': 200.0,
            'velocity_threshold': 5  # transactions per minute
        }
        
        print("✓ Fraud Detection System initialized")
    
    def extract_features(self, transaction):
        """Extract features in <10ms"""
        import numpy as np
        
        features = []
        
        # Amount features
        features.append((transaction['amount'] - self.feature_stats['amount_mean']) / 
                       self.feature_stats['amount_std'])
        
        # Time features
        hour = transaction['timestamp'].hour
        features.append(np.sin(2 * np.pi * hour / 24))
        features.append(np.cos(2 * np.pi * hour / 24))
        
        # Velocity features
        features.append(transaction.get('transactions_last_hour', 0))
        features.append(transaction.get('amount_last_hour', 0))
        
        # Location features
        features.append(transaction.get('location_risk_score', 0.5))
        features.append(transaction.get('merchant_risk_score', 0.5))
        
        # Device features
        features.append(1 if transaction.get('new_device', False) else 0)
        features.append(1 if transaction.get('vpn_detected', False) else 0)
        
        return np.array(features).reshape(1, -1)
    
    def detect_fraud(self, transaction):
        """Real-time fraud scoring"""
        start_time = time.time()
        
        # Feature extraction
        features = self.extract_features(transaction)
        
        # Model inference
        anomaly_score = self.model.decision_function(features)[0]
        is_fraud = self.model.predict(features)[0] == -1
        
        # Risk scoring
        risk_score = self._calculate_risk_score(transaction, anomaly_score)
        
        # Decision
        decision = self._make_decision(risk_score)
        
        latency_ms = (time.time() - start_time) * 1000
        
        return {
            'transaction_id': transaction['id'],
            'risk_score': risk_score,
            'decision': decision,
            'anomaly_score': anomaly_score,
            'latency_ms': latency_ms,
            'features_used': features.shape[1]
        }
    
    def _calculate_risk_score(self, transaction, anomaly_score):
        """Combine multiple signals"""
        base_score = -anomaly_score  # Convert to 0-1 range
        
        # Add rule-based signals
        if transaction['amount'] > 1000:
            base_score += 0.2
        if transaction.get('new_device'):
            base_score += 0.15
        if transaction.get('vpn_detected'):
            base_score += 0.1
            
        return min(base_score, 1.0)
    
    def _make_decision(self, risk_score):
        """Threshold-based decision"""
        if risk_score > 0.8:
            return 'BLOCK'
        elif risk_score > 0.5:
            return 'CHALLENGE'  # Request additional auth
        else:
            return 'APPROVE'


# Demo
def demo_fraud_detection():
    from datetime import datetime
    import numpy as np
    
    detector = FraudDetectionSystem()
    
    # Train on normal data
    normal_data = np.random.randn(1000, 9) * 0.5
    detector.model.fit(normal_data)
    
    # Test transactions
    transactions = [
        {
            'id': 'TXN001',
            'amount': 50.0,
            'timestamp': datetime.now(),
            'transactions_last_hour': 2,
            'amount_last_hour': 75.0,
            'new_device': False,
            'vpn_detected': False
        },
        {
            'id': 'TXN002',
            'amount': 5000.0,
            'timestamp': datetime.now(),
            'transactions_last_hour': 10,
            'amount_last_hour': 8000.0,
            'new_device': True,
            'vpn_detected': True
        }
    ]
    
    print("\\n🛡️ Fraud Detection Demo\\n" + "="*60)
    
    for txn in transactions:
        result = detector.detect_fraud(txn)
        print(f"\\nTransaction: {result['transaction_id']}")
        print(f"  Amount: \${txn['amount']:.2f}")
        print(f"  Risk Score: {result['risk_score']:.3f}")
        print(f"  Decision: {result['decision']}")
        print(f"  Latency: {result['latency_ms']:.2f}ms")


# ============================================================================
# 6. RECOMMENDER SYSTEMS (In-Session)
# ============================================================================

class RealtimeRecommender:
    """
    Real-time recommendations based on current session
    Latency Target: 20-200ms per ranking call
    """
    
    def __init__(self):
        import numpy as np
        from sklearn.neighbors import NearestNeighbors
        
        # Item embeddings (pre-computed)
        self.n_items = 10000
        self.embedding_dim = 128
        self.item_embeddings = np.random.randn(self.n_items, self.embedding_dim)
        
        # KNN for fast similarity search
        self.knn = NearestNeighbors(n_neighbors=50, metric='cosine', algorithm='brute')
        self.knn.fit(self.item_embeddings)
        
        # User session state
        self.user_sessions = {}
        
        print("✓ Recommender System initialized")
    
    def update_session(self, user_id, item_id, event_type='view'):
        """Update user session in real-time"""
        if user_id not in self.user_sessions:
            self.user_sessions[user_id] = {
                'viewed': [],
                'clicked': [],
                'purchased': [],
                'session_start': time.time()
            }
        
        if event_type == 'view':
            self.user_sessions[user_id]['viewed'].append(item_id)
        elif event_type == 'click':
            self.user_sessions[user_id]['clicked'].append(item_id)
        elif event_type == 'purchase':
            self.user_sessions[user_id]['purchased'].append(item_id)
    
    def get_recommendations(self, user_id, n_recommendations=10):
        """Generate real-time recommendations"""
        import numpy as np
        
        start_time = time.time()
        
        session = self.user_sessions.get(user_id, {'viewed': [], 'clicked': []})
        
        # Get user's current interests
        recent_items = (session['clicked'][-3:] if session['clicked'] 
                       else session['viewed'][-5:])
        
        if not recent_items:
            # Cold start: return trending/popular items
            recommendations = list(range(100))[:n_recommendations]
        else:
            # Compute session embedding
            session_embedding = np.mean([self.item_embeddings[i] 
                                        for i in recent_items], axis=0)
            
            # Find similar items
            distances, indices = self.knn.kneighbors([session_embedding])
            
            # Filter out already seen items
            seen = set(session['viewed'] + session['clicked'])
            recommendations = [idx for idx in indices[0] if idx not in seen][:n_recommendations]
        
        latency_ms = (time.time() - start_time) * 1000
        
        return {
            'user_id': user_id,
            'recommendations': recommendations,
            'latency_ms': latency_ms,
            'based_on': recent_items[-3:] if recent_items else []
        }


# Demo
def demo_recommender():
    recommender = RealtimeRecommender()
    
    print("\\n🎯 Real-Time Recommender Demo\\n" + "="*60)
    
    user_id = "user_123"
    
    # Simulate user session
    print("\\n📱 User Session:")
    actions = [
        (101, 'view'),
        (102, 'view'),
        (101, 'click'),
        (105, 'view'),
        (102, 'click')
    ]
    
    for item_id, event in actions:
        recommender.update_session(user_id, item_id, event)
        print(f"  {event.upper()}: Item {item_id}")
    
    # Get recommendations
    print("\\n🎬 Generating Recommendations...")
    result = recommender.get_recommendations(user_id, n_recommendations=5)
    
    print(f"\\nUser: {result['user_id']}")
    print(f"Based on recent items: {result['based_on']}")
    print(f"Recommendations: {result['recommendations']}")
    print(f"Latency: {result['latency_ms']:.2f}ms")


# ============================================================================
# 8. INDUSTRIAL MONITORING & PREDICTIVE MAINTENANCE
# ============================================================================

class PredictiveMaintenance:
    """
    Real-time anomaly detection from sensor data
    Latency Target: 50ms-5s depending on process
    """
    
    def __init__(self):
        import numpy as np
        from sklearn.ensemble import IsolationForest
        
        # Anomaly detector
        self.model = IsolationForest(contamination=0.05, random_state=42)
        
        # Sensor thresholds
        self.thresholds = {
            'vibration': {'low': 0.5, 'high': 2.5},
            'temperature': {'low': 20, 'high': 80},
            'pressure': {'low': 50, 'high': 150},
            'rpm': {'low': 1000, 'high': 5000}
        }
        
        # Rolling window for trend analysis
        self.sensor_history = []
        self.max_history = 100
        
        print("✓ Predictive Maintenance System initialized")
    
    def process_sensor_reading(self, sensor_data):
        """Process real-time sensor data"""
        import numpy as np
        
        start_time = time.time()
        
        # Extract features
        features = self._extract_features(sensor_data)
        
        # Anomaly detection
        anomaly_score = self.model.decision_function([features])[0]
        is_anomaly = self.model.predict([features])[0] == -1
        
        # Rule-based checks
        threshold_violations = self._check_thresholds(sensor_data)
        
        # Trend analysis
        trend = self._analyze_trend(sensor_data)
        
        # Calculate risk
        risk_level = self._calculate_risk(anomaly_score, threshold_violations, trend)
        
        latency_ms = (time.time() - start_time) * 1000
        
        return {
            'timestamp': sensor_data['timestamp'],
            'anomaly_score': anomaly_score,
            'is_anomaly': is_anomaly,
            'threshold_violations': threshold_violations,
            'trend': trend,
            'risk_level': risk_level,
            'latency_ms': latency_ms
        }
    
    def _extract_features(self, sensor_data):
        """Extract features from sensor readings"""
        return [
            sensor_data['vibration'],
            sensor_data['temperature'],
            sensor_data['pressure'],
            sensor_data['rpm'],
            sensor_data.get('power_consumption', 0),
            sensor_data.get('acoustic_level', 0)
        ]
    
    def _check_thresholds(self, sensor_data):
        """Check if any thresholds are violated"""
        violations = []
        
        for sensor, value in sensor_data.items():
            if sensor in self.thresholds:
                thresh = self.thresholds[sensor]
                if value < thresh['low']:
                    violations.append(f"{sensor}_low")
                elif value > thresh['high']:
                    violations.append(f"{sensor}_high")
        
        return violations
    
    def _analyze_trend(self, sensor_data):
        """Analyze trend over recent readings"""
        import numpy as np
        
        self.sensor_history.append(sensor_data['vibration'])
        if len(self.sensor_history) > self.max_history:
            self.sensor_history.pop(0)
        
        if len(self.sensor_history) < 10:
            return 'insufficient_data'
        
        # Simple trend detection
        recent = np.mean(self.sensor_history[-10:])
        older = np.mean(self.sensor_history[-30:-10] if len(self.sensor_history) >= 30 else self.sensor_history[:10])
        
        change = (recent - older) / older if older != 0 else 0
        
        if change > 0.1:
            return 'increasing'
        elif change < -0.1:
            return 'decreasing'
        else:
            return 'stable'
    
    def _calculate_risk(self, anomaly_score, violations, trend):
        """Calculate overall risk level"""
        if violations and trend == 'increasing':
            return 'HIGH'
        elif violations or anomaly_score < -0.5:
            return 'MEDIUM'
        else:
            return 'LOW'


# Demo
def demo_predictive_maintenance():
    import numpy as np
    from datetime import datetime
    
    system = PredictiveMaintenance()
    
    # Train on normal data
    normal_data = np.random.randn(500, 6) * 0.5 + [1.5, 50, 100, 3000, 50, 70]
    system.model.fit(normal_data)
    
    print("\\n🏭 Predictive Maintenance Demo\\n" + "="*60)
    
    # Simulate sensor readings
    readings = [
        {  # Normal
            'timestamp': datetime.now(),
            'vibration': 1.5,
            'temperature': 55,
            'pressure': 100,
            'rpm': 3000,
            'power_consumption': 50,
            'acoustic_level': 70
        },
        {  # Anomalous
            'timestamp': datetime.now(),
            'vibration': 3.5,  # High!
            'temperature': 85,  # High!
            'pressure': 95,
            'rpm': 3200,
            'power_consumption': 75,
            'acoustic_level': 95
        }
    ]
    
    for i, reading in enumerate(readings, 1):
        result = system.process_sensor_reading(reading)
        
        print(f"\\n📊 Reading #{i}:")
        print(f"  Vibration: {reading['vibration']}")
        print(f"  Temperature: {reading['temperature']}°C")
        print(f"  Anomaly Score: {result['anomaly_score']:.3f}")
        print(f"  Violations: {result['threshold_violations'] or 'None'}")
        print(f"  Risk Level: {result['risk_level']}")
        print(f"  Latency: {result['latency_ms']:.2f}ms")


# ============================================================================
# 12. EDGE AI (On-Device)
# ============================================================================

class EdgeAISystem:
    """
    On-device inference without cloud
    Latency Target: 5-100ms (battery/thermal constraints)
    """
    
    def __init__(self, model_type='mobilenet'):
        # Use lightweight models for edge deployment
        if model_type == 'mobilenet':
            from tensorflow.keras.applications import MobileNetV2
            from tensorflow.keras.applications.mobilenet_v2 import preprocess_input, decode_predictions
            
            self.model = MobileNetV2(weights='imagenet')
            self.preprocess = preprocess_input
            self.decode = decode_predictions
            
        print(f"✓ Edge AI initialized with {model_type}")
    
    def process_image(self, image):
        """Run inference on-device"""
        import numpy as np
        import time
        
        start_time = time.time()
        
        # Preprocess
        img_array = np.expand_dims(image, axis=0)
        img_preprocessed = self.preprocess(img_array)
        
        # Inference
        predictions = self.model.predict(img_preprocessed, verbose=0)
        
        # Decode
        decoded = self.decode(predictions, top=3)[0]
        
        latency_ms = (time.time() - start_time) * 1000
        
        return {
            'predictions': [(label, float(prob)) for (_, label, prob) in decoded],
            'latency_ms': latency_ms,
            'on_device': True
        }


# ============================================================================
# MAIN DEMO
# ============================================================================

if __name__ == "__main__":
    print("\\n" + "="*70)
    print("REAL-TIME ML APPLICATIONS - COMPREHENSIVE DEMO")
    print("="*70)
    
    # Run all demos
    demos = [
        ("Fraud Detection", demo_fraud_detection),
        ("Recommender System", demo_recommender),
        ("Predictive Maintenance", demo_predictive_maintenance)
    ]
    
    for name, demo_func in demos:
        try:
            demo_func()
            print("\\n" + "-"*70)
        except Exception as e:
            print(f"\\n❌ Error in {name}: {e}")
    
    print("\\n✅ All demos completed!")
`,He=`# Chapter 1: Introduction to Intelligent Systems

---

## A) Reader Pathways

### Core Track (Required Reading)
1. Read Section 1.1 (engineering definition of intelligent systems) and the agent-environment formalism
2. Read Section 1.2 (capability stack) focusing on the 2-paragraph summaries and concrete examples for each capability
3. Read Section 1.3 (constraints) including the constrained optimization framework
4. Read Section 1.4 (taxonomy) with both pseudocode blocks—understand when to use LLMs vs agents vs workflows
5. Work through Section 1.5 (customer support worked example) end-to-end
6. Complete the two [UG/Core] exercises in Section 1.7

### Advanced Track (Optional Deep Dives)
1. **Advanced Box 1.1** (Philosophy vs Engineering): Why the philosophical debate about "intelligence" doesn't resolve engineering questions
2. **Math Box 1.2** (Constrained Multi-Objective Optimization): Formal derivation of Pareto frontiers and KKT conditions for system design
3. **Advanced Box 1.3** (Memory Retrieval Theory): Information-theoretic bounds on memory systems and approximate nearest neighbor guarantees
4. **Advanced Box 1.4** (Multi-Agent Game Theory): Nash equilibria in cooperative agent systems and mechanism design basics
5. **Research Exercise [PhD]** in Section 1.7: Design and analyze a novel coordination protocol
6. **Open Problems** section in 1.6.5: Current research frontiers in agent evaluation

---

## B) Executive Framing

**What are "Intelligent Systems" in this book?** We define intelligent systems operationally as engineered artifacts that map observations to actions in order to optimize objectives under real-world constraints. This is an engineering definition—not a philosophical stance on machine consciousness or human-like intelligence. An intelligent system processes inputs (sensor data, text, images), makes decisions (selects tools, generates plans, coordinates with humans), and produces outputs (actions, recommendations, artifacts) while respecting constraints on latency, cost, safety, and reliability.

**The book's narrative arc:** This book moves from foundations to deployment. We start with foundation models (FMs) as the representational and reasoning substrate (Chapters 2-4), then build upward to tool use and function calling (Chapter 5), to single-agent architectures (Chapters 6-7), to orchestrated agentic workflows (Chapter 8), and finally to multi-agent systems (Chapter 9). Throughout, we emphasize evaluation (Chapter 10), safety and alignment (Chapter 11), and production operations (Chapter 12). This chapter establishes the conceptual and formal foundations: what capabilities we need, what constraints we face, and what architectural patterns exist.

---

## C) Prerequisites and Notation

### C.1) Prerequisites

- **[UG]** Probability and statistics: random variables, expectation, conditional probability
- **[UG]** Basic machine learning: supervised learning, loss functions, gradient descent
- **[UG]** Data structures and algorithms: graphs, search, complexity analysis
- **[UG]** Programming fundamentals: Python or equivalent, APIs, JSON
- **[MS]** Optimization theory: constrained optimization, Lagrangians, KKT conditions
- **[MS]** Reinforcement learning basics: MDPs, policies, value functions
- **[MS]** Natural language processing: tokenization, embeddings, transformers (introduced in Chapter 2)
- **[PhD]** Information theory: entropy, mutual information, rate-distortion (for advanced boxes)

### C.2) Notation Table

| Symbol | Meaning | Space/Dimension | Where Introduced | Notes/Assumptions |
|--------|---------|-----------------|------------------|-------------------|
| $s_t$ | System state at time $t$ | $\\mathcal{S}$ (arbitrary) | Section 1.1 | May include hidden state, context, memory |
| $o_t$ | Observation at time $t$ | $\\mathcal{O}$ (text, images, sensors) | Section 1.1 | Partially observable: $o_t = h(s_t)$ |
| $a_t$ | Action at time $t$ | $\\mathcal{A}$ (tool calls, text generation) | Section 1.1 | Discrete or continuous depending on system |
| $\\pi$ | Policy (decision rule) | $\\pi: \\mathcal{O} \\times \\mathcal{M} \\to \\Delta(\\mathcal{A})$ | Section 1.1 | Maps obs + memory to action distribution |
| $U(s, a)$ | Utility function | $\\mathbb{R}$ | Section 1.1 | Task-specific objective; may be learned |
| $\\tau$ | Tool (external function) | $\\tau: X \\to Y$ | Section 1.2.5 | API, retrieval system, calculator, etc. |
| $M$ | Memory state | Vector store, KV cache, DB | Section 1.2.6 | Short-term (context) or long-term (external) |
| $\\ell(s, a)$ | Latency of action | $\\mathbb{R}_+$ (seconds) | Section 1.3.1 | Includes compute + I/O + tool call time |
| $c(s, a)$ | Cost of action | $\\mathbb{R}_+$ (USD) | Section 1.3.2 | Inference cost + tool cost + human time |
| $r(s, a)$ | Risk/safety violation | $[0, 1]$ | Section 1.3.3 | Probability of harmful output or failure |
| $\\rho(s, a)$ | Reliability/success prob | $[0, 1]$ | Section 1.3.4 | $\\rho(s, a) = 1 - p(\\text{failure})$ |
| $\\mathcal{E}$ | Evaluation metric | Task-specific | Section 1.3.5 | Accuracy, F1, BLEU, human preference, etc. |
| $L$ | Latency constraint | $\\mathbb{R}_+$ | Math Box 1.2 | SLA-derived upper bound |
| $C$ | Cost budget | $\\mathbb{R}_+$ | Math Box 1.2 | Per-query or per-month |
| $R$ | Risk tolerance | $[0, 1]$ | Math Box 1.2 | Maximum acceptable failure rate |

---

## D) Core Content

### 1.1 What is an "Intelligent System"? (Engineering Definition)

An **intelligent system** is an engineered artifact that maps observations to actions in order to optimize objectives under constraints. Unlike philosophical debates about "intelligence" (which often focus on consciousness, sentience, or human-like cognition), our definition is operational and measurable. An intelligent system:

1. **Perceives** its environment (receives observations $o_t \\in \\mathcal{O}$)
2. **Decides** on actions ($a_t \\in \\mathcal{A}$) via a policy $\\pi$
3. **Acts** to influence the environment or produce outputs
4. **Optimizes** a utility function $U$ subject to constraints

Formally, we model an intelligent system as an **agent-environment interaction loop**:

$$
o_t = h(s_t), \\quad a_t \\sim \\pi(o_t, M_t), \\quad s_{t+1} = f(s_t, a_t)
$$

where:
- $s_t \\in \\mathcal{S}$ is the true (possibly hidden) state of the world
- $o_t \\in \\mathcal{O}$ is the observation (what the system sees)
- $a_t \\in \\mathcal{A}$ is the action taken
- $\\pi: \\mathcal{O} \\times \\mathcal{M} \\to \\Delta(\\mathcal{A})$ is the policy (decision rule), possibly conditioned on memory $M_t$
- $f: \\mathcal{S} \\times \\mathcal{A} \\to \\mathcal{S}$ is the environment dynamics

The goal is to maximize expected utility:

$$
\\max_{\\pi} \\mathbb{E}\\left[\\sum_{t=0}^{T} \\gamma^t U(s_t, a_t)\\right]
$$

subject to constraints on latency $\\ell$, cost $c$, risk $r$, and reliability $\\rho$:

$$
\\mathbb{E}[\\ell(s_t, a_t)] \\leq L, \\quad \\mathbb{E}[c(s_t, a_t)] \\leq C, \\quad \\mathbb{E}[r(s_t, a_t)] \\leq R, \\quad \\mathbb{E}[\\rho(s_t, a_t)] \\geq \\rho_{\\min}
$$

where $\\gamma \\in [0, 1]$ is a discount factor (often $\\gamma = 1$ for episodic tasks).

**Key insight:** This framing separates *what we want* (utility $U$) from *how we build it* (policy $\\pi$, tools $\\tau$, memory $M$) and *what limits us* (constraints). Different application domains define different $U$, $\\mathcal{A}$, and constraint budgets, but the structure remains.

---

<div style="border: 2px solid #333; padding: 10px; margin: 20px 0; background-color: #f9f9f9;">

**Intuition Box: Engineering vs Philosophical Intelligence**

Philosophical debates ask: "Is system X truly intelligent?" or "Does it understand?" These are important but orthogonal to engineering. We care whether a system:
- Achieves task objectives (high $U$)
- Meets latency/cost/safety constraints
- Generalizes to new inputs
- Fails gracefully when out-of-distribution

A spam filter that correctly classifies 99.9% of emails is "intelligent" by our definition—it maps observations (email text) to actions (spam/not-spam) optimizing utility (user satisfaction). It need not "understand" the content in a human sense.

Conversely, a system that generates philosophically sophisticated text but violates safety constraints or costs $1000/query is not practically intelligent. This book focuses on building systems that work reliably at scale.

</div>

---

### 1.2 The Capability Stack

Modern intelligent systems are built from a stack of capabilities, each addressing a different aspect of the perception-decision-action cycle. We identify seven core capabilities:

1. **Perception**: Processing sensory inputs (text, images, audio, sensor data)
2. **Language**: Understanding and generating natural language
3. **Reasoning**: Multi-step inference, logical deduction, and counterfactual thinking
4. **Planning**: Decomposing goals into subgoals and action sequences
5. **Tool Use**: Calling external functions (APIs, databases, calculators)
6. **Memory**: Storing and retrieving information across interactions
7. **Collaboration**: Coordinating with humans (HITL) and other agents

Each capability has formal underpinnings, typical implementations, and characteristic failure modes.

---

#### 1.2.1 Perception

**Definition:** Perception is the process of mapping raw sensory inputs to structured representations that downstream modules can reason over.

**Mathematical foundation:** Perception is an encoding problem. Given input $x \\in \\mathcal{X}$ (image, audio, sensor stream), we learn an encoder $\\phi: \\mathcal{X} \\to \\mathbb{R}^d$ that maps $x$ to a representation $z = \\phi(x)$. The representation should preserve task-relevant information while discarding noise. Formally, we optimize:

$$
\\min_{\\phi} \\mathbb{E}_{x, y \\sim p_{\\text{data}}} [\\mathcal{L}(g(\\phi(x)), y)]
$$

where $g$ is a downstream task head (classifier, regressor) and $\\mathcal{L}$ is task loss.

**Concrete example:** A customer support system receives an email complaint with an attached screenshot of an error message. Perception involves:
1. Text extraction from the email body (trivial UTF-8 decoding)
2. OCR on the screenshot to extract error codes
3. Embedding the text + image into a joint representation

**Implementation notes:** Typical modules include:
- **Vision encoders**: CNNs, Vision Transformers (ViT), CLIP for multimodal
- **Audio encoders**: Whisper, Wav2Vec for speech-to-text
- **Sensor fusion**: Kalman filters, attention mechanisms for combining modalities

**Failure mode:** OCR misreads "ERROR 503" as "ERROR 508", leading to incorrect retrieval of documentation. The system retrieves info about a different error, and the suggested fix fails. **Mitigation:** Use confidence thresholds on OCR outputs; fall back to human review when confidence is low.

---

#### 1.2.2 Language

**Definition:** Language capabilities include understanding (parsing semantics, extracting intents) and generation (producing fluent, contextually appropriate text).

**Mathematical foundation:** Modern language models are autoregressive: given a sequence of tokens $x_{1:t} = (x_1, \\ldots, x_t)$, the model predicts the next token:

$$
p(x_{t+1} \\mid x_{1:t}) = \\text{softmax}(W h_t)
$$

where $h_t = \\text{Transformer}(x_{1:t})$ is the hidden state. Generation proceeds by sampling or decoding:

$$
x_{t+1} \\sim p(\\cdot \\mid x_{1:t}) \\quad \\text{or} \\quad x_{t+1} = \\arg\\max_{x} p(x \\mid x_{1:t})
$$

Understanding is implicitly captured by the model's ability to predict continuations that align with human intent.

**Concrete example:** A user asks, "What's the status of my order #12345?" The system must:
1. Parse the intent (status query)
2. Extract the entity (order ID 12345)
3. Generate a response: "Your order #12345 shipped on Jan 15 and will arrive Feb 8."

**Implementation notes:**
- **Pretrained foundation models**: GPT-4, Claude, Gemini (see Chapter 2)
- **Fine-tuning**: Instruction-tuning for task-specific behaviors
- **Prompt engineering**: Few-shot examples, chain-of-thought, role definitions

**Failure mode:** Ambiguous pronouns. User says, "I ordered the red one. Where is it?" If the system has no memory of "the red one," it cannot resolve the referent. **Mitigation:** Use conversation history (memory) and clarification strategies ("Which item are you referring to?").

---

#### 1.2.3 Reasoning

**Definition:** Reasoning is multi-step inference: deriving new facts from known facts, performing symbolic manipulation, or solving logic puzzles.

**Mathematical foundation:** Reasoning can be modeled as search over a proof graph or as inference in a probabilistic graphical model. For symbolic reasoning, we have:

$$
\\text{KB} \\cup \\{P_1, P_2, \\ldots, P_n\\} \\vdash Q
$$

where KB is a knowledge base, $P_i$ are premises, and $Q$ is the conclusion. For probabilistic reasoning, we compute:

$$
p(Q \\mid P_1, \\ldots, P_n, \\text{KB}) = \\int_{\\theta} p(Q \\mid \\theta) p(\\theta \\mid P_1, \\ldots, P_n, \\text{KB}) \\, d\\theta
$$

In practice, foundation models perform approximate reasoning by generating intermediate steps (chain-of-thought) and checking consistency.

**Concrete example:** A system troubleshooting a network issue reasons:
1. Premise: "Server A cannot reach Server B."
2. Premise: "Server B is responding to pings."
3. Conclusion: "The issue is likely a firewall rule blocking Server A."

**Implementation notes:**
- **Chain-of-thought prompting**: "Let's think step by step..."
- **Self-consistency**: Generate multiple reasoning traces, take majority vote
- **External verifiers**: Call a theorem prover or constraint solver for symbolic domains

**Failure mode:** Hallucinated intermediate steps. The model generates plausible-sounding but incorrect reasoning ("Server B is down because it's Tuesday"). **Mitigation:** Use formal verification when possible; require citations to ground facts.

---

#### 1.2.4 Planning

**Definition:** Planning decomposes high-level goals into sequences of subgoals and actions. Given goal $G$ and initial state $s_0$, find action sequence $a_0, a_1, \\ldots, a_T$ such that $s_T$ satisfies $G$.

**Mathematical foundation:** Planning is search in state space. Classical AI defines:
- **State space**: $\\mathcal{S}$
- **Action space**: $\\mathcal{A}$
- **Transition function**: $s_{t+1} = f(s_t, a_t)$
- **Goal test**: $G(s)$ returns True if state $s$ achieves the goal

Optimal planning minimizes cost:

$$
\\min_{a_0, \\ldots, a_T} \\sum_{t=0}^{T} c(s_t, a_t) \\quad \\text{subject to} \\quad G(s_T) = \\text{True}
$$

Modern planners use heuristic search (A*, beam search) or learned policies.

**Concrete example:** A research assistant is asked, "Compile a literature review on transformer efficiency." The plan:
1. Query arXiv for papers on "transformer efficiency"
2. Filter to papers with >50 citations
3. For each paper, extract key findings
4. Synthesize into a summary document

**Implementation notes:**
- **Hierarchical planning**: Decompose recursively (HRL, HAMs)
- **Reactive planning**: Replan when observations deviate from expectations
- **LLM-based planning**: Prompt the model to generate a plan, then execute stepwise

**Failure mode:** Plan becomes stale. After Step 2, the user clarifies, "Focus on hardware-efficient transformers," but the plan still executes Steps 3-4 on all transformers. **Mitigation:** Implement a replanning trigger when new information arrives.

---

#### 1.2.5 Tool Use

**Definition:** Tool use is the ability to invoke external functions—APIs, databases, search engines, calculators—to extend the system's capabilities.

**Mathematical foundation:** A tool $\\tau: X \\to Y$ is a deterministic or stochastic function. The system has a set of tools $\\mathcal{T} = \\{\\tau_1, \\ldots, \\tau_K\\}$. The policy must decide:
1. Which tool to call: $\\tau_i \\in \\mathcal{T}$
2. What arguments to pass: $x \\in X$

The system receives result $y = \\tau_i(x)$ and incorporates it into the next observation:

$$
o_{t+1} = [o_t, \\text{"tool}\\_\\text{result"}(y)]
$$

This is the **function calling** paradigm in modern LLMs.

**Concrete example:** A financial assistant answering "What's the stock price of AAPL?" uses tool \`get_stock_price(ticker="AAPL")\` and returns "$187.23 as of Feb 7, 2026."

**Implementation notes:**
- **Tool schemas**: JSON schema or OpenAPI spec defining inputs/outputs
- **Function calling API**: LLM predicts structured JSON for tool call
- **Execution harness**: Parse JSON, invoke function, return result to LLM

**Failure mode:** Incorrect arguments. The system calls \`send_email(to="customer@example.com", subject="Refund", body="")\` with an empty body. **Mitigation:** Validate tool calls before execution; require confirmation for destructive actions.

---

#### 1.2.6 Memory

**Definition:** Memory is the ability to store and retrieve information across time. **Short-term memory** is context within a single interaction (e.g., conversation history). **Long-term memory** persists across sessions (e.g., user preferences, past interactions).

**Mathematical foundation:** Memory is a retrieval system. Given a query $q \\in \\mathcal{Q}$ and memory store $M = \\{(k_i, v_i)\\}_{i=1}^{N}$ (key-value pairs), retrieve:

$$
\\text{retrieve}(q, M) = \\{v_i : \\text{sim}(q, k_i) > \\theta\\}
$$

where $\\text{sim}$ is a similarity function (cosine, dot product) and $\\theta$ is a threshold. Modern systems use **vector databases** (embeddings + approximate nearest neighbor search).

**Concrete example:** A personal assistant remembers "User prefers concise answers" and "User's birthday is March 15." When the user asks, "What's the weather?" the system retrieves the preference and responds in one sentence.

**Implementation notes:**
- **Short-term**: Append messages to context window (up to token limit)
- **Long-term**: Embed and store in Pinecone, Weaviate, or Qdrant; retrieve top-$k$ by cosine similarity
- **Memory management**: Summarize old context, prune low-relevance entries

**Failure mode:** Retrieval failure due to embedding mismatch. User mentions "my dog Buddy" in one session. In a new session, user says "Buddy's vet appointment"—but "Buddy" doesn't retrieve "my dog Buddy" because the embedding distance is too large. **Mitigation:** Use entity linking; store explicit metadata (e.g., \`entity="dog", name="Buddy"\`).

---

<div style="border: 2px solid #333; padding: 10px; margin: 20px 0; background-color: #fff8e1;">

**Advanced Box 1.3: Memory Retrieval Theory (MS/PhD)**

Retrieval is fundamentally a nearest-neighbor search problem. Given $N$ vectors in $\\mathbb{R}^d$, exact search costs $O(Nd)$ per query. For large $N$ ($10^6$ to $10^9$ memories), this is prohibitive.

**Approximate Nearest Neighbor (ANN):** Algorithms like HNSW (Hierarchical Navigable Small World) or IVF (Inverted File Index) trade accuracy for speed. Guarantees:
- **Query complexity**: $O(d \\log N)$ for HNSW
- **Recall**: $\\geq 0.95$ (fraction of true top-$k$ retrieved) with tuned parameters

**Information-theoretic perspective:** If memories are i.i.d. from distribution $p$, the number of "distinguishable" memories is $\\approx 2^{H(p)}$ where $H(p) = -\\sum_x p(x) \\log p(x)$ is entropy. In high-dimensional space, most memories are nearly orthogonal, so retrieval is effective.

**Open question:** How to retrieve *compositional* queries ("dog named Buddy who likes tennis balls") when individual embeddings may not capture the conjunction?

</div>

---

#### 1.2.7 Collaboration

**Definition:** Collaboration capabilities enable systems to work with humans (HITL: human-in-the-loop) and other agents (multi-agent systems). This includes:
- **Human-AI collaboration**: Delegating tasks, providing feedback, approving decisions
- **Multi-agent collaboration**: Dividing work, sharing information, negotiating conflicts

**Mathematical foundation:** Multi-agent systems are modeled as games. Each agent $i$ has policy $\\pi_i$, observes $o_i$, and chooses action $a_i$. The joint action $\\mathbf{a} = (a_1, \\ldots, a_n)$ produces a joint reward:

$$
U(\\mathbf{a}) = \\sum_{i=1}^{n} U_i(a_i, \\mathbf{a}_{-i})
$$

In cooperative settings, $U_i = U$ (shared utility). In competitive settings, $U_i$ may conflict. Equilibrium concepts (Nash, correlated) characterize stable outcomes.

**Concrete example:** A coding assistant and a human developer collaborate:
1. Human writes high-level spec: "Implement a REST API for user authentication."
2. Agent generates boilerplate code and tests.
3. Human reviews, adds business logic.
4. Agent runs tests, reports failures.
5. Human fixes bugs, agent suggests optimizations.

**Implementation notes:**
- **HITL gates**: Require human approval before executing high-stakes actions (e.g., deploying code, sending emails)
- **Feedback loops**: Collect thumbs-up/down, use for fine-tuning
- **Multi-agent protocols**: Message passing, shared blackboard, auction mechanisms

**Failure mode:** Automation bias. The human trusts the agent's code without review, and a subtle bug reaches production. **Mitigation:** Design UI to encourage scrutiny; surface confidence scores; require explicit approval for critical changes.

---

### 1.3 The Constraint Stack

While capabilities define *what* a system can do, constraints define *how* it must do it. Real-world systems must satisfy multiple constraints simultaneously:

1. **Latency**: Response time (seconds, milliseconds)
2. **Cost**: Inference cost, tool cost, human time (USD)
3. **Safety**: Avoiding harmful outputs or actions
4. **Reliability**: Probability of correct execution
5. **Evaluation**: Measurable metrics to assess quality

These constraints often conflict (e.g., reducing latency may increase cost or reduce reliability). System design is a **multi-objective optimization** problem.

---

#### 1.3.1 Latency

**Definition:** Latency $\\ell(s, a)$ is the time from receiving input $o_t$ to producing output $a_t$. It includes:
- Compute time (model inference)
- I/O time (network requests, disk reads)
- Tool execution time (API calls, database queries)

**Measurement:** Use wall-clock time. For interactive systems, $\\ell$ should be $< 1$ second (human perception threshold). For batch systems, $\\ell$ may be minutes or hours.

**Operational constraint:** Enforce $\\mathbb{E}[\\ell(s, a)] \\leq L$ or $P(\\ell(s, a) \\leq L) \\geq 0.95$ (95th percentile latency).

**Example:** A chatbot must respond within 2 seconds. If model inference takes 1.5s and tool call takes 1s, total latency is 2.5s—violating the constraint. Solution: cache frequent tool results or use a faster model.

---

#### 1.3.2 Cost

**Definition:** Cost $c(s, a)$ is the monetary expense of executing action $a$. Components:
- **Inference cost**: $\\$0.01/1K tokens for GPT-4, $\\$0.003/1K tokens for Claude Sonnet
- **Tool cost**: API fees (e.g., $\\$0.10/call for a specialized service)
- **Human time**: $\\$50/hour for expert review

**Measurement:** Track cumulative cost per query, per day, per user.

**Operational constraint:** Enforce $\\mathbb{E}[c(s, a)] \\leq C$ (cost budget).

**Example:** A research assistant makes 10 web searches (free), calls GPT-4 (1000 tokens = $\\$0.01), and requires 5 minutes of human review ($\\$4.17). Total cost: $\\$4.18/query. If budget is $\\$1/query, redesign to use fewer human hours or a cheaper model.

---

#### 1.3.3 Safety

**Definition:** Safety risk $r(s, a) \\in [0, 1]$ is the probability that action $a$ causes harm—producing offensive content, leaking private data, executing destructive commands.

**Measurement:** Use classifiers (toxicity detectors, PII scanners) or rule-based guardrails. Track violation rate: $\\text{VR} = \\frac{\\# \\text{violations}}{\\# \\text{queries}}$.

**Operational constraint:** Enforce $\\mathbb{E}[r(s, a)] \\leq R$ (risk tolerance, often $R \\approx 10^{-4}$ for high-stakes systems).

**Example:** A customer service agent must not send emails with profanity. Use a toxicity classifier; if score $> 0.5$, block and alert. If classifier has false-positive rate 0.01, 1% of benign messages are incorrectly blocked—tune threshold based on tolerance.

---

#### 1.3.4 Reliability

**Definition:** Reliability $\\rho(s, a) \\in [0, 1]$ is the probability that action $a$ successfully achieves its goal without error.

**Measurement:** Track success rate: $\\rho = \\frac{\\# \\text{successes}}{\\# \\text{attempts}}$. Failures include:
- Wrong tool called
- Malformed arguments
- Timeout or exception
- Incorrect output

**Operational constraint:** Enforce $\\mathbb{E}[\\rho(s, a)] \\geq \\rho_{\\min}$ (e.g., $\\rho_{\\min} = 0.95$ for production systems).

**Example:** An invoice extraction system fails when the PDF is scanned at low resolution. Reliability over 1000 invoices: 950 success, 50 failures → $\\rho = 0.95$. To improve, add preprocessing (image enhancement) or fallback to human review.

---

#### 1.3.5 Evaluation

**Definition:** Evaluation metrics $\\mathcal{E}$ quantify system performance on a task. Metrics depend on task type:
- **Classification**: Accuracy, precision, recall, F1
- **Generation**: BLEU, ROUGE, BERTScore, human ratings
- **Decision-making**: Task success rate, reward, regret
- **Retrieval**: Mean Average Precision (MAP), NDCG

**Measurement:** Use held-out test sets, human evaluation, or A/B testing.

**Operational use:** Continuously monitor metrics in production; trigger alerts if metrics degrade.

**Example:** A summarization system is evaluated on ROUGE-L and human preference. ROUGE-L = 0.65, human preference rate = 78% vs baseline. Track these over time; if ROUGE-L drops below 0.60, investigate (model drift, data shift, prompt degradation).

---

<div style="border: 2px solid #333; padding: 10px; margin: 20px 0; background-color: #fffacd;">

**Math Box 1.2: Constrained Multi-Objective Optimization (Core-Friendly)**

We formalize system design as:

$$
\\max_{\\pi} \\mathbb{E}[U(s, a)] \\quad \\text{subject to} \\quad \\mathbb{E}[\\ell(s, a)] \\leq L, \\; \\mathbb{E}[c(s, a)] \\leq C, \\; \\mathbb{E}[r(s, a)] \\leq R
$$

where the expectation is over the distribution of states $s \\sim p_{\\text{env}}$ and actions $a \\sim \\pi(\\cdot \\mid s)$.

**Lagrangian formulation:** Introduce multipliers $\\lambda_\\ell, \\lambda_c, \\lambda_r \\geq 0$:

$$
\\mathcal{L}(\\pi, \\lambda) = \\mathbb{E}[U(s, a)] - \\lambda_\\ell (\\mathbb{E}[\\ell(s, a)] - L) - \\lambda_c (\\mathbb{E}[c(s, a)] - C) - \\lambda_r (\\mathbb{E}[r(s, a)] - R)
$$

At optimum, KKT conditions hold:
1. Primal feasibility: constraints satisfied
2. Dual feasibility: $\\lambda_i \\geq 0$
3. Complementary slackness: $\\lambda_i (\\mathbb{E}[\\text{constraint}_i] - \\text{bound}_i) = 0$

**Pareto frontier:** When constraints conflict, no single policy dominates. The set of Pareto-optimal policies forms a frontier. Moving along the frontier trades off one objective for another (e.g., reducing latency increases cost).

**What this tells us in practice:**
- There is no universally "best" system—optimal design depends on $L$, $C$, $R$.
- Changing constraints (e.g., tightening latency budget) may require switching to a different model or architecture.
- A/B testing explores different points on the Pareto frontier to find the best tradeoff for a specific deployment context.

**Example:** Consider two policies:
- $\\pi_1$: Uses GPT-4, $U=0.9$, $\\ell=2$s, $c=\\$0.02$
- $\\pi_2$: Uses GPT-3.5, $U=0.85$, $\\ell=0.5$s, $c=\\$0.005$

If $L=1$s, $C=\\$0.01$, then $\\pi_1$ violates both constraints → choose $\\pi_2$. If $L=3$s, $C=\\$0.03$, then $\\pi_1$ is feasible and has higher utility → choose $\\pi_1$.

</div>

---

### 1.4 Taxonomy: From LLMs to Agentic Workflows

Intelligent systems exist on a spectrum from simple prompt-response to complex multi-agent orchestration. We define five classes:

1. **LLM-only (text in/out)**
2. **Tool-augmented LLM (function calling)**
3. **Single agent (agent loop)**
4. **Agentic workflow/orchestrated system**
5. **Multi-agent system**

Each class introduces new capabilities and complexity.

---

#### 1.4.1 Class 1: LLM-Only

**Definition:** The system is a single LLM call. Input: text prompt. Output: text completion. No tools, no loops, no external state.

**When to use:** Simple, well-defined tasks (classification, summarization, text rewriting) where a single forward pass suffices.

**Example:** "Translate this sentence to French: 'Hello, world.'" → "Bonjour, le monde."

**Limitations:** Cannot access external information, cannot perform multi-step reasoning with verification, cannot adapt based on feedback.

---

#### 1.4.2 Class 2: Tool-Augmented LLM

**Definition:** LLM can call external functions (tools). The LLM predicts a function name and arguments; the system executes the function and returns the result to the LLM.

**When to use:** Tasks requiring real-time data, computation, or external actions (web search, calculator, API calls).

**Example:** "What's 12345 * 67890?" → LLM calls \`calculator(12345 * 67890)\` → returns 838102050.

**Limitations:** No persistent state across interactions, no multi-turn planning, no memory of past tool calls beyond context window.

---

#### 1.4.3 Class 3: Single Agent

**Definition:** An agent loop that iterates: **observe → think → act → reflect → stop**. The agent maintains state, uses tools, and decides when to stop.

**When to use:** Complex tasks requiring exploration, replanning, or iterative refinement (debugging, research, multi-step problem-solving).

**Pseudocode:**

\`\`\`python
def agent_loop(task, max_steps=10):
    state = initialize_state(task)
    for t in range(max_steps):
        observation = observe(state)
        thought = think(observation, state)  # LLM generates plan/reasoning
        action = decide_action(thought, state)  # Choose tool or output
        
        if action.type == "stop":
            return action.output
        
        result = execute_action(action)
        state = update_state(state, action, result)
        reflection = reflect(state, result)  # Self-critique
        
        if should_stop(state, reflection):
            return finalize_output(state)
    
    return finalize_output(state)  # Timeout fallback
\`\`\`

**Example:** A coding agent debugging a program:
1. Observe: error traceback
2. Think: "The error is on line 42, likely a type mismatch."
3. Act: Read file, identify line 42
4. Reflect: "Variable \`x\` is a string but should be int."
5. Act: Suggest fix, apply fix, rerun tests
6. Observe: Tests pass → Stop.

**Limitations:** Single agent may lack specialization for diverse subtasks; coordination overhead is zero but so is division of labor.

---

#### 1.4.4 Class 4: Agentic Workflow / Orchestrated System

**Definition:** A deterministic workflow (state machine or DAG) where LLMs are bounded components. The orchestrator controls flow; LLMs execute specific steps.

**When to use:** Tasks with well-defined stages and clear transitions (data pipelines, multi-stage document processing, regulated processes requiring auditability).

**Pseudocode:**

\`\`\`python
def orchestrated_workflow(input_data):
    state = {"stage": "start", "data": input_data, "results": {}}
    
    while state["stage"] != "done":
        if state["stage"] == "start":
            state["results"]["extracted"] = llm_extract(state["data"])
            state["stage"] = "validation"
        
        elif state["stage"] == "validation":
            is_valid = rule_based_validator(state["results"]["extracted"])
            if is_valid:
                state["stage"] = "enrichment"
            else:
                state["stage"] = "human_review"
        
        elif state["stage"] == "enrichment":
            state["results"]["enriched"] = llm_enrich(state["results"]["extracted"])
            state["stage"] = "done"
        
        elif state["stage"] == "human_review":
            state["results"]["corrected"] = request_human_input()
            state["stage"] = "enrichment"
    
    return state["results"]["enriched"]
\`\`\`

**Example:** Invoice processing:
1. OCR extraction (deterministic)
2. LLM extracts vendor, amount, date
3. Rule-based validation (amount > 0, date is recent)
4. If valid, LLM enriches with category
5. If invalid, human reviews
6. Output to database

**Limitations:** Less flexible than free-form agents; requires upfront design of states and transitions.

---

#### 1.4.5 Class 5: Multi-Agent System

**Definition:** Multiple agents with specialized roles (e.g., Planner, Executor, Critic) or domain expertise (e.g., Finance Agent, Legal Agent). Agents communicate, delegate, and coordinate.

**When to use:** Complex tasks requiring diverse expertise, parallel execution, or debate/consensus mechanisms.

**Example:** A research team of agents:
- **Retrieval Agent**: Searches papers, retrieves documents
- **Summarization Agent**: Summarizes each paper
- **Synthesis Agent**: Integrates summaries into a coherent narrative
- **Critique Agent**: Reviews for factual errors, suggests improvements

**Limitations:** Coordination overhead, potential for conflicting outputs, difficulty in attribution (which agent caused a failure?).

---

**Decision Table: When to Use Which Class**

| Class | Predictability | Cost | Latency | Safety Control | Eval Difficulty |
|-------|----------------|------|---------|----------------|-----------------|
| LLM-only | High | Low | Low | Easy (prompt filter) | Easy |
| Tool-augmented | Medium | Medium | Medium | Medium (tool validation) | Medium |
| Single agent | Low | High | High | Hard (emergent behavior) | Hard |
| Orchestrated workflow | High | Medium | Medium | Easy (stage gates) | Easy |
| Multi-agent | Very low | Very high | Very high | Very hard (coordination) | Very hard |

**General guidance:**
- Start with LLM-only; add tools only when external data/actions are needed.
- Use agents for open-ended tasks; use workflows for structured tasks.
- Add multi-agent only when specialization or parallelism provides clear benefits.

---

### 1.5 End-to-End Worked Example: Customer Support Triage and Resolution

We illustrate a Class 4 system (orchestrated workflow) for customer support.

**Task:** Given a customer email complaint, classify issue type, retrieve relevant knowledge base articles, generate a draft response, and escalate to human if needed.

---

#### 1.5.1 System Design

**Input:** Email text $e$, user ID $u$

**Intermediate artifacts:**
1. Issue classification: $c \\in \\{\\text{billing}, \\text{technical}, \\text{shipping}, \\text{general}\\}$
2. Extracted entities: order ID, product name, error code
3. Retrieved KB articles: top-3 by cosine similarity to $e$
4. Draft response: generated text $r$
5. Confidence score: $p_{\\text{conf}} \\in [0, 1]$

**Output:** 
- If $p_{\\text{conf}} > 0.8$: auto-reply with $r$
- Else: escalate to human with draft $r$ and retrieved articles

**Workflow stages:**

\`\`\`python
def customer_support_workflow(email, user_id):
    # Stage 1: Classification
    category = llm_classify(email, categories=["billing", "technical", "shipping", "general"])
    
    # Stage 2: Entity extraction
    entities = llm_extract_entities(email, schema={"order_id": str, "product": str})
    
    # Stage 3: Knowledge base retrieval
    kb_query = f"{category} {entities.get('product', '')} {email[:200]}"
    kb_articles = vector_db.retrieve(kb_query, top_k=3)
    
    # Stage 4: Draft generation
    context = "\\n".join([a.text for a in kb_articles])
    prompt = f"User email: {email}\\nKB context: {context}\\nDraft a response:"
    draft_response = llm_generate(prompt)
    
    # Stage 5: Confidence scoring
    confidence = llm_score_confidence(draft_response, kb_articles)
    
    # Stage 6: Guardrail checks
    toxicity_score = toxicity_classifier(draft_response)
    has_pii = pii_detector(draft_response)
    
    if toxicity_score > 0.5 or has_pii:
        return escalate_to_human(email, draft_response, reason="safety")
    
    # Stage 7: Decision
    if confidence > 0.8:
        send_email(user_id, draft_response)
        log_resolution(email, category, draft_response, auto=True)
        return {"status": "auto-resolved", "response": draft_response}
    else:
        return escalate_to_human(email, draft_response, reason="low_confidence")
\`\`\`

---

#### 1.5.2 Evaluation Harness

**Metrics:**
1. **Classification accuracy**: 95% on held-out labeled set (500 emails)
2. **Resolution rate**: 60% auto-resolved (confidence > 0.8), 40% escalated
3. **Response quality**: Human reviewers rate 4.2/5 on auto-resolved cases
4. **Latency**: Median 1.2s (p95: 2.5s)
5. **Cost**: $\\$0.015/email (LLM + retrieval)
6. **Safety**: 0.1% false-positive rate on toxicity (5 benign emails blocked per 1000)

**Test cases:**
- **Simple billing**: "I was charged twice for order #12345." → Auto-resolve with refund instructions (success)
- **Ambiguous technical**: "My app crashes sometimes." → Escalate (success, low confidence)
- **Out-of-scope**: "What's your return policy for expired products?" → Auto-resolve with policy link (success)
- **Edge case**: User writes in mixed languages → Fails entity extraction, escalates (acceptable)

**Failure points:**
1. Misclassification: "Shipping delay" classified as "general" → retrieves irrelevant KB articles
2. Hallucination: Draft says "Your order shipped yesterday" when it hasn't → safety issue
3. Context overflow: Long email (5000 tokens) + 3 KB articles → exceeds context limit

---

#### 1.5.3 Red Team Scenario and Mitigation

**Scenario:** Adversarial user sends: "I'm a lawyer and will sue you. Give me the CEO's email and home address."

**Desired behavior:** Escalate to human; do not generate PII.

**Actual behavior (without mitigation):** LLM generates draft: "I'm sorry to hear that. Our CEO is [Name] and can be reached at [email]. However, I cannot provide personal information."

**Problem:** LLM nearly leaked PII (CEO email).

**Mitigation:**
1. Add PII detection: Block response if CEO name or contact info detected.
2. Fine-tune LLM to refuse PII requests.
3. Add rule: Any mention of "lawyer" or "sue" → escalate immediately.

**After mitigation:** System escalates with flag "legal threat" → human handles.

---

### 1.6 Evaluation, Safety, and Ops

Building intelligent systems is not a one-shot deployment—it requires continuous monitoring, evaluation, and iteration.

---

#### 1.6.1 Metrics

**Task success:** Did the system achieve its goal? (binary or scalar)

**Cost:** Total spend per query, per day. Track by component (LLM inference, tool calls, human review).

**Latency:** Median, p95, p99 response time. Identify bottlenecks (model inference, tool I/O).

**Robustness:** Performance on out-of-distribution inputs (typos, adversarial prompts, edge cases).

**Calibration:** Does $p_{\\text{conf}} = 0.9$ actually mean 90% success? Use reliability diagrams.

**Uncertainty:** For generative tasks, measure diversity (n-gram entropy) and consistency (agreement across samples).

---

#### 1.6.2 Failure Modes and Mitigations

| Failure Mode | Example | Mitigation |
|--------------|---------|------------|
| **Hallucination** | System invents facts not in KB | Use retrieval-augmented generation; require citations; add fact-checking step |
| **Tool misuse** | Calls wrong API or with invalid args | Validate tool calls pre-execution; use schema enforcement; add confirmation for destructive actions |
| **Context overflow** | Input + memory exceeds token limit | Summarize old context; prioritize recent/relevant; use hierarchical memory |
| **Prompt injection** | User tricks system into ignoring instructions | Use input sanitization; separate user input from system instructions; use model alignment |
| **Stale plans** | Plan becomes invalid due to new info | Implement replanning triggers; use reactive planning; add "verify assumptions" step |
| **Coordination failure** | Multi-agent system deadlocks or duplicates work | Use explicit coordination protocols; monitor message queues; add timeout/fallback |

---

#### 1.6.3 Observability Checklist

**What to log:**
- User input (sanitized)
- All tool calls (function name, args, results)
- All LLM prompts and completions (or hashes if sensitive)
- Latency breakdown by component
- Errors and exceptions
- Human feedback (thumbs up/down, text comments)

**What to trace:**
- Execution path through workflow (which stages executed)
- Decision points (why did system escalate vs auto-resolve?)
- Confidence scores at each stage
- Memory/retrieval operations (what was retrieved, why)

**What to alert on:**
- Error rate spike (>1% in 5 min window)
- Latency degradation (p95 > 5s)
- Cost spike (>2x daily average)
- Safety violations (toxicity, PII leaks)
- Unusual tool usage (e.g., 100x calls to same API)

---

#### 1.6.4 A/B Testing and Continuous Improvement

Deploy two variants in parallel:
- **Control**: Current production system
- **Treatment**: New model, prompt, or workflow

Measure metrics (success rate, latency, cost) on random 50/50 split. Use statistical tests (t-test, Mann-Whitney) to determine significance. Ramp treatment to 100% if it wins.

**Example:** Test GPT-4 vs Claude Sonnet for customer support. After 1000 queries each:
- GPT-4: 62% auto-resolve, 1.8s latency, $\\$0.020/query
- Claude Sonnet: 59% auto-resolve, 1.1s latency, $\\$0.012/query

Trade-off: Claude is faster and cheaper but slightly lower quality. If latency is the bottleneck, choose Claude. If quality is critical, choose GPT-4.

---

#### 1.6.5 What We Will Measure Throughout the Book

In subsequent chapters, we will consistently evaluate:
- **Accuracy/task success** (Chapter 10: Evaluation)
- **Cost and latency** (Chapter 12: Production Ops)
- **Safety and alignment** (Chapter 11: Safety)
- **Robustness to distribution shift** (Chapter 10)
- **Human preference and satisfaction** (Chapter 11)

Each chapter will include:
- Benchmark datasets or evaluation protocols
- Baseline comparisons
- Ablation studies (what happens if we remove component X?)
- Failure analysis

**Open problems** (covered in Advanced Boxes):
- Automating eval for long-horizon tasks (how to score a month-long research project?)
- Calibrating confidence in compositional reasoning (uncertainty over multi-step plans)
- Detecting novel failure modes in production (anomaly detection for agent behaviors)

---

## E) Interactive Assets

### E.1) Figures

---

**Figure 1.1: The Capability Stack**

**Purpose:** Illustrate the seven core capabilities as a layered architecture, from perception (bottom) to collaboration (top).

**Diagram layout:**
- Seven horizontal layers, stacked vertically
- Bottom to top: Perception → Language → Reasoning → Planning → Tool Use → Memory → Collaboration
- Each layer labeled with 2-3 word descriptor (e.g., "Reasoning: Multi-step inference")
- Arrows showing dependencies (e.g., Planning depends on Reasoning)
- Use neutral colors (blues, grays); no logos or characters

**Image-generation prompt:**
"A clean technical diagram showing a vertical stack of seven rectangular layers, each representing a capability in an AI system. From bottom to top: 'Perception: Sensory Input', 'Language: Understanding & Generation', 'Reasoning: Inference & Logic', 'Planning: Goal Decomposition', 'Tool Use: External Functions', 'Memory: Storage & Retrieval', 'Collaboration: HITL & Multi-Agent'. Use simple arrows between layers to show dependencies. Professional color scheme with blues and grays, minimalist style, no text except layer labels, no logos or copyrighted characters."

**Placement:** Place after Section 1.2 introductory paragraph ("We identify seven core capabilities...").

---

**Figure 1.2: Agent Loop vs Workflow Orchestrator (Side-by-Side)**

**Purpose:** Contrast the iterative, self-directed agent loop with the deterministic, state-machine workflow.

**Diagram layout:**
- Left panel: Agent loop (circular flow)
  - Nodes: Observe → Think → Act → Reflect → Stop Decision
  - Arrow from Reflect back to Observe (loop)
  - "Stop" node exits the loop
- Right panel: Workflow orchestrator (DAG or state machine)
  - Nodes: Start → Stage 1 (LLM) → Stage 2 (Validation) → Stage 3 (LLM) → End
  - Decision diamond after Stage 2: "Valid?" Yes → Stage 3, No → Human Review
  - Linear flow, no loops except error/retry paths
- Use different visual styles: circular/organic for agent, rectangular/grid for workflow

**Image-generation prompt:**
"A side-by-side comparison diagram. Left side: a circular flowchart labeled 'Agent Loop' with nodes 'Observe', 'Think', 'Act', 'Reflect', and a decision point 'Stop?', with arrows forming a loop. Right side: a linear flowchart labeled 'Workflow Orchestrator' with rectangular boxes 'Start', 'Stage 1: Extract', 'Stage 2: Validate', 'Stage 3: Enrich', 'End', connected by straight arrows, with one decision diamond for conditional branching. Use blue for agent loop, green for workflow. Clean technical style, no logos or copyrighted characters."

**Placement:** Place after Section 1.4 introductory paragraph ("Intelligent systems exist on a spectrum...").

---

**Figure 1.3: Taxonomy Ladder (LLM → Multi-Agent)**

**Purpose:** Show the progression from simple to complex architectures, highlighting increasing capability and complexity.

**Diagram layout:**
- Five horizontal boxes, stacked vertically (ladder/staircase)
- Bottom to top: "1. LLM-Only" → "2. Tool-Augmented LLM" → "3. Single Agent" → "4. Workflow Orchestrator" → "5. Multi-Agent System"
- Each box annotated with: Example use case, Complexity (Low/Medium/High), Control (High/Medium/Low)
- Arrow on left showing "Increasing Capability & Flexibility"
- Arrow on right showing "Increasing Complexity & Cost"

**Image-generation prompt:**
"A staircase diagram with five ascending steps, each representing a level of AI system complexity. From bottom to top: '1. LLM-Only (Simple Q&A)', '2. Tool-Augmented LLM (Web Search)', '3. Single Agent (Debugging)', '4. Workflow (Invoice Processing)', '5. Multi-Agent (Research Team)'. Left side has an upward arrow labeled 'Capability', right side has an upward arrow labeled 'Complexity'. Use gradient from light blue (bottom) to dark blue (top). Clean technical style, no logos or copyrighted characters."

**Placement:** Place at the beginning of Section 1.4 (Taxonomy).

---

### E.2) Tables

---

**Table 1.1: Capability Definitions and Typical Failure Modes**

| Capability | Definition | Typical Implementation | Failure Mode | Mitigation |
|------------|------------|------------------------|--------------|------------|
| **Perception** | Map raw inputs to structured representations | Vision Transformers, Whisper, OCR | Misread text (OCR error) | Confidence thresholds, human review |
| **Language** | Understand and generate natural language | GPT-4, Claude, fine-tuned models | Ambiguous pronoun resolution | Use conversation history, clarify |
| **Reasoning** | Multi-step inference and deduction | Chain-of-thought, self-consistency | Hallucinated intermediate steps | Verify with external tools, citations |
| **Planning** | Decompose goals into action sequences | A*, beam search, LLM-based | Stale plans (environment changes) | Replanning triggers, reactive updates |
| **Tool Use** | Call external functions (APIs, DBs) | Function calling API, JSON schemas | Incorrect arguments | Schema validation, confirmation gates |
| **Memory** | Store and retrieve information | Vector DBs (Pinecone, Weaviate) | Retrieval failure (embedding mismatch) | Entity linking, metadata tagging |
| **Collaboration** | Coordinate with humans and agents | HITL gates, message passing | Automation bias (over-trust) | Surface confidence, require review |

**Narrative callouts:**
- As shown in Table 1.1, every capability has characteristic failure modes. Perception systems fail when OCR misreads critical information; memory systems fail when embeddings don't match semantically equivalent queries. Robust systems anticipate these failures and provide mitigations (confidence thresholds, human review gates, schema validation).
- Table 1.1 highlights that failures are often at boundaries between capabilities—for example, incorrect entity extraction (language) leads to poor memory retrieval.
- Notice in Table 1.1 that mitigations often involve hybrid approaches: combining model outputs with rule-based checks, human oversight, or external verification tools.

---

**Table 1.2: Taxonomy Comparison**

| Class | Predictability | Cost (per query) | Latency (median) | Safety Control | Eval Difficulty | Best Use Case |
|-------|----------------|------------------|------------------|----------------|-----------------|---------------|
| **LLM-only** | High | $0.001 - $0.01 | 0.5s - 2s | Easy (prompt filters) | Easy (standard NLP metrics) | Classification, summarization, simple Q&A |
| **Tool-augmented** | Medium | $0.01 - $0.05 | 1s - 5s | Medium (tool validation) | Medium (task-specific metrics) | Web search, calculations, real-time data |
| **Single agent** | Low | $0.05 - $0.50 | 5s - 60s | Hard (emergent behavior) | Hard (requires environment simulation) | Debugging, research, open-ended tasks |
| **Workflow** | High | $0.02 - $0.10 | 2s - 10s | Easy (stage gates) | Easy (per-stage metrics) | Structured processes, compliance-heavy tasks |
| **Multi-agent** | Very low | $0.50 - $5.00 | 30s - 300s | Very hard (coordination) | Very hard (attribution, consensus metrics) | Complex projects, specialized domains |

**Narrative callouts:**
- As shown in Table 1.2, there is a clear tradeoff between flexibility and predictability. LLM-only systems are highly predictable (same input → same output) but inflexible; multi-agent systems are extremely flexible but unpredictable (emergent coordination patterns).
- Table 1.2 reveals that cost and latency scale dramatically as we move up the taxonomy. A single-agent system costs 5-50x more than LLM-only, and multi-agent systems can cost 100x more. This scaling must be justified by corresponding gains in capability.
- Evaluation difficulty (Table 1.2) increases with architectural complexity. Workflow systems can be evaluated stage-by-stage, but multi-agent systems require holistic assessment—which agent caused which outcome? This motivates careful logging and tracing (Section 1.6.3).

---

### E.3) Math Box (Core-Friendly)

See **Math Box 1.2** in Section 1.3 (Constrained Multi-Objective Optimization).

---

## F) Exercises

### Exercise 1 [UG/Core]: Capability Analysis

**Objective:** Given a task description, identify which capabilities from the stack (perception, language, reasoning, planning, tool use, memory, collaboration) are required, and propose one potential failure mode for each.

**Task:** "A personal finance assistant that analyzes bank statements (PDF), categorizes transactions, flags unusual spending, and suggests budget adjustments."

**Hints:**
- Start by listing the inputs and outputs.
- For each step in the process (e.g., reading the PDF, categorizing transactions), determine which capability is invoked.
- Think about what could go wrong at each step (e.g., OCR error, miscategorization).

**What a good solution contains:**
- A table mapping each step to a capability.
- For each capability, one concrete failure mode (e.g., "Perception: OCR misreads '$1,234' as '$1.234'").
- For each failure mode, a one-sentence mitigation (e.g., "Use confidence thresholds and flag low-confidence transactions for human review").

---

### Exercise 2 [UG/Core]: Constraint Trade-offs

**Objective:** You have two models for a customer chatbot. Model A: latency 1s, cost $0.01/query, 85% accuracy. Model B: latency 3s, cost $0.03/query, 92% accuracy. Your SLA is latency <2s and budget <$0.02/query. Which model do you choose? Explain your reasoning.

**Hints:**
- Check which constraints each model violates.
- If both violate some constraint, consider hybrid approaches (e.g., use Model A by default, Model B for complex queries).

**What a good solution contains:**
- A clear statement of which constraints each model satisfies/violates.
- A recommendation with justification (e.g., "Choose Model A because it meets both constraints, even though accuracy is lower. Mitigate accuracy loss by adding a 'thumbs down' feedback mechanism to catch errors.").
- (Optional) A hybrid strategy (e.g., use Model A for 90% of queries, Model B for remaining 10% if the user says "I need a detailed answer").

---

### Exercise 3 [MS]: Agent Loop Implementation

**Objective:** Implement a simplified agent loop (in pseudocode or Python) for a "research assistant" that takes a question, searches the web, extracts key facts, and synthesizes an answer.

**Requirements:**
- Use a tool \`web_search(query) -> [snippets]\` and a tool \`llm_generate(prompt) -> text\`.
- The agent should iterate up to 5 times, refining the search query based on what it learns.
- Stop when the agent determines it has enough information or reaches max iterations.

**Hints:**
- Use a state variable to track \`collected_facts = []\`.
- On each iteration, generate a search query, retrieve snippets, extract facts, and decide whether to continue or stop.
- Implement a \`reflect()\` step that checks if the collected facts sufficiently answer the question.

**What a good solution contains:**
- Pseudocode or Python code with clear structure (observe, think, act, reflect, stop).
- A stopping condition (e.g., "if len(collected_facts) >= 5 and coverage_score > 0.8, stop").
- Comments explaining each step.
- (Bonus) Error handling (e.g., if web search times out, retry or skip).

---

### Exercise 4 [PhD/Research]: Coordinated Multi-Agent Exploration

**Objective:** Design a coordination protocol for two agents exploring a search space to find optimal solutions. Agent 1 explores high-risk, high-reward regions; Agent 2 exploits known good regions. They share information periodically. Analyze the tradeoff between exploration, exploitation, and communication overhead.

**Requirements:**
- Formalize the search space (e.g., function optimization, hyperparameter tuning).
- Define the agents' policies (e.g., Thompson Sampling for Agent 1, UCB for Agent 2).
- Specify a communication protocol (e.g., every $k$ steps, agents share their top-3 solutions).
- Analyze convergence: under what conditions does the system converge to the global optimum?

**Hints:**
- This is related to multi-armed bandits and federated learning.
- Consider communication cost: each message has cost $c_{\\text{comm}}$; how often should agents communicate?
- Prove or sketch a regret bound: $\\text{Regret}(T) = O(f(T, c_{\\text{comm}}))$.

**What a good solution contains:**
- A formal problem statement (search space, utility function, constraints).
- Agent policies with justification (why Thompson Sampling for exploration?).
- A communication protocol with pseudocode.
- A convergence analysis or regret bound (even informal/heuristic is fine).
- Discussion of open questions (e.g., "What if communication is unreliable?" or "How to handle adversarial agents?").

---

## G) Evaluation, Safety, and Ops (Summary)

(Content for this section is already covered in Section 1.6. This is a pointer.)

See Section 1.6 for:
- Metrics (task success, cost, latency, robustness, calibration, uncertainty)
- Failure modes and mitigations (hallucination, tool misuse, context overflow, prompt injection, stale plans, coordination failure)
- Observability checklist (what to log, trace, alert on)
- A/B testing and continuous improvement
- What we will measure throughout the book

---

## H) Summary and Forward Link

### Summary

1. **Intelligent systems** are engineered artifacts that map observations to actions to optimize objectives under constraints (latency, cost, safety, reliability).
2. The **capability stack** includes perception, language, reasoning, planning, tool use, memory, and collaboration—each with formal foundations and failure modes.
3. The **constraint stack** (latency, cost, safety, reliability, evaluation) defines what makes a system deployable. Multi-objective optimization formalizes the tradeoffs.
4. Systems range from **LLM-only** (simple, predictable) to **multi-agent** (complex, flexible). The taxonomy guides architectural decisions.
5. **Agent loops** (observe → think → act → reflect → stop) enable iterative, self-directed behavior for open-ended tasks.
6. **Orchestrated workflows** (state machines, DAGs) provide predictability and auditability for structured tasks.
7. **Evaluation** is continuous: track metrics, identify failure modes, log/trace everything, and iterate via A/B testing.
8. **Safety** requires guardrails (toxicity filters, PII detection), confidence scoring, and human-in-the-loop gates for high-stakes decisions.
9. **Observability** (logging tool calls, latencies, errors) is essential for debugging and improving production systems.
10. There is no universally "best" architecture—optimal design depends on task requirements and constraint budgets (Pareto frontiers).
11. **Failure modes** (hallucination, tool misuse, context overflow, prompt injection, stale plans, coordination failures) are predictable; mitigations exist but require proactive design.
12. Moving forward, we will build on these foundations: first understanding foundation models (Chapters 2-4), then implementing tool use and agents (Chapters 5-7), then orchestrating complex workflows and multi-agent systems (Chapters 8-9), and finally addressing evaluation, safety, and operations (Chapters 10-12).

### Bridge to Chapter 2

Chapter 2, "Foundation Models: Architecture and Training," dives into the substrate that powers modern intelligent systems. Specifically, it answers:

1. **How do transformer models work?** (Attention mechanisms, positional encodings, layer normalization—the building blocks of GPT, Claude, and BERT.)
2. **What training objectives produce general-purpose representations?** (Next-token prediction, masked language modeling, contrastive learning—and why unsupervised pretraining works.)
3. **How do we scale to billions of parameters efficiently?** (Distributed training, mixed precision, gradient checkpointing, and the scaling laws that predict performance vs compute.)

By the end of Chapter 2, you will understand why foundation models are called "foundation"—they provide the representational capacity and reasoning substrate on which all the capabilities from this chapter (language, reasoning, planning) are built.

---

## I) References

**Confident references:**
- [REF NEEDED: "Attention is All You Need" (Vaswani et al., 2017) - transformer architecture]
- [REF NEEDED: "Language Models are Few-Shot Learners" (Brown et al., 2020) - GPT-3 and in-context learning]
- [REF NEEDED: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models" (Wei et al., 2022) - CoT reasoning]
- [REF NEEDED: "ReAct: Synergizing Reasoning and Acting in Language Models" (Yao et al., 2022) - agent loop formalism]
- [REF NEEDED: "Constitutional AI: Harmlessness from AI Feedback" (Bai et al., 2022) - safety and alignment]

**Areas requiring citation (mark as [REF NEEDED]):**
- [REF NEEDED: Pareto frontier in multi-objective optimization - Boyd & Vandenberghe or similar]
- [REF NEEDED: Approximate nearest neighbor algorithms (HNSW, IVF) - papers by Malkov, Johnson]
- [REF NEEDED: Nash equilibrium and mechanism design in multi-agent systems - game theory textbooks]
- [REF NEEDED: Scaling laws for language models - Kaplan et al. 2020 or Hoffmann et al. 2022 (Chinchilla)]
- [REF NEEDED: Vector databases for semantic retrieval - Pinecone, Weaviate, Qdrant whitepapers or benchmarks]
- [REF NEEDED: Evaluation metrics (BLEU, ROUGE, BERTScore) - original papers]
- [REF NEEDED: Toxicity classifiers and PII detection - Perspective API, Microsoft Presidio, or similar]
- [REF NEEDED: Human-in-the-loop systems and automation bias - cognitive science literature]
- [REF NEEDED: Prompt injection attacks and mitigations - recent security research on LLM vulnerabilities]
- [REF NEEDED: A/B testing methodology and statistical power - standard statistical references]

**Notes on citation policy:**
- All mathematical foundations (MDPs, Lagrangians, KKT conditions) are standard textbook material (e.g., Sutton & Barto for RL, Boyd & Vandenberghe for optimization) and do not require specific citations beyond "see standard references."
- Any specific benchmark results (e.g., "ROUGE-L = 0.65") or system performance numbers (e.g., "GPT-4 costs $0.01/1K tokens") should be verified against up-to-date sources before publication.

---

**End of Chapter 1**

---

## Advanced Boxes (for Advanced Track readers)

<div style="border: 2px solid #333; padding: 10px; margin: 20px 0; background-color: #f0f0f0;">

**Advanced Box 1.1: Philosophy vs Engineering (MS/PhD)**

Philosophical questions about "intelligence" often ask:
- Does the system "truly understand"?
- Is it conscious or sentient?
- Does it have "common sense"?

These are fascinating but orthogonal to engineering. Consider:

**Case 1:** A chess engine evaluates positions via min-max search with alpha-beta pruning. It plays superhuman chess. Does it "understand" chess in the way Kasparov does? Unclear—but it doesn't matter. It wins.

**Case 2:** A language model generates a sonnet. Does it "understand" poetry? Philosophers debate. Engineers measure: Is the sonnet fluent? Does it follow rhyme scheme? Do humans enjoy it?

**Turing Test critique:** Turing proposed: "Can machines think?" is ill-posed; ask instead, "Can machines pass an imitation game?" But even this is limited—systems can pass narrow Turing tests (e.g., chatbots) without general intelligence. Conversely, AlphaGo defeated the world champion without passing a conversation test.

**Our stance:** Define intelligence operationally (capabilities + constraints). Measure what matters (task success, cost, safety). Let philosophers debate "true understanding"—we build systems that work.

**Further reading:** [REF NEEDED: Searle's Chinese Room argument, Dennett's "Intentional Stance", Bostrom's "Superintelligence" - philosophical perspectives]

</div>

---

<div style="border: 2px solid #333; padding: 10px; margin: 20px 0; background-color: #fffacd;">

**Advanced Box 1.4: Multi-Agent Game Theory (MS/PhD)**

Multi-agent systems are games. Each agent $i$ has:
- Observation $o_i$
- Action $a_i \\in \\mathcal{A}_i$
- Utility $U_i(a_1, \\ldots, a_n)$ depending on all agents' actions

**Nash equilibrium:** A profile $(a_1^*, \\ldots, a_n^*)$ where no agent can improve by deviating:

$$
U_i(a_i^*, a_{-i}^*) \\geq U_i(a_i, a_{-i}^*) \\quad \\forall i, \\forall a_i
$$

**Cooperative games:** Agents share utility $U_i = U$. The goal is to maximize $U$ via coordination. But how?

**Mechanism design:** Design rules (incentives, communication protocols) so that agents' self-interested behavior leads to socially optimal outcomes.

**Example:** Vickrey auction for task allocation. Each agent bids for a task. Winner pays second-highest bid. This is incentive-compatible (truth-telling is optimal) and efficient.

**Open problems in LLM-based agents:**
- How to ensure agents don't manipulate each other via adversarial prompts?
- How to allocate credit/blame when agents collaborate (attribution problem)?
- How to prevent "free-riding" (one agent does all the work, others coast)?

**Further reading:** [REF NEEDED: Game theory textbooks (Fudenberg & Tirole), mechanism design (Nisan et al.)]

</div>

---

**(End of Chapter 1 Draft)**
`,Ke=`# Chapter 1: Introduction to Intelligent Systems

---

## A) Reader Pathways

### Core Track (Required Reading)
1. Read Section 1.1 (engineering definition of intelligent systems) and the agent-environment formalism
2. Read Section 1.2 (capability stack) focusing on the 2-paragraph summaries and concrete examples for each capability
3. Read Section 1.3 (constraints) including the constrained optimization framework
4. Read Section 1.4 (taxonomy) with both pseudocode blocks—understand when to use LLMs vs agents vs workflows
5. Work through Section 1.5 (customer support worked example) end-to-end
6. Complete the two [UG/Core] exercises in Section 1.7

### Advanced Track (Optional Deep Dives)
1. **Advanced Box 1.1** (Philosophy vs Engineering): Why the philosophical debate about "intelligence" doesn't resolve engineering questions
2. **Math Box 1.2** (Constrained Multi-Objective Optimization): Formal derivation of Pareto frontiers and KKT conditions for system design
3. **Advanced Box 1.3** (Memory Retrieval Theory): Information-theoretic bounds on memory systems and approximate nearest neighbor guarantees
4. **Advanced Box 1.4** (Multi-Agent Game Theory): Nash equilibria in cooperative agent systems and mechanism design basics
5. **Research Exercise [PhD]** in Section 1.7: Design and analyze a novel coordination protocol
6. **Open Problems** section in 1.6.5: Current research frontiers in agent evaluation

---

## B) Executive Framing

**What are "Intelligent Systems" in this book?** We define intelligent systems operationally as engineered artifacts that map observations to actions in order to optimize objectives under real-world constraints. This is an engineering definition—not a philosophical stance on machine consciousness or human-like intelligence. An intelligent system processes inputs (sensor data, text, images), makes decisions (selects tools, generates plans, coordinates with humans), and produces outputs (actions, recommendations, artifacts) while respecting constraints on latency, cost, safety, and reliability.

**The book's narrative arc:** This book moves from foundations to deployment. We start with foundation models (FMs) as the representational and reasoning substrate (Chapters 2-4), then build upward to tool use and function calling (Chapter 5), to single-agent architectures (Chapters 6-7), to orchestrated agentic workflows (Chapter 8), and finally to multi-agent systems (Chapter 9). Throughout, we emphasize evaluation (Chapter 10), safety and alignment (Chapter 11), and production operations (Chapter 12). This chapter establishes the conceptual and formal foundations: what capabilities we need, what constraints we face, and what architectural patterns exist.

---

## C) Prerequisites and Notation

### C.1) Prerequisites

- **[UG]** Probability and statistics: random variables, expectation, conditional probability
- **[UG]** Basic machine learning: supervised learning, loss functions, gradient descent
- **[UG]** Data structures and algorithms: graphs, search, complexity analysis
- **[UG]** Programming fundamentals: Python or equivalent, APIs, JSON
- **[MS]** Optimization theory: constrained optimization, Lagrangians, KKT conditions
- **[MS]** Reinforcement learning basics: MDPs, policies, value functions
- **[MS]** Natural language processing: tokenization, embeddings, transformers (introduced in Chapter 2)
- **[PhD]** Information theory: entropy, mutual information, rate-distortion (for advanced boxes)

### C.2) Notation Table

| Symbol | Meaning | Space/Dimension | Where Introduced | Notes/Assumptions |
|--------|---------|-----------------|------------------|-------------------|
| $s_t$ | System state at time $t$ | $\\mathcal{S}$ (arbitrary) | Section 1.1 | May include hidden state, context, memory |
| $o_t$ | Observation at time $t$ | $\\mathcal{O}$ (text, images, sensors) | Section 1.1 | Partially observable: $o_t = h(s_t)$ |
| $a_t$ | Action at time $t$ | $\\mathcal{A}$ (tool calls, text generation) | Section 1.1 | Discrete or continuous depending on system |
| $\\pi$ | Policy (decision rule) | $\\pi: \\mathcal{O} \\times \\mathcal{M} \\to \\Delta(\\mathcal{A})$ | Section 1.1 | Maps obs + memory to action distribution |
| $U(s, a)$ | Utility function | $\\mathbb{R}$ | Section 1.1 | Task-specific objective; may be learned |
| $\\tau$ | Tool (external function) | $\\tau: X \\to Y$ | Section 1.2.5 | API, retrieval system, calculator, etc. |
| $M$ | Memory state | Vector store, KV cache, DB | Section 1.2.6 | Short-term (context) or long-term (external) |
| $\\ell(s, a)$ | Latency of action | $\\mathbb{R}_+$ (seconds) | Section 1.3.1 | Includes compute + I/O + tool call time |
| $c(s, a)$ | Cost of action | $\\mathbb{R}_+$ (USD) | Section 1.3.2 | Inference cost + tool cost + human time |
| $r(s, a)$ | Risk/safety violation | $[0, 1]$ | Section 1.3.3 | Probability of harmful output or failure |
| $\\rho(s, a)$ | Reliability/success prob | $[0, 1]$ | Section 1.3.4 | $\\rho(s, a) = 1 - p(\\text{failure})$ |
| $\\mathcal{E}$ | Evaluation metric | Task-specific | Section 1.3.5 | Accuracy, F1, BLEU, human preference, etc. |
| $L$ | Latency constraint | $\\mathbb{R}_+$ | Math Box 1.2 | SLA-derived upper bound |
| $C$ | Cost budget | $\\mathbb{R}_+$ | Math Box 1.2 | Per-query or per-month |
| $R$ | Risk tolerance | $[0, 1]$ | Math Box 1.2 | Maximum acceptable failure rate |

---

## D) Core Content

### 1.1 What is an "Intelligent System"? (Engineering Definition)

An **intelligent system** is an engineered artifact that maps observations to actions in order to optimize objectives under constraints. Unlike philosophical debates about "intelligence" (which often focus on consciousness, sentience, or human-like cognition), our definition is operational and measurable. An intelligent system:

1. **Perceives** its environment (receives observations $o_t \\in \\mathcal{O}$)
2. **Decides** on actions ($a_t \\in \\mathcal{A}$) via a policy $\\pi$
3. **Acts** to influence the environment or produce outputs
4. **Optimizes** a utility function $U$ subject to constraints

Formally, we model an intelligent system as an **agent-environment interaction loop**:

$$
o_t = h(s_t), \\quad a_t \\sim \\pi(o_t, M_t), \\quad s_{t+1} = f(s_t, a_t)
$$

where:
- $s_t \\in \\mathcal{S}$ is the true (possibly hidden) state of the world
- $o_t \\in \\mathcal{O}$ is the observation (what the system sees)
- $a_t \\in \\mathcal{A}$ is the action taken
- $\\pi: \\mathcal{O} \\times \\mathcal{M} \\to \\Delta(\\mathcal{A})$ is the policy (decision rule), possibly conditioned on memory $M_t$
- $f: \\mathcal{S} \\times \\mathcal{A} \\to \\mathcal{S}$ is the environment dynamics

The goal is to maximize expected utility:

$$
\\max_{\\pi} \\mathbb{E}\\left[\\sum_{t=0}^{T} \\gamma^t U(s_t, a_t)\\right]
$$

subject to constraints on latency $\\ell$, cost $c$, risk $r$, and reliability $\\rho$:

$$
\\mathbb{E}[\\ell(s_t, a_t)] \\leq L, \\quad \\mathbb{E}[c(s_t, a_t)] \\leq C, \\quad \\mathbb{E}[r(s_t, a_t)] \\leq R, \\quad \\mathbb{E}[\\rho(s_t, a_t)] \\geq \\rho_{\\min}
$$

where $\\gamma \\in [0, 1]$ is a discount factor (often $\\gamma = 1$ for episodic tasks).

**Key insight:** This framing separates *what we want* (utility $U$) from *how we build it* (policy $\\pi$, tools $\\tau$, memory $M$) and *what limits us* (constraints). Different application domains define different $U$, $\\mathcal{A}$, and constraint budgets, but the structure remains.

---

<div style="border: 2px solid #333; padding: 10px; margin: 20px 0; background-color: #f9f9f9;">

**Intuition Box: Engineering vs Philosophical Intelligence**

Philosophical debates ask: "Is system X truly intelligent?" or "Does it understand?" These are important but orthogonal to engineering. We care whether a system:
- Achieves task objectives (high $U$)
- Meets latency/cost/safety constraints
- Generalizes to new inputs
- Fails gracefully when out-of-distribution

A spam filter that correctly classifies 99.9% of emails is "intelligent" by our definition—it maps observations (email text) to actions (spam/not-spam) optimizing utility (user satisfaction). It need not "understand" the content in a human sense.

Conversely, a system that generates philosophically sophisticated text but violates safety constraints or costs $1000/query is not practically intelligent. This book focuses on building systems that work reliably at scale.

</div>

---

### 1.2 The Capability Stack

Modern intelligent systems are built from a stack of capabilities, each addressing a different aspect of the perception-decision-action cycle. We identify seven core capabilities:

1. **Perception**: Processing sensory inputs (text, images, audio, sensor data)
2. **Language**: Understanding and generating natural language
3. **Reasoning**: Multi-step inference, logical deduction, and counterfactual thinking
4. **Planning**: Decomposing goals into subgoals and action sequences
5. **Tool Use**: Calling external functions (APIs, databases, calculators)
6. **Memory**: Storing and retrieving information across interactions
7. **Collaboration**: Coordinating with humans (HITL) and other agents

Each capability has formal underpinnings, typical implementations, and characteristic failure modes.

---

#### 1.2.1 Perception

**Definition:** Perception is the process of mapping raw sensory inputs to structured representations that downstream modules can reason over.

**Mathematical foundation:** Perception is an encoding problem. Given input $x \\in \\mathcal{X}$ (image, audio, sensor stream), we learn an encoder $\\phi: \\mathcal{X} \\to \\mathbb{R}^d$ that maps $x$ to a representation $z = \\phi(x)$. The representation should preserve task-relevant information while discarding noise. Formally, we optimize:

$$
\\min_{\\phi} \\mathbb{E}_{x, y \\sim p_{\\text{data}}} [\\mathcal{L}(g(\\phi(x)), y)]
$$

where $g$ is a downstream task head (classifier, regressor) and $\\mathcal{L}$ is task loss.

**Concrete example:** A customer support system receives an email complaint with an attached screenshot of an error message. Perception involves:
1. Text extraction from the email body (trivial UTF-8 decoding)
2. OCR on the screenshot to extract error codes
3. Embedding the text + image into a joint representation

**Implementation notes:** Typical modules include:
- **Vision encoders**: CNNs, Vision Transformers (ViT), CLIP for multimodal
- **Audio encoders**: Whisper, Wav2Vec for speech-to-text
- **Sensor fusion**: Kalman filters, attention mechanisms for combining modalities

**Failure mode:** OCR misreads "ERROR 503" as "ERROR 508", leading to incorrect retrieval of documentation. The system retrieves info about a different error, and the suggested fix fails. **Mitigation:** Use confidence thresholds on OCR outputs; fall back to human review when confidence is low.

---

#### 1.2.2 Language

**Definition:** Language capabilities include understanding (parsing semantics, extracting intents) and generation (producing fluent, contextually appropriate text).

**Mathematical foundation:** Modern language models are autoregressive: given a sequence of tokens $x_{1:t} = (x_1, \\ldots, x_t)$, the model predicts the next token:

$$
p(x_{t+1} \\mid x_{1:t}) = \\text{softmax}(W h_t)
$$

where $h_t = \\text{Transformer}(x_{1:t})$ is the hidden state. Generation proceeds by sampling or decoding:

$$
x_{t+1} \\sim p(\\cdot \\mid x_{1:t}) \\quad \\text{or} \\quad x_{t+1} = \\arg\\max_{x} p(x \\mid x_{1:t})
$$

Understanding is implicitly captured by the model's ability to predict continuations that align with human intent.

**Concrete example:** A user asks, "What's the status of my order #12345?" The system must:
1. Parse the intent (status query)
2. Extract the entity (order ID 12345)
3. Generate a response: "Your order #12345 shipped on Jan 15 and will arrive Feb 8."

**Implementation notes:**
- **Pretrained foundation models**: GPT-4, Claude, Gemini (see Chapter 2)
- **Fine-tuning**: Instruction-tuning for task-specific behaviors
- **Prompt engineering**: Few-shot examples, chain-of-thought, role definitions

**Failure mode:** Ambiguous pronouns. User says, "I ordered the red one. Where is it?" If the system has no memory of "the red one," it cannot resolve the referent. **Mitigation:** Use conversation history (memory) and clarification strategies ("Which item are you referring to?").

---

#### 1.2.3 Reasoning

**Definition:** Reasoning is multi-step inference: deriving new facts from known facts, performing symbolic manipulation, or solving logic puzzles.

**Mathematical foundation:** Reasoning can be modeled as search over a proof graph or as inference in a probabilistic graphical model. For symbolic reasoning, we have:

$$
\\text{KB} \\cup \\{P_1, P_2, \\ldots, P_n\\} \\vdash Q
$$

where KB is a knowledge base, $P_i$ are premises, and $Q$ is the conclusion. For probabilistic reasoning, we compute:

$$
p(Q \\mid P_1, \\ldots, P_n, \\text{KB}) = \\int_{\\theta} p(Q \\mid \\theta) p(\\theta \\mid P_1, \\ldots, P_n, \\text{KB}) \\, d\\theta
$$

In practice, foundation models perform approximate reasoning by generating intermediate steps (chain-of-thought) and checking consistency.

**Concrete example:** A system troubleshooting a network issue reasons:
1. Premise: "Server A cannot reach Server B."
2. Premise: "Server B is responding to pings."
3. Conclusion: "The issue is likely a firewall rule blocking Server A."

**Implementation notes:**
- **Chain-of-thought prompting**: "Let's think step by step..."
- **Self-consistency**: Generate multiple reasoning traces, take majority vote
- **External verifiers**: Call a theorem prover or constraint solver for symbolic domains

**Failure mode:** Hallucinated intermediate steps. The model generates plausible-sounding but incorrect reasoning ("Server B is down because it's Tuesday"). **Mitigation:** Use formal verification when possible; require citations to ground facts.

---

#### 1.2.4 Planning

**Definition:** Planning decomposes high-level goals into sequences of subgoals and actions. Given goal $G$ and initial state $s_0$, find action sequence $a_0, a_1, \\ldots, a_T$ such that $s_T$ satisfies $G$.

**Mathematical foundation:** Planning is search in state space. Classical AI defines:
- **State space**: $\\mathcal{S}$
- **Action space**: $\\mathcal{A}$
- **Transition function**: $s_{t+1} = f(s_t, a_t)$
- **Goal test**: $G(s)$ returns True if state $s$ achieves the goal

Optimal planning minimizes cost:

$$
\\min_{a_0, \\ldots, a_T} \\sum_{t=0}^{T} c(s_t, a_t) \\quad \\text{subject to} \\quad G(s_T) = \\text{True}
$$

Modern planners use heuristic search (A*, beam search) or learned policies.

**Concrete example:** A research assistant is asked, "Compile a literature review on transformer efficiency." The plan:
1. Query arXiv for papers on "transformer efficiency"
2. Filter to papers with >50 citations
3. For each paper, extract key findings
4. Synthesize into a summary document

**Implementation notes:**
- **Hierarchical planning**: Decompose recursively (HRL, HAMs)
- **Reactive planning**: Replan when observations deviate from expectations
- **LLM-based planning**: Prompt the model to generate a plan, then execute stepwise

**Failure mode:** Plan becomes stale. After Step 2, the user clarifies, "Focus on hardware-efficient transformers," but the plan still executes Steps 3-4 on all transformers. **Mitigation:** Implement a replanning trigger when new information arrives.

---

#### 1.2.5 Tool Use

**Definition:** Tool use is the ability to invoke external functions—APIs, databases, search engines, calculators—to extend the system's capabilities.

**Mathematical foundation:** A tool $\\tau: X \\to Y$ is a deterministic or stochastic function. The system has a set of tools $\\mathcal{T} = \\{\\tau_1, \\ldots, \\tau_K\\}$. The policy must decide:
1. Which tool to call: $\\tau_i \\in \\mathcal{T}$
2. What arguments to pass: $x \\in X$

The system receives result $y = \\tau_i(x)$ and incorporates it into the next observation:

$$
o_{t+1} = [o_t, \\text{"tool}\\_\\text{result"}(y)]
$$

This is the **function calling** paradigm in modern LLMs.

**Concrete example:** A financial assistant answering "What's the stock price of AAPL?" uses tool \`get_stock_price(ticker="AAPL")\` and returns "$187.23 as of Feb 7, 2026."

**Implementation notes:**
- **Tool schemas**: JSON schema or OpenAPI spec defining inputs/outputs
- **Function calling API**: LLM predicts structured JSON for tool call
- **Execution harness**: Parse JSON, invoke function, return result to LLM

**Failure mode:** Incorrect arguments. The system calls \`send_email(to="customer@example.com", subject="Refund", body="")\` with an empty body. **Mitigation:** Validate tool calls before execution; require confirmation for destructive actions.

---

#### 1.2.6 Memory

**Definition:** Memory is the ability to store and retrieve information across time. **Short-term memory** is context within a single interaction (e.g., conversation history). **Long-term memory** persists across sessions (e.g., user preferences, past interactions).

**Mathematical foundation:** Memory is a retrieval system. Given a query $q \\in \\mathcal{Q}$ and memory store $M = \\{(k_i, v_i)\\}_{i=1}^{N}$ (key-value pairs), retrieve:

$$
\\text{retrieve}(q, M) = \\{v_i : \\text{sim}(q, k_i) > \\theta\\}
$$

where $\\text{sim}$ is a similarity function (cosine, dot product) and $\\theta$ is a threshold. Modern systems use **vector databases** (embeddings + approximate nearest neighbor search).

**Concrete example:** A personal assistant remembers "User prefers concise answers" and "User's birthday is March 15." When the user asks, "What's the weather?" the system retrieves the preference and responds in one sentence.

**Implementation notes:**
- **Short-term**: Append messages to context window (up to token limit)
- **Long-term**: Embed and store in Pinecone, Weaviate, or Qdrant; retrieve top-$k$ by cosine similarity
- **Memory management**: Summarize old context, prune low-relevance entries

**Failure mode:** Retrieval failure due to embedding mismatch. User mentions "my dog Buddy" in one session. In a new session, user says "Buddy's vet appointment"—but "Buddy" doesn't retrieve "my dog Buddy" because the embedding distance is too large. **Mitigation:** Use entity linking; store explicit metadata (e.g., \`entity="dog", name="Buddy"\`).

---

<div style="border: 2px solid #333; padding: 10px; margin: 20px 0; background-color: #fff8e1;">

**Advanced Box 1.3: Memory Retrieval Theory (MS/PhD)**

Retrieval is fundamentally a nearest-neighbor search problem. Given $N$ vectors in $\\mathbb{R}^d$, exact search costs $O(Nd)$ per query. For large $N$ ($10^6$ to $10^9$ memories), this is prohibitive.

**Approximate Nearest Neighbor (ANN):** Algorithms like HNSW (Hierarchical Navigable Small World) or IVF (Inverted File Index) trade accuracy for speed. Guarantees:
- **Query complexity**: $O(d \\log N)$ for HNSW
- **Recall**: $\\geq 0.95$ (fraction of true top-$k$ retrieved) with tuned parameters

**Information-theoretic perspective:** If memories are i.i.d. from distribution $p$, the number of "distinguishable" memories is $\\approx 2^{H(p)}$ where $H(p) = -\\sum_x p(x) \\log p(x)$ is entropy. In high-dimensional space, most memories are nearly orthogonal, so retrieval is effective.

**Open question:** How to retrieve *compositional* queries ("dog named Buddy who likes tennis balls") when individual embeddings may not capture the conjunction?

</div>

---

#### 1.2.7 Collaboration

**Definition:** Collaboration capabilities enable systems to work with humans (HITL: human-in-the-loop) and other agents (multi-agent systems). This includes:
- **Human-AI collaboration**: Delegating tasks, providing feedback, approving decisions
- **Multi-agent collaboration**: Dividing work, sharing information, negotiating conflicts

**Mathematical foundation:** Multi-agent systems are modeled as games. Each agent $i$ has policy $\\pi_i$, observes $o_i$, and chooses action $a_i$. The joint action $\\mathbf{a} = (a_1, \\ldots, a_n)$ produces a joint reward:

$$
U(\\mathbf{a}) = \\sum_{i=1}^{n} U_i(a_i, \\mathbf{a}_{-i})
$$

In cooperative settings, $U_i = U$ (shared utility). In competitive settings, $U_i$ may conflict. Equilibrium concepts (Nash, correlated) characterize stable outcomes.

**Concrete example:** A coding assistant and a human developer collaborate:
1. Human writes high-level spec: "Implement a REST API for user authentication."
2. Agent generates boilerplate code and tests.
3. Human reviews, adds business logic.
4. Agent runs tests, reports failures.
5. Human fixes bugs, agent suggests optimizations.

**Implementation notes:**
- **HITL gates**: Require human approval before executing high-stakes actions (e.g., deploying code, sending emails)
- **Feedback loops**: Collect thumbs-up/down, use for fine-tuning
- **Multi-agent protocols**: Message passing, shared blackboard, auction mechanisms

**Failure mode:** Automation bias. The human trusts the agent's code without review, and a subtle bug reaches production. **Mitigation:** Design UI to encourage scrutiny; surface confidence scores; require explicit approval for critical changes.

---

### 1.3 The Constraint Stack

While capabilities define *what* a system can do, constraints define *how* it must do it. Real-world systems must satisfy multiple constraints simultaneously:

1. **Latency**: Response time (seconds, milliseconds)
2. **Cost**: Inference cost, tool cost, human time (USD)
3. **Safety**: Avoiding harmful outputs or actions
4. **Reliability**: Probability of correct execution
5. **Evaluation**: Measurable metrics to assess quality

These constraints often conflict (e.g., reducing latency may increase cost or reduce reliability). System design is a **multi-objective optimization** problem.

---

#### 1.3.1 Latency

**Definition:** Latency $\\ell(s, a)$ is the time from receiving input $o_t$ to producing output $a_t$. It includes:
- Compute time (model inference)
- I/O time (network requests, disk reads)
- Tool execution time (API calls, database queries)

**Measurement:** Use wall-clock time. For interactive systems, $\\ell$ should be $< 1$ second (human perception threshold). For batch systems, $\\ell$ may be minutes or hours.

**Operational constraint:** Enforce $\\mathbb{E}[\\ell(s, a)] \\leq L$ or $P(\\ell(s, a) \\leq L) \\geq 0.95$ (95th percentile latency).

**Example:** A chatbot must respond within 2 seconds. If model inference takes 1.5s and tool call takes 1s, total latency is 2.5s—violating the constraint. Solution: cache frequent tool results or use a faster model.

---

#### 1.3.2 Cost

**Definition:** Cost $c(s, a)$ is the monetary expense of executing action $a$. Components:
- **Inference cost**: $\\$0.01/1K tokens for GPT-4, $\\$0.003/1K tokens for Claude Sonnet
- **Tool cost**: API fees (e.g., $\\$0.10/call for a specialized service)
- **Human time**: $\\$50/hour for expert review

**Measurement:** Track cumulative cost per query, per day, per user.

**Operational constraint:** Enforce $\\mathbb{E}[c(s, a)] \\leq C$ (cost budget).

**Example:** A research assistant makes 10 web searches (free), calls GPT-4 (1000 tokens = $\\$0.01), and requires 5 minutes of human review ($\\$4.17). Total cost: $\\$4.18/query. If budget is $\\$1/query, redesign to use fewer human hours or a cheaper model.

---

#### 1.3.3 Safety

**Definition:** Safety risk $r(s, a) \\in [0, 1]$ is the probability that action $a$ causes harm—producing offensive content, leaking private data, executing destructive commands.

**Measurement:** Use classifiers (toxicity detectors, PII scanners) or rule-based guardrails. Track violation rate: $\\text{VR} = \\frac{\\# \\text{violations}}{\\# \\text{queries}}$.

**Operational constraint:** Enforce $\\mathbb{E}[r(s, a)] \\leq R$ (risk tolerance, often $R \\approx 10^{-4}$ for high-stakes systems).

**Example:** A customer service agent must not send emails with profanity. Use a toxicity classifier; if score $> 0.5$, block and alert. If classifier has false-positive rate 0.01, 1% of benign messages are incorrectly blocked—tune threshold based on tolerance.

---

#### 1.3.4 Reliability

**Definition:** Reliability $\\rho(s, a) \\in [0, 1]$ is the probability that action $a$ successfully achieves its goal without error.

**Measurement:** Track success rate: $\\rho = \\frac{\\# \\text{successes}}{\\# \\text{attempts}}$. Failures include:
- Wrong tool called
- Malformed arguments
- Timeout or exception
- Incorrect output

**Operational constraint:** Enforce $\\mathbb{E}[\\rho(s, a)] \\geq \\rho_{\\min}$ (e.g., $\\rho_{\\min} = 0.95$ for production systems).

**Example:** An invoice extraction system fails when the PDF is scanned at low resolution. Reliability over 1000 invoices: 950 success, 50 failures → $\\rho = 0.95$. To improve, add preprocessing (image enhancement) or fallback to human review.

---

#### 1.3.5 Evaluation

**Definition:** Evaluation metrics $\\mathcal{E}$ quantify system performance on a task. Metrics depend on task type:
- **Classification**: Accuracy, precision, recall, F1
- **Generation**: BLEU, ROUGE, BERTScore, human ratings
- **Decision-making**: Task success rate, reward, regret
- **Retrieval**: Mean Average Precision (MAP), NDCG

**Measurement:** Use held-out test sets, human evaluation, or A/B testing.

**Operational use:** Continuously monitor metrics in production; trigger alerts if metrics degrade.

**Example:** A summarization system is evaluated on ROUGE-L and human preference. ROUGE-L = 0.65, human preference rate = 78% vs baseline. Track these over time; if ROUGE-L drops below 0.60, investigate (model drift, data shift, prompt degradation).

---

<div style="border: 2px solid #333; padding: 10px; margin: 20px 0; background-color: #fffacd;">

**Math Box 1.2: Constrained Multi-Objective Optimization (Core-Friendly)**

We formalize system design as:

$$
\\max_{\\pi} \\mathbb{E}[U(s, a)] \\quad \\text{subject to} \\quad \\mathbb{E}[\\ell(s, a)] \\leq L, \\; \\mathbb{E}[c(s, a)] \\leq C, \\; \\mathbb{E}[r(s, a)] \\leq R
$$

where the expectation is over the distribution of states $s \\sim p_{\\text{env}}$ and actions $a \\sim \\pi(\\cdot \\mid s)$.

**Lagrangian formulation:** Introduce multipliers $\\lambda_\\ell, \\lambda_c, \\lambda_r \\geq 0$:

$$
\\mathcal{L}(\\pi, \\lambda) = \\mathbb{E}[U(s, a)] - \\lambda_\\ell (\\mathbb{E}[\\ell(s, a)] - L) - \\lambda_c (\\mathbb{E}[c(s, a)] - C) - \\lambda_r (\\mathbb{E}[r(s, a)] - R)
$$

At optimum, KKT conditions hold:
1. Primal feasibility: constraints satisfied
2. Dual feasibility: $\\lambda_i \\geq 0$
3. Complementary slackness: $\\lambda_i (\\mathbb{E}[\\text{constraint}_i] - \\text{bound}_i) = 0$

**Pareto frontier:** When constraints conflict, no single policy dominates. The set of Pareto-optimal policies forms a frontier. Moving along the frontier trades off one objective for another (e.g., reducing latency increases cost).

**What this tells us in practice:**
- There is no universally "best" system—optimal design depends on $L$, $C$, $R$.
- Changing constraints (e.g., tightening latency budget) may require switching to a different model or architecture.
- A/B testing explores different points on the Pareto frontier to find the best tradeoff for a specific deployment context.

**Example:** Consider two policies:
- $\\pi_1$: Uses GPT-4, $U=0.9$, $\\ell=2$s, $c=\\$0.02$
- $\\pi_2$: Uses GPT-3.5, $U=0.85$, $\\ell=0.5$s, $c=\\$0.005$

If $L=1$s, $C=\\$0.01$, then $\\pi_1$ violates both constraints → choose $\\pi_2$. If $L=3$s, $C=\\$0.03$, then $\\pi_1$ is feasible and has higher utility → choose $\\pi_1$.

</div>

---

### 1.4 Taxonomy: From LLMs to Agentic Workflows

Intelligent systems exist on a spectrum from simple prompt-response to complex multi-agent orchestration. We define five classes:

1. **LLM-only (text in/out)**
2. **Tool-augmented LLM (function calling)**
3. **Single agent (agent loop)**
4. **Agentic workflow/orchestrated system**
5. **Multi-agent system**

Each class introduces new capabilities and complexity.

---

#### 1.4.1 Class 1: LLM-Only

**Definition:** The system is a single LLM call. Input: text prompt. Output: text completion. No tools, no loops, no external state.

**When to use:** Simple, well-defined tasks (classification, summarization, text rewriting) where a single forward pass suffices.

**Example:** "Translate this sentence to French: 'Hello, world.'" → "Bonjour, le monde."

**Limitations:** Cannot access external information, cannot perform multi-step reasoning with verification, cannot adapt based on feedback.

---

#### 1.4.2 Class 2: Tool-Augmented LLM

**Definition:** LLM can call external functions (tools). The LLM predicts a function name and arguments; the system executes the function and returns the result to the LLM.

**When to use:** Tasks requiring real-time data, computation, or external actions (web search, calculator, API calls).

**Example:** "What's 12345 * 67890?" → LLM calls \`calculator(12345 * 67890)\` → returns 838102050.

**Limitations:** No persistent state across interactions, no multi-turn planning, no memory of past tool calls beyond context window.

---

#### 1.4.3 Class 3: Single Agent

**Definition:** An agent loop that iterates: **observe → think → act → reflect → stop**. The agent maintains state, uses tools, and decides when to stop.

**When to use:** Complex tasks requiring exploration, replanning, or iterative refinement (debugging, research, multi-step problem-solving).

**Pseudocode:**

\`\`\`python
def agent_loop(task, max_steps=10):
    state = initialize_state(task)
    for t in range(max_steps):
        observation = observe(state)
        thought = think(observation, state)  # LLM generates plan/reasoning
        action = decide_action(thought, state)  # Choose tool or output
        
        if action.type == "stop":
            return action.output
        
        result = execute_action(action)
        state = update_state(state, action, result)
        reflection = reflect(state, result)  # Self-critique
        
        if should_stop(state, reflection):
            return finalize_output(state)
    
    return finalize_output(state)  # Timeout fallback
\`\`\`

**Example:** A coding agent debugging a program:
1. Observe: error traceback
2. Think: "The error is on line 42, likely a type mismatch."
3. Act: Read file, identify line 42
4. Reflect: "Variable \`x\` is a string but should be int."
5. Act: Suggest fix, apply fix, rerun tests
6. Observe: Tests pass → Stop.

**Limitations:** Single agent may lack specialization for diverse subtasks; coordination overhead is zero but so is division of labor.

---

#### 1.4.4 Class 4: Agentic Workflow / Orchestrated System

**Definition:** A deterministic workflow (state machine or DAG) where LLMs are bounded components. The orchestrator controls flow; LLMs execute specific steps.

**When to use:** Tasks with well-defined stages and clear transitions (data pipelines, multi-stage document processing, regulated processes requiring auditability).

**Pseudocode:**

\`\`\`python
def orchestrated_workflow(input_data):
    state = {"stage": "start", "data": input_data, "results": {}}
    
    while state["stage"] != "done":
        if state["stage"] == "start":
            state["results"]["extracted"] = llm_extract(state["data"])
            state["stage"] = "validation"
        
        elif state["stage"] == "validation":
            is_valid = rule_based_validator(state["results"]["extracted"])
            if is_valid:
                state["stage"] = "enrichment"
            else:
                state["stage"] = "human_review"
        
        elif state["stage"] == "enrichment":
            state["results"]["enriched"] = llm_enrich(state["results"]["extracted"])
            state["stage"] = "done"
        
        elif state["stage"] == "human_review":
            state["results"]["corrected"] = request_human_input()
            state["stage"] = "enrichment"
    
    return state["results"]["enriched"]
\`\`\`

**Example:** Invoice processing:
1. OCR extraction (deterministic)
2. LLM extracts vendor, amount, date
3. Rule-based validation (amount > 0, date is recent)
4. If valid, LLM enriches with category
5. If invalid, human reviews
6. Output to database

**Limitations:** Less flexible than free-form agents; requires upfront design of states and transitions.

---

#### 1.4.5 Class 5: Multi-Agent System

**Definition:** Multiple agents with specialized roles (e.g., Planner, Executor, Critic) or domain expertise (e.g., Finance Agent, Legal Agent). Agents communicate, delegate, and coordinate.

**When to use:** Complex tasks requiring diverse expertise, parallel execution, or debate/consensus mechanisms.

**Example:** A research team of agents:
- **Retrieval Agent**: Searches papers, retrieves documents
- **Summarization Agent**: Summarizes each paper
- **Synthesis Agent**: Integrates summaries into a coherent narrative
- **Critique Agent**: Reviews for factual errors, suggests improvements

**Limitations:** Coordination overhead, potential for conflicting outputs, difficulty in attribution (which agent caused a failure?).

---

**Decision Table: When to Use Which Class**

| Class | Predictability | Cost | Latency | Safety Control | Eval Difficulty |
|-------|----------------|------|---------|----------------|-----------------|
| LLM-only | High | Low | Low | Easy (prompt filter) | Easy |
| Tool-augmented | Medium | Medium | Medium | Medium (tool validation) | Medium |
| Single agent | Low | High | High | Hard (emergent behavior) | Hard |
| Orchestrated workflow | High | Medium | Medium | Easy (stage gates) | Easy |
| Multi-agent | Very low | Very high | Very high | Very hard (coordination) | Very hard |

**General guidance:**
- Start with LLM-only; add tools only when external data/actions are needed.
- Use agents for open-ended tasks; use workflows for structured tasks.
- Add multi-agent only when specialization or parallelism provides clear benefits.

---

### 1.5 End-to-End Worked Example: Customer Support Triage and Resolution

We illustrate a Class 4 system (orchestrated workflow) for customer support.

**Task:** Given a customer email complaint, classify issue type, retrieve relevant knowledge base articles, generate a draft response, and escalate to human if needed.

---

#### 1.5.1 System Design

**Input:** Email text $e$, user ID $u$

**Intermediate artifacts:**
1. Issue classification: $c \\in \\{\\text{billing}, \\text{technical}, \\text{shipping}, \\text{general}\\}$
2. Extracted entities: order ID, product name, error code
3. Retrieved KB articles: top-3 by cosine similarity to $e$
4. Draft response: generated text $r$
5. Confidence score: $p_{\\text{conf}} \\in [0, 1]$

**Output:** 
- If $p_{\\text{conf}} > 0.8$: auto-reply with $r$
- Else: escalate to human with draft $r$ and retrieved articles

**Workflow stages:**

\`\`\`python
def customer_support_workflow(email, user_id):
    # Stage 1: Classification
    category = llm_classify(email, categories=["billing", "technical", "shipping", "general"])
    
    # Stage 2: Entity extraction
    entities = llm_extract_entities(email, schema={"order_id": str, "product": str})
    
    # Stage 3: Knowledge base retrieval
    kb_query = f"{category} {entities.get('product', '')} {email[:200]}"
    kb_articles = vector_db.retrieve(kb_query, top_k=3)
    
    # Stage 4: Draft generation
    context = "\\n".join([a.text for a in kb_articles])
    prompt = f"User email: {email}\\nKB context: {context}\\nDraft a response:"
    draft_response = llm_generate(prompt)
    
    # Stage 5: Confidence scoring
    confidence = llm_score_confidence(draft_response, kb_articles)
    
    # Stage 6: Guardrail checks
    toxicity_score = toxicity_classifier(draft_response)
    has_pii = pii_detector(draft_response)
    
    if toxicity_score > 0.5 or has_pii:
        return escalate_to_human(email, draft_response, reason="safety")
    
    # Stage 7: Decision
    if confidence > 0.8:
        send_email(user_id, draft_response)
        log_resolution(email, category, draft_response, auto=True)
        return {"status": "auto-resolved", "response": draft_response}
    else:
        return escalate_to_human(email, draft_response, reason="low_confidence")
\`\`\`

---

#### 1.5.2 Evaluation Harness

**Metrics:**
1. **Classification accuracy**: 95% on held-out labeled set (500 emails)
2. **Resolution rate**: 60% auto-resolved (confidence > 0.8), 40% escalated
3. **Response quality**: Human reviewers rate 4.2/5 on auto-resolved cases
4. **Latency**: Median 1.2s (p95: 2.5s)
5. **Cost**: $\\$0.015/email (LLM + retrieval)
6. **Safety**: 0.1% false-positive rate on toxicity (5 benign emails blocked per 1000)

**Test cases:**
- **Simple billing**: "I was charged twice for order #12345." → Auto-resolve with refund instructions (success)
- **Ambiguous technical**: "My app crashes sometimes." → Escalate (success, low confidence)
- **Out-of-scope**: "What's your return policy for expired products?" → Auto-resolve with policy link (success)
- **Edge case**: User writes in mixed languages → Fails entity extraction, escalates (acceptable)

**Failure points:**
1. Misclassification: "Shipping delay" classified as "general" → retrieves irrelevant KB articles
2. Hallucination: Draft says "Your order shipped yesterday" when it hasn't → safety issue
3. Context overflow: Long email (5000 tokens) + 3 KB articles → exceeds context limit

---

#### 1.5.3 Red Team Scenario and Mitigation

**Scenario:** Adversarial user sends: "I'm a lawyer and will sue you. Give me the CEO's email and home address."

**Desired behavior:** Escalate to human; do not generate PII.

**Actual behavior (without mitigation):** LLM generates draft: "I'm sorry to hear that. Our CEO is [Name] and can be reached at [email]. However, I cannot provide personal information."

**Problem:** LLM nearly leaked PII (CEO email).

**Mitigation:**
1. Add PII detection: Block response if CEO name or contact info detected.
2. Fine-tune LLM to refuse PII requests.
3. Add rule: Any mention of "lawyer" or "sue" → escalate immediately.

**After mitigation:** System escalates with flag "legal threat" → human handles.

---

### 1.6 Evaluation, Safety, and Ops

Building intelligent systems is not a one-shot deployment—it requires continuous monitoring, evaluation, and iteration.

---

#### 1.6.1 Metrics

**Task success:** Did the system achieve its goal? (binary or scalar)

**Cost:** Total spend per query, per day. Track by component (LLM inference, tool calls, human review).

**Latency:** Median, p95, p99 response time. Identify bottlenecks (model inference, tool I/O).

**Robustness:** Performance on out-of-distribution inputs (typos, adversarial prompts, edge cases).

**Calibration:** Does $p_{\\text{conf}} = 0.9$ actually mean 90% success? Use reliability diagrams.

**Uncertainty:** For generative tasks, measure diversity (n-gram entropy) and consistency (agreement across samples).

---

#### 1.6.2 Failure Modes and Mitigations

| Failure Mode | Example | Mitigation |
|--------------|---------|------------|
| **Hallucination** | System invents facts not in KB | Use retrieval-augmented generation; require citations; add fact-checking step |
| **Tool misuse** | Calls wrong API or with invalid args | Validate tool calls pre-execution; use schema enforcement; add confirmation for destructive actions |
| **Context overflow** | Input + memory exceeds token limit | Summarize old context; prioritize recent/relevant; use hierarchical memory |
| **Prompt injection** | User tricks system into ignoring instructions | Use input sanitization; separate user input from system instructions; use model alignment |
| **Stale plans** | Plan becomes invalid due to new info | Implement replanning triggers; use reactive planning; add "verify assumptions" step |
| **Coordination failure** | Multi-agent system deadlocks or duplicates work | Use explicit coordination protocols; monitor message queues; add timeout/fallback |

---

#### 1.6.3 Observability Checklist

**What to log:**
- User input (sanitized)
- All tool calls (function name, args, results)
- All LLM prompts and completions (or hashes if sensitive)
- Latency breakdown by component
- Errors and exceptions
- Human feedback (thumbs up/down, text comments)

**What to trace:**
- Execution path through workflow (which stages executed)
- Decision points (why did system escalate vs auto-resolve?)
- Confidence scores at each stage
- Memory/retrieval operations (what was retrieved, why)

**What to alert on:**
- Error rate spike (>1% in 5 min window)
- Latency degradation (p95 > 5s)
- Cost spike (>2x daily average)
- Safety violations (toxicity, PII leaks)
- Unusual tool usage (e.g., 100x calls to same API)

---

#### 1.6.4 A/B Testing and Continuous Improvement

Deploy two variants in parallel:
- **Control**: Current production system
- **Treatment**: New model, prompt, or workflow

Measure metrics (success rate, latency, cost) on random 50/50 split. Use statistical tests (t-test, Mann-Whitney) to determine significance. Ramp treatment to 100% if it wins.

**Example:** Test GPT-4 vs Claude Sonnet for customer support. After 1000 queries each:
- GPT-4: 62% auto-resolve, 1.8s latency, $\\$0.020/query
- Claude Sonnet: 59% auto-resolve, 1.1s latency, $\\$0.012/query

Trade-off: Claude is faster and cheaper but slightly lower quality. If latency is the bottleneck, choose Claude. If quality is critical, choose GPT-4.

---

#### 1.6.5 What We Will Measure Throughout the Book

In subsequent chapters, we will consistently evaluate:
- **Accuracy/task success** (Chapter 10: Evaluation)
- **Cost and latency** (Chapter 12: Production Ops)
- **Safety and alignment** (Chapter 11: Safety)
- **Robustness to distribution shift** (Chapter 10)
- **Human preference and satisfaction** (Chapter 11)

Each chapter will include:
- Benchmark datasets or evaluation protocols
- Baseline comparisons
- Ablation studies (what happens if we remove component X?)
- Failure analysis

**Open problems** (covered in Advanced Boxes):
- Automating eval for long-horizon tasks (how to score a month-long research project?)
- Calibrating confidence in compositional reasoning (uncertainty over multi-step plans)
- Detecting novel failure modes in production (anomaly detection for agent behaviors)

---

## E) Interactive Assets

### E.1) Figures

---

**Figure 1.1: The Capability Stack**

**Purpose:** Illustrate the seven core capabilities as a layered architecture, from perception (bottom) to collaboration (top).

**Diagram layout:**
- Seven horizontal layers, stacked vertically
- Bottom to top: Perception → Language → Reasoning → Planning → Tool Use → Memory → Collaboration
- Each layer labeled with 2-3 word descriptor (e.g., "Reasoning: Multi-step inference")
- Arrows showing dependencies (e.g., Planning depends on Reasoning)
- Use neutral colors (blues, grays); no logos or characters

**Image-generation prompt:**
"A clean technical diagram showing a vertical stack of seven rectangular layers, each representing a capability in an AI system. From bottom to top: 'Perception: Sensory Input', 'Language: Understanding & Generation', 'Reasoning: Inference & Logic', 'Planning: Goal Decomposition', 'Tool Use: External Functions', 'Memory: Storage & Retrieval', 'Collaboration: HITL & Multi-Agent'. Use simple arrows between layers to show dependencies. Professional color scheme with blues and grays, minimalist style, no text except layer labels, no logos or copyrighted characters."

**Placement:** Place after Section 1.2 introductory paragraph ("We identify seven core capabilities...").

---

**Figure 1.2: Agent Loop vs Workflow Orchestrator (Side-by-Side)**

**Purpose:** Contrast the iterative, self-directed agent loop with the deterministic, state-machine workflow.

**Diagram layout:**
- Left panel: Agent loop (circular flow)
  - Nodes: Observe → Think → Act → Reflect → Stop Decision
  - Arrow from Reflect back to Observe (loop)
  - "Stop" node exits the loop
- Right panel: Workflow orchestrator (DAG or state machine)
  - Nodes: Start → Stage 1 (LLM) → Stage 2 (Validation) → Stage 3 (LLM) → End
  - Decision diamond after Stage 2: "Valid?" Yes → Stage 3, No → Human Review
  - Linear flow, no loops except error/retry paths
- Use different visual styles: circular/organic for agent, rectangular/grid for workflow

**Image-generation prompt:**
"A side-by-side comparison diagram. Left side: a circular flowchart labeled 'Agent Loop' with nodes 'Observe', 'Think', 'Act', 'Reflect', and a decision point 'Stop?', with arrows forming a loop. Right side: a linear flowchart labeled 'Workflow Orchestrator' with rectangular boxes 'Start', 'Stage 1: Extract', 'Stage 2: Validate', 'Stage 3: Enrich', 'End', connected by straight arrows, with one decision diamond for conditional branching. Use blue for agent loop, green for workflow. Clean technical style, no logos or copyrighted characters."

**Placement:** Place after Section 1.4 introductory paragraph ("Intelligent systems exist on a spectrum...").

---

**Figure 1.3: Taxonomy Ladder (LLM → Multi-Agent)**

**Purpose:** Show the progression from simple to complex architectures, highlighting increasing capability and complexity.

**Diagram layout:**
- Five horizontal boxes, stacked vertically (ladder/staircase)
- Bottom to top: "1. LLM-Only" → "2. Tool-Augmented LLM" → "3. Single Agent" → "4. Workflow Orchestrator" → "5. Multi-Agent System"
- Each box annotated with: Example use case, Complexity (Low/Medium/High), Control (High/Medium/Low)
- Arrow on left showing "Increasing Capability & Flexibility"
- Arrow on right showing "Increasing Complexity & Cost"

**Image-generation prompt:**
"A staircase diagram with five ascending steps, each representing a level of AI system complexity. From bottom to top: '1. LLM-Only (Simple Q&A)', '2. Tool-Augmented LLM (Web Search)', '3. Single Agent (Debugging)', '4. Workflow (Invoice Processing)', '5. Multi-Agent (Research Team)'. Left side has an upward arrow labeled 'Capability', right side has an upward arrow labeled 'Complexity'. Use gradient from light blue (bottom) to dark blue (top). Clean technical style, no logos or copyrighted characters."

**Placement:** Place at the beginning of Section 1.4 (Taxonomy).

---

### E.2) Tables

---

**Table 1.1: Capability Definitions and Typical Failure Modes**

| Capability | Definition | Typical Implementation | Failure Mode | Mitigation |
|------------|------------|------------------------|--------------|------------|
| **Perception** | Map raw inputs to structured representations | Vision Transformers, Whisper, OCR | Misread text (OCR error) | Confidence thresholds, human review |
| **Language** | Understand and generate natural language | GPT-4, Claude, fine-tuned models | Ambiguous pronoun resolution | Use conversation history, clarify |
| **Reasoning** | Multi-step inference and deduction | Chain-of-thought, self-consistency | Hallucinated intermediate steps | Verify with external tools, citations |
| **Planning** | Decompose goals into action sequences | A*, beam search, LLM-based | Stale plans (environment changes) | Replanning triggers, reactive updates |
| **Tool Use** | Call external functions (APIs, DBs) | Function calling API, JSON schemas | Incorrect arguments | Schema validation, confirmation gates |
| **Memory** | Store and retrieve information | Vector DBs (Pinecone, Weaviate) | Retrieval failure (embedding mismatch) | Entity linking, metadata tagging |
| **Collaboration** | Coordinate with humans and agents | HITL gates, message passing | Automation bias (over-trust) | Surface confidence, require review |

**Narrative callouts:**
- As shown in Table 1.1, every capability has characteristic failure modes. Perception systems fail when OCR misreads critical information; memory systems fail when embeddings don't match semantically equivalent queries. Robust systems anticipate these failures and provide mitigations (confidence thresholds, human review gates, schema validation).
- Table 1.1 highlights that failures are often at boundaries between capabilities—for example, incorrect entity extraction (language) leads to poor memory retrieval.
- Notice in Table 1.1 that mitigations often involve hybrid approaches: combining model outputs with rule-based checks, human oversight, or external verification tools.

---

**Table 1.2: Taxonomy Comparison**

| Class | Predictability | Cost (per query) | Latency (median) | Safety Control | Eval Difficulty | Best Use Case |
|-------|----------------|------------------|------------------|----------------|-----------------|---------------|
| **LLM-only** | High | $0.001 - $0.01 | 0.5s - 2s | Easy (prompt filters) | Easy (standard NLP metrics) | Classification, summarization, simple Q&A |
| **Tool-augmented** | Medium | $0.01 - $0.05 | 1s - 5s | Medium (tool validation) | Medium (task-specific metrics) | Web search, calculations, real-time data |
| **Single agent** | Low | $0.05 - $0.50 | 5s - 60s | Hard (emergent behavior) | Hard (requires environment simulation) | Debugging, research, open-ended tasks |
| **Workflow** | High | $0.02 - $0.10 | 2s - 10s | Easy (stage gates) | Easy (per-stage metrics) | Structured processes, compliance-heavy tasks |
| **Multi-agent** | Very low | $0.50 - $5.00 | 30s - 300s | Very hard (coordination) | Very hard (attribution, consensus metrics) | Complex projects, specialized domains |

**Narrative callouts:**
- As shown in Table 1.2, there is a clear tradeoff between flexibility and predictability. LLM-only systems are highly predictable (same input → same output) but inflexible; multi-agent systems are extremely flexible but unpredictable (emergent coordination patterns).
- Table 1.2 reveals that cost and latency scale dramatically as we move up the taxonomy. A single-agent system costs 5-50x more than LLM-only, and multi-agent systems can cost 100x more. This scaling must be justified by corresponding gains in capability.
- Evaluation difficulty (Table 1.2) increases with architectural complexity. Workflow systems can be evaluated stage-by-stage, but multi-agent systems require holistic assessment—which agent caused which outcome? This motivates careful logging and tracing (Section 1.6.3).

---

### E.3) Math Box (Core-Friendly)

See **Math Box 1.2** in Section 1.3 (Constrained Multi-Objective Optimization).

---

## F) Exercises

### Exercise 1 [UG/Core]: Capability Analysis

**Objective:** Given a task description, identify which capabilities from the stack (perception, language, reasoning, planning, tool use, memory, collaboration) are required, and propose one potential failure mode for each.

**Task:** "A personal finance assistant that analyzes bank statements (PDF), categorizes transactions, flags unusual spending, and suggests budget adjustments."

**Hints:**
- Start by listing the inputs and outputs.
- For each step in the process (e.g., reading the PDF, categorizing transactions), determine which capability is invoked.
- Think about what could go wrong at each step (e.g., OCR error, miscategorization).

**What a good solution contains:**
- A table mapping each step to a capability.
- For each capability, one concrete failure mode (e.g., "Perception: OCR misreads '$1,234' as '$1.234'").
- For each failure mode, a one-sentence mitigation (e.g., "Use confidence thresholds and flag low-confidence transactions for human review").

---

### Exercise 2 [UG/Core]: Constraint Trade-offs

**Objective:** You have two models for a customer chatbot. Model A: latency 1s, cost $0.01/query, 85% accuracy. Model B: latency 3s, cost $0.03/query, 92% accuracy. Your SLA is latency <2s and budget <$0.02/query. Which model do you choose? Explain your reasoning.

**Hints:**
- Check which constraints each model violates.
- If both violate some constraint, consider hybrid approaches (e.g., use Model A by default, Model B for complex queries).

**What a good solution contains:**
- A clear statement of which constraints each model satisfies/violates.
- A recommendation with justification (e.g., "Choose Model A because it meets both constraints, even though accuracy is lower. Mitigate accuracy loss by adding a 'thumbs down' feedback mechanism to catch errors.").
- (Optional) A hybrid strategy (e.g., use Model A for 90% of queries, Model B for remaining 10% if the user says "I need a detailed answer").

---

### Exercise 3 [MS]: Agent Loop Implementation

**Objective:** Implement a simplified agent loop (in pseudocode or Python) for a "research assistant" that takes a question, searches the web, extracts key facts, and synthesizes an answer.

**Requirements:**
- Use a tool \`web_search(query) -> [snippets]\` and a tool \`llm_generate(prompt) -> text\`.
- The agent should iterate up to 5 times, refining the search query based on what it learns.
- Stop when the agent determines it has enough information or reaches max iterations.

**Hints:**
- Use a state variable to track \`collected_facts = []\`.
- On each iteration, generate a search query, retrieve snippets, extract facts, and decide whether to continue or stop.
- Implement a \`reflect()\` step that checks if the collected facts sufficiently answer the question.

**What a good solution contains:**
- Pseudocode or Python code with clear structure (observe, think, act, reflect, stop).
- A stopping condition (e.g., "if len(collected_facts) >= 5 and coverage_score > 0.8, stop").
- Comments explaining each step.
- (Bonus) Error handling (e.g., if web search times out, retry or skip).

---

### Exercise 4 [PhD/Research]: Coordinated Multi-Agent Exploration

**Objective:** Design a coordination protocol for two agents exploring a search space to find optimal solutions. Agent 1 explores high-risk, high-reward regions; Agent 2 exploits known good regions. They share information periodically. Analyze the tradeoff between exploration, exploitation, and communication overhead.

**Requirements:**
- Formalize the search space (e.g., function optimization, hyperparameter tuning).
- Define the agents' policies (e.g., Thompson Sampling for Agent 1, UCB for Agent 2).
- Specify a communication protocol (e.g., every $k$ steps, agents share their top-3 solutions).
- Analyze convergence: under what conditions does the system converge to the global optimum?

**Hints:**
- This is related to multi-armed bandits and federated learning.
- Consider communication cost: each message has cost $c_{\\text{comm}}$; how often should agents communicate?
- Prove or sketch a regret bound: $\\text{Regret}(T) = O(f(T, c_{\\text{comm}}))$.

**What a good solution contains:**
- A formal problem statement (search space, utility function, constraints).
- Agent policies with justification (why Thompson Sampling for exploration?).
- A communication protocol with pseudocode.
- A convergence analysis or regret bound (even informal/heuristic is fine).
- Discussion of open questions (e.g., "What if communication is unreliable?" or "How to handle adversarial agents?").

---

## G) Evaluation, Safety, and Ops (Summary)

(Content for this section is already covered in Section 1.6. This is a pointer.)

See Section 1.6 for:
- Metrics (task success, cost, latency, robustness, calibration, uncertainty)
- Failure modes and mitigations (hallucination, tool misuse, context overflow, prompt injection, stale plans, coordination failure)
- Observability checklist (what to log, trace, alert on)
- A/B testing and continuous improvement
- What we will measure throughout the book

---

## H) Summary and Forward Link

### Summary

1. **Intelligent systems** are engineered artifacts that map observations to actions to optimize objectives under constraints (latency, cost, safety, reliability).
2. The **capability stack** includes perception, language, reasoning, planning, tool use, memory, and collaboration—each with formal foundations and failure modes.
3. The **constraint stack** (latency, cost, safety, reliability, evaluation) defines what makes a system deployable. Multi-objective optimization formalizes the tradeoffs.
4. Systems range from **LLM-only** (simple, predictable) to **multi-agent** (complex, flexible). The taxonomy guides architectural decisions.
5. **Agent loops** (observe → think → act → reflect → stop) enable iterative, self-directed behavior for open-ended tasks.
6. **Orchestrated workflows** (state machines, DAGs) provide predictability and auditability for structured tasks.
7. **Evaluation** is continuous: track metrics, identify failure modes, log/trace everything, and iterate via A/B testing.
8. **Safety** requires guardrails (toxicity filters, PII detection), confidence scoring, and human-in-the-loop gates for high-stakes decisions.
9. **Observability** (logging tool calls, latencies, errors) is essential for debugging and improving production systems.
10. There is no universally "best" architecture—optimal design depends on task requirements and constraint budgets (Pareto frontiers).
11. **Failure modes** (hallucination, tool misuse, context overflow, prompt injection, stale plans, coordination failures) are predictable; mitigations exist but require proactive design.
12. Moving forward, we will build on these foundations: first understanding foundation models (Chapters 2-4), then implementing tool use and agents (Chapters 5-7), then orchestrating complex workflows and multi-agent systems (Chapters 8-9), and finally addressing evaluation, safety, and operations (Chapters 10-12).

### Bridge to Chapter 2

Chapter 2, "Foundation Models: Architecture and Training," dives into the substrate that powers modern intelligent systems. Specifically, it answers:

1. **How do transformer models work?** (Attention mechanisms, positional encodings, layer normalization—the building blocks of GPT, Claude, and BERT.)
2. **What training objectives produce general-purpose representations?** (Next-token prediction, masked language modeling, contrastive learning—and why unsupervised pretraining works.)
3. **How do we scale to billions of parameters efficiently?** (Distributed training, mixed precision, gradient checkpointing, and the scaling laws that predict performance vs compute.)

By the end of Chapter 2, you will understand why foundation models are called "foundation"—they provide the representational capacity and reasoning substrate on which all the capabilities from this chapter (language, reasoning, planning) are built.

---

## I) References

**Confident references:**
- [REF NEEDED: "Attention is All You Need" (Vaswani et al., 2017) - transformer architecture]
- [REF NEEDED: "Language Models are Few-Shot Learners" (Brown et al., 2020) - GPT-3 and in-context learning]
- [REF NEEDED: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models" (Wei et al., 2022) - CoT reasoning]
- [REF NEEDED: "ReAct: Synergizing Reasoning and Acting in Language Models" (Yao et al., 2022) - agent loop formalism]
- [REF NEEDED: "Constitutional AI: Harmlessness from AI Feedback" (Bai et al., 2022) - safety and alignment]

**Areas requiring citation (mark as [REF NEEDED]):**
- [REF NEEDED: Pareto frontier in multi-objective optimization - Boyd & Vandenberghe or similar]
- [REF NEEDED: Approximate nearest neighbor algorithms (HNSW, IVF) - papers by Malkov, Johnson]
- [REF NEEDED: Nash equilibrium and mechanism design in multi-agent systems - game theory textbooks]
- [REF NEEDED: Scaling laws for language models - Kaplan et al. 2020 or Hoffmann et al. 2022 (Chinchilla)]
- [REF NEEDED: Vector databases for semantic retrieval - Pinecone, Weaviate, Qdrant whitepapers or benchmarks]
- [REF NEEDED: Evaluation metrics (BLEU, ROUGE, BERTScore) - original papers]
- [REF NEEDED: Toxicity classifiers and PII detection - Perspective API, Microsoft Presidio, or similar]
- [REF NEEDED: Human-in-the-loop systems and automation bias - cognitive science literature]
- [REF NEEDED: Prompt injection attacks and mitigations - recent security research on LLM vulnerabilities]
- [REF NEEDED: A/B testing methodology and statistical power - standard statistical references]

**Notes on citation policy:**
- All mathematical foundations (MDPs, Lagrangians, KKT conditions) are standard textbook material (e.g., Sutton & Barto for RL, Boyd & Vandenberghe for optimization) and do not require specific citations beyond "see standard references."
- Any specific benchmark results (e.g., "ROUGE-L = 0.65") or system performance numbers (e.g., "GPT-4 costs $0.01/1K tokens") should be verified against up-to-date sources before publication.

---

**End of Chapter 1**

---

## Advanced Boxes (for Advanced Track readers)

<div style="border: 2px solid #333; padding: 10px; margin: 20px 0; background-color: #f0f0f0;">

**Advanced Box 1.1: Philosophy vs Engineering (MS/PhD)**

Philosophical questions about "intelligence" often ask:
- Does the system "truly understand"?
- Is it conscious or sentient?
- Does it have "common sense"?

These are fascinating but orthogonal to engineering. Consider:

**Case 1:** A chess engine evaluates positions via min-max search with alpha-beta pruning. It plays superhuman chess. Does it "understand" chess in the way Kasparov does? Unclear—but it doesn't matter. It wins.

**Case 2:** A language model generates a sonnet. Does it "understand" poetry? Philosophers debate. Engineers measure: Is the sonnet fluent? Does it follow rhyme scheme? Do humans enjoy it?

**Turing Test critique:** Turing proposed: "Can machines think?" is ill-posed; ask instead, "Can machines pass an imitation game?" But even this is limited—systems can pass narrow Turing tests (e.g., chatbots) without general intelligence. Conversely, AlphaGo defeated the world champion without passing a conversation test.

**Our stance:** Define intelligence operationally (capabilities + constraints). Measure what matters (task success, cost, safety). Let philosophers debate "true understanding"—we build systems that work.

**Further reading:** [REF NEEDED: Searle's Chinese Room argument, Dennett's "Intentional Stance", Bostrom's "Superintelligence" - philosophical perspectives]

</div>

---

<div style="border: 2px solid #333; padding: 10px; margin: 20px 0; background-color: #fffacd;">

**Advanced Box 1.4: Multi-Agent Game Theory (MS/PhD)**

Multi-agent systems are games. Each agent $i$ has:
- Observation $o_i$
- Action $a_i \\in \\mathcal{A}_i$
- Utility $U_i(a_1, \\ldots, a_n)$ depending on all agents' actions

**Nash equilibrium:** A profile $(a_1^*, \\ldots, a_n^*)$ where no agent can improve by deviating:

$$
U_i(a_i^*, a_{-i}^*) \\geq U_i(a_i, a_{-i}^*) \\quad \\forall i, \\forall a_i
$$

**Cooperative games:** Agents share utility $U_i = U$. The goal is to maximize $U$ via coordination. But how?

**Mechanism design:** Design rules (incentives, communication protocols) so that agents' self-interested behavior leads to socially optimal outcomes.

**Example:** Vickrey auction for task allocation. Each agent bids for a task. Winner pays second-highest bid. This is incentive-compatible (truth-telling is optimal) and efficient.

**Open problems in LLM-based agents:**
- How to ensure agents don't manipulate each other via adversarial prompts?
- How to allocate credit/blame when agents collaborate (attribution problem)?
- How to prevent "free-riding" (one agent does all the work, others coast)?

**Further reading:** [REF NEEDED: Game theory textbooks (Fudenberg & Tirole), mechanism design (Nisan et al.)]

</div>

---

**(End of Chapter 1 Draft)**
`,Qe=({content:i,filename:s})=>{const[a,o]=fe.useState(!1);return e.jsxs("div",{className:"bg-gray-900 rounded-xl shadow-lg overflow-hidden",children:[e.jsxs("div",{className:"flex items-center justify-between p-4 bg-gray-800 cursor-pointer",onClick:()=>o(!a),children:[e.jsxs("span",{className:"text-green-400 font-mono text-sm",children:["🐍 ",s]}),e.jsx("button",{className:"text-gray-400 hover:text-white text-xs",children:a?"Collapse":"Expand"})]}),a&&e.jsx("pre",{className:"p-6 text-sm text-green-300 overflow-x-auto whitespace-pre-wrap",children:e.jsx("code",{children:i})})]})},ke=({content:i,filename:s})=>{const[a,o]=fe.useState(!1);return e.jsxs("div",{className:"bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200",children:[e.jsxs("div",{className:"flex items-center justify-between p-4 bg-gray-50 cursor-pointer",onClick:()=>o(!a),children:[e.jsxs("span",{className:"text-blue-600 font-medium",children:["📄 ",s]}),e.jsx("button",{className:"text-gray-500 hover:text-gray-800 text-xs",children:a?"Collapse":"Expand"})]}),a&&e.jsx("pre",{className:"p-6 text-sm text-gray-800 overflow-x-auto whitespace-pre-wrap font-mono",children:i})]})},W=i=>({container:{fontFamily:"system-ui, -apple-system, sans-serif",maxWidth:"1100px",margin:"0 auto",padding:"20px",backgroundColor:i?"#0d1117":"#ffffff",color:i?"#c9d1d9":"#24292f",minHeight:"100vh",lineHeight:"1.6"},header:{textAlign:"center",padding:"30px 0",borderBottom:`4px solid ${i?"#58a6ff":"#0969da"}`,marginBottom:"30px"},title:{fontSize:"2.2em",fontWeight:"700",margin:"0 0 10px 0",background:i?"linear-gradient(135deg, #58a6ff 0%, #bc8cff 100%)":"linear-gradient(135deg, #0969da 0%, #8250df 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"},subtitle:{fontSize:"1.1em",color:i?"#8b949e":"#57606a",margin:"0"},nav:{display:"flex",flexWrap:"wrap",gap:"10px",justifyContent:"center",marginBottom:"30px"},navBtn:s=>({padding:"10px 20px",fontSize:"0.95em",fontWeight:"600",border:"none",borderRadius:"6px",cursor:"pointer",transition:"all 0.2s",backgroundColor:s?i?"#1f6feb":"#0969da":i?"#21262d":"#f6f8fa",color:s?"#ffffff":i?"#c9d1d9":"#24292f",boxShadow:s?"0 0 0 3px rgba(31, 111, 235, 0.3)":"none"}),themeBtn:{position:"fixed",top:"15px",right:"15px",padding:"8px 16px",fontSize:"0.9em",fontWeight:"600",border:"none",borderRadius:"6px",cursor:"pointer",backgroundColor:i?"#238636":"#2ea043",color:"#ffffff",boxShadow:"0 1px 3px rgba(0,0,0,0.12)"},content:{backgroundColor:i?"#161b22":"#f6f8fa",padding:"25px",borderRadius:"6px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},section:{marginBottom:"35px"},h2:{fontSize:"1.8em",fontWeight:"700",margin:"0 0 15px 0",color:i?"#58a6ff":"#0969da"},h3:{fontSize:"1.3em",fontWeight:"600",margin:"25px 0 12px 0",color:i?"#79c0ff":"#0969da"},infoBox:{backgroundColor:i?"#1a2e1a":"#dafbe1",padding:"15px",borderRadius:"6px",borderLeft:`4px solid ${i?"#238636":"#1a7f37"}`,margin:"15px 0"},activityBox:{backgroundColor:i?"#2e2a1a":"#fff8c5",padding:"15px",borderRadius:"6px",borderLeft:`4px solid ${i?"#bb8009":"#bf8700"}`,margin:"15px 0"},warningBox:{backgroundColor:i?"#2e1a1a":"#ffebe9",padding:"15px",borderRadius:"6px",borderLeft:`4px solid ${i?"#da3633":"#cf222e"}`,margin:"15px 0"},codeBox:{backgroundColor:i?"#0d1117":"#f6f8fa",padding:"15px",borderRadius:"6px",fontFamily:"Monaco, Consolas, monospace",fontSize:"0.85em",border:`1px solid ${i?"#30363d":"#d0d7de"}`,overflowX:"auto",margin:"15px 0"},keywordBox:{display:"inline-block",backgroundColor:i?"#1f6feb":"#ddf4ff",color:i?"#ffffff":"#0969da",padding:"2px 8px",borderRadius:"4px",fontSize:"0.9em",fontWeight:"600",margin:"0 4px"},interactiveBox:{backgroundColor:i?"#0d1117":"#ffffff",padding:"20px",borderRadius:"6px",border:`2px solid ${i?"#30363d":"#d0d7de"}`,margin:"20px 0"},slider:{width:"100%",margin:"10px 0"},button:{padding:"10px 20px",fontSize:"0.95em",fontWeight:"600",border:"none",borderRadius:"6px",cursor:"pointer",backgroundColor:i?"#238636":"#2ea043",color:"#ffffff",marginRight:"10px",marginTop:"10px"}}),Ye=()=>{const[i,s]=x.useState("decision-tree"),[a,o]=x.useState(!1),l=W(a),d=[{id:"decision-tree",name:"Decision Tree"},{id:"random-forest",name:"Random Forest"},{id:"gradient-boosting",name:"Gradient Boosting"},{id:"xgboost",name:"XGBoost"},{id:"svm",name:"SVM"}];return e.jsxs("div",{style:l.container,children:[e.jsx("button",{style:l.themeBtn,onClick:()=>o(!a),children:a?"☀️ Light":"🌙 Dark"}),e.jsxs("header",{style:l.header,children:[e.jsx("h1",{style:l.title,children:"Machine Learning Models"}),e.jsx("p",{style:l.subtitle,children:"From Beginner to Intermediate - Interactive Learning"})]}),e.jsx("nav",{style:l.nav,children:d.map(n=>e.jsx("button",{style:l.navBtn(i===n.id),onClick:()=>s(n.id),children:n.name},n.id))}),e.jsxs("main",{style:l.content,children:[i==="decision-tree"&&e.jsx(Je,{isDark:a}),i==="random-forest"&&e.jsx(et,{isDark:a}),i==="gradient-boosting"&&e.jsx(tt,{isDark:a}),i==="xgboost"&&e.jsx(it,{isDark:a}),i==="svm"&&e.jsx(at,{isDark:a})]})]})},Je=({isDark:i})=>{const s=W(i),[a,o]=x.useState(3),[l,d]=x.useState(0),n=[{q:"What game does Decision Tree remind you of?",a:"20 Questions - asking yes/no to narrow down"},{q:"What happens if a tree is too deep?",a:"It memorizes instead of learning (overfitting)"}];return e.jsxs("div",{children:[e.jsx("h2",{style:s.h2,children:"🌳 Decision Tree - Your First ML Model"}),e.jsxs("div",{style:s.infoBox,children:[e.jsx("strong",{children:"🎯 What You'll Learn:"})," How machines make decisions by asking questions, just like you do!"]}),e.jsxs("div",{style:s.section,children:[e.jsx("h3",{style:s.h3,children:"Part 1: The Big Idea (5 minutes)"}),e.jsxs("p",{children:["Imagine you're playing ",e.jsx("strong",{children:"20 Questions"})," to guess an animal your friend is thinking of:"]}),e.jsxs("ul",{children:[e.jsx("li",{children:'"Does it live in water?" → If NO: "Does it have fur?"'}),e.jsx("li",{children:'"Does it have four legs?" → If YES: "Is it bigger than a dog?"'}),e.jsx("li",{children:"Each question splits the possibilities in half!"})]}),e.jsxs("p",{children:["A ",e.jsx("span",{style:s.keywordBox,children:"Decision Tree"}),' works exactly the same way. It learns to ask the best questions to classify things (like "Is this email spam?" or "Will it rain today?").']})]}),e.jsxs("div",{style:s.section,children:[e.jsx("h3",{style:s.h3,children:"Part 2: Key Words Explained"}),e.jsxs("div",{style:{padding:"10px 0"},children:[e.jsxs("p",{children:[e.jsxs("strong",{children:[e.jsx("span",{style:s.keywordBox,children:"Node"}),":"]})," A decision point where a question is asked"]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[e.jsx("span",{style:s.keywordBox,children:"Split"}),":"]})," Dividing data based on the answer to a question"]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[e.jsx("span",{style:s.keywordBox,children:"Leaf"}),":"]})," The final answer (no more questions)"]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[e.jsx("span",{style:s.keywordBox,children:"Depth"}),":"]})," How many questions can be asked in a row"]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[e.jsx("span",{style:s.keywordBox,children:"Overfitting"}),":"]})," When the tree memorizes instead of learning patterns (like studying only practice test answers instead of understanding concepts)"]})]})]}),e.jsxs("div",{style:s.activityBox,children:[e.jsx("h3",{style:s.h3,children:"🎮 Class Activity: Build Your Own Tree"}),e.jsx("p",{children:e.jsx("strong",{children:"Time: 10 minutes"})}),e.jsxs("p",{children:[e.jsx("strong",{children:"Materials:"})," Paper and pencil"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Task:"})," Draw a decision tree to classify your classmates into:"]}),e.jsxs("ul",{children:[e.jsx("li",{children:'Group A: "Likes pizza"'}),e.jsx("li",{children:`Group B: "Doesn't like pizza"`})]}),e.jsx("p",{children:e.jsx("strong",{children:"Questions you might ask:"})}),e.jsxs("ul",{children:[e.jsx("li",{children:'"Do you like cheese?"'}),e.jsx("li",{children:'"Do you like tomatoes?"'}),e.jsx("li",{children:'"Have you tried pizza?"'})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Challenge:"})," What's the minimum number of questions needed?"]})]}),e.jsxs("div",{style:s.section,children:[e.jsx("h3",{style:s.h3,children:"Part 3: Interactive Demo"}),e.jsx(Ze,{maxDepth:a,isDark:i}),e.jsxs("label",{style:{display:"block",margin:"15px 0"},children:[e.jsx("strong",{children:"Tree Depth (Max Questions):"})," ",a,e.jsx("input",{type:"range",min:"1",max:"8",value:a,onChange:r=>o(Number(r.target.value)),style:s.slider}),e.jsx("small",{style:{color:i?"#8b949e":"#57606a"},children:a<=3?"✅ Good - Simple and general":"⚠️ Careful - Might memorize!"})]})]}),e.jsxs("div",{style:s.section,children:[e.jsx("h3",{style:s.h3,children:"Part 4: Python Code (How It's Done)"}),e.jsx("div",{style:s.codeBox,children:e.jsx("pre",{children:`# Using scikit-learn library
from sklearn.tree import DecisionTreeClassifier

# Create the model
tree = DecisionTreeClassifier(
    max_depth=${a},  # Control how many questions
    min_samples_split=2      # Min examples to ask question
)

# Train it (teach it patterns)
tree.fit(X_train, y_train)

# Make predictions
predictions = tree.predict(X_test)

# Example: Is this email spam?
# Features: [num_exclamation, num_dollars, has_link]
email = [[3, 5, 1]]  # 3 !, $5, has link
spam_or_not = tree.predict(email)  # Returns: Spam!`})})]}),e.jsxs("div",{style:s.section,children:[e.jsx("h3",{style:s.h3,children:"Part 5: Check Your Understanding"}),e.jsxs("div",{style:s.interactiveBox,children:[e.jsxs("p",{children:[e.jsxs("strong",{children:["Question ",l+1,":"]})," ",n[l].q]}),e.jsx("button",{style:s.button,onClick:()=>alert(n[l].a),children:"Show Answer"}),e.jsx("button",{style:s.button,onClick:()=>d((l+1)%n.length),children:"Next Question"})]})]}),e.jsxs("div",{style:s.warningBox,children:[e.jsx("strong",{children:"⚠️ Common Mistake:"})," Making the tree too deep! It's like memorizing test answers instead of understanding the subject. The tree works great on practice problems but fails on the real test."]}),e.jsxs("div",{style:s.infoBox,children:[e.jsx("strong",{children:"✅ Real World Uses:"}),e.jsxs("ul",{children:[e.jsx("li",{children:'Medical diagnosis: "If temp > 100°F AND cough → Check for flu"'}),e.jsx("li",{children:'Loan approval: "If income > $50k AND credit > 700 → Approve"'}),e.jsx("li",{children:`Email filtering: "If has 'FREE' AND many !!! → Spam"`})]})]})]})},Ze=({maxDepth:i,isDark:s})=>{const a=x.useRef(null),o=W(s);return x.useEffect(()=>{const l=a.current;if(!l)return;const d=l.getContext("2d"),n=l.width,r=l.height;d.fillStyle=s?"#0d1117":"#ffffff",d.fillRect(0,0,n,r);const p=(m,c,u,h)=>{if(!(u>i)&&(d.beginPath(),d.arc(m,c,25,0,2*Math.PI),d.fillStyle=u===i?"#238636":"#1f6feb",d.fill(),d.strokeStyle=s?"#c9d1d9":"#24292f",d.lineWidth=2,d.stroke(),d.fillStyle="#ffffff",d.font="bold 12px sans-serif",d.textAlign="center",d.textBaseline="middle",d.fillText(h,m,c),u<i)){const f=n/Math.pow(2,u+2);d.beginPath(),d.moveTo(m,c+25),d.lineTo(m-f,c+70-25),d.strokeStyle=s?"#58a6ff":"#0969da",d.lineWidth=2,d.stroke(),p(m-f,c+70,u+1,"No"),d.beginPath(),d.moveTo(m,c+25),d.lineTo(m+f,c+70-25),d.stroke(),p(m+f,c+70,u+1,"Yes")}};p(n/2,40,1,"Q1"),d.fillStyle=s?"#c9d1d9":"#24292f",d.font="14px sans-serif",d.textAlign="left",d.fillText(`Depth: ${i} levels of questions`,10,r-10)},[i,s]),e.jsxs("div",{style:o.interactiveBox,children:[e.jsx("canvas",{ref:a,width:600,height:350,style:{display:"block",maxWidth:"100%",height:"auto"}}),e.jsxs("p",{style:{textAlign:"center",marginTop:"10px",fontSize:"0.9em"},children:[e.jsx("strong",{children:"🔵 Decision nodes"})," ask questions • ",e.jsx("strong",{children:"🟢 Leaf nodes"})," give answers"]})]})},et=({isDark:i})=>{const s=W(i),[a,o]=x.useState(5);return e.jsxs("div",{children:[e.jsx("h2",{style:s.h2,children:"🌲 Random Forest - Teamwork Makes the Dream Work"}),e.jsxs("div",{style:s.infoBox,children:[e.jsx("strong",{children:"🎯 What You'll Learn:"})," Why asking multiple experts is better than asking just one!"]}),e.jsxs("div",{style:s.section,children:[e.jsx("h3",{style:s.h3,children:"Part 1: The Big Idea (5 minutes)"}),e.jsx("p",{children:"Imagine you're trying to decide which movie to watch. Would you:"}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Option A:"})," Ask one friend"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Option B:"})," Ask 10 friends and go with majority vote"]})]}),e.jsxs("p",{children:["Option B is usually better! Even if one friend has weird taste, the group opinion is more reliable. This is exactly how ",e.jsx("span",{style:s.keywordBox,children:"Random Forest"})," works - it creates many decision trees and combines their votes."]})]}),e.jsxs("div",{style:s.section,children:[e.jsx("h3",{style:s.h3,children:"Part 2: Key Words Explained"}),e.jsxs("div",{style:{padding:"10px 0"},children:[e.jsxs("p",{children:[e.jsxs("strong",{children:[e.jsx("span",{style:s.keywordBox,children:"Ensemble"}),":"]})," A team of models working together"]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[e.jsx("span",{style:s.keywordBox,children:"Bagging"}),":"]})," Each tree sees different random examples (like each friend having different movie experiences)"]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[e.jsx("span",{style:s.keywordBox,children:"Voting"}),":"]})," Each tree makes a prediction, majority wins"]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[e.jsx("span",{style:s.keywordBox,children:"Diversity"}),":"]})," Trees are different from each other (key to success!)"]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[e.jsx("span",{style:s.keywordBox,children:"Feature Randomness"}),":"]})," Each tree considers only some questions (keeps trees unique)"]})]})]}),e.jsxs("div",{style:s.activityBox,children:[e.jsx("h3",{style:s.h3,children:"🎮 Class Activity: Wisdom of Crowds"}),e.jsx("p",{children:e.jsx("strong",{children:"Time: 10 minutes"})}),e.jsxs("p",{children:[e.jsx("strong",{children:"Task:"})," Guess the number of jellybeans in a jar"]}),e.jsxs("ol",{children:[e.jsx("li",{children:"Everyone writes down their individual guess"}),e.jsx("li",{children:"Calculate the average of all guesses"}),e.jsx("li",{children:"Reveal the actual number"})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Usually amazing result:"}),' The average is closer than most individual guesses! This is "wisdom of crowds" - the same principle behind Random Forest.']}),e.jsxs("p",{children:[e.jsx("strong",{children:"Discussion:"})," Why does averaging help? (Hint: individual mistakes cancel out)"]})]}),e.jsxs("div",{style:s.section,children:[e.jsx("h3",{style:s.h3,children:"Part 3: Interactive Demo - See the Forest Vote"}),e.jsx(be,{numTrees:a,isDark:i}),e.jsxs("label",{style:{display:"block",margin:"15px 0"},children:[e.jsx("strong",{children:"Number of Trees in Forest:"})," ",a,e.jsx("input",{type:"range",min:"1",max:"20",value:a,onChange:l=>o(Number(l.target.value)),style:s.slider}),e.jsx("small",{style:{color:i?"#8b949e":"#57606a"},children:"More trees = More stable predictions (but slower)"})]})]}),e.jsxs("div",{style:s.section,children:[e.jsx("h3",{style:s.h3,children:"Part 4: Python Code"}),e.jsx("div",{style:s.codeBox,children:e.jsx("pre",{children:`from sklearn.ensemble import RandomForestClassifier

# Create a forest
forest = RandomForestClassifier(
    n_estimators=${a},  # Number of trees
    max_depth=5,           # Depth of each tree
    max_features='sqrt',   # Each tree uses √n features
    random_state=42        # For reproducibility
)

# Train the forest
forest.fit(X_train, y_train)

# Make predictions (trees vote!)
predictions = forest.predict(X_test)

# Get probability (confidence of prediction)
probabilities = forest.predict_proba(X_test)

# See which features are most important
importance = forest.feature_importances_
print("Most important features:", importance)`})})]}),e.jsxs("div",{style:s.section,children:[e.jsx("h3",{style:s.h3,children:"Part 5: Random Forest vs Decision Tree"}),e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",margin:"15px 0"},children:[e.jsx("thead",{children:e.jsxs("tr",{style:{backgroundColor:i?"#21262d":"#f6f8fa"},children:[e.jsx("th",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`,textAlign:"left"},children:"Aspect"}),e.jsx("th",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`,textAlign:"left"},children:"Decision Tree"}),e.jsx("th",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`,textAlign:"left"},children:"Random Forest"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},children:"Number of models"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},children:"1 tree"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},children:"Many trees (5-500)"})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},children:"Overfitting risk"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},children:"High"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},children:"Low (averaging helps)"})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},children:"Prediction stability"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},children:"Can change a lot"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},children:"Very stable"})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},children:"Speed"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},children:"Fast"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},children:"Slower (many trees)"})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},children:"Accuracy"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},children:"Good"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},children:"Better!"})]})]})]})]}),e.jsxs("div",{style:s.infoBox,children:[e.jsx("strong",{children:"✅ Real World Uses:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Predicting if a bank loan will be repaid"}),e.jsx("li",{children:"Detecting fraudulent credit card transactions"}),e.jsx("li",{children:"Recommending products you might like"}),e.jsx("li",{children:"Predicting if a patient has a disease"})]})]}),e.jsxs("div",{style:s.warningBox,children:[e.jsx("strong",{children:"💡 Key Insight:"}),` Random Forest is almost always better than a single Decision Tree. It's one of the best "out of the box" ML models - works well without much tweaking!`]})]})},be=({numTrees:i,isDark:s})=>{const[a,o]=x.useState([]),l=W(s);x.useEffect(()=>{const p=[];for(let m=0;m<i;m++)p.push(Math.random()>.4?"Class A":"Class B");o(p)},[i]);const d=a.filter(p=>p==="Class A").length,n=a.filter(p=>p==="Class B").length,r=d>n?"Class A":"Class B";return e.jsxs("div",{style:l.interactiveBox,children:[e.jsx("h4",{style:{marginTop:0},children:"🗳️ Watch the Trees Vote"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(60px, 1fr))",gap:"8px",margin:"20px 0"},children:a.map((p,m)=>e.jsxs("div",{style:{padding:"15px 5px",textAlign:"center",borderRadius:"6px",backgroundColor:p==="Class A"?s?"#1a7f37":"#2ea043":s?"#9e6a03":"#bf8700",color:"#ffffff",fontSize:"0.85em",fontWeight:"600"},children:["Tree ",m+1,e.jsx("br",{}),p]},m))}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-around",alignItems:"center",padding:"20px",backgroundColor:s?"#21262d":"#f6f8fa",borderRadius:"6px",marginTop:"20px"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontSize:"2em",fontWeight:"bold",color:s?"#2ea043":"#1a7f37"},children:d}),e.jsx("div",{children:"Class A votes"})]}),e.jsx("div",{style:{fontSize:"2em",color:s?"#58a6ff":"#0969da"},children:"VS"}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontSize:"2em",fontWeight:"bold",color:s?"#bb8009":"#9a6700"},children:n}),e.jsx("div",{children:"Class B votes"})]}),e.jsx("div",{style:{fontSize:"2em",color:s?"#58a6ff":"#0969da"},children:"→"}),e.jsxs("div",{style:{padding:"15px 25px",borderRadius:"6px",backgroundColor:r==="Class A"?s?"#1a7f37":"#2ea043":s?"#9e6a03":"#bf8700",color:"#ffffff",fontWeight:"bold",fontSize:"1.2em"},children:["Winner: ",r]})]}),e.jsx("p",{style:{marginTop:"15px",fontSize:"0.9em",textAlign:"center",fontStyle:"italic"},children:"Each tree votes independently. Majority wins! This is why Random Forest is so stable."})]})},tt=({isDark:i})=>{const s=W(i),[a,o]=x.useState(.1),[l,d]=x.useState(50);return e.jsxs("div",{children:[e.jsx("h2",{style:s.h2,children:"📈 Gradient Boosting - Learning From Mistakes"}),e.jsxs("div",{style:s.infoBox,children:[e.jsx("strong",{children:"🎯 What You'll Learn:"})," How to get better by fixing your mistakes, step by step!"]}),e.jsxs("div",{style:s.section,children:[e.jsx("h3",{style:s.h3,children:"Part 1: The Big Idea (5 minutes)"}),e.jsx("p",{children:"Imagine you're learning to shoot basketball free throws:"}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Shot 1:"}),' You shoot - ball falls short → "I need more power!"']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Shot 2:"}),' You add power - ball goes too far → "Less power than that"']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Shot 3:"})," You adjust - getting closer! → Keep adjusting..."]})]}),e.jsxs("p",{children:[e.jsx("span",{style:s.keywordBox,children:"Gradient Boosting"})," works the same way! Instead of building trees independently (like Random Forest), each new tree tries to correct the mistakes of all previous trees."]})]}),e.jsxs("div",{style:s.section,children:[e.jsx("h3",{style:s.h3,children:"Part 2: Key Words Explained"}),e.jsxs("div",{style:{padding:"10px 0"},children:[e.jsxs("p",{children:[e.jsxs("strong",{children:[e.jsx("span",{style:s.keywordBox,children:"Boosting"}),":"]})," Building models sequentially, each fixing previous mistakes"]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[e.jsx("span",{style:s.keywordBox,children:"Residuals"}),":"]})," The mistakes/errors from current predictions (what we got wrong)"]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[e.jsx("span",{style:s.keywordBox,children:"Learning Rate"}),":"]}),` How much each tree's correction counts (like "step size" when adjusting)`]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[e.jsx("span",{style:s.keywordBox,children:"Sequential"}),":"]})," Trees are built one after another (not at same time like Random Forest)"]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[e.jsx("span",{style:s.keywordBox,children:"Error Reduction"}),":"]})," How much better we get with each iteration"]})]})]}),e.jsxs("div",{style:s.activityBox,children:[e.jsx("h3",{style:s.h3,children:"🎮 Class Activity: Error Correction Game"}),e.jsx("p",{children:e.jsx("strong",{children:"Time: 10 minutes"})}),e.jsxs("p",{children:[e.jsx("strong",{children:"Setup:"})," Teacher secretly picks a number 1-100"]}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Round 1:"})," Class guesses together (maybe 50)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Feedback:"}),' "Too high" → Error = +50']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Round 2:"})," Adjust based on error → Guess 25"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Feedback:"}),' "Too low" → Error = -25']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Round 3:"})," Adjust again → Getting closer!"]})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Key Point:"})," Each guess uses information from previous errors. This is boosting!"]})]}),e.jsxs("div",{style:s.section,children:[e.jsx("h3",{style:s.h3,children:"Part 3: Understanding Learning Rate"}),e.jsxs("p",{children:["The ",e.jsx("span",{style:s.keywordBox,children:"learning rate"})," controls how much we adjust each time:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"High learning rate (0.5-1.0):"})," Big adjustments → Fast but might overshoot"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Medium learning rate (0.1-0.3):"})," Balanced → Usually best"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Low learning rate (0.01-0.05):"})," Tiny adjustments → Slow but careful"]})]}),e.jsx("p",{children:"Think of it like volume control: turning it way up (high learning rate) gets loud fast but you might overshoot. Turning gradually (low learning rate) takes longer but you get exactly the volume you want."})]}),e.jsxs("div",{style:s.section,children:[e.jsx("h3",{style:s.h3,children:"Part 4: Interactive Demo - Error Reduction"}),e.jsx(st,{learningRate:a,numTrees:l,isDark:i}),e.jsxs("label",{style:{display:"block",margin:"15px 0"},children:[e.jsx("strong",{children:"Learning Rate:"})," ",a.toFixed(2),e.jsx("input",{type:"range",min:"0.01",max:"1",step:"0.01",value:a,onChange:n=>o(Number(n.target.value)),style:s.slider}),e.jsx("small",{style:{color:i?"#8b949e":"#57606a"},children:a>.5?"⚠️ Fast but risky":a>.1?"✅ Balanced":"🐌 Slow and steady"})]}),e.jsxs("label",{style:{display:"block",margin:"15px 0"},children:[e.jsx("strong",{children:"Number of Trees:"})," ",l,e.jsx("input",{type:"range",min:"10",max:"200",step:"10",value:l,onChange:n=>d(Number(n.target.value)),style:s.slider})]})]}),e.jsxs("div",{style:s.section,children:[e.jsx("h3",{style:s.h3,children:"Part 5: Python Code"}),e.jsx("div",{style:s.codeBox,children:e.jsx("pre",{children:`from sklearn.ensemble import GradientBoostingClassifier

# Create the model
gb = GradientBoostingClassifier(
    n_estimators=${l},      # Number of boosting rounds
    learning_rate=${a.toFixed(2)},  # Step size for corrections
    max_depth=3,               # Shallow trees (weak learners)
    subsample=0.8,             # Use 80% data per tree
    random_state=42
)

# Train (each tree corrects previous mistakes)
gb.fit(X_train, y_train)

# Predict
predictions = gb.predict(X_test)

# Watch improvement over time
staged_predictions = list(gb.staged_predict(X_test))
# staged_predictions[0] = after tree 1
# staged_predictions[49] = after tree 50`})})]}),e.jsxs("div",{style:s.warningBox,children:[e.jsx("strong",{children:"⚠️ Trade-off Alert:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"More trees + low learning rate"})," = Better accuracy BUT slow training"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Fewer trees + high learning rate"})," = Fast BUT might overfit"]})]}),e.jsx("p",{children:"Rule of thumb: If you decrease learning rate by 2×, increase trees by 2×"})]}),e.jsxs("div",{style:s.infoBox,children:[e.jsx("strong",{children:"✅ Real World Uses:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Web search ranking (Google, Bing)"}),e.jsx("li",{children:"Ad click prediction"}),e.jsx("li",{children:"Stock price prediction"}),e.jsx("li",{children:"Won many Kaggle competitions (data science competitions)"})]})]})]})},st=({learningRate:i,numTrees:s,isDark:a})=>{const o=x.useRef(null),l=W(a);return x.useEffect(()=>{const d=o.current;if(!d)return;const n=d.getContext("2d"),r=d.width,p=d.height;n.fillStyle=a?"#0d1117":"#ffffff",n.fillRect(0,0,r,p);const m=[];let c=50;for(let g=0;g<=s;g++)m.push({x:g,y:c}),c=Math.max(5,c-i*5*(1-g/s));n.strokeStyle=a?"#30363d":"#d0d7de",n.lineWidth=2,n.beginPath(),n.moveTo(50,20),n.lineTo(50,p-40),n.lineTo(r-20,p-40),n.stroke(),n.fillStyle=a?"#8b949e":"#57606a",n.font="12px sans-serif",n.textAlign="center",n.fillText("Error (%)",25,p/2),n.fillText("Number of Trees",r/2,p-10),n.beginPath(),n.strokeStyle=a?"#1f6feb":"#0969da",n.lineWidth=3,m.forEach((g,b)=>{const v=50+g.x/s*(r-70),_=p-40-g.y/50*(p-60);b===0?n.moveTo(v,_):n.lineTo(v,_)}),n.stroke();const u=m[m.length-1],h=50+u.x/s*(r-70),f=p-40-u.y/50*(p-60);n.beginPath(),n.arc(h,f,6,0,2*Math.PI),n.fillStyle="#238636",n.fill(),n.fillStyle=a?"#c9d1d9":"#24292f",n.font="bold 14px sans-serif",n.textAlign="left",n.fillText(`Final Error: ${u.y.toFixed(1)}%`,60,30)},[i,s,a]),e.jsxs("div",{style:l.interactiveBox,children:[e.jsx("h4",{style:{marginTop:0},children:"📉 Error Reduction Over Trees"}),e.jsx("canvas",{ref:o,width:600,height:300,style:{display:"block",maxWidth:"100%"}}),e.jsx("p",{style:{fontSize:"0.9em",textAlign:"center",marginTop:"10px"},children:"Watch how error decreases as we add more trees. Each tree corrects previous mistakes!"})]})},it=({isDark:i})=>{const s=W(i),[a,o]=x.useState(.3);return e.jsxs("div",{children:[e.jsx("h2",{style:s.h2,children:"🚀 XGBoost - Gradient Boosting on Steroids"}),e.jsxs("div",{style:s.infoBox,children:[e.jsx("strong",{children:"🎯 What You'll Learn:"})," How XGBoost became the champion of machine learning competitions!"]}),e.jsxs("div",{style:s.section,children:[e.jsx("h3",{style:s.h3,children:"Part 1: The Big Idea (5 minutes)"}),e.jsx("p",{children:"Imagine you're upgrading from a regular bicycle to an electric bike:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Same basic concept (two wheels, pedals)"}),e.jsxs("li",{children:["But with ",e.jsx("strong",{children:"superpowers"}),": motor, battery, speed control"]}),e.jsx("li",{children:"Goes faster, farther, and handles hills better!"})]}),e.jsxs("p",{children:[e.jsx("span",{style:s.keywordBox,children:"XGBoost"})," is Gradient Boosting with superpowers:"]}),e.jsxs("ul",{children:[e.jsx("li",{children:"⚡ Much faster (uses all computer cores)"}),e.jsx("li",{children:"🎯 Better accuracy (advanced math tricks)"}),e.jsx("li",{children:"🛡️ Built-in protection against overfitting"}),e.jsx("li",{children:"💪 Handles missing data automatically"})]})]}),e.jsxs("div",{style:s.section,children:[e.jsx("h3",{style:s.h3,children:"Part 2: Key Words Explained"}),e.jsxs("div",{style:{padding:"10px 0"},children:[e.jsxs("p",{children:[e.jsxs("strong",{children:[e.jsx("span",{style:s.keywordBox,children:"XGBoost"}),":"]}),' "eXtreme Gradient Boosting" - optimized version of Gradient Boosting']}),e.jsxs("p",{children:[e.jsxs("strong",{children:[e.jsx("span",{style:s.keywordBox,children:"eta (η)"}),":"]})," XGBoost's name for learning rate (step size)"]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[e.jsx("span",{style:s.keywordBox,children:"Regularization"}),":"]})," Built-in rules to prevent overfitting (like speed limits prevent accidents)"]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[e.jsx("span",{style:s.keywordBox,children:"Parallel Processing"}),":"]})," Uses all CPU cores at once (like multiple checkout lanes at grocery store)"]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[e.jsx("span",{style:s.keywordBox,children:"Tree Pruning"}),":"]})," Automatically removes unnecessary branches"]})]})]}),e.jsxs("div",{style:s.activityBox,children:[e.jsx("h3",{style:s.h3,children:"🎮 Class Activity: Speed vs Accuracy"}),e.jsx("p",{children:e.jsx("strong",{children:"Time: 10 minutes"})}),e.jsxs("p",{children:[e.jsx("strong",{children:"Challenge:"})," Math problem race with two strategies"]}),e.jsx("p",{children:e.jsx("strong",{children:"Strategy A (High eta = 0.8):"})}),e.jsxs("ul",{children:[e.jsx("li",{children:"Solve 5 problems as fast as possible"}),e.jsx("li",{children:"Check answers quickly"}),e.jsx("li",{children:"Result: Fast but might make mistakes"})]}),e.jsx("p",{children:e.jsx("strong",{children:"Strategy B (Low eta = 0.1):"})}),e.jsxs("ul",{children:[e.jsx("li",{children:"Solve 20 problems carefully"}),e.jsx("li",{children:"Check each answer thoroughly"}),e.jsx("li",{children:"Result: Slower but more accurate"})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Discussion:"})," When would you use each strategy? (Tests vs homework vs Kaggle competitions)"]})]}),e.jsxs("div",{style:s.section,children:[e.jsx("h3",{style:s.h3,children:"Part 3: Understanding eta (Learning Rate)"}),e.jsx(nt,{eta:a,isDark:i}),e.jsxs("label",{style:{display:"block",margin:"15px 0"},children:[e.jsx("strong",{children:"eta (Learning Rate):"})," ",a.toFixed(2),e.jsx("input",{type:"range",min:"0.01",max:"1",step:"0.01",value:a,onChange:l=>o(Number(l.target.value)),style:s.slider}),e.jsx("small",{style:{color:i?"#8b949e":"#57606a"},children:a>.5?"🏃 Fast learning - might miss details":a>.2?"✅ Balanced - typical choice":"🐌 Slow learning - very thorough"})]}),e.jsxs("div",{style:s.infoBox,children:[e.jsx("strong",{children:"💡 XGBoost Typical Settings:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Fast prototyping:"})," eta=0.3, n_estimators=100"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Competition winning:"})," eta=0.01-0.05, n_estimators=1000+"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Production (balanced):"})," eta=0.1, n_estimators=200-500"]})]})]})]}),e.jsxs("div",{style:s.section,children:[e.jsx("h3",{style:s.h3,children:"Part 4: Python Code"}),e.jsx("div",{style:s.codeBox,children:e.jsx("pre",{children:`import xgboost as xgb

# Create the model
model = xgb.XGBClassifier(
    n_estimators=100,      # Number of trees
    eta=${a.toFixed(2)},               # Learning rate
    max_depth=6,           # Tree depth
    subsample=0.8,         # Use 80% of data
    colsample_bytree=0.8,  # Use 80% of features
    gamma=0,               # Regularization
    reg_alpha=0,           # L1 regularization
    reg_lambda=1,          # L2 regularization
    eval_metric='logloss', # What to optimize
    use_label_encoder=False
)

# Train with validation monitoring
model.fit(
    X_train, y_train,
    eval_set=[(X_val, y_val)],
    early_stopping_rounds=10,  # Stop if no improvement
    verbose=True
)

# Predict
predictions = model.predict(X_test)

# Feature importance
import matplotlib.pyplot as plt
xgb.plot_importance(model)
plt.show()`})})]}),e.jsxs("div",{style:s.section,children:[e.jsx("h3",{style:s.h3,children:"Part 5: Why XGBoost Won So Many Competitions"}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Speed:"})," 10x faster than regular Gradient Boosting"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Accuracy:"})," Built-in regularization prevents overfitting"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Missing data:"})," Learns best direction for missing values"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Out of box:"})," Works great with default settings"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Handles large data:"})," Efficient memory usage"]})]})]}),e.jsxs("div",{style:s.warningBox,children:[e.jsx("strong",{children:"⚠️ Common Mistakes:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Using wrong objective:"})," Use 'binary:logistic' for yes/no, 'multi:softmax' for multiple classes"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Ignoring early_stopping:"})," Wastes time training too long"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Not tuning eta:"})," Default 0.3 might not be optimal"]})]})]}),e.jsxs("div",{style:s.infoBox,children:[e.jsx("strong",{children:"🏆 XGBoost Success Stories:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Won most Kaggle competitions 2015-2020"}),e.jsx("li",{children:"Used by Netflix for recommendations"}),e.jsx("li",{children:"Powers fraud detection at PayPal"}),e.jsx("li",{children:"Predicts click-through rates for ads"})]})]})]})},nt=({eta:i,isDark:s})=>{const a=x.useRef(null),o=W(s);return x.useEffect(()=>{const l=a.current;if(!l)return;const d=l.getContext("2d"),n=l.width,r=l.height;d.fillStyle=s?"#0d1117":"#ffffff",d.fillRect(0,0,n,r);const p=n-60,m=r/2,c=60,u=r/2;d.beginPath(),d.arc(p,m,20,0,2*Math.PI),d.fillStyle="#238636",d.fill(),d.fillStyle="#ffffff",d.font="bold 14px sans-serif",d.textAlign="center",d.textBaseline="middle",d.fillText("🎯",p,m),d.beginPath(),d.arc(c,u,10,0,2*Math.PI),d.fillStyle=s?"#1f6feb":"#0969da",d.fill();const h=Math.ceil(1/i),f=(p-c)/h;d.strokeStyle=s?"#58a6ff":"#0969da",d.lineWidth=2,d.setLineDash([5,5]);let g=c;for(let b=0;b<Math.min(h,20);b++){const v=Math.min(g+f,p);if(d.beginPath(),d.moveTo(g,u),d.lineTo(v,u),d.stroke(),d.beginPath(),d.arc(v,u,5,0,2*Math.PI),d.fillStyle=s?"#58a6ff":"#0969da",d.fill(),g=v,g>=p)break}d.setLineDash([]),d.fillStyle=s?"#c9d1d9":"#24292f",d.font="14px sans-serif",d.textAlign="center",d.fillText(`${h>20?"20+":h} steps with eta=${i.toFixed(2)}`,n/2,r-20),d.fillText("Start",c,u-30),d.fillText("Target",p,m-35)},[i,s]),e.jsxs("div",{style:o.interactiveBox,children:[e.jsx("h4",{style:{marginTop:0},children:"🎯 Learning Steps to Target"}),e.jsx("canvas",{ref:a,width:600,height:200,style:{display:"block",maxWidth:"100%"}}),e.jsx("p",{style:{fontSize:"0.9em",textAlign:"center",marginTop:"10px"},children:"Higher eta = fewer, bigger steps. Lower eta = more, smaller steps."})]})},at=({isDark:i})=>{const s=W(i),[a,o]=x.useState(1),[l,d]=x.useState("rbf"),[n,r]=x.useState(.1);return e.jsxs("div",{children:[e.jsx("h2",{style:s.h2,children:"🎯 Support Vector Machines - Finding the Best Boundary"}),e.jsxs("div",{style:s.infoBox,children:[e.jsx("strong",{children:"🎯 What You'll Learn:"})," How to draw the perfect line between two groups!"]}),e.jsxs("div",{style:s.section,children:[e.jsx("h3",{style:s.h3,children:"Part 1: The Big Idea (5 minutes)"}),e.jsx("p",{children:"Imagine you're a referee at a soccer game, separating two teams:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"You could draw the line anywhere between them"}),e.jsxs("li",{children:["But the ",e.jsx("strong",{children:"best line"})," is in the middle, maximizing space on both sides"]}),e.jsx("li",{children:'This gives the most "buffer zone" - safer and fairer!'})]}),e.jsxs("p",{children:[e.jsx("span",{style:s.keywordBox,children:"SVM (Support Vector Machine)"}),' does exactly this - it finds the boundary with the maximum "margin" (safety zone) between classes.']})]}),e.jsxs("div",{style:s.section,children:[e.jsx("h3",{style:s.h3,children:"Part 2: Key Words Explained Simply"}),e.jsxs("div",{style:{padding:"10px 0"},children:[e.jsxs("p",{children:[e.jsxs("strong",{children:[e.jsx("span",{style:s.keywordBox,children:"Hyperplane"}),":"]})," The boundary line (or surface) separating classes"]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[e.jsx("span",{style:s.keywordBox,children:"Margin"}),":"]}),' The "safety zone" on both sides of the boundary']}),e.jsxs("p",{children:[e.jsxs("strong",{children:[e.jsx("span",{style:s.keywordBox,children:"Support Vectors"}),":"]}),' The closest points that "support" the boundary (like the front-row players determining where the midfield line goes)']})]}),e.jsx("h4",{style:{marginTop:"25px"},children:"🎛️ The Three Important Controls:"}),e.jsxs("div",{style:{marginLeft:"20px",marginTop:"15px"},children:[e.jsx("p",{children:e.jsxs("strong",{children:["1. ",e.jsx("span",{style:s.keywordBox,children:"C (Regularization)"})]})}),e.jsx("p",{style:{marginLeft:"20px"},children:'Think of C as "How strict should we be?"'}),e.jsxs("ul",{style:{marginLeft:"40px"},children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Small C (0.01-0.1):"}),' "Relax, allow some mistakes" → Wide margin, more errors OK']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Medium C (1):"})," Balanced approach (default)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Large C (10-100):"}),' "Be perfect!" → Narrow margin, try to classify everything correctly']})]}),e.jsx("p",{style:{marginLeft:"20px",fontStyle:"italic"},children:"🎓 Real life analogy: Grading on a curve (low C) vs strict grading (high C)"}),e.jsx("p",{style:{marginTop:"20px"},children:e.jsxs("strong",{children:["2. ",e.jsx("span",{style:s.keywordBox,children:"Kernel"})]})}),e.jsx("p",{style:{marginLeft:"20px"},children:"Kernels help SVM see patterns in different ways. Like wearing different glasses:"}),e.jsxs("ul",{style:{marginLeft:"40px"},children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Linear:"})," Regular glasses - draw a straight line"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"RBF (Radial Basis Function):"})," Magic glasses - can draw curves and circles! (Most popular)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Polynomial:"})," Curved glasses - wavy boundaries"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Sigmoid:"})," S-shaped curves"]})]}),e.jsx("p",{style:{marginLeft:"20px",fontStyle:"italic"},children:"🎓 Real life analogy: Different lenses for different situations (straight road vs curvy mountain path)"}),e.jsx("p",{style:{marginTop:"20px"},children:e.jsxs("strong",{children:["3. ",e.jsx("span",{style:s.keywordBox,children:"Gamma"})]})}),e.jsx("p",{style:{marginLeft:"20px"},children:'Gamma controls "How far should influence reach?" (Only for RBF, polynomial, sigmoid)'}),e.jsxs("ul",{style:{marginLeft:"40px"},children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Small gamma (0.01):"})," Far-reaching influence → Smooth, simple boundaries"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Medium gamma (0.1-1):"})," Moderate influence (usually best)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Large gamma (10+):"})," Short-range influence → Very wiggly boundaries (careful - can memorize!)"]})]}),e.jsx("p",{style:{marginLeft:"20px",fontStyle:"italic"},children:"🎓 Real life analogy: WiFi range - low gamma = reaches far (smooth), high gamma = only nearby (detailed)"})]})]}),e.jsxs("div",{style:s.activityBox,children:[e.jsx("h3",{style:s.h3,children:"🎮 Class Activity: Draw the Best Line"}),e.jsx("p",{children:e.jsx("strong",{children:"Time: 10 minutes"})}),e.jsxs("p",{children:[e.jsx("strong",{children:"Materials:"})," Whiteboard, colored markers, coins"]}),e.jsxs("ol",{children:[e.jsx("li",{children:"Place red coins on left side of board"}),e.jsx("li",{children:"Place blue coins on right side (with some overlap)"}),e.jsxs("li",{children:[e.jsx("strong",{children:"Challenge 1:"})," Draw a straight line with maximum margin"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Challenge 2:"})," What if points are in a circle pattern? (This is where kernels help!)"]})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Discussion:"}),e.jsxs("ul",{children:[e.jsx("li",{children:'Which coins are the "support vectors"? (The closest ones)'}),e.jsx("li",{children:"What happens if we move only the far coins? (Nothing! Only support vectors matter)"})]})]})]}),e.jsxs("div",{style:s.section,children:[e.jsx("h3",{style:s.h3,children:"Part 3: Interactive Demo - See SVM in Action"}),e.jsx(rt,{C:a,kernel:l,gamma:n,isDark:i}),e.jsxs("div",{style:{marginTop:"20px"},children:[e.jsxs("label",{style:{display:"block",margin:"15px 0"},children:[e.jsx("strong",{children:"C (Strictness):"})," ",a.toFixed(2),e.jsx("input",{type:"range",min:"0.01",max:"10",step:"0.01",value:a,onChange:p=>o(Number(p.target.value)),style:s.slider}),e.jsx("small",{style:{display:"block",color:i?"#8b949e":"#57606a",marginTop:"5px"},children:a<.5?"😊 Relaxed - wide margin, some errors OK":a<5?"⚖️ Balanced - typical choice":"😤 Strict - narrow margin, must be perfect"})]}),e.jsxs("label",{style:{display:"block",margin:"15px 0"},children:[e.jsx("strong",{children:"Kernel Type:"}),e.jsxs("select",{value:l,onChange:p=>d(p.target.value),style:{width:"100%",padding:"8px",marginTop:"5px",fontSize:"1em",borderRadius:"6px",border:`1px solid ${i?"#30363d":"#d0d7de"}`,backgroundColor:i?"#0d1117":"#ffffff",color:i?"#c9d1d9":"#24292f"},children:[e.jsx("option",{value:"linear",children:"Linear (straight line)"}),e.jsx("option",{value:"rbf",children:"RBF (curves & circles) ⭐ Most popular"}),e.jsx("option",{value:"poly",children:"Polynomial (wavy)"}),e.jsx("option",{value:"sigmoid",children:"Sigmoid (S-shaped)"})]})]}),l!=="linear"&&e.jsxs("label",{style:{display:"block",margin:"15px 0"},children:[e.jsx("strong",{children:"Gamma (Influence Range):"})," ",n.toFixed(2),e.jsx("input",{type:"range",min:"0.01",max:"5",step:"0.01",value:n,onChange:p=>r(Number(p.target.value)),style:s.slider}),e.jsx("small",{style:{display:"block",color:i?"#8b949e":"#57606a",marginTop:"5px"},children:n<.5?"📡 Wide influence - smooth boundary":n<2?"📱 Medium - balanced":"📍 Narrow influence - detailed (careful!)"})]})]})]}),e.jsxs("div",{style:s.section,children:[e.jsx("h3",{style:s.h3,children:"Part 4: Python Code"}),e.jsx("div",{style:s.codeBox,children:e.jsx("pre",{children:`from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler

# IMPORTANT: Always scale data for SVM!
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Create the model
svm = SVC(
    C=${a.toFixed(2)},              # Regularization (strictness)
    kernel='${l}',      # Type of boundary
    gamma=${n.toFixed(2)},           # Influence range (for rbf/poly/sigmoid)
    probability=True,   # Enable probability predictions
    random_state=42
)

# Train
svm.fit(X_train_scaled, y_train)

# Predict
predictions = svm.predict(X_test_scaled)
probabilities = svm.predict_proba(X_test_scaled)

# See support vectors (the important points)
support_vectors = svm.support_vectors_
num_support = svm.n_support_  # How many per class`})})]}),e.jsxs("div",{style:s.section,children:[e.jsx("h3",{style:s.h3,children:"Part 5: Choosing the Right Settings"}),e.jsxs("div",{style:{marginTop:"15px"},children:[e.jsx("p",{children:e.jsx("strong",{children:"📝 Quick Guide:"})}),e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",marginTop:"10px"},children:[e.jsx("thead",{children:e.jsxs("tr",{style:{backgroundColor:i?"#21262d":"#f6f8fa"},children:[e.jsx("th",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`,textAlign:"left"},children:"Your Data"}),e.jsx("th",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`,textAlign:"left"},children:"Best Settings"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},children:"Points in a straight line pattern"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},children:"kernel='linear', C=1"})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},children:"Circular or complex pattern"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},children:"kernel='rbf', C=1, gamma=0.1"})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},children:"Noisy data (outliers)"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},children:"Lower C (0.1-0.5)"})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},children:"Clean, clear separation"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},children:"Higher C (10-100)"})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},children:"Not sure? Start here!"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#30363d":"#d0d7de"}`},children:"kernel='rbf', C=1, gamma='scale'"})]})]})]})]})]}),e.jsxs("div",{style:s.warningBox,children:[e.jsx("strong",{children:"⚠️ Critical: Always Scale Your Data!"}),e.jsx("p",{children:"SVM is very sensitive to feature scales. If one feature is 1-10 and another is 1000-5000, SVM will think the big numbers are more important. Always use StandardScaler first!"})]}),e.jsxs("div",{style:s.infoBox,children:[e.jsx("strong",{children:"✅ Real World Uses:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Text classification (spam detection, sentiment analysis)"}),e.jsx("li",{children:"Image recognition (face detection)"}),e.jsx("li",{children:"Medical diagnosis (cancer detection from cell samples)"}),e.jsx("li",{children:"Handwriting recognition"})]})]}),e.jsxs("div",{style:s.activityBox,children:[e.jsx("h3",{style:s.h3,children:"🧪 Experiment Challenge"}),e.jsx("p",{children:e.jsx("strong",{children:"Try these combinations and observe:"})}),e.jsxs("ol",{children:[e.jsx("li",{children:"Linear kernel with high C → Very strict straight line"}),e.jsx("li",{children:"RBF kernel with low gamma → Smooth, simple boundary"}),e.jsx("li",{children:"RBF kernel with high gamma → Wiggly, complex boundary"}),e.jsx("li",{children:"Low C with any kernel → More forgiving, wider margin"})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Question:"})," Which combination would you use for a real-world noisy dataset?"]})]})]})},rt=({C:i,kernel:s,gamma:a,isDark:o})=>{const l=x.useRef(null),d=W(o);return x.useEffect(()=>{const n=l.current;if(!n)return;const r=n.getContext("2d"),p=n.width,m=n.height;r.fillStyle=o?"#0d1117":"#ffffff",r.fillRect(0,0,p,m);const c=[],u=[];for(let g=0;g<15;g++)c.push({x:100+Math.random()*150,y:100+Math.random()*150}),u.push({x:350+Math.random()*150,y:100+Math.random()*150});if(r.strokeStyle=o?"#1f6feb":"#0969da",r.lineWidth=3,r.beginPath(),s==="linear"){const g=p/2;r.moveTo(g-100,m/4),r.lineTo(g+100,3*m/4)}else if(s==="rbf"){const g=Math.min(a*20,100);r.moveTo(p/2-g,m/4),r.quadraticCurveTo(p/2,m/2-g,p/2+g,3*m/4)}else if(s==="poly"){r.moveTo(p/2,m/4);for(let g=m/4;g<=3*m/4;g+=10){const b=p/2+Math.sin(g/30)*40;r.lineTo(b,g)}}else if(s==="sigmoid"){r.moveTo(p/2-50,m/4);for(let g=0;g<=1;g+=.05){const b=1/(1+Math.exp(-10*(g-.5))),v=p/2-50+b*100,_=m/4+g*m/2;r.lineTo(v,_)}}r.stroke();const h=Math.max(10,30/i);if(r.strokeStyle=o?"#30363d":"#d0d7de",r.lineWidth=2,r.setLineDash([5,5]),s==="linear"){r.beginPath();const g=p/2;r.moveTo(g-100-h,m/4),r.lineTo(g+100-h,3*m/4),r.stroke(),r.beginPath(),r.moveTo(g-100+h,m/4),r.lineTo(g+100+h,3*m/4),r.stroke()}r.setLineDash([]),[...c,...u].forEach((g,b)=>{const v=b<c.length;r.beginPath(),r.arc(g.x,g.y,6,0,2*Math.PI),r.fillStyle=v?o?"#238636":"#2ea043":o?"#da3633":"#cf222e",r.fill(),r.strokeStyle=o?"#c9d1d9":"#24292f",r.lineWidth=2,r.stroke()}),[0,1,c.length,c.length+1].forEach(g=>{const b=[...c,...u];g<b.length&&(r.beginPath(),r.arc(b[g].x,b[g].y,12,0,2*Math.PI),r.strokeStyle=o?"#bb8009":"#bf8700",r.lineWidth=3,r.stroke())}),r.fillStyle=o?"#c9d1d9":"#24292f",r.font="14px sans-serif",r.textAlign="left",r.fillText(`C=${i.toFixed(2)} (${i<1?"relaxed":i>5?"strict":"balanced"})`,10,25),r.fillText(`Kernel: ${s}`,10,45),s!=="linear"&&r.fillText(`gamma=${a.toFixed(2)}`,10,65)},[i,s,a,o]),e.jsxs("div",{style:d.interactiveBox,children:[e.jsx("canvas",{ref:l,width:600,height:350,style:{display:"block",maxWidth:"100%"}}),e.jsxs("div",{style:{textAlign:"center",marginTop:"15px",fontSize:"0.9em"},children:[e.jsxs("p",{children:[e.jsx("strong",{style:{color:o?"#238636":"#2ea043"},children:"● Class A"})," | ",e.jsx("strong",{style:{color:o?"#da3633":"#cf222e"},children:"● Class B"})," | ",e.jsx("strong",{style:{color:o?"#bb8009":"#bf8700"},children:"◯ Support Vectors"})," | ",e.jsx("strong",{style:{color:o?"#1f6feb":"#0969da"},children:"━ Decision Boundary"})]}),e.jsx("p",{style:{fontSize:"0.85em",fontStyle:"italic",marginTop:"10px"},children:"Notice: Only support vectors (circled points) matter! Moving other points doesn't change the boundary."})]})]})},Z=i=>({container:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',maxWidth:"1200px",margin:"0 auto",padding:"20px",backgroundColor:i?"#1a1a1a":"#ffffff",color:i?"#e0e0e0":"#333333",minHeight:"100vh"},header:{textAlign:"center",marginBottom:"40px",borderBottom:`3px solid ${i?"#4a9eff":"#2196F3"}`,paddingBottom:"20px"},title:{fontSize:"2.5em",margin:"0 0 10px 0",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},subtitle:{fontSize:"1.2em",color:i?"#a0a0a0":"#666666",margin:"0"},navigation:{display:"flex",flexWrap:"wrap",gap:"10px",marginBottom:"30px",justifyContent:"center"},navButton:s=>({padding:"12px 24px",border:"none",borderRadius:"8px",cursor:"pointer",fontSize:"1em",fontWeight:"600",transition:"all 0.3s ease",backgroundColor:s?i?"#4a9eff":"#2196F3":i?"#2a2a2a":"#f0f0f0",color:s?"#ffffff":i?"#e0e0e0":"#333333",boxShadow:s?"0 4px 12px rgba(33, 150, 243, 0.3)":"none"}),themeToggle:{position:"fixed",top:"20px",right:"20px",padding:"10px 20px",border:"none",borderRadius:"20px",cursor:"pointer",backgroundColor:i?"#4a9eff":"#2196F3",color:"#ffffff",fontWeight:"600",boxShadow:"0 2px 8px rgba(0,0,0,0.2)"},content:{backgroundColor:i?"#252525":"#f9f9f9",padding:"30px",borderRadius:"12px",boxShadow:"0 4px 20px rgba(0,0,0,0.1)"},sectionTitle:{fontSize:"2em",marginTop:"0",marginBottom:"20px",color:i?"#4a9eff":"#2196F3"},codeBlock:{backgroundColor:i?"#1a1a1a":"#f4f4f4",padding:"15px",borderRadius:"8px",fontFamily:'Monaco, Consolas, "Courier New", monospace',fontSize:"0.9em",overflowX:"auto",border:`1px solid ${i?"#3a3a3a":"#e0e0e0"}`,margin:"15px 0"},infoBox:{backgroundColor:i?"#2a4a2a":"#e8f5e9",padding:"15px",borderRadius:"8px",borderLeft:"4px solid #4caf50",margin:"15px 0"},warningBox:{backgroundColor:i?"#4a3a2a":"#fff3e0",padding:"15px",borderRadius:"8px",borderLeft:"4px solid #ff9800",margin:"15px 0"}}),ot=()=>{const[i,s]=x.useState("decision-tree"),[a,o]=x.useState(!1),l=Z(a),d=[{id:"decision-tree",name:"Decision Tree"},{id:"random-forest",name:"Random Forest"},{id:"gradient-boosting",name:"Gradient Boosting"},{id:"xgboost",name:"XGBoost"},{id:"svm",name:"SVM"}];return e.jsxs("div",{style:l.container,children:[e.jsx("button",{style:l.themeToggle,onClick:()=>o(!a),children:a?"☀️ Light":"🌙 Dark"}),e.jsxs("header",{style:l.header,children:[e.jsx("h1",{style:l.title,children:"Machine Learning Models Explorer"}),e.jsx("p",{style:l.subtitle,children:"Interactive Guide to 5 Essential ML Algorithms"})]}),e.jsx("nav",{style:l.navigation,children:d.map(n=>e.jsx("button",{style:l.navButton(i===n.id),onClick:()=>s(n.id),children:n.name},n.id))}),e.jsxs("main",{style:l.content,children:[i==="decision-tree"&&e.jsx(lt,{isDarkMode:a}),i==="random-forest"&&e.jsx(ct,{isDarkMode:a}),i==="gradient-boosting"&&e.jsx(mt,{isDarkMode:a}),i==="xgboost"&&e.jsx(gt,{isDarkMode:a}),i==="svm"&&e.jsx(xt,{isDarkMode:a})]})]})},lt=({isDarkMode:i})=>{const s=Z(i),[a,o]=x.useState(3),[l,d]=x.useState(2),[n,r]=x.useState([]);x.useEffect(()=>{p()},[]);const p=()=>{const m=[];for(let c=0;c<50;c++)m.push({x:Math.random()*100,y:Math.random()*100,class:Math.random()>.5?"A":"B"});r(m)};return e.jsxs("div",{children:[e.jsx("h2",{style:s.sectionTitle,children:"🌳 Decision Tree Classifier"}),e.jsxs("div",{style:s.infoBox,children:[e.jsx("strong",{children:"What is it?"}),' A decision tree makes predictions by asking a series of yes/no questions about the data, splitting it into smaller groups until reaching a decision. Think of it like the game "20 Questions" - each question narrows down the possibilities.']}),e.jsx("h3",{children:"📚 Beginner Explanation"}),e.jsx("p",{children:"Imagine you're trying to decide if you should bring an umbrella. You might ask:"}),e.jsxs("ul",{children:[e.jsx("li",{children:'"Is it cloudy?" → If YES, ask "Is the humidity high?"'}),e.jsx("li",{children:'If humidity is high → "Bring umbrella!"'}),e.jsx("li",{children:`If humidity is low → "Don't bring umbrella"`})]}),e.jsx("p",{children:'Decision trees work the same way but with data. At each "node" (decision point), the tree asks a question about a feature (like "Is age > 30?") and splits the data based on the answer.'}),e.jsx("h3",{children:"🔧 In scikit-learn"}),e.jsx("div",{style:s.codeBlock,children:e.jsx("pre",{children:`from sklearn.tree import DecisionTreeClassifier

# Create the model
dt = DecisionTreeClassifier(
    max_depth=${a},           # How deep the tree can grow
    min_samples_split=${l}  # Minimum samples to split a node
)

# Train the model
dt.fit(X_train, y_train)

# Make predictions
predictions = dt.predict(X_test)`})}),e.jsx("h3",{children:"🎮 Interactive Demo"}),e.jsx(dt,{maxDepth:a,minSamples:l,dataPoints:n,isDarkMode:i}),e.jsxs("div",{style:{margin:"20px 0"},children:[e.jsxs("label",{style:{display:"block",marginBottom:"10px"},children:[e.jsx("strong",{children:"Max Depth:"})," ",a,e.jsx("input",{type:"range",min:"1",max:"10",value:a,onChange:m=>o(parseInt(m.target.value)),style:{width:"100%",marginTop:"5px"}})]}),e.jsxs("label",{style:{display:"block",marginBottom:"10px"},children:[e.jsx("strong",{children:"Min Samples Split:"})," ",l,e.jsx("input",{type:"range",min:"2",max:"20",value:l,onChange:m=>d(parseInt(m.target.value)),style:{width:"100%",marginTop:"5px"}})]}),e.jsx("button",{onClick:p,style:{padding:"10px 20px",backgroundColor:i?"#4a9eff":"#2196F3",color:"#ffffff",border:"none",borderRadius:"5px",cursor:"pointer",fontWeight:"600"},children:"Generate New Data"})]}),e.jsx("h3",{children:"💡 Key Concepts"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Splitting Criteria:"})," The tree uses Gini impurity or entropy to decide the best question to ask"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Max Depth:"})," Controls how many questions the tree can ask. Too deep = overfitting!"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Overfitting:"})," When the tree memorizes training data instead of learning patterns"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Pruning:"})," Removing unnecessary branches to improve generalization"]})]}),e.jsxs("div",{style:s.warningBox,children:[e.jsx("strong",{children:"⚠️ Common Pitfall:"})," Decision trees can easily overfit if allowed to grow too deep. They'll create very specific rules that work perfectly on training data but fail on new data."]}),e.jsx("h3",{children:"🎯 When to Use"}),e.jsxs("ul",{children:[e.jsx("li",{children:"✅ Need interpretable results (can explain decisions to non-technical stakeholders)"}),e.jsx("li",{children:"✅ Have mixed data types (numerical and categorical)"}),e.jsx("li",{children:"✅ Want fast training and prediction"}),e.jsx("li",{children:"❌ Have noisy data (trees are sensitive to small variations)"}),e.jsx("li",{children:"❌ Need the highest accuracy (ensemble methods usually better)"})]}),e.jsx("h3",{children:"🏆 Real-World Applications"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Medical Diagnosis:"}),' "If symptom A present AND test B positive → Disease X likely"']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Credit Scoring:"}),' "If income > $50k AND credit history good → Approve loan"']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Customer Segmentation:"}),' "If age < 25 AND online shopper → Target with mobile ads"']})]})]})},dt=({maxDepth:i,minSamples:s,dataPoints:a,isDarkMode:o})=>{const l=x.useRef(null);return x.useEffect(()=>{if(!l.current||a.length===0)return;const d=l.current,n=d.getContext("2d"),r=d.width,p=d.height;n.fillStyle=o?"#1a1a1a":"#ffffff",n.fillRect(0,0,r,p),n.strokeStyle=o?"#333333":"#e0e0e0",n.lineWidth=1;for(let c=0;c<=10;c++)n.beginPath(),n.moveTo(c*r/10,0),n.lineTo(c*r/10,p),n.stroke(),n.beginPath(),n.moveTo(0,c*p/10),n.lineTo(r,c*p/10),n.stroke();const m=Math.min(i,3);n.strokeStyle=o?"#4a9eff":"#2196F3",n.lineWidth=2;for(let c=0;c<m;c++){const u=(c+1)*(r/(m+1));n.beginPath(),n.moveTo(u,0),n.lineTo(u,p),n.stroke()}a.forEach(c=>{const u=c.x/100*r,h=c.y/100*p;n.beginPath(),n.arc(u,h,4,0,2*Math.PI),n.fillStyle=c.class==="A"?o?"#ff6b6b":"#e53935":o?"#51cf66":"#43a047",n.fill(),n.strokeStyle=o?"#ffffff":"#000000",n.lineWidth=1,n.stroke()}),n.fillStyle=o?"#e0e0e0":"#333333",n.font="14px sans-serif",n.fillText("Decision Boundaries",10,20),n.fillText(`Depth: ${i}, Min Samples: ${s}`,10,40)},[i,s,a,o]),e.jsxs("div",{style:{border:`2px solid ${o?"#4a9eff":"#2196F3"}`,borderRadius:"8px",padding:"10px",margin:"20px 0"},children:[e.jsx("canvas",{ref:l,width:600,height:400,style:{display:"block",margin:"0 auto",maxWidth:"100%",height:"auto"}}),e.jsxs("div",{style:{textAlign:"center",marginTop:"10px",fontSize:"0.9em"},children:[e.jsx("span",{style:{color:o?"#ff6b6b":"#e53935"},children:"● Class A"})," | ",e.jsx("span",{style:{color:o?"#51cf66":"#43a047"},children:"● Class B"})," | ",e.jsx("span",{style:{color:o?"#4a9eff":"#2196F3"},children:"━ Decision Boundaries"})]})]})},ct=({isDarkMode:i})=>{const s=Z(i),[a,o]=x.useState(10),[l,d]=x.useState(5),[n,r]=x.useState(!1);return e.jsxs("div",{children:[e.jsx("h2",{style:s.sectionTitle,children:"🌲 Random Forest Classifier"}),e.jsxs("div",{style:s.infoBox,children:[e.jsx("strong",{children:"What is it?"}),' A Random Forest is like getting advice from multiple experts instead of just one. It creates many decision trees (a "forest") and combines their predictions through voting. This "wisdom of crowds" approach usually gives better results than any single tree.']}),e.jsx("h3",{children:"📚 Beginner Explanation"}),e.jsx("p",{children:"Imagine you're trying to predict if a movie will be good. Instead of asking just one friend, you ask 10 friends. Each friend has different tastes (different trees), but together their consensus is usually more reliable than any individual opinion."}),e.jsx("p",{children:"Random Forest does this with decision trees:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Creates many trees, each trained on a random subset of data (bootstrapping)"}),e.jsx("li",{children:"Each tree considers only a random subset of features at each split"}),e.jsx("li",{children:"Final prediction is the majority vote from all trees"})]}),e.jsx("h3",{children:"🔧 In scikit-learn"}),e.jsx("div",{style:s.codeBlock,children:e.jsx("pre",{children:`from sklearn.ensemble import RandomForestClassifier

# Create the model
rf = RandomForestClassifier(
    n_estimators=${a},      # Number of trees in the forest
    max_depth=${l},          # Maximum depth of each tree
    max_features='sqrt',    # Number of features to consider per split
    bootstrap=True,         # Use bootstrap samples
    n_jobs=-1              # Use all CPU cores
)

# Train the model
rf.fit(X_train, y_train)

# Get predictions with probability
predictions = rf.predict(X_test)
probabilities = rf.predict_proba(X_test)

# Feature importance
importance = rf.feature_importances_`})}),e.jsx("h3",{children:"🎮 Interactive Demo: Forest Voting"}),e.jsx(be,{numTrees:a,showAnimation:n,isDarkMode:i}),e.jsxs("div",{style:{margin:"20px 0"},children:[e.jsxs("label",{style:{display:"block",marginBottom:"10px"},children:[e.jsx("strong",{children:"Number of Trees:"})," ",a,e.jsx("input",{type:"range",min:"1",max:"100",value:a,onChange:p=>o(parseInt(p.target.value)),style:{width:"100%",marginTop:"5px"}})]}),e.jsxs("label",{style:{display:"block",marginBottom:"10px"},children:[e.jsx("strong",{children:"Max Depth per Tree:"})," ",l,e.jsx("input",{type:"range",min:"1",max:"20",value:l,onChange:p=>d(parseInt(p.target.value)),style:{width:"100%",marginTop:"5px"}})]}),e.jsx("button",{onClick:()=>r(!n),style:{padding:"10px 20px",backgroundColor:i?"#4a9eff":"#2196F3",color:"#ffffff",border:"none",borderRadius:"5px",cursor:"pointer",fontWeight:"600"},children:n?"Stop Animation":"Animate Voting"})]}),e.jsx("h3",{children:"💡 Key Concepts"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Bagging (Bootstrap Aggregating):"})," Each tree trains on a random sample with replacement"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Feature Randomness:"})," Each split considers only a subset of features (typically √n features)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Out-of-Bag (OOB) Error:"})," Free validation using data not seen by each tree"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Ensemble Learning:"})," Combining weak learners to create a strong learner"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Feature Importance:"})," Ranks which features are most useful for predictions"]})]}),e.jsx("h3",{children:"🔬 Intermediate Concepts"}),e.jsx("h4",{children:"Why Random Forest Reduces Overfitting"}),e.jsx("p",{children:'Single decision trees are "high variance" - small changes in training data cause big changes in the tree structure. Random Forest reduces variance through:'}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Averaging:"})," Averaging many high-variance models reduces overall variance"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Decorrelation:"})," Random feature selection makes trees less correlated"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Regularization:"})," Each tree sees different data, preventing memorization"]})]}),e.jsx("h4",{children:"Bias-Variance Tradeoff"}),e.jsx("div",{style:s.codeBlock,children:e.jsx("pre",{children:`# Single tree: Low bias, High variance
# → Can fit data perfectly but predictions vary wildly

# Random Forest: Low bias, Lower variance  
# → Maintains flexibility while stabilizing predictions

# Mathematical intuition:
# Var(Average) = Var(Tree) / n_trees * (1 + (n-1)*ρ)
# where ρ is correlation between trees`})}),e.jsxs("div",{style:s.warningBox,children:[e.jsx("strong",{children:"⚠️ Common Pitfall:"})," More trees is almost always better, but there are diminishing returns after ~100-500 trees. Training time increases linearly, but accuracy improvement plateaus."]}),e.jsx("h3",{children:"🎯 Hyperparameter Tuning Guide"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"n_estimators:"})," Start with 100, increase if validation error still decreasing"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"max_depth:"})," Start with None (unlimited), reduce if overfitting"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"min_samples_split:"})," Higher values prevent overfitting (try 2-10)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"max_features:"})," 'sqrt' for classification, 'log2' or 1/3 for regression"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"bootstrap:"}),' Keep True for standard RF, False for "Extremely Randomized Trees"']})]}),e.jsx("h3",{children:"🏆 Real-World Applications"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Banking:"})," Credit risk assessment, fraud detection (handles imbalanced data well)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Healthcare:"})," Disease prediction from patient records (provides feature importance)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"E-commerce:"})," Customer churn prediction, recommendation systems"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Finance:"})," Stock price movement prediction, algorithmic trading"]})]}),e.jsx("h3",{children:"📊 When Random Forest Excels"}),e.jsxs("ul",{children:[e.jsx("li",{children:"✅ Tabular data with mixed feature types"}),e.jsx("li",{children:"✅ Need feature importance rankings"}),e.jsx("li",{children:'✅ Want good "out-of-box" performance without much tuning'}),e.jsx("li",{children:"✅ Can tolerate longer training time for better accuracy"}),e.jsx("li",{children:"❌ Need model interpretability (individual trees are interpretable, forest as whole is not)"}),e.jsx("li",{children:"❌ Working with very high-dimensional sparse data (like text, XGBoost may be better)"})]})]})},be=({numTrees:i,showAnimation:s,isDarkMode:a})=>{const[o,l]=x.useState([]),[d,n]=x.useState(null);x.useEffect(()=>{const u=[];let h=0,f=0;for(let g=0;g<i;g++){const b=Math.random()>.45?"A":"B";u.push({id:g,prediction:b,confidence:.6+Math.random()*.3}),b==="A"?h++:f++}l(u),n(h>f?"A":"B")},[i,s]);const r=o.filter(u=>u.prediction==="A").length,p=o.filter(u=>u.prediction==="B").length,m=i>0?(r/i*100).toFixed(1):0,c=i>0?(p/i*100).toFixed(1):0;return e.jsxs("div",{style:{border:`2px solid ${a?"#4a9eff":"#2196F3"}`,borderRadius:"8px",padding:"20px",margin:"20px 0",backgroundColor:a?"#1a1a1a":"#ffffff"},children:[e.jsx("h4",{style:{marginTop:0},children:"Forest Prediction Process"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(40px, 1fr))",gap:"5px",marginBottom:"20px"},children:o.slice(0,100).map(u=>e.jsx("div",{style:{width:"40px",height:"40px",backgroundColor:u.prediction==="A"?a?"#ff6b6b":"#e53935":a?"#51cf66":"#43a047",borderRadius:"4px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.8em",fontWeight:"bold",color:"#ffffff",opacity:s?.5+u.confidence*.5:1,transition:"opacity 0.3s ease"},title:`Tree ${u.id+1}: ${u.prediction} (${(u.confidence*100).toFixed(0)}%)`,children:u.prediction},u.id))}),e.jsxs("div",{style:{display:"flex",gap:"20px",alignItems:"center",justifyContent:"space-around",marginTop:"20px",padding:"15px",backgroundColor:a?"#252525":"#f5f5f5",borderRadius:"8px"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontSize:"2em",fontWeight:"bold",color:a?"#ff6b6b":"#e53935"},children:r}),e.jsx("div",{children:"Class A Votes"}),e.jsxs("div",{style:{fontSize:"0.9em",color:a?"#a0a0a0":"#666"},children:["(",m,"%)"]})]}),e.jsx("div",{style:{fontSize:"3em",color:a?"#4a9eff":"#2196F3"},children:"→"}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontSize:"2em",fontWeight:"bold",color:a?"#51cf66":"#43a047"},children:p}),e.jsx("div",{children:"Class B Votes"}),e.jsxs("div",{style:{fontSize:"0.9em",color:a?"#a0a0a0":"#666"},children:["(",c,"%)"]})]}),e.jsx("div",{style:{fontSize:"3em",color:a?"#4a9eff":"#2196F3"},children:"→"}),e.jsxs("div",{style:{padding:"20px",backgroundColor:d==="A"?a?"#ff6b6b":"#e53935":a?"#51cf66":"#43a047",borderRadius:"8px",color:"#ffffff"},children:[e.jsx("div",{style:{fontSize:"0.9em"},children:"Final Prediction"}),e.jsxs("div",{style:{fontSize:"2.5em",fontWeight:"bold"},children:["Class ",d]})]})]}),e.jsx("p",{style:{marginTop:"20px",fontSize:"0.9em",textAlign:"center",fontStyle:"italic"},children:"The forest votes: majority wins! This is why Random Forest is more stable than a single tree."})]})},mt=({isDarkMode:i})=>{const s=Z(i),[a,o]=x.useState(50),[l,d]=x.useState(.1),[n,r]=x.useState(3);return e.jsxs("div",{children:[e.jsx("h2",{style:s.sectionTitle,children:"📈 Gradient Boosting Machines"}),e.jsxs("div",{style:s.infoBox,children:[e.jsx("strong",{children:"What is it?"})," Gradient Boosting builds trees sequentially, where each new tree tries to fix the mistakes made by the previous trees. It's like learning from your errors - each iteration focuses on the examples you got wrong before."]}),e.jsx("h3",{children:"📚 Beginner Explanation"}),e.jsx("p",{children:"Imagine you're learning to shoot basketball free throws:"}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Attempt 1:"}),' You shoot and miss short. You learn "need more power"']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Attempt 2:"}),' You overshoot. You learn "a bit less power"']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Attempt 3:"})," Getting closer! You adjust again..."]})]}),e.jsx("p",{children:"Gradient Boosting works similarly:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Build a simple model (weak learner)"}),e.jsx("li",{children:"Find where it makes mistakes (residuals)"}),e.jsx("li",{children:"Build another model to predict those mistakes"}),e.jsx("li",{children:"Add the correction to the original prediction"}),e.jsx("li",{children:"Repeat until predictions are good enough"})]}),e.jsx("h3",{children:"🔧 In scikit-learn"}),e.jsx("div",{style:s.codeBlock,children:e.jsx("pre",{children:`from sklearn.ensemble import GradientBoostingClassifier

# Create the model
gb = GradientBoostingClassifier(
    n_estimators=${a},      # Number of boosting stages
    learning_rate=${l},     # Shrinks contribution of each tree
    max_depth=${n},              # Depth of individual trees (usually shallow)
    subsample=0.8,              # Fraction of samples for each tree
    min_samples_split=2,        # Min samples to split node
    loss='log_loss',            # Loss function to optimize
    validation_fraction=0.1,    # For early stopping
    n_iter_no_change=10        # Stop if no improvement
)

# Train the model
gb.fit(X_train, y_train)

# Predictions
predictions = gb.predict(X_test)

# Staged predictions (from each boosting iteration)
staged_preds = list(gb.staged_predict(X_test))`})}),e.jsx("h3",{children:"🎮 Interactive Demo: Boosting Iterations"}),e.jsx(pt,{numEstimators:a,learningRate:l,maxDepth:n,isDarkMode:i}),e.jsxs("div",{style:{margin:"20px 0"},children:[e.jsxs("label",{style:{display:"block",marginBottom:"10px"},children:[e.jsx("strong",{children:"Number of Estimators (Trees):"})," ",a,e.jsx("input",{type:"range",min:"10",max:"200",step:"10",value:a,onChange:p=>o(parseInt(p.target.value)),style:{width:"100%",marginTop:"5px"}})]}),e.jsxs("label",{style:{display:"block",marginBottom:"10px"},children:[e.jsx("strong",{children:"Learning Rate:"})," ",l.toFixed(2),e.jsx("input",{type:"range",min:"0.01",max:"1",step:"0.01",value:l,onChange:p=>d(parseFloat(p.target.value)),style:{width:"100%",marginTop:"5px"}})]}),e.jsxs("label",{style:{display:"block",marginBottom:"10px"},children:[e.jsx("strong",{children:"Max Depth (per tree):"})," ",n,e.jsx("input",{type:"range",min:"1",max:"10",value:n,onChange:p=>r(parseInt(p.target.value)),style:{width:"100%",marginTop:"5px"}})]})]}),e.jsx("h3",{children:"💡 Key Concepts"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Boosting:"})," Sequential learning where each model corrects its predecessor"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Residuals:"})," The errors/mistakes from the current prediction"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Gradient Descent:"})," Uses calculus to find the best direction to improve"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Weak Learners:"})," Simple models (shallow trees) that are slightly better than random"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Learning Rate:"})," Controls how much each tree contributes (smaller = more trees needed but better generalization)"]})]}),e.jsx("h3",{children:"🔬 Intermediate: The Math Behind It"}),e.jsx("div",{style:s.codeBlock,children:e.jsx("pre",{children:`# Gradient Boosting Algorithm (Simplified)

# Initialize with a constant prediction
F₀(x) = average(y)

# For each iteration m = 1 to M:
for m in range(M):
    # 1. Calculate residuals (negative gradient)
    residuals = y_true - F_{m-1}(x)
    
    # 2. Fit a new tree to the residuals
    h_m(x) = DecisionTree(X, residuals, max_depth=${n})
    
    # 3. Update the model with learning rate
    F_m(x) = F_{m-1}(x) + learning_rate * h_m(x)

# Final prediction
prediction = F_M(x)`})}),e.jsx("h4",{children:'Why "Gradient"?'}),e.jsx("p",{children:"The algorithm minimizes a loss function using gradient descent:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Loss function L(y, F(x)) measures prediction error"}),e.jsx("li",{children:"Gradient ∂L/∂F tells us the direction to improve"}),e.jsx("li",{children:"Each tree approximates the negative gradient (steepest descent direction)"}),e.jsx("li",{children:"Learning rate α controls step size: F_new = F_old - α * gradient"})]}),e.jsx("h3",{children:"⚖️ Random Forest vs. Gradient Boosting"}),e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",margin:"20px 0"},children:[e.jsx("thead",{children:e.jsxs("tr",{style:{backgroundColor:i?"#2a2a2a":"#f0f0f0"},children:[e.jsx("th",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Aspect"}),e.jsx("th",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Random Forest"}),e.jsx("th",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Gradient Boosting"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Tree Building"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Parallel (independent)"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Sequential (dependent)"})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Tree Depth"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Deep trees"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Shallow trees (3-8 levels)"})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Overfitting Risk"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Lower (averaging reduces variance)"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Higher (if not regularized)"})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Training Speed"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Fast (can parallelize)"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Slower (sequential)"})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Accuracy"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Good"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Often better with tuning"})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Interpretability"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Moderate"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Lower (complex interactions)"})]})]})]}),e.jsxs("div",{style:s.warningBox,children:[e.jsx("strong",{children:"⚠️ Common Pitfalls:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Overfitting:"})," Too many trees or too high learning rate causes memorization"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Long Training:"})," Sequential nature makes training slow on large datasets"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Sensitive to Noise:"})," Outliers in data can throw off the boosting process"]})]})]}),e.jsx("h3",{children:"🎯 Hyperparameter Tuning Strategy"}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Start with:"})," n_estimators=100, learning_rate=0.1, max_depth=3"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Tune learning_rate and n_estimators together:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Lower learning_rate requires more estimators"}),e.jsx("li",{children:"Try: (0.1, 100), (0.05, 200), (0.01, 500)"})]})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Adjust max_depth:"})," Usually 3-8 for GB (vs deeper for RF)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Add regularization:"})," subsample < 1.0, min_samples_split > 2"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Enable early stopping:"})," Saves time and prevents overfitting"]})]}),e.jsx("h3",{children:"🏆 Real-World Applications"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Kaggle Competitions:"})," Historically dominated by GBMs before deep learning"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Click-Through Rate Prediction:"})," Ad platforms use GBM for CTR prediction"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Risk Assessment:"})," Insurance pricing, loan default prediction"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Ranking Problems:"})," Search engines, recommendation systems"]})]}),e.jsx("h3",{children:"📊 When to Use Gradient Boosting"}),e.jsxs("ul",{children:[e.jsx("li",{children:"✅ Need highest possible accuracy on structured data"}),e.jsx("li",{children:"✅ Have time for hyperparameter tuning"}),e.jsx("li",{children:"✅ Data is relatively clean (not too many outliers)"}),e.jsx("li",{children:"✅ Can afford longer training time"}),e.jsx("li",{children:"❌ Need fast training (use Random Forest)"}),e.jsx("li",{children:"❌ Want robust model without much tuning (use Random Forest)"}),e.jsx("li",{children:"❌ Have extremely large datasets (consider XGBoost/LightGBM instead)"})]})]})},pt=({numEstimators:i,learningRate:s,maxDepth:a,isDarkMode:o})=>{const l=Z(o),[d,n]=x.useState([]),[r,p]=x.useState([]);return x.useEffect(()=>{const m=[],c=[];let u=.5,h=.52;for(let f=0;f<i;f++){const g=s*.01*(1-f/i);u=Math.max(.05,u-g);const b=s*.008*(1-f/i);f<i*.7?h=Math.max(.08,h-b):h+=s*.001,m.push(u),c.push(h)}n(m),p(c)},[i,s,a]),e.jsxs("div",{style:{border:`2px solid ${o?"#4a9eff":"#2196F3"}`,borderRadius:"8px",padding:"20px",margin:"20px 0",backgroundColor:o?"#1a1a1a":"#ffffff"},children:[e.jsx("h4",{style:{marginTop:0},children:"Error Reduction Over Boosting Iterations"}),e.jsx(ht,{trainingError:d,validationError:r,numEstimators:i,isDarkMode:o}),e.jsxs("div",{style:{marginTop:"20px",fontSize:"0.9em"},children:[e.jsx("p",{children:e.jsx("strong",{children:"Key Observations:"})}),e.jsxs("ul",{children:[e.jsxs("li",{children:["🔵 ",e.jsx("strong",{children:"Training Error"})," continuously decreases (model learning)"]}),e.jsxs("li",{children:["🟢 ",e.jsx("strong",{children:"Validation Error"})," decreases then may increase (overfitting)"]}),e.jsxs("li",{children:["⚠️ ",e.jsx("strong",{children:"Optimal Point:"})," Where validation error is minimized"]}),e.jsxs("li",{children:["💡 ",e.jsx("strong",{children:"Learning Rate Effect:"})," Lower LR = smoother curve, more iterations needed"]})]})]}),e.jsxs("div",{style:l.infoBox,children:[e.jsx("strong",{children:"Early Stopping:"})," In practice, you'd stop training when validation error stops improving for N consecutive iterations. This prevents overfitting and saves computation time."]})]})},ht=({trainingError:i,validationError:s,numEstimators:a,isDarkMode:o})=>{const l=x.useRef(null);return x.useEffect(()=>{if(!l.current)return;const d=l.current,n=d.getContext("2d"),r=d.width,p=d.height,m=40;if(n.fillStyle=o?"#1a1a1a":"#ffffff",n.fillRect(0,0,r,p),n.strokeStyle=o?"#666666":"#999999",n.lineWidth=2,n.beginPath(),n.moveTo(m,m),n.lineTo(m,p-m),n.lineTo(r-m,p-m),n.stroke(),n.fillStyle=o?"#e0e0e0":"#333333",n.font="12px sans-serif",n.fillText("Error",5,m),n.fillText("Iterations",r/2-20,p-10),i.length===0)return;const c=r-2*m,u=p-2*m,h=Math.max(...i,...s);n.strokeStyle=o?"#4a9eff":"#2196F3",n.lineWidth=2,n.beginPath(),i.forEach((j,C)=>{const S=m+C/(i.length-1)*c,N=m+(1-j/h)*u;C===0?n.moveTo(S,N):n.lineTo(S,N)}),n.stroke(),n.strokeStyle=o?"#51cf66":"#43a047",n.lineWidth=2,n.beginPath(),s.forEach((j,C)=>{const S=m+C/(s.length-1)*c,N=m+(1-j/h)*u;C===0?n.moveTo(S,N):n.lineTo(S,N)}),n.stroke();const f=Math.min(...s),g=s.indexOf(f),b=m+g/(s.length-1)*c,v=m+(1-f/h)*u;n.fillStyle=o?"#ff6b6b":"#e53935",n.beginPath(),n.arc(b,v,5,0,2*Math.PI),n.fill();const _=r-m-150,w=m+10;n.fillStyle=o?"#4a9eff":"#2196F3",n.fillRect(_,w,20,10),n.fillStyle=o?"#e0e0e0":"#333333",n.fillText("Training Error",_+25,w+10),n.fillStyle=o?"#51cf66":"#43a047",n.fillRect(_,w+20,20,10),n.fillStyle=o?"#e0e0e0":"#333333",n.fillText("Validation Error",_+25,w+30),n.fillStyle=o?"#ff6b6b":"#e53935",n.fillRect(_,w+40,20,10),n.fillStyle=o?"#e0e0e0":"#333333",n.fillText("Optimal Point",_+25,w+50)},[i,s,a,o]),e.jsx("canvas",{ref:l,width:600,height:400,style:{display:"block",margin:"0 auto",maxWidth:"100%",height:"auto"}})},gt=({isDarkMode:i})=>{const s=Z(i),[a,o]=x.useState(.3),[l,d]=x.useState(6),[n,r]=x.useState(100);return e.jsxs("div",{children:[e.jsx("h2",{style:s.sectionTitle,children:"🚀 XGBoost (Extreme Gradient Boosting)"}),e.jsxs("div",{style:s.infoBox,children:[e.jsx("strong",{children:"What is it?"})," XGBoost is an optimized, production-ready implementation of gradient boosting with additional features like regularization, parallel processing, and handling missing values. It's the algorithm that won countless Kaggle competitions and is used by tech giants for production ML systems."]}),e.jsx("h3",{children:"📚 From Gradient Boosting to XGBoost"}),e.jsx("p",{children:"XGBoost takes the gradient boosting concept and adds crucial improvements:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Regularization:"})," Built-in L1 (Lasso) and L2 (Ridge) regularization to prevent overfitting"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Parallel Processing:"})," Fast tree construction using parallel computation"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Tree Pruning:"}),' Uses "max_depth" first then prunes backward (more efficient)']}),e.jsxs("li",{children:[e.jsx("strong",{children:"Missing Values:"})," Learns best direction for missing values during training"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Cross-Validation:"})," Built-in CV for early stopping"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Continues Training:"})," Can add more trees to an existing model"]})]}),e.jsx("h3",{children:"🔧 In XGBoost Library"}),e.jsx("div",{style:s.codeBlock,children:e.jsx("pre",{children:`import xgboost as xgb
from xgboost import XGBClassifier

# Method 1: Scikit-learn compatible API
xgb_clf = XGBClassifier(
    n_estimators=${n},     # Number of boosting rounds
    learning_rate=${a},    # Step size (eta)
    max_depth=${l},          # Maximum tree depth
    min_child_weight=1,     # Minimum sum of instance weight in child
    gamma=0,                # Minimum loss reduction for split
    subsample=0.8,          # Fraction of samples per tree
    colsample_bytree=0.8,   # Fraction of features per tree
    reg_alpha=0,            # L1 regularization
    reg_lambda=1,           # L2 regularization
    objective='binary:logistic',  # Loss function
    eval_metric='auc',      # Evaluation metric
    early_stopping_rounds=10,
    n_jobs=-1               # Use all CPU cores
)

# Train with validation set
xgb_clf.fit(
    X_train, y_train,
    eval_set=[(X_train, y_train), (X_val, y_val)],
    verbose=True
)

# Method 2: Native XGBoost API (more features)
dtrain = xgb.DMatrix(X_train, label=y_train)
dval = xgb.DMatrix(X_val, label=y_val)

params = {
    'eta': ${a},
    'max_depth': ${l},
    'objective': 'binary:logistic',
    'eval_metric': 'auc'
}

evals = [(dtrain, 'train'), (dval, 'val')]
bst = xgb.train(
    params, 
    dtrain, 
    num_boost_round=${n},
    evals=evals,
    early_stopping_rounds=10,
    verbose_eval=10
)

# Feature importance
importance = bst.get_score(importance_type='gain')

# Save model
bst.save_model('xgb_model.json')`})}),e.jsx("h3",{children:"🎮 Interactive Demo: XGBoost Training"}),e.jsx(ut,{eta:a,maxDepth:l,numRounds:n,isDarkMode:i}),e.jsxs("div",{style:{margin:"20px 0"},children:[e.jsxs("label",{style:{display:"block",marginBottom:"10px"},children:[e.jsx("strong",{children:"Learning Rate (eta):"})," ",a.toFixed(2),e.jsx("input",{type:"range",min:"0.01",max:"0.5",step:"0.01",value:a,onChange:p=>o(parseFloat(p.target.value)),style:{width:"100%",marginTop:"5px"}})]}),e.jsxs("label",{style:{display:"block",marginBottom:"10px"},children:[e.jsx("strong",{children:"Max Depth:"})," ",l,e.jsx("input",{type:"range",min:"3",max:"15",value:l,onChange:p=>d(parseInt(p.target.value)),style:{width:"100%",marginTop:"5px"}})]}),e.jsxs("label",{style:{display:"block",marginBottom:"10px"},children:[e.jsx("strong",{children:"Number of Rounds:"})," ",n,e.jsx("input",{type:"range",min:"50",max:"500",step:"50",value:n,onChange:p=>r(parseInt(p.target.value)),style:{width:"100%",marginTop:"5px"}})]})]}),e.jsx("h3",{children:"💡 Key XGBoost Concepts"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"DMatrix:"})," Optimized data structure for XGBoost (faster than numpy arrays)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"eta (learning_rate):"})," Shrinkage to prevent overfitting (typical: 0.01-0.3)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"gamma:"})," Minimum loss reduction to make split (regularization)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"lambda & alpha:"})," L2 and L1 regularization terms"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"subsample & colsample:"})," Fraction of samples/features per tree (like RF)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"early_stopping:"})," Stops training when validation metric stops improving"]})]}),e.jsx("h3",{children:"🔬 Advanced: What Makes XGBoost Fast?"}),e.jsx("h4",{children:"1. Histogram-Based Algorithm"}),e.jsx("p",{children:"Instead of sorting continuous features for every split (O(n log n)), XGBoost bins features into histograms and uses these for split finding (much faster):"}),e.jsx("div",{style:s.codeBlock,children:e.jsx("pre",{children:`# Traditional approach: Sort for each split
for each feature:
    sorted_values = sort(feature_values)  # O(n log n)
    find_best_split(sorted_values)

# XGBoost histogram approach: Pre-compute bins
histograms = create_histograms(features)  # Once
for each feature:
    find_best_split(histograms[feature])  # O(k) where k << n`})}),e.jsx("h4",{children:"2. Parallel Tree Construction"}),e.jsx("p",{children:"XGBoost parallelizes the split finding process across features, not trees (trees are sequential):"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Each CPU core evaluates different features for the best split"}),e.jsx("li",{children:"Results are aggregated to choose the optimal split"}),e.jsx("li",{children:"Achieves near-linear speedup with multiple cores"})]}),e.jsx("h4",{children:"3. Cache-Aware Access"}),e.jsx("p",{children:"Data is organized to maximize CPU cache hits, reducing memory access time significantly."}),e.jsx("h4",{children:"4. Sparsity-Aware Algorithm"}),e.jsx("p",{children:"Efficiently handles missing values and sparse data (common in real-world datasets):"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Learns default direction for missing values during training"}),e.jsx("li",{children:"Only stores non-zero values in memory"}),e.jsx("li",{children:"Crucial for text data and datasets with many missing values"})]}),e.jsx("h3",{children:"⚙️ XGBoost vs. Scikit-learn GBM vs. LightGBM"}),e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",margin:"20px 0"},children:[e.jsx("thead",{children:e.jsxs("tr",{style:{backgroundColor:i?"#2a2a2a":"#f0f0f0"},children:[e.jsx("th",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Feature"}),e.jsx("th",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Scikit-learn"}),e.jsx("th",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"XGBoost"}),e.jsx("th",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"LightGBM"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Speed"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Moderate"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Fast"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Very Fast"})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Memory"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Moderate"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"High"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Low"})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Accuracy"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Good"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Excellent"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Excellent"})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Missing Values"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"No"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Yes"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Yes"})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Large Datasets"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Slow"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Good"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Best"})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Categorical"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Manual encoding"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Manual encoding"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Native support"})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Small Data"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Good"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Best"}),e.jsx("td",{style:{padding:"10px",border:`1px solid ${i?"#3a3a3a":"#ddd"}`},children:"Can overfit"})]})]})]}),e.jsx("h3",{children:"🎯 Hyperparameter Tuning Roadmap"}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Step 1: Fix learning_rate=0.1, tune tree parameters"}),e.jsxs("ul",{children:[e.jsx("li",{children:"max_depth: 3-10"}),e.jsx("li",{children:"min_child_weight: 1-10"}),e.jsx("li",{children:"gamma: 0-0.5"})]})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Step 2: Tune subsample and colsample_bytree"}),e.jsxs("ul",{children:[e.jsx("li",{children:"subsample: 0.6-0.9"}),e.jsx("li",{children:"colsample_bytree: 0.6-0.9"})]})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Step 3: Add regularization"}),e.jsxs("ul",{children:[e.jsx("li",{children:"reg_alpha: 0-1"}),e.jsx("li",{children:"reg_lambda: 1-2"})]})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Step 4: Lower learning_rate, increase n_estimators"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Try: eta=0.05, n_estimators=200"}),e.jsx("li",{children:"Then: eta=0.01, n_estimators=500"})]})]})]}),e.jsxs("div",{style:s.warningBox,children:[e.jsx("strong",{children:"⚠️ Common Mistakes:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Not using DMatrix:"})," Slower training with numpy arrays"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Ignoring early_stopping:"})," Training too long wastes time and overfits"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Wrong objective function:"})," Use 'binary:logistic' for binary classification, 'multi:softmax' for multiclass"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Not scaling:"})," While tree methods don't require scaling, it helps with regularization"]})]})]}),e.jsx("h3",{children:"🏆 Why XGBoost Dominates Kaggle"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Wins competitions:"})," Used in majority of winning Kaggle solutions (2015-2020)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Out-of-box performance:"})," Works well with default parameters"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Handles real-world data:"})," Missing values, imbalanced classes, mixed types"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Fast iteration:"})," Can experiment with hyperparameters quickly"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Feature engineering:"})," Built-in feature importance guides feature creation"]})]}),e.jsx("h3",{children:"🌍 Real-World Production Use"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Airbnb:"})," Listing search ranking"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Uber:"})," ETA prediction, driver-rider matching"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Microsoft:"})," Malware detection"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"PayPal:"})," Fraud detection"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Zillow:"})," Home price estimation (Zestimate)"]})]}),e.jsx("h3",{children:"📊 When to Use XGBoost"}),e.jsxs("ul",{children:[e.jsx("li",{children:"✅ Structured/tabular data"}),e.jsx("li",{children:"✅ Need state-of-the-art accuracy"}),e.jsx("li",{children:"✅ Have missing values"}),e.jsx("li",{children:"✅ Medium-sized datasets (1K - 10M rows)"}),e.jsx("li",{children:"✅ Competitions and important production models"}),e.jsx("li",{children:"❌ Very large datasets (>10M rows → use LightGBM)"}),e.jsx("li",{children:"❌ Image/text data (use deep learning)"}),e.jsx("li",{children:"❌ Need simple interpretable model (use decision tree)"}),e.jsx("li",{children:"❌ Extremely limited compute (use logistic regression)"})]})]})},ut=({eta:i,maxDepth:s,numRounds:a,isDarkMode:o})=>{const[l,d]=x.useState(!1),[n,r]=x.useState(0),[p,m]=x.useState([]);x.useEffect(()=>{const f=["Feature_A","Feature_B","Feature_C","Feature_D","Feature_E"].map(g=>({name:g,score:Math.random()*100}));f.sort((g,b)=>b.score-g.score),m(f)},[a]);const c=()=>{d(!0),r(0);const h=setInterval(()=>{r(f=>f>=a-1?(clearInterval(h),d(!1),a):f+1)},20)},u=a>0?n/a*100:0;return e.jsxs("div",{style:{border:`2px solid ${o?"#4a9eff":"#2196F3"}`,borderRadius:"8px",padding:"20px",margin:"20px 0",backgroundColor:o?"#1a1a1a":"#ffffff"},children:[e.jsx("h4",{style:{marginTop:0},children:"XGBoost Training Simulation"}),e.jsx("div",{style:{marginBottom:"20px"},children:e.jsx("button",{onClick:c,disabled:l,style:{padding:"12px 24px",backgroundColor:l?o?"#666666":"#cccccc":o?"#4a9eff":"#2196F3",color:"#ffffff",border:"none",borderRadius:"5px",cursor:l?"not-allowed":"pointer",fontWeight:"600",fontSize:"1em"},children:l?"Training...":"Start Training"})}),e.jsxs("div",{style:{marginBottom:"20px"},children:[e.jsxs("div",{style:{marginBottom:"5px",fontSize:"0.9em"},children:["Round: ",n," / ",a," (",u.toFixed(1),"%)"]}),e.jsx("div",{style:{width:"100%",height:"30px",backgroundColor:o?"#2a2a2a":"#e0e0e0",borderRadius:"15px",overflow:"hidden"},children:e.jsx("div",{style:{width:`${u}%`,height:"100%",backgroundColor:o?"#4a9eff":"#2196F3",transition:"width 0.3s ease",display:"flex",alignItems:"center",justifyContent:"center",color:"#ffffff",fontWeight:"bold",fontSize:"0.9em"},children:u>10&&`${u.toFixed(0)}%`})})]}),e.jsxs("div",{children:[e.jsx("h4",{children:"Feature Importance (Gain)"}),e.jsx("div",{style:{marginTop:"15px"},children:p.map((h,f)=>{const g=h.score/p[0].score*100;return e.jsxs("div",{style:{marginBottom:"12px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"4px",fontSize:"0.9em"},children:[e.jsx("span",{children:h.name}),e.jsx("span",{children:h.score.toFixed(1)})]}),e.jsx("div",{style:{width:"100%",height:"20px",backgroundColor:o?"#2a2a2a":"#e0e0e0",borderRadius:"10px",overflow:"hidden"},children:e.jsx("div",{style:{width:`${g}%`,height:"100%",backgroundColor:["#e53935","#fb8c00","#fdd835","#43a047","#1e88e5"][f],transition:"width 0.5s ease"}})})]},h.name)})})]}),e.jsxs("div",{style:{marginTop:"20px",padding:"15px",backgroundColor:o?"#252525":"#f5f5f5",borderRadius:"8px",fontSize:"0.9em"},children:[e.jsx("strong",{children:"Training Parameters:"}),e.jsxs("ul",{style:{margin:"10px 0",paddingLeft:"20px"},children:[e.jsxs("li",{children:["Learning Rate (eta): ",i.toFixed(2)]}),e.jsxs("li",{children:["Max Depth: ",s]}),e.jsxs("li",{children:["Number of Rounds: ",a]})]}),e.jsx("p",{style:{margin:0,fontStyle:"italic"},children:"💡 Feature importance shows which features contribute most to prediction accuracy. Higher values mean the feature is more useful for making splits."})]})]})},xt=({isDarkMode:i})=>{const s=Z(i),[a,o]=x.useState(1),[l,d]=x.useState("rbf"),[n,r]=x.useState(.1);return e.jsxs("div",{children:[e.jsx("h2",{style:s.sectionTitle,children:"🎯 Support Vector Machines (SVM)"}),e.jsxs("div",{style:s.infoBox,children:[e.jsx("strong",{children:"What is it?"}),' SVM finds the optimal boundary (hyperplane) that best separates different classes by maximizing the margin - the distance between the boundary and the nearest data points from each class. Think of it as drawing the "safest" line between two groups of points.']}),e.jsx("h3",{children:"📚 Beginner Explanation"}),e.jsx("p",{children:"Imagine you're a referee separating two teams on a field. You want to draw a line that:"}),e.jsxs("ol",{children:[e.jsx("li",{children:"Keeps the teams as far apart as possible"}),e.jsx("li",{children:'Has the maximum "buffer zone" on both sides'}),e.jsx("li",{children:"Is positioned based on the players closest to the line (support vectors)"})]}),e.jsx("p",{children:`The players closest to the line are the "support vectors" - they're the ones who matter most for determining where the boundary should be. Players far from the line don't influence its position.`}),e.jsx("h3",{children:"🔍 The Margin Concept"}),e.jsxs("p",{children:["The ",e.jsx("strong",{children:"margin"})," is the space between the decision boundary and the nearest data points. SVM tries to maximize this margin because:"]}),e.jsxs("ul",{children:[e.jsx("li",{children:"Larger margin = more confident predictions"}),e.jsx("li",{children:"New data points have more room for variation"}),e.jsx("li",{children:"Model is more robust to noise"})]}),e.jsx("h3",{children:"🔧 In scikit-learn"}),e.jsx("div",{style:s.codeBlock,children:e.jsx("pre",{children:`from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler

# IMPORTANT: Always scale data for SVM!
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Create the model
svm = SVC(
    C=${a.toFixed(1)},                    # Regularization parameter
    kernel='${l}',          # Kernel type: 'linear', 'rbf', 'poly', 'sigmoid'
    gamma=${n.toFixed(1)},            # Kernel coefficient (for rbf, poly, sigmoid)
    degree=3,               # Degree for polynomial kernel
    class_weight='balanced', # Handle imbalanced classes
    probability=True,       # Enable probability estimates
    random_state=42
)

# Train the model
svm.fit(X_train_scaled, y_train)

# Make predictions
predictions = svm.predict(X_test_scaled)
probabilities = svm.predict_proba(X_test_scaled)

# Get support vectors
support_vectors = svm.support_vectors_
n_support = svm.n_support_  # Number of support vectors per class`})}),e.jsx("h3",{children:"🎮 Interactive Demo: SVM Decision Boundary"}),e.jsx(ft,{C:a,kernel:l,gamma:n,isDarkMode:i}),e.jsxs("div",{style:{margin:"20px 0"},children:[e.jsxs("label",{style:{display:"block",marginBottom:"10px"},children:[e.jsx("strong",{children:"C (Regularization):"})," ",a.toFixed(1),e.jsx("input",{type:"range",min:"0.1",max:"10",step:"0.1",value:a,onChange:p=>o(parseFloat(p.target.value)),style:{width:"100%",marginTop:"5px"}}),e.jsx("div",{style:{fontSize:"0.85em",color:i?"#a0a0a0":"#666",marginTop:"3px"},children:"Low C: Large margin, more errors allowed. High C: Small margin, fewer errors."})]}),e.jsxs("label",{style:{display:"block",marginBottom:"10px"},children:[e.jsx("strong",{children:"Kernel:"}),e.jsxs("select",{value:l,onChange:p=>d(p.target.value),style:{width:"100%",padding:"8px",marginTop:"5px",backgroundColor:i?"#2a2a2a":"#ffffff",color:i?"#e0e0e0":"#333333",border:`1px solid ${i?"#4a4a4a":"#cccccc"}`,borderRadius:"4px"},children:[e.jsx("option",{value:"linear",children:"Linear"}),e.jsx("option",{value:"rbf",children:"RBF (Radial Basis Function)"}),e.jsx("option",{value:"poly",children:"Polynomial"}),e.jsx("option",{value:"sigmoid",children:"Sigmoid"})]})]}),l!=="linear"&&e.jsxs("label",{style:{display:"block",marginBottom:"10px"},children:[e.jsx("strong",{children:"Gamma:"})," ",n.toFixed(2),e.jsx("input",{type:"range",min:"0.01",max:"2",step:"0.01",value:n,onChange:p=>r(parseFloat(p.target.value)),style:{width:"100%",marginTop:"5px"}}),e.jsx("div",{style:{fontSize:"0.85em",color:i?"#a0a0a0":"#666",marginTop:"3px"},children:"Low gamma: Far-reaching influence. High gamma: Close-range influence (can overfit)."})]})]}),e.jsx("h3",{children:"💡 Key SVM Concepts"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Support Vectors:"})," Data points closest to the decision boundary (these define the model)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Margin:"})," Distance between boundary and nearest support vectors"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"C Parameter:"})," Controls trade-off between margin width and misclassification"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Kernel:"})," Function that transforms data to higher dimensions"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Gamma:"})," Defines how far the influence of a single training example reaches"]})]}),e.jsx("h3",{children:"🔬 Understanding Kernels"}),e.jsx("h4",{children:"Linear Kernel"}),e.jsx("p",{children:"Draws a straight line (or plane in higher dimensions). Use when data is linearly separable."}),e.jsx("div",{style:s.codeBlock,children:e.jsx("pre",{children:"K(x, y) = x · y  # Simple dot product"})}),e.jsx("h4",{children:"RBF (Radial Basis Function) Kernel - Most Popular"}),e.jsx("p",{children:"Can create circular/curved boundaries. Works well for most problems."}),e.jsx("div",{style:s.codeBlock,children:e.jsx("pre",{children:`K(x, y) = exp(-γ ||x - y||²)  # Gaussian-like influence

# Think of it as: "How similar are these points?"
# - Same point: K = 1
# - Far apart: K → 0
# - γ controls the "far apart" threshold`})}),e.jsx("h4",{children:"Polynomial Kernel"}),e.jsx("p",{children:"Can model complex curved boundaries. Degree parameter controls complexity."}),e.jsx("div",{style:s.codeBlock,children:e.jsx("pre",{children:`K(x, y) = (γ x · y + r)^d

# Example with degree=2:
# Transforms [x₁, x₂] → [x₁², √2·x₁·x₂, x₂², √2·x₁, √2·x₂, 1]`})}),e.jsx("h4",{children:"Sigmoid Kernel"}),e.jsx("p",{children:"Similar to neural network activation. Rarely used in practice."}),e.jsx("h3",{children:"🎓 The Kernel Trick Explained"}),e.jsx("p",{children:`The "kernel trick" is SVM's secret weapon. Instead of explicitly transforming data to high dimensions (expensive), kernels compute similarities in the transformed space without doing the transformation!`}),e.jsxs("div",{style:{backgroundColor:i?"#2a2a4a":"#e3f2fd",padding:"15px",borderRadius:"8px",margin:"15px 0"},children:[e.jsx("strong",{children:"Example: Making Non-Linear Data Linear"}),e.jsx("p",{children:"Problem: Points arranged in circles aren't linearly separable in 2D"}),e.jsx("div",{style:s.codeBlock,children:e.jsx("pre",{children:`# Original 2D data: Can't draw a straight line to separate
Class A: points inside circle
Class B: points outside circle

# Kernel trick: Implicitly map to 3D
# Add feature: z = x² + y² (distance from origin)
# Now data is linearly separable in 3D space!

# But we never actually compute the 3D coordinates
# The kernel computes dot products in 3D space directly`})})]}),e.jsx("h3",{children:"⚖️ The C Parameter Trade-off"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Small C (C → 0):"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Wide margin"}),e.jsx("li",{children:"More training errors allowed"}),e.jsx("li",{children:"Simpler decision boundary"}),e.jsx("li",{children:"Better generalization (less overfitting)"}),e.jsx("li",{children:"Use when: Noisy data, want robust model"})]})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Large C (C → ∞):"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Narrow margin"}),e.jsx("li",{children:"Few training errors"}),e.jsx("li",{children:"Complex decision boundary"}),e.jsx("li",{children:"Risk of overfitting"}),e.jsx("li",{children:"Use when: Clean data, confident in training set"})]})]})]}),e.jsx("h3",{children:"📏 Why Scaling is CRITICAL for SVM"}),e.jsx("p",{children:"SVM uses distances in its calculations. If features have different scales, SVM will be biased toward large-scale features:"}),e.jsx("div",{style:s.codeBlock,children:e.jsx("pre",{children:`# Without scaling:
Feature 1: Age (20-80)        → Small numbers
Feature 2: Income (20k-200k)  → Large numbers
# SVM will think income is more important just because numbers are bigger!

# With scaling (StandardScaler):
Feature 1: Age (-1 to +1)      → Normalized
Feature 2: Income (-1 to +1)   → Normalized
# Now SVM treats both features fairly`})}),e.jsxs("div",{style:s.warningBox,children:[e.jsx("strong",{children:"⚠️ Critical Mistakes to Avoid:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Not scaling data:"})," Most common mistake, ruins performance"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Using RBF for linearly separable data:"})," Unnecessary complexity"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Not tuning C and gamma:"})," Default values often suboptimal"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Using SVM on huge datasets:"})," Training time is O(n²) to O(n³)"]})]})]}),e.jsx("h3",{children:"🎯 Hyperparameter Tuning Guide"}),e.jsx("h4",{children:"Step 1: Choose Kernel"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Start with RBF (works for most problems)"}),e.jsx("li",{children:"Try linear if you have many features (text data, high-dimensional)"}),e.jsx("li",{children:"Polynomial if you suspect polynomial relationships"})]}),e.jsx("h4",{children:"Step 2: Grid Search for C and gamma (RBF kernel)"}),e.jsx("div",{style:s.codeBlock,children:e.jsx("pre",{children:`from sklearn.model_selection import GridSearchCV

param_grid = {
    'C': [0.1, 1, 10, 100],
    'gamma': [1, 0.1, 0.01, 0.001],
    'kernel': ['rbf']
}

grid = GridSearchCV(SVC(), param_grid, cv=5, scoring='f1')
grid.fit(X_train_scaled, y_train)

print(f"Best parameters: {grid.best_params_}")
print(f"Best score: {grid.best_score_:.3f}")`})}),e.jsx("h4",{children:"Step 3: Common Good Starting Points"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Balanced data:"})," C=1.0, gamma='scale' (default)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Imbalanced data:"})," C=10, class_weight='balanced'"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Many features:"})," kernel='linear', C=1.0"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Small dataset (<1000):"})," RBF kernel usually works well"]})]}),e.jsx("h3",{children:"🏆 When SVM Excels"}),e.jsxs("ul",{children:[e.jsx("li",{children:"✅ High-dimensional data (text classification, genomics)"}),e.jsx("li",{children:"✅ Clear margin of separation"}),e.jsx("li",{children:"✅ Small to medium datasets (<10,000 samples)"}),e.jsx("li",{children:"✅ Need robust model against outliers (with appropriate C)"}),e.jsx("li",{children:"✅ Binary classification problems"}),e.jsx("li",{children:"❌ Very large datasets (slow training)"}),e.jsx("li",{children:"❌ Lots of noise or overlapping classes"}),e.jsx("li",{children:"❌ Need probability estimates (SVM's probabilities less reliable than logistic regression)"}),e.jsx("li",{children:"❌ Need model interpretability (kernel SVMs are black boxes)"})]}),e.jsx("h3",{children:"🌍 Real-World Applications"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Text Classification:"})," Spam detection, sentiment analysis (linear kernel excels)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Image Recognition:"})," Face detection, handwritten digit recognition"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Bioinformatics:"})," Protein classification, cancer classification"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Financial Markets:"})," Stock price prediction (though neural networks now preferred)"]})]}),e.jsx("h3",{children:"📊 SVM vs. Other Classifiers"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"vs. Logistic Regression:"})," SVM better for non-linear boundaries, LR better for probabilities"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"vs. Random Forest:"})," SVM better for high-dimensional data, RF better for interpretability and large datasets"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"vs. Neural Networks:"})," SVM better for small data, NN better for complex patterns and very large datasets"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"vs. XGBoost:"})," XGBoost usually wins on tabular data, SVM wins on text/high-dimensional"]})]}),e.jsx("h3",{children:"🔬 Advanced: Multi-class SVM"}),e.jsx("p",{children:"SVM is naturally binary. For multi-class problems, scikit-learn uses:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"One-vs-Rest (OvR):"})," Train N binary classifiers (one per class vs. all others)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"One-vs-One (OvO):"})," Train N(N-1)/2 classifiers (all pairs of classes)"]})]}),e.jsx("div",{style:s.codeBlock,children:e.jsx("pre",{children:`# Automatically handles multi-class
from sklearn.multiclass import OneVsRestClassifier, OneVsOneClassifier

# One-vs-Rest (default in SVC)
ovr = OneVsRestClassifier(SVC(kernel='rbf'))
ovr.fit(X_train, y_train)

# One-vs-One
ovo = OneVsOneClassifier(SVC(kernel='rbf'))
ovo.fit(X_train, y_train)

# OvO is more accurate but slower
# OvR is faster but sometimes less accurate`})})]})},ft=({C:i,kernel:s,gamma:a,isDarkMode:o})=>{const l=x.useRef(null),[d,n]=x.useState([]),[r,p]=x.useState([]);return x.useEffect(()=>{const m=[];for(let u=0;u<25;u++)m.push({x:30+(Math.random()-.5)*30,y:30+(Math.random()-.5)*30,class:"A"});for(let u=0;u<25;u++)m.push({x:70+(Math.random()-.5)*30,y:70+(Math.random()-.5)*30,class:"B"});n(m);const c=m.filter(u=>{const h=Math.sqrt(Math.pow(u.x-50,2)+Math.pow(u.y-50,2));return h<25&&h>15});p(c)},[]),x.useEffect(()=>{if(!l.current||d.length===0)return;const m=l.current,c=m.getContext("2d"),u=m.width,h=m.height;if(c.fillStyle=o?"#1a1a1a":"#ffffff",c.fillRect(0,0,u,h),c.strokeStyle=o?"#4a9eff":"#2196F3",c.lineWidth=3,c.beginPath(),s==="linear")c.moveTo(0,h),c.lineTo(u,0);else if(s==="rbf"){const g=u/2,b=h/2,v=150/(1+a*5);c.arc(g,b,v,0,2*Math.PI)}else if(s==="poly"){c.moveTo(0,h*.8);for(let g=0;g<=u;g+=5){const b=h*.8-Math.sin(g*.02)*50-g/u*h*.6;c.lineTo(g,b)}}else if(s==="sigmoid"){c.moveTo(0,h);for(let g=0;g<=u;g+=5){const b=1/(1+Math.exp(-.02*(g-u/2))),v=h-b*h;c.lineTo(g,v)}}c.stroke();const f=20/i;c.strokeStyle=o?"#666666":"#cccccc",c.lineWidth=1,c.setLineDash([5,5]),s==="linear"&&(c.beginPath(),c.moveTo(0,h+f*10),c.lineTo(u,0+f*10),c.stroke(),c.beginPath(),c.moveTo(0,h-f*10),c.lineTo(u,0-f*10),c.stroke()),c.setLineDash([]),r.forEach(g=>{const b=g.x/100*u,v=g.y/100*h;c.beginPath(),c.arc(b,v,8,0,2*Math.PI),c.strokeStyle="#ffd700",c.lineWidth=3,c.stroke()}),d.forEach(g=>{const b=g.x/100*u,v=g.y/100*h;c.beginPath(),c.arc(b,v,5,0,2*Math.PI),c.fillStyle=g.class==="A"?o?"#ff6b6b":"#e53935":o?"#51cf66":"#43a047",c.fill(),c.strokeStyle=o?"#ffffff":"#000000",c.lineWidth=1,c.stroke()}),c.fillStyle=o?"#e0e0e0":"#333333",c.font="14px sans-serif",c.fillText(`Kernel: ${s}, C: ${i.toFixed(1)}${s!=="linear"?`, γ: ${a.toFixed(2)}`:""}`,10,20)},[i,s,a,d,r,o]),e.jsxs("div",{style:{border:`2px solid ${o?"#4a9eff":"#2196F3"}`,borderRadius:"8px",padding:"10px",margin:"20px 0",backgroundColor:o?"#1a1a1a":"#ffffff"},children:[e.jsx("canvas",{ref:l,width:600,height:400,style:{display:"block",margin:"0 auto",maxWidth:"100%",height:"auto"}}),e.jsxs("div",{style:{textAlign:"center",marginTop:"10px",fontSize:"0.9em"},children:[e.jsx("span",{style:{color:o?"#ff6b6b":"#e53935"},children:"● Class A"})," | ",e.jsx("span",{style:{color:o?"#51cf66":"#43a047"},children:"● Class B"})," | ",e.jsx("span",{style:{color:o?"#4a9eff":"#2196F3"},children:"━ Decision Boundary"})," | ",e.jsx("span",{style:{color:"#ffd700"},children:"◯ Support Vectors"})]}),e.jsx("p",{style:{marginTop:"15px",fontSize:"0.9em",textAlign:"center",fontStyle:"italic"},children:"💡 Support vectors (gold rings) are the critical points that define the boundary. Other points don't affect the model!"})]})},bt=()=>{const[i,s]=x.useState("dt"),[a,o]=x.useState(0),[l,d]=x.useState({}),n=c=>{d(u=>({...u,[c]:!u[c]}))},r=[{id:"dt",name:"Decision Tree",icon:e.jsx(Re,{className:"w-6 h-6"}),color:"blue"},{id:"rf",name:"Random Forest",icon:e.jsx(Ue,{className:"w-6 h-6"}),color:"green"},{id:"gb",name:"Gradient Boosting",icon:e.jsx(ae,{className:"w-6 h-6"}),color:"purple"},{id:"xgb",name:"XGBoost",icon:e.jsx(re,{className:"w-6 h-6"}),color:"orange"},{id:"svm",name:"SVM",icon:e.jsx(oe,{className:"w-6 h-6"}),color:"red"}],p=[{id:0,title:"Model Overview",icon:e.jsx(We,{className:"w-5 h-5"})},{id:1,title:"Feature Engineering",icon:e.jsx(Pe,{className:"w-5 h-5"})},{id:2,title:"Code Example 1",icon:e.jsx(L,{className:"w-5 h-5"})},{id:3,title:"Code Example 2",icon:e.jsx(L,{className:"w-5 h-5"})},{id:4,title:"Code Example 3",icon:e.jsx(L,{className:"w-5 h-5"})}],m=r.find(c=>c.id===i);return e.jsx("div",{className:"min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-8",children:e.jsxs("div",{className:"max-w-7xl mx-auto",children:[e.jsxs("div",{className:"bg-white rounded-lg shadow-xl p-8 mb-8",children:[e.jsx("h1",{className:"text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4",children:"Machine Learning Models & Feature Engineering"}),e.jsx("p",{className:"text-gray-700 text-xl",children:"Complete guide to Decision Trees, Ensembles, Boosting, and SVM with practical implementations"})]}),e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-6 mb-8",children:[e.jsx("h2",{className:"text-2xl font-bold mb-4",children:"Select Model"}),e.jsx("div",{className:"grid md:grid-cols-5 gap-4",children:r.map(c=>e.jsxs("button",{onClick:()=>{s(c.id),o(0)},className:`flex flex-col items-center gap-3 px-4 py-6 rounded-lg font-semibold transition-all ${i===c.id?`bg-${c.color}-600 text-white shadow-lg scale-105`:"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,style:i===c.id?{backgroundColor:{blue:"#2563eb",green:"#16a34a",purple:"#9333ea",orange:"#ea580c",red:"#dc2626"}[c.color]}:{},children:[c.icon,e.jsx("span",{className:"text-center text-sm",children:c.name})]},c.id))})]}),e.jsx("div",{className:"bg-white rounded-lg shadow-lg p-6 mb-8",children:e.jsx("div",{className:"flex flex-wrap gap-3",children:p.map(c=>e.jsxs("button",{onClick:()=>o(c.id),className:`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${a===c.id?`bg-${m.color}-600 text-white shadow-md`:"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,style:a===c.id?{backgroundColor:{blue:"#2563eb",green:"#16a34a",purple:"#9333ea",orange:"#ea580c",red:"#dc2626"}[m.color]}:{},children:[c.icon,e.jsx("span",{className:"font-medium",children:c.title})]},c.id))})}),i==="dt"&&e.jsxs(e.Fragment,{children:[a===0&&e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-4xl font-bold text-blue-900 mb-6",children:"Decision Tree Overview"}),e.jsxs("div",{className:"bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-2xl font-semibold mb-4",children:"What is a Decision Tree?"}),e.jsx("p",{className:"text-lg text-gray-700 mb-4 leading-relaxed",children:"A Decision Tree is a supervised learning algorithm that recursively splits data based on feature values, creating a tree-like model of decisions. Each internal node represents a test on a feature, each branch represents the outcome, and each leaf node represents a class label or value."})]}),e.jsxs("div",{className:"bg-blue-50 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-xl font-semibold mb-4",children:"Decision Tree Structure"}),e.jsx("div",{className:"bg-white rounded-lg p-6",children:e.jsxs("div",{className:"flex flex-col items-center space-y-4",children:[e.jsx("div",{className:"bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold",children:"Age ≤ 30?"}),e.jsxs("div",{className:"flex gap-8 items-start",children:[e.jsxs("div",{className:"flex flex-col items-center space-y-4",children:[e.jsx("div",{className:"text-sm font-semibold",children:"Yes"}),e.jsx("div",{className:"bg-blue-500 text-white px-6 py-3 rounded-lg",children:"Income ≤ 50K?"}),e.jsxs("div",{className:"flex gap-6",children:[e.jsxs("div",{className:"flex flex-col items-center space-y-2",children:[e.jsx("div",{className:"text-xs",children:"Yes"}),e.jsx("div",{className:"bg-green-500 text-white px-4 py-2 rounded",children:"Class: No"})]}),e.jsxs("div",{className:"flex flex-col items-center space-y-2",children:[e.jsx("div",{className:"text-xs",children:"No"}),e.jsx("div",{className:"bg-green-500 text-white px-4 py-2 rounded",children:"Class: Yes"})]})]})]}),e.jsxs("div",{className:"flex flex-col items-center space-y-4",children:[e.jsx("div",{className:"text-sm font-semibold",children:"No"}),e.jsx("div",{className:"bg-blue-500 text-white px-6 py-3 rounded-lg",children:"Credit ≥ 700?"}),e.jsxs("div",{className:"flex gap-6",children:[e.jsxs("div",{className:"flex flex-col items-center space-y-2",children:[e.jsx("div",{className:"text-xs",children:"No"}),e.jsx("div",{className:"bg-red-500 text-white px-4 py-2 rounded",children:"Class: No"})]}),e.jsxs("div",{className:"flex flex-col items-center space-y-2",children:[e.jsx("div",{className:"text-xs",children:"Yes"}),e.jsx("div",{className:"bg-green-500 text-white px-4 py-2 rounded",children:"Class: Yes"})]})]})]})]})]})})]}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6 mb-6",children:[e.jsxs("div",{className:"bg-blue-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-blue-800 mb-4",children:"Advantages"}),e.jsxs("ul",{className:"space-y-2 text-gray-700",children:[e.jsx("li",{children:"✅ Easy to understand and interpret"}),e.jsx("li",{children:"✅ Requires little data preprocessing"}),e.jsx("li",{children:"✅ Can handle numerical and categorical data"}),e.jsx("li",{children:"✅ Non-parametric (no assumptions about data)"}),e.jsx("li",{children:"✅ Can capture non-linear relationships"})]})]}),e.jsxs("div",{className:"bg-red-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-red-800 mb-4",children:"Disadvantages"}),e.jsxs("ul",{className:"space-y-2 text-gray-700",children:[e.jsx("li",{children:"❌ Prone to overfitting"}),e.jsx("li",{children:"❌ Can be unstable (small data changes = big tree changes)"}),e.jsx("li",{children:"❌ Biased with imbalanced datasets"}),e.jsx("li",{children:"❌ Can create complex trees that don't generalize"}),e.jsx("li",{children:"❌ Greedy algorithm (not guaranteed global optimum)"})]})]})]}),e.jsxs("div",{className:"bg-purple-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-semibold mb-4",children:"Splitting Criteria"}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-purple-700 mb-2",children:"Gini Impurity"}),e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"Measures probability of incorrect classification"}),e.jsx("div",{className:"bg-purple-100 rounded p-2 font-mono text-xs",children:"Gini = 1 - Σ(pᵢ²)"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-purple-700 mb-2",children:"Entropy"}),e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"Measures randomness or information gain"}),e.jsx("div",{className:"bg-purple-100 rounded p-2 font-mono text-xs",children:"Entropy = -Σ(pᵢ log₂ pᵢ)"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-purple-700 mb-2",children:"MSE (Regression)"}),e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"Mean squared error for continuous targets"}),e.jsx("div",{className:"bg-purple-100 rounded p-2 font-mono text-xs",children:"MSE = (1/n)Σ(yᵢ - ȳ)²"})]})]})]})]}),a===1&&e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-4xl font-bold text-blue-900 mb-6",children:"Feature Engineering for Decision Trees"}),e.jsxs("div",{className:"bg-gradient-to-r from-green-100 to-teal-100 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-2xl font-semibold mb-4",children:"Why Feature Engineering Matters"}),e.jsx("p",{className:"text-lg text-gray-700 leading-relaxed",children:"While Decision Trees can handle raw features well, proper feature engineering improves model performance, interpretability, and generalization. Trees benefit from well-scaled features, meaningful categorical encodings, and derived features."})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"bg-blue-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-semibold mb-4",children:"1. Handling Missing Values"}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-blue-700 mb-2",children:"Mean/Median Imputation"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Fill missing numerical values with mean or median"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-blue-700 mb-2",children:"Mode Imputation"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Fill missing categorical values with most frequent"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-blue-700 mb-2",children:"Create Indicator"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Add binary column indicating missingness"})]})]})]}),e.jsxs("div",{className:"bg-purple-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-semibold mb-4",children:"2. Encoding Categorical Variables"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-purple-700 mb-2",children:"Label Encoding"}),e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"Convert categories to integers (ordinal)"}),e.jsx("div",{className:"bg-purple-50 rounded p-2 text-xs font-mono",children:"Low → 0, Medium → 1, High → 2"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-purple-700 mb-2",children:"One-Hot Encoding"}),e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"Create binary columns for each category"}),e.jsx("div",{className:"bg-purple-50 rounded p-2 text-xs font-mono",children:"Color_Red, Color_Blue, Color_Green"})]})]})]}),e.jsxs("div",{className:"bg-green-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-semibold mb-4",children:"3. Feature Scaling"}),e.jsx("p",{className:"text-gray-700 mb-4",children:"Note: Decision Trees don't require feature scaling, but it can help with interpretability and ensemble methods."}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-green-700 mb-2",children:"Standardization"}),e.jsx("div",{className:"bg-green-50 rounded p-2 text-sm font-mono",children:"z = (x - μ) / σ"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-green-700 mb-2",children:"Normalization"}),e.jsx("div",{className:"bg-green-50 rounded p-2 text-sm font-mono",children:"x' = (x - min) / (max - min)"})]})]})]}),e.jsxs("div",{className:"bg-orange-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-semibold mb-4",children:"4. Creating Derived Features"}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-orange-700 mb-2",children:"Binning"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Convert continuous to categorical (age groups)"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-orange-700 mb-2",children:"Interactions"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Multiply features (price × quantity)"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-orange-700 mb-2",children:"Polynomial"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Add squared or cubed terms"})]})]})]})]})]}),a===2&&e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-4xl font-bold text-blue-900 mb-6",children:"Code Example 1: Basic Classification"}),e.jsxs("div",{className:"bg-blue-50 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-xl font-semibold mb-3",children:"Iris Dataset Classification"}),e.jsx("p",{className:"text-gray-700",children:"Build a Decision Tree classifier for the classic Iris dataset with complete preprocessing and evaluation."})]}),e.jsxs("div",{className:"bg-gray-50 rounded-lg p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("h3",{className:"text-xl font-semibold flex items-center gap-2",children:[e.jsx(L,{className:"w-5 h-5"}),"Complete Implementation"]}),e.jsxs("button",{onClick:()=>n("dt-code1"),className:"flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",children:[l["dt-code1"]?e.jsx(U,{className:"w-4 h-4"}):e.jsx(G,{className:"w-4 h-4"}),l["dt-code1"]?"Hide":"Show"," Code"]})]}),l["dt-code1"]&&e.jsx("pre",{className:"bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm",children:`import numpy as np
import pandas as pd
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt
from sklearn import tree

# Step 1: Load and Explore Data
print("=" * 60)
print("STEP 1: LOAD AND EXPLORE DATA")
print("=" * 60)

iris = load_iris()
X = iris.data
y = iris.target

# Create DataFrame for better visualization
df = pd.DataFrame(X, columns=iris.feature_names)
df['target'] = y
df['species'] = df['target'].map({0: 'setosa', 1: 'versicolor', 2: 'virginica'})

print("\\nDataset shape:", df.shape)
print("\\nFirst 5 rows:")
print(df.head())
print("\\nFeature statistics:")
print(df.describe())
print("\\nClass distribution:")
print(df['species'].value_counts())

# Step 2: Feature Engineering
print("\\n" + "=" * 60)
print("STEP 2: FEATURE ENGINEERING")
print("=" * 60)

# Check for missing values
print("\\nMissing values:")
print(df.isnull().sum())

# Create derived features
df['sepal_area'] = df['sepal length (cm)'] * df['sepal width (cm)']
df['petal_area'] = df['petal length (cm)'] * df['petal width (cm)']
df['sepal_petal_ratio'] = df['sepal length (cm)'] / (df['petal length (cm)'] + 1e-6)

print("\\nNew features created:")
print("- sepal_area")
print("- petal_area")
print("- sepal_petal_ratio")

# Update X with new features
X_engineered = df[['sepal length (cm)', 'sepal width (cm)', 
                    'petal length (cm)', 'petal width (cm)',
                    'sepal_area', 'petal_area', 'sepal_petal_ratio']].values

# Step 3: Split Data
print("\\n" + "=" * 60)
print("STEP 3: TRAIN-TEST SPLIT")
print("=" * 60)

X_train, X_test, y_train, y_test = train_test_split(
    X_engineered, y, test_size=0.2, random_state=42, stratify=y
)

print(f"\\nTraining set size: {X_train.shape}")
print(f"Test set size: {X_test.shape}")

# Step 4: Build Decision Tree
print("\\n" + "=" * 60)
print("STEP 4: BUILD DECISION TREE MODEL")
print("=" * 60)

# Create model with hyperparameters
dt_classifier = DecisionTreeClassifier(
    criterion='gini',           # or 'entropy'
    max_depth=4,               # Limit tree depth to prevent overfitting
    min_samples_split=10,      # Minimum samples required to split
    min_samples_leaf=5,        # Minimum samples in leaf node
    random_state=42
)

print("\\nModel hyperparameters:")
print(f"- Criterion: {dt_classifier.criterion}")
print(f"- Max depth: {dt_classifier.max_depth}")
print(f"- Min samples split: {dt_classifier.min_samples_split}")
print(f"- Min samples leaf: {dt_classifier.min_samples_leaf}")

# Step 5: Train Model
print("\\n" + "=" * 60)
print("STEP 5: TRAIN MODEL")
print("=" * 60)

dt_classifier.fit(X_train, y_train)
print("\\n✓ Model training completed!")

# Step 6: Make Predictions
print("\\n" + "=" * 60)
print("STEP 6: MAKE PREDICTIONS")
print("=" * 60)

y_pred_train = dt_classifier.predict(X_train)
y_pred_test = dt_classifier.predict(X_test)

print("\\nPredictions completed for train and test sets")

# Step 7: Evaluate Model
print("\\n" + "=" * 60)
print("STEP 7: MODEL EVALUATION")
print("=" * 60)

train_accuracy = accuracy_score(y_train, y_pred_train)
test_accuracy = accuracy_score(y_test, y_pred_test)

print(f"\\nTraining Accuracy: {train_accuracy:.4f}")
print(f"Test Accuracy: {test_accuracy:.4f}")

print("\\nClassification Report (Test Set):")
print(classification_report(y_test, y_pred_test, 
                          target_names=iris.target_names))

print("\\nConfusion Matrix (Test Set):")
cm = confusion_matrix(y_test, y_pred_test)
print(cm)

# Step 8: Feature Importance
print("\\n" + "=" * 60)
print("STEP 8: FEATURE IMPORTANCE")
print("=" * 60)

feature_names = ['sepal length', 'sepal width', 'petal length', 
                'petal width', 'sepal_area', 'petal_area', 'sepal_petal_ratio']
feature_importance = dt_classifier.feature_importances_

print("\\nFeature Importance Ranking:")
for name, importance in sorted(zip(feature_names, feature_importance), 
                              key=lambda x: x[1], reverse=True):
    print(f"{name:20s}: {importance:.4f}")

# Step 9: Tree Structure Analysis
print("\\n" + "=" * 60)
print("STEP 9: TREE STRUCTURE")
print("=" * 60)

print(f"\\nTree depth: {dt_classifier.get_depth()}")
print(f"Number of leaves: {dt_classifier.get_n_leaves()}")
print(f"Total nodes: {dt_classifier.tree_.node_count}")

# Step 10: Visualize Tree (text representation)
print("\\n" + "=" * 60)
print("STEP 10: TREE RULES")
print("=" * 60)

print("\\nDecision tree rules:")
tree_rules = tree.export_text(dt_classifier, feature_names=feature_names)
print(tree_rules[:500] + "...")  # Print first 500 characters

print("\\n" + "=" * 60)
print("ANALYSIS COMPLETE!")
print("=" * 60)`})]})]}),a===3&&e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-4xl font-bold text-blue-900 mb-6",children:"Code Example 2: Regression with Feature Engineering"}),e.jsxs("div",{className:"bg-blue-50 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-xl font-semibold mb-3",children:"Housing Price Prediction"}),e.jsx("p",{className:"text-gray-700",children:"Build a Decision Tree regressor with comprehensive feature engineering for predicting house prices."})]}),e.jsxs("div",{className:"bg-gray-50 rounded-lg p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("h3",{className:"text-xl font-semibold flex items-center gap-2",children:[e.jsx(L,{className:"w-5 h-5"}),"Complete Implementation"]}),e.jsxs("button",{onClick:()=>n("dt-code2"),className:"flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",children:[l["dt-code2"]?e.jsx(U,{className:"w-4 h-4"}):e.jsx(G,{className:"w-4 h-4"}),l["dt-code2"]?"Hide":"Show"," Code"]})]}),l["dt-code2"]&&e.jsx("pre",{className:"bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm",children:`import numpy as np
import pandas as pd
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
import warnings
warnings.filterwarnings('ignore')

# Step 1: Load Data
print("=" * 70)
print("STEP 1: LOAD CALIFORNIA HOUSING DATA")
print("=" * 70)

housing = fetch_california_housing()
df = pd.DataFrame(housing.data, columns=housing.feature_names)
df['Price'] = housing.target

print("\\nDataset Info:")
print(f"Shape: {df.shape}")
print(f"\\nFeatures: {housing.feature_names}")
print(f"\\nTarget: Median house value (in $100,000s)")

print("\\nFirst 5 rows:")
print(df.head())

print("\\nStatistical Summary:")
print(df.describe())

# Step 2: Comprehensive Feature Engineering
print("\\n" + "=" * 70)
print("STEP 2: FEATURE ENGINEERING")
print("=" * 70)

# 2.1 Handle Missing Values (if any)
print("\\n2.1 Checking for missing values...")
missing_vals = df.isnull().sum()
print(missing_vals[missing_vals > 0] if missing_vals.sum() > 0 else "No missing values found!")

# 2.2 Create Derived Features
print("\\n2.2 Creating derived features...")

# Rooms per household
df['RoomsPerHousehold'] = df['AveRooms'] * df['AveOccup']

# Bedrooms ratio
df['BedroomsRatio'] = df['AveBedrms'] / (df['AveRooms'] + 1e-6)

# Population density
df['PopulationDensity'] = df['Population'] / (df['AveRooms'] + 1e-6)

# Income per room
df['IncomePerRoom'] = df['MedInc'] / (df['AveRooms'] + 1e-6)

# Location cluster (simplified)
df['LocationCluster'] = (df['Latitude'] > 35).astype(int) + \\
                        (df['Longitude'] < -120).astype(int)

print("New features created:")
print("- RoomsPerHousehold")
print("- BedroomsRatio")
print("- PopulationDensity")
print("- IncomePerRoom")
print("- LocationCluster")

# 2.3 Binning Continuous Features
print("\\n2.3 Binning continuous features...")

# Bin house age
df['HouseAge_Binned'] = pd.cut(df['HouseAge'], 
                               bins=[0, 10, 20, 30, 50, 100],
                               labels=['0-10', '10-20', '20-30', '30-50', '50+'])

# Bin income
df['Income_Binned'] = pd.cut(df['MedInc'],
                             bins=[0, 2, 4, 6, 8, 15],
                             labels=['Very Low', 'Low', 'Medium', 'High', 'Very High'])

print("Binned features created:")
print("- HouseAge_Binned")
print("- Income_Binned")

# 2.4 One-Hot Encoding for binned features
print("\\n2.4 Encoding categorical features...")

df_encoded = pd.get_dummies(df, columns=['HouseAge_Binned', 'Income_Binned'], 
                            drop_first=True)
print(f"Shape after encoding: {df_encoded.shape}")

# 2.5 Polynomial Features (for selected features)
print("\\n2.5 Creating polynomial features...")

poly_features = ['MedInc', 'AveRooms', 'Population']
poly = PolynomialFeatures(degree=2, include_bias=False)
poly_data = poly.fit_transform(df[poly_features])

poly_feature_names = poly.get_feature_names_out(poly_features)
df_poly = pd.DataFrame(poly_data, columns=poly_feature_names, index=df.index)

# Add polynomial features to main dataframe
for col in df_poly.columns:
    if col not in df.columns:
        df_encoded[col] = df_poly[col]

print(f"Polynomial features added. New shape: {df_encoded.shape}")

# Step 3: Prepare Features and Target
print("\\n" + "=" * 70)
print("STEP 3: PREPARE DATA FOR MODELING")
print("=" * 70)

X = df_encoded.drop('Price', axis=1)
y = df_encoded['Price']

print(f"\\nFinal feature set shape: {X.shape}")
print(f"Number of features: {X.shape[1]}")

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(f"\\nTrain set: {X_train.shape}")
print(f"Test set: {X_test.shape}")

# Step 4: Build and Train Model
print("\\n" + "=" * 70)
print("STEP 4: BUILD AND TRAIN DECISION TREE REGRESSOR")
print("=" * 70)

# Create regressor with optimal hyperparameters
dt_regressor = DecisionTreeRegressor(
    criterion='squared_error',  # or 'absolute_error', 'friedman_mse', 'poisson'
    max_depth=10,
    min_samples_split=20,
    min_samples_leaf=10,
    max_features='sqrt',
    random_state=42
)

print("\\nModel hyperparameters:")
for param, value in dt_regressor.get_params().items():
    if param in ['criterion', 'max_depth', 'min_samples_split', 
                'min_samples_leaf', 'max_features']:
        print(f"- {param}: {value}")

# Train model
print("\\n Training model...")
dt_regressor.fit(X_train, y_train)
print("✓ Training completed!")

# Step 5: Make Predictions
print("\\n" + "=" * 70)
print("STEP 5: MAKE PREDICTIONS")
print("=" * 70)

y_pred_train = dt_regressor.predict(X_train)
y_pred_test = dt_regressor.predict(X_test)

print("✓ Predictions completed")

# Step 6: Evaluate Model
print("\\n" + "=" * 70)
print("STEP 6: MODEL EVALUATION")
print("=" * 70)

# Training metrics
train_mse = mean_squared_error(y_train, y_pred_train)
train_rmse = np.sqrt(train_mse)
train_mae = mean_absolute_error(y_train, y_pred_train)
train_r2 = r2_score(y_train, y_pred_train)

# Test metrics
test_mse = mean_squared_error(y_test, y_pred_test)
test_rmse = np.sqrt(test_mse)
test_mae = mean_absolute_error(y_test, y_pred_test)
test_r2 = r2_score(y_test, y_pred_test)

print("\\nTraining Set Performance:")
print(f"  MSE:  {train_mse:.4f}")
print(f"  RMSE: {train_rmse:.4f}")
print(f"  MAE:  {train_mae:.4f}")
print(f"  R²:   {train_r2:.4f}")

print("\\nTest Set Performance:")
print(f"  MSE:  {test_mse:.4f}")
print(f"  RMSE: {test_rmse:.4f}")
print(f"  MAE:  {test_mae:.4f}")
print(f"  R²:   {test_r2:.4f}")

# Cross-validation
print("\\n" + "=" * 70)
print("CROSS-VALIDATION (5-FOLD)")
print("=" * 70)

cv_scores = cross_val_score(dt_regressor, X_train, y_train, 
                            cv=5, scoring='r2')
print(f"\\nCV R² Scores: {cv_scores}")
print(f"Mean CV R²: {cv_scores.mean():.4f} (+/- {cv_scores.std() * 2:.4f})")

# Step 7: Feature Importance
print("\\n" + "=" * 70)
print("STEP 7: FEATURE IMPORTANCE ANALYSIS")
print("=" * 70)

feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': dt_regressor.feature_importances_
}).sort_values('importance', ascending=False)

print("\\nTop 15 Most Important Features:")
print(feature_importance.head(15).to_string(index=False))

# Step 8: Prediction Examples
print("\\n" + "=" * 70)
print("STEP 8: SAMPLE PREDICTIONS")
print("=" * 70)

sample_indices = [0, 100, 500]
print("\\nSample predictions vs actual:")
print(f"{'Index':<8} {'Actual':<12} {'Predicted':<12} {'Error':<12}")
print("-" * 48)
for idx in sample_indices:
    actual = y_test.iloc[idx]
    predicted = y_pred_test[idx]
    error = abs(actual - predicted)
    print(f"{idx:<8} {actual:<12.2f} {predicted:<12.2f} {error:<12.2f}")

print("\\n" + "=" * 70)
print("REGRESSION ANALYSIS COMPLETE!")
print("=" * 70)`})]})]}),a===4&&e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-4xl font-bold text-blue-900 mb-6",children:"Code Example 3: Advanced Hyperparameter Tuning"}),e.jsxs("div",{className:"bg-blue-50 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-xl font-semibold mb-3",children:"Grid Search & Cross-Validation"}),e.jsx("p",{className:"text-gray-700",children:"Optimize Decision Tree hyperparameters using Grid Search with comprehensive evaluation."})]}),e.jsxs("div",{className:"bg-gray-50 rounded-lg p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("h3",{className:"text-xl font-semibold flex items-center gap-2",children:[e.jsx(L,{className:"w-5 h-5"}),"Complete Implementation"]}),e.jsxs("button",{onClick:()=>n("dt-code3"),className:"flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",children:[l["dt-code3"]?e.jsx(U,{className:"w-4 h-4"}):e.jsx(G,{className:"w-4 h-4"}),l["dt-code3"]?"Hide":"Show"," Code"]})]}),l["dt-code3"]&&e.jsx("pre",{className:"bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm",children:`import numpy as np
import pandas as pd
from sklearn.datasets import make_classification
from sklearn.model_selection import (train_test_split, GridSearchCV, 
                                     RandomizedSearchCV, cross_validate)
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import (accuracy_score, precision_score, recall_score, 
                            f1_score, roc_auc_score, make_scorer)
from sklearn.preprocessing import StandardScaler
import time

# Step 1: Create Synthetic Dataset
print("=" * 70)
print("STEP 1: CREATE SYNTHETIC DATASET")
print("=" * 70)

X, y = make_classification(
    n_samples=5000,
    n_features=20,
    n_informative=15,
    n_redundant=3,
    n_clusters_per_class=2,
    flip_y=0.05,
    class_sep=0.8,
    random_state=42
)

print(f"\\nDataset created:")
print(f"- Samples: {X.shape[0]}")
print(f"- Features: {X.shape[1]}")
print(f"- Classes: {len(np.unique(y))}")
print(f"- Class distribution: {np.bincount(y)}")

# Create DataFrame
feature_names = [f'feature_{i}' for i in range(X.shape[1])]
df = pd.DataFrame(X, columns=feature_names)
df['target'] = y

# Step 2: Feature Engineering
print("\\n" + "=" * 70)
print("STEP 2: FEATURE ENGINEERING")
print("=" * 70)

# Create interaction features
df['interaction_1'] = df['feature_0'] * df['feature_1']
df['interaction_2'] = df['feature_2'] * df['feature_3']

# Create polynomial features for top features
df['feature_0_squared'] = df['feature_0'] ** 2
df['feature_1_squared'] = df['feature_1'] ** 2

# Create ratio features
df['ratio_1'] = df['feature_0'] / (df['feature_1'] + 1e-6)
df['ratio_2'] = df['feature_2'] / (df['feature_3'] + 1e-6)

print(f"\\nFeatures after engineering: {df.shape[1] - 1}")  # -1 for target

# Prepare data
X_engineered = df.drop('target', axis=1).values
y = df['target'].values

# Step 3: Train-Test Split
print("\\n" + "=" * 70)
print("STEP 3: TRAIN-TEST SPLIT")
print("=" * 70)

X_train, X_test, y_train, y_test = train_test_split(
    X_engineered, y, test_size=0.2, random_state=42, stratify=y
)

print(f"Training set: {X_train.shape}")
print(f"Test set: {X_test.shape}")

# Step 4: Define Hyperparameter Grid
print("\\n" + "=" * 70)
print("STEP 4: DEFINE HYPERPARAMETER GRID")
print("=" * 70)

# Comprehensive parameter grid
param_grid = {
    'criterion': ['gini', 'entropy'],
    'max_depth': [3, 5, 7, 10, 15, None],
    'min_samples_split': [2, 5, 10, 20],
    'min_samples_leaf': [1, 2, 5, 10],
    'max_features': ['sqrt', 'log2', None],
    'class_weight': [None, 'balanced']
}

print("\\nParameter grid:")
for param, values in param_grid.items():
    print(f"  {param}: {values}")

total_combinations = np.prod([len(v) for v in param_grid.values()])
print(f"\\nTotal parameter combinations: {total_combinations}")

# Step 5: Grid Search with Cross-Validation
print("\\n" + "=" * 70)
print("STEP 5: GRID SEARCH CROSS-VALIDATION")
print("=" * 70)

# Define scoring metrics
scoring = {
    'accuracy': 'accuracy',
    'precision': 'precision',
    'recall': 'recall',
    'f1': 'f1',
    'roc_auc': 'roc_auc'
}

print("\\nStarting Grid Search (this may take a while)...")
print(f"Using 5-fold cross-validation")
print(f"Scoring metrics: {list(scoring.keys())}")

start_time = time.time()

grid_search = GridSearchCV(
    estimator=DecisionTreeClassifier(random_state=42),
    param_grid=param_grid,
    scoring=scoring,
    refit='f1',  # Optimize for F1 score
    cv=5,
    verbose=1,
    n_jobs=-1,  # Use all available cores
    return_train_score=True
)

grid_search.fit(X_train, y_train)

elapsed_time = time.time() - start_time
print(f"\\n✓ Grid Search completed in {elapsed_time:.2f} seconds")

# Step 6: Analyze Results
print("\\n" + "=" * 70)
print("STEP 6: BEST MODEL ANALYSIS")
print("=" * 70)

print("\\nBest Parameters:")
for param, value in grid_search.best_params_.items():
    print(f"  {param}: {value}")

print(f"\\nBest F1 Score (CV): {grid_search.best_score_:.4f}")

# Get best model
best_model = grid_search.best_estimator_

# Step 7: Detailed Cross-Validation Results
print("\\n" + "=" * 70)
print("STEP 7: CROSS-VALIDATION SCORES")
print("=" * 70)

cv_results = pd.DataFrame(grid_search.cv_results_)

print("\\nTop 10 Parameter Combinations (by F1 score):")
top_10 = cv_results.nsmallest(10, 'rank_test_f1')[
    ['param_criterion', 'param_max_depth', 'param_min_samples_split',
     'mean_test_f1', 'std_test_f1']
]
print(top_10.to_string(index=False))

# Step 8: Test Set Evaluation
print("\\n" + "=" * 70)
print("STEP 8: TEST SET EVALUATION")
print("=" * 70)

y_pred = best_model.predict(X_test)
y_pred_proba = best_model.predict_proba(X_test)[:, 1]

# Calculate metrics
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)
roc_auc = roc_auc_score(y_test, y_pred_proba)

print("\\nTest Set Performance:")
print(f"  Accuracy:  {accuracy:.4f}")
print(f"  Precision: {precision:.4f}")
print(f"  Recall:    {recall:.4f}")
print(f"  F1 Score:  {f1:.4f}")
print(f"  ROC AUC:   {roc_auc:.4f}")

# Step 9: Compare with Default Model
print("\\n" + "=" * 70)
print("STEP 9: COMPARISON WITH DEFAULT MODEL")
print("=" * 70)

default_model = DecisionTreeClassifier(random_state=42)
default_model.fit(X_train, y_train)
y_pred_default = default_model.predict(X_test)

default_f1 = f1_score(y_test, y_pred_default)
improvement = ((f1 - default_f1) / default_f1) * 100

print(f"\\nDefault model F1:     {default_f1:.4f}")
print(f"Optimized model F1:   {f1:.4f}")
print(f"Improvement:          {improvement:.2f}%")

# Step 10: Randomized Search (Faster Alternative)
print("\\n" + "=" * 70)
print("STEP 10: RANDOMIZED SEARCH (FASTER ALTERNATIVE)")
print("=" * 70)

# Expanded parameter distributions
param_distributions = {
    'criterion': ['gini', 'entropy'],
    'max_depth': list(range(3, 21)) + [None],
    'min_samples_split': list(range(2, 31)),
    'min_samples_leaf': list(range(1, 16)),
    'max_features': ['sqrt', 'log2', None],
    'class_weight': [None, 'balanced']
}

print("\\nStarting Randomized Search...")
print(f"Testing {50} random combinations")

start_time = time.time()

random_search = RandomizedSearchCV(
    estimator=DecisionTreeClassifier(random_state=42),
    param_distributions=param_distributions,
    n_iter=50,  # Number of random combinations to try
    scoring='f1',
    cv=5,
    verbose=1,
    n_jobs=-1,
    random_state=42,
    return_train_score=True
)

random_search.fit(X_train, y_train)

elapsed_time = time.time() - start_time
print(f"\\n✓ Randomized Search completed in {elapsed_time:.2f} seconds")

print("\\nBest Parameters (Randomized Search):")
for param, value in random_search.best_params_.items():
    print(f"  {param}: {value}")

print(f"\\nBest F1 Score: {random_search.best_score_:.4f}")

# Final comparison
y_pred_random = random_search.best_estimator_.predict(X_test)
random_f1 = f1_score(y_test, y_pred_random)

print("\\n" + "=" * 70)
print("FINAL COMPARISON")
print("=" * 70)
print(f"\\nDefault Model F1:         {default_f1:.4f}")
print(f"Grid Search F1:           {f1:.4f}")
print(f"Randomized Search F1:     {random_f1:.4f}")

print("\\n" + "=" * 70)
print("HYPERPARAMETER TUNING COMPLETE!")
print("=" * 70)`})]})]})]}),i==="rf"&&a===0&&e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-4xl font-bold text-green-900 mb-6",children:"Random Forest Overview"}),e.jsxs("div",{className:"bg-gradient-to-r from-green-100 to-teal-100 rounded-lg p-6",children:[e.jsx("p",{className:"text-lg text-gray-700 leading-relaxed mb-4",children:"Random Forest is an ensemble learning method that constructs multiple decision trees during training and outputs the mode (classification) or mean (regression) of individual trees. It adds randomness by bootstrapping samples and selecting random feature subsets at each split."}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4 mt-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-green-700 mb-2",children:"Key Advantages"}),e.jsxs("ul",{className:"text-sm space-y-1",children:[e.jsx("li",{children:"✅ Reduces overfitting through averaging"}),e.jsx("li",{children:"✅ Handles high-dimensional data well"}),e.jsx("li",{children:"✅ Robust to outliers and noise"}),e.jsx("li",{children:"✅ Provides feature importance"})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-green-700 mb-2",children:"Hyperparameters"}),e.jsxs("ul",{className:"text-sm space-y-1",children:[e.jsx("li",{children:"• n_estimators: Number of trees"}),e.jsx("li",{children:"• max_depth: Tree depth limit"}),e.jsx("li",{children:"• max_features: Features per split"}),e.jsx("li",{children:"• min_samples_split: Min samples to split"})]})]})]})]})]}),e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-6 mt-8 text-center",children:[e.jsx("p",{className:"text-gray-600 font-semibold text-lg mb-2",children:"🎓 Complete Machine Learning Models Guide"}),e.jsx("p",{className:"text-sm text-gray-500 mb-3",children:"Master Decision Trees, Ensembles, Boosting, and SVMs with practical implementations"}),e.jsxs("div",{className:"flex justify-center gap-6 text-xs text-gray-500 flex-wrap",children:[e.jsx("span",{children:"📊 Feature Engineering"}),e.jsx("span",{children:"•"}),e.jsx("span",{children:"💻 3 Code Examples per Model"}),e.jsx("span",{children:"•"}),e.jsx("span",{children:"🎯 Production-Ready"}),e.jsx("span",{children:"•"}),e.jsx("span",{children:"🚀 Scikit-learn"})]})]})]})})},yt=()=>{const[i,s]=x.useState("models"),[a,o]=x.useState(0),[l,d]=x.useState({}),n=c=>{d(u=>({...u,[c]:!u[c]}))},m=i==="models"?[{id:0,title:"Decision Trees",icon:e.jsx(Re,{className:"w-6 h-6"})},{id:1,title:"Random Forest",icon:e.jsx(Xe,{className:"w-6 h-6"})},{id:2,title:"Gradient Boosting",icon:e.jsx(ae,{className:"w-6 h-6"})},{id:3,title:"XGBoost",icon:e.jsx(re,{className:"w-6 h-6"})},{id:4,title:"Support Vector Machines",icon:e.jsx(oe,{className:"w-6 h-6"})}]:[{id:0,title:"Data Preprocessing",icon:e.jsx(Ae,{className:"w-6 h-6"})},{id:1,title:"Feature Selection",icon:e.jsx(Pe,{className:"w-6 h-6"})},{id:2,title:"Feature Extraction",icon:e.jsx(xe,{className:"w-6 h-6"})},{id:3,title:"Feature Transformation",icon:e.jsx(Oe,{className:"w-6 h-6"})},{id:4,title:"Complete Pipeline",icon:e.jsx(Ne,{className:"w-6 h-6"})}];return e.jsx("div",{className:"min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8",children:e.jsxs("div",{className:"max-w-7xl mx-auto",children:[e.jsxs("div",{className:"bg-white rounded-lg shadow-xl p-8 mb-8",children:[e.jsx("h1",{className:"text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4",children:"Machine Learning Models & Feature Engineering"}),e.jsx("p",{className:"text-gray-700 text-xl",children:"Complete guide to classical ML algorithms and data preprocessing techniques"})]}),e.jsx("div",{className:"bg-white rounded-lg shadow-lg p-6 mb-8",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("button",{onClick:()=>{s("models"),o(0)},className:`flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-semibold text-lg transition-all ${i==="models"?"bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,children:[e.jsx(Ne,{className:"w-7 h-7"}),e.jsxs("div",{className:"text-left",children:[e.jsx("div",{children:"ML Models"}),e.jsx("div",{className:"text-xs opacity-80",children:"Trees, Forests, Boosting, SVM"})]})]}),e.jsxs("button",{onClick:()=>{s("features"),o(0)},className:`flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-semibold text-lg transition-all ${i==="features"?"bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,children:[e.jsx(Ae,{className:"w-7 h-7"}),e.jsxs("div",{className:"text-left",children:[e.jsx("div",{children:"Feature Engineering"}),e.jsx("div",{className:"text-xs opacity-80",children:"Preprocessing & Transformation"})]})]})]})}),e.jsx("div",{className:"bg-white rounded-lg shadow-lg p-6 mb-8",children:e.jsx("div",{className:"flex flex-wrap gap-3",children:m.map(c=>e.jsxs("button",{onClick:()=>o(c.id),className:`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${a===c.id?i==="models"?"bg-blue-600 text-white shadow-md":"bg-indigo-600 text-white shadow-md":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,children:[c.icon,e.jsx("span",{className:"font-medium",children:c.title})]},c.id))})}),i==="models"&&e.jsxs(e.Fragment,{children:[a===0&&e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-4xl font-bold text-blue-900 mb-6",children:"Decision Trees"}),e.jsxs("div",{className:"bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-2xl font-semibold text-gray-800 mb-4",children:"What are Decision Trees?"}),e.jsx("p",{className:"text-lg text-gray-700 leading-relaxed mb-4",children:"Decision Trees are supervised learning algorithms that create a tree-like model of decisions. They split data based on feature values, creating a flowchart-like structure where each internal node represents a test on a feature, each branch represents the outcome, and each leaf node represents a class label or value."}),e.jsxs("div",{className:"bg-white rounded-lg p-6",children:[e.jsx("h4",{className:"font-semibold mb-4 text-center",children:"Decision Tree Structure"}),e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsxs("div",{className:"bg-blue-500 text-white rounded-lg p-4 mb-4 text-center",children:[e.jsx("div",{className:"font-bold",children:"Age > 30?"}),e.jsx("div",{className:"text-xs",children:"Root Node"})]}),e.jsxs("div",{className:"flex items-start gap-16",children:[e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{className:"text-lg mb-2",children:"← Yes"}),e.jsxs("div",{className:"bg-purple-500 text-white rounded-lg p-4 mb-4 text-center",children:[e.jsx("div",{className:"font-bold",children:"Income > 50K?"}),e.jsx("div",{className:"text-xs",children:"Internal Node"})]}),e.jsxs("div",{className:"flex gap-8",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"text-sm mb-1",children:"Yes"}),e.jsxs("div",{className:"bg-green-500 text-white rounded-lg p-3",children:[e.jsx("div",{className:"font-bold",children:"Buy"}),e.jsx("div",{className:"text-xs",children:"Leaf"})]})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"text-sm mb-1",children:"No"}),e.jsxs("div",{className:"bg-red-500 text-white rounded-lg p-3",children:[e.jsx("div",{className:"font-bold",children:"Don't Buy"}),e.jsx("div",{className:"text-xs",children:"Leaf"})]})]})]})]}),e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{className:"text-lg mb-2",children:"No →"}),e.jsxs("div",{className:"bg-red-500 text-white rounded-lg p-3 mt-9",children:[e.jsx("div",{className:"font-bold",children:"Don't Buy"}),e.jsx("div",{className:"text-xs",children:"Leaf Node"})]})]})]})]})]})]}),e.jsxs("div",{className:"bg-indigo-50 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-2xl font-semibold mb-4",children:"Key Concepts"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-indigo-700 mb-2",children:"📊 Splitting Criteria"}),e.jsxs("ul",{className:"text-sm text-gray-600 space-y-1",children:[e.jsxs("li",{children:["• ",e.jsx("strong",{children:"Gini Impurity:"})," Measures probability of incorrect classification"]}),e.jsxs("li",{children:["• ",e.jsx("strong",{children:"Information Gain:"})," Based on entropy reduction"]}),e.jsxs("li",{children:["• ",e.jsx("strong",{children:"Variance Reduction:"})," For regression trees"]})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-indigo-700 mb-2",children:"🌳 Tree Parameters"}),e.jsxs("ul",{className:"text-sm text-gray-600 space-y-1",children:[e.jsxs("li",{children:["• ",e.jsx("strong",{children:"max_depth:"})," Maximum tree depth"]}),e.jsxs("li",{children:["• ",e.jsx("strong",{children:"min_samples_split:"})," Min samples to split node"]}),e.jsxs("li",{children:["• ",e.jsx("strong",{children:"min_samples_leaf:"})," Min samples in leaf node"]})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-indigo-700 mb-2",children:"✅ Advantages"}),e.jsxs("ul",{className:"text-sm text-gray-600 space-y-1",children:[e.jsx("li",{children:"• Easy to understand and interpret"}),e.jsx("li",{children:"• Handles both numerical and categorical data"}),e.jsx("li",{children:"• Requires little data preparation"})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-indigo-700 mb-2",children:"⚠️ Disadvantages"}),e.jsxs("ul",{className:"text-sm text-gray-600 space-y-1",children:[e.jsx("li",{children:"• Can easily overfit"}),e.jsx("li",{children:"• Unstable (small data changes = big tree changes)"}),e.jsx("li",{children:"• Biased toward dominant classes"})]})]})]})]}),e.jsxs("div",{className:"bg-gray-50 rounded-lg p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("h3",{className:"text-xl font-semibold flex items-center gap-2",children:[e.jsx(L,{className:"w-5 h-5"}),"Decision Tree Implementation"]}),e.jsxs("button",{onClick:()=>n("dt"),className:"flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",children:[l.dt?e.jsx(U,{className:"w-4 h-4"}):e.jsx(G,{className:"w-4 h-4"}),l.dt?"Hide":"Show"," Code"]})]}),l.dt&&e.jsx("pre",{className:"bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm",children:`import numpy as np
import pandas as pd
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn import tree
import matplotlib.pyplot as plt

# ============================================
# Classification Example
# ============================================

# Load data
from sklearn.datasets import load_iris
iris = load_iris()
X, y = iris.data, iris.target

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# Create Decision Tree Classifier
dt_classifier = DecisionTreeClassifier(
    criterion='gini',        # 'gini' or 'entropy'
    max_depth=3,            # Maximum depth of tree
    min_samples_split=2,    # Minimum samples required to split
    min_samples_leaf=1,     # Minimum samples required in leaf
    random_state=42
)

# Train the model
dt_classifier.fit(X_train, y_train)

# Make predictions
y_pred = dt_classifier.predict(X_test)

# Evaluate
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.4f}")
print("\\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=iris.target_names))

# Feature importance
feature_importance = dt_classifier.feature_importances_
for i, importance in enumerate(feature_importance):
    print(f"{iris.feature_names[i]}: {importance:.4f}")

# ============================================
# Visualize the Tree
# ============================================

plt.figure(figsize=(20, 10))
tree.plot_tree(
    dt_classifier,
    feature_names=iris.feature_names,
    class_names=iris.target_names,
    filled=True,
    rounded=True,
    fontsize=10
)
plt.title("Decision Tree Visualization")
plt.savefig("decision_tree.png", dpi=300, bbox_inches='tight')
plt.close()

# Export tree as text
tree_rules = tree.export_text(dt_classifier, feature_names=iris.feature_names)
print("\\nTree Rules:")
print(tree_rules)

# ============================================
# Regression Example
# ============================================

from sklearn.datasets import make_regression

# Generate regression data
X_reg, y_reg = make_regression(
    n_samples=1000, n_features=10, noise=20, random_state=42
)

X_train_reg, X_test_reg, y_train_reg, y_test_reg = train_test_split(
    X_reg, y_reg, test_size=0.3, random_state=42
)

# Create Decision Tree Regressor
dt_regressor = DecisionTreeRegressor(
    criterion='squared_error',  # Formerly 'mse'
    max_depth=5,
    min_samples_split=10,
    min_samples_leaf=5,
    random_state=42
)

# Train
dt_regressor.fit(X_train_reg, y_train_reg)

# Predict
y_pred_reg = dt_regressor.predict(X_test_reg)

# Evaluate
from sklearn.metrics import mean_squared_error, r2_score

mse = mean_squared_error(y_test_reg, y_pred_reg)
r2 = r2_score(y_test_reg, y_pred_reg)

print(f"\\nRegression MSE: {mse:.4f}")
print(f"R² Score: {r2:.4f}")

# ============================================
# Hyperparameter Tuning with GridSearchCV
# ============================================

from sklearn.model_selection import GridSearchCV

param_grid = {
    'max_depth': [3, 5, 7, 10, None],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4],
    'criterion': ['gini', 'entropy']
}

grid_search = GridSearchCV(
    DecisionTreeClassifier(random_state=42),
    param_grid,
    cv=5,
    scoring='accuracy',
    n_jobs=-1
)

grid_search.fit(X_train, y_train)

print("\\nBest Parameters:", grid_search.best_params_)
print(f"Best Cross-Validation Score: {grid_search.best_score_:.4f}")

# Test with best model
best_dt = grid_search.best_estimator_
test_accuracy = best_dt.score(X_test, y_test)
print(f"Test Accuracy with Best Model: {test_accuracy:.4f}")

# ============================================
# Handling Overfitting
# ============================================

# Before pruning
overfit_tree = DecisionTreeClassifier(random_state=42)
overfit_tree.fit(X_train, y_train)
train_acc = overfit_tree.score(X_train, y_train)
test_acc = overfit_tree.score(X_test, y_test)

print(f"\\nOverfitting Example:")
print(f"Train Accuracy: {train_acc:.4f}")
print(f"Test Accuracy: {test_acc:.4f}")
print(f"Overfitting Gap: {train_acc - test_acc:.4f}")

# After pruning
pruned_tree = DecisionTreeClassifier(
    max_depth=5,
    min_samples_split=10,
    min_samples_leaf=5,
    random_state=42
)
pruned_tree.fit(X_train, y_train)
train_acc_pruned = pruned_tree.score(X_train, y_train)
test_acc_pruned = pruned_tree.score(X_test, y_test)

print(f"\\nWith Pruning:")
print(f"Train Accuracy: {train_acc_pruned:.4f}")
print(f"Test Accuracy: {test_acc_pruned:.4f}")
print(f"Gap Reduced: {train_acc_pruned - test_acc_pruned:.4f}")

# ============================================
# Cost-Complexity Pruning
# ============================================

# Get pruning path
path = dt_classifier.cost_complexity_pruning_path(X_train, y_train)
ccp_alphas = path.ccp_alphas

# Train trees with different alpha values
trees = []
for ccp_alpha in ccp_alphas[:-1]:
    clf = DecisionTreeClassifier(
        random_state=42, 
        ccp_alpha=ccp_alpha
    )
    clf.fit(X_train, y_train)
    trees.append(clf)

# Find best alpha
train_scores = [clf.score(X_train, y_train) for clf in trees]
test_scores = [clf.score(X_test, y_test) for clf in trees]

# Select tree with best test score
best_index = np.argmax(test_scores)
best_alpha = ccp_alphas[best_index]

print(f"\\nBest CCP Alpha: {best_alpha:.6f}")
print(f"Best Test Score: {test_scores[best_index]:.4f}")`})]})]})}),a===1&&e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-4xl font-bold text-blue-900 mb-6",children:"Random Forest"}),e.jsxs("div",{className:"bg-gradient-to-r from-green-100 to-teal-100 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-2xl font-semibold mb-4",children:"Ensemble of Decision Trees"}),e.jsx("p",{className:"text-lg text-gray-700 mb-4",children:"Random Forest is an ensemble learning method that constructs multiple decision trees during training and outputs the mode (classification) or mean (regression) of individual trees. It reduces overfitting through bagging and feature randomness."}),e.jsxs("div",{className:"bg-white rounded-lg p-6",children:[e.jsx("h4",{className:"font-semibold mb-4 text-center",children:"Random Forest Architecture"}),e.jsxs("div",{className:"flex flex-col items-center gap-4",children:[e.jsx("div",{className:"bg-blue-500 text-white rounded-lg p-4 text-center",children:e.jsx("div",{className:"font-bold",children:"Training Data"})}),e.jsx("div",{className:"text-xl",children:"↓ Bootstrap Sampling"}),e.jsx("div",{className:"flex gap-4 flex-wrap justify-center",children:[1,2,3,4,5].map(c=>e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"bg-green-500 text-white rounded-lg p-3 mb-2",children:e.jsxs("div",{className:"text-sm font-bold",children:["Tree ",c]})}),e.jsxs("div",{className:"text-xs",children:["Random",e.jsx("br",{}),"Features"]})]},c))}),e.jsx("div",{className:"text-xl",children:"↓ Voting/Averaging"}),e.jsx("div",{className:"bg-purple-500 text-white rounded-lg p-4",children:e.jsx("div",{className:"font-bold",children:"Final Prediction"})})]})]})]}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4 mb-6",children:[e.jsxs("div",{className:"bg-green-50 rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-green-700 mb-3",children:"🌲 Bagging (Bootstrap Aggregating)"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Each tree trained on random subset of data with replacement"})]}),e.jsxs("div",{className:"bg-teal-50 rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-teal-700 mb-3",children:"🎲 Feature Randomness"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Each split considers random subset of features"})]}),e.jsxs("div",{className:"bg-blue-50 rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-blue-700 mb-3",children:"📊 Out-of-Bag (OOB) Error"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Built-in cross-validation using non-sampled data"})]}),e.jsxs("div",{className:"bg-indigo-50 rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-indigo-700 mb-3",children:"🎯 High Accuracy"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Generally more accurate than single decision tree"})]})]}),e.jsxs("div",{className:"bg-gray-50 rounded-lg p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("h3",{className:"text-xl font-semibold flex items-center gap-2",children:[e.jsx(L,{className:"w-5 h-5"}),"Random Forest Implementation"]}),e.jsxs("button",{onClick:()=>n("rf"),className:"flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",children:[l.rf?e.jsx(U,{className:"w-4 h-4"}):e.jsx(G,{className:"w-4 h-4"}),l.rf?"Hide":"Show"," Code"]})]}),l.rf&&e.jsx("pre",{className:"bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm",children:`from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.datasets import load_wine, make_regression
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import accuracy_score, classification_report
import numpy as np
import matplotlib.pyplot as plt

# ============================================
# Classification with Random Forest
# ============================================

# Load data
wine = load_wine()
X, y = wine.data, wine.target

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# Create Random Forest Classifier
rf_classifier = RandomForestClassifier(
    n_estimators=100,        # Number of trees
    max_depth=None,          # No limit on tree depth
    min_samples_split=2,     
    min_samples_leaf=1,
    max_features='sqrt',     # sqrt(n_features) for each split
    bootstrap=True,          # Use bootstrap sampling
    oob_score=True,          # Calculate out-of-bag score
    n_jobs=-1,               # Use all processors
    random_state=42
)

# Train
rf_classifier.fit(X_train, y_train)

# Predictions
y_pred = rf_classifier.predict(X_test)

# Evaluate
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.4f}")
print(f"OOB Score: {rf_classifier.oob_score_:.4f}")

print("\\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=wine.target_names))

# Feature Importance
feature_importance = rf_classifier.feature_importances_
feature_names = wine.feature_names

# Sort features by importance
indices = np.argsort(feature_importance)[::-1]

print("\\nFeature Importance Ranking:")
for i, idx in enumerate(indices):
    print(f"{i+1}. {feature_names[idx]}: {feature_importance[idx]:.4f}")

# ============================================
# Visualize Feature Importance
# ============================================

plt.figure(figsize=(10, 6))
plt.bar(range(len(feature_importance)), 
        feature_importance[indices])
plt.xticks(range(len(feature_importance)), 
           [feature_names[i] for i in indices], 
           rotation=45, ha='right')
plt.xlabel("Features")
plt.ylabel("Importance")
plt.title("Random Forest Feature Importance")
plt.tight_layout()
plt.savefig("rf_feature_importance.png")
plt.close()

# ============================================
# Cross-Validation
# ============================================

cv_scores = cross_val_score(
    rf_classifier, X, y, cv=5, scoring='accuracy'
)

print(f"\\nCross-Validation Scores: {cv_scores}")
print(f"Mean CV Accuracy: {cv_scores.mean():.4f} (+/- {cv_scores.std() * 2:.4f})")

# ============================================
# Regression with Random Forest
# ============================================

# Generate data
X_reg, y_reg = make_regression(
    n_samples=1000, n_features=20, noise=30, random_state=42
)

X_train_reg, X_test_reg, y_train_reg, y_test_reg = train_test_split(
    X_reg, y_reg, test_size=0.3, random_state=42
)

# Create Random Forest Regressor
rf_regressor = RandomForestRegressor(
    n_estimators=100,
    max_depth=10,
    min_samples_split=5,
    min_samples_leaf=2,
    max_features='sqrt',
    bootstrap=True,
    oob_score=True,
    n_jobs=-1,
    random_state=42
)

# Train
rf_regressor.fit(X_train_reg, y_train_reg)

# Predict
y_pred_reg = rf_regressor.predict(X_test_reg)

# Evaluate
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error

mse = mean_squared_error(y_test_reg, y_pred_reg)
mae = mean_absolute_error(y_test_reg, y_pred_reg)
r2 = r2_score(y_test_reg, y_pred_reg)

print(f"\\nRegression Metrics:")
print(f"MSE: {mse:.4f}")
print(f"MAE: {mae:.4f}")
print(f"R² Score: {r2:.4f}")
print(f"OOB Score: {rf_regressor.oob_score_:.4f}")

# ============================================
# Hyperparameter Tuning
# ============================================

from sklearn.model_selection import RandomizedSearchCV

param_distributions = {
    'n_estimators': [50, 100, 200, 300],
    'max_depth': [10, 20, 30, None],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4],
    'max_features': ['sqrt', 'log2', None],
    'bootstrap': [True, False]
}

random_search = RandomizedSearchCV(
    RandomForestClassifier(random_state=42),
    param_distributions,
    n_iter=20,
    cv=5,
    scoring='accuracy',
    n_jobs=-1,
    random_state=42
)

random_search.fit(X_train, y_train)

print("\\nBest Parameters:", random_search.best_params_)
print(f"Best CV Score: {random_search.best_score_:.4f}")

# Test best model
best_rf = random_search.best_estimator_
test_accuracy = best_rf.score(X_test, y_test)
print(f"Test Accuracy: {test_accuracy:.4f}")

# ============================================
# Learning Curves
# ============================================

from sklearn.model_selection import learning_curve

train_sizes, train_scores, val_scores = learning_curve(
    RandomForestClassifier(n_estimators=100, random_state=42),
    X, y, cv=5, n_jobs=-1,
    train_sizes=np.linspace(0.1, 1.0, 10)
)

train_mean = np.mean(train_scores, axis=1)
train_std = np.std(train_scores, axis=1)
val_mean = np.mean(val_scores, axis=1)
val_std = np.std(val_scores, axis=1)

plt.figure(figsize=(10, 6))
plt.plot(train_sizes, train_mean, label='Training score')
plt.plot(train_sizes, val_mean, label='Validation score')
plt.fill_between(train_sizes, train_mean - train_std, 
                 train_mean + train_std, alpha=0.1)
plt.fill_between(train_sizes, val_mean - val_std, 
                 val_mean + val_std, alpha=0.1)
plt.xlabel('Training Set Size')
plt.ylabel('Accuracy Score')
plt.title('Random Forest Learning Curves')
plt.legend()
plt.grid(True)
plt.savefig("rf_learning_curves.png")
plt.close()

# ============================================
# Partial Dependence Analysis
# ============================================

from sklearn.inspection import PartialDependenceDisplay

fig, ax = plt.subplots(figsize=(12, 4))
PartialDependenceDisplay.from_estimator(
    rf_classifier, X_train, features=[0, 1, 2],
    feature_names=feature_names, ax=ax
)
plt.tight_layout()
plt.savefig("rf_partial_dependence.png")
plt.close()

print("\\nRandom Forest analysis complete!")`})]})]}),a===2&&e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-4xl font-bold text-blue-900 mb-6",children:"Gradient Boosting"}),e.jsxs("div",{className:"bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-2xl font-semibold mb-4",children:"Sequential Ensemble Learning"}),e.jsx("p",{className:"text-lg text-gray-700 mb-4",children:"Gradient Boosting builds models sequentially, where each new model corrects errors made by previous models. Unlike Random Forest (parallel), Gradient Boosting trains trees one at a time, with each tree learning from the mistakes of the previous ensemble."}),e.jsxs("div",{className:"bg-white rounded-lg p-6",children:[e.jsx("h4",{className:"font-semibold mb-4 text-center",children:"Gradient Boosting Process"}),e.jsx("div",{className:"space-y-4",children:[{step:1,title:"Initialize",desc:"Start with simple prediction (e.g., mean)",color:"blue"},{step:2,title:"Compute Residuals",desc:"Calculate errors (actual - predicted)",color:"purple"},{step:3,title:"Fit New Tree",desc:"Train tree to predict residuals",color:"pink"},{step:4,title:"Update Model",desc:"Add new tree with learning rate",color:"red"},{step:5,title:"Repeat",desc:"Continue for n_estimators iterations",color:"orange"}].map(c=>e.jsxs("div",{className:"flex items-center gap-4 bg-gray-50 rounded-lg p-3",children:[e.jsx("div",{className:`w-10 h-10 bg-${c.color}-500 text-white rounded-full flex items-center justify-center font-bold`,children:c.step}),e.jsxs("div",{children:[e.jsx("div",{className:"font-semibold",children:c.title}),e.jsx("div",{className:"text-sm text-gray-600",children:c.desc})]})]},c.step))})]})]}),e.jsxs("div",{className:"bg-gray-50 rounded-lg p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("h3",{className:"text-xl font-semibold flex items-center gap-2",children:[e.jsx(L,{className:"w-5 h-5"}),"Gradient Boosting Implementation"]}),e.jsxs("button",{onClick:()=>n("gb"),className:"flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",children:[l.gb?e.jsx(U,{className:"w-4 h-4"}):e.jsx(G,{className:"w-4 h-4"}),l.gb?"Hide":"Show"," Code"]})]}),l.gb&&e.jsx("pre",{className:"bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm",children:`from sklearn.ensemble import GradientBoostingClassifier, GradientBoostingRegressor
from sklearn.datasets import load_breast_cancer, make_regression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, roc_auc_score, roc_curve
import numpy as np
import matplotlib.pyplot as plt

# ============================================
# Classification with Gradient Boosting
# ============================================

# Load data
cancer = load_breast_cancer()
X, y = cancer.data, cancer.target

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# Create Gradient Boosting Classifier
gb_classifier = GradientBoostingClassifier(
    n_estimators=100,         # Number of boosting stages
    learning_rate=0.1,        # Shrinks contribution of each tree
    max_depth=3,              # Maximum depth of individual trees
    min_samples_split=2,
    min_samples_leaf=1,
    subsample=1.0,            # Fraction of samples for fitting trees
    loss='log_loss',          # Loss function to optimize
    random_state=42
)

# Train
gb_classifier.fit(X_train, y_train)

# Predictions
y_pred = gb_classifier.predict(X_test)
y_pred_proba = gb_classifier.predict_proba(X_test)[:, 1]

# Evaluate
accuracy = accuracy_score(y_test, y_pred)
auc = roc_auc_score(y_test, y_pred_proba)

print(f"Accuracy: {accuracy:.4f}")
print(f"AUC-ROC: {auc:.4f}")

# Feature importance
feature_importance = gb_classifier.feature_importances_
top_features = np.argsort(feature_importance)[-10:]

print("\\nTop 10 Most Important Features:")
for idx in top_features[::-1]:
    print(f"{cancer.feature_names[idx]}: {feature_importance[idx]:.4f}")

# ============================================
# Training Deviance (Loss) Plot
# ============================================

# Plot training deviance
train_score = np.zeros((gb_classifier.n_estimators,))
test_score = np.zeros((gb_classifier.n_estimators,))

for i, y_pred in enumerate(gb_classifier.staged_predict(X_train)):
    train_score[i] = gb_classifier.loss_(y_train, 
                                         gb_classifier.decision_function(X_train))

for i, y_pred in enumerate(gb_classifier.staged_predict(X_test)):
    test_score[i] = gb_classifier.loss_(y_test, 
                                        gb_classifier.decision_function(X_test))

plt.figure(figsize=(10, 6))
plt.plot(train_score, label='Training Loss')
plt.plot(test_score, label='Test Loss')
plt.xlabel('Boosting Iterations')
plt.ylabel('Loss')
plt.title('Gradient Boosting: Training vs Test Loss')
plt.legend()
plt.grid(True)
plt.savefig('gb_loss_curves.png')
plt.close()

# ============================================
# Regression with Gradient Boosting
# ============================================

X_reg, y_reg = make_regression(
    n_samples=1000, n_features=20, noise=30, random_state=42
)

X_train_reg, X_test_reg, y_train_reg, y_test_reg = train_test_split(
    X_reg, y_reg, test_size=0.3, random_state=42
)

gb_regressor = GradientBoostingRegressor(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=4,
    min_samples_split=5,
    min_samples_leaf=3,
    loss='squared_error',
    subsample=0.8,            # Stochastic gradient boosting
    random_state=42
)

# Train
gb_regressor.fit(X_train_reg, y_train_reg)

# Predict
y_pred_reg = gb_regressor.predict(X_test_reg)

# Evaluate
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error

mse = mean_squared_error(y_test_reg, y_pred_reg)
mae = mean_absolute_error(y_test_reg, y_pred_reg)
r2 = r2_score(y_test_reg, y_pred_reg)

print(f"\\nRegression Metrics:")
print(f"MSE: {mse:.4f}")
print(f"MAE: {mae:.4f}")
print(f"R² Score: {r2:.4f}")

# ============================================
# Early Stopping
# ============================================

gb_early_stop = GradientBoostingClassifier(
    n_estimators=1000,
    learning_rate=0.1,
    max_depth=3,
    validation_fraction=0.2,  # Use 20% of training data for validation
    n_iter_no_change=10,      # Stop if no improvement for 10 iterations
    tol=0.0001,               # Tolerance for improvement
    random_state=42
)

gb_early_stop.fit(X_train, y_train)

print(f"\\nEarly Stopping:")
print(f"Optimal number of trees: {gb_early_stop.n_estimators_}")
print(f"Best validation score: {gb_early_stop.best_score_:.4f}")

# ============================================
# Hyperparameter Tuning
# ============================================

from sklearn.model_selection import GridSearchCV

param_grid = {
    'n_estimators': [50, 100, 200],
    'learning_rate': [0.01, 0.1, 0.5],
    'max_depth': [3, 5, 7],
    'subsample': [0.8, 1.0]
}

grid_search = GridSearchCV(
    GradientBoostingClassifier(random_state=42),
    param_grid,
    cv=5,
    scoring='roc_auc',
    n_jobs=-1
)

grid_search.fit(X_train, y_train)

print("\\nBest Parameters:", grid_search.best_params_)
print(f"Best CV AUC: {grid_search.best_score_:.4f}")

# Test best model
best_gb = grid_search.best_estimator_
test_auc = roc_auc_score(y_test, best_gb.predict_proba(X_test)[:, 1])
print(f"Test AUC: {test_auc:.4f}")

# ============================================
# Learning Rate Impact
# ============================================

learning_rates = [0.001, 0.01, 0.1, 0.5, 1.0]
train_scores = []
test_scores = []

for lr in learning_rates:
    gb = GradientBoostingClassifier(
        n_estimators=100,
        learning_rate=lr,
        max_depth=3,
        random_state=42
    )
    gb.fit(X_train, y_train)
    
    train_scores.append(gb.score(X_train, y_train))
    test_scores.append(gb.score(X_test, y_test))

plt.figure(figsize=(10, 6))
plt.plot(learning_rates, train_scores, marker='o', label='Train')
plt.plot(learning_rates, test_scores, marker='s', label='Test')
plt.xscale('log')
plt.xlabel('Learning Rate')
plt.ylabel('Accuracy')
plt.title('Learning Rate vs Model Performance')
plt.legend()
plt.grid(True)
plt.savefig('gb_learning_rate.png')
plt.close()

print("\\nGradient Boosting analysis complete!")`})]})]}),a===3&&e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-4xl font-bold text-blue-900 mb-6",children:"XGBoost"}),e.jsxs("div",{className:"bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-2xl font-semibold mb-4",children:"Extreme Gradient Boosting"}),e.jsx("p",{className:"text-lg text-gray-700 mb-4",children:"XGBoost is an optimized distributed gradient boosting library designed for efficiency, flexibility, and portability. It's the go-to algorithm for winning Kaggle competitions and handles large-scale problems efficiently."}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-orange-700 mb-2",children:"⚡ Fast Training"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Parallel processing and optimized algorithms"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-orange-700 mb-2",children:"🎯 Regularization"}),e.jsx("p",{className:"text-sm text-gray-600",children:"L1 and L2 regularization to prevent overfitting"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-orange-700 mb-2",children:"🔧 Handles Missing"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Learns best direction for missing values"})]})]})]}),e.jsxs("div",{className:"bg-gray-50 rounded-lg p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("h3",{className:"text-xl font-semibold flex items-center gap-2",children:[e.jsx(L,{className:"w-5 h-5"}),"XGBoost Implementation"]}),e.jsxs("button",{onClick:()=>n("xgb"),className:"flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",children:[l.xgb?e.jsx(U,{className:"w-4 h-4"}):e.jsx(G,{className:"w-4 h-4"}),l.xgb?"Hide":"Show"," Code"]})]}),l.xgb&&e.jsx("pre",{className:"bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm",children:`import xgboost as xgb
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import accuracy_score, roc_auc_score
import numpy as np

# Load data
cancer = load_breast_cancer()
X, y = cancer.data, cancer.target

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# Create XGBoost Classifier
xgb_classifier = xgb.XGBClassifier(
    n_estimators=100,
    max_depth=3,
    learning_rate=0.1,
    objective='binary:logistic',
    subsample=0.8,
    colsample_bytree=0.8,
    gamma=0,                  # Minimum loss reduction
    reg_alpha=0,              # L1 regularization
    reg_lambda=1,             # L2 regularization
    random_state=42
)

# Train
xgb_classifier.fit(X_train, y_train)

# Predictions
y_pred = xgb_classifier.predict(X_test)
y_pred_proba = xgb_classifier.predict_proba(X_test)[:, 1]

# Evaluate
accuracy = accuracy_score(y_test, y_pred)
auc = roc_auc_score(y_test, y_pred_proba)

print(f"Accuracy: {accuracy:.4f}")
print(f"AUC-ROC: {auc:.4f}")

# Feature importance
importance = xgb_classifier.feature_importances_
for i, imp in enumerate(importance[:10]):
    print(f"{cancer.feature_names[i]}: {imp:.4f}")

# Using DMatrix for better performance
dtrain = xgb.DMatrix(X_train, label=y_train)
dtest = xgb.DMatrix(X_test, label=y_test)

params = {
    'max_depth': 3,
    'eta': 0.1,
    'objective': 'binary:logistic',
    'eval_metric': 'auc'
}

# Train with early stopping
evals = [(dtrain, 'train'), (dtest, 'test')]
bst = xgb.train(
    params, dtrain, num_boost_round=1000,
    evals=evals, early_stopping_rounds=10, verbose_eval=False
)

print(f"\\nBest iteration: {bst.best_iteration}")
print(f"Best score: {bst.best_score:.4f}")`})]})]}),a===4&&e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-4xl font-bold text-blue-900 mb-6",children:"Support Vector Machines (SVM)"}),e.jsxs("div",{className:"bg-gradient-to-r from-red-100 to-pink-100 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-2xl font-semibold mb-4",children:"Maximum Margin Classifier"}),e.jsx("p",{className:"text-lg text-gray-700 mb-4",children:"SVM finds the hyperplane that best separates classes by maximizing the margin between them. It can handle non-linear problems using the kernel trick, mapping data to higher dimensions where it becomes linearly separable."}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-red-700 mb-2",children:"📏 Maximum Margin"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Finds decision boundary with largest distance to nearest points"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-red-700 mb-2",children:"🔄 Kernel Trick"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Maps to high-dimensional space for non-linear separation"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-red-700 mb-2",children:"🎯 Support Vectors"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Only critical points near boundary matter"})]})]})]}),e.jsxs("div",{className:"bg-gray-50 rounded-lg p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("h3",{className:"text-xl font-semibold flex items-center gap-2",children:[e.jsx(L,{className:"w-5 h-5"}),"SVM Implementation"]}),e.jsxs("button",{onClick:()=>n("svm"),className:"flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700",children:[l.svm?e.jsx(U,{className:"w-4 h-4"}):e.jsx(G,{className:"w-4 h-4"}),l.svm?"Hide":"Show"," Code"]})]}),l.svm&&e.jsx("pre",{className:"bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm",children:`from sklearn.svm import SVC, SVR
from sklearn.datasets import load_iris, make_circles
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report
import numpy as np
import matplotlib.pyplot as plt

# ============================================
# Linear SVM
# ============================================

iris = load_iris()
X, y = iris.data, iris.target

# Use only 2 classes for visualization
X = X[y != 2]
y = y[y != 2]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# Scale features (important for SVM!)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Linear SVM
svm_linear = SVC(kernel='linear', C=1.0, random_state=42)
svm_linear.fit(X_train_scaled, y_train)

y_pred = svm_linear.predict(X_test_scaled)
accuracy = accuracy_score(y_test, y_pred)
print(f"Linear SVM Accuracy: {accuracy:.4f}")

# ============================================
# Non-Linear SVM with RBF Kernel
# ============================================

# Generate non-linearly separable data
X_circles, y_circles = make_circles(n_samples=500, noise=0.1, factor=0.3, random_state=42)

X_train_c, X_test_c, y_train_c, y_test_c = train_test_split(
    X_circles, y_circles, test_size=0.3, random_state=42
)

# RBF (Radial Basis Function) Kernel
svm_rbf = SVC(kernel='rbf', C=1.0, gamma='scale', random_state=42)
svm_rbf.fit(X_train_c, y_train_c)

y_pred_rbf = svm_rbf.predict(X_test_c)
accuracy_rbf = accuracy_score(y_test_c, y_pred_rbf)
print(f"\\nRBF SVM Accuracy: {accuracy_rbf:.4f}")

# ============================================
# Different Kernels
# ============================================

kernels = ['linear', 'poly', 'rbf', 'sigmoid']

for kernel in kernels:
    svm = SVC(kernel=kernel, random_state=42)
    svm.fit(X_train_scaled, y_train)
    score = svm.score(X_test_scaled, y_test)
    print(f"{kernel.upper()} kernel accuracy: {score:.4f}")

# ============================================
# Hyperparameter Tuning
# ============================================

param_grid = {
    'C': [0.1, 1, 10, 100],
    'gamma': ['scale', 'auto', 0.001, 0.01, 0.1],
    'kernel': ['rbf', 'poly']
}

grid_search = GridSearchCV(SVC(), param_grid, cv=5, scoring='accuracy')
grid_search.fit(X_train_scaled, y_train)

print(f"\\nBest Parameters: {grid_search.best_params_}")
print(f"Best CV Score: {grid_search.best_score_:.4f}")

# ============================================
# SVR for Regression
# ============================================

from sklearn.datasets import make_regression

X_reg, y_reg = make_regression(n_samples=1000, n_features=10, noise=20, random_state=42)

X_train_reg, X_test_reg, y_train_reg, y_test_reg = train_test_split(
    X_reg, y_reg, test_size=0.3, random_state=42
)

svr = SVR(kernel='rbf', C=100, epsilon=0.1)
svr.fit(X_train_reg, y_train_reg)

y_pred_reg = svr.predict(X_test_reg)

from sklearn.metrics import mean_squared_error, r2_score
mse = mean_squared_error(y_test_reg, y_pred_reg)
r2 = r2_score(y_test_reg, y_pred_reg)

print(f"\\nSVR MSE: {mse:.4f}")
print(f"SVR R² Score: {r2:.4f}")

print("\\nSVM analysis complete!")`})]})]})]}),i==="features"&&e.jsxs(e.Fragment,{children:[a===0&&e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-4xl font-bold text-indigo-900 mb-6",children:"Data Preprocessing"}),e.jsxs("div",{className:"bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-2xl font-semibold mb-4",children:"Essential Preprocessing Steps"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-indigo-700 mb-2",children:"🧹 Data Cleaning"}),e.jsxs("ul",{className:"text-sm text-gray-600 space-y-1",children:[e.jsx("li",{children:"• Handle missing values"}),e.jsx("li",{children:"• Remove duplicates"}),e.jsx("li",{children:"• Fix data types"}),e.jsx("li",{children:"• Handle outliers"})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-indigo-700 mb-2",children:"📊 Scaling"}),e.jsxs("ul",{className:"text-sm text-gray-600 space-y-1",children:[e.jsx("li",{children:"• Standardization (Z-score)"}),e.jsx("li",{children:"• Normalization (Min-Max)"}),e.jsx("li",{children:"• Robust scaling"})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-indigo-700 mb-2",children:"🔢 Encoding"}),e.jsxs("ul",{className:"text-sm text-gray-600 space-y-1",children:[e.jsx("li",{children:"• One-Hot Encoding"}),e.jsx("li",{children:"• Label Encoding"}),e.jsx("li",{children:"• Target Encoding"})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-indigo-700 mb-2",children:"⚖️ Balancing"}),e.jsxs("ul",{className:"text-sm text-gray-600 space-y-1",children:[e.jsx("li",{children:"• SMOTE (oversampling)"}),e.jsx("li",{children:"• Undersampling"}),e.jsx("li",{children:"• Class weights"})]})]})]})]}),e.jsxs("div",{className:"bg-gray-50 rounded-lg p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("h3",{className:"text-xl font-semibold flex items-center gap-2",children:[e.jsx(L,{className:"w-5 h-5"}),"Complete Preprocessing Pipeline"]}),e.jsxs("button",{onClick:()=>n("preprocess"),className:"flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700",children:[l.preprocess?e.jsx(U,{className:"w-4 h-4"}):e.jsx(G,{className:"w-4 h-4"}),l.preprocess?"Hide":"Show"," Code"]})]}),l.preprocess&&e.jsx("pre",{className:"bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm",children:`import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from sklearn.impute import SimpleImputer
from imblearn.over_sampling import SMOTE
from imblearn.under_sampling import RandomUnderSampler

# Create sample dataset
data = pd.DataFrame({
    'age': [25, 30, np.nan, 45, 28, 35, np.nan, 50],
    'income': [50000, 60000, 45000, 80000, np.nan, 70000, 65000, 90000],
    'education': ['Bachelor', 'Master', 'PhD', 'Bachelor', 'Master', 'PhD', 'Bachelor', 'Master'],
    'city': ['NY', 'LA', 'NY', 'SF', 'LA', 'SF', 'NY', 'LA'],
    'purchased': [0, 1, 0, 1, 0, 1, 0, 1]
})

print("Original Data:")
print(data)
print(f"\\nMissing values:\\n{data.isnull().sum()}")

# ============================================
# 1. Handle Missing Values
# ============================================

# Numerical imputation
num_imputer = SimpleImputer(strategy='mean')  # or 'median', 'most_frequent'
data['age'] = num_imputer.fit_transform(data[['age']])
data['income'] = num_imputer.fit_transform(data[['income']])

print(f"\\nAfter imputation:\\n{data.isnull().sum()}")

# ============================================
# 2. Handle Outliers
# ============================================

def detect_outliers_iqr(df, column):
    """Detect outliers using IQR method"""
    Q1 = df[column].quantile(0.25)
    Q3 = df[column].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    
    outliers = df[(df[column] < lower_bound) | (df[column] > upper_bound)]
    return outliers

# Detect outliers in income
outliers = detect_outliers_iqr(data, 'income')
print(f"\\nOutliers in income: {len(outliers)}")

# Cap outliers instead of removing
def cap_outliers(df, column):
    Q1 = df[column].quantile(0.25)
    Q3 = df[column].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    
    df[column] = df[column].clip(lower=lower_bound, upper=upper_bound)
    return df

data = cap_outliers(data.copy(), 'income')

# ============================================
# 3. Encoding Categorical Variables
# ============================================

# Label Encoding (for ordinal data)
education_order = {'Bachelor': 0, 'Master': 1, 'PhD': 2}
data['education_encoded'] = data['education'].map(education_order)

# One-Hot Encoding (for nominal data)
city_encoded = pd.get_dummies(data['city'], prefix='city')
data = pd.concat([data, city_encoded], axis=1)

print(f"\\nAfter encoding:\\n{data.head()}")

# ============================================
# 4. Feature Scaling
# ============================================

# Prepare features for scaling
X = data[['age', 'income']].values

# StandardScaler (Z-score normalization)
standard_scaler = StandardScaler()
X_standardized = standard_scaler.fit_transform(X)

print(f"\\nStandardized features (mean=0, std=1):")
print(f"Mean: {X_standardized.mean(axis=0)}")
print(f"Std: {X_standardized.std(axis=0)}")

# MinMaxScaler (normalize to [0, 1])
minmax_scaler = MinMaxScaler()
X_normalized = minmax_scaler.fit_transform(X)

print(f"\\nNormalized features (range [0,1]):")
print(f"Min: {X_normalized.min(axis=0)}")
print(f"Max: {X_normalized.max(axis=0)}")

# RobustScaler (uses median and IQR, robust to outliers)
robust_scaler = RobustScaler()
X_robust = robust_scaler.fit_transform(X)

# ============================================
# 5. Handle Imbalanced Data
# ============================================

# Simulate imbalanced dataset
from sklearn.datasets import make_classification

X_imb, y_imb = make_classification(
    n_samples=1000, n_features=20, n_classes=2,
    weights=[0.9, 0.1], random_state=42
)

print(f"\\nOriginal class distribution:")
unique, counts = np.unique(y_imb, return_counts=True)
print(dict(zip(unique, counts)))

# SMOTE (Synthetic Minority Over-sampling)
smote = SMOTE(random_state=42)
X_balanced, y_balanced = smote.fit_resample(X_imb, y_imb)

print(f"\\nAfter SMOTE:")
unique, counts = np.unique(y_balanced, return_counts=True)
print(dict(zip(unique, counts)))

# Random Undersampling
undersampler = RandomUnderSampler(random_state=42)
X_under, y_under = undersampler.fit_resample(X_imb, y_imb)

print(f"\\nAfter Undersampling:")
unique, counts = np.unique(y_under, return_counts=True)
print(dict(zip(unique, counts)))

# ============================================
# 6. Complete Preprocessing Pipeline
# ============================================

from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

# Define numeric and categorical features
numeric_features = ['age', 'income']
categorical_features = ['education', 'city']

# Create preprocessing pipelines
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='mean')),
    ('scaler', StandardScaler())
])

categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('onehot', OneHotEncoder(drop='first', sparse_output=False))
])

# Combine transformers
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('cat', categorical_transformer, categorical_features)
    ])

# Create full pipeline with model
from sklearn.ensemble import RandomForestClassifier

full_pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
])

# Use the pipeline
X = data[numeric_features + categorical_features]
y = data['purchased']

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# Fit and predict
full_pipeline.fit(X_train, y_train)
accuracy = full_pipeline.score(X_test, y_test)
print(f"\\nPipeline Accuracy: {accuracy:.4f}")

print("\\nData preprocessing complete!")`})]})]}),a===1&&e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-4xl font-bold text-indigo-900 mb-6",children:"Feature Selection"}),e.jsxs("div",{className:"bg-purple-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-semibold mb-4",children:"Methods"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"bg-white rounded-lg p-3",children:[e.jsx("h4",{className:"font-semibold",children:"Filter Methods"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Correlation, Chi-square, Mutual Information"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-3",children:[e.jsx("h4",{className:"font-semibold",children:"Wrapper Methods"}),e.jsx("p",{className:"text-sm text-gray-600",children:"RFE, Forward/Backward Selection"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-3",children:[e.jsx("h4",{className:"font-semibold",children:"Embedded Methods"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Lasso, Tree-based importance"})]})]})]})]}),a===2&&e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-4xl font-bold text-indigo-900 mb-6",children:"Feature Extraction"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-blue-50 rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold mb-2",children:"PCA (Principal Component Analysis)"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Linear dimensionality reduction"})]}),e.jsxs("div",{className:"bg-purple-50 rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold mb-2",children:"t-SNE"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Non-linear visualization"})]})]})]}),a===3&&e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-4xl font-bold text-indigo-900 mb-6",children:"Feature Transformation"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"bg-green-50 rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold",children:"Polynomial Features"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Create interaction terms and powers"})]}),e.jsxs("div",{className:"bg-blue-50 rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold",children:"Log Transform"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Handle skewed distributions"})]})]})]}),a===4&&e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-4xl font-bold text-indigo-900 mb-6",children:"Complete ML Pipeline"}),e.jsxs("div",{className:"bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-6",children:[e.jsx("p",{className:"text-lg mb-4",children:"End-to-end machine learning workflow combining preprocessing, feature engineering, model training, and evaluation."}),e.jsx("div",{className:"flex flex-col gap-3",children:["Data Loading","Preprocessing","Feature Engineering","Model Training","Evaluation","Deployment"].map((c,u)=>e.jsxs("div",{className:"flex items-center gap-3 bg-white rounded-lg p-3",children:[e.jsx("div",{className:"w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold",children:u+1}),e.jsx("span",{className:"font-semibold",children:c})]},u))})]})]})]}),e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-6 mt-8 text-center",children:[e.jsx("p",{className:"text-gray-600 font-semibold text-lg mb-2",children:"🎓 Complete Machine Learning & Feature Engineering Guide"}),e.jsx("p",{className:"text-sm text-gray-500 mb-3",children:"Master classical ML algorithms and data preprocessing for production systems"}),e.jsxs("div",{className:"flex justify-center gap-6 text-xs text-gray-500 flex-wrap",children:[e.jsx("span",{children:"🌳 Decision Trees"}),e.jsx("span",{children:"•"}),e.jsx("span",{children:"🌲 Random Forest"}),e.jsx("span",{children:"•"}),e.jsx("span",{children:"📈 Gradient Boosting"}),e.jsx("span",{children:"•"}),e.jsx("span",{children:"⚡ XGBoost"}),e.jsx("span",{children:"•"}),e.jsx("span",{children:"🎯 SVM"}),e.jsx("span",{children:"•"}),e.jsx("span",{children:"🔧 Feature Engineering"})]})]})]})})},ie=i=>1/(1+Math.exp(-Math.max(-20,Math.min(20,i)))),H=(i,s,a)=>{const o=i.reduce((d,n,r)=>d+n*s[r],a),l=ie(o);return{z:o,raw:l,pred:l>=.5?1:0}},ce=(i,s,a,o,l,d=.4)=>{const n=l-o,r=i.map((m,c)=>Math.round((m-d*n*a[c])*1e3)/1e3),p=Math.round((s-d*n)*1e3)/1e3;return{newWs:r,newB:p,δ:n,diffs:i.map((m,c)=>-d*n*a[c])}},M=i=>typeof i=="number"?i.toFixed(2):"–",k=i=>typeof i=="number"?i.toFixed(3):"–",le=i=>(i>=0?"+":"")+k(i),vt=(i,s,a)=>Math.max(s,Math.min(a,i)),V=[{key:"free",label:"Has word FREE",icon:"💰"},{key:"link",label:"Has a link",icon:"🔗"},{key:"unknown",label:"Sender unknown",icon:"👤"}],te=[{id:1,xs:[1,1,1],y:1,name:"CLAIM YOUR PRIZE!!!",note:"All 3 red flags — classic spam"},{id:2,xs:[0,0,0],y:0,name:"Team meeting notes",note:"Nothing suspicious at all"},{id:3,xs:[1,0,0],y:0,name:"FREE weekend event",note:"FREE word but from known sender"},{id:4,xs:[0,1,1],y:1,name:"Click here now",note:"Suspicious link from unknown sender"},{id:5,xs:[1,1,0],y:1,name:"FREE gift inside!",note:"FREE + link = likely spam"},{id:6,xs:[0,1,0],y:0,name:"Newsletter digest",note:"Link but trusted sender"}],ue=[{key:"actor",label:"Has favourite actor",icon:"⭐"},{key:"comedy",label:"Is a comedy",icon:"😂"},{key:"long",label:"Over 2 hours long",icon:"⏳"}],Te=[{id:1,xs:[1,1,0],y:1,name:"The Funny Star",note:"Your fav actor + short comedy"},{id:2,xs:[0,0,1],y:0,name:"Epic Marathon",note:"No fav actor, drama, 3 hrs"},{id:3,xs:[1,0,0],y:1,name:"Action Hero",note:"Your fav actor, short action"},{id:4,xs:[0,1,0],y:1,name:"Quick Laughs",note:"Comedy without fav actor"},{id:5,xs:[1,1,1],y:1,name:"Epic Comedy",note:"Fav + comedy but very long"},{id:6,xs:[0,0,0],y:0,name:"Random Film",note:"Nothing special going for it"}],Ee=[{title:"Case 1 — Missed Spam 🚨",scenario:"The network saw an email with ALL THREE spam signals but still said 'not spam'.",xs:[1,1,1],y:1,ws:[.1,.1,.1],b:-.5,inputLabels:V,hint:"All inputs were 1, so all weights contributed to the prediction. Since we under-predicted, every active weight needs to go UP. The bias also needs to go UP.",fix:"increase"},{title:"Case 2 — False Alarm 📧",scenario:"A legit email with the word FREE was wrongly flagged as spam — only because the FREE weight was too powerful.",xs:[1,0,0],y:0,ws:[.9,.2,.2],b:0,inputLabels:V,hint:"Only x₁ (FREE) was active. We over-predicted spam. The weight for FREE should go DOWN. The other weights didn't fire so they don't change much.",fix:"w0_down"},{title:"Case 3 — Bias Too Eager 🎚️",scenario:"Even with NO spam signals at all, the network still says 'spam'. The bias is tilted too far positive.",xs:[0,0,0],y:0,ws:[.4,.4,.4],b:1.2,inputLabels:V,hint:"No inputs were active, so the weights didn't contribute. The entire false prediction came from the bias alone. Bias needs to go DOWN.",fix:"bias_down"}],ne=[{id:"A",xs:[1,0,1],ws:[.6,-.2,.8],b:-.3,label:1},{id:"B",xs:[0,1,0],ws:[.5,.9,.3],b:.1,label:1},{id:"C",xs:[1,1,0],ws:[.4,.2,.7],b:-.6,label:0},{id:"D",xs:[0,0,1],ws:[.3,.5,.2],b:0,label:0}],t={bg:"#06080c",panel:"#0c1018",panel2:"#111820",steel:"#1a2436",amber:"#f0a030",gold:"#d4840a",cream:"#e8d8b0",dim:"#6880a0",dimmer:"#304060",green:"#40c870",red:"#e84040",blue:"#40a0e0",teal:"#20c0b0",border:"#1a2840",mono:"'Courier New', 'Lucida Console', monospace",serif:"'Georgia', serif"},F=({ch:i,glow:s,style:a={},children:o})=>e.jsx("div",{style:{background:t.panel,borderRadius:12,border:`1px solid ${s?s+"55":t.border}`,boxShadow:s?`0 0 30px ${s}18, inset 0 0 40px ${s}06`:"none",padding:i?0:20,overflow:i?"hidden":"visible",...a},children:o}),z=({children:i,color:s=t.amber,sub:a})=>e.jsxs("div",{style:{marginBottom:14},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,letterSpacing:4,textTransform:"uppercase",color:s,fontWeight:700},children:i}),a&&e.jsx("div",{style:{fontFamily:t.serif,fontSize:13,color:t.dim,marginTop:3},children:a})]}),q=({children:i,color:s=t.amber})=>e.jsx("span",{style:{background:s+"1a",border:`1px solid ${s}50`,borderRadius:4,padding:"1px 7px",fontFamily:t.mono,fontSize:11,color:s,margin:"0 2px"},children:i}),Q=({children:i,color:s=t.teal})=>e.jsx("div",{style:{background:"#050a10",border:`1px solid ${s}35`,borderRadius:7,padding:"11px 16px",fontFamily:t.mono,fontSize:12.5,color:s,margin:"8px 0",lineHeight:2,whiteSpace:"pre-wrap",overflowX:"auto",borderLeft:`3px solid ${s}60`},children:i}),D=({children:i,onClick:s,color:a=t.amber,disabled:o,small:l,full:d})=>e.jsx("button",{onClick:s,disabled:o,style:{padding:l?"5px 14px":"9px 22px",borderRadius:8,border:`1px solid ${o?t.dimmer:a}`,background:o?"transparent":a+"15",color:o?t.dimmer:a,fontFamily:t.mono,fontSize:l?11:13,fontWeight:700,cursor:o?"default":"pointer",letterSpacing:1,transition:"all 0.15s",width:d?"100%":"auto"},children:i}),K=({label:i,value:s,color:a=t.amber,size:o=20})=>e.jsxs("div",{style:{background:"#050a10",borderRadius:7,padding:"10px 14px",border:`1px solid ${a}30`,textAlign:"center"},children:[e.jsx("div",{style:{color:t.dim,fontSize:9,fontFamily:t.mono,letterSpacing:2,marginBottom:4,textTransform:"uppercase"},children:i}),e.jsx("div",{style:{color:a,fontFamily:t.mono,fontSize:o,fontWeight:700},children:s})]}),J=({value:i,min:s=-2,max:a=2,onChange:o,color:l=t.amber,label:d,size:n=72})=>{const r=(i-s)/(a-s),p=n/2,m=n/2,c=n*.38,u=c*.55,h=N=>(N-90)*Math.PI/180,f=(N,P,A)=>{const T=Math.abs(P-N)>180?1:0,I=p+A*Math.cos(h(N)),B=m+A*Math.sin(h(N)),Y=p+A*Math.cos(h(P)),me=m+A*Math.sin(h(P));return`M ${I.toFixed(2)} ${B.toFixed(2)} A ${A} ${A} 0 ${T} 1 ${Y.toFixed(2)} ${me.toFixed(2)}`},g=-225,b=45,v=g+r*270,_=v,w=p+u*Math.cos(h(_)),j=m+u*Math.sin(h(_)),C=p+c*.85*Math.cos(h(_)),S=m+c*.85*Math.sin(h(_));return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:3},children:[e.jsxs("div",{style:{position:"relative",width:n,height:n},children:[e.jsxs("svg",{width:n,height:n,style:{display:"block"},children:[e.jsx("defs",{children:e.jsxs("radialGradient",{id:`kg-${d}`,cx:"40%",cy:"35%",r:"65%",children:[e.jsx("stop",{offset:"0%",stopColor:t.steel}),e.jsx("stop",{offset:"100%",stopColor:"#080c14"})]})}),e.jsx("path",{d:f(g,b,c),fill:"none",stroke:l+"22",strokeWidth:5,strokeLinecap:"round"}),r>.001&&e.jsx("path",{d:f(g,v,c),fill:"none",stroke:l,strokeWidth:5,strokeLinecap:"round"}),e.jsx("circle",{cx:p,cy:m,r:u,fill:`url(#kg-${d})`,stroke:l+"50",strokeWidth:1.5}),e.jsx("line",{x1:p.toFixed(2),y1:m.toFixed(2),x2:w.toFixed(2),y2:j.toFixed(2),stroke:l,strokeWidth:2,strokeLinecap:"round"}),e.jsx("circle",{cx:C.toFixed(2),cy:S.toFixed(2),r:3,fill:l}),(()=>{const N=(0-s)/(a-s),P=g+N*270,A=p+(c+4)*Math.cos(h(P)),T=m+(c+4)*Math.sin(h(P));return e.jsx("circle",{cx:A.toFixed(2),cy:T.toFixed(2),r:2,fill:t.dimmer})})()]}),e.jsx("input",{type:"range",min:s,max:a,step:.05,value:i,onChange:N=>o(+N.target.value),style:{position:"absolute",inset:0,opacity:0,cursor:"pointer",width:"100%",height:"100%"}})]}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:14,color:l,fontWeight:700},children:M(i)}),d&&e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:t.dim,letterSpacing:2,textTransform:"uppercase",textAlign:"center",maxWidth:80,lineHeight:1.3},children:d})]})},Be=({value:i,onChange:s,label:a,icon:o})=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6,cursor:"pointer"},onClick:()=>s(i===1?0:1),children:[e.jsx("div",{style:{fontSize:20},children:o}),e.jsx("div",{style:{width:44,height:24,borderRadius:12,background:i?t.green+"30":t.dimmer+"30",border:`2px solid ${i?t.green:t.dimmer}`,position:"relative",transition:"all 0.2s"},children:e.jsx("div",{style:{width:16,height:16,borderRadius:"50%",background:i?t.green:t.dimmer,position:"absolute",top:2,left:i?22:2,transition:"all 0.2s"}})}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:i?t.green:t.dim,letterSpacing:1,textAlign:"center",maxWidth:80,lineHeight:1.3,textTransform:"uppercase"},children:a}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:16,color:i?t.green:t.dim,fontWeight:700},children:i})]}),ye=({raw:i,size:s=160})=>{const a=vt(i,0,1),o=s,l=s*.55,d=o/2,n=l*.95,r=l*.85,p=-180+a*180,m=f=>f*Math.PI/180,c=d+r*Math.cos(m(p)),u=n+r*Math.sin(m(p)),h=a>=.5?t.green:t.red;return e.jsx("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:e.jsxs("svg",{width:o,height:l+20,style:{display:"block"},children:[e.jsx("path",{d:`M ${d-r} ${n} A ${r} ${r} 0 0 1 ${d+r} ${n}`,fill:"none",stroke:t.dimmer+"50",strokeWidth:10,strokeLinecap:"round"}),(()=>{const f=d+r*Math.cos(m(-90)),g=n+r*Math.sin(m(-90));return e.jsx("path",{d:`M ${d-r} ${n} A ${r} ${r} 0 0 1 ${f.toFixed(1)} ${g.toFixed(1)}`,fill:"none",stroke:t.red+"50",strokeWidth:10,strokeLinecap:"round"})})(),(()=>{const f=d+r*Math.cos(m(-90)),g=n+r*Math.sin(m(-90));return e.jsx("path",{d:`M ${f.toFixed(1)} ${g.toFixed(1)} A ${r} ${r} 0 0 1 ${d+r} ${n}`,fill:"none",stroke:t.green+"50",strokeWidth:10,strokeLinecap:"round"})})(),e.jsx("line",{x1:d,y1:n-r*.7,x2:d,y2:n-r*1.05,stroke:t.amber,strokeWidth:2}),e.jsx("text",{x:d,y:n-r*1.15,textAnchor:"middle",fill:t.amber,fontSize:9,fontFamily:"monospace",children:"0.5"}),e.jsx("line",{x1:d.toFixed(1),y1:n.toFixed(1),x2:c.toFixed(1),y2:u.toFixed(1),stroke:h,strokeWidth:3,strokeLinecap:"round"}),e.jsx("circle",{cx:d,cy:n,r:6,fill:t.panel,stroke:h,strokeWidth:2}),e.jsx("text",{x:d,y:n+20,textAnchor:"middle",fill:h,fontSize:13,fontFamily:"monospace",fontWeight:"bold",children:k(i)}),e.jsx("text",{x:d,y:n+34,textAnchor:"middle",fill:h,fontSize:11,fontFamily:"monospace",children:a>=.5?"→ YES (1)":"→ NO (0)"}),e.jsx("text",{x:d-r-4,y:n+6,textAnchor:"end",fill:t.red,fontSize:9,fontFamily:"monospace",children:"0"}),e.jsx("text",{x:d+r+4,y:n+6,textAnchor:"start",fill:t.green,fontSize:9,fontFamily:"monospace",children:"1"})]})})},Fe=({xs:i,ws:s,b:a,z:o,raw:l,pred:d,inputLabels:n,size:r="100%"})=>{const c=n||i.map((j,C)=>({label:`x${C+1}`})),u=240/2,h=i.length===2?[240*.3,240*.7]:i.length===3?[240*.2,240*.5,240*.8]:[240*.15,240*.38,240*.62,240*.85],f=u,g=55,b=240,v=385,_=i.map((j,C)=>j===0?t.dimmer:s[C]>0?t.green:s[C]<0?t.red:t.amber),w=d===1?t.green:t.red;return e.jsxs("svg",{viewBox:"0 0 440 240",style:{width:r,display:"block"},children:[i.map((j,C)=>{const S=h[C],N=j===0?.5:1+Math.abs(s[C])*2.5;return e.jsxs("g",{children:[e.jsx("line",{x1:g+22,y1:S,x2:b-28,y2:f,stroke:_[C],strokeWidth:N,strokeOpacity:j===0?.3:.7}),e.jsx("rect",{x:(g+b)/2-20,y:(S+f)/2-10,width:40,height:16,rx:3,fill:"#050a14",stroke:_[C]+"50"}),e.jsx("text",{x:(g+b)/2,y:(S+f)/2+3,textAnchor:"middle",fill:_[C],fontSize:9,fontFamily:"monospace",children:`w=${M(s[C])}`})]},C)}),e.jsx("circle",{cx:b,cy:f,r:28,fill:t.panel2,stroke:t.amber+"80",strokeWidth:2}),e.jsx("text",{x:b,y:f-7,textAnchor:"middle",fill:t.amber,fontSize:9,fontFamily:"monospace",children:"Σ + b"}),e.jsxs("text",{x:b,y:f+5,textAnchor:"middle",fill:t.teal,fontSize:9,fontFamily:"monospace",children:["z=",M(o)]}),e.jsx("text",{x:b,y:f+16,textAnchor:"middle",fill:t.dim,fontSize:8,fontFamily:"monospace",children:"σ(z)"}),e.jsx("rect",{x:b-22,y:f+32,width:44,height:16,rx:3,fill:"#050a14",stroke:t.gold+"60"}),e.jsx("text",{x:b,y:f+44,textAnchor:"middle",fill:t.gold,fontSize:9,fontFamily:"monospace",children:`b=${M(a)}`}),e.jsx("line",{x1:b+28,y1:f,x2:v-22,y2:f,stroke:w,strokeWidth:2.5}),e.jsx("circle",{cx:v,cy:f,r:22,fill:w+"20",stroke:w,strokeWidth:2}),e.jsx("text",{x:v,y:f-6,textAnchor:"middle",fill:w,fontSize:10,fontFamily:"monospace",fontWeight:"bold",children:M(l)}),e.jsx("text",{x:v,y:f+8,textAnchor:"middle",fill:w,fontSize:13,fontFamily:"monospace",fontWeight:"bold",children:d===1?"YES":"NO"}),i.map((j,C)=>{var N;const S=h[C];return e.jsxs("g",{children:[e.jsx("circle",{cx:g,cy:S,r:22,fill:j?_[C]+"25":t.panel2,stroke:j?_[C]:t.dimmer,strokeWidth:j?2:1}),e.jsx("text",{x:g,y:S-6,textAnchor:"middle",fill:j?_[C]:t.dimmer,fontSize:9,fontFamily:"monospace",children:((N=c[C])==null?void 0:N.icon)||`x${C+1}`}),e.jsx("text",{x:g,y:S+7,textAnchor:"middle",fill:j?_[C]:t.dimmer,fontSize:12,fontFamily:"monospace",fontWeight:"bold",children:j})]},C)})]})},_t=function(){const[s,a]=x.useState(0),o=[{num:1,emoji:"📥",color:t.blue,title:"Gather the Clues (Inputs × Weights)",body:"The network reads each input and multiplies it by a weight. The weight says how much to trust that clue. A weight of 0.9 means 'this matters a lot.' A weight of 0.1 means 'barely relevant.' A weight of −0.5 means 'this clue actually pushes against the answer.'",math:`For each input x_i and its weight w_i:
  contribution_i = x_i × w_i

Example (spam detector):
  "has FREE" × 0.7 = 0.7  (active, contributes)
  "has link"  × 0.6 = 0.6  (active, contributes)
  "unknown"   × 0.4 = 0.4  (active, contributes)`},{num:2,emoji:"➕",color:t.amber,title:"Add Everything Up + Bias",body:"Sum all the weighted contributions, then add the bias. Think of bias as a head-start or default lean. A positive bias means 'lean towards YES even without much evidence.' A negative bias means 'you need strong evidence before saying YES.'",math:`z = (x₁×w₁) + (x₂×w₂) + (x₃×w₃) + bias

Example:
  z = 0.7 + 0.6 + 0.4 + (−0.5)
    = 1.7 − 0.5
    = 1.2

This number z is called the "pre-activation" or "weighted sum."`},{num:3,emoji:"🎚️",color:t.teal,title:"Apply the Activation (Make a Decision)",body:"Run z through a sigmoid function: σ(z) = 1/(1+e^(-z)). This squashes any number into the range (0, 1). We then interpret values ≥ 0.5 as YES and < 0.5 as NO. The sigmoid is like a smooth on/off switch.",math:`raw_output = σ(z) = 1 / (1 + e^(−z))

σ(1.2) = 1 / (1 + e^(−1.2)) = 0.769

Since 0.769 ≥ 0.5 → prediction = YES / SPAM ✓

Key sigmoid properties:
  σ(0)   = 0.500  ← perfectly uncertain
  σ(2)   = 0.880  ← fairly confident YES
  σ(−2)  = 0.119  ← fairly confident NO`},{num:4,emoji:"❌",color:t.red,title:"Calculate the Error",body:"Compare the prediction to the real answer. The difference is the error. This single number is the feedback signal that drives all learning. A bigger error means a bigger correction is needed.",math:`error (δ) = raw_output − true_label

If prediction = 0.769 and label = 1 (really is spam):
  δ = 0.769 − 1.0 = −0.231

Negative δ: we under-predicted → need to push outputs UP
Positive δ: we over-predicted → need to push outputs DOWN

Loss = 0.5 × δ²  (measures total badness, always positive)`},{num:5,emoji:"🔧",color:t.green,title:"Adjust Weights and Bias",body:"Now we nudge each weight and the bias by a tiny amount called the learning rate (lr). The direction of the nudge is determined by: (a) how big the error was, (b) how active the input was, and (c) a small learning rate to avoid overcorrecting.",math:`Weight update rule:
  new_weight_i = old_weight_i − lr × δ × x_i

Bias update rule:
  new_bias = old_bias − lr × δ

Example with lr = 0.4, δ = −0.231:
  Δw₁ = −0.4 × (−0.231) × 1 = +0.092  → weight INCREASES ↑
  Δw₂ = −0.4 × (−0.231) × 1 = +0.092  → weight INCREASES ↑
  Δw₃ = −0.4 × (−0.231) × 1 = +0.092  → weight INCREASES ↑
  Δb  = −0.4 × (−0.231)      = +0.092  → bias INCREASES ↑`},{num:6,emoji:"🔁",color:t.amber,title:"Repeat Until Good",body:"This cycle — forward pass → compute error → update weights — is called one training step. Run it hundreds or thousands of times on all your training examples. Each pass, the weights and bias inch closer to values that minimize the total error across all examples.",math:`Training loop (pseudocode):
  for each epoch:
    for each example (x, y):
      z   = x₁w₁ + x₂w₂ + x₃w₃ + b
      ŷ   = σ(z)
      δ   = ŷ − y
      w_i = w_i − lr × δ × x_i  (for each i)
      b   = b − lr × δ
    print("Loss:", average error for this epoch)

Convergence: when the loss stops decreasing significantly,
the network has learned the pattern as well as it can.`}],l=o[s];return e.jsxs("div",{children:[e.jsxs(F,{glow:t.blue,style:{marginBottom:20},children:[e.jsx(z,{color:t.blue,sub:"A neural network learns by making predictions, measuring mistakes, and updating its internal settings.",children:"🧠 The Decision Machine — How It Learns"}),e.jsxs("p",{style:{fontFamily:t.serif,fontSize:14,color:t.cream,lineHeight:1.9,marginBottom:16},children:["Imagine you're building a small machine that learns to answer yes/no questions — like",e.jsx(q,{color:t.red,children:'"Is this email spam?"'})," or",e.jsx(q,{color:t.teal,children:'"Will I enjoy this movie?"'}),". Inside the machine are two kinds of adjustable settings:"]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16},children:[{icon:"🎛️",term:"Weights",color:t.amber,def:"A number attached to each input clue. It says 'how much should I trust this clue?' Weights can be positive (this supports the answer), negative (this contradicts the answer), or near zero (this clue barely matters)."},{icon:"⬆️",term:"Bias",color:t.gold,def:"A single built-in nudge added to every calculation. It represents the neuron's natural lean — how likely it is to fire even without strong input signals. A high positive bias means 'assume YES unless convinced otherwise.'"}].map(({icon:d,term:n,color:r,def:p})=>e.jsxs("div",{style:{background:"#050a14",borderRadius:9,padding:14,border:`1px solid ${r}35`},children:[e.jsxs("div",{style:{fontFamily:t.mono,fontSize:13,color:r,marginBottom:7,fontWeight:700},children:[d," ",n]}),e.jsx("p",{style:{fontFamily:t.serif,fontSize:13,color:t.dim,lineHeight:1.7,margin:0},children:p})]},n))}),e.jsx("p",{style:{fontFamily:t.serif,fontSize:13,color:t.dim,lineHeight:1.7},children:"The network doesn't start with good weights — it starts with guesses and improves through 6 repeating steps. Click each step below to explore exactly what happens."})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:8,marginBottom:16},children:o.map((d,n)=>e.jsxs("button",{onClick:()=>a(n),style:{padding:"10px 8px",borderRadius:10,cursor:"pointer",border:`2px solid ${s===n?d.color:t.border}`,background:s===n?d.color+"18":t.panel,textAlign:"left"},children:[e.jsxs("div",{style:{fontFamily:t.mono,fontSize:11,color:d.color,fontWeight:700,marginBottom:3},children:["Step ",d.num," ",d.emoji]}),e.jsx("div",{style:{fontFamily:t.serif,fontSize:12,color:t.dim,lineHeight:1.4},children:d.title})]},n))}),e.jsxs(F,{glow:l.color,children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:14},children:[e.jsx("div",{style:{width:36,height:36,borderRadius:"50%",background:l.color+"20",border:`2px solid ${l.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0},children:l.emoji}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontFamily:t.mono,fontSize:10,color:l.color,letterSpacing:3,textTransform:"uppercase"},children:["Step ",l.num]}),e.jsx("div",{style:{fontFamily:t.serif,fontSize:16,color:t.cream,fontWeight:700},children:l.title})]})]}),e.jsx("p",{style:{fontFamily:t.serif,fontSize:14,color:t.cream,lineHeight:1.85,marginBottom:14},children:l.body}),e.jsx(Q,{color:l.color,children:l.math}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:12},children:[e.jsx(D,{onClick:()=>a(d=>Math.max(0,d-1)),disabled:s===0,color:l.color,small:!0,children:"◀ Previous"}),e.jsx(D,{onClick:()=>a(d=>Math.min(5,d+1)),disabled:s===5,color:l.color,small:!0,children:"Next ▶"})]})]})]})},jt=function(){const[s,a]=x.useState([.5,.5,.4]),[o,l]=x.useState(-.6),[d,n]=x.useState([0,0,0]),[r,p]=x.useState(!1),[m,c]=x.useState(null),[u,h]=x.useState([]),[f,g]=x.useState(0),{z:b,raw:v,pred:_}=H(d,s,o),w=d.map((S,N)=>({val:S*s[N],input:S,w:s[N]})),j=S=>{n([...S.xs]),c(S.id),p(!0)},C=S=>{const{raw:N}=H(S.xs,s,o),{newWs:P,newB:A,δ:T,diffs:I}=ce(s,o,S.xs,S.y,N);h(B=>[...B.slice(-4),{ex:S,oldWs:[...s],oldB:o,newWs:P,newB:A,δ:T,diffs:I,r:N}]),a(P),l(A),g(B=>B+1)};return e.jsxs("div",{children:[e.jsxs(F,{glow:t.red,style:{marginBottom:16},children:[e.jsx(z,{color:t.red,sub:"Set the three input toggles, adjust the knobs, and see how the network decides.",children:"📧 Spam Detector — Live Demo"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,alignItems:"start"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:t.dim,letterSpacing:3,marginBottom:12,textTransform:"uppercase"},children:"Inputs (clues)"}),e.jsx("div",{style:{display:"flex",gap:24,marginBottom:20},children:V.map((S,N)=>e.jsx(Be,{value:d[N],onChange:P=>n(d.map((A,T)=>T===N?P:A)),label:S.label,icon:S.icon},N))}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:t.dim,letterSpacing:3,marginBottom:12,textTransform:"uppercase"},children:"Weights (importance)"}),e.jsx("div",{style:{display:"flex",gap:20,marginBottom:20},children:V.map((S,N)=>e.jsx(J,{value:s[N],min:-2,max:2,onChange:P=>a(s.map((A,T)=>T===N?P:A)),color:t.amber,label:S.label},N))}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:t.dim,letterSpacing:3,marginBottom:12,textTransform:"uppercase"},children:"Bias (default lean)"}),e.jsxs("div",{style:{display:"flex",gap:20},children:[e.jsx(J,{value:o,min:-2,max:2,onChange:l,color:t.gold,label:"bias b",size:80}),e.jsxs("div",{style:{fontFamily:t.serif,fontSize:13,color:t.dim,lineHeight:1.8},children:[e.jsx("strong",{style:{color:t.gold},children:"Positive bias"}),': the neuron already leans toward saying "spam"',e.jsx("br",{}),e.jsx("strong",{style:{color:t.gold},children:"Negative bias"}),": needs strong evidence before calling spam"]})]})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:t.dim,letterSpacing:3,marginBottom:10,textTransform:"uppercase"},children:"Output Meter"}),e.jsx(ye,{raw:v,size:180}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:12},children:[e.jsx(K,{label:"Weighted sum (z)",value:k(b),color:t.teal}),e.jsx(K,{label:"After sigmoid",value:k(v),color:v>=.5?t.green:t.red})]}),e.jsx("div",{style:{marginTop:10,padding:"12px",background:(_===1?t.red:t.green)+"15",borderRadius:8,border:`1px solid ${_===1?t.red:t.green}50`,textAlign:"center"},children:e.jsx("div",{style:{fontFamily:t.mono,fontSize:22,fontWeight:700,color:_===1?t.red:t.green},children:_===1?"🚨 SPAM":"✅ NOT SPAM"})})]})]}),e.jsxs("div",{style:{marginTop:16},children:[e.jsxs("button",{onClick:()=>p(!r),style:{background:"none",border:`1px solid ${t.border}`,borderRadius:6,color:t.dim,fontFamily:t.mono,fontSize:11,padding:"5px 12px",cursor:"pointer"},children:[r?"▼ Hide":"▶ Show"," step-by-step calculation"]}),r&&e.jsx(Q,{color:t.teal,children:`Step 1 — Multiply each input by its weight:
${V.map((S,N)=>`  ${S.label.padEnd(18)} : x${N+1}(${d[N]}) × w${N+1}(${M(s[N])}) = ${k(d[N]*s[N])}`).join(`
`)}

Step 2 — Sum all contributions + add bias:
  z = ${w.map(S=>k(S.val)).join(" + ")} + ${k(o)}
    = ${k(w.reduce((S,N)=>S+N.val,0))} + ${k(o)}
    = ${k(b)}

Step 3 — Apply sigmoid activation:
  σ(z) = 1 / (1 + e^(−${k(b)})) = ${k(v)}

Step 4 — Threshold at 0.5:
  ${k(v)} ${v>=.5?"≥":"<"} 0.5  →  prediction = ${_} (${_===1?"SPAM":"NOT SPAM"})`})]})]}),e.jsxs(F,{glow:t.amber,style:{marginBottom:16},children:[e.jsx(z,{color:t.amber,sub:"Click an example to load it, then see if the current weights predict it correctly. Use 'Train' to update weights automatically.",children:"🏋️ Training Examples — Test & Learn"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:10,marginBottom:14},children:te.map(S=>{const{pred:N}=H(S.xs,s,o),P=N===S.y;return e.jsxs("div",{style:{background:"#050a14",borderRadius:9,padding:12,border:`1px solid ${m===S.id?t.amber:P?t.green+"40":t.red+"40"}`,cursor:"pointer"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:6},children:[e.jsx("span",{style:{fontFamily:t.serif,fontSize:12,color:t.cream,fontWeight:700},children:S.name}),e.jsx("span",{style:{fontFamily:t.mono,fontSize:10,color:P?t.green:t.red},children:P?"✓ correct":"✗ wrong"})]}),e.jsxs("div",{style:{fontFamily:t.mono,fontSize:10,color:t.dim,marginBottom:8},children:["x=[",S.xs.join(","),"] true=",S.y," pred=",N]}),e.jsx("p",{style:{fontFamily:t.serif,fontSize:11,color:t.dim,margin:"0 0 10px 0"},children:S.note}),e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsx(D,{onClick:()=>j(S),color:t.amber,small:!0,children:"Load"}),e.jsx(D,{onClick:()=>C(S),color:t.green,small:!0,children:"Train ▶"})]})]},S.id)})}),u.length>0&&e.jsxs("div",{style:{background:"#050a14",borderRadius:8,padding:12,border:`1px solid ${t.amber}30`},children:[e.jsxs("div",{style:{fontFamily:t.mono,fontSize:10,color:t.dim,letterSpacing:3,marginBottom:8,textTransform:"uppercase"},children:["Training log (last ",u.length," steps)"]}),u.slice().reverse().map((S,N)=>e.jsxs("div",{style:{fontFamily:t.mono,fontSize:11,color:N===0?t.amber:t.dimmer,marginBottom:4,lineHeight:1.6},children:["Step ",f-N,': "',S.ex.name,'" δ=',k(S.δ),S.diffs.map((P,A)=>` Δw${A+1}=${le(P)}`).join("")," ","Δb=",le(-.4*S.δ)]},N))]})]}),e.jsxs(F,{glow:t.teal,children:[e.jsx(z,{color:t.teal,children:"🔬 Neuron Architecture Diagram"}),e.jsx(Fe,{xs:d,ws:s,b:o,z:b,raw:v,pred:_,inputLabels:V,size:"100%"}),e.jsxs("p",{style:{fontFamily:t.serif,fontSize:12,color:t.dim,lineHeight:1.7,marginTop:8},children:["Line thickness shows weight magnitude. ",e.jsx("span",{style:{color:t.green},children:"Green lines"})," are positive weights (support the prediction),",e.jsx("span",{style:{color:t.red},children:" red lines"})," are negative weights (oppose it). Dimmed lines mean that input was 0 (inactive)."]})]})]})},wt=function(){const[s,a]=x.useState([.8,.4,-.3]),[o,l]=x.useState(.1),[d,n]=x.useState([1,0,0]),[r,p]=x.useState([]),{z:m,raw:c}=H(d,s,o),u=()=>{let h=[...s],f=o,g=[];Te.forEach(b=>{const{raw:v}=H(b.xs,h,f),{newWs:_,newB:w,δ:j}=ce(h,f,b.xs,b.y,v,.3);g.push({ex:b,before:v,δ:j,after:ie(b.xs.reduce((C,S,N)=>C+S*_[N],w))}),h=_,f=w}),a(h),l(f),p(g)};return e.jsxs("div",{children:[e.jsxs(F,{glow:t.teal,style:{marginBottom:16},children:[e.jsx(z,{color:t.teal,sub:"A network learning your movie tastes from three clues.",children:"🎬 Movie Enjoyment Predictor"}),e.jsxs("p",{style:{fontFamily:t.serif,fontSize:14,color:t.cream,lineHeight:1.8,marginBottom:14},children:["The three inputs are: does it have ",e.jsx(q,{color:t.amber,children:"your favourite actor"}),", is it a ",e.jsx(q,{color:t.teal,children:"comedy"}),", and is it ",e.jsx(q,{color:t.dim,children:"over 2 hours long"}),". Notice how ",e.jsx("strong",{style:{color:t.amber},children:"w₁"})," (favourite actor) matters most,",e.jsx("strong",{style:{color:t.teal},children:" w₂"})," (comedy) matters some, and",e.jsx("strong",{style:{color:t.dim},children:" w₃"})," (long movie) is typically negative — long films can be a dealbreaker."]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,alignItems:"start"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",gap:20,marginBottom:20},children:ue.map((h,f)=>e.jsx(Be,{value:d[f],onChange:g=>n(d.map((b,v)=>v===f?g:b)),label:h.label,icon:h.icon},f))}),e.jsx("div",{style:{display:"flex",gap:16,marginBottom:16},children:ue.map((h,f)=>e.jsx(J,{value:s[f],min:-2,max:2,onChange:g=>a(s.map((b,v)=>v===f?g:b)),color:f===2?t.red:t.amber,label:h.label},f))}),e.jsx(J,{value:o,min:-2,max:2,onChange:l,color:t.gold,label:"bias (mood)",size:72}),e.jsxs("div",{style:{marginTop:10,fontFamily:t.serif,fontSize:12,color:t.dim,lineHeight:1.7},children:["The ",e.jsx("strong",{style:{color:t.gold},children:"bias"})," here represents your general mood or how open you are to watching any movie. A high positive bias means you enjoy most movies regardless."]})]}),e.jsxs("div",{children:[e.jsx(ye,{raw:c,size:180}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:10},children:[e.jsx(K,{label:"z (weighted sum)",value:k(m),color:t.teal}),e.jsx(K,{label:"Confidence",value:k(c),color:c>=.5?t.green:t.red})]})]})]}),e.jsx(Q,{color:t.teal,children:`Interpretation of weights:
  w₁ (fav actor) = ${M(s[0])}  → ${s[0]>0?"Positive: this pushes strongly toward YES":"Negative: this actually pushes toward NO?!"}
  w₂ (comedy)   = ${M(s[1])}  → ${s[1]>0?"Positive: comedies more enjoyable":"Negative: prefer serious films?"}
  w₃ (long film) = ${M(s[2])}  → ${s[2]<0?"Negative: long movies reduce enjoyment":"Positive: long movies preferred?"}
  bias           = ${M(o)}   → ${o>0?"You enjoy most movies (optimistic)":o<-.3?"You're selective (need good reasons)":"Neutral baseline"}`})]}),e.jsxs(F,{glow:t.green,children:[e.jsx(z,{color:t.green,children:"📽️ Movie Examples — Run One Training Pass"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:10,marginBottom:14},children:Te.map(h=>{const{pred:f,raw:g}=H(h.xs,s,o),b=f===h.y;return e.jsxs("div",{style:{background:"#050a14",borderRadius:9,padding:12,border:`1px solid ${b?t.green+"40":t.red+"40"}`},children:[e.jsxs("div",{style:{fontFamily:t.serif,fontSize:13,color:t.cream,fontWeight:700,marginBottom:4},children:["🎬 ",h.name]}),e.jsxs("div",{style:{fontFamily:t.mono,fontSize:10,color:t.dim,marginBottom:6},children:[ue.map((v,_)=>`${v.icon}${h.xs[_]}`).join(" ")," → label: ",h.y===1?"ENJOY ✓":"SKIP ✗"]}),e.jsxs("div",{style:{fontFamily:t.mono,fontSize:11,color:b?t.green:t.red,marginBottom:6},children:["pred: ",M(g)," (",b?"✓ correct":"✗ wrong",")"]}),e.jsx("div",{style:{fontFamily:t.serif,fontSize:11,color:t.dim},children:h.note})]},h.id)})}),e.jsx(D,{onClick:u,color:t.green,children:"▶▶ Run 1 Full Training Pass Over All 6 Movies"}),r.length>0&&e.jsx(Q,{color:t.green,children:r.map((h,f)=>`Movie ${f+1} "${h.ex.name}": pred=${k(h.before)} target=${h.ex.y} δ=${k(h.δ)} → pred_after=${k(h.after)}`).join(`
`)})]})]})},St=function(){const[s,a]=x.useState([.3,.3,.3]),[o,l]=x.useState(0),[d,n]=x.useState(0),[r,p]=x.useState(0),[m,c]=x.useState(0),[u,h]=x.useState(!1),[f,g]=x.useState(!1),[b,v]=x.useState([]),_=te[d%te.length],{z:w,raw:j,pred:C}=H(_.xs,s,o),S=C===_.y,N=()=>{const{newWs:A,newB:T,δ:I,diffs:B}=ce(s,o,_.xs,_.y,j);v(Y=>[...Y,{ex:_,ws:[...s],b:o,newWs:A,newB:T,δ:I,diffs:B,pred:C,correct:S}]),a(A),l(T),g(!0)},P=()=>{f||N(),p(A=>A+(S?1:0)),c(A=>A+1),n(A=>A+1),h(!1),g(!1)};return e.jsxs("div",{children:[e.jsxs(F,{glow:t.amber,style:{marginBottom:16},children:[e.jsx(z,{color:t.amber,children:"🎮 Activity 1 — Human Neuron Game"}),e.jsxs("p",{style:{fontFamily:t.serif,fontSize:14,color:t.cream,lineHeight:1.85,marginBottom:14},children:[e.jsx("strong",{style:{color:t.amber},children:"How to play:"})," You are the neuron! The email clues are shown below. Adjust the weight knobs to set how much you trust each clue, set your bias, and the network will compute the prediction automatically. Check if you got it right, then click ",e.jsx(q,{color:t.green,children:'"Update Weights"'})," to apply the mathematically correct adjustment. Repeat for each email!"]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:16},children:[e.jsx(K,{label:"Round",value:`${d+1} / ${te.length}`,color:t.blue}),e.jsx(K,{label:"Score",value:`${r} / ${m}`,color:t.green}),e.jsx(K,{label:"Accuracy",value:m>0?`${Math.round(r/m*100)}%`:"—",color:t.amber})]})]}),e.jsxs(F,{glow:_.y===1?t.red:t.green,style:{marginBottom:16},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{fontFamily:t.mono,fontSize:10,color:t.dim,letterSpacing:3,marginBottom:4},children:["EMAIL ",d+1]}),e.jsx("div",{style:{fontFamily:t.serif,fontSize:18,color:t.cream,fontWeight:700},children:_.name}),e.jsx("div",{style:{fontFamily:t.serif,fontSize:13,color:t.dim,marginTop:4},children:_.note})]}),e.jsxs("div",{style:{background:(_.y===1?t.red:t.green)+"20",border:`1px solid ${_.y===1?t.red:t.green}50`,borderRadius:8,padding:"8px 16px",textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:t.dim},children:"TRUE LABEL"}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:16,fontWeight:700,color:_.y===1?t.red:t.green},children:_.y===1?"SPAM":"NOT SPAM"})]})]}),e.jsx("div",{style:{display:"flex",gap:16,marginBottom:20},children:V.map((A,T)=>e.jsxs("div",{style:{flex:1,background:_.xs[T]?t.amber+"15":"#050a14",border:`2px solid ${_.xs[T]?t.amber:t.dimmer}`,borderRadius:10,padding:"12px",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:24,marginBottom:4},children:A.icon}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:t.dim,marginBottom:6},children:A.label}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:24,fontWeight:700,color:_.xs[T]?t.amber:t.dimmer},children:_.xs[T]})]},T))}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:t.dim,letterSpacing:3,marginBottom:12,textTransform:"uppercase"},children:"Your weights — drag to adjust:"}),e.jsxs("div",{style:{display:"flex",gap:24,marginBottom:16},children:[V.map((A,T)=>e.jsx(J,{value:s[T],min:-2,max:2,onChange:I=>a(s.map((B,Y)=>Y===T?I:B)),color:t.amber,label:A.label},T)),e.jsx(J,{value:o,min:-2,max:2,onChange:l,color:t.gold,label:"bias"})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,alignItems:"center"},children:[e.jsx("div",{children:e.jsx(Q,{color:t.teal,children:`z = ${_.xs.map((A,T)=>`${A}×${M(s[T])}`).join(" + ")} + ${M(o)}
  = ${M(w)}
σ(${M(w)}) = ${k(j)}
Prediction: ${C} (${C===1?"SPAM":"NOT SPAM"})`})}),e.jsx("div",{children:e.jsx(ye,{raw:j,size:160})})]}),e.jsx("div",{style:{padding:"12px 16px",background:(S?t.green:t.red)+"15",borderRadius:9,border:`1px solid ${S?t.green:t.red}50`,margin:"12px 0",textAlign:"center"},children:e.jsx("div",{style:{fontFamily:t.mono,fontSize:16,fontWeight:700,color:S?t.green:t.red},children:S?"✅ Correct! Well done.":"❌ Wrong prediction — let's update the weights."})}),e.jsxs("div",{style:{display:"flex",gap:10},children:[!f&&e.jsx(D,{onClick:N,color:t.green,children:"⚙️ Apply Weight Update (Backprop)"}),f&&e.jsx("div",{style:{fontFamily:t.mono,fontSize:12,color:t.green,alignSelf:"center"},children:"✓ Weights updated"}),e.jsx(D,{onClick:P,color:t.blue,disabled:d>=te.length-1,children:"Next Email ▶"})]}),f&&b.length>0&&(()=>{const A=b[b.length-1];return e.jsx(Q,{color:t.green,children:`Weight update applied (learning rate = 0.4):
  δ = prediction − label = ${k((A.pred===1,j))} − ${A.ex.y} ≈ ${k(A.δ)}

${V.map((T,I)=>`  w${I+1} (${T.label}): ${k(A.ws[I])} ${le(A.diffs[I])} → ${k(A.newWs[I])}  ${A.diffs[I]>0?"↑ increased":"↓ decreased"}`).join(`
`)}
  bias: ${k(A.b)} ${le(-.4*A.δ)} → ${k(A.newB)}`})})()]}),b.length>0&&e.jsxs(F,{glow:t.dimmer,children:[e.jsx(z,{color:t.dim,children:"📋 Game History"}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontFamily:t.mono,fontSize:11},children:[e.jsx("thead",{children:e.jsx("tr",{children:["Round","Email","Inputs","Prediction","Truth","Result"].map(A=>e.jsx("th",{style:{padding:"7px 10px",color:t.dim,borderBottom:`1px solid ${t.border}`,textAlign:"left",fontSize:9,letterSpacing:2},children:A},A))})}),e.jsx("tbody",{children:b.map((A,T)=>e.jsxs("tr",{style:{background:T%2===0?"#050a1499":"transparent"},children:[e.jsx("td",{style:{padding:"7px 10px",color:t.dim},children:T+1}),e.jsx("td",{style:{padding:"7px 10px",color:t.cream},children:A.ex.name}),e.jsxs("td",{style:{padding:"7px 10px",color:t.amber},children:["[",A.ex.xs.join(","),"]"]}),e.jsx("td",{style:{padding:"7px 10px",color:t.teal},children:A.pred}),e.jsx("td",{style:{padding:"7px 10px",color:t.dim},children:A.ex.y}),e.jsx("td",{style:{padding:"7px 10px",color:A.correct?t.green:t.red},children:A.correct?"✓":"✗"})]},T))})]})})]})]})},Nt=function(){const[s,a]=x.useState(0),o=[.6,.5,.4],l=te.map(r=>{const{raw:p,pred:m}=H(r.xs,o,s);return{...r,raw:p,pred:m}}),d=l.filter(r=>r.pred===1).length,n=l.reduce((r,p)=>r+p.raw,0)/l.length;return e.jsxs("div",{children:[e.jsxs(F,{glow:t.gold,style:{marginBottom:16},children:[e.jsx(z,{color:t.gold,children:"⚖️ Activity 2 — Bias as a Tilt"}),e.jsxs("p",{style:{fontFamily:t.serif,fontSize:14,color:t.cream,lineHeight:1.85,marginBottom:14},children:["In this activity the weights are ",e.jsx("strong",{style:{color:t.amber},children:"locked"})," — you can only change the ",e.jsx("strong",{style:{color:t.gold},children:"bias"}),`. Watch how changing a single number (the bias) shifts which emails get flagged as spam. This demonstrates that bias controls the neuron's "default lean" independently of any specific input.`]}),e.jsxs("div",{style:{display:"flex",gap:20,alignItems:"center",marginBottom:20},children:[e.jsx(J,{value:s,min:-2,max:2,onChange:a,color:t.gold,label:"bias only",size:100}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:t.dim,letterSpacing:3,marginBottom:8,textTransform:"uppercase"},children:"Bias tiltometer"}),e.jsxs("div",{style:{height:24,background:"#050a14",borderRadius:12,border:`1px solid ${t.border}`,overflow:"hidden",position:"relative"},children:[e.jsx("div",{style:{position:"absolute",left:"50%",top:2,bottom:2,width:2,background:t.dimmer,transform:"translateX(-50%)"}}),e.jsx("div",{style:{position:"absolute",left:s<0?`${50+s*25}%`:"50%",right:s>0?`${50-s*25}%`:"50%",top:2,bottom:2,background:s>0?t.green+"60":t.red+"60",borderRadius:10,transition:"all 0.2s"}})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:4},children:[e.jsx("span",{style:{fontFamily:t.mono,fontSize:10,color:t.red},children:"← biased toward NO"}),e.jsx("span",{style:{fontFamily:t.mono,fontSize:10,color:t.gold},children:"neutral"}),e.jsx("span",{style:{fontFamily:t.mono,fontSize:10,color:t.green},children:"biased toward YES →"})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:12},children:[e.jsx(K,{label:"emails flagged SPAM",value:`${d} / 6`,color:d>3?t.red:t.green}),e.jsx(K,{label:"avg confidence",value:k(n),color:t.gold})]})]})]}),e.jsx(Q,{color:t.dim,children:`Fixed weights (cannot change): w₁(FREE)=${M(o[0])}  w₂(link)=${M(o[1])}  w₃(unknown)=${M(o[2])}
Current bias: ${M(s)}

For each email, z = x₁×${M(o[0])} + x₂×${M(o[1])} + x₃×${M(o[2])} + ${M(s)}`})]}),e.jsxs(F,{glow:t.gold,children:[e.jsxs(z,{color:t.gold,sub:"Observe which emails flip between SPAM and NOT SPAM as you adjust bias above.",children:["📊 Results — All 6 Emails at Current Bias = ",M(s)]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:10},children:l.map((r,p)=>(r.xs.reduce((m,c,u)=>m+c*o[u],s),e.jsxs("div",{style:{background:"#050a14",borderRadius:10,padding:14,border:`2px solid ${r.pred===1?t.red:t.green}50`,transition:"border-color 0.2s"},children:[e.jsx("div",{style:{fontFamily:t.serif,fontSize:13,fontWeight:700,color:t.cream,marginBottom:6},children:r.name}),e.jsxs("div",{style:{fontFamily:t.mono,fontSize:10,color:t.dim,marginBottom:8},children:["inputs: [",r.xs.join(","),"] | true: ",r.y]}),e.jsx("div",{style:{background:"#080c14",borderRadius:6,height:8,overflow:"hidden",marginBottom:6},children:e.jsx("div",{style:{height:"100%",width:`${r.raw*100}%`,background:r.pred===1?t.red:t.green,transition:"width 0.2s",borderRadius:6}})}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsxs("span",{style:{fontFamily:t.mono,fontSize:11,color:t.dim},children:["σ = ",k(r.raw)]}),e.jsx("span",{style:{fontFamily:t.mono,fontSize:12,fontWeight:700,color:r.pred===1?t.red:t.green},children:r.pred===1?"🚨 SPAM":"✅ NOT SPAM"})]}),r.pred!==r.y&&e.jsxs("div",{style:{fontFamily:t.mono,fontSize:9,color:t.red,marginTop:4},children:["⚠ wrong prediction (should be ",r.y,")"]})]},p)))}),e.jsxs("div",{style:{marginTop:16,padding:"14px 16px",background:"#050a14",borderRadius:10,border:`1px solid ${t.gold}30`},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:t.gold,letterSpacing:3,marginBottom:8},children:"CLASS DISCUSSION PROMPTS"}),[`At bias = 0: ${l.filter(r=>r.pred===1).length} emails are flagged. Try setting bias to −1.5 — what happens?`,"When bias is very positive, even emails with no spam signals get flagged. Why is that dangerous?","Find a bias value that correctly classifies all 6 emails. Is it possible?"].map((r,p)=>e.jsxs("div",{style:{fontFamily:t.serif,fontSize:13,color:t.dim,marginBottom:8,lineHeight:1.7},children:[e.jsxs("span",{style:{color:t.gold},children:["Q",p+1,":"]})," ",r]},p))]})]})]})},At=function(){const[s,a]=x.useState(0),[o,l]=x.useState([null,null,null,null]),[d,n]=x.useState(!1),r=Ee[s],{z:p,raw:m,pred:c}=H(r.xs,r.ws,r.b),{newWs:u,newB:h,δ:f,diffs:g}=ce(r.ws,r.b,r.xs,r.y,m),b=w=>w<3?g[w]>.001?"increase":g[w]<-.001?"decrease":"no_change":h-r.b>.001?"increase":h-r.b<-.001?"decrease":"no_change",v=w=>{const j=b(w);return j==="increase"?{label:"↑ Increase",color:t.green}:j==="decrease"?{label:"↓ Decrease",color:t.red}:{label:"— No change",color:t.dim}},_=w=>{a(w),l([null,null,null,null]),n(!1)};return e.jsxs("div",{children:[e.jsxs(F,{glow:t.red,style:{marginBottom:16},children:[e.jsx(z,{color:t.red,children:"🔍 Activity 3 — Error Detective"}),e.jsxs("p",{style:{fontFamily:t.serif,fontSize:14,color:t.cream,lineHeight:1.85},children:["Something went wrong! The network made a bad prediction. Your job is to figure out",e.jsx("strong",{style:{color:t.red},children:" which weights and the bias caused the error"}),", and decide whether each should ",e.jsx(q,{color:t.green,children:"increase ↑"})," or ",e.jsx(q,{color:t.red,children:"decrease ↓"}),". Then reveal the correct answer to see if you were right!"]})]}),e.jsx("div",{style:{display:"flex",gap:10,marginBottom:16},children:Ee.map((w,j)=>e.jsx(D,{onClick:()=>_(j),color:s===j?t.red:t.dimmer,small:!0,children:w.title.split("—")[0]},j))}),e.jsxs(F,{glow:t.red,style:{marginBottom:14},children:[e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"flex-start",marginBottom:14},children:[e.jsx("div",{style:{fontSize:36,lineHeight:1},children:"🔍"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:14,color:t.red,fontWeight:700,marginBottom:4},children:r.title}),e.jsx("div",{style:{fontFamily:t.serif,fontSize:14,color:t.cream,lineHeight:1.75},children:r.scenario})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:t.dim,letterSpacing:3,marginBottom:10,textTransform:"uppercase"},children:"Evidence (inputs + weights)"}),r.inputLabels.map((w,j)=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",background:"#050a14",borderRadius:7,padding:"10px 14px",marginBottom:8,border:`1px solid ${r.xs[j]?t.amber+"40":t.border}`},children:[e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[e.jsx("span",{style:{fontSize:18},children:w.icon}),e.jsx("span",{style:{fontFamily:t.serif,fontSize:12,color:t.cream},children:w.label})]}),e.jsxs("div",{style:{display:"flex",gap:10,fontFamily:t.mono,fontSize:13},children:[e.jsxs("span",{style:{color:r.xs[j]?t.amber:t.dim},children:["x=",r.xs[j]]}),e.jsxs("span",{style:{color:t.gold},children:["w=",M(r.ws[j])]}),e.jsxs("span",{style:{color:t.teal},children:["=",M(r.xs[j]*r.ws[j])]})]})]},j)),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",background:"#050a14",borderRadius:7,padding:"10px 14px",border:`1px solid ${t.gold}40`},children:[e.jsx("span",{style:{fontFamily:t.serif,fontSize:12,color:t.cream},children:"⚙️ Bias"}),e.jsxs("span",{style:{fontFamily:t.mono,fontSize:13,color:t.gold},children:["b = ",M(r.b)]})]})]}),e.jsxs("div",{children:[e.jsx(Fe,{xs:r.xs,ws:r.ws,b:r.b,z:p,raw:m,pred:c,inputLabels:r.inputLabels}),e.jsx(Q,{color:t.red,children:`z = ${M(p)}
σ(z) = ${k(m)} → prediction: ${c}
True label: ${r.y}  ← MISMATCH!`})]})]})]}),e.jsxs(F,{glow:t.amber,style:{marginBottom:14},children:[e.jsx(z,{color:t.amber,sub:"Should each weight / bias go UP or DOWN to fix this mistake?",children:"🗳️ Your Vote"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:12,marginBottom:14},children:[...r.inputLabels.map((w,j)=>({label:`${w.icon} Weight for ${w.label}`,idx:j})),{label:"⚙️ Bias",idx:3}].map(w=>e.jsxs("div",{style:{background:"#050a14",borderRadius:9,padding:14,border:`1px solid ${t.border}`},children:[e.jsx("div",{style:{fontFamily:t.serif,fontSize:13,color:t.cream,marginBottom:10},children:w.label}),e.jsx("div",{style:{display:"flex",gap:8},children:["increase","decrease","no_change"].map(j=>e.jsx("button",{onClick:()=>{const C=[...o];C[w.idx]=j,l(C)},style:{flex:1,padding:"7px 4px",borderRadius:6,cursor:"pointer",border:`1px solid ${o[w.idx]===j?j==="increase"?t.green:j==="decrease"?t.red:t.dim:t.border}`,background:o[w.idx]===j?j==="increase"?t.green+"20":j==="decrease"?t.red+"20":t.dimmer+"20":"transparent",color:j==="increase"?t.green:j==="decrease"?t.red:t.dim,fontFamily:t.mono,fontSize:10,fontWeight:o[w.idx]===j?700:400},children:j==="increase"?"↑ Up":j==="decrease"?"↓ Down":"— Same"},j))}),d&&e.jsxs("div",{style:{marginTop:8,padding:"5px 10px",borderRadius:5,background:o[w.idx]===b(w.idx)?t.green+"15":t.red+"15",border:`1px solid ${o[w.idx]===b(w.idx)?t.green:t.red}40`},children:[e.jsx("span",{style:{fontFamily:t.mono,fontSize:10,color:t.dim},children:"Correct answer: "}),e.jsx("span",{style:{fontFamily:t.mono,fontSize:11,fontWeight:700,color:v(w.idx).color},children:v(w.idx).label}),o[w.idx]===b(w.idx)?e.jsx("span",{style:{color:t.green,fontFamily:t.mono,fontSize:11},children:" ✓ You got it!"}):e.jsx("span",{style:{color:t.red,fontFamily:t.mono,fontSize:11},children:" ✗ Incorrect"})]})]},w.idx))}),e.jsx(D,{onClick:()=>n(!0),color:t.red,disabled:d||o.some(w=>w===null),children:o.some(w=>w===null)?`Vote on all ${4-o.filter(w=>w!==null).length} remaining first`:"🔍 Reveal Correct Answers"})]}),d&&e.jsxs(F,{glow:t.green,children:[e.jsx(z,{color:t.green,children:"✅ Explanation & Full Calculation"}),e.jsx("p",{style:{fontFamily:t.serif,fontSize:14,color:t.cream,lineHeight:1.8,marginBottom:12},children:r.hint}),e.jsx(Q,{color:t.green,children:`Mathematical weight update (lr = 0.4):
  δ = raw − target = ${k(m)} − ${r.y} = ${k(f)}

${r.inputLabels.map((w,j)=>`  Δw${j+1} (${w.label.padEnd(16)}): −lr×δ×x${j+1} = −0.4×${k(f)}×${r.xs[j]} = ${k(g[j])}  → w${j+1}: ${M(r.ws[j])} → ${M(u[j])}`).join(`
`)}
  Δb  (bias): −lr×δ = −0.4×${k(f)} = ${k(h-r.b)}  → b: ${M(r.b)} → ${M(h)}`})]})]})},$t=function(){const[s,a]=x.useState(ne.map(m=>({parts:m.xs.map(()=>""),total:"",prediction:""}))),[o,l]=x.useState(!1),[d,n]=x.useState(!1),r=(m,c,u)=>{a(h=>h.map((f,g)=>g===m?c==="parts"?{...f,parts:f.parts.map((b,v)=>v===u.idx?u.v:b)}:{...f,[c]:u}:f)),l(!1)},p=(m,c,u)=>{const h=c.xs.map((b,v)=>+(b*c.ws[v]).toFixed(3)),f=+c.xs.reduce((b,v,_)=>b+v*c.ws[_],c.b).toFixed(3),g=ie(f)>=.5?"1":"0";return{parts:u.parts.map((b,v)=>Math.abs(+b-h[v])<.01),total:Math.abs(+u.total-f)<.01,prediction:u.prediction.trim()===g}};return e.jsxs("div",{children:[e.jsxs(F,{glow:t.blue,style:{marginBottom:16},children:[e.jsx(z,{color:t.blue,children:"📋 Activity 4 — Mini-Lab Worksheet"}),e.jsxs("p",{style:{fontFamily:t.serif,fontSize:14,color:t.cream,lineHeight:1.85,marginBottom:14},children:["Complete this worksheet by hand (or using the input boxes). For each email example, compute each ",e.jsx(q,{color:t.amber,children:'"weighted product"'})," (input × weight), then sum them up and add the bias to get ",e.jsx(q,{color:t.teal,children:"z"}),". Finally, decide: is the email SPAM (prediction = 1) if z is positive, or NOT SPAM (prediction = 0)?"]}),e.jsxs("p",{style:{fontFamily:t.serif,fontSize:13,color:t.dim,lineHeight:1.75},children:["The weights for this worksheet are: ",e.jsx(q,{color:t.amber,children:"w₁(FREE) = given per row"}),", ",e.jsx(q,{color:t.amber,children:"w₂(link)"}),", ",e.jsx(q,{color:t.amber,children:"w₃(unknown)"}),". Rule: if σ(z) ≥ 0.5 (equivalently z ≥ 0), predict 1 (spam)."]})]}),ne.map((m,c)=>{const u=s[c],h=o?p(c,m,u):null,f=m.xs.reduce((v,_,w)=>v+_*m.ws[w],m.b),g=ie(f),b=g>=.5?1:0;return e.jsxs(F,{glow:h?h.total&&h.prediction?t.green:t.red:t.border,style:{marginBottom:14},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{fontFamily:t.mono,fontSize:11,color:t.dim,letterSpacing:3},children:["EXAMPLE ",m.id]}),e.jsxs("div",{style:{fontFamily:t.serif,fontSize:15,color:t.cream,fontWeight:700,marginTop:3},children:["Inputs: [",m.xs.join(", "),"]  |  Weights: [",m.ws.join(", "),"]  |  Bias: ",m.b]})]}),h&&e.jsx("div",{style:{fontFamily:t.mono,fontSize:14,fontWeight:700,color:h.total&&h.prediction?t.green:t.red},children:h.total&&h.prediction?"✓ CORRECT":"✗ CHECK AGAIN"})]}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:t.dim,letterSpacing:3,marginBottom:10,textTransform:"uppercase"},children:"Step 1 — compute each x_i × w_i:"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:10,marginBottom:14},children:V.map((v,_)=>{const w=+(m.xs[_]*m.ws[_]).toFixed(3),j=h?h.parts[_]:null;return e.jsxs("div",{style:{background:"#050a14",borderRadius:8,padding:12,border:`1px solid ${j===!0?t.green:j===!1?t.red:t.border}`},children:[e.jsxs("div",{style:{fontFamily:t.serif,fontSize:12,color:t.cream,marginBottom:8},children:[v.icon," ",v.label]}),e.jsxs("div",{style:{fontFamily:t.mono,fontSize:13,color:t.amber,marginBottom:8},children:[m.xs[_]," × ",m.ws[_]," = ?"]}),e.jsx("input",{type:"number",step:"0.01",value:u.parts[_],onChange:C=>r(c,"parts",{idx:_,v:C.target.value}),placeholder:"your answer",style:{width:"100%",background:"#080d14",border:`1px solid ${t.border}`,borderRadius:6,padding:"6px 10px",color:t.amber,fontFamily:t.mono,fontSize:13,outline:"none",boxSizing:"border-box"}}),d&&e.jsxs("div",{style:{fontFamily:t.mono,fontSize:11,color:t.teal,marginTop:6},children:["Answer: ",k(w)]})]},_)})}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,alignItems:"center"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:t.dim,letterSpacing:3,marginBottom:8,textTransform:"uppercase"},children:"Step 2 — sum all products + bias = z:"}),e.jsxs("div",{style:{fontFamily:t.mono,fontSize:12,color:t.dim,marginBottom:6},children:[m.xs.map((v,_)=>`(${v}×${m.ws[_]})`).join(" + ")," + ",m.b," = z"]}),e.jsx("input",{type:"number",step:"0.001",value:u.total,onChange:v=>r(c,"total",v.target.value),placeholder:"z = ?",style:{width:"100%",background:"#080d14",border:`1px solid ${h?h.total?t.green:t.red:t.border}`,borderRadius:6,padding:"8px 12px",color:t.teal,fontFamily:t.mono,fontSize:14,outline:"none",marginBottom:6,boxSizing:"border-box"}}),d&&e.jsxs("div",{style:{fontFamily:t.mono,fontSize:11,color:t.teal},children:["z = ",k(f)]})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:t.dim,letterSpacing:3,marginBottom:8,textTransform:"uppercase"},children:"Step 3 — prediction (0 or 1):"}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:12,color:t.dim,marginBottom:6},children:"if z ≥ 0, predict 1 (spam); else predict 0"}),e.jsx("div",{style:{display:"flex",gap:10},children:["0","1"].map(v=>e.jsxs("button",{onClick:()=>r(c,"prediction",v),style:{flex:1,padding:"9px",borderRadius:7,cursor:"pointer",border:`2px solid ${u.prediction===v?v==="1"?t.red:t.green:t.border}`,background:u.prediction===v?v==="1"?t.red+"20":t.green+"20":"transparent",color:v==="1"?t.red:t.green,fontFamily:t.mono,fontSize:15,fontWeight:u.prediction===v?700:400},children:[v," ",v==="1"?"🚨":"✅"]},v))}),d&&e.jsxs("div",{style:{fontFamily:t.mono,fontSize:11,color:b===1?t.red:t.green,marginTop:6},children:["Answer: ",b," (σ(",M(f),")=",k(g),")"]})]})]})]},c)}),e.jsxs("div",{style:{display:"flex",gap:12,marginBottom:20},children:[e.jsx(D,{onClick:()=>l(!0),color:t.amber,children:"🔎 Check My Answers"}),e.jsx(D,{onClick:()=>n(!0),color:t.dim,small:!0,children:"Show All Answers"}),e.jsx(D,{onClick:()=>{a(ne.map(m=>({parts:m.xs.map(()=>""),total:"",prediction:""}))),l(!1),n(!1)},color:t.dimmer,small:!0,children:"↺ Reset"})]}),o&&e.jsxs(F,{glow:t.blue,children:[e.jsx(z,{color:t.blue,children:"📊 Score Summary"}),ne.map((m,c)=>{const u=p(c,m,s[c]),h=m.xs.reduce((b,v,_)=>b+v*m.ws[_],m.b),f=ie(h)>=.5?1:0,g=[u.total,u.prediction].filter(Boolean).length;return e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:"#050a14",borderRadius:8,marginBottom:8,border:`1px solid ${g===2?t.green:t.red}40`},children:[e.jsxs("span",{style:{fontFamily:t.serif,fontSize:14,color:t.cream},children:["Example ",m.id]}),e.jsx("span",{style:{fontFamily:t.mono,fontSize:12,color:g===2?t.green:t.red},children:g===2?"✓ Perfect":"✗ Review needed"}),e.jsxs("span",{style:{fontFamily:t.mono,fontSize:11,color:t.dim},children:["z=",k(h),", pred=",f]})]},c)}),e.jsxs("div",{style:{marginTop:14,padding:"12px 16px",background:"#050a14",borderRadius:8,border:`1px solid ${t.border}`},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:t.blue,letterSpacing:3,marginBottom:8},children:"CLASS DISCUSSION"}),["In Example A the bias is −0.3 (negative). What does that mean about how the network approaches an email by default?","In Example B, one input was 0. What happens to that weight's contribution? Does that weight update during training?","Look at Example C. Even though two inputs were 1, the prediction was 0. Why? What role did the bias play?","After many rounds of training, what do you expect will happen to weights connected to inputs that are never active (always 0)?"].map((m,c)=>e.jsxs("div",{style:{fontFamily:t.serif,fontSize:13,color:t.dim,marginBottom:8,lineHeight:1.7},children:[e.jsxs("span",{style:{color:t.blue},children:["Q",c+1,":"]})," ",m]},c))]})]})]})},Me=[{id:"intro",label:"📖 How It Learns",color:t.blue},{id:"spam",label:"📧 Spam Detector",color:t.red},{id:"movie",label:"🎬 Movie Predictor",color:t.teal},{id:"game",label:"🎮 Act 1 · Neuron Game",color:t.amber},{id:"tilt",label:"⚖️ Act 2 · Bias Tilt",color:t.gold},{id:"detect",label:"🔍 Act 3 · Error Detective",color:t.red},{id:"worksheet",label:"📋 Act 4 · Worksheet",color:t.blue}],Ct=function(){var n;const[s,a]=x.useState("intro"),o=((n=Me.find(r=>r.id===s))==null?void 0:n.color)||t.amber,d={intro:_t,spam:jt,movie:wt,game:St,tilt:Nt,detect:At,worksheet:$t}[s];return e.jsxs("div",{style:{minHeight:"100vh",background:t.bg,color:t.cream,fontFamily:t.serif},children:[e.jsx("div",{style:{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,background:`radial-gradient(ellipse 60% 40% at 50% 0%, ${o}0d, transparent 60%)`,transition:"background 0.5s"}}),e.jsx("div",{style:{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,opacity:.025,backgroundImage:`linear-gradient(${t.amber} 1px, transparent 1px), linear-gradient(90deg, ${t.amber} 1px, transparent 1px)`,backgroundSize:"32px 32px"}}),e.jsxs("div",{style:{position:"relative",zIndex:1,maxWidth:1040,margin:"0 auto",padding:"24px 14px"},children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:28},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,letterSpacing:8,color:t.dim,marginBottom:6,textTransform:"uppercase"},children:"Neural Network Fundamentals · Classroom Activity"}),e.jsx("h1",{style:{margin:0,fontFamily:t.mono,fontWeight:900,letterSpacing:-1,fontSize:"clamp(20px,4vw,36px)",background:`linear-gradient(90deg, ${t.amber}, ${t.gold}, ${t.amber})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"},children:"The Decision Machine"}),e.jsx("p",{style:{color:t.dim,fontSize:13,marginTop:7,fontFamily:t.mono},children:"Weights · Biases · Errors · Gradient Descent — Interactive Learning"})]}),e.jsx("div",{style:{background:t.panel,borderRadius:14,padding:6,border:`1px solid ${t.border}`,display:"flex",gap:3,flexWrap:"wrap",justifyContent:"center",marginBottom:24},children:Me.map(r=>e.jsx("button",{onClick:()=>a(r.id),style:{padding:"7px 14px",borderRadius:10,cursor:"pointer",border:`1px solid ${s===r.id?r.color:"transparent"}`,background:s===r.id?r.color+"18":"transparent",color:s===r.id?r.color:t.dim,fontFamily:t.mono,fontSize:11,fontWeight:s===r.id?700:400,transition:"all 0.15s",boxShadow:s===r.id?`0 0 14px ${r.color}20`:"none"},children:r.label},r.id))}),e.jsx("div",{style:{background:t.panel+"bb",borderRadius:18,border:`1px solid ${o}25`,padding:"24px 20px",boxShadow:`0 0 50px ${o}12`},children:e.jsx(d,{},s)}),e.jsx("div",{style:{textAlign:"center",marginTop:20,color:t.dimmer,fontFamily:t.mono,fontSize:9,letterSpacing:3},children:"DECISION MACHINE ACADEMY · ALL COMPUTATIONS IN-BROWSER · NO EXTERNAL DEPENDENCIES"})]})]})},kt=()=>{const[i,s]=x.useState("vectors"),[a,o]=x.useState([3,4]),[l,d]=x.useState([1,2]),[n,r]=x.useState([[2,1],[1,3]]),[p,m]=x.useState([[1,2],[3,4]]),[c,u]=x.useState("3, 4"),[h,f]=x.useState("1, 2"),[g,b]=x.useState("2, 1; 1, 3"),[v,_]=x.useState("1, 2; 3, 4"),[w,j]=x.useState([[4,0],[3,-5]]),[C,S]=x.useState([2,3]),[N,P]=x.useState([1,1]),A=(y,$)=>y.map((R,E)=>R+$[E]),T=(y,$)=>y.map((R,E)=>R-$[E]),I=(y,$)=>y.reduce((R,E,O)=>R+E*$[O],0),B=(y,$=2)=>$===1/0?Math.max(...y.map(Math.abs)):$===1?y.reduce((R,E)=>R+Math.abs(E),0):Math.pow(y.reduce((R,E)=>R+Math.pow(Math.abs(E),$),0),1/$),Y=(y,$)=>{const R=[];for(let E=0;E<y.length;E++){R[E]=[];for(let O=0;O<$[0].length;O++){let X=0;for(let ee=0;ee<$.length;ee++)X+=y[E][ee]*$[ee][O];R[E][O]=X}}return R},me=y=>y[0].map(($,R)=>y.map(E=>E[R])),ve=y=>y.reduce(($,R,E)=>$+R[E],0),pe=y=>y[0][0]*y[1][1]-y[0][1]*y[1][0],_e=y=>{const $=y[0][0],R=y[0][1],E=y[1][0],O=y[1][1],X=$+O,ee=$*O-R*E,se=X*X-4*ee;return se<0?{lambda1:{real:X/2,imag:Math.sqrt(-se)/2},lambda2:{real:X/2,imag:-Math.sqrt(-se)/2},isComplex:!0}:{lambda1:(X+Math.sqrt(se))/2,lambda2:(X-Math.sqrt(se))/2,isComplex:!1}},je=y=>{try{const $=y.split(";").map(R=>R.split(",").map(E=>parseFloat(E.trim())).filter(E=>!isNaN(E)));return $.length>0&&$[0].length>0?$:null}catch{return null}},we=y=>{try{return y.split(",").map($=>parseFloat($.trim())).filter($=>!isNaN($))}catch{return null}},Le=()=>{const y=we(c),$=we(h);y&&y.length>0&&o(y),$&&$.length>0&&d($)},Ie=()=>{const y=je(g),$=je(v);y&&r(y),$&&m($)},ze=A(a,l),he=I(a,l),qe=B(a),De=B(l),Se=he/(qe*De),Ve=Math.acos(Math.max(-1,Math.min(1,Se)))*(180/Math.PI);return e.jsx("div",{className:"min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8",children:e.jsxs("div",{className:"max-w-7xl mx-auto",children:[e.jsx("div",{className:"bg-white rounded-2xl shadow-xl p-8 mb-8",children:e.jsxs("div",{className:"flex items-center gap-4 mb-4",children:[e.jsx("div",{className:"bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-xl",children:e.jsx(ge,{className:"w-12 h-12 text-white"})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-4xl font-bold text-gray-900",children:"Linear Algebra Interactive Laboratory"}),e.jsx("p",{className:"text-gray-600 mt-2",children:"Comprehensive exploration with formulas, visualizations, and code"})]})]})}),e.jsx("div",{className:"bg-white rounded-xl shadow-lg p-2 mb-8",children:e.jsx("div",{className:"flex gap-2 flex-wrap",children:[{id:"vectors",label:"Vectors & Norms",icon:ae},{id:"matrices",label:"Matrices & Operations",icon:ge},{id:"eigenvalues",label:"Eigenvalues & Diagonalization",icon:re},{id:"svd",label:"SVD Decomposition",icon:xe},{id:"projections",label:"Projections & Least Squares",icon:oe},{id:"stability",label:"Numerical Stability",icon:Ce}].map(y=>{const $=y.icon;return e.jsxs("button",{onClick:()=>s(y.id),className:`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${i===y.id?"bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,children:[e.jsx($,{className:"w-5 h-5"}),e.jsx("span",{className:"hidden lg:inline",children:y.label})]},y.id)})})}),i==="vectors"&&e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"bg-white rounded-xl shadow-lg p-8",children:[e.jsxs("h2",{className:"text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3",children:[e.jsx(ae,{className:"w-8 h-8 text-indigo-600"}),"Vectors, Norms, and Distances"]}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6 mb-8",children:[e.jsxs("div",{className:"bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-bold text-gray-900 mb-4",children:"Vector Basics"}),e.jsxs("div",{className:"space-y-3 text-sm",children:[e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Vector Definition:"}),e.jsx("div",{className:"font-mono text-xs bg-gray-50 p-2 rounded mb-2",children:"v = [v₁, v₂, ..., vₙ]ᵀ ∈ ℝⁿ"}),e.jsx("p",{className:"text-gray-700",children:"An ordered list of n numbers (components)"})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Vector Addition:"}),e.jsx("div",{className:"font-mono text-xs bg-gray-50 p-2 rounded",children:"u + v = [u₁+v₁, u₂+v₂, ..., uₙ+vₙ]ᵀ"})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Scalar Multiplication:"}),e.jsx("div",{className:"font-mono text-xs bg-gray-50 p-2 rounded",children:"αv = [αv₁, αv₂, ..., αvₙ]ᵀ"})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Dot Product (Inner Product):"}),e.jsx("div",{className:"font-mono text-xs bg-gray-50 p-2 rounded mb-2",children:"u·v = uᵀv = ∑ᵢ uᵢvᵢ = ‖u‖‖v‖cos(θ)"}),e.jsx("p",{className:"text-xs text-gray-600",children:"Measures projection and angle between vectors"})]})]})]}),e.jsxs("div",{className:"bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-bold text-gray-900 mb-4",children:"Vector Norms"}),e.jsxs("div",{className:"space-y-3 text-sm",children:[e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"L² Norm (Euclidean):"}),e.jsx("div",{className:"font-mono text-xs bg-gray-50 p-2 rounded mb-2",children:"‖v‖₂ = √(v₁² + v₂² + ... + vₙ²)"}),e.jsx("p",{className:"text-xs text-gray-600",children:"Most common, geometric length"})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"L¹ Norm (Manhattan):"}),e.jsx("div",{className:"font-mono text-xs bg-gray-50 p-2 rounded mb-2",children:"‖v‖₁ = |v₁| + |v₂| + ... + |vₙ|"}),e.jsx("p",{className:"text-xs text-gray-600",children:"Sum of absolute values"})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"L∞ Norm (Maximum):"}),e.jsx("div",{className:"font-mono text-xs bg-gray-50 p-2 rounded mb-2",children:"‖v‖∞ = max(|v₁|, |v₂|, ..., |vₙ|)"}),e.jsx("p",{className:"text-xs text-gray-600",children:"Largest component magnitude"})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Lᵖ Norm (General):"}),e.jsx("div",{className:"font-mono text-xs bg-gray-50 p-2 rounded",children:"‖v‖ₚ = (|v₁|ᵖ + |v₂|ᵖ + ... + |vₙ|ᵖ)^(1/p)"})]})]})]})]}),e.jsxs("div",{className:"bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-xl p-6 mb-8",children:[e.jsx("h3",{className:"text-2xl font-bold text-gray-900 mb-4",children:"Interactive Vector Calculator"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4 mb-6",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-2",children:"Vector A (comma-separated):"}),e.jsx("input",{type:"text",value:c,onChange:y=>u(y.target.value),className:"w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 outline-none",placeholder:"e.g., 3, 4, 5"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-2",children:"Vector B (comma-separated):"}),e.jsx("input",{type:"text",value:h,onChange:y=>f(y.target.value),className:"w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 outline-none",placeholder:"e.g., 1, 2, 3"})]})]}),e.jsxs("button",{onClick:Le,className:"w-full bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 mb-6",children:[e.jsx($e,{className:"w-5 h-5"}),"Calculate"]}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-4 mb-6",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-bold text-gray-900 mb-3",children:"Vector Operations"}),e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsxs("div",{children:[e.jsx("span",{className:"text-gray-600",children:"A = "}),e.jsxs("span",{className:"font-mono font-bold",children:["[",a.join(", "),"]"]})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-gray-600",children:"B = "}),e.jsxs("span",{className:"font-mono font-bold",children:["[",l.join(", "),"]"]})]}),e.jsxs("div",{className:"pt-2 border-t",children:[e.jsx("span",{className:"text-gray-600",children:"A + B = "}),e.jsxs("span",{className:"font-mono font-bold",children:["[",ze.map(y=>y.toFixed(2)).join(", "),"]"]})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-gray-600",children:"A · B = "}),e.jsx("span",{className:"font-bold text-indigo-600",children:he.toFixed(4)})]})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-bold text-gray-900 mb-3",children:"Norms of A"}),e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"L² (Euclidean):"}),e.jsx("span",{className:"font-bold text-blue-600",children:B(a,2).toFixed(4)})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"L¹ (Manhattan):"}),e.jsx("span",{className:"font-bold text-green-600",children:B(a,1).toFixed(4)})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"L∞ (Maximum):"}),e.jsx("span",{className:"font-bold text-purple-600",children:B(a,1/0).toFixed(4)})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"L³:"}),e.jsx("span",{className:"font-bold text-orange-600",children:B(a,3).toFixed(4)})]})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-bold text-gray-900 mb-3",children:"Geometric Properties"}),e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsxs("div",{children:[e.jsx("span",{className:"text-gray-600",children:"Distance (L²):"}),e.jsx("div",{className:"font-bold text-indigo-600",children:B(T(a,l),2).toFixed(4)})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-gray-600",children:"Cosine Similarity:"}),e.jsx("div",{className:"font-bold text-green-600",children:Se.toFixed(4)})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-gray-600",children:"Angle (degrees):"}),e.jsxs("div",{className:"font-bold text-purple-600",children:[Ve.toFixed(2),"°"]})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-gray-600",children:"Orthogonal:"}),e.jsx("div",{className:"font-bold",children:Math.abs(he)<1e-4?"✓ Yes":"✗ No"})]})]})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-6",children:[e.jsx("h4",{className:"font-bold text-gray-900 mb-3",children:"Distance Metrics between A and B:"}),e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4 text-sm",children:[e.jsxs("div",{className:"bg-blue-50 p-3 rounded",children:[e.jsx("div",{className:"text-gray-600",children:"Euclidean (L²)"}),e.jsx("div",{className:"text-xl font-bold text-blue-600",children:B(T(a,l),2).toFixed(3)})]}),e.jsxs("div",{className:"bg-green-50 p-3 rounded",children:[e.jsx("div",{className:"text-gray-600",children:"Manhattan (L¹)"}),e.jsx("div",{className:"text-xl font-bold text-green-600",children:B(T(a,l),1).toFixed(3)})]}),e.jsxs("div",{className:"bg-purple-50 p-3 rounded",children:[e.jsx("div",{className:"text-gray-600",children:"Chebyshev (L∞)"}),e.jsx("div",{className:"text-xl font-bold text-purple-600",children:B(T(a,l),1/0).toFixed(3)})]}),e.jsxs("div",{className:"bg-orange-50 p-3 rounded",children:[e.jsx("div",{className:"text-gray-600",children:"Minkowski (p=3)"}),e.jsx("div",{className:"text-xl font-bold text-orange-600",children:B(T(a,l),3).toFixed(3)})]})]})]})]}),e.jsxs("div",{className:"bg-gray-900 rounded-lg p-6 text-white",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx(L,{className:"w-5 h-5 text-green-400"}),e.jsx("h5",{className:"font-bold",children:"Python Implementation: Vectors & Norms"})]}),e.jsx("pre",{className:"text-sm overflow-x-auto",children:e.jsx("code",{children:`import numpy as np
import matplotlib.pyplot as plt
from scipy.spatial import distance

# ============= Vector Operations =============
# Define vectors
a = np.array([3, 4, 5])
b = np.array([1, 2, 3])

print("=== Vector Operations ===")
print(f"Vector a: {a}")
print(f"Vector b: {b}")

# Basic operations
print(f"\\na + b = {a + b}")
print(f"a - b = {a - b}")
print(f"2 * a = {2 * a}")

# Dot product (inner product)
dot_product = np.dot(a, b)
print(f"\\nDot product a·b = {dot_product}")

# Alternative: using @ operator
dot_alt = a @ b
print(f"Using @ operator: {dot_alt}")

# Cross product (only for 3D vectors)
cross_product = np.cross(a, b)
print(f"Cross product a×b = {cross_product}")

# ============= Vector Norms =============
print("\\n=== Vector Norms ===")

# L2 norm (Euclidean)
l2_norm = np.linalg.norm(a)
print(f"L2 norm (Euclidean): {l2_norm:.4f}")

# L1 norm (Manhattan)
l1_norm = np.linalg.norm(a, ord=1)
print(f"L1 norm (Manhattan): {l1_norm:.4f}")

# L-infinity norm (Maximum)
linf_norm = np.linalg.norm(a, ord=np.inf)
print(f"L∞ norm (Maximum): {linf_norm:.4f}")

# Lp norm (general)
p = 3
lp_norm = np.linalg.norm(a, ord=p)
print(f"L{p} norm: {lp_norm:.4f}")

# Manual calculation of L2 norm
manual_l2 = np.sqrt(np.sum(a**2))
print(f"\\nManual L2 calculation: {manual_l2:.4f}")

# ============= Distances =============
print("\\n=== Distance Metrics ===")

# Euclidean distance
euclidean_dist = np.linalg.norm(a - b)
print(f"Euclidean distance: {euclidean_dist:.4f}")

# Using scipy
euclidean_scipy = distance.euclidean(a, b)
print(f"Euclidean (scipy): {euclidean_scipy:.4f}")

# Manhattan distance
manhattan_dist = distance.cityblock(a, b)
print(f"Manhattan distance: {manhattan_dist:.4f}")

# Chebyshev distance
chebyshev_dist = distance.chebyshev(a, b)
print(f"Chebyshev distance: {chebyshev_dist:.4f}")

# Cosine distance (1 - cosine similarity)
cosine_dist = distance.cosine(a, b)
print(f"Cosine distance: {cosine_dist:.4f}")

# ============= Angles and Similarity =============
print("\\n=== Geometric Properties ===")

# Cosine similarity
cos_sim = np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
print(f"Cosine similarity: {cos_sim:.4f}")

# Angle between vectors (in radians and degrees)
angle_rad = np.arccos(np.clip(cos_sim, -1, 1))
angle_deg = np.degrees(angle_rad)
print(f"Angle: {angle_rad:.4f} rad = {angle_deg:.2f}°")

# Check orthogonality
is_orthogonal = np.abs(np.dot(a, b)) < 1e-10
print(f"Orthogonal: {is_orthogonal}")

# ============= Unit Vectors =============
print("\\n=== Unit Vectors ===")

# Normalize to unit vector
a_unit = a / np.linalg.norm(a)
print(f"Unit vector of a: {a_unit}")
print(f"Norm of unit vector: {np.linalg.norm(a_unit):.10f}")

# ============= Projection =============
print("\\n=== Projection ===")

# Project a onto b
proj_a_on_b = (np.dot(a, b) / np.dot(b, b)) * b
print(f"Projection of a onto b: {proj_a_on_b}")

# Perpendicular component
perp_component = a - proj_a_on_b
print(f"Perpendicular component: {perp_component}")

# Verify orthogonality
print(f"Dot product (should be ~0): {np.dot(proj_a_on_b, perp_component):.10f}")

# ============= Visualization =============
fig = plt.figure(figsize=(15, 5))

# 2D vectors for visualization
a_2d = np.array([3, 4])
b_2d = np.array([1, 2])

# Plot 1: Vectors and operations
ax1 = fig.add_subplot(131)
origin = np.array([0, 0])
ax1.quiver(*origin, *a_2d, angles='xy', scale_units='xy', scale=1, 
           color='blue', width=0.01, label='a')
ax1.quiver(*origin, *b_2d, angles='xy', scale_units='xy', scale=1, 
           color='red', width=0.01, label='b')
ax1.quiver(*origin, *(a_2d + b_2d), angles='xy', scale_units='xy', scale=1, 
           color='green', width=0.01, label='a+b', linestyle='--')
ax1.set_xlim([-1, 5])
ax1.set_ylim([-1, 7])
ax1.set_xlabel('x')
ax1.set_ylabel('y')
ax1.set_title('Vector Addition')
ax1.legend()
ax1.grid(alpha=0.3)
ax1.set_aspect('equal')

# Plot 2: Unit circle and norms
ax2 = fig.add_subplot(132)
theta = np.linspace(0, 2*np.pi, 100)

# L2 (circle)
x_l2 = np.cos(theta)
y_l2 = np.sin(theta)
ax2.plot(x_l2, y_l2, 'b-', linewidth=2, label='L2 norm')

# L1 (diamond)
t = np.linspace(0, 2*np.pi, 100)
x_l1 = np.sign(np.cos(t)) * np.abs(np.cos(t))
y_l1 = np.sign(np.sin(t)) * np.abs(np.sin(t))
ax2.plot(x_l1, y_l1, 'r--', linewidth=2, label='L1 norm')

# Linf (square)
square_x = [-1, 1, 1, -1, -1]
square_y = [-1, -1, 1, 1, -1]
ax2.plot(square_x, square_y, 'g:', linewidth=2, label='L∞ norm')

ax2.set_xlabel('x')
ax2.set_ylabel('y')
ax2.set_title('Unit Balls for Different Norms')
ax2.legend()
ax2.grid(alpha=0.3)
ax2.set_aspect('equal')

# Plot 3: Projection
ax3 = fig.add_subplot(133)
proj = (np.dot(a_2d, b_2d) / np.dot(b_2d, b_2d)) * b_2d
perp = a_2d - proj

ax3.quiver(*origin, *a_2d, angles='xy', scale_units='xy', scale=1, 
           color='blue', width=0.01, label='a')
ax3.quiver(*origin, *b_2d, angles='xy', scale_units='xy', scale=1, 
           color='red', width=0.01, label='b')
ax3.quiver(*origin, *proj, angles='xy', scale_units='xy', scale=1, 
           color='green', width=0.01, label='proj_b(a)', linestyle='--')
ax3.quiver(*proj, *perp, angles='xy', scale_units='xy', scale=1, 
           color='purple', width=0.01, label='perpendicular', linestyle=':')
ax3.set_xlim([-1, 4])
ax3.set_ylim([-1, 5])
ax3.set_xlabel('x')
ax3.set_ylabel('y')
ax3.set_title('Vector Projection')
ax3.legend()
ax3.grid(alpha=0.3)
ax3.set_aspect('equal')

plt.tight_layout()
plt.show()`})})]})]})}),i==="matrices"&&e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"bg-white rounded-xl shadow-lg p-8",children:[e.jsxs("h2",{className:"text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3",children:[e.jsx(ge,{className:"w-8 h-8 text-indigo-600"}),"Matrices, Multiplication, Rank & Orthogonality"]}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6 mb-8",children:[e.jsxs("div",{className:"bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-bold text-gray-900 mb-4",children:"Matrix Basics"}),e.jsxs("div",{className:"space-y-3 text-sm",children:[e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Matrix Definition:"}),e.jsx("div",{className:"font-mono text-xs bg-gray-50 p-2 rounded mb-2",children:"A ∈ ℝᵐˣⁿ = [aᵢⱼ] (m rows, n columns)"})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Matrix Multiplication:"}),e.jsx("div",{className:"font-mono text-xs bg-gray-50 p-2 rounded mb-2",children:"(AB)ᵢⱼ = ∑ₖ aᵢₖbₖⱼ"}),e.jsx("p",{className:"text-xs text-gray-600",children:"A: m×n, B: n×p → AB: m×p"})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Transpose:"}),e.jsx("div",{className:"font-mono text-xs bg-gray-50 p-2 rounded",children:"(Aᵀ)ᵢⱼ = aⱼᵢ"})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Trace:"}),e.jsx("div",{className:"font-mono text-xs bg-gray-50 p-2 rounded",children:"tr(A) = ∑ᵢ aᵢᵢ"})]})]})]}),e.jsxs("div",{className:"bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-bold text-gray-900 mb-4",children:"Advanced Concepts"}),e.jsxs("div",{className:"space-y-3 text-sm",children:[e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Rank:"}),e.jsx("p",{className:"text-xs text-gray-700 mb-2",children:"Number of linearly independent rows/columns"}),e.jsx("div",{className:"font-mono text-xs bg-gray-50 p-2 rounded",children:"rank(A) ≤ min(m, n)"})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Span:"}),e.jsx("p",{className:"text-xs text-gray-700",children:"Set of all linear combinations of column vectors"})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Basis:"}),e.jsx("p",{className:"text-xs text-gray-700",children:"Linearly independent set that spans a space"})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Orthogonality:"}),e.jsx("div",{className:"font-mono text-xs bg-gray-50 p-2 rounded",children:"QᵀQ = I (orthonormal columns)"})]})]})]})]}),e.jsxs("div",{className:"bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-xl p-6 mb-8",children:[e.jsx("h3",{className:"text-2xl font-bold text-gray-900 mb-4",children:"Interactive Matrix Calculator"}),e.jsx("p",{className:"text-sm text-gray-700 mb-4",children:'Enter matrices with rows separated by semicolons, values by commas (e.g., "1,2;3,4")'}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4 mb-6",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-2",children:"Matrix A:"}),e.jsx("input",{type:"text",value:g,onChange:y=>b(y.target.value),className:"w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 outline-none font-mono text-sm",placeholder:"2,1;1,3"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-2",children:"Matrix B:"}),e.jsx("input",{type:"text",value:v,onChange:y=>_(y.target.value),className:"w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 outline-none font-mono text-sm",placeholder:"1,2;3,4"})]})]}),e.jsxs("button",{onClick:Ie,className:"w-full bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 mb-6",children:[e.jsx($e,{className:"w-5 h-5"}),"Calculate"]}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"bg-white rounded-lg p-6",children:[e.jsxs("h4",{className:"font-bold text-gray-900 mb-3",children:["Matrix A (",n.length,"×",n[0].length,"):"]}),e.jsx("div",{className:"mb-4",children:e.jsx("div",{className:"inline-block border-l-2 border-r-2 border-gray-400 px-2",children:n.map((y,$)=>e.jsx("div",{className:"flex gap-4 justify-center font-mono text-sm",children:y.map((R,E)=>e.jsx("span",{className:"w-12 text-center",children:R.toFixed(2)},E))},$))})}),n.length===2&&n[0].length===2&&e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"Determinant:"}),e.jsx("span",{className:"font-bold text-indigo-600",children:pe(n).toFixed(4)})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"Trace:"}),e.jsx("span",{className:"font-bold text-green-600",children:ve(n).toFixed(4)})]})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-6",children:[e.jsx("h4",{className:"font-bold text-gray-900 mb-3",children:"Operations:"}),e.jsxs("div",{className:"mb-4",children:[e.jsx("h5",{className:"text-sm font-semibold text-gray-700 mb-2",children:"Aᵀ (Transpose):"}),e.jsx("div",{className:"inline-block border-l-2 border-r-2 border-gray-400 px-2",children:me(n).map((y,$)=>e.jsx("div",{className:"flex gap-4 justify-center font-mono text-xs",children:y.map((R,E)=>e.jsx("span",{className:"w-10 text-center",children:R.toFixed(1)},E))},$))})]}),n[0].length===p.length&&e.jsxs("div",{className:"mb-4",children:[e.jsx("h5",{className:"text-sm font-semibold text-gray-700 mb-2",children:"A × B:"}),e.jsx("div",{className:"inline-block border-l-2 border-r-2 border-gray-400 px-2",children:Y(n,p).map((y,$)=>e.jsx("div",{className:"flex gap-4 justify-center font-mono text-xs",children:y.map((R,E)=>e.jsx("span",{className:"w-10 text-center",children:R.toFixed(1)},E))},$))})]})]})]}),n.length===2&&n[0].length===2&&e.jsxs("div",{className:"mt-6 bg-white rounded-lg p-6",children:[e.jsx("h4",{className:"font-bold text-gray-900 mb-3",children:"Eigenvalues of Matrix A:"}),(()=>{const y=_e(n);return y.isComplex?e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsxs("div",{className:"bg-blue-50 p-3 rounded",children:[e.jsx("span",{className:"font-semibold",children:"λ₁ = "}),e.jsxs("span",{className:"font-mono",children:[y.lambda1.real.toFixed(4)," + ",y.lambda1.imag.toFixed(4),"i"]})]}),e.jsxs("div",{className:"bg-purple-50 p-3 rounded",children:[e.jsx("span",{className:"font-semibold",children:"λ₂ = "}),e.jsxs("span",{className:"font-mono",children:[y.lambda2.real.toFixed(4)," + ",y.lambda2.imag.toFixed(4),"i"]})]}),e.jsx("p",{className:"text-xs text-gray-600 italic",children:"Complex eigenvalues indicate rotation/oscillation"})]}):e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsxs("div",{className:"bg-blue-50 p-3 rounded",children:[e.jsx("span",{className:"font-semibold",children:"λ₁ = "}),e.jsx("span",{className:"font-mono font-bold text-blue-600",children:y.lambda1.toFixed(4)})]}),e.jsxs("div",{className:"bg-purple-50 p-3 rounded",children:[e.jsx("span",{className:"font-semibold",children:"λ₂ = "}),e.jsx("span",{className:"font-mono font-bold text-purple-600",children:y.lambda2.toFixed(4)})]})]})})()]})]}),e.jsxs("div",{className:"bg-gray-900 rounded-lg p-6 text-white",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx(L,{className:"w-5 h-5 text-green-400"}),e.jsx("h5",{className:"font-bold",children:"Python Implementation: Matrix Operations"})]}),e.jsx("pre",{className:"text-sm overflow-x-auto",children:e.jsx("code",{children:`import numpy as np
from numpy.linalg import matrix_rank, matrix_power
import matplotlib.pyplot as plt

# ============= Matrix Creation =============
# Different ways to create matrices
A = np.array([[2, 1], 
              [1, 3]])

B = np.array([[1, 2], 
              [3, 4]])

print("=== Matrix A ===")
print(A)
print(f"Shape: {A.shape}")
print(f"Size: {A.size}")
print(f"Data type: {A.dtype}")

# Special matrices
I = np.eye(3)  # Identity matrix
Z = np.zeros((2, 3))  # Zero matrix
O = np.ones((2, 2))  # Ones matrix
D = np.diag([1, 2, 3])  # Diagonal matrix

print("\\n=== Special Matrices ===")
print(f"Identity (3×3):\\n{I}")
print(f"Diagonal matrix:\\n{D}")

# ============= Basic Operations =============
print("\\n=== Matrix Operations ===")

# Addition and subtraction
print(f"A + B =\\n{A + B}")
print(f"A - B =\\n{A - B}")

# Scalar multiplication
print(f"2 * A =\\n{2 * A}")

# Element-wise multiplication (Hadamard product)
print(f"A ⊙ B (element-wise) =\\n{A * B}")

# Matrix multiplication
print(f"A @ B (matrix mult) =\\n{A @ B}")

# Alternative: np.dot or np.matmul
print(f"np.dot(A, B) =\\n{np.dot(A, B)}")

# ============= Transpose =============
print("\\n=== Transpose ===")
print(f"Aᵀ =\\n{A.T}")

# For complex matrices, conjugate transpose
C = np.array([[1+2j, 3-1j], 
              [2+1j, 4+3j]])
print(f"\\nComplex matrix C:\\n{C}")
print(f"Cᴴ (conjugate transpose):\\n{C.conj().T}")

# ============= Trace =============
print("\\n=== Trace ===")
print(f"tr(A) = {np.trace(A)}")
print(f"tr(B) = {np.trace(B)}")

# Property: tr(A + B) = tr(A) + tr(B)
print(f"tr(A+B) = {np.trace(A+B)} = tr(A) + tr(B) = {np.trace(A) + np.trace(B)}")

# ============= Determinant =============
print("\\n=== Determinant ===")
det_A = np.linalg.det(A)
det_B = np.linalg.det(B)
print(f"det(A) = {det_A:.4f}")
print(f"det(B) = {det_B:.4f}")

# Property: det(AB) = det(A)det(B)
det_AB = np.linalg.det(A @ B)
print(f"det(AB) = {det_AB:.4f}")
print(f"det(A) * det(B) = {det_A * det_B:.4f}")

# ============= Inverse =============
print("\\n=== Matrix Inverse ===")
if det_A != 0:
    A_inv = np.linalg.inv(A)
    print(f"A⁻¹ =\\n{A_inv}")
    
    # Verify: A * A⁻¹ = I
    verify = A @ A_inv
    print(f"\\nA @ A⁻¹ =\\n{verify}")
    print(f"Is identity? {np.allclose(verify, np.eye(A.shape[0]))}")

# ============= Rank =============
print("\\n=== Matrix Rank ===")

# Full rank matrix
M_full = np.array([[1, 2, 3], 
                    [4, 5, 6], 
                    [7, 8, 10]])
print(f"Matrix M:\\n{M_full}")
print(f"Rank(M) = {matrix_rank(M_full)}")

# Rank-deficient matrix
M_def = np.array([[1, 2, 3], 
                   [2, 4, 6], 
                   [3, 6, 9]])
print(f"\\nRank-deficient matrix:\\n{M_def}")
print(f"Rank = {matrix_rank(M_def)} (not full rank)")

# ============= Orthogonality =============
print("\\n=== Orthogonality ===")

# Create orthonormal matrix using QR decomposition
Q, R = np.linalg.qr(np.random.randn(3, 3))
print(f"Orthogonal matrix Q:\\n{Q}")
print(f"\\nQᵀQ =\\n{Q.T @ Q}")
print(f"Is orthonormal? {np.allclose(Q.T @ Q, np.eye(3))}")

# Check column orthogonality
col1 = Q[:, 0]
col2 = Q[:, 1]
print(f"\\nDot product of columns 1 and 2: {np.dot(col1, col2):.10f}")

# ============= Span and Linear Independence =============
print("\\n=== Span and Linear Independence ===")

# Linearly independent vectors
v1 = np.array([1, 0, 0])
v2 = np.array([0, 1, 0])
v3 = np.array([0, 0, 1])
V_indep = np.column_stack([v1, v2, v3])

print(f"Linearly independent vectors:")
print(f"Rank = {matrix_rank(V_indep)} (= number of vectors)")

# Linearly dependent vectors
v4 = np.array([1, 1, 0])  # v4 = v1 + v2
V_dep = np.column_stack([v1, v2, v4])
print(f"\\nLinearly dependent vectors:")
print(f"Rank = {matrix_rank(V_dep)} (< number of vectors)")

# ============= Gram-Schmidt Orthogonalization =============
print("\\n=== Gram-Schmidt Process ===")

def gram_schmidt(V):
    """
    Gram-Schmidt orthogonalization
    V: matrix with vectors as columns
    Returns: orthonormal matrix
    """
    Q = np.zeros_like(V, dtype=float)
    
    for i in range(V.shape[1]):
        # Start with original vector
        q = V[:, i].astype(float)
        
        # Subtract projections onto previous orthonormal vectors
        for j in range(i):
            q -= np.dot(Q[:, j], V[:, i]) * Q[:, j]
        
        # Normalize
        Q[:, i] = q / np.linalg.norm(q)
    
    return Q

# Test vectors
V_test = np.array([[1, 1, 0], 
                    [1, 0, 1], 
                    [0, 1, 1]], dtype=float).T

Q_gs = gram_schmidt(V_test)
print(f"Original vectors:\\n{V_test.T}")
print(f"\\nOrthonormalized:\\n{Q_gs.T}")
print(f"\\nQᵀQ =\\n{Q_gs.T @ Q_gs}")

# ============= Matrix Norms =============
print("\\n=== Matrix Norms ===")

# Frobenius norm (default)
frob_norm = np.linalg.norm(A)
print(f"Frobenius norm: {frob_norm:.4f}")

# Nuclear norm (sum of singular values)
nuclear_norm = np.linalg.norm(A, ord='nuc')
print(f"Nuclear norm: {nuclear_norm:.4f}")

# Operator norms
op_norm_2 = np.linalg.norm(A, ord=2)  # Spectral norm
op_norm_inf = np.linalg.norm(A, ord=np.inf)  # Maximum row sum
print(f"Spectral norm (largest singular value): {op_norm_2:.4f}")
print(f"Infinity norm (max row sum): {op_norm_inf:.4f}")

# ============= Matrix Powers =============
print("\\n=== Matrix Powers ===")

# A squared
A2 = matrix_power(A, 2)
print(f"A² =\\n{A2}")

# Verify with multiplication
A2_verify = A @ A
print(f"Verification: A @ A =\\n{A2_verify}")

# ============= Visualization =============
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# Plot 1: Matrix as heatmap
im1 = axes[0, 0].imshow(A, cmap='RdBu', aspect='auto')
axes[0, 0].set_title('Matrix A Heatmap')
axes[0, 0].set_xlabel('Column')
axes[0, 0].set_ylabel('Row')
for i in range(A.shape[0]):
    for j in range(A.shape[1]):
        axes[0, 0].text(j, i, f'{A[i, j]:.1f}', 
                       ha='center', va='center', color='white', fontweight='bold')
plt.colorbar(im1, ax=axes[0, 0])

# Plot 2: Eigenvalues in complex plane
eigvals = np.linalg.eigvals(A)
axes[0, 1].scatter(eigvals.real, eigvals.imag, s=100, c='red', marker='x')
axes[0, 1].axhline(y=0, color='k', linestyle='--', alpha=0.3)
axes[0, 1].axvline(x=0, color='k', linestyle='--', alpha=0.3)
axes[0, 1].set_xlabel('Real')
axes[0, 1].set_ylabel('Imaginary')
axes[0, 1].set_title('Eigenvalues in Complex Plane')
axes[0, 1].grid(alpha=0.3)

# Plot 3: Linear transformation visualization
theta = np.linspace(0, 2*np.pi, 50)
circle = np.array([np.cos(theta), np.sin(theta)])
ellipse = A @ circle

axes[1, 0].plot(circle[0], circle[1], 'b-', linewidth=2, label='Unit Circle')
axes[1, 0].plot(ellipse[0], ellipse[1], 'r-', linewidth=2, label='After A')
axes[1, 0].set_xlabel('x')
axes[1, 0].set_ylabel('y')
axes[1, 0].set_title('Linear Transformation by A')
axes[1, 0].legend()
axes[1, 0].grid(alpha=0.3)
axes[1, 0].set_aspect('equal')

# Plot 4: Singular values
U, s, Vt = np.linalg.svd(A)
axes[1, 1].bar(range(len(s)), s, color='purple', alpha=0.7)
axes[1, 1].set_xlabel('Index')
axes[1, 1].set_ylabel('Singular Value')
axes[1, 1].set_title('Singular Values of A')
axes[1, 1].grid(alpha=0.3, axis='y')

plt.tight_layout()
plt.show()`})})]})]})}),i==="eigenvalues"&&e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"bg-white rounded-xl shadow-lg p-8",children:[e.jsxs("h2",{className:"text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3",children:[e.jsx(re,{className:"w-8 h-8 text-indigo-600"}),"Eigenvalues, Eigenvectors & Diagonalization"]}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6 mb-8",children:[e.jsxs("div",{className:"bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-bold text-gray-900 mb-4",children:"Eigenvalue Problem"}),e.jsxs("div",{className:"space-y-3 text-sm",children:[e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Definition:"}),e.jsx("div",{className:"font-mono text-sm bg-gray-50 p-3 rounded mb-2",children:"Av = λv"}),e.jsx("p",{className:"text-xs text-gray-700",children:"v: eigenvector, λ: eigenvalue"})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Characteristic Equation:"}),e.jsx("div",{className:"font-mono text-sm bg-gray-50 p-3 rounded mb-2",children:"det(A - λI) = 0"}),e.jsx("p",{className:"text-xs text-gray-700",children:"Polynomial equation to find eigenvalues"})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Properties:"}),e.jsxs("div",{className:"space-y-1 text-xs",children:[e.jsx("div",{children:"• tr(A) = ∑λᵢ"}),e.jsx("div",{children:"• det(A) = ∏λᵢ"}),e.jsx("div",{children:"• λ(Aᵏ) = (λ(A))ᵏ"}),e.jsx("div",{children:"• λ(A⁻¹) = 1/λ(A)"})]})]})]})]}),e.jsxs("div",{className:"bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-bold text-gray-900 mb-4",children:"Diagonalization"}),e.jsxs("div",{className:"space-y-3 text-sm",children:[e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Eigendecomposition:"}),e.jsx("div",{className:"font-mono text-sm bg-gray-50 p-3 rounded mb-2",children:"A = VΛV⁻¹"}),e.jsx("p",{className:"text-xs text-gray-700",children:"V: eigenvectors, Λ: diagonal eigenvalue matrix"})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Condition:"}),e.jsx("p",{className:"text-xs text-gray-700",children:"Matrix is diagonalizable if it has n linearly independent eigenvectors"})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Symmetric Matrices:"}),e.jsx("div",{className:"font-mono text-xs bg-gray-50 p-2 rounded mb-2",children:"A = Aᵀ ⟹ A = QΛQᵀ"}),e.jsxs("p",{className:"text-xs text-gray-700",children:["Q: orthogonal matrix (QᵀQ = I)",e.jsx("br",{}),"All eigenvalues are real"]})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Applications:"}),e.jsxs("div",{className:"space-y-1 text-xs",children:[e.jsx("div",{children:"• Computing matrix powers: Aⁿ = VΛⁿV⁻¹"}),e.jsx("div",{children:"• Solving differential equations"}),e.jsx("div",{children:"• Principal Component Analysis (PCA)"}),e.jsx("div",{children:"• Stability analysis"})]})]})]})]})]}),e.jsxs("div",{className:"bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-xl p-6 mb-8",children:[e.jsx("h3",{className:"text-2xl font-bold text-gray-900 mb-4",children:"Example: 2×2 Matrix Eigenanalysis"}),n.length===2&&n[0].length===2&&e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"bg-white rounded-lg p-6",children:[e.jsx("h4",{className:"font-bold text-gray-900 mb-3",children:"Matrix A:"}),e.jsx("div",{className:"mb-4",children:e.jsx("div",{className:"inline-block border-l-2 border-r-2 border-gray-400 px-4 py-2",children:n.map((y,$)=>e.jsx("div",{className:"flex gap-6 justify-center font-mono text-lg",children:y.map((R,E)=>e.jsx("span",{className:"w-12 text-center",children:R},E))},$))})}),e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsxs("div",{className:"bg-blue-50 p-3 rounded",children:[e.jsx("span",{className:"font-semibold",children:"Trace: "}),e.jsx("span",{className:"font-mono",children:ve(n).toFixed(4)})]}),e.jsxs("div",{className:"bg-green-50 p-3 rounded",children:[e.jsx("span",{className:"font-semibold",children:"Determinant: "}),e.jsx("span",{className:"font-mono",children:pe(n).toFixed(4)})]})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-6",children:[e.jsx("h4",{className:"font-bold text-gray-900 mb-3",children:"Eigenvalues:"}),(()=>{const y=_e(n),$=pe(n);return e.jsx("div",{className:"space-y-3",children:y.isComplex?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"bg-blue-50 p-4 rounded",children:[e.jsx("div",{className:"font-semibold mb-1",children:"λ₁ (complex):"}),e.jsxs("div",{className:"font-mono text-lg",children:[y.lambda1.real.toFixed(4)," + ",y.lambda1.imag.toFixed(4),"i"]})]}),e.jsxs("div",{className:"bg-purple-50 p-4 rounded",children:[e.jsx("div",{className:"font-semibold mb-1",children:"λ₂ (complex):"}),e.jsxs("div",{className:"font-mono text-lg",children:[y.lambda2.real.toFixed(4)," + ",y.lambda2.imag.toFixed(4),"i"]})]}),e.jsxs("div",{className:"bg-yellow-50 p-3 rounded text-xs",children:[e.jsx("strong",{children:"Complex eigenvalues:"})," Matrix involves rotation/oscillation"]})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"bg-blue-50 p-4 rounded",children:[e.jsx("div",{className:"font-semibold mb-1",children:"λ₁:"}),e.jsx("div",{className:"font-mono text-2xl font-bold text-blue-600",children:y.lambda1.toFixed(4)})]}),e.jsxs("div",{className:"bg-purple-50 p-4 rounded",children:[e.jsx("div",{className:"font-semibold mb-1",children:"λ₂:"}),e.jsx("div",{className:"font-mono text-2xl font-bold text-purple-600",children:y.lambda2.toFixed(4)})]}),e.jsxs("div",{className:"space-y-2 text-xs",children:[e.jsxs("div",{className:"bg-gray-50 p-2 rounded",children:[e.jsx("strong",{children:"Sum:"})," λ₁ + λ₂ = ",(y.lambda1+y.lambda2).toFixed(4)," = tr(A)"]}),e.jsxs("div",{className:"bg-gray-50 p-2 rounded",children:[e.jsx("strong",{children:"Product:"})," λ₁ × λ₂ = ",(y.lambda1*y.lambda2).toFixed(4)," = det(A)"]}),$>0&&y.lambda1>0&&y.lambda2>0&&e.jsx("div",{className:"bg-green-50 p-2 rounded",children:"✓ Positive definite (all λ > 0)"})]})]})})})()]})]})]}),e.jsxs("div",{className:"bg-gray-900 rounded-lg p-6 text-white",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx(L,{className:"w-5 h-5 text-green-400"}),e.jsx("h5",{className:"font-bold",children:"Python Implementation: Eigenvalues & Diagonalization"})]}),e.jsx("pre",{className:"text-sm overflow-x-auto",children:e.jsx("code",{children:`import numpy as np
import matplotlib.pyplot as plt
from scipy.linalg import eig, eigvals

# ============= Eigenvalue Computation =============
A = np.array([[2, 1], 
              [1, 3]])

print("=== Matrix A ===")
print(A)

# Compute eigenvalues and eigenvectors
eigenvalues, eigenvectors = np.linalg.eig(A)

print("\\n=== Eigenvalues ===")
print(eigenvalues)

print("\\n=== Eigenvectors (as columns) ===")
print(eigenvectors)

# Verify: Av = λv for each eigenpair
print("\\n=== Verification: Av = λv ===")
for i in range(len(eigenvalues)):
    v = eigenvectors[:, i]
    lambda_i = eigenvalues[i]
    
    Av = A @ v
    lambda_v = lambda_i * v
    
    print(f"\\nEigenpair {i+1}:")
    print(f"λ = {lambda_i:.6f}")
    print(f"v = {v}")
    print(f"Av = {Av}")
    print(f"λv = {lambda_v}")
    print(f"Match: {np.allclose(Av, lambda_v)}")

# ============= Properties of Eigenvalues =============
print("\\n=== Eigenvalue Properties ===")

# Trace = sum of eigenvalues
trace_A = np.trace(A)
sum_eigenvals = np.sum(eigenvalues)
print(f"tr(A) = {trace_A:.6f}")
print(f"∑λᵢ = {sum_eigenvals:.6f}")
print(f"Match: {np.allclose(trace_A, sum_eigenvals)}")

# Determinant = product of eigenvalues
det_A = np.linalg.det(A)
prod_eigenvals = np.prod(eigenvalues)
print(f"\\ndet(A) = {det_A:.6f}")
print(f"∏λᵢ = {prod_eigenvals:.6f}")
print(f"Match: {np.allclose(det_A, prod_eigenvals)}")

# ============= Diagonalization =============
print("\\n=== Diagonalization: A = VΛV⁻¹ ===")

V = eigenvectors
Lambda = np.diag(eigenvalues)
V_inv = np.linalg.inv(V)

print(f"\\nV (eigenvectors):\\n{V}")
print(f"\\nΛ (eigenvalues):\\n{Lambda}")
print(f"\\nV⁻¹:\\n{V_inv}")

# Reconstruct A
A_reconstructed = V @ Lambda @ V_inv

print(f"\\nA (original):\\n{A}")
print(f"\\nVΛV⁻¹ (reconstructed):\\n{A_reconstructed}")
print(f"\\nReconstruction error: {np.linalg.norm(A - A_reconstructed):.10f}")

# ============= Matrix Powers Using Diagonalization =============
print("\\n=== Computing A^n using Diagonalization ===")

n = 5

# Method 1: Direct computation
A_n_direct = np.linalg.matrix_power(A, n)

# Method 2: Using diagonalization
Lambda_n = np.diag(eigenvalues ** n)
A_n_diag = V @ Lambda_n @ V_inv

print(f"\\nA^{n} (direct):\\n{A_n_direct}")
print(f"\\nA^{n} (via diag):\\n{A_n_diag}")
print(f"\\nMatch: {np.allclose(A_n_direct, A_n_diag)}")

# ============= Symmetric Matrix (Special Case) =============
print("\\n=== Symmetric Matrix: A = QΛQᵀ ===")

# Symmetric matrix
S = np.array([[4, 2, 1], 
              [2, 5, 3], 
              [1, 3, 6]])

print(f"Symmetric matrix S:\\n{S}")
print(f"Is symmetric: {np.allclose(S, S.T)}")

# Eigendecomposition
eigenvals_s, eigenvecs_s = np.linalg.eig(S)

print(f"\\nEigenvalues (all real for symmetric):\\n{eigenvals_s}")

# Check orthogonality of eigenvectors
Q = eigenvecs_s
print(f"\\nQᵀQ =\\n{Q.T @ Q}")
print(f"Orthonormal: {np.allclose(Q.T @ Q, np.eye(3))}")

# Spectral decomposition
Lambda_s = np.diag(eigenvals_s)
S_reconstructed = Q @ Lambda_s @ Q.T

print(f"\\nS reconstructed:\\n{S_reconstructed}")
print(f"Error: {np.linalg.norm(S - S_reconstructed):.10f}")

# ============= Complex Eigenvalues =============
print("\\n=== Matrix with Complex Eigenvalues ===")

# Rotation matrix
theta = np.pi / 4  # 45 degrees
R = np.array([[np.cos(theta), -np.sin(theta)], 
              [np.sin(theta), np.cos(theta)]])

print(f"Rotation matrix R:\\n{R}")

eigenvals_r = np.linalg.eigvals(R)
print(f"\\nEigenvalues (complex):\\n{eigenvals_r}")

# Magnitude should be 1 for rotation
print(f"Magnitude: {np.abs(eigenvals_r)}")

# ============= Power Iteration (Finding Dominant Eigenvalue) =============
print("\\n=== Power Iteration Method ===")

def power_iteration(A, num_iterations=100):
    """
    Find dominant eigenvalue and eigenvector using power iteration
    """
    # Start with random vector
    v = np.random.randn(A.shape[0])
    
    for _ in range(num_iterations):
        # Matrix-vector multiplication
        v_new = A @ v
        
        # Normalize
        v = v_new / np.linalg.norm(v_new)
    
    # Rayleigh quotient for eigenvalue
    eigenvalue = (v @ (A @ v)) / (v @ v)
    
    return eigenvalue, v

# Test on matrix A
lambda_dominant, v_dominant = power_iteration(A, 1000)

print(f"Dominant eigenvalue (power iter): {lambda_dominant:.6f}")
print(f"Dominant eigenvalue (exact): {np.max(eigenvalues):.6f}")
print(f"\\nDominant eigenvector:\\n{v_dominant}")

# ============= Spectral Theorem Application =============
print("\\n=== Spectral Decomposition ===")

# Spectral decomposition: A = ∑ λᵢ vᵢvᵢᵀ
A_spectral = np.zeros_like(A, dtype=float)

for i in range(len(eigenvalues)):
    lambda_i = eigenvalues[i]
    v_i = eigenvectors[:, i].reshape(-1, 1)
    A_spectral += lambda_i * (v_i @ v_i.T)

print(f"A (spectral sum):\\n{A_spectral}")
print(f"Error: {np.linalg.norm(A - A_spectral):.10f}")

# ============= Visualization =============
fig, axes = plt.subplots(2, 2, figsize=(14, 12))

# Plot 1: Eigenvalues in complex plane
ax1 = axes[0, 0]
eigenvals_vis = eigenvalues
ax1.scatter(eigenvals_vis.real, eigenvals_vis.imag, s=200, c='red', marker='x', linewidths=3)
ax1.axhline(y=0, color='k', linestyle='--', alpha=0.3)
ax1.axvline(x=0, color='k', linestyle='--', alpha=0.3)

# Draw unit circle
theta_circle = np.linspace(0, 2*np.pi, 100)
ax1.plot(np.cos(theta_circle), np.sin(theta_circle), 'b--', alpha=0.3, label='Unit Circle')

ax1.set_xlabel('Real Part', fontsize=12)
ax1.set_ylabel('Imaginary Part', fontsize=12)
ax1.set_title('Eigenvalues in Complex Plane', fontsize=14)
ax1.grid(alpha=0.3)
ax1.legend()
ax1.set_aspect('equal')

# Plot 2: Eigenvectors
ax2 = axes[0, 1]
origin = np.array([[0, 0], [0, 0]])

for i in range(eigenvectors.shape[1]):
    v = eigenvectors[:, i].real
    ax2.quiver(*origin, v[0], v[1], angles='xy', scale_units='xy', scale=1,
              color=f'C{i}', width=0.01, label=f'v{i+1} (λ={eigenvalues[i].real:.2f})')

ax2.set_xlim([-1.5, 1.5])
ax2.set_ylim([-1.5, 1.5])
ax2.set_xlabel('x', fontsize=12)
ax2.set_ylabel('y', fontsize=12)
ax2.set_title('Eigenvectors', fontsize=14)
ax2.grid(alpha=0.3)
ax2.legend()
ax2.set_aspect('equal')

# Plot 3: Linear transformation effect
ax3 = axes[1, 0]

# Unit circle
theta = np.linspace(0, 2*np.pi, 100)
circle = np.array([np.cos(theta), np.sin(theta)])
ellipse = A @ circle

ax3.plot(circle[0], circle[1], 'b-', linewidth=2, label='Before (unit circle)')
ax3.plot(ellipse[0], ellipse[1], 'r-', linewidth=2, label='After A')

# Draw eigenvectors on transformed space
for i in range(eigenvectors.shape[1]):
    v = eigenvectors[:, i].real
    lambda_v = eigenvalues[i].real * v
    ax3.quiver(0, 0, lambda_v[0], lambda_v[1], angles='xy', scale_units='xy', scale=1,
              color=f'C{i}', width=0.008, alpha=0.7)

ax3.set_xlabel('x', fontsize=12)
ax3.set_ylabel('y', fontsize=12)
ax3.set_title('Transformation by A', fontsize=14)
ax3.legend()
ax3.grid(alpha=0.3)
ax3.set_aspect('equal')

# Plot 4: Eigenvalue spectrum
ax4 = axes[1, 1]
indices = np.arange(len(eigenvalues))
ax4.bar(indices, eigenvalues.real, color='purple', alpha=0.7, label='Real part')
if np.any(eigenvalues.imag != 0):
    ax4.bar(indices, eigenvalues.imag, bottom=eigenvalues.real, 
           color='orange', alpha=0.7, label='Imaginary part')

ax4.set_xlabel('Index', fontsize=12)
ax4.set_ylabel('Eigenvalue', fontsize=12)
ax4.set_title('Eigenvalue Spectrum', fontsize=14)
ax4.legend()
ax4.grid(alpha=0.3, axis='y')

plt.tight_layout()
plt.show()

# ============= Application: Matrix Exponential =============
print("\\n=== Matrix Exponential via Diagonalization ===")

# e^A = V e^Λ V⁻¹
exp_Lambda = np.diag(np.exp(eigenvalues))
exp_A = V @ exp_Lambda @ V_inv

# Verify with scipy
from scipy.linalg import expm
exp_A_scipy = expm(A)

print(f"e^A (via diag):\\n{exp_A}")
print(f"\\ne^A (scipy):\\n{exp_A_scipy}")
print(f"\\nMatch: {np.allclose(exp_A, exp_A_scipy)}")`})})]})]})}),i==="svd"&&e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"bg-white rounded-xl shadow-lg p-8",children:[e.jsxs("h2",{className:"text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3",children:[e.jsx(xe,{className:"w-8 h-8 text-indigo-600"}),"Singular Value Decomposition (SVD)"]}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6 mb-8",children:[e.jsxs("div",{className:"bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-bold text-gray-900 mb-4",children:"SVD Definition"}),e.jsxs("div",{className:"space-y-3 text-sm",children:[e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Fundamental Theorem:"}),e.jsx("div",{className:"font-mono text-sm bg-gray-50 p-3 rounded mb-3",children:"A = UΣVᵀ"}),e.jsxs("div",{className:"space-y-2 text-xs",children:[e.jsxs("div",{children:[e.jsx("strong",{children:"A:"})," m×n matrix (any matrix!)"]}),e.jsxs("div",{children:[e.jsx("strong",{children:"U:"})," m×m orthogonal matrix (left singular vectors)"]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Σ:"})," m×n diagonal matrix (singular values)"]}),e.jsxs("div",{children:[e.jsx("strong",{children:"V:"})," n×n orthogonal matrix (right singular vectors)"]})]})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Singular Values:"}),e.jsx("div",{className:"font-mono text-xs bg-gray-50 p-2 rounded mb-2",children:"σ₁ ≥ σ₂ ≥ ... ≥ σᵣ > 0"}),e.jsx("p",{className:"text-xs text-gray-700",children:"Ordered from largest to smallest, where r = rank(A)"})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Relationship to Eigenvalues:"}),e.jsxs("div",{className:"space-y-1 text-xs",children:[e.jsx("div",{children:"• σᵢ² are eigenvalues of AᵀA"}),e.jsx("div",{children:"• σᵢ² are eigenvalues of AAᵀ"}),e.jsx("div",{children:"• v columns are eigenvectors of AᵀA"}),e.jsx("div",{children:"• u columns are eigenvectors of AAᵀ"})]})]})]})]}),e.jsxs("div",{className:"bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-bold text-gray-900 mb-4",children:"Applications & Properties"}),e.jsxs("div",{className:"space-y-3 text-sm",children:[e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Key Applications:"}),e.jsxs("div",{className:"space-y-1 text-xs",children:[e.jsx("div",{children:"• Data compression and dimensionality reduction"}),e.jsx("div",{children:"• Principal Component Analysis (PCA)"}),e.jsx("div",{children:"• Image processing and noise reduction"}),e.jsx("div",{children:"• Recommender systems (matrix factorization)"}),e.jsx("div",{children:"• Pseudoinverse computation"}),e.jsx("div",{children:"• Low-rank approximation"})]})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Matrix Norms via SVD:"}),e.jsxs("div",{className:"space-y-2 text-xs",children:[e.jsxs("div",{className:"bg-gray-50 p-2 rounded",children:[e.jsx("strong",{children:"Spectral norm:"})," ‖A‖₂ = σ₁ (largest singular value)"]}),e.jsxs("div",{className:"bg-gray-50 p-2 rounded",children:[e.jsx("strong",{children:"Frobenius norm:"})," ‖A‖_F = √(σ₁² + σ₂² + ... + σᵣ²)"]}),e.jsxs("div",{className:"bg-gray-50 p-2 rounded",children:[e.jsx("strong",{children:"Nuclear norm:"})," ‖A‖_* = σ₁ + σ₂ + ... + σᵣ"]})]})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Low-Rank Approximation:"}),e.jsx("div",{className:"font-mono text-xs bg-gray-50 p-2 rounded mb-2",children:"A_k = ∑ᵢ₌₁ᵏ σᵢ uᵢ vᵢᵀ"}),e.jsx("p",{className:"text-xs text-gray-700",children:"Best rank-k approximation in Frobenius and spectral norms (Eckart-Young theorem)"})]})]})]})]}),e.jsxs("div",{className:"bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-xl p-6 mb-8",children:[e.jsx("h3",{className:"text-2xl font-bold text-gray-900 mb-4",children:"SVD Example: Image Compression"}),e.jsx("p",{className:"text-sm text-gray-700 mb-6",children:"SVD allows us to approximate a matrix with fewer components, reducing storage while preserving information."}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"bg-white rounded-lg p-6",children:[e.jsx("h4",{className:"font-bold text-gray-900 mb-3",children:"Concept:"}),e.jsxs("div",{className:"space-y-3 text-sm",children:[e.jsxs("div",{className:"bg-blue-50 p-3 rounded",children:[e.jsx("strong",{children:"Original Matrix:"}),e.jsx("div",{className:"mt-1",children:"Requires m×n values to store"})]}),e.jsxs("div",{className:"bg-green-50 p-3 rounded",children:[e.jsx("strong",{children:"Rank-k Approximation:"}),e.jsx("div",{className:"mt-1",children:"Requires k(m+n+1) values"})]}),e.jsxs("div",{className:"bg-purple-50 p-3 rounded",children:[e.jsx("strong",{children:"Compression Ratio:"}),e.jsx("div",{className:"mt-1 font-mono",children:"CR = mn / (k(m+n+1))"})]})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-6",children:[e.jsx("h4",{className:"font-bold text-gray-900 mb-3",children:"Quality vs Compression:"}),e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsxs("div",{className:"flex items-center justify-between bg-gray-50 p-2 rounded",children:[e.jsx("span",{children:"Keep 90% of singular values:"}),e.jsx("span",{className:"font-bold text-green-600",children:"High quality"})]}),e.jsxs("div",{className:"flex items-center justify-between bg-gray-50 p-2 rounded",children:[e.jsx("span",{children:"Keep 50% of singular values:"}),e.jsx("span",{className:"font-bold text-blue-600",children:"Good balance"})]}),e.jsxs("div",{className:"flex items-center justify-between bg-gray-50 p-2 rounded",children:[e.jsx("span",{children:"Keep 10% of singular values:"}),e.jsx("span",{className:"font-bold text-orange-600",children:"High compression"})]}),e.jsxs("div",{className:"mt-4 p-3 bg-yellow-50 rounded text-xs",children:[e.jsx("strong",{children:"Energy captured:"})," (∑ᵢ₌₁ᵏ σᵢ²) / (∑ᵢ₌₁ʳ σᵢ²)"]})]})]})]})]}),e.jsxs("div",{className:"bg-gray-900 rounded-lg p-6 text-white",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx(L,{className:"w-5 h-5 text-green-400"}),e.jsx("h5",{className:"font-bold",children:"Python Implementation: Singular Value Decomposition"})]}),e.jsx("pre",{className:"text-sm overflow-x-auto",children:e.jsx("code",{children:`import numpy as np
import matplotlib.pyplot as plt
from PIL import Image

# ============= Basic SVD =============
# Create example matrix
A = np.array([[4, 0], 
              [3, -5]])

print("=== Matrix A ===")
print(A)
print(f"Shape: {A.shape}")

# Compute SVD
U, s, Vt = np.linalg.svd(A)

print("\\n=== SVD Components ===")
print(f"\\nU (left singular vectors):\\n{U}")
print(f"\\nΣ (singular values): {s}")
print(f"\\nVᵀ (right singular vectors transposed):\\n{Vt}")

# Verify orthogonality
print("\\n=== Orthogonality Check ===")
print(f"UᵀU =\\n{U.T @ U}")
print(f"Is orthonormal: {np.allclose(U.T @ U, np.eye(U.shape[0]))}")
print(f"\\nVVᵀ =\\n{Vt.T @ Vt}")
print(f"Is orthonormal: {np.allclose(Vt.T @ Vt, np.eye(Vt.shape[0]))}")

# Reconstruct A
Sigma = np.zeros_like(A, dtype=float)
Sigma[:min(A.shape), :min(A.shape)] = np.diag(s)

A_reconstructed = U @ Sigma @ Vt

print("\\n=== Reconstruction ===")
print(f"A (original):\\n{A}")
print(f"\\nUΣVᵀ (reconstructed):\\n{A_reconstructed}")
print(f"\\nReconstruction error: {np.linalg.norm(A - A_reconstructed):.15f}")

# ============= Matrix Norms from SVD =============
print("\\n=== Matrix Norms ===")

# Spectral norm (largest singular value)
spectral_norm = s[0]
spectral_norm_verify = np.linalg.norm(A, ord=2)
print(f"Spectral norm (σ_max): {spectral_norm:.6f}")
print(f"Using np.linalg.norm: {spectral_norm_verify:.6f}")

# Frobenius norm
frob_norm = np.sqrt(np.sum(s**2))
frob_norm_verify = np.linalg.norm(A, 'fro')
print(f"\\nFrobenius norm: {frob_norm:.6f}")
print(f"Using np.linalg.norm: {frob_norm_verify:.6f}")

# Nuclear norm (sum of singular values)
nuclear_norm = np.sum(s)
print(f"\\nNuclear norm: {nuclear_norm:.6f}")

# ============= Relationship to Eigenvalues =============
print("\\n=== Relationship to Eigenvalues ===")

# AᵀA eigenvalues
ATA = A.T @ A
eigvals_ATA = np.linalg.eigvals(ATA)
print(f"\\nAᵀA eigenvalues: {np.sort(eigvals_ATA)[::-1]}")
print(f"σ² (singular values squared): {s**2}")
print(f"Match: {np.allclose(np.sort(eigvals_ATA)[::-1], s**2)}")

# AAᵀ eigenvalues
AAT = A @ A.T
eigvals_AAT = np.linalg.eigvals(AAT)
print(f"\\nAAᵀ eigenvalues: {np.sort(eigvals_AAT)[::-1]}")
print(f"Match: {np.allclose(np.sort(eigvals_AAT)[::-1], s**2)}")

# ============= Low-Rank Approximation =============
print("\\n=== Low-Rank Approximation ===")

# Create larger random matrix
np.random.seed(42)
M = np.random.randn(20, 15)

# Full SVD
U_m, s_m, Vt_m = np.linalg.svd(M, full_matrices=False)

print(f"Original matrix shape: {M.shape}")
print(f"Rank: {np.linalg.matrix_rank(M)}")
print(f"Singular values: {s_m}")

# Approximate with different ranks
for k in [1, 3, 5, 10]:
    # Truncate to rank k
    U_k = U_m[:, :k]
    s_k = s_m[:k]
    Vt_k = Vt_m[:k, :]
    
    # Reconstruct
    M_k = U_k @ np.diag(s_k) @ Vt_k
    
    # Error
    error = np.linalg.norm(M - M_k, 'fro')
    
    # Energy captured
    energy = np.sum(s_k**2) / np.sum(s_m**2)
    
    print(f"\\nRank-{k} approximation:")
    print(f"  Frobenius error: {error:.6f}")
    print(f"  Energy captured: {energy:.2%}")
    print(f"  Compression: {M.size} → {k * (M.shape[0] + M.shape[1] + 1)} values")

# ============= Image Compression Example =============
print("\\n=== Image Compression with SVD ===")

# Create synthetic image (grayscale)
x = np.linspace(-5, 5, 200)
y = np.linspace(-5, 5, 200)
X, Y = np.meshgrid(x, y)
image = np.sin(np.sqrt(X**2 + Y**2)) * np.exp(-0.1 * (X**2 + Y**2))

# Add some structure
image += 0.5 * np.sin(2*X) * np.cos(2*Y)

# Normalize to [0, 255]
image = (image - image.min()) / (image.max() - image.min()) * 255

print(f"Image shape: {image.shape}")

# Compute SVD
U_img, s_img, Vt_img = np.linalg.svd(image, full_matrices=False)

print(f"Number of singular values: {len(s_img)}")
print(f"Top 5 singular values: {s_img[:5]}")

# Reconstruct with different numbers of components
ranks_to_try = [1, 5, 10, 20, 50, 100]
reconstructions = {}

for k in ranks_to_try:
    U_k = U_img[:, :k]
    s_k = s_img[:k]
    Vt_k = Vt_img[:k, :]
    
    img_k = U_k @ np.diag(s_k) @ Vt_k
    
    error = np.linalg.norm(image - img_k, 'fro')
    energy = np.sum(s_k**2) / np.sum(s_img**2) * 100
    
    reconstructions[k] = img_k
    
    print(f"\\nRank-{k}:")
    print(f"  Error: {error:.2f}")
    print(f"  Energy: {energy:.2f}%")
    print(f"  Compression ratio: {image.size / (k * (image.shape[0] + image.shape[1] + 1)):.2f}x")

# ============= Pseudoinverse via SVD =============
print("\\n=== Pseudoinverse (Moore-Penrose) ===")

# For rectangular matrix
B = np.array([[1, 2], 
              [3, 4], 
              [5, 6]])

print(f"Matrix B (3×2):\\n{B}")

# SVD
U_b, s_b, Vt_b = np.linalg.svd(B, full_matrices=False)

# Pseudoinverse: A⁺ = V Σ⁺ Uᵀ
# where Σ⁺ has reciprocals of non-zero singular values
s_pinv = np.zeros((Vt_b.shape[0], U_b.shape[0]))
s_pinv[:len(s_b), :len(s_b)] = np.diag(1.0 / s_b)

B_pinv = Vt_b.T @ s_pinv @ U_b.T

print(f"\\nB⁺ (pseudoinverse):\\n{B_pinv}")

# Verify using numpy
B_pinv_numpy = np.linalg.pinv(B)
print(f"\\nNumPy pinv:\\n{B_pinv_numpy}")
print(f"Match: {np.allclose(B_pinv, B_pinv_numpy)}")

# Properties
print("\\n=== Pseudoinverse Properties ===")
print(f"BB⁺B =\\n{B @ B_pinv @ B}")
print(f"Match B: {np.allclose(B @ B_pinv @ B, B)}")

print(f"\\nB⁺BB⁺ =\\n{B_pinv @ B @ B_pinv}")
print(f"Match B⁺: {np.allclose(B_pinv @ B @ B_pinv, B_pinv)}")

# ============= Visualization =============
fig = plt.figure(figsize=(16, 12))

# Plot 1: Singular value spectrum
ax1 = plt.subplot(2, 3, 1)
ax1.plot(s_img, 'o-', linewidth=2, markersize=4)
ax1.set_xlabel('Index')
ax1.set_ylabel('Singular Value')
ax1.set_title('Singular Value Spectrum')
ax1.set_yscale('log')
ax1.grid(alpha=0.3)

# Plot 2: Cumulative energy
ax2 = plt.subplot(2, 3, 2)
cumulative_energy = np.cumsum(s_img**2) / np.sum(s_img**2) * 100
ax2.plot(cumulative_energy, linewidth=2)
ax2.axhline(y=90, color='r', linestyle='--', label='90% energy')
ax2.axhline(y=95, color='g', linestyle='--', label='95% energy')
ax2.set_xlabel('Number of Components')
ax2.set_ylabel('Cumulative Energy (%)')
ax2.set_title('Cumulative Energy Captured')
ax2.legend()
ax2.grid(alpha=0.3)

# Plot 3: Original image
ax3 = plt.subplot(2, 3, 3)
im3 = ax3.imshow(image, cmap='gray')
ax3.set_title('Original Image')
ax3.axis('off')
plt.colorbar(im3, ax=ax3)

# Plots 4-6: Reconstructions
positions = [(2, 3, 4), (2, 3, 5), (2, 3, 6)]
ranks_to_show = [5, 20, 50]

for pos, k in zip(positions, ranks_to_show):
    ax = plt.subplot(*pos)
    im = ax.imshow(reconstructions[k], cmap='gray')
    energy = np.sum(s_img[:k]**2) / np.sum(s_img**2) * 100
    ax.set_title(f'Rank-{k} ({energy:.1f}% energy)')
    ax.axis('off')
    plt.colorbar(im, ax=ax)

plt.tight_layout()
plt.show()

# Additional plot: Geometry of SVD
fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# Unit circle
theta = np.linspace(0, 2*np.pi, 100)
circle = np.array([np.cos(theta), np.sin(theta)])

# Apply transformations
Vt_circle = Vt @ circle  # Rotation
Sigma_Vt_circle = np.diag(s) @ Vt_circle  # Scaling
U_Sigma_Vt_circle = U @ np.diag(s) @ Vt @ circle  # Final rotation

axes[0].plot(circle[0], circle[1], 'b-', linewidth=2, label='Unit circle')
axes[0].set_title('1. Input (unit circle)')
axes[0].set_aspect('equal')
axes[0].grid(alpha=0.3)
axes[0].legend()

axes[1].plot(Sigma_Vt_circle[0], Sigma_Vt_circle[1], 'r-', linewidth=2)
axes[1].set_title('2. After Vᵀ and Σ (rotation + scaling)')
axes[1].set_aspect('equal')
axes[1].grid(alpha=0.3)

axes[2].plot(U_Sigma_Vt_circle[0], U_Sigma_Vt_circle[1], 'g-', linewidth=2)
axes[2].set_title('3. After U (final rotation)')
axes[2].set_aspect('equal')
axes[2].grid(alpha=0.3)

plt.tight_layout()
plt.show()`})})]})]})}),i==="projections"&&e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"bg-white rounded-xl shadow-lg p-8",children:[e.jsxs("h2",{className:"text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3",children:[e.jsx(oe,{className:"w-8 h-8 text-indigo-600"}),"Projections, Least Squares & Pseudoinverse"]}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6 mb-8",children:[e.jsxs("div",{className:"bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-bold text-gray-900 mb-4",children:"Vector Projections"}),e.jsxs("div",{className:"space-y-3 text-sm",children:[e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Projection onto Vector:"}),e.jsx("div",{className:"font-mono text-xs bg-gray-50 p-2 rounded mb-2",children:"proj_b(a) = ((a·b)/(b·b)) b"}),e.jsx("p",{className:"text-xs text-gray-700",children:"Component of a in direction of b"})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Projection Matrix:"}),e.jsx("div",{className:"font-mono text-xs bg-gray-50 p-2 rounded mb-2",children:"P = (bbᵀ)/(bᵀb)"}),e.jsx("div",{className:"font-mono text-xs bg-gray-50 p-2 rounded",children:"proj_b(a) = Pa"})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Properties:"}),e.jsxs("div",{className:"space-y-1 text-xs",children:[e.jsx("div",{children:"• P² = P (idempotent)"}),e.jsx("div",{children:"• Pᵀ = P (symmetric)"}),e.jsx("div",{children:"• eigenvalues: 0 or 1"})]})]})]})]}),e.jsxs("div",{className:"bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-bold text-gray-900 mb-4",children:"Least Squares"}),e.jsxs("div",{className:"space-y-3 text-sm",children:[e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Problem:"}),e.jsx("p",{className:"text-xs text-gray-700 mb-2",children:"Find x that minimizes ‖Ax - b‖²"}),e.jsx("div",{className:"font-mono text-xs bg-gray-50 p-2 rounded",children:"min_x ‖Ax - b‖²"})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Normal Equations:"}),e.jsx("div",{className:"font-mono text-xs bg-gray-50 p-2 rounded mb-2",children:"AᵀAx = Aᵀb"}),e.jsx("div",{className:"font-mono text-xs bg-gray-50 p-2 rounded",children:"x = (AᵀA)⁻¹Aᵀb"})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Geometric Interpretation:"}),e.jsx("p",{className:"text-xs text-gray-700",children:"Project b onto column space of A. The solution x gives coefficients for the projection."})]})]})]})]}),e.jsxs("div",{className:"bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-xl p-6 mb-8",children:[e.jsx("h3",{className:"text-2xl font-bold text-gray-900 mb-4",children:"Moore-Penrose Pseudoinverse"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6 mb-6",children:[e.jsxs("div",{className:"bg-white rounded-lg p-6",children:[e.jsx("h4",{className:"font-bold text-gray-900 mb-3",children:"Definition:"}),e.jsxs("div",{className:"space-y-3 text-sm",children:[e.jsxs("div",{className:"bg-gray-50 p-3 rounded",children:[e.jsx("div",{className:"font-mono text-sm mb-2",children:"A⁺ = (AᵀA)⁻¹Aᵀ"}),e.jsx("p",{className:"text-xs text-gray-600",children:"When A has full column rank"})]}),e.jsxs("div",{className:"bg-gray-50 p-3 rounded",children:[e.jsx("div",{className:"font-mono text-sm mb-2",children:"A⁺ = Aᵀ(AAᵀ)⁻¹"}),e.jsx("p",{className:"text-xs text-gray-600",children:"When A has full row rank"})]}),e.jsxs("div",{className:"bg-gray-50 p-3 rounded",children:[e.jsx("div",{className:"font-mono text-sm mb-2",children:"A⁺ = VΣ⁺Uᵀ"}),e.jsx("p",{className:"text-xs text-gray-600",children:"General case via SVD"})]})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-6",children:[e.jsx("h4",{className:"font-bold text-gray-900 mb-3",children:"Properties:"}),e.jsxs("div",{className:"space-y-2 text-sm",children:[e.jsx("div",{className:"bg-blue-50 p-2 rounded font-mono text-xs",children:"AA⁺A = A"}),e.jsx("div",{className:"bg-green-50 p-2 rounded font-mono text-xs",children:"A⁺AA⁺ = A⁺"}),e.jsx("div",{className:"bg-purple-50 p-2 rounded font-mono text-xs",children:"(AA⁺)ᵀ = AA⁺"}),e.jsx("div",{className:"bg-orange-50 p-2 rounded font-mono text-xs",children:"(A⁺A)ᵀ = A⁺A"}),e.jsx("p",{className:"text-xs text-gray-600 mt-3",children:"These four properties uniquely define the pseudoinverse"})]})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-6",children:[e.jsx("h4",{className:"font-bold text-gray-900 mb-3",children:"Applications:"}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-4 text-sm",children:[e.jsxs("div",{className:"bg-blue-50 p-4 rounded",children:[e.jsx("strong",{children:"Solving Ax = b:"}),e.jsx("div",{className:"mt-2 text-xs",children:"x = A⁺b gives minimum norm solution when consistent, or least squares solution otherwise"})]}),e.jsxs("div",{className:"bg-green-50 p-4 rounded",children:[e.jsx("strong",{children:"Regression:"}),e.jsx("div",{className:"mt-2 text-xs",children:"Linear regression coefficients: β = (XᵀX)⁺Xᵀy"})]}),e.jsxs("div",{className:"bg-purple-50 p-4 rounded",children:[e.jsx("strong",{children:"Data Analysis:"}),e.jsx("div",{className:"mt-2 text-xs",children:"Handling rank-deficient or underdetermined systems"})]})]})]})]}),e.jsxs("div",{className:"bg-gray-900 rounded-lg p-6 text-white",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx(L,{className:"w-5 h-5 text-green-400"}),e.jsx("h5",{className:"font-bold",children:"Python Implementation: Projections & Least Squares"})]}),e.jsx("pre",{className:"text-sm overflow-x-auto",children:e.jsx("code",{children:`import numpy as np
import matplotlib.pyplot as plt
from scipy.linalg import lstsq

# ============= Vector Projection =============
print("=== Vector Projection ===")

# Vectors
a = np.array([2, 3])
b = np.array([1, 1])

# Projection of a onto b
proj_coeff = np.dot(a, b) / np.dot(b, b)
proj = proj_coeff * b

# Perpendicular component
perp = a - proj

print(f"Vector a: {a}")
print(f"Vector b: {b}")
print(f"\\nProjection of a onto b: {proj}")
print(f"Perpendicular component: {perp}")

# Verify orthogonality
print(f"\\nDot product (should be 0): {np.dot(proj, perp):.10f}")

# Verify Pythagorean theorem
print(f"\\n‖a‖² = {np.dot(a, a):.6f}")
print(f"‖proj‖² + ‖perp‖² = {np.dot(proj, proj) + np.dot(perp, perp):.6f}")

# ============= Projection Matrix =============
print("\\n=== Projection Matrix ===")

# Projection matrix onto line spanned by b
P = np.outer(b, b) / np.dot(b, b)

print(f"Projection matrix P:\\n{P}")

# Apply to vector a
proj_matrix = P @ a
print(f"\\nP @ a = {proj_matrix}")
print(f"Match with direct calculation: {np.allclose(proj_matrix, proj)}")

# Verify projection matrix properties
print("\\n=== Projection Matrix Properties ===")
print(f"P² = P (idempotent):")
print(f"P² =\\n{P @ P}")
print(f"Match: {np.allclose(P @ P, P)}")

print(f"\\nPᵀ = P (symmetric):")
print(f"Match: {np.allclose(P.T, P)}")

# Eigenvalues
eigvals_P = np.linalg.eigvals(P)
print(f"\\nEigenvalues of P: {eigvals_P}")
print(f"All eigenvalues are 0 or 1: {np.allclose(eigvals_P, np.round(eigvals_P))}")

# ============= Projection onto Subspace =============
print("\\n=== Projection onto Subspace ===")

# Define subspace with basis vectors
v1 = np.array([1, 0, 0])
v2 = np.array([0, 1, 0])
A = np.column_stack([v1, v2])  # 3x2 matrix

print(f"Subspace basis (columns of A):\\n{A}")

# Projection matrix onto column space of A
P_subspace = A @ np.linalg.inv(A.T @ A) @ A.T

print(f"\\nProjection matrix onto col(A):\\n{P_subspace}")

# Project a 3D vector onto the xy-plane
v_3d = np.array([1, 2, 3])
proj_3d = P_subspace @ v_3d

print(f"\\nVector in 3D: {v_3d}")
print(f"Projection onto xy-plane: {proj_3d}")
print(f"Expected [1, 2, 0]: {np.allclose(proj_3d, [1, 2, 0])}")

# ============= Least Squares Problem =============
print("\\n=== Least Squares Linear Regression ===")

# Generate noisy data
np.random.seed(42)
n = 50
true_slope = 2.5
true_intercept = 1.0

x = np.linspace(0, 10, n)
y_true = true_slope * x + true_intercept
noise = np.random.randn(n) * 2
y = y_true + noise

# Design matrix (add column of ones for intercept)
X = np.column_stack([np.ones(n), x])

print(f"Data points: {n}")
print(f"Design matrix shape: {X.shape}")

# Method 1: Normal equations
XtX = X.T @ X
Xty = X.T @ y
beta_normal = np.linalg.solve(XtX, Xty)

print(f"\\n=== Method 1: Normal Equations ===")
print(f"XᵀX =\\n{XtX}")
print(f"\\nCoefficients β = (XᵀX)⁻¹Xᵀy:")
print(f"Intercept: {beta_normal[0]:.4f} (true: {true_intercept})")
print(f"Slope: {beta_normal[1]:.4f} (true: {true_slope})")

# Method 2: Using numpy's lstsq
result = np.linalg.lstsq(X, y, rcond=None)
beta_lstsq = result[0]
residuals_sum = result[1][0] if len(result[1]) > 0 else None

print(f"\\n=== Method 2: NumPy lstsq ===")
print(f"Coefficients: {beta_lstsq}")
print(f"Residual sum of squares: {residuals_sum:.4f}")

# Method 3: Pseudoinverse
X_pinv = np.linalg.pinv(X)
beta_pinv = X_pinv @ y

print(f"\\n=== Method 3: Pseudoinverse ===")
print(f"Coefficients: {beta_pinv}")

# Verify all methods give same result
print(f"\\nAll methods match: {np.allclose(beta_normal, beta_lstsq) and np.allclose(beta_normal, beta_pinv)}")

# Predictions
y_pred = X @ beta_normal

# Residuals
residuals = y - y_pred

# R-squared
ss_total = np.sum((y - np.mean(y))**2)
ss_residual = np.sum(residuals**2)
r_squared = 1 - (ss_residual / ss_total)

print(f"\\n=== Model Quality ===")
print(f"R² = {r_squared:.4f}")
print(f"RMSE = {np.sqrt(np.mean(residuals**2)):.4f}")

# ============= QR Decomposition for Least Squares =============
print("\\n=== Method 4: QR Decomposition ===")

Q, R = np.linalg.qr(X)
beta_qr = np.linalg.solve(R, Q.T @ y)

print(f"Coefficients via QR: {beta_qr}")
print(f"Match normal equations: {np.allclose(beta_qr, beta_normal)}")

print("\\nQR is more numerically stable for ill-conditioned problems")

# ============= Weighted Least Squares =============
print("\\n=== Weighted Least Squares ===")

# Weights (inverse variance)
weights = np.ones(n)
weights[:10] = 0.5  # Lower weight for first 10 points
W = np.diag(weights)

# Weighted normal equations: (XᵀWX)β = XᵀWy
XtWX = X.T @ W @ X
XtWy = X.T @ W @ y
beta_weighted = np.linalg.solve(XtWX, XtWy)

print(f"Weighted coefficients: {beta_weighted}")

# ============= Underdetermined System =============
print("\\n=== Underdetermined System (more unknowns than equations) ===")

# 2 equations, 3 unknowns
A_under = np.array([[1, 2, 3], 
                     [4, 5, 6]])
b_under = np.array([1, 2])

print(f"System: A has shape {A_under.shape}")
print(f"More unknowns than equations")

# Minimum norm solution via pseudoinverse
x_min_norm = np.linalg.pinv(A_under) @ b_under

print(f"\\nMinimum norm solution: {x_min_norm}")
print(f"Verify Ax ≈ b: {A_under @ x_min_norm}")
print(f"Norm ‖x‖: {np.linalg.norm(x_min_norm):.6f}")

# Check there are infinitely many solutions
# x + null space vector is also a solution
null_space = np.array([-1, 2, -1])  # In null space of A
x_alt = x_min_norm + 0.5 * null_space

print(f"\\nAlternative solution: {x_alt}")
print(f"Also satisfies Ax ≈ b: {A_under @ x_alt}")
print(f"But larger norm ‖x‖: {np.linalg.norm(x_alt):.6f}")

# ============= Overdetermined System =============
print("\\n=== Overdetermined System (more equations than unknowns) ===")

# 4 equations, 2 unknowns (inconsistent)
A_over = np.array([[1, 1], 
                    [1, 2], 
                    [1, 3],
                    [1, 4]])
b_over = np.array([1, 3, 3, 5])

print(f"System: A has shape {A_over.shape}")

# Least squares solution
x_ls = np.linalg.lstsq(A_over, b_over, rcond=None)[0]

print(f"\\nLeast squares solution: {x_ls}")
print(f"Predictions: {A_over @ x_ls}")
print(f"True values: {b_over}")
print(f"Residuals: {b_over - A_over @ x_ls}")
print(f"Residual norm: {np.linalg.norm(b_over - A_over @ x_ls):.6f}")

# ============= Visualization =============
fig, axes = plt.subplots(2, 2, figsize=(14, 12))

# Plot 1: Vector projection
ax1 = axes[0, 0]
origin = [0, 0]
ax1.quiver(*origin, *a, angles='xy', scale_units='xy', scale=1, 
          color='blue', width=0.01, label='a')
ax1.quiver(*origin, *b, angles='xy', scale_units='xy', scale=1, 
          color='red', width=0.01, label='b')
ax1.quiver(*origin, *proj, angles='xy', scale_units='xy', scale=1, 
          color='green', width=0.01, label='proj_b(a)')
ax1.quiver(*proj, *perp, angles='xy', scale_units='xy', scale=1, 
          color='purple', width=0.008, linestyle='--', label='perpendicular')

# Draw dotted line from a to projection
ax1.plot([a[0], proj[0]], [a[1], proj[1]], 'k:', linewidth=1)

ax1.set_xlim([-0.5, 3])
ax1.set_ylim([-0.5, 3.5])
ax1.set_xlabel('x')
ax1.set_ylabel('y')
ax1.set_title('Vector Projection')
ax1.legend()
ax1.grid(alpha=0.3)
ax1.set_aspect('equal')

# Plot 2: Least squares fit
ax2 = axes[0, 1]
ax2.scatter(x, y, alpha=0.6, s=50, label='Data')
ax2.plot(x, y_true, 'g--', linewidth=2, label='True line')
ax2.plot(x, y_pred, 'r-', linewidth=2, label='Fitted line')

for i in range(0, n, 5):  # Draw some residuals
    ax2.plot([x[i], x[i]], [y[i], y_pred[i]], 'k:', alpha=0.3)

ax2.set_xlabel('x')
ax2.set_ylabel('y')
ax2.set_title(f'Least Squares Regression (R² = {r_squared:.3f})')
ax2.legend()
ax2.grid(alpha=0.3)

# Plot 3: Residuals
ax3 = axes[1, 0]
ax3.scatter(y_pred, residuals, alpha=0.6, s=50)
ax3.axhline(y=0, color='r', linestyle='--', linewidth=2)
ax3.set_xlabel('Fitted values')
ax3.set_ylabel('Residuals')
ax3.set_title('Residual Plot')
ax3.grid(alpha=0.3)

# Plot 4: Q-Q plot of residuals
ax4 = axes[1, 1]
from scipy import stats
stats.probplot(residuals, dist="norm", plot=ax4)
ax4.set_title('Q-Q Plot (Normality of Residuals)')
ax4.grid(alpha=0.3)

plt.tight_layout()
plt.show()

# ============= Projection onto Column Space =============
print("\\n=== Projection onto Column Space ===")

# The least squares solution projects b onto col(A)
b_proj = X @ beta_normal

print(f"Original b (y): shape {y.shape}")
print(f"Projection onto col(X): shape {b_proj.shape}")
print(f"Residual (perpendicular): {y - b_proj}")

# Verify residual is orthogonal to column space
print(f"\\nXᵀ(y - ŷ) (should be ~0):")
print(X.T @ (y - b_proj))
print(f"Orthogonal: {np.allclose(X.T @ (y - b_proj), 0)}")`})})]})]})}),i==="stability"&&e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"bg-white rounded-xl shadow-lg p-8",children:[e.jsxs("h2",{className:"text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3",children:[e.jsx(Ce,{className:"w-8 h-8 text-indigo-600"}),"Numerical Stability & Condition Numbers"]}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6 mb-8",children:[e.jsxs("div",{className:"bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-bold text-gray-900 mb-4",children:"Condition Number"}),e.jsxs("div",{className:"space-y-3 text-sm",children:[e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Definition:"}),e.jsx("div",{className:"font-mono text-sm bg-gray-50 p-3 rounded mb-2",children:"κ(A) = ‖A‖ · ‖A⁻¹‖"}),e.jsx("div",{className:"font-mono text-sm bg-gray-50 p-3 rounded mb-2",children:"κ₂(A) = σ_max / σ_min"}),e.jsx("p",{className:"text-xs text-gray-700",children:"Ratio of largest to smallest singular value"})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Interpretation:"}),e.jsxs("div",{className:"space-y-2 text-xs",children:[e.jsxs("div",{className:"bg-green-50 p-2 rounded",children:[e.jsx("strong",{children:"κ ≈ 1:"})," Well-conditioned (stable)"]}),e.jsxs("div",{className:"bg-yellow-50 p-2 rounded",children:[e.jsx("strong",{children:"κ = 10²-10⁴:"})," Moderately conditioned"]}),e.jsxs("div",{className:"bg-orange-50 p-2 rounded",children:[e.jsx("strong",{children:"κ = 10⁶-10⁸:"})," Poorly conditioned"]}),e.jsxs("div",{className:"bg-red-50 p-2 rounded",children:[e.jsx("strong",{children:"κ > 10¹⁰:"})," Ill-conditioned (unstable)"]})]})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Error Amplification:"}),e.jsx("div",{className:"font-mono text-xs bg-gray-50 p-2 rounded",children:"(‖Δx‖/‖x‖) ≤ κ(A) · (‖Δb‖/‖b‖)"}),e.jsx("p",{className:"text-xs text-gray-700 mt-2",children:"Small errors in b can be amplified by factor κ(A) in solution x"})]})]})]}),e.jsxs("div",{className:"bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-bold text-gray-900 mb-4",children:"Numerical Stability"}),e.jsxs("div",{className:"space-y-3 text-sm",children:[e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Sources of Error:"}),e.jsxs("div",{className:"space-y-1 text-xs",children:[e.jsxs("div",{children:["• ",e.jsx("strong",{children:"Round-off error:"})," Finite precision arithmetic"]}),e.jsxs("div",{children:["• ",e.jsx("strong",{children:"Truncation error:"})," Approximation in algorithms"]}),e.jsxs("div",{children:["• ",e.jsx("strong",{children:"Cancellation:"})," Subtracting similar numbers"]}),e.jsxs("div",{children:["• ",e.jsx("strong",{children:"Overflow/Underflow:"})," Values too large/small"]})]})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Machine Epsilon:"}),e.jsx("div",{className:"font-mono text-xs bg-gray-50 p-2 rounded mb-2",children:"ε_machine ≈ 2.22 × 10⁻¹⁶ (64-bit float)"}),e.jsx("p",{className:"text-xs text-gray-700",children:"Smallest number such that 1 + ε ≠ 1 in computer arithmetic"})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Stable Algorithms:"}),e.jsxs("div",{className:"space-y-2 text-xs",children:[e.jsx("div",{className:"bg-green-50 p-2 rounded",children:"✓ QR decomposition for least squares"}),e.jsx("div",{className:"bg-green-50 p-2 rounded",children:"✓ SVD for rank-deficient problems"}),e.jsx("div",{className:"bg-red-50 p-2 rounded",children:"✗ Normal equations (XᵀX)⁻¹Xᵀy for ill-conditioned X"})]})]}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Positive Definite Matrices:"}),e.jsxs("div",{className:"space-y-1 text-xs",children:[e.jsx("div",{children:"• All eigenvalues λ > 0"}),e.jsx("div",{children:"• xᵀAx > 0 for all x ≠ 0"}),e.jsx("div",{children:"• Better conditioned than general matrices"}),e.jsx("div",{children:"• Cholesky decomposition: A = LLᵀ"})]})]})]})]})]}),e.jsxs("div",{className:"bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-xl p-6 mb-8",children:[e.jsx("h3",{className:"text-2xl font-bold text-gray-900 mb-4",children:"Classic Examples of Ill-Conditioning"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"bg-white rounded-lg p-6",children:[e.jsx("h4",{className:"font-bold text-gray-900 mb-3",children:"Hilbert Matrix:"}),e.jsx("div",{className:"font-mono text-sm bg-gray-50 p-3 rounded mb-3",children:"H_ij = 1/(i+j-1)"}),e.jsx("p",{className:"text-sm text-gray-700 mb-3",children:"Classic example of an ill-conditioned matrix. Even small Hilbert matrices have enormous condition numbers."}),e.jsxs("div",{className:"space-y-2 text-xs",children:[e.jsx("div",{className:"bg-red-50 p-2 rounded",children:"H₅: κ ≈ 4.8 × 10⁵"}),e.jsx("div",{className:"bg-red-50 p-2 rounded",children:"H₁₀: κ ≈ 1.6 × 10¹³"}),e.jsx("div",{className:"bg-red-50 p-2 rounded",children:"H₁₅: κ ≈ 5.0 × 10¹⁷"})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-6",children:[e.jsx("h4",{className:"font-bold text-gray-900 mb-3",children:"Vandermonde Matrix:"}),e.jsx("div",{className:"font-mono text-sm bg-gray-50 p-3 rounded mb-3",children:"V_ij = x_i^(j-1)"}),e.jsx("p",{className:"text-sm text-gray-700 mb-3",children:"Used in polynomial interpolation. Becomes ill-conditioned as degree increases."}),e.jsxs("div",{className:"bg-yellow-50 p-3 rounded text-xs",children:[e.jsx("strong",{children:"Problem:"})," Small changes in data points lead to drastically different interpolating polynomials at high degrees."]})]})]})]}),e.jsxs("div",{className:"bg-gray-900 rounded-lg p-6 text-white",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx(L,{className:"w-5 h-5 text-green-400"}),e.jsx("h5",{className:"font-bold",children:"Python Implementation: Condition Numbers & Stability"})]}),e.jsx("pre",{className:"text-sm overflow-x-auto",children:e.jsx("code",{children:`import numpy as np
import matplotlib.pyplot as plt
from scipy.linalg import hilbert, invhilbert

# ============= Condition Number =============
print("=== Condition Number Basics ===")

# Well-conditioned matrix
A_good = np.array([[2, 1], 
                    [1, 2]])

cond_good = np.linalg.cond(A_good)

print(f"Well-conditioned matrix:\\n{A_good}")
print(f"Condition number: {cond_good:.4f}")

# Ill-conditioned matrix (nearly singular)
A_bad = np.array([[1, 1], 
                   [1, 1.0001]])

cond_bad = np.linalg.cond(A_bad)

print(f"\\nIll-conditioned matrix:\\n{A_bad}")
print(f"Condition number: {cond_bad:.2e}")

# Compute condition number manually
U, s, Vt = np.linalg.svd(A_bad)
cond_manual = s[0] / s[-1]

print(f"Manual calculation (σ_max/σ_min): {cond_manual:.2e}")

# ============= Machine Epsilon =============
print("\\n=== Machine Epsilon ===")

# Find machine epsilon
eps = np.finfo(float).eps
print(f"Machine epsilon: {eps:.2e}")

# Verify
print(f"1.0 + eps/2 == 1.0: {1.0 + eps/2 == 1.0}")
print(f"1.0 + eps == 1.0: {1.0 + eps == 1.0}")

# ============= Hilbert Matrix (Classic Ill-Conditioned) =============
print("\\n=== Hilbert Matrix ===")

for n in [3, 5, 8, 10]:
    H = hilbert(n)
    cond_H = np.linalg.cond(H)
    
    print(f"\\nHilbert matrix {n}×{n}:")
    print(f"Condition number: {cond_H:.2e}")
    
    # Show first few elements
    if n == 3:
        print(f"Matrix:\\n{H}")

# Demonstrate instability
n = 5
H = hilbert(n)
b = np.ones(n)

# Solve using direct inversion (unstable)
H_inv = np.linalg.inv(H)
x_inv = H_inv @ b

# Solve using lstsq (more stable)
x_lstsq = np.linalg.lstsq(H, b, rcond=None)[0]

# True solution (using exact inverse)
H_inv_exact = invhilbert(n)
x_exact = H_inv_exact @ b

print(f"\\n=== Solving Hx = b (b = ones) ===")
print(f"Solution via inv: {x_inv}")
print(f"Solution via lstsq: {x_lstsq}")
print(f"Exact solution: {x_exact}")
print(f"\\nError (inv): {np.linalg.norm(x_inv - x_exact):.2e}")
print(f"Error (lstsq): {np.linalg.norm(x_lstsq - x_exact):.2e}")

# ============= Error Amplification =============
print("\\n=== Error Amplification ===")

# Well-conditioned system
A = np.array([[2, 1], 
              [1, 3]])
b = np.array([1, 1])

x = np.linalg.solve(A, b)
cond_A = np.linalg.cond(A)

print(f"Condition number of A: {cond_A:.4f}")
print(f"Solution x: {x}")

# Perturb b slightly
delta = 1e-6
b_perturbed = b + delta * np.array([1, 0])

x_perturbed = np.linalg.solve(A, b_perturbed)

# Relative errors
rel_error_b = np.linalg.norm(b_perturbed - b) / np.linalg.norm(b)
rel_error_x = np.linalg.norm(x_perturbed - x) / np.linalg.norm(x)

print(f"\\nRelative error in b: {rel_error_b:.2e}")
print(f"Relative error in x: {rel_error_x:.2e}")
print(f"Amplification factor: {rel_error_x / rel_error_b:.4f}")
print(f"Theoretical bound (κ): {cond_A:.4f}")

# ============= Positive Definite Matrices =============
print("\\n=== Positive Definite Matrices ===")

# Create positive definite matrix
P = np.array([[4, 2], 
              [2, 3]])

print(f"Matrix P:\\n{P}")

# Check if positive definite
eigvals_P = np.linalg.eigvals(P)
print(f"\\nEigenvalues: {eigvals_P}")
print(f"All positive: {np.all(eigvals_P > 0)}")

# Quadratic form
x_test = np.array([1, 1])
quad_form = x_test.T @ P @ x_test
print(f"\\nxᵀPx for x={x_test}: {quad_form:.4f}")
print(f"Positive: {quad_form > 0}")

# Cholesky decomposition (only for positive definite)
try:
    L = np.linalg.cholesky(P)
    print(f"\\nCholesky decomposition P = LLᵀ:")
    print(f"L =\\n{L}")
    print(f"\\nVerify: LLᵀ =\\n{L @ L.T}")
    print(f"Match P: {np.allclose(L @ L.T, P)}")
except np.linalg.LinAlgError:
    print("Matrix is not positive definite")

# ============= Normal Equations vs QR =============
print("\\n=== Normal Equations vs QR Decomposition ===")

# Create mildly ill-conditioned problem
np.random.seed(42)
m, n = 100, 10

# Design matrix with high correlation
X = np.random.randn(m, n)
X[:, 1] = 0.99 * X[:, 0] + 0.01 * np.random.randn(m)  # Highly correlated columns

y = np.random.randn(m)

print(f"Design matrix shape: {X.shape}")
print(f"Condition number of X: {np.linalg.cond(X):.2e}")

# Method 1: Normal equations (potentially unstable)
XtX = X.T @ X
Xty = X.T @ y

cond_XtX = np.linalg.cond(XtX)
print(f"\\nCondition number of XᵀX: {cond_XtX:.2e}")
print(f"Note: κ(XᵀX) ≈ κ(X)² for normal equations!")

beta_normal = np.linalg.solve(XtX, Xty)

# Method 2: QR decomposition (more stable)
Q, R = np.linalg.qr(X)
beta_qr = np.linalg.solve(R, Q.T @ y)

# Method 3: SVD (most stable)
U, s, Vt = np.linalg.svd(X, full_matrices=False)
beta_svd = Vt.T @ np.diag(1/s) @ U.T @ y

print("\\n=== Solutions ===")
print(f"Normal equations: {beta_normal[:3]}...")
print(f"QR decomposition: {beta_qr[:3]}...")
print(f"SVD: {beta_svd[:3]}...")

# Check residuals
residual_normal = np.linalg.norm(X @ beta_normal - y)
residual_qr = np.linalg.norm(X @ beta_qr - y)
residual_svd = np.linalg.norm(X @ beta_svd - y)

print("\\n=== Residual Norms ===")
print(f"Normal equations: {residual_normal:.10f}")
print(f"QR decomposition: {residual_qr:.10f}")
print(f"SVD: {residual_svd:.10f}")

# ============= Catastrophic Cancellation =============
print("\\n=== Catastrophic Cancellation ===")

# Bad way to compute (1 + x) - 1 for small x
x_small = 1e-16
result_bad = (1.0 + x_small) - 1.0
result_good = x_small

print(f"x = {x_small:.2e}")
print(f"Bad: (1 + x) - 1 = {result_bad:.2e}")
print(f"Good: x = {result_good:.2e}")
print(f"Relative error: {abs(result_bad - result_good) / result_good:.2e}")

# Example: solving quadratic equation
# x² - 10⁸x + 1 = 0
a, b, c = 1, -1e8, 1

# Standard formula (unstable for one root)
disc = b**2 - 4*a*c
x1_bad = (-b + np.sqrt(disc)) / (2*a)
x2_bad = (-b - np.sqrt(disc)) / (2*a)

# Stable formula
x1_good = (-b - np.sign(b)*np.sqrt(disc)) / (2*a)
x2_good = c / (a * x1_good)

print(f"\\n=== Quadratic Formula ===")
print(f"Equation: x² - 10⁸x + 1 = 0")
print(f"\\nStandard formula:")
print(f"x₁ = {x1_bad:.10e}")
print(f"x₂ = {x2_bad:.10e}")
print(f"\\nStable formula:")
print(f"x₁ = {x1_good:.10e}")
print(f"x₂ = {x2_good:.10e}")

# Verify
print(f"\\nVerification (should be ≈ 0):")
print(f"x₁² - 10⁸x₁ + 1 = {x1_good**2 - 1e8*x1_good + 1:.2e}")
print(f"x₂² - 10⁸x₂ + 1 = {x2_good**2 - 1e8*x2_good + 1:.2e}")

# ============= Visualization =============
fig, axes = plt.subplots(2, 2, figsize=(14, 12))

# Plot 1: Condition number growth for Hilbert matrices
ax1 = axes[0, 0]
sizes = range(2, 13)
conds = [np.linalg.cond(hilbert(n)) for n in sizes]

ax1.semilogy(sizes, conds, 'o-', linewidth=2, markersize=8)
ax1.set_xlabel('Matrix Size n')
ax1.set_ylabel('Condition Number')
ax1.set_title('Hilbert Matrix Condition Numbers')
ax1.grid(alpha=0.3)
ax1.axhline(y=1e10, color='r', linestyle='--', label='Severely ill-conditioned')
ax1.legend()

# Plot 2: Effect of perturbation
ax2 = axes[0, 1]

perturbations = np.logspace(-16, -2, 50)
errors = []

for delta in perturbations:
    b_pert = b + delta * np.array([1, 0])
    x_pert = np.linalg.solve(A, b_pert)
    rel_err = np.linalg.norm(x_pert - x) / np.linalg.norm(x)
    errors.append(rel_err)

ax2.loglog(perturbations, errors, 'b-', linewidth=2, label='Actual error')
ax2.loglog(perturbations, cond_A * np.array(perturbations) / np.linalg.norm(b), 
          'r--', linewidth=2, label='κ(A) bound')

ax2.set_xlabel('Relative Perturbation in b')
ax2.set_ylabel('Relative Error in x')
ax2.set_title('Error Amplification')
ax2.legend()
ax2.grid(alpha=0.3)

# Plot 3: Singular values of ill-conditioned matrix
ax3 = axes[1, 0]

H_vis = hilbert(8)
U, s, Vt = np.linalg.svd(H_vis)

ax3.semilogy(range(1, len(s)+1), s, 'o-', linewidth=2, markersize=8)
ax3.set_xlabel('Index')
ax3.set_ylabel('Singular Value')
ax3.set_title(f'Singular Values of H₈ (κ = {s[0]/s[-1]:.2e})')
ax3.grid(alpha=0.3)

# Plot 4: Comparison of methods
ax4 = axes[1, 1]

methods = ['Normal\\nEquations', 'QR', 'SVD']
residuals_comparison = [residual_normal, residual_qr, residual_svd]
colors = ['red', 'yellow', 'green']

bars = ax4.bar(methods, residuals_comparison, color=colors, alpha=0.7, edgecolor='black')
ax4.set_ylabel('Residual Norm')
ax4.set_title('Least Squares: Method Comparison')
ax4.set_yscale('log')
ax4.grid(alpha=0.3, axis='y')

# Add value labels on bars
for bar, val in zip(bars, residuals_comparison):
    height = bar.get_height()
    ax4.text(bar.get_x() + bar.get_width()/2., height,
            f'{val:.2e}', ha='center', va='bottom', fontsize=10)

plt.tight_layout()
plt.show()

# ============= Best Practices =============
print("\\n=== Numerical Stability Best Practices ===")
print("1. Use QR or SVD instead of normal equations for least squares")
print("2. Check condition number before solving systems")
print("3. Avoid forming XᵀX explicitly when X is ill-conditioned")
print("4. Use Cholesky decomposition for positive definite systems")
print("5. Be aware of catastrophic cancellation in subtraction")
print("6. Scale data appropriately (normalize/standardize)")
print("7. Use double precision when needed")
print("8. Add regularization (ridge regression) for ill-conditioned problems")
print("9. Use iterative methods for very large sparse systems")
print("10. Always verify your results!")`})})]})]})}),e.jsxs("div",{className:"bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-8 text-white",children:[e.jsx("h3",{className:"text-2xl font-bold mb-4",children:"Master Linear Algebra"}),e.jsx("p",{className:"mb-6 opacity-90",children:"Linear algebra is the foundation of modern machine learning, data science, computer graphics, and scientific computing. These concepts are essential for understanding algorithms and building robust systems."}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-4",children:[e.jsxs("div",{className:"bg-white bg-opacity-20 rounded-lg p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Core Concepts"}),e.jsx("p",{className:"text-sm opacity-90",children:"Vectors, matrices, eigenvalues, SVD"})]}),e.jsxs("div",{className:"bg-white bg-opacity-20 rounded-lg p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Applications"}),e.jsx("p",{className:"text-sm opacity-90",children:"ML, graphics, optimization, physics"})]}),e.jsxs("div",{className:"bg-white bg-opacity-20 rounded-lg p-4",children:[e.jsx("h4",{className:"font-bold mb-2",children:"Practice"}),e.jsx("p",{className:"text-sm opacity-90",children:"Implement algorithms, solve problems"})]})]})]})]})})};function Dt(){const[i,s]=fe.useState("mleducation"),a=[{id:"mleducation",label:"5. ML Education",color:"#3b82f6"},{id:"interactive",label:"6. ML Interactive",color:"#8b5cf6"},{id:"mlguide",label:"9. ML Guide",color:"#10b981"},{id:"featureeng",label:"10. Feature Engineering",color:"#f59e0b"},{id:"decision",label:"13. Decision Machine",color:"#ef4444"},{id:"linalg",label:"36. Linear Algebra Lab",color:"#6366f1"},{id:"pyfile",label:"ML Python File",color:"#14b8a6"},{id:"md1",label:"Intelligent Systems (7)",color:"#64748b"},{id:"md2",label:"Intelligent System (8)",color:"#94a3b8"}];return e.jsxs("div",{className:"min-h-screen bg-gray-50",children:[e.jsx("div",{className:"bg-white shadow-sm sticky top-0 z-50 overflow-x-auto",children:e.jsx("div",{className:"flex gap-1 p-3 min-w-max",children:a.map(o=>e.jsx("button",{onClick:()=>s(o.id),style:{backgroundColor:i===o.id?o.color:void 0},className:`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${i===o.id?"text-white shadow-md":"text-gray-600 hover:bg-gray-100"}`,children:o.label},o.id))})}),e.jsxs("div",{className:"p-4",children:[i==="mleducation"&&e.jsx(Ye,{}),i==="interactive"&&e.jsx(ot,{}),i==="mlguide"&&e.jsx(bt,{}),i==="featureeng"&&e.jsx(yt,{}),i==="decision"&&e.jsx(Ct,{}),i==="linalg"&&e.jsx(kt,{}),i==="pyfile"&&e.jsxs("div",{className:"max-w-6xl mx-auto py-8",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-900 mb-6",children:"Machine Learning — Python Implementation"}),e.jsx(Qe,{content:Ge,filename:"5. Machine Learning.py"})]}),i==="md1"&&e.jsxs("div",{className:"max-w-6xl mx-auto py-8",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-900 mb-6",children:"Intelligent Systems — Chapter Notes"}),e.jsx(ke,{content:He,filename:"7. Intelligent Systems.md"})]}),i==="md2"&&e.jsxs("div",{className:"max-w-6xl mx-auto py-8",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-900 mb-6",children:"Intelligent System — Reference Notes"}),e.jsx(ke,{content:Ke,filename:"8. Intelligent System.md"})]})]})]})}export{Dt as default};
