/* Drawn diagrams for the neural-network topics. Used in notes with a line:  ::fig name | caption */
(function(){
  const defs = `<defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="ah"/></marker></defs>`;
  const svg = (w, h, body, label) => `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${defs}${body}</svg>`;
  const T = (x, y, s, cls='t', anchor='middle') => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${s}</text>`;
  const C = (x, y, r, cls='nd') => `<circle cx="${x}" cy="${y}" r="${r}" class="${cls}"/>`;
  const L = (x1, y1, x2, y2, cls='ln', arrow=true) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"${arrow?' marker-end="url(#ar)"':''}/>`;
  // edge between two circles (stops at the rim) with an optional label near the start
  const E = (a, b, r1, r2, lab, t=0.3, cls='ln', dy=-6) => {
    const dx=b[0]-a[0], dy0=b[1]-a[1], d=Math.hypot(dx,dy0), ux=dx/d, uy=dy0/d;
    const x1=a[0]+ux*r1, y1=a[1]+uy*r1, x2=b[0]-ux*(r2+3), y2=b[1]-uy*(r2+3);
    const lx=x1+(x2-x1)*t, ly=y1+(y2-y1)*t+dy;
    return L(x1,y1,x2,y2,cls) + (lab ? `<text x="${lx}" y="${ly}" class="w" text-anchor="middle">${lab}</text>` : '');
  };
  const D = {};

  /* artificial neuron */
  D['neuron-model'] = svg(680, 260, [
    [['x₁',60],['x₂',130],['x₃',200]].map(([n,y],i)=>C(70,y,24,'nd in')+T(70,y+5,n)+E([70,y],[330,130],24,46,['w₁','w₂','w₃'][i],0.45)).join(''),
    C(330,130,46,'nd sum')+T(330,140,'Σ','big'),
    T(330,30,'bias b','s')+L(330,38,330,80),
    L(376,130,450,130),
    `<rect x="452" y="100" width="90" height="60" rx="12" class="nd fx"/>`+T(497,136,'f( )'),
    L(542,130,620,130)+T(640,136,'y','t','start'),
    T(410,118,'y_in','s'),
    T(330,240,'1. multiply each input by its weight   2. add them + bias   3. pass through f','s')
  ].join(''), 'Artificial neuron');

  /* sigmoid curve */
  D['sigmoid'] = (()=>{
    const X=v=>60+(v+6)*45, Y=v=>230-v*190;
    let p=''; for(let v=-6; v<=6.001; v+=0.1){ p += (p?'L':'M') + X(v).toFixed(1)+' '+Y(1/(1+Math.exp(-v))).toFixed(1); }
    const pts=[[-2,0.119],[0,0.5],[0.3775,0.593],[2,0.881]];
    return svg(680, 270, [
      L(60,230,620,230,'axis',false)+L(330,240,330,30,'axis',false),
      L(60,Y(1),600,Y(1),'grid',false)+T(52,Y(1)+4,'1','s','end')+T(52,Y(0.5)+4,'0.5','s','end')+T(52,234,'0','s','end'),
      [-6,-4,-2,0,2,4,6].map(v=>T(X(v),250,v,'s')).join(''),
      `<path d="${p}" class="curve"/>`,
      pts.map(([x,y])=>C(X(x),Y(y),5,'dot')+T(X(x)+(x<0?-10:10),Y(y)-10,`(${x}, ${y})`,'s',x<0?'end':'start')).join(''),
      T(640,234,'x','t','start')+T(330,22,'f(x)','t')
    ].join(''), 'Sigmoid curve');
  })();

  /* three activation functions */
  D['activations'] = (()=>{
    const box=(ox,title,path,extra='')=>`<g transform="translate(${ox},0)">`+L(10,110,200,110,'axis',false)+L(105,190,105,20,'axis',false)+`<path d="${path}" class="curve"/>`+extra+T(105,215,title,'t')+`</g>`;
    let sp=''; for(let v=-4; v<=4.001; v+=0.1){ sp += (sp?'L':'M') + (105+v*22).toFixed(1)+' '+(180-150/(1+Math.exp(-v))).toFixed(1); }
    return svg(680, 230, [
      box(0,'Binary step','M15 180 L105 180 L105 30 L195 30', T(195,25,'1','s','end')+T(20,175,'0','s','start')),
      box(225,'Bipolar (perceptron)','M15 180 L90 180 L90 110 L120 110 L120 40 L195 40', T(195,35,'+1','s','end')+T(20,175,'−1','s','start')+T(105,128,'0 band (±θ)','s')),
      box(450,'Sigmoid',sp, T(195,35,'1','s','end')+T(20,175,'0','s','start'))
    ].join(''), 'Activation functions');
  })();

  /* feed-forward vs recurrent */
  D['ff-vs-rec'] = svg(680, 250, [
    T(160,24,'Feed-forward (one direction)','t'),
    [60,140].map(y=>C(70,y,24,'nd in')).join('')+T(70,65,'x₁')+T(70,145,'x₂'),
    [60,140].map(y=>C(250,y,24,'nd out')).join('')+T(250,65,'y₁')+T(250,145,'y₂'),
    E([70,60],[250,60],24,24,'')+E([70,60],[250,140],24,24,'')+E([70,140],[250,60],24,24,'')+E([70,140],[250,140],24,24,''),
    T(160,215,'input → output only','s'),
    T(520,24,'Recurrent (signals can loop back)','t'),
    [60,140].map(y=>C(430,y,24,'nd in')).join('')+T(430,65,'x₁')+T(430,145,'x₂'),
    [60,140].map(y=>C(610,y,24,'nd out')).join('')+T(610,65,'y₁')+T(610,145,'y₂'),
    E([430,60],[610,60],24,24,'')+E([610,140],[430,140],24,24,'','','ln back')+E([430,140],[610,60],24,24,'')+E([610,60],[430,140],24,24,'','','ln back'),
    `<path d="M610 164 C 640 200, 580 200, 600 166" class="ln back" marker-end="url(#ar)"/>`,
    T(520,215,'outputs feed back into the network','s')
  ].join(''), 'Feed-forward vs recurrent network');

  /* perceptron architecture */
  D['perc-arch'] = svg(680, 250, [
    [['1',40,'b'],['x₁',110,'w₁'],['x₂',180,'w₂']].map(([n,y,w])=>C(110,y,24,n==='1'?'nd bias':'nd in')+T(110,y+5,n)+E([110,y],[420,125],24,40,w,0.5)).join(''),
    C(420,125,40,'nd out')+T(420,131,'Y'),
    L(460,125,560,125)+T(570,131,'+1 / 0 / −1','t','start'),
    T(420,200,'y_in = b + x₁w₁ + x₂w₂','s'),
    T(420,222,'output +1 if y_in > θ,  −1 if y_in < −θ,  else 0','s')
  ].join(''), 'Perceptron');

  /* AND decision boundary */
  D['perc-and'] = (()=>{
    const X=v=>110+(v+0.4)*170, Y=v=>255-(v+0.4)*120;
    // 2x1 + 3x2 = c, drawn from the top edge (x2 = 1.5) to the right edge (x1 = 1.5)
    const line=(c)=>`<line x1="${X((c-4.5)/2)}" y1="${Y(1.5)}" x2="${X(1.5)}" y2="${Y((c-3)/3)}"`;
    const pt=(x,y,pos)=> pos ? C(X(x),Y(y),9,'dot pos') : `<g class="neg"><line x1="${X(x)-8}" y1="${Y(y)-8}" x2="${X(x)+8}" y2="${Y(y)+8}"/><line x1="${X(x)-8}" y1="${Y(y)+8}" x2="${X(x)+8}" y2="${Y(y)-8}"/></g>`;
    return svg(680, 290, [
      L(X(-0.4),Y(0),X(1.5),Y(0),'axis',false)+L(X(0),Y(-0.4),X(0),Y(1.5),'axis',false),
      T(X(1.5)+10,Y(0)+5,'x₁','t','start')+T(X(0)-14,Y(1.5)+10,'x₂'),
      T(X(1),Y(0)+20,'1','s')+T(X(0)-12,Y(1)+4,'1','s','end')+T(X(0)-12,Y(0)+16,'0','s','end'),
      line(4.2)+' class="band"/>'+line(3.8)+' class="band"/>',
      line(4)+' class="bound"/>',
      pt(0,0)+pt(1,0)+pt(0,1)+pt(1,1,true),
      T(X(1)+14,Y(1)-10,'(1,1) → +1','s','start'),
      T(X(1)+14,Y(0)-10,'(1,0) → −1','s','start'),
      T(X(0)+14,Y(1)-10,'(0,1) → −1','s','start'),
      T(470,60,'2x₁ + 3x₂ − 4 = 0','t','start'),
      T(470,82,'dashed lines = ±θ band','s','start'),
      C(476,118,7,'dot pos')+T(490,123,'+1  (AND is true)','s','start'),
      `<g class="neg"><line x1="470" y1="140" x2="482" y2="152"/><line x1="470" y1="152" x2="482" y2="140"/></g>`+T(490,151,'−1','s','start')
    ].join(''), 'AND decision boundary');
  })();

  /* XOR with a hidden layer */
  D['xor-mlp'] = svg(680, 260, [
    C(80,70,24,'nd in')+T(80,75,'x₁')+C(80,190,24,'nd in')+T(80,195,'x₂'),
    C(320,70,30,'nd hid')+T(320,75,'h₁')+T(320,30,'OR','s')+C(320,190,30,'nd hid')+T(320,195,'h₂')+T(320,240,'AND','s'),
    E([80,70],[320,70],24,30,'1')+E([80,70],[320,190],24,30,'1',0.25)+E([80,190],[320,70],24,30,'1',0.25)+E([80,190],[320,190],24,30,'1'),
    C(560,130,32,'nd out')+T(560,135,'y'),
    E([320,70],[560,130],30,32,'+1',0.45)+E([320,190],[560,130],30,32,'−2',0.45,'ln',18),
    L(592,130,650,130)+T(655,135,'XOR','t','start'),
    T(320,130,'thresholds: h₁ 0.5, h₂ 1.5, y 0.5','s')
  ].join(''), 'XOR network');

  /* MLP forward and backward */
  D['mlp-flow'] = (()=>{
    const ins=[60,140,220], hid=[40,100,160,220], outs=[90,170];
    let e=''; ins.forEach(a=>hid.forEach(b=>e+=`<line x1="104" y1="${a}" x2="306" y2="${b}" class="ln thin"/>`)); hid.forEach(a=>outs.forEach(b=>e+=`<line x1="334" y1="${a}" x2="536" y2="${b}" class="ln thin"/>`));
    return svg(680, 330, [
      `<rect x="70" y="252" width="510" height="26" rx="8" class="fwd"/>`+T(325,270,'FORWARD PASS: input signals → output','t'),
      `<rect x="70" y="290" width="510" height="26" rx="8" class="bwd"/>`+T(325,308,'BACKWARD PASS: error ← sent back, weights corrected','t'),
      e,
      ins.map(y=>`<rect x="76" y="${y-14}" width="28" height="28" rx="4" class="nd in"/>`).join(''),
      hid.map(y=>C(320,y,14,'nd hid')).join(''),
      outs.map(y=>C(550,y,14,'nd out')).join(''),
      T(90,22,'Input layer','t')+T(320,20,'Hidden layer','t')+T(550,52,'Output layer','t'),
      T(640,94,'y₁','t','start')+T(640,174,'y₂','t','start')+L(564,90,630,90)+L(564,170,630,170)
    ].join(''), 'Multilayer perceptron forward and backward pass');
  })();

  /* the 2-2-2 example network with values */
  D['net221'] = svg(680, 330, [
    C(90,90,28,'nd in')+T(90,88,'i₁')+T(90,104,'0.05','s'),
    C(90,230,28,'nd in')+T(90,228,'i₂')+T(90,244,'0.10','s'),
    C(330,90,28,'nd hid')+T(330,95,'h₁')+C(330,230,28,'nd hid')+T(330,235,'h₂'),
    C(570,90,28,'nd out')+T(570,95,'o₁')+C(570,230,28,'nd out')+T(570,235,'o₂'),
    E([90,90],[330,90],28,28,'w₁ = 0.15',0.5)+E([90,90],[330,230],28,28,'w₂ = 0.20',0.22,'ln',-4)+E([90,230],[330,90],28,28,'w₃ = 0.25',0.22,'ln',14)+E([90,230],[330,230],28,28,'w₄ = 0.30',0.5,'ln',20),
    E([330,90],[570,90],28,28,'w₅ = 0.40',0.5)+E([330,90],[570,230],28,28,'w₆ = 0.45',0.22,'ln',-4)+E([330,230],[570,90],28,28,'w₇ = 0.50',0.22,'ln',14)+E([330,230],[570,230],28,28,'w₈ = 0.55',0.5,'ln',20),
    C(210,300,16,'nd bias')+T(210,305,'1','s')+T(240,305,'b₁ = 0.35','s','start')+`<line x1="220" y1="288" x2="310" y2="252" class="ln thin" marker-end="url(#ar)"/>`,
    C(450,300,16,'nd bias')+T(450,305,'1','s')+T(480,305,'b₂ = 0.60','s','start')+`<line x1="460" y1="288" x2="550" y2="252" class="ln thin" marker-end="url(#ar)"/>`,
    L(598,90,640,90)+T(645,86,'target','s','start')+T(645,102,'0.01','t','start'),
    L(598,230,640,230)+T(645,226,'target','s','start')+T(645,242,'0.99','t','start'),
    T(90,40,'Inputs','t')+T(330,40,'Hidden','t')+T(570,40,'Outputs','t')
  ].join(''), 'Example network 2-2-2 with weights');

  /* chain rule picture for w5 */
  D['chain'] = svg(680, 170, [
    [['w₅',60],['net_o₁',230],['out_o₁',400],['E_total',580]].map(([n,x])=>`<rect x="${x-62}" y="50" width="124" height="48" rx="12" class="nd ${n==='E_total'?'out':'hid'}"/>`+T(x,80,n)).join(''),
    L(122,74,166,74)+L(292,74,336,74)+L(462,74,516,74),
    T(144,130,'∂net/∂w₅','s')+T(314,130,'∂out/∂net','s')+T(488,130,'∂E/∂out','s'),
    T(340,160,'multiply the three small effects to get ∂E/∂w₅','s')
  ].join(''), 'Chain rule for w5');

  /* error going down */
  D['error-curve'] = (()=>{
    const pts=[[0,0.298],[1,0.291],[10,0.23],[50,0.10],[200,0.03],[1000,0.006],[10000,0.000035]];
    const X=v=>80+Math.log10(v+1)/4*520, Y=v=>220-v/0.3*180;
    const p=pts.map((q,i)=>(i?'L':'M')+X(q[0]).toFixed(1)+' '+Y(q[1]).toFixed(1)).join('');
    return svg(680, 260, [
      L(80,220,620,220,'axis',false)+L(80,230,80,25,'axis',false),
      [[0,'0'],[10,'10'],[100,'100'],[1000,'1,000'],[10000,'10,000']].map(([v,s])=>T(X(v),240,s,'s')).join(''),
      T(72,Y(0.3)+4,'0.3','s','end')+T(72,Y(0.15)+4,'0.15','s','end')+T(72,224,'0','s','end'),
      `<path d="${p}" class="curve"/>`,
      C(X(0),Y(0.298),5,'dot')+T(X(0)+10,Y(0.298)-8,'start: 0.298','s','start'),
      C(X(1),Y(0.291),5,'dot')+T(X(1)+10,Y(0.291)+16,'after 1 round: 0.291','s','start'),
      C(X(10000),Y(0.000035),5,'dot')+T(X(10000)-6,Y(0.000035)-12,'after 10,000: 0.000035','s','end'),
      T(350,256,'training rounds (log scale)','s')+T(30,20,'Error','t','start')
    ].join(''), 'Error falling during training');
  })();

  /* gradient descent on a bowl */
  D['grad-bowl'] = (()=>{
    const X=v=>90+(v+0.5)*100, Y=v=>220-v*16;
    let p=''; for(let w=-0.5; w<=6.5; w+=0.05){ p+=(p?'L':'M')+X(w).toFixed(1)+' '+Y((w-3)**2).toFixed(1); }
    const steps=[0,1.5,2.25,2.625];
    return svg(680, 250, [
      L(60,220,700,220,'axis',false)+T(660,240,'weight w','s'),
      `<path d="${p}" class="curve"/>`,
      steps.map((w,i)=>C(X(w),Y((w-3)**2),7,'dot')+T(X(w),Y((w-3)**2)-14,'w='+w,'s')).join(''),
      steps.slice(0,-1).map((w,i)=>`<path d="M${X(w)+8} ${Y((w-3)**2)+4} Q ${(X(w)+X(steps[i+1]))/2} ${Y((w-3)**2)+30} ${X(steps[i+1])-9} ${Y((steps[i+1]-3)**2)+2}" class="ln step" marker-end="url(#ar)"/>`).join(''),
      C(X(3),Y(0),6,'dot pos')+T(X(3),238,'lowest error (w = 3)','s'),
      T(120,24,'E = (w − 3)²','t','start')
    ].join(''), 'Gradient descent');
  })();

  window.DIAGRAMS = D;
})();
