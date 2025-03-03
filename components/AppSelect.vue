<template>
    <UFormGroup :label="props.label">
        <USelect
            :options="props.options"
            v-model="model"
            variant="none"
            class="border-none"
            select-class="bg-white p-4"
            @change="() => $emit('update:modelValue', model)"
        />
    </UFormGroup>
</template>

<script setup lang="ts">
interface Props {
    label: string
    options: { label: string, value: string }[]
}

const props = defineProps<Props>()
const model = defineModel<{ label: string, value: string } | undefined>()
</script>
