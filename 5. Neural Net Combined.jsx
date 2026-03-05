import { useState, useEffect, useRef, useCallback } from 'react';
import { Brain, Code, BookOpen, Zap, Play, CheckCircle, Eye, Cpu, Activity, GitBranch, Terminal, Copy } from 'lucide-react';


// ============================================================
// 16. ADJUSTING WEIGHT & BIAS
// ============================================================


// ─── Math helpers ─────────────────────────────────────────────────────────────
const sig = x => 1 / (1 + Math.exp(-Math.max(-20, Math.min(20, x))));
const f2  = n => Number(n).toFixed(2);
const f4  = n => Number(n).toFixed(4);
const f6  = n => Number(n).toFixed(6);

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  bg:     "#070c12",
  panel:  "#0d1520",
  card:   "#111d2e",
  border: "#1c3050",
  or:     "#f97316",
  am:     "#fbbf24",
  gr:     "#22c55e",
  rd:     "#ef4444",
  bl:     "#38bdf8",
  pu:     "#a78bfa",
  pi:     "#f472b6",
  dim:    "#64748b",
  dd:     "#334155",
  tx:     "#e2e8f0",
  mono:   "'Courier New', monospace",
  serif:  "Georgia, serif",
};

// ─── Cat pixel art 8x8 ───────────────────────────────────────────────────────
const CAT = [
  [0.1,0.9,0.1,0.1,0.1,0.1,0.9,0.1],
  [0.1,0.9,0.9,0.1,0.1,0.9,0.9,0.1],
  [0.2,0.8,0.8,0.8,0.8,0.8,0.8,0.2],
  [0.3,0.9,0.1,0.9,0.9,0.1,0.9,0.3],
  [0.3,0.8,0.8,0.8,0.8,0.8,0.8,0.3],
  [0.2,0.8,0.1,0.8,0.8,0.1,0.8,0.2],
  [0.1,0.9,0.9,0.1,0.1,0.9,0.9,0.1],
  [0.1,0.1,0.9,0.9,0.9,0.9,0.1,0.1],
];
const DOG = [
  [0.1,0.1,0.9,0.9,0.9,0.9,0.1,0.1],
  [0.1,0.9,0.8,0.8,0.8,0.8,0.9,0.1],
  [0.9,0.8,0.9,0.8,0.8,0.9,0.8,0.9],
  [0.8,0.8,0.8,0.8,0.8,0.8,0.8,0.8],
  [0.8,0.9,0.1,0.8,0.8,0.1,0.9,0.8],
  [0.8,0.8,0.8,0.9,0.9,0.8,0.8,0.8],
  [0.9,0.8,0.8,0.8,0.8,0.8,0.8,0.9],
  [0.1,0.9,0.1,0.1,0.1,0.1,0.9,0.1],
];

// ─── Shared components ────────────────────────────────────────────────────────
function Card({ children, glow, style = {} }) {
  return (
    <div style={{
      background: C.card, borderRadius: 12, padding: 20,
      border: `1px solid ${glow ? glow + "55" : C.border}`,
      boxShadow: glow ? `0 0 28px ${glow}18` : "none",
      marginBottom: 16, ...style,
    }}>{children}</div>
  );
}

function SLabel({ children, color = C.or, note }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontFamily: C.mono, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color, fontWeight: 700 }}>{children}</div>
      {note && <div style={{ fontFamily: C.serif, fontSize: 13, color: C.dim, marginTop: 3, lineHeight: 1.6 }}>{note}</div>}
    </div>
  );
}

function MBox({ children, color = C.am }) {
  return (
    <pre style={{
      background: "#040a10", border: `1px solid ${color}40`,
      borderLeft: `3px solid ${color}`, borderRadius: 8,
      padding: "12px 16px", fontFamily: C.mono, fontSize: 12.5,
      color, margin: "10px 0", lineHeight: 2, whiteSpace: "pre-wrap",
      overflowX: "auto",
    }}>{children}</pre>
  );
}

function Chip({ children, color = C.or }) {
  return (
    <span style={{
      background: color + "18", border: `1px solid ${color}55`,
      borderRadius: 4, padding: "1px 7px",
      fontFamily: C.mono, fontSize: 11, color,
    }}>{children}</span>
  );
}

function Btn({ children, onClick, color = C.or, disabled, sm }) {
  return (
    <button
      onClick={onClick} disabled={disabled}
      style={{
        padding: sm ? "5px 14px" : "8px 20px", borderRadius: 8,
        border: `1px solid ${disabled ? C.dd : color}`,
        background: disabled ? "transparent" : color + "18",
        color: disabled ? C.dd : color,
        fontFamily: C.mono, fontSize: sm ? 11 : 13, fontWeight: 700,
        cursor: disabled ? "default" : "pointer", letterSpacing: 1,
      }}
    >{children}</button>
  );
}

function CkBox({ q, a, color = C.bl }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: color + "0d", border: `1px solid ${color}40`,
      borderRadius: 10, padding: 14, margin: "12px 0",
    }}>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <span style={{ fontSize: 18 }}>🔍</span>
        <div>
          <div style={{ fontFamily: C.serif, fontSize: 13.5, color: C.tx, marginBottom: 8 }}>
            <strong style={{ color }}>Checkpoint: </strong>{q}
          </div>
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              background: "none", border: `1px solid ${color}55`,
              borderRadius: 6, padding: "3px 12px", color,
              fontFamily: C.mono, fontSize: 11, cursor: "pointer",
            }}
          >{open ? "▼ Hide" : "▶ Show Answer"}</button>
          {open && (
            <div style={{
              marginTop: 8, fontFamily: C.serif, fontSize: 13,
              color: C.gr, lineHeight: 1.7,
            }}>{"✅ " + a}</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Python code block ────────────────────────────────────────────────────────
function PyBlock({ code, title }) {
  const [copied, setCopied] = useState(false);
  const KW = ["def","import","from","return","for","in","range","print","if","else","while","class","True","False","None","not","and","or","as","with"];
  const BI = ["np","torch","nn","optim","model","loss","sigmoid","relu","forward","backward","step","zero_grad","self","super"];

  function colorize(line) {
    if (line.trimStart().startsWith("#")) {
      return [{ t: "cm", v: line }];
    }
    const tokens = [];
    let i = 0;
    while (i < line.length) {
      if (line[i] === '"' || line[i] === "'") {
        let j = i + 1;
        while (j < line.length && line[j] !== line[i]) j++;
        tokens.push({ t: "st", v: line.slice(i, j + 1) });
        i = j + 1; continue;
      }
      if (/[0-9]/.test(line[i])) {
        let j = i;
        while (j < line.length && /[0-9.e\-]/.test(line[j])) j++;
        tokens.push({ t: "nm", v: line.slice(i, j) });
        i = j; continue;
      }
      if (/[a-zA-Z_]/.test(line[i])) {
        let j = i;
        while (j < line.length && /[a-zA-Z_0-9]/.test(line[j])) j++;
        const w = line.slice(i, j);
        tokens.push({ t: KW.includes(w) ? "kw" : BI.includes(w) ? "bi" : "id", v: w });
        i = j; continue;
      }
      tokens.push({ t: "op", v: line[i] });
      i++;
    }
    return tokens;
  }

  const cm = { kw: C.pu, bi: C.or, st: C.gr, nm: C.bl, id: C.tx, op: C.dim, cm: C.dd };

  return (
    <div style={{ margin: "12px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontFamily: C.mono, fontSize: 10, color: C.dim, letterSpacing: 2 }}>{"🐍 " + (title || "Python")}</span>
        <button
          onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1400); }}
          style={{ background: "none", border: `1px solid ${C.dd}`, borderRadius: 4, padding: "2px 8px", color: copied ? C.gr : C.dim, fontFamily: C.mono, fontSize: 9, cursor: "pointer" }}
        >{copied ? "✓ copied" : "copy"}</button>
      </div>
      <div style={{ background: "#030810", border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 16px", overflow: "auto", fontFamily: C.mono, fontSize: 12.5, lineHeight: 1.9 }}>
        {code.split("\n").map((line, li) => (
          <div key={li} style={{ display: "flex" }}>
            <span style={{ color: C.dd, fontSize: 10, minWidth: 28, userSelect: "none", marginRight: 8 }}>{li + 1}</span>
            <span>
              {colorize(line).map((tok, ti) => (
                <span key={ti} style={{ color: cm[tok.t] || C.tx }}>{tok.v}</span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Cat pixel grid ───────────────────────────────────────────────────────────
function PixelGrid({ data, size = 26, label }) {
  return (
    <div style={{ textAlign: "center" }}>
      {label && <div style={{ fontFamily: C.mono, fontSize: 9, color: C.dim, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase" }}>{label}</div>}
      <div style={{ display: "inline-block", border: `1px solid ${C.border}`, borderRadius: 4, overflow: "hidden" }}>
        {data.map((row, ri) => (
          <div key={ri} style={{ display: "flex" }}>
            {row.map((v, ci) => {
              const b = Math.round(v * 255);
              return (
                <div key={ci} style={{
                  width: size, height: size,
                  background: `rgb(${b},${b},${b})`,
                  border: "1px solid #0a1520",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 7, color: v > 0.5 ? "#000" : "#666",
                }}>{size > 28 ? f2(v) : ""}</div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── NN diagram SVG ───────────────────────────────────────────────────────────
function NNDiagram({ acts, lit, step }) {
  const W = 480, H = 210;
  const layers = [
    { x: 55,  n: 4, label: "Input",   color: C.bl },
    { x: 175, n: 4, label: "Hidden1", color: C.pu },
    { x: 295, n: 3, label: "Hidden2", color: C.or },
    { x: 415, n: 2, label: "Output",  color: C.gr },
  ];
  const nodeY = (count, idx) => {
    const gap = Math.min(48, 170 / (count + 1));
    return H / 2 - ((count - 1) * gap) / 2 + idx * gap;
  };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
      {/* Connections */}
      {layers.slice(0, -1).map((l, li) =>
        Array.from({ length: l.n }, (_, i) =>
          Array.from({ length: layers[li + 1].n }, (_, j) => {
            const on = lit && step > li;
            return (
              <line key={`${i}-${j}`}
                x1={l.x + 16} y1={nodeY(l.n, i)}
                x2={layers[li + 1].x - 16} y2={nodeY(layers[li + 1].n, j)}
                stroke={on ? l.color : C.dd + "60"}
                strokeWidth={on ? 1.5 : 0.5}
                strokeOpacity={on ? 0.55 : 1}
              />
            );
          })
        )
      )}
      {/* Backprop arrow */}
      {lit && step >= 5 && (
        <>
          <path d={`M 380 18 L 75 18`} stroke={C.rd} strokeWidth={2} strokeDasharray="5 3" />
          <polygon points="75,14 65,18 75,22" fill={C.rd} />
          <text x={225} y={13} textAnchor="middle" fill={C.rd} fontSize={9} fontFamily="monospace">error signal (backprop)</text>
        </>
      )}
      {/* Nodes */}
      {layers.map((l, li) =>
        Array.from({ length: l.n }, (_, ni) => {
          const cy = nodeY(l.n, ni);
          const on = lit && step >= li;
          const val = acts && acts[li] ? acts[li][ni] : null;
          return (
            <g key={`${li}-${ni}`}>
              <circle cx={l.x} cy={cy} r={15}
                fill={on ? l.color + "28" : C.card}
                stroke={on ? l.color : C.dd}
                strokeWidth={on ? 2 : 1}
              />
              <text x={l.x} y={cy + 4} textAnchor="middle"
                fill={on ? l.color : C.dd} fontSize={9} fontFamily="monospace" fontWeight="bold">
                {val !== null ? f2(val) : "?"}
              </text>
            </g>
          );
        })
      )}
      {/* Labels */}
      {layers.map((l, li) => (
        <text key={li} x={l.x} y={H - 4} textAnchor="middle"
          fill={(lit && step >= li) ? l.color + "cc" : l.color + "44"}
          fontSize={8} fontFamily="monospace">
          {l.label}
        </text>
      ))}
    </svg>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 1: WEIGHTS & BIASES
// ══════════════════════════════════════════════════════════════════════════════
function Tab1() {
  const [x, setX] = useState(2.0);
  const [w, setW] = useState(0.30);
  const [b, setB] = useState(0.10);
  const yhat = w * x + b;

  return (
    <div>
      <Card glow={C.or}>
        <SLabel color={C.or} note="A single neuron is just a tiny calculator: multiply, add, decide.">📖 What Are Weights and Biases?</SLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          {[
            { icon: "🎛️", title: "Weight (w)", color: C.am, body: "Controls how strongly each input matters. A high positive weight = 'this clue is very important.' A negative weight = 'this clue pushes against the answer.'" },
            { icon: "⬆️", title: "Bias (b)", color: C.bl, body: "A built-in baseline nudge added regardless of input. It shifts the output even when all inputs are zero — like a default head-start." },
          ].map(({ icon, title, color, body }) => (
            <div key={title} style={{ background: "#050b14", borderRadius: 10, padding: 14, border: `1px solid ${color}30` }}>
              <div style={{ fontFamily: C.mono, fontSize: 13, color, marginBottom: 8, fontWeight: 700 }}>{icon} {title}</div>
              <p style={{ fontFamily: C.serif, fontSize: 13, color: C.dim, lineHeight: 1.75, margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: C.serif, fontSize: 14, color: C.tx, lineHeight: 1.85, marginBottom: 6 }}>
          The neuron formula for one input is: <Chip color={C.am}>ŷ = w · x + b</Chip>.
          The hat symbol (ŷ = "y-hat") means <em>predicted output</em>.
        </p>
        <MBox color={C.am}>{`ŷ  =  w · x  +  b
    =  (weight × input)  +  bias

• w tells us: "how much does input x affect the output?"
• b tells us: "what is the output when x = 0 (no evidence)?"
• ŷ is our prediction — it may be wrong at first!`}</MBox>
      </Card>

      <Card glow={C.bl}>
        <SLabel color={C.bl}>🧮 Interactive: Adjust x, w, b Live</SLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 16 }}>
          {[["Input x", x, setX, -3, 3, C.bl], ["Weight w", w, setW, -2, 2, C.am], ["Bias b", b, setB, -2, 2, C.gr]].map(([label, val, setter, mn, mx, color]) => (
            <div key={label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontFamily: C.mono, fontSize: 11, color: C.dim }}>{label}</span>
                <span style={{ fontFamily: C.mono, fontSize: 13, color, fontWeight: 700 }}>{f2(val)}</span>
              </div>
              <input type="range" min={mn} max={mx} step={0.05} value={val}
                onChange={e => setter(+e.target.value)}
                style={{ width: "100%", accentColor: color }} />
            </div>
          ))}
        </div>
        <MBox color={C.am}>{`ŷ = w · x + b
  = ${f2(w)} × ${f2(x)} + ${f2(b)}
  = ${f2(w * x)} + ${f2(b)}
  = ${f2(yhat)}`}</MBox>
        <div style={{ padding: 12, background: C.am + "0e", borderRadius: 8, border: `1px solid ${C.am}30` }}>
          <strong style={{ color: C.am, fontFamily: C.mono, fontSize: 11 }}>Try: </strong>
          <span style={{ fontFamily: C.serif, fontSize: 13, color: C.tx }}>Set x to 0. Now ŷ = b exactly. The bias is the output when there is no input signal at all.</span>
        </div>
        <CkBox q="If x increases and w is positive, does ŷ go up or down?" a="UP — a positive weight means more input produces more output." />
      </Card>

      <Card glow={C.pu}>
        <SLabel color={C.pu} note="We never hand-pick final weights. We start random and let training find them.">🎲 How We Choose Weights in Practice</SLabel>
        <p style={{ fontFamily: C.serif, fontSize: 14, color: C.tx, lineHeight: 1.85, marginBottom: 14 }}>
          Two-step process used in every real deep learning project:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          {[
            { n: "Step 1 — Initialize", c: C.pu, t: "Pick small random values for all weights. Set biases to 0. This breaks symmetry so different neurons learn different things." },
            { n: "Step 2 — Train", c: C.or, t: "Repeatedly measure the error on training data, then nudge every weight and bias a tiny bit in the direction that reduces error." },
          ].map(({ n, c, t }) => (
            <div key={n} style={{ background: "#050b14", borderRadius: 9, padding: 14, border: `1px solid ${c}30` }}>
              <div style={{ fontFamily: C.mono, fontSize: 12, color: c, fontWeight: 700, marginBottom: 6 }}>{n}</div>
              <p style={{ fontFamily: C.serif, fontSize: 13, color: C.dim, margin: 0, lineHeight: 1.7 }}>{t}</p>
            </div>
          ))}
        </div>
        <MBox color={C.pu}>{`Beginner rule:
  w  ~  Uniform(-0.5, 0.5)   ← small and random
  b  =  0                    ← zero bias is safe

Advanced (one-liner):
  Xavier (sigmoid/tanh):  w ~ Normal(0, sqrt(1/fan_in))
  He     (ReLU):          w ~ Normal(0, sqrt(2/fan_in))
  where fan_in = number of inputs to the neuron

WHY NOT all zeros?  → All neurons learn identically (symmetry problem)
WHY NOT very large? → Outputs saturate; gradients vanish from step 1`}</MBox>
        <CkBox q="Why is initializing all weights to 0 a bad idea?" a="Every neuron computes the same output and receives the same gradient — they all update identically. The network effectively collapses to one neuron. This is the symmetry problem." />
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 2: CAT FORWARD PASS ANIMATION
// ══════════════════════════════════════════════════════════════════════════════
function Tab2() {
  const [step, setStep] = useState(0);
  const [which, setWhich] = useState("cat");
  const timerRef = useRef(null);

  const pixels = which === "cat" ? CAT : DOG;
  const flat = pixels.flat();

  // Summarise 64 pixels to 4 quadrant averages for demo
  const q = 16;
  const inp = [0, 1, 2, 3].map(i => flat.slice(i * q, (i + 1) * q).reduce((a, b) => a + b, 0) / q);

  // Fixed weights (demo only)
  const W1 = [[0.3, -0.2, 0.5, 0.1],[0.4, 0.3, -0.2, 0.6],[-0.1, 0.5, 0.3, -0.4],[0.2, -0.3, 0.4, 0.5]];
  const b1 = [0.1, -0.1, 0.1, 0.0];
  const W2 = [[0.6, 0.3, -0.5, 0.4],[-0.3, 0.7, 0.2, -0.1],[0.1, -0.4, 0.8, 0.3]];
  const b2 = [0.05, -0.05, 0.10];
  const W3 = [[0.8, -0.3, 0.5],[-0.4, 0.9, -0.2]];
  const b3 = [0.1, -0.1];

  const z1 = W1.map((row, i) => row.reduce((s, wv, j) => s + wv * inp[j], b1[i]));
  const a1 = z1.map(sig);
  const z2 = W2.map((row, i) => row.reduce((s, wv, j) => s + wv * a1[j], b2[i]));
  const a2 = z2.map(sig);
  const z3 = W3.map((row, i) => row.reduce((s, wv, j) => s + wv * a2[j], b3[i]));
  const catSc = sig(z3[0]);
  const dogSc = sig(z3[1]);
  const trueY = which === "cat" ? 1 : 0;
  const loss = 0.5 * Math.pow(catSc - trueY, 2);
  const correct = (which === "cat" && catSc > 0.5) || (which === "dog" && catSc <= 0.5);

  const acts = [inp, a1, a2, [catSc, dogSc]];

  const STEPS = [
    {
      title: "Input — 8x8 Pixel Grid (64 values)",
      color: C.bl,
      body: "The raw image is a grid of pixel brightness values between 0.0 (black) and 1.0 (white). We flatten this into a vector of 64 numbers — the network's input. No math yet, just reading raw data.",
      math: `Input x = [${inp.map(f2).join(", ")}]
(4 quadrant averages shown; full input has 64 values)
Each value = average brightness of that image region`,
    },
    {
      title: "Hidden Layer 1 — Weighted Sum + Sigmoid",
      color: C.pu,
      body: "Each of the 4 hidden neurons computes a weighted sum of all inputs, adds its bias, then passes through sigmoid. Sigmoid squashes any number into (0,1). These activations detect low-level features.",
      math: `z1 = W1 · x + b1
z1 = [${z1.map(f2).join(", ")}]
a1 = sigmoid(z1) = [${a1.map(f2).join(", ")}]

sigmoid(z) = 1 / (1 + e^(-z))  maps any number to (0, 1)`,
    },
    {
      title: "Hidden Layer 2 — Deeper Features",
      color: C.or,
      body: "Layer 2 combines the Layer 1 activations. Deeper layers detect higher-level patterns — shapes, textures, part combinations that no single pixel could reveal.",
      math: `z2 = W2 · a1 + b2
z2 = [${z2.map(f2).join(", ")}]
a2 = sigmoid(z2) = [${a2.map(f2).join(", ")}]`,
    },
    {
      title: "Output Layer — Cat vs Dog Scores",
      color: C.gr,
      body: "The output layer produces a score for each class. The highest score wins. We then compare with the true label to compute the error.",
      math: `z3 = W3 · a2 + b3
cat_score = sigmoid(z3[0]) = ${f4(catSc)}
dog_score = sigmoid(z3[1]) = ${f4(dogSc)}

Prediction: ${catSc > 0.5 ? "CAT" : "DOG"}
True label: ${which.toUpperCase()}  →  ${correct ? "CORRECT ✓" : "WRONG ✗"}`,
    },
    {
      title: "Loss — How Wrong Were We?",
      color: C.rd,
      body: "We compare the cat score to the true label (1 = cat, 0 = dog). Mean Squared Error gives a single positive number measuring total wrongness. Smaller loss = better prediction.",
      math: `True label  y = ${trueY}   (${which.toUpperCase()})
Prediction  y_hat = ${f4(catSc)}

Loss = 0.5 * (y_hat - y)^2
     = 0.5 * (${f4(catSc)} - ${trueY})^2
     = 0.5 * (${f4(catSc - trueY)})^2
     = ${f4(loss)}

${loss < 0.05 ? "Loss is small — prediction is good!" : "Loss is large — weights need adjusting."}`,
    },
    {
      title: "Backpropagation — Error Flows Backward",
      color: C.rd,
      body: "The error signal travels backward through all layers using the chain rule. Every weight and bias receives a gradient showing how to adjust to reduce the loss.",
      math: `delta_output = (y_hat - y) = ${f4(catSc - trueY)}

Gradient flows backward:
  dL/dW3  ←  dL/dW2  ←  dL/dW1

Each weight updates:
  w_new = w_old - lr * gradient

Smaller loss next time if lr is sensible.`,
    },
  ];

  const autoPlay = () => {
    setStep(0);
    clearInterval(timerRef.current);
    let s = 0;
    timerRef.current = setInterval(() => {
      s++;
      setStep(s);
      if (s >= STEPS.length - 1) clearInterval(timerRef.current);
    }, 1500);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  const si = STEPS[step];

  return (
    <div>
      <Card glow={C.or}>
        <SLabel color={C.or} note="Watch how a cat or dog image travels from raw pixels to a prediction — then see the error flow back.">🐱 Cat/Dog Forward Pass — Animated</SLabel>
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
          {["cat", "dog"].map(t => (
            <button key={t} onClick={() => { setWhich(t); setStep(0); clearInterval(timerRef.current); }} style={{
              padding: "7px 20px", borderRadius: 8, cursor: "pointer",
              border: `1px solid ${which === t ? C.or : C.border}`,
              background: which === t ? C.or + "20" : "transparent",
              color: which === t ? C.or : C.dim, fontFamily: C.mono, fontSize: 13, fontWeight: 700,
            }}>{t === "cat" ? "🐱 Cat" : "🐶 Dog"}</button>
          ))}
          <div style={{ flex: 1 }} />
          <Btn onClick={autoPlay} color={C.or}>▶ Auto Play</Btn>
          <Btn onClick={() => { setStep(0); clearInterval(timerRef.current); }} color={C.dim} sm>↺ Reset</Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "center" }}>
          <PixelGrid data={pixels} size={22} label={which === "cat" ? "🐱 cat input" : "🐶 dog input"} />
          <NNDiagram acts={acts} lit={step > 0} step={step} />
        </div>
      </Card>

      {/* Step buttons */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {STEPS.map((s, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            padding: "5px 12px", borderRadius: 20, cursor: "pointer",
            border: `1px solid ${step === i ? s.color : C.border}`,
            background: step === i ? s.color + "20" : "transparent",
            color: step === i ? s.color : C.dim,
            fontFamily: C.mono, fontSize: 11, fontWeight: step === i ? 700 : 400,
          }}>Step {i + 1}</button>
        ))}
      </div>

      <Card glow={si.color}>
        <SLabel color={si.color}>{si.title}</SLabel>
        <p style={{ fontFamily: C.serif, fontSize: 14, color: C.tx, lineHeight: 1.85, marginBottom: 12 }}>{si.body}</p>
        <MBox color={si.color}>{si.math}</MBox>
        {step === 3 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
            {[["Cat Score", catSc, C.or], ["Dog Score", dogSc, C.bl]].map(([l, v, c]) => (
              <div key={l} style={{ background: "#050b14", borderRadius: 8, padding: 12, border: `1px solid ${c}40` }}>
                <div style={{ fontFamily: C.mono, fontSize: 10, color: C.dim, marginBottom: 6 }}>{l}</div>
                <div style={{ background: C.dd + "40", borderRadius: 4, height: 8, overflow: "hidden", marginBottom: 6 }}>
                  <div style={{ width: `${Number(v) * 100}%`, height: "100%", background: c, borderRadius: 4, transition: "width 0.4s" }} />
                </div>
                <div style={{ fontFamily: C.mono, fontSize: 18, color: c, fontWeight: 700 }}>{f4(v)}</div>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <Btn onClick={() => setStep(i => Math.max(0, i - 1))} disabled={step === 0} color={si.color} sm>◀ Prev</Btn>
          <Btn onClick={() => setStep(i => Math.min(STEPS.length - 1, i + 1))} disabled={step === STEPS.length - 1} color={si.color} sm>Next ▶</Btn>
        </div>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 3: LOSS & GRADIENT DESCENT
// ══════════════════════════════════════════════════════════════════════════════
function Tab3() {
  const [yhat, setYhat] = useState(0.70);
  const [lrIdx, setLrIdx] = useState(2);
  const LRS = [0.01, 0.05, 0.1, 0.5, 1.0];
  const lr = LRS[lrIdx];

  const y = 1.00, x = 2.0, w = 0.30, b = 0.10;
  const err = yhat - y;
  const loss = 0.5 * err * err;
  const dLdw = err * x;
  const dLdb = err;
  const wNew = w - lr * dLdw;
  const bNew = b - lr * dLdb;
  const yhatNew = wNew * x + bNew;
  const lossNew = 0.5 * (yhatNew - y) * (yhatNew - y);

  return (
    <div>
      <Card glow={C.rd}>
        <SLabel color={C.rd} note="Loss measures wrongness. We need it small — and reduce it by adjusting weights.">📉 Loss Function (MSE)</SLabel>
        <p style={{ fontFamily: C.serif, fontSize: 14, color: C.tx, lineHeight: 1.85, marginBottom: 12 }}>
          We use <Chip color={C.rd}>Mean Squared Error</Chip>. The ½ factor is a convenience — it cancels out with the exponent during differentiation.
        </p>
        <MBox color={C.rd}>{`L  =  (1/2) * (y_hat - y)^2

Properties:
  • Always >= 0   (squared term)
  • L = 0         <=> perfect prediction
  • Large mistake => MUCH larger loss (quadratic penalty)
  
For a batch of n samples:
  MSE  =  (1/n) * sum of (y_hat_i - y_i)^2
  RMSE =  sqrt(MSE)   [same units as output]`}</MBox>
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontFamily: C.mono, fontSize: 11, color: C.dim }}>Adjust prediction ŷ (target y = 1.00)</span>
            <span style={{ fontFamily: C.mono, fontSize: 13, color: C.am, fontWeight: 700 }}>{f2(yhat)}</span>
          </div>
          <input type="range" min={0} max={1.5} step={0.01} value={yhat}
            onChange={e => setYhat(+e.target.value)} style={{ width: "100%", accentColor: C.am }} />
        </div>
        <MBox color={C.am}>{`Given: y_hat = ${f2(yhat)},  y = 1.00

error      = y_hat - y  = ${f2(yhat)} - 1.00  = ${f4(err)}
loss L     = 0.5 * (${f4(err)})^2  = ${f4(loss)}

${Math.abs(err) < 0.05 ? "Loss is near zero — prediction is excellent!" : err > 0 ? "Over-predicted. Weights should push output DOWN." : "Under-predicted. Weights should push output UP."}`}</MBox>
        <CkBox q="If y_hat gets closer to y, does L go up or down?" a="DOWN — as prediction approaches truth, the squared difference shrinks toward zero." />
      </Card>

      <Card glow={C.gr}>
        <SLabel color={C.gr} note="Gradient = direction of steepest increase. We move in the OPPOSITE direction to reduce loss.">∂ Gradients via Chain Rule</SLabel>
        <p style={{ fontFamily: C.serif, fontSize: 14, color: C.tx, lineHeight: 1.85, marginBottom: 12 }}>
          We want to find how the loss changes when w or b changes. The gradient tells us the direction — we subtract it to go downhill.
        </p>
        <MBox color={C.gr}>{`Model:   y_hat = w*x + b
Loss:    L = 0.5*(y_hat - y)^2

Chain rule:
  dL/dy_hat = (y_hat - y)
  dy_hat/dw = x               <- "how much does output change per unit w?"
  dy_hat/db = 1               <- "bias directly shifts output by 1 per unit b"

Therefore:
  dL/dw = dL/dy_hat * dy_hat/dw = (y_hat - y) * x
  dL/db = dL/dy_hat * dy_hat/db = (y_hat - y) * 1

Plugging in: y_hat=${f2(yhat)}, y=1.00, x=2.0:
  dL/dw = (${f4(err)}) * 2.0 = ${f4(dLdw)}
  dL/db = (${f4(err)}) * 1.0 = ${f4(dLdb)}`}</MBox>
        <div style={{ padding: "12px 16px", background: C.gr + "0e", borderRadius: 8, border: `1px solid ${C.gr}30`, marginTop: 10 }}>
          <strong style={{ color: C.gr, fontFamily: C.mono, fontSize: 11 }}>Gradient sign intuition: </strong>
          <span style={{ fontFamily: C.serif, fontSize: 13, color: C.tx }}>
            dL/dw = {f4(dLdw)}.{" "}
            {dLdw < 0
              ? "Negative gradient → increasing w would DECREASE loss → so we should INCREASE w."
              : "Positive gradient → increasing w would INCREASE loss → so we should DECREASE w."}
          </span>
        </div>
        <CkBox
          q={`The gradient dL/dw = ${f4(dLdw)}. Should we increase or decrease w to reduce L?`}
          a={dLdw < 0 ? "INCREASE w — gradient descent subtracts a negative, which adds a positive." : "DECREASE w — gradient descent subtracts a positive, reducing w."}
        />
      </Card>

      <Card glow={C.bl}>
        <SLabel color={C.bl} note="We subtract a fraction of the gradient each step. Learning rate controls how big the step is.">⬇️ Gradient Descent Update Rule</SLabel>
        <MBox color={C.bl}>{`Update equations:
  w_new = w_old - lr * (dL/dw)
  b_new = b_old - lr * (dL/db)

lr (learning rate) is a small positive number (e.g. 0.1)

Why subtract?
  Gradient > 0  means w increasing raises loss  → decrease w
  Gradient < 0  means w increasing lowers loss  → increase w
  Subtracting always moves toward lower loss ✓`}</MBox>

        <div style={{ fontFamily: C.mono, fontSize: 10, color: C.dim, letterSpacing: 2, marginBottom: 8 }}>CHOOSE LEARNING RATE</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
          {LRS.map((v, i) => (
            <button key={i} onClick={() => setLrIdx(i)} style={{
              padding: "6px 16px", borderRadius: 8, cursor: "pointer",
              border: `1px solid ${lrIdx === i ? C.bl : C.border}`,
              background: lrIdx === i ? C.bl + "20" : "transparent",
              color: lrIdx === i ? C.bl : C.dim, fontFamily: C.mono, fontSize: 12,
            }}>lr = {v}</button>
          ))}
        </div>
        <MBox color={C.bl}>{`Starting: w=${f2(w)}, b=${f2(b)}, x=2.0, y=1.0
y_hat = ${f2(w)}*2.0 + ${f2(b)} = ${f2(w * x + b)}

Gradients: dL/dw = ${f4(dLdw)},  dL/db = ${f4(dLdb)}

With lr = ${lr}:
  w_new = ${f2(w)} - ${lr} * (${f4(dLdw)}) = ${f4(wNew)}
  b_new = ${f2(b)} - ${lr} * (${f4(dLdb)}) = ${f4(bNew)}

New y_hat = ${f4(wNew)}*2.0 + ${f4(bNew)} = ${f4(yhatNew)}

Loss BEFORE: ${f4(loss)}
Loss AFTER:  ${f4(lossNew)}
${lossNew < loss ? "Loss DECREASED. " : "Loss INCREASED! "}${lossNew < 0.001 ? "Near zero — converged!" : lossNew > loss ? "Learning rate too large — try smaller." : ""}`}</MBox>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[["Loss Before", f4(loss), C.rd], ["Loss After", f4(lossNew), lossNew < loss ? C.gr : C.rd]].map(([l, v, c]) => (
            <div key={l} style={{ background: "#050b14", borderRadius: 8, padding: 12, border: `1px solid ${c}40`, textAlign: "center" }}>
              <div style={{ fontFamily: C.mono, fontSize: 10, color: C.dim, marginBottom: 4 }}>{l}</div>
              <div style={{ fontFamily: C.mono, fontSize: 22, color: c, fontWeight: 700 }}>{v}</div>
            </div>
          ))}
        </div>
        <CkBox q="If lr is very large (e.g. 10.0), what can happen?" a="The weight update overshoots the minimum. The new loss can be LARGER than before. Training becomes unstable or diverges entirely." />
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 4: BACKPROPAGATION
// ══════════════════════════════════════════════════════════════════════════════
function Tab4() {
  const INIT = { w1: 0.3, b1: 0.1, w2: 0.5, b2: -0.1 };
  const [ws, setWs] = useState(INIT);
  const [lr, setLr] = useState(0.1);
  const [epoch, setEpoch] = useState(0);
  const [hist, setHist] = useState([]);
  const x = 2.0, y = 1.0;

  function fwd(p) {
    const z1 = p.w1 * x + p.b1;
    const a1 = sig(z1);
    const z2 = p.w2 * a1 + p.b2;
    const yh = sig(z2);
    return { z1, a1, z2, yh, loss: 0.5 * (yh - y) ** 2 };
  }

  function doStep() {
    setWs(prev => {
      const { z1, a1, z2, yh } = fwd(prev);
      const d2 = (yh - y) * yh * (1 - yh);
      const d1 = d2 * prev.w2 * a1 * (1 - a1);
      const next = {
        w1: prev.w1 - lr * d1 * x,
        b1: prev.b1 - lr * d1,
        w2: prev.w2 - lr * d2 * a1,
        b2: prev.b2 - lr * d2,
      };
      setHist(h => [...h.slice(-79), fwd(prev).loss]);
      setEpoch(e => e + 1);
      return next;
    });
  }

  function doN(n) {
    setWs(prev => {
      let p = { ...prev };
      const losses = [];
      for (let i = 0; i < n; i++) {
        const { z1, a1, z2, yh } = fwd(p);
        losses.push(fwd(p).loss);
        const d2 = (yh - y) * yh * (1 - yh);
        const d1 = d2 * p.w2 * a1 * (1 - a1);
        p = {
          w1: p.w1 - lr * d1 * x,
          b1: p.b1 - lr * d1,
          w2: p.w2 - lr * d2 * a1,
          b2: p.b2 - lr * d2,
        };
      }
      setHist(h => [...h.slice(-(80 - n)), ...losses]);
      setEpoch(e => e + n);
      return p;
    });
  }

  function reset() { setWs(INIT); setEpoch(0); setHist([]); }

  const { z1, a1, z2, yh, loss } = fwd(ws);
  const maxH = hist.length > 0 ? Math.max(...hist) : 1;

  return (
    <div>
      <Card glow={C.pu}>
        <SLabel color={C.pu} note="Backprop = chain rule applied layer by layer from output back to input.">🔙 Backpropagation & Chain Rule</SLabel>
        <p style={{ fontFamily: C.serif, fontSize: 14, color: C.tx, lineHeight: 1.85, marginBottom: 14 }}>
          In a multi-layer network, the output error must travel back to <em>every</em> weight.
          The <Chip color={C.pu}>chain rule</Chip> lets us decompose the total gradient into a product of local derivatives.
        </p>
        <MBox color={C.pu}>{`2-Layer Network path:
  x -> z1=w1*x+b1 -> a1=sig(z1) -> z2=w2*a1+b2 -> y_hat=sig(z2) -> L

Gradient for OUTPUT weight w2 (one step back):
  dL/dw2 = dL/dy_hat * dy_hat/dz2 * dz2/dw2
          = (y_hat-y) * y_hat*(1-y_hat) * a1
          = delta2 * a1         [defines delta2]

Gradient for HIDDEN weight w1 (two steps back):
  dL/dw1 = dL/dy_hat * dy_hat/dz2 * dz2/da1 * da1/dz1 * dz1/dw1
          = delta2 * w2 * a1*(1-a1) * x
          = delta1 * x          [delta1 = delta2*w2*sig'(z1)]

Key insight:
  delta1 = delta2 * w2 * sig'(z1)   <- error "propagated back" through w2
  The same error signal flows backward through each weight connection.`}</MBox>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginTop: 12 }}>
          {[
            { n: "1 — Output delta", c: C.rd, f: "delta2 = (y_hat-y)\n* y_hat*(1-y_hat)" },
            { n: "2 — Output weights", c: C.or, f: "dL/dw2 = delta2 * a1\ndL/db2 = delta2" },
            { n: "3 — Hidden delta", c: C.pu, f: "delta1 = delta2 * w2\n* a1*(1-a1)" },
            { n: "4 — Hidden weights", c: C.bl, f: "dL/dw1 = delta1 * x\ndL/db1 = delta1" },
          ].map(({ n, c, f }) => (
            <div key={n} style={{ background: "#050b14", borderRadius: 9, padding: 10, border: `1px solid ${c}40`, textAlign: "center" }}>
              <div style={{ fontFamily: C.mono, fontSize: 9, color: c, fontWeight: 700, marginBottom: 6 }}>{n}</div>
              <pre style={{ fontFamily: C.mono, fontSize: 9, color: c, margin: 0, whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{f}</pre>
            </div>
          ))}
        </div>
        <CkBox q="In one sentence, what is backpropagation doing?" a="Computing gradients for all weights by applying the chain rule backward from the output loss through every layer — so every parameter knows exactly how to adjust to reduce the loss." />
      </Card>

      <Card glow={C.gr}>
        <SLabel color={C.gr}>🏋️ 2-Layer Training Simulator</SLabel>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 14 }}>
          <div>
            <div style={{ fontFamily: C.mono, fontSize: 10, color: C.dim, marginBottom: 3 }}>Learning rate lr = {f2(lr)}</div>
            <input type="range" min={0.01} max={1.0} step={0.01} value={lr}
              onChange={e => setLr(+e.target.value)} style={{ accentColor: C.gr, width: 130 }} />
          </div>
          <Btn onClick={doStep} color={C.gr}>▶ 1 Step</Btn>
          <Btn onClick={() => doN(10)} color={C.am} sm>▶▶ 10</Btn>
          <Btn onClick={() => doN(50)} color={C.bl} sm>▶▶▶ 50</Btn>
          <Btn onClick={reset} color={C.dim} sm>↺ Reset</Btn>
          <span style={{ fontFamily: C.mono, fontSize: 12, color: C.dim }}>Epoch: <strong style={{ color: C.tx }}>{epoch}</strong></span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <MBox color={C.gr}>{`x=${x}  y=${y}  lr=${lr}

w1=${f4(ws.w1)}  b1=${f4(ws.b1)}
w2=${f4(ws.w2)}  b2=${f4(ws.b2)}

z1 = w1*x + b1 = ${f4(z1)}
a1 = sig(z1)   = ${f4(a1)}
z2 = w2*a1+b2  = ${f4(z2)}
y_hat = sig(z2)= ${f4(yh)}

Loss = ${f4(loss)}${loss < 0.001 ? "  <- CONVERGED!" : ""}`}</MBox>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
              {[["y_hat", f4(yh), C.bl], ["Loss", f4(loss), loss < 0.01 ? C.gr : C.rd]].map(([l, v, c]) => (
                <div key={l} style={{ background: "#050b14", borderRadius: 8, padding: 10, border: `1px solid ${c}40`, textAlign: "center" }}>
                  <div style={{ fontFamily: C.mono, fontSize: 9, color: C.dim, marginBottom: 3 }}>{l}</div>
                  <div style={{ fontFamily: C.mono, fontSize: 18, color: c, fontWeight: 700 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: C.mono, fontSize: 10, color: C.dim, letterSpacing: 2, marginBottom: 6 }}>LOSS CURVE ({hist.length} steps)</div>
            <div style={{ background: "#030810", borderRadius: 8, border: `1px solid ${C.border}`, padding: "8px 10px", height: 130 }}>
              {hist.length > 1 ? (
                <svg viewBox={`0 0 200 90`} style={{ width: "100%", height: "100%" }}>
                  {[0.25, 0.5, 0.75].map(f => (
                    <line key={f} x1={0} y1={90 * f} x2={200} y2={90 * f} stroke={C.dd + "40"} strokeDasharray="3 3" />
                  ))}
                  <polyline
                    points={hist.map((v, i) => `${(i / (hist.length - 1)) * 200},${Math.min(85, (v / maxH) * 85)}`).join(" ")}
                    fill="none" stroke={C.gr} strokeWidth={2}
                  />
                  <circle
                    cx={200}
                    cy={Math.min(85, (hist[hist.length - 1] / maxH) * 85)}
                    r={3} fill={C.gr}
                  />
                  <text x={4} y={10} fill={C.dd} fontSize={8} fontFamily="monospace">{f4(maxH)}</text>
                  <text x={4} y={88} fill={C.dd} fontSize={8} fontFamily="monospace">{f4(Math.min(...hist))}</text>
                </svg>
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: C.dd, fontFamily: C.mono, fontSize: 12 }}>
                  Click train to see loss curve
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 5: PYTHON CODE
// ══════════════════════════════════════════════════════════════════════════════
function Tab5() {
  const [tab, setTab] = useState(0);
  const SNIPPETS = [
    {
      title: "Single Neuron from Scratch",
      code: `import numpy as np

# ── Given values ───────────────────────────────────────────
x  = 2.0      # input
w  = 0.30     # weight (small random initialization)
b  = 0.10     # bias
y  = 1.00     # true label
lr = 0.1      # learning rate (eta)

# ── Forward pass ───────────────────────────────────────────
y_hat = w * x + b
print(f"Prediction y_hat = {y_hat:.4f}")  # 0.7000

# ── Loss (MSE with 0.5 factor) ─────────────────────────────
loss = 0.5 * (y_hat - y) ** 2
print(f"Loss L = {loss:.4f}")             # 0.0450

# ── Gradients (chain rule) ─────────────────────────────────
dL_dyhat = y_hat - y          # = -0.3000
dL_dw    = dL_dyhat * x       # = -0.6000
dL_db    = dL_dyhat           # = -0.3000

print(f"dL/dw = {dL_dw:.4f},  dL/db = {dL_db:.4f}")

# ── Gradient descent update ────────────────────────────────
w_new = w - lr * dL_dw        # 0.30 - 0.1*(-0.60) = 0.36
b_new = b - lr * dL_db        # 0.10 - 0.1*(-0.30) = 0.13

print(f"Updated: w = {w_new:.4f},  b = {b_new:.4f}")

# ── Verify loss decreased ──────────────────────────────────
y_hat_new  = w_new * x + b_new
loss_new   = 0.5 * (y_hat_new - y) ** 2
print(f"New loss = {loss_new:.4f}")       # 0.01125 < 0.0450 ✓`,
    },
    {
      title: "Weight Initialization Strategies",
      code: `import numpy as np

fan_in  = 64    # inputs (e.g. 8x8 image flattened)
fan_out = 32    # neurons in next layer

# ── Simple uniform (beginner-friendly) ─────────────────────
W_uniform = np.random.uniform(-0.5, 0.5, (fan_out, fan_in))

# ── Xavier (for sigmoid / tanh layers) ─────────────────────
std_xavier = np.sqrt(1.0 / fan_in)
W_xavier   = np.random.normal(0, std_xavier, (fan_out, fan_in))

# ── He (for ReLU layers — most common today) ───────────────
std_he = np.sqrt(2.0 / fan_in)
W_he   = np.random.normal(0, std_he, (fan_out, fan_in))

# ── Bias: start at zero ────────────────────────────────────
b = np.zeros(fan_out)

for name, W in [("Uniform", W_uniform),
                ("Xavier",  W_xavier),
                ("He",      W_he)]:
    print(f"{name:8s}: mean={W.mean():.4f}"
          f"  std={W.std():.4f}"
          f"  range=[{W.min():.3f}, {W.max():.3f}]")`,
    },
    {
      title: "2-Layer Backprop in NumPy",
      code: `import numpy as np

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def sigmoid_prime(z):
    s = sigmoid(z)
    return s * (1 - s)

# ── Initialize network ─────────────────────────────────────
np.random.seed(42)
n_in, n_hidden, n_out = 2, 4, 1

W1 = np.random.randn(n_hidden, n_in)  * np.sqrt(1 / n_in)
b1 = np.zeros(n_hidden)
W2 = np.random.randn(n_out, n_hidden) * np.sqrt(1 / n_hidden)
b2 = np.zeros(n_out)
lr = 0.1

# ── Dataset ────────────────────────────────────────────────
X = np.array([[0.2, 0.8], [0.9, 0.1], [0.1, 0.2], [0.8, 0.9]])
Y = np.array([[1.0],       [1.0],      [0.0],       [0.0]])

for epoch in range(200):
    total_loss = 0
    for x, y in zip(X, Y):

        # Forward pass
        z1    = W1 @ x + b1
        a1    = sigmoid(z1)
        z2    = W2 @ a1 + b2
        y_hat = sigmoid(z2)
        loss  = 0.5 * np.sum((y_hat - y) ** 2)
        total_loss += loss

        # Backpropagation
        delta2 = (y_hat - y) * sigmoid_prime(z2)
        dW2 = np.outer(delta2, a1);  db2 = delta2

        delta1 = (W2.T @ delta2) * sigmoid_prime(z1)
        dW1 = np.outer(delta1, x);   db1 = delta1

        # Gradient descent update
        W2 -= lr * dW2;  b2 -= lr * db2
        W1 -= lr * dW1;  b1 -= lr * db1

    if epoch % 40 == 0:
        avg = total_loss / len(X)
        print(f"Epoch {epoch:3d} | Loss: {avg:.5f}")`,
    },
    {
      title: "PyTorch Cat Classifier",
      code: `import torch
import torch.nn as nn
import torch.optim as optim

# ── Model definition ───────────────────────────────────────
class CatClassifier(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(64, 32),   # 64 pixel inputs -> 32 hidden
            nn.ReLU(),
            nn.Linear(32, 16),   # 32 -> 16 deeper features
            nn.ReLU(),
            nn.Linear(16, 2),    # 2 outputs: [cat score, dog score]
        )

    def forward(self, x):
        return self.net(x)

# ── Initialize with He for ReLU ───────────────────────────
model = CatClassifier()
for layer in model.modules():
    if isinstance(layer, nn.Linear):
        nn.init.kaiming_normal_(layer.weight)  # He init
        nn.init.zeros_(layer.bias)

# ── Loss and optimizer ─────────────────────────────────────
criterion = nn.CrossEntropyLoss()             # softmax built-in
optimizer = optim.Adam(model.parameters(), lr=0.001)

# ── One training step ──────────────────────────────────────
def train_step(images, labels):
    optimizer.zero_grad()          # 1. clear old gradients
    outputs = model(images)        # 2. forward pass
    loss = criterion(outputs, labels)  # 3. compute loss
    loss.backward()                # 4. backpropagation
    optimizer.step()               # 5. update all weights
    return loss.item()

# ── Check weight stats after init ─────────────────────────
for name, p in model.named_parameters():
    print(f"{name:20s}: mean={p.data.mean():.4f}"
          f"  std={p.data.std():.4f}")`,
    },
    {
      title: "Error Monitoring & Diagnostics",
      code: `import torch
import numpy as np

# ── Detect vanishing / exploding gradients ─────────────────
def check_gradients(model):
    for name, param in model.named_parameters():
        if param.grad is None:
            continue
        g = param.grad.data.norm(2).item()
        w = param.data.norm(2).item()
        if g < 1e-7:
            status = "VANISHING!"
        elif g > 100:
            status = "EXPLODING!"
        else:
            status = "OK"
        print(f"{name:25s}: grad={g:.2e}  w={w:.3f}  [{status}]")

# ── Gradient clipping (prevent explosions) ─────────────────
def train_with_clip(model, optimizer, loss, max_norm=1.0):
    optimizer.zero_grad()
    loss.backward()
    torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm)
    optimizer.step()

# ── Learning rate scheduler ────────────────────────────────
scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
    optimizer, patience=5, factor=0.5, verbose=True
)

# ── Plateau detector ───────────────────────────────────────
def detect_plateau(losses, window=10):
    if len(losses) < 2 * window:
        return False
    recent   = np.mean(losses[-window:])
    previous = np.mean(losses[-2*window:-window])
    delta = previous - recent
    if delta < 1e-5:
        print(f"Plateau: improvement={delta:.2e} < 1e-5")
        return True
    return False

# ── NaN guard ──────────────────────────────────────────────
def nan_guard(loss):
    if torch.isnan(loss) or torch.isinf(loss):
        raise RuntimeError("Loss is NaN/Inf — check lr and init")`,
    },
  ];

  const si = SNIPPETS[tab];

  return (
    <div>
      <Card glow={C.gr}>
        <SLabel color={C.gr} note="Five production-ready Python snippets covering every topic in this lesson.">🐍 Python Code Library</SLabel>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {SNIPPETS.map((s, i) => (
            <button key={i} onClick={() => setTab(i)} style={{
              padding: "6px 14px", borderRadius: 8, cursor: "pointer",
              border: `1px solid ${tab === i ? C.gr : C.border}`,
              background: tab === i ? C.gr + "18" : "transparent",
              color: tab === i ? C.gr : C.dim, fontFamily: C.mono, fontSize: 11, fontWeight: tab === i ? 700 : 400,
            }}>Snippet {i + 1}</button>
          ))}
        </div>
        <PyBlock code={si.code} title={si.title} />
      </Card>

      <Card glow={C.or}>
        <SLabel color={C.or}>⚠️ Common Training Errors & Fixes</SLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { t: "Vanishing Gradient", c: C.bl, i: "📉", d: "Gradients shrink to ~0 in early layers. Network stops learning. Symptoms: loss barely moves, early layer weights don't change.", fix: "Use ReLU activations\nHe initialization\nBatch normalization\nResidual connections" },
            { t: "Exploding Gradient", c: C.rd, i: "💥", d: "Gradients grow exponentially. Weights become NaN or Inf. Training crashes immediately.", fix: "Gradient clipping\nSmaller learning rate\nProper initialization\nGradient monitoring" },
            { t: "Learning Rate Too High", c: C.or, i: "⚠️", d: "Loss oscillates or increases instead of decreasing. Updates overshoot the loss minimum each time.", fix: "Reduce lr by 10x\nLR scheduler\nAdam optimizer\nLR warmup" },
            { t: "Overfitting", c: C.pu, i: "📈", d: "Train loss low, validation loss high. Network memorised training data instead of learning general patterns.", fix: "Dropout layers\nL2 regularization\nEarly stopping\nMore training data" },
          ].map(({ t, c, i, d, fix }) => (
            <div key={t} style={{ background: "#050b14", borderRadius: 10, padding: 14, border: `1px solid ${c}30` }}>
              <div style={{ fontFamily: C.mono, fontSize: 12, color: c, fontWeight: 700, marginBottom: 6 }}>{i} {t}</div>
              <p style={{ fontFamily: C.serif, fontSize: 12, color: C.dim, lineHeight: 1.7, marginBottom: 10 }}>{d}</p>
              <div style={{ background: C.panel, borderRadius: 6, padding: "8px 12px", fontFamily: C.mono, fontSize: 11, color: c, whiteSpace: "pre-wrap", lineHeight: 1.8, borderLeft: `2px solid ${c}70` }}>{fix}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 6: ACTIVITIES & QUIZ
// ══════════════════════════════════════════════════════════════════════════════
function Tab6() {
  const [actIdx, setActIdx] = useState(0);
  // Activity A worksheet
  const X0 = 3.0, W0 = 0.20, B0 = 0.05, Y0 = 1.0, LR0 = 0.1;
  const yhatA = W0 * X0 + B0;
  const lossA = f4(0.5 * (yhatA - Y0) ** 2);
  const dLdwA = f4((yhatA - Y0) * X0);
  const dLdbA = f4(yhatA - Y0);
  const wNewA = f4(W0 - LR0 * (yhatA - Y0) * X0);
  const bNewA = f4(B0 - LR0 * (yhatA - Y0));
  const [ws, setWs] = useState({ yhat: "", loss: "", dLdw: "", dLdb: "", wNew: "", bNew: "" });
  const [wsChk, setWsChk] = useState(false);
  const ANSWERS = { yhat: f4(yhatA), loss: lossA, dLdw: dLdwA, dLdb: dLdbA, wNew: wNewA, bNew: bNewA };

  // Activity B gradient sign game
  const [card, setCard] = useState(null);
  const [voted, setVoted] = useState(null);
  const [revealed, setRevealed] = useState(false);
  function dealCard() {
    const es = Math.random() > 0.5 ? 1 : -1;
    const xs = Math.random() > 0.5 ? 1 : -1;
    const gs = es * xs;
    setCard({ es, xs, gs, action: gs > 0 ? "DECREASE w" : "INCREASE w" });
    setVoted(null); setRevealed(false);
  }

  // Mini quiz
  const [qa, setQa] = useState({ q1: "", q2: "", q3: "", q4: "", q5: "" });
  const [qChk, setQChk] = useState(false);
  const QUIZ = [
    { q: "Q1: What does bias b do when x = 0?", a: "Sets the output directly: y_hat = b. It is the baseline output before seeing any input signal." },
    { q: "Q2: Why do we use random (not zero) initialization?", a: "Zero init causes symmetry — all neurons learn identically. Random init breaks symmetry, allowing each neuron to specialize in different features." },
    { q: "Q3: For y_hat = w*x + b, L = 0.5*(y_hat-y)^2, what is dL/dw?", a: "(y_hat - y) * x  — chain rule product of output error and the local derivative of y_hat w.r.t. w." },
    { q: "Q4: If (y_hat - y) > 0 and x > 0, what happens to w after gradient descent?", a: "w DECREASES — gradient dL/dw = positive, so w := w - lr*(positive) reduces w." },
    { q: "Q5: In one sentence, what is backpropagation?", a: "A method that computes gradients of the loss for all weights by propagating the error signal backward through each layer using the chain rule." },
  ];

  const ACTS = [
    { id: "A", emoji: "📓", title: "One Neuron, One Update", time: "10-12 min", fmt: "Individual", color: C.or },
    { id: "B", emoji: "🃏", title: "Gradient Sign Game", time: "12-15 min", fmt: "Pairs", color: C.bl },
    { id: "C", emoji: "📋", title: "Worksheet Table", time: "15-20 min", fmt: "Groups", color: C.am },
    { id: "D", emoji: "📝", title: "Mini Quiz (5 Qs)", time: "10 min", fmt: "Individual", color: C.pu },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 16 }}>
        {ACTS.map((a, i) => (
          <button key={a.id} onClick={() => setActIdx(i)} style={{
            padding: "12px 8px", borderRadius: 10, cursor: "pointer",
            border: `2px solid ${actIdx === i ? a.color : C.border}`,
            background: actIdx === i ? a.color + "15" : C.card, textAlign: "left",
          }}>
            <div style={{ fontFamily: C.mono, fontSize: 12, color: a.color, fontWeight: 700, marginBottom: 4 }}>{a.emoji} Act {a.id}</div>
            <div style={{ fontFamily: C.serif, fontSize: 11, color: C.dim, lineHeight: 1.4 }}>{a.fmt} · {a.time}</div>
          </button>
        ))}
      </div>

      {/* Activity A */}
      {actIdx === 0 && (
        <Card glow={C.or}>
          <SLabel color={C.or} note="Compute the full training step by hand: forward pass, loss, gradients, update.">📓 Activity A — One Neuron, One Update (Individual, 10-12 min)</SLabel>
          <p style={{ fontFamily: C.serif, fontSize: 13, color: C.dim, lineHeight: 1.75, marginBottom: 12 }}>
            <strong style={{ color: C.or }}>Goal:</strong> See numerically that the loss decreases after one gradient descent step. Fill in each box below.
          </p>
          <MBox color={C.am}>{`Given: x = ${X0},  w = ${W0},  b = ${B0},  y = ${Y0},  lr = ${LR0}`}</MBox>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
            {[
              ["y_hat = w*x + b", "yhat"],
              ["L = 0.5*(y_hat-y)^2", "loss"],
              ["dL/dw = (y_hat-y)*x", "dLdw"],
              ["dL/db = (y_hat-y)*1", "dLdb"],
              ["w_new = w - lr*dL/dw", "wNew"],
              ["b_new = b - lr*dL/db", "bNew"],
            ].map(([label, key]) => {
              const correct = wsChk && Math.abs(+(ws[key] || 0) - +ANSWERS[key]) < 0.01;
              const wrong = wsChk && !correct && ws[key] !== "";
              return (
                <div key={key} style={{ background: "#050b14", borderRadius: 8, padding: 12, border: `1px solid ${wsChk ? (correct ? C.gr : C.rd) : C.border}` }}>
                  <div style={{ fontFamily: C.mono, fontSize: 10, color: C.dim, marginBottom: 6 }}>{label}</div>
                  <input
                    type="number" step="0.0001"
                    value={ws[key]}
                    onChange={e => { setWs(s => ({ ...s, [key]: e.target.value })); setWsChk(false); }}
                    placeholder="?"
                    style={{ width: "100%", background: "#030810", border: `1px solid ${C.border}`, borderRadius: 5, padding: "6px 8px", color: C.am, fontFamily: C.mono, fontSize: 13, boxSizing: "border-box" }}
                  />
                  {wsChk && <div style={{ fontFamily: C.mono, fontSize: 10, color: correct ? C.gr : C.rd, marginTop: 4 }}>{correct ? "correct ✓" : `answer: ${ANSWERS[key]}`}</div>}
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn onClick={() => setWsChk(true)} color={C.or}>🔎 Check Answers</Btn>
            <Btn onClick={() => { setWs({ yhat: "", loss: "", dLdw: "", dLdb: "", wNew: "", bNew: "" }); setWsChk(false); }} color={C.dim} sm>↺ Clear</Btn>
          </div>
        </Card>
      )}

      {/* Activity B */}
      {actIdx === 1 && (
        <Card glow={C.bl}>
          <SLabel color={C.bl} note="Quick intuition-building: predict the direction of weight update from the sign of the gradient.">🃏 Activity B — Gradient Sign Game (Pairs, 12-15 min)</SLabel>
          <p style={{ fontFamily: C.serif, fontSize: 13, color: C.dim, lineHeight: 1.75, marginBottom: 14 }}>
            Click <Chip color={C.bl}>Deal Card</Chip> to get a random scenario. Decide whether w should INCREASE or DECREASE, then reveal the correct answer.
          </p>
          <Btn onClick={dealCard} color={C.bl}>🃏 Deal Card</Btn>
          {card && (
            <div style={{ marginTop: 14 }}>
              <MBox color={C.bl}>{`Sign of error (y_hat - y):  ${card.es > 0 ? "POSITIVE (+)" : "NEGATIVE (-)"}
Sign of input x:           ${card.xs > 0 ? "POSITIVE (+)" : "NEGATIVE (-)"}`}</MBox>
              <div style={{ fontFamily: C.serif, fontSize: 13, color: C.dim, marginBottom: 10, lineHeight: 1.7 }}>
                Remember: <Chip color={C.am}>dL/dw = (y_hat - y) * x</Chip>. What is the sign of dL/dw? And to reduce loss, should w increase or decrease?
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                {["INCREASE w", "DECREASE w"].map(opt => (
                  <button key={opt} onClick={() => setVoted(opt)} style={{
                    flex: 1, padding: 10, borderRadius: 8, cursor: "pointer",
                    border: `2px solid ${voted === opt ? (opt === card.action ? C.gr : C.rd) : C.border}`,
                    background: voted === opt ? (opt === card.action ? C.gr + "20" : C.rd + "20") : "transparent",
                    color: opt.includes("INCREASE") ? C.gr : C.rd, fontFamily: C.mono, fontSize: 13, fontWeight: 700,
                  }}>{opt}</button>
                ))}
              </div>
              {voted && <Btn onClick={() => setRevealed(true)} color={C.bl} sm>Reveal Answer</Btn>}
              {revealed && (
                <MBox color={C.bl}>{`dL/dw = (y_hat-y) * x = (${card.es > 0 ? "+" : "-"}) * (${card.xs > 0 ? "+" : "-"}) = ${card.gs > 0 ? "POSITIVE" : "NEGATIVE"}

Gradient descent: w_new = w - lr * gradient
If gradient is ${card.gs > 0 ? "positive" : "negative"} -> w ${card.gs > 0 ? "DECREASES" : "INCREASES"}

Correct action: ${card.action}
${voted === card.action ? "You got it! Great intuition." : "Not quite. Remember: subtract gradient means opposite direction."}`}</MBox>
              )}
            </div>
          )}
        </Card>
      )}

      {/* Activity C — worksheet */}
      {actIdx === 2 && (
        <Card glow={C.am}>
          <SLabel color={C.am} note="Compute weighted sums by hand, then discuss how tiny updates accumulate into learning.">📋 Activity C — Worksheet Table (Groups, 15-20 min)</SLabel>
          <WorksheetTable />
        </Card>
      )}

      {/* Activity D — quiz */}
      {actIdx === 3 && (
        <Card glow={C.pu}>
          <SLabel color={C.pu} note="5 conceptual questions covering the full lesson.">📝 Activity D — Mini Quiz (Individual, 10 min)</SLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
            {QUIZ.map((q, i) => (
              <div key={i} style={{ background: "#050b14", borderRadius: 9, padding: 14, border: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: C.serif, fontSize: 13.5, color: C.tx, marginBottom: 8, lineHeight: 1.7 }}>{q.q}</div>
                <textarea
                  rows={2}
                  placeholder="Type your answer..."
                  value={qa[`q${i + 1}`]}
                  onChange={e => setQa(a => ({ ...a, [`q${i + 1}`]: e.target.value }))}
                  style={{ width: "100%", background: "#030810", border: `1px solid ${C.border}`, borderRadius: 6, padding: "8px 12px", color: C.tx, fontFamily: C.serif, fontSize: 13, resize: "vertical", boxSizing: "border-box" }}
                />
                {qChk && (
                  <div style={{ marginTop: 8, padding: "8px 12px", background: C.gr + "0e", borderRadius: 6, border: `1px solid ${C.gr}30` }}>
                    <span style={{ fontFamily: C.mono, fontSize: 10, color: C.gr, fontWeight: 700 }}>MODEL ANSWER: </span>
                    <span style={{ fontFamily: C.serif, fontSize: 12, color: C.gr }}>{q.a}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <Btn onClick={() => setQChk(true)} color={C.pu}>📋 Reveal Answer Key</Btn>
        </Card>
      )}
    </div>
  );
}

function WorksheetTable() {
  const ROWS = [
    { id: "A", x: 1.0, w: 0.4, b: 0.1,  y: 1 },
    { id: "B", x: 0.5, w: 0.8, b: -0.2, y: 1 },
    { id: "C", x: 2.0, w: 0.1, b: 0.3,  y: 0 },
    { id: "D", x: 0.0, w: 0.6, b: -0.5, y: 0 },
  ];
  const [show, setShow] = useState(false);
  return (
    <div>
      <p style={{ fontFamily: C.serif, fontSize: 13, color: C.dim, marginBottom: 12, lineHeight: 1.75 }}>
        For each row compute: z = w*x + b, then check if z {'>'} 0 (predict 1) or z {"<="} 0 (predict 0). Compare to label y, then find error = z - y and loss = 0.5*(z-y)^2.
      </p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: C.mono, fontSize: 12 }}>
          <thead>
            <tr>
              {["#", "x", "w", "b", "z = w*x+b", "pred", "y", "error", "loss"].map(h => (
                <th key={h} style={{ padding: "8px 10px", color: C.dim, borderBottom: `1px solid ${C.border}`, textAlign: "left", fontSize: 10, letterSpacing: 1 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => {
              const z = r.w * r.x + r.b;
              const pred = z > 0 ? 1 : 0;
              const err = z - r.y;
              const loss = 0.5 * err * err;
              return (
                <tr key={r.id} style={{ background: i % 2 === 0 ? "#050b1499" : "transparent" }}>
                  <td style={{ padding: "9px 10px", color: C.dim, fontWeight: 700 }}>{r.id}</td>
                  <td style={{ padding: "9px 10px", color: C.bl }}>{r.x}</td>
                  <td style={{ padding: "9px 10px", color: C.am }}>{r.w}</td>
                  <td style={{ padding: "9px 10px", color: C.gr }}>{r.b}</td>
                  <td style={{ padding: "9px 10px", color: C.tx }}>{show ? f4(z) : "?"}</td>
                  <td style={{ padding: "9px 10px", color: show ? (pred === r.y ? C.gr : C.rd) : C.dim }}>{show ? pred : "?"}</td>
                  <td style={{ padding: "9px 10px", color: C.gr }}>{r.y}</td>
                  <td style={{ padding: "9px 10px", color: show ? (err >= 0 ? C.rd : C.bl) : C.dim }}>{show ? f4(err) : "?"}</td>
                  <td style={{ padding: "9px 10px", color: C.am }}>{show ? f4(loss) : "?"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <Btn onClick={() => setShow(s => !s)} color={C.am}>{show ? "🙈 Hide" : "📋 Show Answers"}</Btn>
      </div>
      <div style={{ marginTop: 14, padding: "12px 16px", background: "#050b14", borderRadius: 8, border: `1px solid ${C.border}` }}>
        <div style={{ fontFamily: C.mono, fontSize: 10, color: C.am, letterSpacing: 2, marginBottom: 8 }}>DISCUSSION QUESTIONS</div>
        {[
          "Row D has x=0. What is z? What role does bias play here?",
          "Which row has the largest loss? What made that prediction worst?",
          "For row C: error is positive, x=2.0. Should w increase or decrease?",
          "After 1000 training rounds, what do you expect the losses to approach?",
        ].map((q, i) => (
          <div key={i} style={{ fontFamily: C.serif, fontSize: 13, color: C.dim, marginBottom: 6, lineHeight: 1.7 }}>
            <span style={{ color: C.am }}>Q{i + 1}: </span>{q}
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT
// ══════════════════════════════════════════════════════════════════════════════
const TABS = [
  { id: "t1", label: "01 · Weights & Bias",    emoji: "📖", color: C.or,  Comp: Tab1 },
  { id: "t2", label: "02 · Cat Forward Pass",  emoji: "🐱", color: C.bl,  Comp: Tab2 },
  { id: "t3", label: "03 · Loss & Gradients",  emoji: "📉", color: C.rd,  Comp: Tab3 },
  { id: "t4", label: "04 · Backpropagation",   emoji: "🔙", color: C.pu,  Comp: Tab4 },
  { id: "t5", label: "05 · Python Code",        emoji: "🐍", color: C.gr,  Comp: Tab5 },
  { id: "t6", label: "06 · Activities & Quiz",  emoji: "🎮", color: C.am,  Comp: Tab6 },
];

function DLTutor() {
  const [active, setActive] = useState("t1");
  const tab = TABS.find(t => t.id === active);
  const { Comp, color } = tab;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.tx, fontFamily: C.serif }}>
      {/* Grid overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.015,
        backgroundImage: `linear-gradient(${C.or} 1px, transparent 1px), linear-gradient(90deg, ${C.or} 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }} />
      {/* Glow */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${color}12, transparent 65%)`,
        transition: "background 0.5s",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 980, margin: "0 auto", padding: "24px 14px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <div style={{ fontFamily: C.mono, fontSize: 9, letterSpacing: 8, color: C.dim, marginBottom: 7, textTransform: "uppercase" }}>
            Deep Learning Fundamentals · Interactive Classroom Guide
          </div>
          <h1 style={{
            margin: 0, fontFamily: C.mono, fontWeight: 900, letterSpacing: -1,
            fontSize: "clamp(20px,4vw,36px)",
            background: `linear-gradient(90deg, ${C.or}, ${C.am}, ${C.or})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Adjusting Weights {"&"} Biases
          </h1>
          <p style={{ color: C.dim, fontSize: 13, marginTop: 7, fontFamily: C.mono }}>
            Initialization · Forward Pass · Loss · Gradients · Backprop · Python · Activities
          </p>
        </div>

        {/* Nav */}
        <div style={{
          background: C.panel, borderRadius: 14, padding: 6,
          border: `1px solid ${C.border}`,
          display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center", marginBottom: 22,
        }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)} style={{
              padding: "7px 14px", borderRadius: 10, cursor: "pointer",
              border: `1px solid ${active === t.id ? t.color : "transparent"}`,
              background: active === t.id ? t.color + "18" : "transparent",
              color: active === t.id ? t.color : C.dim,
              fontFamily: C.mono, fontSize: 11, fontWeight: active === t.id ? 700 : 400,
              transition: "all 0.15s",
            }}>{t.emoji} {t.label}</button>
          ))}
        </div>

        {/* Content */}
        <div style={{
          background: C.panel + "bb", borderRadius: 18,
          border: `1px solid ${color}22`, padding: "24px 20px",
          boxShadow: `0 0 50px ${color}10`,
        }}>
          <Comp key={active} />
        </div>

        <div style={{ textAlign: "center", marginTop: 20, color: C.dd, fontFamily: C.mono, fontSize: 9, letterSpacing: 3 }}>
          DEEP LEARNING TUTOR · ALL MATH IN-BROWSER · NO DEPENDENCIES
        </div>
      </div>
    </div>
  );
}


// ============================================================
// 17. BACKPROP LEARN
// ============================================================


const theme = {
  bg: "#0a0e1a",
  surface: "#111827",
  card: "#1a2235",
  border: "#1e3a5f",
  accent: "#00d4ff",
  accentDim: "#0099bb",
  green: "#00ff9f",
  orange: "#ff9f00",
  red: "#ff4f6e",
  purple: "#b47aff",
  yellow: "#ffe066",
  text: "#e2eaf5",
  muted: "#6b84a8",
  inputNode: "#00d4ff",
  hiddenNode: "#b47aff",
  outputNode: "#00ff9f",
};

const sigmoid_bl = (x) => 1 / (1 + Math.exp(-x));
const relu_bl = (x) => Math.max(0, x);

// ─── Network config ───────────────────────────────────────────────────────────
const NET = {
  inputs: [{ label: "x₁", val: 1.0 }, { label: "x₂", val: 0.5 }],
  hidden: [
    { label: "h₁" },
    { label: "h₂" },
  ],
  output: [{ label: "ŷ" }],
  w_ih: [[0.8, -0.5], [0.3, 0.9]],   // [hidden][input]
  b_h: [0.1, -0.2],
  w_ho: [[0.7, -0.4]],               // [output][hidden]
  b_o: [0.1],
  target: 1.0,
};

function computeForward() {
  const x = NET.inputs.map((i) => i.val);
  const z_h = NET.hidden.map((_, j) =>
    NET.w_ih[j].reduce((s, w, i) => s + w * x[i], 0) + NET.b_h[j]
  );
  const a_h = z_h.map(relu_bl);
  const z_o = NET.output.map((_, k) =>
    NET.w_ho[k].reduce((s, w, j) => s + w * a_h[j], 0) + NET.b_o[k]
  );
  const a_o = z_o.map(sigmoid_bl);
  return { x, z_h, a_h, z_o, a_o };
}

function computeBackprop(fwd) {
  const { x, a_h, a_o } = fwd;
  const target = NET.target;
  const loss = 0.5 * Math.pow(a_o[0] - target, 2);
  const dL_dao = a_o[0] - target;
  const dao_dzo = a_o[0] * (1 - a_o[0]);
  const delta_o = dL_dao * dao_dzo;
  const dL_dwho = NET.w_ho[0].map((_, j) => delta_o * a_h[j]);
  const dL_dbo = delta_o;
  const delta_h = NET.w_ho[0].map((w, j) => delta_o * w * (a_h[j] > 0 ? 1 : 0));
  const dL_dwih = NET.w_ih.map((_, j) => x.map((xi) => delta_h[j] * xi));
  const dL_dbh = delta_h;
  return { loss, dL_dao, dao_dzo, delta_o, dL_dwho, dL_dbo, delta_h, dL_dwih, dL_dbh };
}

const FWD = computeForward();
const BWD = computeBackprop(FWD);

// ─── SVG Neural Network ───────────────────────────────────────────────────────
function NetworkSVG({ activeStep, phase }) {
  const layers = [
    { x: 80,  nodes: NET.inputs.map((n, i) => ({ y: 100 + i * 120, label: n.label, val: n.val.toFixed(2), type: "input" })) },
    { x: 260, nodes: NET.hidden.map((n, i) => ({ y: 80 + i * 120, label: n.label, val: FWD.a_h[i].toFixed(3), type: "hidden" })) },
    { x: 440, nodes: NET.output.map((n, i) => ({ y: 140, label: n.label, val: FWD.a_o[i].toFixed(3), type: "output" })) },
  ];

  const nodeColor = { input: theme.inputNode, hidden: theme.hiddenNode, output: theme.outputNode };
  const forwardEdges = [];
  const backEdges = [];

  // input→hidden edges
  layers[0].nodes.forEach((from, i) => {
    layers[1].nodes.forEach((to, j) => {
      forwardEdges.push({ x1: layers[0].x, y1: from.y, x2: layers[1].x, y2: to.y, w: NET.w_ih[j][i] });
      backEdges.push({ x1: layers[1].x, y1: to.y, x2: layers[0].x, y2: from.y, g: BWD.dL_dwih[j][i] });
    });
  });
  // hidden→output edges
  layers[1].nodes.forEach((from, j) => {
    layers[2].nodes.forEach((to, k) => {
      forwardEdges.push({ x1: layers[1].x, y1: from.y, x2: layers[2].x, y2: to.y, w: NET.w_ho[k][j] });
      backEdges.push({ x1: layers[2].x, y1: to.y, x2: layers[1].x, y2: from.y, g: BWD.dL_dwho[j] });
    });
  });

  const showBack = phase === "back";
  const edges = showBack ? backEdges : forwardEdges;

  return (
    <svg viewBox="0 0 520 280" style={{ width: "100%", maxWidth: 520, display: "block", margin: "0 auto" }}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <marker id="arrowF" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={theme.accent} />
        </marker>
        <marker id="arrowB" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
          <path d="M6,0 L0,3 L6,6 Z" fill={theme.orange} />
        </marker>
      </defs>

      {/* edges */}
      {edges.map((e, idx) => {
        const val = showBack ? e.g : e.w;
        const color = showBack ? theme.orange : (val > 0 ? theme.accent : theme.red);
        const mx = (e.x1 + e.x2) / 2;
        const my = (e.y1 + e.y2) / 2;
        return (
          <g key={idx}>
            <line x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
              stroke={color} strokeWidth={Math.abs(val) * 2.5 + 0.5}
              opacity={0.55}
              markerEnd={showBack ? "url(#arrowB)" : "url(#arrowF)"}
            />
            <text x={mx} y={my - 5} fill={color} fontSize="8" textAnchor="middle" fontFamily="monospace">
              {showBack ? `∂=${val.toFixed(3)}` : `w=${val}`}
            </text>
          </g>
        );
      })}

      {/* nodes */}
      {layers.map((layer, li) =>
        layer.nodes.map((node, ni) => (
          <g key={`${li}-${ni}`}>
            <circle cx={layer.x} cy={node.y} r={28}
              fill={theme.surface} stroke={nodeColor[node.type]}
              strokeWidth={2.5} filter="url(#glow)" />
            <text x={layer.x} y={node.y - 5} textAnchor="middle"
              fill={nodeColor[node.type]} fontSize="12" fontFamily="monospace" fontWeight="bold">
              {node.label}
            </text>
            <text x={layer.x} y={node.y + 11} textAnchor="middle"
              fill={theme.text} fontSize="9" fontFamily="monospace">
              {node.val}
            </text>
          </g>
        ))
      )}

      {/* layer labels */}
      {[
        { x: 80, label: "INPUT\nLAYER" },
        { x: 260, label: "HIDDEN\nLAYER" },
        { x: 440, label: "OUTPUT\nLAYER" },
      ].map((l, i) => (
        <text key={i} x={l.x} y={255} textAnchor="middle"
          fill={theme.muted} fontSize="9" fontFamily="monospace" letterSpacing="2">
          {l.label}
        </text>
      ))}

      {/* direction label */}
      <text x={260} y={15} textAnchor="middle" fill={showBack ? theme.orange : theme.accent}
        fontSize="10" fontFamily="monospace" letterSpacing="3" fontWeight="bold">
        {showBack ? "◄ BACKPROPAGATION (Gradient Flow)" : "► FORWARD PASS (Data Flow)"}
      </text>
    </svg>
  );
}

// ─── Math Step Card ───────────────────────────────────────────────────────────
function MathCard({ title, formula, note, color = theme.accent }) {
  return (
    <div style={{
      background: theme.card, border: `1px solid ${color}33`,
      borderLeft: `3px solid ${color}`, borderRadius: 8,
      padding: "12px 16px", margin: "8px 0",
    }}>
      <div style={{ color, fontFamily: "monospace", fontSize: 11, letterSpacing: 2, marginBottom: 4 }}>{title}</div>
      <div style={{
        background: "#0a0e1a", borderRadius: 6, padding: "10px 14px",
        fontFamily: "monospace", fontSize: 13, color: theme.text,
        lineHeight: 1.8, overflowX: "auto",
      }}>
        {formula}
      </div>
      {note && <div style={{ color: theme.muted, fontSize: 11, marginTop: 6, lineHeight: 1.5 }}>{note}</div>}
    </div>
  );
}

// ─── Section Components ───────────────────────────────────────────────────────
function SectionIntro() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
        {[
          { icon: "🧠", title: "What is it?", body: "A neural network is like a digital brain made of connected \"neurons\" that learn from data — just like you learn from experience!" },
          { icon: "📊", title: "What does it do?", body: "It takes inputs (like pixels of an image), processes them through layers, and produces an output (like \"this is a cat\")." },
          { icon: "🔄", title: "How does it learn?", body: "Through two passes: a forward pass (make a guess) and backpropagation (fix the mistakes by adjusting connections)." },
        ].map((c, i) => (
          <div key={i} style={{ background: theme.card, borderRadius: 10, padding: 16, border: `1px solid ${theme.border}` }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
            <div style={{ color: theme.accent, fontFamily: "monospace", fontSize: 11, letterSpacing: 2, marginBottom: 6 }}>{c.title}</div>
            <div style={{ color: theme.text, fontSize: 13, lineHeight: 1.6 }}>{c.body}</div>
          </div>
        ))}
      </div>

      <div style={{ background: theme.card, borderRadius: 10, padding: 20, border: `1px solid ${theme.border}`, marginBottom: 16 }}>
        <div style={{ color: theme.green, fontFamily: "monospace", fontSize: 11, letterSpacing: 3, marginBottom: 12 }}>🍕 REAL-WORLD ANALOGY</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <div style={{ color: theme.yellow, fontSize: 13, fontWeight: "bold", marginBottom: 6 }}>The Pizza Chef 🍕</div>
            <div style={{ color: theme.text, fontSize: 13, lineHeight: 1.7 }}>
              Imagine you're learning to make pizza. The first time, you guess the oven temperature. If the pizza burns, you <b style={{ color: theme.orange }}>adjust</b> — lower the heat. Next time, it's better. You keep adjusting until the pizza is perfect. That's EXACTLY what a neural network does!
            </div>
          </div>
          <div>
            <div style={{ color: theme.accent, fontSize: 13, fontWeight: "bold", marginBottom: 6 }}>Neural Network 🤖</div>
            <div style={{ color: theme.text, fontSize: 13, lineHeight: 1.7 }}>
              <b style={{ color: theme.inputNode }}>Inputs</b>: ingredients → <b style={{ color: theme.hiddenNode }}>Hidden layers</b>: cooking process → <b style={{ color: theme.outputNode }}>Output</b>: taste rating. If the output is wrong, <b style={{ color: theme.orange }}>backpropagation</b> sends the error backwards and tweaks the "recipe" (weights).
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: "#0f1929", borderRadius: 10, padding: 16, border: `1px solid ${theme.purple}44` }}>
        <div style={{ color: theme.purple, fontFamily: "monospace", fontSize: 11, letterSpacing: 3, marginBottom: 10 }}>📐 THE BIG PICTURE: TWO PHASES</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {["Input Data", "➜", "Forward Pass", "➜", "Prediction", "➜", "Calculate Error", "➜", "Backpropagation", "➜", "Update Weights", "➜", "Repeat"].map((s, i) => (
            <span key={i} style={{
              color: s === "➜" ? theme.muted : s.includes("Forward") ? theme.accent : s.includes("Back") ? theme.orange : s.includes("Error") ? theme.red : theme.text,
              fontFamily: "monospace", fontSize: 11, fontWeight: s.includes("Forward") || s.includes("Back") ? "bold" : "normal",
              background: (s.includes("Forward") || s.includes("Back")) ? "#1a2235" : "transparent",
              padding: (s.includes("Forward") || s.includes("Back")) ? "3px 8px" : 0,
              borderRadius: 4,
            }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionForward() {
  const [step, setStep] = useState(0);
  const steps = [
    {
      title: "Step 1 — Set Inputs",
      color: theme.inputNode,
      diagram: "input",
      content: (
        <div>
          <p style={{ color: theme.text, fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>
            The forward pass starts with your raw data. Think of inputs as the <b style={{ color: theme.inputNode }}>senses</b> of the network — they receive information from the outside world.
          </p>
          <MathCard title="OUR INPUTS" color={theme.inputNode}
            formula={`x₁ = 1.0   (e.g., pixel brightness)\nx₂ = 0.5   (e.g., another feature)`}
            note="These are fixed values we feed into the network. No math yet!" />
        </div>
      ),
    },
    {
      title: "Step 2 — Weighted Sum at Hidden Neuron h₁",
      color: theme.hiddenNode,
      diagram: "hidden",
      content: (
        <div>
          <p style={{ color: theme.text, fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>
            Each connection between neurons has a <b style={{ color: theme.orange }}>weight</b> — a number that shows how important that connection is. We multiply each input by its weight, then add them all up. We also add a <b style={{ color: theme.purple }}>bias</b> to shift the result.
          </p>
          <MathCard title="WEIGHTED SUM (z) for h₁" color={theme.hiddenNode}
            formula={`z_h₁ = (w₁₁ × x₁) + (w₂₁ × x₂) + b₁\n      = (0.8 × 1.0) + (-0.5 × 0.5) + 0.1\n      = 0.8 + (-0.25) + 0.1\n      = ${FWD.z_h[0].toFixed(4)}`}
            note="📌 Weight: strength of connection  |  Bias: shifts output up or down (like adjusting where 'zero' is)" />
        </div>
      ),
    },
    {
      title: "Step 3 — Activation Function (ReLU) on h₁",
      color: theme.purple,
      diagram: "hidden",
      content: (
        <div>
          <p style={{ color: theme.text, fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>
            After the weighted sum, we pass z through an <b style={{ color: theme.purple }}>activation function</b>. This decides if the neuron "fires" or not — just like real brain neurons! ReLU (Rectified Linear Unit) is the most common: it passes positive values through and kills negative ones.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <MathCard title="ReLU FORMULA" color={theme.purple}
              formula={`ReLU(z) = max(0, z)\n\na_h₁ = max(0, ${FWD.z_h[0].toFixed(4)})\n      = ${FWD.a_h[0].toFixed(4)}`} />
            <MathCard title="WHY RELU?" color={theme.yellow}
              formula={`if z ≤ 0 → output = 0  (neuron "off")\nif z > 0 → output = z  (neuron "on")`}
              note="Without activation, the network is just basic multiplication — boring! Activation adds intelligence." />
          </div>
        </div>
      ),
    },
    {
      title: "Step 4 — Same for Hidden Neuron h₂",
      color: theme.hiddenNode,
      diagram: "hidden",
      content: (
        <div>
          <p style={{ color: theme.text, fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>
            We repeat the exact same process for <b style={{ color: theme.hiddenNode }}>h₂</b> with its own weights and bias.
          </p>
          <MathCard title="h₂ WEIGHTED SUM" color={theme.hiddenNode}
            formula={`z_h₂ = (0.3 × 1.0) + (0.9 × 0.5) + (-0.2)\n      = 0.3 + 0.45 + (-0.2)\n      = ${FWD.z_h[1].toFixed(4)}`} />
          <MathCard title="h₂ ACTIVATION (ReLU)" color={theme.purple}
            formula={`a_h₂ = max(0, ${FWD.z_h[1].toFixed(4)}) = ${FWD.a_h[1].toFixed(4)}`}
            note="Both hidden neurons are now computed. They pass their values to the output layer." />
        </div>
      ),
    },
    {
      title: "Step 5 — Output Layer (Sigmoid)",
      color: theme.outputNode,
      diagram: "output",
      content: (
        <div>
          <p style={{ color: theme.text, fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>
            The output layer collects values from all hidden neurons and computes the final prediction. For binary classification, we use <b style={{ color: theme.green }}>Sigmoid</b> — it squashes any number into a range of 0 to 1 (like a probability!).
          </p>
          <MathCard title="OUTPUT WEIGHTED SUM" color={theme.outputNode}
            formula={`z_o = (0.7 × a_h₁) + (-0.4 × a_h₂) + 0.1\n    = (0.7 × ${FWD.a_h[0].toFixed(3)}) + (-0.4 × ${FWD.a_h[1].toFixed(3)}) + 0.1\n    = ${FWD.z_o[0].toFixed(4)}`} />
          <MathCard title="SIGMOID ACTIVATION" color={theme.green}
            formula={`σ(z) = 1 / (1 + e^(-z))\n\nŷ = σ(${FWD.z_o[0].toFixed(4)}) = ${FWD.a_o[0].toFixed(4)}`}
            note={`Prediction: ${(FWD.a_o[0] * 100).toFixed(1)}% probability of class 1. Target is 1.0 — we're close but not perfect, so we need backprop!`} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {steps.map((s, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            background: step === i ? s.color + "22" : theme.card,
            border: `1px solid ${step === i ? s.color : theme.border}`,
            color: step === i ? s.color : theme.muted,
            borderRadius: 6, padding: "6px 12px",
            fontFamily: "monospace", fontSize: 10, cursor: "pointer",
            letterSpacing: 1,
          }}>
            {`S${i + 1}`}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: theme.card, borderRadius: 10, padding: 16, border: `1px solid ${theme.border}` }}>
          <NetworkSVG activeStep={step} phase="forward" />
        </div>
        <div>
          <div style={{
            color: steps[step].color, fontFamily: "monospace", fontSize: 12,
            letterSpacing: 2, marginBottom: 12, fontWeight: "bold"
          }}>
            {steps[step].title}
          </div>
          {steps[step].content}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
              style={{ flex: 1, padding: "8px", background: step === 0 ? theme.surface : theme.card, border: `1px solid ${theme.border}`, color: theme.text, borderRadius: 6, cursor: step === 0 ? "default" : "pointer", fontFamily: "monospace", fontSize: 12 }}>
              ← PREV
            </button>
            <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} disabled={step === steps.length - 1}
              style={{ flex: 1, padding: "8px", background: step === steps.length - 1 ? theme.surface : theme.accent + "22", border: `1px solid ${theme.accent}`, color: theme.accent, borderRadius: 6, cursor: step === steps.length - 1 ? "default" : "pointer", fontFamily: "monospace", fontSize: 12 }}>
              NEXT →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionConcepts() {
  const [active, setActive] = useState("weight");
  const concepts = {
    weight: {
      title: "⚖️ Weights",
      color: theme.accent,
      icon: "⚖️",
      analogy: "Volume knob on a speaker — it controls how much each input affects the neuron.",
      detail: "Every connection in the network has a weight. A high weight means that input has a BIG influence. A weight near zero means it barely matters. Negative weights actually flip the signal!",
      formula: `z = w₁×x₁ + w₂×x₂ + ...\n\nOur weights: w₁₁=0.8, w₂₁=-0.5\n              w₁₂=0.3, w₂₂=0.9`,
      visual: [
        { label: "w = 2.0", note: "Strong positive → big push up", bar: 100, col: theme.green },
        { label: "w = 0.1", note: "Weak → barely matters", bar: 5, col: theme.accent },
        { label: "w = -1.5", note: "Negative → pushes down", bar: 75, col: theme.red, neg: true },
      ]
    },
    bias: {
      title: "🎯 Bias",
      color: theme.purple,
      icon: "🎯",
      analogy: "Like the snooze button on an alarm — it shifts WHEN the neuron wakes up.",
      detail: "Bias is an extra value added to the weighted sum BEFORE activation. It lets the neuron fire even when all inputs are zero, or prevents it from firing when inputs are present. It's like setting a 'threshold' for the neuron.",
      formula: `z = (w₁×x₁ + w₂×x₂) + bias\n\nOur biases: b_h₁ = +0.1 (nudge up)\n             b_h₂ = -0.2 (nudge down)`,
      visual: [
        { label: "b = +2.0", note: "Neuron fires more easily", bar: 100, col: theme.green },
        { label: "b = 0.0", note: "No shift (no bias)", bar: 50, col: theme.muted },
        { label: "b = -2.0", note: "Neuron harder to activate", bar: 10, col: theme.red },
      ]
    },
    activation: {
      title: "⚡ Activation Functions",
      color: theme.yellow,
      icon: "⚡",
      analogy: "Like a door: decides if information passes through or gets blocked.",
      detail: "Without activation functions, a neural network would just be one big linear equation — it couldn't learn complex patterns. Activation functions add non-linearity, which is math-speak for 'the ability to learn curves, not just straight lines.'",
      formula: `ReLU(z)   = max(0, z)     ← simple, fast\nSigmoid(z) = 1/(1+e^-z)  ← 0 to 1 range\nTanh(z)    = (e^z-e^-z)/(e^z+e^-z) ← -1 to 1`,
      visual: [
        { label: "z = -3 → ReLU → 0", note: "Negative blocked!", bar: 0, col: theme.red },
        { label: "z = 0 → ReLU → 0", note: "Zero stays zero", bar: 50, col: theme.muted },
        { label: "z = 4 → ReLU → 4", note: "Positive passes through", bar: 100, col: theme.green },
      ]
    },
    loss: {
      title: "📉 Loss Function",
      color: theme.red,
      icon: "📉",
      analogy: "A score for 'how wrong' the prediction is. Like a teacher marking your exam!",
      detail: "The Loss (or Cost) function measures the distance between what the network predicted and the correct answer. We want to MINIMIZE this. The smaller the loss, the better the network is performing.",
      formula: `MSE Loss = ½ × (prediction - target)²\n\n= ½ × (${FWD.a_o[0].toFixed(4)} - 1.0)²\n= ½ × ${(FWD.a_o[0] - 1.0).toFixed(4)}²\n= ${BWD.loss.toFixed(6)}`,
      visual: [
        { label: "Loss = 0.0", note: "Perfect! Network is correct", bar: 0, col: theme.green },
        { label: "Loss = 0.2", note: "Pretty close, minor error", bar: 40, col: theme.yellow },
        { label: "Loss = 1.0", note: "Way off — needs lots of learning", bar: 100, col: theme.red },
      ]
    },
  };

  const c = concepts[active];
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {Object.entries(concepts).map(([k, v]) => (
          <button key={k} onClick={() => setActive(k)} style={{
            flex: 1, padding: "10px 8px",
            background: active === k ? v.color + "22" : theme.card,
            border: `1px solid ${active === k ? v.color : theme.border}`,
            color: active === k ? v.color : theme.muted,
            borderRadius: 8, cursor: "pointer",
            fontFamily: "monospace", fontSize: 10, letterSpacing: 1,
          }}>
            {v.icon}<br />{k.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <div style={{ color: c.color, fontFamily: "monospace", fontSize: 14, fontWeight: "bold", marginBottom: 10 }}>{c.title}</div>
          <div style={{ background: `${c.color}11`, border: `1px solid ${c.color}44`, borderRadius: 8, padding: 12, marginBottom: 12 }}>
            <div style={{ color: c.color, fontSize: 11, fontFamily: "monospace", letterSpacing: 2, marginBottom: 6 }}>ANALOGY</div>
            <div style={{ color: theme.text, fontSize: 13, lineHeight: 1.6, fontStyle: "italic" }}>{c.analogy}</div>
          </div>
          <div style={{ color: theme.text, fontSize: 13, lineHeight: 1.7, marginBottom: 12 }}>{c.detail}</div>
          <div style={{ background: "#0a0e1a", borderRadius: 8, padding: 12, fontFamily: "monospace", fontSize: 12, color: theme.text, lineHeight: 1.8, whiteSpace: "pre" }}>
            {c.formula}
          </div>
        </div>

        <div>
          <div style={{ color: theme.muted, fontFamily: "monospace", fontSize: 10, letterSpacing: 2, marginBottom: 12 }}>VISUAL EXAMPLES</div>
          {c.visual.map((v, i) => (
            <div key={i} style={{ background: theme.card, borderRadius: 8, padding: 12, marginBottom: 8, border: `1px solid ${theme.border}` }}>
              <div style={{ color: theme.text, fontFamily: "monospace", fontSize: 11, marginBottom: 6 }}>{v.label}</div>
              <div style={{ background: "#0a0e1a", borderRadius: 4, height: 8, overflow: "hidden", marginBottom: 6 }}>
                <div style={{ height: "100%", width: `${Math.abs(v.bar)}%`, background: v.col, borderRadius: 4, transition: "width 0.5s" }} />
              </div>
              <div style={{ color: theme.muted, fontSize: 11 }}>{v.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionBackprop() {
  const [step, setStep] = useState(0);
  const steps = [
    {
      title: "Step 1 — Calculate the Loss",
      color: theme.red,
      content: (
        <div>
          <p style={{ color: theme.text, fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>
            After the forward pass, we compare the network's prediction to the correct answer. This difference is the <b style={{ color: theme.red }}>Loss</b>. Our goal is to make the loss as small as possible.
          </p>
          <MathCard title="LOSS CALCULATION" color={theme.red}
            formula={`Target (correct answer) = 1.0\nPrediction (ŷ)         = ${FWD.a_o[0].toFixed(4)}\n\nLoss = ½ × (ŷ - target)²\n     = ½ × (${FWD.a_o[0].toFixed(4)} - 1.0)²\n     = ${BWD.loss.toFixed(6)}`}
            note="The loss tells us: 'How badly did we mess up?' — smaller loss = better network!" />
        </div>
      ),
    },
    {
      title: "Step 2 — Gradient at Output (∂L/∂ŷ)",
      color: theme.orange,
      content: (
        <div>
          <p style={{ color: theme.text, fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>
            Now we ask: "If we increase the output prediction a tiny bit, how much does the loss change?" This is a <b style={{ color: theme.orange }}>gradient</b> — the slope of the loss surface. We use calculus (chain rule) to calculate it.
          </p>
          <MathCard title="OUTPUT GRADIENT" color={theme.orange}
            formula={`∂L/∂ŷ = ŷ - target\n      = ${FWD.a_o[0].toFixed(4)} - 1.0\n      = ${BWD.dL_dao.toFixed(4)}\n\nSigmoid derivative: σ'(z) = σ(z) × (1 - σ(z))\n= ${FWD.a_o[0].toFixed(4)} × ${(1 - FWD.a_o[0]).toFixed(4)} = ${BWD.dao_dzo.toFixed(4)}\n\nδ_output = ${BWD.dL_dao.toFixed(4)} × ${BWD.dao_dzo.toFixed(4)} = ${BWD.delta_o.toFixed(4)}`}
            note="Negative gradient means we need to INCREASE the output. Gradient tells us which direction to nudge the weights." />
        </div>
      ),
    },
    {
      title: "Step 3 — Gradients for Output Weights",
      color: theme.orange,
      content: (
        <div>
          <p style={{ color: theme.text, fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>
            We calculate how much each output weight contributed to the error. The gradient for each weight is the output delta multiplied by the hidden neuron value that fed into it.
          </p>
          <MathCard title="OUTPUT WEIGHT GRADIENTS" color={theme.orange}
            formula={`∂L/∂w_h₁o = δ_output × a_h₁\n           = ${BWD.delta_o.toFixed(4)} × ${FWD.a_h[0].toFixed(4)}\n           = ${BWD.dL_dwho[0].toFixed(6)}\n\n∂L/∂w_h₂o = δ_output × a_h₂\n           = ${BWD.delta_o.toFixed(4)} × ${FWD.a_h[1].toFixed(4)}\n           = ${BWD.dL_dwho[1].toFixed(6)}`}
            note="These gradients tell us: 'which direction should we move each weight to reduce the error?'" />
        </div>
      ),
    },
    {
      title: "Step 4 — Backpropagate to Hidden Layer",
      color: theme.purple,
      content: (
        <div>
          <p style={{ color: theme.text, fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>
            The error signal flows backwards from the output through the hidden layer. We use the <b style={{ color: theme.purple }}>chain rule</b> to calculate how much each hidden neuron contributed to the error.
          </p>
          <MathCard title="HIDDEN LAYER DELTAS" color={theme.purple}
            formula={`δ_h₁ = δ_output × w_h₁o × ReLU'(z_h₁)\n     = ${BWD.delta_o.toFixed(4)} × 0.7 × 1   [since a_h₁ > 0]\n     = ${BWD.delta_h[0].toFixed(6)}\n\nδ_h₂ = δ_output × w_h₂o × ReLU'(z_h₂)\n     = ${BWD.delta_o.toFixed(4)} × (-0.4) × 1 [since a_h₂ > 0]\n     = ${BWD.delta_h[1].toFixed(6)}`}
            note="ReLU derivative: 1 if input > 0, else 0. This is why it's called 'gradient killing' — dead neurons stop learning!" />
        </div>
      ),
    },
    {
      title: "Step 5 — Update All Weights (Gradient Descent)",
      color: theme.green,
      content: (
        <div>
          <p style={{ color: theme.text, fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>
            Finally! We update every weight using <b style={{ color: theme.green }}>Gradient Descent</b>: subtract the gradient × learning rate. The learning rate (α) controls how big our steps are — too big = overshoot, too small = slow learning.
          </p>
          <MathCard title="WEIGHT UPDATE RULE" color={theme.green}
            formula={`w_new = w_old - α × gradient\n\nLearning rate α = 0.1 (example)\n\nw_h₁o_new = 0.7 - 0.1 × ${BWD.dL_dwho[0].toFixed(4)}\n           = ${(0.7 - 0.1 * BWD.dL_dwho[0]).toFixed(6)}\n\nw_h₂o_new = -0.4 - 0.1 × ${BWD.dL_dwho[1].toFixed(4)}\n           = ${(-0.4 - 0.1 * BWD.dL_dwho[1]).toFixed(6)}`}
            note="🎉 Repeat this process thousands of times with training data and the network gets smarter and smarter!" />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ background: theme.card, borderRadius: 10, padding: 14, border: `1px solid ${theme.orange}44`, marginBottom: 16 }}>
        <div style={{ color: theme.orange, fontFamily: "monospace", fontSize: 11, letterSpacing: 3, marginBottom: 8 }}>💡 WHAT IS BACKPROPAGATION?</div>
        <div style={{ color: theme.text, fontSize: 13, lineHeight: 1.7 }}>
          Backpropagation (short for "backward propagation of errors") is the algorithm that makes neural networks learn. It works backwards from the output error, figuring out how much each weight was responsible for the mistake, then adjusts all weights to reduce future errors. It uses <b style={{ color: theme.purple }}>calculus (chain rule)</b> to calculate these gradients efficiently.
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {steps.map((s, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            flex: 1, minWidth: 50, padding: "8px 6px",
            background: step === i ? s.color + "22" : theme.card,
            border: `1px solid ${step === i ? s.color : theme.border}`,
            color: step === i ? s.color : theme.muted,
            borderRadius: 6, cursor: "pointer",
            fontFamily: "monospace", fontSize: 10, letterSpacing: 1,
          }}>S{i + 1}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: theme.card, borderRadius: 10, padding: 16, border: `1px solid ${theme.border}` }}>
          <NetworkSVG activeStep={step} phase="back" />
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
            {steps.map((s, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8,
                opacity: step >= i ? 1 : 0.3, transition: "opacity 0.3s"
              }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: step >= i ? s.color : theme.muted, flexShrink: 0 }} />
                <div style={{ color: step === i ? s.color : theme.muted, fontSize: 11, fontFamily: "monospace" }}>{s.title}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ color: steps[step].color, fontFamily: "monospace", fontSize: 12, fontWeight: "bold", letterSpacing: 2, marginBottom: 12 }}>
            {steps[step].title}
          </div>
          {steps[step].content}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
              style={{ flex: 1, padding: "8px", background: step === 0 ? theme.surface : theme.card, border: `1px solid ${theme.border}`, color: theme.text, borderRadius: 6, cursor: step === 0 ? "default" : "pointer", fontFamily: "monospace", fontSize: 12 }}>
              ← PREV
            </button>
            <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} disabled={step === steps.length - 1}
              style={{ flex: 1, padding: "8px", background: step === steps.length - 1 ? theme.surface : theme.orange + "22", border: `1px solid ${theme.orange}`, color: theme.orange, borderRadius: 6, cursor: step === steps.length - 1 ? "default" : "pointer", fontFamily: "monospace", fontSize: 12 }}>
              NEXT →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionSummary() {
  const [reveal, setReveal] = useState({});
  const quiz = [
    { q: "What does the Forward Pass do?", a: "It takes the input data, multiplies by weights, adds biases, applies activations, and produces a prediction." },
    { q: "What is a Weight in a neural network?", a: "A weight is a number on each connection that controls how strongly one neuron influences another. Higher weight = more influence." },
    { q: "Why do we need Activation Functions?", a: "Without activation functions, the network can only learn linear (straight-line) relationships. Activations like ReLU add non-linearity so networks can learn complex patterns." },
    { q: "What does Backpropagation do?", a: "It measures the prediction error (loss), then propagates this error backward through the network, calculating gradients to know how much each weight caused the error." },
    { q: "What is Gradient Descent?", a: "It's the method of updating weights using: w_new = w_old - α × gradient. We move weights in the direction that reduces the loss, step by step." },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
        <div style={{ background: theme.card, borderRadius: 10, padding: 16, border: `1px solid ${theme.accent}44` }}>
          <div style={{ color: theme.accent, fontFamily: "monospace", fontSize: 11, letterSpacing: 3, marginBottom: 12 }}>► FORWARD PASS SUMMARY</div>
          {[
            ["1. Input", "Raw data enters the network (x₁, x₂, ...)", theme.inputNode],
            ["2. Weighted Sum", "z = Σ(wᵢ × xᵢ) + bias", theme.accent],
            ["3. Activation", "a = ReLU(z) — adds non-linearity", theme.purple],
            ["4. Repeat", "Same process for each layer", theme.hiddenNode],
            ["5. Output", "Final prediction via Sigmoid (0 to 1)", theme.outputNode],
          ].map(([t, d, c], i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: c, marginTop: 6, flexShrink: 0 }} />
              <div>
                <span style={{ color: c, fontFamily: "monospace", fontSize: 11 }}>{t}</span>
                <span style={{ color: theme.muted, fontSize: 11 }}> — {d}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: theme.card, borderRadius: 10, padding: 16, border: `1px solid ${theme.orange}44` }}>
          <div style={{ color: theme.orange, fontFamily: "monospace", fontSize: 11, letterSpacing: 3, marginBottom: 12 }}>◄ BACKPROP SUMMARY</div>
          {[
            ["1. Loss", "Measure error: L = ½(ŷ - y)²", theme.red],
            ["2. Output Gradient", "∂L/∂ŷ = ŷ - target", theme.orange],
            ["3. Chain Rule", "Propagate gradients backward", theme.yellow],
            ["4. Weight Gradients", "∂L/∂w = δ × input", theme.purple],
            ["5. Update Weights", "w = w - α × ∂L/∂w", theme.green],
          ].map(([t, d, c], i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: c, marginTop: 6, flexShrink: 0 }} />
              <div>
                <span style={{ color: c, fontFamily: "monospace", fontSize: 11 }}>{t}</span>
                <span style={{ color: theme.muted, fontSize: 11 }}> — {d}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ color: theme.green, fontFamily: "monospace", fontSize: 11, letterSpacing: 3, marginBottom: 12 }}>🧠 QUICK QUIZ — CLICK TO REVEAL ANSWERS</div>
      {quiz.map((item, i) => (
        <div key={i} onClick={() => setReveal(r => ({ ...r, [i]: !r[i] }))}
          style={{ background: theme.card, borderRadius: 8, padding: 14, marginBottom: 8, border: `1px solid ${reveal[i] ? theme.green + "44" : theme.border}`, cursor: "pointer", transition: "border-color 0.3s" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ color: theme.text, fontSize: 13, fontWeight: "bold" }}>Q{i + 1}: {item.q}</div>
            <div style={{ color: reveal[i] ? theme.green : theme.muted, fontSize: 18 }}>{reveal[i] ? "▲" : "▼"}</div>
          </div>
          {reveal[i] && (
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${theme.border}`, color: theme.green, fontSize: 13, lineHeight: 1.6 }}>
              ✅ {item.a}
            </div>
          )}
        </div>
      ))}

      <div style={{ background: "#0f1929", borderRadius: 10, padding: 16, border: `1px solid ${theme.yellow}44`, marginTop: 16 }}>
        <div style={{ color: theme.yellow, fontFamily: "monospace", fontSize: 11, letterSpacing: 3, marginBottom: 8 }}>🚀 WHERE DOES THIS LEAD?</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { t: "CNNs", d: "Convolutional Neural Nets for image recognition", e: "🖼️" },
            { t: "LSTMs", d: "Recurrent networks for text and time series", e: "📝" },
            { t: "Transformers", d: "The architecture behind ChatGPT and Claude!", e: "🤖" },
          ].map((c, i) => (
            <div key={i} style={{ background: theme.card, borderRadius: 8, padding: 12, border: `1px solid ${theme.border}` }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{c.e}</div>
              <div style={{ color: theme.yellow, fontFamily: "monospace", fontSize: 11, marginBottom: 4 }}>{c.t}</div>
              <div style={{ color: theme.muted, fontSize: 11, lineHeight: 1.5 }}>{c.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
function BackpropLearn() {
  const [tab, setTab] = useState(0);

  const tabs = [
    { label: "🧠 Overview", component: <SectionIntro /> },
    { label: "► Forward Pass", component: <SectionForward /> },
    { label: "⚙️ Key Concepts", component: <SectionConcepts /> },
    { label: "◄ Backprop", component: <SectionBackprop /> },
    { label: "📋 Summary & Quiz", component: <SectionSummary /> },
  ];

  return (
    <div style={{ background: theme.bg, minHeight: "100vh", fontFamily: "'Courier New', monospace", padding: 0 }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(180deg, #0d1830 0%, ${theme.bg} 100%)`,
        borderBottom: `1px solid ${theme.border}`,
        padding: "20px 32px 0",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 4 }}>
            <div style={{
              fontFamily: "'Georgia', serif", fontSize: 26, fontWeight: "bold",
              background: `linear-gradient(90deg, ${theme.accent}, ${theme.purple})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Neural Network Learning
            </div>
            <div style={{ color: theme.muted, fontSize: 11, letterSpacing: 3 }}>FORWARD PASS & BACKPROPAGATION</div>
          </div>
          <div style={{ color: theme.muted, fontSize: 12, marginBottom: 16 }}>
            An interactive guide for high school students · Real math · Step-by-step examples
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 2 }}>
            {tabs.map((t, i) => (
              <button key={i} onClick={() => setTab(i)} style={{
                padding: "10px 16px", border: "none", cursor: "pointer",
                background: tab === i ? theme.card : "transparent",
                borderTop: `2px solid ${tab === i ? theme.accent : "transparent"}`,
                color: tab === i ? theme.accent : theme.muted,
                fontFamily: "monospace", fontSize: 11, letterSpacing: 1,
                borderRadius: "6px 6px 0 0", transition: "all 0.2s",
              }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 32px" }}>
        {/* Tab progress indicator */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
          {tabs.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= tab ? theme.accent : theme.border, transition: "background 0.3s" }} />
          ))}
        </div>

        {tabs[tab].component}

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, paddingTop: 20, borderTop: `1px solid ${theme.border}` }}>
          <button onClick={() => setTab(t => Math.max(0, t - 1))} disabled={tab === 0}
            style={{ padding: "10px 24px", background: tab === 0 ? "transparent" : theme.card, border: `1px solid ${tab === 0 ? "transparent" : theme.border}`, color: tab === 0 ? "transparent" : theme.text, borderRadius: 8, cursor: tab === 0 ? "default" : "pointer", fontFamily: "monospace", fontSize: 12 }}>
            ← Previous
          </button>
          <div style={{ color: theme.muted, fontSize: 11, alignSelf: "center" }}>
            {tab + 1} / {tabs.length} — {tabs[tab].label}
          </div>
          <button onClick={() => setTab(t => Math.min(tabs.length - 1, t + 1))} disabled={tab === tabs.length - 1}
            style={{ padding: "10px 24px", background: tab === tabs.length - 1 ? "transparent" : theme.accent + "22", border: `1px solid ${tab === tabs.length - 1 ? "transparent" : theme.accent}`, color: tab === tabs.length - 1 ? "transparent" : theme.accent, borderRadius: 8, cursor: tab === tabs.length - 1 ? "default" : "pointer", fontFamily: "monospace", fontSize: 12 }}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}


// ============================================================
// 18. BACKPROP TUTORIAL
// ============================================================


/* ═══════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=JetBrains+Mono:wght@400;500;700&family=Outfit:wght@300;400;500;600;700;800&display=swap');

*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0f1923;
  --bg2:#152030;
  --bg3:#1a2a3a;
  --surface:#1e3048;
  --surface2:#243a55;
  --border:#2a4a6a;
  --border2:#3a5a7a;
  --emerald:#10d9a0;
  --emerald2:#0fa87a;
  --emerald3:#d4f7ee;
  --amber:#f59e0b;
  --amber2:#fcd34d;
  --amber3:#fffbeb;
  --rose:#fb7185;
  --rose2:#fda4af;
  --sky:#38bdf8;
  --sky2:#7dd3fc;
  --violet:#a78bfa;
  --violet2:#ddd6fe;
  --text:#e8f4f0;
  --muted:#7ba3be;
  --muted2:#4a7a95;
  --glow-e:0 0 20px rgba(16,217,160,.25);
  --glow-a:0 0 20px rgba(245,158,11,.25);
  --glow-r:0 0 20px rgba(251,113,133,.25);
  --glow-s:0 0 20px rgba(56,189,248,.25);
}

html,body{height:100%;font-family:'Outfit',sans-serif;background:var(--bg);color:var(--text)}

/* ── Layout ── */
.app{min-height:100vh;background:var(--bg);overflow-x:hidden}
.hero{
  background:linear-gradient(135deg,#0a1520 0%,#122030 40%,#0f1f30 100%);
  border-bottom:1px solid var(--border);
  padding:48px 24px 40px;text-align:center;position:relative;overflow:hidden;
}
.hero::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 70% 60% at 50% 0%,rgba(16,217,160,.08),transparent);
  pointer-events:none;
}
.hero-eyebrow{
  display:inline-flex;align-items:center;gap:8px;
  background:rgba(16,217,160,.1);border:1px solid rgba(16,217,160,.3);
  border-radius:20px;padding:5px 16px;
  font-family:'JetBrains Mono';font-size:11px;color:var(--emerald);
  letter-spacing:2px;text-transform:uppercase;margin-bottom:20px;
}
.hero h1{
  font-family:'Playfair Display';font-size:clamp(32px,6vw,60px);font-weight:900;
  background:linear-gradient(135deg,#10d9a0,#38bdf8,#a78bfa);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  line-height:1.1;margin-bottom:14px;
}
.hero-sub{font-size:17px;color:var(--muted);max-width:560px;margin:0 auto 28px;line-height:1.8}
.hero-chips{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
.chip{
  padding:5px 14px;border-radius:20px;font-size:12px;font-weight:600;
  border:1px solid;font-family:'JetBrains Mono';
}
.chip-e{background:rgba(16,217,160,.1);border-color:rgba(16,217,160,.3);color:var(--emerald)}
.chip-a{background:rgba(245,158,11,.1);border-color:rgba(245,158,11,.3);color:var(--amber)}
.chip-s{background:rgba(56,189,248,.1);border-color:rgba(56,189,248,.3);color:var(--sky)}
.chip-v{background:rgba(167,139,250,.1);border-color:rgba(167,139,250,.3);color:var(--violet)}

/* ── Nav ── */
.tabs{
  display:flex;gap:4px;overflow-x:auto;padding:16px 24px;
  background:var(--bg2);border-bottom:1px solid var(--border);
  position:sticky;top:0;z-index:50;
}
.tabs::-webkit-scrollbar{height:3px}
.tabs::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px}
.tab{
  padding:9px 18px;border-radius:8px;border:1px solid transparent;
  background:transparent;color:var(--muted);cursor:pointer;
  font-family:'Outfit';font-weight:600;font-size:13px;transition:all .2s;
  white-space:nowrap;
}
.tab:hover{border-color:var(--border2);color:var(--text)}
.tab.active{background:var(--surface);border-color:var(--emerald);color:var(--emerald)}

/* ── Content ── */
.content{max-width:1100px;margin:0 auto;padding:32px 24px 80px}

/* ── Cards ── */
.card{
  background:var(--surface);border:1px solid var(--border);
  border-radius:16px;padding:28px;margin-bottom:20px;
  position:relative;overflow:hidden;
}
.card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px}
.card.e::before{background:linear-gradient(90deg,var(--emerald),var(--sky))}
.card.a::before{background:linear-gradient(90deg,var(--amber),var(--rose))}
.card.s::before{background:linear-gradient(90deg,var(--sky),var(--violet))}
.card.v::before{background:linear-gradient(90deg,var(--violet),var(--rose))}
.card.r::before{background:linear-gradient(90deg,var(--rose),var(--amber))}

.card-title{
  font-family:'Playfair Display';font-size:20px;font-weight:700;
  color:var(--text);margin-bottom:6px;display:flex;align-items:center;gap:10px;
}
.card-sub{font-size:14px;color:var(--muted);line-height:1.8;margin-bottom:16px}

/* ── Section header ── */
.sh{margin-bottom:28px}
.sh-badge{
  display:inline-flex;align-items:center;gap:6px;
  background:var(--surface2);border:1px solid var(--border2);
  border-radius:6px;padding:4px 12px;
  font-family:'JetBrains Mono';font-size:10px;color:var(--muted);
  letter-spacing:1px;margin-bottom:12px;
}
.sh h2{
  font-family:'Playfair Display';font-size:clamp(22px,4vw,36px);
  font-weight:900;color:var(--text);line-height:1.2;margin-bottom:8px;
}
.sh p{font-size:15px;color:var(--muted);line-height:1.8;max-width:720px}

/* ── Info grid ── */
.igrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px;margin:16px 0}
.ibox{
  background:var(--bg3);border:1px solid var(--border);border-radius:12px;
  padding:18px;transition:all .2s;
}
.ibox:hover{border-color:var(--border2);transform:translateY(-2px)}
.ibox-ico{font-size:28px;margin-bottom:10px}
.ibox-title{font-weight:700;font-size:14px;color:var(--text);margin-bottom:6px}
.ibox-body{font-size:13px;color:var(--muted);line-height:1.6}

/* ── Code ── */
.code{
  background:#090f18;border:1px solid var(--border);border-radius:12px;
  padding:18px 22px;font-family:'JetBrains Mono';font-size:13px;
  line-height:2;overflow-x:auto;margin:14px 0;position:relative;
}
.code .lang{
  position:absolute;top:10px;right:12px;
  background:var(--surface2);color:var(--muted2);
  padding:2px 10px;border-radius:5px;font-size:10px;letter-spacing:.5px;
}
.kw{color:#c792ea}.fn{color:#82aaff}.str{color:#c3e88d}
.num{color:#f78c6c}.cm{color:#546e7a}.op{color:#89ddff}
.var{color:#f07178}.cls{color:#ffcb6b}

/* ── Formula ── */
.formula{
  background:linear-gradient(135deg,#090f18,#0d1822);
  border:1px solid var(--border);border-left:3px solid var(--emerald);
  border-radius:0 10px 10px 0;padding:14px 20px;
  font-family:'JetBrains Mono';font-size:14px;color:var(--emerald);
  margin:12px 0;line-height:2;overflow-x:auto;
}
.formula .fc{color:var(--muted2);font-size:11px}
.formula .fa{color:var(--amber)}
.formula .fr{color:var(--rose)}
.formula .fs{color:var(--sky)}
.formula .fv{color:var(--violet)}

/* ── Callout ── */
.callout{
  border-radius:10px;padding:14px 18px;margin:14px 0;
  font-size:14px;line-height:1.7;border:1px solid;
}
.callout-e{background:rgba(16,217,160,.08);border-color:rgba(16,217,160,.2);color:var(--emerald3)}
.callout-a{background:rgba(245,158,11,.08);border-color:rgba(245,158,11,.2);color:var(--amber3)}
.callout-s{background:rgba(56,189,248,.08);border-color:rgba(56,189,248,.2);color:var(--sky2)}
.callout-v{background:rgba(167,139,250,.08);border-color:rgba(167,139,250,.2);color:var(--violet2)}
.callout-r{background:rgba(251,113,133,.08);border-color:rgba(251,113,133,.2);color:var(--rose2)}
.callout strong{font-weight:800}

/* ── Buttons ── */
.btn{
  padding:10px 22px;border-radius:10px;border:none;cursor:pointer;
  font-family:'Outfit';font-weight:700;font-size:14px;transition:all .2s;
  display:inline-flex;align-items:center;gap:8px;
}
.btn-e{background:linear-gradient(135deg,var(--emerald),var(--emerald2));color:#0a1a14}
.btn-e:hover{opacity:.85;transform:translateY(-1px);box-shadow:var(--glow-e)}
.btn-a{background:linear-gradient(135deg,var(--amber),#d97706);color:#1a0e00}
.btn-a:hover{opacity:.85;transform:translateY(-1px);box-shadow:var(--glow-a)}
.btn-s{background:linear-gradient(135deg,var(--sky),#0284c7);color:#001a2e}
.btn-s:hover{opacity:.85;transform:translateY(-1px)}
.btn-out{background:transparent;color:var(--muted);border:1px solid var(--border2)}
.btn-out:hover{border-color:var(--emerald);color:var(--emerald)}
.btn:disabled{opacity:.35;cursor:not-allowed;transform:none!important}

/* ── Tag ── */
.tag{
  display:inline-flex;align-items:center;
  padding:2px 10px;border-radius:12px;font-size:11px;font-weight:700;
  font-family:'JetBrains Mono';
}
.tg-e{background:rgba(16,217,160,.15);color:var(--emerald);border:1px solid rgba(16,217,160,.3)}
.tg-a{background:rgba(245,158,11,.15);color:var(--amber);border:1px solid rgba(245,158,11,.3)}
.tg-r{background:rgba(251,113,133,.15);color:var(--rose);border:1px solid rgba(251,113,133,.3)}
.tg-s{background:rgba(56,189,248,.15);color:var(--sky);border:1px solid rgba(56,189,248,.3)}
.tg-v{background:rgba(167,139,250,.15);color:var(--violet);border:1px solid rgba(167,139,250,.3)}

/* ── Network SVG wrapper ── */
.net-wrap{width:100%;overflow-x:auto;background:var(--bg3);border:1px solid var(--border);border-radius:14px;padding:20px}
.net-wrap svg{display:block;margin:0 auto}

/* ── Step nav ── */
.step-nav{display:flex;gap:0;border-radius:10px;overflow:hidden;border:1px solid var(--border);margin-bottom:24px}
.step-btn{
  flex:1;padding:12px 8px;
  background:var(--bg3);border:none;color:var(--muted);
  cursor:pointer;font-family:'JetBrains Mono';font-size:11px;
  border-right:1px solid var(--border);transition:all .2s;text-align:center;
}
.step-btn:last-child{border-right:none}
.step-btn:hover{background:var(--surface);color:var(--text)}
.step-btn.active{background:var(--surface2);color:var(--emerald)}
.step-btn .sn{display:block;font-size:18px;font-weight:700;margin-bottom:2px}

/* ── Neuron detail ── */
.nd{
  background:var(--bg3);border:1px solid var(--emerald);border-radius:12px;
  padding:20px;margin-top:16px;animation:fadeUp .3s ease;
}
.nd h3{font-family:'Playfair Display';font-size:16px;color:var(--emerald);margin-bottom:10px}
.nd p{font-size:13px;color:var(--muted);line-height:1.7;margin-bottom:8px}

/* ── Value table ── */
.vtable{width:100%;border-collapse:collapse;font-family:'JetBrains Mono';font-size:13px;margin:14px 0}
.vtable th{background:var(--bg);color:var(--muted);padding:10px 14px;text-align:left;font-size:11px;border-bottom:1px solid var(--border)}
.vtable td{padding:10px 14px;border-bottom:1px solid var(--border);color:var(--text)}
.vtable tr:hover td{background:var(--surface2)}
.vtable .hi{color:var(--emerald);font-weight:700}
.vtable .ha{color:var(--amber);font-weight:700}
.vtable .hr{color:var(--rose);font-weight:700}
.vtable .hs{color:var(--sky);font-weight:700}

/* ── Progress bar ── */
.prog-wrap{background:var(--bg);border-radius:6px;height:6px;overflow:hidden;margin:12px 0}
.prog{height:100%;border-radius:6px;background:linear-gradient(90deg,var(--emerald),var(--sky));transition:width .4s ease}

/* ── Quiz ── */
.quiz-card{
  background:linear-gradient(135deg,var(--surface),var(--bg3));
  border:1px solid var(--border2);border-radius:14px;padding:24px;margin-top:16px;
}
.q-text{font-size:16px;font-weight:600;color:var(--text);margin-bottom:18px;line-height:1.5}
.q-opts{display:flex;flex-direction:column;gap:8px}
.q-opt{
  padding:12px 16px;border-radius:9px;border:1px solid var(--border);
  background:var(--bg3);color:var(--muted);cursor:pointer;
  font-size:14px;text-align:left;transition:all .2s;
}
.q-opt:hover{border-color:var(--border2);color:var(--text)}
.q-opt.correct{border-color:var(--emerald);background:rgba(16,217,160,.1);color:var(--emerald)}
.q-opt.wrong{border-color:var(--rose);background:rgba(251,113,133,.08);color:var(--rose)}
.q-feedback{margin-top:12px;padding:12px 16px;border-radius:9px;font-size:13px;line-height:1.7}
.qf-c{background:rgba(16,217,160,.08);color:var(--emerald3);border:1px solid rgba(16,217,160,.2)}
.qf-w{background:rgba(251,113,133,.08);color:var(--rose2);border:1px solid rgba(251,113,133,.2)}

/* ── Slider ── */
.slider-wrap{margin:12px 0}
.slider-label{display:flex;justify-content:space-between;font-family:'JetBrains Mono';font-size:12px;color:var(--muted);margin-bottom:6px}
input[type=range]{
  width:100%;accent-color:var(--emerald);cursor:pointer;height:6px;
  background:var(--bg);border-radius:3px;
}

/* ── Anim ── */
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
@keyframes flowRight{0%{stroke-dashoffset:40}100%{stroke-dashoffset:0}}
@keyframes flowLeft{0%{stroke-dashoffset:0}100%{stroke-dashoffset:40}}
@keyframes glowPulse{0%,100%{filter:drop-shadow(0 0 4px rgba(16,217,160,.4))}50%{filter:drop-shadow(0 0 12px rgba(16,217,160,.8))}}
.fade-up{animation:fadeUp .35s ease both}
.pulse-anim{animation:pulse 2s infinite}
.flow-fwd .edge-line{stroke-dasharray:8 4;animation:flowRight .6s linear infinite}
.flow-bwd .edge-line{stroke-dasharray:8 4;animation:flowLeft .6s linear infinite}

/* ── Grid two-col ── */
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px}
@media(max-width:700px){.two-col{grid-template-columns:1fr}}

/* ── Scrollbar ── */
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:var(--bg2)}
::-webkit-scrollbar-thumb{background:var(--border2);border-radius:3px}

/* ── Divider ── */
.divider{border:none;border-top:1px solid var(--border);margin:24px 0}

/* ── Input field ── */
.inp{
  background:var(--bg);border:1px solid var(--border2);border-radius:8px;
  padding:8px 14px;font-family:'JetBrains Mono';font-size:14px;
  color:var(--text);width:100%;transition:border-color .2s;
}
.inp:focus{outline:none;border-color:var(--emerald);box-shadow:0 0 0 3px rgba(16,217,160,.12)}

/* ── Answer feedback ── */
.af{padding:10px 14px;border-radius:8px;font-size:13px;line-height:1.6;margin-top:8px}
.af-c{background:rgba(16,217,160,.08);color:var(--emerald);border:1px solid rgba(16,217,160,.25)}
.af-w{background:rgba(251,113,133,.08);color:var(--rose);border:1px solid rgba(251,113,133,.25)}
.af-h{background:rgba(245,158,11,.08);color:var(--amber);border:1px solid rgba(245,158,11,.25)}
`;

/* ═══════════════════════════════════════════════════════════
   MATH UTILITIES
═══════════════════════════════════════════════════════════ */
const sigmoid_bt = x => 1 / (1 + Math.exp(-x));
const sigmoidDeriv = x => sigmoid_bt(x) * (1 - sigmoid_bt(x));
const relu_bt = x => Math.max(0, x);
const reluDeriv = x => x > 0 ? 1 : 0;
const r = n => Math.round(n * 1000) / 1000;

/* ═══════════════════════════════════════════════════════════
   NETWORK CONSTANTS  (2-input → 2-hidden → 1-output)
═══════════════════════════════════════════════════════════ */
const INIT_NET = {
  // inputs
  x1: 0.5, x2: 0.8,
  // hidden layer weights & biases
  w11: 0.4, w12: -0.3, w21: 0.7, w22: 0.5,
  b1: 0.1, b2: -0.2,
  // output layer weights & biases
  v1: 0.6, v2: -0.4,
  bo: 0.3,
  // target
  target: 1.0,
  lr: 0.5,
};

function forwardPass(net) {
  const { x1, x2, w11, w12, w21, w22, b1, b2, v1, v2, bo } = net;
  // hidden pre-activations
  const z1 = w11 * x1 + w21 * x2 + b1;
  const z2 = w12 * x1 + w22 * x2 + b2;
  // hidden activations (sigmoid_bt)
  const h1 = sigmoid_bt(z1);
  const h2 = sigmoid_bt(z2);
  // output pre-activation
  const zo = v1 * h1 + v2 * h2 + bo;
  // output activation (sigmoid_bt)
  const yhat = sigmoid_bt(zo);
  return { z1, z2, h1, h2, zo, yhat };
}

function backwardPass(net, fwd) {
  const { x1, x2, w11, w12, w21, w22, v1, v2, target, lr } = net;
  const { z1, z2, h1, h2, zo, yhat } = fwd;
  // output error
  const dL_dyhat = yhat - target;          // MSE derivative: (ŷ - y)
  const dL_dzo = dL_dyhat * sigmoidDeriv(zo);
  // gradients for output weights
  const dL_dv1 = dL_dzo * h1;
  const dL_dv2 = dL_dzo * h2;
  const dL_dbo = dL_dzo;
  // backprop through hidden neurons
  const dL_dh1 = dL_dzo * v1;
  const dL_dh2 = dL_dzo * v2;
  const dL_dz1 = dL_dh1 * sigmoidDeriv(z1);
  const dL_dz2 = dL_dh2 * sigmoidDeriv(z2);
  // gradients for hidden weights
  const dL_dw11 = dL_dz1 * x1;
  const dL_dw21 = dL_dz1 * x2;
  const dL_dw12 = dL_dz2 * x1;
  const dL_dw22 = dL_dz2 * x2;
  const dL_db1  = dL_dz1;
  const dL_db2  = dL_dz2;
  // loss
  const loss = 0.5 * Math.pow(yhat - target, 2);
  return { dL_dyhat, dL_dzo, dL_dv1, dL_dv2, dL_dbo,
           dL_dh1, dL_dh2, dL_dz1, dL_dz2,
           dL_dw11, dL_dw21, dL_dw12, dL_dw22,
           dL_db1, dL_db2, loss };
}

function updateWeights(net, grads) {
  const { lr } = net;
  const g = grads;
  return {
    ...net,
    w11: net.w11 - lr * g.dL_dw11,
    w12: net.w12 - lr * g.dL_dw12,
    w21: net.w21 - lr * g.dL_dw21,
    w22: net.w22 - lr * g.dL_dw22,
    b1:  net.b1  - lr * g.dL_db1,
    b2:  net.b2  - lr * g.dL_db2,
    v1:  net.v1  - lr * g.dL_dv1,
    v2:  net.v2  - lr * g.dL_dv2,
    bo:  net.bo  - lr * g.dL_dbo,
  };
}

/* ═══════════════════════════════════════════════════════════
   SVG NEURAL NETWORK DIAGRAM
═══════════════════════════════════════════════════════════ */
const NODES = {
  input: [{id:"x1",cx:80,cy:130,label:"x₁"},{id:"x2",cx:80,cy:230,label:"x₂"}],
  hidden: [{id:"h1",cx:280,cy:110,label:"H₁"},{id:"h2",cx:280,cy:250,label:"H₂"}],
  output: [{id:"o1",cx:480,cy:180,label:"ŷ"}],
};

const EDGES = [
  {from:"x1",to:"h1",w:"w₁₁",fwd:true},{from:"x1",to:"h2",w:"w₁₂",fwd:true},
  {from:"x2",to:"h1",w:"w₂₁",fwd:true},{from:"x2",to:"h2",w:"w₂₂",fwd:true},
  {from:"h1",to:"o1",w:"v₁",fwd:true},{from:"h2",to:"o1",w:"v₂",fwd:true},
];

function findNode(id) {
  for (const layer of Object.values(NODES)) {
    const n = layer.find(n=>n.id===id);
    if (n) return n;
  }
}

function NetDiagram({ mode="idle", activeEdges=[], activeNodes=[], fwd={}, net={}, onNodeClick }) {
  const allNodes = [...NODES.input,...NODES.hidden,...NODES.output];
  return (
    <svg viewBox="0 0 580 360" width="100%" style={{maxWidth:580}}>
      {/* Background grid */}
      <defs>
        <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0L0 0 0 30" fill="none" stroke="rgba(42,74,106,.4)" strokeWidth=".5"/>
        </pattern>
        <marker id="arr-e" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#10d9a0" opacity=".8"/>
        </marker>
        <marker id="arr-r" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#fb7185" opacity=".8"/>
        </marker>
        <marker id="arr-g" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#4a7a95" opacity=".6"/>
        </marker>
      </defs>
      <rect width="580" height="360" fill="url(#grid)" rx="10"/>

      {/* Layer labels */}
      {[{x:80,l:"INPUT"},{x:280,l:"HIDDEN"},{x:480,l:"OUTPUT"}].map(({x,l})=>(
        <text key={l} x={x} y={26} textAnchor="middle" fill="#4a7a95"
          fontFamily="JetBrains Mono" fontSize="10" letterSpacing="2">{l}</text>
      ))}

      {/* Layer label sublabels */}
      {[{x:80,l:"(2 neurons)"},{x:280,l:"(2 neurons)"},{x:480,l:"(1 neuron)"}].map(({x,l})=>(
        <text key={x} x={x} y={42} textAnchor="middle" fill="#2a4a6a"
          fontFamily="JetBrains Mono" fontSize="9">{l}</text>
      ))}

      {/* Bias indicators */}
      <text x={280} y={320} textAnchor="middle" fill="#4a7a95" fontFamily="JetBrains Mono" fontSize="9">+ bias b₁, b₂</text>
      <text x={480} y={320} textAnchor="middle" fill="#4a7a95" fontFamily="JetBrains Mono" fontSize="9">+ bias bₒ</text>

      {/* Edges */}
      {EDGES.map((e,i)=>{
        const fn = findNode(e.from), tn = findNode(e.to);
        const isActive = activeEdges.includes(e.w) || activeEdges.includes(`${e.from}-${e.to}`);
        const isBwd = mode==="backward" && isActive;
        const clr = mode==="backward" && isActive ? "#fb7185" :
                    mode==="forward"  && isActive ? "#10d9a0" : "#2a4a6a";
        const mkr = isBwd ? "url(#arr-r)" : isActive ? "url(#arr-e)" : "url(#arr-g)";
        const dx = tn.cx - fn.cx, dy = tn.cy - fn.cy;
        const len = Math.sqrt(dx*dx+dy*dy);
        const nr = 22;
        const sx = fn.cx + dx/len*nr, sy = fn.cy + dy/len*nr;
        const ex = tn.cx - dx/len*(nr+6), ey = tn.cy - dy/len*(nr+6);
        // midpoint for label
        const mx = (sx+ex)/2, my = (sy+ey)/2;
        return (
          <g key={i}>
            <line x1={sx} y1={sy} x2={ex} y2={ey}
              stroke={clr} strokeWidth={isActive?2.5:1}
              opacity={isActive?1:.5}
              markerEnd={mkr}
              className={isActive ? (isBwd?"edge-line":mode==="forward"?"edge-line":"") : ""}
            />
            <rect x={mx-14} y={my-9} width={28} height={17} rx={4}
              fill={isActive?clr:"#1a2a3a"} opacity={isActive?.9:.7}/>
            <text x={mx} y={my+5} textAnchor="middle"
              fill={isActive?"#0a1a0a":"#7ba3be"}
              fontFamily="JetBrains Mono" fontSize="10" fontWeight={isActive?"700":"400"}>
              {e.w}
            </text>
          </g>
        );
      })}

      {/* Nodes */}
      {allNodes.map(n=>{
        const isActive = activeNodes.includes(n.id);
        const isInput = NODES.input.some(x=>x.id===n.id);
        const isOut = n.id==="o1";
        const color = isOut ? "#f59e0b" : isInput ? "#38bdf8" : "#10d9a0";
        const val = isInput ? (n.id==="x1" ? net.x1 : net.x2) :
                    n.id==="h1" ? fwd.h1 : n.id==="h2" ? fwd.h2 :
                    fwd.yhat;
        return (
          <g key={n.id} style={{cursor:"pointer"}} onClick={()=>onNodeClick&&onNodeClick(n.id)}>
            <circle cx={n.cx} cy={n.cy} r={26}
              fill={isActive?`${color}22`:"#1e3048"}
              stroke={isActive?color:"#2a4a6a"}
              strokeWidth={isActive?2.5:1.5}
              style={isActive?{filter:`drop-shadow(0 0 8px ${color})`}:{}}
            />
            <text x={n.cx} y={n.cy-4} textAnchor="middle"
              fill={isActive?color:"#7ba3be"}
              fontFamily="Playfair Display" fontSize="13" fontWeight="700">
              {n.label}
            </text>
            {val !== undefined && (
              <text x={n.cx} y={n.cy+11} textAnchor="middle"
                fill={isActive?color:"#4a7a95"}
                fontFamily="JetBrains Mono" fontSize="9">
                {r(val)}
              </text>
            )}
          </g>
        );
      })}

      {/* Mode label */}
      {mode!=="idle" && (
        <rect x={10} y={328} width={mode==="forward"?120:130} height={22} rx={5} fill={mode==="forward"?"#10d9a022":"#fb718522"}/>
      )}
      {mode!=="idle" && (
        <text x={20} y={343} fill={mode==="forward"?"#10d9a0":"#fb7185"}
          fontFamily="JetBrains Mono" fontSize="10">
          ▶ {mode==="forward"?"FORWARD PASS":"BACKPROPAGATION"}
        </text>
      )}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   TAB SECTIONS
═══════════════════════════════════════════════════════════ */

/* ── WHAT IS ── */
function WhatIs() {
  return (
    <div className="fade-up">
      <div className="sh">
        <div className="sh-badge">📖 SECTION 1</div>
        <h2>What Are Forward Pass & Backpropagation?</h2>
        <p>A neural network learns to make predictions through two complementary processes. Together they form the engine of all deep learning — from the AI that recognizes your face to the one that writes poetry.</p>
      </div>

      <div className="two-col">
        <div className="card e">
          <div className="card-title">🔜 Forward Pass</div>
          <div className="card-sub">Also called "forward propagation" — the <em>prediction</em> step</div>
          <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:14}}>
            Data flows <strong style={{color:"var(--emerald)"}}>left to right</strong> through the network. Each layer receives inputs, multiplies them by weights, adds biases, and applies an activation function. The final layer produces the network's guess (<strong style={{color:"var(--emerald)"}}>ŷ</strong> — pronounced "y-hat").
          </p>
          <div className="callout callout-e" style={{marginTop:14}}>
            <strong>🎓 Real-life analogy:</strong> Imagine you're taking a test. Forward pass = solving each question step by step and writing your answer.
          </div>
          <div style={{marginTop:14}}>
            <span className="tag tg-e">Input → Hidden → Output</span>
          </div>
        </div>
        <div className="card r">
          <div className="card-title">🔙 Backpropagation</div>
          <div className="card-sub">Also "backward propagation of errors" — the <em>learning</em> step</div>
          <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:14}}>
            After the forward pass, we check <strong style={{color:"var(--rose)"}}>how wrong</strong> the answer was (the loss). Then we flow <strong style={{color:"var(--rose)"}}>right to left</strong>, calculating how much each weight contributed to the error, and adjusting it slightly to do better next time.
          </p>
          <div className="callout callout-r" style={{marginTop:14}}>
            <strong>🎓 Real-life analogy:</strong> After marking the test, you go back through each question, figure out <em>exactly where</em> you went wrong, and study those specific parts harder.
          </div>
          <div style={{marginTop:14}}>
            <span className="tag tg-r">Output → Hidden → Input</span>
          </div>
        </div>
      </div>

      <div className="card s">
        <div className="card-title">🧠 The Big Picture — How a Network Learns</div>
        <div className="card-sub">Forward pass and backpropagation work together in a training loop, repeated thousands of times</div>
        <div style={{display:"flex",flexDirection:"column",gap:12,marginTop:8}}>
          {[
            {step:"①",color:"var(--sky)",label:"Forward Pass",desc:"Feed data through the network to get a prediction (ŷ)."},
            {step:"②",color:"var(--amber)",label:"Compute Loss",desc:"Measure the error: how far is ŷ from the correct answer y? (e.g. Loss = ½(ŷ − y)²)"},
            {step:"③",color:"var(--rose)",label:"Backpropagation",desc:"Calculate gradients — how much did each weight cause the error? (chain rule of calculus)"},
            {step:"④",color:"var(--emerald)",label:"Update Weights",desc:"Nudge every weight a tiny bit in the direction that reduces the loss. (gradient descent)"},
            {step:"↺",color:"var(--violet)",label:"Repeat",desc:"Do this for thousands of training examples, hundreds of epochs. The loss shrinks. The network learns!"},
          ].map(s=>(
            <div key={s.step} style={{display:"flex",gap:14,alignItems:"flex-start"}}>
              <div style={{width:34,height:34,borderRadius:"50%",background:`${s.color}20`,border:`1.5px solid ${s.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"JetBrains Mono",fontSize:14,fontWeight:700,color:s.color,flexShrink:0}}>{s.step}</div>
              <div>
                <div style={{fontWeight:700,color:"var(--text)",fontSize:14,marginBottom:3}}>{s.label}</div>
                <div style={{color:"var(--muted)",fontSize:13,lineHeight:1.6}}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="igrid">
        {[
          {ico:"🎯",title:"The Goal",body:"Minimize the Loss function — a score measuring how wrong predictions are. Smaller loss = better model."},
          {ico:"⛓️",title:"Chain Rule",body:"Backprop uses the calculus chain rule to compute how changing each weight affects the final loss."},
          {ico:"⚖️",title:"Weights & Biases",body:"These are the only things that change during training. Inputs are fixed data; architecture is fixed; only W and b are updated."},
          {ico:"📉",title:"Gradient Descent",body:"We always move weights downhill — in the direction that makes the loss smaller (negative gradient direction)."},
        ].map(b=>(
          <div key={b.ico} className="ibox">
            <div className="ibox-ico">{b.ico}</div>
            <div className="ibox-title">{b.title}</div>
            <div className="ibox-body">{b.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── WHY ── */
function WhyUse() {
  return (
    <div className="fade-up">
      <div className="sh">
        <div className="sh-badge">❓ SECTION 2</div>
        <h2>Why Do We Need These Algorithms?</h2>
        <p>Without forward pass and backpropagation, a neural network would be just a random tangle of numbers — incapable of learning anything. Here's why both are essential.</p>
      </div>

      <div className="card a">
        <div className="card-title">⚡ The Problem: Neural Networks Start Dumb</div>
        <div className="card-sub">When you first create a neural network, all weights are random. The predictions will be terrible — that's expected and totally okay.</div>
        <div className="two-col" style={{marginTop:16}}>
          <div>
            <p style={{color:"var(--muted)",fontSize:14,lineHeight:1.8,marginBottom:14}}>Imagine you want the network to recognize whether an email is spam. On day one:</p>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {[
                {c:"var(--rose)",t:"Random weights → nonsense predictions"},
                {c:"var(--rose)",t:"ŷ = 0.12 when the answer should be 1.0"},
                {c:"var(--rose)",t:"No way to know which weights are causing the error"},
              ].map((x,i)=>(
                <div key={i} style={{display:"flex",gap:10,alignItems:"center"}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:x.c,flexShrink:0}}/>
                  <span style={{color:"var(--muted)",fontSize:13}}>{x.t}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{color:"var(--muted)",fontSize:14,lineHeight:1.8,marginBottom:14}}>After 10,000 training steps using forward + backprop:</p>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {[
                {c:"var(--emerald)",t:"Weights tuned to detect spam patterns"},
                {c:"var(--emerald)",t:"ŷ = 0.97 for spam → correct!"},
                {c:"var(--emerald)",t:"Network learned from its own mistakes"},
              ].map((x,i)=>(
                <div key={i} style={{display:"flex",gap:10,alignItems:"center"}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:x.c,flexShrink:0}}/>
                  <span style={{color:"var(--muted)",fontSize:13}}>{x.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card e">
        <div className="card-title">🔜 Why Forward Pass?</div>
        <div className="card-sub">You can't evaluate a prediction you never made. Forward pass is how the network "thinks."</div>
        <div className="igrid">
          {[
            {ico:"📊",title:"Structured Computation",body:"Turns raw numbers (pixel values, features) into meaningful predictions by layering transformations."},
            {ico:"🔗",title:"Composable",body:"Each layer builds on the previous one. Simple operations (multiply, add, activate) stack into complex intelligence."},
            {ico:"🧪",title:"Both Train & Inference",body:"Used during training (to compute loss) AND when the model is deployed for real predictions."},
            {ico:"⚡",title:"Parallel & Fast",body:"Matrix multiplication is GPU-accelerated. Millions of forward passes can run in seconds on modern hardware."},
          ].map(b=>(
            <div key={b.ico} className="ibox">
              <div className="ibox-ico">{b.ico}</div>
              <div className="ibox-title">{b.title}</div>
              <div className="ibox-body">{b.body}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card r">
        <div className="card-title">🔙 Why Backpropagation?</div>
        <div className="card-sub">Before backprop was invented in 1986, neural networks couldn't be trained efficiently. Backprop made deep learning possible.</div>
        <div className="callout callout-a" style={{marginTop:8,marginBottom:16}}>
          <strong>Historical context:</strong> Geoffrey Hinton, Yann LeCun, and Yoshua Bengio won the 2018 Turing Award (the "Nobel Prize of Computer Science") largely because of their work on backpropagation. It unlocked all of modern AI!
        </div>
        <div className="igrid">
          {[
            {ico:"📏",title:"Efficient Credit Assignment",body:"A network might have millions of weights. Backprop pinpoints exactly how much each one is responsible for the error."},
            {ico:"⛓️",title:"Chain Rule Magic",body:"By applying the chain rule layer by layer, we reuse computations and avoid exponential blowup."},
            {ico:"🏔️",title:"Gradient Descent",body:"The computed gradients show which direction to move weights to slide down the loss landscape toward a minimum."},
            {ico:"🌐",title:"Scales to Any Depth",body:"Works for 2 layers or 200 layers. The same algorithm powers LeNet (1989) and GPT-4 (2023)."},
          ].map(b=>(
            <div key={b.ico} className="ibox">
              <div className="ibox-ico">{b.ico}</div>
              <div className="ibox-title">{b.title}</div>
              <div className="ibox-body">{b.body}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card s">
        <div className="card-title">🌍 Real-World Applications</div>
        <div className="igrid">
          {[
            {ico:"🎤",title:"Speech Recognition",body:"Siri/Google Assistant: backprop trained billions of weights to map sound waves to words."},
            {ico:"🖼️",title:"Image Generation",body:"DALL-E, Midjourney: forward+backward pass through diffusion models creates photorealistic images."},
            {ico:"💬",title:"ChatGPT / LLMs",body:"GPT models trained with backprop on trillions of tokens to predict the next word accurately."},
            {ico:"🚗",title:"Self-Driving Cars",body:"Tesla Autopilot uses CNNs trained with backprop to detect lanes, pedestrians, and obstacles."},
            {ico:"🏥",title:"Medical Diagnosis",body:"AlphaFold (protein structure), cancer detection in scans — all trained using these exact algorithms."},
            {ico:"♟️",title:"Game AI",body:"AlphaGo beat the world champion using policy networks trained with backpropagation."},
          ].map(b=>(
            <div key={b.ico} className="ibox">
              <div className="ibox-ico">{b.ico}</div>
              <div className="ibox-title">{b.title}</div>
              <div className="ibox-body">{b.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── FORWARD PASS ── */
function ForwardPassSection() {
  const [step, setStep] = useState(0);
  const [net] = useState(INIT_NET);
  const fwd = forwardPass(net);

  const steps = [
    {
      title:"The Network Setup",
      active_nodes:["x1","x2"],
      active_edges:[],
      content:(
        <div>
          <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14}}>
            Our example network has <strong style={{color:"var(--sky)"}}>2 input neurons</strong>, <strong style={{color:"var(--emerald)"}}>2 hidden neurons</strong>, and <strong style={{color:"var(--amber)"}}>1 output neuron</strong>. We'll predict whether something is "positive" (ŷ close to 1) or "negative" (ŷ close to 0).
          </p>
          <table className="vtable">
            <thead><tr><th>Variable</th><th>Value</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td className="hi">x₁</td><td>{net.x1}</td><td>First input feature</td></tr>
              <tr><td className="hi">x₂</td><td>{net.x2}</td><td>Second input feature</td></tr>
              <tr><td className="hs">Target y</td><td>{net.target}</td><td>Correct answer we want</td></tr>
              <tr><td className="ha">Learning rate α</td><td>{net.lr}</td><td>Step size for weight updates</td></tr>
            </tbody>
          </table>
          <div className="callout callout-s">
            <strong>👉 Click the nodes</strong> in the diagram to inspect their values. The input layer just passes data forward — no computation happens here.
          </div>
        </div>
      )
    },
    {
      title:"Weights & Biases",
      active_nodes:[],
      active_edges:["w₁₁","w₂₁","w₁₂","w₂₂"],
      content:(
        <div>
          <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14}}>
            Each connection between neurons has a <strong style={{color:"var(--emerald)"}}>weight</strong>. Each neuron in the hidden and output layers has a <strong style={{color:"var(--amber)"}}>bias</strong>. These are the <em>learnable parameters</em> — the only things that change during training.
          </p>
          <div className="two-col">
            <div>
              <div style={{fontFamily:"JetBrains Mono",fontSize:11,color:"var(--muted)",marginBottom:8,letterSpacing:1}}>HIDDEN LAYER WEIGHTS</div>
              <table className="vtable">
                <thead><tr><th>Weight</th><th>Value</th><th>Connects</th></tr></thead>
                <tbody>
                  {[["w₁₁",net.w11,"x₁ → H₁"],["w₂₁",net.w21,"x₂ → H₁"],["w₁₂",net.w12,"x₁ → H₂"],["w₂₂",net.w22,"x₂ → H₂"]].map(([k,v,c])=>(
                    <tr key={k}><td className="hi">{k}</td><td>{v}</td><td style={{color:"var(--muted)"}}>{c}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <div style={{fontFamily:"JetBrains Mono",fontSize:11,color:"var(--muted)",marginBottom:8,letterSpacing:1}}>BIASES & OUTPUT WEIGHTS</div>
              <table className="vtable">
                <thead><tr><th>Param</th><th>Value</th><th>Role</th></tr></thead>
                <tbody>
                  {[["b₁",net.b1,"H₁ bias"],["b₂",net.b2,"H₂ bias"],["v₁",net.v1,"H₁ → ŷ"],["v₂",net.v2,"H₂ → ŷ"],["bₒ",net.bo,"Output bias"]].map(([k,v,c])=>(
                    <tr key={k}><td className="ha">{k}</td><td>{v}</td><td style={{color:"var(--muted)"}}>{c}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="callout callout-e">
            <strong>Key insight:</strong> A <strong>weight</strong> says "how much does this input matter?" A <strong>bias</strong> shifts the activation threshold — it lets the neuron fire even when all inputs are zero.
          </div>
        </div>
      )
    },
    {
      title:"Hidden Layer Pre-activation (z)",
      active_nodes:["h1","h2"],
      active_edges:["w₁₁","w₂₁","w₁₂","w₂₂"],
      content:(
        <div>
          <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14}}>
            First we compute the <strong style={{color:"var(--emerald)"}}>pre-activation</strong> (also called "logit" or "net input") for each hidden neuron. This is a <strong>weighted sum</strong> of all inputs plus the bias.
          </p>
          <div className="formula">
            <span className="fc"># For hidden neuron H₁:</span>{"\n"}
            z₁ = <span className="fa">w₁₁</span> × x₁ + <span className="fa">w₂₁</span> × x₂ + b₁{"\n"}
            z₁ = {net.w11} × {net.x1} + {net.w21} × {net.x2} + {net.b1}{"\n"}
            z₁ = {r(net.w11*net.x1)} + {r(net.w21*net.x2)} + {net.b1} = <span className="hi">{r(fwd.z1)}</span>{"\n\n"}
            <span className="fc"># For hidden neuron H₂:</span>{"\n"}
            z₂ = <span className="fa">w₁₂</span> × x₁ + <span className="fa">w₂₂</span> × x₂ + b₂{"\n"}
            z₂ = {net.w12} × {net.x1} + {net.w22} × {net.x2} + {net.b2}{"\n"}
            z₂ = <span className="hi">{r(fwd.z2)}</span>
          </div>
          <div className="callout callout-a">
            <strong>Why weighted sum?</strong> It's like a <em>voting system</em>. Each input "votes" with a strength equal to its weight. A positive weight amplifies the signal; a negative weight suppresses it. The bias is like a base vote that always counts.
          </div>
        </div>
      )
    },
    {
      title:"Activation Function (sigmoid_bt)",
      active_nodes:["h1","h2"],
      active_edges:[],
      content:(
        <div>
          <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14}}>
            The pre-activation z can be any number (positive, negative, huge). We squash it through an <strong style={{color:"var(--violet)"}}>activation function</strong> to make it useful. We use <strong style={{color:"var(--violet)"}}>Sigmoid</strong>: it outputs between 0 and 1.
          </p>
          <div className="formula">
            <span className="fc"># Sigmoid function:</span>{"\n"}
            σ(z) = <span className="fv">1 / (1 + e^(−z))</span>{"\n\n"}
            <span className="fc"># Apply to hidden neurons:</span>{"\n"}
            h₁ = σ(z₁) = σ({r(fwd.z1)}) = <span className="hi">{r(fwd.h1)}</span>{"\n"}
            h₂ = σ(z₂) = σ({r(fwd.z2)}) = <span className="hi">{r(fwd.h2)}</span>
          </div>
          <div style={{display:"flex",gap:16,flexWrap:"wrap",marginTop:8}}>
            {[
              {z:"−5",out:"≈0.007",desc:"Very negative → near 0"},
              {z:"0",out:"0.5",desc:"Zero → exactly 0.5"},
              {z:"2",out:"≈0.88",desc:"Positive → near 1"},
              {z:"z₁="+r(fwd.z1),out:r(fwd.h1),desc:"Our H₁",hi:true},
            ].map(x=>(
              <div key={x.z} style={{textAlign:"center",padding:"10px 14px",borderRadius:10,background:x.hi?"rgba(16,217,160,.1)":"var(--bg3)",border:`1px solid ${x.hi?"var(--emerald)":"var(--border)"}`}}>
                <div style={{fontFamily:"JetBrains Mono",fontSize:12,color:"var(--muted)"}}>z = {x.z}</div>
                <div style={{fontFamily:"JetBrains Mono",fontSize:18,fontWeight:700,color:x.hi?"var(--emerald)":"var(--amber)",margin:"4px 0"}}>→ {x.out}</div>
                <div style={{fontSize:11,color:"var(--muted2)"}}>{x.desc}</div>
              </div>
            ))}
          </div>
          <div className="callout callout-v" style={{marginTop:14}}>
            <strong>Why activation functions?</strong> Without them, stacking layers is just one big linear equation — useless. Sigmoid, ReLU, Tanh — these introduce non-linearity that lets networks learn ANY pattern.
          </div>
        </div>
      )
    },
    {
      title:"Output Layer Computation",
      active_nodes:["o1"],
      active_edges:["v₁","v₂"],
      content:(
        <div>
          <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14}}>
            The hidden layer outputs (h₁, h₂) become the inputs to the output layer. We do the same weighted sum + bias + activation. The result <strong style={{color:"var(--amber)"}}>ŷ</strong> is the network's final prediction.
          </p>
          <div className="formula">
            <span className="fc"># Output pre-activation:</span>{"\n"}
            zₒ = <span className="fa">v₁</span> × h₁ + <span className="fa">v₂</span> × h₂ + bₒ{"\n"}
            zₒ = {net.v1} × {r(fwd.h1)} + {net.v2} × {r(fwd.h2)} + {net.bo}{"\n"}
            zₒ = {r(net.v1*fwd.h1)} + {r(net.v2*fwd.h2)} + {net.bo} = <span className="hi">{r(fwd.zo)}</span>{"\n\n"}
            <span className="fc"># Final prediction (sigmoid_bt again):</span>{"\n"}
            ŷ = σ(zₒ) = σ({r(fwd.zo)}) = <span className="fa">{r(fwd.yhat)}</span>{"\n\n"}
            <span className="fc"># Loss (Mean Squared Error / 2):</span>{"\n"}
            L = ½(ŷ − y)² = ½({r(fwd.yhat)} − {net.target})² = <span className="fr">{r(0.5*Math.pow(fwd.yhat-net.target,2))}</span>
          </div>
          <div className="callout callout-a">
            <strong>Forward pass complete! 🎉</strong> We have our prediction ŷ = <strong>{r(fwd.yhat)}</strong>. The target is {net.target}. Loss = {r(0.5*Math.pow(fwd.yhat-net.target,2))}. Not great — but that's what backpropagation will fix!
          </div>
        </div>
      )
    },
  ];

  const [selectedNode, setSelectedNode] = useState(null);
  const nodeInfo = {
    x1: {name:"Input x₁",val:net.x1,desc:"Raw input feature. No computation — just passes the value forward."},
    x2: {name:"Input x₂",val:net.x2,desc:"Raw input feature. No computation — just passes the value forward."},
    h1: {name:"Hidden H₁",val:r(fwd.h1),desc:`Pre-activation z₁=${r(fwd.z1)}, then σ(z₁) = ${r(fwd.h1)}. This neuron learned to detect pattern A.`},
    h2: {name:"Hidden H₂",val:r(fwd.h2),desc:`Pre-activation z₂=${r(fwd.z2)}, then σ(z₂) = ${r(fwd.h2)}. This neuron learned to detect pattern B.`},
    o1: {name:"Output ŷ",val:r(fwd.yhat),desc:`Final prediction. zₒ=${r(fwd.zo)}, ŷ=σ(zₒ)=${r(fwd.yhat)}. Target was ${net.target}.`},
  };

  return (
    <div className="fade-up">
      <div className="sh">
        <div className="sh-badge">🔜 SECTION 3</div>
        <h2>Forward Pass — Step by Step</h2>
        <p>Walk through each stage of the forward pass on a real 2→2→1 neural network. Click nodes to inspect values.</p>
      </div>

      <div className="step-nav">
        {steps.map((s,i)=>(
          <button key={i} className={`step-btn ${step===i?"active":""}`} onClick={()=>{setStep(i);setSelectedNode(null)}}>
            <span className="sn">0{i+1}</span>{s.title.split(" ").slice(0,2).join(" ")}
          </button>
        ))}
      </div>
      <div className="prog-wrap"><div className="prog" style={{width:`${((step+1)/steps.length)*100}%`}}/></div>

      <div className="net-wrap" style={{marginBottom:20}}>
        <NetDiagram mode="forward" activeEdges={steps[step].active_edges} activeNodes={steps[step].active_nodes} fwd={fwd} net={net} onNodeClick={id=>{setSelectedNode(id)}}/>
      </div>

      {selectedNode && nodeInfo[selectedNode] && (
        <div className="nd fade-up">
          <h3>🔍 {nodeInfo[selectedNode].name} — value: {nodeInfo[selectedNode].val}</h3>
          <p>{nodeInfo[selectedNode].desc}</p>
        </div>
      )}

      <div className="card e">
        <div className="card-title">{steps[step].title}</div>
        {steps[step].content}
        <div style={{display:"flex",justifyContent:"space-between",marginTop:20,gap:10}}>
          <button className="btn btn-out" onClick={()=>setStep(Math.max(0,step-1))} disabled={step===0}>← Previous</button>
          <button className="btn btn-e" onClick={()=>setStep(Math.min(steps.length-1,step+1))} disabled={step===steps.length-1}>Next Step →</button>
        </div>
      </div>
    </div>
  );
}

/* ── BACKPROPAGATION ── */
function BackpropSection() {
  const [step, setStep] = useState(0);
  const [net] = useState(INIT_NET);
  const fwd = forwardPass(net);
  const grads = backwardPass(net, fwd);

  const steps = [
    {
      title:"Compute the Loss",
      active_nodes:["o1"],
      active_edges:[],
      content:(
        <div>
          <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14}}>
            Before going backward, we need to know <strong style={{color:"var(--rose)"}}>how wrong</strong> we were. The <strong>loss function</strong> quantifies this. We use <strong>Mean Squared Error (÷2)</strong> for simplicity:
          </p>
          <div className="formula">
            <span className="fc"># Loss function (MSE/2 for clean derivatives):</span>{"\n"}
            L = ½(ŷ − y)²{"\n"}
            L = ½({r(fwd.yhat)} − {net.target})²{"\n"}
            L = ½({r(fwd.yhat-net.target)})²{"\n"}
            L = <span className="fr">{r(grads.loss)}</span>{"\n\n"}
            <span className="fc"># Derivative of loss with respect to ŷ:</span>{"\n"}
            ∂L/∂ŷ = ŷ − y = {r(fwd.yhat)} − {net.target} = <span className="fr">{r(grads.dL_dyhat)}</span>
          </div>
          <div className="callout callout-r">
            <strong>Loss = {r(grads.loss)}</strong>. The gradient ∂L/∂ŷ = <strong>{r(grads.dL_dyhat)}</strong> tells us: "the output is {r(grads.dL_dyhat)} too high." We'll use this to push all weights in the right direction.
          </div>
        </div>
      )
    },
    {
      title:"Backprop Through Output Layer",
      active_nodes:["o1"],
      active_edges:["v₁","v₂"],
      content:(
        <div>
          <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14}}>
            We use the <strong style={{color:"var(--rose)"}}>chain rule</strong> to find how much the output weights (v₁, v₂) caused the loss. The chain rule says: to differentiate a composition of functions, multiply the derivatives step by step.
          </p>
          <div className="formula">
            <span className="fc"># Sigmoid derivative: σ'(z) = σ(z)(1 − σ(z))</span>{"\n"}
            σ'(zₒ) = {r(fwd.yhat)} × (1 − {r(fwd.yhat)}) = <span className="fs">{r(sigmoidDeriv(fwd.zo))}</span>{"\n\n"}
            <span className="fc"># Gradient for output pre-activation (chain rule):</span>{"\n"}
            ∂L/∂zₒ = ∂L/∂ŷ × σ'(zₒ){"\n"}
            ∂L/∂zₒ = {r(grads.dL_dyhat)} × {r(sigmoidDeriv(fwd.zo))} = <span className="fr">{r(grads.dL_dzo)}</span>{"\n\n"}
            <span className="fc"># Gradients for output weights:</span>{"\n"}
            ∂L/∂v₁ = ∂L/∂zₒ × h₁ = {r(grads.dL_dzo)} × {r(fwd.h1)} = <span className="fa">{r(grads.dL_dv1)}</span>{"\n"}
            ∂L/∂v₂ = ∂L/∂zₒ × h₂ = {r(grads.dL_dzo)} × {r(fwd.h2)} = <span className="fa">{r(grads.dL_dv2)}</span>{"\n"}
            ∂L/∂bₒ = ∂L/∂zₒ = <span className="fa">{r(grads.dL_dbo)}</span>
          </div>
          <div className="callout callout-a">
            <strong>Chain rule in action:</strong> ∂L/∂v₁ = (∂L/∂ŷ) × (∂ŷ/∂zₒ) × (∂zₒ/∂v₁). We multiply three derivatives together, each from one "link" in the chain.
          </div>
        </div>
      )
    },
    {
      title:"Backprop Through Hidden Layer",
      active_nodes:["h1","h2"],
      active_edges:["w₁₁","w₂₁","w₁₂","w₂₂"],
      content:(
        <div>
          <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14}}>
            Now we push the error gradient further back — through the hidden neurons. This is where the "magic" of backpropagation really shows: each hidden neuron gets its share of the blame.
          </p>
          <div className="formula">
            <span className="fc"># Gradient reaching each hidden neuron's output:</span>{"\n"}
            ∂L/∂h₁ = ∂L/∂zₒ × v₁ = {r(grads.dL_dzo)} × {net.v1} = <span className="fs">{r(grads.dL_dh1)}</span>{"\n"}
            ∂L/∂h₂ = ∂L/∂zₒ × v₂ = {r(grads.dL_dzo)} × {net.v2} = <span className="fs">{r(grads.dL_dh2)}</span>{"\n\n"}
            <span className="fc"># Through sigmoid_bt activation in hidden layer:</span>{"\n"}
            σ'(z₁) = {r(fwd.h1)} × (1−{r(fwd.h1)}) = <span className="fv">{r(sigmoidDeriv(fwd.z1))}</span>{"\n"}
            ∂L/∂z₁ = ∂L/∂h₁ × σ'(z₁) = {r(grads.dL_dh1)} × {r(sigmoidDeriv(fwd.z1))} = <span className="fr">{r(grads.dL_dz1)}</span>{"\n\n"}
            σ'(z₂) = <span className="fv">{r(sigmoidDeriv(fwd.z2))}</span>{"\n"}
            ∂L/∂z₂ = ∂L/∂h₂ × σ'(z₂) = <span className="fr">{r(grads.dL_dz2)}</span>
          </div>
          <div className="formula">
            <span className="fc"># Gradients for hidden weights (chain rule continued):</span>{"\n"}
            ∂L/∂w₁₁ = ∂L/∂z₁ × x₁ = {r(grads.dL_dz1)} × {net.x1} = <span className="fa">{r(grads.dL_dw11)}</span>{"\n"}
            ∂L/∂w₂₁ = ∂L/∂z₁ × x₂ = {r(grads.dL_dz1)} × {net.x2} = <span className="fa">{r(grads.dL_dw21)}</span>{"\n"}
            ∂L/∂w₁₂ = ∂L/∂z₂ × x₁ = <span className="fa">{r(grads.dL_dw12)}</span>{"\n"}
            ∂L/∂w₂₂ = ∂L/∂z₂ × x₂ = <span className="fa">{r(grads.dL_dw22)}</span>
          </div>
        </div>
      )
    },
    {
      title:"Update All Weights",
      active_nodes:["h1","h2","o1"],
      active_edges:["w₁₁","w₂₁","w₁₂","w₂₂","v₁","v₂"],
      content:(
        <div>
          <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14}}>
            Now we apply <strong style={{color:"var(--emerald)"}}>gradient descent</strong>: subtract a fraction (learning rate α = {net.lr}) of each gradient from the corresponding weight. This nudges weights to reduce the loss.
          </p>
          <div className="formula">
            <span className="fc"># Gradient descent update rule:</span>{"\n"}
            w_new = w_old − α × ∂L/∂w{"\n\n"}
            <span className="fc"># Updated hidden weights:</span>{"\n"}
            w₁₁ = {net.w11} − {net.lr}×{r(grads.dL_dw11)} = <span className="hi">{r(net.w11 - net.lr*grads.dL_dw11)}</span>{"\n"}
            w₂₁ = {net.w21} − {net.lr}×{r(grads.dL_dw21)} = <span className="hi">{r(net.w21 - net.lr*grads.dL_dw21)}</span>{"\n"}
            w₁₂ = {net.w12} − {net.lr}×{r(grads.dL_dw12)} = <span className="hi">{r(net.w12 - net.lr*grads.dL_dw12)}</span>{"\n"}
            w₂₂ = {net.w22} − {net.lr}×{r(grads.dL_dw22)} = <span className="hi">{r(net.w22 - net.lr*grads.dL_dw22)}</span>{"\n\n"}
            <span className="fc"># Updated output weights:</span>{"\n"}
            v₁ = {net.v1} − {net.lr}×{r(grads.dL_dv1)} = <span className="hi">{r(net.v1 - net.lr*grads.dL_dv1)}</span>{"\n"}
            v₂ = {net.v2} − {net.lr}×{r(grads.dL_dv2)} = <span className="hi">{r(net.v2 - net.lr*grads.dL_dv2)}</span>
          </div>
          <div className="callout callout-e">
            <strong>✅ One complete training step done!</strong> After updating: if we run forward pass again with these new weights, the loss will be smaller. Repeat this 10,000 times and the network learns!
          </div>
        </div>
      )
    },
  ];

  return (
    <div className="fade-up">
      <div className="sh">
        <div className="sh-badge">🔙 SECTION 4</div>
        <h2>Backpropagation — Step by Step</h2>
        <p>The red flow shows gradients traveling <em>backward</em> through the network. Each step uses the chain rule to assign blame to each weight.</p>
      </div>

      <div className="step-nav">
        {steps.map((s,i)=>(
          <button key={i} className={`step-btn ${step===i?"active":""}`} onClick={()=>setStep(i)}>
            <span className="sn">0{i+1}</span>{s.title.split(" ").slice(0,2).join(" ")}
          </button>
        ))}
      </div>
      <div className="prog-wrap"><div className="prog" style={{width:`${((step+1)/steps.length)*100}%`,background:"linear-gradient(90deg,var(--rose),var(--amber))"}}/></div>

      <div className="net-wrap" style={{marginBottom:20}}>
        <NetDiagram mode="backward" activeEdges={steps[step].active_edges} activeNodes={steps[step].active_nodes} fwd={fwd} net={net}/>
      </div>

      <div className="card r">
        <div className="card-title">{steps[step].title}</div>
        {steps[step].content}
        <div style={{display:"flex",justifyContent:"space-between",marginTop:20,gap:10}}>
          <button className="btn btn-out" onClick={()=>setStep(Math.max(0,step-1))} disabled={step===0}>← Previous</button>
          <button className="btn btn-a" onClick={()=>setStep(Math.min(steps.length-1,step+1))} disabled={step===steps.length-1}>Next Step →</button>
        </div>
      </div>
    </div>
  );
}

/* ── LAYERS DEEP DIVE ── */
function LayersSection() {
  const [active,setActive] = useState("weight");

  const panels = {
    weight:{
      color:"var(--emerald)",label:"⚖️ Weights",
      content:(
        <div>
          <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14}}>
            <strong style={{color:"var(--emerald)"}}>Weights (W)</strong> are numbers assigned to every connection between neurons. They determine how much influence one neuron has on the next. Think of them as the "volume knobs" of the network.
          </p>
          <div className="formula">
            <span className="fc"># Weight impact on output:</span>{"\n"}
            contribution = weight × input{"\n\n"}
            <span className="fc"># High positive weight (+2.0):</span>{"\n"}
            output += 2.0 × 0.8 = <span className="hi">+1.6</span>  <span className="fc">← amplifies the input</span>{"\n\n"}
            <span className="fc"># High negative weight (−1.5):</span>{"\n"}
            output += −1.5 × 0.8 = <span className="fr">−1.2</span>  <span className="fc">← suppresses/inverts</span>{"\n\n"}
            <span className="fc"># Near-zero weight (0.01):</span>{"\n"}
            output += 0.01 × 0.8 = <span className="fs">+0.008</span> <span className="fc">← almost ignores</span>
          </div>
          <div className="igrid">
            {[
              {ico:"📏",title:"Range",body:"Can be any real number. Usually initialized to small random values (e.g. −0.1 to +0.1)."},
              {ico:"📈",title:"Learning",body:"Changed by gradient descent during backprop. The gradient ∂L/∂w tells us which direction to nudge."},
              {ico:"🔢",title:"Count",body:"A 2-2-1 network has (2×2)+(2×1) = 6 weights. GPT-4 has ~1.8 trillion!"},
              {ico:"🎯",title:"Role",body:"Encode the 'knowledge' the network has learned — patterns, features, relationships in the data."},
            ].map(b=>(
              <div key={b.ico} className="ibox">
                <div className="ibox-ico">{b.ico}</div>
                <div className="ibox-title">{b.title}</div>
                <div className="ibox-body">{b.body}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    bias:{
      color:"var(--amber)",label:"⬛ Biases",
      content:(
        <div>
          <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14}}>
            <strong style={{color:"var(--amber)"}}>Bias (b)</strong> is an extra learnable value added to the pre-activation. It's like an intercept in linear regression — it lets the neuron shift its "decision boundary" independently of the inputs.
          </p>
          <div className="formula">
            <span className="fc"># Without bias:</span>{"\n"}
            z = w₁×x₁ + w₂×x₂{"\n"}
            <span className="fc"># When x₁=x₂=0: z must be 0. Neuron can't fire!</span>{"\n\n"}
            <span className="fc"># With bias:</span>{"\n"}
            z = w₁×x₁ + w₂×x₂ + b{"\n"}
            <span className="fc"># When x₁=x₂=0: z = b. Neuron CAN fire if b &gt; 0!</span>{"\n\n"}
            <span className="fc"># Bias shifts the activation threshold:</span>{"\n"}
            σ(b=−3) → fires only for large inputs{"\n"}
            σ(b=0)  → fires at z=0{"\n"}
            σ(b=+3) → fires even for small inputs
          </div>
          <div className="callout callout-a">
            <strong>🎓 Analogy:</strong> Imagine a smoke alarm. The <em>weight</em> controls how sensitive it is to smoke (gain). The <em>bias</em> controls the baseline threshold — maybe it takes a lot of smoke to trigger (negative bias) or very little (positive bias).
          </div>
        </div>
      )
    },
    activation:{
      color:"var(--violet)",label:"⚡ Activations",
      content:(
        <div>
          <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14}}>
            <strong style={{color:"var(--violet)"}}>Activation functions</strong> are applied after the weighted sum. Without them, stacking layers would collapse into one linear layer — useless. They introduce non-linearity so networks can learn ANY pattern.
          </p>
          <div className="two-col">
            {[
              {name:"Sigmoid σ(z)",formula:"1 / (1 + e^(−z))",range:"(0, 1)",use:"Output layer for binary classification, hidden layers",deriv:"σ(z)(1−σ(z))",color:"var(--emerald)"},
              {name:"ReLU max(0,z)",formula:"z if z>0, else 0",range:"[0, ∞)",use:"Most common hidden layer activation. Fast and avoids vanishing gradient.",deriv:"1 if z>0, else 0",color:"var(--sky)"},
              {name:"Tanh tanh(z)",formula:"(e^z − e^(−z)) / (e^z + e^(−z))",range:"(−1, 1)",use:"Hidden layers where negative output is meaningful.",deriv:"1 − tanh(z)²",color:"var(--amber)"},
              {name:"Softmax",formula:"e^(zᵢ) / Σe^(zⱼ)",range:"(0,1), sum=1",use:"Multi-class output layer. Converts logits to probabilities.",deriv:"softmax × (1−softmax)",color:"var(--rose)"},
            ].map(a=>(
              <div key={a.name} className="card" style={{marginBottom:0,padding:18,borderColor:a.color+"44",background:`${a.color}08`}}>
                <div style={{fontFamily:"JetBrains Mono",fontSize:14,fontWeight:700,color:a.color,marginBottom:6}}>{a.name}</div>
                <div className="formula" style={{margin:"8px 0",fontSize:12,padding:"8px 14px",borderLeftColor:a.color}}>
                  f(z) = {a.formula}{"\n"}Range: {a.range}{"\n"}f'(z) = {a.deriv}
                </div>
                <div style={{fontSize:12,color:"var(--muted)",lineHeight:1.6}}>✅ Use when: {a.use}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    hidden:{
      color:"var(--sky)",label:"🧠 Hidden Layers",
      content:(
        <div>
          <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14}}>
            <strong style={{color:"var(--sky)"}}>Hidden layers</strong> are the "processing" layers between input and output. They transform input features into increasingly abstract representations. The deeper the network, the more complex patterns it can learn.
          </p>
          <div className="callout callout-s" style={{marginBottom:14}}>
            <strong>In our example:</strong> The 2 hidden neurons each combine {"{x₁, x₂}"} with different weights, learning different "views" of the data. H₁ might learn "is this positive?", H₂ might learn "is this large?". The output layer combines both signals.
          </div>
          <table className="vtable">
            <thead><tr><th>Input</th><th>Processing (Hidden)</th><th>Output</th></tr></thead>
            <tbody>
              <tr>
                <td style={{color:"var(--sky)"}}>Raw pixels</td>
                <td style={{color:"var(--emerald)"}}>Edges → Shapes → Parts → Objects</td>
                <td style={{color:"var(--amber)"}}>Cat / Dog / Bird</td>
              </tr>
              <tr>
                <td style={{color:"var(--sky)"}}>Stock prices</td>
                <td style={{color:"var(--emerald)"}}>Trends → Patterns → Indicators</td>
                <td style={{color:"var(--amber)"}}>Buy / Sell / Hold</td>
              </tr>
              <tr>
                <td style={{color:"var(--sky)"}}>Word tokens</td>
                <td style={{color:"var(--emerald)"}}>Syntax → Semantics → Context</td>
                <td style={{color:"var(--amber)"}}>Next word</td>
              </tr>
            </tbody>
          </table>
          <div className="igrid" style={{marginTop:14}}>
            {[
              {ico:"📐",title:"Width",body:"Number of neurons per layer. More neurons = more capacity but more computation."},
              {ico:"🏗️",title:"Depth",body:"Number of hidden layers. GPT-4 has 96 transformer 'layers'. More depth = more abstraction."},
              {ico:"↔️",title:"Information Flow",body:"During forward pass: left to right. During backprop: right to left. Each layer sees gradients from all layers ahead of it."},
              {ico:"🎭",title:"Feature Learning",body:"Hidden neurons learn to detect task-specific patterns automatically from data — no manual feature engineering needed!"},
            ].map(b=>(
              <div key={b.ico} className="ibox">
                <div className="ibox-ico">{b.ico}</div>
                <div className="ibox-title">{b.title}</div>
                <div className="ibox-body">{b.body}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
  };

  return (
    <div className="fade-up">
      <div className="sh">
        <div className="sh-badge">🧩 SECTION 5</div>
        <h2>Weights, Biases, Activations & Hidden Layers</h2>
        <p>Click each component to understand its role in the network — with real math from our example.</p>
      </div>

      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
        {Object.entries(panels).map(([k,p])=>(
          <button key={k} className="btn" onClick={()=>setActive(k)}
            style={{background:active===k?p.color+"22":"var(--bg3)",border:`1.5px solid ${active===k?p.color:"var(--border)"}`,color:active===k?p.color:"var(--muted)"}}>
            {p.label}
          </button>
        ))}
      </div>

      <div className="card e fade-up" style={{borderTopColor:panels[active].color}} key={active}>
        <div className="card-title" style={{color:panels[active].color}}>{panels[active].label}</div>
        {panels[active].content}
      </div>
    </div>
  );
}

/* ── LIVE TRAINER ── */
function LiveTrainer() {
  const [net, setNet] = useState({...INIT_NET});
  const [history, setHistory] = useState([]);
  const [epoch, setEpoch] = useState(0);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(200);
  const intRef = useRef(null);

  const step = useCallback(() => {
    setNet(prev => {
      const fwd = forwardPass(prev);
      const grads = backwardPass(prev, fwd);
      const next = updateWeights(prev, grads);
      setHistory(h => {
        const newH = [...h, {epoch:h.length+1, loss:r(grads.loss), yhat:r(fwd.yhat)}];
        return newH.slice(-50);
      });
      setEpoch(e => e+1);
      return next;
    });
  }, []);

  useEffect(() => {
    if (running) {
      intRef.current = setInterval(step, speed);
    } else {
      clearInterval(intRef.current);
    }
    return () => clearInterval(intRef.current);
  }, [running, speed, step]);

  const reset = () => {
    setRunning(false);
    setNet({...INIT_NET});
    setHistory([]);
    setEpoch(0);
  };

  const fwd = forwardPass(net);
  const grads = backwardPass(net, fwd);
  const currentLoss = r(grads.loss);

  // Mini loss chart
  const chartH = 80, chartW = 340;
  const maxLoss = Math.max(...history.map(h=>h.loss), 0.15);
  const points = history.map((h,i) => {
    const x = (i/Math.max(history.length-1,1))*chartW;
    const y = chartH - (h.loss/maxLoss)*chartH;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="fade-up">
      <div className="sh">
        <div className="sh-badge">⚡ SECTION 6</div>
        <h2>Live Training — Watch the Network Learn</h2>
        <p>Press <strong>Run</strong> to watch forward pass + backpropagation happen in real time. The loss should decrease as the network improves its prediction!</p>
      </div>

      <div className="two-col">
        <div className="card e">
          <div className="card-title">🎮 Training Controls</div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:18}}>
            <button className="btn btn-e" onClick={()=>setRunning(r=>!r)}>
              {running ? "⏸ Pause" : "▶ Run Training"}
            </button>
            <button className="btn btn-s" onClick={step} disabled={running}>⏭ Step Once</button>
            <button className="btn btn-out" onClick={reset}>↺ Reset</button>
          </div>
          <div className="slider-wrap">
            <div className="slider-label"><span>Speed</span><span>{speed}ms/step</span></div>
            <input type="range" min="50" max="800" step="50" value={speed} onChange={e=>setSpeed(+e.target.value)}/>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--muted2)"}}>
              <span>Fast</span><span>Slow</span>
            </div>
          </div>
          <div style={{marginTop:14}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
              <div style={{textAlign:"center"}}>
                <div style={{fontFamily:"JetBrains Mono",fontSize:11,color:"var(--muted)"}}>EPOCH</div>
                <div style={{fontFamily:"JetBrains Mono",fontSize:28,fontWeight:700,color:"var(--sky)"}}>{epoch}</div>
              </div>
              <div style={{textAlign:"center"}}>
                <div style={{fontFamily:"JetBrains Mono",fontSize:11,color:"var(--muted)"}}>PREDICTION ŷ</div>
                <div style={{fontFamily:"JetBrains Mono",fontSize:28,fontWeight:700,color:"var(--amber)"}}>{r(fwd.yhat)}</div>
              </div>
              <div style={{textAlign:"center"}}>
                <div style={{fontFamily:"JetBrains Mono",fontSize:11,color:"var(--muted)"}}>LOSS</div>
                <div style={{fontFamily:"JetBrains Mono",fontSize:28,fontWeight:700,color:currentLoss<0.01?"var(--emerald)":"var(--rose)"}}>{currentLoss}</div>
              </div>
            </div>
            <div style={{fontFamily:"JetBrains Mono",fontSize:11,color:"var(--muted)",marginBottom:4}}>PROGRESS TO TARGET (y=1.0)</div>
            <div className="prog-wrap">
              <div className="prog" style={{width:`${Math.min(100,r(fwd.yhat)*100)}%`}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,fontFamily:"JetBrains Mono",color:"var(--muted2)"}}>
              <span>ŷ=0</span><span>TARGET: ŷ=1.0</span>
            </div>
          </div>
        </div>

        <div className="card s">
          <div className="card-title">📉 Loss Curve</div>
          <div style={{background:"var(--bg)",borderRadius:10,padding:12,marginBottom:12}}>
            {history.length > 1 ? (
              <svg viewBox={`0 0 ${chartW} ${chartH}`} width="100%" style={{display:"block"}}>
                <defs>
                  <linearGradient id="lossGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--emerald)" stopOpacity=".6"/>
                    <stop offset="100%" stopColor="var(--emerald)" stopOpacity=".05"/>
                  </linearGradient>
                </defs>
                <polyline points={points} fill="none" stroke="var(--emerald)" strokeWidth="2" strokeLinecap="round"/>
                <polygon points={`0,${chartH} ${points} ${chartW},${chartH}`} fill="url(#lossGrad)"/>
                <text x="4" y="12" fontFamily="JetBrains Mono" fontSize="8" fill="#4a7a95">Loss</text>
                <text x={chartW-50} y={chartH-4} fontFamily="JetBrains Mono" fontSize="8" fill="#4a7a95">Epoch {epoch}</text>
              </svg>
            ) : (
              <div style={{height:80,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--muted2)",fontFamily:"JetBrains Mono",fontSize:12}}>
                Run training to see the loss curve
              </div>
            )}
          </div>
          <div style={{fontFamily:"JetBrains Mono",fontSize:11,color:"var(--muted)",marginBottom:8}}>CURRENT WEIGHTS</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
            {[["w₁₁",net.w11,"e"],["w₂₁",net.w21,"e"],["w₁₂",net.w12,"e"],["w₂₂",net.w22,"e"],["v₁",net.v1,"a"],["v₂",net.v2,"a"],["b₁",net.b1,"s"],["b₂",net.b2,"s"]].map(([k,v,c])=>(
              <div key={k} style={{background:"var(--bg3)",borderRadius:6,padding:"5px 10px",display:"flex",justifyContent:"space-between",fontFamily:"JetBrains Mono",fontSize:11}}>
                <span style={{color:`var(--${c==="e"?"emerald":c==="a"?"amber":"sky"})`}}>{k}</span>
                <span style={{color:"var(--muted)"}}>{r(v)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card a">
        <div className="card-title">📊 Training Log (last 10 steps)</div>
        <div style={{overflowX:"auto"}}>
          <table className="vtable">
            <thead><tr><th>Epoch</th><th>Prediction ŷ</th><th>Loss</th><th>Distance to Target</th></tr></thead>
            <tbody>
              {history.slice(-10).map((h,i)=>(
                <tr key={i}>
                  <td className="hs">{h.epoch}</td>
                  <td className="ha">{h.yhat}</td>
                  <td className={h.loss < 0.01 ? "hi" : h.loss < 0.05 ? "ha" : "hr"}>{h.loss}</td>
                  <td style={{color:"var(--muted)"}}>{r(Math.abs(h.yhat - 1.0))}</td>
                </tr>
              ))}
              {history.length === 0 && (
                <tr><td colSpan={4} style={{textAlign:"center",color:"var(--muted2)",fontSize:12}}>No training steps yet — press Run!</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── QUIZ ── */
function QuizSection() {
  const [qIdx, setQIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const questions = [
    {
      q:"In the forward pass of a neural network, in which direction does information flow?",
      opts:["Output layer to input layer","Input layer to output layer","Randomly between layers","Both directions simultaneously"],
      correct:1,
      explain:"✅ Correct! Forward pass flows LEFT to RIGHT — input → hidden → output. This is how the network makes its prediction.",
    },
    {
      q:"What does backpropagation compute?",
      opts:["The network's final prediction","The gradients showing how much each weight contributed to the error","The new training data","The number of hidden layers needed"],
      correct:1,
      explain:"✅ Exactly! Backprop computes ∂L/∂w for every weight — how much each weight is 'to blame' for the error. This enables gradient descent.",
    },
    {
      q:"What is the purpose of an activation function like ReLU or Sigmoid?",
      opts:["To slow down training","To initialize weights randomly","To add non-linearity so the network can learn complex patterns","To count the number of neurons"],
      correct:2,
      explain:"✅ Right! Without activation functions, stacking layers = one linear function = can't learn complex patterns. Sigmoid/ReLU add the non-linearity needed.",
    },
    {
      q:"In gradient descent, which direction do we move the weights?",
      opts:["In the direction of the gradient (uphill)","In the direction opposite to the gradient (downhill)","In a random direction","We don't move weights — only biases change"],
      correct:1,
      explain:"✅ Perfect! We subtract the gradient: w = w − α × ∂L/∂w. Subtracting means moving downhill — toward the loss minimum.",
    },
    {
      q:"If ŷ = 0.3 and the target y = 1.0, what is the MSE/2 loss?",
      opts:["0.49","0.245","0.7","0.1"],
      correct:1,
      explain:"✅ Correct! L = ½(0.3−1.0)² = ½(−0.7)² = ½×0.49 = 0.245",
    },
    {
      q:"What is the purpose of the bias term in a neuron?",
      opts:["To connect to the next layer","To allow the neuron to fire even when all inputs are zero","To normalize the input values","To count training examples"],
      correct:1,
      explain:"✅ Exactly! Bias shifts the activation threshold independently of inputs. Without bias, the neuron can't fire when x=0, severely limiting what patterns it can learn.",
    },
    {
      q:"Which component of a neural network changes during training?",
      opts:["The number of layers","The input data","The weights and biases","The activation function type"],
      correct:2,
      explain:"✅ Right! Only weights (W) and biases (b) are updated by gradient descent. The architecture and inputs are fixed during a training run.",
    },
    {
      q:"The chain rule in calculus is central to backpropagation. What does it allow us to do?",
      opts:["Multiply matrices faster","Compute how a change in one layer affects the loss, through all intermediate layers","Skip computing gradients for the first layer","Initialize weights from a normal distribution"],
      correct:1,
      explain:"✅ Correct! Chain rule: ∂L/∂w = (∂L/∂ŷ) × (∂ŷ/∂z) × (∂z/∂w). We can link together derivatives across all layers to trace the error back to any weight.",
    },
  ];

  const q = questions[qIdx];

  const answer = (i) => {
    if (sel !== null) return;
    setSel(i);
    if (i === q.correct) setScore(s=>s+1);
  };
  const next = () => {
    if (qIdx+1 >= questions.length) { setDone(true); return; }
    setQIdx(i=>i+1); setSel(null);
  };
  const restart = () => { setQIdx(0); setSel(null); setScore(0); setDone(false); };

  if (done) return (
    <div className="fade-up">
      <div className="sh">
        <div className="sh-badge">🧠 KNOWLEDGE CHECK</div>
        <h2>Quiz Complete!</h2>
      </div>
      <div className="card e" style={{textAlign:"center",padding:"48px 28px"}}>
        <div style={{fontSize:64,marginBottom:16}}>
          {score===questions.length ? "🏆" : score>=6 ? "🎯" : score>=4 ? "📚" : "🔄"}
        </div>
        <div style={{fontFamily:"JetBrains Mono",fontSize:32,fontWeight:700,color:"var(--emerald)",marginBottom:8}}>{score}/{questions.length}</div>
        <div style={{color:"var(--muted)",marginBottom:24,fontSize:16}}>
          {score===questions.length ? "Perfect score! You've mastered forward pass & backpropagation! 🚀" :
           score>=6 ? "Excellent! You have a strong grasp of the concepts." :
           score>=4 ? "Good work! Review the sections you missed and try again." :
           "Keep studying! Go through the sections and come back."}
        </div>
        <div className="prog-wrap" style={{maxWidth:300,margin:"0 auto 24px"}}><div className="prog" style={{width:`${(score/questions.length)*100}%`}}/></div>
        <button className="btn btn-e" onClick={restart}>🔄 Retry Quiz</button>
      </div>
    </div>
  );

  return (
    <div className="fade-up">
      <div className="sh">
        <div className="sh-badge">🧠 SECTION 7</div>
        <h2>Knowledge Check</h2>
        <p>8 questions testing your understanding of forward pass, backpropagation, weights, biases, and activations.</p>
      </div>
      <div className="quiz-card">
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
          <span className="tag tg-e">Q {qIdx+1} / {questions.length}</span>
          <span className="tag tg-a">Score: {score}/{qIdx}</span>
        </div>
        <div className="prog-wrap"><div className="prog" style={{width:`${(qIdx/questions.length)*100}%`}}/></div>
        <div className="q-text">{q.q}</div>
        <div className="q-opts">
          {q.opts.map((o,i)=>(
            <button key={i} className={`q-opt ${sel!==null&&i===q.correct?"correct":""} ${sel===i&&i!==q.correct?"wrong":""}`} onClick={()=>answer(i)}>
              <span style={{marginRight:10,opacity:.5}}>{["A","B","C","D"][i]}.</span>{o}
            </button>
          ))}
        </div>
        {sel!==null && (
          <div className={`q-feedback ${sel===q.correct?"qf-c":"qf-w"}`}>
            {sel===q.correct ? q.explain : `❌ The correct answer is "${q.opts[q.correct]}". ${q.explain}`}
          </div>
        )}
        {sel!==null && (
          <button className="btn btn-e" style={{marginTop:16,width:"100%"}} onClick={next}>
            {qIdx+1>=questions.length?"See Results 🏆":"Next Question →"}
          </button>
        )}
      </div>

      <div className="card s" style={{marginTop:20}}>
        <div className="card-title">📋 Quick Reference Cheat Sheet</div>
        <div className="igrid">
          {[
            {ico:"🔜",label:"Forward Pass",desc:"Data flows input→hidden→output. Compute z=Wx+b then apply activation."},
            {ico:"🔙",label:"Backprop",desc:"Error flows output→hidden→input. Compute ∂L/∂w using chain rule."},
            {ico:"⚖️",label:"Weight",desc:"Strength of connection. Updated by gradient descent. w = w − α×∂L/∂w."},
            {ico:"⬛",label:"Bias",desc:"Offset per neuron. Lets it fire when inputs=0. Also updated by gradient descent."},
            {ico:"⚡",label:"Activation",desc:"Adds non-linearity. Sigmoid→(0,1), ReLU→max(0,z), Softmax→probabilities."},
            {ico:"📏",label:"Loss",desc:"Measures error. MSE = ½(ŷ−y)². Minimized by training."},
            {ico:"⛓️",label:"Chain Rule",desc:"∂L/∂w = ∂L/∂ŷ × ∂ŷ/∂z × ∂z/∂w. Multiply derivatives link by link."},
            {ico:"📉",label:"Gradient Descent",desc:"Slide downhill on the loss landscape. α=learning rate controls step size."},
            {ico:"♾️",label:"Epoch",desc:"One full pass through training data (forward + backward for all examples)."},
            {ico:"🎯",label:"Pre-activation z",desc:"z = Wx + b (before activation function). Sometimes called 'logit'."},
          ].map(x=>(
            <div key={x.ico} className="ibox" style={{padding:"12px 14px"}}>
              <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                <span style={{fontSize:18,flexShrink:0}}>{x.ico}</span>
                <div>
                  <div style={{fontWeight:700,fontSize:13,color:"var(--text)",marginBottom:3}}>{x.label}</div>
                  <div style={{fontSize:12,color:"var(--muted)",lineHeight:1.5}}>{x.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════ */
const TABS = [
  {id:"what",  label:"📖 What Is It?"},
  {id:"why",   label:"❓ Why Use It?"},
  {id:"fwd",   label:"🔜 Forward Pass"},
  {id:"back",  label:"🔙 Backprop"},
  {id:"layers",label:"🧩 Weights & Layers"},
  {id:"live",  label:"⚡ Live Trainer"},
  {id:"quiz",  label:"🧠 Quiz"},
];

function BackpropTutorial() {
  const [tab, setTab] = useState("what");

  const sections = {
    what:   <WhatIs />,
    why:    <WhyUse />,
    fwd:    <ForwardPassSection />,
    back:   <BackpropSection />,
    layers: <LayersSection />,
    live:   <LiveTrainer />,
    quiz:   <QuizSection />,
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        {/* Hero */}
        <div className="hero">
          <div className="hero-eyebrow">⬡ NEURAL NETWORK FUNDAMENTALS</div>
          <h1>Forward Pass &<br/>Backpropagation</h1>
          <p className="hero-sub">
            The two algorithms that power <em>all</em> of modern AI — explained visually, mathematically, and interactively for curious minds.
          </p>
          <div className="hero-chips">
            <span className="chip chip-e">🔜 Forward Propagation</span>
            <span className="chip chip-s">🔙 Backpropagation</span>
            <span className="chip chip-a">⚖️ Weights & Biases</span>
            <span className="chip chip-v">⚡ Live Training</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {TABS.map(t=>(
            <button key={t.id} className={`tab ${tab===t.id?"active":""}`} onClick={()=>setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="content" key={tab}>
          {sections[tab]}
        </div>
      </div>
    </>
  );
}


// ============================================================
// 31. ERROR HANDLING
// ============================================================


// ─── Math Core ────────────────────────────────────────────────────────────────
const sigmoid_eh = x => 1 / (1 + Math.exp(-Math.max(-500, Math.min(500, x))));
const sigmoidPrime = x => { const s = sigmoid_eh(x); return s * (1 - s); };
const relu_eh = x => Math.max(0, x);
const reluPrime = x => x > 0 ? 1 : 0;
const fmt = (n, d = 4) => (typeof n === "number" ? n.toFixed(d) : "—");
const fmt2 = n => fmt(n, 2);
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

const mse = (preds, targets) =>
  preds.reduce((s, p, i) => s + Math.pow(p - targets[i], 2), 0) / preds.length;
const rmse = (preds, targets) => Math.sqrt(mse(preds, targets));
const mae = (preds, targets) =>
  preds.reduce((s, p, i) => s + Math.abs(p - targets[i]), 0) / preds.length;

// ─── Tiny dataset: [study_hours, sleep_hours] → exam_score (normalized 0-1) ──
const DATASET = [
  { x: [0.2, 0.6], y: 0.35 },
  { x: [0.4, 0.7], y: 0.52 },
  { x: [0.6, 0.8], y: 0.67 },
  { x: [0.8, 0.5], y: 0.71 },
  { x: [0.9, 0.9], y: 0.88 },
  { x: [0.3, 0.4], y: 0.38 },
  { x: [0.7, 0.6], y: 0.74 },
  { x: [0.5, 0.8], y: 0.60 },
];
const TRAIN_DATA = DATASET.slice(0, 6);
const TEST_DATA  = DATASET.slice(6);

// ─── Forward pass for 2→2→1 network ─────────────────────────────────────────
function forwardPass(x, W1, b1, W2, b2) {
  // Hidden layer
  const z1 = [
    W1[0][0] * x[0] + W1[0][1] * x[1] + b1[0],
    W1[1][0] * x[0] + W1[1][1] * x[1] + b1[1],
  ];
  const h1 = z1.map(sigmoid_eh);
  // Output layer
  const z2 = W2[0] * h1[0] + W2[1] * h1[1] + b2;
  const out = sigmoid_eh(z2);
  return { z1, h1, z2, out };
}

// ─── Gradient computation (backprop for MSE + sigmoid_eh) ───────────────────────
function backprop(x, y, W1, b1, W2, b2) {
  const { z1, h1, z2, out } = forwardPass(x, W1, b1, W2, b2);
  // Output layer gradients
  const dL_dout = out - y;                         // dMSE/dout (factor 2 absorbed)
  const dout_dz2 = sigmoidPrime(z2);
  const delta2 = dL_dout * dout_dz2;
  const dW2 = h1.map(h => delta2 * h);
  const db2 = delta2;
  // Hidden layer gradients
  const delta1 = [
    delta2 * W2[0] * sigmoidPrime(z1[0]),
    delta2 * W2[1] * sigmoidPrime(z1[1]),
  ];
  const dW1 = [
    [delta1[0] * x[0], delta1[0] * x[1]],
    [delta1[1] * x[0], delta1[1] * x[1]],
  ];
  const db1 = delta1;
  return { dW1, db1, dW2, db2, out, z1, h1, z2 };
}

// ─── Design tokens ───────────────────────────────────────────────────────────
const T = {
  bg:       "#050c14",
  panel:    "#080f1c",
  border:   "#0d2040",
  amber:    "#f59e0b",
  green:    "#10b981",
  cyan:     "#06b6d4",
  red:      "#ef4444",
  blue:     "#3b82f6",
  dim:      "#94a3b8",
  dimmer:   "#475569",
  text:     "#e2e8f0",
  mono:     "'Courier New', 'Lucida Console', monospace",
  sans:     "'Georgia', 'Times New Roman', serif",
};

// ─── Reusable UI ─────────────────────────────────────────────────────────────
const Panel = ({ children, style = {}, glow }) => (
  <div style={{
    background: T.panel,
    border: `1px solid ${glow ? glow + "50" : T.border}`,
    borderRadius: 12,
    padding: "20px",
    boxShadow: glow ? `0 0 24px ${glow}22, inset 0 0 32px ${glow}08` : "none",
    ...style
  }}>{children}</div>
);

const Label = ({ children, color = T.amber, size = 11 }) => (
  <div style={{
    fontFamily: T.mono, fontSize: size, letterSpacing: 3,
    textTransform: "uppercase", color, marginBottom: 10, fontWeight: 700,
  }}>{children}</div>
);

const Tag = ({ children, color = T.amber }) => (
  <span style={{
    background: color + "18", border: `1px solid ${color}50`,
    borderRadius: 4, padding: "1px 6px", fontFamily: T.mono,
    fontSize: 11, color, margin: "0 3px"
  }}>{children}</span>
);

const Formula = ({ children, color = T.cyan }) => (
  <div style={{
    background: "#020a14", border: `1px solid ${color}40`,
    borderRadius: 8, padding: "12px 16px", fontFamily: T.mono,
    fontSize: 12.5, color, margin: "10px 0", lineHeight: 2,
    whiteSpace: "pre-wrap", overflowX: "auto"
  }}>{children}</div>
);

const Slider = ({ label, value, min, max, step = 0.01, onChange, color = T.amber }) => (
  <div style={{ marginBottom: 10 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
      <span style={{ fontFamily: T.mono, fontSize: 11, color: T.dim }}>{label}</span>
      <span style={{ fontFamily: T.mono, fontSize: 12, color, fontWeight: 700 }}>{value.toFixed(3)}</span>
    </div>
    <input type="range" min={min} max={max} step={step} value={value}
      onChange={e => onChange(+e.target.value)}
      style={{ width: "100%", accentColor: color, cursor: "pointer" }} />
  </div>
);

const Btn = ({ children, onClick, color = T.amber, disabled = false, small = false }) => (
  <button onClick={onClick} disabled={disabled} style={{
    padding: small ? "5px 12px" : "9px 20px",
    borderRadius: 8, border: `1px solid ${disabled ? T.dimmer : color}`,
    background: disabled ? "transparent" : color + "18",
    color: disabled ? T.dimmer : color,
    fontFamily: T.mono, fontSize: small ? 11 : 13,
    fontWeight: 700, cursor: disabled ? "default" : "pointer",
    letterSpacing: 1, transition: "all 0.15s",
  }}>{children}</button>
);

const ErrorBar = ({ label, value, max = 1, color = T.red }) => (
  <div style={{ marginBottom: 8 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
      <span style={{ fontFamily: T.mono, fontSize: 11, color: T.dim }}>{label}</span>
      <span style={{ fontFamily: T.mono, fontSize: 12, color, fontWeight: 700 }}>{fmt(value)}</span>
    </div>
    <div style={{ background: "#0d2040", borderRadius: 3, height: 8, overflow: "hidden" }}>
      <div style={{
        height: "100%", borderRadius: 3,
        width: `${Math.min(100, (value / max) * 100)}%`,
        background: `linear-gradient(90deg, ${color}88, ${color})`,
        transition: "width 0.3s ease"
      }} />
    </div>
  </div>
);

// ─── Oscilloscope-style loss curve ────────────────────────────────────────────
const LossCurve = ({ history, color = T.amber, label = "Loss", height = 100 }) => {
  const max = Math.max(...history, 0.01);
  const min = Math.min(...history, 0);
  const range = max - min || 0.01;
  const w = 400, h = height;
  const pts = history.map((v, i) => ({
    x: (i / Math.max(history.length - 1, 1)) * w,
    y: h - ((v - min) / range) * (h - 10) - 5
  }));
  const path = pts.length > 1
    ? "M " + pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" L ")
    : "";
  return (
    <div style={{ background: "#020a14", borderRadius: 8, padding: "10px 12px", border: `1px solid ${color}30`, overflow: "hidden" }}>
      <div style={{ fontFamily: T.mono, fontSize: 10, color, letterSpacing: 2, marginBottom: 6 }}>{label} — {history.length} steps</div>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: h, display: "block" }}>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map(f => (
          <line key={f} x1={0} y1={h * f} x2={w} y2={h * f}
            stroke={color + "15"} strokeWidth={1} strokeDasharray="4 4" />
        ))}
        {pts.length > 1 && (
          <>
            <path d={path} fill="none" stroke={color + "50"} strokeWidth={3} />
            <path d={path} fill="none" stroke={color} strokeWidth={1.5} />
          </>
        )}
        {pts.length > 0 && (
          <circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y}
            r={4} fill={color} />
        )}
        <text x={4} y={12} fill={color + "80"} fontSize={9} fontFamily="monospace">{fmt(max, 4)}</text>
        <text x={4} y={h - 2} fill={color + "80"} fontSize={9} fontFamily="monospace">{fmt(min, 4)}</text>
      </svg>
    </div>
  );
};

// ─── Neural Network Diagram ───────────────────────────────────────────────────
const NNDiagram = ({ x, h1, out, W1, W2, b1, b2, highlight = null }) => {
  const nodes = {
    i0: { cx: 60,  cy: 80,  label: `x₁\n${fmt2(x[0])}`,   color: T.blue },
    i1: { cx: 60,  cy: 180, label: `x₂\n${fmt2(x[1])}`,   color: T.blue },
    h0: { cx: 200, cy: 80,  label: `h₁\n${fmt2(h1[0])}`,  color: T.cyan },
    h1: { cx: 200, cy: 180, label: `h₂\n${fmt2(h1[1])}`,  color: T.cyan },
    o0: { cx: 340, cy: 130, label: `ŷ\n${fmt2(out)}`,      color: T.amber },
  };
  const edges = [
    { from:"i0", to:"h0", w: W1[0][0], label:`w₁₁=${fmt2(W1[0][0])}` },
    { from:"i0", to:"h1", w: W1[1][0], label:`w₂₁=${fmt2(W1[1][0])}` },
    { from:"i1", to:"h0", w: W1[0][1], label:`w₁₂=${fmt2(W1[0][1])}` },
    { from:"i1", to:"h1", w: W1[1][1], label:`w₂₂=${fmt2(W1[1][1])}` },
    { from:"h0", to:"o0", w: W2[0],    label:`w₃₁=${fmt2(W2[0])}` },
    { from:"h1", to:"o0", w: W2[1],    label:`w₃₂=${fmt2(W2[1])}` },
  ];
  return (
    <svg viewBox="0 0 400 260" style={{ width: "100%", maxWidth: 400, display:"block" }}>
      {/* Bias annotations */}
      <text x={200} y={20} textAnchor="middle" fill={T.green + "bb"} fontSize={9} fontFamily="monospace">
        b₁=[{fmt2(b1[0])},{fmt2(b1[1])}]
      </text>
      <text x={340} y={20} textAnchor="middle" fill={T.green + "bb"} fontSize={9} fontFamily="monospace">
        b₂={fmt2(b2)}
      </text>
      {/* Edges */}
      {edges.map((e, i) => {
        const f = nodes[e.from], t = nodes[e.to];
        const intensity = Math.min(1, Math.abs(e.w) * 1.5);
        const stroke = e.w >= 0 ? T.cyan : T.red;
        return (
          <g key={i}>
            <line x1={f.cx+18} y1={f.cy} x2={t.cx-18} y2={t.cy}
              stroke={stroke} strokeWidth={1 + intensity * 1.5}
              strokeOpacity={0.3 + intensity * 0.5} />
            <text x={(f.cx+t.cx)/2} y={(f.cy+t.cy)/2 - 4}
              textAnchor="middle" fill={stroke + "99"} fontSize={8} fontFamily="monospace">
              {fmt2(e.w)}
            </text>
          </g>
        );
      })}
      {/* Nodes */}
      {Object.entries(nodes).map(([id, n]) => {
        const lines = n.label.split("\n");
        return (
          <g key={id}>
            <circle cx={n.cx} cy={n.cy} r={22}
              fill={n.color + "18"} stroke={n.color} strokeWidth={2} />
            {lines.map((l, li) => (
              <text key={li} x={n.cx} y={n.cy + (li === 0 ? -5 : 9)}
                textAnchor="middle" fill={n.color} fontSize={10} fontFamily="monospace" fontWeight={700}>
                {l}
              </text>
            ))}
          </g>
        );
      })}
      {/* Layer labels */}
      {[["Input", 60], ["Hidden", 200], ["Output", 340]].map(([l, cx]) => (
        <text key={l} x={cx} y={240} textAnchor="middle"
          fill={T.dimmer} fontSize={9} fontFamily="monospace" letterSpacing={2}>
          {l.toUpperCase()}
        </text>
      ))}
    </svg>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — What is Error?
// ══════════════════════════════════════════════════════════════════════════════
function WhatIsError() {
  const [pred, setPred] = useState(0.6);
  const [target] = useState(0.85);
  const err = pred - target;
  const se = err * err;

  const preds = [0.35, 0.52, 0.65, 0.70, 0.82, 0.40];
  const tgts  = [0.35, 0.52, 0.67, 0.71, 0.88, 0.38];
  const mseVal  = mse(preds, tgts);
  const rmseVal = rmse(preds, tgts);
  const maeVal  = mae(preds, tgts);

  return (
    <div>
      <Panel glow={T.amber} style={{ marginBottom: 18 }}>
        <Label>What is Prediction Error?</Label>
        <p style={{ color: T.text, fontSize: 14, lineHeight: 1.8, marginBottom: 12 }}>
          When a neural network makes a prediction <Tag color={T.cyan}>ŷ</Tag> and the correct answer is <Tag color={T.green}>y</Tag>,
          the <strong style={{ color: T.amber }}>error</strong> measures how far off the prediction was.
          This error signal is the entire engine of learning — the network uses it to figure out
          exactly how to adjust every weight and bias to do better next time.
        </p>
        <p style={{ color: T.dim, fontSize: 13, lineHeight: 1.7 }}>
          Think of it like a navigation system. If you're supposed to arrive at latitude 40.7°N but you're at 40.3°N,
          the error (0.4°) tells the system which direction to correct and by how much.
          A neural network does the same thing — except it has thousands of parameters to correct simultaneously,
          and the error must be distributed intelligently back through every layer.
        </p>
      </Panel>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
        <Panel glow={T.cyan} style={{ gridColumn: "1 / -1" }}>
          <Label color={T.cyan}>Interactive: Single Prediction Error</Label>
          <p style={{ color: T.dim, fontSize: 13, marginBottom: 12 }}>
            Drag the prediction slider. Watch how each error metric responds differently.
            The target (correct answer) is fixed at <Tag color={T.green}>{target}</Tag>.
          </p>
          <Slider label="Prediction (ŷ)" value={pred} min={0} max={1} onChange={setPred} color={T.cyan} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 14 }}>
            {[
              { label: "Raw Error  (ŷ - y)", val: err, color: err >= 0 ? T.red : T.blue, note: "Can be + or −" },
              { label: "Squared Error  (ŷ-y)²", val: se, color: T.amber, note: "Always positive" },
              { label: "Absolute Error  |ŷ-y|", val: Math.abs(err), color: T.green, note: "Always positive" },
            ].map(({ label, val, color, note }) => (
              <div key={label} style={{ background: "#020a14", borderRadius: 8, padding: 14, border: `1px solid ${color}30`, textAlign: "center" }}>
                <div style={{ fontFamily: T.mono, fontSize: 10, color: T.dim, marginBottom: 8, letterSpacing: 1 }}>{label}</div>
                <div style={{ fontFamily: T.mono, fontSize: 22, color, fontWeight: 700, marginBottom: 6 }}>{fmt(val)}</div>
                <div style={{ background: "#0d2040", borderRadius: 3, height: 6, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min(100, Math.abs(val) * 100)}%`, background: color, borderRadius: 3 }} />
                </div>
                <div style={{ color: T.dimmer, fontSize: 10, marginTop: 6, fontFamily: T.mono }}>{note}</div>
              </div>
            ))}
          </div>
          <Formula color={T.cyan}>{`Raw Error    = ŷ − y          = ${fmt2(pred)} − ${target} = ${fmt(err)}
Squared Err  = (ŷ − y)²      = (${fmt(err)})²          = ${fmt(se)}
Absolute Err = |ŷ − y|       = |${fmt(err)}|           = ${fmt(Math.abs(err))}`}</Formula>
        </Panel>
      </div>

      <Panel glow={T.red} style={{ marginBottom: 18 }}>
        <Label color={T.red}>Why Can't We Just Use Raw Error?</Label>
        <p style={{ color: T.dim, fontSize: 13, lineHeight: 1.75 }}>
          If we average raw errors across many predictions, positive and negative errors cancel each other out.
          A prediction of <Tag color={T.cyan}>0.9</Tag> for target <Tag color={T.green}>1.0</Tag> (error −0.1)
          and a prediction of <Tag color={T.cyan}>0.1</Tag> for target <Tag color={T.green}>0.0</Tag> (error +0.1)
          would average to <Tag color={T.red}>zero</Tag> — making it look like perfect performance even though both are wrong.
          We need error metrics that are always positive and emphasize large mistakes.
        </p>
      </Panel>

      <Panel glow={T.green}>
        <Label color={T.green}>Batch Error Metrics (6 training samples)</Label>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: T.mono, fontSize: 12 }}>
            <thead>
              <tr>
                {["Sample","Prediction (ŷ)","Target (y)","Error","Sq. Error","Abs. Error"].map(h => (
                  <th key={h} style={{ padding: "8px 10px", color: T.dimmer, borderBottom: `1px solid ${T.border}`, textAlign: "left", fontSize: 10, letterSpacing: 1 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {preds.map((p, i) => {
                const e = p - tgts[i], sqe = e*e, abe = Math.abs(e);
                return (
                  <tr key={i} style={{ background: i%2===0 ? "#050c1499" : "transparent" }}>
                    <td style={{ padding: "7px 10px", color: T.dimmer }}>{i+1}</td>
                    <td style={{ padding: "7px 10px", color: T.cyan }}>{fmt(p)}</td>
                    <td style={{ padding: "7px 10px", color: T.green }}>{fmt(tgts[i])}</td>
                    <td style={{ padding: "7px 10px", color: e >= 0 ? T.red : T.blue }}>{fmt(e)}</td>
                    <td style={{ padding: "7px 10px", color: T.amber }}>{fmt(sqe)}</td>
                    <td style={{ padding: "7px 10px", color: T.green }}>{fmt(abe)}</td>
                  </tr>
                );
              })}
              <tr style={{ borderTop: `1px solid ${T.border}` }}>
                <td colSpan={3} style={{ padding: "8px 10px", color: T.dimmer, fontWeight: 700 }}>AVERAGE →</td>
                <td style={{ padding: "8px 10px", color: T.red, fontWeight: 700 }}>{fmt(preds.reduce((s,p,i)=>s+(p-tgts[i]),0)/preds.length)} ← cancels!</td>
                <td style={{ padding: "8px 10px", color: T.amber, fontWeight: 700 }}>{fmt(mseVal)}</td>
                <td style={{ padding: "8px 10px", color: T.green, fontWeight: 700 }}>{fmt(maeVal)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>
          {[
            { metric: "MSE", value: mseVal, color: T.amber },
            { metric: "RMSE", value: rmseVal, color: T.red },
          ].map(({ metric, value, color }) => (
            <div key={metric} style={{ background: "#020a14", borderRadius: 8, padding: 14, border: `1px solid ${color}40`, textAlign: "center" }}>
              <div style={{ fontFamily: T.mono, fontSize: 11, color: T.dim, marginBottom: 6, letterSpacing: 2 }}>{metric}</div>
              <div style={{ fontFamily: T.mono, fontSize: 26, color, fontWeight: 700 }}>{fmt(value)}</div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — MSE & RMSE Deep Dive
// ══════════════════════════════════════════════════════════════════════════════
function MseRmseSection() {
  const [n, setN] = useState(4);
  const [preds, setPreds] = useState([0.6, 0.4, 0.8, 0.3]);
  const targets = [0.85, 0.35, 0.70, 0.50];

  const mseVal  = mse(preds.slice(0,n), targets.slice(0,n));
  const rmseVal = rmse(preds.slice(0,n), targets.slice(0,n));

  const updatePred = (i, v) => {
    const copy = [...preds]; copy[i] = v; setPreds(copy);
  };

  return (
    <div>
      <Panel glow={T.amber} style={{ marginBottom: 18 }}>
        <Label>MSE — Mean Squared Error</Label>
        <Formula color={T.amber}>{`        1   n
MSE = ─── × Σ (ŷᵢ − yᵢ)²
        n   i=1

where:
  n      = number of samples
  ŷᵢ     = the network's prediction for sample i
  yᵢ     = the true (correct) answer for sample i
  (ŷ−y)² = squaring makes all errors positive
           AND penalizes large errors MORE`}</Formula>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <p style={{ color: T.text, fontSize: 13, lineHeight: 1.75, marginBottom: 10 }}>
              <strong style={{ color: T.amber }}>Why squaring?</strong> Three reasons:
            </p>
            {[
              ["Always positive", "Squaring any number (positive or negative) gives a positive result. −0.3 and +0.3 both become 0.09."],
              ["Penalizes large errors harder", "An error of 0.1 becomes 0.01. An error of 0.5 becomes 0.25 — 25× larger even though the error is only 5× bigger."],
              ["Mathematically smooth", "Squaring makes the error function differentiable everywhere — essential for computing gradients in backpropagation."],
            ].map(([title, desc]) => (
              <div key={title} style={{ marginBottom: 10, display: "flex", gap: 10 }}>
                <div style={{ color: T.amber, fontFamily: T.mono, fontSize: 16, marginTop: 1, flexShrink: 0 }}>▸</div>
                <div>
                  <span style={{ color: T.amber, fontSize: 13, fontWeight: 700 }}>{title}: </span>
                  <span style={{ color: T.dim, fontSize: 13 }}>{desc}</span>
                </div>
              </div>
            ))}
          </div>
          <div>
            <p style={{ color: T.text, fontSize: 13, lineHeight: 1.75, marginBottom: 10 }}>
              <strong style={{ color: T.red }}>Limitations of MSE:</strong>
            </p>
            {[
              ["Units are squared", "If your output is in dollars, MSE is in dollars². It's hard to interpret directly."],
              ["Sensitive to outliers", "One extreme prediction explodes the MSE much more than many small errors."],
              ["Scale dependent", "MSE for a network predicting house prices (0–500k) is not comparable to one predicting probabilities (0–1)."],
            ].map(([title, desc]) => (
              <div key={title} style={{ marginBottom: 10, display: "flex", gap: 10 }}>
                <div style={{ color: T.red, fontFamily: T.mono, fontSize: 16, marginTop: 1, flexShrink: 0 }}>▸</div>
                <div>
                  <span style={{ color: T.red, fontSize: 13, fontWeight: 700 }}>{title}: </span>
                  <span style={{ color: T.dim, fontSize: 13 }}>{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <Panel glow={T.red} style={{ marginBottom: 18 }}>
        <Label color={T.red}>RMSE — Root Mean Squared Error</Label>
        <Formula color={T.red}>{`RMSE = √MSE = √( (1/n) × Σ(ŷᵢ − yᵢ)² )

Taking the square root:
  • Returns error to the SAME UNITS as the original output
  • RMSE = 0.05 means "on average, predictions are off by 0.05 units"
  • Easier to interpret than MSE
  • Still penalizes large errors more than small ones`}</Formula>
        <p style={{ color: T.dim, fontSize: 13, lineHeight: 1.75 }}>
          RMSE is the "practical" version of MSE. If your network predicts exam scores between 0 and 1,
          and RMSE = 0.08, it means your predictions are typically about 0.08 off — which corresponds
          to 8 percentage points on a 0–100 scale. This is immediately meaningful.
        </p>
      </Panel>

      <Panel glow={T.cyan}>
        <Label color={T.cyan}>Live MSE & RMSE Calculator</Label>
        <div style={{ marginBottom: 12 }}>
          <label style={{ color: T.dim, fontSize: 12, fontFamily: T.mono }}>
            Number of samples: <strong style={{ color: T.cyan }}>{n}</strong>
            <input type="range" min={1} max={4} step={1} value={n}
              onChange={e => setN(+e.target.value)}
              style={{ marginLeft: 10, accentColor: T.cyan, width: 120 }} />
          </label>
        </div>
        {Array.from({ length: n }, (_, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 10, marginBottom: 8, alignItems: "center" }}>
            <Slider label={`Sample ${i+1}: ŷ = ${fmt2(preds[i])}, y = ${fmt2(targets[i])}`}
              value={preds[i]} min={0} max={1} onChange={v => updatePred(i, v)} color={T.cyan} />
            <div style={{ textAlign: "center" }}>
              <div style={{ color: T.dim, fontSize: 10, fontFamily: T.mono }}>ERROR</div>
              <div style={{ color: T.red, fontFamily: T.mono, fontSize: 13, fontWeight: 700 }}>{fmt(preds[i]-targets[i])}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: T.dim, fontSize: 10, fontFamily: T.mono }}>SQ. ERR</div>
              <div style={{ color: T.amber, fontFamily: T.mono, fontSize: 13, fontWeight: 700 }}>{fmt(Math.pow(preds[i]-targets[i],2))}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: T.dim, fontSize: 10, fontFamily: T.mono }}>|ERR|</div>
              <div style={{ color: T.green, fontFamily: T.mono, fontSize: 13, fontWeight: 700 }}>{fmt(Math.abs(preds[i]-targets[i]))}</div>
            </div>
          </div>
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>
          {[
            { label: "MSE", val: mseVal, color: T.amber, formula: `(${Array.from({length:n},(_,i)=>`${fmt2(Math.pow(preds[i]-targets[i],2))}`).join("+")})\n÷ ${n} = ${fmt(mseVal)}` },
            { label: "RMSE", val: rmseVal, color: T.red, formula: `√${fmt(mseVal)} = ${fmt(rmseVal)}` },
          ].map(({ label, val, color, formula }) => (
            <div key={label} style={{ background: "#020a14", borderRadius: 8, padding: 16, border: `1px solid ${color}40` }}>
              <div style={{ fontFamily: T.mono, fontSize: 11, color: T.dim, letterSpacing: 2, marginBottom: 8 }}>{label}</div>
              <div style={{ fontFamily: T.mono, fontSize: 28, color, fontWeight: 700, marginBottom: 8 }}>{fmt(val)}</div>
              <div style={{ fontFamily: T.mono, fontSize: 11, color: color + "80", whiteSpace: "pre-wrap" }}>{formula}</div>
            </div>
          ))}
        </div>
        <Formula color={T.green}>{`Interpretation:
  MSE  = ${fmt(mseVal)}  → average squared error across ${n} samples
  RMSE = ${fmt(rmseVal)}  → typical prediction is off by ≈${(rmseVal*100).toFixed(1)}% of the full output range`}</Formula>
      </Panel>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 3 — Network Forward Pass Step by Step
// ══════════════════════════════════════════════════════════════════════════════
function ForwardPassSection() {
  const [stepIdx, setStepIdx] = useState(0);
  const [sampleIdx, setSampleIdx] = useState(0);
  const sample = TRAIN_DATA[sampleIdx];

  // Fixed weights for walkthrough
  const W1 = [[0.5, -0.3], [0.2, 0.8]];
  const b1 = [0.1, -0.1];
  const W2 = [0.6, 0.4];
  const b2 = 0.05;

  const x = sample.x;
  const z1_0 = W1[0][0]*x[0] + W1[0][1]*x[1] + b1[0];
  const z1_1 = W1[1][0]*x[0] + W1[1][1]*x[1] + b1[1];
  const h1_0 = sigmoid_eh(z1_0), h1_1 = sigmoid_eh(z1_1);
  const z2 = W2[0]*h1_0 + W2[1]*h1_1 + b2;
  const out = sigmoid_eh(z2);
  const err = out - sample.y;
  const loss = 0.5 * err * err;

  const steps = [
    {
      title: "Input Layer — Raw Features Enter the Network",
      color: T.blue,
      content: (
        <div>
          <p style={{ color: T.dim, fontSize: 13, lineHeight: 1.75, marginBottom: 12 }}>
            Two input values flow into the network. Each is a normalized feature value between 0 and 1.
            The input layer performs <strong style={{ color: T.blue }}>no computation</strong> — it simply
            holds the data and passes it to every neuron in the hidden layer through connections called weights.
          </p>
          <Formula color={T.blue}>{`Input vector x = [x₁, x₂]
x₁ = ${x[0]} (feature 1: normalized study hours)
x₂ = ${x[1]} (feature 2: normalized sleep hours)

Each input connects to EVERY hidden neuron.
2 inputs × 2 hidden neurons = 4 weight connections.`}</Formula>
        </div>
      )
    },
    {
      title: "Hidden Layer — Weighted Sum + Bias",
      color: T.cyan,
      content: (
        <div>
          <p style={{ color: T.dim, fontSize: 13, lineHeight: 1.75, marginBottom: 12 }}>
            Each hidden neuron computes a <strong style={{ color: T.cyan }}>weighted sum</strong> of all inputs,
            then adds a bias. The <strong style={{ color: T.green }}>bias</strong> is like a knob that shifts
            the neuron's activation threshold — it lets the network fire even when inputs are zero.
          </p>
          <Formula color={T.cyan}>{`Hidden neuron 1 (pre-activation z₁):
  z₁ = w₁₁·x₁ + w₁₂·x₂ + b₁
     = ${W1[0][0]}×${x[0]} + ${W1[0][1]}×${x[1]} + ${b1[0]}
     = ${(W1[0][0]*x[0]).toFixed(4)} + ${(W1[0][1]*x[1]).toFixed(4)} + ${b1[0]}
     = ${z1_0.toFixed(4)}

Hidden neuron 2 (pre-activation z₂):
  z₂ = w₂₁·x₁ + w₂₂·x₂ + b₂
     = ${W1[1][0]}×${x[0]} + ${W1[1][1]}×${x[1]} + ${b1[1]}
     = ${(W1[1][0]*x[0]).toFixed(4)} + ${(W1[1][1]*x[1]).toFixed(4)} + ${b1[1]}
     = ${z1_1.toFixed(4)}`}</Formula>
        </div>
      )
    },
    {
      title: "Hidden Layer — Activation Function (sigmoid_eh)",
      color: T.cyan,
      content: (
        <div>
          <p style={{ color: T.dim, fontSize: 13, lineHeight: 1.75, marginBottom: 12 }}>
            The <strong style={{ color: T.cyan }}>activation function</strong> introduces non-linearity.
            Without it, stacking layers is mathematically identical to having just one layer.
            Sigmoid maps any real number to (0, 1) — perfect for probabilities.
          </p>
          <Formula color={T.cyan}>{`sigmoid_eh(z) = 1 / (1 + e^(−z))

h₁ = sigmoid_eh(z₁) = sigmoid_eh(${z1_0.toFixed(4)})
   = 1 / (1 + e^(−${z1_0.toFixed(4)}))
   = ${h1_0.toFixed(6)}

h₂ = sigmoid_eh(z₂) = sigmoid_eh(${z1_1.toFixed(4)})
   = 1 / (1 + e^(−${z1_1.toFixed(4)}))
   = ${h1_1.toFixed(6)}

These hidden activations [${fmt2(h1_0)}, ${fmt2(h1_1)}] are the
"learned representation" passed to the output layer.`}</Formula>
        </div>
      )
    },
    {
      title: "Output Layer — Final Prediction",
      color: T.amber,
      content: (
        <div>
          <p style={{ color: T.dim, fontSize: 13, lineHeight: 1.75, marginBottom: 12 }}>
            The output neuron combines the hidden activations using its own weights and bias,
            then applies sigmoid_eh to produce a final prediction between 0 and 1.
          </p>
          <Formula color={T.amber}>{`Output (pre-activation z_out):
  z_out = w₃₁·h₁ + w₃₂·h₂ + b_out
        = ${W2[0]}×${h1_0.toFixed(4)} + ${W2[1]}×${h1_1.toFixed(4)} + ${b2}
        = ${(W2[0]*h1_0).toFixed(4)} + ${(W2[1]*h1_1).toFixed(4)} + ${b2}
        = ${z2.toFixed(4)}

Prediction ŷ = sigmoid_eh(${z2.toFixed(4)}) = ${out.toFixed(6)}

True target y = ${sample.y}
         ŷ  = ${fmt(out)}
         
This single forward pass is complete. Now we compute the loss.`}</Formula>
        </div>
      )
    },
    {
      title: "Loss Computation — How Wrong Were We?",
      color: T.red,
      content: (
        <div>
          <p style={{ color: T.dim, fontSize: 13, lineHeight: 1.75, marginBottom: 12 }}>
            We compute the <strong style={{ color: T.red }}>MSE loss</strong> for this single sample.
            (For a full batch, we'd average across all samples.) This single number summarizes
            exactly how wrong the prediction was.
          </p>
          <Formula color={T.red}>{`Single-sample MSE:
  L = 0.5 × (ŷ − y)²  ← the 0.5 simplifies the derivative
    = 0.5 × (${fmt(out)} − ${sample.y})²
    = 0.5 × (${fmt(err)})²
    = 0.5 × ${fmt(err*err)}
    = ${fmt(loss)}

RMSE across training set = √(average of all sample losses × 2)

The loss L is the quantity every weight update aims to MINIMIZE.
Smaller L → better predictions → more useful network.`}</Formula>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 10 }}>
            {[
              { label: "Prediction ŷ", val: out, color: T.cyan },
              { label: "Target y", val: sample.y, color: T.green },
              { label: "Loss L", val: loss, color: T.red },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ background: "#020a14", borderRadius: 8, padding: 12, border: `1px solid ${color}30`, textAlign: "center" }}>
                <div style={{ color: T.dim, fontSize: 10, fontFamily: T.mono, marginBottom: 4 }}>{label}</div>
                <div style={{ color, fontFamily: T.mono, fontSize: 20, fontWeight: 700 }}>{fmt(val)}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
  ];

  return (
    <div>
      <Panel glow={T.blue} style={{ marginBottom: 18 }}>
        <Label color={T.blue}>Network Architecture: 2 → 2 → 1</Label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>
          <div>
            <p style={{ color: T.dim, fontSize: 13, lineHeight: 1.75, marginBottom: 12 }}>
              We use a small network to predict exam scores from study hours and sleep hours.
              Select a training sample and walk through each step of the forward pass below.
            </p>
            <div style={{ marginBottom: 12 }}>
              <label style={{ color: T.dim, fontSize: 12, fontFamily: T.mono }}>
                Training sample: <strong style={{ color: T.blue }}>{sampleIdx + 1}</strong>
                <input type="range" min={0} max={TRAIN_DATA.length-1} step={1} value={sampleIdx}
                  onChange={e => setSampleIdx(+e.target.value)}
                  style={{ marginLeft: 10, accentColor: T.blue, width: 120 }} />
              </label>
            </div>
            <Formula color={T.blue}>{`x = [${x[0]}, ${x[1]}]  →  y = ${sample.y}
Weights W1: [[${W1[0]}],[${W1[1]}]]
Biases  b1: [${b1}]
Weights W2: [${W2}]
Bias    b2:  ${b2}`}</Formula>
          </div>
          <NNDiagram x={x} h1={[h1_0,h1_1]} out={out} W1={W1} W2={W2} b1={b1} b2={b2} />
        </div>
      </Panel>

      <Panel glow={steps[stepIdx].color}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {steps.map((s, i) => (
            <button key={i} onClick={() => setStepIdx(i)} style={{
              padding: "6px 14px", borderRadius: 20,
              border: `1px solid ${s.color}`,
              background: stepIdx === i ? s.color + "25" : "transparent",
              color: stepIdx === i ? s.color : T.dimmer,
              fontFamily: T.mono, fontSize: 11, cursor: "pointer",
              fontWeight: stepIdx === i ? 700 : 400
            }}>Step {i+1}</button>
          ))}
        </div>
        <Label color={steps[stepIdx].color}>{steps[stepIdx].title}</Label>
        {steps[stepIdx].content}
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <Btn onClick={() => setStepIdx(i => Math.max(0, i-1))} disabled={stepIdx===0} color={steps[stepIdx].color} small>◀ Previous</Btn>
          <Btn onClick={() => setStepIdx(i => Math.min(steps.length-1, i+1))} disabled={stepIdx===steps.length-1} color={steps[stepIdx].color} small>Next ▶</Btn>
        </div>
      </Panel>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 4 — Backpropagation & Weight Adjustment
// ══════════════════════════════════════════════════════════════════════════════
function BackpropSection() {
  const [lr, setLr] = useState(0.5);
  const [W1, setW1] = useState([[0.5, -0.3], [0.2, 0.8]]);
  const [b1, setB1] = useState([0.1, -0.1]);
  const [W2, setW2] = useState([0.6, 0.4]);
  const [b2, setB2] = useState(0.05);
  const [sample] = useState(TRAIN_DATA[0]);
  const [history, setHistory] = useState([]);
  const [step, setStep] = useState(0);

  const { dW1, db1, dW2, db2: db2g, out, z1, h1, z2 } = backprop(sample.x, sample.y, W1, b1, W2, b2);
  const err = out - sample.y;
  const loss = 0.5 * err * err;

  const updateWeights = () => {
    const newW1 = W1.map((row, i) => row.map((w, j) => w - lr * dW1[i][j]));
    const newB1 = b1.map((b, i) => b - lr * db1[i]);
    const newW2 = W2.map((w, i) => w - lr * dW2[i]);
    const newB2 = b2 - lr * db2g;
    setW1(newW1); setB1(newB1); setW2(newW2); setB2(newB2);
    setHistory(h => [...h.slice(-49), loss]);
  };

  const reset = () => {
    setW1([[0.5,-0.3],[0.2,0.8]]); setB1([0.1,-0.1]);
    setW2([0.6,0.4]); setB2(0.05); setHistory([]); setStep(0);
  };

  const gradSteps = [
    {
      title: "Step 1: Output Layer Gradient (δ_out)",
      color: T.red,
      desc: "The gradient of the loss with respect to the output neuron's pre-activation value. This is the starting point — every other gradient depends on this.",
      formula: `δ_out = ∂L/∂z_out = (ŷ − y) × sigmoid_eh'(z_out)
         = (ŷ − y) × ŷ×(1−ŷ)
         = (${fmt(out)} − ${sample.y}) × ${fmt(out)} × ${fmt(1-out)}
         = ${fmt(err)} × ${fmt(out*(1-out))}
         = ${fmt(err * out * (1-out))}`
    },
    {
      title: "Step 2: Output Weight Gradients (∂L/∂W2)",
      color: T.amber,
      desc: "How much does each output weight contribute to the error? The gradient is the output delta × the hidden activation that connects to it. Larger hidden activation = larger influence = larger gradient.",
      formula: `∂L/∂w₃₁ = δ_out × h₁ = ${fmt(err*out*(1-out))} × ${fmt(h1[0])} = ${fmt(err*out*(1-out)*h1[0])}
∂L/∂w₃₂ = δ_out × h₂ = ${fmt(err*out*(1-out))} × ${fmt(h1[1])} = ${fmt(err*out*(1-out)*h1[1])}
∂L/∂b₂  = δ_out       = ${fmt(err*out*(1-out))}

Weight update rule:  new_w = old_w − lr × gradient
w₃₁: ${fmt(W2[0])} − ${lr} × ${fmt(dW2[0])} = ${fmt(W2[0] - lr*dW2[0])}
w₃₂: ${fmt(W2[1])} − ${lr} × ${fmt(dW2[1])} = ${fmt(W2[1] - lr*dW2[1])}`
    },
    {
      title: "Step 3: Hidden Layer Gradients (δ_h)",
      color: T.cyan,
      desc: "We propagate the error backward through the output weights. Each hidden neuron's gradient is the output delta × the connecting weight × the hidden neuron's own derivative. This is the 'chain rule' — derivatives multiply across layers.",
      formula: `δ_h1 = δ_out × w₃₁ × sigmoid_eh'(z_h1)
       = ${fmt(err*out*(1-out))} × ${fmt(W2[0])} × ${fmt(h1[0]*(1-h1[0]))}
       = ${fmt(db1[0])}

δ_h2 = δ_out × w₃₂ × sigmoid_eh'(z_h2)
       = ${fmt(err*out*(1-out))} × ${fmt(W2[1])} × ${fmt(h1[1]*(1-h1[1]))}
       = ${fmt(db1[1])}`
    },
    {
      title: "Step 4: Input Weight Gradients (∂L/∂W1)",
      color: T.green,
      desc: "The gradients for the first-layer weights follow the same pattern: hidden delta × the input that fed into it. These small gradients adjust the very first set of connections — the network's eyes that first perceive the raw input.",
      formula: `∂L/∂w₁₁ = δ_h1 × x₁ = ${fmt(db1[0])} × ${sample.x[0]} = ${fmt(dW1[0][0])}
∂L/∂w₁₂ = δ_h1 × x₂ = ${fmt(db1[0])} × ${sample.x[1]} = ${fmt(dW1[0][1])}
∂L/∂w₂₁ = δ_h2 × x₁ = ${fmt(db1[1])} × ${sample.x[0]} = ${fmt(dW1[1][0])}
∂L/∂w₂₂ = δ_h2 × x₂ = ${fmt(db1[1])} × ${sample.x[1]} = ${fmt(dW1[1][1])}

w₁₁: ${fmt(W1[0][0])} − ${lr}×${fmt(dW1[0][0])} = ${fmt(W1[0][0]-lr*dW1[0][0])}
w₁₂: ${fmt(W1[0][1])} − ${lr}×${fmt(dW1[0][1])} = ${fmt(W1[0][1]-lr*dW1[0][1])}`
    },
    {
      title: "Step 5: Bias Gradients & Full Update",
      color: T.blue,
      desc: "Biases have no incoming connection — their gradient is simply the delta of their neuron. After computing all gradients, we apply every update simultaneously. The loss should decrease after this step.",
      formula: `∂L/∂b₁ = δ_h1 = ${fmt(db1[0])}
∂L/∂b₂ = δ_h2 = ${fmt(db1[1])}

After update:
  Loss before: ${fmt(loss)}
  Predicted:   ${fmt(out)}  →  Target: ${sample.y}

Press "Apply Update" to apply all gradients and watch the loss decrease.`
    },
  ];

  return (
    <div>
      <Panel glow={T.amber} style={{ marginBottom: 18 }}>
        <Label>The Chain Rule — How Error Travels Backward</Label>
        <p style={{ color: T.dim, fontSize: 13, lineHeight: 1.8, marginBottom: 12 }}>
          Backpropagation uses the <strong style={{ color: T.amber }}>chain rule from calculus</strong> to
          compute how much each weight contributed to the error. The key insight:
          the total effect of a weight deep in the network is the product of all the partial
          effects along the path from that weight to the loss.
        </p>
        <Formula color={T.amber}>{`∂L     ∂L    ∂ŷ    ∂z_out
──── = ──── × ─── × ──────  ← Chain rule: multiply derivatives along the path
∂w₃₁   ∂ŷ    ∂z   ∂w₃₁

Each ∂/∂w term tells us:
"If this weight increases by a tiny amount ε, how much does the loss change?"
A large gradient → big influence → needs a big adjustment.
A small gradient → small influence → small adjustment.`}</Formula>
      </Panel>

      <Panel glow={gradSteps[step].color} style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
          {gradSteps.map((s, i) => (
            <button key={i} onClick={() => setStep(i)} style={{
              padding: "5px 12px", borderRadius: 20,
              border: `1px solid ${s.color}`,
              background: step === i ? s.color + "25" : "transparent",
              color: step === i ? s.color : T.dimmer,
              fontFamily: T.mono, fontSize: 11, cursor: "pointer", fontWeight: step===i?700:400
            }}>Step {i+1}</button>
          ))}
        </div>
        <Label color={gradSteps[step].color}>{gradSteps[step].title}</Label>
        <p style={{ color: T.dim, fontSize: 13, lineHeight: 1.75, marginBottom: 10 }}>{gradSteps[step].desc}</p>
        <Formula color={gradSteps[step].color}>{gradSteps[step].formula}</Formula>
      </Panel>

      <Panel glow={T.green}>
        <Label color={T.green}>Live Weight Update Lab</Label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>
          <div>
            <Slider label="Learning Rate (lr)" value={lr} min={0.01} max={2.0} step={0.01} onChange={setLr} color={T.green} />
            <p style={{ color: T.dim, fontSize: 12, lineHeight: 1.7, marginBottom: 12 }}>
              <strong style={{ color: T.green }}>Learning rate</strong> controls how big a step we take in the direction the gradient points.
              Too large → overshoot, oscillate, diverge. Too small → convergence is painfully slow.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
              {[
                { label: "Loss", val: loss, color: T.red },
                { label: "Prediction ŷ", val: out, color: T.cyan },
                { label: "Target y", val: sample.y, color: T.green },
                { label: "Error (ŷ−y)", val: err, color: T.amber },
              ].map(({ label, val, color }) => (
                <div key={label} style={{ background: "#020a14", borderRadius: 8, padding: 10, border: `1px solid ${color}30` }}>
                  <div style={{ color: T.dim, fontSize: 9, fontFamily: T.mono, letterSpacing: 1, marginBottom: 3 }}>{label}</div>
                  <div style={{ color, fontFamily: T.mono, fontSize: 16, fontWeight: 700 }}>{fmt(val)}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Btn onClick={updateWeights} color={T.green}>▶ Apply Update</Btn>
              <Btn onClick={() => { for(let i=0;i<20;i++) updateWeights(); }} color={T.amber} small>▶▶ 20 Steps</Btn>
              <Btn onClick={reset} color={T.dim} small>↺ Reset</Btn>
            </div>
            {history.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontFamily: T.mono, fontSize: 10, color: T.green, marginBottom: 4 }}>
                  Updates applied: {history.length} | Best loss: {fmt(Math.min(...history))}
                </div>
              </div>
            )}
          </div>
          <div>
            {history.length > 1 ? (
              <LossCurve history={history} color={T.green} label="Training Loss" height={120} />
            ) : (
              <div style={{ background: "#020a14", borderRadius: 8, padding: 24, border: `1px solid ${T.border}`, textAlign: "center" }}>
                <div style={{ color: T.dimmer, fontFamily: T.mono, fontSize: 12 }}>Apply updates to see loss curve</div>
              </div>
            )}
            <div style={{ marginTop: 12 }}>
              <Label color={T.amber} size={10}>Current Weights W1</Label>
              <Formula color={T.amber}>{W1.map((r,i)=>`[${r.map(fmt2).join(", ")}]`).join("\n")}</Formula>
              <Label color={T.cyan} size={10}>Current Weights W2 & Biases</Label>
              <Formula color={T.cyan}>{`W2 = [${W2.map(fmt2).join(", ")}]  b2 = ${fmt2(b2)}\nb1 = [${b1.map(fmt2).join(", ")}]`}</Formula>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 10, padding: "10px 14px", background: "#020a14", borderRadius: 8, border: `1px solid ${T.green}20` }}>
          <span style={{ color: T.green, fontFamily: T.mono, fontSize: 11, fontWeight: 700 }}>Learning rate guidance: </span>
          <span style={{ color: T.dim, fontSize: 12 }}>
            Try lr=0.01 (slow, stable) → lr=0.5 (fast) → lr=2.0 (unstable, watch the loss spike).
            The optimal rate is typically found with learning rate schedules or adaptive optimizers like Adam.
          </span>
        </div>
      </Panel>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 5 — Training vs. Testing & Overfitting
// ══════════════════════════════════════════════════════════════════════════════
function TrainTestSection() {
  const [epochs, setEpochs] = useState(0);
  const [W1, setW1] = useState([[0.5,-0.3],[0.2,0.8]]);
  const [b1, setB1] = useState([0.1,-0.1]);
  const [W2, setW2] = useState([0.6,0.4]);
  const [b2, setB2] = useState(0.05);
  const [trainLoss, setTrainLoss] = useState([]);
  const [testLoss, setTestLoss] = useState([]);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const computeLoss = (data, cW1, cb1, cW2, cb2) => {
    const preds = data.map(s => forwardPass(s.x, cW1, cb1, cW2, cb2).out);
    const tgts = data.map(s => s.y);
    return rmse(preds, tgts);
  };

  const trainOneEpoch = useCallback((cW1, cb1, cW2, cb2) => {
    let nW1 = cW1.map(r=>[...r]), nb1=[...cb1], nW2=[...cW2], nb2=cb2;
    const lr = 0.3;
    for (const s of TRAIN_DATA) {
      const { dW1, db1, dW2, db2 } = backprop(s.x, s.y, nW1, nb1, nW2, nb2);
      nW1 = nW1.map((r,i) => r.map((w,j) => w - lr*dW1[i][j]/TRAIN_DATA.length));
      nb1 = nb1.map((b,i) => b - lr*db1[i]/TRAIN_DATA.length);
      nW2 = nW2.map((w,i) => w - lr*dW2[i]/TRAIN_DATA.length);
      nb2 = nb2 - lr*db2/TRAIN_DATA.length;
    }
    return { nW1, nb1, nW2, nb2 };
  }, []);

  const runEpochs = (n) => {
    let cW1=W1, cb1=b1, cW2=W2, cb2=b2;
    const tl=[...trainLoss], tel=[...testLoss];
    for (let i=0; i<n; i++) {
      const { nW1, nb1, nW2, nb2 } = trainOneEpoch(cW1, cb1, cW2, cb2);
      tl.push(computeLoss(TRAIN_DATA, nW1, nb1, nW2, nb2));
      tel.push(computeLoss(TEST_DATA, nW1, nb1, nW2, nb2));
      cW1=nW1; cb1=nb1; cW2=nW2; cb2=nb2;
    }
    setW1(cW1); setB1(cb1); setW2(cW2); setB2(cb2);
    setTrainLoss(tl); setTestLoss(tel); setEpochs(e => e+n);
  };

  const reset = () => {
    setW1([[0.5,-0.3],[0.2,0.8]]); setB1([0.1,-0.1]);
    setW2([0.6,0.4]); setB2(0.05);
    setTrainLoss([]); setTestLoss([]); setEpochs(0);
  };

  const curTrainRMSE = computeLoss(TRAIN_DATA, W1, b1, W2, b2);
  const curTestRMSE  = computeLoss(TEST_DATA, W1, b1, W2, b2);

  return (
    <div>
      <Panel glow={T.blue} style={{ marginBottom: 18 }}>
        <Label color={T.blue}>Training Error vs. Testing Error</Label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <p style={{ color: T.text, fontSize: 13, lineHeight: 1.8, marginBottom: 10 }}>
              <strong style={{ color: T.green }}>Training error</strong> measures performance on
              the data used to adjust weights. It should decrease as training continues.
            </p>
            <p style={{ color: T.text, fontSize: 13, lineHeight: 1.8, marginBottom: 10 }}>
              <strong style={{ color: T.amber }}>Testing error</strong> measures performance on
              data the network has <em>never seen</em>. This is the true measure of whether
              the network learned general patterns, not just memorized the training data.
            </p>
            <p style={{ color: T.dim, fontSize: 13, lineHeight: 1.75 }}>
              We split data: <Tag color={T.green}>6 training samples</Tag> and <Tag color={T.amber}>2 test samples</Tag>.
              We train only on the 6 samples, then evaluate on the 2 held-out samples.
            </p>
          </div>
          <div>
            {[
              { label: "Overfitting", color: T.red, desc: "Train error → low, Test error → rises. The network memorized training data noise rather than learning general patterns. Fix: more data, dropout, regularization, early stopping." },
              { label: "Underfitting", color: T.amber, desc: "Both errors remain high. The network is too simple or hasn't trained long enough. Fix: more layers, more neurons, more training epochs." },
              { label: "Good Fit", color: T.green, desc: "Both errors decrease together and stabilize. The network learned transferable patterns. Test error slightly above train error is normal and expected." },
            ].map(({ label, color, desc }) => (
              <div key={label} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0, marginTop: 4 }} />
                <div>
                  <span style={{ color, fontSize: 13, fontWeight: 700 }}>{label}: </span>
                  <span style={{ color: T.dim, fontSize: 12 }}>{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <Panel glow={T.green} style={{ marginBottom: 18 }}>
        <Label color={T.green}>Training Simulator — Watch Both Curves</Label>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16, alignItems: "center" }}>
          <Btn onClick={() => runEpochs(1)} color={T.green}>▶ 1 Epoch</Btn>
          <Btn onClick={() => runEpochs(10)} color={T.cyan} small>▶▶ 10 Epochs</Btn>
          <Btn onClick={() => runEpochs(50)} color={T.amber} small>▶▶▶ 50 Epochs</Btn>
          <Btn onClick={reset} color={T.dim} small>↺ Reset</Btn>
          <span style={{ fontFamily: T.mono, fontSize: 12, color: T.dim }}>Epoch: <strong style={{ color: T.text }}>{epochs}</strong></span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <ErrorBar label="Train RMSE (6 samples)" value={curTrainRMSE} max={0.4} color={T.green} />
            <ErrorBar label="Test RMSE  (2 samples)" value={curTestRMSE} max={0.4} color={T.amber} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "Train RMSE", val: curTrainRMSE, color: T.green },
              { label: "Test RMSE", val: curTestRMSE, color: T.amber },
              { label: "Gap (overfit indicator)", val: Math.abs(curTestRMSE - curTrainRMSE), color: curTestRMSE-curTrainRMSE > 0.05 ? T.red : T.green },
              { label: "Epochs", val: epochs, color: T.blue },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ background: "#020a14", borderRadius: 8, padding: 10, border: `1px solid ${color}30` }}>
                <div style={{ color: T.dim, fontSize: 9, fontFamily: T.mono, marginBottom: 3, letterSpacing: 1 }}>{label}</div>
                <div style={{ color, fontFamily: T.mono, fontSize: 17, fontWeight: 700 }}>{typeof val === "number" && val < 100 ? fmt(val) : val}</div>
              </div>
            ))}
          </div>
        </div>
        {trainLoss.length > 1 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <LossCurve history={trainLoss} color={T.green} label="TRAIN RMSE" height={90} />
            <LossCurve history={testLoss} color={T.amber} label="TEST RMSE" height={90} />
          </div>
        )}
        {trainLoss.length === 0 && (
          <div style={{ background: "#020a14", borderRadius: 8, padding: 20, textAlign: "center", border: `1px solid ${T.border}` }}>
            <div style={{ color: T.dimmer, fontFamily: T.mono, fontSize: 13 }}>Run epochs to see training progress</div>
          </div>
        )}
      </Panel>

      <Panel glow={T.red}>
        <Label color={T.red}>Error Handling Strategies in Training</Label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {[
            {
              title: "Gradient Clipping",
              color: T.red,
              desc: "If gradients grow too large (gradient explosion), cap them at a maximum value. This prevents weight updates from becoming catastrophically large, which would destroy all learned patterns.",
              formula: "if ‖∇‖ > clip_value:\n  ∇ = ∇ × (clip_value / ‖∇‖)"
            },
            {
              title: "Early Stopping",
              color: T.amber,
              desc: "Monitor validation (test) loss. When it stops decreasing and starts increasing, stop training immediately. This is the most effective technique against overfitting.",
              formula: "if test_loss[epoch] > test_loss[epoch−k]\n  for k consecutive epochs: STOP"
            },
            {
              title: "Learning Rate Scheduling",
              color: T.cyan,
              desc: "Start with a large learning rate for fast initial progress, then reduce it as training progresses. This allows fine-grained refinement near the optimal weights.",
              formula: "lr(t) = lr₀ × decay^(t/step)\nOR: reduce when plateau detected"
            },
            {
              title: "Weight Initialization",
              color: T.green,
              desc: "Bad initial weights cause vanishing/exploding gradients from epoch 1. Xavier/He initialization sets weights proportional to layer size, ensuring healthy gradient magnitudes from the start.",
              formula: "Xavier: w ~ U(-√(6/(n_in+n_out)),\n              +√(6/(n_in+n_out)))"
            },
          ].map(({ title, color, desc, formula }) => (
            <div key={title} style={{ background: "#020a14", borderRadius: 10, padding: 16, border: `1px solid ${color}30` }}>
              <div style={{ color, fontFamily: T.mono, fontSize: 12, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>{title}</div>
              <p style={{ color: T.dim, fontSize: 12, lineHeight: 1.7, marginBottom: 10 }}>{desc}</p>
              <div style={{ background: T.panel, borderRadius: 6, padding: "8px 12px", fontFamily: T.mono, fontSize: 11, color: color + "cc", whiteSpace: "pre-wrap" }}>{formula}</div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION 6 — Full Training Lab (all samples)
// ══════════════════════════════════════════════════════════════════════════════
function FullLab() {
  const initW = { W1: [[0.5,-0.3],[0.2,0.8]], b1:[0.1,-0.1], W2:[0.6,0.4], b2:0.05 };
  const [W, setW] = useState(initW);
  const [lr, setLr] = useState(0.3);
  const [epochs, setEpochs] = useState(0);
  const [history, setHistory] = useState({ train: [], test: [], mse: [], rmse: [] });
  const [running, setRunning] = useState(false);
  const ref = useRef({ W: initW, lr: 0.3, running: false });

  useEffect(() => { ref.current.W = W; }, [W]);
  useEffect(() => { ref.current.lr = lr; }, [lr]);

  const step = () => {
    const { W: cW, lr: cLr } = ref.current;
    let { W1, b1, W2, b2 } = cW;
    for (const s of DATASET) {
      const { dW1, db1, dW2, db2 } = backprop(s.x, s.y, W1, b1, W2, b2);
      const lr_ = cLr / DATASET.length;
      W1 = W1.map((r,i)=>r.map((w,j)=>w-lr_*dW1[i][j]));
      b1 = b1.map((b,i)=>b-lr_*db1[i]);
      W2 = W2.map((w,i)=>w-lr_*dW2[i]);
      b2 = b2 - lr_*db2;
    }
    const newW = { W1, b1, W2, b2 };
    const preds = DATASET.map(s=>forwardPass(s.x,newW.W1,newW.b1,newW.W2,newW.b2).out);
    const tgts = DATASET.map(s=>s.y);
    const mseV = mse(preds,tgts), rmseV = rmse(preds,tgts);
    const trainP = TRAIN_DATA.map(s=>forwardPass(s.x,newW.W1,newW.b1,newW.W2,newW.b2).out);
    const testP  = TEST_DATA.map(s=>forwardPass(s.x,newW.W1,newW.b1,newW.W2,newW.b2).out);
    ref.current.W = newW;
    setW(newW);
    setEpochs(e=>e+1);
    setHistory(h=>({
      train: [...h.train.slice(-79), rmse(trainP,TRAIN_DATA.map(s=>s.y))],
      test:  [...h.test.slice(-79),  rmse(testP,TEST_DATA.map(s=>s.y))],
      mse:   [...h.mse.slice(-79),   mseV],
      rmse:  [...h.rmse.slice(-79),  rmseV],
    }));
  };

  const runContinuous = () => {
    if (ref.current.running) { ref.current.running = false; setRunning(false); return; }
    ref.current.running = true; setRunning(true);
    const loop = () => {
      if (!ref.current.running) return;
      step();
      setTimeout(loop, 50);
    };
    loop();
  };

  const reset = () => {
    ref.current.running = false; setRunning(false);
    setW(initW); ref.current.W = initW; setEpochs(0);
    setHistory({ train:[], test:[], mse:[], rmse:[] });
  };

  const curPreds = DATASET.map(s => forwardPass(s.x, W.W1, W.b1, W.W2, W.b2).out);
  const curMse = mse(curPreds, DATASET.map(s=>s.y));
  const curRmse = rmse(curPreds, DATASET.map(s=>s.y));

  return (
    <div>
      <Panel glow={T.amber} style={{ marginBottom: 18 }}>
        <Label>Full 8-Sample Training Lab</Label>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 16 }}>
          <Slider label="Learning Rate" value={lr} min={0.01} max={2.0} step={0.01} onChange={setLr} color={T.amber} />
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
          <Btn onClick={step} color={T.green} small>▶ 1 Epoch</Btn>
          <Btn onClick={() => { for(let i=0;i<10;i++) step(); }} color={T.cyan} small>▶▶ 10</Btn>
          <Btn onClick={runContinuous} color={running ? T.red : T.amber}>{running ? "⏹ Stop" : "▶▶▶ Auto Train"}</Btn>
          <Btn onClick={reset} color={T.dim} small>↺ Reset</Btn>
          <span style={{ fontFamily: T.mono, fontSize: 12, color: T.dim }}>Epoch <strong style={{ color: T.text }}>{epochs}</strong></span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[
            { label: "MSE", val: curMse, color: T.amber },
            { label: "RMSE", val: curRmse, color: T.red },
            { label: "Train RMSE", val: history.train.slice(-1)[0] || 0, color: T.green },
            { label: "Test RMSE", val: history.test.slice(-1)[0] || 0, color: T.cyan },
          ].map(({ label, val, color }) => (
            <div key={label} style={{ background: "#020a14", borderRadius: 8, padding: 12, border: `1px solid ${color}40`, textAlign: "center" }}>
              <div style={{ color: T.dim, fontSize: 9, fontFamily: T.mono, letterSpacing: 1, marginBottom: 4 }}>{label}</div>
              <div style={{ color, fontFamily: T.mono, fontSize: 20, fontWeight: 700 }}>{fmt(val)}</div>
            </div>
          ))}
        </div>
        {history.rmse.length > 1 ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <LossCurve history={history.mse} color={T.amber} label="MSE over epochs" height={100} />
            <LossCurve history={history.rmse} color={T.red} label="RMSE over epochs" height={100} />
          </div>
        ) : (
          <div style={{ background: "#020a14", borderRadius: 8, padding: 20, textAlign: "center", border: `1px solid ${T.border}`, marginBottom: 16 }}>
            <div style={{ color: T.dimmer, fontFamily: T.mono, fontSize: 13 }}>Train the network to see MSE and RMSE curves</div>
          </div>
        )}
      </Panel>

      <Panel glow={T.cyan}>
        <Label color={T.cyan}>Prediction Table — All 8 Samples</Label>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: T.mono, fontSize: 12 }}>
            <thead>
              <tr>
                {["#","x₁","x₂","Target y","Pred ŷ","Error","Sq. Err","Split"].map(h => (
                  <th key={h} style={{ padding: "8px 10px", color: T.dimmer, borderBottom: `1px solid ${T.border}`, textAlign: "left", fontSize: 10, letterSpacing: 1 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DATASET.map((s, i) => {
                const pred = curPreds[i];
                const err = pred - s.y;
                const isTrain = i < 6;
                return (
                  <tr key={i} style={{ background: i%2===0 ? "#050c1499" : "transparent" }}>
                    <td style={{ padding: "7px 10px", color: T.dimmer }}>{i+1}</td>
                    <td style={{ padding: "7px 10px", color: T.blue }}>{s.x[0]}</td>
                    <td style={{ padding: "7px 10px", color: T.blue }}>{s.x[1]}</td>
                    <td style={{ padding: "7px 10px", color: T.green }}>{fmt2(s.y)}</td>
                    <td style={{ padding: "7px 10px", color: T.cyan }}>{fmt(pred)}</td>
                    <td style={{ padding: "7px 10px", color: Math.abs(err)<0.05?T.green:Math.abs(err)<0.1?T.amber:T.red }}>{fmt(err)}</td>
                    <td style={{ padding: "7px 10px", color: T.amber }}>{fmt(err*err)}</td>
                    <td style={{ padding: "7px 10px" }}>
                      <span style={{ background: isTrain ? T.green+"20" : T.amber+"20", color: isTrain ? T.green : T.amber, border: `1px solid ${isTrain?T.green:T.amber}50`, borderRadius: 4, padding: "2px 8px", fontSize: 10 }}>
                        {isTrain ? "TRAIN" : "TEST"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Formula color={T.cyan}>{`MSE  = (${DATASET.map((_,i)=>fmt2(Math.pow(curPreds[i]-DATASET[i].y,2))).join(" + ")}) / 8
     = ${fmt(curMse)}

RMSE = √${fmt(curMse)} = ${fmt(curRmse)}`}</Formula>
      </Panel>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
const SECTIONS = [
  { id: "error",    label: "01 · Error Basics",       emoji: "📡", color: T.amber,  Component: WhatIsError },
  { id: "metrics",  label: "02 · MSE & RMSE",          emoji: "📐", color: T.red,    Component: MseRmseSection },
  { id: "forward",  label: "03 · Forward Pass",         emoji: "🔬", color: T.blue,   Component: ForwardPassSection },
  { id: "backprop", label: "04 · Backprop & Weights",   emoji: "⚙️", color: T.green,  Component: BackpropSection },
  { id: "traintest",label: "05 · Train vs. Test",       emoji: "🧪", color: T.cyan,   Component: TrainTestSection },
  { id: "lab",      label: "06 · Full Training Lab",    emoji: "🚀", color: T.amber,  Component: FullLab },
];

function ErrorHandlingAcademy() {
  const [active, setActive] = useState("error");
  const sec = SECTIONS.find(s => s.id === active);
  const { Component, color } = sec;

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: T.sans }}>
      {/* Scanline overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)`,
      }} />
      {/* Ambient glow */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${color}12, transparent 65%)`
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1000, margin: "0 auto", padding: "28px 16px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: 8, color: T.dimmer, marginBottom: 8 }}>
            NEURAL NETWORK ERROR ANALYSIS SYSTEM
          </div>
          <h1 style={{
            margin: 0, fontFamily: T.mono, fontWeight: 900, letterSpacing: -1,
            fontSize: "clamp(22px, 4.5vw, 38px)",
            background: `linear-gradient(90deg, ${T.amber}, ${T.red}, ${T.cyan})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Error, Weights & Gradient Descent
          </h1>
          <p style={{ color: T.dimmer, fontSize: 13, marginTop: 8, fontFamily: T.mono }}>
            MSE · RMSE · Backpropagation · Weight Adjustment · Training vs. Testing
          </p>
        </div>

        {/* Nav */}
        <div style={{
          display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center",
          marginBottom: 28, background: T.panel,
          borderRadius: 14, padding: 6, border: `1px solid ${T.border}`
        }}>
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)} style={{
              padding: "7px 14px", borderRadius: 10,
              border: `1px solid ${active===s.id ? s.color : "transparent"}`,
              background: active===s.id ? s.color+"18" : "transparent",
              color: active===s.id ? s.color : T.dimmer,
              fontFamily: T.mono, fontSize: 11, cursor: "pointer",
              fontWeight: active===s.id ? 700 : 400,
              transition: "all 0.15s",
              boxShadow: active===s.id ? `0 0 14px ${s.color}22` : "none"
            }}>
              {s.emoji} {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{
          background: T.panel+"cc", borderRadius: 18,
          border: `1px solid ${color}25`,
          padding: "26px 22px",
          boxShadow: `0 0 50px ${color}15`
        }}>
          <Component key={active} />
        </div>

        <div style={{ textAlign: "center", marginTop: 20, color: T.dimmer, fontFamily: T.mono, fontSize: 10, letterSpacing: 2 }}>
          NEURAL NETWORK ERROR HANDLING LABORATORY · ALL COMPUTATIONS IN-BROWSER
        </div>
      </div>
    </div>
  );
}


// ============================================================
// 32. FEED FORWARD
// ============================================================


function FeedforwardDeepLearning() {
  const [activeTab, setActiveTab] = useState('introduction');
  const [activeArchitecture, setActiveArchitecture] = useState(0);
  const [activeCodeExample, setActiveCodeExample] = useState(0);
  const [expandedSection, setExpandedSection] = useState(null);

  const architectures = [
    {
      id: 'perceptron',
      name: 'Perceptron',
      year: '1957',
      inventor: 'Frank Rosenblatt',
      level: 'Beginner',
      category: 'Feedforward',
      description: 'The simplest neural network - a single neuron for binary classification.',
      
      theory: {
        keyIdea: 'Learn a linear decision boundary to separate two classes',
        biologicalInspiration: 'Modeled after how biological neurons fire when stimulated',
        howItWorks: 'Takes inputs, multiplies by weights, adds bias, applies step function',
        limitations: ['Can only learn linearly separable patterns', 'Cannot solve XOR problem', 'Single layer limits complexity']
      },

      architecture: {
        components: [
          'Input layer: n features (x₁, x₂, ..., xₙ)',
          'Weights: n weights (w₁, w₂, ..., wₙ)',
          'Bias: single bias term (b)',
          'Activation: Step function or Sign function',
          'Output: Binary prediction (0/1 or +1/-1)'
        ],
        parameters: 'n weights + 1 bias = n+1 total parameters'
      },

      mathematics: {
        weightedSum: {
          formula: 'z = w₁x₁ + w₂x₂ + ... + wₙxₙ + b',
          vector: 'z = w·x + b',
          explanation: 'Compute dot product of weights and inputs, add bias'
        },
        activation: {
          step: 'f(z) = 1 if z ≥ 0, else 0',
          sign: 'f(z) = +1 if z ≥ 0, else -1',
          explanation: 'Threshold function produces binary output'
        },
        learning: {
          rule: 'wᵢ = wᵢ + η(target - output)xᵢ',
          bias: 'b = b + η(target - output)',
          explanation: 'η is learning rate, adjust weights proportional to error'
        },
        numericalExample: {
          inputs: 'x = [0.5, 0.3]',
          weights: 'w = [0.4, 0.7]',
          bias: 'b = -0.2',
          calculation: 'z = 0.4×0.5 + 0.7×0.3 - 0.2 = 0.2 + 0.21 - 0.2 = 0.21',
          output: 'f(0.21) = 1 (positive class)',
          interpretation: 'Since z > 0, perceptron predicts class 1'
        }
      },

      visualDirection: {
        neuronDiagram: [
          'Draw a large circle in center (the neuron)',
          'Draw 2-3 small circles on left (inputs x₁, x₂, x₃)',
          'Draw arrows from inputs to neuron, label with weights w₁, w₂, w₃',
          'Draw small circle above neuron labeled "bias b" with arrow down',
          'Inside neuron, write Σ symbol (summation)',
          'Draw arrow out of neuron to right, label "activation function"',
          'Draw small box on right with output y'
        ],
        geometricView: [
          'Draw 2D coordinate plane (x₁ horizontal, x₂ vertical)',
          'Plot several + points in one region, - points in another',
          'Draw decision boundary line: w₁x₁ + w₂x₂ + b = 0',
          'Shade one side as "Class 1", other as "Class 0"',
          'Show weight vector w perpendicular to decision line'
        ],
        learningProcess: [
          'Frame 1: Random initial weights, wrong decision boundary',
          'Frame 2: Misclassified point highlighted in red',
          'Frame 3: Weights adjusted, boundary rotates slightly',
          'Frame 4: After many iterations, boundary separates classes'
        ]
      },

      stepByStep: [
        {
          step: 'Initialize',
          description: 'Set weights and bias to small random values',
          code: 'w = [0.1, -0.3], b = 0.2',
          visual: 'Show random decision line on plot'
        },
        {
          step: 'Forward Pass',
          description: 'For input x, compute z = w·x + b, then output = f(z)',
          code: 'z = w[0]*x[0] + w[1]*x[1] + b\noutput = 1 if z >= 0 else 0',
          visual: 'Show input point, calculation, and prediction'
        },
        {
          step: 'Compute Error',
          description: 'Compare prediction to true label',
          code: 'error = target - output',
          visual: 'If wrong, highlight point in red'
        },
        {
          step: 'Update Weights',
          description: 'Adjust weights based on error and learning rate',
          code: 'w[i] = w[i] + learning_rate * error * x[i]',
          visual: 'Show decision boundary rotating'
        },
        {
          step: 'Repeat',
          description: 'Continue for all training samples until convergence',
          code: 'for epoch in range(max_epochs):\n    for x, y in data:\n        train_step(x, y)',
          visual: 'Show boundary stabilizing'
        }
      ],

      practicalExample: {
        problem: 'AND gate classification',
        data: 'Input pairs (0,0), (0,1), (1,0), (1,1) with outputs 0, 0, 0, 1',
        solution: 'Perceptron learns weights w=[0.5, 0.5], b=-0.7 to separate classes',
        verification: 'Test: (1,1) → 0.5+0.5-0.7=0.3>0 → output 1 ✓'
      }
    },

    {
      id: 'mlp',
      name: 'Multilayer Perceptron (MLP)',
      year: '1986',
      inventor: 'Rumelhart, Hinton, Williams',
      level: 'Beginner',
      category: 'Feedforward',
      description: 'Multiple layers of neurons with non-linear activations, trained via backpropagation.',

      theory: {
        keyIdea: 'Hidden layers learn hierarchical representations of data',
        breakthrough: 'Backpropagation algorithm enables training deep networks',
        howItWorks: 'Each layer transforms input, final layer makes prediction',
        capabilities: ['Learn non-linear patterns', 'Universal function approximation', 'Solve XOR and complex problems']
      },

      architecture: {
        layers: [
          'Input layer: n input features',
          'Hidden layer(s): h₁, h₂, ... neurons with activation',
          'Output layer: m outputs with appropriate activation',
          'Fully connected: every neuron connects to all in next layer'
        ],
        typical: 'Input(784) → Hidden(128,ReLU) → Hidden(64,ReLU) → Output(10,Softmax)',
        parameters: 'For each layer: (n_in × n_out) + n_out'
      },

      mathematics: {
        forward: {
          layer1: 'h₁ = σ₁(W₁x + b₁)',
          layer2: 'h₂ = σ₂(W₂h₁ + b₂)',
          output: 'y = σₒᵤₜ(Wₒᵤₜh₂ + bₒᵤₜ)',
          general: 'aˡ = σ(Wˡaˡ⁻¹ + bˡ)'
        },
        activations: {
          relu: 'f(x) = max(0, x) - most common for hidden layers',
          sigmoid: 'f(x) = 1/(1+e⁻ˣ) - for binary classification output',
          tanh: 'f(x) = (eˣ-e⁻ˣ)/(eˣ+e⁻ˣ) - alternative for hidden',
          softmax: 'f(xᵢ) = eˣⁱ/Σⱼeˣʲ - for multiclass output'
        },
        backpropagation: {
          outputError: 'δᴸ = (y - t) ⊙ σ\'(zᴸ)',
          hiddenError: 'δˡ = (Wˡ⁺¹)ᵀδˡ⁺¹ ⊙ σ\'(zˡ)',
          weightGradient: '∂L/∂Wˡ = δˡ(aˡ⁻¹)ᵀ',
          update: 'W = W - η∂L/∂W'
        },
        example: {
          architecture: 'Input(2) → Hidden(3) → Output(1)',
          forward: 'x=[1,2] → h=ReLU([0.5,1.2,-0.3]) → y=Sigmoid(0.8)',
          dimensions: 'W₁: 3×2, b₁: 3×1, W₂: 1×3, b₂: 1×1',
          totalParams: '(2×3+3) + (3×1+1) = 13 parameters'
        }
      },

      visualDirection: {
        networkDiagram: [
          'Draw 3 columns of circles: Input(2), Hidden(3), Output(1)',
          'Connect every neuron in column 1 to every in column 2',
          'Connect every neuron in column 2 to output',
          'Label connections as "fully connected"',
          'Show activation function inside each hidden/output neuron'
        ],
        dataFlow: [
          'Show input values [2, 3] entering left',
          'Show weighted sums being computed in hidden layer',
          'Show activation functions transforming values',
          'Show final output 0.87 exiting right',
          'Use different colors for each layer'
        ],
        backpropagation: [
          'Draw same network but arrows pointing LEFT',
          'Show error starting at output (red)',
          'Show error propagating backward through layers',
          'Label as "gradient flow"',
          'Show weights being updated (blue arrows)'
        ]
      },

      stepByStep: [
        {
          step: 'Initialization',
          description: 'Initialize all weights with small random values (e.g., Xavier or He initialization)',
          code: 'W1 = np.random.randn(3,2) * 0.01\nb1 = np.zeros((3,1))',
          visual: 'Show network with random weights labeled'
        },
        {
          step: 'Forward Propagation',
          description: 'Pass input through network layer by layer',
          code: 'z1 = W1 @ x + b1\na1 = relu(z1)\nz2 = W2 @ a1 + b2\na2 = sigmoid(z2)',
          visual: 'Show values flowing forward with calculations'
        },
        {
          step: 'Compute Loss',
          description: 'Calculate error between prediction and target',
          code: 'loss = -y*log(a2) - (1-y)*log(1-a2)',
          visual: 'Show prediction vs target, compute difference'
        },
        {
          step: 'Backward Propagation',
          description: 'Calculate gradients from output back to input',
          code: 'dz2 = a2 - y\ndW2 = dz2 @ a1.T\ndz1 = W2.T @ dz2 * relu_derivative(z1)',
          visual: 'Show gradients flowing backward in red'
        },
        {
          step: 'Update Weights',
          description: 'Adjust weights using gradient descent',
          code: 'W2 = W2 - learning_rate * dW2\nW1 = W1 - learning_rate * dW1',
          visual: 'Show weights changing slightly'
        },
        {
          step: 'Iterate',
          description: 'Repeat forward-backward-update for all data, multiple epochs',
          code: 'for epoch in range(100):\n    for x, y in data:\n        forward_backward_update()',
          visual: 'Show loss decreasing over time graph'
        }
      ],

      practicalExample: {
        problem: 'XOR problem (not linearly separable)',
        data: '(0,0)→0, (0,1)→1, (1,0)→1, (1,1)→0',
        network: 'Input(2) → Hidden(2,sigmoid) → Output(1,sigmoid)',
        solution: 'Hidden layer creates non-linear feature space where XOR is separable',
        visualization: 'Show decision boundary as curve separating XOR patterns'
      }
    },

    {
      id: 'rbfn',
      name: 'Radial Basis Function Network',
      year: '1988',
      inventor: 'Broomhead & Lowe',
      level: 'Intermediate',
      category: 'Feedforward',
      description: 'Network using RBF activations that measure distance from center points.',

      theory: {
        keyIdea: 'Neurons activate based on distance from learned centers',
        advantage: 'Fast training (closed-form solution for output layer)',
        howItWorks: 'Hidden layer uses Gaussian RBFs, output is linear combination',
        bestFor: 'Function approximation, interpolation problems'
      },

      architecture: {
        structure: [
          'Input layer: n-dimensional input x',
          'Hidden layer: m RBF neurons with centers cᵢ and widths σᵢ',
          'Output layer: Linear combination of RBF outputs',
          'Not fully connected - each RBF responds to local region'
        ],
        training: '1) K-means for centers, 2) Heuristic for widths, 3) Linear regression for output weights'
      },

      mathematics: {
        rbfFunction: {
          gaussian: 'φᵢ(x) = exp(-||x - cᵢ||² / (2σᵢ²))',
          interpretation: 'Neuron i activates strongly when x is close to center cᵢ',
          example: 'x=[2,2], c=[1,1], σ=1 → φ=exp(-2/2)=exp(-1)≈0.37'
        },
        output: {
          formula: 'y(x) = Σᵢ wᵢφᵢ(x) + b',
          linear: 'Output is linear combination of RBF activations',
          weights: 'Can be solved analytically: w = (Φᵀ Φ)⁻¹ Φᵀ y'
        },
        training: {
          step1: 'Find centers: cᵢ using K-means clustering on training data',
          step2: 'Set widths: σᵢ = dₘₐₓ/√(2m) where dₘₐₓ is max distance between centers',
          step3: 'Solve for weights: Least squares on output layer'
        }
      },

      visualDirection: {
        architecture: [
          'Draw input layer (2 neurons for 2D example)',
          'Draw hidden RBF layer (5 neurons)',
          'Draw Gaussian curve above each RBF neuron',
          'Label centers c₁, c₂, c₃, c₄, c₅',
          'Draw output layer (1 neuron)',
          'Connect RBF outputs to final output with weights w'
        ],
        responseMap: [
          'Draw 2D input space as plane',
          'Plot center points as stars',
          'Draw circular/elliptical regions around each center',
          'Use heat map colors: bright near center, fading outward',
          'Show overlapping regions where RBFs interact'
        ],
        training: [
          'Frame 1: Random data points scattered in space',
          'Frame 2: K-means identifies 5 cluster centers',
          'Frame 3: RBF neurons placed at centers with width circles',
          'Frame 4: Output weights learned via linear regression'
        ]
      },

      stepByStep: [
        {
          step: 'Prepare Data',
          description: 'Collect training samples (x, y)',
          code: 'X_train = [[x1,x2], ...]\ny_train = [y1, y2, ...]',
          visual: 'Show scatter plot of training data'
        },
        {
          step: 'Find Centers',
          description: 'Run K-means clustering on input data',
          code: 'from sklearn.cluster import KMeans\ncenters = KMeans(n_clusters=m).fit(X).cluster_centers_',
          visual: 'Show cluster centers marked with stars'
        },
        {
          step: 'Calculate Widths',
          description: 'Set width based on center spacing',
          code: 'dmax = max_distance_between_centers(centers)\nwidths = dmax / sqrt(2*m)',
          visual: 'Show circles around centers representing widths'
        },
        {
          step: 'Compute RBF Activations',
          description: 'For each training point, calculate φᵢ(x)',
          code: 'phi = exp(-||x - center||^2 / (2*width^2))',
          visual: 'Show activation heat map'
        },
        {
          step: 'Solve for Weights',
          description: 'Use least squares to find output weights',
          code: 'from numpy.linalg import lstsq\nweights = lstsq(Phi, y_train)[0]',
          visual: 'Show weight values computed'
        },
        {
          step: 'Prediction',
          description: 'For new x, compute RBF activations then output',
          code: 'phi_new = compute_rbf(x_new, centers, widths)\ny_pred = weights @ phi_new',
          visual: 'Show prediction as sum of weighted RBFs'
        }
      ],

      practicalExample: {
        problem: '1D function approximation: f(x) = sin(x)',
        data: '20 points sampled from sin(x) in [0, 2π]',
        network: '5 RBF neurons with Gaussian activation',
        result: 'RBFN learns smooth approximation of sine wave',
        visualization: 'Plot: true sine (blue), RBF approximation (red dashed), RBF centers (green dots)'
      }
    },

    {
      id: 'autoencoder',
      name: 'Basic Autoencoder',
      year: '1980s',
      inventor: 'Hinton & others',
      level: 'Beginner',
      category: 'Unsupervised',
      description: 'Neural network that learns to compress and reconstruct data.',

      theory: {
        keyIdea: 'Learn compressed representation by forcing reconstruction',
        unsupervised: 'Trained without labels - input is also the target',
        bottleneck: 'Middle layer is narrower, forcing compression',
        applications: ['Dimensionality reduction', 'Denoising', 'Anomaly detection', 'Feature learning']
      },

      architecture: {
        encoder: 'Input → Hidden₁ → ... → Latent (bottleneck)',
        decoder: 'Latent → Hidden₁\' → ... → Reconstruction',
        symmetric: 'Often decoder mirrors encoder structure',
        example: '784 → 256 → 128 → 64 → 128 → 256 → 784'
      },

      mathematics: {
        encoder: {
          formula: 'z = f_encoder(x) = σ(W_encoder · x + b_encoder)',
          purpose: 'Compress input to low-dimensional latent code',
          example: 'x: 784-dim → z: 64-dim'
        },
        decoder: {
          formula: 'x̂ = f_decoder(z) = σ(W_decoder · z + b_decoder)',
          purpose: 'Reconstruct input from latent code',
          example: 'z: 64-dim → x̂: 784-dim'
        },
        loss: {
          mse: 'L = (1/n) Σᵢ ||xᵢ - x̂ᵢ||²',
          bce: 'L = -Σᵢ xᵢlog(x̂ᵢ) + (1-xᵢ)log(1-x̂ᵢ)',
          purpose: 'Minimize reconstruction error'
        },
        training: {
          objective: 'min_W L(x, decoder(encoder(x)))',
          method: 'Standard backpropagation and gradient descent',
          note: 'Input = target, so purely unsupervised'
        }
      },

      visualDirection: {
        architecture: [
          'Draw hourglass/bowtie shape',
          'Left half (encoder): Wide → Narrow',
          'Narrowest point in middle: "Latent code z (64 dims)"',
          'Right half (decoder): Narrow → Wide',
          'Label left as "Compression", right as "Reconstruction"',
          'Show symmetric layer sizes: 784-256-128-64-128-256-784'
        ],
        dataFlow: [
          'Input: Show digit "7" image',
          'Encoder: Show image getting compressed',
          'Latent: Show 64 numbers in middle',
          'Decoder: Show expanding back to image',
          'Output: Show reconstructed "7"',
          'Compare input vs output side-by-side'
        ],
        latentSpace: [
          'Plot 2D projection of latent codes',
          'Color points by digit class (0-9)',
          'Show clusters: similar digits cluster together',
          'Demonstrate learned meaningful representation'
        ]
      },

      stepByStep: [
        {
          step: 'Define Architecture',
          description: 'Create encoder and decoder networks',
          code: 'encoder = [Dense(256), Dense(128), Dense(64)]\ndecoder = [Dense(128), Dense(256), Dense(784)]',
          visual: 'Show layer dimensions decreasing then increasing'
        },
        {
          step: 'Forward Pass (Encode)',
          description: 'Compress input to latent representation',
          code: 'z = encoder(x)  # 784 → 64 dimensions',
          visual: 'Show image being compressed to 64 numbers'
        },
        {
          step: 'Forward Pass (Decode)',
          description: 'Reconstruct from latent code',
          code: 'x_reconstructed = decoder(z)  # 64 → 784',
          visual: 'Show 64 numbers expanding to reconstructed image'
        },
        {
          step: 'Compute Loss',
          description: 'Measure reconstruction quality',
          code: 'loss = mean_squared_error(x_original, x_reconstructed)',
          visual: 'Show difference image (x - x̂) highlighting errors'
        },
        {
          step: 'Backpropagation',
          description: 'Compute gradients through entire network',
          code: 'loss.backward()  # Gradients for encoder & decoder',
          visual: 'Show gradient flowing back through bowtie'
        },
        {
          step: 'Update Weights',
          description: 'Improve reconstruction via gradient descent',
          code: 'optimizer.step()  # Update all weights',
          visual: 'Show reconstruction quality improving'
        }
      ],

      practicalExample: {
        problem: 'Compress MNIST digit images',
        input: '28×28 = 784 pixels per image',
        latent: '64-dimensional compressed representation',
        compression: '784 → 64 is 12.25× compression',
        result: 'Reconstruct images with minimal loss',
        extension: 'Latent codes can be used for classification or visualization'
      }
    },

    {
      id: 'vae',
      name: 'Variational Autoencoder (VAE)',
      year: '2013',
      inventor: 'Kingma & Welling',
      level: 'Advanced',
      category: 'Generative',
      description: 'Probabilistic autoencoder that learns continuous latent space for generation.',

      theory: {
        keyIdea: 'Learn distribution over latent space, not just point encodings',
        generative: 'Can sample from latent space to generate new data',
        probabilistic: 'Models p(z|x) and p(x|z) as distributions',
        breakthrough: 'Reparameterization trick enables gradient-based training'
      },

      architecture: {
        encoder: 'q(z|x) - outputs μ(x) and σ(x) for latent distribution',
        sampling: 'z = μ + σ ⊙ ε, where ε ~ N(0,1)',
        decoder: 'p(x|z) - reconstructs x from sampled z',
        latent: 'Learned as Gaussian distributions, not fixed points'
      },

      mathematics: {
        objective: {
          elbo: 'ELBO = E_q[log p(x|z)] - KL(q(z|x) || p(z))',
          reconstruction: 'E_q[log p(x|z)] ≈ -||x - x̂||² (reconstruction loss)',
          regularization: 'KL(q(z|x) || p(z)) keeps latent distribution close to N(0,1)',
          maximize: 'Maximize ELBO = minimize -ELBO'
        },
        reparameterization: {
          problem: 'Cannot backprop through stochastic sampling',
          solution: 'z = μ + σ ⊙ ε where ε ~ N(0,1)',
          gradient: 'Now can compute ∂L/∂μ and ∂L/∂σ'
        },
        kl: {
          formula: 'KL = -½ Σ(1 + log(σ²) - μ² - σ²)',
          interpretation: 'Penalty for deviating from standard normal'
        },
        generation: {
          sample: 'z ~ N(0,1)',
          decode: 'x_new = decoder(z)',
          result: 'Novel generated sample'
        }
      },

      visualDirection: {
        architecture: [
          'Input → Encoder → [μ network] → μ',
          '                  [σ network] → σ',
          'Sample: z = μ + σ⊙ε (show ε ~ N(0,1) as input)',
          'z → Decoder → Reconstructed output',
          'Show the "reparameterization trick" box clearly'
        ],
        latentSpace: [
          'Draw 2D latent space as smooth manifold',
          'Show regions corresponding to different data types',
          'Demonstrate smooth interpolation between points',
          'Sample random z, show decoded images',
          'Contrast with regular AE: discrete clusters vs continuous'
        ],
        generation: [
          'Show grid of random z samples from N(0,1)',
          'For each z, show decoded image',
          'Demonstrate variety of generated samples',
          'Show interpolation: z₁ → intermediate → z₂ produces morph'
        ]
      },

      stepByStep: [
        {
          step: 'Encode to Distribution',
          description: 'Encoder outputs mean μ and std σ',
          code: 'mu, log_var = encoder(x)\nsigma = exp(0.5 * log_var)',
          visual: 'Show input mapping to μ and σ vectors'
        },
        {
          step: 'Reparameterization',
          description: 'Sample z using reparameterization trick',
          code: 'epsilon = torch.randn_like(sigma)\nz = mu + sigma * epsilon',
          visual: 'Show sampling process: μ + σ×ε'
        },
        {
          step: 'Decode',
          description: 'Reconstruct from sampled latent code',
          code: 'x_reconstructed = decoder(z)',
          visual: 'Show z being decoded to image'
        },
        {
          step: 'Reconstruction Loss',
          description: 'Measure how well we reconstructed',
          code: 'recon_loss = F.mse_loss(x_reconstructed, x)',
          visual: 'Show comparison between input and output'
        },
        {
          step: 'KL Divergence',
          description: 'Regularize latent distribution',
          code: 'kl_loss = -0.5 * sum(1 + log_var - mu**2 - exp(log_var))',
          visual: 'Show distribution q(z|x) vs standard normal p(z)'
        },
        {
          step: 'Total Loss & Update',
          description: 'Combine losses and update weights',
          code: 'loss = recon_loss + beta * kl_loss\nloss.backward()',
          visual: 'Show both loss components, total loss decreasing'
        }
      ],

      practicalExample: {
        problem: 'Generate new face images',
        training: 'Train on CelebA dataset',
        latent: '128-dimensional continuous space',
        generation: 'Sample z ~ N(0,1), decode to 64×64 face',
        interpolation: 'Smoothly morph between two faces by interpolating latent codes',
        application: 'Image generation, style transfer, data augmentation'
      }
    }
  ];

  const codeExamples = [
    {
      id: 'perceptron-code',
      title: 'Perceptron - Binary Classification',
      architecture: 'Perceptron',
      difficulty: 'Beginner',
      problem: 'Classify 2D points into two classes (AND gate logic)',
      
      description: 'Implement a perceptron from scratch to learn the AND logical operation. This demonstrates basic supervised learning with a single neuron.',
      
      dataset: {
        description: 'AND gate truth table',
        inputs: '[[0,0], [0,1], [1,0], [1,1]]',
        outputs: '[0, 0, 0, 1]',
        visualization: 'Points (0,0), (0,1), (1,0) in class 0; point (1,1) in class 1'
      },

      code: `import numpy as np
import matplotlib.pyplot as plt

class Perceptron:
    """
    Simple Perceptron for binary classification
    
    Parameters:
    -----------
    learning_rate : float
        Step size for weight updates (typically 0.01 to 0.1)
    n_iterations : int
        Number of training epochs
    """
    
    def __init__(self, learning_rate=0.1, n_iterations=100):
        self.lr = learning_rate
        self.n_iterations = n_iterations
        self.weights = None
        self.bias = None
        self.errors = []  # Track errors per epoch
        
    def activation(self, z):
        """
        Step activation function
        Returns 1 if z >= 0, else 0
        """
        return np.where(z >= 0, 1, 0)
    
    def predict(self, X):
        """
        Make predictions for input X
        
        Formula: z = w·x + b
        Output: activation(z)
        """
        z = np.dot(X, self.weights) + self.bias
        return self.activation(z)
    
    def fit(self, X, y):
        """
        Train the perceptron using the perceptron learning rule
        
        Update rule: 
        w_i = w_i + lr * (y_true - y_pred) * x_i
        b = b + lr * (y_true - y_pred)
        """
        n_samples, n_features = X.shape
        
        # Initialize weights and bias
        self.weights = np.zeros(n_features)
        self.bias = 0
        
        # Training loop
        for epoch in range(self.n_iterations):
            errors = 0
            
            for i in range(n_samples):
                # Get single sample
                xi = X[i]
                yi = y[i]
                
                # Forward pass
                z = np.dot(xi, self.weights) + self.bias
                y_pred = self.activation(z)
                
                # Compute error
                error = yi - y_pred
                
                # Update weights and bias if there's an error
                if error != 0:
                    self.weights += self.lr * error * xi
                    self.bias += self.lr * error
                    errors += abs(error)
            
            self.errors.append(errors)
            
            # Print progress every 20 epochs
            if (epoch + 1) % 20 == 0:
                print(f"Epoch {epoch+1}/{self.n_iterations}, Errors: {errors}")
        
        return self

# ============================================
# MAIN: Train Perceptron on AND Gate
# ============================================

# Create AND gate dataset
X = np.array([[0, 0],   # Input 1
              [0, 1],   # Input 2
              [1, 0],   # Input 3
              [1, 1]])  # Input 4

y = np.array([0, 0, 0, 1])  # AND outputs

print("Training Perceptron on AND gate...")
print("="*50)

# Create and train perceptron
perceptron = Perceptron(learning_rate=0.1, n_iterations=100)
perceptron.fit(X, y)

print("\\nTraining complete!")
print("="*50)
print(f"Final weights: {perceptron.weights}")
print(f"Final bias: {perceptron.bias}")

# Test the perceptron
print("\\nTesting predictions:")
print("="*50)
predictions = perceptron.predict(X)

for i in range(len(X)):
    z = np.dot(X[i], perceptron.weights) + perceptron.bias
    print(f"Input: {X[i]} -> z={z:.3f} -> Prediction: {predictions[i]}, True: {y[i]}")

# Calculate accuracy
accuracy = np.mean(predictions == y) * 100
print(f"\\nAccuracy: {accuracy}%")

# ============================================
# VISUALIZATION
# ============================================

# Plot 1: Decision boundary
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.scatter(X[y==0, 0], X[y==0, 1], c='blue', marker='o', s=100, label='Class 0', edgecolors='k')
plt.scatter(X[y==1, 0], X[y==1, 1], c='red', marker='s', s=100, label='Class 1', edgecolors='k')

# Plot decision boundary: w1*x1 + w2*x2 + b = 0
# Solving for x2: x2 = -(w1*x1 + b) / w2
if perceptron.weights[1] != 0:
    x1_boundary = np.linspace(-0.5, 1.5, 100)
    x2_boundary = -(perceptron.weights[0] * x1_boundary + perceptron.bias) / perceptron.weights[1]
    plt.plot(x1_boundary, x2_boundary, 'k--', linewidth=2, label='Decision Boundary')

plt.xlabel('x1')
plt.ylabel('x2')
plt.title('Perceptron Decision Boundary')
plt.legend()
plt.grid(True, alpha=0.3)
plt.xlim(-0.5, 1.5)
plt.ylim(-0.5, 1.5)

# Plot 2: Training errors over time
plt.subplot(1, 2, 2)
plt.plot(range(1, len(perceptron.errors) + 1), perceptron.errors, 'b-', linewidth=2)
plt.xlabel('Epoch')
plt.ylabel('Number of Errors')
plt.title('Training Progress')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('perceptron_results.png', dpi=150, bbox_inches='tight')
print("\\nVisualization saved as 'perceptron_results.png'")
plt.show()

# ============================================
# MATHEMATICAL EXPLANATION
# ============================================
print("\\n" + "="*50)
print("MATHEMATICAL EXPLANATION")
print("="*50)
print("""
Decision Boundary: w1*x1 + w2*x2 + b = 0
Rearranged: x2 = -(w1*x1 + b) / w2

For our learned weights:
w1 = {:.3f}, w2 = {:.3f}, b = {:.3f}

Decision line: x2 = -{:.3f}*x1 - {:.3f}

This line separates:
- Class 0 (below line): (0,0), (0,1), (1,0)
- Class 1 (above line): (1,1)

The perceptron successfully learned the AND logic!
""".format(perceptron.weights[0], perceptron.weights[1], perceptron.bias,
           perceptron.weights[0]/perceptron.weights[1] if perceptron.weights[1] != 0 else 0,
           perceptron.bias/perceptron.weights[1] if perceptron.weights[1] != 0 else 0))`,

      explanation: [
        {
          section: 'Class Definition',
          code: 'class Perceptron:',
          explanation: 'We define a Perceptron class that encapsulates the neuron\'s behavior including weights, bias, and learning algorithm.'
        },
        {
          section: 'Initialization',
          code: '__init__(self, learning_rate=0.1, n_iterations=100)',
          explanation: 'Constructor sets learning rate (how big the weight updates are) and number of training iterations. Larger learning rate = faster but less stable training.'
        },
        {
          section: 'Activation Function',
          code: 'return np.where(z >= 0, 1, 0)',
          explanation: 'Step function: outputs 1 if weighted sum is non-negative, 0 otherwise. This creates binary classification.'
        },
        {
          section: 'Prediction',
          code: 'z = np.dot(X, self.weights) + self.bias',
          explanation: 'Compute weighted sum: z = w₁x₁ + w₂x₂ + b. Then apply activation to get prediction (0 or 1).'
        },
        {
          section: 'Weight Initialization',
          code: 'self.weights = np.zeros(n_features)',
          explanation: 'Start with zero weights. Could also use small random values. Bias also starts at zero.'
        },
        {
          section: 'Training Loop',
          code: 'for epoch in range(self.n_iterations):',
          explanation: 'Iterate through entire dataset multiple times. Each pass is called an epoch.'
        },
        {
          section: 'Perceptron Learning Rule',
          code: 'self.weights += self.lr * error * xi',
          explanation: 'If prediction is wrong, adjust weights: Δw = η(y_true - y_pred)x. This moves decision boundary toward correct classification.'
        },
        {
          section: 'Error Tracking',
          code: 'self.errors.append(errors)',
          explanation: 'Track number of misclassifications per epoch. Should decrease to zero for linearly separable data.'
        },
        {
          section: 'Dataset',
          code: 'X = np.array([[0,0], [0,1], [1,0], [1,1]])',
          explanation: 'AND gate truth table: only (1,1) produces output 1. This is linearly separable.'
        },
        {
          section: 'Decision Boundary',
          code: 'x2 = -(w1*x1 + b) / w2',
          explanation: 'The line w₁x₁ + w₂x₂ + b = 0 separates the two classes. We plot this to visualize what perceptron learned.'
        }
      ],

      expectedOutput: `Training Perceptron on AND gate...
==================================================
Epoch 20/100, Errors: 0
Epoch 40/100, Errors: 0
...
Training complete!
==================================================
Final weights: [0.3 0.3]
Final bias: -0.4

Testing predictions:
==================================================
Input: [0 0] -> z=-0.400 -> Prediction: 0, True: 0
Input: [0 1] -> z=-0.100 -> Prediction: 0, True: 0
Input: [1 0] -> z=-0.100 -> Prediction: 0, True: 0
Input: [1 1] -> z=0.200 -> Prediction: 1, True: 1

Accuracy: 100%`,

      runInstructions: [
        'Save code as perceptron_demo.py',
        'Run: python perceptron_demo.py',
        'View generated plot showing decision boundary',
        'Observe how errors decrease to zero',
        'Try changing learning_rate or testing with XOR (will fail!)'
      ]
    },

    {
      id: 'mlp-mnist',
      title: 'MLP - MNIST Digit Classification',
      architecture: 'Multilayer Perceptron',
      difficulty: 'Intermediate',
      problem: 'Classify handwritten digits (0-9) using real MNIST dataset',

      description: 'Build a deep MLP using PyTorch to classify MNIST digits. Demonstrates data loading, network architecture, training loop, and evaluation.',

      dataset: {
        description: 'MNIST handwritten digits',
        samples: '60,000 training + 10,000 test images',
        imageSize: '28×28 grayscale (784 pixels)',
        classes: '10 classes (digits 0-9)'
      },

      code: `import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms
from torch.utils.data import DataLoader
import matplotlib.pyplot as plt
import numpy as np

# ============================================
# NETWORK ARCHITECTURE
# ============================================

class MLP(nn.Module):
    """
    Multilayer Perceptron for MNIST classification
    
    Architecture:
    - Input: 784 (28x28 flattened)
    - Hidden 1: 512 neurons + ReLU
    - Dropout: 0.2
    - Hidden 2: 256 neurons + ReLU
    - Dropout: 0.2
    - Hidden 3: 128 neurons + ReLU
    - Output: 10 classes + Softmax (via CrossEntropyLoss)
    
    Total parameters: ~500K
    """
    
    def __init__(self):
        super(MLP, self).__init__()
        
        self.network = nn.Sequential(
            # Input layer to Hidden 1
            nn.Linear(784, 512),  # 784*512 + 512 = 401,920 params
            nn.ReLU(),
            nn.Dropout(0.2),
            
            # Hidden 1 to Hidden 2
            nn.Linear(512, 256),  # 512*256 + 256 = 131,328 params
            nn.ReLU(),
            nn.Dropout(0.2),
            
            # Hidden 2 to Hidden 3
            nn.Linear(256, 128),  # 256*128 + 128 = 32,896 params
            nn.ReLU(),
            
            # Hidden 3 to Output
            nn.Linear(128, 10)    # 128*10 + 10 = 1,290 params
        )
        
    def forward(self, x):
        """
        Forward pass through network
        
        Input x: batch of flattened images (batch_size, 784)
        Output: class scores (batch_size, 10)
        """
        x = x.view(x.size(0), -1)  # Flatten: (batch, 1, 28, 28) -> (batch, 784)
        return self.network(x)

# ============================================
# DATA LOADING
# ============================================

def load_data(batch_size=128):
    """
    Load MNIST dataset with normalization
    
    Normalization: (pixel - mean) / std
    MNIST mean=0.1307, std=0.3081 (precomputed)
    """
    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize((0.1307,), (0.3081,))
    ])
    
    train_dataset = datasets.MNIST(
        root='./data',
        train=True,
        download=True,
        transform=transform
    )
    
    test_dataset = datasets.MNIST(
        root='./data',
        train=False,
        download=True,
        transform=transform
    )
    
    train_loader = DataLoader(
        train_dataset,
        batch_size=batch_size,
        shuffle=True
    )
    
    test_loader = DataLoader(
        test_dataset,
        batch_size=batch_size,
        shuffle=False
    )
    
    return train_loader, test_loader

# ============================================
# TRAINING FUNCTION
# ============================================

def train_epoch(model, train_loader, criterion, optimizer, device):
    """
    Train for one epoch
    
    Returns: average loss for epoch
    """
    model.train()  # Set to training mode (enables dropout)
    total_loss = 0
    
    for batch_idx, (data, target) in enumerate(train_loader):
        # Move data to device (GPU if available)
        data, target = data.to(device), target.to(device)
        
        # Zero gradients
        optimizer.zero_grad()
        
        # Forward pass
        output = model(data)
        
        # Compute loss
        loss = criterion(output, target)
        
        # Backward pass
        loss.backward()
        
        # Update weights
        optimizer.step()
        
        total_loss += loss.item()
        
        # Print progress every 100 batches
        if batch_idx % 100 == 0:
            print(f'  Batch {batch_idx}/{len(train_loader)}, Loss: {loss.item():.4f}')
    
    return total_loss / len(train_loader)

# ============================================
# EVALUATION FUNCTION
# ============================================

def evaluate(model, test_loader, criterion, device):
    """
    Evaluate model on test set
    
    Returns: average loss, accuracy
    """
    model.eval()  # Set to evaluation mode (disables dropout)
    total_loss = 0
    correct = 0
    
    with torch.no_grad():  # No gradient computation needed
        for data, target in test_loader:
            data, target = data.to(device), target.to(device)
            
            # Forward pass
            output = model(data)
            
            # Compute loss
            total_loss += criterion(output, target).item()
            
            # Get predictions
            pred = output.argmax(dim=1, keepdim=True)
            correct += pred.eq(target.view_as(pred)).sum().item()
    
    avg_loss = total_loss / len(test_loader)
    accuracy = 100. * correct / len(test_loader.dataset)
    
    return avg_loss, accuracy

# ============================================
# MAIN TRAINING LOOP
# ============================================

def main():
    # Set device
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"Using device: {device}\\n")
    
    # Hyperparameters
    batch_size = 128
    learning_rate = 0.001
    num_epochs = 10
    
    # Load data
    print("Loading MNIST dataset...")
    train_loader, test_loader = load_data(batch_size)
    print(f"Training samples: {len(train_loader.dataset)}")
    print(f"Test samples: {len(test_loader.dataset)}\\n")
    
    # Create model
    model = MLP().to(device)
    
    # Count parameters
    total_params = sum(p.numel() for p in model.parameters())
    print(f"Model created with {total_params:,} parameters\\n")
    
    # Loss and optimizer
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=learning_rate)
    
    # Training loop
    train_losses = []
    test_losses = []
    test_accuracies = []
    
    print("Starting training...\\n")
    
    for epoch in range(1, num_epochs + 1):
        print(f"Epoch {epoch}/{num_epochs}")
        print("-" * 50)
        
        # Train
        train_loss = train_epoch(model, train_loader, criterion, optimizer, device)
        train_losses.append(train_loss)
        
        # Evaluate
        test_loss, test_acc = evaluate(model, test_loader, criterion, device)
        test_losses.append(test_loss)
        test_accuracies.append(test_acc)
        
        print(f"Train Loss: {train_loss:.4f}")
        print(f"Test Loss: {test_loss:.4f}, Test Accuracy: {test_acc:.2f}%\\n")
    
    # ============================================
    # VISUALIZATION
    # ============================================
    
    fig, axes = plt.subplots(1, 3, figsize=(15, 4))
    
    # Plot 1: Training and test loss
    axes[0].plot(range(1, num_epochs + 1), train_losses, 'b-', label='Train Loss', linewidth=2)
    axes[0].plot(range(1, num_epochs + 1), test_losses, 'r-', label='Test Loss', linewidth=2)
    axes[0].set_xlabel('Epoch')
    axes[0].set_ylabel('Loss')
    axes[0].set_title('Training Progress')
    axes[0].legend()
    axes[0].grid(True, alpha=0.3)
    
    # Plot 2: Test accuracy
    axes[1].plot(range(1, num_epochs + 1), test_accuracies, 'g-', linewidth=2)
    axes[1].set_xlabel('Epoch')
    axes[1].set_ylabel('Accuracy (%)')
    axes[1].set_title('Test Accuracy')
    axes[1].grid(True, alpha=0.3)
    
    # Plot 3: Sample predictions
    model.eval()
    with torch.no_grad():
        # Get a batch of test data
        test_data, test_labels = next(iter(test_loader))
        test_data, test_labels = test_data.to(device), test_labels.to(device)
        
        # Make predictions
        outputs = model(test_data)
        predictions = outputs.argmax(dim=1)
        
        # Show first 9 samples
        axes[2].axis('off')
        for i in range(9):
            plt.subplot(3, 3, i + 1)
            plt.imshow(test_data[i].cpu().squeeze(), cmap='gray')
            color = 'green' if predictions[i] == test_labels[i] else 'red'
            plt.title(f'Pred: {predictions[i].item()}\\nTrue: {test_labels[i].item()}', color=color)
            plt.axis('off')
    
    plt.tight_layout()
    plt.savefig('mlp_mnist_results.png', dpi=150, bbox_inches='tight')
    print("Results saved as 'mlp_mnist_results.png'")
    plt.show()
    
    # Save model
    torch.save(model.state_dict(), 'mlp_mnist.pth')
    print("Model saved as 'mlp_mnist.pth'")
    
    return model, test_accuracies[-1]

if __name__ == '__main__':
    model, final_accuracy = main()
    print(f"\\nFinal Test Accuracy: {final_accuracy:.2f}%")`,

      explanation: [
        {
          section: 'Network Architecture',
          code: 'nn.Linear(784, 512)',
          explanation: 'Fully connected layer: 784 inputs → 512 outputs. Each output neuron connects to all 784 inputs. Parameters: 784×512 weights + 512 biases = 401,920 parameters.'
        },
        {
          section: 'ReLU Activation',
          code: 'nn.ReLU()',
          explanation: 'ReLU(x) = max(0, x). Introduces non-linearity, allowing network to learn complex patterns. Much faster than sigmoid/tanh.'
        },
        {
          section: 'Dropout',
          code: 'nn.Dropout(0.2)',
          explanation: 'Randomly zeros 20% of neurons during training. Prevents overfitting by forcing network not to rely on specific neurons.'
        },
        {
          section: 'Flattening',
          code: 'x.view(x.size(0), -1)',
          explanation: 'Reshape images from (batch, 1, 28, 28) to (batch, 784). MLP needs 1D input vectors.'
        },
        {
          section: 'Data Normalization',
          code: 'transforms.Normalize((0.1307,), (0.3081,))',
          explanation: 'Normalize pixels: (pixel - 0.1307) / 0.3081. Centers data around 0, speeds up training.'
        },
        {
          section: 'CrossEntropyLoss',
          code: 'criterion = nn.CrossEntropyLoss()',
          explanation: 'Combines LogSoftmax and NLLLoss. Perfect for multi-class classification. Measures how far predictions are from true labels.'
        },
        {
          section: 'Adam Optimizer',
          code: 'optim.Adam(model.parameters(), lr=0.001)',
          explanation: 'Adaptive learning rate optimizer. Adjusts learning rate per parameter. Generally better than SGD for deep networks.'
        },
        {
          section: 'Training Mode',
          code: 'model.train()',
          explanation: 'Enables dropout and batch normalization training behavior. Must call before training loop.'
        },
        {
          section: 'Zero Gradients',
          code: 'optimizer.zero_grad()',
          explanation: 'Clear gradients from previous iteration. PyTorch accumulates gradients by default, so must zero them.'
        },
        {
          section: 'Backward Pass',
          code: 'loss.backward()',
          explanation: 'Compute gradients via backpropagation. Automatically calculates ∂Loss/∂weight for all parameters.'
        },
        {
          section: 'Weight Update',
          code: 'optimizer.step()',
          explanation: 'Update all weights using computed gradients: w = w - lr × ∂Loss/∂w.'
        },
        {
          section: 'Evaluation Mode',
          code: 'model.eval()',
          explanation: 'Disables dropout and batch norm training mode. Use for testing/inference.'
        },
        {
          section: 'No Gradient',
          code: 'with torch.no_grad():',
          explanation: 'Disable gradient computation during evaluation. Saves memory and speeds up inference.'
        },
        {
          section: 'Get Predictions',
          code: 'pred = output.argmax(dim=1)',
          explanation: 'For each sample, find class with highest score. Argmax returns index of maximum value.'
        }
      ],

      expectedOutput: `Using device: cuda

Loading MNIST dataset...
Training samples: 60000
Test samples: 10000

Model created with 567,498 parameters

Starting training...

Epoch 1/10
--------------------------------------------------
  Batch 0/469, Loss: 2.3142
  Batch 100/469, Loss: 0.4521
  ...
Train Loss: 0.2847
Test Loss: 0.1423, Test Accuracy: 95.82%

Epoch 2/10
--------------------------------------------------
...
Train Loss: 0.1134
Test Loss: 0.0945, Test Accuracy: 97.12%

...

Epoch 10/10
--------------------------------------------------
Train Loss: 0.0234
Test Loss: 0.0721, Test Accuracy: 98.24%

Final Test Accuracy: 98.24%`,

      runInstructions: [
        'Install PyTorch: pip install torch torchvision',
        'Save code as mlp_mnist.py',
        'Run: python mlp_mnist.py',
        'First run downloads MNIST (~10MB)',
        'Training takes ~3-5 minutes on CPU, ~30s on GPU',
        'View results plot showing learning curves and sample predictions',
        'Saved model can be loaded later: model.load_state_dict(torch.load("mlp_mnist.pth"))'
      ]
    },

    {
      id: 'autoencoder-code',
      title: 'Autoencoder - Image Reconstruction & Compression',
      architecture: 'Basic Autoencoder',
      difficulty: 'Intermediate',
      problem: 'Learn compressed representation of MNIST digits and reconstruct them',

      description: 'Build an autoencoder that compresses 784-dimensional images to 32 dimensions and reconstructs them. Demonstrates unsupervised learning and dimensionality reduction.',

      code: `import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms
from torch.utils.data import DataLoader
import matplotlib.pyplot as plt
import numpy as np

# ============================================
# AUTOENCODER ARCHITECTURE
# ============================================

class Autoencoder(nn.Module):
    """
    Autoencoder for MNIST image compression
    
    Encoder: 784 → 256 → 128 → 32 (bottleneck)
    Decoder: 32 → 128 → 256 → 784
    
    Compression ratio: 784/32 = 24.5x
    """
    
    def __init__(self, latent_dim=32):
        super(Autoencoder, self).__init__()
        
        # ENCODER
        self.encoder = nn.Sequential(
            nn.Linear(784, 256),
            nn.ReLU(),
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Linear(128, latent_dim)  # Bottleneck layer
        )
        
        # DECODER  
        self.decoder = nn.Sequential(
            nn.Linear(latent_dim, 128),
            nn.ReLU(),
            nn.Linear(128, 256),
            nn.ReLU(),
            nn.Linear(256, 784),
            nn.Sigmoid()  # Output in [0,1] to match normalized images
        )
    
    def forward(self, x):
        """
        Full forward pass: encode then decode
        """
        x = x.view(x.size(0), -1)  # Flatten
        encoded = self.encoder(x)
        decoded = self.decoder(encoded)
        return decoded
    
    def encode(self, x):
        """
        Get compressed representation only
        """
        x = x.view(x.size(0), -1)
        return self.encoder(x)
    
    def decode(self, z):
        """
        Reconstruct from latent code
        """
        return self.decoder(z)

# ============================================
# TRAINING FUNCTION
# ============================================

def train_autoencoder(model, train_loader, criterion, optimizer, device, epoch):
    """
    Train autoencoder for one epoch
    """
    model.train()
    total_loss = 0
    
    for batch_idx, (data, _) in enumerate(train_loader):
        # Note: we ignore labels (second element) - unsupervised!
        data = data.to(device)
        
        # Zero gradients
        optimizer.zero_grad()
        
        # Forward pass
        reconstructed = model(data)
        
        # Compute reconstruction loss
        # Compare reconstructed image to original
        loss = criterion(reconstructed, data.view(data.size(0), -1))
        
        # Backward pass
        loss.backward()
        
        # Update weights
        optimizer.step()
        
        total_loss += loss.item()
        
        if batch_idx % 100 == 0:
            print(f'  Batch {batch_idx}/{len(train_loader)}, Loss: {loss.item():.6f}')
    
    return total_loss / len(train_loader)

# ============================================
# EVALUATION FUNCTION
# ============================================

def evaluate_autoencoder(model, test_loader, criterion, device):
    """
    Evaluate reconstruction quality on test set
    """
    model.eval()
    total_loss = 0
    
    with torch.no_grad():
        for data, _ in test_loader:
            data = data.to(device)
            reconstructed = model(data)
            loss = criterion(reconstructed, data.view(data.size(0), -1))
            total_loss += loss.item()
    
    return total_loss / len(test_loader)

# ============================================
# VISUALIZATION FUNCTIONS
# ============================================

def visualize_reconstructions(model, test_loader, device, n_samples=10):
    """
    Show original vs reconstructed images
    """
    model.eval()
    
    # Get a batch
    data, _ = next(iter(test_loader))
    data = data.to(device)
    
    with torch.no_grad():
        reconstructed = model(data)
    
    # Plot
    fig, axes = plt.subplots(2, n_samples, figsize=(n_samples*1.5, 3))
    
    for i in range(n_samples):
        # Original
        axes[0, i].imshow(data[i].cpu().squeeze(), cmap='gray')
        axes[0, i].axis('off')
        if i == 0:
            axes[0, i].set_title('Original', fontsize=10)
        
        # Reconstructed
        axes[1, i].imshow(reconstructed[i].cpu().view(28, 28), cmap='gray')
        axes[1, i].axis('off')
        if i == 0:
            axes[1, i].set_title('Reconstructed', fontsize=10)
    
    plt.tight_layout()
    return fig

def visualize_latent_space(model, test_loader, device):
    """
    Visualize 2D projection of latent space
    """
    model.eval()
    
    latent_codes = []
    labels = []
    
    with torch.no_grad():
        for data, label in test_loader:
            data = data.to(device)
            z = model.encode(data)
            latent_codes.append(z.cpu())
            labels.append(label)
    
    latent_codes = torch.cat(latent_codes, dim=0).numpy()
    labels = torch.cat(labels, dim=0).numpy()
    
    # PCA to 2D for visualization
    from sklearn.decomposition import PCA
    pca = PCA(n_components=2)
    latent_2d = pca.fit_transform(latent_codes)
    
    # Plot
    fig, ax = plt.subplots(figsize=(8, 6))
    scatter = ax.scatter(latent_2d[:, 0], latent_2d[:, 1], 
                        c=labels, cmap='tab10', alpha=0.6, s=5)
    plt.colorbar(scatter, label='Digit')
    ax.set_xlabel('First Principal Component')
    ax.set_ylabel('Second Principal Component')
    ax.set_title('2D Projection of Latent Space (colored by digit)')
    ax.grid(True, alpha=0.3)
    
    return fig

# ============================================
# MAIN
# ============================================

def main():
    # Device
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"Using device: {device}\\n")
    
    # Hyperparameters
    latent_dim = 32
    batch_size = 128
    learning_rate = 0.001
    num_epochs = 20
    
    # Data loading
    transform = transforms.Compose([
        transforms.ToTensor(),
    ])
    
    train_dataset = datasets.MNIST('./data', train=True, download=True, transform=transform)
    test_dataset = datasets.MNIST('./data', train=False, transform=transform)
    
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
    test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False)
    
    print(f"Dataset loaded: {len(train_dataset)} training, {len(test_dataset)} test samples\\n")
    
    # Create model
    model = Autoencoder(latent_dim=latent_dim).to(device)
    
    total_params = sum(p.numel() for p in model.parameters())
    encoder_params = sum(p.numel() for p in model.encoder.parameters())
    decoder_params = sum(p.numel() for p in model.decoder.parameters())
    
    print(f"Model Architecture:")
    print(f"  Latent dimension: {latent_dim}")
    print(f"  Compression ratio: {784/latent_dim:.1f}x")
    print(f"  Total parameters: {total_params:,}")
    print(f"  Encoder parameters: {encoder_params:,}")
    print(f"  Decoder parameters: {decoder_params:,}\\n")
    
    # Loss and optimizer
    criterion = nn.MSELoss()
    optimizer = optim.Adam(model.parameters(), lr=learning_rate)
    
    # Training
    train_losses = []
    test_losses = []
    
    print("Starting training...\\n")
    
    for epoch in range(1, num_epochs + 1):
        print(f"Epoch {epoch}/{num_epochs}")
        print("-" * 50)
        
        train_loss = train_autoencoder(model, train_loader, criterion, optimizer, device, epoch)
        test_loss = evaluate_autoencoder(model, test_loader, criterion, device)
        
        train_losses.append(train_loss)
        test_losses.append(test_loss)
        
        print(f"Train Loss: {train_loss:.6f}")
        print(f"Test Loss: {test_loss:.6f}\\n")
    
    # Visualizations
    print("Generating visualizations...")
    
    # Plot 1: Training curves
    plt.figure(figsize=(10, 4))
    
    plt.subplot(1, 2, 1)
    plt.plot(range(1, num_epochs + 1), train_losses, 'b-', label='Train Loss', linewidth=2)
    plt.plot(range(1, num_epochs + 1), test_losses, 'r-', label='Test Loss', linewidth=2)
    plt.xlabel('Epoch')
    plt.ylabel('MSE Loss')
    plt.title('Training Progress')
    plt.legend()
    plt.grid(True, alpha=0.3)
    
    # Plot 2: Compression visualization
    plt.subplot(1, 2, 2)
    sizes = [784, latent_dim]
    labels_bar = ['Original\\n(784 dims)', f'Compressed\\n({latent_dim} dims)']
    colors = ['blue', 'red']
    plt.bar(labels_bar, sizes, color=colors, alpha=0.7)
    plt.ylabel('Dimensions')
    plt.title(f'Compression: {784/latent_dim:.1f}x')
    plt.grid(True, alpha=0.3, axis='y')
    
    plt.tight_layout()
    plt.savefig('autoencoder_training.png', dpi=150)
    
    # Plot reconstructions
    fig_recon = visualize_reconstructions(model, test_loader, device, n_samples=10)
    fig_recon.savefig('autoencoder_reconstructions.png', dpi=150)
    
    # Plot latent space
    fig_latent = visualize_latent_space(model, test_loader, device)
    fig_latent.savefig('autoencoder_latent_space.png', dpi=150)
    
    print("Visualizations saved!")
    print("  - autoencoder_training.png")
    print("  - autoencoder_reconstructions.png")
    print("  - autoencoder_latent_space.png")
    
    # Save model
    torch.save(model.state_dict(), 'autoencoder.pth')
    print("\\nModel saved as 'autoencoder.pth'")
    
    # Test compression
    print("\\n" + "="*50)
    print("COMPRESSION DEMONSTRATION")
    print("="*50)
    
    model.eval()
    test_data, test_label = next(iter(test_loader))
    test_data = test_data[0:1].to(device)  # Take first image
    
    with torch.no_grad():
        # Original
        original = test_data.view(-1).cpu().numpy()
        
        # Compressed
        latent_code = model.encode(test_data).cpu().numpy()
        
        # Reconstructed
        reconstructed = model(test_data).view(-1).cpu().numpy()
        
        # Compute reconstruction error
        mse = np.mean((original - reconstructed) ** 2)
    
    print(f"Original size: {len(original)} values")
    print(f"Compressed size: {len(latent_code[0])} values")
    print(f"Compression ratio: {len(original)/len(latent_code[0]):.1f}x")
    print(f"Reconstruction MSE: {mse:.6f}")
    print(f"\\nLatent code (first 10 values): {latent_code[0][:10]}")
    
    plt.show()
    
    return model

if __name__ == '__main__':
    model = main()`,

      explanation: [
        {
          section: 'Encoder Structure',
          code: 'nn.Linear(784, 256) → ReLU → Linear(256, 128) → ReLU → Linear(128, 32)',
          explanation: 'Progressively compress input: 784 → 256 → 128 → 32. Each layer reduces dimensionality, forcing network to learn compact representation.'
        },
        {
          section: 'Decoder Structure',
          code: 'Linear(32, 128) → ReLU → Linear(128, 256) → ReLU → Linear(256, 784) → Sigmoid',
          explanation: 'Mirror of encoder. Expands compressed code back to original dimensions. Sigmoid ensures output in [0,1] range.'
        },
        {
          section: 'Bottleneck',
          code: 'latent_dim=32',
          explanation: 'Smallest layer (32 neurons) forces compression. Cannot memorize inputs - must learn meaningful features.'
        },
        {
          section: 'MSE Loss',
          code: 'criterion = nn.MSELoss()',
          explanation: 'Mean Squared Error: (1/n)Σ(original - reconstructed)². Measures pixel-wise reconstruction quality.'
        },
        {
          section: 'Unsupervised Learning',
          code: 'for data, _ in train_loader:',
          explanation: 'Ignore labels (underscore). Input IS the target. Network learns structure of data without labels.'
        },
        {
          section: 'Encode Method',
          code: 'def encode(self, x): return self.encoder(x)',
          explanation: 'Get compressed representation only. Useful for visualization or using as features for other tasks.'
        },
        {
          section: 'Decode Method',
          code: 'def decode(self, z): return self.decoder(z)',
          explanation: 'Reconstruct from latent code. Can decode arbitrary latent codes (not necessarily from real images).'
        },
        {
          section: 'Compression Ratio',
          code: '784/32 = 24.5x',
          explanation: 'Original: 784 numbers. Compressed: 32 numbers. ~96% reduction in size while preserving visual information.'
        },
        {
          section: 'Latent Space Visualization',
          code: 'pca.fit_transform(latent_codes)',
          explanation: 'Project 32D latent codes to 2D using PCA. Shows how network organizes different digits in latent space.'
        }
      ],

      expectedOutput: `Using device: cuda

Dataset loaded: 60000 training, 10000 test samples

Model Architecture:
  Latent dimension: 32
  Compression ratio: 24.5x
  Total parameters: 464,416
  Encoder parameters: 232,128
  Decoder parameters: 232,288

Starting training...

Epoch 1/20
--------------------------------------------------
  Batch 0/469, Loss: 0.070234
  ...
Train Loss: 0.028456
Test Loss: 0.022341

...

Epoch 20/20
Train Loss: 0.008234
Test Loss: 0.007891

COMPRESSION DEMONSTRATION
==================================================
Original size: 784 values
Compressed size: 32 values
Compression ratio: 24.5x
Reconstruction MSE: 0.007891
Latent code: [0.23, -1.45, 0.89, ...]`,

      runInstructions: [
        'Install requirements: pip install torch torchvision scikit-learn',
        'Save as autoencoder_demo.py',
        'Run: python autoencoder_demo.py',
        'Training takes ~5 minutes on CPU, ~1 minute on GPU',
        'Check generated visualizations showing:',
        '  1. Training curves (loss decreasing)',
        '  2. Original vs reconstructed digits (should look similar)',
        '  3. Latent space colored by digit (clusters visible)',
        'Try changing latent_dim (8, 16, 64) to see effect on reconstruction quality'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8 border-t-4 border-blue-600">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-xl shadow-lg">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Feedforward Neural Networks</h1>
                <p className="text-gray-600 mt-1">Theory, Mathematics, and Python Implementation</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-lg border-2 border-blue-300">
              <p className="text-sm font-semibold text-blue-900">Generated by</p>
              <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Blockchain Data Intelligence Lab
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-300">
            <p className="text-sm text-gray-700">
              <strong className="text-amber-900">Complete Learning Path:</strong> Master feedforward networks from theory to implementation with real Python code examples
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-8 flex flex-wrap gap-2">
          {['introduction', 'theory', 'code', 'comparison'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-[140px] py-3 px-4 rounded-lg font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab === 'code' && <Code className="w-4 h-4 inline mr-2" />}
              {tab === 'theory' && <BookOpen className="w-4 h-4 inline mr-2" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Tabs */}
        {activeTab === 'introduction' && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Feedforward Neural Networks</h2>
            
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                This comprehensive course covers classic feedforward and autoencoder architectures. You'll learn theory, mathematics, 
                and practical implementation with real Python code.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    What You'll Learn
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Theory:</strong> Mathematical foundations and intuitions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Architectures:</strong> Perceptron, MLP, RBFN, Autoencoders, VAE</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Mathematics:</strong> Step-by-step derivations with examples</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Implementation:</strong> Complete Python code with explanations</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Code className="w-6 h-6 text-purple-600" />
                    Code Examples
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Play className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Perceptron:</strong> Binary classification from scratch</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Play className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span><strong>MLP:</strong> MNIST digit classification (98%+ accuracy)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Play className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Autoencoder:</strong> Image compression & reconstruction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Play className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>All with line-by-line explanations</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 border-2 border-green-300 p-6 rounded-xl mb-6">
                <h3 className="text-xl font-bold text-green-900 mb-3">Architectures Covered</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  {architectures.map((arch) => (
                    <div key={arch.id} className="bg-white p-3 rounded-lg">
                      <p className="font-semibold text-gray-900">{arch.name}</p>
                      <p className="text-xs text-gray-600">{arch.year} • {arch.level}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'theory' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Architecture</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {architectures.map((arch, idx) => (
                  <button
                    key={arch.id}
                    onClick={() => setActiveArchitecture(idx)}
                    className={`p-4 rounded-lg text-left transition-all ${
                      activeArchitecture === idx
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="text-sm font-semibold mb-1">{arch.name}</div>
                    <div className="text-xs opacity-75">{arch.year}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Architecture Detail */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              {architectures[activeArchitecture] && (
                <>
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="text-3xl font-bold text-gray-900">{architectures[activeArchitecture].name}</h2>
                      <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                        architectures[activeArchitecture].level === 'Beginner' ? 'bg-green-100 text-green-800' :
                        architectures[activeArchitecture].level === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {architectures[activeArchitecture].level}
                      </span>
                    </div>
                    <p className="text-gray-600">{architectures[activeArchitecture].year} • {architectures[activeArchitecture].inventor}</p>
                    <p className="text-lg text-gray-700 mt-3">{architectures[activeArchitecture].description}</p>
                  </div>

                  {/* Theory */}
                  <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600 mb-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">Theory</h3>
                    <div className="space-y-3">
                      {Object.entries(architectures[activeArchitecture].theory).map(([key, value]) => (
                        <div key={key} className="bg-white p-4 rounded-lg">
                          <p className="font-semibold text-gray-900 mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                          {Array.isArray(value) ? (
                            <ul className="space-y-1">
                              {value.map((item, i) => (
                                <li key={i} className="text-sm text-gray-700">• {item}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-700">{value}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mathematics - Detailed sections continue... */}
                  <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-600 mb-6">
                    <h3 className="text-xl font-bold text-purple-900 mb-4">Mathematics</h3>
                    <div className="space-y-4">
                      {Object.entries(architectures[activeArchitecture].mathematics).map(([key, value]) => (
                        <div key={key} className="bg-white p-5 rounded-lg">
                          <h4 className="font-bold text-gray-900 mb-3 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
                          {typeof value === 'object' && !Array.isArray(value) ? (
                            <div className="space-y-2">
                              {Object.entries(value).map(([k, v]) => (
                                <div key={k} className="bg-purple-50 p-3 rounded">
                                  <p className="font-semibold text-sm text-gray-900 mb-1">{k}:</p>
                                  <p className="text-sm text-gray-700 font-mono">{v}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm font-mono bg-purple-50 p-3 rounded">{value}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual Direction */}
                  {architectures[activeArchitecture].visualDirection && (
                    <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-600 mb-6">
                      <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                        <Eye className="w-6 h-6" />
                        Visual Guide - How to Draw
                      </h3>
                      <div className="space-y-4">
                        {Object.entries(architectures[activeArchitecture].visualDirection).map(([key, value]) => (
                          <div key={key} className="bg-white p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
                            {Array.isArray(value) ? (
                              <ol className="space-y-2">
                                {value.map((item, i) => (
                                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                    <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0">
                                      {i + 1}
                                    </span>
                                    <span className="pt-0.5">{item}</span>
                                  </li>
                                ))}
                              </ol>
                            ) : (
                              <p className="text-sm text-gray-700 italic">{value}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step by Step */}
                  {architectures[activeArchitecture].stepByStep && (
                    <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-amber-600">
                      <h3 className="text-xl font-bold text-amber-900 mb-4">Step-by-Step Process</h3>
                      <div className="space-y-4">
                        {architectures[activeArchitecture].stepByStep.map((step, idx) => (
                          <div key={idx} className="bg-white p-5 rounded-lg">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                {idx + 1}
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900">{step.step}</h4>
                                <p className="text-sm text-gray-700 mt-1">{step.description}</p>
                              </div>
                            </div>
                            <div className="bg-gray-900 p-3 rounded mt-3">
                              <code className="text-green-400 text-xs">{step.code}</code>
                            </div>
                            <p className="text-xs text-gray-600 mt-2 italic">Visual: {step.visual}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Python Code Examples</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {codeExamples.map((example, idx) => (
                  <button
                    key={example.id}
                    onClick={() => setActiveCodeExample(idx)}
                    className={`p-4 rounded-lg text-left transition-all ${
                      activeCodeExample === idx
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Terminal className="w-5 h-5" />
                      <span className="font-bold">{example.title.split(' - ')[0]}</span>
                    </div>
                    <p className="text-xs opacity-90 mb-2">{example.title.split(' - ')[1]}</p>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      activeCodeExample === idx ? 'bg-white/20' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {example.difficulty}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Code Example Detail */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              {codeExamples[activeCodeExample] && (
                <>
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{codeExamples[activeCodeExample].title}</h2>
                    <p className="text-gray-600 mb-4">{codeExamples[activeCodeExample].description}</p>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="font-bold text-gray-900 mb-2">Problem:</h3>
                      <p className="text-gray-700">{codeExamples[activeCodeExample].problem}</p>
                    </div>
                  </div>

                  {/* Dataset Info */}
                  <div className="bg-green-50 p-5 rounded-xl border-l-4 border-green-600 mb-6">
                    <h3 className="font-bold text-green-900 mb-3">Dataset</h3>
                    <div className="space-y-2 text-sm">
                      {Object.entries(codeExamples[activeCodeExample].dataset).map(([key, value]) => (
                        <p key={key} className="text-gray-700">
                          <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Full Code */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Code className="w-6 h-6" />
                        Complete Python Code
                      </h3>
                      <button
                        onClick={() => navigator.clipboard.writeText(codeExamples[activeCodeExample].code)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                      >
                        <Copy className="w-4 h-4" />
                        Copy Code
                      </button>
                    </div>
                    <div className="bg-gray-900 p-6 rounded-xl overflow-x-auto">
                      <pre className="text-green-400 text-sm">
                        <code>{codeExamples[activeCodeExample].code}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Code Explanation */}
                  <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-600 mb-6">
                    <h3 className="text-xl font-bold text-purple-900 mb-4">Code Explanation</h3>
                    <div className="space-y-4">
                      {codeExamples[activeCodeExample].explanation.map((item, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg">
                          <h4 className="font-bold text-gray-900 mb-2">{item.section}</h4>
                          <div className="bg-gray-900 p-3 rounded mb-2">
                            <code className="text-green-400 text-xs">{item.code}</code>
                          </div>
                          <p className="text-sm text-gray-700">{item.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expected Output */}
                  <div className="bg-gray-900 p-6 rounded-xl mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Expected Output</h3>
                    <pre className="text-green-400 text-sm whitespace-pre-wrap">
                      {codeExamples[activeCodeExample].expectedOutput}
                    </pre>
                  </div>

                  {/* Run Instructions */}
                  <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600">
                    <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                      <Play className="w-6 h-6" />
                      How to Run
                    </h3>
                    <ol className="space-y-3">
                      {codeExamples[activeCodeExample].runInstructions.map((instruction, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {idx + 1}
                          </span>
                          <p className="text-gray-700 pt-1">{instruction}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Architecture Comparison</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <th className="p-3 text-left">Architecture</th>
                    <th className="p-3 text-left">Year</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Key Innovation</th>
                    <th className="p-3 text-left">Best For</th>
                    <th className="p-3 text-left">Level</th>
                  </tr>
                </thead>
                <tbody>
                  {architectures.map((arch, idx) => (
                    <tr key={arch.id} className={`border-b hover:bg-blue-50 ${idx % 2 === 0 ? 'bg-gray-50' : ''}`}>
                      <td className="p-3 font-semibold">{arch.name}</td>
                      <td className="p-3">{arch.year}</td>
                      <td className="p-3">{arch.category}</td>
                      <td className="p-3 text-xs">{arch.theory.keyIdea}</td>
                      <td className="p-3 text-xs">{arch.practicalExample.problem}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          arch.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                          arch.level === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {arch.level}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600">
          <div className="text-center">
            <p className="text-gray-600 mb-3">
              <strong>Complete Learning Resource:</strong> Theory, mathematics, visual guides, and working Python code
            </p>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Generated by</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Blockchain Data Intelligence Lab
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// ============================================================
// COMBINED NAVIGATOR
// ============================================================
export default function NeuralNetCombined() {
  const [activeModule, setActiveModule] = useState(0);
  const modules = [
    { id: 0, label: '16. Adjusting Weight & Bias' },
    { id: 1, label: '17. Backprop Learn' },
    { id: 2, label: '18. Backprop Tutorial' },
    { id: 3, label: '31. Error Handling' },
    { id: 4, label: '32. Feed Forward' },
  ];
  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{
        position: 'sticky', top: 0, zIndex: 1000,
        background: '#0a0f1a', borderBottom: '1px solid #1e2d45',
        display: 'flex', gap: 6, padding: '8px 14px', flexWrap: 'wrap',
      }}>
        {modules.map(m => (
          <button
            key={m.id}
            onClick={() => setActiveModule(m.id)}
            style={{
              padding: '7px 16px', borderRadius: 10, cursor: 'pointer',
              border: activeModule === m.id ? '1px solid #f97316' : '1px solid #1e2d45',
              background: activeModule === m.id ? 'rgba(249,115,22,0.09)' : 'transparent',
              color: activeModule === m.id ? '#f97316' : '#6b7a99',
              fontFamily: 'monospace', fontSize: 11, fontWeight: activeModule === m.id ? 700 : 400,
            }}
          >{m.label}</button>
        ))}
      </div>
      <div>
        {activeModule === 0 && <DLTutor />}
        {activeModule === 1 && <BackpropLearn />}
        {activeModule === 2 && <BackpropTutorial />}
        {activeModule === 3 && <ErrorHandlingAcademy />}
        {activeModule === 4 && <FeedforwardDeepLearning />}
      </div>
    </div>
  );
}