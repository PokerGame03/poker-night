const V="pn-157a8f097c",FILES=['./', 'index.html', 'guide.html', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png'];
self.addEventListener("install",e=>e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const q=e.request;if(q.method!="GET"||new URL(q.url).origin!=location.origin)return;
const saved=()=>caches.match(q,{ignoreSearch:true}).then(r=>r||(q.mode=="navigate"?caches.match("index.html"):Response.error()));
const net=fetch(q).then(r=>{if(r.ok){const c=r.clone();caches.open(V).then(x=>x.put(q,c))}return r});
e.respondWith(Promise.race([net,new Promise(res=>setTimeout(()=>caches.match(q,{ignoreSearch:true}).then(c=>c&&res(c)),3000))]).catch(saved))});
