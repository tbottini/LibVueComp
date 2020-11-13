const PORT = process.env.PORT;
const HOST = process.env.HOST;

console.log("SERVER PRIVATE: " + process.env.PRIVATE);
console.log("SERVER launch on ", HOST, PORT);

module.exports = {
  server: {
    host: HOST,
    port: PORT,
  },
  head: {
    title: '<name>',
    bodyAttrs: {
      style: 'margin: 0; height: 100%;'
    },
    htmlAttrs: {
      style: `{
        margin: 0;
        height: 100%;
      }`
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  env: {
    host: HOST,
    port: PORT,
    private: process.env.PRIVATE == "true"
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/mq'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    baseUrl: 'http://atelier-azurees:9000',
  },
  telemetry: false,

  serverMiddleware: [
    {path: '/api/', handler: '~/api/index.js'}
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
