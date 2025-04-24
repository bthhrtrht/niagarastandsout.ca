(()=>{var e={};e.id=798,e.ids=[798],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4770:e=>{"use strict";e.exports=require("crypto")},2048:e=>{"use strict";e.exports=require("fs")},9801:e=>{"use strict";e.exports=require("os")},5315:e=>{"use strict";e.exports=require("path")},7398:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>o.a,__next_app__:()=>h,originalPathname:()=>u,pages:()=>c,routeModule:()=>p,tree:()=>d}),r(9145),r(3332),r(5866);var a=r(3191),s=r(8716),l=r(7922),o=r.n(l),n=r(5231),i={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(i[e]=()=>n[e]);r.d(t,i);let d=["",{children:["collections",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,9145)),"/Users/thomasjacques/Desktop/SITEFIXED/shopify-headless-complete/app/collections/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,3332)),"/Users/thomasjacques/Desktop/SITEFIXED/shopify-headless-complete/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,5866,23)),"next/dist/client/components/not-found-error"]}],c=["/Users/thomasjacques/Desktop/SITEFIXED/shopify-headless-complete/app/collections/page.tsx"],u="/collections/page",h={require:r,loadChunk:()=>Promise.resolve()},p=new a.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/collections/page",pathname:"/collections",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},6345:(e,t,r)=>{Promise.resolve().then(r.bind(r,4801)),Promise.resolve().then(r.bind(r,1327))},7465:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2994,23)),Promise.resolve().then(r.t.bind(r,6114,23)),Promise.resolve().then(r.t.bind(r,9727,23)),Promise.resolve().then(r.t.bind(r,9671,23)),Promise.resolve().then(r.t.bind(r,1868,23)),Promise.resolve().then(r.t.bind(r,4759,23))},485:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2481,23)),Promise.resolve().then(r.t.bind(r,9404,23))},4801:(e,t,r)=>{"use strict";r.d(t,{default:()=>o});var a=r(326),s=r(6931);let l=process.env.GA_MEASUREMENT_ID;function o(){return(0,a.jsxs)(a.Fragment,{children:[a.jsx(s.default,{src:`https://www.googletagmanager.com/gtag/js?id=${l}`,strategy:"afterInteractive"}),a.jsx(s.default,{id:"ga4",strategy:"afterInteractive",children:`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${l}');
        `})]})}},1327:(e,t,r)=>{"use strict";r.d(t,{default:()=>p});var a=r(326),s=r(7577),l=r(3265),o=r(434);let n=(0,l.default)(async()=>{},{loadableGenerated:{modules:["components/ModernHeader.tsx -> lucide-react"]},ssr:!1}),i=(0,l.default)(async()=>{},{loadableGenerated:{modules:["components/ModernHeader.tsx -> lucide-react"]},ssr:!1}),d=(0,l.default)(async()=>{},{loadableGenerated:{modules:["components/ModernHeader.tsx -> lucide-react"]},ssr:!1}),c=(0,l.default)(async()=>{},{loadableGenerated:{modules:["components/ModernHeader.tsx -> lucide-react"]},ssr:!1}),u=[{label:"Home",href:"/"},{label:"Collections",href:"/collections",megaMenu:!0},{label:"Custom Designer",href:"/custom-decal-designer"},{label:"AI Generator",href:"/tools/ai-decal-generator"},{label:"Contact",href:"/pages/contact"}],h=()=>a.jsx("div",{className:"hidden group-hover:flex absolute top-full left-0 w-full md:w-[48rem] bg-neutral-800 border border-neutral-700 rounded-b-xl shadow-xl p-6 z-40",children:a.jsx("div",{className:"grid grid-cols-2 gap-4 w-full",children:["Boat Decals","Vehicle Wraps","Waterproof Stickers","Window Lettering"].map(e=>a.jsx(o.default,{href:`/collections/${e.toLowerCase().replace(/\s+/g,"-")}`,className:"text-sm text-yellow-300 hover:text-yellow-400",children:e},e))})});function p(){let[e,t]=(0,s.useState)(!1);return(0,a.jsxs)("header",{className:"sticky top-0 z-50 text-yellow-300 backdrop-blur-md",children:[a.jsx("div",{className:"h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400"}),(0,a.jsxs)("div",{className:"bg-neutral-900",children:[(0,a.jsxs)("div",{className:"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16",children:[a.jsx(o.default,{href:"/",className:"font-semibold text-lg tracking-wide hover:text-yellow-400",children:"Niagara Stands Out"}),a.jsx("nav",{className:"hidden md:flex space-x-8",children:u.map(e=>(0,a.jsxs)("div",{className:"relative group",children:[a.jsx(o.default,{href:e.href,className:"hover:text-yellow-400 transition-colors",children:e.label}),e.megaMenu&&a.jsx(h,{})]},e.href))}),(0,a.jsxs)("div",{className:"flex items-center gap-4",children:[a.jsx(n,{className:"w-5 h-5 cursor-pointer hover:text-yellow-400"}),a.jsx(i,{className:"w-5 h-5 cursor-pointer hover:text-yellow-400"}),a.jsx("button",{className:"md:hidden","aria-label":"Toggle mobile menu",onClick:()=>t(!e),children:e?a.jsx(c,{className:"w-6 h-6"}):a.jsx(d,{className:"w-6 h-6"})})]})]}),e&&a.jsx("nav",{className:"md:hidden bg-neutral-800 border-t border-neutral-700",children:u.map(e=>a.jsx(o.default,{href:e.href,onClick:()=>t(!1),className:"block px-4 py-3 text-sm hover:bg-neutral-700",children:e.label},e.href))})]})]})}},9145:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>n});var a=r(9510),s=r(3255),l=r(7710),o=r(7371);async function n(){let e=await (0,s.Lg)();return(0,a.jsxs)("main",{className:"min-h-screen bg-[radial-gradient(circle_at_50%_30%,#181c2b_70%,#0ff2_100%)] py-12 px-4 flex flex-col items-center",children:[a.jsx("h1",{className:"text-4xl font-extrabold text-cyan-400 drop-shadow mb-10",children:"All Collections"}),a.jsx("div",{className:"grid gap-8 w-full max-w-6xl grid-cols-2 sm:grid-cols-3 md:grid-cols-4",children:e.map(e=>(0,a.jsxs)(o.default,{href:`/collections/${e.handle}`,className:"flex flex-col items-center bg-neutral-900 border border-neutral-700 p-4 rounded-xl hover:shadow-lg transition",children:[a.jsx("div",{className:"w-full h-40 relative mb-4",children:a.jsx(l.default,{src:e.image||"/cdn/shop/files/default-hero.jpg",alt:e.imageAlt||e.title,fill:!0,className:"object-cover rounded-md",unoptimized:!0})}),a.jsx("h3",{className:"text-white font-semibold text-center",children:e.title})]},e.handle))})]})}},3332:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>h,metadata:()=>u});var a=r(9510),s=r(6894),l=r.n(s),o=r(17),n=r.n(o);r(7272);var i=r(8570);let d=(0,i.createProxy)(String.raw`/Users/thomasjacques/Desktop/SITEFIXED/shopify-headless-complete/components/ModernHeader.tsx#default`),c=(0,i.createProxy)(String.raw`/Users/thomasjacques/Desktop/SITEFIXED/shopify-headless-complete/app/providers/Analytics.tsx#default`),u={metadataBase:new URL("https://niagarastandsout.ca"),title:{default:"Niagara Stands Out",template:"%s | Niagara Stands Out"},description:"Custom decals, labels and large-format printing in Niagara.",alternates:{canonical:"/"},openGraph:{siteName:"Niagara Stands Out",type:"website",images:[{url:"/og-default.jpg",width:1200,height:630}]}};function h({children:e}){return a.jsx("html",{lang:"en",className:l().className,children:(0,a.jsxs)("body",{className:`${n().className} bg-neutral-900 text-yellow-400`,children:[a.jsx(c,{}),a.jsx(d,{}),e]})})}},3255:(e,t,r)=>{"use strict";r.d(t,{Lg:()=>i,xR:()=>h,dm:()=>p,$h:()=>x,e_:()=>y});var a=r(6636);r.n(a)().config();let s=process.env.SHOPIFY_STORE_DOMAIN,l=process.env.SHOPIFY_STOREFRONT_API_TOKEN||"",o=process.env.SHOPIFY_API_VERSION||"2023-10",n=`https://${s}/api/${o}/graphql.json`;async function i(){let e=`
    query Collections {
      collections(first: 100, query: "published_status:published") {
        edges {
          node {
            handle
            title
            description
            image {
              url
              altText
            }
          }
        }
      }
    }
  `;try{let t=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Storefront-Access-Token":l},body:JSON.stringify({query:e}),next:{revalidate:60}}),r=await t.text(),a=JSON.parse(r);return a.errors&&console.error("Shopify GraphQL errors:",JSON.stringify(a.errors,null,2)),(a.data?.collections?.edges||[]).map(e=>({handle:e.node.handle,title:e.node.title,description:e.node.description,image:e.node.image?.url||null,imageAlt:e.node.image?.altText||""}))}catch(e){return console.error("Error fetching collections:",e),[]}}let d=process.env.SHOPIFY_STORE_DOMAIN||"",c=process.env.SHOPIFY_STOREFRONT_API_TOKEN||"",u=`https://${d}/api/2024-04/graphql.json`;async function h(e){let t=`
    query CollectionByHandle($handle: String!) {
      collectionByHandle(handle: $handle) {
        title
        handle
        description
        image {
          src
        }
      }
    }
  `;try{let r=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Storefront-Access-Token":c},body:JSON.stringify({query:t,variables:{handle:e}}),next:{revalidate:60}}),a=await r.text(),s=JSON.parse(a),l=s.data?.collectionByHandle;if(!l)return null;return{title:l.title,handle:l.handle,description:l.description,image:l.image?.src||void 0}}catch(e){return console.error("Error fetching collection by handle:",e),null}}async function p(e){let t=`
    query ProductsByCollection($handle: String!) {
      collectionByHandle(handle: $handle) {
        products(first: 10) {
          edges {
            node {
              title
              handle
              images(first: 1) {
                edges {
                  node {
                    originalSrc
                  }
                }
              }
            }
          }
        }
      }
    }
  `;try{let r=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Storefront-Access-Token":c},body:JSON.stringify({query:t,variables:{handle:e}}),next:{revalidate:60}}),a=await r.text(),s=JSON.parse(a);return s.errors&&console.error("Shopify GraphQL errors:",JSON.stringify(s.errors,null,2)),(s.data?.collectionByHandle?.products?.edges||[]).map(e=>({title:e.node.title,handle:e.node.handle,image:e.node.images.edges[0]?.node.originalSrc||""}))}catch(e){return console.error("Error fetching collection:",e),[]}}let m=process.env.SHOPIFY_STORE_DOMAIN||"",g=process.env.SHOPIFY_STOREFRONT_API_TOKEN||"",f=`https://${m}/api/2024-04/graphql.json`;async function x(e){let t=`
    query Product($handle: String!) {
      productByHandle(handle: $handle) {
        title
        handle
        description
        tags
        images(first: 10) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              title
              id
              price {
                amount
                currencyCode
              }
            }
          }
        }
        # metafields removed due to API changes
      }
    }
  `;try{let r=await fetch(f,{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Storefront-Access-Token":g},body:JSON.stringify({query:t,variables:{handle:e}}),next:{revalidate:60}}),a=await r.text(),s=JSON.parse(a);if(!s.data?.productByHandle)return console.error(`getProductByHandle: No product found for handle "${e}"`,s.errors||s),null;return s.data.productByHandle}catch(t){return console.error(`Error in getProductByHandle for handle "${e}":`,t),null}}async function y(e){let t=`
    query ProductsByTag($query: String!) {
      products(first: 10, query: $query) {
        edges {
          node {
            title
            handle
            images(first: 1) {
              edges {
                node {
                  originalSrc
                }
              }
            }
          }
        }
      }
    }
  `;try{let r=await fetch(f,{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Storefront-Access-Token":g},body:JSON.stringify({query:t,variables:{query:`tag:${e}`}}),next:{revalidate:60}}),a=await r.text(),s=JSON.parse(a);return(s.data?.products?.edges||[]).map(e=>({handle:e.node.handle,title:e.node.title,image:e.node.images.edges[0]?.node.originalSrc||"https://niagarastandsout.ca/cdn/shop/files/default-hero.jpg"}))}catch(t){return console.error(`Error in getProductsByTag for tag "${e}":`,t),[]}}},7272:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[948,364,481,488],()=>r(7398));module.exports=a})();