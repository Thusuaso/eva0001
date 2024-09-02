// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules:['@primevue/nuxt-module', 'usebootstrap', '@pinia/nuxt'],
  plugins:[
    '~/plugins/format-price-usd.ts',
    '~/plugins/format-decimal.ts',
    '~/plugins/date-to-string',
    '~/plugins/string-to-date'
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