/**

animation-name: circle-in-bottom-right;
  animation-delay: var(--transition__delay, 0);
  animation-duration: var(--transition__duration, 2.5s);
  animation-timing-function: var(--transition__easing, cubic-bezier(.25, 1, .30, 1));
  animation-fill-mode: both;

**/

const keyframe = [
  {
    clipPath: "circle(0% at top right)"
  },
  {
    clipPath: "circle(150% at bottom right)"
  }
];

const options = {
  delay:0,
  duration:2500,
  easing:"cubic-bezier(.25, 1, .30, 1)",
  fill:"both"
}

const darkUI = document.querySelector("#dark");
const showcase = document.querySelector(".showcase");

showcase.addEventListener("click",function(){
  darkUI.style.zIndex=2;
  const a = darkUI.animate(keyframe,options);
})

const keyframe_out = [
  {
    clipPath: "circle(150% at bottom right)"
  },
  {
    clipPath: "circle(0% at top right)"
  }
]

const closeButton = document.querySelector("#close")
closeButton.addEventListener("click",function(){
  const animate = darkUI.animate(keyframe_out,options);
  animate.play();
  animate.addEventListener("finish",function(){
  })
})

function Caroussel(){
  this.position = 0;
  this.composant = document.querySelector("#composant-explication");
  this.texte = texte = document.querySelector("#texte-explication");
  this.page = document.querySelector("#page");
  
  this.precedentUX = document.querySelector("#precedent")
  this.suivantUX = document.querySelector("#suivant");

  this.precedentUX.addEventListener("click",this.precedent.bind(this));
  this.suivantUX.addEventListener("click",this.suivant.bind(this));

  this.updateControlleur();
  this.buildUX();
}

Caroussel.prototype.suivant = function(){
  this.position+=1;
  this.updateControlleur();
  this.buildUX();
}

Caroussel.prototype.precedent = function(){
  this.position-=1;
  this.updateControlleur();
  this.buildUX();
}

Caroussel.prototype.updateControlleur = function updateControlleur(){
  this.clean();
  if(this.position === 0){
    this.precedentUX.classList.add("disable");
  }

  if(this.position === 3){
    this.suivantUX.classList.add("disable");
  }

  this.page.innerHTML = this.position +1;
}

Caroussel.prototype.clean = function clearDisable(){
  const disable = document.querySelector(".disable");
  if(disable){
    disable.classList.remove("disable");
  }

  this.composant.innerHTML = "";
}

Caroussel.prototype.buildUX = function buildUX(){
  const data = Caroussel.data[this.position];
  console.log(this)
  if(data.element){
      this.composant.appendChild(data.element);
  }
  this.texte.innerHTML = data.texte;
}

Caroussel.data = [
  {
    element:null,
    texte:`
    <h3>Introduction</h3>
    <p>Cette page d'accueil s'inspire de l'approche minimalistique et directe du site de google.</p><p>Le design est <b>fortement</b> inspiré du dribbble de <span id="experimental"><a href="https://dribbble.com/shots/3339853-Splash-page">uixNinja</a></span>.</p>
`
  },
  {
    element:document.querySelector("#accroche").cloneNode(true),
    texte:`
      <h3>Accroche</h3>
      <p>L'utilisateur est notifié directement des motivations de l'application.</p>
    `
  },
   {
    element:document.querySelector('searchbox').cloneNode(true),
    texte:`
      <h3>Barre de recherche</h3>
      <p>L'utilisateur peut rapidement chercher les pseudos des streameurs ou découvrir les streameurs partageant ses centres d'intérêts (Musique, Jeux video...).</p>
      <p>La barre de recherche peut potentiellement présenter certains exemples, de catégories ou de streameurs, dynamiquement. <a href="https://codesandbox.io/s/github/algolia/solutions/tree/master/animated-placeholder-demo">exemple</a></p>    
`
  },{
    element:document.querySelector("#auth").cloneNode(true),
    texte:`
      <h3>Inscription</h3>
      <p>Le bouton d'inscription est mis en valeur.</p>
      <p>Les boutons peuvent potentiellement présenter différents choix (s'inscrire en tant que viewer ou en tant que streameur) sous forme d'un menu déroulant.</p>
    `
  }
]

new Caroussel();

