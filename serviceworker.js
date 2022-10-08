importScripts("./sw_modules/cache.js");
self.addEventListener("message",function(e){
  console.log(e)
})

self.addEventListener("periodicsync",function(event){
  console.log(event)
})