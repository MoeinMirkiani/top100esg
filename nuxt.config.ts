export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',

    app: {
        head: {
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Sometype+Mono:ital,wght@0,400..700;1,400..700&display=swap'
                }
            ]
        }
    },

    modules: [
        '@nuxt/ui',
        '@nuxtjs/i18n',
        'nuxt-svgo',
        '@pinia/nuxt'
    ],

    css: [
        '~/assets/styles/main.scss'
    ],

    colorMode: {
        preference: 'light',
    },

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