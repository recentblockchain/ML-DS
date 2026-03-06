import{r as w,j as e}from"./index-CIDXSLTw.js";import{B as He}from"./brain-IGCKrJW-.js";import{C as Le}from"./code-CX5Ttzw_.js";import{B as We}from"./book-open-C9ZgZFYh.js";import{C as Se}from"./circle-check-big-BYHgTtbC.js";import{P as fe}from"./play-CoVLW8zi.js";import{E as Oe}from"./eye-CIfRviWG.js";import{c as Ie}from"./createLucideIcon-CZfQCXqL.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ue=Ie("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ge=Ie("Terminal",[["polyline",{points:"4 17 10 11 4 5",key:"akl6gq"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19",key:"q2wloq"}]]);var he=x=>1/(1+Math.exp(-Math.max(-20,Math.min(20,x)))),U=x=>Number(x).toFixed(2),W=x=>Number(x).toFixed(4),o={bg:"#070c12",panel:"#0d1520",card:"#111d2e",border:"#1c3050",or:"#f97316",am:"#fbbf24",gr:"#22c55e",rd:"#ef4444",bl:"#38bdf8",pu:"#a78bfa",dim:"#64748b",dd:"#334155",tx:"#e2e8f0",mono:"'Courier New', monospace",serif:"Georgia, serif"},qe=[[.1,.9,.1,.1,.1,.1,.9,.1],[.1,.9,.9,.1,.1,.9,.9,.1],[.2,.8,.8,.8,.8,.8,.8,.2],[.3,.9,.1,.9,.9,.1,.9,.3],[.3,.8,.8,.8,.8,.8,.8,.3],[.2,.8,.1,.8,.8,.1,.8,.2],[.1,.9,.9,.1,.1,.9,.9,.1],[.1,.1,.9,.9,.9,.9,.1,.1]],Ve=[[.1,.1,.9,.9,.9,.9,.1,.1],[.1,.9,.8,.8,.8,.8,.9,.1],[.9,.8,.9,.8,.8,.9,.8,.9],[.8,.8,.8,.8,.8,.8,.8,.8],[.8,.9,.1,.8,.8,.1,.9,.8],[.8,.8,.8,.9,.9,.8,.8,.8],[.9,.8,.8,.8,.8,.8,.8,.9],[.1,.9,.1,.1,.1,.1,.9,.1]],J=function({children:t,glow:p,style:r={}}){return e.jsx("div",{style:{background:o.card,borderRadius:12,padding:20,border:`1px solid ${p?p+"55":o.border}`,boxShadow:p?`0 0 28px ${p}18`:"none",marginBottom:16,...r},children:t})},K=function({children:t,color:p=o.or,note:r}){return e.jsxs("div",{style:{marginBottom:12},children:[e.jsx("div",{style:{fontFamily:o.mono,fontSize:10,letterSpacing:3,textTransform:"uppercase",color:p,fontWeight:700},children:t}),r&&e.jsx("div",{style:{fontFamily:o.serif,fontSize:13,color:o.dim,marginTop:3,lineHeight:1.6},children:r})]})},Z=function({children:t,color:p=o.am}){return e.jsx("pre",{style:{background:"#040a10",border:`1px solid ${p}40`,borderLeft:`3px solid ${p}`,borderRadius:8,padding:"12px 16px",fontFamily:o.mono,fontSize:12.5,color:p,margin:"10px 0",lineHeight:2,whiteSpace:"pre-wrap",overflowX:"auto"},children:t})},ve=function({children:t,color:p=o.or}){return e.jsx("span",{style:{background:p+"18",border:`1px solid ${p}55`,borderRadius:4,padding:"1px 7px",fontFamily:o.mono,fontSize:11,color:p},children:t})},ee=function({children:t,onClick:p,color:r=o.or,disabled:a,sm:n}){return e.jsx("button",{onClick:p,disabled:a,style:{padding:n?"5px 14px":"8px 20px",borderRadius:8,border:`1px solid ${a?o.dd:r}`,background:a?"transparent":r+"18",color:a?o.dd:r,fontFamily:o.mono,fontSize:n?11:13,fontWeight:700,cursor:a?"default":"pointer",letterSpacing:1},children:t})},ue=function({q:t,a:p,color:r=o.bl}){const[a,n]=w.useState(!1);return e.jsx("div",{style:{background:r+"0d",border:`1px solid ${r}40`,borderRadius:10,padding:14,margin:"12px 0"},children:e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"flex-start"},children:[e.jsx("span",{style:{fontSize:18},children:"🔍"}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontFamily:o.serif,fontSize:13.5,color:o.tx,marginBottom:8},children:[e.jsx("strong",{style:{color:r},children:"Checkpoint: "}),t]}),e.jsx("button",{onClick:()=>n(c=>!c),style:{background:"none",border:`1px solid ${r}55`,borderRadius:6,padding:"3px 12px",color:r,fontFamily:o.mono,fontSize:11,cursor:"pointer"},children:a?"▼ Hide":"▶ Show Answer"}),a&&e.jsx("div",{style:{marginTop:8,fontFamily:o.serif,fontSize:13,color:o.gr,lineHeight:1.7},children:"✅ "+p})]})]})})},Xe=function({code:t,title:p}){const[r,a]=w.useState(!1),n=["def","import","from","return","for","in","range","print","if","else","while","class","True","False","None","not","and","or","as","with"],c=["np","torch","nn","optim","model","loss","sigmoid","relu","forward","backward","step","zero_grad","self","super"];function g(s){if(s.trimStart().startsWith("#"))return[{t:"cm",v:s}];const h=[];let l=0;for(;l<s.length;){if(s[l]==='"'||s[l]==="'"){let u=l+1;for(;u<s.length&&s[u]!==s[l];)u++;h.push({t:"st",v:s.slice(l,u+1)}),l=u+1;continue}if(/[0-9]/.test(s[l])){let u=l;for(;u<s.length&&/[0-9.e\-]/.test(s[u]);)u++;h.push({t:"nm",v:s.slice(l,u)}),l=u;continue}if(/[a-zA-Z_]/.test(s[l])){let u=l;for(;u<s.length&&/[a-zA-Z_0-9]/.test(s[u]);)u++;const f=s.slice(l,u);h.push({t:n.includes(f)?"kw":c.includes(f)?"bi":"id",v:f}),l=u;continue}h.push({t:"op",v:s[l]}),l++}return h}const m={kw:o.pu,bi:o.or,st:o.gr,nm:o.bl,id:o.tx,op:o.dim,cm:o.dd};return e.jsxs("div",{style:{margin:"12px 0"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:4},children:[e.jsx("span",{style:{fontFamily:o.mono,fontSize:10,color:o.dim,letterSpacing:2},children:"🐍 "+(p||"Python")}),e.jsx("button",{onClick:()=>{a(!0),setTimeout(()=>a(!1),1400)},style:{background:"none",border:`1px solid ${o.dd}`,borderRadius:4,padding:"2px 8px",color:r?o.gr:o.dim,fontFamily:o.mono,fontSize:9,cursor:"pointer"},children:r?"✓ copied":"copy"})]}),e.jsx("div",{style:{background:"#030810",border:`1px solid ${o.border}`,borderRadius:8,padding:"14px 16px",overflow:"auto",fontFamily:o.mono,fontSize:12.5,lineHeight:1.9},children:t.split(`
`).map((s,h)=>e.jsxs("div",{style:{display:"flex"},children:[e.jsx("span",{style:{color:o.dd,fontSize:10,minWidth:28,userSelect:"none",marginRight:8},children:h+1}),e.jsx("span",{children:g(s).map((l,u)=>e.jsx("span",{style:{color:m[l.t]||o.tx},children:l.v},u))})]},h))})]})},Ye=function({data:t,size:p=26,label:r}){return e.jsxs("div",{style:{textAlign:"center"},children:[r&&e.jsx("div",{style:{fontFamily:o.mono,fontSize:9,color:o.dim,letterSpacing:2,marginBottom:5,textTransform:"uppercase"},children:r}),e.jsx("div",{style:{display:"inline-block",border:`1px solid ${o.border}`,borderRadius:4,overflow:"hidden"},children:t.map((a,n)=>e.jsx("div",{style:{display:"flex"},children:a.map((c,g)=>{const m=Math.round(c*255);return e.jsx("div",{style:{width:p,height:p,background:`rgb(${m},${m},${m})`,border:"1px solid #0a1520",display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,color:c>.5?"#000":"#666"},children:p>28?U(c):""},g)})},n))})]})},Je=function({acts:t,lit:p,step:r}){const c=[{x:55,n:4,label:"Input",color:o.bl},{x:175,n:4,label:"Hidden1",color:o.pu},{x:295,n:3,label:"Hidden2",color:o.or},{x:415,n:2,label:"Output",color:o.gr}],g=(m,s)=>{const h=Math.min(48,170/(m+1));return 210/2-(m-1)*h/2+s*h};return e.jsxs("svg",{viewBox:"0 0 480 210",style:{width:"100%",display:"block"},children:[c.slice(0,-1).map((m,s)=>Array.from({length:m.n},(h,l)=>Array.from({length:c[s+1].n},(u,f)=>{const b=p&&r>s;return e.jsx("line",{x1:m.x+16,y1:g(m.n,l),x2:c[s+1].x-16,y2:g(c[s+1].n,f),stroke:b?m.color:o.dd+"60",strokeWidth:b?1.5:.5,strokeOpacity:b?.55:1},`${l}-${f}`)}))),p&&r>=5&&e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M 380 18 L 75 18",stroke:o.rd,strokeWidth:2,strokeDasharray:"5 3"}),e.jsx("polygon",{points:"75,14 65,18 75,22",fill:o.rd}),e.jsx("text",{x:225,y:13,textAnchor:"middle",fill:o.rd,fontSize:9,fontFamily:"monospace",children:"error signal (backprop)"})]}),c.map((m,s)=>Array.from({length:m.n},(h,l)=>{const u=g(m.n,l),f=p&&r>=s,b=t&&t[s]?t[s][l]:null;return e.jsxs("g",{children:[e.jsx("circle",{cx:m.x,cy:u,r:15,fill:f?m.color+"28":o.card,stroke:f?m.color:o.dd,strokeWidth:f?2:1}),e.jsx("text",{x:m.x,y:u+4,textAnchor:"middle",fill:f?m.color:o.dd,fontSize:9,fontFamily:"monospace",fontWeight:"bold",children:b!==null?U(b):"?"})]},`${s}-${l}`)})),c.map((m,s)=>e.jsx("text",{x:m.x,y:206,textAnchor:"middle",fill:p&&r>=s?m.color+"cc":m.color+"44",fontSize:8,fontFamily:"monospace",children:m.label},s))]})},Ke=function(){const[t,p]=w.useState(2),[r,a]=w.useState(.3),[n,c]=w.useState(.1),g=r*t+n;return e.jsxs("div",{children:[e.jsxs(J,{glow:o.or,children:[e.jsx(K,{color:o.or,note:"A single neuron is just a tiny calculator: multiply, add, decide.",children:"📖 What Are Weights and Biases?"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14},children:[{icon:"🎛️",title:"Weight (w)",color:o.am,body:"Controls how strongly each input matters. A high positive weight = 'this clue is very important.' A negative weight = 'this clue pushes against the answer.'"},{icon:"⬆️",title:"Bias (b)",color:o.bl,body:"A built-in baseline nudge added regardless of input. It shifts the output even when all inputs are zero — like a default head-start."}].map(({icon:m,title:s,color:h,body:l})=>e.jsxs("div",{style:{background:"#050b14",borderRadius:10,padding:14,border:`1px solid ${h}30`},children:[e.jsxs("div",{style:{fontFamily:o.mono,fontSize:13,color:h,marginBottom:8,fontWeight:700},children:[m," ",s]}),e.jsx("p",{style:{fontFamily:o.serif,fontSize:13,color:o.dim,lineHeight:1.75,margin:0},children:l})]},s))}),e.jsxs("p",{style:{fontFamily:o.serif,fontSize:14,color:o.tx,lineHeight:1.85,marginBottom:6},children:["The neuron formula for one input is: ",e.jsx(ve,{color:o.am,children:"ŷ = w · x + b"}),'. The hat symbol (ŷ = "y-hat") means ',e.jsx("em",{children:"predicted output"}),"."]}),e.jsx(Z,{color:o.am,children:`ŷ  =  w · x  +  b
    =  (weight × input)  +  bias

• w tells us: "how much does input x affect the output?"
• b tells us: "what is the output when x = 0 (no evidence)?"
• ŷ is our prediction — it may be wrong at first!`})]}),e.jsxs(J,{glow:o.bl,children:[e.jsx(K,{color:o.bl,children:"🧮 Interactive: Adjust x, w, b Live"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:16},children:[["Input x",t,p,-3,3,o.bl],["Weight w",r,a,-2,2,o.am],["Bias b",n,c,-2,2,o.gr]].map(([m,s,h,l,u,f])=>e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:4},children:[e.jsx("span",{style:{fontFamily:o.mono,fontSize:11,color:o.dim},children:m}),e.jsx("span",{style:{fontFamily:o.mono,fontSize:13,color:f,fontWeight:700},children:U(s)})]}),e.jsx("input",{type:"range",min:l,max:u,step:.05,value:s,onChange:b=>h(+b.target.value),style:{width:"100%",accentColor:f}})]},m))}),e.jsx(Z,{color:o.am,children:`ŷ = w · x + b
  = ${U(r)} × ${U(t)} + ${U(n)}
  = ${U(r*t)} + ${U(n)}
  = ${U(g)}`}),e.jsxs("div",{style:{padding:12,background:o.am+"0e",borderRadius:8,border:`1px solid ${o.am}30`},children:[e.jsx("strong",{style:{color:o.am,fontFamily:o.mono,fontSize:11},children:"Try: "}),e.jsx("span",{style:{fontFamily:o.serif,fontSize:13,color:o.tx},children:"Set x to 0. Now ŷ = b exactly. The bias is the output when there is no input signal at all."})]}),e.jsx(ue,{q:"If x increases and w is positive, does ŷ go up or down?",a:"UP — a positive weight means more input produces more output."})]}),e.jsxs(J,{glow:o.pu,children:[e.jsx(K,{color:o.pu,note:"We never hand-pick final weights. We start random and let training find them.",children:"🎲 How We Choose Weights in Practice"}),e.jsx("p",{style:{fontFamily:o.serif,fontSize:14,color:o.tx,lineHeight:1.85,marginBottom:14},children:"Two-step process used in every real deep learning project:"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14},children:[{n:"Step 1 — Initialize",c:o.pu,t:"Pick small random values for all weights. Set biases to 0. This breaks symmetry so different neurons learn different things."},{n:"Step 2 — Train",c:o.or,t:"Repeatedly measure the error on training data, then nudge every weight and bias a tiny bit in the direction that reduces error."}].map(({n:m,c:s,t:h})=>e.jsxs("div",{style:{background:"#050b14",borderRadius:9,padding:14,border:`1px solid ${s}30`},children:[e.jsx("div",{style:{fontFamily:o.mono,fontSize:12,color:s,fontWeight:700,marginBottom:6},children:m}),e.jsx("p",{style:{fontFamily:o.serif,fontSize:13,color:o.dim,margin:0,lineHeight:1.7},children:h})]},m))}),e.jsx(Z,{color:o.pu,children:`Beginner rule:
  w  ~  Uniform(-0.5, 0.5)   ← small and random
  b  =  0                    ← zero bias is safe

Advanced (one-liner):
  Xavier (sigmoid/tanh):  w ~ Normal(0, sqrt(1/fan_in))
  He     (ReLU):          w ~ Normal(0, sqrt(2/fan_in))
  where fan_in = number of inputs to the neuron

WHY NOT all zeros?  → All neurons learn identically (symmetry problem)
WHY NOT very large? → Outputs saturate; gradients vanish from step 1`}),e.jsx(ue,{q:"Why is initializing all weights to 0 a bad idea?",a:"Every neuron computes the same output and receives the same gradient — they all update identically. The network effectively collapses to one neuron. This is the symmetry problem."})]})]})},Qe=function(){const[t,p]=w.useState(0),[r,a]=w.useState("cat"),n=w.useRef(null),c=r==="cat"?qe:Ve,g=c.flat(),m=16,s=[0,1,2,3].map(B=>g.slice(B*m,(B+1)*m).reduce((I,_)=>I+_,0)/m),h=[[.3,-.2,.5,.1],[.4,.3,-.2,.6],[-.1,.5,.3,-.4],[.2,-.3,.4,.5]],l=[.1,-.1,.1,0],u=[[.6,.3,-.5,.4],[-.3,.7,.2,-.1],[.1,-.4,.8,.3]],f=[.05,-.05,.1],b=[[.8,-.3,.5],[-.4,.9,-.2]],$=[.1,-.1],L=h.map((B,I)=>B.reduce((_,M,H)=>_+M*s[H],l[I])),C=L.map(he),E=u.map((B,I)=>B.reduce((_,M,H)=>_+M*C[H],f[I])),k=E.map(he),S=b.map((B,I)=>B.reduce((_,M,H)=>_+M*k[H],$[I])),j=he(S[0]),z=he(S[1]),N=r==="cat"?1:0,T=.5*Math.pow(j-N,2),F=r==="cat"&&j>.5||r==="dog"&&j<=.5,A=[s,C,k,[j,z]],R=[{title:"Input — 8x8 Pixel Grid (64 values)",color:o.bl,body:"The raw image is a grid of pixel brightness values between 0.0 (black) and 1.0 (white). We flatten this into a vector of 64 numbers — the network's input. No math yet, just reading raw data.",math:`Input x = [${s.map(U).join(", ")}]
(4 quadrant averages shown; full input has 64 values)
Each value = average brightness of that image region`},{title:"Hidden Layer 1 — Weighted Sum + Sigmoid",color:o.pu,body:"Each of the 4 hidden neurons computes a weighted sum of all inputs, adds its bias, then passes through sigmoid. Sigmoid squashes any number into (0,1). These activations detect low-level features.",math:`z1 = W1 · x + b1
z1 = [${L.map(U).join(", ")}]
a1 = sigmoid(z1) = [${C.map(U).join(", ")}]

sigmoid(z) = 1 / (1 + e^(-z))  maps any number to (0, 1)`},{title:"Hidden Layer 2 — Deeper Features",color:o.or,body:"Layer 2 combines the Layer 1 activations. Deeper layers detect higher-level patterns — shapes, textures, part combinations that no single pixel could reveal.",math:`z2 = W2 · a1 + b2
z2 = [${E.map(U).join(", ")}]
a2 = sigmoid(z2) = [${k.map(U).join(", ")}]`},{title:"Output Layer — Cat vs Dog Scores",color:o.gr,body:"The output layer produces a score for each class. The highest score wins. We then compare with the true label to compute the error.",math:`z3 = W3 · a2 + b3
cat_score = sigmoid(z3[0]) = ${W(j)}
dog_score = sigmoid(z3[1]) = ${W(z)}

Prediction: ${j>.5?"CAT":"DOG"}
True label: ${r.toUpperCase()}  →  ${F?"CORRECT ✓":"WRONG ✗"}`},{title:"Loss — How Wrong Were We?",color:o.rd,body:"We compare the cat score to the true label (1 = cat, 0 = dog). Mean Squared Error gives a single positive number measuring total wrongness. Smaller loss = better prediction.",math:`True label  y = ${N}   (${r.toUpperCase()})
Prediction  y_hat = ${W(j)}

Loss = 0.5 * (y_hat - y)^2
     = 0.5 * (${W(j)} - ${N})^2
     = 0.5 * (${W(j-N)})^2
     = ${W(T)}

${T<.05?"Loss is small — prediction is good!":"Loss is large — weights need adjusting."}`},{title:"Backpropagation — Error Flows Backward",color:o.rd,body:"The error signal travels backward through all layers using the chain rule. Every weight and bias receives a gradient showing how to adjust to reduce the loss.",math:`delta_output = (y_hat - y) = ${W(j-N)}

Gradient flows backward:
  dL/dW3  ←  dL/dW2  ←  dL/dW1

Each weight updates:
  w_new = w_old - lr * gradient

Smaller loss next time if lr is sensible.`}],P=()=>{p(0),clearInterval(n.current);let B=0;n.current=setInterval(()=>{B++,p(B),B>=R.length-1&&clearInterval(n.current)},1500)};w.useEffect(()=>()=>clearInterval(n.current),[]);const D=R[t];return e.jsxs("div",{children:[e.jsxs(J,{glow:o.or,children:[e.jsx(K,{color:o.or,note:"Watch how a cat or dog image travels from raw pixels to a prediction — then see the error flow back.",children:"🐱 Cat/Dog Forward Pass — Animated"}),e.jsxs("div",{style:{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap",alignItems:"center"},children:[["cat","dog"].map(B=>e.jsx("button",{onClick:()=>{a(B),p(0),clearInterval(n.current)},style:{padding:"7px 20px",borderRadius:8,cursor:"pointer",border:`1px solid ${r===B?o.or:o.border}`,background:r===B?o.or+"20":"transparent",color:r===B?o.or:o.dim,fontFamily:o.mono,fontSize:13,fontWeight:700},children:B==="cat"?"🐱 Cat":"🐶 Dog"},B)),e.jsx("div",{style:{flex:1}}),e.jsx(ee,{onClick:P,color:o.or,children:"▶ Auto Play"}),e.jsx(ee,{onClick:()=>{p(0),clearInterval(n.current)},color:o.dim,sm:!0,children:"↺ Reset"})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"auto 1fr",gap:16,alignItems:"center"},children:[e.jsx(Ye,{data:c,size:22,label:r==="cat"?"🐱 cat input":"🐶 dog input"}),e.jsx(Je,{acts:A,lit:t>0,step:t})]})]}),e.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14},children:R.map((B,I)=>e.jsxs("button",{onClick:()=>p(I),style:{padding:"5px 12px",borderRadius:20,cursor:"pointer",border:`1px solid ${t===I?B.color:o.border}`,background:t===I?B.color+"20":"transparent",color:t===I?B.color:o.dim,fontFamily:o.mono,fontSize:11,fontWeight:t===I?700:400},children:["Step ",I+1]},I))}),e.jsxs(J,{glow:D.color,children:[e.jsx(K,{color:D.color,children:D.title}),e.jsx("p",{style:{fontFamily:o.serif,fontSize:14,color:o.tx,lineHeight:1.85,marginBottom:12},children:D.body}),e.jsx(Z,{color:D.color,children:D.math}),t===3&&e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:10},children:[["Cat Score",j,o.or],["Dog Score",z,o.bl]].map(([B,I,_])=>e.jsxs("div",{style:{background:"#050b14",borderRadius:8,padding:12,border:`1px solid ${_}40`},children:[e.jsx("div",{style:{fontFamily:o.mono,fontSize:10,color:o.dim,marginBottom:6},children:B}),e.jsx("div",{style:{background:o.dd+"40",borderRadius:4,height:8,overflow:"hidden",marginBottom:6},children:e.jsx("div",{style:{width:`${Number(I)*100}%`,height:"100%",background:_,borderRadius:4,transition:"width 0.4s"}})}),e.jsx("div",{style:{fontFamily:o.mono,fontSize:18,color:_,fontWeight:700},children:W(I)})]},B))}),e.jsxs("div",{style:{display:"flex",gap:10,marginTop:14},children:[e.jsx(ee,{onClick:()=>p(B=>Math.max(0,B-1)),disabled:t===0,color:D.color,sm:!0,children:"◀ Prev"}),e.jsx(ee,{onClick:()=>p(B=>Math.min(R.length-1,B+1)),disabled:t===R.length-1,color:D.color,sm:!0,children:"Next ▶"})]})]})]})},Ze=function(){const[t,p]=w.useState(.7),[r,a]=w.useState(2),n=[.01,.05,.1,.5,1],c=n[r],g=1,m=2,s=.3,h=.1,l=t-g,u=.5*l*l,f=l*m,b=l,$=s-c*f,L=h-c*b,C=$*m+L,E=.5*(C-g)*(C-g);return e.jsxs("div",{children:[e.jsxs(J,{glow:o.rd,children:[e.jsx(K,{color:o.rd,note:"Loss measures wrongness. We need it small — and reduce it by adjusting weights.",children:"📉 Loss Function (MSE)"}),e.jsxs("p",{style:{fontFamily:o.serif,fontSize:14,color:o.tx,lineHeight:1.85,marginBottom:12},children:["We use ",e.jsx(ve,{color:o.rd,children:"Mean Squared Error"}),". The ½ factor is a convenience — it cancels out with the exponent during differentiation."]}),e.jsx(Z,{color:o.rd,children:`L  =  (1/2) * (y_hat - y)^2

Properties:
  • Always >= 0   (squared term)
  • L = 0         <=> perfect prediction
  • Large mistake => MUCH larger loss (quadratic penalty)
  
For a batch of n samples:
  MSE  =  (1/n) * sum of (y_hat_i - y_i)^2
  RMSE =  sqrt(MSE)   [same units as output]`}),e.jsxs("div",{style:{marginBottom:10},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:4},children:[e.jsx("span",{style:{fontFamily:o.mono,fontSize:11,color:o.dim},children:"Adjust prediction ŷ (target y = 1.00)"}),e.jsx("span",{style:{fontFamily:o.mono,fontSize:13,color:o.am,fontWeight:700},children:U(t)})]}),e.jsx("input",{type:"range",min:0,max:1.5,step:.01,value:t,onChange:k=>p(+k.target.value),style:{width:"100%",accentColor:o.am}})]}),e.jsx(Z,{color:o.am,children:`Given: y_hat = ${U(t)},  y = 1.00

error      = y_hat - y  = ${U(t)} - 1.00  = ${W(l)}
loss L     = 0.5 * (${W(l)})^2  = ${W(u)}

${Math.abs(l)<.05?"Loss is near zero — prediction is excellent!":l>0?"Over-predicted. Weights should push output DOWN.":"Under-predicted. Weights should push output UP."}`}),e.jsx(ue,{q:"If y_hat gets closer to y, does L go up or down?",a:"DOWN — as prediction approaches truth, the squared difference shrinks toward zero."})]}),e.jsxs(J,{glow:o.gr,children:[e.jsx(K,{color:o.gr,note:"Gradient = direction of steepest increase. We move in the OPPOSITE direction to reduce loss.",children:"∂ Gradients via Chain Rule"}),e.jsx("p",{style:{fontFamily:o.serif,fontSize:14,color:o.tx,lineHeight:1.85,marginBottom:12},children:"We want to find how the loss changes when w or b changes. The gradient tells us the direction — we subtract it to go downhill."}),e.jsx(Z,{color:o.gr,children:`Model:   y_hat = w*x + b
Loss:    L = 0.5*(y_hat - y)^2

Chain rule:
  dL/dy_hat = (y_hat - y)
  dy_hat/dw = x               <- "how much does output change per unit w?"
  dy_hat/db = 1               <- "bias directly shifts output by 1 per unit b"

Therefore:
  dL/dw = dL/dy_hat * dy_hat/dw = (y_hat - y) * x
  dL/db = dL/dy_hat * dy_hat/db = (y_hat - y) * 1

Plugging in: y_hat=${U(t)}, y=1.00, x=2.0:
  dL/dw = (${W(l)}) * 2.0 = ${W(f)}
  dL/db = (${W(l)}) * 1.0 = ${W(b)}`}),e.jsxs("div",{style:{padding:"12px 16px",background:o.gr+"0e",borderRadius:8,border:`1px solid ${o.gr}30`,marginTop:10},children:[e.jsx("strong",{style:{color:o.gr,fontFamily:o.mono,fontSize:11},children:"Gradient sign intuition: "}),e.jsxs("span",{style:{fontFamily:o.serif,fontSize:13,color:o.tx},children:["dL/dw = ",W(f),"."," ",f<0?"Negative gradient → increasing w would DECREASE loss → so we should INCREASE w.":"Positive gradient → increasing w would INCREASE loss → so we should DECREASE w."]})]}),e.jsx(ue,{q:`The gradient dL/dw = ${W(f)}. Should we increase or decrease w to reduce L?`,a:f<0?"INCREASE w — gradient descent subtracts a negative, which adds a positive.":"DECREASE w — gradient descent subtracts a positive, reducing w."})]}),e.jsxs(J,{glow:o.bl,children:[e.jsx(K,{color:o.bl,note:"We subtract a fraction of the gradient each step. Learning rate controls how big the step is.",children:"⬇️ Gradient Descent Update Rule"}),e.jsx(Z,{color:o.bl,children:`Update equations:
  w_new = w_old - lr * (dL/dw)
  b_new = b_old - lr * (dL/db)

lr (learning rate) is a small positive number (e.g. 0.1)

Why subtract?
  Gradient > 0  means w increasing raises loss  → decrease w
  Gradient < 0  means w increasing lowers loss  → increase w
  Subtracting always moves toward lower loss ✓`}),e.jsx("div",{style:{fontFamily:o.mono,fontSize:10,color:o.dim,letterSpacing:2,marginBottom:8},children:"CHOOSE LEARNING RATE"}),e.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14},children:n.map((k,S)=>e.jsxs("button",{onClick:()=>a(S),style:{padding:"6px 16px",borderRadius:8,cursor:"pointer",border:`1px solid ${r===S?o.bl:o.border}`,background:r===S?o.bl+"20":"transparent",color:r===S?o.bl:o.dim,fontFamily:o.mono,fontSize:12},children:["lr = ",k]},S))}),e.jsx(Z,{color:o.bl,children:`Starting: w=${U(s)}, b=${U(h)}, x=2.0, y=1.0
y_hat = ${U(s)}*2.0 + ${U(h)} = ${U(s*m+h)}

Gradients: dL/dw = ${W(f)},  dL/db = ${W(b)}

With lr = ${c}:
  w_new = ${U(s)} - ${c} * (${W(f)}) = ${W($)}
  b_new = ${U(h)} - ${c} * (${W(b)}) = ${W(L)}

New y_hat = ${W($)}*2.0 + ${W(L)} = ${W(C)}

Loss BEFORE: ${W(u)}
Loss AFTER:  ${W(E)}
${E<u?"Loss DECREASED. ":"Loss INCREASED! "}${E<.001?"Near zero — converged!":E>u?"Learning rate too large — try smaller.":""}`}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[["Loss Before",W(u),o.rd],["Loss After",W(E),E<u?o.gr:o.rd]].map(([k,S,j])=>e.jsxs("div",{style:{background:"#050b14",borderRadius:8,padding:12,border:`1px solid ${j}40`,textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:o.mono,fontSize:10,color:o.dim,marginBottom:4},children:k}),e.jsx("div",{style:{fontFamily:o.mono,fontSize:22,color:j,fontWeight:700},children:S})]},k))}),e.jsx(ue,{q:"If lr is very large (e.g. 10.0), what can happen?",a:"The weight update overshoots the minimum. The new loss can be LARGER than before. Training becomes unstable or diverges entirely."})]})]})},et=function(){const t={w1:.3,b1:.1,w2:.5,b2:-.1},[p,r]=w.useState(t),[a,n]=w.useState(.1),[c,g]=w.useState(0),[m,s]=w.useState([]),h=2,l=1;function u(z){const N=z.w1*h+z.b1,T=he(N),F=z.w2*T+z.b2,A=he(F);return{z1:N,a1:T,z2:F,yh:A,loss:.5*(A-l)**2}}function f(){r(z=>{const{a1:N,yh:T}=u(z),F=(T-l)*T*(1-T),A=F*z.w2*N*(1-N),R={w1:z.w1-a*A*h,b1:z.b1-a*A,w2:z.w2-a*F*N,b2:z.b2-a*F};return s(P=>[...P.slice(-79),u(z).loss]),g(P=>P+1),R})}function b(z){r(N=>{let T={...N};const F=[];for(let A=0;A<z;A++){const{a1:R,yh:P}=u(T);F.push(u(T).loss);const D=(P-l)*P*(1-P),B=D*T.w2*R*(1-R);T={w1:T.w1-a*B*h,b1:T.b1-a*B,w2:T.w2-a*D*R,b2:T.b2-a*D}}return s(A=>[...A.slice(-(80-z)),...F]),g(A=>A+z),T})}function $(){r(t),g(0),s([])}const{z1:L,a1:C,z2:E,yh:k,loss:S}=u(p),j=m.length>0?Math.max(...m):1;return e.jsxs("div",{children:[e.jsxs(J,{glow:o.pu,children:[e.jsx(K,{color:o.pu,note:"Backprop = chain rule applied layer by layer from output back to input.",children:"🔙 Backpropagation & Chain Rule"}),e.jsxs("p",{style:{fontFamily:o.serif,fontSize:14,color:o.tx,lineHeight:1.85,marginBottom:14},children:["In a multi-layer network, the output error must travel back to ",e.jsx("em",{children:"every"})," weight. The ",e.jsx(ve,{color:o.pu,children:"chain rule"})," lets us decompose the total gradient into a product of local derivatives."]}),e.jsx(Z,{color:o.pu,children:`2-Layer Network path:
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
  The same error signal flows backward through each weight connection.`}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginTop:12},children:[{n:"1 — Output delta",c:o.rd,f:`delta2 = (y_hat-y)
* y_hat*(1-y_hat)`},{n:"2 — Output weights",c:o.or,f:`dL/dw2 = delta2 * a1
dL/db2 = delta2`},{n:"3 — Hidden delta",c:o.pu,f:`delta1 = delta2 * w2
* a1*(1-a1)`},{n:"4 — Hidden weights",c:o.bl,f:`dL/dw1 = delta1 * x
dL/db1 = delta1`}].map(({n:z,c:N,f:T})=>e.jsxs("div",{style:{background:"#050b14",borderRadius:9,padding:10,border:`1px solid ${N}40`,textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:o.mono,fontSize:9,color:N,fontWeight:700,marginBottom:6},children:z}),e.jsx("pre",{style:{fontFamily:o.mono,fontSize:9,color:N,margin:0,whiteSpace:"pre-wrap",lineHeight:1.7},children:T})]},z))}),e.jsx(ue,{q:"In one sentence, what is backpropagation doing?",a:"Computing gradients for all weights by applying the chain rule backward from the output loss through every layer — so every parameter knows exactly how to adjust to reduce the loss."})]}),e.jsxs(J,{glow:o.gr,children:[e.jsx(K,{color:o.gr,children:"🏋️ 2-Layer Training Simulator"}),e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center",marginBottom:14},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{fontFamily:o.mono,fontSize:10,color:o.dim,marginBottom:3},children:["Learning rate lr = ",U(a)]}),e.jsx("input",{type:"range",min:.01,max:1,step:.01,value:a,onChange:z=>n(+z.target.value),style:{accentColor:o.gr,width:130}})]}),e.jsx(ee,{onClick:f,color:o.gr,children:"▶ 1 Step"}),e.jsx(ee,{onClick:()=>b(10),color:o.am,sm:!0,children:"▶▶ 10"}),e.jsx(ee,{onClick:()=>b(50),color:o.bl,sm:!0,children:"▶▶▶ 50"}),e.jsx(ee,{onClick:$,color:o.dim,sm:!0,children:"↺ Reset"}),e.jsxs("span",{style:{fontFamily:o.mono,fontSize:12,color:o.dim},children:["Epoch: ",e.jsx("strong",{style:{color:o.tx},children:c})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16},children:[e.jsxs("div",{children:[e.jsx(Z,{color:o.gr,children:`x=${h}  y=${l}  lr=${a}

w1=${W(p.w1)}  b1=${W(p.b1)}
w2=${W(p.w2)}  b2=${W(p.b2)}

z1 = w1*x + b1 = ${W(L)}
a1 = sig(z1)   = ${W(C)}
z2 = w2*a1+b2  = ${W(E)}
y_hat = sig(z2)= ${W(k)}

Loss = ${W(S)}${S<.001?"  <- CONVERGED!":""}`}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8},children:[["y_hat",W(k),o.bl],["Loss",W(S),S<.01?o.gr:o.rd]].map(([z,N,T])=>e.jsxs("div",{style:{background:"#050b14",borderRadius:8,padding:10,border:`1px solid ${T}40`,textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:o.mono,fontSize:9,color:o.dim,marginBottom:3},children:z}),e.jsx("div",{style:{fontFamily:o.mono,fontSize:18,color:T,fontWeight:700},children:N})]},z))})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontFamily:o.mono,fontSize:10,color:o.dim,letterSpacing:2,marginBottom:6},children:["LOSS CURVE (",m.length," steps)"]}),e.jsx("div",{style:{background:"#030810",borderRadius:8,border:`1px solid ${o.border}`,padding:"8px 10px",height:130},children:m.length>1?e.jsxs("svg",{viewBox:"0 0 200 90",style:{width:"100%",height:"100%"},children:[[.25,.5,.75].map(z=>e.jsx("line",{x1:0,y1:90*z,x2:200,y2:90*z,stroke:o.dd+"40",strokeDasharray:"3 3"},z)),e.jsx("polyline",{points:m.map((z,N)=>`${N/(m.length-1)*200},${Math.min(85,z/j*85)}`).join(" "),fill:"none",stroke:o.gr,strokeWidth:2}),e.jsx("circle",{cx:200,cy:Math.min(85,m[m.length-1]/j*85),r:3,fill:o.gr}),e.jsx("text",{x:4,y:10,fill:o.dd,fontSize:8,fontFamily:"monospace",children:W(j)}),e.jsx("text",{x:4,y:88,fill:o.dd,fontSize:8,fontFamily:"monospace",children:W(Math.min(...m))})]}):e.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",color:o.dd,fontFamily:o.mono,fontSize:12},children:"Click train to see loss curve"})})]})]})]})]})},tt=function(){const[t,p]=w.useState(0),r=[{title:"Single Neuron from Scratch",code:`import numpy as np

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
print(f"New loss = {loss_new:.4f}")       # 0.01125 < 0.0450 ✓`},{title:"Weight Initialization Strategies",code:`import numpy as np

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
          f"  range=[{W.min():.3f}, {W.max():.3f}]")`},{title:"2-Layer Backprop in NumPy",code:`import numpy as np

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
        print(f"Epoch {epoch:3d} | Loss: {avg:.5f}")`},{title:"PyTorch Cat Classifier",code:`import torch
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
          f"  std={p.data.std():.4f}")`},{title:"Error Monitoring & Diagnostics",code:`import torch
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
        raise RuntimeError("Loss is NaN/Inf — check lr and init")`}],a=r[t];return e.jsxs("div",{children:[e.jsxs(J,{glow:o.gr,children:[e.jsx(K,{color:o.gr,note:"Five production-ready Python snippets covering every topic in this lesson.",children:"🐍 Python Code Library"}),e.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16},children:r.map((n,c)=>e.jsxs("button",{onClick:()=>p(c),style:{padding:"6px 14px",borderRadius:8,cursor:"pointer",border:`1px solid ${t===c?o.gr:o.border}`,background:t===c?o.gr+"18":"transparent",color:t===c?o.gr:o.dim,fontFamily:o.mono,fontSize:11,fontWeight:t===c?700:400},children:["Snippet ",c+1]},c))}),e.jsx(Xe,{code:a.code,title:a.title})]}),e.jsxs(J,{glow:o.or,children:[e.jsx(K,{color:o.or,children:"⚠️ Common Training Errors & Fixes"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12},children:[{t:"Vanishing Gradient",c:o.bl,i:"📉",d:"Gradients shrink to ~0 in early layers. Network stops learning. Symptoms: loss barely moves, early layer weights don't change.",fix:`Use ReLU activations
He initialization
Batch normalization
Residual connections`},{t:"Exploding Gradient",c:o.rd,i:"💥",d:"Gradients grow exponentially. Weights become NaN or Inf. Training crashes immediately.",fix:`Gradient clipping
Smaller learning rate
Proper initialization
Gradient monitoring`},{t:"Learning Rate Too High",c:o.or,i:"⚠️",d:"Loss oscillates or increases instead of decreasing. Updates overshoot the loss minimum each time.",fix:`Reduce lr by 10x
LR scheduler
Adam optimizer
LR warmup`},{t:"Overfitting",c:o.pu,i:"📈",d:"Train loss low, validation loss high. Network memorised training data instead of learning general patterns.",fix:`Dropout layers
L2 regularization
Early stopping
More training data`}].map(({t:n,c,i:g,d:m,fix:s})=>e.jsxs("div",{style:{background:"#050b14",borderRadius:10,padding:14,border:`1px solid ${c}30`},children:[e.jsxs("div",{style:{fontFamily:o.mono,fontSize:12,color:c,fontWeight:700,marginBottom:6},children:[g," ",n]}),e.jsx("p",{style:{fontFamily:o.serif,fontSize:12,color:o.dim,lineHeight:1.7,marginBottom:10},children:m}),e.jsx("div",{style:{background:o.panel,borderRadius:6,padding:"8px 12px",fontFamily:o.mono,fontSize:11,color:c,whiteSpace:"pre-wrap",lineHeight:1.8,borderLeft:`2px solid ${c}70`},children:s})]},n))})]})]})},rt=function(){const[t,p]=w.useState(0),r=3,a=.2,n=.05,c=1,g=.1,m=a*r+n,s=W(.5*(m-c)**2),h=W((m-c)*r),l=W(m-c),u=W(a-g*(m-c)*r),f=W(n-g*(m-c)),[b,$]=w.useState({yhat:"",loss:"",dLdw:"",dLdb:"",wNew:"",bNew:""}),[L,C]=w.useState(!1),E={yhat:W(m),loss:s,dLdw:h,dLdb:l,wNew:u,bNew:f},[k,S]=w.useState(null),[j,z]=w.useState(null),[N,T]=w.useState(!1);function F(){const _=Math.random()>.5?1:-1,M=Math.random()>.5?1:-1,H=_*M;S({es:_,xs:M,gs:H,action:H>0?"DECREASE w":"INCREASE w"}),z(null),T(!1)}const[A,R]=w.useState({q1:"",q2:"",q3:"",q4:"",q5:""}),[P,D]=w.useState(!1),B=[{q:"Q1: What does bias b do when x = 0?",a:"Sets the output directly: y_hat = b. It is the baseline output before seeing any input signal."},{q:"Q2: Why do we use random (not zero) initialization?",a:"Zero init causes symmetry — all neurons learn identically. Random init breaks symmetry, allowing each neuron to specialize in different features."},{q:"Q3: For y_hat = w*x + b, L = 0.5*(y_hat-y)^2, what is dL/dw?",a:"(y_hat - y) * x  — chain rule product of output error and the local derivative of y_hat w.r.t. w."},{q:"Q4: If (y_hat - y) > 0 and x > 0, what happens to w after gradient descent?",a:"w DECREASES — gradient dL/dw = positive, so w := w - lr*(positive) reduces w."},{q:"Q5: In one sentence, what is backpropagation?",a:"A method that computes gradients of the loss for all weights by propagating the error signal backward through each layer using the chain rule."}],I=[{id:"A",emoji:"📓",title:"One Neuron, One Update",time:"10-12 min",fmt:"Individual",color:o.or},{id:"B",emoji:"🃏",title:"Gradient Sign Game",time:"12-15 min",fmt:"Pairs",color:o.bl},{id:"C",emoji:"📋",title:"Worksheet Table",time:"15-20 min",fmt:"Groups",color:o.am},{id:"D",emoji:"📝",title:"Mini Quiz (5 Qs)",time:"10 min",fmt:"Individual",color:o.pu}];return e.jsxs("div",{children:[e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16},children:I.map((_,M)=>e.jsxs("button",{onClick:()=>p(M),style:{padding:"12px 8px",borderRadius:10,cursor:"pointer",border:`2px solid ${t===M?_.color:o.border}`,background:t===M?_.color+"15":o.card,textAlign:"left"},children:[e.jsxs("div",{style:{fontFamily:o.mono,fontSize:12,color:_.color,fontWeight:700,marginBottom:4},children:[_.emoji," Act ",_.id]}),e.jsxs("div",{style:{fontFamily:o.serif,fontSize:11,color:o.dim,lineHeight:1.4},children:[_.fmt," · ",_.time]})]},_.id))}),t===0&&e.jsxs(J,{glow:o.or,children:[e.jsx(K,{color:o.or,note:"Compute the full training step by hand: forward pass, loss, gradients, update.",children:"📓 Activity A — One Neuron, One Update (Individual, 10-12 min)"}),e.jsxs("p",{style:{fontFamily:o.serif,fontSize:13,color:o.dim,lineHeight:1.75,marginBottom:12},children:[e.jsx("strong",{style:{color:o.or},children:"Goal:"})," See numerically that the loss decreases after one gradient descent step. Fill in each box below."]}),e.jsx(Z,{color:o.am,children:`Given: x = ${r},  w = ${a},  b = ${n},  y = ${c},  lr = ${g}`}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:12},children:[["y_hat = w*x + b","yhat"],["L = 0.5*(y_hat-y)^2","loss"],["dL/dw = (y_hat-y)*x","dLdw"],["dL/db = (y_hat-y)*1","dLdb"],["w_new = w - lr*dL/dw","wNew"],["b_new = b - lr*dL/db","bNew"]].map(([_,M])=>{const H=L&&Math.abs(+(b[M]||0)-+E[M])<.01;return L&&!H&&b[M],e.jsxs("div",{style:{background:"#050b14",borderRadius:8,padding:12,border:`1px solid ${L?H?o.gr:o.rd:o.border}`},children:[e.jsx("div",{style:{fontFamily:o.mono,fontSize:10,color:o.dim,marginBottom:6},children:_}),e.jsx("input",{type:"number",step:"0.0001",value:b[M],onChange:de=>{$(xe=>({...xe,[M]:de.target.value})),C(!1)},placeholder:"?",style:{width:"100%",background:"#030810",border:`1px solid ${o.border}`,borderRadius:5,padding:"6px 8px",color:o.am,fontFamily:o.mono,fontSize:13,boxSizing:"border-box"}}),L&&e.jsx("div",{style:{fontFamily:o.mono,fontSize:10,color:H?o.gr:o.rd,marginTop:4},children:H?"correct ✓":`answer: ${E[M]}`})]},M)})}),e.jsxs("div",{style:{display:"flex",gap:10},children:[e.jsx(ee,{onClick:()=>C(!0),color:o.or,children:"🔎 Check Answers"}),e.jsx(ee,{onClick:()=>{$({yhat:"",loss:"",dLdw:"",dLdb:"",wNew:"",bNew:""}),C(!1)},color:o.dim,sm:!0,children:"↺ Clear"})]})]}),t===1&&e.jsxs(J,{glow:o.bl,children:[e.jsx(K,{color:o.bl,note:"Quick intuition-building: predict the direction of weight update from the sign of the gradient.",children:"🃏 Activity B — Gradient Sign Game (Pairs, 12-15 min)"}),e.jsxs("p",{style:{fontFamily:o.serif,fontSize:13,color:o.dim,lineHeight:1.75,marginBottom:14},children:["Click ",e.jsx(ve,{color:o.bl,children:"Deal Card"})," to get a random scenario. Decide whether w should INCREASE or DECREASE, then reveal the correct answer."]}),e.jsx(ee,{onClick:F,color:o.bl,children:"🃏 Deal Card"}),k&&e.jsxs("div",{style:{marginTop:14},children:[e.jsx(Z,{color:o.bl,children:`Sign of error (y_hat - y):  ${k.es>0?"POSITIVE (+)":"NEGATIVE (-)"}
Sign of input x:           ${k.xs>0?"POSITIVE (+)":"NEGATIVE (-)"}`}),e.jsxs("div",{style:{fontFamily:o.serif,fontSize:13,color:o.dim,marginBottom:10,lineHeight:1.7},children:["Remember: ",e.jsx(ve,{color:o.am,children:"dL/dw = (y_hat - y) * x"}),". What is the sign of dL/dw? And to reduce loss, should w increase or decrease?"]}),e.jsx("div",{style:{display:"flex",gap:10,marginBottom:12},children:["INCREASE w","DECREASE w"].map(_=>e.jsx("button",{onClick:()=>z(_),style:{flex:1,padding:10,borderRadius:8,cursor:"pointer",border:`2px solid ${j===_?_===k.action?o.gr:o.rd:o.border}`,background:j===_?_===k.action?o.gr+"20":o.rd+"20":"transparent",color:_.includes("INCREASE")?o.gr:o.rd,fontFamily:o.mono,fontSize:13,fontWeight:700},children:_},_))}),j&&e.jsx(ee,{onClick:()=>T(!0),color:o.bl,sm:!0,children:"Reveal Answer"}),N&&e.jsx(Z,{color:o.bl,children:`dL/dw = (y_hat-y) * x = (${k.es>0?"+":"-"}) * (${k.xs>0?"+":"-"}) = ${k.gs>0?"POSITIVE":"NEGATIVE"}

Gradient descent: w_new = w - lr * gradient
If gradient is ${k.gs>0?"positive":"negative"} -> w ${k.gs>0?"DECREASES":"INCREASES"}

Correct action: ${k.action}
${j===k.action?"You got it! Great intuition.":"Not quite. Remember: subtract gradient means opposite direction."}`})]})]}),t===2&&e.jsxs(J,{glow:o.am,children:[e.jsx(K,{color:o.am,note:"Compute weighted sums by hand, then discuss how tiny updates accumulate into learning.",children:"📋 Activity C — Worksheet Table (Groups, 15-20 min)"}),e.jsx(ot,{})]}),t===3&&e.jsxs(J,{glow:o.pu,children:[e.jsx(K,{color:o.pu,note:"5 conceptual questions covering the full lesson.",children:"📝 Activity D — Mini Quiz (Individual, 10 min)"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10,marginBottom:14},children:B.map((_,M)=>e.jsxs("div",{style:{background:"#050b14",borderRadius:9,padding:14,border:`1px solid ${o.border}`},children:[e.jsx("div",{style:{fontFamily:o.serif,fontSize:13.5,color:o.tx,marginBottom:8,lineHeight:1.7},children:_.q}),e.jsx("textarea",{rows:2,placeholder:"Type your answer...",value:A[`q${M+1}`],onChange:H=>R(de=>({...de,[`q${M+1}`]:H.target.value})),style:{width:"100%",background:"#030810",border:`1px solid ${o.border}`,borderRadius:6,padding:"8px 12px",color:o.tx,fontFamily:o.serif,fontSize:13,resize:"vertical",boxSizing:"border-box"}}),P&&e.jsxs("div",{style:{marginTop:8,padding:"8px 12px",background:o.gr+"0e",borderRadius:6,border:`1px solid ${o.gr}30`},children:[e.jsx("span",{style:{fontFamily:o.mono,fontSize:10,color:o.gr,fontWeight:700},children:"MODEL ANSWER: "}),e.jsx("span",{style:{fontFamily:o.serif,fontSize:12,color:o.gr},children:_.a})]})]},M))}),e.jsx(ee,{onClick:()=>D(!0),color:o.pu,children:"📋 Reveal Answer Key"})]})]})},ot=function(){const t=[{id:"A",x:1,w:.4,b:.1,y:1},{id:"B",x:.5,w:.8,b:-.2,y:1},{id:"C",x:2,w:.1,b:.3,y:0},{id:"D",x:0,w:.6,b:-.5,y:0}],[p,r]=w.useState(!1);return e.jsxs("div",{children:[e.jsxs("p",{style:{fontFamily:o.serif,fontSize:13,color:o.dim,marginBottom:12,lineHeight:1.75},children:["For each row compute: z = w*x + b, then check if z ",">"," 0 (predict 1) or z ","<="," 0 (predict 0). Compare to label y, then find error = z - y and loss = 0.5*(z-y)^2."]}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontFamily:o.mono,fontSize:12},children:[e.jsx("thead",{children:e.jsx("tr",{children:["#","x","w","b","z = w*x+b","pred","y","error","loss"].map(a=>e.jsx("th",{style:{padding:"8px 10px",color:o.dim,borderBottom:`1px solid ${o.border}`,textAlign:"left",fontSize:10,letterSpacing:1},children:a},a))})}),e.jsx("tbody",{children:t.map((a,n)=>{const c=a.w*a.x+a.b,g=c>0?1:0,m=c-a.y,s=.5*m*m;return e.jsxs("tr",{style:{background:n%2===0?"#050b1499":"transparent"},children:[e.jsx("td",{style:{padding:"9px 10px",color:o.dim,fontWeight:700},children:a.id}),e.jsx("td",{style:{padding:"9px 10px",color:o.bl},children:a.x}),e.jsx("td",{style:{padding:"9px 10px",color:o.am},children:a.w}),e.jsx("td",{style:{padding:"9px 10px",color:o.gr},children:a.b}),e.jsx("td",{style:{padding:"9px 10px",color:o.tx},children:p?W(c):"?"}),e.jsx("td",{style:{padding:"9px 10px",color:p?g===a.y?o.gr:o.rd:o.dim},children:p?g:"?"}),e.jsx("td",{style:{padding:"9px 10px",color:o.gr},children:a.y}),e.jsx("td",{style:{padding:"9px 10px",color:p?m>=0?o.rd:o.bl:o.dim},children:p?W(m):"?"}),e.jsx("td",{style:{padding:"9px 10px",color:o.am},children:p?W(s):"?"})]},a.id)})})]})}),e.jsx("div",{style:{display:"flex",gap:10,marginTop:12},children:e.jsx(ee,{onClick:()=>r(a=>!a),color:o.am,children:p?"🙈 Hide":"📋 Show Answers"})}),e.jsxs("div",{style:{marginTop:14,padding:"12px 16px",background:"#050b14",borderRadius:8,border:`1px solid ${o.border}`},children:[e.jsx("div",{style:{fontFamily:o.mono,fontSize:10,color:o.am,letterSpacing:2,marginBottom:8},children:"DISCUSSION QUESTIONS"}),["Row D has x=0. What is z? What role does bias play here?","Which row has the largest loss? What made that prediction worst?","For row C: error is positive, x=2.0. Should w increase or decrease?","After 1000 training rounds, what do you expect the losses to approach?"].map((a,n)=>e.jsxs("div",{style:{fontFamily:o.serif,fontSize:13,color:o.dim,marginBottom:6,lineHeight:1.7},children:[e.jsxs("span",{style:{color:o.am},children:["Q",n+1,": "]}),a]},n))]})]})},$e=[{id:"t1",label:"01 · Weights & Bias",emoji:"📖",color:o.or,Comp:Ke},{id:"t2",label:"02 · Cat Forward Pass",emoji:"🐱",color:o.bl,Comp:Qe},{id:"t3",label:"03 · Loss & Gradients",emoji:"📉",color:o.rd,Comp:Ze},{id:"t4",label:"04 · Backpropagation",emoji:"🔙",color:o.pu,Comp:et},{id:"t5",label:"05 · Python Code",emoji:"🐍",color:o.gr,Comp:tt},{id:"t6",label:"06 · Activities & Quiz",emoji:"🎮",color:o.am,Comp:rt}],it=function(){const[t,p]=w.useState("t1"),r=$e.find(c=>c.id===t),{Comp:a,color:n}=r;return e.jsxs("div",{style:{minHeight:"100vh",background:o.bg,color:o.tx,fontFamily:o.serif},children:[e.jsx("div",{style:{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,opacity:.015,backgroundImage:`linear-gradient(${o.or} 1px, transparent 1px), linear-gradient(90deg, ${o.or} 1px, transparent 1px)`,backgroundSize:"40px 40px"}}),e.jsx("div",{style:{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,background:`radial-gradient(ellipse 60% 40% at 50% 0%, ${n}12, transparent 65%)`,transition:"background 0.5s"}}),e.jsxs("div",{style:{position:"relative",zIndex:1,maxWidth:980,margin:"0 auto",padding:"24px 14px"},children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:26},children:[e.jsx("div",{style:{fontFamily:o.mono,fontSize:9,letterSpacing:8,color:o.dim,marginBottom:7,textTransform:"uppercase"},children:"Deep Learning Fundamentals · Interactive Classroom Guide"}),e.jsxs("h1",{style:{margin:0,fontFamily:o.mono,fontWeight:900,letterSpacing:-1,fontSize:"clamp(20px,4vw,36px)",background:`linear-gradient(90deg, ${o.or}, ${o.am}, ${o.or})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"},children:["Adjusting Weights ","&"," Biases"]}),e.jsx("p",{style:{color:o.dim,fontSize:13,marginTop:7,fontFamily:o.mono},children:"Initialization · Forward Pass · Loss · Gradients · Backprop · Python · Activities"})]}),e.jsx("div",{style:{background:o.panel,borderRadius:14,padding:6,border:`1px solid ${o.border}`,display:"flex",gap:3,flexWrap:"wrap",justifyContent:"center",marginBottom:22},children:$e.map(c=>e.jsxs("button",{onClick:()=>p(c.id),style:{padding:"7px 14px",borderRadius:10,cursor:"pointer",border:`1px solid ${t===c.id?c.color:"transparent"}`,background:t===c.id?c.color+"18":"transparent",color:t===c.id?c.color:o.dim,fontFamily:o.mono,fontSize:11,fontWeight:t===c.id?700:400,transition:"all 0.15s"},children:[c.emoji," ",c.label]},c.id))}),e.jsx("div",{style:{background:o.panel+"bb",borderRadius:18,border:`1px solid ${n}22`,padding:"24px 20px",boxShadow:`0 0 50px ${n}10`},children:e.jsx(a,{},t)}),e.jsx("div",{style:{textAlign:"center",marginTop:20,color:o.dd,fontFamily:o.mono,fontSize:9,letterSpacing:3},children:"DEEP LEARNING TUTOR · ALL MATH IN-BROWSER · NO DEPENDENCIES"})]})]})},d={bg:"#0a0e1a",surface:"#111827",card:"#1a2235",border:"#1e3a5f",accent:"#00d4ff",green:"#00ff9f",orange:"#ff9f00",red:"#ff4f6e",purple:"#b47aff",yellow:"#ffe066",text:"#e2eaf5",muted:"#6b84a8",inputNode:"#00d4ff",hiddenNode:"#b47aff",outputNode:"#00ff9f"},at=x=>1/(1+Math.exp(-x)),nt=x=>Math.max(0,x),Y={inputs:[{label:"x₁",val:1},{label:"x₂",val:.5}],hidden:[{label:"h₁"},{label:"h₂"}],output:[{label:"ŷ"}],w_ih:[[.8,-.5],[.3,.9]],b_h:[.1,-.2],w_ho:[[.7,-.4]],b_o:[.1],target:1},st=function(){const t=Y.inputs.map(c=>c.val),p=Y.hidden.map((c,g)=>Y.w_ih[g].reduce((m,s,h)=>m+s*t[h],0)+Y.b_h[g]),r=p.map(nt),a=Y.output.map((c,g)=>Y.w_ho[g].reduce((m,s,h)=>m+s*r[h],0)+Y.b_o[g]),n=a.map(at);return{x:t,z_h:p,a_h:r,z_o:a,a_o:n}},lt=function(t){const{x:p,a_h:r,a_o:a}=t,n=Y.target,c=.5*Math.pow(a[0]-n,2),g=a[0]-n,m=a[0]*(1-a[0]),s=g*m,h=Y.w_ho[0].map(($,L)=>s*r[L]),l=s,u=Y.w_ho[0].map(($,L)=>s*$*(r[L]>0?1:0)),f=Y.w_ih.map(($,L)=>p.map(C=>u[L]*C));return{loss:c,dL_dao:g,dao_dzo:m,delta_o:s,dL_dwho:h,dL_dbo:l,delta_h:u,dL_dwih:f,dL_dbh:u}},G=st(),q=lt(G),Me=function({activeStep:t,phase:p}){const r=[{x:80,nodes:Y.inputs.map((s,h)=>({y:100+h*120,label:s.label,val:s.val.toFixed(2),type:"input"}))},{x:260,nodes:Y.hidden.map((s,h)=>({y:80+h*120,label:s.label,val:G.a_h[h].toFixed(3),type:"hidden"}))},{x:440,nodes:Y.output.map((s,h)=>({y:140,label:s.label,val:G.a_o[h].toFixed(3),type:"output"}))}],a={input:d.inputNode,hidden:d.hiddenNode,output:d.outputNode},n=[],c=[];r[0].nodes.forEach((s,h)=>{r[1].nodes.forEach((l,u)=>{n.push({x1:r[0].x,y1:s.y,x2:r[1].x,y2:l.y,w:Y.w_ih[u][h]}),c.push({x1:r[1].x,y1:l.y,x2:r[0].x,y2:s.y,g:q.dL_dwih[u][h]})})}),r[1].nodes.forEach((s,h)=>{r[2].nodes.forEach((l,u)=>{n.push({x1:r[1].x,y1:s.y,x2:r[2].x,y2:l.y,w:Y.w_ho[u][h]}),c.push({x1:r[2].x,y1:l.y,x2:r[1].x,y2:s.y,g:q.dL_dwho[h]})})});const g=p==="back",m=g?c:n;return e.jsxs("svg",{viewBox:"0 0 520 280",style:{width:"100%",maxWidth:520,display:"block",margin:"0 auto"},children:[e.jsxs("defs",{children:[e.jsxs("filter",{id:"glow",children:[e.jsx("feGaussianBlur",{stdDeviation:"2.5",result:"coloredBlur"}),e.jsxs("feMerge",{children:[e.jsx("feMergeNode",{in:"coloredBlur"}),e.jsx("feMergeNode",{in:"SourceGraphic"})]})]}),e.jsx("marker",{id:"arrowF",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L6,3 L0,6 Z",fill:d.accent})}),e.jsx("marker",{id:"arrowB",markerWidth:"6",markerHeight:"6",refX:"1",refY:"3",orient:"auto",children:e.jsx("path",{d:"M6,0 L0,3 L6,6 Z",fill:d.orange})})]}),m.map((s,h)=>{const l=g?s.g:s.w,u=g?d.orange:l>0?d.accent:d.red,f=(s.x1+s.x2)/2,b=(s.y1+s.y2)/2;return e.jsxs("g",{children:[e.jsx("line",{x1:s.x1,y1:s.y1,x2:s.x2,y2:s.y2,stroke:u,strokeWidth:Math.abs(l)*2.5+.5,opacity:.55,markerEnd:g?"url(#arrowB)":"url(#arrowF)"}),e.jsx("text",{x:f,y:b-5,fill:u,fontSize:"8",textAnchor:"middle",fontFamily:"monospace",children:g?`∂=${l.toFixed(3)}`:`w=${l}`})]},h)}),r.map((s,h)=>s.nodes.map((l,u)=>e.jsxs("g",{children:[e.jsx("circle",{cx:s.x,cy:l.y,r:28,fill:d.surface,stroke:a[l.type],strokeWidth:2.5,filter:"url(#glow)"}),e.jsx("text",{x:s.x,y:l.y-5,textAnchor:"middle",fill:a[l.type],fontSize:"12",fontFamily:"monospace",fontWeight:"bold",children:l.label}),e.jsx("text",{x:s.x,y:l.y+11,textAnchor:"middle",fill:d.text,fontSize:"9",fontFamily:"monospace",children:l.val})]},`${h}-${u}`))),[{x:80,label:`INPUT
LAYER`},{x:260,label:`HIDDEN
LAYER`},{x:440,label:`OUTPUT
LAYER`}].map((s,h)=>e.jsx("text",{x:s.x,y:255,textAnchor:"middle",fill:d.muted,fontSize:"9",fontFamily:"monospace",letterSpacing:"2",children:s.label},h)),e.jsx("text",{x:260,y:15,textAnchor:"middle",fill:g?d.orange:d.accent,fontSize:"10",fontFamily:"monospace",letterSpacing:"3",fontWeight:"bold",children:g?"◄ BACKPROPAGATION (Gradient Flow)":"► FORWARD PASS (Data Flow)"})]})},te=function({title:t,formula:p,note:r,color:a=d.accent}){return e.jsxs("div",{style:{background:d.card,border:`1px solid ${a}33`,borderLeft:`3px solid ${a}`,borderRadius:8,padding:"12px 16px",margin:"8px 0"},children:[e.jsx("div",{style:{color:a,fontFamily:"monospace",fontSize:11,letterSpacing:2,marginBottom:4},children:t}),e.jsx("div",{style:{background:"#0a0e1a",borderRadius:6,padding:"10px 14px",fontFamily:"monospace",fontSize:13,color:d.text,lineHeight:1.8,overflowX:"auto"},children:p}),r&&e.jsx("div",{style:{color:d.muted,fontSize:11,marginTop:6,lineHeight:1.5},children:r})]})},dt=function(){return e.jsxs("div",{children:[e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:20},children:[{icon:"🧠",title:"What is it?",body:'A neural network is like a digital brain made of connected "neurons" that learn from data — just like you learn from experience!'},{icon:"📊",title:"What does it do?",body:'It takes inputs (like pixels of an image), processes them through layers, and produces an output (like "this is a cat").'},{icon:"🔄",title:"How does it learn?",body:"Through two passes: a forward pass (make a guess) and backpropagation (fix the mistakes by adjusting connections)."}].map((t,p)=>e.jsxs("div",{style:{background:d.card,borderRadius:10,padding:16,border:`1px solid ${d.border}`},children:[e.jsx("div",{style:{fontSize:28,marginBottom:8},children:t.icon}),e.jsx("div",{style:{color:d.accent,fontFamily:"monospace",fontSize:11,letterSpacing:2,marginBottom:6},children:t.title}),e.jsx("div",{style:{color:d.text,fontSize:13,lineHeight:1.6},children:t.body})]},p))}),e.jsxs("div",{style:{background:d.card,borderRadius:10,padding:20,border:`1px solid ${d.border}`,marginBottom:16},children:[e.jsx("div",{style:{color:d.green,fontFamily:"monospace",fontSize:11,letterSpacing:3,marginBottom:12},children:"🍕 REAL-WORLD ANALOGY"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16},children:[e.jsxs("div",{children:[e.jsx("div",{style:{color:d.yellow,fontSize:13,fontWeight:"bold",marginBottom:6},children:"The Pizza Chef 🍕"}),e.jsxs("div",{style:{color:d.text,fontSize:13,lineHeight:1.7},children:["Imagine you're learning to make pizza. The first time, you guess the oven temperature. If the pizza burns, you ",e.jsx("b",{style:{color:d.orange},children:"adjust"})," — lower the heat. Next time, it's better. You keep adjusting until the pizza is perfect. That's EXACTLY what a neural network does!"]})]}),e.jsxs("div",{children:[e.jsx("div",{style:{color:d.accent,fontSize:13,fontWeight:"bold",marginBottom:6},children:"Neural Network 🤖"}),e.jsxs("div",{style:{color:d.text,fontSize:13,lineHeight:1.7},children:[e.jsx("b",{style:{color:d.inputNode},children:"Inputs"}),": ingredients → ",e.jsx("b",{style:{color:d.hiddenNode},children:"Hidden layers"}),": cooking process → ",e.jsx("b",{style:{color:d.outputNode},children:"Output"}),": taste rating. If the output is wrong, ",e.jsx("b",{style:{color:d.orange},children:"backpropagation"}),' sends the error backwards and tweaks the "recipe" (weights).']})]})]})]}),e.jsxs("div",{style:{background:"#0f1929",borderRadius:10,padding:16,border:`1px solid ${d.purple}44`},children:[e.jsx("div",{style:{color:d.purple,fontFamily:"monospace",fontSize:11,letterSpacing:3,marginBottom:10},children:"📐 THE BIG PICTURE: TWO PHASES"}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:["Input Data","➜","Forward Pass","➜","Prediction","➜","Calculate Error","➜","Backpropagation","➜","Update Weights","➜","Repeat"].map((t,p)=>e.jsx("span",{style:{color:t==="➜"?d.muted:t.includes("Forward")?d.accent:t.includes("Back")?d.orange:t.includes("Error")?d.red:d.text,fontFamily:"monospace",fontSize:11,fontWeight:t.includes("Forward")||t.includes("Back")?"bold":"normal",background:t.includes("Forward")||t.includes("Back")?"#1a2235":"transparent",padding:t.includes("Forward")||t.includes("Back")?"3px 8px":0,borderRadius:4},children:t},p))})]})]})},ct=function(){const[t,p]=w.useState(0),r=[{title:"Step 1 — Set Inputs",color:d.inputNode,diagram:"input",content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:d.text,fontSize:13,lineHeight:1.7,marginBottom:10},children:["The forward pass starts with your raw data. Think of inputs as the ",e.jsx("b",{style:{color:d.inputNode},children:"senses"})," of the network — they receive information from the outside world."]}),e.jsx(te,{title:"OUR INPUTS",color:d.inputNode,formula:`x₁ = 1.0   (e.g., pixel brightness)
x₂ = 0.5   (e.g., another feature)`,note:"These are fixed values we feed into the network. No math yet!"})]})},{title:"Step 2 — Weighted Sum at Hidden Neuron h₁",color:d.hiddenNode,diagram:"hidden",content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:d.text,fontSize:13,lineHeight:1.7,marginBottom:10},children:["Each connection between neurons has a ",e.jsx("b",{style:{color:d.orange},children:"weight"})," — a number that shows how important that connection is. We multiply each input by its weight, then add them all up. We also add a ",e.jsx("b",{style:{color:d.purple},children:"bias"})," to shift the result."]}),e.jsx(te,{title:"WEIGHTED SUM (z) for h₁",color:d.hiddenNode,formula:`z_h₁ = (w₁₁ × x₁) + (w₂₁ × x₂) + b₁
      = (0.8 × 1.0) + (-0.5 × 0.5) + 0.1
      = 0.8 + (-0.25) + 0.1
      = ${G.z_h[0].toFixed(4)}`,note:"📌 Weight: strength of connection  |  Bias: shifts output up or down (like adjusting where 'zero' is)"})]})},{title:"Step 3 — Activation Function (ReLU) on h₁",color:d.purple,diagram:"hidden",content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:d.text,fontSize:13,lineHeight:1.7,marginBottom:10},children:["After the weighted sum, we pass z through an ",e.jsx("b",{style:{color:d.purple},children:"activation function"}),'. This decides if the neuron "fires" or not — just like real brain neurons! ReLU (Rectified Linear Unit) is the most common: it passes positive values through and kills negative ones.']}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[e.jsx(te,{title:"ReLU FORMULA",color:d.purple,formula:`ReLU(z) = max(0, z)

a_h₁ = max(0, ${G.z_h[0].toFixed(4)})
      = ${G.a_h[0].toFixed(4)}`}),e.jsx(te,{title:"WHY RELU?",color:d.yellow,formula:`if z ≤ 0 → output = 0  (neuron "off")
if z > 0 → output = z  (neuron "on")`,note:"Without activation, the network is just basic multiplication — boring! Activation adds intelligence."})]})]})},{title:"Step 4 — Same for Hidden Neuron h₂",color:d.hiddenNode,diagram:"hidden",content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:d.text,fontSize:13,lineHeight:1.7,marginBottom:10},children:["We repeat the exact same process for ",e.jsx("b",{style:{color:d.hiddenNode},children:"h₂"})," with its own weights and bias."]}),e.jsx(te,{title:"h₂ WEIGHTED SUM",color:d.hiddenNode,formula:`z_h₂ = (0.3 × 1.0) + (0.9 × 0.5) + (-0.2)
      = 0.3 + 0.45 + (-0.2)
      = ${G.z_h[1].toFixed(4)}`}),e.jsx(te,{title:"h₂ ACTIVATION (ReLU)",color:d.purple,formula:`a_h₂ = max(0, ${G.z_h[1].toFixed(4)}) = ${G.a_h[1].toFixed(4)}`,note:"Both hidden neurons are now computed. They pass their values to the output layer."})]})},{title:"Step 5 — Output Layer (Sigmoid)",color:d.outputNode,diagram:"output",content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:d.text,fontSize:13,lineHeight:1.7,marginBottom:10},children:["The output layer collects values from all hidden neurons and computes the final prediction. For binary classification, we use ",e.jsx("b",{style:{color:d.green},children:"Sigmoid"})," — it squashes any number into a range of 0 to 1 (like a probability!)."]}),e.jsx(te,{title:"OUTPUT WEIGHTED SUM",color:d.outputNode,formula:`z_o = (0.7 × a_h₁) + (-0.4 × a_h₂) + 0.1
    = (0.7 × ${G.a_h[0].toFixed(3)}) + (-0.4 × ${G.a_h[1].toFixed(3)}) + 0.1
    = ${G.z_o[0].toFixed(4)}`}),e.jsx(te,{title:"SIGMOID ACTIVATION",color:d.green,formula:`σ(z) = 1 / (1 + e^(-z))

ŷ = σ(${G.z_o[0].toFixed(4)}) = ${G.a_o[0].toFixed(4)}`,note:`Prediction: ${(G.a_o[0]*100).toFixed(1)}% probability of class 1. Target is 1.0 — we're close but not perfect, so we need backprop!`})]})}];return e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"},children:r.map((a,n)=>e.jsx("button",{onClick:()=>p(n),style:{background:t===n?a.color+"22":d.card,border:`1px solid ${t===n?a.color:d.border}`,color:t===n?a.color:d.muted,borderRadius:6,padding:"6px 12px",fontFamily:"monospace",fontSize:10,cursor:"pointer",letterSpacing:1},children:`S${n+1}`},n))}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16},children:[e.jsx("div",{style:{background:d.card,borderRadius:10,padding:16,border:`1px solid ${d.border}`},children:e.jsx(Me,{activeStep:t,phase:"forward"})}),e.jsxs("div",{children:[e.jsx("div",{style:{color:r[t].color,fontFamily:"monospace",fontSize:12,letterSpacing:2,marginBottom:12,fontWeight:"bold"},children:r[t].title}),r[t].content,e.jsxs("div",{style:{display:"flex",gap:8,marginTop:12},children:[e.jsx("button",{onClick:()=>p(a=>Math.max(0,a-1)),disabled:t===0,style:{flex:1,padding:"8px",background:t===0?d.surface:d.card,border:`1px solid ${d.border}`,color:d.text,borderRadius:6,cursor:t===0?"default":"pointer",fontFamily:"monospace",fontSize:12},children:"← PREV"}),e.jsx("button",{onClick:()=>p(a=>Math.min(r.length-1,a+1)),disabled:t===r.length-1,style:{flex:1,padding:"8px",background:t===r.length-1?d.surface:d.accent+"22",border:`1px solid ${d.accent}`,color:d.accent,borderRadius:6,cursor:t===r.length-1?"default":"pointer",fontFamily:"monospace",fontSize:12},children:"NEXT →"})]})]})]})]})},pt=function(){const[t,p]=w.useState("weight"),r={weight:{title:"⚖️ Weights",color:d.accent,icon:"⚖️",analogy:"Volume knob on a speaker — it controls how much each input affects the neuron.",detail:"Every connection in the network has a weight. A high weight means that input has a BIG influence. A weight near zero means it barely matters. Negative weights actually flip the signal!",formula:`z = w₁×x₁ + w₂×x₂ + ...

Our weights: w₁₁=0.8, w₂₁=-0.5
              w₁₂=0.3, w₂₂=0.9`,visual:[{label:"w = 2.0",note:"Strong positive → big push up",bar:100,col:d.green},{label:"w = 0.1",note:"Weak → barely matters",bar:5,col:d.accent},{label:"w = -1.5",note:"Negative → pushes down",bar:75,col:d.red,neg:!0}]},bias:{title:"🎯 Bias",color:d.purple,icon:"🎯",analogy:"Like the snooze button on an alarm — it shifts WHEN the neuron wakes up.",detail:"Bias is an extra value added to the weighted sum BEFORE activation. It lets the neuron fire even when all inputs are zero, or prevents it from firing when inputs are present. It's like setting a 'threshold' for the neuron.",formula:`z = (w₁×x₁ + w₂×x₂) + bias

Our biases: b_h₁ = +0.1 (nudge up)
             b_h₂ = -0.2 (nudge down)`,visual:[{label:"b = +2.0",note:"Neuron fires more easily",bar:100,col:d.green},{label:"b = 0.0",note:"No shift (no bias)",bar:50,col:d.muted},{label:"b = -2.0",note:"Neuron harder to activate",bar:10,col:d.red}]},activation:{title:"⚡ Activation Functions",color:d.yellow,icon:"⚡",analogy:"Like a door: decides if information passes through or gets blocked.",detail:"Without activation functions, a neural network would just be one big linear equation — it couldn't learn complex patterns. Activation functions add non-linearity, which is math-speak for 'the ability to learn curves, not just straight lines.'",formula:`ReLU(z)   = max(0, z)     ← simple, fast
Sigmoid(z) = 1/(1+e^-z)  ← 0 to 1 range
Tanh(z)    = (e^z-e^-z)/(e^z+e^-z) ← -1 to 1`,visual:[{label:"z = -3 → ReLU → 0",note:"Negative blocked!",bar:0,col:d.red},{label:"z = 0 → ReLU → 0",note:"Zero stays zero",bar:50,col:d.muted},{label:"z = 4 → ReLU → 4",note:"Positive passes through",bar:100,col:d.green}]},loss:{title:"📉 Loss Function",color:d.red,icon:"📉",analogy:"A score for 'how wrong' the prediction is. Like a teacher marking your exam!",detail:"The Loss (or Cost) function measures the distance between what the network predicted and the correct answer. We want to MINIMIZE this. The smaller the loss, the better the network is performing.",formula:`MSE Loss = ½ × (prediction - target)²

= ½ × (${G.a_o[0].toFixed(4)} - 1.0)²
= ½ × ${(G.a_o[0]-1).toFixed(4)}²
= ${q.loss.toFixed(6)}`,visual:[{label:"Loss = 0.0",note:"Perfect! Network is correct",bar:0,col:d.green},{label:"Loss = 0.2",note:"Pretty close, minor error",bar:40,col:d.yellow},{label:"Loss = 1.0",note:"Way off — needs lots of learning",bar:100,col:d.red}]}},a=r[t];return e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",gap:8,marginBottom:16},children:Object.entries(r).map(([n,c])=>e.jsxs("button",{onClick:()=>p(n),style:{flex:1,padding:"10px 8px",background:t===n?c.color+"22":d.card,border:`1px solid ${t===n?c.color:d.border}`,color:t===n?c.color:d.muted,borderRadius:8,cursor:"pointer",fontFamily:"monospace",fontSize:10,letterSpacing:1},children:[c.icon,e.jsx("br",{}),n.toUpperCase()]},n))}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16},children:[e.jsxs("div",{children:[e.jsx("div",{style:{color:a.color,fontFamily:"monospace",fontSize:14,fontWeight:"bold",marginBottom:10},children:a.title}),e.jsxs("div",{style:{background:`${a.color}11`,border:`1px solid ${a.color}44`,borderRadius:8,padding:12,marginBottom:12},children:[e.jsx("div",{style:{color:a.color,fontSize:11,fontFamily:"monospace",letterSpacing:2,marginBottom:6},children:"ANALOGY"}),e.jsx("div",{style:{color:d.text,fontSize:13,lineHeight:1.6,fontStyle:"italic"},children:a.analogy})]}),e.jsx("div",{style:{color:d.text,fontSize:13,lineHeight:1.7,marginBottom:12},children:a.detail}),e.jsx("div",{style:{background:"#0a0e1a",borderRadius:8,padding:12,fontFamily:"monospace",fontSize:12,color:d.text,lineHeight:1.8,whiteSpace:"pre"},children:a.formula})]}),e.jsxs("div",{children:[e.jsx("div",{style:{color:d.muted,fontFamily:"monospace",fontSize:10,letterSpacing:2,marginBottom:12},children:"VISUAL EXAMPLES"}),a.visual.map((n,c)=>e.jsxs("div",{style:{background:d.card,borderRadius:8,padding:12,marginBottom:8,border:`1px solid ${d.border}`},children:[e.jsx("div",{style:{color:d.text,fontFamily:"monospace",fontSize:11,marginBottom:6},children:n.label}),e.jsx("div",{style:{background:"#0a0e1a",borderRadius:4,height:8,overflow:"hidden",marginBottom:6},children:e.jsx("div",{style:{height:"100%",width:`${Math.abs(n.bar)}%`,background:n.col,borderRadius:4,transition:"width 0.5s"}})}),e.jsx("div",{style:{color:d.muted,fontSize:11},children:n.note})]},c))]})]})]})},ht=function(){const[t,p]=w.useState(0),r=[{title:"Step 1 — Calculate the Loss",color:d.red,content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:d.text,fontSize:13,lineHeight:1.7,marginBottom:10},children:["After the forward pass, we compare the network's prediction to the correct answer. This difference is the ",e.jsx("b",{style:{color:d.red},children:"Loss"}),". Our goal is to make the loss as small as possible."]}),e.jsx(te,{title:"LOSS CALCULATION",color:d.red,formula:`Target (correct answer) = 1.0
Prediction (ŷ)         = ${G.a_o[0].toFixed(4)}

Loss = ½ × (ŷ - target)²
     = ½ × (${G.a_o[0].toFixed(4)} - 1.0)²
     = ${q.loss.toFixed(6)}`,note:"The loss tells us: 'How badly did we mess up?' — smaller loss = better network!"})]})},{title:"Step 2 — Gradient at Output (∂L/∂ŷ)",color:d.orange,content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:d.text,fontSize:13,lineHeight:1.7,marginBottom:10},children:['Now we ask: "If we increase the output prediction a tiny bit, how much does the loss change?" This is a ',e.jsx("b",{style:{color:d.orange},children:"gradient"})," — the slope of the loss surface. We use calculus (chain rule) to calculate it."]}),e.jsx(te,{title:"OUTPUT GRADIENT",color:d.orange,formula:`∂L/∂ŷ = ŷ - target
      = ${G.a_o[0].toFixed(4)} - 1.0
      = ${q.dL_dao.toFixed(4)}

Sigmoid derivative: σ'(z) = σ(z) × (1 - σ(z))
= ${G.a_o[0].toFixed(4)} × ${(1-G.a_o[0]).toFixed(4)} = ${q.dao_dzo.toFixed(4)}

δ_output = ${q.dL_dao.toFixed(4)} × ${q.dao_dzo.toFixed(4)} = ${q.delta_o.toFixed(4)}`,note:"Negative gradient means we need to INCREASE the output. Gradient tells us which direction to nudge the weights."})]})},{title:"Step 3 — Gradients for Output Weights",color:d.orange,content:e.jsxs("div",{children:[e.jsx("p",{style:{color:d.text,fontSize:13,lineHeight:1.7,marginBottom:10},children:"We calculate how much each output weight contributed to the error. The gradient for each weight is the output delta multiplied by the hidden neuron value that fed into it."}),e.jsx(te,{title:"OUTPUT WEIGHT GRADIENTS",color:d.orange,formula:`∂L/∂w_h₁o = δ_output × a_h₁
           = ${q.delta_o.toFixed(4)} × ${G.a_h[0].toFixed(4)}
           = ${q.dL_dwho[0].toFixed(6)}

∂L/∂w_h₂o = δ_output × a_h₂
           = ${q.delta_o.toFixed(4)} × ${G.a_h[1].toFixed(4)}
           = ${q.dL_dwho[1].toFixed(6)}`,note:"These gradients tell us: 'which direction should we move each weight to reduce the error?'"})]})},{title:"Step 4 — Backpropagate to Hidden Layer",color:d.purple,content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:d.text,fontSize:13,lineHeight:1.7,marginBottom:10},children:["The error signal flows backwards from the output through the hidden layer. We use the ",e.jsx("b",{style:{color:d.purple},children:"chain rule"})," to calculate how much each hidden neuron contributed to the error."]}),e.jsx(te,{title:"HIDDEN LAYER DELTAS",color:d.purple,formula:`δ_h₁ = δ_output × w_h₁o × ReLU'(z_h₁)
     = ${q.delta_o.toFixed(4)} × 0.7 × 1   [since a_h₁ > 0]
     = ${q.delta_h[0].toFixed(6)}

δ_h₂ = δ_output × w_h₂o × ReLU'(z_h₂)
     = ${q.delta_o.toFixed(4)} × (-0.4) × 1 [since a_h₂ > 0]
     = ${q.delta_h[1].toFixed(6)}`,note:"ReLU derivative: 1 if input > 0, else 0. This is why it's called 'gradient killing' — dead neurons stop learning!"})]})},{title:"Step 5 — Update All Weights (Gradient Descent)",color:d.green,content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:d.text,fontSize:13,lineHeight:1.7,marginBottom:10},children:["Finally! We update every weight using ",e.jsx("b",{style:{color:d.green},children:"Gradient Descent"}),": subtract the gradient × learning rate. The learning rate (α) controls how big our steps are — too big = overshoot, too small = slow learning."]}),e.jsx(te,{title:"WEIGHT UPDATE RULE",color:d.green,formula:`w_new = w_old - α × gradient

Learning rate α = 0.1 (example)

w_h₁o_new = 0.7 - 0.1 × ${q.dL_dwho[0].toFixed(4)}
           = ${(.7-.1*q.dL_dwho[0]).toFixed(6)}

w_h₂o_new = -0.4 - 0.1 × ${q.dL_dwho[1].toFixed(4)}
           = ${(-.4-.1*q.dL_dwho[1]).toFixed(6)}`,note:"🎉 Repeat this process thousands of times with training data and the network gets smarter and smarter!"})]})}];return e.jsxs("div",{children:[e.jsxs("div",{style:{background:d.card,borderRadius:10,padding:14,border:`1px solid ${d.orange}44`,marginBottom:16},children:[e.jsx("div",{style:{color:d.orange,fontFamily:"monospace",fontSize:11,letterSpacing:3,marginBottom:8},children:"💡 WHAT IS BACKPROPAGATION?"}),e.jsxs("div",{style:{color:d.text,fontSize:13,lineHeight:1.7},children:['Backpropagation (short for "backward propagation of errors") is the algorithm that makes neural networks learn. It works backwards from the output error, figuring out how much each weight was responsible for the mistake, then adjusts all weights to reduce future errors. It uses ',e.jsx("b",{style:{color:d.purple},children:"calculus (chain rule)"})," to calculate these gradients efficiently."]})]}),e.jsx("div",{style:{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"},children:r.map((a,n)=>e.jsxs("button",{onClick:()=>p(n),style:{flex:1,minWidth:50,padding:"8px 6px",background:t===n?a.color+"22":d.card,border:`1px solid ${t===n?a.color:d.border}`,color:t===n?a.color:d.muted,borderRadius:6,cursor:"pointer",fontFamily:"monospace",fontSize:10,letterSpacing:1},children:["S",n+1]},n))}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16},children:[e.jsxs("div",{style:{background:d.card,borderRadius:10,padding:16,border:`1px solid ${d.border}`},children:[e.jsx(Me,{activeStep:t,phase:"back"}),e.jsx("div",{style:{marginTop:12,display:"flex",flexDirection:"column",gap:6},children:r.map((a,n)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,opacity:t>=n?1:.3,transition:"opacity 0.3s"},children:[e.jsx("div",{style:{width:12,height:12,borderRadius:"50%",background:t>=n?a.color:d.muted,flexShrink:0}}),e.jsx("div",{style:{color:t===n?a.color:d.muted,fontSize:11,fontFamily:"monospace"},children:a.title})]},n))})]}),e.jsxs("div",{children:[e.jsx("div",{style:{color:r[t].color,fontFamily:"monospace",fontSize:12,fontWeight:"bold",letterSpacing:2,marginBottom:12},children:r[t].title}),r[t].content,e.jsxs("div",{style:{display:"flex",gap:8,marginTop:12},children:[e.jsx("button",{onClick:()=>p(a=>Math.max(0,a-1)),disabled:t===0,style:{flex:1,padding:"8px",background:t===0?d.surface:d.card,border:`1px solid ${d.border}`,color:d.text,borderRadius:6,cursor:t===0?"default":"pointer",fontFamily:"monospace",fontSize:12},children:"← PREV"}),e.jsx("button",{onClick:()=>p(a=>Math.min(r.length-1,a+1)),disabled:t===r.length-1,style:{flex:1,padding:"8px",background:t===r.length-1?d.surface:d.orange+"22",border:`1px solid ${d.orange}`,color:d.orange,borderRadius:6,cursor:t===r.length-1?"default":"pointer",fontFamily:"monospace",fontSize:12},children:"NEXT →"})]})]})]})]})},mt=function(){const[t,p]=w.useState({}),r=[{q:"What does the Forward Pass do?",a:"It takes the input data, multiplies by weights, adds biases, applies activations, and produces a prediction."},{q:"What is a Weight in a neural network?",a:"A weight is a number on each connection that controls how strongly one neuron influences another. Higher weight = more influence."},{q:"Why do we need Activation Functions?",a:"Without activation functions, the network can only learn linear (straight-line) relationships. Activations like ReLU add non-linearity so networks can learn complex patterns."},{q:"What does Backpropagation do?",a:"It measures the prediction error (loss), then propagates this error backward through the network, calculating gradients to know how much each weight caused the error."},{q:"What is Gradient Descent?",a:"It's the method of updating weights using: w_new = w_old - α × gradient. We move weights in the direction that reduces the loss, step by step."}];return e.jsxs("div",{children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20},children:[e.jsxs("div",{style:{background:d.card,borderRadius:10,padding:16,border:`1px solid ${d.accent}44`},children:[e.jsx("div",{style:{color:d.accent,fontFamily:"monospace",fontSize:11,letterSpacing:3,marginBottom:12},children:"► FORWARD PASS SUMMARY"}),[["1. Input","Raw data enters the network (x₁, x₂, ...)",d.inputNode],["2. Weighted Sum","z = Σ(wᵢ × xᵢ) + bias",d.accent],["3. Activation","a = ReLU(z) — adds non-linearity",d.purple],["4. Repeat","Same process for each layer",d.hiddenNode],["5. Output","Final prediction via Sigmoid (0 to 1)",d.outputNode]].map(([a,n,c],g)=>e.jsxs("div",{style:{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start"},children:[e.jsx("div",{style:{width:4,height:4,borderRadius:"50%",background:c,marginTop:6,flexShrink:0}}),e.jsxs("div",{children:[e.jsx("span",{style:{color:c,fontFamily:"monospace",fontSize:11},children:a}),e.jsxs("span",{style:{color:d.muted,fontSize:11},children:[" — ",n]})]})]},g))]}),e.jsxs("div",{style:{background:d.card,borderRadius:10,padding:16,border:`1px solid ${d.orange}44`},children:[e.jsx("div",{style:{color:d.orange,fontFamily:"monospace",fontSize:11,letterSpacing:3,marginBottom:12},children:"◄ BACKPROP SUMMARY"}),[["1. Loss","Measure error: L = ½(ŷ - y)²",d.red],["2. Output Gradient","∂L/∂ŷ = ŷ - target",d.orange],["3. Chain Rule","Propagate gradients backward",d.yellow],["4. Weight Gradients","∂L/∂w = δ × input",d.purple],["5. Update Weights","w = w - α × ∂L/∂w",d.green]].map(([a,n,c],g)=>e.jsxs("div",{style:{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start"},children:[e.jsx("div",{style:{width:4,height:4,borderRadius:"50%",background:c,marginTop:6,flexShrink:0}}),e.jsxs("div",{children:[e.jsx("span",{style:{color:c,fontFamily:"monospace",fontSize:11},children:a}),e.jsxs("span",{style:{color:d.muted,fontSize:11},children:[" — ",n]})]})]},g))]})]}),e.jsx("div",{style:{color:d.green,fontFamily:"monospace",fontSize:11,letterSpacing:3,marginBottom:12},children:"🧠 QUICK QUIZ — CLICK TO REVEAL ANSWERS"}),r.map((a,n)=>e.jsxs("div",{onClick:()=>p(c=>({...c,[n]:!c[n]})),style:{background:d.card,borderRadius:8,padding:14,marginBottom:8,border:`1px solid ${t[n]?d.green+"44":d.border}`,cursor:"pointer",transition:"border-color 0.3s"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{style:{color:d.text,fontSize:13,fontWeight:"bold"},children:["Q",n+1,": ",a.q]}),e.jsx("div",{style:{color:t[n]?d.green:d.muted,fontSize:18},children:t[n]?"▲":"▼"})]}),t[n]&&e.jsxs("div",{style:{marginTop:10,paddingTop:10,borderTop:`1px solid ${d.border}`,color:d.green,fontSize:13,lineHeight:1.6},children:["✅ ",a.a]})]},n)),e.jsxs("div",{style:{background:"#0f1929",borderRadius:10,padding:16,border:`1px solid ${d.yellow}44`,marginTop:16},children:[e.jsx("div",{style:{color:d.yellow,fontFamily:"monospace",fontSize:11,letterSpacing:3,marginBottom:8},children:"🚀 WHERE DOES THIS LEAD?"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10},children:[{t:"CNNs",d:"Convolutional Neural Nets for image recognition",e:"🖼️"},{t:"LSTMs",d:"Recurrent networks for text and time series",e:"📝"},{t:"Transformers",d:"The architecture behind ChatGPT and Claude!",e:"🤖"}].map((a,n)=>e.jsxs("div",{style:{background:d.card,borderRadius:8,padding:12,border:`1px solid ${d.border}`},children:[e.jsx("div",{style:{fontSize:24,marginBottom:6},children:a.e}),e.jsx("div",{style:{color:d.yellow,fontFamily:"monospace",fontSize:11,marginBottom:4},children:a.t}),e.jsx("div",{style:{color:d.muted,fontSize:11,lineHeight:1.5},children:a.d})]},n))})]})]})},ut=function(){const[t,p]=w.useState(0),r=[{label:"🧠 Overview",component:e.jsx(dt,{})},{label:"► Forward Pass",component:e.jsx(ct,{})},{label:"⚙️ Key Concepts",component:e.jsx(pt,{})},{label:"◄ Backprop",component:e.jsx(ht,{})},{label:"📋 Summary & Quiz",component:e.jsx(mt,{})}];return e.jsxs("div",{style:{background:d.bg,minHeight:"100vh",fontFamily:"'Courier New', monospace",padding:0},children:[e.jsx("div",{style:{background:`linear-gradient(180deg, #0d1830 0%, ${d.bg} 100%)`,borderBottom:`1px solid ${d.border}`,padding:"20px 32px 0"},children:e.jsxs("div",{style:{maxWidth:900,margin:"0 auto"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:16,marginBottom:4},children:[e.jsx("div",{style:{fontFamily:"'Georgia', serif",fontSize:26,fontWeight:"bold",background:`linear-gradient(90deg, ${d.accent}, ${d.purple})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},children:"Neural Network Learning"}),e.jsx("div",{style:{color:d.muted,fontSize:11,letterSpacing:3},children:"FORWARD PASS & BACKPROPAGATION"})]}),e.jsx("div",{style:{color:d.muted,fontSize:12,marginBottom:16},children:"An interactive guide for high school students · Real math · Step-by-step examples"}),e.jsx("div",{style:{display:"flex",gap:2},children:r.map((a,n)=>e.jsx("button",{onClick:()=>p(n),style:{padding:"10px 16px",border:"none",cursor:"pointer",background:t===n?d.card:"transparent",borderTop:`2px solid ${t===n?d.accent:"transparent"}`,color:t===n?d.accent:d.muted,fontFamily:"monospace",fontSize:11,letterSpacing:1,borderRadius:"6px 6px 0 0",transition:"all 0.2s"},children:a.label},n))})]})}),e.jsxs("div",{style:{maxWidth:900,margin:"0 auto",padding:"24px 32px"},children:[e.jsx("div",{style:{display:"flex",gap:4,marginBottom:20},children:r.map((a,n)=>e.jsx("div",{style:{flex:1,height:3,borderRadius:2,background:n<=t?d.accent:d.border,transition:"background 0.3s"}},n))}),r[t].component,e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:24,paddingTop:20,borderTop:`1px solid ${d.border}`},children:[e.jsx("button",{onClick:()=>p(a=>Math.max(0,a-1)),disabled:t===0,style:{padding:"10px 24px",background:t===0?"transparent":d.card,border:`1px solid ${t===0?"transparent":d.border}`,color:t===0?"transparent":d.text,borderRadius:8,cursor:t===0?"default":"pointer",fontFamily:"monospace",fontSize:12},children:"← Previous"}),e.jsxs("div",{style:{color:d.muted,fontSize:11,alignSelf:"center"},children:[t+1," / ",r.length," — ",r[t].label]}),e.jsx("button",{onClick:()=>p(a=>Math.min(r.length-1,a+1)),disabled:t===r.length-1,style:{padding:"10px 24px",background:t===r.length-1?"transparent":d.accent+"22",border:`1px solid ${t===r.length-1?"transparent":d.accent}`,color:t===r.length-1?"transparent":d.accent,borderRadius:8,cursor:t===r.length-1?"default":"pointer",fontFamily:"monospace",fontSize:12},children:"Next →"})]})]})]})},gt=`
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
`,ye=x=>1/(1+Math.exp(-x)),le=x=>ye(x)*(1-ye(x)),y=x=>Math.round(x*1e3)/1e3,ze={x1:.5,x2:.8,w11:.4,w12:-.3,w21:.7,w22:.5,b1:.1,b2:-.2,v1:.6,v2:-.4,bo:.3,target:1,lr:.5},ke=function(t){const{x1:p,x2:r,w11:a,w12:n,w21:c,w22:g,b1:m,b2:s,v1:h,v2:l,bo:u}=t,f=a*p+c*r+m,b=n*p+g*r+s,$=ye(f),L=ye(b),C=h*$+l*L+u,E=ye(C);return{z1:f,z2:b,h1:$,h2:L,zo:C,yhat:E}},Fe=function(t,p){const{x1:r,x2:a,w11:n,w12:c,w21:g,w22:m,v1:s,v2:h,target:l,lr:u}=t,{z1:f,z2:b,h1:$,h2:L,zo:C,yhat:E}=p,k=E-l,S=k*le(C),j=S*$,z=S*L,N=S,T=S*s,F=S*h,A=T*le(f),R=F*le(b),P=A*r,D=A*a,B=R*r,I=R*a,_=A,M=R,H=.5*Math.pow(E-l,2);return{dL_dyhat:k,dL_dzo:S,dL_dv1:j,dL_dv2:z,dL_dbo:N,dL_dh1:T,dL_dh2:F,dL_dz1:A,dL_dz2:R,dL_dw11:P,dL_dw21:D,dL_dw12:B,dL_dw22:I,dL_db1:_,dL_db2:M,loss:H}},xt=function(t,p){const{lr:r}=t,a=p;return{...t,w11:t.w11-r*a.dL_dw11,w12:t.w12-r*a.dL_dw12,w21:t.w21-r*a.dL_dw21,w22:t.w22-r*a.dL_dw22,b1:t.b1-r*a.dL_db1,b2:t.b2-r*a.dL_db2,v1:t.v1-r*a.dL_dv1,v2:t.v2-r*a.dL_dv2,bo:t.bo-r*a.dL_dbo}},be={input:[{id:"x1",cx:80,cy:130,label:"x₁"},{id:"x2",cx:80,cy:230,label:"x₂"}],hidden:[{id:"h1",cx:280,cy:110,label:"H₁"},{id:"h2",cx:280,cy:250,label:"H₂"}],output:[{id:"o1",cx:480,cy:180,label:"ŷ"}]},ft=[{from:"x1",to:"h1",w:"w₁₁",fwd:!0},{from:"x1",to:"h2",w:"w₁₂",fwd:!0},{from:"x2",to:"h1",w:"w₂₁",fwd:!0},{from:"x2",to:"h2",w:"w₂₂",fwd:!0},{from:"h1",to:"o1",w:"v₁",fwd:!0},{from:"h2",to:"o1",w:"v₂",fwd:!0}],Re=function(t){for(const p of Object.values(be)){const r=p.find(a=>a.id===t);if(r)return r}},Pe=function({mode:t="idle",activeEdges:p=[],activeNodes:r=[],fwd:a={},net:n={},onNodeClick:c}){const g=[...be.input,...be.hidden,...be.output];return e.jsxs("svg",{viewBox:"0 0 580 360",width:"100%",style:{maxWidth:580},children:[e.jsxs("defs",{children:[e.jsx("pattern",{id:"grid",width:"30",height:"30",patternUnits:"userSpaceOnUse",children:e.jsx("path",{d:"M30 0L0 0 0 30",fill:"none",stroke:"rgba(42,74,106,.4)",strokeWidth:".5"})}),e.jsx("marker",{id:"arr-e",markerWidth:"8",markerHeight:"8",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L8,3 L0,6 Z",fill:"#10d9a0",opacity:".8"})}),e.jsx("marker",{id:"arr-r",markerWidth:"8",markerHeight:"8",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L8,3 L0,6 Z",fill:"#fb7185",opacity:".8"})}),e.jsx("marker",{id:"arr-g",markerWidth:"8",markerHeight:"8",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L8,3 L0,6 Z",fill:"#4a7a95",opacity:".6"})})]}),e.jsx("rect",{width:"580",height:"360",fill:"url(#grid)",rx:"10"}),[{x:80,l:"INPUT"},{x:280,l:"HIDDEN"},{x:480,l:"OUTPUT"}].map(({x:m,l:s})=>e.jsx("text",{x:m,y:26,textAnchor:"middle",fill:"#4a7a95",fontFamily:"JetBrains Mono",fontSize:"10",letterSpacing:"2",children:s},s)),[{x:80,l:"(2 neurons)"},{x:280,l:"(2 neurons)"},{x:480,l:"(1 neuron)"}].map(({x:m,l:s})=>e.jsx("text",{x:m,y:42,textAnchor:"middle",fill:"#2a4a6a",fontFamily:"JetBrains Mono",fontSize:"9",children:s},m)),e.jsx("text",{x:280,y:320,textAnchor:"middle",fill:"#4a7a95",fontFamily:"JetBrains Mono",fontSize:"9",children:"+ bias b₁, b₂"}),e.jsx("text",{x:480,y:320,textAnchor:"middle",fill:"#4a7a95",fontFamily:"JetBrains Mono",fontSize:"9",children:"+ bias bₒ"}),ft.map((m,s)=>{const h=Re(m.from),l=Re(m.to),u=p.includes(m.w)||p.includes(`${m.from}-${m.to}`),f=t==="backward"&&u,b=t==="backward"&&u?"#fb7185":t==="forward"&&u?"#10d9a0":"#2a4a6a",$=f?"url(#arr-r)":u?"url(#arr-e)":"url(#arr-g)",L=l.cx-h.cx,C=l.cy-h.cy,E=Math.sqrt(L*L+C*C),k=22,S=h.cx+L/E*k,j=h.cy+C/E*k,z=l.cx-L/E*(k+6),N=l.cy-C/E*(k+6),T=(S+z)/2,F=(j+N)/2;return e.jsxs("g",{children:[e.jsx("line",{x1:S,y1:j,x2:z,y2:N,stroke:b,strokeWidth:u?2.5:1,opacity:u?1:.5,markerEnd:$,className:u&&(f||t==="forward")?"edge-line":""}),e.jsx("rect",{x:T-14,y:F-9,width:28,height:17,rx:4,fill:u?b:"#1a2a3a",opacity:u?.9:.7}),e.jsx("text",{x:T,y:F+5,textAnchor:"middle",fill:u?"#0a1a0a":"#7ba3be",fontFamily:"JetBrains Mono",fontSize:"10",fontWeight:u?"700":"400",children:m.w})]},s)}),g.map(m=>{const s=r.includes(m.id),h=be.input.some(b=>b.id===m.id),u=m.id==="o1"?"#f59e0b":h?"#38bdf8":"#10d9a0",f=h?m.id==="x1"?n.x1:n.x2:m.id==="h1"?a.h1:m.id==="h2"?a.h2:a.yhat;return e.jsxs("g",{style:{cursor:"pointer"},onClick:()=>c&&c(m.id),children:[e.jsx("circle",{cx:m.cx,cy:m.cy,r:26,fill:s?`${u}22`:"#1e3048",stroke:s?u:"#2a4a6a",strokeWidth:s?2.5:1.5,style:s?{filter:`drop-shadow(0 0 8px ${u})`}:{}}),e.jsx("text",{x:m.cx,y:m.cy-4,textAnchor:"middle",fill:s?u:"#7ba3be",fontFamily:"Playfair Display",fontSize:"13",fontWeight:"700",children:m.label}),f!==void 0&&e.jsx("text",{x:m.cx,y:m.cy+11,textAnchor:"middle",fill:s?u:"#4a7a95",fontFamily:"JetBrains Mono",fontSize:"9",children:y(f)})]},m.id)}),t!=="idle"&&e.jsx("rect",{x:10,y:328,width:t==="forward"?120:130,height:22,rx:5,fill:t==="forward"?"#10d9a022":"#fb718522"}),t!=="idle"&&e.jsxs("text",{x:20,y:343,fill:t==="forward"?"#10d9a0":"#fb7185",fontFamily:"JetBrains Mono",fontSize:"10",children:["▶ ",t==="forward"?"FORWARD PASS":"BACKPROPAGATION"]})]})},bt=function(){return e.jsxs("div",{className:"fade-up",children:[e.jsxs("div",{className:"sh",children:[e.jsx("div",{className:"sh-badge",children:"📖 SECTION 1"}),e.jsx("h2",{children:"What Are Forward Pass & Backpropagation?"}),e.jsx("p",{children:"A neural network learns to make predictions through two complementary processes. Together they form the engine of all deep learning — from the AI that recognizes your face to the one that writes poetry."})]}),e.jsxs("div",{className:"two-col",children:[e.jsxs("div",{className:"card e",children:[e.jsx("div",{className:"card-title",children:"🔜 Forward Pass"}),e.jsxs("div",{className:"card-sub",children:['Also called "forward propagation" — the ',e.jsx("em",{children:"prediction"})," step"]}),e.jsxs("p",{style:{color:"var(--muted)",lineHeight:1.8,fontSize:14},children:["Data flows ",e.jsx("strong",{style:{color:"var(--emerald)"},children:"left to right"})," through the network. Each layer receives inputs, multiplies them by weights, adds biases, and applies an activation function. The final layer produces the network's guess (",e.jsx("strong",{style:{color:"var(--emerald)"},children:"ŷ"}),' — pronounced "y-hat").']}),e.jsxs("div",{className:"callout callout-e",style:{marginTop:14},children:[e.jsx("strong",{children:"🎓 Real-life analogy:"})," Imagine you're taking a test. Forward pass = solving each question step by step and writing your answer."]}),e.jsx("div",{style:{marginTop:14},children:e.jsx("span",{className:"tag tg-e",children:"Input → Hidden → Output"})})]}),e.jsxs("div",{className:"card r",children:[e.jsx("div",{className:"card-title",children:"🔙 Backpropagation"}),e.jsxs("div",{className:"card-sub",children:['Also "backward propagation of errors" — the ',e.jsx("em",{children:"learning"})," step"]}),e.jsxs("p",{style:{color:"var(--muted)",lineHeight:1.8,fontSize:14},children:["After the forward pass, we check ",e.jsx("strong",{style:{color:"var(--rose)"},children:"how wrong"})," the answer was (the loss). Then we flow ",e.jsx("strong",{style:{color:"var(--rose)"},children:"right to left"}),", calculating how much each weight contributed to the error, and adjusting it slightly to do better next time."]}),e.jsxs("div",{className:"callout callout-r",style:{marginTop:14},children:[e.jsx("strong",{children:"🎓 Real-life analogy:"})," After marking the test, you go back through each question, figure out ",e.jsx("em",{children:"exactly where"})," you went wrong, and study those specific parts harder."]}),e.jsx("div",{style:{marginTop:14},children:e.jsx("span",{className:"tag tg-r",children:"Output → Hidden → Input"})})]})]}),e.jsxs("div",{className:"card s",children:[e.jsx("div",{className:"card-title",children:"🧠 The Big Picture — How a Network Learns"}),e.jsx("div",{className:"card-sub",children:"Forward pass and backpropagation work together in a training loop, repeated thousands of times"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12,marginTop:8},children:[{step:"①",color:"var(--sky)",label:"Forward Pass",desc:"Feed data through the network to get a prediction (ŷ)."},{step:"②",color:"var(--amber)",label:"Compute Loss",desc:"Measure the error: how far is ŷ from the correct answer y? (e.g. Loss = ½(ŷ − y)²)"},{step:"③",color:"var(--rose)",label:"Backpropagation",desc:"Calculate gradients — how much did each weight cause the error? (chain rule of calculus)"},{step:"④",color:"var(--emerald)",label:"Update Weights",desc:"Nudge every weight a tiny bit in the direction that reduces the loss. (gradient descent)"},{step:"↺",color:"var(--violet)",label:"Repeat",desc:"Do this for thousands of training examples, hundreds of epochs. The loss shrinks. The network learns!"}].map(t=>e.jsxs("div",{style:{display:"flex",gap:14,alignItems:"flex-start"},children:[e.jsx("div",{style:{width:34,height:34,borderRadius:"50%",background:`${t.color}20`,border:`1.5px solid ${t.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"JetBrains Mono",fontSize:14,fontWeight:700,color:t.color,flexShrink:0},children:t.step}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,color:"var(--text)",fontSize:14,marginBottom:3},children:t.label}),e.jsx("div",{style:{color:"var(--muted)",fontSize:13,lineHeight:1.6},children:t.desc})]})]},t.step))})]}),e.jsx("div",{className:"igrid",children:[{ico:"🎯",title:"The Goal",body:"Minimize the Loss function — a score measuring how wrong predictions are. Smaller loss = better model."},{ico:"⛓️",title:"Chain Rule",body:"Backprop uses the calculus chain rule to compute how changing each weight affects the final loss."},{ico:"⚖️",title:"Weights & Biases",body:"These are the only things that change during training. Inputs are fixed data; architecture is fixed; only W and b are updated."},{ico:"📉",title:"Gradient Descent",body:"We always move weights downhill — in the direction that makes the loss smaller (negative gradient direction)."}].map(t=>e.jsxs("div",{className:"ibox",children:[e.jsx("div",{className:"ibox-ico",children:t.ico}),e.jsx("div",{className:"ibox-title",children:t.title}),e.jsx("div",{className:"ibox-body",children:t.body})]},t.ico))})]})},yt=function(){return e.jsxs("div",{className:"fade-up",children:[e.jsxs("div",{className:"sh",children:[e.jsx("div",{className:"sh-badge",children:"❓ SECTION 2"}),e.jsx("h2",{children:"Why Do We Need These Algorithms?"}),e.jsx("p",{children:"Without forward pass and backpropagation, a neural network would be just a random tangle of numbers — incapable of learning anything. Here's why both are essential."})]}),e.jsxs("div",{className:"card a",children:[e.jsx("div",{className:"card-title",children:"⚡ The Problem: Neural Networks Start Dumb"}),e.jsx("div",{className:"card-sub",children:"When you first create a neural network, all weights are random. The predictions will be terrible — that's expected and totally okay."}),e.jsxs("div",{className:"two-col",style:{marginTop:16},children:[e.jsxs("div",{children:[e.jsx("p",{style:{color:"var(--muted)",fontSize:14,lineHeight:1.8,marginBottom:14},children:"Imagine you want the network to recognize whether an email is spam. On day one:"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[{c:"var(--rose)",t:"Random weights → nonsense predictions"},{c:"var(--rose)",t:"ŷ = 0.12 when the answer should be 1.0"},{c:"var(--rose)",t:"No way to know which weights are causing the error"}].map((t,p)=>e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[e.jsx("div",{style:{width:6,height:6,borderRadius:"50%",background:t.c,flexShrink:0}}),e.jsx("span",{style:{color:"var(--muted)",fontSize:13},children:t.t})]},p))})]}),e.jsxs("div",{children:[e.jsx("p",{style:{color:"var(--muted)",fontSize:14,lineHeight:1.8,marginBottom:14},children:"After 10,000 training steps using forward + backprop:"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[{c:"var(--emerald)",t:"Weights tuned to detect spam patterns"},{c:"var(--emerald)",t:"ŷ = 0.97 for spam → correct!"},{c:"var(--emerald)",t:"Network learned from its own mistakes"}].map((t,p)=>e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[e.jsx("div",{style:{width:6,height:6,borderRadius:"50%",background:t.c,flexShrink:0}}),e.jsx("span",{style:{color:"var(--muted)",fontSize:13},children:t.t})]},p))})]})]})]}),e.jsxs("div",{className:"card e",children:[e.jsx("div",{className:"card-title",children:"🔜 Why Forward Pass?"}),e.jsx("div",{className:"card-sub",children:`You can't evaluate a prediction you never made. Forward pass is how the network "thinks."`}),e.jsx("div",{className:"igrid",children:[{ico:"📊",title:"Structured Computation",body:"Turns raw numbers (pixel values, features) into meaningful predictions by layering transformations."},{ico:"🔗",title:"Composable",body:"Each layer builds on the previous one. Simple operations (multiply, add, activate) stack into complex intelligence."},{ico:"🧪",title:"Both Train & Inference",body:"Used during training (to compute loss) AND when the model is deployed for real predictions."},{ico:"⚡",title:"Parallel & Fast",body:"Matrix multiplication is GPU-accelerated. Millions of forward passes can run in seconds on modern hardware."}].map(t=>e.jsxs("div",{className:"ibox",children:[e.jsx("div",{className:"ibox-ico",children:t.ico}),e.jsx("div",{className:"ibox-title",children:t.title}),e.jsx("div",{className:"ibox-body",children:t.body})]},t.ico))})]}),e.jsxs("div",{className:"card r",children:[e.jsx("div",{className:"card-title",children:"🔙 Why Backpropagation?"}),e.jsx("div",{className:"card-sub",children:"Before backprop was invented in 1986, neural networks couldn't be trained efficiently. Backprop made deep learning possible."}),e.jsxs("div",{className:"callout callout-a",style:{marginTop:8,marginBottom:16},children:[e.jsx("strong",{children:"Historical context:"}),' Geoffrey Hinton, Yann LeCun, and Yoshua Bengio won the 2018 Turing Award (the "Nobel Prize of Computer Science") largely because of their work on backpropagation. It unlocked all of modern AI!']}),e.jsx("div",{className:"igrid",children:[{ico:"📏",title:"Efficient Credit Assignment",body:"A network might have millions of weights. Backprop pinpoints exactly how much each one is responsible for the error."},{ico:"⛓️",title:"Chain Rule Magic",body:"By applying the chain rule layer by layer, we reuse computations and avoid exponential blowup."},{ico:"🏔️",title:"Gradient Descent",body:"The computed gradients show which direction to move weights to slide down the loss landscape toward a minimum."},{ico:"🌐",title:"Scales to Any Depth",body:"Works for 2 layers or 200 layers. The same algorithm powers LeNet (1989) and GPT-4 (2023)."}].map(t=>e.jsxs("div",{className:"ibox",children:[e.jsx("div",{className:"ibox-ico",children:t.ico}),e.jsx("div",{className:"ibox-title",children:t.title}),e.jsx("div",{className:"ibox-body",children:t.body})]},t.ico))})]}),e.jsxs("div",{className:"card s",children:[e.jsx("div",{className:"card-title",children:"🌍 Real-World Applications"}),e.jsx("div",{className:"igrid",children:[{ico:"🎤",title:"Speech Recognition",body:"Siri/Google Assistant: backprop trained billions of weights to map sound waves to words."},{ico:"🖼️",title:"Image Generation",body:"DALL-E, Midjourney: forward+backward pass through diffusion models creates photorealistic images."},{ico:"💬",title:"ChatGPT / LLMs",body:"GPT models trained with backprop on trillions of tokens to predict the next word accurately."},{ico:"🚗",title:"Self-Driving Cars",body:"Tesla Autopilot uses CNNs trained with backprop to detect lanes, pedestrians, and obstacles."},{ico:"🏥",title:"Medical Diagnosis",body:"AlphaFold (protein structure), cancer detection in scans — all trained using these exact algorithms."},{ico:"♟️",title:"Game AI",body:"AlphaGo beat the world champion using policy networks trained with backpropagation."}].map(t=>e.jsxs("div",{className:"ibox",children:[e.jsx("div",{className:"ibox-ico",children:t.ico}),e.jsx("div",{className:"ibox-title",children:t.title}),e.jsx("div",{className:"ibox-body",children:t.body})]},t.ico))})]})]})},vt=function(){const[t,p]=w.useState(0),[r]=w.useState(ze),a=ke(r),n=[{title:"The Network Setup",active_nodes:["x1","x2"],active_edges:[],content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14},children:["Our example network has ",e.jsx("strong",{style:{color:"var(--sky)"},children:"2 input neurons"}),", ",e.jsx("strong",{style:{color:"var(--emerald)"},children:"2 hidden neurons"}),", and ",e.jsx("strong",{style:{color:"var(--amber)"},children:"1 output neuron"}),`. We'll predict whether something is "positive" (ŷ close to 1) or "negative" (ŷ close to 0).`]}),e.jsxs("table",{className:"vtable",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Variable"}),e.jsx("th",{children:"Value"}),e.jsx("th",{children:"Meaning"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"hi",children:"x₁"}),e.jsx("td",{children:r.x1}),e.jsx("td",{children:"First input feature"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"hi",children:"x₂"}),e.jsx("td",{children:r.x2}),e.jsx("td",{children:"Second input feature"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"hs",children:"Target y"}),e.jsx("td",{children:r.target}),e.jsx("td",{children:"Correct answer we want"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"ha",children:"Learning rate α"}),e.jsx("td",{children:r.lr}),e.jsx("td",{children:"Step size for weight updates"})]})]})]}),e.jsxs("div",{className:"callout callout-s",children:[e.jsx("strong",{children:"👉 Click the nodes"})," in the diagram to inspect their values. The input layer just passes data forward — no computation happens here."]})]})},{title:"Weights & Biases",active_nodes:[],active_edges:["w₁₁","w₂₁","w₁₂","w₂₂"],content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14},children:["Each connection between neurons has a ",e.jsx("strong",{style:{color:"var(--emerald)"},children:"weight"}),". Each neuron in the hidden and output layers has a ",e.jsx("strong",{style:{color:"var(--amber)"},children:"bias"}),". These are the ",e.jsx("em",{children:"learnable parameters"})," — the only things that change during training."]}),e.jsxs("div",{className:"two-col",children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:11,color:"var(--muted)",marginBottom:8,letterSpacing:1},children:"HIDDEN LAYER WEIGHTS"}),e.jsxs("table",{className:"vtable",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Weight"}),e.jsx("th",{children:"Value"}),e.jsx("th",{children:"Connects"})]})}),e.jsx("tbody",{children:[["w₁₁",r.w11,"x₁ → H₁"],["w₂₁",r.w21,"x₂ → H₁"],["w₁₂",r.w12,"x₁ → H₂"],["w₂₂",r.w22,"x₂ → H₂"]].map(([s,h,l])=>e.jsxs("tr",{children:[e.jsx("td",{className:"hi",children:s}),e.jsx("td",{children:h}),e.jsx("td",{style:{color:"var(--muted)"},children:l})]},s))})]})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:11,color:"var(--muted)",marginBottom:8,letterSpacing:1},children:"BIASES & OUTPUT WEIGHTS"}),e.jsxs("table",{className:"vtable",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Param"}),e.jsx("th",{children:"Value"}),e.jsx("th",{children:"Role"})]})}),e.jsx("tbody",{children:[["b₁",r.b1,"H₁ bias"],["b₂",r.b2,"H₂ bias"],["v₁",r.v1,"H₁ → ŷ"],["v₂",r.v2,"H₂ → ŷ"],["bₒ",r.bo,"Output bias"]].map(([s,h,l])=>e.jsxs("tr",{children:[e.jsx("td",{className:"ha",children:s}),e.jsx("td",{children:h}),e.jsx("td",{style:{color:"var(--muted)"},children:l})]},s))})]})]})]}),e.jsxs("div",{className:"callout callout-e",children:[e.jsx("strong",{children:"Key insight:"})," A ",e.jsx("strong",{children:"weight"}),' says "how much does this input matter?" A ',e.jsx("strong",{children:"bias"})," shifts the activation threshold — it lets the neuron fire even when all inputs are zero."]})]})},{title:"Hidden Layer Pre-activation (z)",active_nodes:["h1","h2"],active_edges:["w₁₁","w₂₁","w₁₂","w₂₂"],content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14},children:["First we compute the ",e.jsx("strong",{style:{color:"var(--emerald)"},children:"pre-activation"}),' (also called "logit" or "net input") for each hidden neuron. This is a ',e.jsx("strong",{children:"weighted sum"})," of all inputs plus the bias."]}),e.jsxs("div",{className:"formula",children:[e.jsx("span",{className:"fc",children:"# For hidden neuron H₁:"}),`
`,"z₁ = ",e.jsx("span",{className:"fa",children:"w₁₁"})," × x₁ + ",e.jsx("span",{className:"fa",children:"w₂₁"})," × x₂ + b₁",`
`,"z₁ = ",r.w11," × ",r.x1," + ",r.w21," × ",r.x2," + ",r.b1,`
`,"z₁ = ",y(r.w11*r.x1)," + ",y(r.w21*r.x2)," + ",r.b1," = ",e.jsx("span",{className:"hi",children:y(a.z1)}),`

`,e.jsx("span",{className:"fc",children:"# For hidden neuron H₂:"}),`
`,"z₂ = ",e.jsx("span",{className:"fa",children:"w₁₂"})," × x₁ + ",e.jsx("span",{className:"fa",children:"w₂₂"})," × x₂ + b₂",`
`,"z₂ = ",r.w12," × ",r.x1," + ",r.w22," × ",r.x2," + ",r.b2,`
`,"z₂ = ",e.jsx("span",{className:"hi",children:y(a.z2)})]}),e.jsxs("div",{className:"callout callout-a",children:[e.jsx("strong",{children:"Why weighted sum?"})," It's like a ",e.jsx("em",{children:"voting system"}),'. Each input "votes" with a strength equal to its weight. A positive weight amplifies the signal; a negative weight suppresses it. The bias is like a base vote that always counts.']})]})},{title:"Activation Function (sigmoid_bt)",active_nodes:["h1","h2"],active_edges:[],content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14},children:["The pre-activation z can be any number (positive, negative, huge). We squash it through an ",e.jsx("strong",{style:{color:"var(--violet)"},children:"activation function"})," to make it useful. We use ",e.jsx("strong",{style:{color:"var(--violet)"},children:"Sigmoid"}),": it outputs between 0 and 1."]}),e.jsxs("div",{className:"formula",children:[e.jsx("span",{className:"fc",children:"# Sigmoid function:"}),`
`,"σ(z) = ",e.jsx("span",{className:"fv",children:"1 / (1 + e^(−z))"}),`

`,e.jsx("span",{className:"fc",children:"# Apply to hidden neurons:"}),`
`,"h₁ = σ(z₁) = σ(",y(a.z1),") = ",e.jsx("span",{className:"hi",children:y(a.h1)}),`
`,"h₂ = σ(z₂) = σ(",y(a.z2),") = ",e.jsx("span",{className:"hi",children:y(a.h2)})]}),e.jsx("div",{style:{display:"flex",gap:16,flexWrap:"wrap",marginTop:8},children:[{z:"−5",out:"≈0.007",desc:"Very negative → near 0"},{z:"0",out:"0.5",desc:"Zero → exactly 0.5"},{z:"2",out:"≈0.88",desc:"Positive → near 1"},{z:"z₁="+y(a.z1),out:y(a.h1),desc:"Our H₁",hi:!0}].map(s=>e.jsxs("div",{style:{textAlign:"center",padding:"10px 14px",borderRadius:10,background:s.hi?"rgba(16,217,160,.1)":"var(--bg3)",border:`1px solid ${s.hi?"var(--emerald)":"var(--border)"}`},children:[e.jsxs("div",{style:{fontFamily:"JetBrains Mono",fontSize:12,color:"var(--muted)"},children:["z = ",s.z]}),e.jsxs("div",{style:{fontFamily:"JetBrains Mono",fontSize:18,fontWeight:700,color:s.hi?"var(--emerald)":"var(--amber)",margin:"4px 0"},children:["→ ",s.out]}),e.jsx("div",{style:{fontSize:11,color:"var(--muted2)"},children:s.desc})]},s.z))}),e.jsxs("div",{className:"callout callout-v",style:{marginTop:14},children:[e.jsx("strong",{children:"Why activation functions?"})," Without them, stacking layers is just one big linear equation — useless. Sigmoid, ReLU, Tanh — these introduce non-linearity that lets networks learn ANY pattern."]})]})},{title:"Output Layer Computation",active_nodes:["o1"],active_edges:["v₁","v₂"],content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14},children:["The hidden layer outputs (h₁, h₂) become the inputs to the output layer. We do the same weighted sum + bias + activation. The result ",e.jsx("strong",{style:{color:"var(--amber)"},children:"ŷ"})," is the network's final prediction."]}),e.jsxs("div",{className:"formula",children:[e.jsx("span",{className:"fc",children:"# Output pre-activation:"}),`
`,"zₒ = ",e.jsx("span",{className:"fa",children:"v₁"})," × h₁ + ",e.jsx("span",{className:"fa",children:"v₂"})," × h₂ + bₒ",`
`,"zₒ = ",r.v1," × ",y(a.h1)," + ",r.v2," × ",y(a.h2)," + ",r.bo,`
`,"zₒ = ",y(r.v1*a.h1)," + ",y(r.v2*a.h2)," + ",r.bo," = ",e.jsx("span",{className:"hi",children:y(a.zo)}),`

`,e.jsx("span",{className:"fc",children:"# Final prediction (sigmoid_bt again):"}),`
`,"ŷ = σ(zₒ) = σ(",y(a.zo),") = ",e.jsx("span",{className:"fa",children:y(a.yhat)}),`

`,e.jsx("span",{className:"fc",children:"# Loss (Mean Squared Error / 2):"}),`
`,"L = ½(ŷ − y)² = ½(",y(a.yhat)," − ",r.target,")² = ",e.jsx("span",{className:"fr",children:y(.5*Math.pow(a.yhat-r.target,2))})]}),e.jsxs("div",{className:"callout callout-a",children:[e.jsx("strong",{children:"Forward pass complete! 🎉"})," We have our prediction ŷ = ",e.jsx("strong",{children:y(a.yhat)}),". The target is ",r.target,". Loss = ",y(.5*Math.pow(a.yhat-r.target,2)),". Not great — but that's what backpropagation will fix!"]})]})}],[c,g]=w.useState(null),m={x1:{name:"Input x₁",val:r.x1,desc:"Raw input feature. No computation — just passes the value forward."},x2:{name:"Input x₂",val:r.x2,desc:"Raw input feature. No computation — just passes the value forward."},h1:{name:"Hidden H₁",val:y(a.h1),desc:`Pre-activation z₁=${y(a.z1)}, then σ(z₁) = ${y(a.h1)}. This neuron learned to detect pattern A.`},h2:{name:"Hidden H₂",val:y(a.h2),desc:`Pre-activation z₂=${y(a.z2)}, then σ(z₂) = ${y(a.h2)}. This neuron learned to detect pattern B.`},o1:{name:"Output ŷ",val:y(a.yhat),desc:`Final prediction. zₒ=${y(a.zo)}, ŷ=σ(zₒ)=${y(a.yhat)}. Target was ${r.target}.`}};return e.jsxs("div",{className:"fade-up",children:[e.jsxs("div",{className:"sh",children:[e.jsx("div",{className:"sh-badge",children:"🔜 SECTION 3"}),e.jsx("h2",{children:"Forward Pass — Step by Step"}),e.jsx("p",{children:"Walk through each stage of the forward pass on a real 2→2→1 neural network. Click nodes to inspect values."})]}),e.jsx("div",{className:"step-nav",children:n.map((s,h)=>e.jsxs("button",{className:`step-btn ${t===h?"active":""}`,onClick:()=>{p(h),g(null)},children:[e.jsxs("span",{className:"sn",children:["0",h+1]}),s.title.split(" ").slice(0,2).join(" ")]},h))}),e.jsx("div",{className:"prog-wrap",children:e.jsx("div",{className:"prog",style:{width:`${(t+1)/n.length*100}%`}})}),e.jsx("div",{className:"net-wrap",style:{marginBottom:20},children:e.jsx(Pe,{mode:"forward",activeEdges:n[t].active_edges,activeNodes:n[t].active_nodes,fwd:a,net:r,onNodeClick:s=>{g(s)}})}),c&&m[c]&&e.jsxs("div",{className:"nd fade-up",children:[e.jsxs("h3",{children:["🔍 ",m[c].name," — value: ",m[c].val]}),e.jsx("p",{children:m[c].desc})]}),e.jsxs("div",{className:"card e",children:[e.jsx("div",{className:"card-title",children:n[t].title}),n[t].content,e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:20,gap:10},children:[e.jsx("button",{className:"btn btn-out",onClick:()=>p(Math.max(0,t-1)),disabled:t===0,children:"← Previous"}),e.jsx("button",{className:"btn btn-e",onClick:()=>p(Math.min(n.length-1,t+1)),disabled:t===n.length-1,children:"Next Step →"})]})]})]})},wt=function(){const[t,p]=w.useState(0),[r]=w.useState(ze),a=ke(r),n=Fe(r,a),c=[{title:"Compute the Loss",active_nodes:["o1"],active_edges:[],content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14},children:["Before going backward, we need to know ",e.jsx("strong",{style:{color:"var(--rose)"},children:"how wrong"})," we were. The ",e.jsx("strong",{children:"loss function"})," quantifies this. We use ",e.jsx("strong",{children:"Mean Squared Error (÷2)"})," for simplicity:"]}),e.jsxs("div",{className:"formula",children:[e.jsx("span",{className:"fc",children:"# Loss function (MSE/2 for clean derivatives):"}),`
`,"L = ½(ŷ − y)²",`
`,"L = ½(",y(a.yhat)," − ",r.target,")²",`
`,"L = ½(",y(a.yhat-r.target),")²",`
`,"L = ",e.jsx("span",{className:"fr",children:y(n.loss)}),`

`,e.jsx("span",{className:"fc",children:"# Derivative of loss with respect to ŷ:"}),`
`,"∂L/∂ŷ = ŷ − y = ",y(a.yhat)," − ",r.target," = ",e.jsx("span",{className:"fr",children:y(n.dL_dyhat)})]}),e.jsxs("div",{className:"callout callout-r",children:[e.jsxs("strong",{children:["Loss = ",y(n.loss)]}),". The gradient ∂L/∂ŷ = ",e.jsx("strong",{children:y(n.dL_dyhat)}),' tells us: "the output is ',y(n.dL_dyhat),` too high." We'll use this to push all weights in the right direction.`]})]})},{title:"Backprop Through Output Layer",active_nodes:["o1"],active_edges:["v₁","v₂"],content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14},children:["We use the ",e.jsx("strong",{style:{color:"var(--rose)"},children:"chain rule"})," to find how much the output weights (v₁, v₂) caused the loss. The chain rule says: to differentiate a composition of functions, multiply the derivatives step by step."]}),e.jsxs("div",{className:"formula",children:[e.jsx("span",{className:"fc",children:"# Sigmoid derivative: σ'(z) = σ(z)(1 − σ(z))"}),`
`,"σ'(zₒ) = ",y(a.yhat)," × (1 − ",y(a.yhat),") = ",e.jsx("span",{className:"fs",children:y(le(a.zo))}),`

`,e.jsx("span",{className:"fc",children:"# Gradient for output pre-activation (chain rule):"}),`
`,"∂L/∂zₒ = ∂L/∂ŷ × σ'(zₒ)",`
`,"∂L/∂zₒ = ",y(n.dL_dyhat)," × ",y(le(a.zo))," = ",e.jsx("span",{className:"fr",children:y(n.dL_dzo)}),`

`,e.jsx("span",{className:"fc",children:"# Gradients for output weights:"}),`
`,"∂L/∂v₁ = ∂L/∂zₒ × h₁ = ",y(n.dL_dzo)," × ",y(a.h1)," = ",e.jsx("span",{className:"fa",children:y(n.dL_dv1)}),`
`,"∂L/∂v₂ = ∂L/∂zₒ × h₂ = ",y(n.dL_dzo)," × ",y(a.h2)," = ",e.jsx("span",{className:"fa",children:y(n.dL_dv2)}),`
`,"∂L/∂bₒ = ∂L/∂zₒ = ",e.jsx("span",{className:"fa",children:y(n.dL_dbo)})]}),e.jsxs("div",{className:"callout callout-a",children:[e.jsx("strong",{children:"Chain rule in action:"}),' ∂L/∂v₁ = (∂L/∂ŷ) × (∂ŷ/∂zₒ) × (∂zₒ/∂v₁). We multiply three derivatives together, each from one "link" in the chain.']})]})},{title:"Backprop Through Hidden Layer",active_nodes:["h1","h2"],active_edges:["w₁₁","w₂₁","w₁₂","w₂₂"],content:e.jsxs("div",{children:[e.jsx("p",{style:{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14},children:'Now we push the error gradient further back — through the hidden neurons. This is where the "magic" of backpropagation really shows: each hidden neuron gets its share of the blame.'}),e.jsxs("div",{className:"formula",children:[e.jsx("span",{className:"fc",children:"# Gradient reaching each hidden neuron's output:"}),`
`,"∂L/∂h₁ = ∂L/∂zₒ × v₁ = ",y(n.dL_dzo)," × ",r.v1," = ",e.jsx("span",{className:"fs",children:y(n.dL_dh1)}),`
`,"∂L/∂h₂ = ∂L/∂zₒ × v₂ = ",y(n.dL_dzo)," × ",r.v2," = ",e.jsx("span",{className:"fs",children:y(n.dL_dh2)}),`

`,e.jsx("span",{className:"fc",children:"# Through sigmoid_bt activation in hidden layer:"}),`
`,"σ'(z₁) = ",y(a.h1)," × (1−",y(a.h1),") = ",e.jsx("span",{className:"fv",children:y(le(a.z1))}),`
`,"∂L/∂z₁ = ∂L/∂h₁ × σ'(z₁) = ",y(n.dL_dh1)," × ",y(le(a.z1))," = ",e.jsx("span",{className:"fr",children:y(n.dL_dz1)}),`

`,"σ'(z₂) = ",e.jsx("span",{className:"fv",children:y(le(a.z2))}),`
`,"∂L/∂z₂ = ∂L/∂h₂ × σ'(z₂) = ",e.jsx("span",{className:"fr",children:y(n.dL_dz2)})]}),e.jsxs("div",{className:"formula",children:[e.jsx("span",{className:"fc",children:"# Gradients for hidden weights (chain rule continued):"}),`
`,"∂L/∂w₁₁ = ∂L/∂z₁ × x₁ = ",y(n.dL_dz1)," × ",r.x1," = ",e.jsx("span",{className:"fa",children:y(n.dL_dw11)}),`
`,"∂L/∂w₂₁ = ∂L/∂z₁ × x₂ = ",y(n.dL_dz1)," × ",r.x2," = ",e.jsx("span",{className:"fa",children:y(n.dL_dw21)}),`
`,"∂L/∂w₁₂ = ∂L/∂z₂ × x₁ = ",e.jsx("span",{className:"fa",children:y(n.dL_dw12)}),`
`,"∂L/∂w₂₂ = ∂L/∂z₂ × x₂ = ",e.jsx("span",{className:"fa",children:y(n.dL_dw22)})]})]})},{title:"Update All Weights",active_nodes:["h1","h2","o1"],active_edges:["w₁₁","w₂₁","w₁₂","w₂₂","v₁","v₂"],content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14},children:["Now we apply ",e.jsx("strong",{style:{color:"var(--emerald)"},children:"gradient descent"}),": subtract a fraction (learning rate α = ",r.lr,") of each gradient from the corresponding weight. This nudges weights to reduce the loss."]}),e.jsxs("div",{className:"formula",children:[e.jsx("span",{className:"fc",children:"# Gradient descent update rule:"}),`
`,"w_new = w_old − α × ∂L/∂w",`

`,e.jsx("span",{className:"fc",children:"# Updated hidden weights:"}),`
`,"w₁₁ = ",r.w11," − ",r.lr,"×",y(n.dL_dw11)," = ",e.jsx("span",{className:"hi",children:y(r.w11-r.lr*n.dL_dw11)}),`
`,"w₂₁ = ",r.w21," − ",r.lr,"×",y(n.dL_dw21)," = ",e.jsx("span",{className:"hi",children:y(r.w21-r.lr*n.dL_dw21)}),`
`,"w₁₂ = ",r.w12," − ",r.lr,"×",y(n.dL_dw12)," = ",e.jsx("span",{className:"hi",children:y(r.w12-r.lr*n.dL_dw12)}),`
`,"w₂₂ = ",r.w22," − ",r.lr,"×",y(n.dL_dw22)," = ",e.jsx("span",{className:"hi",children:y(r.w22-r.lr*n.dL_dw22)}),`

`,e.jsx("span",{className:"fc",children:"# Updated output weights:"}),`
`,"v₁ = ",r.v1," − ",r.lr,"×",y(n.dL_dv1)," = ",e.jsx("span",{className:"hi",children:y(r.v1-r.lr*n.dL_dv1)}),`
`,"v₂ = ",r.v2," − ",r.lr,"×",y(n.dL_dv2)," = ",e.jsx("span",{className:"hi",children:y(r.v2-r.lr*n.dL_dv2)})]}),e.jsxs("div",{className:"callout callout-e",children:[e.jsx("strong",{children:"✅ One complete training step done!"})," After updating: if we run forward pass again with these new weights, the loss will be smaller. Repeat this 10,000 times and the network learns!"]})]})}];return e.jsxs("div",{className:"fade-up",children:[e.jsxs("div",{className:"sh",children:[e.jsx("div",{className:"sh-badge",children:"🔙 SECTION 4"}),e.jsx("h2",{children:"Backpropagation — Step by Step"}),e.jsxs("p",{children:["The red flow shows gradients traveling ",e.jsx("em",{children:"backward"})," through the network. Each step uses the chain rule to assign blame to each weight."]})]}),e.jsx("div",{className:"step-nav",children:c.map((g,m)=>e.jsxs("button",{className:`step-btn ${t===m?"active":""}`,onClick:()=>p(m),children:[e.jsxs("span",{className:"sn",children:["0",m+1]}),g.title.split(" ").slice(0,2).join(" ")]},m))}),e.jsx("div",{className:"prog-wrap",children:e.jsx("div",{className:"prog",style:{width:`${(t+1)/c.length*100}%`,background:"linear-gradient(90deg,var(--rose),var(--amber))"}})}),e.jsx("div",{className:"net-wrap",style:{marginBottom:20},children:e.jsx(Pe,{mode:"backward",activeEdges:c[t].active_edges,activeNodes:c[t].active_nodes,fwd:a,net:r})}),e.jsxs("div",{className:"card r",children:[e.jsx("div",{className:"card-title",children:c[t].title}),c[t].content,e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:20,gap:10},children:[e.jsx("button",{className:"btn btn-out",onClick:()=>p(Math.max(0,t-1)),disabled:t===0,children:"← Previous"}),e.jsx("button",{className:"btn btn-a",onClick:()=>p(Math.min(c.length-1,t+1)),disabled:t===c.length-1,children:"Next Step →"})]})]})]})},jt=function(){const[t,p]=w.useState("weight"),r={weight:{color:"var(--emerald)",label:"⚖️ Weights",content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14},children:[e.jsx("strong",{style:{color:"var(--emerald)"},children:"Weights (W)"}),' are numbers assigned to every connection between neurons. They determine how much influence one neuron has on the next. Think of them as the "volume knobs" of the network.']}),e.jsxs("div",{className:"formula",children:[e.jsx("span",{className:"fc",children:"# Weight impact on output:"}),`
`,"contribution = weight × input",`

`,e.jsx("span",{className:"fc",children:"# High positive weight (+2.0):"}),`
`,"output += 2.0 × 0.8 = ",e.jsx("span",{className:"hi",children:"+1.6"}),"  ",e.jsx("span",{className:"fc",children:"← amplifies the input"}),`

`,e.jsx("span",{className:"fc",children:"# High negative weight (−1.5):"}),`
`,"output += −1.5 × 0.8 = ",e.jsx("span",{className:"fr",children:"−1.2"}),"  ",e.jsx("span",{className:"fc",children:"← suppresses/inverts"}),`

`,e.jsx("span",{className:"fc",children:"# Near-zero weight (0.01):"}),`
`,"output += 0.01 × 0.8 = ",e.jsx("span",{className:"fs",children:"+0.008"})," ",e.jsx("span",{className:"fc",children:"← almost ignores"})]}),e.jsx("div",{className:"igrid",children:[{ico:"📏",title:"Range",body:"Can be any real number. Usually initialized to small random values (e.g. −0.1 to +0.1)."},{ico:"📈",title:"Learning",body:"Changed by gradient descent during backprop. The gradient ∂L/∂w tells us which direction to nudge."},{ico:"🔢",title:"Count",body:"A 2-2-1 network has (2×2)+(2×1) = 6 weights. GPT-4 has ~1.8 trillion!"},{ico:"🎯",title:"Role",body:"Encode the 'knowledge' the network has learned — patterns, features, relationships in the data."}].map(a=>e.jsxs("div",{className:"ibox",children:[e.jsx("div",{className:"ibox-ico",children:a.ico}),e.jsx("div",{className:"ibox-title",children:a.title}),e.jsx("div",{className:"ibox-body",children:a.body})]},a.ico))})]})},bias:{color:"var(--amber)",label:"⬛ Biases",content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14},children:[e.jsx("strong",{style:{color:"var(--amber)"},children:"Bias (b)"}),` is an extra learnable value added to the pre-activation. It's like an intercept in linear regression — it lets the neuron shift its "decision boundary" independently of the inputs.`]}),e.jsxs("div",{className:"formula",children:[e.jsx("span",{className:"fc",children:"# Without bias:"}),`
`,"z = w₁×x₁ + w₂×x₂",`
`,e.jsx("span",{className:"fc",children:"# When x₁=x₂=0: z must be 0. Neuron can't fire!"}),`

`,e.jsx("span",{className:"fc",children:"# With bias:"}),`
`,"z = w₁×x₁ + w₂×x₂ + b",`
`,e.jsx("span",{className:"fc",children:"# When x₁=x₂=0: z = b. Neuron CAN fire if b > 0!"}),`

`,e.jsx("span",{className:"fc",children:"# Bias shifts the activation threshold:"}),`
`,"σ(b=−3) → fires only for large inputs",`
`,"σ(b=0)  → fires at z=0",`
`,"σ(b=+3) → fires even for small inputs"]}),e.jsxs("div",{className:"callout callout-a",children:[e.jsx("strong",{children:"🎓 Analogy:"})," Imagine a smoke alarm. The ",e.jsx("em",{children:"weight"})," controls how sensitive it is to smoke (gain). The ",e.jsx("em",{children:"bias"})," controls the baseline threshold — maybe it takes a lot of smoke to trigger (negative bias) or very little (positive bias)."]})]})},activation:{color:"var(--violet)",label:"⚡ Activations",content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14},children:[e.jsx("strong",{style:{color:"var(--violet)"},children:"Activation functions"})," are applied after the weighted sum. Without them, stacking layers would collapse into one linear layer — useless. They introduce non-linearity so networks can learn ANY pattern."]}),e.jsx("div",{className:"two-col",children:[{name:"Sigmoid σ(z)",formula:"1 / (1 + e^(−z))",range:"(0, 1)",use:"Output layer for binary classification, hidden layers",deriv:"σ(z)(1−σ(z))",color:"var(--emerald)"},{name:"ReLU max(0,z)",formula:"z if z>0, else 0",range:"[0, ∞)",use:"Most common hidden layer activation. Fast and avoids vanishing gradient.",deriv:"1 if z>0, else 0",color:"var(--sky)"},{name:"Tanh tanh(z)",formula:"(e^z − e^(−z)) / (e^z + e^(−z))",range:"(−1, 1)",use:"Hidden layers where negative output is meaningful.",deriv:"1 − tanh(z)²",color:"var(--amber)"},{name:"Softmax",formula:"e^(zᵢ) / Σe^(zⱼ)",range:"(0,1), sum=1",use:"Multi-class output layer. Converts logits to probabilities.",deriv:"softmax × (1−softmax)",color:"var(--rose)"}].map(a=>e.jsxs("div",{className:"card",style:{marginBottom:0,padding:18,borderColor:a.color+"44",background:`${a.color}08`},children:[e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:14,fontWeight:700,color:a.color,marginBottom:6},children:a.name}),e.jsxs("div",{className:"formula",style:{margin:"8px 0",fontSize:12,padding:"8px 14px",borderLeftColor:a.color},children:["f(z) = ",a.formula,`
`,"Range: ",a.range,`
`,"f'(z) = ",a.deriv]}),e.jsxs("div",{style:{fontSize:12,color:"var(--muted)",lineHeight:1.6},children:["✅ Use when: ",a.use]})]},a.name))})]})},hidden:{color:"var(--sky)",label:"🧠 Hidden Layers",content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:"var(--muted)",lineHeight:1.8,fontSize:14,marginBottom:14},children:[e.jsx("strong",{style:{color:"var(--sky)"},children:"Hidden layers"}),' are the "processing" layers between input and output. They transform input features into increasingly abstract representations. The deeper the network, the more complex patterns it can learn.']}),e.jsxs("div",{className:"callout callout-s",style:{marginBottom:14},children:[e.jsx("strong",{children:"In our example:"})," The 2 hidden neurons each combine ","{x₁, x₂}",' with different weights, learning different "views" of the data. H₁ might learn "is this positive?", H₂ might learn "is this large?". The output layer combines both signals.']}),e.jsxs("table",{className:"vtable",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Input"}),e.jsx("th",{children:"Processing (Hidden)"}),e.jsx("th",{children:"Output"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{style:{color:"var(--sky)"},children:"Raw pixels"}),e.jsx("td",{style:{color:"var(--emerald)"},children:"Edges → Shapes → Parts → Objects"}),e.jsx("td",{style:{color:"var(--amber)"},children:"Cat / Dog / Bird"})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{color:"var(--sky)"},children:"Stock prices"}),e.jsx("td",{style:{color:"var(--emerald)"},children:"Trends → Patterns → Indicators"}),e.jsx("td",{style:{color:"var(--amber)"},children:"Buy / Sell / Hold"})]}),e.jsxs("tr",{children:[e.jsx("td",{style:{color:"var(--sky)"},children:"Word tokens"}),e.jsx("td",{style:{color:"var(--emerald)"},children:"Syntax → Semantics → Context"}),e.jsx("td",{style:{color:"var(--amber)"},children:"Next word"})]})]})]}),e.jsx("div",{className:"igrid",style:{marginTop:14},children:[{ico:"📐",title:"Width",body:"Number of neurons per layer. More neurons = more capacity but more computation."},{ico:"🏗️",title:"Depth",body:"Number of hidden layers. GPT-4 has 96 transformer 'layers'. More depth = more abstraction."},{ico:"↔️",title:"Information Flow",body:"During forward pass: left to right. During backprop: right to left. Each layer sees gradients from all layers ahead of it."},{ico:"🎭",title:"Feature Learning",body:"Hidden neurons learn to detect task-specific patterns automatically from data — no manual feature engineering needed!"}].map(a=>e.jsxs("div",{className:"ibox",children:[e.jsx("div",{className:"ibox-ico",children:a.ico}),e.jsx("div",{className:"ibox-title",children:a.title}),e.jsx("div",{className:"ibox-body",children:a.body})]},a.ico))})]})}};return e.jsxs("div",{className:"fade-up",children:[e.jsxs("div",{className:"sh",children:[e.jsx("div",{className:"sh-badge",children:"🧩 SECTION 5"}),e.jsx("h2",{children:"Weights, Biases, Activations & Hidden Layers"}),e.jsx("p",{children:"Click each component to understand its role in the network — with real math from our example."})]}),e.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20},children:Object.entries(r).map(([a,n])=>e.jsx("button",{className:"btn",onClick:()=>p(a),style:{background:t===a?n.color+"22":"var(--bg3)",border:`1.5px solid ${t===a?n.color:"var(--border)"}`,color:t===a?n.color:"var(--muted)"},children:n.label},a))}),e.jsxs("div",{className:"card e fade-up",style:{borderTopColor:r[t].color},children:[e.jsx("div",{className:"card-title",style:{color:r[t].color},children:r[t].label}),r[t].content]},t)]})},St=function(){const[t,p]=w.useState({...ze}),[r,a]=w.useState([]),[n,c]=w.useState(0),[g,m]=w.useState(!1),[s,h]=w.useState(200),l=w.useRef(null),u=w.useCallback(()=>{p(j=>{const z=ke(j),N=Fe(j,z),T=xt(j,N);return a(F=>[...F,{epoch:F.length+1,loss:y(N.loss),yhat:y(z.yhat)}].slice(-50)),c(F=>F+1),T})},[]);w.useEffect(()=>(g?l.current=setInterval(u,s):clearInterval(l.current),()=>clearInterval(l.current)),[g,s,u]);const f=()=>{m(!1),p({...ze}),a([]),c(0)},b=ke(t),$=Fe(t,b),L=y($.loss),C=80,E=340,k=Math.max(...r.map(j=>j.loss),.15),S=r.map((j,z)=>{const N=z/Math.max(r.length-1,1)*E,T=C-j.loss/k*C;return`${N},${T}`}).join(" ");return e.jsxs("div",{className:"fade-up",children:[e.jsxs("div",{className:"sh",children:[e.jsx("div",{className:"sh-badge",children:"⚡ SECTION 6"}),e.jsx("h2",{children:"Live Training — Watch the Network Learn"}),e.jsxs("p",{children:["Press ",e.jsx("strong",{children:"Run"})," to watch forward pass + backpropagation happen in real time. The loss should decrease as the network improves its prediction!"]})]}),e.jsxs("div",{className:"two-col",children:[e.jsxs("div",{className:"card e",children:[e.jsx("div",{className:"card-title",children:"🎮 Training Controls"}),e.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap",marginBottom:18},children:[e.jsx("button",{className:"btn btn-e",onClick:()=>m(j=>!j),children:g?"⏸ Pause":"▶ Run Training"}),e.jsx("button",{className:"btn btn-s",onClick:u,disabled:g,children:"⏭ Step Once"}),e.jsx("button",{className:"btn btn-out",onClick:f,children:"↺ Reset"})]}),e.jsxs("div",{className:"slider-wrap",children:[e.jsxs("div",{className:"slider-label",children:[e.jsx("span",{children:"Speed"}),e.jsxs("span",{children:[s,"ms/step"]})]}),e.jsx("input",{type:"range",min:"50",max:"800",step:"50",value:s,onChange:j=>h(+j.target.value)}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--muted2)"},children:[e.jsx("span",{children:"Fast"}),e.jsx("span",{children:"Slow"})]})]}),e.jsxs("div",{style:{marginTop:14},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:10},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:11,color:"var(--muted)"},children:"EPOCH"}),e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:28,fontWeight:700,color:"var(--sky)"},children:n})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:11,color:"var(--muted)"},children:"PREDICTION ŷ"}),e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:28,fontWeight:700,color:"var(--amber)"},children:y(b.yhat)})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:11,color:"var(--muted)"},children:"LOSS"}),e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:28,fontWeight:700,color:L<.01?"var(--emerald)":"var(--rose)"},children:L})]})]}),e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:11,color:"var(--muted)",marginBottom:4},children:"PROGRESS TO TARGET (y=1.0)"}),e.jsx("div",{className:"prog-wrap",children:e.jsx("div",{className:"prog",style:{width:`${Math.min(100,y(b.yhat)*100)}%`}})}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:11,fontFamily:"JetBrains Mono",color:"var(--muted2)"},children:[e.jsx("span",{children:"ŷ=0"}),e.jsx("span",{children:"TARGET: ŷ=1.0"})]})]})]}),e.jsxs("div",{className:"card s",children:[e.jsx("div",{className:"card-title",children:"📉 Loss Curve"}),e.jsx("div",{style:{background:"var(--bg)",borderRadius:10,padding:12,marginBottom:12},children:r.length>1?e.jsxs("svg",{viewBox:`0 0 ${E} ${C}`,width:"100%",style:{display:"block"},children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"lossGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[e.jsx("stop",{offset:"0%",stopColor:"var(--emerald)",stopOpacity:".6"}),e.jsx("stop",{offset:"100%",stopColor:"var(--emerald)",stopOpacity:".05"})]})}),e.jsx("polyline",{points:S,fill:"none",stroke:"var(--emerald)",strokeWidth:"2",strokeLinecap:"round"}),e.jsx("polygon",{points:`0,${C} ${S} ${E},${C}`,fill:"url(#lossGrad)"}),e.jsx("text",{x:"4",y:"12",fontFamily:"JetBrains Mono",fontSize:"8",fill:"#4a7a95",children:"Loss"}),e.jsxs("text",{x:E-50,y:C-4,fontFamily:"JetBrains Mono",fontSize:"8",fill:"#4a7a95",children:["Epoch ",n]})]}):e.jsx("div",{style:{height:80,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--muted2)",fontFamily:"JetBrains Mono",fontSize:12},children:"Run training to see the loss curve"})}),e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:11,color:"var(--muted)",marginBottom:8},children:"CURRENT WEIGHTS"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6},children:[["w₁₁",t.w11,"e"],["w₂₁",t.w21,"e"],["w₁₂",t.w12,"e"],["w₂₂",t.w22,"e"],["v₁",t.v1,"a"],["v₂",t.v2,"a"],["b₁",t.b1,"s"],["b₂",t.b2,"s"]].map(([j,z,N])=>e.jsxs("div",{style:{background:"var(--bg3)",borderRadius:6,padding:"5px 10px",display:"flex",justifyContent:"space-between",fontFamily:"JetBrains Mono",fontSize:11},children:[e.jsx("span",{style:{color:`var(--${N==="e"?"emerald":N==="a"?"amber":"sky"})`},children:j}),e.jsx("span",{style:{color:"var(--muted)"},children:y(z)})]},j))})]})]}),e.jsxs("div",{className:"card a",children:[e.jsx("div",{className:"card-title",children:"📊 Training Log (last 10 steps)"}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{className:"vtable",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Epoch"}),e.jsx("th",{children:"Prediction ŷ"}),e.jsx("th",{children:"Loss"}),e.jsx("th",{children:"Distance to Target"})]})}),e.jsxs("tbody",{children:[r.slice(-10).map((j,z)=>e.jsxs("tr",{children:[e.jsx("td",{className:"hs",children:j.epoch}),e.jsx("td",{className:"ha",children:j.yhat}),e.jsx("td",{className:j.loss<.01?"hi":j.loss<.05?"ha":"hr",children:j.loss}),e.jsx("td",{style:{color:"var(--muted)"},children:y(Math.abs(j.yhat-1))})]},z)),r.length===0&&e.jsx("tr",{children:e.jsx("td",{colSpan:4,style:{textAlign:"center",color:"var(--muted2)",fontSize:12},children:"No training steps yet — press Run!"})})]})]})})]})]})},zt=function(){const[t,p]=w.useState(0),[r,a]=w.useState(null),[n,c]=w.useState(0),[g,m]=w.useState(!1),s=[{q:"In the forward pass of a neural network, in which direction does information flow?",opts:["Output layer to input layer","Input layer to output layer","Randomly between layers","Both directions simultaneously"],correct:1,explain:"✅ Correct! Forward pass flows LEFT to RIGHT — input → hidden → output. This is how the network makes its prediction."},{q:"What does backpropagation compute?",opts:["The network's final prediction","The gradients showing how much each weight contributed to the error","The new training data","The number of hidden layers needed"],correct:1,explain:"✅ Exactly! Backprop computes ∂L/∂w for every weight — how much each weight is 'to blame' for the error. This enables gradient descent."},{q:"What is the purpose of an activation function like ReLU or Sigmoid?",opts:["To slow down training","To initialize weights randomly","To add non-linearity so the network can learn complex patterns","To count the number of neurons"],correct:2,explain:"✅ Right! Without activation functions, stacking layers = one linear function = can't learn complex patterns. Sigmoid/ReLU add the non-linearity needed."},{q:"In gradient descent, which direction do we move the weights?",opts:["In the direction of the gradient (uphill)","In the direction opposite to the gradient (downhill)","In a random direction","We don't move weights — only biases change"],correct:1,explain:"✅ Perfect! We subtract the gradient: w = w − α × ∂L/∂w. Subtracting means moving downhill — toward the loss minimum."},{q:"If ŷ = 0.3 and the target y = 1.0, what is the MSE/2 loss?",opts:["0.49","0.245","0.7","0.1"],correct:1,explain:"✅ Correct! L = ½(0.3−1.0)² = ½(−0.7)² = ½×0.49 = 0.245"},{q:"What is the purpose of the bias term in a neuron?",opts:["To connect to the next layer","To allow the neuron to fire even when all inputs are zero","To normalize the input values","To count training examples"],correct:1,explain:"✅ Exactly! Bias shifts the activation threshold independently of inputs. Without bias, the neuron can't fire when x=0, severely limiting what patterns it can learn."},{q:"Which component of a neural network changes during training?",opts:["The number of layers","The input data","The weights and biases","The activation function type"],correct:2,explain:"✅ Right! Only weights (W) and biases (b) are updated by gradient descent. The architecture and inputs are fixed during a training run."},{q:"The chain rule in calculus is central to backpropagation. What does it allow us to do?",opts:["Multiply matrices faster","Compute how a change in one layer affects the loss, through all intermediate layers","Skip computing gradients for the first layer","Initialize weights from a normal distribution"],correct:1,explain:"✅ Correct! Chain rule: ∂L/∂w = (∂L/∂ŷ) × (∂ŷ/∂z) × (∂z/∂w). We can link together derivatives across all layers to trace the error back to any weight."}],h=s[t],l=b=>{r===null&&(a(b),b===h.correct&&c($=>$+1))},u=()=>{if(t+1>=s.length){m(!0);return}p(b=>b+1),a(null)},f=()=>{p(0),a(null),c(0),m(!1)};return g?e.jsxs("div",{className:"fade-up",children:[e.jsxs("div",{className:"sh",children:[e.jsx("div",{className:"sh-badge",children:"🧠 KNOWLEDGE CHECK"}),e.jsx("h2",{children:"Quiz Complete!"})]}),e.jsxs("div",{className:"card e",style:{textAlign:"center",padding:"48px 28px"},children:[e.jsx("div",{style:{fontSize:64,marginBottom:16},children:n===s.length?"🏆":n>=6?"🎯":n>=4?"📚":"🔄"}),e.jsxs("div",{style:{fontFamily:"JetBrains Mono",fontSize:32,fontWeight:700,color:"var(--emerald)",marginBottom:8},children:[n,"/",s.length]}),e.jsx("div",{style:{color:"var(--muted)",marginBottom:24,fontSize:16},children:n===s.length?"Perfect score! You've mastered forward pass & backpropagation! 🚀":n>=6?"Excellent! You have a strong grasp of the concepts.":n>=4?"Good work! Review the sections you missed and try again.":"Keep studying! Go through the sections and come back."}),e.jsx("div",{className:"prog-wrap",style:{maxWidth:300,margin:"0 auto 24px"},children:e.jsx("div",{className:"prog",style:{width:`${n/s.length*100}%`}})}),e.jsx("button",{className:"btn btn-e",onClick:f,children:"🔄 Retry Quiz"})]})]}):e.jsxs("div",{className:"fade-up",children:[e.jsxs("div",{className:"sh",children:[e.jsx("div",{className:"sh-badge",children:"🧠 SECTION 7"}),e.jsx("h2",{children:"Knowledge Check"}),e.jsx("p",{children:"8 questions testing your understanding of forward pass, backpropagation, weights, biases, and activations."})]}),e.jsxs("div",{className:"quiz-card",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:12},children:[e.jsxs("span",{className:"tag tg-e",children:["Q ",t+1," / ",s.length]}),e.jsxs("span",{className:"tag tg-a",children:["Score: ",n,"/",t]})]}),e.jsx("div",{className:"prog-wrap",children:e.jsx("div",{className:"prog",style:{width:`${t/s.length*100}%`}})}),e.jsx("div",{className:"q-text",children:h.q}),e.jsx("div",{className:"q-opts",children:h.opts.map((b,$)=>e.jsxs("button",{className:`q-opt ${r!==null&&$===h.correct?"correct":""} ${r===$&&$!==h.correct?"wrong":""}`,onClick:()=>l($),children:[e.jsxs("span",{style:{marginRight:10,opacity:.5},children:[["A","B","C","D"][$],"."]}),b]},$))}),r!==null&&e.jsx("div",{className:`q-feedback ${r===h.correct?"qf-c":"qf-w"}`,children:r===h.correct?h.explain:`❌ The correct answer is "${h.opts[h.correct]}". ${h.explain}`}),r!==null&&e.jsx("button",{className:"btn btn-e",style:{marginTop:16,width:"100%"},onClick:u,children:t+1>=s.length?"See Results 🏆":"Next Question →"})]}),e.jsxs("div",{className:"card s",style:{marginTop:20},children:[e.jsx("div",{className:"card-title",children:"📋 Quick Reference Cheat Sheet"}),e.jsx("div",{className:"igrid",children:[{ico:"🔜",label:"Forward Pass",desc:"Data flows input→hidden→output. Compute z=Wx+b then apply activation."},{ico:"🔙",label:"Backprop",desc:"Error flows output→hidden→input. Compute ∂L/∂w using chain rule."},{ico:"⚖️",label:"Weight",desc:"Strength of connection. Updated by gradient descent. w = w − α×∂L/∂w."},{ico:"⬛",label:"Bias",desc:"Offset per neuron. Lets it fire when inputs=0. Also updated by gradient descent."},{ico:"⚡",label:"Activation",desc:"Adds non-linearity. Sigmoid→(0,1), ReLU→max(0,z), Softmax→probabilities."},{ico:"📏",label:"Loss",desc:"Measures error. MSE = ½(ŷ−y)². Minimized by training."},{ico:"⛓️",label:"Chain Rule",desc:"∂L/∂w = ∂L/∂ŷ × ∂ŷ/∂z × ∂z/∂w. Multiply derivatives link by link."},{ico:"📉",label:"Gradient Descent",desc:"Slide downhill on the loss landscape. α=learning rate controls step size."},{ico:"♾️",label:"Epoch",desc:"One full pass through training data (forward + backward for all examples)."},{ico:"🎯",label:"Pre-activation z",desc:"z = Wx + b (before activation function). Sometimes called 'logit'."}].map(b=>e.jsx("div",{className:"ibox",style:{padding:"12px 14px"},children:e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"flex-start"},children:[e.jsx("span",{style:{fontSize:18,flexShrink:0},children:b.ico}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,fontSize:13,color:"var(--text)",marginBottom:3},children:b.label}),e.jsx("div",{style:{fontSize:12,color:"var(--muted)",lineHeight:1.5},children:b.desc})]})]})},b.ico))})]})]})},kt=[{id:"what",label:"📖 What Is It?"},{id:"why",label:"❓ Why Use It?"},{id:"fwd",label:"🔜 Forward Pass"},{id:"back",label:"🔙 Backprop"},{id:"layers",label:"🧩 Weights & Layers"},{id:"live",label:"⚡ Live Trainer"},{id:"quiz",label:"🧠 Quiz"}],_t=function(){const[t,p]=w.useState("what"),r={what:e.jsx(bt,{}),why:e.jsx(yt,{}),fwd:e.jsx(Ft,{}),back:e.jsx(Bt,{}),layers:e.jsx(jt,{}),live:e.jsx(St,{}),quiz:e.jsx(zt,{})};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:gt}),e.jsxs("div",{className:"app",children:[e.jsxs("div",{className:"hero",children:[e.jsx("div",{className:"hero-eyebrow",children:"⬡ NEURAL NETWORK FUNDAMENTALS"}),e.jsxs("h1",{children:["Forward Pass &",e.jsx("br",{}),"Backpropagation"]}),e.jsxs("p",{className:"hero-sub",children:["The two algorithms that power ",e.jsx("em",{children:"all"})," of modern AI — explained visually, mathematically, and interactively for curious minds."]}),e.jsxs("div",{className:"hero-chips",children:[e.jsx("span",{className:"chip chip-e",children:"🔜 Forward Propagation"}),e.jsx("span",{className:"chip chip-s",children:"🔙 Backpropagation"}),e.jsx("span",{className:"chip chip-a",children:"⚖️ Weights & Biases"}),e.jsx("span",{className:"chip chip-v",children:"⚡ Live Training"})]})]}),e.jsx("div",{className:"tabs",children:kt.map(a=>e.jsx("button",{className:`tab ${t===a.id?"active":""}`,onClick:()=>p(a.id),children:a.label},a.id))}),e.jsx("div",{className:"content",children:r[t]},t)]})]})},ge=x=>1/(1+Math.exp(-Math.max(-500,Math.min(500,x)))),Ce=x=>{const t=ge(x);return t*(1-t)},v=(x,t=4)=>typeof x=="number"?x.toFixed(t):"—",O=x=>v(x,2),we=(x,t)=>x.reduce((p,r,a)=>p+Math.pow(r-t[a],2),0)/x.length,pe=(x,t)=>Math.sqrt(we(x,t)),Nt=(x,t)=>x.reduce((p,r,a)=>p+Math.abs(r-t[a]),0)/x.length,oe=[{x:[.2,.6],y:.35},{x:[.4,.7],y:.52},{x:[.6,.8],y:.67},{x:[.8,.5],y:.71},{x:[.9,.9],y:.88},{x:[.3,.4],y:.38},{x:[.7,.6],y:.74},{x:[.5,.8],y:.6}],ie=oe.slice(0,6),_e=oe.slice(6),me=function(t,p,r,a,n){const c=[p[0][0]*t[0]+p[0][1]*t[1]+r[0],p[1][0]*t[0]+p[1][1]*t[1]+r[1]],g=c.map(ge),m=a[0]*g[0]+a[1]*g[1]+n,s=ge(m);return{z1:c,h1:g,z2:m,out:s}},Be=function(t,p,r,a,n,c){const{z1:g,h1:m,z2:s,out:h}=me(t,r,a,n,c),l=h-p,u=Ce(s),f=l*u,b=m.map(k=>f*k),$=f,L=[f*n[0]*Ce(g[0]),f*n[1]*Ce(g[1])];return{dW1:[[L[0]*t[0],L[0]*t[1]],[L[1]*t[0],L[1]*t[1]]],db1:L,dW2:b,db2:$,out:h,z1:g,h1:m,z2:s}},i={bg:"#050c14",panel:"#080f1c",border:"#0d2040",amber:"#f59e0b",green:"#10b981",cyan:"#06b6d4",red:"#ef4444",blue:"#3b82f6",dim:"#94a3b8",dimmer:"#475569",text:"#e2e8f0",mono:"'Courier New', 'Lucida Console', monospace",sans:"'Georgia', 'Times New Roman', serif"},X=({children:x,style:t={},glow:p})=>e.jsx("div",{style:{background:i.panel,border:`1px solid ${p?p+"50":i.border}`,borderRadius:12,padding:"20px",boxShadow:p?`0 0 24px ${p}22, inset 0 0 32px ${p}08`:"none",...t},children:x}),V=({children:x,color:t=i.amber,size:p=11})=>e.jsx("div",{style:{fontFamily:i.mono,fontSize:p,letterSpacing:3,textTransform:"uppercase",color:t,marginBottom:10,fontWeight:700},children:x}),se=({children:x,color:t=i.amber})=>e.jsx("span",{style:{background:t+"18",border:`1px solid ${t}50`,borderRadius:4,padding:"1px 6px",fontFamily:i.mono,fontSize:11,color:t,margin:"0 3px"},children:x}),Q=({children:x,color:t=i.cyan})=>e.jsx("div",{style:{background:"#020a14",border:`1px solid ${t}40`,borderRadius:8,padding:"12px 16px",fontFamily:i.mono,fontSize:12.5,color:t,margin:"10px 0",lineHeight:2,whiteSpace:"pre-wrap",overflowX:"auto"},children:x}),Ne=({label:x,value:t,min:p,max:r,step:a=.01,onChange:n,color:c=i.amber})=>e.jsxs("div",{style:{marginBottom:10},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:4},children:[e.jsx("span",{style:{fontFamily:i.mono,fontSize:11,color:i.dim},children:x}),e.jsx("span",{style:{fontFamily:i.mono,fontSize:12,color:c,fontWeight:700},children:t.toFixed(3)})]}),e.jsx("input",{type:"range",min:p,max:r,step:a,value:t,onChange:g=>n(+g.target.value),style:{width:"100%",accentColor:c,cursor:"pointer"}})]}),re=({children:x,onClick:t,color:p=i.amber,disabled:r=!1,small:a=!1})=>e.jsx("button",{onClick:t,disabled:r,style:{padding:a?"5px 12px":"9px 20px",borderRadius:8,border:`1px solid ${r?i.dimmer:p}`,background:r?"transparent":p+"18",color:r?i.dimmer:p,fontFamily:i.mono,fontSize:a?11:13,fontWeight:700,cursor:r?"default":"pointer",letterSpacing:1,transition:"all 0.15s"},children:x}),Ee=({label:x,value:t,max:p=1,color:r=i.red})=>e.jsxs("div",{style:{marginBottom:8},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:3},children:[e.jsx("span",{style:{fontFamily:i.mono,fontSize:11,color:i.dim},children:x}),e.jsx("span",{style:{fontFamily:i.mono,fontSize:12,color:r,fontWeight:700},children:v(t)})]}),e.jsx("div",{style:{background:"#0d2040",borderRadius:3,height:8,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",borderRadius:3,width:`${Math.min(100,t/p*100)}%`,background:`linear-gradient(90deg, ${r}88, ${r})`,transition:"width 0.3s ease"}})})]}),je=({history:x,color:t=i.amber,label:p="Loss",height:r=100})=>{const a=Math.max(...x,.01),n=Math.min(...x,0),c=a-n||.01,g=400,m=r,s=x.map((l,u)=>({x:u/Math.max(x.length-1,1)*g,y:m-(l-n)/c*(m-10)-5})),h=s.length>1?"M "+s.map(l=>`${l.x.toFixed(1)},${l.y.toFixed(1)}`).join(" L "):"";return e.jsxs("div",{style:{background:"#020a14",borderRadius:8,padding:"10px 12px",border:`1px solid ${t}30`,overflow:"hidden"},children:[e.jsxs("div",{style:{fontFamily:i.mono,fontSize:10,color:t,letterSpacing:2,marginBottom:6},children:[p," — ",x.length," steps"]}),e.jsxs("svg",{viewBox:`0 0 ${g} ${m}`,style:{width:"100%",height:m,display:"block"},children:[[.25,.5,.75].map(l=>e.jsx("line",{x1:0,y1:m*l,x2:g,y2:m*l,stroke:t+"15",strokeWidth:1,strokeDasharray:"4 4"},l)),s.length>1&&e.jsxs(e.Fragment,{children:[e.jsx("path",{d:h,fill:"none",stroke:t+"50",strokeWidth:3}),e.jsx("path",{d:h,fill:"none",stroke:t,strokeWidth:1.5})]}),s.length>0&&e.jsx("circle",{cx:s[s.length-1].x,cy:s[s.length-1].y,r:4,fill:t}),e.jsx("text",{x:4,y:12,fill:t+"80",fontSize:9,fontFamily:"monospace",children:v(a,4)}),e.jsx("text",{x:4,y:m-2,fill:t+"80",fontSize:9,fontFamily:"monospace",children:v(n,4)})]})]})},Tt=({x,h1:t,out:p,W1:r,W2:a,b1:n,b2:c,highlight:g=null})=>{const m={i0:{cx:60,cy:80,label:`x₁
${O(x[0])}`,color:i.blue},i1:{cx:60,cy:180,label:`x₂
${O(x[1])}`,color:i.blue},h0:{cx:200,cy:80,label:`h₁
${O(t[0])}`,color:i.cyan},h1:{cx:200,cy:180,label:`h₂
${O(t[1])}`,color:i.cyan},o0:{cx:340,cy:130,label:`ŷ
${O(p)}`,color:i.amber}},s=[{from:"i0",to:"h0",w:r[0][0],label:`w₁₁=${O(r[0][0])}`},{from:"i0",to:"h1",w:r[1][0],label:`w₂₁=${O(r[1][0])}`},{from:"i1",to:"h0",w:r[0][1],label:`w₁₂=${O(r[0][1])}`},{from:"i1",to:"h1",w:r[1][1],label:`w₂₂=${O(r[1][1])}`},{from:"h0",to:"o0",w:a[0],label:`w₃₁=${O(a[0])}`},{from:"h1",to:"o0",w:a[1],label:`w₃₂=${O(a[1])}`}];return e.jsxs("svg",{viewBox:"0 0 400 260",style:{width:"100%",maxWidth:400,display:"block"},children:[e.jsxs("text",{x:200,y:20,textAnchor:"middle",fill:i.green+"bb",fontSize:9,fontFamily:"monospace",children:["b₁=[",O(n[0]),",",O(n[1]),"]"]}),e.jsxs("text",{x:340,y:20,textAnchor:"middle",fill:i.green+"bb",fontSize:9,fontFamily:"monospace",children:["b₂=",O(c)]}),s.map((h,l)=>{const u=m[h.from],f=m[h.to],b=Math.min(1,Math.abs(h.w)*1.5),$=h.w>=0?i.cyan:i.red;return e.jsxs("g",{children:[e.jsx("line",{x1:u.cx+18,y1:u.cy,x2:f.cx-18,y2:f.cy,stroke:$,strokeWidth:1+b*1.5,strokeOpacity:.3+b*.5}),e.jsx("text",{x:(u.cx+f.cx)/2,y:(u.cy+f.cy)/2-4,textAnchor:"middle",fill:$+"99",fontSize:8,fontFamily:"monospace",children:O(h.w)})]},l)}),Object.entries(m).map(([h,l])=>{const u=l.label.split(`
`);return e.jsxs("g",{children:[e.jsx("circle",{cx:l.cx,cy:l.cy,r:22,fill:l.color+"18",stroke:l.color,strokeWidth:2}),u.map((f,b)=>e.jsx("text",{x:l.cx,y:l.cy+(b===0?-5:9),textAnchor:"middle",fill:l.color,fontSize:10,fontFamily:"monospace",fontWeight:700,children:f},b))]},h)}),[["Input",60],["Hidden",200],["Output",340]].map(([h,l])=>e.jsx("text",{x:l,y:240,textAnchor:"middle",fill:i.dimmer,fontSize:9,fontFamily:"monospace",letterSpacing:2,children:h.toUpperCase()},h))]})},Lt=function(){const[t,p]=w.useState(.6),[r]=w.useState(.85),a=t-r,n=a*a,c=[.35,.52,.65,.7,.82,.4],g=[.35,.52,.67,.71,.88,.38],m=we(c,g),s=pe(c,g),h=Nt(c,g);return e.jsxs("div",{children:[e.jsxs(X,{glow:i.amber,style:{marginBottom:18},children:[e.jsx(V,{children:"What is Prediction Error?"}),e.jsxs("p",{style:{color:i.text,fontSize:14,lineHeight:1.8,marginBottom:12},children:["When a neural network makes a prediction ",e.jsx(se,{color:i.cyan,children:"ŷ"})," and the correct answer is ",e.jsx(se,{color:i.green,children:"y"}),", the ",e.jsx("strong",{style:{color:i.amber},children:"error"})," measures how far off the prediction was. This error signal is the entire engine of learning — the network uses it to figure out exactly how to adjust every weight and bias to do better next time."]}),e.jsx("p",{style:{color:i.dim,fontSize:13,lineHeight:1.7},children:"Think of it like a navigation system. If you're supposed to arrive at latitude 40.7°N but you're at 40.3°N, the error (0.4°) tells the system which direction to correct and by how much. A neural network does the same thing — except it has thousands of parameters to correct simultaneously, and the error must be distributed intelligently back through every layer."})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18},children:e.jsxs(X,{glow:i.cyan,style:{gridColumn:"1 / -1"},children:[e.jsx(V,{color:i.cyan,children:"Interactive: Single Prediction Error"}),e.jsxs("p",{style:{color:i.dim,fontSize:13,marginBottom:12},children:["Drag the prediction slider. Watch how each error metric responds differently. The target (correct answer) is fixed at ",e.jsx(se,{color:i.green,children:r}),"."]}),e.jsx(Ne,{label:"Prediction (ŷ)",value:t,min:0,max:1,onChange:p,color:i.cyan}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginTop:14},children:[{label:"Raw Error  (ŷ - y)",val:a,color:a>=0?i.red:i.blue,note:"Can be + or −"},{label:"Squared Error  (ŷ-y)²",val:n,color:i.amber,note:"Always positive"},{label:"Absolute Error  |ŷ-y|",val:Math.abs(a),color:i.green,note:"Always positive"}].map(({label:l,val:u,color:f,note:b})=>e.jsxs("div",{style:{background:"#020a14",borderRadius:8,padding:14,border:`1px solid ${f}30`,textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:i.mono,fontSize:10,color:i.dim,marginBottom:8,letterSpacing:1},children:l}),e.jsx("div",{style:{fontFamily:i.mono,fontSize:22,color:f,fontWeight:700,marginBottom:6},children:v(u)}),e.jsx("div",{style:{background:"#0d2040",borderRadius:3,height:6,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",width:`${Math.min(100,Math.abs(u)*100)}%`,background:f,borderRadius:3}})}),e.jsx("div",{style:{color:i.dimmer,fontSize:10,marginTop:6,fontFamily:i.mono},children:b})]},l))}),e.jsx(Q,{color:i.cyan,children:`Raw Error    = ŷ − y          = ${O(t)} − ${r} = ${v(a)}
Squared Err  = (ŷ − y)²      = (${v(a)})²          = ${v(n)}
Absolute Err = |ŷ − y|       = |${v(a)}|           = ${v(Math.abs(a))}`})]})}),e.jsxs(X,{glow:i.red,style:{marginBottom:18},children:[e.jsx(V,{color:i.red,children:"Why Can't We Just Use Raw Error?"}),e.jsxs("p",{style:{color:i.dim,fontSize:13,lineHeight:1.75},children:["If we average raw errors across many predictions, positive and negative errors cancel each other out. A prediction of ",e.jsx(se,{color:i.cyan,children:"0.9"})," for target ",e.jsx(se,{color:i.green,children:"1.0"})," (error −0.1) and a prediction of ",e.jsx(se,{color:i.cyan,children:"0.1"})," for target ",e.jsx(se,{color:i.green,children:"0.0"})," (error +0.1) would average to ",e.jsx(se,{color:i.red,children:"zero"})," — making it look like perfect performance even though both are wrong. We need error metrics that are always positive and emphasize large mistakes."]})]}),e.jsxs(X,{glow:i.green,children:[e.jsx(V,{color:i.green,children:"Batch Error Metrics (6 training samples)"}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontFamily:i.mono,fontSize:12},children:[e.jsx("thead",{children:e.jsx("tr",{children:["Sample","Prediction (ŷ)","Target (y)","Error","Sq. Error","Abs. Error"].map(l=>e.jsx("th",{style:{padding:"8px 10px",color:i.dimmer,borderBottom:`1px solid ${i.border}`,textAlign:"left",fontSize:10,letterSpacing:1},children:l},l))})}),e.jsxs("tbody",{children:[c.map((l,u)=>{const f=l-g[u],b=f*f,$=Math.abs(f);return e.jsxs("tr",{style:{background:u%2===0?"#050c1499":"transparent"},children:[e.jsx("td",{style:{padding:"7px 10px",color:i.dimmer},children:u+1}),e.jsx("td",{style:{padding:"7px 10px",color:i.cyan},children:v(l)}),e.jsx("td",{style:{padding:"7px 10px",color:i.green},children:v(g[u])}),e.jsx("td",{style:{padding:"7px 10px",color:f>=0?i.red:i.blue},children:v(f)}),e.jsx("td",{style:{padding:"7px 10px",color:i.amber},children:v(b)}),e.jsx("td",{style:{padding:"7px 10px",color:i.green},children:v($)})]},u)}),e.jsxs("tr",{style:{borderTop:`1px solid ${i.border}`},children:[e.jsx("td",{colSpan:3,style:{padding:"8px 10px",color:i.dimmer,fontWeight:700},children:"AVERAGE →"}),e.jsxs("td",{style:{padding:"8px 10px",color:i.red,fontWeight:700},children:[v(c.reduce((l,u,f)=>l+(u-g[f]),0)/c.length)," ← cancels!"]}),e.jsx("td",{style:{padding:"8px 10px",color:i.amber,fontWeight:700},children:v(m)}),e.jsx("td",{style:{padding:"8px 10px",color:i.green,fontWeight:700},children:v(h)})]})]})]})}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:14},children:[{metric:"MSE",value:m,color:i.amber},{metric:"RMSE",value:s,color:i.red}].map(({metric:l,value:u,color:f})=>e.jsxs("div",{style:{background:"#020a14",borderRadius:8,padding:14,border:`1px solid ${f}40`,textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:i.mono,fontSize:11,color:i.dim,marginBottom:6,letterSpacing:2},children:l}),e.jsx("div",{style:{fontFamily:i.mono,fontSize:26,color:f,fontWeight:700},children:v(u)})]},l))})]})]})},Ct=function(){const[t,p]=w.useState(4),[r,a]=w.useState([.6,.4,.8,.3]),n=[.85,.35,.7,.5],c=we(r.slice(0,t),n.slice(0,t)),g=pe(r.slice(0,t),n.slice(0,t)),m=(s,h)=>{const l=[...r];l[s]=h,a(l)};return e.jsxs("div",{children:[e.jsxs(X,{glow:i.amber,style:{marginBottom:18},children:[e.jsx(V,{children:"MSE — Mean Squared Error"}),e.jsx(Q,{color:i.amber,children:`        1   n
MSE = ─── × Σ (ŷᵢ − yᵢ)²
        n   i=1

where:
  n      = number of samples
  ŷᵢ     = the network's prediction for sample i
  yᵢ     = the true (correct) answer for sample i
  (ŷ−y)² = squaring makes all errors positive
           AND penalizes large errors MORE`}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14},children:[e.jsxs("div",{children:[e.jsxs("p",{style:{color:i.text,fontSize:13,lineHeight:1.75,marginBottom:10},children:[e.jsx("strong",{style:{color:i.amber},children:"Why squaring?"})," Three reasons:"]}),[["Always positive","Squaring any number (positive or negative) gives a positive result. −0.3 and +0.3 both become 0.09."],["Penalizes large errors harder","An error of 0.1 becomes 0.01. An error of 0.5 becomes 0.25 — 25× larger even though the error is only 5× bigger."],["Mathematically smooth","Squaring makes the error function differentiable everywhere — essential for computing gradients in backpropagation."]].map(([s,h])=>e.jsxs("div",{style:{marginBottom:10,display:"flex",gap:10},children:[e.jsx("div",{style:{color:i.amber,fontFamily:i.mono,fontSize:16,marginTop:1,flexShrink:0},children:"▸"}),e.jsxs("div",{children:[e.jsxs("span",{style:{color:i.amber,fontSize:13,fontWeight:700},children:[s,": "]}),e.jsx("span",{style:{color:i.dim,fontSize:13},children:h})]})]},s))]}),e.jsxs("div",{children:[e.jsx("p",{style:{color:i.text,fontSize:13,lineHeight:1.75,marginBottom:10},children:e.jsx("strong",{style:{color:i.red},children:"Limitations of MSE:"})}),[["Units are squared","If your output is in dollars, MSE is in dollars². It's hard to interpret directly."],["Sensitive to outliers","One extreme prediction explodes the MSE much more than many small errors."],["Scale dependent","MSE for a network predicting house prices (0–500k) is not comparable to one predicting probabilities (0–1)."]].map(([s,h])=>e.jsxs("div",{style:{marginBottom:10,display:"flex",gap:10},children:[e.jsx("div",{style:{color:i.red,fontFamily:i.mono,fontSize:16,marginTop:1,flexShrink:0},children:"▸"}),e.jsxs("div",{children:[e.jsxs("span",{style:{color:i.red,fontSize:13,fontWeight:700},children:[s,": "]}),e.jsx("span",{style:{color:i.dim,fontSize:13},children:h})]})]},s))]})]})]}),e.jsxs(X,{glow:i.red,style:{marginBottom:18},children:[e.jsx(V,{color:i.red,children:"RMSE — Root Mean Squared Error"}),e.jsx(Q,{color:i.red,children:`RMSE = √MSE = √( (1/n) × Σ(ŷᵢ − yᵢ)² )

Taking the square root:
  • Returns error to the SAME UNITS as the original output
  • RMSE = 0.05 means "on average, predictions are off by 0.05 units"
  • Easier to interpret than MSE
  • Still penalizes large errors more than small ones`}),e.jsx("p",{style:{color:i.dim,fontSize:13,lineHeight:1.75},children:'RMSE is the "practical" version of MSE. If your network predicts exam scores between 0 and 1, and RMSE = 0.08, it means your predictions are typically about 0.08 off — which corresponds to 8 percentage points on a 0–100 scale. This is immediately meaningful.'})]}),e.jsxs(X,{glow:i.cyan,children:[e.jsx(V,{color:i.cyan,children:"Live MSE & RMSE Calculator"}),e.jsx("div",{style:{marginBottom:12},children:e.jsxs("label",{style:{color:i.dim,fontSize:12,fontFamily:i.mono},children:["Number of samples: ",e.jsx("strong",{style:{color:i.cyan},children:t}),e.jsx("input",{type:"range",min:1,max:4,step:1,value:t,onChange:s=>p(+s.target.value),style:{marginLeft:10,accentColor:i.cyan,width:120}})]})}),Array.from({length:t},(s,h)=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:10,marginBottom:8,alignItems:"center"},children:[e.jsx(Ne,{label:`Sample ${h+1}: ŷ = ${O(r[h])}, y = ${O(n[h])}`,value:r[h],min:0,max:1,onChange:l=>m(h,l),color:i.cyan}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{color:i.dim,fontSize:10,fontFamily:i.mono},children:"ERROR"}),e.jsx("div",{style:{color:i.red,fontFamily:i.mono,fontSize:13,fontWeight:700},children:v(r[h]-n[h])})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{color:i.dim,fontSize:10,fontFamily:i.mono},children:"SQ. ERR"}),e.jsx("div",{style:{color:i.amber,fontFamily:i.mono,fontSize:13,fontWeight:700},children:v(Math.pow(r[h]-n[h],2))})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{color:i.dim,fontSize:10,fontFamily:i.mono},children:"|ERR|"}),e.jsx("div",{style:{color:i.green,fontFamily:i.mono,fontSize:13,fontWeight:700},children:v(Math.abs(r[h]-n[h]))})]})]},h)),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:14},children:[{label:"MSE",val:c,color:i.amber,formula:`(${Array.from({length:t},(s,h)=>`${O(Math.pow(r[h]-n[h],2))}`).join("+")})
÷ ${t} = ${v(c)}`},{label:"RMSE",val:g,color:i.red,formula:`√${v(c)} = ${v(g)}`}].map(({label:s,val:h,color:l,formula:u})=>e.jsxs("div",{style:{background:"#020a14",borderRadius:8,padding:16,border:`1px solid ${l}40`},children:[e.jsx("div",{style:{fontFamily:i.mono,fontSize:11,color:i.dim,letterSpacing:2,marginBottom:8},children:s}),e.jsx("div",{style:{fontFamily:i.mono,fontSize:28,color:l,fontWeight:700,marginBottom:8},children:v(h)}),e.jsx("div",{style:{fontFamily:i.mono,fontSize:11,color:l+"80",whiteSpace:"pre-wrap"},children:u})]},s))}),e.jsx(Q,{color:i.green,children:`Interpretation:
  MSE  = ${v(c)}  → average squared error across ${t} samples
  RMSE = ${v(g)}  → typical prediction is off by ≈${(g*100).toFixed(1)}% of the full output range`})]})]})},Ft=function(){const[t,p]=w.useState(0),[r,a]=w.useState(0),n=ie[r],c=[[.5,-.3],[.2,.8]],g=[.1,-.1],m=[.6,.4],s=.05,h=n.x,l=c[0][0]*h[0]+c[0][1]*h[1]+g[0],u=c[1][0]*h[0]+c[1][1]*h[1]+g[1],f=ge(l),b=ge(u),$=m[0]*f+m[1]*b+s,L=ge($),C=L-n.y,E=.5*C*C,k=[{title:"Input Layer — Raw Features Enter the Network",color:i.blue,content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:i.dim,fontSize:13,lineHeight:1.75,marginBottom:12},children:["Two input values flow into the network. Each is a normalized feature value between 0 and 1. The input layer performs ",e.jsx("strong",{style:{color:i.blue},children:"no computation"})," — it simply holds the data and passes it to every neuron in the hidden layer through connections called weights."]}),e.jsx(Q,{color:i.blue,children:`Input vector x = [x₁, x₂]
x₁ = ${h[0]} (feature 1: normalized study hours)
x₂ = ${h[1]} (feature 2: normalized sleep hours)

Each input connects to EVERY hidden neuron.
2 inputs × 2 hidden neurons = 4 weight connections.`})]})},{title:"Hidden Layer — Weighted Sum + Bias",color:i.cyan,content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:i.dim,fontSize:13,lineHeight:1.75,marginBottom:12},children:["Each hidden neuron computes a ",e.jsx("strong",{style:{color:i.cyan},children:"weighted sum"})," of all inputs, then adds a bias. The ",e.jsx("strong",{style:{color:i.green},children:"bias"})," is like a knob that shifts the neuron's activation threshold — it lets the network fire even when inputs are zero."]}),e.jsx(Q,{color:i.cyan,children:`Hidden neuron 1 (pre-activation z₁):
  z₁ = w₁₁·x₁ + w₁₂·x₂ + b₁
     = ${c[0][0]}×${h[0]} + ${c[0][1]}×${h[1]} + ${g[0]}
     = ${(c[0][0]*h[0]).toFixed(4)} + ${(c[0][1]*h[1]).toFixed(4)} + ${g[0]}
     = ${l.toFixed(4)}

Hidden neuron 2 (pre-activation z₂):
  z₂ = w₂₁·x₁ + w₂₂·x₂ + b₂
     = ${c[1][0]}×${h[0]} + ${c[1][1]}×${h[1]} + ${g[1]}
     = ${(c[1][0]*h[0]).toFixed(4)} + ${(c[1][1]*h[1]).toFixed(4)} + ${g[1]}
     = ${u.toFixed(4)}`})]})},{title:"Hidden Layer — Activation Function (sigmoid_eh)",color:i.cyan,content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:i.dim,fontSize:13,lineHeight:1.75,marginBottom:12},children:["The ",e.jsx("strong",{style:{color:i.cyan},children:"activation function"})," introduces non-linearity. Without it, stacking layers is mathematically identical to having just one layer. Sigmoid maps any real number to (0, 1) — perfect for probabilities."]}),e.jsx(Q,{color:i.cyan,children:`sigmoid_eh(z) = 1 / (1 + e^(−z))

h₁ = sigmoid_eh(z₁) = sigmoid_eh(${l.toFixed(4)})
   = 1 / (1 + e^(−${l.toFixed(4)}))
   = ${f.toFixed(6)}

h₂ = sigmoid_eh(z₂) = sigmoid_eh(${u.toFixed(4)})
   = 1 / (1 + e^(−${u.toFixed(4)}))
   = ${b.toFixed(6)}

These hidden activations [${O(f)}, ${O(b)}] are the
"learned representation" passed to the output layer.`})]})},{title:"Output Layer — Final Prediction",color:i.amber,content:e.jsxs("div",{children:[e.jsx("p",{style:{color:i.dim,fontSize:13,lineHeight:1.75,marginBottom:12},children:"The output neuron combines the hidden activations using its own weights and bias, then applies sigmoid_eh to produce a final prediction between 0 and 1."}),e.jsx(Q,{color:i.amber,children:`Output (pre-activation z_out):
  z_out = w₃₁·h₁ + w₃₂·h₂ + b_out
        = ${m[0]}×${f.toFixed(4)} + ${m[1]}×${b.toFixed(4)} + ${s}
        = ${(m[0]*f).toFixed(4)} + ${(m[1]*b).toFixed(4)} + ${s}
        = ${$.toFixed(4)}

Prediction ŷ = sigmoid_eh(${$.toFixed(4)}) = ${L.toFixed(6)}

True target y = ${n.y}
         ŷ  = ${v(L)}
         
This single forward pass is complete. Now we compute the loss.`})]})},{title:"Loss Computation — How Wrong Were We?",color:i.red,content:e.jsxs("div",{children:[e.jsxs("p",{style:{color:i.dim,fontSize:13,lineHeight:1.75,marginBottom:12},children:["We compute the ",e.jsx("strong",{style:{color:i.red},children:"MSE loss"})," for this single sample. (For a full batch, we'd average across all samples.) This single number summarizes exactly how wrong the prediction was."]}),e.jsx(Q,{color:i.red,children:`Single-sample MSE:
  L = 0.5 × (ŷ − y)²  ← the 0.5 simplifies the derivative
    = 0.5 × (${v(L)} − ${n.y})²
    = 0.5 × (${v(C)})²
    = 0.5 × ${v(C*C)}
    = ${v(E)}

RMSE across training set = √(average of all sample losses × 2)

The loss L is the quantity every weight update aims to MINIMIZE.
Smaller L → better predictions → more useful network.`}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginTop:10},children:[{label:"Prediction ŷ",val:L,color:i.cyan},{label:"Target y",val:n.y,color:i.green},{label:"Loss L",val:E,color:i.red}].map(({label:S,val:j,color:z})=>e.jsxs("div",{style:{background:"#020a14",borderRadius:8,padding:12,border:`1px solid ${z}30`,textAlign:"center"},children:[e.jsx("div",{style:{color:i.dim,fontSize:10,fontFamily:i.mono,marginBottom:4},children:S}),e.jsx("div",{style:{color:z,fontFamily:i.mono,fontSize:20,fontWeight:700},children:v(j)})]},S))})]})}];return e.jsxs("div",{children:[e.jsxs(X,{glow:i.blue,style:{marginBottom:18},children:[e.jsx(V,{color:i.blue,children:"Network Architecture: 2 → 2 → 1"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,alignItems:"start"},children:[e.jsxs("div",{children:[e.jsx("p",{style:{color:i.dim,fontSize:13,lineHeight:1.75,marginBottom:12},children:"We use a small network to predict exam scores from study hours and sleep hours. Select a training sample and walk through each step of the forward pass below."}),e.jsx("div",{style:{marginBottom:12},children:e.jsxs("label",{style:{color:i.dim,fontSize:12,fontFamily:i.mono},children:["Training sample: ",e.jsx("strong",{style:{color:i.blue},children:r+1}),e.jsx("input",{type:"range",min:0,max:ie.length-1,step:1,value:r,onChange:S=>a(+S.target.value),style:{marginLeft:10,accentColor:i.blue,width:120}})]})}),e.jsx(Q,{color:i.blue,children:`x = [${h[0]}, ${h[1]}]  →  y = ${n.y}
Weights W1: [[${c[0]}],[${c[1]}]]
Biases  b1: [${g}]
Weights W2: [${m}]
Bias    b2:  ${s}`})]}),e.jsx(Tt,{x:h,h1:[f,b],out:L,W1:c,W2:m,b1:g,b2:s})]})]}),e.jsxs(X,{glow:k[t].color,children:[e.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16},children:k.map((S,j)=>e.jsxs("button",{onClick:()=>p(j),style:{padding:"6px 14px",borderRadius:20,border:`1px solid ${S.color}`,background:t===j?S.color+"25":"transparent",color:t===j?S.color:i.dimmer,fontFamily:i.mono,fontSize:11,cursor:"pointer",fontWeight:t===j?700:400},children:["Step ",j+1]},j))}),e.jsx(V,{color:k[t].color,children:k[t].title}),k[t].content,e.jsxs("div",{style:{display:"flex",gap:10,marginTop:16},children:[e.jsx(re,{onClick:()=>p(S=>Math.max(0,S-1)),disabled:t===0,color:k[t].color,small:!0,children:"◀ Previous"}),e.jsx(re,{onClick:()=>p(S=>Math.min(k.length-1,S+1)),disabled:t===k.length-1,color:k[t].color,small:!0,children:"Next ▶"})]})]})]})},Bt=function(){const[t,p]=w.useState(.5),[r,a]=w.useState([[.5,-.3],[.2,.8]]),[n,c]=w.useState([.1,-.1]),[g,m]=w.useState([.6,.4]),[s,h]=w.useState(.05),[l]=w.useState(ie[0]),[u,f]=w.useState([]),[b,$]=w.useState(0),{dW1:L,db1:C,dW2:E,db2:k,out:S,h1:j}=Be(l.x,l.y,r,n,g,s),z=S-l.y,N=.5*z*z,T=()=>{const R=r.map((I,_)=>I.map((M,H)=>M-t*L[_][H])),P=n.map((I,_)=>I-t*C[_]),D=g.map((I,_)=>I-t*E[_]),B=s-t*k;a(R),c(P),m(D),h(B),f(I=>[...I.slice(-49),N])},F=()=>{a([[.5,-.3],[.2,.8]]),c([.1,-.1]),m([.6,.4]),h(.05),f([]),$(0)},A=[{title:"Step 1: Output Layer Gradient (δ_out)",color:i.red,desc:"The gradient of the loss with respect to the output neuron's pre-activation value. This is the starting point — every other gradient depends on this.",formula:`δ_out = ∂L/∂z_out = (ŷ − y) × sigmoid_eh'(z_out)
         = (ŷ − y) × ŷ×(1−ŷ)
         = (${v(S)} − ${l.y}) × ${v(S)} × ${v(1-S)}
         = ${v(z)} × ${v(S*(1-S))}
         = ${v(z*S*(1-S))}`},{title:"Step 2: Output Weight Gradients (∂L/∂W2)",color:i.amber,desc:"How much does each output weight contribute to the error? The gradient is the output delta × the hidden activation that connects to it. Larger hidden activation = larger influence = larger gradient.",formula:`∂L/∂w₃₁ = δ_out × h₁ = ${v(z*S*(1-S))} × ${v(j[0])} = ${v(z*S*(1-S)*j[0])}
∂L/∂w₃₂ = δ_out × h₂ = ${v(z*S*(1-S))} × ${v(j[1])} = ${v(z*S*(1-S)*j[1])}
∂L/∂b₂  = δ_out       = ${v(z*S*(1-S))}

Weight update rule:  new_w = old_w − lr × gradient
w₃₁: ${v(g[0])} − ${t} × ${v(E[0])} = ${v(g[0]-t*E[0])}
w₃₂: ${v(g[1])} − ${t} × ${v(E[1])} = ${v(g[1]-t*E[1])}`},{title:"Step 3: Hidden Layer Gradients (δ_h)",color:i.cyan,desc:"We propagate the error backward through the output weights. Each hidden neuron's gradient is the output delta × the connecting weight × the hidden neuron's own derivative. This is the 'chain rule' — derivatives multiply across layers.",formula:`δ_h1 = δ_out × w₃₁ × sigmoid_eh'(z_h1)
       = ${v(z*S*(1-S))} × ${v(g[0])} × ${v(j[0]*(1-j[0]))}
       = ${v(C[0])}

δ_h2 = δ_out × w₃₂ × sigmoid_eh'(z_h2)
       = ${v(z*S*(1-S))} × ${v(g[1])} × ${v(j[1]*(1-j[1]))}
       = ${v(C[1])}`},{title:"Step 4: Input Weight Gradients (∂L/∂W1)",color:i.green,desc:"The gradients for the first-layer weights follow the same pattern: hidden delta × the input that fed into it. These small gradients adjust the very first set of connections — the network's eyes that first perceive the raw input.",formula:`∂L/∂w₁₁ = δ_h1 × x₁ = ${v(C[0])} × ${l.x[0]} = ${v(L[0][0])}
∂L/∂w₁₂ = δ_h1 × x₂ = ${v(C[0])} × ${l.x[1]} = ${v(L[0][1])}
∂L/∂w₂₁ = δ_h2 × x₁ = ${v(C[1])} × ${l.x[0]} = ${v(L[1][0])}
∂L/∂w₂₂ = δ_h2 × x₂ = ${v(C[1])} × ${l.x[1]} = ${v(L[1][1])}

w₁₁: ${v(r[0][0])} − ${t}×${v(L[0][0])} = ${v(r[0][0]-t*L[0][0])}
w₁₂: ${v(r[0][1])} − ${t}×${v(L[0][1])} = ${v(r[0][1]-t*L[0][1])}`},{title:"Step 5: Bias Gradients & Full Update",color:i.blue,desc:"Biases have no incoming connection — their gradient is simply the delta of their neuron. After computing all gradients, we apply every update simultaneously. The loss should decrease after this step.",formula:`∂L/∂b₁ = δ_h1 = ${v(C[0])}
∂L/∂b₂ = δ_h2 = ${v(C[1])}

After update:
  Loss before: ${v(N)}
  Predicted:   ${v(S)}  →  Target: ${l.y}

Press "Apply Update" to apply all gradients and watch the loss decrease.`}];return e.jsxs("div",{children:[e.jsxs(X,{glow:i.amber,style:{marginBottom:18},children:[e.jsx(V,{children:"The Chain Rule — How Error Travels Backward"}),e.jsxs("p",{style:{color:i.dim,fontSize:13,lineHeight:1.8,marginBottom:12},children:["Backpropagation uses the ",e.jsx("strong",{style:{color:i.amber},children:"chain rule from calculus"})," to compute how much each weight contributed to the error. The key insight: the total effect of a weight deep in the network is the product of all the partial effects along the path from that weight to the loss."]}),e.jsx(Q,{color:i.amber,children:`∂L     ∂L    ∂ŷ    ∂z_out
──── = ──── × ─── × ──────  ← Chain rule: multiply derivatives along the path
∂w₃₁   ∂ŷ    ∂z   ∂w₃₁

Each ∂/∂w term tells us:
"If this weight increases by a tiny amount ε, how much does the loss change?"
A large gradient → big influence → needs a big adjustment.
A small gradient → small influence → small adjustment.`})]}),e.jsxs(X,{glow:A[b].color,style:{marginBottom:18},children:[e.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14},children:A.map((R,P)=>e.jsxs("button",{onClick:()=>$(P),style:{padding:"5px 12px",borderRadius:20,border:`1px solid ${R.color}`,background:b===P?R.color+"25":"transparent",color:b===P?R.color:i.dimmer,fontFamily:i.mono,fontSize:11,cursor:"pointer",fontWeight:b===P?700:400},children:["Step ",P+1]},P))}),e.jsx(V,{color:A[b].color,children:A[b].title}),e.jsx("p",{style:{color:i.dim,fontSize:13,lineHeight:1.75,marginBottom:10},children:A[b].desc}),e.jsx(Q,{color:A[b].color,children:A[b].formula})]}),e.jsxs(X,{glow:i.green,children:[e.jsx(V,{color:i.green,children:"Live Weight Update Lab"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,alignItems:"start"},children:[e.jsxs("div",{children:[e.jsx(Ne,{label:"Learning Rate (lr)",value:t,min:.01,max:2,step:.01,onChange:p,color:i.green}),e.jsxs("p",{style:{color:i.dim,fontSize:12,lineHeight:1.7,marginBottom:12},children:[e.jsx("strong",{style:{color:i.green},children:"Learning rate"})," controls how big a step we take in the direction the gradient points. Too large → overshoot, oscillate, diverge. Too small → convergence is painfully slow."]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14},children:[{label:"Loss",val:N,color:i.red},{label:"Prediction ŷ",val:S,color:i.cyan},{label:"Target y",val:l.y,color:i.green},{label:"Error (ŷ−y)",val:z,color:i.amber}].map(({label:R,val:P,color:D})=>e.jsxs("div",{style:{background:"#020a14",borderRadius:8,padding:10,border:`1px solid ${D}30`},children:[e.jsx("div",{style:{color:i.dim,fontSize:9,fontFamily:i.mono,letterSpacing:1,marginBottom:3},children:R}),e.jsx("div",{style:{color:D,fontFamily:i.mono,fontSize:16,fontWeight:700},children:v(P)})]},R))}),e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[e.jsx(re,{onClick:T,color:i.green,children:"▶ Apply Update"}),e.jsx(re,{onClick:()=>{for(let R=0;R<20;R++)T()},color:i.amber,small:!0,children:"▶▶ 20 Steps"}),e.jsx(re,{onClick:F,color:i.dim,small:!0,children:"↺ Reset"})]}),u.length>0&&e.jsx("div",{style:{marginTop:12},children:e.jsxs("div",{style:{fontFamily:i.mono,fontSize:10,color:i.green,marginBottom:4},children:["Updates applied: ",u.length," | Best loss: ",v(Math.min(...u))]})})]}),e.jsxs("div",{children:[u.length>1?e.jsx(je,{history:u,color:i.green,label:"Training Loss",height:120}):e.jsx("div",{style:{background:"#020a14",borderRadius:8,padding:24,border:`1px solid ${i.border}`,textAlign:"center"},children:e.jsx("div",{style:{color:i.dimmer,fontFamily:i.mono,fontSize:12},children:"Apply updates to see loss curve"})}),e.jsxs("div",{style:{marginTop:12},children:[e.jsx(V,{color:i.amber,size:10,children:"Current Weights W1"}),e.jsx(Q,{color:i.amber,children:r.map((R,P)=>`[${R.map(O).join(", ")}]`).join(`
`)}),e.jsx(V,{color:i.cyan,size:10,children:"Current Weights W2 & Biases"}),e.jsx(Q,{color:i.cyan,children:`W2 = [${g.map(O).join(", ")}]  b2 = ${O(s)}
b1 = [${n.map(O).join(", ")}]`})]})]})]}),e.jsxs("div",{style:{marginTop:10,padding:"10px 14px",background:"#020a14",borderRadius:8,border:`1px solid ${i.green}20`},children:[e.jsx("span",{style:{color:i.green,fontFamily:i.mono,fontSize:11,fontWeight:700},children:"Learning rate guidance: "}),e.jsx("span",{style:{color:i.dim,fontSize:12},children:"Try lr=0.01 (slow, stable) → lr=0.5 (fast) → lr=2.0 (unstable, watch the loss spike). The optimal rate is typically found with learning rate schedules or adaptive optimizers like Adam."})]})]})]})},Wt=function(){const[t,p]=w.useState(0),[r,a]=w.useState([[.5,-.3],[.2,.8]]),[n,c]=w.useState([.1,-.1]),[g,m]=w.useState([.6,.4]),[s,h]=w.useState(.05),[l,u]=w.useState([]),[f,b]=w.useState([]),[$,L]=w.useState(!1);w.useRef(null);const C=(N,T,F,A,R)=>{const P=N.map(B=>me(B.x,T,F,A,R).out),D=N.map(B=>B.y);return pe(P,D)},E=w.useCallback((N,T,F,A)=>{let R=N.map(_=>[..._]),P=[...T],D=[...F],B=A;const I=.3;for(const _ of ie){const{dW1:M,db1:H,dW2:de,db2:xe}=Be(_.x,_.y,R,P,D,B);R=R.map((ne,ae)=>ne.map((ce,Te)=>ce-I*M[ae][Te]/ie.length)),P=P.map((ne,ae)=>ne-I*H[ae]/ie.length),D=D.map((ne,ae)=>ne-I*de[ae]/ie.length),B=B-I*xe/ie.length}return{nW1:R,nb1:P,nW2:D,nb2:B}},[]),k=N=>{let T=r,F=n,A=g,R=s;const P=[...l],D=[...f];for(let B=0;B<N;B++){const{nW1:I,nb1:_,nW2:M,nb2:H}=E(T,F,A,R);P.push(C(ie,I,_,M,H)),D.push(C(_e,I,_,M,H)),T=I,F=_,A=M,R=H}a(T),c(F),m(A),h(R),u(P),b(D),p(B=>B+N)},S=()=>{a([[.5,-.3],[.2,.8]]),c([.1,-.1]),m([.6,.4]),h(.05),u([]),b([]),p(0)},j=C(ie,r,n,g,s),z=C(_e,r,n,g,s);return e.jsxs("div",{children:[e.jsxs(X,{glow:i.blue,style:{marginBottom:18},children:[e.jsx(V,{color:i.blue,children:"Training Error vs. Testing Error"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20},children:[e.jsxs("div",{children:[e.jsxs("p",{style:{color:i.text,fontSize:13,lineHeight:1.8,marginBottom:10},children:[e.jsx("strong",{style:{color:i.green},children:"Training error"})," measures performance on the data used to adjust weights. It should decrease as training continues."]}),e.jsxs("p",{style:{color:i.text,fontSize:13,lineHeight:1.8,marginBottom:10},children:[e.jsx("strong",{style:{color:i.amber},children:"Testing error"})," measures performance on data the network has ",e.jsx("em",{children:"never seen"}),". This is the true measure of whether the network learned general patterns, not just memorized the training data."]}),e.jsxs("p",{style:{color:i.dim,fontSize:13,lineHeight:1.75},children:["We split data: ",e.jsx(se,{color:i.green,children:"6 training samples"})," and ",e.jsx(se,{color:i.amber,children:"2 test samples"}),". We train only on the 6 samples, then evaluate on the 2 held-out samples."]})]}),e.jsx("div",{children:[{label:"Overfitting",color:i.red,desc:"Train error → low, Test error → rises. The network memorized training data noise rather than learning general patterns. Fix: more data, dropout, regularization, early stopping."},{label:"Underfitting",color:i.amber,desc:"Both errors remain high. The network is too simple or hasn't trained long enough. Fix: more layers, more neurons, more training epochs."},{label:"Good Fit",color:i.green,desc:"Both errors decrease together and stabilize. The network learned transferable patterns. Test error slightly above train error is normal and expected."}].map(({label:N,color:T,desc:F})=>e.jsxs("div",{style:{display:"flex",gap:10,marginBottom:10},children:[e.jsx("div",{style:{width:10,height:10,borderRadius:"50%",background:T,flexShrink:0,marginTop:4}}),e.jsxs("div",{children:[e.jsxs("span",{style:{color:T,fontSize:13,fontWeight:700},children:[N,": "]}),e.jsx("span",{style:{color:i.dim,fontSize:12},children:F})]})]},N))})]})]}),e.jsxs(X,{glow:i.green,style:{marginBottom:18},children:[e.jsx(V,{color:i.green,children:"Training Simulator — Watch Both Curves"}),e.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16,alignItems:"center"},children:[e.jsx(re,{onClick:()=>k(1),color:i.green,children:"▶ 1 Epoch"}),e.jsx(re,{onClick:()=>k(10),color:i.cyan,small:!0,children:"▶▶ 10 Epochs"}),e.jsx(re,{onClick:()=>k(50),color:i.amber,small:!0,children:"▶▶▶ 50 Epochs"}),e.jsx(re,{onClick:S,color:i.dim,small:!0,children:"↺ Reset"}),e.jsxs("span",{style:{fontFamily:i.mono,fontSize:12,color:i.dim},children:["Epoch: ",e.jsx("strong",{style:{color:i.text},children:t})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16},children:[e.jsxs("div",{children:[e.jsx(Ee,{label:"Train RMSE (6 samples)",value:j,max:.4,color:i.green}),e.jsx(Ee,{label:"Test RMSE  (2 samples)",value:z,max:.4,color:i.amber})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[{label:"Train RMSE",val:j,color:i.green},{label:"Test RMSE",val:z,color:i.amber},{label:"Gap (overfit indicator)",val:Math.abs(z-j),color:z-j>.05?i.red:i.green},{label:"Epochs",val:t,color:i.blue}].map(({label:N,val:T,color:F})=>e.jsxs("div",{style:{background:"#020a14",borderRadius:8,padding:10,border:`1px solid ${F}30`},children:[e.jsx("div",{style:{color:i.dim,fontSize:9,fontFamily:i.mono,marginBottom:3,letterSpacing:1},children:N}),e.jsx("div",{style:{color:F,fontFamily:i.mono,fontSize:17,fontWeight:700},children:typeof T=="number"&&T<100?v(T):T})]},N))})]}),l.length>1&&e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12},children:[e.jsx(je,{history:l,color:i.green,label:"TRAIN RMSE",height:90}),e.jsx(je,{history:f,color:i.amber,label:"TEST RMSE",height:90})]}),l.length===0&&e.jsx("div",{style:{background:"#020a14",borderRadius:8,padding:20,textAlign:"center",border:`1px solid ${i.border}`},children:e.jsx("div",{style:{color:i.dimmer,fontFamily:i.mono,fontSize:13},children:"Run epochs to see training progress"})})]}),e.jsxs(X,{glow:i.red,children:[e.jsx(V,{color:i.red,children:"Error Handling Strategies in Training"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14},children:[{title:"Gradient Clipping",color:i.red,desc:"If gradients grow too large (gradient explosion), cap them at a maximum value. This prevents weight updates from becoming catastrophically large, which would destroy all learned patterns.",formula:`if ‖∇‖ > clip_value:
  ∇ = ∇ × (clip_value / ‖∇‖)`},{title:"Early Stopping",color:i.amber,desc:"Monitor validation (test) loss. When it stops decreasing and starts increasing, stop training immediately. This is the most effective technique against overfitting.",formula:`if test_loss[epoch] > test_loss[epoch−k]
  for k consecutive epochs: STOP`},{title:"Learning Rate Scheduling",color:i.cyan,desc:"Start with a large learning rate for fast initial progress, then reduce it as training progresses. This allows fine-grained refinement near the optimal weights.",formula:`lr(t) = lr₀ × decay^(t/step)
OR: reduce when plateau detected`},{title:"Weight Initialization",color:i.green,desc:"Bad initial weights cause vanishing/exploding gradients from epoch 1. Xavier/He initialization sets weights proportional to layer size, ensuring healthy gradient magnitudes from the start.",formula:`Xavier: w ~ U(-√(6/(n_in+n_out)),
              +√(6/(n_in+n_out)))`}].map(({title:N,color:T,desc:F,formula:A})=>e.jsxs("div",{style:{background:"#020a14",borderRadius:10,padding:16,border:`1px solid ${T}30`},children:[e.jsx("div",{style:{color:T,fontFamily:i.mono,fontSize:12,fontWeight:700,marginBottom:8,letterSpacing:1},children:N}),e.jsx("p",{style:{color:i.dim,fontSize:12,lineHeight:1.7,marginBottom:10},children:F}),e.jsx("div",{style:{background:i.panel,borderRadius:6,padding:"8px 12px",fontFamily:i.mono,fontSize:11,color:T+"cc",whiteSpace:"pre-wrap"},children:A})]},N))})]})]})},$t=function(){const t={W1:[[.5,-.3],[.2,.8]],b1:[.1,-.1],W2:[.6,.4],b2:.05},[p,r]=w.useState(t),[a,n]=w.useState(.3),[c,g]=w.useState(0),[m,s]=w.useState({train:[],test:[],mse:[],rmse:[]}),[h,l]=w.useState(!1),u=w.useRef({W:t,lr:.3,running:!1});w.useEffect(()=>{u.current.W=p},[p]),w.useEffect(()=>{u.current.lr=a},[a]);const f=()=>{const{W:k,lr:S}=u.current;let{W1:j,b1:z,W2:N,b2:T}=k;for(const _ of oe){const{dW1:M,db1:H,dW2:de,db2:xe}=Be(_.x,_.y,j,z,N,T),ne=S/oe.length;j=j.map((ae,ce)=>ae.map((Te,De)=>Te-ne*M[ce][De])),z=z.map((ae,ce)=>ae-ne*H[ce]),N=N.map((ae,ce)=>ae-ne*de[ce]),T=T-ne*xe}const F={W1:j,b1:z,W2:N,b2:T},A=oe.map(_=>me(_.x,F.W1,F.b1,F.W2,F.b2).out),R=oe.map(_=>_.y),P=we(A,R),D=pe(A,R),B=ie.map(_=>me(_.x,F.W1,F.b1,F.W2,F.b2).out),I=_e.map(_=>me(_.x,F.W1,F.b1,F.W2,F.b2).out);u.current.W=F,r(F),g(_=>_+1),s(_=>({train:[..._.train.slice(-79),pe(B,ie.map(M=>M.y))],test:[..._.test.slice(-79),pe(I,_e.map(M=>M.y))],mse:[..._.mse.slice(-79),P],rmse:[..._.rmse.slice(-79),D]}))},b=()=>{if(u.current.running){u.current.running=!1,l(!1);return}u.current.running=!0,l(!0);const k=()=>{u.current.running&&(f(),setTimeout(k,50))};k()},$=()=>{u.current.running=!1,l(!1),r(t),u.current.W=t,g(0),s({train:[],test:[],mse:[],rmse:[]})},L=oe.map(k=>me(k.x,p.W1,p.b1,p.W2,p.b2).out),C=we(L,oe.map(k=>k.y)),E=pe(L,oe.map(k=>k.y));return e.jsxs("div",{children:[e.jsxs(X,{glow:i.amber,style:{marginBottom:18},children:[e.jsx(V,{children:"Full 8-Sample Training Lab"}),e.jsx("div",{style:{display:"flex",gap:10,flexWrap:"wrap",alignItems:"center",marginBottom:16},children:e.jsx(Ne,{label:"Learning Rate",value:a,min:.01,max:2,step:.01,onChange:n,color:i.amber})}),e.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16},children:[e.jsx(re,{onClick:f,color:i.green,small:!0,children:"▶ 1 Epoch"}),e.jsx(re,{onClick:()=>{for(let k=0;k<10;k++)f()},color:i.cyan,small:!0,children:"▶▶ 10"}),e.jsx(re,{onClick:b,color:h?i.red:i.amber,children:h?"⏹ Stop":"▶▶▶ Auto Train"}),e.jsx(re,{onClick:$,color:i.dim,small:!0,children:"↺ Reset"}),e.jsxs("span",{style:{fontFamily:i.mono,fontSize:12,color:i.dim},children:["Epoch ",e.jsx("strong",{style:{color:i.text},children:c})]})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10,marginBottom:16},children:[{label:"MSE",val:C,color:i.amber},{label:"RMSE",val:E,color:i.red},{label:"Train RMSE",val:m.train.slice(-1)[0]||0,color:i.green},{label:"Test RMSE",val:m.test.slice(-1)[0]||0,color:i.cyan}].map(({label:k,val:S,color:j})=>e.jsxs("div",{style:{background:"#020a14",borderRadius:8,padding:12,border:`1px solid ${j}40`,textAlign:"center"},children:[e.jsx("div",{style:{color:i.dim,fontSize:9,fontFamily:i.mono,letterSpacing:1,marginBottom:4},children:k}),e.jsx("div",{style:{color:j,fontFamily:i.mono,fontSize:20,fontWeight:700},children:v(S)})]},k))}),m.rmse.length>1?e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16},children:[e.jsx(je,{history:m.mse,color:i.amber,label:"MSE over epochs",height:100}),e.jsx(je,{history:m.rmse,color:i.red,label:"RMSE over epochs",height:100})]}):e.jsx("div",{style:{background:"#020a14",borderRadius:8,padding:20,textAlign:"center",border:`1px solid ${i.border}`,marginBottom:16},children:e.jsx("div",{style:{color:i.dimmer,fontFamily:i.mono,fontSize:13},children:"Train the network to see MSE and RMSE curves"})})]}),e.jsxs(X,{glow:i.cyan,children:[e.jsx(V,{color:i.cyan,children:"Prediction Table — All 8 Samples"}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontFamily:i.mono,fontSize:12},children:[e.jsx("thead",{children:e.jsx("tr",{children:["#","x₁","x₂","Target y","Pred ŷ","Error","Sq. Err","Split"].map(k=>e.jsx("th",{style:{padding:"8px 10px",color:i.dimmer,borderBottom:`1px solid ${i.border}`,textAlign:"left",fontSize:10,letterSpacing:1},children:k},k))})}),e.jsx("tbody",{children:oe.map((k,S)=>{const j=L[S],z=j-k.y,N=S<6;return e.jsxs("tr",{style:{background:S%2===0?"#050c1499":"transparent"},children:[e.jsx("td",{style:{padding:"7px 10px",color:i.dimmer},children:S+1}),e.jsx("td",{style:{padding:"7px 10px",color:i.blue},children:k.x[0]}),e.jsx("td",{style:{padding:"7px 10px",color:i.blue},children:k.x[1]}),e.jsx("td",{style:{padding:"7px 10px",color:i.green},children:O(k.y)}),e.jsx("td",{style:{padding:"7px 10px",color:i.cyan},children:v(j)}),e.jsx("td",{style:{padding:"7px 10px",color:Math.abs(z)<.05?i.green:Math.abs(z)<.1?i.amber:i.red},children:v(z)}),e.jsx("td",{style:{padding:"7px 10px",color:i.amber},children:v(z*z)}),e.jsx("td",{style:{padding:"7px 10px"},children:e.jsx("span",{style:{background:N?i.green+"20":i.amber+"20",color:N?i.green:i.amber,border:`1px solid ${N?i.green:i.amber}50`,borderRadius:4,padding:"2px 8px",fontSize:10},children:N?"TRAIN":"TEST"})})]},S)})})]})}),e.jsx(Q,{color:i.cyan,children:`MSE  = (${oe.map((k,S)=>O(Math.pow(L[S]-oe[S].y,2))).join(" + ")}) / 8
     = ${v(C)}

RMSE = √${v(C)} = ${v(E)}`})]})]})},Ae=[{id:"error",label:"01 · Error Basics",emoji:"📡",color:i.amber,Component:Lt},{id:"metrics",label:"02 · MSE & RMSE",emoji:"📐",color:i.red,Component:Ct},{id:"forward",label:"03 · Forward Pass",emoji:"🔬",color:i.blue,Component:vt},{id:"backprop",label:"04 · Backprop & Weights",emoji:"⚙️",color:i.green,Component:wt},{id:"traintest",label:"05 · Train vs. Test",emoji:"🧪",color:i.cyan,Component:Wt},{id:"lab",label:"06 · Full Training Lab",emoji:"🚀",color:i.amber,Component:$t}],Rt=function(){const[t,p]=w.useState("error"),r=Ae.find(c=>c.id===t),{Component:a,color:n}=r;return e.jsxs("div",{style:{minHeight:"100vh",background:i.bg,color:i.text,fontFamily:i.sans},children:[e.jsx("div",{style:{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,backgroundImage:"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)"}}),e.jsx("div",{style:{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,background:`radial-gradient(ellipse 70% 50% at 50% 0%, ${n}12, transparent 65%)`}}),e.jsxs("div",{style:{position:"relative",zIndex:1,maxWidth:1e3,margin:"0 auto",padding:"28px 16px"},children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:32},children:[e.jsx("div",{style:{fontFamily:i.mono,fontSize:10,letterSpacing:8,color:i.dimmer,marginBottom:8},children:"NEURAL NETWORK ERROR ANALYSIS SYSTEM"}),e.jsx("h1",{style:{margin:0,fontFamily:i.mono,fontWeight:900,letterSpacing:-1,fontSize:"clamp(22px, 4.5vw, 38px)",background:`linear-gradient(90deg, ${i.amber}, ${i.red}, ${i.cyan})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"},children:"Error, Weights & Gradient Descent"}),e.jsx("p",{style:{color:i.dimmer,fontSize:13,marginTop:8,fontFamily:i.mono},children:"MSE · RMSE · Backpropagation · Weight Adjustment · Training vs. Testing"})]}),e.jsx("div",{style:{display:"flex",gap:4,flexWrap:"wrap",justifyContent:"center",marginBottom:28,background:i.panel,borderRadius:14,padding:6,border:`1px solid ${i.border}`},children:Ae.map(c=>e.jsxs("button",{onClick:()=>p(c.id),style:{padding:"7px 14px",borderRadius:10,border:`1px solid ${t===c.id?c.color:"transparent"}`,background:t===c.id?c.color+"18":"transparent",color:t===c.id?c.color:i.dimmer,fontFamily:i.mono,fontSize:11,cursor:"pointer",fontWeight:t===c.id?700:400,transition:"all 0.15s",boxShadow:t===c.id?`0 0 14px ${c.color}22`:"none"},children:[c.emoji," ",c.label]},c.id))}),e.jsx("div",{style:{background:i.panel+"cc",borderRadius:18,border:`1px solid ${n}25`,padding:"26px 22px",boxShadow:`0 0 50px ${n}15`},children:e.jsx(a,{},t)}),e.jsx("div",{style:{textAlign:"center",marginTop:20,color:i.dimmer,fontFamily:i.mono,fontSize:10,letterSpacing:2},children:"NEURAL NETWORK ERROR HANDLING LABORATORY · ALL COMPUTATIONS IN-BROWSER"})]})]})},Et=function(){const[t,p]=w.useState("introduction"),[r,a]=w.useState(0),[n,c]=w.useState(0),[g,m]=w.useState(null),s=[{id:"perceptron",name:"Perceptron",year:"1957",inventor:"Frank Rosenblatt",level:"Beginner",category:"Feedforward",description:"The simplest neural network - a single neuron for binary classification.",theory:{keyIdea:"Learn a linear decision boundary to separate two classes",biologicalInspiration:"Modeled after how biological neurons fire when stimulated",howItWorks:"Takes inputs, multiplies by weights, adds bias, applies step function",limitations:["Can only learn linearly separable patterns","Cannot solve XOR problem","Single layer limits complexity"]},architecture:{components:["Input layer: n features (x₁, x₂, ..., xₙ)","Weights: n weights (w₁, w₂, ..., wₙ)","Bias: single bias term (b)","Activation: Step function or Sign function","Output: Binary prediction (0/1 or +1/-1)"],parameters:"n weights + 1 bias = n+1 total parameters"},mathematics:{weightedSum:{formula:"z = w₁x₁ + w₂x₂ + ... + wₙxₙ + b",vector:"z = w·x + b",explanation:"Compute dot product of weights and inputs, add bias"},activation:{step:"f(z) = 1 if z ≥ 0, else 0",sign:"f(z) = +1 if z ≥ 0, else -1",explanation:"Threshold function produces binary output"},learning:{rule:"wᵢ = wᵢ + η(target - output)xᵢ",bias:"b = b + η(target - output)",explanation:"η is learning rate, adjust weights proportional to error"},numericalExample:{inputs:"x = [0.5, 0.3]",weights:"w = [0.4, 0.7]",bias:"b = -0.2",calculation:"z = 0.4×0.5 + 0.7×0.3 - 0.2 = 0.2 + 0.21 - 0.2 = 0.21",output:"f(0.21) = 1 (positive class)",interpretation:"Since z > 0, perceptron predicts class 1"}},visualDirection:{neuronDiagram:["Draw a large circle in center (the neuron)","Draw 2-3 small circles on left (inputs x₁, x₂, x₃)","Draw arrows from inputs to neuron, label with weights w₁, w₂, w₃",'Draw small circle above neuron labeled "bias b" with arrow down',"Inside neuron, write Σ symbol (summation)",'Draw arrow out of neuron to right, label "activation function"',"Draw small box on right with output y"],geometricView:["Draw 2D coordinate plane (x₁ horizontal, x₂ vertical)","Plot several + points in one region, - points in another","Draw decision boundary line: w₁x₁ + w₂x₂ + b = 0",'Shade one side as "Class 1", other as "Class 0"',"Show weight vector w perpendicular to decision line"],learningProcess:["Frame 1: Random initial weights, wrong decision boundary","Frame 2: Misclassified point highlighted in red","Frame 3: Weights adjusted, boundary rotates slightly","Frame 4: After many iterations, boundary separates classes"]},stepByStep:[{step:"Initialize",description:"Set weights and bias to small random values",code:"w = [0.1, -0.3], b = 0.2",visual:"Show random decision line on plot"},{step:"Forward Pass",description:"For input x, compute z = w·x + b, then output = f(z)",code:`z = w[0]*x[0] + w[1]*x[1] + b
output = 1 if z >= 0 else 0`,visual:"Show input point, calculation, and prediction"},{step:"Compute Error",description:"Compare prediction to true label",code:"error = target - output",visual:"If wrong, highlight point in red"},{step:"Update Weights",description:"Adjust weights based on error and learning rate",code:"w[i] = w[i] + learning_rate * error * x[i]",visual:"Show decision boundary rotating"},{step:"Repeat",description:"Continue for all training samples until convergence",code:`for epoch in range(max_epochs):
    for x, y in data:
        train_step(x, y)`,visual:"Show boundary stabilizing"}],practicalExample:{problem:"AND gate classification",data:"Input pairs (0,0), (0,1), (1,0), (1,1) with outputs 0, 0, 0, 1",solution:"Perceptron learns weights w=[0.5, 0.5], b=-0.7 to separate classes",verification:"Test: (1,1) → 0.5+0.5-0.7=0.3>0 → output 1 ✓"}},{id:"mlp",name:"Multilayer Perceptron (MLP)",year:"1986",inventor:"Rumelhart, Hinton, Williams",level:"Beginner",category:"Feedforward",description:"Multiple layers of neurons with non-linear activations, trained via backpropagation.",theory:{keyIdea:"Hidden layers learn hierarchical representations of data",breakthrough:"Backpropagation algorithm enables training deep networks",howItWorks:"Each layer transforms input, final layer makes prediction",capabilities:["Learn non-linear patterns","Universal function approximation","Solve XOR and complex problems"]},architecture:{layers:["Input layer: n input features","Hidden layer(s): h₁, h₂, ... neurons with activation","Output layer: m outputs with appropriate activation","Fully connected: every neuron connects to all in next layer"],typical:"Input(784) → Hidden(128,ReLU) → Hidden(64,ReLU) → Output(10,Softmax)",parameters:"For each layer: (n_in × n_out) + n_out"},mathematics:{forward:{layer1:"h₁ = σ₁(W₁x + b₁)",layer2:"h₂ = σ₂(W₂h₁ + b₂)",output:"y = σₒᵤₜ(Wₒᵤₜh₂ + bₒᵤₜ)",general:"aˡ = σ(Wˡaˡ⁻¹ + bˡ)"},activations:{relu:"f(x) = max(0, x) - most common for hidden layers",sigmoid:"f(x) = 1/(1+e⁻ˣ) - for binary classification output",tanh:"f(x) = (eˣ-e⁻ˣ)/(eˣ+e⁻ˣ) - alternative for hidden",softmax:"f(xᵢ) = eˣⁱ/Σⱼeˣʲ - for multiclass output"},backpropagation:{outputError:"δᴸ = (y - t) ⊙ σ'(zᴸ)",hiddenError:"δˡ = (Wˡ⁺¹)ᵀδˡ⁺¹ ⊙ σ'(zˡ)",weightGradient:"∂L/∂Wˡ = δˡ(aˡ⁻¹)ᵀ",update:"W = W - η∂L/∂W"},example:{architecture:"Input(2) → Hidden(3) → Output(1)",forward:"x=[1,2] → h=ReLU([0.5,1.2,-0.3]) → y=Sigmoid(0.8)",dimensions:"W₁: 3×2, b₁: 3×1, W₂: 1×3, b₂: 1×1",totalParams:"(2×3+3) + (3×1+1) = 13 parameters"}},visualDirection:{networkDiagram:["Draw 3 columns of circles: Input(2), Hidden(3), Output(1)","Connect every neuron in column 1 to every in column 2","Connect every neuron in column 2 to output",'Label connections as "fully connected"',"Show activation function inside each hidden/output neuron"],dataFlow:["Show input values [2, 3] entering left","Show weighted sums being computed in hidden layer","Show activation functions transforming values","Show final output 0.87 exiting right","Use different colors for each layer"],backpropagation:["Draw same network but arrows pointing LEFT","Show error starting at output (red)","Show error propagating backward through layers",'Label as "gradient flow"',"Show weights being updated (blue arrows)"]},stepByStep:[{step:"Initialization",description:"Initialize all weights with small random values (e.g., Xavier or He initialization)",code:`W1 = np.random.randn(3,2) * 0.01
b1 = np.zeros((3,1))`,visual:"Show network with random weights labeled"},{step:"Forward Propagation",description:"Pass input through network layer by layer",code:`z1 = W1 @ x + b1
a1 = relu(z1)
z2 = W2 @ a1 + b2
a2 = sigmoid(z2)`,visual:"Show values flowing forward with calculations"},{step:"Compute Loss",description:"Calculate error between prediction and target",code:"loss = -y*log(a2) - (1-y)*log(1-a2)",visual:"Show prediction vs target, compute difference"},{step:"Backward Propagation",description:"Calculate gradients from output back to input",code:`dz2 = a2 - y
dW2 = dz2 @ a1.T
dz1 = W2.T @ dz2 * relu_derivative(z1)`,visual:"Show gradients flowing backward in red"},{step:"Update Weights",description:"Adjust weights using gradient descent",code:`W2 = W2 - learning_rate * dW2
W1 = W1 - learning_rate * dW1`,visual:"Show weights changing slightly"},{step:"Iterate",description:"Repeat forward-backward-update for all data, multiple epochs",code:`for epoch in range(100):
    for x, y in data:
        forward_backward_update()`,visual:"Show loss decreasing over time graph"}],practicalExample:{problem:"XOR problem (not linearly separable)",data:"(0,0)→0, (0,1)→1, (1,0)→1, (1,1)→0",network:"Input(2) → Hidden(2,sigmoid) → Output(1,sigmoid)",solution:"Hidden layer creates non-linear feature space where XOR is separable",visualization:"Show decision boundary as curve separating XOR patterns"}},{id:"rbfn",name:"Radial Basis Function Network",year:"1988",inventor:"Broomhead & Lowe",level:"Intermediate",category:"Feedforward",description:"Network using RBF activations that measure distance from center points.",theory:{keyIdea:"Neurons activate based on distance from learned centers",advantage:"Fast training (closed-form solution for output layer)",howItWorks:"Hidden layer uses Gaussian RBFs, output is linear combination",bestFor:"Function approximation, interpolation problems"},architecture:{structure:["Input layer: n-dimensional input x","Hidden layer: m RBF neurons with centers cᵢ and widths σᵢ","Output layer: Linear combination of RBF outputs","Not fully connected - each RBF responds to local region"],training:"1) K-means for centers, 2) Heuristic for widths, 3) Linear regression for output weights"},mathematics:{rbfFunction:{gaussian:"φᵢ(x) = exp(-||x - cᵢ||² / (2σᵢ²))",interpretation:"Neuron i activates strongly when x is close to center cᵢ",example:"x=[2,2], c=[1,1], σ=1 → φ=exp(-2/2)=exp(-1)≈0.37"},output:{formula:"y(x) = Σᵢ wᵢφᵢ(x) + b",linear:"Output is linear combination of RBF activations",weights:"Can be solved analytically: w = (Φᵀ Φ)⁻¹ Φᵀ y"},training:{step1:"Find centers: cᵢ using K-means clustering on training data",step2:"Set widths: σᵢ = dₘₐₓ/√(2m) where dₘₐₓ is max distance between centers",step3:"Solve for weights: Least squares on output layer"}},visualDirection:{architecture:["Draw input layer (2 neurons for 2D example)","Draw hidden RBF layer (5 neurons)","Draw Gaussian curve above each RBF neuron","Label centers c₁, c₂, c₃, c₄, c₅","Draw output layer (1 neuron)","Connect RBF outputs to final output with weights w"],responseMap:["Draw 2D input space as plane","Plot center points as stars","Draw circular/elliptical regions around each center","Use heat map colors: bright near center, fading outward","Show overlapping regions where RBFs interact"],training:["Frame 1: Random data points scattered in space","Frame 2: K-means identifies 5 cluster centers","Frame 3: RBF neurons placed at centers with width circles","Frame 4: Output weights learned via linear regression"]},stepByStep:[{step:"Prepare Data",description:"Collect training samples (x, y)",code:`X_train = [[x1,x2], ...]
y_train = [y1, y2, ...]`,visual:"Show scatter plot of training data"},{step:"Find Centers",description:"Run K-means clustering on input data",code:`from sklearn.cluster import KMeans
centers = KMeans(n_clusters=m).fit(X).cluster_centers_`,visual:"Show cluster centers marked with stars"},{step:"Calculate Widths",description:"Set width based on center spacing",code:`dmax = max_distance_between_centers(centers)
widths = dmax / sqrt(2*m)`,visual:"Show circles around centers representing widths"},{step:"Compute RBF Activations",description:"For each training point, calculate φᵢ(x)",code:"phi = exp(-||x - center||^2 / (2*width^2))",visual:"Show activation heat map"},{step:"Solve for Weights",description:"Use least squares to find output weights",code:`from numpy.linalg import lstsq
weights = lstsq(Phi, y_train)[0]`,visual:"Show weight values computed"},{step:"Prediction",description:"For new x, compute RBF activations then output",code:`phi_new = compute_rbf(x_new, centers, widths)
y_pred = weights @ phi_new`,visual:"Show prediction as sum of weighted RBFs"}],practicalExample:{problem:"1D function approximation: f(x) = sin(x)",data:"20 points sampled from sin(x) in [0, 2π]",network:"5 RBF neurons with Gaussian activation",result:"RBFN learns smooth approximation of sine wave",visualization:"Plot: true sine (blue), RBF approximation (red dashed), RBF centers (green dots)"}},{id:"autoencoder",name:"Basic Autoencoder",year:"1980s",inventor:"Hinton & others",level:"Beginner",category:"Unsupervised",description:"Neural network that learns to compress and reconstruct data.",theory:{keyIdea:"Learn compressed representation by forcing reconstruction",unsupervised:"Trained without labels - input is also the target",bottleneck:"Middle layer is narrower, forcing compression",applications:["Dimensionality reduction","Denoising","Anomaly detection","Feature learning"]},architecture:{encoder:"Input → Hidden₁ → ... → Latent (bottleneck)",decoder:"Latent → Hidden₁' → ... → Reconstruction",symmetric:"Often decoder mirrors encoder structure",example:"784 → 256 → 128 → 64 → 128 → 256 → 784"},mathematics:{encoder:{formula:"z = f_encoder(x) = σ(W_encoder · x + b_encoder)",purpose:"Compress input to low-dimensional latent code",example:"x: 784-dim → z: 64-dim"},decoder:{formula:"x̂ = f_decoder(z) = σ(W_decoder · z + b_decoder)",purpose:"Reconstruct input from latent code",example:"z: 64-dim → x̂: 784-dim"},loss:{mse:"L = (1/n) Σᵢ ||xᵢ - x̂ᵢ||²",bce:"L = -Σᵢ xᵢlog(x̂ᵢ) + (1-xᵢ)log(1-x̂ᵢ)",purpose:"Minimize reconstruction error"},training:{objective:"min_W L(x, decoder(encoder(x)))",method:"Standard backpropagation and gradient descent",note:"Input = target, so purely unsupervised"}},visualDirection:{architecture:["Draw hourglass/bowtie shape","Left half (encoder): Wide → Narrow",'Narrowest point in middle: "Latent code z (64 dims)"',"Right half (decoder): Narrow → Wide",'Label left as "Compression", right as "Reconstruction"',"Show symmetric layer sizes: 784-256-128-64-128-256-784"],dataFlow:['Input: Show digit "7" image',"Encoder: Show image getting compressed","Latent: Show 64 numbers in middle","Decoder: Show expanding back to image",'Output: Show reconstructed "7"',"Compare input vs output side-by-side"],latentSpace:["Plot 2D projection of latent codes","Color points by digit class (0-9)","Show clusters: similar digits cluster together","Demonstrate learned meaningful representation"]},stepByStep:[{step:"Define Architecture",description:"Create encoder and decoder networks",code:`encoder = [Dense(256), Dense(128), Dense(64)]
decoder = [Dense(128), Dense(256), Dense(784)]`,visual:"Show layer dimensions decreasing then increasing"},{step:"Forward Pass (Encode)",description:"Compress input to latent representation",code:"z = encoder(x)  # 784 → 64 dimensions",visual:"Show image being compressed to 64 numbers"},{step:"Forward Pass (Decode)",description:"Reconstruct from latent code",code:"x_reconstructed = decoder(z)  # 64 → 784",visual:"Show 64 numbers expanding to reconstructed image"},{step:"Compute Loss",description:"Measure reconstruction quality",code:"loss = mean_squared_error(x_original, x_reconstructed)",visual:"Show difference image (x - x̂) highlighting errors"},{step:"Backpropagation",description:"Compute gradients through entire network",code:"loss.backward()  # Gradients for encoder & decoder",visual:"Show gradient flowing back through bowtie"},{step:"Update Weights",description:"Improve reconstruction via gradient descent",code:"optimizer.step()  # Update all weights",visual:"Show reconstruction quality improving"}],practicalExample:{problem:"Compress MNIST digit images",input:"28×28 = 784 pixels per image",latent:"64-dimensional compressed representation",compression:"784 → 64 is 12.25× compression",result:"Reconstruct images with minimal loss",extension:"Latent codes can be used for classification or visualization"}},{id:"vae",name:"Variational Autoencoder (VAE)",year:"2013",inventor:"Kingma & Welling",level:"Advanced",category:"Generative",description:"Probabilistic autoencoder that learns continuous latent space for generation.",theory:{keyIdea:"Learn distribution over latent space, not just point encodings",generative:"Can sample from latent space to generate new data",probabilistic:"Models p(z|x) and p(x|z) as distributions",breakthrough:"Reparameterization trick enables gradient-based training"},architecture:{encoder:"q(z|x) - outputs μ(x) and σ(x) for latent distribution",sampling:"z = μ + σ ⊙ ε, where ε ~ N(0,1)",decoder:"p(x|z) - reconstructs x from sampled z",latent:"Learned as Gaussian distributions, not fixed points"},mathematics:{objective:{elbo:"ELBO = E_q[log p(x|z)] - KL(q(z|x) || p(z))",reconstruction:"E_q[log p(x|z)] ≈ -||x - x̂||² (reconstruction loss)",regularization:"KL(q(z|x) || p(z)) keeps latent distribution close to N(0,1)",maximize:"Maximize ELBO = minimize -ELBO"},reparameterization:{problem:"Cannot backprop through stochastic sampling",solution:"z = μ + σ ⊙ ε where ε ~ N(0,1)",gradient:"Now can compute ∂L/∂μ and ∂L/∂σ"},kl:{formula:"KL = -½ Σ(1 + log(σ²) - μ² - σ²)",interpretation:"Penalty for deviating from standard normal"},generation:{sample:"z ~ N(0,1)",decode:"x_new = decoder(z)",result:"Novel generated sample"}},visualDirection:{architecture:["Input → Encoder → [μ network] → μ","                  [σ network] → σ","Sample: z = μ + σ⊙ε (show ε ~ N(0,1) as input)","z → Decoder → Reconstructed output",'Show the "reparameterization trick" box clearly'],latentSpace:["Draw 2D latent space as smooth manifold","Show regions corresponding to different data types","Demonstrate smooth interpolation between points","Sample random z, show decoded images","Contrast with regular AE: discrete clusters vs continuous"],generation:["Show grid of random z samples from N(0,1)","For each z, show decoded image","Demonstrate variety of generated samples","Show interpolation: z₁ → intermediate → z₂ produces morph"]},stepByStep:[{step:"Encode to Distribution",description:"Encoder outputs mean μ and std σ",code:`mu, log_var = encoder(x)
sigma = exp(0.5 * log_var)`,visual:"Show input mapping to μ and σ vectors"},{step:"Reparameterization",description:"Sample z using reparameterization trick",code:`epsilon = torch.randn_like(sigma)
z = mu + sigma * epsilon`,visual:"Show sampling process: μ + σ×ε"},{step:"Decode",description:"Reconstruct from sampled latent code",code:"x_reconstructed = decoder(z)",visual:"Show z being decoded to image"},{step:"Reconstruction Loss",description:"Measure how well we reconstructed",code:"recon_loss = F.mse_loss(x_reconstructed, x)",visual:"Show comparison between input and output"},{step:"KL Divergence",description:"Regularize latent distribution",code:"kl_loss = -0.5 * sum(1 + log_var - mu**2 - exp(log_var))",visual:"Show distribution q(z|x) vs standard normal p(z)"},{step:"Total Loss & Update",description:"Combine losses and update weights",code:`loss = recon_loss + beta * kl_loss
loss.backward()`,visual:"Show both loss components, total loss decreasing"}],practicalExample:{problem:"Generate new face images",training:"Train on CelebA dataset",latent:"128-dimensional continuous space",generation:"Sample z ~ N(0,1), decode to 64×64 face",interpolation:"Smoothly morph between two faces by interpolating latent codes",application:"Image generation, style transfer, data augmentation"}}],h=[{id:"perceptron-code",title:"Perceptron - Binary Classification",architecture:"Perceptron",difficulty:"Beginner",problem:"Classify 2D points into two classes (AND gate logic)",description:"Implement a perceptron from scratch to learn the AND logical operation. This demonstrates basic supervised learning with a single neuron.",dataset:{description:"AND gate truth table",inputs:"[[0,0], [0,1], [1,0], [1,1]]",outputs:"[0, 0, 0, 1]",visualization:"Points (0,0), (0,1), (1,0) in class 0; point (1,1) in class 1"},code:`import numpy as np
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
           perceptron.bias/perceptron.weights[1] if perceptron.weights[1] != 0 else 0))`,explanation:[{section:"Class Definition",code:"class Perceptron:",explanation:"We define a Perceptron class that encapsulates the neuron's behavior including weights, bias, and learning algorithm."},{section:"Initialization",code:"__init__(self, learning_rate=0.1, n_iterations=100)",explanation:"Constructor sets learning rate (how big the weight updates are) and number of training iterations. Larger learning rate = faster but less stable training."},{section:"Activation Function",code:"return np.where(z >= 0, 1, 0)",explanation:"Step function: outputs 1 if weighted sum is non-negative, 0 otherwise. This creates binary classification."},{section:"Prediction",code:"z = np.dot(X, self.weights) + self.bias",explanation:"Compute weighted sum: z = w₁x₁ + w₂x₂ + b. Then apply activation to get prediction (0 or 1)."},{section:"Weight Initialization",code:"self.weights = np.zeros(n_features)",explanation:"Start with zero weights. Could also use small random values. Bias also starts at zero."},{section:"Training Loop",code:"for epoch in range(self.n_iterations):",explanation:"Iterate through entire dataset multiple times. Each pass is called an epoch."},{section:"Perceptron Learning Rule",code:"self.weights += self.lr * error * xi",explanation:"If prediction is wrong, adjust weights: Δw = η(y_true - y_pred)x. This moves decision boundary toward correct classification."},{section:"Error Tracking",code:"self.errors.append(errors)",explanation:"Track number of misclassifications per epoch. Should decrease to zero for linearly separable data."},{section:"Dataset",code:"X = np.array([[0,0], [0,1], [1,0], [1,1]])",explanation:"AND gate truth table: only (1,1) produces output 1. This is linearly separable."},{section:"Decision Boundary",code:"x2 = -(w1*x1 + b) / w2",explanation:"The line w₁x₁ + w₂x₂ + b = 0 separates the two classes. We plot this to visualize what perceptron learned."}],expectedOutput:`Training Perceptron on AND gate...
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

