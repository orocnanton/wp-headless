import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { o as NOOP_MIDDLEWARE_HEADER, p as decodeKey } from './chunks/astro/server_Y9m7VcrS.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/oscar/Documents/Astro/wp-headless/","cacheDir":"file:///Users/oscar/Documents/Astro/wp-headless/node_modules/.astro/","outDir":"file:///Users/oscar/Documents/Astro/wp-headless/dist/","srcDir":"file:///Users/oscar/Documents/Astro/wp-headless/src/","publicDir":"file:///Users/oscar/Documents/Astro/wp-headless/public/","buildClientDir":"file:///Users/oscar/Documents/Astro/wp-headless/dist/","buildServerDir":"file:///Users/oscar/Documents/Astro/wp-headless/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.uerjY95f.css"},{"type":"inline","content":".grid{display:grid!important}.gap-2{gap:.5rem!important}.gap-4{gap:1rem!important}.gap-6{gap:1.5rem!important}.gap-8{gap:2rem!important}.gap-10{gap:2.5rem!important}.gap-12{gap:3rem!important}.flex{display:flex!important}.flex-row,.flex-col{gap:inherit}.flex-col>li.flex{max-width:100%}.flex-col > li .relative.md\\:w-1/3{height:220px}@media (max-width: 768px){.flex-col > li .relative.md\\:w-1/3{height:200px}}h1,h2,h3,h4,h5,h6{font-family:Cormorant Garamond,serif}.section-title{position:relative;padding-bottom:1.5rem;margin-bottom:2rem}.section-title:after{content:\"\";position:absolute;bottom:0;left:50%;transform:translate(-50%);width:60px;height:1px;background-color:#c7a462}.decorated-title{display:flex;align-items:center;justify-content:center;gap:1rem}.decorated-title:before,.decorated-title:after{content:\"\";height:1px;background-color:#c7a462;width:30px}.btn-gold{background-color:#c7a462;color:#fff;padding:.75rem 2rem;font-family:Montserrat,sans-serif;font-size:.875rem;letter-spacing:.1em;text-transform:uppercase;transition:all .3s}.btn-gold:hover{background-color:#b6934f}.chapel-card{border:1px solid #f0e9db;transition:all .3s ease}.chapel-card:hover{border-color:#c7a462}.chapel-list li{position:relative;padding-left:1.5rem}.chapel-list li:before{content:\"•\";position:absolute;left:0;color:#c7a462;font-size:1.2em}.content-styles{font-family:Montserrat,sans-serif}.content-styles h1,.content-styles h2,.content-styles h3,.content-styles h4{font-family:Cormorant Garamond,serif;color:#181818}.content-styles a{color:#c7a462;text-decoration:none;border-bottom:1px solid}.content-styles a:hover{color:#b6934f}.content-styles blockquote{border-left-color:#c7a462;color:#181818;font-style:italic}\n"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/get-posts","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/get-posts\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"get-posts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/get-posts.js","pathname":"/api/get-posts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/subscribe","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/subscribe\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"subscribe","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/subscribe.js","pathname":"/api/subscribe","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.uerjY95f.css"}],"routeData":{"route":"/blog/[page]","isIndex":false,"type":"page","pattern":"^\\/blog\\/([^/]+?)\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"page","dynamic":true,"spread":false}]],"params":["page"],"component":"src/pages/blog/[page].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.uerjY95f.css"},{"type":"inline","content":".grid{display:grid!important}.gap-2{gap:.5rem!important}.gap-4{gap:1rem!important}.gap-6{gap:1.5rem!important}.gap-8{gap:2rem!important}.gap-10{gap:2.5rem!important}.gap-12{gap:3rem!important}.flex{display:flex!important}.flex-row,.flex-col{gap:inherit}.flex-col>li.flex{max-width:100%}.flex-col > li .relative.md\\:w-1/3{height:220px}@media (max-width: 768px){.flex-col > li .relative.md\\:w-1/3{height:200px}}h1,h2,h3,h4,h5,h6{font-family:Cormorant Garamond,serif}.section-title{position:relative;padding-bottom:1.5rem;margin-bottom:2rem}.section-title:after{content:\"\";position:absolute;bottom:0;left:50%;transform:translate(-50%);width:60px;height:1px;background-color:#c7a462}.decorated-title{display:flex;align-items:center;justify-content:center;gap:1rem}.decorated-title:before,.decorated-title:after{content:\"\";height:1px;background-color:#c7a462;width:30px}.btn-gold{background-color:#c7a462;color:#fff;padding:.75rem 2rem;font-family:Montserrat,sans-serif;font-size:.875rem;letter-spacing:.1em;text-transform:uppercase;transition:all .3s}.btn-gold:hover{background-color:#b6934f}.chapel-card{border:1px solid #f0e9db;transition:all .3s ease}.chapel-card:hover{border-color:#c7a462}.chapel-list li{position:relative;padding-left:1.5rem}.chapel-list li:before{content:\"•\";position:absolute;left:0;color:#c7a462;font-size:1.2em}.content-styles{font-family:Montserrat,sans-serif}.content-styles h1,.content-styles h2,.content-styles h3,.content-styles h4{font-family:Cormorant Garamond,serif;color:#181818}.content-styles a{color:#c7a462;text-decoration:none;border-bottom:1px solid}.content-styles a:hover{color:#b6934f}.content-styles blockquote{border-left-color:#c7a462;color:#181818;font-style:italic}\n"}],"routeData":{"route":"/blog","isIndex":false,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog.astro","pathname":"/blog","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.uerjY95f.css"},{"type":"inline","content":".grid{display:grid!important}.gap-2{gap:.5rem!important}.gap-4{gap:1rem!important}.gap-6{gap:1.5rem!important}.gap-8{gap:2rem!important}.gap-10{gap:2.5rem!important}.gap-12{gap:3rem!important}.flex{display:flex!important}.flex-row,.flex-col{gap:inherit}.flex-col>li.flex{max-width:100%}.flex-col > li .relative.md\\:w-1/3{height:220px}@media (max-width: 768px){.flex-col > li .relative.md\\:w-1/3{height:200px}}h1,h2,h3,h4,h5,h6{font-family:Cormorant Garamond,serif}.section-title{position:relative;padding-bottom:1.5rem;margin-bottom:2rem}.section-title:after{content:\"\";position:absolute;bottom:0;left:50%;transform:translate(-50%);width:60px;height:1px;background-color:#c7a462}.decorated-title{display:flex;align-items:center;justify-content:center;gap:1rem}.decorated-title:before,.decorated-title:after{content:\"\";height:1px;background-color:#c7a462;width:30px}.btn-gold{background-color:#c7a462;color:#fff;padding:.75rem 2rem;font-family:Montserrat,sans-serif;font-size:.875rem;letter-spacing:.1em;text-transform:uppercase;transition:all .3s}.btn-gold:hover{background-color:#b6934f}.chapel-card{border:1px solid #f0e9db;transition:all .3s ease}.chapel-card:hover{border-color:#c7a462}.chapel-list li{position:relative;padding-left:1.5rem}.chapel-list li:before{content:\"•\";position:absolute;left:0;color:#c7a462;font-size:1.2em}.content-styles{font-family:Montserrat,sans-serif}.content-styles h1,.content-styles h2,.content-styles h3,.content-styles h4{font-family:Cormorant Garamond,serif;color:#181818}.content-styles a{color:#c7a462;text-decoration:none;border-bottom:1px solid}.content-styles a:hover{color:#b6934f}.content-styles blockquote{border-left-color:#c7a462;color:#181818;font-style:italic}\n"}],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.uerjY95f.css"}],"routeData":{"route":"/cookies","isIndex":false,"type":"page","pattern":"^\\/cookies\\/?$","segments":[[{"content":"cookies","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cookies.astro","pathname":"/cookies","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.uerjY95f.css"}],"routeData":{"route":"/legal-notice","isIndex":false,"type":"page","pattern":"^\\/legal-notice\\/?$","segments":[[{"content":"legal-notice","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/legal-notice.astro","pathname":"/legal-notice","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.uerjY95f.css"},{"type":"inline","content":".grid{display:grid!important}.gap-2{gap:.5rem!important}.gap-4{gap:1rem!important}.gap-6{gap:1.5rem!important}.gap-8{gap:2rem!important}.gap-10{gap:2.5rem!important}.gap-12{gap:3rem!important}.flex{display:flex!important}.flex-row,.flex-col{gap:inherit}.flex-col>li.flex{max-width:100%}.flex-col > li .relative.md\\:w-1/3{height:220px}@media (max-width: 768px){.flex-col > li .relative.md\\:w-1/3{height:200px}}h1,h2,h3,h4,h5,h6{font-family:Cormorant Garamond,serif}.section-title{position:relative;padding-bottom:1.5rem;margin-bottom:2rem}.section-title:after{content:\"\";position:absolute;bottom:0;left:50%;transform:translate(-50%);width:60px;height:1px;background-color:#c7a462}.decorated-title{display:flex;align-items:center;justify-content:center;gap:1rem}.decorated-title:before,.decorated-title:after{content:\"\";height:1px;background-color:#c7a462;width:30px}.btn-gold{background-color:#c7a462;color:#fff;padding:.75rem 2rem;font-family:Montserrat,sans-serif;font-size:.875rem;letter-spacing:.1em;text-transform:uppercase;transition:all .3s}.btn-gold:hover{background-color:#b6934f}.chapel-card{border:1px solid #f0e9db;transition:all .3s ease}.chapel-card:hover{border-color:#c7a462}.chapel-list li{position:relative;padding-left:1.5rem}.chapel-list li:before{content:\"•\";position:absolute;left:0;color:#c7a462;font-size:1.2em}.content-styles{font-family:Montserrat,sans-serif}.content-styles h1,.content-styles h2,.content-styles h3,.content-styles h4{font-family:Cormorant Garamond,serif;color:#181818}.content-styles a{color:#c7a462;text-decoration:none;border-bottom:1px solid}.content-styles a:hover{color:#b6934f}.content-styles blockquote{border-left-color:#c7a462;color:#181818;font-style:italic}\n"}],"routeData":{"route":"/oraciones","isIndex":false,"type":"page","pattern":"^\\/oraciones\\/?$","segments":[[{"content":"oraciones","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/oraciones.astro","pathname":"/oraciones","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.uerjY95f.css"}],"routeData":{"route":"/privacy","isIndex":false,"type":"page","pattern":"^\\/privacy\\/?$","segments":[[{"content":"privacy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy.astro","pathname":"/privacy","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.uerjY95f.css"},{"type":"inline","content":".grid{display:grid!important}.gap-2{gap:.5rem!important}.gap-4{gap:1rem!important}.gap-6{gap:1.5rem!important}.gap-8{gap:2rem!important}.gap-10{gap:2.5rem!important}.gap-12{gap:3rem!important}.flex{display:flex!important}.flex-row,.flex-col{gap:inherit}.flex-col>li.flex{max-width:100%}.flex-col > li .relative.md\\:w-1/3{height:220px}@media (max-width: 768px){.flex-col > li .relative.md\\:w-1/3{height:200px}}h1,h2,h3,h4,h5,h6{font-family:Cormorant Garamond,serif}.section-title{position:relative;padding-bottom:1.5rem;margin-bottom:2rem}.section-title:after{content:\"\";position:absolute;bottom:0;left:50%;transform:translate(-50%);width:60px;height:1px;background-color:#c7a462}.decorated-title{display:flex;align-items:center;justify-content:center;gap:1rem}.decorated-title:before,.decorated-title:after{content:\"\";height:1px;background-color:#c7a462;width:30px}.btn-gold{background-color:#c7a462;color:#fff;padding:.75rem 2rem;font-family:Montserrat,sans-serif;font-size:.875rem;letter-spacing:.1em;text-transform:uppercase;transition:all .3s}.btn-gold:hover{background-color:#b6934f}.chapel-card{border:1px solid #f0e9db;transition:all .3s ease}.chapel-card:hover{border-color:#c7a462}.chapel-list li{position:relative;padding-left:1.5rem}.chapel-list li:before{content:\"•\";position:absolute;left:0;color:#c7a462;font-size:1.2em}.content-styles{font-family:Montserrat,sans-serif}.content-styles h1,.content-styles h2,.content-styles h3,.content-styles h4{font-family:Cormorant Garamond,serif;color:#181818}.content-styles a{color:#c7a462;text-decoration:none;border-bottom:1px solid}.content-styles a:hover{color:#b6934f}.content-styles blockquote{border-left-color:#c7a462;color:#181818;font-style:italic}\n.md-w-third[data-astro-cid-j7pv25f6]{@media (min-width: 768px){width:33.333333%}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/oscar/Documents/Astro/wp-headless/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/oscar/Documents/Astro/wp-headless/src/pages/blog.astro",{"propagation":"none","containsHead":true}],["/Users/oscar/Documents/Astro/wp-headless/src/pages/category/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/oscar/Documents/Astro/wp-headless/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/oscar/Documents/Astro/wp-headless/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/oscar/Documents/Astro/wp-headless/src/pages/legal/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/oscar/Documents/Astro/wp-headless/src/pages/oraciones.astro",{"propagation":"none","containsHead":true}],["/Users/oscar/Documents/Astro/wp-headless/src/pages/post/[slug].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/get-posts@_@js":"pages/api/get-posts.astro.mjs","\u0000@astro-page:src/pages/api/subscribe@_@js":"pages/api/subscribe.astro.mjs","\u0000@astro-page:src/pages/blog/[page]@_@astro":"pages/blog/_page_.astro.mjs","\u0000@astro-page:src/pages/blog@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/category/[slug]@_@astro":"pages/category/_slug_.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/cookies@_@astro":"pages/cookies.astro.mjs","\u0000@astro-page:src/pages/legal/[slug]@_@astro":"pages/legal/_slug_.astro.mjs","\u0000@astro-page:src/pages/legal-notice@_@astro":"pages/legal-notice.astro.mjs","\u0000@astro-page:src/pages/oraciones@_@astro":"pages/oraciones.astro.mjs","\u0000@astro-page:src/pages/post/[slug]@_@astro":"pages/post/_slug_.astro.mjs","\u0000@astro-page:src/pages/privacy@_@astro":"pages/privacy.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_C1AnRY0H.mjs","/Users/oscar/Documents/Astro/wp-headless/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_C1iAU0i0.mjs","@astrojs/react/client.js":"_astro/client.bnNPSdWK.js","/Users/oscar/Documents/Astro/wp-headless/src/pages/blog.astro?astro&type=script&index=0&lang.ts":"_astro/blog.astro_astro_type_script_index_0_lang.Sr0UYJ4t.js","/Users/oscar/Documents/Astro/wp-headless/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.avo9JEEH.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/oscar/Documents/Astro/wp-headless/src/pages/index.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const r=document.getElementById(\"grid-view-btn\"),o=document.getElementById(\"list-view-btn\"),e=document.getElementById(\"posts-container\");if(!r||!o||!e){console.error(\"Faltan elementos necesarios para la función de cambio de vista\");return}const i=()=>{e.classList.remove(\"flex\",\"flex-col\",\"gap-6\"),e.classList.add(\"grid\",\"grid-cols-1\",\"md:grid-cols-2\",\"lg:grid-cols-3\",\"gap-8\"),r.classList.remove(\"bg-gray-100\"),r.classList.add(\"bg-primary-50\",\"text-primary-700\"),o.classList.remove(\"bg-primary-50\",\"text-primary-700\"),o.classList.add(\"bg-gray-100\"),e.querySelectorAll(\"li\").forEach(t=>{t.classList.remove(\"flex\",\"md:flex-row\",\"flex-col\");const s=t.querySelector(\".relative\");s&&(s.classList.remove(\"md-w-third\",\"md:h-auto\"),s.classList.add(\"h-56\"));const a=t.querySelector(\".p-8\");a&&a.classList.remove(\"md:w-2/3\",\"flex-1\")}),localStorage.setItem(\"viewMode\",\"grid\")},d=()=>{e.classList.remove(\"grid\",\"grid-cols-1\",\"md:grid-cols-2\",\"lg:grid-cols-3\",\"gap-8\"),e.classList.add(\"flex\",\"flex-col\",\"gap-6\"),o.classList.remove(\"bg-gray-100\"),o.classList.add(\"bg-primary-50\",\"text-primary-700\"),r.classList.remove(\"bg-primary-50\",\"text-primary-700\"),r.classList.add(\"bg-gray-100\"),localStorage.setItem(\"viewMode\",\"list\"),e.querySelectorAll(\"li\").forEach(t=>{t.classList.add(\"flex\",\"md:flex-row\",\"flex-col\");const s=t.querySelector(\".relative\");s?(s.classList.remove(\"h-56\"),s.classList.add(\"md-w-third\",\"md:h-auto\")):console.debug(\"Contenedor de imagen no encontrado para un elemento de la lista\");const a=t.querySelector(\".p-8\");a?a.classList.add(\"md:w-2/3\",\"flex-1\"):console.debug(\"Contenedor de texto no encontrado para un elemento de la lista\")})};r.addEventListener(\"click\",i),o.addEventListener(\"click\",d);try{localStorage.getItem(\"viewMode\")===\"list\"?d():i()}catch(l){console.error(\"Error al cargar la preferencia de vista:\",l),i()}});"]],"assets":["/_astro/about.uerjY95f.css","/logo-oraciones-cristianas.svg","/_astro/blog.astro_astro_type_script_index_0_lang.Sr0UYJ4t.js","/_astro/client.bnNPSdWK.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"AiLD3Ik6ZQZKSYQgsrFCByW1bRSn3whPneFzQtCYEHQ="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
