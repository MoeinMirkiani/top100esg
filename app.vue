<template>
    <NuxtLoadingIndicator :height="2" :color="false" class="bg-blue-600" />
    <AppHeader class="sticky top-0" />
    <NuxtLayout>
        <slot />
    </NuxtLayout>
    <AppFooter />
</template>

<script setup lang="ts">
useHead({
    titleTemplate: `%s - TOP100ESG`
})
</script>