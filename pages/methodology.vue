<template>
    <UContainer class="pb-32">
        <div v-for="item in methodology" :key="item.language">
            <div v-if="item.language === locale">
                <div class="content" v-html="item.content"></div>
            </div>
        </div>
    </UContainer>
</template>

<script setup lang="ts">
import MethodologyService from "~/services/MethodologyService"


const { t, locale } = useI18n()

useHead({
    title: t('Methodology')
})

const { data } = await MethodologyService.get()

const methodology = ref(data.value.data.page.methodologyAcf.methodology.map((m: any) => {
    return {
        ...m,
        language: m.language[0]
    }
}))
</script>

<style lang="scss" scoped>
:deep(.content) {
    h1, h2, h3, h4, h5, h6 {
        @apply text-xl mt-12 mb-3 font-bold md:text-3xl md:mt-24 md:mb-6;
    }
}
</style>
