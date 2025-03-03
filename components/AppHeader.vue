<template>
    <header class="h-16 px-6 flex items-center justify-between gap-4 border-b-2 border-black">
        <div class="flex items-center justify-between flex-auto">
            <NuxtLinkLocale :to="{ name: 'index' }">
                <EsgLogo class="h-8 w-auto" filled :font-controlled="false" />
            </NuxtLinkLocale>

            <nav class="hidden md:flex">
                <ul class="flex">
                    <li v-for="item in navItems" :key="item.to">
                        <NuxtLinkLocale
                            :to="{ name: item.to }"
                            class="relative block px-6 py-4 leading-8"
                        >
                            {{ t(item.name) }}
                            <span class="indicator w-full h-1 bg-transparent absolute left-0 bottom-0"></span>
                        </NuxtLinkLocale>
                    </li>
                </ul>
            </nav>

            <BurgerIcon filled :font-controlled="false" class="h-6 w-6 md:hidden" />
        </div>

        <LanguageSwitch class="hidden md:block" />
    </header>
</template>

<script lang="ts" setup>
import EsgLogo from '~/assets/icons/logo.svg'
import BurgerIcon from '~/assets/icons/burger.svg'

interface NavItem {
    name: string
    to: string
}

const { t } = useI18n()

const navItems: NavItem[] = [
    { name: 'Rankings', to: 'index' },
    { name: 'Methodology', to: 'methodology' },
    { name: 'Contact', to: 'contact' }
]
</script>

<style lang="scss" scoped>
nav {
    a.router-link-active {
        .indicator {
            @apply bg-black;
        }
    }
}
</style>
