exports.id=365,exports.ids=[365],exports.modules={6345:(e,t,r)=>{Promise.resolve().then(r.bind(r,4801)),Promise.resolve().then(r.bind(r,1327))},7465:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2994,23)),Promise.resolve().then(r.t.bind(r,6114,23)),Promise.resolve().then(r.t.bind(r,9727,23)),Promise.resolve().then(r.t.bind(r,9671,23)),Promise.resolve().then(r.t.bind(r,1868,23)),Promise.resolve().then(r.t.bind(r,4759,23))},4801:(e,t,r)=>{"use strict";r.d(t,{default:()=>o});var a=r(326),n=r(6931);let s=process.env.GA_MEASUREMENT_ID;function o(){return(0,a.jsxs)(a.Fragment,{children:[a.jsx(n.default,{src:`https://www.googletagmanager.com/gtag/js?id=${s}`,strategy:"afterInteractive"}),a.jsx(n.default,{id:"ga4",strategy:"afterInteractive",children:`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${s}');
        `})]})}},1327:(e,t,r)=>{"use strict";r.d(t,{default:()=>g});var a=r(326),n=r(7577),s=r(3265),o=r(434);let l=(0,s.default)(async()=>{},{loadableGenerated:{modules:["components/ModernHeader.tsx -> lucide-react"]},ssr:!1}),i=(0,s.default)(async()=>{},{loadableGenerated:{modules:["components/ModernHeader.tsx -> lucide-react"]},ssr:!1}),d=(0,s.default)(async()=>{},{loadableGenerated:{modules:["components/ModernHeader.tsx -> lucide-react"]},ssr:!1}),c=(0,s.default)(async()=>{},{loadableGenerated:{modules:["components/ModernHeader.tsx -> lucide-react"]},ssr:!1}),h=[{label:"Home",href:"/"},{label:"Collections",href:"/collections",megaMenu:!0},{label:"Custom Designer",href:"/custom-decal-designer"},{label:"AI Generator",href:"/tools/ai-decal-generator"},{label:"Contact",href:"/pages/contact"}],u=()=>a.jsx("div",{className:"hidden group-hover:flex absolute top-full left-0 w-full md:w-[48rem] bg-neutral-800 border border-neutral-700 rounded-b-xl shadow-xl p-6 z-40",children:a.jsx("div",{className:"grid grid-cols-2 gap-4 w-full",children:["Boat Decals","Vehicle Wraps","Waterproof Stickers","Window Lettering"].map(e=>a.jsx(o.default,{href:`/collections/${e.toLowerCase().replace(/\s+/g,"-")}`,className:"text-sm text-yellow-300 hover:text-yellow-400",children:e},e))})});function g(){let[e,t]=(0,n.useState)(!1);return(0,a.jsxs)("header",{className:"sticky top-0 z-50 text-yellow-300 backdrop-blur-md",children:[a.jsx("div",{className:"h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400"}),(0,a.jsxs)("div",{className:"bg-neutral-900",children:[(0,a.jsxs)("div",{className:"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16",children:[a.jsx(o.default,{href:"/",className:"font-semibold text-lg tracking-wide hover:text-yellow-400",children:"Niagara Stands Out"}),a.jsx("nav",{className:"hidden md:flex space-x-8",children:h.map(e=>(0,a.jsxs)("div",{className:"relative group",children:[a.jsx(o.default,{href:e.href,className:"hover:text-yellow-400 transition-colors",children:e.label}),e.megaMenu&&a.jsx(u,{})]},e.href))}),(0,a.jsxs)("div",{className:"flex items-center gap-4",children:[a.jsx(l,{className:"w-5 h-5 cursor-pointer hover:text-yellow-400"}),a.jsx(i,{className:"w-5 h-5 cursor-pointer hover:text-yellow-400"}),a.jsx("button",{className:"md:hidden","aria-label":"Toggle mobile menu",onClick:()=>t(!e),children:e?a.jsx(c,{className:"w-6 h-6"}):a.jsx(d,{className:"w-6 h-6"})})]})]}),e&&a.jsx("nav",{className:"md:hidden bg-neutral-800 border-t border-neutral-700",children:h.map(e=>a.jsx(o.default,{href:e.href,onClick:()=>t(!1),className:"block px-4 py-3 text-sm hover:bg-neutral-700",children:e.label},e.href))})]})]})}},3332:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>u,metadata:()=>h});var a=r(9510),n=r(6894),s=r.n(n),o=r(17),l=r.n(o);r(7272);var i=r(8570);let d=(0,i.createProxy)(String.raw`/Users/thomasjacques/Desktop/SITEFIXED/shopify-headless-complete/components/ModernHeader.tsx#default`),c=(0,i.createProxy)(String.raw`/Users/thomasjacques/Desktop/SITEFIXED/shopify-headless-complete/app/providers/Analytics.tsx#default`),h={metadataBase:new URL("https://niagarastandsout.ca"),title:{default:"Niagara Stands Out",template:"%s | Niagara Stands Out"},description:"Custom decals, labels and large-format printing in Niagara.",alternates:{canonical:"/"},openGraph:{siteName:"Niagara Stands Out",type:"website",images:[{url:"/og-default.jpg",width:1200,height:630}]}};function u({children:e}){return a.jsx("html",{lang:"en",className:s().className,children:(0,a.jsxs)("body",{className:`${l().className} bg-neutral-900 text-yellow-400`,children:[a.jsx(c,{}),a.jsx(d,{}),e]})})}},3255:(e,t,r)=>{"use strict";r.d(t,{Lg:()=>c,xR:()=>p,dm:()=>f,zd:()=>N,$h:()=>v,e_:()=>b});var a=r(6636),n=r.n(a),s=r(2279);n().config();let o=process.env.SHOPIFY_STORE_DOMAIN,l=process.env.SHOPIFY_STOREFRONT_API_TOKEN||"",i=process.env.SHOPIFY_API_VERSION||"2023-10",d=`https://${o}/api/${i}/graphql.json`;async function c(){let e=`
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
  `;try{let t=await fetch(d,{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Storefront-Access-Token":l},body:JSON.stringify({query:e}),next:{revalidate:60}}),r=await t.text(),a=JSON.parse(r);return a.errors&&console.error("Shopify GraphQL errors:",JSON.stringify(a.errors,null,2)),(a.data?.collections?.edges||[]).map(e=>({handle:e.node.handle,title:e.node.title,description:e.node.description,image:e.node.image?.url||null,imageAlt:e.node.image?.altText||""}))}catch(e){return console.error("Error fetching collections:",e),[]}}let h=process.env.SHOPIFY_STORE_DOMAIN||"",u=process.env.SHOPIFY_STOREFRONT_API_TOKEN||"",g=`https://${h}/api/2024-04/graphql.json`;async function p(e){let t=`
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
  `;try{let r=await fetch(g,{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Storefront-Access-Token":u},body:JSON.stringify({query:t,variables:{handle:e}}),next:{revalidate:60}}),a=await r.text(),n=JSON.parse(a),s=n.data?.collectionByHandle;if(!s)return null;return{title:s.title,handle:s.handle,description:s.description,image:s.image?.src||void 0}}catch(e){return console.error("Error fetching collection by handle:",e),null}}async function f(e){let t=`
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
  `;try{let r=await fetch(g,{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Storefront-Access-Token":u},body:JSON.stringify({query:t,variables:{handle:e}}),next:{revalidate:60}}),a=await r.text(),n=JSON.parse(a);return n.errors&&console.error("Shopify GraphQL errors:",JSON.stringify(n.errors,null,2)),(n.data?.collectionByHandle?.products?.edges||[]).map(e=>({title:e.node.title,handle:e.node.handle,image:e.node.images.edges[0]?.node.originalSrc||""}))}catch(e){return console.error("Error fetching collection:",e),[]}}n().config();let m=process.env.SHOPIFY_STORE_DOMAIN||process.env.SHOP_DOMAIN||"",y=process.env.SHOPIFY_STOREFRONT_API_TOKEN||"",x=process.env.SHOPIFY_API_VERSION||"2024-04",S=`https://${m}/api/${x}/graphql.json`;async function v(e){let t=`
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
      }
    }
  `;try{let r=await fetch(S,{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Storefront-Access-Token":y},body:JSON.stringify({query:t,variables:{handle:e}}),next:{revalidate:60}}),a=await r.text(),n=JSON.parse(a);if(!n.data?.productByHandle)return console.error(`getProductByHandle: No product found for handle "${e}"`,n.errors||n),null;return n.data.productByHandle}catch(t){return console.error(`Error in getProductByHandle for handle "${e}":`,t),null}}async function b(e){let t=`
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
  `;try{let r=await fetch(S,{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Storefront-Access-Token":y},body:JSON.stringify({query:t,variables:{query:`tag:${e}`}}),next:{revalidate:60}}),a=await r.text(),n=JSON.parse(a);return(n.data?.products?.edges||[]).map(e=>({handle:e.node.handle,title:e.node.title,image:e.node.images.edges[0]?.node.originalSrc||"https://niagarastandsout.ca/cdn/shop/files/default-hero.jpg"}))}catch(t){return console.error(`Error in getProductsByTag for tag "${e}":`,t),[]}}async function N(e=12){let t=`
    query FrontpageProducts($limit: Int!) {
      collection(handle: "frontpage") {
        products(first: $limit) {
          edges {
            node {
              handle
              title
              images(first: 1) { edges { node { originalSrc } } }
              availableForSale
              variants(first: 1) { edges { node { price { amount currencyCode } } } }
            }
          }
        }
      }
    }
  `;try{let r=await fetch(S,{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Storefront-Access-Token":y},body:JSON.stringify({query:t,variables:{limit:e}}),next:{revalidate:60}}),a=await r.json();return(a.data?.collection?.products?.edges||[]).map(e=>{let t=e.node.variants.edges[0]?.node;return{handle:e.node.handle,title:e.node.title,image:e.node.images.edges[0]?.node.originalSrc||"https://niagarastandsout.ca/cdn/shop/files/default-hero.jpg",price:t?.price?{amount:t.price.amount,currency:t.price.currencyCode}:void 0,available:e.node.availableForSale}})}catch(e){return console.error("Error in getFrontpageProducts:",e),[]}}new s.g6(S,{headers:{"X-Shopify-Storefront-Access-Token":y}}),(0,s.Ps)`
  query AllProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo { hasNextPage endCursor }
      edges {
        node {
          handle
          title
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 10) { edges { node { url altText } } }
        }
      }
    }
  }
`},7272:()=>{}};