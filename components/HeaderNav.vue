<template>
    <nav>
        <ul class="md:flex">
            <li v-for="item in navItems" :key="item.to">
                <NuxtLinkLocale @click="$emit('close')"
                    :to="item.to"
                    class="relative block px-6 py-4 leading-8"
                >
                    {{ t(item.name) }}
                    <span class="indicator w-full h-1 bg-transparent absolute left-0 bottom-0"></span>
                </NuxtLinkLocale>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts" setup>
const { t } = useI18n()

interface NavItem {
    name: string
    to: string
}

const navItems: NavItem[] = [
    { name: 'Start', to: 'index' },
    { name: 'Rankings', to: 'rankings' },
    { name: 'Methodology', to: 'methodology' },
    { name: 'Contact', to: 'mailto:competencecentreforsustainability@unibz.it' }
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
