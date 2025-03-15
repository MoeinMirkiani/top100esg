<template>
    <header class="h-16 px-6 flex items-center justify-between gap-4 border-b-2 border-black">
        <div class="flex items-center justify-between flex-auto">
            <NuxtLinkLocale :to="{ name: 'index' }">
                <EsgLogo class="h-8 w-auto" filled :font-controlled="false" />
            </NuxtLinkLocale>

            <HeaderNav class="hidden md:block" />
        </div>

        <LanguageSwitch />

        <BurgerIcon @click="navIsOpen = true" filled :font-controlled="false" class="h-6 w-6 md:hidden" />

        <USlideover v-model="navIsOpen" :transition="false" side="top" class="h-max">
            <HeaderNav @close="navIsOpen = false" />
        </USlideover>
    </header>
</template>

<script lang="ts" setup>
import EsgLogo from '~/assets/icons/logo.svg'
import BurgerIcon from '~/assets/icons/burger.svg'

const navIsOpen = ref<boolean>(false)
</script>
