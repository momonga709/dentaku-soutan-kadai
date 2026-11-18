(function(root){
 class Calculator {
  constructor(){this.clear()}
  clear(){this.value='0';this.acc=null;this.op=null;this.fresh=true;this.last=null;this.expression='';this.record=null}
  number(key){if(this.fresh||this.value==='エラー'){this.value='0';this.fresh=false}if(key==='.'&&!this.value.includes('.'))this.value+='.';else if(/^\d$/.test(key)&&this.value.replace(/[-.]/g,'').length<15)this.value=this.value==='0'?key:this.value+key}
  calculate(a,b,op){const n=op==='+'?a+b:op==='-'?a-b:op==='*'?a*b:b===0?NaN:a/b;return Number.isFinite(n)?Number(n.toPrecision(12)):NaN}
  format(n){return Number.isFinite(n)?String(n):'エラー'}
  symbol(op){return({'*':'×','/':'÷','-':'−','+':'+'})[op]}
  input(key){this.record=null;if(key==='clear'){this.clear();return}if(/^[\d.]$/.test(key)){this.number(key);return}if(this.value==='エラー')return;
   let n=Number(this.value);
   if(key==='sign'){if(n!==0)this.value=this.format(-n);return}
   if(key==='backspace'){if(!this.fresh)this.value=this.value.length>1?this.value.slice(0,-1):'0';if(this.value==='-')this.value='0';return}
   if(key==='percent'){this.value=this.format(this.op&&(this.op==='+'||this.op==='-')?this.acc*n/100:n/100);return}
   if(['+','-','*','/'].includes(key)){if(this.op&&!this.fresh){n=this.calculate(this.acc,n,this.op);this.value=this.format(n)}if(!Number.isFinite(n)){this.op=null;return}this.acc=n;this.op=key;this.fresh=true;this.last=null;this.expression=`${this.value} ${this.symbol(key)}`;return}
   if(key==='='){const op=this.op||this.last?.op;if(!op)return;const a=this.op?this.acc:n;const b=this.op?n:this.last.b;const result=this.calculate(a,b,op);this.expression=`${a} ${this.symbol(op)} ${b} =`;this.value=this.format(result);if(Number.isFinite(result))this.record={expression:this.expression,value:this.value};this.last={op,b};this.op=null;this.acc=null;this.fresh=true}
  }
 }
 root.Calculator=Calculator;if(typeof module!=='undefined')module.exports=Calculator;
})(typeof globalThis!=='undefined'?globalThis:this);
