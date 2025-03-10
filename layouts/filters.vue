<template>
    <div class="grid grid-cols-12">
        <div class="col-span-4 bg-[#EFEFEF] px-4 py-6">
            <TableFilters class="sticky top-6" />
        </div>
        <div class="col-span-8 h-[calc(200vh)]">
            <NuxtPage />
        </div>
    </div>
</template>

<script setup lang="ts">
</script>