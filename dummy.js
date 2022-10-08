function NotificationInterval(){
  const controllers = document.createElement("nav");
  this.text = document.createElement("input");
  this.text.setAttribute("type","text");
  
  this.interval = document.createElement("input");
  this.interval.setAttribute("type","number");

  const send = document.createElement("button");
  send.addEventListener("click",this.registerNotification.bind(this));
  send.innerHTML="send";

  controllers.appendChild(this.text);
  controllers.appendChild(this.interval);
  controllers.appendChild(send);
  
  document.querySelector("main").appendChild(controllers);
}

NotificationInterval.prototype.registerNotification = async function registerNotification(){
  const tag = "dummy-tag";
  console.log(this.interval.value)
  const a = await window.service.registration.periodicSync.register(tag, {
      minInterval: this.interval.value * 1000,
    }).catch(console.error);
    console.log(a)
  setTimeout(async function(){
    const tags = await window.service.registration.periodicSync.getTags().catch(console.error);
  console.log(tags)
  },
    (this.interval.value+1)*1000)

    window.service.registration.active.postMessage({type:"periodic-notification",tag,message:this.text.value});
}

navigator.permissions.query({name:"periodic-background-sync"}).then(console.log)

new NotificationInterval();