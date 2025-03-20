<template>
    <UFormGroup :label="props.label">
        <USelect
            :options="props.options.map((option): { label: string, value: string } => ({ label: t(option), value: option }))"
            v-model="model"
            variant="none"
            class="border-none"
            select-class="bg-white p-4"
        />
    </UFormGroup>
</template>

<script setup lang="ts">
const { t } = useI18n()

interface Props {
    label: string
    options: string[]
}

const props = defineProps<Props>()
const model = defineModel<string>()
</script>
