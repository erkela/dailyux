function Cache(name){
    this.contents = [`/`,`/index.html`,`/UX.css`,`/cpu.js`];
    this.database = caches.open(name).then(this.openDatabase.bind(this));
}

Cache.prototype.openDatabase = function openDatabase(database){
  this.database = database;
}

Cache.prototype.addContents = async function addContents(requests){
  await this.database;

  requests.forEach(async (request)=>{
      const response = await fetch(request);
      if(response && (response.status === 200 )){
          this.addContent(request,response);
      }
  })
}

Cache.prototype.addContent = async function addContent(request,response){
  await this.database;
  await this.database.put(request,response.clone());
}

Cache.prototype.fetchManager = async function fetchManager(request){
  const cache_request = await this.database.match(request);
  
  if(cache_request){
    console.log("cache response")
    return cache_request;
  }

  const response = await fetch(request);

  this.addContent(request,response);
  
  console.log("network response");
  
  return response;
}

Cache.prototype.oninstall = function oninstall(event){
  event.waitUntil(this.addContents.bind(this,this.contents));
}

Cache.prototype.onfetch = function onfetch(event){
  console.log(this)
  event.respondWith(this.fetchManager.call(this,event.request));
}

self.cache = new Cache("test");
self.addEventListener("install",self.cache.oninstall.bind(self.cache));
self.addEventListener("fetch",self.cache.onfetch.bind(self.cache));