class Service extends EventTarget{
  constructor(){
    super();
     if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/serviceworker.js', {scope: '/',updateViaCache:"none"}).then(this.initialize.bind(this));
      }
  }
}

Service.prototype.initialize = function initialize(registration){
  this.registration = registration;
  this.dispatchEvent(new Event("registered"));
}

function PWAInstaller(){
  this.prompter = null;
  this.button = null;
  
  return this.onbeforeinstall.bind(this);
}

PWAInstaller.prototype.createButton = function createButton(){
  this.button = document.createElement("button");
  this.button.addEventListener("click",this.installApp.bind(this));
  this.button.innerHTML = "install pwa";
  document.body.appendChild(this.button);
}

PWAInstaller.prototype.removeButton = function removeButton(){
  document.body.removeChild(this.button);
  this.button = undefined;
}

PWAInstaller.prototype.onbeforeinstall = function onbeforeinstall(event){
  event.preventDefault();
  this.prompter = event;
  this.createButton();
}

PWAInstaller.prototype.installApp = async function installApp(){
  this.prompter.prompt();
  await this.prompter.userChoice;
  this.removeButton();
}


window.service = new Service();
window.main = document.querySelector("main");

window.addEventListener("beforeinstallprompt",new PWAInstaller());




function AppareilPhoto(){
  this.video = document.createElement("video");
  this.video.setAttribute("autoplay",true);
  
  this.controllers = document.createElement("nav");
  this.controllers.classList.add("controlleur_camera");

  window.main.classList.add("camera_application");
  
  navigator.mediaDevices.getUserMedia({video:{
    facingMode:"environment"
  }}).then(this.link.bind(this));

  window.main.appendChild(this.video);
  this.event_dealer = {
    camera:this.camera.bind(this),
    photo:this.photo.bind(this)
  }
    this.buildControllers();
}

AppareilPhoto.prototype.buildControllers = function buildControllers(){
  const takePhoto = document.querySelector("#take_photo");
  take_photo.removeEventListener("click",this.event_dealer.camera);
  take_photo.addEventListener("click",this.event_dealer.photo);
}

AppareilPhoto.icons = {
  take:
    `<svg viewBox="0 0 24 24">
      <path fill="white" d="M13.73,15L9.83,21.76C10.53,21.91 11.25,22 12,22C14.4,22 16.6,21.15 18.32,19.75L14.66,13.4M2.46,15C3.38,17.92 5.61,20.26 8.45,21.34L12.12,15M8.54,12L4.64,5.25C3,7 2,9.39 2,12C2,12.68 2.07,13.35 2.2,14H9.69M21.8,10H14.31L14.6,10.5L19.36,18.75C21,16.97 22,14.6 22,12C22,11.31 21.93,10.64 21.8,10M21.54,9C20.62,6.07 18.39,3.74 15.55,2.66L11.88,9M9.4,10.5L14.17,2.24C13.47,2.09 12.75,2 12,2C9.6,2 7.4,2.84 5.68,4.25L9.34,10.6L9.4,10.5Z" />
    </svg>`
}

AppareilPhoto.prototype.camera = function camera(){
  
}

function dec2hex (dec) {
  return dec.toString(16).padStart(2, "0")
}

function generateId (len) {
  var arr = new Uint8Array((len || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}

AppareilPhoto.prototype.photo = async function photo(){
  const photo = await this.imageCapture.takePhoto();
  this.download(photo)
}

AppareilPhoto.prototype.link = function link(stream){
  this.stream = stream;
  this.track = this.stream.getVideoTracks()[0];
  this.imageCapture = new ImageCapture(this.track);
  console.log(this.track.getCapabilities())
  this.video.srcObject = stream;
}

AppareilPhoto.prototype.download = function(blob){
  const a = document.createElement("a");
  a.setAttribute("download",generateId() + ".png");
  a.href = URL.createObjectURL(blob);
  a.click();
  URL.revokeObjectURL(a.href)
}

function PhotoControlleurs(capabilities){
  this.capabilities = capabilities;
}

PhotoControlleurs.prototype.creerLeControlleurDeFocal = function creerLeControlleurDeFocal(){
  if(this.capabilities.focusMode.has("manual")){
    
  }
}

new AppareilPhoto();

function Menu(ux){
  this.isOpen = false;
  this.menu = ux;
  this.main = document.querySelector("main");
  this.applications = [];

  return this.toggle.bind(this);
}

Menu.prototype.open = function open(){
  this.menu.classList.add("open");
  this.isOpen = true;
}

Menu.prototype.close = function close(){
  this.menu.classList.remove("open");
  this.isOpen = false;
}

Menu.prototype.toggle = function toggle(){
  if(this.isOpen){
    return this.close();
  }
  return this.open();
}

Menu.prototype.cleanup = function cleanup(){
  this.main.innerHTML = "";
}

Menu.prototype.createApplication = function createApplication(id){
  this.cleanup();
  this.applications[id].build();
}

const listener = new Menu(document.querySelector("#navigation_principal"));
document.querySelector("#hamburger").addEventListener("click",listener);

console.log(window.a);

function A (){
  this.hello = "world";
}

window.a = new A();