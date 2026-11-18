const calc=new Calculator();
let history=[];try{history=JSON.parse(localStorage.getItem('yohaku-history')||'[]').filter(x=>typeof x.expression==='string'&&typeof x.value==='string').slice(0,50)}catch{}
const result=document.querySelector('#result'),expression=document.querySelector('#expression'),dialog=document.querySelector('#history');
function save(){try{localStorage.setItem('yohaku-history',JSON.stringify(history))}catch{}}
function render(){const parts=calc.value.split('.');result.textContent=calc.value==='エラー'||calc.value.includes('e')?calc.value:Number(parts[0]).toLocaleString('en-US')+(parts.length>1?'.'+parts[1]:'');expression.textContent=calc.expression||'';document.querySelectorAll('.operator').forEach(b=>b.classList.toggle('selected',calc.op===b.dataset.key))}
function input(key){calc.input(key);if(calc.record){history.unshift(calc.record);history=history.slice(0,50);save()}render()}
document.querySelectorAll('[data-key]').forEach(b=>b.addEventListener('click',()=>input(b.dataset.key)));
document.addEventListener('keydown',e=>{if(dialog.open)return;const key=({'Enter':'=','Escape':'clear','Backspace':'backspace','%':'percent'})[e.key]||e.key;if(/^[\d.+*/=-]$/.test(key)||['clear','backspace','percent'].includes(key)){e.preventDefault();input(key)}});
function renderHistory(){const list=document.querySelector('#history-list');list.replaceChildren();if(!history.length){list.textContent='履歴はまだありません。';return}history.forEach(item=>{const b=document.createElement('button'),small=document.createElement('small');small.textContent=item.expression;b.append(small,document.createTextNode(item.value));b.onclick=()=>{calc.clear();calc.value=item.value;render();dialog.close()};list.append(b)})}
document.querySelector('#history-toggle').onclick=()=>{renderHistory();dialog.showModal()};document.querySelector('#close-history').onclick=()=>dialog.close();document.querySelector('#clear-history').onclick=()=>{history=[];save();renderHistory()};
if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});render();

