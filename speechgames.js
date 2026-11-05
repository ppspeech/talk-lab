/* Speech games kit: 14 calm word-practice games. Built from the NDP3 Session Tracker. Original art: emoji, CSS and SVG. */
(function(){"use strict";

/* ---- shims: the NDP3 game code runs against these ---- */
let OPT={}, ITEMS=[], KEY={}, LV=null, toastT=null, ROOT=null, VIEW="game", NEWSTK=[];
const S={fx:{}, client:{goals:[], stickers:[], tank:[], sound:false, lastGame:""}, tab:"session"};
{ let v=false; Object.defineProperty(S.fx,"busy",{get(){return v},set(x){ v=!!x; S.fx.busySince=x?Date.now():0; }}); }
setInterval(()=>{ if(S.fx.busy && Date.now()-S.fx.busySince>6000){ S.fx.busy=false; if(ROOT) renderMain(); } },2000);
const GOAL={id:"w", stimuli:[]};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function ensureLive(){ return LV; }
function ensureFx(){ return LV; }
function saveLive(){}
function wantWake(){}
function scheduleSave(){ try{ OPT.onSave && OPT.onSave({stickers:S.client.stickers, tank:S.client.tank, sound:S.client.sound, lastGame:S.client.lastGame, pics:picsOn()}); }catch(e){} }
function fxItems(){ return GOAL.stimuli.map((w,si)=>({g:GOAL,si})); }
function fxCurrent(){ if(!GOAL.stimuli.length) return null; if(!LV.cur) LV.cur={gid:"w",si:0}; return {g:GOAL, si:LV.cur.si}; }
function fxPickNext(cur){ const n=GOAL.stimuli.length; if(!n) return null; const si=cur?(cur.si+1)%n:0; LV.cur={gid:"w",si}; return {g:GOAL,si}; }
function logTrial(g,si,v){ LV.log.push({si,v,k:v?"clear":"off"}); }
function toast(m){ const t=ROOT&&ROOT.querySelector(".sgk-toast"); if(!t) return; t.textContent=m; t.hidden=false; clearTimeout(toastT); toastT=setTimeout(()=>t.hidden=true,2400); }
const picOf=w=>{ const k=KEY[w]!==undefined?KEY[w]:w; let p=""; try{ p=OPT.pic?OPT.pic(k):""; }catch(e){} return p||PIC[String(k||"").trim().toLowerCase()]||""; };

const PIC={pie:"🥧",pea:"🫛",paw:"🐾",pear:"🍐",bee:"🐝",bye:"👋",bear:"🐻",moo:"🐄",mow:"🌱",tea:"🍵",toe:"🦶",two:"2️⃣",tie:"👔",door:"🚪",knee:"🦵",no:"🙅",key:"🔑",car:"🚗",cow:"🐄",go:"🟢",four:"4️⃣",sea:"🌊",saw:"🪚",sew:"🪡",zoo:"🦁",shoe:"👟",hi:"👋",hay:"🌾",row:"🚣",eye:"👁️",up:"⬆️",ape:"🦍",eat:"🍽️",out:"🚪",egg:"🥚",ice:"🧊",arm:"💪",owl:"🦉",pop:"🎈",pup:"🐶",pipe:"🪈",pen:"🖊️",pin:"📌",pan:"🍳",pig:"🐷",pot:"🍲",pet:"🐶",pick:"⛏️",park:"🛝",pool:"🏊",push:"🫸",pull:"🫷",peach:"🍑",page:"📄",purse:"👛",bib:"🍼",bed:"🛏️",bat:"🦇",bag:"👜",big:"🐘",bin:"🗑️",bun:"🍞",bus:"🚌",bike:"🚲",boat:"⛵",book:"📖",boot:"🥾",bath:"🛁",bell:"🔔",ball:"⚽",bone:"🦴",beach:"🏖️",bowl:"🥣",bug:"🐛",bean:"🫘",bird:"🐦",mum:"👩",map:"🗺️",mop:"🧹",mat:"🧘",man:"👨",moon:"🌙",mouse:"🐭",mouth:"👄",meat:"🍖",mud:"🟤",mug:"☕",match:"🎯",mail:"✉️",top:"🔝",tap:"🚰",tape:"📼",tub:"🛁",ten:"🔟",tooth:"🦷",tail:"🐕",teeth:"🦷",toys:"🧸",dog:"🐕",dad:"👨",duck:"🦆",dish:"🍽️",dig:"⛏️",doll:"🪆",down:"⬇️",dice:"🎲",nap:"😴",nose:"👃",nut:"🥜",neck:"🦒",net:"🥅",nine:"9️⃣",nail:"💅",cat:"🐱",cup:"🥤",cap:"🧢",cake:"🎂",cook:"🧑‍🍳",kick:"🦵",kite:"🪁",comb:"🪮",coat:"🧥",king:"🤴",cut:"✂️",coin:"🪙",corn:"🌽",cough:"🤧",can:"🥫",gate:"🚧",game:"🎮",gum:"🍬",goat:"🐐",goose:"🪿",fan:"🪭",fish:"🐟",foot:"🦶",fork:"🍴",food:"🍱",face:"🙂",feet:"🦶",fin:"🦈",fun:"🎉",van:"🚐",vase:"🏺",vet:"🩺",sun:"☀️",sock:"🧦",soap:"🧼",sad:"😢",seal:"🦭",seat:"💺",soup:"🍜",sick:"🤒",sail:"⛵",zip:"🤐",zoom:"🏎️",shop:"🛒",ship:"🚢",sheep:"🐑",shell:"🐚",shark:"🦈",shoot:"🏀",hat:"🎩",hop:"🐇",hug:"🤗",hot:"🔥",house:"🏠",hen:"🐔",hook:"🪝",head:"🗣️",horse:"🐴",ham:"🍖",hole:"🕳️",wet:"💦",web:"🕸️",wing:"🪽",wash:"🧽",walk:"🚶",watch:"⌚",win:"🏆",yes:"👍",yum:"😋",yuck:"🤢",yawn:"🥱",leg:"🦵",lip:"👄",lips:"💋",lock:"🔒",log:"🪵",lamb:"🐑",leaf:"🍃",look:"👀",light:"💡",lid:"🫙",chip:"🍟",chop:"🪓",chin:"🧔",cheese:"🧀",chick:"🐥",jam:"🍓",jet:"✈️",jug:"🫗",juice:"🧃",jeep:"🚙",red:"🔴",rat:"🐀",rug:"🟫",rock:"🪨",run:"🏃",rain:"🌧️",road:"🛣️",rope:"🪢",ring:"💍",thumb:"👍",sing:"🎤",bang:"💥",puppy:"🐶",happy:"😀",hippo:"🦛",poppy:"🌺",nappy:"🧷",zipper:"🧥",paper:"📄",yippee:"🥳",baby:"👶",mummy:"👩",daddy:"👨",teddy:"🧸",tummy:"🫃",bunny:"🐰",money:"💰",honey:"🍯",doggy:"🐕",cookie:"🍪",tiger:"🐯",water:"💧",dinner:"🍽️",hammer:"🔨","boo-boo":"🩹","bye-bye":"👋",yoyo:"🪀",apple:"🍎",open:"📭",teapot:"🫖",puppet:"🧦",bucket:"🪣",bottle:"🍼",button:"🔘",kitten:"🐱",rabbit:"🐇",robot:"🤖",monkey:"🐒",pizza:"🍕",banana:"🍌",peekaboo:"🙈",potato:"🥔",zookeeper:"🦓",snow:"❄️",sky:"🌤️",spy:"🕵️",ski:"⛷️",blue:"🔵",play:"🛝",tree:"🌳",three:"3️⃣",fly:"🪰",star:"⭐",glue:"🧴",spoon:"🥄",stop:"🛑",slide:"🛝",sleep:"😴",snake:"🐍",spot:"🔴",plane:"✈️",plate:"🍽️",clap:"👏",block:"🧱",frog:"🐸",truck:"🚚",drum:"🥁",bread:"🍞",crab:"🦀",swim:"🏊",milk:"🥛",fox:"🦊",six:"6️⃣",jump:"🦘",tent:"⛺",hand:"✋",mask:"🎭",nest:"🪺",belt:"🪢",cups:"🥤",socks:"🧦",ant:"🐜",whee:"🎢",doe:"🦌",boy:"👦",toy:"🧸",wow:"🤩",eight:"8️⃣",cone:"🍦",yak:"🐃",rake:"🧹",kiss:"😘",girl:"👧",gift:"🎁",tutu:"🩰",pony:"🐴",city:"🏙️",tuba:"🎺",tuna:"🐟",taco:"🌮",pillow:"🛏️",kitty:"🐱",teepee:"⛺",movie:"🎬",penny:"🪙",cocoa:"☕",lady:"👩",rainy:"🌧️",sofa:"🛋️",dino:"🦕",sunny:"☀️",coffee:"☕",zero:"0️⃣",hero:"🦸",cowboy:"🤠",kiwi:"🥝",seesaw:"🛝",bubble:"🫧",puddle:"💦",candy:"🍬",rocket:"🚀",soccer:"⚽",necklace:"📿",popcorn:"🍿",raccoon:"🦝",anchor:"⚓",keyboard:"⌨️",garden:"🌷",guitar:"🎸",igloo:"🛖",wagon:"🛒",penguin:"🐧",angel:"👼",camera:"📷",koala:"🐨",factory:"🏭",magazine:"📰",iguana:"🦎",alligator:"🐊",hamburger:"🍔",volcano:"🌋",unicorn:"🦄",elephant:"🐘",dinosaur:"🦖",butterfly:"🦋",caterpillar:"🐛",helicopter:"🚁",octopus:"🐙",umbrella:"☂️",violin:"🎻",watermelon:"🍉",pineapple:"🍍",tomato:"🍅",broccoli:"🥦",jellyfish:"🪼",ladybird:"🐞",grasshopper:"🦗",xylophone:"🎼",envelope:"✉️",astronaut:"🧑‍🚀",domino:"🁣",tornado:"🌪️",animal:"🐾",zucchini:"🥒",ghost:"👻",grapes:"🍇",strawberry:"🍓",blender:"🫙",blanket:"🛌",blowfish:"🐡",blocks:"🧱",black:"⚫",blimp:"🎈",clock:"⏰",clip:"📎",clam:"🦪",claw:"🦀",clothes:"👕",cloud:"☁️",class:"🏫",flag:"🚩",flame:"🔥",flute:"🪈",flower:"🌸",flamingo:"🦩",glass:"🥛",globe:"🌏",gloves:"🧤",glitter:"✨",plant:"🪴",plug:"🔌",plum:"🫐",planet:"🪐",slug:"🐌",sled:"🛷",slice:"🍕",sloth:"🦥",slippers:"🥿",skate:"⛸️",scooter:"🛴",skirt:"👗",scarf:"🧣",school:"🏫",skull:"💀",scale:"⚖️",smile:"😃",smoke:"💨",snail:"🐌",snack:"🍿",snowman:"⛄",spade:"♠️",spider:"🕷️",sponge:"🧽",space:"🌌",stick:"🥢",stamp:"📮",stool:"🪑",starfish:"⭐",swan:"🦢",swing:"🛝",sweep:"🧹",sweet:"🍬",switch:"💡",chair:"🪑",bow:"🎀",boat_:"⛵",beach_:"🏖️",ice_cream:"🍦","ice-cream":"🍦",chocolate:"🍫",pocket:"👖",ticket:"🎟️",television:"📺",ambulance:"🚑",computer:"💻",hospital:"🏥",sausages:"🌭",crocodile:"🐊",aeroplane:"✈️",pram:"👶",crisps:"🥔",biscuit:"🍪",lift:"🛗",Christmas:"🎄",web_:"🕸️",kettle:"🫖",table:"🪑",cooker:"🍳",party:"🥳",jelly:"🍮",kitchen:"🍳",tissue:"🧻",fire:"🔥"};

/* ---------- Sounds (tiny synth; only after a tap) ---------- */
let AC=null;
function snd(kind){
  if(!S.client?.sound) return;
  try{ AC ||= new (window.AudioContext||window.webkitAudioContext)(); const t=AC.currentTime;
    const tone=(f,d,st=0,type="sine",v=.15)=>{ const o=AC.createOscillator(), g=AC.createGain(); o.type=type; o.frequency.setValueAtTime(f,t+st); g.gain.setValueAtTime(v,t+st); g.gain.exponentialRampToValueAtTime(.001,t+st+d); o.connect(g); g.connect(AC.destination); o.start(t+st); o.stop(t+st+d+.02); };
    if(kind==="pop") tone(660,.08,0,"triangle");
    else if(kind==="star"){ tone(880,.1); tone(1320,.14,.08); }
    else if(kind==="hop") tone(520,.06,0,"square",.05);
    else if(kind==="roll"){ for(let i=0;i<6;i++) tone(300+Math.random()*300,.04,i*.07,"square",.04); }
    else if(kind==="tick") tone(1200,.02,0,"square",.03);
    else if(kind==="win"){ [523,659,784,1047].forEach((f,i)=>tone(f,.18,i*.12,"triangle",.16)); }
    else if(kind==="munch"){ tone(180,.08,0,"sawtooth",.08); tone(140,.1,.1,"sawtooth",.08); }
    else if(kind==="burp"){ const o=AC.createOscillator(), g=AC.createGain(); o.type="sawtooth"; o.frequency.setValueAtTime(110,t); o.frequency.linearRampToValueAtTime(60,t+.6); g.gain.setValueAtTime(.2,t); g.gain.exponentialRampToValueAtTime(.001,t+.65); o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t+.7); }
    else if(kind==="flip") tone(740,.05,0,"triangle",.08);
  }catch(e){}
}


/* ---------- Game engine: every try earns the child a turn ---------- */
const GAMES=[
  {id:"board", name:"Dino Dash", art:"🦖", bg:"linear-gradient(135deg,#b7e4a2,#5fb86a)", col:"#2f7d3a", how:"Roll the dice and race to the nest."},
  {id:"spin", name:"Spin & Win", art:"🎡", bg:"linear-gradient(135deg,#ffd36b,#ff8a6b)", col:"#e2553f", how:"Every try earns a spin. Got it = double points."},
  {id:"memory", name:"Memory Match", art:"🃏", bg:"repeating-linear-gradient(45deg,#7b5cff 0 14px,#8f74ff 14px 28px)", col:"#6a47e8", how:"Flip two cards per try. Find the pairs."},
  {id:"munch", name:"Feed Munch", art:"👾", bg:"linear-gradient(135deg,#b9f0c9,#5fcf8c)", col:"#239a55", how:"Feed the monster. Big burp at 10!"},
  {id:"road", name:"Road Trip", art:"🚗", bg:"radial-gradient(circle at 30% 30%,#4a5ad0,#1b2a5a)", col:"#3b47b8", how:"Every try moves along. 10 tries = 1 road."}
];
const STICKERS="🦄🐙🦖🚀🌈🍩🐳🦋🌟🍉🐢🦊🎸🍦🐝🦕🎈🌻🐧🍕🐸🦁🧁🐠".match(/\p{Extended_Pictographic}/gu);
function gstate(){ const L=ensureLive(); L.game ||= {type:S.client.lastGame||"", turns:[], board:{pos:0,boards:0}, spin:{score:0,rot:0}, memory:null, munch:{fed:0,level:1}}; return L.game; }
const kidLed=()=>!!S.client?.kidLed;
function canPlay(G){ if(G.type==="road" || S.fx.busy) return false; return !G.await; }
/* Reveal: a game move shows the next practice word. Child-led logs it as a correct try straight away. */
function reveal(G,item){
  const L=ensureFx(); if(item){ L.cur={gid:item.gid, si:item.si}; L.peek=null; }
  const cur=fxCurrent(); if(!cur) return; G.shown=true;
  G.await=true; G.revealed={gid:cur.g.id, si:cur.si}; G.tries=0;
  snd("flip"); saveLive();
}
function takeBonus(G){ const s=!!G.bonus; G.bonus=false; return s; }
function picsOn(){ return (ensureLive().mod||["picture"]).includes("picture"); }
function picFor(w){ return picsOn()?picOf(w):""; }

function addTurn(star){ const G=gstate(); if(G.type && G.type!=="road") G.turns.push(!!star); }
function giveSticker(){  const s=STICKERS[Math.floor(Math.random()*STICKERS.length)]; (S.client.stickers ||= []).push(s); scheduleSave(); NEWSTK.push(s); return s; }
function flushCel(){ const q=S.fx.celQ; if(q&&q.length){ const [h,m]=q[q.length-1]; S.fx.celQ=[]; setTimeout(()=>celebrate(h,m),350); } }
function celebrate(html, ms=2600){ if(ms<2000) return; if(gstate().await){ (S.fx.celQ ||= []).push([html,ms]); return; } const el=document.getElementById("gmFx"); if(!el) return; el.innerHTML=`<div class="gfx-card">${html}</div>`; el.hidden=false; snd("win"); clearTimeout(S.fx.fxT); S.fx.fxT=setTimeout(()=>{ el.hidden=true; }, ms); }

function gamePicker(){
  return `<div class="gpick"><div class="gpick-h"><b>Pick a game</b>${gstate().type?`<button class="btn small" data-act="gpickclose">Back to game</button>`:""}</div>
    <div class="gpick-grid">${GAMES.map(g=>`<button class="gcard" data-act="gpick" data-v="${g.id}">${g.tag?`<span class="gtag">${g.tag}</span>`:""}<span class="gart" style="background:${g.bg}">${g.art}</span><span class="gname" style="color:${g.col}">${g.name}</span><span class="ghow">${g.how}</span></button>`).join("")}</div></div>`;
}


/* --- Board game (Dino Dash) --- */
const BOARD_N=25, BRIDGES={3:9,8:14,13:19,17:23}, BONUS=[6,11,16,21];
const boardCell=n=>{ const r=Math.floor((n-1)/5), c=(n-1)%5; return {r, c: r%2? 4-c : c}; };
function boardHTML(G){
  const tiles=[]; for(let n=1;n<=BOARD_N;n++){ const {r,c}=boardCell(n); const br=BRIDGES[n], bo=BONUS.includes(n);
    tiles.push(`<div class="bt ${br?"br":""} ${bo?"bo":""} ${n===BOARD_N?"end":""}" style="grid-row:${5-r};grid-column:${c+1}" data-n="${n}"><span>${n===BOARD_N?"🥚":br?"🌉":bo?"⭐":n}</span></div>`); }
  const tok = G.board.pos ? (()=>{ const {r,c}=boardCell(G.board.pos); return `grid-row:${5-r};grid-column:${c+1}`; })() : "grid-row:5;grid-column:1";
  return `<div class="bwrap"><div class="board">${tiles.join("")}<div class="btok" id="btok" style="${tok}"><span>🦖</span></div></div></div>`;
}
async function playBoard(){
  const G=gstate(); const dieEl=document.getElementById("gdie"), tok=document.getElementById("btok"); if(!dieEl||!tok||!canPlay(G)) return;
  const star=takeBonus(G); S.fx.busy=true; snd("roll");
  let face=1; for(let i=0;i<9;i++){ face=1+Math.floor(Math.random()*6); dieEl.textContent=["⚀","⚁","⚂","⚃","⚄","⚅"][face-1]; dieEl.classList.toggle("rot"); await sleep(70); }
  const steps=face+(star?1:0);
  if(star){ const b=document.getElementById("gdieb"); if(b) b.hidden=false; }
  const place=n=>{ const {r,c}=boardCell(n); tok.style.gridRow=5-r; tok.style.gridColumn=c+1; };
  let p=G.board.pos;
  for(let i=0;i<steps && p<BOARD_N;i++){ p++; place(p); snd("hop"); tok.classList.remove("hp"); void tok.offsetWidth; tok.classList.add("hp"); await sleep(260); }
  if(BRIDGES[p]){ await sleep(200); p=BRIDGES[p]; place(p); snd("star"); }
  G.board.pos=p; S.fx.busy=false; reveal(G);
  if(p>=BOARD_N){ G.board.boards++; G.board.pos=0; const st=giveSticker(); saveLive(); renderMain(); celebrate(`<div class="gfx-e">🥚➡️🐣</div><b>You reached the nest!</b><span>New sticker: ${st}</span>`); return; }
  renderMain(); if(BONUS.includes(p)) celebrate(`<b>⭐ Bonus spot!</b>`,1000);
}
/* --- Spin & Win --- */
const WHEEL=[{v:10,e:"🍩"},{v:25,e:"🪙"},{v:5,e:"🌸"},{v:50,e:"💎"},{v:15,e:"🌈"},{v:100,e:"🔥"},{v:20,e:"⭐"},{v:0,e:"🎁",gift:true}];
function wheelSVG(rot){
  const n=WHEEL.length, R=120, cols=["#ffe8a3","#ffb4a8"];
  const seg=WHEEL.map((w,i)=>{ const a0=(i/n)*2*Math.PI-Math.PI/2, a1=((i+1)/n)*2*Math.PI-Math.PI/2, am=(a0+a1)/2;
    const p=(a,r)=>`${(R+r*Math.cos(a)).toFixed(1)},${(R+r*Math.sin(a)).toFixed(1)}`;
    return `<path d="M${R},${R} L${p(a0,R)} A${R},${R} 0 0,1 ${p(a1,R)} Z" fill="${cols[i%2]}" stroke="#d96b5c" stroke-width="2"/>
      <text x="${p(am,R*.72).split(",")[0]}" y="${p(am,R*.72).split(",")[1]}" font-size="26" text-anchor="middle" dominant-baseline="central">${w.e}</text>
      <text x="${p(am,R*.42).split(",")[0]}" y="${p(am,R*.42).split(",")[1]}" font-size="17" font-weight="700" fill="#7a2f22" text-anchor="middle" dominant-baseline="central" font-family="Fredoka,sans-serif">${w.gift?"?":w.v}</text>`; }).join("");
  return `<div class="wheelbox"><div class="wptr"></div><svg id="gwheel" viewBox="0 0 240 240" style="transform:rotate(${rot}deg)"><circle cx="120" cy="120" r="119" fill="#ff7a6b"/>${seg}<circle cx="120" cy="120" r="22" fill="#b8442f" stroke="#ffcf33" stroke-width="5"/></svg></div>`;
}
async function playSpin(){
  const G=gstate(), w=document.getElementById("gwheel"); if(!w||!canPlay(G)) return; const star=takeBonus(G); S.fx.busy=true;
  const n=WHEEL.length, idx=Math.floor(Math.random()*n);
  const target=360-(idx+.5)*(360/n); const base=Math.ceil(G.spin.rot/360)*360;
  const rot=base+1440+target; w.style.transition="transform 2.6s cubic-bezier(.15,.85,.2,1)"; w.style.transform=`rotate(${rot}deg)`;
  for(let i=0;i<14;i++){ setTimeout(()=>snd("tick"), i*i*14); }
  await sleep(2700); G.spin.rot=rot;
  const hit=WHEEL[idx]; let msg;
  if(hit.gift){ const st=giveSticker(); msg=`<div class="gfx-e">🎁</div><b>Mystery prize!</b><span>Sticker: ${st}</span>`; }
  else { const pts=hit.v*(star?2:1); G.spin.score+=pts; msg=`<div class="gfx-e">${hit.e}</div><b>+${pts}${star?" (double!)":""}</b>`; }
  S.fx.busy=false; reveal(G); renderMain(); celebrate(msg,1100);
}
/* --- Memory Match --- */
function memWords(){
  const items=fxItems(), seen=new Set(), out=[];
  const cur=fxCurrent(); const order=cur?items.filter(x=>x.g.id===cur.g.id).concat(items.filter(x=>x.g.id!==cur.g.id)):items;
  for(const x of order){ const w=x.g.stimuli[x.si].trim(); if(!seen.has(w)){ seen.add(w); out.push({gid:x.g.id, si:x.si, w}); } if(out.length>=6) break; }
  return out;
}
function newMemory(){ const ws=memWords(); const cards=[...ws,...ws].map(x=>({...x,up:false,done:false})); for(let i=cards.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [cards[i],cards[j]]=[cards[j],cards[i]]; } return {cards, flips:[], pairs:0, rounds:0}; }
function memoryHTML(G){
  G.memory ||= newMemory(); const M=G.memory; const can=canPlay(G);
  return `<div class="mem g${M.cards.length>8?"12":"8"}">${M.cards.map((c,i)=>{ const p=picFor(c.w); return `<button class="mcard ${c.up||c.done?"up":""} ${c.done?"done":""}" data-act="gflip" data-v="${i}" ${can&&!c.up&&!c.done?"":"disabled"} aria-label="${c.up||c.done?esc(c.w):"Hidden card"}"><span class="mback">?</span><span class="mface ${p?"":"nopic"}">${p?`<i>${p}</i>`:""}${esc(c.w)}</span></button>`; }).join("")}</div>`;
}
async function flipCard(i){
  const G=gstate(), M=G.memory; if(!M || !canPlay(G)) return; const c=M.cards[i]; if(c.up||c.done) return;
  takeBonus(G); c.up=true; M.flips.push(i); reveal(G, c);
  if(M.flips.length<2){ renderMain(); return; }
  const [a,b]=M.flips; M.flips=[];
  if(M.cards[a].w===M.cards[b].w){ M.cards[a].done=M.cards[b].done=true; M.pairs++; saveLive(); renderMain(); snd("star"); celebrate(`<div class="gfx-e">${picFor(M.cards[a].w)||"🎉"}</div><b>A pair!</b>`,1100); }
  else { saveLive(); renderMain(); await sleep(1600); if(G.memory===M){ M.cards[a].up=M.cards[b].up=false; saveLive(); renderMain(); } }
  if(M.cards.every(x=>x.done)){ const st=giveSticker(); await sleep(1300); celebrate(`<div class="gfx-e">🏆</div><b>All pairs found!</b><span>Sticker: ${st}</span>`); G.memory=newMemory(); G.memory.rounds=M.rounds+1; saveLive(); setTimeout(()=>renderMain(),2600); }
}
/* --- Feed Munch --- */
const FOODS=["🍪","🍓","🍌","🧁","🍕","🥕","🍉","🍩"];
function munchHTML(G){
  const m=G.munch, sc=1+m.fed*.07, can=canPlay(G), gold=G.bonus;
  return `<div class="munch"><div class="mon" id="gmon" style="--s:${sc}"><div class="mon-b"><i class="e1"></i><i class="e2"></i><i class="mo"></i></div></div>
    <div class="mfood">${(gold?["🌟",...FOODS.slice(0,3)]:FOODS.slice((m.fed*3)%5,(m.fed*3)%5+4)).map(f=>`<button data-act="gfeed" data-v="${f}" ${can?"":"disabled"}>${f}</button>`).join("")}</div>
    <div class="mbar"><i style="width:${m.fed*10}%"></i><span>${m.fed}/10 to the big burp</span></div></div>`;
}
async function feed(food,btn){
  const G=gstate(); if(!canPlay(G)) return; takeBonus(G); S.fx.busy=true;
  const mon=document.getElementById("gmon"); if(btn){ btn.classList.add("fly"); }
  await sleep(450); snd("munch"); mon?.classList.add("chomp"); await sleep(350);
  G.munch.fed+=1; S.fx.busy=false; reveal(G);
  if(G.munch.fed>=10){ snd("burp"); G.munch.fed=0; G.munch.level++; const st=giveSticker(); saveLive(); renderMain(); celebrate(`<div class="gfx-e">💨</div><b>BUUURP!</b><span>Munch is full. Sticker: ${st}</span>`); return; }
  renderMain(); if(food==="🌟") celebrate(`<div class="gfx-e">🌟</div><b>Yum, golden snack!</b>`,900);
}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
/* ---------- More games: Balloon Pop, Treasure Dig, Burger Stack, Fish Tank ---------- */
GAMES.push(
  {id:"balloon", name:"Balloon Pop", art:"🎈", bg:"linear-gradient(135deg,#ffc0d9,#ff7aa8)", col:"#d9367a", how:"Pop a balloon each turn. Prizes hide inside."},
  {id:"dig", name:"Treasure Dig", art:"🏴‍☠️", bg:"linear-gradient(180deg,#ffe9b0,#e7c27a)", col:"#8a5a12", how:"Dig one square per turn. Find the chest!"},
  {id:"burger", name:"Burger Stack", art:"🍔", bg:"linear-gradient(135deg,#ffe3a8,#ffb04d)", col:"#d9670c", how:"Add a layer each turn. Silly toppings on star turns."},
  {id:"tank", name:"Fish Tank", art:"🐠", bg:"linear-gradient(180deg,#9fe3ff,#2f9fd6)", col:"#1f7fb8", how:"Catch a sea creature each turn. The tank is kept."}
);
/* Balloon Pop */
const BALLOON_COLS=["#ff6b8b","#ffb020","#4fc3f7","#8e7cff","#5fcf8c","#ff8a5c"];
const BALLOON_PRIZES=["⭐","🍬","🪙","🎉","🍭","💎","🌈","🦄","🍩","🎵","🍓","🌟"];
/* Balloon Pop: each balloon hides a practice word. Pop it, the word appears, the child says it. */
function newBl(i){ return {c:BALLOON_COLS[rnd(BALLOON_COLS.length)], d:8+rnd(5), o:Math.random()*12}; }
function newBalloons(){ return {b:[], lanes:Array.from({length:6},(_,i)=>newBl(i)), popped:0, sets:0, last:-1}; }
function balloonOpen(G){ return canPlay(G); }
function balloonHTML(G){
  if(!G.balloon || !G.balloon.lanes) G.balloon=newBalloons(); const B=G.balloon, open=balloonOpen(G), now=Date.now()/1000;
  return `<div class="balsky">${B.lanes.map((x,i)=>`<button class="bln2" data-act="gpop" data-v="${i}" style="--c:${x.c};left:${4+i*16}%;--d:${x.d}s;--dl:-${((now+x.o)%x.d).toFixed(2)}s" ${open?"":"disabled"} aria-label="Pop the balloon"><span class="bb"></span><span class="bs"></span></button>`).join("")}</div>
    <div class="brl-n">${B.popped}/12 popped</div>`;
}
function confetti(host,x,y){ if(!host) return; const box=document.createElement("div"); box.className="cfx"; box.style.left=x+"px"; box.style.top=y+"px";
  const cols=["#ff6b8b","#ffb020","#4fc3f7","#8e7cff","#5fcf8c","#ffd54f"];
  for(let k=0;k<22;k++){ const e=document.createElement("i"), a=Math.random()*Math.PI*2, d=40+Math.random()*70; e.style.setProperty("--x",(Math.cos(a)*d).toFixed(0)+"px"); e.style.setProperty("--y",(Math.sin(a)*d-20).toFixed(0)+"px"); e.style.setProperty("--r",rnd(540)+"deg"); e.style.background=cols[k%cols.length]; box.appendChild(e); }
  host.appendChild(box); setTimeout(()=>box.remove(),1000); }
async function popBalloon(i,btn){
  const G=gstate(), B=G.balloon; if(!B || !B.lanes || !balloonOpen(G)) return;
  S.fx.busy=true; const host=btn?.closest(".gm");
  if(btn && host){ const r=btn.querySelector(".bb").getBoundingClientRect(), h=host.getBoundingClientRect(); confetti(host, r.left+r.width/2-h.left, r.top+r.height/2-h.top); btn.style.visibility="hidden"; }
  snd("pop"); await sleep(600); S.fx.busy=false;
  B.lanes[i]=newBl(i); B.popped++; takeBonus(G); if(B.popped>=12) B.pending=true; reveal(G); renderMain();
}
async function balloonDone(){ const G=gstate(), B=G.balloon; if(!B?.pending) return; B.pending=false; const st=giveSticker(); celebrate(`<div class="gfx-e">🎈🎉</div><b>12 popped!</b><span>Sticker: ${st}</span>`); B.popped=0; B.sets++; saveLive(); }
async function waitScored(G){ for(let k=0;k<600 && G.await;k++) await sleep(200); }
/* Treasure Dig */
const DIG_FINDS=["🐚","🪙","🦀","🪨","💎","🦴","🐚","🪙","🌟","🪸"];
function newDig(){ return {cells:Array.from({length:20},()=>({dug:false,f:""})), chest:Math.floor(Math.random()*20), maps:0, warm:null}; }
function digHTML(G){
  G.dig ||= newDig(); const D=G.dig, can=canPlay(G);
  const near=new Set(); if(D.warm!=null){ const r=Math.floor(D.chest/5), c=D.chest%5; for(let dr=-1;dr<=1;dr++) for(let dc=-1;dc<=1;dc++){ const rr=r+dr, cc=c+dc; if(rr>=0&&rr<4&&cc>=0&&cc<5) near.add(rr*5+cc); } }
  return `<div class="dig">${D.cells.map((x,i)=>`<button class="dg ${x.dug?"dug":""} ${!x.dug&&near.has(i)?"warm":""}" data-act="gdig" data-v="${i}" ${can&&!x.dug?"":"disabled"} aria-label="${x.dug?"Dug: "+(x.f||"empty"):"Sand"}">${x.dug?x.f:""}</button>`).join("")}</div>`;
}
async function digCell(i){
  const G=gstate(); if(!canPlay(G)) return; const D=G.dig, x=D.cells[i]; if(x.dug) return;
  const star=takeBonus(G); x.dug=true; snd("hop");
  if(i===D.chest){ x.f="🧰"; reveal(G); renderMain(); const st=giveSticker(); celebrate(`<div class="gfx-e">🏴‍☠️🧰</div><b>Treasure found!</b><span>Sticker: ${st}</span>`); await sleep(2600); G.dig=newDig(); G.dig.maps=D.maps+1; saveLive(); renderMain(); return; }
  x.f=DIG_FINDS[Math.floor(Math.random()*DIG_FINDS.length)];
  if(star || D.cells.filter(c=>!c.dug).length<=6) D.warm=true;
  reveal(G); renderMain();
}
/* Burger Stack */
const LAYERS=["🥩","🧀","🥬","🍅","🥓","🧅","🥒","🍳"], SILLY=["🍌","🍦","🐟","🍫","🍓","🌶️"];
function burgerHTML(G){
  G.burger ||= {stack:[], made:0}; const B=G.burger, can=canPlay(G), star=G.bonus;
  const opts = star ? SILLY.slice(B.stack.length%3, B.stack.length%3+4) : LAYERS.slice(B.stack.length%4, B.stack.length%4+4);
  return `<div class="bgr"><div class="bstack"><span class="bun2 top ${B.stack.length>=8?"":"ghost"}"><i></i><i></i><i></i><i></i><i></i></span>${[...B.stack].reverse().map(l=>`<span class="lay">${l}</span>`).join("")}<span class="bun2 bot"></span></div>
      <div class="mfood">${opts.map(f=>`<button data-act="gstack" data-v="${f}" ${can?"":"disabled"}>${f}</button>`).join("")}</div>
      <div class="mbar"><i style="width:${B.stack.length/8*100}%"></i><span>${B.stack.length}/8 layers · ${B.made} burgers made</span></div></div>`;
}
async function stackLayer(f){
  const G=gstate(); if(!canPlay(G)) return; takeBonus(G); const B=G.burger; B.stack.push(f); snd("pop"); reveal(G);
  if(B.stack.length>=8){ renderMain(); snd("munch"); const st=giveSticker(); celebrate(`<div class="gfx-e">🍔😋</div><b>CHOMP! Burger done!</b><span>Sticker: ${st}</span>`); await sleep(2600); B.stack=[]; B.made++; saveLive(); renderMain(); return; }
  renderMain();
}
/* Fish Tank (kept per child) */
const SEA=["🐟","🐠","🐡","🦐","🦀","🐚","🪼","🐌"], SEA_RARE=["🐙","🐢","🐳","🦈","🦭","🐬","🦑","🐋"];
function seaOne(rare){ const pool=rare?SEA_RARE:SEA; return {f:pool[rnd(pool.length)], y:8+rnd(62), d:7+rnd(6), o:Math.random()*12, rare:!!rare}; }
function tankHTML(G){
  const tank=(S.client.tank ||= []), can=canPlay(G), now=Date.now()/1000;
  if(!G.sea) G.sea=Array.from({length:5},()=>seaOne(Math.random()<.1));
  if(G.bonus && !G.sea.some(c=>c.rare)) G.sea[rnd(5)]=seaOne(true);
  return `<div class="ocean"><div class="sea">${G.sea.map((c,i)=>`<button class="seac ${c.rare?"rare":""}" data-act="gcatch" data-v="${i}" style="top:${c.y}%;--d:${c.d}s;--dl:-${((now+c.o)%c.d).toFixed(2)}s" ${can?"":"disabled"} aria-label="Catch it">${c.f}</button>`).join("")}<span class="sea-l">Tap a sea creature to catch it</span></div>
    <div class="mytank"><div class="mt-h"><b>My tank · ${tank.length}</b>${tank.length?(G.tankAsk?`<span class="mt-ask">Empty the tank? <button data-act="gtankclear" data-v="1">Yes, empty it</button><button data-act="gtankclear" data-v="0">Keep</button></span>`:`<button class="mt-clear" data-act="gtankclear" data-v="ask">Empty tank</button>`):""}</div><div class="mt-g">${tank.length?tank.slice(-30).map(f=>`<span>${f}</span>`).join(""):`<em>Empty. Catch your first one!</em>`}</div></div></div>`;
}
async function catchFish(i,btn){
  const G=gstate(); if(!canPlay(G) || !G.sea) return; const c=G.sea[i]; if(!c) return; takeBonus(G);
  S.fx.busy=true; if(btn){ btn.classList.add("caught"); } snd("pop"); await sleep(450); S.fx.busy=false;
  (S.client.tank ||= []).push(c.f); if(S.client.tank.length>200) S.client.tank=S.client.tank.slice(-200); scheduleSave();
  G.sea[i]=seaOne(Math.random()<.1); reveal(G); renderMain();
  const n=S.client.tank.length; if(n%10===0){ const st=giveSticker(); celebrate(`<div class="gfx-e">${c.f}</div><b>${n} creatures!</b><span>Sticker: ${st}</span>`); }
}

/* ---------- Game view ---------- */
const GAME_CALL={board:"🎲 Roll the dice!",spin:"🎡 Spin the wheel!",memory:"🃏 Flip a card!",munch:"👾 Feed Munch!",balloon:"🎈 Pop a balloon!",dig:"⛏️ Dig a square!",burger:"🍔 Add a layer!",tank:"🎣 Catch a fish!"};
function gameArea(G,th){
  const can=canPlay(G), star=G.bonus;
  const status = G.await ? `<span class="gm-pill gturns has">Say the word!</span>`
    : `<span class="gm-pill gturns">${star?"★ Star turn! ":""}Your turn to play</span>`;
  if(G.type==="board") return {pill:`🦖 Board ${G.board.boards+1}`, turn:status, body:`${boardHTML(G)}<div class="gact"><span class="gdie" id="gdie">🎲</span><span class="gdieb" id="gdieb" hidden>★ +1</span><button class="groll" data-act="groll" ${can?"":"disabled"}>${can?(star?"Roll! (+1 bonus)":"Press to roll!"):"Say the word first"}</button></div>`};
  if(G.type==="spin") return {pill:`🎡 Score ${G.spin.score}`, turn:status, body:`${wheelSVG(G.spin.rot)}<div class="gact"><button class="groll" data-act="gspin" ${can?"":"disabled"}>${can?"Spin!":"Say the word first"}</button></div>`};
  if(G.type==="memory"){ G.memory ||= newMemory(); return {pill:`🃏 Pairs ${G.memory.pairs}/${G.memory.cards.length/2}`, turn:status, body:memoryHTML(G)}; }
  if(G.type==="munch") return {pill:`👾 Munch level ${G.munch.level}`, turn:status, body:munchHTML(G)};
  if(G.type==="balloon"){ const body=balloonHTML(G); return {pill:`🎈 Balloons`, turn:status, body}; }
  if(G.type==="dig"){ G.dig ||= newDig(); return {pill:`🏴‍☠️ Map ${G.dig.maps+1}`, turn:status, body:digHTML(G)}; }
  if(G.type==="burger"){ G.burger ||= {stack:[],made:0}; return {pill:`🍔 Burger ${G.burger.made+1}`, turn:status, body:burgerHTML(G)}; }
  if(G.type==="tank") return {pill:`🐠 Fish Tank`, turn:status, body:tankHTML(G)};
  if(G.type==="smoothie"){ const r=smoothieHTML(G); return {pill:`🥤 Smoothie ${G.smoothie.made+1}`, turn:status, body:r}; }
  if(G.type==="stars"){ const r=starsHTML(G); return {pill:`🚀 Run ${G.stars.runs+1}`, turn:status, body:r}; }
  if(G.type==="barrel"){ const r=barrelHTML(G); return {pill:`🦜 Barrel ${G.barrel.pops+1}`, turn:status, body:r}; }
  if(G.type==="mole"){ const r=moleHTML(G); return {pill:`🐹 ${G.mole.bonks} bonks`, turn:status, body:r}; }
  if(G.type==="ttt"){ const r=tttHTML(G); return {pill:`⭕ Game ${G.ttt.games+1}`, turn:status, body:r}; }
  if(G.type==="pacer"){ const r=pacerHTML(G); return {pill:`🟣 Row ${G.pacer.rows+1}`, turn:status, body:r}; }
  if(G.type==="roll"){ const r=rollHTML(G); return {pill:`🎲 Picture ${G.roll.done+1}`, turn:status, body:r}; }
  if(G.type==="build"){ const r=buildHTML(G); return {pill:`🌸 Build ${G.build.made+1}`, turn:status, body:r}; }
  if(G.type==="maze"){ const r=mazeHTML(G); return {pill:`🧭 Maze ${G.maze.found+1}`, turn:status, body:r}; }
  if(G.type==="paint"){ const r=paintHTML(G); return {pill:`🎨 ${PAINT_PICS[G.paint.pic%PAINT_PICS.length].name}`, turn:status, body:r}; }
  return null;
}
/* ---------- Games, set 3: Smoothie Maker, Star Sprint, Parrot Barrel, Bonk the Mole, Tic Tac Toe, Paint Splash ---------- */
GAMES.push(
  {id:"smoothie", name:"Smoothie Maker", art:"🥤", bg:"linear-gradient(135deg,#ffd9c7,#ffb199)", col:"#d9573a", how:"Add a fruit each turn. Follow the recipe or make your own."},
  {id:"stars", name:"Star Sprint", art:"🚀", bg:"radial-gradient(circle at 30% 30%,#3b4a7a,#141b33)", col:"#3b47b8", how:"Zoom the rocket to catch a star. 10 stars to win."},
  {id:"barrel", name:"Parrot Barrel", art:"🦜", bg:"linear-gradient(135deg,#d9b48a,#9c6b3f)", col:"#8a5a12", how:"Push a sword into the barrel. Who will make the parrot jump?"},
  {id:"mole", name:"Bonk the Mole", art:"🐹", bg:"linear-gradient(135deg,#c9e7a8,#8cc06b)", col:"#4f7d2f", how:"Bonk the mole when it pops up."},
  {id:"ttt", name:"Tic Tac Toe", art:"⭕", bg:"linear-gradient(135deg,#d6e9ff,#9cc3f5)", col:"#2f6db8", how:"Play noughts and crosses against Munch."},
  {id:"paint", name:"Paint Splash", art:"🎨", bg:"linear-gradient(135deg,#ffe7f0,#ffc2d6)", col:"#c2407a", how:"Paint one part of the picture each turn."},
  {id:"bridge", name:"Bridge it", art:"🌉", bg:"linear-gradient(135deg,#d8ecdf,#a9d4bb)", col:"#2f6b55", how:"Join a VC word onto the target: slide it, hold the sound or hop the stones."}
);
Object.assign(GAME_CALL,{smoothie:"🥤 Add something to the smoothie!",stars:"🚀 Catch a star!",barrel:"🗡️ Pick a slot!",mole:"🐹 Bonk the mole!",ttt:"⭐ Your move!",paint:"🎨 Paint a part!"});
const rnd=n=>Math.floor(Math.random()*n);

/* Smoothie Maker */
const SM_ING=[["🍓","#e46a72"],["🍌","#efd36a"],["🫐","#6f73c9"],["🥝","#94bf5e"],["🥭","#f2a65a"],["🍍","#ecd25e"],["🥛","#f1ece2"],["🧊","#d6eef8"]], SM_BONUS=[["🍫","#7a5546"],["🍯","#d9a441"]];
const smRecipe=()=>{ const r=[]; while(r.length<5){ const x=SM_ING[rnd(SM_ING.length)][0]; if(!r.includes(x)) r.push(x); } return r; };
function smoothieHTML(G){
  G.smoothie ||= {mode:"recipe", recipe:smRecipe(), added:[], made:0}; const M=G.smoothie, can=canPlay(G);
  const col=e=>(SM_ING.concat(SM_BONUS).find(x=>x[0]===e)||["","#ccc"])[1];
  const need=M.recipe.filter(x=>!M.added.includes(x));
  const shelf=SM_ING.concat(G.bonus?SM_BONUS:[]);
  return `<div class="smo">
    <div class="smo-l">
      <div class="smo-modes"><button aria-pressed="${M.mode==="recipe"}" data-act="gsmode" data-v="recipe">Follow the recipe</button><button aria-pressed="${M.mode==="own"}" data-act="gsmode" data-v="own">Make your own</button></div>
      ${M.mode==="recipe"?`<div class="smo-card">${M.recipe.map(x=>`<span class="${M.added.includes(x)?"ok":""}">${x}</span>`).join("")}</div>`:`<div class="smo-card own">${Array.from({length:5},(_,i)=>`<span class="${M.added[i]?"ok":""}">${M.added[i]||""}</span>`).join("")}</div>`}
      <div class="blender ${M.pending||(M.mode==="recipe"?need.length===1:M.added.length===4)?"ready":""}" id="gblend"><div class="jar"><span class="liq" style="background:linear-gradient(180deg,${(M.added.length?M.added:["🍓"]).map(col).join(",")})"></span>${M.added.map((e,k)=>{ const c=k%3, r=Math.floor(k/3); return `<i class="pc ${k===M.added.length-1&&Date.now()-(M.dropAt||0)<700?"drop":""}" style="left:${4+c*28+(r%2?12:0)}px;bottom:${2+r*26}px;--r:${(k*47)%40-20}deg">${e}</i>`; }).join("")}</div><div class="lid"></div><div class="base"><b></b></div></div>
    </div>
    <div class="smo-shelf">${shelf.map(([e])=>`<button data-act="gsadd" data-v="${e}" ${can?"":"disabled"} class="${M.mode==="recipe"&&!need.includes(e)?"dim":""}">${e}</button>`).join("")}</div>
  </div>`;
}
async function smoothieAdd(e,btn){
  const G=gstate(); if(!canPlay(G)) return; const M=G.smoothie;
  if(M.mode==="recipe" && !M.recipe.filter(x=>!M.added.includes(x)).includes(e) && !SM_BONUS.some(b=>b[0]===e)){ btn?.classList.add("nope"); setTimeout(()=>btn?.classList.remove("nope"),400); return; }
  takeBonus(G); M.added.push(e); M.dropAt=Date.now(); snd("pop"); reveal(G);
  const full = M.mode==="recipe" ? M.recipe.every(x=>M.added.includes(x)) : M.added.length>=5;
  if(full) M.pending=true;
  renderMain();
}
async function smoothieBlend(){
  const G=gstate(), M=G.smoothie; if(!M?.pending) return; M.pending=false;
  S.fx.busy=true; await sleep(250); document.getElementById("gblend")?.classList.add("blending"); snd("roll"); await sleep(1600); S.fx.busy=false; M.made++; M.added=[]; M.recipe=smRecipe(); const st=giveSticker(); saveLive(); renderMain(); celebrate(`<div class="gfx-e">🥤</div><b>Smoothie ready!</b><span>Sticker: ${st}</span>`);
}
/* Star Sprint */
function starsHTML(G){
  G.stars ||= {got:0, runs:0}; const T=G.stars; if(T.sx==null){ T.sx=15; T.sy=55; T.a=-20; T.x=72; T.y=35; }
  setTimeout(starStart,0);
  return `<div class="spc"><div class="ssbar">${Array.from({length:10},(_,i)=>`<span class="${i<T.got?"on":""}">★</span>`).join("")}</div>
    <div class="sky" id="gsky" tabindex="0" aria-label="Steer the rocket with the arrow keys, mouse or finger">${Array.from({length:22},(_,i)=>`<i style="left:${(i*37)%97}%;top:${(i*53)%92}%"></i>`).join("")}
      <span class="sstar" id="gsstar" style="left:${T.x}%;top:${T.y}%">⭐</span>
      <span class="ship" id="gship" style="left:${T.sx}%;top:${T.sy}%;--a:${T.a+45}deg">🚀</span></div>
    <div class="brl-n">Steer with the arrow keys, the mouse or your finger</div></div>`;
}
let STAR_RAF=0, STAR_TGT=null; const STAR_KEYS={};
function starStart(){
  if(STAR_RAF) return; let last=performance.now();
  const step=t=>{
    const G=gstate(), sky=document.getElementById("gsky"), ship=document.getElementById("gship");
    if(G.type!=="stars" || !sky || !ship){ STAR_RAF=0; STAR_TGT=null; return; }
    const dt=Math.min(50,t-last); last=t; const T=G.stars;
    if(!G.await && !S.fx.busy){
      const r=sky.getBoundingClientRect(); if(!r.width){ STAR_RAF=requestAnimationFrame(step); return; }
      let want=null; const kx=(STAR_KEYS.ArrowRight?1:0)-(STAR_KEYS.ArrowLeft?1:0), ky=(STAR_KEYS.ArrowDown?1:0)-(STAR_KEYS.ArrowUp?1:0);
      if(kx||ky){ want=Math.atan2(ky,kx)*180/Math.PI; STAR_TGT=null; }
      else if(STAR_TGT){ const dx=(STAR_TGT.x-T.sx)*r.width/100, dy=(STAR_TGT.y-T.sy)*r.height/100; if(Math.hypot(dx,dy)>10) want=Math.atan2(dy,dx)*180/Math.PI; }
      if(want!=null){ const d=((want-T.a+540)%360)-180; T.a+=Math.max(-1,Math.min(1,d/30))*0.35*dt; }
      const sp=.12*dt;
      T.sx+=Math.cos(T.a*Math.PI/180)*sp*100/r.width; T.sy+=Math.sin(T.a*Math.PI/180)*sp*100/r.height;
      if(T.sx<4){T.sx=4;T.a=180-T.a;} if(T.sx>96){T.sx=96;T.a=180-T.a;} if(T.sy<8){T.sy=8;T.a=-T.a;} if(T.sy>92){T.sy=92;T.a=-T.a;}
      ship.style.left=T.sx+"%"; ship.style.top=T.sy+"%"; ship.style.setProperty("--a",(T.a+45)+"deg");
      if(Math.hypot((T.x-T.sx)*r.width/100,(T.y-T.sy)*r.height/100)<36) starCatch();
    }
    STAR_RAF=requestAnimationFrame(step);
  };
  STAR_RAF=requestAnimationFrame(step);
}
function starPointer(e){ const sky=document.getElementById("gsky"); if(!sky || !sky.contains(e.target)) return; const r=sky.getBoundingClientRect(); STAR_TGT={x:(e.clientX-r.left)/r.width*100, y:(e.clientY-r.top)/r.height*100}; }
document.addEventListener("pointermove",starPointer); document.addEventListener("pointerdown",starPointer);
document.addEventListener("keydown",e=>{ if(!/^Arrow/.test(e.key) || !document.getElementById("gsky")) return; const t=document.activeElement; if(t && /INPUT|TEXTAREA|SELECT/.test(t.tagName)) return; STAR_KEYS[e.key]=true; e.preventDefault(); });
document.addEventListener("keyup",e=>{ if(/^Arrow/.test(e.key)) STAR_KEYS[e.key]=false; });
function starCatch(){
  const G=gstate(); if(!canPlay(G)) return; takeBonus(G); const T=G.stars;
  const sky=document.getElementById("gsky"); if(sky){ const st=document.getElementById("gsstar"); if(st){ const r=st.getBoundingClientRect(), h=sky.closest(".gm").getBoundingClientRect(); confetti(sky.closest(".gm"), r.left+r.width/2-h.left, r.top+r.height/2-h.top); st.remove(); } }
  S.fx.busy=true; setTimeout(()=>{ S.fx.busy=false; },360); snd("star"); T.got++;
  do{ T.x=8+rnd(84); T.y=12+rnd(76); } while(Math.hypot(T.x-T.sx,T.y-T.sy)<30);
  if(T.got>=10){ T.got=0; T.runs++; T.pending=true; }
  setTimeout(()=>{ reveal(G); renderMain(); },350);
}
async function starsDone(){ const G=gstate(), T=G.stars; if(!T?.pending) return; T.pending=false; const st=giveSticker(); celebrate(`<div class="gfx-e">🚀✨</div><b>10 stars!</b><span>Sticker: ${st}</span>`); saveLive(); }
/* Parrot Barrel */
const SWORDS=["#e4574f","#f2a516","#3fa66b","#3b82d6","#9a5fd6"];
const swordSVG=(c,full)=>full?`<svg viewBox="0 0 64 16" width="58" height="15" aria-hidden="true"><path d="M2 8 L8 5 H38 V11 H8 Z" fill="#dfe4ea" stroke="#9aa3ad" stroke-width="1"/><rect x="38" y="2" width="5" height="12" rx="2" fill="${c}"/><rect x="43" y="6" width="14" height="4" rx="2" fill="${c}"/><circle cx="59" cy="8" r="3.5" fill="${c}"/></svg>`:`<svg viewBox="0 0 30 16" width="28" height="15" aria-hidden="true"><rect x="2" y="2" width="5" height="12" rx="2" fill="${c}"/><rect x="7" y="6" width="14" height="4" rx="2" fill="${c}"/><circle cx="23" cy="8" r="3.5" fill="${c}"/></svg>`;
function barrelHTML(G){
  G.barrel ||= {slots:Array(10).fill(false), secret:rnd(10), pops:0, jump:false}; const B=G.barrel, can=canPlay(G); B.pick ??= 0;
  const n=B.slots.filter(x=>x!==false).length;
  return `<div class="brl"><div class="parrot ${B.jump?"jump":""}">🦜</div><div class="barrel">${B.slots.map((s,i)=>`<button class="slot ${s!==false?"in":""}" data-act="gslot" data-v="${i}" ${can&&s===false?"":"disabled"} aria-label="${s!==false?"Sword in":"Empty slot"}">${s!==false?swordSVG(SWORDS[s]||SWORDS[0]):""}</button>`).join("")}</div>
    <div class="swords" role="group" aria-label="Pick a sword">${SWORDS.map((c,i)=>`<button data-act="gsword" data-v="${i}" aria-pressed="${B.pick===i}" aria-label="Sword ${i+1}">${swordSVG(c,1)}</button>`).join("")}</div>
    <div class="brl-n">${n} sword${n===1?"":"s"} in · pick a sword, then a slot</div></div>`;
}
async function barrelSlot(i){
  const G=gstate(); if(!canPlay(G)) return; const B=G.barrel; if(B.slots[i]!==false) return; takeBonus(G);
  B.slots[i]=B.pick??0; snd("hop"); reveal(G);
  if(i===B.secret) B.pending=true;
  renderMain();
}
async function barrelDone(){ const G=gstate(), B=G.barrel; if(!B?.pending) return; B.pending=false; S.fx.busy=true; await sleep(250); B.jump=true; renderMain(); snd("win"); await sleep(700); S.fx.busy=false; const st=giveSticker(); celebrate(`<div class="gfx-e">🦜💨</div><b>The parrot jumped out!</b><span>Sticker: ${st}</span>`); await sleep(2600); G.barrel={slots:Array(10).fill(false), secret:rnd(10), pops:B.pops+1, jump:false, pick:B.pick}; saveLive(); renderMain(); }
/* Bonk the Mole */
function moleHTML(G){
  G.mole ||= {hole:rnd(9), bonks:0, gold:false}; const W=G.mole, can=canPlay(G);
  return `<div class="mole-w"><div class="holes">${Array.from({length:9},(_,i)=>`<div class="hole">${i===W.hole&&can?`<button class="mole ${G.bonus?"gold":""}" data-act="gbonk" aria-label="Bonk the mole">🐹${G.bonus?"<em>👑</em>":""}</button>`:""}<i class="dirt"></i></div>`).join("")}</div>
    <div class="brl-n">${W.bonks} bonks · ${10-(W.bonks%10)} to a sticker</div></div>`;
}
async function moleBonk(btn){
  const G=gstate(); if(!canPlay(G)) return; const star=takeBonus(G); const W=G.mole; S.fx.busy=true;
  btn?.classList.add("bonked"); snd("munch"); await sleep(380); S.fx.busy=false;
  W.bonks+=star?2:1; let nh=rnd(9); if(nh===W.hole) nh=(nh+4)%9; W.hole=nh; reveal(G);
  if(Math.floor(W.bonks/10)>Math.floor((W.bonks-(star?2:1))/10)){ const st=giveSticker(); renderMain(); celebrate(`<div class="gfx-e">🐹💫</div><b>${W.bonks} bonks!</b><span>Sticker: ${st}</span>`); return; }
  renderMain();
}
/* Tic Tac Toe vs Munch */
const TTT_LINES=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const tttWin=(b,p)=>TTT_LINES.some(l=>l.every(i=>b[i]===p));
function tttHTML(G){
  G.ttt ||= {b:Array(9).fill(""), wins:0, games:0, over:false}; const T=G.ttt, can=canPlay(G)&&!T.over;
  return `<div class="ttt-w"><div class="ttt">${T.b.map((c,i)=>`<button data-act="gttt" data-v="${i}" ${can&&!c?"":"disabled"} aria-label="${c==="x"?"Star":c==="o"?"Cookie":"Empty"}">${c==="x"?"⭐":c==="o"?"🍪":""}</button>`).join("")}</div>
    <div class="brl-n">You ⭐ vs Munch 🍪 · wins ${T.wins}</div></div>`;
}
async function tttMove(i){
  const G=gstate(); if(!canPlay(G)) return; const T=G.ttt; if(T.over||T.b[i]) return; takeBonus(G);
  T.b[i]="x"; snd("pop"); reveal(G); renderMain();
  const end=async(msg,win)=>{ T.over=true; T.games++; if(win) T.wins++; saveLive(); renderMain(); celebrate(msg); await sleep(2600); T.b=Array(9).fill(""); T.over=false; saveLive(); renderMain(); };
  if(tttWin(T.b,"x")){ const st=giveSticker(); return end(`<div class="gfx-e">⭐⭐⭐</div><b>You win!</b><span>Sticker: ${st}</span>`,true); }
  if(T.b.every(Boolean)) return end(`<div class="gfx-e">🤝</div><b>It's a draw!</b>`);
  S.fx.busy=true; await sleep(600); S.fx.busy=false;
  const free=T.b.map((c,k)=>c?null:k).filter(k=>k!=null);
  const tryP=p=>free.find(k=>{ const b=[...T.b]; b[k]=p; return tttWin(b,p); });
  let m=tryP("o"); if(m==null) m=tryP("x"); if(m==null) m=free.includes(4)&&Math.random()<.5?4:free[rnd(free.length)];
  T.b[m]="o"; snd("flip"); saveLive(); renderMain();
  if(tttWin(T.b,"o")) return end(`<div class="gfx-e">🍪</div><b>Munch wins this time!</b><span>New game coming…</span>`);
  if(T.b.every(Boolean)) return end(`<div class="gfx-e">🤝</div><b>It's a draw!</b>`);
}
/* Paint Splash */
const PAINT_PICS=[
  {name:"House", parts:[["rect","x=10 y=88 width=180 height=22","ground"],["rect","x=45 y=48 width=110 height=42","walls"],["polygon","points=\"38,50 100,14 162,50\"","roof"],["rect","x=88 y=64 width=24 height=26","door"],["rect","x=56 y=58 width=20 height=16","window"],["rect","x=124 y=58 width=20 height=16","window 2"],["circle","cx=172 cy=20 r=12","sun"],["ellipse","cx=36 cy=20 rx=20 ry=9","cloud"]]},
  {name:"Flower", parts:[["rect","x=96 y=58 width=8 height=40","stem"],["ellipse","cx=82 cy=78 rx=14 ry=6","leaf"],["circle","cx=100 cy=26 r=12","petal"],["circle","cx=118 cy=40 r=12","petal 2"],["circle","cx=82 cy=40 r=12","petal 3"],["circle","cx=100 cy=52 r=12","petal 4"],["circle","cx=100 cy=39 r=8","middle"],["polygon","points=\"72,98 128,98 120,118 80,118\"","pot"]]},
  {name:"Fish", parts:[["rect","x=0 y=96 width=200 height=24","sand"],["ellipse","cx=95 cy=56 rx=46 ry=26","body"],["polygon","points=\"138,56 168,34 168,78\"","tail"],["polygon","points=\"86,32 104,14 112,34\"","fin"],["circle","cx=70 cy=50 r=6","eye"],["circle","cx=40 cy=24 r=5","bubble"],["circle","cx=30 cy=10 r=4","bubble 2"],["ellipse","cx=150 cy=104 rx=14 ry=6","shell"]]}
];
const PAINT_COLS=["#e46a72","#f2a65a","#ecd25e","#94bf5e","#6fb3d9","#8f7ad6","#c98a5b","#f4a6c4"];
function paintHTML(G){
  G.paint ||= {pic:0, fill:{}, col:0, done:0}; const P=G.paint, pic=PAINT_PICS[P.pic%PAINT_PICS.length], can=canPlay(G);
  const attrs=s=>s.replace(/(\w+)=("[^"]*"|\S+)/g,(m,k,v)=>`${k}=${v.startsWith('"')?v:'"'+v+'"'}`);
  return `<div class="pnt"><svg viewBox="0 0 200 120" class="pnt-svg" role="img" aria-label="${pic.name} to paint">${pic.parts.map(([tag,a,label],i)=>`<${tag} ${attrs(a)} data-act="gpaint" data-v="${i}" class="pp ${P.fill[i]?"done":""} ${can&&!P.fill[i]?"open":""}" fill="${P.fill[i]||"#ffffff"}" stroke="#4a4a4a" stroke-width="1.6"><title>${label}</title></${tag}>`).join("")}</svg>
    <div class="pal">${PAINT_COLS.map((c,i)=>`<button style="--pc:${c}" aria-pressed="${P.col===i}" data-act="gpcol" data-v="${i}" aria-label="Colour ${i+1}"></button>`).join("")}</div></div>`;
}
async function paintPart(i){
  const G=gstate(); if(!canPlay(G)) return; const P=G.paint; if(P.fill[i]) return; takeBonus(G);
  P.fill[i]=PAINT_COLS[P.col]; snd("pop"); reveal(G);
  const pic=PAINT_PICS[P.pic%PAINT_PICS.length];
  if(pic.parts.every((_,k)=>P.fill[k])){ renderMain(); const st=giveSticker(); celebrate(`<div class="gfx-e">🎨</div><b>Masterpiece!</b><span>Sticker: ${st}</span>`); await sleep(2600); P.pic++; P.fill={}; P.done++; saveLive(); renderMain(); return; }
  renderMain();
}

/* ---------- Games, set 4 (Say & Do style): Pacer, Roll & Say, Build it, Maze ---------- */
GAMES.push(
  {id:"pacer", name:"Pacer board", art:"🟣", bg:"linear-gradient(135deg,#e8e2f7,#c9bdf0)", col:"#5a54a8", how:"Tap the next dot as they say it. Ten dots, one row."},
  {id:"roll", name:"Roll & say", art:"🎲", bg:"linear-gradient(135deg,#ffe9c7,#ffc98a)", col:"#b36b12", how:"Roll the die, say the word that many times, colour a piece."},
  {id:"build", name:"Build it", art:"🌸", bg:"linear-gradient(135deg,#fde2ea,#f7b9cf)", col:"#b8456f", how:"Add a petal, a candle or a scoop with every word."},
  {id:"maze", name:"Maze walk", art:"🧭", bg:"linear-gradient(135deg,#dcefe4,#a8d8bd)", col:"#2f7d5a", how:"Each word is one step through the maze to the treasure."}
);
Object.assign(GAME_CALL,{pacer:"🟣 Tap the next dot!",roll:"🎲 Roll the die!",build:"🌸 Add a piece!",maze:"🧭 Take a step!"});
/* Pacer board */
function pacerHTML(G){
  G.pacer ||= {n:0, rows:0}; const P=G.pacer, can=canPlay(G);
  return `<div class="pcr"><div class="pcr-row">${Array.from({length:10},(_,i)=>`<button class="pdot ${i<P.n?"on":""} ${i===P.n?"next":""}" data-act="gpace" data-v="${i}" ${can&&i===P.n?"":"disabled"} aria-label="Dot ${i+1}"></button>`).join("")}</div>
    <div class="brl-n">${P.n}/10 · rows done: ${P.rows}</div></div>`;
}
async function pacerTap(i){
  const G=gstate(); if(!canPlay(G)) return; const P=G.pacer; if(i!==P.n) return; takeBonus(G);
  P.n++; snd("tick"); reveal(G);
  if(P.n>=10){ P.pending=true; }
  renderMain();
}
async function pacerDone(){ const G=gstate(), P=G.pacer; if(!P?.pending) return; P.pending=false; const st=giveSticker(); celebrate(`<div class="gfx-e">🟣✨</div><b>Row done!</b><span>Sticker: ${st}</span>`); P.n=0; P.rows++; saveLive(); setTimeout(renderMain,2600); }
/* Roll & say */
const ROLL_PICS=[{name:"Balloon bunch",parts:[["circle","cx=60 cy=40 r=20","balloon"],["circle","cx=100 cy=32 r=20","balloon"],["circle","cx=140 cy=42 r=20","balloon"],["circle","cx=80 cy=70 r=18","balloon"],["circle","cx=120 cy=72 r=18","balloon"],["path","d=M100 90 L100 115 M60 60 L100 112 M140 62 L100 112","strings"]]},
 {name:"Caterpillar",parts:[["circle","cx=30 cy=70 r=18","head"],["circle","cx=62 cy=70 r=18","body"],["circle","cx=94 cy=70 r=18","body"],["circle","cx=126 cy=70 r=18","body"],["circle","cx=158 cy=70 r=18","body"],["path","d=M22 54 L14 36 M38 54 L46 36","feelers"]]},
 {name:"Rocket",parts:[["path","d=M100 10 L125 60 L75 60 Z","nose"],["rect","x=75 y=60 width=50 height=40","body"],["circle","cx=100 cy=78 r=9","window"],["path","d=M75 100 L60 118 L75 112 Z","fin"],["path","d=M125 100 L140 118 L125 112 Z","fin"],["path","d=M88 112 L100 130 L112 112 Z","flame"]]}];
const ROLL_COLS=["#e46a72","#f2a65a","#f2d35e","#8fc46d","#6aa8e0","#b48be0"];
function rollHTML(G){
  G.roll ||= {pic:0, fill:{}, last:0, done:0}; const R=G.roll, pic=ROLL_PICS[R.pic%ROLL_PICS.length], can=canPlay(G);
  const attrs=a=>a.replace(/(\w+)=("[^"]*"|\S+)/g,(m,k,v)=>`${k}=${v.startsWith('"')?v:'"'+v+'"'}`);
  return `<div class="rll"><svg viewBox="0 0 200 135" class="pnt-svg" role="img" aria-label="${pic.name}">${pic.parts.map(([tag,a,label],i)=>`<${tag} ${attrs(a)} fill="${R.fill[i]||"#fff"}" stroke="${R.fill[i]?"#00000022":"#c9bda8"}" stroke-width="3" stroke-dasharray="${R.fill[i]?"0":"5 4"}"/><text x="${12+i*30}" y="130" font-size="11" fill="${R.fill[i]?"#8a7f73":"#2a2420"}" font-weight="700">${i+1}${R.fill[i]?" ✓":""}</text>`).join("")}</svg>
    <div class="gact"><span class="gdie" id="rdie">${["⚀","⚁","⚂","⚃","⚄","⚅"][Math.max(0,R.last-1)]||"🎲"}</span><button class="groll" data-act="gorll" ${can?"":"disabled"}>${can?"Roll!":"Say the word first"}</button></div>
    <div class="brl-n">${R.last?`You rolled ${R.last}: say it ${R.last} time${R.last===1?"":"s"}`:"Roll, then say the word that many times"} · ${pic.name} ${Object.keys(R.fill).length}/6</div></div>`;
}
async function rollSay(){
  const G=gstate(); if(!canPlay(G)) return; takeBonus(G); const R=G.roll; S.fx.busy=true;
  const die=document.getElementById("rdie"); const faces=["⚀","⚁","⚂","⚃","⚄","⚅"]; for(let k=0;k<8;k++){ if(die) die.textContent=faces[rnd(6)]; snd("tick"); await sleep(90); }
  S.fx.busy=false; const n=rnd(6)+1; R.last=n; R.fill[n-1]=ROLL_COLS[n-1]; R.reps=n; reveal(G);
  if(ROLL_PICS[R.pic%ROLL_PICS.length].parts.every((_,k)=>R.fill[k])) R.pending=true;
  renderMain();
}
async function rollDone(){ const G=gstate(), R=G.roll; if(!R?.pending) return; R.pending=false; const st=giveSticker(); celebrate(`<div class="gfx-e">🎲🎨</div><b>All coloured in!</b><span>Sticker: ${st}</span>`); R.pic++; R.fill={}; R.last=0; R.done++; saveLive(); setTimeout(renderMain,2600); }
/* Build it: flower → cake → ice cream */
const BUILDS=[{name:"flower",n:8,done:"🌸 Flower finished!",e:"🌸",piece:"petal"},{name:"cake",n:6,done:"🎂 Cake finished!",e:"🎂",piece:"candle"},{name:"ice cream",n:5,done:"🍦 Ice cream finished!",e:"🍦",piece:"scoop"},{name:"pizza",n:6,done:"🍕 Pizza ready!",e:"🍕",piece:"topping"},{name:"snowman",n:6,done:"⛄ Snowman built!",e:"⛄",piece:"piece"},{name:"robot",n:6,done:"🤖 Robot built!",e:"🤖",piece:"part"}];
function buildSVG(kind,n){
  if(kind==="flower") return `<svg viewBox="0 0 200 200" class="pnt-svg" aria-hidden="true">${Array.from({length:8},(_,i)=>{ const a=i*45*Math.PI/180, x=100+Math.cos(a)*52, y=96+Math.sin(a)*52; return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="18" ry="30" transform="rotate(${i*45} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${i<n?["#f7a8c4","#f9c4d8","#f48fb1","#fbb8d0"][i%4]:"none"}" stroke="${i<n?"#e26a95":"#d8ccb6"}" stroke-width="2" stroke-dasharray="${i<n?0:"5 4"}"/>`; }).join("")}<circle cx="100" cy="96" r="24" fill="#ffd54f" stroke="#e0a800" stroke-width="3"/><path d="M100 120 L100 190" stroke="#5aa066" stroke-width="6" stroke-linecap="round"/><path d="M100 160 Q70 150 72 172 Q90 176 100 160Z" fill="#7fc46a"/></svg>`;
  if(kind==="cake") return `<svg viewBox="0 0 200 200" class="pnt-svg" aria-hidden="true"><rect x="30" y="110" width="140" height="60" rx="10" fill="#f6c89a" stroke="#d99a5b" stroke-width="3"/><path d="M30 118 Q60 140 100 118 Q140 96 170 118 L170 110 L30 110Z" fill="#f48fb1"/>${Array.from({length:6},(_,i)=>{ const x=50+i*20; return `<rect x="${x-4}" y="70" width="8" height="40" rx="3" fill="${i<n?["#6aa8e0","#e46a72","#8fc46d","#f2d35e","#b48be0","#f2a65a"][i]:"none"}" stroke="${i<n?"none":"#d8ccb6"}" stroke-dasharray="${i<n?0:"4 3"}"/>${i<n?`<ellipse cx="${x}" cy="62" rx="5" ry="9" fill="#ffb300"/><ellipse cx="${x}" cy="64" rx="2.5" ry="5" fill="#fff3b0"/>`:""}`; }).join("")}</svg>`;
  if(kind==="pizza") return `<svg viewBox="0 0 200 200" class="pnt-svg" aria-hidden="true"><circle cx="100" cy="100" r="86" fill="#f2c27b" stroke="#c98b3f" stroke-width="4"/><circle cx="100" cy="100" r="72" fill="#e8574a"/><circle cx="100" cy="100" r="66" fill="#ffd96b"/>${[[70,70],[128,66],[100,104],[62,118],[138,122],[100,150]].map(([x,y],i)=>i<n?[`<circle cx="${x}" cy="${y}" r="13" fill="#c0392b"/>`,`<ellipse cx="${x}" cy="${y}" rx="14" ry="8" fill="#7fc46a"/>`,`<circle cx="${x}" cy="${y}" r="11" fill="#f2a65a"/><circle cx="${x}" cy="${y}" r="4" fill="#ffd96b"/>`,`<rect x="${x-12}" y="${y-8}" width="24" height="16" rx="4" fill="#8b5a2b"/>`,`<circle cx="${x}" cy="${y}" r="12" fill="#444"/><circle cx="${x}" cy="${y}" r="4" fill="#ffd96b"/>`,`<path d="M${x-12} ${y+8} L${x} ${y-10} L${x+12} ${y+8} Z" fill="#f7e36b"/>`][i]:`<circle cx="${x}" cy="${y}" r="13" fill="none" stroke="#c98b3f" stroke-width="2" stroke-dasharray="4 3"/>`).join("")}</svg>`;
  if(kind==="snowman") return `<svg viewBox="0 0 200 200" class="pnt-svg" aria-hidden="true">${[`<circle cx="100" cy="150" r="42" fill="#fff" stroke="#bcd" stroke-width="3"/>`,`<circle cx="100" cy="92" r="32" fill="#fff" stroke="#bcd" stroke-width="3"/>`,`<circle cx="100" cy="48" r="24" fill="#fff" stroke="#bcd" stroke-width="3"/><circle cx="92" cy="44" r="3" fill="#333"/><circle cx="108" cy="44" r="3" fill="#333"/>`,`<path d="M100 50 L122 56 L100 60 Z" fill="#f2a65a"/>`,`<rect x="82" y="14" width="36" height="8" fill="#333"/><rect x="88" y="0" width="24" height="16" fill="#333"/>`,`<path d="M76 70 Q100 86 124 70 L128 80 Q100 98 72 80 Z" fill="#e46a72"/><rect x="112" y="76" width="10" height="26" rx="4" fill="#e46a72"/>`].map((part,i)=>i<n?part:"").join("")}${n<6?`<text x="100" y="190" font-size="12" text-anchor="middle" fill="#8a7f73">${["body","middle","head","nose","hat","scarf"][n]} next</text>`:""}</svg>`;
  if(kind==="robot") return `<svg viewBox="0 0 200 200" class="pnt-svg" aria-hidden="true">${[`<rect x="60" y="80" width="80" height="70" rx="10" fill="#9ab8d0" stroke="#4e6f8c" stroke-width="3"/><circle cx="100" cy="115" r="12" fill="#ffd54f"/>`,`<rect x="68" y="30" width="64" height="48" rx="10" fill="#b9d0e2" stroke="#4e6f8c" stroke-width="3"/><circle cx="86" cy="52" r="7" fill="#2b2420"/><circle cx="114" cy="52" r="7" fill="#2b2420"/><rect x="84" y="64" width="32" height="5" rx="2" fill="#4e6f8c"/>`,`<rect x="96" y="12" width="8" height="18" fill="#4e6f8c"/><circle cx="100" cy="10" r="7" fill="#e46a72"/>`,`<rect x="30" y="86" width="26" height="12" rx="6" fill="#9ab8d0" stroke="#4e6f8c" stroke-width="3"/><circle cx="26" cy="92" r="9" fill="#f2a65a"/>`,`<rect x="144" y="86" width="26" height="12" rx="6" fill="#9ab8d0" stroke="#4e6f8c" stroke-width="3"/><circle cx="174" cy="92" r="9" fill="#f2a65a"/>`,`<rect x="68" y="152" width="22" height="34" rx="6" fill="#9ab8d0" stroke="#4e6f8c" stroke-width="3"/><rect x="110" y="152" width="22" height="34" rx="6" fill="#9ab8d0" stroke="#4e6f8c" stroke-width="3"/>`].map((part,i)=>i<n?part:"").join("")}${n<6?`<text x="100" y="198" font-size="12" text-anchor="middle" fill="#8a7f73">${["body","head","antenna","left arm","right arm","legs"][n]} next</text>`:""}</svg>`;
  return `<svg viewBox="0 0 200 200" class="pnt-svg" aria-hidden="true"><path d="M70 120 L100 195 L130 120 Z" fill="#f2c27b" stroke="#c98b3f" stroke-width="3"/><path d="M78 130 L122 130 M84 145 L116 145 M90 160 L110 160" stroke="#c98b3f" stroke-width="2"/>${Array.from({length:5},(_,i)=>`<circle cx="100" cy="${118-i*20}" r="22" fill="${i<n?["#f9d5a7","#f48fb1","#b8e0c8","#c9bdf0","#fff0a0"][i]:"none"}" stroke="${i<n?"#00000022":"#d8ccb6"}" stroke-width="2" stroke-dasharray="${i<n?0:"5 4"}"/>`).join("")}</svg>`;
}
function buildHTML(G){
  G.build ||= {k:0, n:0, made:0}; const B=G.build, kind=BUILDS[B.k%BUILDS.length], can=canPlay(G);
  return `<div class="bld"><div class="bld-pick" role="group" aria-label="What to build">${BUILDS.map((k,i)=>`<button data-act="gbpick" data-v="${i}" aria-pressed="${i===B.k%BUILDS.length}" ${B.n&&i!==B.k%BUILDS.length?"disabled":""} title="${k.name}">${k.e}</button>`).join("")}</div>${buildSVG(kind.name,B.n)}<div class="gact"><button class="groll" data-act="gbuild" ${can?"":"disabled"}>${can?`+ ${kind.piece}`:"Say the word first"}</button></div><div class="brl-n">${B.n}/${kind.n} · ${B.made} built${B.n?"":" · pick what to build"}</div></div>`;
}
async function buildAdd(){
  const G=gstate(); if(!canPlay(G)) return; takeBonus(G); const B=G.build, kind=BUILDS[B.k%BUILDS.length];
  B.n++; snd("pop"); reveal(G); if(B.n>=kind.n) B.pending=true; renderMain();
}
async function buildDone(){ const G=gstate(), B=G.build; if(!B?.pending) return; B.pending=false; const kind=BUILDS[B.k%BUILDS.length]; const st=giveSticker(); celebrate(`<div class="gfx-e">${kind.name==="flower"?"🌸":kind.name==="cake"?"🎂":"🍦"}</div><b>${kind.done}</b><span>Sticker: ${st}</span>`); B.k=(B.k+1)%BUILDS.length; B.n=0; B.made++; saveLive(); setTimeout(renderMain,2600); }
/* Maze walk: fixed path on a 6x6 grid */
const MAZE_PATH=[[0,5],[1,5],[1,4],[1,3],[2,3],[3,3],[3,4],[3,5],[4,5],[5,5],[5,4],[5,3],[5,2],[4,2],[4,1],[3,1],[2,1],[2,0],[3,0],[4,0],[5,0]];
const MAZE_WALL=[[0,4],[0,3],[0,2],[2,4],[2,5],[2,2],[4,4],[4,3],[3,2],[1,1],[1,2],[1,0],[0,0],[0,1]];
function mazeHTML(G){
  G.maze ||= {i:0, found:0}; const M=G.maze, can=canPlay(G), here=MAZE_PATH[M.i], next=MAZE_PATH[M.i+1], end=MAZE_PATH[MAZE_PATH.length-1];
  const key=(x,y)=>x+","+y, walls=new Set(MAZE_WALL.map(w=>key(...w))), path=new Set(MAZE_PATH.map(w=>key(...w)));
  let cells=""; for(let y=0;y<6;y++) for(let x=0;x<6;x++){ const k=key(x,y); const isHere=here[0]===x&&here[1]===y, isNext=next&&next[0]===x&&next[1]===y, isEnd=end[0]===x&&end[1]===y;
    cells+=`<button class="mz ${walls.has(k)?"wall":""} ${path.has(k)&&MAZE_PATH.findIndex(p=>p[0]===x&&p[1]===y)<M.i?"trod":""} ${isNext?"next":""}" data-act="gmaze" data-v="${isNext?1:0}" ${can&&isNext?"":"disabled"} aria-label="${isNext?"Next step":"Maze"}">${isHere?"🧒":isEnd?"💎":walls.has(k)?"🌳":""}</button>`; }
  return `<div class="mzw"><div class="mzg">${cells}</div><div class="brl-n">${M.i}/${MAZE_PATH.length-1} steps · ${M.found} treasures</div></div>`;
}
async function mazeStep(){
  const G=gstate(); if(!canPlay(G)) return; const M=G.maze; if(M.i>=MAZE_PATH.length-1) return; takeBonus(G);
  M.i++; snd("hop"); reveal(G); if(M.i>=MAZE_PATH.length-1) M.pending=true; renderMain();
}
async function mazeDone(){ const G=gstate(), M=G.maze; if(!M?.pending) return; M.pending=false; const st=giveSticker(); celebrate(`<div class="gfx-e">💎🎉</div><b>Treasure found!</b><span>Sticker: ${st}</span>`); M.i=0; M.found++; saveLive(); setTimeout(renderMain,2600); }


/* ---- overlay view ---- */
function itemAt(si){ return ITEMS[si]||{}; }
function sayCard(G){
  const si=G.revealed.si, it=itemAt(si), w=GOAL.stimuli[si]||"", kind=it.kind||"";
  const p=(kind==="silly"||kind==="sent")?"":picFor(w);
  const reps=G.type==="roll"&&G.roll?.reps>1?G.roll.reps:0;
  const lab=OPT.reading?(kind==="silly"?"👽 Alien word: read it":kind==="sent"?"⭐ The sentence: read it":reps?`Read it ${reps} times`:"Read it aloud"):reps?`Say it ${reps} times`:"Say it aloud";
  const canHear=!OPT.reading||kind==="real";
  return `<div class="saycard"><div class="sc-in ${p?"":"nopic"} ${w.length>14?"long":""} ${kind}">
    <div class="sc-lab">${lab}</div>
    <div class="sc-wrow">${canHear?`<button class="sc-spk" data-act="gspeak" data-v="${esc(w)}" aria-label="Hear it">🔊</button>`:""}<span class="sc-word">${esc(w)}</span></div>
    ${p?`<div class="sc-tile">${p}</div>`:""}
    <div class="sc-foot"><button class="sc-skip" data-act="gcardskip">Skip</button><button class="sc-ok" data-act="fxhit" data-v="1">${OPT.reading?"✓ I read it":"✓ Said it"}</button></div>
  </div></div>`;
}
function readDone(G,lastSi){ return OPT.reading && lastSi>=ITEMS.length-1; }
function finishReading(){ const G=gstate(); VIEW="win"; S.fx.stk=false; const out=LV.log.map(t=>({key:ITEMS[t.si]?.key??null, text:GOAL.stimuli[t.si], kind:ITEMS[t.si]?.kind, k:t.k}));
  const gname=(GAMES.find(g=>g.id===G.type)||{}).name||G.type; LV.won={n:out.length, sent:out.some(x=>x.kind==="sent")};
  try{ OPT.onComplete&&OPT.onComplete(out,{game:G.type,gameName:gname,ms:Date.now()-LV.t0}); }catch(e){}
  renderMain(); const box=ROOT&&ROOT.querySelector(".sgk-win"); if(box){ for(let k=0;k<4;k++) setTimeout(()=>confetti(box, box.clientWidth*(.15+.23*k), 80),k*200); } snd("win"); }
function winView(){ const w=LV.won||{n:0}; const words=w.n-(w.sent?1:0);
  return `<div class="sgk-win"><div class="sgk-tro">🏆</div><h2>You did it!</h2><p>${words} word${words===1?"":"s"}${w.sent?" and a sentence":""} · ★ ${w.n}</p>${NEWSTK.length?`<p class="muted">New sticker${NEWSTK.length>1?"s":""}: ${NEWSTK.join(" ")}</p>`:""}
    <div class="sgk-row" style="justify-content:center"><button class="sgk-primary" data-act="sgkagain">Play again</button>${OPT.onNext?`<button class="tb" data-act="sgknext">Next level ›</button>`:""}<button class="tb" data-act="sgkmore">More games</button><button class="tb ghost" data-act="sgkdrop">Close</button></div></div>`; }
function restart(newOpt){ if(newOpt){ if(newOpt.items) setItems(newOpt.items); if(newOpt.title) OPT.title=newOpt.title; }
  const type=LV.game.type; LV.log=[]; LV.cur={gid:"w",si:0}; LV.t0=Date.now(); LV.won=null; LV.game=freshGame(type); VIEW="game"; S.fx.busy=false; renderMain(); }
function freshGame(type){ return {type, turns:[], board:{pos:0,boards:0}, spin:{score:0,rot:0}, memory:null, munch:{fed:0,level:1}}; }
function setItems(list){ const items=(list||[]).map(x=>typeof x==="string"?{key:x,text:x}:{key:x.key===undefined?(x.text??null):x.key, text:String(x.text??x.key??""), kind:x.kind||""}).filter(x=>x.text.trim());
  ITEMS=items; KEY={}; items.forEach(x=>{ if(!(x.text in KEY)) KEY[x.text]=x.key; }); GOAL.stimuli=items.map(x=>x.text); }

function stickerBook(){
  const all=S.client.stickers||[], fresh=NEWSTK.length, slots=Math.max(16, Math.ceil((all.length+4)/8)*8);
  return `<div class="stkbook"><div class="stk-h"><b>${esc(OPT.who?OPT.who+"’s":"My")} sticker book</b><span>${all.length} sticker${all.length===1?"":"s"}${fresh?` · ${fresh} new today`:""}</span><button class="tb" data-act="gstk">Close</button></div>
    <div class="stk-g">${Array.from({length:slots},(_,i)=>i<all.length?`<span class="stk ${i>=all.length-fresh?"new":""}">${all[i]}</span>`:`<span class="stk empty"></span>`).join("")}</div>
    <p class="stk-f">Earn stickers by finishing a game.</p></div>`;
}
const RVK=["clear","near","off"], RVL={clear:["✓","said it"],near:["≈","nearly"],off:["·","not yet"]};
function reviewView(){
  const tries=LV.log;
  const n=k=>tries.filter(t=>t.k===k).length;
  return `<div class="sgk-review"><h2>Check before adding</h2>
    <p class="muted">Tap a word to change it: ✓ said it → ≈ nearly → · not yet.</p>
    ${tries.length?`<div class="rvw-g">${tries.map((t,i)=>`<button class="rv ${t.k}" data-act="rvflip" data-i="${i}"><span>${RVL[t.k][0]}</span>${esc(GOAL.stimuli[t.si]||"")}</button>`).join("")}</div>
    <p class="muted">${n("clear")} said it · ${n("near")} nearly · ${n("off")} not yet</p>`:`<p class="muted">No words yet.</p>`}
    <div class="sgk-row"><button class="sgk-primary" data-act="sgkfinish">${tries.length?`Add ${tries.length} to the tally`:"Close"}</button><button class="tb" data-act="sgkback">Back to the game</button>${tries.length?`<button class="tb ghost" data-act="sgkdrop">Close without adding</button>`:""}</div></div>`;
}
function renderMain(){
  if(!ROOT) return;
  const G=gstate(), stars=LV.log.filter(t=>t.k==="clear").length;
  let body;
  if(VIEW==="review") body=reviewView();
  else if(VIEW==="win") body=winView();
  else if(!G.type || S.fx.picker) body=gamePicker();
  else { const ga=gameArea(G);
    body=`<div class="gm gm-${G.type}">
      <div class="gm-hud calm"><span class="gm-prog">${ga.pill}</span><span class="gm-star-c">★ ${stars}</span></div>
      <div class="gm-word gm-wait" ${G.await?'style="visibility:hidden"':""}>${GAME_CALL[G.type]||"Your turn!"}</div>
      ${ga.body}
      ${G.await&&G.revealed?sayCard(G):""}
      <div class="gfx" id="gmFx" hidden data-act="gfxclose"></div>
    </div>`; }
  const prog=OPT.reading?`${Math.min(LV.log.length+1,ITEMS.length)} of ${ITEMS.length}`:`<b>${LV.log.length}</b> tries`;
  const top=`<div class="gm-mini"><span>${esc(OPT.title||"Games")} · ${prog} · ★ ${stars}</span>
    <span class="gm-acts">
      <button class="tb" data-act="sgkundo" title="Undo" ${LV.log.length&&VIEW==="game"?"":"disabled"}>↶<span class="tbl"> Undo</span></button>
      <button class="tb" data-act="gpickopen" title="Game">🎲<span class="tbl"> Game</span></button>
      <button class="tb" data-act="gstk" title="Stickers" aria-pressed="${!!S.fx.stk}">⭐<span class="tbl"> Stickers</span></button>
      <button class="tb" data-act="gpics" title="Pics" aria-pressed="${picsOn()}">🖼️<span class="tbl"> Pics</span></button>
      <button class="tb" data-act="gmute" title="Sounds" aria-pressed="${!!S.client.sound}">🔊<span class="tbl"> Sounds</span></button>
      <button class="tb done" data-act="${OPT.reading?"sgkdrop":"sgkdone"}">${OPT.reading?"Close":"Done"}</button>
    </span></div>`;
  const y=window.scrollY;
  ROOT.innerHTML=`<div class="sgk-box gm-wrap">${top}${S.fx.stk?stickerBook():""}${body}</div><div class="sgk-toast" hidden></div>`;
}
function phaseNote(si){ if(!OPT.reading) return; const a=itemAt(si).kind, b=itemAt(si+1).kind; if(b&&b!==a){ setTimeout(()=>toast(b==="silly"?"👽 Alien words next!":"⭐ Last one: the sentence!"),400); } }
function afterCard(G){
  flushCel();
  if(G.type==="smoothie"&&G.smoothie?.pending) setTimeout(smoothieBlend,30);
  if(G.type==="balloon"&&G.balloon?.pending) setTimeout(balloonDone,30);
  if(G.type==="stars"&&G.stars?.pending) setTimeout(starsDone,30);
  if(G.type==="barrel"&&G.barrel?.pending) setTimeout(barrelDone,30);
  if(G.type==="pacer"&&G.pacer?.pending) setTimeout(pacerDone,30); if(G.type==="roll"&&G.roll?.pending) setTimeout(rollDone,30); if(G.type==="build"&&G.build?.pending) setTimeout(buildDone,30); if(G.type==="maze"&&G.maze?.pending) setTimeout(mazeDone,30);
}
async function onClick(e){
  const b=e.target.closest("[data-act]"); if(!b||!ROOT||!ROOT.contains(b)||b.disabled) return;
  const a=b.dataset.act, G=gstate();
  if(a==="fxhit"){ const cur=fxCurrent(); if(!cur||!G.await) return; logTrial(cur.g,cur.si,true); snd("star"); G.await=false; G.bonus=true; G.tries=0;
    phaseNote(cur.si); if(readDone(G,cur.si)){ setTimeout(finishReading,350); renderMain(); return; } fxPickNext(cur); afterCard(G); renderMain(); return; }
  if(a==="gcardskip"){ G.await=false; G.tries=0; const cur=fxCurrent(); if(cur){ phaseNote(cur.si); if(readDone(G,cur.si)){ if(LV.log.length) setTimeout(finishReading,350); else { LV.cur={gid:"w",si:0}; } renderMain(); return; } fxPickNext(cur); } afterCard(G); renderMain(); return; }
  if(a==="sgkagain"){ restart(); return; }
  if(a==="sgkmore"){ restart(); S.fx.picker=true; renderMain(); return; }
  if(a==="sgknext"){ let n=null; try{ n=OPT.onNext&&OPT.onNext(); }catch(err){} if(n) restart(n); else toast("That's the last level!"); return; }
  if(a==="gspeak"){ if(OPT.say){ try{ OPT.say(b.dataset.v); }catch(err){} return; } try{ const u=new SpeechSynthesisUtterance(b.dataset.v); const vs=speechSynthesis.getVoices(); const v=vs.find(x=>x.lang==="en-AU")||vs.find(x=>/^en/.test(x.lang)); if(v) u.voice=v; u.lang=v?.lang||"en-AU"; u.rate=.8; speechSynthesis.cancel(); speechSynthesis.speak(u); }catch(err){} return; }
  if(a==="sgkundo"){ const t=LV.log.pop(); if(t){ LV.cur={gid:"w",si:t.si}; G.await=true; G.revealed={gid:"w",si:t.si}; toast("Last try undone"); } renderMain(); return; }
  if(a==="sgkdone"){ VIEW="review"; S.fx.stk=false; renderMain(); return; }
  if(a==="sgkback"){ VIEW="game"; renderMain(); return; }
  if(a==="rvflip"){ const t=LV.log[+b.dataset.i]; if(t){ t.k=RVK[(RVK.indexOf(t.k)+1)%3]; } renderMain(); return; }
  if(a==="sgkfinish"){ const out=LV.log.map(t=>({key:ITEMS[t.si]?.key??null, text:GOAL.stimuli[t.si], k:t.k})); close(); try{ OPT.onFinish&&OPT.onFinish(out); }catch(err){} return; }
  if(a==="sgkdrop"){ close(); return; }
  if(a==="gstk"){ S.fx.stk=!S.fx.stk; renderMain(); return; }
  if(a==="gpick"){ G.type=b.dataset.v; S.client.lastGame=G.type; S.fx.picker=false; VIEW="game"; scheduleSave(); snd("pop"); renderMain(); return; }
  if(a==="gpickopen"){ S.fx.picker=true; VIEW="game"; renderMain(); return; }
  if(a==="gpickclose"){ S.fx.picker=false; renderMain(); return; }
  if(a==="gpics"){ LV.mod = picsOn()?[]:["picture"]; scheduleSave(); renderMain(); return; }
  if(a==="gmute"){ S.client.sound=!S.client.sound; scheduleSave(); renderMain(); return; }
  if(a==="gfxclose"){ b.hidden=true; return; }
  if(a==="groll"){ b.disabled=true; playBoard(); return; }
  if(a==="gspin"){ b.disabled=true; playSpin(); return; }
  if(a==="gflip"){ flipCard(+b.dataset.v); return; }
  if(a==="gfeed"){ feed(b.dataset.v,b); return; }
  if(a==="gpop"){ popBalloon(+b.dataset.v,b); return; }
  if(a==="gdig"){ digCell(+b.dataset.v); return; }
  if(a==="gstack"){ stackLayer(b.dataset.v); return; }
  if(a==="gcatch"){ catchFish(+b.dataset.v,b); return; }
  if(a==="gsmode"){ G.smoothie.mode=b.dataset.v; G.smoothie.added=[]; renderMain(); return; }
  if(a==="gsadd"){ smoothieAdd(b.dataset.v,b); return; }
  if(a==="gslot"){ barrelSlot(+b.dataset.v); return; }
  if(a==="gsword"){ if(G.barrel){ G.barrel.pick=+b.dataset.v; snd("tick"); renderMain(); } return; }
  if(a==="gbonk"){ moleBonk(b); return; }
  if(a==="gttt"){ tttMove(+b.dataset.v); return; }
  if(a==="gpaint"){ paintPart(+b.dataset.v); return; }
  if(a==="gpcol"){ G.paint.col=+b.dataset.v; renderMain(); return; }
  if(a==="gpace"){ pacerTap(+b.dataset.v); return; }
  if(a==="gorll"){ b.disabled=true; rollSay(); return; }
  if(a==="gbuild"){ buildAdd(); return; }
  if(a==="gbpick"){ G.build ||= {k:0,n:0,made:0}; if(G.build.n) return; G.build.k=+b.dataset.v; snd("tick"); renderMain(); return; }
  if(a==="gmaze"){ if(b.dataset.v==="1") mazeStep(); return; }
}
function onKey(e){ if(e.key==="Escape" && ROOT){ if(OPT.reading){ close(); return; } if(VIEW!=="review"){ VIEW="review"; renderMain(); } } }
function close(){ if(!ROOT) return; document.removeEventListener("click",onClick); document.removeEventListener("keydown",onKey); ROOT.remove(); ROOT=null; document.documentElement.style.overflow=""; try{ OPT.onClose&&OPT.onClose(); }catch(e){} }
function open(opt){
  if(ROOT) close();
  OPT=opt||{}; setItems(OPT.items);
  const st=OPT.state||{};
  S.client={goals:[GOAL], stickers:(st.stickers||[]).slice(), tank:(st.tank||[]).slice(), sound:!!st.sound, lastGame:st.lastGame||"", name:OPT.who||""};
  NEWSTK=[]; VIEW="game"; S.fx.picker=false; S.fx.stk=false; S.fx.busy=false;
  LV={cur:{gid:"w",si:0}, log:[], hist:[], mod: st.pics===false?[]:["picture"], game:null, t0:Date.now()};
  const okType=t=>GAMES.some(g=>g.id===t);
  LV.game=freshGame(okType(OPT.game)?OPT.game:okType(st.lastGame)?st.lastGame:"");
  ROOT=document.createElement("div"); ROOT.className="sgk"; ROOT.setAttribute("role","dialog"); ROOT.setAttribute("aria-modal","true"); ROOT.setAttribute("aria-label","Speech games");
  document.body.appendChild(ROOT); document.documentElement.style.overflow="hidden";
  document.addEventListener("click",onClick); document.addEventListener("keydown",onKey);
  renderMain();
}
for(let i=GAMES.length-1;i>=0;i--) if(GAMES[i].id==="road"||GAMES[i].id==="bridge") GAMES.splice(i,1);
window.SpeechGames={open, close, games:()=>GAMES.map(g=>({id:g.id,name:g.name,art:g.art,bg:g.bg,col:g.col,how:g.how}))};

})();
