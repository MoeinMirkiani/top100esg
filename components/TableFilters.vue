<template>
    <div class="space-y-4">
        <AppSelect label="Section" :options="sections" v-model="section" />
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const sections = ref<{ label: string, value: string }[]>([
    { label: t('Financial'), value: 'Financial' },
    { label: t('Environmental'), value: 'Environmental' },
    { label: t('Social'), value: 'Social' },
    { label: t('Governance'), value: 'Governance' }
])

const section = ref<{ label: string, value: string }>(sections.value[0])
</script>
