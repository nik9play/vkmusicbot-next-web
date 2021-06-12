export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'vk-music-bot-website-3',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-tilt.js',
    '~/plugins/vue-clipboard.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
  ],

  loading: {
    color: '#1e2025',
    height: '2px'
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    ['nuxt-buefy', { css: false, materialDesignIcons: false }],
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/sitemap',
    '@nuxtjs/auth-next'
  ],

  auth: {
    // redirect: {
    //   login: '/auth'
    // },
    strategies: {
      discord: {
        clientId: '721772274830540833',
        clientSecret: 'Fq-XHoYtiEGBaUw0QwGCgbTXQBgvbp6l',
        codeChallengeMethod: '',
        grantType: 'authorization_code'
      },
      social: {
        scheme: 'oauth2',
        clientId: '721772274830540833',
        clientSecret: 'Fq-XHoYtiEGBaUw0QwGCgbTXQBgvbp6l',
        endpoints: {
          authorization: 'https://discord.com/api/oauth2/authorize',
          token: 'https://discord.com/api/oauth2/token',
          userInfo: 'https://discord.com/api/users/@me'
        },
        scope: ['identify', 'email', 'guilds', 'guilds.join'],
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 1800
        },
        responseType: 'code',
        accessType: undefined,
        grantType: '',
        codeChallengeMethod: ''
      }
    }
  },

  sitemap: {
    hostname: 'https://vkmusicbot.megaworld.space',
    gzip: true
  },

  // serverMiddleware: [
  //   { path: '/auth', handler: '~/server_middleware/auth.js' }
  // ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
