<template>
    <NuxtLoadingIndicator :height="2" :color="false" class="bg-blue-600" />
    <AppHeader />
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