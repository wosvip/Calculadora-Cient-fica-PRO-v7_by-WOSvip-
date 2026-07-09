const exprEl=document.getElementById('expr'),histEl=document.getElementById('history'),angleBtn=document.getElementById('angleBtn');
let expr='0',angle='DEG',memory=0;
function fitDisplay() {
  exprEl.style.fontSize = "42px";

  let size = 42;

  while (exprEl.scrollWidth > exprEl.clientWidth && size > 18) {
    size -= 1;
    exprEl.style.fontSize = size + "px";
  }
}
function show() {
  exprEl.textContent = expr;

  requestAnimationFrame(() => {
    fitDisplay();
  });
}
function insert(v){if(expr==='0'||expr==='Erro')expr='';expr+=v;show();preview()}
function preview(){try{if(!expr||/[+\-×÷^(]$/.test(expr))return;const r=calculateExpression(expr,angle);histEl.textContent=expr+' = '+r}catch(e){}}
function equals(){try{const old=expr;const r=String(calculateExpression(expr,angle));expr=r;histEl.textContent=old+' =';show()}catch(e){histEl.textContent=expr+' = Erro';expr='Erro';show()}}
function action(a){
 if(a==='clear'){expr='0';histEl.textContent='';show();return}
 if(a==='back'){expr=expr.length>1?expr.slice(0,-1):'0';show();preview();return}
 if(a==='equals')return equals();
 if(a==='angle'){angle=angle==='DEG'?'RAD':'DEG';angleBtn.textContent=angle;preview();return}
 if(a==='sign'){expr=expr.startsWith('-')?expr.slice(1):'-'+expr;show();preview();return}
 if(a==='square'){insert('²');return}
 if(a==='reciprocal'){expr='1/('+expr+')';show();preview();return}
 if(a==='abs'){expr='abs('+expr+')';show();preview();return}
 if(a==='rand'){insert(String(Math.random()).slice(0,8));return}
 if(a==='mc'){memory=0;return}
 if(a==='mr'){insert(String(memory));return}
 if(a==='mplus'){try{memory+=calculateExpression(expr,angle)}catch(e){}return}
 if(a==='mminus'){try{memory-=calculateExpression(expr,angle)}catch(e){}return}
}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.insert)insert(b.dataset.insert);if(b.dataset.action)action(b.dataset.action)});
document.addEventListener('keydown',e=>{const k=e.key;if(/[0-9.()+\-*/^]/.test(k)){insert(k.replace('*','×').replace('/','÷'));return}if(k==='Enter')equals();if(k==='Backspace')action('back');if(k==='Escape')action('clear')});
show();
