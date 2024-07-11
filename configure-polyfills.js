const fs = require('fs');

// Define los módulos que necesitan polyfills
const modules = {
  util: 'util/',
  crypto: 'crypto-browserify',
  child_process: 'child_process',
  dns: 'dns',
  fs: 'fs',
  http: 'stream-http',
  net: 'net',
  os: 'os-browserify/browser',
  process: 'process/browser',
  timers: 'timers-browserify',
  stream: 'stream-browserify',
  zlib: 'browserify-zlib',
  url: 'url/',
};

// Define el objeto de fallback
const fallback = {};

for (const moduleName in modules) {
  // Define el fallback para cada módulo
  fallback[moduleName] = `require.resolve('${modules[moduleName]}')`;
}

// Escribe el objeto de fallback en el archivo de configuración JSON
fs.writeFileSync('polyfill-config.json', JSON.stringify({ fallback }, null, 2));

console.log('Configuración de polyfills completada.');