<template>
    <UFormGroup :label="props.label">
        <USelect
            :options="props.options.map((option): { label: string, value: string } => ({ ...option, label: t(option.label) }))"
            v-model="model"
            variant="none"
            class="border-none"
            select-class="bg-white p-4"
            @change="() => $emit('update:modelValue', model)"
        />
    </UFormGroup>
</template>

<script setup lang="ts">
const { t } = useI18n()

interface Props {
    label: string
    options: { label: string, value: string }[]
}

const props = defineProps<Props>()
const model = defineModel<{ label: string, value: string } | undefined>()

const translateOptions = computed(() => props.options.map(option => t(option.label)))
</script>
