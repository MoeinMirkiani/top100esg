<template>
    <div>{{ props.company }}</div>
</template>

<script lang="ts" setup>
import type { Company } from "~/types"

const props = defineProps<{
    company: Company
}>()
</script>
