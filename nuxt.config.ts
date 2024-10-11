// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';
export default defineNuxtConfig({
  hooks:{},
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules:[
    '@primevue/nuxt-module',
    'usebootstrap',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    '@formkit/auto-animate',
  ],

  plugins:[
    '~/plugins/format-price-usd.ts',
    '~/plugins/format-decimal.ts',
    '~/plugins/date-to-string',
    '~/plugins/string-to-date',
    '~/plugins/date-to-string-abd'
  ],
  primevue: {
    options: {
        theme: {
            preset: Aura
        }
    }
    },
    css:['~/assets/css/default.css','primeicons/primeicons.css'],
    "overrides": {
      "vue": "latest"
    }
})