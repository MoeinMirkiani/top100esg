<template>
    <NuxtLayout>
        <slot />
    </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
    titleTemplate: `%s - TOP100ESG`
})
</script>