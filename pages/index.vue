<template>
    <div>
        <UButton>{{ t('Button') }}</UButton>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: 'filters'
})

const { t } = useI18n()

useHead({
    title: t('Rankings')
})
</script>
