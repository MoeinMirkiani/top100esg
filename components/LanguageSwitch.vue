<template>
    <UPopover v-model:open="popoverIsOpen" class="flex">
        <div class="flex items-center gap-1 cursor-pointer">
            <LanguageIcon filled :font-controlled="false" class="h-5 w-5" />
            <span class="uppercase">{{ locale }}</span>
        </div>

        <template #panel>
            <div class="p-3 min-w-[160px]">
                <ul class="space-y-3">
                    <li v-for="lang in locales" :key="lang.code">
                        <button @click="handleLocaleChange(lang)">{{ lang.name }}</button>
                    </li>
                </ul>
            </div>
        </template>
    </UPopover>
</template>

<script setup lang="ts">
import LanguageIcon from '~/assets/icons/language.svg'
import { type LocaleObject } from "@nuxtjs/i18n"

const { locale, locales, setLocale } = useI18n()

const popoverIsOpen = ref(false)
const handleLocaleChange = (locale: LocaleObject) => {
    setLocale(locale.code)
    popoverIsOpen.value = false
}
</script>
