import{r as w,j as e}from"./index-CIDXSLTw.js";var D=j=>1/(1+Math.exp(-j)),Q=j=>Math.tanh(j),J=j=>Math.max(0,j),le=(j,o)=>j.reduce((a,l,s)=>a+l*o[s],0),de=j=>typeof j=="number"?j.toFixed(4):j,_e=function(o,a){const l=a.length,s=a[0].length,r=o.length-l+1,n=o[0].length-s+1,m=Array.from({length:r},()=>Array(n).fill(0));for(let c=0;c<r;c++)for(let f=0;f<n;f++)for(let p=0;p<l;p++)for(let y=0;y<s;y++)m[c][f]+=o[c+p][f+y]*a[p][y];return m},je=function(o,a=2){const l=Math.floor(o.length/a),s=Math.floor(o[0].length/a);return Array.from({length:l},(r,n)=>Array.from({length:s},(m,c)=>{let f=-1/0;for(let p=0;p<a;p++)for(let y=0;y<a;y++)f=Math.max(f,o[n*a+p][c*a+y]);return f}))},H={lenet:{main:"#22d3ee",glow:"rgba(34,211,238,0.3)",bg:"rgba(34,211,238,0.08)"},googlenet:{main:"#fbbf24",glow:"rgba(251,191,36,0.3)",bg:"rgba(251,191,36,0.08)"},vggnet:{main:"#a78bfa",glow:"rgba(167,139,250,0.3)",bg:"rgba(167,139,250,0.08)"},rnn:{main:"#4ade80",glow:"rgba(74,222,128,0.3)",bg:"rgba(74,222,128,0.08)"},lstm:{main:"#f472b6",glow:"rgba(244,114,182,0.3)",bg:"rgba(244,114,182,0.08)"},gru:{main:"#fb923c",glow:"rgba(251,146,60,0.3)",bg:"rgba(251,146,60,0.08)"}},M=[{id:"lenet",label:"LeNet",emoji:"🔭"},{id:"googlenet",label:"GoogLeNet",emoji:"🔬"},{id:"vggnet",label:"VGGNet",emoji:"🏗️"},{id:"rnn",label:"RNN",emoji:"🔄"},{id:"lstm",label:"LSTM",emoji:"🧠"},{id:"gru",label:"GRU",emoji:"⚡"}],W=({color:j,title:o,children:a})=>e.jsxs("div",{style:{background:j.bg,border:`1px solid ${j.main}40`,borderRadius:12,padding:"16px 20px",marginBottom:16,boxShadow:`inset 0 0 20px ${j.glow}`},children:[e.jsx("div",{style:{color:j.main,fontFamily:"'Courier New', monospace",fontWeight:700,fontSize:13,letterSpacing:2,marginBottom:10,textTransform:"uppercase"},children:o}),e.jsx("div",{style:{color:"#cbd5e1",fontSize:14,lineHeight:1.7},children:a})]}),G=({color:j,children:o})=>e.jsx("div",{style:{background:"#0f172a",border:`1px solid ${j.main}60`,borderRadius:8,padding:"12px 16px",fontFamily:"'Courier New', monospace",fontSize:13,color:j.main,margin:"10px 0",lineHeight:1.8,whiteSpace:"pre-wrap"},children:o}),P=({color:j,children:o})=>e.jsx("h3",{style:{color:j.main,fontFamily:"'Courier New', monospace",fontSize:16,fontWeight:700,letterSpacing:3,textTransform:"uppercase",borderBottom:`1px solid ${j.main}40`,paddingBottom:8,marginBottom:16,textShadow:`0 0 12px ${j.main}`},children:o}),X=({data:j,color:o,title:a,scale:l=1,showVals:s=!0})=>{const r=Math.max(...j.flat().map(Math.abs))||1;return e.jsxs("div",{style:{textAlign:"center",margin:"0 8px"},children:[e.jsx("div",{style:{color:"#94a3b8",fontSize:11,marginBottom:4},children:a}),e.jsx("div",{style:{display:"inline-block",border:`1px solid ${o.main}50`,borderRadius:4,overflow:"hidden"},children:j.map((n,m)=>e.jsx("div",{style:{display:"flex"},children:n.map((c,f)=>{const p=Math.abs(c)/r,y=c>=0?Math.round(p*34+(1-p)*15):15,x=c>=0?Math.round(p*211+(1-p)*23):23,u=c>=0?Math.round(p*238+(1-p)*42):42,v=`rgb(${y},${x},${u})`;return e.jsx("div",{style:{width:28*l,height:28*l,background:v,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8*l,color:p>.5?"#0f172a":"#94a3b8",border:"1px solid #1e293b"},children:s&&c.toFixed(1)},f)})},m))})]})},we=function(){const o=H.lenet,[a,l]=w.useState(0),[s,r]=w.useState(.1),[n,m]=w.useState(0),[c,f]=w.useState([.5,-.3,.8,-.6,.2,-.4,.7,.1,-.5]),[p,y]=w.useState(null),[x,u]=w.useState(null),[v,_]=w.useState(!1),d=[[0,0,1,0,0],[0,1,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,1,0]],b=[[c[0],c[1],c[2]],[c[3],c[4],c[5]],[c[6],c[7],c[8]]],g=_e(d,b).map($=>$.map(J)),S=je(g,2),T=S.flat(),z=[.4,-.2,.6,-.3],C=.1,k=D(le(T.slice(0,4),z)+C),R=1,E=.5*Math.pow(R-k,2),L=[{title:"Input Image (5×5)",desc:"A 5×5 grayscale image representing the digit '1'. Each cell holds a value 0 (black) or 1 (white). This is the raw pixel data fed into LeNet."},{title:"Conv Layer 1 (3×3 kernel)",desc:"A 3×3 filter (kernel) slides across the image. At each position, it multiplies its values with the overlapping pixels and sums them. This detects local patterns like edges. ReLU activation zeros out negatives."},{title:"Max Pooling (2×2)",desc:"We take the maximum value in each 2×2 region. This shrinks the feature map by half, keeping the strongest signals and discarding small position differences — making the network robust to slight shifts."},{title:"Fully Connected + Output",desc:"The flattened pooled values multiply with learned weights and add a bias. Sigmoid activation squashes the result to [0,1]. We interpret this as the probability it's a '1'."},{title:"Loss & Error Backpropagation",desc:"We compute Mean Squared Error. The error flows backward, computing how much each weight contributed. Gradient descent subtracts (learning_rate × gradient) from each weight — nudging them toward lower loss."}],F=()=>{_(!0),setTimeout(()=>{const $=-(R-k)*k*(1-k);f(N=>N.map((I,Y)=>{const q=(Math.random()-.5)*.05;return I-s*$*(.1+q)})),m(N=>N+1),y(E),u(k),_(!1)},300)};return e.jsxs("div",{children:[e.jsxs(W,{color:o,title:"What is LeNet?",children:["LeNet (1998, Yann LeCun) is the ",e.jsx("strong",{style:{color:o.main},children:"original Convolutional Neural Network"})," designed to read handwritten digits (0–9). It introduced the concept of learning spatial features directly from pixels — no manual feature engineering needed. It powers systems like zip-code readers and bank check readers."]}),e.jsxs(W,{color:o,title:"Why do we use it?",children:['Before LeNet, engineers had to manually craft features (like "look for diagonal lines"). LeNet learns these features automatically from data. Its ',e.jsx("strong",{style:{color:o.main},children:"convolution layers detect edges → shapes → objects"})," in a hierarchy, using far fewer parameters than a plain network would need."]}),e.jsx(W,{color:o,title:"Architecture: Input → Conv1 → Pool1 → Conv2 → Pool2 → FC1 → FC2 → Output",children:"Original LeNet used 32×32 inputs, two conv-pool pairs, then fully connected layers. Our demo simplifies to 5×5 for clarity, showing the exact same principles."}),e.jsx(P,{color:o,children:"🔬 Step-by-Step Interactive Walkthrough"}),e.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16},children:L.map(($,N)=>e.jsxs("button",{onClick:()=>l(N),style:{padding:"6px 14px",borderRadius:20,border:`1px solid ${o.main}`,background:a===N?o.main:"transparent",color:a===N?"#0f172a":o.main,fontFamily:"'Courier New', monospace",fontSize:12,cursor:"pointer",fontWeight:a===N?700:400},children:["Step ",N+1]},N))}),e.jsxs("div",{style:{background:"#0f172a",borderRadius:12,padding:20,marginBottom:16,border:`1px solid ${o.main}30`},children:[e.jsx("div",{style:{color:o.main,fontWeight:700,fontSize:15,marginBottom:8},children:L[a].title}),e.jsx("div",{style:{color:"#94a3b8",fontSize:13,lineHeight:1.7,marginBottom:16},children:L[a].desc}),e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:16,alignItems:"flex-start",justifyContent:"center"},children:[a===0&&e.jsx(X,{data:d,color:o,title:"5×5 Input",scale:1.4}),a===1&&e.jsxs(e.Fragment,{children:[e.jsx(X,{data:d,color:o,title:"Input (5×5)"}),e.jsx("div",{style:{color:o.main,fontSize:24,alignSelf:"center"},children:"⊛"}),e.jsx(X,{data:b,color:o,title:"Kernel (3×3)"}),e.jsx("div",{style:{color:o.main,fontSize:24,alignSelf:"center"},children:"→"}),e.jsx(X,{data:g,color:o,title:"After Conv+ReLU (3×3)"})]}),a===2&&e.jsxs(e.Fragment,{children:[e.jsx(X,{data:g,color:o,title:"Before Pooling (3×3)"}),e.jsx("div",{style:{color:o.main,fontSize:24,alignSelf:"center"},children:"→ MaxPool →"}),e.jsx(X,{data:S,color:o,title:"After Pooling (1×1)",scale:2})]}),a===3&&e.jsx("div",{style:{width:"100%"},children:e.jsx(G,{color:o,children:`Flattened pool values: [${T.slice(0,4).map($=>$.toFixed(3)).join(", ")}]
FC Weights: [${z.join(", ")}]
FC Bias:    ${C}

Net input = Σ(input_i × weight_i) + bias
          = ${T.slice(0,4).map(($,N)=>`${$.toFixed(2)}×${z[N]}`).join(" + ")} + ${C}
          = ${(le(T.slice(0,4),z)+C).toFixed(4)}

Output = sigmoid(net) = ${k.toFixed(4)}
→ Probability of being "1": ${(k*100).toFixed(1)}%`})}),a===4&&e.jsx("div",{style:{width:"100%"},children:e.jsx(G,{color:o,children:`Target (true label): ${R}
Prediction:          ${k.toFixed(4)}
Error:               ${(R-k).toFixed(4)}

Loss (MSE) = 0.5 × (target - prediction)²
           = 0.5 × (${R} - ${k.toFixed(4)})²
           = ${E.toFixed(6)}

∂Loss/∂output = -(target - prediction) = ${(-(R-k)).toFixed(4)}
∂output/∂net  = sigmoid'(net) = output×(1-output)
              = ${k.toFixed(4)} × ${(1-k).toFixed(4)} = ${(k*(1-k)).toFixed(4)}

δ (delta) = ∂Loss/∂output × ∂output/∂net = ${(-(R-k)*k*(1-k)).toFixed(4)}

Weight update rule:
  new_weight = old_weight − (learning_rate × δ × input)
  new_bias   = old_bias   − (learning_rate × δ)

With lr = ${s}:
  new_bias = ${C} − ${s} × ${(-(R-k)*k*(1-k)).toFixed(4)}
           = ${(C-s*(-(R-k)*k*(1-k))).toFixed(4)}`})})]})]}),e.jsx(P,{color:o,children:"🏋️ Live Training Simulator"}),e.jsxs("div",{style:{background:"#0f172a",borderRadius:12,padding:20,border:`1px solid ${o.main}30`},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16,marginBottom:16,flexWrap:"wrap"},children:[e.jsxs("label",{style:{color:"#94a3b8",fontSize:13},children:["Learning Rate: ",e.jsx("strong",{style:{color:o.main},children:s}),e.jsx("input",{type:"range",min:"0.001",max:"0.5",step:"0.001",value:s,onChange:$=>r(+$.target.value),style:{marginLeft:8,accentColor:o.main,width:120}})]}),e.jsx("button",{onClick:F,disabled:v,style:{padding:"8px 20px",borderRadius:8,border:"none",background:o.main,color:"#0f172a",fontWeight:700,fontFamily:"'Courier New', monospace",fontSize:13,cursor:"pointer"},children:v?"Training...":"▶ Train 1 Step"}),e.jsx("button",{onClick:()=>{f([.5,-.3,.8,-.6,.2,-.4,.7,.1,-.5]),m(0),y(null),u(null)},style:{padding:"8px 16px",borderRadius:8,border:`1px solid ${o.main}`,background:"transparent",color:o.main,fontFamily:"'Courier New', monospace",fontSize:13,cursor:"pointer"},children:"↺ Reset"})]}),p!==null&&e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12},children:[["Epoch",n],["Loss (MSE)",de(p)],["Prediction",de(x)]].map(([$,N])=>e.jsxs("div",{style:{background:o.bg,borderRadius:8,padding:12,textAlign:"center"},children:[e.jsx("div",{style:{color:"#64748b",fontSize:11,marginBottom:4},children:$}),e.jsx("div",{style:{color:o.main,fontSize:20,fontFamily:"'Courier New', monospace",fontWeight:700},children:N})]},$))}),e.jsxs("div",{style:{color:"#64748b",fontSize:12,marginTop:12},children:["💡 ",e.jsx("strong",{children:"What to observe:"})," As you train, watch the Loss decrease and Prediction approach 1.0 (correct answer). A high learning rate trains fast but may overshoot and become unstable. A low learning rate is stable but slow."]})]})]})},Se=function(){const o=H.googlenet,[a,l]=w.useState(null),[s,r]=w.useState(.7),[n,m]=w.useState(0),c=[{label:"1×1 Conv",kernel:"1×1",filters:64,desc:"Reduces channels cheaply. Acts as a learned linear combination of input channels. No spatial analysis — just channel mixing.",out:D(s*.6-.1)},{label:"1×1 → 3×3 Conv",kernel:"3×3",filters:128,desc:"First 1×1 reduces channel depth (bottleneck). Then 3×3 learns medium spatial patterns (edges, textures). Efficient and powerful.",out:J(s*.8+.05)},{label:"1×1 → 5×5 Conv",kernel:"5×5",filters:32,desc:"First 1×1 compresses. Then 5×5 captures larger spatial context (broader shapes, larger textures). Fewer parameters because of the bottleneck.",out:Q(s*.5-.2)},{label:"3×3 Pool → 1×1",kernel:"pool",filters:32,desc:"MaxPool captures the strongest local features. Then 1×1 conv reduces dimensions. Adds spatial invariance to the module.",out:J(s*.4+.1)}],f=c.map(y=>y.out.toFixed(3)).join(" | "),p=[{title:"Stem",desc:"7×7 Conv → MaxPool → 1×1 Conv → 3×3 Conv → MaxPool. Rapidly reduces 224×224 image to 28×28 feature maps."},{title:"Inception Block ×2",desc:"Two inception modules with 4 parallel branches each, concatenated at depth dimension."},{title:"MaxPool + Inception ×5",desc:"Spatial downsampling followed by five more inception blocks. Depth grows while spatial size shrinks."},{title:"Inception ×2 + AvgPool",desc:"Final two inception modules. Global Average Pooling replaces fully connected layers — averages each feature map to a single number. Massive parameter reduction."},{title:"Dropout + Softmax",desc:"Dropout randomly zeroes activations during training (regularization). Final 1000-class softmax for ImageNet classification."}];return e.jsxs("div",{children:[e.jsxs(W,{color:o,title:"What is GoogLeNet (Inception)?",children:["GoogLeNet (2014, Google Brain) won ImageNet with a radical idea: instead of choosing one convolution size, use ",e.jsx("strong",{style:{color:o.main},children:"all of them simultaneously"}),' in parallel "Inception modules." It has 22 layers but uses ',e.jsx("strong",{style:{color:o.main},children:"12× fewer parameters"})," than AlexNet through aggressive bottleneck design."]}),e.jsx(W,{color:o,title:"Why do we use it?",children:"Different features live at different scales — some patterns are small (texture), others are large (object shape). Processing multiple scales in parallel captures all of them. The 1×1 bottleneck convolutions dramatically reduce computation before expensive 3×3 and 5×5 convolutions."}),e.jsx(P,{color:o,children:"🔬 Inception Module — Live Demo"}),e.jsxs("div",{style:{background:"#0f172a",borderRadius:12,padding:20,marginBottom:16,border:`1px solid ${o.main}30`},children:[e.jsx("div",{style:{marginBottom:16},children:e.jsxs("label",{style:{color:"#94a3b8",fontSize:13},children:["Input activation value: ",e.jsx("strong",{style:{color:o.main},children:s.toFixed(2)}),e.jsx("input",{type:"range",min:"0",max:"1",step:"0.01",value:s,onChange:y=>r(+y.target.value),style:{marginLeft:12,accentColor:o.main,width:160}})]})}),e.jsxs("div",{style:{textAlign:"center",marginBottom:16},children:[e.jsx("div",{style:{color:"#64748b",fontSize:12,marginBottom:8},children:"Previous Layer Output"}),e.jsxs("div",{style:{background:o.bg,border:`2px solid ${o.main}`,borderRadius:8,padding:"8px 24px",display:"inline-block",color:o.main,fontWeight:700,fontSize:14,marginBottom:16},children:["Input: ",s.toFixed(2)]}),e.jsx("div",{style:{display:"flex",justifyContent:"center",gap:12,flexWrap:"wrap",marginBottom:16},children:c.map((y,x)=>e.jsxs("div",{onClick:()=>l(a===x?null:x),style:{background:a===x?o.bg:"#1e293b",border:`2px solid ${a===x?o.main:o.main+"40"}`,borderRadius:10,padding:"12px 16px",cursor:"pointer",minWidth:140,textAlign:"center",transition:"all 0.2s",boxShadow:a===x?`0 0 16px ${o.glow}`:"none"},children:[e.jsx("div",{style:{color:o.main,fontWeight:700,fontSize:13},children:y.label}),e.jsxs("div",{style:{color:"#64748b",fontSize:11},children:[y.filters," filters"]}),e.jsxs("div",{style:{color:"#e2e8f0",fontSize:14,marginTop:6,fontFamily:"'Courier New', monospace"},children:["→ ",y.out.toFixed(3)]})]},x))}),e.jsx("div",{style:{color:"#64748b",fontSize:12,marginBottom:8},children:"Concatenated along depth dimension →"}),e.jsxs("div",{style:{background:o.bg,border:`2px solid ${o.main}60`,borderRadius:8,padding:"8px 16px",display:"inline-block",color:o.main,fontFamily:"'Courier New', monospace",fontSize:13},children:["[",f,"]  (256 channels total)"]})]}),a!==null&&e.jsxs("div",{style:{background:"#0f172a",border:`1px solid ${o.main}50`,borderRadius:10,padding:16},children:[e.jsx("div",{style:{color:o.main,fontWeight:700,marginBottom:8},children:c[a].label}),e.jsx("div",{style:{color:"#94a3b8",fontSize:13,lineHeight:1.7,marginBottom:10},children:c[a].desc}),e.jsx(G,{color:o,children:`Branch input: ${s.toFixed(3)}
Kernel size:  ${c[a].kernel}
Filters:      ${c[a].filters}
Activation:   ${["sigmoid","relu","tanh","relu"][a]}
Output:       ${c[a].out.toFixed(4)}`})]})]}),e.jsx(P,{color:o,children:"🏛️ Full Architecture (22 Layers)"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:p.map((y,x)=>e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"flex-start",background:"#0f172a",borderRadius:10,padding:14,border:`1px solid ${o.main}20`},children:[e.jsx("div",{style:{background:o.bg,border:`1px solid ${o.main}`,borderRadius:"50%",width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",color:o.main,fontWeight:700,fontSize:13,flexShrink:0},children:x+1}),e.jsxs("div",{children:[e.jsx("div",{style:{color:o.main,fontWeight:600,fontSize:13,marginBottom:4},children:y.title}),e.jsx("div",{style:{color:"#94a3b8",fontSize:12,lineHeight:1.6},children:y.desc})]})]},x))}),e.jsxs(W,{color:o,title:"Error Handling & Weight Update",children:["GoogLeNet uses ",e.jsx("strong",{style:{color:o.main},children:"auxiliary classifiers"})," at intermediate layers during training — a unique error handling technique. If the main output is wrong, gradients also flow from these intermediate checkpoints, preventing the vanishing gradient problem in the deep network. Weight update: ",e.jsx("code",{style:{color:o.main},children:"w ← w − α·∇L"})," where ∇L includes gradients from all three loss points (two auxiliary + final)."]})]})},ze=function(){const o=H.vggnet,[a,l]=w.useState(3),[s,r]=w.useState(.6),[n,m]=w.useState(!1),c=[{name:"Input",size:"224×224×3",desc:"RGB image: 224 rows, 224 columns, 3 color channels"},{name:"Conv Block 1 (×2)",size:"224×224×64",desc:"Two 3×3 convolutions. 64 filters each. Detect basic edges and colors."},{name:"MaxPool",size:"112×112×64",desc:"Halve spatial dimensions. Retain strongest edge responses."},{name:"Conv Block 2 (×2)",size:"112×112×128",desc:"Two 3×3 convolutions. 128 filters. Detect corners, simple textures."},{name:"MaxPool",size:"56×56×128",desc:"Spatial halving again."},{name:"Conv Block 3 (×3)",size:"56×56×256",desc:"Three 3×3 convolutions. 256 filters. Detect complex textures and patterns."},{name:"MaxPool",size:"28×28×256",desc:"Spatial halving."},{name:"Conv Block 4 (×3)",size:"28×28×512",desc:"Three 3×3 convolutions. 512 filters. Detect parts of objects (wheels, eyes, etc.)."},{name:"MaxPool",size:"14×14×512",desc:"Spatial halving."},{name:"Conv Block 5 (×3)",size:"14×14×512",desc:"Three more 3×3 convolutions. 512 filters. High-level semantic features."},{name:"MaxPool",size:"7×7×512",desc:"Final spatial reduction."},{name:"FC-4096",size:"4096",desc:"Fully connected. 4096 neurons. Combines all spatial features."},{name:"FC-4096",size:"4096",desc:"Second fully connected layer. Refines combination."},{name:"FC-1000 + Softmax",size:"1000",desc:"Output probabilities for 1000 ImageNet classes."}],p=(()=>{let y=s;const x=[`Input: ${y.toFixed(3)}`];for(let u=0;u<a;u++){const v=[.4,.3,-.2,.5,.6,-.1,.2,.4,.3][u%9],_=[.05,-.02,.03][u%3];y=J(y*v*3+_),x.push(`Conv ${u+1}: relu(${(y/(J(y*v*3+_)||1)).toFixed(2)}×${v}×3 + ${_}) = ${y.toFixed(4)}`)}return x})();return e.jsxs("div",{children:[e.jsxs(W,{color:o,title:"What is VGGNet?",children:["VGGNet (2014, Oxford Visual Geometry Group) proved that ",e.jsx("strong",{style:{color:o.main},children:"depth matters above all else"}),". It uses only 3×3 convolution filters stacked repeatedly — up to 19 layers deep. Its brutal simplicity made it one of the most studied architectures in deep learning history."]}),e.jsxs(W,{color:o,title:"Why only 3×3 kernels?",children:["Two stacked 3×3 convolutions cover the same receptive field as one 5×5 convolution, but with ",e.jsx("strong",{style:{color:o.main},children:"fewer parameters and more non-linearity"}),". Three 3×3 convolutions ≡ one 7×7 convolution, using only 3×(9C²) vs. 49C² parameters. More activations = richer representations."]}),e.jsx(P,{color:o,children:"📐 Depth vs. Receptive Field Simulator"}),e.jsxs("div",{style:{background:"#0f172a",borderRadius:12,padding:20,marginBottom:16,border:`1px solid ${o.main}30`},children:[e.jsxs("div",{style:{display:"flex",gap:16,marginBottom:16,flexWrap:"wrap"},children:[e.jsxs("label",{style:{color:"#94a3b8",fontSize:13},children:["Stacked Conv Layers: ",e.jsx("strong",{style:{color:o.main},children:a}),e.jsx("input",{type:"range",min:1,max:9,step:1,value:a,onChange:y=>l(+y.target.value),style:{marginLeft:8,accentColor:o.main,width:120}})]}),e.jsxs("label",{style:{color:"#94a3b8",fontSize:13},children:["Input value: ",e.jsx("strong",{style:{color:o.main},children:s.toFixed(2)}),e.jsx("input",{type:"range",min:0,max:1,step:.01,value:s,onChange:y=>r(+y.target.value),style:{marginLeft:8,accentColor:o.main,width:120}})]})]}),e.jsx("div",{style:{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:16},children:Array.from({length:a},(y,x)=>e.jsxs("div",{style:{textAlign:"center"},children:[e.jsxs("div",{style:{background:`rgba(167,139,250,${.2+x*.08})`,border:`2px solid ${o.main}`,borderRadius:8,padding:"12px 10px",color:o.main,fontFamily:"'Courier New', monospace",fontSize:11,minWidth:70},children:["Conv ",x+1,e.jsx("br",{}),"3×3",e.jsx("br",{}),e.jsxs("span",{style:{color:"#e2e8f0"},children:["RF: ",x*2+3,"×",x*2+3]})]}),x<a-1&&e.jsx("div",{style:{color:o.main,fontSize:18,textAlign:"center"},children:"→"})]},x))}),e.jsxs("div",{style:{color:"#64748b",fontSize:12,marginBottom:10},children:["Effective receptive field: ",e.jsxs("span",{style:{color:o.main,fontWeight:700},children:[a*2+1,"×",a*2+1," pixels"]})," — covered by just ",a," stacked 3×3 convolutions"]}),e.jsxs("button",{onClick:()=>m(!n),style:{padding:"6px 14px",borderRadius:8,border:`1px solid ${o.main}`,background:"transparent",color:o.main,fontFamily:"'Courier New', monospace",fontSize:12,cursor:"pointer",marginBottom:n?12:0},children:[n?"▼ Hide":"▶ Show"," Activation Trace"]}),n&&e.jsx(G,{color:o,children:p.join(`
`)})]}),e.jsx(P,{color:o,children:"🏛️ VGG-16 Full Architecture"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:4},children:c.map((y,x)=>{const u=y.name.includes("Pool"),v=y.name.includes("FC")||y.name.includes("Softmax"),_=u?"rgba(100,116,139,0.1)":v?o.bg:"#0f172a",d=u?"#475569":v?o.main:`${o.main}30`;return e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center",background:_,borderRadius:8,padding:"10px 14px",border:`1px solid ${d}`},children:[e.jsx("div",{style:{color:u?"#94a3b8":o.main,fontFamily:"'Courier New', monospace",fontSize:11,minWidth:160},children:y.name}),e.jsx("div",{style:{color:"#475569",fontFamily:"'Courier New', monospace",fontSize:11,minWidth:100},children:y.size}),e.jsx("div",{style:{color:"#64748b",fontSize:11},children:y.desc})]},x)})}),e.jsxs(W,{color:o,title:"Weight & Bias Details + Error Handling",children:["VGG has ",e.jsx("strong",{style:{color:o.main},children:"138 million parameters"})," — mostly in FC layers. Training uses SGD with momentum (0.9) and weight decay (5×10⁻⁴). Error flows backward through all layers via chain rule. If gradients become tiny (vanishing gradient), we detect this by monitoring ‖∇L‖. Weight update: ",e.jsx("code",{style:{color:o.main},children:"v ← 0.9v − lr·∇L, w ← w + v"})," (momentum prevents oscillation and speeds convergence)."]})]})},ke=function(){var z,C,k,R,E;const o=H.rnn,[a,l]=w.useState(0),[s,r]=w.useState([1,2,3,4,5]),[n,m]=w.useState(.05),[c,f]=w.useState({Wx:.5,Wh:.3,b:.1,Wy:.8,by:.05}),[p,y]=w.useState([]),x=c;let u=0;const v=[],_=[];for(let L=0;L<s.length;L++){const F=s[L]/10,$=Q(x.Wx*F+x.Wh*u+x.b),N=x.Wy*$+x.by;v.push({t:L,x:F,h:u,hNew:$,y:N}),u=$,_.push(N)}const d=s.slice(1).map(L=>L/10),b=_.slice(0,-1),g=b.reduce((L,F,$)=>L+.5*Math.pow(d[$]-F,2),0),S=()=>{const L=n,F={...c};let $=0,N=0;for(let I=0;I<b.length;I++){const Y=b[I]-d[I];$+=Y*v[I].hNew,N+=Y}F.Wy-=L*$,F.by-=L*N,F.Wx+=(Math.random()-.5)*L*.1,F.Wh+=(Math.random()-.5)*L*.1,f(F),y(I=>[...I.slice(-4),`Loss: ${g.toFixed(4)}, Wy: ${F.Wy.toFixed(3)}, by: ${F.by.toFixed(3)}`])},T=[{title:"Input Encoding",desc:"Each item in the sequence is fed one at a time. We normalize: divide each number by 10 to keep values in a manageable range for tanh activation."},{title:"Hidden State Computation",desc:"h_t = tanh(Wx·x_t + Wh·h_{t-1} + b). The hidden state carries memory from all previous time steps. tanh squashes values to [-1, 1], preventing explosive growth."},{title:"Output Computation",desc:"y_t = Wy·h_t + by. We compute a prediction at each step — here, predicting the next number in the sequence."},{title:"BPTT — Backpropagation Through Time",desc:"Errors from all time steps are summed. Gradients flow backward through each time step. This is expensive: gradients must travel through the full sequence."},{title:"Vanishing Gradient Problem",desc:"In long sequences, gradients are multiplied by Wh at each step. If |Wh| < 1, gradients shrink exponentially → early time steps learn nothing. This is why LSTM and GRU were invented."}];return e.jsxs("div",{children:[e.jsxs(W,{color:o,title:"What is an RNN?",children:["A Recurrent Neural Network processes ",e.jsx("strong",{style:{color:o.main},children:"sequential data"})," — text, audio, time series — by maintaining a ",e.jsx("strong",{style:{color:o.main},children:"hidden state"})," that acts as memory. At each step, it reads the current input AND its own previous output, allowing it to understand context across time."]}),e.jsx(W,{color:o,title:"Why do we use it?",children:'Regular neural networks treat all inputs independently. But in a sentence, the word "bank" means different things depending on whether "river" appeared earlier. RNNs remember past context. They power language translation, speech recognition, and financial forecasting.'}),e.jsx(P,{color:o,children:"⏱ Unrolled RNN — Sequence Walkthrough"}),e.jsxs("div",{style:{background:"#0f172a",borderRadius:12,padding:20,marginBottom:16,border:`1px solid ${o.main}30`},children:[e.jsx("div",{style:{overflowX:"auto",paddingBottom:8},children:e.jsx("div",{style:{display:"flex",gap:0,alignItems:"center",minWidth:600},children:v.map((L,F)=>e.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[e.jsxs("div",{style:{textAlign:"center",minWidth:100},children:[e.jsxs("div",{style:{color:"#64748b",fontSize:11,marginBottom:4},children:["t=",L.t]}),e.jsxs("div",{style:{background:"#1e293b",border:`1px solid ${o.main}40`,borderRadius:4,padding:"2px 6px",color:"#94a3b8",fontSize:11,marginBottom:6},children:["x=",L.x.toFixed(2)]}),e.jsxs("div",{style:{background:o.bg,border:`2px solid ${o.main}`,borderRadius:10,padding:"12px 8px",margin:"4px 0",color:o.main,fontFamily:"'Courier New', monospace",fontSize:11},children:["RNN",e.jsx("br",{}),e.jsxs("span",{style:{color:"#e2e8f0",fontSize:10},children:["h=",L.hNew.toFixed(2)]})]}),e.jsxs("div",{style:{color:"#64748b",fontSize:10,marginTop:4},children:["y=",L.y.toFixed(2)]})]}),F<v.length-1&&e.jsx("div",{style:{color:o.main,fontSize:14,padding:"0 4px",marginTop:-16},children:"—→"})]},F))})}),e.jsx("div",{style:{color:"#64748b",fontSize:11,marginTop:8},children:"Arrow represents hidden state h flowing forward through time steps"})]}),e.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12},children:T.map((L,F)=>e.jsxs("button",{onClick:()=>l(F),style:{padding:"5px 12px",borderRadius:20,border:`1px solid ${o.main}`,background:a===F?o.main:"transparent",color:a===F?"#0f172a":o.main,fontFamily:"'Courier New', monospace",fontSize:11,cursor:"pointer"},children:["Step ",F+1]},F))}),e.jsxs("div",{style:{background:"#0f172a",borderRadius:12,padding:20,marginBottom:16,border:`1px solid ${o.main}30`},children:[e.jsx("div",{style:{color:o.main,fontWeight:700,marginBottom:8},children:T[a].title}),e.jsx("div",{style:{color:"#94a3b8",fontSize:13,lineHeight:1.7,marginBottom:12},children:T[a].desc}),a===1&&e.jsx(G,{color:o,children:`h_t = tanh(Wx·x_t + Wh·h_{t-1} + b)

At t=1:
  h_1 = tanh(${x.Wx.toFixed(3)} × ${((z=v[1])==null?void 0:z.x.toFixed(3))||"—"} + ${x.Wh.toFixed(3)} × ${((C=v[0])==null?void 0:C.hNew.toFixed(3))||"—"} + ${x.b.toFixed(3)})
      = tanh(${(x.Wx*(((k=v[1])==null?void 0:k.x)||0)+x.Wh*(((R=v[0])==null?void 0:R.hNew)||0)+x.b).toFixed(4)})
      = ${((E=v[1])==null?void 0:E.hNew.toFixed(4))||"—"}

Weights: Wx=${x.Wx.toFixed(3)}, Wh=${x.Wh.toFixed(3)}, b=${x.b.toFixed(3)}`}),a===3&&e.jsx(G,{color:o,children:`Loss = Σ 0.5×(target_t - y_t)²
     = ${g.toFixed(6)}

Gradient of Wy:
  ∂L/∂Wy = Σ (y_t - target_t) × h_t
          = ${b.map((L,F)=>`(${L.toFixed(2)}-${d[F].toFixed(2)})`).join(" + ")}...

Weight update:
  Wy_new = Wy_old − lr × ∂L/∂Wy
         = ${x.Wy.toFixed(3)} − ${n} × (...)`}),a===4&&e.jsx(G,{color:o,children:`After T steps of BPTT, gradient of early step:
  ∂L/∂h_0 ∝ (Wh)^T × (other terms)

If Wh = 0.3 and T = 10:
  0.3^10 = ${Math.pow(.3,10).toFixed(8)}  ← near zero!

If Wh = 1.5 and T = 10:
  1.5^10 = ${Math.pow(1.5,10).toFixed(2)}  ← exploding!

Solutions:
  • Gradient clipping: if ‖∇‖ > threshold, scale down
  • Use LSTM/GRU (learn what to remember/forget)
  • Shorter sequences / truncated BPTT`})]}),e.jsx(P,{color:o,children:"🏋️ Training Simulator"}),e.jsxs("div",{style:{background:"#0f172a",borderRadius:12,padding:20,border:`1px solid ${o.main}30`},children:[e.jsxs("div",{style:{display:"flex",gap:16,marginBottom:12,flexWrap:"wrap",alignItems:"center"},children:[e.jsxs("label",{style:{color:"#94a3b8",fontSize:13},children:["Learning rate: ",e.jsx("strong",{style:{color:o.main},children:n}),e.jsx("input",{type:"range",min:"0.001",max:"0.2",step:"0.001",value:n,onChange:L=>m(+L.target.value),style:{marginLeft:8,accentColor:o.main,width:120}})]}),e.jsx("button",{onClick:S,style:{padding:"8px 20px",borderRadius:8,border:"none",background:o.main,color:"#0f172a",fontWeight:700,fontFamily:"'Courier New', monospace",fontSize:13,cursor:"pointer"},children:"▶ Train Step"})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12},children:[["Current Loss",g.toFixed(4)],["Wy",x.Wy.toFixed(4)],["Wh",x.Wh.toFixed(4)]].map(([L,F])=>e.jsxs("div",{style:{background:o.bg,borderRadius:8,padding:10,textAlign:"center"},children:[e.jsx("div",{style:{color:"#64748b",fontSize:10,marginBottom:3},children:L}),e.jsx("div",{style:{color:o.main,fontSize:16,fontFamily:"'Courier New', monospace",fontWeight:700},children:F})]},L))}),p.length>0&&e.jsx("div",{style:{background:"#020617",borderRadius:8,padding:10,fontFamily:"'Courier New', monospace",fontSize:11,color:"#4ade80"},children:p.map((L,F)=>e.jsx("div",{children:L},F))})]})]})},Te=function(){const o=H.lstm,[a,l]=w.useState(.8),[s,r]=w.useState(.3),[n,m]=w.useState(.5),[c,f]=w.useState(0),[p,y]=w.useState(!1),x={x:.4,h:-.3,b:.1},u={x:.5,h:.2,b:-.1},v={x:.3,h:.4,b:.2},_={x:.6,h:-.2,b:0},d=D(x.x*a+x.h*s+x.b),b=D(u.x*a+u.h*s+u.b),g=D(v.x*a+v.h*s+v.b),S=Q(_.x*a+_.h*s+_.b),T=d*n+b*S,z=g*Q(T),C=[{id:"forget",label:"Forget Gate",symbol:"f",color:"#ef4444",gate:d,formula:"f = σ(Wf_x·x + Wf_h·h_prev + bf)",calc:`  = σ(${x.x}×${a} + ${x.h}×${s} + ${x.b})`,result:`  = σ(${(x.x*a+x.h*s+x.b).toFixed(4)}) = ${d.toFixed(4)}`,desc:`Controls what to ERASE from cell state. f≈0 → forget everything; f≈1 → keep everything. Value ${d.toFixed(3)} means we keep ${(d*100).toFixed(0)}% of old memory.`},{id:"input",label:"Input Gate",symbol:"i",color:"#22d3ee",gate:b,formula:"i = σ(Wi_x·x + Wi_h·h_prev + bi)",calc:`  = σ(${u.x}×${a} + ${u.h}×${s} + ${u.b})`,result:`  = σ(${(u.x*a+u.h*s+u.b).toFixed(4)}) = ${b.toFixed(4)}`,desc:"Controls how much NEW information to write. Works with the candidate gate (g) to decide what new information to store."},{id:"candidate",label:"Candidate Gate",symbol:"g",color:"#a78bfa",gate:S,formula:"g = tanh(Wg_x·x + Wg_h·h_prev + bg)",calc:`  = tanh(${_.x}×${a} + ${_.h}×${s} + ${_.b})`,result:`  = tanh(${(_.x*a+_.h*s+_.b).toFixed(4)}) = ${S.toFixed(4)}`,desc:"The proposed new content (in range [-1,1]). The input gate then scales this: only i×g actually gets written to memory."},{id:"cellupdate",label:"Cell State Update",symbol:"c",color:"#fbbf24",gate:T,formula:"c_new = f × c_prev + i × g",calc:`       = ${d.toFixed(3)} × ${n} + ${b.toFixed(3)} × ${S.toFixed(3)}`,result:`       = ${(d*n).toFixed(4)} + ${(b*S).toFixed(4)} = ${T.toFixed(4)}`,desc:"The long-term memory (cell state) is updated. We forget the old (×f) and write new info (i×g). This is the LSTM's key contribution — an uninterrupted gradient highway."},{id:"output",label:"Output Gate",symbol:"o",color:"#4ade80",gate:g,formula:"o = σ(Wo_x·x + Wo_h·h_prev + bo)",calc:`  = σ(${v.x}×${a} + ${v.h}×${s} + ${v.b})`,result:`  = σ(${(v.x*a+v.h*s+v.b).toFixed(4)}) = ${g.toFixed(4)}`,desc:"Controls what part of the updated cell state to expose as output (h_new). Filters the memory before passing it forward."},{id:"hidden",label:"New Hidden State",symbol:"h",color:o.main,gate:z,formula:"h_new = o × tanh(c_new)",calc:`       = ${g.toFixed(3)} × tanh(${T.toFixed(4)})`,result:`       = ${g.toFixed(3)} × ${Q(T).toFixed(4)} = ${z.toFixed(4)}`,desc:"The new hidden state output, passed to the next step AND used as prediction output. It's a filtered version of the cell memory."}];return e.jsxs("div",{children:[e.jsxs(W,{color:o,title:"What is LSTM?",children:["Long Short-Term Memory (1997, Hochreiter & Schmidhuber) solves the RNN's vanishing gradient problem by introducing a ",e.jsx("strong",{style:{color:o.main},children:"cell state"})," — a separate memory lane that information can flow through without repeated multiplication. Four gates (forget, input, candidate, output) control what gets stored, erased, and read."]}),e.jsxs(W,{color:o,title:"Why do we use it?",children:["LSTMs can remember relevant information across ",e.jsx("strong",{style:{color:o.main},children:"hundreds of time steps"}),". They power ChatGPT's predecessors, Google Translate, speech-to-text, and music generation. The gating mechanism learns when to remember and when to forget — entirely from data."]}),e.jsx(P,{color:o,children:"🔬 Gate-by-Gate Computation"}),e.jsxs("div",{style:{background:"#0f172a",borderRadius:12,padding:20,marginBottom:16,border:`1px solid ${o.main}30`},children:[e.jsx("div",{style:{display:"flex",gap:16,flexWrap:"wrap",marginBottom:20},children:[["x (input)",a,l],["h_prev",s,r],["c_prev",n,m]].map(([k,R,E])=>e.jsxs("label",{style:{color:"#94a3b8",fontSize:13},children:[k,": ",e.jsx("strong",{style:{color:o.main},children:R.toFixed(2)}),e.jsx("input",{type:"range",min:-1,max:1,step:.01,value:R,onChange:L=>E(+L.target.value),style:{marginLeft:8,accentColor:o.main,width:100}})]},k))}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16},children:C.map((k,R)=>e.jsxs("div",{onClick:()=>f(R),style:{background:c===R?`rgba(${k.color.replace("#","").match(/.{2}/g).map(E=>parseInt(E,16)).join(",")},0.15)`:"#1e293b",border:`2px solid ${c===R?k.color:k.color+"40"}`,borderRadius:10,padding:14,cursor:"pointer",transition:"all 0.2s"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:6},children:[e.jsx("span",{style:{color:k.color,fontWeight:700,fontSize:13},children:k.label}),e.jsx("span",{style:{color:k.color,fontFamily:"'Courier New', monospace",fontSize:14,fontWeight:700},children:k.gate.toFixed(3)})]}),e.jsx("div",{style:{background:"#0f172a",height:6,borderRadius:3,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",width:`${Math.abs(k.gate)*100}%`,background:k.color,borderRadius:3}})})]},k.id))}),e.jsxs("div",{style:{background:"#0f172a",borderRadius:10,padding:16,border:`1px solid ${C[c].color}40`},children:[e.jsx("div",{style:{color:C[c].color,fontWeight:700,fontSize:14,marginBottom:8},children:C[c].label}),e.jsx("div",{style:{color:"#94a3b8",fontSize:13,lineHeight:1.7,marginBottom:10},children:C[c].desc}),e.jsx(G,{color:{main:C[c].color},children:`${C[c].formula}
${C[c].calc}
${C[c].result}`})]})]}),e.jsxs(W,{color:o,title:"Why LSTM Solves Vanishing Gradients",children:["The cell state update ",e.jsx("code",{style:{color:o.main},children:"c_new = f·c_prev + i·g"}),' is ADDITIVE — we add new info rather than multiplying repeatedly. This creates a "gradient highway": ',e.jsx("code",{style:{color:o.main},children:"∂c_new/∂c_prev = f"})," which is just one sigmoid gate, not a product of Wh matrices at every step. Gradients flow much further back in time."]}),e.jsxs(W,{color:o,title:"Weight Update in LSTM",children:["There are 4 gates × 3 weight matrices (Wx, Wh, b) = 12 parameter groups per unit. All are updated via BPTT: ",e.jsx("code",{style:{color:o.main},children:"∂L/∂Wf = Σ_t (∂L/∂f_t · ∂f_t/∂Wf)"}),". The forget gate gradient is bounded by f(1-f) ≤ 0.25 per step, but the cell state path bypasses this multiplication."]})]})},Ce=function(){const o=H.gru,[a,l]=w.useState(.6),[s,r]=w.useState(.4),[n,m]=w.useState(0),[c,f]=w.useState(!1),p={x:.5,h:.3,b:-.1},y={x:.4,h:-.2,b:.2},x={x:.6,h:.4,b:0},u=D(p.x*a+p.h*s+p.b),v=D(y.x*a+y.h*s+y.b),_=Q(x.x*a+x.h*(v*s)+x.b),d=(1-u)*_+u*s,b=[{label:"Update Gate (z)",gate:u,col:"#fb923c",formula:"z = σ(Wz_x·x + Wz_h·h_prev + bz)",desc:"Decides how much of the PREVIOUS hidden state to keep vs. replace with new info. z≈1 → keep old state (skip this input). z≈0 → fully update with new info. Combines forget+input gate from LSTM into one.",result:`z = ${u.toFixed(4)}`},{label:"Reset Gate (r)",gate:v,col:"#fbbf24",formula:"r = σ(Wr_x·x + Wr_h·h_prev + br)",desc:"Decides how much of the PAST hidden state is relevant for computing the new candidate. r≈0 → ignore history when computing new candidate. Allows the network to drop irrelevant past context selectively.",result:`r = ${v.toFixed(4)}`},{label:"Candidate (ñ)",gate:_,col:"#a78bfa",formula:"ñ = tanh(Wn_x·x + Wn_h·(r × h_prev) + bn)",desc:"New candidate hidden state. The reset gate r modulates how much old hidden state influences this. With r=0, the candidate is purely from the current input (complete reset).",result:`ñ = ${_.toFixed(4)}`},{label:"New Hidden State (h)",gate:d,col:o.main,formula:"h_new = (1 - z)·ñ + z·h_prev",desc:'The final output. A linear interpolation between the old state and the new candidate. If z=1, output = old state (update gate says "skip"). If z=0, output = new candidate (full update). Elegant and interpretable.',result:`h_new = (1-${u.toFixed(3)})×${_.toFixed(3)} + ${u.toFixed(3)}×${s.toFixed(3)} = ${d.toFixed(4)}`}];return e.jsxs("div",{children:[e.jsxs(W,{color:o,title:"What is GRU?",children:["Gated Recurrent Unit (2014, Cho et al.) is a ",e.jsx("strong",{style:{color:o.main},children:"streamlined LSTM"}),'. It merges the forget and input gates into a single "update gate" and eliminates the separate cell state, achieving similar performance to LSTM with ',e.jsx("strong",{style:{color:o.main},children:"fewer parameters and faster training"}),"."]}),e.jsx(W,{color:o,title:"Why do we use it?",children:"When you don't need LSTM's full expressiveness, GRU trains faster and needs less data. It works well for medium-length sequences: video frame analysis, music generation, drug discovery, and sentiment analysis. GRU often matches or beats LSTM on many tasks with 25% fewer parameters."}),e.jsx(P,{color:o,children:"⚙️ GRU Gate Computation"}),e.jsxs("div",{style:{background:"#0f172a",borderRadius:12,padding:20,marginBottom:16,border:`1px solid ${o.main}30`},children:[e.jsx("div",{style:{display:"flex",gap:16,flexWrap:"wrap",marginBottom:20},children:[["x (input)",a,l],["h_prev",s,r]].map(([g,S,T])=>e.jsxs("label",{style:{color:"#94a3b8",fontSize:13},children:[g,": ",e.jsx("strong",{style:{color:o.main},children:S.toFixed(2)}),e.jsx("input",{type:"range",min:-1,max:1,step:.01,value:S,onChange:z=>T(+z.target.value),style:{marginLeft:8,accentColor:o.main,width:100}})]},g))}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16},children:b.map((g,S)=>e.jsxs("div",{onClick:()=>m(S),style:{background:n===S?"rgba(251,146,60,0.1)":"#1e293b",border:`2px solid ${n===S?g.col:g.col+"40"}`,borderRadius:10,padding:14,cursor:"pointer"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:6},children:[e.jsx("span",{style:{color:g.col,fontWeight:700,fontSize:13},children:g.label}),e.jsx("span",{style:{color:g.col,fontFamily:"'Courier New', monospace",fontSize:14},children:g.gate.toFixed(3)})]}),e.jsx("div",{style:{background:"#0f172a",height:6,borderRadius:3,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",width:`${Math.abs(g.gate)*100}%`,background:g.col,borderRadius:3}})})]},g.label))}),e.jsxs("div",{style:{background:"#0f172a",borderRadius:10,padding:16,border:`1px solid ${b[n].col}40`},children:[e.jsx("div",{style:{color:b[n].col,fontWeight:700,fontSize:14,marginBottom:8},children:b[n].label}),e.jsx("div",{style:{color:"#94a3b8",fontSize:13,lineHeight:1.7,marginBottom:10},children:b[n].desc}),e.jsx(G,{color:{main:b[n].col},children:`Formula: ${b[n].formula}
Result:  ${b[n].result}`})]})]}),e.jsx(P,{color:o,children:"⚖️ GRU vs LSTM Comparison"}),e.jsx("div",{style:{background:"#0f172a",borderRadius:12,padding:20,border:`1px solid ${o.main}30`},children:e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13},children:[e.jsx("thead",{children:e.jsx("tr",{children:["Property","RNN","LSTM","GRU"].map(g=>e.jsx("th",{style:{padding:"10px 14px",textAlign:"left",color:g==="GRU"?o.main:g==="LSTM"?"#f472b6":"#4ade80",fontFamily:"'Courier New', monospace",borderBottom:"1px solid #1e293b",fontWeight:700},children:g},g))})}),e.jsx("tbody",{children:[["Memory type","Hidden state only","Cell state + hidden","Hidden state only"],["# of gates","None","4 (f, i, o, g)","2 (z, r)"],["Parameters per unit","Small","Most","~75% of LSTM"],["Long-range memory","Poor","Excellent","Good"],["Training speed","Fast","Slowest","Faster than LSTM"],["Gradient flow","Vanishes","Highway (cell state)","Good (interpolation)"],["Best use case","Short sequences","Very long sequences","Medium sequences"]].map((g,S)=>e.jsx("tr",{style:{background:S%2===0?"#0f172a":"#080f1a"},children:g.map((T,z)=>e.jsx("td",{style:{padding:"9px 14px",color:z===0?"#94a3b8":z===3?o.main:"#64748b",borderBottom:"1px solid #1e293b10",fontFamily:z>0?"'Courier New', monospace":"inherit",fontSize:z===0?13:12},children:T},z))},S))})]})})}),e.jsxs(W,{color:o,title:"Error Handling & Weight Update in GRU",children:["GRU has ",e.jsx("strong",{style:{color:o.main},children:"3 gate matrices"})," (Wz, Wr, Wn each with Wx, Wh, b). Total: 3×3 = 9 parameter groups per unit. Gradients are computed via BPTT as with LSTM, but the linear interpolation ",e.jsx("code",{style:{color:o.main},children:"h = (1-z)·ñ + z·h_prev"})," provides a natural gradient flow: ",e.jsx("code",{style:{color:o.main},children:"∂h/∂h_prev ≥ z"}),", where z is bounded [0,1]. Weight updates use the same gradient descent: ",e.jsx("code",{style:{color:o.main},children:"W ← W − lr·∇L"}),", with Adam optimizer recommended for adaptive learning rates per weight."]})]})},Le=function(){const[o,a]=w.useState("lenet"),[l,s]=w.useState(!1);w.useEffect(()=>{s(!0)},[]);const r=H[o],m={lenet:we,googlenet:Se,vggnet:ze,rnn:ke,lstm:Te,gru:Ce}[o];return e.jsxs("div",{style:{minHeight:"100vh",background:"#020617",color:"#e2e8f0",fontFamily:"'Segoe UI', 'Helvetica Neue', sans-serif"},children:[e.jsx("div",{style:{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,background:`radial-gradient(ellipse 60% 40% at 50% 0%, ${r.glow}, transparent 70%)`}}),e.jsxs("div",{style:{position:"relative",zIndex:1,maxWidth:960,margin:"0 auto",padding:"24px 16px"},children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:32},children:[e.jsx("div",{style:{fontFamily:"'Courier New', monospace",fontSize:11,letterSpacing:6,color:"#475569",marginBottom:8,textTransform:"uppercase"},children:"Deep Learning Architecture Academy"}),e.jsx("h1",{style:{fontSize:"clamp(24px, 5vw, 40px)",fontWeight:800,margin:0,background:`linear-gradient(90deg, ${r.main}, #ffffff, ${r.main})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",letterSpacing:-1},children:"Neural Network Architectures"}),e.jsx("p",{style:{color:"#475569",fontSize:14,marginTop:8},children:"Interactive in-class activity — LeNet · GoogLeNet · VGGNet · RNN · LSTM · GRU"})]}),e.jsx("div",{style:{display:"flex",gap:4,flexWrap:"wrap",justifyContent:"center",marginBottom:28,background:"#0f172a",borderRadius:16,padding:6,border:"1px solid #1e293b"},children:M.map(c=>{const f=H[c.id],p=o===c.id;return e.jsxs("button",{onClick:()=>a(c.id),style:{padding:"8px 16px",borderRadius:12,border:p?`1px solid ${f.main}`:"1px solid transparent",background:p?f.bg:"transparent",color:p?f.main:"#475569",fontFamily:"'Courier New', monospace",fontSize:13,fontWeight:p?700:400,cursor:"pointer",transition:"all 0.2s",boxShadow:p?`0 0 12px ${f.glow}`:"none"},children:[c.emoji," ",c.label]},c.id)})}),e.jsx("div",{style:{background:"rgba(15,23,42,0.8)",borderRadius:20,border:`1px solid ${r.main}20`,padding:"28px 24px",boxShadow:`0 0 40px ${r.glow}`},children:l&&e.jsx(m,{},o)}),e.jsx("div",{style:{textAlign:"center",marginTop:24,color:"#334155",fontSize:11,fontFamily:"'Courier New', monospace"},children:"DEEP LEARNING ACADEMY · ALL COMPUTATIONS PERFORMED IN-BROWSER · NO EXTERNAL DEPENDENCIES"})]})]})},ce=['"""',"DEEP LEARNING MODELS - COMPLETE IMPLEMENTATION","Real Python Examples with Outputs","","This file contains production-ready implementations of:","1. CNN for Image Classification (ResNet-style)","2. LSTM for Text Generation","3. Transformer Encoder","4. GAN for Image Generation","5. Variational Autoencoder (VAE)","6. Transfer Learning (VGG16, ResNet50)","7. Object Detection (YOLO-style)","8. Semantic Segmentation (U-Net)","9. Complete training pipelines with outputs",'"""',"","import numpy as np","import tensorflow as tf","from tensorflow import keras","from tensorflow.keras import layers, models","from tensorflow.keras.datasets import mnist, cifar10","from tensorflow.keras.applications import VGG16, ResNet50","from tensorflow.keras.preprocessing import image","from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions","import matplotlib.pyplot as plt","from sklearn.model_selection import train_test_split","import time","",'print("="*80)','print("DEEP LEARNING MODELS - COMPLETE IMPLEMENTATION")','print("="*80)','print(f"TensorFlow version: {tf.__version__}")',`print(f"GPU Available: {len(tf.config.list_physical_devices('GPU')) > 0}")`,"","# =============================================================================","# 1. CNN WITH RESIDUAL CONNECTIONS (ResNet-style)","# =============================================================================","","def build_resnet_style_cnn():",'    """Build ResNet-style CNN with skip connections"""','    print("\\\\n" + "="*80)','    print("1. RESNET-STYLE CNN FOR IMAGE CLASSIFICATION")','    print("="*80)',"    ","    # Load CIFAR-10",'    print("\\\\n📥 Loading CIFAR-10 dataset...")',"    (x_train, y_train), (x_test, y_test) = cifar10.load_data()","    ","    class_names = ['airplane', 'automobile', 'bird', 'cat', 'deer',","                   'dog', 'frog', 'horse', 'ship', 'truck']","    ",'    print(f"   Training samples: {x_train.shape[0]:,}")','    print(f"   Test samples: {x_test.shape[0]:,}")','    print(f"   Image shape: {x_train.shape[1:]}") ','    print(f"   Classes: {len(class_names)}")',"    ","    # Normalize","    x_train = x_train.astype('float32') / 255.0","    x_test = x_test.astype('float32') / 255.0","    ","    # Subsample for demo","    x_train_sub = x_train[:10000]","    y_train_sub = y_train[:10000]","    x_test_sub = x_test[:2000]","    y_test_sub = y_test[:2000]","    ","    # Build ResNet-style model",'    print("\\\\n🏗️  Building ResNet-style CNN...")',"    ","    def residual_block(x, filters, stride=1):",'        """Residual block with skip connection"""',"        shortcut = x","        ","        # Main path","        x = layers.Conv2D(filters, 3, strides=stride, padding='same')(x)","        x = layers.BatchNormalization()(x)","        x = layers.ReLU()(x)","        ","        x = layers.Conv2D(filters, 3, padding='same')(x)","        x = layers.BatchNormalization()(x)","        ","        # Adjust shortcut dimensions if needed","        if stride != 1:","            shortcut = layers.Conv2D(filters, 1, strides=stride)(shortcut)","            shortcut = layers.BatchNormalization()(shortcut)","        ","        # Add skip connection","        x = layers.Add()([x, shortcut])","        x = layers.ReLU()(x)","        ","        return x","    ","    # Build model","    inputs = layers.Input(shape=(32, 32, 3))","    ","    # Initial conv","    x = layers.Conv2D(64, 3, padding='same')(inputs)","    x = layers.BatchNormalization()(x)","    x = layers.ReLU()(x)","    ","    # Residual blocks","    x = residual_block(x, 64)","    x = residual_block(x, 64)","    x = residual_block(x, 128, stride=2)","    x = residual_block(x, 128)","    x = residual_block(x, 256, stride=2)","    x = residual_block(x, 256)","    ","    # Classification head","    x = layers.GlobalAveragePooling2D()(x)","    x = layers.Dense(10, activation='softmax')(x)","    ","    model = models.Model(inputs, x, name='ResNet_Style_CNN')","    ",'    print("\\\\n" + "="*60)',"    model.summary()",'    print("="*60)',"    ","    # Compile","    model.compile(","        optimizer='adam',","        loss='sparse_categorical_crossentropy',","        metrics=['accuracy']","    )","    ","    # Train",'    print("\\\\n🎓 Training model...")',"    history = model.fit(","        x_train_sub, y_train_sub,","        batch_size=128,","        epochs=5,","        validation_split=0.2,","        verbose=1","    )","    ","    # Evaluate",'    print("\\\\n📊 Evaluating...")',"    test_loss, test_acc = model.evaluate(x_test_sub, y_test_sub, verbose=0)","    ",'    print(f"\\\\n✅ RESULTS:")','    print(f"   Test Accuracy: {test_acc*100:.2f}%")','    print(f"   Test Loss: {test_loss:.4f}")',"    ","    # Predictions",'    print("\\\\n🔮 Sample Predictions:")',"    predictions = model.predict(x_test_sub[:10], verbose=0)","    ","    for i in range(10):","        pred_idx = np.argmax(predictions[i])","        true_idx = y_test_sub[i][0]","        confidence = predictions[i][pred_idx] * 100","        ",'        status = "✓" if pred_idx == true_idx else "✗"','        print(f"   {status} Image {i+1}: True={class_names[true_idx]:10s}, "','              f"Pred={class_names[pred_idx]:10s}, Conf={confidence:.2f}%")',"    ","    return model, history","","","# =============================================================================","# 2. LSTM FOR TEXT GENERATION","# =============================================================================","","def build_lstm_text_generator():",'    """Build LSTM for character-level text generation"""','    print("\\\\n" + "="*80)','    print("2. LSTM FOR TEXT GENERATION")','    print("="*80)',"    ","    # Sample text corpus",'    text = """Deep learning is a subset of machine learning that uses neural networks ',"    with multiple layers. These models can learn hierarchical representations of data.","    Convolutional neural networks excel at computer vision tasks, while recurrent networks",'    handle sequential data. Transformers have revolutionized natural language processing."""',"    ","    text = text.lower()","    ",'    print(f"\\\\n📝 Text corpus length: {len(text)} characters")',"    ","    # Create character mappings","    chars = sorted(set(text))","    char_to_idx = {c: i for i, c in enumerate(chars)}","    idx_to_char = {i: c for i, c in enumerate(chars)}","    ",'    print(f"   Unique characters: {len(chars)}")','    print(f"   Characters: {chars[:20]}...")',"    ","    # Create training sequences","    seq_length = 40","    step = 3","    ","    sequences = []","    next_chars = []","    ","    for i in range(0, len(text) - seq_length, step):","        sequences.append(text[i:i + seq_length])","        next_chars.append(text[i + seq_length])","    ",'    print(f"\\\\n📊 Training sequences: {len(sequences)}")',"    ","    # Vectorize","    X = np.zeros((len(sequences), seq_length, len(chars)), dtype=np.float32)","    y = np.zeros((len(sequences), len(chars)), dtype=np.float32)","    ","    for i, seq in enumerate(sequences):","        for t, char in enumerate(seq):","            X[i, t, char_to_idx[char]] = 1","        y[i, char_to_idx[next_chars[i]]] = 1","    ",'    print(f"   X shape: {X.shape}")','    print(f"   y shape: {y.shape}")',"    ","    # Build LSTM model",'    print("\\\\n🏗️  Building LSTM model...")',"    ","    model = models.Sequential([","        layers.LSTM(128, input_shape=(seq_length, len(chars)), return_sequences=True),","        layers.Dropout(0.2),","        layers.LSTM(128),","        layers.Dropout(0.2),","        layers.Dense(len(chars), activation='softmax')","    ], name='LSTM_TextGen')","    ","    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])","    ",'    print("\\\\n" + "="*60)',"    model.summary()",'    print("="*60)',"    ","    # Train",'    print("\\\\n🎓 Training LSTM...")',"    history = model.fit(X, y, batch_size=64, epochs=10, validation_split=0.1, verbose=1)","    ","    # Generate text",'    print("\\\\n✍️  Generating text...")',"    ","    def generate_text(model, seed_text, length=100, temperature=0.5):","        generated = seed_text","        ","        for _ in range(length):","            # Prepare input","            x_pred = np.zeros((1, seq_length, len(chars)))","            for t, char in enumerate(seed_text[-seq_length:]):","                if char in char_to_idx:","                    x_pred[0, t, char_to_idx[char]] = 1","            ","            # Predict next character","            preds = model.predict(x_pred, verbose=0)[0]","            ","            # Sample with temperature","            preds = np.log(preds + 1e-10) / temperature","            exp_preds = np.exp(preds)","            preds = exp_preds / np.sum(exp_preds)","            ","            next_idx = np.random.choice(len(chars), p=preds)","            next_char = idx_to_char[next_idx]","            ","            generated += next_char","            seed_text += next_char","        ","        return generated","    ",'    seed = "deep learning is"',"    generated = generate_text(model, seed, length=150)","    ",`    print(f"\\\\n📄 Generated text (seed: '{seed}'):")`,'    print("-" * 70)',"    print(generated)",'    print("-" * 70)',"    ","    return model, history","","","# =============================================================================","# 3. SIMPLE GAN FOR IMAGE GENERATION","# =============================================================================","","def build_simple_gan():",'    """Build simple GAN for MNIST digit generation"""','    print("\\\\n" + "="*80)','    print("3. GAN FOR IMAGE GENERATION")','    print("="*80)',"    ","    # Load MNIST",'    print("\\\\n📥 Loading MNIST...")',"    (x_train, _), (_, _) = mnist.load_data()","    ","    # Normalize to [-1, 1]","    x_train = (x_train.astype('float32') - 127.5) / 127.5","    x_train = np.expand_dims(x_train, axis=-1)","    ",'    print(f"   Training samples: {x_train.shape[0]:,}")','    print(f"   Image shape: {x_train.shape[1:]}")',"    ","    # Use subset for demo","    x_train = x_train[:10000]","    ","    # Build Generator",'    print("\\\\n🏗️  Building Generator...")',"    ","    latent_dim = 100","    ","    generator = models.Sequential([","        layers.Dense(7 * 7 * 128, input_dim=latent_dim),","        layers.Reshape((7, 7, 128)),","        layers.BatchNormalization(),","        layers.ReLU(),","        ","        layers.Conv2DTranspose(128, 5, strides=1, padding='same'),","        layers.BatchNormalization(),","        layers.ReLU(),","        ","        layers.Conv2DTranspose(64, 5, strides=2, padding='same'),","        layers.BatchNormalization(),","        layers.ReLU(),","        ","        layers.Conv2DTranspose(1, 5, strides=2, padding='same', activation='tanh')","    ], name='Generator')","    ",'    print("\\\\n📊 Generator Architecture:")',"    generator.summary()","    ","    # Build Discriminator",'    print("\\\\n🏗️  Building Discriminator...")',"    ","    discriminator = models.Sequential([","        layers.Conv2D(64, 5, strides=2, padding='same', input_shape=(28, 28, 1)),","        layers.LeakyReLU(0.2),","        layers.Dropout(0.3),","        ","        layers.Conv2D(128, 5, strides=2, padding='same'),","        layers.LeakyReLU(0.2),","        layers.Dropout(0.3),","        ","        layers.Flatten(),","        layers.Dense(1, activation='sigmoid')","    ], name='Discriminator')","    ",'    print("\\\\n📊 Discriminator Architecture:")',"    discriminator.summary()","    ","    # Compile discriminator","    discriminator.compile(","        optimizer=keras.optimizers.Adam(0.0002, 0.5),","        loss='binary_crossentropy',","        metrics=['accuracy']","    )","    ","    # Build combined model (for training generator)","    discriminator.trainable = False","    ","    gan_input = layers.Input(shape=(latent_dim,))","    generated_image = generator(gan_input)","    gan_output = discriminator(generated_image)","    ","    gan = models.Model(gan_input, gan_output, name='GAN')","    gan.compile(optimizer=keras.optimizers.Adam(0.0002, 0.5), loss='binary_crossentropy')","    ","    # Training",'    print("\\\\n🎓 Training GAN...")',"    ","    batch_size = 128","    epochs = 5","    ","    for epoch in range(epochs):","        # Train Discriminator","        idx = np.random.randint(0, x_train.shape[0], batch_size)","        real_images = x_train[idx]","        ","        noise = np.random.normal(0, 1, (batch_size, latent_dim))","        fake_images = generator.predict(noise, verbose=0)","        ","        d_loss_real = discriminator.train_on_batch(real_images, np.ones((batch_size, 1)))","        d_loss_fake = discriminator.train_on_batch(fake_images, np.zeros((batch_size, 1)))","        d_loss = 0.5 * np.add(d_loss_real, d_loss_fake)","        ","        # Train Generator","        noise = np.random.normal(0, 1, (batch_size, latent_dim))","        g_loss = gan.train_on_batch(noise, np.ones((batch_size, 1)))","        ","        if epoch % 1 == 0:",'            print(f"   Epoch {epoch+1}/{epochs} - D Loss: {d_loss[0]:.4f}, "','                  f"D Acc: {d_loss[1]*100:.2f}%, G Loss: {g_loss:.4f}")',"    ","    # Generate samples",'    print("\\\\n🎨 Generating sample images...")',"    noise = np.random.normal(0, 1, (16, latent_dim))","    generated_images = generator.predict(noise, verbose=0)","    ",'    print(f"   Generated {len(generated_images)} images")','    print(f"   Image shape: {generated_images[0].shape}")','    print(f"   Value range: [{generated_images.min():.2f}, {generated_images.max():.2f}]")',"    ","    return generator, discriminator, gan","","","# =============================================================================","# 4. VARIATIONAL AUTOENCODER (VAE)","# =============================================================================","","def build_vae():",'    """Build Variational Autoencoder"""','    print("\\\\n" + "="*80)','    print("4. VARIATIONAL AUTOENCODER (VAE)")','    print("="*80)',"    ","    # Load MNIST",'    print("\\\\n📥 Loading MNIST...")',"    (x_train, _), (x_test, _) = mnist.load_data()","    ","    x_train = x_train.astype('float32') / 255.0","    x_test = x_test.astype('float32') / 255.0","    ","    x_train = x_train.reshape(-1, 28, 28, 1)","    x_test = x_test.reshape(-1, 28, 28, 1)","    ","    # Use subset","    x_train = x_train[:10000]","    x_test = x_test[:2000]","    ",'    print(f"   Training samples: {x_train.shape[0]:,}")',"    ","    # VAE parameters","    latent_dim = 2  # 2D for visualization","    ","    # Encoder",'    print("\\\\n🏗️  Building VAE Encoder...")',"    ","    encoder_inputs = layers.Input(shape=(28, 28, 1))","    x = layers.Conv2D(32, 3, strides=2, padding='same', activation='relu')(encoder_inputs)","    x = layers.Conv2D(64, 3, strides=2, padding='same', activation='relu')(x)","    x = layers.Flatten()(x)","    x = layers.Dense(16, activation='relu')(x)","    ","    z_mean = layers.Dense(latent_dim, name='z_mean')(x)","    z_log_var = layers.Dense(latent_dim, name='z_log_var')(x)","    ","    # Sampling layer","    class Sampling(layers.Layer):","        def call(self, inputs):","            z_mean, z_log_var = inputs","            batch = tf.shape(z_mean)[0]","            dim = tf.shape(z_mean)[1]","            epsilon = tf.random.normal(shape=(batch, dim))","            return z_mean + tf.exp(0.5 * z_log_var) * epsilon","    ","    z = Sampling()([z_mean, z_log_var])","    ","    encoder = models.Model(encoder_inputs, [z_mean, z_log_var, z], name='encoder')","    ",'    print("\\\\n📊 Encoder Architecture:")',"    encoder.summary()","    ","    # Decoder",'    print("\\\\n🏗️  Building VAE Decoder...")',"    ","    latent_inputs = layers.Input(shape=(latent_dim,))","    x = layers.Dense(7 * 7 * 64, activation='relu')(latent_inputs)","    x = layers.Reshape((7, 7, 64))(x)","    x = layers.Conv2DTranspose(64, 3, strides=2, padding='same', activation='relu')(x)","    x = layers.Conv2DTranspose(32, 3, strides=2, padding='same', activation='relu')(x)","    decoder_outputs = layers.Conv2DTranspose(1, 3, padding='same', activation='sigmoid')(x)","    ","    decoder = models.Model(latent_inputs, decoder_outputs, name='decoder')","    ",'    print("\\\\n📊 Decoder Architecture:")',"    decoder.summary()","    ","    # VAE Model","    class VAE(keras.Model):","        def __init__(self, encoder, decoder, **kwargs):","            super().__init__(**kwargs)","            self.encoder = encoder","            self.decoder = decoder",'            self.total_loss_tracker = keras.metrics.Mean(name="total_loss")','            self.reconstruction_loss_tracker = keras.metrics.Mean(name="recon_loss")','            self.kl_loss_tracker = keras.metrics.Mean(name="kl_loss")',"        ","        def call(self, inputs):","            z_mean, z_log_var, z = self.encoder(inputs)","            reconstruction = self.decoder(z)","            return reconstruction","        ","        def train_step(self, data):","            with tf.GradientTape() as tape:","                z_mean, z_log_var, z = self.encoder(data)","                reconstruction = self.decoder(z)","                ","                reconstruction_loss = tf.reduce_mean(","                    tf.reduce_sum(","                        keras.losses.binary_crossentropy(data, reconstruction),","                        axis=(1, 2)","                    )","                )","                ","                kl_loss = -0.5 * (1 + z_log_var - tf.square(z_mean) - tf.exp(z_log_var))","                kl_loss = tf.reduce_mean(tf.reduce_sum(kl_loss, axis=1))","                ","                total_loss = reconstruction_loss + kl_loss","            ","            grads = tape.gradient(total_loss, self.trainable_weights)","            self.optimizer.apply_gradients(zip(grads, self.trainable_weights))","            ","            self.total_loss_tracker.update_state(total_loss)","            self.reconstruction_loss_tracker.update_state(reconstruction_loss)","            self.kl_loss_tracker.update_state(kl_loss)","            ","            return {",'                "loss": self.total_loss_tracker.result(),','                "recon_loss": self.reconstruction_loss_tracker.result(),','                "kl_loss": self.kl_loss_tracker.result(),',"            }","    ","    vae = VAE(encoder, decoder)","    vae.compile(optimizer=keras.optimizers.Adam(0.001))","    ","    # Train",'    print("\\\\n🎓 Training VAE...")',"    history = vae.fit(x_train, epochs=5, batch_size=128, validation_data=(x_test, x_test))","    ","    # Generate samples",'    print("\\\\n🎨 Generating samples from latent space...")',"    ","    # Sample from latent space","    n = 10","    digit_size = 28","    grid_x = np.linspace(-3, 3, n)","    grid_y = np.linspace(-3, 3, n)","    ",'    print(f"   Sampling {n*n} points from 2D latent space")',"    ","    samples = []","    for i, yi in enumerate(grid_y):","        for j, xi in enumerate(grid_x):","            z_sample = np.array([[xi, yi]])","            x_decoded = decoder.predict(z_sample, verbose=0)","            samples.append(x_decoded[0])","    ",'    print(f"   Generated {len(samples)} samples")',"    ","    return vae, encoder, decoder","","","# =============================================================================","# 5. TRANSFER LEARNING WITH RESNET50","# =============================================================================","","def transfer_learning_demo():",'    """Demonstrate transfer learning with ResNet50"""','    print("\\\\n" + "="*80)','    print("5. TRANSFER LEARNING WITH RESNET50")','    print("="*80)',"    ",'    print("\\\\n📥 Loading pre-trained ResNet50...")',"    ","    base_model = ResNet50(","        weights='imagenet',","        include_top=False,","        input_shape=(224, 224, 3)","    )","    ",'    print(f"   Model: ResNet50")','    print(f"   Pre-trained on: ImageNet")','    print(f"   Total layers: {len(base_model.layers)}")','    print(f"   Parameters: {base_model.count_params():,}")',"    ","    # Freeze base model","    base_model.trainable = False","    ",'    print(f"   Frozen base model: {sum([1 for layer in base_model.layers if not layer.trainable])}/{len(base_model.layers)} layers")',"    ","    # Add custom head for binary classification",'    print("\\\\n🏗️  Adding custom classification head...")',"    ","    inputs = layers.Input(shape=(224, 224, 3))","    x = base_model(inputs, training=False)","    x = layers.GlobalAveragePooling2D()(x)","    x = layers.Dense(256, activation='relu')(x)","    x = layers.Dropout(0.5)(x)","    outputs = layers.Dense(2, activation='softmax')(x)  # Binary: cats vs dogs","    ","    model = models.Model(inputs, outputs, name='ResNet50_Transfer')","    ",'    print("\\\\n📊 Full Model:")','    print(f"   Total parameters: {model.count_params():,}")','    print(f"   Trainable parameters: {sum([tf.size(w).numpy() for w in model.trainable_weights]):,}")','    print(f"   Non-trainable parameters: {sum([tf.size(w).numpy() for w in model.non_trainable_weights]):,}")',"    ","    model.compile(","        optimizer=keras.optimizers.Adam(0.0001),","        loss='sparse_categorical_crossentropy',","        metrics=['accuracy']","    )","    ","    # Create dummy data",'    print("\\\\n📊 Creating dummy training data...")',"    x_dummy = np.random.rand(100, 224, 224, 3).astype('float32')","    y_dummy = np.random.randint(0, 2, (100,))","    ",'    print(f"   Training samples: {x_dummy.shape[0]}")','    print(f"   Classes: 2 (cats vs dogs simulation)")',"    ","    # Train",'    print("\\\\n🎓 Fine-tuning on new data...")',"    history = model.fit(","        x_dummy, y_dummy,","        batch_size=16,","        epochs=3,","        validation_split=0.2,","        verbose=1","    )","    ","    # Make prediction on random image",'    print("\\\\n🔮 Making prediction on sample image...")',"    ","    sample = np.random.rand(1, 224, 224, 3).astype('float32')","    pred = model.predict(sample, verbose=0)","    ","    class_names = ['Cat', 'Dog']","    pred_class = np.argmax(pred[0])","    confidence = pred[0][pred_class] * 100","    ",'    print(f"   Predicted: {class_names[pred_class]} (Confidence: {confidence:.2f}%)")',"    ","    # Show feature extraction capability",'    print("\\\\n📊 Extracting features...")',"    features = base_model.predict(sample, verbose=0)",'    print(f"   Feature shape: {features.shape}")','    print(f"   Feature values (first 10): {features.flatten()[:10]}")',"    ","    return model","","","# =============================================================================","# 6. SIMPLE TRANSFORMER ENCODER","# =============================================================================","","def build_transformer_encoder():",'    """Build simple Transformer encoder"""','    print("\\\\n" + "="*80)','    print("6. TRANSFORMER ENCODER")','    print("="*80)',"    ",'    print("\\\\n🏗️  Building Transformer Encoder block...")',"    ","    class TransformerBlock(layers.Layer):","        def __init__(self, embed_dim, num_heads, ff_dim, rate=0.1):","            super().__init__()","            self.att = layers.MultiHeadAttention(num_heads=num_heads, key_dim=embed_dim)","            self.ffn = keras.Sequential([",'                layers.Dense(ff_dim, activation="relu"),',"                layers.Dense(embed_dim),","            ])","            self.layernorm1 = layers.LayerNormalization(epsilon=1e-6)","            self.layernorm2 = layers.LayerNormalization(epsilon=1e-6)","            self.dropout1 = layers.Dropout(rate)","            self.dropout2 = layers.Dropout(rate)","        ","        def call(self, inputs, training):","            attn_output = self.att(inputs, inputs)","            attn_output = self.dropout1(attn_output, training=training)","            out1 = self.layernorm1(inputs + attn_output)","            ffn_output = self.ffn(out1)","            ffn_output = self.dropout2(ffn_output, training=training)","            return self.layernorm2(out1 + ffn_output)","    ","    # Build classification model","    vocab_size = 10000","    maxlen = 50","    embed_dim = 32","    num_heads = 2","    ff_dim = 32","    ","    inputs = layers.Input(shape=(maxlen,))","    embedding_layer = layers.Embedding(vocab_size, embed_dim)(inputs)","    transformer_block = TransformerBlock(embed_dim, num_heads, ff_dim)","    x = transformer_block(embedding_layer, training=False)","    x = layers.GlobalAveragePooling1D()(x)","    x = layers.Dropout(0.1)(x)",'    x = layers.Dense(20, activation="relu")(x)',"    x = layers.Dropout(0.1)(x)",'    outputs = layers.Dense(2, activation="softmax")(x)',"    ","    model = models.Model(inputs=inputs, outputs=outputs, name='Transformer_Encoder')","    ",'    print("\\\\n📊 Model Architecture:")',"    model.summary()","    ",'    print("\\\\n✅ Key Components:")','    print("   • Multi-Head Attention: Attends to different positions")','    print("   • Feed-Forward Network: Position-wise transformation")','    print("   • Layer Normalization: Stabilizes training")','    print("   • Residual Connections: Skip connections for gradient flow")',"    ","    # Create dummy sequential data",'    print("\\\\n📊 Creating dummy sequential data...")',"    x_dummy = np.random.randint(0, vocab_size, (1000, maxlen))","    y_dummy = np.random.randint(0, 2, (1000,))","    ","    model.compile(","        optimizer='adam',","        loss='sparse_categorical_crossentropy',","        metrics=['accuracy']","    )","    ","    # Train",'    print("\\\\n🎓 Training Transformer...")',"    history = model.fit(","        x_dummy, y_dummy,","        batch_size=32,","        epochs=3,","        validation_split=0.2,","        verbose=1","    )","    ","    return model","","","# =============================================================================","# MAIN EXECUTION","# =============================================================================","",'if __name__ == "__main__":','    print("\\\\n" + "="*80)','    print("RUNNING ALL DEEP LEARNING DEMONSTRATIONS")','    print("="*80)',"    ","    try:","        # 1. ResNet-style CNN","        resnet_model, resnet_history = build_resnet_style_cnn()","        ","        # 2. LSTM Text Generation","        lstm_model, lstm_history = build_lstm_text_generator()","        ","        # 3. GAN","        generator, discriminator, gan = build_simple_gan()","        ","        # 4. VAE","        vae, encoder, decoder = build_vae()","        ","        # 5. Transfer Learning","        transfer_model = transfer_learning_demo()","        ","        # 6. Transformer","        transformer_model = build_transformer_encoder()","        ",'        print("\\\\n" + "="*80)','        print("✅ ALL DEMONSTRATIONS COMPLETED SUCCESSFULLY!")','        print("="*80)',"        ",'        print("\\\\n📝 Summary:")','        print("   ✓ ResNet-style CNN for image classification")','        print("   ✓ LSTM for character-level text generation")','        print("   ✓ GAN for digit generation")','        print("   ✓ VAE for probabilistic generation")','        print("   ✓ Transfer learning with ResNet50")','        print("   ✓ Transformer encoder architecture")',"        ","    except Exception as e:",'        print(f"\\\\n❌ Error: {e}")',"        import traceback","        traceback.print_exc()","",'print("\\\\n" + "="*80)','print("PROGRAM COMPLETE")','print("="*80)'],Fe=function(){const[o,a]=w.useState(!1),l=()=>{navigator.clipboard.writeText(ce.join(`
`)).then(()=>{a(!0),setTimeout(()=>a(!1),2e3)})};return e.jsx("div",{style:{minHeight:"100vh",background:"#0d1117",padding:"24px"},children:e.jsxs("div",{style:{maxWidth:900,margin:"0 auto"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16},children:[e.jsxs("div",{children:[e.jsx("h1",{style:{color:"#58a6ff",fontFamily:"monospace",fontSize:20,margin:0},children:"Deep Learning Implementation"}),e.jsx("p",{style:{color:"#8b949e",fontFamily:"monospace",fontSize:12,margin:"4px 0 0"},children:"15. Deep Learning Implementation.py  Production-ready Python Examples"})]}),e.jsx("button",{onClick:l,style:{padding:"8px 16px",background:o?"#238636":"#21262d",color:o?"#fff":"#c9d1d9",border:"1px solid #30363d",borderRadius:6,fontFamily:"monospace",fontSize:12,cursor:"pointer"},children:o?" Copied":"Copy Code"})]}),e.jsxs("div",{style:{background:"#161b22",border:"1px solid #30363d",borderRadius:8,overflow:"auto",maxHeight:"calc(100vh - 160px)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",padding:"8px 16px",background:"#21262d",borderBottom:"1px solid #30363d",borderRadius:"8px 8px 0 0"},children:[e.jsx("span",{style:{width:12,height:12,borderRadius:"50%",background:"#ff5f57",marginRight:6}}),e.jsx("span",{style:{width:12,height:12,borderRadius:"50%",background:"#febc2e",marginRight:6}}),e.jsx("span",{style:{width:12,height:12,borderRadius:"50%",background:"#28c840",marginRight:8}}),e.jsx("span",{style:{color:"#8b949e",fontFamily:"monospace",fontSize:12},children:"deep_learning_implementation.py"})]}),e.jsx("pre",{style:{margin:0,padding:16,fontFamily:"monospace",fontSize:13,lineHeight:1.6,color:"#e6edf3",whiteSpace:"pre",overflowX:"auto"},children:ce.map((s,r)=>e.jsxs("div",{style:{display:"flex",minHeight:"1.6em"},children:[e.jsx("span",{style:{color:"#6e7681",userSelect:"none",minWidth:40,textAlign:"right",paddingRight:16},children:r+1}),e.jsx("span",{style:{color:"#e6edf3"},children:s})]},r))})]})]})})},i={bg:"#0c0f14",panel:"#12161e",card:"#181d28",border:"#1e2535",muted:"#2a3347",text:"#c9d1e0",dim:"#5a6580",gold:"#f0c040",teal:"#2dd4bf",rose:"#fb7185",violet:"#a78bfa",sky:"#38bdf8",green:"#4ade80",orange:"#fb923c"},Re="@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;0,700;1,300;1,400&family=JetBrains+Mono:wght@300;400;500;700&display=swap');",O=[{id:"weights",label:"Weights & Bias",icon:"⊕",color:i.teal,formula:"z = w₁x₁ + w₂x₂ + … + wₙxₙ + b",concept:`A weight (w) scales how strongly an input influences a neuron. A bias (b) shifts the activation threshold, allowing a neuron to fire even when inputs are zero.

Core computation for one neuron:
  z = Σ(wᵢ · xᵢ) + b      ← pre-activation (linear)
  a = activation(z)         ← post-activation (non-linear)

Weights and biases are the LEARNABLE PARAMETERS — updated via backpropagation (gradient descent) during training.

Layer (matrix form):
  Z = X · Wᵀ + b
  where X:(batch×in), W:(out×in), b:(out,)

Weight initialization matters:
  Xavier/Glorot: Var(w) = 2/(fan_in + fan_out)
  He/Kaiming:   Var(w) = 2/fan_in  (for ReLU layers)`,activities:[{q:`# ── ACTIVITY 1 ── Compute Neuron Output ──────────────────
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
print(f"output = {output:.4f}")`,sol:`import numpy as np

x = np.array([0.5, 0.8, 0.3])
w = np.array([0.4, -0.6, 0.9])
b = 0.1

z      = np.dot(w, x) + b      # 0.4*0.5 + (-0.6)*0.8 + 0.9*0.3 + 0.1 = 0.07
output = np.maximum(0, z)      # ReLU

print(f"z      = {z:.4f}")     # z      = 0.0700
print(f"output = {output:.4f}")# output = 0.0700`,hint:"np.dot(w,x) gives the weighted sum. ReLU = np.maximum(0, z)."},{q:`# ── ACTIVITY 2 ── Dense Layer from Scratch ───────────────
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
print("out:", out.round(4))`,sol:`import numpy as np

np.random.seed(42)
W = np.random.randn(4, 3) * 0.1
b = np.zeros(3)
x = np.array([1.0, 0.5, -0.3, 0.8])

z       = x @ W + b                        # (4,) @ (4,3) = (3,)
sigmoid = lambda v: 1 / (1 + np.exp(-v))
out     = sigmoid(z)

print("z  :", z.round(4))
print("out:", out.round(4))`,hint:"Matrix multiply x (4,) @ W (4,3) gives z (3,). Then apply sigmoid element-wise."}]},{id:"activation",label:"Activation Functions",icon:"ƒ",color:i.rose,formula:"ReLU=max(0,x)  |  σ(x)=1/(1+e⁻ˣ)  |  tanh=(eˣ−e⁻ˣ)/(eˣ+e⁻ˣ)",concept:`Activation functions introduce non-linearity. Without them, stacking layers collapses to one linear transformation.

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
Fix: Leaky ReLU, ELU, or careful weight initialization.`,activities:[{q:`# ── ACTIVITY 3 ── Implement All Activation Functions ──────
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
print(f"Softmax: {softmax(logits).round(4)}  sum={softmax(logits).sum():.4f}")`,sol:`import numpy as np

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
print(f"Softmax: {softmax(logits).round(4)}  sum={softmax(logits).sum():.4f}")`,hint:"ReLU=np.maximum, LeakyReLU=np.where, tanh=np.tanh, Softmax: subtract max first for stability."},{q:`# ── ACTIVITY 4 ── Softmax & Cross-Entropy Loss ────────────
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
print(f"Predicted class: {np.argmax(probs)}")`,sol:`import numpy as np

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
print(f"Predicted class: {np.argmax(probs)}")  # 0 (correct!)`,hint:"Stable softmax: exp(z - max(z))/sum. Cross-entropy: -log(prob of correct class)."}]},{id:"cnn",label:"CNN / VGGNet",icon:"⊞",color:i.sky,formula:"F[i,j] = Σₖₗ W[k,l]·X[i+k,j+l] + b   |   out_size = (W−K+2P)/S + 1",concept:`CNN exploits SPATIAL STRUCTURE via learnable filters sliding across input.

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
fewer parameters and one extra non-linearity.`,activities:[{q:`# ── ACTIVITY 5 ── Manual 2D Convolution ──────────────────
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

print(out.astype(int))`,sol:`import numpy as np

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
#  [ -3  -7  -6]]`,hint:"Slice image[i:i+kH, j:j+kW] (a 3×3 patch), element-wise multiply with kernel, then np.sum."},{q:`# ── ACTIVITY 6 ── VGGNet Block in PyTorch ─────────────────
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
print(blk(x).shape)    # expect torch.Size([1, 64, 112, 112])`,sol:`import torch, torch.nn as nn

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
print(blk(x).shape)    # torch.Size([1, 64, 112, 112])`,hint:"Conv2d(in,out,3,padding=1) keeps spatial size. MaxPool2d(2,2) halves it."}]},{id:"rnn",label:"RNN / LSTM",icon:"↺",color:i.violet,formula:"hₜ=tanh(Wₓ·xₜ+Wₕ·hₜ₋₁+b)  |  Cₜ=fₜ⊙Cₜ₋₁+iₜ⊙c̃ₜ",concept:`RNN processes sequences by maintaining hidden state hₜ (memory).

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
  zₜ=σ(Wz·[h,x])  rₜ=σ(Wr·[h,x])  hₜ=(1-z)⊙h+(z)⊙tanh(W·[r⊙h,x])`,activities:[{q:`# ── ACTIVITY 7 ── Vanilla RNN Cell (NumPy) ───────────────
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

print(np.array(hidden_states).round(4))`,sol:`import numpy as np

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

print(np.array(hidden_states).round(4))`,hint:"h_t = np.tanh(Wx @ x_t + Wh @ h_{t-1} + b). Same W used at every timestep."},{q:`# ── ACTIVITY 8 ── LSTM Cell from Scratch ──────────────────
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
print("c₁:", c1.round(4))`,sol:`import numpy as np

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
print("c₁:", c1.round(4))`,hint:"Concatenate [h_prev; x] first. Forget/Input/Output gates→sigmoid. Candidate→tanh. Cell=f*c_prev+i*c_tilde."}]},{id:"backprop",label:"Backpropagation",icon:"∇",color:i.orange,formula:"∂L/∂wᵢ = ∂L/∂a · ∂a/∂z · ∂z/∂wᵢ   |   w ← w − η·∂L/∂w",concept:`Backpropagation efficiently computes gradients via the CHAIN RULE applied backwards through the computation graph.

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
  Batch Norm: normalize layer inputs, then scale + shift`,activities:[{q:`# ── ACTIVITY 9 ── Manual Backprop (Scalar) ───────────────
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
print(f"b: {b:.4f} → {b_new:.4f}")`,sol:`import numpy as np

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
print(f"b: {b:.4f} → {b_new:.4f}")`,hint:"Chain rule: ∂L/∂w = ∂L/∂a · σ'(z) · x. Each step multiplies one more local gradient."}]}],V=[{id:"central",label:"Mean & Median",icon:"μ",color:i.gold,formula:"μ=Σxᵢ/n  |  σ²=Σ(xᵢ-μ)²/n  |  Median=middle value",concept:`Measures of CENTRAL TENDENCY describe where data clusters.

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
  Symmetric:    mean ≈ median`,activities:[{q:`# ── ACTIVITY 10 ── Central Tendency Without Built-ins ──────
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
print(f"std_dev  = {std_dev:.2f}")`,sol:`data = [23,45,12,67,34,89,56,23,78,45,34,23,56,91,12,45,67,34,89,23]

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
print(f"std_dev  = {std_dev:.2f}") # 23.82`,hint:"Sort the list. Median: if even n, average the two middle elements. Variance: mean of (x-mean)² for each x."},{q:`# ── ACTIVITY 11 ── Outlier Effect: Mean vs Median ─────────
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
print("Best representation for 'typical salary':", ???)`,sol:`import numpy as np
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
# Lesson: when outliers exist, median/trimmed mean are better representatives`,hint:"stats.trim_mean(data, 0.1) removes 10% from each tail. CEO z-score > 3 = extreme outlier."}]},{id:"probability",label:"Probability & Bayes",icon:"P",color:i.green,formula:"P(A|B) = P(B|A)·P(A) / P(B)   |   P(A∪B) = P(A)+P(B)−P(A∩B)",concept:`Probability quantifies likelihood of events.

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
  Poisson:   P(X=k) = λᵏe⁻λ/k!`,activities:[{q:`# ── ACTIVITY 12 ── Bayes' Theorem: Medical Test ───────────
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
print("This is the BASE RATE FALLACY — low prevalence dominates.")`,sol:`P_D   = 0.01
P_pos_D   = 0.95
P_pos_noD = 0.10

P_noD = 1 - P_D      # 0.99

P_pos = P_pos_D * P_D + P_pos_noD * P_noD   # 0.0095 + 0.099 = 0.1085

P_D_given_pos = (P_pos_D * P_D) / P_pos      # 0.0095 / 0.1085 ≈ 0.0876

print(f"P(test+)             = {P_pos:.4f}")          # 0.1085
print(f"P(Disease | test+)   = {P_D_given_pos:.4f} ({P_D_given_pos*100:.2f}%)")  # 8.76%
print()
print("Observation: Despite 95% sensitivity, only ~8.7% chance of disease!")
print("Base rate P(D)=1% is so low that most positives are false positives.")`,hint:"P(pos) = P(+|D)·P(D) + P(+|¬D)·P(¬D). Then P(D|+) = P(+|D)·P(D)/P(pos)."},{q:`# ── ACTIVITY 13 ── Simulation vs Analytical Probability ───
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
print(f"Error               = {abs(p_sim-p_analytical):.4f}")`,sol:`import numpy as np

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
print(f"Error               = {abs(p_sim-p_analytical):.4f}")  # < 0.001`,hint:"np.random.randint(1, 7) gives uniform integers in [1,6]. np.mean(sums==7) estimates the probability."}]},{id:"chisquare",label:"Chi-Square Test",icon:"χ²",color:i.orange,formula:"χ²=Σ(O−E)²/E   df=(r−1)(c−1)   E[i,j]=rowᵢ·colⱼ/N",concept:`Chi-square test assesses whether observed frequencies differ from expected.

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
  • Random sampling`,activities:[{q:`# ── ACTIVITY 14 ── Goodness-of-Fit: Is the Die Fair? ──────
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
print(f"Decision: {'Reject H₀ — unfair die' if p_val < 0.05 else 'Fail to reject H₀ — fair die'}")`,sol:`from scipy.stats import chisquare
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
# p=0.337 > 0.05 → no significant evidence of unfairness`,hint:"χ² = np.sum((O-E)**2 / E). df = categories - 1. Reject if χ² > critical or p < 0.05."},{q:`# ── ACTIVITY 15 ── Independence Test: Contingency Table ───
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
print("Manual expected:"); print(E_manual.round(2))`,sol:`import numpy as np
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
# [[20, 20], [30, 30]]`,hint:"E[i,j] = row_total[i] * col_total[j] / N. Use keepdims=True and broadcasting."}]},{id:"normal",label:"Normal Distribution",icon:"🔔",color:i.rose,formula:"f(x)=e^{−(x−μ)²/2σ²}/(σ√2π)   z=(x−μ)/σ   CLT: x̄~N(μ,σ²/n)",concept:`Normal (Gaussian) distribution N(μ, σ²) — most important distribution in statistics.

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
Rule of thumb: n ≥ 30 is usually sufficient.`,activities:[{q:`# ── ACTIVITY 16 ── Normal Distribution & Z-scores ─────────
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
print(f"Z-score of 88       = {z_88:.4f}")`,sol:`from scipy.stats import norm
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
print(f"Z-score of 88       = {z_88:.4f}")              # 1.7778`,hint:"norm.cdf(x,μ,σ) for area. norm.ppf(p,μ,σ) for quantile (inverse CDF). P(a<X<b)=cdf(b)-cdf(a)."},{q:`# ── ACTIVITY 17 ── Central Limit Theorem Simulation ────────
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
          f"skew≈{((sm_arr-sm_arr.mean())**3).mean()/sm_arr.std()**3:.2f}")`,sol:`import numpy as np

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
# n=100:skew≈0.1 — very close to normal`,hint:"SE = σ/√n. Watch how skewness approaches 0 as n grows — that's CLT in action."}]},{id:"normalization",label:"Normalization & Scaling",icon:"≡",color:i.teal,formula:"z=(x−μ)/σ  |  x̂=(x−min)/(max−min)  |  robust=(x−Q2)/(Q3−Q1)",concept:`Scaling brings features to compatible ranges — critical for gradient descent and distance-based methods.

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
  Used in Transformers where batch size may be 1.`,activities:[{q:`# ── ACTIVITY 18 ── All Scalers from Scratch ────────────────
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
          f"mean={arr.mean():7.3f}")`,sol:`import numpy as np

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
          f"mean={arr.mean():7.3f}")`,hint:"L2 norm = np.linalg.norm(data). Robust uses median and IQR=Q3-Q1. np.log1p = log(1+x)."}]}],Be=function(){const[o,a]=w.useState(.5),[l,s]=w.useState(-.3),[r,n]=w.useState(.1),f=o*.8+l*.6+r,p=Math.max(0,f),y=1/(1+Math.exp(-f)),x=Math.tanh(f),u=(v,_,d,b=-2,g=2)=>e.jsxs("div",{style:{marginBottom:10},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontFamily:"JetBrains Mono",fontSize:11,marginBottom:3},children:[e.jsx("span",{style:{color:i.dim},children:v}),e.jsx("span",{style:{color:i.gold},children:_.toFixed(2)})]}),e.jsx("input",{type:"range",min:b,max:g,step:.01,value:_,onChange:S=>d(+S.target.value),style:{width:"100%",accentColor:i.gold}})]});return e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16},children:[e.jsxs("div",{children:[u("w₁ (weight, x₁=0.8 fixed)",o,a),u("w₂ (weight, x₂=0.6 fixed)",l,s),u("b  (bias)",r,n,-1,1)]}),e.jsxs("div",{style:{background:i.bg,borderRadius:10,padding:14,fontFamily:"JetBrains Mono",fontSize:11},children:[e.jsx("div",{style:{color:i.dim,fontSize:9,marginBottom:8,letterSpacing:"0.08em"},children:"FORWARD COMPUTATION"}),e.jsxs("div",{style:{color:i.text,marginBottom:4},children:["z = ",o.toFixed(2),"×0.8 + ",l.toFixed(2),"×0.6 + ",r.toFixed(2)]}),e.jsxs("div",{style:{fontSize:16,fontWeight:700,color:i.gold,margin:"6px 0"},children:["z = ",f.toFixed(4)]}),e.jsx("div",{style:{height:1,background:i.border,margin:"8px 0"}}),e.jsxs("div",{style:{color:i.teal,marginBottom:3},children:["ReLU   = ",p.toFixed(4)]}),e.jsxs("div",{style:{color:i.rose,marginBottom:3},children:["σ(z)   = ",y.toFixed(4)]}),e.jsxs("div",{style:{color:i.violet},children:["tanh   = ",x.toFixed(4)]}),e.jsx("div",{style:{marginTop:10,padding:7,borderRadius:6,background:f>0?i.teal+"18":i.rose+"18",fontSize:10,color:f>0?i.teal:i.rose},children:f>0?"✓ Neuron ACTIVE — ReLU passes signal":"✗ Neuron DEAD under ReLU (output=0)"})]})]})},Ae=function(){const[o,a]=w.useState("ReLU"),l={ReLU:{fn:_=>Math.max(0,_),col:i.teal},Sigmoid:{fn:_=>1/(1+Math.exp(-_)),col:i.rose},Tanh:{fn:_=>Math.tanh(_),col:i.gold},GELU:{fn:_=>.5*_*(1+Math.tanh(Math.sqrt(2/Math.PI)*(_+.044715*_**3))),col:i.violet},"Leaky ReLU":{fn:_=>_>0?_:.01*_,col:i.sky}},s=280,r=120,n=[-4,4],m=80,c=Array.from({length:m},(_,d)=>{const b=n[0]+d/(m-1)*(n[1]-n[0]);return{x:b,y:l[o].fn(b)}}),f=c.map(_=>_.y),p=Math.min(...f),y=Math.max(...f),x=_=>(_-n[0])/(n[1]-n[0])*s,u=_=>r-(_-p)/(y-p+.001)*r,v=c.map((_,d)=>`${d===0?"M":"L"}${x(_.x).toFixed(1)},${u(_.y).toFixed(1)}`).join(" ");return e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"},children:Object.keys(l).map(_=>e.jsx("button",{onClick:()=>a(_),style:{padding:"4px 10px",borderRadius:6,cursor:"pointer",fontFamily:"JetBrains Mono",fontSize:10,background:o===_?l[_].col+"28":"transparent",color:o===_?l[_].col:i.dim,border:`1px solid ${o===_?l[_].col:i.border}`},children:_},_))}),e.jsxs("svg",{width:s,height:r,style:{background:i.bg,borderRadius:8,border:`1px solid ${i.border}`,display:"block"},children:[e.jsx("line",{x1:0,y1:u(0),x2:s,y2:u(0),stroke:i.muted,strokeWidth:1}),e.jsx("line",{x1:x(0),y1:0,x2:x(0),y2:r,stroke:i.muted,strokeWidth:1}),e.jsx("path",{d:v,fill:"none",stroke:l[o].col,strokeWidth:2.5})]}),e.jsxs("div",{style:{fontFamily:"JetBrains Mono",fontSize:9,color:i.dim,marginTop:5},children:["x ∈ [",n[0],", ",n[1],"]  · ",e.jsx("span",{style:{color:l[o].col},children:o})]})]})},Ne=function(){const o=[[[0,1,0],[1,-4,1],[0,1,0]],[[1,0,-1],[2,0,-2],[1,0,-1]],[[-1,-1,-1],[-1,8,-1],[-1,-1,-1]],[[1,1,1],[1,1,1],[1,1,1]]],a=["Laplacian","Sobel-X","Sharpen","Box Blur"],[l,s]=w.useState(0),r=[[4,8,4,3,2],[3,9,7,2,1],[2,6,8,4,3],[1,3,5,7,4],[2,1,3,5,6]],n=o[l],m=3,c=3,f=3,p=Array.from({length:m},(_,d)=>Array.from({length:c},(b,g)=>Array.from({length:f},(S,T)=>Array.from({length:f},(z,C)=>r[d+T][g+C]*n[T][C])).flat().reduce((S,T)=>S+T,0))),y=p.flat(),x=Math.min(...y),u=Math.max(...y),v=_=>(_-x)/(u-x+.001);return e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"},children:a.map((_,d)=>e.jsx("button",{onClick:()=>s(d),style:{padding:"4px 10px",borderRadius:6,cursor:"pointer",fontFamily:"JetBrains Mono",fontSize:10,background:l===d?i.sky+"28":"transparent",color:l===d?i.sky:i.dim,border:`1px solid ${l===d?i.sky:i.border}`},children:_},_))}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"auto auto auto",gap:20,alignItems:"start"},children:[{label:"Input (5×5)",grid:r,color:i.sky,norm:!1},{label:`Kernel (3×3) — ${a[l]}`,grid:n,color:i.gold,norm:!1},{label:"Feature Map (3×3)",grid:p,color:i.teal,norm:!0}].map(({label:_,grid:d,color:b,norm:g})=>e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:9,color:b,marginBottom:6},children:_}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:`repeat(${d[0].length},1fr)`,gap:2},children:d.map((S,T)=>S.map((z,C)=>e.jsx("div",{style:{width:30,height:26,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,fontFamily:"JetBrains Mono",fontSize:9,background:g?`rgba(45,212,191,${(.15+v(z)*.85).toFixed(2)})`:z>0?`${b}28`:z<0?`${i.rose}28`:`${i.muted}44`,color:g?"#0c0f14":z!==0?b:i.dim,fontWeight:g?"700":"400"},children:typeof z=="number"?z.toFixed(0):z},`${T}-${C}`)))})]},_))})]})},pe=function(){const[o,a]=w.useState(0),[l,s]=w.useState(1),r=300,n=120,m=d=>Math.exp(-.5*((d-o)/l)**2)/(l*Math.sqrt(2*Math.PI)),c=[-5,5],f=120,p=Array.from({length:f},(d,b)=>{const g=c[0]+b/(f-1)*(c[1]-c[0]);return{x:g,y:m(g)}}),y=Math.max(...p.map(d=>d.y)),x=d=>(d-c[0])/(c[1]-c[0])*r,u=d=>n-8-d/y*(n-16),v=p.map((d,b)=>`${b===0?"M":"L"}${x(d.x).toFixed(1)},${u(d.y).toFixed(1)}`).join(" "),_=v+` L${x(c[1])},${n} L${x(c[0])},${n} Z`;return e.jsxs("div",{children:[e.jsxs("svg",{width:r,height:n,style:{background:i.bg,borderRadius:8,border:`1px solid ${i.border}`,display:"block"},children:[e.jsx("path",{d:_,fill:`${i.rose}20`}),e.jsx("path",{d:v,fill:"none",stroke:i.rose,strokeWidth:2.5}),e.jsx("line",{x1:x(o),y1:0,x2:x(o),y2:n,stroke:i.gold,strokeWidth:1.5,strokeDasharray:"5 3"}),e.jsx("line",{x1:x(o-l),y1:0,x2:x(o-l),y2:n,stroke:i.teal,strokeWidth:1,strokeDasharray:"4 3",opacity:.7}),e.jsx("line",{x1:x(o+l),y1:0,x2:x(o+l),y2:n,stroke:i.teal,strokeWidth:1,strokeDasharray:"4 3",opacity:.7}),e.jsx("text",{x:x(o)+3,y:15,fontFamily:"JetBrains Mono",fontSize:9,fill:i.gold,children:"μ"}),e.jsx("text",{x:x(o+l)+2,y:n-4,fontFamily:"JetBrains Mono",fontSize:8,fill:i.teal,children:"+σ"}),e.jsx("text",{x:x(o-l)-16,y:n-4,fontFamily:"JetBrains Mono",fontSize:8,fill:i.teal,children:"−σ"})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:10},children:[["μ (mean)",o,a,-3,3],["σ (std dev)",l,s,.3,3]].map(([d,b,g,S,T])=>e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontFamily:"JetBrains Mono",fontSize:10,marginBottom:3},children:[e.jsx("span",{style:{color:i.dim},children:d}),e.jsx("span",{style:{color:i.rose},children:b.toFixed(2)})]}),e.jsx("input",{type:"range",min:S,max:T,step:.05,value:b,onChange:z=>g(+z.target.value),style:{width:"100%",accentColor:i.rose}})]},d))}),e.jsxs("div",{style:{fontFamily:"JetBrains Mono",fontSize:9,color:i.dim,marginTop:8},children:["68% within ±1σ = [",(o-l).toFixed(1),", ",(o+l).toFixed(1),"]"]})]})},$e=function(){const o=[25,17,22,18,26,12],a=[20,20,20,20,20,20],l=o.reduce((r,n,m)=>r+(n-a[m])**2/a[m],0),s=Math.max(...o,...a);return e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",gap:4,alignItems:"flex-end",height:90,marginBottom:8},children:o.map((r,n)=>e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[e.jsx("div",{style:{width:"100%",background:i.orange+"aa",height:`${r/s*80}px`,borderRadius:"3px 3px 0 0",display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:2},children:e.jsx("span",{style:{fontFamily:"JetBrains Mono",fontSize:8,color:"#0c0f14",fontWeight:700},children:r})}),e.jsx("div",{style:{width:"100%",background:i.teal+"66",height:`${a[n]/s*80}px`,borderRadius:"0 0 3px 3px",display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:2},children:e.jsx("span",{style:{fontFamily:"JetBrains Mono",fontSize:7,color:"#0c0f14"},children:a[n]})}),e.jsxs("div",{style:{fontFamily:"JetBrains Mono",fontSize:8,color:i.dim},children:["f",n+1]})]},n))}),e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap",fontFamily:"JetBrains Mono",fontSize:10},children:[e.jsxs("span",{children:[e.jsx("span",{style:{color:i.orange},children:"■"})," Observed"]}),e.jsxs("span",{children:[e.jsx("span",{style:{color:i.teal},children:"■"})," Expected"]}),e.jsxs("span",{style:{marginLeft:"auto",color:i.gold},children:["χ² = ",l.toFixed(3)]}),e.jsxs("span",{style:{color:l>11.07?i.rose:i.green},children:["p≈",l>11.07?"<0.05 Reject H₀":">0.05 Fail to Reject"]})]}),e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:9,color:i.dim,marginTop:6},children:"df=5, α=0.05 critical value = 11.070"})]})},Ee=function(){const[o,a]=w.useState(.01),[l,s]=w.useState(.95),[r,n]=w.useState(.1),m=l*o+r*(1-o),c=l*o/m,f=(p,y,x,u,v,_)=>e.jsxs("div",{style:{marginBottom:10},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontFamily:"JetBrains Mono",fontSize:10,marginBottom:3},children:[e.jsx("span",{style:{color:i.dim},children:p}),e.jsxs("span",{style:{color:_},children:[(y*100).toFixed(1),"%"]})]}),e.jsx("input",{type:"range",min:u,max:v,step:.001,value:y,onChange:d=>x(+d.target.value),style:{width:"100%",accentColor:_}})]});return e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16},children:[e.jsxs("div",{children:[f("P(Disease) — Prevalence",o,a,.001,.5,i.rose),f("P(+|Disease) — Sensitivity",l,s,.5,1,i.teal),f("P(+|¬Disease) — False Pos.",r,n,.01,.5,i.orange)]}),e.jsxs("div",{style:{background:i.bg,borderRadius:10,padding:14,fontFamily:"JetBrains Mono",fontSize:11},children:[e.jsx("div",{style:{color:i.dim,fontSize:9,marginBottom:6},children:"P(Disease | Positive Test)"}),e.jsxs("div",{style:{fontSize:24,fontWeight:700,color:c<.5?i.rose:i.green,fontFamily:"Fraunces"},children:[(c*100).toFixed(1),"%"]}),e.jsxs("div",{style:{color:i.dim,fontSize:9,marginTop:3},children:["P(+) = ",(m*100).toFixed(2),"%"]}),e.jsx("div",{style:{marginTop:10,height:6,background:i.muted,borderRadius:3},children:e.jsx("div",{style:{width:`${c*100}%`,height:"100%",background:c<.5?i.rose:i.green,borderRadius:3,transition:"width 0.3s"}})}),e.jsx("div",{style:{marginTop:8,fontSize:9,color:i.text,lineHeight:1.6,background:i.muted+"33",padding:8,borderRadius:6},children:c<.1?"⚠ Base rate effect: low prevalence means most + tests are false positives":c<.5?"→ Moderate PPV — follow-up testing recommended":"✓ High PPV — positive test is meaningful evidence"})]})]})},We=function(){const o=[5,200,18,45,1200,32,78,950,12,400],a=Math.min(...o),l=Math.max(...o),s=o.reduce((b,g)=>b+g,0)/o.length,r=Math.sqrt(o.reduce((b,g)=>b+(g-s)**2,0)/o.length),n=[...o].sort((b,g)=>b-g),m=n[2],c=n[7],f=Math.sqrt(o.reduce((b,g)=>b+g*g,0)),[p,y]=w.useState("Min-Max"),x={"Min-Max":{fn:b=>(b-a)/(l-a),col:i.teal},"Z-Score":{fn:b=>(b-s)/r,col:i.rose},Robust:{fn:b=>(b-n[4])/(c-m),col:i.gold},L2:{fn:b=>b/f,col:i.violet}},u=o.map(x[p].fn),v=Math.min(...u),_=Math.max(...u),d=b=>(b-v)/(_-v+.001);return e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"},children:Object.keys(x).map(b=>e.jsx("button",{onClick:()=>y(b),style:{padding:"4px 10px",borderRadius:6,cursor:"pointer",fontFamily:"JetBrains Mono",fontSize:10,background:p===b?x[b].col+"28":"transparent",color:p===b?x[b].col:i.dim,border:`1px solid ${p===b?x[b].col:i.border}`},children:b},b))}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6},children:o.map((b,g)=>e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("span",{style:{fontFamily:"JetBrains Mono",fontSize:10,color:i.dim,minWidth:38,textAlign:"right"},children:b}),e.jsx("span",{style:{color:i.muted},children:"→"}),e.jsx("div",{style:{flex:1,height:16,background:i.muted+"44",borderRadius:3,overflow:"hidden"},children:e.jsx("div",{style:{width:`${Math.max(2,d(u[g])*100)}%`,height:"100%",background:x[p].col,borderRadius:3,transition:"width 0.4s"}})}),e.jsx("span",{style:{fontFamily:"JetBrains Mono",fontSize:10,color:x[p].col,minWidth:52},children:u[g].toFixed(3)})]},g))})]})},Me=function(){const o=["x₁","x₂","x₃","x₄"],[a,l]=w.useState(0),s=[i.teal,i.gold,i.violet,i.rose];return e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",gap:12,alignItems:"flex-end",marginBottom:16},children:o.map((r,n)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6},children:[e.jsxs("div",{style:{fontFamily:"JetBrains Mono",fontSize:9,color:i.dim},children:["t=",n+1]}),e.jsx("div",{style:{width:44,height:44,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"JetBrains Mono",fontSize:12,fontWeight:700,border:`2px solid ${n<=a?s[n]:i.border}`,background:n<=a?s[n]+"22":"transparent",color:n<=a?s[n]:i.muted,transition:"all 0.3s"},children:r}),e.jsxs("div",{style:{width:44,height:32,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"JetBrains Mono",fontSize:10,border:`1px solid ${n<=a?s[n]:i.border}`,background:n<=a?s[n]+"15":"transparent",color:n<=a?s[n]:i.muted,transition:"all 0.3s"},children:["h",n+1]}),n<o.length-1&&e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:8,color:n<a?s[n]:i.muted},children:"carries→"})]},n))}),e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:11,color:i.text,padding:"10px 12px",background:i.bg,borderRadius:8,marginBottom:10},children:a<o.length?e.jsxs(e.Fragment,{children:["t=",a+1,": ",e.jsxs("span",{style:{color:s[a]},children:["h",a+1]})," = tanh(Wₓ·",e.jsx("span",{style:{color:s[a]},children:o[a]})," + Wₕ·h",a," + b)"]}):"✓ Sequence processed. Final h₄ = context vector."}),e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsx("button",{onClick:()=>l(r=>Math.max(0,r-1)),disabled:a===0,style:{flex:1,padding:"6px",borderRadius:6,border:`1px solid ${i.border}`,background:"transparent",color:a===0?i.muted:i.text,cursor:a===0?"not-allowed":"pointer",fontFamily:"JetBrains Mono",fontSize:11},children:"← Back"}),e.jsx("button",{onClick:()=>l(r=>Math.min(o.length,r+1)),disabled:a>=o.length,style:{flex:1,padding:"6px",borderRadius:6,border:`1px solid ${i.violet}`,background:i.violet+"22",color:i.violet,cursor:a>=o.length?"not-allowed":"pointer",fontFamily:"JetBrains Mono",fontSize:11},children:"Next →"}),e.jsx("button",{onClick:()=>l(0),style:{padding:"6px 12px",borderRadius:6,border:`1px solid ${i.border}`,background:"transparent",color:i.dim,cursor:"pointer",fontFamily:"JetBrains Mono",fontSize:11},children:"↺"})]})]})},Ie=function(){var x,u;const[o,a]=w.useState(.1),[l,s]=w.useState(0),[r,n]=w.useState([]),m=2,c=1,f=v=>1/(1+Math.exp(-v)),p=()=>{const v=[];let _=.3,d=.1;for(let b=0;b<20;b++){const g=_*m+d,S=f(g),T=(S-c)**2,C=2*(S-c)*S*(1-S);_-=o*C*m,d-=o*C,v.push({step:b+1,loss:T.toFixed(4),w:_.toFixed(4),b:d.toFixed(4)})}n(v),s(20)},y=()=>{n([]),s(0)};return e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center",marginBottom:12},children:[e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:10,color:i.dim},children:"η (learning rate)"}),e.jsx("input",{type:"range",min:.01,max:.5,step:.01,value:o,onChange:v=>a(+v.target.value),style:{accentColor:i.orange,flex:1}}),e.jsx("span",{style:{fontFamily:"JetBrains Mono",fontSize:10,color:i.orange,minWidth:36},children:o}),e.jsx("button",{onClick:p,style:{padding:"5px 12px",borderRadius:6,background:i.orange+"22",border:`1px solid ${i.orange}`,color:i.orange,fontFamily:"JetBrains Mono",fontSize:10,cursor:"pointer"},children:"▶ Run 20 Steps"}),e.jsx("button",{onClick:y,style:{padding:"5px 10px",borderRadius:6,background:"transparent",border:`1px solid ${i.border}`,color:i.dim,fontFamily:"JetBrains Mono",fontSize:10,cursor:"pointer"},children:"↺"})]}),r.length>0&&e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontFamily:"JetBrains Mono",fontSize:9,color:i.dim,marginBottom:4,padding:"0 4px"},children:[e.jsx("span",{children:"Step"}),e.jsx("span",{children:"Loss"}),e.jsx("span",{children:"w"}),e.jsx("span",{children:"b"})]}),e.jsx("div",{style:{maxHeight:160,overflowY:"auto",display:"flex",flexDirection:"column",gap:2},children:r.map((v,_)=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"4px 8px",borderRadius:5,background:i.bg,fontFamily:"JetBrains Mono",fontSize:10},children:[e.jsxs("span",{style:{color:i.dim},children:["#",v.step]}),e.jsx("span",{style:{color:+v.loss<.01?i.green:+v.loss<.1?i.gold:i.rose},children:v.loss}),e.jsx("span",{style:{color:i.teal},children:v.w}),e.jsx("span",{style:{color:i.violet},children:v.b})]},_))}),e.jsxs("div",{style:{fontFamily:"JetBrains Mono",fontSize:9,color:i.dim,marginTop:6},children:["Loss after 20 steps: ",e.jsx("span",{style:{color:+((x=r[r.length-1])==null?void 0:x.loss)<.01?i.green:i.gold},children:(u=r[r.length-1])==null?void 0:u.loss})]})]}),r.length===0&&e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:11,color:i.dim,padding:16,textAlign:"center"},children:"Click ▶ to simulate gradient descent on a single neuron."})]})},De={weights:Be,activation:Ae,cnn:Ne,rnn:Me,backprop:Ie,central:()=>e.jsx(pe,{}),probability:Ee,chisquare:$e,normal:pe,normalization:We},Pe=function({act:o,idx:a,color:l}){const[s,r]=w.useState(!1),[n,m]=w.useState(!1),[c,f]=w.useState(!1),p=y=>{navigator.clipboard.writeText(y),f(!0),setTimeout(()=>f(!1),1400)};return e.jsxs("div",{style:{border:`1px solid ${l}30`,borderRadius:12,overflow:"hidden",background:i.card,marginBottom:14},children:[e.jsxs("div",{style:{padding:"10px 16px",background:l+"12",borderBottom:`1px solid ${l}22`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:6},children:[e.jsxs("div",{style:{fontFamily:"JetBrains Mono",fontSize:11,color:l,fontWeight:700},children:["🎯 Activity ",a+1]}),e.jsxs("div",{style:{display:"flex",gap:6},children:[!s&&e.jsxs("button",{onClick:()=>m(y=>!y),style:{padding:"3px 9px",borderRadius:5,border:`1px solid ${i.gold}55`,background:n?i.gold+"22":"transparent",color:i.gold,fontFamily:"JetBrains Mono",fontSize:10,cursor:"pointer"},children:["💡 ",n?"Hide Hint":"Hint"]}),e.jsx("button",{onClick:()=>{r(y=>!y),m(!1)},style:{padding:"3px 9px",borderRadius:5,border:`1px solid ${s?i.rose+"66":l+"44"}`,background:s?i.rose+"18":l+"0f",color:s?i.rose:l,fontFamily:"JetBrains Mono",fontSize:10,cursor:"pointer"},children:s?"🔒 Hide Solution":"🔓 Show Solution"})]})]}),n&&!s&&e.jsxs("div",{style:{padding:"8px 16px",background:i.gold+"0a",borderBottom:`1px solid ${i.gold}22`},children:[e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:9,color:i.gold,marginBottom:3},children:"💡 HINT"}),e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:11,color:i.text},children:o.hint})]}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx("pre",{style:{margin:0,padding:"14px 16px",overflowX:"auto",fontFamily:"JetBrains Mono",fontSize:11.5,lineHeight:1.7,background:s?"#081508":"#0c0f14",color:s?i.green:i.text,maxHeight:320,borderBottom:`1px solid ${s?i.green+"22":i.border}`},children:e.jsx("code",{children:s?o.sol:o.q})}),e.jsx("button",{onClick:()=>p(s?o.sol:o.q),style:{position:"absolute",top:8,right:8,padding:"2px 8px",borderRadius:4,border:`1px solid ${i.border}`,background:i.panel,color:c?i.green:i.dim,fontFamily:"JetBrains Mono",fontSize:9,cursor:"pointer"},children:c?"✓":"Copy"})]}),s&&e.jsxs("div",{style:{padding:"8px 16px",background:i.green+"08",display:"flex",alignItems:"center",gap:6},children:[e.jsx("span",{style:{color:i.green},children:"✓"}),e.jsx("span",{style:{fontFamily:"JetBrains Mono",fontSize:10,color:i.green},children:"Run in Python to verify output"})]})]})},me=function({topic:o}){const[a,l]=w.useState("concept"),s=De[o.id];return e.jsxs("div",{style:{animation:"slideIn 0.25s ease"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:14,marginBottom:20,padding:"16px 20px",background:o.color+"0a",border:`1px solid ${o.color}28`,borderRadius:12},children:[e.jsx("div",{style:{fontSize:24,flexShrink:0},children:o.icon}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:13,color:o.color,fontWeight:700},children:o.label}),e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:10,color:i.dim,marginTop:4,lineHeight:1.5},children:o.formula})]})]}),e.jsx("div",{style:{display:"flex",gap:4,marginBottom:16,background:i.bg,borderRadius:8,padding:4,width:"fit-content"},children:["concept","demo","activities"].map(r=>e.jsx("button",{onClick:()=>l(r),style:{padding:"6px 14px",borderRadius:6,border:"none",cursor:"pointer",fontFamily:"JetBrains Mono",fontSize:10,background:a===r?o.color+"22":"transparent",color:a===r?o.color:i.dim,transition:"all 0.2s"},children:r==="concept"?"📖 Concept":r==="demo"?"⚡ Demo":"🎯 Activities"},r))}),a==="concept"&&e.jsx("div",{style:{background:i.card,border:`1px solid ${i.border}`,borderRadius:12,padding:20},children:e.jsx("pre",{style:{fontFamily:"JetBrains Mono",fontSize:12,lineHeight:1.9,color:i.text,whiteSpace:"pre-wrap",margin:0},children:o.concept})}),a==="demo"&&s&&e.jsxs("div",{style:{background:i.card,border:`1px solid ${i.border}`,borderRadius:12,padding:20},children:[e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:9,color:i.dim,marginBottom:14,letterSpacing:"0.08em"},children:"◈ INTERACTIVE DEMO"}),e.jsx(s,{})]}),a==="activities"&&e.jsx("div",{children:o.activities.map((r,n)=>e.jsx(Pe,{act:r,idx:n,color:o.color},n))})]})},Oe=function(){const[o,a]=w.useState("dl"),[l,s]=w.useState("weights"),[r,n]=w.useState("central"),[m,c]=w.useState(new Set(["weights"])),[f,p]=w.useState(new Set(["central"])),y=d=>{s(d),c(b=>new Set([...b,d]))},x=d=>{n(d),p(b=>new Set([...b,d]))},u=O.find(d=>d.id===l),v=V.find(d=>d.id===r),_=O.reduce((d,b)=>d+b.activities.length,0)+V.reduce((d,b)=>d+b.activities.length,0);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        ${Re}
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:${i.bg};}
        @keyframes slideIn{from{opacity:0;transform:translateX(10px)}to{opacity:1;transform:translateX(0)}}
        ::-webkit-scrollbar{width:4px;height:4px;}
        ::-webkit-scrollbar-track{background:${i.bg};}
        ::-webkit-scrollbar-thumb{background:${i.muted};border-radius:2px;}
        input[type=range]{-webkit-appearance:none;appearance:none;height:3px;border-radius:2px;background:${i.muted};outline:none;cursor:pointer;}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:12px;height:12px;border-radius:50%;background:currentColor;cursor:pointer;}
      `}),e.jsxs("div",{style:{display:"flex",height:"100vh",overflow:"hidden",background:i.bg},children:[e.jsxs("div",{style:{width:218,flexShrink:0,background:i.panel,borderRight:`1px solid ${i.border}`,display:"flex",flexDirection:"column",overflow:"hidden"},children:[e.jsxs("div",{style:{padding:"16px 16px 12px",borderBottom:`1px solid ${i.border}`},children:[e.jsxs("div",{style:{fontFamily:"Fraunces",fontSize:17,fontWeight:600,color:i.text,lineHeight:1.2},children:["ML/DL ",e.jsx("em",{style:{color:i.gold,fontWeight:300},children:"Classroom"})]}),e.jsxs("div",{style:{fontFamily:"JetBrains Mono",fontSize:8,color:i.dim,marginTop:4},children:[O.length," DL · ",V.length," Stats · ",_," Activities"]})]}),e.jsx("div",{style:{padding:"8px 10px",display:"flex",gap:4,borderBottom:`1px solid ${i.border}`},children:[["dl","⬡ Deep Learning",i.teal],["stats","∑ Statistics",i.gold],["index","⊞ Index",i.green]].map(([d,b,g])=>e.jsx("button",{onClick:()=>a(d),style:{flex:1,padding:"5px 3px",borderRadius:6,border:`1px solid ${o===d?g:i.border}`,background:o===d?g+"20":"transparent",color:o===d?g:i.dim,fontFamily:"JetBrains Mono",fontSize:7.5,cursor:"pointer",lineHeight:1.4,transition:"all 0.2s"},children:b},d))}),e.jsxs("div",{style:{flex:1,overflowY:"auto",padding:"8px 8px 8px"},children:[o==="dl"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{fontFamily:"JetBrains Mono",fontSize:8,color:i.dim,padding:"4px 8px",marginBottom:4,letterSpacing:"0.06em"},children:["DEEP LEARNING — ",m.size,"/",O.length," visited"]}),O.map(d=>e.jsxs("button",{onClick:()=>y(d.id),style:{display:"flex",alignItems:"center",gap:9,padding:"8px 10px",borderRadius:7,border:"none",cursor:"pointer",textAlign:"left",width:"100%",marginBottom:2,background:l===d.id?d.color+"1a":"transparent",transition:"all 0.2s"},children:[e.jsx("span",{style:{fontSize:14,width:18,color:l===d.id?d.color:i.dim},children:d.icon}),e.jsx("span",{style:{fontFamily:"JetBrains Mono",fontSize:10,color:l===d.id?d.color:i.dim,fontWeight:l===d.id?"700":"400"},children:d.label}),m.has(d.id)&&l!==d.id&&e.jsx("span",{style:{marginLeft:"auto",fontSize:8,color:d.color+"66"},children:"✓"}),l===d.id&&e.jsx("span",{style:{marginLeft:"auto",width:3,height:14,borderRadius:2,background:d.color,flexShrink:0}})]},d.id))]}),o==="stats"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{fontFamily:"JetBrains Mono",fontSize:8,color:i.dim,padding:"4px 8px",marginBottom:4,letterSpacing:"0.06em"},children:["STATISTICS — ",f.size,"/",V.length," visited"]}),V.map(d=>e.jsxs("button",{onClick:()=>x(d.id),style:{display:"flex",alignItems:"center",gap:9,padding:"8px 10px",borderRadius:7,border:"none",cursor:"pointer",textAlign:"left",width:"100%",marginBottom:2,background:r===d.id?d.color+"1a":"transparent",transition:"all 0.2s"},children:[e.jsx("span",{style:{fontSize:14,width:18,color:r===d.id?d.color:i.dim},children:d.icon}),e.jsx("span",{style:{fontFamily:"JetBrains Mono",fontSize:10,color:r===d.id?d.color:i.dim,fontWeight:r===d.id?"700":"400"},children:d.label}),f.has(d.id)&&r!==d.id&&e.jsx("span",{style:{marginLeft:"auto",fontSize:8,color:d.color+"66"},children:"✓"}),r===d.id&&e.jsx("span",{style:{marginLeft:"auto",width:3,height:14,borderRadius:2,background:d.color,flexShrink:0}})]},d.id))]}),o==="index"&&e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:8,color:i.dim,padding:"4px 8px",marginBottom:8,letterSpacing:"0.06em"},children:"ALL PYTHON ACTIVITIES"}),[...O,...V].flatMap(d=>d.activities.map((b,g)=>({t:d,a:b,i:g}))).map(({t:d,a:b,i:g},S)=>{var T,z;return e.jsxs("button",{onClick:()=>{O.find(C=>C.id===d.id)?(a("dl"),y(d.id)):(a("stats"),x(d.id))},style:{display:"block",width:"100%",textAlign:"left",padding:"7px 10px",borderRadius:7,marginBottom:3,border:`1px solid ${d.color}22`,background:d.color+"08",cursor:"pointer"},children:[e.jsxs("div",{style:{fontFamily:"JetBrains Mono",fontSize:8,color:d.color,marginBottom:2},children:[d.icon," ",d.label]}),e.jsxs("div",{style:{fontFamily:"JetBrains Mono",fontSize:9,color:i.dim,lineHeight:1.4},children:[((z=(T=b.q.split(`
`)[1])==null?void 0:T.replace("# ",""))==null?void 0:z.slice(0,38))??"Activity "+(g+1),"..."]})]},S)})]})]}),e.jsxs("div",{style:{borderTop:`1px solid ${i.border}`,padding:"10px 12px",fontFamily:"JetBrains Mono",fontSize:8,color:i.dim,lineHeight:1.8},children:[e.jsx("div",{style:{color:i.teal+"99",marginBottom:2},children:"KEY FORMULAS"}),"z=Wx+b · a=σ(z)",e.jsx("br",{}),"∂L/∂w=δ·xᵀ",e.jsx("br",{}),"CLT: x̄~N(μ,σ²/n)",e.jsx("br",{}),"χ²=Σ(O-E)²/E",e.jsx("br",{}),"P(A|B)=P(B|A)P(A)/P(B)"]})]}),e.jsxs("div",{style:{flex:1,overflowY:"auto",padding:"24px 28px",minWidth:0},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22,paddingBottom:14,borderBottom:`1px solid ${i.border}`},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:"Fraunces",fontSize:20,fontWeight:600,color:i.text},children:o==="dl"?"Deep Learning Algorithms":o==="stats"?"Statistical Foundations":"Activity Index"}),e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:9,color:i.dim,marginTop:3},children:o==="dl"?"Weights · Activations · CNN · VGGNet · RNN · LSTM · Backprop":o==="stats"?"Central Tendency · Probability · Chi-Square · Normal · Normalization":"Click any activity to navigate to its topic"})]}),e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:9,color:i.dim,padding:"5px 10px",border:`1px solid ${i.border}`,borderRadius:6,background:i.panel},children:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})})]}),o==="dl"&&u&&e.jsx(me,{topic:u},l),o==="stats"&&v&&e.jsx(me,{topic:v},r),o==="index"&&e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12},children:[...O,...V].flatMap(d=>d.activities.map((b,g)=>({t:d,a:b,i:g}))).map(({t:d,a:b,i:g},S)=>e.jsxs("div",{onClick:()=>{O.find(T=>T.id===d.id)?(a("dl"),y(d.id)):(a("stats"),x(d.id))},style:{background:i.card,border:`1px solid ${d.color}28`,borderRadius:10,padding:"14px 16px",cursor:"pointer",transition:"all 0.2s"},children:[e.jsxs("div",{style:{fontFamily:"JetBrains Mono",fontSize:9,color:d.color,marginBottom:6},children:[d.icon," ",d.label," — Activity ",g+1]}),e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:11,color:i.text,lineHeight:1.5,marginBottom:8},children:b.q.split(`
`).slice(1,2).join("").replace("# ","").replace(/─+/g,"").trim()}),e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:8,color:i.dim},children:"💡 Hint available · 🔓 Solution hidden → click to open"})]},S))})]}),e.jsxs("div",{style:{width:182,flexShrink:0,background:i.panel,borderLeft:`1px solid ${i.border}`,padding:"14px 10px",overflowY:"auto"},children:[e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:8,color:i.dim,marginBottom:10,letterSpacing:"0.08em"},children:"QUICK REFERENCE"}),[{l:"Neuron z",f:"Wx + b",c:i.teal},{l:"ReLU",f:"max(0, x)",c:i.teal},{l:"Sigmoid",f:"1/(1+e⁻ˣ)",c:i.rose},{l:"Softmax",f:"eˣⁱ/Σeˣʲ",c:i.violet},{l:"Conv",f:"ΣW·X + b",c:i.sky},{l:"LSTM Cell",f:"f⊙C+i⊙c̃",c:i.violet},{l:"Backprop",f:"∂L/∂w=δ·xᵀ",c:i.orange},{l:"Mean μ",f:"Σxᵢ/n",c:i.gold},{l:"Std σ",f:"√Σ(x-μ)²/n",c:i.gold},{l:"Z-score",f:"(x-μ)/σ",c:i.rose},{l:"Bayes",f:"P(B|A)P(A)/P(B)",c:i.green},{l:"Chi-Sq",f:"Σ(O-E)²/E",c:i.orange},{l:"Min-Max",f:"(x-min)/(max-min)",c:i.teal},{l:"CLT SE",f:"σ/√n",c:i.rose}].map(({l:d,f:b,c:g})=>e.jsxs("div",{style:{marginBottom:6,padding:"6px 8px",borderRadius:6,background:i.card,border:`1px solid ${i.border}`},children:[e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:7.5,color:g,marginBottom:1},children:d}),e.jsx("div",{style:{fontFamily:"JetBrains Mono",fontSize:9,color:i.text},children:b})]},d)),e.jsxs("div",{style:{marginTop:12,padding:"10px 8px",borderRadius:8,background:i.bg,border:`1px solid ${i.border}`,fontFamily:"JetBrains Mono",fontSize:7.5,color:i.dim,lineHeight:1.8},children:[e.jsx("span",{style:{color:i.gold},children:"RULES OF THUMB"}),e.jsx("br",{}),"n≥30 for CLT",e.jsx("br",{}),"p<0.05 reject H₀",e.jsx("br",{}),"E≥5 for χ²",e.jsx("br",{}),"df=(r-1)(c-1)",e.jsx("br",{}),"|z|>3 = outlier",e.jsx("br",{}),"Overfit→Dropout/L2",e.jsx("br",{}),"Vanish→LSTM/ResNet"]})]})]})]})},t={bg:"#030b15",grid:"#081c30",surface:"#071424",card:"#0a1e35",border:"#163556",cyan:"#00d4f0",cyanDim:"#0099b3",green:"#2ecc71",orange:"#ff7b35",yellow:"#ffd60a",purple:"#b87aff",red:"#ff4444",text:"#c8e6ff",textSoft:"#6a9fc0",textDim:"#304a60",mono:"'Courier New', monospace",serif:"'Georgia', serif",inputC:"#00d4f0",hiddenC:"#ffd60a",outputC:"#2ecc71"},Ge=j=>Math.tanh(j),K=(j,o)=>.5*Math.pow(j-o,2),h=(j,o=4)=>Number(j).toFixed(o),ee=(j,o=3)=>Number(j).toFixed(o),ie={w:[[.5,.3],[-.4,.7]],b_h:[.1,-.1],v:[.6,-.2],b_o:.2},te=function(o,a,l=ie){const{w:s,b_h:r,v:n,b_o:m}=l,c=s[0][0]*o+s[0][1]*a+r[0],f=s[1][0]*o+s[1][1]*a+r[1],p=D(c),y=D(f),x=n[0]*p+n[1]*y+m,u=D(x);return{z_h1:c,z_h2:f,a_h1:p,a_h2:y,z_o:x,a_o:u}},he=function(o,a,l,s=ie){const{w:r,b_h:n,v:m,b_o:c}=s,{z_h1:f,z_h2:p,a_h1:y,a_h2:x,z_o:u,a_o:v}=te(o,a,s),_=K(v,l),d=v-l,b=v*(1-v),g=d*b,S=g*y,T=g*x,z=g,C=g*m[0],k=g*m[1],R=y*(1-y),E=x*(1-x),L=C*R,F=k*E,$=L*o,N=L*a,I=F*o,Y=F*a;return{loss:_,dL_dao:d,dao_dzo:b,delta_o:g,dL_dv0:S,dL_dv1:T,dL_dbo:z,dL_dah1:C,dL_dah2:k,dah1_dzh1:R,dah2_dzh2:E,delta_h1:L,delta_h2:F,dL_dw00:$,dL_dw01:N,dL_dw10:I,dL_dw11:Y,a_o:v,a_h1:y,a_h2:x,z_h1:f,z_h2:p,z_o:u}},Ue=()=>e.jsx("div",{style:{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",backgroundImage:`
      linear-gradient(${t.grid} 1px, transparent 1px),
      linear-gradient(90deg, ${t.grid} 1px, transparent 1px)
    `,backgroundSize:"40px 40px",opacity:.6}}),ne=({pos:j})=>{const o={tl:{top:8,left:8,borderTop:`1px solid ${t.cyanDim}`,borderLeft:`1px solid ${t.cyanDim}`},tr:{top:8,right:8,borderTop:`1px solid ${t.cyanDim}`,borderRight:`1px solid ${t.cyanDim}`},bl:{bottom:8,left:8,borderBottom:`1px solid ${t.cyanDim}`,borderLeft:`1px solid ${t.cyanDim}`},br:{bottom:8,right:8,borderBottom:`1px solid ${t.cyanDim}`,borderRight:`1px solid ${t.cyanDim}`}};return e.jsx("div",{style:{position:"absolute",width:12,height:12,...o[j]}})},A=({children:j,color:o=t.border,style:a={}})=>e.jsxs("div",{style:{background:t.card,border:`1px solid ${o}`,borderRadius:8,padding:"16px 20px",position:"relative",...a},children:[e.jsx(ne,{pos:"tl"}),e.jsx(ne,{pos:"tr"}),e.jsx(ne,{pos:"bl"}),e.jsx(ne,{pos:"br"}),j]}),B=({children:j,color:o=t.cyan,style:a={}})=>e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,letterSpacing:3,color:o,marginBottom:6,...a},children:j}),U=({lines:j,title:o,note:a,color:l=t.cyan})=>e.jsxs("div",{style:{margin:"10px 0"},children:[o&&e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:l,letterSpacing:3,borderBottom:`1px solid ${l}33`,paddingBottom:4,marginBottom:0},children:o}),e.jsx("pre",{style:{background:"#020810",border:`1px solid ${l}33`,borderTop:o?"none":`1px solid ${l}33`,borderRadius:o?"0 0 6px 6px":6,margin:0,padding:"12px 16px",fontFamily:t.mono,fontSize:12.5,color:t.text,lineHeight:1.9,overflowX:"auto"},children:j}),a&&e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:t.textSoft,padding:"4px 8px",background:`${l}08`,border:`1px solid ${l}22`,borderTop:"none",borderRadius:"0 0 4px 4px"},children:a})]}),He=({icon:j,title:o,body:a,color:l=t.cyan})=>e.jsxs("div",{style:{background:`${l}0a`,border:`1px solid ${l}33`,borderLeft:`3px solid ${l}`,borderRadius:6,padding:"12px 16px",margin:"10px 0"},children:[e.jsxs("div",{style:{fontFamily:t.mono,fontSize:10,color:l,letterSpacing:2,marginBottom:6},children:[j," ",o]}),e.jsx("div",{style:{color:t.text,fontSize:13,lineHeight:1.75},children:a})]}),re=({onClick:j,disabled:o,dir:a})=>e.jsx("button",{onClick:j,disabled:o,style:{padding:"8px 20px",fontFamily:t.mono,fontSize:12,background:o?t.surface:a==="next"?`${t.cyan}22`:t.card,border:`1px solid ${o?t.border:a==="next"?t.cyan:t.border}`,color:o?t.textDim:a==="next"?t.cyan:t.text,borderRadius:6,cursor:o?"default":"pointer",letterSpacing:1},children:a==="prev"?"← PREV":"NEXT →"}),xe=({current:j,total:o,color:a=t.cyan})=>e.jsx("div",{style:{display:"flex",gap:3,alignItems:"center"},children:Array.from({length:o},(l,s)=>e.jsx("div",{style:{width:s===j?24:8,height:4,borderRadius:2,background:s<=j?a:t.border,transition:"all 0.3s"}},s))}),oe=function({x1:o=.6,x2:a=.8,fwd:l=null,highlightPath:s=null,showValues:r=!1,pulseLayer:n=-1,animating:m=!1,compact:c=!1}){const f=c?440:560,p=c?220:280,y=c?18:22,x=[c?60:70,c?200:240,c?340:420,c?380:490],u={x1:{x:x[0],y:p*.35,c:t.inputC,lbl:"x₁",val:ee(o)},x2:{x:x[0],y:p*.68,c:t.inputC,lbl:"x₂",val:ee(a)},h1:{x:x[2],y:p*.3,c:t.hiddenC,lbl:"h₁",val:l?ee(l.a_h1):"?"},h2:{x:x[2],y:p*.7,c:t.hiddenC,lbl:"h₂",val:l?ee(l.a_h2):"?"},o:{x:x[3],y:p*.5,c:t.outputC,lbl:"ŷ",val:l?ee(l.a_o):"?"}},v=[{f:u.x1,t:u.h1,wLbl:"w₁₁=0.5",li:0},{f:u.x1,t:u.h2,wLbl:"w₂₁=-0.4",li:0},{f:u.x2,t:u.h1,wLbl:"w₁₂=0.3",li:0},{f:u.x2,t:u.h2,wLbl:"w₂₂=0.7",li:0},{f:u.h1,t:u.o,wLbl:"v₁=0.6",li:1},{f:u.h2,t:u.o,wLbl:"v₂=-0.2",li:1}],[_,d]=w.useState(0);w.useEffect(()=>{if(!m)return;const g=setInterval(()=>d(S=>(S+1)%60),80);return()=>clearInterval(g)},[m]);const b=_%60/60;return e.jsxs("svg",{viewBox:`0 0 ${f} ${p}`,style:{width:"100%",display:"block"},children:[e.jsxs("defs",{children:[e.jsxs("filter",{id:"glow2",children:[e.jsx("feGaussianBlur",{stdDeviation:"3",result:"blur"}),e.jsxs("feMerge",{children:[e.jsx("feMergeNode",{in:"blur"}),e.jsx("feMergeNode",{in:"SourceGraphic"})]})]}),e.jsxs("filter",{id:"softglow",children:[e.jsx("feGaussianBlur",{stdDeviation:"1.5",result:"blur"}),e.jsxs("feMerge",{children:[e.jsx("feMergeNode",{in:"blur"}),e.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),Array.from({length:14},(g,S)=>e.jsx("line",{x1:0,y1:S*20,x2:f,y2:S*20,stroke:t.grid,strokeWidth:.4,opacity:.6},S)),Array.from({length:30},(g,S)=>e.jsx("line",{x1:S*20,y1:0,x2:S*20,y2:p,stroke:t.grid,strokeWidth:.4,opacity:.6},S)),[{x:x[0],c:t.inputC},{x:x[2],c:t.hiddenC},{x:x[3],c:t.outputC}].map((g,S)=>e.jsx("rect",{x:g.x-y-6,y:8,width:(y+6)*2,height:p-16,rx:4,fill:`${g.c}05`,stroke:`${g.c}15`,strokeWidth:1},S)),v.map((g,S)=>{const T=s==="backward",z=s==="forward",C=z&&g.li===0||z&&g.li===1||T&&g.li===1||T&&g.li===0,k=T?t.orange:g.f.c,R=(g.f.x+g.t.x)/2,E=(g.f.y+g.t.y)/2,L=g.f.x+(g.t.x-g.f.x)*(T?1-b:b),F=g.f.y+(g.t.y-g.f.y)*(T?1-b:b);return e.jsxs("g",{children:[e.jsx("line",{x1:g.f.x+(T?-y:y),y1:g.f.y,x2:g.t.x+(T?y:-y),y2:g.t.y,stroke:C?k:t.border,strokeWidth:C?1.5:.7,opacity:C?.7:.3}),!c&&e.jsx("text",{x:R,y:E-5,textAnchor:"middle",fill:C?k:t.textDim,fontSize:"7",fontFamily:t.mono,opacity:C?1:.5,children:g.wLbl}),m&&C&&e.jsx("circle",{cx:L,cy:F,r:3,fill:k,opacity:.9,filter:"url(#softglow)"})]},S)}),Object.entries(u).map(([g,S])=>e.jsxs("g",{filter:"url(#softglow)",children:[e.jsx("circle",{cx:S.x,cy:S.y,r:y,fill:t.surface,stroke:S.c,strokeWidth:2,opacity:.95}),e.jsx("circle",{cx:S.x,cy:S.y,r:y-4,fill:`${S.c}10`,stroke:"none"}),e.jsx("text",{x:S.x,y:S.y-(r?5:2),textAnchor:"middle",fill:S.c,fontSize:c?9:11,fontFamily:t.mono,fontWeight:"bold",children:S.lbl}),r&&e.jsx("text",{x:S.x,y:S.y+11,textAnchor:"middle",fill:t.text,fontSize:c?7:8,fontFamily:t.mono,children:S.val})]},g)),[{x:x[0],lbl:"INPUT",c:t.inputC},{x:x[2],lbl:"HIDDEN",c:t.hiddenC},{x:x[3],lbl:"OUTPUT",c:t.outputC}].map((g,S)=>e.jsx("text",{x:g.x,y:p-6,textAnchor:"middle",fill:g.c,fontSize:"7",fontFamily:t.mono,letterSpacing:"2",opacity:.8,children:g.lbl},S)),s&&e.jsx("text",{x:f/2,y:16,textAnchor:"middle",fill:s==="forward"?t.cyan:t.orange,fontSize:"8",fontFamily:t.mono,letterSpacing:"2",children:s==="forward"?"► FORWARD PASS — DATA FLOWS →":"◄ BACKPROPAGATION — GRADIENTS FLOW ←"})]})},qe=function(){const[o,a]=w.useState(null),l=[{icon:"🧠",key:"what",color:t.cyan,title:"What is it?",short:"A system that learns from examples — like a brain made of math.",detail:`A feedforward neural network (also called a Multilayer Perceptron or MLP) is a
collection of connected "neurons" organized into layers. Data enters from the
left, flows through hidden layers where computations happen, and exits as a
prediction. No loops, no memory — just a straight flow from input to output.`},{icon:"🎯",key:"why",color:t.yellow,title:"Why do we use it?",short:"To learn complex patterns that humans can't program by hand.",detail:`Computers are normally programmed with explicit rules: "if X then do Y". But
some problems — like recognizing a handwritten digit — have too many rules to
write by hand. Neural networks learn the rules automatically from examples.
You show it 10,000 labeled pictures and it figures out the patterns itself.`},{icon:"⚙️",key:"how",color:t.green,title:"How does it work?",short:"Two phases: Forward Pass (guess) + Backpropagation (improve).",detail:`Step 1 — FORWARD PASS: Feed input data through the network layer by layer
to produce a prediction.
Step 2 — CALCULATE LOSS: Compare the prediction to the correct answer and
compute an error score (the "loss").
Step 3 — BACKPROPAGATION: Send the error backwards through the network,
computing how much each weight was responsible.
Step 4 — UPDATE WEIGHTS: Nudge each weight slightly in the direction that
reduces the error. Repeat thousands of times.`}],s=[{icon:"📥",lbl:"INPUT DATA",sub:"Raw features",c:t.inputC},{icon:"→",lbl:null,sub:null,c:t.textDim},{icon:"🔢",lbl:"FORWARD PASS",sub:"Compute prediction",c:t.cyan},{icon:"→",lbl:null,sub:null,c:t.textDim},{icon:"📉",lbl:"CALC LOSS",sub:"Measure error",c:t.orange},{icon:"→",lbl:null,sub:null,c:t.textDim},{icon:"↩️",lbl:"BACKPROP",sub:"Compute gradients",c:t.red},{icon:"→",lbl:null,sub:null,c:t.textDim},{icon:"⚖️",lbl:"UPDATE WEIGHTS",sub:"Gradient descent",c:t.green},{icon:"↺",lbl:"REPEAT",sub:"Until loss is small",c:t.purple}],r=[{icon:"🌡️",lbl:`House Price
Prediction`,t:"Regression"},{icon:"✉️",lbl:`Spam Email
Detection`,t:"Classification"},{icon:"🌸",lbl:`Flower Species
Identification`,t:"Classification"},{icon:"📊",lbl:`Stock Trend
Forecasting`,t:"Regression"},{icon:"🏥",lbl:`Disease Risk
Scoring`,t:"Classification"},{icon:"🎓",lbl:`Student Grade
Prediction`,t:"Regression"}];return e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:28},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:t.cyanDim,letterSpacing:4,marginBottom:8},children:"MODULE 01 / OVERVIEW"}),e.jsxs("div",{style:{fontFamily:t.serif,fontSize:28,color:t.text,lineHeight:1.2,marginBottom:10},children:["Feedforward Neural Networks &",e.jsx("br",{}),"Backpropagation"]}),e.jsxs("div",{style:{color:t.textSoft,fontSize:13,lineHeight:1.7,maxWidth:640},children:["The foundational architecture of deep learning. Understanding this completely means you understand ",e.jsx("em",{children:"how"})," AI learns from data."]})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:24},children:l.map(n=>e.jsx(A,{color:o===n.key?n.color:t.border,style:{cursor:"pointer",transition:"all 0.2s"},children:e.jsxs("div",{onMouseEnter:()=>a(n.key),onMouseLeave:()=>a(null),children:[e.jsx("div",{style:{fontSize:28,marginBottom:10},children:n.icon}),e.jsx(B,{color:n.color,children:n.title}),e.jsx("div",{style:{color:t.text,fontSize:13,lineHeight:1.6,marginBottom:10},children:n.short}),o===n.key&&e.jsx("pre",{style:{fontFamily:t.mono,fontSize:10.5,color:t.textSoft,lineHeight:1.8,whiteSpace:"pre-wrap",margin:0,borderTop:`1px solid ${n.color}33`,paddingTop:10},children:n.detail}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:t.textDim,marginTop:8,letterSpacing:2},children:o===n.key?"▲ LESS":"▼ HOVER FOR DETAIL"})]})},n.key))}),e.jsxs("div",{style:{background:`${t.yellow}0a`,border:`1px solid ${t.yellow}33`,borderLeft:`4px solid ${t.yellow}`,borderRadius:8,padding:"16px 20px",marginBottom:24},children:[e.jsx(B,{color:t.yellow,children:"🍕 ANALOGY — LEARNING TO BAKE PIZZA"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20},children:[e.jsxs("div",{children:[e.jsx("div",{style:{color:t.yellow,fontFamily:t.mono,fontSize:11,marginBottom:6},children:"Human Learning"}),e.jsx("div",{style:{color:t.text,fontSize:13,lineHeight:1.7},children:"You bake a pizza (forward pass). It comes out burned (high loss). You adjust the temperature and time (update weights). Bake again. After many attempts you make the perfect pizza. Each attempt makes you a tiny bit smarter."})]}),e.jsxs("div",{children:[e.jsx("div",{style:{color:t.cyan,fontFamily:t.mono,fontSize:11,marginBottom:6},children:"Neural Network Learning"}),e.jsx("div",{style:{color:t.text,fontSize:13,lineHeight:1.7},children:"Network makes a prediction (forward pass). Loss measures how wrong it was. Backpropagation figures out which weights caused the error. Gradient descent nudges every weight. After thousands of iterations, the network is accurate."})]})]})]}),e.jsxs("div",{style:{background:t.card,border:`1px solid ${t.border}`,borderRadius:8,padding:"16px 20px",marginBottom:24},children:[e.jsx(B,{color:t.cyan,children:"⟳ THE COMPLETE TRAINING CYCLE"}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:4,flexWrap:"wrap",marginTop:8},children:s.map((n,m)=>n.lbl===null?e.jsx("div",{style:{color:t.textDim,fontSize:18},children:n.icon},m):e.jsxs("div",{style:{background:`${n.c}12`,border:`1px solid ${n.c}33`,borderRadius:6,padding:"8px 12px",textAlign:"center",minWidth:90},children:[e.jsx("div",{style:{fontSize:18,marginBottom:3},children:n.icon}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:8,color:n.c,letterSpacing:1,marginBottom:2},children:n.lbl}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:8,color:t.textDim},children:n.sub})]},m))})]}),e.jsxs("div",{style:{background:t.card,border:`1px solid ${t.border}`,borderRadius:8,padding:"16px 20px"},children:[e.jsx(B,{color:t.green,children:"✅ REAL-WORLD USE CASES"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:10,marginTop:10},children:r.map((n,m)=>e.jsxs("div",{style:{background:t.surface,border:`1px solid ${t.border}`,borderRadius:6,padding:12,textAlign:"center"},children:[e.jsx("div",{style:{fontSize:24,marginBottom:6},children:n.icon}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:t.text,whiteSpace:"pre",lineHeight:1.5},children:n.lbl}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:8,color:t.green,marginTop:4,letterSpacing:1},children:n.t})]},m))})]})]})},Ve=function(){const[o,a]=w.useState("input"),s={input:{color:t.inputC,title:"Input Layer",icon:"📥",body:`The first layer receives raw data. Each neuron represents one feature.
No computation happens here — it just passes values to the next layer.`,examples:`x₁ = 0.6 (e.g., normalized test score)
x₂ = 0.8 (e.g., hours studied)`,math:"a⁽⁰⁾ = x  (input is passed directly, no transformation)"},hidden:{color:t.hiddenC,title:"Hidden Layer",icon:"⚙️",body:`Hidden layers do the actual computation. Each neuron:
1. Receives weighted signals from the previous layer
2. Adds a bias value
3. Applies an activation function to produce its output`,examples:"Two hidden neurons h₁ and h₂ in our example network",math:`z = w₁x₁ + w₂x₂ + b
a = σ(z)  ← activation function`},output:{color:t.outputC,title:"Output Layer",icon:"📤",body:`The final layer produces the network's prediction.
For binary classification: 1 neuron with sigmoid (0–1 probability)
For multi-class: N neurons with softmax
For regression: 1 neuron with no activation (raw number)`,examples:"ŷ = 0.618 → 61.8% probability of class 1",math:"ŷ = σ(v₁h₁ + v₂h₂ + b_o)"},weight:{color:t.orange,title:"Weights (w)",icon:"⚖️",body:`Every connection has a weight. Weights are the LEARNED parameters of the network.
A large positive weight → that input strongly activates the neuron.
A large negative weight → that input suppresses the neuron.
Near-zero weight → that input is mostly ignored.
The network adjusts weights during training to minimize error.`,examples:"w₁₁ = 0.5, w₁₂ = 0.3, w₂₁ = -0.4, w₂₂ = 0.7",math:"Contribution of input xᵢ = wᵢ × xᵢ"},bias:{color:t.purple,title:"Bias (b)",icon:"🎯",body:`Bias is an extra learnable value added to the weighted sum before activation.
It shifts the activation function left or right.
Without bias: network can only draw hyperplanes through the origin.
With bias: network can draw hyperplanes anywhere — much more flexible!
Think of it as the y-intercept in y = mx + b.`,examples:"b_h₁ = 0.1, b_h₂ = -0.1, b_o = 0.2",math:"z = (w·x) + b  ← bias shifts the entire sum"},activation:{color:t.red,title:"Activation Functions",icon:"⚡",body:`Without activation functions, a 10-layer network would be mathematically
equivalent to a single linear equation — completely useless for complex tasks.
Activation functions introduce non-linearity, allowing the network to model
curves, boundaries, and complex patterns.
Most common: ReLU in hidden layers, Sigmoid for binary output.`,examples:`ReLU: max(0, z)
Sigmoid: 1/(1+e⁻ᶻ)`,math:`f(z) = max(0, z)  [ReLU]
f(z) = 1/(1+e⁻ᶻ)  [Sigmoid]`}}[o],r=[{key:"input",label:"INPUT LAYER",color:t.inputC},{key:"hidden",label:"HIDDEN LAYER",color:t.hiddenC},{key:"output",label:"OUTPUT LAYER",color:t.outputC},{key:"weight",label:"WEIGHTS",color:t.orange},{key:"bias",label:"BIAS",color:t.purple},{key:"activation",label:"ACTIVATION FUNCTION",color:t.red}];return e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:t.cyanDim,letterSpacing:4,marginBottom:8},children:"MODULE 02 / ARCHITECTURE"}),e.jsx("div",{style:{fontFamily:t.serif,fontSize:26,color:t.text,marginBottom:8},children:"Building Blocks of a Neural Network"}),e.jsx("div",{style:{color:t.textSoft,fontSize:13},children:"Our example: 2 inputs → 2 hidden neurons → 1 output. Click any component to learn about it."})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"3fr 2fr",gap:20},children:[e.jsxs("div",{children:[e.jsx(A,{color:t.border,style:{marginBottom:14},children:e.jsx(oe,{x1:.6,x2:.8,showValues:!1,highlightPath:null})}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:r.map(n=>e.jsx("button",{onClick:()=>a(n.key),style:{padding:"7px 14px",fontFamily:t.mono,fontSize:10,letterSpacing:2,background:o===n.key?`${n.color}22`:t.card,border:`1px solid ${o===n.key?n.color:t.border}`,color:o===n.key?n.color:t.textSoft,borderRadius:6,cursor:"pointer"},children:n.label},n.key))})]}),e.jsx("div",{children:e.jsxs(A,{color:s.color,style:{height:"100%",boxSizing:"border-box"},children:[e.jsx("div",{style:{fontSize:32,marginBottom:10},children:s.icon}),e.jsx(B,{color:s.color,children:s.title}),e.jsx("div",{style:{color:t.text,fontSize:13,lineHeight:1.75,marginBottom:14},children:s.body}),e.jsx(U,{title:"FORMULA",lines:s.math,color:s.color}),e.jsxs("div",{style:{background:`${s.color}10`,border:`1px solid ${s.color}33`,borderRadius:6,padding:"10px 14px",marginTop:10},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:s.color,letterSpacing:2,marginBottom:6},children:"EXAMPLE VALUES"}),e.jsx("pre",{style:{fontFamily:t.mono,fontSize:11,color:t.textSoft,margin:0,lineHeight:1.8},children:s.examples})]})]})})]}),e.jsx("div",{style:{marginTop:20},children:e.jsxs(A,{color:t.border,children:[e.jsx(B,{color:t.cyan,children:"🔬 INSIDE A SINGLE NEURON — STEP BY STEP"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(5, 1fr)",gap:10,marginTop:12},children:[{n:"1",title:"Receive Inputs",body:"x₁, x₂, ... arrive from the previous layer (or raw data)",col:t.inputC,math:"x₁=0.6, x₂=0.8"},{n:"2",title:"Multiply by Weights",body:"Each input is scaled by its connection weight",col:t.orange,math:`w·x = 0.5×0.6
     + 0.3×0.8`},{n:"3",title:"Sum + Bias",body:"Add all weighted inputs together, then add the bias term",col:t.purple,math:`z = 0.30+0.24
    +0.10 = 0.64`},{n:"4",title:"Apply Activation",body:"Pass z through the activation function to get output a",col:t.red,math:`a = σ(0.64)
  = 0.6547`},{n:"5",title:"Output to Next",body:"The activated value is passed forward to all neurons in the next layer",col:t.outputC,math:`a_h₁ = 0.6547
→ next layer`}].map(n=>e.jsxs("div",{style:{background:t.surface,border:`1px solid ${n.col}44`,borderRadius:8,padding:12,textAlign:"center"},children:[e.jsx("div",{style:{width:24,height:24,borderRadius:"50%",background:`${n.col}22`,border:`1px solid ${n.col}`,fontFamily:t.mono,fontSize:11,color:n.col,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 8px"},children:n.n}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:n.col,letterSpacing:1,marginBottom:6},children:n.title}),e.jsx("div",{style:{color:t.textSoft,fontSize:11,lineHeight:1.5,marginBottom:8},children:n.body}),e.jsx("pre",{style:{fontFamily:t.mono,fontSize:9.5,color:t.text,margin:0},children:n.math})]},n.n))})]})})]})},Je=function(){const[o,a]=w.useState(0),l=.6,s=.8,r=te(l,s),n=[{title:"Set the Inputs",color:t.inputC,icon:"📥",explain:`Everything starts with raw data. We have two input features. These numbers could
represent anything — pixel brightness, temperature readings, exam scores. For this
example, think of them as two features from a student's profile.`,math:`Inputs:
  x₁ = 0.6   (e.g., normalized GPA: 0.6 out of 1.0)
  x₂ = 0.8   (e.g., normalized study hours: 0.8 out of 1.0)
  
Target:
  y  = 1.0   (student should pass: yes = 1)`,note:"📌 Inputs are never transformed — they flow directly into the hidden layer."},{title:"Compute Hidden Neuron h₁ (Weighted Sum)",color:t.hiddenC,icon:"🔢",explain:`Each hidden neuron computes a weighted sum of ALL inputs plus its bias. Think of the
weights as telling the neuron "how much attention to pay" to each input. The bias
lets the neuron shift its behavior up or down.`,math:`Hidden neuron h₁:
  Weights:  w₁₁ = 0.5 (for x₁),  w₁₂ = 0.3 (for x₂)
  Bias:     b_h₁ = 0.1

  z_h₁ = w₁₁ × x₁  +  w₁₂ × x₂  +  b_h₁
       = (0.5)(0.6) + (0.3)(0.8) + 0.1
       = 0.30 + 0.24 + 0.10
       = ${h(r.z_h1,4)}`,note:"📌 z is called the 'pre-activation' or 'net input'. It's just linear math — no curves yet."},{title:"Activate Hidden Neuron h₁ (Sigmoid)",color:t.red,icon:"⚡",explain:`Now we apply the activation function. We'll use sigmoid here, which squashes any
number into the range (0, 1). This non-linearity is critical — without it, the entire
network would be equivalent to a single linear equation no matter how deep it is.`,math:`Sigmoid activation:
  σ(z) = 1 / (1 + e^(-z))

  a_h₁ = σ(${h(r.z_h1,4)})
       = 1 / (1 + e^(-${h(r.z_h1,4)}))
       = 1 / (1 + ${h(Math.exp(-r.z_h1),4)})
       = 1 / ${h(1+Math.exp(-r.z_h1),4)}
       = ${h(r.a_h1,4)}`,note:"📌 Sigmoid output is always between 0 and 1. Think of it as: 'how activated is this neuron?'"},{title:"Compute + Activate Hidden Neuron h₂",color:t.hiddenC,icon:"🔢",explain:`We repeat the exact same process for hidden neuron h₂ with its own weights and bias.
Both h₁ and h₂ see the same inputs but have DIFFERENT weights, so they learn to
detect different patterns in the data.`,math:`Hidden neuron h₂:
  Weights:  w₂₁ = -0.4 (for x₁),  w₂₂ = 0.7 (for x₂)
  Bias:     b_h₂ = -0.1

  z_h₂ = (-0.4)(0.6) + (0.7)(0.8) + (-0.1)
       = -0.24 + 0.56 - 0.10
       = ${h(r.z_h2,4)}

  a_h₂ = σ(${h(r.z_h2,4)}) = ${h(r.a_h2,4)}`,note:"📌 Negative weight (-0.4) means: 'when x₁ is high, this neuron is suppressed.' Weights can be negative!"},{title:"Compute Output Neuron (Weighted Sum)",color:t.outputC,icon:"📤",explain:`The output neuron takes the activated values from both hidden neurons and
computes another weighted sum. It uses different weights (v₁, v₂) to determine
how much to trust each hidden neuron's signal.`,math:`Output neuron:
  Weights: v₁ = 0.6 (for h₁),  v₂ = -0.2 (for h₂)
  Bias:    b_o = 0.2

  z_o = v₁ × a_h₁  +  v₂ × a_h₂  +  b_o
      = (0.6)(${h(r.a_h1,4)}) + (-0.2)(${h(r.a_h2,4)}) + 0.2
      = ${h(.6*r.a_h1,4)} + ${h(-.2*r.a_h2,4)} + 0.2
      = ${h(r.z_o,4)}`,note:"📌 This is still just linear math. The activation function comes next."},{title:"Activate Output → Final Prediction",color:t.outputC,icon:"🎯",explain:`Apply sigmoid again to get a probability between 0 and 1. Our target was 1.0 (pass).
The network predicted 0.6182 — about 62% confident in 'pass'. That's not bad for a
randomly-initialized network! Backpropagation will make it better.`,math:`  ŷ = σ(${h(r.z_o,4)})
     = 1 / (1 + e^(-${h(r.z_o,4)}))
     = ${h(r.a_o,4)}

  Interpretation:
  ŷ = ${h(r.a_o,4)} → ${(r.a_o*100).toFixed(1)}% probability of class 1

  Target:     y = 1.0  (should be "pass")
  Prediction: ŷ = ${h(r.a_o,4)}
  Error:      ${h(r.a_o-1,4)} (need to fix this!)`,note:"📌 The forward pass is complete! Now we need to measure the error and fix it with backpropagation."}],m=n[o];return e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:t.cyanDim,letterSpacing:4,marginBottom:8},children:"MODULE 03 / FORWARD PASS"}),e.jsx("div",{style:{fontFamily:t.serif,fontSize:26,color:t.text,marginBottom:8},children:"Forward Pass — Making a Prediction"}),e.jsx("div",{style:{color:t.textSoft,fontSize:13},children:"Data flows from left to right through the network. Step through each calculation below."})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"2fr 3fr",gap:20},children:[e.jsxs("div",{children:[e.jsx(A,{color:m.color,style:{marginBottom:14},children:e.jsx(oe,{x1:l,x2:s,fwd:o>=2?r:null,showValues:o>=2,highlightPath:"forward"})}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12},children:[e.jsx(re,{onClick:()=>a(c=>Math.max(0,c-1)),disabled:o===0,dir:"prev"}),e.jsx(xe,{current:o,total:n.length,color:m.color}),e.jsx(re,{onClick:()=>a(c=>Math.min(n.length-1,c+1)),disabled:o===n.length-1,dir:"next"})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:5},children:n.map((c,f)=>e.jsxs("button",{onClick:()=>a(f),style:{display:"flex",alignItems:"center",gap:8,background:o===f?`${c.color}18`:"transparent",border:`1px solid ${o===f?c.color:"transparent"}`,borderRadius:5,padding:"5px 10px",cursor:"pointer",textAlign:"left"},children:[e.jsx("div",{style:{width:6,height:6,borderRadius:"50%",background:f<=o?c.color:t.textDim,flexShrink:0}}),e.jsxs("div",{style:{fontFamily:t.mono,fontSize:9,color:f<=o?c.color:t.textDim,letterSpacing:1},children:["STEP ",f+1," — ",c.title]})]},f))})]}),e.jsxs(A,{color:m.color,children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:14},children:[e.jsx("div",{style:{fontSize:32},children:m.icon}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontFamily:t.mono,fontSize:9,color:m.color,letterSpacing:3},children:["STEP ",o+1," OF ",n.length]}),e.jsx("div",{style:{fontFamily:t.serif,fontSize:18,color:t.text},children:m.title})]})]}),e.jsx("div",{style:{color:t.text,fontSize:13,lineHeight:1.75,marginBottom:14},children:m.explain}),e.jsx(U,{title:"CALCULATION",lines:m.math,color:m.color,note:m.note})]})]}),o===n.length-1&&e.jsxs("div",{style:{marginTop:20,background:`${t.green}0a`,border:`1px solid ${t.green}44`,borderRadius:8,padding:"14px 20px"},children:[e.jsx(B,{color:t.green,children:"✅ FORWARD PASS COMPLETE — SUMMARY"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(5, 1fr)",gap:10,marginTop:10},children:[{l:"x₁",v:"0.6000",c:t.inputC},{l:"x₂",v:"0.8000",c:t.inputC},{l:"a_h₁",v:h(r.a_h1),c:t.hiddenC},{l:"a_h₂",v:h(r.a_h2),c:t.hiddenC},{l:"ŷ (output)",v:h(r.a_o),c:t.outputC}].map(c=>e.jsxs("div",{style:{background:t.surface,border:`1px solid ${c.c}33`,borderRadius:6,padding:"10px",textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:c.c,marginBottom:4},children:c.l}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:15,color:t.text,fontWeight:"bold"},children:c.v})]},c.l))})]})]})},Ye=function(){const[o,a]=w.useState(.64),[l,s]=w.useState("sigmoid"),r={sigmoid:{name:"Sigmoid  σ(z)",color:t.cyan,fn:D,formula:"σ(z) = 1 / (1 + e^(-z))",range:"Output range: (0, 1)",use:"Binary classification output layer",pros:"Probabilistic output (0–1), smooth gradient",cons:"Vanishing gradient for large |z|, computationally heavy",deriv:"σ'(z) = σ(z) × (1 − σ(z))"},relu:{name:"ReLU  f(z)",color:t.green,fn:J,formula:"ReLU(z) = max(0, z)",range:"Output range: [0, ∞)",use:"Hidden layers (most common choice today)",pros:"Fast, avoids vanishing gradient for z > 0",cons:"'Dying ReLU' — dead neurons when z < 0 always",deriv:"ReLU'(z) = 1 if z>0, else 0"},tanh:{name:"Tanh  tanh(z)",color:t.purple,fn:Ge,formula:"tanh(z) = (e^z − e^(-z)) / (e^z + e^(-z))",range:"Output range: (−1, 1)",use:"Hidden layers, RNNs (zero-centered advantage)",pros:"Zero-centered — faster convergence than sigmoid",cons:"Still has vanishing gradient at extremes",deriv:"tanh'(z) = 1 − tanh²(z)"},linear:{name:"Linear (None)",color:t.orange,fn:u=>u,formula:"f(z) = z",range:"Output range: (−∞, ∞)",use:"Regression output layer (predicting raw numbers)",pros:"No information loss, full range",cons:"No non-linearity — useless for hidden layers",deriv:"f'(z) = 1 (constant)"}},n=r[l],m=Array.from({length:81},(u,v)=>-4+v*.1),c=260,f=130,p=u=>(u+4)/8*c,y=u=>u,x=(u,v)=>{const[_,d]=v===J?[0,4]:v===y?[-4,4]:[-1.1,1.1];return f-(u-_)/(d-_)*f};return e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:t.cyanDim,letterSpacing:4,marginBottom:8},children:"MODULE 04 / ACTIVATION FUNCTIONS"}),e.jsx("div",{style:{fontFamily:t.serif,fontSize:26,color:t.text,marginBottom:8},children:"Activation Functions — Adding Non-Linearity"}),e.jsx("div",{style:{color:t.textSoft,fontSize:13},children:'Without activation functions, no matter how many layers you add, the network is equivalent to a single linear layer. Activation functions are what make deep learning "deep."'})]}),e.jsxs("div",{style:{background:`${t.red}0a`,border:`1px solid ${t.red}33`,borderLeft:`4px solid ${t.red}`,borderRadius:8,padding:"14px 20px",marginBottom:20},children:[e.jsx(B,{color:t.red,children:"⚠️ WHY DO WE NEED NON-LINEARITY?"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:t.red,marginBottom:6},children:"WITHOUT activation:"}),e.jsx("pre",{style:{fontFamily:t.mono,fontSize:11,color:t.textSoft,margin:0,lineHeight:1.8},children:`Layer 1: z₁ = W₁x
Layer 2: z₂ = W₂z₁ = W₂W₁x
Layer 3: z₃ = W₃z₂ = W₃W₂W₁x
→ Equivalent to: z₃ = (W₃W₂W₁)x
→ Just ONE linear transformation!
→ Useless for complex patterns ❌`})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:t.green,marginBottom:6},children:"WITH activation:"}),e.jsx("pre",{style:{fontFamily:t.mono,fontSize:11,color:t.textSoft,margin:0,lineHeight:1.8},children:`Layer 1: a₁ = σ(W₁x)
Layer 2: a₂ = σ(W₂a₁)
Layer 3: a₃ = σ(W₃a₂)
→ Cannot be collapsed to one layer!
→ Can model curves, spirals, boundaries
→ Learns complex real-world patterns ✅`})]})]})]}),e.jsx("div",{style:{display:"flex",gap:8,marginBottom:20},children:Object.entries(r).map(([u,v])=>e.jsx("button",{onClick:()=>s(u),style:{flex:1,padding:"10px 8px",fontFamily:t.mono,fontSize:10,letterSpacing:1,background:l===u?`${v.color}22`:t.card,border:`1px solid ${l===u?v.color:t.border}`,color:l===u?v.color:t.textSoft,borderRadius:6,cursor:"pointer"},children:v.name},u))}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20},children:[e.jsxs("div",{children:[e.jsxs(A,{color:n.color,style:{marginBottom:14},children:[e.jsxs(B,{color:n.color,children:[n.name," — GRAPH"]}),e.jsxs("svg",{viewBox:`0 0 ${c} ${f+20}`,style:{width:"100%",display:"block"},children:[[-3,-2,-1,0,1,2,3].map(u=>e.jsx("line",{x1:p(u),y1:0,x2:p(u),y2:f,stroke:t.border,strokeWidth:u===0?1:.4,opacity:.8},u)),e.jsx("line",{x1:p(0),y1:0,x2:p(0),y2:f,stroke:t.border,strokeWidth:1}),e.jsx("line",{x1:0,y1:f/2,x2:c,y2:f/2,stroke:t.border,strokeWidth:.4}),e.jsx("polyline",{points:m.map(u=>`${p(u)},${x(n.fn(u),n.fn)}`).join(" "),fill:"none",stroke:n.color,strokeWidth:2.5}),e.jsx("circle",{cx:p(o),cy:x(n.fn(o),n.fn),r:5,fill:n.color,stroke:t.bg,strokeWidth:2}),e.jsx("line",{x1:p(o),y1:0,x2:p(o),y2:f,stroke:n.color,strokeWidth:1,strokeDasharray:"4,3",opacity:.5}),[-4,-2,0,2,4].map(u=>e.jsx("text",{x:p(u),y:f+14,textAnchor:"middle",fill:t.textDim,fontSize:"8",fontFamily:t.mono,children:u},u))]}),e.jsxs("div",{style:{marginTop:12},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:4},children:[e.jsxs("div",{style:{fontFamily:t.mono,fontSize:10,color:t.textSoft},children:["z = ",h(o,2)]}),e.jsxs("div",{style:{fontFamily:t.mono,fontSize:10,color:n.color},children:[n.name.split(" ")[0],"(",h(o,2),") = ",h(n.fn(o),4)]})]}),e.jsx("input",{type:"range",min:"-4",max:"4",step:"0.1",value:o,onChange:u=>a(parseFloat(u.target.value)),style:{width:"100%",accentColor:n.color}}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("span",{style:{fontFamily:t.mono,fontSize:9,color:t.textDim},children:"-4"}),e.jsx("span",{style:{fontFamily:t.mono,fontSize:9,color:t.textDim},children:"+4"})]})]})]}),e.jsxs(A,{color:t.border,children:[e.jsxs(B,{color:t.cyan,children:["COMPARE ALL AT z = ",h(o,2)]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:6,marginTop:8},children:Object.entries(r).map(([u,v])=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:v.color,width:120,flexShrink:0},children:v.name.split("  ")[0]}),e.jsx("div",{style:{flex:1,background:t.surface,borderRadius:4,height:8,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",borderRadius:4,background:v.color,width:`${Math.min(100,Math.max(0,(v.fn(o)+1)/2*100))}%`,transition:"width 0.2s"}})}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:11,color:t.text,width:60,textAlign:"right"},children:h(v.fn(o),4)})]},u))})]})]}),e.jsxs(A,{color:n.color,children:[e.jsx("div",{style:{fontSize:24,marginBottom:10},children:"⚡"}),e.jsx(B,{color:n.color,children:n.name}),e.jsx(U,{title:"FORMULA",lines:n.formula,color:n.color}),e.jsx(U,{title:"DERIVATIVE (used in backprop)",lines:n.deriv,color:n.color}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8,marginTop:14},children:[e.jsxs("div",{style:{background:t.surface,border:`1px solid ${t.border}`,borderRadius:6,padding:10},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:t.textSoft,letterSpacing:2,marginBottom:4},children:"OUTPUT RANGE"}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:12,color:n.color},children:n.range})]}),e.jsxs("div",{style:{background:t.surface,border:`1px solid ${t.border}`,borderRadius:6,padding:10},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:t.textSoft,letterSpacing:2,marginBottom:4},children:"WHEN TO USE"}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:12,color:t.text},children:n.use})]}),e.jsxs("div",{style:{background:`${t.green}0a`,border:`1px solid ${t.green}33`,borderRadius:6,padding:10},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:t.green,letterSpacing:2,marginBottom:4},children:"✓ ADVANTAGES"}),e.jsx("div",{style:{color:t.text,fontSize:12},children:n.pros})]}),e.jsxs("div",{style:{background:`${t.red}0a`,border:`1px solid ${t.red}33`,borderRadius:6,padding:10},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:t.red,letterSpacing:2,marginBottom:4},children:"✗ DISADVANTAGES"}),e.jsx("div",{style:{color:t.text,fontSize:12},children:n.cons})]})]})]})]})]})},Xe=function(){const[o,a]=w.useState(.618),s=K(o,1),r=Array.from({length:101},(p,y)=>({p:y/100,l:K(y/100,1)})),n=320,m=150,c=p=>p*n,f=p=>m-p/.5*m;return e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:t.cyanDim,letterSpacing:4,marginBottom:8},children:"MODULE 05 / LOSS FUNCTION"}),e.jsx("div",{style:{fontFamily:t.serif,fontSize:26,color:t.text,marginBottom:8},children:"Loss Function — Measuring the Mistake"}),e.jsx("div",{style:{color:t.textSoft,fontSize:13},children:"The loss function measures how wrong our prediction was. It produces a single number — the training signal for backpropagation."})]}),e.jsx(He,{icon:"📏",title:"ANALOGY — MEASURING ERROR",color:t.orange,body:`Imagine an archery target. The bull's-eye is the correct answer (target = 1.0). Your arrow lands at 0.618.
The loss function measures how far your arrow missed — but in a specific mathematical way that makes gradient calculations clean.
We want to MINIMIZE the loss: make the arrow hit closer to center with every shot.`}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginTop:20},children:[e.jsx("div",{children:e.jsxs(A,{color:t.orange,children:[e.jsx(B,{color:t.orange,children:"INTERACTIVE LOSS CALCULATOR"}),e.jsxs("div",{style:{marginBottom:14},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:4},children:[e.jsxs("span",{style:{fontFamily:t.mono,fontSize:10,color:t.textSoft},children:["Prediction ŷ = ",h(o,3)]}),e.jsx("span",{style:{fontFamily:t.mono,fontSize:10,color:t.cyan},children:"Target y = 1.0"})]}),e.jsx("input",{type:"range",min:"0",max:"1",step:"0.01",value:o,onChange:p=>a(parseFloat(p.target.value)),style:{width:"100%",accentColor:t.orange}})]}),e.jsxs("svg",{viewBox:`0 0 ${n} ${m+20}`,style:{width:"100%",display:"block",marginBottom:12},children:[[0,.1,.2,.3,.4,.5].map(p=>e.jsx("line",{x1:0,y1:f(p),x2:n,y2:f(p),stroke:t.border,strokeWidth:.5},p)),[0,.25,.5,.75,1].map(p=>e.jsx("line",{x1:c(p),y1:0,x2:c(p),y2:m,stroke:t.border,strokeWidth:.5},p)),e.jsx("polyline",{points:r.map(p=>`${c(p.p)},${f(p.l)}`).join(" "),fill:"none",stroke:t.orange,strokeWidth:2.5}),e.jsx("circle",{cx:c(o),cy:f(s),r:5,fill:t.orange,stroke:t.bg,strokeWidth:2}),e.jsx("line",{x1:c(o),y1:0,x2:c(o),y2:f(s),stroke:t.orange,strokeWidth:1,strokeDasharray:"3,3",opacity:.6}),e.jsx("text",{x:2,y:m+14,fill:t.textDim,fontSize:"8",fontFamily:t.mono,children:"0"}),e.jsx("text",{x:n-12,y:m+14,fill:t.textDim,fontSize:"8",fontFamily:t.mono,children:"1"}),e.jsx("text",{x:2,y:10,fill:t.textDim,fontSize:"8",fontFamily:t.mono,children:"0.5"}),e.jsx("text",{x:n/2-10,y:m+14,fill:t.textDim,fontSize:"8",fontFamily:t.mono,children:"ŷ →"})]}),e.jsx(U,{title:"MSE LOSS — CALCULATION",color:t.orange,lines:`Loss = ½ × (ŷ − y)²
     = ½ × (${h(o,4)} − 1.0)²
     = ½ × (${h(o-1,4)})²
     = ½ × ${h(Math.pow(o-1,2),6)}
     = ${h(s,6)}`}),e.jsxs("div",{style:{background:s<.01?`${t.green}18`:s<.1?`${t.yellow}18`:`${t.red}18`,border:`1px solid ${s<.01?t.green:s<.1?t.yellow:t.red}44`,borderRadius:6,padding:"10px 14px",marginTop:10,textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:11,color:t.textSoft,marginBottom:4},children:"LOSS = "}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:28,color:s<.01?t.green:s<.1?t.yellow:t.red},children:h(s,6)}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:t.textSoft,marginTop:4},children:s<.01?"🎉 Excellent prediction!":s<.1?"📈 Getting there...":"📉 Needs improvement"})]})]})}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[e.jsxs(A,{color:t.border,children:[e.jsx(B,{color:t.cyan,children:"WHY ½ × (ŷ − y)²?"}),e.jsx("div",{style:{color:t.text,fontSize:13,lineHeight:1.75},children:"The ½ is a mathematical trick — when we take the derivative for backpropagation, the 2 from the exponent cancels it out, leaving a clean gradient."}),e.jsx(U,{color:t.cyan,lines:`d/dŷ [½(ŷ-y)²] = ½ × 2(ŷ-y) = (ŷ-y)

No messy coefficient — the ½ was clever!`})]}),e.jsxs(A,{color:t.border,children:[e.jsx(B,{color:t.yellow,children:"COMMON LOSS FUNCTIONS"}),[{name:"MSE (Mean Squared Error)",formula:"½(ŷ−y)²",use:"Regression problems",c:t.orange},{name:"Binary Cross-Entropy",formula:"−[y·log(ŷ)+(1−y)·log(1−ŷ)]",use:"Binary classification",c:t.cyan},{name:"Categorical Cross-Entropy",formula:"−Σ yᵢ·log(ŷᵢ)",use:"Multi-class classification",c:t.purple},{name:"MAE (Mean Absolute Error)",formula:"|ŷ−y|",use:"Regression (robust to outliers)",c:t.green}].map(p=>e.jsxs("div",{style:{border:`1px solid ${p.c}33`,borderLeft:`3px solid ${p.c}`,borderRadius:5,padding:"8px 12px",marginBottom:8},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:p.c,marginBottom:3},children:p.name}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:11,color:t.text},children:p.formula}),e.jsxs("div",{style:{fontFamily:t.mono,fontSize:9,color:t.textDim,marginTop:3},children:["Use for: ",p.use]})]},p.name))]}),e.jsxs(A,{color:t.border,children:[e.jsx(B,{color:t.green,children:"LOSS TELLS US TWO THINGS"}),e.jsxs("div",{style:{display:"flex",gap:10},children:[e.jsxs("div",{style:{flex:1,background:`${t.green}0a`,border:`1px solid ${t.green}22`,borderRadius:6,padding:10},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:t.green,marginBottom:4},children:"MAGNITUDE"}),e.jsx("div",{style:{color:t.text,fontSize:12,lineHeight:1.5},children:"How BADLY wrong we are. Large loss = big mistake."})]}),e.jsxs("div",{style:{flex:1,background:`${t.cyan}0a`,border:`1px solid ${t.cyan}22`,borderRadius:6,padding:10},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:t.cyan,marginBottom:4},children:"GRADIENT SIGN"}),e.jsx("div",{style:{color:t.text,fontSize:12,lineHeight:1.5},children:"Which DIRECTION to move weights. (+) or (−)?"})]})]})]})]})]})]})},Qe=function(){const[o,a]=w.useState(0),l=.6,s=.8,r=1,n=he(l,s,r),m=[{title:"What is Backpropagation?",color:t.orange,icon:"↩️",explain:`Backpropagation ("backprop") is the algorithm that answers: "How much did each
weight contribute to the error, and in which direction should we change it?"
It works backwards from the output error, using the chain rule of calculus.
Without backprop, we'd have to guess which weights to change — impossible!`,math:`CHAIN RULE OF CALCULUS:
If f(g(x)) is a composition of functions:
  d/dx [f(g(x))] = f'(g(x)) × g'(x)

In neural networks:
  Loss depends on output
  Output depends on weights
  → dLoss/dWeight = dLoss/dOutput × dOutput/dWeight`,note:"📌 Backprop is just the chain rule applied systematically to every weight in the network."},{title:"Step 1 — Compute the Output Error",color:t.red,icon:"📉",explain:`First, calculate the loss and its derivative with respect to the network's output.
This is our starting signal — how wrong was the final answer?
The derivative tells us: if we increase ŷ by a tiny bit, how does the loss change?`,math:`Our values:
  ŷ (prediction) = ${h(n.a_o)}
  y  (target)    = ${r}

Loss (MSE):
  L = ½(ŷ − y)²
    = ½(${h(n.a_o)} − 1.0)²
    = ${h(n.loss,6)}

dL/dŷ (gradient of loss w.r.t. output):
  dL/dŷ = ŷ − y = ${h(n.a_o)} − 1.0 = ${h(n.dL_dao,6)}`,note:`📌 Negative gradient (${h(n.dL_dao,4)}) means: to reduce loss, we need to INCREASE ŷ.`},{title:"Step 2 — Backprop Through Output Activation",color:t.red,icon:"⚡",explain:`The output neuron used sigmoid. We need the chain rule here:
gradient flows through the sigmoid function. The sigmoid derivative
σ'(z) = σ(z)(1-σ(z)) tells us how steep the sigmoid curve is at our current z.`,math:`Output pre-activation: z_o = ${h(n.z_o)}
Output activation:    ŷ   = σ(z_o) = ${h(n.a_o)}

Sigmoid derivative: dŷ/dz_o = ŷ(1 − ŷ)
  = ${h(n.a_o)} × (1 − ${h(n.a_o)})
  = ${h(n.a_o)} × ${h(1-n.a_o)}
  = ${h(n.dao_dzo,6)}

Chain Rule → Output delta (δ_o):
  δ_o = dL/dŷ × dŷ/dz_o
      = ${h(n.dL_dao,6)} × ${h(n.dao_dzo,6)}
      = ${h(n.delta_o,6)}`,note:"📌 δ_o (delta) is the 'error term' for the output neuron — our key backprop signal."},{title:"Step 3 — Gradients for Output Weights (v₁, v₂)",color:t.orange,icon:"⚖️",explain:`How much did each output weight (v₁, v₂) contribute to the error?
The gradient for each weight is: δ_o × (the input it received).
Why? Because if a weight connected to a large activation caused a big error,
that weight needs a bigger adjustment.`,math:`∂L/∂v₁ = δ_o × a_h₁  (h₁ was the input to this weight)
  = ${h(n.delta_o,6)} × ${h(n.a_h1,6)}
  = ${h(n.dL_dv0,8)}

∂L/∂v₂ = δ_o × a_h₂  (h₂ was the input to this weight)
  = ${h(n.delta_o,6)} × ${h(n.a_h2,6)}
  = ${h(n.dL_dv1,8)}

∂L/∂b_o = δ_o = ${h(n.dL_dbo,8)}  (bias gradient = delta)`,note:"📌 Update rule: v₁_new = v₁ - α × ∂L/∂v₁  where α is the learning rate."},{title:"Step 4 — Backprop Into Hidden Layer",color:t.hiddenC,icon:"⚙️",explain:`Now the error signal travels backwards into the hidden layer.
Each hidden neuron gets a portion of the output error, weighted by how much
its output weight (v₁ or v₂) contributed. Then we apply the sigmoid derivative
to account for the hidden activation function.`,math:`Error at h₁:
  dL/da_h₁ = δ_o × v₁ = ${h(n.delta_o,5)} × 0.6 = ${h(n.dL_dah1,7)}
  
Sigmoid deriv at h₁: σ'(z_h₁) = a_h₁(1 − a_h₁)
  = ${h(n.a_h1,5)} × ${h(1-n.a_h1,5)} = ${h(n.dah1_dzh1,7)}
  
Hidden delta h₁: δ_h₁ = ${h(n.dL_dah1,5)} × ${h(n.dah1_dzh1,5)} = ${h(n.delta_h1,8)}

Error at h₂:
  dL/da_h₂ = δ_o × v₂ = ${h(n.delta_o,5)} × (-0.2) = ${h(n.dL_dah2,7)}
  δ_h₂ = ${h(n.dL_dah2,5)} × ${h(n.dah2_dzh2,5)} = ${h(n.delta_h2,8)}`,note:"📌 The chain rule continues: error flows backwards through every weight in the network."},{title:"Step 5 — Gradients for ALL Input Weights",color:t.hiddenC,icon:"🔢",explain:`Finally, compute gradients for the input layer weights (w₁₁, w₁₂, w₂₁, w₂₂).
Same rule: gradient = delta × input that fed into that weight.
Now we have ALL the gradients — one for every single weight in the network!`,math:`∂L/∂w₁₁ = δ_h₁ × x₁ = ${h(n.delta_h1,7)} × 0.6 = ${h(n.dL_dw00,9)}
∂L/∂w₁₂ = δ_h₁ × x₂ = ${h(n.delta_h1,7)} × 0.8 = ${h(n.dL_dw01,9)}
∂L/∂w₂₁ = δ_h₂ × x₁ = ${h(n.delta_h2,7)} × 0.6 = ${h(n.dL_dw10,9)}
∂L/∂w₂₂ = δ_h₂ × x₂ = ${h(n.delta_h2,7)} × 0.8 = ${h(n.dL_dw11,9)}

All biases:
∂L/∂b_h₁ = δ_h₁ = ${h(n.delta_h1,9)}
∂L/∂b_h₂ = δ_h₂ = ${h(n.delta_h2,9)}`,note:"📌 We now have a gradient for EVERY parameter. Backprop is complete!"},{title:"Step 6 — Update Weights (Gradient Descent)",color:t.green,icon:"⬆️",explain:`With all gradients computed, we update every weight using Gradient Descent.
Learning rate α controls step size. Too large → overshoot and diverge.
Too small → training takes forever. Typical values: 0.001 to 0.1.
We SUBTRACT the gradient because we want to go DOWNHILL on the loss surface.`,math:`Learning rate: α = 0.1

Output weights update:
  v₁_new = 0.6 − 0.1 × ${h(n.dL_dv0)} = ${h(.6-.1*n.dL_dv0,6)}
  v₂_new = -0.2 − 0.1 × ${h(n.dL_dv1)} = ${h(-.2-.1*n.dL_dv1,6)}

Hidden weights update (sample):
  w₁₁_new = 0.5 − 0.1 × ${h(n.dL_dw00)} = ${h(.5-.1*n.dL_dw00,6)}
  w₁₂_new = 0.3 − 0.1 × ${h(n.dL_dw01)} = ${h(.3-.1*n.dL_dw01,6)}

After update:
  Loss was: ${h(n.loss,6)}
  Loss will be slightly smaller → repeat!`,note:"📌 One iteration done. Real training repeats this thousands of times until loss is near 0."}],c=m[o];return e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:t.cyanDim,letterSpacing:4,marginBottom:8},children:"MODULE 06 / BACKPROPAGATION"}),e.jsx("div",{style:{fontFamily:t.serif,fontSize:26,color:t.text,marginBottom:8},children:"Backpropagation — Learning from Mistakes"}),e.jsx("div",{style:{color:t.textSoft,fontSize:13},children:"Gradients flow right to left. The chain rule tells us exactly how much every weight caused the error."})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"2fr 3fr",gap:20},children:[e.jsxs("div",{children:[e.jsx(A,{color:c.color,style:{marginBottom:14},children:e.jsx(oe,{x1:l,x2:s,fwd:n,showValues:!0,highlightPath:o===0?null:"backward"})}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12},children:[e.jsx(re,{onClick:()=>a(f=>Math.max(0,f-1)),disabled:o===0,dir:"prev"}),e.jsx(xe,{current:o,total:m.length,color:c.color}),e.jsx(re,{onClick:()=>a(f=>Math.min(m.length-1,f+1)),disabled:o===m.length-1,dir:"next"})]}),m.map((f,p)=>e.jsxs("button",{onClick:()=>a(p),style:{display:"flex",alignItems:"center",gap:8,background:o===p?`${f.color}18`:"transparent",border:`1px solid ${o===p?f.color:"transparent"}`,borderRadius:5,padding:"5px 10px",cursor:"pointer",textAlign:"left",width:"100%",marginBottom:3},children:[e.jsx("div",{style:{width:6,height:6,borderRadius:"50%",background:p<=o?f.color:t.textDim,flexShrink:0}}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:p<=o?f.color:t.textDim,letterSpacing:1},children:f.title})]},p))]}),e.jsxs(A,{color:c.color,children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:14},children:[e.jsx("div",{style:{fontSize:32},children:c.icon}),e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:c.color,letterSpacing:3},children:o===0?"CONCEPT":`STEP ${o} OF ${m.length-1}`}),e.jsx("div",{style:{fontFamily:t.serif,fontSize:18,color:t.text},children:c.title})]})]}),e.jsx("div",{style:{color:t.text,fontSize:13,lineHeight:1.75,marginBottom:14},children:c.explain}),e.jsx(U,{title:"MATH",lines:c.math,color:c.color,note:c.note})]})]}),o===m.length-1&&e.jsxs("div",{style:{marginTop:20,background:`${t.green}0a`,border:`1px solid ${t.green}44`,borderRadius:8,padding:"16px 20px"},children:[e.jsx(B,{color:t.green,children:"✅ ALL GRADIENTS COMPUTED — BEFORE vs. AFTER UPDATE (α=0.1)"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:10,marginTop:10},children:[{p:"w₁₁",old:.5,g:n.dL_dw00,c:t.inputC},{p:"w₁₂",old:.3,g:n.dL_dw01,c:t.inputC},{p:"w₂₁",old:-.4,g:n.dL_dw10,c:t.inputC},{p:"w₂₂",old:.7,g:n.dL_dw11,c:t.inputC},{p:"v₁",old:.6,g:n.dL_dv0,c:t.hiddenC},{p:"v₂",old:-.2,g:n.dL_dv1,c:t.hiddenC},{p:"b_h₁",old:.1,g:n.delta_h1,c:t.purple},{p:"b_o",old:.2,g:n.dL_dbo,c:t.purple}].map(f=>e.jsxs("div",{style:{background:t.surface,border:`1px solid ${f.c}33`,borderRadius:6,padding:10,textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:f.c,marginBottom:6},children:f.p}),e.jsxs("div",{style:{fontFamily:t.mono,fontSize:9,color:t.textSoft},children:[h(f.old,4)," → "]}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:12,color:t.green,fontWeight:"bold"},children:h(f.old-.1*f.g,4)}),e.jsxs("div",{style:{fontFamily:t.mono,fontSize:8,color:t.textDim,marginTop:2},children:["Δ = ",h(-.1*f.g,5)]})]},f.p))})]})]})},Ke=function(){const[o,a]=w.useState(!1),[l,s]=w.useState(0),[r,n]=w.useState([]),[m,c]=w.useState({...ie}),f=w.useRef(null),p=.6,y=.8,x=1,u=.5,v=80,_=()=>{a(!1),s(0),n([]),c({...ie}),f.current&&clearInterval(f.current)},d=w.useCallback((z,C)=>{const{w:k,b_h:R,v:E,b_o:L}=z,{z_h1:F,z_h2:$,a_h1:N,a_h2:I,z_o:Y,a_o:q}=te(p,y,z),ue=K(q,x),ge=q-x,fe=q*(1-q),Z=ge*fe,ye=Z*N,be=Z*I,ve=Z,ae=Z*E[0]*(N*(1-N)),se=Z*E[1]*(I*(1-I));return{newW:{w:[[k[0][0]-u*ae*p,k[0][1]-u*ae*y],[k[1][0]-u*se*p,k[1][1]-u*se*y]],b_h:[R[0]-u*ae,R[1]-u*se],v:[E[0]-u*ye,E[1]-u*be],b_o:L-u*ve},L:ue,a_o:q,currentIter:C}},[]);w.useEffect(()=>{if(o)return f.current=setInterval(()=>{c(z=>(s(k=>{if(k>=v)return a(!1),k;const R=d(z,k);return n(E=>[...E.slice(-79),{iter:k,loss:R.L,pred:R.a_o}]),k===v-1&&a(!1),k+1}),d(z,0).newW))},80),()=>clearInterval(f.current)},[o,d]);const b=te(p,y,m),g=K(b.a_o,x),S=360,T=120;return e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:t.cyanDim,letterSpacing:4,marginBottom:8},children:"MODULE 07 / TRAINING LOOP"}),e.jsx("div",{style:{fontFamily:t.serif,fontSize:26,color:t.text,marginBottom:8},children:"The Training Loop — Watch the Network Learn"}),e.jsx("div",{style:{color:t.textSoft,fontSize:13},children:"Forward pass → loss → backprop → update → repeat. Watch the loss decrease in real-time."})]}),e.jsxs("div",{style:{display:"flex",gap:12,marginBottom:20,alignItems:"center"},children:[e.jsx("button",{onClick:()=>a(z=>!z),style:{padding:"10px 28px",fontFamily:t.mono,fontSize:12,letterSpacing:2,background:o?`${t.orange}22`:`${t.green}22`,border:`1px solid ${o?t.orange:t.green}`,color:o?t.orange:t.green,borderRadius:6,cursor:"pointer"},children:o?"⏸ PAUSE":l===0?"▶ START TRAINING":"▶ RESUME"}),e.jsx("button",{onClick:_,style:{padding:"10px 20px",fontFamily:t.mono,fontSize:12,letterSpacing:2,background:t.surface,border:`1px solid ${t.border}`,color:t.textSoft,borderRadius:6,cursor:"pointer"},children:"↺ RESET"}),e.jsxs("div",{style:{fontFamily:t.mono,fontSize:11,color:t.textSoft},children:["α (learning rate) = ",u," | Iterations: ",l,"/",v]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"5fr 3fr",gap:20},children:[e.jsxs("div",{children:[e.jsxs(A,{color:o?t.green:t.border,style:{marginBottom:14},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8},children:[e.jsx(B,{color:t.cyan,children:"NETWORK STATE"}),o&&e.jsxs("div",{style:{display:"flex",gap:4,alignItems:"center"},children:[[0,1,2].map(z=>e.jsx("div",{style:{width:6,height:6,borderRadius:"50%",background:t.green,animation:`pulse 1s ${z*.3}s infinite`}},z)),e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:t.green,marginLeft:4},children:"TRAINING"})]})]}),e.jsx(oe,{x1:p,x2:y,fwd:b,showValues:!0,highlightPath:o?"forward":null,animating:o})]}),e.jsxs(A,{color:t.border,children:[e.jsx(B,{color:t.orange,children:"LOSS OVER ITERATIONS"}),e.jsxs("svg",{viewBox:`0 0 ${S} ${T+24}`,style:{width:"100%",display:"block",marginTop:8},children:[[0,.05,.1,.15,.2].map(z=>{const C=T-z/.2*T;return e.jsxs("g",{children:[e.jsx("line",{x1:0,y1:C,x2:S,y2:C,stroke:t.border,strokeWidth:.5}),e.jsx("text",{x:2,y:C-2,fill:t.textDim,fontSize:"7",fontFamily:t.mono,children:z.toFixed(2)})]},z)}),r.length>1&&e.jsx("polyline",{points:r.map((z,C)=>{const k=C/(v-1)*S,R=T-Math.min(1,z.loss/.2)*T;return`${k},${R}`}).join(" "),fill:"none",stroke:t.orange,strokeWidth:2}),r.length>0&&(()=>{const z=r[r.length-1],C=(r.length-1)/(v-1)*S,k=T-Math.min(1,z.loss/.2)*T;return e.jsx("circle",{cx:C,cy:k,r:4,fill:t.orange})})(),e.jsx("text",{x:S/2,y:T+18,textAnchor:"middle",fill:t.textDim,fontSize:"8",fontFamily:t.mono,children:"Iteration →"})]})]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[e.jsxs(A,{color:t.border,children:[e.jsx(B,{color:t.cyan,children:"LIVE METRICS"}),[{l:"Iteration",v:l,c:t.cyan},{l:"Loss",v:h(g,6),c:t.orange},{l:"Prediction ŷ",v:h(b.a_o,4),c:t.green},{l:"Target y",v:"1.0000",c:t.textSoft},{l:"Error (ŷ−y)",v:h(b.a_o-x,4),c:t.red}].map(z=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${t.border}`},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:t.textSoft},children:z.l}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:13,color:z.c,fontWeight:"bold"},children:z.v})]},z.l))]}),e.jsxs(A,{color:t.border,children:[e.jsx(B,{color:t.yellow,children:"CURRENT WEIGHTS"}),[{l:"w₁₁",v:m.w[0][0],c:t.inputC},{l:"w₁₂",v:m.w[0][1],c:t.inputC},{l:"w₂₁",v:m.w[1][0],c:t.inputC},{l:"w₂₂",v:m.w[1][1],c:t.inputC},{l:"v₁",v:m.v[0],c:t.hiddenC},{l:"v₂",v:m.v[1],c:t.hiddenC},{l:"b_h₁",v:m.b_h[0],c:t.purple},{l:"b_h₂",v:m.b_h[1],c:t.purple},{l:"b_o",v:m.b_o,c:t.purple}].map(z=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:`1px solid ${t.border}`},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:z.c},children:z.l}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:t.text},children:h(z.v,5)})]},z.l))]}),l>=v&&e.jsxs("div",{style:{background:`${t.green}15`,border:`1px solid ${t.green}44`,borderRadius:8,padding:14,textAlign:"center"},children:[e.jsx("div",{style:{fontSize:28,marginBottom:8},children:"🎉"}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:10,color:t.green,letterSpacing:2,marginBottom:6},children:"TRAINING COMPLETE"}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:20,color:t.green,marginBottom:4},children:h(g,6)}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:t.textSoft},children:"FINAL LOSS"}),e.jsxs("div",{style:{fontFamily:t.mono,fontSize:14,color:t.cyan,marginTop:8},children:["Prediction: ",(b.a_o*100).toFixed(1),"%"]})]})]})]})]})},Ze=function(){const[o,a]=w.useState(.6),[l,s]=w.useState(.8),[r,n]=w.useState(1),m=te(o,l),c=K(m.a_o,r),f=p=>({width:"100%",margin:"6px 0",accentColor:p,cursor:"pointer"});return e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:t.cyanDim,letterSpacing:4,marginBottom:8},children:"MODULE 08 / PLAYGROUND"}),e.jsx("div",{style:{fontFamily:t.serif,fontSize:26,color:t.text,marginBottom:8},children:"Interactive Playground — Try It Yourself"}),e.jsx("div",{style:{color:t.textSoft,fontSize:13},children:"Adjust the input values and target. Watch all calculations update in real time."})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 2fr",gap:20},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[e.jsxs(A,{color:t.inputC,children:[e.jsx(B,{color:t.inputC,children:"INPUT VALUES"}),e.jsxs("div",{style:{marginBottom:14},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("span",{style:{fontFamily:t.mono,fontSize:11,color:t.inputC},children:"x₁ (Feature 1)"}),e.jsx("span",{style:{fontFamily:t.mono,fontSize:13,color:t.text,fontWeight:"bold"},children:h(o,2)})]}),e.jsx("input",{type:"range",min:"0",max:"1",step:"0.01",value:o,onChange:p=>a(parseFloat(p.target.value)),style:f(t.inputC)}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("span",{style:{fontFamily:t.mono,fontSize:9,color:t.textDim},children:"0.00"}),e.jsx("span",{style:{fontFamily:t.mono,fontSize:9,color:t.textDim},children:"1.00"})]})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("span",{style:{fontFamily:t.mono,fontSize:11,color:t.inputC},children:"x₂ (Feature 2)"}),e.jsx("span",{style:{fontFamily:t.mono,fontSize:13,color:t.text,fontWeight:"bold"},children:h(l,2)})]}),e.jsx("input",{type:"range",min:"0",max:"1",step:"0.01",value:l,onChange:p=>s(parseFloat(p.target.value)),style:f(t.inputC)}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("span",{style:{fontFamily:t.mono,fontSize:9,color:t.textDim},children:"0.00"}),e.jsx("span",{style:{fontFamily:t.mono,fontSize:9,color:t.textDim},children:"1.00"})]})]})]}),e.jsxs(A,{color:t.orange,children:[e.jsx(B,{color:t.orange,children:"TARGET VALUE (y)"}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("span",{style:{fontFamily:t.mono,fontSize:11,color:t.orange},children:"Correct answer"}),e.jsx("span",{style:{fontFamily:t.mono,fontSize:13,color:t.text,fontWeight:"bold"},children:h(r,2)})]}),e.jsx("input",{type:"range",min:"0",max:"1",step:"0.01",value:r,onChange:p=>n(parseFloat(p.target.value)),style:f(t.orange)}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("span",{style:{fontFamily:t.mono,fontSize:9,color:t.textDim},children:"0.00 (class 0)"}),e.jsx("span",{style:{fontFamily:t.mono,fontSize:9,color:t.textDim},children:"1.00 (class 1)"})]})]}),e.jsxs(A,{color:c<.05?t.green:c<.1?t.yellow:t.red,children:[e.jsx(B,{color:c<.05?t.green:t.orange,children:"PREDICTION RESULT"}),e.jsxs("div",{style:{textAlign:"center",padding:"10px 0"},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:11,color:t.textSoft,marginBottom:4},children:"Prediction ŷ"}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:36,fontWeight:"bold",color:c<.05?t.green:c<.1?t.yellow:t.red},children:h(m.a_o,3)}),e.jsxs("div",{style:{fontFamily:t.mono,fontSize:12,color:t.textSoft,marginTop:4},children:["= ",(m.a_o*100).toFixed(1),"% → class ",m.a_o>=.5?"1":"0"]})]}),e.jsxs("div",{style:{display:"flex",gap:8,marginTop:10},children:[e.jsxs("div",{style:{flex:1,background:t.surface,borderRadius:6,padding:8,textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:t.textSoft},children:"LOSS"}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:13,color:t.orange},children:h(c,5)})]}),e.jsxs("div",{style:{flex:1,background:t.surface,borderRadius:6,padding:8,textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:t.textSoft},children:"ERROR"}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:13,color:t.red},children:h(m.a_o-r,4)})]})]})]})]}),e.jsxs("div",{children:[e.jsx(A,{color:t.border,style:{marginBottom:14},children:e.jsx(oe,{x1:o,x2:l,fwd:m,showValues:!0})}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14},children:[e.jsxs(A,{color:t.hiddenC,children:[e.jsx(B,{color:t.hiddenC,children:"HIDDEN LAYER LIVE"}),e.jsx(U,{color:t.hiddenC,lines:`z_h₁ = 0.5×${h(o,2)} + 0.3×${h(l,2)} + 0.1
    = ${h(m.z_h1,4)}
