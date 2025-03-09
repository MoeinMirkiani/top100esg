<template>
    <div>
        <UButton>{{ t('Button') }}</UButton>
    </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

definePageMeta({
    layout: 'filters'
})

useHead({
    title: t('Rankings')
})
</script>
