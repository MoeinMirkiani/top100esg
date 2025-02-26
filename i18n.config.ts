export default defineI18nConfig(() => ({
    legacy: false,
    availableLocales: ['it-IT', 'de-DE', 'en-US'],
    fallbackLocale: 'en',
    formatFallbackMessages: true,
    fallbackWarn: false,
    missingWarn: false,
    globalInjection: true
}))
