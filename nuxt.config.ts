export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',

    modules: [
        '@nuxt/ui',
        '@nuxtjs/i18n'
    ],

    i18n: {
        locales: [
            {
                code: 'it',
                iso: 'it-IT',
                file: 'it-IT.ts',
                name: 'Italiano',
                dir: 'ltr',
            },
            {
                code: 'de',
                iso: 'de-DE',
                file: 'de-DE.ts',
                name: 'Deutsch',
                dir: 'ltr',
            },
            {
                code: 'en',
                iso: 'en-US',
                file: 'en-US.ts',
                name: 'English',
                dir: 'ltr',
            }
        ],
        lazy: true,
        strategy: 'prefix',
        detectBrowserLanguage: false,
        langDir: 'locales/',
        defaultLocale: 'en',
        types: 'composition',
        vueI18n: './i18n.config.ts',
    },

    devtools: {
        enabled: true
    }
})
