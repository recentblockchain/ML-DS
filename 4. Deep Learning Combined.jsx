import { useState, useEffect, useRef, useCallback } from 'react';

// ============================================================
// FILE: 14. Deep Learning Architectures
// ============================================================


// ─── Math Utilities ───────────────────────────────────────────────────────────
const sigmoid = x => 1 / (1 + Math.exp(-x));
const tanh = x => Math.tanh(x);
const relu = x => Math.max(0, x);
const softmax = arr => {
  const max = Math.max(...arr);
  const exps = arr.map(x => Math.exp(x - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map(e => e / sum);
};
const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
const fmt = n => typeof n === "number" ? n.toFixed(4) : n;
const fmtArr = arr => arr.map(fmt).join(", ");

// ─── Convolution ──────────────────────────────────────────────────────────────
function convolve2d(input, kernel) {
  const kh = kernel.length, kw = kernel[0].length;
  const oh = input.length - kh + 1, ow = input[0].length - kw + 1;
  const out = Array.from({ length: oh }, () => Array(ow).fill(0));
  for (let i = 0; i < oh; i++)
    for (let j = 0; j < ow; j++)
      for (let ki = 0; ki < kh; ki++)
        for (let kj = 0; kj < kw; kj++)
          out[i][j] += input[i + ki][j + kj] * kernel[ki][kj];
  return out;
}

function maxPool2d(input, size = 2) {
  const oh = Math.floor(input.length / size), ow = Math.floor(input[0].length / size);
  return Array.from({ length: oh }, (_, i) =>
    Array.from({ length: ow }, (_, j) => {
      let m = -Infinity;
      for (let di = 0; di < size; di++)
        for (let dj = 0; dj < size; dj++)
          m = Math.max(m, input[i * size + di][j * size + dj]);
      return m;
    })
  );
}

// ─── Color palette ────────────────────────────────────────────────────────────
const COLORS = {
  lenet:    { main: "#22d3ee", glow: "rgba(34,211,238,0.3)",  bg: "rgba(34,211,238,0.08)" },
  googlenet:{ main: "#fbbf24", glow: "rgba(251,191,36,0.3)",  bg: "rgba(251,191,36,0.08)" },
  vggnet:   { main: "#a78bfa", glow: "rgba(167,139,250,0.3)", bg: "rgba(167,139,250,0.08)" },
  rnn:      { main: "#4ade80", glow: "rgba(74,222,128,0.3)",  bg: "rgba(74,222,128,0.08)" },
  lstm:     { main: "#f472b6", glow: "rgba(244,114,182,0.3)", bg: "rgba(244,114,182,0.08)" },
  gru:      { main: "#fb923c", glow: "rgba(251,146,60,0.3)",  bg: "rgba(251,146,60,0.08)" },
};

const TABS = [
  { id: "lenet",     label: "LeNet",      emoji: "🔭" },
  { id: "googlenet", label: "GoogLeNet",  emoji: "🔬" },
  { id: "vggnet",    label: "VGGNet",     emoji: "🏗️" },
  { id: "rnn",       label: "RNN",        emoji: "🔄" },
  { id: "lstm",      label: "LSTM",       emoji: "🧠" },
  { id: "gru",       label: "GRU",        emoji: "⚡" },
];

// ─── Shared Components ────────────────────────────────────────────────────────
const InfoCard = ({ color, title, children }) => (
  <div style={{
    background: color.bg, border: `1px solid ${color.main}40`,
    borderRadius: 12, padding: "16px 20px", marginBottom: 16,
    boxShadow: `inset 0 0 20px ${color.glow}`
  }}>
    <div style={{ color: color.main, fontFamily: "'Courier New', monospace", fontWeight: 700, fontSize: 13, letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>{title}</div>
    <div style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.7 }}>{children}</div>
  </div>
);

const MathBox = ({ color, children }) => (
  <div style={{
    background: "#0f172a", border: `1px solid ${color.main}60`,
    borderRadius: 8, padding: "12px 16px", fontFamily: "'Courier New', monospace",
    fontSize: 13, color: color.main, margin: "10px 0", lineHeight: 1.8,
    whiteSpace: "pre-wrap"
  }}>{children}</div>
);

const SectionTitle = ({ color, children }) => (
  <h3 style={{
    color: color.main, fontFamily: "'Courier New', monospace", fontSize: 16,
    fontWeight: 700, letterSpacing: 3, textTransform: "uppercase",
    borderBottom: `1px solid ${color.main}40`, paddingBottom: 8, marginBottom: 16,
    textShadow: `0 0 12px ${color.main}`
  }}>{children}</h3>
);

const GridViz = ({ data, color, title, scale = 1, showVals = true }) => {
  const max = Math.max(...data.flat().map(Math.abs)) || 1;
  return (
    <div style={{ textAlign: "center", margin: "0 8px" }}>
      <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 4 }}>{title}</div>
      <div style={{ display: "inline-block", border: `1px solid ${color.main}50`, borderRadius: 4, overflow: "hidden" }}>
        {data.map((row, i) => (
          <div key={i} style={{ display: "flex" }}>
            {row.map((val, j) => {
              const intensity = Math.abs(val) / max;
              const r = val >= 0 ? Math.round(intensity * 34 + (1-intensity)*15) : 15;
              const g = val >= 0 ? Math.round(intensity * 211 + (1-intensity)*23) : 23;
              const b = val >= 0 ? Math.round(intensity * 238 + (1-intensity)*42) : 42;
              const bg = `rgb(${r},${g},${b})`;
              return (
                <div key={j} style={{
                  width: 28 * scale, height: 28 * scale,
                  background: bg, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: 8 * scale, color: intensity > 0.5 ? "#0f172a" : "#94a3b8",
                  border: "1px solid #1e293b"
                }}>
                  {showVals && val.toFixed(1)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// LENET SECTION
// ══════════════════════════════════════════════════════════════════════════════
function LeNetSection() {
  const color = COLORS.lenet;
  const [step, setStep] = useState(0);
  const [learningRate, setLearningRate] = useState(0.1);
  const [trainEpoch, setTrainEpoch] = useState(0);
  const [weights, setWeights] = useState([0.5, -0.3, 0.8, -0.6, 0.2, -0.4, 0.7, 0.1, -0.5]);
  const [loss, setLoss] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [training, setTraining] = useState(false);

  // 5x5 sample digit "1" pattern
  const inputImage = [
    [0,0,1,0,0],
    [0,1,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,1,0],
  ];

  const kernel1 = [[weights[0],weights[1],weights[2]],[weights[3],weights[4],weights[5]],[weights[6],weights[7],weights[8]]];
  const conv1 = convolve2d(inputImage, kernel1).map(r => r.map(relu));
  const pool1 = maxPool2d(conv1, 2);

  const fcInput = pool1.flat();
  const fcWeight = [0.4, -0.2, 0.6, -0.3];
  const fcBias = 0.1;
  const fcOut = sigmoid(dot(fcInput.slice(0,4), fcWeight) + fcBias);
  const target = 1.0; // it IS a "1"
  const currentLoss = 0.5 * Math.pow(target - fcOut, 2);

  const steps = [
    { title: "Input Image (5×5)", desc: "A 5×5 grayscale image representing the digit '1'. Each cell holds a value 0 (black) or 1 (white). This is the raw pixel data fed into LeNet." },
    { title: "Conv Layer 1 (3×3 kernel)", desc: "A 3×3 filter (kernel) slides across the image. At each position, it multiplies its values with the overlapping pixels and sums them. This detects local patterns like edges. ReLU activation zeros out negatives." },
    { title: "Max Pooling (2×2)", desc: "We take the maximum value in each 2×2 region. This shrinks the feature map by half, keeping the strongest signals and discarding small position differences — making the network robust to slight shifts." },
    { title: "Fully Connected + Output", desc: "The flattened pooled values multiply with learned weights and add a bias. Sigmoid activation squashes the result to [0,1]. We interpret this as the probability it's a '1'." },
    { title: "Loss & Error Backpropagation", desc: "We compute Mean Squared Error. The error flows backward, computing how much each weight contributed. Gradient descent subtracts (learning_rate × gradient) from each weight — nudging them toward lower loss." },
  ];

  const trainStep = () => {
    setTraining(true);
    setTimeout(() => {
      const grad = -(target - fcOut) * fcOut * (1 - fcOut);
      setWeights(w => w.map((wi, i) => {
        const perturbation = (Math.random() - 0.5) * 0.05;
        return wi - learningRate * grad * (0.1 + perturbation);
      }));
      setTrainEpoch(e => e + 1);
      setLoss(currentLoss);
      setPrediction(fcOut);
      setTraining(false);
    }, 300);
  };

  return (
    <div>
      <InfoCard color={color} title="What is LeNet?">
        LeNet (1998, Yann LeCun) is the <strong style={{color:color.main}}>original Convolutional Neural Network</strong> designed to read handwritten digits (0–9). It introduced the concept of learning spatial features directly from pixels — no manual feature engineering needed. It powers systems like zip-code readers and bank check readers.
      </InfoCard>
      <InfoCard color={color} title="Why do we use it?">
        Before LeNet, engineers had to manually craft features (like "look for diagonal lines"). LeNet learns these features automatically from data. Its <strong style={{color:color.main}}>convolution layers detect edges → shapes → objects</strong> in a hierarchy, using far fewer parameters than a plain network would need.
      </InfoCard>
      <InfoCard color={color} title="Architecture: Input → Conv1 → Pool1 → Conv2 → Pool2 → FC1 → FC2 → Output">
        Original LeNet used 32×32 inputs, two conv-pool pairs, then fully connected layers. Our demo simplifies to 5×5 for clarity, showing the exact same principles.
      </InfoCard>

      <SectionTitle color={color}>🔬 Step-by-Step Interactive Walkthrough</SectionTitle>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {steps.map((s, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            padding: "6px 14px", borderRadius: 20, border: `1px solid ${color.main}`,
            background: step === i ? color.main : "transparent",
            color: step === i ? "#0f172a" : color.main,
            fontFamily: "'Courier New', monospace", fontSize: 12, cursor: "pointer",
            fontWeight: step === i ? 700 : 400
          }}>Step {i+1}</button>
        ))}
      </div>

      <div style={{ background: "#0f172a", borderRadius: 12, padding: 20, marginBottom: 16, border: `1px solid ${color.main}30` }}>
        <div style={{ color: color.main, fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{steps[step].title}</div>
        <div style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>{steps[step].desc}</div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-start", justifyContent: "center" }}>
          {step === 0 && <GridViz data={inputImage} color={color} title="5×5 Input" scale={1.4} />}
          {step === 1 && <>
            <GridViz data={inputImage} color={color} title="Input (5×5)" />
            <div style={{ color: color.main, fontSize: 24, alignSelf: "center" }}>⊛</div>
            <GridViz data={kernel1} color={color} title="Kernel (3×3)" />
            <div style={{ color: color.main, fontSize: 24, alignSelf: "center" }}>→</div>
            <GridViz data={conv1} color={color} title="After Conv+ReLU (3×3)" />
          </>}
          {step === 2 && <>
            <GridViz data={conv1} color={color} title="Before Pooling (3×3)" />
            <div style={{ color: color.main, fontSize: 24, alignSelf: "center" }}>→ MaxPool →</div>
            <GridViz data={pool1} color={color} title="After Pooling (1×1)" scale={2} />
          </>}
          {step === 3 && (
            <div style={{ width: "100%" }}>
              <MathBox color={color}>
{`Flattened pool values: [${fcInput.slice(0,4).map(f=>f.toFixed(3)).join(", ")}]
FC Weights: [${fcWeight.join(", ")}]
FC Bias:    ${fcBias}

Net input = Σ(input_i × weight_i) + bias
          = ${fcInput.slice(0,4).map((v,i)=>`${v.toFixed(2)}×${fcWeight[i]}`).join(" + ")} + ${fcBias}
          = ${(dot(fcInput.slice(0,4), fcWeight)+fcBias).toFixed(4)}

Output = sigmoid(net) = ${fcOut.toFixed(4)}
→ Probability of being "1": ${(fcOut*100).toFixed(1)}%`}
              </MathBox>
            </div>
          )}
          {step === 4 && (
            <div style={{ width: "100%" }}>
              <MathBox color={color}>
{`Target (true label): ${target}
Prediction:          ${fcOut.toFixed(4)}
Error:               ${(target - fcOut).toFixed(4)}

Loss (MSE) = 0.5 × (target - prediction)²
           = 0.5 × (${target} - ${fcOut.toFixed(4)})²
           = ${currentLoss.toFixed(6)}

∂Loss/∂output = -(target - prediction) = ${(-(target-fcOut)).toFixed(4)}
∂output/∂net  = sigmoid'(net) = output×(1-output)
              = ${fcOut.toFixed(4)} × ${(1-fcOut).toFixed(4)} = ${(fcOut*(1-fcOut)).toFixed(4)}

δ (delta) = ∂Loss/∂output × ∂output/∂net = ${(-(target-fcOut)*fcOut*(1-fcOut)).toFixed(4)}

Weight update rule:
  new_weight = old_weight − (learning_rate × δ × input)
  new_bias   = old_bias   − (learning_rate × δ)

With lr = ${learningRate}:
  new_bias = ${fcBias} − ${learningRate} × ${(-(target-fcOut)*fcOut*(1-fcOut)).toFixed(4)}
           = ${(fcBias - learningRate*(-(target-fcOut)*fcOut*(1-fcOut))).toFixed(4)}`}
              </MathBox>
            </div>
          )}
        </div>
      </div>

      <SectionTitle color={color}>🏋️ Live Training Simulator</SectionTitle>
      <div style={{ background: "#0f172a", borderRadius: 12, padding: 20, border: `1px solid ${color.main}30` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
          <label style={{ color: "#94a3b8", fontSize: 13 }}>
            Learning Rate: <strong style={{ color: color.main }}>{learningRate}</strong>
            <input type="range" min="0.001" max="0.5" step="0.001" value={learningRate}
              onChange={e => setLearningRate(+e.target.value)}
              style={{ marginLeft: 8, accentColor: color.main, width: 120 }} />
          </label>
          <button onClick={trainStep} disabled={training} style={{
            padding: "8px 20px", borderRadius: 8, border: "none",
            background: color.main, color: "#0f172a", fontWeight: 700,
            fontFamily: "'Courier New', monospace", fontSize: 13, cursor: "pointer"
          }}>{training ? "Training..." : "▶ Train 1 Step"}</button>
          <button onClick={() => { setWeights([0.5,-0.3,0.8,-0.6,0.2,-0.4,0.7,0.1,-0.5]); setTrainEpoch(0); setLoss(null); setPrediction(null); }} style={{
            padding: "8px 16px", borderRadius: 8, border: `1px solid ${color.main}`,
            background: "transparent", color: color.main, fontFamily: "'Courier New', monospace",
            fontSize: 13, cursor: "pointer"
          }}>↺ Reset</button>
        </div>
        {(loss !== null) && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[["Epoch", trainEpoch],["Loss (MSE)", fmt(loss)],["Prediction", fmt(prediction)]].map(([k,v]) => (
              <div key={k} style={{ background: color.bg, borderRadius: 8, padding: 12, textAlign: "center" }}>
                <div style={{ color: "#64748b", fontSize: 11, marginBottom: 4 }}>{k}</div>
                <div style={{ color: color.main, fontSize: 20, fontFamily: "'Courier New', monospace", fontWeight: 700 }}>{v}</div>
              </div>
            ))}
          </div>
        )}
        <div style={{ color: "#64748b", fontSize: 12, marginTop: 12 }}>
          💡 <strong>What to observe:</strong> As you train, watch the Loss decrease and Prediction approach 1.0 (correct answer). A high learning rate trains fast but may overshoot and become unstable. A low learning rate is stable but slow.
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// GOOGLENET SECTION
// ══════════════════════════════════════════════════════════════════════════════
function GoogLeNetSection() {
  const color = COLORS.googlenet;
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [inputVal, setInputVal] = useState(0.7);
  const [step, setStep] = useState(0);

  // Simulated Inception module computation
  const branches = [
    { label: "1×1 Conv", kernel: "1×1", filters: 64, desc: "Reduces channels cheaply. Acts as a learned linear combination of input channels. No spatial analysis — just channel mixing.", out: sigmoid(inputVal * 0.6 - 0.1) },
    { label: "1×1 → 3×3 Conv", kernel: "3×3", filters: 128, desc: "First 1×1 reduces channel depth (bottleneck). Then 3×3 learns medium spatial patterns (edges, textures). Efficient and powerful.", out: relu(inputVal * 0.8 + 0.05) },
    { label: "1×1 → 5×5 Conv", kernel: "5×5", filters: 32, desc: "First 1×1 compresses. Then 5×5 captures larger spatial context (broader shapes, larger textures). Fewer parameters because of the bottleneck.", out: tanh(inputVal * 0.5 - 0.2) },
    { label: "3×3 Pool → 1×1", kernel: "pool", filters: 32, desc: "MaxPool captures the strongest local features. Then 1×1 conv reduces dimensions. Adds spatial invariance to the module.", out: relu(inputVal * 0.4 + 0.1) },
  ];
  const concat = branches.map(b => b.out.toFixed(3)).join(" | ");

  const architectureSteps = [
    { title: "Stem", desc: "7×7 Conv → MaxPool → 1×1 Conv → 3×3 Conv → MaxPool. Rapidly reduces 224×224 image to 28×28 feature maps." },
    { title: "Inception Block ×2", desc: "Two inception modules with 4 parallel branches each, concatenated at depth dimension." },
    { title: "MaxPool + Inception ×5", desc: "Spatial downsampling followed by five more inception blocks. Depth grows while spatial size shrinks." },
    { title: "Inception ×2 + AvgPool", desc: "Final two inception modules. Global Average Pooling replaces fully connected layers — averages each feature map to a single number. Massive parameter reduction." },
    { title: "Dropout + Softmax", desc: "Dropout randomly zeroes activations during training (regularization). Final 1000-class softmax for ImageNet classification." },
  ];

  return (
    <div>
      <InfoCard color={color} title="What is GoogLeNet (Inception)?">
        GoogLeNet (2014, Google Brain) won ImageNet with a radical idea: instead of choosing one convolution size, use <strong style={{color:color.main}}>all of them simultaneously</strong> in parallel "Inception modules." It has 22 layers but uses <strong style={{color:color.main}}>12× fewer parameters</strong> than AlexNet through aggressive bottleneck design.
      </InfoCard>
      <InfoCard color={color} title="Why do we use it?">
        Different features live at different scales — some patterns are small (texture), others are large (object shape). Processing multiple scales in parallel captures all of them. The 1×1 bottleneck convolutions dramatically reduce computation before expensive 3×3 and 5×5 convolutions.
      </InfoCard>

      <SectionTitle color={color}>🔬 Inception Module — Live Demo</SectionTitle>
      <div style={{ background: "#0f172a", borderRadius: 12, padding: 20, marginBottom: 16, border: `1px solid ${color.main}30` }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ color: "#94a3b8", fontSize: 13 }}>
            Input activation value: <strong style={{ color: color.main }}>{inputVal.toFixed(2)}</strong>
            <input type="range" min="0" max="1" step="0.01" value={inputVal}
              onChange={e => setInputVal(+e.target.value)}
              style={{ marginLeft: 12, accentColor: color.main, width: 160 }} />
          </label>
        </div>

        {/* Inception module visual */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ color: "#64748b", fontSize: 12, marginBottom: 8 }}>Previous Layer Output</div>
          <div style={{ background: color.bg, border: `2px solid ${color.main}`, borderRadius: 8, padding: "8px 24px", display: "inline-block", color: color.main, fontWeight: 700, fontSize: 14, marginBottom: 16 }}>
            Input: {inputVal.toFixed(2)}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
            {branches.map((b, i) => (
              <div key={i} onClick={() => setSelectedBranch(selectedBranch === i ? null : i)}
                style={{
                  background: selectedBranch === i ? color.bg : "#1e293b",
                  border: `2px solid ${selectedBranch === i ? color.main : color.main+"40"}`,
                  borderRadius: 10, padding: "12px 16px", cursor: "pointer",
                  minWidth: 140, textAlign: "center",
                  transition: "all 0.2s",
                  boxShadow: selectedBranch === i ? `0 0 16px ${color.glow}` : "none"
                }}>
                <div style={{ color: color.main, fontWeight: 700, fontSize: 13 }}>{b.label}</div>
                <div style={{ color: "#64748b", fontSize: 11 }}>{b.filters} filters</div>
                <div style={{ color: "#e2e8f0", fontSize: 14, marginTop: 6, fontFamily: "'Courier New', monospace" }}>→ {b.out.toFixed(3)}</div>
              </div>
            ))}
          </div>
          <div style={{ color: "#64748b", fontSize: 12, marginBottom: 8 }}>Concatenated along depth dimension →</div>
          <div style={{ background: color.bg, border: `2px solid ${color.main}60`, borderRadius: 8, padding: "8px 16px", display: "inline-block", color: color.main, fontFamily: "'Courier New', monospace", fontSize: 13 }}>
            [{concat}]  (256 channels total)
          </div>
        </div>

        {selectedBranch !== null && (
          <div style={{ background: "#0f172a", border: `1px solid ${color.main}50`, borderRadius: 10, padding: 16 }}>
            <div style={{ color: color.main, fontWeight: 700, marginBottom: 8 }}>{branches[selectedBranch].label}</div>
            <div style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>{branches[selectedBranch].desc}</div>
            <MathBox color={color}>
{`Branch input: ${inputVal.toFixed(3)}
Kernel size:  ${branches[selectedBranch].kernel}
Filters:      ${branches[selectedBranch].filters}
Activation:   ${["sigmoid","relu","tanh","relu"][selectedBranch]}
Output:       ${branches[selectedBranch].out.toFixed(4)}`}
            </MathBox>
          </div>
        )}
      </div>

      <SectionTitle color={color}>🏛️ Full Architecture (22 Layers)</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {architectureSteps.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#0f172a", borderRadius: 10, padding: 14, border: `1px solid ${color.main}20` }}>
            <div style={{ background: color.bg, border: `1px solid ${color.main}`, borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", color: color.main, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{i+1}</div>
            <div>
              <div style={{ color: color.main, fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{s.title}</div>
              <div style={{ color: "#94a3b8", fontSize: 12, lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <InfoCard color={color} title="Error Handling & Weight Update">
        GoogLeNet uses <strong style={{color:color.main}}>auxiliary classifiers</strong> at intermediate layers during training — a unique error handling technique. If the main output is wrong, gradients also flow from these intermediate checkpoints, preventing the vanishing gradient problem in the deep network. Weight update: <code style={{color:color.main}}>w ← w − α·∇L</code> where ∇L includes gradients from all three loss points (two auxiliary + final).
      </InfoCard>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// VGGNET SECTION
// ══════════════════════════════════════════════════════════════════════════════
function VGGNetSection() {
  const color = COLORS.vggnet;
  const [depth, setDepth] = useState(3);
  const [inputPixel, setInputPixel] = useState(0.6);
  const [showMath, setShowMath] = useState(false);

  const layers = [
    { name: "Input", size: "224×224×3", desc: "RGB image: 224 rows, 224 columns, 3 color channels" },
    { name: "Conv Block 1 (×2)", size: "224×224×64", desc: "Two 3×3 convolutions. 64 filters each. Detect basic edges and colors." },
    { name: "MaxPool", size: "112×112×64", desc: "Halve spatial dimensions. Retain strongest edge responses." },
    { name: "Conv Block 2 (×2)", size: "112×112×128", desc: "Two 3×3 convolutions. 128 filters. Detect corners, simple textures." },
    { name: "MaxPool", size: "56×56×128", desc: "Spatial halving again." },
    { name: "Conv Block 3 (×3)", size: "56×56×256", desc: "Three 3×3 convolutions. 256 filters. Detect complex textures and patterns." },
    { name: "MaxPool", size: "28×28×256", desc: "Spatial halving." },
    { name: "Conv Block 4 (×3)", size: "28×28×512", desc: "Three 3×3 convolutions. 512 filters. Detect parts of objects (wheels, eyes, etc.)." },
    { name: "MaxPool", size: "14×14×512", desc: "Spatial halving." },
    { name: "Conv Block 5 (×3)", size: "14×14×512", desc: "Three more 3×3 convolutions. 512 filters. High-level semantic features." },
    { name: "MaxPool", size: "7×7×512", desc: "Final spatial reduction." },
    { name: "FC-4096", size: "4096", desc: "Fully connected. 4096 neurons. Combines all spatial features." },
    { name: "FC-4096", size: "4096", desc: "Second fully connected layer. Refines combination." },
    { name: "FC-1000 + Softmax", size: "1000", desc: "Output probabilities for 1000 ImageNet classes." },
  ];

  // Simulate stacked 3x3 = effective receptive field
  const stackedConvSim = () => {
    let val = inputPixel;
    const trace = [`Input: ${val.toFixed(3)}`];
    for (let i = 0; i < depth; i++) {
      const w = [0.4, 0.3, -0.2, 0.5, 0.6, -0.1, 0.2, 0.4, 0.3][i % 9];
      const b = [0.05, -0.02, 0.03][i % 3];
      val = relu(val * w * 3 + b);
      trace.push(`Conv ${i+1}: relu(${(val/(relu(val*w*3+b)||1)).toFixed(2)}×${w}×3 + ${b}) = ${val.toFixed(4)}`);
    }
    return trace;
  };

  const trace = stackedConvSim();

  return (
    <div>
      <InfoCard color={color} title="What is VGGNet?">
        VGGNet (2014, Oxford Visual Geometry Group) proved that <strong style={{color:color.main}}>depth matters above all else</strong>. It uses only 3×3 convolution filters stacked repeatedly — up to 19 layers deep. Its brutal simplicity made it one of the most studied architectures in deep learning history.
      </InfoCard>
      <InfoCard color={color} title="Why only 3×3 kernels?">
        Two stacked 3×3 convolutions cover the same receptive field as one 5×5 convolution, but with <strong style={{color:color.main}}>fewer parameters and more non-linearity</strong>. Three 3×3 convolutions ≡ one 7×7 convolution, using only 3×(9C²) vs. 49C² parameters. More activations = richer representations.
      </InfoCard>

      <SectionTitle color={color}>📐 Depth vs. Receptive Field Simulator</SectionTitle>
      <div style={{ background: "#0f172a", borderRadius: 12, padding: 20, marginBottom: 16, border: `1px solid ${color.main}30` }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
          <label style={{ color: "#94a3b8", fontSize: 13 }}>
            Stacked Conv Layers: <strong style={{ color: color.main }}>{depth}</strong>
            <input type="range" min={1} max={9} step={1} value={depth}
              onChange={e => setDepth(+e.target.value)}
              style={{ marginLeft: 8, accentColor: color.main, width: 120 }} />
          </label>
          <label style={{ color: "#94a3b8", fontSize: 13 }}>
            Input value: <strong style={{ color: color.main }}>{inputPixel.toFixed(2)}</strong>
            <input type="range" min={0} max={1} step={0.01} value={inputPixel}
              onChange={e => setInputPixel(+e.target.value)}
              style={{ marginLeft: 8, accentColor: color.main, width: 120 }} />
          </label>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 16 }}>
          {Array.from({ length: depth }, (_, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                background: `rgba(167,139,250,${0.2 + i * 0.08})`,
                border: `2px solid ${color.main}`,
                borderRadius: 8, padding: "12px 10px",
                color: color.main, fontFamily: "'Courier New', monospace",
                fontSize: 11, minWidth: 70
              }}>
                Conv {i+1}<br />3×3<br />
                <span style={{ color: "#e2e8f0" }}>RF: {i*2+3}×{i*2+3}</span>
              </div>
              {i < depth-1 && <div style={{ color: color.main, fontSize: 18, textAlign: "center" }}>→</div>}
            </div>
          ))}
        </div>

        <div style={{ color: "#64748b", fontSize: 12, marginBottom: 10 }}>
          Effective receptive field: <span style={{ color: color.main, fontWeight: 700 }}>{depth*2+1}×{depth*2+1} pixels</span> — covered by just {depth} stacked 3×3 convolutions
        </div>

        <button onClick={() => setShowMath(!showMath)} style={{
          padding: "6px 14px", borderRadius: 8, border: `1px solid ${color.main}`,
          background: "transparent", color: color.main, fontFamily: "'Courier New', monospace",
          fontSize: 12, cursor: "pointer", marginBottom: showMath ? 12 : 0
        }}>
          {showMath ? "▼ Hide" : "▶ Show"} Activation Trace
        </button>

        {showMath && (
          <MathBox color={color}>{trace.join("\n")}</MathBox>
        )}
      </div>

      <SectionTitle color={color}>🏛️ VGG-16 Full Architecture</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {layers.map((l, i) => {
          const isPool = l.name.includes("Pool");
          const isFC = l.name.includes("FC") || l.name.includes("Softmax");
          const bg = isPool ? "rgba(100,116,139,0.1)" : isFC ? color.bg : "#0f172a";
          const border = isPool ? "#475569" : isFC ? color.main : `${color.main}30`;
          return (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", background: bg, borderRadius: 8, padding: "10px 14px", border: `1px solid ${border}` }}>
              <div style={{ color: isPool ? "#94a3b8" : color.main, fontFamily: "'Courier New', monospace", fontSize: 11, minWidth: 160 }}>{l.name}</div>
              <div style={{ color: "#475569", fontFamily: "'Courier New', monospace", fontSize: 11, minWidth: 100 }}>{l.size}</div>
              <div style={{ color: "#64748b", fontSize: 11 }}>{l.desc}</div>
            </div>
          );
        })}
      </div>

      <InfoCard color={color} title="Weight & Bias Details + Error Handling">
        VGG has <strong style={{color:color.main}}>138 million parameters</strong> — mostly in FC layers. Training uses SGD with momentum (0.9) and weight decay (5×10⁻⁴). Error flows backward through all layers via chain rule. If gradients become tiny (vanishing gradient), we detect this by monitoring ‖∇L‖. Weight update: <code style={{color:color.main}}>v ← 0.9v − lr·∇L, w ← w + v</code> (momentum prevents oscillation and speeds convergence).
      </InfoCard>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// RNN SECTION
// ══════════════════════════════════════════════════════════════════════════════
function RNNSection() {
  const color = COLORS.rnn;
  const [step, setStep] = useState(0);
  const [sequence, setSequence] = useState([1, 2, 3, 4, 5]);
  const [learningRate, setLearningRate] = useState(0.05);
  const [trainedWeights, setTrainedWeights] = useState({ Wx: 0.5, Wh: 0.3, b: 0.1, Wy: 0.8, by: 0.05 });
  const [trainLog, setTrainLog] = useState([]);

  // Forward pass
  const W = trainedWeights;
  const hiddenSize = 1;
  let h = 0;
  const states = [];
  const outputs = [];
  for (let t = 0; t < sequence.length; t++) {
    const x = sequence[t] / 10.0; // normalize
    const hNew = tanh(W.Wx * x + W.Wh * h + W.b);
    const y = W.Wy * hNew + W.by;
    states.push({ t, x, h, hNew, y });
    h = hNew;
    outputs.push(y);
  }

  // Target: predict next in sequence (shifted by 1)
  const targets = sequence.slice(1).map(v => v / 10.0);
  const predictions = outputs.slice(0, -1);
  const loss = predictions.reduce((s, p, i) => s + 0.5 * Math.pow(targets[i] - p, 2), 0);

  const trainStep = () => {
    const lr = learningRate;
    const newW = { ...trainedWeights };
    let grad_Wy = 0, grad_by = 0;
    for (let t = 0; t < predictions.length; t++) {
      const err = predictions[t] - targets[t];
      grad_Wy += err * states[t].hNew;
      grad_by += err;
    }
    newW.Wy -= lr * grad_Wy;
    newW.by -= lr * grad_by;
    newW.Wx += (Math.random() - 0.5) * lr * 0.1;
    newW.Wh += (Math.random() - 0.5) * lr * 0.1;
    setTrainedWeights(newW);
    setTrainLog(l => [...l.slice(-4), `Loss: ${loss.toFixed(4)}, Wy: ${newW.Wy.toFixed(3)}, by: ${newW.by.toFixed(3)}`]);
  };

  const stepsDesc = [
    { title: "Input Encoding", desc: "Each item in the sequence is fed one at a time. We normalize: divide each number by 10 to keep values in a manageable range for tanh activation." },
    { title: "Hidden State Computation", desc: "h_t = tanh(Wx·x_t + Wh·h_{t-1} + b). The hidden state carries memory from all previous time steps. tanh squashes values to [-1, 1], preventing explosive growth." },
    { title: "Output Computation", desc: "y_t = Wy·h_t + by. We compute a prediction at each step — here, predicting the next number in the sequence." },
    { title: "BPTT — Backpropagation Through Time", desc: "Errors from all time steps are summed. Gradients flow backward through each time step. This is expensive: gradients must travel through the full sequence." },
    { title: "Vanishing Gradient Problem", desc: "In long sequences, gradients are multiplied by Wh at each step. If |Wh| < 1, gradients shrink exponentially → early time steps learn nothing. This is why LSTM and GRU were invented." },
  ];

  return (
    <div>
      <InfoCard color={color} title="What is an RNN?">
        A Recurrent Neural Network processes <strong style={{color:color.main}}>sequential data</strong> — text, audio, time series — by maintaining a <strong style={{color:color.main}}>hidden state</strong> that acts as memory. At each step, it reads the current input AND its own previous output, allowing it to understand context across time.
      </InfoCard>
      <InfoCard color={color} title="Why do we use it?">
        Regular neural networks treat all inputs independently. But in a sentence, the word "bank" means different things depending on whether "river" appeared earlier. RNNs remember past context. They power language translation, speech recognition, and financial forecasting.
      </InfoCard>

      <SectionTitle color={color}>⏱ Unrolled RNN — Sequence Walkthrough</SectionTitle>
      <div style={{ background: "#0f172a", borderRadius: 12, padding: 20, marginBottom: 16, border: `1px solid ${color.main}30` }}>
        {/* Visual unrolled RNN */}
        <div style={{ overflowX: "auto", paddingBottom: 8 }}>
          <div style={{ display: "flex", gap: 0, alignItems: "center", minWidth: 600 }}>
            {states.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ textAlign: "center", minWidth: 100 }}>
                  <div style={{ color: "#64748b", fontSize: 11, marginBottom: 4 }}>t={s.t}</div>
                  <div style={{ background: "#1e293b", border: `1px solid ${color.main}40`, borderRadius: 4, padding: "2px 6px", color: "#94a3b8", fontSize: 11, marginBottom: 6 }}>x={s.x.toFixed(2)}</div>
                  <div style={{
                    background: color.bg, border: `2px solid ${color.main}`,
                    borderRadius: 10, padding: "12px 8px", margin: "4px 0",
                    color: color.main, fontFamily: "'Courier New', monospace", fontSize: 11
                  }}>
                    RNN<br />
                    <span style={{ color: "#e2e8f0", fontSize: 10 }}>h={s.hNew.toFixed(2)}</span>
                  </div>
                  <div style={{ color: "#64748b", fontSize: 10, marginTop: 4 }}>y={s.y.toFixed(2)}</div>
                </div>
                {i < states.length-1 && (
                  <div style={{ color: color.main, fontSize: 14, padding: "0 4px", marginTop: -16 }}>—→</div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div style={{ color: "#64748b", fontSize: 11, marginTop: 8 }}>Arrow represents hidden state h flowing forward through time steps</div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        {stepsDesc.map((s, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            padding: "5px 12px", borderRadius: 20, border: `1px solid ${color.main}`,
            background: step === i ? color.main : "transparent",
            color: step === i ? "#0f172a" : color.main,
            fontFamily: "'Courier New', monospace", fontSize: 11, cursor: "pointer",
          }}>Step {i+1}</button>
        ))}
      </div>

      <div style={{ background: "#0f172a", borderRadius: 12, padding: 20, marginBottom: 16, border: `1px solid ${color.main}30` }}>
        <div style={{ color: color.main, fontWeight: 700, marginBottom: 8 }}>{stepsDesc[step].title}</div>
        <div style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.7, marginBottom: 12 }}>{stepsDesc[step].desc}</div>
        {step === 1 && (
          <MathBox color={color}>
{`h_t = tanh(Wx·x_t + Wh·h_{t-1} + b)

At t=1:
  h_1 = tanh(${W.Wx.toFixed(3)} × ${states[1]?.x.toFixed(3) || "—"} + ${W.Wh.toFixed(3)} × ${states[0]?.hNew.toFixed(3) || "—"} + ${W.b.toFixed(3)})
      = tanh(${((W.Wx*(states[1]?.x||0)) + W.Wh*(states[0]?.hNew||0) + W.b).toFixed(4)})
      = ${states[1]?.hNew.toFixed(4) || "—"}

Weights: Wx=${W.Wx.toFixed(3)}, Wh=${W.Wh.toFixed(3)}, b=${W.b.toFixed(3)}`}
          </MathBox>
        )}
        {step === 3 && (
          <MathBox color={color}>
{`Loss = Σ 0.5×(target_t - y_t)²
     = ${loss.toFixed(6)}

Gradient of Wy:
  ∂L/∂Wy = Σ (y_t - target_t) × h_t
          = ${predictions.map((p, i) => `(${p.toFixed(2)}-${targets[i].toFixed(2)})`).join(" + ")}...

Weight update:
  Wy_new = Wy_old − lr × ∂L/∂Wy
         = ${W.Wy.toFixed(3)} − ${learningRate} × (...)`}
          </MathBox>
        )}
        {step === 4 && (
          <MathBox color={color}>
{`After T steps of BPTT, gradient of early step:
  ∂L/∂h_0 ∝ (Wh)^T × (other terms)

If Wh = 0.3 and T = 10:
  0.3^10 = ${Math.pow(0.3, 10).toFixed(8)}  ← near zero!

If Wh = 1.5 and T = 10:
  1.5^10 = ${Math.pow(1.5, 10).toFixed(2)}  ← exploding!

Solutions:
  • Gradient clipping: if ‖∇‖ > threshold, scale down
  • Use LSTM/GRU (learn what to remember/forget)
  • Shorter sequences / truncated BPTT`}
          </MathBox>
        )}
      </div>

      <SectionTitle color={color}>🏋️ Training Simulator</SectionTitle>
      <div style={{ background: "#0f172a", borderRadius: 12, padding: 20, border: `1px solid ${color.main}30` }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
          <label style={{ color: "#94a3b8", fontSize: 13 }}>
            Learning rate: <strong style={{ color: color.main }}>{learningRate}</strong>
            <input type="range" min="0.001" max="0.2" step="0.001" value={learningRate}
              onChange={e => setLearningRate(+e.target.value)}
              style={{ marginLeft: 8, accentColor: color.main, width: 120 }} />
          </label>
          <button onClick={trainStep} style={{
            padding: "8px 20px", borderRadius: 8, border: "none",
            background: color.main, color: "#0f172a", fontWeight: 700,
            fontFamily: "'Courier New', monospace", fontSize: 13, cursor: "pointer"
          }}>▶ Train Step</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
          {[["Current Loss", loss.toFixed(4)],["Wy", W.Wy.toFixed(4)],["Wh", W.Wh.toFixed(4)]].map(([k,v]) => (
            <div key={k} style={{ background: color.bg, borderRadius: 8, padding: 10, textAlign: "center" }}>
              <div style={{ color: "#64748b", fontSize: 10, marginBottom: 3 }}>{k}</div>
              <div style={{ color: color.main, fontSize: 16, fontFamily: "'Courier New', monospace", fontWeight: 700 }}>{v}</div>
            </div>
          ))}
        </div>
        {trainLog.length > 0 && (
          <div style={{ background: "#020617", borderRadius: 8, padding: 10, fontFamily: "'Courier New', monospace", fontSize: 11, color: "#4ade80" }}>
            {trainLog.map((l, i) => <div key={i}>{l}</div>)}
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// LSTM SECTION
// ══════════════════════════════════════════════════════════════════════════════
function LSTMSection() {
  const color = COLORS.lstm;
  const [x, setX] = useState(0.8);
  const [h_prev, setH_prev] = useState(0.3);
  const [c_prev, setC_prev] = useState(0.5);
  const [step, setStep] = useState(0);
  const [showSequence, setShowSequence] = useState(false);

  // LSTM weights (simplified: single unit)
  const Wf = { x: 0.4, h: -0.3, b: 0.1 };
  const Wi = { x: 0.5, h: 0.2,  b: -0.1 };
  const Wo = { x: 0.3, h: 0.4,  b: 0.2 };
  const Wg = { x: 0.6, h: -0.2, b: 0.0 };

  const f_gate = sigmoid(Wf.x * x + Wf.h * h_prev + Wf.b);
  const i_gate = sigmoid(Wi.x * x + Wi.h * h_prev + Wi.b);
  const o_gate = sigmoid(Wo.x * x + Wo.h * h_prev + Wo.b);
  const g_gate = tanh(Wg.x * x + Wg.h * h_prev + Wg.b);
  const c_new = f_gate * c_prev + i_gate * g_gate;
  const h_new = o_gate * tanh(c_new);

  const gateSteps = [
    {
      id: "forget", label: "Forget Gate", symbol: "f", color: "#ef4444", gate: f_gate,
      formula: `f = σ(Wf_x·x + Wf_h·h_prev + bf)`,
      calc: `  = σ(${Wf.x}×${x} + ${Wf.h}×${h_prev} + ${Wf.b})`,
      result: `  = σ(${(Wf.x*x + Wf.h*h_prev + Wf.b).toFixed(4)}) = ${f_gate.toFixed(4)}`,
      desc: `Controls what to ERASE from cell state. f≈0 → forget everything; f≈1 → keep everything. Value ${f_gate.toFixed(3)} means we keep ${(f_gate*100).toFixed(0)}% of old memory.`
    },
    {
      id: "input", label: "Input Gate", symbol: "i", color: "#22d3ee", gate: i_gate,
      formula: `i = σ(Wi_x·x + Wi_h·h_prev + bi)`,
      calc: `  = σ(${Wi.x}×${x} + ${Wi.h}×${h_prev} + ${Wi.b})`,
      result: `  = σ(${(Wi.x*x + Wi.h*h_prev + Wi.b).toFixed(4)}) = ${i_gate.toFixed(4)}`,
      desc: `Controls how much NEW information to write. Works with the candidate gate (g) to decide what new information to store.`
    },
    {
      id: "candidate", label: "Candidate Gate", symbol: "g", color: "#a78bfa", gate: g_gate,
      formula: `g = tanh(Wg_x·x + Wg_h·h_prev + bg)`,
      calc: `  = tanh(${Wg.x}×${x} + ${Wg.h}×${h_prev} + ${Wg.b})`,
      result: `  = tanh(${(Wg.x*x + Wg.h*h_prev + Wg.b).toFixed(4)}) = ${g_gate.toFixed(4)}`,
      desc: `The proposed new content (in range [-1,1]). The input gate then scales this: only i×g actually gets written to memory.`
    },
    {
      id: "cellupdate", label: "Cell State Update", symbol: "c", color: "#fbbf24", gate: c_new,
      formula: `c_new = f × c_prev + i × g`,
      calc: `       = ${f_gate.toFixed(3)} × ${c_prev} + ${i_gate.toFixed(3)} × ${g_gate.toFixed(3)}`,
      result: `       = ${(f_gate*c_prev).toFixed(4)} + ${(i_gate*g_gate).toFixed(4)} = ${c_new.toFixed(4)}`,
      desc: `The long-term memory (cell state) is updated. We forget the old (×f) and write new info (i×g). This is the LSTM's key contribution — an uninterrupted gradient highway.`
    },
    {
      id: "output", label: "Output Gate", symbol: "o", color: "#4ade80", gate: o_gate,
      formula: `o = σ(Wo_x·x + Wo_h·h_prev + bo)`,
      calc: `  = σ(${Wo.x}×${x} + ${Wo.h}×${h_prev} + ${Wo.b})`,
      result: `  = σ(${(Wo.x*x + Wo.h*h_prev + Wo.b).toFixed(4)}) = ${o_gate.toFixed(4)}`,
      desc: `Controls what part of the updated cell state to expose as output (h_new). Filters the memory before passing it forward.`
    },
    {
      id: "hidden", label: "New Hidden State", symbol: "h", color: color.main, gate: h_new,
      formula: `h_new = o × tanh(c_new)`,
      calc: `       = ${o_gate.toFixed(3)} × tanh(${c_new.toFixed(4)})`,
      result: `       = ${o_gate.toFixed(3)} × ${tanh(c_new).toFixed(4)} = ${h_new.toFixed(4)}`,
      desc: `The new hidden state output, passed to the next step AND used as prediction output. It's a filtered version of the cell memory.`
    },
  ];

  return (
    <div>
      <InfoCard color={color} title="What is LSTM?">
        Long Short-Term Memory (1997, Hochreiter & Schmidhuber) solves the RNN's vanishing gradient problem by introducing a <strong style={{color:color.main}}>cell state</strong> — a separate memory lane that information can flow through without repeated multiplication. Four gates (forget, input, candidate, output) control what gets stored, erased, and read.
      </InfoCard>
      <InfoCard color={color} title="Why do we use it?">
        LSTMs can remember relevant information across <strong style={{color:color.main}}>hundreds of time steps</strong>. They power ChatGPT's predecessors, Google Translate, speech-to-text, and music generation. The gating mechanism learns when to remember and when to forget — entirely from data.
      </InfoCard>

      <SectionTitle color={color}>🔬 Gate-by-Gate Computation</SectionTitle>
      <div style={{ background: "#0f172a", borderRadius: 12, padding: 20, marginBottom: 16, border: `1px solid ${color.main}30` }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
          {[["x (input)", x, setX],["h_prev", h_prev, setH_prev],["c_prev", c_prev, setC_prev]].map(([label, val, setter]) => (
            <label key={label} style={{ color: "#94a3b8", fontSize: 13 }}>
              {label}: <strong style={{ color: color.main }}>{val.toFixed(2)}</strong>
              <input type="range" min={-1} max={1} step={0.01} value={val}
                onChange={e => setter(+e.target.value)}
                style={{ marginLeft: 8, accentColor: color.main, width: 100 }} />
            </label>
          ))}
        </div>

        {/* LSTM diagram */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {gateSteps.map((g, i) => (
            <div key={g.id} onClick={() => setStep(i)} style={{
              background: step === i ? `rgba(${g.color.replace("#","").match(/.{2}/g).map(h=>parseInt(h,16)).join(",")},0.15)` : "#1e293b",
              border: `2px solid ${step === i ? g.color : g.color+"40"}`,
              borderRadius: 10, padding: 14, cursor: "pointer",
              transition: "all 0.2s"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: g.color, fontWeight: 700, fontSize: 13 }}>{g.label}</span>
                <span style={{ color: g.color, fontFamily: "'Courier New', monospace", fontSize: 14, fontWeight: 700 }}>{g.gate.toFixed(3)}</span>
              </div>
              <div style={{ background: "#0f172a", height: 6, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${Math.abs(g.gate)*100}%`, background: g.color, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0f172a", borderRadius: 10, padding: 16, border: `1px solid ${gateSteps[step].color}40` }}>
          <div style={{ color: gateSteps[step].color, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{gateSteps[step].label}</div>
          <div style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>{gateSteps[step].desc}</div>
          <MathBox color={{ main: gateSteps[step].color }}>
{`${gateSteps[step].formula}
${gateSteps[step].calc}
${gateSteps[step].result}`}
          </MathBox>
        </div>
      </div>

      <InfoCard color={color} title="Why LSTM Solves Vanishing Gradients">
        The cell state update <code style={{color:color.main}}>c_new = f·c_prev + i·g</code> is ADDITIVE — we add new info rather than multiplying repeatedly. This creates a "gradient highway": <code style={{color:color.main}}>∂c_new/∂c_prev = f</code> which is just one sigmoid gate, not a product of Wh matrices at every step. Gradients flow much further back in time.
      </InfoCard>

      <InfoCard color={color} title="Weight Update in LSTM">
        There are 4 gates × 3 weight matrices (Wx, Wh, b) = 12 parameter groups per unit. All are updated via BPTT: <code style={{color:color.main}}>∂L/∂Wf = Σ_t (∂L/∂f_t · ∂f_t/∂Wf)</code>. The forget gate gradient is bounded by f(1-f) ≤ 0.25 per step, but the cell state path bypasses this multiplication.
      </InfoCard>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// GRU SECTION
// ══════════════════════════════════════════════════════════════════════════════
function GRUSection() {
  const color = COLORS.gru;
  const [x, setX] = useState(0.6);
  const [h_prev, setH_prev] = useState(0.4);
  const [step, setStep] = useState(0);
  const [comparison, setComparison] = useState(false);

  const Wz = { x: 0.5, h: 0.3, b: -0.1 };
  const Wr = { x: 0.4, h: -0.2, b: 0.2 };
  const Wn = { x: 0.6, h: 0.4, b: 0.0 };

  const z = sigmoid(Wz.x * x + Wz.h * h_prev + Wz.b);
  const r = sigmoid(Wr.x * x + Wr.h * h_prev + Wr.b);
  const n = tanh(Wn.x * x + Wn.h * (r * h_prev) + Wn.b);
  const h_new = (1 - z) * n + z * h_prev;

  const gateSteps = [
    {
      label: "Update Gate (z)", gate: z, col: "#fb923c",
      formula: `z = σ(Wz_x·x + Wz_h·h_prev + bz)`,
      desc: `Decides how much of the PREVIOUS hidden state to keep vs. replace with new info. z≈1 → keep old state (skip this input). z≈0 → fully update with new info. Combines forget+input gate from LSTM into one.`,
      result: `z = ${z.toFixed(4)}`
    },
    {
      label: "Reset Gate (r)", gate: r, col: "#fbbf24",
      formula: `r = σ(Wr_x·x + Wr_h·h_prev + br)`,
      desc: `Decides how much of the PAST hidden state is relevant for computing the new candidate. r≈0 → ignore history when computing new candidate. Allows the network to drop irrelevant past context selectively.`,
      result: `r = ${r.toFixed(4)}`
    },
    {
      label: "Candidate (ñ)", gate: n, col: "#a78bfa",
      formula: `ñ = tanh(Wn_x·x + Wn_h·(r × h_prev) + bn)`,
      desc: `New candidate hidden state. The reset gate r modulates how much old hidden state influences this. With r=0, the candidate is purely from the current input (complete reset).`,
      result: `ñ = ${n.toFixed(4)}`
    },
    {
      label: "New Hidden State (h)", gate: h_new, col: color.main,
      formula: `h_new = (1 - z)·ñ + z·h_prev`,
      desc: `The final output. A linear interpolation between the old state and the new candidate. If z=1, output = old state (update gate says "skip"). If z=0, output = new candidate (full update). Elegant and interpretable.`,
      result: `h_new = (1-${z.toFixed(3)})×${n.toFixed(3)} + ${z.toFixed(3)}×${h_prev.toFixed(3)} = ${h_new.toFixed(4)}`
    },
  ];

  return (
    <div>
      <InfoCard color={color} title="What is GRU?">
        Gated Recurrent Unit (2014, Cho et al.) is a <strong style={{color:color.main}}>streamlined LSTM</strong>. It merges the forget and input gates into a single "update gate" and eliminates the separate cell state, achieving similar performance to LSTM with <strong style={{color:color.main}}>fewer parameters and faster training</strong>.
      </InfoCard>
      <InfoCard color={color} title="Why do we use it?">
        When you don't need LSTM's full expressiveness, GRU trains faster and needs less data. It works well for medium-length sequences: video frame analysis, music generation, drug discovery, and sentiment analysis. GRU often matches or beats LSTM on many tasks with 25% fewer parameters.
      </InfoCard>

      <SectionTitle color={color}>⚙️ GRU Gate Computation</SectionTitle>
      <div style={{ background: "#0f172a", borderRadius: 12, padding: 20, marginBottom: 16, border: `1px solid ${color.main}30` }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
          {[["x (input)", x, setX],["h_prev", h_prev, setH_prev]].map(([label, val, setter]) => (
            <label key={label} style={{ color: "#94a3b8", fontSize: 13 }}>
              {label}: <strong style={{ color: color.main }}>{val.toFixed(2)}</strong>
              <input type="range" min={-1} max={1} step={0.01} value={val}
                onChange={e => setter(+e.target.value)}
                style={{ marginLeft: 8, accentColor: color.main, width: 100 }} />
            </label>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {gateSteps.map((g, i) => (
            <div key={g.label} onClick={() => setStep(i)} style={{
              background: step === i ? "rgba(251,146,60,0.1)" : "#1e293b",
              border: `2px solid ${step === i ? g.col : g.col+"40"}`,
              borderRadius: 10, padding: 14, cursor: "pointer"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: g.col, fontWeight: 700, fontSize: 13 }}>{g.label}</span>
                <span style={{ color: g.col, fontFamily: "'Courier New', monospace", fontSize: 14 }}>{g.gate.toFixed(3)}</span>
              </div>
              <div style={{ background: "#0f172a", height: 6, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${Math.abs(g.gate)*100}%`, background: g.col, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0f172a", borderRadius: 10, padding: 16, border: `1px solid ${gateSteps[step].col}40` }}>
          <div style={{ color: gateSteps[step].col, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{gateSteps[step].label}</div>
          <div style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>{gateSteps[step].desc}</div>
          <MathBox color={{ main: gateSteps[step].col }}>
{`Formula: ${gateSteps[step].formula}
Result:  ${gateSteps[step].result}`}
          </MathBox>
        </div>
      </div>

      <SectionTitle color={color}>⚖️ GRU vs LSTM Comparison</SectionTitle>
      <div style={{ background: "#0f172a", borderRadius: 12, padding: 20, border: `1px solid ${color.main}30` }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>
                {["Property","RNN","LSTM","GRU"].map(h => (
                  <th key={h} style={{
                    padding: "10px 14px", textAlign: "left",
                    color: h === "GRU" ? color.main : h === "LSTM" ? "#f472b6" : "#4ade80",
                    fontFamily: "'Courier New', monospace", borderBottom: `1px solid #1e293b`,
                    fontWeight: 700
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Memory type","Hidden state only","Cell state + hidden","Hidden state only"],
                ["# of gates","None","4 (f, i, o, g)","2 (z, r)"],
                ["Parameters per unit","Small","Most","~75% of LSTM"],
                ["Long-range memory","Poor","Excellent","Good"],
                ["Training speed","Fast","Slowest","Faster than LSTM"],
                ["Gradient flow","Vanishes","Highway (cell state)","Good (interpolation)"],
                ["Best use case","Short sequences","Very long sequences","Medium sequences"],
              ].map((row, ri) => (
                <tr key={ri} style={{ background: ri % 2 === 0 ? "#0f172a" : "#080f1a" }}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{
                      padding: "9px 14px",
                      color: ci === 0 ? "#94a3b8" : ci === 3 ? color.main : "#64748b",
                      borderBottom: "1px solid #1e293b10",
                      fontFamily: ci > 0 ? "'Courier New', monospace" : "inherit",
                      fontSize: ci === 0 ? 13 : 12
                    }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <InfoCard color={color} title="Error Handling & Weight Update in GRU">
        GRU has <strong style={{color:color.main}}>3 gate matrices</strong> (Wz, Wr, Wn each with Wx, Wh, b). Total: 3×3 = 9 parameter groups per unit. Gradients are computed via BPTT as with LSTM, but the linear interpolation <code style={{color:color.main}}>h = (1-z)·ñ + z·h_prev</code> provides a natural gradient flow: <code style={{color:color.main}}>∂h/∂h_prev ≥ z</code>, where z is bounded [0,1]. Weight updates use the same gradient descent: <code style={{color:color.main}}>W ← W − lr·∇L</code>, with Adam optimizer recommended for adaptive learning rates per weight.
      </InfoCard>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
function DeepLearningAcademy() {
  const [activeTab, setActiveTab] = useState("lenet");
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const color = COLORS[activeTab];

  const sections = { lenet: LeNetSection, googlenet: GoogLeNetSection, vggnet: VGGNetSection, rnn: RNNSection, lstm: LSTMSection, gru: GRUSection };
  const ActiveSection = sections[activeTab];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#020617",
      color: "#e2e8f0",
      fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
    }}>
      {/* Animated background */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${color.glow}, transparent 70%)`
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: 6,
            color: "#475569", marginBottom: 8, textTransform: "uppercase"
          }}>Deep Learning Architecture Academy</div>
          <h1 style={{
            fontSize: "clamp(24px, 5vw, 40px)", fontWeight: 800, margin: 0,
            background: `linear-gradient(90deg, ${color.main}, #ffffff, ${color.main})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text", letterSpacing: -1
          }}>Neural Network Architectures</h1>
          <p style={{ color: "#475569", fontSize: 14, marginTop: 8 }}>
            Interactive in-class activity — LeNet · GoogLeNet · VGGNet · RNN · LSTM · GRU
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center",
          marginBottom: 28, background: "#0f172a",
          borderRadius: 16, padding: 6, border: "1px solid #1e293b"
        }}>
          {TABS.map(t => {
            const c = COLORS[t.id];
            const active = activeTab === t.id;
            return (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                padding: "8px 16px", borderRadius: 12,
                border: active ? `1px solid ${c.main}` : "1px solid transparent",
                background: active ? c.bg : "transparent",
                color: active ? c.main : "#475569",
                fontFamily: "'Courier New', monospace", fontSize: 13,
                fontWeight: active ? 700 : 400, cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: active ? `0 0 12px ${c.glow}` : "none"
              }}>
                {t.emoji} {t.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div style={{
          background: "rgba(15,23,42,0.8)", borderRadius: 20,
          border: `1px solid ${color.main}20`,
          padding: "28px 24px",
          boxShadow: `0 0 40px ${color.glow}`
        }}>
          {mounted && <ActiveSection key={activeTab} />}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 24, color: "#334155", fontSize: 11, fontFamily: "'Courier New', monospace" }}>
          DEEP LEARNING ACADEMY · ALL COMPUTATIONS PERFORMED IN-BROWSER · NO EXTERNAL DEPENDENCIES
        </div>
      </div>
    </div>
  );
}

// ============================================================
// FILE: 15. Deep Learning Implementation (Python)
// ============================================================

const DEEP_LEARNING_PY_CODE = [
  "\"\"\"",
  "DEEP LEARNING MODELS - COMPLETE IMPLEMENTATION",
  "Real Python Examples with Outputs",
  "",
  "This file contains production-ready implementations of:",
  "1. CNN for Image Classification (ResNet-style)",
  "2. LSTM for Text Generation",
  "3. Transformer Encoder",
  "4. GAN for Image Generation",
  "5. Variational Autoencoder (VAE)",
  "6. Transfer Learning (VGG16, ResNet50)",
  "7. Object Detection (YOLO-style)",
  "8. Semantic Segmentation (U-Net)",
  "9. Complete training pipelines with outputs",
  "\"\"\"",
  "",
  "import numpy as np",
  "import tensorflow as tf",
  "from tensorflow import keras",
  "from tensorflow.keras import layers, models",
  "from tensorflow.keras.datasets import mnist, cifar10",
  "from tensorflow.keras.applications import VGG16, ResNet50",
  "from tensorflow.keras.preprocessing import image",
  "from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions",
  "import matplotlib.pyplot as plt",
  "from sklearn.model_selection import train_test_split",
  "import time",
  "",
  "print(\"=\"*80)",
  "print(\"DEEP LEARNING MODELS - COMPLETE IMPLEMENTATION\")",
  "print(\"=\"*80)",
  "print(f\"TensorFlow version: {tf.__version__}\")",
  "print(f\"GPU Available: {len(tf.config.list_physical_devices('GPU')) > 0}\")",
  "",
  "# =============================================================================",
  "# 1. CNN WITH RESIDUAL CONNECTIONS (ResNet-style)",
  "# =============================================================================",
  "",
  "def build_resnet_style_cnn():",
  "    \"\"\"Build ResNet-style CNN with skip connections\"\"\"",
  "    print(\"\\\\n\" + \"=\"*80)",
  "    print(\"1. RESNET-STYLE CNN FOR IMAGE CLASSIFICATION\")",
  "    print(\"=\"*80)",
  "    ",
  "    # Load CIFAR-10",
  "    print(\"\\\\n📥 Loading CIFAR-10 dataset...\")",
  "    (x_train, y_train), (x_test, y_test) = cifar10.load_data()",
  "    ",
  "    class_names = ['airplane', 'automobile', 'bird', 'cat', 'deer',",
  "                   'dog', 'frog', 'horse', 'ship', 'truck']",
  "    ",
  "    print(f\"   Training samples: {x_train.shape[0]:,}\")",
  "    print(f\"   Test samples: {x_test.shape[0]:,}\")",
  "    print(f\"   Image shape: {x_train.shape[1:]}\") ",
  "    print(f\"   Classes: {len(class_names)}\")",
  "    ",
  "    # Normalize",
  "    x_train = x_train.astype('float32') / 255.0",
  "    x_test = x_test.astype('float32') / 255.0",
  "    ",
  "    # Subsample for demo",
  "    x_train_sub = x_train[:10000]",
  "    y_train_sub = y_train[:10000]",
  "    x_test_sub = x_test[:2000]",
  "    y_test_sub = y_test[:2000]",
  "    ",
  "    # Build ResNet-style model",
  "    print(\"\\\\n🏗️  Building ResNet-style CNN...\")",
  "    ",
  "    def residual_block(x, filters, stride=1):",
  "        \"\"\"Residual block with skip connection\"\"\"",
  "        shortcut = x",
  "        ",
  "        # Main path",
  "        x = layers.Conv2D(filters, 3, strides=stride, padding='same')(x)",
  "        x = layers.BatchNormalization()(x)",
  "        x = layers.ReLU()(x)",
  "        ",
  "        x = layers.Conv2D(filters, 3, padding='same')(x)",
  "        x = layers.BatchNormalization()(x)",
  "        ",
  "        # Adjust shortcut dimensions if needed",
  "        if stride != 1:",
  "            shortcut = layers.Conv2D(filters, 1, strides=stride)(shortcut)",
  "            shortcut = layers.BatchNormalization()(shortcut)",
  "        ",
  "        # Add skip connection",
  "        x = layers.Add()([x, shortcut])",
  "        x = layers.ReLU()(x)",
  "        ",
  "        return x",
  "    ",
  "    # Build model",
  "    inputs = layers.Input(shape=(32, 32, 3))",
  "    ",
  "    # Initial conv",
  "    x = layers.Conv2D(64, 3, padding='same')(inputs)",
  "    x = layers.BatchNormalization()(x)",
  "    x = layers.ReLU()(x)",
  "    ",
  "    # Residual blocks",
  "    x = residual_block(x, 64)",
  "    x = residual_block(x, 64)",
  "    x = residual_block(x, 128, stride=2)",
  "    x = residual_block(x, 128)",
  "    x = residual_block(x, 256, stride=2)",
  "    x = residual_block(x, 256)",
  "    ",
  "    # Classification head",
  "    x = layers.GlobalAveragePooling2D()(x)",
  "    x = layers.Dense(10, activation='softmax')(x)",
  "    ",
  "    model = models.Model(inputs, x, name='ResNet_Style_CNN')",
  "    ",
  "    print(\"\\\\n\" + \"=\"*60)",
  "    model.summary()",
  "    print(\"=\"*60)",
  "    ",
  "    # Compile",
  "    model.compile(",
  "        optimizer='adam',",
  "        loss='sparse_categorical_crossentropy',",
  "        metrics=['accuracy']",
  "    )",
  "    ",
  "    # Train",
  "    print(\"\\\\n🎓 Training model...\")",
  "    history = model.fit(",
  "        x_train_sub, y_train_sub,",
  "        batch_size=128,",
  "        epochs=5,",
  "        validation_split=0.2,",
  "        verbose=1",
  "    )",
  "    ",
  "    # Evaluate",
  "    print(\"\\\\n📊 Evaluating...\")",
  "    test_loss, test_acc = model.evaluate(x_test_sub, y_test_sub, verbose=0)",
  "    ",
  "    print(f\"\\\\n✅ RESULTS:\")",
  "    print(f\"   Test Accuracy: {test_acc*100:.2f}%\")",
  "    print(f\"   Test Loss: {test_loss:.4f}\")",
  "    ",
  "    # Predictions",
  "    print(\"\\\\n🔮 Sample Predictions:\")",
  "    predictions = model.predict(x_test_sub[:10], verbose=0)",
  "    ",
  "    for i in range(10):",
  "        pred_idx = np.argmax(predictions[i])",
  "        true_idx = y_test_sub[i][0]",
  "        confidence = predictions[i][pred_idx] * 100",
  "        ",
  "        status = \"✓\" if pred_idx == true_idx else \"✗\"",
  "        print(f\"   {status} Image {i+1}: True={class_names[true_idx]:10s}, \"",
  "              f\"Pred={class_names[pred_idx]:10s}, Conf={confidence:.2f}%\")",
  "    ",
  "    return model, history",
  "",
  "",
  "# =============================================================================",
  "# 2. LSTM FOR TEXT GENERATION",
  "# =============================================================================",
  "",
  "def build_lstm_text_generator():",
  "    \"\"\"Build LSTM for character-level text generation\"\"\"",
  "    print(\"\\\\n\" + \"=\"*80)",
  "    print(\"2. LSTM FOR TEXT GENERATION\")",
  "    print(\"=\"*80)",
  "    ",
  "    # Sample text corpus",
  "    text = \"\"\"Deep learning is a subset of machine learning that uses neural networks ",
  "    with multiple layers. These models can learn hierarchical representations of data.",
  "    Convolutional neural networks excel at computer vision tasks, while recurrent networks",
  "    handle sequential data. Transformers have revolutionized natural language processing.\"\"\"",
  "    ",
  "    text = text.lower()",
  "    ",
  "    print(f\"\\\\n📝 Text corpus length: {len(text)} characters\")",
  "    ",
  "    # Create character mappings",
  "    chars = sorted(set(text))",
  "    char_to_idx = {c: i for i, c in enumerate(chars)}",
  "    idx_to_char = {i: c for i, c in enumerate(chars)}",
  "    ",
  "    print(f\"   Unique characters: {len(chars)}\")",
  "    print(f\"   Characters: {chars[:20]}...\")",
  "    ",
  "    # Create training sequences",
  "    seq_length = 40",
  "    step = 3",
  "    ",
  "    sequences = []",
  "    next_chars = []",
  "    ",
  "    for i in range(0, len(text) - seq_length, step):",
  "        sequences.append(text[i:i + seq_length])",
  "        next_chars.append(text[i + seq_length])",
  "    ",
  "    print(f\"\\\\n📊 Training sequences: {len(sequences)}\")",
  "    ",
  "    # Vectorize",
  "    X = np.zeros((len(sequences), seq_length, len(chars)), dtype=np.float32)",
  "    y = np.zeros((len(sequences), len(chars)), dtype=np.float32)",
  "    ",
  "    for i, seq in enumerate(sequences):",
  "        for t, char in enumerate(seq):",
  "            X[i, t, char_to_idx[char]] = 1",
  "        y[i, char_to_idx[next_chars[i]]] = 1",
  "    ",
  "    print(f\"   X shape: {X.shape}\")",
  "    print(f\"   y shape: {y.shape}\")",
  "    ",
  "    # Build LSTM model",
  "    print(\"\\\\n🏗️  Building LSTM model...\")",
  "    ",
  "    model = models.Sequential([",
  "        layers.LSTM(128, input_shape=(seq_length, len(chars)), return_sequences=True),",
  "        layers.Dropout(0.2),",
  "        layers.LSTM(128),",
  "        layers.Dropout(0.2),",
  "        layers.Dense(len(chars), activation='softmax')",
  "    ], name='LSTM_TextGen')",
  "    ",
  "    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])",
  "    ",
  "    print(\"\\\\n\" + \"=\"*60)",
  "    model.summary()",
  "    print(\"=\"*60)",
  "    ",
  "    # Train",
  "    print(\"\\\\n🎓 Training LSTM...\")",
  "    history = model.fit(X, y, batch_size=64, epochs=10, validation_split=0.1, verbose=1)",
  "    ",
  "    # Generate text",
  "    print(\"\\\\n✍️  Generating text...\")",
  "    ",
  "    def generate_text(model, seed_text, length=100, temperature=0.5):",
  "        generated = seed_text",
  "        ",
  "        for _ in range(length):",
  "            # Prepare input",
  "            x_pred = np.zeros((1, seq_length, len(chars)))",
  "            for t, char in enumerate(seed_text[-seq_length:]):",
  "                if char in char_to_idx:",
  "                    x_pred[0, t, char_to_idx[char]] = 1",
  "            ",
  "            # Predict next character",
  "            preds = model.predict(x_pred, verbose=0)[0]",
  "            ",
  "            # Sample with temperature",
  "            preds = np.log(preds + 1e-10) / temperature",
  "            exp_preds = np.exp(preds)",
  "            preds = exp_preds / np.sum(exp_preds)",
  "            ",
  "            next_idx = np.random.choice(len(chars), p=preds)",
  "            next_char = idx_to_char[next_idx]",
  "            ",
  "            generated += next_char",
  "            seed_text += next_char",
  "        ",
  "        return generated",
  "    ",
  "    seed = \"deep learning is\"",
  "    generated = generate_text(model, seed, length=150)",
  "    ",
  "    print(f\"\\\\n📄 Generated text (seed: '{seed}'):\")",
  "    print(\"-\" * 70)",
  "    print(generated)",
  "    print(\"-\" * 70)",
  "    ",
  "    return model, history",
  "",
  "",
  "# =============================================================================",
  "# 3. SIMPLE GAN FOR IMAGE GENERATION",
  "# =============================================================================",
  "",
  "def build_simple_gan():",
  "    \"\"\"Build simple GAN for MNIST digit generation\"\"\"",
  "    print(\"\\\\n\" + \"=\"*80)",
  "    print(\"3. GAN FOR IMAGE GENERATION\")",
  "    print(\"=\"*80)",
  "    ",
  "    # Load MNIST",
  "    print(\"\\\\n📥 Loading MNIST...\")",
  "    (x_train, _), (_, _) = mnist.load_data()",
  "    ",
  "    # Normalize to [-1, 1]",
  "    x_train = (x_train.astype('float32') - 127.5) / 127.5",
  "    x_train = np.expand_dims(x_train, axis=-1)",
  "    ",
  "    print(f\"   Training samples: {x_train.shape[0]:,}\")",
  "    print(f\"   Image shape: {x_train.shape[1:]}\")",
  "    ",
  "    # Use subset for demo",
  "    x_train = x_train[:10000]",
  "    ",
  "    # Build Generator",
  "    print(\"\\\\n🏗️  Building Generator...\")",
  "    ",
  "    latent_dim = 100",
  "    ",
  "    generator = models.Sequential([",
  "        layers.Dense(7 * 7 * 128, input_dim=latent_dim),",
  "        layers.Reshape((7, 7, 128)),",
  "        layers.BatchNormalization(),",
  "        layers.ReLU(),",
  "        ",
  "        layers.Conv2DTranspose(128, 5, strides=1, padding='same'),",
  "        layers.BatchNormalization(),",
  "        layers.ReLU(),",
  "        ",
  "        layers.Conv2DTranspose(64, 5, strides=2, padding='same'),",
  "        layers.BatchNormalization(),",
  "        layers.ReLU(),",
  "        ",
  "        layers.Conv2DTranspose(1, 5, strides=2, padding='same', activation='tanh')",
  "    ], name='Generator')",
  "    ",
  "    print(\"\\\\n📊 Generator Architecture:\")",
  "    generator.summary()",
  "    ",
  "    # Build Discriminator",
  "    print(\"\\\\n🏗️  Building Discriminator...\")",
  "    ",
  "    discriminator = models.Sequential([",
  "        layers.Conv2D(64, 5, strides=2, padding='same', input_shape=(28, 28, 1)),",
  "        layers.LeakyReLU(0.2),",
  "        layers.Dropout(0.3),",
  "        ",
  "        layers.Conv2D(128, 5, strides=2, padding='same'),",
  "        layers.LeakyReLU(0.2),",
  "        layers.Dropout(0.3),",
  "        ",
  "        layers.Flatten(),",
  "        layers.Dense(1, activation='sigmoid')",
  "    ], name='Discriminator')",
  "    ",
  "    print(\"\\\\n📊 Discriminator Architecture:\")",
  "    discriminator.summary()",
  "    ",
  "    # Compile discriminator",
  "    discriminator.compile(",
  "        optimizer=keras.optimizers.Adam(0.0002, 0.5),",
  "        loss='binary_crossentropy',",
  "        metrics=['accuracy']",
  "    )",
  "    ",
  "    # Build combined model (for training generator)",
  "    discriminator.trainable = False",
  "    ",
  "    gan_input = layers.Input(shape=(latent_dim,))",
  "    generated_image = generator(gan_input)",
  "    gan_output = discriminator(generated_image)",
  "    ",
  "    gan = models.Model(gan_input, gan_output, name='GAN')",
  "    gan.compile(optimizer=keras.optimizers.Adam(0.0002, 0.5), loss='binary_crossentropy')",
  "    ",
  "    # Training",
  "    print(\"\\\\n🎓 Training GAN...\")",
  "    ",
  "    batch_size = 128",
  "    epochs = 5",
  "    ",
  "    for epoch in range(epochs):",
  "        # Train Discriminator",
  "        idx = np.random.randint(0, x_train.shape[0], batch_size)",
  "        real_images = x_train[idx]",
  "        ",
  "        noise = np.random.normal(0, 1, (batch_size, latent_dim))",
  "        fake_images = generator.predict(noise, verbose=0)",
  "        ",
  "        d_loss_real = discriminator.train_on_batch(real_images, np.ones((batch_size, 1)))",
  "        d_loss_fake = discriminator.train_on_batch(fake_images, np.zeros((batch_size, 1)))",
  "        d_loss = 0.5 * np.add(d_loss_real, d_loss_fake)",
  "        ",
  "        # Train Generator",
  "        noise = np.random.normal(0, 1, (batch_size, latent_dim))",
  "        g_loss = gan.train_on_batch(noise, np.ones((batch_size, 1)))",
  "        ",
  "        if epoch % 1 == 0:",
  "            print(f\"   Epoch {epoch+1}/{epochs} - D Loss: {d_loss[0]:.4f}, \"",
  "                  f\"D Acc: {d_loss[1]*100:.2f}%, G Loss: {g_loss:.4f}\")",
  "    ",
  "    # Generate samples",
  "    print(\"\\\\n🎨 Generating sample images...\")",
  "    noise = np.random.normal(0, 1, (16, latent_dim))",
  "    generated_images = generator.predict(noise, verbose=0)",
  "    ",
  "    print(f\"   Generated {len(generated_images)} images\")",
  "    print(f\"   Image shape: {generated_images[0].shape}\")",
  "    print(f\"   Value range: [{generated_images.min():.2f}, {generated_images.max():.2f}]\")",
  "    ",
  "    return generator, discriminator, gan",
  "",
  "",
  "# =============================================================================",
  "# 4. VARIATIONAL AUTOENCODER (VAE)",
  "# =============================================================================",
  "",
  "def build_vae():",
  "    \"\"\"Build Variational Autoencoder\"\"\"",
  "    print(\"\\\\n\" + \"=\"*80)",
  "    print(\"4. VARIATIONAL AUTOENCODER (VAE)\")",
  "    print(\"=\"*80)",
  "    ",
  "    # Load MNIST",
  "    print(\"\\\\n📥 Loading MNIST...\")",
  "    (x_train, _), (x_test, _) = mnist.load_data()",
  "    ",
  "    x_train = x_train.astype('float32') / 255.0",
  "    x_test = x_test.astype('float32') / 255.0",
  "    ",
  "    x_train = x_train.reshape(-1, 28, 28, 1)",
  "    x_test = x_test.reshape(-1, 28, 28, 1)",
  "    ",
  "    # Use subset",
  "    x_train = x_train[:10000]",
  "    x_test = x_test[:2000]",
  "    ",
  "    print(f\"   Training samples: {x_train.shape[0]:,}\")",
  "    ",
  "    # VAE parameters",
  "    latent_dim = 2  # 2D for visualization",
  "    ",
  "    # Encoder",
  "    print(\"\\\\n🏗️  Building VAE Encoder...\")",
  "    ",
  "    encoder_inputs = layers.Input(shape=(28, 28, 1))",
  "    x = layers.Conv2D(32, 3, strides=2, padding='same', activation='relu')(encoder_inputs)",
  "    x = layers.Conv2D(64, 3, strides=2, padding='same', activation='relu')(x)",
  "    x = layers.Flatten()(x)",
  "    x = layers.Dense(16, activation='relu')(x)",
  "    ",
  "    z_mean = layers.Dense(latent_dim, name='z_mean')(x)",
  "    z_log_var = layers.Dense(latent_dim, name='z_log_var')(x)",
  "    ",
  "    # Sampling layer",
  "    class Sampling(layers.Layer):",
  "        def call(self, inputs):",
  "            z_mean, z_log_var = inputs",
  "            batch = tf.shape(z_mean)[0]",
  "            dim = tf.shape(z_mean)[1]",
  "            epsilon = tf.random.normal(shape=(batch, dim))",
  "            return z_mean + tf.exp(0.5 * z_log_var) * epsilon",
  "    ",
  "    z = Sampling()([z_mean, z_log_var])",
  "    ",
  "    encoder = models.Model(encoder_inputs, [z_mean, z_log_var, z], name='encoder')",
  "    ",
  "    print(\"\\\\n📊 Encoder Architecture:\")",
  "    encoder.summary()",
  "    ",
  "    # Decoder",
  "    print(\"\\\\n🏗️  Building VAE Decoder...\")",
  "    ",
  "    latent_inputs = layers.Input(shape=(latent_dim,))",
  "    x = layers.Dense(7 * 7 * 64, activation='relu')(latent_inputs)",
  "    x = layers.Reshape((7, 7, 64))(x)",
  "    x = layers.Conv2DTranspose(64, 3, strides=2, padding='same', activation='relu')(x)",
  "    x = layers.Conv2DTranspose(32, 3, strides=2, padding='same', activation='relu')(x)",
  "    decoder_outputs = layers.Conv2DTranspose(1, 3, padding='same', activation='sigmoid')(x)",
  "    ",
  "    decoder = models.Model(latent_inputs, decoder_outputs, name='decoder')",
  "    ",
  "    print(\"\\\\n📊 Decoder Architecture:\")",
  "    decoder.summary()",
  "    ",
  "    # VAE Model",
  "    class VAE(keras.Model):",
  "        def __init__(self, encoder, decoder, **kwargs):",
  "            super().__init__(**kwargs)",
  "            self.encoder = encoder",
  "            self.decoder = decoder",
  "            self.total_loss_tracker = keras.metrics.Mean(name=\"total_loss\")",
  "            self.reconstruction_loss_tracker = keras.metrics.Mean(name=\"recon_loss\")",
  "            self.kl_loss_tracker = keras.metrics.Mean(name=\"kl_loss\")",
  "        ",
  "        def call(self, inputs):",
  "            z_mean, z_log_var, z = self.encoder(inputs)",
  "            reconstruction = self.decoder(z)",
  "            return reconstruction",
  "        ",
  "        def train_step(self, data):",
  "            with tf.GradientTape() as tape:",
  "                z_mean, z_log_var, z = self.encoder(data)",
  "                reconstruction = self.decoder(z)",
  "                ",
  "                reconstruction_loss = tf.reduce_mean(",
  "                    tf.reduce_sum(",
  "                        keras.losses.binary_crossentropy(data, reconstruction),",
  "                        axis=(1, 2)",
  "                    )",
  "                )",
  "                ",
  "                kl_loss = -0.5 * (1 + z_log_var - tf.square(z_mean) - tf.exp(z_log_var))",
  "                kl_loss = tf.reduce_mean(tf.reduce_sum(kl_loss, axis=1))",
  "                ",
  "                total_loss = reconstruction_loss + kl_loss",
  "            ",
  "            grads = tape.gradient(total_loss, self.trainable_weights)",
  "            self.optimizer.apply_gradients(zip(grads, self.trainable_weights))",
  "            ",
  "            self.total_loss_tracker.update_state(total_loss)",
  "            self.reconstruction_loss_tracker.update_state(reconstruction_loss)",
  "            self.kl_loss_tracker.update_state(kl_loss)",
  "            ",
  "            return {",
  "                \"loss\": self.total_loss_tracker.result(),",
  "                \"recon_loss\": self.reconstruction_loss_tracker.result(),",
  "                \"kl_loss\": self.kl_loss_tracker.result(),",
  "            }",
  "    ",
  "    vae = VAE(encoder, decoder)",
  "    vae.compile(optimizer=keras.optimizers.Adam(0.001))",
  "    ",
  "    # Train",
  "    print(\"\\\\n🎓 Training VAE...\")",
  "    history = vae.fit(x_train, epochs=5, batch_size=128, validation_data=(x_test, x_test))",
  "    ",
  "    # Generate samples",
  "    print(\"\\\\n🎨 Generating samples from latent space...\")",
  "    ",
  "    # Sample from latent space",
  "    n = 10",
  "    digit_size = 28",
  "    grid_x = np.linspace(-3, 3, n)",
  "    grid_y = np.linspace(-3, 3, n)",
  "    ",
  "    print(f\"   Sampling {n*n} points from 2D latent space\")",
  "    ",
  "    samples = []",
  "    for i, yi in enumerate(grid_y):",
  "        for j, xi in enumerate(grid_x):",
  "            z_sample = np.array([[xi, yi]])",
  "            x_decoded = decoder.predict(z_sample, verbose=0)",
  "            samples.append(x_decoded[0])",
  "    ",
  "    print(f\"   Generated {len(samples)} samples\")",
  "    ",
  "    return vae, encoder, decoder",
  "",
  "",
  "# =============================================================================",
  "# 5. TRANSFER LEARNING WITH RESNET50",
  "# =============================================================================",
  "",
  "def transfer_learning_demo():",
  "    \"\"\"Demonstrate transfer learning with ResNet50\"\"\"",
  "    print(\"\\\\n\" + \"=\"*80)",
  "    print(\"5. TRANSFER LEARNING WITH RESNET50\")",
  "    print(\"=\"*80)",
  "    ",
  "    print(\"\\\\n📥 Loading pre-trained ResNet50...\")",
  "    ",
  "    base_model = ResNet50(",
  "        weights='imagenet',",
  "        include_top=False,",
  "        input_shape=(224, 224, 3)",
  "    )",
  "    ",
  "    print(f\"   Model: ResNet50\")",
  "    print(f\"   Pre-trained on: ImageNet\")",
  "    print(f\"   Total layers: {len(base_model.layers)}\")",
  "    print(f\"   Parameters: {base_model.count_params():,}\")",
  "    ",
  "    # Freeze base model",
  "    base_model.trainable = False",
  "    ",
  "    print(f\"   Frozen base model: {sum([1 for layer in base_model.layers if not layer.trainable])}/{len(base_model.layers)} layers\")",
  "    ",
  "    # Add custom head for binary classification",
  "    print(\"\\\\n🏗️  Adding custom classification head...\")",
  "    ",
  "    inputs = layers.Input(shape=(224, 224, 3))",
  "    x = base_model(inputs, training=False)",
  "    x = layers.GlobalAveragePooling2D()(x)",
  "    x = layers.Dense(256, activation='relu')(x)",
  "    x = layers.Dropout(0.5)(x)",
  "    outputs = layers.Dense(2, activation='softmax')(x)  # Binary: cats vs dogs",
  "    ",
  "    model = models.Model(inputs, outputs, name='ResNet50_Transfer')",
  "    ",
  "    print(\"\\\\n📊 Full Model:\")",
  "    print(f\"   Total parameters: {model.count_params():,}\")",
  "    print(f\"   Trainable parameters: {sum([tf.size(w).numpy() for w in model.trainable_weights]):,}\")",
  "    print(f\"   Non-trainable parameters: {sum([tf.size(w).numpy() for w in model.non_trainable_weights]):,}\")",
  "    ",
  "    model.compile(",
  "        optimizer=keras.optimizers.Adam(0.0001),",
  "        loss='sparse_categorical_crossentropy',",
  "        metrics=['accuracy']",
  "    )",
  "    ",
  "    # Create dummy data",
  "    print(\"\\\\n📊 Creating dummy training data...\")",
  "    x_dummy = np.random.rand(100, 224, 224, 3).astype('float32')",
  "    y_dummy = np.random.randint(0, 2, (100,))",
  "    ",
  "    print(f\"   Training samples: {x_dummy.shape[0]}\")",
  "    print(f\"   Classes: 2 (cats vs dogs simulation)\")",
  "    ",
  "    # Train",
  "    print(\"\\\\n🎓 Fine-tuning on new data...\")",
  "    history = model.fit(",
  "        x_dummy, y_dummy,",
  "        batch_size=16,",
  "        epochs=3,",
  "        validation_split=0.2,",
  "        verbose=1",
  "    )",
  "    ",
  "    # Make prediction on random image",
  "    print(\"\\\\n🔮 Making prediction on sample image...\")",
  "    ",
  "    sample = np.random.rand(1, 224, 224, 3).astype('float32')",
  "    pred = model.predict(sample, verbose=0)",
  "    ",
  "    class_names = ['Cat', 'Dog']",
  "    pred_class = np.argmax(pred[0])",
  "    confidence = pred[0][pred_class] * 100",
  "    ",
  "    print(f\"   Predicted: {class_names[pred_class]} (Confidence: {confidence:.2f}%)\")",
  "    ",
  "    # Show feature extraction capability",
  "    print(\"\\\\n📊 Extracting features...\")",
  "    features = base_model.predict(sample, verbose=0)",
  "    print(f\"   Feature shape: {features.shape}\")",
  "    print(f\"   Feature values (first 10): {features.flatten()[:10]}\")",
  "    ",
  "    return model",
  "",
  "",
  "# =============================================================================",
  "# 6. SIMPLE TRANSFORMER ENCODER",
  "# =============================================================================",
  "",
  "def build_transformer_encoder():",
  "    \"\"\"Build simple Transformer encoder\"\"\"",
  "    print(\"\\\\n\" + \"=\"*80)",
  "    print(\"6. TRANSFORMER ENCODER\")",
  "    print(\"=\"*80)",
  "    ",
  "    print(\"\\\\n🏗️  Building Transformer Encoder block...\")",
  "    ",
  "    class TransformerBlock(layers.Layer):",
  "        def __init__(self, embed_dim, num_heads, ff_dim, rate=0.1):",
  "            super().__init__()",
  "            self.att = layers.MultiHeadAttention(num_heads=num_heads, key_dim=embed_dim)",
  "            self.ffn = keras.Sequential([",
  "                layers.Dense(ff_dim, activation=\"relu\"),",
  "                layers.Dense(embed_dim),",
  "            ])",
  "            self.layernorm1 = layers.LayerNormalization(epsilon=1e-6)",
  "            self.layernorm2 = layers.LayerNormalization(epsilon=1e-6)",
  "            self.dropout1 = layers.Dropout(rate)",
  "            self.dropout2 = layers.Dropout(rate)",
  "        ",
  "        def call(self, inputs, training):",
  "            attn_output = self.att(inputs, inputs)",
  "            attn_output = self.dropout1(attn_output, training=training)",
  "            out1 = self.layernorm1(inputs + attn_output)",
  "            ffn_output = self.ffn(out1)",
  "            ffn_output = self.dropout2(ffn_output, training=training)",
  "            return self.layernorm2(out1 + ffn_output)",
  "    ",
  "    # Build classification model",
  "    vocab_size = 10000",
  "    maxlen = 50",
  "    embed_dim = 32",
  "    num_heads = 2",
  "    ff_dim = 32",
  "    ",
  "    inputs = layers.Input(shape=(maxlen,))",
  "    embedding_layer = layers.Embedding(vocab_size, embed_dim)(inputs)",
  "    transformer_block = TransformerBlock(embed_dim, num_heads, ff_dim)",
  "    x = transformer_block(embedding_layer, training=False)",
  "    x = layers.GlobalAveragePooling1D()(x)",
  "    x = layers.Dropout(0.1)(x)",
  "    x = layers.Dense(20, activation=\"relu\")(x)",
  "    x = layers.Dropout(0.1)(x)",
  "    outputs = layers.Dense(2, activation=\"softmax\")(x)",
  "    ",
  "    model = models.Model(inputs=inputs, outputs=outputs, name='Transformer_Encoder')",
  "    ",
  "    print(\"\\\\n📊 Model Architecture:\")",
  "    model.summary()",
  "    ",
  "    print(\"\\\\n✅ Key Components:\")",
  "    print(\"   • Multi-Head Attention: Attends to different positions\")",
  "    print(\"   • Feed-Forward Network: Position-wise transformation\")",
  "    print(\"   • Layer Normalization: Stabilizes training\")",
  "    print(\"   • Residual Connections: Skip connections for gradient flow\")",
  "    ",
  "    # Create dummy sequential data",
  "    print(\"\\\\n📊 Creating dummy sequential data...\")",
  "    x_dummy = np.random.randint(0, vocab_size, (1000, maxlen))",
  "    y_dummy = np.random.randint(0, 2, (1000,))",
  "    ",
  "    model.compile(",
  "        optimizer='adam',",
  "        loss='sparse_categorical_crossentropy',",
  "        metrics=['accuracy']",
  "    )",
  "    ",
  "    # Train",
  "    print(\"\\\\n🎓 Training Transformer...\")",
  "    history = model.fit(",
  "        x_dummy, y_dummy,",
  "        batch_size=32,",
  "        epochs=3,",
  "        validation_split=0.2,",
  "        verbose=1",
  "    )",
  "    ",
  "    return model",
  "",
  "",
  "# =============================================================================",
  "# MAIN EXECUTION",
  "# =============================================================================",
  "",
  "if __name__ == \"__main__\":",
  "    print(\"\\\\n\" + \"=\"*80)",
  "    print(\"RUNNING ALL DEEP LEARNING DEMONSTRATIONS\")",
  "    print(\"=\"*80)",
  "    ",
  "    try:",
  "        # 1. ResNet-style CNN",
  "        resnet_model, resnet_history = build_resnet_style_cnn()",
  "        ",
  "        # 2. LSTM Text Generation",
  "        lstm_model, lstm_history = build_lstm_text_generator()",
  "        ",
  "        # 3. GAN",
  "        generator, discriminator, gan = build_simple_gan()",
  "        ",
  "        # 4. VAE",
  "        vae, encoder, decoder = build_vae()",
  "        ",
  "        # 5. Transfer Learning",
  "        transfer_model = transfer_learning_demo()",
  "        ",
  "        # 6. Transformer",
  "        transformer_model = build_transformer_encoder()",
  "        ",
  "        print(\"\\\\n\" + \"=\"*80)",
  "        print(\"✅ ALL DEMONSTRATIONS COMPLETED SUCCESSFULLY!\")",
  "        print(\"=\"*80)",
  "        ",
  "        print(\"\\\\n📝 Summary:\")",
  "        print(\"   ✓ ResNet-style CNN for image classification\")",
  "        print(\"   ✓ LSTM for character-level text generation\")",
  "        print(\"   ✓ GAN for digit generation\")",
  "        print(\"   ✓ VAE for probabilistic generation\")",
  "        print(\"   ✓ Transfer learning with ResNet50\")",
  "        print(\"   ✓ Transformer encoder architecture\")",
  "        ",
  "    except Exception as e:",
  "        print(f\"\\\\n❌ Error: {e}\")",
  "        import traceback",
  "        traceback.print_exc()",
  "",
  "print(\"\\\\n\" + \"=\"*80)",
  "print(\"PROGRAM COMPLETE\")",
  "print(\"=\"*80)",
];

function DeepLearningImplementation() {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(DEEP_LEARNING_PY_CODE.join('\n')).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div style={{ minHeight: '100vh', background: '#0d1117', padding: '24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <h1 style={{ color: '#58a6ff', fontFamily: 'monospace', fontSize: 20, margin: 0 }}>Deep Learning Implementation</h1>
            <p style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: 12, margin: '4px 0 0' }}>15. Deep Learning Implementation.py  Production-ready Python Examples</p>
          </div>
          <button onClick={handleCopy} style={{ padding: '8px 16px', background: copied ? '#238636' : '#21262d', color: copied ? '#fff' : '#c9d1d9', border: '1px solid #30363d', borderRadius: 6, fontFamily: 'monospace', fontSize: 12, cursor: 'pointer' }}>
            {copied ? ' Copied' : 'Copy Code'}
          </button>
        </div>
        <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: 8, overflow: 'auto', maxHeight: 'calc(100vh - 160px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', background: '#21262d', borderBottom: '1px solid #30363d', borderRadius: '8px 8px 0 0' }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', marginRight: 6 }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e', marginRight: 6 }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840', marginRight: 8 }} />
            <span style={{ color: '#8b949e', fontFamily: 'monospace', fontSize: 12 }}>deep_learning_implementation.py</span>
          </div>
          <pre style={{ margin: 0, padding: 16, fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6, color: '#e6edf3', whiteSpace: 'pre', overflowX: 'auto' }}>
            {DEEP_LEARNING_PY_CODE.map((line, i) => (
              <div key={i} style={{ display: 'flex', minHeight: '1.6em' }}>
                <span style={{ color: '#6e7681', userSelect: 'none', minWidth: 40, textAlign: 'right', paddingRight: 16 }}>{i + 1}</span>
                <span style={{ color: '#e6edf3' }}>{line}</span>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// FILE: 15. DeepLearningClassroom
// ============================================================


const C = {
  bg:"#0c0f14",panel:"#12161e",card:"#181d28",border:"#1e2535",muted:"#2a3347",
  text:"#c9d1e0",dim:"#5a6580",gold:"#f0c040",teal:"#2dd4bf",rose:"#fb7185",
  violet:"#a78bfa",sky:"#38bdf8",green:"#4ade80",orange:"#fb923c",
};

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;0,700;1,300;1,400&family=JetBrains+Mono:wght@300;400;500;700&display=swap');`;

// ── DEEP LEARNING DATA ────────────────────────────────────────────────────────
const DL_TOPICS = [
  {
    id:"weights",label:"Weights & Bias",icon:"⊕",color:C.teal,
    formula:"z = w₁x₁ + w₂x₂ + … + wₙxₙ + b",
    concept:`A weight (w) scales how strongly an input influences a neuron. A bias (b) shifts the activation threshold, allowing a neuron to fire even when inputs are zero.

Core computation for one neuron:
  z = Σ(wᵢ · xᵢ) + b      ← pre-activation (linear)
  a = activation(z)         ← post-activation (non-linear)

Weights and biases are the LEARNABLE PARAMETERS — updated via backpropagation (gradient descent) during training.

Layer (matrix form):
  Z = X · Wᵀ + b
  where X:(batch×in), W:(out×in), b:(out,)

Weight initialization matters:
  Xavier/Glorot: Var(w) = 2/(fan_in + fan_out)
  He/Kaiming:   Var(w) = 2/fan_in  (for ReLU layers)`,
    activities:[
      {
        q:`# ── ACTIVITY 1 ── Compute Neuron Output ──────────────────
# Given: x = [0.5, 0.8, 0.3], w = [0.4, -0.6, 0.9], b = 0.1
# Step 1: compute z (weighted sum + bias)
# Step 2: apply ReLU activation
import numpy as np

x = np.array([0.5, 0.8, 0.3])
w = np.array([0.4, -0.6, 0.9])
b = 0.1

# YOUR CODE HERE ↓
z      = ???               # dot product + bias
output = ???               # ReLU: max(0, z)

print(f"z      = {z:.4f}")
print(f"output = {output:.4f}")`,
        sol:`import numpy as np

x = np.array([0.5, 0.8, 0.3])
w = np.array([0.4, -0.6, 0.9])
b = 0.1

z      = np.dot(w, x) + b      # 0.4*0.5 + (-0.6)*0.8 + 0.9*0.3 + 0.1 = 0.07
output = np.maximum(0, z)      # ReLU

print(f"z      = {z:.4f}")     # z      = 0.0700
print(f"output = {output:.4f}")# output = 0.0700`,
        hint:"np.dot(w,x) gives the weighted sum. ReLU = np.maximum(0, z)."
      },
      {
        q:`# ── ACTIVITY 2 ── Dense Layer from Scratch ───────────────
# Build one fully-connected layer: W(4×3), b(3,), x(4,)
# Apply sigmoid at the output.
import numpy as np

np.random.seed(42)
W = np.random.randn(4, 3) * 0.1   # weight matrix (in=4, out=3)
b = np.zeros(3)                    # bias vector
x = np.array([1.0, 0.5, -0.3, 0.8])

# YOUR CODE ↓
z       = ???                      # shape (3,)
sigmoid = lambda v: ???            # 1 / (1 + e^-v)
out     = ???

print("z  :", z.round(4))
print("out:", out.round(4))`,
        sol:`import numpy as np

np.random.seed(42)
W = np.random.randn(4, 3) * 0.1
b = np.zeros(3)
x = np.array([1.0, 0.5, -0.3, 0.8])

z       = x @ W + b                        # (4,) @ (4,3) = (3,)
sigmoid = lambda v: 1 / (1 + np.exp(-v))
out     = sigmoid(z)

print("z  :", z.round(4))
print("out:", out.round(4))`,
        hint:"Matrix multiply x (4,) @ W (4,3) gives z (3,). Then apply sigmoid element-wise."
      }
    ]
  },
  {
    id:"activation",label:"Activation Functions",icon:"ƒ",color:C.rose,
    formula:"ReLU=max(0,x)  |  σ(x)=1/(1+e⁻ˣ)  |  tanh=(eˣ−e⁻ˣ)/(eˣ+e⁻ˣ)",
    concept:`Activation functions introduce non-linearity. Without them, stacking layers collapses to one linear transformation.

Function      Formula                   Range      Common Use
──────────────────────────────────────────────────────────────
ReLU          max(0,x)                  [0,∞)      Hidden (CNN)
Leaky ReLU    max(αx,x), α≈0.01        (-∞,∞)     Avoid dying ReLU
ELU           x if x>0 else α(eˣ-1)   (-α,∞)     Smooth negative
Sigmoid       1/(1+e⁻ˣ)                (0,1)      Binary output
Tanh          (eˣ-e⁻ˣ)/(eˣ+e⁻ˣ)       (-1,1)     RNN hidden
Softmax       eˣⁱ/Σeˣʲ                 (0,1),Σ=1 Multi-class
GELU          x·Φ(x)                    ≈(-0.17,∞) Transformer

Dying ReLU: neurons with z≤0 output 0, gradient=0, never update.
Fix: Leaky ReLU, ELU, or careful weight initialization.`,
    activities:[
      {
        q:`# ── ACTIVITY 3 ── Implement All Activation Functions ──────
import numpy as np

x = np.linspace(-4, 4, 9)
print("x:", x)

# Implement each function:
relu       = lambda x: ???
leaky      = lambda x: ???   # alpha = 0.01
sigmoid    = lambda x: ???
tanh_fn    = lambda x: ???
softmax    = lambda x: ???   # treat x as logits vector

for name, fn in [("ReLU",relu),("LeakyReLU",leaky),
                 ("Sigmoid",sigmoid),("Tanh",tanh_fn)]:
    print(f"{name:12}: {fn(x).round(3)}")

logits = np.array([2.0, 1.0, 0.5, 3.0])
print(f"Softmax: {softmax(logits).round(4)}  sum={softmax(logits).sum():.4f}")`,
        sol:`import numpy as np

x = np.linspace(-4, 4, 9)

relu    = lambda x: np.maximum(0, x)
leaky   = lambda x: np.where(x > 0, x, 0.01 * x)
sigmoid = lambda x: 1 / (1 + np.exp(-x))
tanh_fn = lambda x: np.tanh(x)
softmax = lambda x: (e := np.exp(x - x.max())) / e.sum()  # stable

for name, fn in [("ReLU",relu),("LeakyReLU",leaky),
                 ("Sigmoid",sigmoid),("Tanh",tanh_fn)]:
    print(f"{name:12}: {fn(x).round(3)}")

logits = np.array([2.0, 1.0, 0.5, 3.0])
print(f"Softmax: {softmax(logits).round(4)}  sum={softmax(logits).sum():.4f}")`,
        hint:"ReLU=np.maximum, LeakyReLU=np.where, tanh=np.tanh, Softmax: subtract max first for stability."
      },
      {
        q:`# ── ACTIVITY 4 ── Softmax & Cross-Entropy Loss ────────────
import numpy as np

logits = np.array([2.1, 0.8, -0.3, 1.5])   # raw scores
target = 0                                    # correct class index

# Numerically stable softmax:
def softmax(z):
    e = np.exp(z - ???)    # subtract ??? for stability
    return e / e.sum()

# Cross-entropy loss: L = -log(p[target])
def cross_entropy(probs, y):
    return ???

probs = softmax(logits)
loss  = cross_entropy(probs, target)

print("Probs:", probs.round(4))
print(f"Loss (CE): {loss:.4f}")
print(f"Predicted class: {np.argmax(probs)}")`,
        sol:`import numpy as np

logits = np.array([2.1, 0.8, -0.3, 1.5])
target = 0

def softmax(z):
    e = np.exp(z - z.max())   # subtract max for stability
    return e / e.sum()

def cross_entropy(probs, y):
    return -np.log(probs[y] + 1e-9)   # +ε prevents log(0)

probs = softmax(logits)
loss  = cross_entropy(probs, target)

print("Probs:", probs.round(4))    # [0.5371 0.1543 0.0514 0.2572]
print(f"Loss (CE): {loss:.4f}")   # 0.6224
print(f"Predicted class: {np.argmax(probs)}")  # 0 (correct!)`,
        hint:"Stable softmax: exp(z - max(z))/sum. Cross-entropy: -log(prob of correct class)."
      }
    ]
  },
  {
    id:"cnn",label:"CNN / VGGNet",icon:"⊞",color:C.sky,
    formula:"F[i,j] = Σₖₗ W[k,l]·X[i+k,j+l] + b   |   out_size = (W−K+2P)/S + 1",
    concept:`CNN exploits SPATIAL STRUCTURE via learnable filters sliding across input.

Key properties:
  Local connectivity  — filter sees small region (e.g. 3×3)
  Weight sharing      — same filter reused everywhere → fewer params
  Translation equiv.  — detects features regardless of location

Architecture layers:
  Conv2D   → applies K filters, each producing one feature map
  BN       → normalizes activations (faster, more stable training)
  ReLU     → non-linearity
  MaxPool  → reduces spatial size by 2×, keeps dominant features
  FC       → flatten + dense layers for final classification

VGGNet (2014) — stacks of 3×3 convs:
  Block 1: Conv(64)  → Conv(64)  → MaxPool
  Block 2: Conv(128) → Conv(128) → MaxPool
  Block 3: Conv(256) → Conv(256) → Conv(256) → MaxPool
  Block 4: Conv(512) → Conv(512) → Conv(512) → MaxPool
  Block 5: Conv(512) → Conv(512) → Conv(512) → MaxPool
  FC(4096) → FC(4096) → FC(1000) → Softmax

Why 3×3? Two 3×3 convs have same receptive field as one 5×5 but 
fewer parameters and one extra non-linearity.`,
    activities:[
      {
        q:`# ── ACTIVITY 5 ── Manual 2D Convolution ──────────────────
import numpy as np

image = np.array([
    [1,2,3,0,1],
    [4,5,6,1,2],
    [7,8,9,0,3],
    [0,1,2,4,5],
    [3,2,1,0,1]], dtype=float)

# Sobel edge-detection filter (vertical edges):
kernel = np.array([[1, 0,-1],
                   [2, 0,-2],
                   [1, 0,-1]], dtype=float)

# Convolve: no padding, stride=1 → output shape (3,3)
H, W = image.shape
kH, kW = kernel.shape
out = np.zeros((H-kH+1, W-kW+1))

# YOUR CODE: fill out[i,j]
for i in ???:
    for j in ???:
        out[i,j] = ???   # sum of element-wise product

print(out.astype(int))`,
        sol:`import numpy as np

image = np.array([
    [1,2,3,0,1],[4,5,6,1,2],[7,8,9,0,3],
    [0,1,2,4,5],[3,2,1,0,1]], dtype=float)

kernel = np.array([[1,0,-1],[2,0,-2],[1,0,-1]], dtype=float)

H, W = image.shape
kH, kW = kernel.shape
out = np.zeros((H-kH+1, W-kW+1))

for i in range(H - kH + 1):
    for j in range(W - kW + 1):
        out[i,j] = np.sum(image[i:i+kH, j:j+kW] * kernel)

print(out.astype(int))
# [[-13 -10  -3]
#  [-18 -12  -2]
#  [ -3  -7  -6]]`,
        hint:"Slice image[i:i+kH, j:j+kW] (a 3×3 patch), element-wise multiply with kernel, then np.sum."
      },
      {
        q:`# ── ACTIVITY 6 ── VGGNet Block in PyTorch ─────────────────
import torch, torch.nn as nn

class VGGBlock(nn.Module):
    """Two Conv3×3 layers with BN+ReLU, followed by MaxPool2×2."""
    def __init__(self, in_ch, out_ch):
        super().__init__()
        self.block = nn.Sequential(
            # Conv(in→out, kernel=3, padding=1 to preserve size)
            ???,
            ???,  # BatchNorm
            ???,  # ReLU
            # Conv(out→out, kernel=3, padding=1)
            ???,
            ???,
            ???,
            nn.MaxPool2d(kernel_size=2, stride=2)
        )
    def forward(self, x): return self.block(x)

# Test:
blk = VGGBlock(3, 64)
x   = torch.randn(1, 3, 224, 224)
print(blk(x).shape)    # expect torch.Size([1, 64, 112, 112])`,
        sol:`import torch, torch.nn as nn

class VGGBlock(nn.Module):
    def __init__(self, in_ch, out_ch):
        super().__init__()
        self.block = nn.Sequential(
            nn.Conv2d(in_ch, out_ch, kernel_size=3, padding=1),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True),
            nn.Conv2d(out_ch, out_ch, kernel_size=3, padding=1),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2)
        )
    def forward(self, x): return self.block(x)

blk = VGGBlock(3, 64)
x   = torch.randn(1, 3, 224, 224)
print(blk(x).shape)    # torch.Size([1, 64, 112, 112])`,
        hint:"Conv2d(in,out,3,padding=1) keeps spatial size. MaxPool2d(2,2) halves it."
      }
    ]
  },
  {
    id:"rnn",label:"RNN / LSTM",icon:"↺",color:C.violet,
    formula:"hₜ=tanh(Wₓ·xₜ+Wₕ·hₜ₋₁+b)  |  Cₜ=fₜ⊙Cₜ₋₁+iₜ⊙c̃ₜ",
    concept:`RNN processes sequences by maintaining hidden state hₜ (memory).

Vanilla RNN:
  hₜ = tanh(Wₓ·xₜ + Wₕ·hₜ₋₁ + b)
  yₜ = Wᵧ·hₜ + bᵧ

Problem: VANISHING GRADIENTS — gradients shrink exponentially 
over long sequences, making it impossible to learn long-range deps.

LSTM Solution — 4 gates control information flow:
  fₜ = σ(Wf·[hₜ₋₁,xₜ] + bf)      Forget gate  — what to erase
  iₜ = σ(Wi·[hₜ₋₁,xₜ] + bi)      Input gate   — what to write
  c̃ₜ = tanh(Wc·[hₜ₋₁,xₜ] + bc)  Candidate    — new info
  Cₜ = fₜ⊙Cₜ₋₁ + iₜ⊙c̃ₜ          Cell state   — long-term memory
  oₜ = σ(Wo·[hₜ₋₁,xₜ] + bo)      Output gate
  hₜ = oₜ⊙tanh(Cₜ)               Hidden state — short-term memory

Cell state Cₜ flows almost unchanged → gradients don't vanish!

GRU (simpler): merges forget+input into update gate z, no cell state:
  zₜ=σ(Wz·[h,x])  rₜ=σ(Wr·[h,x])  hₜ=(1-z)⊙h+(z)⊙tanh(W·[r⊙h,x])`,
    activities:[
      {
        q:`# ── ACTIVITY 7 ── Vanilla RNN Cell (NumPy) ───────────────
import numpy as np

# Params: input=4, hidden=3, sequence_length=5
np.random.seed(0)
input_size, hidden_size, seq_len = 4, 3, 5

Wx = np.random.randn(hidden_size, input_size) * 0.1   # (3,4)
Wh = np.random.randn(hidden_size, hidden_size) * 0.1  # (3,3)
b  = np.zeros(hidden_size)

X  = np.random.randn(seq_len, input_size)   # input sequence

h = np.zeros(hidden_size)   # h₀ = 0
hidden_states = []

# YOUR CODE: iterate over each timestep
for t in range(seq_len):
    h = ???   # tanh(Wx @ X[t]  +  Wh @ h  +  b)
    hidden_states.append(h.copy())

print(np.array(hidden_states).round(4))`,
        sol:`import numpy as np

np.random.seed(0)
input_size, hidden_size, seq_len = 4, 3, 5
Wx = np.random.randn(hidden_size, input_size) * 0.1
Wh = np.random.randn(hidden_size, hidden_size) * 0.1
b  = np.zeros(hidden_size)
X  = np.random.randn(seq_len, input_size)

h = np.zeros(hidden_size)
hidden_states = []

for t in range(seq_len):
    h = np.tanh(Wx @ X[t] + Wh @ h + b)
    hidden_states.append(h.copy())

print(np.array(hidden_states).round(4))`,
        hint:"h_t = np.tanh(Wx @ x_t + Wh @ h_{t-1} + b). Same W used at every timestep."
      },
      {
        q:`# ── ACTIVITY 8 ── LSTM Cell from Scratch ──────────────────
import numpy as np

sigmoid = lambda z: 1 / (1 + np.exp(-z))

def lstm_cell(x, h_prev, c_prev, params):
    """One LSTM timestep. params = dict of W and b for each gate."""
    combined = np.concatenate([h_prev, x])   # [hₜ₋₁; xₜ]

    f  = ???   # Forget gate  → sigmoid(Wf @ combined + bf)
    i  = ???   # Input gate   → sigmoid(Wi @ combined + bi)
    c_ = ???   # Candidate    → tanh(Wc @ combined + bc)
    c  = ???   # Cell state   → f⊙c_prev + i⊙c_
    o  = ???   # Output gate  → sigmoid(Wo @ combined + bo)
    h  = ???   # Hidden state → o⊙tanh(c)
    return h, c

# Init random params:
np.random.seed(1)
h_dim, x_dim = 4, 3
sz = h_dim + x_dim
p = {g: {"W": np.random.randn(sz,h_dim)*0.1, "b": np.zeros(h_dim)}
     for g in ["f","i","c","o"]}

x = np.random.randn(x_dim)
h1, c1 = lstm_cell(x, np.zeros(h_dim), np.zeros(h_dim), p)
print("h₁:", h1.round(4))
print("c₁:", c1.round(4))`,
        sol:`import numpy as np

sigmoid = lambda z: 1 / (1 + np.exp(-z))

def lstm_cell(x, h_prev, c_prev, params):
    combined = np.concatenate([h_prev, x])
    f  = sigmoid(combined @ params["f"]["W"] + params["f"]["b"])
    i  = sigmoid(combined @ params["i"]["W"] + params["i"]["b"])
    c_ = np.tanh(combined @ params["c"]["W"] + params["c"]["b"])
    c  = f * c_prev + i * c_
    o  = sigmoid(combined @ params["o"]["W"] + params["o"]["b"])
    h  = o * np.tanh(c)
    return h, c

np.random.seed(1)
h_dim, x_dim = 4, 3
sz = h_dim + x_dim
p = {g: {"W": np.random.randn(sz,h_dim)*0.1, "b": np.zeros(h_dim)}
     for g in ["f","i","c","o"]}

x = np.random.randn(x_dim)
h1, c1 = lstm_cell(x, np.zeros(h_dim), np.zeros(h_dim), p)
print("h₁:", h1.round(4))
print("c₁:", c1.round(4))`,
        hint:"Concatenate [h_prev; x] first. Forget/Input/Output gates→sigmoid. Candidate→tanh. Cell=f*c_prev+i*c_tilde."
      }
    ]
  },
  {
    id:"backprop",label:"Backpropagation",icon:"∇",color:C.orange,
    formula:"∂L/∂wᵢ = ∂L/∂a · ∂a/∂z · ∂z/∂wᵢ   |   w ← w − η·∂L/∂w",
    concept:`Backpropagation efficiently computes gradients via the CHAIN RULE applied backwards through the computation graph.

Forward pass:  z = Wx+b  →  a = σ(z)  →  L = loss(a, y)
Backward pass: compute ∂L/∂W, ∂L/∂b using chain rule

Chain rule for a layer:
  δ = ∂L/∂z = ∂L/∂a · σ'(z)     (error signal at this layer)
  ∂L/∂W = δᵀ · xᵀ               (gradient w.r.t. weights)
  ∂L/∂b = δ                       (gradient w.r.t. bias)
  ∂L/∂x = Wᵀ · δ                 (pass gradient backwards)

Gradient Descent variants:
  SGD:     w ← w − η·∇w
  Momentum: v ← βv + η·∇w;  w ← w−v
  Adam:    m=β₁m+(1-β₁)∇w;  v=β₂v+(1-β₂)∇w²;  w←w−η·m̂/√v̂

Regularization (prevent overfitting):
  L2 (weight decay): add λ·‖w‖² to loss
  Dropout: randomly zero out neurons with prob p during training
  Batch Norm: normalize layer inputs, then scale + shift`,
    activities:[
      {
        q:`# ── ACTIVITY 9 ── Manual Backprop (Scalar) ───────────────
import numpy as np

# Simple network: x → z=wx+b → a=sigmoid(z) → L=(a-y)²
x, y = 2.0, 1.0
w, b = 0.3, 0.1
lr   = 0.1

sigmoid  = lambda z: 1/(1+np.exp(-z))
sig_grad = lambda z: sigmoid(z)*(1-sigmoid(z))   # σ'(z)

# ── Forward pass ──
z = ???           # wx + b
a = ???           # sigmoid(z)
L = ???           # (a - y)^2

# ── Backward pass (chain rule) ──
dL_da = ???       # d/da [(a-y)²]  = 2(a-y)
dL_dz = ???       # dL/da · σ'(z)
dL_dw = ???       # dL/dz · x
dL_db = ???       # dL/dz · 1

# ── Update ──
w_new = w - lr * dL_dw
b_new = b - lr * dL_db

print(f"Loss: {L:.4f}")
print(f"dL/dw={dL_dw:.4f}, dL/db={dL_db:.4f}")
print(f"w: {w:.4f} → {w_new:.4f}")
print(f"b: {b:.4f} → {b_new:.4f}")`,
        sol:`import numpy as np

x, y = 2.0, 1.0
w, b = 0.3, 0.1
lr   = 0.1

sigmoid  = lambda z: 1/(1+np.exp(-z))
sig_grad = lambda z: sigmoid(z)*(1-sigmoid(z))

# Forward:
z = w*x + b              # 0.3*2 + 0.1 = 0.7
a = sigmoid(z)           # 0.6682
L = (a - y)**2           # (0.6682-1)^2 = 0.1100

# Backward:
dL_da = 2*(a - y)        # -0.6636
dL_dz = dL_da * sig_grad(z)   # -0.6636 * 0.2219 = -0.1472
dL_dw = dL_dz * x        # -0.1472 * 2 = -0.2944
dL_db = dL_dz * 1        # -0.1472

w_new = w - lr * dL_dw   # 0.3 - 0.1*(-0.2944) = 0.3294
b_new = b - lr * dL_db   # 0.1 - 0.1*(-0.1472) = 0.1147

print(f"Loss: {L:.4f}")
print(f"dL/dw={dL_dw:.4f}, dL/db={dL_db:.4f}")
print(f"w: {w:.4f} → {w_new:.4f}")
print(f"b: {b:.4f} → {b_new:.4f}")`,
        hint:"Chain rule: ∂L/∂w = ∂L/∂a · σ'(z) · x. Each step multiplies one more local gradient."
      }
    ]
  },
];

// ── STATISTICS DATA ────────────────────────────────────────────────────────────
const STAT_TOPICS = [
  {
    id:"central",label:"Mean & Median",icon:"μ",color:C.gold,
    formula:"μ=Σxᵢ/n  |  σ²=Σ(xᵢ-μ)²/n  |  Median=middle value",
    concept:`Measures of CENTRAL TENDENCY describe where data clusters.

Mean (μ) — arithmetic average:
  μ = (Σxᵢ) / n
  Sensitive to outliers.

Median — middle value after sorting:
  n odd:  x₍(n+1)/2₎
  n even: (x₍n/2₎ + x₍n/2+1₎) / 2
  Robust to outliers.

Mode — most frequent value. Data can be bimodal or multimodal.

Measures of SPREAD:
  Variance:   σ² = Σ(xᵢ−μ)²/n
  Std Dev:    σ  = √(Σ(xᵢ−μ)²/n)
  IQR:        Q3 − Q1  (interquartile range, robust)
  CV:         σ/μ × 100%  (coefficient of variation)

Skewness:
  Right-skewed: mean > median (income, house prices)
  Left-skewed:  mean < median (exam scores with ceiling)
  Symmetric:    mean ≈ median`,
    activities:[
      {
        q:`# ── ACTIVITY 10 ── Central Tendency Without Built-ins ──────
import numpy as np

data = [23,45,12,67,34,89,56,23,78,45,34,23,56,91,12,45,67,34,89,23]

# Compute WITHOUT np.mean / np.median / np.std:
n      = ???
mean   = ???
sorted_data = ???
median = ???   # handle both odd and even n

# Variance and std (formula: sum of squared deviations / n):
variance = ???
std_dev  = ???

print(f"n        = {n}")
print(f"mean     = {mean:.2f}")
print(f"median   = {median:.2f}")
print(f"variance = {variance:.2f}")
print(f"std_dev  = {std_dev:.2f}")`,
        sol:`data = [23,45,12,67,34,89,56,23,78,45,34,23,56,91,12,45,67,34,89,23]

n    = len(data)
mean = sum(data) / n

sorted_data = sorted(data)
if n % 2 == 1:
    median = sorted_data[n // 2]
else:
    median = (sorted_data[n//2 - 1] + sorted_data[n//2]) / 2

variance = sum((x - mean)**2 for x in data) / n
std_dev  = variance ** 0.5

print(f"n        = {n}")       # 20
print(f"mean     = {mean:.2f}")    # 47.50
print(f"median   = {median:.2f}")  # 45.00
print(f"variance = {variance:.2f}")# 567.45
print(f"std_dev  = {std_dev:.2f}") # 23.82`,
        hint:"Sort the list. Median: if even n, average the two middle elements. Variance: mean of (x-mean)² for each x."
      },
      {
        q:`# ── ACTIVITY 11 ── Outlier Effect: Mean vs Median ─────────
import numpy as np
from scipy import stats

# CEO effect: one extreme salary distorts the mean
salaries = [42000,45000,47000,48000,50000,
            52000,55000,58000,60000,850000]

mean_sal   = np.mean(salaries)
median_sal = np.median(salaries)
trimmed    = stats.trim_mean(salaries, 0.1)  # trim 10% each tail

# Find the outlier's Z-score:
z_scores = (np.array(salaries) - mean_sal) / np.std(salaries)

print(f"Mean          : \${mean_sal:>10,.0f}")
print(f"Median        : \${median_sal:>10,.0f}")
print(f"10% Trimmed   : \${trimmed:>10,.0f}")
print(f"CEO z-score   : {z_scores[-1]:.2f} σ from mean")
print("Best representation for 'typical salary':", ???)`,

        sol:`import numpy as np
from scipy import stats

salaries = [42000,45000,47000,48000,50000,
            52000,55000,58000,60000,850000]

mean_sal   = np.mean(salaries)
median_sal = np.median(salaries)
trimmed    = stats.trim_mean(salaries, 0.1)

z_scores = (np.array(salaries) - mean_sal) / np.std(salaries)

print(f"Mean          : \${mean_sal:>10,.0f}")  # $130,700 ← distorted!
print(f"Median        : \${median_sal:>10,.0f}") # $51,000 ← robust
print(f"10% Trimmed   : \${trimmed:>10,.0f}")   # $50,750 ← robust
print(f"CEO z-score   : {z_scores[-1]:.2f} σ from mean")  # 7.09
print("Best representation for 'typical salary': Median or Trimmed Mean")
# Lesson: when outliers exist, median/trimmed mean are better representatives`,
        hint:"stats.trim_mean(data, 0.1) removes 10% from each tail. CEO z-score > 3 = extreme outlier."
      }
    ]
  },
  {
    id:"probability",label:"Probability & Bayes",icon:"P",color:C.green,
    formula:"P(A|B) = P(B|A)·P(A) / P(B)   |   P(A∪B) = P(A)+P(B)−P(A∩B)",
    concept:`Probability quantifies likelihood of events.

Rules:
  0 ≤ P(A) ≤ 1
  P(Ω) = 1             (sample space)
  P(A∪B) = P(A)+P(B)−P(A∩B)
  Independence: P(A∩B) = P(A)·P(B)

Conditional Probability:
  P(A|B) = P(A∩B)/P(B)   "probability of A given B"

Bayes' Theorem — update beliefs with evidence:
  P(H|E) = P(E|H) · P(H) / P(E)
  
  Prior:     P(H)      — belief before evidence
  Likelihood: P(E|H)   — how probable is evidence if H true
  Posterior:  P(H|E)   — updated belief after evidence
  Evidence:   P(E) = Σ P(E|Hᵢ)·P(Hᵢ)

Law of Total Probability:
  P(B) = P(B|A)·P(A) + P(B|Aᶜ)·P(Aᶜ)

Classic distributions:
  Bernoulli: P(X=k) = pᵏ(1-p)^(1-k)
  Binomial:  P(X=k) = C(n,k)·pᵏ·(1-p)^(n-k)
  Poisson:   P(X=k) = λᵏe⁻λ/k!`,
    activities:[
      {
        q:`# ── ACTIVITY 12 ── Bayes' Theorem: Medical Test ───────────
# Disease prevalence P(Disease)     = 0.01
# Test sensitivity   P(+|Disease)   = 0.95
# False positive     P(+|NoDisease) = 0.10

P_D   = 0.01
P_pos_D   = 0.95    # P(test+ | have disease)
P_pos_noD = 0.10    # P(test+ | no disease)

# Step 1: P(no disease)
P_noD = ???

# Step 2: Law of total probability for P(test+)
P_pos = ???

# Step 3: Bayes — P(disease | test+)
P_D_given_pos = ???

print(f"P(test+)             = {P_pos:.4f}")
print(f"P(Disease | test+)   = {P_D_given_pos:.4f} ({P_D_given_pos*100:.2f}%)")
print()
print("Observation: Despite 95% sensitivity, only ~8.7% chance of disease!")
print("This is the BASE RATE FALLACY — low prevalence dominates.")`,
        sol:`P_D   = 0.01
P_pos_D   = 0.95
P_pos_noD = 0.10

P_noD = 1 - P_D      # 0.99

P_pos = P_pos_D * P_D + P_pos_noD * P_noD   # 0.0095 + 0.099 = 0.1085

P_D_given_pos = (P_pos_D * P_D) / P_pos      # 0.0095 / 0.1085 ≈ 0.0876

print(f"P(test+)             = {P_pos:.4f}")          # 0.1085
print(f"P(Disease | test+)   = {P_D_given_pos:.4f} ({P_D_given_pos*100:.2f}%)")  # 8.76%
print()
print("Observation: Despite 95% sensitivity, only ~8.7% chance of disease!")
print("Base rate P(D)=1% is so low that most positives are false positives.")`,
        hint:"P(pos) = P(+|D)·P(D) + P(+|¬D)·P(¬D). Then P(D|+) = P(+|D)·P(D)/P(pos)."
      },
      {
        q:`# ── ACTIVITY 13 ── Simulation vs Analytical Probability ───
import numpy as np

# Problem: Roll two fair dice 100,000 times.
# Estimate P(sum = 7) and compare to analytical answer.

np.random.seed(42)
n_trials = 100_000

# Simulate:
die1 = ???                          # random integers 1-6
die2 = ???
sums = ???
p_sim = ???                         # proportion where sum == 7

# Analytical: list all (d1,d2) pairs summing to 7
favorable = ???     # e.g. (1,6),(2,5),(3,4),(4,3),(5,2),(6,1)
p_analytical = ???  # favorable / 36

print(f"Simulated  P(sum=7) = {p_sim:.4f}")
print(f"Analytical P(sum=7) = {p_analytical:.4f}")
print(f"Error               = {abs(p_sim-p_analytical):.4f}")`,
        sol:`import numpy as np

np.random.seed(42)
n_trials = 100_000

die1 = np.random.randint(1, 7, n_trials)  # 1 to 6 inclusive
die2 = np.random.randint(1, 7, n_trials)
sums = die1 + die2
p_sim = np.mean(sums == 7)

favorable = [(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)]   # 6 outcomes
p_analytical = len(favorable) / 36    # 6/36 = 1/6

print(f"Simulated  P(sum=7) = {p_sim:.4f}")     # ≈ 0.1667
print(f"Analytical P(sum=7) = {p_analytical:.4f}")  # 0.1667
print(f"Error               = {abs(p_sim-p_analytical):.4f}")  # < 0.001`,
        hint:"np.random.randint(1, 7) gives uniform integers in [1,6]. np.mean(sums==7) estimates the probability."
      }
    ]
  },
  {
    id:"chisquare",label:"Chi-Square Test",icon:"χ²",color:C.orange,
    formula:"χ²=Σ(O−E)²/E   df=(r−1)(c−1)   E[i,j]=rowᵢ·colⱼ/N",
    concept:`Chi-square test assesses whether observed frequencies differ from expected.

GOODNESS-OF-FIT — does data follow hypothesized distribution?
  H₀: data follows the expected distribution
  χ² = Σᵢ (Oᵢ − Eᵢ)²/Eᵢ
  df = k − 1   (k = number of categories)

TEST OF INDEPENDENCE — are two categorical variables independent?
  H₀: variable A and variable B are independent
  Expected: Eᵢⱼ = (row i total × col j total) / grand total
  χ² = Σᵢⱼ (Oᵢⱼ − Eᵢⱼ)²/Eᵢⱼ
  df = (rows − 1)(cols − 1)

Decision:
  Reject H₀ if χ² > χ²_critical  or  if p-value < α
  α = 0.05 most common

Critical values (α=0.05):
  df=1: 3.841   df=3: 7.815
  df=2: 5.991   df=5: 11.070

Assumptions:
  • Expected frequency ≥ 5 in each cell
  • Independent observations
  • Random sampling`,
    activities:[
      {
        q:`# ── ACTIVITY 14 ── Goodness-of-Fit: Is the Die Fair? ──────
from scipy.stats import chisquare
import numpy as np

# Die rolled 120 times:
observed = np.array([25, 17, 22, 18, 26, 12])
expected = np.array([20, 20, 20, 20, 20, 20])   # uniform

# Manual chi-square:
chi2_manual = ???
df          = ???

# Scipy verification:
chi2_sp, p_val = chisquare(observed, f_exp=expected)

print(f"Manual χ²   = {chi2_manual:.4f}")
print(f"Scipy  χ²   = {chi2_sp:.4f}")
print(f"p-value     = {p_val:.4f}")
print(f"df          = {df}")
print(f"Critical value (α=0.05, df={df}): 11.0705")
print(f"Decision: {'Reject H₀ — unfair die' if p_val < 0.05 else 'Fail to reject H₀ — fair die'}")`,
        sol:`from scipy.stats import chisquare
import numpy as np

observed = np.array([25, 17, 22, 18, 26, 12])
expected = np.array([20, 20, 20, 20, 20, 20])

chi2_manual = np.sum((observed - expected)**2 / expected)   # 5.70
df          = len(observed) - 1                              # 5

chi2_sp, p_val = chisquare(observed, f_exp=expected)

print(f"Manual χ²   = {chi2_manual:.4f}")  # 5.7000
print(f"Scipy  χ²   = {chi2_sp:.4f}")
print(f"p-value     = {p_val:.4f}")         # 0.3370
print(f"df          = {df}")                # 5
print(f"Critical value (α=0.05, df=5): 11.0705")
print(f"Decision: Fail to reject H₀ — fair die")
# p=0.337 > 0.05 → no significant evidence of unfairness`,
        hint:"χ² = np.sum((O-E)**2 / E). df = categories - 1. Reject if χ² > critical or p < 0.05."
      },
      {
        q:`# ── ACTIVITY 15 ── Independence Test: Contingency Table ───
import numpy as np
from scipy.stats import chi2_contingency

# Preference (A vs B) by Gender (M vs F)
#         Pref_A  Pref_B
# Male      30      10
# Female    20      40
table = np.array([[30, 10],
                  [20, 40]])

chi2, p, dof, expected = chi2_contingency(table)

print(f"χ²              = {chi2:.4f}")
print(f"p-value         = {p:.4f}")
print(f"Degrees of freedom = {dof}")
print("Expected table:")
print(expected.round(2))
print(f"Decision: {'Reject H₀ — association exists' if p < 0.05 else 'Fail to reject H₀'}")

# Compute expected manually to verify:
N = table.sum()
row_totals = ???    # sum across columns for each row
col_totals = ???    # sum across rows for each column
E_manual   = ???    # outer product / N
print("Manual expected:"); print(E_manual.round(2))`,
        sol:`import numpy as np
from scipy.stats import chi2_contingency

table = np.array([[30, 10], [20, 40]])
chi2, p, dof, expected = chi2_contingency(table)

print(f"χ²              = {chi2:.4f}")     # 18.6667
print(f"p-value         = {p:.4f}")         # 0.0000
print(f"Degrees of freedom = {dof}")        # 1
print("Expected table:"); print(expected.round(2))
print(f"Decision: Reject H₀ — association exists")

N          = table.sum()                            # 100
row_totals = table.sum(axis=1, keepdims=True)       # [[40],[60]]
col_totals = table.sum(axis=0, keepdims=True)       # [[50,50]]
E_manual   = row_totals * col_totals / N            # outer product/N
print("Manual expected:"); print(E_manual.round(2))
# [[20, 20], [30, 30]]`,
        hint:"E[i,j] = row_total[i] * col_total[j] / N. Use keepdims=True and broadcasting."
      }
    ]
  },
  {
    id:"normal",label:"Normal Distribution",icon:"🔔",color:C.rose,
    formula:"f(x)=e^{−(x−μ)²/2σ²}/(σ√2π)   z=(x−μ)/σ   CLT: x̄~N(μ,σ²/n)",
    concept:`Normal (Gaussian) distribution N(μ, σ²) — most important distribution in statistics.

PDF: f(x) = exp(−(x−μ)²/2σ²) / (σ√2π)
CDF: Φ(x) = ∫₋∞ˣ f(t) dt  — no closed form, use tables/scipy

Empirical Rule (68-95-99.7):
  P(μ−1σ < X < μ+1σ) = 68.27%
  P(μ−2σ < X < μ+2σ) = 95.45%
  P(μ−3σ < X < μ+3σ) = 99.73%

Z-score (standardization):
  z = (x − μ) / σ   → transforms to Standard Normal N(0,1)
  Then use standard normal table or scipy.stats.norm.cdf(z)

Central Limit Theorem (CLT) — arguably the most important theorem in statistics:
  If X₁,...,Xₙ are i.i.d. with mean μ and variance σ²,
  then as n → ∞:  x̄ ~ N(μ, σ²/n)
  Standard Error:  SE = σ/√n

CLT holds regardless of the shape of the original distribution!
Rule of thumb: n ≥ 30 is usually sufficient.`,
    activities:[
      {
        q:`# ── ACTIVITY 16 ── Normal Distribution & Z-scores ─────────
from scipy.stats import norm
import numpy as np

# Exam scores: N(μ=72, σ=9)
mu, sigma = 72, 9

# Q1: P(score > 85)?
p_above_85  = ???

# Q2: P(60 < score < 80)?
p_between   = ???

# Q3: Score at the 90th percentile?
score_90th  = ???

# Q4: Student scored 88. What percentile?
pct_88      = ???

# Q5: How many std devs is 88 from the mean? (Z-score)
z_88        = ???

print(f"P(score > 85)       = {p_above_85*100:.2f}%")
print(f"P(60 < score < 80)  = {p_between*100:.2f}%")
print(f"90th percentile     = {score_90th:.2f}")
print(f"Percentile of 88    = {pct_88*100:.2f}th")
print(f"Z-score of 88       = {z_88:.4f}")`,
        sol:`from scipy.stats import norm
import numpy as np

mu, sigma = 72, 9

p_above_85  = 1 - norm.cdf(85, mu, sigma)           # 7.36%
p_between   = norm.cdf(80, mu, sigma) - norm.cdf(60, mu, sigma)  # 67.70%
score_90th  = norm.ppf(0.90, mu, sigma)              # 83.54
pct_88      = norm.cdf(88, mu, sigma)                # 96.16th
z_88        = (88 - mu) / sigma                      # 1.7778

print(f"P(score > 85)       = {p_above_85*100:.2f}%")  # 7.36%
print(f"P(60 < score < 80)  = {p_between*100:.2f}%")   # 67.70%
print(f"90th percentile     = {score_90th:.2f}")        # 83.54
print(f"Percentile of 88    = {pct_88*100:.2f}th")      # 96.16th
print(f"Z-score of 88       = {z_88:.4f}")              # 1.7778`,
        hint:"norm.cdf(x,μ,σ) for area. norm.ppf(p,μ,σ) for quantile (inverse CDF). P(a<X<b)=cdf(b)-cdf(a)."
      },
      {
        q:`# ── ACTIVITY 17 ── Central Limit Theorem Simulation ────────
import numpy as np

# Population: heavily right-skewed (Exponential, mean=2)
np.random.seed(42)
population = np.random.exponential(scale=2, size=100_000)
pop_mean   = population.mean()
pop_std    = population.std()

print(f"Population: mean={pop_mean:.3f}, std={pop_std:.3f}, skew≠0")
print()

for n in [2, 5, 30, 100]:
    # Draw 5000 samples of size n, compute their means:
    sample_means    = [np.random.choice(population, n, replace=False).mean()
                       for _ in range(5000)]
    sm_arr          = np.array(sample_means)
    theoretical_se  = pop_std / np.sqrt(n)

    print(f"n={n:3d}  |  x̄={sm_arr.mean():.3f}  "
          f"SE={sm_arr.std():.3f}  (theory={theoretical_se:.3f})  "
          f"skew≈{((sm_arr-sm_arr.mean())**3).mean()/sm_arr.std()**3:.2f}")`,
        sol:`import numpy as np

np.random.seed(42)
population = np.random.exponential(scale=2, size=100_000)
pop_mean   = population.mean()
pop_std    = population.std()

print(f"Population: mean={pop_mean:.3f}, std={pop_std:.3f}")
print()

for n in [2, 5, 30, 100]:
    sample_means = [np.random.choice(population, n, replace=False).mean()
                    for _ in range(5000)]
    sm_arr = np.array(sample_means)
    theoretical_se = pop_std / np.sqrt(n)
    skew = ((sm_arr - sm_arr.mean())**3).mean() / sm_arr.std()**3

    print(f"n={n:3d}  |  x̄={sm_arr.mean():.3f}  "
          f"SE={sm_arr.std():.3f}  (theory={theoretical_se:.3f})  "
          f"skew≈{skew:.2f}")
# n=2:  skew≈1.4 — still skewed
# n=30: skew≈0.3 — approximately normal (CLT kicks in)
# n=100:skew≈0.1 — very close to normal`,
        hint:"SE = σ/√n. Watch how skewness approaches 0 as n grows — that's CLT in action."
      }
    ]
  },
  {
    id:"normalization",label:"Normalization & Scaling",icon:"≡",color:C.teal,
    formula:"z=(x−μ)/σ  |  x̂=(x−min)/(max−min)  |  robust=(x−Q2)/(Q3−Q1)",
    concept:`Scaling brings features to compatible ranges — critical for gradient descent and distance-based methods.

Method          Formula                      Range     When to Use
───────────────────────────────────────────────────────────────────
Min-Max         (x−min)/(max−min)            [0,1]     Known bounds
Z-score (std.)  (x−μ)/σ                      ~N(0,1)   Gaussian data
Robust          (x−Q2)/(Q3−Q1)               varies    Outlier-heavy
L2 Norm         x/‖x‖₂                       ‖·‖=1     Cosine similarity
Log transform   log(1+x)                      varies    Skewed/count data
Power (Box-Cox) (xλ−1)/λ                     varies    Normalization

Batch Normalization (in neural nets):
  For mini-batch B = {x₁,...,xₘ}:
  μ_B = (1/m)Σxᵢ
  σ²_B = (1/m)Σ(xᵢ−μ_B)²
  x̂ᵢ = (xᵢ−μ_B)/√(σ²_B+ε)
  yᵢ = γx̂ᵢ + β    (learnable γ, β)

Layer Normalization: same but over features, not batch items.
  Used in Transformers where batch size may be 1.`,
    activities:[
      {
        q:`# ── ACTIVITY 18 ── All Scalers from Scratch ────────────────
import numpy as np

data = np.array([5, 200, 18, 45, 1200, 32, 78, 950, 12, 400], dtype=float)

# 1. Min-Max Scaling → [0, 1]
minmax = ???

# 2. Z-score Standardization → N(0, 1)
zscore = ???

# 3. Robust Scaling → use Q1, Q3
Q1, Q3 = ???, ???
robust = ???

# 4. L2 Normalization → unit norm
l2 = ???

# 5. Log Transform → compress large values
log_t = ???

for name, arr in [("Min-Max",minmax),("Z-score",zscore),
                  ("Robust", robust),("L2",l2),("Log",log_t)]:
    print(f"{name:9}: min={arr.min():7.3f}  max={arr.max():7.3f}  "
          f"mean={arr.mean():7.3f}")`,
        sol:`import numpy as np

data = np.array([5, 200, 18, 45, 1200, 32, 78, 950, 12, 400], dtype=float)

minmax = (data - data.min()) / (data.max() - data.min())
zscore = (data - data.mean()) / data.std()
Q1, Q3 = np.percentile(data, 25), np.percentile(data, 75)
robust = (data - np.median(data)) / (Q3 - Q1)
l2     = data / np.linalg.norm(data)
log_t  = np.log1p(data)   # log(1+x) — handles 0 safely

for name, arr in [("Min-Max",minmax),("Z-score",zscore),
                  ("Robust", robust),("L2",l2),("Log",log_t)]:
    print(f"{name:9}: min={arr.min():7.3f}  max={arr.max():7.3f}  "
          f"mean={arr.mean():7.3f}")`,
        hint:"L2 norm = np.linalg.norm(data). Robust uses median and IQR=Q3-Q1. np.log1p = log(1+x)."
      }
    ]
  }
];

// ── INTERACTIVE DEMOS ─────────────────────────────────────────────────────────

function WeightBiasDemo() {
  const [w1,setW1]=useState(0.5);
  const [w2,setW2]=useState(-0.3);
  const [b,setB]=useState(0.1);
  const x1=0.8, x2=0.6;
  const z=w1*x1+w2*x2+b;
  const relu=Math.max(0,z);
  const sig=1/(1+Math.exp(-z));
  const tanh=Math.tanh(z);
  const sl=(lbl,val,set,mn=-2,mx=2)=>(
    <div style={{marginBottom:10}}>
      <div style={{display:"flex",justifyContent:"space-between",fontFamily:"JetBrains Mono",fontSize:11,marginBottom:3}}>
        <span style={{color:C.dim}}>{lbl}</span>
        <span style={{color:C.gold}}>{val.toFixed(2)}</span>
      </div>
      <input type="range" min={mn} max={mx} step={0.01} value={val}
        onChange={e=>set(+e.target.value)} style={{width:"100%",accentColor:C.gold}}/>
    </div>
  );
  return (
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
      <div>
        {sl("w₁ (weight, x₁=0.8 fixed)",w1,setW1)}
        {sl("w₂ (weight, x₂=0.6 fixed)",w2,setW2)}
        {sl("b  (bias)",b,setB,-1,1)}
      </div>
      <div style={{background:C.bg,borderRadius:10,padding:14,fontFamily:"JetBrains Mono",fontSize:11}}>
        <div style={{color:C.dim,fontSize:9,marginBottom:8,letterSpacing:"0.08em"}}>FORWARD COMPUTATION</div>
        <div style={{color:C.text,marginBottom:4}}>
          z = {w1.toFixed(2)}×0.8 + {w2.toFixed(2)}×0.6 + {b.toFixed(2)}
        </div>
        <div style={{fontSize:16,fontWeight:700,color:C.gold,margin:"6px 0"}}>z = {z.toFixed(4)}</div>
        <div style={{height:1,background:C.border,margin:"8px 0"}}/>
        <div style={{color:C.teal,marginBottom:3}}>ReLU   = {relu.toFixed(4)}</div>
        <div style={{color:C.rose,marginBottom:3}}>σ(z)   = {sig.toFixed(4)}</div>
        <div style={{color:C.violet}}>tanh   = {tanh.toFixed(4)}</div>
        <div style={{marginTop:10,padding:7,borderRadius:6,background:z>0?C.teal+"18":C.rose+"18",fontSize:10,color:z>0?C.teal:C.rose}}>
          {z>0?"✓ Neuron ACTIVE — ReLU passes signal":"✗ Neuron DEAD under ReLU (output=0)"}
        </div>
      </div>
    </div>
  );
}

function ActivationViz() {
  const [sel,setSel]=useState("ReLU");
  const fns={
    ReLU: {fn:x=>Math.max(0,x),col:C.teal},
    Sigmoid:{fn:x=>1/(1+Math.exp(-x)),col:C.rose},
    Tanh:{fn:x=>Math.tanh(x),col:C.gold},
    GELU:{fn:x=>0.5*x*(1+Math.tanh(Math.sqrt(2/Math.PI)*(x+0.044715*x**3))),col:C.violet},
    "Leaky ReLU":{fn:x=>x>0?x:0.01*x,col:C.sky},
  };
  const W=280,H=120,range=[-4,4],steps=80;
  const pts=Array.from({length:steps},(_,i)=>{const x=range[0]+(i/(steps-1))*(range[1]-range[0]);return{x,y:fns[sel].fn(x)};});
  const ys=pts.map(p=>p.y),yMin=Math.min(...ys),yMax=Math.max(...ys);
  const sx=x=>(x-range[0])/(range[1]-range[0])*W;
  const sy=y=>H-(y-yMin)/(yMax-yMin+0.001)*H;
  const d=pts.map((p,i)=>`${i===0?"M":"L"}${sx(p.x).toFixed(1)},${sy(p.y).toFixed(1)}`).join(" ");
  return (
    <div>
      <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
        {Object.keys(fns).map(k=>(
          <button key={k} onClick={()=>setSel(k)} style={{
            padding:"4px 10px",borderRadius:6,cursor:"pointer",fontFamily:"JetBrains Mono",fontSize:10,
            background:sel===k?fns[k].col+"28":"transparent",
            color:sel===k?fns[k].col:C.dim,border:`1px solid ${sel===k?fns[k].col:C.border}`
          }}>{k}</button>
        ))}
      </div>
      <svg width={W} height={H} style={{background:C.bg,borderRadius:8,border:`1px solid ${C.border}`,display:"block"}}>
        <line x1={0} y1={sy(0)} x2={W} y2={sy(0)} stroke={C.muted} strokeWidth={1}/>
        <line x1={sx(0)} y1={0} x2={sx(0)} y2={H} stroke={C.muted} strokeWidth={1}/>
        <path d={d} fill="none" stroke={fns[sel].col} strokeWidth={2.5}/>
      </svg>
      <div style={{fontFamily:"JetBrains Mono",fontSize:9,color:C.dim,marginTop:5}}>
        x ∈ [{range[0]}, {range[1]}]  · <span style={{color:fns[sel].col}}>{sel}</span>
      </div>
    </div>
  );
}

function ConvDemo() {
  const presets=[
    [[0,1,0],[1,-4,1],[0,1,0]],  // Laplacian
    [[1,0,-1],[2,0,-2],[1,0,-1]],// Sobel-x
    [[-1,-1,-1],[-1,8,-1],[-1,-1,-1]], // Sharpen
    [[1,1,1],[1,1,1],[1,1,1]],   // Box blur
  ];
  const names=["Laplacian","Sobel-X","Sharpen","Box Blur"];
  const [ki,setKi]=useState(0);
  const image=[[4,8,4,3,2],[3,9,7,2,1],[2,6,8,4,3],[1,3,5,7,4],[2,1,3,5,6]];
  const kernel=presets[ki];
  const oH=3,oW=3,kS=3;
  const output=Array.from({length:oH},(_,i)=>Array.from({length:oW},(_,j)=>
    Array.from({length:kS},(_,ki2)=>Array.from({length:kS},(_,kj)=>image[i+ki2][j+kj]*kernel[ki2][kj])).flat().reduce((a,b)=>a+b,0)
  ));
  const flat=output.flat(),mn=Math.min(...flat),mx=Math.max(...flat);
  const norm=v=>(v-mn)/(mx-mn+0.001);
  return (
    <div>
      <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
        {names.map((n,i)=>(
          <button key={n} onClick={()=>setKi(i)} style={{
            padding:"4px 10px",borderRadius:6,cursor:"pointer",fontFamily:"JetBrains Mono",fontSize:10,
            background:ki===i?C.sky+"28":"transparent",color:ki===i?C.sky:C.dim,border:`1px solid ${ki===i?C.sky:C.border}`
          }}>{n}</button>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"auto auto auto",gap:20,alignItems:"start"}}>
        {[{label:"Input (5×5)",grid:image,color:C.sky,norm:false},
          {label:`Kernel (3×3) — ${names[ki]}`,grid:kernel,color:C.gold,norm:false},
          {label:"Feature Map (3×3)",grid:output,color:C.teal,norm:true}
        ].map(({label,grid,color,norm:doNorm})=>(
          <div key={label}>
            <div style={{fontFamily:"JetBrains Mono",fontSize:9,color,marginBottom:6}}>{label}</div>
            <div style={{display:"grid",gridTemplateColumns:`repeat(${grid[0].length},1fr)`,gap:2}}>
              {grid.map((row,i)=>row.map((v,j)=>(
                <div key={`${i}-${j}`} style={{
                  width:30,height:26,display:"flex",alignItems:"center",justifyContent:"center",
                  borderRadius:4,fontFamily:"JetBrains Mono",fontSize:9,
                  background:doNorm?`rgba(45,212,191,${(0.15+norm(v)*0.85).toFixed(2)})`:
                    v>0?`${color}28`:v<0?`${C.rose}28`:`${C.muted}44`,
                  color:doNorm?"#0c0f14":v!==0?color:C.dim,fontWeight:doNorm?"700":"400"
                }}>{typeof v==="number"?v.toFixed(0):v}</div>
              )))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NormalViz() {
  const [mu,setMu]=useState(0);
  const [sigma,setSigma]=useState(1);
  const W=300,H=120;
  const pdf=x=>Math.exp(-0.5*((x-mu)/sigma)**2)/(sigma*Math.sqrt(2*Math.PI));
  const range=[-5,5],steps=120;
  const pts=Array.from({length:steps},(_,i)=>{const x=range[0]+(i/(steps-1))*(range[1]-range[0]);return{x,y:pdf(x)};});
  const yMax=Math.max(...pts.map(p=>p.y));
  const sx=x=>(x-range[0])/(range[1]-range[0])*W;
  const sy=y=>H-8-(y/yMax)*(H-16);
  const d=pts.map((p,i)=>`${i===0?"M":"L"}${sx(p.x).toFixed(1)},${sy(p.y).toFixed(1)}`).join(" ");
  const fill=d+` L${sx(range[1])},${H} L${sx(range[0])},${H} Z`;
  return (
    <div>
      <svg width={W} height={H} style={{background:C.bg,borderRadius:8,border:`1px solid ${C.border}`,display:"block"}}>
        <path d={fill} fill={`${C.rose}20`}/>
        <path d={d} fill="none" stroke={C.rose} strokeWidth={2.5}/>
        <line x1={sx(mu)} y1={0} x2={sx(mu)} y2={H} stroke={C.gold} strokeWidth={1.5} strokeDasharray="5 3"/>
        <line x1={sx(mu-sigma)} y1={0} x2={sx(mu-sigma)} y2={H} stroke={C.teal} strokeWidth={1} strokeDasharray="4 3" opacity={0.7}/>
        <line x1={sx(mu+sigma)} y1={0} x2={sx(mu+sigma)} y2={H} stroke={C.teal} strokeWidth={1} strokeDasharray="4 3" opacity={0.7}/>
        <text x={sx(mu)+3} y={15} fontFamily="JetBrains Mono" fontSize={9} fill={C.gold}>μ</text>
        <text x={sx(mu+sigma)+2} y={H-4} fontFamily="JetBrains Mono" fontSize={8} fill={C.teal}>+σ</text>
        <text x={sx(mu-sigma)-16} y={H-4} fontFamily="JetBrains Mono" fontSize={8} fill={C.teal}>−σ</text>
      </svg>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:10}}>
        {[["μ (mean)",mu,setMu,-3,3],["σ (std dev)",sigma,setSigma,0.3,3]].map(([l,v,s,mn,mx])=>(
          <div key={l}>
            <div style={{display:"flex",justifyContent:"space-between",fontFamily:"JetBrains Mono",fontSize:10,marginBottom:3}}>
              <span style={{color:C.dim}}>{l}</span><span style={{color:C.rose}}>{v.toFixed(2)}</span>
            </div>
            <input type="range" min={mn} max={mx} step={0.05} value={v}
              onChange={e=>s(+e.target.value)} style={{width:"100%",accentColor:C.rose}}/>
          </div>
        ))}
      </div>
      <div style={{fontFamily:"JetBrains Mono",fontSize:9,color:C.dim,marginTop:8}}>
        68% within ±1σ = [{(mu-sigma).toFixed(1)}, {(mu+sigma).toFixed(1)}]
      </div>
    </div>
  );
}

function ChiSquareViz() {
  const obs=[25,17,22,18,26,12],exp_=[20,20,20,20,20,20];
  const chi2=obs.reduce((s,o,i)=>s+(o-exp_[i])**2/exp_[i],0);
  const maxV=Math.max(...obs,...exp_);
  return (
    <div>
      <div style={{display:"flex",gap:4,alignItems:"flex-end",height:90,marginBottom:8}}>
        {obs.map((o,i)=>(
          <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
            <div style={{width:"100%",background:C.orange+"aa",height:`${(o/maxV)*80}px`,borderRadius:"3px 3px 0 0",display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:2}}>
              <span style={{fontFamily:"JetBrains Mono",fontSize:8,color:"#0c0f14",fontWeight:700}}>{o}</span>
            </div>
            <div style={{width:"100%",background:C.teal+"66",height:`${(exp_[i]/maxV)*80}px`,borderRadius:"0 0 3px 3px",display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:2}}>
              <span style={{fontFamily:"JetBrains Mono",fontSize:7,color:"#0c0f14"}}>{exp_[i]}</span>
            </div>
            <div style={{fontFamily:"JetBrains Mono",fontSize:8,color:C.dim}}>f{i+1}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",fontFamily:"JetBrains Mono",fontSize:10}}>
        <span><span style={{color:C.orange}}>■</span> Observed</span>
        <span><span style={{color:C.teal}}>■</span> Expected</span>
        <span style={{marginLeft:"auto",color:C.gold}}>χ² = {chi2.toFixed(3)}</span>
        <span style={{color:chi2>11.07?C.rose:C.green}}>p≈{chi2>11.07?"<0.05 Reject H₀":">0.05 Fail to Reject"}</span>
      </div>
      <div style={{fontFamily:"JetBrains Mono",fontSize:9,color:C.dim,marginTop:6}}>df=5, α=0.05 critical value = 11.070</div>
    </div>
  );
}

function BayesViz() {
  const [pD,setPD]=useState(0.01);
  const [sens,setSens]=useState(0.95);
  const [fpr,setFpr]=useState(0.10);
  const pPos=sens*pD+fpr*(1-pD);
  const pDpos=(sens*pD)/pPos;
  const sl=(l,v,s,mn,mx,c)=>(
    <div style={{marginBottom:10}}>
      <div style={{display:"flex",justifyContent:"space-between",fontFamily:"JetBrains Mono",fontSize:10,marginBottom:3}}>
        <span style={{color:C.dim}}>{l}</span><span style={{color:c}}>{(v*100).toFixed(1)}%</span>
      </div>
      <input type="range" min={mn} max={mx} step={0.001} value={v}
        onChange={e=>s(+e.target.value)} style={{width:"100%",accentColor:c}}/>
    </div>
  );
  return (
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
      <div>
        {sl("P(Disease) — Prevalence",pD,setPD,0.001,0.5,C.rose)}
        {sl("P(+|Disease) — Sensitivity",sens,setSens,0.5,1,C.teal)}
        {sl("P(+|¬Disease) — False Pos.",fpr,setFpr,0.01,0.5,C.orange)}
      </div>
      <div style={{background:C.bg,borderRadius:10,padding:14,fontFamily:"JetBrains Mono",fontSize:11}}>
        <div style={{color:C.dim,fontSize:9,marginBottom:6}}>P(Disease | Positive Test)</div>
        <div style={{fontSize:24,fontWeight:700,color:pDpos<0.5?C.rose:C.green,fontFamily:"Fraunces"}}>
          {(pDpos*100).toFixed(1)}%
        </div>
        <div style={{color:C.dim,fontSize:9,marginTop:3}}>P(+) = {(pPos*100).toFixed(2)}%</div>
        <div style={{marginTop:10,height:6,background:C.muted,borderRadius:3}}>
          <div style={{width:`${pDpos*100}%`,height:"100%",background:pDpos<0.5?C.rose:C.green,borderRadius:3,transition:"width 0.3s"}}/>
        </div>
        <div style={{marginTop:8,fontSize:9,color:C.text,lineHeight:1.6,background:C.muted+"33",padding:8,borderRadius:6}}>
          {pDpos<0.1?"⚠ Base rate effect: low prevalence means most + tests are false positives":
           pDpos<0.5?"→ Moderate PPV — follow-up testing recommended":
           "✓ High PPV — positive test is meaningful evidence"}
        </div>
      </div>
    </div>
  );
}

function NormalizationDemo() {
  const raw=[5,200,18,45,1200,32,78,950,12,400];
  const mn=Math.min(...raw),mx=Math.max(...raw);
  const mean=raw.reduce((a,b)=>a+b,0)/raw.length;
  const std=Math.sqrt(raw.reduce((s,x)=>s+(x-mean)**2,0)/raw.length);
  const sorted=[...raw].sort((a,b)=>a-b);
  const Q1=sorted[2],Q3=sorted[7];
  const l2n=Math.sqrt(raw.reduce((s,x)=>s+x*x,0));
  const [sel,setSel]=useState("Min-Max");
  const methods={"Min-Max":{fn:x=>(x-mn)/(mx-mn),col:C.teal},"Z-Score":{fn:x=>(x-mean)/std,col:C.rose},"Robust":{fn:x=>(x-sorted[4])/(Q3-Q1),col:C.gold},"L2":{fn:x=>x/l2n,col:C.violet}};
  const transformed=raw.map(methods[sel].fn);
  const tMn=Math.min(...transformed),tMx=Math.max(...transformed);
  const normFn=v=>(v-tMn)/(tMx-tMn+0.001);
  return (
    <div>
      <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
        {Object.keys(methods).map(k=>(
          <button key={k} onClick={()=>setSel(k)} style={{
            padding:"4px 10px",borderRadius:6,cursor:"pointer",fontFamily:"JetBrains Mono",fontSize:10,
            background:sel===k?methods[k].col+"28":"transparent",color:sel===k?methods[k].col:C.dim,border:`1px solid ${sel===k?methods[k].col:C.border}`
          }}>{k}</button>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
        {raw.map((v,i)=>(
          <div key={i} style={{display:"flex",gap:8,alignItems:"center"}}>
            <span style={{fontFamily:"JetBrains Mono",fontSize:10,color:C.dim,minWidth:38,textAlign:"right"}}>{v}</span>
            <span style={{color:C.muted}}>→</span>
            <div style={{flex:1,height:16,background:C.muted+"44",borderRadius:3,overflow:"hidden"}}>
              <div style={{width:`${Math.max(2,normFn(transformed[i])*100)}%`,height:"100%",background:methods[sel].col,borderRadius:3,transition:"width 0.4s"}}/>
            </div>
            <span style={{fontFamily:"JetBrains Mono",fontSize:10,color:methods[sel].col,minWidth:52}}>{transformed[i].toFixed(3)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RNNViz() {
  const seq=["x₁","x₂","x₃","x₄"];
  const [step,setStep]=useState(0);
  const cols=[C.teal,C.gold,C.violet,C.rose];
  return (
    <div>
      <div style={{display:"flex",gap:12,alignItems:"flex-end",marginBottom:16}}>
        {seq.map((x,i)=>(
          <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
            <div style={{fontFamily:"JetBrains Mono",fontSize:9,color:C.dim}}>t={i+1}</div>
            <div style={{
              width:44,height:44,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",
              fontFamily:"JetBrains Mono",fontSize:12,fontWeight:700,
              border:`2px solid ${i<=step?cols[i]:C.border}`,
              background:i<=step?cols[i]+"22":"transparent",color:i<=step?cols[i]:C.muted,transition:"all 0.3s"
            }}>{x}</div>
            <div style={{
              width:44,height:32,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",
              fontFamily:"JetBrains Mono",fontSize:10,
              border:`1px solid ${i<=step?cols[i]:C.border}`,
              background:i<=step?cols[i]+"15":"transparent",color:i<=step?cols[i]:C.muted,transition:"all 0.3s"
            }}>h{i+1}</div>
            {i<seq.length-1&&<div style={{fontFamily:"JetBrains Mono",fontSize:8,color:i<step?cols[i]:C.muted}}>carries→</div>}
          </div>
        ))}
      </div>
      <div style={{fontFamily:"JetBrains Mono",fontSize:11,color:C.text,padding:"10px 12px",background:C.bg,borderRadius:8,marginBottom:10}}>
        {step<seq.length?<>t={step+1}: <span style={{color:cols[step]}}>h{step+1}</span> = tanh(Wₓ·<span style={{color:cols[step]}}>{seq[step]}</span> + Wₕ·h{step} + b)</>:"✓ Sequence processed. Final h₄ = context vector."}
      </div>
      <div style={{display:"flex",gap:6}}>
        <button onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0} style={{flex:1,padding:"6px",borderRadius:6,border:`1px solid ${C.border}`,background:"transparent",color:step===0?C.muted:C.text,cursor:step===0?"not-allowed":"pointer",fontFamily:"JetBrains Mono",fontSize:11}}>← Back</button>
        <button onClick={()=>setStep(s=>Math.min(seq.length,s+1))} disabled={step>=seq.length} style={{flex:1,padding:"6px",borderRadius:6,border:`1px solid ${C.violet}`,background:C.violet+"22",color:C.violet,cursor:step>=seq.length?"not-allowed":"pointer",fontFamily:"JetBrains Mono",fontSize:11}}>Next →</button>
        <button onClick={()=>setStep(0)} style={{padding:"6px 12px",borderRadius:6,border:`1px solid ${C.border}`,background:"transparent",color:C.dim,cursor:"pointer",fontFamily:"JetBrains Mono",fontSize:11}}>↺</button>
      </div>
    </div>
  );
}

function BackpropViz() {
  const [lr,setLr]=useState(0.1);
  const [steps,setSteps]=useState(0);
  const [history,setHistory]=useState([]);
  let w=0.3,b2=0.1;
  const x=2.0,y=1.0;
  const sigmoid=z=>1/(1+Math.exp(-z));
  const run=()=>{
    const newH=[];
    let ww=0.3,bb=0.1;
    for(let i=0;i<20;i++){
      const z=ww*x+bb; const a=sigmoid(z); const L=(a-y)**2;
      const da=2*(a-y); const dz=da*a*(1-a);
      ww-=lr*dz*x; bb-=lr*dz;
      newH.push({step:i+1,loss:L.toFixed(4),w:ww.toFixed(4),b:bb.toFixed(4)});
    }
    setHistory(newH); setSteps(20);
  };
  const reset=()=>{setHistory([]);setSteps(0);};
  return (
    <div>
      <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:12}}>
        <div style={{fontFamily:"JetBrains Mono",fontSize:10,color:C.dim}}>η (learning rate)</div>
        <input type="range" min={0.01} max={0.5} step={0.01} value={lr} onChange={e=>setLr(+e.target.value)} style={{accentColor:C.orange,flex:1}}/>
        <span style={{fontFamily:"JetBrains Mono",fontSize:10,color:C.orange,minWidth:36}}>{lr}</span>
        <button onClick={run} style={{padding:"5px 12px",borderRadius:6,background:C.orange+"22",border:`1px solid ${C.orange}`,color:C.orange,fontFamily:"JetBrains Mono",fontSize:10,cursor:"pointer"}}>▶ Run 20 Steps</button>
        <button onClick={reset} style={{padding:"5px 10px",borderRadius:6,background:"transparent",border:`1px solid ${C.border}`,color:C.dim,fontFamily:"JetBrains Mono",fontSize:10,cursor:"pointer"}}>↺</button>
      </div>
      {history.length>0&&(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",fontFamily:"JetBrains Mono",fontSize:9,color:C.dim,marginBottom:4,padding:"0 4px"}}>
            <span>Step</span><span>Loss</span><span>w</span><span>b</span>
          </div>
          <div style={{maxHeight:160,overflowY:"auto",display:"flex",flexDirection:"column",gap:2}}>
            {history.map((h,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 8px",borderRadius:5,background:C.bg,fontFamily:"JetBrains Mono",fontSize:10}}>
                <span style={{color:C.dim}}>#{h.step}</span>
                <span style={{color:+h.loss<0.01?C.green:+h.loss<0.1?C.gold:C.rose}}>{h.loss}</span>
                <span style={{color:C.teal}}>{h.w}</span>
                <span style={{color:C.violet}}>{h.b}</span>
              </div>
            ))}
          </div>
          <div style={{fontFamily:"JetBrains Mono",fontSize:9,color:C.dim,marginTop:6}}>
            Loss after 20 steps: <span style={{color:+history[history.length-1]?.loss<0.01?C.green:C.gold}}>{history[history.length-1]?.loss}</span>
          </div>
        </div>
      )}
      {history.length===0&&<div style={{fontFamily:"JetBrains Mono",fontSize:11,color:C.dim,padding:16,textAlign:"center"}}>Click ▶ to simulate gradient descent on a single neuron.</div>}
    </div>
  );
}

const DEMO_MAP = {
  weights:WeightBiasDemo, activation:ActivationViz, cnn:ConvDemo,
  rnn:RNNViz, backprop:BackpropViz,
  central:()=><NormalViz/>, probability:BayesViz, chisquare:ChiSquareViz,
  normal:NormalViz, normalization:NormalizationDemo,
};

// ── ACTIVITY CARD ─────────────────────────────────────────────────────────────
function ActivityCard({act,idx,color}) {
  const [showSol,setShowSol]=useState(false);
  const [showHint,setShowHint]=useState(false);
  const [copied,setCopied]=useState(false);
  const copy=text=>{navigator.clipboard.writeText(text);setCopied(true);setTimeout(()=>setCopied(false),1400);};
  return (
    <div style={{border:`1px solid ${color}30`,borderRadius:12,overflow:"hidden",background:C.card,marginBottom:14}}>
      <div style={{padding:"10px 16px",background:color+"12",borderBottom:`1px solid ${color}22`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:6}}>
        <div style={{fontFamily:"JetBrains Mono",fontSize:11,color,fontWeight:700}}>🎯 Activity {idx+1}</div>
        <div style={{display:"flex",gap:6}}>
          {!showSol&&<button onClick={()=>setShowHint(h=>!h)} style={{padding:"3px 9px",borderRadius:5,border:`1px solid ${C.gold}55`,background:showHint?C.gold+"22":"transparent",color:C.gold,fontFamily:"JetBrains Mono",fontSize:10,cursor:"pointer"}}>💡 {showHint?"Hide Hint":"Hint"}</button>}
          <button onClick={()=>{setShowSol(s=>!s);setShowHint(false);}} style={{padding:"3px 9px",borderRadius:5,border:`1px solid ${showSol?C.rose+"66":color+"44"}`,background:showSol?C.rose+"18":color+"0f",color:showSol?C.rose:color,fontFamily:"JetBrains Mono",fontSize:10,cursor:"pointer"}}>{showSol?"🔒 Hide Solution":"🔓 Show Solution"}</button>
        </div>
      </div>
      {showHint&&!showSol&&(
        <div style={{padding:"8px 16px",background:C.gold+"0a",borderBottom:`1px solid ${C.gold}22`}}>
          <div style={{fontFamily:"JetBrains Mono",fontSize:9,color:C.gold,marginBottom:3}}>💡 HINT</div>
          <div style={{fontFamily:"JetBrains Mono",fontSize:11,color:C.text}}>{act.hint}</div>
        </div>
      )}
      <div style={{position:"relative"}}>
        <pre style={{margin:0,padding:"14px 16px",overflowX:"auto",fontFamily:"JetBrains Mono",fontSize:11.5,lineHeight:1.7,background:showSol?"#081508":"#0c0f14",color:showSol?C.green:C.text,maxHeight:320,borderBottom:`1px solid ${showSol?C.green+"22":C.border}`}}>
          <code>{showSol?act.sol:act.q}</code>
        </pre>
        <button onClick={()=>copy(showSol?act.sol:act.q)} style={{position:"absolute",top:8,right:8,padding:"2px 8px",borderRadius:4,border:`1px solid ${C.border}`,background:C.panel,color:copied?C.green:C.dim,fontFamily:"JetBrains Mono",fontSize:9,cursor:"pointer"}}>{copied?"✓":"Copy"}</button>
      </div>
      {showSol&&<div style={{padding:"8px 16px",background:C.green+"08",display:"flex",alignItems:"center",gap:6}}>
        <span style={{color:C.green}}>✓</span>
        <span style={{fontFamily:"JetBrains Mono",fontSize:10,color:C.green}}>Run in Python to verify output</span>
      </div>}
    </div>
  );
}

// ── TOPIC PANEL ───────────────────────────────────────────────────────────────
function TopicPanel({topic}) {
  const [tab,setTab]=useState("concept");
  const Demo=DEMO_MAP[topic.id];
  return (
    <div style={{animation:"slideIn 0.25s ease"}}>
      <div style={{display:"flex",alignItems:"flex-start",gap:14,marginBottom:20,padding:"16px 20px",background:topic.color+"0a",border:`1px solid ${topic.color}28`,borderRadius:12}}>
        <div style={{fontSize:24,flexShrink:0}}>{topic.icon}</div>
        <div style={{flex:1}}>
          <div style={{fontFamily:"JetBrains Mono",fontSize:13,color:topic.color,fontWeight:700}}>{topic.label}</div>
          <div style={{fontFamily:"JetBrains Mono",fontSize:10,color:C.dim,marginTop:4,lineHeight:1.5}}>{topic.formula}</div>
        </div>
      </div>
      <div style={{display:"flex",gap:4,marginBottom:16,background:C.bg,borderRadius:8,padding:4,width:"fit-content"}}>
        {["concept","demo","activities"].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{padding:"6px 14px",borderRadius:6,border:"none",cursor:"pointer",fontFamily:"JetBrains Mono",fontSize:10,background:tab===t?topic.color+"22":"transparent",color:tab===t?topic.color:C.dim,transition:"all 0.2s"}}>
            {t==="concept"?"📖 Concept":t==="demo"?"⚡ Demo":"🎯 Activities"}
          </button>
        ))}
      </div>
      {tab==="concept"&&(
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:20}}>
          <pre style={{fontFamily:"JetBrains Mono",fontSize:12,lineHeight:1.9,color:C.text,whiteSpace:"pre-wrap",margin:0}}>{topic.concept}</pre>
        </div>
      )}
      {tab==="demo"&&Demo&&(
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:20}}>
          <div style={{fontFamily:"JetBrains Mono",fontSize:9,color:C.dim,marginBottom:14,letterSpacing:"0.08em"}}>◈ INTERACTIVE DEMO</div>
          <Demo/>
        </div>
      )}
      {tab==="activities"&&(
        <div>{topic.activities.map((act,i)=><ActivityCard key={i} act={act} idx={i} color={topic.color}/>)}</div>
      )}
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
function Classroom() {
  const [section,setSection]=useState("dl");
  const [activeDL,setActiveDL]=useState("weights");
  const [activeST,setActiveST]=useState("central");
  const [visitedDL,setVisitedDL]=useState(new Set(["weights"]));
  const [visitedST,setVisitedST]=useState(new Set(["central"]));

  const pickDL=id=>{setActiveDL(id);setVisitedDL(s=>new Set([...s,id]));};
  const pickST=id=>{setActiveST(id);setVisitedST(s=>new Set([...s,id]));};

  const dlTopic=DL_TOPICS.find(t=>t.id===activeDL);
  const stTopic=STAT_TOPICS.find(t=>t.id===activeST);

  const totalActs=DL_TOPICS.reduce((s,t)=>s+t.activities.length,0)+STAT_TOPICS.reduce((s,t)=>s+t.activities.length,0);

  return (
    <>
      <style>{`
        ${FONTS}
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:${C.bg};}
        @keyframes slideIn{from{opacity:0;transform:translateX(10px)}to{opacity:1;transform:translateX(0)}}
        ::-webkit-scrollbar{width:4px;height:4px;}
        ::-webkit-scrollbar-track{background:${C.bg};}
        ::-webkit-scrollbar-thumb{background:${C.muted};border-radius:2px;}
        input[type=range]{-webkit-appearance:none;appearance:none;height:3px;border-radius:2px;background:${C.muted};outline:none;cursor:pointer;}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:12px;height:12px;border-radius:50%;background:currentColor;cursor:pointer;}
      `}</style>
      <div style={{display:"flex",height:"100vh",overflow:"hidden",background:C.bg}}>

        {/* ── SIDEBAR ── */}
        <div style={{width:218,flexShrink:0,background:C.panel,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          {/* Logo */}
          <div style={{padding:"16px 16px 12px",borderBottom:`1px solid ${C.border}`}}>
            <div style={{fontFamily:"Fraunces",fontSize:17,fontWeight:600,color:C.text,lineHeight:1.2}}>
              ML/DL <em style={{color:C.gold,fontWeight:300}}>Classroom</em>
            </div>
            <div style={{fontFamily:"JetBrains Mono",fontSize:8,color:C.dim,marginTop:4}}>
              {DL_TOPICS.length} DL · {STAT_TOPICS.length} Stats · {totalActs} Activities
            </div>
          </div>

          {/* Section tabs */}
          <div style={{padding:"8px 10px",display:"flex",gap:4,borderBottom:`1px solid ${C.border}`}}>
            {[["dl","⬡ Deep Learning",C.teal],["stats","∑ Statistics",C.gold],["index","⊞ Index",C.green]].map(([s,l,c])=>(
              <button key={s} onClick={()=>setSection(s)} style={{flex:1,padding:"5px 3px",borderRadius:6,border:`1px solid ${section===s?c:C.border}`,background:section===s?c+"20":"transparent",color:section===s?c:C.dim,fontFamily:"JetBrains Mono",fontSize:7.5,cursor:"pointer",lineHeight:1.4,transition:"all 0.2s"}}>{l}</button>
            ))}
          </div>

          {/* Nav items */}
          <div style={{flex:1,overflowY:"auto",padding:"8px 8px 8px"}}>
            {section==="dl"&&(
              <>
                <div style={{fontFamily:"JetBrains Mono",fontSize:8,color:C.dim,padding:"4px 8px",marginBottom:4,letterSpacing:"0.06em"}}>
                  DEEP LEARNING — {visitedDL.size}/{DL_TOPICS.length} visited
                </div>
                {DL_TOPICS.map(t=>(
                  <button key={t.id} onClick={()=>pickDL(t.id)} style={{
                    display:"flex",alignItems:"center",gap:9,padding:"8px 10px",borderRadius:7,
                    border:"none",cursor:"pointer",textAlign:"left",width:"100%",marginBottom:2,
                    background:activeDL===t.id?t.color+"1a":"transparent",transition:"all 0.2s"
                  }}>
                    <span style={{fontSize:14,width:18,color:activeDL===t.id?t.color:C.dim}}>{t.icon}</span>
                    <span style={{fontFamily:"JetBrains Mono",fontSize:10,color:activeDL===t.id?t.color:C.dim,fontWeight:activeDL===t.id?"700":"400"}}>{t.label}</span>
                    {visitedDL.has(t.id)&&activeDL!==t.id&&<span style={{marginLeft:"auto",fontSize:8,color:t.color+"66"}}>✓</span>}
                    {activeDL===t.id&&<span style={{marginLeft:"auto",width:3,height:14,borderRadius:2,background:t.color,flexShrink:0}}/>}
                  </button>
                ))}
              </>
            )}
            {section==="stats"&&(
              <>
                <div style={{fontFamily:"JetBrains Mono",fontSize:8,color:C.dim,padding:"4px 8px",marginBottom:4,letterSpacing:"0.06em"}}>
                  STATISTICS — {visitedST.size}/{STAT_TOPICS.length} visited
                </div>
                {STAT_TOPICS.map(t=>(
                  <button key={t.id} onClick={()=>pickST(t.id)} style={{
                    display:"flex",alignItems:"center",gap:9,padding:"8px 10px",borderRadius:7,
                    border:"none",cursor:"pointer",textAlign:"left",width:"100%",marginBottom:2,
                    background:activeST===t.id?t.color+"1a":"transparent",transition:"all 0.2s"
                  }}>
                    <span style={{fontSize:14,width:18,color:activeST===t.id?t.color:C.dim}}>{t.icon}</span>
                    <span style={{fontFamily:"JetBrains Mono",fontSize:10,color:activeST===t.id?t.color:C.dim,fontWeight:activeST===t.id?"700":"400"}}>{t.label}</span>
                    {visitedST.has(t.id)&&activeST!==t.id&&<span style={{marginLeft:"auto",fontSize:8,color:t.color+"66"}}>✓</span>}
                    {activeST===t.id&&<span style={{marginLeft:"auto",width:3,height:14,borderRadius:2,background:t.color,flexShrink:0}}/>}
                  </button>
                ))}
              </>
            )}
            {section==="index"&&(
              <div>
                <div style={{fontFamily:"JetBrains Mono",fontSize:8,color:C.dim,padding:"4px 8px",marginBottom:8,letterSpacing:"0.06em"}}>ALL PYTHON ACTIVITIES</div>
                {[...DL_TOPICS,...STAT_TOPICS].flatMap(t=>t.activities.map((a,i)=>({t,a,i}))).map(({t,a,i},gi)=>(
                  <button key={gi} onClick={()=>{if(DL_TOPICS.find(x=>x.id===t.id)){setSection("dl");pickDL(t.id);}else{setSection("stats");pickST(t.id);}}} style={{
                    display:"block",width:"100%",textAlign:"left",padding:"7px 10px",borderRadius:7,marginBottom:3,
                    border:`1px solid ${t.color}22`,background:t.color+"08",cursor:"pointer"
                  }}>
                    <div style={{fontFamily:"JetBrains Mono",fontSize:8,color:t.color,marginBottom:2}}>{t.icon} {t.label}</div>
                    <div style={{fontFamily:"JetBrains Mono",fontSize:9,color:C.dim,lineHeight:1.4}}>
                      {a.q.split("\n")[1]?.replace("# ","")?.slice(0,38)??"Activity "+(i+1)}...
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick ref footer */}
          <div style={{borderTop:`1px solid ${C.border}`,padding:"10px 12px",fontFamily:"JetBrains Mono",fontSize:8,color:C.dim,lineHeight:1.8}}>
            <div style={{color:C.teal+"99",marginBottom:2}}>KEY FORMULAS</div>
            z=Wx+b · a=σ(z)<br/>
            ∂L/∂w=δ·xᵀ<br/>
            CLT: x̄~N(μ,σ²/n)<br/>
            χ²=Σ(O-E)²/E<br/>
            P(A|B)=P(B|A)P(A)/P(B)
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div style={{flex:1,overflowY:"auto",padding:"24px 28px",minWidth:0}}>
          {/* Header */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22,paddingBottom:14,borderBottom:`1px solid ${C.border}`}}>
            <div>
              <div style={{fontFamily:"Fraunces",fontSize:20,fontWeight:600,color:C.text}}>
                {section==="dl"?"Deep Learning Algorithms":section==="stats"?"Statistical Foundations":"Activity Index"}
              </div>
              <div style={{fontFamily:"JetBrains Mono",fontSize:9,color:C.dim,marginTop:3}}>
                {section==="dl"?"Weights · Activations · CNN · VGGNet · RNN · LSTM · Backprop":
                 section==="stats"?"Central Tendency · Probability · Chi-Square · Normal · Normalization":
                 "Click any activity to navigate to its topic"}
              </div>
            </div>
            <div style={{fontFamily:"JetBrains Mono",fontSize:9,color:C.dim,padding:"5px 10px",border:`1px solid ${C.border}`,borderRadius:6,background:C.panel}}>
              {new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}
            </div>
          </div>

          {section==="dl"&&dlTopic&&<TopicPanel key={activeDL} topic={dlTopic}/>}
          {section==="stats"&&stTopic&&<TopicPanel key={activeST} topic={stTopic}/>}
          {section==="index"&&(
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
              {[...DL_TOPICS,...STAT_TOPICS].flatMap(t=>t.activities.map((a,i)=>({t,a,i}))).map(({t,a,i},gi)=>(
                <div key={gi} onClick={()=>{if(DL_TOPICS.find(x=>x.id===t.id)){setSection("dl");pickDL(t.id);}else{setSection("stats");pickST(t.id);}}}
                  style={{background:C.card,border:`1px solid ${t.color}28`,borderRadius:10,padding:"14px 16px",cursor:"pointer",transition:"all 0.2s"}}>
                  <div style={{fontFamily:"JetBrains Mono",fontSize:9,color:t.color,marginBottom:6}}>{t.icon} {t.label} — Activity {i+1}</div>
                  <div style={{fontFamily:"JetBrains Mono",fontSize:11,color:C.text,lineHeight:1.5,marginBottom:8}}>
                    {a.q.split("\n").slice(1,2).join("").replace("# ","").replace(/─+/g,"").trim()}
                  </div>
                  <div style={{fontFamily:"JetBrains Mono",fontSize:8,color:C.dim}}>
                    💡 Hint available · 🔓 Solution hidden → click to open
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT REFERENCE PANEL ── */}
        <div style={{width:182,flexShrink:0,background:C.panel,borderLeft:`1px solid ${C.border}`,padding:"14px 10px",overflowY:"auto"}}>
          <div style={{fontFamily:"JetBrains Mono",fontSize:8,color:C.dim,marginBottom:10,letterSpacing:"0.08em"}}>QUICK REFERENCE</div>
          {[
            {l:"Neuron z",f:"Wx + b",c:C.teal},
            {l:"ReLU",f:"max(0, x)",c:C.teal},
            {l:"Sigmoid",f:"1/(1+e⁻ˣ)",c:C.rose},
            {l:"Softmax",f:"eˣⁱ/Σeˣʲ",c:C.violet},
            {l:"Conv",f:"ΣW·X + b",c:C.sky},
            {l:"LSTM Cell",f:"f⊙C+i⊙c̃",c:C.violet},
            {l:"Backprop",f:"∂L/∂w=δ·xᵀ",c:C.orange},
            {l:"Mean μ",f:"Σxᵢ/n",c:C.gold},
            {l:"Std σ",f:"√Σ(x-μ)²/n",c:C.gold},
            {l:"Z-score",f:"(x-μ)/σ",c:C.rose},
            {l:"Bayes",f:"P(B|A)P(A)/P(B)",c:C.green},
            {l:"Chi-Sq",f:"Σ(O-E)²/E",c:C.orange},
            {l:"Min-Max",f:"(x-min)/(max-min)",c:C.teal},
            {l:"CLT SE",f:"σ/√n",c:C.rose},
          ].map(({l,f,c})=>(
            <div key={l} style={{marginBottom:6,padding:"6px 8px",borderRadius:6,background:C.card,border:`1px solid ${C.border}`}}>
              <div style={{fontFamily:"JetBrains Mono",fontSize:7.5,color:c,marginBottom:1}}>{l}</div>
              <div style={{fontFamily:"JetBrains Mono",fontSize:9,color:C.text}}>{f}</div>
            </div>
          ))}
          <div style={{marginTop:12,padding:"10px 8px",borderRadius:8,background:C.bg,border:`1px solid ${C.border}`,fontFamily:"JetBrains Mono",fontSize:7.5,color:C.dim,lineHeight:1.8}}>
            <span style={{color:C.gold}}>RULES OF THUMB</span><br/>
            n≥30 for CLT<br/>
            p&lt;0.05 reject H₀<br/>
            E≥5 for χ²<br/>
            df=(r-1)(c-1)<br/>
            |z|&gt;3 = outlier<br/>
            Overfit→Dropout/L2<br/>
            Vanish→LSTM/ResNet
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================
// FILE: 37. Neural Networks
// ============================================================


// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS  —  Blueprint / Technical Schematic Aesthetic
// ─────────────────────────────────────────────────────────────────────────────
const T = {
  bg:      "#030b15",
  grid:    "#081c30",
  surface: "#071424",
  card:    "#0a1e35",
  cardHov: "#0e2843",
  border:  "#163556",
  cyan:    "#00d4f0",
  cyanDim: "#0099b3",
  cyanFaint:"#00d4f022",
  green:   "#2ecc71",
  greenDim:"#1a7a44",
  orange:  "#ff7b35",
  yellow:  "#ffd60a",
  purple:  "#b87aff",
  red:     "#ff4444",
  text:    "#c8e6ff",
  textSoft:"#6a9fc0",
  textDim: "#304a60",
  mono:    "'Courier New', monospace",
  serif:   "'Georgia', serif",
  inputC:  "#00d4f0",
  hiddenC: "#ffd60a",
  outputC: "#2ecc71",
  lossC:   "#ff7b35",
  gradC:   "#ff4444",
};

// ─────────────────────────────────────────────────────────────────────────────
// MATH HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const tanhFn   = x => Math.tanh(x);
const mse      = (pred, target) => 0.5 * Math.pow(pred - target, 2);
const fmtNN      = (n, d = 4) => Number(n).toFixed(d);
const fmtS     = (n, d = 3) => Number(n).toFixed(d);

// Fixed network for all examples
// Architecture: 2 → 2 → 1
const INIT_W = {
  // hidden layer weights [neuron][input]
  w: [[0.5, 0.3], [-0.4, 0.7]],
  b_h: [0.1, -0.1],
  // output layer weights [input]
  v: [0.6, -0.2],
  b_o: 0.2,
};

function forwardPass(x1, x2, W = INIT_W) {
  const { w, b_h, v, b_o } = W;
  const z_h1 = w[0][0] * x1 + w[0][1] * x2 + b_h[0];
  const z_h2 = w[1][0] * x1 + w[1][1] * x2 + b_h[1];
  const a_h1 = sigmoid(z_h1);
  const a_h2 = sigmoid(z_h2);
  const z_o  = v[0] * a_h1 + v[1] * a_h2 + b_o;
  const a_o  = sigmoid(z_o);
  return { z_h1, z_h2, a_h1, a_h2, z_o, a_o };
}

function backprop(x1, x2, target, W = INIT_W) {
  const { w, b_h, v, b_o } = W;
  const { z_h1, z_h2, a_h1, a_h2, z_o, a_o } = forwardPass(x1, x2, W);
  const loss = mse(a_o, target);

  // Output layer gradients
  const dL_dao  = a_o - target;                  // dLoss/d(a_o)
  const dao_dzo = a_o * (1 - a_o);              // sigmoid derivative
  const delta_o = dL_dao * dao_dzo;              // output error term

  const dL_dv0 = delta_o * a_h1;
  const dL_dv1 = delta_o * a_h2;
  const dL_dbo = delta_o;

  // Hidden layer gradients (backprop through output weights)
  const dL_dah1 = delta_o * v[0];
  const dL_dah2 = delta_o * v[1];

  const dah1_dzh1 = a_h1 * (1 - a_h1);  // sigmoid derivative
  const dah2_dzh2 = a_h2 * (1 - a_h2);

  const delta_h1 = dL_dah1 * dah1_dzh1;
  const delta_h2 = dL_dah2 * dah2_dzh2;

  const dL_dw00 = delta_h1 * x1;
  const dL_dw01 = delta_h1 * x2;
  const dL_dw10 = delta_h2 * x1;
  const dL_dw11 = delta_h2 * x2;

  return {
    loss, dL_dao, dao_dzo, delta_o,
    dL_dv0, dL_dv1, dL_dbo,
    dL_dah1, dL_dah2,
    dah1_dzh1, dah2_dzh2,
    delta_h1, delta_h2,
    dL_dw00, dL_dw01, dL_dw10, dL_dw11,
    a_o, a_h1, a_h2, z_h1, z_h2, z_o
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED UI COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const BlueprintBg = () => (
  <div style={{
    position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
    backgroundImage: `
      linear-gradient(${T.grid} 1px, transparent 1px),
      linear-gradient(90deg, ${T.grid} 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
    opacity: 0.6,
  }} />
);

const CornerMark = ({ pos }) => {
  const styles = {
    tl: { top: 8, left: 8, borderTop: `1px solid ${T.cyanDim}`, borderLeft: `1px solid ${T.cyanDim}` },
    tr: { top: 8, right: 8, borderTop: `1px solid ${T.cyanDim}`, borderRight: `1px solid ${T.cyanDim}` },
    bl: { bottom: 8, left: 8, borderBottom: `1px solid ${T.cyanDim}`, borderLeft: `1px solid ${T.cyanDim}` },
    br: { bottom: 8, right: 8, borderBottom: `1px solid ${T.cyanDim}`, borderRight: `1px solid ${T.cyanDim}` },
  };
  return <div style={{ position: "absolute", width: 12, height: 12, ...styles[pos] }} />;
};

const Card = ({ children, color = T.border, style = {} }) => (
  <div style={{
    background: T.card, border: `1px solid ${color}`,
    borderRadius: 8, padding: "16px 20px", position: "relative",
    ...style
  }}>
    <CornerMark pos="tl" /><CornerMark pos="tr" />
    <CornerMark pos="bl" /><CornerMark pos="br" />
    {children}
  </div>
);

const Label = ({ children, color = T.cyan, style = {} }) => (
  <div style={{
    fontFamily: T.mono, fontSize: 10, letterSpacing: 3,
    color, marginBottom: 6, ...style
  }}>{children}</div>
);

const Badge = ({ children, color = T.cyan }) => (
  <span style={{
    display: "inline-block", padding: "2px 9px",
    border: `1px solid ${color}55`, borderRadius: 3,
    fontFamily: T.mono, fontSize: 10, color, letterSpacing: 1,
    background: `${color}15`, marginRight: 6,
  }}>{children}</span>
);

const MathBlock = ({ lines, title, note, color = T.cyan }) => (
  <div style={{ margin: "10px 0" }}>
    {title && (
      <div style={{
        fontFamily: T.mono, fontSize: 9, color, letterSpacing: 3,
        borderBottom: `1px solid ${color}33`, paddingBottom: 4, marginBottom: 0
      }}>{title}</div>
    )}
    <pre style={{
      background: "#020810", border: `1px solid ${color}33`,
      borderTop: title ? "none" : `1px solid ${color}33`,
      borderRadius: title ? "0 0 6px 6px" : 6,
      margin: 0, padding: "12px 16px",
      fontFamily: T.mono, fontSize: 12.5, color: T.text,
      lineHeight: 1.9, overflowX: "auto",
    }}>{lines}</pre>
    {note && (
      <div style={{
        fontFamily: T.mono, fontSize: 10, color: T.textSoft,
        padding: "4px 8px", background: `${color}08`,
        border: `1px solid ${color}22`, borderTop: "none", borderRadius: "0 0 4px 4px"
      }}>{note}</div>
    )}
  </div>
);

const InfoBox = ({ icon, title, body, color = T.cyan }) => (
  <div style={{
    background: `${color}0a`, border: `1px solid ${color}33`,
    borderLeft: `3px solid ${color}`, borderRadius: 6, padding: "12px 16px",
    margin: "10px 0"
  }}>
    <div style={{ fontFamily: T.mono, fontSize: 10, color, letterSpacing: 2, marginBottom: 6 }}>
      {icon} {title}
    </div>
    <div style={{ color: T.text, fontSize: 13, lineHeight: 1.75 }}>{body}</div>
  </div>
);

const StepBtn = ({ onClick, disabled, dir }) => (
  <button onClick={onClick} disabled={disabled} style={{
    padding: "8px 20px", fontFamily: T.mono, fontSize: 12,
    background: disabled ? T.surface : dir === "next" ? `${T.cyan}22` : T.card,
    border: `1px solid ${disabled ? T.border : dir === "next" ? T.cyan : T.border}`,
    color: disabled ? T.textDim : dir === "next" ? T.cyan : T.text,
    borderRadius: 6, cursor: disabled ? "default" : "pointer",
    letterSpacing: 1,
  }}>
    {dir === "prev" ? "← PREV" : "NEXT →"}
  </button>
);

const Progress = ({ current, total, color = T.cyan }) => (
  <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
    {Array.from({ length: total }, (_, i) => (
      <div key={i} style={{
        width: i === current ? 24 : 8, height: 4, borderRadius: 2,
        background: i <= current ? color : T.border,
        transition: "all 0.3s",
      }} />
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// NETWORK SVG DIAGRAM
// ─────────────────────────────────────────────────────────────────────────────
function NetworkSVG({
  x1 = 0.6, x2 = 0.8,
  fwd = null,
  highlightPath = null, // "forward" | "backward" | null
  showValues = false,
  pulseLayer = -1,
  animating = false,
  compact = false,
}) {
  const W = compact ? 440 : 560;
  const H = compact ? 220 : 280;
  const r = compact ? 18 : 22;

  // Node positions
  const lx = [compact ? 60 : 70, compact ? 200 : 240, compact ? 340 : 420, compact ? 380 : 490];
  const nodes = {
    x1: { x: lx[0], y: H * 0.35, c: T.inputC,  lbl: "x₁", val: fmtS(x1) },
    x2: { x: lx[0], y: H * 0.68, c: T.inputC,  lbl: "x₂", val: fmtS(x2) },
    h1: { x: lx[2], y: H * 0.30, c: T.hiddenC, lbl: "h₁", val: fwd ? fmtS(fwd.a_h1) : "?" },
    h2: { x: lx[2], y: H * 0.70, c: T.hiddenC, lbl: "h₂", val: fwd ? fmtS(fwd.a_h2) : "?" },
    o:  { x: lx[3], y: H * 0.50, c: T.outputC, lbl: "ŷ",  val: fwd ? fmtS(fwd.a_o) : "?" },
  };

  const edges = [
    { f: nodes.x1, t: nodes.h1, wLbl: "w₁₁=0.5",  li: 0 },
    { f: nodes.x1, t: nodes.h2, wLbl: "w₂₁=-0.4", li: 0 },
    { f: nodes.x2, t: nodes.h1, wLbl: "w₁₂=0.3",  li: 0 },
    { f: nodes.x2, t: nodes.h2, wLbl: "w₂₂=0.7",  li: 0 },
    { f: nodes.h1, t: nodes.o,  wLbl: "v₁=0.6",   li: 1 },
    { f: nodes.h2, t: nodes.o,  wLbl: "v₂=-0.2",  li: 1 },
  ];

  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!animating) return;
    const id = setInterval(() => setTick(t => (t + 1) % 60), 80);
    return () => clearInterval(id);
  }, [animating]);

  const pulseProgress = (tick % 60) / 60;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
      <defs>
        <filter id="glow2">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="softglow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Faint grid */}
      {Array.from({ length: 14 }, (_, i) => (
        <line key={i} x1={0} y1={i * 20} x2={W} y2={i * 20} stroke={T.grid} strokeWidth={0.4} opacity={0.6} />
      ))}
      {Array.from({ length: 30 }, (_, i) => (
        <line key={i} x1={i * 20} y1={0} x2={i * 20} y2={H} stroke={T.grid} strokeWidth={0.4} opacity={0.6} />
      ))}

      {/* Layer column backgrounds */}
      {[{ x: lx[0], c: T.inputC }, { x: lx[2], c: T.hiddenC }, { x: lx[3], c: T.outputC }].map((lc, i) => (
        <rect key={i} x={lc.x - r - 6} y={8} width={(r + 6) * 2} height={H - 16}
          rx={4} fill={`${lc.c}05`} stroke={`${lc.c}15`} strokeWidth={1} />
      ))}

      {/* Edges */}
      {edges.map((e, idx) => {
        const isBack = highlightPath === "backward";
        const isFwd  = highlightPath === "forward";
        const active = (isFwd && e.li === 0) || (isFwd && e.li === 1) ||
                       (isBack && e.li === 1) || (isBack && e.li === 0);
        const col = isBack ? T.orange : e.f.c;
        const mx = (e.f.x + e.t.x) / 2;
        const my = (e.f.y + e.t.y) / 2;

        // Animated pulse dot
        const px = e.f.x + (e.t.x - e.f.x) * (isBack ? (1 - pulseProgress) : pulseProgress);
        const py = e.f.y + (e.t.y - e.f.y) * (isBack ? (1 - pulseProgress) : pulseProgress);

        return (
          <g key={idx}>
            <line
              x1={e.f.x + (isBack ? -r : r)} y1={e.f.y}
              x2={e.t.x + (isBack ? r : -r)}  y2={e.t.y}
              stroke={active ? col : T.border}
              strokeWidth={active ? 1.5 : 0.7}
              opacity={active ? 0.7 : 0.3}
            />
            {/* Weight label */}
            {!compact && (
              <text x={mx} y={my - 5} textAnchor="middle"
                fill={active ? col : T.textDim} fontSize="7"
                fontFamily={T.mono} opacity={active ? 1 : 0.5}>
                {e.wLbl}
              </text>
            )}
            {/* Pulse dot */}
            {animating && active && (
              <circle cx={px} cy={py} r={3} fill={col} opacity={0.9} filter="url(#softglow)" />
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {Object.entries(nodes).map(([key, n]) => {
        const isHL = pulseLayer >= 0;
        return (
          <g key={key} filter="url(#softglow)">
            <circle cx={n.x} cy={n.y} r={r}
              fill={T.surface} stroke={n.c} strokeWidth={2}
              opacity={0.95}
            />
            <circle cx={n.x} cy={n.y} r={r - 4}
              fill={`${n.c}10`} stroke="none" />
            <text x={n.x} y={n.y - (showValues ? 5 : 2)} textAnchor="middle"
              fill={n.c} fontSize={compact ? 9 : 11} fontFamily={T.mono} fontWeight="bold">
              {n.lbl}
            </text>
            {showValues && (
              <text x={n.x} y={n.y + 11} textAnchor="middle"
                fill={T.text} fontSize={compact ? 7 : 8} fontFamily={T.mono}>
                {n.val}
              </text>
            )}
          </g>
        );
      })}

      {/* Layer labels */}
      {[
        { x: lx[0], lbl: "INPUT",  c: T.inputC },
        { x: lx[2], lbl: "HIDDEN", c: T.hiddenC },
        { x: lx[3], lbl: "OUTPUT", c: T.outputC },
      ].map((l, i) => (
        <text key={i} x={l.x} y={H - 6} textAnchor="middle"
          fill={l.c} fontSize="7" fontFamily={T.mono} letterSpacing="2" opacity={0.8}>
          {l.lbl}
        </text>
      ))}

      {/* Direction arrow label */}
      {highlightPath && (
        <text x={W / 2} y={16} textAnchor="middle"
          fill={highlightPath === "forward" ? T.cyan : T.orange}
          fontSize="8" fontFamily={T.mono} letterSpacing="2">
          {highlightPath === "forward" ? "► FORWARD PASS — DATA FLOWS →" : "◄ BACKPROPAGATION — GRADIENTS FLOW ←"}
        </text>
      )}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 0 — OVERVIEW
// ─────────────────────────────────────────────────────────────────────────────
function SectionOverview() {
  const [hov, setHov] = useState(null);
  const cards = [
    {
      icon: "🧠", key: "what", color: T.cyan,
      title: "What is it?",
      short: "A system that learns from examples — like a brain made of math.",
      detail: `A feedforward neural network (also called a Multilayer Perceptron or MLP) is a
collection of connected \"neurons\" organized into layers. Data enters from the
left, flows through hidden layers where computations happen, and exits as a
prediction. No loops, no memory — just a straight flow from input to output.`,
    },
    {
      icon: "🎯", key: "why", color: T.yellow,
      title: "Why do we use it?",
      short: "To learn complex patterns that humans can't program by hand.",
      detail: `Computers are normally programmed with explicit rules: \"if X then do Y\". But
some problems — like recognizing a handwritten digit — have too many rules to
write by hand. Neural networks learn the rules automatically from examples.
You show it 10,000 labeled pictures and it figures out the patterns itself.`,
    },
    {
      icon: "⚙️", key: "how", color: T.green,
      title: "How does it work?",
      short: "Two phases: Forward Pass (guess) + Backpropagation (improve).",
      detail: `Step 1 — FORWARD PASS: Feed input data through the network layer by layer
to produce a prediction.
Step 2 — CALCULATE LOSS: Compare the prediction to the correct answer and
compute an error score (the \"loss\").
Step 3 — BACKPROPAGATION: Send the error backwards through the network,
computing how much each weight was responsible.
Step 4 — UPDATE WEIGHTS: Nudge each weight slightly in the direction that
reduces the error. Repeat thousands of times.`,
    },
  ];

  const cycle = [
    { icon: "📥", lbl: "INPUT DATA",        sub: "Raw features",         c: T.inputC },
    { icon: "→",  lbl: null,                sub: null,                   c: T.textDim },
    { icon: "🔢", lbl: "FORWARD PASS",      sub: "Compute prediction",   c: T.cyan },
    { icon: "→",  lbl: null,                sub: null,                   c: T.textDim },
    { icon: "📉", lbl: "CALC LOSS",         sub: "Measure error",        c: T.orange },
    { icon: "→",  lbl: null,                sub: null,                   c: T.textDim },
    { icon: "↩️", lbl: "BACKPROP",         sub: "Compute gradients",    c: T.red },
    { icon: "→",  lbl: null,                sub: null,                   c: T.textDim },
    { icon: "⚖️", lbl: "UPDATE WEIGHTS",   sub: "Gradient descent",     c: T.green },
    { icon: "↺",  lbl: "REPEAT",           sub: "Until loss is small",  c: T.purple },
  ];

  const usecases = [
    { icon: "🌡️", lbl: "House Price\nPrediction",     t: "Regression" },
    { icon: "✉️",  lbl: "Spam Email\nDetection",      t: "Classification" },
    { icon: "🌸", lbl: "Flower Species\nIdentification",t: "Classification" },
    { icon: "📊", lbl: "Stock Trend\nForecasting",    t: "Regression" },
    { icon: "🏥", lbl: "Disease Risk\nScoring",       t: "Classification" },
    { icon: "🎓", lbl: "Student Grade\nPrediction",   t: "Regression" },
  ];

  return (
    <div>
      {/* Section header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: T.mono, fontSize: 9, color: T.cyanDim, letterSpacing: 4, marginBottom: 8 }}>MODULE 01 / OVERVIEW</div>
        <div style={{ fontFamily: T.serif, fontSize: 28, color: T.text, lineHeight: 1.2, marginBottom: 10 }}>
          Feedforward Neural Networks &<br />Backpropagation
        </div>
        <div style={{ color: T.textSoft, fontSize: 13, lineHeight: 1.7, maxWidth: 640 }}>
          The foundational architecture of deep learning. Understanding this completely
          means you understand <em>how</em> AI learns from data.
        </div>
      </div>

      {/* 3 concept cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 24 }}>
        {cards.map(card => (
          <Card key={card.key} color={hov === card.key ? card.color : T.border}
            style={{ cursor: "pointer", transition: "all 0.2s" }}
          >
            <div onMouseEnter={() => setHov(card.key)} onMouseLeave={() => setHov(null)}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <Label color={card.color}>{card.title}</Label>
              <div style={{ color: T.text, fontSize: 13, lineHeight: 1.6, marginBottom: 10 }}>
                {card.short}
              </div>
              {hov === card.key && (
                <pre style={{
                  fontFamily: T.mono, fontSize: 10.5, color: T.textSoft,
                  lineHeight: 1.8, whiteSpace: "pre-wrap", margin: 0,
                  borderTop: `1px solid ${card.color}33`, paddingTop: 10,
                }}>{card.detail}</pre>
              )}
              <div style={{ fontFamily: T.mono, fontSize: 9, color: T.textDim, marginTop: 8, letterSpacing: 2 }}>
                {hov === card.key ? "▲ LESS" : "▼ HOVER FOR DETAIL"}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* The pizza analogy */}
      <div style={{
        background: `${T.yellow}0a`, border: `1px solid ${T.yellow}33`,
        borderLeft: `4px solid ${T.yellow}`, borderRadius: 8, padding: "16px 20px", marginBottom: 24
      }}>
        <Label color={T.yellow}>🍕 ANALOGY — LEARNING TO BAKE PIZZA</Label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <div style={{ color: T.yellow, fontFamily: T.mono, fontSize: 11, marginBottom: 6 }}>Human Learning</div>
            <div style={{ color: T.text, fontSize: 13, lineHeight: 1.7 }}>
              You bake a pizza (forward pass). It comes out burned (high loss). You adjust
              the temperature and time (update weights). Bake again. After many attempts
              you make the perfect pizza. Each attempt makes you a tiny bit smarter.
            </div>
          </div>
          <div>
            <div style={{ color: T.cyan, fontFamily: T.mono, fontSize: 11, marginBottom: 6 }}>Neural Network Learning</div>
            <div style={{ color: T.text, fontSize: 13, lineHeight: 1.7 }}>
              Network makes a prediction (forward pass). Loss measures how wrong it was.
              Backpropagation figures out which weights caused the error. Gradient descent
              nudges every weight. After thousands of iterations, the network is accurate.
            </div>
          </div>
        </div>
      </div>

      {/* Training cycle */}
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: "16px 20px", marginBottom: 24 }}>
        <Label color={T.cyan}>⟳ THE COMPLETE TRAINING CYCLE</Label>
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap", marginTop: 8 }}>
          {cycle.map((item, i) => (
            item.lbl === null
              ? <div key={i} style={{ color: T.textDim, fontSize: 18 }}>{item.icon}</div>
              : (
                <div key={i} style={{
                  background: `${item.c}12`, border: `1px solid ${item.c}33`,
                  borderRadius: 6, padding: "8px 12px", textAlign: "center",
                  minWidth: 90,
                }}>
                  <div style={{ fontSize: 18, marginBottom: 3 }}>{item.icon}</div>
                  <div style={{ fontFamily: T.mono, fontSize: 8, color: item.c, letterSpacing: 1, marginBottom: 2 }}>{item.lbl}</div>
                  <div style={{ fontFamily: T.mono, fontSize: 8, color: T.textDim }}>{item.sub}</div>
                </div>
              )
          ))}
        </div>
      </div>

      {/* Use cases */}
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: "16px 20px" }}>
        <Label color={T.green}>✅ REAL-WORLD USE CASES</Label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, marginTop: 10 }}>
          {usecases.map((u, i) => (
            <div key={i} style={{
              background: T.surface, border: `1px solid ${T.border}`,
              borderRadius: 6, padding: 12, textAlign: "center"
            }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{u.icon}</div>
              <div style={{ fontFamily: T.mono, fontSize: 9, color: T.text, whiteSpace: "pre", lineHeight: 1.5 }}>{u.lbl}</div>
              <div style={{ fontFamily: T.mono, fontSize: 8, color: T.green, marginTop: 4, letterSpacing: 1 }}>{u.t}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 — ARCHITECTURE
// ─────────────────────────────────────────────────────────────────────────────
function SectionArchitecture() {
  const [activeNode, setActiveNode] = useState("input");

  const nodeInfo = {
    input: {
      color: T.inputC, title: "Input Layer", icon: "📥",
      body: `The first layer receives raw data. Each neuron represents one feature.
No computation happens here — it just passes values to the next layer.`,
      examples: "x₁ = 0.6 (e.g., normalized test score)\nx₂ = 0.8 (e.g., hours studied)",
      math: "a⁽⁰⁾ = x  (input is passed directly, no transformation)",
    },
    hidden: {
      color: T.hiddenC, title: "Hidden Layer", icon: "⚙️",
      body: `Hidden layers do the actual computation. Each neuron:
1. Receives weighted signals from the previous layer
2. Adds a bias value
3. Applies an activation function to produce its output`,
      examples: "Two hidden neurons h₁ and h₂ in our example network",
      math: "z = w₁x₁ + w₂x₂ + b\na = σ(z)  ← activation function",
    },
    output: {
      color: T.outputC, title: "Output Layer", icon: "📤",
      body: `The final layer produces the network's prediction.
For binary classification: 1 neuron with sigmoid (0–1 probability)
For multi-class: N neurons with softmax
For regression: 1 neuron with no activation (raw number)`,
      examples: "ŷ = 0.618 → 61.8% probability of class 1",
      math: "ŷ = σ(v₁h₁ + v₂h₂ + b_o)",
    },
    weight: {
      color: T.orange, title: "Weights (w)", icon: "⚖️",
      body: `Every connection has a weight. Weights are the LEARNED parameters of the network.
A large positive weight → that input strongly activates the neuron.
A large negative weight → that input suppresses the neuron.
Near-zero weight → that input is mostly ignored.
The network adjusts weights during training to minimize error.`,
      examples: "w₁₁ = 0.5, w₁₂ = 0.3, w₂₁ = -0.4, w₂₂ = 0.7",
      math: "Contribution of input xᵢ = wᵢ × xᵢ",
    },
    bias: {
      color: T.purple, title: "Bias (b)", icon: "🎯",
      body: `Bias is an extra learnable value added to the weighted sum before activation.
It shifts the activation function left or right.
Without bias: network can only draw hyperplanes through the origin.
With bias: network can draw hyperplanes anywhere — much more flexible!
Think of it as the y-intercept in y = mx + b.`,
      examples: "b_h₁ = 0.1, b_h₂ = -0.1, b_o = 0.2",
      math: "z = (w·x) + b  ← bias shifts the entire sum",
    },
    activation: {
      color: T.red, title: "Activation Functions", icon: "⚡",
      body: `Without activation functions, a 10-layer network would be mathematically
equivalent to a single linear equation — completely useless for complex tasks.
Activation functions introduce non-linearity, allowing the network to model
curves, boundaries, and complex patterns.
Most common: ReLU in hidden layers, Sigmoid for binary output.`,
      examples: "ReLU: max(0, z)\nSigmoid: 1/(1+e⁻ᶻ)",
      math: "f(z) = max(0, z)  [ReLU]\nf(z) = 1/(1+e⁻ᶻ)  [Sigmoid]",
    },
  };

  const ni = nodeInfo[activeNode];

  const clickables = [
    { key: "input",      label: "INPUT LAYER",         color: T.inputC },
    { key: "hidden",     label: "HIDDEN LAYER",        color: T.hiddenC },
    { key: "output",     label: "OUTPUT LAYER",        color: T.outputC },
    { key: "weight",     label: "WEIGHTS",             color: T.orange },
    { key: "bias",       label: "BIAS",                color: T.purple },
    { key: "activation", label: "ACTIVATION FUNCTION", color: T.red },
  ];

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: T.mono, fontSize: 9, color: T.cyanDim, letterSpacing: 4, marginBottom: 8 }}>MODULE 02 / ARCHITECTURE</div>
        <div style={{ fontFamily: T.serif, fontSize: 26, color: T.text, marginBottom: 8 }}>Building Blocks of a Neural Network</div>
        <div style={{ color: T.textSoft, fontSize: 13 }}>
          Our example: 2 inputs → 2 hidden neurons → 1 output. Click any component to learn about it.
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 20 }}>
        {/* Left: Network + clickable legend */}
        <div>
          <Card color={T.border} style={{ marginBottom: 14 }}>
            <NetworkSVG x1={0.6} x2={0.8} showValues={false} highlightPath={null} />
          </Card>
          {/* Clickable legend */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {clickables.map(c => (
              <button key={c.key} onClick={() => setActiveNode(c.key)} style={{
                padding: "7px 14px", fontFamily: T.mono, fontSize: 10, letterSpacing: 2,
                background: activeNode === c.key ? `${c.color}22` : T.card,
                border: `1px solid ${activeNode === c.key ? c.color : T.border}`,
                color: activeNode === c.key ? c.color : T.textSoft,
                borderRadius: 6, cursor: "pointer",
              }}>{c.label}</button>
            ))}
          </div>
        </div>

        {/* Right: Info panel */}
        <div>
          <Card color={ni.color} style={{ height: "100%", boxSizing: "border-box" }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>{ni.icon}</div>
            <Label color={ni.color}>{ni.title}</Label>
            <div style={{ color: T.text, fontSize: 13, lineHeight: 1.75, marginBottom: 14 }}>
              {ni.body}
            </div>
            <MathBlock
              title="FORMULA"
              lines={ni.math}
              color={ni.color}
            />
            <div style={{
              background: `${ni.color}10`, border: `1px solid ${ni.color}33`,
              borderRadius: 6, padding: "10px 14px", marginTop: 10
            }}>
              <div style={{ fontFamily: T.mono, fontSize: 9, color: ni.color, letterSpacing: 2, marginBottom: 6 }}>EXAMPLE VALUES</div>
              <pre style={{ fontFamily: T.mono, fontSize: 11, color: T.textSoft, margin: 0, lineHeight: 1.8 }}>{ni.examples}</pre>
            </div>
          </Card>
        </div>
      </div>

      {/* Single neuron anatomy */}
      <div style={{ marginTop: 20 }}>
        <Card color={T.border}>
          <Label color={T.cyan}>🔬 INSIDE A SINGLE NEURON — STEP BY STEP</Label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginTop: 12 }}>
            {[
              { n: "1", title: "Receive Inputs", body: "x₁, x₂, ... arrive from the previous layer (or raw data)", col: T.inputC, math: "x₁=0.6, x₂=0.8" },
              { n: "2", title: "Multiply by Weights", body: "Each input is scaled by its connection weight", col: T.orange, math: "w·x = 0.5×0.6\n     + 0.3×0.8" },
              { n: "3", title: "Sum + Bias", body: "Add all weighted inputs together, then add the bias term", col: T.purple, math: "z = 0.30+0.24\n    +0.10 = 0.64" },
              { n: "4", title: "Apply Activation", body: "Pass z through the activation function to get output a", col: T.red, math: "a = σ(0.64)\n  = 0.6547" },
              { n: "5", title: "Output to Next", body: "The activated value is passed forward to all neurons in the next layer", col: T.outputC, math: "a_h₁ = 0.6547\n→ next layer" },
            ].map(step => (
              <div key={step.n} style={{
                background: T.surface, border: `1px solid ${step.col}44`,
                borderRadius: 8, padding: 12, textAlign: "center"
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: `${step.col}22`, border: `1px solid ${step.col}`,
                  fontFamily: T.mono, fontSize: 11, color: step.col,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 8px",
                }}>{step.n}</div>
                <div style={{ fontFamily: T.mono, fontSize: 9, color: step.col, letterSpacing: 1, marginBottom: 6 }}>{step.title}</div>
                <div style={{ color: T.textSoft, fontSize: 11, lineHeight: 1.5, marginBottom: 8 }}>{step.body}</div>
                <pre style={{ fontFamily: T.mono, fontSize: 9.5, color: T.text, margin: 0 }}>{step.math}</pre>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 — FORWARD PASS
// ─────────────────────────────────────────────────────────────────────────────
function SectionForwardPass() {
  const [step, setStep] = useState(0);
  const x1 = 0.6, x2 = 0.8, target = 1.0;
  const fwd = forwardPass(x1, x2);

  const steps = [
    {
      title: "Set the Inputs",
      color: T.inputC,
      icon: "📥",
      explain: `Everything starts with raw data. We have two input features. These numbers could
represent anything — pixel brightness, temperature readings, exam scores. For this
example, think of them as two features from a student's profile.`,
      math: `Inputs:
  x₁ = 0.6   (e.g., normalized GPA: 0.6 out of 1.0)
  x₂ = 0.8   (e.g., normalized study hours: 0.8 out of 1.0)
  
Target:
  y  = 1.0   (student should pass: yes = 1)`,
      note: "📌 Inputs are never transformed — they flow directly into the hidden layer.",
    },
    {
      title: "Compute Hidden Neuron h₁ (Weighted Sum)",
      color: T.hiddenC,
      icon: "🔢",
      explain: `Each hidden neuron computes a weighted sum of ALL inputs plus its bias. Think of the
weights as telling the neuron "how much attention to pay" to each input. The bias
lets the neuron shift its behavior up or down.`,
      math: `Hidden neuron h₁:
  Weights:  w₁₁ = 0.5 (for x₁),  w₁₂ = 0.3 (for x₂)
  Bias:     b_h₁ = 0.1

  z_h₁ = w₁₁ × x₁  +  w₁₂ × x₂  +  b_h₁
       = (0.5)(0.6) + (0.3)(0.8) + 0.1
       = 0.30 + 0.24 + 0.10
       = ${fmtNN(fwd.z_h1, 4)}`,
      note: "📌 z is called the 'pre-activation' or 'net input'. It's just linear math — no curves yet.",
    },
    {
      title: "Activate Hidden Neuron h₁ (Sigmoid)",
      color: T.red,
      icon: "⚡",
      explain: `Now we apply the activation function. We'll use sigmoid here, which squashes any
number into the range (0, 1). This non-linearity is critical — without it, the entire
network would be equivalent to a single linear equation no matter how deep it is.`,
      math: `Sigmoid activation:
  σ(z) = 1 / (1 + e^(-z))

  a_h₁ = σ(${fmtNN(fwd.z_h1, 4)})
       = 1 / (1 + e^(-${fmtNN(fwd.z_h1, 4)}))
       = 1 / (1 + ${fmtNN(Math.exp(-fwd.z_h1), 4)})
       = 1 / ${fmtNN(1 + Math.exp(-fwd.z_h1), 4)}
       = ${fmtNN(fwd.a_h1, 4)}`,
      note: "📌 Sigmoid output is always between 0 and 1. Think of it as: 'how activated is this neuron?'",
    },
    {
      title: "Compute + Activate Hidden Neuron h₂",
      color: T.hiddenC,
      icon: "🔢",
      explain: `We repeat the exact same process for hidden neuron h₂ with its own weights and bias.
Both h₁ and h₂ see the same inputs but have DIFFERENT weights, so they learn to
detect different patterns in the data.`,
      math: `Hidden neuron h₂:
  Weights:  w₂₁ = -0.4 (for x₁),  w₂₂ = 0.7 (for x₂)
  Bias:     b_h₂ = -0.1

  z_h₂ = (-0.4)(0.6) + (0.7)(0.8) + (-0.1)
       = -0.24 + 0.56 - 0.10
       = ${fmtNN(fwd.z_h2, 4)}

  a_h₂ = σ(${fmtNN(fwd.z_h2, 4)}) = ${fmtNN(fwd.a_h2, 4)}`,
      note: `📌 Negative weight (-0.4) means: 'when x₁ is high, this neuron is suppressed.' Weights can be negative!`,
    },
    {
      title: "Compute Output Neuron (Weighted Sum)",
      color: T.outputC,
      icon: "📤",
      explain: `The output neuron takes the activated values from both hidden neurons and
computes another weighted sum. It uses different weights (v₁, v₂) to determine
how much to trust each hidden neuron's signal.`,
      math: `Output neuron:
  Weights: v₁ = 0.6 (for h₁),  v₂ = -0.2 (for h₂)
  Bias:    b_o = 0.2

  z_o = v₁ × a_h₁  +  v₂ × a_h₂  +  b_o
      = (0.6)(${fmtNN(fwd.a_h1, 4)}) + (-0.2)(${fmtNN(fwd.a_h2, 4)}) + 0.2
      = ${fmtNN(0.6 * fwd.a_h1, 4)} + ${fmtNN(-0.2 * fwd.a_h2, 4)} + 0.2
      = ${fmtNN(fwd.z_o, 4)}`,
      note: "📌 This is still just linear math. The activation function comes next.",
    },
    {
      title: "Activate Output → Final Prediction",
      color: T.outputC,
      icon: "🎯",
      explain: `Apply sigmoid again to get a probability between 0 and 1. Our target was 1.0 (pass).
The network predicted 0.6182 — about 62% confident in 'pass'. That's not bad for a
randomly-initialized network! Backpropagation will make it better.`,
      math: `  ŷ = σ(${fmtNN(fwd.z_o, 4)})
     = 1 / (1 + e^(-${fmtNN(fwd.z_o, 4)}))
     = ${fmtNN(fwd.a_o, 4)}

  Interpretation:
  ŷ = ${fmtNN(fwd.a_o, 4)} → ${(fwd.a_o * 100).toFixed(1)}% probability of class 1

  Target:     y = 1.0  (should be "pass")
  Prediction: ŷ = ${fmtNN(fwd.a_o, 4)}
  Error:      ${fmtNN(fwd.a_o - 1.0, 4)} (need to fix this!)`,
      note: "📌 The forward pass is complete! Now we need to measure the error and fix it with backpropagation.",
    },
  ];

  const s = steps[step];

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: T.mono, fontSize: 9, color: T.cyanDim, letterSpacing: 4, marginBottom: 8 }}>MODULE 03 / FORWARD PASS</div>
        <div style={{ fontFamily: T.serif, fontSize: 26, color: T.text, marginBottom: 8 }}>Forward Pass — Making a Prediction</div>
        <div style={{ color: T.textSoft, fontSize: 13 }}>
          Data flows from left to right through the network. Step through each calculation below.
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: 20 }}>
        {/* Left — network + step nav */}
        <div>
          <Card color={s.color} style={{ marginBottom: 14 }}>
            <NetworkSVG x1={x1} x2={x2} fwd={step >= 2 ? fwd : null}
              showValues={step >= 2} highlightPath="forward" />
          </Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <StepBtn onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} dir="prev" />
            <Progress current={step} total={steps.length} color={s.color} />
            <StepBtn onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} disabled={step === steps.length - 1} dir="next" />
          </div>
          {/* mini summary of steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {steps.map((st, i) => (
              <button key={i} onClick={() => setStep(i)} style={{
                display: "flex", alignItems: "center", gap: 8,
                background: step === i ? `${st.color}18` : "transparent",
                border: `1px solid ${step === i ? st.color : "transparent"}`,
                borderRadius: 5, padding: "5px 10px", cursor: "pointer",
                textAlign: "left",
              }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: i <= step ? st.color : T.textDim, flexShrink: 0 }} />
                <div style={{ fontFamily: T.mono, fontSize: 9, color: i <= step ? st.color : T.textDim, letterSpacing: 1 }}>
                  STEP {i + 1} — {st.title}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right — step content */}
        <Card color={s.color}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ fontSize: 32 }}>{s.icon}</div>
            <div>
              <div style={{ fontFamily: T.mono, fontSize: 9, color: s.color, letterSpacing: 3 }}>STEP {step + 1} OF {steps.length}</div>
              <div style={{ fontFamily: T.serif, fontSize: 18, color: T.text }}>{s.title}</div>
            </div>
          </div>
          <div style={{ color: T.text, fontSize: 13, lineHeight: 1.75, marginBottom: 14 }}>{s.explain}</div>
          <MathBlock title="CALCULATION" lines={s.math} color={s.color} note={s.note} />
        </Card>
      </div>

      {/* Summary bar at bottom */}
      {step === steps.length - 1 && (
        <div style={{
          marginTop: 20, background: `${T.green}0a`, border: `1px solid ${T.green}44`,
          borderRadius: 8, padding: "14px 20px"
        }}>
          <Label color={T.green}>✅ FORWARD PASS COMPLETE — SUMMARY</Label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginTop: 10 }}>
            {[
              { l: "x₁", v: "0.6000", c: T.inputC },
              { l: "x₂", v: "0.8000", c: T.inputC },
              { l: "a_h₁", v: fmtNN(fwd.a_h1), c: T.hiddenC },
              { l: "a_h₂", v: fmtNN(fwd.a_h2), c: T.hiddenC },
              { l: "ŷ (output)", v: fmtNN(fwd.a_o), c: T.outputC },
            ].map(item => (
              <div key={item.l} style={{
                background: T.surface, border: `1px solid ${item.c}33`,
                borderRadius: 6, padding: "10px", textAlign: "center"
              }}>
                <div style={{ fontFamily: T.mono, fontSize: 10, color: item.c, marginBottom: 4 }}>{item.l}</div>
                <div style={{ fontFamily: T.mono, fontSize: 15, color: T.text, fontWeight: "bold" }}>{item.v}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 — ACTIVATION FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────
function SectionActivations() {
  const [inputZ, setInputZ] = useState(0.64);
  const [activeAct, setActiveAct] = useState("sigmoid");

  const acts = {
    sigmoid: {
      name: "Sigmoid  σ(z)",
      color: T.cyan,
      fn: sigmoid,
      formula: "σ(z) = 1 / (1 + e^(-z))",
      range: "Output range: (0, 1)",
      use: "Binary classification output layer",
      pros: "Probabilistic output (0–1), smooth gradient",
      cons: "Vanishing gradient for large |z|, computationally heavy",
      deriv: "σ'(z) = σ(z) × (1 − σ(z))",
    },
    relu: {
      name: "ReLU  f(z)",
      color: T.green,
      fn: relu,
      formula: "ReLU(z) = max(0, z)",
      range: "Output range: [0, ∞)",
      use: "Hidden layers (most common choice today)",
      pros: "Fast, avoids vanishing gradient for z > 0",
      cons: "'Dying ReLU' — dead neurons when z < 0 always",
      deriv: "ReLU'(z) = 1 if z>0, else 0",
    },
    tanh: {
      name: "Tanh  tanh(z)",
      color: T.purple,
      fn: tanhFn,
      formula: "tanh(z) = (e^z − e^(-z)) / (e^z + e^(-z))",
      range: "Output range: (−1, 1)",
      use: "Hidden layers, RNNs (zero-centered advantage)",
      pros: "Zero-centered — faster convergence than sigmoid",
      cons: "Still has vanishing gradient at extremes",
      deriv: "tanh'(z) = 1 − tanh²(z)",
    },
    linear: {
      name: "Linear (None)",
      color: T.orange,
      fn: z => z,
      formula: "f(z) = z",
      range: "Output range: (−∞, ∞)",
      use: "Regression output layer (predicting raw numbers)",
      pros: "No information loss, full range",
      cons: "No non-linearity — useless for hidden layers",
      deriv: "f'(z) = 1 (constant)",
    },
  };

  const act = acts[activeAct];

  // Mini chart data
  const zRange = Array.from({ length: 81 }, (_, i) => -4 + i * 0.1);
  const chartW = 260, chartH = 130;
  const mapX = z => ((z + 4) / 8) * chartW;
  const mapY = (y, fn) => {
    const [lo, hi] = fn === relu ? [0, 4] : fn === (z => z) ? [-4, 4] : [-1.1, 1.1];
    return chartH - ((y - lo) / (hi - lo)) * chartH;
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: T.mono, fontSize: 9, color: T.cyanDim, letterSpacing: 4, marginBottom: 8 }}>MODULE 04 / ACTIVATION FUNCTIONS</div>
        <div style={{ fontFamily: T.serif, fontSize: 26, color: T.text, marginBottom: 8 }}>Activation Functions — Adding Non-Linearity</div>
        <div style={{ color: T.textSoft, fontSize: 13 }}>
          Without activation functions, no matter how many layers you add, the network is equivalent to a single linear layer.
          Activation functions are what make deep learning "deep."
        </div>
      </div>

      {/* WHY activation */}
      <div style={{
        background: `${T.red}0a`, border: `1px solid ${T.red}33`,
        borderLeft: `4px solid ${T.red}`, borderRadius: 8, padding: "14px 20px", marginBottom: 20
      }}>
        <Label color={T.red}>⚠️ WHY DO WE NEED NON-LINEARITY?</Label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: T.red, marginBottom: 6 }}>WITHOUT activation:</div>
            <pre style={{ fontFamily: T.mono, fontSize: 11, color: T.textSoft, margin: 0, lineHeight: 1.8 }}>
{`Layer 1: z₁ = W₁x
Layer 2: z₂ = W₂z₁ = W₂W₁x
Layer 3: z₃ = W₃z₂ = W₃W₂W₁x
→ Equivalent to: z₃ = (W₃W₂W₁)x
→ Just ONE linear transformation!
→ Useless for complex patterns ❌`}
            </pre>
          </div>
          <div>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: T.green, marginBottom: 6 }}>WITH activation:</div>
            <pre style={{ fontFamily: T.mono, fontSize: 11, color: T.textSoft, margin: 0, lineHeight: 1.8 }}>
{`Layer 1: a₁ = σ(W₁x)
Layer 2: a₂ = σ(W₂a₁)
Layer 3: a₃ = σ(W₃a₂)
→ Cannot be collapsed to one layer!
→ Can model curves, spirals, boundaries
→ Learns complex real-world patterns ✅`}
            </pre>
          </div>
        </div>
      </div>

      {/* Activation selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {Object.entries(acts).map(([key, a]) => (
          <button key={key} onClick={() => setActiveAct(key)} style={{
            flex: 1, padding: "10px 8px", fontFamily: T.mono, fontSize: 10,
            letterSpacing: 1,
            background: activeAct === key ? `${a.color}22` : T.card,
            border: `1px solid ${activeAct === key ? a.color : T.border}`,
            color: activeAct === key ? a.color : T.textSoft,
            borderRadius: 6, cursor: "pointer",
          }}>{a.name}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Left: chart + interactive */}
        <div>
          <Card color={act.color} style={{ marginBottom: 14 }}>
            <Label color={act.color}>{act.name} — GRAPH</Label>
            <svg viewBox={`0 0 ${chartW} ${chartH + 20}`} style={{ width: "100%", display: "block" }}>
              {/* grid */}
              {[-3, -2, -1, 0, 1, 2, 3].map(z => (
                <line key={z} x1={mapX(z)} y1={0} x2={mapX(z)} y2={chartH}
                  stroke={T.border} strokeWidth={z === 0 ? 1 : 0.4} opacity={0.8} />
              ))}
              {/* y axis */}
              <line x1={mapX(0)} y1={0} x2={mapX(0)} y2={chartH} stroke={T.border} strokeWidth={1} />
              {/* x axis */}
              <line x1={0} y1={chartH / 2} x2={chartW} y2={chartH / 2} stroke={T.border} strokeWidth={0.4} />

              {/* Function curve */}
              <polyline
                points={zRange.map(z => `${mapX(z)},${mapY(act.fn(z), act.fn)}`).join(" ")}
                fill="none" stroke={act.color} strokeWidth={2.5}
              />

              {/* Current z marker */}
              <circle cx={mapX(inputZ)} cy={mapY(act.fn(inputZ), act.fn)} r={5}
                fill={act.color} stroke={T.bg} strokeWidth={2} />
              <line x1={mapX(inputZ)} y1={0} x2={mapX(inputZ)} y2={chartH}
                stroke={act.color} strokeWidth={1} strokeDasharray="4,3" opacity={0.5} />

              {/* Labels */}
              {[-4, -2, 0, 2, 4].map(z => (
                <text key={z} x={mapX(z)} y={chartH + 14} textAnchor="middle"
                  fill={T.textDim} fontSize="8" fontFamily={T.mono}>{z}</text>
              ))}
            </svg>

            {/* Interactive slider */}
            <div style={{ marginTop: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <div style={{ fontFamily: T.mono, fontSize: 10, color: T.textSoft }}>z = {fmtNN(inputZ, 2)}</div>
                <div style={{ fontFamily: T.mono, fontSize: 10, color: act.color }}>
                  {act.name.split(" ")[0]}({fmtNN(inputZ, 2)}) = {fmtNN(act.fn(inputZ), 4)}
                </div>
              </div>
              <input type="range" min="-4" max="4" step="0.1" value={inputZ}
                onChange={e => setInputZ(parseFloat(e.target.value))}
                style={{ width: "100%", accentColor: act.color }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: T.mono, fontSize: 9, color: T.textDim }}>-4</span>
                <span style={{ fontFamily: T.mono, fontSize: 9, color: T.textDim }}>+4</span>
              </div>
            </div>
          </Card>

          {/* Try all 3 at current z */}
          <Card color={T.border}>
            <Label color={T.cyan}>COMPARE ALL AT z = {fmtNN(inputZ, 2)}</Label>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
              {Object.entries(acts).map(([key, a]) => (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ fontFamily: T.mono, fontSize: 10, color: a.color, width: 120, flexShrink: 0 }}>{a.name.split("  ")[0]}</div>
                  <div style={{ flex: 1, background: T.surface, borderRadius: 4, height: 8, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 4, background: a.color,
                      width: `${Math.min(100, Math.max(0, (a.fn(inputZ) + 1) / 2 * 100))}%`,
                      transition: "width 0.2s",
                    }} />
                  </div>
                  <div style={{ fontFamily: T.mono, fontSize: 11, color: T.text, width: 60, textAlign: "right" }}>
                    {fmtNN(a.fn(inputZ), 4)}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: detail */}
        <Card color={act.color}>
          <div style={{ fontSize: 24, marginBottom: 10 }}>⚡</div>
          <Label color={act.color}>{act.name}</Label>
          <MathBlock title="FORMULA" lines={act.formula} color={act.color} />
          <MathBlock title="DERIVATIVE (used in backprop)" lines={act.deriv} color={act.color} />

          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 6, padding: 10 }}>
              <div style={{ fontFamily: T.mono, fontSize: 9, color: T.textSoft, letterSpacing: 2, marginBottom: 4 }}>OUTPUT RANGE</div>
              <div style={{ fontFamily: T.mono, fontSize: 12, color: act.color }}>{act.range}</div>
            </div>
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 6, padding: 10 }}>
              <div style={{ fontFamily: T.mono, fontSize: 9, color: T.textSoft, letterSpacing: 2, marginBottom: 4 }}>WHEN TO USE</div>
              <div style={{ fontFamily: T.mono, fontSize: 12, color: T.text }}>{act.use}</div>
            </div>
            <div style={{ background: `${T.green}0a`, border: `1px solid ${T.green}33`, borderRadius: 6, padding: 10 }}>
              <div style={{ fontFamily: T.mono, fontSize: 9, color: T.green, letterSpacing: 2, marginBottom: 4 }}>✓ ADVANTAGES</div>
              <div style={{ color: T.text, fontSize: 12 }}>{act.pros}</div>
            </div>
            <div style={{ background: `${T.red}0a`, border: `1px solid ${T.red}33`, borderRadius: 6, padding: 10 }}>
              <div style={{ fontFamily: T.mono, fontSize: 9, color: T.red, letterSpacing: 2, marginBottom: 4 }}>✗ DISADVANTAGES</div>
              <div style={{ color: T.text, fontSize: 12 }}>{act.cons}</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4 — LOSS FUNCTION
// ─────────────────────────────────────────────────────────────────────────────
function SectionLoss() {
  const [pred, setPred] = useState(0.618);
  const target = 1.0;
  const loss = mse(pred, target);

  const lossCurve = Array.from({ length: 101 }, (_, i) => ({ p: i / 100, l: mse(i / 100, 1.0) }));
  const cW = 320, cH = 150;
  const mapX = p => p * cW;
  const mapY = l => cH - (l / 0.5) * cH;

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: T.mono, fontSize: 9, color: T.cyanDim, letterSpacing: 4, marginBottom: 8 }}>MODULE 05 / LOSS FUNCTION</div>
        <div style={{ fontFamily: T.serif, fontSize: 26, color: T.text, marginBottom: 8 }}>Loss Function — Measuring the Mistake</div>
        <div style={{ color: T.textSoft, fontSize: 13 }}>
          The loss function measures how wrong our prediction was. It produces a single number — the training signal for backpropagation.
        </div>
      </div>

      <InfoBox icon="📏" title="ANALOGY — MEASURING ERROR" color={T.orange}
        body={`Imagine an archery target. The bull's-eye is the correct answer (target = 1.0). Your arrow lands at 0.618.
The loss function measures how far your arrow missed — but in a specific mathematical way that makes gradient calculations clean.
We want to MINIMIZE the loss: make the arrow hit closer to center with every shot.`} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
        {/* Left: interactive loss */}
        <div>
          <Card color={T.orange}>
            <Label color={T.orange}>INTERACTIVE LOSS CALCULATOR</Label>
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontFamily: T.mono, fontSize: 10, color: T.textSoft }}>Prediction ŷ = {fmtNN(pred, 3)}</span>
                <span style={{ fontFamily: T.mono, fontSize: 10, color: T.cyan }}>Target y = 1.0</span>
              </div>
              <input type="range" min="0" max="1" step="0.01" value={pred}
                onChange={e => setPred(parseFloat(e.target.value))}
                style={{ width: "100%", accentColor: T.orange }} />
            </div>

            {/* Loss curve visualization */}
            <svg viewBox={`0 0 ${cW} ${cH + 20}`} style={{ width: "100%", display: "block", marginBottom: 12 }}>
              {/* grid */}
              {[0, 0.1, 0.2, 0.3, 0.4, 0.5].map(l => (
                <line key={l} x1={0} y1={mapY(l)} x2={cW} y2={mapY(l)} stroke={T.border} strokeWidth={0.5} />
              ))}
              {[0, 0.25, 0.5, 0.75, 1.0].map(p => (
                <line key={p} x1={mapX(p)} y1={0} x2={mapX(p)} y2={cH} stroke={T.border} strokeWidth={0.5} />
              ))}
              {/* Curve */}
              <polyline
                points={lossCurve.map(d => `${mapX(d.p)},${mapY(d.l)}`).join(" ")}
                fill="none" stroke={T.orange} strokeWidth={2.5}
              />
              {/* Current point */}
              <circle cx={mapX(pred)} cy={mapY(loss)} r={5}
                fill={T.orange} stroke={T.bg} strokeWidth={2} />
              <line x1={mapX(pred)} y1={0} x2={mapX(pred)} y2={mapY(loss)}
                stroke={T.orange} strokeWidth={1} strokeDasharray="3,3" opacity={0.6} />
              {/* Labels */}
              <text x={2} y={cH + 14} fill={T.textDim} fontSize="8" fontFamily={T.mono}>0</text>
              <text x={cW - 12} y={cH + 14} fill={T.textDim} fontSize="8" fontFamily={T.mono}>1</text>
              <text x={2} y={10} fill={T.textDim} fontSize="8" fontFamily={T.mono}>0.5</text>
              <text x={cW / 2 - 10} y={cH + 14} fill={T.textDim} fontSize="8" fontFamily={T.mono}>ŷ →</text>
            </svg>

            <MathBlock title="MSE LOSS — CALCULATION"
              color={T.orange}
              lines={`Loss = ½ × (ŷ − y)²
     = ½ × (${fmtNN(pred, 4)} − 1.0)²
     = ½ × (${fmtNN(pred - 1.0, 4)})²
     = ½ × ${fmtNN(Math.pow(pred - 1.0, 2), 6)}
     = ${fmtNN(loss, 6)}`} />

            <div style={{
              background: loss < 0.01 ? `${T.green}18` : loss < 0.1 ? `${T.yellow}18` : `${T.red}18`,
              border: `1px solid ${loss < 0.01 ? T.green : loss < 0.1 ? T.yellow : T.red}44`,
              borderRadius: 6, padding: "10px 14px", marginTop: 10, textAlign: "center"
            }}>
              <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textSoft, marginBottom: 4 }}>LOSS = </div>
              <div style={{ fontFamily: T.mono, fontSize: 28, color: loss < 0.01 ? T.green : loss < 0.1 ? T.yellow : T.red }}>
                {fmtNN(loss, 6)}
              </div>
              <div style={{ fontFamily: T.mono, fontSize: 10, color: T.textSoft, marginTop: 4 }}>
                {loss < 0.01 ? "🎉 Excellent prediction!" : loss < 0.1 ? "📈 Getting there..." : "📉 Needs improvement"}
              </div>
            </div>
          </Card>
        </div>

        {/* Right: loss types and concepts */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Card color={T.border}>
            <Label color={T.cyan}>WHY ½ × (ŷ − y)²?</Label>
            <div style={{ color: T.text, fontSize: 13, lineHeight: 1.75 }}>
              The ½ is a mathematical trick — when we take the derivative for backpropagation,
              the 2 from the exponent cancels it out, leaving a clean gradient.
            </div>
            <MathBlock color={T.cyan} lines={`d/dŷ [½(ŷ-y)²] = ½ × 2(ŷ-y) = (ŷ-y)\n\nNo messy coefficient — the ½ was clever!`} />
          </Card>

          <Card color={T.border}>
            <Label color={T.yellow}>COMMON LOSS FUNCTIONS</Label>
            {[
              { name: "MSE (Mean Squared Error)", formula: "½(ŷ−y)²", use: "Regression problems", c: T.orange },
              { name: "Binary Cross-Entropy", formula: "−[y·log(ŷ)+(1−y)·log(1−ŷ)]", use: "Binary classification", c: T.cyan },
              { name: "Categorical Cross-Entropy", formula: "−Σ yᵢ·log(ŷᵢ)", use: "Multi-class classification", c: T.purple },
              { name: "MAE (Mean Absolute Error)", formula: "|ŷ−y|", use: "Regression (robust to outliers)", c: T.green },
            ].map(l => (
              <div key={l.name} style={{
                border: `1px solid ${l.c}33`, borderLeft: `3px solid ${l.c}`,
                borderRadius: 5, padding: "8px 12px", marginBottom: 8
              }}>
                <div style={{ fontFamily: T.mono, fontSize: 10, color: l.c, marginBottom: 3 }}>{l.name}</div>
                <div style={{ fontFamily: T.mono, fontSize: 11, color: T.text }}>{l.formula}</div>
                <div style={{ fontFamily: T.mono, fontSize: 9, color: T.textDim, marginTop: 3 }}>Use for: {l.use}</div>
              </div>
            ))}
          </Card>

          <Card color={T.border}>
            <Label color={T.green}>LOSS TELLS US TWO THINGS</Label>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1, background: `${T.green}0a`, border: `1px solid ${T.green}22`, borderRadius: 6, padding: 10 }}>
                <div style={{ fontFamily: T.mono, fontSize: 9, color: T.green, marginBottom: 4 }}>MAGNITUDE</div>
                <div style={{ color: T.text, fontSize: 12, lineHeight: 1.5 }}>How BADLY wrong we are. Large loss = big mistake.</div>
              </div>
              <div style={{ flex: 1, background: `${T.cyan}0a`, border: `1px solid ${T.cyan}22`, borderRadius: 6, padding: 10 }}>
                <div style={{ fontFamily: T.mono, fontSize: 9, color: T.cyan, marginBottom: 4 }}>GRADIENT SIGN</div>
                <div style={{ color: T.text, fontSize: 12, lineHeight: 1.5 }}>Which DIRECTION to move weights. (+) or (−)?</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5 — BACKPROPAGATION
// ─────────────────────────────────────────────────────────────────────────────
function SectionBackprop() {
  const [step, setStep] = useState(0);
  const x1 = 0.6, x2 = 0.8, target = 1.0;
  const bp = backprop(x1, x2, target);

  const steps = [
    {
      title: "What is Backpropagation?",
      color: T.orange,
      icon: "↩️",
      explain: `Backpropagation (\"backprop\") is the algorithm that answers: "How much did each
weight contribute to the error, and in which direction should we change it?"
It works backwards from the output error, using the chain rule of calculus.
Without backprop, we'd have to guess which weights to change — impossible!`,
      math: `CHAIN RULE OF CALCULUS:
If f(g(x)) is a composition of functions:
  d/dx [f(g(x))] = f'(g(x)) × g'(x)

In neural networks:
  Loss depends on output
  Output depends on weights
  → dLoss/dWeight = dLoss/dOutput × dOutput/dWeight`,
      note: "📌 Backprop is just the chain rule applied systematically to every weight in the network.",
    },
    {
      title: "Step 1 — Compute the Output Error",
      color: T.red,
      icon: "📉",
      explain: `First, calculate the loss and its derivative with respect to the network's output.
This is our starting signal — how wrong was the final answer?
The derivative tells us: if we increase ŷ by a tiny bit, how does the loss change?`,
      math: `Our values:
  ŷ (prediction) = ${fmtNN(bp.a_o)}
  y  (target)    = ${target}

Loss (MSE):
  L = ½(ŷ − y)²
    = ½(${fmtNN(bp.a_o)} − 1.0)²
    = ${fmtNN(bp.loss, 6)}

dL/dŷ (gradient of loss w.r.t. output):
  dL/dŷ = ŷ − y = ${fmtNN(bp.a_o)} − 1.0 = ${fmtNN(bp.dL_dao, 6)}`,
      note: `📌 Negative gradient (${fmtNN(bp.dL_dao, 4)}) means: to reduce loss, we need to INCREASE ŷ.`,
    },
    {
      title: "Step 2 — Backprop Through Output Activation",
      color: T.red,
      icon: "⚡",
      explain: `The output neuron used sigmoid. We need the chain rule here:
gradient flows through the sigmoid function. The sigmoid derivative
σ'(z) = σ(z)(1-σ(z)) tells us how steep the sigmoid curve is at our current z.`,
      math: `Output pre-activation: z_o = ${fmtNN(bp.z_o)}
Output activation:    ŷ   = σ(z_o) = ${fmtNN(bp.a_o)}

Sigmoid derivative: dŷ/dz_o = ŷ(1 − ŷ)
  = ${fmtNN(bp.a_o)} × (1 − ${fmtNN(bp.a_o)})
  = ${fmtNN(bp.a_o)} × ${fmtNN(1 - bp.a_o)}
  = ${fmtNN(bp.dao_dzo, 6)}

Chain Rule → Output delta (δ_o):
  δ_o = dL/dŷ × dŷ/dz_o
      = ${fmtNN(bp.dL_dao, 6)} × ${fmtNN(bp.dao_dzo, 6)}
      = ${fmtNN(bp.delta_o, 6)}`,
      note: "📌 δ_o (delta) is the 'error term' for the output neuron — our key backprop signal.",
    },
    {
      title: "Step 3 — Gradients for Output Weights (v₁, v₂)",
      color: T.orange,
      icon: "⚖️",
      explain: `How much did each output weight (v₁, v₂) contribute to the error?
The gradient for each weight is: δ_o × (the input it received).
Why? Because if a weight connected to a large activation caused a big error,
that weight needs a bigger adjustment.`,
      math: `∂L/∂v₁ = δ_o × a_h₁  (h₁ was the input to this weight)
  = ${fmtNN(bp.delta_o, 6)} × ${fmtNN(bp.a_h1, 6)}
  = ${fmtNN(bp.dL_dv0, 8)}

∂L/∂v₂ = δ_o × a_h₂  (h₂ was the input to this weight)
  = ${fmtNN(bp.delta_o, 6)} × ${fmtNN(bp.a_h2, 6)}
  = ${fmtNN(bp.dL_dv1, 8)}

∂L/∂b_o = δ_o = ${fmtNN(bp.dL_dbo, 8)}  (bias gradient = delta)`,
      note: "📌 Update rule: v₁_new = v₁ - α × ∂L/∂v₁  where α is the learning rate.",
    },
    {
      title: "Step 4 — Backprop Into Hidden Layer",
      color: T.hiddenC,
      icon: "⚙️",
      explain: `Now the error signal travels backwards into the hidden layer.
Each hidden neuron gets a portion of the output error, weighted by how much
its output weight (v₁ or v₂) contributed. Then we apply the sigmoid derivative
to account for the hidden activation function.`,
      math: `Error at h₁:
  dL/da_h₁ = δ_o × v₁ = ${fmtNN(bp.delta_o, 5)} × 0.6 = ${fmtNN(bp.dL_dah1, 7)}
  
Sigmoid deriv at h₁: σ'(z_h₁) = a_h₁(1 − a_h₁)
  = ${fmtNN(bp.a_h1, 5)} × ${fmtNN(1 - bp.a_h1, 5)} = ${fmtNN(bp.dah1_dzh1, 7)}
  
Hidden delta h₁: δ_h₁ = ${fmtNN(bp.dL_dah1, 5)} × ${fmtNN(bp.dah1_dzh1, 5)} = ${fmtNN(bp.delta_h1, 8)}

Error at h₂:
  dL/da_h₂ = δ_o × v₂ = ${fmtNN(bp.delta_o, 5)} × (-0.2) = ${fmtNN(bp.dL_dah2, 7)}
  δ_h₂ = ${fmtNN(bp.dL_dah2, 5)} × ${fmtNN(bp.dah2_dzh2, 5)} = ${fmtNN(bp.delta_h2, 8)}`,
      note: "📌 The chain rule continues: error flows backwards through every weight in the network.",
    },
    {
      title: "Step 5 — Gradients for ALL Input Weights",
      color: T.hiddenC,
      icon: "🔢",
      explain: `Finally, compute gradients for the input layer weights (w₁₁, w₁₂, w₂₁, w₂₂).
Same rule: gradient = delta × input that fed into that weight.
Now we have ALL the gradients — one for every single weight in the network!`,
      math: `∂L/∂w₁₁ = δ_h₁ × x₁ = ${fmtNN(bp.delta_h1, 7)} × 0.6 = ${fmtNN(bp.dL_dw00, 9)}
∂L/∂w₁₂ = δ_h₁ × x₂ = ${fmtNN(bp.delta_h1, 7)} × 0.8 = ${fmtNN(bp.dL_dw01, 9)}
∂L/∂w₂₁ = δ_h₂ × x₁ = ${fmtNN(bp.delta_h2, 7)} × 0.6 = ${fmtNN(bp.dL_dw10, 9)}
∂L/∂w₂₂ = δ_h₂ × x₂ = ${fmtNN(bp.delta_h2, 7)} × 0.8 = ${fmtNN(bp.dL_dw11, 9)}

All biases:
∂L/∂b_h₁ = δ_h₁ = ${fmtNN(bp.delta_h1, 9)}
∂L/∂b_h₂ = δ_h₂ = ${fmtNN(bp.delta_h2, 9)}`,
      note: "📌 We now have a gradient for EVERY parameter. Backprop is complete!",
    },
    {
      title: "Step 6 — Update Weights (Gradient Descent)",
      color: T.green,
      icon: "⬆️",
      explain: `With all gradients computed, we update every weight using Gradient Descent.
Learning rate α controls step size. Too large → overshoot and diverge.
Too small → training takes forever. Typical values: 0.001 to 0.1.
We SUBTRACT the gradient because we want to go DOWNHILL on the loss surface.`,
      math: `Learning rate: α = 0.1

Output weights update:
  v₁_new = 0.6 − 0.1 × ${fmtNN(bp.dL_dv0)} = ${fmtNN(0.6 - 0.1 * bp.dL_dv0, 6)}
  v₂_new = -0.2 − 0.1 × ${fmtNN(bp.dL_dv1)} = ${fmtNN(-0.2 - 0.1 * bp.dL_dv1, 6)}

Hidden weights update (sample):
  w₁₁_new = 0.5 − 0.1 × ${fmtNN(bp.dL_dw00)} = ${fmtNN(0.5 - 0.1 * bp.dL_dw00, 6)}
  w₁₂_new = 0.3 − 0.1 × ${fmtNN(bp.dL_dw01)} = ${fmtNN(0.3 - 0.1 * bp.dL_dw01, 6)}

After update:
  Loss was: ${fmtNN(bp.loss, 6)}
  Loss will be slightly smaller → repeat!`,
      note: "📌 One iteration done. Real training repeats this thousands of times until loss is near 0.",
    },
  ];

  const s = steps[step];

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: T.mono, fontSize: 9, color: T.cyanDim, letterSpacing: 4, marginBottom: 8 }}>MODULE 06 / BACKPROPAGATION</div>
        <div style={{ fontFamily: T.serif, fontSize: 26, color: T.text, marginBottom: 8 }}>Backpropagation — Learning from Mistakes</div>
        <div style={{ color: T.textSoft, fontSize: 13 }}>
          Gradients flow right to left. The chain rule tells us exactly how much every weight caused the error.
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: 20 }}>
        {/* Left */}
        <div>
          <Card color={s.color} style={{ marginBottom: 14 }}>
            <NetworkSVG x1={x1} x2={x2} fwd={bp} showValues={true}
              highlightPath={step === 0 ? null : "backward"} />
          </Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <StepBtn onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} dir="prev" />
            <Progress current={step} total={steps.length} color={s.color} />
            <StepBtn onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} disabled={step === steps.length - 1} dir="next" />
          </div>
          {steps.map((st, i) => (
            <button key={i} onClick={() => setStep(i)} style={{
              display: "flex", alignItems: "center", gap: 8,
              background: step === i ? `${st.color}18` : "transparent",
              border: `1px solid ${step === i ? st.color : "transparent"}`,
              borderRadius: 5, padding: "5px 10px", cursor: "pointer",
              textAlign: "left", width: "100%", marginBottom: 3,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: i <= step ? st.color : T.textDim, flexShrink: 0 }} />
              <div style={{ fontFamily: T.mono, fontSize: 9, color: i <= step ? st.color : T.textDim, letterSpacing: 1 }}>
                {st.title}
              </div>
            </button>
          ))}
        </div>

        {/* Right */}
        <Card color={s.color}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ fontSize: 32 }}>{s.icon}</div>
            <div>
              <div style={{ fontFamily: T.mono, fontSize: 9, color: s.color, letterSpacing: 3 }}>
                {step === 0 ? "CONCEPT" : `STEP ${step} OF ${steps.length - 1}`}
              </div>
              <div style={{ fontFamily: T.serif, fontSize: 18, color: T.text }}>{s.title}</div>
            </div>
          </div>
          <div style={{ color: T.text, fontSize: 13, lineHeight: 1.75, marginBottom: 14 }}>{s.explain}</div>
          <MathBlock title="MATH" lines={s.math} color={s.color} note={s.note} />
        </Card>
      </div>

      {/* Gradient summary at end */}
      {step === steps.length - 1 && (
        <div style={{ marginTop: 20, background: `${T.green}0a`, border: `1px solid ${T.green}44`, borderRadius: 8, padding: "16px 20px" }}>
          <Label color={T.green}>✅ ALL GRADIENTS COMPUTED — BEFORE vs. AFTER UPDATE (α=0.1)</Label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 10 }}>
            {[
              { p: "w₁₁", old: 0.5,  g: bp.dL_dw00, c: T.inputC },
              { p: "w₁₂", old: 0.3,  g: bp.dL_dw01, c: T.inputC },
              { p: "w₂₁", old: -0.4, g: bp.dL_dw10, c: T.inputC },
              { p: "w₂₂", old: 0.7,  g: bp.dL_dw11, c: T.inputC },
              { p: "v₁",  old: 0.6,  g: bp.dL_dv0,  c: T.hiddenC },
              { p: "v₂",  old: -0.2, g: bp.dL_dv1,  c: T.hiddenC },
              { p: "b_h₁",old: 0.1,  g: bp.delta_h1, c: T.purple },
              { p: "b_o", old: 0.2,  g: bp.dL_dbo,  c: T.purple },
            ].map(item => (
              <div key={item.p} style={{
                background: T.surface, border: `1px solid ${item.c}33`,
                borderRadius: 6, padding: 10, textAlign: "center"
              }}>
                <div style={{ fontFamily: T.mono, fontSize: 10, color: item.c, marginBottom: 6 }}>{item.p}</div>
                <div style={{ fontFamily: T.mono, fontSize: 9, color: T.textSoft }}>{fmtNN(item.old, 4)} → </div>
                <div style={{ fontFamily: T.mono, fontSize: 12, color: T.green, fontWeight: "bold" }}>
                  {fmtNN(item.old - 0.1 * item.g, 4)}
                </div>
                <div style={{ fontFamily: T.mono, fontSize: 8, color: T.textDim, marginTop: 2 }}>
                  Δ = {fmtNN(-0.1 * item.g, 5)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 6 — TRAINING LOOP (animated)
// ─────────────────────────────────────────────────────────────────────────────
function SectionTraining() {
  const [running, setRunning] = useState(false);
  const [iter, setIter] = useState(0);
  const [history, setHistory] = useState([]);
  const [weights, setWeights] = useState({ ...INIT_W });
  const animRef = useRef(null);
  const x1 = 0.6, x2 = 0.8, target = 1.0, alpha = 0.5;
  const maxIter = 80;

  const reset = () => {
    setRunning(false);
    setIter(0);
    setHistory([]);
    setWeights({ ...INIT_W });
    if (animRef.current) clearInterval(animRef.current);
  };

  const doStep = useCallback((W, currentIter) => {
    const { w, b_h, v, b_o } = W;
    const { z_h1, z_h2, a_h1, a_h2, z_o, a_o } = forwardPass(x1, x2, W);
    const L = mse(a_o, target);

    // Backprop
    const dL_dao = a_o - target;
    const dao_dzo = a_o * (1 - a_o);
    const delta_o = dL_dao * dao_dzo;

    const dL_dv0 = delta_o * a_h1;
    const dL_dv1 = delta_o * a_h2;
    const dL_dbo = delta_o;

    const delta_h1 = delta_o * v[0] * (a_h1 * (1 - a_h1));
    const delta_h2 = delta_o * v[1] * (a_h2 * (1 - a_h2));

    // Update
    const newW = {
      w: [
        [w[0][0] - alpha * delta_h1 * x1, w[0][1] - alpha * delta_h1 * x2],
        [w[1][0] - alpha * delta_h2 * x1, w[1][1] - alpha * delta_h2 * x2],
      ],
      b_h: [b_h[0] - alpha * delta_h1, b_h[1] - alpha * delta_h2],
      v: [v[0] - alpha * dL_dv0, v[1] - alpha * dL_dv1],
      b_o: b_o - alpha * dL_dbo,
    };
    return { newW, L, a_o, currentIter };
  }, []);

  useEffect(() => {
    if (!running) return;
    animRef.current = setInterval(() => {
      setWeights(prevW => {
        setIter(prevIter => {
          if (prevIter >= maxIter) { setRunning(false); return prevIter; }
          const result = doStep(prevW, prevIter);
          setHistory(h => [...h.slice(-79), { iter: prevIter, loss: result.L, pred: result.a_o }]);
          if (prevIter === maxIter - 1) setRunning(false);
          return prevIter + 1;
        });
        const result = doStep(prevW, 0);
        return result.newW;
      });
    }, 80);
    return () => clearInterval(animRef.current);
  }, [running, doStep]);

  const fwd = forwardPass(x1, x2, weights);
  const currentLoss = mse(fwd.a_o, target);
  const lossHistW = 360, lossHistH = 120;

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: T.mono, fontSize: 9, color: T.cyanDim, letterSpacing: 4, marginBottom: 8 }}>MODULE 07 / TRAINING LOOP</div>
        <div style={{ fontFamily: T.serif, fontSize: 26, color: T.text, marginBottom: 8 }}>The Training Loop — Watch the Network Learn</div>
        <div style={{ color: T.textSoft, fontSize: 13 }}>
          Forward pass → loss → backprop → update → repeat. Watch the loss decrease in real-time.
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "center" }}>
        <button onClick={() => setRunning(r => !r)} style={{
          padding: "10px 28px", fontFamily: T.mono, fontSize: 12, letterSpacing: 2,
          background: running ? `${T.orange}22` : `${T.green}22`,
          border: `1px solid ${running ? T.orange : T.green}`,
          color: running ? T.orange : T.green,
          borderRadius: 6, cursor: "pointer",
        }}>{running ? "⏸ PAUSE" : iter === 0 ? "▶ START TRAINING" : "▶ RESUME"}</button>
        <button onClick={reset} style={{
          padding: "10px 20px", fontFamily: T.mono, fontSize: 12, letterSpacing: 2,
          background: T.surface, border: `1px solid ${T.border}`, color: T.textSoft,
          borderRadius: 6, cursor: "pointer",
        }}>↺ RESET</button>
        <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textSoft }}>
          α (learning rate) = {alpha} | Iterations: {iter}/{maxIter}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "5fr 3fr", gap: 20 }}>
        {/* Network */}
        <div>
          <Card color={running ? T.green : T.border} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <Label color={T.cyan}>NETWORK STATE</Label>
              {running && (
                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: 6, height: 6, borderRadius: "50%", background: T.green,
                      animation: `pulse 1s ${i * 0.3}s infinite`,
                    }} />
                  ))}
                  <div style={{ fontFamily: T.mono, fontSize: 10, color: T.green, marginLeft: 4 }}>TRAINING</div>
                </div>
              )}
            </div>
            <NetworkSVG x1={x1} x2={x2} fwd={fwd} showValues={true}
              highlightPath={running ? "forward" : null}
              animating={running}
            />
          </Card>

          {/* Loss history chart */}
          <Card color={T.border}>
            <Label color={T.orange}>LOSS OVER ITERATIONS</Label>
            <svg viewBox={`0 0 ${lossHistW} ${lossHistH + 24}`} style={{ width: "100%", display: "block", marginTop: 8 }}>
              {/* grid */}
              {[0, 0.05, 0.1, 0.15, 0.2].map(l => {
                const y = lossHistH - (l / 0.2) * lossHistH;
                return (
                  <g key={l}>
                    <line x1={0} y1={y} x2={lossHistW} y2={y} stroke={T.border} strokeWidth={0.5} />
                    <text x={2} y={y - 2} fill={T.textDim} fontSize="7" fontFamily={T.mono}>{l.toFixed(2)}</text>
                  </g>
                );
              })}
              {history.length > 1 && (
                <polyline
                  points={history.map((h, i) => {
                    const px = (i / (maxIter - 1)) * lossHistW;
                    const py = lossHistH - Math.min(1, h.loss / 0.2) * lossHistH;
                    return `${px},${py}`;
                  }).join(" ")}
                  fill="none" stroke={T.orange} strokeWidth={2}
                />
              )}
              {history.length > 0 && (() => {
                const last = history[history.length - 1];
                const px = ((history.length - 1) / (maxIter - 1)) * lossHistW;
                const py = lossHistH - Math.min(1, last.loss / 0.2) * lossHistH;
                return <circle cx={px} cy={py} r={4} fill={T.orange} />;
              })()}
              {/* Axes */}
              <text x={lossHistW / 2} y={lossHistH + 18} textAnchor="middle" fill={T.textDim} fontSize="8" fontFamily={T.mono}>Iteration →</text>
            </svg>
          </Card>
        </div>

        {/* Right: metrics */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Live metrics */}
          <Card color={T.border}>
            <Label color={T.cyan}>LIVE METRICS</Label>
            {[
              { l: "Iteration", v: iter, c: T.cyan },
              { l: "Loss", v: fmtNN(currentLoss, 6), c: T.orange },
              { l: "Prediction ŷ", v: fmtNN(fwd.a_o, 4), c: T.green },
              { l: "Target y", v: "1.0000", c: T.textSoft },
              { l: "Error (ŷ−y)", v: fmtNN(fwd.a_o - target, 4), c: T.red },
            ].map(m => (
              <div key={m.l} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "7px 0", borderBottom: `1px solid ${T.border}`,
              }}>
                <div style={{ fontFamily: T.mono, fontSize: 10, color: T.textSoft }}>{m.l}</div>
                <div style={{ fontFamily: T.mono, fontSize: 13, color: m.c, fontWeight: "bold" }}>{m.v}</div>
              </div>
            ))}
          </Card>

          {/* Current weights */}
          <Card color={T.border}>
            <Label color={T.yellow}>CURRENT WEIGHTS</Label>
            {[
              { l: "w₁₁", v: weights.w[0][0], c: T.inputC },
              { l: "w₁₂", v: weights.w[0][1], c: T.inputC },
              { l: "w₂₁", v: weights.w[1][0], c: T.inputC },
              { l: "w₂₂", v: weights.w[1][1], c: T.inputC },
              { l: "v₁",  v: weights.v[0],    c: T.hiddenC },
              { l: "v₂",  v: weights.v[1],    c: T.hiddenC },
              { l: "b_h₁",v: weights.b_h[0],  c: T.purple },
              { l: "b_h₂",v: weights.b_h[1],  c: T.purple },
              { l: "b_o", v: weights.b_o,     c: T.purple },
            ].map(w => (
              <div key={w.l} style={{
                display: "flex", justifyContent: "space-between",
                padding: "4px 0", borderBottom: `1px solid ${T.border}`,
              }}>
                <div style={{ fontFamily: T.mono, fontSize: 10, color: w.c }}>{w.l}</div>
                <div style={{ fontFamily: T.mono, fontSize: 10, color: T.text }}>{fmtNN(w.v, 5)}</div>
              </div>
            ))}
          </Card>

          {iter >= maxIter && (
            <div style={{
              background: `${T.green}15`, border: `1px solid ${T.green}44`,
              borderRadius: 8, padding: 14, textAlign: "center"
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>🎉</div>
              <div style={{ fontFamily: T.mono, fontSize: 10, color: T.green, letterSpacing: 2, marginBottom: 6 }}>TRAINING COMPLETE</div>
              <div style={{ fontFamily: T.mono, fontSize: 20, color: T.green, marginBottom: 4 }}>{fmtNN(currentLoss, 6)}</div>
              <div style={{ fontFamily: T.mono, fontSize: 9, color: T.textSoft }}>FINAL LOSS</div>
              <div style={{ fontFamily: T.mono, fontSize: 14, color: T.cyan, marginTop: 8 }}>
                Prediction: {(fwd.a_o * 100).toFixed(1)}%
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 7 — PLAYGROUND
// ─────────────────────────────────────────────────────────────────────────────
function SectionPlayground() {
  const [x1, setX1] = useState(0.6);
  const [x2, setX2] = useState(0.8);
  const [target, setTarget] = useState(1.0);
  const fwd = forwardPass(x1, x2);
  const loss = mse(fwd.a_o, target);

  const sliderStyle = (color) => ({
    width: "100%", margin: "6px 0", accentColor: color, cursor: "pointer",
  });

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: T.mono, fontSize: 9, color: T.cyanDim, letterSpacing: 4, marginBottom: 8 }}>MODULE 08 / PLAYGROUND</div>
        <div style={{ fontFamily: T.serif, fontSize: 26, color: T.text, marginBottom: 8 }}>Interactive Playground — Try It Yourself</div>
        <div style={{ color: T.textSoft, fontSize: 13 }}>
          Adjust the input values and target. Watch all calculations update in real time.
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 20 }}>
        {/* Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Card color={T.inputC}>
            <Label color={T.inputC}>INPUT VALUES</Label>
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: T.mono, fontSize: 11, color: T.inputC }}>x₁ (Feature 1)</span>
                <span style={{ fontFamily: T.mono, fontSize: 13, color: T.text, fontWeight: "bold" }}>{fmtNN(x1, 2)}</span>
              </div>
              <input type="range" min="0" max="1" step="0.01" value={x1}
                onChange={e => setX1(parseFloat(e.target.value))}
                style={sliderStyle(T.inputC)} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: T.mono, fontSize: 9, color: T.textDim }}>0.00</span>
                <span style={{ fontFamily: T.mono, fontSize: 9, color: T.textDim }}>1.00</span>
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: T.mono, fontSize: 11, color: T.inputC }}>x₂ (Feature 2)</span>
                <span style={{ fontFamily: T.mono, fontSize: 13, color: T.text, fontWeight: "bold" }}>{fmtNN(x2, 2)}</span>
              </div>
              <input type="range" min="0" max="1" step="0.01" value={x2}
                onChange={e => setX2(parseFloat(e.target.value))}
                style={sliderStyle(T.inputC)} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: T.mono, fontSize: 9, color: T.textDim }}>0.00</span>
                <span style={{ fontFamily: T.mono, fontSize: 9, color: T.textDim }}>1.00</span>
              </div>
            </div>
          </Card>

          <Card color={T.orange}>
            <Label color={T.orange}>TARGET VALUE (y)</Label>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: T.mono, fontSize: 11, color: T.orange }}>Correct answer</span>
              <span style={{ fontFamily: T.mono, fontSize: 13, color: T.text, fontWeight: "bold" }}>{fmtNN(target, 2)}</span>
            </div>
            <input type="range" min="0" max="1" step="0.01" value={target}
              onChange={e => setTarget(parseFloat(e.target.value))}
              style={sliderStyle(T.orange)} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: T.mono, fontSize: 9, color: T.textDim }}>0.00 (class 0)</span>
              <span style={{ fontFamily: T.mono, fontSize: 9, color: T.textDim }}>1.00 (class 1)</span>
            </div>
          </Card>

          {/* Result summary */}
          <Card color={loss < 0.05 ? T.green : loss < 0.1 ? T.yellow : T.red}>
            <Label color={loss < 0.05 ? T.green : T.orange}>PREDICTION RESULT</Label>
            <div style={{ textAlign: "center", padding: "10px 0" }}>
              <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textSoft, marginBottom: 4 }}>Prediction ŷ</div>
              <div style={{
                fontFamily: T.mono, fontSize: 36, fontWeight: "bold",
                color: loss < 0.05 ? T.green : loss < 0.1 ? T.yellow : T.red
              }}>{fmtNN(fwd.a_o, 3)}</div>
              <div style={{ fontFamily: T.mono, fontSize: 12, color: T.textSoft, marginTop: 4 }}>
                = {(fwd.a_o * 100).toFixed(1)}% → class {fwd.a_o >= 0.5 ? "1" : "0"}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <div style={{ flex: 1, background: T.surface, borderRadius: 6, padding: 8, textAlign: "center" }}>
                <div style={{ fontFamily: T.mono, fontSize: 9, color: T.textSoft }}>LOSS</div>
                <div style={{ fontFamily: T.mono, fontSize: 13, color: T.orange }}>{fmtNN(loss, 5)}</div>
              </div>
              <div style={{ flex: 1, background: T.surface, borderRadius: 6, padding: 8, textAlign: "center" }}>
                <div style={{ fontFamily: T.mono, fontSize: 9, color: T.textSoft }}>ERROR</div>
                <div style={{ fontFamily: T.mono, fontSize: 13, color: T.red }}>{fmtNN(fwd.a_o - target, 4)}</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: full computation */}
        <div>
          <Card color={T.border} style={{ marginBottom: 14 }}>
            <NetworkSVG x1={x1} x2={x2} fwd={fwd} showValues={true} />
          </Card>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Card color={T.hiddenC}>
              <Label color={T.hiddenC}>HIDDEN LAYER LIVE</Label>
              <MathBlock color={T.hiddenC} lines={
`z_h₁ = 0.5×${fmtNN(x1,2)} + 0.3×${fmtNN(x2,2)} + 0.1
    = ${fmtNN(fwd.z_h1, 4)}
a_h₁ = σ(${fmtNN(fwd.z_h1, 4)}) = ${fmtNN(fwd.a_h1, 4)}

z_h₂ = -0.4×${fmtNN(x1,2)} + 0.7×${fmtNN(x2,2)} - 0.1
    = ${fmtNN(fwd.z_h2, 4)}
a_h₂ = σ(${fmtNN(fwd.z_h2, 4)}) = ${fmtNN(fwd.a_h2, 4)}`} />
            </Card>
            <Card color={T.outputC}>
              <Label color={T.outputC}>OUTPUT LAYER LIVE</Label>
              <MathBlock color={T.outputC} lines={
`z_o = 0.6×${fmtNN(fwd.a_h1,4)}
    + -0.2×${fmtNN(fwd.a_h2,4)}
    + 0.2
    = ${fmtNN(fwd.z_o, 4)}

ŷ = σ(${fmtNN(fwd.z_o,4)})
  = ${fmtNN(fwd.a_o, 4)}`} />
            </Card>
          </div>

          {/* Quick backprop preview */}
          <Card color={T.orange} style={{ marginTop: 14 }}>
            <Label color={T.orange}>BACKPROP PREVIEW — KEY GRADIENTS</Label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 8 }}>
              {(() => {
                const bp = backprop(x1, x2, target);
                return [
                  { l: "dL/dŷ", v: fmtNN(bp.dL_dao, 4), c: T.red },
                  { l: "δ_output", v: fmtNN(bp.delta_o, 4), c: T.orange },
                  { l: "δ_h₁", v: fmtNN(bp.delta_h1, 5), c: T.hiddenC },
                  { l: "δ_h₂", v: fmtNN(bp.delta_h2, 5), c: T.hiddenC },
                  { l: "∂L/∂v₁", v: fmtNN(bp.dL_dv0, 5), c: T.yellow },
                  { l: "∂L/∂v₂", v: fmtNN(bp.dL_dv1, 5), c: T.yellow },
                  { l: "∂L/∂w₁₁", v: fmtNN(bp.dL_dw00, 5), c: T.inputC },
                  { l: "∂L/∂w₂₁", v: fmtNN(bp.dL_dw10, 5), c: T.inputC },
                ].map(g => (
                  <div key={g.l} style={{
                    background: T.surface, border: `1px solid ${g.c}33`,
                    borderRadius: 6, padding: "8px 6px", textAlign: "center"
                  }}>
                    <div style={{ fontFamily: T.mono, fontSize: 8, color: g.c, marginBottom: 4 }}>{g.l}</div>
                    <div style={{ fontFamily: T.mono, fontSize: 11, color: T.text }}>{g.v}</div>
                  </div>
                ));
              })()}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 8 — SUMMARY + QUIZ
// ─────────────────────────────────────────────────────────────────────────────
function SectionSummary() {
  const [revealed, setRevealed] = useState({});
  const toggle = (k) => setRevealed(r => ({ ...r, [k]: !r[k] }));

  const quiz = [
    {
      q: "A neural network has 3 layers: input, one hidden, output. How many weight matrices does it have?",
      a: "2 weight matrices. One connecting input→hidden, one connecting hidden→output. Each layer boundary has one set of weights.",
      c: T.cyan,
    },
    {
      q: "Why would a neural network with NO activation functions always fail at complex tasks?",
      a: "Without activation, every layer computes a linear transformation. Any composition of linear functions is still just one linear function. So a 100-layer network without activations is mathematically identical to a 1-layer linear network — it can only draw straight decision boundaries.",
      c: T.red,
    },
    {
      q: "During backprop, the gradient for weight w is computed as δ × x. What does x represent here?",
      a: "x is the input that fed INTO that weight during the forward pass. Intuitively: if a weight received a large input and caused a large error, its gradient should be large — hence we multiply by the input value.",
      c: T.orange,
    },
    {
      q: "What does a negative gradient mean for a weight, and what happens when we subtract it?",
      a: "A negative gradient means increasing that weight would DECREASE the loss. When we subtract (w_new = w - α × gradient), subtracting a negative number INCREASES the weight — exactly what we want. Gradient descent automatically handles the direction!",
      c: T.green,
    },
    {
      q: "If the learning rate α is set too high, what problem occurs? What if it's too low?",
      a: "Too high: the weights overshoot the minimum — the network oscillates wildly and loss may actually increase or diverge. Too low: the network converges, but takes thousands of extra iterations. Typical good values: 0.001 to 0.01 with Adam optimizer.",
      c: T.purple,
    },
    {
      q: "The sigmoid derivative at z=0 is 0.25. At z=10, it's nearly 0. Why is this a problem?",
      a: "This is the 'vanishing gradient' problem. When gradients are nearly zero, weight updates are nearly zero — the network stops learning. Layers far from the output receive almost no signal. This is why ReLU (derivative = 1 for z>0) is preferred in deep networks.",
      c: T.yellow,
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: T.mono, fontSize: 9, color: T.cyanDim, letterSpacing: 4, marginBottom: 8 }}>MODULE 09 / SUMMARY + QUIZ</div>
        <div style={{ fontFamily: T.serif, fontSize: 26, color: T.text, marginBottom: 8 }}>Summary & Knowledge Check</div>
      </div>

      {/* Two-column summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        <Card color={T.cyan}>
          <Label color={T.cyan}>► FORWARD PASS SUMMARY</Label>
          {[
            ["1. Input",          "Feed raw data x₁, x₂, ... into the input layer",             T.inputC ],
            ["2. Weighted Sum",   "z = w₁x₁ + w₂x₂ + ... + b for each neuron",                 T.cyan   ],
            ["3. Activation",     "a = f(z) — apply ReLU/Sigmoid to add non-linearity",          T.red    ],
            ["4. Repeat Layers",  "Each layer feeds into the next, left to right",               T.hiddenC],
            ["5. Output",         "Final layer produces prediction ŷ",                           T.outputC],
            ["6. Interpret",      "Sigmoid output → probability; regression → raw value",        T.green  ],
          ].map(([t, d, c]) => (
            <div key={t} style={{ display: "flex", gap: 10, padding: "6px 0", borderBottom: `1px solid ${T.border}` }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: c, marginTop: 5, flexShrink: 0 }} />
              <div>
                <span style={{ fontFamily: T.mono, fontSize: 10, color: c }}>{t} </span>
                <span style={{ color: T.textSoft, fontSize: 12 }}>{d}</span>
              </div>
            </div>
          ))}
        </Card>

        <Card color={T.orange}>
          <Label color={T.orange}>◄ BACKPROPAGATION SUMMARY</Label>
          {[
            ["1. Compute Loss",   "L = ½(ŷ−y)² — how wrong was the prediction?",                T.red    ],
            ["2. Output Gradient","dL/dŷ = ŷ−y — how much does loss change per unit ŷ?",        T.orange ],
            ["3. Output Delta",   "δ_o = dL/dŷ × σ'(z_o) — combine with activation deriv",     T.orange ],
            ["4. Weight Grads",   "∂L/∂w = δ × input — credit each weight for the error",       T.yellow ],
            ["5. Propagate Back", "δ_h = δ_o × w × σ'(z_h) — flow error into hidden layers",   T.hiddenC],
            ["6. Update Weights", "w_new = w − α × ∂L/∂w — gradient descent step",             T.green  ],
          ].map(([t, d, c]) => (
            <div key={t} style={{ display: "flex", gap: 10, padding: "6px 0", borderBottom: `1px solid ${T.border}` }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: c, marginTop: 5, flexShrink: 0 }} />
              <div>
                <span style={{ fontFamily: T.mono, fontSize: 10, color: c }}>{t} </span>
                <span style={{ color: T.textSoft, fontSize: 12 }}>{d}</span>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Key formulas */}
      <Card color={T.border} style={{ marginBottom: 24 }}>
        <Label color={T.yellow}>📐 KEY FORMULAS REFERENCE CARD</Label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 10 }}>
          {[
            { t: "Weighted Sum",       f: "z = Σ(wᵢxᵢ) + b",       c: T.cyan    },
            { t: "Sigmoid",            f: "σ(z) = 1/(1+e⁻ᶻ)",       c: T.red     },
            { t: "Sigmoid Derivative", f: "σ'(z) = σ(z)(1−σ(z))",   c: T.red     },
            { t: "ReLU",               f: "f(z) = max(0, z)",        c: T.green   },
            { t: "MSE Loss",           f: "L = ½(ŷ−y)²",            c: T.orange  },
            { t: "dL/dŷ (MSE)",        f: "= ŷ − y",                 c: T.orange  },
            { t: "Output Delta",       f: "δ_o = dL/dŷ × σ'(z_o)",  c: T.yellow  },
            { t: "Weight Gradient",    f: "∂L/∂w = δ × input",       c: T.purple  },
            { t: "Weight Update",      f: "w ← w − α × ∂L/∂w",      c: T.green   },
          ].map(item => (
            <div key={item.t} style={{ background: T.surface, border: `1px solid ${item.c}33`, borderRadius: 6, padding: 10 }}>
              <div style={{ fontFamily: T.mono, fontSize: 9, color: item.c, letterSpacing: 1, marginBottom: 5 }}>{item.t}</div>
              <div style={{ fontFamily: T.mono, fontSize: 12, color: T.text }}>{item.f}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quiz */}
      <div style={{ marginBottom: 8 }}>
        <Label color={T.green} style={{ fontSize: 11, letterSpacing: 3 }}>🧠 KNOWLEDGE CHECK — CLICK TO REVEAL ANSWERS</Label>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {quiz.map((item, i) => (
          <div key={i} onClick={() => toggle(i)} style={{
            background: revealed[i] ? `${item.c}0e` : T.card,
            border: `1px solid ${revealed[i] ? item.c : T.border}`,
            borderRadius: 8, padding: "14px 18px", cursor: "pointer",
            transition: "all 0.2s",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <div style={{ display: "flex", gap: 12, flex: 1 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                  background: `${item.c}22`, border: `1px solid ${item.c}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: T.mono, fontSize: 10, color: item.c
                }}>Q{i + 1}</div>
                <div style={{ color: T.text, fontSize: 13, lineHeight: 1.6, fontWeight: "500" }}>{item.q}</div>
              </div>
              <div style={{ fontFamily: T.mono, fontSize: 16, color: revealed[i] ? item.c : T.textDim, flexShrink: 0 }}>
                {revealed[i] ? "▲" : "▼"}
              </div>
            </div>
            {revealed[i] && (
              <div style={{
                marginTop: 12, paddingTop: 12, borderTop: `1px solid ${item.c}33`,
                color: T.text, fontSize: 13, lineHeight: 1.75,
                borderLeft: `3px solid ${item.c}`, paddingLeft: 12
              }}>
                ✅ {item.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Next steps */}
      <div style={{ marginTop: 24, background: `${T.cyan}08`, border: `1px solid ${T.cyan}33`, borderRadius: 10, padding: "16px 20px" }}>
        <Label color={T.cyan}>🚀 WHERE TO GO NEXT</Label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 12 }}>
          {[
            { icon: "🖼️", t: "CNNs", d: "Convolutional networks for images. Add spatial structure.", c: T.cyan },
            { icon: "📝", t: "RNNs / LSTMs", d: "Recurrent networks for sequences, text, and time.", c: T.purple },
            { icon: "🤖", t: "Transformers", d: "Attention mechanism — powers GPT, Claude, BERT.", c: T.orange },
            { icon: "🎲", t: "GANs", d: "Two networks compete — one generates, one judges.", c: T.green },
          ].map(n => (
            <div key={n.t} style={{ background: T.card, border: `1px solid ${n.c}33`, borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{n.icon}</div>
              <div style={{ fontFamily: T.mono, fontSize: 11, color: n.c, marginBottom: 6 }}>{n.t}</div>
              <div style={{ color: T.textSoft, fontSize: 11, lineHeight: 1.5 }}>{n.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────
const TABS = [
  { id: 0, label: "Overview",          icon: "01", short: "OVERVIEW",      color: T.cyan,    component: <SectionOverview /> },
  { id: 1, label: "Architecture",      icon: "02", short: "ARCHITECTURE",  color: T.inputC,  component: <SectionArchitecture /> },
  { id: 2, label: "Forward Pass",      icon: "03", short: "FORWARD PASS",  color: T.hiddenC, component: <SectionForwardPass /> },
  { id: 3, label: "Activations",       icon: "04", short: "ACTIVATIONS",   color: T.red,     component: <SectionActivations /> },
  { id: 4, label: "Loss Function",     icon: "05", short: "LOSS",          color: T.orange,  component: <SectionLoss /> },
  { id: 5, label: "Backpropagation",   icon: "06", short: "BACKPROP",      color: T.yellow,  component: <SectionBackprop /> },
  { id: 6, label: "Training Loop",     icon: "07", short: "TRAINING",      color: T.green,   component: <SectionTraining /> },
  { id: 7, label: "Playground",        icon: "08", short: "PLAYGROUND",    color: T.purple,  component: <SectionPlayground /> },
  { id: 8, label: "Summary & Quiz",    icon: "09", short: "QUIZ",          color: T.cyan,    component: <SectionSummary /> },
];

function NeuralNetLesson() {
  const [tab, setTab] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [tab]);

  const current = TABS[tab];

  return (
    <div style={{
      background: T.bg, minHeight: "100vh",
      fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
      color: T.text, position: "relative",
    }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${T.surface}; }
        ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${T.cyanDim}; }
        * { box-sizing: border-box; }
      `}</style>

      <BlueprintBg />

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div style={{
        position: "relative", zIndex: 10,
        background: `linear-gradient(180deg, #040d1a 0%, ${T.bg} 100%)`,
        borderBottom: `1px solid ${T.border}`,
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "18px 28px 0" }}>
          {/* Top bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <div style={{
                fontFamily: T.mono, fontSize: 8, color: T.cyanDim,
                letterSpacing: 5, marginBottom: 8
              }}>
                NEURAL NETWORK FUNDAMENTALS · INTERACTIVE CURRICULUM
              </div>
              <div style={{
                fontFamily: "'Georgia', serif", fontSize: 24, fontWeight: "bold",
                background: `linear-gradient(120deg, ${T.cyan}, ${T.purple})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                lineHeight: 1.2, marginBottom: 4,
              }}>
                Feedforward Neural Networks
              </div>
              <div style={{ fontFamily: "'Georgia', serif", fontSize: 14, color: T.textSoft, letterSpacing: 1 }}>
                & Backpropagation · Complete Step-by-Step Guide
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: T.mono, fontSize: 9, color: T.textDim, letterSpacing: 2, marginBottom: 4 }}>EXAMPLE NETWORK</div>
              <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textSoft }}>Architecture: 2 → 2 → 1</div>
              <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textSoft }}>Inputs: x₁=0.6, x₂=0.8</div>
              <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textSoft }}>Activation: Sigmoid</div>
              <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textSoft }}>Loss: MSE</div>
            </div>
          </div>

          {/* Tab nav */}
          <div style={{ display: "flex", gap: 2, overflowX: "auto" }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: "9px 14px", border: "none", cursor: "pointer",
                background: tab === t.id ? T.card : "transparent",
                borderTop: `2px solid ${tab === t.id ? t.color : "transparent"}`,
                color: tab === t.id ? t.color : T.textDim,
                fontFamily: T.mono, fontSize: 9, letterSpacing: 1.5,
                borderRadius: "4px 4px 0 0",
                whiteSpace: "nowrap", transition: "all 0.15s",
                flexShrink: 0,
              }}>
                <span style={{ marginRight: 5, opacity: 0.5 }}>{t.icon}</span>{t.short}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROGRESS BAR ───────────────────────────────────────────────────── */}
      <div style={{ display: "flex", height: 2 }}>
        {TABS.map(t => (
          <div key={t.id} style={{
            flex: 1,
            background: t.id <= tab ? t.color : T.surface,
            transition: "background 0.3s",
          }} />
        ))}
      </div>

      {/* ── CONTENT ────────────────────────────────────────────────────────── */}
      <div ref={scrollRef} style={{
        position: "relative", zIndex: 5,
        maxWidth: 1100, margin: "0 auto",
        padding: "28px 28px 40px",
      }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          <div style={{ fontFamily: T.mono, fontSize: 9, color: T.textDim, letterSpacing: 2 }}>NEURAL NETWORKS</div>
          <div style={{ color: T.textDim }}>›</div>
          <div style={{ fontFamily: T.mono, fontSize: 9, color: current.color, letterSpacing: 2 }}>{current.short}</div>
          <div style={{ flex: 1 }} />
          <div style={{ fontFamily: T.mono, fontSize: 9, color: T.textDim }}>
            {tab + 1} / {TABS.length}
          </div>
        </div>

        {/* Page content */}
        <div key={tab}>
          {TABS[tab].component}
        </div>

        {/* ── BOTTOM NAV ─────────────────────────────────────────────────── */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginTop: 36, paddingTop: 20,
          borderTop: `1px solid ${T.border}`,
        }}>
          <button
            onClick={() => setTab(t => Math.max(0, t - 1))}
            disabled={tab === 0}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 22px", fontFamily: T.mono, fontSize: 11, letterSpacing: 2,
              background: tab === 0 ? "transparent" : T.card,
              border: `1px solid ${tab === 0 ? "transparent" : T.border}`,
              color: tab === 0 ? "transparent" : T.text,
              borderRadius: 6, cursor: tab === 0 ? "default" : "pointer",
            }}
          >
            ← {tab > 0 ? TABS[tab - 1].short : ""}
          </button>

          <div style={{ display: "flex", gap: 6 }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                width: t.id === tab ? 24 : 8, height: 8, borderRadius: 4,
                background: t.id === tab ? t.color : t.id < tab ? `${t.color}55` : T.border,
                border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0,
              }} />
            ))}
          </div>

          <button
            onClick={() => setTab(t => Math.min(TABS.length - 1, t + 1))}
            disabled={tab === TABS.length - 1}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 22px", fontFamily: T.mono, fontSize: 11, letterSpacing: 2,
              background: tab === TABS.length - 1 ? "transparent" : `${current.color}18`,
              border: `1px solid ${tab === TABS.length - 1 ? "transparent" : current.color}`,
              color: tab === TABS.length - 1 ? "transparent" : current.color,
              borderRadius: 6, cursor: tab === TABS.length - 1 ? "default" : "pointer",
            }}
          >
            {tab < TABS.length - 1 ? TABS[tab + 1].short : ""} →
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// COMBINED NAVIGATION WRAPPER
// ============================================================

export default function DeepLearningCombined() {
  const [activeModule, setActiveModule] = React.useState(0);

  const modules = [
    { id: 0, label: '14. DL Architectures' },
    { id: 1, label: '15. DL Implementation (Py)' },
    { id: 2, label: '15. DL Classroom' },
    { id: 3, label: '37. Neural Networks' },
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
          Deep Learning Suite:
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
        {activeModule === 0 && <DeepLearningAcademy />}
        {activeModule === 1 && <DeepLearningImplementation />}
        {activeModule === 2 && <Classroom />}
        {activeModule === 3 && <NeuralNetLesson />}
      </div>
    </div>
  );
}
