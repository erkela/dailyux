const a = (b)=>document.querySelector.bind(b);
const b = a(document);
const c = b("#asset");
const d = b("section");
const f = c.firstChild;
let color = "b";

const x = document.querySelector("#fullscreen");
const y = document.querySelector("main");
let n = false;

document.body.addEventListener("fullscreenchange",()=>{if(n){x.innerHTML="Fullscreen?"}else{x.innerHTML="Quit"};n=!n;})
x.onclick = ()=>{
  console.log(n);
  if(n){
    document.exitFullscreen();
  }else{
    document.body.requestFullscreen();
  }
}

[...document.querySelectorAll("ul div")].forEach(e=>e.onclick=function(){color=this.className;this.className+=" o"});

function deleteClass(a,b){
  b.classList.remove(a)
}

function hide(){
  const c = document.querySelector("#create");
  c.className += " hide";
  document.querySelector("section").className = "";
  [...c.querySelectorAll("input")].forEach(e=>e.value="");
  [...document.querySelectorAll("ul div")].forEach(deleteClass.bind(this,"o"));
}

document.querySelector("#annuler").onclick = hide;

function ajouter(){
  document.querySelector("#create").className = "";
  document.querySelector("section").className += "blur";
}

document.querySelector("#ajout").onclick = ajouter;

function test(){
    const titre = document.querySelector("#titre").value;
    const description = document.querySelector("#description").value;
    const duration = Number(document.querySelector("#duration").value) || 30;
    const element = f.cloneNode(true);
    element.className +=color;
    element.querySelector("h3").innerHTML = titre;
    element.querySelector("p").innerHTML = description;
    element.querySelector(".progress").style.animationDuration = duration+"s";
    element.querySelector("svg").onclick=(e)=>{d.removeChild(element)};
    setTimeout(()=>element.querySelector("#dring").className="",duration*1000);
    d.appendChild(element);
    hide();
}
document.querySelector("#valider").onclick=test;

if ('virtualKeyboard' in navigator && navigator.maxTouchPoints) {
const { x, y, width, height } = navigator.virtualKeyboard.boundingRect;
navigator.virtualKeyboard.overlaysContent = true;
let kb=navigator.virtualKeyboard;
let i = null;
let tr = false;
let ab = (l)=>{
  if(!tr){
    const {y,height} = document.querySelector(".m").getBoundingClientRect();
    let t = (window.innerHeight-kb.boundingRect.height)-(y+height);
    document.body.style.transform = `translateY(${t}px)`;
    tr=true;
  }
}

navigator.virtualKeyboard.addEventListener('geometrychange', function(event) {
  if(kb.boundingRect.y){
    if(!i){
      i = setTimeout(()=>{ab();clearTimeout(i);i=null},100);
    }
  }else {
    if(i){
          clearTimeout(i);
    }
    i=setTimeout(()=>{document.body.style.transform = "none";clearTimeout(i);i=null;tr=false;},100);
  }
});

[...document.querySelectorAll(".m input")].forEach(e=>{
  e.addEventListener("input",(d)=>{ab()});
});
}