Accuracy: 100%`,runInstructions:["Save code as perceptron_demo.py","Run: python perceptron_demo.py","View generated plot showing decision boundary","Observe how errors decrease to zero","Try changing learning_rate or testing with XOR (will fail!)"]},{id:"mlp-mnist",title:"MLP - MNIST Digit Classification",architecture:"Multilayer Perceptron",difficulty:"Intermediate",problem:"Classify handwritten digits (0-9) using real MNIST dataset",description:"Build a deep MLP using PyTorch to classify MNIST digits. Demonstrates data loading, network architecture, training loop, and evaluation.",dataset:{description:"MNIST handwritten digits",samples:"60,000 training + 10,000 test images",imageSize:"28×28 grayscale (784 pixels)",classes:"10 classes (digits 0-9)"},code:`import torch
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
    print(f"\\nFinal Test Accuracy: {final_accuracy:.2f}%")`,explanation:[{section:"Network Architecture",code:"nn.Linear(784, 512)",explanation:"Fully connected layer: 784 inputs → 512 outputs. Each output neuron connects to all 784 inputs. Parameters: 784×512 weights + 512 biases = 401,920 parameters."},{section:"ReLU Activation",code:"nn.ReLU()",explanation:"ReLU(x) = max(0, x). Introduces non-linearity, allowing network to learn complex patterns. Much faster than sigmoid/tanh."},{section:"Dropout",code:"nn.Dropout(0.2)",explanation:"Randomly zeros 20% of neurons during training. Prevents overfitting by forcing network not to rely on specific neurons."},{section:"Flattening",code:"x.view(x.size(0), -1)",explanation:"Reshape images from (batch, 1, 28, 28) to (batch, 784). MLP needs 1D input vectors."},{section:"Data Normalization",code:"transforms.Normalize((0.1307,), (0.3081,))",explanation:"Normalize pixels: (pixel - 0.1307) / 0.3081. Centers data around 0, speeds up training."},{section:"CrossEntropyLoss",code:"criterion = nn.CrossEntropyLoss()",explanation:"Combines LogSoftmax and NLLLoss. Perfect for multi-class classification. Measures how far predictions are from true labels."},{section:"Adam Optimizer",code:"optim.Adam(model.parameters(), lr=0.001)",explanation:"Adaptive learning rate optimizer. Adjusts learning rate per parameter. Generally better than SGD for deep networks."},{section:"Training Mode",code:"model.train()",explanation:"Enables dropout and batch normalization training behavior. Must call before training loop."},{section:"Zero Gradients",code:"optimizer.zero_grad()",explanation:"Clear gradients from previous iteration. PyTorch accumulates gradients by default, so must zero them."},{section:"Backward Pass",code:"loss.backward()",explanation:"Compute gradients via backpropagation. Automatically calculates ∂Loss/∂weight for all parameters."},{section:"Weight Update",code:"optimizer.step()",explanation:"Update all weights using computed gradients: w = w - lr × ∂Loss/∂w."},{section:"Evaluation Mode",code:"model.eval()",explanation:"Disables dropout and batch norm training mode. Use for testing/inference."},{section:"No Gradient",code:"with torch.no_grad():",explanation:"Disable gradient computation during evaluation. Saves memory and speeds up inference."},{section:"Get Predictions",code:"pred = output.argmax(dim=1)",explanation:"For each sample, find class with highest score. Argmax returns index of maximum value."}],expectedOutput:`Using device: cuda

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

