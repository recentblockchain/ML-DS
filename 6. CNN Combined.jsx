import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, ChevronUp, Play, Code, BookOpen, Layers, Grid, Filter, Brain, Music, Mic, Volume2, Radio, Waves, Speaker, Headphones } from 'lucide-react';

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=DM+Mono:wght@400;500&family=Sora:wght@300;400;600;700;800&display=swap');

*{box-sizing:border-box;margin:0;padding:0}
:root{
  --ink:#1c1917;
  --paper:#fdf8f0;
  --paper2:#f5ede0;
  --amber:#d97706;
  --amber-light:#fde68a;
  --amber-dark:#92400e;
  --teal:#0d9488;
  --teal-light:#ccfbf1;
  --rose:#e11d48;
  --rose-light:#ffe4e6;
  --indigo:#4338ca;
  --indigo-light:#e0e7ff;
  --slate:#475569;
  --border:#d6c9b5;
  --shadow:0 2px 12px rgba(28,25,23,.12);
  --shadow-lg:0 8px 32px rgba(28,25,23,.18);
}
html{scroll-behavior:smooth}
body{font-family:'Sora',sans-serif;background:var(--paper);color:var(--ink);min-height:100vh}

/* ---- LAYOUT ---- */
.app{min-height:100vh;background:var(--paper);position:relative}
.header{
  background:var(--ink);color:var(--paper);
  padding:28px 40px 24px;
  position:sticky;top:0;z-index:100;
  border-bottom:4px solid var(--amber);
}
.header-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap}
.logo{
  font-family:'Caveat',cursive;font-size:28px;font-weight:700;
  color:var(--amber-light);letter-spacing:1px;
}
.logo span{color:#94a3b8;font-size:16px;font-weight:500;display:block;font-family:'Sora';letter-spacing:0}
.progress-track{display:flex;gap:6px;align-items:center;flex-wrap:wrap}
.pt-dot{
  width:28px;height:28px;border-radius:50%;
  border:2px solid #475569;
  background:transparent;color:#94a3b8;
  font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;
  cursor:pointer;transition:all .2s;font-family:'DM Mono';
}
.pt-dot.done{background:var(--teal);border-color:var(--teal);color:white}
.pt-dot.active{background:var(--amber);border-color:var(--amber);color:var(--ink);transform:scale(1.2)}

.main{max-width:1200px;margin:0 auto;padding:32px 24px 80px}

/* ---- NAV ---- */
.activity-nav{
  display:flex;gap:6px;flex-wrap:wrap;margin-bottom:32px;
  padding:16px;background:var(--paper2);border-radius:16px;
  border:1px solid var(--border);
}
.anav-btn{
  padding:10px 18px;border-radius:10px;border:1.5px solid var(--border);
  background:white;color:var(--slate);cursor:pointer;
  font-family:'Sora';font-weight:600;font-size:13px;transition:all .2s;
  display:flex;align-items:center;gap:6px;white-space:nowrap;
}
.anav-btn:hover{border-color:var(--amber);color:var(--amber-dark)}
.anav-btn.active{
  background:var(--ink);color:var(--amber-light);
  border-color:var(--ink);box-shadow:var(--shadow);
}

/* ---- CARDS ---- */
.card{
  background:white;border:1.5px solid var(--border);
  border-radius:16px;padding:28px;margin-bottom:24px;
  box-shadow:var(--shadow);
}
.card-amber{border-top:4px solid var(--amber)}
.card-teal{border-top:4px solid var(--teal)}
.card-rose{border-top:4px solid var(--rose)}
.card-indigo{border-top:4px solid var(--indigo)}

.card-title{
  font-family:'Sora';font-weight:800;font-size:18px;
  color:var(--ink);margin-bottom:6px;display:flex;align-items:center;gap:10px;
}
.card-sub{font-size:14px;color:var(--slate);margin-bottom:20px;line-height:1.6}

/* ---- SECTION HEADER ---- */
.section-badge{
  display:inline-flex;align-items:center;gap:8px;
  background:var(--ink);color:var(--amber-light);
  padding:6px 16px;border-radius:20px;
  font-family:'DM Mono';font-size:11px;letter-spacing:1px;
  margin-bottom:16px;
}
.section-heading{
  font-family:'Sora';font-weight:800;font-size:26px;color:var(--ink);
  margin-bottom:8px;line-height:1.2;
}
.section-desc{font-size:15px;color:var(--slate);line-height:1.8;margin-bottom:28px}

/* ---- NOTEBOOK ---- */
.notebook{
  background:#fffdf7;border:1.5px solid #d6c9a0;border-radius:12px;
  padding:24px 28px;position:relative;overflow:hidden;
  font-family:'Caveat',cursive;
}
.notebook::before{
  content:'';position:absolute;left:48px;top:0;bottom:0;
  width:1.5px;background:#fca5a5;opacity:.5;
}
.notebook-line{
  border-bottom:1px solid #dde3c8;padding:8px 0 8px 60px;
  font-size:18px;color:var(--ink);line-height:1.5;position:relative;
}
.nb-label{
  position:absolute;left:8px;top:8px;
  font-family:'DM Mono';font-size:10px;color:#9ca3af;font-style:normal;
}

/* ---- CODE BLOCK ---- */
.code-block{
  background:#1e1e2e;color:#cdd6f4;
  border-radius:12px;padding:20px 24px;
  font-family:'DM Mono';font-size:13px;line-height:1.9;
  overflow-x:auto;position:relative;margin:16px 0;
  border:1px solid #313244;
}
.code-block .cb-lang{
  position:absolute;top:10px;right:14px;
  background:#313244;color:#6c7086;
  padding:3px 10px;border-radius:6px;font-size:10px;
}
.kw{color:#cba6f7}   /* keyword */
.fn{color:#89b4fa}   /* function */
.str{color:#a6e3a1}  /* string */
.num{color:#fab387}  /* number */
.cm{color:#585b70}   /* comment */
.cl{color:#f38ba8}   /* class */
.var{color:#f9e2af}  /* variable */
.op{color:#89dceb}   /* operator */

/* ---- PIXEL / MATRIX ---- */
.matrix-wrap{display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;justify-content:center;margin:16px 0}
.matrix-container{text-align:center}
.matrix-label{font-family:'DM Mono';font-size:10px;color:var(--slate);letter-spacing:1px;margin-bottom:6px;text-transform:uppercase}
.matrix{display:inline-grid;gap:2px;padding:6px;background:var(--paper2);border-radius:8px;border:1.5px solid var(--border)}
.mcell{
  width:38px;height:38px;display:flex;align-items:center;justify-content:center;
  border-radius:4px;font-family:'DM Mono';font-size:11px;font-weight:500;
  transition:all .25s;cursor:default;border:1px solid rgba(0,0,0,.05);
}
.mcell.highlight-cell{
  outline:2.5px solid var(--amber);outline-offset:1px;
  box-shadow:0 0 12px rgba(217,119,6,.4);z-index:2;transform:scale(1.08);
}
.mcell.result-cell{
  outline:2.5px solid var(--teal);outline-offset:1px;
  box-shadow:0 0 12px rgba(13,148,136,.4);
}

/* ---- BUTTONS ---- */
.btn{
  padding:10px 22px;border-radius:10px;border:none;cursor:pointer;
  font-family:'Sora';font-weight:700;font-size:14px;transition:all .2s;
  display:inline-flex;align-items:center;gap:8px;
}
.btn-ink{background:var(--ink);color:var(--amber-light);box-shadow:var(--shadow)}
.btn-ink:hover{background:#292524;transform:translateY(-1px);box-shadow:var(--shadow-lg)}
.btn-amber{background:var(--amber);color:white;box-shadow:var(--shadow)}
.btn-amber:hover{background:#b45309;transform:translateY(-1px)}
.btn-teal{background:var(--teal);color:white}
.btn-teal:hover{background:#0f766e}
.btn-outline{background:white;color:var(--ink);border:1.5px solid var(--border)}
.btn-outline:hover{border-color:var(--amber);color:var(--amber-dark)}
.btn:disabled{opacity:.4;cursor:not-allowed;transform:none!important}

/* ---- TAGS ---- */
.tag{
  display:inline-flex;align-items:center;gap:4px;
  padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;
  font-family:'DM Mono';letter-spacing:.3px;
}
.tag-amber{background:var(--amber-light);color:var(--amber-dark);border:1px solid #fbbf24}
.tag-teal{background:var(--teal-light);color:var(--teal);border:1px solid #5eead4}
.tag-rose{background:var(--rose-light);color:var(--rose);border:1px solid #fda4af}
.tag-indigo{background:var(--indigo-light);color:var(--indigo);border:1px solid #818cf8}
.tag-ink{background:var(--ink);color:var(--amber-light)}

/* ---- FORMULA BOX ---- */
.formula{
  background:linear-gradient(135deg,#1e1e2e,#2a2a3e);
  border-radius:12px;padding:16px 22px;margin:12px 0;
  font-family:'DM Mono';font-size:14px;color:#cba6f7;
  border-left:4px solid var(--amber);line-height:2;
}
.formula-comment{color:#585b70;font-size:12px}

/* ---- INFO BOX ---- */
.info-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin:16px 0}
.ibox{
  background:var(--paper2);border:1.5px solid var(--border);border-radius:12px;
  padding:16px;transition:all .2s;
}
.ibox:hover{border-color:var(--amber);transform:translateY(-2px);box-shadow:var(--shadow)}
.ibox-icon{font-size:26px;margin-bottom:8px}
.ibox-title{font-weight:800;font-size:14px;color:var(--ink);margin-bottom:6px}
.ibox-body{font-size:13px;color:var(--slate);line-height:1.6}

/* ---- STEP WIZARD ---- */
.wizard-steps{display:flex;gap:0;margin-bottom:28px;overflow-x:auto}
.wstep{
  flex:1;min-width:100px;
  padding:12px 8px;
  background:var(--paper2);border:1.5px solid var(--border);
  border-right:none;cursor:pointer;text-align:center;
  transition:all .2s;font-family:'Sora';
}
.wstep:first-child{border-radius:10px 0 0 10px}
.wstep:last-child{border-radius:0 10px 10px 0;border-right:1.5px solid var(--border)}
.wstep:hover{background:var(--amber-light)}
.wstep.active{background:var(--ink);color:var(--amber-light);border-color:var(--ink)}
.wstep-num{font-family:'DM Mono';font-size:20px;font-weight:700;display:block;margin-bottom:2px}
.wstep-label{font-size:11px;font-weight:600;opacity:.8}

/* ---- ACTIVITY PANELS ---- */
.activity-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px}
@media(max-width:768px){.activity-row{grid-template-columns:1fr}}

.activity-box{
  background:white;border:1.5px solid var(--border);border-radius:14px;
  padding:22px;
}
.activity-box h3{font-size:15px;font-weight:800;margin-bottom:6px;display:flex;align-items:center;gap:8px}
.activity-box p{font-size:13px;color:var(--slate);line-height:1.7;margin-bottom:10px}

/* ---- CHANNEL GRID ---- */
.channel-display{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin:16px 0}
.channel-card{text-align:center}
.channel-label{font-family:'DM Mono';font-size:9px;color:var(--slate);margin-bottom:5px;letter-spacing:1px;text-transform:uppercase}
.channel-grid{display:inline-grid;gap:1px;padding:4px;background:var(--paper2);border-radius:6px;border:1px solid var(--border)}
.channel-cell{width:22px;height:22px;border-radius:2px}

/* ---- ANSWER INPUT ---- */
.ans-input{
  width:100%;padding:10px 14px;border-radius:8px;
  border:1.5px solid var(--border);background:white;
  font-family:'DM Mono';font-size:14px;color:var(--ink);
  transition:border-color .2s;margin-bottom:8px;
}
.ans-input:focus{outline:none;border-color:var(--amber);box-shadow:0 0 0 3px rgba(217,119,6,.15)}
.ans-feedback{
  padding:10px 14px;border-radius:8px;font-size:13px;line-height:1.6;
  margin-top:6px;font-weight:600;
}
.ans-correct{background:var(--teal-light);color:var(--teal);border:1.5px solid #5eead4}
.ans-wrong{background:var(--rose-light);color:var(--rose);border:1.5px solid #fda4af}
.ans-hint{background:var(--amber-light);color:var(--amber-dark);border:1.5px solid #fbbf24}

/* ---- PROGRESS ---- */
.prog-bar-wrap{background:var(--paper2);border-radius:10px;height:8px;overflow:hidden;margin:12px 0}
.prog-bar{height:100%;background:linear-gradient(90deg,var(--teal),var(--amber));border-radius:10px;transition:width .5s ease}

/* ---- TOOLTIP ---- */
.tooltip-wrap{position:relative;display:inline-block}
.tooltip-box{
  position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);
  background:var(--ink);color:var(--paper);padding:8px 12px;border-radius:8px;
  font-size:12px;white-space:nowrap;pointer-events:none;z-index:200;
  opacity:0;transition:opacity .2s;
  box-shadow:var(--shadow);
}
.tooltip-wrap:hover .tooltip-box{opacity:1}
.tooltip-box::after{
  content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);
  border:5px solid transparent;border-top-color:var(--ink);
}

/* ---- CANVAS AREA ---- */
.canvas-section{
  background:var(--paper2);border:1.5px dashed var(--border);
  border-radius:12px;padding:20px;text-align:center;margin:16px 0;
}
.canvas-hint{font-size:12px;color:var(--slate);margin-top:8px;font-style:italic}

/* ---- TEAM BADGE ---- */
.team-badges{display:flex;gap:10px;flex-wrap:wrap;margin:12px 0}
.team-badge{
  padding:8px 16px;border-radius:20px;font-size:13px;font-weight:700;
  display:flex;align-items:center;gap:6px;cursor:pointer;transition:all .2s;
  border:2px solid transparent;
}
.team-badge.selected{transform:scale(1.05);box-shadow:var(--shadow)}

/* ---- ANIM ---- */
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes pop{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
@keyframes shimmer{0%{background-position:0% 50%}100%{background-position:100% 50%}}
.fade-up{animation:fadeUp .35s ease forwards}
.pop{animation:pop .3s ease}

/* ---- SCROLLBAR ---- */
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:var(--paper2)}
::-webkit-scrollbar-thumb{background:var(--border);border-radius:4px}

/* ---- MISC ---- */
hr{border:none;border-top:1.5px solid var(--border);margin:24px 0}
strong.accent{color:var(--amber-dark)}
strong.teal{color:var(--teal)}
strong.rose{color:var(--rose)}
strong.indigo{color:var(--indigo)}
.mono{font-family:'DM Mono';font-size:13px}
.caveat{font-family:'Caveat';font-size:20px}
.flex-center{display:flex;align-items:center;justify-content:center;gap:12px}
.text-center{text-align:center}
.mt-8{margin-top:8px}
.mt-16{margin-top:16px}
.mt-24{margin-top:24px}
.w-full{width:100%}
.callout{
  background:linear-gradient(135deg,var(--amber-light),#fff7ed);
  border:1.5px solid var(--amber);border-radius:12px;
  padding:16px 20px;margin:16px 0;
  font-size:14px;color:var(--amber-dark);line-height:1.7;
}
.callout-teal{background:linear-gradient(135deg,var(--teal-light),#f0fdfa);border-color:var(--teal);color:var(--teal)}
.callout strong{font-weight:800}
`;

/* ─────────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────────── */
const ACTIVITIES = [
  { id:"overview",  emoji:"📋", label:"Overview"    },
  { id:"a1",        emoji:"🔬", label:"Activity 1: Convolution" },
  { id:"a2",        emoji:"⚡", label:"Activity 2: ReLU & Pool" },
  { id:"a3",        emoji:"🧮", label:"Activity 3: Math by Hand" },
  { id:"a4",        emoji:"🎨", label:"Activity 4: Build a CNN" },
  { id:"a5",        emoji:"🏁", label:"Activity 5: Challenge" },
  { id:"solutions", emoji:"✅", label:"Solutions"   },
];

// 5×5 binary image of the letter "L"
const IMAGE_L = [
  [1,0,0,0,0],
  [1,0,0,0,0],
  [1,0,0,0,0],
  [1,0,0,0,0],
  [1,1,1,1,1],
];

// 5×5 binary image of the letter "T"
const IMAGE_T = [
  [1,1,1,1,1],
  [0,0,1,0,0],
  [0,0,1,0,0],
  [0,0,1,0,0],
  [0,0,1,0,0],
];

// Edge-detection kernel
const KERNEL_EDGE = [[-1,-1,-1],[-1,8,-1],[-1,-1,-1]];
// Vertical edge kernel
const KERNEL_VERT = [[-1,0,1],[-1,0,1],[-1,0,1]];
// Horizontal edge kernel
const KERNEL_HORIZ = [[-1,-1,-1],[0,0,0],[1,1,1]];
// Blur kernel
const KERNEL_BLUR = [[1,1,1],[1,1,1],[1,1,1]]; // will divide by 9

const KERNEL_LABELS = {
  edge:"Edge Detection",
  vert:"Vertical Edge",
  horiz:"Horizontal Edge",
  blur:"Blur (Avg Pool)",
};

function conv2d(img, kernel, divide=1) {
  const rows = img.length, cols = img[0].length;
  const kr = kernel.length, kc = kernel[0].length;
  const out = [];
  for (let r=0; r<=rows-kr; r++) {
    const row=[];
    for (let c=0; c<=cols-kc; c++) {
      let s=0;
      for (let i=0;i<kr;i++) for (let j=0;j<kc;j++) s+=img[r+i][c+j]*kernel[i][j];
      row.push(Math.round(s/divide));
    }
    out.push(row);
  }
  return out;
}

function relu2d(mat) { return mat.map(r=>r.map(v=>Math.max(0,v))); }

function maxPool(mat,sz=2) {
  const rows=mat.length,cols=mat[0].length;
  const out=[];
  for (let r=0;r+sz<=rows;r+=sz){
    const row=[];
    for(let c=0;c+sz<=cols;c+=sz){
      let m=-Infinity;
      for(let i=0;i<sz;i++) for(let j=0;j<sz;j++) m=Math.max(m,mat[r+i][c+j]);
      row.push(m);
    }
    out.push(row);
  }
  return out;
}

function cellBg(val, min, max) {
  if (max===min) return `hsl(210,10%,92%)`;
  const t = (val-min)/(max-min);
  if (t>=0.5) {
    const p=(t-0.5)*2;
    return `hsl(${160+p*40},${60+p*30}%,${85-p*25}%)`;
  } else {
    const p=t*2;
    return `hsl(${350+p*10},${50+p*20}%,${92-p*10}%)`;
  }
}

function matrixRange(mat) {
  let min=Infinity,max=-Infinity;
  mat.forEach(r=>r.forEach(v=>{if(v<min)min=v;if(v>max)max=v;}));
  return {min,max};
}

/* ─────────────────────────────────────────────
   MATRIX RENDERER
───────────────────────────────────────────── */
function Matrix({ data, label, highlightCells=[], resultCells=[], cellSize=38, showVal=true, binaryMode=false }) {
  const {min,max}=matrixRange(data);
  return (
    <div className="matrix-container">
      {label && <div className="matrix-label">{label}</div>}
      <div className="matrix" style={{gridTemplateColumns:`repeat(${data[0].length},1fr)`}}>
        {data.map((row,r)=>row.map((val,c)=>{
          const key=`${r}-${c}`;
          const isHl=highlightCells.includes(key);
          const isRes=resultCells.includes(key);
          let bg;
          if (binaryMode) bg=val>0?`hsl(210,15%,88%)`:`hsl(0,0%,18%)`;
          else bg=cellBg(val,min,max);
          const textColor = binaryMode && val===0 ? "#aaa" : "#1c1917";
          return (
            <div key={key}
              className={`mcell ${isHl?"highlight-cell":""} ${isRes?"result-cell":""}`}
              style={{width:cellSize,height:cellSize,background:bg,color:textColor,fontSize:cellSize>35?12:10}}
            >
              {showVal ? (val===0&&!binaryMode?"0":val) : ""}
            </div>
          );
        }))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ACTIVITY 1: CONVOLUTION EXPLORER
───────────────────────────────────────────── */
function Activity1() {
  const [kernel, setKernel] = useState("vert");
  const [pos, setPos] = useState({ r:0, c:0 });
  const [image, setImage] = useState("L");
  const [step, setStep] = useState(0);

  const IMG = image==="L"?IMAGE_L:IMAGE_T;
  const KRN = kernel==="edge"?KERNEL_EDGE:kernel==="vert"?KERNEL_VERT:kernel==="horiz"?KERNEL_HORIZ:KERNEL_BLUR;
  const DIVIDE = kernel==="blur"?9:1;
  const featureMap = conv2d(IMG, KRN, DIVIDE);
  const {r,c}=pos;

  const highlightInput=[];
  for(let i=0;i<3;i++) for(let j=0;j<3;j++) highlightInput.push(`${r+i}-${c+j}`);
  const resultHighlight=[`${r}-${c}`];

  // manual calculation for the current position
  let calcSteps=[];
  let total=0;
  for(let i=0;i<3;i++) for(let j=0;j<3;j++){
    const iv=IMG[r+i][c+j], kv=KRN[i][j];
    calcSteps.push({iv,kv,product:iv*kv});
    total+=iv*kv;
  }

  const maxR=IMG.length-3, maxC=IMG[0].length-3;

  const stepsWizard=[
    {num:"01",label:"Choose Image"},
    {num:"02",label:"Pick Kernel"},
    {num:"03",label:"Slide Filter"},
    {num:"04",label:"Inspect Math"},
  ];

  return (
    <div className="fade-up">
      <div className="section-badge">⬡ ACTIVITY 1 of 5</div>
      <div className="section-heading">Convolution Explorer</div>
      <div className="section-desc">
        Convolution is the heart of every CNN. A small <strong>filter (kernel)</strong> slides over the input image pixel-by-pixel. At each position it performs a <strong>dot product</strong> — multiply matching values and sum them up. The result is a <strong>feature map</strong> that highlights where certain patterns appear. Work through these 4 steps to truly understand what's happening.
      </div>

      {/* STEP WIZARD */}
      <div className="wizard-steps">
        {stepsWizard.map((s,i)=>(
          <div key={i} className={`wstep ${step===i?"active":""}`} onClick={()=>setStep(i)}>
            <span className="wstep-num">{s.num}</span>
            <span className="wstep-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* STEP 0: Choose Image */}
      {step===0 && (
        <div className="card card-amber fade-up">
          <div className="card-title">📷 Step 1 — Choose Your Input Image</div>
          <div className="card-sub">These are simple 5×5 binary images (1 = white pixel, 0 = black pixel). In real CNNs the input is a full photo with pixel values 0–255. We use binary here so the math stays simple!</div>
          <div className="activity-row">
            {["L","T"].map(ltr=>(
              <div key={ltr} className="activity-box" style={{border:`2px solid ${image===ltr?"var(--amber)":"var(--border)"}`,cursor:"pointer",background:image===ltr?"#fffbeb":"white"}}
                onClick={()=>setImage(ltr)}>
                <h3>{image===ltr?"✅ ":""} Letter "{ltr}" — 5×5 Binary Image</h3>
                <p>Each cell is either <span className="tag tag-ink">1</span> (white/on) or <span className="tag tag-amber">0</span> (black/off). This is what a pixel looks like as a number.</p>
                <Matrix data={image==="L"&&ltr==="L"?IMAGE_L:ltr==="T"?IMAGE_T:ltr==="L"?IMAGE_L:IMAGE_T} binaryMode={true} cellSize={44} showVal={true}/>
              </div>
            ))}
          </div>
          <div className="callout">
            <strong>📝 Think about it:</strong> Why do we represent images as numbers? Because computers can only do math! Every image in a CNN is just a big grid of numbers. A color photo is THREE grids — one each for Red, Green, and Blue channels.
          </div>
          <div className="flex-center mt-16">
            <button className="btn btn-amber" onClick={()=>setStep(1)}>Next: Pick a Kernel →</button>
          </div>
        </div>
      )}

      {/* STEP 1: Kernel */}
      {step===1 && (
        <div className="card card-amber fade-up">
          <div className="card-title">🔧 Step 2 — Choose a Kernel (Filter)</div>
          <div className="card-sub">A kernel is a small 3×3 grid of weights. Different kernels detect different features. The CNN <em>learns</em> these weights during training — but we can design them by hand to see how they work!</div>
          <div className="info-grid">
            {Object.entries(KERNEL_LABELS).map(([k,lbl])=>{
              const K=k==="edge"?KERNEL_EDGE:k==="vert"?KERNEL_VERT:k==="horiz"?KERNEL_HORIZ:KERNEL_BLUR;
              return (
                <div key={k} className="ibox" style={{cursor:"pointer",border:`2px solid ${kernel===k?"var(--teal)":"var(--border)"}`,background:kernel===k?"#f0fdfa":"var(--paper2)"}} onClick={()=>setKernel(k)}>
                  <div className="ibox-icon">{k==="edge"?"🔲":k==="vert"?"⬛":k==="horiz"?"🟫":"🌫️"}</div>
                  <div className="ibox-title">{kernel===k?"✅ ":""}{lbl}</div>
                  <Matrix data={K} cellSize={30} showVal={true}/>
                  <div className="ibox-body" style={{marginTop:8}}>
                    {k==="edge"?"Detects all edges — center pixel × 8, neighbors × −1. High output = edge found!":
                     k==="vert"?"Detects vertical lines. Left side −1, right side +1. Responds to left-to-right brightness change.":
                     k==="horiz"?"Detects horizontal lines. Top row −1, bottom row +1. Responds to top-to-bottom change.":
                     "Averages neighbors — blurs the image. Sum ÷ 9. Smooths out noise."}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex-center mt-16" style={{justifyContent:"space-between"}}>
            <button className="btn btn-outline" onClick={()=>setStep(0)}>← Back</button>
            <button className="btn btn-amber" onClick={()=>setStep(2)}>Next: Slide the Filter →</button>
          </div>
        </div>
      )}

      {/* STEP 2: Slide Filter */}
      {step===2 && (
        <div className="card card-amber fade-up">
          <div className="card-title">🔍 Step 3 — Slide the Filter & Build the Feature Map</div>
          <div className="card-sub">Use the arrow buttons to move the 3×3 filter (highlighted in gold) across the input image. Watch the corresponding output cell (highlighted in teal) update with the dot-product result! The full output is the <strong>feature map</strong>.</div>

          <div className="matrix-wrap">
            <Matrix data={IMG} label={`Input: Letter "${image}" (5×5)`} highlightCells={highlightInput} binaryMode={true} cellSize={44}/>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4}}>
              <div style={{fontSize:24,color:"var(--amber)"}}>✕</div>
              <Matrix data={KRN} label={`Kernel: ${KERNEL_LABELS[kernel]} (3×3)`} cellSize={38}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
              <div style={{fontSize:24,color:"var(--slate)",marginBottom:8}}>→</div>
            </div>
            <Matrix data={featureMap} label={`Feature Map (3×3)`} resultCells={resultHighlight} cellSize={44}/>
          </div>

          {/* Arrow controls */}
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8,margin:"20px 0"}}>
            <button className="btn btn-outline" style={{padding:"6px 16px"}} onClick={()=>setPos(p=>({...p,r:Math.max(0,p.r-1)}))} disabled={r===0}>▲ Up</button>
            <div style={{display:"flex",gap:12}}>
              <button className="btn btn-outline" style={{padding:"6px 16px"}} onClick={()=>setPos(p=>({...p,c:Math.max(0,p.c-1)}))} disabled={c===0}>◀ Left</button>
              <div className="canvas-section" style={{minWidth:120,padding:"10px 20px"}}>
                <span className="mono" style={{fontSize:16,fontWeight:700}}>Position: ({r},{c})</span>
                <div className="canvas-hint">Filter top-left corner</div>
              </div>
              <button className="btn btn-outline" style={{padding:"6px 16px"}} onClick={()=>setPos(p=>({...p,c:Math.min(maxC,p.c+1)}))} disabled={c===maxC}>Right ▶</button>
            </div>
            <button className="btn btn-outline" style={{padding:"6px 16px"}} onClick={()=>setPos(p=>({...p,r:Math.min(maxR,p.r+1)}))} disabled={r===maxR}>▼ Down</button>
          </div>

          <div className="callout">
            <strong>👁️ Notice:</strong> As you move the filter, look at which positions produce HIGH values vs LOW values in the feature map. High values (bright cells) mean the filter <em>matched</em> a pattern at that location. For the vertical-edge kernel, high values appear where vertical lines exist in the image!
          </div>

          <div className="flex-center mt-16" style={{justifyContent:"space-between"}}>
            <button className="btn btn-outline" onClick={()=>setStep(1)}>← Back</button>
            <button className="btn btn-amber" onClick={()=>setStep(3)}>Next: Inspect the Math →</button>
          </div>
        </div>
      )}

      {/* STEP 3: Inspect Math */}
      {step===3 && (
        <div className="card card-amber fade-up">
          <div className="card-title">🧮 Step 4 — The Dot-Product Calculation (Detailed)</div>
          <div className="card-sub">Here is EXACTLY what the computer calculates at position ({r},{c}). Each of the 9 cells in the 3×3 overlap is multiplied by the matching kernel weight, then everything is summed. This is the full math — no shortcuts!</div>

          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontFamily:"var(--mono)",fontSize:13,marginBottom:16}}>
              <thead>
                <tr style={{background:"var(--ink)",color:"var(--amber-light)"}}>
                  {["Position","Image Patch Value","Kernel Weight","Product","Running Sum"].map(h=>(
                    <th key={h} style={{padding:"10px 14px",textAlign:"center",fontFamily:"DM Mono",fontSize:11}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {calcSteps.map((cs,idx)=>{
                  const rowI=Math.floor(idx/3), colJ=idx%3;
                  const running=calcSteps.slice(0,idx+1).reduce((s,x)=>s+x.product,0);
                  return (
                    <tr key={idx} style={{background:idx%2===0?"var(--paper2)":"white",borderBottom:"1px solid var(--border)"}}>
                      <td style={{padding:"8px 14px",textAlign:"center",color:"var(--slate)"}}>
                        <span style={{fontFamily:"DM Mono"}}>img[{r+rowI}][{c+colJ}] × k[{rowI}][{colJ}]</span>
                      </td>
                      <td style={{padding:"8px 14px",textAlign:"center"}}>
                        <span style={{padding:"2px 8px",borderRadius:6,background:cs.iv>0?"#dcfce7":"#f1f5f9",fontWeight:700}}>{cs.iv}</span>
                      </td>
                      <td style={{padding:"8px 14px",textAlign:"center"}}>
                        <span style={{padding:"2px 8px",borderRadius:6,background:cs.kv>0?"#dbeafe":cs.kv<0?"#fee2e2":"#f1f5f9",fontWeight:700}}>{cs.kv}</span>
                      </td>
                      <td style={{padding:"8px 14px",textAlign:"center",fontWeight:700,color:cs.product>0?"var(--teal)":cs.product<0?"var(--rose)":"var(--slate)"}}>
                        {cs.product}
                      </td>
                      <td style={{padding:"8px 14px",textAlign:"center",fontFamily:"DM Mono",fontWeight:700}}>
                        {running}
                      </td>
                    </tr>
                  );
                })}
                <tr style={{background:"var(--amber-light)",fontWeight:800}}>
                  <td colSpan={3} style={{padding:"10px 14px",textAlign:"right",fontFamily:"DM Mono"}}>FINAL OUTPUT at ({r},{c}) {kernel==="blur"?" ÷ 9 ":""}=</td>
                  <td colSpan={2} style={{padding:"10px 14px",textAlign:"center",fontSize:18,fontFamily:"DM Mono",color:"var(--amber-dark)"}}>
                    {featureMap[r]?.[c]}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="callout-teal callout">
            <strong>🎯 Key Insight:</strong> This one number ({featureMap[r]?.[c]}) tells us how strongly the pattern "{KERNEL_LABELS[kernel]}" was found at position ({r},{c}) in the image. The CNN repeats this for EVERY position (stride of 1) and for DOZENS of different kernels simultaneously — building a whole library of feature maps!
          </div>
          <div className="flex-center mt-16" style={{justifyContent:"space-between"}}>
            <button className="btn btn-outline" onClick={()=>setStep(2)}>← Back</button>
            <button className="btn btn-teal" onClick={()=>{}}>🎉 Activity 1 Complete!</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ACTIVITY 2: ReLU + POOLING
───────────────────────────────────────────── */
function Activity2() {
  const RAW_MAP = [
    [-3, 1, -2, 4],
    [ 2,-1,  3,-5],
    [-4, 0,  2, 1],
    [ 1,-2, -1, 3],
  ];
  const [showRelu, setShowRelu] = useState(false);
  const [showPool, setShowPool] = useState(false);
  const [selectedPool, setSelectedPool] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [ansState, setAnsState] = useState(null);

  const reluMap = relu2d(RAW_MAP);
  const poolMap = maxPool(reluMap, 2);
  const POOL_REGIONS = [[0,0],[0,2],[2,0],[2,2]];

  const checkAnswer = () => {
    const correct=poolMap[Math.floor((selectedPool||0)/2)]?.[(selectedPool||0)%2];
    if(parseInt(userAnswer)===correct){setAnsState("correct");}
    else{setAnsState("wrong");}
  };

  return (
    <div className="fade-up">
      <div className="section-badge">⬡ ACTIVITY 2 of 5</div>
      <div className="section-heading">ReLU Activation + Max Pooling</div>
      <div className="section-desc">
        After convolution, two more operations are applied. <strong className="accent">ReLU</strong> removes all negative values (sets them to 0), adding non-linearity so the network can learn complex patterns. <strong className="teal">Max Pooling</strong> then shrinks the feature map by keeping only the maximum value in each region — reducing computation while retaining important signals.
      </div>

      <div className="card card-rose">
        <div className="card-title">⚡ Part A — Apply ReLU Activation</div>
        <div className="card-sub">
          The raw feature map from convolution often has negative values. These are meaningless to us (a negative "edge detection score" just means "no edge here"). ReLU clips them all to zero. Formula: <span className="mono">ReLU(x) = max(0, x)</span>
        </div>

        <div className="matrix-wrap">
          <Matrix data={RAW_MAP} label="Raw Feature Map (after Conv)" cellSize={44}/>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8}}>
            <div style={{fontFamily:"Caveat",fontSize:20,color:"var(--rose)",textAlign:"center"}}>
              Apply ReLU<br/>max(0, x)
            </div>
            <button className="btn btn-rose" style={{background:"var(--rose)",color:"white"}} onClick={()=>setShowRelu(true)}>
              ⚡ Apply ReLU!
            </button>
          </div>
          {showRelu && <Matrix data={reluMap} label="After ReLU (negatives → 0)" cellSize={44}/>}
        </div>

        {showRelu && (
          <div className="callout" style={{marginTop:16}}>
            <strong>🔍 What changed?</strong> Count the cells that changed: the values −3, −2, −1, −5, −4, −2, −1 all became 0. The positive values (1, 4, 2, 3, 2, 1, 1, 3) stayed exactly the same. ReLU essentially asks: <em>"Was this pattern detected here? If yes (positive), keep the score. If no (negative), ignore it."</em>
          </div>
        )}
      </div>

      {showRelu && (
        <div className="card card-teal fade-up">
          <div className="card-title">🏊 Part B — Max Pooling (2×2 windows)</div>
          <div className="card-sub">
            We divide the 4×4 feature map into four 2×2 non-overlapping windows. From each window, we keep only the <strong>maximum value</strong>. This gives us a 2×2 output — half the size! The idea: if a feature was detected <em>anywhere</em> in that region, the maximum captures it.
          </div>

          <div className="matrix-wrap">
            <div className="matrix-container">
              <div className="matrix-label">ReLU Output — click a region!</div>
              <div className="matrix" style={{gridTemplateColumns:"repeat(4,1fr)",position:"relative"}}>
                {reluMap.map((row,r)=>row.map((val,c)=>{
                  const region = r<2 ? (c<2?0:1) : (c<2?2:3);
                  const colors = ["#fde68a","#c7f2fa","#d1fae5","#fce7f3"];
                  const {min,max}=matrixRange(reluMap);
                  return (
                    <div key={`${r}-${c}`} className="mcell"
                      style={{
                        width:44,height:44,
                        background:selectedPool===region?colors[region]:cellBg(val,min,max),
                        outline:selectedPool===region?"2px solid var(--amber)":"none",
                        cursor:"pointer",fontFamily:"DM Mono",fontSize:12,fontWeight:600
                      }}
                      onClick={()=>{setSelectedPool(region);setUserAnswer("");setAnsState(null);}}>
                      {val}
                    </div>
                  );
                }))}
              </div>
              <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:10,flexWrap:"wrap"}}>
                {["TL","TR","BL","BR"].map((lbl,i)=>(
                  <button key={i} className="btn btn-outline" style={{padding:"4px 12px",fontSize:12,background:selectedPool===i?"var(--amber-light)":"white"}} onClick={()=>{setSelectedPool(i);setUserAnswer("");setAnsState(null);}}>
                    Region {lbl}
                  </button>
                ))}
              </div>
            </div>

            {selectedPool!==null && (
              <div className="activity-box fade-up" style={{minWidth:240}}>
                <h3>Region {["Top-Left","Top-Right","Bottom-Left","Bottom-Right"][selectedPool]}</h3>
                <p>Values in this 2×2 region:</p>
                <div style={{fontFamily:"DM Mono",fontSize:18,padding:"12px",background:"var(--paper2)",borderRadius:8,marginBottom:12,textAlign:"center"}}>
                  {(() => {
                    const [sr,sc]=POOL_REGIONS[selectedPool];
                    return `${reluMap[sr][sc]}, ${reluMap[sr][sc+1]}\n${reluMap[sr+1][sc]}, ${reluMap[sr+1][sc+1]}`;
                  })()}
                </div>
                <p><strong>What is the maximum?</strong></p>
                <input className="ans-input" type="number" placeholder="Enter max value..." value={userAnswer} onChange={e=>setUserAnswer(e.target.value)} onKeyDown={e=>e.key==="Enter"&&checkAnswer()}/>
                <button className="btn btn-teal w-full" style={{width:"100%"}} onClick={checkAnswer}>Check ✓</button>
                {ansState==="correct" && <div className="ans-feedback ans-correct">✅ Correct! That's the max-pool output for this region.</div>}
                {ansState==="wrong" && <div className="ans-feedback ans-wrong">❌ Not quite. Remember: max means the <em>largest</em> number in the region!</div>}
              </div>
            )}

            {showPool && <Matrix data={poolMap} label="Max-Pool Output (2×2)" cellSize={52}/>}
          </div>

          <div className="flex-center mt-16">
            <button className="btn btn-teal" onClick={()=>setShowPool(true)}>Reveal Full Pooling Result →</button>
          </div>

          {showPool && (
            <div className="callout-teal callout mt-16">
              <strong>📐 Size reduction:</strong> We went from a 4×4 feature map (16 values) to a 2×2 map (4 values) — <strong>75% smaller!</strong> In a real CNN on a 224×224 image, after several pooling operations the feature maps become tiny, making the Fully Connected layers fast and feasible to train.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ACTIVITY 3: MATH BY HAND
───────────────────────────────────────────── */
function Activity3() {
  const problems = [
    {
      id:"p1", title:"Neuron Forward Pass",
      desc:"A single neuron receives 3 inputs. Calculate the output after applying ReLU.",
      inputs:[0.5, -0.3, 0.8], weights:[0.4, 0.7, -0.2], bias:0.1,
      hint:"Step 1: weighted_sum = Σ(wᵢ × xᵢ) + b  →  Step 2: ReLU(weighted_sum)",
      steps:["0.4 × 0.5 = 0.20","0.7 × (-0.3) = -0.21","(-0.2) × 0.8 = -0.16","Sum = 0.20 + (-0.21) + (-0.16) + 0.10 (bias) = -0.07","ReLU(-0.07) = max(0, -0.07) = 0.00"],
      answer:0,
    },
    {
      id:"p2", title:"Softmax Probability",
      desc:"Three raw output scores (logits) from the final layer. Compute the probability for class 'Cat'.",
      classes:["Cat","Dog","Bird"], logits:[2.0, 1.0, 0.1],
      hint:"Softmax(xᵢ) = e^xᵢ / (e^x₀ + e^x₁ + e^x₂). Use e ≈ 2.718. e^2 ≈ 7.39, e^1 ≈ 2.72, e^0.1 ≈ 1.11",
      steps:["e^2.0 = 7.39 (Cat)","e^1.0 = 2.72 (Dog)","e^0.1 = 1.11 (Bird)","Sum = 7.39 + 2.72 + 1.11 = 11.22","P(Cat) = 7.39 / 11.22 ≈ 0.659 ≈ 65.9%"],
      answer:65.9, tolerance:2, unit:"%",
    },
    {
      id:"p3", title:"Feature Map Size",
      desc:"Input image: 32×32. Applied one Conv layer (3×3 kernel, stride=1, no padding), then one MaxPool (2×2). What is the final feature map size?",
      hint:"After Conv: output = (input − kernel + 1). After Pool: output = input ÷ pool_size",
      steps:["After Conv: 32 − 3 + 1 = 30 → size is 30×30","After MaxPool 2×2: 30 ÷ 2 = 15 → size is 15×15","Final feature map: 15 × 15"],
      answer:15, unit:"×15 (15×15)", inputHint:"Enter the width (e.g. 15):"
    },
  ];

  const [answers, setAnswers] = useState({});
  const [states, setStates] = useState({});
  const [showSolution, setShowSolution] = useState({});

  const check = (id, correctAns, tolerance=0) => {
    const userVal = parseFloat(answers[id]);
    const diff = Math.abs(userVal - correctAns);
    setStates(s=>({...s,[id]: diff <= (tolerance||0.05) ? "correct" : "wrong"}));
  };

  return (
    <div className="fade-up">
      <div className="section-badge">⬡ ACTIVITY 3 of 5</div>
      <div className="section-heading">Math by Hand</div>
      <div className="section-desc">
        The best way to truly understand a CNN is to compute the math yourself — no shortcuts! These three problems cover the three most important calculations you'll encounter: neuron activation, softmax probabilities, and output dimensions. Work through them step by step.
      </div>

      {problems.map((prob,idx)=>(
        <div key={prob.id} className={`card card-${["amber","indigo","teal"][idx]} fade-up`}>
          <div className="section-badge" style={{marginBottom:12}}>Problem {idx+1}</div>
          <div className="card-title">{prob.title}</div>
          <div className="card-sub">{prob.desc}</div>

          {/* Problem-specific visualizations */}
          {prob.id==="p1" && (
            <div style={{display:"flex",gap:16,flexWrap:"wrap",alignItems:"center",margin:"16px 0"}}>
              {prob.inputs.map((x,i)=>(
                <div key={i} style={{textAlign:"center"}}>
                  <div className="mono" style={{fontSize:11,color:"var(--slate)"}}>x{i+1}</div>
                  <div style={{padding:"8px 12px",background:"var(--indigo-light)",color:"var(--indigo)",borderRadius:8,fontWeight:700,fontFamily:"DM Mono",fontSize:16}}>{x}</div>
                  <div className="mono" style={{fontSize:10,color:"var(--slate)",marginTop:2}}>w{i+1}={prob.weights[i]}</div>
                </div>
              ))}
              <div style={{fontSize:24,color:"var(--slate)"}}>+</div>
              <div style={{textAlign:"center"}}>
                <div className="mono" style={{fontSize:11,color:"var(--slate)"}}>bias</div>
                <div style={{padding:"8px 12px",background:"var(--rose-light)",color:"var(--rose)",borderRadius:8,fontWeight:700,fontFamily:"DM Mono",fontSize:16}}>{prob.bias}</div>
              </div>
              <div style={{fontSize:24,color:"var(--slate)"}}>→</div>
              <div style={{textAlign:"center"}}>
                <div className="mono" style={{fontSize:11,color:"var(--slate)"}}>neuron</div>
                <div style={{padding:"8px 12px",background:"var(--teal-light)",color:"var(--teal)",borderRadius:8,fontWeight:700,fontFamily:"DM Mono",fontSize:16}}>?</div>
              </div>
            </div>
          )}

          {prob.id==="p2" && (
            <div style={{display:"flex",gap:12,margin:"16px 0",flexWrap:"wrap"}}>
              {prob.classes.map((cls,i)=>(
                <div key={i} style={{padding:"12px 18px",background:"var(--paper2)",borderRadius:10,border:"1.5px solid var(--border)",textAlign:"center",minWidth:90}}>
                  <div style={{fontSize:20}}>{["🐱","🐶","🐦"][i]}</div>
                  <div style={{fontWeight:700,fontSize:13}}>{cls}</div>
                  <div style={{fontFamily:"DM Mono",color:"var(--indigo)",fontSize:16,fontWeight:700}}>{prob.logits[i]}</div>
                  <div style={{fontSize:10,color:"var(--slate)"}}>logit</div>
                </div>
              ))}
            </div>
          )}

          {prob.id==="p3" && (
            <div style={{display:"flex",gap:16,flexWrap:"wrap",alignItems:"center",margin:"16px 0"}}>
              {[["Input",32],[`After\nConv 3×3`,"?"],[`After\nMaxPool 2×2`,"?"]].map(([lbl,size],i)=>(
                <div key={i} style={{textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                  {i>0 && <div style={{fontSize:18,color:"var(--slate)"}}>→</div>}
                  <div style={{
                    width:size==="?"?60:Math.max(40,size*(i===0?1.8:1.2)),
                    height:size==="?"?60:Math.max(40,size*(i===0?1.8:1.2)),
                    maxWidth:90,maxHeight:90,
                    background:i===0?"var(--indigo-light)":i===1?"var(--amber-light)":"var(--teal-light)",
                    borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",
                    fontFamily:"DM Mono",fontWeight:700,fontSize:size==="?"?22:13,
                    color:i===0?"var(--indigo)":i===1?"var(--amber-dark)":"var(--teal)",
                    border:`2px solid ${i===0?"var(--indigo)":i===1?"var(--amber)":"var(--teal)"}`,
                    transition:"all .3s"
                  }}>
                    {size==="?" ? "?" : `${size}×${size}`}
                  </div>
                  <div style={{fontSize:11,fontFamily:"DM Mono",color:"var(--slate)",whiteSpace:"pre-wrap",textAlign:"center"}}>{lbl}</div>
                </div>
              ))}
            </div>
          )}

          <div className="formula">
            <div className="formula-comment"># Hint:</div>
            {prob.hint}
          </div>

          <div style={{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap",marginTop:16}}>
            <div style={{flex:1,minWidth:200}}>
              <div style={{fontSize:13,color:"var(--slate)",marginBottom:6}}>{prob.inputHint||"Your answer:"}</div>
              <input className="ans-input" type="number" step="0.01"
                placeholder={prob.id==="p2"?"e.g. 65.9 (as a %)":prob.id==="p3"?"e.g. 15":"e.g. 0.00"}
                value={answers[prob.id]||""}
                onChange={e=>setAnswers(a=>({...a,[prob.id]:e.target.value}))}
                onKeyDown={e=>e.key==="Enter"&&check(prob.id,prob.answer,prob.tolerance)}
                style={{marginBottom:0}}
              />
            </div>
            <button className="btn btn-amber" style={{marginTop:22}} onClick={()=>check(prob.id,prob.answer,prob.tolerance)}>
              Check ✓
            </button>
            <button className="btn btn-outline" style={{marginTop:22,fontSize:12}} onClick={()=>setShowSolution(s=>({...s,[prob.id]:!s[prob.id]}))}>
              {showSolution[prob.id]?"Hide":"Show"} Solution
            </button>
          </div>

          {states[prob.id]==="correct" && <div className="ans-feedback ans-correct mt-8">🎉 Correct! Excellent work!</div>}
          {states[prob.id]==="wrong" && <div className="ans-feedback ans-wrong mt-8">❌ Not quite. Review the hint or show the solution steps!</div>}

          {showSolution[prob.id] && (
            <div className="fade-up" style={{marginTop:16,padding:20,background:"var(--paper2)",borderRadius:12,border:"1.5px solid var(--border)"}}>
              <div style={{fontWeight:800,marginBottom:10,fontFamily:"DM Mono",fontSize:12,color:"var(--slate)"}}>STEP-BY-STEP SOLUTION:</div>
              {prob.steps.map((s,i)=>(
                <div key={i} style={{display:"flex",gap:12,marginBottom:8,alignItems:"flex-start"}}>
                  <div style={{width:22,height:22,borderRadius:"50%",background:"var(--ink)",color:"var(--amber-light)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"DM Mono",fontSize:11,flexShrink:0}}>{i+1}</div>
                  <div style={{fontFamily:"DM Mono",fontSize:13,color:"var(--ink)",lineHeight:1.6}}>{s}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ACTIVITY 4: BUILD YOUR CNN
───────────────────────────────────────────── */
const LAYER_TYPES = [
  {id:"conv",  label:"Conv2D",  emoji:"🔍", color:"#4338ca", desc:"Convolutional layer — adds a filter to detect features", params:{filters:32,kernel:3}},
  {id:"relu",  label:"ReLU",   emoji:"⚡", color:"#e11d48", desc:"Activation — removes negatives (non-linearity)", params:{}},
  {id:"pool",  label:"MaxPool",emoji:"🏊", color:"#0d9488", desc:"Pooling — halves the spatial dimensions", params:{size:2}},
  {id:"flat",  label:"Flatten",emoji:"📐", color:"#d97706", desc:"Flatten 2D maps to 1D vector", params:{}},
  {id:"dense", label:"Dense",  emoji:"🧠", color:"#7c3aed", desc:"Fully connected layer for classification", params:{units:128}},
  {id:"out",   label:"Output", emoji:"🎯", color:"#059669", desc:"Final softmax layer — probabilities per class", params:{classes:10}},
];

function Activity4() {
  const [layers, setLayers] = useState([]);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(null);

  const addLayer = (type) => {
    if(layers.length>=8) return;
    setLayers(prev=>[...prev, {...type, uid: Date.now()}]);
    setChecked(false);setScore(null);
  };
  const removeLayer = (uid) => {
    setLayers(prev=>prev.filter(l=>l.uid!==uid));
    setChecked(false);setScore(null);
  };

  const IDEAL_ORDER = ["conv","relu","pool","conv","relu","pool","flat","dense","relu","out"];

  const checkArch = () => {
    setChecked(true);
    const ids = layers.map(l=>l.id);
    let pts=0;
    // must start with conv
    if(ids[0]==="conv") pts+=20;
    // relu after each conv
    ids.forEach((id,i)=>{if(id==="conv"&&ids[i+1]==="relu")pts+=15;});
    // has flatten before dense
    const flatIdx=ids.indexOf("flat"), denseIdx=ids.indexOf("dense");
    if(flatIdx!==-1 && denseIdx!==-1 && flatIdx<denseIdx) pts+=25;
    // ends with output
    if(ids[ids.length-1]==="out") pts+=20;
    // has at least one pool
    if(ids.includes("pool")) pts+=10;
    setScore(Math.min(100,pts));
  };

  // Compute output dims
  let dims = "28 × 28 × 1";
  const dimHistory = [{label:"Input",dims}];

  return (
    <div className="fade-up">
      <div className="section-badge">⬡ ACTIVITY 4 of 5</div>
      <div className="section-heading">Build Your Own CNN Architecture</div>
      <div className="section-desc">
        Drag-and-click to assemble a CNN for digit classification (like MNIST). Add layers in the correct order to build a working architecture. The goal is to design a network that correctly sequences Conv → ReLU → Pool → Flatten → Dense → Output. There's no single right answer — explore!
      </div>

      <div className="activity-row">
        <div>
          <div className="card card-indigo">
            <div className="card-title">🧱 Layer Toolbox</div>
            <div className="card-sub">Click any layer to add it to your architecture (max 8 layers).</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {LAYER_TYPES.map(lt=>(
                <button key={lt.id} className="activity-box" style={{border:`1.5px solid ${lt.color}20`,cursor:"pointer",textAlign:"left",padding:"12px 16px",display:"flex",alignItems:"center",gap:12,background:"white"}} onClick={()=>addLayer(lt)}>
                  <div style={{fontSize:22,flexShrink:0}}>{lt.emoji}</div>
                  <div>
                    <div style={{fontWeight:800,fontSize:14,color:lt.color,fontFamily:"DM Mono"}}>{lt.label}</div>
                    <div style={{fontSize:12,color:"var(--slate)",marginTop:2}}>{lt.desc}</div>
                    {lt.params && Object.keys(lt.params).length>0 && (
                      <div style={{marginTop:4}}>
                        {Object.entries(lt.params).map(([k,v])=>(
                          <span key={k} className="tag tag-amber" style={{marginRight:4,fontSize:10}}>{k}={v}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="card card-amber">
            <div className="card-title">🏗️ Your Architecture ({layers.length}/8 layers)</div>
            {layers.length===0 ? (
              <div className="canvas-section">
                <div style={{fontSize:40,marginBottom:10}}>🏗️</div>
                <div style={{fontWeight:700,color:"var(--slate)"}}>Your network is empty!</div>
                <div className="canvas-hint">Click layers on the left to build your CNN</div>
              </div>
            ) : (
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {layers.map((l,i)=>(
                  <div key={l.uid} style={{display:"flex",alignItems:"center",gap:10}}>
                    {i>0 && <div style={{width:2,height:16,background:"var(--border)",marginLeft:20,flexShrink:0}}/>}
                    <div style={{
                      flex:1,padding:"10px 14px",borderRadius:10,
                      background:`${l.color}12`,border:`1.5px solid ${l.color}40`,
                      display:"flex",alignItems:"center",gap:10
                    }}>
                      <div style={{fontSize:18}}>{l.emoji}</div>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:800,fontSize:13,color:l.color,fontFamily:"DM Mono"}}>{`${i+1}. ${l.label}`}</div>
                        <div style={{fontSize:11,color:"var(--slate)"}}>{l.desc}</div>
                      </div>
                      <button onClick={()=>removeLayer(l.uid)} style={{background:"none",border:"none",cursor:"pointer",fontSize:16,color:"var(--rose)",padding:"2px 6px"}}>✕</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{display:"flex",gap:10,marginTop:20,flexWrap:"wrap"}}>
              <button className="btn btn-amber" onClick={checkArch} disabled={layers.length<3}>
                🔍 Evaluate Architecture
              </button>
              <button className="btn btn-outline" onClick={()=>{setLayers([]);setChecked(false);setScore(null)}}>
                🗑️ Reset
              </button>
            </div>
          </div>

          {checked && score!==null && (
            <div className="card fade-up" style={{border:`2px solid ${score>=80?"var(--teal)":score>=50?"var(--amber)":"var(--rose)"}`,background:score>=80?"#f0fdfa":score>=50?"#fffbeb":"#fff1f2"}}>
              <div className="card-title" style={{color:score>=80?"var(--teal)":score>=50?"var(--amber-dark)":"var(--rose)"}}>
                {score>=80?"🎉 Excellent Architecture!":score>=50?"⚠️ Good Start — Needs Work":"❌ Architecture Issues"}
              </div>
              <div style={{fontSize:36,fontFamily:"DM Mono",fontWeight:900,color:score>=80?"var(--teal)":"var(--amber)",margin:"10px 0"}}>{score}/100</div>
              <div className="prog-bar-wrap"><div className="prog-bar" style={{width:`${score}%`,background:`linear-gradient(90deg,${score>=80?"var(--teal)":"var(--rose)"},${score>=80?"var(--amber)":"var(--amber)"})`}}/></div>
              <div style={{marginTop:12,fontSize:14,color:"var(--slate)",lineHeight:1.8}}>
                {layers.map(l=>l.id)[0]!=="conv" && "• Start with a Conv2D layer — it must be the first layer!  "}
                {!layers.map(l=>l.id).includes("flat") && "• Missing Flatten layer — needed to connect Conv layers to Dense layers!  "}
                {!layers.map(l=>l.id).includes("out") && "• Missing Output layer — add it as the final layer!  "}
                {layers.map(l=>l.id).filter(id=>id==="conv").some((id,i,arr)=>{
                  const allIds=layers.map(l=>l.id);
                  const convIdx=allIds.indexOf("conv");
                  return allIds[convIdx+1]!=="relu";
                }) && "• Place ReLU right after each Conv2D layer!  "}
                {score>=80 && "Great job! Your architecture follows the correct Conv → ReLU → Pool → Flatten → Dense → Output pattern. This is exactly how real CNNs are built!"}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card card-teal">
        <div className="card-title">📖 Reference: Standard CNN Architecture</div>
        <div className="card-sub">Here is a proven architecture for classifying 28×28 grayscale images into 10 classes (like MNIST digits):</div>
        <div className="code-block">
          <div className="cb-lang">Python / Keras</div>
          <span className="kw">from</span> <span className="fn">tensorflow.keras</span> <span className="kw">import</span> <span className="var">layers</span>, <span className="var">models</span>{"\n\n"}
          <span className="var">model</span> <span className="op">=</span> <span className="fn">models.Sequential</span>([{"\n"}
          {"  "}<span className="cm"># Block 1: First convolutional block</span>{"\n"}
          {"  "}<span className="fn">layers.Conv2D</span>(<span className="num">32</span>, (<span className="num">3</span>,<span className="num">3</span>), <span className="var">input_shape</span><span className="op">=</span>(<span className="num">28</span>,<span className="num">28</span>,<span className="num">1</span>)),   <span className="cm"># 32 filters, 3×3</span>{"\n"}
          {"  "}<span className="fn">layers.Activation</span>(<span className="str">'relu'</span>),                        <span className="cm"># Remove negatives</span>{"\n"}
          {"  "}<span className="fn">layers.MaxPooling2D</span>((<span className="num">2</span>,<span className="num">2</span>)),                   <span className="cm"># Halve size: 13×13</span>{"\n"}
          {"\n  "}<span className="cm"># Block 2: Second convolutional block</span>{"\n"}
          {"  "}<span className="fn">layers.Conv2D</span>(<span className="num">64</span>, (<span className="num">3</span>,<span className="num">3</span>)),                      <span className="cm"># 64 filters, 3×3</span>{"\n"}
          {"  "}<span className="fn">layers.Activation</span>(<span className="str">'relu'</span>),                        <span className="cm"># Remove negatives</span>{"\n"}
          {"  "}<span className="fn">layers.MaxPooling2D</span>((<span className="num">2</span>,<span className="num">2</span>)),                   <span className="cm"># Halve size: 5×5</span>{"\n"}
          {"\n  "}<span className="cm"># Classification head</span>{"\n"}
          {"  "}<span className="fn">layers.Flatten</span>(),                              <span className="cm"># 5×5×64 → 1600 values</span>{"\n"}
          {"  "}<span className="fn">layers.Dense</span>(<span className="num">128</span>, <span className="var">activation</span><span className="op">=</span><span className="str">'relu'</span>),            <span className="cm"># 128 neurons</span>{"\n"}
          {"  "}<span className="fn">layers.Dense</span>(<span className="num">10</span>,  <span className="var">activation</span><span className="op">=</span><span className="str">'softmax'</span>),         <span className="cm"># 10 digit classes</span>{"\n"}
          ]){"\n\n"}
          <span className="var">model</span>.<span className="fn">compile</span>(<span className="var">optimizer</span><span className="op">=</span><span className="str">'adam'</span>, <span className="var">loss</span><span className="op">=</span><span className="str">'sparse_categorical_crossentropy'</span>, <span className="var">metrics</span><span className="op">=</span>[<span className="str">'accuracy'</span>]){"\n"}
          <span className="var">model</span>.<span className="fn">fit</span>(<span className="var">X_train</span>, <span className="var">y_train</span>, <span className="var">epochs</span><span className="op">=</span><span className="num">10</span>, <span className="var">batch_size</span><span className="op">=</span><span className="num">32</span>)
        </div>
        <div className="info-grid">
          {[
            {emoji:"📊",title:"Input → Conv1",body:"28×28×1 → 26×26×32\n(28−3+1=26, with 32 filters)"},
            {emoji:"🏊",title:"After Pool1",body:"26×26×32 → 13×13×32\n(halved in each dimension)"},
            {emoji:"📊",title:"Conv2 → Pool2",body:"13→11→5 (after conv+pool)\n64 filters → 5×5×64 = 1600"},
            {emoji:"🎯",title:"Dense Output",body:"1600 → 128 → 10\n10 probabilities (one per digit)"},
          ].map(item=>(
            <div key={item.title} className="ibox">
              <div className="ibox-icon">{item.emoji}</div>
              <div className="ibox-title">{item.title}</div>
              <div className="ibox-body" style={{whiteSpace:"pre-line",fontFamily:"DM Mono",fontSize:12}}>{item.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ACTIVITY 5: CHALLENGE
───────────────────────────────────────────── */
function Activity5() {
  const scenarios = [
    {
      id:"s1", emoji:"🏥", title:"Medical: Tumor Detection",
      context:"You're building a CNN to detect tumors in 512×512 grayscale X-ray images. Binary classification: tumor / no tumor.",
      questions:[
        {q:"What should be the input shape?",correct:"(512,512,1)",hint:"Grayscale has 1 channel. Format: (height, width, channels)"},
        {q:"How many neurons in the final output layer?",correct:"2",hint:"Binary = 2 classes. OR use 1 neuron with sigmoid. We use 2 here."},
        {q:"What activation for the output layer?",correct:"softmax",hint:"Softmax for multi-class; sigmoid for binary. Either is valid!"},
      ]
    },
    {
      id:"s2", emoji:"🐕", title:"Pet Classifier: Cat vs Dog vs Bird",
      context:"Build a CNN for a pet app that classifies photos (224×224 RGB) into 3 pet types.",
      questions:[
        {q:"What should be the input shape?",correct:"(224,224,3)",hint:"RGB images have 3 channels (Red, Green, Blue)."},
        {q:"How many neurons in the output layer?",correct:"3",hint:"One output neuron per class — so 3 for Cat, Dog, Bird."},
        {q:"Which loss function should you use?",correct:"categorical_crossentropy",hint:"Use categorical_crossentropy for multi-class with softmax output."},
      ]
    },
    {
      id:"s3", emoji:"✋", title:"Sign Language: 26 Letters",
      context:"A CNN reads hand-sign photos (64×64 RGB) to recognize all 26 letters of the alphabet.",
      questions:[
        {q:"What is the input shape?",correct:"(64,64,3)",hint:"64×64 color image = (64, 64, 3)"},
        {q:"How many output neurons?",correct:"26",hint:"One per letter A–Z = 26 neurons."},
        {q:"After two Conv+Pool blocks on a 64×64 input, what is the feature map size?",correct:"14",hint:"64→62→31→29→14 (conv removes 2, pool halves, rounded down)"},
      ]
    },
  ];

  const [scIdx, setScIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [states, setStates] = useState({});
  const scenario = scenarios[scIdx];

  const check = (key, correct) => {
    const ans = (answers[key]||"").trim().toLowerCase();
    const isCorrect = ans===correct.toLowerCase() || ans===correct.toLowerCase().replace("_","");
    setStates(s=>({...s,[key]:isCorrect?"correct":"wrong"}));
  };

  return (
    <div className="fade-up">
      <div className="section-badge">⬡ ACTIVITY 5 of 5 — CHALLENGE</div>
      <div className="section-heading">Real-World CNN Design Challenge</div>
      <div className="section-desc">
        Three real-world problems! For each scenario, figure out the correct architecture choices. This tests whether you truly understand how CNN designs change based on the problem. Read the scenario carefully — the answer is in the details!
      </div>

      {/* Scenario selector */}
      <div className="team-badges">
        {scenarios.map((s,i)=>(
          <div key={s.id} className={`team-badge ${scIdx===i?"selected":""}`}
            style={{background:scIdx===i?"var(--ink)":"var(--paper2)",color:scIdx===i?"var(--amber-light)":"var(--ink)",border:`2px solid ${scIdx===i?"var(--amber)":"var(--border)"}`,cursor:"pointer"}}
            onClick={()=>{setScIdx(i);setAnswers({});setStates({})}}>
            <span>{s.emoji}</span><span style={{fontWeight:700}}>{s.title}</span>
          </div>
        ))}
      </div>

      <div className="card card-amber fade-up">
        <div className="section-badge" style={{marginBottom:12}}>Scenario {scIdx+1}</div>
        <div className="card-title">{scenario.emoji} {scenario.title}</div>
        <div className="callout" style={{marginBottom:24}}>
          <strong>📋 Scenario:</strong> {scenario.context}
        </div>

        {scenario.questions.map((sq,qi)=>{
          const key=`${scenario.id}-q${qi}`;
          return (
            <div key={key} style={{marginBottom:24,padding:20,background:"var(--paper2)",borderRadius:12,border:"1.5px solid var(--border)"}}>
              <div style={{fontWeight:800,fontSize:15,marginBottom:12,display:"flex",gap:10,alignItems:"center"}}>
                <span style={{width:26,height:26,borderRadius:"50%",background:"var(--ink)",color:"var(--amber-light)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"DM Mono",fontSize:12,flexShrink:0}}>{qi+1}</span>
                {sq.q}
              </div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
                <input className="ans-input" style={{maxWidth:280,marginBottom:0}} placeholder="Your answer..." value={answers[key]||""} onChange={e=>setAnswers(a=>({...a,[key]:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&check(key,sq.correct)}/>
                <button className="btn btn-amber" onClick={()=>check(key,sq.correct)}>Check ✓</button>
              </div>
              {states[key]==="correct" && <div className="ans-feedback ans-correct mt-8">✅ Correct! {sq.correct}</div>}
              {states[key]==="wrong" && <div className="ans-feedback ans-wrong mt-8">❌ Not quite. Hint: {sq.hint}</div>}
            </div>
          );
        })}

        {/* Show complete architecture */}
        <div style={{marginTop:24}}>
          <div className="card-title" style={{marginBottom:12}}>💡 Suggested Architecture</div>
          <div className="code-block">
            <div className="cb-lang">Keras</div>
            {scIdx===0 && <>
              <span className="var">model</span> <span className="op">=</span> <span className="fn">models.Sequential</span>([{"\n"}
              {"  "}<span className="fn">layers.Conv2D</span>(<span className="num">32</span>, (<span className="num">3</span>,<span className="num">3</span>), <span className="var">activation</span><span className="op">=</span><span className="str">'relu'</span>, <span className="var">input_shape</span><span className="op">=</span>(<span className="num">512</span>,<span className="num">512</span>,<span className="num">1</span>)),{"\n"}
              {"  "}<span className="fn">layers.MaxPooling2D</span>((<span className="num">2</span>,<span className="num">2</span>)),{"\n"}
              {"  "}<span className="fn">layers.Conv2D</span>(<span className="num">64</span>, (<span className="num">3</span>,<span className="num">3</span>), <span className="var">activation</span><span className="op">=</span><span className="str">'relu'</span>),{"\n"}
              {"  "}<span className="fn">layers.MaxPooling2D</span>((<span className="num">2</span>,<span className="num">2</span>)),{"\n"}
              {"  "}<span className="fn">layers.Flatten</span>(),{"\n"}
              {"  "}<span className="fn">layers.Dense</span>(<span className="num">128</span>, <span className="var">activation</span><span className="op">=</span><span className="str">'relu'</span>),{"\n"}
              {"  "}<span className="fn">layers.Dense</span>(<span className="num">2</span>, <span className="var">activation</span><span className="op">=</span><span className="str">'softmax'</span>),   <span className="cm"># tumor / no tumor</span>{"\n"}
              ]){"\n"}
              <span className="fn">model.compile</span>(<span className="var">loss</span><span className="op">=</span><span className="str">'categorical_crossentropy'</span>, <span className="var">optimizer</span><span className="op">=</span><span className="str">'adam'</span>)
            </>}
            {scIdx===1 && <>
              <span className="var">model</span> <span className="op">=</span> <span className="fn">models.Sequential</span>([{"\n"}
              {"  "}<span className="fn">layers.Conv2D</span>(<span className="num">32</span>, (<span className="num">3</span>,<span className="num">3</span>), <span className="var">activation</span><span className="op">=</span><span className="str">'relu'</span>, <span className="var">input_shape</span><span className="op">=</span>(<span className="num">224</span>,<span className="num">224</span>,<span className="num">3</span>)),{"\n"}
              {"  "}<span className="fn">layers.MaxPooling2D</span>((<span className="num">2</span>,<span className="num">2</span>)),{"\n"}
              {"  "}<span className="fn">layers.Conv2D</span>(<span className="num">64</span>, (<span className="num">3</span>,<span className="num">3</span>), <span className="var">activation</span><span className="op">=</span><span className="str">'relu'</span>),{"\n"}
              {"  "}<span className="fn">layers.MaxPooling2D</span>((<span className="num">2</span>,<span className="num">2</span>)),{"\n"}
              {"  "}<span className="fn">layers.Flatten</span>(),{"\n"}
              {"  "}<span className="fn">layers.Dense</span>(<span className="num">128</span>, <span className="var">activation</span><span className="op">=</span><span className="str">'relu'</span>),{"\n"}
              {"  "}<span className="fn">layers.Dense</span>(<span className="num">3</span>, <span className="var">activation</span><span className="op">=</span><span className="str">'softmax'</span>),   <span className="cm"># cat, dog, bird</span>{"\n"}
              ]){"\n"}
              <span className="fn">model.compile</span>(<span className="var">loss</span><span className="op">=</span><span className="str">'categorical_crossentropy'</span>, <span className="var">optimizer</span><span className="op">=</span><span className="str">'adam'</span>)
            </>}
            {scIdx===2 && <>
              <span className="var">model</span> <span className="op">=</span> <span className="fn">models.Sequential</span>([{"\n"}
              {"  "}<span className="fn">layers.Conv2D</span>(<span className="num">32</span>, (<span className="num">3</span>,<span className="num">3</span>), <span className="var">activation</span><span className="op">=</span><span className="str">'relu'</span>, <span className="var">input_shape</span><span className="op">=</span>(<span className="num">64</span>,<span className="num">64</span>,<span className="num">3</span>)),{"\n"}
              {"  "}<span className="fn">layers.MaxPooling2D</span>((<span className="num">2</span>,<span className="num">2</span>)),{"\n"}
              {"  "}<span className="fn">layers.Conv2D</span>(<span className="num">64</span>, (<span className="num">3</span>,<span className="num">3</span>), <span className="var">activation</span><span className="op">=</span><span className="str">'relu'</span>),{"\n"}
              {"  "}<span className="fn">layers.MaxPooling2D</span>((<span className="num">2</span>,<span className="num">2</span>)),{"\n"}
              {"  "}<span className="fn">layers.Flatten</span>(),{"\n"}
              {"  "}<span className="fn">layers.Dense</span>(<span className="num">256</span>, <span className="var">activation</span><span className="op">=</span><span className="str">'relu'</span>),{"\n"}
              {"  "}<span className="fn">layers.Dense</span>(<span className="num">26</span>, <span className="var">activation</span><span className="op">=</span><span className="str">'softmax'</span>),   <span className="cm"># A–Z</span>{"\n"}
              ]){"\n"}
              <span className="fn">model.compile</span>(<span className="var">loss</span><span className="op">=</span><span className="str">'sparse_categorical_crossentropy'</span>, <span className="var">optimizer</span><span className="op">=</span><span className="str">'adam'</span>)
            </>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SOLUTIONS REFERENCE
───────────────────────────────────────────── */
function Solutions() {
  const [open, setOpen] = useState({});
  const toggle = k => setOpen(s=>({...s,[k]:!s[k]}));

  const items = [
    {id:"conv",title:"Convolution: The Core Operation",content:(
      <>
        <p style={{color:"var(--slate)",lineHeight:1.8,marginBottom:16}}>A convolution at position (r,c) with a 3×3 kernel K on image I is computed as:</p>
        <div className="formula">output[r][c] = Σᵢ Σⱼ I[r+i][c+j] × K[i][j]</div>
        <p style={{color:"var(--slate)",lineHeight:1.8}}>The filter slides across the image with a stride (usually 1). Each position produces one output value. With a 5×5 image and 3×3 kernel: output is (5−3+1)×(5−3+1) = <strong>3×3</strong>.</p>
        <p style={{color:"var(--slate)",lineHeight:1.8,marginTop:8}}>Each filter learns to detect ONE type of feature. A CNN with 32 filters produces 32 feature maps simultaneously — each showing where a different pattern appears.</p>
      </>
    )},
    {id:"relu",title:"ReLU: Why Non-Linearity Matters",content:(
      <>
        <div className="formula">ReLU(x) = max(0, x){"\n"}<span className="formula-comment"># Negative → 0 | Positive → unchanged</span></div>
        <p style={{color:"var(--slate)",lineHeight:1.8,marginTop:12}}>Without activation functions, stacking multiple layers would be mathematically equivalent to just ONE layer (because the composition of linear functions is linear). ReLU breaks this by introducing non-linearity, allowing the network to learn ANY function given enough neurons.</p>
        <p style={{color:"var(--slate)",lineHeight:1.8,marginTop:8}}>ReLU is preferred over sigmoid/tanh because it doesn't suffer from the vanishing gradient problem: gradients stay healthy even in deep networks.</p>
      </>
    )},
    {id:"pool",title:"Max Pooling: Compression with Intelligence",content:(
      <>
        <p style={{color:"var(--slate)",lineHeight:1.8,marginBottom:12}}>Max pooling over a 2×2 window with stride 2:</p>
        <div className="formula">output[r][c] = max(input[2r][2c], input[2r][2c+1], input[2r+1][2c], input[2r+1][2c+1])</div>
        <p style={{color:"var(--slate)",lineHeight:1.8,marginTop:12}}>This provides <strong>translation invariance</strong> — a cat in the top-left of a 2×2 window produces the same pooled value as a cat in the bottom-right. The network becomes less sensitive to exact location, only to presence. Size goes from N×N to (N/2)×(N/2).</p>
      </>
    )},
    {id:"training",title:"Training: Backpropagation & Gradient Descent",content:(
      <>
        <p style={{color:"var(--slate)",lineHeight:1.8,marginBottom:12}}>Training a CNN involves 4 repeated steps:</p>
        <div className="formula">
          <span className="formula-comment"># 1. Forward pass — compute predictions</span>{"\n"}
          ŷ = CNN(X){"\n\n"}
          <span className="formula-comment"># 2. Compute loss (how wrong we are)</span>{"\n"}
          Loss = CrossEntropy(ŷ, y){"\n\n"}
          <span className="formula-comment"># 3. Backpropagation — compute gradients</span>{"\n"}
          ∂Loss/∂W for every weight W{"\n\n"}
          <span className="formula-comment"># 4. Update weights (gradient descent)</span>{"\n"}
          W = W − α × (∂Loss/∂W)   {" "}<span className="formula-comment"># α = learning rate</span>
        </div>
        <p style={{color:"var(--slate)",lineHeight:1.8,marginTop:12}}>Repeat for all training examples, many epochs. Over time, weights converge to values that minimize the loss — the network "learns" the patterns!</p>
      </>
    )},
    {id:"dims",title:"Dimension Tracking Cheat Sheet",content:(
      <>
        <table style={{width:"100%",borderCollapse:"collapse",fontFamily:"DM Mono",fontSize:13}}>
          <thead><tr style={{background:"var(--ink)",color:"var(--amber-light)"}}>
            {["Operation","Formula","Example (Input 28×28×1)"].map(h=><th key={h} style={{padding:"10px 14px"}}>{h}</th>)}
          </tr></thead>
          <tbody>
            {[
              ["Conv2D (no pad)","(W−F+1) × (H−F+1) × D","28−3+1=26 → 26×26×32"],
              ["Conv2D (same pad)","W × H × D (unchanged)","28×28×32"],
              ["MaxPool (2×2)","(W/2) × (H/2) × D","26/2=13 → 13×13×32"],
              ["Flatten","W × H × D → single number","13×13×32 = 5,408"],
              ["Dense","output neurons","5408 → 128"],
              ["Output Softmax","num_classes","128 → 10"],
            ].map(([op,form,ex],i)=>(
              <tr key={i} style={{background:i%2===0?"var(--paper2)":"white",borderBottom:"1px solid var(--border)"}}>
                <td style={{padding:"10px 14px",color:"var(--teal)",fontWeight:700}}>{op}</td>
                <td style={{padding:"10px 14px",color:"var(--indigo)"}}>{form}</td>
                <td style={{padding:"10px 14px",color:"var(--amber-dark)"}}>{ex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )},
  ];

  return (
    <div className="fade-up">
      <div className="section-badge">⬡ SOLUTIONS & REFERENCE</div>
      <div className="section-heading">Complete Solutions & Deep Dives</div>
      <div className="section-desc">
        Full solutions to all activities plus deep-dive explanations. Use this after attempting the activities yourself — or as a study reference sheet!
      </div>
      {items.map(item=>(
        <div key={item.id} className="card" style={{marginBottom:16,cursor:"pointer"}} onClick={()=>toggle(item.id)}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div className="card-title" style={{marginBottom:0}}>{item.title}</div>
            <div style={{fontSize:22,color:"var(--amber)",transform:open[item.id]?"rotate(180deg)":"none",transition:"transform .2s"}}>▼</div>
          </div>
          {open[item.id] && <div className="fade-up" style={{marginTop:16}}>{item.content}</div>}
        </div>
      ))}

      {/* Python full working example */}
      <div className="card card-teal">
        <div className="card-title">🐍 Complete Working Python Example — MNIST CNN</div>
        <div className="card-sub">This is a fully runnable script that trains a CNN on the MNIST handwritten digit dataset (60,000 training images). Run it in Google Colab for free!</div>
        <div className="code-block">
          <div className="cb-lang">Python (TensorFlow 2.x)</div>
          <span className="cm">#!/usr/bin/env python3</span>{"\n"}
          <span className="cm">"""</span>{"\n"}
          <span className="cm">CNN Class Activity — Complete MNIST Implementation</span>{"\n"}
          <span className="cm">Expected accuracy: ~99% on test set after 10 epochs</span>{"\n"}
          <span className="cm">"""</span>{"\n\n"}
          <span className="kw">import</span> <span className="var">numpy</span> <span className="kw">as</span> <span className="var">np</span>{"\n"}
          <span className="kw">import</span> <span className="var">tensorflow</span> <span className="kw">as</span> <span className="var">tf</span>{"\n"}
          <span className="kw">from</span> <span className="fn">tensorflow.keras</span> <span className="kw">import</span> <span className="var">layers</span>, <span className="var">models</span>{"\n"}
          <span className="kw">from</span> <span className="fn">tensorflow.keras.datasets</span> <span className="kw">import</span> <span className="var">mnist</span>{"\n\n"}
          <span className="cm"># ─── Step 1: Load & Preprocess Data ───────────────────</span>{"\n"}
          <span className="cm"># mnist has 60,000 training + 10,000 test images (28×28 grayscale)</span>{"\n"}
          <span className="op">(</span><span className="var">X_train</span>, <span className="var">y_train</span><span className="op">)</span>, <span className="op">(</span><span className="var">X_test</span>, <span className="var">y_test</span><span className="op">)</span> = <span className="fn">mnist.load_data</span>(){"\n\n"}
          <span className="cm"># Reshape: add channel dimension (28,28) → (28,28,1)</span>{"\n"}
          <span className="var">X_train</span> = <span className="var">X_train</span>.<span className="fn">reshape</span>(-<span className="num">1</span>, <span className="num">28</span>, <span className="num">28</span>, <span className="num">1</span>).<span className="fn">astype</span>(<span className="str">'float32'</span>) / <span className="num">255.0</span>{"\n"}
          <span className="var">X_test</span>  = <span className="var">X_test</span>.<span className="fn">reshape</span>(-<span className="num">1</span>, <span className="num">28</span>, <span className="num">28</span>, <span className="num">1</span>).<span className="fn">astype</span>(<span className="str">'float32'</span>) / <span className="num">255.0</span>{"\n"}
          <span className="cm"># Normalize pixels 0–255 → 0.0–1.0 for stable training</span>{"\n\n"}
          <span className="cm"># ─── Step 2: Build the CNN ────────────────────────────</span>{"\n"}
          <span className="var">model</span> = <span className="fn">models.Sequential</span>(<span className="var">name</span>=<span className="str">"DigitCNN"</span>){"\n\n"}
          <span className="cm"># BLOCK 1 — Feature extraction (low-level: edges, curves)</span>{"\n"}
          <span className="var">model</span>.<span className="fn">add</span>(<span className="fn">layers.Conv2D</span>(<span className="num">32</span>, (<span className="num">3</span>,<span className="num">3</span>), <span className="var">activation</span>=<span className="str">'relu'</span>, <span className="var">input_shape</span>=(<span className="num">28</span>,<span className="num">28</span>,<span className="num">1</span>)))<br/>
          <span className="cm"># Output: 26×26×32 — 32 feature maps detecting different patterns</span>{"\n"}
          <span className="var">model</span>.<span className="fn">add</span>(<span className="fn">layers.MaxPooling2D</span>((<span className="num">2</span>,<span className="num">2</span>)))<br/>
          <span className="cm"># Output: 13×13×32 — halved, dominant features kept</span>{"\n\n"}
          <span className="cm"># BLOCK 2 — Deeper features (shapes, digit-specific patterns)</span>{"\n"}
          <span className="var">model</span>.<span className="fn">add</span>(<span className="fn">layers.Conv2D</span>(<span className="num">64</span>, (<span className="num">3</span>,<span className="num">3</span>), <span className="var">activation</span>=<span className="str">'relu'</span>))<br/>
          <span className="cm"># Output: 11×11×64 — deeper, more abstract features</span>{"\n"}
          <span className="var">model</span>.<span className="fn">add</span>(<span className="fn">layers.MaxPooling2D</span>((<span className="num">2</span>,<span className="num">2</span>)))<br/>
          <span className="cm"># Output: 5×5×64 = 1,600 values</span>{"\n\n"}
          <span className="cm"># CLASSIFICATION HEAD — Decide which digit it is</span>{"\n"}
          <span className="var">model</span>.<span className="fn">add</span>(<span className="fn">layers.Flatten</span>())          <span className="cm"># 1600 values in a row</span>{"\n"}
          <span className="var">model</span>.<span className="fn">add</span>(<span className="fn">layers.Dense</span>(<span className="num">64</span>, <span className="var">activation</span>=<span className="str">'relu'</span>))  <span className="cm"># combine features</span>{"\n"}
          <span className="var">model</span>.<span className="fn">add</span>(<span className="fn">layers.Dense</span>(<span className="num">10</span>, <span className="var">activation</span>=<span className="str">'softmax'</span>)) <span className="cm"># 10 digits 0–9</span>{"\n\n"}
          <span className="cm"># ─── Step 3: Compile ─────────────────────────────────</span>{"\n"}
          <span className="var">model</span>.<span className="fn">compile</span>({"\n"}
          {"  "}<span className="var">optimizer</span>=<span className="str">'adam'</span>,            <span className="cm"># adaptive learning rate optimizer</span>{"\n"}
          {"  "}<span className="var">loss</span>=<span className="str">'sparse_categorical_crossentropy'</span>,  <span className="cm"># for integer labels</span>{"\n"}
          {"  "}<span className="var">metrics</span>=[<span className="str">'accuracy'</span>]{"\n"}
          ){"\n\n"}
          <span className="var">model</span>.<span className="fn">summary</span>()  <span className="cm"># prints layer shapes & parameter counts</span>{"\n\n"}
          <span className="cm"># ─── Step 4: Train ───────────────────────────────────</span>{"\n"}
          <span className="var">history</span> = <span className="var">model</span>.<span className="fn">fit</span>({"\n"}
          {"  "}<span className="var">X_train</span>, <span className="var">y_train</span>,{"\n"}
          {"  "}<span className="var">epochs</span>=<span className="num">10</span>,         <span className="cm"># 10 full passes through training data</span>{"\n"}
          {"  "}<span className="var">batch_size</span>=<span className="num">32</span>,    <span className="cm"># update weights every 32 images</span>{"\n"}
          {"  "}<span className="var">validation_split</span>=<span className="num">0.1</span>  <span className="cm"># 10% held out for validation</span>{"\n"}
          ){"\n\n"}
          <span className="cm"># ─── Step 5: Evaluate & Predict ─────────────────────</span>{"\n"}
          <span className="var">test_loss</span>, <span className="var">test_acc</span> = <span className="var">model</span>.<span className="fn">evaluate</span>(<span className="var">X_test</span>, <span className="var">y_test</span>){"\n"}
          <span className="fn">print</span>(<span className="str">f"Test Accuracy: </span><span className="op">{"{"}</span><span className="var">test_acc</span>*<span className="num">100</span><span className="op">:</span><span className="num">.2f</span><span className="op">{"}"}</span><span className="str">%"</span>){"\n\n"}
          <span className="cm"># Make a prediction on one image:</span>{"\n"}
          <span className="var">img</span> = <span className="var">X_test</span>[<span className="num">0</span>].<span className="fn">reshape</span>(<span className="num">1</span>, <span className="num">28</span>, <span className="num">28</span>, <span className="num">1</span>)   <span className="cm"># add batch dim</span>{"\n"}
          <span className="var">probs</span> = <span className="var">model</span>.<span className="fn">predict</span>(<span className="var">img</span>)[<span className="num">0</span>]                <span className="cm"># 10 probabilities</span>{"\n"}
          <span className="fn">print</span>(<span className="str">f"Predicted: </span><span className="op">{"{"}</span><span className="fn">np.argmax</span>(<span className="var">probs</span>)<span className="op">{"}"}</span><span className="str">, Confidence: </span><span className="op">{"{"}</span><span className="fn">max</span>(<span className="var">probs</span>)*<span className="num">100</span><span className="op">:</span><span className="num">.1f</span><span className="op">{"}"}</span><span className="str">%"</span>)
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   OVERVIEW
───────────────────────────────────────────── */
function Overview({ setSection }) {
  return (
    <div className="fade-up">
      <div className="section-badge">⬡ CLASS ACTIVITY GUIDE</div>
      <div className="section-heading">CNN Implementation — Class Activities</div>
      <div className="section-desc">
        Five hands-on activities designed for a 90-minute class session. Each activity builds on the last, taking you from understanding individual operations all the way to designing complete CNN architectures for real-world problems. Work individually or in pairs!
      </div>

      {/* Session at a glance */}
      <div className="card card-amber">
        <div className="card-title">⏱️ Session At a Glance (90 min)</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12,marginTop:8}}>
          {[
            {time:"0–10 min",label:"Warm-up",color:"var(--indigo-light)",tc:"var(--indigo)"},
            {time:"10–30 min",label:"Activity 1\nConvolution",color:"var(--amber-light)",tc:"var(--amber-dark)"},
            {time:"30–45 min",label:"Activity 2\nReLU + Pool",color:"var(--rose-light)",tc:"var(--rose)"},
            {time:"45–55 min",label:"Activity 3\nMath by Hand",color:"var(--teal-light)",tc:"var(--teal)"},
            {time:"55–75 min",label:"Activity 4\nBuild a CNN",color:"var(--indigo-light)",tc:"var(--indigo)"},
            {time:"75–90 min",label:"Activity 5\nChallenge",color:"var(--amber-light)",tc:"var(--amber-dark)"},
          ].map((s,i)=>(
            <div key={i} style={{background:s.color,borderRadius:10,padding:"12px 14px",textAlign:"center"}}>
              <div style={{fontFamily:"DM Mono",fontSize:10,color:s.tc,marginBottom:4}}>{s.time}</div>
              <div style={{fontWeight:800,fontSize:13,color:s.tc,whiteSpace:"pre-wrap"}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20,marginTop:8}}>
        {[
          {id:"a1",emoji:"🔬",title:"Activity 1: Convolution Explorer",time:"20 min",diff:"⭐⭐",desc:"Interactively slide kernels over letter images. See exactly what convolution does — try 4 different kernels (edge, vertical, horizontal, blur) and inspect the dot-product calculation cell by cell.",skills:["Dot product","Feature maps","Stride & padding"]},
          {id:"a2",emoji:"⚡",title:"Activity 2: ReLU + Max Pooling",time:"15 min",diff:"⭐⭐",desc:"Apply ReLU to a 4×4 feature map and watch negatives vanish. Then compute max pooling by clicking each 2×2 region and entering the maximum — building up the pooled output yourself.",skills:["ReLU formula","Max pooling","Dimension reduction"]},
          {id:"a3",emoji:"🧮",title:"Activity 3: Math by Hand",time:"10 min",diff:"⭐⭐⭐",desc:"Three calculation problems: neuron forward pass (weights, bias, ReLU), Softmax probabilities (exponentials), and feature map size tracking. Step-by-step hints + solutions available.",skills:["Weighted sum","Softmax","Output dimensions"]},
          {id:"a4",emoji:"🎨",title:"Activity 4: Build Your CNN",time:"20 min",diff:"⭐⭐⭐",desc:"Drag layers from a toolbox to construct a complete CNN architecture. The evaluator scores your design and gives feedback: 'Missing flatten!', 'ReLU must follow Conv2D!', etc.",skills:["Architecture design","Layer ordering","Keras code"]},
          {id:"a5",emoji:"🏁",title:"Activity 5: Real-World Challenge",time:"15 min",diff:"⭐⭐⭐⭐",desc:"Three real-world scenarios: medical X-rays, pet classifier, and sign language recognition. Design the correct input shapes, output neurons, and loss functions for each unique problem.",skills:["Input shape","Output classes","Loss functions"]},
        ].map(act=>(
          <div key={act.id} className="card" style={{cursor:"pointer",transition:"all .2s"}} onClick={()=>setSection(act.id)}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(0,0,0,.15)"}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow=""}}>
            <div style={{fontSize:32,marginBottom:10}}>{act.emoji}</div>
            <div style={{fontWeight:800,fontSize:16,marginBottom:6}}>{act.title}</div>
            <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
              <span className="tag tag-amber">⏱ {act.time}</span>
              <span className="tag tag-ink">{act.diff} Difficulty</span>
            </div>
            <p style={{fontSize:13,color:"var(--slate)",lineHeight:1.7,marginBottom:12}}>{act.desc}</p>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {act.skills.map(s=><span key={s} className="tag tag-teal">{s}</span>)}
            </div>
            <div style={{marginTop:14,color:"var(--amber-dark)",fontWeight:700,fontSize:13}}>Start Activity →</div>
          </div>
        ))}
      </div>

      {/* Learning objectives */}
      <div className="card card-teal" style={{marginTop:8}}>
        <div className="card-title">🎯 Learning Objectives</div>
        <div className="info-grid">
          {[
            {emoji:"🔢",title:"Understand Convolution",body:"Explain what a kernel does and manually compute a 3×3 convolution output value."},
            {emoji:"⚡",title:"Apply Activations",body:"Apply ReLU to any input and explain why it is necessary for deep networks."},
            {emoji:"📐",title:"Track Dimensions",body:"Calculate output dimensions after Conv, Pool, and Flatten operations."},
            {emoji:"🏗️",title:"Design Architectures",body:"Assemble a valid CNN layer sequence and justify each design choice."},
            {emoji:"🌍",title:"Generalize to Problems",body:"Map real-world tasks (medical, classification) to correct CNN parameters."},
            {emoji:"🐍",title:"Read CNN Code",body:"Read and understand a Keras CNN implementation and trace the data flow."},
          ].map(o=>(
            <div key={o.title} className="ibox">
              <div className="ibox-icon">{o.emoji}</div>
              <div className="ibox-title">{o.title}</div>
              <div className="ibox-body">{o.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────── */
function CNNClassActivity() {
  const [section, setSection] = useState("overview");
  const [completed, setCompleted] = useState(new Set());

  const markDone = (id) => setCompleted(prev => new Set([...prev, id]));

  const sectionMap = {
    overview: <Overview setSection={setSection} />,
    a1: <Activity1 />,
    a2: <Activity2 />,
    a3: <Activity3 />,
    a4: <Activity4 />,
    a5: <Activity5 />,
    solutions: <Solutions />,
  };

  const ACTIVITY_IDS = ["a1","a2","a3","a4","a5"];

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        <header className="header">
          <div className="header-inner">
            <div>
              <div className="logo">
                CNN Class Activities
                <span>Convolutional Neural Networks — Hands-On Implementation</span>
              </div>
            </div>
            <div className="progress-track">
              {ACTIVITY_IDS.map((id,i)=>(
                <div key={id} className={`pt-dot ${section===id?"active":completed.has(id)?"done":""}`}
                  onClick={()=>setSection(id)}>
                  {completed.has(id)?"✓":i+1}
                </div>
              ))}
              <div style={{fontSize:12,color:"#94a3b8",fontFamily:"DM Mono",marginLeft:6}}>
                {completed.size}/{ACTIVITY_IDS.length} done
              </div>
            </div>
          </div>
        </header>

        <main className="main">
          <nav className="activity-nav">
            {ACTIVITIES.map(act=>(
              <button key={act.id} className={`anav-btn ${section===act.id?"active":""}`}
                onClick={()=>{ setSection(act.id); if(ACTIVITY_IDS.includes(act.id)) markDone(act.id); }}>
                <span>{act.emoji}</span> {act.label}
              </button>
            ))}
          </nav>

          <div key={section}>
            {sectionMap[section]}
          </div>
        </main>
      </div>
    </>
  );
}



// ─── DESIGN TOKENS — Darkroom / Photo Lab Aesthetic ──────────────────────────
const C = {
  bg:      "#0e0a06",
  dark:    "#150f08",
  surface: "#1c1409",
  card:    "#221a0d",
  cardHov: "#2a200f",
  border:  "#4a3515",
  amber:   "#f0a500",
  amberL:  "#ffd166",
  amberD:  "#8a5e00",
  cream:   "#ede0c0",
  rust:    "#e05c2a",
  rustL:   "#ff8c5a",
  sage:    "#6ab87a",
  sky:     "#5ab8d4",
  lavender:"#c09fff",
  red:     "#ff4444",
  text:    "#d4c4a0",
  textS:   "#8a7555",
  textD:   "#4a3a25",
  mono:    "'Courier New', monospace",
  serif:   "'Georgia', serif",
  conv:    "#f0a500",
  relu:    "#e05c2a",
  pool:    "#6ab87a",
  fc:      "#5ab8d4",
  out:     "#c09fff",
};

// ─── PIXEL DATA: 10x10 simplified dog face (0–255 grayscale) ─────────────────
const DOG = [
  [ 30,  30, 200, 220, 220, 220, 220, 200,  30,  30],
  [ 30, 200, 240, 245, 245, 245, 245, 240, 200,  30],
  [200, 245,  20, 245, 245, 245, 245,  20, 245, 200],
  [200, 245, 245, 245, 245, 245, 245, 245, 245, 200],
  [220, 245, 245,  40,  40, 245,  40,  40, 245, 220],
  [220, 245, 245, 245,  20,  20, 245, 245, 245, 220],
  [220, 245, 245, 245, 245, 245, 245, 245, 245, 220],
  [200, 220, 245, 245, 245, 245, 245, 245, 220, 200],
  [ 30, 200, 220, 245, 245, 245, 245, 220, 200,  30],
  [ 30,  30, 200, 200, 220, 220, 200, 200,  30,  30],
];

// 6x6 sub-section for convolution demo
const DEMO_IMG = [
  [200, 220, 245, 245, 220, 200],
  [220, 245,  20, 245,  20, 245],
  [245, 245, 245, 245, 245, 245],
  [245, 245,  40,  20, 245, 245],
  [220, 245, 245, 245, 245, 220],
  [200, 220, 245, 245, 220, 200],
];

// Common 3x3 kernels
const KERNELS = {
  edge: {
    name: "Edge Detector",
    vals: [[-1,-1,-1],[-1,8,-1],[-1,-1,-1]],
    desc: "Highlights sharp boundaries where pixel values change suddenly. Finds edges of the dog's ears, eyes, and outline.",
    color: C.conv,
  },
  blur: {
    name: "Blur / Smooth",
    vals: [[1/9,1/9,1/9],[1/9,1/9,1/9],[1/9,1/9,1/9]],
    desc: "Averages surrounding pixels together. Reduces noise. Used in early preprocessing stages.",
    color: C.sky,
  },
  sharpen: {
    name: "Sharpen",
    vals: [[0,-1,0],[-1,5,-1],[0,-1,0]],
    desc: "Enhances fine detail by amplifying differences from neighbors. Makes the dog's fur texture more prominent.",
    color: C.rustL,
  },
  vertical: {
    name: "Vertical Edge",
    vals: [[-1,0,1],[-1,0,1],[-1,0,1]],
    desc: "Detects vertical lines only. Finds vertical boundaries like the sides of the dog's face.",
    color: C.sage,
  },
};

// ─── MATH HELPERS ─────────────────────────────────────────────────────────────
const relu = x => Math.max(0, x);
const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
const grayToRgb = v => {
  const g = clamp(Math.round(v), 0, 255);
  return "rgb(" + g + "," + g + "," + g + ")";
};
const convPixel = (img, kr, row, col) => {
  let sum = 0;
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      sum += img[row + i][col + j] * kr[i][j];
  return sum;
};
const applyConv = (img, kr) => {
  const rows = img.length - 2, cols = img[0].length - 2;
  return Array.from({length: rows}, (_, r) =>
    Array.from({length: cols}, (_, c) => convPixel(img, kr, r, c))
  );
};
const applyRelu = grid => grid.map(row => row.map(relu));
const maxPool = grid => {
  const rOut = Math.floor(grid.length / 2);
  const cOut = Math.floor(grid[0].length / 2);
  return Array.from({length: rOut}, (_, r) =>
    Array.from({length: cOut}, (_, c) =>
      Math.max(grid[2*r][2*c], grid[2*r][2*c+1], grid[2*r+1][2*c], grid[2*r+1][2*c+1])
    )
  );
};
const fmt = (n, d = 2) => Number(n).toFixed(d);

// ─── UI PRIMITIVES ────────────────────────────────────────────────────────────
const Label = ({ children, color = C.amber, style = {} }) => (
  <div style={{ fontFamily: C.mono, fontSize: 9, letterSpacing: 3, color, marginBottom: 6, ...style }}>{children}</div>
);
const InfoBox = ({ icon, title, body, color = C.amber }) => (
  <div style={{
    background: color + "0a", border: "1px solid " + color + "33",
    borderLeft: "3px solid " + color, borderRadius: 6,
    padding: "12px 16px", margin: "10px 0"
  }}>
    <div style={{ fontFamily: C.mono, fontSize: 9, color, letterSpacing: 2, marginBottom: 6 }}>{icon} {title}</div>
    <div style={{ color: C.text, fontSize: 13, lineHeight: 1.75 }}>{body}</div>
  </div>
);
const MathBox = ({ title, lines, note, color = C.amber }) => (
  <div style={{ margin: "10px 0" }}>
    {title && <div style={{ fontFamily: C.mono, fontSize: 9, color, letterSpacing: 3, borderBottom: "1px solid " + color + "33", paddingBottom: 4 }}>{title}</div>}
    <pre style={{
      background: "#080602", border: "1px solid " + color + "33",
      borderTop: title ? "none" : undefined,
      borderRadius: title ? "0 0 6px 6px" : 6,
      margin: 0, padding: "12px 16px",
      fontFamily: C.mono, fontSize: 12, color: C.cream,
      lineHeight: 1.9, overflowX: "auto", whiteSpace: "pre",
    }}>{lines}</pre>
    {note && <div style={{ fontFamily: C.mono, fontSize: 10, color: C.textS, padding: "5px 10px", background: color + "08", borderRadius: "0 0 4px 4px" }}>{note}</div>}
  </div>
);

// ─── PIXEL GRID RENDERER ──────────────────────────────────────────────────────
function PixelGrid({ grid, cellSize = 24, highlight = null, highlightColor = C.amber, normalize = false, showVals = false }) {
  if (!grid || !grid.length) return null;
  const vals = grid.flat();
  const lo = Math.min(...vals), hi = Math.max(...vals);
  const norm = v => hi === lo ? 128 : Math.round(((v - lo) / (hi - lo)) * 255);
  return (
    <div style={{ display: "inline-block", border: "1px solid " + C.border, borderRadius: 4, overflow: "hidden", lineHeight: 0 }}>
      {grid.map((row, r) => (
        <div key={r} style={{ display: "flex" }}>
          {row.map((val, c) => {
            const isHL = highlight && r >= highlight.r && r < highlight.r + highlight.size && c >= highlight.c && c < highlight.c + highlight.size;
            const dispV = normalize ? norm(val) : clamp(Math.round(Math.abs(val)), 0, 255);
            return (
              <div key={c} style={{
                width: cellSize, height: cellSize,
                background: grayToRgb(dispV),
                border: isHL ? "2px solid " + highlightColor : "1px solid " + (dispV < 128 ? "#ffffff18" : "#00000018"),
                display: "flex", alignItems: "center", justifyContent: "center",
                boxSizing: "border-box", position: "relative",
                zIndex: isHL ? 2 : 1,
                outline: isHL ? "1px solid " + highlightColor : "none",
              }}>
                {showVals && (
                  <span style={{ fontFamily: C.mono, fontSize: 7, color: dispV > 128 ? "#000" : "#fff", lineHeight: 1 }}>
                    {Math.round(val)}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ─── SECTION: OVERVIEW & HISTORY ──────────────────────────────────────────────
function SecOverview() {
  const [activeEra, setActiveEra] = useState(null);
  const history = [
    { year: "1943", name: "McCulloch-Pitts Neuron", desc: "First mathematical model of a biological neuron. Warren McCulloch and Walter Pitts showed neurons could compute logical functions.", color: C.textS },
    { year: "1958", name: "Perceptron", desc: "Frank Rosenblatt's perceptron — the first trainable machine learning model. Could classify simple patterns.", color: C.textS },
    { year: "1980", name: "Neocognitron", desc: "Kunihiko Fukushima designed the Neocognitron — a hierarchical neural network inspired by the visual cortex. The direct ancestor of CNNs.", color: C.amberD },
    { year: "1989", name: "LeNet — Yann LeCun", desc: "LeCun applied backpropagation to train convolutional networks for handwritten digit recognition (MNIST). First practical CNN! Used by banks to read cheques.", color: C.amber },
    { year: "1998", name: "LeNet-5", desc: "Improved LeNet-5 paper published. Established the now-classic CONV→POOL→CONV→POOL→FC architecture that forms the basis of modern CNNs.", color: C.amber },
    { year: "2012", name: "AlexNet — ImageNet Revolution", desc: "Alex Krizhevsky's AlexNet won ImageNet with 15.3% error vs 26.2% for previous best. Used GPUs, ReLU, and dropout. CNNs went mainstream overnight.", color: C.rustL },
    { year: "2014", name: "VGGNet & GoogLeNet", desc: "VGG (Oxford) showed depth matters — 16-19 layers. Google's Inception module ran multiple filter sizes in parallel. Error rate fell to 6.7%.", color: C.rustL },
    { year: "2015", name: "ResNet — 152 layers!", desc: "Microsoft's ResNet introduced skip connections to train extremely deep networks. Beat human-level performance on ImageNet at 3.57% error!", color: C.red },
    { year: "2020+", name: "Vision Transformers & CNNs", desc: "Transformers challenged CNN dominance. Today hybrid models combine both. CNNs remain the gold standard for real-time embedded vision tasks.", color: C.lavender },
  ];

  const whyCards = [
    { icon: "📷", title: "Images are HUGE", body: "A 224×224 RGB image has 150,528 pixels. A traditional network would need millions of connections just for one layer — impossibly slow. CNNs share weights across the image, needing far fewer parameters.", color: C.amber },
    { icon: "🔍", title: "Spatial patterns exist", body: "A cat's ear looks the same whether it's top-left or bottom-right of an image. CNNs exploit this with weight sharing — the same filter scans every location.", color: C.rust },
    { icon: "🏗️", title: "Hierarchy of features", body: "Edge detectors → shape detectors → part detectors → object detectors. CNNs naturally learn this hierarchy layer by layer, just like our visual cortex.", color: C.sage },
    { icon: "⚡", title: "Incredibly efficient", body: "Modern CNNs can classify a 1080p image in milliseconds on a phone chip. Real-time object detection, facial recognition, medical imaging — all possible.", color: C.sky },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: C.mono, fontSize: 9, color: C.amberD, letterSpacing: 4, marginBottom: 8 }}>MODULE 01 / OVERVIEW</div>
        <div style={{ fontFamily: C.serif, fontSize: 28, color: C.cream, lineHeight: 1.2, marginBottom: 10 }}>
          Convolutional Neural Networks
        </div>
        <div style={{ color: C.textS, fontSize: 13, lineHeight: 1.7, maxWidth: 680 }}>
          CNNs are the architecture that taught computers to truly <em>see</em>. They process images the way your visual cortex does — detecting edges first, then shapes, then objects.
        </div>
      </div>

      <InfoBox icon="🐕" title="OUR LEARNING EXAMPLE" color={C.amber}
        body={"We'll follow a DOG IMAGE through every stage of a CNN — from raw pixels to the final prediction 'This is a dog!' Every calculation will be shown with real numbers."} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        <div>
          <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 10, padding: 20, marginBottom: 16 }}>
            <Label color={C.amber}>🧠 WHAT IS A CNN?</Label>
            <div style={{ color: C.text, fontSize: 13, lineHeight: 1.75 }}>
              A <strong style={{ color: C.amberL }}>Convolutional Neural Network</strong> is a special type of neural network designed specifically for grid-like data — especially images.
              <br /><br />
              Instead of connecting every neuron to every pixel (which would be billions of connections!), CNNs use small <strong style={{ color: C.rust }}>filters</strong> (also called kernels) that slide across the image, detecting patterns like edges, textures, and shapes.
              <br /><br />
              This is similar to how your eye's retina processes visual information — local regions of cells respond to local regions of the visual field.
            </div>
          </div>
          <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 10, padding: 20 }}>
            <Label color={C.rust}>👁️ HUMAN VISION vs CNN</Label>
            {[
              ["Your retina", "Detects local patches of light/dark", C.textS],
              ["V1 cortex", "Detects edges at various orientations", C.amberD],
              ["V2 cortex", "Detects corners and curves", C.amber],
              ["Inferotemporal", "Recognizes complete objects", C.rustL],
            ].map(([stage, action, col]) => (
              <div key={stage} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: "1px solid " + C.border, alignItems: "flex-start" }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: col, marginTop: 5, flexShrink: 0 }} />
                <div><span style={{ color: col, fontFamily: C.mono, fontSize: 10 }}>{stage}: </span><span style={{ color: C.text, fontSize: 12 }}>{action}</span></div>
              </div>
            ))}
            <div style={{ marginTop: 10, fontFamily: C.mono, fontSize: 10, color: C.amberD, letterSpacing: 2 }}>↓ MAPS TO CNN LAYERS ↓</div>
            {[
              ["CONV Layer 1", "Detects edges and color gradients", C.amberD],
              ["CONV Layer 2", "Detects corners, textures, patterns", C.amber],
              ["CONV Layer 3+", "Detects object parts (ears, eyes, fur)", C.rustL],
              ["Fully Connected", "Classifies: 'This is a dog!'", C.sky],
            ].map(([stage, action, col]) => (
              <div key={stage} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: "1px solid " + C.border, alignItems: "flex-start" }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: col, marginTop: 5, flexShrink: 0 }} />
                <div><span style={{ color: col, fontFamily: C.mono, fontSize: 10 }}>{stage}: </span><span style={{ color: C.text, fontSize: 12 }}>{action}</span></div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 10, padding: 20, marginBottom: 16 }}>
            <Label color={C.sage}>✅ WHY CNNs WORK SO WELL</Label>
            {whyCards.map(w => (
              <div key={w.title} style={{ background: C.surface, border: "1px solid " + C.border, borderRadius: 7, padding: 12, marginBottom: 10 }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{w.icon}</div>
                <div style={{ fontFamily: C.mono, fontSize: 10, color: w.color, letterSpacing: 1, marginBottom: 4 }}>{w.title}</div>
                <div style={{ color: C.textS, fontSize: 12, lineHeight: 1.6 }}>{w.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* History timeline */}
      <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 10, padding: 20 }}>
        <Label color={C.amberL}>📅 HISTORY OF CNNs — CLICK ANY ERA</Label>
        <div style={{ display: "flex", gap: 0, overflowX: "auto", marginTop: 12, paddingBottom: 8 }}>
          {history.map((h, i) => (
            <div key={i} onClick={() => setActiveEra(activeEra === i ? null : i)}
              style={{ minWidth: 80, cursor: "pointer", textAlign: "center", flexShrink: 0 }}>
              <div style={{
                height: 4, background: activeEra === i ? C.amber : h.color, transition: "all 0.2s",
                marginBottom: 6, borderRadius: 2,
              }} />
              <div style={{ fontFamily: C.mono, fontSize: 9, color: activeEra === i ? C.amber : C.textD, letterSpacing: 1, marginBottom: 3 }}>{h.year}</div>
              <div style={{ fontFamily: C.mono, fontSize: 8, color: activeEra === i ? C.amberL : C.textS, lineHeight: 1.4 }}>{h.name.split("—")[0]}</div>
            </div>
          ))}
        </div>
        {activeEra !== null && (
          <div style={{ background: C.surface, border: "1px solid " + C.amber + "55", borderRadius: 8, padding: 14, marginTop: 12 }}>
            <div style={{ fontFamily: C.mono, fontSize: 10, color: C.amber, marginBottom: 6 }}>{history[activeEra].year} — {history[activeEra].name}</div>
            <div style={{ color: C.text, fontSize: 13, lineHeight: 1.7 }}>{history[activeEra].desc}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SECTION: THE DOG IMAGE ───────────────────────────────────────────────────
function SecDogImage() {
  const [showNums, setShowNums] = useState(false);
  const [hovCell, setHovCell] = useState(null);
  const cellSize = 44;

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: C.mono, fontSize: 9, color: C.amberD, letterSpacing: 4, marginBottom: 8 }}>MODULE 02 / THE IMAGE</div>
        <div style={{ fontFamily: C.serif, fontSize: 26, color: C.cream, marginBottom: 8 }}>How Computers See Images</div>
        <div style={{ color: C.textS, fontSize: 13, lineHeight: 1.7 }}>
          Computers don't see a dog — they see a grid of numbers. Understanding this is the foundation of everything in CNNs.
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 28, alignItems: "start" }}>
        {/* Interactive dog grid */}
        <div>
          <Label color={C.amber}>OUR DOG IMAGE (10×10 pixels, grayscale)</Label>
          <div style={{ position: "relative", marginBottom: 12 }}>
            <div style={{ display: "inline-block", border: "2px solid " + C.amber, borderRadius: 6, overflow: "hidden", lineHeight: 0 }}>
              {DOG.map((row, r) => (
                <div key={r} style={{ display: "flex" }}>
                  {row.map((val, c) => (
                    <div key={c}
                      onMouseEnter={() => setHovCell({ r, c, val })}
                      onMouseLeave={() => setHovCell(null)}
                      style={{
                        width: cellSize, height: cellSize,
                        background: grayToRgb(val),
                        border: hovCell && hovCell.r === r && hovCell.c === c ? "2px solid " + C.amber : "1px solid #ffffff10",
                        boxSizing: "border-box",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", transition: "border 0.1s",
                      }}>
                      {showNums && (
                        <span style={{ fontFamily: C.mono, fontSize: 8, color: val > 128 ? "#000" : "#fff", fontWeight: "bold" }}>
                          {val}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {hovCell && (
              <div style={{
                position: "absolute", top: -40, left: 0,
                background: C.card, border: "1px solid " + C.amber, borderRadius: 6,
                padding: "4px 10px", fontFamily: C.mono, fontSize: 10, color: C.amber,
                whiteSpace: "nowrap",
              }}>
                {"Pixel [" + hovCell.r + "," + hovCell.c + "] = " + hovCell.val + " — " + (hovCell.val < 80 ? "Very Dark (fur/outline)" : hovCell.val < 180 ? "Gray (fur/ears)" : "Bright (face)")}
              </div>
            )}
          </div>
          <button onClick={() => setShowNums(n => !n)} style={{
            padding: "7px 16px", fontFamily: C.mono, fontSize: 10, letterSpacing: 2,
            background: showNums ? C.amber + "22" : C.card,
            border: "1px solid " + (showNums ? C.amber : C.border),
            color: showNums ? C.amber : C.textS, borderRadius: 5, cursor: "pointer",
          }}>{showNums ? "HIDE" : "SHOW"} PIXEL VALUES</button>
        </div>

        {/* Explanations */}
        <div>
          <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 10, padding: 18, marginBottom: 14 }}>
            <Label color={C.amber}>🔢 IMAGES ARE JUST NUMBERS</Label>
            <div style={{ color: C.text, fontSize: 13, lineHeight: 1.75, marginBottom: 14 }}>
              Every pixel in a grayscale image is a single number from <strong style={{ color: C.amberL }}>0</strong> (pure black) to <strong style={{ color: C.amberL }}>255</strong> (pure white). Our 10×10 dog image is just a 10×10 grid of numbers!
            </div>
            <MathBox color={C.amber} title="PIXEL VALUE MEANINGS"
              lines={"  0   = ■ Pure black  (dog outline, pupils)\n128  = ▨ Mid gray    (dog ears, darker fur)\n200  = □ Light gray  (dog face)\n245  = □ Near white  (bright face areas)"} />
          </div>

          <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 10, padding: 18, marginBottom: 14 }}>
            <Label color={C.rust}>🎨 REAL IMAGES: RGB COLOR</Label>
            <div style={{ color: C.text, fontSize: 13, lineHeight: 1.75, marginBottom: 12 }}>
              Real color photos have <strong style={{ color: C.rustL }}>3 channels</strong> — Red, Green, Blue. Each pixel gets 3 numbers. A 224×224 color photo contains:
            </div>
            <MathBox color={C.rust} lines={"224 × 224 pixels × 3 channels = 150,528 numbers!\n\nEach channel: 0–255 (intensity of that color)\nRed=255, Green=0, Blue=0 → Pure Red\nRed=0, Green=0, Blue=255 → Pure Blue\nRed=255, Green=255, Blue=0 → Yellow"} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[
              { col: "#ff4444", lbl: "RED\nchannel", v: 200 },
              { col: "#44ff44", lbl: "GREEN\nchannel", v: 120 },
              { col: "#4444ff", lbl: "BLUE\nchannel", v: 50 },
            ].map(ch => (
              <div key={ch.lbl} style={{ background: C.surface, border: "1px solid " + C.border, borderRadius: 7, padding: 10, textAlign: "center" }}>
                <div style={{ width: 36, height: 36, borderRadius: 4, background: ch.col, margin: "0 auto 8px", opacity: ch.v / 255 }} />
                <div style={{ fontFamily: C.mono, fontSize: 8, color: C.textS, whiteSpace: "pre", marginBottom: 4 }}>{ch.lbl}</div>
                <div style={{ fontFamily: C.mono, fontSize: 14, color: C.cream }}>{ch.v}</div>
              </div>
            ))}
          </div>

          <div style={{ background: C.surface, border: "1px solid " + C.sage + "44", borderRadius: 8, padding: 14, marginTop: 14 }}>
            <Label color={C.sage}>💡 WHY GRAYSCALE FOR LEARNING?</Label>
            <div style={{ color: C.text, fontSize: 12, lineHeight: 1.6 }}>
              We use grayscale (1 channel) to keep the math simple and visual. CNN filters work identically on color images — just applied separately to each R, G, B channel.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SECTION: CONVOLUTION INTERACTIVE ─────────────────────────────────────────
function SecConvolution() {
  const [kernelKey, setKernelKey] = useState("edge");
  const [pos, setPos] = useState({ r: 0, c: 0 });
  const [auto, setAuto] = useState(false);
  const [showCalc, setShowCalc] = useState(true);
  const intervalRef = useRef(null);

  const kernel = KERNELS[kernelKey];
  const kr = kernel.vals;
  const maxR = DEMO_IMG.length - 3;
  const maxC = DEMO_IMG[0].length - 3;
  const featMap = applyConv(DEMO_IMG, kr);

  const advance = useCallback(() => {
    setPos(p => {
      let { r, c } = p;
      c++;
      if (c > maxC) { c = 0; r++; }
      if (r > maxR) { r = 0; c = 0; }
      return { r, c };
    });
  }, [maxR, maxC]);

  useEffect(() => {
    if (auto) {
      intervalRef.current = setInterval(advance, 500);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [auto, advance]);

  const patchVals = Array.from({ length: 3 }, (_, i) =>
    Array.from({ length: 3 }, (_, j) => DEMO_IMG[pos.r + i][pos.c + j])
  );
  const products = Array.from({ length: 3 }, (_, i) =>
    Array.from({ length: 3 }, (_, j) => patchVals[i][j] * kr[i][j])
  );
  const convResult = products.flat().reduce((s, v) => s + v, 0);
  const reluResult = relu(convResult);

  const normalize = (grid) => {
    const flat = grid.flat();
    const lo = Math.min(...flat), hi = Math.max(...flat);
    if (hi === lo) return grid.map(r => r.map(() => 128));
    return grid.map(r => r.map(v => Math.round(((v - lo) / (hi - lo)) * 255)));
  };
  const normFeat = normalize(featMap);

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: C.mono, fontSize: 9, color: C.amberD, letterSpacing: 4, marginBottom: 8 }}>MODULE 03 / CONVOLUTION</div>
        <div style={{ fontFamily: C.serif, fontSize: 26, color: C.cream, marginBottom: 8 }}>The Convolution Operation</div>
        <div style={{ color: C.textS, fontSize: 13, lineHeight: 1.7 }}>
          The heart of every CNN. A small filter slides across the entire image, performing the same multiplication-and-sum at every position.
        </div>
      </div>

      <InfoBox icon="📐" title="THE CORE IDEA" color={C.amber}
        body={"A filter (kernel) is a tiny grid of numbers — usually 3×3. We place it on part of the image, multiply each filter value by the corresponding pixel, add them all up. That sum becomes one pixel in the output (feature map). Then we slide the filter one step and repeat."} />

      {/* Kernel selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {Object.entries(KERNELS).map(([key, k]) => (
          <button key={key} onClick={() => { setKernelKey(key); setPos({ r: 0, c: 0 }); setAuto(false); }}
            style={{
              padding: "8px 14px", fontFamily: C.mono, fontSize: 10, letterSpacing: 1,
              background: kernelKey === key ? k.color + "22" : C.card,
              border: "1px solid " + (kernelKey === key ? k.color : C.border),
              color: kernelKey === key ? k.color : C.textS,
              borderRadius: 6, cursor: "pointer",
            }}>{k.name}</button>
        ))}
      </div>

      <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 10, padding: 18, marginBottom: 16 }}>
        <div style={{ color: C.text, fontSize: 13, lineHeight: 1.65, marginBottom: 10 }}>{kernel.desc}</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "auto auto auto auto", gap: 24, alignItems: "start", justifyContent: "start", marginBottom: 20 }}>
        {/* Input image */}
        <div>
          <Label color={C.sky}>INPUT IMAGE (6×6)</Label>
          <PixelGrid grid={DEMO_IMG} cellSize={38} highlight={{ r: pos.r, c: pos.c, size: 3 }} highlightColor={kernel.color} showVals />
          <div style={{ marginTop: 8, fontFamily: C.mono, fontSize: 9, color: C.textS }}>{"Position: row=" + pos.r + " col=" + pos.c}</div>
        </div>

        {/* Kernel */}
        <div>
          <Label color={kernel.color}>FILTER / KERNEL (3×3)</Label>
          <div style={{ display: "inline-block", border: "2px solid " + kernel.color, borderRadius: 6, overflow: "hidden", lineHeight: 0 }}>
            {kr.map((row, r) => (
              <div key={r} style={{ display: "flex" }}>
                {row.map((val, c) => (
                  <div key={c} style={{
                    width: 38, height: 38,
                    background: val > 0 ? "rgb(" + Math.round(val * 30 + 10) + "," + Math.round(val * 20) + ",0)" : val < 0 ? "rgb(" + Math.round(-val * 30) + ",0,0)" : C.surface,
                    border: "1px solid " + C.border,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxSizing: "border-box",
                  }}>
                    <span style={{ fontFamily: C.mono, fontSize: 10, color: C.cream, fontWeight: "bold" }}>
                      {val % 1 === 0 ? val : fmt(val, 2)}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8, fontFamily: C.mono, fontSize: 9, color: kernel.color }}>Learned parameters!</div>
        </div>

        {/* Arrow */}
        <div style={{ paddingTop: 60, fontSize: 28, color: C.amber }}>→</div>

        {/* Feature map */}
        <div>
          <Label color={C.sage}>FEATURE MAP (4×4 output)</Label>
          <div style={{ display: "inline-block", border: "2px solid " + C.sage, borderRadius: 6, overflow: "hidden", lineHeight: 0 }}>
            {normFeat.map((row, r) => (
              <div key={r} style={{ display: "flex" }}>
                {row.map((val, c) => (
                  <div key={c} style={{
                    width: 38, height: 38,
                    background: grayToRgb(val),
                    border: r === pos.r && c === pos.c ? "2px solid " + C.sage : "1px solid " + (val > 128 ? "#00000018" : "#ffffff18"),
                    boxSizing: "border-box",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {r === pos.r && c === pos.c && (
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.sage }} />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8, fontFamily: C.mono, fontSize: 9, color: C.sage }}>Bright = strong response</div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={() => { setPos({ r: 0, c: 0 }); setAuto(false); }} style={{ padding: "8px 16px", fontFamily: C.mono, fontSize: 10, background: C.surface, border: "1px solid " + C.border, color: C.textS, borderRadius: 5, cursor: "pointer", letterSpacing: 1 }}>↺ RESET</button>
        <button onClick={advance} style={{ padding: "8px 16px", fontFamily: C.mono, fontSize: 10, background: C.card, border: "1px solid " + C.amber, color: C.amber, borderRadius: 5, cursor: "pointer", letterSpacing: 1 }}>STEP →</button>
        <button onClick={() => setAuto(a => !a)} style={{ padding: "8px 16px", fontFamily: C.mono, fontSize: 10, background: auto ? C.amber + "22" : C.card, border: "1px solid " + (auto ? C.amber : C.border), color: auto ? C.amber : C.textS, borderRadius: 5, cursor: "pointer", letterSpacing: 1 }}>{auto ? "⏸ PAUSE" : "▶ AUTO"}</button>
        <button onClick={() => setShowCalc(s => !s)} style={{ padding: "8px 16px", fontFamily: C.mono, fontSize: 10, background: C.card, border: "1px solid " + C.border, color: C.textS, borderRadius: 5, cursor: "pointer", letterSpacing: 1 }}>{showCalc ? "HIDE" : "SHOW"} MATH</button>
      </div>

      {/* Live calculation */}
      {showCalc && (
        <div style={{ background: C.surface, border: "1px solid " + kernel.color + "55", borderRadius: 10, padding: 18, marginBottom: 20 }}>
          <Label color={kernel.color}>📊 LIVE CALCULATION AT POSITION [{pos.r},{pos.c}]</Label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            {/* Patch */}
            <div>
              <div style={{ fontFamily: C.mono, fontSize: 9, color: C.textS, letterSpacing: 2, marginBottom: 8 }}>IMAGE PATCH</div>
              <div style={{ fontFamily: C.mono, fontSize: 11, color: C.cream, lineHeight: 2.2 }}>
                {patchVals.map((row, r) => (
                  <div key={r}>{row.map((v, c) => (
                    <span key={c} style={{ display: "inline-block", width: 36, textAlign: "right", color: v < 80 ? C.rust : v < 180 ? C.amber : C.cream }}>{v}</span>
                  ))}</div>
                ))}
              </div>
            </div>
            {/* Kernel */}
            <div>
              <div style={{ fontFamily: C.mono, fontSize: 9, color: C.textS, letterSpacing: 2, marginBottom: 8 }}>KERNEL VALUES</div>
              <div style={{ fontFamily: C.mono, fontSize: 11, color: C.cream, lineHeight: 2.2 }}>
                {kr.map((row, r) => (
                  <div key={r}>{row.map((v, c) => (
                    <span key={c} style={{ display: "inline-block", width: 36, textAlign: "right", color: v > 0 ? C.sage : v < 0 ? C.red : C.textS }}>{v % 1 === 0 ? v : fmt(v, 2)}</span>
                  ))}</div>
                ))}
              </div>
            </div>
            {/* Products */}
            <div>
              <div style={{ fontFamily: C.mono, fontSize: 9, color: C.textS, letterSpacing: 2, marginBottom: 8 }}>PRODUCTS (×)</div>
              <div style={{ fontFamily: C.mono, fontSize: 11, color: C.cream, lineHeight: 2.2 }}>
                {products.map((row, r) => (
                  <div key={r}>{row.map((v, c) => (
                    <span key={c} style={{ display: "inline-block", width: 44, textAlign: "right", color: v > 0 ? C.sage : v < 0 ? C.red : C.textS }}>{fmt(v, 0)}</span>
                  ))}</div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid " + C.border, marginTop: 12, paddingTop: 12 }}>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontFamily: C.mono, fontSize: 9, color: C.textS, letterSpacing: 2, marginBottom: 4 }}>SUM OF PRODUCTS</div>
                <div style={{ fontFamily: C.mono, fontSize: 20, color: convResult >= 0 ? C.sage : C.red }}>{fmt(convResult, 1)}</div>
              </div>
              <div style={{ paddingTop: 8, color: C.textD, fontSize: 20 }}>→</div>
              <div>
                <div style={{ fontFamily: C.mono, fontSize: 9, color: C.textS, letterSpacing: 2, marginBottom: 4 }}>AFTER ReLU: max(0, {fmt(convResult, 1)})</div>
                <div style={{ fontFamily: C.mono, fontSize: 20, color: C.amber }}>{fmt(reluResult, 1)}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: C.mono, fontSize: 9, color: C.textS, letterSpacing: 2, marginBottom: 4 }}>FEATURE MAP PIXEL [{pos.r},{pos.c}]</div>
                <div style={{ height: 24, background: grayToRgb(clamp(Math.round((reluResult / 1000) * 255), 0, 255)), borderRadius: 4, border: "1px solid " + C.border }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Math explanation */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <MathBox color={C.amber} title="CONVOLUTION FORMULA"
          lines={"Feature[r,c] = Σᵢ Σⱼ Image[r+i, c+j] × Kernel[i,j]\n\n= I[r,c]×K[0,0] + I[r,c+1]×K[0,1] + ... + I[r+2,c+2]×K[2,2]\n\nFor our edge kernel at [0,0]:\n= 200×(-1) + 220×(-1) + 245×(-1)\n+ 220×(-1) + 245×( 8) + 245×(-1)\n+ 245×(-1) + 245×(-1) + 20×(-1)\n= " + fmt(convPixel(DEMO_IMG, kr, 0, 0), 1)}
          note="This sum is computed once per filter position. A 6x6 image with 3x3 filter, 4x4 feature map (4x4=16 positions)" />
        <div>
          <MathBox color={C.rust} title="OUTPUT SIZE FORMULA"
            lines={"Output size = (Input size − Kernel size) / Stride + 1\n\nWith 6×6 input, 3×3 kernel, stride=1:\n= (6 − 3) / 1 + 1 = 4\n\nWith 32×32 input, 5×5 kernel, stride=1:\n= (32 − 5) / 1 + 1 = 28\n\nWith padding='same':\n= Input size (padding preserves size!)"}
            note="Stride = how many pixels we shift the filter each step. Usually stride=1." />
          <InfoBox icon="📌" title="KEY INSIGHT: PARAMETER SHARING" color={C.sage}
            body={"One 3×3 filter has just 9 learnable values. Yet it scans the ENTIRE image! The SAME 9 weights detect edges at every location. A traditional dense network would need millions of separate weights. This is CNN's superpower."} />
        </div>
      </div>
    </div>
  );
}

// ─── SECTION: MULTIPLE FILTERS & FEATURE MAPS ─────────────────────────────────
function SecFilters() {
  const [activeFilter, setActiveFilter] = useState(0);
  const filters = [
    { name: "Filter 1: Edges", kr: KERNELS.edge.vals, col: C.amber, role: "Detects where pixel values change sharply — the outlines of the dog, ears, eyes" },
    { name: "Filter 2: Vertical", kr: KERNELS.vertical.vals, col: C.sky, role: "Detects vertical boundaries — left/right sides of the dog's face and body" },
    { name: "Filter 3: Sharpen", kr: KERNELS.sharpen.vals, col: C.rustL, role: "Amplifies fine detail — individual fur strands, texture patterns" },
    { name: "Filter 4: Blur", kr: KERNELS.blur.vals, col: C.sage, role: "Smooth, low-frequency content — broad shapes and overall lighting" },
  ];
  const fmaps = filters.map(f => applyConv(DEMO_IMG, f.kr));
  const af = filters[activeFilter];
  const afmap = fmaps[activeFilter];

  const normalize = (grid) => {
    const flat = grid.flat();
    const lo = Math.min(...flat), hi = Math.max(...flat);
    if (hi === lo) return grid.map(r => r.map(() => 128));
    return grid.map(r => r.map(v => Math.round(((v - lo) / (hi - lo)) * 255)));
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: C.mono, fontSize: 9, color: C.amberD, letterSpacing: 4, marginBottom: 8 }}>MODULE 04 / FILTERS & FEATURE MAPS</div>
        <div style={{ fontFamily: C.serif, fontSize: 26, color: C.cream, marginBottom: 8 }}>Multiple Filters — Multiple Feature Maps</div>
        <div style={{ color: C.textS, fontSize: 13, lineHeight: 1.7 }}>In real CNNs, we use dozens or hundreds of filters simultaneously. Each one learns to detect a different visual pattern.</div>
      </div>

      <InfoBox icon="🔭" title="ONE LAYER, MANY FILTERS" color={C.amber}
        body={"A single CONV layer might apply 32, 64, or 128 different filters. Each produces its own feature map. So a 224×224 image entering a layer with 64 filters produces a 222×222×64 output volume — like a stack of 64 maps, each highlighting different features."} />

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        {filters.map((f, i) => (
          <button key={i} onClick={() => setActiveFilter(i)} style={{
            flex: 1, minWidth: 120, padding: "10px 12px", fontFamily: C.mono, fontSize: 10, letterSpacing: 1,
            background: activeFilter === i ? f.col + "22" : C.card,
            border: "1px solid " + (activeFilter === i ? f.col : C.border),
            color: activeFilter === i ? f.col : C.textS,
            borderRadius: 7, cursor: "pointer",
          }}>{f.name}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Input */}
        <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 10, padding: 16, textAlign: "center" }}>
          <Label color={C.sky} style={{ textAlign: "center", display: "block" }}>INPUT IMAGE</Label>
          <PixelGrid grid={DEMO_IMG} cellSize={32} />
          <div style={{ fontFamily: C.mono, fontSize: 9, color: C.textS, marginTop: 8 }}>6×6 = 36 pixels</div>
        </div>
        {/* Filter */}
        <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 10, padding: 16, textAlign: "center" }}>
          <Label color={af.col} style={{ textAlign: "center", display: "block" }}>{af.name}</Label>
          <div style={{ display: "inline-block", border: "2px solid " + af.col, borderRadius: 6, overflow: "hidden", lineHeight: 0, marginBottom: 10 }}>
            {af.kr.map((row, r) => (
              <div key={r} style={{ display: "flex" }}>
                {row.map((val, c) => (
                  <div key={c} style={{
                    width: 48, height: 48,
                    background: val > 0 ? "rgba(240,165,0," + (val / 10) + ")" : val < 0 ? "rgba(224,92,42," + (-val / 10) + ")" : C.surface,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px solid " + C.border, boxSizing: "border-box",
                  }}>
                    <span style={{ fontFamily: C.mono, fontSize: 11, color: C.cream, fontWeight: "bold" }}>
                      {val % 1 === 0 ? val : fmt(val, 2)}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ color: C.text, fontSize: 12, lineHeight: 1.5 }}>{af.role}</div>
        </div>
        {/* Feature map */}
        <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 10, padding: 16, textAlign: "center" }}>
          <Label color={C.sage} style={{ textAlign: "center", display: "block" }}>FEATURE MAP OUTPUT</Label>
          <PixelGrid grid={normalize(afmap)} cellSize={32} normalize={false} />
          <div style={{ fontFamily: C.mono, fontSize: 9, color: C.textS, marginTop: 8 }}>4×4 output (size shrank by 2)</div>
          <div style={{ fontFamily: C.mono, fontSize: 9, color: af.col, marginTop: 4 }}>Bright = strong {af.name.split(":")[1]} response</div>
        </div>
      </div>

      {/* All 4 side by side */}
      <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 10, padding: 20 }}>
        <Label color={C.amberL}>ALL 4 FEATURE MAPS SIDE BY SIDE</Label>
        <div style={{ fontFamily: C.mono, fontSize: 11, color: C.textS, marginBottom: 16, lineHeight: 1.6 }}>
          Each filter "sees" the same dog image differently. Together they build a rich description.
        </div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {filters.map((f, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <PixelGrid grid={normalize(fmaps[i])} cellSize={22} normalize={false} />
              <div style={{ fontFamily: C.mono, fontSize: 8, color: f.col, marginTop: 6 }}>{f.name}</div>
            </div>
          ))}
        </div>

        <MathBox color={C.amber} title="TOTAL PARAMETERS IN ONE CONV LAYER" style={{ marginTop: 16 }}
          lines={"Parameters = (kernel_h × kernel_w × in_channels + 1) × num_filters\n\nExample: 3×3 kernel, 1 input channel, 4 filters:\n= (3 × 3 × 1 + 1) × 4 = 10 × 4 = 40 parameters\n\nWith 32 filters and 3 color channels:\n= (3 × 3 × 3 + 1) × 32 = 28 × 32 = 896 parameters\n(vs. millions for a dense layer!)"} />
      </div>
    </div>
  );
}

// ─── SECTION: RELU & POOLING ───────────────────────────────────────────────────
function SecReluPool() {
  const [activeDemo, setActiveDemo] = useState("relu");
  const rawFeat = applyConv(DEMO_IMG, KERNELS.edge.vals);
  const reluFeat = applyRelu(rawFeat);
  const poolFeat = maxPool(reluFeat);

  const normalize = (grid) => {
    const flat = grid.flat();
    const lo = Math.min(...flat), hi = Math.max(...flat);
    if (hi === lo) return grid.map(r => r.map(() => 128));
    return grid.map(r => r.map(v => Math.round(((v - lo) / (hi - lo)) * 255)));
  };

  const [hovPool, setHovPool] = useState(null);

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: C.mono, fontSize: 9, color: C.amberD, letterSpacing: 4, marginBottom: 8 }}>MODULE 05 / RELU & POOLING</div>
        <div style={{ fontFamily: C.serif, fontSize: 26, color: C.cream, marginBottom: 8 }}>Activation (ReLU) & Pooling</div>
        <div style={{ color: C.textS, fontSize: 13, lineHeight: 1.7 }}>Two essential operations that follow convolution — adding non-linearity and building robustness.</div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {["relu", "pool"].map(d => (
          <button key={d} onClick={() => setActiveDemo(d)} style={{
            flex: 1, padding: "10px", fontFamily: C.mono, fontSize: 11, letterSpacing: 2,
            background: activeDemo === d ? (d === "relu" ? C.rustL : C.sage) + "22" : C.card,
            border: "1px solid " + (activeDemo === d ? (d === "relu" ? C.rustL : C.sage) : C.border),
            color: activeDemo === d ? (d === "relu" ? C.rustL : C.sage) : C.textS,
            borderRadius: 7, cursor: "pointer",
          }}>{d === "relu" ? "⚡ ReLU ACTIVATION" : "🏊 MAX POOLING"}</button>
        ))}
      </div>

      {activeDemo === "relu" ? (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", gap: 28, alignItems: "start", justifyContent: "start", marginBottom: 20 }}>
            <div>
              <Label color={C.border}>CONV OUTPUT (raw)</Label>
              <PixelGrid grid={normalize(rawFeat)} cellSize={44} normalize={false} showVals />
              <div style={{ fontFamily: C.mono, fontSize: 9, color: C.textS, marginTop: 6 }}>Has negative values!</div>
            </div>
            <div style={{ paddingTop: 50, fontSize: 28, color: C.rustL }}>→ ReLU →</div>
            <div>
              <Label color={C.rustL}>AFTER ReLU</Label>
              <PixelGrid grid={normalize(reluFeat)} cellSize={44} normalize={false} showVals />
              <div style={{ fontFamily: C.mono, fontSize: 9, color: C.rustL, marginTop: 6 }}>Negatives → 0 (dark)</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <MathBox color={C.rustL} title="ReLU FORMULA"
                lines={"ReLU(x) = max(0, x)\n\nExamples from our feature map:\n  max(0,  450) =  450  ✓ (passes through)\n  max(0, -230) =    0  ✗ (blocked)\n  max(0,    0) =    0\n  max(0,  180) =  180  ✓"} />
            </div>
            <div>
              <InfoBox icon="🧠" title="WHY ReLU AFTER CONV?" color={C.rustL}
                body={"Convolution is just linear math (multiply + add). Without ReLU, stacking 100 conv layers is still equivalent to ONE linear operation. ReLU makes the network non-linear, letting it learn complex patterns. Simple formula, massive impact."} />
              <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 8, padding: 14 }}>
                <Label color={C.textS}>INTUITION</Label>
                <div style={{ color: C.text, fontSize: 12, lineHeight: 1.6 }}>
                  Negative values mean "no response" to that filter at that location. ReLU simply says: <em style={{ color: C.rustL }}>"if this filter didn't fire here, output zero."</em> Only strong positive responses pass through.
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <InfoBox icon="🏊" title="MAX POOLING" color={C.sage}
            body={"Max Pooling reduces the spatial size of feature maps by taking the maximum value from each small window (usually 2×2). This makes the network more robust to small translations — if the dog's eye shifts 1 pixel, the pooled response stays the same."} />

          <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", gap: 28, alignItems: "start", justifyContent: "start", marginBottom: 20 }}>
            <div>
              <Label color={C.rustL}>AFTER ReLU (4×4)</Label>
              <div style={{ display: "inline-block", border: "2px solid " + C.sage, borderRadius: 6, overflow: "hidden", lineHeight: 0, position: "relative" }}>
                {reluFeat.map((row, r) => (
                  <div key={r} style={{ display: "flex" }}>
                    {row.map((val, c) => {
                      const pr = Math.floor(r / 2), pc = Math.floor(c / 2);
                      const isHov = hovPool && hovPool.r === pr && hovPool.c === pc;
                      const normV = normalize(reluFeat)[r][c];
                      return (
                        <div key={c} onMouseEnter={() => setHovPool({ r: pr, c: pc })} onMouseLeave={() => setHovPool(null)}
                          style={{
                            width: 52, height: 52, background: grayToRgb(normV),
                            border: "2px solid " + (isHov ? C.sage : (r % 2 === 0 && c % 2 === 0) ? C.amberD : C.border),
                            boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                          <span style={{ fontFamily: C.mono, fontSize: 9, color: normV > 128 ? "#000" : "#fff" }}>{fmt(val, 0)}</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div style={{ fontFamily: C.mono, fontSize: 9, color: C.textS, marginTop: 6 }}>Hover to see pooling region</div>
            </div>

            <div style={{ paddingTop: 50, textAlign: "center" }}>
              <div style={{ fontSize: 28, color: C.sage }}>→</div>
              <div style={{ fontFamily: C.mono, fontSize: 9, color: C.sage, marginTop: 4 }}>MAX POOL<br/>2×2, stride 2</div>
            </div>

            <div>
              <Label color={C.sage}>POOLED OUTPUT (2×2)</Label>
              <div style={{ display: "inline-block", border: "2px solid " + C.sage, borderRadius: 6, overflow: "hidden", lineHeight: 0 }}>
                {poolFeat.map((row, r) => (
                  <div key={r} style={{ display: "flex" }}>
                    {row.map((val, c) => {
                      const isHov = hovPool && hovPool.r === r && hovPool.c === c;
                      const normV = normalize(poolFeat)[r][c];
                      return (
                        <div key={c} onMouseEnter={() => setHovPool({ r, c })} onMouseLeave={() => setHovPool(null)}
                          style={{
                            width: 80, height: 80, background: grayToRgb(normV),
                            border: "2px solid " + (isHov ? C.sage : C.border),
                            boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                          <span style={{ fontFamily: C.mono, fontSize: 11, color: normV > 128 ? "#000" : "#fff", fontWeight: "bold" }}>{fmt(val, 0)}</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div style={{ fontFamily: C.mono, fontSize: 9, color: C.sage, marginTop: 6 }}>4×4 → 2×2 (50% smaller!)</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <MathBox color={C.sage} title="MAX POOLING EXAMPLE (top-left 2×2 region)"
              lines={"Input region:\n  [ 450  180 ]\n  [ 320  90  ]\n\nmax(450, 180, 320, 90) = 450\n\nPooled output = 450 (just the max!)\n\nResult: 4×4 → 2×2 (size halved)\nParameters reduced by 75%!"}
              note="Max Pool has NO learnable parameters — it's a fixed operation" />
            <div>
              <InfoBox icon="📏" title="WHY MAX POOLING?" color={C.sage}
                body={"1. REDUCES SIZE: Shrinks feature maps so the network can process them faster. 2. TRANSLATION INVARIANCE: If a feature (like an eye) shifts 1 pixel, the max in that region stays the same. 3. PREVENTS OVERFITTING: Fewer values = less to memorize."} />
              <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 8, padding: 14 }}>
                <Label color={C.textS}>OTHER TYPES</Label>
                <div style={{ color: C.textS, fontSize: 12, lineHeight: 1.8 }}>
                  <strong style={{ color: C.amber }}>Average Pooling:</strong> takes the mean instead of max<br />
                  <strong style={{ color: C.amber }}>Global Avg Pool:</strong> collapses entire map to one number<br />
                  <strong style={{ color: C.amber }}>Strided Conv:</strong> modern alternative, learnable pooling
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SECTION: FULL CNN ARCHITECTURE ───────────────────────────────────────────
function SecArchitecture() {
  const [activeLayer, setActiveLayer] = useState(null);

  const layers = [
    {
      id: "input", name: "Input Image", icon: "📷", shape: "224×224×3",
      color: C.sky, type: "INPUT",
      desc: "Raw pixel values of the dog photo. Three channels: Red, Green, Blue. 224×224×3 = 150,528 numbers. No computation happens here.",
      params: 0,
      formula: "Input tensor: H × W × C\n= 224 × 224 × 3",
    },
    {
      id: "conv1", name: "CONV + ReLU", icon: "🔲", shape: "222×222×32",
      color: C.conv, type: "CONV",
      desc: "32 different 3×3 filters each detect different low-level patterns: vertical edges, horizontal edges, color gradients. ReLU removes negative values. Output: 32 feature maps.",
      params: 896,
      formula: "(3×3×3+1)×32 = 896 params\nOutput: (224-3)/1+1 = 222\n→ 222×222×32 feature volume",
    },
    {
      id: "pool1", name: "Max Pool", icon: "⬇️", shape: "111×111×32",
      color: C.pool, type: "POOL",
      desc: "2×2 max pooling with stride 2. Each feature map shrinks by half in both dimensions. Preserves the strongest responses. No learnable parameters.",
      params: 0,
      formula: "2×2 max pool, stride=2\n222/2 = 111\n→ 111×111×32",
    },
    {
      id: "conv2", name: "CONV + ReLU", icon: "🔲", shape: "109×109×64",
      color: C.conv, type: "CONV",
      desc: "64 filters of size 3×3 applied to 32-channel input. Now detects mid-level features: eyes, ears, nose shapes, fur texture patterns. Each filter 'sees' all 32 previous maps.",
      params: 18496,
      formula: "(3×3×32+1)×64 = 18,496 params\nOutput: (111-3)/1+1 = 109\n→ 109×109×64",
    },
    {
      id: "pool2", name: "Max Pool", icon: "⬇️", shape: "54×54×64",
      color: C.pool, type: "POOL",
      desc: "Another 2×2 max pool with stride 2. Features are now compact. The network has built a rich spatial hierarchy from pixels to shapes.",
      params: 0,
      formula: "2×2 max pool, stride=2\n109/2 ≈ 54\n→ 54×54×64",
    },
    {
      id: "conv3", name: "CONV + ReLU", icon: "🔲", shape: "52×52×128",
      color: C.conv, type: "CONV",
      desc: "128 filters detect high-level features: complete dog ears, eyes with surrounding fur, paw shapes. The network is building toward recognizing 'dog' as a whole.",
      params: 73856,
      formula: "(3×3×64+1)×128 = 73,856 params\n→ 52×52×128",
    },
    {
      id: "gap", name: "Global Avg Pool", icon: "🌐", shape: "1×1×128",
      color: C.amberL, type: "POOL",
      desc: "Collapses each of the 128 feature maps to a single number (their average). Produces a 128-dimensional vector. Eliminates spatial information — only 'what features exist' matters now.",
      params: 0,
      formula: "avg of entire 52×52 → single value\nOne per channel: → vector of 128",
    },
    {
      id: "fc1", name: "Dense Layer", icon: "🔗", shape: "128→256",
      color: C.fc, type: "FC",
      desc: "A traditional dense (fully connected) layer. Every one of the 128 inputs connects to all 256 outputs. This integrates all the spatial features into abstract class-relevant representations.",
      params: 33024,
      formula: "128×256 + 256 = 33,024 params\n+ ReLU activation",
    },
    {
      id: "out", name: "Output (Softmax)", icon: "🏆", shape: "1000 classes",
      color: C.out, type: "OUTPUT",
      desc: "Final dense layer maps to 1000 ImageNet classes (cat, dog, car, airplane...). Softmax converts raw scores to probabilities that sum to 100%. The highest probability wins!",
      params: 257000,
      formula: "256×1000 + 1000 = 257,000 params\nSoftmax: eᶻⁱ / Σeᶻʲ\n→ [0.001, ..., 0.94(dog), ...]",
    },
  ];

  const totalParams = layers.reduce((s, l) => s + l.params, 0);
  const al = layers.find(l => l.id === activeLayer);

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: C.mono, fontSize: 9, color: C.amberD, letterSpacing: 4, marginBottom: 8 }}>MODULE 06 / ARCHITECTURE</div>
        <div style={{ fontFamily: C.serif, fontSize: 26, color: C.cream, marginBottom: 8 }}>Complete CNN Architecture</div>
        <div style={{ color: C.textS, fontSize: 13 }}>From raw dog photo to "94% probability this is a dog." Click any layer to see details.</div>
      </div>

      {/* Architecture flow */}
      <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 0, overflowX: "auto", paddingBottom: 8 }}>
          {layers.map((layer, i) => (
            <div key={layer.id} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <div onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                style={{
                  cursor: "pointer", textAlign: "center",
                  background: activeLayer === layer.id ? layer.color + "22" : C.surface,
                  border: "1px solid " + (activeLayer === layer.id ? layer.color : C.border),
                  borderRadius: 8, padding: "12px 10px", minWidth: 80,
                  transition: "all 0.2s",
                }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{layer.icon}</div>
                <div style={{ fontFamily: C.mono, fontSize: 8, color: layer.color, letterSpacing: 1, marginBottom: 3 }}>{layer.type}</div>
                <div style={{ fontFamily: C.mono, fontSize: 8, color: C.textS }}>{layer.shape}</div>
              </div>
              {i < layers.length - 1 && (
                <div style={{ color: C.textD, fontSize: 14, padding: "0 4px" }}>→</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      {al && (
        <div style={{ background: C.surface, border: "1px solid " + al.color + "55", borderRadius: 10, padding: 18, marginBottom: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
            <div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 28 }}>{al.icon}</span>
                <div>
                  <div style={{ fontFamily: C.mono, fontSize: 9, color: al.color, letterSpacing: 3 }}>{al.type}</div>
                  <div style={{ fontFamily: C.serif, fontSize: 18, color: C.cream }}>{al.name}</div>
                </div>
              </div>
              <div style={{ color: C.text, fontSize: 13, lineHeight: 1.75, marginBottom: 12 }}>{al.desc}</div>
            </div>
            <div>
              <MathBox color={al.color} title="MATH" lines={al.formula} />
              <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 6, padding: 12, textAlign: "center" }}>
                <div style={{ fontFamily: C.mono, fontSize: 9, color: C.textS, marginBottom: 4 }}>LEARNABLE PARAMETERS</div>
                <div style={{ fontFamily: C.mono, fontSize: 22, color: al.color }}>{al.params.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visual size reduction */}
      <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 10, padding: 20, marginBottom: 20 }}>
        <Label color={C.amberL}>📉 SPATIAL SIZE REDUCTION THROUGH THE NETWORK</Label>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          {[
            { s: 224, lbl: "Input", col: C.sky },
            { s: 111, lbl: "After Pool1", col: C.conv },
            { s: 54, lbl: "After Pool2", col: C.pool },
            { s: 26, lbl: "After Pool3", col: C.conv },
            { s: 4, lbl: "Global\nPool", col: C.amberL },
          ].map(item => (
            <div key={item.lbl} style={{ textAlign: "center" }}>
              <div style={{
                width: Math.max(8, item.s / 8), height: Math.max(8, item.s / 8),
                background: item.col + "44", border: "1px solid " + item.col,
                borderRadius: 4, margin: "0 auto 6px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: C.mono, fontSize: 8, color: item.col }}>{item.s}×{item.s}</span>
              </div>
              <div style={{ fontFamily: C.mono, fontSize: 8, color: C.textS, whiteSpace: "pre" }}>{item.lbl}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: C.mono, fontSize: 11, color: C.textS, marginTop: 12 }}>
          Spatial size shrinks but depth (# feature maps) grows: 3 → 32 → 64 → 128 channels
        </div>
      </div>

      {/* Total params */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        {[
          { l: "Conv Layers", v: "3", icon: "🔲", c: C.conv },
          { l: "Pool Layers", v: "3", icon: "⬇️", c: C.pool },
          { l: "FC Layers", v: "2", icon: "🔗", c: C.fc },
          { l: "Total Params", v: totalParams.toLocaleString(), icon: "⚙️", c: C.amber },
        ].map(item => (
          <div key={item.l} style={{ background: C.card, border: "1px solid " + item.c + "44", borderRadius: 8, padding: 14, textAlign: "center" }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{item.icon}</div>
            <div style={{ fontFamily: C.mono, fontSize: 9, color: item.c, letterSpacing: 1, marginBottom: 4 }}>{item.l}</div>
            <div style={{ fontFamily: C.mono, fontSize: 16, color: C.cream }}>{item.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SECTION: DOG PIPELINE (step by step) ─────────────────────────────────────
function SecPipeline() {
  const [step, setStep] = useState(0);

  // compute pipeline stages
  const rawFeat = applyConv(DEMO_IMG, KERNELS.edge.vals);
  const reluFeat = applyRelu(rawFeat);
  const poolFeat = maxPool(reluFeat);

  const normalize = (grid) => {
    const flat = grid.flat();
    const lo = Math.min(...flat), hi = Math.max(...flat);
    if (hi === lo) return grid.map(r => r.map(() => 128));
    return grid.map(r => r.map(v => Math.round(((v - lo) / (hi - lo)) * 255)));
  };

  const softmaxProbs = [
    { cls: "🐕 Dog",      p: 0.924 },
    { cls: "🦊 Fox",      p: 0.043 },
    { cls: "🐺 Wolf",     p: 0.019 },
    { cls: "🐈 Cat",      p: 0.008 },
    { cls: "🐻 Bear",     p: 0.006 },
  ];

  const steps = [
    {
      title: "Stage 1 — Input: Raw Dog Image",
      color: C.sky, icon: "📷",
      explain: "Our dog photo enters the network as a 10×10 grid of pixel values (0–255). In reality, photos like 224×224 pixels are used. The computer sees nothing but numbers at this point — no 'dog' yet, just intensity values.",
      viz: <div style={{ textAlign: "center" }}><PixelGrid grid={DOG} cellSize={34} /><div style={{ fontFamily: C.mono, fontSize: 10, color: C.textS, marginTop: 8 }}>10×10 = 100 pixels, grayscale</div></div>,
      math: "Input tensor shape: 10 × 10 × 1\n(rows × cols × channels)\n\nMin value: 20 (dark fur/outline)\nMax value: 245 (bright face area)\nAverage: ~185 (mostly light gray)",
    },
    {
      title: "Stage 2 — CONV Layer: Edge Detection Filter",
      color: C.conv, icon: "🔲",
      explain: "An edge-detecting filter slides across the dog image. Wherever adjacent pixels have very different values (like where the dark ear meets the bright face), the convolution produces a large response. This is finding the outline of the dog!",
      viz: (
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ textAlign: "center" }}><PixelGrid grid={DEMO_IMG} cellSize={34} /><div style={{ fontFamily: C.mono, fontSize: 9, color: C.textS, marginTop: 4 }}>Input (6×6 region)</div></div>
          <div style={{ paddingTop: 50, color: C.conv, fontSize: 22 }}>*</div>
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "inline-block", border: "2px solid " + C.conv, borderRadius: 4, overflow: "hidden" }}>
              {KERNELS.edge.vals.map((row, r) => (
                <div key={r} style={{ display: "flex" }}>
                  {row.map((v, c) => (
                    <div key={c} style={{ width: 34, height: 34, background: C.surface, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid " + C.border }}>
                      <span style={{ fontFamily: C.mono, fontSize: 11, color: v > 0 ? C.sage : v < 0 ? C.red : C.textS }}>{v}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ fontFamily: C.mono, fontSize: 9, color: C.textS, marginTop: 4 }}>Edge filter (3×3)</div>
          </div>
          <div style={{ paddingTop: 50, color: C.conv, fontSize: 22 }}>=</div>
          <div style={{ textAlign: "center" }}><PixelGrid grid={normalize(rawFeat)} cellSize={34} normalize={false} /><div style={{ fontFamily: C.mono, fontSize: 9, color: C.conv, marginTop: 4 }}>Feature map (4×4)</div></div>
        </div>
      ),
      math: "For each 3×3 patch of the image:\nConv[r,c] = Σᵢ Σⱼ Image[r+i,c+j] × Filter[i,j]\n\nSample calculation at [0,0]:\n= 200(-1)+220(-1)+245(-1)\n+ 220(-1)+245(8)+245(-1)\n+ 245(-1)+245(-1)+20(-1)\n= " + fmt(convPixel(DEMO_IMG, KERNELS.edge.vals, 0, 0), 1),
    },
    {
      title: "Stage 3 — ReLU: Remove Negatives",
      color: C.relu, icon: "⚡",
      explain: "The convolution produces both positive and negative values. Negative values mean 'this edge detector found NO edge here.' ReLU simply zeroes these out, keeping only the meaningful positive responses where edges were actually found.",
      viz: (
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          <div style={{ textAlign: "center" }}><PixelGrid grid={normalize(rawFeat)} cellSize={44} normalize={false} /><div style={{ fontFamily: C.mono, fontSize: 9, color: C.textS, marginTop: 4 }}>Before ReLU</div></div>
          <div style={{ paddingTop: 60, color: C.relu, fontSize: 14, textAlign: "center" }}><div style={{ fontFamily: C.mono, marginBottom: 4 }}>ReLU</div><div>→</div></div>
          <div style={{ textAlign: "center" }}><PixelGrid grid={normalize(reluFeat)} cellSize={44} normalize={false} /><div style={{ fontFamily: C.mono, fontSize: 9, color: C.relu, marginTop: 4 }}>After ReLU</div></div>
        </div>
      ),
      math: "ReLU(x) = max(0, x)\n\nFrom our feature map:\n  +450 → 450  (strong edge found)\n  -180 → 0    (no edge here)\n  +280 → 280  (moderate edge)\n  -60  → 0    (no edge)\n\nNegative values become 0 (black pixels)",
    },
    {
      title: "Stage 4 — Max Pooling: Downsample",
      color: C.pool, icon: "⬇️",
      explain: "Max pooling slides a 2×2 window and keeps only the maximum value. Our 4×4 feature map shrinks to 2×2. This makes the network tolerant to small shifts — if the dog's ear moves 1 pixel, the max response in that region stays the same.",
      viz: (
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          <div style={{ textAlign: "center" }}><PixelGrid grid={normalize(reluFeat)} cellSize={52} normalize={false} showVals /><div style={{ fontFamily: C.mono, fontSize: 9, color: C.textS, marginTop: 4 }}>After ReLU (4×4)</div></div>
          <div style={{ paddingTop: 80, color: C.pool, fontSize: 14, textAlign: "center" }}><div style={{ fontFamily: C.mono, marginBottom: 4 }}>MaxPool</div><div>2×2</div><div>→</div></div>
          <div style={{ textAlign: "center" }}><PixelGrid grid={normalize(poolFeat)} cellSize={80} normalize={false} showVals /><div style={{ fontFamily: C.mono, fontSize: 9, color: C.pool, marginTop: 4 }}>Pooled (2×2)</div></div>
        </div>
      ),
      math: "2×2 Max Pool, stride=2:\n\nTop-left region [values at 4 positions]:\n→ takes maximum of those 4 values\n\nResult: 4×4 → 2×2\n(spatial size halved, 75% data reduced)\n\nEach surviving value = strongest\ndetected feature in that region",
    },
    {
      title: "Stage 5 — Deeper Layers: Building Up Features",
      color: C.amberL, icon: "🏗️",
      explain: "In a real CNN, many more CONV→ReLU→POOL stages follow. Each layer detects increasingly complex features. Layer 1 sees edges. Layer 2 sees corners and curves. Layer 3 sees shapes like 'pointed ear.' Layer 4 sees complete 'dog face' patterns.",
      viz: (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { lbl: "Layer 1 detects:", items: ["Horizontal edges", "Vertical edges", "Color transitions", "Brightness changes"], col: C.conv },
            { lbl: "Layer 2 detects:", items: ["Corners & curves", "Simple textures", "Gradient patterns", "Blob shapes"], col: C.amberD },
            { lbl: "Layer 3 detects:", items: ["Dog ear shapes", "Eye-like circles", "Fur texture", "Snout curves"], col: C.amber },
            { lbl: "Layer 4+ detects:", items: ["Complete eyes", "Full ear structure", "Face composition", "Body parts"], col: C.rustL },
          ].map(layer => (
            <div key={layer.lbl} style={{ background: C.surface, border: "1px solid " + layer.col + "44", borderRadius: 7, padding: 12 }}>
              <div style={{ fontFamily: C.mono, fontSize: 9, color: layer.col, marginBottom: 8 }}>{layer.lbl}</div>
              {layer.items.map(it => (
                <div key={it} style={{ display: "flex", gap: 6, marginBottom: 5 }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: layer.col, marginTop: 4, flexShrink: 0 }} />
                  <div style={{ color: C.textS, fontSize: 11 }}>{it}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ),
      math: "Feature hierarchy:\n  Layer 1: 32 feature maps  (simple)\n  Layer 2: 64 feature maps  (medium)\n  Layer 3: 128 feature maps (complex)\n  Layer 4: 256 feature maps (very complex)\n\nThe same backpropagation algorithm\nautomatically learns what each filter detects!",
    },
    {
      title: "Stage 6 — Fully Connected + Softmax: The Decision",
      color: C.out, icon: "🏆",
      explain: "After all the spatial processing, the feature maps are flattened into a 1D vector and fed into a dense layer. Finally, Softmax converts raw scores into probabilities. The class with the highest probability is the network's prediction.",
      viz: (
        <div>
          <div style={{ fontFamily: C.mono, fontSize: 9, color: C.textS, marginBottom: 12, letterSpacing: 2 }}>SOFTMAX OUTPUT (Top 5 classes):</div>
          {softmaxProbs.map((item) => (
            <div key={item.cls} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontFamily: C.mono, fontSize: 12, color: item.p > 0.9 ? C.sage : C.textS }}>{item.cls}</span>
                <span style={{ fontFamily: C.mono, fontSize: 12, color: item.p > 0.9 ? C.sage : C.textD }}>{(item.p * 100).toFixed(1)}%</span>
              </div>
              <div style={{ background: C.surface, borderRadius: 4, height: 8 }}>
                <div style={{ width: (item.p * 100) + "%", height: "100%", background: item.p > 0.9 ? C.sage : C.amberD, borderRadius: 4, transition: "width 0.8s" }} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: 16, background: C.sage + "18", border: "1px solid " + C.sage + "44", borderRadius: 6, padding: 10, textAlign: "center" }}>
            <div style={{ fontFamily: C.mono, fontSize: 10, color: C.sage, letterSpacing: 2 }}>PREDICTION</div>
            <div style={{ fontFamily: C.serif, fontSize: 22, color: C.cream, marginTop: 4 }}>🐕 DOG  — 92.4% confidence</div>
          </div>
        </div>
      ),
      math: "Flatten: feature maps → 1D vector\n\nFully Connected: multiply by weight matrix\nz = W × features + b\n\nSoftmax: P(class k) = e^zₖ / Σⱼ e^zⱼ\n\ne^z_dog / (e^z_dog + e^z_fox + ...) = 0.924\n\nAll probabilities sum to exactly 1.0!",
    },
  ];

  const s = steps[step];

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: C.mono, fontSize: 9, color: C.amberD, letterSpacing: 4, marginBottom: 8 }}>MODULE 07 / FULL PIPELINE</div>
        <div style={{ fontFamily: C.serif, fontSize: 26, color: C.cream, marginBottom: 8 }}>Dog Image — Complete CNN Journey</div>
        <div style={{ color: C.textS, fontSize: 13 }}>Follow our dog photo step by step through every stage of the CNN.</div>
      </div>

      {/* Step selector */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {steps.map((st, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            padding: "8px 12px", fontFamily: C.mono, fontSize: 9, letterSpacing: 1,
            background: step === i ? st.color + "22" : C.card,
            border: "1px solid " + (step === i ? st.color : C.border),
            color: step === i ? st.color : C.textS,
            borderRadius: 6, cursor: "pointer",
          }}>STAGE {i + 1}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Left */}
        <div>
          <div style={{ background: C.card, border: "1px solid " + s.color + "55", borderRadius: 10, padding: 18, marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 28 }}>{s.icon}</span>
              <div>
                <div style={{ fontFamily: C.mono, fontSize: 9, color: s.color, letterSpacing: 3 }}>STAGE {step + 1} / {steps.length}</div>
                <div style={{ fontFamily: C.serif, fontSize: 18, color: C.cream }}>{s.title}</div>
              </div>
            </div>
            <div style={{ color: C.text, fontSize: 13, lineHeight: 1.75 }}>{s.explain}</div>
          </div>
          <MathBox color={s.color} title="MATH" lines={s.math} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
              style={{ padding: "8px 20px", fontFamily: C.mono, fontSize: 11, background: step === 0 ? "transparent" : C.card, border: "1px solid " + (step === 0 ? "transparent" : C.border), color: step === 0 ? "transparent" : C.text, borderRadius: 6, cursor: step === 0 ? "default" : "pointer" }}>
              ← PREV
            </button>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {steps.map((st, i) => (
                <div key={i} style={{ width: i === step ? 20 : 6, height: 6, borderRadius: 3, background: i <= step ? st.color : C.border, transition: "all 0.3s" }} />
              ))}
            </div>
            <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} disabled={step === steps.length - 1}
              style={{ padding: "8px 20px", fontFamily: C.mono, fontSize: 11, background: step === steps.length - 1 ? "transparent" : s.color + "22", border: "1px solid " + (step === steps.length - 1 ? "transparent" : s.color), color: step === steps.length - 1 ? "transparent" : s.color, borderRadius: 6, cursor: step === steps.length - 1 ? "default" : "pointer" }}>
              NEXT →
            </button>
          </div>
        </div>

        {/* Right: visualization */}
        <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 10, padding: 18, display: "flex", alignItems: "flex-start", justifyContent: "center", minHeight: 220 }}>
          {s.viz}
        </div>
      </div>
    </div>
  );
}

// ─── SECTION: CNN MATH DEEP DIVE ───────────────────────────────────────────────
function SecMath() {
  const [activeSection, setActiveSection] = useState("conv");

  const sections = {
    conv: {
      title: "Convolution Math",
      color: C.conv,
      content: (
        <div>
          <MathBox color={C.conv} title="FORMAL DEFINITION"
            lines={"(I ★ K)[r, c] = Σᵢ₌₀² Σⱼ₌₀² I[r+i, c+j] · K[i, j]\n\nWhere:\n  I  = input image (or feature map)\n  K  = kernel / filter weights\n  ★  = convolution operator\n  r,c = output row, column\n  i,j = kernel row, column\n\nThis is technically cross-correlation\n(not flipped), standard in deep learning"}
            note="The kernel slides over every valid position" />
          <MathBox color={C.amberL} title="WORKED EXAMPLE (3×3 edge filter on our dog)"
            lines={"Input patch [0:3, 0:3]:          Kernel:\n  200  220  245             -1  -1  -1\n  220  245   20       ★     -1   8  -1\n  245  245  245             -1  -1  -1\n\nElement-wise multiply then sum:\n200(-1)+220(-1)+245(-1) = -665\n220(-1)+245( 8)+ 20(-1) = +1736\n245(-1)+245(-1)+245(-1) = -735\n\nTotal = -665 + 1736 + (-735) = +336\nResult: Feature[0,0] = 336"}
            note="Large positive value = strong edge detected at this location" />
          <MathBox color={C.rust} title="OUTPUT SIZE FORMULAS"
            lines={"Without padding:\n  out = floor((in - k) / stride) + 1\n\nWith 'same' padding:\n  padding = floor(k / 2)\n  out = ceil(in / stride)\n\nCommon cases (stride=1, no padding):\n  Input 224, kernel 3: out = 222\n  Input 224, kernel 5: out = 220\n  Input 224, kernel 7: out = 218"} />
        </div>
      ),
    },
    relu: {
      title: "ReLU & Activations",
      color: C.relu,
      content: (
        <div>
          <MathBox color={C.relu} title="ReLU FUNCTION"
            lines={"ReLU(x) = max(0, x)\n\nDerivative:\n  ReLU'(x) = 1  if x > 0\n  ReLU'(x) = 0  if x ≤ 0\n\nLeaky ReLU (variant):\n  f(x) = x      if x > 0\n  f(x) = 0.01x  if x ≤ 0\n  (avoids 'dying ReLU' problem)"}
            note="ReLU is fast, simple, and works remarkably well in practice" />
          <MathBox color={C.amberL} title="WHY NOT SIGMOID/TANH IN HIDDEN LAYERS?"
            lines={"Sigmoid: σ(x) = 1/(1+e^-x)\n  σ'(x) = σ(x)(1-σ(x)) ≤ 0.25\n\nFor deep networks (50+ layers):\n  Gradient × 0.25 × 0.25 × ... × 0.25 → 0\n  This is the VANISHING GRADIENT problem!\n\nReLU derivative = 1 for x>0:\n  Gradient × 1 × 1 × ... × 1 = gradient\n  Preserved! Deep networks can train."}
            note="Vanishing gradients stopped deep CNNs from training until ReLU fixed this" />
        </div>
      ),
    },
    pool: {
      title: "Pooling Math",
      color: C.pool,
      content: (
        <div>
          <MathBox color={C.pool} title="MAX POOLING"
            lines={"MaxPool(X, r, c) = max_{i∈[0,p), j∈[0,p)} X[r·s+i, c·s+j]\n\nWhere:\n  p = pool size (typically 2)\n  s = stride (typically 2)\n\n2×2 patch → single maximum value\nOut size: floor((in - p) / s) + 1\n\nExample:\n  Input 4×4, pool=2, stride=2:\n  Out = floor((4-2)/2)+1 = 2\n  → 4×4 becomes 2×2"}
            note="Max pooling has zero learnable parameters" />
          <MathBox color={C.sky} title="AVERAGE POOLING (alternative)"
            lines={"AvgPool(X, r, c) = (1/p²) Σᵢ Σⱼ X[r·s+i, c·s+j]\n\nComputes average instead of maximum.\nRetains all information (nothing discarded).\nUsed in Global Average Pooling at end of networks.\n\nGlobal Avg Pool:\n  Single average over entire W×H feature map\n  → reduces W×H×C to 1×1×C\n  → C-dimensional vector for classification"} />
        </div>
      ),
    },
    softmax: {
      title: "Softmax & Loss",
      color: C.out,
      content: (
        <div>
          <MathBox color={C.out} title="SOFTMAX FUNCTION"
            lines={"P(class k) = e^zₖ / Σⱼ₌₁ᴷ e^zⱼ\n\nExample with 5 classes:\n  Raw scores z: [2.1, 0.5, 0.3, -0.4, -1.0]\n  \n  e^z values:  [8.17, 1.65, 1.35, 0.67, 0.37]\n  Sum = 12.21\n  \n  Probabilities: [0.67, 0.14, 0.11, 0.05, 0.03]\n  Sum = 1.00 ✓ (always!)\n  \n  Dog is class 1: 67% confident"}
            note="Softmax guarantees outputs are valid probabilities summing to 1.0" />
          <MathBox color={C.rust} title="CROSS-ENTROPY LOSS"
            lines={"L = -Σₖ yₖ · log(P(k))\n\nWhere:\n  yₖ = 1 if k is correct class, else 0\n  P(k) = softmax probability for class k\n\nExample (correct class = dog = class 1):\n  y = [0, 1, 0, 0, 0]\n  P = [0.03, 0.67, 0.14, 0.11, 0.05]\n  \n  L = -log(0.67) = 0.40\n\nPerfect prediction (P=1.0): L = -log(1.0) = 0\nWrong prediction (P=0.01): L = -log(0.01) = 4.6"}
            note="Loss approaches 0 as the network gets better at classification" />
        </div>
      ),
    },
    backprop: {
      title: "CNN Backprop",
      color: C.amber,
      content: (
        <div>
          <InfoBox icon="🔄" title="HOW BACKPROP WORKS IN CNNs" color={C.amber}
            body={"The same backpropagation algorithm from regular networks works in CNNs. The chain rule flows gradients backward through every layer. The key insight: since filter weights are SHARED across positions, all their gradients get ACCUMULATED before updating."} />
          <MathBox color={C.amber} title="GRADIENT FLOW THROUGH CONV LAYER"
            lines={"Forward:  z = I ★ K  (convolution)\nForward:  a = ReLU(z)\n\nBackward (given ∂L/∂a from next layer):\n  ∂L/∂z = ∂L/∂a · ReLU'(z)\n         = ∂L/∂a   (where z > 0)\n         = 0       (where z ≤ 0)\n\nGradient w.r.t. kernel weights:\n  ∂L/∂K[i,j] = Σᵣ Σ꜀ ∂L/∂z[r,c] · I[r+i, c+j]\n  (sum because filter is SHARED at every position)\n\nFilter update:\n  K[i,j] ← K[i,j] - α · ∂L/∂K[i,j]"}
            note="Parameter sharing makes CNNs efficient AND the gradients efficient too" />
          <MathBox color={C.amberD} title="WHY CNNs NEED LESS DATA THAN DENSE NETWORKS"
            lines={"Dense layer: each weight connects ONE input→ONE output\n→ Must see many examples to learn each weight individually\n\nConv layer: same filter weights apply EVERYWHERE\n→ Every position in the image provides gradient info\n→ A 3×3 filter learns from 50,000 patches in one image!\n\nResult: CNNs generalize better with less training data"} />
        </div>
      ),
    },
  };

  const s = sections[activeSection];

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: C.mono, fontSize: 9, color: C.amberD, letterSpacing: 4, marginBottom: 8 }}>MODULE 08 / MATHEMATICS</div>
        <div style={{ fontFamily: C.serif, fontSize: 26, color: C.cream, marginBottom: 8 }}>The Math Behind CNNs</div>
        <div style={{ color: C.textS, fontSize: 13 }}>Formal definitions and worked examples for each operation.</div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {Object.entries(sections).map(([key, sec]) => (
          <button key={key} onClick={() => setActiveSection(key)} style={{
            flex: 1, minWidth: 100, padding: "10px 8px", fontFamily: C.mono, fontSize: 9, letterSpacing: 1,
            background: activeSection === key ? sec.color + "22" : C.card,
            border: "1px solid " + (activeSection === key ? sec.color : C.border),
            color: activeSection === key ? sec.color : C.textS,
            borderRadius: 6, cursor: "pointer",
          }}>{sec.title}</button>
        ))}
      </div>

      <div style={{ background: C.card, border: "1px solid " + s.color + "55", borderRadius: 10, padding: 20 }}>
        <div style={{ fontFamily: C.serif, fontSize: 20, color: C.cream, marginBottom: 16 }}>{s.title}</div>
        {s.content}
      </div>
    </div>
  );
}

// ─── SECTION: FAMOUS CNNs ─────────────────────────────────────────────────────
function SecFamous() {
  const [active, setActive] = useState("lenet");
  const nets = {
    lenet: {
      name: "LeNet-5 (1998)", color: C.amberD, icon: "🏦",
      by: "Yann LeCun, Yoshua Bengio, et al.",
      params: "60K",
      accuracy: "99.2% on MNIST digits",
      arch: "INPUT(32×32) → CONV(6) → POOL → CONV(16) → POOL → FC(120) → FC(84) → OUT(10)",
      story: "Used by American banks to read handwritten checks! The first practical CNN. Trained on MNIST (handwritten digits 0-9). Tiny by modern standards but revolutionary in 1998.",
      layers: [32, 28, 14, 10, 5, 120, 84, 10],
    },
    alexnet: {
      name: "AlexNet (2012)", color: C.rustL, icon: "🚀",
      by: "Alex Krizhevsky, Ilya Sutskever, Geoffrey Hinton",
      params: "62M",
      accuracy: "83.6% Top-5 on ImageNet (vs 73.8% previous best)",
      arch: "INPUT(224×224) → CONV(96)→POOL → CONV(256)→POOL → 3×CONV(384) → POOL → 3×FC → SOFTMAX(1000)",
      story: "The paper that changed everything. Beat every non-deep-learning method by a huge margin in 2012 ImageNet competition. Used 2 GPUs, ReLU, dropout, data augmentation. The 'big bang' of modern deep learning.",
      layers: [224, 55, 27, 13, 4096, 4096, 1000],
    },
    vgg: {
      name: "VGGNet-16 (2014)", color: C.sky, icon: "🏗️",
      by: "Simonyan & Zisserman, Oxford",
      params: "138M",
      accuracy: "92.7% Top-5 on ImageNet",
      arch: "INPUT(224) → [CONV(64)×2]→POOL → [CONV(128)×2]→POOL → [CONV(256)×3]→POOL → [CONV(512)×3]×2→POOL → FC×3",
      story: "Showed that depth matters — simple 3×3 filters stacked many times beat complex architectures. VGG-16 and VGG-19 became the standard pretrained models for years. Still widely used as feature extractors.",
      layers: [224, 112, 56, 28, 14, 7, 4096, 4096, 1000],
    },
    resnet: {
      name: "ResNet-50 (2015)", color: C.sage, icon: "⏩",
      by: "He, Zhang, Ren, Sun — Microsoft Research",
      params: "25M",
      accuracy: "93.3% Top-5 on ImageNet",
      arch: "INPUT → CONV(64) → [4 ResBlocks] × 4 stages → GlobalAvgPool → FC(1000)",
      story: "How do you train a 152-layer network without gradients vanishing? Skip connections! ResNet adds the input directly to the output (residual). Beat human-level ImageNet performance (3.57% error). Skip connections are now everywhere.",
      layers: [224, 112, 56, 28, 14, 7, 2048, 1000],
    },
  };

  const n = nets[active];

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: C.mono, fontSize: 9, color: C.amberD, letterSpacing: 4, marginBottom: 8 }}>MODULE 09 / FAMOUS CNNs</div>
        <div style={{ fontFamily: C.serif, fontSize: 26, color: C.cream, marginBottom: 8 }}>Famous CNN Architectures</div>
        <div style={{ color: C.textS, fontSize: 13 }}>The landmark networks that defined the history of computer vision.</div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {Object.entries(nets).map(([key, net]) => (
          <button key={key} onClick={() => setActive(key)} style={{
            flex: 1, padding: "10px 8px", fontFamily: C.mono, fontSize: 9, letterSpacing: 1,
            background: active === key ? net.color + "22" : C.card,
            border: "1px solid " + (active === key ? net.color : C.border),
            color: active === key ? net.color : C.textS,
            borderRadius: 7, cursor: "pointer", textAlign: "center",
          }}><div style={{ fontSize: 18, marginBottom: 4 }}>{net.icon}</div>{net.name}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          <div style={{ background: C.card, border: "1px solid " + n.color + "55", borderRadius: 10, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{n.icon}</div>
            <div style={{ fontFamily: C.serif, fontSize: 20, color: C.cream, marginBottom: 4 }}>{n.name}</div>
            <div style={{ fontFamily: C.mono, fontSize: 10, color: n.color, marginBottom: 12 }}>by {n.by}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              <div style={{ background: C.surface, border: "1px solid " + C.border, borderRadius: 6, padding: 10, textAlign: "center" }}>
                <div style={{ fontFamily: C.mono, fontSize: 8, color: C.textS, marginBottom: 4 }}>PARAMETERS</div>
                <div style={{ fontFamily: C.mono, fontSize: 18, color: n.color }}>{n.params}</div>
              </div>
              <div style={{ background: C.surface, border: "1px solid " + C.border, borderRadius: 6, padding: 10, textAlign: "center" }}>
                <div style={{ fontFamily: C.mono, fontSize: 8, color: C.textS, marginBottom: 4 }}>ACCURACY</div>
                <div style={{ fontFamily: C.mono, fontSize: 11, color: C.cream }}>{n.accuracy}</div>
              </div>
            </div>
            <div style={{ color: C.text, fontSize: 13, lineHeight: 1.75 }}>{n.story}</div>
          </div>
          <MathBox color={n.color} title="ARCHITECTURE" lines={n.arch} />
        </div>

        <div>
          {/* Layer size diagram */}
          <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 10, padding: 20, marginBottom: 16 }}>
            <Label color={n.color}>SPATIAL SIZE THROUGH THE NETWORK</Label>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
              {n.layers.map((s, i) => (
                <div key={i} style={{ textAlign: "center", flexShrink: 0 }}>
                  <div style={{
                    width: Math.max(6, s / 30), height: Math.max(6, s / 30),
                    background: n.color + "33", border: "1px solid " + n.color + "66",
                    borderRadius: 3, margin: "0 auto 4px",
                  }} />
                  <div style={{ fontFamily: C.mono, fontSize: 7, color: n.color }}>{s}</div>
                </div>
              ))}
            </div>
            <div style={{ fontFamily: C.mono, fontSize: 9, color: C.textS, marginTop: 8 }}>Size shrinks → class scores</div>
          </div>

          {/* Key innovation */}
          <div style={{ background: C.surface, border: "1px solid " + n.color + "33", borderRadius: 10, padding: 18 }}>
            <Label color={n.color}>🔑 KEY INNOVATION</Label>
            {active === "lenet" && <div style={{ color: C.text, fontSize: 13, lineHeight: 1.7 }}>First to combine <strong style={{ color: n.color }}>conv layers + pooling + fully connected</strong> in a single trainable system. Proved CNNs work in practice. Used backprop for end-to-end training.</div>}
            {active === "alexnet" && (
              <div>
                <div style={{ color: C.text, fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>Introduced several ideas now considered standard:</div>
                {["GPU training (2× GTX 580)", "ReLU instead of sigmoid (10× faster)", "Dropout for regularization", "Data augmentation (flips, crops)", "Local Response Normalization"].map(i => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: n.color, marginTop: 5 }} />
                    <div style={{ color: C.textS, fontSize: 12 }}>{i}</div>
                  </div>
                ))}
              </div>
            )}
            {active === "vgg" && <div style={{ color: C.text, fontSize: 13, lineHeight: 1.7 }}>Proved that <strong style={{ color: n.color }}>depth is more important than filter size</strong>. Two stacked 3×3 filters have the same receptive field as one 5×5 but fewer parameters and an extra non-linearity. Deep and simple beats shallow and complex.</div>}
            {active === "resnet" && (
              <div>
                <div style={{ color: C.text, fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>The <strong style={{ color: n.color }}>skip connection (residual block)</strong>:</div>
                <pre style={{ fontFamily: C.mono, fontSize: 11, color: C.cream, background: C.card, padding: 12, borderRadius: 6, lineHeight: 1.8 }}>
                  {"output = F(x) + x\n(learn residual, not mapping)\n\nGradient flows directly through +:\n∂L/∂x = ∂L/∂(F+x) = ∂L/∂F + 1\nNever vanishes!"}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SECTION: QUIZ ─────────────────────────────────────────────────────────────
function SecQuiz() {
  const [revealed, setRevealed] = useState({});

  const quiz = [
    { q: "A grayscale image is 28×28 pixels. We apply a single 5×5 filter with no padding and stride=1. What is the output size?", a: "Output = (28 - 5) / 1 + 1 = 24. So the output feature map is 24×24. The filter can slide 24 positions horizontally and 24 vertically.", c: C.conv },
    { q: "Why do we apply ReLU AFTER convolution, not before?", a: "Convolution is linear math. Applying ReLU before wouldn't help — we'd just zero out input pixels. We need to apply non-linearity AFTER computing the weighted sum so the activation can suppress low/negative responses and preserve strong ones.", c: C.rust },
    { q: "A CONV layer has 64 filters of size 3×3 applied to an input with 32 channels. How many parameters does this layer have? (Don't forget bias!)", a: "Parameters = (3 × 3 × 32 + 1) × 64 = (288 + 1) × 64 = 289 × 64 = 18,496 parameters. The +1 is for the bias for each filter.", c: C.amber },
    { q: "Why is max pooling considered 'translation invariant'? Give an example.", a: "If a dog's eye is detected at position (3,3), the max pooling window captures it. If it shifts to (3,4) or (4,3), the SAME pooling window still captures it and takes the same maximum. The pooled output is identical — the network doesn't care about the 1-pixel shift.", c: C.pool },
    { q: "How is a CNN different from a regular feedforward neural network when applied to images?", a: "Regular networks: every pixel connects to every neuron = millions of parameters, slow, doesn't understand spatial structure. CNNs: small filters slide over the image = shared weights (same filter for every location), far fewer parameters, and explicitly exploits the 2D spatial structure of images.", c: C.sky },
    { q: "ResNet has 152 layers but can still train without vanishing gradients. How?", a: "Skip connections (residual connections): output = F(x) + x. The gradient has a direct path: ∂L/∂x = ∂L/∂F + 1. The '+1' ensures gradients can never vanish — they always have at least a straight-through path from output to input, no matter how deep.", c: C.sage },
    { q: "Why do feature maps get deeper (more channels) as images get smaller through a CNN?", a: "As spatial size decreases, we need to preserve information capacity. More filters = more features detected per spatial location. Early layers detect few simple features (32 filters). Later layers detect many complex features (256+ filters). The information is compressed spatially but enriched in depth.", c: C.lavender },
  ];

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: C.mono, fontSize: 9, color: C.amberD, letterSpacing: 4, marginBottom: 8 }}>MODULE 10 / SUMMARY + QUIZ</div>
        <div style={{ fontFamily: C.serif, fontSize: 26, color: C.cream, marginBottom: 8 }}>Knowledge Check</div>
        <div style={{ color: C.textS, fontSize: 13 }}>Test your understanding. Click each question to reveal the answer.</div>
      </div>

      {/* Key concepts summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 24 }}>
        {[
          { icon: "🔲", title: "Convolution", body: "Small filter slides over image, computing weighted sum at each position. Detects features like edges. Parameters are SHARED across all positions.", color: C.conv },
          { icon: "⚡", title: "ReLU", body: "max(0,x) — zeroes negative values. Adds non-linearity so deep networks can model complex patterns. Fast and prevents vanishing gradients.", color: C.rust },
          { icon: "⬇️", title: "Max Pooling", body: "Takes maximum of 2×2 region. Shrinks feature maps by 50%. Adds translation invariance — small shifts don't change the output.", color: C.pool },
          { icon: "🔗", title: "Fully Connected", body: "At the end, flattened features connect to all neurons. Integrates spatial features into class predictions.", color: C.fc },
          { icon: "📊", title: "Softmax", body: "Converts raw class scores into probabilities summing to 1.0. P(k) = e^zk / Σe^zj. Highest probability = prediction.", color: C.out },
          { icon: "🏗️", title: "Feature Hierarchy", body: "Early layers: edges. Middle layers: shapes. Deep layers: objects. Each layer builds on the previous — no manual feature engineering!", color: C.amber },
        ].map(c => (
          <div key={c.title} style={{ background: C.card, border: "1px solid " + c.color + "33", borderRadius: 9, padding: 14 }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{c.icon}</div>
            <div style={{ fontFamily: C.mono, fontSize: 10, color: c.color, letterSpacing: 1, marginBottom: 6 }}>{c.title}</div>
            <div style={{ color: C.textS, fontSize: 12, lineHeight: 1.5 }}>{c.body}</div>
          </div>
        ))}
      </div>

      {/* Quiz */}
      <div style={{ fontFamily: C.mono, fontSize: 9, color: C.sage, letterSpacing: 3, marginBottom: 12 }}>🧠 CLICK TO REVEAL ANSWERS</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {quiz.map((item, i) => (
          <div key={i} onClick={() => setRevealed(r => ({ ...r, [i]: !r[i] }))} style={{
            background: revealed[i] ? item.c + "0d" : C.card,
            border: "1px solid " + (revealed[i] ? item.c + "55" : C.border),
            borderRadius: 9, padding: "14px 18px", cursor: "pointer", transition: "all 0.25s",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <div style={{ display: "flex", gap: 12, flex: 1 }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: item.c + "22", border: "1px solid " + item.c + "66", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: C.mono, fontSize: 10, color: item.c, flexShrink: 0 }}>Q{i + 1}</div>
                <div style={{ color: C.text, fontSize: 13, lineHeight: 1.65, fontWeight: "500" }}>{item.q}</div>
              </div>
              <div style={{ fontFamily: C.mono, fontSize: 18, color: revealed[i] ? item.c : C.textD, flexShrink: 0 }}>{revealed[i] ? "▲" : "▼"}</div>
            </div>
            {revealed[i] && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid " + item.c + "33", color: C.text, fontSize: 13, lineHeight: 1.75, borderLeft: "3px solid " + item.c, paddingLeft: 14 }}>
                ✅ {item.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Next steps */}
      <div style={{ marginTop: 24, background: C.amber + "0a", border: "1px solid " + C.amber + "33", borderRadius: 10, padding: 18 }}>
        <Label color={C.amber}>🚀 WHERE TO GO NEXT</Label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 10 }}>
          {[
            { icon: "⏩", t: "ResNets", d: "Skip connections for very deep networks", c: C.sage },
            { icon: "🎯", t: "YOLO / SSD", d: "Real-time object detection with CNNs", c: C.rustL },
            { icon: "🖼️", t: "U-Net", d: "CNNs for image segmentation (medical)", c: C.sky },
            { icon: "🔁", t: "ViT", d: "Vision Transformers — attention for images", c: C.lavender },
          ].map(n => (
            <div key={n.t} style={{ background: C.card, border: "1px solid " + n.c + "33", borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{n.icon}</div>
              <div style={{ fontFamily: C.mono, fontSize: 10, color: n.c, marginBottom: 4 }}>{n.t}</div>
              <div style={{ color: C.textS, fontSize: 11, lineHeight: 1.5 }}>{n.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const TABS = [
  { id: 0, short: "OVERVIEW",    label: "Overview & History",   color: C.amber,   component: SecOverview },
  { id: 1, short: "THE IMAGE",   label: "How Computers See",    color: C.sky,     component: SecDogImage },
  { id: 2, short: "CONVOLUTION", label: "Convolution",          color: C.conv,    component: SecConvolution },
  { id: 3, short: "FILTERS",     label: "Filters & Feature Maps", color: C.amberL, component: SecFilters },
  { id: 4, short: "RELU+POOL",   label: "ReLU & Pooling",       color: C.relu,    component: SecReluPool },
  { id: 5, short: "ARCHITECTURE",label: "CNN Architecture",     color: C.sky,     component: SecArchitecture },
  { id: 6, short: "DOG PIPELINE",label: "Dog Image Pipeline",   color: C.pool,    component: SecPipeline },
  { id: 7, short: "MATH",        label: "The Math",             color: C.amberL,  component: SecMath },
  { id: 8, short: "FAMOUS CNNs", label: "Famous CNNs",          color: C.rust,    component: SecFamous },
  { id: 9, short: "QUIZ",        label: "Summary & Quiz",       color: C.sage,    component: SecQuiz },
];

function CNNLesson() {
  const [tab, setTab] = useState(0);
  const topRef = useRef(null);

  const goTo = (i) => {
    setTab(i);
    if (topRef.current) topRef.current.scrollTop = 0;
  };

  const Tab = TABS[tab];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: C.serif, color: C.text }}>
      <style>{`
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-track{background:${C.dark}}
        ::-webkit-scrollbar-thumb{background:${C.border};border-radius:3px}
        ::-webkit-scrollbar-thumb:hover{background:${C.amberD}}
        * { box-sizing:border-box }
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* ── HEADER ─── */}
      <div style={{
        background: "linear-gradient(180deg,#1a0d03 0%," + C.bg + " 100%)",
        borderBottom: "1px solid " + C.border, position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "16px 28px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: C.mono, fontSize: 8, color: C.amberD, letterSpacing: 5, marginBottom: 6 }}>COMPUTER VISION · INTERACTIVE CURRICULUM · HIGH SCHOOL</div>
              <div style={{ fontFamily: C.serif, fontSize: 22, background: "linear-gradient(90deg," + C.amber + "," + C.rustL + ")", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: "bold", lineHeight: 1.2, marginBottom: 3 }}>
                Convolutional Neural Networks
              </div>
              <div style={{ fontFamily: C.mono, fontSize: 11, color: C.textS }}>From dog photo to "92.4% probability — this is a dog!"</div>
            </div>
            <div style={{ textAlign: "right", fontFamily: C.mono, fontSize: 10, color: C.textS, lineHeight: 1.9 }}>
              <div style={{ color: C.amber }}>🐕 Dog Image Example</div>
              <div>10 interactive modules</div>
              <div>Real math + visuals</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 1, overflowX: "auto", paddingBottom: 1 }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => goTo(t.id)} style={{
                padding: "8px 12px", border: "none", cursor: "pointer",
                background: tab === t.id ? C.card : "transparent",
                borderTop: "2px solid " + (tab === t.id ? t.color : "transparent"),
                color: tab === t.id ? t.color : C.textD,
                fontFamily: C.mono, fontSize: 8, letterSpacing: 1.5,
                borderRadius: "4px 4px 0 0", whiteSpace: "nowrap", flexShrink: 0,
              }}>
                {("0" + (t.id + 1)).slice(-2)} {t.short}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROGRESS ─── */}
      <div style={{ display: "flex", height: 3 }}>
        {TABS.map(t => (
          <div key={t.id} style={{ flex: 1, background: t.id <= tab ? t.color : C.dark, transition: "background 0.3s" }} />
        ))}
      </div>

      {/* ── CONTENT ─── */}
      <div ref={topRef} style={{ maxWidth: 1120, margin: "0 auto", padding: "28px 28px 60px", animation: "fadeIn 0.35s ease" }} key={tab}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          <div style={{ fontFamily: C.mono, fontSize: 8, color: C.textD, letterSpacing: 2 }}>CNN LESSON</div>
          <div style={{ color: C.textD }}>›</div>
          <div style={{ fontFamily: C.mono, fontSize: 8, color: Tab.color, letterSpacing: 2 }}>{Tab.label}</div>
          <div style={{ flex: 1 }} />
          <div style={{ fontFamily: C.mono, fontSize: 8, color: C.textD }}>{tab + 1} / {TABS.length}</div>
        </div>

        <Tab.component />

        {/* ── BOTTOM NAV ─── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 40, paddingTop: 20, borderTop: "1px solid " + C.border }}>
          <button onClick={() => goTo(Math.max(0, tab - 1))} disabled={tab === 0} style={{
            padding: "10px 24px", fontFamily: C.mono, fontSize: 10, letterSpacing: 2,
            background: tab === 0 ? "transparent" : C.card,
            border: "1px solid " + (tab === 0 ? "transparent" : C.border),
            color: tab === 0 ? "transparent" : C.text, borderRadius: 6,
            cursor: tab === 0 ? "default" : "pointer",
          }}>← {tab > 0 ? TABS[tab - 1].short : ""}</button>

          <div style={{ display: "flex", gap: 5 }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => goTo(t.id)} style={{
                width: t.id === tab ? 24 : 7, height: 7, borderRadius: 4, padding: 0,
                background: t.id === tab ? t.color : t.id < tab ? t.color + "55" : C.border,
                border: "none", cursor: "pointer", transition: "all 0.3s",
              }} />
            ))}
          </div>

          <button onClick={() => goTo(Math.min(TABS.length - 1, tab + 1))} disabled={tab === TABS.length - 1} style={{
            padding: "10px 24px", fontFamily: C.mono, fontSize: 10, letterSpacing: 2,
            background: tab === TABS.length - 1 ? "transparent" : Tab.color + "22",
            border: "1px solid " + (tab === TABS.length - 1 ? "transparent" : Tab.color),
            color: tab === TABS.length - 1 ? "transparent" : Tab.color, borderRadius: 6,
            cursor: tab === TABS.length - 1 ? "default" : "pointer",
          }}>{tab < TABS.length - 1 ? TABS[tab + 1].short : ""} →</button>
        </div>
      </div>
    </div>
  );
}



const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&family=Nunito:wght@400;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0e1a;
    --surface: #111827;
    --surface2: #1a2235;
    --border: #1e3a5f;
    --accent: #00d4ff;
    --accent2: #ff6b35;
    --accent3: #7c3aed;
    --accent4: #10b981;
    --text: #e2e8f0;
    --muted: #94a3b8;
    --glow: 0 0 20px rgba(0,212,255,0.3);
    --glow2: 0 0 20px rgba(255,107,53,0.3);
  }

  body { background: var(--bg); font-family: 'Nunito', sans-serif; color: var(--text); }

  .cnn-app {
    min-height: 100vh;
    background: linear-gradient(135deg, #0a0e1a 0%, #0d1b2a 50%, #0a0e1a 100%);
    position: relative;
    overflow-x: hidden;
  }

  .grid-bg {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 0;
  }

  .content { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; padding: 0 20px 60px; }

  /* HERO */
  .hero {
    text-align: center;
    padding: 60px 20px 40px;
    position: relative;
  }
  .hero-badge {
    display: inline-block;
    background: linear-gradient(90deg, rgba(0,212,255,0.1), rgba(124,58,237,0.1));
    border: 1px solid var(--accent);
    border-radius: 20px;
    padding: 6px 18px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 12px;
    color: var(--accent);
    letter-spacing: 2px;
    margin-bottom: 20px;
  }
  .hero h1 {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(28px, 5vw, 52px);
    font-weight: 900;
    background: linear-gradient(90deg, #00d4ff, #7c3aed, #ff6b35);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.2;
    margin-bottom: 16px;
  }
  .hero p {
    font-size: 18px;
    color: var(--muted);
    max-width: 600px;
    margin: 0 auto 30px;
    line-height: 1.7;
  }

  /* NAV TABS */
  .nav-tabs {
    display: flex;
    gap: 8px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }
  .nav-tab {
    padding: 10px 20px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--muted);
    cursor: pointer;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    font-size: 14px;
    transition: all 0.2s;
    letter-spacing: 0.5px;
  }
  .nav-tab:hover { border-color: var(--accent); color: var(--accent); }
  .nav-tab.active {
    background: linear-gradient(135deg, rgba(0,212,255,0.2), rgba(124,58,237,0.2));
    border-color: var(--accent);
    color: var(--accent);
    box-shadow: var(--glow);
  }

  /* CARDS */
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px;
    margin-bottom: 24px;
    position: relative;
    overflow: hidden;
  }
  .card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--accent3), var(--accent2));
  }
  .card-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--accent);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .card-title .icon { font-size: 20px; }
  .card p { color: var(--muted); line-height: 1.8; margin-bottom: 12px; font-size: 15px; }
  .card p:last-child { margin-bottom: 0; }
  .highlight { color: var(--accent); font-weight: 700; }
  .highlight2 { color: var(--accent2); font-weight: 700; }
  .highlight3 { color: var(--accent4); font-weight: 700; }

  /* INFO BOXES */
  .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 20px; }
  .info-box {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    transition: transform 0.2s, border-color 0.2s;
  }
  .info-box:hover { transform: translateY(-3px); border-color: var(--accent); }
  .info-box .emoji { font-size: 32px; margin-bottom: 10px; }
  .info-box h3 { font-size: 15px; font-weight: 800; color: var(--text); margin-bottom: 8px; }
  .info-box p { font-size: 13px; color: var(--muted); line-height: 1.6; }

  /* PIXEL GRID */
  .pixel-section { margin-top: 16px; }
  .pixel-controls {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 20px;
    align-items: center;
  }
  .btn {
    padding: 9px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    font-size: 14px;
    transition: all 0.2s;
  }
  .btn-primary { background: linear-gradient(135deg, #00d4ff, #7c3aed); color: white; }
  .btn-primary:hover { opacity: 0.85; transform: translateY(-1px); box-shadow: var(--glow); }
  .btn-secondary { background: var(--surface2); color: var(--accent); border: 1px solid var(--accent); }
  .btn-secondary:hover { background: rgba(0,212,255,0.1); }
  .btn-orange { background: linear-gradient(135deg, #ff6b35, #ff9a00); color: white; }

  .pixel-grids { display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-start; justify-content: center; }
  .pixel-container { text-align: center; }
  .pixel-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: var(--muted);
    margin-bottom: 8px;
    letter-spacing: 1px;
  }
  .pixel-grid {
    display: inline-grid;
    gap: 2px;
    border: 1px solid var(--border);
    padding: 4px;
    border-radius: 8px;
    background: var(--surface2);
  }
  .pixel-cell {
    width: 34px;
    height: 34px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s;
    border: 1px solid rgba(255,255,255,0.05);
    position: relative;
  }
  .pixel-cell:hover { transform: scale(1.1); z-index: 2; }
  .pixel-cell.active-filter { border: 2px solid #00d4ff !important; box-shadow: 0 0 10px rgba(0,212,255,0.6); }

  .filter-grid { display: inline-grid; gap: 2px; }
  .filter-cell {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Share Tech Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    color: white;
  }

  .arrow-sym {
    font-size: 28px;
    color: var(--accent);
    align-self: center;
    margin-top: 30px;
  }

  .result-cell {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Share Tech Mono', monospace;
    font-size: 14px;
    font-weight: 700;
    border: 2px solid var(--accent2);
    box-shadow: var(--glow2);
    transition: all 0.3s;
  }

  /* ARCHITECTURE VIS */
  .arch-container {
    overflow-x: auto;
    padding: 20px 0;
  }
  .arch-flow {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 700px;
    justify-content: center;
  }
  .arch-layer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    transition: transform 0.2s;
  }
  .arch-layer:hover { transform: translateY(-4px); }
  .arch-visual {
    display: flex;
    gap: 3px;
    align-items: center;
    justify-content: center;
  }
  .arch-rect {
    border-radius: 3px;
    transition: all 0.3s;
  }
  .arch-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    color: var(--muted);
    text-align: center;
    letter-spacing: 0.5px;
    max-width: 80px;
    line-height: 1.3;
  }
  .arch-arrow {
    font-size: 20px;
    color: var(--border);
    flex-shrink: 0;
    margin-top: -20px;
  }
  .arch-layer.selected .arch-label { color: var(--accent); }

  /* LAYER DETAIL */
  .layer-detail {
    background: var(--surface2);
    border: 1px solid var(--accent);
    border-radius: 12px;
    padding: 24px;
    margin-top: 20px;
    animation: fadeIn 0.3s ease;
  }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .layer-detail h3 {
    font-family: 'Orbitron', sans-serif;
    font-size: 14px;
    color: var(--accent);
    margin-bottom: 12px;
  }
  .layer-detail p { font-size: 14px; color: var(--muted); line-height: 1.7; margin-bottom: 8px; }
  .detail-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-top: 12px; }
  .detail-box {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 14px;
  }
  .detail-box h4 { font-size: 12px; font-weight: 800; color: var(--text); margin-bottom: 6px; font-family: 'Share Tech Mono', monospace; }
  .detail-box p { font-size: 12px; color: var(--muted); margin: 0; line-height: 1.5; }

  /* MATH SECTION */
  .math-box {
    background: #0d1117;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 16px 20px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 14px;
    color: var(--accent4);
    margin: 16px 0;
    line-height: 2;
    overflow-x: auto;
  }
  .math-comment { color: var(--muted); font-size: 12px; }

  /* STEP TRACKER */
  .steps-nav {
    display: flex;
    gap: 0;
    margin-bottom: 24px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid var(--border);
  }
  .step-btn {
    flex: 1;
    padding: 12px 8px;
    background: var(--surface);
    border: none;
    color: var(--muted);
    cursor: pointer;
    font-family: 'Share Tech Mono', monospace;
    font-size: 12px;
    transition: all 0.2s;
    border-right: 1px solid var(--border);
    text-align: center;
  }
  .step-btn:last-child { border-right: none; }
  .step-btn.active { background: linear-gradient(135deg, rgba(0,212,255,0.2), rgba(124,58,237,0.2)); color: var(--accent); }
  .step-btn .step-num { display: block; font-size: 18px; font-weight: 700; margin-bottom: 2px; }

  /* FORMULA CARDS */
  .formula-card {
    background: var(--surface2);
    border-left: 3px solid var(--accent3);
    border-radius: 0 10px 10px 0;
    padding: 16px 20px;
    margin: 12px 0;
  }
  .formula-card h4 { font-size: 13px; font-weight: 800; color: var(--accent3); margin-bottom: 6px; font-family: 'Orbitron', sans-serif; }
  .formula-card p { font-size: 13px; color: var(--muted); line-height: 1.6; }
  .formula-card .formula-eq {
    font-family: 'Share Tech Mono', monospace;
    font-size: 15px;
    color: var(--accent4);
    margin: 8px 0;
    padding: 8px;
    background: rgba(0,0,0,0.3);
    border-radius: 6px;
  }

  /* QUIZ */
  .quiz-card {
    background: linear-gradient(135deg, rgba(124,58,237,0.1), rgba(0,212,255,0.1));
    border: 1px solid var(--accent3);
    border-radius: 12px;
    padding: 24px;
    margin-top: 20px;
  }
  .quiz-question { font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 16px; }
  .quiz-options { display: flex; flex-direction: column; gap: 8px; }
  .quiz-option {
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--surface);
    cursor: pointer;
    font-size: 14px;
    color: var(--muted);
    transition: all 0.2s;
    text-align: left;
  }
  .quiz-option:hover { border-color: var(--accent); color: var(--text); }
  .quiz-option.correct { border-color: var(--accent4); background: rgba(16,185,129,0.15); color: var(--accent4); }
  .quiz-option.wrong { border-color: var(--accent2); background: rgba(255,107,53,0.1); color: var(--accent2); }
  .quiz-feedback { margin-top: 14px; padding: 12px; border-radius: 8px; font-size: 14px; line-height: 1.6; }
  .quiz-feedback.correct { background: rgba(16,185,129,0.1); color: var(--accent4); border: 1px solid var(--accent4); }
  .quiz-feedback.wrong { background: rgba(255,107,53,0.1); color: var(--accent2); border: 1px solid var(--accent2); }

  /* NEURONS */
  .neuron-row { display: flex; align-items: center; gap: 16px; margin: 12px 0; flex-wrap: wrap; }
  .neuron-box {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px 18px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 13px;
    color: var(--text);
    min-width: 120px;
    text-align: center;
  }
  .neuron-box .nb-label { font-size: 10px; color: var(--muted); margin-bottom: 4px; }
  .neuron-box .nb-val { font-size: 16px; font-weight: 700; }
  .neuron-op { font-size: 20px; color: var(--accent); font-weight: 900; }

  /* REAL WORLD */
  .rw-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-top: 16px; }
  .rw-card {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 18px;
    transition: all 0.2s;
    cursor: default;
  }
  .rw-card:hover { border-color: var(--accent2); transform: translateY(-3px); box-shadow: var(--glow2); }
  .rw-card .rw-emoji { font-size: 30px; margin-bottom: 10px; }
  .rw-card h3 { font-size: 14px; font-weight: 800; color: var(--text); margin-bottom: 6px; }
  .rw-card p { font-size: 13px; color: var(--muted); line-height: 1.5; }

  /* PROGRESS */
  .progress-bar-wrap { background: var(--surface2); border-radius: 10px; height: 6px; margin: 20px 0; overflow: hidden; }
  .progress-bar { height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent3)); border-radius: 10px; transition: width 0.5s ease; }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: var(--surface); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

  .section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
  .section-num {
    width: 36px; height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--accent3));
    display: flex; align-items: center; justify-content: center;
    font-family: 'Orbitron', sans-serif;
    font-weight: 900;
    font-size: 14px;
    color: white;
    flex-shrink: 0;
  }
  .section-title { font-family: 'Orbitron', sans-serif; font-size: 20px; font-weight: 700; color: var(--text); }

  .tag {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    margin: 2px;
    font-family: 'Share Tech Mono', monospace;
  }
  .tag-blue { background: rgba(0,212,255,0.15); color: var(--accent); border: 1px solid rgba(0,212,255,0.3); }
  .tag-orange { background: rgba(255,107,53,0.15); color: var(--accent2); border: 1px solid rgba(255,107,53,0.3); }
  .tag-green { background: rgba(16,185,129,0.15); color: var(--accent4); border: 1px solid rgba(16,185,129,0.3); }
  .tag-purple { background: rgba(124,58,237,0.15); color: #a78bfa; border: 1px solid rgba(124,58,237,0.3); }

  .divider { border: none; border-top: 1px solid var(--border); margin: 28px 0; }

  .animated-num {
    font-family: 'Orbitron', monospace;
    font-size: 28px;
    font-weight: 900;
    color: var(--accent);
  }

  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
  .pulse { animation: pulse 2s infinite; }
  @keyframes slideIn { from{transform:translateX(-20px);opacity:0} to{transform:translateX(0);opacity:1} }
  .slide-in { animation: slideIn 0.4s ease forwards; }
`;

// ========================
// DATA
// ========================
const SECTIONS = [
  { id: "what", label: "What is CNN?" },
  { id: "why", label: "Why Use CNN?" },
  { id: "how", label: "How It Works" },
  { id: "layers", label: "Layers & Math" },
  { id: "example", label: "Live Example" },
  { id: "quiz", label: "Quiz" },
];

const PIXEL_INPUT = [
  [0, 0, 1, 1, 0],
  [0, 1, 1, 1, 1],
  [1, 1, 0, 0, 1],
  [0, 1, 0, 0, 1],
  [0, 0, 1, 1, 0],
];

const KERNEL = [
  [1, 0, -1],
  [1, 0, -1],
  [1, 0, -1],
];

const ARCH_LAYERS = [
  {
    id: "input",
    label: "Input\nImage",
    color: "#00d4ff",
    rects: [{ w: 50, h: 50, opacity: 1 }],
    desc: "The raw image — just numbers! Every pixel is a number from 0 (black) to 255 (white). A 28×28 grayscale image = 784 numbers.",
    io: "Input: 28×28×1 pixels → Output: same image data",
    details: [
      { title: "📐 Shape", body: "Width × Height × Channels\ne.g. 28 × 28 × 1 (grayscale)\nor 224 × 224 × 3 (RGB color)" },
      { title: "🔢 Values", body: "Each pixel: 0–255\n(0 = black, 255 = white)" },
      { title: "📦 Purpose", body: "Feed raw pixel values into the network. No processing yet." },
    ],
  },
  {
    id: "conv",
    label: "Conv\nLayer",
    color: "#7c3aed",
    rects: [{ w: 46, h: 46, opacity: 0.95 }, { w: 46, h: 46, opacity: 0.8 }, { w: 46, h: 46, opacity: 0.65 }],
    desc: "The FILTER slides across the image and looks for patterns — like edges, corners, or curves. Each filter learns a different feature automatically during training!",
    io: "Input: 28×28×1 → Output: 26×26×32 (with 32 filters)",
    details: [
      { title: "🎛️ Filter / Kernel", body: "A small grid (e.g. 3×3) of learned weights that slides across the image." },
      { title: "📊 Feature Map", body: "The output after applying one filter. High values = pattern found!" },
      { title: "⚙️ Parameters", body: "Filter size: 3×3\nNum filters: 32\nStride: 1\nPadding: 0" },
    ],
  },
  {
    id: "relu",
    label: "ReLU\nActivation",
    color: "#ff6b35",
    rects: [{ w: 44, h: 44, opacity: 0.9 }, { w: 44, h: 44, opacity: 0.75 }, { w: 44, h: 44, opacity: 0.6 }],
    desc: "ReLU says: 'If the value is negative → make it 0. If positive → keep it.' This adds non-linearity and lets the network learn complex shapes!",
    io: "Input: any → Output: max(0, input) — negatives become 0",
    details: [
      { title: "🧮 Formula", body: "ReLU(x) = max(0, x)\n\nNegative → 0\nPositive → unchanged" },
      { title: "❓ Why?", body: "Without activation functions, layers just combine linearly — can't learn complex patterns." },
      { title: "🔥 Other Options", body: "Sigmoid, Tanh, Leaky ReLU — but ReLU is fastest and most common." },
    ],
  },
  {
    id: "pool",
    label: "Pooling\nLayer",
    color: "#10b981",
    rects: [{ w: 30, h: 30, opacity: 0.9 }, { w: 30, h: 30, opacity: 0.75 }, { w: 30, h: 30, opacity: 0.6 }],
    desc: "Pooling SHRINKS the image. Max pooling picks the biggest value in each 2×2 window. This keeps the important info while making the map smaller and faster to process!",
    io: "Input: 26×26×32 → Output: 13×13×32 (halved!)",
    details: [
      { title: "🏊 Max Pooling", body: "Take a 2×2 region → keep only the max value. Reduces size by 2×." },
      { title: "📉 Why shrink?", body: "Reduces computation. Keeps dominant features. Adds translation tolerance." },
      { title: "🎯 Result", body: "Smaller feature maps that still capture WHERE patterns are." },
    ],
  },
  {
    id: "flatten",
    label: "Flatten",
    color: "#f59e0b",
    rects: [{ w: 12, h: 60, opacity: 1 }],
    desc: "Take all the 2D feature maps and UNROLL them into one long 1D list of numbers. This list is then fed into the regular neural network layers.",
    io: "Input: 13×13×32 → Output: 5408 numbers in a row",
    details: [
      { title: "📊 Shape change", body: "3D tensor → 1D vector\n13 × 13 × 32 = 5408 values" },
      { title: "🔗 Bridge", body: "Connects the convolutional part (spatial) to the fully-connected part (classification)." },
    ],
  },
  {
    id: "fc",
    label: "Fully\nConnected",
    color: "#ec4899",
    rects: [{ w: 14, h: 55, opacity: 0.9 }, { w: 14, h: 45, opacity: 0.8 }],
    desc: "Every neuron connects to every neuron in the next layer. These layers combine all the features to make a final decision about what the image is.",
    io: "Input: 5408 → Hidden: 128 → Output: 10 classes",
    details: [
      { title: "🧠 Dense Layer", body: "Each connection has a weight. Output = sum(weight × input) + bias → ReLU" },
      { title: "🔢 Size", body: "5408 → 128 neurons → 10 neurons (one per class)" },
      { title: "💡 Role", body: "'Reasons' about combined features to produce the final classification." },
    ],
  },
  {
    id: "softmax",
    label: "Softmax\nOutput",
    color: "#06b6d4",
    rects: [{ w: 14, h: 40, opacity: 1 }],
    desc: "Softmax converts raw scores into PROBABILITIES that add up to 100%. The class with the highest probability is the network's prediction!",
    io: "Input: 10 raw scores → Output: 10 probabilities (sum=1.0)",
    details: [
      { title: "📊 Formula", body: "P(class i) = e^(score_i) / Σe^(score_j)\nAll values: 0 to 1\nAll sum: exactly 1.0" },
      { title: "🏆 Decision", body: "argmax(probabilities) = predicted class" },
      { title: "🎯 Example", body: "Cat: 87%, Dog: 10%, Bird: 3% → Predict: CAT" },
    ],
  },
];

const QUIZ_QUESTIONS = [
  {
    q: "What does a Convolutional layer's filter (kernel) do?",
    options: [
      "Shrinks the image in half",
      "Slides over the image to detect patterns like edges",
      "Converts the image to probabilities",
      "Removes all negative values",
    ],
    correct: 1,
    explanation: "✅ Correct! A filter (kernel) slides across the image performing dot products, looking for specific patterns like edges, curves, or textures. Different filters detect different features!",
  },
  {
    q: "What does ReLU activation do to a value of -5?",
    options: ["Keeps it as -5", "Changes it to 5", "Changes it to 0", "Changes it to 0.5"],
    correct: 2,
    explanation: "✅ Exactly! ReLU(x) = max(0, x). So ReLU(-5) = max(0, -5) = 0. Negative values become zero. Positive values stay the same!",
  },
  {
    q: "Why do we use Pooling layers in a CNN?",
    options: [
      "To add more trainable weights",
      "To make the image larger",
      "To reduce the size and keep important features",
      "To shuffle the pixels randomly",
    ],
    correct: 2,
    explanation: "✅ Right! Pooling reduces the spatial size (e.g., 26×26 → 13×13), which reduces computation while retaining the most important features detected by the filters.",
  },
  {
    q: "In the output layer with Softmax, what does the network predict?",
    options: [
      "The pixel values of the image",
      "The class with the highest probability",
      "The number of layers in the network",
      "The filter size used in convolution",
    ],
    correct: 1,
    explanation: "✅ Perfect! Softmax converts raw scores to probabilities. The class with the HIGHEST probability is the final prediction. For example, if 'cat' has 90% probability, the network predicts 'cat'!",
  },
];

// ========================
// UTILS
// ========================
function computeConv(input, kernel, row, col) {
  let sum = 0;
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      sum += input[row + i][col + j] * kernel[i][j];
  return sum;
}

function getPixelColor(val) {
  const v = Math.min(1, Math.max(0, val));
  const r = Math.round(v * 30);
  const g = Math.round(60 + v * 180);
  const b = Math.round(100 + v * 155);
  return `rgb(${r},${g},${b})`;
}

// ========================
// COMPONENTS
// ========================
function WhatSection() {
  return (
    <div className="slide-in">
      <div className="section-header">
        <div className="section-num">1</div>
        <div className="section-title">What is a CNN?</div>
      </div>

      <div className="card">
        <div className="card-title"><span className="icon">🧠</span> The Big Idea</div>
        <p>
          A <span className="highlight">Convolutional Neural Network (CNN)</span> is a type of artificial intelligence that can <span className="highlight">look at images</span> and understand what's in them — just like your eyes and brain do!
        </p>
        <p>
          Imagine teaching a computer to recognize a cat. A CNN doesn't look for "fur" or "whiskers" the way a human might describe it — instead it <span className="highlight2">automatically learns</span> which pixel patterns appear in cat photos by studying thousands of examples.
        </p>
        <p>
          The word <span className="highlight3">"Convolutional"</span> comes from a math operation called <em>convolution</em> — sliding a small filter over the image to detect patterns. "Neural Network" means it's inspired by how neurons in your brain connect and communicate.
        </p>
      </div>

      <div className="info-grid">
        {[
          { emoji: "👁️", title: "Sees Patterns", body: "CNNs detect low-level features first (edges, colors) then combine them into high-level features (shapes, objects)." },
          { emoji: "📚", title: "Learns from Data", body: "Feed it thousands of labeled images and it figures out the patterns on its own — no manual rules needed!" },
          { emoji: "🔬", title: "Inspired by Biology", body: "Based on how the visual cortex in animal brains processes visual information in hierarchical layers." },
          { emoji: "⚡", title: "Super Fast", body: "Once trained, a CNN can classify an image in milliseconds — much faster than a human expert!" },
        ].map((item) => (
          <div className="info-box" key={item.title}>
            <div className="emoji">{item.emoji}</div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-title"><span className="icon">🏗️</span> The Human Analogy</div>
        <p>
          Think of how YOU recognize a dog in a photo:
        </p>
        <p>
          <span className="tag tag-blue">Step 1</span> Your eyes detect <strong>edges</strong> and <strong>colors</strong> (low-level)
        </p>
        <p>
          <span className="tag tag-purple">Step 2</span> Your brain groups edges into <strong>shapes</strong> — a round head, four legs (mid-level)
        </p>
        <p>
          <span className="tag tag-orange">Step 3</span> You combine shapes to recognize <strong>"that's a dog!"</strong> (high-level)
        </p>
        <p style={{ marginTop: 12 }}>
          A CNN does <span className="highlight">exactly the same thing</span>, just with math and matrices instead of neurons. Each layer of the CNN builds on the previous one, from simple to complex!
        </p>
      </div>
    </div>
  );
}

function WhySection() {
  return (
    <div className="slide-in">
      <div className="section-header">
        <div className="section-num">2</div>
        <div className="section-title">Why Do We Use CNNs?</div>
      </div>

      <div className="card">
        <div className="card-title"><span className="icon">❓</span> The Problem with Regular Neural Networks</div>
        <p>
          Imagine a tiny 32×32 pixel image. That's <span className="highlight">32 × 32 × 3 = 3,072 numbers</span> (one for each color channel). A regular neural network (MLP) would connect EVERY one of those to EVERY neuron — that's millions of connections just for a tiny image!
        </p>
        <p>
          For a 224×224 image: <span className="highlight2">224 × 224 × 3 = 150,528 input numbers</span>. With 1,000 neurons in the first layer, that's <span className="highlight2">150 million parameters</span> in just one layer. Way too many! CNNs solve this by using shared filters.
        </p>
      </div>

      <div className="rw-grid">
        {[
          { emoji: "🏥", title: "Medical Imaging", body: "Detect tumors in X-rays, MRI scans. Helps doctors diagnose cancer earlier than the human eye can." },
          { emoji: "🚗", title: "Self-Driving Cars", body: "Identify pedestrians, road signs, lane markings in real-time from camera feeds." },
          { emoji: "📱", title: "Face Unlock", body: "Your phone's face recognition uses CNNs to verify it's really you in milliseconds." },
          { emoji: "🔍", title: "Google Search", body: "Search by image — upload a photo and find similar images or identify objects." },
          { emoji: "🎮", title: "Game AI", body: "CNN-based AI can beat human champions at games like Go, Chess, and video games." },
          { emoji: "🌱", title: "Agriculture", body: "Drones with CNNs scan crops to detect disease, pests, and water stress." },
        ].map((item) => (
          <div className="rw-card" key={item.title}>
            <div className="rw-emoji">{item.emoji}</div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-title"><span className="icon">⚔️</span> CNN Advantages</div>
        <div className="info-grid">
          {[
            { emoji: "🔧", title: "Parameter Sharing", body: "One filter scans the WHOLE image. Fewer parameters = less memory & faster training." },
            { emoji: "🌍", title: "Translation Invariant", body: "A cat in the top-left is recognized the same as a cat in the bottom-right." },
            { emoji: "📐", title: "Spatial Hierarchy", body: "Automatically builds from edges → shapes → objects. No manual feature engineering!" },
            { emoji: "📈", title: "Scalable", body: "Works on images from 28×28 pixels all the way to 4K resolution." },
          ].map((item) => (
            <div className="info-box" key={item.title}>
              <div className="emoji">{item.emoji}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HowSection() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      title: "📷 Step 1: Image → Numbers",
      content: (
        <div>
          <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: 16 }}>
            Every image is just a grid of numbers! For grayscale: one number per pixel (0–255). For color (RGB): three numbers per pixel — one for Red, Green, and Blue channels.
          </p>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div className="pixel-label">Original 5×5 Grayscale Image</div>
              <div className="pixel-grid" style={{ gridTemplateColumns: "repeat(5,1fr)" }}>
                {PIXEL_INPUT.map((row, r) =>
                  row.map((val, c) => (
                    <div
                      key={`${r}-${c}`}
                      className="pixel-cell"
                      style={{
                        backgroundColor: val ? "#e2e8f0" : "#1a2235",
                        color: val ? "#1a2235" : "#64748b",
                      }}
                    >
                      {val}
                    </div>
                  ))
                )}
              </div>
            </div>
            <div style={{ alignSelf: "center", fontSize: 28, color: "var(--accent)" }}>→</div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div className="math-box">
                Pixel (0,0) = 0 (black)<br />
                Pixel (0,2) = 1 (white)<br />
                Pixel (1,1) = 1 (white)<br />
                <br />
                <span className="math-comment"># Color image (RGB):</span><br />
                Pixel (r,c) = [R, G, B]<br />
                e.g. = [255, 128, 0]<br />
                <span className="math-comment"># → orange pixel</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "🔍 Step 2: Convolution — Sliding Filter",
      content: (
        <div>
          <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: 16 }}>
            A <span style={{ color: "var(--accent)", fontWeight: 700 }}>filter (kernel)</span> is a small grid of weights (e.g. 3×3). It slides over the image, and at each position, we multiply and sum the filter values with the image values beneath it. This produces a <span style={{ color: "var(--accent2)", fontWeight: 700 }}>feature map</span> showing where the pattern was found.
          </p>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div className="pixel-label">Input Image (5×5)</div>
              <div className="pixel-grid" style={{ gridTemplateColumns: "repeat(5,1fr)" }}>
                {PIXEL_INPUT.map((row, r) =>
                  row.map((val, c) => (
                    <div
                      key={`${r}-${c}`}
                      className="pixel-cell"
                      style={{
                        backgroundColor: val ? "#e2e8f0" : "#1a2235",
                        color: val ? "#1a2235" : "#64748b",
                        border: (r < 3 && c < 3) ? "2px solid #00d4ff" : "1px solid rgba(255,255,255,0.05)",
                        boxShadow: (r < 3 && c < 3) ? "0 0 8px rgba(0,212,255,0.5)" : "none",
                      }}
                    >
                      {val}
                    </div>
                  ))
                )}
              </div>
              <div style={{ fontSize: 11, color: "var(--accent)", marginTop: 6 }}>Blue box = filter position</div>
            </div>
            <div style={{ textAlign: "center", fontSize: 22, color: "var(--muted)" }}>✕</div>
            <div style={{ textAlign: "center" }}>
              <div className="pixel-label">Filter / Kernel (3×3)</div>
              <div className="filter-grid" style={{ gridTemplateColumns: "repeat(3,1fr)", gap: 2, border: "1px solid var(--border)", padding: 4, borderRadius: 8, background: "var(--surface2)" }}>
                {KERNEL.map((row, r) =>
                  row.map((val, c) => (
                    <div
                      key={`k${r}-${c}`}
                      className="filter-cell"
                      style={{
                        background: val > 0 ? "rgba(124,58,237,0.6)" : val < 0 ? "rgba(255,107,53,0.5)" : "rgba(255,255,255,0.1)",
                      }}
                    >
                      {val}
                    </div>
                  ))
                )}
              </div>
              <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 6 }}>Purple=+1, Orange=-1, Gray=0</div>
            </div>
            <div style={{ fontSize: 22, color: "var(--muted)" }}>→</div>
            <div style={{ textAlign: "center" }}>
              <div className="pixel-label">Feature Map (3×3)</div>
              <div className="filter-grid" style={{ gridTemplateColumns: "repeat(3,1fr)", gap: 4 }}>
                {[0, 1, 2].map((r) =>
                  [0, 1, 2].map((c) => {
                    const val = computeConv(PIXEL_INPUT, KERNEL, r, c);
                    const norm = (val + 3) / 6;
                    return (
                      <div
                        key={`f${r}-${c}`}
                        className="result-cell"
                        style={{
                          background: `rgba(${Math.round(norm * 255)}, ${Math.round(107 + norm * 50)}, 53, 0.5)`,
                        }}
                      >
                        {val}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
          <div className="math-box" style={{ marginTop: 16 }}>
            <span className="math-comment"># At position (0,0): dot product of top-left 3×3 patch with kernel</span><br />
            = (0×1) + (0×0) + (1×-1)<br />
            + (0×1) + (1×0) + (1×-1)<br />
            + (1×1) + (1×0) + (0×-1)<br />
            = 0 + 0 + (-1) + 0 + 0 + (-1) + 1 + 0 + 0 = <span style={{ color: "var(--accent2)" }}>-1</span>
          </div>
        </div>
      ),
    },
    {
      title: "⚡ Step 3: Apply ReLU Activation",
      content: (
        <div>
          <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: 16 }}>
            After convolution, we apply <span style={{ color: "var(--accent2)", fontWeight: 700 }}>ReLU (Rectified Linear Unit)</span>. This activation function sets all negative values to 0. Why? Because negative activations often mean "this pattern is NOT here" — and we want to focus on where patterns ARE present.
          </p>
          <div className="formula-card">
            <h4>ReLU Formula</h4>
            <div className="formula-eq">ReLU(x) = max(0, x)</div>
            <p>If x is negative → output = 0 &nbsp;|&nbsp; If x is positive → output = x (unchanged)</p>
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginTop: 20 }}>
            {[[-3, 0], [-1, 0], [0, 0], [2, 2], [4, 4], [7, 7]].map(([input, output], i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div className="neuron-box">
                  <div className="nb-label">Input</div>
                  <div className="nb-val" style={{ color: input < 0 ? "var(--accent2)" : "var(--accent4)" }}>{input}</div>
                </div>
                <div style={{ fontSize: 18, margin: "6px 0", color: "var(--accent)" }}>↓ ReLU</div>
                <div className="neuron-box" style={{ borderColor: output > 0 ? "var(--accent4)" : "var(--border)" }}>
                  <div className="nb-label">Output</div>
                  <div className="nb-val" style={{ color: output > 0 ? "var(--accent4)" : "var(--muted)" }}>{output}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "🏊 Step 4: Max Pooling",
      content: (
        <div>
          <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: 16 }}>
            <span style={{ color: "var(--accent4)", fontWeight: 700 }}>Max Pooling</span> takes a window (e.g. 2×2) and keeps only the MAXIMUM value. This shrinks the feature map by half! It's like asking: "Was this feature present <em>anywhere</em> in this region?" — we don't care exactly where, just that it was there.
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div className="pixel-label">After ReLU (4×4)</div>
              <div className="pixel-grid" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
                {[[1,0,2,3],[0,0,1,2],[2,1,0,0],[1,3,0,1]].map((row, r) =>
                  row.map((val, c) => (
                    <div key={`p${r}-${c}`} className="pixel-cell"
                      style={{
                        background: (r < 2 && c < 2) ? "rgba(16,185,129,0.3)" : (r < 2 && c >= 2) ? "rgba(124,58,237,0.3)" : (r >= 2 && c < 2) ? "rgba(255,107,53,0.3)" : "rgba(0,212,255,0.3)",
                        borderColor: "rgba(255,255,255,0.1)",
                        color: "white",
                        fontWeight: 700,
                      }}>
                      {val}
                    </div>
                  ))
                )}
              </div>
            </div>
            <div style={{ fontSize: 28, color: "var(--accent)" }}>→</div>
            <div style={{ textAlign: "center" }}>
              <div className="pixel-label">After Max Pool (2×2)</div>
              <div className="pixel-grid" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
                {[
                  { val: 1, color: "rgba(16,185,129,0.5)" },
                  { val: 3, color: "rgba(124,58,237,0.5)" },
                  { val: 3, color: "rgba(255,107,53,0.5)" },
                  { val: 1, color: "rgba(0,212,255,0.5)" },
                ].map((item, i) => (
                  <div key={i} className="pixel-cell" style={{ width: 50, height: 50, background: item.color, color: "white", fontWeight: 900, fontSize: 18 }}>
                    {item.val}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p style={{ color: "var(--muted)", lineHeight: 1.8, marginTop: 16, fontSize: 14 }}>
            Each colored region (2×2) was compressed to its max value: top-left max(1,0,0,0)=1, top-right max(2,3,1,2)=<strong style={{ color: "var(--accent4)" }}>3</strong>, bottom-left max(2,1,1,3)=<strong style={{ color: "var(--accent4)" }}>3</strong>, bottom-right max(0,0,0,1)=1.
          </p>
        </div>
      ),
    },
    {
      title: "🔗 Step 5: Flatten & Classify",
      content: (
        <div>
          <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: 16 }}>
            After convolution and pooling, we have 2D feature maps. We <span style={{ color: "var(--accent)", fontWeight: 700 }}>flatten</span> them into a 1D vector, then pass it through <span style={{ color: "var(--accent3)", fontWeight: 700 }}>Fully Connected (Dense) layers</span> that combine all features to make the final classification.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="neuron-row" style={{ justifyContent: "center" }}>
              <div className="neuron-box">
                <div className="nb-label">2D Feature Maps</div>
                <div className="nb-val" style={{ fontSize: 14 }}>13×13×32</div>
              </div>
              <div className="neuron-op">→</div>
              <div className="neuron-box">
                <div className="nb-label">Flattened Vector</div>
                <div className="nb-val" style={{ fontSize: 14 }}>5,408</div>
              </div>
              <div className="neuron-op">→</div>
              <div className="neuron-box">
                <div className="nb-label">Dense Layer</div>
                <div className="nb-val" style={{ fontSize: 14 }}>128</div>
              </div>
              <div className="neuron-op">→</div>
              <div className="neuron-box" style={{ borderColor: "var(--accent4)" }}>
                <div className="nb-label">Softmax Output</div>
                <div className="nb-val" style={{ fontSize: 14, color: "var(--accent4)" }}>10 classes</div>
              </div>
            </div>
          </div>
          <div className="formula-card" style={{ marginTop: 16 }}>
            <h4>Dense Layer Calculation</h4>
            <div className="formula-eq">output = ReLU( W · x + b )</div>
            <p>W = weight matrix, x = input vector, b = bias vector<br />
              Each neuron computes a weighted sum of its inputs plus a bias, then applies ReLU.</p>
          </div>
          <div className="formula-card" style={{ borderLeftColor: "var(--accent4)" }}>
            <h4>Softmax Output (Final Probabilities)</h4>
            <div className="formula-eq" style={{ color: "var(--accent4)" }}>P(class i) = exp(zᵢ) / Σ exp(zⱼ)</div>
            <p>Converts raw scores to probabilities (0–1) that all sum to 1.0. The highest probability = prediction!</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="slide-in">
      <div className="section-header">
        <div className="section-num">3</div>
        <div className="section-title">How CNNs Work — Step by Step</div>
      </div>

      <div className="steps-nav">
        {steps.map((s, i) => (
          <button key={i} className={`step-btn ${activeStep === i ? "active" : ""}`} onClick={() => setActiveStep(i)}>
            <span className="step-num">{i + 1}</span>
            {s.title.split(" ").slice(1, 3).join(" ")}
          </button>
        ))}
      </div>

      <div className="progress-bar-wrap">
        <div className="progress-bar" style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }} />
      </div>

      <div className="card">
        <div className="card-title">{steps[activeStep].title}</div>
        {steps[activeStep].content}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
        <button className="btn btn-secondary" onClick={() => setActiveStep(Math.max(0, activeStep - 1))} disabled={activeStep === 0}
          style={{ opacity: activeStep === 0 ? 0.4 : 1 }}>
          ← Previous
        </button>
        <button className="btn btn-primary" onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))} disabled={activeStep === steps.length - 1}
          style={{ opacity: activeStep === steps.length - 1 ? 0.4 : 1 }}>
          Next Step →
        </button>
      </div>
    </div>
  );
}

function LayersSection() {
  const [selectedLayer, setSelectedLayer] = useState(0);
  const layer = ARCH_LAYERS[selectedLayer];

  return (
    <div className="slide-in">
      <div className="section-header">
        <div className="section-num">4</div>
        <div className="section-title">CNN Architecture & Math</div>
      </div>

      <div className="card">
        <div className="card-title"><span className="icon">🏗️</span> Click Any Layer to Explore</div>
        <p style={{ marginBottom: 20, color: "var(--muted)" }}>
          A CNN is made of <span style={{ color: "var(--accent)", fontWeight: 700 }}>stacked layers</span>, each transforming the data. Click each layer below to see what it does!
        </p>
        <div className="arch-container">
          <div className="arch-flow">
            {ARCH_LAYERS.map((l, i) => (
              <>
                <div
                  key={l.id}
                  className={`arch-layer ${selectedLayer === i ? "selected" : ""}`}
                  onClick={() => setSelectedLayer(i)}
                >
                  <div className="arch-visual">
                    {l.rects.map((r, ri) => (
                      <div
                        key={ri}
                        className="arch-rect"
                        style={{
                          width: r.w,
                          height: r.h,
                          background: selectedLayer === i
                            ? `${l.color}cc`
                            : `${l.color}55`,
                          border: `2px solid ${l.color}${selectedLayer === i ? "ff" : "77"}`,
                          boxShadow: selectedLayer === i ? `0 0 15px ${l.color}66` : "none",
                          transform: ri > 0 ? `translateX(-${ri * 4}px)` : "none",
                          zIndex: ri,
                        }}
                      />
                    ))}
                  </div>
                  <div className="arch-label" style={{ color: selectedLayer === i ? l.color : "var(--muted)" }}>
                    {l.label}
                  </div>
                </div>
                {i < ARCH_LAYERS.length - 1 && (
                  <div key={`arr-${i}`} className="arch-arrow">→</div>
                )}
              </>
            ))}
          </div>
        </div>

        <div className="layer-detail">
          <h3 style={{ color: layer.color }}>📌 {layer.label.replace("\n", " ")} Layer</h3>
          <p style={{ marginBottom: 12 }}>{layer.desc}</p>
          <div className="math-box" style={{ fontSize: 13 }}>
            <span className="math-comment"># I/O dimensions:</span><br />
            {layer.io}
          </div>
          <div className="detail-grid">
            {layer.details.map((d, i) => (
              <div className="detail-box" key={i}>
                <h4>{d.title}</h4>
                <p>{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 0 }}>
        <div className="card-title"><span className="icon">⚖️</span> Weights, Biases & Activation — The Core Math</div>
        <div className="formula-card">
          <h4>🔢 What are Weights?</h4>
          <div className="formula-eq">output = w₁·x₁ + w₂·x₂ + w₃·x₃ + ... + wₙ·xₙ + b</div>
          <p>
            <strong>Weights (w)</strong> are the values the network <span style={{ color: "var(--accent4)" }}>learns during training</span>. Each connection between neurons has a weight. A high weight means "this input matters a LOT." A low weight means "this input is not important." The network adjusts weights using a process called <span style={{ color: "var(--accent)", fontWeight: 700 }}>backpropagation</span>.
          </p>
        </div>
        <div className="formula-card" style={{ borderLeftColor: "var(--accent2)" }}>
          <h4>⬛ What is Bias?</h4>
          <div className="formula-eq" style={{ color: "var(--accent2)" }}>output = (weights · inputs) + bias</div>
          <p>
            <strong>Bias (b)</strong> lets the neuron "shift" its output. Without bias, every neuron's output would be 0 when all inputs are 0. Bias lets the neuron fire even when inputs are small, giving the network more flexibility to fit any pattern.
          </p>
        </div>
        <div className="formula-card" style={{ borderLeftColor: "var(--accent4)" }}>
          <h4>⚡ What is Activation?</h4>
          <div className="formula-eq" style={{ color: "var(--accent4)" }}>
            ReLU(x) = max(0, x)<br />
            Sigmoid(x) = 1 / (1 + e^(−x))<br />
            Softmax(xᵢ) = e^(xᵢ) / Σ e^(xⱼ)
          </div>
          <p>
            <strong>Activation functions</strong> add non-linearity. Without them, stacking layers is mathematically equivalent to just one layer! They decide how "excited" a neuron should be, similar to how a real neuron fires only when stimulated enough.
          </p>
        </div>

        <div style={{ marginTop: 20 }}>
          <div className="card-title" style={{ marginBottom: 12 }}><span className="icon">🔁</span> How Training Works</div>
          <div className="info-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            {[
              { num: "1", title: "Forward Pass", color: "var(--accent)", body: "Image goes through all layers. Final layer outputs predictions." },
              { num: "2", title: "Loss Calculation", color: "var(--accent2)", body: "Compare prediction vs. correct answer. Compute how wrong we were (loss)." },
              { num: "3", title: "Backpropagation", color: "var(--accent3)", body: "Calculate how much each weight contributed to the error, going backwards." },
              { num: "4", title: "Weight Update", color: "var(--accent4)", body: "Adjust each weight slightly in the direction that reduces the error (gradient descent)." },
            ].map((item) => (
              <div className="info-box" key={item.num}>
                <div className="emoji" style={{ fontSize: 24, color: item.color, fontFamily: "Orbitron", fontWeight: 900 }}>{item.num}</div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
          <div className="math-box" style={{ marginTop: 16 }}>
            <span className="math-comment"># Gradient Descent weight update rule:</span><br />
            w_new = w_old - learning_rate × (∂Loss / ∂w)<br />
            <span className="math-comment"># Do this thousands of times = training the network!</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExampleSection() {
  const [drawing, setDrawing] = useState(false);
  const [grid, setGrid] = useState(Array(8).fill(null).map(() => Array(8).fill(0)));
  const [result, setResult] = useState(null);
  const [step, setStep] = useState("draw");

  const DIGIT_EXAMPLES = {
    "0": [[0,1,1,1,1,1,1,0],[1,1,0,0,0,0,1,1],[1,1,0,0,0,0,1,1],[1,1,0,0,0,0,1,1],[1,1,0,0,0,0,1,1],[1,1,0,0,0,0,1,1],[0,1,1,1,1,1,1,0],[0,0,0,0,0,0,0,0]],
    "1": [[0,0,0,1,1,0,0,0],[0,0,1,1,1,0,0,0],[0,0,0,1,1,0,0,0],[0,0,0,1,1,0,0,0],[0,0,0,1,1,0,0,0],[0,0,0,1,1,0,0,0],[0,1,1,1,1,1,1,0],[0,0,0,0,0,0,0,0]],
    "7": [[1,1,1,1,1,1,1,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,1,1,0],[0,0,0,0,1,1,0,0],[0,0,0,1,1,0,0,0],[0,0,0,1,1,0,0,0],[0,0,0,1,1,0,0,0],[0,0,0,0,0,0,0,0]],
  };

  const FAKE_RESULTS = {
    "0": { label: "0", probs: [0.91, 0.01, 0.01, 0.01, 0.01, 0.02, 0.01, 0.01, 0.01, 0.00] },
    "1": { label: "1", probs: [0.02, 0.89, 0.02, 0.01, 0.01, 0.02, 0.01, 0.01, 0.01, 0.00] },
    "7": { label: "7", probs: [0.01, 0.02, 0.01, 0.01, 0.01, 0.01, 0.01, 0.88, 0.02, 0.02] },
  };

  const handleCell = (r, c, val) => {
    setGrid((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = val !== undefined ? val : 1 - prev[r][c];
      return next;
    });
    setResult(null);
    setStep("draw");
  };

  const loadDigit = (digit) => {
    setGrid(DIGIT_EXAMPLES[digit].map((row) => [...row]));
    setResult(null);
    setStep("draw");
  };

  const classify = () => {
    setStep("process");
    setTimeout(() => {
      let best = "0";
      let maxEdges = -1;
      for (const [digit, ex] of Object.entries(DIGIT_EXAMPLES)) {
        let match = 0;
        for (let r = 0; r < 8; r++)
          for (let c = 0; c < 8; c++)
            if (grid[r][c] === ex[r][c]) match++;
        if (match > maxEdges) { maxEdges = match; best = digit; }
      }
      setResult(FAKE_RESULTS[best]);
      setStep("result");
    }, 1200);
  };

  const clearGrid = () => {
    setGrid(Array(8).fill(null).map(() => Array(8).fill(0)));
    setResult(null);
    setStep("draw");
  };

  return (
    <div className="slide-in">
      <div className="section-header">
        <div className="section-num">5</div>
        <div className="section-title">Live CNN Example — Draw a Digit!</div>
      </div>

      <div className="card">
        <div className="card-title"><span className="icon">✏️</span> Interactive Digit Classifier</div>
        <p style={{ marginBottom: 16 }}>
          This simulates what a <span style={{ color: "var(--accent)", fontWeight: 700 }}>MNIST digit classifier</span> does — one of the most famous CNN benchmarks! Draw a digit (0, 1, or 7) or load an example, then click <span style={{ color: "var(--accent2)", fontWeight: 700 }}>Classify!</span>
        </p>

        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
          <div>
            <div className="pixel-controls">
              <button className="btn btn-secondary" onClick={() => loadDigit("0")}>Load "0"</button>
              <button className="btn btn-secondary" onClick={() => loadDigit("1")}>Load "1"</button>
              <button className="btn btn-secondary" onClick={() => loadDigit("7")}>Load "7"</button>
              <button className="btn btn-secondary" onClick={clearGrid}>🗑️ Clear</button>
            </div>
            <div className="pixel-label" style={{ marginBottom: 8 }}>
              🖱️ Click pixels to toggle — draw any digit!
            </div>
            <div
              className="pixel-grid"
              style={{ gridTemplateColumns: "repeat(8,1fr)", cursor: "crosshair" }}
              onMouseLeave={() => setDrawing(false)}
            >
              {grid.map((row, r) =>
                row.map((val, c) => (
                  <div
                    key={`d${r}-${c}`}
                    className="pixel-cell"
                    style={{
                      width: 36,
                      height: 36,
                      backgroundColor: val ? "#e2e8f0" : "#0d1117",
                      color: val ? "#0d1117" : "transparent",
                      transition: "background-color 0.1s",
                    }}
                    onMouseDown={() => { setDrawing(true); handleCell(r, c); }}
                    onMouseEnter={() => { if (drawing) handleCell(r, c, 1); }}
                    onMouseUp={() => setDrawing(false)}
                  >
                    {val}
                  </div>
                ))
              )}
            </div>
            <button
              className="btn btn-orange"
              style={{ width: "100%", marginTop: 12, padding: "12px", fontSize: 15 }}
              onClick={classify}
            >
              {step === "process" ? "🔄 Processing..." : "⚡ Classify!"}
            </button>
          </div>

          <div style={{ flex: 1, minWidth: 260 }}>
            <div className="pixel-label" style={{ marginBottom: 8 }}>CNN Pipeline Visualization</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "📷 Input Layer", desc: "8×8 = 64 pixel values", active: step !== "draw" || true, color: "var(--accent)" },
                { label: "🔍 Conv Layer", desc: "Filter scans for edges & curves", active: step === "process" || step === "result", color: "var(--accent3)" },
                { label: "⚡ ReLU + Pool", desc: "Keep strong features, shrink map", active: step === "result", color: "var(--accent2)" },
                { label: "🔗 Dense + Softmax", desc: "Combine features → probabilities", active: step === "result", color: "var(--accent4)" },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px 16px",
                    borderRadius: 10,
                    border: `1px solid ${s.active ? s.color : "var(--border)"}`,
                    background: s.active ? `${s.color}15` : "var(--surface2)",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    transition: "all 0.4s",
                    opacity: s.active ? 1 : 0.4,
                  }}
                >
                  <div style={{ fontSize: 20 }}>{s.label.split(" ")[0]}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: s.active ? s.color : "var(--muted)" }}>
                      {s.label.slice(s.label.indexOf(" ") + 1)}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{s.desc}</div>
                  </div>
                  {s.active && step !== "draw" && <div style={{ marginLeft: "auto", color: s.color, fontSize: 16 }}>✓</div>}
                </div>
              ))}
            </div>

            {result && (
              <div style={{ marginTop: 16, animation: "fadeIn 0.4s ease" }}>
                <div className="pixel-label" style={{ marginBottom: 10 }}>Softmax Output — Class Probabilities</div>
                {result.probs.map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                    <div style={{ width: 20, textAlign: "right", fontSize: 12, fontFamily: "Share Tech Mono", color: i === parseInt(result.label) ? "var(--accent4)" : "var(--muted)" }}>
                      {i}:
                    </div>
                    <div style={{ flex: 1, background: "var(--surface2)", borderRadius: 4, height: 20, overflow: "hidden" }}>
                      <div style={{
                        width: `${p * 100}%`,
                        height: "100%",
                        background: i === parseInt(result.label)
                          ? "linear-gradient(90deg, var(--accent4), #22c55e)"
                          : "var(--border)",
                        transition: "width 0.6s ease",
                        borderRadius: 4,
                      }} />
                    </div>
                    <div style={{ width: 40, fontSize: 11, fontFamily: "Share Tech Mono", color: i === parseInt(result.label) ? "var(--accent4)" : "var(--muted)" }}>
                      {(p * 100).toFixed(0)}%
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 12, padding: 12, borderRadius: 10, background: "rgba(16,185,129,0.15)", border: "1px solid var(--accent4)", textAlign: "center" }}>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>PREDICTION</div>
                  <div style={{ fontSize: 36, fontFamily: "Orbitron", fontWeight: 900, color: "var(--accent4)" }}>{result.label}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{(result.probs[parseInt(result.label)] * 100).toFixed(0)}% confident</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizSection() {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = QUIZ_QUESTIONS[qIdx];

  const handleAnswer = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (qIdx + 1 >= QUIZ_QUESTIONS.length) {
      setDone(true);
    } else {
      setQIdx((prev) => prev + 1);
      setSelected(null);
    }
  };

  const reset = () => { setQIdx(0); setSelected(null); setScore(0); setDone(false); };

  return (
    <div className="slide-in">
      <div className="section-header">
        <div className="section-num">6</div>
        <div className="section-title">Knowledge Check — Quiz!</div>
      </div>

      {done ? (
        <div className="card" style={{ textAlign: "center", padding: "40px 28px" }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>
            {score === QUIZ_QUESTIONS.length ? "🏆" : score >= 2 ? "🎯" : "📚"}
          </div>
          <div style={{ fontFamily: "Orbitron", fontSize: 24, fontWeight: 900, color: "var(--accent)", marginBottom: 8 }}>
            {score}/{QUIZ_QUESTIONS.length} Correct!
          </div>
          <div style={{ color: "var(--muted)", marginBottom: 24, fontSize: 16 }}>
            {score === QUIZ_QUESTIONS.length
              ? "Perfect score! You're a CNN expert! 🚀"
              : score >= 2
              ? "Great job! Review the sections you missed and try again."
              : "Keep learning! Go back and review the sections, then retry."}
          </div>
          <div className="progress-bar-wrap" style={{ maxWidth: 300, margin: "0 auto 24px" }}>
            <div className="progress-bar" style={{ width: `${(score / QUIZ_QUESTIONS.length) * 100}%` }} />
          </div>
          <button className="btn btn-primary" onClick={reset} style={{ padding: "12px 32px", fontSize: 16 }}>
            🔄 Try Again
          </button>
        </div>
      ) : (
        <div className="quiz-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontFamily: "Share Tech Mono", fontSize: 12, color: "var(--muted)" }}>
              QUESTION {qIdx + 1} of {QUIZ_QUESTIONS.length}
            </div>
            <div style={{ fontFamily: "Share Tech Mono", fontSize: 12, color: "var(--accent4)" }}>
              Score: {score}/{qIdx}
            </div>
          </div>
          <div className="progress-bar-wrap" style={{ marginBottom: 20 }}>
            <div className="progress-bar" style={{ width: `${(qIdx / QUIZ_QUESTIONS.length) * 100}%` }} />
          </div>
          <div className="quiz-question">{q.q}</div>
          <div className="quiz-options">
            {q.options.map((opt, i) => (
              <button
                key={i}
                className={`quiz-option ${selected !== null ? (i === q.correct ? "correct" : i === selected ? "wrong" : "") : ""}`}
                onClick={() => handleAnswer(i)}
              >
                <span style={{ marginRight: 10, opacity: 0.5 }}>{["A", "B", "C", "D"][i]}.</span>
                {opt}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div className={`quiz-feedback ${selected === q.correct ? "correct" : "wrong"}`}>
              {selected === q.correct ? q.explanation : `❌ Not quite. The correct answer is: "${q.options[q.correct]}". ${q.explanation}`}
            </div>
          )}
          {selected !== null && (
            <button className="btn btn-primary" style={{ marginTop: 16, width: "100%" }} onClick={next}>
              {qIdx + 1 >= QUIZ_QUESTIONS.length ? "See Results 🏆" : "Next Question →"}
            </button>
          )}
        </div>
      )}

      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-title"><span className="icon">📖</span> Quick Reference Cheat Sheet</div>
        <div className="info-grid">
          {[
            { tag: "tag-blue", label: "CNN", desc: "Convolutional Neural Network — special neural net for images" },
            { tag: "tag-purple", label: "Kernel/Filter", desc: "Small weight matrix that slides over the image to detect patterns" },
            { tag: "tag-orange", label: "Feature Map", desc: "Output of a convolution — shows where a pattern was found" },
            { tag: "tag-green", label: "ReLU", desc: "max(0,x) — activation that removes negatives" },
            { tag: "tag-blue", label: "Pooling", desc: "Shrinks feature maps using max or average operations" },
            { tag: "tag-purple", label: "Weights", desc: "Learned numbers connecting neurons — the 'knowledge' of the network" },
            { tag: "tag-orange", label: "Bias", desc: "Extra offset added to neuron output for more flexibility" },
            { tag: "tag-green", label: "Softmax", desc: "Converts scores to probabilities (0–1) that sum to 1" },
            { tag: "tag-blue", label: "Backprop", desc: "Algorithm to compute gradients and update weights during training" },
            { tag: "tag-purple", label: "Epoch", desc: "One full pass through the entire training dataset" },
          ].map((item) => (
            <div key={item.label} className="info-box" style={{ textAlign: "left", padding: "14px 16px" }}>
              <span className={`tag ${item.tag}`} style={{ marginBottom: 8, display: "inline-block" }}>{item.label}</span>
              <p style={{ fontSize: 12, marginTop: 4 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========================
// MAIN APP
// ========================
function CNNTutorial() {
  const [activeSection, setActiveSection] = useState("what");

  const sectionComponents = {
    what: <WhatSection />,
    why: <WhySection />,
    how: <HowSection />,
    layers: <LayersSection />,
    example: <ExampleSection />,
    quiz: <QuizSection />,
  };

  return (
    <>
      <style>{styles}</style>
      <div className="cnn-app">
        <div className="grid-bg" />
        <div className="content">
          <div className="hero">
            <div className="hero-badge">⬡ DEEP LEARNING MODULE</div>
            <h1>Convolutional Neural Networks</h1>
            <p>
              The AI technology that taught machines to <em>see</em>. Interactive, step-by-step guide for curious minds. No experience required!
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <span className="tag tag-blue">📷 Computer Vision</span>
              <span className="tag tag-purple">🧠 Deep Learning</span>
              <span className="tag tag-orange">⚡ Interactive</span>
              <span className="tag tag-green">✅ Beginner Friendly</span>
            </div>
          </div>

          <div className="nav-tabs">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className={`nav-tab ${activeSection === s.id ? "active" : ""}`}
                onClick={() => setActiveSection(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>

          {sectionComponents[activeSection]}
        </div>
      </div>
    </>
  );
}



const CNNAndAudioAIGuide = () => {
  const [activeTab, setActiveTab] = useState('cnn');
  const [activeSection, setActiveSection] = useState(0);
  const [expandedCode, setExpandedCode] = useState({});

  const toggleCode = (id) => {
    setExpandedCode(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const cnnSections = [
    { id: 0, title: "CNN Fundamentals", icon: <Brain className="w-6 h-6" /> },
    { id: 1, title: "Architecture", icon: <Layers className="w-6 h-6" /> },
    { id: 2, title: "Convolution", icon: <Grid className="w-6 h-6" /> },
    { id: 3, title: "Pooling", icon: <Filter className="w-6 h-6" /> },
    { id: 4, title: "Training Pipeline", icon: <BookOpen className="w-6 h-6" /> }
  ];

  const audioSections = [
    { id: 0, title: "Audio Basics", icon: <Waves className="w-6 h-6" /> },
    { id: 1, title: "Speech Recognition", icon: <Mic className="w-6 h-6" /> },
    { id: 2, title: "Audio Generation", icon: <Music className="w-6 h-6" /> },
    { id: 3, title: "Audio Classification", icon: <Speaker className="w-6 h-6" /> },
    { id: 4, title: "Music Generation", icon: <Headphones className="w-6 h-6" /> }
  ];

  const sections = activeTab === 'cnn' ? cnnSections : audioSections;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Deep Learning: CNN & Audio AI Development
          </h1>
          <p className="text-gray-700 text-lg">
            Complete guide to Convolutional Neural Networks and AI-powered Audio Applications
          </p>
        </div>

        {/* Main Topic Tabs */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex gap-4">
            <button
              onClick={() => { setActiveTab('cnn'); setActiveSection(0); }}
              className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-semibold text-lg transition-all ${
                activeTab === 'cnn'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Brain className="w-6 h-6" />
              Convolutional Neural Networks
            </button>
            <button
              onClick={() => { setActiveTab('audio'); setActiveSection(0); }}
              className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-semibold text-lg transition-all ${
                activeTab === 'audio'
                  ? 'bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Music className="w-6 h-6" />
              Audio AI Development
            </button>
          </div>
        </div>

        {/* Sub-Navigation */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-3">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeSection === section.id
                    ? activeTab === 'cnn' 
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-pink-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {section.icon}
                <span className="font-medium">{section.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CNN CONTENT */}
        {activeTab === 'cnn' && (
          <>
            {/* CNN Section 0: Fundamentals */}
            {activeSection === 0 && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-indigo-900 mb-6">CNN Fundamentals</h2>
                  
                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-6 mb-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">What are CNNs?</h3>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      Convolutional Neural Networks (CNNs) are specialized deep learning architectures designed to process grid-like data, especially images. They automatically learn hierarchical patterns from raw pixels without manual feature engineering.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-3xl mb-2">🎯</div>
                        <h4 className="font-semibold text-gray-800 mb-2">Local Connectivity</h4>
                        <p className="text-sm text-gray-600">Neurons connect only to local regions, dramatically reducing parameters</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-3xl mb-2">🔄</div>
                        <h4 className="font-semibold text-gray-800 mb-2">Parameter Sharing</h4>
                        <p className="text-sm text-gray-600">Same filter applied across entire image, learning reusable features</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-3xl mb-2">📐</div>
                        <h4 className="font-semibold text-gray-800 mb-2">Translation Invariance</h4>
                        <p className="text-sm text-gray-600">Recognizes features regardless of position in image</p>
                      </div>
                    </div>
                  </div>

                  {/* Visual Architecture */}
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">CNN Pipeline Visualization</h3>
                    <div className="overflow-x-auto pb-4">
                      <div className="flex items-center gap-4 min-w-max">
                        <div className="text-center">
                          <div className="w-32 h-32 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center text-white font-bold mb-2">
                            INPUT<br/>28×28×3
                          </div>
                          <p className="text-sm">RGB Image</p>
                        </div>
                        <div className="text-2xl">→</div>
                        <div className="text-center">
                          <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold mb-2">
                            CONV<br/>26×26×32
                          </div>
                          <p className="text-sm">Features</p>
                        </div>
                        <div className="text-2xl">→</div>
                        <div className="text-center">
                          <div className="w-28 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold mb-2">
                            POOL<br/>13×13×32
                          </div>
                          <p className="text-sm">Reduced</p>
                        </div>
                        <div className="text-2xl">→</div>
                        <div className="text-center">
                          <div className="w-24 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white font-bold mb-2">
                            FC<br/>128
                          </div>
                          <p className="text-sm">Dense</p>
                        </div>
                        <div className="text-2xl">→</div>
                        <div className="text-center">
                          <div className="w-20 h-28 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center text-white font-bold mb-2">
                            OUT<br/>10
                          </div>
                          <p className="text-sm">Classes</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Applications */}
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Real-World Applications</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-3xl mb-2">🏥</div>
                        <h4 className="font-semibold mb-2">Medical Imaging</h4>
                        <p className="text-sm text-gray-600">Cancer detection, X-ray analysis, MRI interpretation</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-3xl mb-2">🚗</div>
                        <h4 className="font-semibold mb-2">Autonomous Driving</h4>
                        <p className="text-sm text-gray-600">Object detection, lane recognition, pedestrian tracking</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-3xl mb-2">👤</div>
                        <h4 className="font-semibold mb-2">Face Recognition</h4>
                        <p className="text-sm text-gray-600">Security systems, photo tagging, biometric authentication</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CNN Section 1: Architecture */}
            {activeSection === 1 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-indigo-900 mb-6">CNN Architecture Deep Dive</h2>
                
                <div className="bg-indigo-50 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Three Core Layer Types</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-blue-700 mb-2">🔵 Convolutional Layers</h4>
                      <p className="text-sm text-gray-700 mb-2">Apply learnable filters to extract features. Early layers detect edges/textures, deeper layers detect complex patterns.</p>
                      <div className="bg-blue-50 rounded p-3 text-xs font-mono">
                        Parameters = (kernel_h × kernel_w × input_channels × num_filters) + biases
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-purple-700 mb-2">🟣 Pooling Layers</h4>
                      <p className="text-sm text-gray-700 mb-2">Downsample feature maps, reducing dimensions while preserving important information.</p>
                      <div className="bg-purple-50 rounded p-3 text-xs font-mono">
                        No learnable parameters - pure downsampling operation
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-green-700 mb-2">🟢 Fully Connected Layers</h4>
                      <p className="text-sm text-gray-700 mb-2">Combine all learned features for final classification decision.</p>
                      <div className="bg-green-50 rounded p-3 text-xs font-mono">
                        Parameters = (input_neurons × output_neurons) + biases
                      </div>
                    </div>
                  </div>
                </div>

                {/* Code Example */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Complete CNN Architecture
                    </h3>
                    <button
                      onClick={() => toggleCode('cnn-arch')}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      {expandedCode['cnn-arch'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      {expandedCode['cnn-arch'] ? 'Hide' : 'Show'} Code
                    </button>
                  </div>
                  
                  {expandedCode['cnn-arch'] && (
                    <pre className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm">
{`import torch
import torch.nn as nn
import torch.nn.functional as F

class AdvancedCNN(nn.Module):
    """
    Advanced CNN for Image Classification
    Input: 224x224x3 RGB images
    Output: 1000 classes (ImageNet)
    """
    def __init__(self, num_classes=1000):
        super(AdvancedCNN, self).__init__()
        
        # Block 1: Initial feature extraction
        self.conv1 = nn.Conv2d(3, 64, kernel_size=3, padding=1)
        self.bn1 = nn.BatchNorm2d(64)
        self.conv2 = nn.Conv2d(64, 64, kernel_size=3, padding=1)
        self.bn2 = nn.BatchNorm2d(64)
        self.pool1 = nn.MaxPool2d(2, 2)  # 224 -> 112
        
        # Block 2: Intermediate features
        self.conv3 = nn.Conv2d(64, 128, kernel_size=3, padding=1)
        self.bn3 = nn.BatchNorm2d(128)
        self.conv4 = nn.Conv2d(128, 128, kernel_size=3, padding=1)
        self.bn4 = nn.BatchNorm2d(128)
        self.pool2 = nn.MaxPool2d(2, 2)  # 112 -> 56
        
        # Block 3: High-level features
        self.conv5 = nn.Conv2d(128, 256, kernel_size=3, padding=1)
        self.bn5 = nn.BatchNorm2d(256)
        self.conv6 = nn.Conv2d(256, 256, kernel_size=3, padding=1)
        self.bn6 = nn.BatchNorm2d(256)
        self.pool3 = nn.MaxPool2d(2, 2)  # 56 -> 28
        
        # Global Average Pooling
        self.global_pool = nn.AdaptiveAvgPool2d((1, 1))
        
        # Fully Connected Layers
        self.fc1 = nn.Linear(256, 512)
        self.dropout = nn.Dropout(0.5)
        self.fc2 = nn.Linear(512, num_classes)
    
    def forward(self, x):
        # Block 1
        x = F.relu(self.bn1(self.conv1(x)))
        x = F.relu(self.bn2(self.conv2(x)))
        x = self.pool1(x)
        
        # Block 2
        x = F.relu(self.bn3(self.conv3(x)))
        x = F.relu(self.bn4(self.conv4(x)))
        x = self.pool2(x)
        
        # Block 3
        x = F.relu(self.bn5(self.conv5(x)))
        x = F.relu(self.bn6(self.conv6(x)))
        x = self.pool3(x)
        
        # Global pooling and flatten
        x = self.global_pool(x)
        x = x.view(x.size(0), -1)
        
        # Classification
        x = F.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.fc2(x)
        
        return x

# Create model
model = AdvancedCNN(num_classes=10)
print(f"Total parameters: {sum(p.numel() for p in model.parameters()):,}")`}
                    </pre>
                  )}
                </div>
              </div>
            )}

            {/* CNN Section 2: Convolution */}
            {activeSection === 2 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-indigo-900 mb-6">Convolutional Operations</h2>
                
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">How Convolution Works</h3>
                  <div className="grid md:grid-cols-3 gap-6 mb-4">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-indigo-700 mb-3">Input (5×5)</h4>
                      <div className="grid grid-cols-5 gap-1">
                        {[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1].map((val, i) => (
                          <div key={i} className={`aspect-square flex items-center justify-center text-xs font-bold rounded ${val ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
                            {val}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-indigo-700 mb-3">Filter (3×3)</h4>
                      <div className="grid grid-cols-3 gap-1 mx-auto w-fit">
                        {[1,0,-1,1,0,-1,1,0,-1].map((val, i) => (
                          <div key={i} className={`w-12 h-12 flex items-center justify-center font-bold rounded ${val > 0 ? 'bg-green-500 text-white' : val < 0 ? 'bg-red-500 text-white' : 'bg-gray-300'}`}>
                            {val}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-center mt-2">Edge Detector</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-indigo-700 mb-3">Output (3×3)</h4>
                      <div className="grid grid-cols-3 gap-1 mx-auto w-fit">
                        {[0,0,0,0,0,0,0,0,0].map((val, i) => (
                          <div key={i} className="w-12 h-12 flex items-center justify-center font-bold rounded bg-yellow-400 text-gray-800">
                            {val}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Mathematical Operation</h4>
                    <p className="text-sm font-mono mb-2">
                      Output[i,j] = Σ Σ (Input[i+m, j+n] × Filter[m,n]) + bias
                    </p>
                    <p className="text-sm text-gray-600">Element-wise multiplication and summation across the receptive field</p>
                  </div>
                </div>

                {/* Hyperparameters */}
                <div className="bg-yellow-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Key Hyperparameters</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-700 mb-2">Kernel Size (3×3, 5×5, 7×7)</h4>
                      <p className="text-sm text-gray-600">Larger = more context, more parameters</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-700 mb-2">Stride (1, 2)</h4>
                      <p className="text-sm text-gray-600">Step size when sliding filter</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-700 mb-2">Padding (0, 1, 2)</h4>
                      <p className="text-sm text-gray-600">Zeros added to borders</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-700 mb-2">Filters (32, 64, 128...)</h4>
                      <p className="text-sm text-gray-600">Number of feature maps to learn</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CNN Sections 3 & 4 - Pooling and Training simplified for space */}
            {activeSection === 3 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-indigo-900 mb-6">Pooling Operations</h2>
                <div className="bg-purple-50 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-purple-700 mb-3">Max Pooling</h4>
                      <p className="text-sm mb-3">Takes maximum value from each region</p>
                      <div className="bg-purple-100 rounded p-3 text-sm">
                        Input: 4×4 → Output: 2×2<br/>
                        Reduces size by 75%
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-pink-700 mb-3">Average Pooling</h4>
                      <p className="text-sm mb-3">Computes average of each region</p>
                      <div className="bg-pink-100 rounded p-3 text-sm">
                        Smoother downsampling<br/>
                        Often used in final layers
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 4 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-indigo-900 mb-6">Training Pipeline</h2>
                <div className="space-y-3">
                  {['Data Preparation', 'Forward Pass', 'Loss Calculation', 'Backpropagation', 'Parameter Update'].map((step, i) => (
                    <div key={i} className="bg-indigo-50 rounded-lg p-4 flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">{i+1}</div>
                      <span className="font-semibold">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* AUDIO AI CONTENT */}
        {activeTab === 'audio' && (
          <>
            {/* Audio Section 0: Basics */}
            {activeSection === 0 && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-pink-900 mb-6">Audio Processing with AI</h2>
                  
                  <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-6 mb-6">
                    <h3 className="text-2xl font-semibold mb-4">Understanding Audio Data</h3>
                    <p className="text-lg text-gray-700 mb-4">
                      Audio is a time-series signal that can be processed using various AI techniques. Modern AI models can generate, classify, and transform audio with remarkable quality.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-3xl mb-2">🎵</div>
                        <h4 className="font-semibold mb-2">Waveform</h4>
                        <p className="text-sm text-gray-600">Raw amplitude values over time (44.1kHz sampling rate)</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-3xl mb-2">📊</div>
                        <h4 className="font-semibold mb-2">Spectrogram</h4>
                        <p className="text-sm text-gray-600">Frequency content over time (visual representation)</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-3xl mb-2">🎹</div>
                        <h4 className="font-semibold mb-2">Mel-Spectrogram</h4>
                        <p className="text-sm text-gray-600">Perceptually-scaled frequency representation</p>
                      </div>
                    </div>
                  </div>

                  {/* Audio Representations */}
                  <div className="bg-blue-50 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-4">Audio Representations for AI</h3>
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-blue-700 mb-2">Time Domain (Waveform)</h4>
                        <div className="bg-blue-100 rounded p-3 mb-2">
                          <div className="flex items-end justify-around h-16">
                            {[...Array(40)].map((_, i) => (
                              <div key={i} className="w-1 bg-blue-600 rounded-t" style={{height: `${Math.sin(i/3) * 30 + 35}%`}}></div>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">Direct amplitude samples: [-1.0, 0.5, 0.2, ...]</p>
                      </div>

                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-purple-700 mb-2">Frequency Domain (Spectrogram)</h4>
                        <div className="bg-purple-100 rounded p-3 mb-2">
                          <div className="grid grid-cols-20 gap-px">
                            {[...Array(100)].map((_, i) => (
                              <div key={i} className={`h-3 ${['bg-purple-200', 'bg-purple-400', 'bg-purple-600', 'bg-purple-800'][Math.floor(Math.random() * 4)]}`}></div>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">2D: Time (x-axis) × Frequency (y-axis) × Intensity (color)</p>
                      </div>
                    </div>
                  </div>

                  {/* Code Example */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Code className="w-5 h-5" />
                        Audio Preprocessing
                      </h3>
                      <button
                        onClick={() => toggleCode('audio-prep')}
                        className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                      >
                        {expandedCode['audio-prep'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        {expandedCode['audio-prep'] ? 'Hide' : 'Show'} Code
                      </button>
                    </div>
                    
                    {expandedCode['audio-prep'] && (
                      <pre className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm">
{`import librosa
import numpy as np
import matplotlib.pyplot as plt

# Load audio file
audio_path = 'sample.wav'
waveform, sample_rate = librosa.load(audio_path, sr=22050)

print(f"Sample rate: {sample_rate} Hz")
print(f"Duration: {len(waveform)/sample_rate:.2f} seconds")
print(f"Waveform shape: {waveform.shape}")

# Compute Mel-Spectrogram
mel_spec = librosa.feature.melspectrogram(
    y=waveform,
    sr=sample_rate,
    n_mels=128,      # Number of mel bands
    fmax=8000        # Maximum frequency
)

# Convert to dB scale
mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)

print(f"Mel-spectrogram shape: {mel_spec_db.shape}")

# Extract features for ML
mfcc = librosa.feature.mfcc(y=waveform, sr=sample_rate, n_mfcc=13)
chroma = librosa.feature.chroma_stft(y=waveform, sr=sample_rate)
spectral_contrast = librosa.feature.spectral_contrast(y=waveform, sr=sample_rate)

print(f"\\nFeature shapes:")
print(f"MFCC: {mfcc.shape}")
print(f"Chroma: {chroma.shape}")
print(f"Spectral Contrast: {spectral_contrast.shape}")

# Visualize
fig, axes = plt.subplots(3, 1, figsize=(12, 8))

# Waveform
axes[0].plot(waveform)
axes[0].set_title('Waveform')
axes[0].set_xlabel('Sample')

# Mel-Spectrogram
librosa.display.specshow(mel_spec_db, sr=sample_rate, x_axis='time', 
                         y_axis='mel', ax=axes[1])
axes[1].set_title('Mel-Spectrogram')

# MFCC
librosa.display.specshow(mfcc, sr=sample_rate, x_axis='time', ax=axes[2])
axes[2].set_title('MFCC')

plt.tight_layout()
plt.savefig('audio_features.png')
print("\\nVisualization saved!")`}
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Audio Section 1: Speech Recognition */}
            {activeSection === 1 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-pink-900 mb-6">Speech Recognition with AI</h2>
                
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-6 mb-6">
                  <h3 className="text-2xl font-semibold mb-4">How Speech Recognition Works</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                        <h4 className="font-semibold text-lg">Audio Preprocessing</h4>
                      </div>
                      <p className="text-sm text-gray-600 ml-14">Convert raw audio to features (MFCC, Mel-spectrogram)</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                        <h4 className="font-semibold text-lg">Acoustic Model</h4>
                      </div>
                      <p className="text-sm text-gray-600 ml-14">Deep neural network (RNN/CNN/Transformer) maps audio to phonemes</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                        <h4 className="font-semibold text-lg">Language Model</h4>
                      </div>
                      <p className="text-sm text-gray-600 ml-14">Predicts likely word sequences from phonemes</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                        <h4 className="font-semibold text-lg">Decoding</h4>
                      </div>
                      <p className="text-sm text-gray-600 ml-14">Combine acoustic and language models to output text</p>
                    </div>
                  </div>
                </div>

                {/* Modern Approaches */}
                <div className="bg-purple-50 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Modern Speech Recognition Models</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-purple-700 mb-2">Whisper (OpenAI)</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Transformer-based architecture</li>
                        <li>• Multilingual (99 languages)</li>
                        <li>• Robust to noise and accents</li>
                        <li>• Can translate while transcribing</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-purple-700 mb-2">Wav2Vec 2.0 (Meta)</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Self-supervised learning</li>
                        <li>• Requires minimal labeled data</li>
                        <li>• State-of-the-art on benchmarks</li>
                        <li>• Transfer learning friendly</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Code Example */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Speech Recognition Implementation
                    </h3>
                    <button
                      onClick={() => toggleCode('speech-rec')}
                      className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                    >
                      {expandedCode['speech-rec'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      {expandedCode['speech-rec'] ? 'Hide' : 'Show'} Code
                    </button>
                  </div>
                  
                  {expandedCode['speech-rec'] && (
                    <pre className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm">
{`# Method 1: Using Whisper (OpenAI)
import whisper

# Load pre-trained model (tiny, base, small, medium, large)
model = whisper.load_model("base")

# Transcribe audio
result = model.transcribe("audio.mp3")

print("Transcription:", result["text"])
print("Language:", result["language"])

# Get detailed segments with timestamps
for segment in result["segments"]:
    print(f"[{segment['start']:.2f}s - {segment['end']:.2f}s]: {segment['text']}")

# With translation to English
result = model.transcribe("spanish_audio.mp3", task="translate")
print("Translation:", result["text"])

# ============================================
# Method 2: Using Wav2Vec 2.0 (Hugging Face)
from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor
import torch
import torchaudio

# Load pre-trained model and processor
processor = Wav2Vec2Processor.from_pretrained("facebook/wav2vec2-base-960h")
model = Wav2Vec2ForCTC.from_pretrained("facebook/wav2vec2-base-960h")

# Load audio
waveform, sample_rate = torchaudio.load("audio.wav")

# Resample if needed (Wav2Vec expects 16kHz)
if sample_rate != 16000:
    resampler = torchaudio.transforms.Resample(sample_rate, 16000)
    waveform = resampler(waveform)

# Preprocess
input_values = processor(waveform.squeeze(), sampling_rate=16000, 
                        return_tensors="pt").input_values

# Inference
with torch.no_grad():
    logits = model(input_values).logits

# Decode
predicted_ids = torch.argmax(logits, dim=-1)
transcription = processor.batch_decode(predicted_ids)[0]

print("Transcription:", transcription)

# ============================================
# Method 3: Real-time Speech Recognition
import speech_recognition as sr

# Initialize recognizer
recognizer = sr.Recognizer()

# From microphone
with sr.Microphone() as source:
    print("Adjusting for ambient noise... Please wait")
    recognizer.adjust_for_ambient_noise(source, duration=1)
    
    print("Listening...")
    audio = recognizer.listen(source)
    
    try:
        # Using Google Speech Recognition
        text = recognizer.recognize_google(audio)
        print(f"You said: {text}")
    except sr.UnknownValueError:
        print("Could not understand audio")
    except sr.RequestError as e:
        print(f"Error: {e}")

# From audio file
with sr.AudioFile("audio.wav") as source:
    audio = recognizer.record(source)
    text = recognizer.recognize_google(audio)
    print(f"Transcription: {text}")

# ============================================
# Method 4: Custom Model Training
import torch
import torch.nn as nn

class SpeechRecognitionCNN(nn.Module):
    def __init__(self, num_classes=29):  # 26 letters + space + apostrophe + blank
        super().__init__()
        
        # CNN layers for feature extraction
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(2)
        
        # Bidirectional LSTM for sequence modeling
        self.lstm = nn.LSTM(64 * 32, 128, num_layers=2, 
                           bidirectional=True, batch_first=True)
        
        # Output layer
        self.fc = nn.Linear(256, num_classes)
    
    def forward(self, x):
        # x: [batch, 1, freq_bins, time_steps]
        x = torch.relu(self.conv1(x))
        x = self.pool(x)
        x = torch.relu(self.conv2(x))
        x = self.pool(x)
        
        # Reshape for LSTM
        batch, channels, freq, time = x.size()
        x = x.permute(0, 3, 1, 2)  # [batch, time, channels, freq]
        x = x.reshape(batch, time, -1)  # [batch, time, features]
        
        # LSTM
        x, _ = self.lstm(x)
        
        # Output
        x = self.fc(x)
        
        return x

# Usage
model = SpeechRecognitionCNN()
print(f"Model parameters: {sum(p.numel() for p in model.parameters()):,}")`}
                    </pre>
                  )}
                </div>
              </div>
            )}

            {/* Audio Section 2: Audio Generation */}
            {activeSection === 2 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-pink-900 mb-6">AI Audio Generation</h2>
                
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 mb-6">
                  <h3 className="text-2xl font-semibold mb-4">Text-to-Speech (TTS) Models</h3>
                  <p className="text-lg text-gray-700 mb-4">
                    Modern TTS systems use deep learning to generate natural-sounding speech from text, with control over voice characteristics, emotion, and prosody.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-purple-700 mb-2">Tacotron 2</h4>
                      <p className="text-sm text-gray-600">Seq2seq model with attention mechanism for mel-spectrogram generation</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-pink-700 mb-2">FastSpeech 2</h4>
                      <p className="text-sm text-gray-600">Non-autoregressive, fast parallel generation with explicit duration modeling</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-red-700 mb-2">VITS</h4>
                      <p className="text-sm text-gray-600">End-to-end model generating waveforms directly from text</p>
                    </div>
                  </div>
                </div>

                {/* TTS Pipeline */}
                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">TTS Pipeline</h3>
                  <div className="flex items-center justify-around flex-wrap gap-4">
                    <div className="text-center">
                      <div className="w-32 h-24 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold mb-2">
                        TEXT
                      </div>
                      <p className="text-sm">"Hello world"</p>
                    </div>
                    <div className="text-2xl">→</div>
                    <div className="text-center">
                      <div className="w-32 h-24 bg-purple-500 text-white rounded-lg flex items-center justify-center font-bold mb-2">
                        PHONEMES
                      </div>
                      <p className="text-sm">/həˈloʊ wɜrld/</p>
                    </div>
                    <div className="text-2xl">→</div>
                    <div className="text-center">
                      <div className="w-32 h-24 bg-pink-500 text-white rounded-lg flex items-center justify-center font-bold mb-2">
                        MEL-SPEC
                      </div>
                      <p className="text-sm">Acoustic features</p>
                    </div>
                    <div className="text-2xl">→</div>
                    <div className="text-center">
                      <div className="w-32 h-24 bg-red-500 text-white rounded-lg flex items-center justify-center font-bold mb-2">
                        WAVEFORM
                      </div>
                      <p className="text-sm">Audio signal</p>
                    </div>
                  </div>
                </div>

                {/* Code Example */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Text-to-Speech Implementation
                    </h3>
                    <button
                      onClick={() => toggleCode('tts')}
                      className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                    >
                      {expandedCode['tts'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      {expandedCode['tts'] ? 'Hide' : 'Show'} Code
                    </button>
                  </div>
                  
                  {expandedCode['tts'] && (
                    <pre className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm">
{`# Method 1: Using gTTS (Google Text-to-Speech)
from gtts import gTTS
import os

text = "Hello! I am an AI-generated voice. This is amazing!"

# Create TTS object
tts = gTTS(text=text, lang='en', slow=False)

# Save audio
tts.save("output.mp3")
print("Audio saved as output.mp3")

# Play audio (requires playsound or similar)
os.system("afplay output.mp3")  # macOS
# os.system("start output.mp3")  # Windows

# ============================================
# Method 2: Using pyttsx3 (Offline TTS)
import pyttsx3

# Initialize TTS engine
engine = pyttsx3.init()

# Configure voice properties
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[0].id)  # Change voice
engine.setProperty('rate', 150)  # Speed (words per minute)
engine.setProperty('volume', 0.9)  # Volume (0.0 to 1.0)

# Generate speech
text = "This is offline text to speech synthesis."
engine.say(text)
engine.runAndWait()

# Save to file
engine.save_to_file(text, 'offline_speech.mp3')
engine.runAndWait()

# ============================================
# Method 3: Using Coqui TTS (Advanced)
from TTS.api import TTS

# List available models
print(TTS().list_models())

# Load model
tts = TTS(model_name="tts_models/en/ljspeech/tacotron2-DDC", 
          progress_bar=False, gpu=False)

# Generate speech
text = "Deep learning enables realistic speech synthesis."
tts.tts_to_file(text=text, file_path="output.wav")

# ============================================
# Method 4: Using Bark (Text-to-Audio with emotions)
from bark import SAMPLE_RATE, generate_audio, preload_models
from scipy.io.wavfile import write as write_wav

# Download and load models
preload_models()

# Generate audio with speaker and emotion
text_prompt = """
    [enthusiastic] Hello! [laughs] I'm so excited to meet you!
    [confused] Wait, what was I saying? [laughs]
"""

audio_array = generate_audio(text_prompt)

# Save
write_wav("bark_output.wav", SAMPLE_RATE, audio_array)
print("Emotional speech generated!")

# ============================================
# Method 5: Custom TTS Model (Tacotron 2)
import torch
import torch.nn as nn

class Tacotron2(nn.Module):
    """Simplified Tacotron 2 architecture"""
    def __init__(self, n_vocab=148, embedding_dim=512, 
                 encoder_dim=512, decoder_dim=1024, n_mel_channels=80):
        super().__init__()
        
        # Character embedding
        self.embedding = nn.Embedding(n_vocab, embedding_dim)
        
        # Encoder: 3 conv layers + bi-LSTM
        self.encoder_conv = nn.Sequential(
            nn.Conv1d(embedding_dim, encoder_dim, kernel_size=5, padding=2),
            nn.BatchNorm1d(encoder_dim),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Conv1d(encoder_dim, encoder_dim, kernel_size=5, padding=2),
            nn.BatchNorm1d(encoder_dim),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Conv1d(encoder_dim, encoder_dim, kernel_size=5, padding=2),
            nn.BatchNorm1d(encoder_dim),
            nn.ReLU(),
            nn.Dropout(0.5)
        )
        self.encoder_lstm = nn.LSTM(encoder_dim, encoder_dim // 2, 
                                    num_layers=1, bidirectional=True, 
                                    batch_first=True)
        
        # Attention mechanism
        self.attention = nn.MultiheadAttention(decoder_dim, num_heads=8)
        
        # Decoder: 2-layer LSTM
        self.decoder_lstm = nn.LSTM(encoder_dim + n_mel_channels, 
                                    decoder_dim, num_layers=2, 
                                    batch_first=True)
        
        # Mel-spectrogram projection
        self.mel_projection = nn.Linear(decoder_dim, n_mel_channels)
        
        # Stop token prediction
        self.stop_projection = nn.Linear(decoder_dim, 1)
    
    def forward(self, text_inputs, mel_inputs=None):
        # Encode text
        embedded = self.embedding(text_inputs)
        encoder_out = self.encoder_conv(embedded.transpose(1, 2))
        encoder_out, _ = self.encoder_lstm(encoder_out.transpose(1, 2))
        
        # Decode (simplified - actual implementation more complex)
        decoder_out, _ = self.decoder_lstm(encoder_out)
        
        # Generate mel-spectrogram
        mel_outputs = self.mel_projection(decoder_out)
        stop_tokens = self.stop_projection(decoder_out)
        
        return mel_outputs, stop_tokens

# Create model
model = Tacotron2()
print(f"Parameters: {sum(p.numel() for p in model.parameters()):,}")

# ============================================
# Vocoder: Convert Mel-Spectrogram to Waveform
# Using WaveGlow or HiFi-GAN

from scipy.io.wavfile import write

def mel_to_audio(mel_spectrogram, vocoder_model):
    """Convert mel-spectrogram to audio waveform"""
    with torch.no_grad():
        audio = vocoder_model(mel_spectrogram)
    return audio.squeeze().cpu().numpy()

# Example usage
# mel_spec = model(text_tensor)
# audio_waveform = mel_to_audio(mel_spec, vocoder)
# write("generated_speech.wav", 22050, audio_waveform)

print("\\nTTS implementation examples completed!")`}
                    </pre>
                  )}
                </div>
              </div>
            )}

            {/* Audio Section 3: Audio Classification */}
            {activeSection === 3 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-pink-900 mb-6">Audio Classification with Deep Learning</h2>
                
                <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-lg p-6 mb-6">
                  <h3 className="text-2xl font-semibold mb-4">Applications</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-green-700 mb-2">🎵 Music Genre Classification</h4>
                      <p className="text-sm text-gray-600">Categorize music into genres (rock, jazz, classical, etc.)</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-teal-700 mb-2">🔊 Environmental Sound Classification</h4>
                      <p className="text-sm text-gray-600">Identify sounds (dog bark, car horn, rain, etc.)</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-blue-700 mb-2">😊 Emotion Recognition</h4>
                      <p className="text-sm text-gray-600">Detect emotions from speech (happy, sad, angry, neutral)</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-purple-700 mb-2">🎤 Speaker Identification</h4>
                      <p className="text-sm text-gray-600">Recognize who is speaking from voice characteristics</p>
                    </div>
                  </div>
                </div>

                {/* Code Example */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Audio Classification Model
                    </h3>
                    <button
                      onClick={() => toggleCode('audio-class')}
                      className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                    >
                      {expandedCode['audio-class'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      {expandedCode['audio-class'] ? 'Hide' : 'Show'} Code
                    </button>
                  </div>
                  
                  {expandedCode['audio-class'] && (
                    <pre className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm">
{`import torch
import torch.nn as nn
import librosa
import numpy as np

class AudioClassificationCNN(nn.Module):
    """CNN for audio classification from mel-spectrograms"""
    def __init__(self, num_classes=10):
        super().__init__()
        
        # CNN layers for mel-spectrogram
        self.conv_layers = nn.Sequential(
            # Layer 1
            nn.Conv2d(1, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Dropout(0.25),
            
            # Layer 2
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Dropout(0.25),
            
            # Layer 3
            nn.Conv2d(128, 256, kernel_size=3, padding=1),
            nn.BatchNorm2d(256),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Dropout(0.25),
            
            # Layer 4
            nn.Conv2d(256, 512, kernel_size=3, padding=1),
            nn.BatchNorm2d(512),
            nn.ReLU(),
            nn.AdaptiveAvgPool2d((1, 1))
        )
        
        # Classification head
        self.classifier = nn.Sequential(
            nn.Linear(512, 256),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(256, num_classes)
        )
    
    def forward(self, x):
        # x: [batch, 1, mel_bins, time_steps]
        features = self.conv_layers(x)
        features = features.view(features.size(0), -1)
        output = self.classifier(features)
        return output

# Preprocessing function
def preprocess_audio(file_path, target_length=128):
    """Convert audio file to mel-spectrogram"""
    # Load audio
    y, sr = librosa.load(file_path, sr=22050, duration=3.0)
    
    # Compute mel-spectrogram
    mel_spec = librosa.feature.melspectrogram(
        y=y, sr=sr, n_mels=128, fmax=8000
    )
    
    # Convert to dB
    mel_spec_db = librosa.power_to_db(mel_spec, ref=np.max)
    
    # Normalize
    mel_spec_db = (mel_spec_db - mel_spec_db.mean()) / mel_spec_db.std()
    
    # Pad or truncate to fixed length
    if mel_spec_db.shape[1] < target_length:
        pad_width = target_length - mel_spec_db.shape[1]
        mel_spec_db = np.pad(mel_spec_db, ((0, 0), (0, pad_width)))
    else:
        mel_spec_db = mel_spec_db[:, :target_length]
    
    return mel_spec_db

# Training example
def train_audio_classifier():
    # Initialize model
    model = AudioClassificationCNN(num_classes=10)
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
    
    # Training loop (simplified)
    model.train()
    for epoch in range(50):
        # Load batch of audio files and labels
        # spectrograms = [preprocess_audio(f) for f in audio_files]
        # batch = torch.tensor(spectrograms).unsqueeze(1)
        
        # Forward pass
        # outputs = model(batch)
        # loss = criterion(outputs, labels)
        
        # Backward pass
        # optimizer.zero_grad()
        # loss.backward()
        # optimizer.step()
        
        pass  # Placeholder
    
    return model

# Inference
def classify_audio(model, audio_path):
    """Classify a single audio file"""
    model.eval()
    
    # Preprocess
    mel_spec = preprocess_audio(audio_path)
    mel_spec_tensor = torch.tensor(mel_spec).unsqueeze(0).unsqueeze(0).float()
    
    # Predict
    with torch.no_grad():
        output = model(mel_spec_tensor)
        probabilities = torch.softmax(output, dim=1)
        predicted_class = torch.argmax(probabilities, dim=1).item()
    
    return predicted_class, probabilities

# Usage
model = AudioClassificationCNN(num_classes=10)
print(f"Model parameters: {sum(p.numel() for p in model.parameters()):,}")`}
                    </pre>
                  )}
                </div>
              </div>
            )}

            {/* Audio Section 4: Music Generation */}
            {activeSection === 4 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-pink-900 mb-6">AI Music Generation</h2>
                
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 mb-6">
                  <h3 className="text-2xl font-semibold mb-4">Modern Music Generation Models</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-purple-700 mb-2">🎹 MusicGen (Meta)</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Text-to-music generation</li>
                        <li>• Melody conditioning</li>
                        <li>• Multi-track composition</li>
                        <li>• Controllable duration & style</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-pink-700 mb-2">🎵 Jukebox (OpenAI)</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Raw audio generation</li>
                        <li>• Artist & genre control</li>
                        <li>• Lyrics conditioning</li>
                        <li>• Long-form coherence</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-red-700 mb-2">🎼 AudioCraft</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Unified framework</li>
                        <li>• Sound effects generation</li>
                        <li>• Music generation</li>
                        <li>• Audio compression</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-orange-700 mb-2">🎸 Magenta</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• RNN-based music</li>
                        <li>• Continue melodies</li>
                        <li>• Drum generation</li>
                        <li>• Style transfer</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Code Example */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Music Generation Implementation
                    </h3>
                    <button
                      onClick={() => toggleCode('music-gen')}
                      className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                    >
                      {expandedCode['music-gen'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      {expandedCode['music-gen'] ? 'Hide' : 'Show'} Code
                    </button>
                  </div>
                  
                  {expandedCode['music-gen'] && (
                    <pre className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm">
{`# Method 1: Using MusicGen (Meta)
from audiocraft.models import MusicGen
from audiocraft.data.audio import audio_write

# Load model (small, medium, large)
model = MusicGen.get_pretrained('facebook/musicgen-small')

# Set generation parameters
model.set_generation_params(
    duration=10,  # seconds
    temperature=1.0,
    top_k=250,
    top_p=0.0
)

# Generate from text description
descriptions = [
    "upbeat electronic dance music with heavy bass",
    "calm piano melody with strings, emotional",
    "rock guitar solo with drums, energetic"
]

wav = model.generate(descriptions)  # generates 3 samples

# Save audio files
for idx, one_wav in enumerate(wav):
    audio_write(f'generated_{idx}', one_wav.cpu(), model.sample_rate, 
                strategy="loudness", loudness_compressor=True)

print("Music generated and saved!")

# Generate with melody conditioning
import torchaudio

melody, sr = torchaudio.load("melody.wav")
# Generate music that follows this melody
wav = model.generate_with_chroma(descriptions, melody[None], sr)

# ============================================
# Method 2: Using Magenta (Google)
import magenta
from magenta.models.melody_rnn import melody_rnn_sequence_generator
from magenta.models.drums_rnn import drums_rnn_sequence_generator
import note_seq

# Initialize melody generator
bundle = melody_rnn_sequence_generator.get_bundle_details('basic_rnn')
generator_map = melody_rnn_sequence_generator.get_generator_map()
melody_generator = generator_map['basic_rnn'](checkpoint=None, bundle=bundle)
melody_generator.initialize()

# Generate melody
input_sequence = note_seq.NoteSequence()
input_sequence.tempos.add().qpm = 120

# Add a few seed notes
note_seq.sequence_proto_to_midi_file(input_sequence, 'seed.mid')

# Generate continuation
generate_request = generator_pb2.GeneratorOptions()
generate_request.args['temperature'].float_value = 1.0
generate_request.generate_sections.add(
    start_time=0,
    end_time=32
)

generated_sequence = melody_generator.generate(input_sequence, generate_request)

# Save as MIDI
note_seq.sequence_proto_to_midi_file(generated_sequence, 'generated_melody.mid')

# ============================================
# Method 3: Simple LSTM Music Generator
import torch
import torch.nn as nn

class MusicLSTM(nn.Module):
    """Simple LSTM for melody generation"""
    def __init__(self, vocab_size=128, embedding_dim=256, hidden_dim=512):
        super().__init__()
        
        self.embedding = nn.Embedding(vocab_size, embedding_dim)
        self.lstm = nn.LSTM(embedding_dim, hidden_dim, num_layers=2, 
                           batch_first=True, dropout=0.3)
        self.fc = nn.Linear(hidden_dim, vocab_size)
    
    def forward(self, x, hidden=None):
        embedded = self.embedding(x)
        output, hidden = self.lstm(embedded, hidden)
        output = self.fc(output)
        return output, hidden

# Generate music
def generate_music(model, seed_sequence, length=100, temperature=1.0):
    """Generate music from seed sequence"""
    model.eval()
    
    current_seq = seed_sequence.clone()
    generated = []
    hidden = None
    
    with torch.no_grad():
        for _ in range(length):
            output, hidden = model(current_seq, hidden)
            
            # Sample from distribution
            probs = torch.softmax(output[:, -1, :] / temperature, dim=-1)
            next_note = torch.multinomial(probs, 1)
            
            generated.append(next_note.item())
            current_seq = next_note.unsqueeze(0)
    
    return generated

# Create model
model = MusicLSTM(vocab_size=128)
seed = torch.tensor([[60, 62, 64]])  # C, D, E notes
melody = generate_music(model, seed, length=50)

print(f"Generated melody: {melody}")

# ============================================
# Method 4: WaveNet-style Audio Generation
class WaveNetBlock(nn.Module):
    """Single WaveNet residual block"""
    def __init__(self, residual_channels, dilation):
        super().__init__()
        
        self.dilated_conv = nn.Conv1d(
            residual_channels, residual_channels * 2,
            kernel_size=2, dilation=dilation, padding=dilation
        )
        self.residual_proj = nn.Conv1d(residual_channels, residual_channels, 1)
        self.skip_proj = nn.Conv1d(residual_channels, residual_channels, 1)
    
    def forward(self, x):
        # Dilated convolution
        conv_out = self.dilated_conv(x)
        
        # Gated activation
        tanh_out = torch.tanh(conv_out[:, :conv_out.size(1)//2, :])
        sigmoid_out = torch.sigmoid(conv_out[:, conv_out.size(1)//2:, :])
        gated = tanh_out * sigmoid_out
        
        # Residual and skip connections
        residual = self.residual_proj(gated) + x
        skip = self.skip_proj(gated)
        
        return residual, skip

class WaveNet(nn.Module):
    """WaveNet for audio generation"""
    def __init__(self, num_blocks=4, num_layers=10, residual_channels=64):
        super().__init__()
        
        # Initial causal convolution
        self.causal_conv = nn.Conv1d(1, residual_channels, kernel_size=2, padding=1)
        
        # Residual blocks with increasing dilation
        self.blocks = nn.ModuleList()
        for b in range(num_blocks):
            for i in range(num_layers):
                dilation = 2 ** i
                self.blocks.append(WaveNetBlock(residual_channels, dilation))
        
        # Output layers
        self.output_conv = nn.Sequential(
            nn.ReLU(),
            nn.Conv1d(residual_channels, residual_channels, 1),
            nn.ReLU(),
            nn.Conv1d(residual_channels, 256, 1)  # 256 for 8-bit audio
        )
    
    def forward(self, x):
        x = self.causal_conv(x)
        
        skip_connections = []
        for block in self.blocks:
            x, skip = block(x)
            skip_connections.append(skip)
        
        # Sum skip connections
        skip_sum = sum(skip_connections)
        output = self.output_conv(skip_sum)
        
        return output

# Create WaveNet model
wavenet = WaveNet()
print(f"WaveNet parameters: {sum(p.numel() for p in wavenet.parameters()):,}")

print("\\nMusic generation examples completed!")`}
                    </pre>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8 text-center">
          <p className="text-gray-600 font-semibold">
            🎓 Complete Deep Learning Guide: CNN & Audio AI
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Switch between CNN and Audio AI tabs above • Click sections to explore in detail
          </p>
          <div className="mt-4 flex justify-center gap-4 text-xs text-gray-500">
            <span>Built with React & Tailwind CSS</span>
            <span>•</span>
            <span>PyTorch Code Examples</span>
            <span>•</span>
            <span>Production-Ready Models</span>
          </div>
        </div>
      </div>
    </div>
  );
};



const CNNBasicsInteractive = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [expandedCode, setExpandedCode] = useState({});
  const [activeExample, setActiveExample] = useState(0);

  const toggleCode = (id) => {
    setExpandedCode(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const sections = [
    {
      id: 0,
      title: "What is a CNN?",
      icon: <Brain className="w-6 h-6" />,
      content: "Convolutional Neural Networks (CNNs) are specialized deep learning models designed for processing grid-like data, particularly images. They automatically learn hierarchical patterns from raw pixel data."
    },
    {
      id: 1,
      title: "CNN Architecture",
      icon: <Layers className="w-6 h-6" />,
      content: "CNNs consist of multiple layers: Convolutional layers, Pooling layers, and Fully Connected layers."
    },
    {
      id: 2,
      title: "Convolutional Layer",
      icon: <Grid className="w-6 h-6" />,
      content: "The core building block that applies filters/kernels to extract features like edges, textures, and patterns."
    },
    {
      id: 3,
      title: "Pooling Layer",
      icon: <Filter className="w-6 h-6" />,
      content: "Reduces spatial dimensions while retaining important features, providing translation invariance."
    },
    {
      id: 4,
      title: "Fully Connected Layer",
      icon: <BookOpen className="w-6 h-6" />,
      content: "Combines features for final classification, connecting every neuron to all activations from the previous layer."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-4">
            Convolutional Neural Networks (CNN) - Interactive Guide
          </h1>
          <p className="text-gray-700 text-lg">
            Learn CNN fundamentals through interactive visualizations, code examples, and real-world applications
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeSection === section.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {section.icon}
                <span className="font-medium">{section.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section 0: Introduction */}
        {activeSection === 0 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-indigo-900 mb-4">What is a CNN?</h2>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Convolutional Neural Networks are inspired by the visual cortex of animals. They excel at recognizing patterns in images, videos, and other grid-structured data. Unlike traditional neural networks, CNNs preserve spatial relationships in data.
              </p>

              {/* Visual Representation */}
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">CNN vs Traditional Neural Network</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-700 mb-2">Traditional NN</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-full h-8 bg-red-200 rounded flex items-center justify-center text-sm">
                          Flatten Image (28×28 → 784)
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-full h-8 bg-yellow-200 rounded flex items-center justify-center text-sm">
                          Dense Layer (784 → 128)
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-full h-8 bg-green-200 rounded flex items-center justify-center text-sm">
                          Output (10 classes)
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">❌ Loses spatial information</p>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-700 mb-2">CNN</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-full h-8 bg-blue-200 rounded flex items-center justify-center text-sm">
                          Conv Layer (28×28×1 → 26×26×32)
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-full h-8 bg-purple-200 rounded flex items-center justify-center text-sm">
                          Pool Layer (26×26×32 → 13×13×32)
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-full h-8 bg-green-200 rounded flex items-center justify-center text-sm">
                          Output (10 classes)
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">✅ Preserves spatial structure</p>
                  </div>
                </div>
              </div>

              {/* Key Advantages */}
              <div className="bg-indigo-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Advantages of CNNs</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-700 mb-2">🎯 Local Connectivity</h4>
                    <p className="text-gray-600 text-sm">Neurons connect only to local regions, reducing parameters significantly</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-700 mb-2">🔄 Parameter Sharing</h4>
                    <p className="text-gray-600 text-sm">Same filter applied across entire image, learning reusable features</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-700 mb-2">📐 Translation Invariance</h4>
                    <p className="text-gray-600 text-sm">Recognizes features regardless of their position in the image</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-700 mb-2">🏗️ Hierarchical Learning</h4>
                    <p className="text-gray-600 text-sm">Learns simple features first, then combines them into complex patterns</p>
                  </div>
                </div>
              </div>

              {/* Real-World Applications */}
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Real-World Applications</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">🏥</div>
                    <h4 className="font-semibold text-gray-800 mb-1">Medical Imaging</h4>
                    <p className="text-sm text-gray-600">Tumor detection, X-ray analysis, disease diagnosis</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">🚗</div>
                    <h4 className="font-semibold text-gray-800 mb-1">Autonomous Vehicles</h4>
                    <p className="text-sm text-gray-600">Object detection, lane recognition, traffic sign classification</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">👤</div>
                    <h4 className="font-semibold text-gray-800 mb-1">Face Recognition</h4>
                    <p className="text-sm text-gray-600">Security systems, photo tagging, identity verification</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 1: Architecture */}
        {activeSection === 1 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-indigo-900 mb-4">CNN Architecture Overview</h2>
              
              {/* Architecture Visualization */}
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-6 mb-6 overflow-x-auto">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Typical CNN Pipeline</h3>
                <div className="flex items-center gap-4 min-w-max pb-4">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center text-white font-bold mb-2">
                      INPUT<br/>IMAGE<br/>28×28×3
                    </div>
                    <p className="text-sm text-gray-700">RGB Image</p>
                  </div>
                  
                  <div className="text-2xl text-indigo-600">→</div>
                  
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold mb-2">
                      CONV<br/>26×26×32
                    </div>
                    <p className="text-sm text-gray-700">Feature Maps</p>
                  </div>
                  
                  <div className="text-2xl text-indigo-600">→</div>
                  
                  <div className="text-center">
                    <div className="w-32 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold mb-2">
                      POOL<br/>13×13×32
                    </div>
                    <p className="text-sm text-gray-700">Downsampled</p>
                  </div>
                  
                  <div className="text-2xl text-indigo-600">→</div>
                  
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold mb-2">
                      CONV<br/>11×11×64
                    </div>
                    <p className="text-sm text-gray-700">More Features</p>
                  </div>
                  
                  <div className="text-2xl text-indigo-600">→</div>
                  
                  <div className="text-center">
                    <div className="w-32 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold mb-2">
                      POOL<br/>5×5×64
                    </div>
                    <p className="text-sm text-gray-700">Smaller</p>
                  </div>
                  
                  <div className="text-2xl text-indigo-600">→</div>
                  
                  <div className="text-center">
                    <div className="w-24 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white font-bold mb-2">
                      FC<br/>128
                    </div>
                    <p className="text-sm text-gray-700">Dense</p>
                  </div>
                  
                  <div className="text-2xl text-indigo-600">→</div>
                  
                  <div className="text-center">
                    <div className="w-20 h-32 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center text-white font-bold mb-2">
                      OUT<br/>10
                    </div>
                    <p className="text-sm text-gray-700">Classes</p>
                  </div>
                </div>
              </div>

              {/* Layer Details */}
              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">🔵 Convolutional Layers</h3>
                  <p className="text-gray-700 mb-3">Extract features using learnable filters. Early layers detect simple features (edges, colors), deeper layers detect complex patterns (shapes, objects).</p>
                  <div className="bg-white rounded p-4">
                    <p className="text-sm font-mono text-gray-800">Parameters: (filter_height × filter_width × input_channels × num_filters) + num_filters</p>
                    <p className="text-sm text-gray-600 mt-2">Example: 3×3 filter, 3 input channels, 32 filters = (3×3×3×32) + 32 = 896 parameters</p>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-purple-900 mb-3">🟣 Pooling Layers</h3>
                  <p className="text-gray-700 mb-3">Reduce spatial dimensions while preserving important information. Common types: Max Pooling (takes maximum value), Average Pooling (takes average).</p>
                  <div className="bg-white rounded p-4">
                    <p className="text-sm font-mono text-gray-800">No learnable parameters - just downsampling operation</p>
                    <p className="text-sm text-gray-600 mt-2">Example: 2×2 max pool reduces 28×28 to 14×14</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-900 mb-3">🟢 Fully Connected Layers</h3>
                  <p className="text-gray-700 mb-3">Connect all features for final classification. Each neuron connected to all activations from previous layer.</p>
                  <div className="bg-white rounded p-4">
                    <p className="text-sm font-mono text-gray-800">Parameters: (input_size × output_size) + output_size</p>
                    <p className="text-sm text-gray-600 mt-2">Example: 1600 inputs to 128 outputs = (1600×128) + 128 = 204,928 parameters</p>
                  </div>
                </div>
              </div>

              {/* Code Example */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    PyTorch CNN Architecture
                  </h3>
                  <button
                    onClick={() => toggleCode('arch')}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {expandedCode['arch'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    {expandedCode['arch'] ? 'Hide Code' : 'Show Code'}
                  </button>
                </div>
                
                {expandedCode['arch'] && (
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm">
{`import torch
import torch.nn as nn
import torch.nn.functional as F

class SimpleCNN(nn.Module):
    def __init__(self):
        super(SimpleCNN, self).__init__()
        
        # Convolutional Layer 1: 1 input channel, 32 output channels, 3x3 kernel
        self.conv1 = nn.Conv2d(in_channels=1, out_channels=32, kernel_size=3)
        
        # Convolutional Layer 2: 32 input channels, 64 output channels, 3x3 kernel
        self.conv2 = nn.Conv2d(in_channels=32, out_channels=64, kernel_size=3)
        
        # Max Pooling Layer: 2x2 window
        self.pool = nn.MaxPool2d(kernel_size=2, stride=2)
        
        # Fully Connected Layers
        self.fc1 = nn.Linear(64 * 5 * 5, 128)  # 5x5 from image dimension
        self.fc2 = nn.Linear(128, 10)  # 10 output classes
        
        # Dropout for regularization
        self.dropout = nn.Dropout(0.25)
    
    def forward(self, x):
        # Input: [batch_size, 1, 28, 28]
        
        # Conv1 + ReLU + Pool
        x = self.pool(F.relu(self.conv1(x)))  # [batch_size, 32, 13, 13]
        
        # Conv2 + ReLU + Pool
        x = self.pool(F.relu(self.conv2(x)))  # [batch_size, 64, 5, 5]
        
        # Flatten for fully connected layers
        x = x.view(-1, 64 * 5 * 5)  # [batch_size, 1600]
        
        # FC1 + ReLU + Dropout
        x = self.dropout(F.relu(self.fc1(x)))  # [batch_size, 128]
        
        # FC2 (output layer)
        x = self.fc2(x)  # [batch_size, 10]
        
        return x

# Create model instance
model = SimpleCNN()
print(model)

# Count parameters
total_params = sum(p.numel() for p in model.parameters())
print(f"\\nTotal parameters: {total_params:,}")`}
                  </pre>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Convolutional Layer */}
        {activeSection === 2 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-indigo-900 mb-4">Convolutional Layer Deep Dive</h2>
              
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                The convolutional layer is the core building block of CNNs. It applies learnable filters (kernels) to the input, performing element-wise multiplication and summation to produce feature maps.
              </p>

              {/* Convolution Operation Visualization */}
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">How Convolution Works</h3>
                
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  {/* Input */}
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-700 mb-3">1️⃣ Input Image (5×5)</h4>
                    <div className="grid grid-cols-5 gap-1">
                      {[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1].map((val, i) => (
                        <div key={i} className={`aspect-square flex items-center justify-center text-xs font-semibold rounded ${val ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                          {val}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Filter */}
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-700 mb-3">2️⃣ Filter/Kernel (3×3)</h4>
                    <div className="grid grid-cols-3 gap-1 mx-auto" style={{width: 'fit-content'}}>
                      {[1,0,-1,1,0,-1,1,0,-1].map((val, i) => (
                        <div key={i} className={`w-12 h-12 flex items-center justify-center text-sm font-semibold rounded ${val > 0 ? 'bg-green-500 text-white' : val < 0 ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'}`}>
                          {val}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Vertical Edge Detector</p>
                  </div>

                  {/* Output */}
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-700 mb-3">3️⃣ Feature Map (3×3)</h4>
                    <div className="grid grid-cols-3 gap-1 mx-auto" style={{width: 'fit-content'}}>
                      {[2,-1,2,-1,0,-1,2,-1,2].map((val, i) => (
                        <div key={i} className={`w-12 h-12 flex items-center justify-center text-sm font-semibold rounded ${Math.abs(val) > 1 ? 'bg-yellow-500 text-white' : 'bg-yellow-200 text-gray-800'}`}>
                          {val}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Detected Features</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Calculation Example (Top-Left Position)</h4>
                  <p className="text-sm font-mono text-gray-700 mb-2">
                    (1×1) + (0×0) + (1×-1) + (0×1) + (1×0) + (0×-1) + (1×1) + (0×0) + (1×-1) = 1 + 0 - 1 + 0 + 0 + 0 + 1 + 0 - 1 = 0
                  </p>
                  <p className="text-sm text-gray-600">The filter slides across the image, computing this operation at each position.</p>
                </div>
              </div>

              {/* Key Hyperparameters */}
              <div className="bg-indigo-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Hyperparameters</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-700 mb-2">Kernel Size</h4>
                    <p className="text-sm text-gray-600 mb-2">Dimensions of the filter (e.g., 3×3, 5×5, 7×7)</p>
                    <p className="text-xs text-gray-500">Larger kernels = more context but more parameters</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-700 mb-2">Stride</h4>
                    <p className="text-sm text-gray-600 mb-2">Step size when sliding the filter (typically 1 or 2)</p>
                    <p className="text-xs text-gray-500">Larger stride = smaller output, faster computation</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-700 mb-2">Padding</h4>
                    <p className="text-sm text-gray-600 mb-2">Adding zeros around input border (SAME or VALID)</p>
                    <p className="text-xs text-gray-500">Preserves spatial dimensions, prevents information loss</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-700 mb-2">Number of Filters</h4>
                    <p className="text-sm text-gray-600 mb-2">How many different features to detect (e.g., 32, 64, 128)</p>
                    <p className="text-xs text-gray-500">More filters = more features learned but more computation</p>
                  </div>
                </div>
              </div>

              {/* Output Size Formula */}
              <div className="bg-yellow-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Output Dimension Formula</h3>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-lg font-mono text-center text-gray-800 mb-4">
                    Output Size = ⌊(Input Size - Kernel Size + 2×Padding) / Stride⌋ + 1
                  </p>
                  <div className="space-y-3">
                    <div className="bg-blue-50 rounded p-3">
                      <p className="text-sm font-semibold text-gray-800">Example 1: No Padding</p>
                      <p className="text-sm text-gray-600">Input: 28×28, Kernel: 3×3, Stride: 1, Padding: 0</p>
                      <p className="text-sm font-mono text-indigo-600">Output: ⌊(28-3+0)/1⌋+1 = 26×26</p>
                    </div>
                    <div className="bg-green-50 rounded p-3">
                      <p className="text-sm font-semibold text-gray-800">Example 2: With Padding</p>
                      <p className="text-sm text-gray-600">Input: 28×28, Kernel: 3×3, Stride: 1, Padding: 1</p>
                      <p className="text-sm font-mono text-green-600">Output: ⌊(28-3+2)/1⌋+1 = 28×28 (same size!)</p>
                    </div>
                    <div className="bg-purple-50 rounded p-3">
                      <p className="text-sm font-semibold text-gray-800">Example 3: Larger Stride</p>
                      <p className="text-sm text-gray-600">Input: 28×28, Kernel: 3×3, Stride: 2, Padding: 0</p>
                      <p className="text-sm font-mono text-purple-600">Output: ⌊(28-3+0)/2⌋+1 = 13×13</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Code Example */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Convolutional Layer Implementation
                  </h3>
                  <button
                    onClick={() => toggleCode('conv')}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {expandedCode['conv'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    {expandedCode['conv'] ? 'Hide Code' : 'Show Code'}
                  </button>
                </div>
                
                {expandedCode['conv'] && (
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm">
{`import torch
import torch.nn as nn
import numpy as np

# Define a convolutional layer
conv_layer = nn.Conv2d(
    in_channels=3,      # RGB image
    out_channels=16,    # 16 different filters
    kernel_size=3,      # 3x3 filter
    stride=1,           # Move 1 pixel at a time
    padding=1           # Add 1 pixel of padding (keeps size same)
)

# Create random input image: batch_size=1, channels=3, height=32, width=32
input_image = torch.randn(1, 3, 32, 32)

# Apply convolution
output = conv_layer(input_image)

print(f"Input shape: {input_image.shape}")   # [1, 3, 32, 32]
print(f"Output shape: {output.shape}")       # [1, 16, 32, 32]

# Access the learned filters
filters = conv_layer.weight.data
print(f"\\nFilter shape: {filters.shape}")    # [16, 3, 3, 3]
print(f"Number of parameters: {conv_layer.weight.numel() + conv_layer.bias.numel()}")

# Manual convolution example (simplified 2D)
def manual_conv2d(input_2d, kernel_2d):
    """
    Simple 2D convolution without padding
    input_2d: 2D numpy array
    kernel_2d: 2D numpy array (filter)
    """
    input_h, input_w = input_2d.shape
    kernel_h, kernel_w = kernel_2d.shape
    
    output_h = input_h - kernel_h + 1
    output_w = input_w - kernel_w + 1
    
    output = np.zeros((output_h, output_w))
    
    for i in range(output_h):
        for j in range(output_w):
            # Extract the region
            region = input_2d[i:i+kernel_h, j:j+kernel_w]
            # Element-wise multiplication and sum
            output[i, j] = np.sum(region * kernel_2d)
    
    return output

# Example: Edge detection
image = np.array([
    [1, 1, 1, 0, 0],
    [1, 1, 1, 0, 0],
    [1, 1, 1, 0, 0],
    [1, 1, 1, 0, 0],
    [1, 1, 1, 0, 0]
])

# Vertical edge detector
vertical_filter = np.array([
    [1, 0, -1],
    [1, 0, -1],
    [1, 0, -1]
])

# Apply convolution
edge_map = manual_conv2d(image, vertical_filter)
print("\\nEdge detection result:")
print(edge_map)

# Different filter types
filters_examples = {
    'Horizontal Edge': np.array([[1, 1, 1], [0, 0, 0], [-1, -1, -1]]),
    'Vertical Edge': np.array([[1, 0, -1], [1, 0, -1], [1, 0, -1]]),
    'Sharpen': np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]]),
    'Blur': np.array([[1, 1, 1], [1, 1, 1], [1, 1, 1]]) / 9
}

print("\\nCommon filter types loaded successfully!")`}
                  </pre>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Pooling Layer */}
        {activeSection === 3 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-indigo-900 mb-4">Pooling Layer Explained</h2>
              
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Pooling layers reduce the spatial dimensions of feature maps while retaining the most important information. This provides translation invariance and reduces computational cost.
              </p>

              {/* Max vs Average Pooling */}
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Pooling Types Comparison</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Max Pooling */}
                  <div className="bg-white rounded-lg p-6">
                    <h4 className="font-semibold text-purple-700 mb-4 text-lg">Max Pooling (Most Common)</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Input Feature Map (4×4):</p>
                        <div className="grid grid-cols-4 gap-1">
                          {[1,3,2,4,5,6,7,8,3,2,1,0,1,2,3,4].map((val, i) => (
                            <div key={i} className={`aspect-square flex items-center justify-center text-sm font-semibold rounded ${
                              ([1,3,6,8].includes(i)) ? 'bg-purple-600 text-white' : 'bg-purple-200 text-gray-700'
                            }`}>
                              {val}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-center text-2xl text-purple-600">⬇️</div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">After 2×2 Max Pooling (2×2):</p>
                        <div className="grid grid-cols-2 gap-2 mx-auto" style={{width: 'fit-content'}}>
                          {[6,8,3,4].map((val, i) => (
                            <div key={i} className="w-16 h-16 flex items-center justify-center text-lg font-bold rounded bg-purple-600 text-white">
                              {val}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded p-3 mt-4">
                      <p className="text-sm text-gray-700"><strong>How it works:</strong> Takes the maximum value from each 2×2 region</p>
                      <p className="text-sm text-gray-600 mt-1">✅ Preserves strongest activations</p>
                      <p className="text-sm text-gray-600">✅ Provides translation invariance</p>
                    </div>
                  </div>

                  {/* Average Pooling */}
                  <div className="bg-white rounded-lg p-6">
                    <h4 className="font-semibold text-pink-700 mb-4 text-lg">Average Pooling</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Input Feature Map (4×4):</p>
                        <div className="grid grid-cols-4 gap-1">
                          {[1,3,2,4,5,6,7,8,3,2,1,0,1,2,3,4].map((val, i) => (
                            <div key={i} className="aspect-square flex items-center justify-center text-sm font-semibold rounded bg-pink-200 text-gray-700">
                              {val}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-center text-2xl text-pink-600">⬇️</div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">After 2×2 Avg Pooling (2×2):</p>
                        <div className="grid grid-cols-2 gap-2 mx-auto" style={{width: 'fit-content'}}>
                          {[3.75,5.25,2.0,2.5].map((val, i) => (
                            <div key={i} className="w-16 h-16 flex items-center justify-center text-lg font-bold rounded bg-pink-600 text-white">
                              {val}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="bg-pink-50 rounded p-3 mt-4">
                      <p className="text-sm text-gray-700"><strong>How it works:</strong> Computes average of each 2×2 region</p>
                      <p className="text-sm text-gray-600 mt-1">✅ Smoother downsampling</p>
                      <p className="text-sm text-gray-600">✅ Often used in final layers</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Pooling? */}
              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Use Pooling?</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-3xl mb-2">📉</div>
                    <h4 className="font-semibold text-gray-800 mb-2">Dimensionality Reduction</h4>
                    <p className="text-sm text-gray-600">Reduces spatial size by 75% (2×2 pooling), making computation faster and more efficient</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-3xl mb-2">🎯</div>
                    <h4 className="font-semibold text-gray-800 mb-2">Translation Invariance</h4>
                    <p className="text-sm text-gray-600">Small shifts in input don't significantly affect output, making network more robust</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-3xl mb-2">🛡️</div>
                    <h4 className="font-semibold text-gray-800 mb-2">Overfitting Prevention</h4>
                    <p className="text-sm text-gray-600">Acts as regularization by providing abstracted form of representation</p>
                  </div>
                </div>
              </div>

              {/* Global Pooling */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Global Pooling</h3>
                <p className="text-gray-700 mb-4">Applied to entire feature map, converting each feature map to a single value. Often used before final classification layer.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-blue-700 mb-2">Global Average Pooling (GAP)</h4>
                    <p className="text-sm text-gray-600 mb-2">Example: 5×5×256 → 256 values</p>
                    <p className="text-sm text-gray-600">Each channel becomes single average value</p>
                    <div className="bg-blue-100 rounded p-2 mt-2">
                      <p className="text-xs font-mono">Input: [7, 7, 512] → GAP → Output: [512]</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-blue-700 mb-2">Global Max Pooling (GMP)</h4>
                    <p className="text-sm text-gray-600 mb-2">Takes maximum activation from each channel</p>
                    <p className="text-sm text-gray-600">Captures most prominent feature per channel</p>
                    <div className="bg-blue-100 rounded p-2 mt-2">
                      <p className="text-xs font-mono">Input: [7, 7, 512] → GMP → Output: [512]</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Code Example */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Pooling Implementation
                  </h3>
                  <button
                    onClick={() => toggleCode('pool')}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {expandedCode['pool'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    {expandedCode['pool'] ? 'Hide Code' : 'Show Code'}
                  </button>
                </div>
                
                {expandedCode['pool'] && (
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm">
{`import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np

# PyTorch Pooling Layers
max_pool = nn.MaxPool2d(kernel_size=2, stride=2)  # 2x2 window, stride 2
avg_pool = nn.AvgPool2d(kernel_size=2, stride=2)

# Create sample feature map
feature_map = torch.randn(1, 64, 28, 28)  # [batch, channels, height, width]

# Apply pooling
max_pooled = max_pool(feature_map)  # [1, 64, 14, 14]
avg_pooled = avg_pool(feature_map)  # [1, 64, 14, 14]

print(f"Input shape: {feature_map.shape}")
print(f"After max pooling: {max_pooled.shape}")
print(f"After avg pooling: {avg_pooled.shape}")

# Global Pooling
global_avg_pool = nn.AdaptiveAvgPool2d((1, 1))  # Output size 1x1
global_max_pool = nn.AdaptiveMaxPool2d((1, 1))

gap_result = global_avg_pool(feature_map)  # [1, 64, 1, 1]
gmp_result = global_max_pool(feature_map)  # [1, 64, 1, 1]

# Flatten for fully connected layers
gap_flattened = gap_result.view(gap_result.size(0), -1)  # [1, 64]
print(f"\\nAfter global pooling and flatten: {gap_flattened.shape}")

# Manual Max Pooling Implementation
def manual_max_pool_2d(input_array, pool_size=2):
    """
    Manual 2D max pooling
    input_array: 2D numpy array
    pool_size: size of pooling window
    """
    h, w = input_array.shape
    out_h, out_w = h // pool_size, w // pool_size
    
    output = np.zeros((out_h, out_w))
    
    for i in range(out_h):
        for j in range(out_w):
            # Extract pool region
            h_start = i * pool_size
            h_end = h_start + pool_size
            w_start = j * pool_size
            w_end = w_start + pool_size
            
            pool_region = input_array[h_start:h_end, w_start:w_end]
            output[i, j] = np.max(pool_region)
    
    return output

# Test manual pooling
test_input = np.array([
    [1, 3, 2, 4],
    [5, 6, 7, 8],
    [3, 2, 1, 0],
    [1, 2, 3, 4]
])

pooled_output = manual_max_pool_2d(test_input, pool_size=2)
print("\\nManual max pooling result:")
print(pooled_output)

# Different pool sizes
pool_2x2 = nn.MaxPool2d(2)      # Most common
pool_3x3 = nn.MaxPool2d(3, stride=2)  # Overlapping
pool_adaptive = nn.AdaptiveMaxPool2d((7, 7))  # Output specific size

# Example: Multi-scale pooling
class SpatialPyramidPooling(nn.Module):
    def __init__(self, pool_sizes=[1, 2, 4]):
        super().__init__()
        self.pool_sizes = pool_sizes
    
    def forward(self, x):
        batch_size, channels, h, w = x.size()
        pooled_outputs = []
        
        for pool_size in self.pool_sizes:
            pool = nn.AdaptiveMaxPool2d((pool_size, pool_size))
            pooled = pool(x)
            pooled = pooled.view(batch_size, -1)
            pooled_outputs.append(pooled)
        
        return torch.cat(pooled_outputs, dim=1)

spp = SpatialPyramidPooling([1, 2, 4])
test_features = torch.randn(1, 256, 13, 13)
spp_output = spp(test_features)
print(f"\\nSpatial Pyramid Pooling output shape: {spp_output.shape}")
# Output: [1, 256*(1 + 4 + 16)] = [1, 5376]`}
                  </pre>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Fully Connected Layer */}
        {activeSection === 4 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-indigo-900 mb-4">Fully Connected Layer & Complete Pipeline</h2>
              
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Fully connected (dense) layers connect every neuron to all neurons in the previous layer. They combine learned features for final classification or regression tasks.
              </p>

              {/* FC Layer Visualization */}
              <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">From Features to Predictions</h3>
                <div className="bg-white rounded-lg p-6">
                  <div className="flex items-center justify-around">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold mb-2">
                        Feature<br/>Maps<br/>7×7×512
                      </div>
                      <p className="text-xs text-gray-600">CNN Output</p>
                    </div>
                    
                    <div className="text-2xl">→</div>
                    
                    <div className="text-center">
                      <div className="w-24 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold mb-2">
                        Flatten<br/>25,088
                      </div>
                      <p className="text-xs text-gray-600">1D Vector</p>
                    </div>
                    
                    <div className="text-2xl">→</div>
                    
                    <div className="text-center">
                      <div className="w-20 h-28 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white font-bold mb-2">
                        FC<br/>4096
                      </div>
                      <p className="text-xs text-gray-600">Hidden</p>
                    </div>
                    
                    <div className="text-2xl">→</div>
                    
                    <div className="text-center">
                      <div className="w-20 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center text-white font-bold mb-2">
                        FC<br/>1000
                      </div>
                      <p className="text-xs text-gray-600">Hidden</p>
                    </div>
                    
                    <div className="text-2xl">→</div>
                    
                    <div className="text-center">
                      <div className="w-16 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center text-white font-bold mb-2">
                        Out<br/>10
                      </div>
                      <p className="text-xs text-gray-600">Classes</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Complete Training Example */}
              <div className="bg-indigo-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Complete CNN Training Pipeline</h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                      <h4 className="font-semibold text-gray-800">Data Preparation</h4>
                    </div>
                    <p className="text-sm text-gray-600 ml-11">Load and preprocess images, normalize pixel values, augment data, create train/validation splits</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                      <h4 className="font-semibold text-gray-800">Forward Pass</h4>
                    </div>
                    <p className="text-sm text-gray-600 ml-11">Images flow through Conv → Pool → Conv → Pool → Flatten → FC → Output layers</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                      <h4 className="font-semibold text-gray-800">Loss Calculation</h4>
                    </div>
                    <p className="text-sm text-gray-600 ml-11">Compare predictions with true labels using Cross-Entropy Loss</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                      <h4 className="font-semibold text-gray-800">Backpropagation</h4>
                    </div>
                    <p className="text-sm text-gray-600 ml-11">Compute gradients for all parameters using chain rule</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
                      <h4 className="font-semibold text-gray-800">Parameter Update</h4>
                    </div>
                    <p className="text-sm text-gray-600 ml-11">Update weights using optimizer (SGD, Adam) to minimize loss</p>
                  </div>
                </div>
              </div>

              {/* Real Example with MNIST */}
              <div className="bg-yellow-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Real-World Example: MNIST Digit Classification</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Problem</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong>Dataset:</strong> 60,000 training images of handwritten digits (0-9)</li>
                      <li>• <strong>Image Size:</strong> 28×28 grayscale pixels</li>
                      <li>• <strong>Classes:</strong> 10 (digits 0-9)</li>
                      <li>• <strong>Goal:</strong> Classify each digit correctly</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">CNN Solution</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• <strong>Accuracy:</strong> ~99.2% on test set</li>
                      <li>• <strong>Training Time:</strong> ~5-10 minutes on GPU</li>
                      <li>• <strong>Parameters:</strong> ~50,000 trainable weights</li>
                      <li>• <strong>Inference:</strong> Real-time (milliseconds)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Complete Code Example */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Complete MNIST CNN Training Code
                  </h3>
                  <button
                    onClick={() => toggleCode('complete')}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {expandedCode['complete'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    {expandedCode['complete'] ? 'Hide Code' : 'Show Code'}
                  </button>
                </div>
                
                {expandedCode['complete'] && (
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm">
{`import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torchvision import datasets, transforms
import matplotlib.pyplot as plt

# Step 1: Define CNN Architecture
class MNISTNet(nn.Module):
    def __init__(self):
        super(MNISTNet, self).__init__()
        
        # Convolutional layers
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, padding=1)  # 28x28x1 -> 28x28x32
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1) # 14x14x32 -> 14x14x64
        
        # Pooling layer
        self.pool = nn.MaxPool2d(2, 2)  # Reduces size by half
        
        # Fully connected layers
        self.fc1 = nn.Linear(64 * 7 * 7, 128)
        self.fc2 = nn.Linear(128, 10)
        
        # Dropout for regularization
        self.dropout = nn.Dropout(0.25)
    
    def forward(self, x):
        # Conv1 -> ReLU -> Pool
        x = self.pool(torch.relu(self.conv1(x)))  # 28x28x32 -> 14x14x32
        
        # Conv2 -> ReLU -> Pool
        x = self.pool(torch.relu(self.conv2(x)))  # 14x14x64 -> 7x7x64
        
        # Flatten
        x = x.view(-1, 64 * 7 * 7)  # 3136 features
        
        # FC1 -> ReLU -> Dropout
        x = self.dropout(torch.relu(self.fc1(x)))
        
        # FC2 (output)
        x = self.fc2(x)
        
        return x

# Step 2: Data Preparation
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))  # MNIST mean and std
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

train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=1000, shuffle=False)

# Step 3: Initialize Model, Loss, and Optimizer
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = MNISTNet().to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

print(f"Training on: {device}")
print(f"Total parameters: {sum(p.numel() for p in model.parameters())}")

# Step 4: Training Loop
def train(model, device, train_loader, optimizer, epoch):
    model.train()
    total_loss = 0
    correct = 0
    
    for batch_idx, (data, target) in enumerate(train_loader):
        data, target = data.to(device), target.to(device)
        
        # Zero gradients
        optimizer.zero_grad()
        
        # Forward pass
        output = model(data)
        
        # Calculate loss
        loss = criterion(output, target)
        
        # Backward pass
        loss.backward()
        
        # Update weights
        optimizer.step()
        
        # Track metrics
        total_loss += loss.item()
        pred = output.argmax(dim=1, keepdim=True)
        correct += pred.eq(target.view_as(pred)).sum().item()
        
        if batch_idx % 100 == 0:
            print(f'Train Epoch: {epoch} [{batch_idx * len(data)}/{len(train_loader.dataset)} '
                  f'({100. * batch_idx / len(train_loader):.0f}%)]\\t'
                  f'Loss: {loss.item():.6f}')
    
    avg_loss = total_loss / len(train_loader)
    accuracy = 100. * correct / len(train_loader.dataset)
    
    return avg_loss, accuracy

# Step 5: Testing/Validation
def test(model, device, test_loader):
    model.eval()
    test_loss = 0
    correct = 0
    
    with torch.no_grad():
        for data, target in test_loader:
            data, target = data.to(device), target.to(device)
            output = model(data)
            test_loss += criterion(output, target).item()
            pred = output.argmax(dim=1, keepdim=True)
            correct += pred.eq(target.view_as(pred)).sum().item()
    
    test_loss /= len(test_loader)
    accuracy = 100. * correct / len(test_loader.dataset)
    
    print(f'\\nTest set: Average loss: {test_loss:.4f}, '
          f'Accuracy: {correct}/{len(test_loader.dataset)} '
          f'({accuracy:.2f}%)\\n')
    
    return test_loss, accuracy

# Step 6: Train the Model
num_epochs = 10
train_losses, test_losses = [], []
train_accs, test_accs = [], []

for epoch in range(1, num_epochs + 1):
    train_loss, train_acc = train(model, device, train_loader, optimizer, epoch)
    test_loss, test_acc = test(model, device, test_loader)
    
    train_losses.append(train_loss)
    test_losses.append(test_loss)
    train_accs.append(train_acc)
    test_accs.append(test_acc)

# Step 7: Save Model
torch.save(model.state_dict(), 'mnist_cnn.pth')
print("Model saved!")

# Step 8: Inference Example
model.eval()
with torch.no_grad():
    sample_data = test_dataset[0][0].unsqueeze(0).to(device)
    sample_label = test_dataset[0][1]
    
    prediction = model(sample_data)
    predicted_class = prediction.argmax(dim=1).item()
    
    print(f"\\nSample prediction:")
    print(f"True label: {sample_label}")
    print(f"Predicted: {predicted_class}")
    print(f"Confidence: {torch.softmax(prediction, dim=1).max().item():.2%}")`}
                  </pre>
                )}
              </div>

              {/* Best Practices */}
              <div className="bg-blue-50 rounded-lg p-6 mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">CNN Best Practices</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-blue-700 mb-2">✅ Do</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Use data augmentation (rotation, flip, crop)</li>
                      <li>• Normalize input images</li>
                      <li>• Use batch normalization between layers</li>
                      <li>• Apply dropout for regularization</li>
                      <li>• Start with pretrained models (transfer learning)</li>
                      <li>• Monitor validation loss to prevent overfitting</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-red-700 mb-2">❌ Don't</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Use too many parameters (overfitting risk)</li>
                      <li>• Skip validation set evaluation</li>
                      <li>• Use very large learning rates</li>
                      <li>• Forget to shuffle training data</li>
                      <li>• Train on unbalanced datasets without adjustment</li>
                      <li>• Ignore GPU memory limitations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8 text-center">
          <p className="text-gray-600">
            🎓 Interactive CNN Learning Guide • Built with React & Tailwind CSS
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Navigate through sections above to explore CNN concepts in depth
          </p>
        </div>
      </div>
    </div>
  );
};

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   CNN COMBINED â€” Navigation Wrapper
   Merges: CNN Class Activity Â· CNN Lesson Â· CNN Tutorial Â·
           CNN & Audio AI Guide Â· CNN Basics Interactive
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
export default function CNNCombined() {
  const [activeTab, setActiveTab] = React.useState(0);

  const tabs = [
    { label: "ðŸ« Class Activity",  component: <CNNClassActivity /> },
    { label: "ðŸ“š CNN Lesson",      component: <CNNLesson /> },
    { label: "ðŸš€ CNN Tutorial",    component: <CNNTutorial /> },
    { label: "ðŸŽµ Audio AI Guide",  component: <CNNAndAudioAIGuide /> },
    { label: "ðŸ”¬ CNN Basics",      component: <CNNBasicsInteractive /> },
  ];

  return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh", background: "#f8fafc" }}>
      {/* Tab bar */}
      <div style={{
        display: "flex", gap: 4, padding: "12px 16px",
        background: "#1e293b", overflowX: "auto", flexWrap: "nowrap",
        position: "sticky", top: 0, zIndex: 1000, boxShadow: "0 2px 8px rgba(0,0,0,.4)"
      }}>
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            style={{
              padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer",
              fontWeight: 700, fontSize: 13, whiteSpace: "nowrap", flexShrink: 0,
              background: activeTab === i ? "#3b82f6" : "#334155",
              color: activeTab === i ? "#fff" : "#94a3b8",
              boxShadow: activeTab === i ? "0 2px 8px rgba(59,130,246,.5)" : "none",
              transition: "all .2s",
            }}
          >{t.label}</button>
        ))}
      </div>

      {/* Active component */}
      <div key={activeTab}>
        {tabs[activeTab].component}
      </div>
    </div>
  );
}