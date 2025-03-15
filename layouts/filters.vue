<template>
    <div class="grid grid-cols-12">
        <div class="col-span-4 bg-[#EFEFEF] px-4 py-6 hidden md:block">
            <TableFilters class="sticky top-6" />
        </div>
        <div class="col-span-12 md:col-span-8 h-screen">
            <NuxtPage />
        </div>
    </div>
</template>

<script setup lang="ts">
</script>