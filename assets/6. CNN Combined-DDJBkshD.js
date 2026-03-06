import{R as ve,j as e,r as v}from"./index-CIDXSLTw.js";import{B as Q}from"./brain-IGCKrJW-.js";import{M as ae,a as je}from"./music-BZftzN0i.js";import{C as F}from"./code-CX5Ttzw_.js";import{C as E,a as P,G as oe}from"./grid-3x3-Bei41wa7.js";import{L as de}from"./layers-07m-m2z4.js";import{F as ce}from"./filter-IMXyem7e.js";import{B as me}from"./book-open-C9ZgZFYh.js";import{c as J}from"./createLucideIcon-CZfQCXqL.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=J("Headphones",[["path",{d:"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",key:"1xhozi"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ne=J("Speaker",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["path",{d:"M12 6h.01",key:"1vi96p"}],["circle",{cx:"12",cy:"14",r:"4",key:"1jruaj"}],["path",{d:"M12 14h.01",key:"1etili"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const we=J("Waves",[["path",{d:"M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"knzxuh"}],["path",{d:"M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"2jd2cc"}],["path",{d:"M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"rd2r6e"}]]);var Se=`
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
`,ke=[{id:"overview",emoji:"📋",label:"Overview"},{id:"a1",emoji:"🔬",label:"Activity 1: Convolution"},{id:"a2",emoji:"⚡",label:"Activity 2: ReLU & Pool"},{id:"a3",emoji:"🧮",label:"Activity 3: Math by Hand"},{id:"a4",emoji:"🎨",label:"Activity 4: Build a CNN"},{id:"a5",emoji:"🏁",label:"Activity 5: Challenge"},{id:"solutions",emoji:"✅",label:"Solutions"}],$=[[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],K=[[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],te=[[-1,-1,-1],[-1,8,-1],[-1,-1,-1]],ne=[[-1,0,1],[-1,0,1],[-1,0,1]],ie=[[-1,-1,-1],[0,0,0],[1,1,1]],re=[[1,1,1],[1,1,1],[1,1,1]],Y={edge:"Edge Detection",vert:"Vertical Edge",horiz:"Horizontal Edge",blur:"Blur (Avg Pool)"},Ce=function(a,o,l=1){const i=a.length,t=a[0].length,n=o.length,p=o[0].length,c=[];for(let d=0;d<=i-n;d++){const r=[];for(let m=0;m<=t-p;m++){let h=0;for(let u=0;u<n;u++)for(let f=0;f<p;f++)h+=a[d+u][m+f]*o[u][f];r.push(Math.round(h/l))}c.push(r)}return c},_e=function(a){return a.map(o=>o.map(l=>Math.max(0,l)))},q=function(a,o=2){const l=a.length,i=a[0].length,t=[];for(let n=0;n+o<=l;n+=o){const p=[];for(let c=0;c+o<=i;c+=o){let d=-1/0;for(let r=0;r<o;r++)for(let m=0;m<o;m++)d=Math.max(d,a[n+r][c+m]);p.push(d)}t.push(p)}return t},pe=function(a,o,l){if(l===o)return"hsl(210,10%,92%)";const i=(a-o)/(l-o);if(i>=.5){const t=(i-.5)*2;return`hsl(${160+t*40},${60+t*30}%,${85-t*25}%)`}else{const t=i*2;return`hsl(${350+t*10},${50+t*20}%,${92-t*10}%)`}},he=function(a){let o=1/0,l=-1/0;return a.forEach(i=>i.forEach(t=>{t<o&&(o=t),t>l&&(l=t)})),{min:o,max:l}},U=function({data:a,label:o,highlightCells:l=[],resultCells:i=[],cellSize:t=38,showVal:n=!0,binaryMode:p=!1}){const{min:c,max:d}=he(a);return e.jsxs("div",{className:"matrix-container",children:[o&&e.jsx("div",{className:"matrix-label",children:o}),e.jsx("div",{className:"matrix",style:{gridTemplateColumns:`repeat(${a[0].length},1fr)`},children:a.map((r,m)=>r.map((h,u)=>{const f=`${m}-${u}`,j=l.includes(f),y=i.includes(f);let N;p?N=h>0?"hsl(210,15%,88%)":"hsl(0,0%,18%)":N=pe(h,c,d);const C=p&&h===0?"#aaa":"#1c1917";return e.jsx("div",{className:`mcell ${j?"highlight-cell":""} ${y?"result-cell":""}`,style:{width:t,height:t,background:N,color:C,fontSize:t>35?12:10},children:n?h===0&&!p?"0":h:""},f)}))})]})},ze=function(){var M,w;const[a,o]=v.useState("vert"),[l,i]=v.useState({r:0,c:0}),[t,n]=v.useState("L"),[p,c]=v.useState(0),d=t==="L"?$:K,r=a==="edge"?te:a==="vert"?ne:a==="horiz"?ie:re,h=Ce(d,r,a==="blur"?9:1),{r:u,c:f}=l,j=[];for(let x=0;x<3;x++)for(let b=0;b<3;b++)j.push(`${u+x}-${f+b}`);const y=[`${u}-${f}`];let N=[];for(let x=0;x<3;x++)for(let b=0;b<3;b++){const S=d[u+x][f+b],D=r[x][b];N.push({iv:S,kv:D,product:S*D})}const C=d.length-3,z=d[0].length-3,T=[{num:"01",label:"Choose Image"},{num:"02",label:"Pick Kernel"},{num:"03",label:"Slide Filter"},{num:"04",label:"Inspect Math"}];return e.jsxs("div",{className:"fade-up",children:[e.jsx("div",{className:"section-badge",children:"⬡ ACTIVITY 1 of 5"}),e.jsx("div",{className:"section-heading",children:"Convolution Explorer"}),e.jsxs("div",{className:"section-desc",children:["Convolution is the heart of every CNN. A small ",e.jsx("strong",{children:"filter (kernel)"})," slides over the input image pixel-by-pixel. At each position it performs a ",e.jsx("strong",{children:"dot product"})," — multiply matching values and sum them up. The result is a ",e.jsx("strong",{children:"feature map"})," that highlights where certain patterns appear. Work through these 4 steps to truly understand what's happening."]}),e.jsx("div",{className:"wizard-steps",children:T.map((x,b)=>e.jsxs("div",{className:`wstep ${p===b?"active":""}`,onClick:()=>c(b),children:[e.jsx("span",{className:"wstep-num",children:x.num}),e.jsx("span",{className:"wstep-label",children:x.label})]},b))}),p===0&&e.jsxs("div",{className:"card card-amber fade-up",children:[e.jsx("div",{className:"card-title",children:"📷 Step 1 — Choose Your Input Image"}),e.jsx("div",{className:"card-sub",children:"These are simple 5×5 binary images (1 = white pixel, 0 = black pixel). In real CNNs the input is a full photo with pixel values 0–255. We use binary here so the math stays simple!"}),e.jsx("div",{className:"activity-row",children:["L","T"].map(x=>e.jsxs("div",{className:"activity-box",style:{border:`2px solid ${t===x?"var(--amber)":"var(--border)"}`,cursor:"pointer",background:t===x?"#fffbeb":"white"},onClick:()=>n(x),children:[e.jsxs("h3",{children:[t===x?"✅ ":"",' Letter "',x,'" — 5×5 Binary Image']}),e.jsxs("p",{children:["Each cell is either ",e.jsx("span",{className:"tag tag-ink",children:"1"})," (white/on) or ",e.jsx("span",{className:"tag tag-amber",children:"0"})," (black/off). This is what a pixel looks like as a number."]}),e.jsx(U,{data:t==="L"&&x==="L"?$:x==="T"?K:x==="L"?$:K,binaryMode:!0,cellSize:44,showVal:!0})]},x))}),e.jsxs("div",{className:"callout",children:[e.jsx("strong",{children:"📝 Think about it:"})," Why do we represent images as numbers? Because computers can only do math! Every image in a CNN is just a big grid of numbers. A color photo is THREE grids — one each for Red, Green, and Blue channels."]}),e.jsx("div",{className:"flex-center mt-16",children:e.jsx("button",{className:"btn btn-amber",onClick:()=>c(1),children:"Next: Pick a Kernel →"})})]}),p===1&&e.jsxs("div",{className:"card card-amber fade-up",children:[e.jsx("div",{className:"card-title",children:"🔧 Step 2 — Choose a Kernel (Filter)"}),e.jsxs("div",{className:"card-sub",children:["A kernel is a small 3×3 grid of weights. Different kernels detect different features. The CNN ",e.jsx("em",{children:"learns"})," these weights during training — but we can design them by hand to see how they work!"]}),e.jsx("div",{className:"info-grid",children:Object.entries(Y).map(([x,b])=>{const S=x==="edge"?te:x==="vert"?ne:x==="horiz"?ie:re;return e.jsxs("div",{className:"ibox",style:{cursor:"pointer",border:`2px solid ${a===x?"var(--teal)":"var(--border)"}`,background:a===x?"#f0fdfa":"var(--paper2)"},onClick:()=>o(x),children:[e.jsx("div",{className:"ibox-icon",children:x==="edge"?"🔲":x==="vert"?"⬛":x==="horiz"?"🟫":"🌫️"}),e.jsxs("div",{className:"ibox-title",children:[a===x?"✅ ":"",b]}),e.jsx(U,{data:S,cellSize:30,showVal:!0}),e.jsx("div",{className:"ibox-body",style:{marginTop:8},children:x==="edge"?"Detects all edges — center pixel × 8, neighbors × −1. High output = edge found!":x==="vert"?"Detects vertical lines. Left side −1, right side +1. Responds to left-to-right brightness change.":x==="horiz"?"Detects horizontal lines. Top row −1, bottom row +1. Responds to top-to-bottom change.":"Averages neighbors — blurs the image. Sum ÷ 9. Smooths out noise."})]},x)})}),e.jsxs("div",{className:"flex-center mt-16",style:{justifyContent:"space-between"},children:[e.jsx("button",{className:"btn btn-outline",onClick:()=>c(0),children:"← Back"}),e.jsx("button",{className:"btn btn-amber",onClick:()=>c(2),children:"Next: Slide the Filter →"})]})]}),p===2&&e.jsxs("div",{className:"card card-amber fade-up",children:[e.jsx("div",{className:"card-title",children:"🔍 Step 3 — Slide the Filter & Build the Feature Map"}),e.jsxs("div",{className:"card-sub",children:["Use the arrow buttons to move the 3×3 filter (highlighted in gold) across the input image. Watch the corresponding output cell (highlighted in teal) update with the dot-product result! The full output is the ",e.jsx("strong",{children:"feature map"}),"."]}),e.jsxs("div",{className:"matrix-wrap",children:[e.jsx(U,{data:d,label:`Input: Letter "${t}" (5×5)`,highlightCells:j,binaryMode:!0,cellSize:44}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4},children:[e.jsx("div",{style:{fontSize:24,color:"var(--amber)"},children:"✕"}),e.jsx(U,{data:r,label:`Kernel: ${Y[a]} (3×3)`,cellSize:38})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:e.jsx("div",{style:{fontSize:24,color:"var(--slate)",marginBottom:8},children:"→"})}),e.jsx(U,{data:h,label:"Feature Map (3×3)",resultCells:y,cellSize:44})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:8,margin:"20px 0"},children:[e.jsx("button",{className:"btn btn-outline",style:{padding:"6px 16px"},onClick:()=>i(x=>({...x,r:Math.max(0,x.r-1)})),disabled:u===0,children:"▲ Up"}),e.jsxs("div",{style:{display:"flex",gap:12},children:[e.jsx("button",{className:"btn btn-outline",style:{padding:"6px 16px"},onClick:()=>i(x=>({...x,c:Math.max(0,x.c-1)})),disabled:f===0,children:"◀ Left"}),e.jsxs("div",{className:"canvas-section",style:{minWidth:120,padding:"10px 20px"},children:[e.jsxs("span",{className:"mono",style:{fontSize:16,fontWeight:700},children:["Position: (",u,",",f,")"]}),e.jsx("div",{className:"canvas-hint",children:"Filter top-left corner"})]}),e.jsx("button",{className:"btn btn-outline",style:{padding:"6px 16px"},onClick:()=>i(x=>({...x,c:Math.min(z,x.c+1)})),disabled:f===z,children:"Right ▶"})]}),e.jsx("button",{className:"btn btn-outline",style:{padding:"6px 16px"},onClick:()=>i(x=>({...x,r:Math.min(C,x.r+1)})),disabled:u===C,children:"▼ Down"})]}),e.jsxs("div",{className:"callout",children:[e.jsx("strong",{children:"👁️ Notice:"})," As you move the filter, look at which positions produce HIGH values vs LOW values in the feature map. High values (bright cells) mean the filter ",e.jsx("em",{children:"matched"})," a pattern at that location. For the vertical-edge kernel, high values appear where vertical lines exist in the image!"]}),e.jsxs("div",{className:"flex-center mt-16",style:{justifyContent:"space-between"},children:[e.jsx("button",{className:"btn btn-outline",onClick:()=>c(1),children:"← Back"}),e.jsx("button",{className:"btn btn-amber",onClick:()=>c(3),children:"Next: Inspect the Math →"})]})]}),p===3&&e.jsxs("div",{className:"card card-amber fade-up",children:[e.jsx("div",{className:"card-title",children:"🧮 Step 4 — The Dot-Product Calculation (Detailed)"}),e.jsxs("div",{className:"card-sub",children:["Here is EXACTLY what the computer calculates at position (",u,",",f,"). Each of the 9 cells in the 3×3 overlap is multiplied by the matching kernel weight, then everything is summed. This is the full math — no shortcuts!"]}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontFamily:"var(--mono)",fontSize:13,marginBottom:16},children:[e.jsx("thead",{children:e.jsx("tr",{style:{background:"var(--ink)",color:"var(--amber-light)"},children:["Position","Image Patch Value","Kernel Weight","Product","Running Sum"].map(x=>e.jsx("th",{style:{padding:"10px 14px",textAlign:"center",fontFamily:"DM Mono",fontSize:11},children:x},x))})}),e.jsxs("tbody",{children:[N.map((x,b)=>{const S=Math.floor(b/3),D=b%3,V=N.slice(0,b+1).reduce((fe,be)=>fe+be.product,0);return e.jsxs("tr",{style:{background:b%2===0?"var(--paper2)":"white",borderBottom:"1px solid var(--border)"},children:[e.jsx("td",{style:{padding:"8px 14px",textAlign:"center",color:"var(--slate)"},children:e.jsxs("span",{style:{fontFamily:"DM Mono"},children:["img[",u+S,"][",f+D,"] × k[",S,"][",D,"]"]})}),e.jsx("td",{style:{padding:"8px 14px",textAlign:"center"},children:e.jsx("span",{style:{padding:"2px 8px",borderRadius:6,background:x.iv>0?"#dcfce7":"#f1f5f9",fontWeight:700},children:x.iv})}),e.jsx("td",{style:{padding:"8px 14px",textAlign:"center"},children:e.jsx("span",{style:{padding:"2px 8px",borderRadius:6,background:x.kv>0?"#dbeafe":x.kv<0?"#fee2e2":"#f1f5f9",fontWeight:700},children:x.kv})}),e.jsx("td",{style:{padding:"8px 14px",textAlign:"center",fontWeight:700,color:x.product>0?"var(--teal)":x.product<0?"var(--rose)":"var(--slate)"},children:x.product}),e.jsx("td",{style:{padding:"8px 14px",textAlign:"center",fontFamily:"DM Mono",fontWeight:700},children:V})]},b)}),e.jsxs("tr",{style:{background:"var(--amber-light)",fontWeight:800},children:[e.jsxs("td",{colSpan:3,style:{padding:"10px 14px",textAlign:"right",fontFamily:"DM Mono"},children:["FINAL OUTPUT at (",u,",",f,") ",a==="blur"?" ÷ 9 ":"","="]}),e.jsx("td",{colSpan:2,style:{padding:"10px 14px",textAlign:"center",fontSize:18,fontFamily:"DM Mono",color:"var(--amber-dark)"},children:(M=h[u])==null?void 0:M[f]})]})]})]})}),e.jsxs("div",{className:"callout-teal callout",children:[e.jsx("strong",{children:"🎯 Key Insight:"})," This one number (",(w=h[u])==null?void 0:w[f],') tells us how strongly the pattern "',Y[a],'" was found at position (',u,",",f,") in the image. The CNN repeats this for EVERY position (stride of 1) and for DOZENS of different kernels simultaneously — building a whole library of feature maps!"]}),e.jsxs("div",{className:"flex-center mt-16",style:{justifyContent:"space-between"},children:[e.jsx("button",{className:"btn btn-outline",onClick:()=>c(2),children:"← Back"}),e.jsx("button",{className:"btn btn-teal",onClick:()=>{},children:"🎉 Activity 1 Complete!"})]})]})]})},Te=function(){const a=[[-3,1,-2,4],[2,-1,3,-5],[-4,0,2,1],[1,-2,-1,3]],[o,l]=v.useState(!1),[i,t]=v.useState(!1),[n,p]=v.useState(null),[c,d]=v.useState(""),[r,m]=v.useState(null),h=_e(a),u=q(h,2),f=[[0,0],[0,2],[2,0],[2,2]],j=()=>{var N;const y=(N=u[Math.floor((n||0)/2)])==null?void 0:N[(n||0)%2];parseInt(c)===y?m("correct"):m("wrong")};return e.jsxs("div",{className:"fade-up",children:[e.jsx("div",{className:"section-badge",children:"⬡ ACTIVITY 2 of 5"}),e.jsx("div",{className:"section-heading",children:"ReLU Activation + Max Pooling"}),e.jsxs("div",{className:"section-desc",children:["After convolution, two more operations are applied. ",e.jsx("strong",{className:"accent",children:"ReLU"})," removes all negative values (sets them to 0), adding non-linearity so the network can learn complex patterns. ",e.jsx("strong",{className:"teal",children:"Max Pooling"})," then shrinks the feature map by keeping only the maximum value in each region — reducing computation while retaining important signals."]}),e.jsxs("div",{className:"card card-rose",children:[e.jsx("div",{className:"card-title",children:"⚡ Part A — Apply ReLU Activation"}),e.jsxs("div",{className:"card-sub",children:['The raw feature map from convolution often has negative values. These are meaningless to us (a negative "edge detection score" just means "no edge here"). ReLU clips them all to zero. Formula: ',e.jsx("span",{className:"mono",children:"ReLU(x) = max(0, x)"})]}),e.jsxs("div",{className:"matrix-wrap",children:[e.jsx(U,{data:a,label:"Raw Feature Map (after Conv)",cellSize:44}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8},children:[e.jsxs("div",{style:{fontFamily:"Caveat",fontSize:20,color:"var(--rose)",textAlign:"center"},children:["Apply ReLU",e.jsx("br",{}),"max(0, x)"]}),e.jsx("button",{className:"btn btn-rose",style:{background:"var(--rose)",color:"white"},onClick:()=>l(!0),children:"⚡ Apply ReLU!"})]}),o&&e.jsx(U,{data:h,label:"After ReLU (negatives → 0)",cellSize:44})]}),o&&e.jsxs("div",{className:"callout",style:{marginTop:16},children:[e.jsx("strong",{children:"🔍 What changed?"})," Count the cells that changed: the values −3, −2, −1, −5, −4, −2, −1 all became 0. The positive values (1, 4, 2, 3, 2, 1, 1, 3) stayed exactly the same. ReLU essentially asks: ",e.jsx("em",{children:'"Was this pattern detected here? If yes (positive), keep the score. If no (negative), ignore it."'})]})]}),o&&e.jsxs("div",{className:"card card-teal fade-up",children:[e.jsx("div",{className:"card-title",children:"🏊 Part B — Max Pooling (2×2 windows)"}),e.jsxs("div",{className:"card-sub",children:["We divide the 4×4 feature map into four 2×2 non-overlapping windows. From each window, we keep only the ",e.jsx("strong",{children:"maximum value"}),". This gives us a 2×2 output — half the size! The idea: if a feature was detected ",e.jsx("em",{children:"anywhere"})," in that region, the maximum captures it."]}),e.jsxs("div",{className:"matrix-wrap",children:[e.jsxs("div",{className:"matrix-container",children:[e.jsx("div",{className:"matrix-label",children:"ReLU Output — click a region!"}),e.jsx("div",{className:"matrix",style:{gridTemplateColumns:"repeat(4,1fr)",position:"relative"},children:h.map((y,N)=>y.map((C,z)=>{const T=N<2?z<2?0:1:z<2?2:3,M=["#fde68a","#c7f2fa","#d1fae5","#fce7f3"],{min:w,max:x}=he(h);return e.jsx("div",{className:"mcell",style:{width:44,height:44,background:n===T?M[T]:pe(C,w,x),outline:n===T?"2px solid var(--amber)":"none",cursor:"pointer",fontFamily:"DM Mono",fontSize:12,fontWeight:600},onClick:()=>{p(T),d(""),m(null)},children:C},`${N}-${z}`)}))}),e.jsx("div",{style:{display:"flex",gap:8,justifyContent:"center",marginTop:10,flexWrap:"wrap"},children:["TL","TR","BL","BR"].map((y,N)=>e.jsxs("button",{className:"btn btn-outline",style:{padding:"4px 12px",fontSize:12,background:n===N?"var(--amber-light)":"white"},onClick:()=>{p(N),d(""),m(null)},children:["Region ",y]},N))})]}),n!==null&&e.jsxs("div",{className:"activity-box fade-up",style:{minWidth:240},children:[e.jsxs("h3",{children:["Region ",["Top-Left","Top-Right","Bottom-Left","Bottom-Right"][n]]}),e.jsx("p",{children:"Values in this 2×2 region:"}),e.jsx("div",{style:{fontFamily:"DM Mono",fontSize:18,padding:"12px",background:"var(--paper2)",borderRadius:8,marginBottom:12,textAlign:"center"},children:(()=>{const[y,N]=f[n];return`${h[y][N]}, ${h[y][N+1]}
${h[y+1][N]}, ${h[y+1][N+1]}`})()}),e.jsx("p",{children:e.jsx("strong",{children:"What is the maximum?"})}),e.jsx("input",{className:"ans-input",type:"number",placeholder:"Enter max value...",value:c,onChange:y=>d(y.target.value),onKeyDown:y=>y.key==="Enter"&&j()}),e.jsx("button",{className:"btn btn-teal w-full",style:{width:"100%"},onClick:j,children:"Check ✓"}),r==="correct"&&e.jsx("div",{className:"ans-feedback ans-correct",children:"✅ Correct! That's the max-pool output for this region."}),r==="wrong"&&e.jsxs("div",{className:"ans-feedback ans-wrong",children:["❌ Not quite. Remember: max means the ",e.jsx("em",{children:"largest"})," number in the region!"]})]}),i&&e.jsx(U,{data:u,label:"Max-Pool Output (2×2)",cellSize:52})]}),e.jsx("div",{className:"flex-center mt-16",children:e.jsx("button",{className:"btn btn-teal",onClick:()=>t(!0),children:"Reveal Full Pooling Result →"})}),i&&e.jsxs("div",{className:"callout-teal callout mt-16",children:[e.jsx("strong",{children:"📐 Size reduction:"})," We went from a 4×4 feature map (16 values) to a 2×2 map (4 values) — ",e.jsx("strong",{children:"75% smaller!"})," In a real CNN on a 224×224 image, after several pooling operations the feature maps become tiny, making the Fully Connected layers fast and feasible to train."]})]})]})},Ae=function(){const a=[{id:"p1",title:"Neuron Forward Pass",desc:"A single neuron receives 3 inputs. Calculate the output after applying ReLU.",inputs:[.5,-.3,.8],weights:[.4,.7,-.2],bias:.1,hint:"Step 1: weighted_sum = Σ(wᵢ × xᵢ) + b  →  Step 2: ReLU(weighted_sum)",steps:["0.4 × 0.5 = 0.20","0.7 × (-0.3) = -0.21","(-0.2) × 0.8 = -0.16","Sum = 0.20 + (-0.21) + (-0.16) + 0.10 (bias) = -0.07","ReLU(-0.07) = max(0, -0.07) = 0.00"],answer:0},{id:"p2",title:"Softmax Probability",desc:"Three raw output scores (logits) from the final layer. Compute the probability for class 'Cat'.",classes:["Cat","Dog","Bird"],logits:[2,1,.1],hint:"Softmax(xᵢ) = e^xᵢ / (e^x₀ + e^x₁ + e^x₂). Use e ≈ 2.718. e^2 ≈ 7.39, e^1 ≈ 2.72, e^0.1 ≈ 1.11",steps:["e^2.0 = 7.39 (Cat)","e^1.0 = 2.72 (Dog)","e^0.1 = 1.11 (Bird)","Sum = 7.39 + 2.72 + 1.11 = 11.22","P(Cat) = 7.39 / 11.22 ≈ 0.659 ≈ 65.9%"],answer:65.9,tolerance:2,unit:"%"},{id:"p3",title:"Feature Map Size",desc:"Input image: 32×32. Applied one Conv layer (3×3 kernel, stride=1, no padding), then one MaxPool (2×2). What is the final feature map size?",hint:"After Conv: output = (input − kernel + 1). After Pool: output = input ÷ pool_size",steps:["After Conv: 32 − 3 + 1 = 30 → size is 30×30","After MaxPool 2×2: 30 ÷ 2 = 15 → size is 15×15","Final feature map: 15 × 15"],answer:15,unit:"×15 (15×15)",inputHint:"Enter the width (e.g. 15):"}],[o,l]=v.useState({}),[i,t]=v.useState({}),[n,p]=v.useState({}),c=(d,r,m=0)=>{const h=parseFloat(o[d]),u=Math.abs(h-r);t(f=>({...f,[d]:u<=(m||.05)?"correct":"wrong"}))};return e.jsxs("div",{className:"fade-up",children:[e.jsx("div",{className:"section-badge",children:"⬡ ACTIVITY 3 of 5"}),e.jsx("div",{className:"section-heading",children:"Math by Hand"}),e.jsx("div",{className:"section-desc",children:"The best way to truly understand a CNN is to compute the math yourself — no shortcuts! These three problems cover the three most important calculations you'll encounter: neuron activation, softmax probabilities, and output dimensions. Work through them step by step."}),a.map((d,r)=>e.jsxs("div",{className:`card card-${["amber","indigo","teal"][r]} fade-up`,children:[e.jsxs("div",{className:"section-badge",style:{marginBottom:12},children:["Problem ",r+1]}),e.jsx("div",{className:"card-title",children:d.title}),e.jsx("div",{className:"card-sub",children:d.desc}),d.id==="p1"&&e.jsxs("div",{style:{display:"flex",gap:16,flexWrap:"wrap",alignItems:"center",margin:"16px 0"},children:[d.inputs.map((m,h)=>e.jsxs("div",{style:{textAlign:"center"},children:[e.jsxs("div",{className:"mono",style:{fontSize:11,color:"var(--slate)"},children:["x",h+1]}),e.jsx("div",{style:{padding:"8px 12px",background:"var(--indigo-light)",color:"var(--indigo)",borderRadius:8,fontWeight:700,fontFamily:"DM Mono",fontSize:16},children:m}),e.jsxs("div",{className:"mono",style:{fontSize:10,color:"var(--slate)",marginTop:2},children:["w",h+1,"=",d.weights[h]]})]},h)),e.jsx("div",{style:{fontSize:24,color:"var(--slate)"},children:"+"}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{className:"mono",style:{fontSize:11,color:"var(--slate)"},children:"bias"}),e.jsx("div",{style:{padding:"8px 12px",background:"var(--rose-light)",color:"var(--rose)",borderRadius:8,fontWeight:700,fontFamily:"DM Mono",fontSize:16},children:d.bias})]}),e.jsx("div",{style:{fontSize:24,color:"var(--slate)"},children:"→"}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{className:"mono",style:{fontSize:11,color:"var(--slate)"},children:"neuron"}),e.jsx("div",{style:{padding:"8px 12px",background:"var(--teal-light)",color:"var(--teal)",borderRadius:8,fontWeight:700,fontFamily:"DM Mono",fontSize:16},children:"?"})]})]}),d.id==="p2"&&e.jsx("div",{style:{display:"flex",gap:12,margin:"16px 0",flexWrap:"wrap"},children:d.classes.map((m,h)=>e.jsxs("div",{style:{padding:"12px 18px",background:"var(--paper2)",borderRadius:10,border:"1.5px solid var(--border)",textAlign:"center",minWidth:90},children:[e.jsx("div",{style:{fontSize:20},children:["🐱","🐶","🐦"][h]}),e.jsx("div",{style:{fontWeight:700,fontSize:13},children:m}),e.jsx("div",{style:{fontFamily:"DM Mono",color:"var(--indigo)",fontSize:16,fontWeight:700},children:d.logits[h]}),e.jsx("div",{style:{fontSize:10,color:"var(--slate)"},children:"logit"})]},h))}),d.id==="p3"&&e.jsx("div",{style:{display:"flex",gap:16,flexWrap:"wrap",alignItems:"center",margin:"16px 0"},children:[["Input",32],[`After
Conv 3×3`,"?"],[`After
MaxPool 2×2`,"?"]].map(([m,h],u)=>e.jsxs("div",{style:{textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:6},children:[u>0&&e.jsx("div",{style:{fontSize:18,color:"var(--slate)"},children:"→"}),e.jsx("div",{style:{width:h==="?"?60:Math.max(40,h*(u===0?1.8:1.2)),height:h==="?"?60:Math.max(40,h*(u===0?1.8:1.2)),maxWidth:90,maxHeight:90,background:u===0?"var(--indigo-light)":u===1?"var(--amber-light)":"var(--teal-light)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"DM Mono",fontWeight:700,fontSize:h==="?"?22:13,color:u===0?"var(--indigo)":u===1?"var(--amber-dark)":"var(--teal)",border:`2px solid ${u===0?"var(--indigo)":u===1?"var(--amber)":"var(--teal)"}`,transition:"all .3s"},children:h==="?"?"?":`${h}×${h}`}),e.jsx("div",{style:{fontSize:11,fontFamily:"DM Mono",color:"var(--slate)",whiteSpace:"pre-wrap",textAlign:"center"},children:m})]},u))}),e.jsxs("div",{className:"formula",children:[e.jsx("div",{className:"formula-comment",children:"# Hint:"}),d.hint]}),e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap",marginTop:16},children:[e.jsxs("div",{style:{flex:1,minWidth:200},children:[e.jsx("div",{style:{fontSize:13,color:"var(--slate)",marginBottom:6},children:d.inputHint||"Your answer:"}),e.jsx("input",{className:"ans-input",type:"number",step:"0.01",placeholder:d.id==="p2"?"e.g. 65.9 (as a %)":d.id==="p3"?"e.g. 15":"e.g. 0.00",value:o[d.id]||"",onChange:m=>l(h=>({...h,[d.id]:m.target.value})),onKeyDown:m=>m.key==="Enter"&&c(d.id,d.answer,d.tolerance),style:{marginBottom:0}})]}),e.jsx("button",{className:"btn btn-amber",style:{marginTop:22},onClick:()=>c(d.id,d.answer,d.tolerance),children:"Check ✓"}),e.jsxs("button",{className:"btn btn-outline",style:{marginTop:22,fontSize:12},onClick:()=>p(m=>({...m,[d.id]:!m[d.id]})),children:[n[d.id]?"Hide":"Show"," Solution"]})]}),i[d.id]==="correct"&&e.jsx("div",{className:"ans-feedback ans-correct mt-8",children:"🎉 Correct! Excellent work!"}),i[d.id]==="wrong"&&e.jsx("div",{className:"ans-feedback ans-wrong mt-8",children:"❌ Not quite. Review the hint or show the solution steps!"}),n[d.id]&&e.jsxs("div",{className:"fade-up",style:{marginTop:16,padding:20,background:"var(--paper2)",borderRadius:12,border:"1.5px solid var(--border)"},children:[e.jsx("div",{style:{fontWeight:800,marginBottom:10,fontFamily:"DM Mono",fontSize:12,color:"var(--slate)"},children:"STEP-BY-STEP SOLUTION:"}),d.steps.map((m,h)=>e.jsxs("div",{style:{display:"flex",gap:12,marginBottom:8,alignItems:"flex-start"},children:[e.jsx("div",{style:{width:22,height:22,borderRadius:"50%",background:"var(--ink)",color:"var(--amber-light)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"DM Mono",fontSize:11,flexShrink:0},children:h+1}),e.jsx("div",{style:{fontFamily:"DM Mono",fontSize:13,color:"var(--ink)",lineHeight:1.6},children:m})]},h))]})]},d.id))]})},Re=[{id:"conv",label:"Conv2D",emoji:"🔍",color:"#4338ca",desc:"Convolutional layer — adds a filter to detect features",params:{filters:32,kernel:3}},{id:"relu",label:"ReLU",emoji:"⚡",color:"#e11d48",desc:"Activation — removes negatives (non-linearity)",params:{}},{id:"pool",label:"MaxPool",emoji:"🏊",color:"#0d9488",desc:"Pooling — halves the spatial dimensions",params:{size:2}},{id:"flat",label:"Flatten",emoji:"📐",color:"#d97706",desc:"Flatten 2D maps to 1D vector",params:{}},{id:"dense",label:"Dense",emoji:"🧠",color:"#7c3aed",desc:"Fully connected layer for classification",params:{units:128}},{id:"out",label:"Output",emoji:"🎯",color:"#059669",desc:"Final softmax layer — probabilities per class",params:{classes:10}}],Le=function(){const[a,o]=v.useState([]),[l,i]=v.useState(!1),[t,n]=v.useState(null),p=r=>{a.length>=8||(o(m=>[...m,{...r,uid:Date.now()}]),i(!1),n(null))},c=r=>{o(m=>m.filter(h=>h.uid!==r)),i(!1),n(null)},d=()=>{i(!0);const r=a.map(f=>f.id);let m=0;r[0]==="conv"&&(m+=20),r.forEach((f,j)=>{f==="conv"&&r[j+1]==="relu"&&(m+=15)});const h=r.indexOf("flat"),u=r.indexOf("dense");h!==-1&&u!==-1&&h<u&&(m+=25),r[r.length-1]==="out"&&(m+=20),r.includes("pool")&&(m+=10),n(Math.min(100,m))};return e.jsxs("div",{className:"fade-up",children:[e.jsx("div",{className:"section-badge",children:"⬡ ACTIVITY 4 of 5"}),e.jsx("div",{className:"section-heading",children:"Build Your Own CNN Architecture"}),e.jsx("div",{className:"section-desc",children:"Drag-and-click to assemble a CNN for digit classification (like MNIST). Add layers in the correct order to build a working architecture. The goal is to design a network that correctly sequences Conv → ReLU → Pool → Flatten → Dense → Output. There's no single right answer — explore!"}),e.jsxs("div",{className:"activity-row",children:[e.jsx("div",{children:e.jsxs("div",{className:"card card-indigo",children:[e.jsx("div",{className:"card-title",children:"🧱 Layer Toolbox"}),e.jsx("div",{className:"card-sub",children:"Click any layer to add it to your architecture (max 8 layers)."}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:Re.map(r=>e.jsxs("button",{className:"activity-box",style:{border:`1.5px solid ${r.color}20`,cursor:"pointer",textAlign:"left",padding:"12px 16px",display:"flex",alignItems:"center",gap:12,background:"white"},onClick:()=>p(r),children:[e.jsx("div",{style:{fontSize:22,flexShrink:0},children:r.emoji}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:800,fontSize:14,color:r.color,fontFamily:"DM Mono"},children:r.label}),e.jsx("div",{style:{fontSize:12,color:"var(--slate)",marginTop:2},children:r.desc}),r.params&&Object.keys(r.params).length>0&&e.jsx("div",{style:{marginTop:4},children:Object.entries(r.params).map(([m,h])=>e.jsxs("span",{className:"tag tag-amber",style:{marginRight:4,fontSize:10},children:[m,"=",h]},m))})]})]},r.id))})]})}),e.jsxs("div",{children:[e.jsxs("div",{className:"card card-amber",children:[e.jsxs("div",{className:"card-title",children:["🏗️ Your Architecture (",a.length,"/8 layers)"]}),a.length===0?e.jsxs("div",{className:"canvas-section",children:[e.jsx("div",{style:{fontSize:40,marginBottom:10},children:"🏗️"}),e.jsx("div",{style:{fontWeight:700,color:"var(--slate)"},children:"Your network is empty!"}),e.jsx("div",{className:"canvas-hint",children:"Click layers on the left to build your CNN"})]}):e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:a.map((r,m)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[m>0&&e.jsx("div",{style:{width:2,height:16,background:"var(--border)",marginLeft:20,flexShrink:0}}),e.jsxs("div",{style:{flex:1,padding:"10px 14px",borderRadius:10,background:`${r.color}12`,border:`1.5px solid ${r.color}40`,display:"flex",alignItems:"center",gap:10},children:[e.jsx("div",{style:{fontSize:18},children:r.emoji}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontWeight:800,fontSize:13,color:r.color,fontFamily:"DM Mono"},children:`${m+1}. ${r.label}`}),e.jsx("div",{style:{fontSize:11,color:"var(--slate)"},children:r.desc})]}),e.jsx("button",{onClick:()=>c(r.uid),style:{background:"none",border:"none",cursor:"pointer",fontSize:16,color:"var(--rose)",padding:"2px 6px"},children:"✕"})]})]},r.uid))}),e.jsxs("div",{style:{display:"flex",gap:10,marginTop:20,flexWrap:"wrap"},children:[e.jsx("button",{className:"btn btn-amber",onClick:d,disabled:a.length<3,children:"🔍 Evaluate Architecture"}),e.jsx("button",{className:"btn btn-outline",onClick:()=>{o([]),i(!1),n(null)},children:"🗑️ Reset"})]})]}),l&&t!==null&&e.jsxs("div",{className:"card fade-up",style:{border:`2px solid ${t>=80?"var(--teal)":t>=50?"var(--amber)":"var(--rose)"}`,background:t>=80?"#f0fdfa":t>=50?"#fffbeb":"#fff1f2"},children:[e.jsx("div",{className:"card-title",style:{color:t>=80?"var(--teal)":t>=50?"var(--amber-dark)":"var(--rose)"},children:t>=80?"🎉 Excellent Architecture!":t>=50?"⚠️ Good Start — Needs Work":"❌ Architecture Issues"}),e.jsxs("div",{style:{fontSize:36,fontFamily:"DM Mono",fontWeight:900,color:t>=80?"var(--teal)":"var(--amber)",margin:"10px 0"},children:[t,"/100"]}),e.jsx("div",{className:"prog-bar-wrap",children:e.jsx("div",{className:"prog-bar",style:{width:`${t}%`,background:`linear-gradient(90deg,${t>=80?"var(--teal)":"var(--rose)"},${t>=80,"var(--amber)"})`}})}),e.jsxs("div",{style:{marginTop:12,fontSize:14,color:"var(--slate)",lineHeight:1.8},children:[a.map(r=>r.id)[0]!=="conv"&&"• Start with a Conv2D layer — it must be the first layer!  ",!a.map(r=>r.id).includes("flat")&&"• Missing Flatten layer — needed to connect Conv layers to Dense layers!  ",!a.map(r=>r.id).includes("out")&&"• Missing Output layer — add it as the final layer!  ",a.map(r=>r.id).filter(r=>r==="conv").some((r,m,h)=>{const u=a.map(j=>j.id),f=u.indexOf("conv");return u[f+1]!=="relu"})&&"• Place ReLU right after each Conv2D layer!  ",t>=80&&"Great job! Your architecture follows the correct Conv → ReLU → Pool → Flatten → Dense → Output pattern. This is exactly how real CNNs are built!"]})]})]})]}),e.jsxs("div",{className:"card card-teal",children:[e.jsx("div",{className:"card-title",children:"📖 Reference: Standard CNN Architecture"}),e.jsx("div",{className:"card-sub",children:"Here is a proven architecture for classifying 28×28 grayscale images into 10 classes (like MNIST digits):"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"cb-lang",children:"Python / Keras"}),e.jsx("span",{className:"kw",children:"from"})," ",e.jsx("span",{className:"fn",children:"tensorflow.keras"})," ",e.jsx("span",{className:"kw",children:"import"})," ",e.jsx("span",{className:"var",children:"layers"}),", ",e.jsx("span",{className:"var",children:"models"}),`

`,e.jsx("span",{className:"var",children:"model"})," ",e.jsx("span",{className:"op",children:"="})," ",e.jsx("span",{className:"fn",children:"models.Sequential"}),"([",`
`,"  ",e.jsx("span",{className:"cm",children:"# Block 1: First convolutional block"}),`
`,"  ",e.jsx("span",{className:"fn",children:"layers.Conv2D"}),"(",e.jsx("span",{className:"num",children:"32"}),", (",e.jsx("span",{className:"num",children:"3"}),",",e.jsx("span",{className:"num",children:"3"}),"), ",e.jsx("span",{className:"var",children:"input_shape"}),e.jsx("span",{className:"op",children:"="}),"(",e.jsx("span",{className:"num",children:"28"}),",",e.jsx("span",{className:"num",children:"28"}),",",e.jsx("span",{className:"num",children:"1"}),")),   ",e.jsx("span",{className:"cm",children:"# 32 filters, 3×3"}),`
`,"  ",e.jsx("span",{className:"fn",children:"layers.Activation"}),"(",e.jsx("span",{className:"str",children:"'relu'"}),"),                        ",e.jsx("span",{className:"cm",children:"# Remove negatives"}),`
`,"  ",e.jsx("span",{className:"fn",children:"layers.MaxPooling2D"}),"((",e.jsx("span",{className:"num",children:"2"}),",",e.jsx("span",{className:"num",children:"2"}),")),                   ",e.jsx("span",{className:"cm",children:"# Halve size: 13×13"}),`
`,`
  `,e.jsx("span",{className:"cm",children:"# Block 2: Second convolutional block"}),`
`,"  ",e.jsx("span",{className:"fn",children:"layers.Conv2D"}),"(",e.jsx("span",{className:"num",children:"64"}),", (",e.jsx("span",{className:"num",children:"3"}),",",e.jsx("span",{className:"num",children:"3"}),")),                      ",e.jsx("span",{className:"cm",children:"# 64 filters, 3×3"}),`
`,"  ",e.jsx("span",{className:"fn",children:"layers.Activation"}),"(",e.jsx("span",{className:"str",children:"'relu'"}),"),                        ",e.jsx("span",{className:"cm",children:"# Remove negatives"}),`
`,"  ",e.jsx("span",{className:"fn",children:"layers.MaxPooling2D"}),"((",e.jsx("span",{className:"num",children:"2"}),",",e.jsx("span",{className:"num",children:"2"}),")),                   ",e.jsx("span",{className:"cm",children:"# Halve size: 5×5"}),`
`,`
  `,e.jsx("span",{className:"cm",children:"# Classification head"}),`
`,"  ",e.jsx("span",{className:"fn",children:"layers.Flatten"}),"(),                              ",e.jsx("span",{className:"cm",children:"# 5×5×64 → 1600 values"}),`
`,"  ",e.jsx("span",{className:"fn",children:"layers.Dense"}),"(",e.jsx("span",{className:"num",children:"128"}),", ",e.jsx("span",{className:"var",children:"activation"}),e.jsx("span",{className:"op",children:"="}),e.jsx("span",{className:"str",children:"'relu'"}),"),            ",e.jsx("span",{className:"cm",children:"# 128 neurons"}),`
`,"  ",e.jsx("span",{className:"fn",children:"layers.Dense"}),"(",e.jsx("span",{className:"num",children:"10"}),",  ",e.jsx("span",{className:"var",children:"activation"}),e.jsx("span",{className:"op",children:"="}),e.jsx("span",{className:"str",children:"'softmax'"}),"),         ",e.jsx("span",{className:"cm",children:"# 10 digit classes"}),`
`,"])",`

`,e.jsx("span",{className:"var",children:"model"}),".",e.jsx("span",{className:"fn",children:"compile"}),"(",e.jsx("span",{className:"var",children:"optimizer"}),e.jsx("span",{className:"op",children:"="}),e.jsx("span",{className:"str",children:"'adam'"}),", ",e.jsx("span",{className:"var",children:"loss"}),e.jsx("span",{className:"op",children:"="}),e.jsx("span",{className:"str",children:"'sparse_categorical_crossentropy'"}),", ",e.jsx("span",{className:"var",children:"metrics"}),e.jsx("span",{className:"op",children:"="}),"[",e.jsx("span",{className:"str",children:"'accuracy'"}),"])",`
`,e.jsx("span",{className:"var",children:"model"}),".",e.jsx("span",{className:"fn",children:"fit"}),"(",e.jsx("span",{className:"var",children:"X_train"}),", ",e.jsx("span",{className:"var",children:"y_train"}),", ",e.jsx("span",{className:"var",children:"epochs"}),e.jsx("span",{className:"op",children:"="}),e.jsx("span",{className:"num",children:"10"}),", ",e.jsx("span",{className:"var",children:"batch_size"}),e.jsx("span",{className:"op",children:"="}),e.jsx("span",{className:"num",children:"32"}),")"]}),e.jsx("div",{className:"info-grid",children:[{emoji:"📊",title:"Input → Conv1",body:`28×28×1 → 26×26×32
(28−3+1=26, with 32 filters)`},{emoji:"🏊",title:"After Pool1",body:`26×26×32 → 13×13×32
(halved in each dimension)`},{emoji:"📊",title:"Conv2 → Pool2",body:`13→11→5 (after conv+pool)
64 filters → 5×5×64 = 1600`},{emoji:"🎯",title:"Dense Output",body:`1600 → 128 → 10
10 probabilities (one per digit)`}].map(r=>e.jsxs("div",{className:"ibox",children:[e.jsx("div",{className:"ibox-icon",children:r.emoji}),e.jsx("div",{className:"ibox-title",children:r.title}),e.jsx("div",{className:"ibox-body",style:{whiteSpace:"pre-line",fontFamily:"DM Mono",fontSize:12},children:r.body})]},r.title))})]})]})},Me=function(){const a=[{id:"s1",emoji:"🏥",title:"Medical: Tumor Detection",context:"You're building a CNN to detect tumors in 512×512 grayscale X-ray images. Binary classification: tumor / no tumor.",questions:[{q:"What should be the input shape?",correct:"(512,512,1)",hint:"Grayscale has 1 channel. Format: (height, width, channels)"},{q:"How many neurons in the final output layer?",correct:"2",hint:"Binary = 2 classes. OR use 1 neuron with sigmoid. We use 2 here."},{q:"What activation for the output layer?",correct:"softmax",hint:"Softmax for multi-class; sigmoid for binary. Either is valid!"}]},{id:"s2",emoji:"🐕",title:"Pet Classifier: Cat vs Dog vs Bird",context:"Build a CNN for a pet app that classifies photos (224×224 RGB) into 3 pet types.",questions:[{q:"What should be the input shape?",correct:"(224,224,3)",hint:"RGB images have 3 channels (Red, Green, Blue)."},{q:"How many neurons in the output layer?",correct:"3",hint:"One output neuron per class — so 3 for Cat, Dog, Bird."},{q:"Which loss function should you use?",correct:"categorical_crossentropy",hint:"Use categorical_crossentropy for multi-class with softmax output."}]},{id:"s3",emoji:"✋",title:"Sign Language: 26 Letters",context:"A CNN reads hand-sign photos (64×64 RGB) to recognize all 26 letters of the alphabet.",questions:[{q:"What is the input shape?",correct:"(64,64,3)",hint:"64×64 color image = (64, 64, 3)"},{q:"How many output neurons?",correct:"26",hint:"One per letter A–Z = 26 neurons."},{q:"After two Conv+Pool blocks on a 64×64 input, what is the feature map size?",correct:"14",hint:"64→62→31→29→14 (conv removes 2, pool halves, rounded down)"}]}],[o,l]=v.useState(0),[i,t]=v.useState({}),[n,p]=v.useState({}),c=a[o],d=(r,m)=>{const h=(i[r]||"").trim().toLowerCase(),u=h===m.toLowerCase()||h===m.toLowerCase().replace("_","");p(f=>({...f,[r]:u?"correct":"wrong"}))};return e.jsxs("div",{className:"fade-up",children:[e.jsx("div",{className:"section-badge",children:"⬡ ACTIVITY 5 of 5 — CHALLENGE"}),e.jsx("div",{className:"section-heading",children:"Real-World CNN Design Challenge"}),e.jsx("div",{className:"section-desc",children:"Three real-world problems! For each scenario, figure out the correct architecture choices. This tests whether you truly understand how CNN designs change based on the problem. Read the scenario carefully — the answer is in the details!"}),e.jsx("div",{className:"team-badges",children:a.map((r,m)=>e.jsxs("div",{className:`team-badge ${o===m?"selected":""}`,style:{background:o===m?"var(--ink)":"var(--paper2)",color:o===m?"var(--amber-light)":"var(--ink)",border:`2px solid ${o===m?"var(--amber)":"var(--border)"}`,cursor:"pointer"},onClick:()=>{l(m),t({}),p({})},children:[e.jsx("span",{children:r.emoji}),e.jsx("span",{style:{fontWeight:700},children:r.title})]},r.id))}),e.jsxs("div",{className:"card card-amber fade-up",children:[e.jsxs("div",{className:"section-badge",style:{marginBottom:12},children:["Scenario ",o+1]}),e.jsxs("div",{className:"card-title",children:[c.emoji," ",c.title]}),e.jsxs("div",{className:"callout",style:{marginBottom:24},children:[e.jsx("strong",{children:"📋 Scenario:"})," ",c.context]}),c.questions.map((r,m)=>{const h=`${c.id}-q${m}`;return e.jsxs("div",{style:{marginBottom:24,padding:20,background:"var(--paper2)",borderRadius:12,border:"1.5px solid var(--border)"},children:[e.jsxs("div",{style:{fontWeight:800,fontSize:15,marginBottom:12,display:"flex",gap:10,alignItems:"center"},children:[e.jsx("span",{style:{width:26,height:26,borderRadius:"50%",background:"var(--ink)",color:"var(--amber-light)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"DM Mono",fontSize:12,flexShrink:0},children:m+1}),r.q]}),e.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"},children:[e.jsx("input",{className:"ans-input",style:{maxWidth:280,marginBottom:0},placeholder:"Your answer...",value:i[h]||"",onChange:u=>t(f=>({...f,[h]:u.target.value})),onKeyDown:u=>u.key==="Enter"&&d(h,r.correct)}),e.jsx("button",{className:"btn btn-amber",onClick:()=>d(h,r.correct),children:"Check ✓"})]}),n[h]==="correct"&&e.jsxs("div",{className:"ans-feedback ans-correct mt-8",children:["✅ Correct! ",r.correct]}),n[h]==="wrong"&&e.jsxs("div",{className:"ans-feedback ans-wrong mt-8",children:["❌ Not quite. Hint: ",r.hint]})]},h)}),e.jsxs("div",{style:{marginTop:24},children:[e.jsx("div",{className:"card-title",style:{marginBottom:12},children:"💡 Suggested Architecture"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"cb-lang",children:"Keras"}),o===0&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"var",children:"model"})," ",e.jsx("span",{className:"op",children:"="})," ",e.jsx("span",{className:"fn",children:"models.Sequential"}),"([",`
`,"  ",e.jsx("span",{className:"fn",children:"layers.Conv2D"}),"(",e.jsx("span",{className:"num",children:"32"}),", (",e.jsx("span",{className:"num",children:"3"}),",",e.jsx("span",{className:"num",children:"3"}),"), ",e.jsx("span",{className:"var",children:"activation"}),e.jsx("span",{className:"op",children:"="}),e.jsx("span",{className:"str",children:"'relu'"}),", ",e.jsx("span",{className:"var",children:"input_shape"}),e.jsx("span",{className:"op",children:"="}),"(",e.jsx("span",{className:"num",children:"512"}),",",e.jsx("span",{className:"num",children:"512"}),",",e.jsx("span",{className:"num",children:"1"}),")),",`
`,"  ",e.jsx("span",{className:"fn",children:"layers.MaxPooling2D"}),"((",e.jsx("span",{className:"num",children:"2"}),",",e.jsx("span",{className:"num",children:"2"}),")),",`
`,"  ",e.jsx("span",{className:"fn",children:"layers.Conv2D"}),"(",e.jsx("span",{className:"num",children:"64"}),", (",e.jsx("span",{className:"num",children:"3"}),",",e.jsx("span",{className:"num",children:"3"}),"), ",e.jsx("span",{className:"var",children:"activation"}),e.jsx("span",{className:"op",children:"="}),e.jsx("span",{className:"str",children:"'relu'"}),"),",`
`,"  ",e.jsx("span",{className:"fn",children:"layers.MaxPooling2D"}),"((",e.jsx("span",{className:"num",children:"2"}),",",e.jsx("span",{className:"num",children:"2"}),")),",`
`,"  ",e.jsx("span",{className:"fn",children:"layers.Flatten"}),"(),",`
`,"  ",e.jsx("span",{className:"fn",children:"layers.Dense"}),"(",e.jsx("span",{className:"num",children:"128"}),", ",e.jsx("span",{className:"var",children:"activation"}),e.jsx("span",{className:"op",children:"="}),e.jsx("span",{className:"str",children:"'relu'"}),"),",`
`,"  ",e.jsx("span",{className:"fn",children:"layers.Dense"}),"(",e.jsx("span",{className:"num",children:"2"}),", ",e.jsx("span",{className:"var",children:"activation"}),e.jsx("span",{className:"op",children:"="}),e.jsx("span",{className:"str",children:"'softmax'"}),"),   ",e.jsx("span",{className:"cm",children:"# tumor / no tumor"}),`
`,"])",`
`,e.jsx("span",{className:"fn",children:"model.compile"}),"(",e.jsx("span",{className:"var",children:"loss"}),e.jsx("span",{className:"op",children:"="}),e.jsx("span",{className:"str",children:"'categorical_crossentropy'"}),", ",e.jsx("span",{className:"var",children:"optimizer"}),e.jsx("span",{className:"op",children:"="}),e.jsx("span",{className:"str",children:"'adam'"}),")"]}),o===1&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"var",children:"model"})," ",e.jsx("span",{className:"op",children:"="})," ",e.jsx("span",{className:"fn",children:"models.Sequential"}),"([",`
`,"  ",e.jsx("span",{className:"fn",children:"layers.Conv2D"}),"(",e.jsx("span",{className:"num",children:"32"}),", (",e.jsx("span",{className:"num",children:"3"}),",",e.jsx("span",{className:"num",children:"3"}),"), ",e.jsx("span",{className:"var",children:"activation"}),e.jsx("span",{className:"op",children:"="}),e.jsx("span",{className:"str",children:"'relu'"}),", ",e.jsx("span",{className:"var",children:"input_shape"}),e.jsx("span",{className:"op",children:"="}),"(",e.jsx("span",{className:"num",children:"224"}),",",e.jsx("span",{className:"num",children:"224"}),",",e.jsx("span",{className:"num",children:"3"}),")),",`
`,"  ",e.jsx("span",{className:"fn",children:"layers.MaxPooling2D"}),"((",e.jsx("span",{className:"num",children:"2"}),",",e.jsx("span",{className:"num",children:"2"}),")),",`
`,"  ",e.jsx("span",{className:"fn",children:"layers.Conv2D"}),"(",e.jsx("span",{className:"num",children:"64"}),", (",e.jsx("span",{className:"num",children:"3"}),",",e.jsx("span",{className:"num",children:"3"}),"), ",e.jsx("span",{className:"var",children:"activation"}),e.jsx("span",{className:"op",children:"="}),e.jsx("span",{className:"str",children:"'relu'"}),"),",`
`,"  ",e.jsx("span",{className:"fn",children:"layers.MaxPooling2D"}),"((",e.jsx("span",{className:"num",children:"2"}),",",e.jsx("span",{className:"num",children:"2"}),")),",`
`,"  ",e.jsx("span",{className:"fn",children:"layers.Flatten"}),"(),",`
`,"  ",e.jsx("span",{className:"fn",children:"layers.Dense"}),"(",e.jsx("span",{className:"num",children:"128"}),", ",e.jsx("span",{className:"var",children:"activation"}),e.jsx("span",{className:"op",children:"="}),e.jsx("span",{className:"str",children:"'relu'"}),"),",`
`,"  ",e.jsx("span",{className:"fn",children:"layers.Dense"}),"(",e.jsx("span",{className:"num",children:"3"}),", ",e.jsx("span",{className:"var",children:"activation"}),e.jsx("span",{className:"op",children:"="}),e.jsx("span",{className:"str",children:"'softmax'"}),"),   ",e.jsx("span",{className:"cm",children:"# cat, dog, bird"}),`
`,"])",`
`,e.jsx("span",{className:"fn",children:"model.compile"}),"(",e.jsx("span",{className:"var",children:"loss"}),e.jsx("span",{className:"op",children:"="}),e.jsx("span",{className:"str",children:"'categorical_crossentropy'"}),", ",e.jsx("span",{className:"var",children:"optimizer"}),e.jsx("span",{className:"op",children:"="}),e.jsx("span",{className:"str",children:"'adam'"}),")"]}),o===2&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"var",children:"model"})," ",e.jsx("span",{className:"op",children:"="})," ",e.jsx("span",{className:"fn",children:"models.Sequential"}),"([",`
`,"  ",e.jsx("span",{className:"fn",children:"layers.Conv2D"}),"(",e.jsx("span",{className:"num",children:"32"}),", (",e.jsx("span",{className:"num",children:"3"}),",",e.jsx("span",{className:"num",children:"3"}),"), ",e.jsx("span",{className:"var",children:"activation"}),e.jsx("span",{className:"op",children:"="}),e.jsx("span",{className:"str",children:"'relu'"}),", ",e.jsx("span",{className:"var",children:"input_shape"}),e.jsx("span",{className:"op",children:"="}),"(",e.jsx("span",{className:"num",children:"64"}),",",e.jsx("span",{className:"num",children:"64"}),",",e.jsx("span",{className:"num",children:"3"}),")),",`
`,"  ",e.jsx("span",{className:"fn",children:"layers.MaxPooling2D"}),"((",e.jsx("span",{className:"num",children:"2"}),",",e.jsx("span",{className:"num",children:"2"}),")),",`
`,"  ",e.jsx("span",{className:"fn",children:"layers.Conv2D"}),"(",e.jsx("span",{className:"num",children:"64"}),", (",e.jsx("span",{className:"num",children:"3"}),",",e.jsx("span",{className:"num",children:"3"}),"), ",e.jsx("span",{className:"var",children:"activation"}),e.jsx("span",{className:"op",children:"="}),e.jsx("span",{className:"str",children:"'relu'"}),"),",`
`,"  ",e.jsx("span",{className:"fn",children:"layers.MaxPooling2D"}),"((",e.jsx("span",{className:"num",children:"2"}),",",e.jsx("span",{className:"num",children:"2"}),")),",`
`,"  ",e.jsx("span",{className:"fn",children:"layers.Flatten"}),"(),",`
`,"  ",e.jsx("span",{className:"fn",children:"layers.Dense"}),"(",e.jsx("span",{className:"num",children:"256"}),", ",e.jsx("span",{className:"var",children:"activation"}),e.jsx("span",{className:"op",children:"="}),e.jsx("span",{className:"str",children:"'relu'"}),"),",`
`,"  ",e.jsx("span",{className:"fn",children:"layers.Dense"}),"(",e.jsx("span",{className:"num",children:"26"}),", ",e.jsx("span",{className:"var",children:"activation"}),e.jsx("span",{className:"op",children:"="}),e.jsx("span",{className:"str",children:"'softmax'"}),"),   ",e.jsx("span",{className:"cm",children:"# A–Z"}),`
`,"])",`
`,e.jsx("span",{className:"fn",children:"model.compile"}),"(",e.jsx("span",{className:"var",children:"loss"}),e.jsx("span",{className:"op",children:"="}),e.jsx("span",{className:"str",children:"'sparse_categorical_crossentropy'"}),", ",e.jsx("span",{className:"var",children:"optimizer"}),e.jsx("span",{className:"op",children:"="}),e.jsx("span",{className:"str",children:"'adam'"}),")"]})]})]})]})]})},Ie=function(){const[a,o]=v.useState({}),l=t=>o(n=>({...n,[t]:!n[t]})),i=[{id:"conv",title:"Convolution: The Core Operation",content:e.jsxs(e.Fragment,{children:[e.jsx("p",{style:{color:"var(--slate)",lineHeight:1.8,marginBottom:16},children:"A convolution at position (r,c) with a 3×3 kernel K on image I is computed as:"}),e.jsx("div",{className:"formula",children:"output[r][c] = Σᵢ Σⱼ I[r+i][c+j] × K[i][j]"}),e.jsxs("p",{style:{color:"var(--slate)",lineHeight:1.8},children:["The filter slides across the image with a stride (usually 1). Each position produces one output value. With a 5×5 image and 3×3 kernel: output is (5−3+1)×(5−3+1) = ",e.jsx("strong",{children:"3×3"}),"."]}),e.jsx("p",{style:{color:"var(--slate)",lineHeight:1.8,marginTop:8},children:"Each filter learns to detect ONE type of feature. A CNN with 32 filters produces 32 feature maps simultaneously — each showing where a different pattern appears."})]})},{id:"relu",title:"ReLU: Why Non-Linearity Matters",content:e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"formula",children:["ReLU(x) = max(0, x)",`
`,e.jsx("span",{className:"formula-comment",children:"# Negative → 0 | Positive → unchanged"})]}),e.jsx("p",{style:{color:"var(--slate)",lineHeight:1.8,marginTop:12},children:"Without activation functions, stacking multiple layers would be mathematically equivalent to just ONE layer (because the composition of linear functions is linear). ReLU breaks this by introducing non-linearity, allowing the network to learn ANY function given enough neurons."}),e.jsx("p",{style:{color:"var(--slate)",lineHeight:1.8,marginTop:8},children:"ReLU is preferred over sigmoid/tanh because it doesn't suffer from the vanishing gradient problem: gradients stay healthy even in deep networks."})]})},{id:"pool",title:"Max Pooling: Compression with Intelligence",content:e.jsxs(e.Fragment,{children:[e.jsx("p",{style:{color:"var(--slate)",lineHeight:1.8,marginBottom:12},children:"Max pooling over a 2×2 window with stride 2:"}),e.jsx("div",{className:"formula",children:"output[r][c] = max(input[2r][2c], input[2r][2c+1], input[2r+1][2c], input[2r+1][2c+1])"}),e.jsxs("p",{style:{color:"var(--slate)",lineHeight:1.8,marginTop:12},children:["This provides ",e.jsx("strong",{children:"translation invariance"})," — a cat in the top-left of a 2×2 window produces the same pooled value as a cat in the bottom-right. The network becomes less sensitive to exact location, only to presence. Size goes from N×N to (N/2)×(N/2)."]})]})},{id:"training",title:"Training: Backpropagation & Gradient Descent",content:e.jsxs(e.Fragment,{children:[e.jsx("p",{style:{color:"var(--slate)",lineHeight:1.8,marginBottom:12},children:"Training a CNN involves 4 repeated steps:"}),e.jsxs("div",{className:"formula",children:[e.jsx("span",{className:"formula-comment",children:"# 1. Forward pass — compute predictions"}),`
`,"ŷ = CNN(X)",`

`,e.jsx("span",{className:"formula-comment",children:"# 2. Compute loss (how wrong we are)"}),`
`,"Loss = CrossEntropy(ŷ, y)",`

`,e.jsx("span",{className:"formula-comment",children:"# 3. Backpropagation — compute gradients"}),`
`,"∂Loss/∂W for every weight W",`

`,e.jsx("span",{className:"formula-comment",children:"# 4. Update weights (gradient descent)"}),`
`,"W = W − α × (∂Loss/∂W)   "," ",e.jsx("span",{className:"formula-comment",children:"# α = learning rate"})]}),e.jsx("p",{style:{color:"var(--slate)",lineHeight:1.8,marginTop:12},children:'Repeat for all training examples, many epochs. Over time, weights converge to values that minimize the loss — the network "learns" the patterns!'})]})},{id:"dims",title:"Dimension Tracking Cheat Sheet",content:e.jsx(e.Fragment,{children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontFamily:"DM Mono",fontSize:13},children:[e.jsx("thead",{children:e.jsx("tr",{style:{background:"var(--ink)",color:"var(--amber-light)"},children:["Operation","Formula","Example (Input 28×28×1)"].map(t=>e.jsx("th",{style:{padding:"10px 14px"},children:t},t))})}),e.jsx("tbody",{children:[["Conv2D (no pad)","(W−F+1) × (H−F+1) × D","28−3+1=26 → 26×26×32"],["Conv2D (same pad)","W × H × D (unchanged)","28×28×32"],["MaxPool (2×2)","(W/2) × (H/2) × D","26/2=13 → 13×13×32"],["Flatten","W × H × D → single number","13×13×32 = 5,408"],["Dense","output neurons","5408 → 128"],["Output Softmax","num_classes","128 → 10"]].map(([t,n,p],c)=>e.jsxs("tr",{style:{background:c%2===0?"var(--paper2)":"white",borderBottom:"1px solid var(--border)"},children:[e.jsx("td",{style:{padding:"10px 14px",color:"var(--teal)",fontWeight:700},children:t}),e.jsx("td",{style:{padding:"10px 14px",color:"var(--indigo)"},children:n}),e.jsx("td",{style:{padding:"10px 14px",color:"var(--amber-dark)"},children:p})]},c))})]})})}];return e.jsxs("div",{className:"fade-up",children:[e.jsx("div",{className:"section-badge",children:"⬡ SOLUTIONS & REFERENCE"}),e.jsx("div",{className:"section-heading",children:"Complete Solutions & Deep Dives"}),e.jsx("div",{className:"section-desc",children:"Full solutions to all activities plus deep-dive explanations. Use this after attempting the activities yourself — or as a study reference sheet!"}),i.map(t=>e.jsxs("div",{className:"card",style:{marginBottom:16,cursor:"pointer"},onClick:()=>l(t.id),children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsx("div",{className:"card-title",style:{marginBottom:0},children:t.title}),e.jsx("div",{style:{fontSize:22,color:"var(--amber)",transform:a[t.id]?"rotate(180deg)":"none",transition:"transform .2s"},children:"▼"})]}),a[t.id]&&e.jsx("div",{className:"fade-up",style:{marginTop:16},children:t.content})]},t.id)),e.jsxs("div",{className:"card card-teal",children:[e.jsx("div",{className:"card-title",children:"🐍 Complete Working Python Example — MNIST CNN"}),e.jsx("div",{className:"card-sub",children:"This is a fully runnable script that trains a CNN on the MNIST handwritten digit dataset (60,000 training images). Run it in Google Colab for free!"}),e.jsxs("div",{className:"code-block",children:[e.jsx("div",{className:"cb-lang",children:"Python (TensorFlow 2.x)"}),e.jsx("span",{className:"cm",children:"#!/usr/bin/env python3"}),`
`,e.jsx("span",{className:"cm",children:'"""'}),`
`,e.jsx("span",{className:"cm",children:"CNN Class Activity — Complete MNIST Implementation"}),`
`,e.jsx("span",{className:"cm",children:"Expected accuracy: ~99% on test set after 10 epochs"}),`
`,e.jsx("span",{className:"cm",children:'"""'}),`

`,e.jsx("span",{className:"kw",children:"import"})," ",e.jsx("span",{className:"var",children:"numpy"})," ",e.jsx("span",{className:"kw",children:"as"})," ",e.jsx("span",{className:"var",children:"np"}),`
`,e.jsx("span",{className:"kw",children:"import"})," ",e.jsx("span",{className:"var",children:"tensorflow"})," ",e.jsx("span",{className:"kw",children:"as"})," ",e.jsx("span",{className:"var",children:"tf"}),`
`,e.jsx("span",{className:"kw",children:"from"})," ",e.jsx("span",{className:"fn",children:"tensorflow.keras"})," ",e.jsx("span",{className:"kw",children:"import"})," ",e.jsx("span",{className:"var",children:"layers"}),", ",e.jsx("span",{className:"var",children:"models"}),`
`,e.jsx("span",{className:"kw",children:"from"})," ",e.jsx("span",{className:"fn",children:"tensorflow.keras.datasets"})," ",e.jsx("span",{className:"kw",children:"import"})," ",e.jsx("span",{className:"var",children:"mnist"}),`

`,e.jsx("span",{className:"cm",children:"# ─── Step 1: Load & Preprocess Data ───────────────────"}),`
`,e.jsx("span",{className:"cm",children:"# mnist has 60,000 training + 10,000 test images (28×28 grayscale)"}),`
`,e.jsx("span",{className:"op",children:"("}),e.jsx("span",{className:"var",children:"X_train"}),", ",e.jsx("span",{className:"var",children:"y_train"}),e.jsx("span",{className:"op",children:")"}),", ",e.jsx("span",{className:"op",children:"("}),e.jsx("span",{className:"var",children:"X_test"}),", ",e.jsx("span",{className:"var",children:"y_test"}),e.jsx("span",{className:"op",children:")"})," = ",e.jsx("span",{className:"fn",children:"mnist.load_data"}),"()",`

`,e.jsx("span",{className:"cm",children:"# Reshape: add channel dimension (28,28) → (28,28,1)"}),`
`,e.jsx("span",{className:"var",children:"X_train"})," = ",e.jsx("span",{className:"var",children:"X_train"}),".",e.jsx("span",{className:"fn",children:"reshape"}),"(-",e.jsx("span",{className:"num",children:"1"}),", ",e.jsx("span",{className:"num",children:"28"}),", ",e.jsx("span",{className:"num",children:"28"}),", ",e.jsx("span",{className:"num",children:"1"}),").",e.jsx("span",{className:"fn",children:"astype"}),"(",e.jsx("span",{className:"str",children:"'float32'"}),") / ",e.jsx("span",{className:"num",children:"255.0"}),`
`,e.jsx("span",{className:"var",children:"X_test"}),"  = ",e.jsx("span",{className:"var",children:"X_test"}),".",e.jsx("span",{className:"fn",children:"reshape"}),"(-",e.jsx("span",{className:"num",children:"1"}),", ",e.jsx("span",{className:"num",children:"28"}),", ",e.jsx("span",{className:"num",children:"28"}),", ",e.jsx("span",{className:"num",children:"1"}),").",e.jsx("span",{className:"fn",children:"astype"}),"(",e.jsx("span",{className:"str",children:"'float32'"}),") / ",e.jsx("span",{className:"num",children:"255.0"}),`
`,e.jsx("span",{className:"cm",children:"# Normalize pixels 0–255 → 0.0–1.0 for stable training"}),`

`,e.jsx("span",{className:"cm",children:"# ─── Step 2: Build the CNN ────────────────────────────"}),`
`,e.jsx("span",{className:"var",children:"model"})," = ",e.jsx("span",{className:"fn",children:"models.Sequential"}),"(",e.jsx("span",{className:"var",children:"name"}),"=",e.jsx("span",{className:"str",children:'"DigitCNN"'}),")",`

`,e.jsx("span",{className:"cm",children:"# BLOCK 1 — Feature extraction (low-level: edges, curves)"}),`
`,e.jsx("span",{className:"var",children:"model"}),".",e.jsx("span",{className:"fn",children:"add"}),"(",e.jsx("span",{className:"fn",children:"layers.Conv2D"}),"(",e.jsx("span",{className:"num",children:"32"}),", (",e.jsx("span",{className:"num",children:"3"}),",",e.jsx("span",{className:"num",children:"3"}),"), ",e.jsx("span",{className:"var",children:"activation"}),"=",e.jsx("span",{className:"str",children:"'relu'"}),", ",e.jsx("span",{className:"var",children:"input_shape"}),"=(",e.jsx("span",{className:"num",children:"28"}),",",e.jsx("span",{className:"num",children:"28"}),",",e.jsx("span",{className:"num",children:"1"}),")))",e.jsx("br",{}),e.jsx("span",{className:"cm",children:"# Output: 26×26×32 — 32 feature maps detecting different patterns"}),`
`,e.jsx("span",{className:"var",children:"model"}),".",e.jsx("span",{className:"fn",children:"add"}),"(",e.jsx("span",{className:"fn",children:"layers.MaxPooling2D"}),"((",e.jsx("span",{className:"num",children:"2"}),",",e.jsx("span",{className:"num",children:"2"}),")))",e.jsx("br",{}),e.jsx("span",{className:"cm",children:"# Output: 13×13×32 — halved, dominant features kept"}),`

`,e.jsx("span",{className:"cm",children:"# BLOCK 2 — Deeper features (shapes, digit-specific patterns)"}),`
`,e.jsx("span",{className:"var",children:"model"}),".",e.jsx("span",{className:"fn",children:"add"}),"(",e.jsx("span",{className:"fn",children:"layers.Conv2D"}),"(",e.jsx("span",{className:"num",children:"64"}),", (",e.jsx("span",{className:"num",children:"3"}),",",e.jsx("span",{className:"num",children:"3"}),"), ",e.jsx("span",{className:"var",children:"activation"}),"=",e.jsx("span",{className:"str",children:"'relu'"}),"))",e.jsx("br",{}),e.jsx("span",{className:"cm",children:"# Output: 11×11×64 — deeper, more abstract features"}),`
`,e.jsx("span",{className:"var",children:"model"}),".",e.jsx("span",{className:"fn",children:"add"}),"(",e.jsx("span",{className:"fn",children:"layers.MaxPooling2D"}),"((",e.jsx("span",{className:"num",children:"2"}),",",e.jsx("span",{className:"num",children:"2"}),")))",e.jsx("br",{}),e.jsx("span",{className:"cm",children:"# Output: 5×5×64 = 1,600 values"}),`

`,e.jsx("span",{className:"cm",children:"# CLASSIFICATION HEAD — Decide which digit it is"}),`
`,e.jsx("span",{className:"var",children:"model"}),".",e.jsx("span",{className:"fn",children:"add"}),"(",e.jsx("span",{className:"fn",children:"layers.Flatten"}),"())          ",e.jsx("span",{className:"cm",children:"# 1600 values in a row"}),`
`,e.jsx("span",{className:"var",children:"model"}),".",e.jsx("span",{className:"fn",children:"add"}),"(",e.jsx("span",{className:"fn",children:"layers.Dense"}),"(",e.jsx("span",{className:"num",children:"64"}),", ",e.jsx("span",{className:"var",children:"activation"}),"=",e.jsx("span",{className:"str",children:"'relu'"}),"))  ",e.jsx("span",{className:"cm",children:"# combine features"}),`
`,e.jsx("span",{className:"var",children:"model"}),".",e.jsx("span",{className:"fn",children:"add"}),"(",e.jsx("span",{className:"fn",children:"layers.Dense"}),"(",e.jsx("span",{className:"num",children:"10"}),", ",e.jsx("span",{className:"var",children:"activation"}),"=",e.jsx("span",{className:"str",children:"'softmax'"}),")) ",e.jsx("span",{className:"cm",children:"# 10 digits 0–9"}),`

`,e.jsx("span",{className:"cm",children:"# ─── Step 3: Compile ─────────────────────────────────"}),`
`,e.jsx("span",{className:"var",children:"model"}),".",e.jsx("span",{className:"fn",children:"compile"}),"(",`
`,"  ",e.jsx("span",{className:"var",children:"optimizer"}),"=",e.jsx("span",{className:"str",children:"'adam'"}),",            ",e.jsx("span",{className:"cm",children:"# adaptive learning rate optimizer"}),`
`,"  ",e.jsx("span",{className:"var",children:"loss"}),"=",e.jsx("span",{className:"str",children:"'sparse_categorical_crossentropy'"}),",  ",e.jsx("span",{className:"cm",children:"# for integer labels"}),`
`,"  ",e.jsx("span",{className:"var",children:"metrics"}),"=[",e.jsx("span",{className:"str",children:"'accuracy'"}),"]",`
`,")",`

`,e.jsx("span",{className:"var",children:"model"}),".",e.jsx("span",{className:"fn",children:"summary"}),"()  ",e.jsx("span",{className:"cm",children:"# prints layer shapes & parameter counts"}),`

`,e.jsx("span",{className:"cm",children:"# ─── Step 4: Train ───────────────────────────────────"}),`
`,e.jsx("span",{className:"var",children:"history"})," = ",e.jsx("span",{className:"var",children:"model"}),".",e.jsx("span",{className:"fn",children:"fit"}),"(",`
`,"  ",e.jsx("span",{className:"var",children:"X_train"}),", ",e.jsx("span",{className:"var",children:"y_train"}),",",`
`,"  ",e.jsx("span",{className:"var",children:"epochs"}),"=",e.jsx("span",{className:"num",children:"10"}),",         ",e.jsx("span",{className:"cm",children:"# 10 full passes through training data"}),`
`,"  ",e.jsx("span",{className:"var",children:"batch_size"}),"=",e.jsx("span",{className:"num",children:"32"}),",    ",e.jsx("span",{className:"cm",children:"# update weights every 32 images"}),`
`,"  ",e.jsx("span",{className:"var",children:"validation_split"}),"=",e.jsx("span",{className:"num",children:"0.1"}),"  ",e.jsx("span",{className:"cm",children:"# 10% held out for validation"}),`
`,")",`

`,e.jsx("span",{className:"cm",children:"# ─── Step 5: Evaluate & Predict ─────────────────────"}),`
`,e.jsx("span",{className:"var",children:"test_loss"}),", ",e.jsx("span",{className:"var",children:"test_acc"})," = ",e.jsx("span",{className:"var",children:"model"}),".",e.jsx("span",{className:"fn",children:"evaluate"}),"(",e.jsx("span",{className:"var",children:"X_test"}),", ",e.jsx("span",{className:"var",children:"y_test"}),")",`
`,e.jsx("span",{className:"fn",children:"print"}),"(",e.jsx("span",{className:"str",children:'f"Test Accuracy: '}),e.jsx("span",{className:"op",children:"{"}),e.jsx("span",{className:"var",children:"test_acc"}),"*",e.jsx("span",{className:"num",children:"100"}),e.jsx("span",{className:"op",children:":"}),e.jsx("span",{className:"num",children:".2f"}),e.jsx("span",{className:"op",children:"}"}),e.jsx("span",{className:"str",children:'%"'}),")",`

`,e.jsx("span",{className:"cm",children:"# Make a prediction on one image:"}),`
`,e.jsx("span",{className:"var",children:"img"})," = ",e.jsx("span",{className:"var",children:"X_test"}),"[",e.jsx("span",{className:"num",children:"0"}),"].",e.jsx("span",{className:"fn",children:"reshape"}),"(",e.jsx("span",{className:"num",children:"1"}),", ",e.jsx("span",{className:"num",children:"28"}),", ",e.jsx("span",{className:"num",children:"28"}),", ",e.jsx("span",{className:"num",children:"1"}),")   ",e.jsx("span",{className:"cm",children:"# add batch dim"}),`
`,e.jsx("span",{className:"var",children:"probs"})," = ",e.jsx("span",{className:"var",children:"model"}),".",e.jsx("span",{className:"fn",children:"predict"}),"(",e.jsx("span",{className:"var",children:"img"}),")[",e.jsx("span",{className:"num",children:"0"}),"]                ",e.jsx("span",{className:"cm",children:"# 10 probabilities"}),`
`,e.jsx("span",{className:"fn",children:"print"}),"(",e.jsx("span",{className:"str",children:'f"Predicted: '}),e.jsx("span",{className:"op",children:"{"}),e.jsx("span",{className:"fn",children:"np.argmax"}),"(",e.jsx("span",{className:"var",children:"probs"}),")",e.jsx("span",{className:"op",children:"}"}),e.jsx("span",{className:"str",children:", Confidence: "}),e.jsx("span",{className:"op",children:"{"}),e.jsx("span",{className:"fn",children:"max"}),"(",e.jsx("span",{className:"var",children:"probs"}),")*",e.jsx("span",{className:"num",children:"100"}),e.jsx("span",{className:"op",children:":"}),e.jsx("span",{className:"num",children:".1f"}),e.jsx("span",{className:"op",children:"}"}),e.jsx("span",{className:"str",children:'%"'}),")"]})]})]})},Fe=function({setSection:a}){return e.jsxs("div",{className:"fade-up",children:[e.jsx("div",{className:"section-badge",children:"⬡ CLASS ACTIVITY GUIDE"}),e.jsx("div",{className:"section-heading",children:"CNN Implementation — Class Activities"}),e.jsx("div",{className:"section-desc",children:"Five hands-on activities designed for a 90-minute class session. Each activity builds on the last, taking you from understanding individual operations all the way to designing complete CNN architectures for real-world problems. Work individually or in pairs!"}),e.jsxs("div",{className:"card card-amber",children:[e.jsx("div",{className:"card-title",children:"⏱️ Session At a Glance (90 min)"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12,marginTop:8},children:[{time:"0–10 min",label:"Warm-up",color:"var(--indigo-light)",tc:"var(--indigo)"},{time:"10–30 min",label:`Activity 1
Convolution`,color:"var(--amber-light)",tc:"var(--amber-dark)"},{time:"30–45 min",label:`Activity 2
ReLU + Pool`,color:"var(--rose-light)",tc:"var(--rose)"},{time:"45–55 min",label:`Activity 3
Math by Hand`,color:"var(--teal-light)",tc:"var(--teal)"},{time:"55–75 min",label:`Activity 4
Build a CNN`,color:"var(--indigo-light)",tc:"var(--indigo)"},{time:"75–90 min",label:`Activity 5
Challenge`,color:"var(--amber-light)",tc:"var(--amber-dark)"}].map((o,l)=>e.jsxs("div",{style:{background:o.color,borderRadius:10,padding:"12px 14px",textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:"DM Mono",fontSize:10,color:o.tc,marginBottom:4},children:o.time}),e.jsx("div",{style:{fontWeight:800,fontSize:13,color:o.tc,whiteSpace:"pre-wrap"},children:o.label})]},l))})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20,marginTop:8},children:[{id:"a1",emoji:"🔬",title:"Activity 1: Convolution Explorer",time:"20 min",diff:"⭐⭐",desc:"Interactively slide kernels over letter images. See exactly what convolution does — try 4 different kernels (edge, vertical, horizontal, blur) and inspect the dot-product calculation cell by cell.",skills:["Dot product","Feature maps","Stride & padding"]},{id:"a2",emoji:"⚡",title:"Activity 2: ReLU + Max Pooling",time:"15 min",diff:"⭐⭐",desc:"Apply ReLU to a 4×4 feature map and watch negatives vanish. Then compute max pooling by clicking each 2×2 region and entering the maximum — building up the pooled output yourself.",skills:["ReLU formula","Max pooling","Dimension reduction"]},{id:"a3",emoji:"🧮",title:"Activity 3: Math by Hand",time:"10 min",diff:"⭐⭐⭐",desc:"Three calculation problems: neuron forward pass (weights, bias, ReLU), Softmax probabilities (exponentials), and feature map size tracking. Step-by-step hints + solutions available.",skills:["Weighted sum","Softmax","Output dimensions"]},{id:"a4",emoji:"🎨",title:"Activity 4: Build Your CNN",time:"20 min",diff:"⭐⭐⭐",desc:"Drag layers from a toolbox to construct a complete CNN architecture. The evaluator scores your design and gives feedback: 'Missing flatten!', 'ReLU must follow Conv2D!', etc.",skills:["Architecture design","Layer ordering","Keras code"]},{id:"a5",emoji:"🏁",title:"Activity 5: Real-World Challenge",time:"15 min",diff:"⭐⭐⭐⭐",desc:"Three real-world scenarios: medical X-rays, pet classifier, and sign language recognition. Design the correct input shapes, output neurons, and loss functions for each unique problem.",skills:["Input shape","Output classes","Loss functions"]}].map(o=>e.jsxs("div",{className:"card",style:{cursor:"pointer",transition:"all .2s"},onClick:()=>a(o.id),onMouseEnter:l=>{l.currentTarget.style.transform="translateY(-4px)",l.currentTarget.style.boxShadow="0 12px 32px rgba(0,0,0,.15)"},onMouseLeave:l=>{l.currentTarget.style.transform="none",l.currentTarget.style.boxShadow=""},children:[e.jsx("div",{style:{fontSize:32,marginBottom:10},children:o.emoji}),e.jsx("div",{style:{fontWeight:800,fontSize:16,marginBottom:6},children:o.title}),e.jsxs("div",{style:{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"},children:[e.jsxs("span",{className:"tag tag-amber",children:["⏱ ",o.time]}),e.jsxs("span",{className:"tag tag-ink",children:[o.diff," Difficulty"]})]}),e.jsx("p",{style:{fontSize:13,color:"var(--slate)",lineHeight:1.7,marginBottom:12},children:o.desc}),e.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap"},children:o.skills.map(l=>e.jsx("span",{className:"tag tag-teal",children:l},l))}),e.jsx("div",{style:{marginTop:14,color:"var(--amber-dark)",fontWeight:700,fontSize:13},children:"Start Activity →"})]},o.id))}),e.jsxs("div",{className:"card card-teal",style:{marginTop:8},children:[e.jsx("div",{className:"card-title",children:"🎯 Learning Objectives"}),e.jsx("div",{className:"info-grid",children:[{emoji:"🔢",title:"Understand Convolution",body:"Explain what a kernel does and manually compute a 3×3 convolution output value."},{emoji:"⚡",title:"Apply Activations",body:"Apply ReLU to any input and explain why it is necessary for deep networks."},{emoji:"📐",title:"Track Dimensions",body:"Calculate output dimensions after Conv, Pool, and Flatten operations."},{emoji:"🏗️",title:"Design Architectures",body:"Assemble a valid CNN layer sequence and justify each design choice."},{emoji:"🌍",title:"Generalize to Problems",body:"Map real-world tasks (medical, classification) to correct CNN parameters."},{emoji:"🐍",title:"Read CNN Code",body:"Read and understand a Keras CNN implementation and trace the data flow."}].map(o=>e.jsxs("div",{className:"ibox",children:[e.jsx("div",{className:"ibox-icon",children:o.emoji}),e.jsx("div",{className:"ibox-title",children:o.title}),e.jsx("div",{className:"ibox-body",children:o.body})]},o.title))})]})]})},Ee=function(){const[a,o]=v.useState("overview"),[l,i]=v.useState(new Set),t=c=>i(d=>new Set([...d,c])),n={overview:e.jsx(Fe,{setSection:o}),a1:e.jsx(ze,{}),a2:e.jsx(Te,{}),a3:e.jsx(Ae,{}),a4:e.jsx(Le,{}),a5:e.jsx(Me,{}),solutions:e.jsx(Ie,{})},p=["a1","a2","a3","a4","a5"];return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:Se}),e.jsxs("div",{className:"app",children:[e.jsx("header",{className:"header",children:e.jsxs("div",{className:"header-inner",children:[e.jsx("div",{children:e.jsxs("div",{className:"logo",children:["CNN Class Activities",e.jsx("span",{children:"Convolutional Neural Networks — Hands-On Implementation"})]})}),e.jsxs("div",{className:"progress-track",children:[p.map((c,d)=>e.jsx("div",{className:`pt-dot ${a===c?"active":l.has(c)?"done":""}`,onClick:()=>o(c),children:l.has(c)?"✓":d+1},c)),e.jsxs("div",{style:{fontSize:12,color:"#94a3b8",fontFamily:"DM Mono",marginLeft:6},children:[l.size,"/",p.length," done"]})]})]})}),e.jsxs("main",{className:"main",children:[e.jsx("nav",{className:"activity-nav",children:ke.map(c=>e.jsxs("button",{className:`anav-btn ${a===c.id?"active":""}`,onClick:()=>{o(c.id),p.includes(c.id)&&t(c.id)},children:[e.jsx("span",{children:c.emoji})," ",c.label]},c.id))}),e.jsx("div",{children:n[a]},a)]})]})]})},s={bg:"#0e0a06",dark:"#150f08",surface:"#1c1409",card:"#221a0d",border:"#4a3515",amber:"#f0a500",amberL:"#ffd166",amberD:"#8a5e00",cream:"#ede0c0",rust:"#e05c2a",rustL:"#ff8c5a",sage:"#6ab87a",sky:"#5ab8d4",lavender:"#c09fff",red:"#ff4444",text:"#d4c4a0",textS:"#8a7555",textD:"#4a3a25",mono:"'Courier New', monospace",serif:"'Georgia', serif",conv:"#f0a500",relu:"#e05c2a",pool:"#6ab87a",fc:"#5ab8d4",out:"#c09fff"},xe=[[30,30,200,220,220,220,220,200,30,30],[30,200,240,245,245,245,245,240,200,30],[200,245,20,245,245,245,245,20,245,200],[200,245,245,245,245,245,245,245,245,200],[220,245,245,40,40,245,40,40,245,220],[220,245,245,245,20,20,245,245,245,220],[220,245,245,245,245,245,245,245,245,220],[200,220,245,245,245,245,245,245,220,200],[30,200,220,245,245,245,245,220,200,30],[30,30,200,200,220,220,200,200,30,30]],L=[[200,220,245,245,220,200],[220,245,20,245,20,245],[245,245,245,245,245,245],[245,245,40,20,245,245],[220,245,245,245,245,220],[200,220,245,245,220,200]],O={edge:{name:"Edge Detector",vals:[[-1,-1,-1],[-1,8,-1],[-1,-1,-1]],desc:"Highlights sharp boundaries where pixel values change suddenly. Finds edges of the dog's ears, eyes, and outline.",color:s.conv},blur:{name:"Blur / Smooth",vals:[[1/9,1/9,1/9],[1/9,1/9,1/9],[1/9,1/9,1/9]],desc:"Averages surrounding pixels together. Reduces noise. Used in early preprocessing stages.",color:s.sky},sharpen:{name:"Sharpen",vals:[[0,-1,0],[-1,5,-1],[0,-1,0]],desc:"Enhances fine detail by amplifying differences from neighbors. Makes the dog's fur texture more prominent.",color:s.rustL},vertical:{name:"Vertical Edge",vals:[[-1,0,1],[-1,0,1],[-1,0,1]],desc:"Detects vertical lines only. Finds vertical boundaries like the sides of the dog's face.",color:s.sage}},ge=g=>Math.max(0,g),ee=(g,a,o)=>Math.max(a,Math.min(o,g)),H=g=>{const a=ee(Math.round(g),0,255);return"rgb("+a+","+a+","+a+")"},se=(g,a,o,l)=>{let i=0;for(let t=0;t<3;t++)for(let n=0;n<3;n++)i+=g[o+t][l+n]*a[t][n];return i},G=(g,a)=>{const o=g.length-2,l=g[0].length-2;return Array.from({length:o},(i,t)=>Array.from({length:l},(n,p)=>se(g,a,t,p)))},ue=g=>g.map(a=>a.map(ge)),q=g=>{const a=Math.floor(g.length/2),o=Math.floor(g[0].length/2);return Array.from({length:a},(l,i)=>Array.from({length:o},(t,n)=>Math.max(g[2*i][2*n],g[2*i][2*n+1],g[2*i+1][2*n],g[2*i+1][2*n+1])))},I=(g,a=2)=>Number(g).toFixed(a),k=({children:g,color:a=s.amber,style:o={}})=>e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,letterSpacing:3,color:a,marginBottom:6,...o},children:g}),W=({icon:g,title:a,body:o,color:l=s.amber})=>e.jsxs("div",{style:{background:l+"0a",border:"1px solid "+l+"33",borderLeft:"3px solid "+l,borderRadius:6,padding:"12px 16px",margin:"10px 0"},children:[e.jsxs("div",{style:{fontFamily:s.mono,fontSize:9,color:l,letterSpacing:2,marginBottom:6},children:[g," ",a]}),e.jsx("div",{style:{color:s.text,fontSize:13,lineHeight:1.75},children:o})]}),_=({title:g,lines:a,note:o,color:l=s.amber})=>e.jsxs("div",{style:{margin:"10px 0"},children:[g&&e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:l,letterSpacing:3,borderBottom:"1px solid "+l+"33",paddingBottom:4},children:g}),e.jsx("pre",{style:{background:"#080602",border:"1px solid "+l+"33",borderTop:g?"none":void 0,borderRadius:g?"0 0 6px 6px":6,margin:0,padding:"12px 16px",fontFamily:s.mono,fontSize:12,color:s.cream,lineHeight:1.9,overflowX:"auto",whiteSpace:"pre"},children:a}),o&&e.jsx("div",{style:{fontFamily:s.mono,fontSize:10,color:s.textS,padding:"5px 10px",background:l+"08",borderRadius:"0 0 4px 4px"},children:o})]}),R=function({grid:a,cellSize:o=24,highlight:l=null,highlightColor:i=s.amber,normalize:t=!1,showVals:n=!1}){if(!a||!a.length)return null;const p=a.flat(),c=Math.min(...p),d=Math.max(...p),r=m=>d===c?128:Math.round((m-c)/(d-c)*255);return e.jsx("div",{style:{display:"inline-block",border:"1px solid "+s.border,borderRadius:4,overflow:"hidden",lineHeight:0},children:a.map((m,h)=>e.jsx("div",{style:{display:"flex"},children:m.map((u,f)=>{const j=l&&h>=l.r&&h<l.r+l.size&&f>=l.c&&f<l.c+l.size,y=t?r(u):ee(Math.round(Math.abs(u)),0,255);return e.jsx("div",{style:{width:o,height:o,background:H(y),border:j?"2px solid "+i:"1px solid "+(y<128?"#ffffff18":"#00000018"),display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box",position:"relative",zIndex:j?2:1,outline:j?"1px solid "+i:"none"},children:n&&e.jsx("span",{style:{fontFamily:s.mono,fontSize:7,color:y>128?"#000":"#fff",lineHeight:1},children:Math.round(u)})},f)})},h))})},Pe=function(){const[a,o]=v.useState(null),l=[{year:"1943",name:"McCulloch-Pitts Neuron",desc:"First mathematical model of a biological neuron. Warren McCulloch and Walter Pitts showed neurons could compute logical functions.",color:s.textS},{year:"1958",name:"Perceptron",desc:"Frank Rosenblatt's perceptron — the first trainable machine learning model. Could classify simple patterns.",color:s.textS},{year:"1980",name:"Neocognitron",desc:"Kunihiko Fukushima designed the Neocognitron — a hierarchical neural network inspired by the visual cortex. The direct ancestor of CNNs.",color:s.amberD},{year:"1989",name:"LeNet — Yann LeCun",desc:"LeCun applied backpropagation to train convolutional networks for handwritten digit recognition (MNIST). First practical CNN! Used by banks to read cheques.",color:s.amber},{year:"1998",name:"LeNet-5",desc:"Improved LeNet-5 paper published. Established the now-classic CONV→POOL→CONV→POOL→FC architecture that forms the basis of modern CNNs.",color:s.amber},{year:"2012",name:"AlexNet — ImageNet Revolution",desc:"Alex Krizhevsky's AlexNet won ImageNet with 15.3% error vs 26.2% for previous best. Used GPUs, ReLU, and dropout. CNNs went mainstream overnight.",color:s.rustL},{year:"2014",name:"VGGNet & GoogLeNet",desc:"VGG (Oxford) showed depth matters — 16-19 layers. Google's Inception module ran multiple filter sizes in parallel. Error rate fell to 6.7%.",color:s.rustL},{year:"2015",name:"ResNet — 152 layers!",desc:"Microsoft's ResNet introduced skip connections to train extremely deep networks. Beat human-level performance on ImageNet at 3.57% error!",color:s.red},{year:"2020+",name:"Vision Transformers & CNNs",desc:"Transformers challenged CNN dominance. Today hybrid models combine both. CNNs remain the gold standard for real-time embedded vision tasks.",color:s.lavender}],i=[{icon:"📷",title:"Images are HUGE",body:"A 224×224 RGB image has 150,528 pixels. A traditional network would need millions of connections just for one layer — impossibly slow. CNNs share weights across the image, needing far fewer parameters.",color:s.amber},{icon:"🔍",title:"Spatial patterns exist",body:"A cat's ear looks the same whether it's top-left or bottom-right of an image. CNNs exploit this with weight sharing — the same filter scans every location.",color:s.rust},{icon:"🏗️",title:"Hierarchy of features",body:"Edge detectors → shape detectors → part detectors → object detectors. CNNs naturally learn this hierarchy layer by layer, just like our visual cortex.",color:s.sage},{icon:"⚡",title:"Incredibly efficient",body:"Modern CNNs can classify a 1080p image in milliseconds on a phone chip. Real-time object detection, facial recognition, medical imaging — all possible.",color:s.sky}];return e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:24},children:[e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.amberD,letterSpacing:4,marginBottom:8},children:"MODULE 01 / OVERVIEW"}),e.jsx("div",{style:{fontFamily:s.serif,fontSize:28,color:s.cream,lineHeight:1.2,marginBottom:10},children:"Convolutional Neural Networks"}),e.jsxs("div",{style:{color:s.textS,fontSize:13,lineHeight:1.7,maxWidth:680},children:["CNNs are the architecture that taught computers to truly ",e.jsx("em",{children:"see"}),". They process images the way your visual cortex does — detecting edges first, then shapes, then objects."]})]}),e.jsx(W,{icon:"🐕",title:"OUR LEARNING EXAMPLE",color:s.amber,body:"We'll follow a DOG IMAGE through every stage of a CNN — from raw pixels to the final prediction 'This is a dog!' Every calculation will be shown with real numbers."}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:24},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{background:s.card,border:"1px solid "+s.border,borderRadius:10,padding:20,marginBottom:16},children:[e.jsx(k,{color:s.amber,children:"🧠 WHAT IS A CNN?"}),e.jsxs("div",{style:{color:s.text,fontSize:13,lineHeight:1.75},children:["A ",e.jsx("strong",{style:{color:s.amberL},children:"Convolutional Neural Network"})," is a special type of neural network designed specifically for grid-like data — especially images.",e.jsx("br",{}),e.jsx("br",{}),"Instead of connecting every neuron to every pixel (which would be billions of connections!), CNNs use small ",e.jsx("strong",{style:{color:s.rust},children:"filters"})," (also called kernels) that slide across the image, detecting patterns like edges, textures, and shapes.",e.jsx("br",{}),e.jsx("br",{}),"This is similar to how your eye's retina processes visual information — local regions of cells respond to local regions of the visual field."]})]}),e.jsxs("div",{style:{background:s.card,border:"1px solid "+s.border,borderRadius:10,padding:20},children:[e.jsx(k,{color:s.rust,children:"👁️ HUMAN VISION vs CNN"}),[["Your retina","Detects local patches of light/dark",s.textS],["V1 cortex","Detects edges at various orientations",s.amberD],["V2 cortex","Detects corners and curves",s.amber],["Inferotemporal","Recognizes complete objects",s.rustL]].map(([t,n,p])=>e.jsxs("div",{style:{display:"flex",gap:10,padding:"7px 0",borderBottom:"1px solid "+s.border,alignItems:"flex-start"},children:[e.jsx("div",{style:{width:5,height:5,borderRadius:"50%",background:p,marginTop:5,flexShrink:0}}),e.jsxs("div",{children:[e.jsxs("span",{style:{color:p,fontFamily:s.mono,fontSize:10},children:[t,": "]}),e.jsx("span",{style:{color:s.text,fontSize:12},children:n})]})]},t)),e.jsx("div",{style:{marginTop:10,fontFamily:s.mono,fontSize:10,color:s.amberD,letterSpacing:2},children:"↓ MAPS TO CNN LAYERS ↓"}),[["CONV Layer 1","Detects edges and color gradients",s.amberD],["CONV Layer 2","Detects corners, textures, patterns",s.amber],["CONV Layer 3+","Detects object parts (ears, eyes, fur)",s.rustL],["Fully Connected","Classifies: 'This is a dog!'",s.sky]].map(([t,n,p])=>e.jsxs("div",{style:{display:"flex",gap:10,padding:"7px 0",borderBottom:"1px solid "+s.border,alignItems:"flex-start"},children:[e.jsx("div",{style:{width:5,height:5,borderRadius:"50%",background:p,marginTop:5,flexShrink:0}}),e.jsxs("div",{children:[e.jsxs("span",{style:{color:p,fontFamily:s.mono,fontSize:10},children:[t,": "]}),e.jsx("span",{style:{color:s.text,fontSize:12},children:n})]})]},t))]})]}),e.jsx("div",{children:e.jsxs("div",{style:{background:s.card,border:"1px solid "+s.border,borderRadius:10,padding:20,marginBottom:16},children:[e.jsx(k,{color:s.sage,children:"✅ WHY CNNs WORK SO WELL"}),i.map(t=>e.jsxs("div",{style:{background:s.surface,border:"1px solid "+s.border,borderRadius:7,padding:12,marginBottom:10},children:[e.jsx("div",{style:{fontSize:20,marginBottom:6},children:t.icon}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:10,color:t.color,letterSpacing:1,marginBottom:4},children:t.title}),e.jsx("div",{style:{color:s.textS,fontSize:12,lineHeight:1.6},children:t.body})]},t.title))]})})]}),e.jsxs("div",{style:{background:s.card,border:"1px solid "+s.border,borderRadius:10,padding:20},children:[e.jsx(k,{color:s.amberL,children:"📅 HISTORY OF CNNs — CLICK ANY ERA"}),e.jsx("div",{style:{display:"flex",gap:0,overflowX:"auto",marginTop:12,paddingBottom:8},children:l.map((t,n)=>e.jsxs("div",{onClick:()=>o(a===n?null:n),style:{minWidth:80,cursor:"pointer",textAlign:"center",flexShrink:0},children:[e.jsx("div",{style:{height:4,background:a===n?s.amber:t.color,transition:"all 0.2s",marginBottom:6,borderRadius:2}}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:a===n?s.amber:s.textD,letterSpacing:1,marginBottom:3},children:t.year}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:8,color:a===n?s.amberL:s.textS,lineHeight:1.4},children:t.name.split("—")[0]})]},n))}),a!==null&&e.jsxs("div",{style:{background:s.surface,border:"1px solid "+s.amber+"55",borderRadius:8,padding:14,marginTop:12},children:[e.jsxs("div",{style:{fontFamily:s.mono,fontSize:10,color:s.amber,marginBottom:6},children:[l[a].year," — ",l[a].name]}),e.jsx("div",{style:{color:s.text,fontSize:13,lineHeight:1.7},children:l[a].desc})]})]})]})},Oe=function(){const[a,o]=v.useState(!1),[l,i]=v.useState(null),t=44;return e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.amberD,letterSpacing:4,marginBottom:8},children:"MODULE 02 / THE IMAGE"}),e.jsx("div",{style:{fontFamily:s.serif,fontSize:26,color:s.cream,marginBottom:8},children:"How Computers See Images"}),e.jsx("div",{style:{color:s.textS,fontSize:13,lineHeight:1.7},children:"Computers don't see a dog — they see a grid of numbers. Understanding this is the foundation of everything in CNNs."})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"auto 1fr",gap:28,alignItems:"start"},children:[e.jsxs("div",{children:[e.jsx(k,{color:s.amber,children:"OUR DOG IMAGE (10×10 pixels, grayscale)"}),e.jsxs("div",{style:{position:"relative",marginBottom:12},children:[e.jsx("div",{style:{display:"inline-block",border:"2px solid "+s.amber,borderRadius:6,overflow:"hidden",lineHeight:0},children:xe.map((n,p)=>e.jsx("div",{style:{display:"flex"},children:n.map((c,d)=>e.jsx("div",{onMouseEnter:()=>i({r:p,c:d,val:c}),onMouseLeave:()=>i(null),style:{width:t,height:t,background:H(c),border:l&&l.r===p&&l.c===d?"2px solid "+s.amber:"1px solid #ffffff10",boxSizing:"border-box",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"border 0.1s"},children:a&&e.jsx("span",{style:{fontFamily:s.mono,fontSize:8,color:c>128?"#000":"#fff",fontWeight:"bold"},children:c})},d))},p))}),l&&e.jsx("div",{style:{position:"absolute",top:-40,left:0,background:s.card,border:"1px solid "+s.amber,borderRadius:6,padding:"4px 10px",fontFamily:s.mono,fontSize:10,color:s.amber,whiteSpace:"nowrap"},children:"Pixel ["+l.r+","+l.c+"] = "+l.val+" — "+(l.val<80?"Very Dark (fur/outline)":l.val<180?"Gray (fur/ears)":"Bright (face)")})]}),e.jsxs("button",{onClick:()=>o(n=>!n),style:{padding:"7px 16px",fontFamily:s.mono,fontSize:10,letterSpacing:2,background:a?s.amber+"22":s.card,border:"1px solid "+(a?s.amber:s.border),color:a?s.amber:s.textS,borderRadius:5,cursor:"pointer"},children:[a?"HIDE":"SHOW"," PIXEL VALUES"]})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{background:s.card,border:"1px solid "+s.border,borderRadius:10,padding:18,marginBottom:14},children:[e.jsx(k,{color:s.amber,children:"🔢 IMAGES ARE JUST NUMBERS"}),e.jsxs("div",{style:{color:s.text,fontSize:13,lineHeight:1.75,marginBottom:14},children:["Every pixel in a grayscale image is a single number from ",e.jsx("strong",{style:{color:s.amberL},children:"0"})," (pure black) to ",e.jsx("strong",{style:{color:s.amberL},children:"255"})," (pure white). Our 10×10 dog image is just a 10×10 grid of numbers!"]}),e.jsx(_,{color:s.amber,title:"PIXEL VALUE MEANINGS",lines:`  0   = ■ Pure black  (dog outline, pupils)
128  = ▨ Mid gray    (dog ears, darker fur)
200  = □ Light gray  (dog face)
245  = □ Near white  (bright face areas)`})]}),e.jsxs("div",{style:{background:s.card,border:"1px solid "+s.border,borderRadius:10,padding:18,marginBottom:14},children:[e.jsx(k,{color:s.rust,children:"🎨 REAL IMAGES: RGB COLOR"}),e.jsxs("div",{style:{color:s.text,fontSize:13,lineHeight:1.75,marginBottom:12},children:["Real color photos have ",e.jsx("strong",{style:{color:s.rustL},children:"3 channels"})," — Red, Green, Blue. Each pixel gets 3 numbers. A 224×224 color photo contains:"]}),e.jsx(_,{color:s.rust,lines:`224 × 224 pixels × 3 channels = 150,528 numbers!

Each channel: 0–255 (intensity of that color)
Red=255, Green=0, Blue=0 → Pure Red
Red=0, Green=0, Blue=255 → Pure Blue
Red=255, Green=255, Blue=0 → Yellow`})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10},children:[{col:"#ff4444",lbl:`RED
channel`,v:200},{col:"#44ff44",lbl:`GREEN
channel`,v:120},{col:"#4444ff",lbl:`BLUE
channel`,v:50}].map(n=>e.jsxs("div",{style:{background:s.surface,border:"1px solid "+s.border,borderRadius:7,padding:10,textAlign:"center"},children:[e.jsx("div",{style:{width:36,height:36,borderRadius:4,background:n.col,margin:"0 auto 8px",opacity:n.v/255}}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:8,color:s.textS,whiteSpace:"pre",marginBottom:4},children:n.lbl}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:14,color:s.cream},children:n.v})]},n.lbl))}),e.jsxs("div",{style:{background:s.surface,border:"1px solid "+s.sage+"44",borderRadius:8,padding:14,marginTop:14},children:[e.jsx(k,{color:s.sage,children:"💡 WHY GRAYSCALE FOR LEARNING?"}),e.jsx("div",{style:{color:s.text,fontSize:12,lineHeight:1.6},children:"We use grayscale (1 channel) to keep the math simple and visual. CNN filters work identically on color images — just applied separately to each R, G, B channel."})]})]})]})]})},De=function(){const[a,o]=v.useState("edge"),[l,i]=v.useState({r:0,c:0}),[t,n]=v.useState(!1),[p,c]=v.useState(!0),d=v.useRef(null),r=O[a],m=r.vals,h=L.length-3,u=L[0].length-3,f=G(L,m),j=v.useCallback(()=>{i(w=>{let{r:x,c:b}=w;return b++,b>u&&(b=0,x++),x>h&&(x=0,b=0),{r:x,c:b}})},[h,u]);v.useEffect(()=>(t?d.current=setInterval(j,500):clearInterval(d.current),()=>clearInterval(d.current)),[t,j]);const y=Array.from({length:3},(w,x)=>Array.from({length:3},(b,S)=>L[l.r+x][l.c+S])),N=Array.from({length:3},(w,x)=>Array.from({length:3},(b,S)=>y[x][S]*m[x][S])),C=N.flat().reduce((w,x)=>w+x,0),z=ge(C),M=(w=>{const x=w.flat(),b=Math.min(...x),S=Math.max(...x);return S===b?w.map(D=>D.map(()=>128)):w.map(D=>D.map(V=>Math.round((V-b)/(S-b)*255)))})(f);return e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.amberD,letterSpacing:4,marginBottom:8},children:"MODULE 03 / CONVOLUTION"}),e.jsx("div",{style:{fontFamily:s.serif,fontSize:26,color:s.cream,marginBottom:8},children:"The Convolution Operation"}),e.jsx("div",{style:{color:s.textS,fontSize:13,lineHeight:1.7},children:"The heart of every CNN. A small filter slides across the entire image, performing the same multiplication-and-sum at every position."})]}),e.jsx(W,{icon:"📐",title:"THE CORE IDEA",color:s.amber,body:"A filter (kernel) is a tiny grid of numbers — usually 3×3. We place it on part of the image, multiply each filter value by the corresponding pixel, add them all up. That sum becomes one pixel in the output (feature map). Then we slide the filter one step and repeat."}),e.jsx("div",{style:{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"},children:Object.entries(O).map(([w,x])=>e.jsx("button",{onClick:()=>{o(w),i({r:0,c:0}),n(!1)},style:{padding:"8px 14px",fontFamily:s.mono,fontSize:10,letterSpacing:1,background:a===w?x.color+"22":s.card,border:"1px solid "+(a===w?x.color:s.border),color:a===w?x.color:s.textS,borderRadius:6,cursor:"pointer"},children:x.name},w))}),e.jsx("div",{style:{background:s.card,border:"1px solid "+s.border,borderRadius:10,padding:18,marginBottom:16},children:e.jsx("div",{style:{color:s.text,fontSize:13,lineHeight:1.65,marginBottom:10},children:r.desc})}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"auto auto auto auto",gap:24,alignItems:"start",justifyContent:"start",marginBottom:20},children:[e.jsxs("div",{children:[e.jsx(k,{color:s.sky,children:"INPUT IMAGE (6×6)"}),e.jsx(R,{grid:L,cellSize:38,highlight:{r:l.r,c:l.c,size:3},highlightColor:r.color,showVals:!0}),e.jsx("div",{style:{marginTop:8,fontFamily:s.mono,fontSize:9,color:s.textS},children:"Position: row="+l.r+" col="+l.c})]}),e.jsxs("div",{children:[e.jsx(k,{color:r.color,children:"FILTER / KERNEL (3×3)"}),e.jsx("div",{style:{display:"inline-block",border:"2px solid "+r.color,borderRadius:6,overflow:"hidden",lineHeight:0},children:m.map((w,x)=>e.jsx("div",{style:{display:"flex"},children:w.map((b,S)=>e.jsx("div",{style:{width:38,height:38,background:b>0?"rgb("+Math.round(b*30+10)+","+Math.round(b*20)+",0)":b<0?"rgb("+Math.round(-b*30)+",0,0)":s.surface,border:"1px solid "+s.border,display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box"},children:e.jsx("span",{style:{fontFamily:s.mono,fontSize:10,color:s.cream,fontWeight:"bold"},children:b%1===0?b:I(b,2)})},S))},x))}),e.jsx("div",{style:{marginTop:8,fontFamily:s.mono,fontSize:9,color:r.color},children:"Learned parameters!"})]}),e.jsx("div",{style:{paddingTop:60,fontSize:28,color:s.amber},children:"→"}),e.jsxs("div",{children:[e.jsx(k,{color:s.sage,children:"FEATURE MAP (4×4 output)"}),e.jsx("div",{style:{display:"inline-block",border:"2px solid "+s.sage,borderRadius:6,overflow:"hidden",lineHeight:0},children:M.map((w,x)=>e.jsx("div",{style:{display:"flex"},children:w.map((b,S)=>e.jsx("div",{style:{width:38,height:38,background:H(b),border:x===l.r&&S===l.c?"2px solid "+s.sage:"1px solid "+(b>128?"#00000018":"#ffffff18"),boxSizing:"border-box",display:"flex",alignItems:"center",justifyContent:"center"},children:x===l.r&&S===l.c&&e.jsx("div",{style:{width:8,height:8,borderRadius:"50%",background:s.sage}})},S))},x))}),e.jsx("div",{style:{marginTop:8,fontFamily:s.mono,fontSize:9,color:s.sage},children:"Bright = strong response"})]})]}),e.jsxs("div",{style:{display:"flex",gap:10,marginBottom:20,alignItems:"center",flexWrap:"wrap"},children:[e.jsx("button",{onClick:()=>{i({r:0,c:0}),n(!1)},style:{padding:"8px 16px",fontFamily:s.mono,fontSize:10,background:s.surface,border:"1px solid "+s.border,color:s.textS,borderRadius:5,cursor:"pointer",letterSpacing:1},children:"↺ RESET"}),e.jsx("button",{onClick:j,style:{padding:"8px 16px",fontFamily:s.mono,fontSize:10,background:s.card,border:"1px solid "+s.amber,color:s.amber,borderRadius:5,cursor:"pointer",letterSpacing:1},children:"STEP →"}),e.jsx("button",{onClick:()=>n(w=>!w),style:{padding:"8px 16px",fontFamily:s.mono,fontSize:10,background:t?s.amber+"22":s.card,border:"1px solid "+(t?s.amber:s.border),color:t?s.amber:s.textS,borderRadius:5,cursor:"pointer",letterSpacing:1},children:t?"⏸ PAUSE":"▶ AUTO"}),e.jsxs("button",{onClick:()=>c(w=>!w),style:{padding:"8px 16px",fontFamily:s.mono,fontSize:10,background:s.card,border:"1px solid "+s.border,color:s.textS,borderRadius:5,cursor:"pointer",letterSpacing:1},children:[p?"HIDE":"SHOW"," MATH"]})]}),p&&e.jsxs("div",{style:{background:s.surface,border:"1px solid "+r.color+"55",borderRadius:10,padding:18,marginBottom:20},children:[e.jsxs(k,{color:r.color,children:["📊 LIVE CALCULATION AT POSITION [",l.r,",",l.c,"]"]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.textS,letterSpacing:2,marginBottom:8},children:"IMAGE PATCH"}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:11,color:s.cream,lineHeight:2.2},children:y.map((w,x)=>e.jsx("div",{children:w.map((b,S)=>e.jsx("span",{style:{display:"inline-block",width:36,textAlign:"right",color:b<80?s.rust:b<180?s.amber:s.cream},children:b},S))},x))})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.textS,letterSpacing:2,marginBottom:8},children:"KERNEL VALUES"}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:11,color:s.cream,lineHeight:2.2},children:m.map((w,x)=>e.jsx("div",{children:w.map((b,S)=>e.jsx("span",{style:{display:"inline-block",width:36,textAlign:"right",color:b>0?s.sage:b<0?s.red:s.textS},children:b%1===0?b:I(b,2)},S))},x))})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.textS,letterSpacing:2,marginBottom:8},children:"PRODUCTS (×)"}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:11,color:s.cream,lineHeight:2.2},children:N.map((w,x)=>e.jsx("div",{children:w.map((b,S)=>e.jsx("span",{style:{display:"inline-block",width:44,textAlign:"right",color:b>0?s.sage:b<0?s.red:s.textS},children:I(b,0)},S))},x))})]})]}),e.jsx("div",{style:{borderTop:"1px solid "+s.border,marginTop:12,paddingTop:12},children:e.jsxs("div",{style:{display:"flex",gap:24,flexWrap:"wrap"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.textS,letterSpacing:2,marginBottom:4},children:"SUM OF PRODUCTS"}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:20,color:C>=0?s.sage:s.red},children:I(C,1)})]}),e.jsx("div",{style:{paddingTop:8,color:s.textD,fontSize:20},children:"→"}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontFamily:s.mono,fontSize:9,color:s.textS,letterSpacing:2,marginBottom:4},children:["AFTER ReLU: max(0, ",I(C,1),")"]}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:20,color:s.amber},children:I(z,1)})]}),e.jsxs("div",{style:{flex:1},children:[e.jsxs("div",{style:{fontFamily:s.mono,fontSize:9,color:s.textS,letterSpacing:2,marginBottom:4},children:["FEATURE MAP PIXEL [",l.r,",",l.c,"]"]}),e.jsx("div",{style:{height:24,background:H(ee(Math.round(z/1e3*255),0,255)),borderRadius:4,border:"1px solid "+s.border}})]})]})})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16},children:[e.jsx(_,{color:s.amber,title:"CONVOLUTION FORMULA",lines:`Feature[r,c] = Σᵢ Σⱼ Image[r+i, c+j] × Kernel[i,j]

= I[r,c]×K[0,0] + I[r,c+1]×K[0,1] + ... + I[r+2,c+2]×K[2,2]

For our edge kernel at [0,0]:
= 200×(-1) + 220×(-1) + 245×(-1)
+ 220×(-1) + 245×( 8) + 245×(-1)
+ 245×(-1) + 245×(-1) + 20×(-1)
= `+I(se(L,m,0,0),1),note:"This sum is computed once per filter position. A 6x6 image with 3x3 filter, 4x4 feature map (4x4=16 positions)"}),e.jsxs("div",{children:[e.jsx(_,{color:s.rust,title:"OUTPUT SIZE FORMULA",lines:`Output size = (Input size − Kernel size) / Stride + 1

With 6×6 input, 3×3 kernel, stride=1:
= (6 − 3) / 1 + 1 = 4

With 32×32 input, 5×5 kernel, stride=1:
= (32 − 5) / 1 + 1 = 28

With padding='same':
= Input size (padding preserves size!)`,note:"Stride = how many pixels we shift the filter each step. Usually stride=1."}),e.jsx(W,{icon:"📌",title:"KEY INSIGHT: PARAMETER SHARING",color:s.sage,body:"One 3×3 filter has just 9 learnable values. Yet it scans the ENTIRE image! The SAME 9 weights detect edges at every location. A traditional dense network would need millions of separate weights. This is CNN's superpower."})]})]})]})},Be=function(){const[a,o]=v.useState(0),l=[{name:"Filter 1: Edges",kr:O.edge.vals,col:s.amber,role:"Detects where pixel values change sharply — the outlines of the dog, ears, eyes"},{name:"Filter 2: Vertical",kr:O.vertical.vals,col:s.sky,role:"Detects vertical boundaries — left/right sides of the dog's face and body"},{name:"Filter 3: Sharpen",kr:O.sharpen.vals,col:s.rustL,role:"Amplifies fine detail — individual fur strands, texture patterns"},{name:"Filter 4: Blur",kr:O.blur.vals,col:s.sage,role:"Smooth, low-frequency content — broad shapes and overall lighting"}],i=l.map(c=>G(L,c.kr)),t=l[a],n=i[a],p=c=>{const d=c.flat(),r=Math.min(...d),m=Math.max(...d);return m===r?c.map(h=>h.map(()=>128)):c.map(h=>h.map(u=>Math.round((u-r)/(m-r)*255)))};return e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.amberD,letterSpacing:4,marginBottom:8},children:"MODULE 04 / FILTERS & FEATURE MAPS"}),e.jsx("div",{style:{fontFamily:s.serif,fontSize:26,color:s.cream,marginBottom:8},children:"Multiple Filters — Multiple Feature Maps"}),e.jsx("div",{style:{color:s.textS,fontSize:13,lineHeight:1.7},children:"In real CNNs, we use dozens or hundreds of filters simultaneously. Each one learns to detect a different visual pattern."})]}),e.jsx(W,{icon:"🔭",title:"ONE LAYER, MANY FILTERS",color:s.amber,body:"A single CONV layer might apply 32, 64, or 128 different filters. Each produces its own feature map. So a 224×224 image entering a layer with 64 filters produces a 222×222×64 output volume — like a stack of 64 maps, each highlighting different features."}),e.jsx("div",{style:{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"},children:l.map((c,d)=>e.jsx("button",{onClick:()=>o(d),style:{flex:1,minWidth:120,padding:"10px 12px",fontFamily:s.mono,fontSize:10,letterSpacing:1,background:a===d?c.col+"22":s.card,border:"1px solid "+(a===d?c.col:s.border),color:a===d?c.col:s.textS,borderRadius:7,cursor:"pointer"},children:c.name},d))}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20,marginBottom:20},children:[e.jsxs("div",{style:{background:s.card,border:"1px solid "+s.border,borderRadius:10,padding:16,textAlign:"center"},children:[e.jsx(k,{color:s.sky,style:{textAlign:"center",display:"block"},children:"INPUT IMAGE"}),e.jsx(R,{grid:L,cellSize:32}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.textS,marginTop:8},children:"6×6 = 36 pixels"})]}),e.jsxs("div",{style:{background:s.card,border:"1px solid "+s.border,borderRadius:10,padding:16,textAlign:"center"},children:[e.jsx(k,{color:t.col,style:{textAlign:"center",display:"block"},children:t.name}),e.jsx("div",{style:{display:"inline-block",border:"2px solid "+t.col,borderRadius:6,overflow:"hidden",lineHeight:0,marginBottom:10},children:t.kr.map((c,d)=>e.jsx("div",{style:{display:"flex"},children:c.map((r,m)=>e.jsx("div",{style:{width:48,height:48,background:r>0?"rgba(240,165,0,"+r/10+")":r<0?"rgba(224,92,42,"+-r/10+")":s.surface,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid "+s.border,boxSizing:"border-box"},children:e.jsx("span",{style:{fontFamily:s.mono,fontSize:11,color:s.cream,fontWeight:"bold"},children:r%1===0?r:I(r,2)})},m))},d))}),e.jsx("div",{style:{color:s.text,fontSize:12,lineHeight:1.5},children:t.role})]}),e.jsxs("div",{style:{background:s.card,border:"1px solid "+s.border,borderRadius:10,padding:16,textAlign:"center"},children:[e.jsx(k,{color:s.sage,style:{textAlign:"center",display:"block"},children:"FEATURE MAP OUTPUT"}),e.jsx(R,{grid:p(n),cellSize:32,normalize:!1}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.textS,marginTop:8},children:"4×4 output (size shrank by 2)"}),e.jsxs("div",{style:{fontFamily:s.mono,fontSize:9,color:t.col,marginTop:4},children:["Bright = strong ",t.name.split(":")[1]," response"]})]})]}),e.jsxs("div",{style:{background:s.card,border:"1px solid "+s.border,borderRadius:10,padding:20},children:[e.jsx(k,{color:s.amberL,children:"ALL 4 FEATURE MAPS SIDE BY SIDE"}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:11,color:s.textS,marginBottom:16,lineHeight:1.6},children:'Each filter "sees" the same dog image differently. Together they build a rich description.'}),e.jsx("div",{style:{display:"flex",gap:20,flexWrap:"wrap"},children:l.map((c,d)=>e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(R,{grid:p(i[d]),cellSize:22,normalize:!1}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:8,color:c.col,marginTop:6},children:c.name})]},d))}),e.jsx(_,{color:s.amber,title:"TOTAL PARAMETERS IN ONE CONV LAYER",style:{marginTop:16},lines:`Parameters = (kernel_h × kernel_w × in_channels + 1) × num_filters

Example: 3×3 kernel, 1 input channel, 4 filters:
= (3 × 3 × 1 + 1) × 4 = 10 × 4 = 40 parameters

With 32 filters and 3 color channels:
= (3 × 3 × 3 + 1) × 32 = 28 × 32 = 896 parameters
(vs. millions for a dense layer!)`})]})]})},Ue=function(){const[a,o]=v.useState("relu"),l=G(L,O.edge.vals),i=ue(l),t=q(i),n=d=>{const r=d.flat(),m=Math.min(...r),h=Math.max(...r);return h===m?d.map(u=>u.map(()=>128)):d.map(u=>u.map(f=>Math.round((f-m)/(h-m)*255)))},[p,c]=v.useState(null);return e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.amberD,letterSpacing:4,marginBottom:8},children:"MODULE 05 / RELU & POOLING"}),e.jsx("div",{style:{fontFamily:s.serif,fontSize:26,color:s.cream,marginBottom:8},children:"Activation (ReLU) & Pooling"}),e.jsx("div",{style:{color:s.textS,fontSize:13,lineHeight:1.7},children:"Two essential operations that follow convolution — adding non-linearity and building robustness."})]}),e.jsx("div",{style:{display:"flex",gap:8,marginBottom:20},children:["relu","pool"].map(d=>e.jsx("button",{onClick:()=>o(d),style:{flex:1,padding:"10px",fontFamily:s.mono,fontSize:11,letterSpacing:2,background:a===d?(d==="relu"?s.rustL:s.sage)+"22":s.card,border:"1px solid "+(a===d?d==="relu"?s.rustL:s.sage:s.border),color:a===d?d==="relu"?s.rustL:s.sage:s.textS,borderRadius:7,cursor:"pointer"},children:d==="relu"?"⚡ ReLU ACTIVATION":"🏊 MAX POOLING"},d))}),a==="relu"?e.jsxs("div",{children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"auto auto auto",gap:28,alignItems:"start",justifyContent:"start",marginBottom:20},children:[e.jsxs("div",{children:[e.jsx(k,{color:s.border,children:"CONV OUTPUT (raw)"}),e.jsx(R,{grid:n(l),cellSize:44,normalize:!1,showVals:!0}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.textS,marginTop:6},children:"Has negative values!"})]}),e.jsx("div",{style:{paddingTop:50,fontSize:28,color:s.rustL},children:"→ ReLU →"}),e.jsxs("div",{children:[e.jsx(k,{color:s.rustL,children:"AFTER ReLU"}),e.jsx(R,{grid:n(i),cellSize:44,normalize:!1,showVals:!0}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.rustL,marginTop:6},children:"Negatives → 0 (dark)"})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20},children:[e.jsx("div",{children:e.jsx(_,{color:s.rustL,title:"ReLU FORMULA",lines:`ReLU(x) = max(0, x)

Examples from our feature map:
  max(0,  450) =  450  ✓ (passes through)
  max(0, -230) =    0  ✗ (blocked)
  max(0,    0) =    0
  max(0,  180) =  180  ✓`})}),e.jsxs("div",{children:[e.jsx(W,{icon:"🧠",title:"WHY ReLU AFTER CONV?",color:s.rustL,body:"Convolution is just linear math (multiply + add). Without ReLU, stacking 100 conv layers is still equivalent to ONE linear operation. ReLU makes the network non-linear, letting it learn complex patterns. Simple formula, massive impact."}),e.jsxs("div",{style:{background:s.card,border:"1px solid "+s.border,borderRadius:8,padding:14},children:[e.jsx(k,{color:s.textS,children:"INTUITION"}),e.jsxs("div",{style:{color:s.text,fontSize:12,lineHeight:1.6},children:['Negative values mean "no response" to that filter at that location. ReLU simply says: ',e.jsx("em",{style:{color:s.rustL},children:`"if this filter didn't fire here, output zero."`})," Only strong positive responses pass through."]})]})]})]})]}):e.jsxs("div",{children:[e.jsx(W,{icon:"🏊",title:"MAX POOLING",color:s.sage,body:"Max Pooling reduces the spatial size of feature maps by taking the maximum value from each small window (usually 2×2). This makes the network more robust to small translations — if the dog's eye shifts 1 pixel, the pooled response stays the same."}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"auto auto auto",gap:28,alignItems:"start",justifyContent:"start",marginBottom:20},children:[e.jsxs("div",{children:[e.jsx(k,{color:s.rustL,children:"AFTER ReLU (4×4)"}),e.jsx("div",{style:{display:"inline-block",border:"2px solid "+s.sage,borderRadius:6,overflow:"hidden",lineHeight:0,position:"relative"},children:i.map((d,r)=>e.jsx("div",{style:{display:"flex"},children:d.map((m,h)=>{const u=Math.floor(r/2),f=Math.floor(h/2),j=p&&p.r===u&&p.c===f,y=n(i)[r][h];return e.jsx("div",{onMouseEnter:()=>c({r:u,c:f}),onMouseLeave:()=>c(null),style:{width:52,height:52,background:H(y),border:"2px solid "+(j?s.sage:r%2===0&&h%2===0?s.amberD:s.border),boxSizing:"border-box",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("span",{style:{fontFamily:s.mono,fontSize:9,color:y>128?"#000":"#fff"},children:I(m,0)})},h)})},r))}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.textS,marginTop:6},children:"Hover to see pooling region"})]}),e.jsxs("div",{style:{paddingTop:50,textAlign:"center"},children:[e.jsx("div",{style:{fontSize:28,color:s.sage},children:"→"}),e.jsxs("div",{style:{fontFamily:s.mono,fontSize:9,color:s.sage,marginTop:4},children:["MAX POOL",e.jsx("br",{}),"2×2, stride 2"]})]}),e.jsxs("div",{children:[e.jsx(k,{color:s.sage,children:"POOLED OUTPUT (2×2)"}),e.jsx("div",{style:{display:"inline-block",border:"2px solid "+s.sage,borderRadius:6,overflow:"hidden",lineHeight:0},children:t.map((d,r)=>e.jsx("div",{style:{display:"flex"},children:d.map((m,h)=>{const u=p&&p.r===r&&p.c===h,f=n(t)[r][h];return e.jsx("div",{onMouseEnter:()=>c({r,c:h}),onMouseLeave:()=>c(null),style:{width:80,height:80,background:H(f),border:"2px solid "+(u?s.sage:s.border),boxSizing:"border-box",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("span",{style:{fontFamily:s.mono,fontSize:11,color:f>128?"#000":"#fff",fontWeight:"bold"},children:I(m,0)})},h)})},r))}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.sage,marginTop:6},children:"4×4 → 2×2 (50% smaller!)"})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20},children:[e.jsx(_,{color:s.sage,title:"MAX POOLING EXAMPLE (top-left 2×2 region)",lines:`Input region:
  [ 450  180 ]
  [ 320  90  ]

max(450, 180, 320, 90) = 450

Pooled output = 450 (just the max!)

Result: 4×4 → 2×2 (size halved)
Parameters reduced by 75%!`,note:"Max Pool has NO learnable parameters — it's a fixed operation"}),e.jsxs("div",{children:[e.jsx(W,{icon:"📏",title:"WHY MAX POOLING?",color:s.sage,body:"1. REDUCES SIZE: Shrinks feature maps so the network can process them faster. 2. TRANSLATION INVARIANCE: If a feature (like an eye) shifts 1 pixel, the max in that region stays the same. 3. PREVENTS OVERFITTING: Fewer values = less to memorize."}),e.jsxs("div",{style:{background:s.card,border:"1px solid "+s.border,borderRadius:8,padding:14},children:[e.jsx(k,{color:s.textS,children:"OTHER TYPES"}),e.jsxs("div",{style:{color:s.textS,fontSize:12,lineHeight:1.8},children:[e.jsx("strong",{style:{color:s.amber},children:"Average Pooling:"})," takes the mean instead of max",e.jsx("br",{}),e.jsx("strong",{style:{color:s.amber},children:"Global Avg Pool:"})," collapses entire map to one number",e.jsx("br",{}),e.jsx("strong",{style:{color:s.amber},children:"Strided Conv:"})," modern alternative, learnable pooling"]})]})]})]})]})]})},We=function(){const[a,o]=v.useState(null),l=[{id:"input",name:"Input Image",icon:"📷",shape:"224×224×3",color:s.sky,type:"INPUT",desc:"Raw pixel values of the dog photo. Three channels: Red, Green, Blue. 224×224×3 = 150,528 numbers. No computation happens here.",params:0,formula:`Input tensor: H × W × C
= 224 × 224 × 3`},{id:"conv1",name:"CONV + ReLU",icon:"🔲",shape:"222×222×32",color:s.conv,type:"CONV",desc:"32 different 3×3 filters each detect different low-level patterns: vertical edges, horizontal edges, color gradients. ReLU removes negative values. Output: 32 feature maps.",params:896,formula:`(3×3×3+1)×32 = 896 params
Output: (224-3)/1+1 = 222
→ 222×222×32 feature volume`},{id:"pool1",name:"Max Pool",icon:"⬇️",shape:"111×111×32",color:s.pool,type:"POOL",desc:"2×2 max pooling with stride 2. Each feature map shrinks by half in both dimensions. Preserves the strongest responses. No learnable parameters.",params:0,formula:`2×2 max pool, stride=2
222/2 = 111
→ 111×111×32`},{id:"conv2",name:"CONV + ReLU",icon:"🔲",shape:"109×109×64",color:s.conv,type:"CONV",desc:"64 filters of size 3×3 applied to 32-channel input. Now detects mid-level features: eyes, ears, nose shapes, fur texture patterns. Each filter 'sees' all 32 previous maps.",params:18496,formula:`(3×3×32+1)×64 = 18,496 params
Output: (111-3)/1+1 = 109
→ 109×109×64`},{id:"pool2",name:"Max Pool",icon:"⬇️",shape:"54×54×64",color:s.pool,type:"POOL",desc:"Another 2×2 max pool with stride 2. Features are now compact. The network has built a rich spatial hierarchy from pixels to shapes.",params:0,formula:`2×2 max pool, stride=2
109/2 ≈ 54
→ 54×54×64`},{id:"conv3",name:"CONV + ReLU",icon:"🔲",shape:"52×52×128",color:s.conv,type:"CONV",desc:"128 filters detect high-level features: complete dog ears, eyes with surrounding fur, paw shapes. The network is building toward recognizing 'dog' as a whole.",params:73856,formula:`(3×3×64+1)×128 = 73,856 params
→ 52×52×128`},{id:"gap",name:"Global Avg Pool",icon:"🌐",shape:"1×1×128",color:s.amberL,type:"POOL",desc:"Collapses each of the 128 feature maps to a single number (their average). Produces a 128-dimensional vector. Eliminates spatial information — only 'what features exist' matters now.",params:0,formula:`avg of entire 52×52 → single value
One per channel: → vector of 128`},{id:"fc1",name:"Dense Layer",icon:"🔗",shape:"128→256",color:s.fc,type:"FC",desc:"A traditional dense (fully connected) layer. Every one of the 128 inputs connects to all 256 outputs. This integrates all the spatial features into abstract class-relevant representations.",params:33024,formula:`128×256 + 256 = 33,024 params
+ ReLU activation`},{id:"out",name:"Output (Softmax)",icon:"🏆",shape:"1000 classes",color:s.out,type:"OUTPUT",desc:"Final dense layer maps to 1000 ImageNet classes (cat, dog, car, airplane...). Softmax converts raw scores to probabilities that sum to 100%. The highest probability wins!",params:257e3,formula:`256×1000 + 1000 = 257,000 params
Softmax: eᶻⁱ / Σeᶻʲ
→ [0.001, ..., 0.94(dog), ...]`}],i=l.reduce((n,p)=>n+p.params,0),t=l.find(n=>n.id===a);return e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.amberD,letterSpacing:4,marginBottom:8},children:"MODULE 06 / ARCHITECTURE"}),e.jsx("div",{style:{fontFamily:s.serif,fontSize:26,color:s.cream,marginBottom:8},children:"Complete CNN Architecture"}),e.jsx("div",{style:{color:s.textS,fontSize:13},children:'From raw dog photo to "94% probability this is a dog." Click any layer to see details.'})]}),e.jsx("div",{style:{background:s.card,border:"1px solid "+s.border,borderRadius:12,padding:20,marginBottom:20},children:e.jsx("div",{style:{display:"flex",alignItems:"center",gap:0,overflowX:"auto",paddingBottom:8},children:l.map((n,p)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",flexShrink:0},children:[e.jsxs("div",{onClick:()=>o(a===n.id?null:n.id),style:{cursor:"pointer",textAlign:"center",background:a===n.id?n.color+"22":s.surface,border:"1px solid "+(a===n.id?n.color:s.border),borderRadius:8,padding:"12px 10px",minWidth:80,transition:"all 0.2s"},children:[e.jsx("div",{style:{fontSize:22,marginBottom:4},children:n.icon}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:8,color:n.color,letterSpacing:1,marginBottom:3},children:n.type}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:8,color:s.textS},children:n.shape})]}),p<l.length-1&&e.jsx("div",{style:{color:s.textD,fontSize:14,padding:"0 4px"},children:"→"})]},n.id))})}),t&&e.jsx("div",{style:{background:s.surface,border:"1px solid "+t.color+"55",borderRadius:10,padding:18,marginBottom:20},children:e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr",gap:20},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center",marginBottom:12},children:[e.jsx("span",{style:{fontSize:28},children:t.icon}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:t.color,letterSpacing:3},children:t.type}),e.jsx("div",{style:{fontFamily:s.serif,fontSize:18,color:s.cream},children:t.name})]})]}),e.jsx("div",{style:{color:s.text,fontSize:13,lineHeight:1.75,marginBottom:12},children:t.desc})]}),e.jsxs("div",{children:[e.jsx(_,{color:t.color,title:"MATH",lines:t.formula}),e.jsxs("div",{style:{background:s.card,border:"1px solid "+s.border,borderRadius:6,padding:12,textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.textS,marginBottom:4},children:"LEARNABLE PARAMETERS"}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:22,color:t.color},children:t.params.toLocaleString()})]})]})]})}),e.jsxs("div",{style:{background:s.card,border:"1px solid "+s.border,borderRadius:10,padding:20,marginBottom:20},children:[e.jsx(k,{color:s.amberL,children:"📉 SPATIAL SIZE REDUCTION THROUGH THE NETWORK"}),e.jsx("div",{style:{display:"flex",alignItems:"flex-end",gap:8,marginTop:12,flexWrap:"wrap"},children:[{s:224,lbl:"Input",col:s.sky},{s:111,lbl:"After Pool1",col:s.conv},{s:54,lbl:"After Pool2",col:s.pool},{s:26,lbl:"After Pool3",col:s.conv},{s:4,lbl:`Global
Pool`,col:s.amberL}].map(n=>e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{width:Math.max(8,n.s/8),height:Math.max(8,n.s/8),background:n.col+"44",border:"1px solid "+n.col,borderRadius:4,margin:"0 auto 6px",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsxs("span",{style:{fontFamily:s.mono,fontSize:8,color:n.col},children:[n.s,"×",n.s]})}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:8,color:s.textS,whiteSpace:"pre"},children:n.lbl})]},n.lbl))}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:11,color:s.textS,marginTop:12},children:"Spatial size shrinks but depth (# feature maps) grows: 3 → 32 → 64 → 128 channels"})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12},children:[{l:"Conv Layers",v:"3",icon:"🔲",c:s.conv},{l:"Pool Layers",v:"3",icon:"⬇️",c:s.pool},{l:"FC Layers",v:"2",icon:"🔗",c:s.fc},{l:"Total Params",v:i.toLocaleString(),icon:"⚙️",c:s.amber}].map(n=>e.jsxs("div",{style:{background:s.card,border:"1px solid "+n.c+"44",borderRadius:8,padding:14,textAlign:"center"},children:[e.jsx("div",{style:{fontSize:22,marginBottom:6},children:n.icon}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:n.c,letterSpacing:1,marginBottom:4},children:n.l}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:16,color:s.cream},children:n.v})]},n.l))})]})},He=function(){const[a,o]=v.useState(0),l=G(L,O.edge.vals),i=ue(l),t=q(i),n=r=>{const m=r.flat(),h=Math.min(...m),u=Math.max(...m);return u===h?r.map(f=>f.map(()=>128)):r.map(f=>f.map(j=>Math.round((j-h)/(u-h)*255)))},p=[{cls:"🐕 Dog",p:.924},{cls:"🦊 Fox",p:.043},{cls:"🐺 Wolf",p:.019},{cls:"🐈 Cat",p:.008},{cls:"🐻 Bear",p:.006}],c=[{title:"Stage 1 — Input: Raw Dog Image",color:s.sky,icon:"📷",explain:"Our dog photo enters the network as a 10×10 grid of pixel values (0–255). In reality, photos like 224×224 pixels are used. The computer sees nothing but numbers at this point — no 'dog' yet, just intensity values.",viz:e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(R,{grid:xe,cellSize:34}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:10,color:s.textS,marginTop:8},children:"10×10 = 100 pixels, grayscale"})]}),math:`Input tensor shape: 10 × 10 × 1
(rows × cols × channels)

Min value: 20 (dark fur/outline)
Max value: 245 (bright face area)
Average: ~185 (mostly light gray)`},{title:"Stage 2 — CONV Layer: Edge Detection Filter",color:s.conv,icon:"🔲",explain:"An edge-detecting filter slides across the dog image. Wherever adjacent pixels have very different values (like where the dark ear meets the bright face), the convolution produces a large response. This is finding the outline of the dog!",viz:e.jsxs("div",{style:{display:"flex",gap:20,alignItems:"flex-start",flexWrap:"wrap"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(R,{grid:L,cellSize:34}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.textS,marginTop:4},children:"Input (6×6 region)"})]}),e.jsx("div",{style:{paddingTop:50,color:s.conv,fontSize:22},children:"*"}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{display:"inline-block",border:"2px solid "+s.conv,borderRadius:4,overflow:"hidden"},children:O.edge.vals.map((r,m)=>e.jsx("div",{style:{display:"flex"},children:r.map((h,u)=>e.jsx("div",{style:{width:34,height:34,background:s.surface,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid "+s.border},children:e.jsx("span",{style:{fontFamily:s.mono,fontSize:11,color:h>0?s.sage:h<0?s.red:s.textS},children:h})},u))},m))}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.textS,marginTop:4},children:"Edge filter (3×3)"})]}),e.jsx("div",{style:{paddingTop:50,color:s.conv,fontSize:22},children:"="}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(R,{grid:n(l),cellSize:34,normalize:!1}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.conv,marginTop:4},children:"Feature map (4×4)"})]})]}),math:`For each 3×3 patch of the image:
Conv[r,c] = Σᵢ Σⱼ Image[r+i,c+j] × Filter[i,j]

Sample calculation at [0,0]:
= 200(-1)+220(-1)+245(-1)
+ 220(-1)+245(8)+245(-1)
+ 245(-1)+245(-1)+20(-1)
= `+I(se(L,O.edge.vals,0,0),1)},{title:"Stage 3 — ReLU: Remove Negatives",color:s.relu,icon:"⚡",explain:"The convolution produces both positive and negative values. Negative values mean 'this edge detector found NO edge here.' ReLU simply zeroes these out, keeping only the meaningful positive responses where edges were actually found.",viz:e.jsxs("div",{style:{display:"flex",gap:20,alignItems:"flex-start"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(R,{grid:n(l),cellSize:44,normalize:!1}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.textS,marginTop:4},children:"Before ReLU"})]}),e.jsxs("div",{style:{paddingTop:60,color:s.relu,fontSize:14,textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:s.mono,marginBottom:4},children:"ReLU"}),e.jsx("div",{children:"→"})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(R,{grid:n(i),cellSize:44,normalize:!1}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.relu,marginTop:4},children:"After ReLU"})]})]}),math:`ReLU(x) = max(0, x)

From our feature map:
  +450 → 450  (strong edge found)
  -180 → 0    (no edge here)
  +280 → 280  (moderate edge)
  -60  → 0    (no edge)

Negative values become 0 (black pixels)`},{title:"Stage 4 — Max Pooling: Downsample",color:s.pool,icon:"⬇️",explain:"Max pooling slides a 2×2 window and keeps only the maximum value. Our 4×4 feature map shrinks to 2×2. This makes the network tolerant to small shifts — if the dog's ear moves 1 pixel, the max response in that region stays the same.",viz:e.jsxs("div",{style:{display:"flex",gap:20,alignItems:"flex-start"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(R,{grid:n(i),cellSize:52,normalize:!1,showVals:!0}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.textS,marginTop:4},children:"After ReLU (4×4)"})]}),e.jsxs("div",{style:{paddingTop:80,color:s.pool,fontSize:14,textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:s.mono,marginBottom:4},children:"MaxPool"}),e.jsx("div",{children:"2×2"}),e.jsx("div",{children:"→"})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(R,{grid:n(t),cellSize:80,normalize:!1,showVals:!0}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.pool,marginTop:4},children:"Pooled (2×2)"})]})]}),math:`2×2 Max Pool, stride=2:

Top-left region [values at 4 positions]:
→ takes maximum of those 4 values

Result: 4×4 → 2×2
(spatial size halved, 75% data reduced)

Each surviving value = strongest
detected feature in that region`},{title:"Stage 5 — Deeper Layers: Building Up Features",color:s.amberL,icon:"🏗️",explain:"In a real CNN, many more CONV→ReLU→POOL stages follow. Each layer detects increasingly complex features. Layer 1 sees edges. Layer 2 sees corners and curves. Layer 3 sees shapes like 'pointed ear.' Layer 4 sees complete 'dog face' patterns.",viz:e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12},children:[{lbl:"Layer 1 detects:",items:["Horizontal edges","Vertical edges","Color transitions","Brightness changes"],col:s.conv},{lbl:"Layer 2 detects:",items:["Corners & curves","Simple textures","Gradient patterns","Blob shapes"],col:s.amberD},{lbl:"Layer 3 detects:",items:["Dog ear shapes","Eye-like circles","Fur texture","Snout curves"],col:s.amber},{lbl:"Layer 4+ detects:",items:["Complete eyes","Full ear structure","Face composition","Body parts"],col:s.rustL}].map(r=>e.jsxs("div",{style:{background:s.surface,border:"1px solid "+r.col+"44",borderRadius:7,padding:12},children:[e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:r.col,marginBottom:8},children:r.lbl}),r.items.map(m=>e.jsxs("div",{style:{display:"flex",gap:6,marginBottom:5},children:[e.jsx("div",{style:{width:4,height:4,borderRadius:"50%",background:r.col,marginTop:4,flexShrink:0}}),e.jsx("div",{style:{color:s.textS,fontSize:11},children:m})]},m))]},r.lbl))}),math:`Feature hierarchy:
  Layer 1: 32 feature maps  (simple)
  Layer 2: 64 feature maps  (medium)
  Layer 3: 128 feature maps (complex)
  Layer 4: 256 feature maps (very complex)

The same backpropagation algorithm
automatically learns what each filter detects!`},{title:"Stage 6 — Fully Connected + Softmax: The Decision",color:s.out,icon:"🏆",explain:"After all the spatial processing, the feature maps are flattened into a 1D vector and fed into a dense layer. Finally, Softmax converts raw scores into probabilities. The class with the highest probability is the network's prediction.",viz:e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.textS,marginBottom:12,letterSpacing:2},children:"SOFTMAX OUTPUT (Top 5 classes):"}),p.map(r=>e.jsxs("div",{style:{marginBottom:8},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:3},children:[e.jsx("span",{style:{fontFamily:s.mono,fontSize:12,color:r.p>.9?s.sage:s.textS},children:r.cls}),e.jsxs("span",{style:{fontFamily:s.mono,fontSize:12,color:r.p>.9?s.sage:s.textD},children:[(r.p*100).toFixed(1),"%"]})]}),e.jsx("div",{style:{background:s.surface,borderRadius:4,height:8},children:e.jsx("div",{style:{width:r.p*100+"%",height:"100%",background:r.p>.9?s.sage:s.amberD,borderRadius:4,transition:"width 0.8s"}})})]},r.cls)),e.jsxs("div",{style:{marginTop:16,background:s.sage+"18",border:"1px solid "+s.sage+"44",borderRadius:6,padding:10,textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:s.mono,fontSize:10,color:s.sage,letterSpacing:2},children:"PREDICTION"}),e.jsx("div",{style:{fontFamily:s.serif,fontSize:22,color:s.cream,marginTop:4},children:"🐕 DOG  — 92.4% confidence"})]})]}),math:`Flatten: feature maps → 1D vector

Fully Connected: multiply by weight matrix
z = W × features + b

Softmax: P(class k) = e^zₖ / Σⱼ e^zⱼ

e^z_dog / (e^z_dog + e^z_fox + ...) = 0.924

All probabilities sum to exactly 1.0!`}],d=c[a];return e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.amberD,letterSpacing:4,marginBottom:8},children:"MODULE 07 / FULL PIPELINE"}),e.jsx("div",{style:{fontFamily:s.serif,fontSize:26,color:s.cream,marginBottom:8},children:"Dog Image — Complete CNN Journey"}),e.jsx("div",{style:{color:s.textS,fontSize:13},children:"Follow our dog photo step by step through every stage of the CNN."})]}),e.jsx("div",{style:{display:"flex",gap:6,marginBottom:20,flexWrap:"wrap"},children:c.map((r,m)=>e.jsxs("button",{onClick:()=>o(m),style:{padding:"8px 12px",fontFamily:s.mono,fontSize:9,letterSpacing:1,background:a===m?r.color+"22":s.card,border:"1px solid "+(a===m?r.color:s.border),color:a===m?r.color:s.textS,borderRadius:6,cursor:"pointer"},children:["STAGE ",m+1]},m))}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{background:s.card,border:"1px solid "+d.color+"55",borderRadius:10,padding:18,marginBottom:16},children:[e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center",marginBottom:12},children:[e.jsx("span",{style:{fontSize:28},children:d.icon}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontFamily:s.mono,fontSize:9,color:d.color,letterSpacing:3},children:["STAGE ",a+1," / ",c.length]}),e.jsx("div",{style:{fontFamily:s.serif,fontSize:18,color:s.cream},children:d.title})]})]}),e.jsx("div",{style:{color:s.text,fontSize:13,lineHeight:1.75},children:d.explain})]}),e.jsx(_,{color:d.color,title:"MATH",lines:d.math}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:12},children:[e.jsx("button",{onClick:()=>o(r=>Math.max(0,r-1)),disabled:a===0,style:{padding:"8px 20px",fontFamily:s.mono,fontSize:11,background:a===0?"transparent":s.card,border:"1px solid "+(a===0?"transparent":s.border),color:a===0?"transparent":s.text,borderRadius:6,cursor:a===0?"default":"pointer"},children:"← PREV"}),e.jsx("div",{style:{display:"flex",gap:4,alignItems:"center"},children:c.map((r,m)=>e.jsx("div",{style:{width:m===a?20:6,height:6,borderRadius:3,background:m<=a?r.color:s.border,transition:"all 0.3s"}},m))}),e.jsx("button",{onClick:()=>o(r=>Math.min(c.length-1,r+1)),disabled:a===c.length-1,style:{padding:"8px 20px",fontFamily:s.mono,fontSize:11,background:a===c.length-1?"transparent":d.color+"22",border:"1px solid "+(a===c.length-1?"transparent":d.color),color:a===c.length-1?"transparent":d.color,borderRadius:6,cursor:a===c.length-1?"default":"pointer"},children:"NEXT →"})]})]}),e.jsx("div",{style:{background:s.card,border:"1px solid "+s.border,borderRadius:10,padding:18,display:"flex",alignItems:"flex-start",justifyContent:"center",minHeight:220},children:d.viz})]})]})},Ge=function(){const[a,o]=v.useState("conv"),l={conv:{title:"Convolution Math",color:s.conv,content:e.jsxs("div",{children:[e.jsx(_,{color:s.conv,title:"FORMAL DEFINITION",lines:`(I ★ K)[r, c] = Σᵢ₌₀² Σⱼ₌₀² I[r+i, c+j] · K[i, j]

Where:
  I  = input image (or feature map)
  K  = kernel / filter weights
  ★  = convolution operator
  r,c = output row, column
  i,j = kernel row, column

This is technically cross-correlation
(not flipped), standard in deep learning`,note:"The kernel slides over every valid position"}),e.jsx(_,{color:s.amberL,title:"WORKED EXAMPLE (3×3 edge filter on our dog)",lines:`Input patch [0:3, 0:3]:          Kernel:
  200  220  245             -1  -1  -1
  220  245   20       ★     -1   8  -1
  245  245  245             -1  -1  -1

Element-wise multiply then sum:
200(-1)+220(-1)+245(-1) = -665
220(-1)+245( 8)+ 20(-1) = +1736
245(-1)+245(-1)+245(-1) = -735

Total = -665 + 1736 + (-735) = +336
Result: Feature[0,0] = 336`,note:"Large positive value = strong edge detected at this location"}),e.jsx(_,{color:s.rust,title:"OUTPUT SIZE FORMULAS",lines:`Without padding:
  out = floor((in - k) / stride) + 1

With 'same' padding:
  padding = floor(k / 2)
  out = ceil(in / stride)

Common cases (stride=1, no padding):
  Input 224, kernel 3: out = 222
  Input 224, kernel 5: out = 220
  Input 224, kernel 7: out = 218`})]})},relu:{title:"ReLU & Activations",color:s.relu,content:e.jsxs("div",{children:[e.jsx(_,{color:s.relu,title:"ReLU FUNCTION",lines:`ReLU(x) = max(0, x)

Derivative:
  ReLU'(x) = 1  if x > 0
  ReLU'(x) = 0  if x ≤ 0

Leaky ReLU (variant):
  f(x) = x      if x > 0
  f(x) = 0.01x  if x ≤ 0
  (avoids 'dying ReLU' problem)`,note:"ReLU is fast, simple, and works remarkably well in practice"}),e.jsx(_,{color:s.amberL,title:"WHY NOT SIGMOID/TANH IN HIDDEN LAYERS?",lines:`Sigmoid: σ(x) = 1/(1+e^-x)
  σ'(x) = σ(x)(1-σ(x)) ≤ 0.25

For deep networks (50+ layers):
  Gradient × 0.25 × 0.25 × ... × 0.25 → 0
  This is the VANISHING GRADIENT problem!

ReLU derivative = 1 for x>0:
  Gradient × 1 × 1 × ... × 1 = gradient
  Preserved! Deep networks can train.`,note:"Vanishing gradients stopped deep CNNs from training until ReLU fixed this"})]})},pool:{title:"Pooling Math",color:s.pool,content:e.jsxs("div",{children:[e.jsx(_,{color:s.pool,title:"MAX POOLING",lines:`MaxPool(X, r, c) = max_{i∈[0,p), j∈[0,p)} X[r·s+i, c·s+j]

Where:
  p = pool size (typically 2)
  s = stride (typically 2)

2×2 patch → single maximum value
Out size: floor((in - p) / s) + 1

Example:
  Input 4×4, pool=2, stride=2:
  Out = floor((4-2)/2)+1 = 2
  → 4×4 becomes 2×2`,note:"Max pooling has zero learnable parameters"}),e.jsx(_,{color:s.sky,title:"AVERAGE POOLING (alternative)",lines:`AvgPool(X, r, c) = (1/p²) Σᵢ Σⱼ X[r·s+i, c·s+j]

Computes average instead of maximum.
Retains all information (nothing discarded).
Used in Global Average Pooling at end of networks.

Global Avg Pool:
  Single average over entire W×H feature map
  → reduces W×H×C to 1×1×C
  → C-dimensional vector for classification`})]})},softmax:{title:"Softmax & Loss",color:s.out,content:e.jsxs("div",{children:[e.jsx(_,{color:s.out,title:"SOFTMAX FUNCTION",lines:`P(class k) = e^zₖ / Σⱼ₌₁ᴷ e^zⱼ

Example with 5 classes:
  Raw scores z: [2.1, 0.5, 0.3, -0.4, -1.0]
  
  e^z values:  [8.17, 1.65, 1.35, 0.67, 0.37]
  Sum = 12.21
  
  Probabilities: [0.67, 0.14, 0.11, 0.05, 0.03]
  Sum = 1.00 ✓ (always!)
  
  Dog is class 1: 67% confident`,note:"Softmax guarantees outputs are valid probabilities summing to 1.0"}),e.jsx(_,{color:s.rust,title:"CROSS-ENTROPY LOSS",lines:`L = -Σₖ yₖ · log(P(k))

Where:
  yₖ = 1 if k is correct class, else 0
  P(k) = softmax probability for class k

Example (correct class = dog = class 1):
  y = [0, 1, 0, 0, 0]
  P = [0.03, 0.67, 0.14, 0.11, 0.05]
  
  L = -log(0.67) = 0.40

Perfect prediction (P=1.0): L = -log(1.0) = 0
Wrong prediction (P=0.01): L = -log(0.01) = 4.6`,note:"Loss approaches 0 as the network gets better at classification"})]})},backprop:{title:"CNN Backprop",color:s.amber,content:e.jsxs("div",{children:[e.jsx(W,{icon:"🔄",title:"HOW BACKPROP WORKS IN CNNs",color:s.amber,body:"The same backpropagation algorithm from regular networks works in CNNs. The chain rule flows gradients backward through every layer. The key insight: since filter weights are SHARED across positions, all their gradients get ACCUMULATED before updating."}),e.jsx(_,{color:s.amber,title:"GRADIENT FLOW THROUGH CONV LAYER",lines:`Forward:  z = I ★ K  (convolution)
Forward:  a = ReLU(z)

Backward (given ∂L/∂a from next layer):
  ∂L/∂z = ∂L/∂a · ReLU'(z)
         = ∂L/∂a   (where z > 0)
         = 0       (where z ≤ 0)

Gradient w.r.t. kernel weights:
  ∂L/∂K[i,j] = Σᵣ Σ꜀ ∂L/∂z[r,c] · I[r+i, c+j]
  (sum because filter is SHARED at every position)

Filter update:
  K[i,j] ← K[i,j] - α · ∂L/∂K[i,j]`,note:"Parameter sharing makes CNNs efficient AND the gradients efficient too"}),e.jsx(_,{color:s.amberD,title:"WHY CNNs NEED LESS DATA THAN DENSE NETWORKS",lines:`Dense layer: each weight connects ONE input→ONE output
→ Must see many examples to learn each weight individually

Conv layer: same filter weights apply EVERYWHERE
→ Every position in the image provides gradient info
→ A 3×3 filter learns from 50,000 patches in one image!

Result: CNNs generalize better with less training data`})]})}},i=l[a];return e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.amberD,letterSpacing:4,marginBottom:8},children:"MODULE 08 / MATHEMATICS"}),e.jsx("div",{style:{fontFamily:s.serif,fontSize:26,color:s.cream,marginBottom:8},children:"The Math Behind CNNs"}),e.jsx("div",{style:{color:s.textS,fontSize:13},children:"Formal definitions and worked examples for each operation."})]}),e.jsx("div",{style:{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"},children:Object.entries(l).map(([t,n])=>e.jsx("button",{onClick:()=>o(t),style:{flex:1,minWidth:100,padding:"10px 8px",fontFamily:s.mono,fontSize:9,letterSpacing:1,background:a===t?n.color+"22":s.card,border:"1px solid "+(a===t?n.color:s.border),color:a===t?n.color:s.textS,borderRadius:6,cursor:"pointer"},children:n.title},t))}),e.jsxs("div",{style:{background:s.card,border:"1px solid "+i.color+"55",borderRadius:10,padding:20},children:[e.jsx("div",{style:{fontFamily:s.serif,fontSize:20,color:s.cream,marginBottom:16},children:i.title}),i.content]})]})},qe=function(){const[a,o]=v.useState("lenet"),l={lenet:{name:"LeNet-5 (1998)",color:s.amberD,icon:"🏦",by:"Yann LeCun, Yoshua Bengio, et al.",params:"60K",accuracy:"99.2% on MNIST digits",arch:"INPUT(32×32) → CONV(6) → POOL → CONV(16) → POOL → FC(120) → FC(84) → OUT(10)",story:"Used by American banks to read handwritten checks! The first practical CNN. Trained on MNIST (handwritten digits 0-9). Tiny by modern standards but revolutionary in 1998.",layers:[32,28,14,10,5,120,84,10]},alexnet:{name:"AlexNet (2012)",color:s.rustL,icon:"🚀",by:"Alex Krizhevsky, Ilya Sutskever, Geoffrey Hinton",params:"62M",accuracy:"83.6% Top-5 on ImageNet (vs 73.8% previous best)",arch:"INPUT(224×224) → CONV(96)→POOL → CONV(256)→POOL → 3×CONV(384) → POOL → 3×FC → SOFTMAX(1000)",story:"The paper that changed everything. Beat every non-deep-learning method by a huge margin in 2012 ImageNet competition. Used 2 GPUs, ReLU, dropout, data augmentation. The 'big bang' of modern deep learning.",layers:[224,55,27,13,4096,4096,1e3]},vgg:{name:"VGGNet-16 (2014)",color:s.sky,icon:"🏗️",by:"Simonyan & Zisserman, Oxford",params:"138M",accuracy:"92.7% Top-5 on ImageNet",arch:"INPUT(224) → [CONV(64)×2]→POOL → [CONV(128)×2]→POOL → [CONV(256)×3]→POOL → [CONV(512)×3]×2→POOL → FC×3",story:"Showed that depth matters — simple 3×3 filters stacked many times beat complex architectures. VGG-16 and VGG-19 became the standard pretrained models for years. Still widely used as feature extractors.",layers:[224,112,56,28,14,7,4096,4096,1e3]},resnet:{name:"ResNet-50 (2015)",color:s.sage,icon:"⏩",by:"He, Zhang, Ren, Sun — Microsoft Research",params:"25M",accuracy:"93.3% Top-5 on ImageNet",arch:"INPUT → CONV(64) → [4 ResBlocks] × 4 stages → GlobalAvgPool → FC(1000)",story:"How do you train a 152-layer network without gradients vanishing? Skip connections! ResNet adds the input directly to the output (residual). Beat human-level ImageNet performance (3.57% error). Skip connections are now everywhere.",layers:[224,112,56,28,14,7,2048,1e3]}},i=l[a];return e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.amberD,letterSpacing:4,marginBottom:8},children:"MODULE 09 / FAMOUS CNNs"}),e.jsx("div",{style:{fontFamily:s.serif,fontSize:26,color:s.cream,marginBottom:8},children:"Famous CNN Architectures"}),e.jsx("div",{style:{color:s.textS,fontSize:13},children:"The landmark networks that defined the history of computer vision."})]}),e.jsx("div",{style:{display:"flex",gap:8,marginBottom:20},children:Object.entries(l).map(([t,n])=>e.jsxs("button",{onClick:()=>o(t),style:{flex:1,padding:"10px 8px",fontFamily:s.mono,fontSize:9,letterSpacing:1,background:a===t?n.color+"22":s.card,border:"1px solid "+(a===t?n.color:s.border),color:a===t?n.color:s.textS,borderRadius:7,cursor:"pointer",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:18,marginBottom:4},children:n.icon}),n.name]},t))}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{background:s.card,border:"1px solid "+i.color+"55",borderRadius:10,padding:20,marginBottom:16},children:[e.jsx("div",{style:{fontSize:32,marginBottom:8},children:i.icon}),e.jsx("div",{style:{fontFamily:s.serif,fontSize:20,color:s.cream,marginBottom:4},children:i.name}),e.jsxs("div",{style:{fontFamily:s.mono,fontSize:10,color:i.color,marginBottom:12},children:["by ",i.by]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16},children:[e.jsxs("div",{style:{background:s.surface,border:"1px solid "+s.border,borderRadius:6,padding:10,textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:s.mono,fontSize:8,color:s.textS,marginBottom:4},children:"PARAMETERS"}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:18,color:i.color},children:i.params})]}),e.jsxs("div",{style:{background:s.surface,border:"1px solid "+s.border,borderRadius:6,padding:10,textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:s.mono,fontSize:8,color:s.textS,marginBottom:4},children:"ACCURACY"}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:11,color:s.cream},children:i.accuracy})]})]}),e.jsx("div",{style:{color:s.text,fontSize:13,lineHeight:1.75},children:i.story})]}),e.jsx(_,{color:i.color,title:"ARCHITECTURE",lines:i.arch})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{background:s.card,border:"1px solid "+s.border,borderRadius:10,padding:20,marginBottom:16},children:[e.jsx(k,{color:i.color,children:"SPATIAL SIZE THROUGH THE NETWORK"}),e.jsx("div",{style:{display:"flex",alignItems:"flex-end",gap:6,marginTop:12,flexWrap:"wrap"},children:i.layers.map((t,n)=>e.jsxs("div",{style:{textAlign:"center",flexShrink:0},children:[e.jsx("div",{style:{width:Math.max(6,t/30),height:Math.max(6,t/30),background:i.color+"33",border:"1px solid "+i.color+"66",borderRadius:3,margin:"0 auto 4px"}}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:7,color:i.color},children:t})]},n))}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.textS,marginTop:8},children:"Size shrinks → class scores"})]}),e.jsxs("div",{style:{background:s.surface,border:"1px solid "+i.color+"33",borderRadius:10,padding:18},children:[e.jsx(k,{color:i.color,children:"🔑 KEY INNOVATION"}),a==="lenet"&&e.jsxs("div",{style:{color:s.text,fontSize:13,lineHeight:1.7},children:["First to combine ",e.jsx("strong",{style:{color:i.color},children:"conv layers + pooling + fully connected"})," in a single trainable system. Proved CNNs work in practice. Used backprop for end-to-end training."]}),a==="alexnet"&&e.jsxs("div",{children:[e.jsx("div",{style:{color:s.text,fontSize:13,lineHeight:1.7,marginBottom:10},children:"Introduced several ideas now considered standard:"}),["GPU training (2× GTX 580)","ReLU instead of sigmoid (10× faster)","Dropout for regularization","Data augmentation (flips, crops)","Local Response Normalization"].map(t=>e.jsxs("div",{style:{display:"flex",gap:8,marginBottom:5},children:[e.jsx("div",{style:{width:4,height:4,borderRadius:"50%",background:i.color,marginTop:5}}),e.jsx("div",{style:{color:s.textS,fontSize:12},children:t})]},t))]}),a==="vgg"&&e.jsxs("div",{style:{color:s.text,fontSize:13,lineHeight:1.7},children:["Proved that ",e.jsx("strong",{style:{color:i.color},children:"depth is more important than filter size"}),". Two stacked 3×3 filters have the same receptive field as one 5×5 but fewer parameters and an extra non-linearity. Deep and simple beats shallow and complex."]}),a==="resnet"&&e.jsxs("div",{children:[e.jsxs("div",{style:{color:s.text,fontSize:13,lineHeight:1.7,marginBottom:10},children:["The ",e.jsx("strong",{style:{color:i.color},children:"skip connection (residual block)"}),":"]}),e.jsx("pre",{style:{fontFamily:s.mono,fontSize:11,color:s.cream,background:s.card,padding:12,borderRadius:6,lineHeight:1.8},children:`output = F(x) + x
(learn residual, not mapping)

Gradient flows directly through +:
∂L/∂x = ∂L/∂(F+x) = ∂L/∂F + 1
Never vanishes!`})]})]})]})]})]})},Ve=function(){const[a,o]=v.useState({}),l=[{q:"A grayscale image is 28×28 pixels. We apply a single 5×5 filter with no padding and stride=1. What is the output size?",a:"Output = (28 - 5) / 1 + 1 = 24. So the output feature map is 24×24. The filter can slide 24 positions horizontally and 24 vertically.",c:s.conv},{q:"Why do we apply ReLU AFTER convolution, not before?",a:"Convolution is linear math. Applying ReLU before wouldn't help — we'd just zero out input pixels. We need to apply non-linearity AFTER computing the weighted sum so the activation can suppress low/negative responses and preserve strong ones.",c:s.rust},{q:"A CONV layer has 64 filters of size 3×3 applied to an input with 32 channels. How many parameters does this layer have? (Don't forget bias!)",a:"Parameters = (3 × 3 × 32 + 1) × 64 = (288 + 1) × 64 = 289 × 64 = 18,496 parameters. The +1 is for the bias for each filter.",c:s.amber},{q:"Why is max pooling considered 'translation invariant'? Give an example.",a:"If a dog's eye is detected at position (3,3), the max pooling window captures it. If it shifts to (3,4) or (4,3), the SAME pooling window still captures it and takes the same maximum. The pooled output is identical — the network doesn't care about the 1-pixel shift.",c:s.pool},{q:"How is a CNN different from a regular feedforward neural network when applied to images?",a:"Regular networks: every pixel connects to every neuron = millions of parameters, slow, doesn't understand spatial structure. CNNs: small filters slide over the image = shared weights (same filter for every location), far fewer parameters, and explicitly exploits the 2D spatial structure of images.",c:s.sky},{q:"ResNet has 152 layers but can still train without vanishing gradients. How?",a:"Skip connections (residual connections): output = F(x) + x. The gradient has a direct path: ∂L/∂x = ∂L/∂F + 1. The '+1' ensures gradients can never vanish — they always have at least a straight-through path from output to input, no matter how deep.",c:s.sage},{q:"Why do feature maps get deeper (more channels) as images get smaller through a CNN?",a:"As spatial size decreases, we need to preserve information capacity. More filters = more features detected per spatial location. Early layers detect few simple features (32 filters). Later layers detect many complex features (256+ filters). The information is compressed spatially but enriched in depth.",c:s.lavender}];return e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.amberD,letterSpacing:4,marginBottom:8},children:"MODULE 10 / SUMMARY + QUIZ"}),e.jsx("div",{style:{fontFamily:s.serif,fontSize:26,color:s.cream,marginBottom:8},children:"Knowledge Check"}),e.jsx("div",{style:{color:s.textS,fontSize:13},children:"Test your understanding. Click each question to reveal the answer."})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:24},children:[{icon:"🔲",title:"Convolution",body:"Small filter slides over image, computing weighted sum at each position. Detects features like edges. Parameters are SHARED across all positions.",color:s.conv},{icon:"⚡",title:"ReLU",body:"max(0,x) — zeroes negative values. Adds non-linearity so deep networks can model complex patterns. Fast and prevents vanishing gradients.",color:s.rust},{icon:"⬇️",title:"Max Pooling",body:"Takes maximum of 2×2 region. Shrinks feature maps by 50%. Adds translation invariance — small shifts don't change the output.",color:s.pool},{icon:"🔗",title:"Fully Connected",body:"At the end, flattened features connect to all neurons. Integrates spatial features into class predictions.",color:s.fc},{icon:"📊",title:"Softmax",body:"Converts raw class scores into probabilities summing to 1.0. P(k) = e^zk / Σe^zj. Highest probability = prediction.",color:s.out},{icon:"🏗️",title:"Feature Hierarchy",body:"Early layers: edges. Middle layers: shapes. Deep layers: objects. Each layer builds on the previous — no manual feature engineering!",color:s.amber}].map(i=>e.jsxs("div",{style:{background:s.card,border:"1px solid "+i.color+"33",borderRadius:9,padding:14},children:[e.jsx("div",{style:{fontSize:22,marginBottom:6},children:i.icon}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:10,color:i.color,letterSpacing:1,marginBottom:6},children:i.title}),e.jsx("div",{style:{color:s.textS,fontSize:12,lineHeight:1.5},children:i.body})]},i.title))}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:9,color:s.sage,letterSpacing:3,marginBottom:12},children:"🧠 CLICK TO REVEAL ANSWERS"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:l.map((i,t)=>e.jsxs("div",{onClick:()=>o(n=>({...n,[t]:!n[t]})),style:{background:a[t]?i.c+"0d":s.card,border:"1px solid "+(a[t]?i.c+"55":s.border),borderRadius:9,padding:"14px 18px",cursor:"pointer",transition:"all 0.25s"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12},children:[e.jsxs("div",{style:{display:"flex",gap:12,flex:1},children:[e.jsxs("div",{style:{width:26,height:26,borderRadius:"50%",background:i.c+"22",border:"1px solid "+i.c+"66",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:s.mono,fontSize:10,color:i.c,flexShrink:0},children:["Q",t+1]}),e.jsx("div",{style:{color:s.text,fontSize:13,lineHeight:1.65,fontWeight:"500"},children:i.q})]}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:18,color:a[t]?i.c:s.textD,flexShrink:0},children:a[t]?"▲":"▼"})]}),a[t]&&e.jsxs("div",{style:{marginTop:12,paddingTop:12,borderTop:"1px solid "+i.c+"33",color:s.text,fontSize:13,lineHeight:1.75,borderLeft:"3px solid "+i.c,paddingLeft:14},children:["✅ ",i.a]})]},t))}),e.jsxs("div",{style:{marginTop:24,background:s.amber+"0a",border:"1px solid "+s.amber+"33",borderRadius:10,padding:18},children:[e.jsx(k,{color:s.amber,children:"🚀 WHERE TO GO NEXT"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginTop:10},children:[{icon:"⏩",t:"ResNets",d:"Skip connections for very deep networks",c:s.sage},{icon:"🎯",t:"YOLO / SSD",d:"Real-time object detection with CNNs",c:s.rustL},{icon:"🖼️",t:"U-Net",d:"CNNs for image segmentation (medical)",c:s.sky},{icon:"🔁",t:"ViT",d:"Vision Transformers — attention for images",c:s.lavender}].map(i=>e.jsxs("div",{style:{background:s.card,border:"1px solid "+i.c+"33",borderRadius:8,padding:12},children:[e.jsx("div",{style:{fontSize:22,marginBottom:6},children:i.icon}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:10,color:i.c,marginBottom:4},children:i.t}),e.jsx("div",{style:{color:s.textS,fontSize:11,lineHeight:1.5},children:i.d})]},i.t))})]})]})},A=[{id:0,short:"OVERVIEW",label:"Overview & History",color:s.amber,component:Pe},{id:1,short:"THE IMAGE",label:"How Computers See",color:s.sky,component:Oe},{id:2,short:"CONVOLUTION",label:"Convolution",color:s.conv,component:De},{id:3,short:"FILTERS",label:"Filters & Feature Maps",color:s.amberL,component:Be},{id:4,short:"RELU+POOL",label:"ReLU & Pooling",color:s.relu,component:Ue},{id:5,short:"ARCHITECTURE",label:"CNN Architecture",color:s.sky,component:We},{id:6,short:"DOG PIPELINE",label:"Dog Image Pipeline",color:s.pool,component:He},{id:7,short:"MATH",label:"The Math",color:s.amberL,component:Ge},{id:8,short:"FAMOUS CNNs",label:"Famous CNNs",color:s.rust,component:qe},{id:9,short:"QUIZ",label:"Summary & Quiz",color:s.sage,component:Ve}],$e=function(){const[a,o]=v.useState(0),l=v.useRef(null),i=n=>{o(n),l.current&&(l.current.scrollTop=0)},t=A[a];return e.jsxs("div",{style:{background:s.bg,minHeight:"100vh",fontFamily:s.serif,color:s.text},children:[e.jsx("style",{children:`
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-track{background:${s.dark}}
        ::-webkit-scrollbar-thumb{background:${s.border};border-radius:3px}
        ::-webkit-scrollbar-thumb:hover{background:${s.amberD}}
        * { box-sizing:border-box }
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      `}),e.jsx("div",{style:{background:"linear-gradient(180deg,#1a0d03 0%,"+s.bg+" 100%)",borderBottom:"1px solid "+s.border,position:"sticky",top:0,zIndex:100},children:e.jsxs("div",{style:{maxWidth:1120,margin:"0 auto",padding:"16px 28px 0"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:s.mono,fontSize:8,color:s.amberD,letterSpacing:5,marginBottom:6},children:"COMPUTER VISION · INTERACTIVE CURRICULUM · HIGH SCHOOL"}),e.jsx("div",{style:{fontFamily:s.serif,fontSize:22,background:"linear-gradient(90deg,"+s.amber+","+s.rustL+")",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontWeight:"bold",lineHeight:1.2,marginBottom:3},children:"Convolutional Neural Networks"}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:11,color:s.textS},children:'From dog photo to "92.4% probability — this is a dog!"'})]}),e.jsxs("div",{style:{textAlign:"right",fontFamily:s.mono,fontSize:10,color:s.textS,lineHeight:1.9},children:[e.jsx("div",{style:{color:s.amber},children:"🐕 Dog Image Example"}),e.jsx("div",{children:"10 interactive modules"}),e.jsx("div",{children:"Real math + visuals"})]})]}),e.jsx("div",{style:{display:"flex",gap:1,overflowX:"auto",paddingBottom:1},children:A.map(n=>e.jsxs("button",{onClick:()=>i(n.id),style:{padding:"8px 12px",border:"none",cursor:"pointer",background:a===n.id?s.card:"transparent",borderTop:"2px solid "+(a===n.id?n.color:"transparent"),color:a===n.id?n.color:s.textD,fontFamily:s.mono,fontSize:8,letterSpacing:1.5,borderRadius:"4px 4px 0 0",whiteSpace:"nowrap",flexShrink:0},children:[("0"+(n.id+1)).slice(-2)," ",n.short]},n.id))})]})}),e.jsx("div",{style:{display:"flex",height:3},children:A.map(n=>e.jsx("div",{style:{flex:1,background:n.id<=a?n.color:s.dark,transition:"background 0.3s"}},n.id))}),e.jsxs("div",{ref:l,style:{maxWidth:1120,margin:"0 auto",padding:"28px 28px 60px",animation:"fadeIn 0.35s ease"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:24},children:[e.jsx("div",{style:{fontFamily:s.mono,fontSize:8,color:s.textD,letterSpacing:2},children:"CNN LESSON"}),e.jsx("div",{style:{color:s.textD},children:"›"}),e.jsx("div",{style:{fontFamily:s.mono,fontSize:8,color:t.color,letterSpacing:2},children:t.label}),e.jsx("div",{style:{flex:1}}),e.jsxs("div",{style:{fontFamily:s.mono,fontSize:8,color:s.textD},children:[a+1," / ",A.length]})]}),e.jsx(t.component,{}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:40,paddingTop:20,borderTop:"1px solid "+s.border},children:[e.jsxs("button",{onClick:()=>i(Math.max(0,a-1)),disabled:a===0,style:{padding:"10px 24px",fontFamily:s.mono,fontSize:10,letterSpacing:2,background:a===0?"transparent":s.card,border:"1px solid "+(a===0?"transparent":s.border),color:a===0?"transparent":s.text,borderRadius:6,cursor:a===0?"default":"pointer"},children:["← ",a>0?A[a-1].short:""]}),e.jsx("div",{style:{display:"flex",gap:5},children:A.map(n=>e.jsx("button",{onClick:()=>i(n.id),style:{width:n.id===a?24:7,height:7,borderRadius:4,padding:0,background:n.id===a?n.color:n.id<a?n.color+"55":s.border,border:"none",cursor:"pointer",transition:"all 0.3s"}},n.id))}),e.jsxs("button",{onClick:()=>i(Math.min(A.length-1,a+1)),disabled:a===A.length-1,style:{padding:"10px 24px",fontFamily:s.mono,fontSize:10,letterSpacing:2,background:a===A.length-1?"transparent":t.color+"22",border:"1px solid "+(a===A.length-1?"transparent":t.color),color:a===A.length-1?"transparent":t.color,borderRadius:6,cursor:a===A.length-1?"default":"pointer"},children:[a<A.length-1?A[a+1].short:""," →"]})]})]},a)]})},Ke=`
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
`,Ye=[{id:"what",label:"What is CNN?"},{id:"why",label:"Why Use CNN?"},{id:"how",label:"How It Works"},{id:"layers",label:"Layers & Math"},{id:"example",label:"Live Example"},{id:"quiz",label:"Quiz"}],X=[[0,0,1,1,0],[0,1,1,1,1],[1,1,0,0,1],[0,1,0,0,1],[0,0,1,1,0]],le=[[1,0,-1],[1,0,-1],[1,0,-1]],Z=[{id:"input",label:`Input
Image`,color:"#00d4ff",rects:[{w:50,h:50,opacity:1}],desc:"The raw image — just numbers! Every pixel is a number from 0 (black) to 255 (white). A 28×28 grayscale image = 784 numbers.",io:"Input: 28×28×1 pixels → Output: same image data",details:[{title:"📐 Shape",body:`Width × Height × Channels
e.g. 28 × 28 × 1 (grayscale)
or 224 × 224 × 3 (RGB color)`},{title:"🔢 Values",body:`Each pixel: 0–255
(0 = black, 255 = white)`},{title:"📦 Purpose",body:"Feed raw pixel values into the network. No processing yet."}]},{id:"conv",label:`Conv
Layer`,color:"#7c3aed",rects:[{w:46,h:46,opacity:.95},{w:46,h:46,opacity:.8},{w:46,h:46,opacity:.65}],desc:"The FILTER slides across the image and looks for patterns — like edges, corners, or curves. Each filter learns a different feature automatically during training!",io:"Input: 28×28×1 → Output: 26×26×32 (with 32 filters)",details:[{title:"🎛️ Filter / Kernel",body:"A small grid (e.g. 3×3) of learned weights that slides across the image."},{title:"📊 Feature Map",body:"The output after applying one filter. High values = pattern found!"},{title:"⚙️ Parameters",body:`Filter size: 3×3
Num filters: 32
Stride: 1
Padding: 0`}]},{id:"relu",label:`ReLU
Activation`,color:"#ff6b35",rects:[{w:44,h:44,opacity:.9},{w:44,h:44,opacity:.75},{w:44,h:44,opacity:.6}],desc:"ReLU says: 'If the value is negative → make it 0. If positive → keep it.' This adds non-linearity and lets the network learn complex shapes!",io:"Input: any → Output: max(0, input) — negatives become 0",details:[{title:"🧮 Formula",body:`ReLU(x) = max(0, x)

Negative → 0
Positive → unchanged`},{title:"❓ Why?",body:"Without activation functions, layers just combine linearly — can't learn complex patterns."},{title:"🔥 Other Options",body:"Sigmoid, Tanh, Leaky ReLU — but ReLU is fastest and most common."}]},{id:"pool",label:`Pooling
Layer`,color:"#10b981",rects:[{w:30,h:30,opacity:.9},{w:30,h:30,opacity:.75},{w:30,h:30,opacity:.6}],desc:"Pooling SHRINKS the image. Max pooling picks the biggest value in each 2×2 window. This keeps the important info while making the map smaller and faster to process!",io:"Input: 26×26×32 → Output: 13×13×32 (halved!)",details:[{title:"🏊 Max Pooling",body:"Take a 2×2 region → keep only the max value. Reduces size by 2×."},{title:"📉 Why shrink?",body:"Reduces computation. Keeps dominant features. Adds translation tolerance."},{title:"🎯 Result",body:"Smaller feature maps that still capture WHERE patterns are."}]},{id:"flatten",label:"Flatten",color:"#f59e0b",rects:[{w:12,h:60,opacity:1}],desc:"Take all the 2D feature maps and UNROLL them into one long 1D list of numbers. This list is then fed into the regular neural network layers.",io:"Input: 13×13×32 → Output: 5408 numbers in a row",details:[{title:"📊 Shape change",body:`3D tensor → 1D vector
13 × 13 × 32 = 5408 values`},{title:"🔗 Bridge",body:"Connects the convolutional part (spatial) to the fully-connected part (classification)."}]},{id:"fc",label:`Fully
Connected`,color:"#ec4899",rects:[{w:14,h:55,opacity:.9},{w:14,h:45,opacity:.8}],desc:"Every neuron connects to every neuron in the next layer. These layers combine all the features to make a final decision about what the image is.",io:"Input: 5408 → Hidden: 128 → Output: 10 classes",details:[{title:"🧠 Dense Layer",body:"Each connection has a weight. Output = sum(weight × input) + bias → ReLU"},{title:"🔢 Size",body:"5408 → 128 neurons → 10 neurons (one per class)"},{title:"💡 Role",body:"'Reasons' about combined features to produce the final classification."}]},{id:"softmax",label:`Softmax
Output`,color:"#06b6d4",rects:[{w:14,h:40,opacity:1}],desc:"Softmax converts raw scores into PROBABILITIES that add up to 100%. The class with the highest probability is the network's prediction!",io:"Input: 10 raw scores → Output: 10 probabilities (sum=1.0)",details:[{title:"📊 Formula",body:`P(class i) = e^(score_i) / Σe^(score_j)
All values: 0 to 1
All sum: exactly 1.0`},{title:"🏆 Decision",body:"argmax(probabilities) = predicted class"},{title:"🎯 Example",body:"Cat: 87%, Dog: 10%, Bird: 3% → Predict: CAT"}]}],B=[{q:"What does a Convolutional layer's filter (kernel) do?",options:["Shrinks the image in half","Slides over the image to detect patterns like edges","Converts the image to probabilities","Removes all negative values"],correct:1,explanation:"✅ Correct! A filter (kernel) slides across the image performing dot products, looking for specific patterns like edges, curves, or textures. Different filters detect different features!"},{q:"What does ReLU activation do to a value of -5?",options:["Keeps it as -5","Changes it to 5","Changes it to 0","Changes it to 0.5"],correct:2,explanation:"✅ Exactly! ReLU(x) = max(0, x). So ReLU(-5) = max(0, -5) = 0. Negative values become zero. Positive values stay the same!"},{q:"Why do we use Pooling layers in a CNN?",options:["To add more trainable weights","To make the image larger","To reduce the size and keep important features","To shuffle the pixels randomly"],correct:2,explanation:"✅ Right! Pooling reduces the spatial size (e.g., 26×26 → 13×13), which reduces computation while retaining the most important features detected by the filters."},{q:"In the output layer with Softmax, what does the network predict?",options:["The pixel values of the image","The class with the highest probability","The number of layers in the network","The filter size used in convolution"],correct:1,explanation:"✅ Perfect! Softmax converts raw scores to probabilities. The class with the HIGHEST probability is the final prediction. For example, if 'cat' has 90% probability, the network predicts 'cat'!"}],Xe=function(a,o,l,i){let t=0;for(let n=0;n<3;n++)for(let p=0;p<3;p++)t+=a[l+n][i+p]*o[n][p];return t},Ze=function(){return e.jsxs("div",{className:"slide-in",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("div",{className:"section-num",children:"1"}),e.jsx("div",{className:"section-title",children:"What is a CNN?"})]}),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:[e.jsx("span",{className:"icon",children:"🧠"})," The Big Idea"]}),e.jsxs("p",{children:["A ",e.jsx("span",{className:"highlight",children:"Convolutional Neural Network (CNN)"})," is a type of artificial intelligence that can ",e.jsx("span",{className:"highlight",children:"look at images"})," and understand what's in them — just like your eyes and brain do!"]}),e.jsxs("p",{children:[`Imagine teaching a computer to recognize a cat. A CNN doesn't look for "fur" or "whiskers" the way a human might describe it — instead it `,e.jsx("span",{className:"highlight2",children:"automatically learns"})," which pixel patterns appear in cat photos by studying thousands of examples."]}),e.jsxs("p",{children:["The word ",e.jsx("span",{className:"highlight3",children:'"Convolutional"'})," comes from a math operation called ",e.jsx("em",{children:"convolution"}),` — sliding a small filter over the image to detect patterns. "Neural Network" means it's inspired by how neurons in your brain connect and communicate.`]})]}),e.jsx("div",{className:"info-grid",children:[{emoji:"👁️",title:"Sees Patterns",body:"CNNs detect low-level features first (edges, colors) then combine them into high-level features (shapes, objects)."},{emoji:"📚",title:"Learns from Data",body:"Feed it thousands of labeled images and it figures out the patterns on its own — no manual rules needed!"},{emoji:"🔬",title:"Inspired by Biology",body:"Based on how the visual cortex in animal brains processes visual information in hierarchical layers."},{emoji:"⚡",title:"Super Fast",body:"Once trained, a CNN can classify an image in milliseconds — much faster than a human expert!"}].map(a=>e.jsxs("div",{className:"info-box",children:[e.jsx("div",{className:"emoji",children:a.emoji}),e.jsx("h3",{children:a.title}),e.jsx("p",{children:a.body})]},a.title))}),e.jsxs("div",{className:"card",style:{marginTop:24},children:[e.jsxs("div",{className:"card-title",children:[e.jsx("span",{className:"icon",children:"🏗️"})," The Human Analogy"]}),e.jsx("p",{children:"Think of how YOU recognize a dog in a photo:"}),e.jsxs("p",{children:[e.jsx("span",{className:"tag tag-blue",children:"Step 1"})," Your eyes detect ",e.jsx("strong",{children:"edges"})," and ",e.jsx("strong",{children:"colors"})," (low-level)"]}),e.jsxs("p",{children:[e.jsx("span",{className:"tag tag-purple",children:"Step 2"})," Your brain groups edges into ",e.jsx("strong",{children:"shapes"})," — a round head, four legs (mid-level)"]}),e.jsxs("p",{children:[e.jsx("span",{className:"tag tag-orange",children:"Step 3"})," You combine shapes to recognize ",e.jsx("strong",{children:`"that's a dog!"`})," (high-level)"]}),e.jsxs("p",{style:{marginTop:12},children:["A CNN does ",e.jsx("span",{className:"highlight",children:"exactly the same thing"}),", just with math and matrices instead of neurons. Each layer of the CNN builds on the previous one, from simple to complex!"]})]})]})},Qe=function(){return e.jsxs("div",{className:"slide-in",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("div",{className:"section-num",children:"2"}),e.jsx("div",{className:"section-title",children:"Why Do We Use CNNs?"})]}),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:[e.jsx("span",{className:"icon",children:"❓"})," The Problem with Regular Neural Networks"]}),e.jsxs("p",{children:["Imagine a tiny 32×32 pixel image. That's ",e.jsx("span",{className:"highlight",children:"32 × 32 × 3 = 3,072 numbers"})," (one for each color channel). A regular neural network (MLP) would connect EVERY one of those to EVERY neuron — that's millions of connections just for a tiny image!"]}),e.jsxs("p",{children:["For a 224×224 image: ",e.jsx("span",{className:"highlight2",children:"224 × 224 × 3 = 150,528 input numbers"}),". With 1,000 neurons in the first layer, that's ",e.jsx("span",{className:"highlight2",children:"150 million parameters"})," in just one layer. Way too many! CNNs solve this by using shared filters."]})]}),e.jsx("div",{className:"rw-grid",children:[{emoji:"🏥",title:"Medical Imaging",body:"Detect tumors in X-rays, MRI scans. Helps doctors diagnose cancer earlier than the human eye can."},{emoji:"🚗",title:"Self-Driving Cars",body:"Identify pedestrians, road signs, lane markings in real-time from camera feeds."},{emoji:"📱",title:"Face Unlock",body:"Your phone's face recognition uses CNNs to verify it's really you in milliseconds."},{emoji:"🔍",title:"Google Search",body:"Search by image — upload a photo and find similar images or identify objects."},{emoji:"🎮",title:"Game AI",body:"CNN-based AI can beat human champions at games like Go, Chess, and video games."},{emoji:"🌱",title:"Agriculture",body:"Drones with CNNs scan crops to detect disease, pests, and water stress."}].map(a=>e.jsxs("div",{className:"rw-card",children:[e.jsx("div",{className:"rw-emoji",children:a.emoji}),e.jsx("h3",{children:a.title}),e.jsx("p",{children:a.body})]},a.title))}),e.jsxs("div",{className:"card",style:{marginTop:24},children:[e.jsxs("div",{className:"card-title",children:[e.jsx("span",{className:"icon",children:"⚔️"})," CNN Advantages"]}),e.jsx("div",{className:"info-grid",children:[{emoji:"🔧",title:"Parameter Sharing",body:"One filter scans the WHOLE image. Fewer parameters = less memory & faster training."},{emoji:"🌍",title:"Translation Invariant",body:"A cat in the top-left is recognized the same as a cat in the bottom-right."},{emoji:"📐",title:"Spatial Hierarchy",body:"Automatically builds from edges → shapes → objects. No manual feature engineering!"},{emoji:"📈",title:"Scalable",body:"Works on images from 28×28 pixels all the way to 4K resolution."}].map(a=>e.jsxs("div",{className:"info-box",children:[e.jsx("div",{className:"emoji",children:a.emoji}),e.jsx("h3",{children:a.title}),e.jsx("p",{children:a.body})]},a.title))})]})]})},Je=function(){const[a,o]=v.useState(0),l=[{title:"📷 Step 1: Image → Numbers",content:e.jsxs("div",{children:[e.jsx("p",{style:{color:"var(--muted)",lineHeight:1.8,marginBottom:16},children:"Every image is just a grid of numbers! For grayscale: one number per pixel (0–255). For color (RGB): three numbers per pixel — one for Red, Green, and Blue channels."}),e.jsxs("div",{style:{display:"flex",gap:20,flexWrap:"wrap",justifyContent:"center"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{className:"pixel-label",children:"Original 5×5 Grayscale Image"}),e.jsx("div",{className:"pixel-grid",style:{gridTemplateColumns:"repeat(5,1fr)"},children:X.map((i,t)=>i.map((n,p)=>e.jsx("div",{className:"pixel-cell",style:{backgroundColor:n?"#e2e8f0":"#1a2235",color:n?"#1a2235":"#64748b"},children:n},`${t}-${p}`)))})]}),e.jsx("div",{style:{alignSelf:"center",fontSize:28,color:"var(--accent)"},children:"→"}),e.jsx("div",{style:{flex:1,minWidth:180},children:e.jsxs("div",{className:"math-box",children:["Pixel (0,0) = 0 (black)",e.jsx("br",{}),"Pixel (0,2) = 1 (white)",e.jsx("br",{}),"Pixel (1,1) = 1 (white)",e.jsx("br",{}),e.jsx("br",{}),e.jsx("span",{className:"math-comment",children:"# Color image (RGB):"}),e.jsx("br",{}),"Pixel (r,c) = [R, G, B]",e.jsx("br",{}),"e.g. = [255, 128, 0]",e.jsx("br",{}),e.jsx("span",{className:"math-comment",children:"# → orange pixel"})]})})]})]})},{title:"🔍 Step 2: Convolution — Sliding Filter",content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:"var(--muted)",lineHeight:1.8,marginBottom:16},children:["A ",e.jsx("span",{style:{color:"var(--accent)",fontWeight:700},children:"filter (kernel)"})," is a small grid of weights (e.g. 3×3). It slides over the image, and at each position, we multiply and sum the filter values with the image values beneath it. This produces a ",e.jsx("span",{style:{color:"var(--accent2)",fontWeight:700},children:"feature map"})," showing where the pattern was found."]}),e.jsxs("div",{style:{display:"flex",gap:20,flexWrap:"wrap",justifyContent:"center",alignItems:"center"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{className:"pixel-label",children:"Input Image (5×5)"}),e.jsx("div",{className:"pixel-grid",style:{gridTemplateColumns:"repeat(5,1fr)"},children:X.map((i,t)=>i.map((n,p)=>e.jsx("div",{className:"pixel-cell",style:{backgroundColor:n?"#e2e8f0":"#1a2235",color:n?"#1a2235":"#64748b",border:t<3&&p<3?"2px solid #00d4ff":"1px solid rgba(255,255,255,0.05)",boxShadow:t<3&&p<3?"0 0 8px rgba(0,212,255,0.5)":"none"},children:n},`${t}-${p}`)))}),e.jsx("div",{style:{fontSize:11,color:"var(--accent)",marginTop:6},children:"Blue box = filter position"})]}),e.jsx("div",{style:{textAlign:"center",fontSize:22,color:"var(--muted)"},children:"✕"}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{className:"pixel-label",children:"Filter / Kernel (3×3)"}),e.jsx("div",{className:"filter-grid",style:{gridTemplateColumns:"repeat(3,1fr)",gap:2,border:"1px solid var(--border)",padding:4,borderRadius:8,background:"var(--surface2)"},children:le.map((i,t)=>i.map((n,p)=>e.jsx("div",{className:"filter-cell",style:{background:n>0?"rgba(124,58,237,0.6)":n<0?"rgba(255,107,53,0.5)":"rgba(255,255,255,0.1)"},children:n},`k${t}-${p}`)))}),e.jsx("div",{style:{fontSize:10,color:"var(--muted)",marginTop:6},children:"Purple=+1, Orange=-1, Gray=0"})]}),e.jsx("div",{style:{fontSize:22,color:"var(--muted)"},children:"→"}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{className:"pixel-label",children:"Feature Map (3×3)"}),e.jsx("div",{className:"filter-grid",style:{gridTemplateColumns:"repeat(3,1fr)",gap:4},children:[0,1,2].map(i=>[0,1,2].map(t=>{const n=Xe(X,le,i,t),p=(n+3)/6;return e.jsx("div",{className:"result-cell",style:{background:`rgba(${Math.round(p*255)}, ${Math.round(107+p*50)}, 53, 0.5)`},children:n},`f${i}-${t}`)}))})]})]}),e.jsxs("div",{className:"math-box",style:{marginTop:16},children:[e.jsx("span",{className:"math-comment",children:"# At position (0,0): dot product of top-left 3×3 patch with kernel"}),e.jsx("br",{}),"= (0×1) + (0×0) + (1×-1)",e.jsx("br",{}),"+ (0×1) + (1×0) + (1×-1)",e.jsx("br",{}),"+ (1×1) + (1×0) + (0×-1)",e.jsx("br",{}),"= 0 + 0 + (-1) + 0 + 0 + (-1) + 1 + 0 + 0 = ",e.jsx("span",{style:{color:"var(--accent2)"},children:"-1"})]})]})},{title:"⚡ Step 3: Apply ReLU Activation",content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:"var(--muted)",lineHeight:1.8,marginBottom:16},children:["After convolution, we apply ",e.jsx("span",{style:{color:"var(--accent2)",fontWeight:700},children:"ReLU (Rectified Linear Unit)"}),'. This activation function sets all negative values to 0. Why? Because negative activations often mean "this pattern is NOT here" — and we want to focus on where patterns ARE present.']}),e.jsxs("div",{className:"formula-card",children:[e.jsx("h4",{children:"ReLU Formula"}),e.jsx("div",{className:"formula-eq",children:"ReLU(x) = max(0, x)"}),e.jsx("p",{children:"If x is negative → output = 0  |  If x is positive → output = x (unchanged)"})]}),e.jsx("div",{style:{display:"flex",gap:16,flexWrap:"wrap",justifyContent:"center",marginTop:20},children:[[-3,0],[-1,0],[0,0],[2,2],[4,4],[7,7]].map(([i,t],n)=>e.jsxs("div",{style:{textAlign:"center"},children:[e.jsxs("div",{className:"neuron-box",children:[e.jsx("div",{className:"nb-label",children:"Input"}),e.jsx("div",{className:"nb-val",style:{color:i<0?"var(--accent2)":"var(--accent4)"},children:i})]}),e.jsx("div",{style:{fontSize:18,margin:"6px 0",color:"var(--accent)"},children:"↓ ReLU"}),e.jsxs("div",{className:"neuron-box",style:{borderColor:t>0?"var(--accent4)":"var(--border)"},children:[e.jsx("div",{className:"nb-label",children:"Output"}),e.jsx("div",{className:"nb-val",style:{color:t>0?"var(--accent4)":"var(--muted)"},children:t})]})]},n))})]})},{title:"🏊 Step 4: Max Pooling",content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:"var(--muted)",lineHeight:1.8,marginBottom:16},children:[e.jsx("span",{style:{color:"var(--accent4)",fontWeight:700},children:"Max Pooling"}),` takes a window (e.g. 2×2) and keeps only the MAXIMUM value. This shrinks the feature map by half! It's like asking: "Was this feature present `,e.jsx("em",{children:"anywhere"}),` in this region?" — we don't care exactly where, just that it was there.`]}),e.jsxs("div",{style:{display:"flex",gap:24,flexWrap:"wrap",justifyContent:"center",alignItems:"center"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{className:"pixel-label",children:"After ReLU (4×4)"}),e.jsx("div",{className:"pixel-grid",style:{gridTemplateColumns:"repeat(4,1fr)"},children:[[1,0,2,3],[0,0,1,2],[2,1,0,0],[1,3,0,1]].map((i,t)=>i.map((n,p)=>e.jsx("div",{className:"pixel-cell",style:{background:t<2&&p<2?"rgba(16,185,129,0.3)":t<2&&p>=2?"rgba(124,58,237,0.3)":t>=2&&p<2?"rgba(255,107,53,0.3)":"rgba(0,212,255,0.3)",borderColor:"rgba(255,255,255,0.1)",color:"white",fontWeight:700},children:n},`p${t}-${p}`)))})]}),e.jsx("div",{style:{fontSize:28,color:"var(--accent)"},children:"→"}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{className:"pixel-label",children:"After Max Pool (2×2)"}),e.jsx("div",{className:"pixel-grid",style:{gridTemplateColumns:"repeat(2,1fr)"},children:[{val:1,color:"rgba(16,185,129,0.5)"},{val:3,color:"rgba(124,58,237,0.5)"},{val:3,color:"rgba(255,107,53,0.5)"},{val:1,color:"rgba(0,212,255,0.5)"}].map((i,t)=>e.jsx("div",{className:"pixel-cell",style:{width:50,height:50,background:i.color,color:"white",fontWeight:900,fontSize:18},children:i.val},t))})]})]}),e.jsxs("p",{style:{color:"var(--muted)",lineHeight:1.8,marginTop:16,fontSize:14},children:["Each colored region (2×2) was compressed to its max value: top-left max(1,0,0,0)=1, top-right max(2,3,1,2)=",e.jsx("strong",{style:{color:"var(--accent4)"},children:"3"}),", bottom-left max(2,1,1,3)=",e.jsx("strong",{style:{color:"var(--accent4)"},children:"3"}),", bottom-right max(0,0,0,1)=1."]})]})},{title:"🔗 Step 5: Flatten & Classify",content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:"var(--muted)",lineHeight:1.8,marginBottom:16},children:["After convolution and pooling, we have 2D feature maps. We ",e.jsx("span",{style:{color:"var(--accent)",fontWeight:700},children:"flatten"})," them into a 1D vector, then pass it through ",e.jsx("span",{style:{color:"var(--accent3)",fontWeight:700},children:"Fully Connected (Dense) layers"})," that combine all features to make the final classification."]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:e.jsxs("div",{className:"neuron-row",style:{justifyContent:"center"},children:[e.jsxs("div",{className:"neuron-box",children:[e.jsx("div",{className:"nb-label",children:"2D Feature Maps"}),e.jsx("div",{className:"nb-val",style:{fontSize:14},children:"13×13×32"})]}),e.jsx("div",{className:"neuron-op",children:"→"}),e.jsxs("div",{className:"neuron-box",children:[e.jsx("div",{className:"nb-label",children:"Flattened Vector"}),e.jsx("div",{className:"nb-val",style:{fontSize:14},children:"5,408"})]}),e.jsx("div",{className:"neuron-op",children:"→"}),e.jsxs("div",{className:"neuron-box",children:[e.jsx("div",{className:"nb-label",children:"Dense Layer"}),e.jsx("div",{className:"nb-val",style:{fontSize:14},children:"128"})]}),e.jsx("div",{className:"neuron-op",children:"→"}),e.jsxs("div",{className:"neuron-box",style:{borderColor:"var(--accent4)"},children:[e.jsx("div",{className:"nb-label",children:"Softmax Output"}),e.jsx("div",{className:"nb-val",style:{fontSize:14,color:"var(--accent4)"},children:"10 classes"})]})]})}),e.jsxs("div",{className:"formula-card",style:{marginTop:16},children:[e.jsx("h4",{children:"Dense Layer Calculation"}),e.jsx("div",{className:"formula-eq",children:"output = ReLU( W · x + b )"}),e.jsxs("p",{children:["W = weight matrix, x = input vector, b = bias vector",e.jsx("br",{}),"Each neuron computes a weighted sum of its inputs plus a bias, then applies ReLU."]})]}),e.jsxs("div",{className:"formula-card",style:{borderLeftColor:"var(--accent4)"},children:[e.jsx("h4",{children:"Softmax Output (Final Probabilities)"}),e.jsx("div",{className:"formula-eq",style:{color:"var(--accent4)"},children:"P(class i) = exp(zᵢ) / Σ exp(zⱼ)"}),e.jsx("p",{children:"Converts raw scores to probabilities (0–1) that all sum to 1.0. The highest probability = prediction!"})]})]})}];return e.jsxs("div",{className:"slide-in",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("div",{className:"section-num",children:"3"}),e.jsx("div",{className:"section-title",children:"How CNNs Work — Step by Step"})]}),e.jsx("div",{className:"steps-nav",children:l.map((i,t)=>e.jsxs("button",{className:`step-btn ${a===t?"active":""}`,onClick:()=>o(t),children:[e.jsx("span",{className:"step-num",children:t+1}),i.title.split(" ").slice(1,3).join(" ")]},t))}),e.jsx("div",{className:"progress-bar-wrap",children:e.jsx("div",{className:"progress-bar",style:{width:`${(a+1)/l.length*100}%`}})}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:l[a].title}),l[a].content]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:12},children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>o(Math.max(0,a-1)),disabled:a===0,style:{opacity:a===0?.4:1},children:"← Previous"}),e.jsx("button",{className:"btn btn-primary",onClick:()=>o(Math.min(l.length-1,a+1)),disabled:a===l.length-1,style:{opacity:a===l.length-1?.4:1},children:"Next Step →"})]})]})},es=function(){const[a,o]=v.useState(0),l=Z[a];return e.jsxs("div",{className:"slide-in",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("div",{className:"section-num",children:"4"}),e.jsx("div",{className:"section-title",children:"CNN Architecture & Math"})]}),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:[e.jsx("span",{className:"icon",children:"🏗️"})," Click Any Layer to Explore"]}),e.jsxs("p",{style:{marginBottom:20,color:"var(--muted)"},children:["A CNN is made of ",e.jsx("span",{style:{color:"var(--accent)",fontWeight:700},children:"stacked layers"}),", each transforming the data. Click each layer below to see what it does!"]}),e.jsx("div",{className:"arch-container",children:e.jsx("div",{className:"arch-flow",children:Z.map((i,t)=>e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:`arch-layer ${a===t?"selected":""}`,onClick:()=>o(t),children:[e.jsx("div",{className:"arch-visual",children:i.rects.map((n,p)=>e.jsx("div",{className:"arch-rect",style:{width:n.w,height:n.h,background:a===t?`${i.color}cc`:`${i.color}55`,border:`2px solid ${i.color}${a===t?"ff":"77"}`,boxShadow:a===t?`0 0 15px ${i.color}66`:"none",transform:p>0?`translateX(-${p*4}px)`:"none",zIndex:p}},p))}),e.jsx("div",{className:"arch-label",style:{color:a===t?i.color:"var(--muted)"},children:i.label})]},i.id),t<Z.length-1&&e.jsx("div",{className:"arch-arrow",children:"→"},`arr-${t}`)]}))})}),e.jsxs("div",{className:"layer-detail",children:[e.jsxs("h3",{style:{color:l.color},children:["📌 ",l.label.replace(`
`," ")," Layer"]}),e.jsx("p",{style:{marginBottom:12},children:l.desc}),e.jsxs("div",{className:"math-box",style:{fontSize:13},children:[e.jsx("span",{className:"math-comment",children:"# I/O dimensions:"}),e.jsx("br",{}),l.io]}),e.jsx("div",{className:"detail-grid",children:l.details.map((i,t)=>e.jsxs("div",{className:"detail-box",children:[e.jsx("h4",{children:i.title}),e.jsx("p",{children:i.body})]},t))})]})]}),e.jsxs("div",{className:"card",style:{marginTop:0},children:[e.jsxs("div",{className:"card-title",children:[e.jsx("span",{className:"icon",children:"⚖️"})," Weights, Biases & Activation — The Core Math"]}),e.jsxs("div",{className:"formula-card",children:[e.jsx("h4",{children:"🔢 What are Weights?"}),e.jsx("div",{className:"formula-eq",children:"output = w₁·x₁ + w₂·x₂ + w₃·x₃ + ... + wₙ·xₙ + b"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Weights (w)"})," are the values the network ",e.jsx("span",{style:{color:"var(--accent4)"},children:"learns during training"}),'. Each connection between neurons has a weight. A high weight means "this input matters a LOT." A low weight means "this input is not important." The network adjusts weights using a process called ',e.jsx("span",{style:{color:"var(--accent)",fontWeight:700},children:"backpropagation"}),"."]})]}),e.jsxs("div",{className:"formula-card",style:{borderLeftColor:"var(--accent2)"},children:[e.jsx("h4",{children:"⬛ What is Bias?"}),e.jsx("div",{className:"formula-eq",style:{color:"var(--accent2)"},children:"output = (weights · inputs) + bias"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Bias (b)"}),` lets the neuron "shift" its output. Without bias, every neuron's output would be 0 when all inputs are 0. Bias lets the neuron fire even when inputs are small, giving the network more flexibility to fit any pattern.`]})]}),e.jsxs("div",{className:"formula-card",style:{borderLeftColor:"var(--accent4)"},children:[e.jsx("h4",{children:"⚡ What is Activation?"}),e.jsxs("div",{className:"formula-eq",style:{color:"var(--accent4)"},children:["ReLU(x) = max(0, x)",e.jsx("br",{}),"Sigmoid(x) = 1 / (1 + e^(−x))",e.jsx("br",{}),"Softmax(xᵢ) = e^(xᵢ) / Σ e^(xⱼ)"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Activation functions"}),' add non-linearity. Without them, stacking layers is mathematically equivalent to just one layer! They decide how "excited" a neuron should be, similar to how a real neuron fires only when stimulated enough.']})]}),e.jsxs("div",{style:{marginTop:20},children:[e.jsxs("div",{className:"card-title",style:{marginBottom:12},children:[e.jsx("span",{className:"icon",children:"🔁"})," How Training Works"]}),e.jsx("div",{className:"info-grid",style:{gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))"},children:[{num:"1",title:"Forward Pass",color:"var(--accent)",body:"Image goes through all layers. Final layer outputs predictions."},{num:"2",title:"Loss Calculation",color:"var(--accent2)",body:"Compare prediction vs. correct answer. Compute how wrong we were (loss)."},{num:"3",title:"Backpropagation",color:"var(--accent3)",body:"Calculate how much each weight contributed to the error, going backwards."},{num:"4",title:"Weight Update",color:"var(--accent4)",body:"Adjust each weight slightly in the direction that reduces the error (gradient descent)."}].map(i=>e.jsxs("div",{className:"info-box",children:[e.jsx("div",{className:"emoji",style:{fontSize:24,color:i.color,fontFamily:"Orbitron",fontWeight:900},children:i.num}),e.jsx("h3",{children:i.title}),e.jsx("p",{children:i.body})]},i.num))}),e.jsxs("div",{className:"math-box",style:{marginTop:16},children:[e.jsx("span",{className:"math-comment",children:"# Gradient Descent weight update rule:"}),e.jsx("br",{}),"w_new = w_old - learning_rate × (∂Loss / ∂w)",e.jsx("br",{}),e.jsx("span",{className:"math-comment",children:"# Do this thousands of times = training the network!"})]})]})]})]})},ss=function(){const[a,o]=v.useState(!1),[l,i]=v.useState(Array(8).fill(null).map(()=>Array(8).fill(0))),[t,n]=v.useState(null),[p,c]=v.useState("draw"),d={0:[[0,1,1,1,1,1,1,0],[1,1,0,0,0,0,1,1],[1,1,0,0,0,0,1,1],[1,1,0,0,0,0,1,1],[1,1,0,0,0,0,1,1],[1,1,0,0,0,0,1,1],[0,1,1,1,1,1,1,0],[0,0,0,0,0,0,0,0]],1:[[0,0,0,1,1,0,0,0],[0,0,1,1,1,0,0,0],[0,0,0,1,1,0,0,0],[0,0,0,1,1,0,0,0],[0,0,0,1,1,0,0,0],[0,0,0,1,1,0,0,0],[0,1,1,1,1,1,1,0],[0,0,0,0,0,0,0,0]],7:[[1,1,1,1,1,1,1,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,1,1,0],[0,0,0,0,1,1,0,0],[0,0,0,1,1,0,0,0],[0,0,0,1,1,0,0,0],[0,0,0,1,1,0,0,0],[0,0,0,0,0,0,0,0]]},r={0:{label:"0",probs:[.91,.01,.01,.01,.01,.02,.01,.01,.01,0]},1:{label:"1",probs:[.02,.89,.02,.01,.01,.02,.01,.01,.01,0]},7:{label:"7",probs:[.01,.02,.01,.01,.01,.01,.01,.88,.02,.02]}},m=(j,y,N)=>{i(C=>{const z=C.map(T=>[...T]);return z[j][y]=N!==void 0?N:1-C[j][y],z}),n(null),c("draw")},h=j=>{i(d[j].map(y=>[...y])),n(null),c("draw")},u=()=>{c("process"),setTimeout(()=>{let j="0",y=-1;for(const[N,C]of Object.entries(d)){let z=0;for(let T=0;T<8;T++)for(let M=0;M<8;M++)l[T][M]===C[T][M]&&z++;z>y&&(y=z,j=N)}n(r[j]),c("result")},1200)},f=()=>{i(Array(8).fill(null).map(()=>Array(8).fill(0))),n(null),c("draw")};return e.jsxs("div",{className:"slide-in",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("div",{className:"section-num",children:"5"}),e.jsx("div",{className:"section-title",children:"Live CNN Example — Draw a Digit!"})]}),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:[e.jsx("span",{className:"icon",children:"✏️"})," Interactive Digit Classifier"]}),e.jsxs("p",{style:{marginBottom:16},children:["This simulates what a ",e.jsx("span",{style:{color:"var(--accent)",fontWeight:700},children:"MNIST digit classifier"})," does — one of the most famous CNN benchmarks! Draw a digit (0, 1, or 7) or load an example, then click ",e.jsx("span",{style:{color:"var(--accent2)",fontWeight:700},children:"Classify!"})]}),e.jsxs("div",{style:{display:"flex",gap:24,flexWrap:"wrap",justifyContent:"center"},children:[e.jsxs("div",{children:[e.jsxs("div",{className:"pixel-controls",children:[e.jsx("button",{className:"btn btn-secondary",onClick:()=>h("0"),children:'Load "0"'}),e.jsx("button",{className:"btn btn-secondary",onClick:()=>h("1"),children:'Load "1"'}),e.jsx("button",{className:"btn btn-secondary",onClick:()=>h("7"),children:'Load "7"'}),e.jsx("button",{className:"btn btn-secondary",onClick:f,children:"🗑️ Clear"})]}),e.jsx("div",{className:"pixel-label",style:{marginBottom:8},children:"🖱️ Click pixels to toggle — draw any digit!"}),e.jsx("div",{className:"pixel-grid",style:{gridTemplateColumns:"repeat(8,1fr)",cursor:"crosshair"},onMouseLeave:()=>o(!1),children:l.map((j,y)=>j.map((N,C)=>e.jsx("div",{className:"pixel-cell",style:{width:36,height:36,backgroundColor:N?"#e2e8f0":"#0d1117",color:N?"#0d1117":"transparent",transition:"background-color 0.1s"},onMouseDown:()=>{o(!0),m(y,C)},onMouseEnter:()=>{a&&m(y,C,1)},onMouseUp:()=>o(!1),children:N},`d${y}-${C}`)))}),e.jsx("button",{className:"btn btn-orange",style:{width:"100%",marginTop:12,padding:"12px",fontSize:15},onClick:u,children:p==="process"?"🔄 Processing...":"⚡ Classify!"})]}),e.jsxs("div",{style:{flex:1,minWidth:260},children:[e.jsx("div",{className:"pixel-label",style:{marginBottom:8},children:"CNN Pipeline Visualization"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[{label:"📷 Input Layer",desc:"8×8 = 64 pixel values",active:p!=="draw"||!0,color:"var(--accent)"},{label:"🔍 Conv Layer",desc:"Filter scans for edges & curves",active:p==="process"||p==="result",color:"var(--accent3)"},{label:"⚡ ReLU + Pool",desc:"Keep strong features, shrink map",active:p==="result",color:"var(--accent2)"},{label:"🔗 Dense + Softmax",desc:"Combine features → probabilities",active:p==="result",color:"var(--accent4)"}].map((j,y)=>e.jsxs("div",{style:{padding:"12px 16px",borderRadius:10,border:`1px solid ${j.active?j.color:"var(--border)"}`,background:j.active?`${j.color}15`:"var(--surface2)",display:"flex",alignItems:"center",gap:12,transition:"all 0.4s",opacity:j.active?1:.4},children:[e.jsx("div",{style:{fontSize:20},children:j.label.split(" ")[0]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:13,fontWeight:700,color:j.active?j.color:"var(--muted)"},children:j.label.slice(j.label.indexOf(" ")+1)}),e.jsx("div",{style:{fontSize:12,color:"var(--muted)"},children:j.desc})]}),j.active&&p!=="draw"&&e.jsx("div",{style:{marginLeft:"auto",color:j.color,fontSize:16},children:"✓"})]},y))}),t&&e.jsxs("div",{style:{marginTop:16,animation:"fadeIn 0.4s ease"},children:[e.jsx("div",{className:"pixel-label",style:{marginBottom:10},children:"Softmax Output — Class Probabilities"}),t.probs.map((j,y)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:5},children:[e.jsxs("div",{style:{width:20,textAlign:"right",fontSize:12,fontFamily:"Share Tech Mono",color:y===parseInt(t.label)?"var(--accent4)":"var(--muted)"},children:[y,":"]}),e.jsx("div",{style:{flex:1,background:"var(--surface2)",borderRadius:4,height:20,overflow:"hidden"},children:e.jsx("div",{style:{width:`${j*100}%`,height:"100%",background:y===parseInt(t.label)?"linear-gradient(90deg, var(--accent4), #22c55e)":"var(--border)",transition:"width 0.6s ease",borderRadius:4}})}),e.jsxs("div",{style:{width:40,fontSize:11,fontFamily:"Share Tech Mono",color:y===parseInt(t.label)?"var(--accent4)":"var(--muted)"},children:[(j*100).toFixed(0),"%"]})]},y)),e.jsxs("div",{style:{marginTop:12,padding:12,borderRadius:10,background:"rgba(16,185,129,0.15)",border:"1px solid var(--accent4)",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:12,color:"var(--muted)",marginBottom:4},children:"PREDICTION"}),e.jsx("div",{style:{fontSize:36,fontFamily:"Orbitron",fontWeight:900,color:"var(--accent4)"},children:t.label}),e.jsxs("div",{style:{fontSize:12,color:"var(--muted)"},children:[(t.probs[parseInt(t.label)]*100).toFixed(0),"% confident"]})]})]})]})]})]})]})},as=function(){const[a,o]=v.useState(0),[l,i]=v.useState(null),[t,n]=v.useState(0),[p,c]=v.useState(!1),d=B[a],r=u=>{l===null&&(i(u),u===d.correct&&n(f=>f+1))},m=()=>{a+1>=B.length?c(!0):(o(u=>u+1),i(null))},h=()=>{o(0),i(null),n(0),c(!1)};return e.jsxs("div",{className:"slide-in",children:[e.jsxs("div",{className:"section-header",children:[e.jsx("div",{className:"section-num",children:"6"}),e.jsx("div",{className:"section-title",children:"Knowledge Check — Quiz!"})]}),p?e.jsxs("div",{className:"card",style:{textAlign:"center",padding:"40px 28px"},children:[e.jsx("div",{style:{fontSize:60,marginBottom:16},children:t===B.length?"🏆":t>=2?"🎯":"📚"}),e.jsxs("div",{style:{fontFamily:"Orbitron",fontSize:24,fontWeight:900,color:"var(--accent)",marginBottom:8},children:[t,"/",B.length," Correct!"]}),e.jsx("div",{style:{color:"var(--muted)",marginBottom:24,fontSize:16},children:t===B.length?"Perfect score! You're a CNN expert! 🚀":t>=2?"Great job! Review the sections you missed and try again.":"Keep learning! Go back and review the sections, then retry."}),e.jsx("div",{className:"progress-bar-wrap",style:{maxWidth:300,margin:"0 auto 24px"},children:e.jsx("div",{className:"progress-bar",style:{width:`${t/B.length*100}%`}})}),e.jsx("button",{className:"btn btn-primary",onClick:h,style:{padding:"12px 32px",fontSize:16},children:"🔄 Try Again"})]}):e.jsxs("div",{className:"quiz-card",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16},children:[e.jsxs("div",{style:{fontFamily:"Share Tech Mono",fontSize:12,color:"var(--muted)"},children:["QUESTION ",a+1," of ",B.length]}),e.jsxs("div",{style:{fontFamily:"Share Tech Mono",fontSize:12,color:"var(--accent4)"},children:["Score: ",t,"/",a]})]}),e.jsx("div",{className:"progress-bar-wrap",style:{marginBottom:20},children:e.jsx("div",{className:"progress-bar",style:{width:`${a/B.length*100}%`}})}),e.jsx("div",{className:"quiz-question",children:d.q}),e.jsx("div",{className:"quiz-options",children:d.options.map((u,f)=>e.jsxs("button",{className:`quiz-option ${l!==null?f===d.correct?"correct":f===l?"wrong":"":""}`,onClick:()=>r(f),children:[e.jsxs("span",{style:{marginRight:10,opacity:.5},children:[["A","B","C","D"][f],"."]}),u]},f))}),l!==null&&e.jsx("div",{className:`quiz-feedback ${l===d.correct?"correct":"wrong"}`,children:l===d.correct?d.explanation:`❌ Not quite. The correct answer is: "${d.options[d.correct]}". ${d.explanation}`}),l!==null&&e.jsx("button",{className:"btn btn-primary",style:{marginTop:16,width:"100%"},onClick:m,children:a+1>=B.length?"See Results 🏆":"Next Question →"})]}),e.jsxs("div",{className:"card",style:{marginTop:24},children:[e.jsxs("div",{className:"card-title",children:[e.jsx("span",{className:"icon",children:"📖"})," Quick Reference Cheat Sheet"]}),e.jsx("div",{className:"info-grid",children:[{tag:"tag-blue",label:"CNN",desc:"Convolutional Neural Network — special neural net for images"},{tag:"tag-purple",label:"Kernel/Filter",desc:"Small weight matrix that slides over the image to detect patterns"},{tag:"tag-orange",label:"Feature Map",desc:"Output of a convolution — shows where a pattern was found"},{tag:"tag-green",label:"ReLU",desc:"max(0,x) — activation that removes negatives"},{tag:"tag-blue",label:"Pooling",desc:"Shrinks feature maps using max or average operations"},{tag:"tag-purple",label:"Weights",desc:"Learned numbers connecting neurons — the 'knowledge' of the network"},{tag:"tag-orange",label:"Bias",desc:"Extra offset added to neuron output for more flexibility"},{tag:"tag-green",label:"Softmax",desc:"Converts scores to probabilities (0–1) that sum to 1"},{tag:"tag-blue",label:"Backprop",desc:"Algorithm to compute gradients and update weights during training"},{tag:"tag-purple",label:"Epoch",desc:"One full pass through the entire training dataset"}].map(u=>e.jsxs("div",{className:"info-box",style:{textAlign:"left",padding:"14px 16px"},children:[e.jsx("span",{className:`tag ${u.tag}`,style:{marginBottom:8,display:"inline-block"},children:u.label}),e.jsx("p",{style:{fontSize:12,marginTop:4},children:u.desc})]},u.label))})]})]})},ts=function(){const[a,o]=v.useState("what"),l={what:e.jsx(Ze,{}),why:e.jsx(Qe,{}),how:e.jsx(Je,{}),layers:e.jsx(es,{}),example:e.jsx(ss,{}),quiz:e.jsx(as,{})};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:Ke}),e.jsxs("div",{className:"cnn-app",children:[e.jsx("div",{className:"grid-bg"}),e.jsxs("div",{className:"content",children:[e.jsxs("div",{className:"hero",children:[e.jsx("div",{className:"hero-badge",children:"⬡ DEEP LEARNING MODULE"}),e.jsx("h1",{children:"Convolutional Neural Networks"}),e.jsxs("p",{children:["The AI technology that taught machines to ",e.jsx("em",{children:"see"}),". Interactive, step-by-step guide for curious minds. No experience required!"]}),e.jsxs("div",{style:{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"},children:[e.jsx("span",{className:"tag tag-blue",children:"📷 Computer Vision"}),e.jsx("span",{className:"tag tag-purple",children:"🧠 Deep Learning"}),e.jsx("span",{className:"tag tag-orange",children:"⚡ Interactive"}),e.jsx("span",{className:"tag tag-green",children:"✅ Beginner Friendly"})]})]}),e.jsx("div",{className:"nav-tabs",children:Ye.map(i=>e.jsx("button",{className:`nav-tab ${a===i.id?"active":""}`,onClick:()=>o(i.id),children:i.label},i.id))}),l[a]]})]})]})},ns=()=>{const[g,a]=v.useState("cnn"),[o,l]=v.useState(0),[i,t]=v.useState({}),n=r=>{t(m=>({...m,[r]:!m[r]}))},d=g==="cnn"?[{id:0,title:"CNN Fundamentals",icon:e.jsx(Q,{className:"w-6 h-6"})},{id:1,title:"Architecture",icon:e.jsx(de,{className:"w-6 h-6"})},{id:2,title:"Convolution",icon:e.jsx(oe,{className:"w-6 h-6"})},{id:3,title:"Pooling",icon:e.jsx(ce,{className:"w-6 h-6"})},{id:4,title:"Training Pipeline",icon:e.jsx(me,{className:"w-6 h-6"})}]:[{id:0,title:"Audio Basics",icon:e.jsx(we,{className:"w-6 h-6"})},{id:1,title:"Speech Recognition",icon:e.jsx(je,{className:"w-6 h-6"})},{id:2,title:"Audio Generation",icon:e.jsx(ae,{className:"w-6 h-6"})},{id:3,title:"Audio Classification",icon:e.jsx(Ne,{className:"w-6 h-6"})},{id:4,title:"Music Generation",icon:e.jsx(ye,{className:"w-6 h-6"})}];return e.jsx("div",{className:"min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8",children:e.jsxs("div",{className:"max-w-7xl mx-auto",children:[e.jsxs("div",{className:"bg-white rounded-lg shadow-xl p-8 mb-8",children:[e.jsx("h1",{className:"text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4",children:"Deep Learning: CNN & Audio AI Development"}),e.jsx("p",{className:"text-gray-700 text-lg",children:"Complete guide to Convolutional Neural Networks and AI-powered Audio Applications"})]}),e.jsx("div",{className:"bg-white rounded-lg shadow-lg p-6 mb-8",children:e.jsxs("div",{className:"flex gap-4",children:[e.jsxs("button",{onClick:()=>{a("cnn"),l(0)},className:`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-semibold text-lg transition-all ${g==="cnn"?"bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,children:[e.jsx(Q,{className:"w-6 h-6"}),"Convolutional Neural Networks"]}),e.jsxs("button",{onClick:()=>{a("audio"),l(0)},className:`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-semibold text-lg transition-all ${g==="audio"?"bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-lg":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,children:[e.jsx(ae,{className:"w-6 h-6"}),"Audio AI Development"]})]})}),e.jsx("div",{className:"bg-white rounded-lg shadow-lg p-6 mb-8",children:e.jsx("div",{className:"flex flex-wrap gap-3",children:d.map(r=>e.jsxs("button",{onClick:()=>l(r.id),className:`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${o===r.id?g==="cnn"?"bg-indigo-600 text-white shadow-md":"bg-pink-600 text-white shadow-md":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,children:[r.icon,e.jsx("span",{className:"font-medium",children:r.title})]},r.id))})}),g==="cnn"&&e.jsxs(e.Fragment,{children:[o===0&&e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-3xl font-bold text-indigo-900 mb-6",children:"CNN Fundamentals"}),e.jsxs("div",{className:"bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-2xl font-semibold text-gray-800 mb-4",children:"What are CNNs?"}),e.jsx("p",{className:"text-gray-700 text-lg leading-relaxed mb-4",children:"Convolutional Neural Networks (CNNs) are specialized deep learning architectures designed to process grid-like data, especially images. They automatically learn hierarchical patterns from raw pixels without manual feature engineering."}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-4 mt-6",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("div",{className:"text-3xl mb-2",children:"🎯"}),e.jsx("h4",{className:"font-semibold text-gray-800 mb-2",children:"Local Connectivity"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Neurons connect only to local regions, dramatically reducing parameters"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("div",{className:"text-3xl mb-2",children:"🔄"}),e.jsx("h4",{className:"font-semibold text-gray-800 mb-2",children:"Parameter Sharing"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Same filter applied across entire image, learning reusable features"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("div",{className:"text-3xl mb-2",children:"📐"}),e.jsx("h4",{className:"font-semibold text-gray-800 mb-2",children:"Translation Invariance"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Recognizes features regardless of position in image"})]})]})]}),e.jsxs("div",{className:"bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"CNN Pipeline Visualization"}),e.jsx("div",{className:"overflow-x-auto pb-4",children:e.jsxs("div",{className:"flex items-center gap-4 min-w-max",children:[e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"w-32 h-32 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center text-white font-bold mb-2",children:["INPUT",e.jsx("br",{}),"28×28×3"]}),e.jsx("p",{className:"text-sm",children:"RGB Image"})]}),e.jsx("div",{className:"text-2xl",children:"→"}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold mb-2",children:["CONV",e.jsx("br",{}),"26×26×32"]}),e.jsx("p",{className:"text-sm",children:"Features"})]}),e.jsx("div",{className:"text-2xl",children:"→"}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"w-28 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold mb-2",children:["POOL",e.jsx("br",{}),"13×13×32"]}),e.jsx("p",{className:"text-sm",children:"Reduced"})]}),e.jsx("div",{className:"text-2xl",children:"→"}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"w-24 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white font-bold mb-2",children:["FC",e.jsx("br",{}),"128"]}),e.jsx("p",{className:"text-sm",children:"Dense"})]}),e.jsx("div",{className:"text-2xl",children:"→"}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"w-20 h-28 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center text-white font-bold mb-2",children:["OUT",e.jsx("br",{}),"10"]}),e.jsx("p",{className:"text-sm",children:"Classes"})]})]})})]}),e.jsxs("div",{className:"bg-green-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Real-World Applications"}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("div",{className:"text-3xl mb-2",children:"🏥"}),e.jsx("h4",{className:"font-semibold mb-2",children:"Medical Imaging"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Cancer detection, X-ray analysis, MRI interpretation"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("div",{className:"text-3xl mb-2",children:"🚗"}),e.jsx("h4",{className:"font-semibold mb-2",children:"Autonomous Driving"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Object detection, lane recognition, pedestrian tracking"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("div",{className:"text-3xl mb-2",children:"👤"}),e.jsx("h4",{className:"font-semibold mb-2",children:"Face Recognition"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Security systems, photo tagging, biometric authentication"})]})]})]})]})}),o===1&&e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-3xl font-bold text-indigo-900 mb-6",children:"CNN Architecture Deep Dive"}),e.jsxs("div",{className:"bg-indigo-50 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-xl font-semibold mb-4",children:"Three Core Layer Types"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-blue-700 mb-2",children:"🔵 Convolutional Layers"}),e.jsx("p",{className:"text-sm text-gray-700 mb-2",children:"Apply learnable filters to extract features. Early layers detect edges/textures, deeper layers detect complex patterns."}),e.jsx("div",{className:"bg-blue-50 rounded p-3 text-xs font-mono",children:"Parameters = (kernel_h × kernel_w × input_channels × num_filters) + biases"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-purple-700 mb-2",children:"🟣 Pooling Layers"}),e.jsx("p",{className:"text-sm text-gray-700 mb-2",children:"Downsample feature maps, reducing dimensions while preserving important information."}),e.jsx("div",{className:"bg-purple-50 rounded p-3 text-xs font-mono",children:"No learnable parameters - pure downsampling operation"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-green-700 mb-2",children:"🟢 Fully Connected Layers"}),e.jsx("p",{className:"text-sm text-gray-700 mb-2",children:"Combine all learned features for final classification decision."}),e.jsx("div",{className:"bg-green-50 rounded p-3 text-xs font-mono",children:"Parameters = (input_neurons × output_neurons) + biases"})]})]})]}),e.jsxs("div",{className:"bg-gray-50 rounded-lg p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("h3",{className:"text-xl font-semibold flex items-center gap-2",children:[e.jsx(F,{className:"w-5 h-5"}),"Complete CNN Architecture"]}),e.jsxs("button",{onClick:()=>n("cnn-arch"),className:"flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700",children:[i["cnn-arch"]?e.jsx(E,{className:"w-4 h-4"}):e.jsx(P,{className:"w-4 h-4"}),i["cnn-arch"]?"Hide":"Show"," Code"]})]}),i["cnn-arch"]&&e.jsx("pre",{className:"bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm",children:`import torch
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
print(f"Total parameters: {sum(p.numel() for p in model.parameters()):,}")`})]})]}),o===2&&e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-3xl font-bold text-indigo-900 mb-6",children:"Convolutional Operations"}),e.jsxs("div",{className:"bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-xl font-semibold mb-4",children:"How Convolution Works"}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-6 mb-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-indigo-700 mb-3",children:"Input (5×5)"}),e.jsx("div",{className:"grid grid-cols-5 gap-1",children:[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1].map((r,m)=>e.jsx("div",{className:`aspect-square flex items-center justify-center text-xs font-bold rounded ${r?"bg-indigo-600 text-white":"bg-gray-200"}`,children:r},m))})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-indigo-700 mb-3",children:"Filter (3×3)"}),e.jsx("div",{className:"grid grid-cols-3 gap-1 mx-auto w-fit",children:[1,0,-1,1,0,-1,1,0,-1].map((r,m)=>e.jsx("div",{className:`w-12 h-12 flex items-center justify-center font-bold rounded ${r>0?"bg-green-500 text-white":r<0?"bg-red-500 text-white":"bg-gray-300"}`,children:r},m))}),e.jsx("p",{className:"text-xs text-center mt-2",children:"Edge Detector"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-indigo-700 mb-3",children:"Output (3×3)"}),e.jsx("div",{className:"grid grid-cols-3 gap-1 mx-auto w-fit",children:[0,0,0,0,0,0,0,0,0].map((r,m)=>e.jsx("div",{className:"w-12 h-12 flex items-center justify-center font-bold rounded bg-yellow-400 text-gray-800",children:r},m))})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold mb-2",children:"Mathematical Operation"}),e.jsx("p",{className:"text-sm font-mono mb-2",children:"Output[i,j] = Σ Σ (Input[i+m, j+n] × Filter[m,n]) + bias"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Element-wise multiplication and summation across the receptive field"})]})]}),e.jsxs("div",{className:"bg-yellow-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-semibold mb-4",children:"Key Hyperparameters"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-yellow-700 mb-2",children:"Kernel Size (3×3, 5×5, 7×7)"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Larger = more context, more parameters"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-yellow-700 mb-2",children:"Stride (1, 2)"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Step size when sliding filter"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-yellow-700 mb-2",children:"Padding (0, 1, 2)"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Zeros added to borders"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-yellow-700 mb-2",children:"Filters (32, 64, 128...)"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Number of feature maps to learn"})]})]})]})]}),o===3&&e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-3xl font-bold text-indigo-900 mb-6",children:"Pooling Operations"}),e.jsx("div",{className:"bg-purple-50 rounded-lg p-6",children:e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-purple-700 mb-3",children:"Max Pooling"}),e.jsx("p",{className:"text-sm mb-3",children:"Takes maximum value from each region"}),e.jsxs("div",{className:"bg-purple-100 rounded p-3 text-sm",children:["Input: 4×4 → Output: 2×2",e.jsx("br",{}),"Reduces size by 75%"]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-pink-700 mb-3",children:"Average Pooling"}),e.jsx("p",{className:"text-sm mb-3",children:"Computes average of each region"}),e.jsxs("div",{className:"bg-pink-100 rounded p-3 text-sm",children:["Smoother downsampling",e.jsx("br",{}),"Often used in final layers"]})]})]})})]}),o===4&&e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-3xl font-bold text-indigo-900 mb-6",children:"Training Pipeline"}),e.jsx("div",{className:"space-y-3",children:["Data Preparation","Forward Pass","Loss Calculation","Backpropagation","Parameter Update"].map((r,m)=>e.jsxs("div",{className:"bg-indigo-50 rounded-lg p-4 flex items-center gap-3",children:[e.jsx("div",{className:"w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold",children:m+1}),e.jsx("span",{className:"font-semibold",children:r})]},m))})]})]}),g==="audio"&&e.jsxs(e.Fragment,{children:[o===0&&e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-3xl font-bold text-pink-900 mb-6",children:"Audio Processing with AI"}),e.jsxs("div",{className:"bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-2xl font-semibold mb-4",children:"Understanding Audio Data"}),e.jsx("p",{className:"text-lg text-gray-700 mb-4",children:"Audio is a time-series signal that can be processed using various AI techniques. Modern AI models can generate, classify, and transform audio with remarkable quality."}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("div",{className:"text-3xl mb-2",children:"🎵"}),e.jsx("h4",{className:"font-semibold mb-2",children:"Waveform"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Raw amplitude values over time (44.1kHz sampling rate)"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("div",{className:"text-3xl mb-2",children:"📊"}),e.jsx("h4",{className:"font-semibold mb-2",children:"Spectrogram"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Frequency content over time (visual representation)"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("div",{className:"text-3xl mb-2",children:"🎹"}),e.jsx("h4",{className:"font-semibold mb-2",children:"Mel-Spectrogram"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Perceptually-scaled frequency representation"})]})]})]}),e.jsxs("div",{className:"bg-blue-50 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-xl font-semibold mb-4",children:"Audio Representations for AI"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-blue-700 mb-2",children:"Time Domain (Waveform)"}),e.jsx("div",{className:"bg-blue-100 rounded p-3 mb-2",children:e.jsx("div",{className:"flex items-end justify-around h-16",children:[...Array(40)].map((r,m)=>e.jsx("div",{className:"w-1 bg-blue-600 rounded-t",style:{height:`${Math.sin(m/3)*30+35}%`}},m))})}),e.jsx("p",{className:"text-sm text-gray-600",children:"Direct amplitude samples: [-1.0, 0.5, 0.2, ...]"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-purple-700 mb-2",children:"Frequency Domain (Spectrogram)"}),e.jsx("div",{className:"bg-purple-100 rounded p-3 mb-2",children:e.jsx("div",{className:"grid grid-cols-20 gap-px",children:[...Array(100)].map((r,m)=>e.jsx("div",{className:`h-3 ${["bg-purple-200","bg-purple-400","bg-purple-600","bg-purple-800"][Math.floor(Math.random()*4)]}`},m))})}),e.jsx("p",{className:"text-sm text-gray-600",children:"2D: Time (x-axis) × Frequency (y-axis) × Intensity (color)"})]})]})]}),e.jsxs("div",{className:"bg-gray-50 rounded-lg p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("h3",{className:"text-xl font-semibold flex items-center gap-2",children:[e.jsx(F,{className:"w-5 h-5"}),"Audio Preprocessing"]}),e.jsxs("button",{onClick:()=>n("audio-prep"),className:"flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700",children:[i["audio-prep"]?e.jsx(E,{className:"w-4 h-4"}):e.jsx(P,{className:"w-4 h-4"}),i["audio-prep"]?"Hide":"Show"," Code"]})]}),i["audio-prep"]&&e.jsx("pre",{className:"bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm",children:`import librosa
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
print("\\nVisualization saved!")`})]})]})}),o===1&&e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-3xl font-bold text-pink-900 mb-6",children:"Speech Recognition with AI"}),e.jsxs("div",{className:"bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-2xl font-semibold mb-4",children:"How Speech Recognition Works"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsxs("div",{className:"flex items-center gap-4 mb-3",children:[e.jsx("div",{className:"w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold",children:"1"}),e.jsx("h4",{className:"font-semibold text-lg",children:"Audio Preprocessing"})]}),e.jsx("p",{className:"text-sm text-gray-600 ml-14",children:"Convert raw audio to features (MFCC, Mel-spectrogram)"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsxs("div",{className:"flex items-center gap-4 mb-3",children:[e.jsx("div",{className:"w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold",children:"2"}),e.jsx("h4",{className:"font-semibold text-lg",children:"Acoustic Model"})]}),e.jsx("p",{className:"text-sm text-gray-600 ml-14",children:"Deep neural network (RNN/CNN/Transformer) maps audio to phonemes"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsxs("div",{className:"flex items-center gap-4 mb-3",children:[e.jsx("div",{className:"w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold",children:"3"}),e.jsx("h4",{className:"font-semibold text-lg",children:"Language Model"})]}),e.jsx("p",{className:"text-sm text-gray-600 ml-14",children:"Predicts likely word sequences from phonemes"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsxs("div",{className:"flex items-center gap-4 mb-3",children:[e.jsx("div",{className:"w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold",children:"4"}),e.jsx("h4",{className:"font-semibold text-lg",children:"Decoding"})]}),e.jsx("p",{className:"text-sm text-gray-600 ml-14",children:"Combine acoustic and language models to output text"})]})]})]}),e.jsxs("div",{className:"bg-purple-50 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-xl font-semibold mb-4",children:"Modern Speech Recognition Models"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-purple-700 mb-2",children:"Whisper (OpenAI)"}),e.jsxs("ul",{className:"text-sm space-y-1 text-gray-700",children:[e.jsx("li",{children:"• Transformer-based architecture"}),e.jsx("li",{children:"• Multilingual (99 languages)"}),e.jsx("li",{children:"• Robust to noise and accents"}),e.jsx("li",{children:"• Can translate while transcribing"})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-purple-700 mb-2",children:"Wav2Vec 2.0 (Meta)"}),e.jsxs("ul",{className:"text-sm space-y-1 text-gray-700",children:[e.jsx("li",{children:"• Self-supervised learning"}),e.jsx("li",{children:"• Requires minimal labeled data"}),e.jsx("li",{children:"• State-of-the-art on benchmarks"}),e.jsx("li",{children:"• Transfer learning friendly"})]})]})]})]}),e.jsxs("div",{className:"bg-gray-50 rounded-lg p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("h3",{className:"text-xl font-semibold flex items-center gap-2",children:[e.jsx(F,{className:"w-5 h-5"}),"Speech Recognition Implementation"]}),e.jsxs("button",{onClick:()=>n("speech-rec"),className:"flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700",children:[i["speech-rec"]?e.jsx(E,{className:"w-4 h-4"}):e.jsx(P,{className:"w-4 h-4"}),i["speech-rec"]?"Hide":"Show"," Code"]})]}),i["speech-rec"]&&e.jsx("pre",{className:"bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm",children:`# Method 1: Using Whisper (OpenAI)
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
print(f"Model parameters: {sum(p.numel() for p in model.parameters()):,}")`})]})]}),o===2&&e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-3xl font-bold text-pink-900 mb-6",children:"AI Audio Generation"}),e.jsxs("div",{className:"bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-2xl font-semibold mb-4",children:"Text-to-Speech (TTS) Models"}),e.jsx("p",{className:"text-lg text-gray-700 mb-4",children:"Modern TTS systems use deep learning to generate natural-sounding speech from text, with control over voice characteristics, emotion, and prosody."}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-purple-700 mb-2",children:"Tacotron 2"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Seq2seq model with attention mechanism for mel-spectrogram generation"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-pink-700 mb-2",children:"FastSpeech 2"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Non-autoregressive, fast parallel generation with explicit duration modeling"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-red-700 mb-2",children:"VITS"}),e.jsx("p",{className:"text-sm text-gray-600",children:"End-to-end model generating waveforms directly from text"})]})]})]}),e.jsxs("div",{className:"bg-blue-50 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-xl font-semibold mb-4",children:"TTS Pipeline"}),e.jsxs("div",{className:"flex items-center justify-around flex-wrap gap-4",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"w-32 h-24 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold mb-2",children:"TEXT"}),e.jsx("p",{className:"text-sm",children:'"Hello world"'})]}),e.jsx("div",{className:"text-2xl",children:"→"}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"w-32 h-24 bg-purple-500 text-white rounded-lg flex items-center justify-center font-bold mb-2",children:"PHONEMES"}),e.jsx("p",{className:"text-sm",children:"/həˈloʊ wɜrld/"})]}),e.jsx("div",{className:"text-2xl",children:"→"}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"w-32 h-24 bg-pink-500 text-white rounded-lg flex items-center justify-center font-bold mb-2",children:"MEL-SPEC"}),e.jsx("p",{className:"text-sm",children:"Acoustic features"})]}),e.jsx("div",{className:"text-2xl",children:"→"}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"w-32 h-24 bg-red-500 text-white rounded-lg flex items-center justify-center font-bold mb-2",children:"WAVEFORM"}),e.jsx("p",{className:"text-sm",children:"Audio signal"})]})]})]}),e.jsxs("div",{className:"bg-gray-50 rounded-lg p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("h3",{className:"text-xl font-semibold flex items-center gap-2",children:[e.jsx(F,{className:"w-5 h-5"}),"Text-to-Speech Implementation"]}),e.jsxs("button",{onClick:()=>n("tts"),className:"flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700",children:[i.tts?e.jsx(E,{className:"w-4 h-4"}):e.jsx(P,{className:"w-4 h-4"}),i.tts?"Hide":"Show"," Code"]})]}),i.tts&&e.jsx("pre",{className:"bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm",children:`# Method 1: Using gTTS (Google Text-to-Speech)
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

print("\\nTTS implementation examples completed!")`})]})]}),o===3&&e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-3xl font-bold text-pink-900 mb-6",children:"Audio Classification with Deep Learning"}),e.jsxs("div",{className:"bg-gradient-to-r from-green-100 to-teal-100 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-2xl font-semibold mb-4",children:"Applications"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-green-700 mb-2",children:"🎵 Music Genre Classification"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Categorize music into genres (rock, jazz, classical, etc.)"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-teal-700 mb-2",children:"🔊 Environmental Sound Classification"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Identify sounds (dog bark, car horn, rain, etc.)"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-blue-700 mb-2",children:"😊 Emotion Recognition"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Detect emotions from speech (happy, sad, angry, neutral)"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-purple-700 mb-2",children:"🎤 Speaker Identification"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Recognize who is speaking from voice characteristics"})]})]})]}),e.jsxs("div",{className:"bg-gray-50 rounded-lg p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("h3",{className:"text-xl font-semibold flex items-center gap-2",children:[e.jsx(F,{className:"w-5 h-5"}),"Audio Classification Model"]}),e.jsxs("button",{onClick:()=>n("audio-class"),className:"flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700",children:[i["audio-class"]?e.jsx(E,{className:"w-4 h-4"}):e.jsx(P,{className:"w-4 h-4"}),i["audio-class"]?"Hide":"Show"," Code"]})]}),i["audio-class"]&&e.jsx("pre",{className:"bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm",children:`import torch
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
print(f"Model parameters: {sum(p.numel() for p in model.parameters()):,}")`})]})]}),o===4&&e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-3xl font-bold text-pink-900 mb-6",children:"AI Music Generation"}),e.jsxs("div",{className:"bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-2xl font-semibold mb-4",children:"Modern Music Generation Models"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-purple-700 mb-2",children:"🎹 MusicGen (Meta)"}),e.jsxs("ul",{className:"text-sm space-y-1 text-gray-700",children:[e.jsx("li",{children:"• Text-to-music generation"}),e.jsx("li",{children:"• Melody conditioning"}),e.jsx("li",{children:"• Multi-track composition"}),e.jsx("li",{children:"• Controllable duration & style"})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-pink-700 mb-2",children:"🎵 Jukebox (OpenAI)"}),e.jsxs("ul",{className:"text-sm space-y-1 text-gray-700",children:[e.jsx("li",{children:"• Raw audio generation"}),e.jsx("li",{children:"• Artist & genre control"}),e.jsx("li",{children:"• Lyrics conditioning"}),e.jsx("li",{children:"• Long-form coherence"})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-red-700 mb-2",children:"🎼 AudioCraft"}),e.jsxs("ul",{className:"text-sm space-y-1 text-gray-700",children:[e.jsx("li",{children:"• Unified framework"}),e.jsx("li",{children:"• Sound effects generation"}),e.jsx("li",{children:"• Music generation"}),e.jsx("li",{children:"• Audio compression"})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-orange-700 mb-2",children:"🎸 Magenta"}),e.jsxs("ul",{className:"text-sm space-y-1 text-gray-700",children:[e.jsx("li",{children:"• RNN-based music"}),e.jsx("li",{children:"• Continue melodies"}),e.jsx("li",{children:"• Drum generation"}),e.jsx("li",{children:"• Style transfer"})]})]})]})]}),e.jsxs("div",{className:"bg-gray-50 rounded-lg p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("h3",{className:"text-xl font-semibold flex items-center gap-2",children:[e.jsx(F,{className:"w-5 h-5"}),"Music Generation Implementation"]}),e.jsxs("button",{onClick:()=>n("music-gen"),className:"flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700",children:[i["music-gen"]?e.jsx(E,{className:"w-4 h-4"}):e.jsx(P,{className:"w-4 h-4"}),i["music-gen"]?"Hide":"Show"," Code"]})]}),i["music-gen"]&&e.jsx("pre",{className:"bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm",children:`# Method 1: Using MusicGen (Meta)
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

print("\\nMusic generation examples completed!")`})]})]})]}),e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-6 mt-8 text-center",children:[e.jsx("p",{className:"text-gray-600 font-semibold",children:"🎓 Complete Deep Learning Guide: CNN & Audio AI"}),e.jsx("p",{className:"text-sm text-gray-500 mt-2",children:"Switch between CNN and Audio AI tabs above • Click sections to explore in detail"}),e.jsxs("div",{className:"mt-4 flex justify-center gap-4 text-xs text-gray-500",children:[e.jsx("span",{children:"Built with React & Tailwind CSS"}),e.jsx("span",{children:"•"}),e.jsx("span",{children:"PyTorch Code Examples"}),e.jsx("span",{children:"•"}),e.jsx("span",{children:"Production-Ready Models"})]})]})]})})},is=()=>{const[g,a]=v.useState(0),[o,l]=v.useState({}),[i,t]=v.useState(0),n=c=>{l(d=>({...d,[c]:!d[c]}))},p=[{id:0,title:"What is a CNN?",icon:e.jsx(Q,{className:"w-6 h-6"}),content:"Convolutional Neural Networks (CNNs) are specialized deep learning models designed for processing grid-like data, particularly images. They automatically learn hierarchical patterns from raw pixel data."},{id:1,title:"CNN Architecture",icon:e.jsx(de,{className:"w-6 h-6"}),content:"CNNs consist of multiple layers: Convolutional layers, Pooling layers, and Fully Connected layers."},{id:2,title:"Convolutional Layer",icon:e.jsx(oe,{className:"w-6 h-6"}),content:"The core building block that applies filters/kernels to extract features like edges, textures, and patterns."},{id:3,title:"Pooling Layer",icon:e.jsx(ce,{className:"w-6 h-6"}),content:"Reduces spatial dimensions while retaining important features, providing translation invariance."},{id:4,title:"Fully Connected Layer",icon:e.jsx(me,{className:"w-6 h-6"}),content:"Combines features for final classification, connecting every neuron to all activations from the previous layer."}];return e.jsx("div",{className:"min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8",children:e.jsxs("div",{className:"max-w-6xl mx-auto",children:[e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8 mb-8",children:[e.jsx("h1",{className:"text-4xl font-bold text-indigo-900 mb-4",children:"Convolutional Neural Networks (CNN) - Interactive Guide"}),e.jsx("p",{className:"text-gray-700 text-lg",children:"Learn CNN fundamentals through interactive visualizations, code examples, and real-world applications"})]}),e.jsx("div",{className:"bg-white rounded-lg shadow-lg p-6 mb-8",children:e.jsx("div",{className:"flex flex-wrap gap-4",children:p.map(c=>e.jsxs("button",{onClick:()=>a(c.id),className:`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${g===c.id?"bg-indigo-600 text-white shadow-md":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,children:[c.icon,e.jsx("span",{className:"font-medium",children:c.title})]},c.id))})}),g===0&&e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-3xl font-bold text-indigo-900 mb-4",children:"What is a CNN?"}),e.jsx("p",{className:"text-gray-700 mb-6 text-lg leading-relaxed",children:"Convolutional Neural Networks are inspired by the visual cortex of animals. They excel at recognizing patterns in images, videos, and other grid-structured data. Unlike traditional neural networks, CNNs preserve spatial relationships in data."}),e.jsxs("div",{className:"bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"CNN vs Traditional Neural Network"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-indigo-700 mb-2",children:"Traditional NN"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center gap-2",children:e.jsx("div",{className:"w-full h-8 bg-red-200 rounded flex items-center justify-center text-sm",children:"Flatten Image (28×28 → 784)"})}),e.jsx("div",{className:"flex items-center gap-2",children:e.jsx("div",{className:"w-full h-8 bg-yellow-200 rounded flex items-center justify-center text-sm",children:"Dense Layer (784 → 128)"})}),e.jsx("div",{className:"flex items-center gap-2",children:e.jsx("div",{className:"w-full h-8 bg-green-200 rounded flex items-center justify-center text-sm",children:"Output (10 classes)"})})]}),e.jsx("p",{className:"text-sm text-gray-600 mt-3",children:"❌ Loses spatial information"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-indigo-700 mb-2",children:"CNN"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"flex items-center gap-2",children:e.jsx("div",{className:"w-full h-8 bg-blue-200 rounded flex items-center justify-center text-sm",children:"Conv Layer (28×28×1 → 26×26×32)"})}),e.jsx("div",{className:"flex items-center gap-2",children:e.jsx("div",{className:"w-full h-8 bg-purple-200 rounded flex items-center justify-center text-sm",children:"Pool Layer (26×26×32 → 13×13×32)"})}),e.jsx("div",{className:"flex items-center gap-2",children:e.jsx("div",{className:"w-full h-8 bg-green-200 rounded flex items-center justify-center text-sm",children:"Output (10 classes)"})})]}),e.jsx("p",{className:"text-sm text-gray-600 mt-3",children:"✅ Preserves spatial structure"})]})]})]}),e.jsxs("div",{className:"bg-indigo-50 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Key Advantages of CNNs"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-indigo-700 mb-2",children:"🎯 Local Connectivity"}),e.jsx("p",{className:"text-gray-600 text-sm",children:"Neurons connect only to local regions, reducing parameters significantly"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-indigo-700 mb-2",children:"🔄 Parameter Sharing"}),e.jsx("p",{className:"text-gray-600 text-sm",children:"Same filter applied across entire image, learning reusable features"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-indigo-700 mb-2",children:"📐 Translation Invariance"}),e.jsx("p",{className:"text-gray-600 text-sm",children:"Recognizes features regardless of their position in the image"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-indigo-700 mb-2",children:"🏗️ Hierarchical Learning"}),e.jsx("p",{className:"text-gray-600 text-sm",children:"Learns simple features first, then combines them into complex patterns"})]})]})]}),e.jsxs("div",{className:"bg-green-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Real-World Applications"}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4 text-center",children:[e.jsx("div",{className:"text-3xl mb-2",children:"🏥"}),e.jsx("h4",{className:"font-semibold text-gray-800 mb-1",children:"Medical Imaging"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Tumor detection, X-ray analysis, disease diagnosis"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4 text-center",children:[e.jsx("div",{className:"text-3xl mb-2",children:"🚗"}),e.jsx("h4",{className:"font-semibold text-gray-800 mb-1",children:"Autonomous Vehicles"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Object detection, lane recognition, traffic sign classification"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4 text-center",children:[e.jsx("div",{className:"text-3xl mb-2",children:"👤"}),e.jsx("h4",{className:"font-semibold text-gray-800 mb-1",children:"Face Recognition"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Security systems, photo tagging, identity verification"})]})]})]})]})}),g===1&&e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-3xl font-bold text-indigo-900 mb-4",children:"CNN Architecture Overview"}),e.jsxs("div",{className:"bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-6 mb-6 overflow-x-auto",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Typical CNN Pipeline"}),e.jsxs("div",{className:"flex items-center gap-4 min-w-max pb-4",children:[e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"w-32 h-32 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center text-white font-bold mb-2",children:["INPUT",e.jsx("br",{}),"IMAGE",e.jsx("br",{}),"28×28×3"]}),e.jsx("p",{className:"text-sm text-gray-700",children:"RGB Image"})]}),e.jsx("div",{className:"text-2xl text-indigo-600",children:"→"}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold mb-2",children:["CONV",e.jsx("br",{}),"26×26×32"]}),e.jsx("p",{className:"text-sm text-gray-700",children:"Feature Maps"})]}),e.jsx("div",{className:"text-2xl text-indigo-600",children:"→"}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"w-32 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold mb-2",children:["POOL",e.jsx("br",{}),"13×13×32"]}),e.jsx("p",{className:"text-sm text-gray-700",children:"Downsampled"})]}),e.jsx("div",{className:"text-2xl text-indigo-600",children:"→"}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold mb-2",children:["CONV",e.jsx("br",{}),"11×11×64"]}),e.jsx("p",{className:"text-sm text-gray-700",children:"More Features"})]}),e.jsx("div",{className:"text-2xl text-indigo-600",children:"→"}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"w-32 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold mb-2",children:["POOL",e.jsx("br",{}),"5×5×64"]}),e.jsx("p",{className:"text-sm text-gray-700",children:"Smaller"})]}),e.jsx("div",{className:"text-2xl text-indigo-600",children:"→"}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"w-24 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white font-bold mb-2",children:["FC",e.jsx("br",{}),"128"]}),e.jsx("p",{className:"text-sm text-gray-700",children:"Dense"})]}),e.jsx("div",{className:"text-2xl text-indigo-600",children:"→"}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"w-20 h-32 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center text-white font-bold mb-2",children:["OUT",e.jsx("br",{}),"10"]}),e.jsx("p",{className:"text-sm text-gray-700",children:"Classes"})]})]})]}),e.jsxs("div",{className:"space-y-4 mb-6",children:[e.jsxs("div",{className:"bg-blue-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-blue-900 mb-3",children:"🔵 Convolutional Layers"}),e.jsx("p",{className:"text-gray-700 mb-3",children:"Extract features using learnable filters. Early layers detect simple features (edges, colors), deeper layers detect complex patterns (shapes, objects)."}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("p",{className:"text-sm font-mono text-gray-800",children:"Parameters: (filter_height × filter_width × input_channels × num_filters) + num_filters"}),e.jsx("p",{className:"text-sm text-gray-600 mt-2",children:"Example: 3×3 filter, 3 input channels, 32 filters = (3×3×3×32) + 32 = 896 parameters"})]})]}),e.jsxs("div",{className:"bg-purple-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-purple-900 mb-3",children:"🟣 Pooling Layers"}),e.jsx("p",{className:"text-gray-700 mb-3",children:"Reduce spatial dimensions while preserving important information. Common types: Max Pooling (takes maximum value), Average Pooling (takes average)."}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("p",{className:"text-sm font-mono text-gray-800",children:"No learnable parameters - just downsampling operation"}),e.jsx("p",{className:"text-sm text-gray-600 mt-2",children:"Example: 2×2 max pool reduces 28×28 to 14×14"})]})]}),e.jsxs("div",{className:"bg-green-50 rounded-lg p-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-green-900 mb-3",children:"🟢 Fully Connected Layers"}),e.jsx("p",{className:"text-gray-700 mb-3",children:"Connect all features for final classification. Each neuron connected to all activations from previous layer."}),e.jsxs("div",{className:"bg-white rounded p-4",children:[e.jsx("p",{className:"text-sm font-mono text-gray-800",children:"Parameters: (input_size × output_size) + output_size"}),e.jsx("p",{className:"text-sm text-gray-600 mt-2",children:"Example: 1600 inputs to 128 outputs = (1600×128) + 128 = 204,928 parameters"})]})]})]}),e.jsxs("div",{className:"bg-gray-50 rounded-lg p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("h3",{className:"text-xl font-semibold text-gray-800 flex items-center gap-2",children:[e.jsx(F,{className:"w-5 h-5"}),"PyTorch CNN Architecture"]}),e.jsxs("button",{onClick:()=>n("arch"),className:"flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors",children:[o.arch?e.jsx(E,{className:"w-4 h-4"}):e.jsx(P,{className:"w-4 h-4"}),o.arch?"Hide Code":"Show Code"]})]}),o.arch&&e.jsx("pre",{className:"bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm",children:`import torch
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
print(f"\\nTotal parameters: {total_params:,}")`})]})]})}),g===2&&e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-3xl font-bold text-indigo-900 mb-4",children:"Convolutional Layer Deep Dive"}),e.jsx("p",{className:"text-gray-700 mb-6 text-lg leading-relaxed",children:"The convolutional layer is the core building block of CNNs. It applies learnable filters (kernels) to the input, performing element-wise multiplication and summation to produce feature maps."}),e.jsxs("div",{className:"bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"How Convolution Works"}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-6 mb-6",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-indigo-700 mb-3",children:"1️⃣ Input Image (5×5)"}),e.jsx("div",{className:"grid grid-cols-5 gap-1",children:[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1].map((c,d)=>e.jsx("div",{className:`aspect-square flex items-center justify-center text-xs font-semibold rounded ${c?"bg-indigo-600 text-white":"bg-gray-200 text-gray-700"}`,children:c},d))})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-indigo-700 mb-3",children:"2️⃣ Filter/Kernel (3×3)"}),e.jsx("div",{className:"grid grid-cols-3 gap-1 mx-auto",style:{width:"fit-content"},children:[1,0,-1,1,0,-1,1,0,-1].map((c,d)=>e.jsx("div",{className:`w-12 h-12 flex items-center justify-center text-sm font-semibold rounded ${c>0?"bg-green-500 text-white":c<0?"bg-red-500 text-white":"bg-gray-300 text-gray-700"}`,children:c},d))}),e.jsx("p",{className:"text-xs text-gray-600 mt-2",children:"Vertical Edge Detector"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-indigo-700 mb-3",children:"3️⃣ Feature Map (3×3)"}),e.jsx("div",{className:"grid grid-cols-3 gap-1 mx-auto",style:{width:"fit-content"},children:[2,-1,2,-1,0,-1,2,-1,2].map((c,d)=>e.jsx("div",{className:`w-12 h-12 flex items-center justify-center text-sm font-semibold rounded ${Math.abs(c)>1?"bg-yellow-500 text-white":"bg-yellow-200 text-gray-800"}`,children:c},d))}),e.jsx("p",{className:"text-xs text-gray-600 mt-2",children:"Detected Features"})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-gray-800 mb-2",children:"Calculation Example (Top-Left Position)"}),e.jsx("p",{className:"text-sm font-mono text-gray-700 mb-2",children:"(1×1) + (0×0) + (1×-1) + (0×1) + (1×0) + (0×-1) + (1×1) + (0×0) + (1×-1) = 1 + 0 - 1 + 0 + 0 + 0 + 1 + 0 - 1 = 0"}),e.jsx("p",{className:"text-sm text-gray-600",children:"The filter slides across the image, computing this operation at each position."})]})]}),e.jsxs("div",{className:"bg-indigo-50 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Key Hyperparameters"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-indigo-700 mb-2",children:"Kernel Size"}),e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"Dimensions of the filter (e.g., 3×3, 5×5, 7×7)"}),e.jsx("p",{className:"text-xs text-gray-500",children:"Larger kernels = more context but more parameters"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-indigo-700 mb-2",children:"Stride"}),e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"Step size when sliding the filter (typically 1 or 2)"}),e.jsx("p",{className:"text-xs text-gray-500",children:"Larger stride = smaller output, faster computation"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-indigo-700 mb-2",children:"Padding"}),e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"Adding zeros around input border (SAME or VALID)"}),e.jsx("p",{className:"text-xs text-gray-500",children:"Preserves spatial dimensions, prevents information loss"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-indigo-700 mb-2",children:"Number of Filters"}),e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"How many different features to detect (e.g., 32, 64, 128)"}),e.jsx("p",{className:"text-xs text-gray-500",children:"More filters = more features learned but more computation"})]})]})]}),e.jsxs("div",{className:"bg-yellow-50 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-3",children:"Output Dimension Formula"}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("p",{className:"text-lg font-mono text-center text-gray-800 mb-4",children:"Output Size = ⌊(Input Size - Kernel Size + 2×Padding) / Stride⌋ + 1"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"bg-blue-50 rounded p-3",children:[e.jsx("p",{className:"text-sm font-semibold text-gray-800",children:"Example 1: No Padding"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Input: 28×28, Kernel: 3×3, Stride: 1, Padding: 0"}),e.jsx("p",{className:"text-sm font-mono text-indigo-600",children:"Output: ⌊(28-3+0)/1⌋+1 = 26×26"})]}),e.jsxs("div",{className:"bg-green-50 rounded p-3",children:[e.jsx("p",{className:"text-sm font-semibold text-gray-800",children:"Example 2: With Padding"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Input: 28×28, Kernel: 3×3, Stride: 1, Padding: 1"}),e.jsx("p",{className:"text-sm font-mono text-green-600",children:"Output: ⌊(28-3+2)/1⌋+1 = 28×28 (same size!)"})]}),e.jsxs("div",{className:"bg-purple-50 rounded p-3",children:[e.jsx("p",{className:"text-sm font-semibold text-gray-800",children:"Example 3: Larger Stride"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Input: 28×28, Kernel: 3×3, Stride: 2, Padding: 0"}),e.jsx("p",{className:"text-sm font-mono text-purple-600",children:"Output: ⌊(28-3+0)/2⌋+1 = 13×13"})]})]})]})]}),e.jsxs("div",{className:"bg-gray-50 rounded-lg p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("h3",{className:"text-xl font-semibold text-gray-800 flex items-center gap-2",children:[e.jsx(F,{className:"w-5 h-5"}),"Convolutional Layer Implementation"]}),e.jsxs("button",{onClick:()=>n("conv"),className:"flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors",children:[o.conv?e.jsx(E,{className:"w-4 h-4"}):e.jsx(P,{className:"w-4 h-4"}),o.conv?"Hide Code":"Show Code"]})]}),o.conv&&e.jsx("pre",{className:"bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm",children:`import torch
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

print("\\nCommon filter types loaded successfully!")`})]})]})}),g===3&&e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-3xl font-bold text-indigo-900 mb-4",children:"Pooling Layer Explained"}),e.jsx("p",{className:"text-gray-700 mb-6 text-lg leading-relaxed",children:"Pooling layers reduce the spatial dimensions of feature maps while retaining the most important information. This provides translation invariance and reduces computational cost."}),e.jsxs("div",{className:"bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Pooling Types Comparison"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"bg-white rounded-lg p-6",children:[e.jsx("h4",{className:"font-semibold text-purple-700 mb-4 text-lg",children:"Max Pooling (Most Common)"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"Input Feature Map (4×4):"}),e.jsx("div",{className:"grid grid-cols-4 gap-1",children:[1,3,2,4,5,6,7,8,3,2,1,0,1,2,3,4].map((c,d)=>e.jsx("div",{className:`aspect-square flex items-center justify-center text-sm font-semibold rounded ${[1,3,6,8].includes(d)?"bg-purple-600 text-white":"bg-purple-200 text-gray-700"}`,children:c},d))})]}),e.jsx("div",{className:"text-center text-2xl text-purple-600",children:"⬇️"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"After 2×2 Max Pooling (2×2):"}),e.jsx("div",{className:"grid grid-cols-2 gap-2 mx-auto",style:{width:"fit-content"},children:[6,8,3,4].map((c,d)=>e.jsx("div",{className:"w-16 h-16 flex items-center justify-center text-lg font-bold rounded bg-purple-600 text-white",children:c},d))})]})]}),e.jsxs("div",{className:"bg-purple-50 rounded p-3 mt-4",children:[e.jsxs("p",{className:"text-sm text-gray-700",children:[e.jsx("strong",{children:"How it works:"})," Takes the maximum value from each 2×2 region"]}),e.jsx("p",{className:"text-sm text-gray-600 mt-1",children:"✅ Preserves strongest activations"}),e.jsx("p",{className:"text-sm text-gray-600",children:"✅ Provides translation invariance"})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-6",children:[e.jsx("h4",{className:"font-semibold text-pink-700 mb-4 text-lg",children:"Average Pooling"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"Input Feature Map (4×4):"}),e.jsx("div",{className:"grid grid-cols-4 gap-1",children:[1,3,2,4,5,6,7,8,3,2,1,0,1,2,3,4].map((c,d)=>e.jsx("div",{className:"aspect-square flex items-center justify-center text-sm font-semibold rounded bg-pink-200 text-gray-700",children:c},d))})]}),e.jsx("div",{className:"text-center text-2xl text-pink-600",children:"⬇️"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"After 2×2 Avg Pooling (2×2):"}),e.jsx("div",{className:"grid grid-cols-2 gap-2 mx-auto",style:{width:"fit-content"},children:[3.75,5.25,2,2.5].map((c,d)=>e.jsx("div",{className:"w-16 h-16 flex items-center justify-center text-lg font-bold rounded bg-pink-600 text-white",children:c},d))})]})]}),e.jsxs("div",{className:"bg-pink-50 rounded p-3 mt-4",children:[e.jsxs("p",{className:"text-sm text-gray-700",children:[e.jsx("strong",{children:"How it works:"})," Computes average of each 2×2 region"]}),e.jsx("p",{className:"text-sm text-gray-600 mt-1",children:"✅ Smoother downsampling"}),e.jsx("p",{className:"text-sm text-gray-600",children:"✅ Often used in final layers"})]})]})]})]}),e.jsxs("div",{className:"bg-green-50 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Why Use Pooling?"}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("div",{className:"text-3xl mb-2",children:"📉"}),e.jsx("h4",{className:"font-semibold text-gray-800 mb-2",children:"Dimensionality Reduction"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Reduces spatial size by 75% (2×2 pooling), making computation faster and more efficient"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("div",{className:"text-3xl mb-2",children:"🎯"}),e.jsx("h4",{className:"font-semibold text-gray-800 mb-2",children:"Translation Invariance"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Small shifts in input don't significantly affect output, making network more robust"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("div",{className:"text-3xl mb-2",children:"🛡️"}),e.jsx("h4",{className:"font-semibold text-gray-800 mb-2",children:"Overfitting Prevention"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Acts as regularization by providing abstracted form of representation"})]})]})]}),e.jsxs("div",{className:"bg-blue-50 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Global Pooling"}),e.jsx("p",{className:"text-gray-700 mb-4",children:"Applied to entire feature map, converting each feature map to a single value. Often used before final classification layer."}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-blue-700 mb-2",children:"Global Average Pooling (GAP)"}),e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"Example: 5×5×256 → 256 values"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Each channel becomes single average value"}),e.jsx("div",{className:"bg-blue-100 rounded p-2 mt-2",children:e.jsx("p",{className:"text-xs font-mono",children:"Input: [7, 7, 512] → GAP → Output: [512]"})})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-blue-700 mb-2",children:"Global Max Pooling (GMP)"}),e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"Takes maximum activation from each channel"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Captures most prominent feature per channel"}),e.jsx("div",{className:"bg-blue-100 rounded p-2 mt-2",children:e.jsx("p",{className:"text-xs font-mono",children:"Input: [7, 7, 512] → GMP → Output: [512]"})})]})]})]}),e.jsxs("div",{className:"bg-gray-50 rounded-lg p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("h3",{className:"text-xl font-semibold text-gray-800 flex items-center gap-2",children:[e.jsx(F,{className:"w-5 h-5"}),"Pooling Implementation"]}),e.jsxs("button",{onClick:()=>n("pool"),className:"flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors",children:[o.pool?e.jsx(E,{className:"w-4 h-4"}):e.jsx(P,{className:"w-4 h-4"}),o.pool?"Hide Code":"Show Code"]})]}),o.pool&&e.jsx("pre",{className:"bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm",children:`import torch
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
# Output: [1, 256*(1 + 4 + 16)] = [1, 5376]`})]})]})}),g===4&&e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-8",children:[e.jsx("h2",{className:"text-3xl font-bold text-indigo-900 mb-4",children:"Fully Connected Layer & Complete Pipeline"}),e.jsx("p",{className:"text-gray-700 mb-6 text-lg leading-relaxed",children:"Fully connected (dense) layers connect every neuron to all neurons in the previous layer. They combine learned features for final classification or regression tasks."}),e.jsxs("div",{className:"bg-gradient-to-r from-green-100 to-teal-100 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"From Features to Predictions"}),e.jsx("div",{className:"bg-white rounded-lg p-6",children:e.jsxs("div",{className:"flex items-center justify-around",children:[e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold mb-2",children:["Feature",e.jsx("br",{}),"Maps",e.jsx("br",{}),"7×7×512"]}),e.jsx("p",{className:"text-xs text-gray-600",children:"CNN Output"})]}),e.jsx("div",{className:"text-2xl",children:"→"}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"w-24 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold mb-2",children:["Flatten",e.jsx("br",{}),"25,088"]}),e.jsx("p",{className:"text-xs text-gray-600",children:"1D Vector"})]}),e.jsx("div",{className:"text-2xl",children:"→"}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"w-20 h-28 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white font-bold mb-2",children:["FC",e.jsx("br",{}),"4096"]}),e.jsx("p",{className:"text-xs text-gray-600",children:"Hidden"})]}),e.jsx("div",{className:"text-2xl",children:"→"}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"w-20 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center text-white font-bold mb-2",children:["FC",e.jsx("br",{}),"1000"]}),e.jsx("p",{className:"text-xs text-gray-600",children:"Hidden"})]}),e.jsx("div",{className:"text-2xl",children:"→"}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"w-16 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center text-white font-bold mb-2",children:["Out",e.jsx("br",{}),"10"]}),e.jsx("p",{className:"text-xs text-gray-600",children:"Classes"})]})]})})]}),e.jsxs("div",{className:"bg-indigo-50 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Complete CNN Training Pipeline"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-2",children:[e.jsx("div",{className:"w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold",children:"1"}),e.jsx("h4",{className:"font-semibold text-gray-800",children:"Data Preparation"})]}),e.jsx("p",{className:"text-sm text-gray-600 ml-11",children:"Load and preprocess images, normalize pixel values, augment data, create train/validation splits"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-2",children:[e.jsx("div",{className:"w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold",children:"2"}),e.jsx("h4",{className:"font-semibold text-gray-800",children:"Forward Pass"})]}),e.jsx("p",{className:"text-sm text-gray-600 ml-11",children:"Images flow through Conv → Pool → Conv → Pool → Flatten → FC → Output layers"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-2",children:[e.jsx("div",{className:"w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold",children:"3"}),e.jsx("h4",{className:"font-semibold text-gray-800",children:"Loss Calculation"})]}),e.jsx("p",{className:"text-sm text-gray-600 ml-11",children:"Compare predictions with true labels using Cross-Entropy Loss"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-2",children:[e.jsx("div",{className:"w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold",children:"4"}),e.jsx("h4",{className:"font-semibold text-gray-800",children:"Backpropagation"})]}),e.jsx("p",{className:"text-sm text-gray-600 ml-11",children:"Compute gradients for all parameters using chain rule"})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-2",children:[e.jsx("div",{className:"w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold",children:"5"}),e.jsx("h4",{className:"font-semibold text-gray-800",children:"Parameter Update"})]}),e.jsx("p",{className:"text-sm text-gray-600 ml-11",children:"Update weights using optimizer (SGD, Adam) to minimize loss"})]})]})]}),e.jsxs("div",{className:"bg-yellow-50 rounded-lg p-6 mb-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Real-World Example: MNIST Digit Classification"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-gray-800 mb-3",children:"Problem"}),e.jsxs("ul",{className:"space-y-2 text-sm text-gray-700",children:[e.jsxs("li",{children:["• ",e.jsx("strong",{children:"Dataset:"})," 60,000 training images of handwritten digits (0-9)"]}),e.jsxs("li",{children:["• ",e.jsx("strong",{children:"Image Size:"})," 28×28 grayscale pixels"]}),e.jsxs("li",{children:["• ",e.jsx("strong",{children:"Classes:"})," 10 (digits 0-9)"]}),e.jsxs("li",{children:["• ",e.jsx("strong",{children:"Goal:"})," Classify each digit correctly"]})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-gray-800 mb-3",children:"CNN Solution"}),e.jsxs("ul",{className:"space-y-2 text-sm text-gray-700",children:[e.jsxs("li",{children:["• ",e.jsx("strong",{children:"Accuracy:"})," ~99.2% on test set"]}),e.jsxs("li",{children:["• ",e.jsx("strong",{children:"Training Time:"})," ~5-10 minutes on GPU"]}),e.jsxs("li",{children:["• ",e.jsx("strong",{children:"Parameters:"})," ~50,000 trainable weights"]}),e.jsxs("li",{children:["• ",e.jsx("strong",{children:"Inference:"})," Real-time (milliseconds)"]})]})]})]})]}),e.jsxs("div",{className:"bg-gray-50 rounded-lg p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("h3",{className:"text-xl font-semibold text-gray-800 flex items-center gap-2",children:[e.jsx(F,{className:"w-5 h-5"}),"Complete MNIST CNN Training Code"]}),e.jsxs("button",{onClick:()=>n("complete"),className:"flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors",children:[o.complete?e.jsx(E,{className:"w-4 h-4"}):e.jsx(P,{className:"w-4 h-4"}),o.complete?"Hide Code":"Show Code"]})]}),o.complete&&e.jsx("pre",{className:"bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto text-sm",children:`import torch
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
    print(f"Confidence: {torch.softmax(prediction, dim=1).max().item():.2%}")`})]}),e.jsxs("div",{className:"bg-blue-50 rounded-lg p-6 mt-6",children:[e.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-4",children:"CNN Best Practices"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-blue-700 mb-2",children:"✅ Do"}),e.jsxs("ul",{className:"space-y-1 text-sm text-gray-700",children:[e.jsx("li",{children:"• Use data augmentation (rotation, flip, crop)"}),e.jsx("li",{children:"• Normalize input images"}),e.jsx("li",{children:"• Use batch normalization between layers"}),e.jsx("li",{children:"• Apply dropout for regularization"}),e.jsx("li",{children:"• Start with pretrained models (transfer learning)"}),e.jsx("li",{children:"• Monitor validation loss to prevent overfitting"})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-4",children:[e.jsx("h4",{className:"font-semibold text-red-700 mb-2",children:"❌ Don't"}),e.jsxs("ul",{className:"space-y-1 text-sm text-gray-700",children:[e.jsx("li",{children:"• Use too many parameters (overfitting risk)"}),e.jsx("li",{children:"• Skip validation set evaluation"}),e.jsx("li",{children:"• Use very large learning rates"}),e.jsx("li",{children:"• Forget to shuffle training data"}),e.jsx("li",{children:"• Train on unbalanced datasets without adjustment"}),e.jsx("li",{children:"• Ignore GPU memory limitations"})]})]})]})]})]})}),e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-6 mt-8 text-center",children:[e.jsx("p",{className:"text-gray-600",children:"🎓 Interactive CNN Learning Guide • Built with React & Tailwind CSS"}),e.jsx("p",{className:"text-sm text-gray-500 mt-2",children:"Navigate through sections above to explore CNN concepts in depth"})]})]})})};function gs(){const[g,a]=ve.useState(0),o=[{label:"ðŸ« Class Activity",component:e.jsx(Ee,{})},{label:"ðŸ“š CNN Lesson",component:e.jsx($e,{})},{label:"ðŸš€ CNN Tutorial",component:e.jsx(ts,{})},{label:"ðŸŽµ Audio AI Guide",component:e.jsx(ns,{})},{label:"ðŸ”¬ CNN Basics",component:e.jsx(is,{})}];return e.jsxs("div",{style:{fontFamily:"sans-serif",minHeight:"100vh",background:"#f8fafc"},children:[e.jsx("div",{style:{display:"flex",gap:4,padding:"12px 16px",background:"#1e293b",overflowX:"auto",flexWrap:"nowrap",position:"sticky",top:0,zIndex:1e3,boxShadow:"0 2px 8px rgba(0,0,0,.4)"},children:o.map((l,i)=>e.jsx("button",{onClick:()=>a(i),style:{padding:"8px 18px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:700,fontSize:13,whiteSpace:"nowrap",flexShrink:0,background:g===i?"#3b82f6":"#334155",color:g===i?"#fff":"#94a3b8",boxShadow:g===i?"0 2px 8px rgba(59,130,246,.5)":"none",transition:"all .2s"},children:l.label},i))}),e.jsx("div",{children:o[g].component},g)]})}export{gs as default};
