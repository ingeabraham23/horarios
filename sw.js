if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const d=e=>n(e,o),c={module:{uri:o},exports:t,require:d};i[o]=Promise.all(s.map((e=>c[e]||d(e)))).then((e=>(r(...e),t)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-5b85fe55.js",revision:null},{url:"assets/index-69c029fe.css",revision:null},{url:"index.html",revision:"38e98e89bcde43dfaa1510b604d63b95"},{url:"registerSW.js",revision:"4b3b37765ee1a2bac724a13ee6d33361"},{url:"pwa-64x64.png",revision:"dad115299201bb17cec82c8be89ea7b9"},{url:"pwa-192x192.png",revision:"34153d49b3e44736df011558d09773e8"},{url:"pwa-512x512.png",revision:"e9e8eae80331e941c1bf4ee6b8fb3c81"},{url:"maskable-icon-512x512.png",revision:"ec1a206711c3bad7642aef88c8d0b6b8"},{url:"manifest.webmanifest",revision:"5dad593d1b8e3fd8f7ea42bb293c5dc6"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
