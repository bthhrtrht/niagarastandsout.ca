exports.id=365,exports.ids=[365],exports.modules={6345:(e,t,a)=>{Promise.resolve().then(a.bind(a,4801)),Promise.resolve().then(a.bind(a,1327))},7465:(e,t,a)=>{Promise.resolve().then(a.t.bind(a,2994,23)),Promise.resolve().then(a.t.bind(a,6114,23)),Promise.resolve().then(a.t.bind(a,9727,23)),Promise.resolve().then(a.t.bind(a,9671,23)),Promise.resolve().then(a.t.bind(a,1868,23)),Promise.resolve().then(a.t.bind(a,4759,23))},4801:(e,t,a)=>{"use strict";a.d(t,{default:()=>o});var r=a(326),n=a(6931);let s=process.env.GA_MEASUREMENT_ID;function o(){return(0,r.jsxs)(r.Fragment,{children:[r.jsx(n.default,{src:`https://www.googletagmanager.com/gtag/js?id=${s}`,strategy:"afterInteractive"}),r.jsx(n.default,{id:"ga4",strategy:"afterInteractive",children:`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${s}');
        `})]})}},1327:(e,t,a)=>{"use strict";a.d(t,{default:()=>g});var r=a(326),n=a(7577),s=a(3265),o=a(434);let l=(0,s.default)(async()=>{},{loadableGenerated:{modules:["components/ModernHeader.tsx -> lucide-react"]},ssr:!1}),i=(0,s.default)(async()=>{},{loadableGenerated:{modules:["components/ModernHeader.tsx -> lucide-react"]},ssr:!1}),d=(0,s.default)(async()=>{},{loadableGenerated:{modules:["components/ModernHeader.tsx -> lucide-react"]},ssr:!1}),c=(0,s.default)(async()=>{},{loadableGenerated:{modules:["components/ModernHeader.tsx -> lucide-react"]},ssr:!1}),h=[{label:"Home",href:"/"},{label:"Collections",href:"/collections",megaMenu:!0},{label:"Custom Designer",href:"/custom-decal-designer"},{label:"AI Generator",href:"/tools/ai-decal-generator"},{label:"Contact",href:"/pages/contact"}],u=()=>r.jsx("div",{className:"hidden group-hover:flex absolute top-full left-0 w-full md:w-[48rem] bg-neutral-800 border border-neutral-700 rounded-b-xl shadow-xl p-6 z-40",children:r.jsx("div",{className:"grid grid-cols-2 gap-4 w-full",children:["Boat Decals","Vehicle Wraps","Waterproof Stickers","Window Lettering"].map(e=>r.jsx(o.default,{href:`/collections/${e.toLowerCase().replace(/\s+/g,"-")}`,className:"text-sm text-yellow-300 hover:text-yellow-400",children:e},e))})});function g(){let[e,t]=(0,n.useState)(!1);return(0,r.jsxs)("header",{className:"sticky top-0 z-50 text-yellow-300 backdrop-blur-md",children:[r.jsx("div",{className:"h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400"}),(0,r.jsxs)("div",{className:"bg-neutral-900",children:[(0,r.jsxs)("div",{className:"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16",children:[r.jsx(o.default,{href:"/",className:"font-semibold text-lg tracking-wide hover:text-yellow-400",children:"Niagara Stands Out"}),r.jsx("nav",{className:"hidden md:flex space-x-8",children:h.map(e=>(0,r.jsxs)("div",{className:"relative group",children:[r.jsx(o.default,{href:e.href,className:"hover:text-yellow-400 transition-colors",children:e.label}),e.megaMenu&&r.jsx(u,{})]},e.href))}),(0,r.jsxs)("div",{className:"flex items-center gap-4",children:[r.jsx(l,{className:"w-5 h-5 cursor-pointer hover:text-yellow-400"}),r.jsx(i,{className:"w-5 h-5 cursor-pointer hover:text-yellow-400"}),r.jsx("button",{className:"md:hidden","aria-label":"Toggle mobile menu",onClick:()=>t(!e),children:e?r.jsx(c,{className:"w-6 h-6"}):r.jsx(d,{className:"w-6 h-6"})})]})]}),e&&r.jsx("nav",{className:"md:hidden bg-neutral-800 border-t border-neutral-700",children:h.map(e=>r.jsx(o.default,{href:e.href,onClick:()=>t(!1),className:"block px-4 py-3 text-sm hover:bg-neutral-700",children:e.label},e.href))})]})]})}},3332:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>u,metadata:()=>h});var r=a(9510),n=a(6894),s=a.n(n),o=a(17),l=a.n(o);a(7272);var i=a(8570);let d=(0,i.createProxy)(String.raw`/Users/thomasjacques/Desktop/SITEFIXED/shopify-headless-complete/components/ModernHeader.tsx#default`),c=(0,i.createProxy)(String.raw`/Users/thomasjacques/Desktop/SITEFIXED/shopify-headless-complete/app/providers/Analytics.tsx#default`),h={metadataBase:new URL("https://niagarastandsout.ca"),title:{default:"Niagara Stands Out",template:"%s | Niagara Stands Out"},description:"Custom decals, labels and large-format printing in Niagara.",alternates:{canonical:"/"},openGraph:{siteName:"Niagara Stands Out",type:"website",images:[{url:"/og-default.jpg",width:1200,height:630}]}};function u({children:e}){return r.jsx("html",{lang:"en",className:s().className,children:(0,r.jsxs)("body",{className:`${l().className} bg-neutral-900 text-yellow-400`,children:[r.jsx(c,{}),r.jsx(d,{}),e]})})}},3255:(e,t,a)=>{"use strict";a.d(t,{Lg:()=>i,xR:()=>u,dm:()=>g,zd:()=>S,$h:()=>y,e_:()=>x});var r=a(6636);a.n(r)().config();let n=process.env.SHOPIFY_STORE_DOMAIN,s=process.env.SHOPIFY_STOREFRONT_API_TOKEN||"",o=process.env.SHOPIFY_API_VERSION||"2023-10",l=`https://${n}/api/${o}/graphql.json`;async function i(){let e=`
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
  `;try{let t=await fetch(l,{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Storefront-Access-Token":s},body:JSON.stringify({query:e}),next:{revalidate:60}}),a=await t.text(),r=JSON.parse(a);return r.errors&&console.error("Shopify GraphQL errors:",JSON.stringify(r.errors,null,2)),(r.data?.collections?.edges||[]).map(e=>({handle:e.node.handle,title:e.node.title,description:e.node.description,image:e.node.image?.url||null,imageAlt:e.node.image?.altText||""}))}catch(e){return console.error("Error fetching collections:",e),[]}}let d=process.env.SHOPIFY_STORE_DOMAIN||"",c=process.env.SHOPIFY_STOREFRONT_API_TOKEN||"",h=`https://${d}/api/2024-04/graphql.json`;async function u(e){let t=`
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
  `;try{let a=await fetch(h,{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Storefront-Access-Token":c},body:JSON.stringify({query:t,variables:{handle:e}}),next:{revalidate:60}}),r=await a.text(),n=JSON.parse(r),s=n.data?.collectionByHandle;if(!s)return null;return{title:s.title,handle:s.handle,description:s.description,image:s.image?.src||void 0}}catch(e){return console.error("Error fetching collection by handle:",e),null}}async function g(e){let t=`
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
  `;try{let a=await fetch(h,{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Storefront-Access-Token":c},body:JSON.stringify({query:t,variables:{handle:e}}),next:{revalidate:60}}),r=await a.text(),n=JSON.parse(r);return n.errors&&console.error("Shopify GraphQL errors:",JSON.stringify(n.errors,null,2)),(n.data?.collectionByHandle?.products?.edges||[]).map(e=>({title:e.node.title,handle:e.node.handle,image:e.node.images.edges[0]?.node.originalSrc||""}))}catch(e){return console.error("Error fetching collection:",e),[]}}let p=process.env.SHOPIFY_STORE_DOMAIN||"",m=process.env.SHOPIFY_STOREFRONT_API_TOKEN||"",f=`https://${p}/api/2024-04/graphql.json`;async function y(e){let t=`
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
  `;try{let a=await fetch(f,{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Storefront-Access-Token":m},body:JSON.stringify({query:t,variables:{handle:e}}),next:{revalidate:60}}),r=await a.text(),n=JSON.parse(r);if(!n.data?.productByHandle)return console.error(`getProductByHandle: No product found for handle "${e}"`,n.errors||n),null;return n.data.productByHandle}catch(t){return console.error(`Error in getProductByHandle for handle "${e}":`,t),null}}async function x(e){let t=`
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
  `;try{let a=await fetch(f,{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Storefront-Access-Token":m},body:JSON.stringify({query:t,variables:{query:`tag:${e}`}}),next:{revalidate:60}}),r=await a.text(),n=JSON.parse(r);return(n.data?.products?.edges||[]).map(e=>({handle:e.node.handle,title:e.node.title,image:e.node.images.edges[0]?.node.originalSrc||"https://niagarastandsout.ca/cdn/shop/files/default-hero.jpg"}))}catch(t){return console.error(`Error in getProductsByTag for tag "${e}":`,t),[]}}async function S(e=12){let t=`
    query FrontpageProducts($limit: Int!) {
      collection(handle: "frontpage") {
        products(first: $limit) {
          edges {
            node {
              handle
              title
              images(first: 1) {
                edges { node { originalSrc } }
              }
            }
          }
        }
      }
    }
  `;try{let a=await fetch(f,{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Storefront-Access-Token":m},body:JSON.stringify({query:t,variables:{limit:e}}),next:{revalidate:60}}),r=await a.json();return(r.data?.collection?.products?.edges||[]).map(e=>({handle:e.node.handle,title:e.node.title,image:e.node.images.edges[0]?.node.originalSrc||"https://niagarastandsout.ca/cdn/shop/files/default-hero.jpg"}))}catch(e){return console.error("Error in getFrontpageProducts:",e),[]}}},7272:()=>{}};