a_h₁ = σ(${h(m.z_h1,4)}) = ${h(m.a_h1,4)}

z_h₂ = -0.4×${h(o,2)} + 0.7×${h(l,2)} - 0.1
    = ${h(m.z_h2,4)}
a_h₂ = σ(${h(m.z_h2,4)}) = ${h(m.a_h2,4)}`})]}),e.jsxs(A,{color:t.outputC,children:[e.jsx(B,{color:t.outputC,children:"OUTPUT LAYER LIVE"}),e.jsx(U,{color:t.outputC,lines:`z_o = 0.6×${h(m.a_h1,4)}
    + -0.2×${h(m.a_h2,4)}
    + 0.2
    = ${h(m.z_o,4)}

ŷ = σ(${h(m.z_o,4)})
  = ${h(m.a_o,4)}`})]})]}),e.jsxs(A,{color:t.orange,style:{marginTop:14},children:[e.jsx(B,{color:t.orange,children:"BACKPROP PREVIEW — KEY GRADIENTS"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:8,marginTop:8},children:(()=>{const p=he(o,l,r);return[{l:"dL/dŷ",v:h(p.dL_dao,4),c:t.red},{l:"δ_output",v:h(p.delta_o,4),c:t.orange},{l:"δ_h₁",v:h(p.delta_h1,5),c:t.hiddenC},{l:"δ_h₂",v:h(p.delta_h2,5),c:t.hiddenC},{l:"∂L/∂v₁",v:h(p.dL_dv0,5),c:t.yellow},{l:"∂L/∂v₂",v:h(p.dL_dv1,5),c:t.yellow},{l:"∂L/∂w₁₁",v:h(p.dL_dw00,5),c:t.inputC},{l:"∂L/∂w₂₁",v:h(p.dL_dw10,5),c:t.inputC}].map(y=>e.jsxs("div",{style:{background:t.surface,border:`1px solid ${y.c}33`,borderRadius:6,padding:"8px 6px",textAlign:"center"},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:8,color:y.c,marginBottom:4},children:y.l}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:11,color:t.text},children:y.v})]},y.l))})()})]})]})]})]})},et=function(){const[o,a]=w.useState({}),l=r=>a(n=>({...n,[r]:!n[r]})),s=[{q:"A neural network has 3 layers: input, one hidden, output. How many weight matrices does it have?",a:"2 weight matrices. One connecting input→hidden, one connecting hidden→output. Each layer boundary has one set of weights.",c:t.cyan},{q:"Why would a neural network with NO activation functions always fail at complex tasks?",a:"Without activation, every layer computes a linear transformation. Any composition of linear functions is still just one linear function. So a 100-layer network without activations is mathematically identical to a 1-layer linear network — it can only draw straight decision boundaries.",c:t.red},{q:"During backprop, the gradient for weight w is computed as δ × x. What does x represent here?",a:"x is the input that fed INTO that weight during the forward pass. Intuitively: if a weight received a large input and caused a large error, its gradient should be large — hence we multiply by the input value.",c:t.orange},{q:"What does a negative gradient mean for a weight, and what happens when we subtract it?",a:"A negative gradient means increasing that weight would DECREASE the loss. When we subtract (w_new = w - α × gradient), subtracting a negative number INCREASES the weight — exactly what we want. Gradient descent automatically handles the direction!",c:t.green},{q:"If the learning rate α is set too high, what problem occurs? What if it's too low?",a:"Too high: the weights overshoot the minimum — the network oscillates wildly and loss may actually increase or diverge. Too low: the network converges, but takes thousands of extra iterations. Typical good values: 0.001 to 0.01 with Adam optimizer.",c:t.purple},{q:"The sigmoid derivative at z=0 is 0.25. At z=10, it's nearly 0. Why is this a problem?",a:"This is the 'vanishing gradient' problem. When gradients are nearly zero, weight updates are nearly zero — the network stops learning. Layers far from the output receive almost no signal. This is why ReLU (derivative = 1 for z>0) is preferred in deep networks.",c:t.yellow}];return e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:20},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:t.cyanDim,letterSpacing:4,marginBottom:8},children:"MODULE 09 / SUMMARY + QUIZ"}),e.jsx("div",{style:{fontFamily:t.serif,fontSize:26,color:t.text,marginBottom:8},children:"Summary & Knowledge Check"})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:24},children:[e.jsxs(A,{color:t.cyan,children:[e.jsx(B,{color:t.cyan,children:"► FORWARD PASS SUMMARY"}),[["1. Input","Feed raw data x₁, x₂, ... into the input layer",t.inputC],["2. Weighted Sum","z = w₁x₁ + w₂x₂ + ... + b for each neuron",t.cyan],["3. Activation","a = f(z) — apply ReLU/Sigmoid to add non-linearity",t.red],["4. Repeat Layers","Each layer feeds into the next, left to right",t.hiddenC],["5. Output","Final layer produces prediction ŷ",t.outputC],["6. Interpret","Sigmoid output → probability; regression → raw value",t.green]].map(([r,n,m])=>e.jsxs("div",{style:{display:"flex",gap:10,padding:"6px 0",borderBottom:`1px solid ${t.border}`},children:[e.jsx("div",{style:{width:5,height:5,borderRadius:"50%",background:m,marginTop:5,flexShrink:0}}),e.jsxs("div",{children:[e.jsxs("span",{style:{fontFamily:t.mono,fontSize:10,color:m},children:[r," "]}),e.jsx("span",{style:{color:t.textSoft,fontSize:12},children:n})]})]},r))]}),e.jsxs(A,{color:t.orange,children:[e.jsx(B,{color:t.orange,children:"◄ BACKPROPAGATION SUMMARY"}),[["1. Compute Loss","L = ½(ŷ−y)² — how wrong was the prediction?",t.red],["2. Output Gradient","dL/dŷ = ŷ−y — how much does loss change per unit ŷ?",t.orange],["3. Output Delta","δ_o = dL/dŷ × σ'(z_o) — combine with activation deriv",t.orange],["4. Weight Grads","∂L/∂w = δ × input — credit each weight for the error",t.yellow],["5. Propagate Back","δ_h = δ_o × w × σ'(z_h) — flow error into hidden layers",t.hiddenC],["6. Update Weights","w_new = w − α × ∂L/∂w — gradient descent step",t.green]].map(([r,n,m])=>e.jsxs("div",{style:{display:"flex",gap:10,padding:"6px 0",borderBottom:`1px solid ${t.border}`},children:[e.jsx("div",{style:{width:5,height:5,borderRadius:"50%",background:m,marginTop:5,flexShrink:0}}),e.jsxs("div",{children:[e.jsxs("span",{style:{fontFamily:t.mono,fontSize:10,color:m},children:[r," "]}),e.jsx("span",{style:{color:t.textSoft,fontSize:12},children:n})]})]},r))]})]}),e.jsxs(A,{color:t.border,style:{marginBottom:24},children:[e.jsx(B,{color:t.yellow,children:"📐 KEY FORMULAS REFERENCE CARD"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginTop:10},children:[{t:"Weighted Sum",f:"z = Σ(wᵢxᵢ) + b",c:t.cyan},{t:"Sigmoid",f:"σ(z) = 1/(1+e⁻ᶻ)",c:t.red},{t:"Sigmoid Derivative",f:"σ'(z) = σ(z)(1−σ(z))",c:t.red},{t:"ReLU",f:"f(z) = max(0, z)",c:t.green},{t:"MSE Loss",f:"L = ½(ŷ−y)²",c:t.orange},{t:"dL/dŷ (MSE)",f:"= ŷ − y",c:t.orange},{t:"Output Delta",f:"δ_o = dL/dŷ × σ'(z_o)",c:t.yellow},{t:"Weight Gradient",f:"∂L/∂w = δ × input",c:t.purple},{t:"Weight Update",f:"w ← w − α × ∂L/∂w",c:t.green}].map(r=>e.jsxs("div",{style:{background:t.surface,border:`1px solid ${r.c}33`,borderRadius:6,padding:10},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:r.c,letterSpacing:1,marginBottom:5},children:r.t}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:12,color:t.text},children:r.f})]},r.t))})]}),e.jsx("div",{style:{marginBottom:8},children:e.jsx(B,{color:t.green,style:{fontSize:11,letterSpacing:3},children:"🧠 KNOWLEDGE CHECK — CLICK TO REVEAL ANSWERS"})}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:10},children:s.map((r,n)=>e.jsxs("div",{onClick:()=>l(n),style:{background:o[n]?`${r.c}0e`:t.card,border:`1px solid ${o[n]?r.c:t.border}`,borderRadius:8,padding:"14px 18px",cursor:"pointer",transition:"all 0.2s"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12},children:[e.jsxs("div",{style:{display:"flex",gap:12,flex:1},children:[e.jsxs("div",{style:{width:24,height:24,borderRadius:"50%",flexShrink:0,background:`${r.c}22`,border:`1px solid ${r.c}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:t.mono,fontSize:10,color:r.c},children:["Q",n+1]}),e.jsx("div",{style:{color:t.text,fontSize:13,lineHeight:1.6,fontWeight:"500"},children:r.q})]}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:16,color:o[n]?r.c:t.textDim,flexShrink:0},children:o[n]?"▲":"▼"})]}),o[n]&&e.jsxs("div",{style:{marginTop:12,paddingTop:12,borderTop:`1px solid ${r.c}33`,color:t.text,fontSize:13,lineHeight:1.75,borderLeft:`3px solid ${r.c}`,paddingLeft:12},children:["✅ ",r.a]})]},n))}),e.jsxs("div",{style:{marginTop:24,background:`${t.cyan}08`,border:`1px solid ${t.cyan}33`,borderRadius:10,padding:"16px 20px"},children:[e.jsx(B,{color:t.cyan,children:"🚀 WHERE TO GO NEXT"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:12,marginTop:12},children:[{icon:"🖼️",t:"CNNs",d:"Convolutional networks for images. Add spatial structure.",c:t.cyan},{icon:"📝",t:"RNNs / LSTMs",d:"Recurrent networks for sequences, text, and time.",c:t.purple},{icon:"🤖",t:"Transformers",d:"Attention mechanism — powers GPT, Claude, BERT.",c:t.orange},{icon:"🎲",t:"GANs",d:"Two networks compete — one generates, one judges.",c:t.green}].map(r=>e.jsxs("div",{style:{background:t.card,border:`1px solid ${r.c}33`,borderRadius:8,padding:14},children:[e.jsx("div",{style:{fontSize:28,marginBottom:8},children:r.icon}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:11,color:r.c,marginBottom:6},children:r.t}),e.jsx("div",{style:{color:t.textSoft,fontSize:11,lineHeight:1.5},children:r.d})]},r.t))})]})]})},M=[{id:0,label:"Overview",icon:"01",short:"OVERVIEW",color:t.cyan,component:e.jsx(qe,{})},{id:1,label:"Architecture",icon:"02",short:"ARCHITECTURE",color:t.inputC,component:e.jsx(Ve,{})},{id:2,label:"Forward Pass",icon:"03",short:"FORWARD PASS",color:t.hiddenC,component:e.jsx(Je,{})},{id:3,label:"Activations",icon:"04",short:"ACTIVATIONS",color:t.red,component:e.jsx(Ye,{})},{id:4,label:"Loss Function",icon:"05",short:"LOSS",color:t.orange,component:e.jsx(Xe,{})},{id:5,label:"Backpropagation",icon:"06",short:"BACKPROP",color:t.yellow,component:e.jsx(Qe,{})},{id:6,label:"Training Loop",icon:"07",short:"TRAINING",color:t.green,component:e.jsx(Ke,{})},{id:7,label:"Playground",icon:"08",short:"PLAYGROUND",color:t.purple,component:e.jsx(Ze,{})},{id:8,label:"Summary & Quiz",icon:"09",short:"QUIZ",color:t.cyan,component:e.jsx(et,{})}],tt=function(){const[o,a]=w.useState(0),l=w.useRef(null);w.useEffect(()=>{l.current&&(l.current.scrollTop=0)},[o]);const s=M[o];return e.jsxs("div",{style:{background:t.bg,minHeight:"100vh",fontFamily:"'Palatino Linotype', 'Book Antiqua', Palatino, serif",color:t.text,position:"relative"},children:[e.jsx("style",{children:`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${t.surface}; }
        ::-webkit-scrollbar-thumb { background: ${t.border}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${t.cyanDim}; }
        * { box-sizing: border-box; }
      `}),e.jsx(Ue,{}),e.jsx("div",{style:{position:"relative",zIndex:10,background:`linear-gradient(180deg, #040d1a 0%, ${t.bg} 100%)`,borderBottom:`1px solid ${t.border}`},children:e.jsxs("div",{style:{maxWidth:1100,margin:"0 auto",padding:"18px 28px 0"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:8,color:t.cyanDim,letterSpacing:5,marginBottom:8},children:"NEURAL NETWORK FUNDAMENTALS · INTERACTIVE CURRICULUM"}),e.jsx("div",{style:{fontFamily:"'Georgia', serif",fontSize:24,fontWeight:"bold",background:`linear-gradient(120deg, ${t.cyan}, ${t.purple})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1.2,marginBottom:4},children:"Feedforward Neural Networks"}),e.jsx("div",{style:{fontFamily:"'Georgia', serif",fontSize:14,color:t.textSoft,letterSpacing:1},children:"& Backpropagation · Complete Step-by-Step Guide"})]}),e.jsxs("div",{style:{textAlign:"right"},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:t.textDim,letterSpacing:2,marginBottom:4},children:"EXAMPLE NETWORK"}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:11,color:t.textSoft},children:"Architecture: 2 → 2 → 1"}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:11,color:t.textSoft},children:"Inputs: x₁=0.6, x₂=0.8"}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:11,color:t.textSoft},children:"Activation: Sigmoid"}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:11,color:t.textSoft},children:"Loss: MSE"})]})]}),e.jsx("div",{style:{display:"flex",gap:2,overflowX:"auto"},children:M.map(r=>e.jsxs("button",{onClick:()=>a(r.id),style:{padding:"9px 14px",border:"none",cursor:"pointer",background:o===r.id?t.card:"transparent",borderTop:`2px solid ${o===r.id?r.color:"transparent"}`,color:o===r.id?r.color:t.textDim,fontFamily:t.mono,fontSize:9,letterSpacing:1.5,borderRadius:"4px 4px 0 0",whiteSpace:"nowrap",transition:"all 0.15s",flexShrink:0},children:[e.jsx("span",{style:{marginRight:5,opacity:.5},children:r.icon}),r.short]},r.id))})]})}),e.jsx("div",{style:{display:"flex",height:2},children:M.map(r=>e.jsx("div",{style:{flex:1,background:r.id<=o?r.color:t.surface,transition:"background 0.3s"}},r.id))}),e.jsxs("div",{ref:l,style:{position:"relative",zIndex:5,maxWidth:1100,margin:"0 auto",padding:"28px 28px 40px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:24},children:[e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:t.textDim,letterSpacing:2},children:"NEURAL NETWORKS"}),e.jsx("div",{style:{color:t.textDim},children:"›"}),e.jsx("div",{style:{fontFamily:t.mono,fontSize:9,color:s.color,letterSpacing:2},children:s.short}),e.jsx("div",{style:{flex:1}}),e.jsxs("div",{style:{fontFamily:t.mono,fontSize:9,color:t.textDim},children:[o+1," / ",M.length]})]}),e.jsx("div",{children:M[o].component},o),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:36,paddingTop:20,borderTop:`1px solid ${t.border}`},children:[e.jsxs("button",{onClick:()=>a(r=>Math.max(0,r-1)),disabled:o===0,style:{display:"flex",alignItems:"center",gap:8,padding:"10px 22px",fontFamily:t.mono,fontSize:11,letterSpacing:2,background:o===0?"transparent":t.card,border:`1px solid ${o===0?"transparent":t.border}`,color:o===0?"transparent":t.text,borderRadius:6,cursor:o===0?"default":"pointer"},children:["← ",o>0?M[o-1].short:""]}),e.jsx("div",{style:{display:"flex",gap:6},children:M.map(r=>e.jsx("button",{onClick:()=>a(r.id),style:{width:r.id===o?24:8,height:8,borderRadius:4,background:r.id===o?r.color:r.id<o?`${r.color}55`:t.border,border:"none",cursor:"pointer",transition:"all 0.3s",padding:0}},r.id))}),e.jsxs("button",{onClick:()=>a(r=>Math.min(M.length-1,r+1)),disabled:o===M.length-1,style:{display:"flex",alignItems:"center",gap:8,padding:"10px 22px",fontFamily:t.mono,fontSize:11,letterSpacing:2,background:o===M.length-1?"transparent":`${s.color}18`,border:`1px solid ${o===M.length-1?"transparent":s.color}`,color:o===M.length-1?"transparent":s.color,borderRadius:6,cursor:o===M.length-1?"default":"pointer"},children:[o<M.length-1?M[o+1].short:""," →"]})]})]})]})};function it(){const[j,o]=w.useState(0),a=[{id:0,label:"14. DL Architectures"},{id:1,label:"15. DL Implementation (Py)"},{id:2,label:"15. DL Classroom"},{id:3,label:"37. Neural Networks"}],l="#0a0e1a",s="#1e3a5f",r="#00d4ff",n="#475569";return e.jsxs("div",{style:{minHeight:"100vh"},children:[e.jsxs("div",{style:{display:"flex",gap:"6px",padding:"10px 16px",background:l,borderBottom:`2px solid ${s}`,flexWrap:"wrap",position:"sticky",top:0,zIndex:9999},children:[e.jsx("span",{style:{color:r,fontFamily:"'Courier New', monospace",fontSize:11,display:"flex",alignItems:"center",marginRight:8,fontWeight:700,letterSpacing:1},children:"Deep Learning Suite:"}),a.map(m=>e.jsx("button",{onClick:()=>o(m.id),style:{padding:"5px 14px",borderRadius:5,border:`1px solid ${j===m.id?r:s}`,background:j===m.id?`${r}18`:"transparent",color:j===m.id?r:n,fontFamily:"'Courier New', monospace",fontSize:10,cursor:"pointer",transition:"all 0.2s",whiteSpace:"nowrap"},children:m.label},m.id))]}),e.jsxs("div",{children:[j===0&&e.jsx(Le,{}),j===1&&e.jsx(Fe,{}),j===2&&e.jsx(Oe,{}),j===3&&e.jsx(tt,{})]})]})}export{it as default};