Final Test Accuracy: 98.24%`,runInstructions:["Install PyTorch: pip install torch torchvision","Save code as mlp_mnist.py","Run: python mlp_mnist.py","First run downloads MNIST (~10MB)","Training takes ~3-5 minutes on CPU, ~30s on GPU","View results plot showing learning curves and sample predictions",'Saved model can be loaded later: model.load_state_dict(torch.load("mlp_mnist.pth"))']},{id:"autoencoder-code",title:"Autoencoder - Image Reconstruction & Compression",architecture:"Basic Autoencoder",difficulty:"Intermediate",problem:"Learn compressed representation of MNIST digits and reconstruct them",description:"Build an autoencoder that compresses 784-dimensional images to 32 dimensions and reconstructs them. Demonstrates unsupervised learning and dimensionality reduction.",code:`import torch
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
    model = main()`,explanation:[{section:"Encoder Structure",code:"nn.Linear(784, 256) → ReLU → Linear(256, 128) → ReLU → Linear(128, 32)",explanation:"Progressively compress input: 784 → 256 → 128 → 32. Each layer reduces dimensionality, forcing network to learn compact representation."},{section:"Decoder Structure",code:"Linear(32, 128) → ReLU → Linear(128, 256) → ReLU → Linear(256, 784) → Sigmoid",explanation:"Mirror of encoder. Expands compressed code back to original dimensions. Sigmoid ensures output in [0,1] range."},{section:"Bottleneck",code:"latent_dim=32",explanation:"Smallest layer (32 neurons) forces compression. Cannot memorize inputs - must learn meaningful features."},{section:"MSE Loss",code:"criterion = nn.MSELoss()",explanation:"Mean Squared Error: (1/n)Σ(original - reconstructed)². Measures pixel-wise reconstruction quality."},{section:"Unsupervised Learning",code:"for data, _ in train_loader:",explanation:"Ignore labels (underscore). Input IS the target. Network learns structure of data without labels."},{section:"Encode Method",code:"def encode(self, x): return self.encoder(x)",explanation:"Get compressed representation only. Useful for visualization or using as features for other tasks."},{section:"Decode Method",code:"def decode(self, z): return self.decoder(z)",explanation:"Reconstruct from latent code. Can decode arbitrary latent codes (not necessarily from real images)."},{section:"Compression Ratio",code:"784/32 = 24.5x",explanation:"Original: 784 numbers. Compressed: 32 numbers. ~96% reduction in size while preserving visual information."},{section:"Latent Space Visualization",code:"pca.fit_transform(latent_codes)",explanation:"Project 32D latent codes to 2D using PCA. Shows how network organizes different digits in latent space."}],expectedOutput:`Using device: cuda

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
Latent code: [0.23, -1.45, 0.89, ...]`,runInstructions:["Install requirements: pip install torch torchvision scikit-learn","Save as autoencoder_demo.py","Run: python autoencoder_demo.py","Training takes ~5 minutes on CPU, ~1 minute on GPU","Check generated visualizations showing:","  1. Training curves (loss decreasing)","  2. Original vs reconstructed digits (should look similar)","  3. Latent space colored by digit (clusters visible)","Try changing latent_dim (8, 16, 64) to see effect on reconstruction quality"]}];return e.jsx("div",{className:"min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8",children:e.jsxs("div",{className:"max-w-7xl mx-auto",children:[e.jsxs("div",{className:"bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8 border-t-4 border-blue-600",children:[e.jsxs("div",{className:"flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-xl shadow-lg",children:e.jsx(He,{className:"w-12 h-12 text-white"})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-3xl md:text-4xl font-bold text-gray-900",children:"Feedforward Neural Networks"}),e.jsx("p",{className:"text-gray-600 mt-1",children:"Theory, Mathematics, and Python Implementation"})]})]}),e.jsxs("div",{className:"bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-lg border-2 border-blue-300",children:[e.jsx("p",{className:"text-sm font-semibold text-blue-900",children:"Generated by"}),e.jsx("p",{className:"text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",children:"Blockchain Data Intelligence Lab"})]})]}),e.jsx("div",{className:"bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-300",children:e.jsxs("p",{className:"text-sm text-gray-700",children:[e.jsx("strong",{className:"text-amber-900",children:"Complete Learning Path:"})," Master feedforward networks from theory to implementation with real Python code examples"]})})]}),e.jsx("div",{className:"bg-white rounded-xl shadow-lg p-2 mb-8 flex flex-wrap gap-2",children:["introduction","theory","code","comparison"].map(l=>e.jsxs("button",{onClick:()=>p(l),className:`flex-1 min-w-[140px] py-3 px-4 rounded-lg font-semibold transition-all ${t===l?"bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,children:[l==="code"&&e.jsx(Le,{className:"w-4 h-4 inline mr-2"}),l==="theory"&&e.jsx(We,{className:"w-4 h-4 inline mr-2"}),l.charAt(0).toUpperCase()+l.slice(1)]},l))}),t==="introduction"&&e.jsxs("div",{className:"bg-white rounded-2xl shadow-xl p-6 md:p-8",children:[e.jsx("h2",{className:"text-3xl font-bold text-gray-900 mb-6",children:"Welcome to Feedforward Neural Networks"}),e.jsxs("div",{className:"prose max-w-none",children:[e.jsx("p",{className:"text-lg text-gray-700 mb-6",children:"This comprehensive course covers classic feedforward and autoencoder architectures. You'll learn theory, mathematics, and practical implementation with real Python code."}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6 mb-8",children:[e.jsxs("div",{className:"bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-300",children:[e.jsxs("h3",{className:"text-xl font-bold text-gray-900 mb-4 flex items-center gap-2",children:[e.jsx(We,{className:"w-6 h-6 text-blue-600"}),"What You'll Learn"]}),e.jsxs("ul",{className:"space-y-2 text-sm",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx(Se,{className:"w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Theory:"})," Mathematical foundations and intuitions"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx(Se,{className:"w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Architectures:"})," Perceptron, MLP, RBFN, Autoencoders, VAE"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx(Se,{className:"w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Mathematics:"})," Step-by-step derivations with examples"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx(Se,{className:"w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Implementation:"})," Complete Python code with explanations"]})]})]})]}),e.jsxs("div",{className:"bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-300",children:[e.jsxs("h3",{className:"text-xl font-bold text-gray-900 mb-4 flex items-center gap-2",children:[e.jsx(Le,{className:"w-6 h-6 text-purple-600"}),"Code Examples"]}),e.jsxs("ul",{className:"space-y-2 text-sm",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx(fe,{className:"w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Perceptron:"})," Binary classification from scratch"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx(fe,{className:"w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5"}),e.jsxs("span",{children:[e.jsx("strong",{children:"MLP:"})," MNIST digit classification (98%+ accuracy)"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx(fe,{className:"w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Autoencoder:"})," Image compression & reconstruction"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx(fe,{className:"w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5"}),e.jsx("span",{children:"All with line-by-line explanations"})]})]})]})]}),e.jsxs("div",{className:"bg-green-50 border-2 border-green-300 p-6 rounded-xl mb-6",children:[e.jsx("h3",{className:"text-xl font-bold text-green-900 mb-3",children:"Architectures Covered"}),e.jsx("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-4 text-sm",children:s.map(l=>e.jsxs("div",{className:"bg-white p-3 rounded-lg",children:[e.jsx("p",{className:"font-semibold text-gray-900",children:l.name}),e.jsxs("p",{className:"text-xs text-gray-600",children:[l.year," • ",l.level]})]},l.id))})]})]})]}),t==="theory"&&e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"bg-white rounded-xl shadow-lg p-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-900 mb-4",children:"Select Architecture"}),e.jsx("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-3",children:s.map((l,u)=>e.jsxs("button",{onClick:()=>a(u),className:`p-4 rounded-lg text-left transition-all ${r===u?"bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,children:[e.jsx("div",{className:"text-sm font-semibold mb-1",children:l.name}),e.jsx("div",{className:"text-xs opacity-75",children:l.year})]},l.id))})]}),e.jsx("div",{className:"bg-white rounded-2xl shadow-xl p-6 md:p-8",children:s[r]&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"mb-6",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[e.jsx("h2",{className:"text-3xl font-bold text-gray-900",children:s[r].name}),e.jsx("span",{className:`px-4 py-1 rounded-full text-sm font-semibold ${s[r].level==="Beginner"?"bg-green-100 text-green-800":s[r].level==="Intermediate"?"bg-blue-100 text-blue-800":"bg-purple-100 text-purple-800"}`,children:s[r].level})]}),e.jsxs("p",{className:"text-gray-600",children:[s[r].year," • ",s[r].inventor]}),e.jsx("p",{className:"text-lg text-gray-700 mt-3",children:s[r].description})]}),e.jsxs("div",{className:"bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600 mb-6",children:[e.jsx("h3",{className:"text-xl font-bold text-blue-900 mb-4",children:"Theory"}),e.jsx("div",{className:"space-y-3",children:Object.entries(s[r].theory).map(([l,u])=>e.jsxs("div",{className:"bg-white p-4 rounded-lg",children:[e.jsx("p",{className:"font-semibold text-gray-900 mb-2 capitalize",children:l.replace(/([A-Z])/g," $1")}),Array.isArray(u)?e.jsx("ul",{className:"space-y-1",children:u.map((f,b)=>e.jsxs("li",{className:"text-sm text-gray-700",children:["• ",f]},b))}):e.jsx("p",{className:"text-sm text-gray-700",children:u})]},l))})]}),e.jsxs("div",{className:"bg-purple-50 p-6 rounded-xl border-l-4 border-purple-600 mb-6",children:[e.jsx("h3",{className:"text-xl font-bold text-purple-900 mb-4",children:"Mathematics"}),e.jsx("div",{className:"space-y-4",children:Object.entries(s[r].mathematics).map(([l,u])=>e.jsxs("div",{className:"bg-white p-5 rounded-lg",children:[e.jsx("h4",{className:"font-bold text-gray-900 mb-3 capitalize",children:l.replace(/([A-Z])/g," $1")}),typeof u=="object"&&!Array.isArray(u)?e.jsx("div",{className:"space-y-2",children:Object.entries(u).map(([f,b])=>e.jsxs("div",{className:"bg-purple-50 p-3 rounded",children:[e.jsxs("p",{className:"font-semibold text-sm text-gray-900 mb-1",children:[f,":"]}),e.jsx("p",{className:"text-sm text-gray-700 font-mono",children:b})]},f))}):e.jsx("p",{className:"text-sm font-mono bg-purple-50 p-3 rounded",children:u})]},l))})]}),s[r].visualDirection&&e.jsxs("div",{className:"bg-green-50 p-6 rounded-xl border-l-4 border-green-600 mb-6",children:[e.jsxs("h3",{className:"text-xl font-bold text-green-900 mb-4 flex items-center gap-2",children:[e.jsx(Oe,{className:"w-6 h-6"}),"Visual Guide - How to Draw"]}),e.jsx("div",{className:"space-y-4",children:Object.entries(s[r].visualDirection).map(([l,u])=>e.jsxs("div",{className:"bg-white p-4 rounded-lg",children:[e.jsx("h4",{className:"font-semibold text-gray-900 mb-2 capitalize",children:l.replace(/([A-Z])/g," $1")}),Array.isArray(u)?e.jsx("ol",{className:"space-y-2",children:u.map((f,b)=>e.jsxs("li",{className:"text-sm text-gray-700 flex items-start gap-2",children:[e.jsx("span",{className:"bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0",children:b+1}),e.jsx("span",{className:"pt-0.5",children:f})]},b))}):e.jsx("p",{className:"text-sm text-gray-700 italic",children:u})]},l))})]}),s[r].stepByStep&&e.jsxs("div",{className:"bg-amber-50 p-6 rounded-xl border-l-4 border-amber-600",children:[e.jsx("h3",{className:"text-xl font-bold text-amber-900 mb-4",children:"Step-by-Step Process"}),e.jsx("div",{className:"space-y-4",children:s[r].stepByStep.map((l,u)=>e.jsxs("div",{className:"bg-white p-5 rounded-lg",children:[e.jsxs("div",{className:"flex items-start gap-3 mb-3",children:[e.jsx("div",{className:"bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0",children:u+1}),e.jsxs("div",{children:[e.jsx("h4",{className:"font-bold text-gray-900",children:l.step}),e.jsx("p",{className:"text-sm text-gray-700 mt-1",children:l.description})]})]}),e.jsx("div",{className:"bg-gray-900 p-3 rounded mt-3",children:e.jsx("code",{className:"text-green-400 text-xs",children:l.code})}),e.jsxs("p",{className:"text-xs text-gray-600 mt-2 italic",children:["Visual: ",l.visual]})]},u))})]})]})})]}),t==="code"&&e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"bg-white rounded-xl shadow-lg p-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-900 mb-4",children:"Python Code Examples"}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:h.map((l,u)=>e.jsxs("button",{onClick:()=>c(u),className:`p-4 rounded-lg text-left transition-all ${n===u?"bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx(Ge,{className:"w-5 h-5"}),e.jsx("span",{className:"font-bold",children:l.title.split(" - ")[0]})]}),e.jsx("p",{className:"text-xs opacity-90 mb-2",children:l.title.split(" - ")[1]}),e.jsx("span",{className:`px-2 py-1 rounded text-xs font-semibold ${n===u?"bg-white/20":"bg-blue-100 text-blue-800"}`,children:l.difficulty})]},l.id))})]}),e.jsx("div",{className:"bg-white rounded-2xl shadow-xl p-6 md:p-8",children:h[n]&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"mb-6",children:[e.jsx("h2",{className:"text-3xl font-bold text-gray-900 mb-2",children:h[n].title}),e.jsx("p",{className:"text-gray-600 mb-4",children:h[n].description}),e.jsxs("div",{className:"bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200",children:[e.jsx("h3",{className:"font-bold text-gray-900 mb-2",children:"Problem:"}),e.jsx("p",{className:"text-gray-700",children:h[n].problem})]})]}),e.jsxs("div",{className:"bg-green-50 p-5 rounded-xl border-l-4 border-green-600 mb-6",children:[e.jsx("h3",{className:"font-bold text-green-900 mb-3",children:"Dataset"}),e.jsx("div",{className:"space-y-2 text-sm",children:Object.entries(h[n].dataset).map(([l,u])=>e.jsxs("p",{className:"text-gray-700",children:[e.jsxs("strong",{className:"capitalize",children:[l.replace(/([A-Z])/g," $1"),":"]})," ",u]},l))})]}),e.jsxs("div",{className:"mb-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-3",children:[e.jsxs("h3",{className:"text-xl font-bold text-gray-900 flex items-center gap-2",children:[e.jsx(Le,{className:"w-6 h-6"}),"Complete Python Code"]}),e.jsxs("button",{onClick:()=>navigator.clipboard.writeText(h[n].code),className:"flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm",children:[e.jsx(Ue,{className:"w-4 h-4"}),"Copy Code"]})]}),e.jsx("div",{className:"bg-gray-900 p-6 rounded-xl overflow-x-auto",children:e.jsx("pre",{className:"text-green-400 text-sm",children:e.jsx("code",{children:h[n].code})})})]}),e.jsxs("div",{className:"bg-purple-50 p-6 rounded-xl border-l-4 border-purple-600 mb-6",children:[e.jsx("h3",{className:"text-xl font-bold text-purple-900 mb-4",children:"Code Explanation"}),e.jsx("div",{className:"space-y-4",children:h[n].explanation.map((l,u)=>e.jsxs("div",{className:"bg-white p-4 rounded-lg",children:[e.jsx("h4",{className:"font-bold text-gray-900 mb-2",children:l.section}),e.jsx("div",{className:"bg-gray-900 p-3 rounded mb-2",children:e.jsx("code",{className:"text-green-400 text-xs",children:l.code})}),e.jsx("p",{className:"text-sm text-gray-700",children:l.explanation})]},u))})]}),e.jsxs("div",{className:"bg-gray-900 p-6 rounded-xl mb-6",children:[e.jsx("h3",{className:"text-xl font-bold text-white mb-4",children:"Expected Output"}),e.jsx("pre",{className:"text-green-400 text-sm whitespace-pre-wrap",children:h[n].expectedOutput})]}),e.jsxs("div",{className:"bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600",children:[e.jsxs("h3",{className:"text-xl font-bold text-blue-900 mb-4 flex items-center gap-2",children:[e.jsx(fe,{className:"w-6 h-6"}),"How to Run"]}),e.jsx("ol",{className:"space-y-3",children:h[n].runInstructions.map((l,u)=>e.jsxs("li",{className:"flex items-start gap-3",children:[e.jsx("span",{className:"bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0",children:u+1}),e.jsx("p",{className:"text-gray-700 pt-1",children:l})]},u))})]})]})})]}),t==="comparison"&&e.jsxs("div",{className:"bg-white rounded-2xl shadow-xl p-6 md:p-8",children:[e.jsx("h2",{className:"text-3xl font-bold text-gray-900 mb-6",children:"Architecture Comparison"}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full text-sm border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-gradient-to-r from-blue-600 to-purple-600 text-white",children:[e.jsx("th",{className:"p-3 text-left",children:"Architecture"}),e.jsx("th",{className:"p-3 text-left",children:"Year"}),e.jsx("th",{className:"p-3 text-left",children:"Type"}),e.jsx("th",{className:"p-3 text-left",children:"Key Innovation"}),e.jsx("th",{className:"p-3 text-left",children:"Best For"}),e.jsx("th",{className:"p-3 text-left",children:"Level"})]})}),e.jsx("tbody",{children:s.map((l,u)=>e.jsxs("tr",{className:`border-b hover:bg-blue-50 ${u%2===0?"bg-gray-50":""}`,children:[e.jsx("td",{className:"p-3 font-semibold",children:l.name}),e.jsx("td",{className:"p-3",children:l.year}),e.jsx("td",{className:"p-3",children:l.category}),e.jsx("td",{className:"p-3 text-xs",children:l.theory.keyIdea}),e.jsx("td",{className:"p-3 text-xs",children:l.practicalExample.problem}),e.jsx("td",{className:"p-3",children:e.jsx("span",{className:`px-2 py-1 rounded text-xs font-semibold ${l.level==="Beginner"?"bg-green-100 text-green-800":l.level==="Intermediate"?"bg-blue-100 text-blue-800":"bg-purple-100 text-purple-800"}`,children:l.level})})]},l.id))})]})})]}),e.jsx("div",{className:"mt-8 bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600",children:e.jsxs("div",{className:"text-center",children:[e.jsxs("p",{className:"text-gray-600 mb-3",children:[e.jsx("strong",{children:"Complete Learning Resource:"})," Theory, mathematics, visual guides, and working Python code"]}),e.jsxs("div",{className:"pt-4 border-t border-gray-200",children:[e.jsx("p",{className:"text-sm text-gray-500 mb-2",children:"Generated by"}),e.jsx("p",{className:"text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",children:"Blockchain Data Intelligence Lab"})]})]})})]})})};function Gt(){const[x,t]=w.useState(0),p=[{id:0,label:"16. Adjusting Weight & Bias"},{id:1,label:"17. Backprop Learn"},{id:2,label:"18. Backprop Tutorial"},{id:3,label:"31. Error Handling"},{id:4,label:"32. Feed Forward"}];return e.jsxs("div",{style:{minHeight:"100vh"},children:[e.jsx("div",{style:{position:"sticky",top:0,zIndex:1e3,background:"#0a0f1a",borderBottom:"1px solid #1e2d45",display:"flex",gap:6,padding:"8px 14px",flexWrap:"wrap"},children:p.map(r=>e.jsx("button",{onClick:()=>t(r.id),style:{padding:"7px 16px",borderRadius:10,cursor:"pointer",border:x===r.id?"1px solid #f97316":"1px solid #1e2d45",background:x===r.id?"rgba(249,115,22,0.09)":"transparent",color:x===r.id?"#f97316":"#6b7a99",fontFamily:"monospace",fontSize:11,fontWeight:x===r.id?700:400},children:r.label},r.id))}),e.jsxs("div",{children:[x===0&&e.jsx(it,{}),x===1&&e.jsx(ut,{}),x===2&&e.jsx(_t,{}),x===3&&e.jsx(Rt,{}),x===4&&e.jsx(Et,{})]})]})}export{Gt as default};
