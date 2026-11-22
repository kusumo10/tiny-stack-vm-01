import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output',A=[0,1,2,4],T="#4T')-.2cccccccc,,,,,,,(,,,(,,,c,,,cccccccccccccCGGC#ccccccccccc(+cccccccccccccc''$'";
for(const d of readdirSync(I).sort()){
 const p=readFileSync(I+'/'+d+'/program.bin'),q=readFileSync(I+'/'+d+'/input.bin'),n=p.length;
 const D=new Int32Array(256),C=new Int32Array(64),M=D.slice();
 let s=0,c=0,o=[],j=0,pc=0,t=0,x=0,y=0,a=0,b=0;
 for(;;){
  if(t===1e6){x=10;break}
  if(pc<0||pc>=n){x=9;break}
  b=p[pc];
  const k=b<84?T.charCodeAt(b)-35:64;
  if(k===64){x=5;break}
  const m=A[k>>4],f=(k>>2)&3,g=k&3;
  if(pc+m>=n){x=9;break}
  t++;
  pc+=1+m;
  if(s<f||s-f+g>256){x=s<f?2:3;break}
  if(b===0){x=0;break}
  else if(b===1)D[s++]=(p[pc-1]<<24)>>24;
  else if(b===2)D[s++]=p[pc-4]|p[pc-3]<<8|p[pc-2]<<16|p[pc-1]<<24;
  else if(b===3)s--;
  else if(b===4){D[s]=D[s-1];s++}
  else if(b===5){y=D[s-1];D[s-1]=D[s-2];D[s-2]=y}
  else if(b===6){D[s]=D[s-2];s++}
  else if(b===7){y=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=y}
  else if(b===23)D[s-1]=-D[s-1]|0;
  else if(b===27)D[s-1]=~D[s-1];
  else if(b>=16&&b<=34){
   a=D[s-2];y=D[s-1];
   let r=0;
   if(b===16)r=a+y|0;
   else if(b===17)r=a-y|0;
   else if(b===18)r=Math.imul(a,y);
   else if(b===19){if(!y){x=4;break}r=(a/y)|0}
   else if(b===20){if(!y){x=4;break}r=a%y|0}
   else if(b===21){if(!y){x=4;break}r=Math.floor((a>>>0)/(y>>>0))|0}
   else if(b===22){if(!y){x=4;break}r=(a>>>0)%(y>>>0)|0}
   else if(b===24)r=a&y;
   else if(b===25)r=a|y;
   else if(b===26)r=a^y;
   else if(b===28)r=a<<y;
   else if(b===29)r=a>>y;
   else if(b===30)r=a>>>y|0;
   else if(b===32)r=a===y?1:0;
   else if(b===33)r=a<y?1:0;
   else if(b===34)r=(a>>>0)<(y>>>0)?1:0;
   s-=2;D[s++]=r;
  }
  else if(b>=48&&b<=50){
   y=(p[pc-2]|p[pc-1]<<8)<<16>>16;
   if(b===48)pc+=y;
   else{const z=D[--s];if((b===49)===(z===0))pc+=y}
  }
  else if(b===51){
   if(c===64){x=7;break}
   C[c++]=pc;pc=p[pc-2]|p[pc-1]<<8;
  }
  else if(b===52){
   if(!c){x=8;break}
   pc=C[--c];
  }
  else if(b===64){
   a=D[s-1];
   if(a<0||a>255){x=6;break}
   D[s-1]=M[a];
  }
  else if(b===65){
   a=D[s-1];y=D[s-2];
   if(a<0||a>255){x=6;break}
   s-=2;M[a]=y;
  }
  else if(b===80){
   const g=Buffer.from(String(D[--s]));
   if(o.length+g.length>65536){x=11;break}
   o.push(...g);
  }
  else if(b===81){
   if(o.length>65535){x=11;break}
   o.push(D[--s]&255);
  }
  else if(b===82)D[s++]=j<q.length?q[j++]:-1;
  else if(b===83){x=D[--s]&255;break}
 }
 mkdirSync(O+'/'+d,{recursive:true});
 writeFileSync(O+'/'+d+'/stdout.bin',Buffer.from(o));
 writeFileSync(O+'/'+d+'/exit.txt',x+'\n');
}
