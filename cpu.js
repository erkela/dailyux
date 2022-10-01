function Service(){
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceworker.js', {scope: '/',updateViaCache:"none"}).then(this.initialize.bind(this));
  }
}

Service.prototype.initialize = function initialize(registration){
  this.registration = registration;
}

window.service = new Service();