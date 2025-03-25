<template>
    <footer class="bg-[#EFEFEF]">
        <UContainer class="min-h-16 py-10 flex flex-col-reverse justify-between items-center gap-10 md:flex-row md:py-3">
            <p>© 2025 Free University of Bozen-Bolzano • Italian Tax Number: 94060760215</p>

            <NuxtLink external target="_blank" href="https://www.unibz.it/en/legal/privacy/" class="underline">{{ t('Privacy') }}</NuxtLink>
        </UContainer>
    </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
